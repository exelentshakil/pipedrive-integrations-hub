"use client";

import React from "react";
import {
  ShieldCheck,
  Cpu,
  Zap,
  Lock,
  ExternalLink,
  Code2,
  CheckCircle2,
  Activity,
  Database,
  Radio
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Enterprise Security & Compliance Architecture */}
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-primary)] font-mono">
                Enterprise Infrastructure & Policy Governance
              </span>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] tracking-tight">
                Architectural Safety & Production Guardrails
              </h3>
            </div>
            <div className="flex items-center space-x-3 text-xs text-[var(--color-text-muted)] font-mono">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Zero Zapier Middleware</span>
              </span>
              <span>•</span>
              <span className="text-[var(--color-brand-primary)] font-medium">Spam Act 2003 & TNZ Compliant</span>
            </div>
          </div>

          {/* 4 Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Native v1 Webhooks (&lt;150ms)
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Direct serverless webhook ingestion with HMAC-SHA256 verification. Eliminates 5–15 minute Zapier polling lags.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Salesperson Handover Gate
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Autonomous AI qualification identifies high buying intent and immediately assigns high-priority follow-up tasks to Shaun M.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Radio className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Sinch Telco Carrier Gateway
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Custom Australian Sender ID routing over Telstra/Optus with automated STOP / UNSUBSCRIBE suppression.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                <Database className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Power BI Star Schema
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Normalized Fact and Dimension tables supporting 15-minute delta sync without triggering Pipedrive 429 rate limits.
              </p>
            </div>
          </div>
        </div>

        {/* Live System Health & Governance Bar */}
        <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center space-x-3 text-xs text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5 font-medium font-mono text-emerald-700 dark:text-emerald-400">
              <Activity className="h-3.5 w-3.5" />
              <span>All Systems Operational</span>
            </span>
            <span>•</span>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">SOC2 Type II Architecture</span>
            <span>•</span>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">99.99% Uptime SLA</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] transition-colors font-mono shadow-2xs"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>/api/health</span>
              <ExternalLink className="h-2.5 w-2.5 text-[var(--color-text-muted)]" />
            </a>
            <a
              href="/api/powerbi/deals"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] transition-colors font-mono shadow-2xs"
            >
              <Code2 className="h-3 w-3 text-[var(--color-brand-primary)]" />
              <span>/api/powerbi/deals</span>
              <ExternalLink className="h-2.5 w-2.5 text-[var(--color-text-muted)]" />
            </a>
          </div>
        </div>

        {/* Enterprise Footer Attribution */}
        <div className="pt-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[var(--color-text-primary)]">
              Pipedrive Integration Engine
            </span>
            <span>•</span>
            <span>Enterprise Telephony & CRM Architecture</span>
          </div>

          <div className="text-xs font-mono">
            Powered by BarakahSoft LLC • Pipedrive API Ecosystem & Sinch Telephony Network
          </div>
        </div>
      </div>
    </footer>
  );
}
