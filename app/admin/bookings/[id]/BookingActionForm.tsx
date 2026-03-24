"use client";

import { useState } from "react";
import { updateBookingAction } from "@/app/admin/actions";
import { Save, Loader2, CheckCircle, UserCheck, UserMinus } from "lucide-react";

export default function BookingActionForm({ 
  bookingId, 
  currentAttended,
  currentCrmStatus,
  isCancelled
}: { 
  bookingId: string, 
  currentAttended: boolean,
  currentCrmStatus: string,
  isCancelled: boolean 
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [attended, setAttended] = useState(currentAttended);
  const [crmStatus, setCrmStatus] = useState(currentCrmStatus || "PENDING");
  const [newNote, setNewNote] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setIsSuccess(false);
    try {
      await updateBookingAction(bookingId, {
        attended: attended,
        crm_status: crmStatus,
        ...(newNote.trim() !== "" && { new_note: newNote })
      });
      setIsSuccess(true);
      setNewNote(""); // Clear the note box for future updates
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save updates. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-4 mt-4 border-t border-gray-100 space-y-5">
      
      {/* Attendance Toggle - Disabled if cancelled */}
      <div 
        className={`flex items-center justify-between p-3 border rounded-lg ${isCancelled ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed' : 'bg-gray-50 border-gray-200 cursor-pointer'}`} 
        onClick={() => !isCancelled && setAttended(!attended)}
      >
        <div className="flex items-center gap-3">
          {attended ? <UserCheck className="w-5 h-5 text-emerald-600"/> : <UserMinus className="w-5 h-5 text-gray-400"/>}
          <div>
            <p className="text-sm font-bold text-gray-900">Client Attended?</p>
            <p className="text-xs text-gray-500">{attended ? "Yes, marked as present" : "No, unmarked or no-show"}</p>
          </div>
        </div>
        <div className={`w-11 h-6 rounded-full transition-colors ${attended ? 'bg-emerald-500' : 'bg-gray-300'} relative`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${attended ? 'left-6' : 'left-1'}`} />
        </div>
      </div>

      {/* CRM Pipeline Status - Disabled if cancelled */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Sales Pipeline Status</label>
        <select 
          value={crmStatus}
          onChange={(e) => setCrmStatus(e.target.value)}
          disabled={isCancelled}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <option value="PENDING">Pending (Meeting hasn't happened)</option>
          <option value="FOLLOW_UP">Needs Follow-up (Sent payment/diet link)</option>
          <option value="CONVERTED">Converted (Client paid/signed up)</option>
          <option value="LOST">Lost (Not interested / No show)</option>
        </select>
        {isCancelled && <p className="text-xs text-red-500 mt-1">Status locked because event was cancelled.</p>}
      </div>

      {/* Internal Notes Textarea */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Add a Note</label>
        <textarea 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={3}
          placeholder="Type a new update or staff note..."
          className="w-full bg-amber-50/50 border border-amber-200 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5 resize-none"
        />
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSave}
        disabled={isSaving}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-70 transition-colors"
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 
         isSuccess ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
        {isSaving ? "Saving..." : isSuccess ? "Saved!" : "Save Updates"}
      </button>
    </div>
  );
}