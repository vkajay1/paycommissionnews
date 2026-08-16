import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { articles, getArticle, type Block } from "@/lib/articles";
import { InArticleAd } from "@/components/ads/AdSlots";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) return {};
    const url = `/blog/${a.slug}`;
    return {
      meta: [
        { title: `${a.title} | 8th CPC Calculator` },
        { name: "description", content: a.description },
        { name: "keywords", content: a.keyword },
        { property: "og:type", content: "article" },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:url", content: url },
        { property: "article:published_time", content: a.date },
        { property: "article:modified_time", content: a.updated },
        { property: "article:section", content: a.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: a.title },
        { name: "twitter:description", content: a.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            dateModified: a.updated,
            author: { "@type": "Organization", name: "8th CPC Calculator" },
            publisher: {
              "@type": "Organization",
              name: "8th CPC Calculator",
            },
            mainEntityOfPage: `https://paycommissionnews.co.in${url}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: a.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <p className="mt-3 text-muted-foreground">
        The article you are looking for does not exist.
      </p>
      <Link
        to="/blog"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
    </main>
  ),
  errorComponent: ({ error, reset }) => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Try again
      </button>
    </main>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const article = getArticle(slug)!;
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
        {article.category}
      </div>
      <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

      <div className="mt-6 flex items-center gap-5 border-b border-border pb-6 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          Updated{" "}
          {new Date(article.updated).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {article.readMinutes} min read
        </span>
      </div>

      <div
        className={`my-8 h-44 rounded-lg bg-gradient-to-br ${article.hero} shadow-card`}
      />

      <article className="prose-article">
        {(() => {
          let paras = 0;
          return article.body.map((block, i) => {
            if (block.type === "p") paras += 1;
            const showAd = block.type === "p" && paras % 2 === 0;
            return (
              <div key={i}>
                <RenderBlock block={block} />
                {showAd ? (
                  <div className="not-prose">
                    <InArticleAd />
                  </div>
                ) : null}
              </div>
            );
          });
        })()}

        <h2>Frequently asked questions</h2>
        <div className="not-prose space-y-3">
          {article.faq.map((f, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border bg-card p-4 open:shadow-card"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold">
                <span className="mr-2 text-primary">Q.</span>
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </article>

      <div className="mt-10 rounded-lg border border-border bg-secondary/40 p-6 text-sm text-muted-foreground">
        <strong className="text-foreground">Disclaimer:</strong> Figures shown are
        indicative projections based on publicly discussed scenarios. Final salary,
        pension, fitment factor and implementation date are subject to the official
        notification of the 8th Central Pay Commission's recommendations by the
        Government of India.
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-bold">Continue reading</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              to="/blog/$slug"
              params={{ slug: a.slug }}
              className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className={`mb-3 h-20 rounded-lg bg-gradient-to-br ${a.hero}`} />
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                {a.category}
              </div>
              <h3 className="mt-1 text-sm font-semibold leading-snug">{a.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.cite && <cite className="block text-sm not-italic opacity-70">— {block.cite}</cite>}
        </blockquote>
      );
    case "callout": {
      const Icon =
        block.tone === "info" ? Info : block.tone === "warn" ? AlertTriangle : CheckCircle2;
      const toneClass =
        block.tone === "info"
          ? "border-primary/30 bg-primary/5 text-foreground"
          : block.tone === "warn"
          ? "border-amber-500/30 bg-amber-500/5"
          : "border-emerald-500/30 bg-emerald-500/5";
      return (
        <div className={`not-prose my-6 rounded-lg border p-5 ${toneClass}`}>
          <div className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <div className="text-sm font-semibold">{block.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }
    case "table":
      return (
        <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-secondary/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <div className="border-t border-border bg-secondary/30 px-4 py-2 text-xs text-muted-foreground">
              {block.caption}
            </div>
          )}
        </div>
      );
  }
}
