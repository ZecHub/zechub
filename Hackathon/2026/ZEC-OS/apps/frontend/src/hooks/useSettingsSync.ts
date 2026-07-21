'use client';

import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';

export function useSettingsSync() {
  const { sessionToken, isGuest } = useAuthStore();
  const settings = useSettingsStore(useShallow((s) => ({
    dateFormat: s.dateFormat,
    timeFormat: s.timeFormat,
    fontSize: s.fontSize,
    soundEnabled: s.soundEnabled,
    volume: s.volume,
    retroIcons: s.retroIcons,
  })));
  const setAll = useSettingsStore((s) => s.setAll);
  const initialized = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!sessionToken || isGuest || initialized.current) return;
    initialized.current = true;
    fetch('/api/user/settings', {
      headers: { Authorization: `Bearer ${sessionToken}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data && Object.keys(data).length > 0) setAll(data); })
      .catch(() => {});
  }, [sessionToken, isGuest, setAll]);

  useEffect(() => {
    if (!sessionToken || isGuest || !initialized.current) return;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` },
        body: JSON.stringify(settings),
      }).catch(() => {});
    }, 1500);
    return () => { if (pushTimer.current) clearTimeout(pushTimer.current); };
  }, [settings, sessionToken, isGuest]);
}
