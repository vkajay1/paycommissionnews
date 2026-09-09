import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PAY_LEVELS, FITMENT_CHIPS } from "@/lib/pay-matrix";
import { compareSalary, type City } from "@/lib/cpc";
import { inr, pct } from "@/lib/format";

export function QuickCalc() {
  const [level, setLevel] = useState(7);
  const [basic, setBasic] = useState(44900);
  const [city, setCity] = useState<City>("X");
  const [fit, setFit] = useState(2.28);

  const result = useMemo(
    () =>
      compareSalary({
        level,
        basicPay: basic,
        city,
        daPct: 60,
        fitmentFactor: fit,
      }),
    [level, basic, city, fit],
  );

  return (
    <section className="border-l-4 border-primary bg-foreground text-background">
        <div className="grid gap-0 xl:grid-cols-[1.1fr_1fr]">
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Salary revision estimator</h2>
                <p className="text-sm text-background/60">
                  Based on current fitment projections.
                </p>
              </div>
              <span className="border border-primary bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Live tool
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="qc-level">Pay Level</Label>
                <Select
                  value={String(level)}
                  onValueChange={(v) => {
                    const n = Number(v);
                    setLevel(n);
                    const entry = PAY_LEVELS.find((p) => p.level === n)?.entryPay;
                    if (entry) setBasic(entry);
                  }}
                >
                  <SelectTrigger id="qc-level">
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
                <Label htmlFor="qc-basic">Current Basic Pay (₹)</Label>
                <Input
                  id="qc-basic"
                  type="number"
                  inputMode="numeric"
                  value={basic}
                  onChange={(e) => setBasic(Number(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="qc-city">City Category</Label>
                <Select value={city} onValueChange={(v) => setCity(v as City)}>
                  <SelectTrigger id="qc-city">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="X">X · Metro (HRA 30%)</SelectItem>
                    <SelectItem value="Y">Y · Tier-2 (HRA 20%)</SelectItem>
                    <SelectItem value="Z">Z · Other (HRA 10%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Fitment Factor</Label>
                <div className="flex flex-wrap gap-1.5">
                  {FITMENT_CHIPS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFit(f)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                        fit === f
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/10 text-background/80 hover:bg-background/15"
                      }`}
                    >
                      {f.toFixed(2)}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-background/15 bg-background/5 p-5 sm:p-6 xl:border-l xl:border-t-0">
            <div className="text-xs font-medium uppercase tracking-wider text-background/60">
              Projected gross salary
            </div>
            <div className="mt-1 text-4xl font-bold tracking-tight">
              {inr(result.projected.gross)}
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
              ▲ {inr(result.diff)} · {pct(result.pct)}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Row label="Revised Basic" value={inr(result.projected.basic)} />
              <Row label="Revised HRA" value={inr(result.projected.hra)} />
              <Row label="Revised TA" value={inr(result.projected.ta)} />
              <Row label="Current Gross" value={inr(result.current.gross)} muted />
            </dl>

            <Button asChild className="mt-6 w-full rounded-md">
              <Link to="/salary" search={{ level, basic, city, fit } as never}>
                Open full calculator
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
    </section>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-background/55">{label}</dt>
      <dd className={`font-semibold ${muted ? "text-background/60" : "text-background"}`}>
        {value}
      </dd>
    </div>
  );
}
