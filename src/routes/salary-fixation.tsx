import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.lovable.app";

const faq = [
  {
    q: "What is salary fixation?",
    a: "Salary or pay fixation is the process of determining the exact cell in the pay matrix at which your basic pay is fixed after an event such as promotion, MACP, a new pay commission, or joining on a fresh appointment. Rule FR 22(I)(a)(1) and the 7th CPC pay-fixation rules govern the process.",
  },
  {
    q: "How is pay fixed on promotion?",
    a: "One increment (3% of basic pay, rounded to the next ₹100) is added to your existing basic pay, and the resulting figure is placed at the same or next higher cell in the promotional level of the pay matrix.",
  },
  {
    q: "How is pay fixed under MACP?",
    a: "MACP grants financial upgradation to the immediate next level in the pay matrix after 10, 20 and 30 years of regular service without promotion. Pay is fixed exactly as on promotion — one increment, then placement in the higher level.",
  },
  {
    q: "How will pay be fixed under the 8th Pay Commission?",
    a: "Existing basic pay is multiplied by the fitment factor and placed at the nearest equal or next higher cell in the corresponding level of the new pay matrix, with DA rebased to 0%. This mirrors the 7th CPC method, which used a 2.57 multiple.",
  },
  {
    q: "Can I opt for pay fixation from the date of next increment?",
    a: "Yes. On promotion or MACP you may opt to have your pay fixed from the date of your next increment (DNI) instead of the date of promotion, which is often more beneficial. The option must be exercised in writing within one month.",
  },
];

export const Route = createFileRoute("/salary-fixation")({
  head: () => ({
    meta: [
      { title: "Salary Fixation Rules & Pay Fixation Calculator 2026 (7th & 8th CPC)" },
      {
        name: "description",
        content:
          "Salary fixation explained with a free pay fixation calculator: fixation of pay on promotion, MACP, next increment option (DNI) and 8th Pay Commission fixation in the revised pay matrix.",
      },
      {
        name: "keywords",
        content:
          "salary fixation, fixation of pay, pay fixation, pay fixation calculator, pay fixation on promotion calculator, macp pay fixation calculator, fr 22(i)(a)(1)",
      },
      { property: "og:title", content: "Salary Fixation & Pay Fixation Calculator 2026" },
      {
        property: "og:description",
        content: "Fixation of pay on promotion, MACP and 8th CPC revision, with calculators.",
      },
      { property: "og:url", content: `${SITE}/salary-fixation` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/salary-fixation` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Pay fixation"
      title="Salary Fixation — Rules, Method & Pay Fixation Calculator"
      lede="How fixation of pay works for central and state government employees: promotion, MACP, date-of-next-increment option and fixation in the 8th Pay Commission matrix, with calculators for each case."
      primary={{ label: "Open the pay fixation calculator", to: "/pay-fixation" }}
      tools={[
        {
          label: "Pay fixation calculator",
          to: "/pay-fixation",
          description:
            "Fix pay on promotion, MACP or 8th CPC rollover with increment and matrix placement logic.",
        },
        {
          label: "MACP calculator",
          to: "/macp-calculator",
          description: "Financial upgradation after 10, 20 and 30 years with FR 22(I)(a)(1) fixation.",
        },
        {
          label: "Pay matrix by level",
          to: "/pay-level",
          description: "Entry pay, grade and projected 8th CPC pay for all 18 pay levels.",
        },
        {
          label: "Salary calculator",
          to: "/salary",
          description: "Full gross and in-hand salary after fixation, with DA, HRA and TA.",
        },
      ]}
      sections={[
        {
          heading: "Fixation of pay on promotion (FR 22(I)(a)(1))",
          body: [
            "On promotion to a higher level, one increment equal to 3% of the existing basic pay is granted and rounded off to the next multiple of ₹100. The resulting amount is located in the promotional level of the pay matrix: if the exact figure exists as a cell, pay is fixed there; if not, pay is fixed at the next higher cell of that level.",
            "Example: basic pay ₹44,900 in Level 7 promoted to Level 8. One increment gives ₹44,900 + ₹1,347 = ₹46,247, rounded to ₹46,300. Level 8 has no ₹46,300 cell, so pay is fixed at the next higher cell of Level 8 — ₹47,600.",
          ],
        },
        {
          heading: "MACP pay fixation",
          body: [
            "Under the Modified Assured Career Progression scheme, an employee who has not been promoted receives financial upgradation to the immediately next level of the pay matrix on completion of 10, 20 and 30 years of continuous regular service. Fixation follows the same increment-plus-placement method used on promotion, and the benefit is limited to three upgradations in the whole career.",
          ],
        },
        {
          heading: "Option to fix pay from the date of next increment",
          body: [
            "An employee promoted between 2 January and 1 July may find it advantageous to defer fixation to the date of next increment. In that case pay continues in the lower level until DNI, the annual increment is drawn in the lower level, and pay is then fixed in the higher level from that date. The written option must be exercised within one month of promotion and is irrevocable.",
          ],
        },
        {
          heading: "Pay fixation under the 8th Pay Commission",
          body: [
            "When the 8th CPC is notified, pay will be fixed by multiplying existing basic pay by the fitment factor and placing the product at the equal or next higher cell of the corresponding level in the new matrix. Dearness Allowance merges into the revised basic pay and restarts at 0%. Employees whose fixation falls between two cells always move up, never down, so the revised pay is at least the multiplied figure.",
          ],
        },
      ]}
      table={{
        caption: "Fixation on promotion — worked examples in the 7th CPC matrix",
        head: ["Existing basic (level)", "One increment @3%", "Fixed at (promoted level)"],
        rows: [
          ["₹18,000 (Level 1)", "₹18,600", "₹19,900 (Level 2)"],
          ["₹21,700 (Level 3)", "₹22,400", "₹25,500 (Level 4)"],
          ["₹35,400 (Level 6)", "₹36,500", "₹44,900 (Level 7)"],
          ["₹44,900 (Level 7)", "₹46,300", "₹47,600 (Level 8)"],
          ["₹53,100 (Level 9)", "₹54,700", "₹56,100 (Level 10)"],
          ["₹67,700 (Level 11)", "₹69,800", "₹78,800 (Level 12)"],
        ],
      }}
      faq={faq}
    />
  );
}
