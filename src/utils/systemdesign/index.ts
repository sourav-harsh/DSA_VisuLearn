import data from "@/data/systemDesign.json";
import type { SDSection } from "@/utils/systemdesign/types";

export interface PatternRow {
  name: string;
  group: "Creational" | "Structural" | "Behavioral";
  solves: string;
  confusedWith: string;
}

const parsed = data as unknown as { sections: SDSection[]; patternTable: PatternRow[] };

export const sdSections: SDSection[] = parsed.sections;
export const patternTable: PatternRow[] = parsed.patternTable;

export function getSDSection(slug: string): SDSection | undefined {
  return sdSections.find((s) => s.slug === slug);
}

export const totalSDConcepts = sdSections.reduce((n, s) => n + s.concepts.length, 0);
