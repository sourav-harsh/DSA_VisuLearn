import { FiChevronRight } from "react-icons/fi";
import type { SDNode, SDStep } from "@/utils/systemdesign/types";

interface Props {
  nodes: SDNode[];
  step: SDStep;
  index: number;
  total: number;
}

function toneFor(id: string, step: SDStep) {
  if (step.active?.includes(id))
    return "border-primary bg-primary/15 text-foreground shadow-[0_0_0_3px_var(--color-primary)]/20 scale-[1.04]";
  if (step.reject?.includes(id)) return "border-mark-reject bg-mark-reject/20 text-muted-foreground";
  if (step.done?.includes(id)) return "border-mark-done bg-mark-done/15 text-foreground";
  return "border-border bg-surface-2 text-muted-foreground";
}

export function FlowStage({ nodes, step, index, total }: Props) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="grid-fade rounded-lg p-4">
        <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
          {nodes.map((n, i) => (
            <div key={n.id} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`flex min-h-20 w-32 flex-col justify-center rounded-lg border px-3 py-2 text-center transition-all duration-300 ease-out sm:w-36 ${toneFor(
                  n.id,
                  step,
                )}`}
              >
                <span className="text-sm font-medium">{n.label}</span>
                {n.sub ? (
                  <span className="mt-1 text-[11px] leading-snug text-muted-foreground">
                    {n.sub}
                  </span>
                ) : null}
              </div>
              {i < nodes.length - 1 ? (
                <FiChevronRight className="shrink-0 text-muted-foreground/60" />
              ) : null}
            </div>
          ))}
        </div>

        {step.token ? (
          <div className="mt-4 flex justify-center">
            <span className="animate-fade-in rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              {step.token}
            </span>
          </div>
        ) : null}
      </div>

      <p className="mt-4 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-[13px] leading-6 text-foreground">
        <span className="mr-2 font-mono text-xs text-primary">
          {index + 1}/{total}
        </span>
        {step.caption}
      </p>
      {step.output ? (
        <p className="mt-2 font-mono text-xs text-mark-done">result: {step.output}</p>
      ) : null}
    </div>
  );
}