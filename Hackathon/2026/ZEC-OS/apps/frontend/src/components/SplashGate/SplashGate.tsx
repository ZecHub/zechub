'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import UaDecoder from '@/components/apps/tools/UaDecoder';
import { ZecQr } from '@/components/ui/ZecQr';

const BOOT_DURATION_MS = 3000;
const STORAGE_KEY = 'zec-os-last-boot';
const VERSION = process.env.NEXT_PUBLIC_VERSION ?? '1.1.2';

const ZEC_ADDR_RE = /^(t1|t3|u1|zs1)[a-zA-Z0-9]{30,}/;
function isValidAddr(a: string) { return ZEC_ADDR_RE.test(a.trim()); }

const C = {
  black:  '#000000',
  dkgray: '#888888',
  gray:   '#CCCCCC',
  white:  '#FFFFFF',
  yellow: '#FFFF55',
  cyan:   '#55FFFF',
  green:  '#55FF55',
  red:    '#FF5555',
  dkblue: '#0000AA',
  dkcyan: '#00AAAA',
};

type Phase = 'check' | 'auth' | 'welcome-back' | 'verify' | 'set-password' | 'booting' | 'done';
type PollStatus = 'waiting' | 'code_sent' | 'confirmed' | 'expired' | 'rejected';

interface Challenge {
  nonce: string;
  valueZEC: string;
  zip321: string;
  toAddress: string;
  expiresAt: number;
  kind: 'taddr' | 'shielded';
  memoText?: string;
}

