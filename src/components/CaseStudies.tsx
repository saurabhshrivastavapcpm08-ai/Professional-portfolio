"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  portfolioCaseStudies,
  workCaseStudies,
} from "@/data/content";

export function CaseStudies() {
  const [openId, setOpenId] = useState<string | null>(workCaseStudies[0]?.id ?? null);
  const reduce = useReducedMotion();

  return (
    <section
      id="case-studies"
      className="relative scroll-mt-24 border-y border-white/8 bg-[var(--ink)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Case studies
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl">
            Context → challenge → action → impact
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {workCaseStudies.map((study) => {
            const open = openId === study.id;
            return (
              <div
                key={study.id}
                className="border-b border-white/10"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : study.id)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left transition-opacity duration-150 active:opacity-80"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                      {study.company}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--paper)] sm:text-2xl">
                      {study.title}
                    </h3>
                  </div>
                  <span
                    className={`mt-2 text-[var(--accent-soft)] transition-transform duration-200 ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={
                        reduce
                          ? false
                          : { opacity: 0, height: 0 }
                      }
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 lg:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                            Context
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
                            {study.context}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                            Challenge
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
                            {study.challenge}
                          </p>
                          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                            What I did
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
                            {study.whatIDid}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                            Impact
                          </p>
                          <ul className="mt-3 space-y-2">
                            {study.impact.map((item) => (
                              <li
                                key={item}
                                className="font-[family-name:var(--font-display)] text-lg text-[var(--accent)]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-16" delay={0.05}>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Portfolio deep-dives
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[var(--paper)] sm:text-3xl">
            Published case study builds
          </h3>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Interactive product packages you can open — each with copyright retained and
            source linked on GitHub.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-8 lg:grid-cols-2">
          {portfolioCaseStudies.map((study) => (
            <StaggerItem key={study.slug}>
              <article className="flex h-full flex-col border-t border-white/15 pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  {study.subtitle}
                </p>
                <h4 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
                  {study.title}
                </h4>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted-strong)]">
                  {study.summary}
                </p>
                <ul className="mt-5 space-y-2">
                  {study.highlights.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 text-sm text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--warm)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--muted-strong)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={study.href}
                    className="inline-flex rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] transition-[transform,filter] duration-150 hover:brightness-110 active:scale-[0.97]"
                  >
                    Open case study
                  </Link>
                  <a
                    href={study.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md border border-white/20 px-4 py-2.5 text-sm text-[var(--paper)] transition-colors hover:border-white/40"
                  >
                    GitHub
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
