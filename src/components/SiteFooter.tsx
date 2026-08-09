import Link from "next/link";
import { CopyrightNotice } from "@/components/CopyrightNotice";
import { site } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl text-[var(--ink)]">{site.name}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{site.title}</p>
          <CopyrightNotice className="mt-4" />
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <a
            href={`mailto:${site.email}`}
            className="text-[var(--muted-strong)] transition-colors hover:text-[var(--ink)]"
          >
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted-strong)] transition-colors hover:text-[var(--ink)]"
          >
            LinkedIn
          </a>
          <a
            href={site.resumePath}
            download
            className="text-[var(--muted-strong)] transition-colors hover:text-[var(--ink)]"
          >
            Resume
          </a>
          <Link
            href="/#introduction"
            className="text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
          >
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
