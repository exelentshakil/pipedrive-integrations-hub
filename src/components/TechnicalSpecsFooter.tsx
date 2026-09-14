"use client";

import React from "react";
import { 
  ShieldCheck, 
  Zap, 
  Database, 
  Terminal, 
  Lock, 
  Radio,
  Layers,
  CheckCircle2
} from "lucide-react";

export function TechnicalSpecsFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel)] py-8 mt-12 text-xs text-[var(--color-text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Architecture Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-[var(--color-border)]">
          
          <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
              <Zap className="h-4 w-4 text-amber-500 shrink-0" />
              <span>Zero-Zapier Architecture</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
              Native Pipedrive v1 webhooks dispatch events directly to serverless endpoints with sub-150ms execution times. Eliminates 5–15 minute Zapier polling delays and multi-step execution costs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>TNZ & Spam Act 2003 Compliance</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
              Immediate STOP / UNSUBSCRIBE keyword interception. Suppresses outbound SMS queues and synchronizes unsubscribe flags directly into Pipedrive Person custom fields.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
              <Database className="h-4 w-4 text-purple-500 shrink-0" />
              <span>Power BI Star Schema</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
              Transforms rate-limited Pipedrive REST payloads into normalized Fact and Dimension tables. Supports incremental delta refreshes with zero 429 throttling errors.
            </p>
          </div>

        </div>

        {/* Footer Meta Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--color-text-primary)]">
              Pipedrive Integration Hub v1.0
            </span>
            <span>•</span>
            <span>Perth Western Australia Regional Routing (AEST/AWST Optimized)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Pipedrive v1 API Verified</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium">
              <Radio className="h-3.5 w-3.5" />
              <span>Sinch Gateway Connected</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
