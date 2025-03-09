import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const { page_id } = await request.json(); // Match parameter name from client
  
      if (!page_id) {
        return NextResponse.json(
          { error: "Missing page ID" },
          { status: 400 }
        );
      }
  
      const client = await dbConnect();
      const db = client.db();
  
      // Convert to number if you store page_id as number
      const result = await db.collection("pages").deleteOne({ 
        page_id // or String(page_id) depending on storage
      });
  
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { error: "Page not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "Page disconnected" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Disconnect error:", error);
      return NextResponse.json(
        { error: "Server error" },
        { status: 500 }
      );
    }
  }