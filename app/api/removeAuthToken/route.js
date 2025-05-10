import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json(
      { message: "User has been logged out successfully" },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      "Authorization=; HttpOnly; Secure; SameSite=None; Path=/; Domain=.replix.space; Max-Age=0"
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
