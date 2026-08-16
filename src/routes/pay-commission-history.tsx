import { createFileRoute, Link } from "@tanstack/react-router";
import { History } from "lucide-react";
import { CalcHeader, CalcContent, faqLd } from "@/components/calc/CalcShell";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import {
  CPC_HISTORY,
  FITMENT_SCENARIOS,
  HRA_STAIRCASE,
  OFFICIAL_SOURCES,
  TPTA_CITIES,
  MERGE_MULTIPLIER,
} from "@/lib/cpc-facts";

const SITE = "https://paycommissionnews.co.in";

const faq = [
  {
    q: "How is the 8th Pay Commission salary estimated before the report is out?",
    a: "By reusing the 7th CPC's own arithmetic. Dearness Allowance at the reference date is merged into basic pay, a real hike is applied on top of that merged figure, DA restarts at zero and HRA drops back to 24/16/8 per cent. Only the size of the real hike is unknown, which is why every calculator here is driven by a fitment factor you choose.",
  },
  {
    q: "What is the DA merge multiplier for the 8th CPC?",
    a: "1.60, because DA stood at 60 per cent on 1 January 2026. The equivalent number in the 6th to 7th transition was 2.25, since DA had reached 125 per cent by 1 January 2016.",
  },
  {
    q: "Why does DA go back to zero when a new pay commission arrives?",
    a: "DA exists only to protect purchasing power between commissions. Once the accumulated DA is folded into the new basic pay, keeping it would pay for the same inflation twice, so the counter restarts at zero and climbs again with the January and July instalments.",
  },
  {
    q: "Why does HRA fall from 30/20/10 to 24/16/8 per cent?",
    a: "HRA percentages are pegged to cumulative DA, not to the commission. When DA resets, the percentages reset with it and then ratchet back up — 27/18/9 once fresh DA crosses 25 per cent and 30/20/10 once it crosses 50 per cent.",
  },
  {
    q: "What are HRA floors and do they change under the 8th CPC?",
    a: "The 7th CPC floors of ₹5,400, ₹3,600 and ₹1,800 are simply 30, 20 and 10 per cent of Level-1 Cell-1 basic pay of ₹18,000. They exist so a fresh recruit in a metro is not worse off on the day a new commission starts. Because Level-1 basic is multiplied by the fitment factor, the floors scale by the same factor.",
  },
  {
    q: "Will Transport Allowance and CGHS also go up?",
    a: "Historically both moved with the DA merge rather than with the fitment factor. On the 1.60 merge, Transport Allowance of ₹7,200, ₹3,600 and ₹1,350 would land near ₹11,500, ₹5,800 and ₹2,200, and CGHS subscriptions of ₹250, ₹650 and ₹1,000 near ₹400, ₹1,040 and ₹1,600.",
  },
  {
    q: "Does the 14 per cent government NPS contribution change?",
    a: "The percentage is set by the pension regulator and the Department of Pensions, not by a pay commission, so it stays at 14 per cent of basic plus DA. The rupee amount still rises automatically because the basic rises.",
  },
  {
    q: "How long will implementation take after the report?",
    a: "The 7th CPC reported in November 2015, the Cabinet accepted it in June 2016, orders followed in July 2016 and money reached accounts in August 2016 with seven months of arrears. A comparable run for the 8th CPC points to a report around May 2027 and disbursement late in 2027, with arrears back to the reference date.",
  },
];

