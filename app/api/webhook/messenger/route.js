export async function GET(req) {
  try {
    const VERIFY_TOKEN = "my_secret_verify_token_456"; // Must match what you set in Facebook Developer Console

    const url = new URL(req.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 }); // ✅ Success: Facebook webhook is verified
    } else {
      return new Response("Forbidden", { status: 403 }); // ❌ Incorrect token
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
