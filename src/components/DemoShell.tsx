import Link from "next/link";
import { site } from "@/data/content";

type DemoShellProps = {
  title: string;
  subtitle: string;
  demoSrc: string;
  github: string;
};

export function DemoShell({ title, subtitle, demoSrc, github }: DemoShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--ink-deep)]">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[var(--ink)] px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <Link
            href="/#case-studies"
            className="text-sm text-[var(--muted-strong)] transition-colors hover:text-[var(--accent-soft)]"
          >
            ← Back to portfolio
          </Link>
          <h1 className="mt-1 truncate font-[family-name:var(--font-display)] text-lg text-[var(--paper)] sm:text-xl">
            {title}
          </h1>
          <p className="text-xs text-[var(--muted)]">{subtitle}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href={demoSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/20 px-3 py-2 text-xs text-[var(--paper)] hover:border-white/40"
          >
            Open full screen
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/20 px-3 py-2 text-xs text-[var(--paper)] hover:border-white/40"
          >
            GitHub
          </a>
        </div>
      </header>

      <iframe
        title={title}
        src={demoSrc}
        className="min-h-0 flex-1 w-full border-0 bg-[var(--ink-deep)]"
        style={{ height: "calc(100vh - 7.5rem)" }}
        allow="clipboard-read; clipboard-write"
      />

      <footer className="shrink-0 border-t border-white/10 px-4 py-2 text-center text-[11px] text-[var(--muted)]">
        {site.copyright} · Case study materials are proprietary to the author.
      </footer>
    </div>
  );
}
