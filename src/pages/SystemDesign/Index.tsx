import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/utils/components/SiteLayout";
import { patternTable, sdSections, totalSDConcepts } from "@/utils/systemdesign";
import { usePageMeta } from "@/utils/usePageMeta";

export function SystemDesignIndexPage() {
  usePageMeta(
    "System Design — SDLC, SOLID, OOP & 23 Design Patterns",
    "Animated system design lessons: SDLC, SOLID principles, the four OOP pillars and all 23 GoF design patterns with Java and Spring Boot examples.",
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">System design</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Design concepts, animated
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {sdSections.length} sections · {totalSDConcepts} concepts. Every concept has a
          plain-English analogy, a step-by-step animation, and Java plus Spring Boot code.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sdSections.map((s) => (
            <Link
              key={s.slug}
              to={`/system-design/${s.slug}`}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/60"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold">{s.title}</h2>
                <span className="font-mono text-xs text-muted-foreground">{s.concepts.length}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.concepts.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary">
                Open <FiArrowRight />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            All 23 patterns, side by side
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            What each pattern solves and the pattern it is most often mistaken for.
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Pattern</th>
                  <th className="px-4 py-3 font-medium">Group</th>
                  <th className="px-4 py-3 font-medium">What it solves</th>
                  <th className="px-4 py-3 font-medium">Often confused with</th>
                </tr>
              </thead>
              <tbody>
                {patternTable.map((p) => (
                  <tr key={p.name} className="border-b border-border/60 last:border-b-0">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] text-primary">
                        {p.group}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.solves}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.confusedWith}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
