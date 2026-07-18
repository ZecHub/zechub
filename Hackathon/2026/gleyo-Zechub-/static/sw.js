self.addEventListener("push", event => {
  if (!event.data) return;
  console.log("📩 PUSH RECEIVED:", event);

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: {
        url: data.url,
        type: data.type
      },
      icon: "https://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/communities/7/logos/511f4996-5748-4f1f-b74c-5d5c33f7124c.png"
    })
  );
});https://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/communities/7/logos/511f4996-5748-4f1f-b74c-5d5c33f7124c.png



self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url = event.notification?.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(url);
      })
  );
});


self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
