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

    if (!entries || !Array.isArray(entries)) {
      throw new Error("Invalid webhook payload: Missing 'entry' array");
    }

    await dbConnect();
    const pageAccessTokens = {};
    const messagesToStore = [];

    for (const entry of entries) {
      for (const event of entry.messaging || []) {
        const message = event.message;
        const senderId = event.sender?.id;
        const recipientId = event.recipient?.id;
        const timestamp = event.timestamp;

        if (!senderId || !recipientId || !message?.mid) {
          console.warn("⚠️ Skipping event due to missing data:", event);
          continue;
        }

        // Check if message already exists in Redis
        const messageExists = await redis.lrange("message_queue", 0, -1).then(messages =>
          messages.some(msg => JSON.parse(msg).message_id === message.mid)
        );

        if (messageExists) {
          console.log(`⏩ Skipping duplicate message: ${message.mid}`);
          continue;
        }

        if (!pageAccessTokens[recipientId]) {
          pageAccessTokens[recipientId] = await getPageAccessTokenFromDB(recipientId);
        }

        const messageData = {
          message_id: message.mid,
          sender_id: senderId,
          recipient_id: recipientId,
          text: message.text || "[Non-text message]",
          sent_time: new Date(timestamp).toISOString(),
          page_access_token: pageAccessTokens[recipientId],
        };

        messagesToStore.push(JSON.stringify(messageData));
      }
    }

    // Store only unique messages
    if (messagesToStore.length > 0) {
      await redis.rpush("message_queue", ...messagesToStore);
    }

    // Retrieve the latest messages
    const queueLength = await redis.llen("message_queue");
    const messagesToLog = await redis.lrange("message_queue", Math.max(0, queueLength - 10), queueLength - 1);

    try {
      console.log("📬 Last Messages in Queue:", messagesToLog.map(msg => JSON.parse(msg)));
    } catch (error) {
      console.error("❌ Error parsing messages from Redis:", error, messagesToLog);
    }

    return NextResponse.json({ message: "EVENT_RECEIVED_AND_STORED" }, { status: 200 });

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch page access token from the database
async function getPageAccessTokenFromDB(page_id) {
  try {
    if (!page_id) throw new Error("Missing page_id");

    const page = await Page.findOne({ page_id });
    if (!page) throw new Error(`Page not found for ID: ${page_id}`);

    return page.access_token;
  } catch (error) {
    throw new Error(`Failed to get access token: ${error.message}`);
  }
}
