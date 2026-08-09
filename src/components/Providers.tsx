"use client";

import { LenisProvider } from "@/components/LenisProvider";
import { ClientErrorProbe } from "@/components/ClientErrorProbe";
import { ContentProtection } from "@/components/ContentProtection";
import type { ReactNode } from "react";

/** Global client providers for the Awwwards dark-first portfolio. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <ContentProtection />
      <ClientErrorProbe />
      {children}
    </LenisProvider>
  );
}
