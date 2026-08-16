import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lazyChart } from "@/components/charts/lazyChart";

const FitmentChart = lazyChart<{ basic?: number }>(
  () => import("./FitmentChart").then((m) => ({ default: m.FitmentChart })),
  280,
);

export function Hero() {
  return (
    <section className="relative border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-16 lg:pt-14">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            <Sparkles className="h-3 w-3" />
            8th Pay Commission · Projection Desk
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
            8th Pay Commission salary, pension and arrear projections
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground">
            A professional-grade calculator suite for Central and State Government employees,
            pensioners and defence personnel. Model any fitment factor, DA rate and city class in
            seconds — with the methodology shown alongside every result.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-md">
              <Link to="/salary">
                Calculate Salary <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-md">
              <a href="#tools">Explore Tools</a>
            </Button>
          </div>
          <dl className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border">
            {[
              { k: "18", v: "Pay levels covered" },
              { k: "36", v: "States & UTs" },
              { k: "25+", v: "Calculators" },
            ].map((s) => (
              <div key={s.v} className="px-4 py-3 first:pl-0">
                <dt className="text-xl font-bold text-primary">{s.k}</dt>
                <dd className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-success" />
            Live, no-reload calculations · methodology published on every page
          </p>
        </div>
        <div className="relative">
          <div className="rounded-lg border border-border bg-background p-5 shadow-card sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  Projected basic pay
                </div>
                <div className="text-lg font-bold">Across fitment factors</div>
              </div>
              <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-semibold text-success">
                LIVE
              </span>
            </div>
            <FitmentChart />
          </div>
        </div>
      </div>
    </section>
  );
}
