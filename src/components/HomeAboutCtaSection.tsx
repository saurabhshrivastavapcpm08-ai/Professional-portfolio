"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/content";

/** Flat CTA blocks — fade/slide only, no 3D. */
export function HomeAboutCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-[var(--line)] px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">About</p>
          <h2 className="font-display mt-3 text-3xl tracking-[-0.02em] text-[var(--fg)]">
            Product Manager focused on turning complex problems into scalable products.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">
            4+ years Product · 8+ years cross-functional. I build and scale B2B, B2C and
            B2B2C SaaS across AI/ML, customer experience, automation and monetization.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-medium text-[var(--accent)]"
          >
            More about me →
          </Link>
        </motion.div>
        <motion.div
          className="border border-[var(--line)] p-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Opportunities</p>
          <h2 className="font-display mt-3 text-2xl tracking-[-0.02em] text-[var(--fg)]">
            {site.openTo}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Exploring roles where I can build and scale products across AI, SaaS, customer
            experience and digital platforms.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)]"
          >
            Get in touch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
