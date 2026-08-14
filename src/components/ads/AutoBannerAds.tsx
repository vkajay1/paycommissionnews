import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouterState } from "@tanstack/react-router";
import { BannerAd728x90 } from "./AdSlots";

/**
 * Guarantees every page/post carries 4-5 banner ads.
 * After each navigation it counts the banners a page already renders and
 * spreads extra placeholders between the top-level content blocks of <main>.
 */
export function AutoBannerAds({ target = 5 }: { target?: number }) {
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
      const needed = Math.max(0, target - existing);
      if (needed === 0) return;

      const blocks = Array.from(main.children).filter(
        (el) => (el as HTMLElement).offsetHeight > 120,
      ) as HTMLElement[];
      if (blocks.length === 0) return;

      const created: HTMLElement[] = [];
      const step = Math.max(1, Math.floor(blocks.length / (needed + 1)));
      for (let i = 0; i < needed; i++) {
        const anchor = blocks[Math.min(blocks.length - 1, (i + 1) * step)];
        if (!anchor) break;
        const host = document.createElement("div");
        host.setAttribute("data-auto-ad", "");
        host.className = "mx-auto w-full max-w-7xl px-4 sm:px-6";
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
