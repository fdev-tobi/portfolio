import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import IpAddress from "@/models/IP";

function extractClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfIp = req.headers.get("cf-connecting-ip");
  const raw =
    forwarded || cfIp || realIp || req.headers.get("remote-addr") || "";
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
      sendVisitToTelegram(clientIp, returning),
      sendToDiscord(clientIp),
    ]);

    return NextResponse.json(
      { message: "Visitor alert sent successfully" },
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

const sendVisitToTelegram = async (ip: string, returning: boolean) => {
  const botUrl = process.env.TELEGRAM_BOT_URL;
  const apiKey = process.env.TELEGRAM_BOT_API_KEY;

  if (botUrl && apiKey) {
    const data = await lookupVisitor(ip);
    const response = await fetch(`${botUrl.replace(/\/$/, "")}/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        ip,
        returning,
        vpn: data.vpn,
        proxy: data.proxy,
        country: data.country,
        region: data.region,
        city: data.city,
        timestamp: new Date().toISOString(),
      }),
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

  const text = await buildVisitMessage(ip);
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
};

const buildVisitMessage = async (ip: string) => {
  const data = await lookupVisitor(ip);
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
  });
  const owner = process.env.PORTFOLIO_OWNER_NAME || "Sanji";
  const checkUrl = `https://www.ip2location.io/${encodeURIComponent(ip)}`;

  return [
    `<b>${owner}'s portfolio is checked by:</b>`,
    "",
    `<b>IP:</b> <code>${ip}</code>`,
    `<b>VPN:</b> ${data.vpn}`,
    `<b>Proxy:</b> ${data.proxy}`,
    `<b>Country:</b> ${data.country}`,
    `<b>Region:</b> ${data.region}`,
    `<b>City:</b> ${data.city}`,
    `<b>Timestamp:</b> ${timestamp}`,
    "",
    `<a href="${checkUrl}">${checkUrl}</a>`,
    "",
    "If vpn is business and proxy is no, in this case check that IP on ip2location.io. Or if you think you need to check double check, check on ip2location.io.",
  ].join("\n");
};

type VisitorLookup = {
  vpn: string;
  proxy: string;
  country: string;
  region: string;
  city: string;
};

const USAGE_TYPE_LABELS: Record<string, string> = {
  COM: "Business",
  ORG: "Organization",
  GOV: "Government",
  MIL: "Military",
  EDU: "Education",
  LIB: "Library",
  CDN: "CDN",
  ISP: "ISP",
  MOB: "Mobile",
  DCH: "Business",
  SES: "Search Engine",
  RSV: "Reserved",
  VPN: "VPN",
};

const lookupVisitor = async (ip: string): Promise<VisitorLookup> => {
  const fromIp2Location = await lookupIp2Location(ip);
  if (fromIp2Location) return fromIp2Location;

  try {
    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,regionName,city,proxy,hosting,mobile`
    );
    const data = response.ok ? await response.json() : null;
    if (data?.status === "success") {
      return {
        vpn: data.hosting ? "Business" : data.proxy ? "VPN" : "no",
        proxy: data.proxy ? "yes" : "no",
        country: data.country || "Unknown",
        region: data.regionName || "Unknown",
        city: data.city || "Unknown",
      };
    }
  } catch {
    // Fall through to HTTPS lookup.
  }

  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`);
    const data = response.ok ? await response.json() : {};
    const isProxy = Boolean(data.security?.proxy);
    const isVpn = Boolean(data.security?.vpn);
    const isHosting = Boolean(data.connection?.type === "hosting");

    return {
      vpn: isHosting ? "Business" : isVpn ? "VPN" : "no",
      proxy: isProxy ? "yes" : "no",
      country: data.country || "Unknown",
      region: data.region || "Unknown",
      city: data.city || "Unknown",
    };
  } catch {
    return {
      vpn: "Unknown",
      proxy: "Unknown",
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
    };
  }
};

const lookupIp2Location = async (
  ip: string
): Promise<VisitorLookup | null> => {
  const key = process.env.IP2LOCATION_API_KEY;
  if (!key) return null;

  try {
    const url = new URL("https://api.ip2location.io/");
    url.searchParams.set("key", key);
    url.searchParams.set("ip", ip);
    url.searchParams.set("format", "json");

    const response = await fetch(url.toString());
    if (!response.ok) return null;

    const data = await response.json();
    const usageType = String(data.usage_type || "")
      .split(",")[0]
      .trim()
      .toUpperCase();
    const vpnLabel =
      USAGE_TYPE_LABELS[usageType] ||
      (data.is_proxy ? "VPN" : usageType || "no");

    return {
      vpn: vpnLabel,
      proxy: data.is_proxy ? "yes" : "no",
      country: data.country_name || "Unknown",
      region: data.region_name || "Unknown",
      city: data.city_name || "Unknown",
    };
  } catch {
    return null;
  }
};

const sendToDiscord = async (ip: string) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  try {
    const data = await lookupVisitor(ip);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Sanji's portfolio is checked by:",
            color: 3447003,
            fields: [
              { name: "IP", value: ip, inline: true },
              { name: "VPN", value: data.vpn, inline: true },
              { name: "Proxy", value: data.proxy, inline: true },
              { name: "Country", value: data.country, inline: true },
              { name: "Region", value: data.region, inline: true },
              { name: "City", value: data.city, inline: true },
              {
                name: "Timestamp",
                value: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
                inline: false,
              },
              {
                name: "Check",
                value: `[ip2location.io](https://www.ip2location.io/${encodeURIComponent(ip)})`,
                inline: false,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send IP address to Discord:", errorText);
    }
  } catch (error) {
    console.error("Error sending IP address to Discord:", error);
  }
};
