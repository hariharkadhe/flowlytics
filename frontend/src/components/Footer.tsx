"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Flowmetrics</h2>
        <p className="mb-6">Empowering remote teams to achieve deep work and clarity.</p>
        <p className="text-sm">© {new Date().getFullYear()} Flowmetrics. All rights reserved.</p>
      </div>
    </footer>
  );
}
