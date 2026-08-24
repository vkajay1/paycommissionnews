import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/pay-fixation")({
  head: () => ({
    meta: [
      { title: "Pay Fixation Calculator — Promotion, MACP & 8th CPC Rollover" },
      {
        name: "description",
        content:
          "Fix pay on promotion, MACP or 8th Pay Commission rollover. Get the revised basic pay after applying increment and matching to the next cell.",
      },
      { name: "keywords", content: "pay fixation calculator, promotion pay fixation, MACP pay fixation, 8th cpc pay fixation" },
      { rel: "canonical", href: `${SITE}/pay-fixation` },
      { property: "og:title", content: "Pay Fixation Calculator" },
      { property: "og:description", content: "Fix pay on promotion, MACP or 8th CPC rollover." },
    ],
  }),
  component: Page,
});

function Page() {
  const [basic, setBasic] = useState(44900);
  const [mode, setMode] = useState<"promotion" | "macp" | "rollover">("promotion");
  const [fit, setFit] = useState(2.28);

  const r = useMemo(() => {
    // 3% increment rounded to next 100
    const increment = Math.ceil((basic * 0.03) / 100) * 100;
    const afterIncrement = basic + increment;
    let fixed = afterIncrement;
    let note = "";
    if (mode === "promotion") {
      note = "One notional increment @ 3% in existing level, then placed at the next higher cell in the promoted level.";
    } else if (mode === "macp") {
      note = "One financial upgradation with 3% increment; placed in the immediate next higher cell of the next level.";
    } else {
      fixed = Math.round(basic * fit);
      note = `Multiplied by fitment factor ${fit.toFixed(2)}x and rounded to next pay-matrix cell.`;
    }
    return { increment, afterIncrement, fixed, note };
  }, [basic, mode, fit]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <ClipboardList className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pay Fixation Calculator</h1>
          <p className="text-sm text-muted-foreground">Fix pay on promotion, MACP or pay-commission rollover.</p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Current basic pay (₹)</Label>
            <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Fixation mode</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="promotion">Promotion</SelectItem>
                <SelectItem value="macp">MACP upgradation</SelectItem>
                <SelectItem value="rollover">8th CPC rollover</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {mode === "rollover" && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Fitment factor</Label>
              <Input type="number" step="0.01" value={fit} onChange={(e) => setFit(Number(e.target.value) || 0)} />
            </div>
          )}
        </Card>

        <Card className="space-y-4 rounded-xl p-6">
          {mode !== "rollover" && (
            <>
              <Row label="3% notional increment" value={inr(r.increment)} />
              <Row label="Pay after increment" value={inr(r.afterIncrement)} />
            </>
          )}
          <Row label="Fixed basic pay" value={inr(r.fixed)} highlight />
          <p className="pt-2 text-xs text-muted-foreground">{r.note}</p>
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
