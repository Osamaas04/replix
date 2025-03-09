import { NextResponse } from "next/server";

export const POST = async (request) => {
    
  try {
    const response = await fetch("https://graph.facebook.com/v22.0/me/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        id,
        message,
      })
    })
  } catch (error) {
    return new NextResponse(error.message, {
      status: 400,
    });
  }
};
