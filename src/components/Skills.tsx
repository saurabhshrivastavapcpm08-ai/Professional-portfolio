"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { skillGroups } from "@/data/content";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Capabilities"
            title="How I actually work"
            description="Strategy, AI, execution, and tools — grouped the way product work happens, not a keyword dump."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="h-full rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
                <h3 className="eyebrow">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-cursor="hover"
                      className="rounded-full border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 text-sm text-[var(--ink-soft)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--ink)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
