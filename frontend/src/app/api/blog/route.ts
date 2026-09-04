import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

function requireAdmin(req: NextRequest) {
  const token = getTokenFromHeader(req);
  if (!token) return false;
  try { const d = verifyToken(token); return d.role === "ADMIN"; } catch { return false; }
}

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: posts });
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  await connectDB();
  const body = await req.json();
  if (body.status === "published" && !body.publishedAt) body.publishedAt = new Date();
  const post = await BlogPost.create(body);
  return NextResponse.json({ success: true, data: post }, { status: 201 });
}
