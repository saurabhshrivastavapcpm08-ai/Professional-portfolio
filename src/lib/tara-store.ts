export type JobStatus = "open" | "paused" | "closed";
export type CandidateStage = "sourced" | "screen" | "interview" | "offer";

export type Job = {
  id: string;
  title: string;
  department: string;
  status: JobStatus;
  candidate_count: number;
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  stage: CandidateStage;
  score: number;
};

const jobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Recruiter",
    department: "Talent",
    status: "open",
    candidate_count: 3,
  },
  {
    id: "job-2",
    title: "Staff Engineer",
    department: "Engineering",
    status: "open",
    candidate_count: 2,
  },
];

const candidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Alex Rivera",
    role: "Staff Engineer",
    stage: "interview",
    score: 88,
  },
  {
    id: "cand-2",
    name: "Jordan Lee",
    role: "Senior Recruiter",
    stage: "screen",
    score: 76,
  },
  {
    id: "cand-3",
    name: "Sam Patel",
    role: "Staff Engineer",
    stage: "sourced",
    score: 71,
  },
];

export function listJobs(): Job[] {
  return jobs.map((job) => ({ ...job }));
}

export function listCandidates(): Candidate[] {
  return [...candidates].sort((a, b) => b.score - a.score);
}

export function createCandidate(name: string, role: string): Candidate {
  const candidate: Candidate = {
    id: `cand-${crypto.randomUUID().slice(0, 8)}`,
    name,
    role,
    stage: "sourced",
    score: 65,
  };
  candidates.push(candidate);
  for (const job of jobs) {
    if (job.title === role || role.includes(job.title) || job.title.includes(role)) {
      job.candidate_count += 1;
    }
  }
  return candidate;
}

export function chatReply(message: string): { reply: string; suggested_actions: string[] } {
  const text = message.toLowerCase();
  if (text.includes("pipeline") || text.includes("candidate")) {
    const top = [...candidates].sort((a, b) => b.score - a.score)[0];
    return {
      reply: `You have ${candidates.length} active candidates. ${top.name} is highest ranked (${top.score}) in ${top.stage}.`,
      suggested_actions: [
        "Schedule screen for Jordan Lee",
        "Request references for Alex Rivera",
      ],
    };
  }
  if (text.includes("job") || text.includes("req")) {
    const openJobs = jobs.filter((j) => j.status === "open");
    const titles = openJobs.map((j) => j.title).join(", ");
    return {
      reply: `There are ${openJobs.length} open reqs: ${titles}.`,
      suggested_actions: [
        "Draft outreach for Staff Engineer",
        "Refresh Senior Recruiter JD",
      ],
    };
  }
  return {
    reply:
      "I can summarize your pipeline, open reqs, and next-best actions. Try asking about candidates or open jobs.",
    suggested_actions: ["Show pipeline summary", "List open reqs"],
  };
}

export function getSummary() {
  return {
    generated_at: new Date().toISOString(),
    open_jobs: jobs.filter((j) => j.status === "open").length,
    candidates: candidates.length,
    interviews_this_week: 2,
  };
}
