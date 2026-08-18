import { useCallback, useEffect, useState } from "react";
import { Bell, BellRing, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { getPushPublicKey, savePushSubscription } from "@/lib/push.functions";

const DISMISS_KEY = "cpc-push-dismissed";
const DONE_KEY = "cpc-push-subscribed";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) output[i] = raw.charCodeAt(i);
  return output;
}

function bufferToBase64Url(buffer: ArrayBuffer | null) {
  if (!buffer) return "";
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function PushPrompt() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "blocked" | "error">("idle");
  const save = useServerFn(savePushSubscription);
  const fetchKey = useServerFn(getPushPublicKey);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    if (window.self !== window.top) return; // never prompt inside the editor preview iframe
    if (localStorage.getItem(DONE_KEY) === "1") return;
    if (Notification.permission === "denied") return;

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    // Re-ask a week after a "Don't allow".
    if (dismissedAt && Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return;

    const timer = window.setTimeout(() => setVisible(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  }, []);

  const allow = useCallback(async () => {
    setStatus("working");
    try {
      const { publicKey } = await fetchKey();
      if (!publicKey) {
        setStatus("error");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
        setStatus("blocked");
        window.setTimeout(() => setVisible(false), 2500);
        return;
      }

      const registration = await navigator.serviceWorker.register("/push-sw.js", { scope: "/" });
      await navigator.serviceWorker.ready;

      const existing = await registration.pushManager.getSubscription();
      const subscription =
        existing ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        }));

      const result = await save({
        data: {
          endpoint: subscription.endpoint,
          p256dh: bufferToBase64Url(subscription.getKey("p256dh")),
          auth: bufferToBase64Url(subscription.getKey("auth")),
          lang: window.location.pathname.includes("hindi") ? "hi" : "en",
          userAgent: navigator.userAgent.slice(0, 400),
        },
      });

      if (!result.ok) {
        setStatus("error");
        return;
      }

      localStorage.setItem(DONE_KEY, "1");
      setStatus("done");
      await registration.showNotification("Notifications on ✅", {
        body: "We'll alert you on every 8th Pay Commission update.",
        icon: "/favicon.ico",
      });
      window.setTimeout(() => setVisible(false), 2600);
    } catch (err) {
      console.error("push subscribe failed", err);
      setStatus("error");
    }
  }, [fetchKey, save]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-[60] md:bottom-6 md:left-auto md:right-6 md:w-[380px]">
      <div className="relative rounded-md border border-border bg-card p-4 shadow-lg">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close notification prompt"
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            {status === "done" ? (
              <BellRing className="h-5 w-5" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 pr-4">
            <h2 className="text-sm font-bold leading-tight">
              Stay Updated with Latest News about 8th Pay Commission
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Get instant alerts on fitment factor decisions, DA hikes, pension revision and arrear
              news. No spam — you can turn it off anytime.
            </p>

            {status === "blocked" && (
              <p className="mt-2 text-xs text-destructive">
                Notifications are blocked in your browser settings.
              </p>
            )}
            {status === "error" && (
              <p className="mt-2 text-xs text-destructive">
                Couldn't enable notifications. Please try again later.
              </p>
            )}
            {status === "done" && (
              <p className="mt-2 text-xs text-success">You're subscribed to 8th CPC alerts.</p>
            )}
          </div>
        </div>

        {status !== "done" && (
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={dismiss} className="rounded-md">
              Don't allow
            </Button>
            <Button size="sm" onClick={allow} disabled={status === "working"} className="rounded-md">
              {status === "working" ? "Enabling…" : "Allow"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