export const Route = createFileRoute("/pay-commission-history")({
  head: () => ({
    meta: [
      {
        title: "Pay Commission History 1st to 8th CPC — Fitment Factors & Method",
      },
      {
        name: "description",
        content:
          "Complete Central Pay Commission history from 1946 to 2026 with chairmen, effective dates and fitment factors, plus the exact method used to estimate 8th CPC salary, HRA, TA and CGHS.",
      },
      {
        name: "keywords",
        content:
          "pay commission history, cpc calculation, fitment table, current fitment factor, previous fitment factor, 8th pay commission salary revision estimates, 8th cpc methodology",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:title",
        content: "Pay Commission History 1st to 8th CPC — Fitment Factors & Method",
      },
      {
        property: "og:description",
        content:
          "Every Central Pay Commission since 1946, and the step-by-step method behind 8th CPC salary estimates.",
      },
      { property: "og:url", content: `${SITE}/pay-commission-history` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pay Commission History 1st to 8th CPC" },
      {
        name: "twitter:description",
        content: "Chairmen, effective dates, fitment factors and the 8th CPC estimation method.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE}/pay-commission-history` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd(faq)) }],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <CalcHeader
        icon={History}
        kicker="Reference"
        title="Pay Commission history and the 8th CPC method"
        sub="Eight commissions in eighty years, the fitment factor each one settled on, and the four-step arithmetic this site uses to project 8th CPC pay."
      />

      <DisclaimerBanner />

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold">Every Central Pay Commission since 1946</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Each commission has reset pay, allowances and pension for roughly 48 lakh serving
          central government employees and 67 lakh pensioners. The fitment factor is the
          number everyone remembers, because it is the single multiplier that converts old
          basic pay into new basic pay.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-secondary/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Commission</th>
                <th className="px-4 py-3 font-semibold">Effective from</th>
                <th className="px-4 py-3 font-semibold">Chairperson</th>
                <th className="px-4 py-3 font-semibold">What changed</th>
              </tr>
            </thead>
            <tbody>
              {CPC_HISTORY.map((c) => (
                <tr key={c.cpc} className="border-t border-border/60">
                  <td className="px-4 py-3 font-semibold">{c.cpc}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.effective}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.chair}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold">Fitment factor scenarios on the table</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-secondary/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Factor</th>
                <th className="px-4 py-3 font-semibold">Real hike over the merged base</th>
                <th className="px-4 py-3 font-semibold">Who is arguing for it</th>
              </tr>
            </thead>
            <tbody>
              {FITMENT_SCENARIOS.map((s) => (
                <tr key={s.factor} className="border-t border-border/60">
                  <td className="px-4 py-3 font-semibold text-primary">{s.factor.toFixed(2)}x</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.hike}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.backer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          A factor is not a percentage hike. At 1.92x the basic pay nearly doubles on paper,
          but most of that jump is the 60 per cent DA you already receive being rolled into
          basic. The genuinely new money is only the part above the {MERGE_MULTIPLIER.toFixed(2)}x merge.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold">The HRA staircase after a new commission</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-secondary/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Stage</th>
                <th className="px-4 py-3 font-semibold">X city</th>
                <th className="px-4 py-3 font-semibold">Y city</th>
                <th className="px-4 py-3 font-semibold">Z city</th>
              </tr>
            </thead>
            <tbody>
              {HRA_STAIRCASE.map((h) => (
                <tr key={h.when} className="border-t border-border/60">
                  <td className="px-4 py-3 text-muted-foreground">{h.when}</td>
                  <td className="px-4 py-3 font-semibold">{h.x}%</td>
                  <td className="px-4 py-3 font-semibold">{h.y}%</td>
                  <td className="px-4 py-3 font-semibold">{h.z}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold">
          The 19 cities that qualify for higher Transport Allowance
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Transport Allowance has two slabs. Posted in one of these notified cities you draw
          the higher rate; posted anywhere else you draw the lower one. Every X-class HRA city
          is on this list, and no Z-class city is.
        </p>
        <div className="flex flex-wrap gap-2">
          {TPTA_CITIES.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <CalcContent
        heading="How an 8th CPC salary estimate is actually built"
        intro="The 7th CPC did not invent its numbers; it followed a sequence that every commission since the second has broadly repeated. Applying that same sequence to the 7th to 8th transition is what produces a defensible estimate rather than a guess."
        method={[
          {
            title: "Step 1 — freeze the picture at the reference date",
            body: "The 7th CPC worked from 1 January 2016, when DA on 6th CPC pay had reached 125 per cent. The Cabinet-approved Terms of Reference point the 8th CPC at 1 January 2026, when DA on 7th CPC pay was 60 per cent. Later DA instalments do not change this anchor, because the revision applies retrospectively from the reference date even though the money arrives much later.",
          },
          {
            title: "Step 2 — merge DA into basic pay",
            body: "Basic plus DA at the reference date becomes the new base. That gave a merge multiplier of 2.25 in the 6th to 8th transition and gives 1.60 this time. Nobody is better off at this step; it is pure relabelling of money already in hand.",
          },
          {
            title: "Step 3 — add the real hike",
            body: "The 7th CPC added about 14.29 per cent over the merged base, which is how 2.25 became a headline 2.57. The size of this top-up for the 8th CPC is the only genuinely open question, and it is a negotiated outcome between staff federations pushing for 30 to 80 per cent and a Finance Ministry watching the fiscal deficit.",
          },
          {
            title: "Step 4 — reset DA and reprice the allowances",
            body: "DA restarts at zero, HRA drops to 24/16/8 per cent with floors scaled by the fitment factor, and Transport Allowance and CGHS subscriptions move with the merge multiplier rather than the fitment factor. NPS stays at 10 per cent employee and 14 per cent employer, and CGEGIS stays at ₹120, ₹60 and ₹30.",
          },
          {
            title: "How much confidence to place on the output",
            body: "Treat every projection as directional, comfortably within a 15 per cent band either way. The method is sound and the allowance behaviour is well documented, but the final fitment factor and any structural redesign — merged pay levels, a revised insurance scheme, new allowance heads — stay unknown until the Department of Expenditure notifies the report. Useful for planning, not for signing a loan agreement.",
          },
        ]}
        formula={[
          "Merge multiplier = 1 + DA at reference date = 1 + 0.60 = 1.60",
          "New basic = old basic x fitment factor",
          "Real hike % = (fitment factor / 1.60 - 1) x 100",
          "New HRA = max(new basic x 24/16/8%, old floor x fitment factor)",
          "New TA = old TA x 1.60 (plus fresh DA on TA)",
          "Net in-hand = basic + DA + HRA + TA - (NPS 10% + CGHS + CGEGIS + tax)",
        ]}
        faq={faq}
        related={[
          { label: "Salary calculator", to: "/salary" },
          { label: "Fitment factor table", to: "/fitment-factor" },
          { label: "DA calculator", to: "/da-calculator" },
          { label: "Arrears calculator", to: "/arrear" },
          { label: "Pension calculator", to: "/pension" },
        ]}
      />

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold">Orders and notifications behind these numbers</h2>
        <div className="space-y-5">
          {OFFICIAL_SOURCES.map((g) => (
            <div key={g.area} className="rounded-lg border border-border bg-card p-5">
              <div className="mb-2 text-sm font-semibold">{g.area}</div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Working out your own figures?{" "}
          <Link to="/salary" className="font-semibold text-primary hover:underline">
            Open the salary calculator
          </Link>{" "}
          and pick the scenario you want to test.
        </p>
      </section>
    </div>
  );
}
