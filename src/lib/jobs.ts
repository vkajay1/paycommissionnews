// Latest government job postings. Add a new entry to the TOP of `jobs`
// whenever a fresh recruitment notification is published.
import type { Block } from "./articles";

export type Job = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  /** Recruiting body, e.g. "Staff Selection Commission (SSC)". */
  organization: string;
  /** Post / cadre name, e.g. "Multi Tasking Staff (MTS)". */
  postName: string;
  vacancies?: string;
  qualification?: string;
  ageLimit?: string;
  payScale?: string;
  location?: string;
  applicationFee?: string;
  /** ISO dates */
  applyStart?: string;
  applyEnd?: string;
  /** Official notification / apply link. */
  applyUrl?: string;
  /** Recruiter website used for hiringOrganization.sameAs in JobPosting schema. */
  organizationUrl?: string;
  /** Self-hosted logo/emblem of the recruiter (absolute or root-relative). */
  organizationLogo?: string;
  /** Structured monthly pay for JobPosting baseSalary. */
  salaryMin?: number;
  salaryMax?: number;
  /** Defaults to "MONTH". */
  salaryUnit?: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  salaryCurrency?: string;
  /** e.g. "FULL_TIME" (default) or "CONTRACTOR". */
  employmentType?: string | string[];
  /** Government job code / notice number, used as JobPosting identifier. */
  noticeNumber?: string;
  industry?: string;
  occupationalCategory?: string;
  experienceRequirements?: string;
  educationRequirements?: string;
  jobBenefits?: string;
  /** Numeric vacancy count for schema (`vacancies` stays human-readable). */
  numberOfPositions?: number;
  /** Where applicants must be located, e.g. "India". */
  applicantLocationRequirements?: string;
  /** ISO date the selected candidate is expected to join. */
  jobStartDate?: string;
  /** True when candidates apply directly on the linked official portal. */
  directApply?: boolean;
  downloads?: { label: string; href: string; note?: string }[];
  category: string;
  date: string; // ISO published
  updated: string; // ISO updated
  readMinutes: number;
  hero: string; // gradient classes
  image?: string;
  imageAlt?: string;
  /** 1200x630 social share image; falls back to `image`. */
  ogImage?: string;
  lang?: "en" | "hi";

  excerpt: string;
  body: Block[];
  faq: { q: string; a: string }[];
};

