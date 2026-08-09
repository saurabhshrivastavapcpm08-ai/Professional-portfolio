"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { portfolioCaseStudies, site } from "@/data/content";

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative scroll-mt-24 border-y border-white/10 bg-[var(--ink-deep)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Case studies"
          title="YouTube Music Premium+ & Tara AI (GitHub)"
          description="Interactive product packages you can explore — executive proposal work and an AI recruitment coworker prototype."
        />

        <Stagger className="mt-12 grid gap-8 lg:grid-cols-2">
          {portfolioCaseStudies.map((study, i) => (
            <StaggerItem key={study.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(61,184,197,0.12),rgba(12,18,32,0.9))] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-[border-color,transform] duration-200 hover:border-[var(--accent)]/40 hover:translate-y-[-2px]">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-[var(--muted-strong)]">
                    Case study {i + 1}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{study.subtitle}</span>
                </div>

                <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-[var(--paper)] sm:text-3xl">
                  {study.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted-strong)]">
                  {study.summary}
                </p>

                <ul className="mt-6 space-y-2">
                  {study.highlights.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 text-sm text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--warm)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-[var(--muted-strong)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                  <Link
                    href={study.href}
                    className="inline-flex rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition-[transform,filter] duration-150 hover:brightness-110 active:scale-[0.97]"
                  >
                    Open case study
                  </Link>
                  <a
                    href={study.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md border border-white/25 px-5 py-2.5 text-sm text-[var(--paper)] transition-colors hover:border-white/45"
                  >
                    View on GitHub
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center text-xs text-[var(--muted)]">
          {site.copyright} · Case study materials are proprietary to the author.
        </Reveal>
      </div>
    </section>
  );
}
