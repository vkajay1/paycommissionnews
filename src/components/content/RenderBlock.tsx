import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Block } from "@/lib/articles";

export function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.cite ? (
            <cite className="block text-sm not-italic opacity-70">— {block.cite}</cite>
          ) : null}
        </blockquote>
      );
    case "callout": {
      const Icon =
        block.tone === "info" ? Info : block.tone === "warn" ? AlertTriangle : CheckCircle2;
      const toneClass =
        block.tone === "info"
          ? "border-primary/30 bg-primary/5"
          : block.tone === "warn"
            ? "border-amber-500/30 bg-amber-500/5"
            : "border-emerald-500/30 bg-emerald-500/5";
      return (
        <div className={`not-prose my-6 rounded-lg border p-5 ${toneClass}`}>
          <div className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <div className="text-sm font-semibold">{block.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }
    case "table":
      return (
        <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-secondary/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? (
            <div className="border-t border-border bg-secondary/30 px-4 py-2 text-xs text-muted-foreground">
              {block.caption}
            </div>
          ) : null}
        </div>
      );
    default:
      return null;
  }
}
