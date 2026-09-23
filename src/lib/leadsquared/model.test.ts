import assert from "node:assert/strict";
import { extractDraft, seedState, applyDraft, describeNext } from "./model";

const { leads } = seedState();

const horizon = extractDraft(
  "Just met Ananya at Horizon Foods. They want the sales CRM for about forty reps and asked for a proposal tomorrow morning. Budget is approved this quarter.",
  leads,
);
assert.equal(horizon.intent, "log_and_followup");
assert.equal(horizon.leadId, "horizon");
assert.equal(horizon.stage, null);
assert.equal(horizon.nextAction, "Send proposal");
assert.match(horizon.whenLabel ?? "", /Tomorrow/);
assert.ok(horizon.entities.some((entity) => entity.value === "40 reps"));
assert.ok(horizon.entities.some((entity) => entity.value === "Budget approved this quarter"));
assert.ok(horizon.confidence >= 0.8);

const abc = extractDraft("Log my visit with ABC", leads);
assert.equal(abc.intent, "log_visit");
assert.equal(abc.leadId, "abc");
assert.equal(abc.nextAction, "");

const follow = extractDraft("Create a follow-up for tomorrow", leads);
assert.equal(follow.intent, "create_followup");
assert.equal(follow.leadId, null);
assert.match(follow.whenLabel ?? "", /Tomorrow/);

const next = extractDraft("What's my next task?", leads);
assert.equal(next.intent, "read_next");

const stage = extractDraft("Update ABC Industries to proposal", leads);
assert.equal(stage.intent, "update_stage");
assert.equal(stage.leadId, "abc");
assert.equal(stage.stage, "Proposal");

const demo = extractDraft(
  "Log my visit with ABC Industries. Rahul wants a demo next Tuesday. Move them to demo scheduled.",
  leads,
);
assert.equal(demo.intent, "log_and_followup");
assert.equal(demo.leadId, "abc");
assert.equal(demo.stage, "Demo scheduled");
assert.equal(demo.nextAction, "Book a demo");
assert.match(demo.whenLabel ?? "", /Tue/);

const call = extractDraft(
  "Remind me to call Dr. Iyer at Northwind on Friday about the contract.",
  leads,
);
assert.equal(call.intent, "create_followup");
assert.equal(call.leadId, "northwind");
assert.equal(call.nextAction, "Follow up on the contract");
assert.match(call.whenLabel ?? "", /Fri/);

const unknown = extractDraft("Log my visit with Zeta Corp", leads);
assert.equal(unknown.leadId, null);
assert.ok(unknown.warnings.some((warning) => warning.includes("No customer")));

const check = extractDraft("Check in at Horizon Foods", leads);
assert.equal(check.intent, "check_in");
assert.equal(check.leadId, "horizon");

const state = seedState();
const saved = applyDraft(state, { ...horizon, leadId: "horizon" }, "voice");
assert.ok(saved.state.activities.some((activity) => activity.title === "Visit logged"));
assert.ok(saved.state.tasks.some((task) => task.title === "Send proposal"));
assert.match(describeNext(saved.state), /Horizon Foods/);

console.log("leadsquared model tests passed");
