import type { Metadata } from "next";
import Link from "next/link";
import { portfolioCaseStudies } from "@/data/content";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | Product Case Studies",
  description:
    "Selected product thinking, strategy and execution — YouTube Music Premium+ and Tara AI HR Coworker.",
};

const routes: Record<string, string> = {
  "youtube-music-premium": "/case-studies/youtube-music",
  "tara-hr-coworker": "/case-studies/tara-ai",
};

export default function CaseStudiesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-32">
      <p className="eyebrow">Case studies</p>
      <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.5rem)] tracking-[-0.03em] text-[var(--fg)]">
        Selected product thinking, strategy and execution.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        A selection of case studies exploring product problems, strategy, decisions,
        prototypes and outcomes.
      </p>

      <ul className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {portfolioCaseStudies.map((study, i) => (
          <li key={study.slug}>
            <Link
              href={routes[study.slug] ?? study.href}
              className="group grid gap-3 py-10 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span className="text-sm tabular-nums text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="eyebrow !text-[var(--accent)]">Personal product case study</p>
                <h2 className="font-display mt-2 text-2xl tracking-[-0.02em] text-[var(--fg)] sm:text-3xl">
                  {study.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{study.subtitle}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                  {study.summary}
                </p>
              </div>
              <span className="text-sm font-medium text-[var(--accent)] transition-transform group-hover:translate-x-1">
                Read →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
