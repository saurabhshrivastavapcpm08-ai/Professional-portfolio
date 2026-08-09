"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { companies, type CompanyId, type WorkInitiative } from "@/data/work";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/content";

function InitiativeModal({
  initiative,
  companyName,
  onClose,
}: {
  initiative: WorkInitiative;
  companyName: string;
  onClose: () => void;
}) {
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
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="initiative-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/15 bg-[linear-gradient(165deg,#121a2e,#0a0f1a)] p-6 shadow-2xl sm:rounded-2xl sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent-soft)]">
          {companyName}
        </p>
        <h3
          id="initiative-title"
          className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-[var(--paper)]"
        >
          {initiative.title}
        </h3>

        {(
          [
            ["Why", initiative.why],
            ["What", initiative.what],
            ["How", initiative.how],
            ["Impact", initiative.impact],
          ] as const
        ).map(([label, body]) => (
          <div key={label} className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--warm)]">
              {label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
              {body}
            </p>
          </div>
        ))}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
          {initiative.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] text-[var(--muted)]"
            >
              {kw}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--ink)] transition-[transform,filter] hover:brightness-110 active:scale-[0.99]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function companyFromHash(hash: string): CompanyId | null {
  if (hash === "work-tekion") return "tekion";
  if (hash === "work-solera") return "solera";
  return null;
}

function CompanyPanel({
  company,
  isActive,
  onSelectInitiative,
}: {
  company: (typeof companies)[number];
  isActive: boolean;
  onSelectInitiative: (initiative: WorkInitiative) => void;
}) {
  return (
    <div
      role="tabpanel"
      id={`work-panel-${company.id}`}
      aria-labelledby={`work-tab-${company.id}`}
      hidden={!isActive}
      className={isActive ? "relative z-10 mt-10" : "hidden"}
    >
      <article className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(7,11,20,0.6))] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--muted-strong)]">{company.role}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {company.product}
              {company.scale ? ` · ${company.scale}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {company.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1 text-[11px] font-medium text-[var(--accent-soft)]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--paper)]">
          {company.story}
        </p>
      </article>

      <ul className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2">
        {company.initiatives.map((initiative, index) => (
          <li key={initiative.id} className="relative z-10">
            <button
              type="button"
              onClick={() => onSelectInitiative(initiative)}
              className="relative z-10 flex h-full w-full cursor-pointer flex-col rounded-xl border border-white/10 bg-[var(--ink-deep)]/60 p-5 text-left transition-[border-color,transform] duration-200 hover:border-[var(--accent)]/35 hover:translate-y-[-2px] active:scale-[0.99]"
            >
              <span className="text-[11px] font-medium tabular-nums text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--paper)]">
                {initiative.title}
              </h4>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--muted-strong)]">
                {initiative.impact}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                View initiative
                <span aria-hidden>→</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WorkExperience() {
  const [activeId, setActiveId] = useState<CompanyId>("solera");
  const [selected, setSelected] = useState<{
    initiative: WorkInitiative;
    companyName: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const applyHash = useCallback((hashRaw: string) => {
    const hash = hashRaw.replace("#", "");
    const fromHash = companyFromHash(hash);
    if (fromHash) {
      setActiveId(fromHash);
    }
    if (hash === "work" || hash === "work-tekion" || hash === "work-solera") {
      requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  useEffect(() => {
    applyHash(window.location.hash);
    const onHashChange = () => applyHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [applyHash]);

  const selectCompany = (id: CompanyId) => {
    setActiveId(id);
    setSelected(null);
    const hash = id === "tekion" ? "#work-tekion" : "#work-solera";
    const next = `${window.location.pathname}${window.location.search}${hash}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
      window.history.pushState(null, "", next);
    }
  };

  const openInitiative = (companyId: CompanyId, initiative: WorkInitiative) => {
    const co = companies.find((c) => c.id === companyId);
    setSelected({ initiative, companyName: co?.name ?? companyId });
  };

  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-[var(--ink)] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--accent) 35%, transparent), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Product ownership"
          title="Solera & Tekion — two chapters, one arc"
          description="Tekion sharpened execution, CX, and ML. Solera expanded platform strategy, AI engagement, and monetization. Pick a company to explore eight initiatives each."
        />

        <div
          className="relative z-20 mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          role="tablist"
          aria-label="Select company"
        >
          {companies.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                id={`work-tab-${c.id}`}
                aria-controls={`work-panel-${c.id}`}
                onClick={() => selectCompany(c.id)}
                className={`relative z-20 flex-1 cursor-pointer overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[border-color,transform,box-shadow] duration-200 active:scale-[0.99] ${
                  isActive
                    ? "border-[var(--accent)]/50 shadow-[0_0_40px_rgba(61,184,197,0.15)]"
                    : "border-white/12 hover:border-white/25"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-80 transition-opacity ${
                    isActive
                      ? "bg-[linear-gradient(135deg,rgba(61,184,197,0.2),rgba(12,18,32,0.95))]"
                      : "bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(12,18,32,0.9))]"
                  }`}
                />
                <div className="relative z-10">
                  <p className="font-[family-name:var(--font-display)] text-lg text-[var(--paper)]">
                    {c.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{c.dates}</p>
                  <p className="mt-2 text-sm font-medium text-[var(--accent-soft)]">
                    {c.headline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {companies.map((c) => (
          <CompanyPanel
            key={c.id}
            company={c}
            isActive={c.id === activeId}
            onSelectInitiative={(initiative) => openInitiative(c.id, initiative)}
          />
        ))}

        <Reveal className="relative z-10 mt-12 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 sm:flex-row">
          <p className="text-center text-xs text-[var(--muted)] sm:text-left">
            {site.copyright}
          </p>
          <Link
            href="/#case-studies"
            className="text-sm font-medium text-[var(--accent-soft)] hover:text-[var(--accent)]"
          >
            Explore interactive case studies →
          </Link>
        </Reveal>
      </div>

      {mounted && selected
        ? createPortal(
            <InitiativeModal
              initiative={selected.initiative}
              companyName={selected.companyName}
              onClose={() => setSelected(null)}
            />,
            document.body,
          )
        : null}
    </section>
  );
}
