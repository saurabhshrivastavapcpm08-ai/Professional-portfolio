"use client";

import { useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects, workCaseStudies, type Project } from "@/data/content";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-[var(--accent)]/15 px-2.5 py-1 text-xs font-medium text-[var(--accent-soft)]">
          {project.company}
        </span>
        <span className="text-xs text-[var(--muted)]">{project.role}</span>
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl tracking-[-0.02em] text-[var(--paper)]">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-strong)]">
        {project.summary}
      </p>
      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
        {project.impact.map((item) => (
          <li
            key={item}
            className="text-sm font-medium text-[var(--accent)]"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 px-2 py-0.5 text-[11px] text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Projects() {
  const [company, setCompany] = useState<"All" | "Tekion" | "Solera">("All");

  const filtered = useMemo(
    () =>
      company === "All"
        ? projects
        : projects.filter((project) => project.company === company),
    [company],
  );

  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-[var(--ink)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="What I've worked on"
          title="Product ownership at Tekion & Solera"
          description="B2B2C portals, omnichannel communications, ML recommendations, document automation, onboarding, and monetization — the work behind the metrics."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {(["All", "Tekion", "Solera"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCompany(item)}
              className={`rounded-full px-4 py-2 text-sm transition-[transform,background,color] duration-150 active:scale-[0.97] ${
                company === item
                  ? "bg-[var(--accent)] font-semibold text-[var(--ink)]"
                  : "border border-white/15 text-[var(--muted-strong)] hover:border-white/30 hover:text-[var(--paper)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Product stories in brief
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Deeper context on flagship launches — each follows problem → action →
            outcome.
          </p>
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {workCaseStudies.map((study) => (
              <li
                key={study.id}
                className="rounded-xl border border-white/10 bg-[var(--ink-deep)]/50 p-5"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                  {study.company}
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--paper)]">
                  {study.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-strong)]">
                  {study.challenge}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {study.impact.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-medium text-[var(--accent)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
