import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Page } from "@/model/page-model";


export const POST = async (request) => {
  try {
    const { access_token } = await request.json();

    await dbConnect();

    const page = await Page.findOne({ access_token });

    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/conversations?fields=participants&access_token=${access_token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch psid" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const conversationId = data.data[0].id;

    // page.psid = psid;
    // await page.save();

    const conversationsResponse = await fetch("http://localhost:3000/api/conversations",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token,
          conversationId,
        }),
      }
    );

    if (!conversationsResponse.ok) {
      return NextResponse.json({ error: "Failed to forward conversation Id and access token" },{ status: 400 });
    }

    return NextResponse.json({ message: "Conversation Id has been stored successfully" },{ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
