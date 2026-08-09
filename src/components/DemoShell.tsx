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
    <div className="flex min-h-screen flex-col bg-[var(--paper)]">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--paper-elevated)] px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <Link
            href="/#case-studies"
            className="text-sm text-[var(--muted-strong)] transition-colors hover:text-[var(--accent)]"
          >
            ← Back to portfolio
          </Link>
          <h1 className="font-display mt-1 truncate text-lg text-[var(--ink)] sm:text-xl">
            {title}
          </h1>
          <p className="text-xs text-[var(--muted)]">{subtitle}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a href={demoSrc} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !px-3 text-xs">
            Full screen
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !px-3 text-xs">
            GitHub
          </a>
        </div>
      </header>

      <iframe
        title={title}
        src={demoSrc}
        className="min-h-0 w-full flex-1 border-0 bg-[var(--paper)]"
        style={{ height: "calc(100vh - 7.5rem)" }}
        allow="clipboard-read; clipboard-write"
      />

      <footer className="shrink-0 border-t border-[var(--line)] px-4 py-2 text-center text-[11px] text-[var(--muted)]">
        {site.copyright} · Case study materials are proprietary to the author.
      </footer>
    </div>
  );
}
