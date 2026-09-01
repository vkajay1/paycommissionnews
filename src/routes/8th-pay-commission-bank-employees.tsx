import { createFileRoute, Link } from "@tanstack/react-router";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

const faqs = [
  {
    q: "Is the 8th Pay Commission applicable to bank employees?",
    a: "No. Public sector bank employees are not covered by Central Pay Commissions. Their pay is revised every five years through a bipartite settlement negotiated by the Indian Banks' Association with the unions and officer associations, signed as a Bipartite Settlement (workmen) and a Joint Note (officers). The 8th CPC therefore applies to central government employees, not to bank staff.",
  },
  {
    q: "Who does the 8th Pay Commission cover then?",
    a: "Central government civilian employees, defence forces personnel, All India Services officers, central government pensioners and family pensioners, plus autonomous bodies and states that voluntarily adopt the central pattern. Public sector banks, LIC, and most PSUs follow their own wage-revision machinery.",
  },
  {
    q: "What will SBI PO salary be after the 8th Pay Commission?",
    a: "SBI PO pay does not change because of a Central Pay Commission. It changes with the next bank wage revision, where the officers' Joint Note fixes the JMGS-I scale, dearness allowance formula, HRA and perquisites. Any figure quoted as an 'SBI PO salary after 8th Pay Commission' is mixing two different systems.",
  },
  {
    q: "Do bank employees get DA like central government employees?",
    a: "Both get DA, but the formulas differ. Bank DA is revised quarterly and linked to the All India Average Consumer Price Index for Industrial Workers with a slab-based percentage, while central government DA is revised half-yearly as a single percentage of basic pay. So the two DA percentages are never the same number.",
  },
  {
    q: "Does the 8th Pay Commission affect RBI employees?",
    a: "RBI has its own pay structure and revision cycle, broadly aligned with the government's timing but decided internally. RBI staff are not in the CPC ambit, though CPC outcomes often shape expectations during RBI's own revision.",
  },
  {
    q: "Can bank pensioners expect a CPC-style pension revision?",
    a: "Bank pension is governed by the Bank Employees' Pension Regulations and settlement-linked updations, not by CPC recommendations. Demands for periodic pension updation in banks are pursued separately with the IBA and the Department of Financial Services.",
  },
];

const COMPARE: { point: string; central: string; bank: string }[] = [
  {
    point: "Revision machinery",
    central: "Central Pay Commission, roughly every 10 years",
    bank: "Bipartite settlement with IBA, roughly every 5 years",
  },
  {
    point: "Who decides",
    central: "Commission recommends, Union Cabinet accepts",
    bank: "IBA and unions/officer associations negotiate and sign",
  },
  {
    point: "Pay conversion",
    central: "Fitment factor applied to existing basic pay",
    bank: "Load on payslip cost plus revised scale construction",
  },
  {
    point: "DA revision",
    central: "Half-yearly percentage of basic pay",
    bank: "Quarterly, slab-linked to CPI-IW",
  },
  {
    point: "Pension basis",
    central: "50% of last drawn pay, revised by the commission",
    bank: "Pension Regulations 1995, updated via settlements",
  },
  {
    point: "Arrears",
    central: "Paid from the effective date after acceptance",
    bank: "Paid from the settlement's effective date",
  },
];

const LEVELS = [
  { post: "Central Govt Assistant Section Officer (Level 7)", basic: 44900 },
  { post: "Central Govt Section Officer (Level 8)", basic: 47600 },
  { post: "Central Govt Group A entry (Level 10)", basic: 56100 },
];

