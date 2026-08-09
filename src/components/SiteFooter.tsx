import Link from "next/link";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { site } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[var(--ink-deep)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl text-[var(--paper)]">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-[var(--muted-strong)]">{site.title}</p>
          <CopyrightNotice className="mt-3" />
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm">
          <a
            href={`mailto:${site.email}`}
            className="text-[var(--muted-strong)] transition-colors hover:text-[var(--paper)]"
          >
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted-strong)] transition-colors hover:text-[var(--paper)]"
          >
            LinkedIn
          </a>
          <a
            href={site.resumePath}
            download
            className="text-[var(--muted-strong)] transition-colors hover:text-[var(--paper)]"
          >
            Resume
          </a>
          <Link
            href="/#top"
            className="text-[var(--accent-soft)] transition-colors hover:text-[var(--accent)]"
          >
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
