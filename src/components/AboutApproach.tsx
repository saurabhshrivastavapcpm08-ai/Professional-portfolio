"use client";

import { useState } from "react";
import { aboutProductApproach } from "@/data/about";
import { cn } from "@/lib/utils";

export function AboutApproach() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="mt-20 border-t border-[var(--line)] pt-12" aria-labelledby="approach-heading">
      <h2
        id="approach-heading"
        className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-[-0.02em] text-[var(--fg)]"
      >
        How I approach product
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
        I believe good product management sits at the intersection of customer problems,
        technology and business outcomes.
      </p>

      {/* Desktop horizontal */}
      <ol className="mt-12 hidden gap-0 border-t border-[var(--line)] lg:grid lg:grid-cols-5">
        {aboutProductApproach.map((step, i) => {
          const isOpen = open === step.number;
          return (
            <li
              key={step.number}
              className={cn(
                "relative border-[var(--line)] pt-6 pr-5",
                i < aboutProductApproach.length - 1 && "border-r",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : step.number)}
                className="w-full text-left transition-colors hover:text-[var(--fg)]"
              >
                <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--accent)]">
                  {step.number}
                </p>
                <p className="mt-3 text-xs font-medium tracking-[0.16em] text-[var(--fg)] uppercase">
                  {step.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {isOpen ? step.detail : step.short}
                </p>
                <p className="mt-3 text-[11px] text-[var(--accent)]">
                  {isOpen ? "Show less" : "Read more"}
                </p>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Mobile vertical collapsible */}
      <ol className="mt-10 space-y-0 border-t border-[var(--line)] lg:hidden">
        {aboutProductApproach.map((step) => (
          <li key={step.number} className="border-b border-[var(--line)]">
            <details className="group py-5">
              <summary className="cursor-pointer list-none">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--accent)]">
                      {step.number}
                    </p>
                    <p className="mt-2 text-xs font-medium tracking-[0.16em] text-[var(--fg)] uppercase">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {step.short}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-[var(--accent)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{step.detail}</p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
