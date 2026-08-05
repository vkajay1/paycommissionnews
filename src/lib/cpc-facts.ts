// Verified reference facts about the 8th Central Pay Commission, the
// 7th CPC methodology it will most likely copy, and the deduction rates
// that decide monthly take-home pay.

export type Fact = { label: string; value: string; confirmed: boolean };

/** Snapshot of where the 8th CPC actually stands right now. */
export const CPC8_SNAPSHOT: Fact[] = [
  { label: "Present stage", value: "Stakeholder consultations under way", confirmed: true },
  { label: "Terms of Reference cleared", value: "28 October 2025 (Union Cabinet)", confirmed: true },
  { label: "Formally constituted", value: "3 November 2025 (Gazette notification)", confirmed: true },
  { label: "Chairperson", value: "Justice (Retd.) Ranjana Prakash Desai", confirmed: true },
  {
    label: "Other members",
    value: "Prof. Pulak Ghosh (IIM Bangalore) · Pankaj Jain, IAS — Member Secretary",
    confirmed: true,
  },
  { label: "Report deadline", value: "18 months from constitution — around mid-2027", confirmed: true },
  { label: "DA in force today", value: "60% from 1 January 2026, paid on 7th CPC pay", confirmed: true },
  {
    label: "Reference date for revision",
    value: "1 January 2026 — widely reported, not yet notified",
    confirmed: false,
  },
  {
    label: "Fitment factor",
    value: "Undecided. Figures under discussion run 1.82x to 2.86x",
    confirmed: false,
  },
];

export type TimelineItem = { when: string; title: string; body: string; expected?: boolean };

/** Only government actions that are on the record, plus clearly-flagged projections. */
export const CPC8_TIMELINE: TimelineItem[] = [
  {
    when: "16 January 2025",
    title: "Cabinet clears the idea",
    body: "The Union Cabinet agreed in principle to set up the 8th Central Pay Commission, ending months of speculation about whether a fresh commission would be appointed at all.",
  },
  {
    when: "28 October 2025",
    title: "Terms of Reference approved",
    body: "The Cabinet signed off the mandate. Pay is to be examined with 1 January 2026 as the reference date, and pensioners who retired on or before 31 December 2025 are inside the revision exercise.",
  },
  {
    when: "3 November 2025",
    title: "Commission notified in the Gazette",
    body: "Justice (Retd.) Ranjana Prakash Desai was named Chairperson, with one part-time member and a Member Secretary. The commission works out of Chanderlok Building, Janpath, New Delhi.",
  },
  {
    when: "1 January 2026",
    title: "DA moves to 60%",
    body: "Dearness Allowance rose two points to 60%. This instalment is still 7th CPC money — it has nothing to do with 8th CPC pay, though it does become the merge base if the reference date holds.",
  },
  {
    when: "June–July 2026",
    title: "Regional consultations and data collection",
    body: "The commission met staff federations in Delhi and Lucknow, closed the ministries' salary-data window at the end of June, and continued regional hearings in Bhubaneswar and Kolkata.",
  },
  {
    when: "Around May 2027",
    title: "Report submission",
    body: "Eighteen months from the Gazette date. Earlier commissions have taken 18 to 24 months from constitution to report, so this is a realistic rather than optimistic marker.",
    expected: true,
  },
  {
    when: "Late 2027",
    title: "Cabinet resolution, orders and arrears",
    body: "On past form the Cabinet accepts the report two to four months after submission, the Department of Expenditure issues the resolution and office memoranda, and revised pay lands in bank accounts with lump-sum arrears back to the reference date.",
    expected: true,
  },
];

export type FitmentScenario = {
  factor: number;
  hike: string;
  backer: string;
};

