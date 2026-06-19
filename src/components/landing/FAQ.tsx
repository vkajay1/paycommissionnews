import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const homeFaqs = [
  {
    q: "Is the 8th Pay Commission salary calculator accurate?",
    a: "It is an informed estimate. Until the government notifies the official fitment factor and pay matrix, every 8th CPC calculator (including ours) uses projected values. Our tool lets you adjust the fitment factor, DA, HRA city class and allowances so you can model best-case and conservative scenarios instead of relying on a single number.",
  },
  {
    q: "What is the expected fitment factor for 8th Pay Commission?",
    a: "Most projections place the 8th CPC fitment factor between 2.57x and 3.0x, with some analysts modelling up to 3.83x. The 7th CPC used 2.57x. We recommend running the calculator at 2.86x and 3.0x to see a realistic salary band.",
  },
  {
    q: "When will the 8th Pay Commission be implemented?",
    a: "The 8th Pay Commission has been announced and is widely expected to take effect from 1 January 2026, with arrears paid out after the recommendations are formally accepted. Exact dates depend on the official gazette notification.",
  },
  {
    q: "What is the current DA percentage for central government employees?",
    a: "Dearness Allowance is revised twice a year. On implementation of the 8th CPC, DA is typically reset to 0% on the new basic pay and then grows from there. Our calculator lets you set DA manually so you can model both pre- and post-implementation scenarios.",
  },
  {
    q: "How is HRA calculated under 8th Pay Commission?",
    a: "HRA is paid as a percentage of revised basic pay based on city class — typically 27% (X / metro), 18% (Y) and 9% (Z) at full DA-linked rates. Choose your city category in the calculator to apply the correct slab.",
  },
  {
    q: "Can pensioners use this 8th Pay Commission calculator?",
    a: "Yes. Pension is calculated as 50% of the revised basic pay plus applicable DA. Use the salary calculator with your last drawn basic to estimate revised pension; a dedicated pensioner mode is in development.",
  },
  {
    q: "Is there a separate calculator for Army and Defence personnel?",
    a: "Defence pay includes Military Service Pay (MSP), field area allowance, risk and hardship allowances and other heads that civilian calculators miss. A defence-specific module is on the roadmap — for now, add MSP and field allowances manually to the result.",
  },
  {
    q: "What is the minimum basic pay expected under 8th Pay Commission?",
    a: "At a 2.86x fitment factor, the minimum basic pay rises from ₹18,000 (7th CPC) to roughly ₹51,480. At 3.0x it touches ₹54,000. The final figure will be confirmed in the official 8th CPC report.",
  },
  {
    q: "How do I calculate my 8th CPC salary from 7th CPC basic pay?",
    a: "Multiply your current 7th CPC basic pay by the projected fitment factor to get the new basic, then add DA, HRA and TA on top. Our calculator does this instantly and shows old vs new salary with the percentage hike.",
  },
  {
    q: "Will state government employees also benefit from 8th Pay Commission?",
    a: "Most states adopt central pay commission recommendations with a lag of 6–24 months, subject to state finances. Use the same calculator — the structure of basic + DA + HRA applies to state employees too.",
  },
  {
    q: "क्या 8वें वेतन आयोग कैलकुलेटर हिंदी में उपलब्ध है?",
    a: "हिंदी इंटरफ़ेस और हिंदी PDF डाउनलोड का सपोर्ट हमारे रोडमैप में है। तब तक आप मौजूदा कैलकुलेटर का उपयोग करके अपना अनुमानित 8वें वेतन आयोग वेतन देख सकते हैं।",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          8th Pay Commission Salary Calculator — FAQs
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Answers to the most-searched questions on 8th CPC salary, fitment factor, DA, HRA and pension.
        </p>
      </div>
      <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4">
        {homeFaqs.map((f, i) => (
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
