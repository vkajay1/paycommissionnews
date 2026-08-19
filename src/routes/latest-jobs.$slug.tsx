import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, ExternalLink, User } from "lucide-react";
import { jobs, getJob } from "@/lib/jobs";
import { RenderBlock } from "@/components/content/RenderBlock";
import { InArticleAd } from "@/components/ads/AdSlots";

const SITE = "https://paycommissionnews.co.in";

export const Route = createFileRoute("/latest-jobs/$slug")({
  beforeLoad: ({ params }) => {
    if (!getJob(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const j = getJob(params.slug);
    if (!j) return {};
    const url = `/latest-jobs/${j.slug}`;
    const absUrl = `${SITE}${url}`;

    return {
      meta: [
        { title: `${j.title} | Latest Government Jobs` },
        { name: "description", content: j.description },
        { name: "keywords", content: j.keyword },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { property: "og:type", content: "article" },
        { property: "og:title", content: j.title },
        { property: "og:description", content: j.description },
        { property: "og:url", content: absUrl },
        { property: "og:locale", content: j.lang === "hi" ? "hi_IN" : "en_IN" },
        { property: "article:published_time", content: j.date },
        { property: "article:modified_time", content: j.updated },
        { property: "article:section", content: j.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: j.title },
        { name: "twitter:description", content: j.description },
        ...(j.image
          ? [
              { property: "og:image", content: j.image },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "675" },
              { property: "og:image:alt", content: j.imageAlt ?? j.title },
              { name: "twitter:image", content: j.image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: j.postName,
            description: j.description,
            datePosted: j.date,
            ...(j.applyEnd ? { validThrough: j.applyEnd } : {}),
            employmentType: "FULL_TIME",
            hiringOrganization: {
              "@type": "Organization",
              name: j.organization,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                ...(j.location ? { addressRegion: j.location } : {}),
              },
            },
            ...(j.qualification ? { qualifications: j.qualification } : {}),
            ...(j.vacancies ? { totalJobOpenings: j.vacancies } : {}),
            url: absUrl,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Latest Jobs", item: `${SITE}/latest-jobs` },
              { "@type": "ListItem", position: 3, name: j.title, item: absUrl },
            ],
          }),
        },
        ...(j.faq.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: j.faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Job notification not found</h1>
      <p className="mt-3 text-muted-foreground">
        This job posting does not exist or has been removed.
      </p>
      <Link
        to="/latest-jobs"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> All latest jobs
      </Link>
    </main>
  ),
  component: JobPage,
});

function fmt(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function JobPage() {
  const { slug } = Route.useParams();
  const job = getJob(slug)!;
  const related = jobs.filter((j) => j.slug !== slug).slice(0, 3);

  const rows: [string, string | undefined][] = [
    ["Organisation", job.organization],
    ["Post name", job.postName],
    ["Vacancies", job.vacancies],
    ["Qualification", job.qualification],
    ["Age limit", job.ageLimit],
    ["Pay scale / level", job.payScale],
    ["Job location", job.location],
    ["Application fee", job.applicationFee],
    ["Apply start date", job.applyStart ? fmt(job.applyStart) : undefined],
    ["Last date to apply", job.applyEnd ? fmt(job.applyEnd) : undefined],
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <Link
        to="/latest-jobs"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All latest jobs
      </Link>

      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
        {job.category}
      </div>
      <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {job.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{job.excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-6 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" /> By{" "}
          <span className="font-semibold text-foreground">Editorial Team</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> Published{" "}
          <time dateTime={job.date}>{fmt(job.date)}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {job.readMinutes} min read
        </span>
      </div>

      {job.image ? (
        <figure className="my-8">
          <img
            src={job.image}
            alt={job.imageAlt ?? job.title}
            width={1200}
            height={675}
            decoding="async"
            className="w-full rounded-lg shadow-card"
          />
          {job.imageAlt ? (
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {job.imageAlt}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <div className={`my-8 h-36 rounded-lg bg-gradient-to-br ${job.hero} shadow-card`} />
      )}

      <section className="overflow-hidden rounded-lg border border-border">
        <h2 className="border-b border-border bg-secondary/60 px-4 py-3 text-sm font-bold">
          Recruitment at a glance
        </h2>
        <dl className="divide-y divide-border text-sm">
          {rows
            .filter(([, v]) => Boolean(v))
            .map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem,1fr] gap-3 px-4 py-3">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-muted-foreground">{v}</dd>
              </div>
            ))}
        </dl>
      </section>

      {job.applyUrl ? (
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Apply / official notification <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}

      <article className="prose-article mt-10">
        {(() => {
          let paras = 0;
          return job.body.map((block, i) => {
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

        {job.faq.length ? (
          <>
            <h2>Frequently asked questions</h2>
            <div className="not-prose space-y-3">
              {job.faq.map((f, i) => (
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
          </>
        ) : null}
      </article>

      <div className="mt-10 rounded-lg border border-border bg-secondary/40 p-6 text-sm text-muted-foreground">
        <strong className="text-foreground">Disclaimer:</strong> Always verify eligibility,
        dates and vacancy details with the official notification before applying. We are an
        independent information portal, not a recruiting authority.
      </div>

      {related.length ? (
        <section className="mt-14">
          <h2 className="text-xl font-bold">More government jobs</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((j) => (
              <Link
                key={j.slug}
                to="/latest-jobs/$slug"
                params={{ slug: j.slug }}
                className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className={`mb-3 h-16 rounded-lg bg-gradient-to-br ${j.hero}`} />
                <h3 className="text-sm font-semibold leading-snug">{j.title}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  View <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
