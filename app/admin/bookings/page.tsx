import Link from "next/link";
import { fetchAdminData } from "@/app/admin/actions";
import { format } from "date-fns";
import { formatInTimeZone } from 'date-fns-tz';
import { CheckCircle2, XCircle, AlertCircle, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

export const dynamic = 'force-dynamic';

// Next.js passes URL search params directly to page components
export default async function AllBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; range?: string; search?: string; status?: string }>;
}) {
  const params = await searchParams;
  
  // Extract params with defaults
  const page = Number(params.page) || 1;
  const range = params.range || "all";
  const search = params.search || "";
  const status = params.status || "all";

  // Construct query string for our FastAPI backend
  const query = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    range,
    search,
    status
  }).toString();

  // Fetch the paginated response
  const response = await fetchAdminData(`/api/v1/admin/bookings?${query}`);
  const bookings = response.data || [];
  const meta = response.meta || { total_pages: 1, current_page: 1, total_records: 0 };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bookings Manager</h1>
            <p className="text-gray-500 mt-1">Found {meta.total_records} total records.</p>
          </div>
        </div>

        {/* --- CONTROL PANEL (Filters) --- */}
        <div className="flex flex-wrap items-center gap-2">
          {/* We use standard HTML forms with GET method to update URL params instantly */}
          <form className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              name="search" 
              defaultValue={search}
              placeholder="Search name or email..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
            />
            {/* Hidden inputs keep other state alive when searching */}
            <input type="hidden" name="range" value={range} />
            <input type="hidden" name="status" value={status} />
          </form>

          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            {['all', 'today', 'week', 'month'].map((t) => (
              <Link 
                key={t}
                href={`/admin/bookings?range=${t}&search=${search}&status=${status}`}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${range === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Event Type</th>
                <th className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Date & Time <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
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
  <div className="font-medium text-gray-900">
    {formatInTimeZone(new Date(booking.start_time), 'Asia/Kolkata', "MMM d, yyyy")}
  </div>
  <div className="text-gray-500">
    {formatInTimeZone(new Date(booking.start_time), 'Asia/Kolkata', "h:mm a")}
  </div>
</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      booking.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      booking.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/bookings/${booking.id}`} className="text-sm font-medium text-gray-500 hover:text-emerald-600">
                      View &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No records found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ENTERPRISE PAGINATION --- */}
      {meta.total_pages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">
            Showing page <span className="font-medium text-gray-900">{meta.current_page}</span> of <span className="font-medium text-gray-900">{meta.total_pages}</span>
          </p>
          <div className="flex items-center gap-2">
            <Link 
              href={`/admin/bookings?page=${Math.max(1, page - 1)}&range=${range}&search=${search}&status=${status}`}
              className={`p-2 rounded-lg border border-gray-200 transition-colors ${!meta.has_prev ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            
            <Link 
              href={`/admin/bookings?page=${Math.min(meta.total_pages, page + 1)}&range=${range}&search=${search}&status=${status}`}
              className={`p-2 rounded-lg border border-gray-200 transition-colors ${!meta.has_next ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}