import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about, education, experience, site } from "@/data/content";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | About",
  description:
    "Product thinking at the intersection of people, technology and business. 4+ years in Product, Bangalore.",
};

const approach = [
  "Problem first",
  "Understand the system",
  "Build the smallest useful solution",
  "Measure outcomes",
  "Scale what works",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.25rem)] tracking-[-0.03em] text-[var(--fg)]">
            Product thinking at the intersection of people, technology and business.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {about}
          </p>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-[var(--line)] lg:max-w-none">
          <Image
            src="/images/portrait.jpg"
            alt={site.name}
            fill
            sizes="400px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <section className="mt-20 border-t border-[var(--line)] pt-12">
        <h2 className="font-display text-2xl text-[var(--fg)]">My product approach</h2>
        <ol className="mt-8 space-y-0">
          {approach.map((item, i) => (
            <li
              key={item}
              className="flex gap-4 border-b border-[var(--line)] py-4 text-[var(--muted)]"
            >
              <span className="tabular-nums text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[var(--fg)]">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-10 border-t border-[var(--line)] pt-12 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-[var(--fg)]">Experience</h2>
          <p className="mt-4 text-[var(--muted)]">4+ years Product</p>
          <p className="text-[var(--muted)]">8+ years cross-functional experience</p>
          <ul className="mt-6 space-y-4">
            {experience.slice(0, 2).map((job) => (
              <li key={job.company}>
                <p className="text-sm font-medium text-[var(--fg)]">{job.company}</p>
                <p className="text-sm text-[var(--muted)]">
                  {job.role} · {job.dates}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/work" className="mt-6 inline-block text-sm text-[var(--accent)]">
            View product work →
          </Link>
        </div>
        <div>
          <h2 className="font-display text-2xl text-[var(--fg)]">Education</h2>
          <ul className="mt-6 space-y-5">
            {education.map((item) => (
              <li key={item.school}>
                <p className="font-medium text-[var(--fg)]">{item.school}</p>
                <p className="text-sm text-[var(--muted)]">{item.credential}</p>
                <p className="text-xs text-[var(--muted)]">{item.dates}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 border-t border-[var(--line)] pt-12">
        <h2 className="font-display text-2xl text-[var(--fg)]">A smaller side of me</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Outside of product work: music, live performances, stand-up comedy, and fitness —
          pursuits that keep curiosity and presence sharp.
        </p>
      </section>
    </div>
  );
}
