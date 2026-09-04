import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

function requireAdmin(req: NextRequest) {
  const token = getTokenFromHeader(req);
  if (!token) return false;
  try { const d = verifyToken(token); return d.role === "ADMIN"; } catch { return false; }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req)) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id);
  if (!post) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: post });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req)) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  if (body.status === "published" && !body.publishedAt) body.publishedAt = new Date();
  const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, data: post });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req)) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await connectDB();
  await BlogPost.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
