import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { SalaryBreakdown } from "@/lib/cpc";

export function GrowthBar({
  current,
  projected,
}: {
  current: SalaryBreakdown;
  projected: SalaryBreakdown;
}) {
  const data = [
    { name: "Basic", Current: current.basic, Projected: projected.basic },
    { name: "DA", Current: current.da, Projected: projected.da },
    { name: "HRA", Current: current.hra, Projected: projected.hra },
    { name: "TA", Current: current.ta, Projected: projected.ta },
    { name: "Gross", Current: current.gross, Projected: projected.gross },
  ];
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
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
            formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
          <Bar dataKey="Current" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Projected" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
