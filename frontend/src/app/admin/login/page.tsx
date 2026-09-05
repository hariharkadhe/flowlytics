"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Key, ArrowRight, CheckCircle, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError("");
      const res = await login(data);
      if (res.success && res.user?.role === "ADMIN") {
        localStorage.setItem("token", res.token);
        router.push("/admin");
      } else {
        setError("Not authorized as admin.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const fillDefaultCredentials = () => {
    setValue("email", "admin@example.com");
    setValue("password", "Admin@12345");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0C10] p-4 text-gray-900 dark:text-slate-200 font-sans transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        
        <div className="bg-white dark:bg-[#13141C] border border-gray-200 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl p-8 mb-6 transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Access</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm">Secure CMS Authentication</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center justify-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">Admin Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#0B0C10] border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-600"
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#0B0C10] border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-600 tracking-widest"
                  placeholder="••••••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-500 dark:to-purple-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? "Authenticating..." : "Authenticate & Enter CMS"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={fillDefaultCredentials}
              className="w-full bg-gray-100 dark:bg-slate-800/50 hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-700/50 text-sm"
            >
              <Key size={16} className="text-gray-500 dark:text-slate-400" />
              Fill Default Admin Credentials
            </button>
            <p className="text-center text-xs text-gray-500 dark:text-slate-500 mt-4">
              Default: <span className="text-gray-700 dark:text-slate-300">admin@example.com</span> / <span className="text-gray-700 dark:text-slate-300">Admin@12345</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition flex items-center justify-center gap-2">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 bg-green-50 dark:bg-[#062417] border border-green-200 dark:border-[#0A3D28] text-green-700 dark:text-[#34D399] px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg shadow-black/10 dark:shadow-black/50 transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <CheckCircle size={20} />
        <span className="font-medium text-sm pr-6">Demo admin credentials filled!</span>
        <button onClick={() => setShowToast(false)} className="text-green-600 dark:text-[#10B981] hover:text-green-800 dark:hover:text-white transition ml-auto">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
