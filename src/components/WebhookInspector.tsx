"use client";

import React, { useState } from "react";
import { WebhookLogEvent } from "@/lib/types";
import { 
  Terminal, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Radio, 
  Database,
  RefreshCw,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WebhookInspectorProps {
  logs: WebhookLogEvent[];
  onTriggerSimulatedWebhook: (source: "PIPEDRIVE" | "SINCH" | "POWER_BI", eventName: string, summary: string) => void;
}

export function WebhookInspector({
  logs,
  onTriggerSimulatedWebhook
}: WebhookInspectorProps) {
  const [selectedLog, setSelectedLog] = useState<WebhookLogEvent | null>(logs[0]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                WH
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] truncate">
                Native Webhook & Event Dispatch Inspector
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
              Live HTTP listener validating incoming events from Pipedrive v1 REST endpoints and Sinch Two-Way SMS API with HMAC-SHA256 signature verification and sub-150ms execution times.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 whitespace-nowrap shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>HMAC-SHA256 Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Action Pills */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-4 shadow-2xs space-y-2.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Trigger Instant Webhook Simulation:
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onTriggerSimulatedWebhook(
              "PIPEDRIVE",
              "deal.stage_changed",
              "Deal #501 stage advanced to 'SMS Qualifying' by Liam K."
            )}
            className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Pipedrive: deal.stage_changed</span>
          </button>

          <button
            type="button"
            onClick={() => onTriggerSimulatedWebhook(
              "SINCH",
              "inbound_sms.received",
              "Customer text from +61 412 839 201 processed in 92ms via AU Gateway"
            )}
            className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            <Radio className="h-3.5 w-3.5 text-purple-500 shrink-0" />
            <span>Sinch: inbound_sms.received</span>
          </button>

          <button
            type="button"
            onClick={() => onTriggerSimulatedWebhook(
              "POWER_BI",
              "scheduled_sync.delta",
              "Star Schema delta sync committed: 4 tables refreshed in 280ms"
            )}
            className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            <Database className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Power BI: scheduled_sync.delta</span>
          </button>
        </div>
      </div>

      {/* Main Webhook Log Table & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Table Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] overflow-hidden shadow-2xs">
            <div className="p-3.5 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">
                Recent Inbound/Outbound Events ({logs.length})
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                Auto-refreshed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="table-fixed w-full min-w-[580px] text-xs divide-y divide-[var(--color-border)]">
                <thead className="bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="w-[18%] px-3 py-2 text-left">Time</th>
                    <th className="w-[22%] px-3 py-2 text-left">Source</th>
                    <th className="w-[38%] px-3 py-2 text-left">Event</th>
                    <th className="w-[22%] px-3 py-2 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-panel)]">
                  {logs.map((log) => {
                    const isSelected = selectedLog?.id === log.id;
                    return (
                      <tr
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className={cn(
                          "cursor-pointer transition-colors",
                          isSelected
                            ? "bg-purple-50/70 dark:bg-purple-950/40 font-medium"
                            : "hover:bg-[var(--color-panel-subtle)]/60"
                        )}
                      >
                        <td className="px-3 py-2.5 font-mono text-xs text-[var(--color-text-muted)]">
                          {log.timestamp}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-xs font-mono font-bold border whitespace-nowrap shrink-0",
                            log.source === "PIPEDRIVE"
                              ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                              : log.source === "SINCH"
                              ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                              : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                          )}>
                            {log.source}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 font-mono text-[var(--color-text-primary)] truncate">
                          {log.event}
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          {log.latencyMs}ms
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Log Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedLog ? (
            <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-4 sm:p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] truncate">
                    Event: {selectedLog.event}
                  </h3>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    ID: {selectedLog.id} • {selectedLog.timestamp}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
                  {selectedLog.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[var(--color-text-muted)] block text-xs font-medium uppercase tracking-wider">
                    Target Entity:
                  </span>
                  <div className="font-semibold text-[var(--color-text-primary)] font-mono mt-0.5">
                    {selectedLog.targetEntity}
                  </div>
                </div>

                <div>
                  <span className="text-[var(--color-text-muted)] block text-xs font-medium uppercase tracking-wider">
                    Processing Summary:
                  </span>
                  <div className="text-[var(--color-text-secondary)] mt-0.5 leading-relaxed bg-[var(--color-panel-subtle)] p-2.5 rounded-lg border border-[var(--color-border)]">
                    {selectedLog.payloadSummary}
                  </div>
                </div>

                <div>
                  <span className="text-[var(--color-text-muted)] block text-xs font-medium uppercase tracking-wider">
                    Execution Latency:
                  </span>
                  <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                    {selectedLog.latencyMs} ms (&lt;1% of Zapier 15m polling window)
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[var(--color-text-muted)] block text-xs font-medium uppercase tracking-wider mb-1">
                    Raw HTTP Headers & Signature:
                  </span>
                  <pre className="p-2.5 rounded-md bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto">
{`X-Pipedrive-Signature: sha256=9f8a8b...
X-Sinch-Timestamp: 2026-09-14T08:12:04Z
Content-Type: application/json
Status: 200 OK`}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-8 text-center text-xs text-[var(--color-text-muted)]">
              Select a webhook event from the table to inspect details
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
