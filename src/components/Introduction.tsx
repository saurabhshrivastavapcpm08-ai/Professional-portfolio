import Image from "next/image";
import { impactStats, site } from "@/data/content";

export function Introduction() {
  return (
    <>
      <section
        id="introduction"
        className="relative min-h-[100svh] scroll-mt-24 overflow-hidden pt-[4.25rem]"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/portrait.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%] opacity-[0.18] sm:opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(246,245,242,0.97)_0%,rgba(246,245,242,0.92)_42%,rgba(246,245,242,0.55)_72%,rgba(246,245,242,0.75)_100%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-[1120px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          <div className="animate-fade-up">
            <p className="eyebrow">{site.title} · {site.location}</p>

            <h1 className="font-display mt-6 text-[clamp(2.75rem,7vw,5rem)] leading-[0.98] tracking-[-0.03em] text-[var(--ink)]">
              {site.name}
            </h1>

            <p className="font-display mt-7 max-w-xl text-[clamp(1.35rem,2.8vw,1.85rem)] leading-[1.25] text-[var(--ink-soft)]">
              I build products that turn complex problems into measurable outcomes.
            </p>

            <p className="prose-muted mt-5 max-w-lg text-base sm:text-lg">
              AI-powered B2B/B2C SaaS across CRM, customer experience, and digital
              platforms — from strategy and 0→1 through GTM and monetization.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary">
                View product work
              </a>
              <a href="#case-studies" className="btn-ghost">
                Case studies
              </a>
              <a href={site.resumePath} download className="btn-text ml-1">
                Resume →
              </a>
            </div>
          </div>

          <div className="animate-fade-in relative mx-auto w-full max-w-md lg:max-w-none [animation-delay:120ms]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--line)]">
              <Image
                src="/images/portrait.jpg"
                alt={`${site.name}, Product Manager`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="impact"
        className="scroll-mt-24 border-y border-[var(--line)] bg-[var(--paper-elevated)]"
        aria-labelledby="impact-heading"
      >
        <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
          <p className="eyebrow">Outcomes</p>
          <h2
            id="impact-heading"
            className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.5rem)] tracking-[-0.02em] text-[var(--ink)]"
          >
            Product Impact at a Glance
          </h2>

          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat) => (
              <li key={stat.label} className="border-t border-[var(--line)] pt-6">
                <p className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-[-0.03em] text-[var(--accent)]">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm font-semibold text-[var(--ink)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
