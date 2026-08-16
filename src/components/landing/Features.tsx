import { Zap, Database, LineChart, FileText, Percent, Download } from "lucide-react";

const items = [
  { icon: Zap, title: "Real-time calculations", desc: "Every change recomputes instantly — no submit button." },
  { icon: Database, title: "Pay matrix data", desc: "Levels 1–18 entry pay seeded for fast lookup." },
  { icon: LineChart, title: "Pension forecasting", desc: "Project pension and DR over your retirement horizon." },
  { icon: Percent, title: "Arrear estimation", desc: "Month-wise arrears across implementation dates." },
  { icon: FileText, title: "Tax impact analysis", desc: "See gross vs in-hand under new and old regimes." },
  { icon: Download, title: "Export reports", desc: "Download polished PDF summaries to share." },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Built for precision
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Everything calculated. Nothing assumed.
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-card p-6">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <div className="mt-4 text-base font-semibold">{title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
