"use client";

import { Reveal } from "@/components/motion";
import { certifications, education, experience } from "@/data/content";

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative scroll-mt-28 border-t border-[var(--line)] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">04 Timeline</p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.03em] text-[var(--fg)]">
            Roles, ownership & growth
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            From automotive SaaS product leadership to foundational B2B growth — with ISB
            product certification along the way.
          </p>
        </Reveal>

        <ol className="mt-16 border-t border-[var(--line)]">
          {experience.map((job) => (
            <li
              key={job.company}
              className="grid gap-4 border-b border-[var(--line)] py-10 md:grid-cols-[11rem_1fr] md:gap-12"
            >
              <Reveal>
                <p className="text-sm font-medium text-[var(--accent)]">{job.dates}</p>
              </Reveal>
              <Reveal>
                <h3 className="font-display text-2xl tracking-[-0.02em] text-[var(--fg)] sm:text-3xl">
                  {job.company}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {job.role} · {job.location}
                </p>
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-4 text-sm leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-12 border-t border-[var(--line)] pt-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-2xl text-[var(--fg)]">Education</h3>
            <ul className="mt-6 space-y-6">
              {education.map((item) => (
                <li key={item.school}>
                  <p className="font-medium text-[var(--fg)]">{item.school}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.credential}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.dates}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="font-display text-2xl text-[var(--fg)]">Certifications</h3>
            <ul className="mt-6 space-y-0">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="border-b border-[var(--line)] py-3 text-sm text-[var(--muted)] last:border-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
