import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/lib/articles";
import { jobs } from "@/lib/jobs";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { ROLE_PAGES, STATE_PAGES } from "@/lib/seo-pages";

const BASE_URL = "https://paycommissionnews.co.in";

type Changefreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: Changefreq;
  priority?: string;
  image?: string;
  imageTitle?: string;
}

const STATIC: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/salary", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-salary-list", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-pay-matrix", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-terms-of-reference", changefreq: "weekly", priority: "0.8" },
  { path: "/8th-pay-commission-bank-employees", changefreq: "weekly", priority: "0.8" },
  { path: "/8th-pay-commission-kya-hai", changefreq: "weekly", priority: "0.9" },

  { path: "/da-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/pension", changefreq: "weekly", priority: "0.9" },
  { path: "/arrear", changefreq: "weekly", priority: "0.9" },
  { path: "/pension-arrear", changefreq: "weekly", priority: "0.8" },
  { path: "/fitment-simulator", changefreq: "weekly", priority: "0.9" },
  { path: "/pay-fixation", changefreq: "weekly", priority: "0.8" },
  { path: "/ltc-planner", changefreq: "weekly", priority: "0.8" },
  { path: "/take-home-salary", changefreq: "weekly", priority: "0.9" },
  { path: "/gratuity-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/epf-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/hra-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/income-tax-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/nps-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/leave-encashment-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/macp-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/fitment-factor", changefreq: "weekly", priority: "0.9" },
  { path: "/7th-pay-commission-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/7th-vs-8th-pay-commission", changefreq: "weekly", priority: "0.9" },
  { path: "/6th-pay-commission-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-arrears-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-pension-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/salary-fixation", changefreq: "weekly", priority: "0.9" },
  { path: "/fitment-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/rajasthan-government-salary-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-salary-calculator-in-hindi", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-pension-calculator-in-hindi", changefreq: "weekly", priority: "0.9" },
  { path: "/8th-pay-commission-arrears-calculator-in-hindi", changefreq: "weekly", priority: "0.9" },
  { path: "/da-calculator-in-hindi", changefreq: "weekly", priority: "0.9" },
  { path: "/fitment-factor-in-hindi", changefreq: "weekly", priority: "0.9" },
  { path: "/pay-commission-history", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/latest-jobs", changefreq: "daily", priority: "0.8" },
  { path: "/pay-level", changefreq: "weekly", priority: "0.8" },
  { path: "/role", changefreq: "weekly", priority: "0.8" },
  { path: "/state", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/editorial-policy", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy-policy", changefreq: "monthly", priority: "0.6" },
  { path: "/disclaimer", changefreq: "monthly", priority: "0.6" },
];

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [...STATIC];

  // Pay level detail pages
  for (const level of PAY_LEVELS) {
    entries.push({
      path: `/pay-level/${level.level}`,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // Role detail pages
  for (const role of ROLE_PAGES) {
    entries.push({
      path: `/role/${role.slug}`,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // State / UT detail pages
  for (const state of STATE_PAGES) {
    entries.push({
      path: `/state/${state.slug}`,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // Blog articles (lastmod from article updated date)
  for (const article of articles) {
    entries.push({
      path: `/blog/${article.slug}`,
      lastmod: article.updated,
      image: article.image,
      imageTitle: article.title,
      changefreq: "daily",
      priority: article.slug === "8th-pay-commission-consultation-phase-timeline-arrears-guide" ? "0.9" : "0.8",
    });
  }

  // Latest government job postings
  for (const job of jobs) {
    entries.push({
      path: `/latest-jobs/${job.slug}`,
      lastmod: job.updated,
      image: job.image,
      imageTitle: job.title,
      changefreq: "daily",
      priority: "0.8",
    });
  }

  return entries;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Sitemaps require fully-qualified URLs, so relative asset paths get the site origin. */
function absoluteUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = buildEntries();

        const urls = entries.map((e) => {
          const lines = [
            `  <url>`,
            `    <loc>${escapeXml(`${BASE_URL}${e.path}`)}</loc>`,
          ];
          if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
          if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
          if (e.priority) lines.push(`    <priority>${e.priority}</priority>`);
          if (e.image) {
            lines.push(`    <image:image>`);
            lines.push(`      <image:loc>${escapeXml(absoluteUrl(e.image))}</image:loc>`);
            if (e.imageTitle)
              lines.push(`      <image:title>${escapeXml(e.imageTitle)}</image:title>`);
            lines.push(`    </image:image>`);
          }
          lines.push(`  </url>`);
          return lines.join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
