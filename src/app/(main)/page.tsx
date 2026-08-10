import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { impactStats, portfolioCaseStudies, site } from "@/data/content";
import { getFeaturedProjects, productFocus } from "@/lib/work-routes";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | Product Manager",
  description:
    "Product Manager with 4+ years of experience building AI-powered B2B/B2C SaaS products across CRM, customer experience, automation and digital platforms.",
};

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section className="px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">Product Manager · AI · B2B SaaS</p>
            <h1 className="font-display mt-5 max-w-xl text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
              I build products that turn complex problems into measurable outcomes.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              With 4+ years in Product, I build and scale B2B/B2C SaaS products across AI,
              CRM, customer experience, automation and digital platforms.
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">{site.location}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
              >
                Explore my work →
              </Link>
              <a
                href={site.resumePath}
                download
                className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
              >
                Download resume →
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--bg-elevated)]">
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

      {/* Impact */}
      <section className="border-y border-[var(--line)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Selected impact</p>
            <h2 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]">
              Product Impact at a Glance
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat) => (
              <li key={stat.label} className="border-t border-[var(--line)] pt-6">
                <p className="font-display text-[clamp(2.2rem,4vw,3rem)] leading-none tracking-[-0.03em] text-[var(--accent)]">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--fg)]">{stat.label}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product focus */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Product focus</p>
            <h2 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]">
              Where I build
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {productFocus.map((item) => (
              <li key={item.title} className="border-t border-[var(--line)] pt-5">
                <h3 className="text-base font-medium text-[var(--fg)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured work */}
      <section className="border-y border-[var(--line)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured work</p>
              <h2 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]">
                Selected product initiatives
              </h2>
            </div>
            <Link
              href="/work"
              className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
            >
              View all work →
            </Link>
          </div>
          <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {featured.map((project, i) => (
              <li key={project.initiative.id}>
                <Link
                  href={project.href}
                  className="group grid gap-3 py-8 transition-colors hover:bg-white/[0.02] sm:grid-cols-[3.5rem_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="text-sm tabular-nums text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
                      {project.company.name}
                    </p>
                    <h3 className="font-display mt-1 text-xl tracking-[-0.02em] text-[var(--fg)] sm:text-2xl">
                      {project.initiative.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                      {project.initiative.impact}
                    </p>
                    <p className="mt-3 text-xs text-[var(--accent)]">
                      {project.initiative.keywords.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                  <span className="text-sm text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-0.5">
                    View →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured case studies */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Product exploration</p>
              <h2 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[var(--fg)]">
                Featured case studies
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="text-sm font-medium text-[var(--accent)] hover:text-[var(--fg)]"
            >
              View all case studies →
            </Link>
          </div>
          <ul className="mt-12 grid gap-8 lg:grid-cols-2">
            {portfolioCaseStudies.map((study) => (
              <li key={study.slug} className="border border-[var(--line)] p-7 sm:p-8">
                <p className="eyebrow !text-[var(--accent)]">Personal product case study</p>
                <h3 className="font-display mt-4 text-2xl tracking-[-0.02em] text-[var(--fg)] sm:text-3xl">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{study.subtitle}</p>
                <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
                  {study.summary}
                </p>
                <Link
                  href={
                    study.slug === "youtube-music-premium"
                      ? "/case-studies/youtube-music"
                      : "/case-studies/tara-ai"
                  }
                  className="mt-7 inline-block text-sm font-medium text-[var(--accent)]"
                >
                  Read case study →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Short about + contact CTA */}
      <section className="border-t border-[var(--line)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="font-display mt-3 text-3xl tracking-[-0.02em] text-[var(--fg)]">
              Product thinking at the intersection of people, technology and business.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">
              {aboutIntro}
            </p>
            <Link href="/about" className="mt-6 inline-block text-sm font-medium text-[var(--accent)]">
              More about me →
            </Link>
          </div>
          <div className="border border-[var(--line)] p-8">
            <p className="eyebrow">Opportunities</p>
            <h2 className="font-display mt-3 text-2xl tracking-[-0.02em] text-[var(--fg)]">
              {site.openTo}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Exploring roles where I can build and scale products across AI, SaaS, customer
              experience and digital platforms.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)]"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const aboutIntro =
  "I have 4+ years of dedicated product experience, backed by 8+ years across growth, sales and operations. I focus on translating customer and business problems into shipped SaaS capabilities — from discovery and roadmap through GTM and monetization.";
