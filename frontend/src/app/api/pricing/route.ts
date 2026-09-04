import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PricingPlan } from "@/models/PricingPlan";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const plans = await PricingPlan.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: plans });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const decoded = verifyToken(token);
    if (decoded.role !== "ADMIN") return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    await connectDB();
    const body = await req.json();
    const plan = await PricingPlan.create(body);
    return NextResponse.json({ success: true, data: plan }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
