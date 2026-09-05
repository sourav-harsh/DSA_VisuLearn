export type Mark =
  | "compare"
  | "swap"
  | "active"
  | "done"
  | "range"
  | "reject"
  | "path"
  | "visit";

export interface AuxTrack {
  label: string;
  items: (string | number)[];
  /** index of the item to highlight */
  active?: number;
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
  mark?: Mark;
}

export interface Frame {
  /** Narration for this step. */
  note: string;
  array?: (number | string)[];
  marks?: Record<number, Mark>;
  grid?: (number | string | null)[][];
  gridMarks?: Record<string, Mark>;
  rowLabels?: string[];
  colLabels?: string[];
  nodes?: GraphNode[];
  edges?: GraphEdge[];
  nodeMarks?: Record<string, Mark>;
  aux?: AuxTrack[];
  output?: string;
}

export type Renderer = "bars" | "cells" | "grid" | "graph";

export interface Complexity {
  time: string;
  space: string;
  best?: string;
  worst?: string;
  stable?: string;
}

export interface Algorithm {
  id: string;
  name: string;
  tagline: string;
  complexity: Complexity;
  /** Multi-paragraph plain-English explanation. */
  explanation: string[];
  /** Worked example, shown as text next to the code. */
  example: string;
  code: string;
  renderer: Renderer;
  frames: Frame[];
}

export interface Topic {
  slug: string;
  title: string;
  blurb: string;
  icon: string;
  algorithms: Algorithm[];
}