import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import IpAddress from "@/models/IP";

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint is for IP logging via POST" },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  await connectDb();

  const clientIp =
    req.headers.get("x-forwarded-for") || req.headers.get("remote-addr");

  if (!clientIp) {
    console.error("Failed to retrieve IP address");
    return NextResponse.json(
      { error: "Failed to retrieve IP address" },
      { status: 400 }
    );
  }

  if (clientIp === "::ffff:127.0.0.1") {
    return NextResponse.json(
      { message: "IP address is localhost" },
      { status: 200 }
    );
  }

  try {
    const result = await IpAddress.findOne({ ip: clientIp });

    await sendToDiscord(clientIp);
    if (result) {
      return NextResponse.json(
        { message: "IP address already exists" },
        { status: 200 }
      );
    }

    const ipRecord = new IpAddress({ ip: clientIp });
    await ipRecord.save();


    return NextResponse.json(
      {
        message:
          "IP address sent to Discord and saved to database successfully",
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
