import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calculator, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { getStatePage, STATE_PAGES, levelProjection } from "@/lib/seo-pages";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/state/$state")({
  beforeLoad: ({ params }) => {
    const data = getStatePage(params.state);
    if (!data) throw notFound();
    return { data };
  },
  head: ({ params }) => {
    const s = getStatePage(params.state);
    if (!s) return {};
    const title = `8th Pay Commission Salary Scenarios in ${s.name} — Level-Wise`;
    const desc = `8th Pay Commission salary list in ${s.name}: level-wise projected basic pay at 2.57x and 2.86x, cadre-wise breakdown, current state DA of ${s.daPct}% and a live salary calculator for ${s.name} government employees.`;
    const url = `${SITE}/state/${s.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `8th pay commission salary list in ${s.name.toLowerCase()}, 8th pay commission salary list ${s.name.toLowerCase()}, ${s.keyword}, ${s.name.toLowerCase()} salary calculator, ${s.name.toLowerCase()} 7th pay matrix, ${s.name.toLowerCase()} government employee salary`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "States", item: `${SITE}/state` },
              {
                "@type": "ListItem",
                position: 3,
                name: `8th Pay Commission Salary List in ${s.name}`,
                item: url,
              },
            ],
          }),
        },
      ],
    };
  },

  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">State not found</h1>
      <Button asChild className="mt-4">
        <Link to="/state">See all states</Link>
      </Button>
    </div>
  ),
  component: StatePageView,
});

function StatePageView() {
  const { state } = Route.useParams();
  const s = getStatePage(state)!;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
        <MapPin className="h-3 w-3" /> State Government
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        8th Pay Commission Salary List in {s.name} (2026)
      </h1>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Level-wise and cadre-wise 8th Pay Commission salary list for {s.name} state
        government employees, covering approximately {s.employees}. Current state DA is{" "}
        <strong>{s.daPct}%</strong>. {s.adoptionLag}
      </p>

      <div className="mt-6">
        <DisclaimerBanner />
      </div>

      <section className="mt-10" aria-labelledby="level-list">
        <h2 id="level-list" className="mb-2 text-xl font-bold">
          8th Pay Commission salary list in {s.name} — Level 1 to Level 18
        </h2>
        <p className="mb-4 max-w-3xl text-sm text-muted-foreground">
          Each row applies the two most-discussed fitment factors, 2.57x and 2.86x, to the
          entry basic pay of the corresponding pay level used in {s.name}. DA restarts at 0%
          on the revised basic, so treat these as basic-pay projections only.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[560px] text-sm">
            <caption className="sr-only">
              8th Pay Commission salary list in {s.name}: projected basic pay by pay level
            </caption>
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Level</th>
                <th className="p-3 font-semibold">Typical post</th>
                <th className="p-3 font-semibold">Present basic</th>
                <th className="p-3 font-semibold">At 2.57x</th>
                <th className="p-3 font-semibold">At 2.86x</th>
              </tr>
            </thead>
            <tbody>
              {PAY_LEVELS.map((l) => (
                <tr key={l.level} className="border-t border-border">
                  <td className="p-3 font-medium">Level {l.level}</td>
                  <td className="p-3 text-muted-foreground">{l.grade}</td>
                  <td className="p-3 tabular-nums">{inr(l.entryPay)}</td>
                  <td className="p-3 tabular-nums">
                    {inr(levelProjection(l.entryPay, 2.57))}
                  </td>
                  <td className="p-3 tabular-nums font-semibold text-primary">
                    {inr(levelProjection(l.entryPay, 2.86))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Cadre-wise salary breakdown ({s.name})</h2>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Cadre</th>
                <th className="p-3 font-semibold">Level</th>
                <th className="p-3 font-semibold">7th CPC basic</th>
                <th className="p-3 font-semibold">8th CPC @ 2.86x</th>
              </tr>
            </thead>
            <tbody>
              {s.cadres.map((c) => (
                <tr key={c.name} className="border-t border-border">
                  <td className="p-3 font-semibold">{c.name}</td>
                  <td className="p-3">Level {c.level}</td>
                  <td className="p-3 tabular-nums">{inr(c.basic)}</td>
                  <td className="p-3 tabular-nums font-semibold text-primary">
                    {inr(levelProjection(c.basic, 2.86))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <article className="prose-article mt-10">
        <h2>How {s.name} implements pay commission revisions</h2>
        <p>{s.notes}</p>
        <h2>What to expect on 8th CPC rollout</h2>
        <p>
          A Central Pay Commission revision does not automatically change state pay. The {s.name}{" "}
          government must review the central recommendations and issue its own adoption order. The
          2.57x and 2.86x columns above are comparison scenarios requested by readers; neither is a
          notified fitment factor. Effective dates, DA treatment and HRA rules may differ by state.
        </p>
      </article>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/salary">
            <Calculator className="mr-2 h-4 w-4" /> Open salary calculator
          </Link>
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Other state calculators</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {STATE_PAGES.filter((x) => x.slug !== s.slug).map((x) => (
            <Link
              key={x.slug}
              to="/state/$state"
              params={{ state: x.slug }}
              className="rounded-lg border border-border p-3 text-sm hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="font-semibold">{x.name}</div>
              <div className="text-xs text-muted-foreground">DA {x.daPct}%</div>
            </Link>
          ))}
        </div>
      </section>

      <DiscussionBox />
    </div>
  );
}
