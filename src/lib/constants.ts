import { 
  PipedriveDeal, 
  PipedrivePerson, 
  SmsMessage, 
  WebhookLogEvent, 
  AttributionTouchpoint, 
  PowerBiEntitySchema 
} from "./types";

export const TEAM_REPS = [
  "Shaun M. (Head of Growth - Perth)",
  "Liam K. (Senior Sales Consultant)",
  "Chloe T. (Design & Feasibility Rep)",
  "Mark D. (Inbound Lead Qualifier)"
];

export const INITIAL_PERSONS: PipedrivePerson[] = [
  {
    id: 1042,
    name: "Lachlan Evans",
    phone: "+61 412 839 201",
    email: "lachlan.evans@westnet.com.au",
    orgName: "Evans Custom Homes Perth",
    leadScore: 85,
    smsConsent: true,
    firstTouchSource: "google_search / cpc",
    lastTouchSource: "display / retargeting",
    intentTier: "HOT",
    assignedRep: "Liam K. (Senior Sales Consultant)"
  },
  {
    id: 1043,
    name: "Sarah Jenkins",
    phone: "+61 423 710 492",
    email: "s.jenkins@fremantlecraft.com.au",
    orgName: "Coastal Living WA",
    leadScore: 62,
    smsConsent: true,
    firstTouchSource: "facebook / paid_social",
    lastTouchSource: "direct / none",
    intentTier: "WARM",
    assignedRep: "Chloe T. (Design & Feasibility Rep)"
  },
  {
    id: 1044,
    name: "Dean O'Connor",
    phone: "+61 434 982 115",
    email: "dean.oconnor@subiacobuilders.com",
    orgName: "Subiaco Modern Living",
    leadScore: 94,
    smsConsent: true,
    firstTouchSource: "linkedin / sponsored",
    lastTouchSource: "email / newsletter",
    intentTier: "HOT",
    assignedRep: "Shaun M. (Head of Growth - Perth)"
  },
  {
    id: 1045,
    name: "Jessica Taylor",
    phone: "+61 405 621 884",
    email: "jessica.t@cottesloe-residences.com",
    orgName: "Cottesloe Developments",
    leadScore: 28,
    smsConsent: false,
    smsOptOutDate: "2026-09-14T07:42:10Z",
    firstTouchSource: "organic / google",
    lastTouchSource: "organic / google",
    intentTier: "COLD",
    assignedRep: "Mark D. (Inbound Lead Qualifier)"
  },
  {
    id: 1046,
    name: "Marcus Vance",
    phone: "+61 419 330 771",
    email: "m.vance@joondalupconstruct.com.au",
    orgName: "Vance Urban Projects",
    leadScore: 74,
    smsConsent: true,
    firstTouchSource: "instagram / ad",
    lastTouchSource: "google_search / brand",
    intentTier: "HOT",
    assignedRep: "Liam K. (Senior Sales Consultant)"
  }
];

export const INITIAL_DEALS: PipedriveDeal[] = [
  {
    id: 501,
    title: "Double-Storey Custom Build - Cottesloe Lot 14",
    value: 485000,
    currency: "AUD",
    stage: "SMS_QUALIFYING",
    personId: 1042,
    personName: "Lachlan Evans",
    phone: "+61 412 839 201",
    assignedRep: "Liam K. (Senior Sales Consultant)",
    lastActivityDate: "2026-09-14 08:04",
    aiConversationState: "ACTIVE",
    unreadSmsCount: 1
  },
  {
    id: 502,
    title: "Coastal Modern Villa - Scarborough Beach Rd",
    value: 360000,
    currency: "AUD",
    stage: "NEW_INQUIRY",
    personId: 1043,
    personName: "Sarah Jenkins",
    phone: "+61 423 710 492",
    assignedRep: "Chloe T. (Design & Feasibility Rep)",
    lastActivityDate: "2026-09-14 07:30",
    aiConversationState: "ACTIVE",
    unreadSmsCount: 0
  },
  {
    id: 503,
    title: "Multi-Unit Triplex Development - Subiaco",
    value: 920000,
    currency: "AUD",
    stage: "SALES_HANDOVER",
    personId: 1044,
    personName: "Dean O'Connor",
    phone: "+61 434 982 115",
    assignedRep: "Shaun M. (Head of Growth - Perth)",
    lastActivityDate: "2026-09-14 08:12",
    aiConversationState: "HANDOVER_PENDING",
    unreadSmsCount: 2
  },
  {
    id: 504,
    title: "Luxury Single Storey Renovation - Applecross",
    value: 240000,
    currency: "AUD",
    stage: "LOST",
    personId: 1045,
    personName: "Jessica Taylor",
    phone: "+61 405 621 884",
    assignedRep: "Mark D. (Inbound Lead Qualifier)",
    lastActivityDate: "2026-09-14 07:42",
    aiConversationState: "OPTED_OUT",
    unreadSmsCount: 0
  },
  {
    id: 505,
    title: "Duplex Investment Package - Joondalup",
    value: 620000,
    currency: "AUD",
    stage: "CONSULTATION_BOOKED",
    personId: 1046,
    personName: "Marcus Vance",
    phone: "+61 419 330 771",
    assignedRep: "Liam K. (Senior Sales Consultant)",
    lastActivityDate: "2026-09-13 16:20",
    aiConversationState: "PAUSED_REP",
    unreadSmsCount: 0
  }
];

