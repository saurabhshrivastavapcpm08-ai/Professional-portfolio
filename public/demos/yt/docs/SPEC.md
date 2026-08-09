# Product & Technical Specification

# YouTube Music Premium+

| Field | Value |
| --- | --- |
| **Document** | SPEC |
| **Author** | Saurabh Shrivastava |
| **Contact** | [LinkedIn](https://www.linkedin.com/in/connectwithsaurabh/) · saurabh_shrivastava_pcpm08@execed.isb.edu |
| **Companion** | [PRD.md](./PRD.md) · [ENGINEERING_HANDOFF.md](./ENGINEERING_HANDOFF.md) |
| **Version** | 0.1 Draft |
| **Copyright** | © 2026 Saurabh Shrivastava. All rights reserved. |

---

## 1. Scope

This specification defines functional behavior, interfaces, data, and constraints for **YouTube Music Premium+**, segregated by epic.

Out of scope: final legal copy, exact price tables, full rights negotiation playbooks.

---

## 2. System Context

```text
┌────────────┐   ┌────────────┐   ┌──────────────┐
│  YTM Apps  │──▶│ Entitlement│◀──│ Play Billing │
│ Android/iOS│   │  Service   │   │ / Commerce   │
│ Web / TV   │   └─────┬──────┘   └──────────────┘
└─────┬──────┘         │
      │         ┌──────┴───────┐
      ├────────▶│ Audio CDN /  │  Epic 1
      │         │ Lossless pkg │
      ├────────▶│ Insights API │  Epic 2  ◀── Gemini + Metadata
      │         │ + Ranking    │
      └────────▶│ Adaptive     │  Epic 3  ◀── Health Connect /
                │ Session Svc  │              Wear / Fitbit
                └──────┬───────┘
                       │
                ┌──────┴───────┐
                │ Pixel Perks  │  Epic 4
                │ Device graph │
                └──────────────┘
```

---

## 3. Epic 0 — Platform & Entitlements

### 3.1 Functional requirements

| ID | Requirement |
| --- | --- |
| E0-F1 | System SHALL expose a `premium_plus` entitlement distinct from `premium`. |
| E0-F2 | Upgrade from Premium to Premium+ SHALL preserve library, downloads, and family membership rules per market policy. |
| E0-F3 | Downgrade SHALL revoke Premium+-only features within a defined grace window (e.g. end of paid period). |
| E0-F4 | Feature flags SHALL gate E1–E4 capabilities independently for staged rollout. |
| E0-F5 | Paywall SHALL communicate the three pillars and primary differentiators. |
| E0-F6 | Account settings SHALL show tier, renewal, and included Premium+ benefits. |

### 3.2 Entitlement schema (logical)

```json
{
  "tier": "premium_plus",
  "features": {
    "lossless_audio": true,
    "hi_res_audio": true,
    "song_insights": true,
    "adaptive_workout": true,
    "pixel_perks": true
  },
  "expires_at": "ISO-8601",
  "source": "subscription | pixel_bundle | trial"
}
```

### 3.3 UX surfaces

- Subscribe / upgrade sheets (mobile, web, TV where applicable)  
- Quality settings upsell when user selects Lossless without entitlement  
- Insight panel teaser for non–Premium+  
- Workout adaptive lock screen for non–Premium+  

### 3.4 Acceptance criteria

- [ ] User with Premium+ receives all gated features; Premium does not  
- [ ] Mid-cycle upgrade prorates per commerce policy  
- [ ] Entitlement propagation to clients ≤ 60s typical after purchase  
- [ ] Kill switches exist per feature flag  

---

## 4. Epic 1 — Hear Better (Audio)

### 4.1 Functional requirements

| ID | Requirement |
| --- | --- |
| E1-F1 | Premium+ clients SHALL stream lossless (FLAC or equivalent delivery codec/container as decided by Audio Platform) for eligible catalog. |
| E1-F2 | Where available, Hi-Res tiers (e.g. >48 kHz / >16-bit) SHALL be selectable. |
| E1-F3 | Adaptive quality SHALL prefer highest entitled quality under network/device constraints. |
| E1-F4 | On Android, app SHOULD detect external USB/Lightning-class DACs (as platform APIs allow) and offer bit-perfect / enhanced path. |
| E1-F5 | UI SHALL show current quality (bitrate / format) and DAC status when active. |
| E1-F6 | Downloads SHALL support lossless for Premium+ with storage warnings. |

### 4.2 Quality ladder

| Mode | Typical | Entitlement |
| --- | --- | --- |
| Data saver / low | ~24–48 kbps | Free / Premium |
| Standard / High | up to ~256 kbps AAC (existing) | Premium |
| Lossless | FLAC ~700–1000+ kbps | Premium+ |
| Hi-Res | FLAC / packaged Hi-Res | Premium+ (subset) |

*Exact codecs TBD with Audio Platform & CDN.*

### 4.3 DAC / bit-perfect (Android-first)

- Detect `AudioDeviceInfo` external DAC / USB audio  
- Prefer exclusive / performance audio path when supported  
- Disable processing that breaks bit-perfect when user opts in  
- Fallback to standard lossless path if exclusive mode unavailable  

### 4.4 Non-functional

- Startup time to first audio ≤ existing Premium p95 + 10%  
- Lossless rebuffer rate within agreed SLO vs high quality  
- Clear metering of CDN egress for cost dashboards  

### 4.5 Acceptance criteria

- [ ] Eligible track plays in lossless for Premium+ on Android & iOS  
- [ ] Quality selector persists preference  
- [ ] DAC connected → status visible; disconnect → graceful fallback  
- [ ] Offline lossless download plays without online entitlement refresh for validity window  

---

## 5. Epic 2 — Know More (AI Song Insights)

### 5.1 Functional requirements

| ID | Requirement |
| --- | --- |
| E2-F1 | Player SHALL expose an “Insights” entry point for Premium+. |
| E2-F2 | Insights SHALL include a subset of: background, artist inspiration, producer notes, instrument breakdown, trivia, recording history, related tracks. |
| E2-F3 | Content SHALL be grounded in approved metadata / knowledge sources; model output MUST cite or link sources where required by policy. |
| E2-F4 | Insights SHALL support localization for launch languages. |
| E2-F5 | Users SHALL be able to dismiss, rate, or report an insight. |
| E2-F6 | Related tracks SHALL deep-link into YTM playback / queue. |

### 5.2 Insight object (logical)

```json
{
  "track_id": "string",
  "locale": "en-US",
  "sections": [
    {
      "type": "background | inspiration | producer | instruments | trivia | history",
      "title": "string",
      "body": "markdown-ish string",
      "confidence": 0.0,
      "sources": [{ "type": "metadata|youtube|web", "id": "string" }]
    }
  ],
  "related_track_ids": ["string"],
  "generated_at": "ISO-8601",
  "model_version": "string"
}
```

### 5.3 Generation pipeline

1. Catalog eligibility & rights check  
2. Retrieve structured credits / lyrics metadata / approved facts  
3. Gemini (or successor) compose sections with grounding  
4. Policy / safety filters  
5. Cache by `track_id + locale + model_version`  
6. Optional human review queue for charting / partner priority titles  

### 5.4 UX

- Bottom sheet / side panel from now-playing  
- Skeleton loading; stale-while-revalidate from cache  
- Teaser blur for non–Premium+ with upgrade CTA  

### 5.5 Acceptance criteria

- [ ] Insights render for ≥ launch coverage % of streams (target TBD, e.g. top N% catalog)  
- [ ] Report flow files to moderation queue  
- [ ] Related track tap starts playback  
- [ ] Latency: cached < 300ms p50 client; uncached generation async with partial UI  

---

## 6. Epic 3 — Move Better (Adaptive Workout)

### 6.1 Functional requirements

| ID | Requirement |
| --- | --- |
| E3-F1 | Premium+ users SHALL start an Adaptive Workout session from YTM or Watch. |
| E3-F2 | Session SHALL read permitted Health Connect / Wear signals: heart rate, workout type, pace, intensity, recovery stage (as available). |
| E3-F3 | Music energy / BPM / tempo selection SHALL adapt to zones without requiring manual playlist changes. |
| E3-F4 | User SHALL control sensitivity, genre seeds, and pause adaptation. |
| E3-F5 | Health data SHALL NOT be used for ads; retention per privacy policy; revoke permissions stops adaptation. |
| E3-F6 | Offline / signal-loss SHALL fall back to last seed playlist / radio. |

### 6.2 Session state machine

```text
Idle → ConsentCheck → ConnectingSensors → ActiveAdapt
        ↓                    ↓
     Blocked              Degraded (no HR)
ActiveAdapt → Paused ↔ ActiveAdapt → Cooldown → Ended
```

### 6.3 Adaptation inputs → outputs

| Input | Output knobs |
| --- | --- |
| HR zone / % max | Target tempo range, energy score |
| Pace (run/cycle) | Cadence-aligned recommendations |
| Workout type | Genre / playlist seed templates |
| Recovery / cooldown | Lower energy, familiar tracks |

### 6.4 Privacy

- Explicit runtime permissions via Health Connect  
- In-session indicator: “Using heart rate for music”  
- Data minimization: stream derived zones, avoid raw storage where possible  

### 6.5 Acceptance criteria

- [ ] With Pixel Watch + permissions, HR changes shift recommendation energy within agreed latency (e.g. ≤ 30s)  
- [ ] Revoking permission disables adaptation and informs user  
- [ ] Session summary shows tracks played + optional workout stats (user-controlled)  

---

## 7. Epic 4 — Pixel Ecosystem

### 7.1 Functional requirements

| ID | Requirement |
| --- | --- |
| E4-F1 | Eligible Pixel purchase / setup MAY grant Premium+ trial or complimentary period via redemption code / account link. |
| E4-F2 | Pixel Buds pairing SHOULD apply Premium+ optimized EQ / latency profile when streaming from YTM. |
| E4-F3 | Pixel Watch workout app SHALL deep-link or handoff to Adaptive Workout (E3). |
| E4-F4 | When external DAC detected on Pixel, UI SHALL highlight enhanced Premium+ playback path. |
| E4-F5 | Non-Pixel devices SHALL still receive core Premium+ (E1–E3); Pixel features are additive. |

### 7.2 Acceptance criteria

- [ ] Bundle redemption grants entitlement end-to-end  
- [ ] Buds profile toggles documented and measurable  
- [ ] Watch → phone handoff starts adaptive session  

---

## 8. Epic 5 — Growth, Analytics & Ops

### 8.1 Events (minimum)

| Event | Properties |
| --- | --- |
| `premiumplus_upgrade_impression` | surface, market |
| `premiumplus_purchase` | sku, source |
| `lossless_play` | track_id, format, bitrate, dac_active |
| `insight_open` / `insight_section_view` / `insight_report` | track_id, section |
| `adaptive_session_start/end` | workout_type, duration, hr_available |
| `pixel_perk_redeem` | device_model |

### 8.2 Dashboards

- Funnel: impression → trial → paid → D30 retain  
- Audio: % listening time by quality tier  
- Insights: open rate, dwell, related CTR, report rate  
- Move: sessions / MAU, completion, satisfaction survey  

### 8.3 Acceptance criteria

- [ ] Events validated in staging  
- [ ] Executive dashboard for §PRD metrics live at launch  

---

## 9. Cross-Cutting Requirements

### 9.1 Platforms

| Platform | E0 | E1 | E2 | E3 | E4 |
| --- | --- | --- | --- | --- | --- |
| Android phone | Must | Must | Must | Must | Must (Pixel) |
| iOS | Must | Must | Must | Best-effort (Health) | Limited |
| Web | Must | Should | Should | N/A | N/A |
| TV / Cast | Should | Should | Could | N/A | N/A |
| Wear OS | Should | Could | Could | Must | Must |

### 9.2 Accessibility

- Insights readable with TalkBack / VoiceOver  
- Quality & DAC status announced on change  
- Adaptive session controls large-hit targets for workouts  

### 9.3 Internationalization

- Tier naming and paywall localized  
- Insights locales per launch plan  
- Market-by-market catalog lossless eligibility  

### 9.4 Compliance

- Subscription disclosures, cancel paths  
- Health data regulations  
- AI disclosure where required  
- Label / publishing contractual constraints on derivative insight text  

---

## 10. Dependencies

| Dependency | Epic | Notes |
| --- | --- | --- |
| Commerce / Play Billing | E0, E4 | SKUs, bundles |
| Audio CDN & packaging | E1 | Lossless encode/pack |
| Rights / label deals | E1, E2 | Formats + insight sources |
| Gemini + grounding store | E2 | Generation |
| Health Connect / Fitbit / Wear | E3 | Sensors |
| Pixel setup & device graph | E4 | Redemption |
| Experimentation platform | E5 | Pricing / UX tests |

---

## 11. Test Strategy (Summary)

- Entitlement matrix QA (tier × feature × platform)  
- Audio golden ears + objective rebuffer / sync tests  
- Insight factual spot-checks + safety red-team  
- Workout simulation with synthetic HR streams  
- Bundle redemption e2e on Pixel dogfood builds  

Detailed tickets and ownership: see **Engineering Handoff**.


---

© 2026 Saurabh Shrivastava. All rights reserved.

[LinkedIn](https://www.linkedin.com/in/connectwithsaurabh/) · saurabh_shrivastava_pcpm08@execed.isb.edu
