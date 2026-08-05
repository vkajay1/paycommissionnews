import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { QuickCalc } from "@/components/landing/QuickCalc";
import { CalculatorGrid } from "@/components/landing/CalculatorGrid";
import { CpcSnapshot } from "@/components/landing/CpcSnapshot";
import { Features } from "@/components/landing/Features";
import { SalaryGuide } from "@/components/landing/SalaryGuide";
import { FAQ, homeFaqs } from "@/components/landing/FAQ";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { BannerAd728x90, ContainerAd } from "@/components/ads/AdSlots";


const SITE = "https://paycommissionnews.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "8th Pay Commission Salary Calculator 2026 — Estimate Hike, DA, HRA & Pension",
      },
      {
        name: "description",
        content:
          "Free 8th Pay Commission salary calculator 2026. Estimate revised salary, fitment factor (2.57x–3.83x), DA, HRA, pension and arrears for central & state government, defence and PSU employees.",
      },
      {
        name: "keywords",
        content:
          "8th pay commission, 8th pay commission salary calculator, 8 CPC salary calculator, 8th pay commission 2026, fitment factor 8th pay commission, 8th CPC pension calculator, 8th pay commission salary hike, 8th pay commission for army, 8th pay commission Hindi",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content:
          "8th Pay Commission Salary Calculator 2026 — Hike, DA, HRA & Pension",
      },
      {
        property: "og:description",
        content:
          "Estimate your 8th CPC revised salary instantly. Fitment slider 1.92x–3.83x, DA, HRA, TA and pension projections.",
      },
      { property: "og:url", content: `${SITE}/` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "8th Pay Commission Salary Calculator 2026",
      },
      {
        name: "twitter:description",
        content:
          "Estimate revised salary, DA, HRA, pension and arrears under the 8th CPC.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "8th Pay Commission Salary Calculator",
          url: `${SITE}/`,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          description:
            "Free online 8th Pay Commission salary calculator for central and state government employees, pensioners and defence personnel.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE}/`,
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <QuickCalc />
      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        <DisclaimerBanner />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <BannerAd728x90 />
      </div>
      <CpcSnapshot />
      <CalculatorGrid />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ContainerAd />
      </div>
      <SalaryGuide />
      <Features />
      <FAQ />
    </>
  );
}

