import Link from "next/link";
import { companies } from "@/data/work";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/content";

export function WorkExperience() {
  return (
    <section id="work" className="relative scroll-mt-24 py-[var(--section-pad)]">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Product ownership"
          title="Two chapters of product leadership"
          description="Tekion sharpened execution, customer experience, and ML. Solera expanded platform strategy, AI engagement, GTM, and monetization."
        />

        <nav
          className="mt-12 flex flex-col gap-0 border-y border-[var(--line)] sm:flex-row"
          aria-label="Jump to company"
        >
          {companies.map((c) => (
            <a
              key={c.id}
              href={`#work-${c.id}`}
              className="group flex-1 border-[var(--line)] px-0 py-7 transition-colors hover:bg-[var(--paper-elevated)] sm:px-8 sm:first:pl-0 sm:last:pr-0 sm:odd:border-r"
            >
              <p className="eyebrow">{c.dates}</p>
              <p className="font-display mt-3 text-2xl text-[var(--ink)] sm:text-[1.75rem]">
                {c.name}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--muted-strong)]">
                {c.headline}
              </p>
              <p className="btn-text mt-5">
                View initiatives
                <span aria-hidden>→</span>
              </p>
            </a>
          ))}
        </nav>

        {companies.map((company, companyIndex) => (
          <div
            key={company.id}
            id={`work-${company.id}`}
            className={`scroll-mt-28 ${companyIndex > 0 ? "mt-24 border-t border-[var(--line)] pt-24" : "mt-20"}`}
          >
            <div className="max-w-3xl">
              <p className="eyebrow">{company.name}</p>
              <h3 className="font-display mt-3 text-3xl tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                {company.role}
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {company.product}
                {company.scale ? ` · ${company.scale}` : ""} · {company.dates}
              </p>
              <p className="prose-muted mt-6 text-base sm:text-lg">{company.story}</p>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {company.focusAreas.map((area) => (
                  <li key={area} className="text-sm text-[var(--accent)]">
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {company.initiatives.map((initiative, index) => (
                <li key={initiative.id}>
                  <details className="group">
                    <summary className="cursor-pointer list-none py-7 [&::-webkit-details-marker]:hidden sm:grid sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6">
                      <span className="text-xs font-medium tabular-nums text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-display text-xl text-[var(--ink)] sm:text-2xl">
                          {initiative.title}
                        </h4>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-strong)] sm:text-base">
                          {initiative.impact}
                        </p>
                      </div>
                      <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)] sm:mt-0">
                        <span className="group-open:hidden">Details →</span>
                        <span className="hidden group-open:inline">Close</span>
                      </span>
                    </summary>
                    <div className="pb-8 sm:grid sm:grid-cols-[4rem_1fr] sm:gap-6">
                      <div className="hidden sm:block" />
                      <div className="max-w-2xl space-y-5 border-t border-[var(--line)] pt-6">
                        {(
                          [
                            ["Why", initiative.why],
                            ["What", initiative.what],
                            ["How", initiative.how],
                            ["Impact", initiative.impact],
                          ] as const
                        ).map(([label, body]) => (
                          <div key={label}>
                            <p className="eyebrow !text-[var(--warm)]">{label}</p>
                            <p className="prose-muted mt-2 text-sm sm:text-base">{body}</p>
                          </div>
                        ))}
                        <p className="pt-2 text-xs leading-relaxed text-[var(--muted)]">
                          {initiative.keywords.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--muted)]">{site.copyright}</p>
          <Link href="/#case-studies" className="btn-text">
            Explore case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
