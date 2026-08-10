import type { Metadata } from "next";
import Link from "next/link";
import {
  about,
  certifications,
  education,
  experience,
  skillGroups,
  site,
} from "@/data/content";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | Resume",
  description:
    "Product Manager building AI-powered B2B/B2C SaaS products. Download the PDF resume.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8 sm:py-32">
      <p className="eyebrow">Resume</p>
      <h1 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.25rem)] tracking-[-0.03em] text-[var(--fg)]">
        Product Manager building AI-powered B2B/B2C SaaS products.
      </h1>
      <a
        href={site.resumePath}
        download
        className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)]"
      >
        Download Resume PDF →
      </a>

      <section className="mt-16 border-t border-[var(--line)] pt-10">
        <h2 className="font-display text-2xl text-[var(--fg)]">Summary</h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">{about}</p>
      </section>

      <section className="mt-12 border-t border-[var(--line)] pt-10">
        <h2 className="font-display text-2xl text-[var(--fg)]">Experience</h2>
        <ul className="mt-8 space-y-10">
          {experience.map((job) => (
            <li key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium text-[var(--fg)]">{job.company}</h3>
                <p className="text-sm text-[var(--accent)]">{job.dates}</p>
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {job.role} · {job.location}
              </p>
              <ul className="mt-4 space-y-2">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-4 text-sm leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-[var(--line)] pt-10">
        <h2 className="font-display text-2xl text-[var(--fg)]">Skills</h2>
        <div className="mt-6 space-y-6">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <p className="text-sm font-medium text-[var(--accent)]">{g.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {g.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-[var(--fg)]">Education</h2>
          <ul className="mt-5 space-y-4">
            {education.map((item) => (
              <li key={item.school}>
                <p className="text-[var(--fg)]">{item.school}</p>
                <p className="text-sm text-[var(--muted)]">{item.credential}</p>
                <p className="text-xs text-[var(--muted)]">{item.dates}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-[var(--fg)]">Certifications</h2>
          <ul className="mt-5 space-y-2">
            {certifications.map((c) => (
              <li key={c} className="text-sm text-[var(--muted)]">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-[var(--line)] pt-8">
        <a
          href={site.resumePath}
          download
          className="text-sm font-medium text-[var(--accent)]"
        >
          Download Resume PDF →
        </a>
        <Link href="/contact" className="text-sm text-[var(--muted)] hover:text-[var(--fg)]">
          Contact →
        </Link>
      </div>
    </div>
  );
}
