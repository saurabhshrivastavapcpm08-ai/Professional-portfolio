"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { companies, type CompanyId } from "@/data/work";
import { getFeaturedProjectsForCompany } from "@/lib/work-routes";
import { cn } from "@/lib/utils";

const selectors: {
  id: CompanyId;
  label: string;
  roleShort: string;
  datesShort: string;
}[] = [
  {
    id: "solera",
    label: "Solera",
    roleShort: "Product Manager / Product Owner",
    datesShort: "2025 – Present",
  },
  {
    id: "tekion",
    label: "Tekion",
    roleShort: "Associate Product Manager",
    datesShort: "2022 – 2025",
  },
];

export function FeaturedWorkHome() {
  const [companyId, setCompanyId] = useState<CompanyId>("solera");
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const company = companies.find((c) => c.id === companyId)!;
  const projects = useMemo(
    () => getFeaturedProjectsForCompany(companyId),
    [companyId],
  );

  function selectCompany(id: CompanyId) {
    setCompanyId(id);
    setActiveId(null);
  }

  function toggleProject(id: string) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="border-y border-[var(--line)] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="eyebrow">Featured work</p>
            <h2 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]">
              Experience, products, and impact.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Explore the products I&apos;ve worked on across my product journey — from
              customer experience and ML at Tekion to AI, CRM and platform products at
              Solera.
            </p>
          </div>
          <Link
            href="/work"
            className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
          >
            View all work →
          </Link>
        </div>

        {/* Experience selector */}
        <div
          className="mt-12 grid gap-3 sm:grid-cols-2"
          role="tablist"
          aria-label="Experience"
        >
          {selectors.map((item) => {
            const selected = companyId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectCompany(item.id)}
                className={cn(
                  "border px-5 py-5 text-left transition-colors duration-200 sm:px-6 sm:py-6",
                  selected
                    ? "border-[var(--accent)] bg-white/[0.03]"
                    : "border-[var(--line)] hover:border-white/20",
                )}
              >
                <p
                  className={cn(
                    "text-xs tracking-[0.18em] uppercase",
                    selected ? "text-[var(--accent)]" : "text-[var(--muted)]",
                  )}
                >
                  {item.label}
                </p>
                <p className="mt-2 font-display text-xl tracking-[-0.02em] text-[var(--fg)] sm:text-2xl">
                  {item.roleShort}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.datesShort}</p>
              </button>
            );
          })}
        </div>

        {/* Company context */}
        <AnimatePresence mode="wait">
          <motion.div
            key={companyId}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="mt-12 max-w-3xl"
          >
            <p className="eyebrow !tracking-[0.2em]">{company.name}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {company.product}
              {company.scale ? ` · ${company.scale}` : ""} · {company.dates}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--fg)]">
              {company.story}
            </p>
            <p className="mt-4 text-sm text-[var(--accent)]">
              {company.focusAreas.join(" · ")}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Projects */}
        <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)] [perspective:1000px]">
          {projects.map((project, i) => {
            const open = activeId === project.initiative.id;
            return (
              <li key={project.initiative.id}>
                <button
                  type="button"
                  onClick={() => toggleProject(project.initiative.id)}
                  aria-expanded={open}
                  className={cn(
                    "group grid w-full gap-3 py-7 text-left transition-[transform,background-color] duration-300 hover:bg-white/[0.02] sm:grid-cols-[3.5rem_1fr_auto] sm:items-baseline sm:gap-8",
                    !reduce &&
                      "md:[transform-style:preserve-3d] md:hover:[transform:rotateX(2deg)_rotateY(-1.5deg)_translateZ(8px)]",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm tabular-nums text-[var(--muted)] transition-transform duration-300",
                      !reduce && "md:group-hover:[transform:translateZ(28px)]",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={cn(
                      "transition-transform duration-300",
                      !reduce && "md:group-hover:[transform:translateZ(16px)]",
                    )}
                  >
                    <h3 className="font-display text-xl tracking-[-0.02em] text-[var(--fg)] sm:text-2xl">
                      {project.initiative.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)] transition-transform duration-300",
                        !reduce && "md:group-hover:[transform:translateZ(6px)]",
                      )}
                    >
                      {project.initiative.impact}
                    </p>
                    <p
                      className={cn(
                        "mt-3 text-xs text-[var(--accent)] transition-transform duration-300",
                        !reduce && "md:group-hover:[transform:translateZ(4px)]",
                      )}
                    >
                      {project.initiative.keywords.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-sm text-[var(--accent)] transition-transform duration-200",
                      open ? "translate-x-0.5" : "group-hover:translate-x-0.5",
                      !reduce && "md:group-hover:[transform:translateZ(22px)_translateX(2px)]",
                    )}
                  >
                    {open ? "Close" : "View impact →"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[var(--line)] bg-white/[0.015] px-0 py-8 sm:grid sm:grid-cols-[3.5rem_1fr] sm:gap-8">
                        <span className="hidden sm:block" />
                        <div className="max-w-2xl space-y-6">
                          <Detail label="The problem" body={project.initiative.why} />
                          <Detail label="The product" body={project.initiative.what} />
                          <Detail label="My role" body={project.initiative.how} />
                          <Detail label="Impact" body={project.initiative.impact} />
                          <Link
                            href={project.href}
                            className="inline-block text-sm font-medium text-[var(--accent)]"
                          >
                            Open full project page →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Detail({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}
