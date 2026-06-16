import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { QuickCalc } from "@/components/landing/QuickCalc";
import { CalculatorGrid } from "@/components/landing/CalculatorGrid";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "8th CPC Calculator — Estimate Your Revised Salary Instantly" },
      {
        name: "description",
        content:
          "Project your 8th Pay Commission salary, pension and arrears across fitment factors 1.92x to 3.83x. Modern, mobile-first calculator for Central Government employees.",
      },
      { property: "og:title", content: "8th CPC Calculator — Estimate Your Revised Salary" },
      {
        property: "og:description",
        content:
          "Advanced salary, pension and arrear calculators for Central Government employees.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
      <CalculatorGrid />
      <Features />
      <FAQ />
    </>
  );
}
