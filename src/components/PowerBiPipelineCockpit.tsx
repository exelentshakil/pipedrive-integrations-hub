"use client";

import React, { useState } from "react";
import { PowerBiEntitySchema } from "@/lib/types";
import { POWER_BI_SCHEMAS } from "@/lib/constants";
import { 
  BarChart3, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Terminal, 
  FileSpreadsheet, 
  Zap, 
  Network,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PowerBiPipelineCockpit() {
  const [selectedTable, setSelectedTable] = useState<string>("Fact_Deals");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState("08:00 AEST");
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  const activeSchema = POWER_BI_SCHEMAS.find((s) => s.tableName === selectedTable) || POWER_BI_SCHEMAS[0];

  const handleManualDeltaSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshedTime(new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }) + " AEST");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Star Schema Architecture */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] truncate">
                Pipedrive → Power BI Star Schema Data Warehouse
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
              Transforms Pipedrive&apos;s flat, rate-limited REST endpoints into a normalized relational dimensional model. Optimized for Power BI DirectQuery or 15-minute scheduled delta refresh with zero API throttling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleManualDeltaSync}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")} />
              <span>{isRefreshing ? "Syncing Delta..." : "Trigger 15m Delta Sync"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Relational Star Schema Diagram Box */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
          <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Network className="h-4 w-4 text-amber-600" />
            <span>Power BI Relational Model (1-to-Many Relationships)</span>
          </h3>
          <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
            Last Delta Refresh: {lastRefreshedTime}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
          {POWER_BI_SCHEMAS.map((schema) => {
            const isSelected = schema.tableName === selectedTable;
            const isFact = schema.tableType === "FACT";

            return (
              <button
                key={schema.tableName}
                type="button"
                onClick={() => setSelectedTable(schema.tableName)}
                className={cn(
                  "p-3.5 rounded-xl border text-left transition-all space-y-2 group shadow-2xs shrink-0",
                  isSelected
                    ? "bg-[var(--color-panel-subtle)] border-amber-500 ring-1 ring-amber-500/20"
                    : "bg-[var(--color-panel)] border-[var(--color-border)] hover:border-amber-400/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-mono font-bold border whitespace-nowrap shrink-0",
                    isFact 
                      ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                      : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  )}>
                    {schema.tableType} TABLE
                  </span>
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                    {schema.recordCount.toLocaleString()} rows
                  </span>
                </div>

                <div className="font-bold text-sm text-[var(--color-text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {schema.tableName}
                </div>

                <p className="text-[11px] text-[var(--color-text-muted)]">
                  {schema.columns.length} columns defined
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Schema Inspector & REST/OData Feed Preview */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-4 sm:p-5 shadow-2xs space-y-4">
        
        {/* Schema Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Entity Definition: {activeSchema.tableName}
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-muted)] whitespace-nowrap shrink-0">
                {activeSchema.tableType}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Extracted from Pipedrive v1 API, normalized, and indexed for Power BI DirectQuery
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowJsonPreview(!showJsonPreview)}
              className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] text-xs font-semibold text-[var(--color-text-secondary)] flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <Terminal className="h-3.5 w-3.5 text-amber-600" />
              <span>{showJsonPreview ? "Hide JSON Payload" : "Inspect OData / REST JSON"}</span>
            </button>
          </div>
        </div>

        {/* JSON Preview Drawer */}
        {showJsonPreview && (
          <div className="p-3.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
              <span>GET /api/powerbi/{selectedTable.toLowerCase()}</span>
              <span className="text-emerald-600 font-semibold">200 OK • GZIP Compressed</span>
            </div>
            <pre className="p-3 rounded-md bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto max-h-[220px]">
{JSON.stringify({
  entity: activeSchema.tableName,
  totalRecords: activeSchema.recordCount,
  syncStrategy: "Incremental Delta (15m)",
  lastSyncAEST: lastRefreshedTime,
  sampleRow: activeSchema.columns.reduce((acc, col) => {
    acc[col.name] = col.dataType.includes("Integer") ? 1042 : col.dataType.includes("Decimal") ? 485000 : "sample_value";
    return acc;
  }, {} as Record<string, unknown>)
}, null, 2)}
            </pre>
          </div>
        )}

        {/* Enterprise Data Table (table-fixed w-full mandate) */}
        <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
          <table className="table-fixed w-full min-w-[680px] text-xs divide-y divide-[var(--color-border)]">
            <thead className="bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="w-[30%] px-4 py-2.5 text-left">Column Name</th>
                <th className="w-[30%] px-4 py-2.5 text-left">Power BI Data Type</th>
                <th className="w-[40%] px-4 py-2.5 text-left">Business Logic & Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-panel)]">
              {activeSchema.columns.map((col) => (
                <tr key={col.name} className="hover:bg-[var(--color-panel-subtle)]/60 transition-colors">
                  <td className="px-4 py-2.5 font-mono font-bold text-[var(--color-text-primary)]">
                    {col.name}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[var(--color-brand-primary)]">
                    {col.dataType}
                  </td>
                  <td className="px-4 py-2.5 text-[var(--color-text-secondary)] leading-relaxed">
                    {col.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Technical Callout Box: Why Flat Pipedrive API Fails vs Star Schema */}
        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
            <Zap className="h-4 w-4 shrink-0 text-amber-600" />
            <span>Why Power BI Fails on Raw Pipedrive API vs How This Pipeline Solves It:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-text-secondary)]">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-600 font-bold shrink-0">•</span>
              <span><strong>API Rate Limits:</strong> Pipedrive caps requests at 40-80 req/sec; direct Power BI connections time out on 1,000+ deals. This pipeline buffers delta changes in memory.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-600 font-bold shrink-0">•</span>
              <span><strong>Relational Normalization:</strong> Flat JSON objects from Pipedrive require messy Power Query transformations. The Star Schema provides clean 1-to-many relationship keys.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
