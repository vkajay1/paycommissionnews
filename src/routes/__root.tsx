import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { SideNav } from "@/components/layout/SideNav";
import { GlobalAdScripts, BannerAd728x90, SidebarAdSlot, TopRectAds } from "@/components/ads/AdSlots";
import { AutoBannerAds } from "@/components/ads/AutoBannerAds";
import { PushPrompt } from "@/components/push/PushPrompt";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "oStqnZ9sPvwgR5ldfdqT_uXGR8FlSi4znLN03L1XHA4" },
      { name: "google-site-verification", content: "RKWGJNwcCsauhMH2s6doxaynuD0B6QG2XzmCzZ-_Kwc" },
      { title: "8th CPC Calculator — 8th Pay Commission salary calculator" },
      {
        name: "description",
        content:
          "Advanced 8th Pay Commission salary, pension and arrear calculators for Indian Central Government employees. Live fitment-factor projections in a modern fintech-style dashboard.",
      },
      { name: "author", content: "8th CPC Calculator" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot-news", content: "index, follow" },
      { property: "og:site_name", content: "8th CPC Calculator" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "8th CPC Calculator — 8th Pay Commission salary calculator" },
      { name: "twitter:title", content: "8th CPC Calculator — 8th Pay Commission salary calculator" },
      { name: "description", content: "Estimate your 8th Pay Commission salary online. Calculate revised basic pay, pension, DA, HRA, arrears, and fitment factor impact with our free and accurate 8th" },
      { property: "og:description", content: "Estimate your 8th Pay Commission salary online. Calculate revised basic pay, pension, DA, HRA, arrears, and fitment factor impact with our free and accurate 8th" },
      { name: "twitter:description", content: "Estimate your 8th Pay Commission salary online. Calculate revised basic pay, pension, DA, HRA, arrears, and fitment factor impact with our free and accurate 8th" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5700822e-e15a-4350-8fc7-5e36e78036f1/id-preview-d4e0f839--d0013254-bd4c-414b-bf95-d33c6e5d92b7.lovable.app-1781621556864.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5700822e-e15a-4350-8fc7-5e36e78036f1/id-preview-d4e0f839--d0013254-bd4c-414b-bf95-d33c6e5d92b7.lovable.app-1781621556864.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700;800&family=Epilogue:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-E7J9MWC6FQ",
      },
      {
        type: "text/javascript",
        children: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-E7J9MWC6FQ');`,
      },
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3146184997876133",
        crossOrigin: "anonymous",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "8th CPC Calculator",
          url: "https://paycommissionnews.co.in",
          inLanguage: ["en-IN", "hi-IN"],
          description:
            "Salary, pension and arrear calculators for the 8th Central Pay Commission.",
          publisher: { "@id": "https://paycommissionnews.co.in/#organization" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsMediaOrganization",
          "@id": "https://paycommissionnews.co.in/#organization",
          name: "8th CPC Calculator",
          url: "https://paycommissionnews.co.in",
          logo: {
            "@type": "ImageObject",
            url: "https://paycommissionnews.co.in/favicon.ico",
          },
          description:
            "Independent coverage, calculators and explainers on the 8th Central Pay Commission for Indian government employees and pensioners.",
          publishingPrinciples: "https://paycommissionnews.co.in/disclaimer",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "editorial",
            url: "https://paycommissionnews.co.in/contact",
          },
        }),
      },

    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cpc-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <TopRectAds />
        </div>
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-start gap-6 px-0 lg:px-6">
          <SideNav />
          <main className="min-w-0 flex-1 pb-20 md:pb-0">
            <Outlet />
          </main>
          <SidebarAdSlot />
        </div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <BannerAd728x90 />
        </div>
        <Footer />
        <MobileNav />
        <GlobalAdScripts />
        <AutoBannerAds target={5} />
        <PushPrompt />

      </div>

    </QueryClientProvider>
  );
}
