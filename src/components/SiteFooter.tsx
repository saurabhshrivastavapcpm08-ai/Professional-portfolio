import Link from "next/link";
import { site } from "@/data/content";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[#0e0e0e]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl tracking-[-0.02em] text-[var(--fg)]">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Product Manager · AI · SaaS · Customer Experience
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">{site.location}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Connect</p>
          <ul className="space-y-2">
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-[var(--muted)] sm:px-8">
          {site.copyright}
        </p>
      </div>
    </footer>
  );
}
