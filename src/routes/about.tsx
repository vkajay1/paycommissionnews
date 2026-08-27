import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — 8th CPC Calculator" },
      { name: "description", content: "Learn about 8th CPC Calculator: an independent, free salary, pension and arrears estimation platform for Indian Central Government employees and pensioners." },
      { property: "og:title", content: "About Us — 8th CPC Calculator" },
      { property: "og:description", content: "Independent 8th Pay Commission salary, pension and arrears calculators for central government employees." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://paycommissionnews.co.in/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Us — 8th CPC Calculator" },
      { name: "twitter:description", content: "Independent 8th Pay Commission salary, pension and arrears calculators for central government employees." },
    ],
    links: [{ rel: "canonical", href: "https://paycommissionnews.co.in/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About 8th CPC Calculator",
          description: "About 8th CPC Calculator, a free estimation tool for Indian Central Government employees and pensioners.",
          url: "https://paycommissionnews.co.in/about",
          mainEntity: {
            "@type": "Organization",
            name: "8th CPC Calculator",
            url: "https://paycommissionnews.co.in",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        About 8th CPC Calculator
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        8th CPC Calculator is a free, independent web platform that helps Indian Central Government employees and pensioners estimate the impact of the upcoming 8th Central Pay Commission.
      </p>

      <section className="prose-article mt-10">
        <h2>What we do</h2>
        <p>
          We provide easy-to-use calculators for salary, pension, arrears, fitment factor, DA, HRA, income tax, NPS, gratuity, EPF and more. Every tool is designed to give a quick, transparent estimate based on inputs you provide, so you can plan ahead without waiting for the final government notification.
        </p>

        <h2>Who we serve</h2>
        <p>
          Our audience includes serving central government employees, defence personnel, railway staff, pensioners, family pensioners and state-government employees who want to benchmark their pay against 8th CPC projections. We also publish news explainers and state-specific guides in English and Hindi.
        </p>

        <h2>Why this project exists</h2>
        <p>
          Pay commission announcements generate a lot of unofficial claims and speculation. We believe employees deserve a clean, ad-supported but non-intrusive place where they can run their own numbers, understand the math and distinguish between confirmed facts and social-media rumours.
        </p>

        <h2>How our work is prepared</h2>
        <p>
          Our editorial desk reviews primary government material, including Gazette notifications,
          Department of Expenditure orders, Press Information Bureau releases and state finance
          department circulars. Calculator outputs are formula-based scenarios, not insider
          information or guaranteed forecasts. Our complete source hierarchy, formulas and correction
          process are published in the{" "}
          <a href="/editorial-policy" className="text-primary hover:underline">
            editorial policy and calculation methodology
          </a>
          .
        </p>

        <h2>Corrections and accountability</h2>
        <p>
          Readers can report an incorrect rate, outdated order or calculation issue by sharing the
          affected page and a supporting primary source. Material corrections are reviewed promptly,
          and time-sensitive articles display their publication and update dates.
        </p>

        <h2>Important disclaimer</h2>
        <p>
          All figures shown on this site are indicative projections. The actual salary, pension, fitment factor, DA rates, HRA and implementation date will be decided by the Government of India and notified officially. Do not treat our calculator outputs as final pay orders.
        </p>

        <h2>Contact us</h2>
        <p>
          Have feedback, a correction or a feature suggestion? Visit our{" "}
          <a href="/contact" className="text-primary hover:underline">Contact page</a>{" "}
          and we will get back to you as soon as possible.
        </p>
      </section>
    </main>
  );
}
