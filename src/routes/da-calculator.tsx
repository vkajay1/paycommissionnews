import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { formatINR } from "@/lib/format";

const SITE = "https://paycommissionnews.lovable.app";

// Approximate historical DA rate progression under 7th CPC.
const DA_HISTORY = [
  { date: "Jul 2016", pct: 2 },
  { date: "Jan 2017", pct: 4 },
  { date: "Jul 2017", pct: 5 },
  { date: "Jan 2018", pct: 7 },
  { date: "Jul 2018", pct: 9 },
  { date: "Jan 2019", pct: 12 },
  { date: "Jul 2019", pct: 17 },
  { date: "Jan 2020", pct: 21 },
  { date: "Jul 2021", pct: 31 },
  { date: "Jan 2022", pct: 34 },
  { date: "Jul 2022", pct: 38 },
  { date: "Jan 2023", pct: 42 },
  { date: "Jul 2023", pct: 46 },
  { date: "Jan 2024", pct: 50 },
  { date: "Jul 2024", pct: 53 },
  { date: "Jan 2025", pct: 55 },
  { date: "Jul 2025", pct: 58 },
];

const faq = [
  {
    q: "What is Dearness Allowance (DA)?",
    a: "Dearness Allowance is a cost-of-living adjustment paid to central government employees and pensioners as a percentage of basic pay. It is revised twice a year (January and July) based on the All India Consumer Price Index for Industrial Workers (AICPI-IW).",
  },
  {
    q: "What is the current DA rate for central government employees?",
    a: "As of mid-2025, DA stands at 58% of basic pay for central government employees. The next revision is expected in January 2026.",
  },
  {
    q: "Will DA reset to 0% under the 8th Pay Commission?",
    a: "Yes. Historically, when a new pay commission is implemented, the accumulated DA is merged into the revised basic pay and DA is reset to 0%. It then grows again from the new base.",
  },
  {
    q: "How is DA calculated on pension?",
    a: "For pensioners, the same DA percentage is applied as Dearness Relief (DR) on the basic pension.",
  },
];

export const Route = createFileRoute("/da-calculator")({
  head: () => ({
    meta: [
      { title: "DA Calculator 2026 — Dearness Allowance Calculator for Central Government Employees" },
      {
        name: "description",
        content:
          "Free DA calculator for central government employees and pensioners. Calculate Dearness Allowance at current rates, view historical DA progression, and project 8th CPC DA impact.",
      },
      {
        name: "keywords",
        content:
          "da calculator, dearness allowance calculator, da calculator central government, 8th pay commission da, expected da from january 2026, current da rate",
      },
      { property: "og:title", content: "DA Calculator 2026 — Dearness Allowance Calculator" },
      {
        property: "og:description",
        content:
          "Calculate DA on basic pay for central government employees, see historical DA rates and 8th CPC projections.",
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
  const [daPct, setDaPct] = useState(58);

  const daAmount = useMemo(() => Math.round((basic * daPct) / 100), [basic, daPct]);
  const total = basic + daAmount;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          DA Calculator
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Dearness Allowance Calculator 2026
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Calculate DA on your basic pay at the current 58% rate. See how DA has grown across
          7th CPC and what happens when the 8th Pay Commission rebases it to 0%.
        </p>
      </header>

      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* Calculator */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Calculate DA</h2>
          <div className="mt-6 space-y-6">
            <div>
              <Label htmlFor="basic">Basic pay (₹/month)</Label>
              <Input
                id="basic"
                type="number"
                value={basic}
                onChange={(e) => setBasic(Number(e.target.value) || 0)}
                className="mt-2"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="da">DA rate</Label>
                <span className="text-sm font-semibold text-primary">{daPct}%</span>
              </div>
              <Slider
                id="da"
                min={0}
                max={80}
                step={1}
                value={[daPct]}
                onValueChange={(v) => setDaPct(v[0])}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Current DA is 58% (July 2025). Slide to see historical or projected rates.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Your DA breakdown</h2>
          <div className="mt-6 space-y-4">
            <Row label="Basic pay" value={formatINR(basic)} />
            <Row label={`DA (${daPct}%)`} value={formatINR(daAmount)} highlight />
            <div className="my-2 h-px bg-border" />
            <Row label="Basic + DA" value={formatINR(total)} bold />
          </div>

          <div className="mt-6 rounded-xl bg-primary/5 p-4 text-sm">
            <div className="mb-1 flex items-center gap-2 font-semibold text-primary">
              <Info className="h-4 w-4" /> 8th CPC impact
            </div>
            <p className="text-muted-foreground">
              On 8th Pay Commission implementation (expected 1 Jan 2026), DA of{" "}
              <strong>{daPct}%</strong> ({formatINR(daAmount)}) will merge into a revised basic
              of approximately{" "}
              <strong>{formatINR(Math.round(basic * 2.86))}</strong> (at 2.86x fitment) and DA
              resets to 0%.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link to="/salary">
                <Calculator className="mr-2 h-4 w-4" />
                Open salary calculator
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Historical DA table */}
      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">DA rate history (7th CPC period)</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Effective from</th>
                <th className="p-3 font-semibold">DA rate</th>
                <th className="p-3 font-semibold">DA on ₹35,400 basic</th>
              </tr>
            </thead>
            <tbody>
              {DA_HISTORY.map((row) => (
                <tr key={row.date} className="border-t border-border">
                  <td className="p-3">{row.date}</td>
                  <td className="p-3 font-semibold">{row.pct}%</td>
                  <td className="p-3 text-muted-foreground">
                    {formatINR(Math.round((35400 * row.pct) / 100))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Long-form SEO copy */}
      <article className="prose-article mt-12">
        <h2>How Dearness Allowance is calculated</h2>
        <p>
          DA is calculated as a percentage of basic pay. The percentage is revised twice a year
          based on the 12-month average of the AICPI-IW (base year 2016 = 100). For example,
          at the current 58% DA rate, an employee with a basic pay of ₹50,000 receives
          ₹29,000 as DA every month.
        </p>
        <h2>Expected DA from January 2026</h2>
        <p>
          Based on the AICPI-IW trend through 2025, DA is projected to touch approximately
          60–61% by January 2026 — just before the 8th CPC comes into effect. On
          implementation, this accumulated DA merges into the revised basic pay and the
          allowance resets to 0%.
        </p>
        <h2>DA vs Dearness Relief (DR)</h2>
        <p>
          Serving employees receive DA; pensioners receive Dearness Relief at the same
          percentage. Both are revised together in every DA order issued by the Ministry of
          Finance.
        </p>
      </article>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">DA Calculator — FAQs</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-border bg-card p-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="cursor-pointer text-sm font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
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
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span
        className={`tabular-nums ${bold ? "text-lg font-bold" : highlight ? "font-semibold text-primary" : "font-semibold"}`}
      >
        {value}
      </span>
    </div>
  );
}
