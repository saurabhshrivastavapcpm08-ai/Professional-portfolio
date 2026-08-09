"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion";
import { portfolioCaseStudies, site } from "@/data/content";

function CaseLink({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const external = href.startsWith("http");
  const className = primary
    ? "rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
    : "rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function CasesSection() {
  return (
    <section
      id="cases"
      className="relative scroll-mt-28 border-t border-[var(--line)] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">02 Cases</p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.03em] text-[var(--fg)]">
            Featured Case Studies
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Selected examples of product strategy, problem solving, and execution across
            different product challenges.
          </p>
        </Reveal>

        <ul className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {portfolioCaseStudies.map((study, i) => (
            <li key={study.slug}>
              <Reveal className="grid gap-8 py-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                <div>
                  <p className="eyebrow">
                    Case study {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-4 text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.12] tracking-[-0.02em] text-[var(--fg)]">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--muted)]">{study.subtitle}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <CaseLink href={study.href} primary>
                      View case study
                    </CaseLink>
                    {study.slug === "tara-hr-coworker" && study.demoHref ? (
                      <CaseLink href={study.demoHref}>View demo</CaseLink>
                    ) : null}
                    {study.slug === "tara-hr-coworker" && study.github ? (
                      <a
                        href={study.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[var(--accent)]"
                      >
                        GitHub →
                      </a>
                    ) : null}
                  </div>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                    {study.summary}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {study.highlights.map((item) => (
                      <li
                        key={item}
                        className="relative pl-4 text-sm text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-[var(--muted)]">
                    {study.stack.join(" · ")}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-[var(--muted)]">
          {site.copyright} · Case study materials are proprietary to the author.
        </p>
      </div>
    </section>
  );
}
