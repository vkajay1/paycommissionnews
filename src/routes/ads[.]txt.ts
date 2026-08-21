import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const ADS_TXT = `google.com, pub-3146184997876133, DIRECT, f08c47fec0942fa0`;

export const Route = createFileRoute("/ads.txt")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(ADS_TXT, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
