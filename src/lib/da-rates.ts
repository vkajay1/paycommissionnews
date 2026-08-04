// Dearness Allowance / Dearness Relief rate history under the 7th CPC.
// Source: Department of Expenditure (Ministry of Finance) office memoranda.
// Latest: DA @ 60% w.e.f. 01.01.2026 (OM dated 22-04-2026), a 2% rise over 58%.

export type DaRate = {
  /** Effective-from label, e.g. "Jan 2026" */
  label: string;
  /** ISO-ish sort key */
  key: string;
  pct: number;
};

export const DA_HISTORY: DaRate[] = [
  { label: "Jul 2016", key: "2016-07", pct: 2 },
  { label: "Jan 2017", key: "2017-01", pct: 4 },
  { label: "Jul 2017", key: "2017-07", pct: 5 },
  { label: "Jan 2018", key: "2018-01", pct: 7 },
  { label: "Jul 2018", key: "2018-07", pct: 9 },
  { label: "Jan 2019", key: "2019-01", pct: 12 },
  { label: "Jul 2019", key: "2019-07", pct: 17 },
  { label: "Jan 2020", key: "2020-01", pct: 21 },
  { label: "Jul 2021", key: "2021-07", pct: 28 },
  { label: "Oct 2021", key: "2021-10", pct: 31 },
  { label: "Jan 2022", key: "2022-01", pct: 34 },
  { label: "Jul 2022", key: "2022-07", pct: 38 },
  { label: "Jan 2023", key: "2023-01", pct: 42 },
  { label: "Jul 2023", key: "2023-07", pct: 46 },
  { label: "Jan 2024", key: "2024-01", pct: 50 },
  { label: "Jul 2024", key: "2024-07", pct: 53 },
  { label: "Jan 2025", key: "2025-01", pct: 55 },
  { label: "Jul 2025", key: "2025-07", pct: 58 },
  { label: "Jan 2026", key: "2026-01", pct: 60 },
];

/** DA/DR currently in force for central government employees and pensioners. */
export const CURRENT_DA = 60;
export const CURRENT_DA_FROM = "1 January 2026";

/** The instalment immediately before the current one. */
export const PREVIOUS_DA = 58;
export const PREVIOUS_DA_FROM = "1 July 2025";

/** DA freeze period (no instalments released). */
export const DA_FREEZE_NOTE =
  "DA instalments due from 1 January 2020, 1 July 2020 and 1 January 2021 were frozen because of COVID-19. The rate resumed at 28% from 1 July 2021.";

export function daPctFor(key: string): number {
  return DA_HISTORY.find((d) => d.key === key)?.pct ?? CURRENT_DA;
}

/** Newest-first list, convenient for year-wise <Select> inputs. */
export const DA_OPTIONS = [...DA_HISTORY].reverse();

/** Fitment factors used across the 6th, 7th and expected 8th CPC. */
export const FITMENT_HISTORY = [
  { cpc: "6th CPC (2006)", factor: 1.86, note: "Basic pay + grade pay derived from 1.86x of 5th CPC basic pay." },
  { cpc: "7th CPC (2016)", factor: 2.57, note: "Uniform multiple of 2.57 applied to 6th CPC pay (basic + grade pay)." },
  { cpc: "8th CPC (expected)", factor: 2.28, note: "Widely modelled range is 1.92x to 2.86x; 2.28x is the most cited mid estimate." },
];
