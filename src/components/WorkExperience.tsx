"use client";

import Link from "next/link";
import { companies } from "@/data/work";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { site } from "@/data/content";

export function WorkExperience() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="noise" aria-hidden />
      <div className="relative mx-auto max-w-[1140px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Product ownership"
            title="Two chapters. One arc."
            description="Tekion sharpened execution, CX, and ML. Solera expanded platform strategy, AI engagement, GTM, and monetization."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {companies.map((c) => (
            <StaggerItem key={c.id}>
              <TiltCard>
                <a
                  href={`#work-${c.id}`}
                  data-cursor="hover"
                  className="block overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)] transition-colors hover:border-[var(--accent)]"
                >
                  <p className="eyebrow">{c.dates}</p>
                  <h3 className="font-display mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {c.headline}
                  </p>
                  <p className="mt-6 text-sm font-bold text-[var(--accent)]">
                    Jump to initiatives →
                  </p>
                </a>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        {companies.map((company, companyIndex) => (
          <div
            key={company.id}
            id={`work-${company.id}`}
            className={`scroll-mt-28 ${companyIndex > 0 ? "mt-24" : "mt-20"}`}
          >
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--sand-2)] p-7 sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rotate-12 rounded-[2rem] bg-[var(--accent)] opacity-10"
                />
                <p className="eyebrow">{company.name}</p>
                <h3 className="font-display mt-3 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] text-[var(--ink)]">
                  {company.role}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {company.product}
                  {company.scale ? ` · ${company.scale}` : ""} · {company.dates}
                </p>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
                  {company.story}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {company.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-deep)] dark:text-[var(--accent)]"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {company.initiatives.map((initiative, index) => (
                <li key={initiative.id}>
                  <details className="group overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] open:border-[var(--accent)] open:shadow-[var(--shadow)]">
                    <summary className="cursor-pointer list-none p-6 [&::-webkit-details-marker]:hidden">
                      <span className="text-xs font-bold tabular-nums text-[var(--accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display mt-2 text-xl font-bold tracking-[-0.02em] text-[var(--ink)]">
                        {initiative.title}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)] group-open:line-clamp-none">
                        {initiative.impact}
                      </p>
                      <span className="mt-4 inline-block text-sm font-bold text-[var(--accent)]">
                        <span className="group-open:hidden">Details →</span>
                        <span className="hidden group-open:inline">Close</span>
                      </span>
                    </summary>
                    <div className="space-y-4 border-t border-[var(--line)] px-6 pb-6 pt-5">
                      {(
                        [
                          ["Why", initiative.why],
                          ["What", initiative.what],
                          ["How", initiative.how],
                          ["Impact", initiative.impact],
                        ] as const
                      ).map(([label, body]) => (
                        <div key={label}>
                          <p className="eyebrow">{label}</p>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                            {body}
                          </p>
                        </div>
                      ))}
                      <p className="pt-1 text-xs text-[var(--muted)]">
                        {initiative.keywords.join(" · ")}
                      </p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--muted)]">{site.copyright}</p>
          <Link
            href="/#case-studies"
            className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-deep)]"
          >
            Explore case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
