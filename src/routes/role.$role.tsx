import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calculator, Briefcase, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { getRolePage, ROLE_PAGES, levelProjection } from "@/lib/seo-pages";
import { inr } from "@/lib/format";
import { transportAllowance } from "@/lib/pay-matrix";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/role/$role")({
  beforeLoad: ({ params }) => {
    const data = getRolePage(params.role);
    if (!data) throw notFound();
    return { data };
  },
  head: ({ params }) => {
    const r = getRolePage(params.role);
    if (!r) return {};
    const title = `${r.name} Salary 2026 — 7th & 8th Pay Commission In-Hand Salary`;
    const desc = `${r.name} salary breakdown: basic pay ₹${r.basic.toLocaleString("en-IN")}, DA, HRA, allowances and 8th CPC projections. ${r.department}.`;
    const url = `${SITE}/role/${r.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `${r.keyword}, ${r.name.toLowerCase()} in hand salary, ${r.name.toLowerCase()} 8th pay commission, ${r.name.toLowerCase()} 7th cpc`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Role not found</h1>
      <Button asChild className="mt-4">
        <Link to="/role">See all roles</Link>
      </Button>
    </div>
  ),
  component: RolePageView,
});

function RolePageView() {
  const { role } = Route.useParams();
  const r = getRolePage(role)!;
  const daPct = 58;
  const da = Math.round((r.basic * daPct) / 100);
  const hraRate = r.city === "X" ? 30 : r.city === "Y" ? 20 : 10;
  const hra = Math.round((r.basic * hraRate) / 100);
  const ta = transportAllowance(r.level);
  const gross = r.basic + da + hra + ta;
  const projected286 = levelProjection(r.basic, 2.86);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
        <Briefcase className="h-3 w-3" />
        {r.department}
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{r.name} Salary 2026</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{r.description}</p>

      <div className="mt-6">
        <DisclaimerBanner />
      </div>

      {/* Salary breakdown */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Current 7th CPC in-hand salary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Pay level" value={`Level ${r.level}`} />
            <Row label="Basic pay" value={inr(r.basic)} />
            <Row label={`DA @ ${daPct}%`} value={inr(da)} />
            <Row label={`HRA (${r.city}-class, ${hraRate}%)`} value={inr(hra)} />
            <Row label="Transport Allowance" value={inr(ta)} />
            <div className="my-2 h-px bg-border" />
            <Row label="Approx. gross" value={inr(gross)} bold />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">8th Pay Commission projection</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Fitment 2.28x" value={inr(levelProjection(r.basic, 2.28))} />
            <Row label="Fitment 2.57x" value={inr(levelProjection(r.basic, 2.57))} />
            <Row label="Fitment 2.86x" value={inr(projected286)} highlight />
            <Row label="Fitment 3.00x" value={inr(levelProjection(r.basic, 3.0))} />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Basic pay only. DA resets to 0% on 8th CPC rollout; HRA and TA revised at new
            slabs on top.
          </p>
        </div>
      </section>

      {/* Duties / perks / promotion */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <InfoCard title="Duties" items={r.duties} />
        <InfoCard title="Allowances & perks" items={r.perks} />
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold">Promotion path</h3>
          <p className="mt-2 text-sm text-muted-foreground">{r.promotion}</p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link
            to="/salary"
            search={{ level: r.level, basic: r.basic, city: r.city, fit: 2.28 }}
          >
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

      {/* Related */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Other roles</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ROLE_PAGES.filter((x) => x.slug !== r.slug).map((x) => (
            <Link
              key={x.slug}
              to="/role/$role"
              params={{ role: x.slug }}
              className="rounded-lg border border-border p-3 text-sm hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="font-semibold">{x.name}</div>
              <div className="text-xs text-muted-foreground">{x.department}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span
        className={`tabular-nums ${bold ? "text-lg font-bold" : highlight ? "font-bold text-primary" : "font-semibold"}`}
      >
        {value}
      </span>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-sm font-bold">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
