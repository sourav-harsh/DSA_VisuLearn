import { useState, type ReactNode } from "react";
import { FiGithub, FiMenu, FiX } from "react-icons/fi";
import { TbBinaryTree } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { topics } from "@/utils/topics";

const navBase =
  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground";
const navActive = "rounded-md px-3 py-2 text-sm bg-surface text-foreground";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TbBinaryTree size={20} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              DSA<span className="text-primary">Motion</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" end className={({ isActive }) => (isActive ? navActive : navBase)}>
              Home
            </NavLink>
            <NavLink to="/topics" className={({ isActive }) => (isActive ? navActive : navBase)}>
              All topics
            </NavLink>
            <NavLink
              to="/system-design"
              className={({ isActive }) => (isActive ? navActive : navBase)}
            >
              System design
            </NavLink>
            <Link to="/topic/sorting" className={navBase}>
              Start with sorting
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {open ? (
          <div className="max-h-[70vh] overflow-y-auto border-t border-border bg-surface px-4 py-3 lg:hidden">
            <Link
              to="/system-design"
              onClick={() => setOpen(false)}
              className="mb-2 block rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
            >
              System design — SOLID, OOP &amp; 23 patterns
            </Link>
            <div className="grid grid-cols-2 gap-1.5">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  to={`/topic/${t.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-muted-foreground">
            DSAMotion — {topics.length} topics, animated step by step.
          </p>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <FiGithub /> Built for learners, not for cramming.
          </span>
        </div>
      </footer>
    </div>
  );
}
