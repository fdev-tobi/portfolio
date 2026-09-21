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
  const { firstname, lastname, email, message } = await req.json();
  const clientIp =
    req.headers.get("x-forwarded-for") || req.headers.get("remote-addr") || "unknown";

  try {
    await sendToTelegram(clientIp, firstname, lastname, email, message);

    if (process.env.MONGODB_URI) {
      await connectDb();
      const ipRecord = new IpAddress({ ip: clientIp });
      await ipRecord.save();
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

const sendToTelegram = async (ip: string, firstname: string, lastname: string, email: string, message: string) => {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !chatId) {
    console.error("Telegram is not configured");
    return;
  }

  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  try {
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📬 *New Contact Request Received*:
        \n🌐 *IP Address*: ${ip}
        \n👤 *First Name*: ${firstname}
        \n👥 *Last Name*: ${lastname}
        \n📧 *Email*: ${email}
        \n💬 *Message*: ${message}`,
        parse_mode: "Markdown"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send IP address to Telegram:", errorText);
      throw new Error(`Telegram API error: ${errorText}`);
    }

    console.log("IP address sent to Telegram successfully");
  } catch (error) {
    console.error("Error sending IP address to Telegram:", error);
    throw new Error("Failed to send IP address to Telegram");
  }
};
