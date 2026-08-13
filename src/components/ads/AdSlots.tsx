import { useEffect, useRef, useState } from "react";

/**
 * Loads an ad only once its placeholder scrolls near the viewport.
 * Keeps third-party requests off the critical path so pages paint fast.
 */
function useInView<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

/** Effective CPM Network — invoke container ad (script #2) */
export function ContainerAd() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const loaded = useRef(false);

  useEffect(() => {
    const host = ref.current;
    if (!inView || !host || loaded.current) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    s.src =
      "https://pl30192468.effectivecpmnetwork.com/d5a20eba278ba406e416778624f0684b/invoke.js";
    host.appendChild(s);
  }, [inView, ref]);

  return (
    <div ref={ref} className="my-6 flex justify-center" style={{ minHeight: 90 }}>
      <div id="container-d5a20eba278ba406e416778624f0684b" />
    </div>
  );
}

/** HighPerformanceFormat 728x90 banner (script #4), lazily loaded. */
export function BannerAd728x90() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const loaded = useRef(false);

  useEffect(() => {
    const host = ref.current;
    if (!inView || !host || loaded.current) return;
    loaded.current = true;
    const cfg = document.createElement("script");
    cfg.text = `atOptions = { 'key' : 'a646da14ee6ef2ec2ac1740f89290e52', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };`;
    const inv = document.createElement("script");
    inv.async = true;
    inv.src =
      "https://www.highperformanceformat.com/a646da14ee6ef2ec2ac1740f89290e52/invoke.js";
    host.appendChild(cfg);
    host.appendChild(inv);
  }, [inView, ref]);

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-hidden"
      style={{ minHeight: 90 }}
      aria-label="advertisement"
    />
  );
}

/**
 * Popunder / social-bar scripts were removed on purpose: they hijacked clicks
 * anywhere on the page and opened new ad tabs. Do not re-add them.
 */
export function GlobalAdScripts() {
  return null;
}

/** Inline in-article banner, injected after every 2 paragraphs. */
export function InArticleAd() {
  return <BannerAd728x90 />;
}

const SIDEBAR_AD_HTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body><div id="container-d5a20eba278ba406e416778624f0684b"></div><script async data-cfasync="false" src="https://pl30192468.effectivecpmnetwork.com/d5a20eba278ba406e416778624f0684b/invoke.js"><\/script></body></html>`;

/**
 * Sticky sidebar vertical ad rail. The ad network's container has a fixed DOM
 * id, so each rail renders it inside its own iframe document — otherwise only
 * the first of the two rails would ever fill.
 */
export function SidebarAdSlot(_props: { label?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <aside
      className="sticky top-24 hidden h-[620px] shrink-0 self-start lg:block"
      data-ad-slot="sidebar"
      aria-label="advertisement"
    >
      <div ref={ref} className="h-[600px] w-[200px] xl:w-[300px]">
        {inView ? (
          <iframe
            title="advertisement"
            srcDoc={SIDEBAR_AD_HTML}
            scrolling="no"
            className="h-full w-full border-0"
          />
        ) : null}
      </div>
    </aside>
  );
}