/** Who is asking for what, and what each multiplier means on the DA-merged base. */
export const FITMENT_SCENARIOS: FitmentScenario[] = [
  { factor: 1.82, hike: "~14% real hike", backer: "Finance Ministry's likely opening bid — it repeats the 7th CPC's 14.29% top-up over the DA merge" },
  { factor: 1.92, hike: "~20% real hike", backer: "The number quoted most often in the press; mildly conservative" },
  { factor: 2.08, hike: "~30% real hike", backer: "Confederation of Central Government Employees — their middle position" },
  { factor: 2.28, hike: "~42% real hike", backer: "National Council (JCM) staff-side submission" },
  { factor: 2.57, hike: "~61% real hike", backer: "The optimistic reading: repeat the 7th CPC's headline multiplier" },
  { factor: 2.86, hike: "~79% real hike", backer: "Maximum staff demand, argued from the Aykroyd need-based wage formula" },
];

export type CpcHistory = {
  cpc: string;
  effective: string;
  chair: string;
  change: string;
};

export const CPC_HISTORY: CpcHistory[] = [
  {
    cpc: "1st CPC",
    effective: "1 January 1946",
    chair: "Justice Srinivas Varadachariar",
    change: "Laid down the first pay scales, ₹55 at the bottom to ₹2,000 at the top, and introduced the living-wage principle for the lowest grade.",
  },
  {
    cpc: "2nd CPC",
    effective: "1 August 1959",
    chair: "Jaganath Das",
    change: "Lifted the minimum to ₹80 and settled the doctrine that the lowest grade must never fall below a minimum living wage.",
  },
  {
    cpc: "3rd CPC",
    effective: "1 January 1973",
    chair: "Raghubir Dayal",
    change: "Minimum pay ₹185. Brought in the need-based minimum wage idea and treated HRA and City Compensatory Allowance as separate heads.",
  },
  {
    cpc: "4th CPC",
    effective: "1 January 1986",
    chair: "P. N. Singhal",
    change: "Minimum pay ₹750. Collapsed a sprawl of scales into 36 running pay scales with annual increments.",
  },
  {
    cpc: "5th CPC",
    effective: "1 January 1996",
    chair: "Justice S. Ratnavel Pandian",
    change: "Minimum pay ₹2,550 and a roughly 30% jump. Its proposal to cut the government workforce by 30% was never acted on.",
  },
  {
    cpc: "6th CPC",
    effective: "1 January 2006",
    chair: "Justice B. N. Srikrishna",
    change: "Swapped 36 scales for four Pay Bands plus Grade Pay, with an effective fitment factor of 1.86, and floated a performance-linked incentive scheme.",
  },
  {
    cpc: "7th CPC",
    effective: "1 January 2016",
    chair: "Justice A. K. Mathur",
    change: "Replaced Pay Band and Grade Pay with the Pay Matrix of 19 levels by 40 cells, fixed the fitment factor at 2.57 and reset HRA to 24/16/8 per cent.",
  },
  {
    cpc: "8th CPC",
    effective: "1 January 2026 (target)",
    chair: "Justice (Retd.) Ranjana Prakash Desai",
    change: "Constituted 3 November 2025, report due around May 2027. Fitment factor still open; the range being argued over is 1.82x to 2.86x.",
  },
];

/** The DA merge multiplier for the 7th → 8th transition: 1 + 0.60. */
export const MERGE_MULTIPLIER = 1.6;

/** HRA staircase used since the 7th CPC, and expected to repeat. */
export const HRA_STAIRCASE = [
  { when: "New commission starts, DA back to 0%", x: 24, y: 16, z: 8 },
  { when: "Once fresh DA crosses 25%", x: 27, y: 18, z: 9 },
  { when: "Once fresh DA crosses 50%", x: 30, y: 20, z: 10 },
];

/** 7th CPC HRA floors, which are simply 30/20/10% of Level-1 Cell-1 basic. */
export const HRA_FLOORS_7CPC = { X: 5400, Y: 3600, Z: 1800 };

/** HRA floors scale with the fitment factor, because Level-1 basic does. */
export function hraFloor(city: "X" | "Y" | "Z", fitment = 1): number {
  return Math.round((HRA_FLOORS_7CPC[city] * fitment) / 100) * 100;
}

/** The 19 cities notified for the higher Transport Allowance slab. */
export const TPTA_CITIES = [
  "Delhi",
  "Greater Mumbai",
  "Kolkata",
  "Chennai",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Nagpur",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Ghaziabad",
  "Indore",
  "Patna",
  "Kochi",
  "Kozhikode",
  "Coimbatore",
];

