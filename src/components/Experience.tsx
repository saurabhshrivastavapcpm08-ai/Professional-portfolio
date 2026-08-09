import { SectionHeading } from "@/components/SectionHeading";
import { certifications, education, experience } from "@/data/content";

export function Experience() {
  return (
    <section
      id="timeline"
      className="relative scroll-mt-24 border-y border-[var(--line)] bg-[var(--paper-elevated)] py-[var(--section-pad)]"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Timeline"
          title="Roles, ownership & growth"
          description="From automotive SaaS product leadership to foundational B2B growth — with ISB product certification along the way."
        />

        <ol className="mt-14 space-y-0 border-t border-[var(--line)]">
          {experience.map((job) => (
            <li
              key={job.company}
              className="grid gap-4 border-b border-[var(--line)] py-10 md:grid-cols-[11rem_1fr] md:gap-12"
            >
              <p className="text-sm font-medium text-[var(--accent)]">{job.dates}</p>
              <div>
                <h3 className="font-display text-2xl tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
                  {job.company}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {job.role} · {job.location}
                </p>
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-4 text-sm leading-relaxed text-[var(--muted-strong)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-12 border-t border-[var(--line)] pt-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl text-[var(--ink)]">Education</h3>
            <ul className="mt-6 space-y-6">
              {education.map((item) => (
                <li key={item.school}>
                  <p className="font-medium text-[var(--ink)]">{item.school}</p>
                  <p className="mt-1 text-sm text-[var(--muted-strong)]">
                    {item.credential}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.dates}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[var(--ink)]">Certifications</h3>
            <ul className="mt-6 space-y-2">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="border-b border-[var(--line)] pb-2 text-sm text-[var(--muted-strong)] last:border-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
