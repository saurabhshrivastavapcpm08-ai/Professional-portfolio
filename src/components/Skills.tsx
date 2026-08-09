"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { skillGroups } from "@/data/content";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-y border-white/8 bg-[var(--ink)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Skills
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl">
            Strategy, AI, execution, and the tools behind them
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-10 md:grid-cols-2">
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm text-[var(--muted-strong)] transition-colors duration-150 hover:border-[var(--accent)]/40 hover:text-[var(--paper)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
