"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Added to highlight the active menu item!
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, MessageSquare, Calendar, Menu, X } from "lucide-react";
import { Toaster } from "sonner";

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
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 md:flex-row">
      <Toaster position="top-center" richColors closeButton />
      {/* --- MOBILE TOP NAVIGATION --- */}
      {/* This only shows on small screens and acts as the header */}
      <div className="z-20 flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <span className="text-xl font-bold tracking-tight text-gray-900">
          Jogire <span className="text-emerald-600">Admin</span>
        </span>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg bg-gray-50 p-2 text-gray-600 transition-colors hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* --- MOBILE BACKDROP OVERLAY --- */}
      {/* Darkens the background when the sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- THE RESPONSIVE SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"} `}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Jogire <span className="text-emerald-600">Admin</span>
          </span>

          {/* Mobile Close Button inside the sidebar */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            // Check if the current URL matches the link to highlight it
            const isActive =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)} // Auto-close menu on mobile when clicked
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                  isActive ? "bg-emerald-50 text-emerald-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${isActive ? "text-emerald-600" : "text-gray-500"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="flex shrink-0 items-center gap-3 border-t border-gray-200 bg-gray-50/50 p-4">
          <UserButton />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Admin Portal</span>
            <span className="text-xs text-gray-500">Highly Secure</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      {/* Added responsive padding so it's not squished on mobile */}
      <main className="w-full flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
