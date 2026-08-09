"use client";

import { Reveal } from "@/components/motion";
import { site } from "@/data/content";

export function ConnectSection() {
  return (
    <section
      id="connect"
      className="relative scroll-mt-28 border-t border-[var(--line)] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">05 Connect</p>
          <h2 className="font-display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] tracking-[-0.03em] text-[var(--fg)]">
            {site.openTo}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {site.openToDescription}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-0 border-y border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          <li className="border-[var(--line)] py-8 sm:pr-8 lg:border-r lg:pr-6">
            <a href={`mailto:${site.email}`} className="group block">
              <p className="eyebrow">Email</p>
              <p className="mt-3 break-all text-sm font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                {site.email}
              </p>
            </a>
          </li>
          <li className="border-[var(--line)] py-8 sm:border-l sm:pl-8 lg:border-r lg:px-6">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <p className="eyebrow">LinkedIn</p>
              <p className="mt-3 text-sm font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                connectwithsaurabh
              </p>
            </a>
          </li>
          <li className="border-[var(--line)] py-8 sm:border-t sm:pr-8 lg:border-t-0 lg:border-r lg:px-6">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group block">
              <p className="eyebrow">Phone</p>
              <p className="mt-3 text-sm font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                {site.phone}
              </p>
            </a>
          </li>
          <li className="border-[var(--line)] py-8 sm:border-t sm:border-l sm:pl-8 lg:border-t-0 lg:border-l-0 lg:pl-6">
            <a href={site.resumePath} download className="group block">
              <p className="eyebrow">Resume</p>
              <p className="mt-3 text-sm font-medium text-[var(--accent)]">
                Download PDF →
              </p>
            </a>
          </li>
        </ul>

        <p className="mt-12 text-center text-xs text-[var(--muted)] sm:text-left">
          {site.copyright}
        </p>
      </div>
    </section>
  );
}
