import { Info } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-foreground/80">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
      <p>
        Illustrative figures using sample pay-matrix data. The 8th CPC has not been officially
        notified — fitment factors shown are projections for planning purposes only.
      </p>
    </div>
  );
}
