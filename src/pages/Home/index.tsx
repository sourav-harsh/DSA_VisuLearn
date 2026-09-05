import { Link } from "react-router-dom";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";
import { SiteLayout } from "@/utils/components/SiteLayout";
import { sdSections, totalSDConcepts } from "@/utils/systemdesign";
import { topics, totalAlgorithms } from "@/utils/topics";


export function HomePage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          Learn data structures & algorithms
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
          Watch every algorithm run, step by step.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {topics.length} topics and {totalAlgorithms} animated algorithms. Each one pairs a
          scrubable animation with a worked example, plain-English explanation and the time
          complexity right in the heading.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={`/topic/${"sorting"}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <FiPlayCircle /> Start with sorting
          </Link>
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
          >
            Browse all topics <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              to={`/topic/${t.slug}`}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/60"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">{t.title}</h2>
                <span className="font-mono text-xs text-muted-foreground">
                  {t.algorithms.length}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open topic <FiArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">System design</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            SDLC, SOLID, OOP pillars and all 23 design patterns
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {sdSections.length} sections and {totalSDConcepts} concepts, each with a plain-English
            analogy, an animated flow anyone can follow, and Java plus Spring Boot code.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {sdSections.map((s) => (
              <Link
                key={s.slug}
                to={`/system-design/${s.slug}`}
                className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                {s.title}
              </Link>
            ))}
          </div>
          <Link
            to="/system-design"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Explore system design <FiArrowRight />
          </Link>
        </div>
      </section>

    </SiteLayout>
  );
}