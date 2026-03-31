import Link from "next/link";
import { fetchAdminData } from "@/app/admin/actions";
import { format, differenceInMinutes, isPast } from "date-fns";
import BookingActionForm from "./BookingActionForm";
import { formatInTimeZone } from "date-fns-tz";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Video,
  RefreshCw,
  FileText,
  Target,
  Phone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let booking;
  try {
    booking = await fetchAdminData(`/api/v1/admin/bookings/${id}`);
  } catch (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center text-gray-500">
        <ShieldAlert className="mb-4 h-12 w-12 text-red-400" />
        <h2 className="text-xl font-bold text-gray-900">Booking Not Found</h2>
        <Link href="/admin/bookings" className="mt-6 text-emerald-600 hover:underline">
          &larr; Return to Bookings
        </Link>
      </div>
    );
  }

  const startTime = new Date(booking.start_time);
  const endTime = new Date(booking.end_time);
  const duration = differenceInMinutes(endTime, startTime);

  const isCancelled = booking.status === "CANCELLED";
  const isAccepted = booking.status === "ACCEPTED";
  const isRescheduled = booking.status === "RESCHEDULED";

  // CRM Badging logic
  const crmStatus = booking.crm_status || "PENDING";
  const crmBadgeColors: Record<string, string> = {
    PENDING: "bg-gray-100 text-gray-700 border-gray-200",
    FOLLOW_UP: "bg-blue-50 text-blue-700 border-blue-200",
    CONVERTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    LOST: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl duration-500">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <Link
          href="/admin/bookings"
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Booking Details</h1>
              {booking.rescheduled_from_uid && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                  <RefreshCw className="h-3 w-3" /> Rescheduled
                </span>
              )}
            </div>
            <p className="mt-1 text-gray-500">
              Ref: {booking.cal_booking_uid.split("-")[0].toUpperCase()}
            </p>
          </div>

          {/* Dual Badges: Cal.com Status & Internal CRM Status */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${
                isAccepted
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : isCancelled
                    ? "border-red-200 bg-red-50 text-red-700"
                    : isRescheduled
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-yellow-200 bg-yellow-50 text-yellow-700"
              }`}
            >
              {isAccepted ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : isCancelled ? (
                <XCircle className="h-5 w-5" />
              ) : isRescheduled ? (
                <RefreshCw className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              System: {booking.status}
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${crmBadgeColors[crmStatus]}`}
            >
              <Target className="h-5 w-5" /> Pipeline: {crmStatus.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {isCancelled && booking.cancellation_reason && (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h3 className="text-sm font-bold text-red-800">Cancellation Reason</h3>
            <p className="mt-1 text-sm text-red-700">{booking.cancellation_reason}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT COLUMN: Core Details & Notes */}
        <div className="space-y-8 lg:col-span-2">
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/30 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <div>
                <p className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-500">
                  <Calendar className="h-4 w-4" /> Event Type
                </p>
                <p className="text-lg font-medium text-gray-900">{booking.event_type}</p>
              </div>
              <div>
                <p className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-500">
                  <Globe className="h-4 w-4" /> Timezone
                </p>
                <p className="text-lg font-medium text-gray-900">{booking.timezone}</p>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 md:col-span-2">
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {formatInTimeZone(startTime, "Asia/Kolkata", "EEEE, MMMM do, yyyy")}
                  </p>
                  <p className="text-gray-600">
                    {formatInTimeZone(startTime, "Asia/Kolkata", "h:mm a")} -{" "}
                    {formatInTimeZone(endTime, "Asia/Kolkata", "h:mm a")} ({duration} mins)
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4 sm:flex-row sm:items-center md:col-span-2">
                <div className="overflow-hidden">
                  <p className="mb-1 flex items-center gap-2 text-sm font-medium text-blue-900">
                    <Video className="h-4 w-4" /> Meeting Link
                  </p>
                  {booking.meeting_url ? (
                    <a
                      href={booking.meeting_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate font-medium text-blue-600 hover:underline"
                    >
                      {booking.meeting_url}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No video link associated.</p>
                  )}
                </div>
                {booking.meeting_url && !isCancelled && (
                  <a
                    href={booking.meeting_url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                  >
                    Join Call
                  </a>
                )}
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-900">Client Profile</h2>
            </div>

            {/* Top row: Identity */}
            <div className="flex flex-col items-start gap-6 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 text-xl font-bold text-emerald-700">
                {booking.client_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{booking.client_name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${booking.client_email}`}
                    className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-emerald-600"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {booking.client_email}
                  </a>
                  {/* NEW: Phone Number Display */}
                  {booking.client_phone && (
                    <a
                      href={`tel:${booking.client_phone}`}
                      className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-emerald-600"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {booking.client_phone}
                    </a>
                  )}
                </div>
              </div>
              <a
                href={`mailto:${booking.client_email}?subject=Regarding your upcoming ${booking.event_type}`}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto"
              >
                Send Email
              </a>
            </div>

            {/* NEW: Cal.com Additional Notes */}
            {booking.client_notes && (
              <div className="bg-gray-50/50 p-6">
                <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Notes from Booking Form
                </h4>
                <p className="border-l-4 border-gray-200 py-1 pl-4 text-sm whitespace-pre-wrap text-gray-700 italic">
                  "{booking.client_notes}"
                </p>
              </div>
            )}
          </section>

          {/* THE AUDIT TIMELINE */}
          <section className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm">
            <div className="flex items-center justify-between border-b border-amber-200 bg-amber-100/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-700" />
                <h2 className="text-lg font-semibold text-amber-900">Internal Audit Trail</h2>
              </div>
              <span className="rounded-md bg-amber-200/50 px-2 py-1 text-xs font-medium text-amber-700">
                Admin Only
              </span>
            </div>
            <div className="p-6">
              {booking.internal_notes ? (
                <div className="space-y-4">
                  {booking.internal_notes
                    .split("\n\n---\n\n")
                    .map((note: string, index: number) => {
                      const match = note.match(/^\[(.*?)\] (.*?): ([\s\S]*)$/);
                      if (match) {
                        let displayTime = match[1];

                        // Remove the hyphen to ensure safe parsing by the JavaScript Date object
                        const parsedDate = new Date(match[1].replace(" - ", " "));

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
                              <span className="text-xs text-amber-700/80">{displayTime}</span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap text-amber-900">{match[3]}</p>
                          </div>
                        );
                      }
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
                <p className="text-sm text-amber-700/60 italic">
                  No internal notes or timeline events yet.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Interactive Commands & Meta */}
        <div className="space-y-8">
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-900">CRM Actions</h2>
            </div>
            <div className="space-y-4 p-6">
              <a
                href="https://app.cal.com/bookings/upcoming"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
              >
                Manage in Cal.com <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              {!isCancelled && (
                <a
                  href={`mailto:${booking.client_email}?subject=Rescheduling your ${booking.event_type}`}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                >
                  Request Reschedule
                </a>
              )}

              {/* LIVE ACTION FORM */}
              <BookingActionForm
                bookingId={booking.id}
                currentAttended={booking.attended}
                currentCrmStatus={booking.crm_status}
                isCancelled={isCancelled}
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-900">Database Meta</h2>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Internal UUID
                </p>
                <p className="truncate font-mono text-sm text-gray-700" title={booking.id}>
                  {booking.id}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Cal.com Event UID
                </p>
                <p
                  className="truncate font-mono text-sm text-gray-700"
                  title={booking.cal_booking_uid}
                >
                  {booking.cal_booking_uid}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Synced At
                </p>
                <p className="text-sm text-gray-700">
                  {booking.created_at
                    ? formatInTimeZone(
                        new Date(booking.created_at),
                        "Asia/Kolkata",
                        "MMM d, yyyy - HH:mm:ss"
                      )
                    : "Unknown"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
