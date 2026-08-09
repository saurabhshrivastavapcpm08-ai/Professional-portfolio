import Image from "next/image";
import { AboutCopy } from "@/components/AboutCopy";
import { site } from "@/data/content";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-white/10 bg-[var(--navy)]">
          <Image
            src="/images/portrait.jpg"
            alt={`${site.name}, Strategic Product Manager`}
            fill
            sizes="(max-width: 1024px) 80vw, 360px"
            className="object-cover object-top"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink-deep)]/90 to-transparent p-4">
            <p className="text-sm font-medium text-[var(--paper)]">{site.name}</p>
            <p className="text-xs text-[var(--muted)]">{site.title}</p>
          </div>
        </div>
        <AboutCopy />
      </div>
    </section>
  );
}
