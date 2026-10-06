import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

type MgidWidgetId = "2091781" | "2091789" | "2091791" | "2091792";

/** Keep the provider's markup intact and reload new containers after navigation. */
export function MgidWidget({
  widgetId,
  className = "",
}: {
  widgetId: MgidWidgetId;
  className?: string;
}) {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const mgidWindow = window as Window & { _mgq?: string[][] };
    mgidWindow._mgq = mgidWindow._mgq || [];
    mgidWindow._mgq.push(["_mgc.load"]);
  }, [pathname, widgetId]);

  return (
    <div className={`min-w-0 max-w-full ${className}`} aria-label="Advertisement">
      <div key={pathname} data-type="_mgwidget" data-widget-id={widgetId} />
    </div>
  );
}