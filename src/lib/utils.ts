import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PipelineStage, IntentTier, AiConversationState } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "AUD"): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export function getStageConfig(stage: PipelineStage): {
  label: string;
  badgeClass: string;
  dotColor: string;
} {
  switch (stage) {
    case "NEW_INQUIRY":
      return {
        label: "New Inquiry",
        badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
        dotColor: "bg-blue-500"
      };
    case "SMS_QUALIFYING":
      return {
        label: "AI SMS Qualifying",
        badgeClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60",
        dotColor: "bg-purple-500"
      };
    case "SALES_HANDOVER":
      return {
        label: "Sales Handover",
        badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
        dotColor: "bg-amber-500"
      };
    case "CONSULTATION_BOOKED":
      return {
        label: "Consultation Booked",
        badgeClass: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
        dotColor: "bg-emerald-500"
      };
    case "WON":
      return {
        label: "Won",
        badgeClass: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700",
        dotColor: "bg-emerald-600"
      };
    case "LOST":
      return {
        label: "Opted Out / Lost",
        badgeClass: "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
        dotColor: "bg-zinc-500"
      };
    default:
      return {
        label: stage,
        badgeClass: "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800",
        dotColor: "bg-zinc-400"
      };
  }
}

export function getIntentTierConfig(tier: IntentTier): {
  label: string;
  badgeClass: string;
} {
  switch (tier) {
    case "HOT":
      return {
        label: "Hot Intent (80-100)",
        badgeClass: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/60"
      };
    case "WARM":
      return {
        label: "Warm Intent (50-79)",
        badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
      };
    case "COLD":
      return {
        label: "Cold (0-49)",
        badgeClass: "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
      };
  }
}

export function getAiStateBadge(state: AiConversationState): {
  label: string;
  badgeClass: string;
} {
  switch (state) {
    case "ACTIVE":
      return {
        label: "AI Active",
        badgeClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60"
      };
    case "HANDOVER_PENDING":
      return {
        label: "Handover Pending",
        badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
      };
    case "PAUSED_REP":
      return {
        label: "Paused (Rep Handling)",
        badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60"
      };
    case "OPTED_OUT":
      return {
        label: "Opted Out (TNZ Suppressed)",
        badgeClass: "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
      };
  }
}
