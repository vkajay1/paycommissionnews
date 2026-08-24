import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { Calculator, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";
import {
  CURRENT_DA,
  CURRENT_DA_FROM,
  DA_FREEZE_NOTE,
  DA_HISTORY,
  DA_OPTIONS,
  PREVIOUS_DA,
  PREVIOUS_DA_FROM,
  daPctFor,
} from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "What is the current DA rate for central government employees?",
    a: `Dearness Allowance is 60% of basic pay with effect from ${CURRENT_DA_FROM}. The Department of Expenditure notified the 2% increase over the earlier rate of 58% (which applied from ${PREVIOUS_DA_FROM}).`,
  },
  {
    q: "What was the previous DA rate?",
    a: `The previous instalment was 58%, effective from ${PREVIOUS_DA_FROM}. Before that DA stood at 55% from January 2025 and 53% from July 2024.`,
  },
  {
    q: "How do I calculate DA arrears between two rates?",
    a: "DA arrear = (new DA% − old DA%) ÷ 100 × basic pay × number of months for which the old rate was paid. This calculator does that automatically once you pick the current and previous DA instalments.",
  },
  {
    q: "What is Dearness Allowance (DA)?",
    a: "DA is a cost-of-living adjustment paid as a percentage of basic pay, revised every January and July on the 12-month average of the All India CPI-IW (base 2016 = 100). Pensioners receive the same percentage as Dearness Relief (DR).",
  },
  {
    q: "Will DA reset to 0% under the 8th Pay Commission?",
    a: "Yes. When a pay commission is implemented the accumulated DA is merged into the revised basic pay and DA restarts from 0%, exactly as it did in 2016 when 125% DA was merged and the 2.57 fitment factor applied.",
  },
];

