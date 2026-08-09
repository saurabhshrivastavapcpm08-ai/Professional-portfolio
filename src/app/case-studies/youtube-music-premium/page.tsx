import type { Metadata } from "next";
import Link from "next/link";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "YouTube Music Premium+ Case Study",
  description:
    "Executive product proposal for YouTube Music Premium+ — Hi-Res audio, AI music intelligence, adaptive listening, and Pixel integration.",
};

export default function YouTubeMusicCaseStudyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
        Case study
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.03em] text-[var(--paper)] sm:text-5xl">
        YouTube Music Premium+
      </h1>
      <p className="mt-4 text-lg text-[var(--muted-strong)]">
        Visual business proposal and product planning package for a differentiated
        premium tier — Hear Better, Know More, Move Better.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="https://github.com/saurabhshrivastavapcpm08-ai/yt_casestudy"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)]"
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
            Audiophiles churn to Apple Music and Tidal for lossless audio. Discovery is
            passive. Workout listening is static. Pixel lacks a flagship music differentiator.
            Premium+ packages four capabilities into one subscription that raises ARPU without
            fragmenting core Premium.
          </p>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Product approach
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              <strong className="text-[var(--paper)]">Hear Better</strong> — FLAC & Hi-Res
              streaming with adaptive quality and DAC-aware prompts
            </li>
            <li>
              <strong className="text-[var(--paper)]">Know More</strong> — Gemini-powered song
              insights, trivia, and gamified learning in-app
            </li>
            <li>
              <strong className="text-[var(--paper)]">Move Better</strong> — wearable-driven
              adaptive workout music and AI DJ
            </li>
            <li>
              Cross-cutting Pixel integration and Premium+ packaging/monetization
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Artifacts shipped in the repo
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Executive summary — vision, personas, north-star metrics</li>
            <li>Product inputs — pillar requirements & success metrics</li>
            <li>Engineering — user stories, FR/NFR, architecture</li>
            <li>Roadmap — MVP → V1 → V2 prioritization</li>
          </ul>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Why it matters for PM interviews
          </h2>
          <p className="mt-3 leading-relaxed">
            Demonstrates end-to-end product craft: problem framing, persona clarity,
            competitive gaps, packaging, success metrics, and engineering-ready specs — the
            same muscles used shipping omnichannel and AI features at Solera and Tekion.
          </p>
        </div>
      </section>

      <footer className="mt-14 border-t border-white/10 pt-6">
        <CopyrightNotice />
        <p className="mt-2 text-xs text-[var(--muted)]">
          Created by {site.name}. Source materials remain proprietary to the author.
        </p>
      </footer>
    </article>
  );
}
