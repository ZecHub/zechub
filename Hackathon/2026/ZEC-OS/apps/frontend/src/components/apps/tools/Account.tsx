'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useWindowStore } from '@/store/windowStore';
import { useExplorerStore } from '@/store/explorerStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { AppLoader } from '@/components/ui/AppLoader';

interface Profile {
  address: string;
  displayName: string | null;
  isVerified: boolean;
  createdAt?: string;
  hasPassword?: boolean;
}

export default function Account() {
  const { sessionToken, isGuest, isVerified } = useAuthStore();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState('');

  const [name, setName] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [nameStatus, setNameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [savingPw, setSavingPw] = useState(false);

  const authed = Boolean(sessionToken && isVerified && !isGuest);

  const loadProfile = useCallback(async () => {
    setLoading(true); setLoadErr('');
    try {
      const res = await fetch('/api/user/profile', { headers: { Authorization: `Bearer ${sessionToken}` } });
      const data = await res.json();
      if (!res.ok) { setLoadErr(data.error ?? `HTTP ${res.status}`); return; }
      setProfile(data);
      setName(data.displayName ?? '');
    } catch {
      setLoadErr('Backend unreachable');
    } finally {
      setLoading(false);
    }
  }, [sessionToken]);

  useEffect(() => {
    if (authed) loadProfile();
    else setLoading(false);
  }, [authed, loadProfile]);

  // Live availability while renaming (own current name counts as available)
  useEffect(() => {
    const n = name.trim();
    if (!n || !profile || n === (profile.displayName ?? '')) { setNameStatus('idle'); return; }
    setNameStatus('checking');
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/name-check?name=${encodeURIComponent(n)}&address=${encodeURIComponent(profile.address)}`);
        const data = await res.json();
        setNameStatus(data.available ? 'available' : 'taken');
      } catch { setNameStatus('idle'); }
    }, 400);
    return () => clearTimeout(t);
  }, [name, profile]);

  const saveName = async () => {
    if (nameStatus === 'taken') { setNameMsg('That name is taken'); return; }
    setSavingName(true); setNameMsg('');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` },
        body: JSON.stringify({ displayName: name.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) { setNameMsg(data.error ?? 'Save failed'); return; }
      setProfile(p => (p ? { ...p, displayName: data.displayName } : p));
      useAuthStore.setState({ displayName: data.displayName });
      setNameMsg('Saved ✓');
      setTimeout(() => setNameMsg(''), 2000);
    } catch {
      setNameMsg('Backend unreachable');
    } finally {
      setSavingName(false);
    }
  };

  const savePassword = async () => {
    setPwMsg(null);
    if (newPw.length < 8) { setPwMsg({ text: 'Password must be at least 8 characters', ok: false }); return; }
    if (newPw !== confirmPw) { setPwMsg({ text: 'Passwords do not match', ok: false }); return; }
    setSavingPw(true);
    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` },
        body: JSON.stringify({
          newPassword: newPw,
          ...(profile?.hasPassword ? { currentPassword: currentPw } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setPwMsg({ text: data.error ?? 'Failed to save password', ok: false }); return; }
      setPwMsg({ text: profile?.hasPassword ? 'Password changed ✓' : 'Password set ✓ — you can now sign in from any device', ok: true });
      setProfile(p => (p ? { ...p, hasPassword: true } : p));
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch {
      setPwMsg({ text: 'Backend unreachable', ok: false });
    } finally {
      setSavingPw(false);
    }
  };

  const openInExplorer = (addr: string) => {
    const { windows, openWindow } = useWindowStore.getState();
    const { queueSearch } = useExplorerStore.getState();
    const pos = calculateWindowPosition(windows, { width: 700, height: 600 }, window.innerWidth, window.innerHeight);
    const id = `explorer-${Date.now()}`;
    openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size: { width: 700, height: 600 }, minSize: { width: 500, height: 400 } });
    queueSearch(id, addr, 'auto');
  };

  if (!authed) {
    return (
      <div className="flex flex-col h-full bg-[var(--bg-window)] p-6 font-mono text-sm items-center justify-center text-center gap-3">
        <div className="text-[var(--text-primary)]">No account on this session.</div>
        <div className="text-[var(--text-muted)] text-xs leading-relaxed max-w-sm">
          {isGuest
            ? 'You are browsing as a guest. Log out and verify ownership of your Zcash address to create an account with a profile, password, and cross-device sync.'
            : 'Verify ownership of your Zcash address at login to create an account.'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-window)] p-4 gap-4 font-mono text-sm overflow-y-auto">
      {loading && <div className="py-8"><AppLoader /></div>}
      {loadErr && !loading && (
        <div className="text-[var(--accent-orange)] border border-[var(--accent-orange)]/30 p-3">{loadErr}</div>
      )}

      {profile && !loading && (
        <>
          {/* Identity */}
          <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-inset)]">
            <div className="text-[var(--text-muted)] text-xs mb-2">VERIFIED ADDRESS</div>
            <button
              onClick={() => openInExplorer(profile.address)}
              title="Open in Explorer"
              className="text-[var(--accent-gold)] text-xs break-all text-left hover:underline cursor-pointer bg-transparent border-0 p-0 font-mono"
            >
              {profile.address}
            </button>
            <div className="flex gap-4 mt-3 text-xs">
              <span className="text-[var(--accent-green)]">● ownership verified</span>
              {profile.createdAt && (
                <span className="text-[var(--text-muted)]">
                  member since {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Profile */}
          <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-inset)]">
            <div className="text-[var(--text-muted)] text-xs mb-2">DISPLAY NAME</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                placeholder="anonymous"
                className="flex-1 bg-[var(--bg-window)] border border-[var(--border-window)] text-[var(--text-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-gold)]"
              />
              <button
                onClick={saveName}
                disabled={savingName || nameStatus === 'taken' || nameStatus === 'checking'}
                className="btn-window px-4 py-2 text-[var(--accent-gold)] disabled:opacity-50"
              >
                {savingName ? '…' : 'Save'}
              </button>
            </div>
            {nameStatus !== 'idle' && (
              <div className={`text-xs mt-2 ${nameStatus === 'taken' ? 'text-[var(--accent-orange)]' : nameStatus === 'available' ? 'text-[var(--accent-green)]' : 'text-[var(--text-muted)]'}`}>
                {nameStatus === 'checking' ? 'checking…' : nameStatus === 'taken' ? '✗ name taken' : '✓ available'}
              </div>
            )}
            {nameMsg && <div className={`text-xs mt-2 ${nameMsg.includes('taken') ? 'text-[var(--accent-orange)]' : 'text-[var(--accent-green)]'}`}>{nameMsg}</div>}
          </div>

          {/* Password */}
          <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-inset)]">
            <div className="text-[var(--text-muted)] text-xs mb-1">
              {profile.hasPassword ? 'CHANGE PASSWORD' : 'CREATE PASSWORD'}
            </div>
            <div className="text-[var(--text-muted)] text-xs mb-3 leading-relaxed">
              {profile.hasPassword
                ? 'Your password lets you sign in from any device without re-verifying ownership.'
                : 'Set a password to sign in from any device without repeating payment verification. Stored as a one-way hash — nobody, including the admin, can read it.'}
            </div>
            <div className="flex flex-col gap-2 max-w-sm">
              {profile.hasPassword && (
                <input
                  type="password" placeholder="current password"
                  value={currentPw} onChange={e => { setCurrentPw(e.target.value); setPwMsg(null); }}
                  autoComplete="current-password"
                  className="bg-[var(--bg-window)] border border-[var(--border-window)] text-[var(--text-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-gold)]"
                />
              )}
              <input
                type="password" placeholder="new password (min 8 chars)"
                value={newPw} onChange={e => { setNewPw(e.target.value); setPwMsg(null); }}
                autoComplete="new-password"
                className="bg-[var(--bg-window)] border border-[var(--border-window)] text-[var(--text-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-gold)]"
              />
              <input
                type="password" placeholder="confirm new password"
                value={confirmPw} onChange={e => { setConfirmPw(e.target.value); setPwMsg(null); }}
                onKeyDown={e => e.key === 'Enter' && savePassword()}
                autoComplete="new-password"
                className="bg-[var(--bg-window)] border border-[var(--border-window)] text-[var(--text-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-gold)]"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={savePassword}
                  disabled={savingPw}
                  className="btn-window px-4 py-2 text-[var(--accent-gold)] disabled:opacity-50 w-fit"
                >
                  {savingPw ? '…' : profile.hasPassword ? 'Change password' : 'Set password'}
                </button>
                {pwMsg && (
                  <span className={`text-xs ${pwMsg.ok ? 'text-[var(--accent-green)]' : 'text-[var(--accent-orange)]'}`}>
                    {pwMsg.text}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Session */}
          <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-inset)] flex items-center justify-between">
            <span className="text-[var(--text-muted)] text-xs">End this session on this device.</span>
            <button
              onClick={() => { useAuthStore.getState().logout(); window.location.reload(); }}
              className="px-4 py-2 border border-[var(--accent-orange)] text-[var(--accent-orange)] hover:bg-[var(--accent-orange)]/15 transition-colors"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
