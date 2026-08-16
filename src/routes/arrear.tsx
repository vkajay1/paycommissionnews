import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { CalcContent, faqLd, appLd } from "@/components/calc/CalcShell";
import { inr } from "@/lib/format";
import {
  CURRENT_DA,
  CURRENT_DA_FROM,
  DA_OPTIONS,
  PREVIOUS_DA,
  PREVIOUS_DA_FROM,
  daPctFor,
} from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "How to calculate arrears in salary?",
    a: "Salary arrears = (revised monthly gross − existing monthly gross) × number of months between the effective date and the actual payment date. Under the 8th CPC the revised gross is your existing basic pay multiplied by the fitment factor, with DA reset to 0%, while the existing gross is basic pay plus DA at the rate you were actually paid.",
  },
  {
    q: "What is the current DA used in the arrear calculation?",
    a: `The current DA/DR is ${CURRENT_DA}% of basic pay with effect from ${CURRENT_DA_FROM}. The previous instalment was ${PREVIOUS_DA}% from ${PREVIOUS_DA_FROM}. Both are selectable above so the arrear reflects the exact months you were paid at each rate.`,
  },
  {
    q: "From when will 8th Pay Commission arrears be paid?",
    a: "The 8th CPC was constituted on 3 November 2025 and the revision is widely expected to take effect from 1 January 2026. Because the report and government notification will follow later, employees will receive arrears for the months between the effective date and the first revised pay slip.",
  },
  {
    q: "Is TDS deducted on salary arrears?",
    a: "Yes, arrears are taxable in the year of receipt, but Section 89(1) relief with Form 10E lets you spread the arrears over the years to which they relate, often reducing the tax outgo.",
  },
  {
    q: "Are DA arrears and pay revision arrears the same?",
    a: "No. DA arrears arise from a delayed Dearness Allowance instalment on the existing basic pay. Pay revision arrears arise from a new pay commission fixing a higher basic pay. This calculator handles both.",
  },
];

