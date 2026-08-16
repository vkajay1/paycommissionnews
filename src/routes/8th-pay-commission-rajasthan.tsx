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

const TIMELINE = [
  { date: "Jan 2025", event: "Union Cabinet approves the constitution of the 8th Central Pay Commission." },
  { date: "Nov 2025", event: "Terms of reference notified; Justice Ranjana Prakash Desai named chairperson." },
  { date: "2026-27", event: "Commission collects memoranda, holds federation meetings and finalises its report." },
  { date: "After central order", event: "Rajasthan Finance Department examines the cost and refers it to a pay anomaly committee." },
  { date: "12-24 months later", event: "Rajasthan Civil Services (Revised Pay) Rules notified with a retrospective effective date and staged arrears." },
];

const ADOPTION_HISTORY = [
  { cpc: "6th CPC (central 2008)", raj: "Rajasthan revised pay rules 2008, effective 1 Sep 2008 for cash", gap: "About 8 months" },
  { cpc: "7th CPC (central 2016)", raj: "Rajasthan Civil Services (Revised Pay) Rules 2017, effective 1 Jan 2017", gap: "About 12 months" },
  { cpc: "8th CPC (central expected 2027)", raj: "Expected state notification with retrospective effect", gap: "12 to 24 months" },
];

const faq: Faq[] = [
  {
    q: "Will Rajasthan implement the 8th Pay Commission?",
    a: "Rajasthan does not run a pay commission of its own. It waits for the central report, gets the finance department to cost the recommendations for roughly seven lakh serving employees and 5.4 lakh pensioners, and then notifies its own revised pay rules that mirror the central matrix with state-specific cadre mapping. On the record of 2008 and 2017 the state order should follow the central one by twelve to twenty-four months.",
  },
  {
    q: "What will the 8th CPC salary be for a Rajasthan government employee?",
    a: `At a fitment factor of 1.92 a Level 1 basic of ₹18,000 becomes about ₹34,560, and Level 6 entry pay of ₹35,400 becomes roughly ₹67,970. Since DA resets to zero on the day new pay rules take effect, the first pay slip under the new matrix looks close to the present gross of basic plus ${RAJ_DA}% DA, and the real gain builds up as fresh DA instalments are added.`,
  },
  {
    q: "What fitment factor should Rajasthan employees expect?",
    a: "Staff federations have asked for 2.86, several analyst estimates cluster around 2.28, and the arithmetic of the present 60% DA plus a modest real increase points to something in the 1.92 to 2.15 band. Use the slider above to model each case instead of relying on a single headline number.",
  },
  {
    q: "Will Rajasthan employees get 8th CPC arrears?",
    a: "Almost certainly yes, because the state effective date is usually earlier than the notification date. Rajasthan has historically released arrears in instalments, sometimes partly credited to GPF or NPS rather than paid in cash, so plan for a phased receipt rather than a lump sum.",
  },
  {
    q: "Will Rajasthan HRA change under the 8th CPC?",
    a: "The state runs its own A, B and C city classification at 24, 16 and 8 percent, so HRA is a state decision rather than a commission one. If the central commission recommends fresh slabs, Rajasthan will normally re-notify its percentages alongside the new matrix, and Jaipur will stay the only category A city.",
  },
  {
    q: "What happens to Rajasthan pensioners under the 8th CPC?",
    a: "Pension is refixed at 50% of the revised last drawn pay, or by applying the fitment factor to the existing basic pension, whichever is more favourable once the state rules are notified. Dearness relief then restarts from zero on the revised pension and rises with each subsequent instalment.",
  },
  {
    q: "Does the Old Pension Scheme affect the 8th CPC calculation in Rajasthan?",
    a: "Rajasthan restored the Old Pension Scheme for employees appointed on or after 1 January 2004, so many state staff no longer see a 10% NPS deduction and instead contribute to GPF. That changes the in-hand figure but not the way the revised basic pay is fixed.",
  },
  {
    q: "How do I calculate my own 8th CPC salary for Rajasthan?",
    a: "Take your current matrix cell, multiply by the fitment factor to get the revised basic, then add HRA at your city category and any state allowance. DA starts at zero on the effective date, so compare the revised gross with your present basic plus 60% DA plus HRA to see the true increase.",
  },
];

