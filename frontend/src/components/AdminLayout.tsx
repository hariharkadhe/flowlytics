"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getMe } from "@/lib/api";
import { LayoutDashboard, CreditCard, FileText, LogOut } from "lucide-react";

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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Flowmetrics</h2>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname === '/admin' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/pricing" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname.startsWith('/admin/pricing') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <CreditCard size={20} /> Pricing
          </Link>
          <Link href="/admin/blog" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname.startsWith('/admin/blog') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <FileText size={20} /> Blog
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button onClick={() => { localStorage.removeItem("token"); router.push("/admin/login"); }} className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
