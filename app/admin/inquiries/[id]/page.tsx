import Link from "next/link";
import { fetchAdminData } from "@/app/admin/actions";
import InquiryActionForm from "./InquiryActionForm";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {
  ArrowLeft,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  CircleDashed,
  MailOpen,
  Globe,
  ShieldAlert,
  MessageSquare,
  FileText,
  User,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let inquiry;
  try {
    inquiry = await fetchAdminData(`/api/v1/admin/inquiries/${id}`);
  } catch (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center text-gray-500">
        <ShieldAlert className="mb-4 h-12 w-12 text-red-400" />
        <h2 className="text-xl font-bold text-gray-900">Inquiry Not Found</h2>
        <p className="mt-2">This message may have been deleted or the ID is invalid.</p>
        <Link href="/admin/inquiries" className="mt-6 text-blue-600 hover:underline">
          &larr; Return to Inbox
        </Link>
      </div>
    );
  }

  const isUnread = inquiry.status === "unread";
  const isResolved = inquiry.status === "resolved";

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl duration-500">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <Link
          href="/admin/inquiries"
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Inbox
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inquiry Details</h1>
            <p className="mt-1 text-gray-500">
              Received{" "}
              {formatInTimeZone(
                new Date(inquiry.created_at),
                "Asia/Kolkata",
                "MMMM do, yyyy 'at' h:mm a"
              )}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${
              isUnread
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : isResolved
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 bg-gray-50 text-gray-700"
            }`}
          >
            {isUnread ? (
              <CircleDashed className="h-5 w-5" />
            ) : isResolved ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <MailOpen className="h-5 w-5" />
            )}
            <span className="capitalize">{inquiry.status}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT COLUMN: Message & Contact */}
        <div className="space-y-8 lg:col-span-2">
          {/* Section: The Message */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/30 px-6 py-5">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Client Message</h2>
            </div>
            <div className="p-6">
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-lg font-bold text-blue-700">
                    {inquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{inquiry.name}</h3>
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail className="h-3 w-3" /> {inquiry.email}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Interest: {inquiry.service_interest || "General"}
                </span>
              </div>

              {/* The actual message content */}
              <div className="prose prose-blue max-w-none whitespace-pre-wrap text-gray-700">
                {inquiry.message}
              </div>
            </div>
          </section>

          {/* Section: Internal Notes (CRM Feature) */}
          <section className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm">
            <div className="flex items-center justify-between border-b border-amber-200 bg-amber-100/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-700" />
                <h2 className="text-lg font-semibold text-amber-900">Internal Notes</h2>
              </div>
              <span className="rounded-md bg-amber-200/50 px-2 py-1 text-xs font-medium text-amber-700">
                Admin Only
              </span>
            </div>
            <div className="p-6">
              {inquiry.internal_notes ? (
                <div className="space-y-4">
                  {inquiry.internal_notes
                    .split("\n\n---\n\n")
                    .map((note: string, index: number) => {
                      // Extract the [Timestamp] AdminName: part using regex
                      const match = note.match(/^\[(.*?)\] (.*?): ([\s\S]*)$/);

                      if (match) {
                        let displayTime = match[1]; // Default to raw string

                        // Clean the string (e.g., "Mar 29, 2026 - 16:46 UTC" -> "Mar 29, 2026 16:46 UTC") for reliable parsing
                        const parsedDate = new Date(match[1].replace(" - ", " "));

                        // Only format if the date parsed successfully
                        if (!isNaN(parsedDate.getTime())) {
                          displayTime = formatInTimeZone(
                            parsedDate,
                            "Asia/Kolkata",
                            "MMM d, yyyy - HH:mm 'IST'"
                          );
                        }

                        return (
                          <div
                            key={index}
                            className="rounded-xl border border-amber-200/50 bg-amber-100/50 p-4"
                          >
                            <div className="mb-2 flex items-center justify-between border-b border-amber-200/50 pb-2">
                              <span className="text-xs font-bold text-amber-900">{match[2]}</span>
                              {/* Replaced match[1] with our new displayTime */}
                              <span className="text-xs text-amber-700/80">{displayTime}</span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap text-amber-900">{match[3]}</p>
                          </div>
                        );
                      }
                      // Fallback for older notes before we added the new formatting
                      return (
                        <div
                          key={index}
                          className="rounded-xl border border-amber-200/50 bg-amber-100/50 p-4"
                        >
                          <p className="text-sm whitespace-pre-wrap text-amber-900">{note}</p>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-sm text-amber-700/60 italic">No internal notes added yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Metadata & Actions */}
        <div className="space-y-8">
          {/* Quick Actions Card */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
            </div>
            <div className="space-y-3 p-6">
              <a
                href={`mailto:${inquiry.email}?subject=Re: Your inquiry regarding ${inquiry.service_interest || "our services"}`}
                className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <Mail className="mr-2 h-4 w-4" /> Reply via Email
              </a>

              {inquiry.phone && (
                <a
                  href={`tel:${inquiry.phone}`}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                >
                  <Phone className="mr-2 h-4 w-4" /> Call {inquiry.phone}
                </a>
              )}

              {/* THE LIVE ACTION FORM */}
              <InquiryActionForm inquiryId={inquiry.id} currentStatus={inquiry.status} />
            </div>
          </section>

          {/* Metadata Card */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-900">Metadata</h2>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <p className="mb-1 flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  <User className="h-3 w-3" /> Internal UUID
                </p>
                <p className="truncate font-mono text-sm text-gray-700" title={inquiry.id}>
                  {inquiry.id}
                </p>
              </div>

              {inquiry.ip_address && (
                <div>
                  <p className="mb-1 flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                    <Globe className="h-3 w-3" /> IP Address
                  </p>
                  <p className="font-mono text-sm text-gray-700">{inquiry.ip_address}</p>
                </div>
              )}

              {inquiry.resolved_at && (
                <div>
                  <p className="mb-1 flex items-center gap-1 text-xs font-medium tracking-wider text-emerald-600 uppercase">
                    <CheckCircle2 className="h-3 w-3" /> Resolved At
                  </p>
                  <p className="text-sm text-gray-700">
                    {formatInTimeZone(
                      new Date(inquiry.resolved_at),
                      "Asia/Kolkata",
                      "MMM d, yyyy - HH:mm"
                    )}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
