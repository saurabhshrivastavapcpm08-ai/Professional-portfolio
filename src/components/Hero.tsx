"use client";

import { FadeUp } from "@/components/motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[80vh] scroll-mt-24 flex-col justify-center px-5 pt-[var(--header-h)] sm:px-8"
    >
      <div className="mx-auto w-full max-w-4xl py-20 sm:py-28">
        <FadeUp as="p" delay={0} className="text-base text-[var(--muted)] sm:text-lg">
          Hi, I&apos;m Saurabh Shrivastava.
        </FadeUp>

        <FadeUp
          as="h1"
          delay={0.2}
          className="font-display mt-4 text-[clamp(3.25rem,10vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--fg)]"
        >
          Product Manager.
        </FadeUp>

        <FadeUp
          as="p"
          delay={0.4}
          className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-xl sm:leading-relaxed"
        >
          Building intuitive, high-impact products from concept to launch. Based
          in Bangalore, shaping the future of digital experiences.
        </FadeUp>
      </div>
    </section>
  );
}
