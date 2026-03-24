"use client";

import { useEffect } from "react";

export default function ServerWakeup() {
  useEffect(() => {
    // Fire-and-forget fetch. We don't await it, and we catch errors silently.
    // This happens in the background on the user's browser, blocking nothing.
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
      .catch(() => console.log("Wake up ping sent."));
  }, []);

  return null; // Renders absolutely nothing to the UI
}