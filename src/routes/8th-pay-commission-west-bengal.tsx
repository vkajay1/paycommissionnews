import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "Will West Bengal implement the 8th Pay Commission?",
    a: "West Bengal does not adopt central pay commission reports directly. The state notifies its own Revision of Pay and Allowances (ROPA) rules on the recommendation of a state pay commission, so 8th CPC alignment is expected but with state-specific modifications and a longer lag.",
  },
  {
    q: "What is the West Bengal fitment factor?",
    a: "Under ROPA 2019 West Bengal used a 2.57 multiplication factor on 6th-state-scale basic pay after merging DA, mirroring the central 7th CPC factor. A similar approach — merge accumulated DA, then apply a factor in the 2.28x–2.86x band — is the realistic expectation for the next ROPA.",
  },
  {
    q: "What is the current DA for West Bengal state employees?",
    a: `West Bengal fixes its own DA rate, which has stayed well below the central rate; the state rate is around 18% against the central ${CURRENT_DA}% from ${CURRENT_DA_FROM}. The gap and pending DA arrears remain the subject of litigation.`,
  },
  {
    q: "When will West Bengal employees get revised pay?",
    a: "The state announces a pay commission after the central report is available, then notifies ROPA rules with a retrospective effective date. Based on the ROPA 2019 precedent, a lag of two years or more after central implementation is possible.",
  },
  {
    q: "Do WB state pensioners get the same revision?",
    a: "Yes. ROPA notifications are accompanied by pension revision orders that refix basic pension on the new scales and set Dearness Relief at the state rate.",
  },
];

export const Route = createFileRoute("/8th-pay-commission-west-bengal")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission West Bengal 2026 — ROPA, Fitment Factor & Salary" },
      {
        name: "description",
        content:
          "8th Pay Commission in West Bengal: ROPA rules, West Bengal fitment factor, state DA position, cadre-wise salary projections, arrears and pension for WB state government employees.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission salary list in west bengal, 8th pay commission west bengal, west bengal 8th pay commission, 8th pay commission in west bengal, west bengal fitment factor, wb ropa 8th pay commission, west bengal state employees salary 2026",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "8th Pay Commission West Bengal — ROPA & Fitment Factor" },
      {
        property: "og:description",
        content: "ROPA pattern, WB fitment factor, DA gap and salary projections for WB employees.",
      },
      { property: "og:url", content: `${SITE}/state/west-bengal` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/state/west-bengal` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="West Bengal"
      title="8th Pay Commission West Bengal — ROPA, Fitment Factor & Salary"
      lede="What the 8th Central Pay Commission means for West Bengal state government employees: the ROPA route, the West Bengal fitment factor, the state DA gap, cadre-wise projections, arrears and pension revision."
      primary={{ label: "Open the West Bengal salary page", to: "/state/west-bengal" }}
      tools={[
        {
          label: "West Bengal salary guide",
          to: "/state/west-bengal",
          description: "ROPA adoption pattern, state DA and cadre-wise pay examples.",
        },
        {
          label: "Fitment factor calculator",
          to: "/fitment-factor",
          description: "Apply 1.92x to 3.83x on your present basic pay and compare outcomes.",
        },
        {
          label: "Salary calculator",
          to: "/salary",
          description: "Project revised pay with DA, HRA and transport allowance.",
        },
        {
          label: "DA calculator",
          to: "/da-calculator",
          description: "See how a DA rate change affects monthly pay and arrears.",
        },
        {
          label: "Arrears calculator",
          to: "/arrear",
          description: "Month-wise arrears from a retrospective ROPA effective date.",
        },
        {
          label: "Pension calculator",
          to: "/pension",
          description: "Revised pension and Dearness Relief for WB pensioners.",
        },
      ]}
      sections={[
        {
          heading: "How pay revision works in West Bengal",
          body: [
            "West Bengal is one of the few large states that keeps a distinctly separate pay structure. Instead of adopting a central pay matrix as-is, the state constitutes a pay commission whose report leads to Revision of Pay and Allowances (ROPA) rules notified by the Finance Department.",
            "ROPA 2019 followed the 7th CPC by roughly three years: existing DA was merged into basic pay and a 2.57 multiplication factor was applied, with the revised structure effective from 1 January 2016 but monetary benefit from 1 January 2020. Any 8th CPC alignment in West Bengal is likely to follow the same merge-then-multiply logic.",
          ],
        },
        {
          heading: "West Bengal fitment factor explained",
          body: [
            "In West Bengal the phrase 'fitment factor' has two parts: the DA merger and the multiplication factor. First, the accumulated state DA on the date of revision is treated as part of pay; then the multiplier converts that consolidated figure into the new scale.",
            "Because the state DA rate is lower than the central rate, the consolidated base is smaller, which is why WB employees often see a smaller effective jump than central employees on the same nominal factor. Running your own basic pay at 2.28x and 2.86x gives a realistic planning band.",
          ],
        },
        {
          heading: "The DA gap and pending arrears",
          body: [
            `Central employees are on ${CURRENT_DA}% DA from ${CURRENT_DA_FROM}, while the West Bengal state rate has remained close to 18%. The differential and the question of arrears have been litigated for years, and any future ROPA settlement will be read alongside those orders.`,
            "For planning purposes, treat state DA and central DA as separate series: use the state rate for your current in-hand estimate, and the central rate only as a benchmark for what a full alignment would look like.",
          ],
        },
        {
          heading: "Arrears and pension in West Bengal",
          body: [
            "Where a ROPA notification separates the effective date from the date of monetary benefit, arrears are limited to the later period. That distinction matters more in West Bengal than in most states, so read the notification's two dates carefully before computing what you are owed.",
            "State pensioners receive a corresponding revision of basic pension with Dearness Relief at the state rate, along with revised commutation and gratuity ceilings where notified.",
          ],
        },
      ]}
      table={{
        caption: "8th Pay Commission salary list in West Bengal — projected revised basic pay for key cadres",
        head: ["Cadre (WB level)", "Present basic", "At 2.28x", "At 2.86x"],
        rows: [
          ["Group D staff (Level 1)", "₹17,000", "₹38,760", "₹48,620"],
          ["LDA / Clerk (Level 6)", "₹22,700", "₹51,756", "₹64,922"],
          ["Upper Division Assistant (Level 8)", "₹25,600", "₹58,368", "₹73,216"],
          ["Sub-Inspector, WBP (Level 10)", "₹32,100", "₹73,188", "₹91,806"],
          ["Head Clerk (Level 12)", "₹38,900", "₹88,692", "₹1,11,254"],
          ["WBCS Executive entry (Level 16)", "₹56,100", "₹1,27,908", "₹1,60,446"],
        ],
      }}
      faq={faq}
    />
  );
}
