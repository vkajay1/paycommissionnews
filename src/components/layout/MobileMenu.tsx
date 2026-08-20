import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Calculator, Mail, ShieldCheck, Languages } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navGroups } from "./SideNav";

const itemBase =
  "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";
const itemActive =
  "flex items-center gap-2 rounded-md border-l-2 border-primary bg-primary/10 px-2.5 py-2 text-sm font-semibold text-primary";

const secondary = [
  { to: "/about", label: "About" },
  { to: "/disclaimer", label: "Disclaimer" },
  { to: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b border-border p-4 text-left">
          <SheetTitle className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
              <Calculator className="h-4 w-4" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[15px] font-bold tracking-tight">
                8th CPC Calculator
              </span>
              <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Pay Commission Intelligence
              </span>
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <Button asChild className="w-full rounded-md" onClick={close}>
            <Link to="/salary">Calculate salary</Link>
          </Button>

          <nav className="mt-5 space-y-5">
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
                          onClick={close}
                          className={itemBase}
                          activeOptions={{ exact: it.exact ?? false }}
                          activeProps={{ className: itemActive }}
                        >
                          {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
                          <span className="truncate">{it.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div>
              <div className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/50">
                Language
              </div>
              <Link
                to="/8th-pay-commission-salary-calculator-in-hindi"
                onClick={close}
                className={itemBase}
                activeProps={{ className: itemActive }}
              >
                <Languages className="h-4 w-4 shrink-0" />
                <span className="truncate">हिंदी कैलकुलेटर</span>
              </Link>
            </div>

            <div>
              <div className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/50">
                Company
              </div>
              <ul className="space-y-0.5">
                {secondary.map((s) => (
                  <li key={s.to}>
                    <Link
                      to={s.to}
                      onClick={close}
                      className={itemBase}
                      activeProps={{ className: itemActive }}
                    >
                      {s.label === "Contact" ? (
                        <Mail className="h-4 w-4 shrink-0" />
                      ) : (
                        <ShieldCheck className="h-4 w-4 shrink-0" />
                      )}
                      <span className="truncate">{s.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
