import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { articles } from "@/lib/articles";

export default defineTool({
  name: "list_articles",
  title: "List blog articles",
  description: "List all published blog articles on the 8th Pay Commission site with slug, title, and excerpt.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      url: `/blog/${a.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { articles: items },
    };
  },
});

export const _z = z;
