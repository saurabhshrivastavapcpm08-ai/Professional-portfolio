import Link from "next/link";
import { site } from "@/data/content";

type DemoShellProps = {
  title: string;
  subtitle: string;
  demoSrc: string;
};

export function DemoShell({ title, subtitle, demoSrc }: DemoShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--sand)]">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--surface)] px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <Link
            href="/case-studies"
            className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]"
          >
            ← Back to case studies
          </Link>
          <h1 className="font-display mt-1 truncate text-lg font-bold text-[var(--ink)] sm:text-xl">
            {title}
          </h1>
          <p className="text-xs text-[var(--muted)]">{subtitle}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href={demoSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--ink)]"
          >
            Full screen
          </a>
        </div>
      </header>

      <iframe
        title={title}
        src={demoSrc}
        className="min-h-0 w-full flex-1 border-0 bg-[var(--sand)]"
        style={{ height: "calc(100vh - 7.5rem)" }}
        allow="clipboard-read; clipboard-write"
      />

      <footer className="shrink-0 border-t border-[var(--line)] px-4 py-2 text-center text-[11px] text-[var(--muted)]">
        {site.copyright} · Case study materials are proprietary to the author.
      </footer>
    </div>
  );
}
