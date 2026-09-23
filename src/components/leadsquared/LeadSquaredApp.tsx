"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AGENT_SUGGESTIONS,
  DEMO_NOW,
  STAGES,
  VOICE_SCRIPTS,
  applyDraft,
  checkIn,
  completeTask,
  completeVisit,
  describeNext,
  extractDraft,
  intentLabel,
  leadById,
  logFieldNote,
  nextVisit,
  permissionLabel,
  presetWhens,
  requiredPermissions,
  seedState,
  setOnline,
  setStage,
  type Activity,
  type CrmState,
  type Draft,
  type Lead,
  type Stage,
  type Task,
  type Visit,
} from "@/lib/leadsquared/model";

type Screen = "field" | "leads" | "tasks" | "more" | "lead";
type Pending =
  | { kind: "checkin" | "complete"; leadId: string }
  | { kind: "stage"; leadId: string; stage: Stage };

const WHEN_PRESETS = presetWhens();

export function LeadSquaredApp() {
  const [crm, setCrm] = useState<CrmState>(() => seedState());
  const [screen, setScreen] = useState<Screen>("field");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [wide, setWide] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [islandOpen, setIslandOpen] = useState(false);
  const [deviceOpen, setDeviceOpen] = useState(false);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const [routeLeadId, setRouteLeadId] = useState<string | null>(null);
  const [callLeadId, setCallLeadId] = useState<string | null>(null);
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const upcoming = nextVisit(crm);
  const upcomingLead = leadById(crm, upcoming?.leadId ?? null);
  const queued =
    crm.activities.filter((item) => item.sync === "on_device").length +
    crm.tasks.filter((item) => item.sync === "on_device").length;

  function notify(message: string) {
    setToast(message);
  }

  function commit(next: CrmState, message: string) {
    if (next === crm) {
      notify(message);
      return false;
    }
    setCrm(next);
    notify(message);
    return true;
  }

  function openLead(id: string) {
    setLeadId(id);
    setScreen("lead");
    setLocked(false);
  }

  function apply(draft: Draft, source: "voice" | "agent") {
    const result = applyDraft(crm, draft, source);
    const queuedNote = crm.online ? "" : " Saved on this device.";
    return commit(result.state, `${result.summary}${result.state === crm ? "" : queuedNote}`);
  }

  const activeLead = leadById(crm, leadId);

  return (
    <div className="h-dvh overflow-hidden bg-[#071422] text-white">
      <style>{`
        @keyframes lsq-wave {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lsq-wave-bar { animation: none !important; }
        }
        .lsq-phone { container-type: inline-size; }
        .lsq-split { display: flex; flex-direction: column; gap: 12px; }
        @container (min-width: 640px) {
          .lsq-wide .lsq-split { display: grid; grid-template-columns: 1fr 1fr; }
        }
      `}</style>
      <div className="mx-auto flex h-full max-w-6xl items-stretch gap-8 px-0 lg:px-8 lg:py-6">
        <aside className="hidden w-[300px] shrink-0 flex-col justify-between py-4 lg:flex">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo />
              <div>
                <p className="text-[15px] font-extrabold tracking-tight">LeadSquared</p>
                <p className="text-xs text-white/60">Mobile CRM · Field Day</p>
              </div>
            </div>
            <h1 className="mt-8 text-[28px] font-extrabold leading-tight tracking-tight">
              A field day that writes itself back to CRM.
            </h1>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
              <li>
                <span className="font-bold text-white">1 · On-device capture.</span> Speak a note.
                The phone drafts the lead, ask, next step and time. Nothing saves until you confirm.
              </li>
              <li>
                <span className="font-bold text-white">2 · Agent actions.</span> Ask for “Log my visit
                with ABC”. The system agent can only change CRM after permission and confirmation.
              </li>
              <li>
                <span className="font-bold text-white">3 · Field Day.</span> The next customer stays
                on the lock screen with navigate, call, check-in and complete.
              </li>
            </ol>
          </div>
          <p className="text-xs leading-relaxed text-white/45">
            Prototype for a Northstar Software rep in Bengaluru. Wednesday, 23 September 2026 · 11:18
            AM IST. On-device structuring is simulated locally.
          </p>
        </aside>

        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div
            className={`lsq-phone relative flex h-full w-full flex-col overflow-hidden bg-[#F4F7FB] text-[#1D2530] [&_button]:cursor-pointer lg:h-[min(844px,calc(100dvh-48px))] lg:rounded-[36px] lg:shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${
              wide ? "lsq-wide lg:w-[860px]" : "lg:w-[390px]"
            }`}
          >
            {locked ? (
              <LockScreen
                crm={crm}
                visit={upcoming}
                lead={upcomingLead}
                navigating={navigatingId === upcomingLead?.id}
                onUnlock={() => setLocked(false)}
                onNavigate={(id) => {
                  setLocked(false);
                  setRouteLeadId(id);
                }}
                onCall={(id) => {
                  setLocked(false);
                  setCallLeadId(id);
                }}
                onCheckIn={(id) => setPending({ kind: "checkin", leadId: id })}
                onComplete={(id) => setPending({ kind: "complete", leadId: id })}
              />
            ) : (
              <>
                <StatusBar
                  online={crm.online}
                  queued={queued}
                  visit={upcoming}
                  lead={upcomingLead}
                  islandOpen={islandOpen}
                  onIsland={() => setIslandOpen((open) => !open)}
                  onAsk={() => setAgentOpen(true)}
                  onLock={() => {
                    setIslandOpen(false);
                    setLocked(true);
                  }}
                />
                {islandOpen && upcoming && upcomingLead ? (
                  <div className="px-3 pb-2">
                    <LiveCard
                      crm={crm}
                      visit={upcoming}
                      lead={upcomingLead}
                      navigating={navigatingId === upcomingLead.id}
                      compact
                      onNavigate={() => {
                        setIslandOpen(false);
                        setRouteLeadId(upcomingLead.id);
                      }}
                      onCall={() => {
                        setIslandOpen(false);
                        setCallLeadId(upcomingLead.id);
                      }}
                      onCheckIn={() => setPending({ kind: "checkin", leadId: upcomingLead.id })}
                      onComplete={() => setPending({ kind: "complete", leadId: upcomingLead.id })}
                      onOpen={() => {
                        setIslandOpen(false);
                        openLead(upcomingLead.id);
                      }}
                    />
                  </div>
                ) : null}
                <div className="min-h-0 flex-1 overflow-y-auto" data-lenis-prevent>
                  {screen === "field" ? (
                    <FieldDay
                      crm={crm}
                      wide={wide}
                      navigatingId={navigatingId}
                      onOpenLead={openLead}
                      onNavigate={setRouteLeadId}
                      onCall={setCallLeadId}
                      onCheckIn={(id) => setPending({ kind: "checkin", leadId: id })}
                      onComplete={(id) => setPending({ kind: "complete", leadId: id })}
                      onCapture={() => setCaptureOpen(true)}
                      onAgent={() => setAgentOpen(true)}
                      onDevice={() => setDeviceOpen(true)}
                      queued={queued}
                    />
                  ) : null}
                  {screen === "leads" ? (
                    <LeadList
                      crm={crm}
                      onOpen={openLead}
                    />
                  ) : null}
                  {screen === "lead" && activeLead ? (
                    <LeadDetail
                      crm={crm}
                      lead={activeLead}
                      onBack={() => setScreen("leads")}
                      onCall={() => setCallLeadId(activeLead.id)}
                      onNavigate={() => setRouteLeadId(activeLead.id)}
                      onCheckIn={() => setPending({ kind: "checkin", leadId: activeLead.id })}
                      onCapture={() => setCaptureOpen(true)}
                      onStage={(stage) => {
                        if (stage !== activeLead.stage) setPending({ kind: "stage", leadId: activeLead.id, stage });
                      }}
                    />
                  ) : null}
                  {screen === "tasks" ? (
                    <TaskList
                      crm={crm}
                      onOpen={openLead}
                      onDone={(id) => {
                        setCrm(completeTask(crm, id));
                        notify("Task completed");
                      }}
                    />
                  ) : null}
                  {screen === "more" ? (
                    <MoreScreen
                      crm={crm}
                      wide={wide}
                      onChange={setCrm}
                      onWide={setWide}
                      onReset={() => {
                        setCrm(seedState());
                        setNavigatingId(null);
                        setScreen("field");
                        notify("Field day reset");
                      }}
                      onNotify={notify}
                    />
                  ) : null}
                </div>
                <BottomNav
                  screen={screen}
                  onChange={(next) => {
                    setScreen(next);
                    setIslandOpen(false);
                  }}
                  onCapture={() => setCaptureOpen(true)}
                />
              </>
            )}

            {toast ? (
              <div
                role="status"
                className="absolute bottom-[5.5rem] left-4 right-4 z-[60] rounded-2xl bg-[#09283D] px-4 py-3 text-sm font-semibold text-white shadow-xl"
              >
                {toast}
              </div>
            ) : null}

            {deviceOpen ? (
              <DeviceSheet
                crm={crm}
                wide={wide}
                onClose={() => setDeviceOpen(false)}
                onChange={setCrm}
                onWide={setWide}
                onNotify={notify}
              />
            ) : null}

            {captureOpen ? (
              <CaptureSheet
                crm={crm}
                onClose={() => setCaptureOpen(false)}
                onSave={(draft) => {
                  const ok = apply(draft, "voice");
                  if (ok) setCaptureOpen(false);
                }}
              />
            ) : null}

            {agentOpen ? (
              <AgentSheet
                crm={crm}
                onClose={() => setAgentOpen(false)}
                onCrm={setCrm}
                onSave={(draft) => {
                  const ok = apply(draft, "agent");
                  if (ok) setAgentOpen(false);
                  return ok;
                }}
                onCall={(id) => {
                  setAgentOpen(false);
                  setCallLeadId(id);
                }}
                onCheckIn={(id) => {
                  const result = checkIn(crm, id);
                  if (commit(result.state, result.summary)) setAgentOpen(false);
                }}
              />
            ) : null}

            {routeLeadId ? (
              <RouteSheet
                lead={leadById(crm, routeLeadId)}
                onClose={() => setRouteLeadId(null)}
                onStart={(id) => {
                  setNavigatingId(id);
                  setRouteLeadId(null);
                  notify(`Navigation started · ${leadById(crm, id)?.area ?? ""}`);
                }}
              />
            ) : null}

            {callLeadId ? (
              <CallSheet
                lead={leadById(crm, callLeadId)}
                onClose={() => setCallLeadId(null)}
                onLog={(id) => {
                  const result = logFieldNote(
                    crm,
                    id,
                    "Call logged",
                    "Outbound call from Field Day.",
                  );
                  commit(result.state, result.summary);
                  setCallLeadId(null);
                }}
              />
            ) : null}

            {pending ? (
              <ConfirmAction
                crm={crm}
                pending={pending}
                onCancel={() => setPending(null)}
                onConfirm={() => {
                  if (pending.kind === "checkin") {
                    const result = checkIn(crm, pending.leadId);
                    commit(result.state, result.summary);
                  } else if (pending.kind === "complete") {
                    const result = completeVisit(crm, pending.leadId);
                    commit(result.state, result.summary);
                    if (navigatingId === pending.leadId) setNavigatingId(null);
                  } else if (pending.kind === "stage") {
                    const result = setStage(crm, pending.leadId, pending.stage);
                    commit(result.state, result.summary);
                  }
                  setPending(null);
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32.1 31.87" aria-hidden>
      <g transform="translate(-0.47 -1.56)">
        <path
          fill={light ? "#ffffff" : "#09283d"}
          d="M.951,153l15.342,15.6c-.03.042-.2-.039-.348-.039q-7.231,0-14.463.014c-.5,0-.751-.048-.744-.663.028-4.848.015-9.7.014-14.542v-.288Z"
          transform="translate(-0.24 -135.184)"
        />
        <path
          fill={light ? "#ffffff" : "#329afb"}
          d="M32.555,17.483c0,5.033-.012,10.068.014,15.1,0,.63-.167.813-.8.809q-7.27-.035-14.542,0c-.644,0-.8-.185-.8-.808.025-4.713-.008-9.428.033-14.142.008-.794-.23-.958-.979-.952-4.714.034-9.428.006-14.143.033-.661,0-.859-.185-.859-.85Q.514,9.483.47,2.291c0-.551.135-.729.705-.729q15.346.027,30.686,0c.672,0,.7.3.7.822Q32.543,9.933,32.555,17.483Z"
        />
      </g>
    </svg>
  );
}

function StatusBar({
  online,
  queued,
  visit,
  lead,
  islandOpen,
  onIsland,
  onAsk,
  onLock,
}: {
  online: boolean;
  queued: number;
  visit?: Visit;
  lead?: Lead;
  islandOpen: boolean;
  onIsland: () => void;
  onAsk: () => void;
  onLock: () => void;
}) {
  const hour = DEMO_NOW.getHours();
  const minute = DEMO_NOW.getMinutes().toString().padStart(2, "0");
  return (
    <div className="relative flex h-14 shrink-0 items-end justify-between bg-[#F4F7FB] px-4 pb-1">
      <p className="text-[13px] font-bold">
        {hour}:{minute}
      </p>
      <button
        type="button"
        onClick={onIsland}
        className="absolute left-1/2 top-2 flex h-8 -translate-x-1/2 items-center gap-2 rounded-full bg-[#09283D] px-3 text-[11px] font-semibold text-white"
        aria-expanded={islandOpen}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#7DFFB2]" />
        {lead && visit ? `${visit.startLabel} ${lead.shortName}` : "Field Day"}
      </button>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onAsk} className="text-[11px] font-extrabold text-[#1463FF]">
          Ask
        </button>
        <button type="button" onClick={onLock} className="text-[#1463FF]" aria-label="Show lock screen">
          <LockIcon queued={queued} online={online} />
        </button>
      </div>
    </div>
  );
}

function BottomNav({
  screen,
  onChange,
  onCapture,
}: {
  screen: Screen;
  onChange: (screen: Screen) => void;
  onCapture: () => void;
}) {
  const items: Array<{ id: Screen; label: string }> = [
    { id: "field", label: "Field" },
    { id: "leads", label: "Leads" },
    { id: "tasks", label: "Tasks" },
    { id: "more", label: "More" },
  ];
  return (
    <nav className="relative grid h-[4.75rem] shrink-0 grid-cols-5 items-end border-t border-[#E6EAF2] bg-white px-2 pb-3 pt-1">
      {items.slice(0, 2).map((item) => (
        <NavButton key={item.id} item={item} active={screen === item.id} onClick={() => onChange(item.id)} />
      ))}
      <button
        type="button"
        onClick={onCapture}
        className="-mt-7 flex flex-col items-center gap-1"
        aria-label="Capture a field note"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1463FF] text-white shadow-[0_8px_20px_rgba(20,99,255,0.35)]">
          <MicIcon />
        </span>
      </button>
      {items.slice(2).map((item) => (
        <NavButton key={item.id} item={item} active={screen === item.id} onClick={() => onChange(item.id)} />
      ))}
    </nav>
  );
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: { id: Screen; label: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 pb-1 text-[11px] font-bold ${active ? "text-[#1463FF]" : "text-[#8A93A3]"}`}
    >
      <NavIcon name={item.id} />
      {item.label}
    </button>
  );
}

function FieldDay({
  crm,
  wide,
  navigatingId,
  onOpenLead,
  onNavigate,
  onCall,
  onCheckIn,
  onComplete,
  onCapture,
  onAgent,
  onDevice,
  queued,
}: {
  crm: CrmState;
  wide: boolean;
  navigatingId: string | null;
  onOpenLead: (id: string) => void;
  onNavigate: (id: string) => void;
  onCall: (id: string) => void;
  onCheckIn: (id: string) => void;
  onComplete: (id: string) => void;
  onCapture: () => void;
  onAgent: () => void;
  onDevice: () => void;
  queued: number;
}) {
  const current = nextVisit(crm);
  const currentLead = leadById(crm, current?.leadId ?? null);
  const openTasks = crm.tasks.filter((task) => !task.done).length;
  return (
    <div className="px-4 pb-6">
      <div className="flex items-start justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-sm font-extrabold tracking-tight">LeadSquared</p>
          </div>
          <h2 className="mt-3 text-[26px] font-extrabold tracking-tight">Field Day</h2>
                <p className="text-sm text-[#64748B]">Priya Shah · South Bengaluru</p>
                <p className="mt-2 text-xs leading-relaxed text-[#465972] lg:hidden">
                  Speak a note, ask the agent to log a visit, or open the lock screen for the next customer.
                </p>
                <button type="button" onClick={onDevice} className="mt-1 text-xs font-extrabold text-[#1463FF]">
                  {crm.online ? "Online" : "Offline"}
                  {queued ? ` · ${queued} queued` : ""} · Device
                </button>
        </div>
        <button
          type="button"
          onClick={onAgent}
          className="mt-2 rounded-full bg-[#EAF1FF] px-3 py-2 text-xs font-extrabold text-[#1463FF]"
        >
          Ask
        </button>
      </div>

      <div className={wide ? "lsq-split mt-4" : "mt-4 space-y-3"}>
        {current && currentLead ? (
          <LiveCard
            crm={crm}
            visit={current}
            lead={currentLead}
            navigating={navigatingId === currentLead.id}
            onNavigate={() => onNavigate(currentLead.id)}
            onCall={() => onCall(currentLead.id)}
            onCheckIn={() => onCheckIn(currentLead.id)}
            onComplete={() => onComplete(currentLead.id)}
            onOpen={() => onOpenLead(currentLead.id)}
          />
        ) : (
          <div className="rounded-3xl bg-white p-5 text-sm text-[#64748B] shadow-sm">
            Today’s visits are done. {openTasks} open task{openTasks === 1 ? "" : "s"} remain.
          </div>
        )}
        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold">Today</h3>
            <p className="text-[11px] font-bold text-[#64748B]">Wed 23 Sep</p>
          </div>
          <ol className="mt-3 space-y-2">
            {crm.visits.map((visit) => {
              const lead = leadById(crm, visit.leadId);
              if (!lead) return null;
              const active = visit.id === current?.id;
              return (
                <li key={visit.id}>
                  <button
                    type="button"
                    onClick={() => onOpenLead(lead.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left ${active ? "bg-[#EAF1FF]" : ""}`}
                  >
                    <div className="w-16 shrink-0 text-xs font-extrabold text-[#1463FF]">{visit.startLabel}</div>
                    <Avatar name={lead.contact} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold">{lead.company}</p>
                      <p className="truncate text-xs text-[#64748B]">
                        {lead.area} · {visitStatusLabel(visit.status)}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={onCapture} className="flex-1 rounded-xl bg-[#1463FF] px-3 py-3 text-xs font-extrabold text-white">
              Speak a note
            </button>
            <button type="button" onClick={onAgent} className="flex-1 rounded-xl border border-[#D5DBE7] px-3 py-3 text-xs font-extrabold">
              Log with agent
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function LiveCard({
  crm,
  visit,
  lead,
  navigating,
  compact = false,
  onNavigate,
  onCall,
  onCheckIn,
  onComplete,
  onOpen,
}: {
  crm: CrmState;
  visit: Visit;
  lead: Lead;
  navigating: boolean;
  compact?: boolean;
  onNavigate: () => void;
  onCall: () => void;
  onCheckIn: () => void;
  onComplete: () => void;
  onOpen: () => void;
}) {
  const status =
    visit.status === "checked_in" ? "Checked in" : navigating ? "On the way" : "Up next";
  return (
    <article className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B4FD6] to-[#329AFB] text-white shadow-[0_12px_30px_rgba(20,99,255,0.25)]">
      <button type="button" onClick={onOpen} className="w-full px-4 pb-2 pt-4 text-left">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B6FFD2]" />
            {status}
          </span>
          <span>{crm.online ? "Live" : "On device"}</span>
        </div>
        <h3 className="mt-2 text-xl font-extrabold tracking-tight">{lead.company}</h3>
        <p className="text-sm text-white/85">
          {lead.contact} · {lead.role}
        </p>
        <p className="mt-2 text-sm font-semibold">
          {visit.startLabel}–{visit.endLabel} · {lead.distance}
        </p>
        <p className="text-sm text-white/80">{lead.area}</p>
        {!compact ? <StagePill stage={lead.stage} light /> : null}
      </button>
      <div className="grid grid-cols-4 gap-1.5 px-3 pb-3">
        <CardAction label="Navigate" onClick={onNavigate} />
        <CardAction label="Call" onClick={onCall} />
        <CardAction label={visit.status === "checked_in" ? "In" : "Check in"} onClick={onCheckIn} />
        <CardAction label="Done" onClick={onComplete} />
      </div>
    </article>
  );
}

function CardAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl bg-white/15 px-1 py-2 text-[11px] font-extrabold text-white ring-1 ring-white/25"
    >
      {label}
    </button>
  );
}

