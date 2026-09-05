import type { Frame, Renderer } from "@/utils/types";
import { markFill, markStroke } from "@/utils/markStyles";

interface Props {
  frame: Frame;
  renderer: Renderer;
}

function Bars({ frame }: { frame: Frame }) {
  const values = (frame.array ?? []).map((v) => (typeof v === "number" ? v : 0));
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-64 items-end justify-center gap-1.5 sm:gap-2">
      {values.map((v, i) => {
        const mark = frame.marks?.[i];
        return (
          <div key={i} className="flex w-full max-w-12 flex-col items-center gap-1">
            <span className="font-mono text-[11px] text-muted-foreground">{v}</span>
            <div
              className={`w-full rounded-t-md border transition-all duration-300 ease-out ${
                mark ? markFill[mark] : "border-border bg-surface-2"
              }`}
              style={{ height: `${Math.max((v / max) * 190, 6)}px` }}
            />
            <span className="font-mono text-[10px] text-muted-foreground/70">{i}</span>
          </div>
        );
      })}
    </div>
  );
}

function Cells({ frame }: { frame: Frame }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(frame.array ?? []).map((v, i) => {
        const mark = frame.marks?.[i];
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-14 min-w-14 items-center justify-center rounded-lg border px-2 font-mono text-base transition-all duration-300 ${
                mark ? markFill[mark] : "border-border bg-surface-2 text-foreground"
              }`}
            >
              {String(v)}
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/70">{i}</span>
          </div>
        );
      })}
    </div>
  );
}

function Grid({ frame }: { frame: Frame }) {
  const rows = frame.grid ?? [];
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-separate border-spacing-1">
        {frame.colLabels ? (
          <thead>
            <tr>
              {frame.rowLabels ? <th /> : null}
              {frame.colLabels.map((c, i) => (
                <th
                  key={i}
                  className="px-1 pb-1 font-mono text-[10px] font-normal text-muted-foreground"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {frame.rowLabels ? (
                <th className="pr-2 text-right font-mono text-[10px] font-normal text-muted-foreground">
                  {frame.rowLabels[r]}
                </th>
              ) : null}
              {row.map((cell, c) => {
                const mark = frame.gridMarks?.[`${r},${c}`];
                return (
                  <td key={c}>
                    <div
                      className={`flex h-10 min-w-10 items-center justify-center rounded-md border px-1.5 font-mono text-sm transition-all duration-300 ${
                        mark ? markFill[mark] : "border-border bg-surface-2 text-foreground"
                      } ${cell === null ? "opacity-40" : ""}`}
                    >
                      {cell === null ? "·" : String(cell)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GraphView({ frame }: { frame: Frame }) {
  const nodes = frame.nodes ?? [];
  const edges = frame.edges ?? [];
  const width = Math.max(...nodes.map((n) => n.x), 320) + 70;
  const height = Math.max(...nodes.map((n) => n.y), 180) + 70;
  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto h-64 w-full"
      role="img"
      aria-label="Algorithm state diagram"
    >
      {edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const stroke = e.mark ? markStroke[e.mark] : "var(--color-border)";
        return (
          <g key={i}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={stroke}
              strokeWidth={e.mark ? 3 : 1.6}
              className="transition-all duration-300"
            />
            {e.label ? (
              <text
                x={(a.x + b.x) / 2}
                y={(a.y + b.y) / 2 - 6}
                textAnchor="middle"
                className="fill-[var(--color-muted-foreground)] font-mono text-[11px]"
              >
                {e.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {nodes.map((n) => {
        const mark = frame.nodeMarks?.[n.id];
        const fill = mark ? markStroke[mark] : "var(--color-surface-2)";
        return (
          <g key={n.id} className="transition-all duration-300">
            <circle
              cx={n.x}
              cy={n.y}
              r={22}
              fill={fill}
              stroke={mark ? fill : "var(--color-border)"}
              strokeWidth={2}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              className="font-mono text-[12px]"
              fill={mark ? "oklch(0.19 0.03 240)" : "var(--color-foreground)"}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Visualizer({ frame, renderer }: Props) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="grid-fade rounded-lg p-4">
        {renderer === "bars" ? <Bars frame={frame} /> : null}
        {renderer === "cells" ? <Cells frame={frame} /> : null}
        {renderer === "grid" ? <Grid frame={frame} /> : null}
        {renderer === "graph" ? <GraphView frame={frame} /> : null}
      </div>

      {frame.aux?.length ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {frame.aux.map((track, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
              <div className="text-[10px] tracking-widest text-muted-foreground uppercase">
                {track.label}
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {track.items.length === 0 ? (
                  <span className="font-mono text-xs text-muted-foreground">empty</span>
                ) : (
                  track.items.map((item, j) => (
                    <span
                      key={j}
                      className={`rounded border px-2 py-0.5 font-mono text-xs ${
                        track.active === j
                          ? markFill.active
                          : "border-border bg-surface text-foreground"
                      }`}
                    >
                      {String(item)}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <p className="mt-4 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 font-mono text-[13px] leading-6 text-foreground">
        {frame.note}
      </p>
      {frame.output ? (
        <p className="mt-2 font-mono text-xs text-mark-done">output: {frame.output}</p>
      ) : null}
    </div>
  );
}