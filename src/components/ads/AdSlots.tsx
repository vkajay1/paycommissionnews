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

/** Global site-wide scripts (#1 and #3) — mount once in root */
export function GlobalAdScripts() {
  useEffect(() => {
    const urls = [
      "https://pl30192467.effectivecpmnetwork.com/eb/8d/ac/eb8dacd360213b939688729bdf3608e6.js",
      "https://pl30192470.effectivecpmnetwork.com/37/42/03/3742030cccd806f11e5a88e353c03be0.js",
    ];
    const nodes: HTMLScriptElement[] = [];
    for (const src of urls) {
      if (document.querySelector(`script[data-ad-src="${src}"]`)) continue;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.dataset.adSrc = src;
      document.body.appendChild(s);
      nodes.push(s);
    }
    return () => {
      // keep loaded; nothing to cleanup
    };
  }, []);
  return null;
}