export const Route = createFileRoute("/arrear")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission Arrears Calculator 2026 — Salary Arrear Month-wise" },
      {
        name: "description",
        content:
          "Free 8th Pay Commission arrears calculator with current DA (60%) and previous DA rate selectors. Work out salary arrears month-wise between the implementation date and payout, plus DA arrears and TDS.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission arrears calculator, 8th pay commission salary arrears, salary arrear calculator, how to calculate arrears in salary, da arrears calculator, current da",
      },
      { property: "og:title", content: "8th Pay Commission Arrears Calculator 2026" },
      {
        property: "og:description",
        content:
          "Month-wise 8th CPC salary arrears with current and previous DA rate inputs.",
      },
      { property: "og:url", content: `${SITE}/arrear` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/arrear` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd(
            "8th Pay Commission Arrears Calculator",
            `${SITE}/arrear`,
            "Month-wise salary and DA arrears calculator for central government employees.",
          ),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: ArrearPage,
});

function ArrearPage() {
  const [basic, setBasic] = useState(35400);
  const [fit, setFit] = useState(2.28);
  const [currentKey, setCurrentKey] = useState("2026-01");
  const [prevKey, setPrevKey] = useState("2025-07");
  const [months, setMonths] = useState(12);

  const r = useMemo(() => {
    const curDaPct = daPctFor(currentKey);
    const prevDaPct = daPctFor(prevKey);

    // Existing pay actually drawn (basic + DA at the rate paid).
    const existingDa = Math.round((basic * prevDaPct) / 100);
    const existing = basic + existingDa;

    // Revised pay after the pay commission (DA rebased to 0%).
    const revisedBasic = Math.round(basic * fit);

    const revisionDiff = revisedBasic - existing;
    const revisionArrears = revisionDiff * months;

    // DA arrears on the un-revised basic, if the DA instalment itself was delayed.
    const daMonthlyDiff = Math.round((basic * (curDaPct - prevDaPct)) / 100);
    const daArrears = daMonthlyDiff * months;

    const gross = revisionArrears + daArrears;
    const tds = Math.round(Math.max(gross, 0) * 0.1);

    return {
      curDaPct,
      prevDaPct,
      existingDa,
      existing,
      revisedBasic,
      revisionDiff,
      revisionArrears,
      daMonthlyDiff,
      daArrears,
      gross,
      tds,
      net: gross - tds,
    };
  }, [basic, fit, currentKey, prevKey, months]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <Receipt className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            8th Pay Commission Arrears Calculator
          </h1>
          <p className="text-sm text-muted-foreground">
            Month-wise salary arrears and DA arrears between the 8th CPC effective date and the
            actual payout, using current DA {CURRENT_DA}% and any previous DA rate.
          </p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Basic pay (₹/month)</Label>
            <Input
              type="number"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Current DA rate (year-wise) — {r.curDaPct}%
            </Label>
            <Select value={currentKey} onValueChange={setCurrentKey}>
              <SelectTrigger>
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
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Previous DA rate (actually paid) — {r.prevDaPct}%
            </Label>
            <Select value={prevKey} onValueChange={setPrevKey}>
              <SelectTrigger>
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
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">
              Fitment factor — {fit.toFixed(2)}x
            </Label>
            <Slider value={[fit]} min={1.5} max={4} step={0.01} onValueChange={(v) => setFit(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Arrear period — {months} months</Label>
            <Slider value={[months]} min={1} max={36} step={1} onValueChange={(v) => setMonths(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-xl p-6">
          <Row label="Basic pay" value={inr(basic)} />
          <Row label={`DA actually paid (${r.prevDaPct}%)`} value={inr(r.existingDa)} />
          <Row label="Existing pay drawn (basic + DA)" value={inr(r.existing)} />
          <div className="my-2 h-px bg-border" />
          <Row label={`Revised basic at ${fit.toFixed(2)}x`} value={inr(r.revisedBasic)} highlight />
          <Row label="Monthly revision difference" value={inr(r.revisionDiff)} />
          <Row label={`Pay revision arrears (${months} m)`} value={inr(r.revisionArrears)} />
          <div className="my-2 h-px bg-border" />
          <Row
            label={`DA arrears ${r.prevDaPct}% → ${r.curDaPct}% (${months} m)`}
            value={inr(r.daArrears)}
          />
          <Row label="Total gross arrears" value={inr(r.gross)} highlight />
          <Row label="Estimated TDS @ 10%" value={`- ${inr(r.tds)}`} />
          <Row label="Net arrears payable" value={inr(r.net)} highlight />
          <p className="pt-2 text-xs text-muted-foreground">
            TDS is illustrative; actual tax depends on your slab and Section 89(1) relief claimed
            through Form 10E.
          </p>
          <p className="text-xs text-muted-foreground">
            Need only the DA difference? Use the <Link to="/da-calculator" className="text-primary underline">DA calculator</Link>.
          </p>
        </Card>
      </div>

      <CalcContent
        heading="How to calculate arrears in salary under the 8th Pay Commission"
        intro={`Arrears arise whenever a pay revision or a DA instalment takes effect from a date earlier than the month it is actually paid. The 8th CPC was constituted on 3 November 2025 and is expected to apply from 1 January 2026, so employees will accumulate several months of arrears before the first revised salary reaches them. Current DA/DR is ${CURRENT_DA}% from ${CURRENT_DA_FROM}, up from ${PREVIOUS_DA}% from ${PREVIOUS_DA_FROM}.`}
        method={[
          {
            title: "Step 1 — Fix your existing pay drawn",
            body: "Add the DA you were actually paid to your basic pay. If you drew basic pay of ₹35,400 with 58% DA, your existing pay for arrear purposes is ₹35,400 + ₹20,532 = ₹55,932. Pick the exact previous DA instalment above so the figure matches your pay slip.",
          },
          {
            title: "Step 2 — Fix your revised pay",
            body: "Multiply basic pay by the fitment factor to arrive at the revised basic pay. DA restarts at 0% on implementation, so the revised basic itself is compared against the old basic-plus-DA figure. At 2.28x, ₹35,400 becomes ₹80,712.",
          },
          {
            title: "Step 3 — Multiply the monthly gap by the arrear months",
            body: "The monthly difference multiplied by the number of months between the effective date and the payout month gives gross arrears. Add DA arrears separately if a DA instalment was itself paid late at the old rate.",
          },
          {
            title: "Step 4 — Adjust tax and recoveries",
            body: "Arrears are taxable in the year of receipt. Claim Section 89(1) relief through Form 10E to spread the amount across the relevant years. NPS/GPF subscription, CGHS and licence-fee recoveries are also adjusted before the net credit.",
          },
        ]}
        formula={[
          "Existing pay = Basic pay + (Basic pay × previous DA% ÷ 100)",
          "Revised basic = Basic pay × Fitment factor",
          "Monthly difference = Revised basic − Existing pay",
          "Pay revision arrears = Monthly difference × Arrear months",
          "DA arrears = Basic pay × (current DA% − previous DA%) ÷ 100 × Months",
          "Net arrears = Gross arrears − TDS − recoveries",
        ]}
        faq={faq}
        related={[
          { label: "Salary calculator", to: "/salary" },
          { label: "DA calculator", to: "/da-calculator" },
          { label: "Pension arrear calculator", to: "/pension-arrear" },
          { label: "Fitment factor calculator", to: "/fitment-factor" },
          { label: "Pay fixation calculator", to: "/pay-fixation" },
        ]}
      />
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
