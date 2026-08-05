import { Card } from "@/components/ui/card";
import { inr } from "@/lib/format";
import type { SalaryBreakdown } from "@/lib/cpc";
import { deductions } from "@/lib/cpc-facts";

export function NetInHand({
  level,
  pension,
  current,
  projected,
}: {
  level: number;
  pension: "NPS" | "OPS";
  current: SalaryBreakdown;
  projected: SalaryBreakdown;
}) {
  const dc = deductions({ level, basic: current.basic, da: current.da, pension });
  const dp = deductions({
    level,
    basic: projected.basic,
    da: projected.da,
    pension,
    revised: true,
  });
  const netC = current.gross - dc.total;
  const netP = projected.gross - dp.total;

  const rows: { label: string; a: number; b: number; negative?: boolean }[] = [
    { label: "Basic pay", a: current.basic, b: projected.basic },
    { label: "Dearness allowance", a: current.da, b: projected.da },
    { label: "House rent allowance", a: current.hra, b: projected.hra },
    { label: "Transport allowance", a: current.ta, b: projected.ta },
    { label: "Gross earnings", a: current.gross, b: projected.gross },
    { label: "NPS Tier-I (10%)", a: dc.nps, b: dp.nps, negative: true },
    { label: "CGHS subscription", a: dc.cghs, b: dp.cghs, negative: true },
    { label: "CGEGIS premium", a: dc.cgegis, b: dp.cgegis, negative: true },
    { label: "Total deductions", a: dc.total, b: dp.total, negative: true },
  ];

  return (
    <Card className="rounded-3xl border-border/80 p-5 shadow-card">
      <div className="mb-1 text-sm font-semibold">Monthly take-home, side by side</div>
      <p className="mb-4 text-xs text-muted-foreground">
        Gross pay is only half the story. NPS at 10 per cent of basic plus DA, the CGHS
        subscription for your level and the flat CGEGIS premium come off before the salary
        reaches your account. Income tax and any union subscription sit on top of these.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead className="text-left">
            <tr className="border-b border-border">
              <th className="py-2 font-medium text-muted-foreground">Component</th>
              <th className="py-2 text-right font-medium text-muted-foreground">Now</th>
              <th className="py-2 text-right font-medium text-muted-foreground">Projected</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border/50">
                <td className="py-2 text-muted-foreground">{r.label}</td>
                <td
                  className={`py-2 text-right font-semibold ${r.negative ? "text-destructive" : ""}`}
                >
                  {r.negative && r.a > 0 ? "−" : ""}
                  {inr(r.a)}
                </td>
                <td
                  className={`py-2 text-right font-semibold ${r.negative ? "text-destructive" : ""}`}
                >
                  {r.negative && r.b > 0 ? "−" : ""}
                  {inr(r.b)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="pt-3 font-semibold">Net in-hand (monthly)</td>
              <td className="pt-3 text-right font-bold">{inr(netC)}</td>
              <td className="pt-3 text-right text-lg font-bold text-primary">{inr(netP)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {pension === "NPS" && (
        <p className="mt-4 rounded-2xl bg-secondary/50 p-3 text-xs text-muted-foreground">
          Worth knowing: the government adds another {inr(dp.employerNps)} a month at 14 per cent
          of your projected basic plus DA. It never appears in your salary slip, but it builds
          your pension corpus. Annual projected in-hand works out to roughly {inr(netP * 12)}.
        </p>
      )}
    </Card>
  );
}
