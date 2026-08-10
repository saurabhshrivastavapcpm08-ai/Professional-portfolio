import type { Metadata } from "next";
import Link from "next/link";
import { portfolioCaseStudies } from "@/data/content";

export const metadata: Metadata = {
  title: "YouTube Music Premium+ | Case Study",
  description:
    "Executive product proposal for YouTube Music Premium+ — Hi-Res audio, AI music intelligence, adaptive listening, and packaging strategy.",
};

const study = portfolioCaseStudies.find((s) => s.slug === "youtube-music-premium")!;

export default function YouTubeMusicCaseStudyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-28 sm:px-8 sm:py-32">
      <p className="eyebrow !text-[var(--accent)]">Personal product case study</p>
      <h1 className="font-display mt-4 text-[clamp(2.4rem,5vw,3.5rem)] tracking-[-0.03em] text-[var(--fg)]">
        {study.title}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{study.subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/case-studies/youtube-music-premium"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)]"
        >
          Open interactive proposal
        </Link>
      </div>

      <div className="mt-14 space-y-12 text-[var(--muted)]">
        <Section title="Overview">{study.summary}</Section>

        <Section title="Problem / Opportunity">
          Audiophiles churn to competitors for lossless audio. Discovery is passive.
          Workout listening is static. Pixel lacks a flagship music differentiator.
          Premium+ packages four capabilities into one subscription that raises ARPU
          without fragmenting core Premium.
        </Section>

        <Section title="Target users">
          Premium listeners seeking higher fidelity, deeper music understanding, and
          adaptive listening — packaged for a differentiated YouTube Music tier without
          splitting the core Premium base.
        </Section>

        <Section title="Product concept">
          A monetizable Premium+ tier that combines Hi-Res audio, Gemini-powered music
          intelligence, wearable adaptive listening, and Pixel ecosystem integration into
          one product narrative: Hear Better, Know More, Move Better.
        </Section>

        <Section title="Product pillars">
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--fg)]">Hear Better</strong> — FLAC & Hi-Res
              streaming with adaptive quality
            </li>
            <li>
              <strong className="text-[var(--fg)]">Know More</strong> — Gemini-powered song
              insights and learning in-app
            </li>
            <li>
              <strong className="text-[var(--fg)]">Move Better</strong> — wearable-driven
              adaptive workout music
            </li>
          </ul>
        </Section>

        <Section title="Feature strategy">
          <ul className="mt-3 space-y-2">
            {study.highlights.map((item) => (
              <li key={item} className="border-b border-[var(--line)] py-2 last:border-0">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Business model">
          Package four capabilities into one Premium+ subscription that raises ARPU while
          protecting core Premium — a packaging strategy rather than a fragmented feature
          upsell.
        </Section>

        <Section title="MVP → V2 roadmap">
          Executive summary, product inputs, engineering specs, and an MVP → V1 → V2
          roadmap — available in the interactive proposal.
        </Section>

        <Section title="Success metrics">
          Personas, north-star metrics, and packaging strategy are defined in the
          interactive proposal — focused on ARPU, retention of premium listeners, and
          adoption of Premium+ differentiators.
        </Section>

        <Section title="Technical considerations">
          Stack used for the proposal experience: {study.stack.join(" · ")}. Engineering
          specs in the interactive package outline delivery considerations for audio,
          intelligence, and wearable integrations.
        </Section>

        <Section title="Key decisions">
          Keep Premium intact; differentiate via a Premium+ tier. Lead with three consumer
          pillars (Hear Better, Know More, Move Better). Pair PRD-level strategy with
          engineering-ready specs so the proposal is executable, not only narrative.
        </Section>

        <Section title="Final product proposal">
          Demonstrates end-to-end product craft: problem framing, personas, packaging,
          success metrics, and engineering-ready specs — presented as a visual executive
          proposal rather than a resume project.
        </Section>
      </div>

      <Link
        href="/case-studies"
        className="mt-16 inline-block text-sm text-[var(--accent)]"
      >
        ← Back to case studies
      </Link>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-[var(--fg)]">{title}</h2>
      <div className="mt-3 text-base leading-relaxed">{children}</div>
    </section>
  );
}
