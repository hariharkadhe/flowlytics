import Link from "next/link";
import { LayoutDashboard, LogOut, CheckCircle } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Flowmetrics</h2>
          <p className="text-sm text-gray-500">User Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 transition">
            <LayoutDashboard size={20} /> Overview
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link href="/" className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut size={20} /> Log out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center mb-4">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard!</h1>
            <p className="text-gray-600 text-lg">
              Your subscription is active. This is a dummy user dashboard for demonstration purposes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Active Projects</h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Team Members</h3>
              <p className="text-3xl font-bold text-gray-900">1</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Cycle Time</h3>
              <p className="text-3xl font-bold text-gray-900">--</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
