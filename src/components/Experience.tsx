"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  certifications,
  education,
  experience,
} from "@/data/content";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Experience
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl">
            Timeline of roles & ownership
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute bottom-0 left-[0.55rem] top-2 w-px bg-gradient-to-b from-[var(--accent)] via-white/20 to-transparent sm:left-[0.7rem]"
          />
          <Stagger className="space-y-12">
            {experience.map((job) => (
              <StaggerItem key={job.company} className="relative pl-10 sm:pl-14">
                <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--ink-deep)] sm:left-1 sm:h-3.5 sm:w-3.5" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
                    {job.company}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{job.dates}</p>
                </div>
                <p className="mt-1 text-sm text-[var(--accent-soft)]">
                  {job.role} · {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm leading-relaxed text-[var(--muted-strong)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-2">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
              Education
            </h3>
            <ul className="mt-5 space-y-5">
              {education.map((item) => (
                <li key={item.school}>
                  <p className="font-medium text-[var(--paper)]">{item.school}</p>
                  <p className="text-sm text-[var(--muted-strong)]">{item.credential}</p>
                  <p className="text-xs text-[var(--muted)]">{item.dates}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
              Certifications
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {certifications.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-[var(--muted-strong)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