export const jobs: Job[] = [
  {
    slug: "rrb-junior-engineer-recruitment-2026-cen-04-2026",
    title:
      "RRB Junior Engineer Recruitment 2026 (CEN 04/2026): 4029 JE & DMS Vacancies, Apply Online Till 13 September",
    description:
      "RRB JE Recruitment 2026 (CEN 04/2026) for 4029 Junior Engineer and Depot Material Superintendent posts — eligibility, Level 6 pay matrix salary, RRB-wise vacancy, fee, important dates and notification PDF download.",
    keyword:
      "rrb je recruitment 2026, rrb junior engineer vacancy 2026, cen 04/2026, rrb je salary level 6, railway junior engineer notification pdf",
    organization: "Railway Recruitment Boards (RRBs), Ministry of Railways",
    postName: "Junior Engineer (JE) & Depot Material Superintendent (DMS)",
    vacancies: "4029 posts (increased from the original notification)",
    qualification:
      "Three-year Engineering Diploma or Degree in the relevant stream (Civil / Mechanical / Electrical / Electronics / IT etc.) from a recognised University or Institute; B.Sc. Engineering accepted for some Civil posts",
    ageLimit: "18 to 33 years as on 01/01/2027 (relaxation as per railway rules)",
    payScale: "Pay Matrix Level 6 — basic pay Rs. 35,400 per month (7th CPC)",
    location: "All India (21 Railway Recruitment Boards)",
    applicationFee:
      "Rs. 500 for General / OBC / EWS (Rs. 400 refunded after Stage I) and Rs. 250 for SC / ST / PwBD and all women candidates (fully refunded after Stage I)",
    applyStart: "2026-08-14",
    applyEnd: "2026-09-13",
    applyUrl: "https://www.rrbapply.gov.in/",
    organizationUrl: "https://indianrailways.gov.in/",
    salaryMin: 35400,
    salaryMax: 112400,
    salaryUnit: "MONTH",
    salaryCurrency: "INR",
    employmentType: "FULL_TIME",
    noticeNumber: "CEN 04/2026",
    industry: "Indian Railways / Government Engineering Services",
    occupationalCategory: "17-2199.00 Engineers, All Other",
    experienceRequirements: "No prior work experience required — fresher diploma and degree engineers are eligible",
    educationRequirements:
      "Three-year Engineering Diploma or Bachelor's Degree in the relevant engineering stream from a recognised University or Institute",
    jobBenefits:
      "Dearness Allowance, House Rent Allowance, Transport Allowance, Night Duty Allowance, railway pass facility, NPS pension, medical cover under RELHS and 8th Pay Commission revision benefit",
    numberOfPositions: 4029,
    applicantLocationRequirements: "India",
    jobStartDate: "2027-04-01",
    directApply: false,

    downloads: [
      {
        label: "Full Notification PDF (CEN 04/2026)",
        href: "/downloads/rrb-je-cen-04-2026/rrb-je-cen-04-2026-notification.pdf",
        note: "77 pages — complete advertisement, rules and annexures",
      },
      {
        label: "Detailed Syllabus PDF (CBT Stage I & Stage II)",
        href: "/downloads/rrb-je-cen-04-2026/rrb-je-cen-04-2026-syllabus.pdf",
      },
      {
        label: "Zone / RRB-wise Vacancy PDF",
        href: "/downloads/rrb-je-cen-04-2026/rrb-je-cen-04-2026-zone-wise-vacancy.pdf",
      },
      {
        label: "Post-wise Eligibility & Pay Level PDF (Annexure A)",
        href: "/downloads/rrb-je-cen-04-2026/rrb-je-cen-04-2026-post-wise-eligibility.pdf",
      },
      {
        label: "Vacancy Increase Notice PDF",
        href: "/downloads/rrb-je-cen-04-2026/rrb-je-cen-04-2026-vacancy-increase-notice.pdf",
      },
    ],
    category: "Railway Jobs",
    date: "2026-08-20",
    updated: "2026-08-20",
    readMinutes: 8,
    hero: "from-blue-600/30 to-cyan-500/20",
    image: "https://paycommissionnews.co.in/images/rrb-je-cen-04-2026.jpg",
    imageAlt:
      "RRB Junior Engineer Recruitment 2026 CEN 04/2026 — 4029 vacancies in Pay Matrix Level 6",
    ogImage: "https://paycommissionnews.co.in/images/og/rrb-je-cen-04-2026-og.jpg",
    lang: "en",

    excerpt:
      "Indian Railways has opened online applications for 4029 Junior Engineer and Depot Material Superintendent posts under CEN 04/2026. Applications close on 13 September 2026, the post carries Pay Matrix Level 6 (Rs. 35,400 basic), and every official PDF is available for download below.",
    body: [
      {
        type: "p",
        text: "The Railway Recruitment Boards (RRBs) under the Ministry of Railways have invited online applications for Junior Engineer (JE) and Depot Material Superintendent (DMS) posts through Centralised Employment Notice CEN 04/2026. The vacancy count has been revised upward to 4029 posts across 21 RRBs, making this one of the largest technical recruitment drives in the railways this year.",
      },
      {
        type: "p",
        text: "Diploma and degree engineers can register from 14 August 2026 to 13 September 2026, with the fee payment window open till 15 September 2026 and a correction window from 16 to 25 September 2026. The post is placed in Pay Matrix Level 6 of the 7th CPC, which means an entry basic pay of Rs. 35,400 per month before Dearness Allowance, HRA and Transport Allowance.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Why this recruitment matters for pay",
        text: "Level 6 is one of the most-searched levels in the pay matrix. If the 8th Pay Commission is implemented with a fitment factor around 2.0 to 2.28, a Level 6 basic of Rs. 35,400 could be revised to roughly Rs. 70,800 to Rs. 80,700 — use our salary and fitment tools to model your own figure.",
      },
      { type: "h2", text: "RRB JE Recruitment 2026 — key highlights" },
      {
        type: "table",
        headers: ["Particular", "Details"],
        rows: [
          ["Recruiting body", "Railway Recruitment Boards (RRBs), Ministry of Railways"],
          ["Notice number", "CEN 04/2026 (JE / DMS)"],
          ["Posts", "Junior Engineer, Junior Engineer (IT), Depot Material Superintendent, Chemical & Metallurgical Assistant category posts"],
          ["Total vacancies", "4029 (after vacancy increase)"],
          ["Pay level", "Pay Matrix Level 6 — Rs. 35,400 basic pay"],
          ["Online application", "14 August 2026 to 13 September 2026"],
          ["Fee payment last date", "15 September 2026"],
          ["Modification / correction window", "16 to 25 September 2026"],
          ["Selection", "CBT Stage I, CBT Stage II, Document Verification, Medical Examination"],
          ["Job location", "All India"],
        ],
        caption: "Snapshot of CEN 04/2026 as per the official advertisement.",
      },
      { type: "h2", text: "Important dates you must not miss" },
      {
        type: "ul",
        items: [
          "Online registration begins: 14 August 2026",
          "Last date to submit the online application: 13 September 2026",
          "Last date to pay the examination fee: 15 September 2026",
          "Application correction / modification window: 16 to 25 September 2026",
          "CBT Stage I exam date: to be announced as per the RRB schedule",
          "Admit card: released a few days before the exam on the regional RRB websites",
        ],
      },
      { type: "h2", text: "Application fee and refund rules" },
      {
        type: "p",
        text: "The railways follow a refundable fee model, so most of the money comes back once you actually appear in the first-stage computer-based test.",
      },
      {
        type: "table",
        headers: ["Category", "Fee payable", "Refund after appearing in CBT Stage I"],
        rows: [
          ["General / OBC / EWS", "Rs. 500", "Rs. 400"],
          ["SC / ST / Ex-Servicemen / PwBD / Minority / EBC", "Rs. 250", "Rs. 250 (full)"],
          ["All women candidates (any category)", "Rs. 250", "Rs. 250 (full)"],
        ],
        caption:
          "Fee can be paid by debit card, credit card, net banking, UPI or cash through e-challan.",
      },
      { type: "h2", text: "Eligibility criteria for RRB Junior Engineer 2026" },
      { type: "h3", text: "Educational qualification" },
      {
        type: "ul",
        items: [
          "A three-year Diploma in Engineering in the relevant discipline from a recognised University or Institute, or a combination of approved sub-streams of the basic stream.",
          "Civil-side posts also accept a three-year B.Sc. in Civil Engineering; several posts accept Mechanical / Electrical / Electronics diplomas.",
          "Junior Engineer (IT) requires qualifications such as PGDCA, BSc (Computer Science), BCA, B.Tech / BE in CS or IT, or DOEACC 'B' level.",
          "Depot Material Superintendent and Chemical & Metallurgical Assistant posts have their own stream combinations — check the post-wise eligibility PDF below before choosing your options.",
        ],
      },
      { type: "h3", text: "Age limit" },
      {
        type: "ul",
        items: [
          "Minimum age: 18 years as on 01/01/2027",
          "Maximum age: 33 years as on 01/01/2027",
          "OBC (non-creamy layer): 3 years relaxation; SC / ST: 5 years relaxation",
          "Additional relaxation for PwBD, Ex-Servicemen, women candidates and other notified categories as per railway recruitment rules",
        ],
      },
      { type: "h2", text: "Vacancy distribution — category wise" },
      {
        type: "table",
        headers: ["UR", "OBC", "EWS", "SC", "ST", "Total"],
        rows: [["1714", "919", "398", "632", "366", "4029"]],
        caption: "Category-wise break-up of the 4029 notified posts.",
      },
      { type: "h2", text: "RRB-wise vacancy details (all 21 boards)" },
      {
        type: "table",
        headers: ["RRB", "UR", "OBC", "EWS", "SC", "ST", "Total"],
        rows: [
          ["Ahmedabad", "45", "38", "17", "24", "19", "143"],
          ["Ajmer", "110", "68", "23", "41", "10", "252"],
          ["Bengaluru", "119", "79", "33", "45", "23", "299"],
          ["Bhopal", "58", "27", "08", "17", "10", "120"],
          ["Bhubaneswar", "40", "19", "09", "14", "04", "86"],
          ["Bilaspur", "51", "22", "13", "19", "19", "124"],
          ["Chandigarh", "77", "49", "13", "31", "13", "183"],
          ["Chennai", "152", "83", "44", "62", "36", "377"],
          ["Gorakhpur", "67", "40", "25", "44", "22", "198"],
          ["Guwahati", "132", "87", "31", "54", "29", "333"],
          ["Jammu-Srinagar", "86", "27", "11", "16", "12", "152"],
          ["Kolkata", "195", "101", "52", "58", "51", "457"],
          ["Malda", "09", "07", "03", "08", "03", "30"],
          ["Mumbai", "175", "96", "37", "67", "36", "411"],
          ["Muzaffarpur", "07", "03", "01", "04", "02", "17"],
          ["Patna", "29", "15", "05", "20", "11", "80"],
          ["Prayagraj", "164", "67", "28", "49", "33", "341"],
          ["Ranchi", "49", "31", "13", "21", "08", "122"],
          ["Secunderabad", "68", "12", "09", "15", "06", "110"],
          ["Siliguri", "35", "26", "12", "12", "07", "92"],
          ["Thiruvananthapuram", "45", "22", "11", "11", "12", "101"],
        ],
        caption:
          "Choose your RRB carefully — the board you select decides your exam region and posting zone.",
      },
      { type: "h2", text: "RRB JE salary 2026 — what you actually take home" },
      {
        type: "p",
        text: "Junior Engineer is a Level 6 post in the 7th CPC pay matrix, so the entry basic pay is Rs. 35,400 per month. On top of the basic, a railway JE draws Dearness Allowance, House Rent Allowance based on city class, Transport Allowance and, in many units, running or special allowances.",
      },
      {
        type: "table",
        headers: ["Component", "Indicative monthly amount"],
        rows: [
          ["Basic pay (Level 6, index 1)", "Rs. 35,400"],
          ["Dearness Allowance (at current rate)", "Approx. Rs. 20,000+"],
          ["HRA (X-class city, 27%)", "Approx. Rs. 9,558"],
          ["Transport Allowance + DA on TA", "Approx. Rs. 5,000"],
          ["Gross salary (approximate)", "Rs. 68,000 – Rs. 72,000"],
          ["Deductions (NPS 10% + CGHS/insurance)", "Approx. Rs. 4,000 – Rs. 4,500"],
        ],
        caption:
          "Indicative figures for planning only; actual salary depends on posting city, DA rate and unit-specific allowances.",
      },
      {
        type: "p",
        text: "If the 8th Pay Commission is implemented, this Level 6 basic will be re-fixed by multiplying it with the notified fitment factor. Run your own numbers with our salary calculator, pension calculator and fitment simulator to see the revised basic, gross and net figures for Level 6.",
      },
      { type: "h2", text: "Selection process and exam pattern" },
      {
        type: "ol",
        items: [
          "CBT Stage I — objective screening test covering Mathematics, General Intelligence & Reasoning, General Awareness and General Science.",
          "CBT Stage II — technical paper based on your chosen exam group, along with General Awareness, Physics & Chemistry, Basics of Computers and Environment & Pollution Control.",
          "Document Verification — shortlisting is based on Stage II normalised marks.",
          "Medical Examination — as per the medical standard (A3, B1, B2, C1 etc.) prescribed for each post in the notification annexure.",
        ],
      },
      { type: "h2", text: "How to apply online for RRB JE CEN 04/2026" },
      {
        type: "ol",
        items: [
          "Read the full notification PDF and the post-wise eligibility annexure before you start.",
          "Create a one-time registration on the official RRB application portal using a valid mobile number and email ID.",
          "Fill in personal, educational and category details exactly as they appear on your certificates.",
          "Choose your preferred RRB and post preferences carefully — the board choice cannot be changed later.",
          "Upload a recent colour photograph, signature and any category or PwBD certificates in the prescribed format.",
          "Pay the examination fee online or through e-challan and check the preview page before final submission.",
          "Download and save the submitted application along with the fee receipt for future reference.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Before you apply",
        text: "Verify every date, vacancy figure and eligibility condition against the official notification PDF. Vacancy numbers can be revised again through addendum notices.",
      },
    ],
    faq: [
      {
        q: "How many vacancies are there in RRB JE Recruitment 2026?",
        a: "A total of 4029 Junior Engineer and Depot Material Superintendent posts are notified under CEN 04/2026 after the vacancy increase notice.",
      },
      {
        q: "What is the last date to apply for RRB JE CEN 04/2026?",
        a: "Online applications close on 13 September 2026, and the examination fee can be paid up to 15 September 2026.",
      },
      {
        q: "What is the salary of a Railway Junior Engineer in 2026?",
        a: "Junior Engineer is a Pay Matrix Level 6 post with an entry basic pay of Rs. 35,400 per month. With DA, HRA and Transport Allowance, the gross salary typically works out to roughly Rs. 68,000 to Rs. 72,000 depending on the posting city.",
      },
      {
        q: "What qualification is required for RRB Junior Engineer 2026?",
        a: "A three-year engineering diploma or an equivalent degree in the relevant stream is required. Junior Engineer (IT) posts accept computer-science qualifications such as BCA, BSc (CS), B.Tech in CS/IT, PGDCA or DOEACC 'B' level.",
      },
      {
        q: "What is the age limit for RRB JE Recruitment 2026?",
        a: "Candidates must be between 18 and 33 years of age as on 01/01/2027, with the usual relaxations of 3 years for OBC and 5 years for SC/ST candidates.",
      },
      {
        q: "Is the RRB JE application fee refundable?",
        a: "Yes. General, OBC and EWS candidates get Rs. 400 of the Rs. 500 fee refunded after appearing in CBT Stage I, while SC, ST, PwBD and all women candidates get the entire Rs. 250 refunded.",
      },
      {
        q: "Where can I download the RRB JE CEN 04/2026 notification PDF?",
        a: "The full notification, syllabus, zone-wise vacancy list, post-wise eligibility annexure and vacancy increase notice are all available in the download section of this page.",
      },
    ],
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
