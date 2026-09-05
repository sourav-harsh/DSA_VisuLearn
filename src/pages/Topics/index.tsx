import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/utils/components/SiteLayout";
import { topics, totalAlgorithms } from "@/utils/topics";
import { usePageMeta } from "@/utils/usePageMeta";

export function TopicsPage() {
  usePageMeta(
    "All DSA Topics — Animated Algorithm Visualizer",
    "Browse every animated DSA topic: sorting, searching, graphs, trees, DP, greedy and more, each with complexity and worked examples.",
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          All topics
        </h1>
        <p className="mt-3 text-muted-foreground">
          {topics.length} topics · {totalAlgorithms} animated algorithms.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              to={`/topic/${t.slug}`}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/60"
            >
              <h2 className="font-display text-lg font-semibold">{t.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {t.algorithms.map((a) => (
                  <li
                    key={a.id}
                    className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {a.name}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary">
                Open <FiArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
