export type PipelineStage = 
  | "NEW_INQUIRY"
  | "SMS_QUALIFYING"
  | "SALES_HANDOVER"
  | "CONSULTATION_BOOKED"
  | "PROPOSAL_SENT"
  | "WON"
  | "LOST";

export type IntentTier = "HOT" | "WARM" | "COLD";

export type AiConversationState = "ACTIVE" | "HANDOVER_PENDING" | "PAUSED_REP" | "OPTED_OUT";

export interface PipedrivePerson {
  id: number;
  name: string;
  phone: string;
  email: string;
  orgName?: string;
  leadScore: number;
  smsConsent: boolean;
  smsOptOutDate?: string;
  firstTouchSource: string;
  lastTouchSource: string;
  intentTier: IntentTier;
  assignedRep: string;
}

export interface PipedriveDeal {
  id: number;
  title: string;
  value: number;
  currency: string;
  stage: PipelineStage;
  personId: number;
  personName: string;
  phone: string;
  assignedRep: string;
  lastActivityDate: string;
  aiConversationState: AiConversationState;
  unreadSmsCount: number;
}

export interface SmsMessage {
  id: string;
  direction: "INBOUND" | "OUTBOUND";
  sender: string;
  recipient: string;
  text: string;
  timestamp: string;
  deliveryStatus: "DELIVERED" | "SENT" | "RECEIVED" | "FAILED";
  aiGenerated?: boolean;
  handoverTriggered?: boolean;
  optOutDetected?: boolean;
}

export interface WebhookLogEvent {
  id: string;
  timestamp: string;
  source: "PIPEDRIVE" | "SINCH" | "TRACKING_PIXEL" | "POWER_BI";
  event: string;
  status: "SUCCESS" | "PROCESSED" | "FILTERED" | "QUEUED";
  latencyMs: number;
  payloadSummary: string;
  targetEntity: string;
}

export interface AttributionTouchpoint {
  id: string;
  sessionId: string;
  timestamp: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  pagePath: string;
  action: "PAGE_VIEW" | "BROCHURE_DOWNLOAD" | "PRICING_CALC" | "FLOOR_PLAN_VIEW" | "FORM_SUBMIT";
  leadScoreDelta: number;
  matchedPersonId?: number;
  matchedPersonName?: string;
}

export interface PowerBiEntitySchema {
  tableName: string;
  tableType: "FACT" | "DIMENSION";
  recordCount: number;
  lastSyncTimestamp: string;
  columns: {
    name: string;
    dataType: string;
    description: string;
  }[];
}
