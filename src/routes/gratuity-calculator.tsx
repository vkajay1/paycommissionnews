import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HandCoins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { inr } from "@/lib/format";
import {
  CalcContent, CalcHeader, ResultRow, appLd, faqLd, type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.co.in";

const faq: Faq[] = [
  {
    q: "What is the gratuity formula in India?",
    a: "For employees covered by the Payment of Gratuity Act: gratuity = (last drawn basic + DA) × 15 ÷ 26 × completed years of service. For government employees it is (basic + DA) × 15 ÷ 26 per half-year of service, capped at 16.5 times emoluments.",
  },
  {
    q: "How many years of service are needed for gratuity?",
    a: "Five years of continuous service. The requirement is waived on death or permanent disablement. Service beyond six months in the final year is rounded up to a full year.",
  },
  {
    q: "Is gratuity tax free?",
    a: "Government employees receive gratuity fully exempt. For private employees the exemption is the least of actual gratuity, ₹20 lakh, or the formula amount. Anything above that is taxed as salary.",
  },
  {
    q: "Will gratuity increase after the 8th Pay Commission?",
    a: "Yes. Gratuity is computed on last drawn basic pay plus DA, so a higher fitment factor raises the gratuity of anyone retiring after implementation. The tax-free ceiling for government employees was raised to ₹25 lakh from January 2024.",
  },
];

export const Route = createFileRoute("/gratuity-calculator")({
  head: () => ({
    meta: [
      { title: "Gratuity Calculator 2026 — Government & Private Employee Gratuity" },
      {
        name: "description",
        content:
          "Free gratuity calculator for government and private sector employees. Compute gratuity on last drawn basic + DA, check the 15/26 formula, exemption limits and 8th CPC impact.",
      },
      {
        name: "keywords",
        content:
          "gratuity calculator, gratuity calculation formula, gratuity calculator central government employees, retirement gratuity calculator, death gratuity calculator",
      },
      { property: "og:title", content: "Gratuity Calculator — Government & Private" },
      { property: "og:description", content: "Compute retirement gratuity using the 15/26 formula." },
      { property: "og:url", content: `${SITE}/gratuity-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/gratuity-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd("Gratuity Calculator", `${SITE}/gratuity-calculator`, "Gratuity calculator for Indian government and private sector employees."),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  const [sector, setSector] = useState<"govt" | "private">("govt");
  const [basic, setBasic] = useState(56100);
  const [daPct, setDaPct] = useState(58);
  const [years, setYears] = useState(30);

  const r = useMemo(() => {
    const da = Math.round((basic * daPct) / 100);
    const emoluments = basic + da;
    if (sector === "govt") {
      const halfYears = Math.min(years * 2, 66);
      const raw = Math.round((emoluments * halfYears) / 4);
      const cap = Math.min(Math.round(emoluments * 16.5), 2500000);
      return { emoluments, raw, payable: Math.min(raw, cap), cap, halfYears };
    }
    const raw = Math.round((emoluments * 15 * years) / 26);
    const cap = 2000000;
    return { emoluments, raw, payable: Math.min(raw, cap), cap, halfYears: 0 };
  }, [sector, basic, daPct, years]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={HandCoins}
        kicker="Retirement benefit"
        title="Gratuity Calculator"
        sub="Calculate retirement or death gratuity for central/state government staff and private sector employees covered by the Payment of Gratuity Act."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5 rounded-xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Employment type</Label>
            <Select value={sector} onValueChange={(v) => setSector(v as typeof sector)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="govt">Government employee (CCS Pension Rules)</SelectItem>
                <SelectItem value="private">Private employee (Gratuity Act)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Last drawn basic pay (₹/month)</Label>
            <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Dearness allowance (%)</Label>
            <Input type="number" value={daPct} onChange={(e) => setDaPct(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Completed years of service</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-xl p-6">
          <ResultRow label="Emoluments (basic + DA)" value={inr(r.emoluments)} />
          {sector === "govt" && <ResultRow label="Six-monthly periods counted" value={`${r.halfYears}`} />}
          <ResultRow label="Gratuity as per formula" value={inr(r.raw)} />
          <ResultRow label="Statutory ceiling" value={inr(r.cap)} />
          <div className="my-1 h-px bg-border" />
          <ResultRow label="Gratuity payable" value={inr(r.payable)} highlight />
          <p className="pt-2 text-xs text-muted-foreground">
            {sector === "govt"
              ? "Government gratuity is 1/4 of emoluments per six-monthly period, capped at 16.5 times emoluments or ₹25 lakh."
              : "Private sector gratuity uses 15/26 of monthly wages per completed year, capped at ₹20 lakh."}
          </p>
        </Card>
      </div>

      <CalcContent
        heading="How gratuity is calculated in India"
        intro="Gratuity is a lump-sum reward for long service, paid on retirement, resignation after five years, death or disablement. Government and private employees use two different statutory formulas, and this calculator applies the correct one for your employment type."
        method={[
          {
            title: "Government employees — CCS (Pension) Rules",
            body: "Retirement gratuity equals one-fourth of emoluments (last drawn basic pay plus dearness allowance) for every completed six-monthly period of qualifying service. The maximum is 16.5 times emoluments, subject to the ₹25 lakh ceiling that applies from 1 January 2024.",
          },
          {
            title: "Private employees — Payment of Gratuity Act, 1972",
            body: "Gratuity equals last drawn monthly wages (basic + DA) multiplied by 15/26 for each completed year of service. The 26 represents working days in a month and 15 represents half a month's wages. The tax-free ceiling is ₹20 lakh.",
          },
          {
            title: "Rounding of service length",
            body: "Under the Gratuity Act, service of more than six months in the final year counts as a full year — 10 years 7 months is treated as 11 years. Government rules count service in completed six-month blocks instead.",
          },
          {
            title: "Effect of the 8th Pay Commission",
            body: "Because gratuity is based on last drawn basic pay, anyone retiring after 8th CPC implementation gets gratuity on the revised basic. At a 2.86x fitment factor the gratuity of a Level 10 officer would rise in the same proportion, subject to the ceiling.",
          },
        ]}
        formula={[
          "Government: gratuity = (basic + DA) × ¼ × six-monthly periods",
          "Government cap = min(16.5 × emoluments, ₹25,00,000)",
          "Private: gratuity = (basic + DA) × 15 ÷ 26 × completed years",
          "Private cap = ₹20,00,000",
          "Death gratuity (govt) = 12 × emoluments for service above 20 years",
        ]}
        faq={faq}
        related={[
          { label: "Pension Calculator", to: "/pension" },
          { label: "Leave Encashment", to: "/leave-encashment-calculator" },
          { label: "Take Home Salary", to: "/take-home-salary" },
          { label: "NPS Calculator", to: "/nps-calculator" },
        ]}
      />
    </div>
  );
}
