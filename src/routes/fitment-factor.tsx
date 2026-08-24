import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { Grid3x3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";
import { PAY_LEVELS } from "@/lib/pay-matrix";

const SITE = "https://paycommissionnews.co.in";
const FACTORS = [1.92, 2.08, 2.28, 2.57, 2.86, 3.0, 3.68, 3.83];

export const Route = createFileRoute("/fitment-factor")({
  head: () => ({
    meta: [
      { title: "Fitment Factor Calculator & Fitment Table — 2.28x, 2.57x, 2.86x" },
      {
        name: "description",
        content:
          "Current fitment factor vs previous fitment factor explained, with a full 8th Pay Commission fitment table for all 18 pay levels at 1.92x, 2.28x, 2.57x, 2.86x and 3.83x.",
      },
      {
        name: "keywords",
        content:
          "fitment factor, fitment calculator, fitment table, current fitment factor, previous fitment factor, 2.28 fitment factor, 2.57 fitment factor, fitment allowance, 8th pay commission fitment factor calculator, 8th pay commission fitment factor estimates 2026",
      },
      { property: "og:title", content: "Fitment Factor Calculator & Fitment Table" },
      {
        property: "og:description",
        content: "Compare 1.92x to 3.83x fitment factors across all 18 pay levels.",
      },
      { property: "og:url", content: `${SITE}/fitment-factor` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/fitment-factor` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the current fitment factor?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The current fitment factor in force is 2.57x, applied by the 7th Pay Commission from 1 January 2016. The previous fitment factor under the 6th Pay Commission was 1.86x.",
              },
            },
            {
              "@type": "Question",
              name: "What fitment factor is expected in the 8th Pay Commission?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Estimates for 2026 range between 1.92x and 2.86x, with 2.28x the most widely discussed figure. No factor has been officially notified.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [basic, setBasic] = useState(44900);
  const rows = useMemo(
    () => PAY_LEVELS.map((l) => ({ ...l, values: FACTORS.map((f) => Math.round(l.entryPay * f)) })),
    [],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <Grid3x3 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitment Factor Calculator & Table</h1>
          <p className="text-sm text-muted-foreground">
            Current vs previous fitment factors, plus a full fitment table for every pay level.
          </p>
        </div>
      </div>
      <DisclaimerBanner />

      <Card className="mt-6 space-y-4 rounded-xl p-6">
        <div className="space-y-1.5 sm:max-w-xs">
          <Label className="text-xs text-muted-foreground">Your basic pay (₹)</Label>
          <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FACTORS.map((f) => (
            <div key={f} className="rounded-lg bg-secondary/50 p-4">
              <div className="text-xs text-muted-foreground">{f.toFixed(2)}x fitment</div>
              <div className="mt-1 text-lg font-bold text-primary">{inr(basic * f)}</div>
            </div>
          ))}
        </div>
      </Card>

      <h2 className="mt-12 text-2xl font-bold tracking-tight">
        8th Pay Commission fitment table (all pay levels)
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left">
            <tr>
              <th className="p-3 font-semibold">Level</th>
              <th className="p-3 font-semibold">7th CPC basic</th>
              {FACTORS.map((f) => (
                <th key={f} className="p-3 font-semibold">
                  {f.toFixed(2)}x
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.level} className="border-t border-border/60">
                <td className="p-3 font-medium">Level {r.level}</td>
                <td className="p-3">{inr(r.entryPay)}</td>
                {r.values.map((v, i) => (
                  <td key={i} className="p-3 tabular-nums">
                    {inr(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose-article mt-12 max-w-3xl">
        <h2>What is a fitment factor?</h2>
        <p>
          The fitment factor is the single multiplier a Pay Commission applies to an employee's
          existing basic pay to arrive at the revised basic pay. It exists to convert the old pay
          structure — including the dearness allowance that has accumulated since the last revision —
          into one clean starting figure in the new pay matrix. The formula is simply:
        </p>
        <p>
          <strong>Revised basic pay = Existing basic pay × Fitment factor</strong>
        </p>
        <h3>Current fitment factor vs previous fitment factor</h3>
        <ul>
          <li>
            <strong>6th Pay Commission (2006):</strong> 1.86x — the previous fitment factor.
          </li>
          <li>
            <strong>7th Pay Commission (2016):</strong> 2.57x — the current fitment factor in force.
          </li>
          <li>
            <strong>8th Pay Commission (expected 2026–27):</strong> estimates between 1.92x and 2.86x,
            with 2.28x the most widely reported figure. Nothing has been officially notified yet.
          </li>
        </ul>
        <h3>How the factor is derived</h3>
        <p>
          A Pay Commission adds the DA neutralisation percentage on the implementation date to 100%,
          then adds a real increase. For the 7th CPC, DA stood at 125%, so 2.25 plus a 14.29% real
          rise produced 2.57x. If DA reaches roughly 60–70% by January 2026, a similar approach gives
          a factor in the 1.92x–2.28x band; a more generous real increase would push it towards 2.86x.
        </p>
        <h3>Fitment factor vs fitment allowance</h3>
        <p>
          The two terms are often mixed up. The fitment factor is a multiplier on basic pay. A fitment
          allowance, used in some state revisions and PSU settlements, is a flat amount or percentage
          merged into basic pay instead of a multiplier. Both aim to absorb accumulated DA, but only
          the factor scales proportionally across all pay levels.
        </p>
        <h3>Why the factor matters more than any allowance</h3>
        <p>
          Because DA, HRA, transport allowance, pension and gratuity are all computed as a percentage
          of basic pay, a change of even 0.1x in the fitment factor compounds across the entire salary
          and post-retirement benefits. That is why every 0.29x step in the table above — 2.28x to
          2.57x, and 2.57x to 2.86x — produces such a visible jump in the projected figures.
        </p>
      </article>

      <DiscussionBox />
    </div>
  );
}
