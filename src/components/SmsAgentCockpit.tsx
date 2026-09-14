"use client";

import React, { useState } from "react";
import { 
  PipedriveDeal, 
  PipedrivePerson, 
  SmsMessage, 
  WebhookLogEvent 
} from "@/lib/types";
import { 
  formatCurrency, 
  cn, 
  getStageConfig, 
  getAiStateBadge 
} from "@/lib/utils";
import { 
  MessageSquare, 
  Send, 
  UserCheck, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  PhoneCall, 
  ExternalLink,
  Bot,
  User,
  ShieldCheck,
  Zap,
  RotateCcw
} from "lucide-react";

interface SmsAgentCockpitProps {
  deals: PipedriveDeal[];
  persons: PipedrivePerson[];
  conversations: Record<number, SmsMessage[]>;
  onSendInboundSms: (dealId: number, text: string) => void;
  onTriggerManualHandover: (dealId: number) => void;
  onSelectDeal: (dealId: number) => void;
  selectedDealId: number;
}

export function SmsAgentCockpit({
  deals,
  persons,
  conversations,
  onSendInboundSms,
  onTriggerManualHandover,
  onSelectDeal,
  selectedDealId
}: SmsAgentCockpitProps) {
  const [inputText, setInputText] = useState("");
  const [isSimulatingAi, setIsSimulatingAi] = useState(false);

  const selectedDeal = deals.find((d) => d.id === selectedDealId) || deals[0];
  const selectedPerson = persons.find((p) => p.id === selectedDeal.personId) || persons[0];
  const messages = conversations[selectedDeal.id] || [];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setInputText("");
    setIsSimulatingAi(true);

    onSendInboundSms(selectedDeal.id, text);

    setTimeout(() => {
      setIsSimulatingAi(false);
    }, 800);
  };

  const handlePresetMessage = (presetText: string) => {
    handleSend(presetText);
  };

  const isOptedOut = !selectedPerson.smsConsent;
  const isHandover = selectedDeal.stage === "SALES_HANDOVER" || selectedDeal.aiConversationState === "HANDOVER_PENDING";

  return (
    <div className="space-y-6">
      {/* Top Banner: Architecture & Capabilities */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] truncate">
                Native Pipedrive + AI SMS Agent (Sinch 2-Way Gateway)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
              Triggered immediately via Pipedrive v1 webhooks without Zapier latency. Full conversation memory, autonomous qualification, live salesperson handover, and strict TNZ / Australian Spam Act 2003 opt-out synchronization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 whitespace-nowrap shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>TNZ Opt-Out Guard: Active</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 whitespace-nowrap shrink-0">
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span>Zero-Zapier Latency (&lt;150ms)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Cockpit Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Deal Selector & Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Deal Picker Tabs */}
          <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-3 shadow-2xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2 px-1">
              Select Active Deal to Inspect Conversation:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {deals.map((deal) => {
                const isSelected = deal.id === selectedDeal.id;
                const stage = getStageConfig(deal.stage);
                const p = persons.find((person) => person.id === deal.personId);

                return (
                  <button
                    key={deal.id}
                    type="button"
                    onClick={() => onSelectDeal(deal.id)}
                    className={cn(
                      "p-2.5 rounded-lg border text-left transition-all min-w-[200px] shrink-0",
                      isSelected
                        ? "bg-[var(--color-panel-subtle)] border-[var(--color-brand-primary)] shadow-xs"
                        : "bg-[var(--color-panel)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                        {deal.personName}
                      </span>
                      <span className={cn("px-1.5 py-0.5 rounded text-xs font-mono font-semibold border whitespace-nowrap shrink-0", stage.badgeClass)}>
                        {stage.label}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] truncate">
                      {deal.title}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono mt-1 pt-1 border-t border-[var(--color-border)]/60">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(deal.value)}
                      </span>
                      <span className="text-[var(--color-text-muted)]">
                        {p?.phone}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SMS Chat Interface */}
          <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] shadow-2xs overflow-hidden flex flex-col h-[520px]">
            
            {/* Chat Header Bar */}
            <div className="p-3.5 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-xs shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] truncate">
                      {selectedPerson.name} ({selectedPerson.phone})
                    </h3>
                    {isOptedOut && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 whitespace-nowrap shrink-0">
                        OPTED OUT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono truncate">
                    Carrier: Telstra AU • Sender ID: Sinch Gateway (+61 488 840 219)
                  </p>
                </div>
              </div>

              {/* Status Pill */}
              <div className="shrink-0">
                {isHandover ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold whitespace-nowrap shrink-0">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Rep Handover Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold whitespace-nowrap shrink-0">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Autonomous AI Engaged</span>
                  </span>
                )}
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[var(--color-bg)]/40">
              {messages.map((msg) => {
                const isOutbound = msg.direction === "OUTBOUND";
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      isOutbound ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {isOutbound ? (
                        <>
                          <span className="text-xs font-mono text-[var(--color-text-muted)]">
                            {msg.timestamp}
                          </span>
                          <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-1">
                            <Bot className="h-3 w-3" />
                            <span>{msg.aiGenerated ? "AI Agent" : "System Dispatch"}</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{selectedPerson.name}</span>
                          </span>
                          <span className="text-xs font-mono text-[var(--color-text-muted)]">
                            {msg.timestamp}
                          </span>
                        </>
                      )}
                    </div>

                    <div
                      className={cn(
                        "p-3 rounded-xl text-xs sm:text-sm leading-relaxed shadow-2xs",
                        isOutbound
                          ? "bg-[var(--color-brand-primary)] text-white rounded-tr-none"
                          : "bg-[var(--color-panel)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-tl-none"
                      )}
                    >
                      {msg.text}
                    </div>

                    {/* Message Sub-Badges */}
                    <div className="flex items-center gap-2 mt-1 px-1 text-xs font-mono">
                      {msg.deliveryStatus === "DELIVERED" && (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Delivered (AU Sinch Route)</span>
                        </span>
                      )}
                      {msg.handoverTriggered && (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                          <PhoneCall className="h-2.5 w-2.5" />
                          <span>Pipedrive Urgent Activity Dispatched</span>
                        </span>
                      )}
                      {msg.optOutDetected && (
                        <span className="text-zinc-600 dark:text-zinc-400 font-semibold flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.2 rounded border border-zinc-300 dark:border-zinc-700">
                          <ShieldAlert className="h-2.5 w-2.5" />
                          <span>TNZ / Spam Act Opt-Out Recorded</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {isSimulatingAi && (
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-primary)] bg-purple-50 dark:bg-purple-950/40 p-2.5 rounded-lg border border-purple-200 dark:border-purple-800 w-fit">
                  <Sparkles className="h-3.5 w-3.5 animate-spin shrink-0" />
                  <span>AI Agent analyzing prompt & checking Pipedrive deal context...</span>
                </div>
              )}
            </div>

            {/* Inbound Simulator & Quick Trigger Buttons */}
            <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-panel)] space-y-2.5">
              
              {/* Quick Scenario Triggers */}
              <div>
                <div className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 flex items-center justify-between">
                  <span>Simulate Customer Inbound SMS (Click to test):</span>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Zero Zapier Latency</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    disabled={isOptedOut}
                    onClick={() => handlePresetMessage("Yes, we have land titles ready in Cottesloe. Budget is roughly $500k. Can we see 4-bed plans?")}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
                  >
                    💬 Qualification Query ($500k budget)
                  </button>

                  <button
                    type="button"
                    disabled={isOptedOut}
                    onClick={() => handlePresetMessage("I want to speak with a salesperson right now. I have drawings ready.")}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 font-semibold"
                  >
                    ⚡ Request Salesperson Now (Handover)
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePresetMessage("STOP")}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-50 dark:bg-red-950/40 hover:bg-red-100 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 transition-colors whitespace-nowrap shrink-0 font-semibold"
                  >
                    🛑 STOP (Test TNZ Opt-Out)
                  </button>
                </div>
              </div>

              {/* Freeform Inbound Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  disabled={isOptedOut}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder={
                    isOptedOut 
                      ? "Customer has opted out under TNZ rules. SMS dispatches blocked."
                      : "Type custom customer SMS (e.g. 'Can someone call me at 2pm?')..."
                  }
                  className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] disabled:opacity-50 transition-all font-sans"
                />
                <button
                  type="button"
                  disabled={isOptedOut || !inputText.trim()}
                  onClick={() => handleSend()}
                  className="px-3.5 py-2 rounded-lg bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-2xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Inbound</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Pipedrive Sync & Handover View (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Pipedrive Live Deal Record Card */}
          <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  PD
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                    Pipedrive Deal #{selectedDeal.id}
                  </h3>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    Updated live via REST API v1
                  </span>
                </div>
              </div>
              <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0", getStageConfig(selectedDeal.stage).badgeClass)}>
                {getStageConfig(selectedDeal.stage).label}
              </span>
            </div>

            {/* Deal Attribute Grid */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Deal Title:</span>
                <span className="font-semibold text-[var(--color-text-primary)] text-right truncate max-w-[220px]">
                  {selectedDeal.title}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Deal Value (AUD):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {formatCurrency(selectedDeal.value)}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Associated Person:</span>
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {selectedPerson.name} ({selectedPerson.orgName})
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Assigned Sales Rep:</span>
                <span className="font-semibold text-[var(--color-brand-primary)]">
                  {selectedDeal.assignedRep}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">AI State Machine:</span>
                <span className={cn("px-2 py-0.5 rounded text-xs font-mono font-semibold border whitespace-nowrap shrink-0", getAiStateBadge(selectedDeal.aiConversationState).badgeClass)}>
                  {getAiStateBadge(selectedDeal.aiConversationState).label}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">TNZ / Spam Act Status:</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-mono font-semibold border whitespace-nowrap shrink-0",
                  selectedPerson.smsConsent
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60"
                    : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/60"
                )}>
                  {selectedPerson.smsConsent ? "✓ Consent Active" : "🛑 Unsubscribed (Suppressed)"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[var(--color-text-muted)]">Attributed Lead Score:</span>
                <span className="font-bold font-mono text-[var(--color-brand-primary)]">
                  {selectedPerson.leadScore}/100 ({selectedPerson.intentTier})
                </span>
              </div>
            </div>

            {/* Handover Action Box */}
            <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <PhoneCall className="h-3.5 w-3.5 text-amber-600" />
                  <span>Salesperson Handover Logic</span>
                </span>
                {isHandover ? (
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500 text-white whitespace-nowrap shrink-0">
                    CALL SCHEDULED
                  </span>
                ) : (
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    Autonomous
                  </span>
                )}
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                When customer expresses explicit intent to talk, schedule a meeting, or requests pricing review, the AI halts autonomous replies and creates an immediate high-priority call task in Pipedrive.
              </p>

              {!isHandover && !isOptedOut && (
                <button
                  type="button"
                  onClick={() => onTriggerManualHandover(selectedDeal.id)}
                  className="w-full py-2 px-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Simulate Handover to Shaun M.</span>
                </button>
              )}
            </div>

            {/* Pipedrive Automated Activity Log Stream */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Live Pipedrive Activities Created:
              </div>
              
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                <div className="p-2 rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                    <span className="font-semibold text-[var(--color-text-primary)] truncate">
                      SMS Two-Way Ingestion: {messages.length} exchanges
                    </span>
                  </div>
                  <span className="text-[var(--color-text-muted)] font-mono shrink-0">Just now</span>
                </div>

                {isHandover && (
                  <div className="p-2 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <PhoneCall className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span className="font-bold text-amber-900 dark:text-amber-200 truncate">
                        Urgent Call Task: Shaun M. (Handover from AI)
                      </span>
                    </div>
                    <span className="text-amber-700 dark:text-amber-300 font-mono font-bold shrink-0">High Priority</span>
                  </div>
                )}

                {isOptedOut && (
                  <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <ShieldAlert className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate">
                        Custom Field: sms_opt_out = true (TNZ Synced)
                      </span>
                    </div>
                    <span className="text-zinc-500 font-mono shrink-0">Compliant</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
