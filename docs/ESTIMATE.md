# Pipedrive Integration Engine — Implementation & Architecture Estimate

**Client:** Shaun M., Perth, Western Australia  
**Prepared By:** Shakil Ahmed, BarakahSoft LLC  
**Date:** September 14, 2026  
**Interactive Architecture Demo:** [pipedrive-integrations-hub.vercel.app](https://pipedrive-integrations-hub.vercel.app)  
**Calibrated Project Rate:** $40 / hr (Aligned with posted $20–$40/hr range & historical spend)  

---

## 1. Executive Summary & Delivery Scope

This architecture estimate covers complete production deployment across Shaun's 3 distinct integration projects without Zapier middleware:

- **Project 1: Pipedrive + AI SMS Agent (Sinch Gateway)** — Native v1 webhooks (<150ms dispatch), two-way Sinch SMS, LLM conversation state machine, automatic Pipedrive Person/Deal logging, salesperson handover to Shaun M., and strict Australian Spam Act 2003 / TNZ opt-out synchronization.
- **Project 2: Tracking Platform → Pipedrive + Lead Scoring** — First-party cookie ingestion, anonymous session to Person identity resolution, and real-time computation of `lead_score`, `intent_tier`, `first_touch_source`, and `last_touch_source` custom fields.
- **Project 3: Pipedrive → Power BI Star Schema Data Warehouse** — Normalized relational dimensional modeling (Fact_Deals, Dim_Persons, Fact_Activities, Dim_PipelineStages), delta refresh engine handling API rate limits, and DirectQuery REST/OData feeds.

---

## 2. Engineering Phase Breakdown

| Phase | Deliverables & Technical Scope | Hours | Rate | Total (USD) |
|---|---|:---:|:---:|:---:|
| **Phase 0** | **Interactive Architecture Prototype & Webhook Cockpit (Delivered)**<br>• Two-way Sinch SMS simulator with AI qualification states<br>• Native Pipedrive v1 webhook inspector (<150ms, HMAC-SHA256)<br>• Deterministic identity matching graph & lead scoring simulator<br>• Relational Star Schema entity viewer & JSON OData preview | **0.5 hrs (<30m)** | **$0/hr** | **$0 (Delivered)** |
| **Phase 1** | **Native Pipedrive Webhooks & Sinch 2-Way Gateway (Project 1)**<br>• Zero-Zapier serverless webhook listener (<150ms latency, HMAC-SHA256 signature validation)<br>• Sinch Australian Custom Sender ID configuration & delivery receipt handlers<br>• E.164 phone normalization & Pipedrive Person/Deal bidirectional lookup<br>• Full transcript logging to Pipedrive Activities & Notes | **14 hrs** | $40/hr | $560 |
| **Phase 2** | **AI Qualification State Machine, Handover & TNZ Opt-Out (Project 1)**<br>• Multi-turn qualification state machine (Claude 3.5 Haiku / Sonnet fallback chain)<br>• Buying intent classifier & live salesperson handover (auto-assigns high-priority call task to Shaun M.)<br>• Australian Spam Act 2003 & TNZ keyword interception (`STOP`, `UNSUBSCRIBE`, `CANCEL`)<br>• Synchronized custom field suppression & automated SMS dispatches cutoff | **13 hrs** | $40/hr | $520 |
| **Phase 3** | **Website Tracking, Identity Resolution & Lead Scoring (Project 2)**<br>• First-party cookie & fingerprint ingestion endpoint<br>• Multi-touch attribution tracking (Google Ads, Facebook, Organic, Direct UTM tags)<br>• Deterministic identity matching graph (resolves session to Person on form/SMS event)<br>• Real-time lead scoring calculator writing `lead_score`, `intent_tier`, `first_touch_source` to Pipedrive | **11 hrs** | $40/hr | $440 |
| **Phase 4** | **Power BI Star Schema Pipeline & Delta Sync (Project 3)**<br>• Relational data model normalization: `Fact_Deals`, `Dim_Persons`, `Fact_Activities`, `Dim_PipelineStages`<br>• Delta sync engine handling Pipedrive rate limits (40-80 req/s batch pagination)<br>• REST / OData data feed endpoints optimized for Power BI Desktop & Service scheduled refresh<br>• Custom field mapping for won/lost history & attribution metrics | **12 hrs** | $40/hr | $480 |
| **Phase 5** | **End-to-End Staging, Telco Load Testing & Production Go-Live**<br>• End-to-end integration test with live Australian telco carrier dispatches<br>• Edge case validation (duplicate SMS handling, out-of-order webhooks, invalid numbers)<br>• Clean TypeScript repository, environment runbook, and team walkthrough | **7 hrs** | $40/hr | $280 |
| **TOTAL** | **Complete 3-Project Production Rollout** | **57 hrs** | **$40/hr** | **$2,280** |

*Note: Phase 0 (rapid architecture spike and interactive demo) is delivered upfront at zero charge to prove zero architectural risk.*

---

## 3. Modular Project Options (Fixed-Milestone Flexibility)

If Shaun prefers to commission and release each project in isolated milestones:
- **Option A — Project 1 Only (AI SMS + Sinch + Pipedrive + Handover + TNZ):** 27 hrs ($1,080)
- **Option B — Project 2 Only (Web Tracking + Identity Matching + Lead Scoring):** 11 hrs ($440)
- **Option C — Project 3 Only (Pipedrive to Power BI Star Schema Warehouse):** 12 hrs ($480)
- **Option D — Complete Turnkey Package (All 3 Projects + Staging):** 57 hrs ($2,280)

---

## 4. Operational Running Costs & Delivery Schedule

- **Monthly Infrastructure:**
  - Vercel Serverless Compute: ~$20 / month
  - Sinch SMS Gateway (Telstra/Optus Direct): ~$0.045 AUD / message
  - Claude 3.5 Haiku API (Telephony Qualification): ~$8 per 1,000 conversations
  - Zero ongoing Zapier subscription costs ($0 / month vs $300+ / mo on Zapier tiers)
- **Delivery Cadence:**
  - Weeks 1–2: Project 1 (Pipedrive Webhooks + Two-Way Sinch SMS + Handover + TNZ)
  - Week 3: Project 2 (Tracking Platform + Identity Graph + Lead Scoring)
  - Week 4: Project 3 (Power BI Star Schema Pipeline & Delta Sync) + Production Go-Live
