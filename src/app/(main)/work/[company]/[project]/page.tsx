import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getAllProjectParams,
  getProject,
} from "@/lib/work-routes";
import type { CompanyId } from "@/data/work";

type Props = {
  params: Promise<{ company: string; project: string }>;
};

export function generateStaticParams() {
  return getAllProjectParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company, project } = await params;
  if (company !== "solera" && company !== "tekion") return { title: "Project" };
  const record = getProject(company, project);
  if (!record) return { title: "Project" };
  return {
    title: `${record.initiative.title} | ${record.company.name}`,
    description: record.initiative.impact,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { company, project } = await params;
  if (company !== "solera" && company !== "tekion") notFound();
  const companyId = company as CompanyId;
  const record = getProject(companyId, project);
  if (!record) notFound();

  const { prev, next } = getAdjacentProjects(companyId, project);
  const { initiative, company: co, index } = record;

  return (
    <article className="mx-auto max-w-3xl px-5 py-28 sm:px-8 sm:py-32">
      <p className="eyebrow">
        Project {String(index).padStart(2, "0")} · {co.name}
      </p>
      <h1 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.25rem)] tracking-[-0.03em] text-[var(--fg)]">
        {initiative.title}
      </h1>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-[var(--muted)]">Company</dt>
          <dd className="mt-1 text-[var(--fg)]">{co.name}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Role</dt>
          <dd className="mt-1 text-[var(--fg)]">{co.role}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Timeline</dt>
          <dd className="mt-1 text-[var(--fg)]">{co.dates}</dd>
        </div>
      </dl>
      <p className="mt-8 text-lg leading-relaxed text-[var(--fg)]">
        {initiative.impact}
      </p>

      <hr className="my-12 border-[var(--line)]" />

      <section>
        <h2 className="eyebrow !text-[var(--accent)]">The problem</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Why did this matter?</p>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          {initiative.why}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="eyebrow !text-[var(--accent)]">The product</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">What did I build / own?</p>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          {initiative.what}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="eyebrow !text-[var(--accent)]">My role</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">What did I personally own?</p>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          {initiative.how}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="eyebrow !text-[var(--accent)]">The approach</h2>
        <ul className="mt-4 space-y-0 text-sm text-[var(--muted)]">
          {[
            "Discovery",
            "Strategy",
            "Product definition",
            "Execution",
            "Cross-functional collaboration",
          ].map((item) => (
            <li
              key={item}
              className="border-b border-[var(--line)] py-3 last:border-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="eyebrow !text-[var(--accent)]">Impact</h2>
        <p className="mt-4 font-display text-2xl tracking-[-0.02em] text-[var(--fg)]">
          {initiative.impact}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="eyebrow !text-[var(--accent)]">Product capabilities</h2>
        <p className="mt-4 text-sm text-[var(--accent)]">
          {initiative.keywords.join(" · ")}
        </p>
      </section>

      <nav className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-8 text-sm">
        {prev ? (
          <Link
            href={prev.href}
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            ← Previous project
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={companyId === "solera" ? "/work" : `/work/${companyId}`}
          className="text-[var(--accent)]"
        >
          Back to Work
        </Link>
        {next ? (
          <Link
            href={next.href}
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            Next project →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
