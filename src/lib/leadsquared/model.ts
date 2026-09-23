/** Demo clock is fixed so "tomorrow" and weekdays stay stable. */
export const DEMO_NOW = new Date("2026-09-23T11:18:00+05:30");

export type Stage =
  | "Qualification"
  | "Demo scheduled"
  | "Proposal"
  | "Negotiation"
  | "Won";

export type VisitStatus = "upcoming" | "checked_in" | "completed";

export type SyncState = "on_device" | "synced";

export type Intent =
  | "log_visit"
  | "create_followup"
  | "log_and_followup"
  | "check_in"
  | "update_stage"
  | "read_next"
  | "call"
  | "note";

export type Entity = { label: string; value: string };

export type Lead = {
  id: string;
  company: string;
  shortName: string;
  contact: string;
  role: string;
  phone: string;
  address: string;
  area: string;
  distance: string;
  stage: Stage;
  aliases: string[];
};

export type Visit = {
  id: string;
  leadId: string;
  startLabel: string;
  endLabel: string;
  sort: number;
  status: VisitStatus;
};

export type Activity = {
  id: string;
  leadId: string;
  title: string;
  body: string;
  source: "voice" | "agent" | "field";
  sync: SyncState;
  atLabel: string;
};

export type Task = {
  id: string;
  leadId: string;
  title: string;
  dueLabel: string;
  sort: number;
  done: boolean;
  source: "voice" | "agent" | "field";
  sync: SyncState;
};

export type CrmState = {
  leads: Lead[];
  visits: Visit[];
  activities: Activity[];
  tasks: Task[];
  online: boolean;
  modelAvailable: boolean;
  agentMature: boolean;
  permissions: {
    logVisit: boolean;
    createTask: boolean;
    readSchedule: boolean;
    updateStage: boolean;
  };
  permissionsSet: boolean;
};

export type Draft = {
  transcript: string;
  intent: Intent;
  leadId: string | null;
  candidateLeadIds: string[];
  entities: Entity[];
  nextAction: string;
  whenLabel: string | null;
  whenSort: number | null;
  stage: Stage | null;
  confidence: number;
  warnings: string[];
  pii: boolean;
};

export const STAGES: Stage[] = [
  "Qualification",
  "Demo scheduled",
  "Proposal",
  "Negotiation",
  "Won",
];

export const VOICE_SCRIPTS = [
  "Just met Ananya at Horizon Foods. They want the sales CRM for about forty reps and asked for a proposal tomorrow morning. Budget is approved this quarter.",
  "Log my visit with ABC Industries. Rahul wants a demo next Tuesday. Move them to demo scheduled.",
  "Remind me to call Dr. Iyer at Northwind on Friday about the contract.",
] as const;

export const AGENT_SUGGESTIONS = [
  "Log my visit with ABC",
  "Create a follow-up for tomorrow",
  "What's my next task?",
  "Check in at Horizon Foods",
  "Update ABC Industries to proposal",
] as const;

