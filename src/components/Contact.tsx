import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/content";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-[var(--section-pad)]">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Connect"
          title={site.openTo}
          description={site.openToDescription}
        />

        <ul className="mt-12 grid gap-0 border-y border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          <li className="border-[var(--line)] py-7 sm:pr-8 sm:odd:border-r lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
            <a href={`mailto:${site.email}`} className="group block">
              <p className="eyebrow">Email</p>
              <p className="mt-3 break-all text-sm font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                {site.email}
              </p>
            </a>
          </li>
          <li className="border-[var(--line)] py-7 sm:pl-8 lg:border-r lg:px-6">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <p className="eyebrow">LinkedIn</p>
              <p className="mt-3 text-sm font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                connectwithsaurabh
              </p>
            </a>
          </li>
          <li className="border-[var(--line)] py-7 sm:border-t sm:pr-8 sm:odd:border-r lg:border-t-0 lg:border-r lg:px-6">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group block">
              <p className="eyebrow">Phone</p>
              <p className="mt-3 text-sm font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                {site.phone}
              </p>
            </a>
          </li>
          <li className="border-[var(--line)] py-7 sm:border-t sm:pl-8 lg:border-t-0 lg:px-6 lg:pr-0">
            <a href={site.resumePath} download className="group block">
              <p className="eyebrow">Resume</p>
              <p className="mt-3 text-sm font-medium text-[var(--accent)]">
                Download PDF →
              </p>
            </a>
          </li>
        </ul>

        <p className="mt-14 text-center text-xs text-[var(--muted)]">
          {site.copyright}
        </p>
      </div>
    </section>
  );
}
