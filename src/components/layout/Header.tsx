import { Link } from "@tanstack/react-router";
import { Calculator, Mail, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const primary = [
  { to: "/", label: "Home", exact: true },
  { to: "/salary", label: "Salary" },
  { to: "/pension", label: "Pension" },
  { to: "/da-calculator", label: "DA" },
  { to: "/pay-level", label: "Pay Matrix" },
  { to: "/role", label: "Roles" },
  { to: "/state", label: "States" },
  { to: "/blog", label: "News" },
  { to: "/latest-jobs", label: "Latest Jobs" },
];

const linkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";
const linkActive =
  "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-primary/10";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      {/* Corporate utility bar */}
      <div className="hidden border-b border-border/60 bg-secondary/60 md:block">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-4 text-[11px] text-muted-foreground sm:px-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-primary" />
              Independent research desk · not a government body
            </span>
            <span className="hidden lg:inline">Updated for FY 2026-27 projections</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/disclaimer" className="hover:text-foreground">
              Disclaimer
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-1 hover:text-foreground">
              <Mail className="h-3 w-3" /> Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <Calculator className="h-4.5 w-4.5" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight">8th CPC Calculator</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Pay Commission Intelligence
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {primary.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeOptions={{ exact: l.exact ?? false }}
              activeProps={{ className: linkActive }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/8th-pay-commission-salary-calculator-in-hindi"
            className={linkClass}
            activeProps={{ className: linkActive }}
          >
            हिंदी
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-md sm:inline-flex">
            <Link to="/salary">Calculate salary</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
