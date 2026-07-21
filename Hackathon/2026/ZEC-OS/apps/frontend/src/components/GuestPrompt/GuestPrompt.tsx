'use client';

import { useEffect } from 'react';
import { useGuestPromptStore } from '@/store/guestPromptStore';
import { useAuthStore } from '@/store/authStore';

const AUTO_HIDE_MS = 7000;

export function GuestPrompt() {
  const { visible, message, hide } = useGuestPromptStore();
  const { logout } = useAuthStore();

  // Auto-dismiss
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(hide, AUTO_HIDE_MS);
    return () => clearTimeout(t);
  }, [visible, hide]);

  if (!visible) return null;

  const handleSignIn = () => {
    logout();
    window.location.reload();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 72,
        right: 20,
        zIndex: 99990,
        width: 300,
        background: '#1a0a00',
        border: '1px solid #f97316',
        boxShadow: '0 0 0 1px #7c2d12, 3px 3px 0 #7c2d12',
        fontFamily: 'monospace',
        fontSize: '12px',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: '#7c2d12',
          padding: '4px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f97316',
        }}
      >
        <span style={{ color: '#fed7aa', fontSize: '10px', letterSpacing: 0.5 }}>
          ⚠ Guest Session
        </span>
        <button
          onClick={hide}
          style={{
            background: 'none',
            border: 'none',
            color: '#9a3412',
            cursor: 'pointer',
            fontSize: '13px',
            lineHeight: 1,
            padding: '0 2px',
          }}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px' }}>
        <p style={{ color: '#fdba74', marginBottom: 10, lineHeight: 1.5 }}>
          {message}
        </p>
        <p style={{ color: '#9a3412', fontSize: '11px', marginBottom: 12 }}>
          Sign in with your Zcash address to enable persistence across sessions.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleSignIn}
            style={{
              flex: 1,
              background: '#7c2d12',
              border: '1px solid #f97316',
              color: '#fed7aa',
              fontFamily: 'monospace',
              fontSize: '11px',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
          >
            Sign In / Create Account
          </button>
          <button
            onClick={hide}
            style={{
              background: 'transparent',
              border: '1px solid #4a1500',
              color: '#9a3412',
              fontFamily: 'monospace',
              fontSize: '11px',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
