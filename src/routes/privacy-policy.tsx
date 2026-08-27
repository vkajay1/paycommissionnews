import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — 8th CPC Calculator" },
      { name: "description", content: "Read the privacy policy of 8th CPC Calculator. Learn how we collect, use and protect your data while you use our calculators and news guides." },
      { property: "og:title", content: "Privacy Policy — 8th CPC Calculator" },
      { property: "og:description", content: "Privacy policy for 8th CPC Calculator and its salary, pension and arrears tools." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://paycommissionnews.co.in/privacy-policy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy — 8th CPC Calculator" },
      { name: "twitter:description", content: "Privacy policy for 8th CPC Calculator and its salary, pension and arrears tools." },
    ],
    links: [{ rel: "canonical", href: "https://paycommissionnews.co.in/privacy-policy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          url: "https://paycommissionnews.co.in/privacy-policy",
        }),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: 15 August 2026
      </p>

      <section className="prose-article mt-8">
        <p>
          This Privacy Policy explains how 8th CPC Calculator ("we", "us" or "our") collects, uses, discloses and safeguards your information when you visit our website{" "}
          <a href="https://paycommissionnews.co.in" className="text-primary hover:underline">https://paycommissionnews.co.in</a>{" "}
          (the "Site"). Please read this policy carefully. If you do not agree with the terms of this policy, please do not access the Site.
        </p>

        <h2>1. Information we collect</h2>
        <p>
          We collect information you provide directly to us, such as contact details submitted through our contact form, and information collected automatically, such as your IP address, browser type, device type, pages visited and referral source via analytics and advertising partners.
        </p>

        <h2>2. How we use your information</h2>
        <ul>
          <li>To operate, maintain and improve the Site and calculators.</li>
          <li>To respond to your inquiries and feedback.</li>
          <li>To display relevant advertisements through Google AdSense after approval.</li>
          <li>To analyse traffic and usage patterns so we can improve content and performance.</li>
        </ul>

        <h2>3. Cookies and tracking</h2>
        <p>
          We and our third-party partners use cookies, web beacons and similar technologies to track activity on the Site and deliver personalised advertising. You can control cookies through your browser settings. For more information about Google AdSense cookies, visit{" "}
          <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google's Ads policy</a>.
        </p>

        <h2>4. Third-party services</h2>
        <p>
          We use Google Analytics and may use Google AdSense after approval. These services may collect data independently and are governed by their own privacy policies. We are not responsible for the privacy practices of third-party websites linked from our content.
        </p>

        <h2>5. Data security</h2>
        <p>
          We use reasonable technical and organisational measures to protect your information. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.
        </p>

        <h2>6. Children's privacy</h2>
        <p>
          The Site is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
        </p>

        <h2>7. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of the Site after any changes constitutes acceptance of the revised policy.
        </p>

        <h2>8. Contact us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through our{" "}
          <a href="/contact" className="text-primary hover:underline">Contact page</a>.
        </p>
      </section>
    </main>
  );
}
