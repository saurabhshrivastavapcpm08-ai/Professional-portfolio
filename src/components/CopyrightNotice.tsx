import { site } from "@/data/content";

export function CopyrightNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs tracking-wide text-[var(--muted)] ${className}`}>
      {site.copyright}
    </p>
  );
}
