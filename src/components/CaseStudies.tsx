"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { MagneticButton } from "@/components/MagneticButton";
import { portfolioCaseStudies, site } from "@/data/content";

function CaseStudyCtas({
  slug,
  href,
  demoHref,
}: {
  slug: string;
  href: string;
  demoHref?: string;
}) {
  if (slug === "youtube-music-premium") {
    return (
      <MagneticButton
        href={href}
        className="bg-[var(--accent)] text-white hover:bg-[var(--accent-deep)]"
      >
        View case study
      </MagneticButton>
    );
  }

  if (slug === "tara-hr-coworker") {
    return (
      <>
        <MagneticButton
          href={href}
          className="bg-[var(--accent)] text-white hover:bg-[var(--accent-deep)]"
        >
          View case study
        </MagneticButton>
        {demoHref ? (
          <MagneticButton
            href={demoHref}
            className="border border-[var(--line)] bg-[var(--chip)] text-[var(--ink)]"
          >
            View demo
          </MagneticButton>
        ) : null}
      </>
    );
  }

  return (
    <Link href={href} className="text-sm font-bold text-[var(--accent)]">
      View case study
    </Link>
  );
}

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--line)] bg-[var(--sand-2)] py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 rotate-[-3deg] bg-[var(--accent)] opacity-[0.06]"
      />
      <div className="relative mx-auto max-w-[1140px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Case studies"
            title="Things you can click."
            description="Interactive product packages — an executive proposal and an AI recruitment coworker prototype."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-2">
          {portfolioCaseStudies.map((study, i) => (
            <StaggerItem key={study.slug}>
              <TiltCard>
                <article className="flex h-full flex-col rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)] sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white">
                      0{i + 1}
                    </span>
                    <span className="text-xs text-[var(--muted)]">{study.subtitle}</span>
                  </div>
                  <h3 className="font-display mt-6 text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]">
                    {study.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                    {study.summary}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {study.highlights.map((item) => (
                      <li
                        key={item}
                        className="relative pl-4 text-sm text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-[var(--muted)]">
                    {study.stack.join(" · ")}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-6">
                    <CaseStudyCtas
                      slug={study.slug}
                      href={study.href}
                      demoHref={study.demoHref}
                    />
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 text-center text-xs text-[var(--muted)]">
          {site.copyright} · Case study materials are proprietary to the author.
        </p>
      </div>
    </section>
  );
}
