import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ status: "published" }).sort({ publishedAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
