import process from "node:process";
import { buildPushPayload } from "@block65/webcrypto-web-push";

export type StoredSubscription = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  lang: string;
};

export type PushContent = {
  title: string;
  body: string;
  url?: string;
  image?: string;
};

export function getVapid() {
  const publicKey = process.env["VAPID_PUBLIC_KEY"];
  const privateKey = process.env["VAPID_PRIVATE_KEY"];
  const subject = process.env["VAPID_SUBJECT"] ?? "mailto:editor@paycommissionnews.co.in";
  if (!publicKey || !privateKey) throw new Error("Push keys are not configured");
  return { publicKey, privateKey, subject };
}

export function assertAdminPassword(password: string) {
  const expected = process.env["PUSH_ADMIN_PASSWORD"];
  if (!expected) throw new Error("Admin password is not configured");
  if (password !== expected) throw new Error("Invalid admin password");
}

/** Sends one web-push message. Returns the HTTP status from the push service. */
export async function sendToSubscription(
  sub: StoredSubscription,
  content: PushContent,
): Promise<number> {
  const vapid = getVapid();
  const payload = await buildPushPayload(
    { data: JSON.stringify(content), options: { ttl: 60 * 60 * 12, urgency: "normal" } },
    {
      endpoint: sub.endpoint,
      expirationTime: null,
      keys: { p256dh: sub.p256dh, auth: sub.auth },
    },
    vapid,
  );

  const res = await fetch(sub.endpoint, payload);
  return res.status;
}
