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

    for (const entry of entries) {
      const messagingEvents = entry.messaging;
      
      for (const event of messagingEvents) {
        const message = event.message;
        const senderId = event.sender.id;
        const recipientId = event.recipient.id;
        const timestamp = event.timestamp;
        
        const redisKey = `message:${message.mid}`;

        await redis.hset(redisKey, {
          message_id: message.mid,
          sender_id: senderId,
          recipient_id: recipientId,
          text: message.text,
          sent_time: new Date(timestamp).toISOString(),
          page_access_token: await getPageAccessTokenFromDB(recipientId),
        });

        await redis.expire(redisKey, 86400);

        const storedMessage = await redis.hgetall(redisKey);
        console.log(`✅ Stored message: ${redisKey}`, storedMessage);
      }
    }

    return NextResponse.json(
      { message: "EVENT_RECEIVED_AND_STORED" }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
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

//hi