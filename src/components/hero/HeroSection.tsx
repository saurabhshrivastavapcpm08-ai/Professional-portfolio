"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { site } from "@/data/content";

const HeroCanvas = dynamic(
  () =>
    import("@/components/hero/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => <div className="absolute inset-0" aria-hidden /> },
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -36]);
  const visualScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 0.96],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <motion.div style={reduce ? undefined : { y: textY }}>
          <p className="eyebrow">Product Manager · AI · B2B SaaS</p>
          <h1 className="font-display mt-5 max-w-xl text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
            I build products that turn complex problems into measurable outcomes.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            With 4+ years in Product, I build and scale B2B/B2C SaaS products across AI,
            CRM, customer experience, automation and digital platforms.
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">{site.location}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
            >
              Explore my work →
            </Link>
            <a
              href={site.resumePath}
              download
              className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
            >
              Download resume →
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={reduce ? undefined : { y: visualY, scale: visualScale }}
        >
          <div className="relative aspect-[4/5]">
            <div className="absolute inset-0 overflow-hidden border border-[var(--line)] bg-[var(--bg-elevated)]">
              <Image
                src="/images/portrait.jpg"
                alt={`${site.name}, Product Manager`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
                draggable={false}
              />
            </div>
            {/* Single hero WebGL layer — transparent, decorative, mouse-reactive */}
            <HeroCanvas className="absolute -inset-[14%] z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
