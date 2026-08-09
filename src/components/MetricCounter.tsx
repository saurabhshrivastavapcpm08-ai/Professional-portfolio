"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MetricCounterProps = {
  value: string;
  label: string;
  detail: string;
  className?: string;
  delay?: number;
};

function parseValue(raw: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: raw, decimals: 0 };
  }
  const num = match[2];
  return {
    prefix: match[1],
    number: Number(num),
    suffix: match[3],
    decimals: num.includes(".") ? num.split(".")[1].length : 0,
  };
}

export function MetricCounter({
  value,
  label,
  detail,
  className,
  delay = 0,
}: MetricCounterProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(
    reduce ? value : `${parsed.prefix}0${parsed.suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce || parsed.number === 0) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.number, {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(
          `${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`,
        );
      },
    });
    return () => controls.stop();
  }, [delay, inView, parsed.decimals, parsed.number, parsed.prefix, parsed.suffix, reduce, value]);

  return (
    <motion.li
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]",
        className,
      )}
      whileHover={
        reduce
          ? undefined
          : { y: -4, transition: { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] } }
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--accent-soft)] opacity-80 transition-transform duration-300 group-hover:scale-125"
      />
      <p className="font-display relative text-[clamp(2.4rem,4vw,3.2rem)] leading-none tracking-[-0.04em] text-[var(--accent)]">
        {display}
      </p>
      <p className="relative mt-4 text-sm font-semibold text-[var(--ink)]">
        {label}
      </p>
      <p className="relative mt-1 text-sm text-[var(--muted)]">{detail}</p>
    </motion.li>
  );
}
