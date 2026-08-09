"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion";
import { skillGroups } from "@/data/content";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active] ?? skillGroups[0];

  return (
    <section
      id="skills"
      className="relative scroll-mt-28 border-t border-[var(--line)] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">03 Skills</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3rem)] tracking-[-0.03em] text-[var(--fg)]">
            How I work
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            Strategy, AI, execution, and tools — scannable by focus area.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 border-t border-[var(--line)] pt-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <div
            role="tablist"
            aria-label="Skill areas"
            className="flex flex-wrap gap-2 lg:flex-col lg:gap-0"
          >
            {skillGroups.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.title}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-left text-sm transition-colors lg:rounded-none lg:border-l lg:px-4 lg:py-3",
                    selected
                      ? "bg-[var(--accent-soft)] text-[var(--accent)] lg:border-[var(--accent)] lg:bg-transparent"
                      : "text-[var(--muted)] hover:text-[var(--fg)] lg:border-[var(--line)]",
                  )}
                >
                  {g.title}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" aria-label={group.title}>
            <p className="eyebrow !text-[var(--accent)]">{group.title}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--line)] px-3.5 py-1.5 text-sm text-[var(--fg)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
