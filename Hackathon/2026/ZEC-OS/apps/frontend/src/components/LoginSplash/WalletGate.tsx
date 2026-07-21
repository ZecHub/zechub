'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';

// CGA-ish color palette
const C = {
  black:   '#000000',
  dkgray:  '#555555',
  gray:    '#AAAAAA',
  white:   '#FFFFFF',
  yellow:  '#FFFF55',
  cyan:    '#55FFFF',
  magenta: '#FF55FF',
  green:   '#55FF55',
  red:     '#FF5555',
  blue:    '#5555FF',
  dkblue:  '#0000AA',
  brown:   '#AA5500',
  dkcyan:  '#00AAAA',
};

type Screen = 'check' | 'welcome-back' | 'login' | 'verify' | 'done';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

const ZEC_ADDR_RE = /^(t1|t3|u1|zs1)[a-zA-Z0-9]{30,}/;
function isValidAddr(a: string) { return ZEC_ADDR_RE.test(a.trim()); }

// ── ANSI-style banner ────────────────────────────────────────────────────────

const BANNER_STYLE: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '13px',
  lineHeight: '1.3',
  whiteSpace: 'pre',
  userSelect: 'none',
};

type Seg = [string, string, string?];

function S(t: string, fg: string, bg?: string): Seg { return [t, fg, bg]; }

function renderAnsi(rows: Seg[][]): React.ReactNode {
  return rows.map((row, i) => (
    <div key={i} style={BANNER_STYLE}>
      {row.map(([t, fg, bg], j) => (
        <span key={j} style={{ color: fg, backgroundColor: bg ?? 'transparent' }}>{t}</span>
      ))}
    </div>
  ));
}

// ZEC logo — same block-letter style as BBS RPG, gold on black
const G = C.yellow;  // gold
const S2 = C.brown;  // shadow
const K = C.black;

const LOGO: Seg[][] = [
  [['   ',K],['██████████',G],['  ',K],['██████████',G],['  ',K],['██████████',G]],
  [['          ',K],['███',G],['  ',K],['████',G],['        ',K],['████',G]],
  [['      ',K],['████',G],['     ',K],['████████',G],['    ',K],['████',G]],
  [['   ',K],['███',G],['         ',K],['████',G],['        ',K],['████',G]],
  [['   ',K],['██████████',G],['  ',K],['██████████',G],['  ',K],['██████████',G]],
  [['    ',K],['▒▒▒▒▒▒▒▒▒▒',S2],['  ',K],['▒▒▒▒▒▒▒▒▒▒',S2],['  ',K],['▒▒▒▒▒▒▒▒▒▒',S2]],
];

const TITLE_ROW: Seg[][] = [
  [
    S('          ', C.gray, C.dkblue),
    S(' ZEC-OS v0.1 ', C.yellow, C.dkblue),
    S(' WALLET AUTHENTICATION ', C.cyan, C.dkblue),
    S('          ', C.gray, C.dkblue),
  ],
];

// ── Main component ───────────────────────────────────────────────────────────

