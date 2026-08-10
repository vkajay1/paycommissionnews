import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inr } from "@/lib/format";
import {
  CalcContent, CalcHeader, ResultRow, appLd, faqLd, type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.co.in";

const faq: Faq[] = [
  {
    q: "How is leave encashment calculated?",
    a: "Leave encashment = (basic pay + DA) ÷ 30 × number of earned leave days, subject to a maximum of 300 days for central government employees.",
  },
  {
    q: "Is leave encashment taxable?",
    a: "Encashment received by government employees on retirement is fully exempt. For private employees the exemption is capped at ₹25 lakh under Section 10(10AA).",
  },
  {
    q: "How many EL days can be encashed?",
    a: "Central government employees can encash up to 300 days of earned leave at retirement, and up to 10 days at a time while availing LTC without depleting the 300-day ceiling.",
  },
  {
    q: "Will 8th CPC raise leave encashment?",
    a: "Yes, indirectly. Encashment is based on last drawn basic pay plus DA, so a revised basic under the 8th CPC increases the payable amount for anyone retiring after implementation.",
  },
];

export const Route = createFileRoute("/leave-encashment-calculator")({
  head: () => ({
    meta: [
      { title: "Leave Encashment Calculator 2026 — Earned Leave Encashment on Retirement" },
      {
        name: "description",
        content:
          "Free leave encashment calculator for government and private employees. Compute earned leave encashment on basic pay + DA for up to 300 days with tax exemption limits.",
      },
      {
        name: "keywords",
        content:
          "leave encashment calculator, earned leave encashment calculation, el encashment calculator central government, leave encashment on retirement, 300 days leave encashment",
      },
      { property: "og:title", content: "Leave Encashment Calculator" },
      { property: "og:description", content: "Calculate earned leave encashment on retirement or LTC." },
      { property: "og:url", content: `${SITE}/leave-encashment-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/leave-encashment-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd("Leave Encashment Calculator", `${SITE}/leave-encashment-calculator`, "Earned leave encashment calculator for Indian employees."),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  const [basic, setBasic] = useState(56100);
  const [daPct, setDaPct] = useState(58);
  const [days, setDays] = useState(300);

  const r = useMemo(() => {
    const da = Math.round((basic * daPct) / 100);
    const emoluments = basic + da;
    const capped = Math.min(days, 300);
    const amount = Math.round((emoluments / 30) * capped);
    return { emoluments, capped, perDay: Math.round(emoluments / 30), amount };
  }, [basic, daPct, days]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={CalendarCheck}
        kicker="Retirement benefit"
        title="Leave Encashment Calculator"
        sub="Calculate cash equivalent of unutilised earned leave on retirement, resignation or while availing LTC, for both government and private employees."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Last drawn basic pay (₹/month)</Label>
            <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Dearness allowance (%)</Label>
            <Input type="number" value={daPct} onChange={(e) => setDaPct(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Earned leave balance (days)</Label>
            <Input type="number" value={days} onChange={(e) => setDays(Number(e.target.value) || 0)} />
          </div>
          <p className="text-xs text-muted-foreground">Encashment is limited to 300 days of earned leave.</p>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <ResultRow label="Emoluments (basic + DA)" value={inr(r.emoluments)} />
          <ResultRow label="Per-day rate (÷ 30)" value={inr(r.perDay)} />
          <ResultRow label="Days considered" value={`${r.capped} days`} />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="Leave encashment payable" value={inr(r.amount)} highlight />
        </Card>
      </div>

      <CalcContent
        heading="How leave encashment is calculated"
        intro="Leave encashment converts unused earned leave into cash. Government employees are paid on the basis of the pay and dearness allowance last drawn, while private employees follow their company leave policy within the limits of Section 10(10AA) of the Income Tax Act."
        method={[
          {
            title: "Step 1 — Determine emoluments",
            body: "Add last drawn basic pay and the dearness allowance payable on it. Other allowances such as HRA and transport allowance are not counted for encashment.",
          },
          {
            title: "Step 2 — Convert to a daily rate",
            body: "Emoluments are divided by 30 regardless of the number of days in the month, giving a uniform per-day rate for encashment.",
          },
          {
            title: "Step 3 — Multiply by eligible leave days",
            body: "Earned leave up to a maximum of 300 days is encashable at retirement or superannuation. Half-pay leave can be added to make up the 300-day limit where earned leave alone is short.",
          },
          {
            title: "Step 4 — Apply tax treatment",
            body: "For government employees the entire amount is exempt from tax. For private employees the exemption is the least of actual encashment, ₹25 lakh, ten months' average salary, or the cash value of leave at 30 days per year of service.",
          },
        ]}
        formula={[
          "Per-day rate = (basic pay + DA) ÷ 30",
          "Encashment = per-day rate × min(EL balance, 300)",
          "Government employees: fully exempt from income tax",
          "Private employees: exemption capped at ₹25,00,000",
        ]}
        faq={faq}
        related={[
          { label: "Gratuity Calculator", to: "/gratuity-calculator" },
          { label: "Pension Calculator", to: "/pension" },
          { label: "LTC Planner", to: "/ltc-planner" },
          { label: "Salary Calculator", to: "/salary" },
        ]}
      />
    </div>
  );
}
