"use client";

import { Reveal } from "@/components/Reveal";
import { about, site } from "@/data/content";

export function AboutCopy() {
  return (
    <div>
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
          About
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl">
          Product leadership for mid-management PM roles
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-5 text-lg leading-relaxed text-[var(--muted-strong)]">
          {about}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
          <span className="border-b border-white/15 pb-1">
            Solera · Product Manager
          </span>
          <span className="border-b border-white/15 pb-1">
            Tekion · Associate PM
          </span>
          <span className="border-b border-white/15 pb-1">ISB · PCPM</span>
          <span className="border-b border-white/15 pb-1">{site.location}</span>
        </div>
      </Reveal>
    </div>
  );
}
