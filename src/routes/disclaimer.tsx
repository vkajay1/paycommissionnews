import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — 8th CPC Calculator" },
      { name: "description", content: "Disclaimer for 8th CPC Calculator: all projections are indicative and not official. Always rely on Government of India notifications for final pay, pension and arrears." },
      { property: "og:title", content: "Disclaimer — 8th CPC Calculator" },
      { property: "og:description", content: "All 8th CPC salary, pension and arrears projections on this site are indicative only. Rely on official government notifications for final figures." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://paycommissionnews.co.in/disclaimer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Disclaimer — 8th CPC Calculator" },
      { name: "twitter:description", content: "All 8th CPC salary, pension and arrears projections on this site are indicative only. Rely on official government notifications for final figures." },
    ],
    links: [{ rel: "canonical", href: "https://paycommissionnews.co.in/disclaimer" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Disclaimer",
          url: "https://paycommissionnews.co.in/disclaimer",
        }),
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Important information about the estimates and content on 8th CPC Calculator.
      </p>

      <section className="prose-article mt-8">
        <h2>Indicative projections only</h2>
        <p>
          All figures, calculations, salary projections, pension estimates, arrears estimates and fitment-factor scenarios shown on this website are indicative and for informational purposes only. They do not constitute an official Government of India notification, order or salary slip.
        </p>

        <h2>Not financial or legal advice</h2>
        <p>
          The content on this site is general information and should not be treated as financial, legal, tax or career advice. Before making any financial or career decision based on our calculators or articles, you should consult a qualified professional or your departmental pay and accounts office.
        </p>

        <h2>Official sources are final</h2>
        <p>
          The final 8th Central Pay Commission recommendations, fitment factor, revised pay matrix, DA rates, HRA rates, pension rules, arrears rules and implementation date will be decided and notified by the Government of India. Always rely on official notifications from the Department of Expenditure, Ministry of Finance, and other authorised government channels.
        </p>

        <h2>Accuracy of inputs</h2>
        <p>
          Calculator outputs depend entirely on the inputs you provide and the assumptions built into each tool. If your inputs change, or if government rules differ from our assumptions, the results will differ. We do not store or verify your personal service records.
        </p>

        <h2>External links and advertisements</h2>
        <p>
          This site may contain links to external websites and display advertisements through third-party networks. We are not responsible for the content, accuracy, privacy practices or availability of any third-party website or advertisement.
        </p>

        <h2>Changes to content</h2>
        <p>
          We update articles and calculators as new information becomes publicly available. However, we cannot guarantee that every page reflects the latest government announcement at all times. We encourage users to verify critical details against official sources.
        </p>

        <h2>Contact us</h2>
        <p>
          If you believe any content is inaccurate or misleading, please let us know through our{" "}
          <a href="/contact" className="text-primary hover:underline">Contact page</a>{" "}
          and we will review it promptly.
        </p>
      </section>
    </main>
  );
}
