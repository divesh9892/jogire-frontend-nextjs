"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Added to highlight the active menu item!
import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  Menu, 
  X 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Define navigation items once to keep the code DRY and easy to manage
  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    // Base layout: Column on mobile (for the top nav), Row on desktop
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      
      {/* --- MOBILE TOP NAVIGATION --- */}
      {/* This only shows on small screens and acts as the header */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shrink-0 z-20">
        <span className="text-xl font-bold text-gray-900 tracking-tight">Jogire <span className="text-emerald-600">Admin</span></span>
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* --- MOBILE BACKDROP OVERLAY --- */}
      {/* Darkens the background when the sidebar is open on mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- THE RESPONSIVE SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
          <span className="text-xl font-bold text-gray-900 tracking-tight">Jogire <span className="text-emerald-600">Admin</span></span>
          
          {/* Mobile Close Button inside the sidebar */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            // Check if the current URL matches the link to highlight it
            const isActive = item.href === '/admin' 
  ? pathname === '/admin' 
  : pathname.startsWith(item.href);
            
            return (
              <Link 
                key={item.name}
                href={item.href} 
                onClick={() => setIsSidebarOpen(false)} // Auto-close menu on mobile when clicked
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center gap-3 shrink-0 bg-gray-50/50">
          <UserButton />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Admin Portal</span>
            <span className="text-xs text-gray-500">Highly Secure</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      {/* Added responsive padding so it's not squished on mobile */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}