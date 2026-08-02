import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inr } from "@/lib/format";
import {
  CalcContent, CalcHeader, ResultRow, appLd, faqLd, type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.lovable.app";

const faq: Faq[] = [
  {
    q: "What are the new regime income tax slabs for FY 2025-26?",
    a: "Nil up to ₹4 lakh, 5% from ₹4–8 lakh, 10% from ₹8–12 lakh, 15% from ₹12–16 lakh, 20% from ₹16–20 lakh, 25% from ₹20–24 lakh and 30% above ₹24 lakh, with a ₹75,000 standard deduction and a rebate making income up to ₹12 lakh tax free.",
  },
  {
    q: "Which regime is better for government employees?",
    a: "If you claim large deductions — HRA, 80C, home loan interest, NPS 80CCD(1B) — the old regime often wins. With few deductions the new regime is usually cheaper. This calculator shows both side by side.",
  },
  {
    q: "Is the standard deduction available in both regimes?",
    a: "Yes, but the amount differs: ₹75,000 under the new regime and ₹50,000 under the old regime for salaried taxpayers and pensioners.",
  },
  {
    q: "Will 8th CPC arrears be taxed in one year?",
    a: "Arrears are taxed in the year of receipt, but Section 89(1) relief with Form 10E lets you spread them across the years they relate to, often reducing the tax substantially.",
  },
];

export const Route = createFileRoute("/income-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Income Tax Calculator FY 2025-26 — New vs Old Regime Comparison" },
      {
        name: "description",
        content:
          "Free income tax calculator for FY 2025-26 (AY 2026-27). Compare new and old tax regimes for salaried, government and private employees with standard deduction, 80C, HRA and NPS.",
      },
      {
        name: "keywords",
        content:
          "income tax calculator, income tax calculator fy 2025-26, new vs old tax regime calculator, salary tax calculator india, tds on salary calculator",
      },
      { property: "og:title", content: "Income Tax Calculator — New vs Old Regime" },
      { property: "og:description", content: "Compare tax under both regimes for FY 2025-26 in seconds." },
      { property: "og:url", content: `${SITE}/income-tax-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/income-tax-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd("Income Tax Calculator", `${SITE}/income-tax-calculator`, "New vs old regime income tax calculator for FY 2025-26."),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function slabTax(taxable: number, slabs: [number, number][]) {
  let prev = 0;
  let t = 0;
  for (const [cap, rate] of slabs) {
    if (taxable > prev) t += (Math.min(taxable, cap) - prev) * rate;
    prev = cap;
  }
  return t;
}

const NEW_SLABS: [number, number][] = [
  [400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15],
  [2000000, 0.2], [2400000, 0.25], [Infinity, 0.3],
];
const OLD_SLABS: [number, number][] = [
  [250000, 0], [500000, 0.05], [1000000, 0.2], [Infinity, 0.3],
];

function Page() {
  const [gross, setGross] = useState(1200000);
  const [ded80c, setDed80c] = useState(150000);
  const [nps, setNps] = useState(50000);
  const [hraExempt, setHraExempt] = useState(120000);
  const [homeLoan, setHomeLoan] = useState(0);

  const r = useMemo(() => {
    // New regime
    const newTaxable = Math.max(0, gross - 75000);
    let newTax = slabTax(newTaxable, NEW_SLABS);
    if (newTaxable <= 1200000) newTax = 0;
    const newTotal = Math.round(newTax * 1.04);

    // Old regime
    const oldTaxable = Math.max(
      0,
      gross - 50000 - hraExempt - Math.min(ded80c, 150000) - Math.min(nps, 50000) - Math.min(homeLoan, 200000),
    );
    let oldTax = slabTax(oldTaxable, OLD_SLABS);
    if (oldTaxable <= 500000) oldTax = Math.max(0, oldTax - 12500);
    const oldTotal = Math.round(oldTax * 1.04);

    return {
      newTaxable, newTotal, oldTaxable, oldTotal,
      better: newTotal <= oldTotal ? "new" : "old",
      saving: Math.abs(newTotal - oldTotal),
    };
  }, [gross, ded80c, nps, hraExempt, homeLoan]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={Landmark}
        kicker="Taxation"
        title="Income Tax Calculator FY 2025-26"
        sub="Compare your tax liability under the new and old regimes with standard deduction, HRA exemption, 80C, NPS and home loan interest."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Annual gross salary (₹)</Label>
            <Input type="number" value={gross} onChange={(e) => setGross(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Section 80C investments (max ₹1.5 L)</Label>
            <Input type="number" value={ded80c} onChange={(e) => setDed80c(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">NPS 80CCD(1B) (max ₹50,000)</Label>
            <Input type="number" value={nps} onChange={(e) => setNps(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">HRA exemption claimed (₹/year)</Label>
            <Input type="number" value={hraExempt} onChange={(e) => setHraExempt(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Home loan interest (max ₹2 L)</Label>
            <Input type="number" value={homeLoan} onChange={(e) => setHomeLoan(Number(e.target.value) || 0)} />
          </div>
          <p className="text-xs text-muted-foreground">
            Deductions apply to the old regime only. The new regime allows just the ₹75,000 standard deduction.
          </p>
        </Card>

        <div className="space-y-4">
          <Card className="space-y-3 rounded-3xl p-6">
            <div className="text-sm font-semibold">New regime</div>
            <ResultRow label="Taxable income" value={inr(r.newTaxable)} />
            <ResultRow label="Tax + 4% cess" value={inr(r.newTotal)} highlight />
          </Card>
          <Card className="space-y-3 rounded-3xl p-6">
            <div className="text-sm font-semibold">Old regime</div>
            <ResultRow label="Taxable income" value={inr(r.oldTaxable)} />
            <ResultRow label="Tax + 4% cess" value={inr(r.oldTotal)} highlight />
          </Card>
          <Card className="rounded-3xl bg-primary/5 p-6">
            <div className="text-sm text-muted-foreground">Recommended</div>
            <div className="mt-1 text-xl font-bold text-primary">
              {r.better === "new" ? "New regime" : "Old regime"} saves {inr(r.saving)}
            </div>
          </Card>
        </div>
      </div>

      <CalcContent
        heading="How income tax on salary is calculated"
        intro="Salaried taxpayers in India choose between two regimes each year. The new regime offers wider slabs and a bigger standard deduction but almost no exemptions; the old regime keeps HRA, 80C, NPS and home loan benefits at higher slab rates. The calculation runs in four steps for either choice."
        method={[
          {
            title: "Step 1 — Compute gross salary",
            body: "Add basic pay, dearness allowance, HRA, transport allowance, bonus and any perquisite value for the full financial year. For government employees this is the total of all payslip earnings.",
          },
          {
            title: "Step 2 — Apply deductions",
            body: "The new regime allows only the ₹75,000 standard deduction and the employer's NPS contribution under 80CCD(2). The old regime allows a ₹50,000 standard deduction plus HRA exemption, ₹1.5 lakh under 80C, ₹50,000 under 80CCD(1B), ₹2 lakh of home loan interest and medical insurance under 80D.",
          },
          {
            title: "Step 3 — Apply slab rates",
            body: "Tax is charged progressively — each slab rate applies only to the income falling in that band. The Section 87A rebate makes taxable income up to ₹12 lakh tax free in the new regime and up to ₹5 lakh in the old regime.",
          },
          {
            title: "Step 4 — Add cess and surcharge",
            body: "A 4% health and education cess is added to the tax. Incomes above ₹50 lakh attract surcharge from 10% to 25%, with marginal relief where the surcharge exceeds the extra income.",
          },
        ]}
        formula={[
          "Taxable income = gross salary − standard deduction − eligible exemptions/deductions",
          "New regime slabs: 0 / 5 / 10 / 15 / 20 / 25 / 30%",
          "Old regime slabs: 0 / 5 / 20 / 30%",
          "Rebate 87A: nil tax if taxable ≤ ₹12,00,000 (new) or ≤ ₹5,00,000 (old)",
          "Total tax = slab tax × 1.04 (health & education cess)",
        ]}
        faq={faq}
        related={[
          { label: "Take Home Salary", to: "/take-home-salary" },
          { label: "HRA Exemption", to: "/hra-calculator" },
          { label: "NPS Calculator", to: "/nps-calculator" },
          { label: "Arrear Calculator", to: "/arrear" },
        ]}
      />
    </div>
  );
}
