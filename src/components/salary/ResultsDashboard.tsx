import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { SalaryBreakdown } from "@/lib/cpc";
import { inr, pct } from "@/lib/format";
import { BreakdownPie } from "./BreakdownPie";
import { GrowthBar } from "./GrowthBar";
import { MonthlyLine } from "./MonthlyLine";

export function ResultsDashboard({
  current,
  projected,
  diff,
  pctChange,
}: {
  current: SalaryBreakdown;
  projected: SalaryBreakdown;
  diff: number;
  pctChange: number;
}) {
  const up = diff >= 0;
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Current Gross" value={inr(current.gross)} tone="muted" />
        <StatCard label="Projected Gross" value={inr(projected.gross)} tone="primary" highlight />
        <StatCard
          label={up ? "Monthly increase" : "Monthly change"}
          value={inr(Math.abs(diff))}
          sub={`${up ? "▲" : "▼"} ${pct(Math.abs(pctChange))}`}
          tone={up ? "success" : "danger"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SalaryCard title="Current salary" data={current} />
        <SalaryCard title="Projected salary" data={projected} accent />
      </div>

      <Card className="rounded-3xl border-border/80 p-5 shadow-card">
        <Tabs defaultValue="breakdown">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Visualisation</div>
              <div className="text-xs text-muted-foreground">
                Toggle between breakdown, growth and 12-month outlook.
              </div>
            </div>
            <TabsList>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="breakdown">
            <BreakdownPie data={projected} />
          </TabsContent>
          <TabsContent value="growth">
            <GrowthBar current={current} projected={projected} />
          </TabsContent>
          <TabsContent value="monthly">
            <MonthlyLine currentGross={current.gross} projectedGross={projected.gross} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  tone,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  tone: "muted" | "primary" | "success" | "danger";
  highlight?: boolean;
}) {
  const toneClass = {
    muted: "text-foreground",
    primary: "text-primary",
    success: "text-success",
    danger: "text-destructive",
  }[tone];
  return (
    <Card
      className={`rounded-3xl border-border/80 p-5 shadow-card ${
        highlight ? "bg-gradient-to-br from-primary/5 to-accent/5" : ""
      }`}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className={`mt-1 text-2xl font-bold tracking-tight ${toneClass}`}>{value}</div>
      {sub && (
        <div
          className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${toneClass}`}
        >
          {tone === "success" ? (
            <TrendingUp className="h-3 w-3" />
          ) : tone === "danger" ? (
            <TrendingDown className="h-3 w-3" />
          ) : null}
          {sub}
        </div>
      )}
    </Card>
  );
}

function SalaryCard({
  title,
  data,
  accent,
}: {
  title: string;
  data: SalaryBreakdown;
  accent?: boolean;
}) {
  return (
    <Card
      className={`rounded-3xl border-border/80 p-5 shadow-card ${
        accent ? "border-primary/30 bg-primary/[0.03]" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        {accent && (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
            8th CPC
          </span>
        )}
      </div>
      <dl className="space-y-2.5 text-sm">
        <Row label="Basic" value={inr(data.basic)} />
        <Row label="Dearness Allowance" value={inr(data.da)} />
        <Row label="House Rent Allowance" value={inr(data.hra)} />
        <Row label="Transport Allowance" value={inr(data.ta)} />
        <div className="my-2 h-px bg-border" />
        <Row label="Gross Salary" value={inr(data.gross)} bold />
      </dl>
    </Card>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={bold ? "text-base font-bold" : "font-semibold"}>{value}</dd>
    </div>
  );
}
