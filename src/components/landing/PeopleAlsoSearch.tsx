import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

/** High-intent "people also search for" queries mapped to on-site destinations. */
export const peopleAlsoSearch: { q: string; to: string }[] = [
  { q: "8th Pay Commission salary calculator", to: "/salary" },
  { q: "8th Pay Commission salary increase 2026", to: "/8th-pay-commission-salary-list" },
  { q: "8th Pay Commission salary list", to: "/8th-pay-commission-salary-list" },
  { q: "8th Pay Commission salary structure PDF", to: "/8th-pay-commission-salary-list" },
  { q: "How much salary increase in 8th Pay Commission", to: "/8th-pay-commission-salary-list" },
  { q: "8th Pay Commission news", to: "/blog" },
  { q: "8th Pay Commission approval latest news", to: "/blog" },
  { q: "8th Pay Commission official website", to: "/pay-commission-history" },
  { q: "8th Pay Commission pension calculator", to: "/8th-pay-commission-pension-calculator" },
  { q: "8th Pay Commission arrears calculator", to: "/8th-pay-commission-arrears-calculator" },
  { q: "8th Pay Commission fitment factor", to: "/fitment-factor" },
  { q: "8वां वेतन आयोग सैलरी कैलकुलेटर", to: "/8th-pay-commission-salary-calculator-in-hindi" },
];

export function PeopleAlsoSearch() {
  return (
    <section
      className="mx-auto max-w-5xl px-4 py-14 sm:px-6"
      aria-labelledby="pas-heading"
    >
      <div className="mb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          People also search for
        </span>
        <h2
          id="pas-heading"
          className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          8th Pay Commission searches, answered
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Jump straight to the calculator, level-wise salary list or the latest
          8th CPC news for the question you came here with.
        </p>
      </div>
      <ul className="flex flex-wrap justify-center gap-2">
        {peopleAlsoSearch.map(({ q, to }) => (
          <li key={q}>
            <Link
              to={to}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              {q}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
