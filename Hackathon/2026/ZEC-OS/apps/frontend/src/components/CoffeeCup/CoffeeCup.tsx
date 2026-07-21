'use client';

import { useState } from 'react';

const DONATE_ADDRESS = 'u192er4slrt3pqqqsqek5ksxvqfw9ws5qgtqvc5fjdpl9qg6kfzw9m9d8qcm80f2r37q0lxmkmtv9hqk8zrsuqlzny6pt8ut7xtgpam34q';

function ClipboardIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function QrModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 99999, cursor: 'pointer',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#000', border: '2px solid #00AAAA',
          boxShadow: '0 0 0 1px #0000AA, 6px 6px 0 #0000AA',
          width: 332, cursor: 'default', fontFamily: 'monospace',
        }}
      >
        <div style={{
          background: '#0000AA', padding: '5px 10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #00AAAA',
        }}>
          <span style={{ color: '#FFFF55', fontSize: '10px' }}>ZECOS Donation Address</span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#AAA',
            cursor: 'pointer', fontSize: '13px', lineHeight: 1,
          }}>✕</button>
        </div>
        <div style={{ background: '#fff', padding: 16, display: 'flex', justifyContent: 'center' }}>
          <img src="/zcash.png" alt="ZEC donation QR" style={{ width: 300, height: 300 }} />
        </div>
      </div>
    </div>
  );
}

