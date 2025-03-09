export async function POST(request) {
  try {
    const body = await request.json();

    console.log("📩 Incoming Webhook Data:", JSON.stringify(body, null, 2));

    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new Response("Server Error", { status: 500 });
  }
}
