import type { ReactNode } from "react";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  children?: ReactNode;
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
          {index ? <span className="tabular-nums text-[var(--muted)]">{index}</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      )}
      <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
        {title}
      </h2>
      {description ? (
        <p className="prose-muted mt-5 text-base sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
