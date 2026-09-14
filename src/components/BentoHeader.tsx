"use client";

import React from "react";
import { 
  Zap, 
  ShieldCheck, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  Database,
  Radio
} from "lucide-react";

interface BentoHeaderProps {
  totalDeals: number;
  totalActivities: number;
  activeHandoverCount: number;
  optedOutCount: number;
}

export function BentoHeader({
  totalDeals,
  totalActivities,
  activeHandoverCount,
  optedOutCount
}: BentoHeaderProps) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-panel)] py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Card 1: Zero-Zapier Webhook Health */}
          <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Pipedrive v1 Webhook</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 whitespace-nowrap shrink-0">
                84ms Latency
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                Zero Zapier Lag
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Native HMAC-verified webhooks (<span className="text-emerald-600 font-semibold">&lt;200ms</span> dispatch vs. 5–15m Zapier polling).
              </p>
            </div>
          </div>

          {/* Card 2: Two-Way Sinch SMS Gateway */}
          <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                <span>Sinch 2-Way SMS</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 whitespace-nowrap shrink-0">
                AU Custom Sender
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                99.8% Delivery
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Telstra/Optus direct routes. E.164 normalization with TNZ & Spam Act sync.
              </p>
            </div>
          </div>

          {/* Card 3: Attribution & Identity Resolution */}
          <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Identity Matching</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 whitespace-nowrap shrink-0">
                Multi-Touch
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                94.2% Matched
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Anonymous web sessions linked to Pipedrive Person records & auto-scored.
              </p>
            </div>
          </div>

          {/* Card 4: Power BI Relational Warehouse */}
          <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Power BI Pipeline</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 whitespace-nowrap shrink-0">
                Star Schema
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                15m Delta Refresh
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Normalized Fact/Dim tables ready for DirectQuery or scheduled Power BI refresh.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
