import { FiClock, FiCpu, FiTrendingDown, FiTrendingUp, FiShield } from "react-icons/fi";
import type { Complexity } from "../types";

interface Props {
  name: string;
  tagline: string;
  complexity: Complexity;
}

function Chip({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "primary" | "accent";
}) {
  const tones = {
    default: "border-border bg-surface-2 text-foreground",
    primary: "border-primary/40 bg-primary/10 text-primary",
    accent: "border-accent/40 bg-accent/10 text-accent",
  } as const;
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${tones[tone]}`}
      title={`${label}: ${value}`}
    >
      <span className="text-sm opacity-80">{icon}</span>
      <span className="text-[10px] tracking-widest text-muted-foreground uppercase">{label}</span>
      <span className="font-mono text-sm font-medium">{value}</span>
    </div>
  );
}

export function ComplexityHeader({ name, tagline, complexity }: Props) {
  return (
    <header className="border-b border-border pb-6">
      <h2 className="text-2xl font-semibold sm:text-3xl">{name}</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Chip icon={<FiClock />} label="Time" value={complexity.time} tone="primary" />
        <Chip icon={<FiCpu />} label="Space" value={complexity.space} tone="accent" />
        {complexity.best ? (
          <Chip icon={<FiTrendingDown />} label="Best" value={complexity.best} />
        ) : null}
        {complexity.worst ? (
          <Chip icon={<FiTrendingUp />} label="Worst" value={complexity.worst} />
        ) : null}
        {complexity.stable ? (
          <Chip icon={<FiShield />} label="Stable" value={complexity.stable} />
        ) : null}
      </div>
    </header>
  );
}