import type { Metadata } from "next";
import Link from "next/link";
import { portfolioCaseStudies } from "@/data/content";

export const metadata: Metadata = {
  title: "Tara AI — HR Coworker | Case Study",
  description:
    "AI recruitment coworker prototype — jobs, candidates, chat guidance, and product narrative.",
};

const study = portfolioCaseStudies.find((s) => s.slug === "tara-hr-coworker")!;
const liveDemo =
  study.demoHref ??
  "https://p-5173-pod-3r2mlx5ovbbabj4lq4ix2ouvsa-eb93eb2022dbaeaf0f89-us5.agent.cvm.dev/";

export default function TaraAiCaseStudyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-28 sm:px-8 sm:py-32">
      <p className="eyebrow !text-[var(--accent)]">Personal product case study</p>
      <h1 className="font-display mt-4 text-[clamp(2.4rem,5vw,3.5rem)] tracking-[-0.03em] text-[var(--fg)]">
        {study.title}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{study.subtitle}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)]"
        >
          View demo
        </a>
        <Link
          href="/case-studies/tara-hr-coworker"
          className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--fg)]"
        >
          Embedded prototype
        </Link>
      </div>

      <div className="mt-14 space-y-12 text-[var(--muted)]">
        <Section title="Problem">
          Recruiters juggle fragmented job pipelines, candidate scoring, and follow-ups. An
          AI coworker should compress operational load while keeping humans in control of
          hiring decisions.
        </Section>

        <Section title="User">
          Talent and recruiting teams who need pipeline visibility, ranked candidates, and
          guided next actions — without handing hiring decisions to a black-box autopilot.
        </Section>

        <Section title="Opportunity">
          Translate recruiting pain into clear API contracts and UX surfaces so AI assists
          the hiring workflow instead of replacing judgment.
        </Section>

        <Section title="Product concept">{study.summary}</Section>

        <Section title="User journey">
          Manage open roles → review score-ranked candidates → chat with Tara for suggested
          next actions → keep humans accountable for hiring decisions.
        </Section>

        <Section title="AI experience">
          Tara positions AI as a coworker — chat responses include suggested next actions for
          the hiring workflow, while recruiters retain control of decisions.
        </Section>

        <Section title="Product architecture">
          Backend APIs for jobs and candidates, a score-ranked pipeline UI, and a chat
          coworker surface — demonstrating product thinking across contracts and recruiter
          UX. Stack: {study.stack.join(" · ")}.
        </Section>

        <Section title="Prototype">
          Live demo and embedded workspace are available above and via the prototype route.
          Add candidates, review reqs, and ask Tara against the same product narrative as the
          GitHub repository.
        </Section>

        <Section title="Key features">
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {study.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Success metrics">
          Success is framed around workflow assist: clearer pipeline visibility, faster
          candidate triage, and useful next-action guidance — while humans stay in control of
          hiring decisions.
        </Section>

        <Section title="What I learned">
          Translating recruiting pain into clear API contracts and UX surfaces is as
          important as the AI response itself — the product has to fit the hiring workflow.
        </Section>
      </div>

      <Link
        href="/case-studies"
        className="mt-16 inline-block text-sm text-[var(--accent)]"
      >
        ← Back to case studies
      </Link>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-[var(--fg)]">{title}</h2>
      <div className="mt-3 text-base leading-relaxed">{children}</div>
    </section>
  );
}
