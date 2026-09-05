import { Link } from "react-router-dom";
import { SiteLayout } from "@/utils/components/SiteLayout";
import { usePageMeta } from "@/utils/usePageMeta";

export function NotFoundPage() {
  usePageMeta("Page not found — DSAMotion", "That page does not exist.");
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you were looking for does not exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          Back home
        </Link>
      </div>
    </SiteLayout>
  );
}
