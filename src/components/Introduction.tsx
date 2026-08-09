"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import { about, impactStats, site } from "@/data/content";

export function Introduction() {
  const reduce = useReducedMotion();

  return (
    <section
      id="introduction"
      className="relative scroll-mt-24 overflow-hidden border-b border-white/10 bg-[var(--ink-deep)] pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(61,184,197,0.15),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, transform: "translateY(10px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="text-sm uppercase tracking-[0.22em] text-[var(--accent-soft)]"
            >
              {site.location}
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, transform: "translateY(14px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--paper)]"
            >
              {site.name}
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-4 text-xl font-medium text-[var(--paper)] sm:text-2xl"
            >
              {site.title}
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-3 text-base text-[var(--accent-soft)] sm:text-lg"
            >
              {site.positioning}
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted-strong)]"
            >
              {about}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.45, delay: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#work"
                className="inline-flex rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-[transform,filter] duration-150 hover:brightness-110 active:scale-[0.97]"
              >
                See my work
              </a>
              <a
                href="#case-studies"
                className="inline-flex rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-[var(--paper)] backdrop-blur-sm transition-colors hover:bg-white/10 active:scale-[0.97]"
              >
                Case studies
              </a>
              <a
                href={site.resumePath}
                download
                className="inline-flex rounded-md px-5 py-3 text-sm font-medium text-[var(--accent-soft)] hover:text-[var(--accent)]"
              >
                Download resume
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <Image
                src="/images/portrait.jpg"
                alt={`${site.name}, Strategic Product Manager`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink-deep)] via-[var(--ink-deep)]/60 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                  Introduction
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{site.tagline}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <SectionHeading
            index="→"
            eyebrow="At a glance"
            title="Impact that recruiters can scan in seconds"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-150 hover:border-[var(--accent)]/35 hover:bg-white/[0.05]"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--accent)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--paper)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">{stat.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
