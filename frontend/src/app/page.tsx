"use client";
import { useEffect, useState } from "react";
import { getPricingPlans } from "@/lib/api";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const testimonials = [
  { name: "Sarah Jenkins", role: "CTO at TechCorp", content: "Flowmetrics transformed how we measure engineering effort. It's not about lines of code anymore, it's about impact." },
  { name: "David Smith", role: "VP of Engineering", content: "The best tool for our hybrid team. We finally have clarity on workload distribution." },
  { name: "Alex Chen", role: "Engineering Manager", content: "Cycle time reduced by 30% in just two months after adopting Flowmetrics." },
];

export default function Home() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    getPricingPlans().then(res => {
      if (res.success) setPlans(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
          Measure <span className="text-blue-600">Impact</span>, Not Hours.
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Flowmetrics provides deep insights into your team's workflow, helping remote and hybrid teams achieve clarity, balance workloads, and deliver faster.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#pricing" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Start Free Trial`n          </a>
          <Link href="/blog" className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-gray-300 transition">
            Read Our Blog
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Engineering Leaders</h2>
            <p className="text-gray-600">See what our customers are saying about Flowmetrics.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-700 mb-6 text-lg italic">"{t.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the perfect plan for your team's needs.</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading pricing plans...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {plans.map((plan) => {
              const isSelected = selectedPlanId ? selectedPlanId === plan._id : plan.highlighted;
              return (
              <div key={plan._id} className={`bg-white rounded-3xl p-8 border transition-all duration-300 ${isSelected ? 'border-blue-600 shadow-xl shadow-blue-100 scale-105' : 'border-gray-200 shadow-sm hover:border-blue-300 cursor-pointer'}`} onClick={() => setSelectedPlanId(plan._id)}>
                {plan.highlighted && <div className="text-blue-600 text-sm font-bold tracking-wider uppercase mb-2">Most Popular</div>}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/{plan.billingCycle === 'monthly' ? 'mo' : plan.billingCycle}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanId(plan._id);
                    alert(`Proceeding to checkout with the ${plan.name} plan!`);
                  }}
                  className={`w-full py-3 px-6 rounded-xl font-bold mb-8 transition ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  {isSelected ? 'Selected' : 'Get Started'}
                </button>
                <div className="space-y-4">
                  {plan.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-gray-600">
                      <Check className="text-green-500 shrink-0 mt-0.5" size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )})}
          </div>
        )}
      </section>
    </div>
  );
}

