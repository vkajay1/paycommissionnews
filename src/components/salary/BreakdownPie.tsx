import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { SalaryBreakdown } from "@/lib/cpc";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

export function BreakdownPie({ data }: { data: SalaryBreakdown }) {
  const rows = [
    { name: "Basic", value: data.basic },
    { name: "DA", value: data.da },
    { name: "HRA", value: data.hra },
    { name: "TA", value: data.ta },
  ].filter((r) => r.value > 0);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={rows}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={2}
            stroke="var(--color-background)"
            strokeWidth={2}
          >
            {rows.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              fontSize: 12,
            }}
            formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11, color: "var(--color-muted-foreground)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
