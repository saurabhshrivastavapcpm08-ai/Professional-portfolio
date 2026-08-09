import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import { AboutCopy } from "@/components/AboutCopy";
import { site } from "@/data/content";

export function About() {
  const portraitPath = path.join(process.cwd(), "public/images/portrait.jpg");
  const hasPortrait = existsSync(portraitPath);

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-white/10 bg-[linear-gradient(160deg,#152238,#070b14)]">
          {hasPortrait ? (
            <Image
              src="/images/portrait.jpg"
              alt={`${site.name}, Strategic Product Manager`}
              fill
              sizes="(max-width: 1024px) 80vw, 360px"
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <p className="font-[family-name:var(--font-display)] text-6xl tracking-[-0.04em] text-[var(--paper)]">
                SS
              </p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Add your headshot at{" "}
                <code className="text-[var(--accent-soft)]">
                  public/images/portrait.jpg
                </code>
              </p>
            </div>
          )}
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