function LeadList({ crm, onOpen }: { crm: CrmState; onOpen: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const leads = crm.leads.filter((lead) => {
    const hay = `${lead.company} ${lead.contact} ${lead.area}`.toLowerCase();
    return hay.includes(query.trim().toLowerCase());
  });
  return (
    <div className="px-4 pb-6">
      <h2 className="pt-2 text-[26px] font-extrabold tracking-tight">Leads</h2>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search leads"
        className="mt-3 w-full rounded-2xl border border-[#E6EAF2] bg-white px-4 py-3 text-base outline-none ring-[#1463FF] focus:ring-2"
      />
      <ul className="mt-3 space-y-2">
        {leads.map((lead) => (
          <li key={lead.id}>
            <button
              type="button"
              onClick={() => onOpen(lead.id)}
              className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm"
            >
              <Avatar name={lead.contact} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-extrabold">{lead.company}</p>
                <p className="truncate text-xs text-[#64748B]">
                  {lead.contact} · {lead.area}
                </p>
              </div>
              <StagePill stage={lead.stage} />
            </button>
          </li>
        ))}
        {!leads.length ? <li className="px-2 py-6 text-sm text-[#64748B]">No leads match that search.</li> : null}
      </ul>
    </div>
  );
}

function LeadDetail({
  crm,
  lead,
  onBack,
  onCall,
  onNavigate,
  onCheckIn,
  onCapture,
  onStage,
}: {
  crm: CrmState;
  lead: Lead;
  onBack: () => void;
  onCall: () => void;
  onNavigate: () => void;
  onCheckIn: () => void;
  onCapture: () => void;
  onStage: (stage: Stage) => void;
}) {
  const activities = crm.activities.filter((item) => item.leadId === lead.id);
  const tasks = crm.tasks.filter((item) => item.leadId === lead.id && !item.done);
  const visit = crm.visits.find((item) => item.leadId === lead.id);
  return (
    <div className="px-4 pb-6">
      <button type="button" onClick={onBack} className="pt-2 text-sm font-extrabold text-[#1463FF]">
        ← Leads
      </button>
      <div className="mt-3 flex items-center gap-3">
        <Avatar name={lead.contact} large />
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">{lead.company}</h2>
          <p className="text-sm text-[#64748B]">
            {lead.contact} · {lead.role}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-[#465972]">{lead.address}</p>
      <p className="text-sm font-semibold text-[#1D2530]">{lead.phone}</p>
      {visit ? (
        <p className="mt-2 text-xs font-bold text-[#1463FF]">
          Visit {visit.startLabel} · {visitStatusLabel(visit.status)}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {STAGES.map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={() => onStage(stage)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
              stage === lead.stage ? "bg-[#1463FF] text-white" : "bg-white text-[#465972] ring-1 ring-[#E6EAF2]"
            }`}
          >
            {stage}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <MiniAction label="Call" onClick={onCall} />
        <MiniAction label="Navigate" onClick={onNavigate} />
        <MiniAction label="Check in" onClick={onCheckIn} />
      </div>
      <button type="button" onClick={onCapture} className="mt-3 w-full rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white">
        Capture note
      </button>
      <Section title="Open tasks">
        {tasks.length ? (
          tasks.map((task) => <TaskRow key={task.id} task={task} lead={lead} />)
        ) : (
          <p className="text-sm text-[#64748B]">No open tasks.</p>
        )}
      </Section>
      <Section title="Activity">
        {activities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </Section>
    </div>
  );
}

function TaskList({
  crm,
  onOpen,
  onDone,
}: {
  crm: CrmState;
  onOpen: (id: string) => void;
  onDone: (id: string) => void;
}) {
  const tasks = crm.tasks.slice().sort((a, b) => Number(a.done) - Number(b.done) || a.sort - b.sort);
  return (
    <div className="px-4 pb-6">
      <h2 className="pt-2 text-[26px] font-extrabold tracking-tight">Tasks</h2>
      <ul className="mt-3 space-y-2">
        {tasks.map((task) => {
          const lead = leadById(crm, task.leadId);
          return (
            <li key={task.id} className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-sm">
              <button
                type="button"
                aria-label={task.done ? "Completed" : `Complete ${task.title}`}
                onClick={() => {
                  if (!task.done) onDone(task.id);
                }}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  task.done ? "border-[#128A3E] bg-[#128A3E] text-white" : "border-[#1463FF]"
                }`}
              >
                {task.done ? "✓" : ""}
              </button>
              <button type="button" onClick={() => onOpen(task.leadId)} className="min-w-0 flex-1 text-left">
                <p className={`font-extrabold ${task.done ? "text-[#8A93A3] line-through" : ""}`}>{task.title}</p>
                <p className="text-xs text-[#64748B]">
                  {lead?.company} · {task.dueLabel}
                  {task.sync === "on_device" ? " · On device" : ""}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MoreScreen({
  crm,
  wide,
  onChange,
  onWide,
  onReset,
  onNotify,
}: {
  crm: CrmState;
  wide: boolean;
  onChange: (state: CrmState) => void;
  onWide: (wide: boolean) => void;
  onReset: () => void;
  onNotify: (message: string) => void;
}) {
  return (
    <div className="px-4 pb-8">
      <h2 className="pt-2 text-[26px] font-extrabold tracking-tight">More</h2>
      <div className="mt-3 rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#64748B]">Rep</p>
        <p className="mt-1 font-extrabold">Priya Shah</p>
        <p className="text-sm text-[#64748B]">Field executive · Northstar Software</p>
        <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
          Actions stay inside this tenant. A system agent cannot read another customer’s workspace.
        </p>
      </div>
      <DeviceControls crm={crm} wide={wide} onChange={onChange} onWide={onWide} onNotify={onNotify} />
      <button type="button" onClick={onReset} className="mt-3 w-full rounded-2xl border border-[#E6EAF2] bg-white py-3 text-sm font-extrabold">
        Reset this field day
      </button>
    </div>
  );
}

function DeviceControls({
  crm,
  wide,
  onChange,
  onWide,
  onNotify,
}: {
  crm: CrmState;
  wide: boolean;
  onChange: (state: CrmState) => void;
  onWide: (wide: boolean) => void;
  onNotify: (message: string) => void;
}) {
  return (
    <div className="mt-3 space-y-2 rounded-3xl bg-white p-4 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#64748B]">This device</p>
      <Toggle
        label="Network"
        hint={crm.online ? "Changes sync now" : "Drafts stay on device"}
        on={crm.online}
        onClick={() => {
          const result = setOnline(crm, !crm.online);
          onChange(result.state);
          if (result.flushed) onNotify(`${result.flushed} queued record${result.flushed === 1 ? "" : "s"} synced`);
        }}
      />
      <Toggle
        label="On-device model"
        hint={crm.modelAvailable ? "Foundation Models / Gemini Nano" : "Structured capture unavailable"}
        on={crm.modelAvailable}
        onClick={() => onChange({ ...crm, modelAvailable: !crm.modelAvailable })}
      />
      <Toggle
        label="Agent platform"
        hint={crm.agentMature ? "Ready for production gating" : "Preview — confirm every change"}
        on={crm.agentMature}
        onClick={() => onChange({ ...crm, agentMature: !crm.agentMature })}
      />
      <Toggle
        label="Foldable workspace"
        hint={wide ? "Field Day uses two panes" : "Phone layout"}
        on={wide}
        onClick={() => onWide(!wide)}
      />
    </div>
  );
}

function Toggle({
  label,
  hint,
  on,
  onClick,
}: {
  label: string;
  hint: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 py-2 text-left">
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold">{label}</span>
        <span className="block text-xs text-[#64748B]">{hint}</span>
      </span>
      <span className={`h-7 w-12 rounded-full p-1 ${on ? "bg-[#1463FF]" : "bg-[#D5DBE7]"}`}>
        <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

function DeviceSheet({
  crm,
  wide,
  onClose,
  onChange,
  onWide,
  onNotify,
}: {
  crm: CrmState;
  wide: boolean;
  onClose: () => void;
  onChange: (state: CrmState) => void;
  onWide: (wide: boolean) => void;
  onNotify: (message: string) => void;
}) {
  return (
    <Sheet title="This device" onClose={onClose}>
      <DeviceControls crm={crm} wide={wide} onChange={onChange} onWide={onWide} onNotify={onNotify} />
      <p className="mt-3 text-xs leading-relaxed text-[#64748B]">
        Capture runs only while you hold the mic. The model is not left listening, which keeps battery use to the note you just spoke.
      </p>
    </Sheet>
  );
}

function CaptureSheet({
  crm,
  onClose,
  onSave,
}: {
  crm: CrmState;
  onClose: () => void;
  onSave: (draft: Draft) => void;
}) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"compose" | "listening" | "review">("compose");
  const [heard, setHeard] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [script, setScript] = useState<string>(VOICE_SCRIPTS[0]);

  useEffect(() => {
    if (phase !== "listening") return;
    const source = text.trim() || script;
    const words = source.split(/\s+/);
    let index = 0;
    let finish = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setHeard(words.slice(0, index).join(" "));
      if (index >= words.length) {
        window.clearInterval(timer);
        finish = window.setTimeout(() => {
          setDraft(extractDraft(source, crm.leads));
          setPhase("review");
        }, 350);
      }
    }, 55);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(finish);
    };
  }, [phase, script, text, crm.leads]);

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#F4F7FB]">
      <header className="flex items-center justify-between px-4 pb-2 pt-4">
        <button type="button" onClick={onClose} className="text-sm font-extrabold text-[#1463FF]">
          Close
        </button>
        <p className="text-sm font-extrabold">On-device capture</p>
        <span className="text-[11px] font-bold text-[#64748B]">{crm.modelAvailable ? "Model on" : "Model off"}</span>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6" data-lenis-prevent>
        {phase === "compose" ? (
          <>
            <p className="text-sm leading-relaxed text-[#465972]">
              Speak the way you would after a meeting. Structure stays on this phone until you save.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {VOICE_SCRIPTS.map((line) => (
                <button
                  key={line}
                  type="button"
                  onClick={() => {
                    setScript(line);
                    setText("");
                  }}
                  className={`rounded-2xl px-3 py-3 text-left text-sm ${
                    !text && script === line ? "bg-[#EAF1FF] font-semibold text-[#0B4FD6]" : "bg-white"
                  }`}
                >
                  {line}
                </button>
              ))}
            </div>
            <label className="mt-4 block text-xs font-extrabold uppercase tracking-[0.14em] text-[#64748B]">
              Or type the note you would speak
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-[#E6EAF2] bg-white p-3 text-base font-medium normal-case tracking-normal outline-none ring-[#1463FF] focus:ring-2"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                const source = text.trim() || script;
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                  setHeard(source);
                  setDraft(extractDraft(source, crm.leads));
                  setPhase("review");
                  return;
                }
                setHeard("");
                setPhase("listening");
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1463FF] py-4 text-sm font-extrabold text-white"
            >
              <MicIcon /> Capture on device
            </button>
          </>
        ) : null}
        {phase === "listening" ? (
          <div className="flex flex-col items-center pt-10">
            <div className="flex h-12 items-end gap-1">
              {Array.from({ length: 16 }).map((_, index) => (
                <span
                  key={index}
                  className="lsq-wave-bar w-1 origin-bottom rounded-full bg-[#1463FF]"
                  style={{
                    height: 28,
                    animation: `lsq-wave 0.8s ${index * 0.05}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
            <p className="mt-6 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-[#1463FF]">
              Listening on device
            </p>
            <p className="mt-3 min-h-24 text-center text-lg font-semibold leading-snug">{heard}</p>
          </div>
        ) : null}
        {phase === "review" && draft ? (
          <DraftReview
            crm={crm}
            draft={draft}
            onChange={setDraft}
            onBack={() => setPhase("compose")}
            onSave={() =>
              onSave(
                crm.modelAvailable
                  ? draft
                  : { ...draft, intent: "note", nextAction: "", stage: null, entities: [] },
              )
            }
          />
        ) : null}
      </div>
    </div>
  );
}

function DraftReview({
  crm,
  draft,
  onChange,
  onBack,
  onSave,
  agent = false,
}: {
  crm: CrmState;
  draft: Draft;
  onChange: (draft: Draft) => void;
  onBack: () => void;
  onSave: () => void;
  agent?: boolean;
}) {
  const lead = leadById(crm, draft.leadId);
  const low = draft.confidence < 0.72;
  const needsLead = draft.intent !== "read_next" && draft.intent !== "call";
  const needsAction = draft.intent === "create_followup" || draft.intent === "log_and_followup";
  const blocked =
    (crm.modelAvailable && needsLead && !draft.leadId) ||
    (crm.modelAvailable && needsAction && !draft.nextAction.trim()) ||
    (draft.intent === "update_stage" && !draft.stage);

  if (!crm.modelAvailable && !agent) {
    return (
      <div>
        <p className="rounded-2xl bg-[#FFF6E8] px-3 py-3 text-sm font-semibold text-[#8A5A00]">
          On-device model unavailable. You can keep the raw note. Structured fields are not guessed.
        </p>
        <p className="mt-3 rounded-2xl bg-white p-3 text-sm leading-relaxed">{draft.transcript}</p>
        <LeadPicker
          leads={crm.leads}
          selected={draft.leadId}
          highlight={draft.candidateLeadIds}
          onSelect={(id) => onChange({ ...draft, leadId: id })}
        />
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onBack} className="flex-1 rounded-2xl border border-[#E6EAF2] py-3 text-sm font-extrabold">
            Back
          </button>
          <button
            type="button"
            disabled={!draft.leadId}
            onClick={onSave}
            className="flex-1 rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white disabled:opacity-40"
          >
            Save raw note
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#64748B]">
          {agent ? "Confirm CRM change" : "Draft for review"}
        </p>
        <p className={`text-xs font-extrabold ${low ? "text-[#C47B00]" : "text-[#128A3E]"}`}>
          {Math.round(draft.confidence * 100)}% sure
        </p>
      </div>
      {low ? (
        <p className="mt-2 rounded-2xl bg-[#FFF6E8] px-3 py-2 text-xs font-semibold text-[#8A5A00]">
          Review carefully. Low-confidence fields are inferences, not facts.
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-[#465972]">{draft.transcript}</p>
      <p className="mt-3 text-sm font-extrabold">{intentLabel(draft.intent)}</p>
      {draft.entities.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {draft.entities.map((entity) => (
            <button
              key={`${entity.label}-${entity.value}`}
              type="button"
              onClick={() =>
                onChange({
                  ...draft,
                  entities: draft.entities.filter((item) => item !== entity),
                })
              }
              className="rounded-full bg-[#EAF1FF] px-2.5 py-1 text-[11px] font-bold text-[#0B4FD6]"
            >
              {entity.label}: {entity.value} ×
            </button>
          ))}
        </div>
      ) : null}
      {needsLead ? (
        <LeadPicker
          leads={crm.leads}
          selected={draft.leadId}
          highlight={draft.candidateLeadIds}
          onSelect={(id) => onChange({ ...draft, leadId: id })}
        />
      ) : null}
      {draft.intent === "update_stage" || draft.stage ? (
        <div className="mt-3">
          <p className="text-xs font-extrabold text-[#64748B]">
            Stage {lead ? `· now ${lead.stage}` : ""}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {STAGES.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => onChange({ ...draft, stage })}
                className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
                  draft.stage === stage ? "bg-[#1463FF] text-white" : "bg-white ring-1 ring-[#E6EAF2]"
                }`}
              >
                {stage}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...draft, stage: null })}
              className="rounded-full px-3 py-1.5 text-[11px] font-extrabold text-[#64748B]"
            >
              Don’t change
            </button>
          </div>
        </div>
      ) : null}
      {needsAction ? (
        <label className="mt-3 block text-xs font-extrabold text-[#64748B]">
          Next action
          <input
            value={draft.nextAction}
            onChange={(event) => onChange({ ...draft, nextAction: event.target.value })}
            className="mt-1 w-full rounded-2xl border border-[#E6EAF2] bg-white px-3 py-3 text-base font-semibold text-[#1D2530] outline-none ring-[#1463FF] focus:ring-2"
          />
        </label>
      ) : null}
      {needsAction ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {WHEN_PRESETS.map((when) => (
            <button
              key={when.label}
              type="button"
              onClick={() => onChange({ ...draft, whenLabel: when.label, whenSort: when.sort })}
              className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
                draft.whenLabel === when.label ? "bg-[#09283D] text-white" : "bg-white ring-1 ring-[#E6EAF2]"
              }`}
            >
              {when.label}
            </button>
          ))}
        </div>
      ) : null}
      <ConsequenceList crm={crm} draft={draft} />
      {draft.warnings.map((warning) => (
        <p key={warning} className="mt-2 text-xs font-semibold text-[#8A5A00]">
          {warning}
        </p>
      ))}
      <p className="mt-3 text-[11px] leading-relaxed text-[#64748B]">
        Names and notes stay on this device until you sync. {crm.online ? "You are online, so a confirmed save writes to Northstar Software." : "You are offline. This queues on the phone."}
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={onBack} className="flex-1 rounded-2xl border border-[#E6EAF2] bg-white py-3 text-sm font-extrabold">
          {agent ? "Edit" : "Back"}
        </button>
        <button
          type="button"
          disabled={blocked}
          onClick={onSave}
          className="flex-1 rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white disabled:opacity-40"
        >
          {crm.online ? "Confirm save" : "Save on device"}
        </button>
      </div>
    </div>
  );
}

function ConsequenceList({ crm, draft }: { crm: CrmState; draft: Draft }) {
  const lead = leadById(crm, draft.leadId);
  const lines: string[] = [];
  if (draft.intent === "log_visit" || draft.intent === "log_and_followup") {
    lines.push(`Activity on ${lead?.company ?? "the lead"} · Visit logged`);
  }
  if (draft.intent === "note") lines.push(`Activity · Field note`);
  if (draft.intent === "check_in") lines.push(`Check in at ${lead?.company ?? "the lead"}`);
  if ((draft.intent === "create_followup" || draft.intent === "log_and_followup") && draft.nextAction.trim()) {
    lines.push(`Task · ${draft.nextAction.trim()} · ${draft.whenLabel ?? "Tomorrow · 10:00 AM"}`);
  }
  if (draft.stage && lead) lines.push(`Stage · ${lead.stage} → ${draft.stage}`);
  if (!lines.length) return null;
  return (
    <ul className="mt-3 space-y-1 rounded-2xl bg-white p-3 text-sm">
      {lines.map((line) => (
        <li key={line} className="font-semibold">
          {line}
        </li>
      ))}
    </ul>
  );
}

function LeadPicker({
  leads,
  selected,
  highlight,
  onSelect,
}: {
  leads: Lead[];
  selected: string | null;
  highlight: string[];
  onSelect: (id: string) => void;
}) {
  const ordered = [...leads].sort((a, b) => {
    const ah = highlight.includes(a.id) ? 0 : 1;
    const bh = highlight.includes(b.id) ? 0 : 1;
    return ah - bh;
  });
  return (
    <div className="mt-3">
      <p className="text-xs font-extrabold text-[#64748B]">Customer</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {ordered.map((lead) => (
          <button
            key={lead.id}
            type="button"
            onClick={() => onSelect(lead.id)}
            className={`rounded-2xl px-3 py-2 text-left text-xs font-extrabold ${
              selected === lead.id ? "bg-[#1463FF] text-white" : "bg-white ring-1 ring-[#E6EAF2]"
            }`}
          >
            {lead.company}
            <span className={`mt-0.5 block font-semibold ${selected === lead.id ? "text-white/80" : "text-[#64748B]"}`}>
              {lead.contact}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AgentSheet({
  crm,
  onClose,
  onCrm,
  onSave,
  onCall,
  onCheckIn,
}: {
  crm: CrmState;
  onClose: () => void;
  onCrm: (state: CrmState) => void;
  onSave: (draft: Draft) => boolean;
  onCall: (leadId: string) => void;
  onCheckIn: (leadId: string) => void;
}) {
  const [command, setCommand] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  function run(text: string) {
    const next = extractDraft(text, crm.leads);
    setCommand(text);
    setAnswer(null);
    if (!crm.permissionsSet) return;
    if (next.intent === "read_next") {
      if (!crm.permissions.readSchedule) {
        setAnswer("Reading the schedule is turned off for the system agent.");
        setDraft(next);
        return;
      }
      setDraft(null);
      setAnswer(describeNext(crm));
      return;
    }
    if (next.intent === "call") {
      setDraft(next);
      setAnswer(next.leadId ? `Call ${leadById(crm, next.leadId)?.contact}?` : "Which customer should I call?");
      return;
    }
    setDraft(next);
  }

  const missing = useMemo(() => {
    if (!draft) return [];
    return requiredPermissions(draft).filter((key) => !crm.permissions[key]);
  }, [draft, crm.permissions]);

  return (
    <Sheet title="System agent" onClose={onClose}>
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1463FF] text-white">
          <Logo light />
        </span>
        <div>
          <p className="text-sm font-extrabold">LeadSquared actions</p>
          <p className="text-[11px] text-[#64748B]">
            {crm.agentMature ? "Siri, Apple Intelligence, AppFunctions" : "Android AppFunctions preview"}
          </p>
        </div>
      </div>
      {!crm.agentMature ? (
        <p className="mt-3 rounded-2xl bg-[#FFF6E8] px-3 py-2 text-xs font-semibold text-[#8A5A00]">
          Platform is in preview. Production rollout stays gated. Every change still needs your confirmation.
        </p>
      ) : null}
      {!crm.permissionsSet ? (
        <div className="mt-3">
          <p className="text-sm leading-relaxed text-[#465972]">
            Allow this device’s assistant to use LeadSquared inside Northstar Software only.
          </p>
          {(Object.keys(crm.permissions) as Array<keyof CrmState["permissions"]>).map((key) => (
            <Toggle
              key={key}
              label={permissionLabel(key)}
              hint="Still confirmed before anything is written"
              on={crm.permissions[key]}
              onClick={() =>
                onCrm({
                  ...crm,
                  permissions: { ...crm.permissions, [key]: !crm.permissions[key] },
                })
              }
            />
          ))}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() =>
                onCrm({
                  ...crm,
                  permissionsSet: true,
                  permissions: {
                    logVisit: false,
                    createTask: false,
                    readSchedule: false,
                    updateStage: false,
                  },
                })
              }
              className="flex-1 rounded-2xl border border-[#E6EAF2] py-3 text-sm font-extrabold"
            >
              Don’t allow
            </button>
            <button
              type="button"
              onClick={() => onCrm({ ...crm, permissionsSet: true })}
              className="flex-1 rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (command.trim()) run(command.trim());
            }}
          >
            <input
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="Log my visit with ABC"
              className="w-full rounded-2xl border border-[#E6EAF2] bg-[#F4F7FB] px-3 py-3 text-base outline-none ring-[#1463FF] focus:ring-2"
            />
          </form>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {AGENT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => run(suggestion)}
                className="rounded-full bg-[#EAF1FF] px-3 py-1.5 text-left text-[11px] font-extrabold text-[#0B4FD6]"
              >
                {suggestion}
              </button>
            ))}
          </div>
          {answer ? <p className="mt-3 rounded-2xl bg-[#EAF1FF] p-3 text-sm font-semibold text-[#0B4FD6]">{answer}</p> : null}
          {draft?.intent === "call" && draft.leadId ? (
            <button
              type="button"
              onClick={() => onCall(draft.leadId!)}
              className="mt-3 w-full rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white"
            >
              Call {leadById(crm, draft.leadId)?.contact}
            </button>
          ) : null}
          {draft && draft.intent !== "read_next" && draft.intent !== "call" ? (
            missing.length ? (
              <div className="mt-3 rounded-2xl bg-[#FFF6E8] p-3">
                <p className="text-sm font-semibold text-[#8A5A00]">This action is not shared with the agent.</p>
                <button
                  type="button"
                  onClick={() => {
                    const permissions = { ...crm.permissions };
                    missing.forEach((key) => {
                      permissions[key] = true;
                    });
                    onCrm({ ...crm, permissions });
                  }}
                  className="mt-2 text-sm font-extrabold text-[#0B4FD6]"
                >
                  Allow {missing.map(permissionLabel).join(", ")}
                </button>
              </div>
            ) : draft.intent === "check_in" ? (
              <div className="mt-3">
                <LeadPicker
                  leads={crm.leads}
                  selected={draft.leadId}
                  highlight={draft.candidateLeadIds}
                  onSelect={(id) => setDraft({ ...draft, leadId: id })}
                />
                <button
                  type="button"
                  disabled={!draft.leadId}
                  onClick={() => draft.leadId && onCheckIn(draft.leadId)}
                  className="mt-3 w-full rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white disabled:opacity-40"
                >
                  Confirm check-in
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <DraftReview
                  crm={crm}
                  draft={draft}
                  agent
                  onChange={setDraft}
                  onBack={() => setDraft(null)}
                  onSave={() => {
                    const saved = onSave(draft);
                    if (saved) {
                      setDraft(null);
                      setCommand("");
                    }
                  }}
                />
              </div>
            )
          ) : null}
        </div>
      )}
    </Sheet>
  );
}

function LockScreen({
  crm,
  visit,
  lead,
  navigating,
  onUnlock,
  onNavigate,
  onCall,
  onCheckIn,
  onComplete,
}: {
  crm: CrmState;
  visit?: Visit;
  lead?: Lead;
  navigating: boolean;
  onUnlock: () => void;
  onNavigate: (id: string) => void;
  onCall: (id: string) => void;
  onCheckIn: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[radial-gradient(120%_80%_at_50%_120%,#1d4e89,transparent_55%),linear-gradient(#071422,#123056)] text-white">
      <p className="pt-16 text-center text-7xl font-semibold tracking-tight">11:18</p>
      <p className="text-center text-sm font-semibold text-white/80">Wednesday, 23 September</p>
      <div className="px-4 pt-8">
        {visit && lead ? (
          <div className="rounded-[28px] bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/70">
              <Logo light />
              Field Day · {crm.online ? "Live" : "On device"}
            </div>
            <p className="mt-2 text-lg font-extrabold">{lead.company}</p>
            <p className="text-sm text-white/80">
              {lead.contact} · {visit.startLabel} · {lead.area}
            </p>
            <p className="mt-1 text-xs font-bold text-[#B6FFD2]">
              {visit.status === "checked_in" ? "Checked in" : navigating ? "On the way" : "Not checked in"}
            </p>
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              <CardAction label="Navigate" onClick={() => onNavigate(lead.id)} />
              <CardAction label="Call" onClick={() => onCall(lead.id)} />
              <CardAction label="Check in" onClick={() => onCheckIn(lead.id)} />
              <CardAction label="Done" onClick={() => onComplete(lead.id)} />
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-white/80">No visit left on today’s Field Day.</p>
        )}
      </div>
      <button type="button" onClick={onUnlock} className="mb-8 mt-auto text-sm font-extrabold text-white/90">
        Open LeadSquared
      </button>
    </div>
  );
}

function RouteSheet({
  lead,
  onClose,
  onStart,
}: {
  lead?: Lead;
  onClose: () => void;
  onStart: (id: string) => void;
}) {
  if (!lead) return null;
  return (
    <Sheet title="Navigate" onClose={onClose}>
      <svg viewBox="0 0 320 160" className="h-36 w-full rounded-2xl bg-[#EAF1FF]">
        <path d="M20 120 C 80 120, 90 40, 160 48 S 250 120, 300 36" fill="none" stroke="#1463FF" strokeWidth="6" strokeLinecap="round" />
        <circle cx="20" cy="120" r="6" fill="#09283D" />
        <circle cx="300" cy="36" r="6" fill="#1463FF" />
      </svg>
      <p className="mt-3 text-lg font-extrabold">{lead.company}</p>
      <p className="text-sm text-[#64748B]">{lead.address}</p>
      <p className="mt-1 text-sm font-bold text-[#1463FF]">8 min · {lead.distance}</p>
      <button
        type="button"
        onClick={() => onStart(lead.id)}
        className="mt-4 w-full rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white"
      >
        Start navigation
      </button>
    </Sheet>
  );
}

function CallSheet({
  lead,
  onClose,
  onLog,
}: {
  lead?: Lead;
  onClose: () => void;
  onLog: (id: string) => void;
}) {
  const [live, setLive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    const ring = window.setTimeout(() => setLive(true), 900);
    return () => window.clearTimeout(ring);
  }, []);
  useEffect(() => {
    if (!live || ended) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [live, ended]);
  if (!lead) return null;
  const clock = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#09283D] px-6 py-8 text-white">
      <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-white/60">
        {ended ? "Call ended" : live ? "Connected" : "Calling"}
      </p>
      <div className="mt-10 flex flex-col items-center">
        <Avatar name={lead.contact} large light />
        <h2 className="mt-4 text-2xl font-extrabold">{lead.contact}</h2>
        <p className="text-sm text-white/70">{lead.company}</p>
        <p className="mt-2 text-sm font-semibold">{ended ? clock : live ? clock : lead.phone}</p>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-3">
        {ended ? (
          <>
            <button type="button" onClick={onClose} className="rounded-2xl bg-white/10 py-3 text-sm font-extrabold">
              Don’t log
            </button>
            <button type="button" onClick={() => onLog(lead.id)} className="rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold">
              Log call
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEnded(true)}
            className="col-span-2 rounded-2xl bg-[#E11D48] py-3 text-sm font-extrabold"
          >
            End call
          </button>
        )}
      </div>
    </div>
  );
}

function ConfirmAction({
  crm,
  pending,
  onCancel,
  onConfirm,
}: {
  crm: CrmState;
  pending: Pending;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const lead = leadById(crm, pending.leadId);
  if (!lead) return null;
  const title =
    pending.kind === "checkin"
      ? `Check in at ${lead.company}?`
      : pending.kind === "complete"
        ? `Complete the ${lead.company} visit?`
        : `Move ${lead.company} to ${pending.kind === "stage" ? pending.stage : ""}?`;
  const body =
    pending.kind === "stage"
      ? `${lead.stage} → ${pending.stage}. This writes a stage activity.`
      : "This writes a field activity on the lead.";
  return (
    <Sheet title="Confirm" onClose={onCancel}>
      <h3 className="text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm text-[#64748B]">{body}</p>
      <p className="mt-2 text-xs text-[#64748B]">
        {crm.online ? "You are online. This syncs to Northstar Software." : "You are offline. This queues on the phone."}
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={onCancel} className="flex-1 rounded-2xl border border-[#E6EAF2] py-3 text-sm font-extrabold">
          Cancel
        </button>
        <button type="button" onClick={onConfirm} className="flex-1 rounded-2xl bg-[#1463FF] py-3 text-sm font-extrabold text-white">
          Confirm
        </button>
      </div>
    </Sheet>
  );
}

function Sheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-[#09283D]/45">
      <button type="button" aria-label={`Close ${title}`} className="min-h-8 flex-1" onClick={onClose} />
      <div className="max-h-[88%] overflow-y-auto rounded-t-[28px] bg-[#F4F7FB] px-4 pb-6 pt-3" data-lenis-prevent>
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#D5DBE7]" />
        <h2 className="text-base font-extrabold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4">
      <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#64748B]">{title}</h3>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <article className="rounded-2xl bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-extrabold">{activity.title}</p>
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A93A3]">
          {activity.source}
          {activity.sync === "on_device" ? " · queued" : ""}
        </p>
      </div>
      <p className="mt-1 text-sm text-[#465972]">{activity.body}</p>
      <p className="mt-1 text-[11px] text-[#8A93A3]">{activity.atLabel}</p>
    </article>
  );
}

function TaskRow({ task, lead }: { task: Task; lead: Lead }) {
  return (
    <article className="rounded-2xl bg-white p-3 text-sm shadow-sm">
      <p className="font-extrabold">{task.title}</p>
      <p className="text-xs text-[#64748B]">
        {lead.company} · {task.dueLabel}
      </p>
    </article>
  );
}

function StagePill({ stage, light = false }: { stage: Stage; light?: boolean }) {
  return (
    <span
      className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
        light ? "bg-white/20 text-white" : "bg-[#EAF1FF] text-[#0B4FD6]"
      }`}
    >
      {stage}
    </span>
  );
}

function Avatar({ name, large = false, light = false }: { name: string; large?: boolean; light?: boolean }) {
  const letters = name
    .split(" ")
    .filter((part) => part && part !== "Dr.")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-extrabold ${
        large ? "h-14 w-14 text-base" : "h-10 w-10 text-xs"
      } ${light ? "bg-white/15 text-white" : "bg-[#EAF1FF] text-[#1463FF]"}`}
    >
      {letters}
    </span>
  );
}

function MiniAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-2xl bg-white py-3 text-xs font-extrabold shadow-sm">
      {label}
    </button>
  );
}

function visitStatusLabel(status: Visit["status"]) {
  if (status === "checked_in") return "Checked in";
  if (status === "completed") return "Completed";
  return "Upcoming";
}

function LockIcon({ online, queued }: { online: boolean; queued: number }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="11" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
      {online && !queued ? <circle cx="18" cy="6" r="2" fill="#128A3E" /> : null}
      {!online || queued ? <circle cx="18" cy="6" r="2" fill="#C47B00" /> : null}
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 11a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NavIcon({ name }: { name: Screen }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };
  if (name === "field") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "leads") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 19c1.5-3 3.8-4.5 7-4.5S17.5 16 19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "tasks") {
    return (
      <svg {...common}>
        <path d="M8 7h11M8 12h11M8 17h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 7h.01M4 12h.01M4 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="6" cy="12" r="1.2" fill="currentColor" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
