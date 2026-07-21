'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

// Single-session enforcement, client side. Polls session liveness; if a newer
// login elsewhere superseded this session, log out locally and tell the user.
// Also surfaces the "we ended N other session(s)" note to a fresh login.

const REASON_MSG: Record<string, string> = {
  signed_in_elsewhere: 'You were signed out — your account just logged in from another browser or device. Only one session can be active at a time.',
  expired: 'Your session expired. Please sign in again.',
  unknown: 'Your session is no longer valid. Please sign in again.',
  revoked: 'Your session was ended. Please sign in again.',
};

export function SessionGuard() {
  const { sessionToken, logout } = useAuthStore();
  const [msg, setMsg] = useState<string | null>(null);

  // Fresh-login note: "ended N other session(s)".
  useEffect(() => {
    if (!sessionToken) return;
    try {
      const n = sessionStorage.getItem('zec-signedout-others');
      if (n && parseInt(n) > 0) {
        setMsg(`Heads up: signing in here ended ${n} other active session${parseInt(n) === 1 ? '' : 's'} for your account.`);
        setTimeout(() => setMsg((m) => (m && m.startsWith('Heads up') ? null : m)), 8000);
      }
      sessionStorage.removeItem('zec-signedout-others');
    } catch { /* ignore */ }
  }, [sessionToken]);

  // Liveness poll.
  useEffect(() => {
    if (!sessionToken) return;
    let alive = true;
    const check = async () => {
      try {
        const res = await fetch('/api/auth/session', { headers: { Authorization: `Bearer ${sessionToken}` } });
        const data = await res.json();
        if (!alive) return;
        if (data && data.valid === false) {
          setMsg(REASON_MSG[data.reason as string] ?? REASON_MSG.unknown);
          logout();
        }
      } catch { /* transient — try again next tick */ }
    };
    check();
    const iv = setInterval(check, 25_000);
    return () => { alive = false; clearInterval(iv); };
  }, [sessionToken, logout]);

  if (!msg) return null;
  return (
    <div style={{ position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 100000, maxWidth: '440px', background: '#160000', border: '2px solid #FF5555', color: '#FFD9D9', padding: '10px 14px', fontFamily: 'monospace', fontSize: '13px', boxShadow: '0 4px 24px rgba(0,0,0,0.6)', borderRadius: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
        <span>⚠ {msg}</span>
        <button onClick={() => setMsg(null)} style={{ color: '#FF5555', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: '15px', lineHeight: 1 }}>✕</button>
      </div>
    </div>
  );
}