const NUMBER_WORDS: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  ten: "10",
  twenty: "20",
  thirty: "30",
  forty: "40",
  fifty: "50",
  sixty: "60",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatClock(date: Date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const hr = ((h + 11) % 12) + 1;
  return `${hr}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}

function atTime(base: Date, hours: number, minutes = 0) {
  const d = new Date(base);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

function nextWeekday(from: Date, weekday: number, explicitNext: boolean) {
  const current = from.getDay();
  let delta = (weekday - current + 7) % 7;
  if (delta === 0 || explicitNext) {
    if (explicitNext && delta === 0) delta = 7;
  }
  return addDays(from, delta === 0 ? 7 : delta);
}

export function dayLabel(date: Date, now = DEMO_NOW) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - start.getTime()) / 86400000);
  const time = formatClock(date);
  if (diff === 0) return `Today · ${time}`;
  if (diff === 1) return `Tomorrow · ${time}`;
  const weekday = date.toLocaleDateString("en-IN", { weekday: "short" });
  const day = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return `${weekday} ${day} · ${time}`;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasPhrase(text: string, phrase: string) {
  return ` ${normalize(text)} `.includes(` ${normalize(phrase)} `);
}

function parseWhen(text: string, now = DEMO_NOW): { label: string; sort: number } | null {
  const n = normalize(text);
  let day = new Date(now);
  let matched = false;
  const explicitNext = /\bnext\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/.test(
    n,
  );

  if (/\btomorrow\b/.test(n)) {
    day = addDays(now, 1);
    matched = true;
  } else {
    for (let i = 0; i < WEEKDAYS.length; i += 1) {
      if (hasPhrase(n, WEEKDAYS[i]) || n.includes(`next ${WEEKDAYS[i]}`)) {
        day = nextWeekday(now, i, explicitNext || n.includes(`next ${WEEKDAYS[i]}`));
        matched = true;
        break;
      }
    }
  }

  if (!matched && !/\b(morning|afternoon|evening|am|pm)\b/.test(n) && !/\b\d{1,2}(:\d{2})?\s*(am|pm)\b/.test(n)) {
    return null;
  }

  let hours = 10;
  let minutes = 0;
  const clock = n.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/);
  if (clock) {
    hours = Number(clock[1]) % 12;
    minutes = clock[2] ? Number(clock[2]) : 0;
    if (clock[3] === "pm") hours += 12;
    matched = true;
  } else if (/\bafternoon\b/.test(n)) {
    hours = 14;
    matched = true;
  } else if (/\bevening\b/.test(n)) {
    hours = 17;
    matched = true;
  } else if (/\bmorning\b/.test(n)) {
    hours = 10;
    matched = true;
  }

  if (!matched) return null;
  const when = atTime(day, hours, minutes);
  return { label: dayLabel(when, now), sort: when.getTime() };
}

function parseStage(text: string): Stage | null {
  const n = normalize(text);
  if (n.includes("demo scheduled") || n.includes("to demo") || n.includes("demo stage")) {
    return "Demo scheduled";
  }
  if (n.includes("proposal")) return "Proposal";
  if (n.includes("negotiation")) return "Negotiation";
  if (n.includes("qualification")) return "Qualification";
  if (/\bwon\b/.test(n)) return "Won";
  return null;
}

function extractEntities(text: string): Entity[] {
  const entities: Entity[] = [];
  const n = normalize(text);
  const size = n.match(
    /\b(one|two|three|four|five|ten|twenty|thirty|forty|fifty|sixty|\d+)\s+(reps|seats|users|executives|people)\b/,
  );
  if (size) {
    const raw = size[1];
    const count = NUMBER_WORDS[raw] ?? raw;
    entities.push({ label: "Team size", value: `${count} ${size[2]}` });
  }
  if (/\bbudget\b/.test(n) && /\bquarter\b/.test(n)) {
    entities.push({
      label: "Commercial",
      value: n.includes("approved")
        ? "Budget approved this quarter"
        : "Budget discussed this quarter",
    });
  } else if (/\bbudget is approved\b/.test(n) || /\bbudget approved\b/.test(n)) {
    entities.push({ label: "Commercial", value: "Budget approved" });
  }
  if (/\bproposal\b/.test(n)) entities.push({ label: "Ask", value: "Proposal" });
  if (/\bdemo\b/.test(n)) entities.push({ label: "Ask", value: "Demo" });
  if (/\bcontract\b/.test(n)) entities.push({ label: "Ask", value: "Contract" });
  if (/\bpricing\b/.test(n)) entities.push({ label: "Ask", value: "Pricing" });
  if (/\bsales crm\b/.test(n)) entities.push({ label: "Product", value: "Sales CRM" });
  return entities;
}

function inferNextAction(text: string, lead: Lead | undefined, intent: Intent): string {
  const n = normalize(text);
  if (/\bproposal\b/.test(n)) return "Send proposal";
  if (/\bdemo\b/.test(n)) return "Book a demo";
  if (/\bcontract\b/.test(n)) return "Follow up on the contract";
  if (/\bpricing\b/.test(n)) return "Share pricing";
  if (/\b(call|remind)\b/.test(n)) {
    return lead ? `Call ${lead.contact}` : "Call the customer";
  }
  if (intent === "create_followup" || intent === "log_and_followup") return "Follow up";
  return "";
}

function detectIntent(text: string): Intent {
  const n = normalize(text);
  if (
    /\b(what s my next|whats my next|next task|next visit|next customer|what is next)\b/.test(n)
  ) {
    return "read_next";
  }
  if (/\bcheck in\b/.test(n)) return "check_in";

  const stage = parseStage(text);
  const stageMove = /\b(move|update|mark)\b/.test(n) && Boolean(stage);
  const log = /\b(log|logged|visit|met|meeting)\b/.test(n);
  const follow =
    /\b(follow up|followup|remind|schedule)\b/.test(n) ||
    /\btomorrow\b/.test(n) ||
    (/\b(proposal|demo|contract|pricing)\b/.test(n) && !stageMove);

  if (stageMove && !log) return "update_stage";
  if (log && (follow || stageMove)) return "log_and_followup";
  if (log) return "log_visit";
  if (follow) return "create_followup";
  if (/^\s*call\b/.test(n) || (/\bgive\b/.test(n) && /\bcall\b/.test(n))) return "call";
  return "note";
}

function matchLeads(text: string, leads: Lead[]) {
  const hits = leads.filter((lead) =>
    [lead.company, lead.shortName, lead.contact, ...lead.aliases].some((alias) =>
      hasPhrase(text, alias),
    ),
  );
  const unique = [...new Map(hits.map((lead) => [lead.id, lead])).values()];
  return unique;
}

export function extractDraft(transcript: string, leads: Lead[], now = DEMO_NOW): Draft {
  const intent = detectIntent(transcript);
  const matched = matchLeads(transcript, leads);
  const lead = matched.length === 1 ? matched[0] : undefined;
  const when = parseWhen(transcript, now);
  const entities = extractEntities(transcript);
  const stageFromText = parseStage(transcript);
  const wantsStageChange = /\b(move|update|mark)\b/.test(normalize(transcript));
  const stage = wantsStageChange ? stageFromText : null;
  const nextAction =
    intent === "read_next" || intent === "check_in" || intent === "call" || intent === "log_visit"
      ? ""
      : inferNextAction(transcript, lead, intent);

  const warnings: string[] = [];
  let confidence = 0.42;

  if (matched.length === 1) confidence += 0.28;
  else if (matched.length > 1) {
    confidence -= 0.1;
    warnings.push("More than one customer matches. Pick the right lead.");
  } else if (intent !== "read_next") {
    warnings.push("No customer matched. Choose a lead before saving.");
  }

  if (intent !== "note") confidence += 0.16;
  else warnings.push("Intent is unclear. Review the draft or discard it.");

  if (when) confidence += 0.08;
  if (entities.length) confidence += 0.08;

  if ((intent === "create_followup" || intent === "log_and_followup") && nextAction === "Follow up") {
    warnings.push("Next step is generic. Edit it if you know the specific action.");
    confidence -= 0.06;
  }

  if (intent === "update_stage" && !stage) {
    warnings.push("No stage was named. Pick one before confirming.");
    confidence -= 0.12;
  }

  const pii = /(\+?\d[\d\s-]{8,}\d)|([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i.test(transcript);
  if (pii) warnings.push("Contact details stay on this device until you sync.");

  confidence = Math.max(0.2, Math.min(0.96, confidence));

  return {
    transcript: transcript.trim(),
    intent,
    leadId: lead?.id ?? null,
    candidateLeadIds: matched.map((item) => item.id),
    entities,
    nextAction,
    whenLabel: when?.label ?? null,
    whenSort: when?.sort ?? null,
    stage,
    confidence,
    warnings,
    pii,
  };
}

export function intentLabel(intent: Intent) {
  switch (intent) {
    case "log_visit":
      return "Log visit";
    case "create_followup":
      return "Create follow-up";
    case "log_and_followup":
      return "Log visit and follow-up";
    case "check_in":
      return "Check in";
    case "update_stage":
      return "Update stage";
    case "read_next":
      return "Read schedule";
    case "call":
      return "Call";
    default:
      return "Note";
  }
}

export function nextVisit(state: CrmState) {
  return state.visits
    .filter((visit) => visit.status !== "completed")
    .slice()
    .sort((a, b) => a.sort - b.sort)[0];
}

export function leadById(state: CrmState, id: string | null) {
  if (!id) return undefined;
  return state.leads.find((lead) => lead.id === id);
}

export function describeNext(state: CrmState) {
  const visit = nextVisit(state);
  if (!visit) {
    const task = state.tasks
      .filter((item) => !item.done)
      .slice()
      .sort((a, b) => a.sort - b.sort)[0];
    if (!task) return "Nothing else is scheduled today.";
    const lead = leadById(state, task.leadId);
    return `Next task is “${task.title}” for ${lead?.company ?? "a lead"} · ${task.dueLabel}.`;
  }
  const lead = leadById(state, visit.leadId);
  if (!lead) return "Next visit is on the schedule.";
  const status =
    visit.status === "checked_in" ? "Checked in" : "Not checked in";
  return `Next up is ${lead.company} at ${visit.startLabel}. ${lead.contact}, ${lead.area}. ${status}.`;
}

let seq = 100;

function nid(prefix: string) {
  seq += 1;
  return `${prefix}-${seq}`;
}

export function syncOf(online: boolean): SyncState {
  return online ? "synced" : "on_device";
}

export type ApplyResult = {
  state: CrmState;
  summary: string;
};

function withSync<T extends { sync: SyncState }>(items: T[], online: boolean): T[] {
  if (!online) return items;
  return items.map((item) => (item.sync === "on_device" ? { ...item, sync: "synced" } : item));
}

export function setOnline(state: CrmState, online: boolean): { state: CrmState; flushed: number } {
  if (!online) return { state: { ...state, online }, flushed: 0 };
  const pending =
    state.activities.filter((item) => item.sync === "on_device").length +
    state.tasks.filter((item) => item.sync === "on_device").length;
  return {
    state: {
      ...state,
      online,
      activities: withSync(state.activities, true),
      tasks: withSync(state.tasks, true),
    },
    flushed: pending,
  };
}

export function applyDraft(
  state: CrmState,
  draft: Draft,
  source: "voice" | "agent",
): ApplyResult {
  const lead = leadById(state, draft.leadId);
  if (!lead && draft.intent !== "read_next") {
    return { state, summary: "Choose a customer before saving." };
  }

  const sync = syncOf(state.online);
  const atLabel = dayLabel(DEMO_NOW);
  let leads = state.leads;
  let visits = state.visits;
  let activities = state.activities;
  let tasks = state.tasks;
  const parts: string[] = [];

  const writesVisit =
    draft.intent === "log_visit" ||
    draft.intent === "log_and_followup" ||
    draft.intent === "note" ||
    draft.intent === "check_in";

  if (writesVisit && lead) {
    const title =
      draft.intent === "check_in"
        ? "Checked in"
        : draft.intent === "note"
          ? "Field note"
          : "Visit logged";
    activities = [
      {
        id: nid("act"),
        leadId: lead.id,
        title,
        body: draft.transcript,
        source,
        sync,
        atLabel,
      },
      ...activities,
    ];
    parts.push(`${title} on ${lead.company}`);
  }

  if (draft.intent === "check_in" && lead) {
    const open = state.visits.find((visit) => visit.leadId === lead.id && visit.status !== "completed");
    if (!open) return { state, summary: `${lead.company} has no open visit.` };
    if (open.status === "checked_in") {
      return { state, summary: `Already checked in at ${lead.company}.` };
    }
    visits = visits.map((visit) =>
      visit.id === open.id ? { ...visit, status: "checked_in" } : visit,
    );
  }

  const writesTask =
    (draft.intent === "create_followup" || draft.intent === "log_and_followup") &&
    draft.nextAction.trim().length > 0;

  if (writesTask && lead) {
    const due = draft.whenLabel ?? dayLabel(addDays(DEMO_NOW, 1));
    const sort = draft.whenSort ?? addDays(DEMO_NOW, 1).getTime();
    tasks = [
      {
        id: nid("task"),
        leadId: lead.id,
        title: draft.nextAction.trim(),
        dueLabel: due,
        sort,
        done: false,
        source,
        sync,
      },
      ...tasks,
    ];
    parts.push(`Task “${draft.nextAction.trim()}” · ${due}`);
  }

  if (draft.stage && lead && draft.stage !== lead.stage) {
    const from = lead.stage;
    leads = leads.map((item) => (item.id === lead.id ? { ...item, stage: draft.stage! } : item));
    activities = [
      {
        id: nid("act"),
        leadId: lead.id,
        title: "Stage updated",
        body: `${from} → ${draft.stage}`,
        source,
        sync,
        atLabel,
      },
      ...activities,
    ];
    parts.push(`Stage ${from} → ${draft.stage}`);
  }

  if (!parts.length) {
    return { state, summary: "Nothing to save. Add a next step or pick an action." };
  }

  return {
    state: { ...state, leads, visits, activities, tasks },
    summary: parts.join(" · "),
  };
}

export function checkIn(state: CrmState, leadId: string): ApplyResult {
  const lead = leadById(state, leadId);
  if (!lead) return { state, summary: "Lead not found." };
  const visit = state.visits.find((item) => item.leadId === leadId && item.status !== "completed");
  if (!visit) return { state, summary: `${lead.company} has no open visit.` };
  if (visit.status === "checked_in") return { state, summary: `Already checked in at ${lead.company}.` };
  const sync = syncOf(state.online);
  return {
    state: {
      ...state,
      visits: state.visits.map((item) =>
        item.id === visit.id ? { ...item, status: "checked_in" } : item,
      ),
      activities: [
        {
          id: nid("act"),
          leadId,
          title: "Checked in",
          body: `${lead.address}. Field check-in from Field Day.`,
          source: "field",
          sync,
          atLabel: dayLabel(DEMO_NOW),
        },
        ...state.activities,
      ],
    },
    summary: `Checked in at ${lead.company}`,
  };
}

export function completeVisit(state: CrmState, leadId: string): ApplyResult {
  const lead = leadById(state, leadId);
  if (!lead) return { state, summary: "Lead not found." };
  const visit = state.visits.find((item) => item.leadId === leadId && item.status !== "completed");
  if (!visit) return { state, summary: `${lead.company} has no open visit.` };
  const sync = syncOf(state.online);
  return {
    state: {
      ...state,
      visits: state.visits.map((item) =>
        item.id === visit.id ? { ...item, status: "completed" } : item,
      ),
      activities: [
        {
          id: nid("act"),
          leadId,
          title: "Visit completed",
          body: `Visit marked complete from Field Day.`,
          source: "field",
          sync,
          atLabel: dayLabel(DEMO_NOW),
        },
        ...state.activities,
      ],
    },
    summary: `${lead.company} visit completed`,
  };
}

export function setStage(state: CrmState, leadId: string, stage: Stage): ApplyResult {
  const lead = leadById(state, leadId);
  if (!lead) return { state, summary: "Lead not found." };
  if (lead.stage === stage) return { state, summary: `${lead.company} is already in ${stage}.` };
  const sync = syncOf(state.online);
  return {
    state: {
      ...state,
      leads: state.leads.map((item) => (item.id === leadId ? { ...item, stage } : item)),
      activities: [
        {
          id: nid("act"),
          leadId,
          title: "Stage updated",
          body: `${lead.stage} → ${stage}`,
          source: "field",
          sync,
          atLabel: dayLabel(DEMO_NOW),
        },
        ...state.activities,
      ],
    },
    summary: `${lead.company}: ${lead.stage} → ${stage}`,
  };
}

export function completeTask(state: CrmState, taskId: string): CrmState {
  return {
    ...state,
    tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, done: true } : task)),
  };
}

export function requiredPermissions(draft: Draft): Array<keyof CrmState["permissions"]> {
  const keys: Array<keyof CrmState["permissions"]> = [];
  if (
    draft.intent === "log_visit" ||
    draft.intent === "log_and_followup" ||
    draft.intent === "note" ||
    draft.intent === "check_in"
  ) {
    keys.push("logVisit");
  }
  if (draft.intent === "create_followup" || draft.intent === "log_and_followup") {
    keys.push("createTask");
  }
  if (draft.stage) keys.push("updateStage");
  if (draft.intent === "read_next") keys.push("readSchedule");
  return keys;
}

export function presetWhens(now = DEMO_NOW) {
  return [
    atTime(addDays(now, 1), 10),
    atTime(addDays(now, 1), 14),
    atTime(nextWeekday(now, 5, false), 11),
    atTime(nextWeekday(now, 2, true), 15),
  ].map((date) => ({ label: dayLabel(date, now), sort: date.getTime() }));
}

export function logFieldNote(
  state: CrmState,
  leadId: string,
  title: string,
  body: string,
  source: Activity["source"] = "field",
): ApplyResult {
  const lead = leadById(state, leadId);
  if (!lead) return { state, summary: "Lead not found." };
  return {
    state: {
      ...state,
      activities: [
        {
          id: nid("act"),
          leadId,
          title,
          body,
          source,
          sync: syncOf(state.online),
          atLabel: dayLabel(DEMO_NOW),
        },
        ...state.activities,
      ],
    },
    summary: `${title} saved on ${lead.company}`,
  };
}

export function permissionLabel(key: keyof CrmState["permissions"]) {
  switch (key) {
    case "logVisit":
      return "Log visits and check-ins";
    case "createTask":
      return "Create tasks";
    case "readSchedule":
      return "Read today’s schedule";
    case "updateStage":
      return "Update lead stage";
  }
}

export function seedState(): CrmState {
  return {
    online: true,
    modelAvailable: true,
    agentMature: true,
    permissionsSet: false,
    permissions: {
      logVisit: true,
      createTask: true,
      readSchedule: true,
      updateStage: true,
    },
    leads: [
      {
        id: "horizon",
        company: "Horizon Foods",
        shortName: "Horizon",
        contact: "Ananya Rao",
        role: "VP Sales",
        phone: "+91 98450 11220",
        address: "42, 4th Block, Koramangala, Bengaluru",
        area: "Koramangala",
        distance: "2.4 km",
        stage: "Proposal",
        aliases: ["horizon foods", "horizon", "ananya", "ananya rao"],
      },
      {
        id: "abc",
        company: "ABC Industries",
        shortName: "ABC",
        contact: "Rahul Mehta",
        role: "Head of Growth",
        phone: "+91 98200 44118",
        address: "100 Feet Road, Indiranagar, Bengaluru",
        area: "Indiranagar",
        distance: "6.1 km",
        stage: "Qualification",
        aliases: ["abc industries", "abc", "rahul", "rahul mehta"],
      },
      {
        id: "northwind",
        company: "Northwind Clinics",
        shortName: "Northwind",
        contact: "Dr. Meera Iyer",
        role: "Director",
        phone: "+91 99000 22841",
        address: "ITPL Main Road, Whitefield, Bengaluru",
        area: "Whitefield",
        distance: "14 km",
        stage: "Negotiation",
        aliases: ["northwind clinics", "northwind", "dr iyer", "meera iyer", "iyer"],
      },
      {
        id: "brightpath",
        company: "BrightPath Schools",
        shortName: "BrightPath",
        contact: "Kabir Sen",
        role: "Operations Lead",
        phone: "+91 97410 33012",
        address: "11th Main, Jayanagar, Bengaluru",
        area: "Jayanagar",
        distance: "4.8 km",
        stage: "Demo scheduled",
        aliases: ["brightpath schools", "brightpath", "kabir", "kabir sen"],
      },
    ],
    visits: [
      {
        id: "v-horizon",
        leadId: "horizon",
        startLabel: "11:30 AM",
        endLabel: "12:15 PM",
        sort: new Date("2026-09-23T11:30:00+05:30").getTime(),
        status: "upcoming",
      },
      {
        id: "v-abc",
        leadId: "abc",
        startLabel: "2:00 PM",
        endLabel: "2:45 PM",
        sort: new Date("2026-09-23T14:00:00+05:30").getTime(),
        status: "upcoming",
      },
      {
        id: "v-north",
        leadId: "northwind",
        startLabel: "4:30 PM",
        endLabel: "5:15 PM",
        sort: new Date("2026-09-23T16:30:00+05:30").getTime(),
        status: "upcoming",
      },
    ],
    activities: [
      {
        id: "act-seed",
        leadId: "horizon",
        title: "Discovery call",
        body: "Ananya asked for a security review before procurement.",
        source: "field",
        sync: "synced",
        atLabel: "Yesterday · 4:10 PM",
      },
    ],
    tasks: [
      {
        id: "task-seed",
        leadId: "brightpath",
        title: "Send demo recording",
        dueLabel: "Tomorrow · 10:00 AM",
        sort: new Date("2026-09-24T10:00:00+05:30").getTime(),
        done: false,
        source: "field",
        sync: "synced",
      },
    ],
  };
}
