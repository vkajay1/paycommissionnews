import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.lovable.app";

export const Route = createFileRoute("/arrear")({
  head: () => ({
    meta: [
      { title: "8th CPC Arrear Calculator 2026 — Salary Arrears Month-wise" },
      {
        name: "description",
        content:
          "Calculate 8th Pay Commission salary arrears month-wise between the implementation date and actual payout date. Free arrear calculator for central government employees.",
      },
      { name: "keywords", content: "8th pay commission arrear calculator, salary arrear calculator, cpc arrears calculator, 8cpc arrears" },
      { rel: "canonical", href: `${SITE}/arrear` },
      { property: "og:title", content: "8th CPC Arrear Calculator" },
      { property: "og:description", content: "Estimate month-wise salary arrears under the 8th Pay Commission." },
    ],
  }),
  component: ArrearPage,
});

function ArrearPage() {
  const [currentGross, setCurrentGross] = useState(60000);
  const [fit, setFit] = useState(2.28);
  const [months, setMonths] = useState(18);

  const result = useMemo(() => {
    const revisedGross = Math.round(currentGross * fit);
    const monthlyDiff = revisedGross - currentGross;
    const gross = monthlyDiff * months;
    const tds = Math.round(gross * 0.1);
    const net = gross - tds;
    return { revisedGross, monthlyDiff, gross, tds, net };
  }, [currentGross, fit, months]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Receipt className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Arrear Calculator</h1>
          <p className="text-sm text-muted-foreground">Month-wise salary arrears between 8th CPC implementation and payout.</p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Current gross salary (₹/month)</Label>
            <Input type="number" value={currentGross} onChange={(e) => setCurrentGross(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Fitment factor — {fit.toFixed(2)}x</Label>
            <Slider value={[fit]} min={1.5} max={4} step={0.01} onValueChange={(v) => setFit(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Arrear period — {months} months</Label>
            <Slider value={[months]} min={1} max={36} step={1} onValueChange={(v) => setMonths(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <Row label="Revised gross salary" value={inr(result.revisedGross)} />
          <Row label="Monthly difference" value={inr(result.monthlyDiff)} />
          <div className="my-2 h-px bg-border" />
          <Row label={`Gross arrears (${months} months)`} value={inr(result.gross)} highlight />
          <Row label="Estimated TDS @ 10%" value={`- ${inr(result.tds)}`} />
          <Row label="Net arrears payable" value={inr(result.net)} highlight />
          <p className="pt-2 text-xs text-muted-foreground">TDS is illustrative; actual tax depends on your slab and Section 89 relief.</p>
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