export const Route = createFileRoute("/da-calculator")({
  head: () => ({
    meta: [
      { title: "DA Calculator 2026 — Current DA 60% & Previous DA Rate Arrears" },
      {
        name: "description",
        content:
          "Free DA calculator for central government employees and pensioners. Pick current DA (60% from Jan 2026) and previous DA rates year-wise, calculate DA arrears on basic pay and see 8th CPC impact.",
      },
      {
        name: "keywords",
        content:
          "da calculator, current da, da calculator on basic salary, dearness allowance calculator, da cal, da calculator for central government employees, previous da rate, da arrears calculator",
      },
      { property: "og:title", content: "DA Calculator 2026 — Current & Previous DA Rates" },
      {
        property: "og:description",
        content:
          "Calculate Dearness Allowance and DA arrears using year-wise current and previous DA rates.",
      },
      { property: "og:url", content: `${SITE}/da-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/da-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "DA Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          url: `${SITE}/da-calculator`,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: DaCalculatorPage,
});

function DaCalculatorPage() {
  const [basic, setBasic] = useState(35400);
  const [currentKey, setCurrentKey] = useState("2026-01");
  const [prevKey, setPrevKey] = useState("2025-07");
  const [months, setMonths] = useState(6);

  const r = useMemo(() => {
    const curPct = daPctFor(currentKey);
    const prevPct = daPctFor(prevKey);
    const curDa = Math.round((basic * curPct) / 100);
    const prevDa = Math.round((basic * prevPct) / 100);
    const monthlyDiff = curDa - prevDa;
    return {
      curPct,
      prevPct,
      curDa,
      prevDa,
      monthlyDiff,
      arrears: monthlyDiff * months,
      total: basic + curDa,
    };
  }, [basic, currentKey, prevKey, months]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          DA Calculator
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Dearness Allowance Calculator 2026 — Current DA {CURRENT_DA}%
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Calculate DA on basic salary using the current DA rate of {CURRENT_DA}% (effective{" "}
          {CURRENT_DA_FROM}) and any previous DA instalment, work out DA arrears month-wise, and
          see what happens when the 8th Pay Commission rebases DA to 0%.
        </p>
      </header>

      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,400px)_1fr]">
        {/* Calculator */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Calculate DA &amp; DA arrears</h2>
          <div className="mt-6 space-y-6">
            <div>
              <Label htmlFor="basic">Basic pay / basic pension (₹ per month)</Label>
              <Input
                id="basic"
                type="number"
                value={basic}
                onChange={(e) => setBasic(Number(e.target.value) || 0)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Current DA instalment</Label>
              <Select value={currentKey} onValueChange={setCurrentKey}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {DA_OPTIONS.map((d) => (
                    <SelectItem key={d.key} value={d.key}>
                      {d.label} — {d.pct}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">
                Latest notified rate: {CURRENT_DA}% from {CURRENT_DA_FROM}.
              </p>
            </div>

            <div>
              <Label>Previous DA rate</Label>
              <Select value={prevKey} onValueChange={setPrevKey}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {DA_OPTIONS.map((d) => (
                    <SelectItem key={`p-${d.key}`} value={d.key}>
                      {d.label} — {d.pct}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">
                Previous instalment: {PREVIOUS_DA}% from {PREVIOUS_DA_FROM}.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>Arrear months at the old rate</Label>
                <span className="text-sm font-semibold text-primary">{months}</span>
              </div>
              <Slider
                min={0}
                max={36}
                step={1}
                value={[months]}
                onValueChange={(v) => setMonths(v[0])}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                DA is notified from January/July but usually paid a few months later — set the
                number of months you were paid at the old rate.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Your DA breakdown</h2>
          <div className="mt-6 space-y-4">
            <Row label="Basic pay" value={inr(basic)} />
            <Row label={`DA at previous rate (${r.prevPct}%)`} value={inr(r.prevDa)} />
            <Row label={`DA at current rate (${r.curPct}%)`} value={inr(r.curDa)} highlight />
            <div className="my-2 h-px bg-border" />
            <Row label="Basic + current DA" value={inr(r.total)} bold />
            <Row label="Monthly increase" value={inr(r.monthlyDiff)} />
            <Row label={`DA arrears (${months} months)`} value={inr(r.arrears)} highlight />
          </div>

          <div className="mt-6 rounded-xl bg-primary/5 p-4 text-sm">
            <div className="mb-1 flex items-center gap-2 font-semibold text-primary">
              <Info className="h-4 w-4" /> 8th CPC impact
            </div>
            <p className="text-muted-foreground">
              On 8th Pay Commission implementation, DA of <strong>{r.curPct}%</strong> (
              {inr(r.curDa)}) merges into a revised basic of about{" "}
              <strong>{inr(Math.round(basic * 2.28))}</strong> at a 2.28x fitment factor (
              {inr(Math.round(basic * 2.86))} at 2.86x) and DA restarts at 0%.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link to="/salary">
                <Calculator className="mr-2 h-4 w-4" />
                Salary calculator
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/arrear">Arrears calculator</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/fitment-factor">Fitment factor</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Historical DA table */}
      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">DA rate history under the 7th CPC (2016–2026)</h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Effective from</th>
                <th className="p-3 font-semibold">DA / DR rate</th>
                <th className="p-3 font-semibold">DA on ₹35,400 basic</th>
              </tr>
            </thead>
            <tbody>
              {[...DA_HISTORY].reverse().map((row) => (
                <tr key={row.key} className="border-t border-border">
                  <td className="p-3">{row.label}</td>
                  <td className="p-3 font-semibold">{row.pct}%</td>
                  <td className="p-3 text-muted-foreground">
                    {inr(Math.round((35400 * row.pct) / 100))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{DA_FREEZE_NOTE}</p>
      </section>

      {/* Long-form SEO copy */}
      <article className="prose-article mt-12">
        <h2>How to calculate DA on basic salary</h2>
        <p>
          DA is a straight percentage of basic pay: <strong>DA = Basic pay × DA% ÷ 100</strong>.
          At the current DA rate of {CURRENT_DA}%, an employee with a basic pay of ₹50,000 draws
          ₹30,000 as Dearness Allowance every month. No allowance other than basic pay enters the
          calculation — HRA, transport allowance and NPA are computed separately (TA does attract
          DA on top of the slab amount).
        </p>
        <h2>Current DA and previous DA rate</h2>
        <p>
          The current DA/DR for central government employees and pensioners is{" "}
          <strong>{CURRENT_DA}% from {CURRENT_DA_FROM}</strong>, a 2% increase over the previous
          rate of {PREVIOUS_DA}% which applied from {PREVIOUS_DA_FROM}. This was the first DA
          instalment released after the 7th CPC term ended, and the 60% figure also fixes the base
          on which the 8th CPC fitment factor will be built.
        </p>
        <h2>How to calculate DA arrears</h2>
        <p>
          Because a DA instalment is notified months after its effective date, employees receive
          arrears for the intervening months. Use{" "}
          <strong>(new DA% − old DA%) × basic pay ÷ 100 × months</strong>. For a basic pay of
          ₹35,400 moving from 58% to 60% over 3 months, arrears work out to ₹708 × 3 = ₹2,124.
        </p>
        <h2>DA vs Dearness Relief (DR)</h2>
        <p>
          Serving employees receive DA on basic pay; pensioners receive Dearness Relief at the same
          percentage on basic pension. Family pensioners also draw DR at the identical rate. Use
          the <Link to="/pension">pension calculator</Link> for DR on pension and the{" "}
          <Link to="/pension-arrear">pension arrear calculator</Link> for back-dated DR.
        </p>
        <h2>What happens to DA under the 8th Pay Commission</h2>
        <p>
          The 8th Central Pay Commission was constituted on 3 November 2025 and its recommendations
          are expected to apply from 1 January 2026 once notified. As in every previous revision,
          the DA accumulated under the 7th CPC gets merged into the new basic pay through the
          fitment factor, and DA restarts from zero against the revised pay matrix. Model the
          effect with the <Link to="/fitment-factor">fitment factor calculator</Link>.
        </p>
      </article>

      <DiscussionBox />
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
  bold,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={
          highlight ? "text-lg font-bold text-primary" : bold ? "text-base font-bold" : "text-base font-semibold"
        }
      >
        {value}
      </span>
    </div>
  );
}
