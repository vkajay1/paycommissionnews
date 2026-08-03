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
        <h3>Why everyone is searching for the 8th CPC salary calculator</h3>
        <p>
          The moment a new pay commission is announced, confusion spreads faster
          than clarity. Employees want one simple answer — how much will my salary
          increase. That is exactly where the <strong>8th pay commission salary
          calculator online</strong> becomes essential. Instead of guessing, you
          input your current salary details and instantly see an estimated
          revised salary. Modern calculators no longer stop at a single number —
          they simulate multiple fitment scenarios, include allowances and even
          estimate pension.
        </p>

        <h3>Expected 8th Pay Commission salary hike in 2026</h3>
        <p>
          The 7th Pay Commission used a fitment factor of <strong>2.57x</strong>.
          If the 8th CPC follows the same trajectory, the factor may rise to
          around <strong>3.0x</strong>. That sounds small, but in salary terms it
          is significant. A basic pay of ₹30,000 could become ₹90,000 before
          allowances. Once DA, HRA and TA are added on top, the final in-hand
          salary becomes much higher — which is exactly why searches like
          "8th pay commission salary hike 2026 calculator" are exploding.
        </p>

        <h3>8th Pay Commission salary slab — what changes to expect</h3>
        <p>
          Salary increase is not just multiplication, it is restructuring. Lower
          levels may see more aggressive growth to lift the minimum wage.
          Mid-level employees should get balanced increments. Higher officials
          will likely see controlled increases. The 8th CPC pay slab is
          strategically designed — which is why a <strong>level-based
          calculator</strong> is far more accurate than a generic one.
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
        <p>
          Users who actually <em>play</em> with the fitment slider understand
          their future salary much better than those who rely on a single
          headline number.
        </p>

        <h3>Features of a modern 8th CPC calculator</h3>
        <ul>
          <li>Real-time salary calculation without page reload</li>
          <li>Old vs new salary comparison with percentage increase</li>
          <li>Fitment factor slider for scenario testing</li>
          <li>Support for central and state government employees</li>
          <li>Special logic for army and defence personnel</li>
          <li>Pension calculation for retirees</li>
          <li>Salary projection for future years</li>
          <li>Arrears calculation</li>
          <li>Visual charts for clearer understanding</li>
          <li>Multi-language support including Hindi</li>
        </ul>

        <h3>Special use cases — pensioners and army personnel</h3>
        <p>
          For <strong>pensioners</strong>, pension is calculated as a percentage
          of revised basic pay, with DA continuing to apply on top. For{" "}
          <strong>defence personnel</strong>, the calculator must account for
          Military Service Pay, field area allowances and risk allowances —
          ignoring these gives completely inaccurate results.
        </p>

        <h3>Central vs state government employees — the hidden difference</h3>
        <p>
          Central employees usually receive pay commission updates faster. State
          governments may delay implementation depending on budget conditions,
          which is why users specifically search for "8th pay commission salary
          calculator central government" and the state variant separately. A
          good calculator supports both.
        </p>

        <h3>What most websites get wrong</h3>
        <p>
          Most tools assume a fixed fitment factor with no flexibility, ignore
          allowances (which make up a huge portion of salary), oversimplify
          pension and present static results that users can't explore. That
          creates a false sense of accuracy. A smart calculator should allow
          experimentation, not just calculation.
        </p>

        <h3>Why Hindi and PDF demand is growing</h3>
        <p>
          A large portion of government employees prefer Hindi interfaces and
          want downloadable salary breakdowns for reference — which is why
          searches for "<em>8th pay commission salary calculator in Hindi PDF
          download free</em>" are climbing. Hindi UI and PDF export are on our
          roadmap.
        </p>

        <h3>Final verdict</h3>
        <p>
          If you are serious about understanding your future salary, do not rely
          on guesses. Use an advanced <strong>8th pay commission salary
          calculator online</strong> that lets you adjust variables, compare
          results and visualise income growth. A calculator, built properly, is
          not just a tool — it is a financial planning companion.
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
