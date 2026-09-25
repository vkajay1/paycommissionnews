import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Landmark, Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jobs } from "@/lib/jobs";
import { QuickCalc } from "./QuickCalc";

const categories = [
  { to: "/salary", label: "Salary", icon: Wallet },
  { to: "/pension", label: "Pension", icon: Landmark },
  { to: "/arrear", label: "Arrears", icon: Calculator },
  { to: "/income-tax-calculator", label: "Income tax", icon: Calculator },
] as const;

export function Hero() {
  const latestJobs = jobs.slice(0, 3);

  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
            Updated for FY 2026–27
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span className="text-primary">8th Pay Commission</span> Salary Calculator 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Salary, pension, arrear, DA and tax tools for Indian government employees and pensioners.
          </p>
          <form action="#tools" className="mx-auto mt-8 flex max-w-3xl items-center overflow-hidden rounded-lg border border-border bg-background p-2 shadow-card">
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <input aria-label="Search calculators" placeholder="Search calculators..." className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none sm:text-base" />
            <Button type="submit" size="lg" className="shrink-0 px-4 sm:px-8">Browse tools</Button>
          </form>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map(({ to, label, icon: Icon }) => (
              <Button key={to} asChild variant="outline" size="sm" className="rounded-full bg-background">
                <Link to={to}><Icon className="h-3.5 w-3.5" />{label}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8"><QuickCalc /></div>
          <aside className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-card lg:col-span-4">
            <div className="mb-4 flex items-center justify-between">
              <div><p className="text-xs font-semibold text-primary">NEW NOTIFICATIONS</p><h2 className="mt-1 text-xl font-bold">Latest government jobs</h2></div>
              <Button asChild variant="ghost" size="sm"><Link to="/latest-jobs">View all</Link></Button>
            </div>
            <div className="space-y-2">
              {latestJobs.map((job) => (
                <Link key={job.slug} to="/latest-jobs/$slug" params={{ slug: job.slug }} className="group flex items-center gap-3 rounded-md border border-border p-3 transition-all hover:border-primary/50 hover:shadow-sm">
                  {job.image ? <img src={job.image} alt="" width={112} height={64} className="h-12 w-16 rounded object-cover" /> : <div className="h-12 w-16 rounded bg-secondary" />}
                  <div className="min-w-0"><p className="truncate text-xs font-medium text-muted-foreground">{job.organization.split(" (")[0]}</p><h3 className="line-clamp-2 text-sm font-semibold group-hover:text-primary">{job.title}</h3></div>
                </Link>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-4 w-full"><Link to="/latest-jobs">Browse all jobs <ArrowRight /></Link></Button>
          </aside>
        </div>
      </div>
    </section>
  );
}
