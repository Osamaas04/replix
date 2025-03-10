import { dbConnect } from "@/lib/mongo";
import { Page } from "@/model/page-model";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { page_id } = body;
        const { isActive } = body;

        await dbConnect();
        const page = await Page.findOne({page_id})

        if(!page) {
            return NextResponse.json({error: "page doesn't exist"}, {status: 400})
        }

        if(!isActive) {
            page.isActive = true;
            await page.save();
        } else {
            page.isActive = false;
            await page.save();
        }

        return NextResponse.json({message: "The status of the activation has been updated", isActive: page.isActive}, {status: 200})
    } catch(error) {
        throw new Error(`Failed to update the status of the activation: ${error.message}`);
    }
}