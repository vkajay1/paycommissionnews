import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { InArticleAd } from "@/components/ads/AdSlots";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Faq = { q: string; a: string };

export function faqLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function appLd(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

export function CalcHeader({
  icon: Icon,
  kicker,
  title,
  sub,
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {kicker}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

export function ResultRow({
  label,
  value,
  highlight,
  negative,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={
          highlight
            ? "text-lg font-bold text-primary"
            : negative
              ? "text-base font-semibold text-destructive"
              : "text-base font-semibold"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function CalcContent({
  heading,
  intro,
  method,
  formula,
  faq,
  related,
}: {
  heading: string;
  intro: string;
  method: { title: string; body: string }[];
  formula: string[];
  faq: Faq[];
  related?: { label: string; to: string }[];
}) {
  return (
    <div className="mt-12 space-y-12">
      <article className="prose-article">
        <h2>{heading}</h2>
        <p>{intro}</p>
        {method.map((m, i) => (
          <div key={m.title}>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
            {i % 2 === 1 ? (
              <div className="not-prose">
                <InArticleAd />
              </div>
            ) : null}
          </div>
        ))}
      </article>

      <section>
        <h2 className="mb-3 text-xl font-bold">Calculation formula</h2>
        <div className="space-y-2 rounded-lg border border-border bg-secondary/40 p-5 font-mono text-sm">
          {formula.map((f) => (
            <div key={f}>{f}</div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-4">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`i${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {related && related.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold">Related calculators</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="rounded-md border border-border px-4 py-1.5 text-sm font-medium hover:border-primary/40 hover:bg-primary/5"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
