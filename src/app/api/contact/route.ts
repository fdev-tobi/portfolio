import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import IpAddress from "@/models/IP";
import { links } from "@/config";

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint is for contact form submissions via POST" },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  const { firstname, lastname, email, message } = await req.json();

  if (!firstname || !lastname || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const clientIp =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("remote-addr") ||
    "unknown";

  try {
    await sendContactEmail({
      firstname: String(firstname),
      lastname: String(lastname),
      email: String(email),
      message: String(message),
      ip: String(clientIp),
    });

    // Optional Telegram mirror when configured
    await sendToTelegram(
      String(clientIp),
      String(firstname),
      String(lastname),
      String(email),
      String(message)
    );

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

type ContactPayload = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  ip: string;
};

const sendContactEmail = async ({
  firstname,
  lastname,
  email,
  message,
  ip,
}: ContactPayload) => {
  const to = process.env.CONTACT_EMAIL || links.ownerEmail;

  // FormSubmit delivers to the inbox after a one-time email confirmation
  const response = await fetch(`https://formsubmit.co/ajax/${to}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: `${firstname} ${lastname}`,
      email,
      message,
      _subject: `Portfolio contact from ${firstname} ${lastname}`,
      _template: "table",
      _replyto: email,
      _captcha: "false",
      ip,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to send contact email:", errorText);
    throw new Error(`Email delivery failed: ${errorText}`);
  }

  console.log(`Contact message sent to ${to}`);
};

const sendToTelegram = async (
  ip: string,
  firstname: string,
  lastname: string,
  email: string,
  message: string
) => {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !chatId) {
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
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send contact to Telegram:", errorText);
    }
  } catch (error) {
    console.error("Error sending contact to Telegram:", error);
  }
};
