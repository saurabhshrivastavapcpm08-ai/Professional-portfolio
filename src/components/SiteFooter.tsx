import Link from "next/link";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { site } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--sand)]">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            {site.name}
            <span className="text-[var(--accent)]">.</span>
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">{site.title}</p>
          <CopyrightNotice className="mt-4" />
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
          <a
            href={`mailto:${site.email}`}
            className="text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
          >
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
          >
            LinkedIn
          </a>
          <a
            href={site.resumePath}
            download
            className="text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
          >
            Resume
          </a>
          <Link
            href="/#introduction"
            className="text-[var(--accent)] hover:text-[var(--accent-deep)]"
          >
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
