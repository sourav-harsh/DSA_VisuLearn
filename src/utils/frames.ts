import type { Frame, GraphEdge, GraphNode, Mark } from "./types";

/** Build a frame for a linear array/cells visual. */
export function arr(
  values: (number | string)[],
  marks: Record<number, Mark>,
  note: string,
  extra: Partial<Frame> = {},
): Frame {
  return { array: [...values], marks: { ...marks }, note, ...extra };
}

/** Build a frame for a matrix visual. */
export function grid(
  cells: (number | string | null)[][],
  gridMarks: Record<string, Mark>,
  note: string,
  extra: Partial<Frame> = {},
): Frame {
  return {
    grid: cells.map((row) => [...row]),
    gridMarks: { ...gridMarks },
    note,
    ...extra,
  };
}

/** Build a frame for a node/edge visual (graphs, trees, tries, linked lists). */
export function graph(
  nodes: GraphNode[],
  edges: GraphEdge[],
  nodeMarks: Record<string, Mark>,
  note: string,
  extra: Partial<Frame> = {},
): Frame {
  return {
    nodes: nodes.map((n) => ({ ...n })),
    edges: edges.map((e) => ({ ...e })),
    nodeMarks: { ...nodeMarks },
    note,
    ...extra,
  };
}

export const key = (r: number, c: number) => `${r},${c}`;

/** Lay out an array of labels on a horizontal line. */
export function line(labels: string[], y = 50, x0 = 60, gap = 90): GraphNode[] {
  return labels.map((label, i) => ({ id: label + "#" + i, label, x: x0 + i * gap, y }));
}