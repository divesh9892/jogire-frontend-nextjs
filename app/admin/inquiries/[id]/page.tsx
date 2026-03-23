import Link from "next/link";
import { fetchAdminData } from "@/app/admin/actions";
import { format } from "date-fns";
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
  User
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function InquiryDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  let inquiry;
  try {
    inquiry = await fetchAdminData(`/api/v1/admin/inquiries/${id}`);
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <ShieldAlert className="w-12 h-12 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Inquiry Not Found</h2>
        <p className="mt-2">This message may have been deleted or the ID is invalid.</p>
        <Link href="/admin/inquiries" className="mt-6 text-blue-600 hover:underline">
          &larr; Return to Inbox
        </Link>
      </div>
    );
  }

  const isUnread = inquiry.status === 'unread';
  const isResolved = inquiry.status === 'resolved';

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <Link href="/admin/inquiries" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Inbox
        </Link>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inquiry Details</h1>
            <p className="text-gray-500 mt-1">Received {format(new Date(inquiry.created_at), "MMMM do, yyyy 'at' h:mm a")}</p>
          </div>
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm border ${
            isUnread ? 'bg-blue-50 text-blue-700 border-blue-200' :
            isResolved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            {isUnread ? <CircleDashed className="w-5 h-5"/> : 
             isResolved ? <CheckCircle2 className="w-5 h-5"/> : <MailOpen className="w-5 h-5"/>}
            <span className="capitalize">{inquiry.status}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Message & Contact */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: The Message */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Client Message</h2>
            </div>
            <div className="p-6">
              <div className="mb-6 pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 text-lg font-bold shrink-0">
                    {inquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{inquiry.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {inquiry.email}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  Interest: {inquiry.service_interest || "General"}
                </span>
              </div>
              
              {/* The actual message content */}
              <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-wrap">
                {inquiry.message}
              </div>
            </div>
          </section>

          {/* Section: Internal Notes (CRM Feature) */}
          <section className="bg-amber-50 rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-amber-200 bg-amber-100/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-700" />
                <h2 className="text-lg font-semibold text-amber-900">Internal Notes</h2>
              </div>
              <span className="text-xs font-medium text-amber-700 bg-amber-200/50 px-2 py-1 rounded-md">Admin Only</span>
            </div>
            <div className="p-6">
              {inquiry.internal_notes ? (
                <p className="text-amber-900 whitespace-pre-wrap">{inquiry.internal_notes}</p>
              ) : (
                <p className="text-amber-700/60 italic text-sm">No internal notes added yet.</p>
              )}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: Metadata & Actions */}
        <div className="space-y-8">
          
          {/* Quick Actions Card */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
              <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <a 
                href={`mailto:${inquiry.email}?subject=Re: Your inquiry regarding ${inquiry.service_interest || 'our services'}`}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" /> Reply via Email
              </a>
              
              {inquiry.phone && (
                <a 
                  href={`tel:${inquiry.phone}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" /> Call {inquiry.phone}
                </a>
              )}

              {/* Placeholder for future interactivity */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                 <button className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors">
                   Update Status / Add Note
                 </button>
              </div>
            </div>
          </section>

          {/* Metadata Card */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
              <h2 className="text-lg font-semibold text-gray-900">Metadata</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Internal UUID</p>
                <p className="text-sm font-mono text-gray-700 truncate" title={inquiry.id}>{inquiry.id}</p>
              </div>
              
              {inquiry.ip_address && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Globe className="w-3 h-3"/> IP Address</p>
                  <p className="text-sm font-mono text-gray-700">{inquiry.ip_address}</p>
                </div>
              )}

              {inquiry.resolved_at && (
                <div>
                  <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Resolved At</p>
                  <p className="text-sm text-gray-700">
                    {format(new Date(inquiry.resolved_at), "MMM d, yyyy - HH:mm")}
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