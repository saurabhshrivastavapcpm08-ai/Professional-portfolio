import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { portfolioCaseStudies, site } from "@/data/content";

function CaseStudyCtas({
  slug,
  href,
  demoHref,
  github,
}: {
  slug: string;
  href: string;
  demoHref?: string;
  github?: string;
}) {
  if (slug === "youtube-music-premium") {
    return (
      <Link href={href} className="btn-primary">
        View case study
      </Link>
    );
  }

  if (slug === "tara-hr-coworker") {
    return (
      <>
        <Link href={href} className="btn-primary">
          View case study
        </Link>
        {demoHref ? (
          <Link href={demoHref} className="btn-ghost">
            View demo
          </Link>
        ) : null}
        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-text"
          >
            GitHub →
          </a>
        ) : null}
      </>
    );
  }

  return (
    <Link href={href} className="btn-primary">
      View case study
    </Link>
  );
}

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative scroll-mt-24 border-y border-[var(--line)] bg-[var(--paper-elevated)] py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Case studies"
          title="Selected product packages"
          description="Interactive work you can explore — an executive product proposal and an AI recruitment coworker prototype."
        />

        <ul className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {portfolioCaseStudies.map((study, i) => (
            <li key={study.slug} className="grid gap-8 py-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <div>
                <p className="eyebrow">Case study {String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display mt-4 text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted)]">{study.subtitle}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <CaseStudyCtas
                    slug={study.slug}
                    href={study.href}
                    demoHref={study.demoHref}
                    github={study.github}
                  />
                </div>
              </div>
              <div>
                <p className="prose-muted text-base sm:text-lg">{study.summary}</p>
                <ul className="mt-6 space-y-3">
                  {study.highlights.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 text-sm text-[var(--muted-strong)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-[var(--muted)]">
                  {study.stack.join(" · ")}
                </p>
              </div>
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
