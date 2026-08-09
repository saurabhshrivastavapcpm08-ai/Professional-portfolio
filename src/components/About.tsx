"use client";

import { Reveal } from "@/components/Reveal";
import { about, site } from "@/data/content";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <Reveal>
          <div className="relative mx-auto flex aspect-[4/5] w-full max-w-sm flex-col justify-end overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(61,184,197,0.35),transparent_45%),linear-gradient(160deg,#152238,#070b14)] p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 70%, rgba(196,165,116,0.35), transparent 40%)",
              }}
            />
            <p className="relative font-[family-name:var(--font-display)] text-6xl tracking-[-0.04em] text-[var(--paper)]">
              SS
            </p>
            <p className="relative mt-4 text-sm font-medium text-[var(--paper)]">
              {site.name}
            </p>
            <p className="relative text-xs text-[var(--muted)]">{site.title}</p>
            <p className="relative mt-6 text-xs text-[var(--muted)]">{site.copyright}</p>
          </div>
        </Reveal>
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
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">
                Solera · Product Manager
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">
                Tekion · Associate PM
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">
                ISB · PCPM
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">
                {site.location}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
