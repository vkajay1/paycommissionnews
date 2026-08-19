import { Link } from "@tanstack/react-router";
import {
  Wallet,
  PiggyBank,
  Receipt,
  Percent,
  Grid3x3,
  Users,
  MapPin,
  Newspaper,
  Home,
  Calculator,
  Building2,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { label: string; to: string; icon?: LucideIcon; exact?: boolean };
type NavGroup = { title: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Home", to: "/", icon: Home, exact: true },
      { label: "8th CPC Snapshot", to: "/pay-commission-history", icon: FileText },
      { label: "7th vs 8th CPC", to: "/7th-vs-8th-pay-commission", icon: Grid3x3 },
    ],
  },
  {
    title: "Core calculators",
    items: [
      { label: "Salary Calculator", to: "/salary", icon: Wallet },
      { label: "Pension Calculator", to: "/pension", icon: PiggyBank },
      { label: "Arrear Calculator", to: "/arrear", icon: Receipt },
      { label: "DA Calculator", to: "/da-calculator", icon: Percent },
      { label: "Fitment Factor", to: "/fitment-factor", icon: Calculator },
    ],
  },
  {
    title: "Employee tools",
    items: [
      { label: "Take-home Salary", to: "/take-home-salary" },
      { label: "Income Tax", to: "/income-tax-calculator" },
      { label: "HRA", to: "/hra-calculator" },
      { label: "Gratuity", to: "/gratuity-calculator" },
      { label: "EPF", to: "/epf-calculator" },
      { label: "NPS", to: "/nps-calculator" },
      { label: "MACP", to: "/macp-calculator" },
      { label: "Leave Encashment", to: "/leave-encashment-calculator" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Pay Matrix Levels", to: "/pay-level", icon: Grid3x3 },
      { label: "Role-wise Salary", to: "/role", icon: Users },
      { label: "State-wise Salary", to: "/state", icon: MapPin },
      { label: "7th CPC Calculator", to: "/7th-pay-commission-calculator", icon: Building2 },
      { label: "News & Analysis", to: "/blog", icon: Newspaper },
      { label: "Latest Jobs", to: "/latest-jobs", icon: Briefcase },
    ],
  },
];

const base =
  "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";
const active =
  "flex items-center gap-2 rounded-md border-l-2 border-primary bg-primary/10 px-2.5 py-1.5 text-[13px] font-semibold text-primary";

export function SideNav() {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-border bg-card p-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Tool directory
        </div>
        <nav className="space-y-5">
          {navGroups.map((g) => (
            <div key={g.title}>
              <div className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/50">
                {g.title}
              </div>
              <ul className="space-y-0.5">
                {g.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <li key={it.label + it.to}>
                      <Link
                        to={it.to}
                        className={base}
                        activeOptions={{ exact: it.exact ?? false }}
                        activeProps={{ className: active }}
                      >
                        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                        <span className="truncate">{it.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
