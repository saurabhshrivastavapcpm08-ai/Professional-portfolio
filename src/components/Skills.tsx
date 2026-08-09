"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/content";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 bg-[var(--ink)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Skill set"
          title="Strategy, AI, execution & tools"
          description="Grouped for how I actually work — from GTM and pricing to LLM features, compliance, and the platforms I ship with."
        />

        <Stagger className="mt-12 grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-[var(--ink-deep)]/40 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-[var(--muted-strong)] transition-colors duration-150 hover:border-[var(--accent)]/40 hover:text-[var(--paper)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
