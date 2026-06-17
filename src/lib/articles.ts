// Article data for the 8th CPC blog. Long-form, SEO-optimized content
// targeting high-volume Indian search terms around the 8th Pay Commission.
// All projections use indicative figures; nothing is official until the
// Government of India notifies the commission's recommendations.

export type Article = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  readMinutes: number;
  date: string; // ISO
  updated: string; // ISO
  category: string;
  hero: string; // gradient class
  excerpt: string;
  // Rich content as structured blocks so we can render with consistent styling.
  body: Block[];
  faq: { q: string; a: string }[];
};

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: "info" | "warn" | "success"; title: string; text: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    }
  | { type: "quote"; text: string; cite?: string };

const TODAY = "2026-06-17";

export const articles: Article[] = [
  {
    slug: "8th-pay-commission-2026-latest-news-implementation-date",
    title:
      "8th Pay Commission 2026: Latest News, Implementation Date & Expected Salary Hike",
    description:
      "Latest 8th Pay Commission news for 2026 — formation status, expected implementation date, fitment factor, and how the salary hike will affect 1 crore central government employees and pensioners.",
    keyword: "8th pay commission 2026",
    readMinutes: 9,
    date: "2026-01-20",
    updated: TODAY,
    category: "News",
    hero: "from-indigo-500 via-violet-500 to-fuchsia-500",
    excerpt:
      "The Union Cabinet's in-principle approval for the 8th Pay Commission has set the stage for India's biggest pay revision since 2016. Here is everything we know so far.",
    body: [
      {
        type: "p",
        text: "The 8th Central Pay Commission (8th CPC) is shaping up to be the most consequential pay revision in a decade for nearly 50 lakh central government employees and 65 lakh pensioners. After the Union Cabinet's in-principle approval in January 2025, the formal Terms of Reference, chairperson appointment, and the all-important implementation date have dominated headlines through 2025 and 2026.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick summary",
        text: "Expected implementation: 1 January 2026 (with arrears if notified later). Expected fitment factor: 2.28x to 2.86x. Beneficiaries: ~1.15 crore employees, pensioners & family pensioners including defence personnel.",
      },
      { type: "h2", text: "Latest 8th Pay Commission news at a glance" },
      {
        type: "ul",
        items: [
          "Cabinet gave in-principle approval in January 2025 to constitute the 8th CPC.",
          "Terms of Reference (ToR) are being finalised in consultation with the Department of Expenditure, DoPT and the Ministry of Defence.",
          "Staff Side of the National Council (JCM) has demanded a fitment factor of 2.86 and full neutralisation of DA at 50% merger.",
          "Implementation is expected from 1 January 2026, mirroring the 10-year cycle followed since the 4th CPC.",
          "Arrears are likely if the recommendations are notified in late 2026 or 2027, similar to the 7th CPC pattern.",
        ],
      },
      { type: "h2", text: "When will the 8th Pay Commission be implemented?" },
      {
        type: "p",
        text: "Historically, every Central Pay Commission has been implemented from 1 January of its base year — the 6th CPC from 1 January 2006 and the 7th CPC from 1 January 2016. Following the same 10-year cycle, the 8th CPC is widely expected to take effect from 1 January 2026. However, formal notification typically lags by 12 to 24 months, which means employees can expect arrears credited in two or three instalments once the report is accepted.",
      },
      { type: "h2", text: "Who is covered by the 8th CPC?" },
      {
        type: "ul",
        items: [
          "All central government civilian employees across ministries and departments.",
          "Defence forces — Army, Navy, Air Force — including JCOs and other ranks.",
          "Central Armed Police Forces (CAPF): CRPF, BSF, CISF, ITBP, SSB.",
          "Indian Railways employees (Group A to Group C).",
          "Central government pensioners and family pensioners.",
          "Autonomous bodies, statutory bodies and most PSUs that mirror CPC pay scales.",
        ],
      },
      { type: "h2", text: "Expected salary hike under the 8th Pay Commission" },
      {
        type: "p",
        text: "The headline number every employee is asking about is the percentage hike in basic pay. Industry estimates put the average revision in the 25%–34% range, driven primarily by the fitment factor. Here is an indicative projection across pay-matrix levels.",
      },
      {
        type: "table",
        caption:
          "Indicative 8th CPC basic pay projection at fitment factor 2.28 (illustrative).",
        headers: ["Level", "7th CPC Basic (₹)", "8th CPC Basic (₹)", "Hike"],
        rows: [
          ["Level 1", "18,000", "41,000", "+128%*"],
          ["Level 4", "25,500", "58,140", "+128%*"],
          ["Level 6", "35,400", "80,712", "+128%*"],
          ["Level 7", "44,900", "1,02,372", "+128%*"],
          ["Level 10", "56,100", "1,27,908", "+128%*"],
          ["Level 13", "1,23,100", "2,80,668", "+128%*"],
          ["Level 14", "1,44,200", "3,28,776", "+128%*"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Reading the numbers",
        text: "*The fitment factor multiplies the existing basic pay. The headline hike looks large because the 7th CPC basic pay does not include DA. After accounting for the existing DA of ~53%, the effective in-hand increase is closer to 25%–32%.",
      },
      { type: "h2", text: "Fitment factor: the most important number" },
      {
        type: "p",
        text: "The fitment factor is the single multiplier applied to existing basic pay to arrive at the new basic pay. The 7th CPC fixed it at 2.57. Staff unions and the National Council (JCM) have demanded 2.86 for the 8th CPC, citing inflation and parity with private-sector revisions. A more conservative analyst estimate hovers at 2.28, which still produces a meaningful hike once DA is reset.",
      },
      { type: "h2", text: "Impact on Dearness Allowance (DA) and HRA" },
      {
        type: "p",
        text: "On the date of implementation, DA is reset to zero because the existing DA is merged into the new basic pay through the fitment factor. HRA slabs are also rationalised — typically 27% (X cities), 18% (Y cities) and 9% (Z cities) with a floor amount. This re-baselining briefly compresses the gap between basic pay and gross pay, but DA begins climbing again from the very next half-yearly revision.",
      },
      { type: "h2", text: "What pensioners can expect" },
      {
        type: "p",
        text: "Pensioners receive a revised basic pension calculated by multiplying their existing pension by the same fitment factor. Family pensioners get 30% of the revised basic pay, subject to floors. Dearness Relief (DR), like DA, resets to zero on the implementation date and starts accruing thereafter.",
      },
      { type: "h2", text: "How to estimate your revised salary today" },
      {
        type: "p",
        text: "Use our free 8th CPC salary calculator to model your revised basic pay, DA, HRA and gross salary against multiple fitment scenarios. Move the fitment slider from 2.0 to 3.0 to see best-case, base-case and conservative projections instantly.",
      },
    ],
    faq: [
      {
        q: "Is the 8th Pay Commission approved?",
        a: "The Union Cabinet granted in-principle approval in January 2025. Formal Terms of Reference and the chairperson appointment are pending, after which the commission will submit recommendations.",
      },
      {
        q: "When will the 8th Pay Commission be implemented?",
        a: "It is widely expected to take effect from 1 January 2026, in line with the 10-year cycle. Formal notification may come later with arrears.",
      },
      {
        q: "How much salary increase is expected in the 8th CPC?",
        a: "Effective in-hand hikes are estimated between 25% and 32% after DA reset, depending on the final fitment factor (2.28 to 2.86).",
      },
      {
        q: "Will state government employees get the 8th CPC?",
        a: "States are not bound by Central Pay Commissions, but most adopt the recommendations with state-specific modifications over the next 12 to 24 months.",
      },
    ],
  },
  {
    slug: "8th-pay-commission-fitment-factor-explained",
    title:
      "8th Pay Commission Fitment Factor Explained: Will It Be 2.28x or 2.86x?",
    description:
      "Understand how the 8th CPC fitment factor is calculated, why unions are demanding 2.86, and what 2.28 vs 2.57 vs 2.86 means for your revised basic pay across all pay matrix levels.",
    keyword: "8th pay commission fitment factor",
    readMinutes: 8,
    date: "2026-02-04",
    updated: TODAY,
    category: "Explainer",
    hero: "from-emerald-500 via-teal-500 to-cyan-500",
    excerpt:
      "The fitment factor is the single multiplier that decides your new salary. Here is how it is derived, what unions are demanding, and how each scenario plays out.",
    body: [
      {
        type: "p",
        text: "If only one number from the 8th Pay Commission matters to your in-hand salary, it is the fitment factor. It is the multiplier applied to your existing 7th CPC basic pay to arrive at the new 8th CPC basic pay. Every other component — DA, HRA, TA, NPS, pension — flows from that revised basic.",
      },
      { type: "h2", text: "What exactly is the fitment factor?" },
      {
        type: "p",
        text: "The fitment factor is a single decimal multiplier (for example 2.57 in the 7th CPC) that combines two things: (a) the inflation-adjusted value of the existing basic pay, and (b) an additional real increase to reflect productivity and parity with the private sector. The 6th CPC used 1.86; the 7th CPC moved it to 2.57.",
      },
      {
        type: "callout",
        tone: "info",
        title: "The formula",
        text: "New Basic Pay = Existing Basic Pay × Fitment Factor. Everything downstream — DA, HRA, NPS, gratuity, pension — is derived from this new basic.",
      },
      { type: "h2", text: "How is the fitment factor calculated?" },
      {
        type: "ol",
        items: [
          "Determine the existing DA percentage on the date of implementation (expected ~53–60% by January 2026).",
          "Convert that DA into a 'merged' base by adding it to existing basic pay (i.e. multiply basic by 1.53 to 1.60).",
          "Apply a real wage increase (the 7th CPC chose 14.29% on top of the merged base, taking the multiplier to 2.57).",
          "Round to a clean two-decimal number for administrative simplicity.",
        ],
      },
      { type: "h2", text: "The three fitment scenarios for the 8th CPC" },
      {
        type: "table",
        caption: "How each fitment factor changes Level 7 basic pay (currently ₹44,900).",
        headers: ["Scenario", "Fitment", "New Basic", "Real Hike*"],
        rows: [
          ["Conservative", "2.28", "₹1,02,372", "~13%"],
          ["Base case", "2.57", "₹1,15,393", "~27%"],
          ["Union demand", "2.86", "₹1,28,414", "~41%"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "*Real hike, not headline hike",
        text: "Real hike compares the new basic to the existing basic + DA. The flashy 'New basic is 128% of old basic' figure ignores the DA you are already receiving.",
      },
      { type: "h2", text: "Why unions are demanding 2.86" },
      {
        type: "p",
        text: "The Staff Side of the National Council (JCM) argues that the 7th CPC's 14.29% real increase did not adequately compensate for inflation in essentials, healthcare and education between 2016 and 2026. Their submission proposes a 29% real increase, which combined with a 60% DA merger produces a fitment factor of approximately 2.86.",
      },
      { type: "h2", text: "Fitment factor by pay matrix level — projection table" },
      {
        type: "table",
        caption: "Indicative new basic pay at fitment factor 2.57 (7th CPC value retained).",
        headers: ["Level", "Existing Basic (₹)", "New Basic at 2.57 (₹)", "Sample role"],
        rows: [
          ["1", "18,000", "46,260", "MTS"],
          ["2", "19,900", "51,143", "LDC"],
          ["4", "25,500", "65,535", "Assistant"],
          ["6", "35,400", "90,978", "Inspector"],
          ["7", "44,900", "1,15,393", "Section Officer"],
          ["10", "56,100", "1,44,177", "Group A entry"],
          ["11", "67,700", "1,73,989", "Under Secretary"],
          ["13", "1,23,100", "3,16,367", "Director"],
          ["14", "1,44,200", "3,70,594", "Joint Secretary"],
        ],
      },
      { type: "h2", text: "Will pensioners get the same fitment factor?" },
      {
        type: "p",
        text: "Yes. The 6th and 7th CPCs both applied the same fitment factor to existing basic pensions. Pensioners can expect their basic pension to be multiplied by the final fitment factor, with Dearness Relief resetting to zero on the implementation date.",
      },
      { type: "h2", text: "Calculate your own scenario" },
      {
        type: "p",
        text: "Open the 8th CPC salary calculator, select your pay matrix level, and drag the fitment slider from 2.0 to 3.0. The dashboard updates basic pay, HRA (X/Y/Z city), DA and gross monthly salary in real time.",
      },
    ],
    faq: [
      {
        q: "What is the expected fitment factor for the 8th Pay Commission?",
        a: "Analyst estimates range from 2.28 to 2.86. Unions are demanding 2.86; the 7th CPC value of 2.57 is widely seen as the base case.",
      },
      {
        q: "Is fitment factor the same as salary hike percentage?",
        a: "No. Fitment is a multiplier on basic pay; the real take-home hike after DA reset is typically 20%–32%.",
      },
      {
        q: "Does fitment factor apply to allowances?",
        a: "It applies to basic pay. Allowances (HRA, TA) are recalculated as percentages of the new basic. DA resets to zero on the implementation date.",
      },
      {
        q: "Will the same fitment factor apply to all levels?",
        a: "Historically, yes. Every CPC since the 6th has used a single fitment factor across all levels for simplicity and equity.",
      },
    ],
  },
  {
    slug: "8th-cpc-salary-calculator-how-to-use",
    title:
      "8th CPC Salary Calculator: How to Calculate Your Revised Pay & Pay Matrix",
    description:
      "Step-by-step guide to using the 8th CPC salary calculator. Learn how the pay matrix, fitment factor, DA percentage and HRA city classification interact to produce your revised monthly salary.",
    keyword: "8th cpc salary calculator",
    readMinutes: 7,
    date: "2026-02-18",
    updated: TODAY,
    category: "Calculator",
    hero: "from-amber-500 via-orange-500 to-rose-500",
    excerpt:
      "Six inputs — level, basic, city, DA%, fitment, pension scheme — produce a fully itemised revised salary. Here is how to use them.",
    body: [
      {
        type: "p",
        text: "An 8th CPC salary calculator is only as useful as the inputs you feed it. The good news: with six fields and the 7th CPC pay matrix as the reference, you can model your revised salary in under sixty seconds. This guide walks through each input and the math behind it.",
      },
      { type: "h2", text: "The six inputs that drive your salary" },
      {
        type: "ol",
        items: [
          "Pay matrix Level (1 to 18): identifies your grade and minimum basic.",
          "Current basic pay: the cell value from the 7th CPC pay matrix you currently hold.",
          "City class (X / Y / Z): determines HRA percentage (27% / 18% / 9%).",
          "DA percentage: current Dearness Allowance, typically 53–60% in 2026.",
          "Fitment factor: the multiplier (1.5 to 3.0) you want to model.",
          "Pension scheme: NPS (10% employee + 14% govt) or OPS (no contribution).",
        ],
      },
      { type: "h2", text: "Understanding the pay matrix" },
      {
        type: "p",
        text: "The 7th CPC replaced the older grade-pay system with a single two-dimensional matrix. Rows are pay levels (1 to 18) and columns are annual increment stages. Your current basic pay is simply the cell at the intersection of your level and your service years. The 8th CPC will retain this structure, multiplying every cell by the fitment factor.",
      },
      {
        type: "table",
        caption: "Pay matrix snapshot — first column (entry basic) per level.",
        headers: ["Level", "Entry Basic (7th CPC)", "Projected Entry Basic (Fitment 2.57)"],
        rows: [
          ["1", "₹18,000", "₹46,260"],
          ["2", "₹19,900", "₹51,143"],
          ["3", "₹21,700", "₹55,769"],
          ["4", "₹25,500", "₹65,535"],
          ["5", "₹29,200", "₹75,044"],
          ["6", "₹35,400", "₹90,978"],
          ["7", "₹44,900", "₹1,15,393"],
          ["8", "₹47,600", "₹1,22,332"],
          ["9", "₹53,100", "₹1,36,467"],
          ["10", "₹56,100", "₹1,44,177"],
        ],
      },
      { type: "h2", text: "How HRA works in the 8th CPC" },
      {
        type: "ul",
        items: [
          "X cities (population > 50 lakh): HRA at 27% of new basic, minimum ₹5,400.",
          "Y cities (5–50 lakh population): HRA at 18% of new basic, minimum ₹3,600.",
          "Z cities (below 5 lakh): HRA at 9% of new basic, minimum ₹1,800.",
        ],
      },
      {
        type: "p",
        text: "HRA percentages step up to 30/20/10% once DA crosses 50%. This is why HRA increases automatically with every DA revision cycle.",
      },
      { type: "h2", text: "Worked example: Section Officer in Delhi" },
      {
        type: "callout",
        tone: "info",
        title: "Inputs",
        text: "Level 7, current basic ₹44,900, X city (Delhi), DA 53%, fitment 2.57, NPS subscriber.",
      },
      {
        type: "table",
        caption: "Component-wise revised salary",
        headers: ["Component", "7th CPC (₹)", "8th CPC (₹)"],
        rows: [
          ["Basic Pay", "44,900", "1,15,393"],
          ["DA", "23,797 (53%)", "0 (reset)"],
          ["HRA", "12,123 (27%)", "31,156 (27%)"],
          ["TA + DA on TA", "5,508", "5,508"],
          ["Gross Salary", "86,328", "1,52,057"],
          ["NPS (-10%)", "-4,490", "-11,539"],
          ["Net (approx)", "~78,000", "~1,38,000"],
        ],
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "ul",
        items: [
          "Don't compare gross-to-gross without resetting DA — it understates the real hike.",
          "Don't forget the HRA floor: low-level employees in metros often benefit from minimum amounts.",
          "Don't ignore NPS: a higher basic increases your employer's 14% contribution too.",
          "Always check your pay matrix cell carefully — wrong cell means wrong everything.",
        ],
      },
    ],
    faq: [
      {
        q: "Is the 8th CPC salary calculator accurate?",
        a: "It produces indicative figures using the most commonly discussed assumptions. Final numbers depend on the notified fitment factor, DA on the implementation date, and rationalised HRA slabs.",
      },
      {
        q: "Do I need to know my pay matrix level?",
        a: "Yes. Your level (1 to 18) is printed on your salary slip and service record. The calculator uses it to determine the minimum entry basic.",
      },
      {
        q: "Does the calculator include arrears?",
        a: "The base calculator shows the monthly revised salary. Use the arrears tool (coming soon) to compute month-wise arrears from the effective date.",
      },
    ],
  },
  {
    slug: "8th-pay-commission-pensioners-revised-pension-da-arrears",
    title:
      "8th Pay Commission for Pensioners: Revised Pension, Dearness Relief & Arrears",
    description:
      "Complete guide for central government pensioners under the 8th Pay Commission — how the new basic pension is calculated, Dearness Relief reset, family pension changes and arrear payment timeline.",
    keyword: "8th pay commission pensioners",
    readMinutes: 8,
    date: "2026-03-05",
    updated: TODAY,
    category: "Pensioners",
    hero: "from-sky-500 via-blue-500 to-indigo-500",
    excerpt:
      "65 lakh central government pensioners stand to gain from the 8th CPC. Here is how your basic pension, DR and family pension will be revised.",
    body: [
      {
        type: "p",
        text: "More than 65 lakh central government pensioners — including defence pensioners — will see their basic pension revised when the 8th Pay Commission is implemented. The mechanism mirrors what happened in 2016 under the 7th CPC: a clean multiplier on existing basic pension, a reset of Dearness Relief, and rationalised family pension floors.",
      },
      { type: "h2", text: "How revised basic pension is calculated" },
      {
        type: "callout",
        tone: "info",
        title: "Formula",
        text: "Revised Basic Pension = Existing Basic Pension × Fitment Factor. Existing pension already excludes DR.",
      },
      {
        type: "table",
        caption: "Pension projection at three fitment scenarios.",
        headers: ["Existing Pension (₹)", "At 2.28 (₹)", "At 2.57 (₹)", "At 2.86 (₹)"],
        rows: [
          ["9,000", "20,520", "23,130", "25,740"],
          ["15,000", "34,200", "38,550", "42,900"],
          ["25,000", "57,000", "64,250", "71,500"],
          ["40,000", "91,200", "1,02,800", "1,14,400"],
          ["60,000", "1,36,800", "1,54,200", "1,71,600"],
          ["85,000", "1,93,800", "2,18,450", "2,43,100"],
          ["1,25,000", "2,85,000", "3,21,250", "3,57,500"],
        ],
      },
      { type: "h2", text: "Dearness Relief (DR) reset to zero" },
      {
        type: "p",
        text: "On the implementation date, DR is reset to zero — exactly like DA for serving employees. This is not a loss because the DR you were receiving is absorbed into the fitment factor itself. From the next half-yearly cycle, DR begins accruing again, typically at 3–4% per revision based on AICPI-IW.",
      },
      { type: "h2", text: "Family pension under the 8th CPC" },
      {
        type: "ul",
        items: [
          "Normal family pension: 30% of revised basic pay of the deceased employee.",
          "Enhanced family pension: 50% of last drawn basic pay for 7 years or until age 67, whichever is earlier.",
          "Minimum family pension floor expected to rise from ₹9,000 to ₹23,000+ depending on the fitment factor.",
        ],
      },
      { type: "h2", text: "Additional pension for elderly pensioners" },
      {
        type: "p",
        text: "The 6th and 7th CPCs preserved additional pension percentages for pensioners above 80. The 8th CPC is expected to continue these slabs:",
      },
      {
        type: "table",
        caption: "Additional pension by age slab",
        headers: ["Age", "Additional Pension"],
        rows: [
          ["80 – 85", "20% of basic pension"],
          ["85 – 90", "30%"],
          ["90 – 95", "40%"],
          ["95 – 100", "50%"],
          ["100 and above", "100%"],
        ],
      },
      { type: "h2", text: "Arrears: how and when" },
      {
        type: "p",
        text: "If the 8th CPC is notified in late 2026 or 2027 with effect from 1 January 2026, pensioners will receive arrears for the intervening months. The 7th CPC paid arrears in a single instalment in 2016. Pensioner associations are pressing for the same approach this time.",
      },
      { type: "h2", text: "Action checklist for pensioners" },
      {
        type: "ol",
        items: [
          "Keep your PPO (Pension Payment Order) number and bank passbook handy.",
          "Verify your Aadhaar is linked to your pension account for faster credit.",
          "Submit a life certificate (Jeevan Pramaan) annually to avoid pension suspension.",
          "Use a calculator to estimate your revised pension and check against the first revised credit.",
          "Raise grievances on the CPENGRAMS portal if revision is delayed beyond 90 days post-notification.",
        ],
      },
    ],
    faq: [
      {
        q: "Will pensioners get arrears in the 8th CPC?",
        a: "Yes. If the recommendations are notified after the effective date (1 January 2026), pensioners will receive arrears for the gap period.",
      },
      {
        q: "Does Dearness Relief continue at 53% after the 8th CPC?",
        a: "No. DR resets to zero on the implementation date because it is merged into the new basic pension via the fitment factor. DR then accrues fresh from the next cycle.",
      },
      {
        q: "What is the minimum pension under the 8th CPC?",
        a: "The minimum is expected to rise from ₹9,000 to approximately ₹20,500–₹25,700 depending on the final fitment factor.",
      },
      {
        q: "Is pension commutation possible under the 8th CPC?",
        a: "Yes. Commutation rules continue, and pensioners who have not commuted earlier can do so within one year of revision under specific conditions.",
      },
    ],
  },
  {
    slug: "8th-pay-commission-salary-hike-level-wise-pay-matrix",
    title:
      "8th Pay Commission Salary Hike: Level-Wise Pay Matrix & Take-Home Estimate",
    description:
      "Level-wise 8th CPC salary hike projection — see new basic pay, DA, HRA and net in-hand salary for every pay matrix level from MTS to Joint Secretary at fitment factors 2.28, 2.57 and 2.86.",
    keyword: "8th pay commission salary hike",
    readMinutes: 9,
    date: "2026-03-22",
    updated: TODAY,
    category: "Salary",
    hero: "from-pink-500 via-rose-500 to-red-500",
    excerpt:
      "From Level 1 MTS to Level 14 Joint Secretary, here is what every central government employee can expect in revised basic pay and take-home salary.",
    body: [
      {
        type: "p",
        text: "The 8th Pay Commission salary hike will not be a flat percentage across the board. It will be a multiplier applied uniformly to every pay matrix level, but the rupee impact differs dramatically depending on where you sit on the matrix. This article projects the revised salary level-by-level so you can find your row instantly.",
      },
      { type: "h2", text: "Salary hike — base case (fitment 2.57)" },
      {
        type: "table",
        caption: "Indicative revised gross salary at X-city HRA, fitment 2.57.",
        headers: ["Level", "Role example", "Old Basic", "New Basic", "Gross (X city)"],
        rows: [
          ["1", "MTS", "18,000", "46,260", "62,920"],
          ["2", "LDC", "19,900", "51,143", "69,554"],
          ["3", "Constable", "21,700", "55,769", "75,846"],
          ["4", "Assistant / Stenographer", "25,500", "65,535", "89,128"],
          ["5", "Senior Assistant", "29,200", "75,044", "1,02,060"],
          ["6", "Inspector", "35,400", "90,978", "1,23,730"],
          ["7", "Section Officer", "44,900", "1,15,393", "1,52,057"],
          ["8", "Senior SO", "47,600", "1,22,332", "1,66,371"],
          ["9", "Assistant Commandant", "53,100", "1,36,467", "1,85,595"],
          ["10", "Asst. Director (Group A)", "56,100", "1,44,177", "1,96,081"],
          ["11", "Under Secretary", "67,700", "1,73,989", "2,36,625"],
          ["12", "Deputy Secretary", "78,800", "2,02,516", "2,75,422"],
          ["13", "Director", "1,23,100", "3,16,367", "4,30,259"],
          ["14", "Joint Secretary", "1,44,200", "3,70,594", "5,03,968"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "How we built this table",
        text: "Basic × 2.57 fitment. HRA at 27% (X city). TA + DA on TA at ₹5,508 flat. DA reset to 0%. Net excludes income tax.",
      },
      { type: "h2", text: "Real take-home hike — not the headline number" },
      {
        type: "p",
        text: "On paper, basic pay jumps 157% (2.57x). But you are not currently receiving just your basic — you are receiving basic + 53% DA + HRA. The honest comparison is gross vs gross, which produces a 27%–32% real hike at fitment 2.57.",
      },
      {
        type: "table",
        caption: "Real vs headline hike — Section Officer (Level 7) example.",
        headers: ["Metric", "7th CPC (₹)", "8th CPC (₹)", "Real Change"],
        rows: [
          ["Basic", "44,900", "1,15,393", "+157%"],
          ["DA", "23,797", "0", "—"],
          ["HRA (X)", "12,123", "31,156", "—"],
          ["Gross", "86,328", "1,52,057", "+76% (headline)"],
          ["Gross after 12 months* ", "—", "~1,60,000", "+33% (real)"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "*After 12 months",
        text: "DA is expected to accrue at ~3% per half-year. By December 2026, gross salary rebuilds to the figure shown.",
      },
      { type: "h2", text: "Comparing 2.28 vs 2.57 vs 2.86 at Level 6 (Inspector)" },
      {
        type: "table",
        headers: ["Scenario", "Fitment", "New Basic", "Gross (X)"],
        rows: [
          ["Conservative", "2.28", "80,712", "1,09,768"],
          ["Base case", "2.57", "90,978", "1,23,730"],
          ["Union demand", "2.86", "1,01,244", "1,37,691"],
        ],
      },
      { type: "h2", text: "Defence personnel — Military Service Pay (MSP)" },
      {
        type: "p",
        text: "Defence personnel additionally receive Military Service Pay (MSP), currently ₹15,500 for officers and ₹5,200 for JCOs/ORs. MSP is expected to be revised proportionally and continue to be paid separately on top of revised basic pay.",
      },
      { type: "h2", text: "What about income tax?" },
      {
        type: "p",
        text: "The new tax regime offers a standard deduction of ₹75,000 and slabs that reduce effective tax for income up to ₹12 lakh. Higher gross salaries under the 8th CPC will push more employees into higher brackets, so the net take-home increase will be 3–5 percentage points lower than the gross hike.",
      },
      { type: "h2", text: "Run your own projection" },
      {
        type: "p",
        text: "Open the live 8th CPC salary calculator, select your level, set DA percentage and city, then move the fitment slider to see best-case, base-case and conservative projections side by side. Save the URL — your inputs are encoded so you can share with colleagues.",
      },
    ],
    faq: [
      {
        q: "What is the expected percentage hike in the 8th Pay Commission?",
        a: "The headline hike in basic pay is 128%–186% (fitment 2.28–2.86), but the real gross-to-gross take-home hike after DA reset is 25%–35%.",
      },
      {
        q: "Will the salary hike be same for all levels?",
        a: "The fitment multiplier is the same across all levels, but the rupee impact scales with your current basic pay — higher levels see a larger absolute increase.",
      },
      {
        q: "Will allowances also be revised?",
        a: "HRA recalculates automatically because it is a percentage of basic. Transport Allowance, Children Education Allowance and others typically get rationalised by the commission as well.",
      },
      {
        q: "How can I calculate my exact new salary?",
        a: "Use our 8th CPC salary calculator — enter your level, basic, city and the fitment scenario you want to model. It returns a fully itemised revised salary in real time.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
