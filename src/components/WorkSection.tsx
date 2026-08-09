"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from "motion/react";
import { useRef, type MouseEvent } from "react";
import { companies } from "@/data/work";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

function MagneticDetails({ label = "Details →" }: { label?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.25 });

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block text-sm font-medium text-[var(--accent)]"
    >
      {label}
    </motion.span>
  );
}

function HighlightCopy({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <p
      ref={ref}
      className={cn(
        "highlight-sage mt-6 max-w-3xl text-base leading-relaxed text-[var(--fg)] sm:text-lg",
        inView && "is-active",
      )}
    >
      {children}
    </p>
  );
}

function InitiativeRow({
  index,
  title,
  description,
  why,
  what,
  how,
  impact,
}: {
  index: number;
  title: string;
  description: string;
  why: string;
  what: string;
  how: string;
  impact: string;
}) {
  return (
    <details className="group border-b border-[var(--line)] last:border-b-0">
      <summary className="list-none cursor-pointer px-1 py-7 transition-colors duration-200 hover:bg-[#1a1a1a] group-open:bg-[#1a1a1a] sm:grid sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="text-sm tabular-nums text-[var(--muted)]">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <h4 className="font-display text-xl tracking-[-0.02em] text-[var(--fg)] sm:text-2xl">
            {title}
          </h4>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {description}
          </p>
        </div>
        <span className="mt-4 sm:mt-0">
          <span className="group-open:hidden">
            <MagneticDetails />
          </span>
          <span className="hidden text-sm font-medium text-[var(--muted)] group-open:inline">
            Close
          </span>
        </span>
      </summary>
      <div className="space-y-5 border-t border-[var(--line)] bg-[#1a1a1a] px-5 pb-8 pt-6 sm:pl-[calc(4rem+2rem)]">
        {(
          [
            ["Why", why],
            ["What", what],
            ["How", how],
            ["Impact", impact],
          ] as const
        ).map(([label, body]) => (
          <div key={label}>
            <p className="eyebrow !text-[var(--accent)]">{label}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {body}
            </p>
          </div>
        ))}
      </div>
    </details>
  );
}

export function WorkSection() {
  const solera = companies.find((c) => c.id === "solera")!;
  const tekion = companies.find((c) => c.id === "tekion")!;

  return (
    <section id="work" className="relative scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Part A */}
        <Reveal>
          <p className="eyebrow">01 Product ownership</p>
          <h2 className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
            Two chapters of product leadership
          </h2>
          <HighlightCopy>
            Tekion sharpened execution, customer experience, and ML. Solera
            expanded platform strategy, AI engagement, GTM, and monetization.
          </HighlightCopy>
        </Reveal>

        {/* Part B */}
        <div className="mt-16 grid gap-0 border-y border-[var(--line)] md:grid-cols-2">
          {[solera, tekion].map((chapter) => (
            <Reveal key={chapter.id} className="border-[var(--line)] md:odd:border-r">
              <a
                href={`#work-${chapter.id}`}
                className="group block px-0 py-10 transition-colors hover:bg-[#1a1a1a] md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <p className="eyebrow !tracking-[0.2em]">
                  {chapter.dates.toUpperCase().replace("–", "-")}
                </p>
                <h3 className="font-display mt-4 text-3xl tracking-[-0.02em] text-[var(--fg)] sm:text-4xl">
                  {chapter.name}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                  {chapter.headline}
                </p>
                <p className="mt-8">
                  <MagneticDetails label="View initiatives →" />
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Part C — Solera deep dive */}
        <div id="work-solera" className="scroll-mt-28 mt-24">
          <Reveal>
            <p className="eyebrow">Solera Holdings</p>
            <h3 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] text-[var(--fg)]">
              {solera.role}
            </h3>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {solera.product}
              {solera.scale ? ` · ${solera.scale}` : ""} · {solera.dates}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--fg)] sm:text-lg">
              {solera.story}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {solera.focusAreas.map((area) => (
                <li key={area} className="text-sm text-[var(--accent)]">
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 border-y border-[var(--line)]">
            {solera.initiatives.map((item, i) => (
              <InitiativeRow
                key={item.id}
                index={i + 1}
                title={item.title}
                description={item.impact}
                why={item.why}
                what={item.what}
                how={item.how}
                impact={item.impact}
              />
            ))}
          </div>
        </div>

        {/* Tekion deep dive */}
        <div id="work-tekion" className="scroll-mt-28 mt-28">
          <Reveal>
            <p className="eyebrow">Tekion Corp</p>
            <h3 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] text-[var(--fg)]">
              {tekion.role}
            </h3>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {tekion.product} · {tekion.dates}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--fg)] sm:text-lg">
              {tekion.story}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {tekion.focusAreas.map((area) => (
                <li key={area} className="text-sm text-[var(--accent)]">
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 border-y border-[var(--line)]">
            {tekion.initiatives.map((item, i) => (
              <InitiativeRow
                key={item.id}
                index={i + 1}
                title={item.title}
                description={item.impact}
                why={item.why}
                what={item.what}
                how={item.how}
                impact={item.impact}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
