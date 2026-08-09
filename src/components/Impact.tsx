"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { impactStats } from "@/data/content";

export function Impact() {
  return (
    <section id="impact" className="relative scroll-mt-24 border-y border-white/8 bg-[var(--ink)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Quantified impact
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl">
            Outcomes recruiters can verify in sixty seconds
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="border-t border-white/10 pt-5">
                <p className="font-[family-name:var(--font-display)] text-4xl tracking-[-0.03em] text-[var(--accent)] sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-base font-medium text-[var(--paper)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
