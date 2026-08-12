import { Suspense, lazy, type ComponentType } from "react";

/**
 * Charts pull in the large Recharts bundle. Loading them lazily keeps
 * the initial JS payload small; a fixed-height skeleton avoids layout shift.
 */
function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      className="animate-pulse rounded-2xl bg-muted/40"
      style={{ height }}
      aria-hidden="true"
    />
  );
}

export function lazyChart<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  height = 260,
) {
  const Lazy = lazy(loader);
  return function LazyChart(props: P) {
    return (
      <Suspense fallback={<ChartSkeleton height={height} />}>
        <Lazy {...props} />
      </Suspense>
    );
  };
}
