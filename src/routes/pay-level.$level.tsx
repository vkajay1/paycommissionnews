import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { getLevel, LEVEL_FITMENTS, levelProjection } from "@/lib/seo-pages";
import { inr } from "@/lib/format";
import { transportAllowance } from "@/lib/pay-matrix";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/pay-level/$level")({
  beforeLoad: ({ params }) => {
    const lvl = Number(params.level);
    const data = getLevel(lvl);
    if (!data) throw notFound();
    return { data };
  },
  head: ({ params }) => {
    const lvl = Number(params.level);
    const data = getLevel(lvl);
    if (!data) return {};
    const title = `Level ${lvl} Salary 2026 — 7th & 8th Pay Commission In-Hand Salary`;
    const desc = `Level ${lvl} pay matrix salary for ${data.grade}. Basic pay ₹${data.entryPay.toLocaleString("en-IN")}, DA, HRA, TA breakdown and 8th Pay Commission projected salary.`;
    const url = `${SITE}/pay-level/${lvl}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `pay level ${lvl} in hand salary, level ${lvl} salary, 7th cpc level ${lvl}, 8th pay commission level ${lvl}, ${data.grade.toLowerCase()} salary`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: LevelNotFound,
  component: LevelPage,
});

function LevelNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Pay level not found</h1>
      <p className="mt-2 text-muted-foreground">Pay levels 1–18 are supported.</p>
      <Button asChild className="mt-6">
        <Link to="/pay-level">See all levels</Link>
      </Button>
    </div>
  );
}

function LevelPage() {
  const { level } = Route.useParams();
  const lvl = Number(level);
  const data = getLevel(lvl)!;
  const basic = data.entryPay;
  const daPct = 58;
  const da = Math.round((basic * daPct) / 100);
  const hraX = Math.round(basic * 0.3);
  const hraY = Math.round(basic * 0.2);
  const hraZ = Math.round(basic * 0.1);
  const ta = transportAllowance(lvl);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
        Pay Matrix · Level {lvl}
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Pay Level {lvl} Salary — {data.grade}
      </h1>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Level {lvl} in the 7th CPC pay matrix corresponds to <strong>{data.grade}</strong> posts
        with an entry basic pay of <strong>{inr(basic)}</strong>. Below is the current in-hand
        breakdown plus 8th Pay Commission projections across four fitment scenarios.
      </p>

      <div className="mt-6">
        <DisclaimerBanner />
      </div>

      {/* 7th CPC breakdown */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">7th CPC in-hand salary (July 2025 DA)</h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              <Trow label="Basic pay (entry cell)" value={inr(basic)} />
              <Trow label={`DA @ ${daPct}%`} value={inr(da)} />
              <Trow label="HRA (X-class city / 30%)" value={inr(hraX)} />
              <Trow label="HRA (Y-class city / 20%)" value={inr(hraY)} />
              <Trow label="HRA (Z-class city / 10%)" value={inr(hraZ)} />
              <Trow label="Transport Allowance" value={inr(ta)} />
              <Trow
                label="Gross salary (X-city)"
                value={inr(basic + da + hraX + ta)}
                bold
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* 8th CPC projections */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">
          8th Pay Commission projected basic (Level {lvl})
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LEVEL_FITMENTS.map((fit) => {
            const newBasic = levelProjection(basic, fit);
            return (
              <div
                key={fit}
                className="rounded-2xl border border-border bg-card p-4 shadow-card"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Fitment {fit}x
                </div>
                <div className="mt-2 text-2xl font-bold">{inr(newBasic)}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  From {inr(basic)} · +{Math.round(((newBasic - basic) / basic) * 100)}%
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/salary" search={{ level: lvl, basic, city: "X", fit: 2.28 }}>
            <Calculator className="mr-2 h-4 w-4" />
            Open in salary calculator
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/da-calculator">
            <TrendingUp className="mr-2 h-4 w-4" />
            DA calculator
          </Link>
        </Button>
      </div>

      {/* Copy */}
      <article className="prose-article mt-12">
        <h2>About Pay Level {lvl}</h2>
        <p>
          Level {lvl} corresponds to <strong>{data.grade}</strong> cadre posts in the Central
          Government. Recruitment is typically through SSC, UPSC, or departmental promotion
          depending on the ministry. Employees enter at the first cell of the level and
          progress through annual increments of 3%.
        </p>
        <h2>Expected 8th CPC salary for Level {lvl}</h2>
        <p>
          Under the widely-projected fitment factor of 2.86x, an entry-cell Level {lvl}{" "}
          employee's basic pay is expected to rise from{" "}
          <strong>{inr(basic)}</strong> to approximately{" "}
          <strong>{inr(levelProjection(basic, 2.86))}</strong>. Once DA (rebased to 0%
          initially), HRA and TA are added on top, the gross salary at implementation is
          typically 25–35% higher than the pre-revision figure.
        </p>
      </article>

      {/* Sibling nav */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Other pay levels</h2>
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {PAY_LEVELS.map((l) => (
            <Link
              key={l.level}
              to="/pay-level/$level"
              params={{ level: String(l.level) }}
              className={`flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm hover:border-primary/40 hover:bg-primary/5 ${l.level === lvl ? "bg-primary/10 font-semibold" : ""}`}
            >
              <span>Level {l.level}</span>
              <ArrowRight className="h-3 w-3 opacity-40" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Trow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <tr className="border-t border-border first:border-t-0">
      <td className={`p-3 ${bold ? "font-semibold" : "text-muted-foreground"}`}>{label}</td>
      <td className={`p-3 text-right tabular-nums ${bold ? "text-lg font-bold" : "font-semibold"}`}>
        {value}
      </td>
    </tr>
  );
}
