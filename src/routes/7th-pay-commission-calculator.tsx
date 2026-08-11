import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";
import { PAY_LEVELS, transportAllowance } from "@/lib/pay-matrix";
import { CURRENT_DA, DA_OPTIONS } from "@/lib/da-rates";
import {
  CalcContent,
  CalcHeader,
  ResultRow,
  appLd,
  faqLd,
  type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.co.in";

const HRA: Record<string, number> = { X: 30, Y: 20, Z: 10 };

const faq: Faq[] = [
  {
    q: "How is 7th CPC salary calculated?",
    a: "Start from the basic pay in your pay matrix cell. Add dearness allowance at the current rate on that basic pay, then house rent allowance at 30%, 20% or 10% depending on whether you are posted in an X, Y or Z class city, and finally transport allowance with DA on TA. The total is your gross monthly salary.",
  },
  {
    q: "What is the 7th CPC fitment factor?",
    a: "The 7th Pay Commission applied a uniform multiple of 2.57 to the 6th CPC pay, which was itself pay in the pay band plus grade pay. The minimum basic pay moved from ₹7,000 to ₹18,000 a month from 1 January 2016.",
  },
  {
    q: "What DA rate should I use in 2026?",
    a: `Central government DA stands at ${CURRENT_DA}% of basic pay. The rate is revised twice a year, from January and from July, based on the All India Consumer Price Index for Industrial Workers.`,
  },
  {
    q: "How does annual increment work in the pay matrix?",
    a: "Every 1 July you move one cell down in the same level, which works out to roughly a 3% rise on basic pay, rounded to the next ₹100. Promotion moves you across to the next level, at the first cell higher than your current pay.",
  },
  {
    q: "Will 7th CPC pay still matter after the 8th CPC?",
    a: "Yes. Your 7th CPC basic pay on the date of implementation is the base on which the 8th CPC fitment factor is applied, so a correct 7th CPC figure is the starting point for every revised-pay estimate.",
  },
];

export const Route = createFileRoute("/7th-pay-commission-calculator")({
  head: () => ({
    meta: [
      { title: "7th Pay Commission Calculator 2026 — 7th CPC Salary Calculator" },
      {
        name: "description",
        content:
          "Free 7th CPC salary calculator with the full pay matrix, current DA, city-wise HRA and transport allowance. Get your exact 7th Pay Commission gross salary level by level.",
      },
      {
        name: "keywords",
        content:
          "7th pay commission calculator, 7th cpc salary calculator, 7th cpc pay matrix calculator, 7th pay commission salary calculator 2026, basic pay da hra calculator",
      },
      { property: "og:title", content: "7th Pay Commission Calculator — 7th CPC Salary" },
      {
        property: "og:description",
        content: "Compute 7th CPC basic, DA, HRA and TA for all 18 pay levels.",
      },
      { property: "og:url", content: `${SITE}/7th-pay-commission-calculator` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/7th-pay-commission-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd(
            "7th Pay Commission Calculator",
            `${SITE}/7th-pay-commission-calculator`,
            "7th CPC salary calculator with pay matrix, DA, HRA and transport allowance.",
          ),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  const [level, setLevel] = useState(7);
  const [basic, setBasic] = useState(44900);
  const [city, setCity] = useState<"X" | "Y" | "Z">("X");
  const [daPct, setDaPct] = useState(CURRENT_DA);

  const r = useMemo(() => {
    const da = Math.round((basic * daPct) / 100);
    const hra = Math.round((basic * HRA[city]) / 100);
    const taBase = transportAllowance(level);
    const ta = taBase + Math.round((taBase * daPct) / 100);
    const gross = basic + da + hra + ta;
    const nps = Math.round(((basic + da) * 10) / 100);
    const cgegis = level >= 10 ? 120 : level >= 6 ? 60 : 30;
    return { da, hra, ta, gross, nps, cgegis, net: gross - nps - cgegis - 250 };
  }, [basic, daPct, city, level]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={Calculator}
        kicker="7th CPC"
        title="7th Pay Commission Calculator"
        sub="Work out your current 7th CPC gross and in-hand salary from the pay matrix: basic pay, dearness allowance, city-wise HRA and transport allowance."
      />
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Pay level</Label>
            <Select
              value={String(level)}
              onValueChange={(v) => {
                const lv = Number(v);
                setLevel(lv);
                const found = PAY_LEVELS.find((p) => p.level === lv);
                if (found) setBasic(found.entryPay);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAY_LEVELS.map((p) => (
                  <SelectItem key={p.level} value={String(p.level)}>
                    Level {p.level} — {p.grade} ({inr(p.entryPay)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Basic pay (₹/month)</Label>
            <Input
              type="number"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">City class (HRA)</Label>
            <Select value={city} onValueChange={(v) => setCity(v as "X" | "Y" | "Z")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="X">X — metro, 30% HRA</SelectItem>
                <SelectItem value="Y">Y — 20% HRA</SelectItem>
                <SelectItem value="Z">Z — 10% HRA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Dearness allowance</Label>
            <Select value={String(daPct)} onValueChange={(v) => setDaPct(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DA_OPTIONS.map((d) => (
                  <SelectItem key={d.key} value={String(d.pct)}>
                    {d.pct}% — {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <ResultRow label="Basic pay" value={inr(basic)} />
          <ResultRow label={`Dearness allowance @ ${daPct}%`} value={inr(r.da)} />
          <ResultRow label={`HRA @ ${HRA[city]}% (${city} class)`} value={inr(r.hra)} />
          <ResultRow label="Transport allowance + DA on TA" value={inr(r.ta)} />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="Gross monthly salary" value={inr(r.gross)} highlight />
          <ResultRow label="NPS @ 10% of (basic + DA)" value={`− ${inr(r.nps)}`} negative />
          <ResultRow label="CGEGIS" value={`− ${inr(r.cgegis)}`} negative />
          <ResultRow label="CGHS contribution (indicative)" value={`− ${inr(250)}`} negative />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="Approx. in-hand salary" value={inr(r.net)} highlight />
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">7th CPC pay matrix — entry pay and gross at {daPct}% DA</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Level</th>
                <th className="p-3 font-semibold">Post / grade</th>
                <th className="p-3 font-semibold">Entry basic</th>
                <th className="p-3 font-semibold">DA</th>
                <th className="p-3 font-semibold">Gross (X city)</th>
              </tr>
            </thead>
            <tbody>
              {PAY_LEVELS.map((p) => {
                const da = Math.round((p.entryPay * daPct) / 100);
                const hra = Math.round(p.entryPay * 0.3);
                const taBase = transportAllowance(p.level);
                const ta = taBase + Math.round((taBase * daPct) / 100);
                return (
                  <tr key={p.level} className="border-t border-border">
                    <td className="p-3 font-semibold">{p.level}</td>
                    <td className="p-3 text-muted-foreground">{p.grade}</td>
                    <td className="p-3">{inr(p.entryPay)}</td>
                    <td className="p-3">{inr(da)}</td>
                    <td className="p-3 font-semibold">{inr(p.entryPay + da + hra + ta)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <CalcContent
        heading="How the 7th Pay Commission salary structure works"
        intro="The 7th Central Pay Commission, implemented from 1 January 2016, replaced the old pay band and grade pay system with a single pay matrix of 18 levels and 40 cells each. Your position in that grid is your basic pay, and every allowance you draw is a percentage of that one number, which is why getting the matrix cell right matters more than anything else in the calculation."
        method={[
          {
            title: "Step 1 — Fix the basic pay",
            body: "Pay on 31 December 2015 (pay in the pay band plus grade pay) was multiplied by 2.57 and placed at the nearest equal or higher cell of the corresponding level. Since then each 1 July adds one increment, about 3% of basic pay rounded up to the next ₹100, so a Level 7 official who started at ₹44,900 now sits several cells lower in the same column.",
          },
          {
            title: "Step 2 — Add dearness allowance",
            body: `DA neutralises inflation and is paid as a flat percentage of basic pay, revised from January and July each year on the AICPI-IW twelve-month average. At the current ${CURRENT_DA}% rate, DA is the single largest component of a central government pay slip after basic pay.`,
          },
          {
            title: "Step 3 — Add HRA and transport allowance",
            body: "HRA is 30% of basic pay in X class cities, 20% in Y and 10% in Z, with floor amounts of ₹5,400, ₹3,600 and ₹1,800. Transport allowance is a flat slab of ₹900, ₹1,350, ₹3,600 or ₹7,200 by level and posting, and DA is payable on TA as well.",
          },
          {
            title: "Step 4 — Deduct to reach in-hand pay",
            body: "From gross salary, subtract NPS at 10% of basic plus DA (or GPF if you are a pre-2004 entrant), CGEGIS at ₹30 to ₹120 by level, the CGHS contribution for your slab, professional tax where a state levies it, and income tax after choosing the regime that suits you.",
          },
        ]}
        formula={[
          "Basic pay = matrix cell for your level and years of service",
          `DA = Basic × ${daPct}%`,
          "HRA = Basic × 30% / 20% / 10% (X / Y / Z city)",
          "TA = slab by level + DA on TA",
          "Gross = Basic + DA + HRA + TA + other allowances",
          "In-hand = Gross − NPS − CGEGIS − CGHS − income tax",
        ]}
        faq={faq}
        related={[
          { label: "7th vs 8th CPC comparison", to: "/7th-vs-8th-pay-commission" },
          { label: "8th CPC salary calculator", to: "/salary" },
          { label: "DA calculator", to: "/da-calculator" },
          { label: "Pay matrix by level", to: "/pay-level" },
          { label: "6th CPC calculator", to: "/6th-pay-commission-calculator" },
        ]}
      />
    </div>
  );
}