export const Route = createFileRoute("/8th-pay-commission-rajasthan")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission in Rajasthan 2026 — Salary Calculator & Fitment" },
      {
        name: "description",
        content:
          "8th CPC in Rajasthan: state salary calculator with fitment factor 1.92x to 2.86x, revised basic pay, HRA by city category, arrears outlook, adoption timeline and pensioner impact.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission rajasthan, 8th cpc rajasthan salary calculator, rajasthan 8th pay commission fitment factor, rajasthan revised pay rules, rajasthan government salary after 8th pay commission",
      },
      { property: "og:title", content: "8th Pay Commission in Rajasthan — Salary Calculator" },
      {
        property: "og:description",
        content:
          "Model your revised Rajasthan pay under the 8th CPC with a fitment slider, HRA categories and arrears outlook.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-rajasthan` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-rajasthan` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd(
            "8th CPC Salary Calculator for Rajasthan",
            `${SITE}/8th-pay-commission-rajasthan`,
            "8th Pay Commission salary calculator for Rajasthan government employees with fitment factor projection.",
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
  const [daMerged, setDaMerged] = useState(true);

  const levelCells = useMemo(() => {
    const entry = PAY_LEVELS.find((p) => p.level === level)?.entryPay ?? 18000;
    return cells(entry);
  }, [level]);

  const basic = levelCells[Math.min(cellIndex, levelCells.length - 1)];

  const r = useMemo(() => {
    // Present (7th CPC based Rajasthan pay)
    const daNow = Math.round((basic * RAJ_DA) / 100);
    const hraNow = Math.round((basic * RAJ_HRA[cat]) / 100);
    const grossNow = basic + daNow + hraNow;

    // Projected (8th CPC)
    const newBasic = Math.round(basic * fit);
    const daNew = daMerged ? 0 : Math.round((newBasic * RAJ_DA) / 100);
    const hraNew = Math.round((newBasic * RAJ_HRA[cat]) / 100);
    const grossNew = newBasic + daNew + hraNew;

    const diff = grossNew - grossNow;
    return {
      daNow,
      hraNow,
      grossNow,
      newBasic,
      daNew,
      hraNew,
      grossNew,
      diff,
      hikePct: grossNow ? (diff / grossNow) * 100 : 0,
      arrear12: diff * 12,
    };
  }, [basic, cat, fit, daMerged]);

  const rows = [
    { label: "Basic pay", now: inr(basic), next: inr(r.newBasic), bold: true },
    {
      label: `Dearness allowance (${RAJ_DA}% → ${daMerged ? "0%" : `${RAJ_DA}%`})`,
      now: inr(r.daNow),
      next: inr(r.daNew),
    },
    { label: `HRA (category ${cat}, ${RAJ_HRA[cat]}%)`, now: inr(r.hraNow), next: inr(r.hraNew) },
    { label: "Gross monthly salary", now: inr(r.grossNow), next: inr(r.grossNew), bold: true },
  ];

  const levelTable = PAY_LEVELS.map((p) => {
    const cur = p.entryPay + Math.round((p.entryPay * RAJ_DA) / 100);
    const nb = Math.round(p.entryPay * fit);
    const nxt = nb + (daMerged ? 0 : Math.round((nb * RAJ_DA) / 100));
    return { level: p.level, grade: p.grade, entry: p.entryPay, cur, nb, nxt, diff: nxt - cur };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={MapPin}
        kicker="Rajasthan · 8th CPC"
        title="8th Pay Commission in Rajasthan"
        sub="Project your revised Rajasthan government salary under the 8th Central Pay Commission. Choose your level, matrix cell and city category, move the fitment slider, and see the revised basic pay, gross salary, hike percentage and indicative arrears."
      />
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <Card className="space-y-5 rounded-xl p-6">
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
            <Label className="text-xs text-muted-foreground">Current basic pay (matrix cell)</Label>
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

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">DA treatment on revision</Label>
            <Select value={daMerged ? "merged" : "kept"} onValueChange={(v) => setDaMerged(v === "merged")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="merged">DA merged into basic, resets to 0%</SelectItem>
                <SelectItem value="kept">DA continues at {RAJ_DA}% (upper bound)</SelectItem>
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
              {[1.92, 2.08, 2.28, 2.57, 2.86].map((f) => (
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
            <div className="mt-4 grid gap-2 rounded-lg bg-secondary/50 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Revised basic pay</span>
                <span className="text-xl font-bold text-primary">{inr(r.newBasic)}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Monthly change in gross</span>
                <span className={`font-semibold ${r.diff >= 0 ? "text-success" : "text-destructive"}`}>
                  {r.diff >= 0 ? "+" : "−"}
                  {inr(Math.abs(r.diff))} ({r.hikePct >= 0 ? "+" : "−"}
                  {Math.abs(r.hikePct).toFixed(1)}%)
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Indicative 12-month arrears</span>
                <span className="font-semibold">{inr(Math.max(0, r.arrear12))}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl p-6">
          <div className="mb-4 text-sm font-semibold">
            Present Rajasthan pay vs 8th CPC projection at {fit.toFixed(2)}x
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr>
                  <th className="p-3 font-semibold">Component</th>
                  <th className="p-3 font-semibold">Now (7th CPC, DA {RAJ_DA}%)</th>
                  <th className="p-3 font-semibold">8th CPC projection</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <td className="p-3 text-muted-foreground">{row.label}</td>
                    <td className={`p-3 ${row.bold ? "font-bold" : "font-medium"}`}>{row.now}</td>
                    <td className={`p-3 ${row.bold ? "font-bold text-primary" : "font-medium"}`}>
                      {row.next}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Projection only. The 8th CPC report is not out, Rajasthan has not notified revised pay
            rules, and the state may vary cadre mapping, HRA percentages and the effective date. Once
            new pay rules take effect DA restarts near zero, which is why the merged option shows a
            smaller day-one jump than the fitment factor alone suggests.
          </p>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Level-wise 8th CPC projection for Rajasthan</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Level</th>
                <th className="p-3 font-semibold">Typical posts</th>
                <th className="p-3 font-semibold">Present basic</th>
                <th className="p-3 font-semibold">Basic + DA now</th>
                <th className="p-3 font-semibold">Revised basic</th>
                <th className="p-3 font-semibold">Projected (basic + DA)</th>
                <th className="p-3 font-semibold">Change</th>
              </tr>
            </thead>
            <tbody>
              {levelTable.map((row) => (
                <tr key={row.level} className="border-t border-border">
                  <td className="p-3 font-semibold">L{row.level}</td>
                  <td className="p-3 text-muted-foreground">{row.grade}</td>
                  <td className="p-3">{inr(row.entry)}</td>
                  <td className="p-3">{inr(row.cur)}</td>
                  <td className="p-3 font-semibold text-primary">{inr(row.nb)}</td>
                  <td className="p-3">{inr(row.nxt)}</td>
                  <td className={`p-3 font-medium ${row.diff >= 0 ? "text-success" : "text-destructive"}`}>
                    {row.diff >= 0 ? "+" : "−"}
                    {inr(Math.abs(row.diff))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Entry cell of each level, DA at {RAJ_DA}% for the present figure and{" "}
          {daMerged ? "0%" : `${RAJ_DA}%`} after revision. HRA and other state allowances are excluded
          here so the levels stay comparable.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">How Rajasthan is likely to adopt the 8th CPC</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Stage</th>
                <th className="p-3 font-semibold">What happens</th>
              </tr>
            </thead>
            <tbody>
              {TIMELINE.map((t) => (
                <tr key={t.date} className="border-t border-border">
                  <td className="p-3 font-medium whitespace-nowrap">{t.date}</td>
                  <td className="p-3 text-muted-foreground">{t.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Rajasthan pay commission adoption history</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Central commission</th>
                <th className="p-3 font-semibold">Rajasthan action</th>
                <th className="p-3 font-semibold">Lag</th>
              </tr>
            </thead>
            <tbody>
              {ADOPTION_HISTORY.map((a) => (
                <tr key={a.cpc} className="border-t border-border">
                  <td className="p-3 font-medium">{a.cpc}</td>
                  <td className="p-3 text-muted-foreground">{a.raj}</td>
                  <td className="p-3">{a.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CalcContent
        heading="8th Pay Commission in Rajasthan explained"
        intro={`Around seven lakh serving Rajasthan government employees and over five lakh pensioners currently draw pay under the Rajasthan Civil Services (Revised Pay) Rules, 2017, which lifted the 7th CPC matrix almost intact. With state DA already at ${RAJ_DA}% and the 8th Central Pay Commission in its consultation phase, the practical question in Rajasthan is not whether pay will be revised but how large the fitment factor will be and when the state notification will follow the central one.`}
        method={[
          {
            title: "Step 1 — locate your present cell",
            body: "Read your basic pay from the pay matrix cell printed on your pay slip. Rajasthan uses 18 levels of 40 cells each plus Level 13A, and each 1 July increment moves you one cell down at roughly 3% rounded up to the next hundred rupees.",
          },
          {
            title: "Step 2 — apply the fitment factor",
            body: "Revised basic pay equals the present cell multiplied by the fitment factor, then placed in the nearest equal or higher cell of the new matrix. Model 1.92x as a conservative case, 2.28x as the mid case and 2.86x as the federation demand.",
          },
          {
            title: "Step 3 — reset dearness allowance",
            body: `On the day new pay rules take effect the accumulated DA is merged into basic, so DA restarts at or near zero. That is why a 1.92x factor does not mean a 92% pay rise: the honest comparison is revised basic against present basic plus ${RAJ_DA}% DA.`,
          },
          {
            title: "Step 4 — recompute state allowances",
            body: "HRA is recalculated on the revised basic at 24% for Jaipur, 16% for Jodhpur, Kota, Udaipur and Ajmer, and 8% elsewhere. City compensatory, tribal-area and cadre allowances for police, teaching and medical posts are notified separately at state rates and do not automatically track central figures.",
          },
          {
            title: "Step 5 — arrears and deductions",
            body: "Because the state effective date usually precedes the notification date, the difference for the intervening months becomes arrears, historically released in instalments and sometimes credited to GPF. With the Old Pension Scheme restored for post-2004 appointees, many Rajasthan employees see a GPF subscription rather than a 10% NPS deduction, which changes in-hand pay but not the pay fixation itself.",
          },
          {
            title: "Pensioners and family pension",
            body: "Pension is refixed at 50% of the revised last drawn pay, or by applying the fitment factor to the existing basic pension, whichever is more favourable. Family pension follows at 30%, and dearness relief restarts from zero on the revised amount before rising with each new instalment.",
          },
        ]}
        formula={[
          "Revised basic = present matrix cell × fitment factor",
          `HRA = revised basic × ${RAJ_HRA[cat]}% (category ${cat})`,
          "Projected gross = revised basic + new DA + HRA + state allowances",
          `Real gain = projected gross − (present basic + ${RAJ_DA}% DA + HRA)`,
          "Arrears = monthly gain × months between effective date and payment",
          "Revised pension = 50% of revised last drawn pay (or basic pension × fitment factor)",
        ]}
        faq={faq}
        related={[
          { label: "Rajasthan salary calculator", to: "/rajasthan-government-salary-calculator" },
          { label: "8th CPC salary calculator", to: "/salary" },
          { label: "7th vs 8th CPC comparison", to: "/7th-vs-8th-pay-commission" },
          { label: "Arrears calculator", to: "/arrear" },
          { label: "Pension calculator", to: "/pension" },
          { label: "All state pages", to: "/state" },
        ]}
      />
    </div>
  );
}
