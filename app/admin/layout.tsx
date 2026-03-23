import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Users, MessageSquare, Calendar } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-900 tracking-tight">Jogire <span className="text-emerald-600">Admin</span></span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Overview</span>
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Bookings</span>
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Inquiries</span>
          </Link>
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center gap-3">
          <UserButton />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Admin Portal</span>
            <span className="text-xs text-gray-500">Highly Secure</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}