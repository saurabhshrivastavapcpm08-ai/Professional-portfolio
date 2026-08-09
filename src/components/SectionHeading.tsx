import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div id={id} className="scroll-mt-28">
        <p className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-[var(--accent)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-xs">
            {index}
          </span>
          <span className="uppercase text-[var(--accent-soft)]">{eyebrow}</span>
        </p>
        <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-strong)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
