"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/content";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 border-t border-white/10 bg-[var(--ink)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Connect"
          title={site.openTo}
          description="Email, LinkedIn, or download my resume — I respond to thoughtful recruiter and hiring-manager outreach."
        />

        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={`mailto:${site.email}`}
            className="rounded-2xl border border-white/10 bg-[var(--ink-deep)]/50 p-6 transition-colors hover:border-[var(--accent)]/40"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              Email
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--paper)] break-all">
              {site.email}
            </p>
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-[var(--ink-deep)]/50 p-6 transition-colors hover:border-[var(--accent)]/40"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              LinkedIn
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--paper)]">
              connectwithsaurabh
            </p>
          </a>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="rounded-2xl border border-white/10 bg-[var(--ink-deep)]/50 p-6 transition-colors hover:border-[var(--accent)]/40"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              Phone
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--paper)]">
              {site.phone}
            </p>
          </a>
          <a
            href={site.resumePath}
            download
            className="rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/10 p-6 transition-colors hover:bg-[var(--accent)]/20"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-soft)]">
              Resume
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--paper)]">
              Download PDF
            </p>
          </a>
        </Reveal>

        <p className="mt-12 text-center text-xs text-[var(--muted)]">
          {site.copyright}
        </p>
      </div>
    </section>
  );
}
