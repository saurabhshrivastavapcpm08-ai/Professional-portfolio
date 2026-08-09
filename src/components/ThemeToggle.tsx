"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
    >
      <motion.span
        key={theme}
        initial={reduce ? false : { rotate: -40, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-sm"
        aria-hidden
      >
        {isDark ? "◐" : "☀"}
      </motion.span>
    </button>
  );
}
