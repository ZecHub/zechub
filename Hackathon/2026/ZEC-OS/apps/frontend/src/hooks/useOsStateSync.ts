'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useWindowStore, WindowState } from '@/store/windowStore';

interface AppEntry {
  type: string;
  title: string;
  minSize?: { width: number; height: number };
}

interface SavedWindow {
  id: string;
  type: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export function useOsStateSync(appRegistry: AppEntry[]) {
  const { sessionToken, isGuest } = useAuthStore();
  const windows = useWindowStore((s) => s.windows);
  const initialized = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!sessionToken || isGuest || initialized.current) return;
    initialized.current = true;

    fetch('/api/user/state', {
      headers: { Authorization: `Bearer ${sessionToken}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!Array.isArray(data?.windows)) return;
        const { openWindow } = useWindowStore.getState();
        (data.windows as SavedWindow[]).forEach((w) => {
          const app = appRegistry.find((a) => a.type === w.type);
          if (!app) return;
          openWindow({ id: w.id, type: w.type, title: app.title, position: w.position, size: w.size, minSize: app.minSize });
        });
      })
      .catch(() => {});
  }, [sessionToken, isGuest, appRegistry]);

  useEffect(() => {
    if (!sessionToken || isGuest || !initialized.current) return;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      const saved = windows.map((w: WindowState) => ({
        id: w.id, type: w.type, title: w.title, position: w.position, size: w.size,
      }));
      fetch('/api/user/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` },
        body: JSON.stringify({ windows: saved }),
      }).catch(() => {});
    }, 3000);
    return () => { if (pushTimer.current) clearTimeout(pushTimer.current); };
  }, [windows, sessionToken, isGuest]);
}
