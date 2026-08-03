import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";
import { PAY_LEVELS } from "@/lib/pay-matrix";

const SITE = "https://paycommissionnews.lovable.app";

export const Route = createFileRoute("/macp-calculator")({
  head: () => ({
    meta: [
      { title: "MACP Pay Fixation Calculator — Promotion & Pay Fixation 2026" },
      {
        name: "description",
        content:
          "Free MACP calculator and pay fixation calculator. Fix pay on promotion or MACP under FR 22(I)(a)(1) with one increment plus next-level cell, and see the 8th Pay Commission projection.",
      },
      {
        name: "keywords",
        content:
          "macp pay fixation calculator, macp calculator, pay fixation calculator, pay fixation on promotion calculator, salary fixation, fixation of pay, pay fixation",
      },
      { property: "og:title", content: "MACP & Pay Fixation Calculator" },
      {
        property: "og:description",
        content: "Fix pay on promotion or MACP with one increment plus next-level placement.",
      },
      { property: "og:url", content: `${SITE}/macp-calculator` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/macp-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How is pay fixed on MACP?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "On MACP, one increment of 3% is added to the existing basic pay, rounded to the next ₹100, and the figure is then placed in the immediate next cell of the higher pay level in the pay matrix.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between MACP and promotion pay fixation?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The arithmetic is the same — 3% increment plus placement in the next level. MACP grants only the higher pay level (financial upgradation) without a change in duties, while promotion grants both the higher post and the higher level.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function nextCell(level: number, amount: number) {
  const l = PAY_LEVELS.find((p) => p.level === level);
  if (!l) return amount;
  let cell = l.entryPay;
  while (cell < amount) cell = Math.round((cell * 1.03) / 100) * 100;
  return cell;
}

function Page() {
  const [basic, setBasic] = useState(44900);
  const [level, setLevel] = useState(7);
  const [fit, setFit] = useState(2.28);

  const r = useMemo(() => {
    const withIncrement = Math.ceil((basic * 1.03) / 100) * 100;
    const newLevel = Math.min(level + 1, 18);
    const fixed = nextCell(newLevel, withIncrement);
    const gain = fixed - basic;
    const projected = Math.round(fixed * fit);
    return { withIncrement, newLevel, fixed, gain, projected };
  }, [basic, level, fit]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          <ClipboardList className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MACP & Pay Fixation Calculator</h1>
          <p className="text-sm text-muted-foreground">
            Fix pay on promotion or MACP — one increment plus next-level placement.
          </p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Present basic pay (₹)</Label>
            <Input
              type="number"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Present pay level — Level {level}</Label>
            <Slider value={[level]} min={1} max={17} step={1} onValueChange={(v) => setLevel(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">8th CPC fitment factor — {fit.toFixed(2)}x</Label>
            <Slider value={[fit]} min={1.5} max={4} step={0.01} onValueChange={(v) => setFit(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <Row label="Basic + one increment (3%)" value={inr(r.withIncrement)} />
          <Row label="Upgraded pay level" value={`Level ${r.newLevel}`} />
          <Row label="Pay fixed in new level" value={inr(r.fixed)} highlight />
          <Row label="Monthly gain in basic pay" value={inr(r.gain)} />
          <div className="my-2 h-px bg-border" />
          <Row label={`Projected 8th CPC basic @ ${fit.toFixed(2)}x`} value={inr(r.projected)} highlight />
          <p className="pt-2 text-xs text-muted-foreground">
            Increments are rounded to the next ₹100 as required by the pay matrix rules.
          </p>
        </Card>
      </div>

      <article className="prose-article mt-12 max-w-3xl">
        <h2>How MACP pay fixation is calculated</h2>
        <p>
          The Modified Assured Career Progression (MACP) scheme gives a central government employee
          three financial upgradations in a career — after 10, 20 and 30 years of continuous regular
          service in the same grade — even when no promotional vacancy exists. The pay fixation
          method is identical to fixation on regular promotion under FR 22(I)(a)(1):
        </p>
        <ol>
          <li>Take the present basic pay in the pay matrix.</li>
          <li>Add one increment of 3% and round the result to the next multiple of ₹100.</li>
          <li>
            Locate that amount in the next higher pay level. If the exact figure does not exist as a
            cell, place the employee in the immediate next higher cell of that level.
          </li>
          <li>Allowances (DA, HRA, TA) are then recalculated on the new basic pay.</li>
        </ol>
        <h3>Worked example</h3>
        <p>
          An employee drawing ₹44,900 in Level 7 gets one increment: ₹44,900 × 1.03 = ₹46,247, rounded
          to ₹46,300. In Level 8 the nearest equal-or-higher cell is ₹47,600, so pay is fixed at
          ₹47,600 — a gain of ₹2,700 in basic pay, which then multiplies further when the 8th Pay
          Commission fitment factor is applied.
        </p>
        <h3>MACP vs promotion</h3>
        <p>
          MACP grants only the higher pay level; the post, duties and designation stay the same.
          Promotion grants the higher post along with the higher level. Because the arithmetic is the
          same, this page works as both a MACP calculator and a pay fixation on promotion calculator.
        </p>
        <h3>Date of next increment after fixation</h3>
        <p>
          Employees may opt to have pay fixed from the date of promotion/MACP, or from the date of the
          next increment (1 January or 1 July). Choosing the increment date often produces a slightly
          higher long-run basic pay, so compare both figures before submitting the option form.
        </p>
      </article>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={highlight ? "text-lg font-bold text-primary" : "text-base font-semibold"}>
        {value}
      </span>
    </div>
  );
}