export const INITIAL_SMS_CONVERSATIONS: Record<number, SmsMessage[]> = {
  501: [
    {
      id: "sms_1",
      direction: "OUTBOUND",
      sender: "Sinch Gateway (+61 488 840 219)",
      recipient: "+61 412 839 201",
      text: "G'day Lachlan, thanks for your inquiry on the Cottesloe custom build series. Are you looking to commence construction within the next 3-6 months, or still securing land titles?",
      timestamp: "07:55 AM",
      deliveryStatus: "DELIVERED",
      aiGenerated: true
    },
    {
      id: "sms_2",
      direction: "INBOUND",
      sender: "+61 412 839 201",
      recipient: "Sinch Gateway (+61 488 840 219)",
      text: "Hey! Titles are already issued for Lot 14. We want to start site works by November if plans are approved. Do you have 4-bedroom layouts for narrow blocks?",
      timestamp: "08:02 AM",
      deliveryStatus: "RECEIVED"
    },
    {
      id: "sms_3",
      direction: "OUTBOUND",
      sender: "Sinch Gateway (+61 488 840 219)",
      recipient: "+61 412 839 201",
      text: "Yes, our Horizon 42 design is specifically engineered for 10m-12m Perth frontage lots. I've noted your November timeline in your file. Would you like me to book a 15-min discovery call with Liam from our design team this Wednesday at 2pm?",
      timestamp: "08:04 AM",
      deliveryStatus: "DELIVERED",
      aiGenerated: true
    }
  ],
  503: [
    {
      id: "sms_10",
      direction: "OUTBOUND",
      sender: "Sinch Gateway (+61 488 840 219)",
      recipient: "+61 434 982 115",
      text: "Hi Dean, thanks for submitting your feasibility request for the Subiaco site. Quick question: is the zoning R40 or R60?",
      timestamp: "07:48 AM",
      deliveryStatus: "DELIVERED",
      aiGenerated: true
    },
    {
      id: "sms_11",
      direction: "INBOUND",
      sender: "+61 434 982 115",
      recipient: "Sinch Gateway (+61 488 840 219)",
      text: "It's R60. We're ready to proceed with financing approved through Bankwest. Can I speak to a real salesperson right now? I have the survey drawings ready to email.",
      timestamp: "08:11 AM",
      deliveryStatus: "RECEIVED"
    },
    {
      id: "sms_12",
      direction: "OUTBOUND",
      sender: "Sinch Gateway (+61 488 840 219)",
      recipient: "+61 434 982 115",
      text: "Understood Dean! I've escalated your file to Shaun M. immediately with priority status. He has your phone number and survey request on his dashboard and will ring you shortly.",
      timestamp: "08:12 AM",
      deliveryStatus: "DELIVERED",
      aiGenerated: true,
      handoverTriggered: true
    }
  ],
  504: [
    {
      id: "sms_20",
      direction: "OUTBOUND",
      sender: "Sinch Gateway (+61 488 840 219)",
      recipient: "+61 405 621 884",
      text: "Hi Jessica, following up on your luxury renovation inquiry for Applecross. When is a good time to review your concept sketches?",
      timestamp: "07:35 AM",
      deliveryStatus: "DELIVERED",
      aiGenerated: true
    },
    {
      id: "sms_21",
      direction: "INBOUND",
      sender: "+61 405 621 884",
      recipient: "Sinch Gateway (+61 488 840 219)",
      text: "STOP. Please remove me from your list.",
      timestamp: "07:42 AM",
      deliveryStatus: "RECEIVED",
      optOutDetected: true
    },
    {
      id: "sms_22",
      direction: "OUTBOUND",
      sender: "Sinch Gateway (+61 488 840 219)",
      recipient: "+61 405 621 884",
      text: "You have been unsubscribed. No further messages will be sent. Pipedrive record updated under Australian Spam Act & TNZ rules.",
      timestamp: "07:42 AM",
      deliveryStatus: "DELIVERED",
      aiGenerated: false,
      optOutDetected: true
    }
  ]
};