export function WalletGate({ children }: { children: React.ReactNode }) {
  const auth = useAuthStore();
  const [screen, setScreen]     = useState<Screen>('check');
  const [address, setAddress]   = useState('');
  const [dispName, setDispName] = useState('');
  const [addrErr, setAddrErr]   = useState('');
  const [loading, setLoading]   = useState(false);

  // payment-challenge state
  const [challenge, setChallenge]   = useState<{
    nonce: string; valueZEC: string; zip321: string; toAddress: string; expiresAt: number;
  } | null>(null);
  const [pollStatus, setPollStatus] = useState<'waiting' | 'confirmed' | 'expired'>('waiting');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // On mount: restore session if persisted auth is complete
  useEffect(() => {
    if (auth.isAuthenticated) {
      setScreen('welcome-back');
    } else {
      setScreen('login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Soft login (address only, no payment) ────────────────────────────────
  const handleAddressLogin = useCallback(async () => {
    if (!isValidAddr(address)) {
      setAddrErr('Enter a valid Zcash address (t1…, u1…, or zs1…)');
      return;
    }
    setAddrErr('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/auth/address`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ address: address.trim(), displayName: dispName.trim() || null }),
      });
      const data = await res.json();
      if (data.ok) {
        auth.setAuth({
          walletAddress: data.address,
          displayName:   data.displayName,
          sessionToken:  data.sessionId,
          isVerified:    false,
        });
        setScreen('done');
      } else {
        setAddrErr(data.error ?? 'Login failed');
      }
    } catch {
      setAddrErr('Backend unreachable — check connection');
    } finally {
      setLoading(false);
    }
  }, [address, dispName, auth]);

  // ── Payment challenge ─────────────────────────────────────────────────────
  const handleStartChallenge = useCallback(async () => {
    if (!isValidAddr(address)) {
      setAddrErr('Enter a valid Zcash address first');
      return;
    }
    setAddrErr('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/auth/challenge`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ address: address.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setChallenge(data);
        setScreen('verify');
        setPollStatus('waiting');
      } else {
        setAddrErr(data.error ?? 'Failed to create challenge');
      }
    } catch {
      setAddrErr('Backend unreachable');
    } finally {
      setLoading(false);
    }
  }, [address, auth]);

  // Poll for payment confirmation
  useEffect(() => {
    if (screen !== 'verify' || !challenge) return;

    pollRef.current = setInterval(async () => {
      if (Date.now() > challenge.expiresAt) {
        setPollStatus('expired');
        clearInterval(pollRef.current!);
        return;
      }
      try {
        const res  = await fetch(`${BACKEND}/api/auth/verify/${challenge.nonce}`);
        const data = await res.json();
        if (data.verified) {
          clearInterval(pollRef.current!);
          setPollStatus('confirmed');
          auth.setAuth({
            walletAddress: address.trim(),
            displayName:   dispName.trim() || null,
            sessionToken:  data.sessionId,
            isVerified:    true,
          });
          setTimeout(() => setScreen('done'), 1200);
        }
      } catch { /* ignore */ }
    }, 4000);

    return () => clearInterval(pollRef.current!);
  }, [screen, challenge, address, dispName, auth]);

  // ── Render helpers ────────────────────────────────────────────────────────
  const baseStyle: React.CSSProperties = {
    position:       'fixed',
    inset:          0,
    background:     C.black,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    zIndex:         9999,
    fontFamily:     'monospace',
  };

  const boxStyle: React.CSSProperties = {
    width:       560,
    border:      `2px solid ${C.dkcyan}`,
    background:  C.black,
    padding:     '0 0 20px',
    boxShadow:   `0 0 0 1px ${C.dkblue}, 4px 4px 0 ${C.dkblue}`,
  };

  const titleBarStyle: React.CSSProperties = {
    background:   C.dkblue,
    padding:      '4px 8px',
    display:      'flex',
    alignItems:   'center',
    gap:          8,
    marginBottom: 16,
  };

  const labelStyle: React.CSSProperties = {
    color:      C.gray,
    fontSize:   '11px',
    marginBottom: 4,
    display:    'block',
  };

  const inputStyle: React.CSSProperties = {
    background:    C.black,
    border:        `1px solid ${C.dkcyan}`,
    color:         C.green,
    fontFamily:    'monospace',
    fontSize:      '12px',
    padding:       '5px 8px',
    width:         '100%',
    outline:       'none',
    boxSizing:     'border-box',
  };

  const btnStyle = (primary?: boolean): React.CSSProperties => ({
    background:  primary ? C.dkblue : 'transparent',
    border:      `1px solid ${primary ? C.cyan : C.dkgray}`,
    color:       primary ? C.white : C.gray,
    fontFamily:  'monospace',
    fontSize:    '12px',
    padding:     '6px 14px',
    cursor:      'pointer',
    transition:  'border-color 0.1s',
  });

  const errStyle: React.CSSProperties = {
    color:     C.red,
    fontSize:  '11px',
    marginTop: 6,
    minHeight: 16,
  };

  const pad: React.CSSProperties = { padding: '0 24px' };

  // ── Screens ───────────────────────────────────────────────────────────────

  if (screen === 'check') return null; // hydrating

  if (screen === 'done') {
    return <>{children}</>;
  }

  if (screen === 'welcome-back') {
    return (
      <div style={baseStyle}>
        <div style={boxStyle}>
          <div style={titleBarStyle}>
            <span style={{ color: C.yellow, fontSize: '11px' }}>■</span>
            <span style={{ color: C.white, fontSize: '11px' }}>ZEC-OS — RESUME SESSION</span>
          </div>
          <div style={pad}>
            <div style={{ marginBottom: 12 }}>{renderAnsi(LOGO)}</div>
            <div style={{ color: C.cyan, fontSize: '12px', marginBottom: 16 }}>
              Welcome back,{' '}
              <span style={{ color: C.yellow }}>
                {auth.displayName ?? auth.walletAddress?.slice(0, 16) + '…'}
              </span>
              {auth.isVerified && (
                <span style={{ color: C.green, marginLeft: 8 }}>● VERIFIED</span>
              )}
            </div>
            {auth.walletAddress && (
              <div style={{ color: C.dkgray, fontSize: '11px', marginBottom: 16 }}>
                {auth.walletAddress.slice(0, 24)}…{auth.walletAddress.slice(-8)}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={btnStyle(true)} onClick={() => setScreen('done')}>
                Continue
              </button>
              <button style={btnStyle()} onClick={() => {
                auth.logout();
                setScreen('login');
              }}>
                Switch Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'verify' && challenge) {
    const expiryMin = Math.max(0, Math.ceil((challenge.expiresAt - Date.now()) / 60000));
    return (
      <div style={baseStyle}>
        <div style={boxStyle}>
          <div style={titleBarStyle}>
            <span style={{ color: C.yellow, fontSize: '11px' }}>■</span>
            <span style={{ color: C.white, fontSize: '11px' }}>ZEC-OS — PAYMENT VERIFICATION</span>
          </div>
          <div style={pad}>
            {renderAnsi(LOGO)}
            <div style={{ height: 12 }} />
            {pollStatus === 'confirmed' ? (
              <div style={{ color: C.green, fontSize: '13px', textAlign: 'center', padding: '16px 0' }}>
                ✓ PAYMENT CONFIRMED — IDENTITY VERIFIED
              </div>
            ) : pollStatus === 'expired' ? (
              <>
                <div style={{ color: C.red, fontSize: '12px', marginBottom: 12 }}>
                  Challenge expired. Please start over.
                </div>
                <button style={btnStyle(true)} onClick={() => { setChallenge(null); setScreen('login'); }}>
                  Back
                </button>
              </>
            ) : (
              <>
                <div style={{ color: C.gray, fontSize: '11px', marginBottom: 12 }}>
                  Send exactly this amount to verify your address. Expires in {expiryMin} min.
                </div>

                <div style={{ ...inputStyle, marginBottom: 8, background: '#001100', cursor: 'text' }}>
                  <span style={{ color: C.dkgray }}>To:     </span>
                  <span style={{ color: C.yellow }}>{challenge.toAddress}</span>
                </div>
                <div style={{ ...inputStyle, marginBottom: 8, background: '#001100', cursor: 'text' }}>
                  <span style={{ color: C.dkgray }}>Amount: </span>
                  <span style={{ color: C.green }}>{challenge.valueZEC} ZEC</span>
                  <span style={{ color: C.dkgray }}> (exactly — unique nonce)</span>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <a
                    href={challenge.zip321}
                    style={{ color: C.cyan, fontSize: '11px', textDecoration: 'none' }}
                  >
                    ▶ Open in wallet (ZIP-321)
                  </a>
                </div>

                <div style={{ color: C.dkgray, fontSize: '11px', marginBottom: 16 }}>
                  <span style={{
                    display: 'inline-block',
                    animation: 'pulse 1s infinite',
                    color: C.yellow,
                    marginRight: 6,
                  }}>●</span>
                  Polling Zaino for payment…
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={btnStyle()} onClick={() => {
                    clearInterval(pollRef.current!);
                    setChallenge(null);
                    setScreen('login');
                  }}>
                    Cancel
                  </button>
                  {/* Soft-login fallback while waiting */}
                  <button style={btnStyle()} onClick={() => {
                    clearInterval(pollRef.current!);
                    auth.setAuth({
                      walletAddress: address.trim(),
                      displayName:   dispName.trim() || null,
                      sessionToken:  'pending-' + challenge.nonce,
                      isVerified:    false,
                    });
                    setScreen('done');
                  }}>
                    Skip (unverified)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Login screen (default) ─────────────────────────────────────────────────
  return (
    <div style={baseStyle}>
      <div style={boxStyle}>
        <div style={titleBarStyle}>
          {renderAnsi(TITLE_ROW)}
        </div>
        <div style={pad}>
          <div style={{ marginBottom: 16 }}>{renderAnsi(LOGO)}</div>

          <div style={{ color: C.dkcyan, fontSize: '11px', marginBottom: 16, borderBottom: `1px solid ${C.dkblue}`, paddingBottom: 8 }}>
            Connect your Zcash wallet to continue. Your address is your identity.
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={labelStyle}>ZCASH ADDRESS</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="t1... or u1... or zs1..."
              value={address}
              onChange={e => { setAddress(e.target.value); setAddrErr(''); }}
              onKeyDown={e => e.key === 'Enter' && handleAddressLogin()}
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>DISPLAY NAME (optional)</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="anonymous"
              value={dispName}
              onChange={e => setDispName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddressLogin()}
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div style={errStyle}>{addrErr}</div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <button
              style={btnStyle(true)}
              disabled={loading}
              onClick={handleAddressLogin}
            >
              {loading ? 'Connecting…' : 'Connect (address only)'}
            </button>
            <button
              style={btnStyle()}
              disabled={loading}
              onClick={handleStartChallenge}
            >
              Verify with payment
            </button>
            <button
              style={btnStyle()}
              onClick={() => { auth.setGuest(); setScreen('done'); }}
            >
              Guest
            </button>
          </div>

          <div style={{ marginTop: 16, color: C.dkgray, fontSize: '10px', lineHeight: '1.5' }}>
            Address-only: soft identity, no on-chain verification.{'\n'}
            Verify with payment: send a unique zatoshi amount → Zaino confirms ownership.{'\n'}
            Zcash has no signMessage — payment is the canonical auth primitive.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
        input::placeholder { color: #555555; }
        input:focus { border-color: #55FFFF !important; }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
