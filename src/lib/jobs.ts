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
    slug: "upsc-epfo-apfc-recruitment-2026-80-posts",
    title:
      "UPSC EPFO APFC Recruitment 2026: 80 Assistant Provident Fund Commissioner Posts — Apply 22 August to 11 September, Level 10 Pay Rs. 56,100",
    description:
      "UPSC EPFO Assistant Provident Fund Commissioner (APFC) Recruitment 2026 under Special Advt. No. 52/2026 — 80 vacancies, category-wise breakup, any-degree eligibility, 35/38/40 year age limit, Rs. 25 fee, Level 10 salary Rs. 56,100 to Rs. 1,77,500, 20 December 2026 Recruitment Test pattern, syllabus and PDF downloads.",
    keyword:
      "upsc epfo apfc recruitment 2026, upsc apfc vacancy 2026, epfo apfc online form 2026, upsc epfo apfc salary, apfc exam date 2026, upsc advt 52/2026, epfo assistant provident fund commissioner notification pdf, apfc syllabus 2026",
    organization: "Union Public Service Commission (UPSC)",
    postName:
      "Assistant Provident Fund Commissioner (APFC), Employees' Provident Fund Organisation",
    vacancies: "80 posts (UR 29, OBC 18, EWS 08, SC 15, ST 10)",
    qualification:
      "Degree of a recognised university or equivalent in any stream; a diploma in Company Law, Labour Laws or Public Administration is desirable",
    ageLimit:
      "Maximum 35 years for UR / EWS, 38 years for OBC and 40 years for SC / ST, with up to 10 years extra relaxation for PwBD subject to a ceiling of 56 years",
    payScale:
      "Level 10 of the 7th CPC pay matrix — Rs. 56,100 to Rs. 1,77,500, plus Dearness Allowance, HRA and Transport Allowance",
    location: "All India — headquarters New Delhi with all-India service liability",
    applicationFee:
      "Rs. 25 for General / OBC / EWS male candidates; nil for SC / ST / PwBD and all women candidates",
    applyStart: "2026-08-22",
    applyEnd: "2026-09-11",
    applyUrl: "https://upsconline.nic.in/",
    organizationUrl: "https://www.upsc.gov.in/",
    salaryMin: 56100,
    salaryMax: 177500,
    salaryUnit: "MONTH",
    salaryCurrency: "INR",
    employmentType: "FULL_TIME",
    noticeNumber: "UPSC Special Advt. No. 52/2026",
    industry: "Government Administration — Social Security & Provident Fund",
    occupationalCategory: "11-9199.00 Managers, All Other",
    educationRequirements:
      "Bachelor's degree in any discipline from a recognised university or an equivalent qualification",
    experienceRequirements:
      "No prior work experience required; the post is filled through a Recruitment Test followed by an interview",
    jobBenefits:
      "Group 'A' permanent post, Dearness Allowance, House Rent Allowance, Transport Allowance, CGHS medical cover, National Pension System, gratuity, leave travel concession and structured promotion to Regional Provident Fund Commissioner grades",
    numberOfPositions: 80,
    applicantLocationRequirements: "India",
    directApply: false,

    downloads: [
      {
        label: "Official Notification PDF (Special Advt. No. 52/2026)",
        href: "/downloads/upsc-epfo-apfc-2026/upsc-epfo-apfc-2026-official-notification.pdf",
        note: "Complete 29-page UPSC advertisement with eligibility, reservation, exam centres and instructions",
      },
      {
        label: "Notification Summary PDF (80 Posts, Dates, Fee, Pay)",
        href: "/downloads/upsc-epfo-apfc-2026/upsc-epfo-apfc-2026-notification-summary.pdf",
        note: "One-sheet summary of important dates, category-wise vacancy, eligibility, fee and Level 10 pay",
      },
      {
        label: "Exam Pattern & Syllabus Guide PDF",
        href: "/downloads/upsc-epfo-apfc-2026/upsc-epfo-apfc-2026-exam-pattern-and-syllabus.pdf",
        note: "Recruitment Test scheme, 300-mark structure, all nine syllabus topics and a 16-week study plan",
      },
    ],
    category: "UPSC Jobs",
    date: "2026-08-22",
    updated: "2026-08-22",
    readMinutes: 9,
    hero: "from-blue-900 to-amber-700",
    image: "https://paycommissionnews.co.in/images/upsc-epfo-apfc-2026.jpg",
    imageAlt:
      "UPSC EPFO APFC Recruitment 2026 for 80 Assistant Provident Fund Commissioner posts with Level 10 pay of Rs. 56,100",
    ogImage: "https://paycommissionnews.co.in/images/og/upsc-epfo-apfc-2026-og.jpg",
    lang: "en",

    excerpt:
      "The Union Public Service Commission has opened online applications for 80 Assistant Provident Fund Commissioner (APFC) posts in EPFO under Special Advertisement No. 52/2026. Any graduate up to 35 years of age can apply from 22 August to 11 September 2026, the Recruitment Test is scheduled for 20 December 2026, and selected candidates join at Level 10 with a basic pay of Rs. 56,100 per month.",

    body: [
      {
        type: "p",
        text: "The Union Public Service Commission has notified 80 vacancies for the post of Assistant Provident Fund Commissioner (APFC) in the Employees' Provident Fund Organisation under Special Advertisement No. 52/2026. Online applications open on 22 August 2026 and close at 6:00 PM on 11 September 2026, and the pen-and-paper Recruitment Test is fixed for 20 December 2026.",
      },
      {
        type: "p",
        text: "APFC is one of the most sought-after Group 'A' non-ministerial posts available to a plain graduate — there is no engineering, law or management degree requirement. The post sits in Level 10 of the 7th CPC pay matrix with an entry basic pay of Rs. 56,100 per month, a one-year probation, headquarters at New Delhi and all-India service liability. With the 8th Pay Commission expected to revise the matrix during the service of this batch, Level 10 is also one of the levels that gains the most in absolute terms from a higher fitment factor.",
      },
      { type: "h2", text: "UPSC EPFO APFC Recruitment 2026 — important dates" },
      {
        type: "table",
        headers: ["Event", "Date"],
        rows: [
          ["Notification released", "21 August 2026"],
          ["Online application begins", "22 August 2026"],
          ["Last date to apply online", "11 September 2026 (up to 6:00 PM)"],
          ["Last date to pay the exam fee", "11 September 2026"],
          ["Recruitment Test (RT) date", "20 December 2026"],
          ["e-Admit card", "Released on the UPSC website before the exam"],
          ["Interview / Personality Test", "To be announced after the RT result"],
        ],
        caption: "Dates as per UPSC Special Advertisement No. 52/2026.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "The 6:00 PM cut-off is strict",
        text: "The UPSC Online Recruitment Application portal stops accepting forms at 6:00 PM on 11 September 2026, and fee payment closes the same day. Complete your One Time Registration profile, document upload and payment at least three days early — the portal slows sharply in the final 48 hours.",
      },
      { type: "h2", text: "Vacancy details — 80 APFC posts" },
      {
        type: "table",
        headers: ["Post name", "Total posts", "Eligibility"],
        rows: [
          [
            "Assistant Provident Fund Commissioner (APFC)",
            "80",
            "Bachelor's degree in any stream from a recognised university",
          ],
        ],
      },
      { type: "h3", text: "Category-wise vacancy breakup" },
      {
        type: "table",
        headers: ["UR", "OBC", "EWS", "SC", "ST", "Total"],
        rows: [["29", "18", "08", "15", "10", "80"]],
        caption:
          "Posts reserved for PwBD candidates are identified in the official advertisement; reservation is applied as per Government of India rules.",
      },
      { type: "h2", text: "Eligibility criteria" },
      { type: "h3", text: "Educational qualification" },
      {
        type: "ul",
        items: [
          "Essential: a degree of a recognised university or an equivalent qualification — any stream, including BA, BSc, BCom, BTech, BBA, BCA and LLB.",
          "Desirable: a diploma in Company Law, Labour Laws or Public Administration. This is not mandatory but can help at the interview stage.",
          "Final-year students should verify the cut-off date for possessing the qualification given in the advertisement before applying.",
          "No prior work experience is required for the post.",
        ],
      },
      { type: "h3", text: "Age limit" },
      {
        type: "table",
        headers: ["Category", "Maximum age"],
        rows: [
          ["UR / EWS", "35 years"],
          ["OBC", "38 years"],
          ["SC / ST", "40 years"],
          ["PwBD", "Up to 10 years further relaxation, subject to a maximum of 56 years"],
          ["Ex-servicemen and other special categories", "As per UPSC and Government of India rules"],
        ],
        caption: "Age is computed with reference to the cut-off date given in Special Advt. No. 52/2026.",
      },
      { type: "h2", text: "Application fee" },
      {
        type: "table",
        headers: ["Category", "Fee"],
        rows: [
          ["General / OBC / EWS (male candidates)", "Rs. 25"],
          ["SC / ST / PwBD", "Nil"],
          ["All women candidates", "Nil"],
          ["Payment mode", "Visa / Master / RuPay debit or credit card, UPI or internet banking"],
        ],
      },
      { type: "h2", text: "UPSC EPFO APFC salary 2026 — Level 10 pay structure" },
      {
        type: "p",
        text: "APFC is appointed in Level 10 of the 7th CPC pay matrix, which runs from Rs. 56,100 to Rs. 1,77,500. On top of the basic pay an officer draws Dearness Allowance at the prevailing central rate, House Rent Allowance based on the city classification, Transport Allowance with DA on TA, and is covered by the CGHS and the National Pension System.",
      },
      {
        type: "table",
        headers: ["Component", "Indicative monthly amount (X-city posting)"],
        rows: [
          ["Basic pay (Level 10, index 1)", "Rs. 56,100"],
          ["Dearness Allowance (at the current central rate)", "Around Rs. 32,000"],
          ["House Rent Allowance (30% for X-class cities)", "Around Rs. 16,830"],
          ["Transport Allowance plus DA on TA", "Around Rs. 6,500"],
          ["Gross monthly salary", "Approximately Rs. 1.11 lakh"],
          ["Deductions (NPS 10%, CGHS, income tax)", "Varies by declaration"],
          ["Approximate in-hand pay", "Rs. 90,000 to Rs. 95,000"],
        ],
        caption:
          "Allowances change with the posting city and the quarterly DA revision; treat the figures as indicative rather than final.",
      },
      {
        type: "callout",
        tone: "info",
        title: "What the 8th Pay Commission means for a 2026 APFC recruit",
        text: "The 8th Central Pay Commission has been constituted and its recommendations are expected to apply from 01 January 2026 with arrears. At a fitment factor of 2.0 a Level 10 basic pay of Rs. 56,100 would be revised to roughly Rs. 1.12 lakh, and at 2.28 to about Rs. 1.28 lakh, before the new DA cycle restarts from zero. Use our 8th CPC salary calculator to model your own level and city.",
      },
      { type: "h2", text: "Selection process — Recruitment Test and interview" },
      {
        type: "table",
        headers: ["Feature", "Detail"],
        rows: [
          ["Mode", "Pen and paper based, offline"],
          ["Question type", "Objective type with multiple choice answers"],
          ["Duration", "Two hours"],
          ["Total marks", "300 marks"],
          ["Medium", "English and Hindi"],
          ["Negative marking", "One-third of the marks for every wrong answer"],
          ["Interview / Personality Test", "100 marks"],
          ["Final weightage", "Recruitment Test and interview in a 75:25 ratio"],
          ["Exam centres", "84 centres across India"],
        ],
      },
      { type: "h3", text: "Minimum suitability marks at the interview" },
      {
        type: "table",
        headers: ["Category", "Minimum interview marks (out of 100)"],
        rows: [
          ["General / EWS", "50 and above"],
          ["OBC", "45 and above"],
          ["SC / ST / PwBD", "40 and above"],
        ],
        caption:
          "A candidate must clear the minimum standard of suitability at both the Recruitment Test and the interview stage.",
      },
      { type: "h2", text: "UPSC EPFO APFC syllabus 2026" },
      {
        type: "ol",
        items: [
          "General English — comprehension and workman-like use of words.",
          "Indian Culture, Heritage and Freedom Movement.",
          "Developmental issues and present trends in the Indian economy.",
          "Governance and the Constitution of India.",
          "General Science and basic knowledge of computer applications.",
          "Elementary Mathematics, Statistics and general mental ability.",
          "Industrial Relations, Labour Codes and social security in India.",
          "Principles of Accountancy, Auditing and Insurance.",
          "Current events of national and international importance.",
        ],
      },
      {
        type: "p",
        text: "The social security section is the highest-yield part of the paper and the one most candidates neglect. Build a solid base in the EPF & MP Act 1952, the Employees' Pension Scheme 1995, EDLI, the ESI Act, the four Labour Codes including the Code on Social Security 2020, and recent EPFO reforms such as the centralised pension payment system and faster online claim settlement.",
      },
      { type: "h2", text: "Duties of an Assistant Provident Fund Commissioner" },
      {
        type: "ul",
        items: [
          "Enforcement and compliance work with establishments covered under the EPF & MP Act.",
          "Assessment and recovery of provident fund dues, including quasi-judicial inquiries.",
          "Settlement of provident fund, pension and insurance claims of members.",
          "Accounts, cash book maintenance and reconciliation of bank statements.",
          "Legal, administrative, pension and computerisation work at the regional office level.",
        ],
      },
      { type: "h2", text: "How to apply for UPSC EPFO APFC Online Form 2026" },
      {
        type: "ol",
        items: [
          "Complete the One Time Registration (OTR) profile on the UPSC Online Recruitment Application portal at upsconline.nic.in.",
          "Open the APFC 2026 vacancy under Special Advt. No. 52/2026 and fill the detailed application carefully.",
          "Keep scanned copies of your photograph, signature, degree certificate, category certificate and identity proof ready in the prescribed size and format.",
          "Pay the Rs. 25 fee if applicable through card, UPI or internet banking; exempted candidates proceed directly.",
          "Preview every field, submit the form before 6:00 PM on 11 September 2026 and save a printout for the interview stage.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Plan your finances before the result",
        text: "Once you have an idea of your likely posting city, use the take-home salary, HRA and NPS calculators on this site to project your monthly in-hand pay and long-term corpus at Level 10.",
      },
    ],
    faq: [
      {
        q: "How many APFC posts are there in UPSC EPFO Recruitment 2026?",
        a: "There are 80 Assistant Provident Fund Commissioner posts — 29 UR, 18 OBC, 8 EWS, 15 SC and 10 ST — notified under UPSC Special Advertisement No. 52/2026.",
      },
      {
        q: "What is the last date to apply for UPSC EPFO APFC 2026?",
        a: "The online application opens on 22 August 2026 and closes on 11 September 2026 at 6:00 PM. The exam fee must also be paid by 11 September 2026.",
      },
      {
        q: "What is the UPSC EPFO APFC exam date 2026?",
        a: "The pen-and-paper Recruitment Test is scheduled for 20 December 2026 at 84 centres across India. e-Admit cards are released on the UPSC website before the exam.",
      },
      {
        q: "What qualification is required for the APFC post?",
        a: "A bachelor's degree in any stream from a recognised university is the essential qualification. A diploma in Company Law, Labour Laws or Public Administration is desirable but not mandatory.",
      },
      {
        q: "What is the APFC salary in 2026?",
        a: "APFC is a Level 10 post in the 7th CPC pay matrix with a basic pay range of Rs. 56,100 to Rs. 1,77,500. With DA, HRA and Transport Allowance, gross monthly pay at an X-class city posting works out to roughly Rs. 1.11 lakh, and in-hand pay to about Rs. 90,000 to Rs. 95,000.",
      },
      {
        q: "What is the age limit for UPSC EPFO APFC 2026?",
        a: "The maximum age is 35 years for UR and EWS, 38 years for OBC and 40 years for SC and ST candidates. PwBD candidates get up to 10 years further relaxation, subject to a maximum of 56 years.",
      },
      {
        q: "What is the exam pattern and marking scheme for the APFC Recruitment Test?",
        a: "The test is objective type, two hours long, carries 300 marks and is set in both English and Hindi. One-third of the marks are deducted for each wrong answer. The interview carries 100 marks and the final merit is prepared with a 75:25 weightage between the test and the interview.",
      },
      {
        q: "Will the 8th Pay Commission increase APFC pay?",
        a: "Yes. Once the 8th Central Pay Commission recommendations are implemented, Level 10 basic pay will be revised by the approved fitment factor — around Rs. 1.12 lakh at a factor of 2.0 and about Rs. 1.28 lakh at 2.28 — after which the DA cycle restarts from zero.",
      },
      {
        q: "How can I download the APFC 2026 notification and syllabus PDF?",
        a: "The official 29-page notification, a one-page notification summary and a detailed exam pattern and syllabus guide are all available in the download section of this page, hosted directly on PayCommissionNews.co.in.",
      },
    ],
  },
  {
    slug: "sbi-clerk-recruitment-2026-junior-associate-9124-posts",
    title:
      "SBI Clerk Recruitment 2026: 9124 Junior Associate Posts — Apply Online Till 31 August, Salary Rs. 26,730 Basic",
    description:
      "SBI Junior Associate (Clerk) Recruitment 2026 for 9124 posts under Advt. CRPD/CR/2026-27/17 — state-wise and category-wise vacancy, graduation eligibility, 20–28 years age limit, Rs. 750 fee, pay scale Rs. 24,050–64,480, Prelims and Mains exam pattern, important dates and PDF downloads.",
    keyword:
      "sbi clerk recruitment 2026, sbi junior associate 2026, sbi clerk vacancy 2026, sbi clerk online form 2026, sbi clerk salary 2026, sbi clerk 9124 post, sbi junior associate notification pdf, sbi clerk exam date 2026",
    organization: "State Bank of India (SBI)",
    postName: "Junior Associate (Customer Support & Sales) — Clerical Cadre",
    vacancies: "9,124 posts (Regular 7,680 + Backlog 1,444)",
    qualification:
      "Bachelor's degree in any discipline from a recognised university; candidates in the final year of graduation may also apply subject to producing proof of passing",
    ageLimit:
      "20 to 28 years as on 01/04/2026, with age relaxation for SC / ST / OBC / PwBD / ex-servicemen as per SBI rules",
    payScale:
      "Rs. 24,050 – 64,480 clerical cadre scale; starting basic pay Rs. 26,730 with two graduate increments, total starting emoluments around Rs. 46,000 per month in a metro city",
    location: "Across India — state-wise and circle-wise posting",
    applicationFee: "Rs. 750 for General / EWS / OBC; nil for SC / ST / PwBD",
    applyStart: "2026-08-11",
    applyEnd: "2026-08-31",
    applyUrl: "https://sbi.bank.in/",
    organizationUrl: "https://sbi.bank.in/",
    salaryMin: 26730,
    salaryMax: 64480,
    salaryUnit: "MONTH",
    salaryCurrency: "INR",
    employmentType: "FULL_TIME",
    noticeNumber: "Advt. No. CRPD/CR/2026-27/17",
    industry: "Banking & Financial Services (Public Sector Bank)",
    occupationalCategory: "43-3071.00 Tellers",
    educationRequirements:
      "Graduation in any stream from a recognised university; final-year students may apply provisionally",
    experienceRequirements:
      "No prior work experience required; SBI apprentices with one year of completed branch experience receive bonus marks in the Main examination",
    jobBenefits:
      "Dearness Allowance, HRA or bank accommodation, special allowance, medical and leave-fare facilities, provident fund, National Pension System, staff loan concessions and confirmed promotion channels within the clerical and officer cadre",
    numberOfPositions: 9124,
    applicantLocationRequirements: "India",
    directApply: false,

    downloads: [
      {
        label: "Official Detailed Notification PDF (Advt. CRPD/CR/2026-27/17)",
        href: "/downloads/sbi-clerk-recruitment-2026/sbi-clerk-recruitment-2026-official-notification.pdf",
        note: "Complete 11-page advertisement with vacancy tables, eligibility, reservation and exam details",
      },
      {
        label: "Notification Summary PDF (9124 Posts, State-wise Vacancy)",
        href: "/downloads/sbi-clerk-recruitment-2026/sbi-clerk-recruitment-2026-notification-summary.pdf",
        note: "At-a-glance dates, fee, pay scale, category-wise and state-wise vacancy in one sheet",
      },
      {
        label: "Exam Pattern, Syllabus & Preparation Guide PDF",
        href: "/downloads/sbi-clerk-recruitment-2026/sbi-clerk-recruitment-2026-exam-pattern-and-syllabus.pdf",
        note: "Prelims and Mains structure, local language test, topic checklist and an 8-week study plan",
      },
    ],
    category: "Bank Jobs",
    date: "2026-08-21",
    updated: "2026-08-21",
    readMinutes: 10,
    hero: "from-sky-700 to-indigo-800",
    image: "https://paycommissionnews.co.in/images/sbi-clerk-recruitment-2026.jpg",
    imageAlt:
      "SBI Clerk Recruitment 2026 for 9124 Junior Associate posts with online application open till 31 August 2026",
    ogImage: "https://paycommissionnews.co.in/images/og/sbi-clerk-recruitment-2026-og.jpg",
    lang: "en",

    excerpt:
      "State Bank of India has opened online applications for 9,124 Junior Associate (Clerk) posts under advertisement CRPD/CR/2026-27/17. Any graduate aged 20 to 28 years can apply between 11 August and 31 August 2026, and selected candidates start on a basic pay of Rs. 26,730 with total emoluments of roughly Rs. 46,000 a month in metro cities.",

    body: [
      {
        type: "p",
        text: "State Bank of India has released one of the biggest clerical recruitment notifications of the year: 9,124 vacancies for Junior Associate (Customer Support & Sales) in the clerical cadre under advertisement number CRPD/CR/2026-27/17. The online application window is open from 11 August 2026 to 31 August 2026, and any graduate between 20 and 28 years of age can apply for the state or circle of their choice.",
      },
      {
        type: "p",
        text: "The intake is split into 7,680 regular vacancies and 1,444 backlog vacancies. Selection runs through an online Preliminary examination tentatively in September 2026, an online Main examination tentatively in November 2026 and a test of the specified local language before joining. Starting basic pay is Rs. 26,730 including two advance increments for graduates, and total starting emoluments come to about Rs. 46,000 per month at a metro posting.",
      },
      { type: "h2", text: "SBI Clerk Recruitment 2026 — important dates" },
      {
        type: "table",
        headers: ["Event", "Date"],
        rows: [
          ["Notification released", "11 August 2026"],
          ["Online application begins", "11 August 2026"],
          ["Last date to apply online", "31 August 2026"],
          ["Last date to pay the exam fee", "31 August 2026"],
          ["Prelims admit card", "Released before the exam"],
          ["Phase I — Preliminary examination", "Tentatively September 2026"],
          ["Phase II — Main examination", "Tentatively November 2026"],
          ["Local language proficiency test", "After the Main exam, before joining"],
        ],
        caption: "Dates as per the official SBI advertisement CRPD/CR/2026-27/17.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Apply before the portal load spikes",
        text: "Both the application and the fee payment close on 31 August 2026. With more than nine thousand posts on offer, the registration portal is heaviest in the final 48 hours — complete your form, document upload and payment a few days early.",
      },
      { type: "h2", text: "Vacancy details — 9,124 posts" },
      {
        type: "table",
        headers: ["Post", "Vacancies"],
        rows: [
          ["Junior Associate (Clerk) — Regular", "7,680"],
          ["Junior Associate (Clerk) — Backlog", "1,444"],
          ["Total", "9,124"],
        ],
      },
      { type: "h3", text: "Category-wise regular vacancies" },
      {
        type: "table",
        headers: ["UR", "EWS", "OBC", "SC", "ST", "Total"],
        rows: [["3,253", "760", "1,716", "1,114", "837", "7,680"]],
        caption: "Backlog vacancies of 1,444 posts are notified separately for reserved categories.",
      },
      { type: "h3", text: "State-wise vacancy and local language" },
      {
        type: "table",
        headers: ["State / UT", "Local language", "Total posts"],
        rows: [
          ["Maharashtra", "Marathi", "1,718"],
          ["Tamil Nadu", "Tamil", "1,410"],
          ["Odisha", "Odia", "1,100"],
          ["Karnataka", "Kannada", "760"],
          ["West Bengal", "Bengali / Nepali", "555"],
          ["Rajasthan", "Hindi", "350"],
          ["Gujarat", "Gujarati", "330"],
          ["Chhattisgarh", "Hindi", "287"],
          ["Telangana", "Telugu / Urdu", "260"],
          ["Uttar Pradesh", "Hindi / Urdu", "250"],
          ["Madhya Pradesh", "Hindi", "113"],
          ["Assam", "Assamese / Bengali / Bodo", "110"],
          ["Goa", "Konkani", "62"],
          ["Sikkim", "Nepali / English", "60"],
          ["Arunachal Pradesh", "English", "55"],
          ["Tripura", "Bengali / Kokborok", "48"],
          ["Mizoram", "Mizo", "32"],
          ["Meghalaya", "English / Garo / Khasi", "24"],
          ["A & N Islands", "Hindi / English", "15"],
          ["Manipur", "Manipuri / English", "14"],
          ["Jammu & Kashmir UT", "Urdu / Ladakhi / Bhoti", "07"],
        ],
        caption:
          "Candidates can apply for only one state and must be proficient in the specified local language of that state.",
      },
      { type: "h2", text: "Eligibility criteria" },
      { type: "h3", text: "Educational qualification" },
      {
        type: "ul",
        items: [
          "A Bachelor's degree in any discipline from a recognised university, or an equivalent qualification recognised by the Central Government.",
          "Candidates in the final year or semester of graduation may apply provisionally, subject to producing proof of passing on or before the date specified in the notification.",
          "Matriculate ex-servicemen who have completed at least 15 years of defence service are eligible as per the relaxation given in the advertisement.",
          "Knowledge of computer operations is essential, and proficiency in the specified local language of the applied state is required.",
        ],
      },
      { type: "h3", text: "Age limit as on 01 April 2026" },
      {
        type: "table",
        headers: ["Criterion", "Detail"],
        rows: [
          ["Minimum age", "20 years"],
          ["Maximum age", "28 years"],
          ["SC / ST", "5 years relaxation"],
          ["OBC (non-creamy layer)", "3 years relaxation"],
          ["PwBD (General / OBC / SC / ST)", "10 to 15 years relaxation as per category"],
          ["Ex-servicemen", "As per Government of India rules adopted by the bank"],
        ],
      },
      { type: "h2", text: "Application fee" },
      {
        type: "table",
        headers: ["Category", "Fee"],
        rows: [
          ["General / EWS / OBC", "Rs. 750"],
          ["SC / ST / PwBD", "Nil"],
          ["Payment mode", "Online only — debit card, credit card, net banking or UPI"],
        ],
      },
      { type: "h2", text: "SBI Clerk salary 2026 — pay scale and in-hand pay" },
      {
        type: "p",
        text: "The Junior Associate post carries the clerical cadre pay scale of Rs. 24,050 – 1340/3 – 28,070 – 1650/3 – 33,020 – 2000/4 – 41,020 – 2340/7 – 57,400 – 4400/1 – 61,800 – 2680/1 – 64,480. A graduate recruit starts at a basic pay of Rs. 26,730 because two advance increments are granted, and the bank puts total starting emoluments at roughly Rs. 46,000 per month at a metro city like Mumbai.",
      },
      {
        type: "table",
        headers: ["Component", "Indicative amount at entry"],
        rows: [
          ["Basic pay (with 2 graduate increments)", "Rs. 26,730 per month"],
          ["Dearness Allowance", "As per the quarterly bank DA rate"],
          ["Special allowance", "A percentage of basic pay as per the bipartite settlement"],
          ["HRA / bank accommodation", "Depends on the posting city classification"],
          ["Total starting emoluments (metro)", "Around Rs. 46,000 per month"],
          ["Retirement benefits", "Provident fund, National Pension System, gratuity"],
        ],
        caption:
          "Allowances vary by place of posting; the figures above are indicative of a metro posting at the current DA rate.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Does the 8th Pay Commission change bank clerk pay?",
        text: "No. Public sector bank employees are paid under the bipartite settlement negotiated between the Indian Banks' Association and the employee unions, not under the Central Pay Commission. The 8th Pay Commission revises central government pay matrix levels; bank scales are revised separately every five years, though a higher central fitment factor usually strengthens the union's bargaining benchmark.",
      },
      { type: "h2", text: "Selection process and exam pattern" },
      { type: "h3", text: "Phase I — Preliminary examination (100 marks, 1 hour)" },
      {
        type: "table",
        headers: ["Section", "Questions", "Marks", "Duration"],
        rows: [
          ["English Language", "30", "30", "20 minutes"],
          ["Numerical Ability", "35", "35", "20 minutes"],
          ["Reasoning Ability", "35", "35", "20 minutes"],
          ["Total", "100", "100", "60 minutes"],
        ],
        caption:
          "Each section is separately timed and 1/4th mark is deducted for every wrong answer. Roughly 10 times the vacancies per category are shortlisted for the Main exam.",
      },
      { type: "h3", text: "Phase II — Main examination (200 marks, 2 hours 40 minutes)" },
      {
        type: "table",
        headers: ["Section", "Questions", "Marks", "Duration"],
        rows: [
          ["General / Financial Awareness", "50", "50", "35 minutes"],
          ["General English", "40", "40", "35 minutes"],
          ["Quantitative Aptitude", "50", "50", "45 minutes"],
          ["Reasoning Ability & Computer Aptitude", "50", "60", "45 minutes"],
          ["Total", "190", "200", "160 minutes"],
        ],
        caption:
          "Only the aggregate Main examination score counts for the final merit list; Prelims marks are used only for shortlisting.",
      },
      { type: "h3", text: "Phase III — Test of specified local language" },
      {
        type: "p",
        text: "Candidates who clear the Main examination must pass a local language proficiency test before joining. The objective part carries 15 questions of 15 marks based on three non-verbal comprehension passages, along with a writing or translation component. Candidates who produce a Class 10 or Class 12 mark sheet showing that they studied the opted local language are exempt from this test.",
      },
      {
        type: "callout",
        tone: "success",
        title: "Apprentice bonus marks",
        text: "Trained SBI apprentices who have successfully completed one year of specified branch experience receive bonus marks of 2.5 per cent of the maximum marks — that is 5 marks out of 200 — added to the aggregate Main examination score.",
      },
      { type: "h2", text: "How to apply online for SBI Clerk 2026" },
      {
        type: "ol",
        items: [
          "Keep your graduation mark sheets, category certificate, PwBD certificate if applicable, photo ID, and scanned photograph, signature, handwritten declaration and left thumb impression ready in the prescribed size and format.",
          "Open the careers section of the official State Bank of India website and select the Junior Associate (Customer Support & Sales) recruitment advertisement.",
          "Complete the new registration with a valid email ID and mobile number, then fill in personal, academic and state or circle preference details.",
          "Upload all four scanned documents and re-check the state applied for, because the local language test is tied to that choice.",
          "Pay Rs. 750 online if you are in the General, EWS or OBC category; SC, ST and PwBD candidates are exempt.",
          "Verify the preview page line by line, submit the form, and save or print the final registration slip and fee receipt for the admit card download later.",
        ],
      },
      { type: "h2", text: "Probation, posting and career growth" },
      {
        type: "p",
        text: "Newly appointed Junior Associates serve a minimum probation of six months and must complete the prescribed e-lessons during that period for confirmation. Posting is within the state or circle applied for, and the clerical cadre offers a structured career path — promotion to Trainee Officer and then Scale I officer through internal written tests and interviews, along with staff loan concessions, medical facilities and leave-fare benefits from the first year.",
      },
    ],

    faq: [
      {
        q: "How many vacancies are there in SBI Clerk Recruitment 2026?",
        a: "There are 9,124 Junior Associate (Customer Support & Sales) vacancies in total under advertisement CRPD/CR/2026-27/17 — 7,680 regular posts and 1,444 backlog posts.",
      },
      {
        q: "What are the SBI Clerk 2026 application dates?",
        a: "Online applications are open from 11 August 2026 to 31 August 2026. The application fee must also be paid on or before 31 August 2026.",
      },
      {
        q: "What is the SBI Clerk 2026 salary and starting basic pay?",
        a: "The pay scale is Rs. 24,050 to Rs. 64,480. A graduate recruit starts at a basic pay of Rs. 26,730 after two advance increments, and total starting emoluments are around Rs. 46,000 per month at a metro posting including DA and other allowances.",
      },
      {
        q: "What is the age limit for SBI Junior Associate 2026?",
        a: "Candidates must be between 20 and 28 years of age as on 01 April 2026. SC and ST candidates get 5 years relaxation, OBC (non-creamy layer) candidates get 3 years, and PwBD and ex-servicemen candidates get relaxation as per government rules.",
      },
      {
        q: "What qualification is required for the SBI Clerk post?",
        a: "A Bachelor's degree in any discipline from a recognised university is required. Final-year graduation students may apply provisionally, and proficiency in the specified local language of the applied state is essential.",
      },
      {
        q: "What is the SBI Clerk 2026 exam pattern?",
        a: "Selection has three stages: an online Preliminary exam of 100 marks in 1 hour, an online Main exam of 200 marks in 2 hours 40 minutes, and a test of the specified local language. Only the Main exam score decides the final merit, and 1/4th mark is deducted for each wrong answer.",
      },
      {
        q: "When will the SBI Clerk 2026 Prelims and Mains exam be held?",
        a: "As per the notification, the Preliminary examination is tentatively scheduled for September 2026 and the Main examination for November 2026. Admit cards are released before each exam.",
      },
      {
        q: "Will the 8th Pay Commission increase SBI Clerk salary?",
        a: "No. Public sector bank staff pay is revised through the bipartite settlement between the Indian Banks' Association and employee unions, not by the Central Pay Commission. The 8th Pay Commission applies to central government employees, although a higher central fitment factor often influences the benchmark for the next bank wage revision.",
      },
    ],
  },
  {
    slug: "ntpc-ngel-recruitment-2026-engineer-executive-147-posts",
    title:
      "NTPC NGEL Recruitment 2026: 147 Engineer & Executive Posts — Online Apply 18 August to 7 September, Salary Rs. 50,000–1,60,000",
    description:
      "NTPC Green Energy Limited (NGEL) Recruitment 2026 (Advt. No. 04/26) for 147 Engineer and Executive posts — post-wise vacancy, qualification, 35-year age limit, Rs. 500 fee, E2 grade salary Rs. 50,000–1,60,000, selection process, important dates and PDF downloads.",
    keyword:
      "ntpc ngel recruitment 2026, ntpc green energy limited vacancy 2026, ngel engineer recruitment 2026, ntpc ngel executive post 2026, ngel advt 04/26, ntpc green energy salary e2 grade, ntpc ngel online form 2026",
    organization: "NTPC Green Energy Limited (NGEL), a subsidiary of NTPC Limited",
    postName:
      "Engineer (RE-Civil / RE-Electrical / RE-Mechanical / RE-Safety) & Executive (RE-HR / RE-Finance / RE-CSR / RE-Rajbhasha)",
    vacancies: "147 posts (Engineer 128 + Executive 19)",
    qualification:
      "BE / B.Tech / B.Sc. (Engg.) in the relevant engineering discipline with 65% marks (55% for SC/ST/PwBD) for Engineer posts; MBA / PG Diploma in HR, CA or CMA, PG in social development or MSW, and Master degree in Hindi/English for the respective Executive posts — with 1 to 3 years of post-qualification experience",
    ageLimit: "Maximum 35 years, with age relaxation for reserved categories as per NGEL rules",
    payScale:
      "E2 grade IDA pay scale Rs. 50,000 – Rs. 1,60,000 per month plus DA, HRA, perks under the cafeteria approach and NPS",
    location: "Across India at NTPC Green Energy renewable projects and offices",
    applicationFee:
      "Rs. 500 for General / OBC / EWS; no fee for SC / ST / PwBD and for all female candidates",
    applyStart: "2026-08-18",
    applyEnd: "2026-09-07",
    applyUrl: "https://www.ngel.in/ngel-home",
    organizationUrl: "https://www.ngel.in/ngel-home",
    salaryMin: 50000,
    salaryMax: 160000,
    salaryUnit: "MONTH",
    salaryCurrency: "INR",
    employmentType: "FULL_TIME",
    noticeNumber: "Advt. No. 04/26",
    industry: "Renewable Energy / Power Generation (Central Public Sector Enterprise)",
    occupationalCategory: "17-2199.00 Engineers, All Other",
    experienceRequirements:
      "Minimum 3 years of post-qualification executive experience in the relevant discipline; 1 year post-qualification experience for Executive (RE-Finance) with CA or CMA",
    educationRequirements:
      "Full-time engineering degree (BE / B.Tech / B.Sc. Engg.) with 65% marks for Engineer posts; relevant post-graduate degree, diploma or professional qualification (CA / CMA) for Executive posts",
    jobBenefits:
      "Industrial Dearness Allowance, HRA or company accommodation, cafeteria perks and allowances, performance related pay, medical facilities, gratuity, NPS pension contribution and career growth in India's largest green energy portfolio",
    numberOfPositions: 147,
    applicantLocationRequirements: "India",
    jobStartDate: "2026-11-01",
    directApply: false,

    downloads: [
      {
        label: "Notification Summary PDF (147 Engineer & Executive Posts)",
        href: "/downloads/ntpc-ngel-recruitment-2026/ntpc-ngel-recruitment-2026-notification-summary.pdf",
        note: "Post-wise vacancy, important dates, application fee and E2 grade pay in one sheet",
      },
      {
        label: "Eligibility, Selection Process & Preparation Guide PDF",
        href: "/downloads/ntpc-ngel-recruitment-2026/ntpc-ngel-recruitment-2026-eligibility-and-selection.pdf",
        note: "Age and marks criteria, stage-wise selection flow and a discipline-wise preparation checklist",
      },
    ],
    category: "PSU Jobs",
    date: "2026-08-21",
    updated: "2026-08-21",
    readMinutes: 9,
    hero: "from-emerald-600 to-sky-700",
    image: "https://paycommissionnews.co.in/images/ntpc-ngel-recruitment-2026.jpg",
    imageAlt:
      "NTPC NGEL Recruitment 2026 for 147 Engineer and Executive posts with online application from 18 August to 7 September 2026",
    ogImage: "https://paycommissionnews.co.in/images/og/ntpc-ngel-recruitment-2026-og.jpg",
    lang: "en",

    excerpt:
      "NTPC Green Energy Limited has opened online applications for 147 Engineer and Executive posts under Advt. No. 04/26. Applications run from 18 August to 7 September 2026, the maximum age is 35 years and selected candidates join the E2 grade pay scale of Rs. 50,000 – Rs. 1,60,000 per month.",

    body: [
      {
        type: "p",
        text: "NTPC Green Energy Limited (NGEL), the renewable energy arm of NTPC Limited, has released a fresh recruitment notification for 147 Engineer and Executive posts under advertisement number 04/26. The online application window opens on 18 August 2026 and closes on 7 September 2026 at 6:00 PM, and the recruitment covers four engineering disciplines along with HR, Finance, CSR and Rajbhasha functions.",
      },
      {
        type: "p",
        text: "This is an experienced-level intake: candidates need one to three years of post-qualification executive experience depending on the post, and the appointment is made in the E2 executive grade with an IDA pay scale of Rs. 50,000 to Rs. 1,60,000 per month. For engineers already working in solar, wind or transmission projects, it is one of the strongest central PSU openings of 2026.",
      },
      { type: "h2", text: "NTPC NGEL Recruitment 2026 — important dates" },
      {
        type: "table",
        headers: ["Event", "Date"],
        rows: [
          ["Notification released", "12 August 2026"],
          ["Online application begins", "18 August 2026"],
          ["Last date to apply online", "7 September 2026 (up to 6:00 PM)"],
          ["Last date to pay application fee", "7 September 2026"],
          ["Written test / assessment", "As per schedule announced by NGEL"],
          ["Admit card", "Released before the examination date"],
        ],
        caption: "Dates as per NGEL Advt. No. 04/26.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Apply early — the portal closes at 6 PM",
        text: "The last date of 7 September 2026 has a hard 6:00 PM cut-off and the fee must also be paid the same day. Complete your registration, document upload and payment at least two days in advance to avoid last-minute portal load.",
      },
      { type: "h2", text: "Post-wise vacancy details (147 posts)" },
      {
        type: "table",
        headers: ["Post", "Vacancies"],
        rows: [
          ["Engineer (RE-Civil)", "43"],
          ["Engineer (RE-Electrical)", "69"],
          ["Engineer (RE-Mechanical)", "09"],
          ["Engineer (RE-Safety)", "07"],
          ["Executive (RE-HR)", "04"],
          ["Executive (RE-Finance)", "09"],
          ["Executive (RE-CSR)", "05"],
          ["Executive (RE-Rajbhasha)", "01"],
          ["Total", "147"],
        ],
        caption:
          "Engineering disciplines account for 128 of the 147 posts, with RE-Electrical the largest single stream.",
      },
      {
        type: "p",
        text: "Because NGEL is building large utility-scale solar parks, wind hybrid capacity and green hydrogen projects, the vacancy mix is heavily tilted towards electrical and civil engineers who can handle project execution, grid interconnection, substation works and civil foundations at site.",
      },
      { type: "h2", text: "Eligibility criteria — qualification for each post" },
      { type: "h3", text: "Engineer posts" },
      {
        type: "ul",
        items: [
          "Engineer (RE-Civil): BE / B.Tech / B.Sc. (Engg.) degree in Civil Engineering with 65% marks (55% for SC / ST / PwBD) plus 3 years of experience.",
          "Engineer (RE-Electrical): BE / B.Tech / B.Sc. (Engg.) in Electrical, Electrical & Electronics, Electrical Instrumentation & Control, Power Systems & High Voltage, Power Electronics or Power Engineering with 65% marks (55% for SC / ST / PwBD) plus 3 years of experience.",
          "Engineer (RE-Mechanical): BE / B.Tech / B.Sc. (Engg.) in Mechanical, Production, Industrial, Production & Industrial or Power Engineering with 65% marks (55% for SC / ST / PwBD) plus 3 years of experience.",
          "Engineer (RE-Safety): Engineering degree in Mechanical, Production, Electrical, Civil or Power Engineering with 65% marks along with a full-time Diploma in Industrial Safety, or a full-time engineering degree in Industrial Safety / Fire & Safety with 65% marks, plus 3 years of experience.",
        ],
      },
      { type: "h3", text: "Executive posts" },
      {
        type: "ul",
        items: [
          "Executive (RE-HR): Bachelor degree with a Master degree, PG Diploma or PG Programme in Management specialising in Human Resources, Industrial Relations or Personnel Management, or MHROD or MBA (HR), with 65% marks plus 3 years of experience.",
          "Executive (RE-Finance): CA or CMA with a minimum of 1 year post-qualification executive experience in Finance or Accounts, excluding the articleship period.",
          "Executive (RE-CSR): PG Degree, PG Diploma or PG Programme in rural or social development streams, MSW, MBA, or an engineering graduate with 65% marks plus 3 years of experience.",
          "Executive (RE-Rajbhasha): Master degree in Hindi or English with the prescribed subject combination given in the notification, plus 3 years of experience.",
        ],
      },
      { type: "h3", text: "Age limit" },
      {
        type: "p",
        text: "The maximum age limit is 35 years as per Advt. No. 04/26. Upper age relaxation is available to SC, ST, OBC (non-creamy layer), PwBD and ex-servicemen candidates as per the Government of India norms adopted by NGEL. Candidates should confirm the exact cut-off date for age calculation from the official notification.",
      },
      { type: "h2", text: "Application fee" },
      {
        type: "table",
        headers: ["Category", "Fee"],
        rows: [
          ["General / OBC / EWS", "Rs. 500"],
          ["SC / ST / PwBD", "Nil"],
          ["All female candidates (all categories)", "Nil"],
          ["Payment mode", "Online — debit card, credit card, net banking or UPI"],
        ],
      },
      { type: "h2", text: "NTPC NGEL Engineer & Executive salary in 2026" },
      {
        type: "p",
        text: "Engineer and Executive posts are E2 grade appointments carrying an IDA pay scale of Rs. 50,000 to Rs. 1,60,000 per month. On top of basic pay, NGEL pays Industrial Dearness Allowance revised quarterly, HRA or company accommodation, perks and allowances under the cafeteria approach (up to a percentage of basic pay), performance related pay, and employer contribution to NPS.",
      },
      {
        type: "table",
        headers: ["Component", "Indicative amount at entry"],
        rows: [
          ["Basic pay (E2 grade)", "Rs. 50,000 per month"],
          ["Industrial DA", "As per the quarterly IDA rate notified by DPE"],
          ["Perks & allowances (cafeteria)", "A defined percentage of basic pay, chosen by the employee"],
          ["HRA / company accommodation", "As per posting location and NGEL rules"],
          ["Performance related pay", "Linked to company and individual performance rating"],
          ["Retirement benefits", "NPS employer contribution, gratuity and post-retirement medical scheme"],
        ],
        caption:
          "Indicative structure only — actual CTC depends on posting location, IDA rate and company circulars.",
      },
      {
        type: "callout",
        tone: "info",
        title: "How the 8th Pay Commission affects PSU pay",
        text: "Central PSU employees such as NGEL executives are paid on the IDA pattern, so the 8th Pay Commission does not revise their scales directly. PSU pay revision happens through a separate DPE pay revision committee, but a higher central fitment factor usually influences the benchmark used for the next PSU revision cycle.",
      },
      { type: "h2", text: "Selection process" },
      {
        type: "ol",
        items: [
          "Online registration and submission of the application form with scanned photograph, signature and supporting documents.",
          "Shortlisting on the basis of qualification, percentage of marks, relevant experience and age criteria.",
          "Computer based written test or technical assessment, if conducted for the discipline.",
          "Personal interview to assess technical depth, project experience and role fit.",
          "Document verification and pre-employment medical examination.",
          "Final merit list and issue of appointment letters for posting at NGEL projects.",
        ],
      },
      { type: "h2", text: "How to apply online for NTPC NGEL Recruitment 2026" },
      {
        type: "ol",
        items: [
          "Keep your degree certificates, mark sheets, experience letters, category certificate, photo ID, photograph and signature scanned and ready before you start.",
          "Open the NGEL careers section on the official website and select the Engineer and Executive recruitment advertisement 04/26.",
          "Register with a valid email ID and mobile number, then complete the detailed application form with academic, experience and personal details.",
          "Upload the scanned photograph, signature and required documents in the prescribed size and format.",
          "Pay Rs. 500 online if you belong to General, OBC or EWS category; SC, ST, PwBD and all female candidates are exempt.",
          "Verify the preview page carefully, submit the form and save or print the final confirmation page and fee receipt.",
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: "Documents to keep handy",
        text: "Experience certificates with exact joining and relieving dates, a consolidated percentage calculation from your degree mark sheets, and a valid category certificate in the government format are the three items that most often delay a PSU application.",
      },
      { type: "h2", text: "Why NGEL is a strong career move" },
      {
        type: "p",
        text: "NTPC Green Energy Limited is the dedicated renewable energy subsidiary of NTPC and is scaling a multi-gigawatt pipeline of solar, wind, hybrid and green hydrogen projects. An E2 entry here places you on the executive career ladder of a Maharatna group company, with structured promotions to E3 and above, project exposure across states, and the stability of central PSU service conditions.",
      },
    ],

    faq: [
      {
        q: "How many posts are there in NTPC NGEL Recruitment 2026?",
        a: "There are 147 posts in total under Advt. No. 04/26 — 43 Engineer (RE-Civil), 69 Engineer (RE-Electrical), 9 Engineer (RE-Mechanical), 7 Engineer (RE-Safety), 4 Executive (RE-HR), 9 Executive (RE-Finance), 5 Executive (RE-CSR) and 1 Executive (RE-Rajbhasha).",
      },
      {
        q: "What are the NTPC NGEL 2026 online application dates?",
        a: "The online application begins on 18 August 2026 and the last date to apply is 7 September 2026 up to 6:00 PM. The application fee must also be paid by 7 September 2026.",
      },
      {
        q: "What is the salary of an NGEL Engineer or Executive?",
        a: "Selected candidates are appointed in the E2 grade with an IDA pay scale of Rs. 50,000 to Rs. 1,60,000 per month, plus Industrial Dearness Allowance, HRA or company accommodation, cafeteria perks and allowances, performance related pay and NPS contribution.",
      },
      {
        q: "What is the age limit for NTPC NGEL Recruitment 2026?",
        a: "The maximum age is 35 years, with relaxation for SC, ST, OBC (NCL), PwBD and ex-servicemen candidates as per the rules followed by NGEL. Check the official notification for the exact cut-off date.",
      },
      {
        q: "How much experience is required to apply?",
        a: "Most Engineer and Executive posts require a minimum of 3 years of post-qualification executive experience in the relevant discipline. Executive (RE-Finance) requires only 1 year of post-qualification experience after CA or CMA, excluding articleship.",
      },
      {
        q: "What is the application fee and who is exempt?",
        a: "General, OBC and EWS candidates pay Rs. 500. SC, ST and PwBD candidates and all female candidates of every category are fully exempt from the fee.",
      },
      {
        q: "How are candidates selected for NGEL Engineer and Executive posts?",
        a: "Applications are shortlisted on qualification, marks, experience and age, followed by a written test or technical assessment where applicable, a personal interview, document verification and a pre-employment medical examination before the final merit list is issued.",
      },
      {
        q: "Will the 8th Pay Commission increase NGEL salaries?",
        a: "No, not directly. NGEL executives are on the IDA pay pattern, which is revised through a DPE pay revision committee for central PSUs rather than by the Central Pay Commission. However, a higher central fitment factor typically shapes the benchmark for the next PSU pay revision.",
      },
    ],
  },
  {
    slug: "rvunl-recruitment-2026-je-junior-accountant-junior-assistant",
    title:
      "RVUNL Recruitment 2026: 2005 Junior Engineer, Junior Accountant & Junior Assistant Vacancies — Apply Online Till 25 August",
    description:
      "RVUNL Recruitment 2026 (Advt. RVUN/Rectt.-2026-27/03) for 2005 Junior Engineer-I, Junior Accountant and Junior Assistant / Commercial Assistant-II posts in Rajasthan power companies — vacancy, eligibility, age limit, fee, Level-10 and Level-5 salary, exam pattern and PDF downloads.",
    keyword:
      "rvunl recruitment 2026, rvunl je vacancy 2026, rajasthan vidyut vibhag bharti 2026, rvunl junior assistant 2026, rvunl junior accountant salary, rvunl 2005 post notification pdf",
    organization:
      "Rajasthan Rajya Vidyut Utpadan Nigam Ltd. (RVUN) — for RVUN, RVPN, JVVN, AVVN & JdVVN",
    postName:
      "Junior Engineer-I (Electrical / Mechanical / Civil), Junior Accountant & Junior Assistant / Commercial Assistant-II",
    vacancies: "2005 posts across five Rajasthan state power companies",
    qualification:
      "B.E. / B.Tech. / AMIE in Electrical, Mechanical or Civil Engineering for Junior Engineer-I; Commerce / BBA / M.Com / MBA / Inter CA-ICWA plus computer certificate for Junior Accountant; 12th pass plus computer certificate (RSCIT / O-Level / COPA) for Junior Assistant / Commercial Assistant-II",
    ageLimit:
      "21 to 40 years for Junior Engineer-I and 18 to 40 years for Junior Accountant and Junior Assistant as on 01.01.2027 (relaxable up to 43 years, plus category relaxation)",
    payScale:
      "Pay Matrix Level-10 (basic Rs. 33,800) for Junior Engineer-I and Junior Accountant; Level-5 (basic Rs. 20,800) for Junior Assistant / Commercial Assistant-II",
    location: "Rajasthan (RVUN, RVPN, JVVN, AVVN and JdVVN units)",
    applicationFee:
      "Rs. 1,000 for UR / General and Rs. 500 for SC / ST / BC / MBC / EWS / PwBD / Saharia candidates (inclusive of GST, non-refundable)",
    applyStart: "2026-08-05",
    applyEnd: "2026-08-25",
    applyUrl: "https://energy.rajasthan.gov.in/",
    organizationUrl: "https://energy.rajasthan.gov.in/",
    salaryMin: 20800,
    salaryMax: 33800,
    salaryUnit: "MONTH",
    salaryCurrency: "INR",
    employmentType: "FULL_TIME",
    noticeNumber: "RVUN/Rectt.-2026-27/03",
    industry: "Power Generation, Transmission & Distribution / State Government Undertaking",
    occupationalCategory: "17-2199.00 Engineers, All Other",
    experienceRequirements:
      "No prior experience required — fresher engineers, commerce graduates and 12th-pass candidates with a computer certificate are eligible",
    educationRequirements:
      "Engineering degree (B.E. / B.Tech. / AMIE) for Junior Engineer-I; graduation in Commerce or Business Administration for Junior Accountant; Senior Secondary (12th) pass for Junior Assistant / Commercial Assistant-II",
    jobBenefits:
      "Dearness Allowance, House Rent Allowance, Transport Allowance, medical facilities, pension contribution and future pay revision benefit under the 8th Pay Commission / Rajasthan pay rules",
    numberOfPositions: 2005,
    applicantLocationRequirements: "India",
    jobStartDate: "2026-11-01",
    directApply: false,

    downloads: [
      {
        label: "Notification Summary PDF (2005 Posts)",
        href: "/downloads/rvunl-recruitment-2026/rvunl-recruitment-2026-notification-summary.pdf",
        note: "Overview, post-wise vacancy, pay level and application fee in one sheet",
      },
      {
        label: "Eligibility, Qualification & Age Limit PDF",
        href: "/downloads/rvunl-recruitment-2026/rvunl-recruitment-2026-eligibility-and-age-limit.pdf",
        note: "Post-wise qualification, age relaxation table and document checklist",
      },
      {
        label: "Exam Pattern & Syllabus Guide PDF",
        href: "/downloads/rvunl-recruitment-2026/rvunl-recruitment-2026-exam-pattern-and-syllabus.pdf",
        note: "CBT Part-A / Part-B weightage, typing test scheme and qualifying marks",
      },
    ],
    category: "Rajasthan Govt Jobs",
    date: "2026-08-20",
    updated: "2026-08-20",
    readMinutes: 8,
    hero: "from-amber-500/30 to-orange-500/20",
    image: "https://paycommissionnews.co.in/images/rvunl-recruitment-2026.jpg",
    imageAlt:
      "RVUNL Recruitment 2026 — 2005 Junior Engineer, Junior Accountant and Junior Assistant vacancies in Rajasthan power companies",
    ogImage: "https://paycommissionnews.co.in/images/og/rvunl-recruitment-2026-og.jpg",
    lang: "en",

    excerpt:
      "Rajasthan Rajya Vidyut Utpadan Nigam Ltd. has opened online applications for 2005 Junior Engineer-I, Junior Accountant and Junior Assistant / Commercial Assistant-II posts under a Common Recruitment Exercise for five state power companies. Applications close on 25 August 2026, there is no interview, and every reference PDF is downloadable below.",
    body: [
      {
        type: "p",
        text: "Rajasthan Rajya Vidyut Utpadan Nigam Ltd. (RVUN) has invited online applications for 2005 vacancies under Advertisement No. RVUN/Rectt.-2026-27/03. This is a Common Recruitment Exercise conducted on behalf of five state power companies — RVUN, RVPN, JVVN, AVVN and JdVVN — covering Junior Engineer-I (Electrical / Mechanical / Civil), Junior Accountant and Junior Assistant / Commercial Assistant-II posts.",
      },
      {
        type: "p",
        text: "The online application window runs from 5 August 2026 (10:00 AM) to 25 August 2026 (12:00 midnight), and the fee must also be paid by 25 August 2026. Selection is entirely exam-based: a Computer Based Test for every post, with an additional Hindi and English typing test for the Junior Assistant / Commercial Assistant-II cadre. There is no interview at any stage.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Why this recruitment matters for your pay",
        text: "Junior Engineer-I and Junior Accountant sit in Pay Matrix Level-10 with a minimum basic of Rs. 33,800, while Junior Assistant sits in Level-5 at Rs. 20,800. If Rajasthan mirrors the 8th Pay Commission with a fitment factor of about 2.0 to 2.28, a Level-10 basic of Rs. 33,800 could be re-fixed to roughly Rs. 67,600 to Rs. 77,100 — model your own figure with our salary and fitment tools.",
      },
      { type: "h2", text: "RVUNL Recruitment 2026 — key highlights" },
      {
        type: "table",
        headers: ["Particular", "Details"],
        rows: [
          ["Recruiting body", "Rajasthan Rajya Vidyut Utpadan Nigam Ltd. (RVUN)"],
          ["Participating companies", "RVUN, RVPN, JVVN, AVVN and JdVVN"],
          ["Advertisement number", "RVUN/Rectt.-2026-27/03"],
          [
            "Posts",
            "Junior Engineer-I (Electrical / Mechanical / Civil), Junior Accountant, Junior Assistant / Commercial Assistant-II",
          ],
          ["Total vacancies", "2005"],
          ["Application mode", "Online only"],
          ["Application dates", "5 August 2026 (10:00 AM) to 25 August 2026 (12:00 midnight)"],
          ["Selection", "Computer Based Test; typing test additionally for Junior Assistant / Commercial Assistant-II"],
          ["Interview", "Not applicable — no interview for any post"],
          ["Job location", "Across Rajasthan"],
        ],
        caption: "Snapshot of the Common Recruitment Exercise 2026 as per the official advertisement.",
      },
      { type: "h2", text: "Post-wise vacancy details (2005 posts)" },
      {
        type: "table",
        headers: ["Post", "Vacancies", "Required qualification"],
        rows: [
          ["Junior Engineer-I (Electrical)", "727", "B.E. / B.Tech. / AMIE in Electrical Engineering"],
          ["Junior Engineer-I (Mechanical)", "110", "B.E. / B.Tech. / AMIE in Mechanical Engineering"],
          ["Junior Engineer-I (Civil)", "32", "B.E. / B.Tech. / AMIE in Civil Engineering"],
          [
            "Junior Accountant",
            "371",
            "Graduation in Commerce / BBA, or Inter CA / ICWA, or MBA, or 2-year M.Com plus computer certificate",
          ],
          [
            "Junior Assistant / Commercial Assistant-II",
            "765",
            "Senior Secondary (12th) pass plus RSCIT / O-Level / COPA computer certificate",
          ],
          ["Total", "2005", "—"],
        ],
        caption:
          "A candidate may apply for two or more different posts, but only one application per post is permitted.",
      },
      {
        type: "p",
        text: "Company preference (RVUN / RVPN / JVVN / AVVN / JdVVN) has to be recorded inside the application itself and is treated as final and irrevocable, so decide your preference order before you reach the final submit step.",
      },
      { type: "h2", text: "Important dates" },
      {
        type: "ul",
        items: [
          "Online application starts: 5 August 2026 at 10:00 AM",
          "Last date to submit the online application: 25 August 2026 up to 12:00 midnight",
          "Last date for online fee payment: 25 August 2026",
          "Computer Based Test date: to be announced on the Nigam portals",
          "Typing test for Junior Assistant / Commercial Assistant-II: to be announced after the main exam",
        ],
      },
      { type: "h2", text: "Application fee" },
      {
        type: "table",
        headers: ["Category", "Fee payable (including GST)"],
        rows: [
          ["UR / General", "Rs. 1,000"],
          ["SC / ST / BC / MBC / EWS / PwBD / Saharia area candidates", "Rs. 500"],
          ["Reserved-category candidates of states other than Rajasthan", "Rs. 1,000 (treated as General)"],
        ],
        caption:
          "The fee is non-refundable and cannot be carried forward; bank transaction charges are borne by the candidate.",
      },
      { type: "h2", text: "Eligibility criteria" },
      { type: "h3", text: "Educational qualification" },
      {
        type: "ul",
        items: [
          "Junior Engineer-I: full-time four-year B.E. / B.Tech. / AMIE degree in the respective engineering discipline from a recognised university.",
          "Junior Accountant: graduation in Commerce or Business Administration, or Inter CA / ICWA, or MBA, or a minimum two-year M.Com, along with a recognised computer qualification.",
          "Junior Assistant / Commercial Assistant-II: Senior Secondary (12th) pass with a recognised computer qualification such as RSCIT, O-Level or COPA.",
        ],
      },
      { type: "h3", text: "Age limit as on 1 January 2027" },
      {
        type: "table",
        headers: ["Post", "Age limit"],
        rows: [
          [
            "Junior Engineer-I (Electrical / Mechanical / Civil)",
            "21 to 40 years (up to 43 years in RVPN for Electrical and Civil disciplines)",
          ],
          [
            "Junior Accountant",
            "18 to 40 years, relaxed up to 43 years since direct recruitment was not held in the previous three years",
          ],
          [
            "Junior Assistant / Commercial Assistant-II",
            "18 to 40 years, relaxed up to 43 years since direct recruitment was not held in the previous three years",
          ],
        ],
      },
      { type: "h3", text: "Age relaxation" },
      {
        type: "ul",
        items: [
          "5 years for male candidates of SC / ST / BC / MBC / EWS and for women candidates of the Unreserved category",
          "10 years for women candidates of SC / ST / BC / MBC / EWS categories",
          "Additional 5 years for Persons with Benchmark Disabilities, over and above the category relaxation",
          "No upper age limit for widows, divorced women and in-service candidates applying within the same Nigam",
        ],
      },
      { type: "h2", text: "RVUNL salary 2026 — pay matrix level and probation pay" },
      {
        type: "p",
        text: "Selected candidates are first engaged as Probationer Trainees for two years on a fixed monthly remuneration. After successful completion of probation, pay is fixed at the minimum of the applicable pay matrix level, and all allowances of the respective Vidyut Nigam become payable.",
      },
      {
        type: "table",
        headers: ["Post", "Pay matrix level", "Minimum basic pay", "Fixed pay during probation"],
        rows: [
          ["Junior Engineer-I (Electrical / Mechanical / Civil)", "Level-10", "Rs. 33,800", "Rs. 23,700"],
          ["Junior Accountant", "Level-10", "Rs. 33,800", "Rs. 23,700"],
          ["Junior Assistant / Commercial Assistant-II", "Level-5", "Rs. 20,800", "Rs. 14,600"],
        ],
        caption: "Allowances such as DA, HRA and Transport Allowance are paid as per Nigam rules after probation.",
      },
      {
        type: "p",
        text: "In practice, a Level-10 employee with current DA and HRA draws a gross salary in the region of Rs. 50,000 to Rs. 58,000 per month depending on the posting city, while Level-5 works out to roughly Rs. 32,000 to Rs. 38,000. Use our salary calculator and pay matrix tools to see the exact figure for your level and city class.",
      },
      { type: "h2", text: "Selection process and exam pattern" },
      { type: "h3", text: "Junior Engineer-I and Junior Accountant" },
      {
        type: "ul",
        items: [
          "One Computer Based Test of two hours with objective (MCQ) questions only.",
          "Part-A carries 60% weightage — degree-level subject questions of the engineering discipline for JE, and Corporate Accounting, Income Tax, Cost Accounting, Auditing and Management Accounting for Junior Accountant.",
          "Part-B carries 40% weightage — Reasoning & Mental Ability, Mathematics, General Knowledge & Everyday Science, Hindi General and English General.",
          "Negative marking applies for every wrong answer.",
        ],
      },
      { type: "h3", text: "Junior Assistant / Commercial Assistant-II" },
      {
        type: "ol",
        items: [
          "Phase-I Pre-Examination — screening only, with no weightage in the final merit and no negative marking.",
          "Phase-I Main Examination — objective CBT with negative marking, contributing 40% weightage to the final merit.",
          "Phase-II Typing Test — Hindi and English typing on computer (speed test and efficiency test), contributing 60% weightage.",
        ],
      },
      {
        type: "p",
        text: "For all posts the minimum qualifying marks are 30% for Unreserved candidates and 20% for SC / ST / BC / MBC / EWS / Ex-servicemen / PwBD candidates. Except the Hindi General and English General sections, the question papers are bilingual.",
      },
      { type: "h2", text: "How to apply online" },
      {
        type: "ol",
        items: [
          "Open the Rajasthan Energy Department portal or the respective Nigam portal (RVUN, RVPN, JVVN, AVVN, JdVVN).",
          "Click the Apply Online link for Advertisement No. RVUN/Rectt.-2026-27/03 and choose your post.",
          "Register with your name, mobile number and email ID to generate a provisional registration number and password.",
          "Log in and fill in personal, educational and category details exactly as printed on your certificates.",
          "Upload the photograph, signature, left thumb impression and handwritten declaration in the prescribed format.",
          "Record your company preference carefully — it cannot be changed after final submission.",
          "Preview the form, submit it, pay the applicable fee online and download the e-receipt with the filled application.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Before you submit",
        text: "Verify every vacancy figure, date and eligibility condition against the official advertisement on the Rajasthan Energy Department portal. Vacancies and dates can be revised through corrigendum notices.",
      },
    ],
    faq: [
      {
        q: "How many vacancies are there in RVUNL Recruitment 2026?",
        a: "A total of 2005 vacancies are notified — 727 Junior Engineer-I (Electrical), 110 Junior Engineer-I (Mechanical), 32 Junior Engineer-I (Civil), 371 Junior Accountant and 765 Junior Assistant / Commercial Assistant-II posts.",
      },
      {
        q: "What is the last date to apply for RVUNL Recruitment 2026?",
        a: "The online application closes on 25 August 2026 at 12:00 midnight, and the application fee must also be paid by 25 August 2026.",
      },
      {
        q: "What is the salary of RVUNL Junior Engineer and Junior Assistant?",
        a: "Junior Engineer-I and Junior Accountant are Pay Matrix Level-10 posts with a minimum basic pay of Rs. 33,800 per month, while Junior Assistant / Commercial Assistant-II is a Level-5 post with Rs. 20,800 basic. During the two-year probation the fixed remuneration is Rs. 23,700 and Rs. 14,600 per month respectively.",
      },
      {
        q: "What is the age limit for RVUNL Recruitment 2026?",
        a: "As on 1 January 2027, Junior Engineer-I applicants must be 21 to 40 years old (up to 43 years in RVPN for Electrical and Civil), while Junior Accountant and Junior Assistant applicants must be 18 to 40 years old, relaxable up to 43 years, with further category relaxation of 5 to 10 years.",
      },
      {
        q: "Is there an interview in RVUNL Recruitment 2026?",
        a: "No. Selection is based only on the Computer Based Test, with an additional Hindi and English typing test for the Junior Assistant / Commercial Assistant-II post.",
      },
      {
        q: "What is the application fee for RVUNL Recruitment 2026?",
        a: "Rs. 1,000 including GST for UR / General candidates and Rs. 500 for SC / ST / BC / MBC / EWS / PwBD and Saharia area candidates. Reserved-category candidates from outside Rajasthan pay the General fee.",
      },
      {
        q: "Can I apply for more than one post in this RVUNL recruitment?",
        a: "Yes, you may apply for two or more different posts, but you cannot submit more than one application for the same post. Your company preference given in the form is final and cannot be changed later.",
      },
      {
        q: "Where can I download the RVUNL Recruitment 2026 notification and syllabus PDF?",
        a: "The notification summary, eligibility and age limit sheet, and the exam pattern and syllabus guide are all available in the download section of this page.",
      },
    ],
  },
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
