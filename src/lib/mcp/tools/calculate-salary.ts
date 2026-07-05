import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { compareSalary } from "@/lib/cpc";

export default defineTool({
  name: "calculate_salary",
  title: "Calculate 8th CPC salary",
  description:
    "Estimate current vs projected salary under the 8th Pay Commission using basic pay, level, city category (X/Y/Z), current DA %, and fitment factor.",
  inputSchema: {
    level: z.number().int().min(1).max(18).describe("Pay matrix level (1-18)."),
    basicPay: z.number().positive().describe("Current basic pay in INR."),
    city: z.enum(["X", "Y", "Z"]).describe("HRA city category."),
    daPct: z.number().min(0).max(200).describe("Current DA percentage."),
    fitmentFactor: z
      .number()
      .min(1)
      .max(5)
      .describe("Projected fitment factor (e.g. 2.28, 2.57, 2.86)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const result = compareSalary(input);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
