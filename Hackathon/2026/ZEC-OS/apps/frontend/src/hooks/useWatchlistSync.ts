'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useWatchlistStore } from '@/store/watchlistStore';

export function useWatchlistSync() {
  const { sessionToken, isGuest } = useAuthStore();
  const addresses = useWatchlistStore((s) => s.addresses);
  const setAddresses = useWatchlistStore((s) => s.setAddresses);
  const initialized = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from backend once when session token is available
  useEffect(() => {
    if (!sessionToken || isGuest || initialized.current) return;
    initialized.current = true;

    fetch('/api/user/watchlist', {
      headers: { Authorization: `Bearer ${sessionToken}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.addresses)) {
          setAddresses(data.addresses);
        }
      })
      .catch(() => {});
  }, [sessionToken, isGuest, setAddresses]);

  // Debounced push to backend on any local change
  useEffect(() => {
    if (!sessionToken || isGuest || !initialized.current) return;

    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      fetch('/api/user/watchlist', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ addresses }),
      }).catch(() => {});
    }, 1500);

    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, [addresses, sessionToken, isGuest]);
}
