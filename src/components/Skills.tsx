import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/content";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-[var(--section-pad)]">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="How I work"
          description="Strategy, AI, execution, and the tools behind shipped outcomes — grouped the way product work actually happens."
        />

        <ul className="mt-14 grid gap-12 border-t border-[var(--line)] pt-12 md:grid-cols-2">
          {skillGroups.map((group) => (
            <li key={group.title}>
              <h3 className="eyebrow">{group.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[var(--line)] pb-2.5 text-sm text-[var(--ink-soft)] last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
