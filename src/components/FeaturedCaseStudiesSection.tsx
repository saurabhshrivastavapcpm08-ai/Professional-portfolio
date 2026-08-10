"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type MouseEvent } from "react";
import { portfolioCaseStudies } from "@/data/content";
import { cn } from "@/lib/utils";

function CaseCard({
  study,
  href,
  index,
}: {
  study: (typeof portfolioCaseStudies)[number];
  href: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tz = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const stz = useSpring(tz, { stiffness: 180, damping: 18 });
  const transform = useMotionTemplate`perspective(1100px) rotateX(${srx}deg) rotateY(${sry}deg) translateZ(${stz}px)`;

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 8);
    tz.set(12);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    tz.set(0);
  };

  return (
    <motion.li
      ref={ref}
      className={cn(
        "border border-[var(--line)] bg-[var(--bg)] p-7 will-change-transform sm:p-8",
        !reduce && "shadow-[0_0_0_transparent] transition-shadow duration-300 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.65)]",
      )}
      style={reduce ? undefined : { transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="eyebrow !text-[var(--accent)]">Personal product case study</p>
      <h3 className="font-display mt-4 text-2xl tracking-[-0.02em] text-[var(--fg)] sm:text-3xl">
        {study.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{study.subtitle}</p>
      <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">{study.summary}</p>
      <Link href={href} className="mt-7 inline-block text-sm font-medium text-[var(--accent)]">
        Read case study →
      </Link>
    </motion.li>
  );
}

export function FeaturedCaseStudiesSection() {
  return (
    <section className="px-5 py-20 sm:px-8 [perspective:1200px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Product exploration</p>
            <h2 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]">
              Featured case studies
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="text-sm font-medium text-[var(--accent)] hover:text-[var(--fg)]"
          >
            View all case studies →
          </Link>
        </div>
        <ul className="mt-12 grid gap-8 lg:grid-cols-2">
          {portfolioCaseStudies.map((study, i) => (
            <CaseCard
              key={study.slug}
              study={study}
              index={i}
              href={
                study.slug === "youtube-music-premium"
                  ? "/case-studies/youtube-music"
                  : "/case-studies/tara-ai"
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
