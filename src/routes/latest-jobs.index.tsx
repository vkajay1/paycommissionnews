import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, CalendarClock, MapPin } from "lucide-react";
import { jobs } from "@/lib/jobs";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/latest-jobs/")({
  head: () => {
    const featured = jobs[0];
    const title = "Latest Government Jobs 2026 — Sarkari Naukri Notifications & Vacancies";
    const description =
      "Latest govt job notifications for central and state government vacancies: post details, eligibility, pay level, salary as per pay commission, important dates and apply links.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE}/latest-jobs` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(featured?.image
          ? [
              { property: "og:image", content: featured.image },
              { name: "twitter:image", content: featured.image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: "/latest-jobs" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            url: `${SITE}/latest-jobs`,
            description,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: jobs.map((j, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE}/latest-jobs/${j.slug}`,
                name: j.title,
              })),
            },
          }),
        },
      ],
    };
  },
  component: LatestJobsIndex,
});

function fmt(d?: string) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function LatestJobsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
      <header className="mb-10 max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5 text-primary" />
          Sarkari Naukri updates
        </div>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Latest Government Jobs
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fresh recruitment notifications for central and state government posts — with
          eligibility, vacancy count, pay level, expected salary under the pay commission,
          important dates and official apply links.
        </p>
      </header>

      {jobs.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-lg font-semibold">No job notification published yet</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            New government job notifications will appear here as soon as they are
            published. Meanwhile, check what a post actually pays using our pay-matrix and
            salary tools.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/salary"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Salary calculator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/pay-level"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-semibold"
            >
              Pay matrix levels
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {jobs.map((j) => (
            <Link
              key={j.slug}
              to="/latest-jobs/$slug"
              params={{ slug: j.slug }}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              {j.image ? (
                <img
                  src={j.image}
                  alt={j.imageAlt ?? j.title}
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className={`h-28 bg-gradient-to-br ${j.hero}`} />
              )}
              <div className="p-6">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  {j.category}
                </div>
                <h2 className="text-lg font-semibold leading-snug">{j.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {j.description}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {j.vacancies ? (
                    <div>
                      <dt className="font-semibold text-foreground">Vacancies</dt>
                      <dd>{j.vacancies}</dd>
                    </div>
                  ) : null}
                  {j.applyEnd ? (
                    <div>
                      <dt className="font-semibold text-foreground">Last date</dt>
                      <dd className="inline-flex items-center gap-1">
                        <CalendarClock className="h-3 w-3" />
                        {fmt(j.applyEnd)}
                      </dd>
                    </div>
                  ) : null}
                  {j.location ? (
                    <div>
                      <dt className="font-semibold text-foreground">Location</dt>
                      <dd className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {j.location}
                      </dd>
                    </div>
                  ) : null}
                  {j.payScale ? (
                    <div>
                      <dt className="font-semibold text-foreground">Pay</dt>
                      <dd>{j.payScale}</dd>
                    </div>
                  ) : null}
                </dl>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Full details{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
