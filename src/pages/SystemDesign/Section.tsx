import { useState } from "react";
import { FiCheckCircle, FiGitBranch, FiZap } from "react-icons/fi";
import { CodeBlock } from "@/utils/components/CodeBlock";
import { PlayerControls } from "@/utils/components/PlayerControls";
import { SiteLayout } from "@/utils/components/SiteLayout";
import { useStepPlayer } from "@/utils/useStepPlayer";
import type { SDSection } from "@/utils/systemdesign/types";
import { FlowStage } from "./components/FlowStage";

export function SystemDesignSectionPage({ section }: { section: SDSection }) {
  const [activeId, setActiveId] = useState(section.concepts[0].id);
  const concept = section.concepts.find((c) => c.id === activeId) ?? section.concepts[0];
  const player = useStepPlayer(concept.steps.length, concept.id);
  const step = concept.steps[Math.min(player.step, concept.steps.length - 1)];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          System design · {section.kind}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {section.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{section.blurb}</p>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label={`${section.title} concepts`}
        >
          {section.concepts.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === concept.id}
              onClick={() => setActiveId(c.id)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                c.id === concept.id
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <header className="mt-8 border-b border-border pb-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">{concept.name}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{concept.tagline}</p>
          <p className="mt-4 inline-flex max-w-2xl items-start gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground">
            <FiZap className="mt-0.5 shrink-0 text-accent" />
            <span>
              <span className="text-accent">In plain words:</span> {concept.analogy}
            </span>
          </p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <FlowStage
              nodes={concept.nodes}
              step={step}
              index={Math.min(player.step, concept.steps.length - 1)}
              total={concept.steps.length}
            />
            <PlayerControls
              playing={player.playing}
              step={player.step}
              total={concept.steps.length}
              speed={player.speed}
              onToggle={player.toggle}
              onStep={player.move}
              onReset={player.reset}
              onScrub={player.scrub}
              onSpeed={player.setSpeed}
            />
            <CodeBlock code={concept.javaCode} language="java" />
            {concept.springCode ? (
              <div>
                {concept.springNote ? (
                  <p className="mb-2 text-sm text-muted-foreground">{concept.springNote}</p>
                ) : null}
                <CodeBlock code={concept.springCode} language="java · spring boot" />
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-lg font-semibold">How it works</h3>
              {concept.explanation.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-lg font-semibold">Use it when</h3>
              <ul className="mt-3 space-y-2">
                {concept.useWhen.map((u) => (
                  <li key={u} className="flex gap-2 text-sm text-muted-foreground">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-mark-done" />
                    {u}
                  </li>
                ))}
              </ul>
            </section>

            {concept.differsFrom ? (
              <section className="rounded-xl border border-border bg-surface p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <FiGitBranch className="text-primary" /> Often confused with
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {concept.differsFrom}
                </p>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}