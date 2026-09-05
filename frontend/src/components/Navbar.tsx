"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="border-b dark:border-slate-800 bg-white/80 dark:bg-[#0B0C10]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">Flowmetrics</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 font-medium transition-colors">Home</Link>
          <Link href="/blog" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 font-medium transition-colors">Blog</Link>
          <ThemeToggle />
          <Link href="/admin/login" className="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
}
