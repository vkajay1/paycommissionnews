import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import type { Faq } from "@/components/calc/CalcShell";

export type HubLink = { label: string; to: string; description: string };

export function KeywordHub({
  eyebrow,
  title,
  lede,
  primary,
  tools,
  sections,
  table,
  faq,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  primary: { label: string; to: string };
  tools: HubLink[];
  sections: { heading: string; body: string[] }[];
  table?: { caption: string; head: string[]; rows: string[][] };
  faq: Faq[];
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{lede}</p>
        <Button asChild className="mt-5">
          <Link to={primary.to}>
            {primary.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <DisclaimerBanner />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Calculators for this topic</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Card key={t.to + t.label} className="rounded-2xl p-5">
              <Link to={t.to} className="group">
                <h3 className="flex items-center gap-2 text-base font-semibold group-hover:text-primary">
                  {t.label}
                  <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.description}</p>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <article className="prose-article mt-12">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        ))}
      </article>

      {table ? (
        <section className="mt-12">
          <h2 className="mb-3 text-xl font-bold">{table.caption}</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr>
                  {table.head.map((h) => (
                    <th key={h} className="whitespace-nowrap p-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.join("|")} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td key={i} className={i === 0 ? "p-3 font-medium" : "p-3 text-muted-foreground"}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`h${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
