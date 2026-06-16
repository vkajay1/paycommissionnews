// SAMPLE 7th CPC pay matrix — entry-cell basic pay per level.
// Representative values for illustrative calculations only.
export const SAMPLE_DATA = true;

export type Level = {
  level: number;
  entryPay: number;
  grade: string;
};

export const PAY_LEVELS: Level[] = [
  { level: 1, entryPay: 18000, grade: "MTS / Group D" },
  { level: 2, entryPay: 19900, grade: "LDC" },
  { level: 3, entryPay: 21700, grade: "Constable" },
  { level: 4, entryPay: 25500, grade: "Stenographer" },
  { level: 5, entryPay: 29200, grade: "UDC" },
  { level: 6, entryPay: 35400, grade: "Inspector / Asst." },
  { level: 7, entryPay: 44900, grade: "Sr. Inspector" },
  { level: 8, entryPay: 47600, grade: "Section Officer" },
  { level: 9, entryPay: 53100, grade: "Asst. Audit Officer" },
  { level: 10, entryPay: 56100, grade: "Group A Entry" },
  { level: 11, entryPay: 67700, grade: "Under Secretary" },
  { level: 12, entryPay: 78800, grade: "Sr. Time Scale" },
  { level: 13, entryPay: 123100, grade: "Director" },
  { level: 14, entryPay: 144200, grade: "Joint Secretary" },
  { level: 15, entryPay: 182200, grade: "Addl. Secretary" },
  { level: 16, entryPay: 205400, grade: "Special Secretary" },
  { level: 17, entryPay: 225000, grade: "Secretary" },
  { level: 18, entryPay: 250000, grade: "Cabinet Secretary" },
];

// Sample TA (Transport Allowance) slabs (₹/month, pre-DA)
export function transportAllowance(level: number): number {
  if (level >= 14) return 7200;
  if (level >= 9) return 3600;
  if (level >= 3) return 1350;
  return 900;
}

export const FITMENT_CHIPS = [1.92, 2.0, 2.15, 2.28, 2.57, 3.83];
