"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { Blob, StarBurst } from "@/components/Decor";
import { site } from "@/data/content";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <Blob className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 text-[var(--accent)] opacity-[0.1]" />
      <StarBurst className="pointer-events-none absolute left-[8%] top-16 h-8 w-8 text-[var(--accent)] opacity-80" />

      <div className="relative mx-auto max-w-[1140px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Connect"
            title={site.openTo}
            description={site.openToDescription}
          />
        </Reveal>

        <Reveal className="mt-12" delay={0.06}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`mailto:${site.email}`}
              data-cursor="hover"
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <p className="eyebrow">Email</p>
              <p className="mt-3 break-all text-sm font-semibold text-[var(--ink)]">
                {site.email}
              </p>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <p className="eyebrow">LinkedIn</p>
              <p className="mt-3 text-sm font-semibold text-[var(--ink)]">
                connectwithsaurabh
              </p>
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              data-cursor="hover"
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <p className="eyebrow">Phone</p>
              <p className="mt-3 text-sm font-semibold text-[var(--ink)]">{site.phone}</p>
            </a>
            <div className="rounded-[1.5rem] border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
              <p className="eyebrow">Resume</p>
              <MagneticButton
                href={site.resumePath}
                download
                className="mt-3 bg-[var(--accent)] text-white hover:bg-[var(--accent-deep)]"
              >
                Download PDF
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        <p className="mt-14 text-center text-xs text-[var(--muted)]">
          {site.copyright}
        </p>
      </div>
    </section>
  );
}
