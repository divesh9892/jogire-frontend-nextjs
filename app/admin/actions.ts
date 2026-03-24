'use server'

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAdminData(endpoint: string) {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // The cryptographically secure handoff
    },
    // Prevent Next.js from aggressively caching this dashboard data
    cache: 'no-store' 
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  return res.json();
}

export async function updateInquiryAction(id: string, payload: { status?: string; new_note?: string }) {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/api/v1/admin/inquiries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update inquiry");
  }

  // Enterprise Magic: Tell Next.js to instantly refresh these two pages so you see the changes immediately without refreshing your browser!
  revalidatePath(`/admin/inquiries/${id}`);
  revalidatePath(`/admin/inquiries`);
  
  return res.json();
}

export async function updateBookingAction(id: string, payload: { attended?: boolean; crm_status?: string; new_note?: string }) {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update booking");
  }

  // Instantly clear the Next.js cache so the UI updates without a page refresh
  revalidatePath(`/admin/bookings/${id}`);
  revalidatePath(`/admin/bookings`);
  
  return res.json();
}