export const INITIAL_WEBHOOK_LOGS: WebhookLogEvent[] = [
  {
    id: "wh_101",
    timestamp: "08:12:04",
    source: "SINCH",
    event: "inbound_sms.received",
    status: "PROCESSED",
    latencyMs: 142,
    payloadSummary: "Inbound text matched Deal #503 (Dean O'Connor). Triggered AI Handover intent.",
    targetEntity: "Pipedrive Deal #503 & Person #1044"
  },
  {
    id: "wh_102",
    timestamp: "08:12:05",
    source: "PIPEDRIVE",
    event: "activity.created",
    status: "SUCCESS",
    latencyMs: 98,
    payloadSummary: "High-priority Urgent Call Activity created for Shaun M.",
    targetEntity: "Pipedrive Activity #924"
  },
  {
    id: "wh_103",
    timestamp: "08:04:12",
    source: "SINCH",
    event: "outbound_sms.delivered",
    status: "SUCCESS",
    latencyMs: 84,
    payloadSummary: "SMS dispatch to +61 412 839 201 via Sinch Australian Route (Carrier: Telstra)",
    targetEntity: "Sinch Batch #b_89324"
  },
  {
    id: "wh_104",
    timestamp: "07:42:10",
    source: "SINCH",
    event: "inbound_sms.opt_out",
    status: "PROCESSED",
    latencyMs: 110,
    payloadSummary: "Keyword 'STOP' identified. Synchronized TNZ suppression and updated custom field.",
    targetEntity: "Pipedrive Person #1045"
  },
  {
    id: "wh_105",
    timestamp: "07:30:19",
    source: "PIPEDRIVE",
    event: "deal.stage_changed",
    status: "PROCESSED",
    latencyMs: 76,
    payloadSummary: "Deal #502 moved to 'New Inquiry' -> Initiated Sinch outbound queue without Zapier",
    targetEntity: "Pipedrive Deal #502"
  },
  {
    id: "wh_106",
    timestamp: "07:15:00",
    source: "POWER_BI",
    event: "scheduled_sync.completed",
    status: "SUCCESS",
    latencyMs: 310,
    payloadSummary: "Delta sync: 48 deals, 128 activities, 5 pipelines structured into Star Schema",
    targetEntity: "Power BI Dataset #pd_warehouse_v1"
  }
];

export const INITIAL_ATTRIBUTION_TOUCHPOINTS: AttributionTouchpoint[] = [
  {
    id: "att_1",
    sessionId: "sess_wa_893241",
    timestamp: "08:05:14",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "perth_custom_builders_brand",
    pagePath: "/floor-plans/horizon-42-narrow-lot",
    action: "FLOOR_PLAN_VIEW",
    leadScoreDelta: 15,
    matchedPersonId: 1042,
    matchedPersonName: "Lachlan Evans"
  },
  {
    id: "att_2",
    sessionId: "sess_wa_893241",
    timestamp: "08:08:22",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "perth_custom_builders_brand",
    pagePath: "/pricing/turnkey-calculator",
    action: "PRICING_CALC",
    leadScoreDelta: 25,
    matchedPersonId: 1042,
    matchedPersonName: "Lachlan Evans"
  },
  {
    id: "att_3",
    sessionId: "sess_wa_772109",
    timestamp: "07:58:30",
    utmSource: "linkedin",
    utmMedium: "sponsored",
    utmCampaign: "subiaco_development_opportunities",
    pagePath: "/commercial-feasibility-guide.pdf",
    action: "BROCHURE_DOWNLOAD",
    leadScoreDelta: 30,
    matchedPersonId: 1044,
    matchedPersonName: "Dean O'Connor"
  },
  {
    id: "att_4",
    sessionId: "sess_wa_651093",
    timestamp: "07:22:11",
    utmSource: "facebook",
    utmMedium: "paid_social",
    utmCampaign: "coastal_living_inspo_2026",
    pagePath: "/gallery/scarborough-coastal-villa",
    action: "PAGE_VIEW",
    leadScoreDelta: 5,
    matchedPersonId: 1043,
    matchedPersonName: "Sarah Jenkins"
  }
];

