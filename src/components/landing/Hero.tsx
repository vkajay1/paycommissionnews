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
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-20">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            8th Pay Commission · Projection Engine
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Estimate your 8th Pay Commission salary{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              instantly.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Advanced salary, pension, arrear and pay-matrix calculators for Central Government
            employees — built with the polish of a modern fintech dashboard.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/salary">
                Calculate Salary <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
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
