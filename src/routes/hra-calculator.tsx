import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { inr } from "@/lib/format";
import {
  CalcContent, CalcHeader, ResultRow, appLd, faqLd, type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.lovable.app";

const faq: Faq[] = [
  {
    q: "How is HRA exemption calculated?",
    a: "The exemption is the least of: actual HRA received, rent paid minus 10% of salary, and 50% of salary in metro cities (40% elsewhere). Salary here means basic pay plus dearness allowance.",
  },
  {
    q: "Which cities count as metro for HRA?",
    a: "Only Delhi, Mumbai, Kolkata and Chennai qualify for the 50% limit under the Income Tax Act. All other cities, including Bengaluru and Hyderabad, use 40%.",
  },
  {
    q: "Can I claim HRA exemption under the new tax regime?",
    a: "No. HRA exemption under Section 10(13A) is available only if you opt for the old tax regime. Compare both regimes before deciding.",
  },
  {
    q: "What HRA do government employees get?",
    a: "Central government HRA is 30% of basic pay in X-class cities, 20% in Y-class and 10% in Z-class, revised upward when DA crosses 25% and 50%. The 8th CPC is expected to rebase these slabs.",
  },
];

export const Route = createFileRoute("/hra-calculator")({
  head: () => ({
    meta: [
      { title: "HRA Calculator 2026 — House Rent Allowance & Exemption Calculator" },
      {
        name: "description",
        content:
          "Free HRA calculator for salaried and government employees. Compute house rent allowance on basic pay by city class and the exact HRA exemption allowed under Section 10(13A).",
      },
      {
        name: "keywords",
        content:
          "hra calculator, house rent allowance calculator, hra exemption calculator, hra calculator central government employees, hra x y z city calculator",
      },
      { property: "og:title", content: "HRA Calculator — House Rent Allowance & Exemption" },
      { property: "og:description", content: "Calculate HRA by city class and your taxable/exempt split." },
      { property: "og:url", content: `${SITE}/hra-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/hra-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd("HRA Calculator", `${SITE}/hra-calculator`, "House Rent Allowance and Section 10(13A) exemption calculator."),
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
  const [hra, setHra] = useState(13470);
  const [rent, setRent] = useState(18000);
  const [metro, setMetro] = useState(true);

  const r = useMemo(() => {
    const salary = basic + Math.round((basic * daPct) / 100);
    const cityLimit = Math.round(salary * (metro ? 0.5 : 0.4));
    const rentMinus10 = Math.max(0, rent - Math.round(salary * 0.1));
    const exempt = Math.max(0, Math.min(hra, rentMinus10, cityLimit));
    return { salary, cityLimit, rentMinus10, exempt, taxable: Math.max(0, hra - exempt) };
  }, [basic, daPct, hra, rent, metro]);

  const slabs = [
    { city: "X (population ≥ 50 lakh)", rate: 30, amount: Math.round(basic * 0.3) },
    { city: "Y (5–50 lakh)", rate: 20, amount: Math.round(basic * 0.2) },
    { city: "Z (below 5 lakh)", rate: 10, amount: Math.round(basic * 0.1) },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={Home}
        kicker="Allowance"
        title="HRA Calculator"
        sub="Work out your house rent allowance by city class and the exact exemption available under Section 10(13A) of the Income Tax Act."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Basic pay (₹/month)</Label>
            <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Dearness allowance (%)</Label>
            <Input type="number" value={daPct} onChange={(e) => setDaPct(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">HRA received (₹/month)</Label>
            <Input type="number" value={hra} onChange={(e) => setHra(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Rent paid (₹/month)</Label>
            <Input type="number" value={rent} onChange={(e) => setRent(Number(e.target.value) || 0)} />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
            <Label className="text-sm">I live in a metro city (Delhi/Mumbai/Kolkata/Chennai)</Label>
            <Switch checked={metro} onCheckedChange={setMetro} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <ResultRow label="Salary for HRA (basic + DA)" value={inr(r.salary)} />
          <ResultRow label="Actual HRA received" value={inr(hra)} />
          <ResultRow label="Rent paid − 10% of salary" value={inr(r.rentMinus10)} />
          <ResultRow label={metro ? "50% of salary (metro)" : "40% of salary (non-metro)"} value={inr(r.cityLimit)} />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="HRA exempt from tax" value={inr(r.exempt)} highlight />
          <ResultRow label="Taxable HRA" value={inr(r.taxable)} />
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Government HRA slabs on your basic pay</h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">City class</th>
                <th className="p-3 font-semibold">HRA rate</th>
                <th className="p-3 font-semibold">Monthly HRA</th>
              </tr>
            </thead>
            <tbody>
              {slabs.map((s) => (
                <tr key={s.city} className="border-t border-border">
                  <td className="p-3">{s.city}</td>
                  <td className="p-3">{s.rate}%</td>
                  <td className="p-3 tabular-nums font-semibold text-primary">{inr(s.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CalcContent
        heading="How HRA and HRA exemption are calculated"
        intro="House Rent Allowance has two separate calculations. Government employees receive HRA as a fixed percentage of basic pay based on the classification of their posting city. Every salaried taxpayer, government or private, then computes how much of that HRA is exempt from income tax under Section 10(13A)."
        method={[
          {
            title: "Step 1 — HRA entitlement by city class",
            body: "Central government HRA is 30% of basic pay in X-class cities, 20% in Y-class and 10% in Z-class. These rates apply on basic pay only, not on basic plus DA, and were raised when DA crossed 50%.",
          },
          {
            title: "Step 2 — Compute the three exemption limits",
            body: "The Income Tax Act allows the least of three amounts: actual HRA received, rent paid minus 10% of salary, and 50% of salary for metro cities or 40% for non-metros. Salary means basic pay plus dearness allowance that counts for retirement benefits.",
          },
          {
            title: "Step 3 — Take the lowest figure",
            body: "The smallest of the three is exempt; the remainder is added to taxable salary. If your rent is less than 10% of salary, the exemption becomes zero regardless of how much HRA you receive.",
          },
          {
            title: "Step 4 — Check your tax regime",
            body: "HRA exemption is available only under the old tax regime. Under the new regime you pay lower slab rates but forgo HRA, so compare the total tax in both before opting.",
          },
        ]}
        formula={[
          "Government HRA = basic pay × 30% / 20% / 10% (X / Y / Z city)",
          "Limit 1 = actual HRA received",
          "Limit 2 = rent paid − 10% × (basic + DA)",
          "Limit 3 = 50% × (basic + DA) metro, else 40%",
          "Exempt HRA = min(limit 1, limit 2, limit 3)",
          "Taxable HRA = HRA received − exempt HRA",
        ]}
        faq={faq}
        related={[
          { label: "Salary Calculator", to: "/salary" },
          { label: "Income Tax Calculator", to: "/income-tax-calculator" },
          { label: "DA Calculator", to: "/da-calculator" },
          { label: "Take Home Salary", to: "/take-home-salary" },
        ]}
      />
    </div>
  );
}
