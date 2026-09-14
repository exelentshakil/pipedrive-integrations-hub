# Product Requirements Document (PRD)
## Pipedrive Technical Integrations Hub: Sinch AI SMS Agent, Attribution Engine & Power BI Data Pipeline

### 1. Executive Summary & Defensibility Hook
Client Shaun (Perth, Australia) requires senior technical integration engineering across three distinct infrastructure projects connecting to Pipedrive CRM:
1. **Pipedrive ↔ Sinch AI SMS Agent**: Low-latency, two-way automated SMS conversation engine triggered natively by Pipedrive events (avoiding Zapier as primary trigger), associating threads with Deals/Persons, supporting salesperson takeover, and enforcing Australian Spam Act / TNZ opt-out synchronization.
2. **Website Tracking → Pipedrive Lead Scoring**: Attribution ingestion pipeline with client/server-side identity matching, funnel action tracking, and real-time Pipedrive custom field scoring.
3. **Pipedrive → Power BI Data Warehouse Pipeline**: Automated extraction, transformation, and dimensional modeling of Pipedrive entities into a Star Schema optimized for Power BI reporting.

**Core Technical Principle**: Serverless, event-driven webhooks and durable queues replace fragile polling or high-cost Zapier automation. The integration layer guarantees sub-second webhook delivery, idempotency, strict data isolation, and transactional logging into Pipedrive.

---

### 2. Architecture & Tech Stack
- **Framework**: Next.js 15 App Router (Fluid Compute) + TypeScript
- **CRM Layer**: Pipedrive REST API v1 (`/deals`, `/persons`, `/activities`, `/notes`, `/webhooks`)
- **SMS Gateway**: Sinch SMS REST API (`/v1/sms/batches`) + Inbound Delivery Webhooks
- **LLM Engine**: OpenAI / Gemini Structured Output conversation management with stateful context
- **Compliance & Registry**: TNZ / Australian ACMA Spam Act 2003 unsubscribe keyword engine
- **Attribution & Identity Matching**: Client session cookie to Pipedrive Person identity resolver
- **BI Warehouse**: Direct SQL / OData REST endpoint exposing Star Schema facts & dimensions for Power BI

---

### 3. Functional Scope by Project

#### Project 1: Pipedrive + Sinch AI SMS Agent
- **Trigger Without Zapier**: Native Pipedrive Webhooks registered to `updated.deal` and `added.person`. Event router validates HMAC signature, filters by pipeline stage (e.g., "New Lead - Needs Qualification"), and enqueues outbound SMS via Sinch.
- **Two-Way Sinch Integration**: Webhook endpoint `/api/webhooks/sinch` receives inbound customer replies.
- **Identity & Association**: Formats phone number into E.164, queries Pipedrive Person, retrieves active Deals, and creates Pipedrive Note/Activity documenting exact SMS transcripts with timestamps.
- **Stateful AI Conversation**: Grounded LLM agent answers FAQs, checks consultation availability, and collects project requirements.
- **Salesperson Handover**: Intent classifier detects escalation triggers ("talk to someone", "call me", complex quotes). Deals transition to "Sales Rep Review", AI auto-replies pause, and high-priority Pipedrive Activity is assigned to Deal owner.
- **TNZ / AU Opt-Out Sync**: Recognizes `STOP`, `UNSUBSCRIBE`, `CANCEL`. Immediately updates Pipedrive Person custom field `sms_opt_out = true`, suppresses further SMS, and logs compliance audit record.

#### Project 2: Website Attribution Platform → Pipedrive Lead Scoring
- **Attribution Ingestion**: Captures UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`), referrers, device, and high-value behavioral milestones (pricing views, floor plan downloads, quote calculator usage).
- **Identity Matching Engine**: Correlates anonymous browser fingerprint/session ID to Pipedrive Person ID upon form submission or phone inquiry.
- **Dynamic Scoring Rules**: Weighted point matrix updates custom fields (`lead_score`, `intent_tier`, `first_touch_source`, `last_touch_source`).
- **Pipedrive Sync**: Batched `PUT /v1/persons/{id}` and stage auto-progression when score crosses defined thresholds.

#### Project 3: Pipedrive → Power BI Reporting Pipeline
- **Entity Extraction**: Incremental sync pipeline extracting Deals, People, Organizations, Stages, Pipelines, Activities, and Custom Fields.
- **Dimensional Star Schema**:
  - `Fact_Deals`: Deal ID, Person ID, Org ID, Stage ID, Value, Currency, Won/Lost timestamp, Cycle Time days.
  - `Fact_Activities`: Activity ID, Deal ID, Assigned User, Type, Status, Due Date.
  - `Dim_Person`, `Dim_SalesRep`, `Dim_Stages`, `Dim_Date`.
- **Power BI Interface**: Exposes structured REST/OData feeds (`/api/powerbi/deals`, `/api/powerbi/schema`) configured for DirectQuery or scheduled automatic refresh in Power BI Desktop.

---

### 4. Acceptance Criteria
- [x] Zero Zapier dependence: native Pipedrive webhooks handle dispatch and ingestion.
- [x] Full round-trip Sinch SMS simulator demonstrating outbound trigger, inbound reply, and AI response.
- [x] Salesperson handover halts AI and assigns Deal Activity to designated rep.
- [x] TNZ opt-out keywords (`STOP`) set opt-out custom field in Pipedrive within 200ms.
- [x] Attribution matcher correlates multi-touch website sessions to Pipedrive contact.
- [x] Power BI dimensional schema exportable with sample star-schema records.
- [x] WCAG 2.2 AA compliance, universal 12px+ typography scale, responsive `max-w-7xl` container.
