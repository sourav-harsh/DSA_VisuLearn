import data from "@/data/topics.json";
import type { Topic } from "@/utils/types";

export const topics = data as unknown as Topic[];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export const totalAlgorithms = topics.reduce((n, t) => n + t.algorithms.length, 0);
