import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }
    const token = signToken({ id: user._id, role: user.role });
    return NextResponse.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
