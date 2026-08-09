"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/content";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--ink-deep)]"
    >
      {/* Full-bleed portrait plane */}
      <div className="absolute inset-0">
        <Image
          src="/images/portrait.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%] scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,11,20,0.92)_0%,rgba(7,11,20,0.78)_38%,rgba(7,11,20,0.35)_68%,rgba(7,11,20,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(61,184,197,0.18),transparent_50%)]" />
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute -right-16 top-1/4 h-[26rem] w-[26rem] rounded-full bg-[var(--accent)]/20 blur-[110px]"
            animate={{
              transform: [
                "translate3d(0,0,0) scale(1)",
                "translate3d(-24px,18px,0) scale(1.06)",
                "translate3d(0,0,0) scale(1)",
              ],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:justify-center">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-5 text-sm uppercase tracking-[0.22em] text-[var(--accent-soft)]"
          >
            {site.location}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, transform: "translateY(18px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6, delay: 0.04, ease: [0.23, 1, 0.32, 1] }}
            className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,6rem)] leading-[0.92] tracking-[-0.035em] text-[var(--paper)]"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, transform: "translateY(14px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 max-w-2xl text-lg text-[var(--muted-strong)] sm:text-xl"
          >
            <span className="font-medium text-[var(--paper)]">{site.title}</span>
            {" — "}
            {site.positioning}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, transform: "translateY(10px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-[transform,filter] duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
            >
              View Case Studies
            </a>
            <a
              href={site.resumePath}
              download
              className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-[var(--paper)] backdrop-blur-md transition-[transform,background] duration-150 hover:bg-white/10 active:scale-[0.97]"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-[var(--accent-soft)] transition-colors hover:text-[var(--accent)]"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
