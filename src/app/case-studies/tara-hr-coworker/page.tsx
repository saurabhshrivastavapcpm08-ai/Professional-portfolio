import type { Metadata } from "next";
import Link from "next/link";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Tara AI HR Coworker Case Study",
  description:
    "Tara AI — recruitment coworker case study with live prototype workspace.",
};

const github = "https://github.com/saurabhshrivastavapcpm08-ai/hr-coworker";

export default function TaraHrCaseStudyPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(246,245,242,0.92)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="min-w-0">
            <Link
              href="/#case-studies"
              className="text-sm text-[var(--muted-strong)] hover:text-[var(--accent)]"
            >
              ← Back to portfolio
            </Link>
            <h1 className="font-display mt-1 text-lg text-[var(--ink)] sm:text-xl">
              Tara AI — HR Coworker
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="#live-demo" className="btn-primary !py-2 !px-3 text-xs">
              Jump to live demo
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-2 !px-3 text-xs"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="eyebrow">Case study</p>
        <p className="prose-muted mt-5 text-lg">
          A recruitment coworker prototype that helps talent teams manage open roles, rank
          candidates, and chat through next actions — with the full recruiter workspace
          embedded below.
        </p>

        <section className="mt-12 space-y-10">
          <div>
            <h2 className="font-display text-2xl text-[var(--ink)]">Problem</h2>
            <p className="prose-muted mt-3">
              Recruiters juggle fragmented job pipelines, candidate scoring, and follow-ups.
              An AI coworker should compress operational load while keeping humans in control
              of hiring decisions.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-[var(--ink)]">What I built</h2>
            <ul className="prose-muted mt-3 list-disc space-y-2 pl-5">
              <li>Jobs, candidates, and chat coworker APIs (hosted on this portfolio)</li>
              <li>React recruiter UI for pipeline visibility and score-ranked candidates</li>
              <li>Chat responses with suggested next actions for the hiring workflow</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-[var(--ink)]">Product narrative</h2>
            <p className="prose-muted mt-3">
              Tara positions AI as a coworker — not a black-box autopilot. The prototype shows
              how a PM translates recruiting pain into API contracts, UX surfaces, and
              measurable workflow assist.
            </p>
          </div>
        </section>
      </article>

      <section
        id="live-demo"
        className="scroll-mt-20 border-t border-[var(--line)] bg-[var(--paper-elevated)]"
      >
        <div className="mx-auto max-w-[1120px] px-5 py-10 sm:px-8">
          <h2 className="font-display text-2xl text-[var(--ink)]">Live prototype</h2>
          <p className="prose-muted mt-2 max-w-2xl text-sm">
            Add candidates, review reqs, and ask Tara — same UI as the GitHub repo, running
            against the portfolio API.
          </p>
        </div>
        <iframe
          title="Tara AI HR Coworker prototype"
          src="/demos/tara/"
          className="block w-full border-0 bg-[var(--paper)]"
          style={{ minHeight: "min(90vh, 920px)" }}
          allow="clipboard-read; clipboard-write"
        />
      </section>

      <footer className="border-t border-[var(--line)] px-5 py-6 text-center">
        <CopyrightNotice />
        <p className="mt-2 text-xs text-[var(--muted)]">
          {site.copyright} · Created by {site.name}.
        </p>
      </footer>
    </div>
  );
}
