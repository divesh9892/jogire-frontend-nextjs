import Link from "next/link";
import { fetchAdminData } from "@/app/admin/actions";
import { format, differenceInMinutes, isPast } from "date-fns";
import BookingActionForm from "./BookingActionForm";
import { formatInTimeZone } from 'date-fns-tz';
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
  Phone
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let booking;
  try {
    booking = await fetchAdminData(`/api/v1/admin/bookings/${id}`);
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <ShieldAlert className="w-12 h-12 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Booking Not Found</h2>
        <Link href="/admin/bookings" className="mt-6 text-emerald-600 hover:underline">&larr; Return to Bookings</Link>
      </div>
    );
  }

  const startTime = new Date(booking.start_time);
  const endTime = new Date(booking.end_time);
  const duration = differenceInMinutes(endTime, startTime);
  
  const isCancelled = booking.status === 'CANCELLED';
  const isAccepted = booking.status === 'ACCEPTED';
  const isRescheduled = booking.status === 'RESCHEDULED';

  // CRM Badging logic
  const crmStatus = booking.crm_status || "PENDING";
  const crmBadgeColors: Record<string, string> = {
    PENDING: "bg-gray-100 text-gray-700 border-gray-200",
    FOLLOW_UP: "bg-blue-50 text-blue-700 border-blue-200",
    CONVERTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    LOST: "bg-red-50 text-red-700 border-red-200"
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* --- HEADER --- */}
      <div className="mb-8">
        <Link href="/admin/bookings" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Bookings
        </Link>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Booking Details</h1>
              {booking.rescheduled_from_uid && (
                 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                   <RefreshCw className="w-3 h-3" /> Rescheduled
                 </span>
              )}
            </div>
            <p className="text-gray-500 mt-1">Ref: {booking.cal_booking_uid.split('-')[0].toUpperCase()}</p>
          </div>
          
          {/* Dual Badges: Cal.com Status & Internal CRM Status */}
          <div className="flex flex-col sm:flex-row gap-2">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm border ${
              isAccepted ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              isCancelled ? 'bg-red-50 text-red-700 border-red-200' :
              isRescheduled ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}>
              {isAccepted ? <CheckCircle2 className="w-5 h-5"/> : isCancelled ? <XCircle className="w-5 h-5"/> : isRescheduled ? <RefreshCw className="w-5 h-5"/> : <AlertCircle className="w-5 h-5"/>}
              System: {booking.status}
            </span>

            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm border ${crmBadgeColors[crmStatus]}`}>
              <Target className="w-5 h-5" /> Pipeline: {crmStatus.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {isCancelled && booking.cancellation_reason && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-red-800">Cancellation Reason</h3>
            <p className="text-sm text-red-700 mt-1">{booking.cancellation_reason}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Core Details & Notes */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1"><Calendar className="w-4 h-4" /> Event Type</p>
                <p className="text-lg font-medium text-gray-900">{booking.event_type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1"><Globe className="w-4 h-4" /> Timezone</p>
                <p className="text-lg font-medium text-gray-900">{booking.timezone}</p>
              </div>

              <div className="md:col-span-2 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm"><Clock className="w-6 h-6 text-emerald-600" /></div>
                <div>
  <p className="font-bold text-gray-900 text-lg">
    {formatInTimeZone(startTime, 'Asia/Kolkata', "EEEE, MMMM do, yyyy")}
  </p>
  <p className="text-gray-600">
    {formatInTimeZone(startTime, 'Asia/Kolkata', "h:mm a")} - {formatInTimeZone(endTime, 'Asia/Kolkata', "h:mm a")} ({duration} mins)
  </p>
</div>
              </div>

              <div className="md:col-span-2 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-1"><Video className="w-4 h-4" /> Meeting Link</p>
                  {booking.meeting_url ? (
                    <a href={booking.meeting_url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline truncate block">{booking.meeting_url}</a>
                  ) : <p className="text-sm text-gray-500 italic">No video link associated.</p>}
                </div>
                {booking.meeting_url && !isCancelled && (
                  <a href={booking.meeting_url} target="_blank" rel="noreferrer" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-center">Join Call</a>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
              <h2 className="text-lg font-semibold text-gray-900">Client Profile</h2>
            </div>
            
            {/* Top row: Identity */}
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center text-emerald-700 text-xl font-bold shrink-0">
                {booking.client_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{booking.client_name}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <a href={`mailto:${booking.client_email}`} className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    <Mail className="w-4 h-4 mr-2" />{booking.client_email}
                  </a>
                  {/* NEW: Phone Number Display */}
                  {booking.client_phone && (
                    <a href={`tel:${booking.client_phone}`} className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                      <Phone className="w-4 h-4 mr-2" />{booking.client_phone}
                    </a>
                  )}
                </div>
              </div>
              <a href={`mailto:${booking.client_email}?subject=Regarding your upcoming ${booking.event_type}`} className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full sm:w-auto">Send Email</a>
            </div>

            {/* NEW: Cal.com Additional Notes */}
            {booking.client_notes && (
              <div className="p-6 bg-gray-50/50">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Notes from Booking Form</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap italic border-l-4 border-gray-200 pl-4 py-1">
                  "{booking.client_notes}"
                </p>
              </div>
            )}
          </section>

          {/* THE AUDIT TIMELINE */}
          <section className="bg-amber-50 rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-amber-200 bg-amber-100/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-700" />
                <h2 className="text-lg font-semibold text-amber-900">Internal Audit Trail</h2>
              </div>
              <span className="text-xs font-medium text-amber-700 bg-amber-200/50 px-2 py-1 rounded-md">Admin Only</span>
            </div>
            <div className="p-6">
  {booking.internal_notes ? (
    <div className="space-y-4">
      {booking.internal_notes.split('\n\n---\n\n').map((note: string, index: number) => {
        const match = note.match(/^\[(.*?)\] (.*?): ([\s\S]*)$/);
        if (match) {
          let displayTime = match[1]; 
          
          // Remove the hyphen to ensure safe parsing by the JavaScript Date object
          const parsedDate = new Date(match[1].replace(' - ', ' '));
          
          if (!isNaN(parsedDate.getTime())) {
            displayTime = formatInTimeZone(parsedDate, 'Asia/Kolkata', "MMM d, yyyy - HH:mm 'IST'");
          }

          return (
            <div key={index} className="bg-amber-100/50 p-4 rounded-xl border border-amber-200/50">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-amber-200/50">
                <span className="text-xs font-bold text-amber-900">{match[2]}</span>
                <span className="text-xs text-amber-700/80">{displayTime}</span>
              </div>
              <p className="text-sm text-amber-900 whitespace-pre-wrap">{match[3]}</p>
            </div>
          );
        }
        return (
          <div key={index} className="bg-amber-100/50 p-4 rounded-xl border border-amber-200/50">
            <p className="text-sm text-amber-900 whitespace-pre-wrap">{note}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-amber-700/60 italic text-sm">No internal notes or timeline events yet.</p>
  )}
</div>
          </section>

        </div>

        {/* RIGHT COLUMN: Interactive Commands & Meta */}
        <div className="space-y-8">
          
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
              <h2 className="text-lg font-semibold text-gray-900">CRM Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <a href="https://app.cal.com/bookings/upcoming" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                Manage in Cal.com <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              {!isCancelled && (
                 <a href={`mailto:${booking.client_email}?subject=Rescheduling your ${booking.event_type}`} className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
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

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
              <h2 className="text-lg font-semibold text-gray-900">Database Meta</h2>
            </div>
            <div className="p-6 space-y-4">
              <div><p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Internal UUID</p><p className="text-sm font-mono text-gray-700 truncate" title={booking.id}>{booking.id}</p></div>
              <div><p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Cal.com Event UID</p><p className="text-sm font-mono text-gray-700 truncate" title={booking.cal_booking_uid}>{booking.cal_booking_uid}</p></div>
              <div><p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Synced At</p><p className="text-sm text-gray-700">
  {booking.created_at 
    ? formatInTimeZone(new Date(booking.created_at), 'Asia/Kolkata', "MMM d, yyyy - HH:mm:ss") 
    : "Unknown"}
</p></div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}