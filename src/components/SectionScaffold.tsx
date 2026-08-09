"use client";

import { Reveal } from "@/components/motion";

type SectionScaffoldProps = {
  id: string;
  label: string;
  index: string;
};

export function SectionScaffold({ id, label, index }: SectionScaffoldProps) {
  return (
    <section
      id={id}
      className="relative flex min-h-screen scroll-mt-28 items-center justify-center overflow-hidden border-t border-[var(--line)] px-5 sm:px-8"
      aria-label={label}
    >
      <p
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[clamp(4rem,18vw,12rem)] tracking-[-0.04em] text-white/[0.035] select-none"
      >
        {label}
      </p>
      <Reveal className="relative z-10 text-center">
        <p className="eyebrow">
          {index} {label}
        </p>
        <h2 className="font-display mt-4 text-4xl tracking-[-0.03em] text-[var(--fg)] sm:text-5xl">
          {label}
        </h2>
        <p className="mt-4 text-sm text-[var(--muted)]">Coming soon</p>
      </Reveal>
    </section>
  );
}
