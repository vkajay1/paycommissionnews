import { Link } from "@tanstack/react-router";
import { Home, Wallet, PiggyBank, Receipt, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/salary", label: "Salary", icon: Wallet, exact: false },
  { to: "/salary", label: "Pension", icon: PiggyBank, exact: false, disabled: true },
  { to: "/salary", label: "Arrear", icon: Receipt, exact: false, disabled: true },
  { to: "/", label: "Profile", icon: User, exact: false, disabled: true },
] as const;

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          const disabled = "disabled" in it && it.disabled;
          return (
            <li key={it.label}>
              <Link
                to={it.to}
                aria-disabled={disabled}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                  disabled ? "text-muted-foreground/50" : "text-muted-foreground"
                }`}
                activeOptions={{ exact: it.exact }}
                activeProps={
                  disabled
                    ? undefined
                    : {
                        className:
                          "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-primary",
                      }
                }
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
