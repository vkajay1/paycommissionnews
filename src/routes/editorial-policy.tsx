import { createFileRoute, Link } from "@tanstack/react-router";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy & Calculation Methodology — 8th CPC" },
      {
        name: "description",
        content:
          "How Pay Commission News verifies updates, labels estimates, calculates salary scenarios, cites official sources and handles corrections.",
      },
      { property: "og:title", content: "Editorial Policy & Calculation Methodology" },
      {
        property: "og:description",
        content:
          "Our standards for official sources, 8th CPC estimates, calculator formulas, updates and corrections.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/editorial-policy` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/editorial-policy` }],
  }),
  component: EditorialPolicyPage,
});

function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header>
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Editorial policy and calculation methodology
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our calculators and explainers are designed to separate confirmed government information
          from planning scenarios. This page explains how we research, calculate and correct our work.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Last reviewed: 26 August 2026</p>
      </header>

      <article className="prose-article mt-10">
        <h2>Source hierarchy</h2>
        <p>
          We give priority to primary sources: Gazette notifications, resolutions, Office Memoranda,
          recruitment notices and circulars published by the Government of India, the Department of
          Expenditure, the Press Information Bureau and relevant state finance departments. News
          reports and employee-association demands may provide context, but we do not present them as
          a government decision.
        </p>
        <ul>
          <li>
            <a href="https://doe.gov.in" target="_blank" rel="noopener noreferrer">
              Department of Expenditure
            </a>
          </li>
          <li>
            <a href="https://pib.gov.in" target="_blank" rel="noopener noreferrer">
              Press Information Bureau
            </a>
          </li>
          <li>
            <a href="https://egazette.gov.in" target="_blank" rel="noopener noreferrer">
              Gazette of India
            </a>
          </li>
        </ul>

        <h2>Confirmed facts versus estimates</h2>
        <p>
          Until the Government publishes final 8th Central Pay Commission recommendations and an
          implementation order, future basic pay, fitment factor, allowances, effective date and
          arrears remain unknown. We label modelled figures as estimates, projections or scenarios.
          A number appearing in a calculator is not a prediction or an official entitlement.
        </p>

        <h2>How salary scenarios are calculated</h2>
        <p>
          The basic-pay scenario is calculated as current basic pay multiplied by the fitment factor
          selected by the visitor. Results are rounded to the nearest rupee. Current-pay comparisons
          add the DA, HRA and transport-allowance inputs shown in the tool. Because DA is normally
          absorbed into a revised pay structure, projected 8th CPC basic pay should not be compared
          directly with present basic pay plus DA as though both were take-home salary.
        </p>
        <p>
          Formula: projected basic pay = current basic pay × selected fitment factor. Arrears tools
          multiply the estimated monthly difference by the selected number of months. Pension tools
          use the percentage and commutation assumptions displayed beside their inputs. Taxes,
          deductions and department-specific allowances can make an actual payslip different.
        </p>

        <h2>State and role pages</h2>
        <p>
          State pages explain scenarios rather than claiming that a Central Pay Commission applies
          automatically. Each state decides whether, when and how to adopt a central revision. Role
          pages use the pay level stated in the relevant recruitment or service framework; readers
          should verify their appointment order because grade, city class and special allowances vary.
        </p>

        <h2>Updates and corrections</h2>
        <p>
          Time-sensitive articles display published and updated dates. When an official order changes
          a rate or assumption, we update the affected calculator or article. We correct material
          factual errors rather than silently preserving an outdated claim. To report an issue, send
          the page URL, the disputed text and a primary-source link through our{" "}
          <Link to="/contact">contact page</Link>.
        </p>

        <h2>Independence</h2>
        <p>
          Pay Commission News is an independent information service and is not a Government of India
          website. Advertising does not determine our calculator results or editorial conclusions.
          Official orders always take precedence over this website.
        </p>
      </article>
    </main>
  );
}