import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "Is the 8th Pay Commission applicable to Maharashtra state government employees?",
    a: "Not automatically. Maharashtra examines the central report through a state committee — the Bakshi Committee performed this role for the 7th CPC — and then notifies the Maharashtra Civil Services (Revised Pay) Rules. Applicability to state employees comes through that state notification.",
  },
  {
    q: "When will Maharashtra implement the 8th Pay Commission?",
    a: "Maharashtra's historical lag is roughly 12–18 months after central implementation. The 7th CPC took effect centrally from 1 January 2016 and Maharashtra notified its revised pay rules in January 2019 with effect from the same retrospective date.",
  },
  {
    q: "What will a Talathi earn after the 8th Pay Commission in Maharashtra?",
    a: "Talathis are placed in Level 4 (S-8 equivalent) with an entry basic pay of ₹25,500. That projects to about ₹58,100 at 2.28x and roughly ₹72,900 at 2.86x, before DA, HRA and local allowances.",
  },
  {
    q: "What is the current DA for Maharashtra state employees?",
    a: `Maharashtra has matched central DA rates without deviation, so the state rate tracks the central ${CURRENT_DA}% from ${CURRENT_DA_FROM}, typically sanctioned a quarter later by a Finance Department G.R.`,
  },
  {
    q: "Will Maharashtra employees get arrears?",
    a: "Yes, where the state revised pay rules carry a retrospective effective date. Maharashtra has previously paid such arrears in five annual instalments rather than as a lump sum.",
  },
];

export const Route = createFileRoute("/8th-pay-commission-maharashtra")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission Maharashtra 2026 — State Employees Salary, Talathi & Implementation" },
      {
        name: "description",
        content:
          "8th Pay Commission in Maharashtra: implementation and applicability for state government employees, Talathi and Police SI salary projections, DA, arrears in instalments and pension revision.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission salary list in maharashtra, 8th pay commission maharashtra, maharashtra 8th pay commission state employees latest 2026, 8th pay commission in maharashtra state government employees, maharashtra 8th pay commission implementation state employees 2026, talathi salary after 8th pay maharashtra, 8th pay in maharashtra",
      },
      { property: "og:title", content: "8th Pay Commission Maharashtra — State Employees Salary" },
      {
        property: "og:description",
        content: "Maharashtra implementation route, Talathi and Police SI projections, DA and arrears.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-maharashtra` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-maharashtra` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Maharashtra"
      title="8th Pay Commission Maharashtra — State Employees, Talathi Salary & Implementation"
      lede="How the 8th Central Pay Commission will apply to Maharashtra state government employees: the state committee route, expected implementation timing, cadre-wise projections for Talathi, Clerk-Typist and Police SI, DA, arrears and pension."
      primary={{ label: "Open the Maharashtra salary page", to: "/state/maharashtra" }}
      tools={[
        {
          label: "Maharashtra salary guide",
          to: "/state/maharashtra",
          description: "MCSR adoption pattern, DA position and cadre-wise pay examples.",
        },
        {
          label: "Salary calculator",
          to: "/salary",
          description: "Project revised basic pay with DA, HRA and transport allowance.",
        },
        {
          label: "Fitment factor calculator",
          to: "/fitment-factor",
          description: "Compare 1.92x to 3.83x on your present basic pay.",
        },
        {
          label: "Arrears calculator",
          to: "/arrear",
          description: "Month-wise arrears, including instalment-wise release patterns.",
        },
        {
          label: "Pay fixation on promotion",
          to: "/macp-calculator",
          description: "Fixation on promotion and assured career progression.",
        },
        {
          label: "Pension calculator",
          to: "/pension",
          description: "Revised pension and Dearness Relief for Maharashtra pensioners.",
        },
      ]}
      sections={[
        {
          heading: "How Maharashtra decides applicability",
          body: [
            "Maharashtra treats a Central Pay Commission report as an input, not an order. A state committee — the Bakshi Committee in the 7th CPC round — maps the central pay matrix onto Maharashtra's S-series pay levels, considers cadre representations, and recommends the Maharashtra Civil Services (Revised Pay) Rules.",
            "For the 7th CPC, that produced revised rules notified in January 2019 with retrospective effect from 1 January 2016, and arrears released in annual instalments. A comparable committee stage is expected before the 8th CPC applies to state employees.",
          ],
        },
        {
          heading: "Talathi, Clerk-Typist and Police SI projections",
          body: [
            "Maharashtra's S-levels align closely with the central matrix, so cadre projections follow the same arithmetic. A Talathi or Clerk-Typist at ₹25,500 basic reaches about ₹58,100 at 2.28x and ₹72,900 at 2.86x; a Police Sub-Inspector at ₹35,400 reaches roughly ₹80,700 and ₹1,01,200 on the same factors.",
            "Local body staff — municipal corporations such as MBMC, Nashik or Thane — usually follow the state rules through their own resolutions, so their revision date can trail the state's by a further few months.",
          ],
        },
        {
          heading: "DA, rebasing and arrears in instalments",
          body: [
            `Maharashtra has matched central DA instalment for instalment; the current central rate is ${CURRENT_DA}% from ${CURRENT_DA_FROM}. On implementation the accumulated DA merges into revised basic pay and DA restarts at 0%.`,
            "Maharashtra's practice of releasing arrears across several annual instalments matters for cash-flow planning and for tax: spreading receipts can reduce the need for relief under Section 89(1), but each instalment is taxable in the year received.",
          ],
        },
        {
          heading: "Pension for Maharashtra retirees",
          body: [
            "Basic pension is refixed on the revised scales, Dearness Relief restarts on the new base, and family pension is revised in the same order. Employees under the state's defined contribution scheme see the change reflected in contributions rather than in a revised pension figure.",
          ],
        },
      ]}
      table={{
        caption: "8th Pay Commission salary list in Maharashtra — projected basic pay for key cadres",
        head: ["Cadre (level)", "Present basic", "At 2.28x", "At 2.86x"],
        rows: [
          ["Peon / MTS (Level 1)", "₹18,000", "₹41,040", "₹51,480"],
          ["Clerk-Typist, MPSC (Level 4)", "₹25,500", "₹58,140", "₹72,930"],
          ["Talathi (Level 4)", "₹25,500", "₹58,140", "₹72,930"],
          ["Police Constable (Level 3)", "₹21,700", "₹49,476", "₹62,062"],
          ["Police Sub-Inspector (Level 6)", "₹35,400", "₹80,712", "₹1,01,244"],
          ["Naib Tahsildar (Level 7)", "₹44,900", "₹1,02,372", "₹1,28,414"],
          ["MPSC Deputy Collector (Level 11)", "₹67,700", "₹1,54,356", "₹1,93,622"],
        ],
      }}
      faq={faq}
    />
  );
}
