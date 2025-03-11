import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { dbConnect } from "@/lib/mongo";
import { Page } from "@/model/page-model";

export async function GET(request) {
  try {
    const VERIFY_TOKEN = "my_secret_verify_token_456";
    const { searchParams } = new URL(request.url);

    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new NextResponse(challenge, { status: 200 });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const entries = body.entry;

    console.log(process.env.KV_REST_API_URL)
    console.log(process.env.KV_REST_API_TOKEN)

    for (const entry of entries) {
      const messagingEvents = entry.messaging;
      
      for (const event of messagingEvents) {
        const message = event.message;
        const senderId = event.sender.id;
        const recipientId = event.recipient.id;
        const timestamp = event.timestamp;

        await redis.lpush("message_queue", JSON.stringify({
          message_id: message.mid,
          sender_id: senderId,
          recipient_id: recipientId,
          text: message.text,
          sent_time: new Date(timestamp).toISOString(),
          page_access_token: await getPageAccessTokenFromDB(recipientId),
        }));

      }
    }

    return NextResponse.json(
      { message: "Message has been queued successfully" }, 
      { status: 200 }
    );

  } catch (error) {
    throw new Error(`Failed to queue the message: ${error.message}`);
  }
}

async function getPageAccessTokenFromDB(page_id) {
  try {
    await dbConnect();
    const page = await Page.findOne({ page_id });
    if (!page) throw new Error("Page not found");
    return page.access_token;
  } catch (error) {
    throw new Error(`Failed to get access token: ${error.message}`);
  }
}
