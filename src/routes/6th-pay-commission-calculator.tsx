import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.lovable.app";

export const Route = createFileRoute("/6th-pay-commission-calculator")({
  head: () => ({
    meta: [
      { title: "6th Pay Commission Salary Calculator — Grade Pay to 7th & 8th CPC" },
      {
        name: "description",
        content:
          "6th Pay Commission salary calculator: convert pay band plus grade pay into 7th CPC basic pay at 2.57x and project the 8th CPC revised salary. Includes 4200 grade pay examples.",
      },
      {
        name: "keywords",
        content:
          "6th pay commission salary calculator, 6 pay commission calculator, salary calculator 6th pay commission, cpc calculator, cpc calculation, 4200 grade pay salary after 8th pay commission, pay commission calculator",
      },
      { property: "og:title", content: "6th Pay Commission Salary Calculator" },
      {
        property: "og:description",
        content: "Convert 6th CPC pay band + grade pay into 7th and 8th CPC basic pay.",
      },
      { property: "og:url", content: `${SITE}/6th-pay-commission-calculator` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/6th-pay-commission-calculator` }],
  }),
  component: Page,
});

const GRADE_PAYS = [1800, 1900, 2000, 2400, 2800, 4200, 4600, 4800, 5400, 6600, 7600, 8700];

function Page() {
  const [payInBand, setPayInBand] = useState(13500);
  const [gradePay, setGradePay] = useState(4200);
  const [daPct6th, setDaPct6th] = useState(125);
  const [fit8th, setFit8th] = useState(2.28);

  const r = useMemo(() => {
    const basic6th = payInBand + gradePay;
    const da6th = Math.round((basic6th * daPct6th) / 100);
    const gross6th = basic6th + da6th;
    const basic7th = Math.round((basic6th * 2.57) / 100) * 100;
    const basic8th = Math.round(basic7th * fit8th);
    return { basic6th, da6th, gross6th, basic7th, basic8th };
  }, [payInBand, gradePay, daPct6th, fit8th]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          <History className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">6th Pay Commission Salary Calculator</h1>
          <p className="text-sm text-muted-foreground">
            Pay band + grade pay → 7th CPC basic at 2.57x → projected 8th CPC basic.
          </p>
        </div>
      </div>
      <DisclaimerBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-5 rounded-3xl p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Pay in pay band (₹)</Label>
            <Input
              type="number"
              value={payInBand}
              onChange={(e) => setPayInBand(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Grade pay — ₹{gradePay}</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {GRADE_PAYS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGradePay(g)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    gradePay === g
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground/80 hover:bg-secondary/70"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">6th CPC DA — {daPct6th}%</Label>
            <Slider
              value={[daPct6th]}
              min={0}
              max={200}
              step={1}
              onValueChange={(v) => setDaPct6th(v[0])}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">
              8th CPC fitment factor — {fit8th.toFixed(2)}x
            </Label>
            <Slider value={[fit8th]} min={1.5} max={4} step={0.01} onValueChange={(v) => setFit8th(v[0])} />
          </div>
        </Card>

        <Card className="space-y-4 rounded-3xl p-6">
          <Row label="6th CPC basic (band + grade pay)" value={inr(r.basic6th)} />
          <Row label={`Dearness Allowance @ ${daPct6th}%`} value={inr(r.da6th)} />
          <Row label="6th CPC gross (basic + DA)" value={inr(r.gross6th)} />
          <div className="my-2 h-px bg-border" />
          <Row label="7th CPC basic pay @ 2.57x" value={inr(r.basic7th)} highlight />
          <Row label={`Projected 8th CPC basic @ ${fit8th.toFixed(2)}x`} value={inr(r.basic8th)} highlight />
        </Card>
      </div>

      <article className="prose-article mt-12 max-w-3xl">
        <h2>How 6th CPC to 8th CPC pay conversion works</h2>
        <p>
          Under the 6th Pay Commission (2006), salary had two components: pay in the pay band and a
          fixed grade pay attached to the post. Basic pay was the sum of the two, and DA was paid as a
          percentage of that sum — reaching 125% by the end of the 6th CPC cycle in 2015.
        </p>
        <ol>
          <li>
            <strong>Step 1 — 6th CPC basic pay:</strong> Pay in pay band + Grade pay.
          </li>
          <li>
            <strong>Step 2 — 7th CPC basic pay:</strong> 6th CPC basic × 2.57, rounded to the next
            ₹100 and placed in the corresponding cell of the pay matrix.
          </li>
          <li>
            <strong>Step 3 — 8th CPC projection:</strong> 7th CPC basic × the expected fitment factor
            (1.92x to 2.86x, with 2.28x most widely discussed).
          </li>
        </ol>
        <h3>Example: ₹4,200 grade pay salary after the 8th Pay Commission</h3>
        <p>
          An employee with ₹13,500 pay in band plus ₹4,200 grade pay had a 6th CPC basic of ₹17,700.
          Multiplied by 2.57 this becomes about ₹45,500, which maps to Level 6 of the 7th CPC matrix
          (entry ₹35,400, rising through the cells). At a 2.28x 8th CPC fitment factor a Level 6 basic
          of ₹44,900 would rise to roughly ₹1,02,400, and at 2.86x to about ₹1,28,400.
        </p>
        <h3>Grade pay to pay level mapping</h3>
        <ul>
          <li>₹1,800 → Level 1 · ₹1,900 → Level 2 · ₹2,000 → Level 3</li>
          <li>₹2,400 → Level 4 · ₹2,800 → Level 5 · ₹4,200 → Level 6</li>
          <li>₹4,600 → Level 7 · ₹4,800 → Level 8 · ₹5,400 → Level 9/10</li>
          <li>₹6,600 → Level 11 · ₹7,600 → Level 12 · ₹8,700 → Level 13</li>
        </ul>
        <h3>Why employees still use a 6th CPC calculator</h3>
        <p>
          Several state governments, public sector undertakings and autonomous bodies continue to run
          pay-band-and-grade-pay structures, and pending arrear or pension cases from 2006–2015 still
          need 6th CPC arithmetic. Converting an old figure forward through 2.57x and then the expected
          8th CPC factor gives a realistic picture of where the same post lands in 2026.
        </p>
      </article>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={highlight ? "text-lg font-bold text-primary" : "text-base font-semibold"}>
        {value}
      </span>
    </div>
  );
}
