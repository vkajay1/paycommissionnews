import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
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
import { inr } from "@/lib/format";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { CURRENT_DA } from "@/lib/da-rates";
import {
  CalcContent,
  CalcHeader,
  appLd,
  faqLd,
  type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.co.in";

const RAJ_DA = 60;
const RAJ_HRA: Record<string, number> = { A: 24, B: 16, C: 8 };
const CENTRAL_HRA = 30;

/** 40 cells per level, 3% annual increment rounded up to the next ₹100. */
function cells(entry: number): number[] {
  const out: number[] = [];
  let v = entry;
  for (let i = 0; i < 40; i++) {
    out.push(v);
    v = Math.ceil((v * 1.03) / 100) * 100;
  }
  return out;
}

const DA_HISTORY_RAJ = [
  { date: "Jan 2024", pct: 46 },
  { date: "Jul 2024", pct: 50 },
  { date: "Jan 2025", pct: 53 },
  { date: "Jul 2025", pct: 58 },
  { date: "Jan 2026", pct: 60 },
];

const HRA_CITIES = [
  { city: "Jaipur", cat: "A", rate: 24 },
  { city: "Jodhpur", cat: "B", rate: 16 },
  { city: "Kota", cat: "B", rate: 16 },
  { city: "Udaipur", cat: "B", rate: 16 },
  { city: "Ajmer", cat: "B", rate: 16 },
  { city: "Bikaner", cat: "C", rate: 8 },
  { city: "Bhilwara", cat: "C", rate: 8 },
  { city: "Alwar", cat: "C", rate: 8 },
  { city: "Sikar", cat: "C", rate: 8 },
  { city: "Pali / Barmer / other towns", cat: "C", rate: 8 },
];

const COMPARISON = [
  { aspect: "Pay commission followed", central: "7th CPC (Central)", state: "Rajasthan Civil Services (Revised Pay) Rules, 2017" },
  { aspect: "Effective from", central: "1 January 2016", state: "1 January 2017 (notified 2017)" },
  { aspect: "Current DA", central: `${CURRENT_DA}%`, state: `${RAJ_DA}%` },
  { aspect: "HRA in highest city", central: "30% (Delhi, Mumbai, Bengaluru…)", state: "24% (Jaipur)" },
  { aspect: "Workforce covered", central: "About 49 lakh employees", state: "About 7 lakh employees, 12.4 lakh with pensioners" },
  { aspect: "8th CPC position", central: "Commission constituted, report awaited", state: "Expected to adopt the central report with state modifications" },
];

const faq: Faq[] = [
  {
    q: "What is the current DA rate for Rajasthan government employees?",
    a: `Dearness allowance for Rajasthan state employees and pensioners stands at ${RAJ_DA}% of basic pay with effect from 1 January 2026, after the Cabinet cleared a two percentage point rise from 58%. That brings the state level in line with the central rate of ${CURRENT_DA}%, though Rajasthan orders are usually issued a few months later than the central office memorandum.`,
  },
  {
    q: "Does Rajasthan follow the Central Government pay matrix?",
    a: "Broadly yes. The state adopted the 7th CPC pay matrix of 18 levels with 40 cells each, so entry pay per level mirrors the central figures. Rajasthan retained its own grade pay to level mapping for several cadres and added Level 13A, so the level your post sits in can differ from the central equivalent even when the rupee value of the cell is identical.",
  },
  {
    q: "What is the HRA rate in Jaipur?",
    a: "Jaipur is the only A category city in the Rajasthan classification and attracts house rent allowance at 24% of basic pay. Jodhpur, Kota, Udaipur and Ajmer are B category at 16%, and the remaining districts are C category at 8%.",
  },
  {
    q: "What is the minimum salary for a Rajasthan government employee?",
    a: `Level 1 entry pay is ₹18,000 a month. With DA at ${RAJ_DA}% and C category HRA that works out to roughly ₹30,240 gross before deductions, and around ₹28,000 in hand after the NPS contribution and insurance recoveries.`,
  },
  {
    q: "How does Rajasthan pay compare with Central Government pay?",
    a: "Basic pay and DA are effectively identical. The gap comes almost entirely from HRA, which is capped at 24% in Jaipur against 30% in central X class cities, and from central allowances such as transport allowance with DA that the state either pays at lower rates or subsumes into a city compensatory allowance.",
  },
  {
    q: "When will Rajasthan implement the 8th Pay Commission?",
    a: "Rajasthan has no separate commission of its own for this cycle. The usual route is to wait for the central notification, refer it to the state finance department and a pay anomaly committee, and then notify revised pay rules with a retrospective effective date. On past form the state order lands 12 to 24 months after the central one, with arrears paid in instalments.",
  },
  {
    q: "How do I calculate my Rajasthan government salary?",
    a: "Take the basic pay from your pay matrix cell, add DA at 60% of basic, add HRA at 24, 16 or 8 percent by city category, add any post-specific allowance, then deduct NPS at 10% of basic plus DA, state insurance and GPF where applicable. The calculator above does all of this and shows the central figure alongside for comparison.",
  },
  {
    q: "Will Rajasthan pensioners get the same revision?",
    a: "Yes. Dearness relief for state pensioners is revised at the same rate and from the same date as DA for serving employees, and pension is refixed at 50% of the revised last drawn pay whenever new pay rules are notified.",
  },
];

export const Route = createFileRoute("/rajasthan-government-salary-calculator")({
  head: () => ({
    meta: [
      {
        title: "Rajasthan Government Salary Calculator 2026 — Pay Matrix, DA 60%, HRA",
      },
      {
        name: "description",
        content:
          "Rajasthan government salary calculator with the full 7th CPC pay matrix, 60% DA, Jaipur/Jodhpur HRA categories, state vs central comparison and an 8th Pay Commission projection slider.",
      },
      {
        name: "keywords",
        content:
          "rajasthan government salary calculator, rajasthan pay matrix, rajasthan da rate 2026, rajasthan government employee salary, jaipur hra rate, 8th pay commission rajasthan",
      },
      { property: "og:title", content: "Rajasthan Government Salary Calculator — Pay Matrix & DA" },
      {
        property: "og:description",
        content:
          "Level and cell wise Rajasthan salary with DA, HRA, NPS and an 8th CPC projection, compared against central pay.",
      },
      { property: "og:url", content: `${SITE}/rajasthan-government-salary-calculator` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/rajasthan-government-salary-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd(
            "Rajasthan Government Salary Calculator",
            `${SITE}/rajasthan-government-salary-calculator`,
            "Rajasthan state pay matrix salary calculator with DA, HRA and 8th CPC projection.",
          ),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  const [level, setLevel] = useState(6);
  const [cellIndex, setCellIndex] = useState(0);
  const [cat, setCat] = useState<"A" | "B" | "C">("A");
  const [fit, setFit] = useState(1.92);

  const levelCells = useMemo(() => {
    const entry = PAY_LEVELS.find((p) => p.level === level)?.entryPay ?? 18000;
    return cells(entry);
  }, [level]);

  const basic = levelCells[Math.min(cellIndex, levelCells.length - 1)];

  const r = useMemo(() => {
    const da = Math.round((basic * RAJ_DA) / 100);
    const hraS = Math.round((basic * RAJ_HRA[cat]) / 100);
    const grossS = basic + da + hraS;
    const npsS = Math.round(((basic + da) * 10) / 100);

    const daC = Math.round((basic * CURRENT_DA) / 100);
    const hraC = Math.round((basic * CENTRAL_HRA) / 100);
    const grossC = basic + daC + hraC;
    const npsC = Math.round(((basic + daC) * 10) / 100);

    const projected = Math.round(basic * fit);
    return {
      da,
      hraS,
      grossS,
      npsS,
      netS: grossS - npsS,
      daC,
      hraC,
      grossC,
      npsC,
      netC: grossC - npsC,
      projected,
      gap: grossS - grossC,
    };
  }, [basic, cat, fit]);

  const rows = [
    { label: "Basic pay", state: inr(basic), central: inr(basic) },
    { label: `Dearness allowance (${RAJ_DA}% vs ${CURRENT_DA}%)`, state: inr(r.da), central: inr(r.daC) },
    { label: `HRA (${RAJ_HRA[cat]}% vs ${CENTRAL_HRA}%)`, state: inr(r.hraS), central: inr(r.hraC) },
    { label: "Gross salary", state: inr(r.grossS), central: inr(r.grossC), bold: true },
    { label: "NPS at 10% of basic + DA", state: `− ${inr(r.npsS)}`, central: `− ${inr(r.npsC)}` },
    { label: "Approximate in-hand", state: inr(r.netS), central: inr(r.netC), bold: true },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={MapPin}
        kicker="Rajasthan"
        title="Rajasthan Government Salary Calculator"
        sub="Pick your pay level, matrix cell and city category to see Rajasthan state salary with 60% DA and HRA, set against the central government figure for the same basic pay, plus an 8th CPC projection."
      />
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Pay level</Label>
            <Select
              value={String(level)}
              onValueChange={(v) => {
                setLevel(Number(v));
                setCellIndex(0);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAY_LEVELS.map((p) => (
                  <SelectItem key={p.level} value={String(p.level)}>
                    Level {p.level} — {p.grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Basic pay (matrix cell)</Label>
            <Select value={String(cellIndex)} onValueChange={(v) => setCellIndex(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {levelCells.map((c, i) => (
                  <SelectItem key={i} value={String(i)}>
                    Cell {i + 1} — {inr(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">City category (HRA)</Label>
            <Select value={cat} onValueChange={(v) => setCat(v as "A" | "B" | "C")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A — Jaipur (24%)</SelectItem>
                <SelectItem value="B">B — Jodhpur, Kota, Udaipur, Ajmer (16%)</SelectItem>
                <SelectItem value="C">C — all other districts (8%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">
              8th CPC fitment factor — {fit.toFixed(2)}x
            </Label>
            <Slider
              className="mt-3"
              value={[fit]}
              min={1}
              max={4}
              step={0.01}
              onValueChange={(v) => setFit(v[0])}
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[1.92, 2.28, 2.57, 2.86].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFit(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    Math.abs(fit - f) < 0.005
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground/80 hover:bg-secondary/70"
                  }`}
                >
                  {f.toFixed(2)}x
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-2 rounded-2xl bg-secondary/50 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">
                  Projected basic at {fit.toFixed(2)}x
                </span>
                <span className="text-xl font-bold text-primary">{inr(r.projected)}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Gross gap vs central</span>
                <span
                  className={`font-semibold ${r.gap >= 0 ? "text-success" : "text-destructive"}`}
                >
                  {r.gap >= 0 ? "+" : "−"}
                  {inr(Math.abs(r.gap))}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl p-6">
          <div className="mb-4 text-sm font-semibold">
            Rajasthan vs Central Government on the same basic pay
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr>
                  <th className="p-3 font-semibold">Component</th>
                  <th className="p-3 font-semibold">Rajasthan (DA {RAJ_DA}%)</th>
                  <th className="p-3 font-semibold">Central (DA {CURRENT_DA}%)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <td className="p-3 text-muted-foreground">{row.label}</td>
                    <td className={`p-3 ${row.bold ? "font-bold text-primary" : "font-medium"}`}>
                      {row.state}
                    </td>
                    <td className={`p-3 ${row.bold ? "font-bold" : "font-medium"}`}>
                      {row.central}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Based on the 7th CPC pay matrix. Rajasthan carries some cadre-specific cell variations and
            a Level 13A that has no exact central twin. State DA revisions usually trail the central
            order by one or two months even when the rate matches. Confirm figures with your treasury
            or the Finance Department circular before relying on them.
          </p>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Rajasthan DA rate history</h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Effective from</th>
                <th className="p-3 font-semibold">DA rate</th>
                <th className="p-3 font-semibold">Rise</th>
              </tr>
            </thead>
            <tbody>
              {DA_HISTORY_RAJ.map((d, i) => (
                <tr key={d.date} className="border-t border-border">
                  <td className="p-3">{d.date}</td>
                  <td className="p-3 font-semibold">{d.pct}%</td>
                  <td className="p-3 text-muted-foreground">
                    {i === 0 ? "—" : `+${d.pct - DA_HISTORY_RAJ[i - 1].pct} pp`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Rajasthan HRA city classification</h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">City</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">HRA rate</th>
                <th className="p-3 font-semibold">On your basic</th>
              </tr>
            </thead>
            <tbody>
              {HRA_CITIES.map((c) => (
                <tr key={c.city} className="border-t border-border">
                  <td className="p-3">{c.city}</td>
                  <td className="p-3 text-muted-foreground">{c.cat}</td>
                  <td className="p-3">{c.rate}%</td>
                  <td className="p-3 font-semibold">{inr(Math.round((basic * c.rate) / 100))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Rajasthan and Central Government side by side</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Aspect</th>
                <th className="p-3 font-semibold">Central Government</th>
                <th className="p-3 font-semibold">Rajasthan</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((c) => (
                <tr key={c.aspect} className="border-t border-border">
                  <td className="p-3 font-medium">{c.aspect}</td>
                  <td className="p-3 text-muted-foreground">{c.central}</td>
                  <td className="p-3">{c.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CalcContent
        heading="Rajasthan government pay structure explained"
        intro="Rajasthan revised the pay of its employees under the Rajasthan Civil Services (Revised Pay) Rules, 2017, which lifted the central 7th CPC matrix almost wholesale and layered state-specific mappings on top for cadres that had no clean central equivalent. Around seven lakh serving employees across 33 districts draw pay on this matrix, and with pensioners the DA order of January 2026 touches roughly 12.4 lakh people."
        method={[
          {
            title: "The matrix and your cell",
            body: "Each of the 18 levels holds 40 cells, and Rajasthan additionally recognises Level 13A. Your basic pay is one cell, and each 1 July increment moves you one cell down at about 3% rounded up to the next hundred rupees. Promotion moves you across to the first cell in the higher level that exceeds your present pay.",
          },
          {
            title: "Dearness allowance",
            body: `The state pays DA at ${RAJ_DA}% of basic pay from 1 January 2026, having gone from 46% to 50% to 53% to 58% over the preceding cycles. Rajasthan has been unusually prompt in matching the central rate, but the Finance Department order typically follows the central office memorandum by a month or two, and the intervening period is paid as arrears.`,
          },
          {
            title: "House rent allowance",
            body: "The state runs its own three-tier city classification rather than the central X, Y and Z scheme. Jaipur alone sits in category A at 24%, the four large cities of Jodhpur, Kota, Udaipur and Ajmer are category B at 16%, and everywhere else is category C at 8%. This is the single biggest reason a Rajasthan pay slip trails a central pay slip at the same basic pay.",
          },
          {
            title: "Other allowances and deductions",
            body: "City compensatory allowance, hard-area and tribal-area allowances, and cadre allowances for police, teaching and medical posts are notified at state rates and do not track central figures. On the deduction side, employees who joined on or after 1 January 2004 contribute 10% of basic plus DA to the National Pension System, with the state contributing its matching share, while older entrants remain on GPF along with state insurance recoveries.",
          },
          {
            title: "What the 8th CPC will mean for Rajasthan",
            body: "Rajasthan has not constituted a commission of its own for this round. The expected sequence is a central notification, a state finance department examination of the cost, and then Rajasthan revised pay rules with a retrospective effective date. Employees should model the outcome on fitment factors between 1.92 and 2.86 and expect arrears to be released in instalments rather than as a single payment, as the state has done before.",
          },
        ]}
        formula={[
          "Basic pay = your cell in the Rajasthan pay matrix",
          `DA = Basic × ${RAJ_DA}%`,
          `HRA = Basic × ${RAJ_HRA[cat]}% (category ${cat})`,
          "Gross = Basic + DA + HRA + state allowances",
          "In-hand = Gross − NPS (10% of basic + DA) − insurance − income tax",
          `8th CPC projected basic = Basic × ${fit.toFixed(2)}`,
        ]}
        faq={faq}
        related={[
          { label: "7th CPC calculator", to: "/7th-pay-commission-calculator" },
          { label: "7th vs 8th CPC comparison", to: "/7th-vs-8th-pay-commission" },
          { label: "8th CPC salary calculator", to: "/salary" },
          { label: "DA calculator", to: "/da-calculator" },
          { label: "HRA calculator", to: "/hra-calculator" },
          { label: "All state pages", to: "/state" },
        ]}
      />
    </div>
  );
}
