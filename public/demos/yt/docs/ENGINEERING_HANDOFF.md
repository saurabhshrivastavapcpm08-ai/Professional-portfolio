# Engineering Handoff

# YouTube Music Premium+

| Field | Value |
| --- | --- |
| **Author** | Saurabh Shrivastava |
| **Contact** | [LinkedIn](https://www.linkedin.com/in/connectwithsaurabh/) · saurabh_shrivastava_pcpm08@execed.isb.edu |
| **Audience** | Eng leads, EM, TPM, design partners |
| **Companion** | [PRD.md](./PRD.md) · [SPEC.md](./SPEC.md) |
| **Version** | 0.1 Draft |
| **Copyright** | © 2026 Saurabh Shrivastava. All rights reserved. |

This handoff segregates delivery into **six epics**, each with owning teams, workstreams, milestones, interfaces, and Definition of Done. Treat epics as independently sequenceable after **Epic 0** foundations land.

---

## 1. Delivery Principles

1. **Entitlements first** — no feature ships without Epic 0 gating.  
2. **Pillars are parallelizable** — E1 / E2 / E3 after E0 MVP.  
3. **Pixel is additive** — E4 must not block core Premium+ on non-Pixel.  
4. **Measure from day one** — E5 instrumentation rides with each pillar MVP.  
5. **Feature flags everywhere** — market, platform, % rollout.  

---

## 2. Team Topology (Suggested)

| Team | Primary epics |
| --- | --- |
| **Subscriptions / Commerce** | E0, E4 (bundles), E5 (funnels) |
| **Client Platform (Android / iOS / Web)** | E0 surfaces, E1 UI, E2 UI, E3 UI |
| **Audio Playback & CDN** | E1 |
| **AI / Insights (Gemini + Metadata)** | E2 |
| **Wear / Health / Fitbit** | E3 |
| **Pixel Partnerships / Device** | E4 |
| **Data / Growth Eng** | E5 |
| **Trust & Safety / Privacy** | E2, E3 cross-cut |
| **QA / SRE** | All |

---

## 3. Epic Backlog (Segregated)

---

### EPIC 0 — Platform & Entitlements  
**Goal:** Premium+ is a real, billable, flag-gated tier.  
**Priority:** P0 blocker for all other epics  
**Suggested owner:** Subscriptions + Client Platform  

#### Workstreams

| ID | Workstream | Eng notes |
| --- | --- | --- |
| E0.1 | SKU & commerce | Create `ytm_premium_plus` products (Play, iOS, web). Proration rules. |
| E0.2 | Entitlement service | Add `premium_plus` + feature map; propagate to clients/CDN auth. |
| E0.3 | Feature flag schema | `pp_lossless`, `pp_insights`, `pp_adaptive`, `pp_pixel_perks`. |
| E0.4 | Paywall & account UI | Upgrade sheet, settings tier badge, manage subscription. |
| E0.5 | Family / student policy | Align with existing Premium family rules; document deltas. |
| E0.6 | QA matrix | Tier × platform × feature automated checks. |

#### Dependencies

- Billing catalog approval  
- Legal subscription copy  

#### Milestones

| Milestone | Exit criteria |
| --- | --- |
| E0-M1 | Entitlement in dogfood; flags default off |
| E0-M2 | Paid upgrade path works end-to-end in one market |
| E0-M3 | Downgrade / expiry correctly strips features |

#### Definition of Done

- [ ] Spec §3 acceptance criteria green  
- [ ] Runbooks for entitlement outages  
- [ ] Client SDK / proto docs published  

#### Interface contracts

```text
GetEntitlements(user) → { tier, features[], expires_at, source }
CheckFeature(user, feature_key) → boolean
```

---

### EPIC 1 — Hear Better (Lossless / Hi-Res / DAC)  
**Goal:** Premium+ users hear a clear fidelity upgrade.  
**Priority:** P0 for launch narrative  
**Suggested owner:** Audio Playback & CDN + Android Audio  

#### Workstreams

| ID | Workstream | Eng notes |
| --- | --- | --- |
| E1.1 | Packaging pipeline | Lossless encode/pack; catalog eligibility flags; storage tiers. |
| E1.2 | CDN & auth | Entitlement-aware manifests; bandwidth cost meters. |
| E1.3 | Android player | Quality ladder; adaptive cap; download lossless. |
| E1.4 | iOS player | Lossless path via AVAudioEngine / existing stack. |
| E1.5 | DAC detection | `AudioDeviceInfo`; exclusive/bit-perfect mode; status UI. |
| E1.6 | Web / Cast | Best-effort lossless where stack allows; else degrade gracefully. |
| E1.7 | Settings & education | Wi-Fi-only defaults option; storage warnings. |

#### Sequencing

```text
E1.1 → E1.2 → (E1.3 ∥ E1.4) → E1.5 → E1.6
         ↘ E1.7 (parallel once player hooks exist)
```

#### Risks

- Egress cost → metering + Wi-Fi defaults + phased catalog  
- Device fragmentation on exclusive audio → Pixel-first then expand  

#### Definition of Done

- [ ] Spec §4 acceptance criteria  
- [ ] Rebuffer SLO dashboards  
- [ ] Cost per lossless hour dashboard  

#### Test plan highlights

- Golden track matrix (sample rates / channels)  
- Flaky network adaptive tests  
- USB DAC dogfood on Pixel + 2–3 popular DACs  

---

### EPIC 2 — Know More (AI Song Insights)  
**Goal:** Interactive intelligence on now-playing.  
**Priority:** P0 differentiation (can soft-launch coverage)  
**Suggested owner:** AI Insights + Metadata + Client  

#### Workstreams

| ID | Workstream | Eng notes |
| --- | --- | --- |
| E2.1 | Grounding store | Credits, charts, approved facts, YouTube links. |
| E2.2 | Generation service | Gemini prompts; section schema; caching; versioning. |
| E2.3 | Safety / policy | Filters, artist/label blocklists, disclosure. |
| E2.4 | Insights API | `GET /tracks/{id}/insights?locale=` + report endpoint. |
| E2.5 | Player UI | Entry point, sections, related tracks, teaser upsell. |
| E2.6 | Coverage jobs | Batch generate top streamers; backfill pipeline. |
| E2.7 | Human review tool | Priority catalog QA console. |

#### Sequencing

```text
E2.1 → E2.2 → E2.3 → E2.4 → E2.5
              ↘ E2.6 (batch)
              ↘ E2.7 (ops)
```

#### SLIs / SLOs (initial)

| SLI | Target (draft) |
| --- | --- |
| Cache hit latency | p50 < 100ms svc |
| Report rate | monitor; spike alerts |
| Grounding failure | fallback template, no hallucination-only |

#### Definition of Done

- [ ] Spec §5 acceptance criteria  
- [ ] Red-team notes filed  
- [ ] Localization for launch langs  

---

### EPIC 3 — Move Better (Adaptive Workout)  
**Goal:** Biometric-adaptive listening sessions.  
**Priority:** P1 for launch (MVP), P0 for Pixel story  
**Suggested owner:** Wear/Health + Recommendations + Client  

#### Workstreams

| ID | Workstream | Eng notes |
| --- | --- | --- |
| E3.1 | Permissions UX | Health Connect consent; revoke handling. |
| E3.2 | Signal ingestion | HR, workout type, pace; Wear OS + Fitbit paths. |
| E3.3 | Adaptation engine | Map zones → energy/BPM constraints; reuse radio/reco stack. |
| E3.4 | Session service | State machine per Spec §6.2; resume/degrade. |
| E3.5 | Phone + Watch UI | Start/stop, live indicator, cooldown. |
| E3.6 | Privacy review | Data minimization, retention, audit logs. |
| E3.7 | iOS path | Apple Health best-effort if approved; else Android-first. |

#### Sequencing

```text
E3.6 (parallel early) 
E3.1 → E3.2 → E3.3 → E3.4 → E3.5 → E3.7
```

#### Definition of Done

- [ ] Spec §6 acceptance criteria on Pixel Watch dogfood  
- [ ] Privacy sign-off  
- [ ] Synthetic HR integration tests in CI  

---

### EPIC 4 — Pixel Ecosystem Flywheel  
**Goal:** Hardware and Premium+ reinforce each other.  
**Priority:** P1 (parallel; must not block E0–E2)  
**Suggested owner:** Pixel Partnerships + Commerce + Audio  

#### Workstreams

| ID | Workstream | Eng notes |
| --- | --- | --- |
| E4.1 | Bundle redemption | Setup wizard offer; code → entitlement source=`pixel_bundle`. |
| E4.2 | Device graph | Eligible models list; fraud controls. |
| E4.3 | Pixel Buds profile | EQ / latency preset when `premium_plus` + Buds connected. |
| E4.4 | Watch handoff | Workout app → E3 session. |
| E4.5 | DAC spotlight UX | Pixel settings / now-playing education. |
| E4.6 | Marketing hooks | Deep links from Pixel promo surfaces. |

#### Definition of Done

- [ ] Spec §7 acceptance criteria  
- [ ] Redemption fraud rate below threshold  
- [ ] Non-Pixel Premium+ unaffected (regression suite)  

---

### EPIC 5 — Growth, Analytics & Experimentation  
**Goal:** Prove ARPU, retention, and product KPIs.  
**Priority:** P0 instrumentation with each pillar; P1 experiments  
**Suggested owner:** Data / Growth Eng  

#### Workstreams

| ID | Workstream | Eng notes |
| --- | --- | --- |
| E5.1 | Event schema | Spec §8 events in analytics pipeline. |
| E5.2 | Dashboards | Business / product / customer (PRD §9). |
| E5.3 | Upsell surfaces | Quality, insights teaser, workout lock, settings. |
| E5.4 | Experiment framework | Price, trial length, pill messaging. |
| E5.5 | Financial telemetry | Incremental sub revenue; exclude double-count bundles. |

#### Definition of Done

- [ ] Launch dashboard signed off by PM/Finance  
- [ ] Events validated in staging + prod smoke  
- [ ] At least one upsell experiment ready  

---

## 4. Cross-Epic Dependency Graph

```text
                    E0 Entitlements
                   /    |     |    \
                 E1    E2    E3    E5 (events with each)
                  \    |    /
                   \   |   /
                    \  |  /
                      E4 Pixel (uses E0 + optionally E1/E3)
```

**Hard rule:** E1, E2, E3, E4 all call `CheckFeature` from E0.  
**Soft rule:** E4 Watch handoff requires E3 MVP; Buds profile requires E1 playback hooks.

---

## 5. Suggested Program Timeline (Relative)

Calendar dates intentionally omitted — sequence by readiness:

| Stage | Epics | Outcome |
| --- | --- | --- |
| **Foundation** | E0-M2 + E5.1 | Tier exists; events fire |
| **Audio MVP** | E1.1–E1.4 | Lossless playable |
| **Insights MVP** | E2.1–E2.5 | Panel on top catalog |
| **Soft launch** | Flags on limited market | Learn funnel + fidelity |
| **Move MVP** | E3.1–E3.5 | Adaptive on Pixel Watch |
| **Pixel attach** | E4.1–E4.4 | Bundles + handoff |
| **Scale** | Hi-Res expand, coverage, experiments | Multi-market |

---

## 6. Repo / Doc Map (This Proposal Package)

This repository contains the **executive visual experience** and planning docs — not production YTM services.

| Path | Purpose |
| --- | --- |
| `/` | Vite + React visual proposal site |
| `docs/PRD.md` | Product requirements & epic map |
| `docs/SPEC.md` | Functional / technical specification |
| `docs/ENGINEERING_HANDOFF.md` | This handoff |
| `public/docs/*` | Same docs served statically from the site footer |

```bash
npm install
npm run dev      # visual proposal
npm run build    # production build
```

---

## 7. Engineering Checklist Before Kickoff

- [ ] Confirm SKU naming & price hypotheses with Monetization  
- [ ] Confirm lossless rights coverage with Business Development  
- [ ] Privacy design review scheduled for E3  
- [ ] AI policy review scheduled for E2  
- [ ] Assign EM per epic; single program TPM  
- [ ] Align Pixel GTM window with E4 redemption  
- [ ] Define launch market list & flag defaults  

---

## 8. Epic Ticket Seeds (Copy into Tracker)

Use these as parent epics; break into stories under each workstream ID.

1. `[E0] Premium+ entitlements, commerce, and feature flags`  
2. `[E1] Lossless / Hi-Res streaming and DAC-aware playback`  
3. `[E2] AI Song Insights generation, API, and player UI`  
4. `[E3] Health Connect adaptive workout music sessions`  
5. `[E4] Pixel bundle, Buds profile, Watch handoff`  
6. `[E5] Premium+ analytics, upsell surfaces, experiments`  

---

## 9. Contact / RACI (Fill at Kickoff)

| Decision | Responsible | Accountable | Consulted | Informed |
| --- | --- | --- | --- | --- |
| Tier pricing | Monetization | GM YTM | Finance, Legal | Eng |
| Lossless codec | Audio Platform | Audio Dir | CDN, Clients | PM |
| Insight policy | T&S + Music PM | YTM Content | Labels | Eng |
| Health data | Privacy | Legal | Wear eng | PM |
| Pixel bundle | Pixel GTM | Pixel + YTM | Commerce | Support |

---

## 10. Handoff Summary

| Epic | One-liner for eng |
| --- | --- |
| **E0** | Make Premium+ a real gated subscription. |
| **E1** | Ship fidelity people can hear (and measure). |
| **E2** | Ship intelligence people can explore. |
| **E3** | Ship music that moves with the body. |
| **E4** | Ship the Google device flywheel. |
| **E5** | Prove the business and product thesis. |

Ship the combination — not lossless alone.


---

© 2026 Saurabh Shrivastava. All rights reserved.

[LinkedIn](https://www.linkedin.com/in/connectwithsaurabh/) · saurabh_shrivastava_pcpm08@execed.isb.edu
