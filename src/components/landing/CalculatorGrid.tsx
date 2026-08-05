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
  HandCoins,
  Home,
  Landmark,
  TrendingUp,
  CalendarCheck,
  ArrowRight,
  Check,
} from "lucide-react";

const tools = [
  {
    icon: Wallet,
    title: "Salary Calculator",
    desc: "Merge 60% DA into basic, apply any fitment factor and read the revised basic, DA, HRA and TA against what you draw today.",
    points: ["All 18 pay levels", "NPS, CGHS and CGEGIS deductions", "Net in-hand, not just gross"],
    href: "/salary",
  },
  {
    icon: PiggyBank,
    title: "Pension Calculator",
    desc: "Basic pension at 50% of last drawn pay, Dearness Relief on top, and the commuted portion you can encash at retirement.",
    points: ["Family pension at 30%", "Commutation up to 40%", "Restoration after 15 years"],
    href: "/pension",
  },
  {
    icon: Receipt,
    title: "Arrear Calculator",
    desc: "Month-by-month difference between old and revised pay from the implementation date to the date orders are actually issued.",
    points: ["Year-wise DA selectors", "Month-wise arrear table", "Section 89(1) tax relief note"],
    href: "/arrear",
  },
  {
    icon: History,
    title: "Pension Arrear",
    desc: "Back-dated pension arrears for retirees, with Dearness Relief recalculated on the revised basic pension for every month of the gap.",
    points: ["DR adjusted per instalment", "Works for pre-2026 retirees", "Lump-sum total"],
    href: "/pension-arrear",
  },
  {
    icon: Grid3x3,
    title: "Pay Matrix Explorer",
    desc: "Walk every cell of the 7th CPC matrix and see the projected 8th CPC cell beside it, level by level and increment by increment.",
    points: ["19 levels x 40 cells", "3% annual increment logic", "Side-by-side 7th vs 8th"],
    href: "/pay-level",
  },
  {
    icon: Sliders,
    title: "Fitment Simulator",
    desc: "Drag from 1.50x to 4.00x and watch basic pay, gross and net move in real time so you can see what each demand is worth to you.",
    points: ["Live Recharts curve", "Federation vs ministry asks", "Real hike over the DA merge"],
    href: "/fitment-simulator",
  },
  {
    icon: ClipboardList,
    title: "Pay Fixation",
    desc: "Fix pay on promotion, MACP upgradation or a pay-commission rollover using the FR 22(I)(a)(1) one-increment rule.",
    points: ["Promotion and MACP modes", "Next-cell rounding", "Date-of-increment options"],
    href: "/pay-fixation",
  },
  {
    icon: Plane,
    title: "LTC Planner",
    desc: "Work out Leave Travel Concession entitlement by pay level, the fare you can claim and the 90% advance available before travel.",
    points: ["Home town and All-India", "Class of travel by level", "Advance and settlement"],
    href: "/ltc-planner",
  },
  {
    icon: Wallet,
    title: "Take Home Salary",
    desc: "Convert a private-sector CTC into real monthly money after EPF, gratuity provision, professional tax and income tax.",
    points: ["CTC to in-hand", "New and old tax regime", "Employer vs employee EPF"],
    href: "/take-home-salary",
  },
  {
    icon: HandCoins,
    title: "Gratuity Calculator",
    desc: "Retirement gratuity on the CCS (Pension) Rules formula for government staff and the Gratuity Act formula for private employees.",
    points: ["Govt and private modes", "₹25 lakh / ₹20 lakh ceilings", "Death gratuity slabs"],
    href: "/gratuity-calculator",
  },
  {
    icon: PiggyBank,
    title: "EPF Calculator",
    desc: "Project your provident fund corpus to retirement with annual salary growth, the employer share and compounded interest.",
    points: ["8.25% interest compounding", "Salary growth assumption", "Year-wise corpus chart"],
    href: "/epf-calculator",
  },
  {
    icon: Home,
    title: "HRA Calculator",
    desc: "HRA entitlement by X, Y or Z city class, and the Section 10(13A) exemption from the three-way least-of test.",
    points: ["24/16/8 and 30/20/10 rates", "Metro 50% rule", "Floor amounts applied"],
    href: "/hra-calculator",
  },
  {
    icon: Landmark,
    title: "Income Tax Calculator",
    desc: "Compare the new and old regimes side by side for FY 2025-26, including the standard deduction and 87A rebate.",
    points: ["New vs old in one view", "Surcharge and cess", "Which regime wins, and by how much"],
    href: "/income-tax-calculator",
  },
  {
    icon: TrendingUp,
    title: "NPS Calculator",
    desc: "Tier-I corpus at 60 from your 10% and the government's 14%, split into the tax-free lump sum and the annuity pension.",
    points: ["60/40 lump sum split", "Annuity rate input", "Monthly pension estimate"],
    href: "/nps-calculator",
  },
  {
    icon: CalendarCheck,
    title: "Leave Encashment",
    desc: "Cash value of accumulated earned leave up to the 300-day ceiling, at retirement or alongside an LTC claim.",
    points: ["Basic plus DA per day", "300-day cap", "LTC encashment of 10 days"],
    href: "/leave-encashment-calculator",
  },
  {
    icon: ClipboardList,
    title: "MACP Calculator",
    desc: "Financial upgradation after 10, 20 and 30 years of service, with the fixation worked out level by level.",
    points: ["3 MACP milestones", "One increment plus level jump", "8th CPC projection"],
    href: "/macp-calculator",
  },
  {
    icon: Grid3x3,
    title: "Fitment Factor Table",
    desc: "The full fitment table for 1.92x, 2.28x, 2.57x, 2.86x and 3.83x across all 18 levels, so you can compare every scenario at once.",
    points: ["Entry pay per level", "Real hike after DA merge", "Who backs each factor"],
    href: "/fitment-factor",
  },
  {
    icon: History,
    title: "6th CPC Calculator",
    desc: "Convert an old pay band plus grade pay into 7th CPC basic pay and then into projected 8th CPC pay.",
    points: ["Grade pay 1800 to 10000", "1.86x and 2.57x chain", "Answers 4200 GP queries"],
    href: "/6th-pay-commission-calculator",
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
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                  LIVE
                </span>
              </div>
              <div className="text-base font-semibold">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-3 flex-1 space-y-1">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                    {p}
                  </li>
                ))}
              </ul>
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
