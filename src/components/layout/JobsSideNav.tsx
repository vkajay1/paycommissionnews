import { Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { jobs } from "@/lib/jobs";

export function JobsSideNav() {
  const sorted = [...jobs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20);

  return (
    <aside className="hidden w-60 shrink-0 md:block">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          <Briefcase className="h-3 w-3 text-primary" />
          Latest jobs
        </div>

        {sorted.length === 0 ? (
          <p className="px-1 text-xs text-muted-foreground">
            New job notifications will appear here.
          </p>
        ) : (
          <ul className="space-y-3">
            {sorted.map((j) => (
              <li key={j.slug}>
                <Link
                  to="/latest-jobs/$slug"
                  params={{ slug: j.slug }}
                  className="group block rounded-md p-1.5 transition-colors hover:bg-secondary"
                  activeProps={{ className: "block rounded-md bg-primary/10 p-1.5" }}
                >
                  {j.image ? (
                    <img
                      src={j.image}
                      alt={j.imageAlt ?? j.title}
                      width={480}
                      height={270}
                      loading="lazy"
                      decoding="async"
                      className="mb-1.5 h-24 w-full rounded object-cover"
                    />
                  ) : (
                    <div className={`mb-1.5 h-20 rounded bg-gradient-to-br ${j.hero}`} />
                  )}
                  <span className="line-clamp-3 text-[12.5px] font-medium leading-snug text-foreground group-hover:text-primary">
                    {j.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/latest-jobs"
          className="mt-4 block rounded-md border border-border px-2.5 py-1.5 text-center text-[12px] font-semibold text-primary"
        >
          View all jobs
        </Link>
      </div>
    </aside>
  );
}
