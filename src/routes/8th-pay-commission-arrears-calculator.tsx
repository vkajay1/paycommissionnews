import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM, PREVIOUS_DA, PREVIOUS_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.lovable.app";

const faq = [
  {
    q: "How do I calculate 8th Pay Commission salary arrears?",
    a: "Take the difference between your revised monthly pay (basic pay × fitment factor) and the pay you actually drew (basic pay + DA at the rate paid), then multiply by the number of months between the effective date and the month the revised salary is first paid.",
  },
  {
    q: "How many months of arrears will employees get?",
    a: "It depends on the gap between the effective date and the notification. After the 7th CPC, which took effect from 1 January 2016 and was notified in July 2016, employees received roughly six months of arrears. A comparable gap is expected for the 8th CPC.",
  },
  {
    q: "Are DA arrears included?",
    a: `Yes. Where a DA instalment itself was paid late, add DA arrears separately: basic pay × (${CURRENT_DA}% − ${PREVIOUS_DA}%) ÷ 100 × months.`,
  },
  {
    q: "How is tax on arrears reduced?",
    a: "Claim Section 89(1) relief by filing Form 10E before your income tax return so the arrears are notionally spread over the years to which they relate.",
  },
];

export const Route = createFileRoute("/8th-pay-commission-arrears-calculator")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission Arrears Calculator 2026 — Salary Arrears Guide" },
      {
        name: "description",
        content:
          "8th Pay Commission arrears calculator hub: work out salary arrears, DA arrears and pension arrears month-wise with current DA 60%, fitment factor options and Form 10E tax relief guidance.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission arrears calculator, 8th pay commission salary arrears, salary arrear calculator, how to calculate arrears in salary, 8cpc arrears",
      },
      { property: "og:title", content: "8th Pay Commission Arrears Calculator 2026" },
      {
        property: "og:description",
        content: "Salary, DA and pension arrears under the 8th Pay Commission — calculators and method.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-arrears-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-arrears-calculator` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Arrears"
      title="8th Pay Commission Arrears Calculator 2026"
      lede={`Everything you need to estimate 8th Pay Commission salary arrears — the month-wise arrear formula, current DA of ${CURRENT_DA}% from ${CURRENT_DA_FROM}, the previous DA rate of ${PREVIOUS_DA}% from ${PREVIOUS_DA_FROM}, fitment factor scenarios and how arrears are taxed.`}
      primary={{ label: "Open the arrears calculator", to: "/arrear" }}
      tools={[
        {
          label: "Salary arrears calculator",
          to: "/arrear",
          description:
            "Month-wise 8th CPC salary arrears with year-wise current and previous DA rate selectors and TDS estimate.",
        },
        {
          label: "Pension arrears calculator",
          to: "/pension-arrear",
          description: "Back-dated pension arrears with Dearness Relief adjustments for pensioners.",
        },
        {
          label: "DA calculator",
          to: "/da-calculator",
          description: "DA on basic salary plus DA arrears between any two instalments since 2016.",
        },
        {
          label: "Fitment factor calculator",
          to: "/fitment-factor",
          description: "Compare 1.92x to 3.83x fitment factors and see the revised basic pay used in arrears.",
        },
      ]}
      sections={[
        {
          heading: "What are 8th Pay Commission salary arrears?",
          body: [
            "Arrears are the difference between the salary you should have received from the effective date of a pay revision and the salary actually paid until the revised pay slip is issued. The 8th Central Pay Commission was constituted on 3 November 2025 and the revision is widely expected to apply from 1 January 2026, so the gap between the effective date and the first revised payment will accumulate as arrears.",
            "Two separate arrear streams are usually paid together: pay revision arrears from the new pay matrix, and DA arrears where a Dearness Allowance instalment was released after its effective date.",
          ],
        },
        {
          heading: "How to calculate arrears in salary — step by step",
          body: [
            "Step 1: note the basic pay drawn on the effective date and the DA percentage actually paid to you. Step 2: multiply the basic pay by the fitment factor to get the revised basic pay. Step 3: subtract the old basic-plus-DA figure from the revised basic pay to get the monthly difference. Step 4: multiply by the arrear months.",
            "Worked example: basic pay ₹35,400 with 58% DA gives existing pay of ₹55,932. At a 2.28x fitment factor the revised basic is ₹80,712, a monthly gain of ₹24,780. Over 12 months that is ₹2,97,360 in gross arrears before tax and recoveries.",
          ],
        },
        {
          heading: "Tax on arrears and Form 10E",
          body: [
            "Arrears are taxed in the year of receipt, which can push you into a higher slab. Section 89(1) relief lets you recompute tax as if the arrears had been received in the years they relate to; you must file Form 10E on the income tax portal before submitting your return. GPF/NPS subscription, CGHS contribution and licence fee recoveries are adjusted from the gross arrear before credit.",
          ],
        },
      ]}
      table={{
        caption: "Indicative 8th CPC arrears for 12 months at different fitment factors",
        head: ["Basic pay", "1.92x", "2.28x", "2.57x", "2.86x"],
        rows: [
          ["₹18,000", "₹73,872", "₹1,51,200", "₹2,13,840", "₹2,76,480"],
          ["₹21,700", "₹89,069", "₹1,82,280", "₹2,57,796", "₹3,33,312"],
          ["₹35,400", "₹1,45,296", "₹2,97,360", "₹4,20,624", "₹5,43,888"],
          ["₹44,900", "₹1,84,296", "₹3,77,160", "₹5,33,472", "₹6,89,808"],
          ["₹56,100", "₹2,30,256", "₹4,71,240", "₹6,66,504", "₹8,61,984"],
        ],
      }}
      faq={faq}
    />
  );
}
