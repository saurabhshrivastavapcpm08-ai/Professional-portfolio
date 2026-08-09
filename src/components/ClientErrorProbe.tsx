"use client";

import { useEffect, useState } from "react";

/**
 * Surfaces client-side render/hydration failures that would leave the page blank.
 */
export function ClientErrorProbe() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      setError(event.message || "Unknown script error");
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      setError(
        reason instanceof Error ? reason.message : String(reason ?? "Promise rejection"),
      );
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (!error) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-4 right-4 z-[100] rounded-lg border border-red-400/40 bg-red-950/90 p-4 text-sm text-red-100 shadow-lg sm:left-auto sm:max-w-md"
    >
      <p className="font-semibold">Page error</p>
      <p className="mt-1 break-words">{error}</p>
    </div>
  );
}
