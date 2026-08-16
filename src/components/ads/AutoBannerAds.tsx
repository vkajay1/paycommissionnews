import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouterState } from "@tanstack/react-router";
import { BannerAd728x90 } from "./AdSlots";

/**
 * Guarantees every page/post carries 4-5 banner ads.
 * After each navigation it counts the banners a page already renders and
 * spreads extra placeholders between the top-level content blocks of <main>.
 */
/** Paused during Google AdSense review — see ADS_PAUSED in AdSlots.tsx. */
const ADS_PAUSED = true;

export function AutoBannerAds({ target = 5 }: { target?: number }) {
  if (ADS_PAUSED) return null;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hosts, setHosts] = useState<HTMLElement[]>([]);

  useEffect(() => {
    setHosts([]);
    let cancelled = false;

    const build = () => {
      if (cancelled) return;
      const main = document.querySelector("main");
      if (!main) return;

      // clean up placeholders from a previous route
      main.querySelectorAll("[data-auto-ad]").forEach((el) => el.remove());

      const existing = main.querySelectorAll('[data-ad-slot="banner"]').length;

      // Candidate anchors: substantial content blocks that are not ad wrappers
      const blocks = (Array.from(main.children) as HTMLElement[]).filter(
        (el) =>
          el.offsetHeight > 320 &&
          !el.hasAttribute("data-auto-ad") &&
          !el.querySelector('[data-ad-slot]'),
      );

      // one ad per gap between blocks, never two in a row
      const gaps = Math.max(0, blocks.length - 1);
      const needed = Math.min(Math.max(0, target - existing), gaps);
      if (needed === 0) return;

      const created: HTMLElement[] = [];
      const used = new Set<HTMLElement>();
      const step = gaps / needed;
      for (let i = 0; i < needed; i++) {
        const anchor = blocks[Math.min(gaps - 1, Math.round(i * step))];
        if (!anchor || used.has(anchor)) continue;
        used.add(anchor);
        const host = document.createElement("div");
        host.setAttribute("data-auto-ad", "");
        host.className = "mx-auto w-full max-w-7xl px-4 py-4 sm:px-6";
        anchor.after(host);
        created.push(host);
      }
      if (!cancelled) setHosts(created);

    };

    const t = window.setTimeout(build, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      document
        .querySelectorAll("[data-auto-ad]")
        .forEach((el) => el.remove());
    };
  }, [pathname, target]);

  return (
    <>
      {hosts.map((host, i) => createPortal(<BannerAd728x90 />, host, `auto-ad-${i}`))}
    </>
  );
}