/** Monthly CGHS subscription by pay level (7th CPC rates). */
export function cghsSubscription(level: number): number {
  if (level >= 12) return 1000;
  if (level >= 7) return 650;
  if (level === 6) return 450;
  return 250;
}

/** CGEGIS group insurance premium, unchanged since the 6th CPC. */
export function cgegisPremium(level: number): number {
  if (level >= 10) return 120; // Group A
  if (level >= 6) return 60; // Group B
  return 30; // Group C
}

export interface DeductionInput {
  level: number;
  basic: number;
  da: number;
  pension: "NPS" | "OPS";
  /** Scale CGHS by the DA merge when projecting 8th CPC figures. */
  revised?: boolean;
}

export interface Deductions {
  nps: number;
  cghs: number;
  cgegis: number;
  total: number;
  /** Government's 14% NPS share — not a deduction, it builds your corpus. */
  employerNps: number;
}

export function deductions(i: DeductionInput): Deductions {
  const nps = i.pension === "NPS" ? Math.round((i.basic + i.da) * 0.1) : 0;
  const employerNps = i.pension === "NPS" ? Math.round((i.basic + i.da) * 0.14) : 0;
  const cghs = i.revised
    ? Math.round((cghsSubscription(i.level) * MERGE_MULTIPLIER) / 10) * 10
    : cghsSubscription(i.level);
  const cgegis = cgegisPremium(i.level);
  return { nps, cghs, cgegis, total: nps + cghs + cgegis, employerNps };
}

export type SourceGroup = { area: string; items: string[] };

/** Order memoranda every figure on this site is traceable to. */
export const OFFICIAL_SOURCES: SourceGroup[] = [
  {
    area: "Pay matrix and fitment",
    items: [
      "CCS (Revised Pay) Rules 2016, notified 25 July 2016, carrying the 7th CPC pay matrix and the 2.57 fitment factor.",
      "Department of Expenditure OM No. 1-6/2016-IC dated 28 September 2017, which corrected the Level-13 index from 2.57 to 2.67 (Cell 1 moving from ₹1,18,500 to ₹1,23,100).",
      "PIB release of 16 January 2025 announcing Cabinet approval for the 8th CPC, and the Gazette notification of 3 November 2025 constituting it.",
    ],
  },
  {
    area: "Dearness Allowance",
    items: [
      "Department of Expenditure DA orders and circulars — current rate 60% with effect from 1 January 2026.",
      "DoE OM No. 1-1/2016-E.II(B) dated 2 August 2016, the precedent for resetting DA to zero on a new commission's pay.",
    ],
  },
  {
    area: "House Rent Allowance",
    items: [
      "DoE OM No. 2/4/2017-E.II(B) dated 7 July 2017 — HRA at 24/16/8 per cent with floors of ₹5,400 / ₹3,600 / ₹1,800 and automatic revision at the 25% and 50% DA marks.",
      "HRA has been at 30/20/10 per cent since DA crossed 50 per cent in 2024.",
    ],
  },
  {
    area: "Transport Allowance",
    items: [
      "DoE OM No. 21/5/2017-E.II(B) dated 7 July 2017 — ₹7,200 for Level 9 and above, ₹3,600 for Levels 3 to 8, ₹1,350 for Levels 1 and 2 below ₹24,200 basic, each plus current DA, in the 19 notified cities.",
      "The 19-city list carries forward from DoP&T OM No. 2(13)/2008-E.II(B) dated 29 August 2008.",
    ],
  },
  {
    area: "CGHS, CGEGIS and NPS",
    items: [
      "Ministry of Health OM No. Z.15025/13/2018/DIR/CGHS dated 9 January 2018 — subscriptions of ₹250, ₹450, ₹650 and ₹1,000 by level band.",
      "CGEGIS premium stays at ₹120, ₹60 and ₹30 for Groups A, B and C; the 7th CPC's proposed increase was deferred.",
      "Cabinet decision of 6 December 2018, effective 1 April 2019, raising the government's NPS Tier-I contribution from 10% to 14%, with the employee share unchanged at 10%.",
    ],
  },
];
