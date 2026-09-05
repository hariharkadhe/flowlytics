"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-white dark:bg-[#0B0C10] border-t dark:border-slate-800 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">F</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-slate-100">Flowmetrics</span>
        </div>
        <div className="text-gray-500 dark:text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Flowmetrics Inc. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-gray-500 dark:text-slate-400">
          <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
