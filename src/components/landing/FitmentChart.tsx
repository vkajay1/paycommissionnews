import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FITMENT_CHIPS } from "@/lib/pay-matrix";

export function FitmentChart({ basic = 44900 }: { basic?: number }) {
  const data = useMemo(
    () =>
      FITMENT_CHIPS.map((f) => ({
        label: f.toFixed(2) + "x",
        value: Math.round(basic * f),
      })),
    [basic],
  );

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              fontSize: 12,
            }}
            formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Basic"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            fill="url(#fitGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
