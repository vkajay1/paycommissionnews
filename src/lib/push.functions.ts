import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const subscriptionSchema = z.object({
  endpoint: z.string().url().max(1000),
  p256dh: z.string().min(10).max(500),
  auth: z.string().min(4).max(500),
  lang: z.enum(["en", "hi"]).default("en"),
  userAgent: z.string().max(400).optional(),
});

/** Public VAPID key the browser needs to create a push subscription. */
export const getPushPublicKey = createServerFn({ method: "GET" }).handler(async () => {
  const { getVapid } = await import("./push.server");
  try {
    return { publicKey: getVapid().publicKey };
  } catch {
    return { publicKey: null as string | null };
  }
});

export const savePushSubscription = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => subscriptionSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("push_subscriptions").upsert(
      {
        endpoint: data.endpoint,
        p256dh: data.p256dh,
        auth: data.auth,
        lang: data.lang,
        user_agent: data.userAgent ?? null,
        active: true,
      },
      { onConflict: "endpoint" },
    );
    if (error) {
      console.error("savePushSubscription", error);
      return { ok: false as const, error: "Could not save your subscription" };
    }
    return { ok: true as const };
  });

export const removePushSubscription = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ endpoint: z.string().url() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("push_subscriptions")
      .update({ active: false })
      .eq("endpoint", data.endpoint);
    return { ok: true as const };
  });

export const getPushStats = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const { assertAdminPassword } = await import("./push.server");
    try {
      assertAdminPassword(data.password);
    } catch {
      return { ok: false as const, error: "Invalid admin password" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("push_subscriptions")
      .select("id", { count: "exact", head: true })
      .eq("active", true);
    return { ok: true as const, subscribers: count ?? 0 };
  });

export const broadcastPushNotification = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        password: z.string().min(1),
        title: z.string().min(3).max(120),
        body: z.string().min(3).max(300),
        url: z.string().max(500).optional(),
        image: z.string().url().max(700).optional(),
        lang: z.enum(["all", "en", "hi"]).default("all"),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { assertAdminPassword, sendToSubscription } = await import("./push.server");
    try {
      assertAdminPassword(data.password);
    } catch {
      return { ok: false as const, error: "Invalid admin password" };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let query = supabaseAdmin
      .from("push_subscriptions")
      .select("id,endpoint,p256dh,auth,lang")
      .eq("active", true);
    if (data.lang !== "all") query = query.eq("lang", data.lang);

    const { data: subs, error } = await query;
    if (error) {
      console.error("broadcastPushNotification", error);
      return { ok: false as const, error: "Could not load subscribers" };
    }

    const content = {
      title: data.title,
      body: data.body,
      url: data.url || "/blog",
      image: data.image,
    };

    let sent = 0;
    let failed = 0;
    const expired: string[] = [];

    for (const sub of subs ?? []) {
      try {
        const status = await sendToSubscription(sub, content);
        if (status === 404 || status === 410) {
          expired.push(sub.endpoint);
          failed += 1;
        } else if (status >= 200 && status < 300) {
          sent += 1;
        } else {
          failed += 1;
        }
      } catch (err) {
        console.error("push send failed", err);
        failed += 1;
      }
    }

    if (expired.length) {
      await supabaseAdmin
        .from("push_subscriptions")
        .update({ active: false })
        .in("endpoint", expired);
    }

    return { ok: true as const, sent, failed, total: subs?.length ?? 0 };
  });
