import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { broadcastPushNotification, getPushStats } from "@/lib/push.functions";

export const Route = createFileRoute("/push-admin")({
  head: () => ({
    meta: [
      { title: "Push Notification Console — 8th CPC Calculator" },
      {
        name: "description",
        content:
          "Internal console to send 8th Pay Commission news push notifications to subscribed readers.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Push Notification Console" },
      { property: "og:description", content: "Send 8th CPC news alerts to subscribers." },
      { name: "og:description", content: "Send 8th CPC news alerts to subscribers." },
    ],
  }),
  component: PushAdmin,
});

function PushAdmin() {
  const send = useServerFn(broadcastPushNotification);
  const stats = useServerFn(getPushStats);

  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("/blog");
  const [image, setImage] = useState("");
  const [lang, setLang] = useState<"all" | "en" | "hi">("all");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function checkSubscribers() {
    setBusy(true);
    setMessage(null);
    const res = await stats({ data: { password } });
    setMessage(res.ok ? `${res.subscribers} active subscribers.` : res.error);
    setBusy(false);
  }

  async function broadcast() {
    setBusy(true);
    setMessage(null);
    const res = await send({
      data: {
        password,
        title,
        body,
        url: url || undefined,
        image: image || undefined,
        lang,
      },
    });
    setMessage(
      res.ok
        ? `Sent to ${res.sent} of ${res.total} subscribers (${res.failed} failed).`
        : res.error,
    );
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold">Push notification console</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Send an 8th Pay Commission news alert to every reader who tapped “Allow”.
      </p>

      <div className="mt-6 space-y-4 rounded-md border border-border bg-card p-5">
        <div>
          <Label htmlFor="pw">Admin password</Label>
          <Input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="title">Notification title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="8th Pay Commission: fitment factor update"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="body">Message</Label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Government notifies new panel meeting — see what it means for your salary."
            className="mt-1.5"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="url">Open link</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="/blog/article-slug"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="lang">Audience</Label>
            <select
              id="lang"
              value={lang}
              onChange={(e) => setLang(e.target.value as "all" | "en" | "hi")}
              className="mt-1.5 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All subscribers</option>
              <option value="en">English readers</option>
              <option value="hi">Hindi readers</option>
            </select>
          </div>
        </div>
        <div>
          <Label htmlFor="image">Image URL (optional)</Label>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://paycommissionnews.co.in/images/..."
            className="mt-1.5"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button onClick={broadcast} disabled={busy || !password || !title || !body}>
            <Send className="mr-1.5 h-4 w-4" /> Send notification
          </Button>
          <Button variant="outline" onClick={checkSubscribers} disabled={busy || !password}>
            Check subscribers
          </Button>
        </div>

        {message && <p className="text-sm font-medium text-foreground">{message}</p>}
      </div>
    </div>
  );
}
