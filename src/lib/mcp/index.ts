import { defineMcp } from "@lovable.dev/mcp-js";
import calculateSalary from "./tools/calculate-salary";
import fitmentScenarios from "./tools/fitment-scenarios";
import listArticles from "./tools/list-articles";

export default defineMcp({
  name: "8th-cpc-calculator-mcp",
  title: "8th CPC Calculator MCP",
  version: "0.1.0",
  instructions:
    "Tools for estimating 8th Pay Commission salaries for Indian Central Government employees. Use `calculate_salary` for a single scenario, `fitment_scenarios` to compare across common fitment factors, and `list_articles` to browse blog content.",
  tools: [calculateSalary, fitmentScenarios, listArticles],
});
