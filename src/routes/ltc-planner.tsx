import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.lovable.app";

export const Route = createFileRoute("/ltc-planner")({
  head: () => ({
    meta: [
      { title: "LTC Planner & Calculator — Leave Travel Concession Entitlement" },
      {
        name: "description",
        content:
          "Plan LTC entitlement and reimbursement for central government employees. Estimate airfare/rail cap by pay level, family strength and block year.",
      },
      { name: "keywords", content: "ltc calculator, leave travel concession, ltc entitlement, ltc reimbursement calculator" },
      { rel: "canonical", href: `${SITE}/ltc-planner` },
      { property: "og:title", content: "LTC Planner & Calculator" },
      { property: "og:description", content: "Plan Leave Travel Concession entitlement and reimbursement." },
    ],
  }),
  component: Page,
});

type Mode = "air" | "rail-ac1" | "rail-ac2" | "rail-ac3";

const MODE_RATE: Record<Mode, number> = {
  "air": 8, // ₹/km approx economy
  "rail-ac1": 4.5,
  "rail-ac2": 2.8,
  "rail-ac3": 1.9,
};

export const Route_ = null;

function Page() {
  const [level, setLevel] = useState(6);
  const [mode, setMode] = useState<Mode>("rail-ac2");
  const [km, setKm] = useState(1500);
  const [family, setFamily] = useState(4);

  const r = useMemo(() => {
    // LTC air eligibility from Level 9+
    const airEligible = level >= 9;
    const effectiveMode: Mode = mode === "air" && !airEligible ? "rail-ac2" : mode;
    const oneWayPerHead = Math.round(km * MODE_RATE[effectiveMode]);
    const roundTripPerHead = oneWayPerHead * 2;
    const total = roundTripPerHead * family;
    const advance = Math.round(total * 0.9);
    return { airEligible, effectiveMode, oneWayPerHead, roundTripPerHead, total, advance };
  }, [level, mode, km, family]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Plane className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LTC Planner</h1>
          <p className="text-sm text-muted-foreground">Plan Leave Travel Concession entitlement and reimbursement.</p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Pay level</Label>
              <Input type="number" min={1} max={18} value={level} onChange={(e) => setLevel(Number(e.target.value) || 1)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Family members (incl. self)</Label>
              <Input type="number" min={1} max={8} value={family} onChange={(e) => setFamily(Number(e.target.value) || 1)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Mode of travel</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="air">Air (economy) — Level 9+</SelectItem>
                  <SelectItem value="rail-ac1">Rail — AC First</SelectItem>
                  <SelectItem value="rail-ac2">Rail — AC 2 Tier</SelectItem>
                  <SelectItem value="rail-ac3">Rail — AC 3 Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">One-way distance (km)</Label>
              <Input type="number" value={km} onChange={(e) => setKm(Number(e.target.value) || 0)} />
            </div>
          </div>
          {!r.airEligible && mode === "air" && (
            <p className="text-xs text-warning">Air travel is admissible from Level 9 and above; using AC 2-Tier rates instead.</p>
          )}
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <Row label="Fare per head — one way" value={inr(r.oneWayPerHead)} />
          <Row label="Fare per head — round trip" value={inr(r.roundTripPerHead)} />
          <Row label={`Total for ${family} member(s)`} value={inr(r.total)} highlight />
          <Row label="Eligible LTC advance (90%)" value={inr(r.advance)} />
          <p className="pt-2 text-xs text-muted-foreground">
            Illustrative per-km rates. Actual entitlement follows DoPT OMs and prevailing airline/rail fares on the shortest route.
          </p>
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
