import { fetchAdminData } from "./actions";
import Link from "next/link";
import { format } from "date-fns";
import { formatInTimeZone } from 'date-fns-tz';
import { 
  CalendarDays, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Target,
  PhoneCall,
  ArrowRight
} from "lucide-react";

export const dynamic = 'force-dynamic'; 

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
    action_items: []
  };

  const unreadInquiries = inquiries.filter((i: any) => i.status === "unread").length;
  const actionItems = analytics.action_items || [];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <p className="text-gray-500 mt-1">Here is your sales pipeline and activity summary.</p>
      </div>

      {/* --- ENTERPRISE STATS ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        {/* Unread Inquiries */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unread</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{unreadInquiries}</p>
              {unreadInquiries > 0 && (
                <span className="flex h-2.5 w-2.5 relative mt-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
          </div>
        </div>

        {/* Meeting Show Rate */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Show Rate</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-gray-900">{analytics.metrics.show_rate}%</p>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-amber-500/10">
            <TrendingUp className="w-24 h-24" />
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600 relative z-10">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Conversion</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.metrics.conversion_rate}%</p>
          </div>
        </div>
      </div>

      {/* --- ACTION ITEMS (LEADS TO FOLLOW UP) --- */}
      {actionItems.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-blue-100/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-blue-700" />
              <h2 className="text-lg font-bold text-blue-900">Action Required: Follow-Ups</h2>
            </div>
            <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
              {actionItems.length} Pending
            </span>
          </div>
          <div className="divide-y divide-blue-100/50">
            {/* Slice to only show the top 3 on the dashboard */}
            {actionItems.slice(0, 3).map((item: any) => (
              <div key={item.id} className="p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/40 transition-colors">
                <div>
                  <Link href={`/admin/bookings/${item.id}`} className="font-bold text-blue-900 hover:underline text-lg">
                    {item.client_name}
                  </Link>
                  <p className="text-sm text-blue-700/80">
  {item.event_type} • Met on {formatInTimeZone(new Date(item.start_time), 'Asia/Kolkata', "MMM do")}
</p>
                </div>
                <Link 
                  href={`/admin/bookings/${item.id}`} 
                  className="shrink-0 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Review Notes <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
          {/* Link to see the rest if there are more than 3 */}
          {actionItems.length > 3 && (
            <div className="bg-blue-100/30 p-3 text-center border-t border-blue-100/50">
              <Link href="/admin/bookings?crm_status=FOLLOW_UP" className="text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors">
                View all {actionItems.length} follow-ups &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tables Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        
        {/* --- RECENT BOOKINGS TABLE --- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View All</Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.slice(0, 5).map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/bookings/${booking.id}`} className="font-bold text-gray-900 hover:text-emerald-600 hover:underline">
                          {booking.client_name}
                      </Link>
                      <div className="text-sm text-gray-500 truncate max-w-[150px]">{booking.event_type}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
  <div className="font-medium text-gray-900">
    {formatInTimeZone(new Date(booking.start_time), 'Asia/Kolkata', "MMM d")}
  </div>
  <div className="text-gray-500">
    {formatInTimeZone(new Date(booking.start_time), 'Asia/Kolkata', "h:mm a")}
  </div>
</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                        booking.crm_status === 'CONVERTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        booking.crm_status === 'FOLLOW_UP' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        booking.crm_status === 'LOST' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {(booking.crm_status || 'PENDING').replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No bookings yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- RECENT INQUIRIES TABLE --- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Interest</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.slice(0, 5).map((inquiry: any) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/inquiries/${inquiry.id}`} className="font-bold text-gray-900 hover:text-blue-600 hover:underline">
                        {inquiry.name}
                      </Link>
                      <div className="text-sm text-gray-500">
  {formatInTimeZone(new Date(inquiry.created_at), 'Asia/Kolkata', "MMM d")}
</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {inquiry.service_interest || "General"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        inquiry.status === 'unread' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No new messages.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}