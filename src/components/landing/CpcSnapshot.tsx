import { Link } from "@tanstack/react-router";
import { BadgeCheck, CircleDashed, ArrowRight } from "lucide-react";
import { CPC8_SNAPSHOT, CPC8_TIMELINE } from "@/lib/cpc-facts";

export function CpcSnapshot() {
  return (
    <section id="status" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Status board
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          8th Pay Commission 2026 — where things actually stand
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Two badges run through this page. A tick means the item sits in a Gazette
          notification, a Cabinet decision or a Department of Expenditure order. A dashed
          circle means it is still an estimate, however often it gets repeated online.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <table className="w-full text-sm">
            <tbody>
              {CPC8_SNAPSHOT.map((f) => (
                <tr key={f.label} className="border-b border-border/60 last:border-0">
                  <th scope="row" className="w-2/5 px-5 py-3 text-left font-medium text-muted-foreground">
                    {f.label}
                  </th>
                  <td className="px-5 py-3">
                    <span className="flex items-start gap-2">
                      {f.confirmed ? (
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      ) : (
                        <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                      <span className="font-medium">{f.value}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ol className="relative space-y-5 border-l border-border pl-6">
          {CPC8_TIMELINE.map((t) => (
            <li key={t.when} className="relative">
              <span
                className={`absolute -left-[1.9rem] mt-1.5 grid h-3 w-3 place-items-center rounded-full ring-4 ring-background ${
                  t.expected ? "bg-muted-foreground/50" : "bg-primary"
                }`}
              />
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t.when}
                {t.expected && (
                  <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-muted-foreground">
                    projected
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-sm font-semibold">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/pay-commission-history"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          How the 8th CPC figures are estimated <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/fitment-factor"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-semibold hover:border-primary/40 hover:bg-primary/5"
        >
          Compare fitment factor scenarios
        </Link>
      </div>
    </section>
  );
}
