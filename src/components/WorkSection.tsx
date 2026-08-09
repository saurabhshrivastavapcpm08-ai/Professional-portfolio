"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  companies,
  type CompanyId,
  type CompanyWork,
  type WorkInitiative,
} from "@/data/work";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

function companyFromHash(hash: string): CompanyId | null {
  if (hash === "work-tekion" || hash.includes("tekion")) return "tekion";
  if (hash === "work-solera" || hash.includes("solera")) return "solera";
  if (hash === "work") return "solera";
  return null;
}

function InitiativePanel({
  company,
  initiative,
  onClose,
}: {
  company: CompanyWork;
  initiative: WorkInitiative;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="initiative-panel-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        aria-label="Close initiative"
        onClick={onClose}
      />
      <motion.aside
        initial={reduce ? false : { x: "100%" }}
        animate={{ x: 0 }}
        exit={reduce ? undefined : { x: "100%" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-[var(--line)] bg-[#141414]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-6 py-5 sm:px-8">
          <div>
            <p className="eyebrow !text-[var(--accent)]">{company.name}</p>
            <h3
              id="initiative-panel-title"
              className="font-display mt-2 text-2xl tracking-[-0.02em] text-[var(--fg)] sm:text-3xl"
            >
              {initiative.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
          {(
            [
              ["Why", initiative.why],
              ["What", initiative.what],
              ["How", initiative.how],
              ["Impact", initiative.impact],
            ] as const
          ).map(([label, body]) => (
            <div key={label} className="mb-8 last:mb-0">
              <p className="eyebrow !text-[var(--accent)]">{label}</p>
              <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                {body}
              </p>
            </div>
          ))}

          <p className="mt-10 border-t border-[var(--line)] pt-6 text-xs leading-relaxed text-[var(--muted)]">
            {initiative.keywords.join(" · ")}
          </p>
        </div>
      </motion.aside>
    </div>
  );
}

export function WorkSection() {
  const [activeId, setActiveId] = useState<CompanyId>("solera");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const applyHash = useCallback(() => {
    const fromHash = companyFromHash(window.location.hash.replace("#", ""));
    if (fromHash) setActiveId(fromHash);
  }, []);

  useEffect(() => {
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [applyHash]);

  const company = companies.find((c) => c.id === activeId) ?? companies[0];
  const selected =
    company.initiatives.find((i) => i.id === selectedId) ?? null;

  const selectCompany = (id: CompanyId) => {
    setActiveId(id);
    setSelectedId(null);
    const hash = id === "tekion" ? "#work-tekion" : "#work-solera";
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${hash}`,
    );
  };

  return (
    <section id="work" className="relative scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32">
      <div id="work-solera" className="pointer-events-none absolute" aria-hidden />
      <div id="work-tekion" className="pointer-events-none absolute" aria-hidden />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">01 Product ownership</p>
          <h2 className="font-display mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
            Two chapters of product leadership
          </h2>
          <p className="highlight-sage is-active mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Tekion sharpened execution, customer experience, and ML. Solera expanded
            platform strategy, AI engagement, GTM, and monetization.
          </p>
        </Reveal>

        {/* Company switcher — one chapter at a time */}
        <div
          className="mt-14 flex gap-0 border-b border-[var(--line)]"
          role="tablist"
          aria-label="Company"
        >
          {companies.map((c) => {
            const active = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                id={`work-tab-${c.id}`}
                aria-controls="work-panel"
                onClick={() => selectCompany(c.id)}
                className={cn(
                  "relative flex-1 px-1 pb-5 text-left transition-colors sm:px-2",
                  active ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]",
                )}
              >
                <p className="text-[0.65rem] font-medium tracking-[0.16em] uppercase">
                  {c.dates}
                </p>
                <p className="font-display mt-2 text-xl tracking-[-0.02em] sm:text-2xl">
                  {c.name}
                </p>
                <p className="mt-1 hidden text-sm text-[var(--muted)] sm:block sm:max-w-xs">
                  {c.headline}
                </p>
                {active ? (
                  <motion.span
                    layoutId={reduce ? undefined : "work-tab-line"}
                    className="absolute inset-x-0 bottom-0 h-px bg-[var(--accent)]"
                  />
                ) : (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-transparent" />
                )}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="work-panel"
          aria-labelledby={`work-tab-${company.id}`}
          className="mt-12"
        >
          <Reveal key={company.id}>
            <div className="max-w-3xl">
              <p className="text-sm text-[var(--muted)]">
                {company.role}
                <span className="mx-2 text-[var(--line)]">·</span>
                {company.product}
                {company.scale ? ` · ${company.scale}` : ""}
              </p>
              <p className="mt-5 text-base leading-relaxed text-[var(--fg)] sm:text-lg">
                {company.story}
              </p>
              <p className="mt-6 text-sm text-[var(--accent)]">
                {company.focusAreas.join("  ·  ")}
              </p>
            </div>
          </Reveal>

          {/* Scannable initiative index — open detail in panel, not accordion */}
          <ul className="mt-14 border-t border-[var(--line)]">
            {company.initiatives.map((initiative, index) => {
              const isActive = selectedId === initiative.id;
              return (
                <li key={initiative.id} className="border-b border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setSelectedId(initiative.id)}
                    className={cn(
                      "group grid w-full grid-cols-[3rem_1fr] items-baseline gap-4 py-6 text-left transition-colors duration-200 sm:grid-cols-[4rem_1fr_auto] sm:gap-8",
                      isActive ? "bg-[#1a1a1a]/80" : "hover:bg-[#1a1a1a]/50",
                    )}
                  >
                    <span className="text-sm tabular-nums text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-xl tracking-[-0.02em] text-[var(--fg)] sm:text-2xl">
                        {initiative.title}
                      </h4>
                      <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                        {initiative.impact}
                      </p>
                    </div>
                    <span className="col-start-2 mt-1 text-sm font-medium text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-0.5 sm:col-start-auto sm:mt-0">
                      View
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {selected ? (
                <InitiativePanel
                  key={selected.id}
                  company={company}
                  initiative={selected}
                  onClose={() => setSelectedId(null)}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
