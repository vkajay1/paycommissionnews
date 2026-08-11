import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GitCompareArrows } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";
import { PAY_LEVELS, transportAllowance, FITMENT_CHIPS } from "@/lib/pay-matrix";
import { CURRENT_DA } from "@/lib/da-rates";
import {
  CalcContent,
  CalcHeader,
  appLd,
  faqLd,
  type Faq,
} from "@/components/calc/CalcShell";

const SITE = "https://paycommissionnews.co.in";

const HRA_7: Record<string, number> = { X: 30, Y: 20, Z: 10 };
const HRA_8: Record<string, number> = { X: 24, Y: 16, Z: 8 };

const faq: Faq[] = [
  {
    q: "How much salary increase is expected from the 7th to the 8th CPC?",
    a: "It depends entirely on the fitment factor. On a 2.28 factor applied to basic pay after the 60% DA merge, gross salary rises by roughly 12% to 15%. At 2.57 the rise is closer to 25%, and at 2.86 it approaches 35%. Staff federations have demanded 2.86 or higher, while most independent estimates cluster around 1.92 to 2.28.",
  },
  {
    q: "Why does the increase look smaller than the fitment factor suggests?",
    a: "Because the fitment factor is applied after existing DA is merged into basic pay, and DA then resets to zero. A 2.28 factor on ₹44,900 gives ₹1,02,372 of revised basic, but you were already drawing ₹44,900 plus 60% DA, so the real gain is the difference between the new gross and the old gross, not the raw multiple.",
  },
  {
    q: "Will HRA go down under the 8th CPC?",
    a: "The percentage will likely be rebased downward, as it was in 2016, because it is charged on a much larger basic pay. Lower rates on a bigger base usually still mean a higher rupee amount, and the floor amounts protect employees at the lower levels.",
  },
  {
    q: "Which pay levels gain the most?",
    a: "In rupee terms the higher levels gain far more because every allowance is a percentage of a bigger basic. In percentage terms the gain is broadly uniform across levels, since the same fitment factor applies to everyone. Level-specific gains change only where transport allowance or HRA floors kick in.",
  },
  {
    q: "When will 8th CPC pay actually be paid?",
    a: "The commission is expected to submit its report and the government to notify the revised pay rules with effect from 1 January 2026, with actual payment beginning later and the intervening months released as arrears.",
  },
];

