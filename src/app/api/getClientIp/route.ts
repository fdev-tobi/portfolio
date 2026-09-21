import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import IpAddress from "@/models/IP";

function extractClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfIp = req.headers.get("cf-connecting-ip");
  const raw = forwarded || cfIp || realIp || req.headers.get("remote-addr") || "";
  return raw.split(",")[0].trim().replace(/^::ffff:/, "");
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint is for IP logging via POST" },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  const clientIp = extractClientIp(req);

  if (!clientIp) {
    console.error("Failed to retrieve IP address");
    return NextResponse.json(
      { error: "Failed to retrieve IP address" },
      { status: 400 }
    );
  }

  if (clientIp === "127.0.0.1" || clientIp === "::1") {
    return NextResponse.json(
      { message: "IP address is localhost" },
      { status: 200 }
    );
  }

  try {
    let returning = false;

    if (process.env.MONGODB_URI) {
      await connectDb();
      const result = await IpAddress.findOne({ ip: clientIp });
      returning = Boolean(result);

      if (!result) {
        const ipRecord = new IpAddress({ ip: clientIp });
        await ipRecord.save();
      }
    }

    await Promise.allSettled([
      sendVisitToTelegram(req, clientIp, returning),
      sendToDiscord(clientIp),
    ]);

    return NextResponse.json(
      {
        message: "Visitor alert sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing IP address:", error);
    return NextResponse.json(
      { error: "Failed to process IP address" },
      { status: 500 }
    );
  }
}

const sendVisitToTelegram = async (req: Request, ip: string, returning: boolean) => {
  const path = req.headers.get("referer") || "/";
  const userAgent = req.headers.get("user-agent") || "";
  const botUrl = process.env.TELEGRAM_BOT_URL;
  const apiKey = process.env.TELEGRAM_BOT_API_KEY;

  if (botUrl && apiKey) {
    const response = await fetch(`${botUrl.replace(/\/$/, "")}/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ ip, returning, path, userAgent }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram bot is not configured");
    return;
  }

  const text = await buildVisitMessage(ip, returning, path, userAgent);
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
};

const buildVisitMessage = async (
  ip: string,
  returning: boolean,
  path: string,
  userAgent: string
) => {
  const data = await lookupVisitor(ip);
  const location = [data.city, data.region, data.country].filter(Boolean).join(", ") || "Unknown";
  const title = returning ? "Repeat portfolio visitor" : "New portfolio visitor";
  const risk = data.vpn
    ? "🔴 High — VPN or proxy"
    : data.datacenter
      ? "🔴 High — hosting / VPS IP"
      : "🟢 Looks like a normal ISP";

  return [
    `🛡️ <b>${title}</b>`,
    "",
    `🌐 <b>IP:</b> <code>${ip}</code>`,
    `📍 <b>Location:</b> ${location}`,
    data.timezone ? `🕒 <b>Timezone:</b> ${data.timezone}` : "",
    `🏢 <b>ISP:</b> ${data.isp || "Unknown"}`,
    `🏷️ <b>Org:</b> ${data.org || "Unknown"}`,
    "",
    `• VPN / Proxy: <b>${data.vpn ? "YES" : "No"}</b>`,
    `• Datacenter / VPS: <b>${data.datacenter ? "YES" : "No"}</b>`,
    "",
    risk,
    `📄 <b>Page:</b> ${path}`,
    userAgent ? `🖥️ <b>User-Agent:</b> <code>${userAgent.slice(0, 180)}</code>` : "",
    `🕐 ${new Date().toISOString()}`,
    "",
    `🔗 <a href="https://www.ip2proxy.com/${encodeURIComponent(ip)}#proxyresult">Open IP2Proxy</a>`,
  ]
    .filter(Boolean)
    .join("\n");
};

const HOSTING_HINTS = /amazon|aws|google|azure|digitalocean|linode|vultr|ovh|hetzner|contabo|cloudflare|hostinger|leaseweb|datacenter|hosting|vps/i;

const lookupVisitor = async (ip: string) => {
  try {
    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,regionName,city,timezone,isp,org,as,proxy,hosting,query`
    );
    const data = response.ok ? await response.json() : null;
    if (data?.status === "success") {
      return {
        city: data.city,
        region: data.regionName,
        country: data.country,
        timezone: data.timezone,
        isp: data.isp,
        org: data.org,
        vpn: Boolean(data.proxy),
        datacenter: Boolean(data.hosting),
      };
    }
  } catch {
    // Fall through to HTTPS lookup for hosts that block plain HTTP.
  }

  const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`);
  const data = response.ok ? await response.json() : {};
  const isp = data.connection?.isp || "";
  const org = data.connection?.org || isp;

  return {
    city: data.city,
    region: data.region,
    country: data.country,
    timezone: data.timezone?.id,
    isp,
    org,
    vpn: Boolean(data.security?.proxy),
    datacenter: HOSTING_HINTS.test(`${isp} ${org}`),
  };
};

const sendToDiscord = async (ip: string) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  console.log(webhookUrl);
  
  if (!webhookUrl) {
    console.error("Discord webhook URL is not configured");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [{
          title: "@here: Website Visitor Alert! 🚀",
          description: `Someone with IP: ${ip} just visited your website!`,
          color: 3447003, // Blue color
          fields: [
            {
              name: "IP Details",
              value: `[View IP Info](https://www.ip2proxy.com/${ip}#proxyresult)`,
              inline: true
            },
            {
              name: "Time",
              value: new Date().toLocaleString(),
              inline: true
            }
          ],
          footer: {
            text: "Portfolio Visitor Tracker",
            icon_url: "https://cdn.discordapp.com/avatars/329391537592991746/590533d740458158e7134472a6585b9a.webp?size=80"
          }
        }]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Failed to send IP address to Discord:", errorText);
      throw new Error(`Discord API error: ${errorText}`);
    }

    console.log("✅ IP address sent to Discord successfully!");
  } catch (error) {
    console.error("⚠️ Error sending IP address to Discord:", error);
    throw new Error("Failed to send IP address to Discord");
  }
};
