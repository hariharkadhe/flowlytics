import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PricingPlan } from "@/models/PricingPlan";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

function requireAdmin(req: NextRequest) {
  const token = getTokenFromHeader(req);
  if (!token) return false;
  try { const d = verifyToken(token); return d.role === "ADMIN"; } catch { return false; }
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const plan = await PricingPlan.findById(id);
  if (!plan) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: plan });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req)) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const plan = await PricingPlan.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, data: plan });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req)) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await connectDB();
  await PricingPlan.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
