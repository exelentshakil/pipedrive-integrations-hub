# Pipedrive Integration Engine — Implementation & Architecture Estimate

**Client:** Shaun M., Perth, Western Australia  
**Prepared By:** Shakil Ahmed, BarakahSoft LLC  
**Date:** September 14, 2026  
**Interactive Architecture Demo:** [pipedrive-integrations-hub.vercel.app](https://pipedrive-integrations-hub.vercel.app)  
**Calibrated Project Rate:** $40 / hr (Aligned with posted $20–$40/hr range & historical spend)  

---

## 1. Executive Summary & Phased Delivery Scope

This estimate covers the production engineering and deployment across the three separate projects outlined in the brief:
1. **Project 1: Pipedrive + AI SMS Agent** (Native v1 webhooks without Zapier, two-way Sinch SMS, LLM conversation state machine, Person/Deal logging, salesperson handover, and TNZ/Australian Spam Act 2003 opt-out synchronization).
2. **Project 2: Tracking Platform → Pipedrive + Lead Scoring** (Identity matching from anonymous browser sessions to Pipedrive Persons, attribution ingestion, and real-time custom field lead scoring).
3. **Project 3: Pipedrive → Power BI Star Schema Data Warehouse** (Normalized relational Star Schema pipeline for Deals, People, activities, custom fields, and won/lost history with incremental delta refresh).

---

## 2. Engineering Phase Breakdown

| Phase | Deliverables & Technical Scope | Hours | Rate | Total (USD) |
|---|---|:---:|:---:|:---:|
| **Phase 0** | **Proof of Concept Architecture & Live Demo**<br>Interactive two-way SMS simulator, identity resolution graph, Star Schema entity visualizer, zero-Zapier webhook inspector deployed live. | **18 hrs** | **$0/hr** | **$0 (Delivered)** |
| **Phase 1** | **Native Pipedrive Webhooks & Sinch 2-Way Gateway (Project 1)**<br>• Zero-Zapier serverless webhook listener (<150ms latency, HMAC-SHA256 signature validation)<br>• Sinch Australian Custom Sender ID configuration & delivery receipt handlers<br>• E.164 phone normalization & Pipedrive Person/Deal bidirectional lookup<br>• Full transcript logging to Pipedrive Activities & Notes | **14 hrs** | $40/hr | $560 |
| **Phase 2** | **AI Qualification State Machine, Handover & TNZ Opt-Out (Project 1)**<br>• Multi-turn qualification state machine (Claude 3.5 Haiku / Sonnet fallback chain)<br>• Buying intent classifier & live salesperson handover (auto-assigns high-priority call task to Shaun M.)<br>• Australian Spam Act 2003 & TNZ keyword interception (`STOP`, `UNSUBSCRIBE`, `CANCEL`)<br>• Synchronized custom field suppression & automated SMS dispatches cutoff | **13 hrs** | $40/hr | $520 |
| **Phase 3** | **Website Tracking, Identity Resolution & Lead Scoring (Project 2)**<br>• First-party cookie & fingerprint ingestion endpoint<br>• Multi-touch attribution tracking (Google Ads, Facebook, Organic, Direct UTM tags)<br>• Deterministic identity matching graph (resolves session to Person on form/SMS event)<br>• Real-time lead scoring calculator writing `lead_score`, `intent_tier`, `first_touch_source` to Pipedrive | **11 hrs** | $40/hr | $440 |
| **Phase 4** | **Power BI Star Schema Pipeline & Delta Sync (Project 3)**<br>• Relational data model normalization: `Fact_Deals`, `Dim_Persons`, `Fact_Activities`, `Dim_PipelineStages`<br>• Delta sync engine handling Pipedrive rate limits (40-80 req/s batch pagination)<br>• REST / OData data feed endpoints optimized for Power BI Desktop & Service scheduled refresh<br>• Custom field mapping for won/lost history & attribution metrics | **12 hrs** | $40/hr | $480 |
| **Phase 5** | **End-to-End Staging, Telco Load Testing & Production Go-Live**<br>• End-to-end integration test with live Australian telco carrier dispatches<br>• Edge case validation (duplicate SMS handling, out-of-order webhooks, invalid numbers)<br>• Clean TypeScript repository, environment runbook, and team walkthrough | **7 hrs** | $40/hr | $280 |
| **TOTAL** | **Complete 3-Project Production Rollout** | **57 hrs** | **$40/hr** | **$2,280** |

*Note: Phase 0 (18 hours of research, mock modeling, and interactive demo architecture) is already complete and delivered at zero charge.*

---

## 3. Modular Project Options (Fixed-Milestone Flexibility)

If Shaun prefers to commission and release each project in isolated milestones:
- **Option A — Project 1 Only (AI SMS + Sinch + Pipedrive + Handover + TNZ):** 27 hrs ($1,080)
- **Option B — Project 2 Only (Web Tracking + Identity Matching + Lead Scoring):** 11 hrs ($440)
- **Option C — Project 3 Only (Pipedrive to Power BI Star Schema Warehouse):** 12 hrs ($480)
- **Option D — Complete Turnkey Package (All 3 Projects + Staging):** 57 hrs ($2,280)

---

## 4. Operating Infrastructure & Running Costs

| Component | Provider / Tier | Estimated Monthly Cost |
|---|---|:---:|
| **Serverless Compute** | Vercel Pro / AWS Lambda (Regional Sydney) | $20 / mo |
| **Pipedrive v1 API** | Existing Pipedrive Enterprise / Advanced Plan | $0 additional |
| **Sinch SMS Gateway** | Sinch AU Direct Route (~$0.045 AUD / outbound SMS) | Usage based (~$45 / 1k texts) |
| **AI LLM Inference** | Anthropic Claude 3.5 Haiku (classification & drafting) | ~$8 / 1k conversations |
| **Power BI Storage** | Power BI Pro / Embedded | Existing tenant license |

---

## 5. Delivery Timeline

- **Weeks 1–2:** Phase 1 & Phase 2 (Native Pipedrive Webhooks, Sinch 2-Way Gateway, AI Conversation Engine, Handover & TNZ Opt-Out).
- **Week 3:** Phase 3 (Web Tracking, Identity Matching Graph, Real-Time Lead Scoring).
- **Week 4:** Phase 4 & Phase 5 (Power BI Star Schema Pipeline, End-to-End Testing & Production Deployment).
