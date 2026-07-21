"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const INTERVAL_MS = 5 * 60_000;
const STORAGE_KEY = "zbooks.lastBgSyncAt";

// Pings /api/keys/sync-all every 5min. Per-tab timer with a localStorage
// clamp so multiple tabs don't double-fire. Skips when hidden / signed-out / on /.
export function BackgroundSync() {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (pathname === "/") return;

    const tick = async () => {
      if (typeof document === "undefined" || document.visibilityState !== "visible") return;
      try {
        const last = Number(localStorage.getItem(STORAGE_KEY) ?? "0");
        if (Date.now() - last < INTERVAL_MS - 5_000) return;
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch { /* private mode — tick without dedup */ }
      try {
        const res = await fetch("/api/keys/sync-all", { method: "POST" });
        if (res.ok) router.refresh();
      } catch { /* network blip — retry next interval */ }
    };

    const initial = setTimeout(tick, 30_000);
    timerRef.current = setInterval(tick, INTERVAL_MS);
    return () => {
      clearTimeout(initial);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, pathname, router]);

  return null;
}
