import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { PAY_LEVELS, FITMENT_CHIPS } from "@/lib/pay-matrix";
import type { City } from "@/lib/cpc";

export interface SalaryFormState {
  level: number;
  basic: number;
  city: City;
  pension: "NPS" | "OPS";
  daPct: number;
  hraOverride: number | null;
  fit: number;
}

export function SalaryForm({
  value,
  onChange,
}: {
  value: SalaryFormState;
  onChange: (s: SalaryFormState) => void;
}) {
  const set = <K extends keyof SalaryFormState>(k: K, v: SalaryFormState[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <Card className="space-y-6 rounded-3xl border-border/80 p-6 shadow-card">
      <Section title="Employee details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Pay Level">
            <Select
              value={String(value.level)}
              onValueChange={(v) => {
                const n = Number(v);
                const entry = PAY_LEVELS.find((p) => p.level === n)?.entryPay ?? value.basic;
                onChange({ ...value, level: n, basic: entry });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {PAY_LEVELS.map((p) => (
                  <SelectItem key={p.level} value={String(p.level)}>
                    Level {p.level} — {p.grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Current Basic Pay (₹)">
            <Input
              type="number"
              inputMode="numeric"
              value={value.basic}
              onChange={(e) => set("basic", Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="City Category">
            <Select value={value.city} onValueChange={(v) => set("city", v as City)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="X">X · Metro (HRA 30%)</SelectItem>
                <SelectItem value="Y">Y · Tier-2 (HRA 20%)</SelectItem>
                <SelectItem value="Z">Z · Other (HRA 10%)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Pension System">
            <Select
              value={value.pension}
              onValueChange={(v) => set("pension", v as "NPS" | "OPS")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NPS">NPS (New Pension Scheme)</SelectItem>
                <SelectItem value="OPS">OPS (Old Pension Scheme)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Section>

      <Section title="Allowances">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={`DA ${value.daPct}%`}>
            <Slider
              value={[value.daPct]}
              min={0}
              max={70}
              step={1}
              onValueChange={(v) => set("daPct", v[0])}
            />
          </Field>
          <Field label="HRA % (optional override)">
            <Input
              type="number"
              placeholder="auto"
              value={value.hraOverride ?? ""}
              onChange={(e) =>
                set("hraOverride", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </Field>
        </div>
      </Section>

      <Section title={`Fitment Factor — ${value.fit.toFixed(2)}x`}>
        <Slider
          value={[value.fit]}
          min={1.5}
          max={4}
          step={0.01}
          onValueChange={(v) => set("fit", v[0])}
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          {FITMENT_CHIPS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => set("fit", f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                Math.abs(value.fit - f) < 0.005
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/70"
              }`}
            >
              {f.toFixed(2)}x
            </button>
          ))}
        </div>
      </Section>
    </Card>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
