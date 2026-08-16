import { Link } from "@tanstack/react-router";
import { InArticleAd } from "@/components/ads/AdSlots";
import type { LucideIcon } from "lucide-react";
import { Languages } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SITE = "https://paycommissionnews.co.in";

export type HindiFaq = { q: string; a: string };

/** हिंदी पेजों की सूची — नेविगेशन और आंतरिक लिंकिंग के लिए। */
export const HINDI_PAGES: { label: string; to: string; desc: string }[] = [
  {
    label: "8वां वेतन आयोग सैलरी कैलकुलेटर",
    to: "/8th-pay-commission-salary-calculator-in-hindi",
    desc: "फिटमेंट फैक्टर, DA, HRA और TA के साथ संशोधित वेतन का अनुमान।",
  },
  {
    label: "8वां वेतन आयोग पेंशन कैलकुलेटर",
    to: "/8th-pay-commission-pension-calculator-in-hindi",
    desc: "मूल पेंशन, महंगाई राहत और कम्युटेशन का हिंदी में हिसाब।",
  },
  {
    label: "एरियर (बकाया) कैलकुलेटर",
    to: "/8th-pay-commission-arrears-calculator-in-hindi",
    desc: "लागू होने की तारीख से आदेश जारी होने तक का बकाया।",
  },
  {
    label: "महंगाई भत्ता (DA) कैलकुलेटर",
    to: "/da-calculator-in-hindi",
    desc: "वर्तमान DA 60% और पिछली किस्तों के अनुसार गणना।",
  },
  {
    label: "फिटमेंट फैक्टर कैलकुलेटर",
    to: "/fitment-factor-in-hindi",
    desc: "1.92x से 2.86x तक हर परिदृश्य में नया मूल वेतन।",
  },
];

export function HindiHeader({
  icon: Icon,
  kicker,
  title,
  sub,
  english,
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  sub: string;
  english: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
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
      <Link
        to={english}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Languages className="h-3.5 w-3.5" />
        Read this page in English
      </Link>
    </div>
  );
}

export function HindiRow({
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

export function HindiCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card">
      <div className="mb-4 text-sm font-semibold">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function HindiContent({
  heading,
  intro,
  method,
  formula,
  faq,
  exclude,
}: {
  heading: string;
  intro: string;
  method: { title: string; body: string }[];
  formula: string[];
  faq: HindiFaq[];
  /** इस पेज का अपना लिंक सूची से हटाने के लिए */
  exclude?: string;
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
        <h2 className="mb-3 text-xl font-bold">गणना का सूत्र</h2>
        <div className="space-y-2 rounded-lg border border-border bg-secondary/40 p-5 font-mono text-sm">
          {formula.map((f) => (
            <div key={f}>{f}</div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">अक्सर पूछे जाने वाले प्रश्न</h2>
        <Accordion
          type="single"
          collapsible
          className="rounded-lg border border-border bg-card px-4"
        >
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`i${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">हिंदी में अन्य कैलकुलेटर</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {HINDI_PAGES.filter((p) => p.to !== exclude).map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="text-sm font-semibold">{p.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{p.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <p className="rounded-lg border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
        अस्वीकरण: 8वें वेतन आयोग की सिफारिशें अभी जारी नहीं हुई हैं। यहाँ दिए गए
        आंकड़े नमूना पे मैट्रिक्स और सार्वजनिक रूप से चर्चित फिटमेंट फैक्टर पर
        आधारित अनुमान हैं। यह वेबसाइट किसी सरकारी विभाग से संबंधित नहीं है।
      </p>
    </div>
  );
}

export function hindiFaqLd(faq: HindiFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "hi-IN",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function hindiAppLd(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    inLanguage: "hi-IN",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

/** हर हिंदी पेज के लिए मानक head मेटा */
export function hindiHead({
  path,
  english,
  title,
  description,
  keywords,
  faq,
  appName,
}: {
  path: string;
  english: string;
  title: string;
  description: string;
  keywords: string;
  faq: HindiFaq[];
  appName: string;
}) {
  const url = `${SITE}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "language", content: "Hindi" },
      { property: "og:locale", content: "hi_IN" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "hi-IN", href: url },
      { rel: "alternate", hrefLang: "en-IN", href: `${SITE}${english}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(hindiAppLd(appName, url, description)),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(hindiFaqLd(faq)),
      },
    ],
  };
}
