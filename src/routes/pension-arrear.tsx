import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/pension-arrear")({
  head: () => ({
    meta: [
      { title: "8th CPC Pension Arrear Calculator 2026 — Back-dated Pension & DR" },
      {
        name: "description",
        content:
          "Estimate back-dated pension arrears with DR adjustments under the 8th Pay Commission. Free pension arrears calculator for central government pensioners.",
      },
      { name: "keywords", content: "pension arrear calculator, 8th cpc pension arrears, DR arrears pensioners, revised pension arrears" },
      { rel: "canonical", href: `${SITE}/pension-arrear` },
      { property: "og:title", content: "8th CPC Pension Arrear Calculator" },
      { property: "og:description", content: "Back-dated pension arrears with DR adjustments under the 8th Pay Commission." },
    ],
  }),
  component: Page,
});

function Page() {
  const [currentPension, setCurrentPension] = useState(35000);
  const [fit, setFit] = useState(2.28);
  const [drPct, setDrPct] = useState(0);
  const [months, setMonths] = useState(18);

  const r = useMemo(() => {
    const revised = Math.round(currentPension * fit);
    const dr = Math.round((revised * drPct) / 100);
    const newMonthly = revised + dr;
    const monthlyDiff = newMonthly - currentPension;
    const gross = monthlyDiff * months;
    return { revised, dr, newMonthly, monthlyDiff, gross };
  }, [currentPension, fit, drPct, months]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <History className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pension Arrear Calculator</h1>
          <p className="text-sm text-muted-foreground">Back-dated pension arrears with DR adjustments.</p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Current basic pension (₹/month)</Label>
            <Input type="number" value={currentPension} onChange={(e) => setCurrentPension(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Fitment factor — {fit.toFixed(2)}x</Label>
            <Slider value={[fit]} min={1.5} max={4} step={0.01} onValueChange={(v) => setFit(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">DR at implementation — {drPct}%</Label>
            <Slider value={[drPct]} min={0} max={70} step={1} onValueChange={(v) => setDrPct(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Arrear period — {months} months</Label>
            <Slider value={[months]} min={1} max={36} step={1} onValueChange={(v) => setMonths(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-xl p-6">
          <Row label="Revised basic pension" value={inr(r.revised)} />
          <Row label={`Dearness Relief @ ${drPct}%`} value={inr(r.dr)} />
          <Row label="New monthly pension" value={inr(r.newMonthly)} highlight />
          <Row label="Monthly difference" value={inr(r.monthlyDiff)} />
          <div className="my-2 h-px bg-border" />
          <Row label={`Gross arrears (${months} months)`} value={inr(r.gross)} highlight />
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={highlight ? "text-lg font-bold text-primary" : "text-base font-semibold"}>{value}</span>
    </div>
  );
}
