"use client";

import { Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#0e0e0e] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Stagger>
          <StaggerItem>
            <p className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-[var(--fg)]">
              Let&apos;s build something exceptional together.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-12 flex flex-wrap gap-8 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              Email
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              LinkedIn
            </a>
            <a
              href={site.resumePath}
              download
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              Resume
            </a>
          </StaggerItem>

          <StaggerItem className="mt-16">
            <p className="text-xs text-[var(--muted)]">{site.copyright}</p>
          </StaggerItem>
        </Stagger>
      </div>
    </footer>
  );
}
