import { Link } from "@tanstack/react-router";
import { Home, Wallet, PiggyBank, Receipt, Newspaper } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/salary", label: "Salary", icon: Wallet, exact: false },
  { to: "/pension", label: "Pension", icon: PiggyBank, exact: false },
  { to: "/arrear", label: "Arrear", icon: Receipt, exact: false },
  { to: "/blog", label: "News", icon: Newspaper, exact: false },
] as const;

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.label}>
              <Link
                to={it.to}
                className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-muted-foreground transition-colors"
                activeOptions={{ exact: it.exact }}
                activeProps={{
                  className:
                    "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold text-primary",
                }}
              >
                <Icon className="h-4 w-4" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
