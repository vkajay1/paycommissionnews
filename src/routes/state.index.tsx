import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import { STATE_PAGES } from "@/lib/seo-pages";

const SITE = "https://paycommissionnews.lovable.app";

export const Route = createFileRoute("/state/")({
  head: () => ({
    meta: [
      { title: "State-wise 8th Pay Commission Salary Calculators — Odisha, TN, UP, Maharashtra, WB" },
      {
        name: "description",
        content:
          "State government employee salary calculators — Odisha, Tamil Nadu, Uttar Pradesh, Maharashtra and West Bengal. 7th CPC and 8th Pay Commission projections.",
      },
      { property: "og:url", content: `${SITE}/state` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/state` }],
  }),
  component: StateIndex,
});

function StateIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        State calculators
      </span>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        State-wise Pay Commission Calculators
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Pick your state to see cadre-wise salary and 8th CPC projections.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATE_PAGES.map((s) => (
          <Link
            key={s.slug}
            to="/state/$state"
            params={{ state: s.slug }}
            className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <MapPin className="h-3 w-3" /> {s.employees}
            </div>
            <div className="mt-2 text-lg font-bold">{s.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">Current DA {s.daPct}%</div>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              View salary <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
