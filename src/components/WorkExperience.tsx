import Link from "next/link";
import { companies } from "@/data/work";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/content";

export function WorkExperience() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-[var(--ink)] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--accent) 35%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Product ownership"
          title="Solera & Tekion — two chapters, one arc"
          description="Tekion sharpened execution, CX, and ML. Solera expanded platform strategy, AI engagement, and monetization. Jump to a company, then expand any initiative."
        />

        <nav
          className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          aria-label="Jump to company"
        >
          {companies.map((c) => (
            <a
              key={c.id}
              href={`#work-${c.id}`}
              className="group relative flex-1 overflow-hidden rounded-2xl border border-white/12 px-5 py-4 transition-[border-color,transform] duration-200 hover:border-[var(--accent)]/40 active:scale-[0.99]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(12,18,32,0.9))] opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <p className="font-[family-name:var(--font-display)] text-lg text-[var(--paper)]">
                  {c.name}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">{c.dates}</p>
                <p className="mt-2 text-sm font-medium text-[var(--accent-soft)]">
                  {c.headline}
                </p>
                <p className="mt-3 text-xs font-semibold text-[var(--accent)]">
                  View {c.id === "solera" ? "Solera" : "Tekion"} initiatives →
                </p>
              </div>
            </a>
          ))}
        </nav>

        {companies.map((company, companyIndex) => (
          <div
            key={company.id}
            id={`work-${company.id}`}
            className={`scroll-mt-28 ${companyIndex > 0 ? "mt-20 border-t border-white/10 pt-20" : "mt-14"}`}
          >
            <article className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(7,11,20,0.6))] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--accent-soft)]">
                    {company.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-strong)]">
                    {company.role}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {company.product}
                    {company.scale ? ` · ${company.scale}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1 text-[11px] font-medium text-[var(--accent-soft)]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--paper)]">
                {company.story}
              </p>
            </article>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {company.initiatives.map((initiative, index) => (
                <li key={initiative.id}>
                  <details className="group rounded-xl border border-white/10 bg-[var(--ink-deep)]/60 open:border-[var(--accent)]/35">
                    <summary className="cursor-pointer list-none p-5 [&::-webkit-details-marker]:hidden">
                      <span className="text-[11px] font-medium tabular-nums text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--paper)]">
                        {initiative.title}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted-strong)] group-open:line-clamp-none">
                        {initiative.impact}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                        <span className="group-open:hidden">View initiative →</span>
                        <span className="hidden group-open:inline">Close ↑</span>
                      </span>
                    </summary>
                    <div className="border-t border-white/10 px-5 pb-5 pt-4">
                      {(
                        [
                          ["Why", initiative.why],
                          ["What", initiative.what],
                          ["How", initiative.how],
                          ["Impact", initiative.impact],
                        ] as const
                      ).map(([label, body]) => (
                        <div key={label} className="mt-4 first:mt-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--warm)]">
                            {label}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
                            {body}
                          </p>
                        </div>
                      ))}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {initiative.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] text-[var(--muted)]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 sm:flex-row">
          <p className="text-center text-xs text-[var(--muted)] sm:text-left">
            {site.copyright}
          </p>
          <Link
            href="/#case-studies"
            className="text-sm font-medium text-[var(--accent-soft)] hover:text-[var(--accent)]"
          >
            Explore interactive case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
