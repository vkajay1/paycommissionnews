import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/pension")({
  head: () => ({
    meta: [
      { title: "8th CPC Pension Calculator 2026 — Estimate Revised Basic Pension & DR" },
      {
        name: "description",
        content:
          "Free 8th Pay Commission pension calculator. Estimate revised basic pension, Dearness Relief, commuted value and net monthly pension for central government pensioners.",
      },
      { name: "keywords", content: "8th pay commission pension calculator, pension calculator 2026, revised pension 8th cpc, commuted pension calculator, DR calculator pensioners" },
      { rel: "canonical", href: `${SITE}/pension` },
      { property: "og:title", content: "8th CPC Pension Calculator 2026" },
      { property: "og:description", content: "Estimate revised basic pension, DR, commuted value and net monthly pension under the 8th CPC." },
      { property: "og:url", content: `${SITE}/pension` },
    ],
  }),
  component: PensionPage,
});

function PensionPage() {
  const [lastBasic, setLastBasic] = useState(80000);
  const [service, setService] = useState(33);
  const [fit, setFit] = useState(2.28);
  const [drPct, setDrPct] = useState(0);
  const [commutePct, setCommutePct] = useState(40);

  const result = useMemo(() => {
    const cappedService = Math.min(service, 33);
    const basicPension = Math.round((lastBasic * cappedService) / 66); // 50% capped at 33 years
    const revisedBasic = Math.round(basicPension * fit);
    const dr = Math.round((revisedBasic * drPct) / 100);
    const gross = revisedBasic + dr;
    const commutedLump = Math.round(revisedBasic * (commutePct / 100) * 12 * 8.194);
    const monthlyDeduction = Math.round((revisedBasic * commutePct) / 100);
    const netMonthly = gross - monthlyDeduction;
    return { basicPension, revisedBasic, dr, gross, commutedLump, monthlyDeduction, netMonthly };
  }, [lastBasic, service, fit, drPct, commutePct]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <PiggyBank className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pension Calculator</h1>
          <p className="text-sm text-muted-foreground">Estimate basic pension, DR and commuted value under the 8th CPC.</p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Last drawn basic pay (₹)</Label>
              <Input type="number" value={lastBasic} onChange={(e) => setLastBasic(Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Qualifying service (years)</Label>
              <Input type="number" value={service} onChange={(e) => setService(Number(e.target.value) || 0)} />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Fitment factor — {fit.toFixed(2)}x</Label>
            <Slider value={[fit]} min={1.5} max={4} step={0.01} onValueChange={(v) => setFit(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Dearness Relief (DR) — {drPct}%</Label>
            <Slider value={[drPct]} min={0} max={70} step={1} onValueChange={(v) => setDrPct(v[0])} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Commutation — {commutePct}% (max 40%)</Label>
            <Slider value={[commutePct]} min={0} max={40} step={1} onValueChange={(v) => setCommutePct(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-xl p-6">
          <Row label="Basic pension (pre-revision)" value={inr(result.basicPension)} />
          <Row label="Revised basic pension" value={inr(result.revisedBasic)} highlight />
          <Row label={`Dearness Relief @ ${drPct}%`} value={inr(result.dr)} />
          <Row label="Gross monthly pension" value={inr(result.gross)} />
          <div className="my-2 h-px bg-border" />
          <Row label="Commuted lump-sum (one-time)" value={inr(result.commutedLump)} />
          <Row label="Monthly commutation deduction" value={`- ${inr(result.monthlyDeduction)}`} />
          <Row label="Net monthly pension" value={inr(result.netMonthly)} highlight />
          <p className="pt-2 text-xs text-muted-foreground">
            Uses 50% of last basic × (service/33) formula, commuted using the standard 8.194 factor, restored after 15 years.
          </p>
        </Card>
      </div>

      <DiscussionBox />
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
