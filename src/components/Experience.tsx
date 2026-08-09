"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { certifications, education, experience } from "@/data/content";

export function Experience() {
  return (
    <section
      id="timeline"
      className="relative scroll-mt-24 border-y border-[var(--line)] bg-[var(--sand-2)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Timeline"
            title="Roles, ownership & growth"
            description="From automotive SaaS product leadership to foundational B2B growth — with ISB product certification along the way."
          />
        </Reveal>

        <Stagger className="relative mt-14 space-y-6 before:absolute before:bottom-4 before:left-[0.85rem] before:top-4 before:w-0.5 before:bg-[var(--line)] sm:before:left-[1.1rem]">
          {experience.map((job) => (
            <StaggerItem key={job.company}>
              <li className="relative grid list-none gap-4 pl-10 sm:grid-cols-[10rem_1fr] sm:gap-10 sm:pl-14">
                <span className="absolute left-0 top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--sand-2)] sm:left-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <p className="text-sm font-bold text-[var(--accent)]">{job.dates}</p>
                <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
                    {job.company}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {job.role} · {job.location}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative pl-4 text-sm leading-relaxed text-[var(--ink-soft)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 grid gap-8 border-t border-[var(--line)] pt-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
              Education
            </h3>
            <ul className="mt-6 space-y-5">
              {education.map((item) => (
                <li key={item.school}>
                  <p className="font-semibold text-[var(--ink)]">{item.school}</p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{item.credential}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.dates}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
              Certifications
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 text-xs text-[var(--ink-soft)]"
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
