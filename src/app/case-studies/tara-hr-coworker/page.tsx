import type { Metadata } from "next";
import Link from "next/link";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Tara AI HR Coworker Case Study",
  description:
    "Tara AI — recruitment coworker prototype with FastAPI backend and React recruiter workspace.",
};

export default function TaraHrCaseStudyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
        Case study
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.03em] text-[var(--paper)] sm:text-5xl">
        Tara AI — HR Coworker
      </h1>
      <p className="mt-4 text-lg text-[var(--muted-strong)]">
        A recruitment coworker prototype that helps talent teams manage open roles, rank
        candidates, and chat through next actions.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/case-studies/tara-hr-coworker/demo"
          className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)]"
        >
          View demo
        </Link>
        <a
          href="https://github.com/saurabhshrivastavapcpm08-ai/hr-coworker"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-white/20 px-4 py-2.5 text-sm text-[var(--paper)]"
        >
          View on GitHub
        </a>
        <Link
          href="/#case-studies"
          className="rounded-md border border-white/20 px-4 py-2.5 text-sm text-[var(--paper)]"
        >
          Back to portfolio
        </Link>
      </div>

      <section className="mt-12 space-y-8 text-[var(--muted-strong)]">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Problem
          </h2>
          <p className="mt-3 leading-relaxed">
            Recruiters juggle fragmented job pipelines, candidate scoring, and follow-ups.
            An AI coworker should compress that operational load while keeping humans in
            control of hiring decisions.
          </p>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            What I built
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>FastAPI backend with jobs, candidates, and chat coworker endpoints</li>
            <li>React + Vite recruiter UI for pipeline visibility</li>
            <li>Score-ranked candidate list and stage tracking</li>
            <li>Chat responses with suggested next actions for the hiring workflow</li>
          </ul>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Product narrative
          </h2>
          <p className="mt-3 leading-relaxed">
            Tara positions AI as a coworker — not a black-box autopilot. The prototype
            shows how a PM can translate recruiting pain into API contracts, UX surfaces,
            and measurable workflow assist (faster screening, clearer next steps, ranked
            shortlists).
          </p>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Stack
          </h2>
          <p className="mt-3 leading-relaxed">
            FastAPI, React, TypeScript, Vite — with a portfolio-hosted API so the demo runs
            without a separate backend deploy.
          </p>
        </div>
      </section>

      <footer className="mt-14 border-t border-white/10 pt-6">
        <CopyrightNotice />
        <p className="mt-2 text-xs text-[var(--muted)]">
          {site.copyright} · Created by {site.name}.
        </p>
      </footer>
    </article>
  );
}
