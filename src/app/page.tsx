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

  const handleSendInboundSms = async (dealId: number, text: string) => {
    const timestamp = new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
    const targetDeal = deals.find((d) => d.id === dealId);
    const targetPerson = persons.find((p) => p.id === targetDeal?.personId);

    // 1. Add inbound message
    const inboundMsg: SmsMessage = {
      id: "sms_" + Date.now(),
      direction: "INBOUND",
      sender: targetPerson?.phone || "+61 400 000 000",
      recipient: "Sinch Gateway (+61 488 840 219)",
      text,
      timestamp,
      deliveryStatus: "RECEIVED"
    };

    setConversations((prev) => ({
      ...prev,
      [dealId]: [...(prev[dealId] || []), inboundMsg]
    }));

    // 2. Call Real AI Qualification API
    try {
      const history = (conversations[dealId] || []).slice(-4).map((m) => ({
        role: (m.direction === "INBOUND" ? "customer" : "assistant") as "customer" | "assistant",
        text: m.text
      }));

      const res = await fetch("/api/ai/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: targetPerson?.name || "Customer",
          dealTitle: targetDeal?.title || "Property Inquiry",
          customerMessage: text,
          conversationHistory: history,
          assignedRep: targetDeal?.assignedRep || "Shaun M."
        })
      });

      const json = await res.json();
      const aiData = json?.data || {
        reply: "Thanks for reaching out! Shaun M. has your inquiry on his desk and will follow up shortly.",
        intentTier: "WARM",
        aiConversationState: "ACTIVE",
        handoverNeeded: false,
        provider: "deterministic-fallback",
        model: "intent-state-machine-v1",
        latencyMs: 80,
        reasoning: "Autonomous qualification"
      };

      const replyTimestamp = new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });

      if (aiData.aiConversationState === "OPTED_OUT") {
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
          text: aiData.reply,
          timestamp: replyTimestamp,
          deliveryStatus: "DELIVERED",
          aiGenerated: false,
          optOutDetected: true
        };

        setConversations((prev) => ({
          ...prev,
          [dealId]: [...(prev[dealId] || []), optOutReply]
        }));

        const optOutLog: WebhookLogEvent = {
          id: "wh_" + Date.now(),
          timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          source: "SINCH",
          event: "inbound_sms.opt_out",
          status: "PROCESSED",
          latencyMs: aiData.latencyMs || 64,
          payloadSummary: `Spam Act 2003 / TNZ opt-out keyword intercepted. Phone ${targetPerson?.phone} suppressed in Pipedrive.`,
          targetEntity: `Pipedrive Person #${targetPerson?.id}`
        };
        setWebhookLogs((prev) => [optOutLog, ...prev]);

      } else if (aiData.handoverNeeded || aiData.aiConversationState === "HANDOVER_PENDING") {
        setDeals((prev) =>
          prev.map((d) =>
            d.id === dealId
              ? { ...d, stage: "SALES_HANDOVER", aiConversationState: "HANDOVER_PENDING" }
              : d
          )
        );

        setPersons((prev) =>
          prev.map((p) =>
            p.id === targetPerson?.id
              ? { ...p, intentTier: "HOT", leadScore: Math.min(100, p.leadScore + 25) }
              : p
          )
        );

        const handoverReply: SmsMessage = {
          id: "sms_reply_" + Date.now(),
          direction: "OUTBOUND",
          sender: "Sinch Gateway (+61 488 840 219)",
          recipient: targetPerson?.phone || "+61 400 000 000",
          text: aiData.reply,
          timestamp: replyTimestamp,
          deliveryStatus: "DELIVERED",
          aiGenerated: true,
          handoverTriggered: true
        };

        setConversations((prev) => ({
          ...prev,
          [dealId]: [...(prev[dealId] || []), handoverReply]
        }));

        const activityLog: WebhookLogEvent = {
          id: "wh_act_" + Date.now(),
          timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          source: "PIPEDRIVE",
          event: "activity.created",
          status: "SUCCESS",
          latencyMs: aiData.latencyMs || 92,
          payloadSummary: `[${(aiData.provider || "AI").toUpperCase()} ${aiData.model || "LLM"}] Intent HOT. Urgent Call task assigned to Shaun M.`,
          targetEntity: `Pipedrive Activity #urgent_${dealId}`
        };
        setWebhookLogs((prev) => [activityLog, ...prev]);

      } else {
        setPersons((prev) =>
          prev.map((p) =>
            p.id === targetPerson?.id
              ? { ...p, intentTier: aiData.intentTier, leadScore: Math.min(100, p.leadScore + 10) }
              : p
          )
        );

        const standardReply: SmsMessage = {
          id: "sms_reply_" + Date.now(),
          direction: "OUTBOUND",
          sender: "Sinch Gateway (+61 488 840 219)",
          recipient: targetPerson?.phone || "+61 400 000 000",
          text: aiData.reply,
          timestamp: replyTimestamp,
          deliveryStatus: "DELIVERED",
          aiGenerated: true
        };

        setConversations((prev) => ({
          ...prev,
          [dealId]: [...(prev[dealId] || []), standardReply]
        }));

        const aiLog: WebhookLogEvent = {
          id: "wh_ai_" + Date.now(),
          timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          source: "PIPEDRIVE",
          event: "sms.ai_qualification",
          status: "SUCCESS",
          latencyMs: aiData.latencyMs || 84,
          payloadSummary: `[${(aiData.provider || "AI").toUpperCase()} ${aiData.model || "LLM"}] Intent: ${aiData.intentTier}. ${aiData.reasoning || "Multi-turn qualification"}`,
          targetEntity: `Pipedrive Deal #${dealId}`
        };
        setWebhookLogs((prev) => [aiLog, ...prev]);
      }
    } catch (err) {
      console.error("AI qualification dispatch failed:", err);
    }
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
