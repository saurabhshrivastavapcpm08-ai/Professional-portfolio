import type { Metadata } from "next";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | Contact",
  description:
    "Exploring Senior Product Manager opportunities across AI, SaaS, customer experience and digital platforms.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8 sm:py-32">
      <p className="eyebrow">Contact</p>
      <h1 className="font-display mt-4 text-[clamp(2.4rem,6vw,3.75rem)] tracking-[-0.03em] text-[var(--fg)]">
        Let&apos;s build something meaningful.
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        I&apos;m exploring Senior Product Manager opportunities where I can build and scale
        products across AI, SaaS, customer experience and digital platforms.
      </p>

      <ul className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        <li className="py-6">
          <p className="eyebrow">Email</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 block break-all text-lg text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
          >
            {site.email}
          </a>
        </li>
        <li className="py-6">
          <p className="eyebrow">LinkedIn</p>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-lg text-[var(--fg)] hover:text-[var(--accent)]"
          >
            linkedin.com/in/connectwithsaurabh
          </a>
        </li>
        <li className="py-6">
          <p className="eyebrow">Phone</p>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="mt-2 block text-lg text-[var(--fg)] hover:text-[var(--accent)]"
          >
            {site.phone}
          </a>
        </li>
        <li className="py-6">
          <p className="eyebrow">Resume</p>
          <a
            href={site.resumePath}
            download
            className="mt-2 inline-block text-lg text-[var(--accent)]"
          >
            Download PDF →
          </a>
        </li>
      </ul>
    </div>
  );
}