export function SplashGate({ children }: { children: React.ReactNode }) {
  const auth = useAuthStore();
  const [phase, setPhase]       = useState<Phase>('check');
  const [address, setAddress]   = useState('');
  const [dispName, setDispName] = useState('');
  const [addrErr, setAddrErr]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState(0);

  const [showDecoder, setShowDecoder] = useState(false);
  const [challenge, setChallenge]   = useState<Challenge | null>(null);
  const [pollStatus, setPollStatus] = useState<PollStatus>('waiting');
  const [pollErr, setPollErr]       = useState('');
  const [codeInput, setCodeInput]   = useState('');
  const [codeErr, setCodeErr]       = useState('');
  const [walletMsg, setWalletMsg]   = useState('');
  const [loginPw, setLoginPw]       = useState('');
  const [newPw, setNewPw]           = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [pwErr, setPwErr]           = useState('');
  const [showZodlInfo, setShowZodlInfo] = useState(false);
  const [showBigQr, setShowBigQr] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [nameStatus, setNameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [, setTick] = useState(0); // re-render for the expiry countdown
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const startBoot = useCallback(() => {
    setProgress(0);
    setPhase('booting');
  }, []);

  const finishBoot = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setPhase('done');
  }, []);

  // Determine initial phase after hydration.
  // Key rule: a RELOAD must REUSE the persisted session, never mint a new one.
  // Minting a new session on reload would revoke the user's own prior (still
  // live) session and falsely report "signed you out elsewhere". So for verified
  // users we validate the existing token server-side and only force a re-login
  // if it's genuinely dead (expired past the 24h timeout, or revoked).
  useEffect(() => {
    let cancelled = false;
    const decide = async () => {
      // Read FRESH state (not the first-render closure) so we're never fooled by
      // a persist-hydration race that would look "unauthenticated" and force login.
      const a = useAuthStore.getState();
      if (!a.isAuthenticated) { if (!cancelled) setPhase('auth'); return; }
      // Purge legacy "local profile" identities — verified or guest only.
      if (!a.isVerified && !a.isGuest) { a.logout(); if (!cancelled) setPhase('auth'); return; }
      // Guests have no server session — nothing to validate.
      if (a.isGuest || !a.sessionToken) { if (!cancelled) setPhase('done'); return; }
      // Verified: reuse the token if the server still considers it valid.
      try {
        const res = await fetch('/api/auth/session', { headers: { Authorization: `Bearer ${a.sessionToken}` } });
        const data = await res.json().catch(() => ({ valid: false }));
        if (cancelled) return;
        if (data?.valid) {
          setPhase('done');            // reuse existing session — no new login, no revoke
        } else {
          a.logout();                  // expired/revoked → clean re-login (old session already dead, so no false notice)
          setPhase('auth');
        }
      } catch {
        if (!cancelled) setPhase('done'); // backend unreachable — trust the local session rather than forcing a login
      }
    };
    // Wait for the persisted store to finish rehydrating before deciding.
    const p = (useAuthStore as unknown as {
      persist?: { hasHydrated?: () => boolean; onFinishHydration?: (cb: () => void) => (() => void) };
    }).persist;
    if (!p || typeof p.hasHydrated !== 'function' || p.hasHydrated() || typeof p.onFinishHydration !== 'function') {
      decide();
      return () => { cancelled = true; };
    }
    const unsub = p.onFinishHydration(() => decide());
    return () => { cancelled = true; unsub?.(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boot progress animation
  useEffect(() => {
    if (phase !== 'booting') return;
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 15, 95));
    }, 200);
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(finishBoot, 300);
    }, BOOT_DURATION_MS);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter') finishBoot(); };
    window.addEventListener('keydown', onKey);
    return () => { clearInterval(interval); clearTimeout(timeout); window.removeEventListener('keydown', onKey); };
  }, [phase, finishBoot]);

  // Live display-name availability — debounced as the user types
  useEffect(() => {
    const name = dispName.trim();
    if (!name) { setNameStatus('idle'); return; }
    setNameStatus('checking');
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/name-check?name=${encodeURIComponent(name)}&address=${encodeURIComponent(address.trim())}`);
        const data = await res.json();
        setNameStatus(data.available ? 'available' : 'taken');
      } catch { setNameStatus('idle'); }
    }, 400);
    return () => clearTimeout(t);
  }, [dispName, address]);

  // Keep the "expires in N min" countdown current while waiting on payment
  useEffect(() => {
    if (phase !== 'verify' || pollStatus !== 'waiting') return;
    const t = setInterval(() => setTick(n => n + 1), 15_000);
    return () => clearInterval(t);
  }, [phase, pollStatus]);

  // Poll verification status (t-addr payment / shielded funding)
  useEffect(() => {
    if (phase !== 'verify' || !challenge) return;
    if (pollStatus === 'confirmed' || pollStatus === 'expired' || pollStatus === 'rejected') return;

    pollRef.current = setInterval(async () => {
      if (Date.now() > challenge.expiresAt) { setPollStatus('expired'); clearInterval(pollRef.current!); return; }
      try {
        const res  = await fetch(`/api/auth/verify/${challenge.nonce}`);
        const data = await res.json();
        if (res.status === 409) {
          // t-addr: payment arrived but from the wrong address
          clearInterval(pollRef.current!);
          setPollErr(data.error ?? 'Payment came from a different address.');
          setPollStatus('rejected');
          return;
        }
        if (data.verified) {
          clearInterval(pollRef.current!);
          setPollStatus('confirmed');
          try { if (data.signedOutOthers) sessionStorage.setItem('zec-signedout-others', String(data.signedOutOthers)); } catch {}
          try { if (data.signedOutOthers) sessionStorage.setItem('zec-signedout-others', String(data.signedOutOthers)); } catch {}
        auth.setAuth({ walletAddress: address.trim(), displayName: dispName.trim() || null, sessionToken: data.sessionId, isVerified: true });
          setTimeout(() => setPhase('set-password'), 1200);
        } else if (data.status === 'code_sent') {
          setPollStatus('code_sent');
        }
      } catch { /* retry on next tick */ }
    }, 4000);
    return () => clearInterval(pollRef.current!);
  }, [phase, challenge, pollStatus, address, dispName, auth, startBoot]);

  if (phase === 'check') return null;
  if (phase === 'done')  return <>{children}</>;

  // Password login: verified accounts sign in with display name (or address) +
  // password — no need to retype the wallet address.
  const handleLogin = async () => {
    const addr = address.trim();
    const name = dispName.trim();
    if (!addr && !name) { setAddrErr('Enter your display name (or address) to sign in'); return; }
    if (addr && !isValidAddr(addr)) { setAddrErr('Enter a valid Zcash address (or leave it blank and use your display name)'); return; }
    if (!loginPw) { setAddrErr('Enter your password (or verify ownership if you have no account yet)'); return; }
    setAddrErr(''); setLoading(true);
    try {
      const res  = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address: addr || undefined, name: name || undefined, password: loginPw }) });
      const data = await res.json();
      if (res.ok && data.verified) {
        try { if (data.signedOutOthers) sessionStorage.setItem('zec-signedout-others', String(data.signedOutOthers)); } catch {}
        auth.setAuth({ walletAddress: data.address, displayName: data.displayName ?? (dispName.trim() || null), sessionToken: data.sessionId, isVerified: true });
        startBoot();
      } else {
        setAddrErr(data.error ?? 'Login failed');
      }
    } catch { setAddrErr('Backend unreachable'); }
    finally { setLoading(false); }
  };

  // Post-verification: offer a password so future logins skip the dust dance.
  const handleSetPassword = async (skip: boolean) => {
    if (skip) { startBoot(); return; }
    if (newPw.length < 8) { setPwErr('Password must be at least 8 characters'); return; }
    if (newPw !== newPwConfirm) { setPwErr('Passwords do not match'); return; }
    setPwErr(''); setLoading(true);
    try {
      const res  = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.sessionToken}` },
        body: JSON.stringify({ newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) startBoot();
      else setPwErr(data.error ?? 'Failed to set password');
    } catch { setPwErr('Backend unreachable'); }
    finally { setLoading(false); }
  };

  const handleStartChallenge = async () => {
    if (!isValidAddr(address)) { setAddrErr('Enter a valid Zcash address first'); return; }
    if (nameStatus === 'taken') { setAddrErr('That display name is taken — pick another before verifying'); return; }
    setAddrErr(''); setLoading(true);
    try {
      const res  = await fetch('/api/auth/challenge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address: address.trim(), displayName: dispName.trim() || null }) });
      const data = await res.json();
      if (res.ok) { setChallenge(data); setPhase('verify'); setPollStatus('waiting'); setPollErr(''); setCodeInput(''); setCodeErr(''); setWalletMsg(''); }
      else setAddrErr(data.error ?? 'Failed to create challenge');
    } catch { setAddrErr('Backend unreachable'); }
    finally { setLoading(false); }
  };

  const handleSubmitCode = async () => {
    if (!challenge || codeInput.trim().length !== 6) { setCodeErr('Enter the 6-digit code from the memo'); return; }
    setCodeErr(''); setLoading(true);
    try {
      const res  = await fetch('/api/auth/verify-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nonce: challenge.nonce, code: codeInput.trim() }) });
      const data = await res.json();
      if (res.ok && data.verified) {
        clearInterval(pollRef.current!);
        setPollStatus('confirmed');
        auth.setAuth({ walletAddress: address.trim(), displayName: dispName.trim() || null, sessionToken: data.sessionId, isVerified: true });
        setTimeout(() => setPhase('set-password'), 1200);
      } else {
        setCodeErr(data.error ?? 'Verification failed');
      }
    } catch { setCodeErr('Backend unreachable'); }
    finally { setLoading(false); }
  };

  // The browser exposes no API to detect a missing protocol handler — if the
  // launch succeeds the page loses focus, so no blur within the window means
  // no wallet is registered on this device.
  const tryOpenWallet = (uri: string) => {
    setWalletMsg('');
    let launched = false;
    const onBlur = () => { launched = true; };
    window.addEventListener('blur', onBlur);
    window.location.href = uri;
    setTimeout(() => {
      window.removeEventListener('blur', onBlur);
      if (!launched && !document.hidden) {
        setWalletMsg('No Zcash wallet is set up to handle payment links on this device. Scan the QR code with your phone wallet, or copy the fields manually.');
      }
    }, 1200);
  };

  const backToAuth = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setChallenge(null);
    setPhase('auth');
  };

  // ── Shared style helpers ────────────────────────────────────────────────────

  const input: React.CSSProperties = {
    background: '#000', border: `1px solid ${C.dkcyan}`, color: C.green,
    fontFamily: 'monospace', fontSize: '14px', padding: '5px 8px',
    width: '100%', outline: 'none', boxSizing: 'border-box',
  };

  const btn = (variant?: 'primary' | 'guest'): React.CSSProperties => ({
    background: variant === 'guest' ? C.dkblue : 'transparent',
    border: `1px solid ${variant === 'guest' ? C.cyan : C.yellow}`,
    color: variant === 'guest' ? C.white : C.yellow,
    fontFamily: 'monospace', fontSize: '14px', padding: '6px 14px', cursor: 'pointer',
  });

  const lbl: React.CSSProperties = { color: C.yellow, fontSize: '15px', marginBottom: 2, display: 'block' };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, fontFamily: 'monospace' }}>
      <div style={{ width: 540, border: `2px solid ${C.dkcyan}`, background: '#000', boxShadow: `0 0 0 1px ${C.dkblue}, 4px 4px 0 ${C.dkblue}` }}>

        {/* ── Brand header — always visible ──────────────────────────────── */}
        <div style={{ background: C.dkblue, padding: '12px 20px 14px', borderBottom: `1px solid ${C.dkcyan}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src="/zec-logo.svg"
              alt="ZEC"
              style={{ width: 52, height: 52, imageRendering: 'pixelated', flexShrink: 0 }}
            />
            <div>
              <div style={{ color: C.yellow, fontSize: '24px', fontFamily: 'var(--font-press-start, monospace)', letterSpacing: 1 }}>
                ZEC-OS
              </div>
              <div style={{ color: C.dkcyan, fontSize: '12px', marginTop: 3 }}>
                v{VERSION} · Zcash network tooling
              </div>
            </div>
          </div>
          <div style={{ color: C.gray, fontSize: '12px', marginTop: 8 }}>
            UX over ideology — Explore. Transact. Shield. Have Fun.
          </div>
        </div>

        {/* ── Content area ────────────────────────────────────────────────── */}
        <div style={{ padding: '18px 24px 22px' }}>

          {/* AUTH */}
          {phase === 'auth' && (
            <>
              <div style={{ color: C.dkcyan, fontSize: '13px', marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${C.dkblue}` }}>
                Connect your Zcash wallet to continue. Your address is your identity.
              </div>

              <div style={{ marginBottom: 10 }}>
                <label style={lbl}>ZCASH ADDRESS</label>
                <div style={{ color: C.gray, fontSize: '12px', marginBottom: 4 }}>
                  We encourage using a shielded address (u1… / zs1…) to preserve your anonymity.
                </div>
                <input
                  style={input} type="text" placeholder="t1… or u1… or zs1…"
                  value={address}
                  onChange={e => { setAddress(e.target.value); setAddrErr(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleStartChallenge()}
                  spellCheck={false} autoComplete="off"
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>DISPLAY NAME</label>
                  <input
                    style={input} type="text" placeholder="anonymous"
                    value={dispName}
                    onChange={e => setDispName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleStartChallenge()}
                    spellCheck={false} autoComplete="off"
                  />
                  <div style={{ color: C.dkgray, fontSize: '10px', marginTop: 3 }}>(optional)</div>
                  {nameStatus !== 'idle' && !loginPw && (
                    <div style={{ fontSize: '12px', marginTop: 3, color: nameStatus === 'taken' ? C.red : nameStatus === 'available' ? C.green : C.dkgray }}>
                      {nameStatus === 'checking' ? 'checking…' : nameStatus === 'taken' ? '✗ name taken' : '✓ available'}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>PASSWORD</label>
                  <input
                    style={input} type="password" placeholder="········"
                    value={loginPw}
                    onChange={e => { setLoginPw(e.target.value); setAddrErr(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    autoComplete="current-password"
                  />
                  <div style={{ color: C.dkgray, fontSize: '10px', marginTop: 3 }}>(existing accounts)</div>
                </div>
              </div>

              {addrErr && <div style={{ color: C.red, fontSize: '13px', marginBottom: 10 }}>{addrErr}</div>}

              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <button style={btn('primary')} disabled={loading} onClick={handleLogin}>
                  {loading ? 'Working…' : 'Sign in'}
                </button>
                <button style={btn('primary')} disabled={loading} onClick={handleStartChallenge}>
                  {loading ? 'Working…' : 'Verify ownership'}
                </button>
                <button style={btn('guest')} disabled={loading} onClick={() => { auth.setGuest(); startBoot(); }}>
                  Guest login
                </button>
              </div>

              <button
                onClick={() => {
                  if (!isValidAddr(address)) {
                    setAddrErr('Enter your Zcash address above first — resetting means re-verifying ownership');
                    return;
                  }
                  handleStartChallenge();
                }}
                disabled={loading}
                style={{ background: 'transparent', border: 'none', color: C.cyan, fontFamily: 'monospace', fontSize: '13px', padding: 0, cursor: 'pointer', textDecoration: 'underline', marginBottom: 14, display: 'block' }}
              >
                Forgot password?
              </button>

              <button
                onClick={() => setHelpOpen(o => !o)}
                style={{ background: 'transparent', border: 'none', color: C.yellow, fontFamily: 'monospace', fontSize: '15px', padding: 0, cursor: 'pointer', marginBottom: helpOpen ? 6 : 12, display: 'block' }}
              >
                {helpOpen ? '▾' : '▸'} How does this work?
              </button>
              {helpOpen && (
                <div style={{ color: C.dkgray, fontSize: '12px', lineHeight: 1.7, marginBottom: 12 }}>
                  <div><span style={{ color: C.gray }}>Sign in</span> — display name + password for accounts that already verified ownership (no address needed).</div>
                  <div><span style={{ color: C.gray }}>Verify ownership</span> — first time here: prove control of your address to create your account.</div>
                  <div>Forgot your password? Run <span style={{ color: C.gray }}>Verify ownership</span> again with your address — you&apos;ll set a new one after.</div>
                  <div>Guest users do not have profiles, settings, or watchlists saved across sessions.</div>
                  <div><span style={{ color: C.gray }}>Sessions last 24 hours</span> — reloading keeps you signed in; after 24h you&apos;ll sign in again. Only one active session per account (a new login signs the others out).</div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 10, borderTop: `1px solid ${C.dkblue}` }}>
                <div style={{ color: C.gray, fontSize: '13px', lineHeight: 1.5, flex: 1 }}>
                  Unified address (u1…) too long? Decode it into its transparent, Sapling &amp; Orchard receivers and copy the one you need.
                </div>
                <button style={{ ...btn('primary'), flexShrink: 0 }} onClick={() => setShowDecoder(true)}>
                  Open decoder
                </button>
              </div>
            </>
          )}

          {/* WELCOME BACK */}
          {phase === 'welcome-back' && (
            <>
              <div style={{ color: C.cyan, fontSize: '15px', marginBottom: 12 }}>
                Welcome back,{' '}
                <span style={{ color: C.yellow }}>
                  {auth.displayName ?? (auth.walletAddress ? auth.walletAddress.slice(0, 16) + '…' : 'User')}
                </span>
                {auth.isVerified && <span style={{ color: C.green, marginLeft: 8, fontSize: '13px' }}>● VERIFIED</span>}
              </div>
              {auth.walletAddress && (
                <div style={{ color: C.dkgray, fontSize: '13px', marginBottom: 18, fontFamily: 'monospace' }}>
                  {auth.walletAddress.slice(0, 26)}…{auth.walletAddress.slice(-8)}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={btn('primary')} onClick={startBoot}>Continue</button>
                <button style={btn('primary')} onClick={() => { auth.logout(); setPhase('auth'); }}>Switch Account</button>
              </div>
            </>
          )}

          {/* OWNERSHIP VERIFY */}
          {phase === 'verify' && challenge && (
            <>
              {pollStatus === 'confirmed' ? (
                <div style={{ color: C.green, fontSize: '15px', textAlign: 'center', padding: '20px 0' }}>
                  ✓ OWNERSHIP VERIFIED
                </div>
              ) : pollStatus === 'expired' ? (
                <>
                  <div style={{ color: C.red, fontSize: '14px', marginBottom: 14 }}>Challenge expired. Please start over.</div>
                  <button style={btn('primary')} onClick={backToAuth}>Back</button>
                </>
              ) : pollStatus === 'rejected' ? (
                <>
                  <div style={{ color: C.red, fontSize: '14px', marginBottom: 14 }}>{pollErr}</div>
                  <button style={btn('primary')} onClick={backToAuth}>Start over</button>
                </>
              ) : pollStatus === 'code_sent' ? (
                <>
                  <div style={{ color: C.green, fontSize: '14px', marginBottom: 8 }}>
                    ✓ Payment received — a verification code was sent to your address.
                  </div>
                  <div style={{ color: C.gray, fontSize: '13px', marginBottom: 12, lineHeight: 1.6 }}>
                    Check your wallet for an incoming memo from ZEC-OS. It contains a 6-digit code —
                    only your wallet can decrypt it. Enter it below.
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label style={lbl}>VERIFICATION CODE</label>
                    <input
                      style={{ ...input, fontSize: '18px', letterSpacing: 6, textAlign: 'center' }}
                      type="text" inputMode="numeric" maxLength={6} placeholder="······"
                      value={codeInput}
                      onChange={e => { setCodeInput(e.target.value.replace(/\D/g, '')); setCodeErr(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleSubmitCode()}
                      autoComplete="off"
                    />
                  </div>
                  {codeErr && <div style={{ color: C.red, fontSize: '13px', marginBottom: 10 }}>{codeErr}</div>}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={btn('primary')} disabled={loading} onClick={handleSubmitCode}>
                      {loading ? 'Checking…' : 'Verify code'}
                    </button>
                    <button style={btn('primary')} onClick={backToAuth}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ color: C.gray, fontSize: '13px', marginBottom: 12 }}>
                    {challenge.kind === 'shielded'
                      ? <>Send exactly this amount <span style={{ color: C.yellow }}>with the memo below</span> to begin verification. A code will be sent back to your address. Expires in {Math.max(0, Math.ceil((challenge.expiresAt - Date.now()) / 60000))} min.</>
                      : <>Send exactly this amount <span style={{ color: C.yellow }}>from the address you are verifying</span>. Expires in {Math.max(0, Math.ceil((challenge.expiresAt - Date.now()) / 60000))} min.</>}
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ ...input, marginBottom: 8, background: '#001100', cursor: 'text' }}>
                        <span style={{ color: C.dkgray }}>To:     </span>
                        <span style={{ color: C.yellow, wordBreak: 'break-all' }}>{challenge.toAddress}</span>
                      </div>
                      <div style={{ ...input, marginBottom: challenge.kind === 'shielded' ? 8 : 12, background: '#001100', cursor: 'text' }}>
                        <span style={{ color: C.dkgray }}>Amount: </span>
                        <span style={{ color: C.green }}>{challenge.valueZEC} ZEC</span>
                        <span style={{ color: C.dkgray }}> (exactly — unique nonce)</span>
                      </div>
                      {challenge.kind === 'shielded' && challenge.memoText && (
                        <div style={{ ...input, marginBottom: 12, background: '#001100', cursor: 'text' }}>
                          <span style={{ color: C.dkgray }}>Memo:   </span>
                          <span style={{ color: C.cyan, wordBreak: 'break-all' }}>{challenge.memoText}</span>
                        </div>
                      )}
                      <a
                        href={challenge.zip321}
                        onClick={e => { e.preventDefault(); tryOpenWallet(challenge.zip321); }}
                        style={{ color: C.cyan, fontSize: '13px', display: 'block', textDecoration: 'none', cursor: 'pointer' }}
                      >
                        ▶ Open in wallet (ZIP-321{challenge.kind === 'shielded' ? ' — memo prefilled' : ''})
                      </a>
                      {walletMsg && (
                        <div style={{ color: C.red, fontSize: '12px', marginTop: 8, lineHeight: 1.6 }}>
                          {walletMsg}
                        </div>
                      )}
                    </div>
                    <div style={{ flexShrink: 0, textAlign: 'center', maxWidth: 172 }}>
                      <div
                        onClick={() => setShowBigQr(true)}
                        title="Click to enlarge"
                        style={{ cursor: 'zoom-in', display: 'inline-block' }}
                      >
                        <ZecQr value={challenge.zip321} size={148} />
                      </div>
                      <div style={{ color: C.gray, fontSize: '12px', marginTop: 6 }}>
                        Scan with your Zcash wallet · click to enlarge
                      </div>
                      <div style={{ color: C.dkgray, fontSize: '12px', marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <span>Your phone&apos;s camera app won&apos;t work</span>
                        <button
                          onClick={() => setShowZodlInfo(true)}
                          title="How to scan in zodl"
                          style={{
                            background: 'transparent', border: `1px solid ${C.cyan}`, color: C.cyan,
                            fontFamily: 'monospace', fontSize: '14px', width: 22, height: 22,
                            borderRadius: '50%', cursor: 'pointer', flexShrink: 0, lineHeight: 1, padding: 0,
                          }}
                        >
                          i
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={{ color: C.yellow, fontSize: '13px', marginBottom: 4 }}>
                    <span style={{ marginRight: 6 }}>●</span>
                    {challenge.kind === 'shielded' ? 'Watching for your payment memo…' : 'Polling Zaino for payment…'}
                  </div>
                  <div style={{ color: C.gray, fontSize: '12px', marginBottom: 4, lineHeight: 1.6 }}>
                    Verification speed depends on the network — it generally takes a few minutes at most.
                    The challenge (QR included) stays valid for {Math.max(0, Math.ceil((challenge.expiresAt - Date.now()) / 60000))} more min.
                  </div>
                  <div style={{ color: C.gray, fontSize: '12px', marginBottom: 4, lineHeight: 1.6 }}>
                    This is a <span style={{ color: C.yellow }}>one-time</span> step: once verified, you can set a
                    password and sign in from any device without verifying again.
                  </div>
                  <div style={{ color: C.dkgray, fontSize: '12px', marginBottom: 16 }}>
                    Having trouble verifying? Contact the admin for help.
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={btn('primary')} onClick={backToAuth}>Cancel</button>
                  </div>
                </>
              )}
            </>
          )}

          {/* SET PASSWORD (offered once, right after ownership verification) */}
          {phase === 'set-password' && (
            <>
              <div style={{ color: C.green, fontSize: '14px', marginBottom: 6 }}>
                ✓ Ownership verified.
              </div>
              <div style={{ color: C.gray, fontSize: '13px', marginBottom: 14, lineHeight: 1.6 }}>
                Set a password (or a new one, if you forgot yours) so you can sign in from any
                device without repeating the payment verification. Also available in the Account app.
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>NEW PASSWORD (min 8 chars)</label>
                  <input
                    style={input} type="password" placeholder="········"
                    value={newPw}
                    onChange={e => { setNewPw(e.target.value); setPwErr(''); }}
                    autoComplete="new-password"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>CONFIRM</label>
                  <input
                    style={input} type="password" placeholder="········"
                    value={newPwConfirm}
                    onChange={e => { setNewPwConfirm(e.target.value); setPwErr(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleSetPassword(false)}
                    autoComplete="new-password"
                  />
                </div>
              </div>
              {pwErr && <div style={{ color: C.red, fontSize: '13px', marginBottom: 10 }}>{pwErr}</div>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={btn('primary')} disabled={loading} onClick={() => handleSetPassword(false)}>
                  {loading ? 'Saving…' : 'Set password'}
                </button>
                <button style={btn('primary')} disabled={loading} onClick={() => handleSetPassword(true)}>
                  Skip for now
                </button>
              </div>
            </>
          )}

          {/* BOOTING */}
          {phase === 'booting' && (
            <>
              <div style={{ color: C.green, fontSize: '15px', marginBottom: 4 }}>Initializing...</div>
              <div style={{ color: C.dkgray, fontSize: '12px', marginBottom: 16 }}>Loading ZEC-OS workspace</div>
              <div style={{ width: '100%', height: 14, border: `2px solid ${C.dkcyan}`, background: '#000', marginBottom: 16 }}>
                <div style={{ height: '100%', background: C.yellow, width: `${progress}%`, transition: 'width 0.2s ease' }} />
              </div>
              <div style={{ color: '#AA8800', fontSize: '13px', opacity: 0.75 }}>Press ENTER to skip</div>
            </>
          )}

        </div>
      </div>

      {/* ── Enlarged QR overlay — click anywhere to dismiss ──────────────── */}
      {showBigQr && challenge && (
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, zIndex: 30, cursor: 'zoom-out' }}
          onClick={() => setShowBigQr(false)}
        >
          <ZecQr value={challenge.zip321} size={Math.min(360, typeof window !== 'undefined' ? window.innerWidth - 100 : 360)} />
          <div style={{ color: C.gray, fontSize: '13px' }}>
            Scan with your Zcash wallet — click anywhere to close
          </div>
        </div>
      )}

      {/* ── zodl scan help overlay ────────────────────────────────────────── */}
      {showZodlInfo && (
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
          onClick={() => setShowZodlInfo(false)}
        >
          <div
            style={{ width: 420, maxWidth: '92vw', border: `2px solid ${C.dkcyan}`, boxShadow: `4px 4px 0 ${C.dkblue}`, background: '#000' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ background: C.dkblue, padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.dkcyan}` }}>
              <span style={{ color: C.yellow, fontSize: '14px' }}>SCANNING WITH ZODL</span>
              <button
                style={{ background: 'transparent', border: `1px solid ${C.cyan}`, color: C.cyan, fontFamily: 'monospace', fontSize: '13px', padding: '2px 10px', cursor: 'pointer' }}
                onClick={() => setShowZodlInfo(false)}
              >
                ✕ Close
              </button>
            </div>
            <div style={{ padding: '14px 16px', color: C.gray, fontSize: '13px', lineHeight: 1.8 }}>
              <div style={{ color: C.yellow, marginBottom: 8 }}>These steps are for the zodl wallet only.</div>
              <div>1. Open <span style={{ color: C.cyan }}>zodl</span> on your phone.</div>
              <div>2. Go to <span style={{ color: C.cyan }}>Send</span>.</div>
              <div>3. Tap the <span style={{ color: C.cyan }}>scan / QR</span> button.</div>
              <div>4. Point your phone at the QR code on this screen.</div>
              <div style={{ marginTop: 10, color: C.dkgray }}>
                The address, exact amount, and memo fill in automatically — just confirm the send.
                Your phone&apos;s regular camera app will not fill in the payment; you must scan from inside the wallet.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── UA decoder overlay — rendered above the auth box ─────────────── */}
      {showDecoder && (
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
          onClick={() => setShowDecoder(false)}
        >
          <div
            style={{ width: 620, maxWidth: '92vw', height: 480, maxHeight: '80vh', display: 'flex', flexDirection: 'column', border: `2px solid ${C.dkcyan}`, boxShadow: `4px 4px 0 ${C.dkblue}`, background: 'var(--bg-window, #000)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ background: C.dkblue, padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.dkcyan}`, flexShrink: 0 }}>
              <span style={{ color: C.yellow, fontSize: '14px' }}>UA DECODER</span>
              <button
                style={{ background: 'transparent', border: `1px solid ${C.cyan}`, color: C.cyan, fontFamily: 'monospace', fontSize: '13px', padding: '2px 10px', cursor: 'pointer' }}
                onClick={() => setShowDecoder(false)}
              >
                ✕ Close
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <UaDecoder />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
        input::placeholder { color: #555 !important; }
        input:focus { border-color: #55FFFF !important; }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
