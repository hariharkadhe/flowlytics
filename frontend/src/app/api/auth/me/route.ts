import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return NextResponse.json({ success: false, message: "No token" }, { status: 401 });
    const decoded = verifyToken(token);
    await connectDB();
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    return NextResponse.json({ success: true, user });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 401 });
  }
}

