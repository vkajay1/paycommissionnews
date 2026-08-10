import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/pay-level/")({
  head: () => ({
    meta: [
      { title: "Pay Matrix Levels 1–18 — 7th & 8th CPC Salary by Level" },
      {
        name: "description",
        content:
          "Complete 7th CPC pay matrix — entry pay, grade and 8th Pay Commission projections for Level 1 through Level 18.",
      },
      { property: "og:url", content: `${SITE}/pay-level` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/pay-level` }],
  }),
  component: PayLevelIndex,
});

function PayLevelIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        Pay Matrix
      </span>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        7th CPC Pay Matrix — Levels 1 to 18
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Tap any level to see its entry pay, in-hand salary breakdown and 8th Pay Commission
        projection.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAY_LEVELS.map((l) => (
          <Link
            key={l.level}
            to="/pay-level/$level"
            params={{ level: String(l.level) }}
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Level {l.level}
              </div>
              <div className="mt-1 text-base font-semibold">{l.grade}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Entry basic {inr(l.entryPay)}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
