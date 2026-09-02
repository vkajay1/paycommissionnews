import { createFileRoute, Link } from "@tanstack/react-router";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { CURRENT_DA } from "@/lib/da-rates";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";
const FACTOR = 2.86;
const CELLS = 10;

const faqs = [
  {
    q: "What is the 8th Pay Commission pay matrix?",
    a: "The pay matrix is the grid that replaced pay bands and grade pay from the 7th CPC onwards. Rows are pay levels (1 to 18) and columns are increment stages within the level, each 3% above the previous cell. The 8th CPC pay matrix will be built the same way: the notified 7th CPC cell values multiplied by the accepted fitment factor and rounded upward to the next 100.",
  },
  {
    q: "Is there an official 8th pay scale table yet?",
    a: "No. Until the commission submits its report and the government gazettes a resolution, no 8th pay scale or pay matrix table is official. The table on this page is a projection generated from the notified 7th CPC entry cells and a 2.86x fitment factor, so you can see the shape of the structure and substitute your own factor in the calculator.",
  },
  {
    q: "How do I read my cell in the pay matrix table?",
    a: "Find your pay level row, then move right one column for each annual increment you have earned in that level. On promotion you move one cell up in your current level for the notional increment, then across to the next level's first cell that is equal to or higher than that figure.",
  },
  {
    q: "How is the 8th CPC pay matrix cell calculated?",
    a: "Revised cell = existing cell x fitment factor, rounded up to the next multiple of 100. At 2.86x, a ₹18,000 cell becomes ₹51,480 and a ₹56,100 cell becomes ₹1,60,446, rounded to ₹1,60,500. Increments within the new level continue at 3%.",
  },
  {
    q: "Does DA continue on the new pay matrix?",
    a: `Yes, but it restarts. DA currently stands at ${CURRENT_DA}% of basic pay under the 7th CPC; on the day revised pay takes effect DA resets to 0% on the new basic and then builds up again through half-yearly instalments.`,
  },
  {
    q: "Where can I get the 8th pay commission table as a PDF?",
    a: "Use your browser's print dialogue on this page and choose Save as PDF. That gives you a clean offline copy of the projected pay matrix table without downloading any unverified file.",
  },
];

export const Route = createFileRoute("/8th-pay-commission-pay-matrix")({
  head: () => ({
    meta: [
      {
        title: "8th Pay Commission Pay Matrix Table 2026 — 8th Pay Scale Level 1 to 18",
      },
      {
        name: "description",
        content:
          "8th Pay Commission pay matrix table with projected 8th pay scale cells for Level 1 to Level 18, how each cell is calculated, increment stages and how to read your own cell.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission pay matrix, 8th pay commission table, 8th pay scale, 8th pay commission salary structure pdf, salary in 8th pay commission, 8th pay commission pay matrix table 2026",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:title",
        content: "8th Pay Commission Pay Matrix Table — Level 1 to 18",
      },
      {
        property: "og:description",
        content:
          "Projected 8th pay scale cells with increment stages for every pay level, plus how each matrix cell is derived.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-pay-matrix` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "8th Pay Commission Pay Matrix Table",
      },
      {
        name: "twitter:description",
        content: "Projected pay matrix cells for Level 1 to Level 18.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-pay-matrix` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PayMatrixPage,
});

function cell(base: number, index: number) {
  const withIncrements = base * Math.pow(1.03, index);
  const revised = withIncrements * FACTOR;
  return Math.ceil(revised / 100) * 100;
}

function PayMatrixPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Pay matrix
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          8th Pay Commission Pay Matrix Table (8th Pay Scale, Level 1–18)
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          A projected 8th Pay Commission pay matrix built the way the government
          builds one: take each notified 7th CPC cell, apply a fitment factor —
          {" "}{FACTOR}x here — and round up to the next ₹100. The grid below shows
          the first {CELLS} increment stages of every pay level so you can locate
          your own cell instead of guessing from a single entry-pay figure.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/salary">Calculate with your own basic</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/fitment-factor">Try other fitment factors</Link>
          </Button>
        </div>
      </header>

      <DisclaimerBanner />

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[900px] text-sm">
          <caption className="sr-only">
            Projected 8th Pay Commission pay matrix at a {FACTOR}x fitment factor
          </caption>
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Level</th>
              <th className="px-3 py-2.5 font-semibold">Typical post</th>
              {Array.from({ length: CELLS }, (_, i) => (
                <th key={i} className="px-3 py-2.5 font-semibold">
                  Cell {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAY_LEVELS.map((l) => (
              <tr key={l.level} className="border-t border-border">
                <td className="px-3 py-2.5 font-medium">L{l.level}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                  {l.grade}
                </td>
                {Array.from({ length: CELLS }, (_, i) => (
                  <td key={i} className="px-3 py-2.5">
                    {inr(cell(l.entryPay, i))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose-article mt-10">
        <h2>How the pay matrix replaced pay bands</h2>
        <p>
          Until the 6th CPC, pay was expressed as a pay band plus grade pay, which
          made promotions and fixation hard to read. The 7th CPC replaced that with
          a single matrix: 18 horizontal levels, and vertical cells rising 3% each
          year. Your pay is one cell, so fixation on promotion, MACP and arrears
          all become a question of moving within a published grid. The 8th CPC is
          expected to keep this design and re-price the cells.
        </p>
        <h2>How each 8th pay scale cell is derived</h2>
        <p>
          The arithmetic is deliberately simple: revised cell = existing cell ×
          fitment factor, rounded up to the next multiple of ₹100. Because the
          multiplier is uniform, the relative gap between levels stays the same —
          which is precisely why federations argue about the fitment factor rather
          than about individual cells. Compare the shape of the grid at different
          factors on the{" "}
          <Link to="/fitment-factor">fitment factor page</Link>.
        </p>
        <h2>Reading your own cell</h2>
        <p>
          Locate your level row, then count one column right for every annual
          increment drawn in that level. On promotion, first add one notional
          increment in the present level, then step across to the first cell in the
          higher level that is equal to or greater than that amount — the rule our{" "}
          <Link to="/pay-fixation">pay fixation tool</Link> automates. For
          promotion-linked upgrades under MACP, use the{" "}
          <Link to="/macp-calculator">MACP calculator</Link>.
        </p>
        <h2>Pay matrix, DA and gross salary</h2>
        <p>
          The matrix gives only basic pay. Gross salary adds DA, HRA by city class
          and transport allowance; deductions for NPS and CGHS follow. Since DA
          resets to zero on the revised basic, the gross increase is smaller than
          the basic increase in the first year — see the level-wise breakdown in
          the{" "}
          <Link to="/8th-pay-commission-salary-list">8th CPC salary list</Link> and
          the{" "}
          <Link to="/take-home-salary">take-home salary calculator</Link>.
        </p>
        <h2>Pension on the revised matrix</h2>
        <p>
          Pensioners are fixed by applying the same multiplication to their
          existing pension, with a parity check against the revised cell of the
          level from which they retired. Model both routes with the{" "}
          <Link to="/pension">pension calculator</Link>.
        </p>
      </article>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <dl className="mt-5 space-y-5">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-5">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-1.5 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <DiscussionBox />
    </div>
  );
}
