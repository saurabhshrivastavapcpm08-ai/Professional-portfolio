"use client";

import Image from "next/image";
import { FadeUp, Reveal } from "@/components/motion";
import { impactStats, site } from "@/data/content";

export function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-[80vh] scroll-mt-24 items-center px-5 pt-[var(--header-h)] sm:px-8"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
          <div>
            <FadeUp as="p" delay={0} className="text-base text-[var(--muted)] sm:text-lg">
              Hi, I&apos;m Saurabh Shrivastava.
            </FadeUp>

            <FadeUp
              as="h1"
              delay={0.2}
              className="font-display mt-4 text-[clamp(3rem,9vw,5.75rem)] leading-[0.95] tracking-[-0.03em] text-[var(--fg)]"
            >
              Product Manager.
            </FadeUp>

            <FadeUp
              as="p"
              delay={0.4}
              className="mt-8 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-xl"
            >
              Building intuitive, high-impact products from concept to launch.
              Based in Bangalore, shaping the future of digital experiences.
            </FadeUp>

            <FadeUp delay={0.55} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
              >
                View work
              </a>
              <a
                href={site.resumePath}
                download
                className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Resume
              </a>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--bg-elevated)]">
              <Image
                src="/images/portrait.jpg"
                alt={`${site.name}, Product Manager`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-4 text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
              {site.location} · {site.title}
            </p>
          </FadeUp>
        </div>
      </section>

      <section
        id="impact"
        className="scroll-mt-28 border-y border-[var(--line)] px-5 py-20 sm:px-8 sm:py-24"
        aria-labelledby="impact-heading"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Outcomes</p>
            <h2
              id="impact-heading"
              className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em] text-[var(--fg)]"
            >
              Product Impact at a Glance
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.04}>
                <li className="border-t border-[var(--line)] pt-6">
                  <p className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-[-0.03em] text-[var(--accent)]">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[var(--fg)]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{stat.detail}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