export const POWER_BI_SCHEMAS: PowerBiEntitySchema[] = [
  {
    tableName: "Fact_Deals",
    tableType: "FACT",
    recordCount: 1482,
    lastSyncTimestamp: "2026-09-14 08:00 AEST",
    columns: [
      { name: "deal_id", dataType: "Integer (Primary Key)", description: "Unique Pipedrive Deal identifier" },
      { name: "person_id", dataType: "Integer (Foreign Key)", description: "Associated customer Person ID" },
      { name: "org_id", dataType: "Integer (Foreign Key)", description: "Associated builder or company Organization ID" },
      { name: "user_id", dataType: "Integer (Foreign Key)", description: "Assigned sales representative ID" },
      { name: "stage_id", dataType: "Integer (Foreign Key)", description: "Current pipeline stage identifier" },
      { name: "deal_value", dataType: "Decimal (AUD)", description: "Total contract value in Australian Dollars" },
      { name: "won_time", dataType: "DateTime (Nullable)", description: "Exact timestamp when deal marked Won" },
      { name: "lost_time", dataType: "DateTime (Nullable)", description: "Exact timestamp when deal marked Lost" },
      { name: "lost_reason", dataType: "String (Nullable)", description: "Pipedrive structured lost reason category" },
      { name: "lead_score_at_close", dataType: "Integer", description: "Attribution lead score recorded at deal close" }
    ]
  },
  {
    tableName: "Dim_Persons",
    tableType: "DIMENSION",
    recordCount: 3840,
    lastSyncTimestamp: "2026-09-14 08:00 AEST",
    columns: [
      { name: "person_id", dataType: "Integer (Primary Key)", description: "Unique customer identifier" },
      { name: "full_name", dataType: "String", description: "Customer formatted name" },
      { name: "phone_e164", dataType: "String", description: "Standardized E.164 phone number" },
      { name: "email_hash", dataType: "String", description: "SHA256 hashed email for privacy & deduplication" },
      { name: "sms_consent_status", dataType: "Boolean", description: "TNZ & Australian Spam Act active consent flag" },
      { name: "first_touch_campaign", dataType: "String", description: "First documented marketing attribution channel" },
      { name: "last_touch_campaign", dataType: "String", description: "Last documented conversion touchpoint" },
      { name: "current_lead_score", dataType: "Integer", description: "Real-time computed engagement score" }
    ]
  },
  {
    tableName: "Fact_Activities",
    tableType: "FACT",
    recordCount: 9240,
    lastSyncTimestamp: "2026-09-14 08:00 AEST",
    columns: [
      { name: "activity_id", dataType: "Integer (Primary Key)", description: "Unique Pipedrive activity ID" },
      { name: "deal_id", dataType: "Integer (Foreign Key)", description: "Associated Deal ID" },
      { name: "type", dataType: "String", description: "call, sms_inbound, sms_outbound, meeting" },
      { name: "assigned_rep_id", dataType: "Integer", description: "Sales representative responsible" },
      { name: "done", dataType: "Boolean", description: "Completion status flag" },
      { name: "duration_minutes", dataType: "Integer", description: "Call duration or time spent" }
    ]
  },
  {
    tableName: "Dim_PipelineStages",
    tableType: "DIMENSION",
    recordCount: 24,
    lastSyncTimestamp: "2026-09-14 08:00 AEST",
    columns: [
      { name: "stage_id", dataType: "Integer (Primary Key)", description: "Stage ID in Pipedrive" },
      { name: "pipeline_name", dataType: "String", description: "Pipeline (e.g. Custom Homes, Multi-Unit)" },
      { name: "stage_name", dataType: "String", description: "Human-readable stage title" },
      { name: "order_nr", dataType: "Integer", description: "Display sort sequence in pipeline funnel" }
    ]
  }
];
