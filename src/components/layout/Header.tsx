import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card">
            <Calculator className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">8th CPC</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Calculator
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-lg px-3 py-1.5 text-sm font-medium text-foreground bg-secondary" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/salary"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-lg px-3 py-1.5 text-sm font-medium text-foreground bg-secondary" }}
          >
            Salary Calculator
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <Link to="/salary">Calculate</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
