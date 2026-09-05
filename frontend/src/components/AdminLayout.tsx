"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getMe } from "@/lib/api";
import { LayoutDashboard, CreditCard, FileText, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }
    
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
        return;
      }
      try {
        const res = await getMe();
        if (res.success && res.user.role === "ADMIN") {
          setUser(res.user);
          setLoading(false);
        } else {
          throw new Error("Not authorized");
        }
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [pathname, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0C10] text-gray-500 dark:text-slate-400">Loading...</div>;
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0B0C10] transition-colors duration-300">
      <aside className="w-64 bg-white dark:bg-[#13141C] border-r border-gray-200 dark:border-slate-800 hidden md:flex flex-col transition-colors duration-300">
        <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Flowmetrics</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">Admin Panel</p>
          </div>
          <ThemeToggle />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname === '/admin' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/pricing" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname.startsWith('/admin/pricing') ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50'}`}>
            <CreditCard size={20} /> Pricing
          </Link>
          <Link href="/admin/blog" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname.startsWith('/admin/blog') ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50'}`}>
            <FileText size={20} /> Blog
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <button onClick={() => { localStorage.removeItem("token"); router.push("/admin/login"); }} className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-[#0B0C10] transition-colors duration-300">
        {children}
      </main>
    </div>
  );
}
