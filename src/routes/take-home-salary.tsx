import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { inr } from "@/lib/format";
import {
  CalcContent,
  CalcHeader,
  ResultRow,
  appLd,
  faqLd,
  type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.co.in";

const faq: Faq[] = [
  {
    q: "How is in-hand salary calculated from CTC?",
    a: "In-hand salary = CTC − employer PF − gratuity provision − employee PF − professional tax − income tax (TDS). Only the components actually paid in cash reach your bank account.",
  },
  {
    q: "Why is my take-home much lower than my CTC?",
    a: "CTC includes employer-side costs such as the employer's 12% PF contribution, gratuity provision (4.81% of basic) and sometimes insurance. These never appear in your monthly credit.",
  },
  {
    q: "Is professional tax the same in every state?",
    a: "No. It is a state levy capped at ₹2,500 a year. Maharashtra, Karnataka, West Bengal and Tamil Nadu charge it; Delhi, Haryana and UP do not.",
  },
  {
    q: "Can I reduce my PF deduction to increase take-home?",
    a: "Statutory PF is 12% of basic up to the ₹15,000 wage ceiling. Above that, employers may allow restriction to the ceiling, which raises take-home but lowers retirement savings.",
  },
];

export const Route = createFileRoute("/take-home-salary")({
  head: () => ({
    meta: [
      { title: "Take Home Salary Calculator 2026 — CTC to In-Hand Salary (Private Sector)" },
      {
        name: "description",
        content:
          "Free take-home salary calculator for private sector employees. Convert CTC to monthly in-hand salary with EPF, gratuity, professional tax and income tax deductions for FY 2025-26.",
      },
      {
        name: "keywords",
        content:
          "take home salary calculator, ctc to in hand salary calculator, in hand salary calculator india, salary calculator private employees, monthly salary calculator",
      },
      { property: "og:title", content: "Take Home Salary Calculator — CTC to In-Hand" },
      {
        property: "og:description",
        content: "Convert CTC to monthly in-hand salary with EPF, gratuity and tax deductions.",
      },
      { property: "og:url", content: `${SITE}/take-home-salary` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/take-home-salary` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd(
            "Take Home Salary Calculator",
            `${SITE}/take-home-salary`,
            "CTC to in-hand salary calculator for private sector employees in India.",
          ),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function tax(taxable: number) {
  const slabs: [number, number][] = [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.1],
    [1600000, 0.15],
    [2000000, 0.2],
    [2400000, 0.25],
    [Infinity, 0.3],
  ];
  let prev = 0;
  let t = 0;
  for (const [cap, rate] of slabs) {
    if (taxable > prev) t += (Math.min(taxable, cap) - prev) * rate;
    prev = cap;
  }
  if (taxable <= 1200000) t = 0; // Section 87A rebate (new regime)
  return Math.round(t * 1.04);
}

function Page() {
  const [ctc, setCtc] = useState(1200000);
  const [basicPct, setBasicPct] = useState(45);
  const [ptax, setPtax] = useState(true);
  const [capPf, setCapPf] = useState(false);

  const r = useMemo(() => {
    const basicAnnual = Math.round((ctc * basicPct) / 100);
    const pfWage = capPf ? Math.min(basicAnnual, 180000) : basicAnnual;
    const employerPf = Math.round(pfWage * 0.12);
    const employeePf = employerPf;
    const gratuityProv = Math.round(basicAnnual * 0.0481);
    const grossAnnual = ctc - employerPf - gratuityProv;
    const professionalTax = ptax ? 2500 : 0;
    const taxable = Math.max(0, grossAnnual - 75000 - professionalTax);
    const incomeTax = tax(taxable);
    const netAnnual = grossAnnual - employeePf - professionalTax - incomeTax;
    return {
      basicAnnual,
      employerPf,
      employeePf,
      gratuityProv,
      grossAnnual,
      professionalTax,
      taxable,
      incomeTax,
      netAnnual,
      netMonthly: Math.round(netAnnual / 12),
    };
  }, [ctc, basicPct, ptax, capPf]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={Wallet}
        kicker="Private sector"
        title="Take Home Salary Calculator"
        sub="Convert your annual CTC into monthly in-hand salary after EPF, gratuity, professional tax and income tax under the new regime (FY 2025-26)."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Annual CTC (₹)</Label>
            <Input type="number" value={ctc} onChange={(e) => setCtc(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Basic pay as % of CTC — {basicPct}%</Label>
            <Slider value={[basicPct]} min={30} max={60} step={1} onValueChange={(v) => setBasicPct(v[0])} />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
            <Label className="text-sm">Professional tax applicable in my state</Label>
            <Switch checked={ptax} onCheckedChange={setPtax} />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
            <Label className="text-sm">Restrict PF to statutory wage ceiling</Label>
            <Switch checked={capPf} onCheckedChange={setCapPf} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <ResultRow label="Basic pay (annual)" value={inr(r.basicAnnual)} />
          <ResultRow label="Employer PF (not in hand)" value={`- ${inr(r.employerPf)}`} negative />
          <ResultRow label="Gratuity provision (not in hand)" value={`- ${inr(r.gratuityProv)}`} negative />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="Gross salary (annual)" value={inr(r.grossAnnual)} />
          <ResultRow label="Employee PF" value={`- ${inr(r.employeePf)}`} negative />
          <ResultRow label="Professional tax" value={`- ${inr(r.professionalTax)}`} negative />
          <ResultRow label="Income tax + cess (new regime)" value={`- ${inr(r.incomeTax)}`} negative />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="Net annual take-home" value={inr(r.netAnnual)} />
          <ResultRow label="Monthly in-hand salary" value={inr(r.netMonthly)} highlight />
        </Card>
      </div>

      <CalcContent
        heading="How the take-home salary calculator works"
        intro="Your CTC (Cost to Company) is the total annual spend your employer books against your position. A large part of it never reaches your bank account — retirement contributions, gratuity provisions and statutory taxes are deducted first. This calculator separates employer-side costs from your actual gross salary, then applies the deductions that produce your monthly credit."
        method={[
          {
            title: "Step 1 — Split CTC into basic pay and other components",
            body: "Most Indian employers fix basic pay at 40–50% of CTC. Basic pay drives PF, gratuity and HRA, so a higher basic means higher retirement savings and a lower immediate take-home. The slider lets you test both structures.",
          },
          {
            title: "Step 2 — Remove employer-side costs",
            body: "The employer's 12% PF contribution and the gratuity provision of 4.81% of basic pay are part of CTC but are never paid in cash. Subtracting them from CTC gives your gross salary — the figure on which your payslip is built.",
          },
          {
            title: "Step 3 — Apply payroll deductions",
            body: "Your own 12% PF contribution, professional tax (a state levy capped at ₹2,500 a year) and TDS on salary are deducted monthly. The calculator uses the new tax regime with the ₹75,000 standard deduction and the Section 87A rebate up to ₹12 lakh of taxable income.",
          },
          {
            title: "Step 4 — Convert to a monthly figure",
            body: "Net annual salary divided by twelve gives your monthly in-hand salary. Actual monthly credits can vary because TDS is often front-loaded or adjusted in the last quarter after you submit investment proofs.",
          },
        ]}
        formula={[
          "Basic pay = CTC × basic %",
          "Employer PF = 12% × basic pay",
          "Gratuity provision = 4.81% × basic pay",
          "Gross salary = CTC − employer PF − gratuity provision",
          "Taxable income = gross salary − ₹75,000 standard deduction − professional tax",
          "Income tax = slab tax × 1.04 (4% health & education cess)",
          "Net take-home = gross salary − employee PF − professional tax − income tax",
          "Monthly in-hand = net take-home ÷ 12",
        ]}
        faq={faq}
        related={[
          { label: "Gratuity Calculator", to: "/gratuity-calculator" },
          { label: "EPF Calculator", to: "/epf-calculator" },
          { label: "Income Tax Calculator", to: "/income-tax-calculator" },
          { label: "HRA Exemption Calculator", to: "/hra-calculator" },
        ]}
      />
    </div>
  );
}
