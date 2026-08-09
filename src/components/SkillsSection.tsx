"use client";

import { Reveal } from "@/components/motion";
import { skillGroups } from "@/data/content";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-28 border-t border-[var(--line)] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">03 Skills</p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.03em] text-[var(--fg)]">
            How I work
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Strategy, AI, execution, and tools — grouped the way product work actually
            happens.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-12 border-t border-[var(--line)] pt-12 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <li>
                <h3 className="eyebrow !text-[var(--accent)]">{group.title}</h3>
                <ul className="mt-5 space-y-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[var(--line)] py-3 text-sm text-[var(--fg)] last:border-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
