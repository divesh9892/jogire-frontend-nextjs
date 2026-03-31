import Link from "next/link";
import { fetchAdminData } from "@/app/admin/actions";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {
  MessageSquare,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CheckCircle2,
  CircleDashed,
  MailOpen,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AllInquiriesPage({
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

  // Construct query string for FastAPI
  const query = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    range,
    search,
    status,
  }).toString();

  // Fetch the paginated response
  const response = await fetchAdminData(`/api/v1/admin/inquiries?${query}`);
  const inquiries = response.data || [];
  const meta = response.meta || { total_pages: 1, current_page: 1, total_records: 0 };

  return (
    <div className="animate-in fade-in mx-auto max-w-7xl duration-500">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inquiries Inbox</h1>
            <p className="mt-1 text-gray-500">Found {meta.total_records} messages.</p>
          </div>
        </div>

        {/* --- CONTROL PANEL (Filters) --- */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Toggles */}
          <div className="mr-2 flex rounded-lg border border-gray-200 bg-gray-100 p-1">
            {["all", "unread", "read", "resolved"].map((s) => (
              <Link
                key={s}
                href={`/admin/inquiries?range=${range}&search=${search}&status=${s}`}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${status === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <form className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search names, emails, or messages..."
              className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-64"
            />
            <input type="hidden" name="range" value={range} />
            <input type="hidden" name="status" value={status} />
          </form>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs tracking-wider text-gray-500 uppercase">
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Interest Area</th>
                <th className="px-6 py-4 font-medium">
                  <div className="flex cursor-pointer items-center gap-1 hover:text-gray-700">
                    Received <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inquiry: any) => (
                <tr
                  key={inquiry.id}
                  className={`transition-colors ${inquiry.status === "unread" ? "bg-blue-50/30 hover:bg-blue-50/60" : "hover:bg-gray-50/50"}`}
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className={`font-bold hover:underline ${inquiry.status === "unread" ? "text-blue-800 hover:text-blue-900" : "text-gray-900 hover:text-gray-700"}`}
                    >
                      {inquiry.name}
                    </Link>
                    <div className="text-sm text-gray-500">{inquiry.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {inquiry.service_interest || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-900">
                      {formatInTimeZone(
                        new Date(inquiry.created_at),
                        "Asia/Kolkata",
                        "MMM d, yyyy"
                      )}
                    </div>
                    <div className="text-gray-500">
                      {formatInTimeZone(new Date(inquiry.created_at), "Asia/Kolkata", "h:mm a")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        inquiry.status === "unread"
                          ? "border border-blue-200 bg-blue-100 text-blue-800"
                          : inquiry.status === "resolved"
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border border-gray-200 bg-gray-100 text-gray-700"
                      }`}
                    >
                      {inquiry.status === "unread" ? (
                        <CircleDashed className="h-4 w-4" />
                      ) : inquiry.status === "resolved" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <MailOpen className="h-4 w-4" />
                      )}
                      <span className="capitalize">{inquiry.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="text-sm font-medium text-gray-500 hover:text-blue-600"
                    >
                      Read &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No messages match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ENTERPRISE PAGINATION --- */}
      {meta.total_pages > 1 && (
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
          <p className="text-sm text-gray-500">
            Showing page <span className="font-medium text-gray-900">{meta.current_page}</span> of{" "}
            <span className="font-medium text-gray-900">{meta.total_pages}</span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/inquiries?page=${Math.max(1, page - 1)}&range=${range}&search=${search}&status=${status}`}
              className={`rounded-lg border border-gray-200 p-2 transition-colors ${!meta.has_prev ? "pointer-events-none opacity-50" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>

            <Link
              href={`/admin/inquiries?page=${Math.min(meta.total_pages, page + 1)}&range=${range}&search=${search}&status=${status}`}
              className={`rounded-lg border border-gray-200 p-2 transition-colors ${!meta.has_next ? "pointer-events-none opacity-50" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
