import { Link } from "@tanstack/react-router";
import { Calculator, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";


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
  { to: "/pdf-tools", label: "PDF Tool" },
];

const linkClass =
  "rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";
const linkActive =
  "rounded-md bg-secondary px-2.5 py-2 text-sm font-semibold text-foreground";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-1.5">
          <MobileMenu />
          <Link to="/" className="flex min-w-0 shrink items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
              <Calculator className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[17px] font-extrabold">8th CPC Calculator</div>
              <div className="truncate text-[10px] font-medium text-muted-foreground">
                Salary, pension & arrear tools
              </div>
            </div>
          </Link>
        </div>


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
          <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Browse tools">
            <Link to="/" hash="tools"><Search className="h-4 w-4" /></Link>
          </Button>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/salary">Calculate salary</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
