import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { compareSalary } from "@/lib/cpc";

const FITMENTS = [1.92, 2.0, 2.15, 2.28, 2.57, 2.86, 3.0, 3.68, 3.83];

export default defineTool({
  name: "fitment_scenarios",
  title: "Compare fitment factor scenarios",
  description:
    "Return projected 8th CPC salary across common fitment factor scenarios (1.92x to 3.83x) for the given inputs.",
  inputSchema: {
    level: z.number().int().min(1).max(18),
    basicPay: z.number().positive(),
    city: z.enum(["X", "Y", "Z"]),
    daPct: z.number().min(0).max(200),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const scenarios = FITMENTS.map((f) => {
      const r = compareSalary({ ...input, fitmentFactor: f });
      return {
        fitmentFactor: f,
        projectedBasic: r.projected.basic,
        projectedGross: r.projected.gross,
        currentGross: r.current.gross,
        increase: r.diff,
        pctIncrease: Number(r.pct.toFixed(2)),
      };
    });
    return {
      content: [{ type: "text", text: JSON.stringify(scenarios, null, 2) }],
      structuredContent: { scenarios },
    };
  },
});
