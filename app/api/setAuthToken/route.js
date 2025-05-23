import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const POST = async (request) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 400 });
    }

    const response = NextResponse.json(
      { message: "User token has been set successfully" },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `Authorization=Bearer ${token}; HttpOnly; Secure; SameSite=None; Path=/; Domain=.replix.space; Max-Age=86400`
    );

    const decoded = jwt.decode(token);
    request.headers.set('x-user-id',
       decoded.sub);

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
