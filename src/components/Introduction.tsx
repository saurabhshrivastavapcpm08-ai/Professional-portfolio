"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Blob, Squiggle, StarBurst } from "@/components/Decor";
import { MagneticButton } from "@/components/MagneticButton";
import { MetricCounter } from "@/components/MetricCounter";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { impactStats, site } from "@/data/content";

export function Introduction() {
  const reduce = useReducedMotion();

  return (
    <>
      <section
        id="introduction"
        className="relative overflow-hidden scroll-mt-24 pt-[4.25rem]"
      >
        <div className="noise" aria-hidden />
        <Blob className="pointer-events-none absolute -left-24 top-24 h-72 w-72 text-[var(--accent)] opacity-[0.12]" />
        <StarBurst className="pointer-events-none absolute right-[12%] top-28 hidden h-10 w-10 text-[var(--accent)] sm:block" />

        <div className="relative mx-auto grid max-w-[1140px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-24">
          <div>
            <motion.p
              className="eyebrow"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {site.title} · {site.location}
            </motion.p>

            <motion.h1
              className="font-display mt-5 text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-[var(--ink)]"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {site.name.split(" ")[0]}
              <br />
              <span className="relative inline-block">
                {site.name.split(" ").slice(1).join(" ")}
                <Squiggle className="absolute -bottom-1 left-0 w-full" width={180} />
              </span>
            </motion.h1>

            <motion.p
              className="font-display mt-8 max-w-xl text-[clamp(1.35rem,3vw,1.85rem)] leading-[1.25] tracking-[-0.02em] text-[var(--ink-soft)]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
            >
              I ship products that turn messy problems into{" "}
              <span className="text-[var(--accent)]">measurable outcomes</span>.
            </motion.p>

            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.18 }}
            >
              AI-powered B2B/B2C SaaS across CRM, CX, and digital platforms — from
              strategy and 0→1 through GTM and monetization.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 }}
            >
              <MagneticButton
                href="#work"
                className="bg-[var(--accent)] text-white hover:bg-[var(--accent-deep)]"
              >
                See the work
              </MagneticButton>
              <MagneticButton
                href="#case-studies"
                className="border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Case studies
              </MagneticButton>
              <MagneticButton
                href={site.resumePath}
                download
                className="text-[var(--accent)] hover:text-[var(--accent-deep)]"
              >
                Resume →
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={reduce ? false : { opacity: 0, scale: 0.96, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -right-3 -top-3 rotate-6 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white shadow-[var(--shadow)] sm:-right-6">
              Open to Senior PM roles
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[3px] border-[var(--ink)] bg-[var(--sand-2)] shadow-[var(--shadow)]">
              <Image
                src="/images/portrait.jpg"
                alt={`${site.name}, Product Manager`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -left-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow)] sm:-left-6">
              <p className="text-xs font-bold text-[var(--accent)]">4+ yrs product</p>
              <p className="text-xs text-[var(--muted)]">8+ yrs growth & ops</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="impact"
        className="relative scroll-mt-24 border-y border-[var(--line)] bg-[var(--sand-2)] py-16 sm:py-20"
        aria-labelledby="impact-heading"
      >
        <div className="noise" aria-hidden />
        <div className="relative mx-auto max-w-[1140px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Outcomes</p>
            <h2
              id="impact-heading"
              className="font-display mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[var(--ink)]"
            >
              Product Impact at a Glance
            </h2>
            <Squiggle className="mt-3" />
          </Reveal>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat, i) => (
              <StaggerItem key={stat.label}>
                <MetricCounter
                  value={stat.value}
                  label={stat.label}
                  detail={stat.detail}
                  delay={i * 0.05}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
