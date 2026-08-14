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

const BANNER_AD_HTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden;display:flex;justify-content:center}</style></head><body><script type="text/javascript">atOptions = { 'key' : 'a646da14ee6ef2ec2ac1740f89290e52', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };<\/script><script type="text/javascript" src="https://www.highperformanceformat.com/a646da14ee6ef2ec2ac1740f89290e52/invoke.js"><\/script></body></html>`;

/**
 * HighPerformanceFormat 728x90 banner, lazily loaded.
 * Each unit lives in its own iframe document so several banners can coexist
 * on the same page (the network's script uses a single global config object).
 */
export function BannerAd728x90() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-hidden"
      style={{ minHeight: 90 }}
      data-ad-slot="banner"
      aria-label="advertisement"
    >
      {inView ? (
        <iframe
          title="advertisement"
          srcDoc={BANNER_AD_HTML}
          scrolling="no"
          className="h-[90px] w-full max-w-[728px] border-0"
        />
      ) : null}
    </div>
  );
}

/**
 * Popunder / social-bar scripts were removed on purpose: they hijacked clicks
 * anywhere on the page and opened new ad tabs. Do not re-add them.
 */
export function GlobalAdScripts() {
  return null;
}

/** Inline in-article banner, injected between content blocks. */
export function InArticleAd() {
  return <BannerAd728x90 />;
}


const SIDEBAR_AD_HTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body><div id="container-d5a20eba278ba406e416778624f0684b"></div><script async data-cfasync="false" src="https://pl30192468.effectivecpmnetwork.com/d5a20eba278ba406e416778624f0684b/invoke.js"><\/script></body></html>`;

function SidebarAdUnit({ sticky }: { sticky?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={
        (sticky ? "sticky top-24 " : "") + "h-[600px] w-[160px]"
      }
    >
      {inView ? (
        <iframe
          title="advertisement"
          srcDoc={SIDEBAR_AD_HTML}
          scrolling="no"
          className="h-full w-full border-0"
        />
      ) : null}
    </div>
  );
}

/**
 * Sidebar vertical ad rail: a stack of units that scrolls with the page, with
 * the last one pinned so an ad stays in view after the stack is passed.
 * The ad network's container id is fixed, so each unit gets its own iframe
 * document — otherwise only the first would ever fill.
 */
export function SidebarAdSlot({ count = 3 }: { label?: string; count?: number }) {
  return (
    <aside
      className="hidden shrink-0 self-stretch lg:block"
      data-ad-slot="sidebar"
      aria-label="advertisement"
    >
      <div className="flex flex-col gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <SidebarAdUnit key={i} sticky={i === count - 1} />
        ))}
      </div>
    </aside>
  );
}
