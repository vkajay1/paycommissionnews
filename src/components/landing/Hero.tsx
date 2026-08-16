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
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              Live, no-reload calculations
            </span>
            <span>· 18 pay levels supported</span>
            <span>· Dark mode</span>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
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
