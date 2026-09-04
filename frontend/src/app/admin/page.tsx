"use client";
import { useEffect, useState } from "react";
import { getPricingPlans, getAdminBlogPosts } from "@/lib/api";

export default function AdminDashboard() {
  const [pricingCount, setPricingCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    getPricingPlans().then(res => { if(res.success) setPricingCount(res.data.length); });
    getAdminBlogPosts().then(res => { if(res.success) setBlogCount(res.data.length); });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Pricing Plans</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{pricingCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Blog Posts</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{blogCount}</p>
        </div>
      </div>
    </div>
  );
}
