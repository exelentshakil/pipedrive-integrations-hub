import { NextResponse } from "next/server";
import { INITIAL_DEALS, INITIAL_PERSONS } from "@/lib/constants";

export async function GET() {
  const normalizedRows = INITIAL_DEALS.map((deal) => {
    const person = INITIAL_PERSONS.find((p) => p.id === deal.personId);
    return {
      deal_id: deal.id,
      person_id: deal.personId,
      person_name: deal.personName,
      phone_e164: deal.phone,
      deal_title: deal.title,
      deal_value_aud: deal.value,
      stage: deal.stage,
      assigned_sales_rep: deal.assignedRep,
      ai_conversation_state: deal.aiConversationState,
      lead_score: person?.leadScore ?? 50,
      intent_tier: person?.intentTier ?? "WARM",
      sms_consent_status: person?.smsConsent ?? true,
      last_activity_date: deal.lastActivityDate
    };
  });

  return NextResponse.json({
    table: "Fact_Deals",
    schemaType: "STAR_SCHEMA_FACT",
    recordCount: normalizedRows.length,
    lastRefreshAEST: new Date().toISOString(),
    data: normalizedRows
  });
}
