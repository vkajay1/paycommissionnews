import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "How is pension calculated under the 8th Pay Commission?",
    a: "Revised basic pension = existing basic pension × fitment factor. At a 2.28x fitment, a basic pension of ₹35,000 becomes about ₹79,800. Dearness Relief then restarts from 0% on the revised pension, and family pension is 30% of the revised basic pay subject to the prescribed minimum.",
  },
  {
    q: "Is there an 8th pay commission salary calculator for pensioners?",
    a: "Yes — the pension calculator on this site takes basic pension, qualifying service, commutation and Dearness Relief so pensioners get a revised monthly figure rather than only a serving-employee salary projection.",
  },
  {
    q: "What is the minimum pension expected under the 8th CPC?",
    a: "The 7th CPC minimum pension is ₹9,000. Applying fitment factors in the 1.92x–2.86x band gives an expected minimum in the range of about ₹17,300 to ₹25,700, subject to the Commission's recommendations and government acceptance.",
  },
  {
    q: "Will pensioners get arrears too?",
    a: "Yes. Pensioners receive arrears for the months between the effective date of the revision and the date the revised PPO is implemented, computed on the revised basic pension plus Dearness Relief.",
  },
  {
    q: "Does DR change with the pay commission?",
    a: `Dearness Relief is currently ${CURRENT_DA}% from ${CURRENT_DA_FROM}. On implementation of a new pay commission, accumulated DR is merged into the revised basic pension and DR restarts at 0%.`,
  },
];

export const Route = createFileRoute("/8th-pay-commission-pension-calculator")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission Pension Calculator 2026 — Revised Pension & DR" },
      {
        name: "description",
        content:
          "8th Pay Commission pension calculator for pensioners: revised basic pension by fitment factor, Dearness Relief at 60%, commutation, family pension and pension arrears with worked examples.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission pension calculator, 8th pay commission salary calculator pension, 8th pay commission salary calculator for pensioners, revised pension calculator, pension arrears",
      },
      { property: "og:title", content: "8th Pay Commission Pension Calculator 2026" },
      {
        property: "og:description",
        content: "Revised pension, Dearness Relief and pension arrears under the 8th Pay Commission.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-pension-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-pension-calculator` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Pension"
      title="8th Pay Commission Pension Calculator 2026"
      lede="Estimate your revised basic pension, Dearness Relief, commuted value and pension arrears under the 8th Pay Commission. Built for central government pensioners, family pensioners and employees retiring around the revision date."
      primary={{ label: "Open the pension calculator", to: "/pension" }}
      tools={[
        {
          label: "Pension calculator",
          to: "/pension",
          description:
            "Revised basic pension, Dearness Relief, commutation and qualifying-service adjustments in one place.",
        },
        {
          label: "Pension arrear calculator",
          to: "/pension-arrear",
          description: "Back-dated pension arrears with DR at the rate applicable on implementation.",
        },
        {
          label: "Gratuity calculator",
          to: "/gratuity-calculator",
          description: "Retirement and death gratuity under CCS (Pension) Rules and the Gratuity Act.",
        },
        {
          label: "Leave encashment calculator",
          to: "/leave-encashment-calculator",
          description: "Cash equivalent of up to 300 days of earned leave at retirement.",
        },
      ]}
      sections={[
        {
          heading: "How the 8th CPC will revise pension",
          body: [
            "Every pay commission since the 5th has revised pension by multiplying the existing basic pension by a common fitment factor, then restarting Dearness Relief from zero. The 7th CPC used 2.57 and also offered notional pay fixation in the new matrix, whichever was more beneficial. The 8th CPC, constituted on 3 November 2025, is expected to follow the same structure with a fitment factor most commonly modelled between 1.92x and 2.86x.",
            "Pension remains 50% of the last drawn basic pay (or 50% of the average of the last ten months, whichever is higher) for those with 20 or more years of qualifying service. Family pension continues at 30% of basic pay, with enhanced family pension for the first ten years.",
          ],
        },
        {
          heading: "8th pay commission salary calculator for pensioners — what to enter",
          body: [
            "Enter your existing basic pension as shown in your PPO, not the gross pension including Dearness Relief. Add your qualifying service if you retired with less than 20 years, since pension is then proportionate. If you commuted a portion of pension, enter the commuted percentage so the monthly deduction and its restoration after 15 years are reflected.",
            "The calculator then shows revised basic pension, DR at the chosen rate, commutation deduction and the net monthly pension across fitment factors, so you can compare a conservative 1.92x scenario against an optimistic 2.86x one.",
          ],
        },
        {
          heading: "Pension arrears for pensioners",
          body: [
            "If the revision is effective from 1 January 2026 but the revised PPO is issued later, pensioners receive arrears for the intervening months on the difference between revised and existing monthly pension. Use the pension arrear calculator to work out the amount, and remember that arrears are taxable in the year of receipt with Section 89(1) relief available through Form 10E.",
          ],
        },
      ]}
      table={{
        caption: "Projected revised basic pension by fitment factor",
        head: ["Existing basic pension", "1.92x", "2.28x", "2.57x", "2.86x"],
        rows: [
          ["₹9,000 (minimum)", "₹17,280", "₹20,520", "₹23,130", "₹25,740"],
          ["₹15,000", "₹28,800", "₹34,200", "₹38,550", "₹42,900"],
          ["₹25,000", "₹48,000", "₹57,000", "₹64,250", "₹71,500"],
          ["₹35,000", "₹67,200", "₹79,800", "₹89,950", "₹1,00,100"],
          ["₹50,000", "₹96,000", "₹1,14,000", "₹1,28,500", "₹1,43,000"],
          ["₹1,25,000 (maximum)", "₹2,40,000", "₹2,85,000", "₹3,21,250", "₹3,57,500"],
        ],
      }}
      faq={faq}
    />
  );
}
