// Data for SEO landing pages: pay levels, government roles, state calculators.
// Figures are indicative — used to power keyword-rich landing pages that link
// back to the main /salary calculator.

import { PAY_LEVELS } from "./pay-matrix";

export type RolePage = {
  slug: string;
  name: string;
  keyword: string;
  level: number;
  basic: number;
  city: "X" | "Y" | "Z";
  department: string;
  description: string;
  duties: string[];
  perks: string[];
  promotion: string;
};

export const ROLE_PAGES: RolePage[] = [
  {
    slug: "loco-pilot",
    name: "Loco Pilot",
    keyword: "loco pilot salary",
    level: 6,
    basic: 35400,
    city: "Y",
    department: "Indian Railways",
    description:
      "Assistant Loco Pilots (ALP) start in Level 2 of the 7th CPC pay matrix and progress to Loco Pilot (Goods, Passenger, Mail/Express) at Level 4–6. Under the 8th Pay Commission, a Loco Pilot's basic pay is projected to rise from ₹35,400 to around ₹1,01,000 at a 2.86x fitment factor.",
    duties: [
      "Operate goods, passenger and mail/express trains safely across zones",
      "Follow signals, speed limits, and route protocols end-to-end",
      "Perform pre-departure locomotive inspections and log book entries",
    ],
    perks: [
      "Running allowance based on kilometres driven",
      "Night duty allowance and Sunday working allowance",
      "Railway quarters or HRA, medical (RELHS) and pass facility",
    ],
    promotion: "ALP → Sr. ALP → Loco Pilot Goods → LP Passenger → LP Mail/Express → Loco Inspector.",
  },
  {
    slug: "station-master",
    name: "Station Master",
    keyword: "station master salary",
    level: 6,
    basic: 35400,
    city: "Y",
    department: "Indian Railways",
    description:
      "Station Masters are recruited in Level 6 of the 7th CPC pay matrix with a basic pay of ₹35,400. Under the 8th CPC, at a 2.86x fitment factor, this is expected to rise to about ₹1,01,000 basic — plus DA, HRA and TA.",
    duties: [
      "Control train movement, signals and platform operations at the station",
      "Issue tickets, coordinate with control office and manage staff",
      "Handle safety, punctuality and passenger amenities at the station",
    ],
    perks: [
      "Non-Practising Allowance, Night Duty Allowance, Split-shift allowance",
      "HRA (X/Y/Z), TA and railway pass facility",
      "Free medical treatment under RELHS",
    ],
    promotion: "Station Master → Sr. Station Master → Chief Station Master → Station Superintendent.",
  },
  {
    slug: "constable",
    name: "Police Constable",
    keyword: "constable salary 8th pay commission",
    level: 3,
    basic: 21700,
    city: "Z",
    department: "CAPF / State Police",
    description:
      "Constables in CAPF (BSF, CRPF, CISF, SSB, ITBP) and most state police forces are placed in Level 3 of the 7th CPC pay matrix. Under the 8th CPC, basic pay is projected to rise from ₹21,700 to about ₹62,000 at 2.86x, with special allowances on top.",
    duties: [
      "Maintain law and order, border/coastal security or internal security",
      "Perform sentry, patrolling, escort and anti-insurgency duties",
      "Support investigation, VIP protection and disaster response",
    ],
    perks: [
      "Ration allowance, uniform allowance, risk & hardship allowance",
      "Free rations in field areas, CGHS/CAPF medical cover",
      "One additional increment for CAPF personnel on completion of training",
    ],
    promotion: "Constable → Head Constable → ASI → SI → Inspector.",
  },
  {
    slug: "defence-jawan",
    name: "Defence Jawan (Sepoy)",
    keyword: "army salary 8th pay commission",
    level: 3,
    basic: 21700,
    city: "Z",
    department: "Indian Army / Navy / Air Force",
    description:
      "A Sepoy (equivalent) starts at Level 3 basic pay of ₹21,700 plus Military Service Pay (MSP) of ₹5,200. Under the 8th CPC at a 2.86x fitment, basic could rise to about ₹62,000 with MSP proportionately revised — before field, HRA, siachen and CILQ allowances.",
    duties: [
      "Frontline combat, patrolling, area defence and unit-level tasks",
      "Training, weapon handling, drill and operational readiness",
      "Participation in aid to civil authority and disaster relief",
    ],
    perks: [
      "Military Service Pay (MSP) added to basic pay",
      "High Altitude, Siachen, Field Area, Counter-Insurgency allowances",
      "Free rations, CSD canteen, ECHS medical and defence quarters",
    ],
    promotion: "Sepoy → Lance Naik → Naik → Havildar → Naib Subedar → Subedar → Subedar Major.",
  },
  {
    slug: "teacher-pgt",
    name: "PGT Teacher (KVS / NVS)",
    keyword: "pgt teacher salary 8th pay commission",
    level: 8,
    basic: 47600,
    city: "Y",
    department: "KVS / NVS / DoE",
    description:
      "Post-Graduate Teachers (PGT) in Kendriya Vidyalaya, Navodaya and central schools are placed in Level 8 of the pay matrix at a basic pay of ₹47,600. Under the 8th CPC, this could rise to about ₹1,36,000 at a 2.86x fitment factor.",
    duties: [
      "Teach classes IX–XII in a subject specialisation",
      "Set question papers, evaluate answer scripts and mentor students",
      "Participate in co-curricular, house and hostel activities",
    ],
    perks: [
      "Transport allowance, HRA (X/Y/Z) and children education allowance",
      "Hostel subsidy and LTC after completing service conditions",
      "CGHS medical, NPS/UPS pension, gazetted holidays and vacation",
    ],
    promotion: "PGT → Vice Principal → Principal → Deputy Commissioner.",
  },
  {
    slug: "bank-po",
    name: "Bank PO (PSU Bank)",
    keyword: "bank po salary 8th pay commission",
    level: 10,
    basic: 56100,
    city: "X",
    department: "Public Sector Bank",
    description:
      "A Scale-I Officer / Probationary Officer in a PSU bank starts at a basic pay comparable to Level 10 of the 7th CPC (₹56,100+). While PSU banks follow bipartite settlements, most employees benchmark to CPC scales for revision expectations — a 2.86x fitment would take basic to about ₹1,60,000.",
    duties: [
      "Handle branch operations, credit appraisal and customer service",
      "Cross-sell retail products and manage KYC/AML compliance",
      "Rotate through general banking, forex, credit and treasury desks",
    ],
    perks: [
      "DA (bipartite formula), HRA, CCA, special allowance",
      "Leased accommodation, medical, LFC, education loan concessions",
      "Superannuation via NPS + provident fund",
    ],
    promotion: "Scale I → II → III → IV → V → VI → VII (GM).",
  },
  {
    slug: "aso-odisha",
    name: "ASO (Assistant Section Officer, Odisha)",
    keyword: "aso salary in odisha 8th pay commission",
    level: 7,
    basic: 44900,
    city: "Y",
    department: "Government of Odisha — Secretariat / OSSC",
    description:
      "Assistant Section Officers (ASO) in the Odisha Secretariat are placed in Level 7 of the ORSP pay matrix with an entry basic pay of ₹44,900 (equivalent to the 7th CPC Level 7 cell). Odisha traditionally adopts Central Pay Commission recommendations with a lag, so when the 8th Pay Commission is notified an ASO basic pay of ₹44,900 is projected to rise to roughly ₹1,02,400 at a 2.28x fitment factor and about ₹1,28,400 at 2.86x — before DA, HRA and other allowances.",
    duties: [
      "Process files, notes and drafts in Odisha Secretariat departments",
      "Maintain records, service books and RTI/assembly question replies",
      "Assist Section Officers in scheme monitoring and budget compilation",
    ],
    perks: [
      "Dearness Allowance as per Odisha Finance Department orders",
      "HRA on Bhubaneswar/Cuttack (Y-class) rates, transport allowance",
      "NPS, GPF (pre-2005 entrants), medical and leave encashment benefits",
    ],
    promotion: "ASO → Section Officer → Under Secretary → Deputy Secretary.",
  },
  {
    slug: "peo-odisha",
    name: "PEO (Panchayat Executive Officer, Odisha)",
    keyword: "peo salary in odisha 8th pay commission",
    level: 3,
    basic: 21700,
    city: "Z",
    department: "Panchayati Raj Department, Odisha",
    description:
      "Panchayat Executive Officers (PEO) in Odisha are recruited in Level 3 of the ORSP matrix with an entry basic pay of ₹21,700 (as per OSSSC recruitment notifications). Under the 8th Pay Commission pattern, a PEO's basic pay is projected at about ₹49,500 with a 2.28x fitment factor and around ₹62,100 at 2.86x, with DA and rural (Z-class) HRA added on top.",
    duties: [
      "Execute Gram Panchayat schemes, MGNREGA works and welfare payments",
      "Maintain panchayat accounts, muster rolls and beneficiary registers",
      "Coordinate with BDO office on rural housing and pension schemes",
    ],
    perks: [
      "Dearness Allowance and Z-class HRA for rural postings",
      "Travel/transport allowance for field duty",
      "NPS, medical reimbursement and earned leave benefits",
    ],
    promotion: "PEO → Additional BDO → Block Development Officer.",
  },
  {
    slug: "assistant-loco-pilot",
    name: "Assistant Loco Pilot (ALP)",
    keyword: "alp salary after 8th pay",
    level: 2,
    basic: 19900,
    city: "Y",
    department: "Indian Railways",
    description:
      "Assistant Loco Pilots are recruited through RRB in Level 2 of the 7th CPC pay matrix with an entry basic pay of ₹19,900, plus running allowance which is a large part of an ALP's earnings. Under the 8th Pay Commission an ALP's basic pay is projected at roughly ₹45,400 at a 2.28x fitment factor and about ₹56,900 at 2.86x, with running allowance and DA on top.",
    duties: [
      "Assist the Loco Pilot in operating goods and coaching trains",
      "Monitor signals, brake power tests and locomotive gauges en route",
      "Carry out shunting duties and pre-departure loco inspections",
    ],
    perks: [
      "Running (kilometreage) allowance, treated as pay for several purposes",
      "Night duty allowance, breach-of-rest and outstation allowance",
      "Railway quarters or HRA, RELHS medical cover and pass facility",
    ],
    promotion: "ALP → Sr. ALP → Loco Pilot Goods → LP Passenger → LP Mail/Express.",
  },
  {
    slug: "upsssc-junior-assistant",
    name: "Junior Assistant (UPSSSC)",
    keyword: "upsssc junior assistant salary after 8th pay commission",
    level: 2,
    basic: 19900,
    city: "Y",
    department: "Government of Uttar Pradesh — UPSSSC",
    description:
      "UPSSSC Junior Assistants are appointed in Level 2 of the UP Revised Pay Rules matrix at an entry basic pay of ₹19,900. Because Uttar Pradesh mirrors the central pay matrix, an 8th CPC fitment of 2.28x projects a revised basic of about ₹45,400 and 2.86x about ₹56,900, before DA, HRA and other allowances.",
    duties: [
      "Handle dak, file movement and computer typing work in state offices",
      "Maintain registers, service records and departmental correspondence",
      "Assist in preparing replies to RTI and assembly questions",
    ],
    perks: [
      "Dearness Allowance at the central rate as sanctioned by UP",
      "HRA by city class and transport allowance",
      "NPS, medical reimbursement and earned leave benefits",
    ],
    promotion: "Junior Assistant → Senior Assistant → Head Clerk → Office Superintendent.",
  },
  {
    slug: "talathi",
    name: "Talathi (Maharashtra)",
    keyword: "talathi salary after 8th pay maharashtra",
    level: 4,
    basic: 25500,
    city: "Y",
    department: "Revenue Department, Maharashtra",
    description:
      "Talathis are village revenue officers in Maharashtra placed in Level 4 (S-8 equivalent) of the state pay matrix with an entry basic pay of ₹25,500. Under the 8th Pay Commission pattern, a Talathi's basic pay projects to about ₹58,100 at a 2.28x fitment factor and roughly ₹72,900 at 2.86x, plus DA and HRA.",
    duties: [
      "Maintain 7/12 extracts, mutation entries and village land records",
      "Collect land revenue and issue income, residence and caste certificates",
      "Report crop position, natural calamity damage and survey work",
    ],
    perks: [
      "Dearness Allowance at the central rate adopted by Maharashtra",
      "HRA by city class, local travel allowance for village circuits",
      "NPS, medical reimbursement and leave encashment benefits",
    ],
    promotion: "Talathi → Circle Officer → Awal Karkun → Naib Tahsildar → Tahsildar.",
  },
  {
    slug: "dda-mts",
    name: "MTS (DDA / Central Offices)",
    keyword: "dda mts salary 8th pay commission",
    level: 1,
    basic: 18000,
    city: "X",
    department: "Delhi Development Authority / Central Government",
    description:
      "Multi-Tasking Staff in DDA and other central offices are in Level 1 of the pay matrix at an entry basic pay of ₹18,000. Under the 8th CPC, this minimum pay is the most-watched cell in the matrix: 2.28x gives about ₹41,000 and 2.86x about ₹51,500, with X-class HRA for Delhi postings added on top.",
    duties: [
      "Handle dak, photocopying, record keeping and office upkeep",
      "Assist in file movement, dispatch and routine clerical support",
      "Carry out watch and ward or field errands as assigned",
    ],
    perks: [
      "X-class HRA for Delhi (27% of basic at current rates) and transport allowance",
      "CGHS medical cover and CGEGIS insurance",
      "NPS/UPS pension, LTC and 30 days earned leave a year",
    ],
    promotion: "MTS → LDC → UDC → Assistant Section Officer (through departmental exam).",
  },
  {
    slug: "sub-inspector",
    name: "Sub-Inspector (Police / CAPF)",
    keyword: "si salary 8th pay commission",
    level: 6,
    basic: 35400,
    city: "Y",
    department: "State Police / CAPF / Delhi Police",
    description:
      "Sub-Inspectors in state police forces, Delhi Police and CAPF are placed in Level 6 of the pay matrix with an entry basic pay of ₹35,400. Under the 8th Pay Commission, an SI's basic pay is projected at about ₹80,700 at a 2.28x fitment factor and roughly ₹1,01,200 at 2.86x, before DA, HRA and risk allowances.",
    duties: [
      "Register FIRs, lead investigations and file charge sheets",
      "Command a police station beat or a CAPF section on operational duty",
      "Handle law and order bandobast, court work and prisoner escort",
    ],
    perks: [
      "Risk and hardship allowance, uniform allowance, ration money",
      "HRA by city class or departmental quarters, transport allowance",
      "One additional increment for CAPF personnel on completing training",
    ],
    promotion: "SI → Inspector → Deputy SP / Assistant Commandant → Additional SP.",
  },
];

export function getRolePage(slug: string): RolePage | undefined {
  return ROLE_PAGES.find((r) => r.slug === slug);
}

// ---------------- STATE PAGES ----------------
// All 28 states + 8 union territories live in ./states

export type { StatePage } from "./states";
export { STATE_PAGES, getStatePage } from "./states";


// ---------------- PAY LEVEL PAGES ----------------
// Use PAY_LEVELS as the source of truth; derive projections at render time.

export function levelProjection(basic: number, fit: number) {
  return Math.round(basic * fit);
}

export const LEVEL_FITMENTS = [2.28, 2.57, 2.86, 3.0];

export function getLevel(level: number) {
  return PAY_LEVELS.find((l) => l.level === level);
}
