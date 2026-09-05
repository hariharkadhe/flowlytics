"use client";
import { useEffect, useState } from "react";
import { getPricingPlans } from "@/lib/api";
import { Check, Star, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const testimonials = [
  { name: "Sarah Jenkins", role: "CTO at TechCorp", content: "Flowmetrics transformed how we measure engineering effort. It's not about lines of code anymore, it's about impact." },
  { name: "David Smith", role: "VP of Engineering", content: "The best tool for our hybrid team. We finally have clarity on workload distribution." },
  { name: "Alex Chen", role: "Engineering Manager", content: "Cycle time reduced by 30% in just two months after adopting Flowmetrics." },
];

export default function Home() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<any | null>(null);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const router = useRouter();

  useEffect(() => {
    getPricingPlans().then(res => {
      if (res.success) setPlans(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-[#0B0C10] transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 transition-colors">
          Measure <span className="text-blue-600 dark:text-blue-500">Impact</span>, Not Hours.
        </h1>
        <p className="text-xl text-gray-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors">
          Flowmetrics provides deep insights into your team's workflow, helping remote and hybrid teams achieve clarity, balance workloads, and deliver faster.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#pricing" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-blue-900/50">
            Start Free Trial
          </a>
          <Link href="/blog" className="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-200 border-2 border-gray-200 dark:border-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:border-gray-300 dark:hover:border-slate-600 transition">
            Read Our Blog
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-[#13141C] px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Engineering Leaders</h2>
            <p className="text-gray-600 dark:text-slate-400">See what our customers are saying about Flowmetrics.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-[#0B0C10] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                <div className="flex text-yellow-400 dark:text-yellow-500 mb-4">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-700 dark:text-slate-300 mb-6 text-lg italic">"{t.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-gray-500 dark:text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-slate-400">Choose the perfect plan for your team's needs.</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-slate-500">Loading pricing plans...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {plans.map((plan) => {
              const isSelected = selectedPlanId ? selectedPlanId === plan._id : plan.highlighted;
              return (
              <div key={plan._id} className={`bg-white dark:bg-[#13141C] rounded-3xl p-8 border transition-all duration-300 ${isSelected ? 'border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-100 dark:shadow-blue-900/20 scale-105' : 'border-gray-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-slate-700 cursor-pointer'}`} onClick={() => setSelectedPlanId(plan._id)}>
                {plan.highlighted && <div className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wider uppercase mb-2">Most Popular</div>}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-gray-500 dark:text-slate-400">/{plan.billingCycle === 'monthly' ? 'mo' : plan.billingCycle}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanId(plan._id);
                    setCheckoutPlan(plan);
                  }}
                  className={`w-full py-3 px-6 rounded-xl font-bold mb-8 transition ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                >
                  {isSelected ? 'Selected' : 'Get Started'}
                </button>
                <div className="space-y-4">
                  {plan.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-gray-600 dark:text-slate-400">
                      <Check className="text-green-500 dark:text-green-400 shrink-0 mt-0.5" size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )})}
          </div>
        )}
      </section>

      {/* Checkout Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#13141C] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border dark:border-slate-800">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {checkoutState === 'idle' ? 'Checkout' : checkoutState === 'processing' ? 'Processing...' : 'Success!'}
              </h3>
              {checkoutState !== 'processing' && (
                <button onClick={() => { setCheckoutPlan(null); setCheckoutState('idle'); }} className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition">
                  <X size={24} />
                </button>
              )}
            </div>
            
            {checkoutState === 'idle' && (
              <div className="p-6 bg-gray-50 dark:bg-[#0B0C10]">
                <p className="text-gray-600 dark:text-slate-400 mb-4 text-center">You are about to subscribe to the</p>
                <div className="bg-white dark:bg-[#13141C] border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm mb-6">
                  <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{checkoutPlan.name} Plan</h4>
                  <div className="text-gray-900 dark:text-white">
                    <span className="text-4xl font-extrabold">${checkoutPlan.price}</span>
                    <span className="text-gray-500 dark:text-slate-400">/{checkoutPlan.billingCycle === 'monthly' ? 'mo' : checkoutPlan.billingCycle}</span>
                  </div>
                </div>
                <button onClick={() => {
                  setCheckoutState('processing');
                  setTimeout(() => {
                    setCheckoutState('success');
                    setTimeout(() => {
                      setCheckoutPlan(null);
                      setCheckoutState('idle');
                      router.push('/dashboard');
                    }, 2000);
                  }, 1500);
                }} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 hover:bg-blue-700 hover:scale-[1.02] transition transform">
                  Confirm & Pay
                </button>
              </div>
            )}

            {checkoutState === 'processing' && (
              <div className="p-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0C10]">
                <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-slate-400 font-medium animate-pulse">Processing secure payment...</p>
              </div>
            )}

            {checkoutState === 'success' && (
              <div className="p-12 flex flex-col items-center justify-center bg-green-50 dark:bg-green-950/20">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} className="text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-2">Payment Successful!</h4>
                <p className="text-green-700 dark:text-green-500/80 text-center">Welcome to the {checkoutPlan.name} plan. Redirecting to dashboard...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
