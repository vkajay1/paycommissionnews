import { createFileRoute, Link } from "@tanstack/react-router";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { Button } from "@/components/ui/button";

const SITE = "https://paycommissionnews.co.in";

const faqs = [
  {
    q: "Who is the 8th Pay Commission chairman?",
    a: "The government notifies the chairman of a Central Pay Commission along with the terms of reference; by convention a retired Supreme Court judge chairs the commission, supported by a member-secretary from the Department of Expenditure and a part-time member with academic or economic expertise. Treat the gazette notification and PIB release as the only authoritative confirmation of the chairman's name — this page updates when that record changes.",
  },
  {
    q: "What are the 8th Pay Commission terms of reference?",
    a: "The terms of reference (ToR) define what the commission may examine: the pay structure and pay matrix for central government civilian employees, defence personnel, and All India Services; allowances including DA, HRA and transport allowance; pension and family pension for existing and future retirees; and the fiscal impact of any recommendation on the Union Budget. The ToR also fixes the reporting timeline.",
  },
  {
    q: "What is the NC-JCM memorandum in the 8th Pay Commission?",
    a: "The National Council (Staff Side) of the Joint Consultative Machinery is the recognised negotiating body for central government employees. It prepares a consolidated memorandum on behalf of federations, covering the demanded fitment factor, minimum wage computation, merger of pay levels, restoration of the old pension scheme and revision of allowances. The commission then holds oral evidence sessions on that memorandum.",
  },
  {
    q: "Are trade unions demanding interim relief?",
    a: "Yes. Staff federations and unions, including BPMS and the railway and defence civilian federations, have repeatedly pressed for interim relief and DA merger while the commission's report is pending, arguing that the gap between the effective date and the actual payout stretches household budgets. Interim relief is granted only if the government accepts such a demand — it is not automatic.",
  },
  {
    q: "Has the 8th Pay Commission deadline been extended?",
    a: "Pay commissions commonly seek extra time after consultations begin, and the government can extend the reporting deadline by notification. Any extension changes only the report date, not the effective date of revision, because arrears cover the gap from the effective date. Our news section tracks each confirmed timeline change.",
  },
  {
    q: "What does Budget 2026 mean for the 8th Pay Commission?",
    a: "A Union Budget carries the provisioning for revised pay and pension outgo. If the Budget makes a visible allocation towards pay revision, it signals the government is preparing for implementation and arrears in that financial year. Read the demand-for-grants figures rather than headlines for a reliable indication.",
  },
];

