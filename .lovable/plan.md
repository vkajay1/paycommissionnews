# 8th CPC Calculator — v1 Plan

Client-side only, TanStack Start + React + Tailwind v4 + shadcn + Recharts. Sample pay-matrix data with a visible disclaimer. Dark + light mode, mobile-first.

## Scope

1. **Landing page** (`/`) — hero, quick calculator widget, calculator category cards, fitment growth chart, features, FAQ, footer.
2. **Salary Calculator page** (`/salary`) — full inputs + results dashboard + charts.
3. **Shared shell** — header with theme toggle + nav, footer, mobile bottom nav (Home / Salary / disabled placeholders with "Coming soon").
4. **Disclaimer** — banner + footer note that figures are illustrative; official 8th CPC values not yet notified.

Out of scope for v1 (stubs only, marked "Coming soon"): Pension, Arrear, Pay Matrix Explorer, Fitment Simulator page, Scenario Comparison, AI Insights, Blog, Accounts, PDF/Excel export.

## Design

Fintech SaaS aesthetic (Zerodha / CRED / Stripe inspired) — explicitly not a clone of 8cpccalculator.com.

- Colors via semantic tokens in `src/styles.css` (`@theme inline` mapping):
  - primary `#2563EB`, accent `#14B8A6`, success `#22C55E`, warning `#F59E0B`, danger `#EF4444`
  - light bg `#F8FAFC`, dark bg `slate-950 (#020617)`, card surfaces white / slate-900
- Inter via Google Fonts `<link>` in `__root.tsx`; `--font-sans: Inter`.
- Radius `--radius: 20px`; soft layered shadows (`--shadow-elevated`).
- Dark mode via `@custom-variant dark (&:where(.dark, .dark *))` + class on `<html>`, persisted in localStorage.

## Calculation logic (`src/lib/cpc.ts`)

Pure functions, fully unit-testable:

```
basicRevised   = basicPay * fitmentFactor
daAmount       = basicPay * daPct/100                      // current
hraPct(city)   = X:30, Y:20, Z:10                          // pre-revision
hraRevised(city) = X:24, Y:16, Z:8                         // post-revision (sample)
ta             = flat slabs by pay level (sample table)
gross          = basic + da + hra + ta
netIncrease    = grossRevised - grossCurrent
pctIncrease    = netIncrease / grossCurrent * 100
```

Sample 7th CPC pay-matrix levels 1–18 first-cell values seeded in `src/lib/pay-matrix.ts` with `SAMPLE_DATA = true` flag surfaced in UI.

## Routes & files

```
src/routes/
  __root.tsx              header, footer, theme provider, Inter <link>, sitewide meta
  index.tsx               landing
  salary.tsx              salary calculator
src/components/
  layout/Header.tsx, Footer.tsx, MobileNav.tsx, ThemeToggle.tsx
  landing/Hero.tsx, QuickCalc.tsx, CalculatorGrid.tsx,
          FitmentChart.tsx, Features.tsx, FAQ.tsx
  salary/SalaryForm.tsx, ResultsDashboard.tsx,
         BreakdownPie.tsx, GrowthBar.tsx, MonthlyLine.tsx
  ui/disclaimer-banner.tsx
src/lib/
  cpc.ts, pay-matrix.ts, format.ts
src/hooks/use-theme.ts
src/styles.css            tokens, dark variant, font family
```

shadcn primitives reused: `card`, `button`, `input`, `label`, `select`, `slider`, `tabs`, `accordion`, `badge`, `toggle`, `tooltip`, `separator`.

## Charts (Recharts)

- Landing: line chart of revised basic across fitment factors [1.92, 2.00, 2.15, 2.28, 2.57, 3.83] for a chosen sample basic.
- Salary results: pie (Basic/DA/HRA/TA), bar (Current vs Projected components), line (12-month projection w/ DA tick assumption noted).

## State

Local React state per page; URL query params on `/salary` for shareable inputs (`?level=7&basic=44900&city=X&fit=2.28&da=50`). No backend, no storage.

## SEO / head

- `__root.tsx`: viewport, charSet, `og:type=website`, `og:site_name`, Organization JSON-LD.
- `/`: title "8th CPC Calculator — Estimate Your Revised Salary", description, og:title/description/url, canonical `/`.
- `/salary`: title "8th CPC Salary Calculator", own description + canonical `/salary`, FAQPage + Calculator JSON-LD.
- `public/robots.txt` allows all; `public/sitemap.xml` with `/` and `/salary` (relative `BASE_URL=""`).

## Accessibility & perf

- All interactive controls labelled; slider has live `aria-valuetext`.
- Color contrast checked against tokens in both themes.
- Lazy-load Recharts components on routes that use them; preload hero font.

## Build order

1. Tokens, fonts, theme toggle, header/footer shell, mobile bottom nav.
2. `cpc.ts` + sample pay matrix + format helpers.
3. Landing: Hero, QuickCalc (live), CalculatorGrid (cards w/ "Coming soon" badges except Salary), FitmentChart, Features, FAQ.
4. `/salary`: form, results dashboard, 3 charts, URL sync, disclaimer.
5. SEO meta, sitemap/robots, final responsive + dark-mode pass.

## Notes / open items

- All non-Salary calculator cards link to `/salary` for now or show a toast "Coming in next release" — I'll go with disabled cards + "Coming soon" badge so the IA is honest.
- Pay-matrix and TA slab numbers are representative samples; banner makes this clear. Real data can drop in later by editing `pay-matrix.ts`.
