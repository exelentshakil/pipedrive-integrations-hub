"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BentoHeader } from "@/components/BentoHeader";
import { SmsAgentCockpit } from "@/components/SmsAgentCockpit";
import { AttributionEngineCockpit } from "@/components/AttributionEngineCockpit";
import { PowerBiPipelineCockpit } from "@/components/PowerBiPipelineCockpit";
import { WebhookInspector } from "@/components/WebhookInspector";
import { Footer } from "@/components/Footer";
import { 
  INITIAL_DEALS, 
  INITIAL_PERSONS, 
  INITIAL_SMS_CONVERSATIONS, 
  INITIAL_WEBHOOK_LOGS, 
  INITIAL_ATTRIBUTION_TOUCHPOINTS 
} from "@/lib/constants";
import { 
  PipedriveDeal, 
  PipedrivePerson, 
  SmsMessage, 
  WebhookLogEvent, 
  AttributionTouchpoint 
} from "@/lib/types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"sms" | "attribution" | "powerbi" | "webhooks">("sms");
  const [deals, setDeals] = useState<PipedriveDeal[]>(INITIAL_DEALS);
  const [persons, setPersons] = useState<PipedrivePerson[]>(INITIAL_PERSONS);
  const [conversations, setConversations] = useState<Record<number, SmsMessage[]>>(INITIAL_SMS_CONVERSATIONS);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLogEvent[]>(INITIAL_WEBHOOK_LOGS);
  const [touchpoints, setTouchpoints] = useState<AttributionTouchpoint[]>(INITIAL_ATTRIBUTION_TOUCHPOINTS);
  const [selectedDealId, setSelectedDealId] = useState<number>(INITIAL_DEALS[0].id);

  const activeHandoverCount = deals.filter(
    (d) => d.stage === "SALES_HANDOVER" || d.aiConversationState === "HANDOVER_PENDING"
  ).length;

  const optedOutCount = persons.filter((p) => !p.smsConsent).length;

  const handleResetDemo = () => {
    setDeals(INITIAL_DEALS);
    setPersons(INITIAL_PERSONS);
    setConversations(INITIAL_SMS_CONVERSATIONS);
    setWebhookLogs(INITIAL_WEBHOOK_LOGS);
    setTouchpoints(INITIAL_ATTRIBUTION_TOUCHPOINTS);
    setSelectedDealId(INITIAL_DEALS[0].id);
    setActiveTab("sms");
  };

  const handleSendInboundSms = (dealId: number, text: string) => {
    const timestamp = new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
    const targetDeal = deals.find((d) => d.id === dealId);
    const targetPerson = persons.find((p) => p.id === targetDeal?.personId);

    const isStopWord = /stop|unsubscribe|cancel|quit/i.test(text.trim());
    const isHandoverTrigger = /salesperson|salesman|human|talk|speak|call me|urgent|drawings/i.test(text.trim());

    // 1. Add inbound message
    const inboundMsg: SmsMessage = {
      id: "sms_" + Date.now(),
      direction: "INBOUND",
      sender: targetPerson?.phone || "+61 400 000 000",
      recipient: "Sinch Gateway (+61 488 840 219)",
      text,
      timestamp,
      deliveryStatus: "RECEIVED",
      optOutDetected: isStopWord
    };

    setConversations((prev) => ({
      ...prev,
      [dealId]: [...(prev[dealId] || []), inboundMsg]
    }));

    // Log inbound webhook event
    const inboundLog: WebhookLogEvent = {
      id: "wh_" + Date.now(),
      timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      source: "SINCH",
      event: isStopWord ? "inbound_sms.opt_out" : "inbound_sms.received",
      status: "PROCESSED",
      latencyMs: Math.floor(75 + Math.random() * 45),
      payloadSummary: isStopWord 
        ? `Keyword '${text}' identified from ${targetPerson?.phone}. TNZ suppression activated.`
        : `Inbound text received for Deal #${dealId}. Pipedrive Person #${targetPerson?.id} matched.`,
      targetEntity: `Pipedrive Deal #${dealId} & Person #${targetPerson?.id}`
    };

    setWebhookLogs((prev) => [inboundLog, ...prev]);

    // 2. Process logic based on trigger
    setTimeout(() => {
      const replyTimestamp = new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });

      if (isStopWord) {
        // Opt-out logic under Australian Spam Act & TNZ
        setPersons((prev) =>
          prev.map((p) =>
            p.id === targetPerson?.id
              ? { ...p, smsConsent: false, smsOptOutDate: new Date().toISOString() }
              : p
          )
        );

        setDeals((prev) =>
          prev.map((d) =>
            d.id === dealId
              ? { ...d, stage: "LOST", aiConversationState: "OPTED_OUT" }
              : d
          )
        );

        const optOutReply: SmsMessage = {
          id: "sms_reply_" + Date.now(),
          direction: "OUTBOUND",
          sender: "Sinch Gateway (+61 488 840 219)",
          recipient: targetPerson?.phone || "+61 400 000 000",
          text: "You have been unsubscribed. No further messages will be sent. Pipedrive record updated under Australian Spam Act & TNZ rules.",
          timestamp: replyTimestamp,
          deliveryStatus: "DELIVERED",
          aiGenerated: false,
          optOutDetected: true
        };

        setConversations((prev) => ({
          ...prev,
          [dealId]: [...(prev[dealId] || []), optOutReply]
        }));

      } else if (isHandoverTrigger) {
        // Salesperson handover logic
        setDeals((prev) =>
          prev.map((d) =>
            d.id === dealId
              ? { ...d, stage: "SALES_HANDOVER", aiConversationState: "HANDOVER_PENDING" }
              : d
          )
        );

        const handoverReply: SmsMessage = {
          id: "sms_reply_" + Date.now(),
          direction: "OUTBOUND",
          sender: "Sinch Gateway (+61 488 840 219)",
          recipient: targetPerson?.phone || "+61 400 000 000",
          text: `Understood! I've paused autonomous AI and escalated your file directly to Shaun M. with high priority. He has your phone number and request on his Pipedrive desk and will reach out shortly.`,
          timestamp: replyTimestamp,
          deliveryStatus: "DELIVERED",
          aiGenerated: true,
          handoverTriggered: true
        };

        setConversations((prev) => ({
          ...prev,
          [dealId]: [...(prev[dealId] || []), handoverReply]
        }));

        // Log Pipedrive activity creation
        const activityLog: WebhookLogEvent = {
          id: "wh_act_" + Date.now(),
          timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          source: "PIPEDRIVE",
          event: "activity.created",
          status: "SUCCESS",
          latencyMs: 82,
          payloadSummary: `High-priority Urgent Call task dispatched to Shaun M. for Deal #${dealId}.`,
          targetEntity: `Pipedrive Activity #urgent_${dealId}`
        };

        setWebhookLogs((prev) => [activityLog, ...prev]);

      } else {
        // Autonomous AI qualification reply
        const standardReply: SmsMessage = {
          id: "sms_reply_" + Date.now(),
          direction: "OUTBOUND",
          sender: "Sinch Gateway (+61 488 840 219)",
          recipient: targetPerson?.phone || "+61 400 000 000",
          text: `Thanks for the details! I've updated your Pipedrive preferences for the Perth building team. Would you like me to send over our 2026 inclusions catalog, or schedule a 10-minute discovery chat with one of our design consultants this week?`,
          timestamp: replyTimestamp,
          deliveryStatus: "DELIVERED",
          aiGenerated: true
        };

        setConversations((prev) => ({
          ...prev,
          [dealId]: [...(prev[dealId] || []), standardReply]
        }));
      }
    }, 600);
  };

  const handleTriggerManualHandover = (dealId: number) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? { ...d, stage: "SALES_HANDOVER", aiConversationState: "HANDOVER_PENDING" }
          : d
      )
    );

    const activityLog: WebhookLogEvent = {
      id: "wh_act_" + Date.now(),
      timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      source: "PIPEDRIVE",
      event: "activity.created",
      status: "SUCCESS",
      latencyMs: 76,
      payloadSummary: `Manual Handover triggered: Urgent Call assigned to Shaun M. for Deal #${dealId}.`,
      targetEntity: `Pipedrive Activity #manual_${dealId}`
    };

    setWebhookLogs((prev) => [activityLog, ...prev]);
  };

  const handleAddTouchpoint = (touchpoint: AttributionTouchpoint) => {
    setTouchpoints((prev) => [touchpoint, ...prev]);
  };

  const handleSimulateIdentityMatch = (personId: number, scoreIncrement: number) => {
    setPersons((prev) =>
      prev.map((p) => {
        if (p.id !== personId) return p;
        const newScore = Math.min(p.leadScore + scoreIncrement, 100);
        const newTier = newScore >= 80 ? "HOT" : newScore >= 50 ? "WARM" : "COLD";
        return {
          ...p,
          leadScore: newScore,
          intentTier: newTier
        };
      })
    );
  };

  const handleTriggerSimulatedWebhook = (
    source: "PIPEDRIVE" | "SINCH" | "POWER_BI",
    eventName: string,
    summary: string
  ) => {
    const newLog: WebhookLogEvent = {
      id: "wh_sim_" + Date.now(),
      timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      source,
      event: eventName,
      status: "SUCCESS",
      latencyMs: Math.floor(65 + Math.random() * 40),
      payloadSummary: summary,
      targetEntity: `Target Entity ${source}_event`
    };

    setWebhookLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {/* Global Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetDemo={handleResetDemo}
        activeHandoverCount={activeHandoverCount}
      />

      {/* Bento Header Bar with Real-Time KPIs */}
      <BentoHeader
        totalDeals={deals.length}
        totalActivities={webhookLogs.length}
        activeHandoverCount={activeHandoverCount}
        optedOutCount={optedOutCount}
      />

      {/* Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "sms" && (
          <SmsAgentCockpit
            deals={deals}
            persons={persons}
            conversations={conversations}
            onSendInboundSms={handleSendInboundSms}
            onTriggerManualHandover={handleTriggerManualHandover}
            onSelectDeal={(dealId) => setSelectedDealId(dealId)}
            selectedDealId={selectedDealId}
          />
        )}

        {activeTab === "attribution" && (
          <AttributionEngineCockpit
            persons={persons}
            touchpoints={touchpoints}
            onAddTouchpoint={handleAddTouchpoint}
            onSimulateIdentityMatch={handleSimulateIdentityMatch}
          />
        )}

        {activeTab === "powerbi" && (
          <PowerBiPipelineCockpit />
        )}

        {activeTab === "webhooks" && (
          <WebhookInspector
            logs={webhookLogs}
            onTriggerSimulatedWebhook={handleTriggerSimulatedWebhook}
          />
        )}
      </main>

      {/* Engineering Architecture Specs Footer (strictly no proposals or screening questions in UI) */}
      <Footer />
    </div>
  );
}
