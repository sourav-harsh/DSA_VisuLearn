import type { Mark } from "./types";

export const markFill: Record<Mark, string> = {
  compare: "bg-mark-compare text-[oklch(0.2_0.03_250)] border-mark-compare",
  swap: "bg-mark-swap text-[oklch(0.98_0.005_250)] border-mark-swap",
  active: "bg-mark-active text-[oklch(0.19_0.03_240)] border-mark-active",
  done: "bg-mark-done text-[oklch(0.19_0.03_240)] border-mark-done",
  range: "bg-mark-range/30 text-foreground border-mark-range",
  reject: "bg-mark-reject/40 text-foreground border-mark-reject line-through",
  path: "bg-mark-path text-[oklch(0.19_0.03_240)] border-mark-path",
  visit: "bg-mark-visit/70 text-foreground border-mark-visit",
};

export const markStroke: Record<Mark, string> = {
  compare: "var(--mark-compare)",
  swap: "var(--mark-swap)",
  active: "var(--mark-active)",
  done: "var(--mark-done)",
  range: "var(--mark-range)",
  reject: "var(--mark-reject)",
  path: "var(--mark-path)",
  visit: "var(--mark-visit)",
};

export const legend: { mark: Mark; label: string }[] = [
  { mark: "compare", label: "comparing" },
  { mark: "swap", label: "swap / write" },
  { mark: "active", label: "current" },
  { mark: "done", label: "finalised" },
  { mark: "range", label: "search space" },
  { mark: "reject", label: "pruned" },
  { mark: "path", label: "solution path" },
  { mark: "visit", label: "visited" },
];