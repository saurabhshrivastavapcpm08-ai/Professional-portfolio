"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/content";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#cases", id: "cases", label: "Cases" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#timeline", id: "timeline", label: "Timeline" },
  { href: "/#connect", id: "connect", label: "Connect" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("work");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", "work", "cases", "skills", "timeline", "connect"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id === "hero" ? "work" : id);
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-[#121212]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/#hero"
          onClick={() => setOpen(false)}
          className="font-display text-lg tracking-[-0.02em] text-[var(--fg)] transition-opacity hover:opacity-80 sm:text-xl"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "group relative text-sm tracking-wide transition-colors duration-200",
                active === item.id
                  ? "text-[var(--fg)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px origin-left bg-[var(--accent)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active === item.id
                    ? "w-full scale-x-100"
                    : "w-full scale-x-0 group-hover:scale-x-100",
                )}
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-[var(--fg)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-3.5 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-200",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[6px] h-px w-full bg-current transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[12px] h-px w-full bg-current transition-transform duration-200",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10 bg-[#121212] px-5 py-8 md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-display text-3xl text-[var(--fg)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
