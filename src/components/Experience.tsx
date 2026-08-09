"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  certifications,
  education,
  experience,
} from "@/data/content";

export function Experience() {
  return (
    <section
      id="timeline"
      className="relative scroll-mt-24 border-t border-white/10 bg-[var(--ink-deep)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Professional timeline"
          title="Roles, ownership & growth"
          description="From automotive SaaS product leadership to foundational B2B sales and operations — with ISB product certification along the way."
        />

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-[var(--accent)] via-white/20 to-transparent sm:left-6"
          />
          <Stagger className="space-y-10">
            {experience.map((job) => (
              <StaggerItem key={job.company} className="relative pl-12 sm:pl-16">
                <span className="absolute left-2 top-2 h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[var(--ink-deep)] sm:left-4" />
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
                      {job.company}
                    </h3>
                    <p className="text-sm font-medium text-[var(--accent-soft)]">
                      {job.dates}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {job.role} · {job.location}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative pl-4 text-sm leading-relaxed text-[var(--muted-strong)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--paper)]">
              Education
            </h3>
            <ul className="mt-5 space-y-5">
              {education.map((item) => (
                <li key={item.school}>
                  <p className="font-medium text-[var(--paper)]">{item.school}</p>
                  <p className="text-sm text-[var(--muted-strong)]">
                    {item.credential}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{item.dates}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--paper)]">
              Certifications
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {certifications.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[var(--muted-strong)]"
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
