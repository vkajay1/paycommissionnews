import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SalaryForm, type SalaryFormState } from "@/components/salary/SalaryForm";
import { ResultsDashboard } from "@/components/salary/ResultsDashboard";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { compareSalary, type City } from "@/lib/cpc";

const searchSchema = z.object({
  level: z.coerce.number().int().min(1).max(18).optional(),
  basic: z.coerce.number().min(0).optional(),
  city: z.enum(["X", "Y", "Z"]).optional(),
  fit: z.coerce.number().min(1.5).max(4).optional(),
});

export const Route = createFileRoute("/salary")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Salary Calculator — 8th CPC Projection Dashboard" },
      {
        name: "description",
        content:
          "Live 8th Pay Commission salary calculator with fitment slider, city-based HRA, DA percentage and full revised breakdown.",
      },
      { property: "og:title", content: "8th CPC Salary Calculator" },
      {
        property: "og:description",
        content: "Project your revised salary with live charts and a fitment-factor slider.",
      },
      { property: "og:url", content: "/salary" },
    ],
    links: [{ rel: "canonical", href: "/salary" }],
  }),
  component: SalaryPage,
});

function SalaryPage() {
  const search = Route.useSearch();
  const [state, setState] = useState<SalaryFormState>({
    level: search.level ?? 7,
    basic: search.basic ?? 44900,
    city: (search.city as City) ?? "X",
    pension: "NPS",
    daPct: 60,
    hraOverride: null,
    fit: search.fit ?? 2.28,
  });

  const result = useMemo(
    () =>
      compareSalary({
        level: state.level,
        basicPay: state.basic,
        city: state.city,
        daPct: state.daPct,
        hraPct: state.hraOverride ?? undefined,
        fitmentFactor: state.fit,
      }),
    [state],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Salary calculator
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Project your 8th CPC salary
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Adjust pay level, city category, DA and fitment factor — figures recalculate live.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <DisclaimerBanner />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <SalaryForm value={state} onChange={setState} />
        <ResultsDashboard
          current={result.current}
          projected={result.projected}
          diff={result.diff}
          pctChange={result.pct}
        />
      </div>
    </div>
  );
}
