import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Reusable internal-linking block. Descriptive anchor text pointing at the
 * site's core calculators and hubs so PageRank flows from content pages to
 * the tools that convert.
 */
const CORE_LINKS: { to: string; label: string; blurb: string }[] = [
  {
    to: "/salary",
    label: "8th CPC Salary Calculator",
    blurb: "Estimate revised basic, DA, HRA and net in-hand salary.",
  },
  {
    to: "/8th-pay-commission-pension-calculator",
    label: "8th CPC Pension Calculator",
    blurb: "Projected pension and family pension after revision.",
  },
  {
    to: "/8th-pay-commission-arrears-calculator",
    label: "Arrear Calculator",
    blurb: "Compute arrears from the 8th CPC effective date.",
  },
  {
    to: "/fitment-calculator",
    label: "Fitment Factor Calculator",
    blurb: "Try 2.28x to 3.0x fitment scenarios instantly.",
  },
  {
    to: "/da-calculator",
    label: "DA Calculator",
    blurb: "Latest Dearness Allowance on your current basic pay.",
  },
  {
    to: "/hra-calculator",
    label: "HRA Calculator",
    blurb: "House Rent Allowance by X, Y and Z city class.",
  },
  {
    to: "/take-home-salary",
    label: "Take-Home Salary Calculator",
    blurb: "Net salary after NPS, tax and other deductions.",
  },
  {
    to: "/8th-pay-commission-salary-list",
    label: "8th CPC Salary List (Level 1–18)",
    blurb: "Projected basic pay for every pay level at a glance.",
  },
  {
    to: "/8th-pay-commission-pay-matrix",
    label: "8th CPC Pay Matrix",
    blurb: "Projected pay matrix table with all cells and levels.",
  },
  {
    to: "/pay-level",
    label: "Pay Level Wise Salary",
    blurb: "Level 1 to 18 breakdowns with current and projected pay.",
  },
  {
    to: "/role",
    label: "Post-Wise Salary",
    blurb: "Salary by post — ALP, Talathi, clerk, teacher and more.",
  },
  {
    to: "/state",
    label: "State-Wise Salary",
    blurb: "8th CPC salary scenarios for all 36 states and UTs.",
  },
  {
    to: "/latest-jobs",
    label: "Latest Government Jobs",
    blurb: "Fresh central and state recruitment notifications.",
  },
  {
    to: "/blog",
    label: "8th CPC News & Articles",
    blurb: "Latest pay commission news, explainers and analysis.",
  },
];

export function RelatedTools({
  title = "Related calculators and tools",
  count = 6,
  exclude = [],
}: {
  title?: string;
  count?: number;
  /** Route paths already prominent on this page — skipped to avoid self-links. */
  exclude?: string[];
}) {
  const links = CORE_LINKS.filter((l) => !exclude.includes(l.to)).slice(0, count);
  return (
    <section className="mt-12" aria-label={title}>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="flex items-center justify-between gap-2 text-sm font-semibold group-hover:text-primary">
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{l.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
