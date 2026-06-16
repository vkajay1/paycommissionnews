import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export function MonthlyLine({
  currentGross,
  projectedGross,
}: {
  currentGross: number;
  projectedGross: number;
}) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = months.map((m, i) => ({
    m,
    Current: Math.round(currentGross * (1 + 0.004 * i)),
    Projected: Math.round(projectedGross * (1 + 0.003 * i)),
  }));
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="m"
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
          <Line
            type="monotone"
            dataKey="Current"
            stroke="var(--color-chart-3)"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Projected"
            stroke="var(--color-chart-1)"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