export const Route = createFileRoute("/8th-pay-commission-terms-of-reference")({
  head: () => ({
    meta: [
      {
        title: "8th Pay Commission Terms of Reference, Chairman & Latest Approval News",
      },
      {
        name: "description",
        content:
          "8th Pay Commission terms of reference explained, chairman and members, NC-JCM memorandum, trade union demands, interim relief, deadline extension and Budget 2026 provisioning.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission terms of reference, 8th pay commission chairman, 8th pay commission nc-jcm memorandum, 8th pay commission memorandum submission, 8th pay commission demands trade unions, 8th pay commission bpms demands, 8th pay commission interim relief, 8th pay commission deadline extended, 8th pay commission budget 2026, 8th pay commission approval latest news, latest news 8th pay commission",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:title",
        content: "8th Pay Commission Terms of Reference, Chairman & Approval News",
      },
      {
        property: "og:description",
        content:
          "What the 8th CPC terms of reference cover, who chairs the commission, the NC-JCM memorandum, union demands and the Budget 2026 link.",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-terms-of-reference` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "8th Pay Commission Terms of Reference & Chairman",
      },
      {
        name: "twitter:description",
        content:
          "ToR scope, chairman and members, NC-JCM memorandum, interim relief and deadline updates.",
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE}/8th-pay-commission-terms-of-reference` },
    ],
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
  component: TorPage,
});

const TOR_SCOPE = [
  {
    head: "Pay structure and pay matrix",
    body: "Review the existing pay matrix for civilian central government employees, defence forces personnel and All India Services, and recommend a revised structure including the fitment factor used to convert present basic pay.",
  },
  {
    head: "Allowances",
    body: "Examine Dearness Allowance neutralisation, House Rent Allowance slabs for X, Y and Z cities, transport allowance and department-specific allowances, and recommend rationalisation.",
  },
  {
    head: "Pension and family pension",
    body: "Recommend revision of pension, family pension, commutation and gratuity for existing pensioners and future retirees, including parity between pre- and post-revision retirees.",
  },
  {
    head: "Fiscal impact",
    body: "Assess the additional annual outgo on the Union Budget and on state finances that follow the central pattern, and suggest a phased approach where necessary.",
  },
  {
    head: "Reporting timeline",
    body: "Fix the period within which the commission must submit its report, along with the date from which the revised pay is to take effect.",
  },
];

function TorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Commission process
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          8th Pay Commission Terms of Reference, Chairman & Approval Status
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Everything that decides your revised pay happens before the pay matrix
          is published: the terms of reference set the scope, the chairman and
          members run the hearings, the NC-JCM memorandum carries the staff
          side's demands, and the Union Budget provisions the money. This page
          explains each step in plain language and separates confirmed process
          from expectation.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/salary">Estimate your revised salary</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">Latest news 8th Pay Commission</Link>
          </Button>
        </div>
      </header>

      <DisclaimerBanner />

      <section className="mt-8" aria-labelledby="tor-heading">
        <h2 id="tor-heading" className="text-2xl font-bold tracking-tight">
          What the terms of reference cover
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {TOR_SCOPE.map((s) => (
            <div key={s.head} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">{s.head}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <article className="prose-article mt-10">
        <h2>Chairman, members and how hearings work</h2>
        <p>
          A Central Pay Commission is a three-member body: a chairman (usually a
          retired Supreme Court judge), a member-secretary drawn from the
          Department of Expenditure who runs the secretariat, and a part-time
          member with economics or public-finance expertise. After the
          notification the secretariat invites memoranda, tours regional centres
          to record oral evidence from federations, and commissions wage studies
          before drafting recommendations. Nothing in the draft becomes payable
          until the Union Cabinet accepts the report and the Department of
          Expenditure issues a resolution.
        </p>
        <h2>NC-JCM memorandum and memorandum submission</h2>
        <p>
          The Staff Side of the National Council (JCM) consolidates demands from
          railway, defence civilian, postal and central secretariat federations
          into a single memorandum. Typical asks include a fitment factor
          between 2.57x and 3.68x, a minimum wage recomputed on the Aykroyd
          formula, merger of adjacent pay levels to fix stagnation, five
          promotions in service, and restoration of a guaranteed pension.
          Individual associations, including BPMS on the defence civilian side,
          file separate memoranda on cadre-specific issues such as MACP and
          risk-hardship allowance.
        </p>
        <h2>Interim relief and DA merger demands</h2>
        <p>
          Because the effective date and the payout date rarely coincide,
          federations ask for interim relief — an ad-hoc amount adjusted later
          against arrears — and for merging part of DA with basic pay. Both are
          discretionary. If neither is granted, the gap is settled through
          arrears; you can model that amount with our{" "}
          <Link to="/arrear">arrear calculator</Link> and, for retirees, the{" "}
          <Link to="/pension-arrear">pension arrear calculator</Link>.
        </p>
        <h2>Deadline extension and Budget 2026</h2>
        <p>
          Extensions to the reporting deadline are routine in pay commission
          history and do not change the effective date of revision. What matters
          financially is Budget provisioning: watch the salary and pension heads
          in the demand-for-grants documents, since an enlarged allocation is the
          clearest public signal that implementation and arrears are being
          prepared. For context on how the previous three commissions moved from
          notification to payout, see our{" "}
          <Link to="/pay-commission-history">pay commission history</Link>.
        </p>
        <h2>What to do while the report is pending</h2>
        <p>
          Use the projections rather than waiting: run your basic pay through the{" "}
          <Link to="/salary">8th Pay Commission salary calculator</Link>, compare
          scenarios on the{" "}
          <Link to="/fitment-factor">fitment factor table</Link>, and read the
          level-wise{" "}
          <Link to="/8th-pay-commission-salary-list">salary list</Link> to see
          where your level lands at different fitment factors.
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
