"use client";

import { useState } from "react";
import { updateInquiryAction } from "@/app/admin/actions";
import { Save, Loader2, CheckCircle } from "lucide-react";

export default function InquiryActionForm({ 
  inquiryId, 
  currentStatus, 
}: { 
  inquiryId: string, 
  currentStatus: string, 
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [newNote, setNewNote] = useState(""); // Starts empty!

  const handleSave = async () => {
    setIsSaving(true);
    setIsSuccess(false);
    try {
      await updateInquiryAction(inquiryId, {
        status: status,
        // Only send a note if they actually typed something
        ...(newNote.trim() !== "" && { new_note: newNote })
      });
      setIsSuccess(true);
      setNewNote(""); // Instantly clear the box so they can type another note later
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save updates. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-4 mt-4 border-t border-gray-100 space-y-4">
      
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Update Status</label>
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          <option value="unread">Unread</option>
          <option value="read">Read (In Progress)</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

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

      <button 
        onClick={handleSave}
        disabled={isSaving}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-70 transition-colors"
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 
         isSuccess ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
        {isSaving ? "Saving..." : isSuccess ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}