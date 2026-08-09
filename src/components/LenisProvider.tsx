"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

/**
 * Smooth scrolling via Lenis. Respects prefers-reduced-motion by
 * disabling smoothing when the user requests reduced motion.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
