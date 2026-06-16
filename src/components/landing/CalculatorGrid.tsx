import { Link } from "@tanstack/react-router";
import {
  Wallet,
  PiggyBank,
  Receipt,
  History,
  Grid3x3,
  Sliders,
  ClipboardList,
  Plane,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: Wallet,
    title: "Salary Calculator",
    desc: "Project revised basic, DA, HRA & TA across fitment scenarios.",
    href: "/salary",
    live: true,
  },
  {
    icon: PiggyBank,
    title: "Pension Calculator",
    desc: "Estimate basic pension, DR and commuted value at retirement.",
    href: "/salary",
  },
  {
    icon: Receipt,
    title: "Arrear Calculator",
    desc: "Compute month-wise arrears between implementation dates.",
    href: "/salary",
  },
  {
    icon: History,
    title: "Pension Arrear",
    desc: "Back-dated pension arrears with DR adjustments.",
    href: "/salary",
  },
  {
    icon: Grid3x3,
    title: "Pay Matrix Explorer",
    desc: "Browse and compare 7th vs 8th CPC pay cells.",
    href: "/salary",
  },
  {
    icon: Sliders,
    title: "Fitment Simulator",
    desc: "Slide between 1.50x – 4.00x and see live salary impact.",
    href: "/salary",
  },
  {
    icon: ClipboardList,
    title: "Pay Fixation",
    desc: "Fix pay on promotion, MACP or pay-commission rollover.",
    href: "/salary",
  },
  {
    icon: Plane,
    title: "LTC Planner",
    desc: "Plan Leave Travel Concession entitlements and reimbursement.",
    href: "/salary",
  },
];

export function CalculatorGrid() {
  return (
    <section id="tools" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Toolkit
          </span>
          <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Every calculator you need.
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          A growing suite of precision tools for Central Government employees and pensioners.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.title}
              to={t.href}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                {t.live ? (
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                    LIVE
                  </span>
                ) : (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    SOON
                  </span>
                )}
              </div>
              <div className="text-base font-semibold">{t.title}</div>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
