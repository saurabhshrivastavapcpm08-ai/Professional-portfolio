"use client";

import Link from "next/link";
import { companies, type CompanyId } from "@/data/work";
import { getCompanyProjects } from "@/lib/work-routes";
import { cn } from "@/lib/utils";

export function WorkCompanyView({ companyId }: { companyId: CompanyId }) {
  const company = companies.find((c) => c.id === companyId)!;
  const projects = getCompanyProjects(companyId);

  return (
    <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-32">
      <div className="max-w-3xl">
        <p className="eyebrow">Work</p>
        <h1 className="font-display mt-4 text-[clamp(2.4rem,5vw,3.5rem)] tracking-[-0.03em] text-[var(--fg)]">
          Building products from customer problems to measurable outcomes.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Two product chapters spanning B2B/B2C SaaS, AI, customer experience, automation,
          ML and platform products.
        </p>
      </div>

      <div
        className="mt-14 flex gap-8 border-b border-[var(--line)]"
        role="tablist"
        aria-label="Company"
      >
        {companies.map((c) => {
          const href = c.id === "solera" ? "/work" : `/work/${c.id}`;
          const active = c.id === companyId;
          return (
            <Link
              key={c.id}
              href={href}
              role="tab"
              aria-selected={active}
              className={cn(
                "relative pb-4 text-sm tracking-[0.14em] uppercase transition-colors",
                active ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]",
              )}
            >
              {c.id === "solera" ? "Solera" : "Tekion"}
              {active ? (
                <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--accent)]" />
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="mt-12 max-w-3xl">
        <p className="eyebrow !tracking-[0.2em]">{company.name}</p>
        <h2 className="font-display mt-3 text-3xl tracking-[-0.02em] text-[var(--fg)] sm:text-4xl">
          {company.role}
        </h2>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {company.product}
          {company.scale ? ` · ${company.scale}` : ""} · {company.dates}
        </p>
        <p className="mt-6 text-base leading-relaxed text-[var(--fg)] sm:text-lg">
          {company.story}
        </p>
        <p className="mt-6 text-sm text-[var(--accent)]">
          {company.focusAreas.join(" · ")}
        </p>
      </div>

      <ul className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {projects.map((project) => (
          <li key={project.initiative.id}>
            <Link
              href={project.href}
              className="group grid gap-3 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span className="text-sm tabular-nums text-[var(--muted)]">
                {String(project.index).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl tracking-[-0.02em] text-[var(--fg)] sm:text-2xl">
                  {project.initiative.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {project.initiative.impact}
                </p>
                <p className="mt-3 text-xs text-[var(--accent)]">
                  {project.initiative.keywords.slice(0, 3).join(" · ")}
                </p>
              </div>
              <span className="text-sm font-medium text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-1">
                View project →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
