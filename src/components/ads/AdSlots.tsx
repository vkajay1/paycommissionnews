import { useEffect, useRef } from "react";

/** Effective CPM Network — invoke container ad (script #2) */
export function ContainerAd() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.dataset.loaded === "1") return;
    ref.current.dataset.loaded = "1";
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    s.src =
      "https://pl30192468.effectivecpmnetwork.com/d5a20eba278ba406e416778624f0684b/invoke.js";
    ref.current.appendChild(s);
  }, []);
  return (
    <div ref={ref} className="my-6 flex justify-center">
      <div id="container-d5a20eba278ba406e416778624f0684b" />
    </div>
  );
}

/** HighPerformanceFormat 728x90 banner (script #4) */
export function BannerAd728x90() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.dataset.loaded === "1") return;
    ref.current.dataset.loaded = "1";
    const cfg = document.createElement("script");
    cfg.text = `atOptions = { 'key' : 'a646da14ee6ef2ec2ac1740f89290e52', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };`;
    const inv = document.createElement("script");
    inv.src =
      "https://www.highperformanceformat.com/a646da14ee6ef2ec2ac1740f89290e52/invoke.js";
    ref.current.appendChild(cfg);
    ref.current.appendChild(inv);
  }, []);
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

/**
 * Reserved space for a Google AdSense vertical unit (160x600 / 300x600).
 * Renders a quiet placeholder until the AdSense code is added.
 */
export function SidebarAdSlot({ label }: { label?: string }) {
  return (
    <aside
      aria-hidden="true"
      className="sticky top-24 hidden xl:block"
      data-ad-slot="sidebar"
    >
      {/* Reserved 160x600 space for future AdSense sidebar unit */}
      <div className="h-[600px] w-[160px]" />
    </aside>
  );
}
