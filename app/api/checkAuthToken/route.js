import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("Authorization")?.value;

    if (!token) {
      return NextResponse.json({ status: "unauthenticated" }, { status: 200 });
    }

    return NextResponse.json({ status: "authenticated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
