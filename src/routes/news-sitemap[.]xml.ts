import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/lib/articles";

const BASE_URL = "https://paycommissionnews.co.in";

/**
 * Google News sitemaps should only advertise articles published in the last
 * two days. Older entries are ignored by the News crawler, so we keep a short
 * window and never emit an empty document (Google treats that as an error) —
 * if nothing was published recently we fall back to the newest articles.
 */
const NEWS_WINDOW_DAYS = 2;
const FALLBACK_COUNT = 10;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Publication date as W3C datetime (article dates are date-only ISO strings). */
function pubDate(date: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T06:00:00+05:30` : date;
}

function newsArticles() {
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const cutoff = Date.now() - NEWS_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const recent = sorted.filter((a) => new Date(a.date).getTime() >= cutoff);
  return recent.length > 0 ? recent : sorted.slice(0, FALLBACK_COUNT);
}

export const Route = createFileRoute("/news-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = newsArticles().map((a) => {
          const lines = [
            `  <url>`,
            `    <loc>${escapeXml(`${BASE_URL}/blog/${a.slug}`)}</loc>`,
            `    <news:news>`,
            `      <news:publication>`,
            `        <news:name>8th CPC Calculator</news:name>`,
            `        <news:language>${a.lang === "hi" ? "hi" : "en"}</news:language>`,
            `      </news:publication>`,
            `      <news:publication_date>${pubDate(a.date)}</news:publication_date>`,
            `      <news:title>${escapeXml(a.title)}</news:title>`,
            `    </news:news>`,
            `    <lastmod>${a.updated}</lastmod>`,
          ];
          if (a.image) {
            lines.push(
              `    <image:image>`,
              `      <image:loc>${escapeXml(a.image)}</image:loc>`,
              `      <image:title>${escapeXml(a.title)}</image:title>`,
              `    </image:image>`,
            );
          }
          lines.push(`  </url>`);
          return lines.join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=600",
          },
        });
      },
    },
  },
});
