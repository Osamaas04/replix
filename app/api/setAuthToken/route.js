import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 400 });
    }

    // Create the response and set the cookie with the necessary attributes
    const response = NextResponse.json(
      { message: "User token has been set successfully" },
      { status: 200 }
    );

    // Set the cookie with domain, SameSite, Secure, and HttpOnly attributes
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure; SameSite=None; Path=/; Domain=.replix.space;`  // Max-Age = 1 hour
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
