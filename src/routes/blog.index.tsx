import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { articles } from "@/lib/articles";

export const Route = createFileRoute("/blog/")({
  head: () => {
    const SITE = "https://paycommissionnews.co.in";
    const featured = articles[0];
    return {
      meta: [
        { title: "8th Pay Commission News & Articles — Salary, Pension, Pay Matrix" },
        {
          name: "description",
          content:
            "In-depth articles on the 8th Pay Commission: latest news, fitment factor, salary hike projections, pay matrix, pensioner revisions and the 8th CPC salary calculator.",
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "8th Pay Commission News & Articles" },
        {
          property: "og:description",
          content: "News, calculators and pay-matrix guides for 8th CPC.",
        },
        { property: "og:url", content: `${SITE}/blog` },
        { name: "twitter:card", content: "summary_large_image" },
        ...(featured?.image
          ? [
              { property: "og:image", content: featured.image },
              { name: "twitter:image", content: featured.image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: "/blog" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "8th Pay Commission News & Articles",
            url: `${SITE}/blog`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: articles.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE}/blog/${a.slug}`,
                name: a.title,
                ...(a.image ? { image: a.image } : {}),
              })),
            },
          }),
        },
      ],
    };
  },

  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = articles;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
      <header className="mb-10 max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Latest 8th CPC coverage
        </div>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          The 8th Pay Commission, decoded.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          News, salary projections, pay-matrix tables and pensioner guides — written for
          the 1.15 crore central government employees and pensioners awaiting the 8th CPC.
        </p>
      </header>

      <Link
        to="/blog/$slug"
        params={{ slug: featured.slug }}
        className="group relative mb-12 block overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${featured.hero} opacity-10`} />
        <div className="relative grid gap-6 p-8 md:grid-cols-[1fr,1.3fr] md:p-10">
          {featured.image ? (
            <img
              src={featured.image}
              alt={featured.imageAlt ?? featured.title}
              width={1200}
              height={675}
              className="hidden w-full rounded-lg object-cover md:block"
            />
          ) : (
            <div
              className={`hidden aspect-[4/3] rounded-lg bg-gradient-to-br ${featured.hero} md:block`}
            />
          )}

          <div className="flex flex-col justify-center">
            <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary">
              <span>{featured.category}</span>
              <span className="text-muted-foreground">Featured</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(featured.updated).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {featured.readMinutes} min read
              </span>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {rest.map((a) => (
          <Link
            key={a.slug}
            to="/blog/$slug"
            params={{ slug: a.slug }}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            {a.image ? (
              <img
                src={a.image}
                alt={a.imageAlt ?? a.title}
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover"
              />
            ) : (
              <div className={`h-32 bg-gradient-to-br ${a.hero}`} />
            )}
            <div className="p-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {a.category}
              </div>
              <h3 className="text-lg font-semibold leading-snug">{a.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {a.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {a.readMinutes} min
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                  Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
