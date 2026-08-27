import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "Will Odisha implement the 8th Pay Commission?",
    a: "Odisha does not have its own pay commission. The state adopts Central Pay Commission recommendations through Odisha Revised Scales of Pay (ORSP) Rules notified by the Finance Department, usually with a lag of several months to a couple of years after the Centre.",
  },
  {
    q: "What will be the ASO salary in Odisha after the 8th Pay Commission?",
    a: "Assistant Section Officers in the Odisha Secretariat are in Level 7 with an entry basic pay of ₹44,900. At a 2.28x fitment factor the projected basic pay is about ₹1,02,400, and about ₹1,28,400 at 2.86x, before DA, HRA and other allowances.",
  },
  {
    q: "What is the PEO salary in Odisha under the 8th Pay Commission?",
    a: "Panchayat Executive Officers are recruited in Level 3 of the ORSP matrix with an entry basic pay of ₹21,700. That projects to roughly ₹49,500 at 2.28x and about ₹62,100 at 2.86x, plus DA and Z-class HRA for rural postings.",
  },
  {
    q: "What is the current DA for Odisha government employees?",
    a: `Odisha follows the central DA pattern through Finance Department orders, so DA tracks the central rate of ${CURRENT_DA}% from ${CURRENT_DA_FROM}, sometimes released a quarter or two later than the Centre.`,
  },
  {
    q: "Will Odisha employees get arrears?",
    a: "Yes, when the ORSP Rules are notified with a retrospective effective date, employees receive arrears for the intervening months. Odisha has historically paid such arrears in instalments or partly credited them to GPF.",
  },
];

export const Route = createFileRoute("/8th-pay-commission-odisha")({
  head: () => ({
    meta: [
      { title: "8th Pay Commission Odisha 2026 — ORSP Pay Matrix, Salary & Arrears" },
      {
        name: "description",
        content:
          "8th Pay Commission in Odisha: ORSP pay matrix projections, ASO and PEO salary estimates, current DA 60%, arrears and pension revision for Odisha government employees.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission salary list in odisha, 8th pay commission odisha, odisha 8th pay commission, 8 pay commission salary odisha, 8th pay matrix odisha, aso salary in odisha 8th pay commission, peo salary in odisha 8th pay commission, 8th pay commission in odisha government",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "8th Pay Commission Odisha — Pay Matrix & Salary" },
      {
        property: "og:description",
        content: "ORSP pay matrix projections, ASO/PEO salary and arrears for Odisha employees.",
      },
      { property: "og:url", content: `${SITE}/state/odisha` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/state/odisha` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Odisha"
      title="8th Pay Commission Odisha — Pay Matrix, Salary & Arrears"
      lede="How the 8th Central Pay Commission will flow through to Odisha government employees via the ORSP Rules: projected pay matrix, cadre-wise salary for ASO and PEO, current DA, arrears and pension revision."
      primary={{ label: "Open the Odisha salary page", to: "/state/odisha" }}
      tools={[
        {
          label: "Odisha state salary guide",
          to: "/state/odisha",
          description: "ORSP adoption pattern, DA position and cadre-wise pay examples for Odisha.",
        },
        {
          label: "ASO salary in Odisha",
          to: "/role/aso-odisha",
          description: "Assistant Section Officer, Level 7 — duties, allowances and 8th CPC projection.",
        },
        {
          label: "PEO salary in Odisha",
          to: "/role/peo-odisha",
          description: "Panchayat Executive Officer, Level 3 — rural posting pay and projections.",
        },
        {
          label: "Salary calculator",
          to: "/salary",
          description: "Enter your ORSP level and basic pay to project revised pay with DA and HRA.",
        },
        {
          label: "Arrears calculator",
          to: "/arrear",
          description: "Month-wise arrears once the ORSP notification takes retrospective effect.",
        },
        {
          label: "Pension calculator",
          to: "/pension",
          description: "Revised pension and Dearness Relief for Odisha state pensioners.",
        },
      ]}
      sections={[
        {
          heading: "How Odisha adopts Central Pay Commission recommendations",
          body: [
            "Odisha has never constituted an independent state pay commission for its regular establishment. Instead, the Finance Department examines the Central Pay Commission report and notifies the Odisha Revised Scales of Pay (ORSP) Rules, which mirror the central pay matrix with state-specific modifications for certain cadres and for allowances such as HRA and transport allowance.",
            "After the 7th CPC, Odisha notified ORSP Rules 2017 with effect from 1 January 2016 and paid arrears in a phased manner. A similar sequence is expected for the 8th CPC: central notification first, then a state cabinet decision, then the ORSP Rules with a retrospective effective date.",
          ],
        },
        {
          heading: "8th pay matrix Odisha — projected cells",
          body: [
            "Because ORSP levels map one-to-one to the central pay matrix, the projected Odisha matrix is simply the central entry pay multiplied by the fitment factor. An LDC in Level 2 at ₹19,900 projects to about ₹45,400 at 2.28x; a Junior Engineer in Level 6 at ₹35,400 projects to about ₹80,700; and an OAS officer in Level 10 at ₹56,100 projects to about ₹1,27,900.",
            "State allowances are added on top of the revised basic. Bhubaneswar and Cuttack attract Y-class HRA, while most district and block postings fall in the Z class, which is why field cadres such as PEOs see a smaller HRA component than Secretariat staff.",
          ],
        },
        {
          heading: "Current DA for Odisha government employees",
          body: [
            `Odisha releases DA at the central rate through Finance Department memoranda, typically a quarter or two behind the Centre. The central rate is ${CURRENT_DA}% from ${CURRENT_DA_FROM}. When the 8th CPC pay matrix is adopted, this accumulated DA merges into revised basic pay and DA restarts at 0% for state employees exactly as for central employees.`,
          ],
        },
        {
          heading: "Arrears and pension for Odisha employees",
          body: [
            "Where the ORSP notification carries a retrospective date, employees receive arrears computed on the monthly difference between revised and existing pay. Odisha has in the past credited part of such arrears to the General Provident Fund rather than paying the full amount in cash. State pensioners receive a matching revision of basic pension and Dearness Relief through the Directorate of Treasuries and Inspection.",
          ],
        },
      ]}
      table={{
        caption: "8th Pay Commission salary list in Odisha — projected basic pay for key cadres",
        head: ["Cadre (ORSP level)", "Present basic", "At 2.28x", "At 2.86x"],
        rows: [
          ["Peon / MTS (Level 1)", "₹18,000", "₹41,040", "₹51,480"],
          ["LDC / Junior Clerk (Level 2)", "₹19,900", "₹45,372", "₹56,914"],
          ["PEO / Constable (Level 3)", "₹21,700", "₹49,476", "₹62,062"],
          ["Revenue Inspector (Level 4)", "₹25,500", "₹58,140", "₹72,930"],
          ["Junior Engineer (Level 6)", "₹35,400", "₹80,712", "₹1,01,244"],
          ["ASO — Secretariat (Level 7)", "₹44,900", "₹1,02,372", "₹1,28,414"],
          ["Section Officer (Level 8)", "₹47,600", "₹1,08,528", "₹1,36,136"],
          ["OAS Group A entry (Level 10)", "₹56,100", "₹1,27,908", "₹1,60,446"],
        ],
      }}
      faq={faq}
    />
  );
}
