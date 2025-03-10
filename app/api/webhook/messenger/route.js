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

    // Connect to the database once
    await dbConnect();

    // Cache page access tokens to avoid redundant DB calls
    const pageAccessTokens = {};

    const messagesToStore = [];

    for (const entry of entries) {
      for (const event of entry.messaging || []) {
        const message = event.message;
        const senderId = event.sender?.id;
        const recipientId = event.recipient?.id;
        const timestamp = event.timestamp;

        if (!senderId || !recipientId) {
          console.warn("⚠️ Skipping event due to missing sender or recipient:", event);
          continue;
        }

        // Get page access token (cache if possible)
        if (!pageAccessTokens[recipientId]) {
          pageAccessTokens[recipientId] = await getPageAccessTokenFromDB(recipientId);
        }

        // Build message data object
        const messageData = {
          message_id: message?.mid || "N/A",
          sender_id: senderId,
          recipient_id: recipientId,
          text: message?.text || "[Non-text message]",
          sent_time: new Date(timestamp).toISOString(),
          page_access_token: pageAccessTokens[recipientId],
        };

        messagesToStore.push(JSON.stringify(messageData));
      }
    }

    // Push all messages to Redis in one call (batch insert)
    if (messagesToStore.length > 0) {
      await redis.rpush("message_queue", ...messagesToStore);
    }

    // Retrieve and log the last 10 messages from Redis for debugging
    const queueLength = await redis.llen("message_queue");
    const messagesToLog = await redis.lrange("message_queue", Math.max(0, queueLength - 10), queueLength - 1);

    try {
      const parsedMessages = messagesToLog.map(msg => (typeof msg === "string" ? JSON.parse(msg) : msg));
      console.log("📬 Last 10 Messages in Queue:", parsedMessages);
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