"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navItems, site } from "@/data/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        scrolled || open
          ? "border-b border-white/10 bg-[rgba(10,16,28,0.88)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="font-[family-name:var(--font-display)] text-lg tracking-[-0.02em] text-[var(--paper)] transition-opacity duration-150 group-active:opacity-80">
            {site.name}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-soft)]">
            Product Portfolio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--muted-strong)] transition-colors duration-150 hover:text-[var(--paper)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resumePath}
            download
            className="rounded-md bg-[var(--accent)] px-3.5 py-2 text-sm font-medium text-[var(--ink)] transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-[var(--paper)] lg:hidden active:scale-[0.97]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-full bg-current transition-opacity duration-150 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-0.5 w-full bg-current transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={reduce ? false : { opacity: 0, transform: "translateY(-6px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduce ? undefined : { opacity: 0, transform: "translateY(-6px)" }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col bg-[rgba(7,11,20,0.97)] px-5 py-8 lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-[var(--paper)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={site.resumePath}
                download
                className="mt-4 inline-flex w-fit rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--ink)]"
                onClick={() => setOpen(false)}
              >
                Download Resume
              </a>
              <p className="pt-8 text-xs text-[var(--muted)]">{site.copyright}</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
