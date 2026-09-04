"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">Flowmetrics</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium">Blog</Link>
          <Link href="/admin/login" className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
}
