"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type MouseEvent } from "react";
import { Reveal } from "@/components/motion";
import { impactStats } from "@/data/content";
import { cn } from "@/lib/utils";

function StatCard({
  value,
  label,
  detail,
  index,
}: {
  value: string;
  label: string;
  detail: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${srx}deg) rotateY(${sry}deg) translateZ(0)`;

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set((0.5 - py) * 8);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.li
      ref={ref}
      className={cn(
        "border-t border-[var(--line)] pt-6 will-change-transform",
        !reduce && "[transform-style:preserve-3d]",
      )}
      style={reduce ? undefined : { transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: 28, rotateX: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-display text-[clamp(2.2rem,4vw,3rem)] leading-none tracking-[-0.03em] text-[var(--accent)]">
        {value}
      </p>
      <p className="mt-4 text-sm font-medium text-[var(--fg)]">{label}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{detail}</p>
    </motion.li>
  );
}

export function ImpactStatsSection() {
  return (
    <section className="border-y border-[var(--line)] px-5 py-20 sm:px-8 [perspective:1200px]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">Selected impact</p>
          <h2 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]">
            Product Impact at a Glance
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              detail={stat.detail}
              index={i}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
