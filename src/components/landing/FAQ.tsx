import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "When will the 8th Pay Commission be implemented?",
    a: "The 8th CPC has been announced but the recommendations and implementation date are not yet officially notified. Calculators here use projected fitment factors for planning only.",
  },
  {
    q: "What fitment factor should I use?",
    a: "Industry projections range from 1.92x to 3.83x. Most analysts cluster around 2.00x – 2.57x. Use the slider to compare scenarios side by side.",
  },
  {
    q: "Are the pay matrix values accurate?",
    a: "Entry-cell values for levels 1–18 are based on the current 7th CPC matrix as sample data. Full cell-by-cell pay matrix is in development.",
  },
  {
    q: "Does this account for DA, HRA and TA?",
    a: "Yes. Salary calculator includes DA percentage, city-based HRA (X/Y/Z) and pay-level-based TA slabs, both current and projected.",
  },
  {
    q: "Is this an official government tool?",
    a: "No. This is an independent estimator. Always refer to official notifications for binding figures.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`i${i}`} className="border-border">
            <AccordionTrigger className="text-left text-sm font-semibold">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
