import { createFileRoute } from "@tanstack/react-router";
import { KeywordHub } from "@/components/seo/KeywordHub";
import { faqLd } from "@/components/calc/CalcShell";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";

const SITE = "https://paycommissionnews.lovable.app";

const faq = [
  {
    q: "What is a fitment factor?",
    a: "The fitment factor is the uniform multiple applied to existing basic pay to arrive at the revised basic pay under a new pay commission. It absorbs the accumulated Dearness Allowance and adds a real increase on top.",
  },
  {
    q: "What is the current fitment factor?",
    a: "The current fitment factor in force is 2.57, applied by the 7th CPC from 1 January 2016 to 6th CPC pay (basic pay plus grade pay).",
  },
  {
    q: "What was the previous fitment factor?",
    a: "The 6th CPC used 1.86 as the multiple on 5th CPC basic pay, before adding grade pay. Earlier commissions used pay-scale-wise fixation tables rather than a single uniform multiple.",
  },
  {
    q: "What fitment factor is expected under the 8th Pay Commission?",
    a: "No factor has been recommended yet. Estimates in circulation range from 1.92x to 2.86x, with 2.28x and 2.57x the most frequently cited mid-range scenarios. Treat every 8th CPC figure as a projection until the report is submitted and accepted.",
  },
  {
    q: "How do I calculate salary with a fitment factor?",
    a: `Revised basic pay = existing basic pay × fitment factor. DA restarts at 0% because the current DA of ${CURRENT_DA}% (from ${CURRENT_DA_FROM}) is merged into the revised basic. HRA and transport allowance are then computed on the revised basic.`,
  },
];

export const Route = createFileRoute("/fitment-calculator")({
  head: () => ({
    meta: [
      { title: "Fitment Calculator 2026 — Current & Previous Fitment Factor, Fitment Table" },
      {
        name: "description",
        content:
          "Free fitment calculator for the 8th Pay Commission. Compare current fitment factor 2.57, previous 1.86, and 8th CPC estimates of 1.92x to 2.86x with a full fitment table for all 18 pay levels.",
      },
      {
        name: "keywords",
        content:
          "fitment calculator, fitment factor, current fitment factor, previous fitment factor, 2.28 fitment factor, 2.57 fitment factor, fitment table, fitment allowance, 8th pay commission fitment factor calculator",
      },
      { property: "og:title", content: "Fitment Calculator — Current & Previous Fitment Factor" },
      {
        property: "og:description",
        content: "Fitment factor history, 8th CPC estimates and a level-wise fitment table.",
      },
      { property: "og:url", content: `${SITE}/fitment-calculator` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/fitment-calculator` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <KeywordHub
      eyebrow="Fitment factor"
      title="Fitment Calculator — Current Fitment Factor, Previous Factor & Fitment Table"
      lede="Understand how the fitment factor converts your existing basic pay into revised pay, compare the current 2.57 factor with 8th Pay Commission estimates from 1.92x to 2.86x, and read the full level-wise fitment table."
      primary={{ label: "Open the fitment factor calculator", to: "/fitment-factor" }}
      tools={[
        {
          label: "Fitment factor calculator",
          to: "/fitment-factor",
          description:
            "Enter basic pay and compare revised pay across every commonly discussed 8th CPC fitment factor.",
        },
        {
          label: "Fitment simulator",
          to: "/fitment-simulator",
          description: "Interactive chart of revised pay across the 1.5x–4.0x range.",
        },
        {
          label: "Salary calculator",
          to: "/salary",
          description: "Full revised salary with DA, HRA and TA after applying the fitment factor.",
        },
        {
          label: "6th pay commission calculator",
          to: "/6th-pay-commission-calculator",
          description: "Convert grade pay to 7th and projected 8th CPC basic pay.",
        },
      ]}
      sections={[
        {
          heading: "Current fitment factor and previous fitment factor",
          body: [
            "The current fitment factor is 2.57, recommended by the 7th Central Pay Commission and applied from 1 January 2016 to the sum of 6th CPC basic pay and grade pay. The previous fitment factor was 1.86, used by the 6th CPC from 1 January 2006 on 5th CPC basic pay before grade pay was added.",
            "A fitment factor is not a pure pay rise. Most of the multiple simply absorbs the Dearness Allowance already being paid — 125% at the time of the 7th CPC and 60% today — so the genuine increase is the residual portion, historically in the 14% to 16% range.",
          ],
        },
        {
          heading: "8th Pay Commission fitment factor estimates for 2026",
          body: [
            "The 8th CPC was constituted on 3 November 2025 and has not yet submitted its report, so no official factor exists. Staff-side federations have argued for a higher multiple, while analysts model 1.92x as a conservative floor and 2.86x as an optimistic ceiling. The 2.28x and 2.57x scenarios sit in the middle and are the most widely quoted in news coverage.",
            "Because DA stood at 60% from 1 January 2026, a factor of about 1.92x would broadly protect existing emoluments, and anything above it delivers a real increase. That is why 1.92x is treated as the minimum realistic scenario rather than a likely outcome.",
          ],
        },
        {
          heading: "Fitment allowance vs fitment factor",
          body: [
            "Some state governments express the same idea as a fitment allowance — a flat percentage added to basic pay on revision — instead of a multiple. The arithmetic is equivalent: a 2.28x fitment factor is the same as merging DA and adding roughly 42.5% of the DA-inclusive pay. Check your state finance department order for the exact wording that applies to you.",
          ],
        },
      ]}
      table={{
        caption: "Fitment table — projected 8th CPC basic pay for all pay levels",
        head: ["Level (entry pay)", "1.92x", "2.28x", "2.57x", "2.86x"],
        rows: [
          ["Level 1 — ₹18,000", "₹34,560", "₹41,040", "₹46,260", "₹51,480"],
          ["Level 2 — ₹19,900", "₹38,208", "₹45,372", "₹51,143", "₹56,914"],
          ["Level 3 — ₹21,700", "₹41,664", "₹49,476", "₹55,769", "₹62,062"],
          ["Level 4 — ₹25,500", "₹48,960", "₹58,140", "₹65,535", "₹72,930"],
          ["Level 5 — ₹29,200", "₹56,064", "₹66,576", "₹75,044", "₹83,512"],
          ["Level 6 — ₹35,400", "₹67,968", "₹80,712", "₹90,978", "₹1,01,244"],
          ["Level 7 — ₹44,900", "₹86,208", "₹1,02,372", "₹1,15,393", "₹1,28,414"],
          ["Level 8 — ₹47,600", "₹91,392", "₹1,08,528", "₹1,22,332", "₹1,36,136"],
          ["Level 9 — ₹53,100", "₹1,01,952", "₹1,21,068", "₹1,36,467", "₹1,51,866"],
          ["Level 10 — ₹56,100", "₹1,07,712", "₹1,27,908", "₹1,44,177", "₹1,60,446"],
          ["Level 11 — ₹67,700", "₹1,29,984", "₹1,54,356", "₹1,73,989", "₹1,93,622"],
          ["Level 12 — ₹78,800", "₹1,51,296", "₹1,79,664", "₹2,02,516", "₹2,25,368"],
          ["Level 13 — ₹1,23,100", "₹2,36,352", "₹2,80,668", "₹3,16,367", "₹3,52,066"],
          ["Level 14 — ₹1,44,200", "₹2,76,864", "₹3,28,776", "₹3,70,594", "₹4,12,412"],
        ],
      }}
      faq={faq}
    />
  );
}
