import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { inr } from "@/lib/format";
import {
  CalcContent, CalcHeader, ResultRow, appLd, faqLd, type Faq,
} from "@/components/calc/CalcShell";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const SITE = "https://paycommissionnews.lovable.app";

const faq: Faq[] = [
  {
    q: "How much do employer and employee contribute to EPF?",
    a: "Both contribute 12% of basic pay plus DA. The employee's full 12% goes to EPF; of the employer's 12%, 8.33% goes to the EPS pension fund (capped on ₹15,000 wages) and the balance 3.67% to EPF.",
  },
  {
    q: "What is the current EPF interest rate?",
    a: "The EPFO declared 8.25% for FY 2024-25. Interest is credited annually on the running monthly balance.",
  },
  {
    q: "Do central government employees get EPF?",
    a: "No. Employees who joined before 2004 are under GPF and the old pension scheme; those who joined after are under NPS or the Unified Pension Scheme. EPF applies to private and most PSU employees.",
  },
  {
    q: "Is EPF withdrawal taxable?",
    a: "Withdrawals after five years of continuous service are tax free. Earlier withdrawals are taxable, and interest on employee contributions above ₹2.5 lakh a year is taxable annually.",
  },
];

export const Route = createFileRoute("/epf-calculator")({
  head: () => ({
    meta: [
      { title: "EPF Calculator 2026 — Provident Fund Maturity & Interest Calculator" },
      {
        name: "description",
        content:
          "Free EPF calculator for private and PSU employees. Project provident fund maturity with 12% employee and employer contributions, 8.25% interest and annual salary growth.",
      },
      {
        name: "keywords",
        content:
          "epf calculator, provident fund calculator, pf calculator india, epf maturity calculator, employee provident fund interest calculator",
      },
      { property: "og:title", content: "EPF Calculator — Provident Fund Maturity" },
      { property: "og:description", content: "Project your EPF corpus with contributions, interest and salary growth." },
      { property: "og:url", content: `${SITE}/epf-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/epf-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd("EPF Calculator", `${SITE}/epf-calculator`, "Employee Provident Fund maturity and interest calculator."),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  const [basic, setBasic] = useState(35000);
  const [age, setAge] = useState(30);
  const [retire, setRetire] = useState(58);
  const [growth, setGrowth] = useState(7);
  const [rate, setRate] = useState(8.25);
  const [opening, setOpening] = useState(0);

  const { rows, total, employee, employer, interest } = useMemo(() => {
    const years = Math.max(0, retire - age);
    let bal = opening;
    let wage = basic;
    let emp = 0;
    let er = 0;
    let intr = 0;
    const rows: { year: number; balance: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const yearlyEmp = Math.round(wage * 0.12 * 12);
      const yearlyEr = Math.round(wage * 0.0367 * 12);
      emp += yearlyEmp;
      er += yearlyEr;
      const avg = bal + (yearlyEmp + yearlyEr) / 2;
      const i = Math.round((avg * rate) / 100);
      intr += i;
      bal = bal + yearlyEmp + yearlyEr + i;
      rows.push({ year: age + y, balance: Math.round(bal) });
      wage = Math.round(wage * (1 + growth / 100));
    }
    return { rows, total: Math.round(bal), employee: emp, employer: er, interest: intr };
  }, [basic, age, retire, growth, rate, opening]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={PiggyBank}
        kicker="Retirement savings"
        title="EPF Calculator"
        sub="Project your Employee Provident Fund corpus at retirement using 12% employee and 3.67% employer EPF contributions, annual increments and the current EPFO interest rate."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Monthly basic pay + DA (₹)</Label>
            <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Existing EPF balance (₹)</Label>
            <Input type="number" value={opening} onChange={(e) => setOpening(Number(e.target.value) || 0)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Current age</Label>
              <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Retirement age</Label>
              <Input type="number" value={retire} onChange={(e) => setRetire(Number(e.target.value) || 0)} />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Annual salary growth — {growth}%</Label>
            <Slider value={[growth]} min={0} max={15} step={0.5} onValueChange={(v) => setGrowth(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">EPF interest rate — {rate}%</Label>
            <Slider value={[rate]} min={7} max={10} step={0.05} onValueChange={(v) => setRate(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <ResultRow label="Your total contribution" value={inr(employee)} />
          <ResultRow label="Employer EPF contribution" value={inr(employer)} />
          <ResultRow label="Interest earned" value={inr(interest)} />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="EPF corpus at retirement" value={inr(total)} highlight />
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rows}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(v: number) => inr(v)} labelFormatter={(l) => `Age ${l}`} />
                <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <CalcContent
        heading="How EPF is calculated"
        intro="The Employees' Provident Fund is a statutory retirement scheme for establishments with 20 or more employees. Both you and your employer contribute 12% of basic wages every month, and the accumulated balance earns compound interest declared annually by the EPFO."
        method={[
          {
            title: "Step 1 — Identify PF wages",
            body: "PF wages are basic pay plus dearness allowance (and retaining allowance, if any). The statutory wage ceiling is ₹15,000, but most employers contribute on actual basic pay when it is higher.",
          },
          {
            title: "Step 2 — Split the employer share",
            body: "Your entire 12% goes into EPF. Of the employer's 12%, 8.33% is diverted to the Employees' Pension Scheme (calculated on the ₹15,000 ceiling) and only 3.67% is credited to your EPF account, which is why this calculator uses 3.67% for corpus growth.",
          },
          {
            title: "Step 3 — Apply interest annually",
            body: "The EPFO credits interest once a year on the running monthly balance. This calculator applies the declared rate to the opening balance plus half of the year's contributions, closely approximating the monthly-balance method.",
          },
          {
            title: "Step 4 — Grow the wage each year",
            body: "Annual increments raise your PF wage, so contributions compound faster in later years. Adjust the growth slider to match your appraisal history; each extra percentage point of growth adds meaningfully to the final corpus.",
          },
        ]}
        formula={[
          "Employee contribution = 12% × (basic + DA)",
          "Employer EPF share = 3.67% × (basic + DA)",
          "Employer EPS share = 8.33% × min(basic + DA, ₹15,000)",
          "Interest = (opening balance + ½ × yearly contributions) × rate",
          "Closing balance = opening + contributions + interest",
        ]}
        faq={faq}
        related={[
          { label: "NPS Calculator", to: "/nps-calculator" },
          { label: "Gratuity Calculator", to: "/gratuity-calculator" },
          { label: "Take Home Salary", to: "/take-home-salary" },
          { label: "Income Tax Calculator", to: "/income-tax-calculator" },
        ]}
      />
    </div>
  );
}
