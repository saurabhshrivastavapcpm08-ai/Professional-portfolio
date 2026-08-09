"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { projects, type Project } from "@/data/content";

function ProjectPanel({ project }: { project: Project }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent-soft)]">
          {project.company}
        </span>
        <span className="text-xs text-[var(--muted)]">{project.role}</span>
      </div>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-[var(--paper)] sm:text-3xl">
        {project.title}
      </h3>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted-strong)]">
        {project.summary}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-[var(--paper)]">Responsibilities</p>
          <ul className="mt-3 space-y-2.5">
            {project.responsibilities.map((item) => (
              <li
                key={item}
                className="relative pl-4 text-sm leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--paper)]">Impact</p>
          <ul className="mt-3 space-y-2">
            {project.impact.map((item) => (
              <li
                key={item}
                className="font-[family-name:var(--font-display)] text-xl tracking-[-0.02em] text-[var(--accent)]"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--muted-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [company, setCompany] = useState<"All" | "Tekion" | "Solera">("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      company === "All"
        ? projects
        : projects.filter((project) => project.company === company),
    [company],
  );

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Projects
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl">
            Real product work across Tekion and Solera
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Consumer portals, communications, document automation, recommendations,
            onboarding, and monetization — owned end-to-end.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {(["All", "Tekion", "Solera"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCompany(item)}
              className={`rounded-md px-3.5 py-2 text-sm transition-[transform,background,color] duration-150 active:scale-[0.97] ${
                company === item
                  ? "bg-[var(--accent)] font-medium text-[var(--ink)]"
                  : "border border-white/10 text-[var(--muted-strong)] hover:border-white/25 hover:text-[var(--paper)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <Stagger className="mt-12 space-y-14">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <StaggerItem key={project.id}>
                <motion.div
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, transform: "translateY(10px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ProjectPanel project={project} />
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatePresence>
        </Stagger>
      </div>
    </section>
  );
}
