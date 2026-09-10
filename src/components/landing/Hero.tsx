import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/lib/articles";
import { jobs } from "@/lib/jobs";
import { CURRENT_DA } from "@/lib/da-rates";
import { QuickCalc } from "./QuickCalc";

const leadSlug = "8th-pay-commission-salary-kab-badhegi-fitment-factor-report-date-hindi";
const featuredSlugs = [
  "8th-pay-commission-jaipur-chennai-chandigarh-meetings-hindi",
  "8th-pay-commission-arrears-full-payment-explained",
  "8th-pay-commission-consultation-phase-timeline-arrears-guide",
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function Hero() {
  const lead = articles.find((article) => article.slug === leadSlug) ?? articles[0];
  const latest = featuredSlugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article) => article !== undefined);
  const latestJobs = jobs.slice(0, 4);

  if (!lead) return null;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-7 sm:px-6 lg:pt-9">
        <header className="mb-7 border-b-4 border-foreground pb-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Financial edition · Live updates
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                8th Pay Commission <span className="text-primary">News Desk</span>
              </h1>
            </div>
            <div className="hidden border-l border-border pl-6 text-right md:block">
              <p className="text-sm font-semibold">Wednesday, 9 September 2026</p>
              <p className="mt-1 text-xs uppercase text-muted-foreground">
                Independent reporting · calculators · jobs
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="order-2 hidden border-border lg:order-1 lg:col-span-3 lg:border-r lg:pr-7">
            <div className="mb-5 flex items-center justify-between border-b-2 border-foreground pb-2">
              <h2 className="font-sans text-sm font-bold uppercase">Latest developments</h2>
              <Link to="/blog" className="text-xs font-semibold text-primary hover:underline">All news</Link>
            </div>
            <div className="divide-y divide-border">
              {latest.map((article, index) => (
                <article key={article.slug} className="py-5 first:pt-0">
                  {index === 0 ? (
                    <span className="mb-2 inline-block bg-primary px-2 py-1 text-[10px] font-bold uppercase text-primary-foreground">
                      Latest
                    </span>
                  ) : null}
                  <Link to="/blog/$slug" params={{ slug: article.slug }} className="group">
                    <h3 className="text-base font-bold leading-snug group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock3 className="h-3 w-3" /> {formatDate(article.updated)} · {article.readMinutes} min read
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </aside>

          <div className="order-1 space-y-7 lg:order-2 lg:col-span-9">
            <article>
              <Link to="/blog/$slug" params={{ slug: lead.slug }} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                  {lead.image ? (
                    <img src={lead.image} alt={lead.imageAlt ?? lead.title} width={1200} height={675} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 bg-foreground/90 p-5 text-background sm:p-7">
                    <span className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Lead report</span>
                    <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{lead.title}</h2>
                  </div>
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead.excerpt}</p>
              </Link>
            </article>
            <QuickCalc />
          </div>

          <aside className="order-3 space-y-7 lg:col-span-3">
            <section className="border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between border-b-2 border-foreground pb-2">
                <h2 className="font-sans text-sm font-bold uppercase">Government jobs</h2>
                <Link to="/latest-jobs" className="text-xs font-semibold text-primary hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-border">
                {latestJobs.map((job) => (
                  <Link key={job.slug} to="/latest-jobs/$slug" params={{ slug: job.slug }} className="group grid grid-cols-[72px_1fr] gap-3 py-3 first:pt-0">
                    {job.image ? <img src={job.image} alt="" width={144} height={81} className="h-12 w-[72px] object-cover" /> : <div className="h-12 w-[72px] bg-secondary" />}
                    <div>
                      <p className="text-[10px] font-bold uppercase text-primary">{job.organization.split(" (")[0]}</p>
                      <h3 className="line-clamp-3 font-sans text-xs font-semibold leading-snug group-hover:underline">{job.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="mt-4 w-full rounded-none">
                <Link to="/latest-jobs">All job notifications <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
            </section>

            <section className="bg-secondary p-5">
              <h2 className="border-b-2 border-foreground pb-2 font-sans text-sm font-bold uppercase">Key indicators</h2>
              <dl className="mt-1 divide-y divide-border">
                <div className="flex items-center justify-between py-3 text-sm"><dt>Current DA</dt><dd className="font-bold text-primary">{CURRENT_DA}%</dd></div>
                <div className="flex items-center justify-between py-3 text-sm"><dt>Report deadline</dt><dd className="font-bold">Mid-2027</dd></div>
                <div className="flex items-center justify-between py-3 text-sm"><dt>Fitment range</dt><dd className="font-bold">1.82x–2.86x</dd></div>
                <div className="flex items-center justify-between py-3 text-sm"><dt>Status</dt><dd className="font-bold text-primary">Consultations</dd></div>
              </dl>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
