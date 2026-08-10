"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion";
import { homeProductApproach } from "@/lib/work-routes";

/**
 * Pseudo-3D approach timeline: SVG path progress follows scroll.
 * No WebGL — lightweight, crisp text.
 */
export function ApproachTimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  const mobileProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative px-5 py-20 sm:px-8"
      aria-labelledby="approach-home"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">Product approach</p>
          <h2
            id="approach-home"
            className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]"
          >
            How I Approach Product
          </h2>
        </Reveal>

        <div className="relative mt-12 hidden lg:block" aria-hidden>
          <svg
            className="pointer-events-none absolute left-0 right-0 top-3 h-8 w-full"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
          >
            <path
              d="M 20 16 C 120 16, 180 4, 280 16 S 440 28, 520 16 S 700 4, 800 16 S 920 28, 980 16"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <motion.path
              d="M 20 16 C 120 16, 180 4, 280 16 S 440 28, 520 16 S 700 4, 800 16 S 920 28, 980 16"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              style={{ pathLength }}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          className="pointer-events-none absolute bottom-20 left-8 top-40 w-px overflow-hidden bg-[var(--line)] lg:hidden"
          aria-hidden
        >
          <motion.div
            className="w-full origin-top bg-[var(--accent)]"
            style={{ height: reduce ? "100%" : mobileProgress }}
          />
        </div>

        <ol className="mt-10 grid gap-0 border-t border-[var(--line)] sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:border-t-0">
          {homeProductApproach.map((step, i) => (
            <motion.li
              key={step.number}
              className={`relative border-[var(--line)] py-8 pr-5 ${
                i < homeProductApproach.length - 1 ? "lg:border-r lg:pr-6" : ""
              } ${i % 2 === 0 ? "sm:border-r sm:pr-6 lg:border-r" : "sm:pl-6 sm:pr-0 lg:pl-0"} border-b last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className="mb-4 hidden h-2.5 w-2.5 rounded-full bg-[var(--accent)] lg:block"
                aria-hidden
              />
              <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--accent)]">
                {step.number} — {step.title}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
