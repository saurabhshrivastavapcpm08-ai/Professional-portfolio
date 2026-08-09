"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[rgba(246,245,242,0.92)] shadow-[0_1px_0_rgba(26,26,24,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1120px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-[-0.02em] text-[var(--ink)]"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.8125rem] font-medium text-[var(--muted-strong)] transition-colors hover:text-[var(--ink)]"
            >
              {item.label}
            </a>
          ))}
          <a href={site.resumePath} download className="btn-primary !py-2 !px-3.5 text-[0.8125rem]">
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-[var(--ink)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-px w-full bg-current transition-opacity duration-150 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-px w-full bg-current transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="animate-fade-in border-t border-[var(--line)] bg-[var(--paper)] px-5 py-8 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-2xl text-[var(--ink)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.resumePath}
              download
              className="btn-primary mt-2 w-fit"
              onClick={() => setOpen(false)}
            >
              Download Resume
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
