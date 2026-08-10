import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutApproach } from "@/components/AboutApproach";
import { Reveal } from "@/components/motion";
import {
  aboutIntroExact,
  beyondBacklog,
  productCapabilities,
  toolPlatforms,
} from "@/data/about";
import { education, experience, site } from "@/data/content";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | About",
  description:
    "Product Manager focused on turning complex problems into scalable products and measurable outcomes. 4+ years Product · 8+ years cross-functional.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-32">
      {/* Header */}
      <section aria-labelledby="about-heading">
        <p className="eyebrow">About</p>
        <h1
          id="about-heading"
          className="font-display mt-4 max-w-4xl text-[clamp(2rem,4.5vw,3.1rem)] leading-[1.12] tracking-[-0.03em] text-[var(--fg)]"
        >
          Product Manager focused on turning complex problems into scalable products and
          measurable outcomes.
        </h1>
        <p className="mt-5 text-sm text-[var(--muted)] sm:text-base">
          4+ years Product experience
          <span className="mx-2 text-[var(--line)]" aria-hidden>
            ·
          </span>
          8+ years cross-functional experience
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-[52rem]">
            {aboutIntroExact.split("\n\n").map((para) => (
              <p
                key={para.slice(0, 40)}
                className="mt-5 text-base leading-[1.75] text-[var(--muted)] first:mt-0 sm:text-lg"
              >
                {para}
              </p>
            ))}
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-[var(--line)] lg:max-w-none">
            <Image
              src="/images/portrait.jpg"
              alt={site.name}
              fill
              sizes="400px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Product capabilities */}
      <section
        className="mt-20 border-t border-[var(--line)] pt-12"
        aria-labelledby="capabilities-heading"
      >
        <Reveal>
          <h2
            id="capabilities-heading"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-[-0.02em] text-[var(--fg)]"
          >
            Product capabilities
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-0 border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {productCapabilities.map((group, i) => (
            <li
              key={group.title}
              className={`border-[var(--line)] py-8 sm:pr-6 ${
                i % 2 === 0 ? "sm:border-r" : ""
              } ${i < 2 ? "lg:border-b" : ""} lg:border-r lg:pr-6 lg:[&:nth-child(4n)]:border-r-0`}
            >
              <h3 className="text-[11px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
                {group.title}
              </h3>
              <div className="mt-3 h-px w-10 bg-[var(--line)]" />
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-snug text-[var(--muted)]">
                    <span className="text-[var(--fg)]">{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Tools */}
      <section
        className="mt-16 border-t border-[var(--line)] pt-12"
        aria-labelledby="tools-heading"
      >
        <h2
          id="tools-heading"
          className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-[-0.02em] text-[var(--fg)]"
        >
          Tools &amp; platforms
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2">
          {toolPlatforms.map((group) => (
            <li key={group.title} className="border-t border-[var(--line)] pt-5">
              <h3 className="text-[11px] font-medium tracking-[0.16em] text-[var(--muted)] uppercase">
                {group.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/80">{group.tools}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Approach — collapsible */}
      <AboutApproach />

      {/* Experience + education */}
      <section className="mt-16 grid gap-10 border-t border-[var(--line)] pt-12 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-[var(--fg)]">Experience</h2>
          <ul className="mt-6 space-y-4">
            {experience.slice(0, 2).map((job) => (
              <li key={job.company}>
                <p className="text-sm font-medium text-[var(--fg)]">{job.company}</p>
                <p className="text-sm text-[var(--muted)]">
                  {job.role} · {job.dates}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/work" className="mt-6 inline-block text-sm text-[var(--accent)]">
            View product work →
          </Link>
        </div>
        <div>
          <h2 className="font-display text-2xl text-[var(--fg)]">Education</h2>
          <ul className="mt-6 space-y-5">
            {education.map((item) => (
              <li key={item.school}>
                <p className="font-medium text-[var(--fg)]">{item.school}</p>
                <p className="text-sm text-[var(--muted)]">{item.credential}</p>
                <p className="text-xs text-[var(--muted)]">{item.dates}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Beyond the product backlog */}
      <section
        className="mt-16 border-t border-[var(--line)] pt-12"
        aria-labelledby="beyond-heading"
      >
        <h2
          id="beyond-heading"
          className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-[-0.02em] text-[var(--fg)]"
        >
          Beyond the product backlog
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          A few things that keep me curious when I&apos;m not thinking about products.
        </p>
        <ul className="mt-10 space-y-8">
          {beyondBacklog.map((item) => (
            <li key={item.title} className="border-t border-[var(--line)] pt-6 max-w-2xl">
              <p className="text-base font-medium text-[var(--fg)]">
                <span className="mr-2" aria-hidden>
                  {item.emoji}
                </span>
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
