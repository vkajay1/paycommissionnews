import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase } from "lucide-react";
import { ROLE_PAGES } from "@/lib/seo-pages";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/role/")({
  head: () => ({
    meta: [
      { title: "Role-wise Salary Calculators — Loco Pilot, Station Master, Teacher, Defence" },
      {
        name: "description",
        content:
          "Role-wise 7th and 8th Pay Commission salary breakdowns for Loco Pilot, Station Master, PGT Teacher, Constable, Defence Jawan and Bank PO.",
      },
      { property: "og:url", content: `${SITE}/role` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/role` }],
  }),
  component: RoleIndex,
});

function RoleIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Role salary</span>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        Role-wise Salary Calculators
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Pick your cadre to see basic pay, allowances, in-hand salary and 8th CPC projections.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLE_PAGES.map((r) => (
          <Link
            key={r.slug}
            to="/role/$role"
            params={{ role: r.slug }}
            className="group rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Briefcase className="h-3 w-3" /> {r.department}
            </div>
            <div className="mt-2 text-lg font-bold">{r.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Level {r.level} · Basic {inr(r.basic)}
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              View salary <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
