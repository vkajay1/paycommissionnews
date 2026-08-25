import { createFileRoute, Link } from "@tanstack/react-router";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

const faqs = [
  {
    q: "How much salary increase in 8th Pay Commission?",
    a: "On a 2.57x fitment factor the minimum basic pay moves from ₹18,000 to about ₹46,260; at 2.86x it is ₹51,480 and at 3.0x it is ₹54,000. Because DA is reset to zero on the revised basic, the practical rise in gross pay usually works out to roughly 20%–35% depending on your level and city class. Use the level-wise list below to see your own figure.",
  },
  {
    q: "Is there an official 8th Pay Commission salary list or salary structure PDF?",
    a: "No official 8th CPC pay matrix or salary structure PDF exists yet — the commission has to submit its report first. Any PDF circulating online is an estimate. The table on this page is a projection built from the notified 7th CPC pay matrix and commonly discussed fitment factors, and you can print or save it as PDF from your browser.",
  },
  {
    q: "What is the 8th Pay Commission official website?",
    a: "The 8th Central Pay Commission does not publish salary tables on a consumer website. Official announcements come from the Department of Expenditure, Ministry of Finance (doe.gov.in) and the Press Information Bureau (pib.gov.in). Treat gazette notifications and PIB releases as the only authoritative source; this site is an independent estimator.",
  },
  {
    q: "What is the latest 8th Pay Commission approval news?",
    a: "The commission has been announced and its terms of reference notified, with consultations under way across regional centres. Implementation is widely expected from 1 January 2026, with arrears released after the recommendations are accepted. Our news section tracks each development as it is confirmed.",
  },
  {
    q: "What DA applies on the 8th Pay Commission salary list?",
    a: `Dearness Allowance stands at ${CURRENT_DA}% with effect from ${CURRENT_DA_FROM} under the 7th CPC. Once the revised pay is implemented, DA restarts from 0% on the new basic pay and grows with each half-yearly instalment.`,
  },
];

const FITMENTS = [2.57, 2.86, 3.0];

export const Route = createFileRoute("/8th-pay-commission-salary-list")({
  head: () => ({
    meta: [
      {
        title: "8th Pay Commission Salary List 2026 — Level-Wise Salary Increase Table",
      },
      {
        name: "description",
        content:
          "8th Pay Commission salary list 2026: level-wise (Level 1–18) projected basic pay at 2.57x, 2.86x and 3.0x fitment, expected salary increase and salary structure you can save as PDF.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission salary list, 8th pay commission salary increase 2026, 8th pay commission salary structure pdf, how much salary increase in 8th pay commission, 8th pay commission approval latest news, 8th pay commission official website",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:title",
        content: "8th Pay Commission Salary List 2026 — Level-Wise Increase Table",
      },
      {
        property: "og:description",
        content:
          "Level 1 to Level 18 projected 8th CPC basic pay at 2.57x, 2.86x and 3.0x fitment with expected salary increase.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-salary-list` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "8th Pay Commission Salary List 2026",
      },
      {
        name: "twitter:description",
        content:
          "Level-wise 8th CPC salary list with projected basic pay and expected increase.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-salary-list` }],
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "8th Pay Commission Salary List",
              item: `${SITE}/8th-pay-commission-salary-list`,
            },
          ],
        }),
      },
    ],
  }),
  component: SalaryListPage,
});

function SalaryListPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Salary list
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          8th Pay Commission Salary List 2026 (Level 1 – Level 18)
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          A level-wise 8th Pay Commission salary list showing how much salary
          increase to expect in 2026. Each row takes the notified 7th CPC entry
          basic pay and applies three commonly discussed fitment factors —
          2.57x, 2.86x and 3.0x — so you can read the projected 8th CPC salary
          structure at a glance and save it as a PDF.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/salary">Open salary calculator</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">8th Pay Commission news</Link>
          </Button>
        </div>
      </header>

      <DisclaimerBanner />

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <caption className="sr-only">
            8th Pay Commission salary list: projected basic pay by pay level and
            fitment factor
          </caption>
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Level</th>
              <th className="px-3 py-2.5 font-semibold">Typical post</th>
              <th className="px-3 py-2.5 font-semibold">7th CPC basic</th>
              {FITMENTS.map((f) => (
                <th key={f} className="px-3 py-2.5 font-semibold">
                  {f}x
                </th>
              ))}
              <th className="px-3 py-2.5 font-semibold">Increase at 2.86x</th>
            </tr>
          </thead>
          <tbody>
            {PAY_LEVELS.map((l) => (
              <tr key={l.level} className="border-t border-border">
                <td className="px-3 py-2.5 font-medium">Level {l.level}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{l.grade}</td>
                <td className="px-3 py-2.5">{inr(l.entryPay)}</td>
                {FITMENTS.map((f) => (
                  <td key={f} className="px-3 py-2.5">
                    {inr(Math.round(l.entryPay * f))}
                  </td>
                ))}
                <td className="px-3 py-2.5 font-medium text-primary">
                  +{inr(Math.round(l.entryPay * 2.86) - l.entryPay)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose-article mt-10">
        <h2>How much salary increase in the 8th Pay Commission?</h2>
        <p>
          The headline number in every 8th Pay Commission salary list is the
          revised basic pay, and that is simply your present basic multiplied by
          the fitment factor. At 2.86x a Level 1 employee moves from ₹18,000 to
          about ₹51,480, while a Level 7 employee goes from ₹44,900 to roughly
          ₹1,28,414. The gross pay rise, however, is smaller than the basic-pay
          jump because Dearness Allowance — currently {CURRENT_DA}% with effect
          from {CURRENT_DA_FROM} — is reset to zero on the revised basic and
          then rebuilt through half-yearly instalments. In practice most
          employees should plan for a 20%–35% improvement in gross pay in 2026.
        </p>
        <h2>8th Pay Commission salary structure PDF</h2>
        <p>
          There is no official 8th Pay Commission salary structure PDF yet; the
          commission must submit its report and the government must accept it
          before a pay matrix is gazetted. Any file already circulating is an
          estimate. The table above is the same information in a cleaner form —
          use your browser's print dialogue and choose "Save as PDF" to keep an
          offline copy of this 8th CPC salary list.
        </p>
        <h2>8th Pay Commission news and approval status</h2>
        <p>
          The commission has been announced, its terms of reference notified and
          regional consultations are running. Salary revision is widely expected
          from 1 January 2026, with arrears paid after formal approval. We track
          every confirmed development — including fitment factor signals, DA
          hikes and report timelines — in our{" "}
          <Link to="/blog">8th Pay Commission news section</Link>. For the
          authoritative record, rely on Department of Expenditure gazette
          notifications and PIB releases rather than any third-party site,
          including this one.
        </p>
        <h2>Check your own figure</h2>
        <p>
          The list uses entry-cell pay for each level. If you have earned
          increments, your basic is higher than the entry cell, so run your
          exact figure through the{" "}
          <Link to="/salary">8th Pay Commission salary calculator</Link>, and
          use the <Link to="/8th-pay-commission-arrears-calculator">arrears
          calculator</Link> or{" "}
          <Link to="/8th-pay-commission-pension-calculator">pension
          calculator</Link> for back-dated dues and retirement benefits.
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
