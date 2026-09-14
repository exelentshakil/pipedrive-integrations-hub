"use client";

import React from "react";
import { useTheme } from "next-themes";
import { 
  Radio, 
  MessageSquare, 
  Target, 
  BarChart3, 
  Terminal, 
  Sun, 
  Moon, 
  RotateCcw, 
  ShieldCheck,
  Zap,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTab: "sms" | "attribution" | "powerbi" | "webhooks";
  setActiveTab: (tab: "sms" | "attribution" | "powerbi" | "webhooks") => void;
  onResetDemo: () => void;
  activeHandoverCount: number;
}

export function Navbar({
  activeTab,
  setActiveTab,
  onResetDemo,
  activeHandoverCount
}: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-panel)]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Platform Badge */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
            <div className="h-9 w-9 rounded-lg bg-[var(--color-brand-primary)] flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
              PD
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm sm:text-base text-[var(--color-text-primary)] tracking-tight truncate">
                  Pipedrive Integration Hub
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 whitespace-nowrap shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Native v1 Webhooks</span>
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] truncate hidden sm:block">
                Sinch 2-Way AI SMS • Lead Scoring Attribution • Power BI Warehouse
              </p>
            </div>
          </div>

          {/* Project Navigation Switcher */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)] shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("sms")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
                activeTab === "sms"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              <MessageSquare className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>1. AI SMS Agent (Sinch)</span>
              {activeHandoverCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-xs font-bold shrink-0">
                  {activeHandoverCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("attribution")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
                activeTab === "attribution"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              <Target className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>2. Tracking & Lead Scoring</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("powerbi")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
                activeTab === "powerbi"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              <BarChart3 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>3. Power BI Star Schema</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("webhooks")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
                activeTab === "webhooks"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              <Terminal className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Webhook Logs</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Demo Reset Button */}
            <button
              type="button"
              onClick={onResetDemo}
              title="Reset simulator to clean state"
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[var(--color-text-muted)] shrink-0" />
              <span className="hidden sm:inline">Reset State</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
              className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] transition-colors shadow-2xs shrink-0"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-1 border-t border-[var(--color-border)] no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("sms")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 whitespace-nowrap shrink-0",
              activeTab === "sms"
                ? "bg-[var(--color-brand-primary)] text-white"
                : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]"
            )}
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            <span>AI SMS</span>
            {activeHandoverCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 text-xs font-bold shrink-0">
                {activeHandoverCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("attribution")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 whitespace-nowrap shrink-0",
              activeTab === "attribution"
                ? "bg-[var(--color-brand-primary)] text-white"
                : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]"
            )}
          >
            <Target className="h-3.5 w-3.5 shrink-0" />
            <span>Lead Scoring</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("powerbi")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 whitespace-nowrap shrink-0",
              activeTab === "powerbi"
                ? "bg-[var(--color-brand-primary)] text-white"
                : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]"
            )}
          >
            <BarChart3 className="h-3.5 w-3.5 shrink-0" />
            <span>Power BI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("webhooks")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 whitespace-nowrap shrink-0",
              activeTab === "webhooks"
                ? "bg-[var(--color-brand-primary)] text-white"
                : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]"
            )}
          >
            <Terminal className="h-3.5 w-3.5 shrink-0" />
            <span>Webhooks</span>
          </button>
        </div>
      </div>
    </header>
  );
}
