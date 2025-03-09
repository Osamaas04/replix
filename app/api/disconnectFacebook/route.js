import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { storedPageId } = await request.json();

    if (!storedPageId) {
      return NextResponse.json(
        { error: "Failed to get page ID" },
        { status: 400 }
      );
    }

    const client = await dbConnect();
    const db = client.db();

    const result = await db.collection("pages").deleteOne({ page_id: storedPageId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Page has been disconnected" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error disconnecting page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
