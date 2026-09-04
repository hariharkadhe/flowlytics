import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PricingPlan } from "@/models/PricingPlan";
import { BlogPost } from "@/models/BlogPost";

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing
    await User.deleteMany({});
    await PricingPlan.deleteMany({});
    await BlogPost.deleteMany({});

    // Admin user
    await User.create({ name: "Admin", email: "admin@example.com", password: "Admin@12345", role: "ADMIN" });

    // Pricing plans
    await PricingPlan.insertMany([
      { name: "Starter", price: 9, billingCycle: "monthly", features: ["5 projects", "Basic analytics", "Email reports"], highlighted: false, order: 1 },
      { name: "Pro", price: 29, billingCycle: "monthly", features: ["Unlimited projects", "Advanced analytics", "Team reports"], highlighted: true, order: 2 },
      { name: "Business", price: 99, billingCycle: "monthly", features: ["Everything in Pro", "Custom integrations", "24/7 Support"], highlighted: false, order: 3 },
    ]);

    // Blog posts
    await BlogPost.insertMany([
      { title: "How to Measure Engineering Impact", slug: "measure-engineering-impact", excerpt: "Stop measuring lines of code. Here is how to measure what truly matters.", content: "<h2>Introduction</h2><p>Engineering impact is more than just velocity. It is about outcomes, reliability, and team health. In this post, we explore the metrics that matter most for modern engineering teams.</p><h2>Key Metrics</h2><p>Focus on cycle time, deployment frequency, and change failure rate. These are the DORA metrics that top engineering organizations track.</p>", author: "Harihar Kadhe", status: "published", featured: true, publishedAt: new Date() },
      { title: "5 Ways Remote Teams Can Stay Productive", slug: "remote-team-productivity", excerpt: "Remote work is here to stay. Here are 5 proven strategies to keep your team productive.", content: "<h2>1. Async-First Communication</h2><p>Default to written, asynchronous communication to respect time zones and deep work.</p><h2>2. Clear Goals and OKRs</h2><p>Without visibility into office activity, outcomes become the only reliable measure of progress.</p>", author: "Harihar Kadhe", status: "published", featured: false, publishedAt: new Date() },
      { title: "Understanding Cycle Time in Software Teams", slug: "cycle-time-software-teams", excerpt: "Cycle time is one of the most important metrics for software teams. Here is what it means.", content: "<h2>What is Cycle Time?</h2><p>Cycle time is the total time from when work starts to when it is delivered. Reducing cycle time is the #1 lever for improving team throughput.</p>", author: "Harihar Kadhe", status: "published", featured: false, publishedAt: new Date() },
    ]);

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
