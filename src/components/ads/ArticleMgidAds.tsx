import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import { MgidWidget } from "./MgidWidget";

/** Covers both shared article templates and individually authored guide pages. */
export function ArticleMgidAds() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [hosts, setHosts] = useState<HTMLElement[]>([]);

  useEffect(() => {
    setHosts([]);
    const created: HTMLElement[] = [];
    const placed = new WeakSet<Element>();
    const build = () => {
      const main = document.querySelector("main");
      if (!main) return;

      const addHost = (anchor: Element, before = false) => {
        if (placed.has(anchor)) return;
        placed.add(anchor);
        const host = document.createElement("div");
        host.dataset.articleMgidAd = "2091957";
        host.className = "not-prose my-6 min-w-0 max-w-full";
        if (before) anchor.before(host);
        else anchor.after(host);
        created.push(host);
      };

      main.querySelectorAll(".prose-article").forEach((article) => {
        const paragraphs = Array.from(article.querySelectorAll("p")).filter(
          (p) => !p.closest("details, table, blockquote, .not-prose, [aria-label='Advertisement']"),
        );
        paragraphs.forEach((p, index) => {
          if ((index + 1) % 2 === 0) addHost(p);
        });
      });

      main.querySelectorAll("h2, h3").forEach((heading) => {
        if (!/frequently asked questions|\bfaqs?\b|अक्सर पूछे जाने वाले प्रश्न/i.test(heading.textContent ?? "")) return;
        // Reuse a paragraph-gap ad when it already sits immediately before FAQs.
        if (heading.previousElementSibling?.hasAttribute("data-article-mgid-ad") ||
            heading.previousElementSibling?.lastElementChild?.hasAttribute("data-article-mgid-ad")) return;
        addHost(heading, true);
      });
      setHosts((previous) => previous.length === created.length ? previous : [...created]);
    };
    let timer = window.setTimeout(build, 300);
    const observer = new MutationObserver((records) => {
      if (!records.some((record) => record.target instanceof Element &&
        !record.target.closest("[data-article-mgid-ad], [aria-label='Advertisement']"))) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(build, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      created.forEach((host) => host.remove());
    };
  }, [pathname]);

  return <>{hosts.map((host, index) => createPortal(
    <MgidWidget widgetId="2091957" />, host, `${pathname}-article-ad-${index}`,
  ))}</>;
}