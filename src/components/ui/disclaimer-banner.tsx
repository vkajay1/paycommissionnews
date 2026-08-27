import { Info } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-foreground/80">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
      <p>
        <strong>Estimate, not an official entitlement.</strong> Final 8th CPC pay, fitment,
        allowances, dates and arrears have not been notified. Figures are user-selected planning
        scenarios; see our{" "}
        <a href="/editorial-policy" className="font-semibold text-primary hover:underline">
          methodology
        </a>
        .
      </p>
    </div>
  );
}
