import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "Which pay commission is going on in Tamil Nadu right now?",
    a: "Tamil Nadu state employees are still on the pay structure notified after the 7th Central Pay Commission, implemented through the Tamil Nadu Revised Pay Rules 2017 on the recommendation of the state's Official Committee. No new state pay committee award has been notified for 2026 yet.",
  },
  {
    q: "Will Tamil Nadu implement the 8th Pay Commission?",
    a: "Tamil Nadu does not adopt a central pay commission report directly. The Finance Department refers it to a state Official Committee / Pay Grievance Redressal Cell, which recommends a state version. Historically the lag has been 12–18 months after central rollout.",
  },
  {
    q: "What fitment factor will Tamil Nadu use under the 8th Pay Commission?",
    a: "Tamil Nadu has previously used the same multiplication factor as the Centre (2.57x after the 7th CPC) with cadre-level adjustments. If the 8th CPC settles between 2.28x and 2.86x, Tamil Nadu is expected to adopt the same band, subject to the state's fiscal position.",
  },
  {
    q: "When will 8th Pay Commission salary come in Tamil Nadu?",
    a: "Central implementation is widely expected from 1 January 2026 with actual payment after the report and notification. Tamil Nadu employees should expect their revised pay a few quarters later, with arrears from the state's own effective date.",
  },
  {
    q: "What is the current DA for Tamil Nadu government employees?",
    a: `Tamil Nadu releases DA at the central rate through G.O.s of the Finance Department, generally a quarter behind. The central rate is ${CURRENT_DA}% from ${CURRENT_DA_FROM}.`,
  },
];

export const Route = createFileRoute("/8th-pay-commission-tamil-nadu")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission Tamil Nadu 2026 — Fitment Factor, Salary & Latest Update" },
      {
        name: "description",
        content:
          "8th Pay Commission in Tamil Nadu: state pay committee process, expected fitment factor, cadre-wise salary projections for TN state government employees, DA, arrears and pension.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission tamil nadu, tamilnadu 8th pay commission, 8th pay commission fitment factor in tamil nadu, tamil nadu 8th pay commission state employees latest 2026, next pay commission in tamil nadu, which pay commission is going on in tamil nadu, tn 8th pay commission, tamil nadu pay commission 2026, 8th pay commission salary in tamilnadu",
      },
      { property: "og:title", content: "8th Pay Commission Tamil Nadu — Fitment Factor & Salary" },
      {
        property: "og:description",
        content: "TN state employees: pay committee process, fitment factor and salary projections.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-tamil-nadu` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-tamil-nadu` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Tamil Nadu"
      title="8th Pay Commission Tamil Nadu — Fitment Factor, Salary & 2026 Update"
      lede="How the 8th Central Pay Commission will reach Tamil Nadu state government employees: the state Official Committee route, the fitment factor Tamil Nadu is likely to adopt, cadre-wise projections, DA position, arrears and pension revision."
      primary={{ label: "Open the Tamil Nadu salary page", to: "/state/tamil-nadu" }}
      tools={[
        {
          label: "Tamil Nadu state salary guide",
          to: "/state/tamil-nadu",
          description: "TNRP adoption pattern, DA position and cadre-wise pay examples.",
        },
        {
          label: "Salary calculator",
          to: "/salary",
          description: "Enter your level and basic pay to project revised pay with DA and HRA.",
        },
        {
          label: "Fitment factor calculator",
          to: "/fitment-factor",
          description: "Compare 1.92x to 3.83x and see the level-wise fitment table.",
        },
        {
          label: "Arrears calculator",
          to: "/arrear",
          description: "Month-wise arrears once the state revised pay rules take retrospective effect.",
        },
        {
          label: "Pension calculator",
          to: "/pension",
          description: "Revised pension and Dearness Relief for TN state pensioners.",
        },
        {
          label: "Pay fixation on promotion / MACP",
          to: "/macp-calculator",
          description: "FR 22(I)(a)(1) style fixation used by TN rules on promotion.",
        },
      ]}
      sections={[
        {
          heading: "How Tamil Nadu handles a Central Pay Commission report",
          body: [
            "Tamil Nadu has its own machinery for pay revision. When a Central Pay Commission report is accepted by the Union Cabinet, the Tamil Nadu Finance Department refers it to an Official Committee of senior secretaries, which examines the central pay matrix, the state's revenue position and cadre-specific representations before recommending Tamil Nadu Revised Pay Rules.",
            "After the 7th CPC, the state Official Committee recommended the same 2.57 multiplication factor with modifications for certain cadres, and the Tamil Nadu Revised Pay Rules 2017 took effect from 1 January 2016 with arrears paid in instalments. The same three-step sequence — central notification, state committee report, TN revised pay rules — is expected for the 8th CPC.",
          ],
        },
        {
          heading: "Expected 8th pay commission fitment factor in Tamil Nadu",
          body: [
            "The fitment factor is the number by which existing basic pay is multiplied to arrive at revised basic pay. For the 8th CPC, staff federations have demanded between 2.57x and 3.68x, while most independent estimates cluster around 1.92x to 2.86x once merged DA is accounted for.",
            "Tamil Nadu has historically matched the central factor rather than inventing its own, so the practical planning range for a TN employee is the same: compute your revised basic at 2.28x and 2.86x to see the likely floor and ceiling of your revision.",
          ],
        },
        {
          heading: "When will the 8th Pay Commission salary come in Tamil Nadu?",
          body: [
            "The commission was notified at the Centre in November 2025 with an implementation date widely expected to be 1 January 2026, but the report itself takes time, so actual disbursal follows later with arrears. Tamil Nadu employees should plan for their own revised pay to arrive a few quarters after central implementation, with the state's effective date usually aligned to the central one.",
            "Until then the practical checkpoints are the central DA instalments, which Tamil Nadu mirrors through Finance Department G.O.s, and any announcement of a state Official Committee for the 8th CPC.",
          ],
        },
        {
          heading: "DA, arrears and pension for TN employees",
          body: [
            `Tamil Nadu sanctions DA at the central rate with a short lag; the central rate is ${CURRENT_DA}% from ${CURRENT_DA_FROM}. On implementation of a new pay matrix, accumulated DA merges into revised basic pay and DA restarts from zero.`,
            "Arrears are computed as the month-wise difference between revised and existing pay from the effective date to the date of actual payment, and Tamil Nadu has previously released such arrears in instalments. State pensioners get a matching revision of basic pension plus Dearness Relief through the Directorate of Pension.",
          ],
        },
      ]}
      table={{
        caption: "Projected 8th CPC basic pay for key Tamil Nadu cadres",
        head: ["Cadre (level)", "Present basic", "At 2.28x", "At 2.86x"],
        rows: [
          ["Office Assistant / MTS (Level 1)", "₹18,000", "₹41,040", "₹51,480"],
          ["Junior Assistant (Level 2)", "₹19,900", "₹45,372", "₹56,914"],
          ["Village Administrative Officer (Level 3)", "₹21,700", "₹49,476", "₹62,062"],
          ["Assistant, TN Secretariat (Level 6)", "₹35,400", "₹80,712", "₹1,01,244"],
          ["Police Sub-Inspector (Level 6)", "₹35,400", "₹80,712", "₹1,01,244"],
          ["Section Officer (Level 8)", "₹47,600", "₹1,08,528", "₹1,36,136"],
          ["TNPSC Group I Officer (Level 10)", "₹56,100", "₹1,27,908", "₹1,60,446"],
          ["Deputy Collector (Level 11)", "₹67,700", "₹1,54,356", "₹1,93,622"],
        ],
      }}
      faq={faq}
    />
  );
}
