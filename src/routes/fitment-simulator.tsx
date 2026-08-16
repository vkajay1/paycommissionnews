import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sliders } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";
import { FITMENT_CHIPS } from "@/lib/pay-matrix";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/fitment-simulator")({
  head: () => ({
    meta: [
      { title: "8th CPC Fitment Factor Simulator — Compare 1.92x, 2.28x, 2.57x, 3.83x" },
      {
        name: "description",
        content:
          "Slide between fitment factors from 1.50x to 4.00x and see live salary impact under the 8th Pay Commission. Compare all popular fitment scenarios side by side.",
      },
      { name: "keywords", content: "fitment factor simulator, 8th pay commission fitment factor, fitment factor comparison, 2.28x 2.57x 3.83x salary" },
      { rel: "canonical", href: `${SITE}/fitment-simulator` },
      { property: "og:title", content: "8th CPC Fitment Factor Simulator" },
      { property: "og:description", content: "Live salary impact across fitment factors 1.5x to 4.0x." },
    ],
  }),
  component: Page,
});

function Page() {
  const [basic, setBasic] = useState(44900);
  const [fit, setFit] = useState(2.28);

  const projected = Math.round(basic * fit);
  const increase = projected - basic;
  const pct = ((increase / basic) * 100).toFixed(1);

  const data = useMemo(() => {
    const rows: { fit: string; salary: number }[] = [];
    for (let f = 1.5; f <= 4.0001; f += 0.1) {
      rows.push({ fit: f.toFixed(2), salary: Math.round(basic * f) });
    }
    return rows;
  }, [basic]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <Sliders className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitment Simulator</h1>
          <p className="text-sm text-muted-foreground">Slide 1.50x – 4.00x and see revised basic pay live.</p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-5 rounded-xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Current basic pay (₹)</Label>
            <Input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Fitment factor — {fit.toFixed(2)}x</Label>
            <Slider value={[fit]} min={1.5} max={4} step={0.01} onValueChange={(v) => setFit(v[0])} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {FITMENT_CHIPS.map((f) => (
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
          </div>
          <div className="grid gap-3 rounded-lg bg-secondary/50 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Revised basic</span>
              <span className="text-2xl font-bold text-primary">{inr(projected)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Increase</span>
              <span className="font-semibold text-success">{inr(increase)} ({pct}%)</span>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl p-6">
          <div className="mb-3 text-sm font-semibold">Revised basic across fitment factors</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="fit" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => inr(v)} labelFormatter={(l) => `${l}x`} />
                <Line type="monotone" dataKey="salary" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
