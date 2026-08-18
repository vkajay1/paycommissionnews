/* 8th CPC Calculator — push notification service worker.
   This worker ONLY handles web push. It does not cache the app shell
   and does not intercept fetch/navigation requests. */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = { title: "8th Pay Commission Update", body: event.data ? event.data.text() : "" };
  }

  const title = payload.title || "8th Pay Commission Update";
  const options = {
    body: payload.body || "Tap to read the latest 8th CPC news.",
    icon: payload.icon || "/favicon.ico",
    badge: "/favicon.ico",
    image: payload.image || undefined,
    tag: payload.tag || "8cpc-news",
    renotify: true,
    data: { url: payload.url || "/blog" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/blog";
  event.waitUntil(
    (async () => {
      const clientList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of clientList) {
        if ("focus" in client) {
          await client.focus();
          if ("navigate" in client) {
            try {
              await client.navigate(target);
            } catch (e) {
              /* ignore */
            }
          }
          return;
        }
      }
      await self.clients.openWindow(target);
    })(),
  );
});
