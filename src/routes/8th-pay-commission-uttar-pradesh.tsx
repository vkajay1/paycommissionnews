import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "Which pay commission is going on in UP?",
    a: "Uttar Pradesh employees are on the pay structure created by the UP Revised Pay Rules that adopted the 7th Central Pay Commission matrix from 1 January 2016. No new state pay revision has been notified for 2026 yet.",
  },
  {
    q: "Will Uttar Pradesh adopt the 8th Pay Commission?",
    a: "Yes, on past pattern. UP does not run an independent pay commission for its main establishment; it replicates the central pay matrix through state Revised Pay Rules, historically within about 6–9 months of central implementation.",
  },
  {
    q: "What will a UPSSSC junior assistant earn after the 8th Pay Commission?",
    a: "UPSSSC Junior Assistants are in Level 2 with an entry basic pay of ₹19,900. That projects to roughly ₹45,400 at 2.28x and about ₹56,900 at 2.86x, before DA, HRA and other allowances.",
  },
  {
    q: "What will UP Police constable salary be under the 8th Pay Commission?",
    a: "UP Police constables are placed in Level 3 at ₹21,700 basic. A 2.28x fitment projects about ₹49,500 and 2.86x about ₹62,100, plus DA, HRA and ration/uniform allowances as admissible.",
  },
  {
    q: "What is the current DA for UP state employees?",
    a: `UP aligns DA with the central rate, currently ${CURRENT_DA}% from ${CURRENT_DA_FROM}, usually sanctioned a few weeks to a quarter after the central order.`,
  },
];

export const Route = createFileRoute("/8th-pay-commission-uttar-pradesh")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission Uttar Pradesh 2026 — UP State Employees Salary & Adoption" },
      {
        name: "description",
        content:
          "8th Pay Commission in Uttar Pradesh: state adoption timeline, UPSSSC junior assistant and UP Police constable salary projections, Lekhpal and PCS pay, DA, arrears and pension.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission uttar pradesh, uttar pradesh 8th pay commission state employees latest 2026, 8th pay commission in up, which pay commission is going on in up, upsssc junior assistant salary after 8th pay commission, up police 8th pay commission salary, up government 8th pay commission, up salary calculator",
      },
      { property: "og:title", content: "8th Pay Commission Uttar Pradesh — UP Employees Salary" },
      {
        property: "og:description",
        content: "UP adoption timeline, UPSSSC and UP Police salary projections under the 8th CPC.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-uttar-pradesh` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-uttar-pradesh` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Uttar Pradesh"
      title="8th Pay Commission Uttar Pradesh — UP State Employees Salary & Adoption 2026"
      lede="How the 8th Central Pay Commission will apply to Uttar Pradesh state government employees: adoption route and timeline, cadre-wise projections for UPSSSC Junior Assistant, Lekhpal, UP Police and PCS, DA, arrears and pension."
      primary={{ label: "Open the Uttar Pradesh salary page", to: "/state/uttar-pradesh" }}
      tools={[
        {
          label: "Uttar Pradesh salary guide",
          to: "/state/uttar-pradesh",
          description: "UP Revised Pay Rules pattern, DA position and cadre-wise pay examples.",
        },
        {
          label: "Salary calculator",
          to: "/salary",
          description: "Project revised basic pay, DA, HRA and transport allowance for your level.",
        },
        {
          label: "Constable salary page",
          to: "/role/constable",
          description: "Level 3 constable pay, allowances and 8th CPC projection.",
        },
        {
          label: "Fitment factor calculator",
          to: "/fitment-factor",
          description: "Compare 1.92x to 3.83x with the level-wise fitment table.",
        },
        {
          label: "Arrears calculator",
          to: "/arrear",
          description: "Month-wise arrears once state rules take retrospective effect.",
        },
        {
          label: "Pension calculator",
          to: "/pension",
          description: "Revised pension and Dearness Relief for UP pensioners.",
        },
      ]}
      sections={[
        {
          heading: "How Uttar Pradesh adopts a Central Pay Commission",
          body: [
            "Uttar Pradesh replicates the central pay matrix rather than building an independent structure. After the Union Cabinet accepts a Central Pay Commission report, the UP Finance Department issues state Revised Pay Rules mapping each state cadre onto the corresponding central level, with a small number of state-specific pay scales retained for particular services.",
            "After the 7th CPC, UP notified its revised rules with effect from 1 January 2016 and paid arrears in instalments partly credited to GPF. The same sequence is expected for the 8th CPC: central notification, state cabinet approval, then UP Revised Pay Rules with a retrospective date.",
          ],
        },
        {
          heading: "UPSSSC, Lekhpal and UP Police pay under the 8th CPC",
          body: [
            "Because UP mirrors the central matrix, projecting a cadre's revised pay is straightforward: take the present entry basic and multiply by the fitment factor. A UPSSSC Junior Assistant at ₹19,900 lands near ₹45,400 at 2.28x; a Lekhpal at ₹21,700 near ₹49,500; a UP Police constable, also Level 3, follows the same figures.",
            "Field cadres additionally receive uniform, ration and hardship-type allowances where admissible, which are revised as a percentage or on the DA-linked slab pattern after implementation, not by the fitment factor itself.",
          ],
        },
        {
          heading: "DA, arrears and rebasing",
          body: [
            `UP sanctions DA at the central rate — ${CURRENT_DA}% from ${CURRENT_DA_FROM} — usually shortly after the central order. On implementation of a new pay matrix, this accumulated DA merges into revised basic pay and DA restarts at 0%.`,
            "Arrears equal the month-wise gap between revised and existing pay from the effective date until actual payment. Where UP credits part of arrears to GPF, the cash component is smaller than the headline figure, so compute both.",
          ],
        },
        {
          heading: "Pension for UP state pensioners",
          body: [
            "UP pensioners receive a matching revision: basic pension is refixed on the revised scales, Dearness Relief restarts from zero on the new base, and commutation and gratuity ceilings are updated where the state adopts the central limits. Family pension is revised in the same order.",
          ],
        },
      ]}
      table={{
        caption: "Projected 8th CPC basic pay for key Uttar Pradesh cadres",
        head: ["Cadre (level)", "Present basic", "At 2.28x", "At 2.86x"],
        rows: [
          ["Chaturth Shreni / MTS (Level 1)", "₹18,000", "₹41,040", "₹51,480"],
          ["UPSSSC Junior Assistant (Level 2)", "₹19,900", "₹45,372", "₹56,914"],
          ["Lekhpal (Level 3)", "₹21,700", "₹49,476", "₹62,062"],
          ["UP Police Constable (Level 3)", "₹21,700", "₹49,476", "₹62,062"],
          ["Sub-Inspector, UP Police (Level 6)", "₹35,400", "₹80,712", "₹1,01,244"],
          ["Assistant Teacher (Level 7)", "₹44,900", "₹1,02,372", "₹1,28,414"],
          ["PCS entry (Level 10)", "₹56,100", "₹1,27,908", "₹1,60,446"],
          ["PCS-J Judge (Level 11)", "₹67,700", "₹1,54,356", "₹1,93,622"],
        ],
      }}
      faq={faq}
    />
  );
}
