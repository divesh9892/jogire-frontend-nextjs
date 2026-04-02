"use client";

import { useState } from "react";
import { updateInquiryAction } from "@/app/admin/actions";
import { Save, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner"; // Imported Sonner

export default function InquiryActionForm({
  inquiryId,
  currentStatus,
}: {
  inquiryId: string;
  currentStatus: string;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [newNote, setNewNote] = useState("");

  const handleSave = async () => {
    // WARNING CASE: Prevent unnecessary database calls if nothing changed
    if (status === currentStatus && newNote.trim() === "") {
      toast.warning("No changes were made to save.");
      return;
    }

    setIsSaving(true);
    setIsSuccess(false);

    try {
      await updateInquiryAction(inquiryId, {
        status: status,
        ...(newNote.trim() !== "" && { new_note: newNote }),
      });

      // SUCCESS CASE
      setIsSuccess(true);
      setNewNote("");
      toast.success("Inquiry updated successfully!");

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      // ERROR CASE
      console.error("Failed to save:", error);
      toast.error("Failed to save updates. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
      <div>
        <label className="mb-1 block text-xs font-bold text-gray-700">Update Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="unread">Unread</option>
          <option value="read">Read (In Progress)</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-gray-700">Add a Note</label>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={3}
          placeholder="Type a new update or staff note..."
          className="block w-full resize-none rounded-lg border border-amber-200 bg-amber-50/50 p-2.5 text-sm text-gray-900 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 disabled:opacity-70"
      >
        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isSuccess ? (
          <CheckCircle className="h-4 w-4 text-emerald-400" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {isSaving ? "Saving..." : isSuccess ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
