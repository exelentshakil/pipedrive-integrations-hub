"use client";

import React, { useState } from "react";
import { 
  PipedrivePerson, 
  AttributionTouchpoint 
} from "@/lib/types";
import { 
  getIntentTierConfig, 
  cn 
} from "@/lib/utils";
import { 
  Target, 
  Layers, 
  Link2, 
  TrendingUp, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Calculator,
  UserCheck,
  Eye,
  PlusCircle
} from "lucide-react";

interface AttributionEngineCockpitProps {
  persons: PipedrivePerson[];
  touchpoints: AttributionTouchpoint[];
  onAddTouchpoint: (touchpoint: AttributionTouchpoint) => void;
  onSimulateIdentityMatch: (personId: number, scoreIncrement: number) => void;
}

export function AttributionEngineCockpit({
  persons,
  touchpoints,
  onAddTouchpoint,
  onSimulateIdentityMatch
}: AttributionEngineCockpitProps) {
  const [selectedPersonId, setSelectedPersonId] = useState<number>(persons[0].id);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "HOT" | "WARM" | "COLD">("ALL");

  const selectedPerson = persons.find((p) => p.id === selectedPersonId) || persons[0];

  const filteredPersons = persons.filter((p) => {
    if (activeFilter === "ALL") return true;
    return p.intentTier === activeFilter;
  });

  const personTouchpoints = touchpoints.filter(
    (t) => t.matchedPersonId === selectedPerson.id
  );

  const handleSimulateAction = (
    actionName: "FLOOR_PLAN_VIEW" | "PRICING_CALC" | "BROCHURE_DOWNLOAD",
    scoreDelta: number,
    path: string
  ) => {
    const newTouchpoint: AttributionTouchpoint = {
      id: "att_" + Date.now(),
      sessionId: "sess_wa_" + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "perth_modern_residences_q3",
      pagePath: path,
      action: actionName,
      leadScoreDelta: scoreDelta,
      matchedPersonId: selectedPerson.id,
      matchedPersonName: selectedPerson.name
    };

    onAddTouchpoint(newTouchpoint);
    onSimulateIdentityMatch(selectedPerson.id, scoreDelta);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Architecture Specs */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] truncate">
                Tracking Platform → Pipedrive + Lead Scoring Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
              Resolves anonymous client web sessions (UTM tags, cookie fingerprints) into Pipedrive Person entities. Evaluates multi-touch engagement weight and writes live custom fields: <code className="font-mono text-blue-600 dark:text-blue-400">lead_score</code>, <code className="font-mono text-blue-600 dark:text-blue-400">intent_tier</code>, <code className="font-mono text-blue-600 dark:text-blue-400">first_touch_source</code>, and <code className="font-mono text-blue-600 dark:text-blue-400">last_touch_source</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 whitespace-nowrap shrink-0">
              <Link2 className="h-3.5 w-3.5 shrink-0" />
              <span>Fingerprint Identity Resolver</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 whitespace-nowrap shrink-0">
              <TrendingUp className="h-3.5 w-3.5 shrink-0" />
              <span>Multi-Touch Custom Fields</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Attribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Persons Lead Scoring Roster (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-4 sm:p-5 shadow-2xs space-y-4">
            
            {/* Header & Filter Pill Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                  <span>Pipedrive Person Custom Fields Database</span>
                </h3>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Synced in real time via Pipedrive v1 API /persons/&#123;id&#125;
                </p>
              </div>

              {/* Segmented Filter Control */}
              <div className="flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)] shrink-0 self-start sm:self-auto">
                {(["ALL", "HOT", "WARM", "COLD"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0",
                      activeFilter === filter
                        ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    {filter === "ALL" ? "All (5)" : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Enterprise Fixed Data Table (Single-line controls & table-fixed mandate) */}
            <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
              <table className="table-fixed w-full min-w-[620px] text-xs divide-y divide-[var(--color-border)]">
                <thead className="bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="w-[32%] px-3.5 py-2.5 text-left">Person & Organization</th>
                    <th className="w-[20%] px-3 py-2.5 text-left">Lead Score</th>
                    <th className="w-[24%] px-3 py-2.5 text-left">Intent Tier</th>
                    <th className="w-[24%] px-3 py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-panel)]">
                  {filteredPersons.map((p) => {
                    const isSelected = p.id === selectedPerson.id;
                    const tierConfig = getIntentTierConfig(p.intentTier);

                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedPersonId(p.id)}
                        className={cn(
                          "cursor-pointer transition-colors",
                          isSelected
                            ? "bg-blue-50/70 dark:bg-blue-950/40 font-medium"
                            : "hover:bg-[var(--color-panel-subtle)]/60"
                        )}
                      >
                        <td className="px-3.5 py-3">
                          <div className="font-bold text-[var(--color-text-primary)] truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[var(--color-text-muted)] truncate font-mono">
                            {p.orgName}
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[var(--color-brand-primary)]">
                              {p.leadScore}
                            </span>
                            <div className="w-14 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  p.leadScore >= 80
                                    ? "bg-red-500"
                                    : p.leadScore >= 50
                                    ? "bg-amber-500"
                                    : "bg-slate-400"
                                )}
                                style={{ width: `${Math.min(p.leadScore, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <span className={cn("px-2 py-0.5 rounded text-[10px] font-mono font-bold border whitespace-nowrap shrink-0 inline-block", tierConfig.badgeClass)}>
                            {p.intentTier}
                          </span>
                        </td>

                        <td className="px-3 py-3 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPersonId(p.id);
                            }}
                            className={cn(
                              "px-2.5 py-1 rounded text-xs font-semibold border transition-colors whitespace-nowrap shrink-0",
                              isSelected
                                ? "bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]"
                                : "bg-[var(--color-panel)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)]"
                            )}
                          >
                            Inspect History
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Interactive Ingestion Simulator */}
            <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span>Simulate Live Web Action for {selectedPerson.name}:</span>
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  Session Match: Auto-resolves by cookie
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateAction("FLOOR_PLAN_VIEW", 15, "/plans/horizon-42-custom")}
                  className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] hover:border-blue-400 text-left transition-all group shadow-2xs shrink-0"
                >
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-primary)]">
                    <Eye className="h-3 w-3 text-blue-500 shrink-0" />
                    <span className="truncate">Floor Plan View</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    +15 Lead Score
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateAction("PRICING_CALC", 25, "/calculators/turnkey-builder-estimates")}
                  className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] hover:border-amber-400 text-left transition-all group shadow-2xs shrink-0"
                >
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-primary)]">
                    <Calculator className="h-3 w-3 text-amber-500 shrink-0" />
                    <span className="truncate">Pricing Calculator</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    +25 Lead Score
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateAction("BROCHURE_DOWNLOAD", 30, "/assets/perth-spec-guide-2026.pdf")}
                  className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] hover:border-red-400 text-left transition-all group shadow-2xs shrink-0"
                >
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-primary)]">
                    <FileText className="h-3 w-3 text-red-500 shrink-0" />
                    <span className="truncate">Brochure Download</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    +30 Lead Score
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Multi-Touch Attribution Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-4 sm:p-5 shadow-2xs space-y-4">
            
            {/* Person Profile Details */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Attribution Profile: {selectedPerson.name}
                </h3>
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  Pipedrive Person #{selectedPerson.id}
                </span>
              </div>
              <span className={cn("px-2 py-0.5 rounded text-xs font-mono font-bold border whitespace-nowrap shrink-0", getIntentTierConfig(selectedPerson.intentTier).badgeClass)}>
                {selectedPerson.intentTier}
              </span>
            </div>

            {/* Ingestion Attribution Fields */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)] font-medium">First Touch (Acquisition):</span>
                  <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                    {selectedPerson.firstTouchSource}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)] font-medium">Last Touch (Conversion):</span>
                  <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">
                    {selectedPerson.lastTouchSource}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Total Computed Lead Score:</span>
                <span className="font-mono font-bold text-base text-[var(--color-brand-primary)]">
                  {selectedPerson.leadScore} / 100
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Assigned Sales Representative:</span>
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {selectedPerson.assignedRep}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[var(--color-text-muted)]">TNZ SMS Consent Verified:</span>
                <span className={cn(
                  "font-mono font-semibold",
                  selectedPerson.smsConsent ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                )}>
                  {selectedPerson.smsConsent ? "YES (Active Opt-In)" : "NO (Opt-Out Recorded)"}
                </span>
              </div>
            </div>

            {/* Multi-Touch History Timeline */}
            <div className="space-y-2 pt-2 border-t border-[var(--color-border)]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Captured Web Session Touchpoints ({personTouchpoints.length}):
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {personTouchpoints.map((t) => (
                  <div
                    key={t.id}
                    className="p-2.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-[var(--color-text-muted)]">
                        {t.timestamp} • {t.sessionId}
                      </span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        +{t.leadScoreDelta} pts
                      </span>
                    </div>
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      {t.action.replace(/_/g, " ")}: <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">{t.pagePath}</span>
                    </div>
                    <div className="text-[10px] font-mono text-[var(--color-text-muted)]">
                      Campaign: {t.utmCampaign} ({t.utmSource}/{t.utmMedium})
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
