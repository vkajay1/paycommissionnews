import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { inr } from "@/lib/format";
import {
  CalcContent, CalcHeader, ResultRow, appLd, faqLd, type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.co.in";

const faq: Faq[] = [
  {
    q: "How much is contributed to NPS for government employees?",
    a: "Employees contribute 10% of basic pay plus DA and the central government contributes 14%. Both go into your NPS Tier-I account and are invested as per your chosen scheme preference.",
  },
  {
    q: "How much of the NPS corpus can I withdraw at 60?",
    a: "Up to 60% can be withdrawn tax free as a lump sum; at least 40% must buy an annuity that pays your monthly pension, which is taxable as income.",
  },
  {
    q: "How is the Unified Pension Scheme different?",
    a: "The UPS, effective 1 April 2025, gives NPS-covered central employees an assured pension of 50% of the average basic pay of the last 12 months after 25 years of qualifying service, with a minimum of ₹10,000 a month.",
  },
  {
    q: "What tax benefits does NPS offer?",
    a: "Employee contributions qualify under 80CCD(1) within the ₹1.5 lakh 80C limit, an extra ₹50,000 under 80CCD(1B), and employer contributions up to 14% of salary are deductible under 80CCD(2) in both regimes.",
  },
];

export const Route = createFileRoute("/nps-calculator")({
  head: () => ({
    meta: [
      { title: "NPS Calculator 2026 — National Pension Scheme Corpus & Pension" },
      {
        name: "description",
        content:
          "Free NPS calculator for government and private employees. Project your National Pension Scheme corpus, lump sum, annuity and monthly pension with 10% + 14% contributions.",
      },
      {
        name: "keywords",
        content:
          "nps calculator, national pension scheme calculator, nps pension calculator government employees, nps corpus calculator, unified pension scheme calculator",
      },
      { property: "og:title", content: "NPS Calculator — Corpus & Monthly Pension" },
      { property: "og:description", content: "Project your NPS corpus, lump sum and annuity pension at 60." },
      { property: "og:url", content: `${SITE}/nps-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/nps-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd("NPS Calculator", `${SITE}/nps-calculator`, "National Pension Scheme corpus and pension calculator."),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  const [basic, setBasic] = useState(44900);
  const [daPct, setDaPct] = useState(58);
  const [age, setAge] = useState(30);
  const [growth, setGrowth] = useState(6);
  const [ret, setRet] = useState(10);
  const [annuityRate, setAnnuityRate] = useState(6.5);
  const [lumpPct, setLumpPct] = useState(60);

  const r = useMemo(() => {
    const years = Math.max(0, 60 - age);
    let wage = basic + Math.round((basic * daPct) / 100);
    let corpus = 0;
    for (let y = 1; y <= years; y++) {
      const contrib = Math.round(wage * 0.24 * 12);
      corpus = (corpus + contrib) * (1 + ret / 100);
      wage = Math.round(wage * (1 + growth / 100));
    }
    corpus = Math.round(corpus);
    const lump = Math.round((corpus * lumpPct) / 100);
    const annuity = corpus - lump;
    const monthly = Math.round((annuity * annuityRate) / 100 / 12);
    return { years, corpus, lump, annuity, monthly };
  }, [basic, daPct, age, growth, ret, annuityRate, lumpPct]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={TrendingUp}
        kicker="Pension"
        title="NPS Calculator"
        sub="Project your National Pension System corpus at 60 with the 10% employee and 14% government contribution, then split it into a lump sum and an annuity pension."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Basic pay (₹)</Label>
              <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">DA (%)</Label>
              <Input type="number" value={daPct} onChange={(e) => setDaPct(Number(e.target.value) || 0)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Current age</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Annual pay growth — {growth}%</Label>
            <Slider value={[growth]} min={0} max={12} step={0.5} onValueChange={(v) => setGrowth(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Expected NPS return — {ret}%</Label>
            <Slider value={[ret]} min={6} max={14} step={0.25} onValueChange={(v) => setRet(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Lump sum withdrawal — {lumpPct}%</Label>
            <Slider value={[lumpPct]} min={0} max={60} step={5} onValueChange={(v) => setLumpPct(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Annuity rate — {annuityRate}%</Label>
            <Slider value={[annuityRate]} min={4} max={9} step={0.1} onValueChange={(v) => setAnnuityRate(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <ResultRow label="Years of contribution" value={`${r.years}`} />
          <ResultRow label="Corpus at age 60" value={inr(r.corpus)} highlight />
          <div className="my-1 h-px bg-border" />
          <ResultRow label={`Tax-free lump sum (${lumpPct}%)`} value={inr(r.lump)} />
          <ResultRow label="Amount used for annuity" value={inr(r.annuity)} />
          <ResultRow label="Monthly pension" value={inr(r.monthly)} highlight />
          <p className="pt-2 text-xs text-muted-foreground">
            At least 40% of the corpus must be annuitised. Under the Unified Pension Scheme, eligible central employees
            instead receive 50% of their last 12 months' average basic pay.
          </p>
        </Card>
      </div>

      <CalcContent
        heading="How the NPS corpus and pension are calculated"
        intro="The National Pension System is a defined-contribution scheme: your pension depends on how much is contributed, how long it compounds and what annuity rate you get at exit. Central government employees who joined on or after 1 January 2004 are covered by NPS, with the option of the Unified Pension Scheme from 1 April 2025."
        method={[
          {
            title: "Step 1 — Monthly contribution",
            body: "Government employees contribute 10% of basic pay plus DA and the employer adds 14%, so 24% of pensionable pay flows into Tier-I every month. Private subscribers choose their own contribution amount.",
          },
          {
            title: "Step 2 — Compounding to age 60",
            body: "Contributions are invested in equity, corporate bond and government securities funds. This calculator compounds each year's contributions at your expected return and increases the contribution base by your annual pay growth, which includes increments and DA revisions.",
          },
          {
            title: "Step 3 — Exit split at 60",
            body: "Up to 60% of the corpus can be taken as a tax-free lump sum. The remaining 40% or more must purchase an annuity from a PFRDA-empanelled insurer, which fixes your lifelong monthly pension.",
          },
          {
            title: "Step 4 — Monthly pension from annuity",
            body: "Monthly pension equals the annuitised amount multiplied by the annuity rate divided by twelve. Rates currently range from about 6% to 7% depending on whether you choose a return-of-purchase-price or joint-life option.",
          },
        ]}
        formula={[
          "Monthly contribution = 24% × (basic + DA) for government staff",
          "Corpus(year) = [corpus(prev) + yearly contribution] × (1 + return)",
          "Lump sum = corpus × withdrawal % (max 60%)",
          "Annuity purchase price = corpus − lump sum (min 40%)",
          "Monthly pension = annuity price × annuity rate ÷ 12",
          "UPS assured pension = 50% × average basic pay of last 12 months",
        ]}
        faq={faq}
        related={[
          { label: "Pension Calculator", to: "/pension" },
          { label: "EPF Calculator", to: "/epf-calculator" },
          { label: "Gratuity Calculator", to: "/gratuity-calculator" },
          { label: "Income Tax Calculator", to: "/income-tax-calculator" },
        ]}
      />
    </div>
  );
}
