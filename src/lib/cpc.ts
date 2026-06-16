import { transportAllowance } from "./pay-matrix";

export type City = "X" | "Y" | "Z";

// HRA rates per city category (current 7th CPC, when DA crosses 50%)
export const HRA_RATES: Record<City, number> = { X: 30, Y: 20, Z: 10 };
// Sample post-revision HRA rates (illustrative — rebased after fitment)
export const HRA_RATES_REVISED: Record<City, number> = { X: 24, Y: 16, Z: 8 };

export interface SalaryInputs {
  level: number;
  basicPay: number;
  city: City;
  daPct: number;
  hraPct?: number; // optional override
  fitmentFactor: number;
}

export interface SalaryBreakdown {
  basic: number;
  da: number;
  hra: number;
  ta: number;
  gross: number;
}

export function currentSalary(i: SalaryInputs): SalaryBreakdown {
  const basic = i.basicPay;
  const da = (basic * i.daPct) / 100;
  const hraRate = i.hraPct ?? HRA_RATES[i.city];
  const hra = (basic * hraRate) / 100;
  const ta = transportAllowance(i.level);
  return { basic, da, hra, ta, gross: basic + da + hra + ta };
}

export function projectedSalary(i: SalaryInputs): SalaryBreakdown {
  const basic = Math.round(i.basicPay * i.fitmentFactor);
  const da = 0; // rebased after pay revision
  const hra = (basic * HRA_RATES_REVISED[i.city]) / 100;
  const ta = Math.round(transportAllowance(i.level) * 1.25);
  return { basic, da, hra, ta, gross: basic + da + hra + ta };
}

export function compareSalary(i: SalaryInputs) {
  const c = currentSalary(i);
  const p = projectedSalary(i);
  const diff = p.gross - c.gross;
  const pct = c.gross > 0 ? (diff / c.gross) * 100 : 0;
  return { current: c, projected: p, diff, pct };
}
