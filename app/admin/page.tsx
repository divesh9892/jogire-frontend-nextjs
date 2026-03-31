import { fetchAdminData } from "./actions";
import Link from "next/link";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {
  CalendarDays,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 1. Fetch all data concurrently, including the new Analytics endpoint!
  const [inquiriesResponse, bookingsResponse, analyticsResponse] = await Promise.all([
    fetchAdminData("/api/v1/admin/inquiries").catch(() => ({ data: [] })),
    fetchAdminData("/api/v1/admin/bookings").catch(() => ({ data: [] })),
    fetchAdminData("/api/v1/admin/analytics").catch(() => null),
  ]);

  const bookings = bookingsResponse.data || [];
  const inquiries = inquiriesResponse.data || [];

  // Fallback for analytics in case the backend hasn't rebooted yet
  const analytics = analyticsResponse || {
    metrics: { past_meetings: 0, attended: 0, show_rate: 0, converted: 0, conversion_rate: 0 },
    action_items: [],
  };

  const unreadInquiries = inquiries.filter((i: any) => i.status === "unread").length;
  const actionItems = analytics.action_items || [];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
        <p className="mt-1 text-gray-500">Here is your sales pipeline and activity summary.</p>
      </div>

      {/* --- ENTERPRISE STATS ROW --- */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Unread Inquiries */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Unread</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{unreadInquiries}</p>
              {unreadInquiries > 0 && (
                <span className="relative mt-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
          </div>
        </div>

        {/* Meeting Show Rate */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Show Rate</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-gray-900">{analytics.metrics.show_rate}%</p>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -top-4 -right-4 text-amber-500/10">
            <TrendingUp className="h-24 w-24" />
          </div>
          <div className="relative z-10 rounded-xl bg-amber-50 p-3 text-amber-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Conversion</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.metrics.conversion_rate}%</p>
          </div>
        </div>
      </div>

      {/* --- ACTION ITEMS (LEADS TO FOLLOW UP) --- */}
      {actionItems.length > 0 && (
        <div className="mb-10 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
          <div className="flex items-center justify-between border-b border-blue-100/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-blue-900">Action Required: Follow-Ups</h2>
            </div>
            <span className="rounded-full bg-blue-200 px-2.5 py-1 text-xs font-bold text-blue-800">
              {actionItems.length} Pending
            </span>
          </div>
          <div className="divide-y divide-blue-100/50">
            {/* Slice to only show the top 3 on the dashboard */}
            {actionItems.slice(0, 3).map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 p-4 px-6 transition-colors hover:bg-white/40 sm:flex-row sm:items-center"
              >
                <div>
                  <Link
                    href={`/admin/bookings/${item.id}`}
                    className="text-lg font-bold text-blue-900 hover:underline"
                  >
                    {item.client_name}
                  </Link>
                  <p className="text-sm text-blue-700/80">
                    {item.event_type} • Met on{" "}
                    {formatInTimeZone(new Date(item.start_time), "Asia/Kolkata", "MMM do")}
                  </p>
                </div>
                <Link
                  href={`/admin/bookings/${item.id}`}
                  className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                  Review Notes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          {/* Link to see the rest if there are more than 3 */}
          {actionItems.length > 3 && (
            <div className="border-t border-blue-100/50 bg-blue-100/30 p-3 text-center">
              <Link
                href="/admin/bookings?crm_status=FOLLOW_UP"
                className="text-sm font-bold text-blue-700 transition-colors hover:text-blue-800"
              >
                View all {actionItems.length} follow-ups &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tables Grid Layout */}
      <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
        {/* --- RECENT BOOKINGS TABLE --- */}
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/30 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <Link
              href="/admin/bookings"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-white text-xs tracking-wider text-gray-500 uppercase">
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.slice(0, 5).map((booking: any) => (
                  <tr key={booking.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="font-bold text-gray-900 hover:text-emerald-600 hover:underline"
                      >
                        {booking.client_name}
                      </Link>
                      <div className="max-w-[150px] truncate text-sm text-gray-500">
                        {booking.event_type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="font-medium text-gray-900">
                        {formatInTimeZone(new Date(booking.start_time), "Asia/Kolkata", "MMM d")}
                      </div>
                      <div className="text-gray-500">
                        {formatInTimeZone(new Date(booking.start_time), "Asia/Kolkata", "h:mm a")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold ${
                          booking.crm_status === "CONVERTED"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : booking.crm_status === "FOLLOW_UP"
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : booking.crm_status === "LOST"
                                ? "border-red-200 bg-red-50 text-red-700"
                                : "border-gray-200 bg-gray-100 text-gray-700"
                        }`}
                      >
                        {(booking.crm_status || "PENDING").replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- RECENT INQUIRIES TABLE --- */}
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/30 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-white text-xs tracking-wider text-gray-500 uppercase">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Interest</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.slice(0, 5).map((inquiry: any) => (
                  <tr key={inquiry.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="font-bold text-gray-900 hover:text-blue-600 hover:underline"
                      >
                        {inquiry.name}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {formatInTimeZone(new Date(inquiry.created_at), "Asia/Kolkata", "MMM d")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {inquiry.service_interest || "General"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          inquiry.status === "unread"
                            ? "border border-blue-200 bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No new messages.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