export const Route = createFileRoute("/7th-vs-8th-pay-commission")({
  head: () => ({
    meta: [
      {
        title: "7th vs 8th Pay Commission Salary Comparison — All 18 Levels Table",
      },
      {
        name: "description",
        content:
          "Compare 7th CPC and 8th CPC salary side by side for every pay level and post. Interactive tool with fitment factor slider, level-wise basic, DA, HRA, gross and hike percentage.",
      },
      {
        name: "keywords",
        content:
          "7th vs 8th pay commission, 7th cpc vs 8th cpc salary comparison, 8th pay commission salary table all levels, pay level wise salary comparison, 8th cpc hike percentage",
      },
      { property: "og:title", content: "7th vs 8th Pay Commission — Level-wise Salary Comparison" },
      {
        property: "og:description",
        content: "Side-by-side 7th and 8th CPC salary for all 18 levels with a live fitment slider.",
      },
      { property: "og:url", content: `${SITE}/7th-vs-8th-pay-commission` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/7th-vs-8th-pay-commission` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          appLd(
            "7th vs 8th Pay Commission Comparison Tool",
            `${SITE}/7th-vs-8th-pay-commission`,
            "Level-wise comparison of 7th CPC and projected 8th CPC salary.",
          ),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  const [fit, setFit] = useState(2.28);
  const [city, setCity] = useState<"X" | "Y" | "Z">("X");
  const [daPct, setDaPct] = useState(CURRENT_DA);
  const [mergeDa, setMergeDa] = useState<"yes" | "no">("yes");

  const rows = useMemo(
    () =>
      PAY_LEVELS.map((p) => {
        const basic7 = p.entryPay;
        const da7 = Math.round((basic7 * daPct) / 100);
        const hra7 = Math.round((basic7 * HRA_7[city]) / 100);
        const taBase = transportAllowance(p.level);
        const ta7 = taBase + Math.round((taBase * daPct) / 100);
        const gross7 = basic7 + da7 + hra7 + ta7;

        const revised = Math.round(basic7 * fit);
        const da8 = mergeDa === "yes" ? 0 : Math.round((revised * daPct) / 100);
        const hra8 = Math.round((revised * HRA_8[city]) / 100);
        const ta8 = Math.round(taBase * 1.25);
        const gross8 = revised + da8 + hra8 + ta8;

        const diff = gross8 - gross7;
        const pct = gross7 > 0 ? (diff / gross7) * 100 : 0;
        return { ...p, basic7, da7, hra7, ta7, gross7, basic8: revised, hra8, ta8, gross8, diff, pct };
      }),
    [fit, city, daPct, mergeDa],
  );

  const avgPct = rows.reduce((s, r) => s + r.pct, 0) / rows.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <CalcHeader
        icon={GitCompareArrows}
        kicker="Comparison tool"
        title="7th vs 8th Pay Commission Salary"
        sub="Set a fitment factor and city class, then read the projected 8th CPC salary against your current 7th CPC pay for every one of the 18 pay levels and their posts."
      />
      <DisclaimerBanner />

      <Card className="mt-6 grid gap-6 rounded-3xl p-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Label className="text-xs text-muted-foreground">
            Fitment factor — {fit.toFixed(2)}x
          </Label>
          <Slider
            className="mt-3"
            value={[fit]}
            min={1.5}
            max={4}
            step={0.01}
            onValueChange={(v) => setFit(v[0])}
          />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {FITMENT_CHIPS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFit(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  Math.abs(fit - f) < 0.005
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/80 hover:bg-secondary/70"
                }`}
              >
                {f.toFixed(2)}x
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">City class</Label>
          <Select value={city} onValueChange={(v) => setCity(v as "X" | "Y" | "Z")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="X">X — metro</SelectItem>
              <SelectItem value="Y">Y — mid-size city</SelectItem>
              <SelectItem value="Z">Z — small town</SelectItem>
            </SelectContent>
          </Select>
          <Label className="mt-3 block text-xs text-muted-foreground">Current DA</Label>
          <Select value={String(daPct)} onValueChange={(v) => setDaPct(Number(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[50, 53, 55, 58, 60, 62, 64, 66].map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d}%
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">DA treatment</Label>
          <Select value={mergeDa} onValueChange={(v) => setMergeDa(v as "yes" | "no")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">DA merged, resets to 0%</SelectItem>
              <SelectItem value="no">DA continues on revised basic</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-4 rounded-2xl bg-secondary/50 p-4">
            <div className="text-xs text-muted-foreground">Average gross hike</div>
            <div className="text-2xl font-bold text-primary">{avgPct.toFixed(1)}%</div>
            <div className="mt-1 text-xs text-muted-foreground">
              across all 18 levels at {fit.toFixed(2)}x
            </div>
          </div>
        </div>
      </Card>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">
          Level-wise 7th CPC vs 8th CPC salary comparison table
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3 font-semibold">Level</th>
                <th className="p-3 font-semibold">Post</th>
                <th className="p-3 font-semibold">7th CPC basic</th>
                <th className="p-3 font-semibold">7th CPC gross</th>
                <th className="p-3 font-semibold">8th CPC basic</th>
                <th className="p-3 font-semibold">8th CPC gross</th>
                <th className="p-3 font-semibold">Increase</th>
                <th className="p-3 font-semibold">Hike</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.level} className="border-t border-border">
                  <td className="p-3 font-semibold">{r.level}</td>
                  <td className="p-3 text-muted-foreground">{r.grade}</td>
                  <td className="p-3">{inr(r.basic7)}</td>
                  <td className="p-3">{inr(r.gross7)}</td>
                  <td className="p-3 font-semibold text-primary">{inr(r.basic8)}</td>
                  <td className="p-3 font-semibold text-primary">{inr(r.gross8)}</td>
                  <td className={`p-3 font-semibold ${r.diff >= 0 ? "text-success" : "text-destructive"}`}>
                    {inr(r.diff)}
                  </td>
                  <td className={`p-3 font-semibold ${r.diff >= 0 ? "text-success" : "text-destructive"}`}>
                    {r.pct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Figures use entry-cell basic pay for each level, {HRA_7[city]}% HRA under the 7th CPC and{" "}
          {HRA_8[city]}% under a rebased 8th CPC, transport allowance with DA, and no DA on revised
          pay in the merged scenario.
        </p>
      </section>

      <CalcContent
        heading="7th CPC vs 8th CPC: what actually changes"
        intro="Every pay commission does two things at once. It resets basic pay upward by a fitment factor, and it rebases the allowance percentages downward so the total cost stays within the government's projected outgo. Reading only the fitment factor overstates the gain; reading only the allowance cut understates it. The honest comparison is gross against gross, and that is what this table does level by level."
        method={[
          {
            title: "What the 7th CPC did in 2016",
            body: "The 7th CPC multiplied 6th CPC pay by 2.57, raised the minimum from ₹7,000 to ₹18,000, cut HRA from 30/20/10 to 24/16/8 percent of the new basic, and reported an overall increase of about 23.55% including allowances and pension. The headline multiple was 2.57, but the real rise in take-home pay was roughly 14% because 125% DA was merged into the new basic first.",
          },
          {
            title: "What the 8th CPC is expected to do",
            body: `The same mechanics apply. Basic pay on the implementation date is merged with the DA then in force, currently ${CURRENT_DA}%, and the fitment factor is applied to arrive at revised basic. DA restarts at zero and builds up again from the next AICPI-IW cycle, HRA percentages are likely rebased, and transport allowance slabs are revised upward.`,
          },
          {
            title: "How to read the comparison table",
            body: "Pick your level from the first column and check the post label to confirm you are in the right row. The 7th CPC gross column is basic plus DA plus HRA plus TA at the rates you selected. The 8th CPC gross column applies your chosen fitment factor to basic, then adds rebased HRA and revised TA with no DA. The last two columns are the rupee and percentage difference — that is your real gain.",
          },
          {
            title: "Choosing a realistic fitment factor",
            body: "Staff side federations have pressed for 2.86, arguing for parity with the minimum-wage formula. Independent brokerages have projected 1.83 to 2.28. History suggests the final number lands where the fiscal room allows: 1.86 in 2006 and 2.57 in 2016. Test 1.92, 2.28 and 2.57 on the slider to bracket your likely outcome instead of anchoring on a single figure.",
          },
          {
            title: "Do not forget deductions and arrears",
            body: "A higher gross also raises NPS contribution at 10% of basic plus DA and shifts you into a higher tax slab, so in-hand growth lags gross growth. On the other side, if orders are issued months after the effective date, the difference for every intervening month is payable as arrears, which is often a lump sum worth several months of the increase.",
          },
        ]}
        formula={[
          `7th CPC gross = Basic + (Basic × ${daPct}%) + (Basic × ${HRA_7[city]}%) + TA + DA on TA`,
          `Revised basic = 7th CPC basic × ${fit.toFixed(2)}`,
          `8th CPC gross = Revised basic + (Revised basic × ${HRA_8[city]}%) + revised TA`,
          "Increase = 8th CPC gross − 7th CPC gross",
          "Hike % = Increase ÷ 7th CPC gross × 100",
        ]}
        faq={faq}
        related={[
          { label: "7th CPC calculator", to: "/7th-pay-commission-calculator" },
          { label: "8th CPC salary calculator", to: "/salary" },
          { label: "Fitment simulator", to: "/fitment-simulator" },
          { label: "Fitment factor table", to: "/fitment-factor" },
          { label: "Arrear calculator", to: "/arrear" },
          { label: "Pay commission history", to: "/pay-commission-history" },
        ]}
      />
    </div>
  );
}
