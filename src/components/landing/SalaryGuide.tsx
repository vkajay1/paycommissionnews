import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  TrendingUp,
  Users,
  Shield,
  Languages,
  FileDown,
  CheckCircle2,
} from "lucide-react";

export function SalaryGuide() {
  return (
    <section
      id="guide"
      className="mx-auto max-w-4xl px-4 py-20 sm:px-6"
      aria-labelledby="guide-heading"
    >
      <header className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Complete Guide
        </span>
        <h2
          id="guide-heading"
          className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          8th Pay Commission Salary Calculator 2026
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          The 8th Pay Commission salary calculator helps you estimate your revised
          salary based on expected fitment factor, DA, HRA and allowances. Most
          projections suggest a <strong>20% to 40% salary hike in 2026</strong>,
          depending on your level, department and benefits.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/salary">
              <Calculator className="mr-2 h-4 w-4" />
              Open Salary Calculator
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/blog">Read 8th CPC Articles</Link>
          </Button>
        </div>
      </header>

      <article className="prose-article">
        <h3>How much could salary increase in 2026?</h3>
        <p>
          No official 8th CPC fitment factor or pay matrix has been notified. The
          calculator therefore compares user-selected scenarios rather than promising
          one final increase. Revised basic pay equals current basic pay multiplied by
          the selected factor; gross and in-hand changes also depend on how DA, HRA,
          transport allowance and deductions are treated.
        </p>

        <h3>What the calculator can establish</h3>
        <p>
          It can show the mathematical effect of each fitment factor on your present
          basic pay and allowances. It cannot predict the commission's recommendation,
          the government's implementation date or an official arrears period. Compare
          several scenarios and treat every result as a planning estimate.
        </p>

        <h3>How to use the 8th Pay Commission salary calculator</h3>
        <ol>
          <li>
            <strong>Select your employee type</strong> — central government,
            state, PSU, railway or defence.
          </li>
          <li>
            <strong>Choose your level or enter basic pay</strong> — if you know
            your pay level, select it; otherwise enter current basic.
          </li>
          <li>
            <strong>Enter DA percentage</strong> — use the latest DA rate
            (auto-filled in advanced mode).
          </li>
          <li>
            <strong>Select your city category</strong> — X (metro), Y or Z to
            apply the correct HRA slab.
          </li>
          <li>
            <strong>Add allowances</strong> — transport allowance and other
            benefits.
          </li>
          <li>
            <strong>Adjust the fitment factor slider</strong> — test scenarios
            between 2.8x and 3.2x.
          </li>
          <li>
            <strong>View results</strong> — gross, net and comparison with your
            current salary.
          </li>
        </ol>
        <h3>Central, state, pension and defence cases differ</h3>
        <p>
          Central employees follow central implementation orders. Each state decides
          whether, when and how to adopt a central revision. Pension and defence pay
          also require separate inputs such as commutation, Military Service Pay and
          risk or field allowances, so a general salary result should not be treated
          as a complete entitlement statement.
        </p>
      </article>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: TrendingUp, label: "Fitment slider 1.92x – 3.83x" },
          { icon: Users, label: "Central, state, PSU & defence" },
          { icon: Shield, label: "DA, HRA, TA + allowances" },
          { icon: Calculator, label: "Old vs new salary comparison" },
          { icon: Languages, label: "MACP & pay fixation calculator" },
          { icon: FileDown, label: "6th CPC & fitment factor tables" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
          >
            <Icon className="mt-0.5 h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        Updated for 2026 projections · Independent estimator, not an official tool
      </div>
    </section>
  );
}