export function CoffeeCup() {
  const [open, setOpen]     = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedEth, setCopiedEth] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const ETH_HANDLE = 'orbgasm.eth';

  const handleCopyEth = () => {
    navigator.clipboard.writeText(ETH_HANDLE).catch(() => {});
    setCopiedEth(true);
    setTimeout(() => setCopiedEth(false), 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(DONATE_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <>
      <style>{`
        @keyframes coffeeShake {
          0%, 90%  { transform: rotate(0deg) scale(1); }
          91.5%    { transform: rotate(-15deg) scale(1.2); }
          93%      { transform: rotate(15deg)  scale(1.2); }
          94.5%    { transform: rotate(-10deg) scale(1.15); }
          96%      { transform: rotate(10deg)  scale(1.15); }
          97.5%    { transform: rotate(-4deg)  scale(1.05); }
          99%,100% { transform: rotate(0deg)   scale(1); }
        }
        .coffee-btn {
          animation: coffeeShake 30s ease-in-out infinite;
          transition: filter 0.15s;
        }
        .coffee-btn:hover {
          filter: brightness(1.4) drop-shadow(0 0 8px rgba(255,200,60,0.75));
        }
        @keyframes coffeeSlideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .coffee-panel {
          animation: coffeeSlideIn 0.25s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
        }
        .coffee-addr:hover { background: #002800 !important; }
        .coffee-copy-btn:hover { color: #55FFFF !important; }
      `}</style>

      {/* Floating coffee cup button */}
      <button
        className="coffee-btn"
        onClick={() => setOpen(v => !v)}
        title="Donate to keep ZEC-OS running ☕"
        style={{
          position: 'fixed', bottom: '58px', right: '28px', zIndex: 9990,
          background: 'none', border: 'none', padding: 0,
          fontSize: '34px', lineHeight: 1, cursor: 'pointer',
          filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.7))',
        }}
      >
        ☕
      </button>

      {/* Donation panel */}
      {open && (
        <div
          className="coffee-panel"
          style={{
            position: 'fixed', bottom: '96px', right: '20px',
            zIndex: 9991, width: 308, background: '#060606',
            border: '2px solid #00AAAA',
            boxShadow: '0 0 0 1px #0000AA, 5px 5px 0 #0000AA',
            fontFamily: 'monospace',
          }}
        >
          {/* Title bar */}
          <div style={{
            background: '#0000AA', padding: '5px 10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid #00AAAA',
          }}>
            <span style={{ color: '#FFFF55', fontSize: 'var(--font-size-trinket)', letterSpacing: 0.5 }}>
              ☕  Infra &amp; Coffee Fund
            </span>
            <button onClick={() => setOpen(false)} style={{
              background: 'none', border: 'none', color: '#AAAAAA',
              cursor: 'pointer', fontSize: 'var(--font-size-trinket)', fontFamily: 'monospace',
              lineHeight: 1, padding: '0 2px',
            }}>✕</button>
          </div>

          {/* Body */}
          <div style={{ padding: '14px 16px 18px', color: '#AAAAAA', fontSize: 'var(--font-size-trinket)', lineHeight: 1.75 }}>
            <p style={{ color: '#55FFFF', marginBottom: 8, fontSize: 'var(--font-size-trinket)' }}>
              Running the stack ain&apos;t free.
            </p>
            <p style={{ marginBottom: 6 }}>
              Turns out servers don&apos;t run on good vibes alone.
            </p>
            <p style={{ marginBottom: 14, color: '#888888' }}>
              If ZEC-OS has saved you time, made blockchain data actually readable,
              made you smile, or just sparked curiosity about Zcash and/or privacy —
              a small ZEC donation keeps the nodes humming and the coffee hot.
            </p>

            {/* Address box + copy icon */}
            <div style={{ position: 'relative', marginBottom: 4 }}>
              <div
                className="coffee-addr"
                onClick={handleCopy}
                style={{
                  background: '#001a00', border: '1px solid #00AAAA',
                  padding: '8px 32px 8px 10px',
                  wordBreak: 'break-all', color: '#55FF55',
                  fontSize: 'var(--font-size-trinket)', lineHeight: 1.6, letterSpacing: 0.3,
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                title="Click to copy"
              >
                {DONATE_ADDRESS}
              </div>
              <button
                className="coffee-copy-btn"
                onClick={handleCopy}
                style={{
                  position: 'absolute', top: 7, right: 7,
                  background: 'none', border: 'none',
                  color: '#00AAAA', cursor: 'pointer',
                  padding: 2, lineHeight: 1, transition: 'color 0.15s',
                }}
                title="Copy address"
              >
                <ClipboardIcon />
              </button>
            </div>

            {/* Copy flash */}
            <div style={{
              height: 10, marginBottom: 5, textAlign: 'center',
              color: '#55FF55', fontSize: 'var(--font-size-trinket)',
              opacity: copied ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}>
              ✓ address copied!
            </div>

            {/* QR — centered */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#888888', fontSize: 'var(--font-size-trinket)', marginBottom: 6 }}>
                or, scan this qr:
              </div>
              <img
                src="/zcash.png"
                alt="QR code"
                onClick={() => setShowQr(true)}
                style={{
                  width: 34, height: 34, cursor: 'pointer',
                  border: '1px solid #00AAAA', imageRendering: 'pixelated',
                  display: 'inline-block',
                }}
                title="Click to enlarge"
              />
            </div>

            {/* ETH tip line */}
            <div style={{
              fontSize: 'var(--font-size-trinket)', color: '#5599ff',
              lineHeight: 1.5, marginTop: 15, marginBottom: 10, textAlign: 'center',
            }}>
              or tip on Ethereum at{' '}
              <span
                onClick={handleCopyEth}
                style={{
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: copiedEth ? 'none' : 'underline',
                  textDecorationStyle: 'dotted',
                  color: copiedEth ? '#55FF55' : '#7ab4ff',
                }}
                title="Click to copy"
              >
                {copiedEth ? '✓ copied!' : ETH_HANDLE}
              </span>

              <div style={{ color: '#aaaaaa', fontSize: 'var(--font-size-trinket)', marginTop: 10, marginBottom: 6 }}>
                thx!<br/>
                -orb
              </div>
            </div>

          </div>
        </div>
      )}

      {showQr && <QrModal onClose={() => setShowQr(false)} />}
    </>
  );
}
