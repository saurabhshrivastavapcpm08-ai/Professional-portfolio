import { Squiggle } from "@/components/Decor";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
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
    <div id={id} className="scroll-mt-28 max-w-3xl">
      {(eyebrow || index) && (
        <p className="eyebrow flex items-center gap-3">
          {index ? <span className="text-[var(--muted)]">{index}</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      )}
      <h2 className="font-display mt-4 text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
        {title}
      </h2>
      <Squiggle className="mt-3" width={100} />
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
