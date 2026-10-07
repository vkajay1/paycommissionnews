import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

type MgidWidgetId = "2091781" | "2091789" | "2091791" | "2091792" | "2091957";

/** Keep the provider's markup intact and reload new containers after navigation. */
export function MgidWidget({
  widgetId,
  className = "",
  mobileOnly = false,
}: {
  widgetId: MgidWidgetId;
  className?: string;
  mobileOnly?: boolean;
}) {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!mobileOnly) return;
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [mobileOnly]);

  useEffect(() => {
    if (mobileOnly && !isMobile) return;
    const mgidWindow = window as Window & { _mgq?: string[][] };
    mgidWindow._mgq = mgidWindow._mgq || [];
    mgidWindow._mgq.push(["_mgc.load"]);
  }, [pathname, widgetId, mobileOnly, isMobile]);

  if (mobileOnly && !isMobile) return null;

  return (
    <div className={`min-w-0 max-w-full ${widgetId === "2091789" ? "min-h-[300px]" : ""} ${className}`} aria-label="Advertisement" data-mgid-placement={widgetId}>
      <div key={pathname} data-type="_mgwidget" data-widget-id={widgetId} />
    </div>
  );
}