export const Route = createFileRoute("/8th-pay-commission-bank-employees")({
  head: () => ({
    meta: [
      {
        title: "Is 8th Pay Commission Applicable to Bank Employees? SBI PO Pay Explained",
      },
      {
        name: "description",
        content:
          "Is the 8th Pay Commission applicable to bank employees? How bank wage revision differs from a Central Pay Commission, what it means for SBI PO salary, bank DA and bank pension.",
      },
      {
        name: "keywords",
        content:
          "is 8th pay commission applicable to bank employees, 8th pay commission for bank employees, sbi po salary after 8th pay commission, bank employees pay revision vs pay commission, 8th pay commission bank pension",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:title",
        content: "Is the 8th Pay Commission Applicable to Bank Employees?",
      },
      {
        property: "og:description",
        content:
          "Bank pay is revised by bipartite settlement, not by the Central Pay Commission — here is what that means for SBI PO pay, DA and pension.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-bank-employees` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "8th Pay Commission and Bank Employees",
      },
      {
        name: "twitter:description",
        content:
          "Why bank staff are outside the CPC ambit and how their pay revision actually works.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-bank-employees` }],
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
  component: BankPage,
});

function BankPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Coverage explained
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Is the 8th Pay Commission Applicable to Bank Employees?
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Short answer: no. Public sector bank pay is settled through bipartite
          negotiation with the Indian Banks' Association, on a separate cycle
          from the Central Pay Commission. This page sets out the two systems
          side by side so bank staff, aspirants comparing an SBI PO offer with a
          government post, and pensioners can see exactly which rules apply to
          them.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/salary">Central govt salary calculator</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/role/bank-po">Bank PO salary structure</Link>
          </Button>
        </div>
      </header>

      <DisclaimerBanner />

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[620px] text-sm">
          <caption className="sr-only">
            Central Pay Commission versus bank bipartite wage revision
          </caption>
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Point</th>
              <th className="px-3 py-2.5 font-semibold">Central govt employees</th>
              <th className="px-3 py-2.5 font-semibold">Public sector bank staff</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((r) => (
              <tr key={r.point} className="border-t border-border">
                <td className="px-3 py-2.5 font-medium">{r.point}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{r.central}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{r.bank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose-article mt-10">
        <h2>Why bank employees sit outside the pay commission</h2>
        <p>
          A Central Pay Commission is constituted to advise the Union Government
          on the pay of its own employees and pensioners. Public sector banks are
          separate corporate entities whose wage cost is negotiated by the Indian
          Banks' Association on behalf of member banks, and the outcome is signed
          as a Bipartite Settlement for workmen staff and a Joint Note for
          officers. That is why a bank clerk's scale and a Level 3 central
          government scale can move in completely different years.
        </p>
        <h2>What this means for SBI PO salary</h2>
        <p>
          An SBI Probationary Officer joins in the JMGS-I scale. That scale, the
          DA slab, HRA, city compensatory allowance and perquisites are all fixed
          by the officers' Joint Note — not by the 8th CPC. If you are comparing
          an SBI PO offer with a central government Group B or Group A post, the
          fair comparison is bank scale plus current bank DA against the
          projected central government pay for that level. For the government
          side of that comparison you can read the projected basic pay for
          typical entry posts below and refine it in the calculator.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] text-sm">
            <caption className="sr-only">
              Projected 8th CPC basic pay for comparable central government posts
            </caption>
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Comparable central govt post</th>
                <th className="px-3 py-2.5 font-semibold">7th CPC basic</th>
                <th className="px-3 py-2.5 font-semibold">At 2.57x</th>
                <th className="px-3 py-2.5 font-semibold">At 2.86x</th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((l) => (
                <tr key={l.post} className="border-t border-border">
                  <td className="px-3 py-2.5 font-medium">{l.post}</td>
                  <td className="px-3 py-2.5">{inr(l.basic)}</td>
                  <td className="px-3 py-2.5">{inr(Math.round(l.basic * 2.57))}</td>
                  <td className="px-3 py-2.5">{inr(Math.round(l.basic * 2.86))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>Bank DA versus central government DA</h2>
        <p>
          Bank DA is recalculated every quarter from the CPI-IW average, applied
          through slabs, so it changes four times a year. Central government DA
          is revised twice a year as a single percentage of basic pay — see the
          running series and next-instalment estimate in our{" "}
          <Link to="/da-calculator">DA calculator</Link>. Because the formulas
          differ, never copy a bank DA percentage into a government pay
          projection or the other way round.
        </p>
        <h2>Bank pension and CPC-style updation</h2>
        <p>
          Bank pension runs on the Bank Employees' Pension Regulations, 1995 and
          is updated through settlements rather than commission recommendations.
          Central government pensioners, in contrast, get a revision each time a
          commission's report is accepted — you can model that with the{" "}
          <Link to="/pension">pension calculator</Link>. Demands for periodic
          pension updation in banks are pursued with the IBA and the Department of
          Financial Services, and are unrelated to the 8th CPC timeline.
        </p>
        <h2>If you work in a bank and still want the CPC numbers</h2>
        <p>
          Many households have one member in a bank and another in a central
          government job, so the 8th CPC still matters at home. Use the{" "}
          <Link to="/8th-pay-commission-salary-list">level-wise salary list</Link>{" "}
          for the government side, and the{" "}
          <Link to="/8th-pay-commission-terms-of-reference">terms of reference
          page</Link>{" "}
          to follow where the commission's process currently stands.
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
