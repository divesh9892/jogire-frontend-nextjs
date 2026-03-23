import { fetchAdminData } from "./actions";
import Link from "next/link";
import { format } from "date-fns";
import { 
  CalendarDays, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from "lucide-react";

// CRITICAL: Tells Next.js never to cache this page. It must be live.
export const dynamic = 'force-dynamic'; 

export default async function AdminDashboard() {
  // Fetch both sets of data securely and concurrently from your FastAPI backend
  const [inquiriesResponse, bookingsResponse] = await Promise.all([
    fetchAdminData("/api/v1/admin/inquiries").catch(() => ({ data: [] })), 
    fetchAdminData("/api/v1/admin/bookings").catch(() => ({ data: [] })),
  ]);

  // Extract the actual array of bookings from the new paginated response
  const bookings = bookingsResponse.data || [];
  const inquiries = inquiriesResponse.data || [];

  const unreadInquiries = inquiries.filter((i: any) => i.status === "unread").length;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here is what is happening today.</p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md">
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
            <CalendarDays className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md">
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Unread Inquiries</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-gray-900">{unreadInquiries}</p>
              {unreadInquiries > 0 && (
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- BOOKINGS TABLE --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Event</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/bookings/${booking.id}`} className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
                        {booking.client_name}
                    </Link>
                    <div className="text-sm text-gray-500">{booking.client_email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                      {booking.event_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-900">{format(new Date(booking.start_time), "MMM d, yyyy")}</div>
                    <div className="text-gray-500">{format(new Date(booking.start_time), "h:mm a")}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      booking.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      booking.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {booking.status === 'ACCEPTED' ? <CheckCircle2 className="w-4 h-4"/> : 
                       booking.status === 'CANCELLED' ? <XCircle className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- INQUIRIES TABLE --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Interest</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inquiry: any) => (
                <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{inquiry.name}</div>
                    <div className="text-sm text-gray-500">{inquiry.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {inquiry.service_interest || "General Inquiry"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      inquiry.status === 'unread' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No new messages.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}