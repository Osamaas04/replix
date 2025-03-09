import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { access_token, psid } = await request.json();

    const response = await fetch(`https://graph.facebook.com/v18.0/${psid}/messages?access_token=${access_token}&fields=from,message,created_time`, {
        method: "GET",
        headers: {"Content-Type" : "application/json"},
    })

    if(!response.ok) {
        return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 400 });
    }

    const data = await response.json();
    console.log(data)

    return NextResponse.json({ message: "Conversations have been fetched successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
