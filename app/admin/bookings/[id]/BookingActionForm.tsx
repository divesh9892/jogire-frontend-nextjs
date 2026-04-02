"use client";

import { useState } from "react";
import { updateBookingAction } from "@/app/admin/actions";
import { Save, Loader2, CheckCircle, UserCheck, UserMinus } from "lucide-react";
import { toast } from "sonner";

export default function BookingActionForm({
  bookingId,
  currentAttended,
  currentCrmStatus,
  isCancelled,
}: {
  bookingId: string;
  currentAttended: boolean;
  currentCrmStatus: string;
  isCancelled: boolean;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [attended, setAttended] = useState(currentAttended);
  const [crmStatus, setCrmStatus] = useState(currentCrmStatus || "PENDING");
  const [newNote, setNewNote] = useState("");

  const handleSave = async () => {
    // WARNING CASE: Prevent unnecessary database calls if nothing changed
    if (
      attended === currentAttended &&
      crmStatus === (currentCrmStatus || "PENDING") &&
      newNote.trim() === ""
    ) {
      toast.warning("No changes were made to save.");
      return;
    }

    setIsSaving(true);
    setIsSuccess(false);

    try {
      await updateBookingAction(bookingId, {
        attended: attended,
        crm_status: crmStatus,
        ...(newNote.trim() !== "" && { new_note: newNote }),
      });

      // SUCCESS CASE
      setIsSuccess(true);
      setNewNote(""); // Clear the note box for future updates
      toast.success("Booking updated successfully!");

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
    <div className="mt-4 space-y-5 border-t border-gray-100 pt-4">
      {/* Attendance Toggle - Disabled if cancelled */}
      <div
        className={`flex items-center justify-between rounded-lg border p-3 ${isCancelled ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60" : "cursor-pointer border-gray-200 bg-gray-50"}`}
        onClick={() => !isCancelled && setAttended(!attended)}
      >
        <div className="flex items-center gap-3">
          {attended ? (
            <UserCheck className="h-5 w-5 text-emerald-600" />
          ) : (
            <UserMinus className="h-5 w-5 text-gray-400" />
          )}
          <div>
            <p className="text-sm font-bold text-gray-900">Client Attended?</p>
            <p className="text-xs text-gray-500">
              {attended ? "Yes, marked as present" : "No, unmarked or no-show"}
            </p>
          </div>
        </div>
        <div
          className={`h-6 w-11 rounded-full transition-colors ${attended ? "bg-emerald-500" : "bg-gray-300"} relative`}
        >
          <div
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${attended ? "left-6" : "left-1"}`}
          />
        </div>
      </div>

      {/* CRM Pipeline Status - Disabled if cancelled */}
      <div>
        <label className="mb-1 block text-xs font-bold text-gray-700">Sales Pipeline Status</label>
        <select
          value={crmStatus}
          onChange={(e) => setCrmStatus(e.target.value)}
          disabled={isCancelled}
          className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="PENDING">Pending (Meeting hasn't happened)</option>
          <option value="FOLLOW_UP">Needs Follow-up (Sent payment/diet link)</option>
          <option value="CONVERTED">Converted (Client paid/signed up)</option>
          <option value="LOST">Lost (Not interested / No show)</option>
        </select>
        {isCancelled && (
          <p className="mt-1 text-xs text-red-500">Status locked because event was cancelled.</p>
        )}
      </div>

      {/* Internal Notes Textarea */}
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

      {/* Save Button */}
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
        {isSaving ? "Saving..." : isSuccess ? "Saved!" : "Save Updates"}
      </button>
    </div>
  );
}
