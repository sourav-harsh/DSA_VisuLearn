import { useState } from "react";
import { CodeBlock } from "@/utils/components/CodeBlock";
import { ComplexityHeader } from "@/utils/components/ComplexityHeader";
import { PlayerControls } from "@/utils/components/PlayerControls";
import { SiteLayout } from "@/utils/components/SiteLayout";
import { useStepPlayer } from "@/utils/useStepPlayer";
import type { Topic } from "@/utils/types";
import { Visualizer } from "./components/Visualizer";

export function TopicPage({ topic }: { topic: Topic }) {
  const [activeId, setActiveId] = useState(topic.algorithms[0].id);
  const algo = topic.algorithms.find((a) => a.id === activeId) ?? topic.algorithms[0];
  const player = useStepPlayer(algo.frames.length, algo.id);
  const frame = algo.frames[Math.min(player.step, algo.frames.length - 1)];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">{topic.title}</p>
        <p className="mt-2 max-w-2xl text-muted-foreground">{topic.blurb}</p>

        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label={`${topic.title} algorithms`}>
          {topic.algorithms.map((a) => (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={a.id === algo.id}
              onClick={() => setActiveId(a.id)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                a.id === algo.id
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <ComplexityHeader name={algo.name} tagline={algo.tagline} complexity={algo.complexity} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <Visualizer frame={frame} renderer={algo.renderer} />
              <p className="mt-4 min-h-[3rem] text-sm text-muted-foreground">{frame.note}</p>
            </div>
            <PlayerControls
              playing={player.playing}
              step={player.step}
              total={algo.frames.length}
              speed={player.speed}
              onToggle={player.toggle}
              onStep={player.move}
              onReset={player.reset}
              onScrub={player.scrub}
              onSpeed={player.setSpeed}
            />
          </div>

          <div className="space-y-4">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-display text-lg font-semibold">How it works</h2>
              {algo.explanation.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-display text-lg font-semibold">Worked example</h2>
              <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-muted-foreground">
                {algo.example}
              </pre>
            </section>
            <CodeBlock code={algo.code} />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}