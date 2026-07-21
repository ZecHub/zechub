'use client';

import { useState } from 'react';

const VERSION = process.env.NEXT_PUBLIC_VERSION ?? '1.1.2';

const DONATE_ADDRESS = 'u192er4slrt3pqqqsqek5ksxvqfw9ws5qgtqvc5fjdpl9qg6kfzw9m9d8qcm80f2r37q0lxmkmtv9hqk8zrsuqlzny6pt8ut7xtgpam34q';

// Pixel-art old Twitter bird (16×16 logical pixels)
function PixelBird({ size = 20 }: { size?: number }) {
  const px: [number, number][] = [
    [1,7],[1,8],
    [2,6],[2,7],[2,8],[2,9],
    [3,5],[3,6],[3,7],[3,8],[3,9],
    [3,11],[3,12],
    [4,11],
    [4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],
    [5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],
    [6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[6,11],
    [7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],[7,10],[7,11],
    [8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9],[8,10],[8,11],
    [9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],[9,10],
    [10,4],[10,5],[10,6],[10,7],[10,8],[10,9],
    [11,5],[11,6],[11,7],[11,8],
    [12,4],[12,5],[12,6],[12,7],
    [13,3],[13,4],[13,5],[13,6],
    [14,2],[14,3],[14,4],
  ];
  const eye: [number, number][] = [[3,10],[4,10]];
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }} xmlns="http://www.w3.org/2000/svg">
      {px.map(([r, c], i) => <rect key={i} x={c} y={r} width={1} height={1} fill="#1DA1F2" />)}
      {eye.map(([r, c], i) => <rect key={`e${i}`} x={c} y={r} width={1} height={1} fill="#fff" />)}
    </svg>
  );
}

function QrModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 99999, cursor: 'pointer',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#000', border: '2px solid #00AAAA',
          boxShadow: '0 0 0 1px #0000AA, 6px 6px 0 #0000AA',
          width: 320, cursor: 'default',
        }}
      >
        <div style={{
          background: '#0000AA', padding: '5px 10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #00AAAA',
        }}>
          <span style={{ color: '#FFFF55', fontSize: '10px', fontFamily: 'monospace' }}>
            ZECOS Donation Address
          </span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#AAA',
            cursor: 'pointer', fontSize: '13px', fontFamily: 'monospace', lineHeight: 1,
          }}>✕</button>
        </div>
        <div style={{ background: '#fff', padding: 16, display: 'flex', justifyContent: 'center' }}>
          <img src="/zcash.png" alt="ZEC donation QR" style={{ width: 280, height: 280 }} />
        </div>
      </div>
    </div>
  );
}

const ETH_HANDLE = 'orbgasm.eth';

function DonateSection() {
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedEth, setCopiedEth] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DONATE_ADDRESS).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCopyEth = () => {
    navigator.clipboard.writeText(ETH_HANDLE).catch(() => {});
    setCopiedEth(true);
    setTimeout(() => setCopiedEth(false), 1500);
  };

  return (
    <div className="mt-3 pt-2 border-t border-[var(--border-window)]">
      <p className="mb-2" style={{ fontSize: '12px', color: '#b8b8b8' }}>
        Donate to infrastructure and coffee costs:
      </p>
      <div className="flex items-start gap-2 flex-wrap">
        <span
          onClick={handleCopy}
          className="font-mono break-all transition-colors"
          style={{
            fontSize: '10px', flex: 1, minWidth: 0,
            color: copied ? 'var(--accent-green)' : 'var(--text-green)',
            cursor: 'pointer',
          }}
          title="Click to copy"
        >
          {copied ? '✓ Copied!' : DONATE_ADDRESS}
        </span>
        <div className="flex items-center gap-1 shrink-0 mt-0.5">
          <span style={{ fontSize: '10px', color: '#b8b8b8' }}>QR:</span>
          <img
            src="/zcash.png"
            alt="QR code"
            onClick={() => setShowQr(true)}
            style={{
              width: 28, height: 28, cursor: 'pointer',
              border: '1px solid var(--border-window)',
              imageRendering: 'pixelated',
            }}
            title="Click to enlarge"
          />
        </div>
      </div>
      <p
        className="mt-2"
        style={{ fontSize: '11px', color: '#5599ff', lineHeight: 1.5 }}
      >
        alternatively, you can tip on the Ethereum network at{' '}
        <span
          onClick={handleCopyEth}
          style={{
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: copiedEth ? 'none' : 'underline',
            textDecorationStyle: 'dotted',
            color: copiedEth ? '#55ff99' : '#7ab4ff',
          }}
          title="Click to copy"
        >
          {copiedEth ? '✓ copied!' : ETH_HANDLE}
        </span>
      </p>
      {showQr && <QrModal onClose={() => setShowQr(false)} />}
    </div>
  );
}

export function About() {
  return (
    <div className="flex flex-col h-full p-3 bg-[var(--bg-window)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img src="/zec-logo.svg" alt="ZEC-OS" className="w-14 h-14" style={{ imageRendering: 'pixelated' }} />
        <div>
          <h1 className="text-[var(--accent-gold)]" style={{ fontFamily: 'var(--font-press-start)', fontSize: 'var(--font-size-title)' }}>
            ZEC-OS
          </h1>
          <p className="text-[var(--text-green)]" style={{ fontSize: 'var(--font-size-label)' }}>
            Version {VERSION}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-0" style={{ fontSize: '13px' }}>
        <p className="text-[var(--text-green)] mb-3">
          A retro OS-style interface for the Zcash blockchain. Block explorer, mempool, miner analytics, privacy tools, and more — all in one place.
        </p>

        {/* Folders */}
        <div className="pt-2 border-t border-[var(--border-window)]">
          <p className="text-[var(--accent-gold)] font-bold mb-1">Folders:</p>
          <ul className="text-[var(--text-green)] ml-2 space-y-0.5">
            <li>Stats — price, height, pools, supply</li>
            <li>Charts — price, shielded pool, supply history</li>
            <li>Tools — Explorer, Mempool, Mining, TX Graph, more</li>
            <li>Privacy — weather score, coach, flow chart</li>
            <li>Widgets — ticker, halving countdown, network data</li>
            <li>Games — Dark Forest, Pong, Shmup</li>
          </ul>
        </div>

        {/* Philosophy */}
        <div className="mt-3 pt-2 border-t border-[var(--border-window)]">
          <p className="text-[var(--accent-gold)] font-bold mb-1">Philosophy</p>
          <p className="text-[var(--text-green)] leading-relaxed">
            ZEC-OS is built on one belief: <span className="text-[var(--accent-gold)]">great UX is the most powerful privacy tool</span>.
            When using Zcash feels good — exploring blocks, sending shielded transactions, analyzing the network — more people actually do it.
            That network effect matters for everyone.
          </p>
          <p className="mt-2 leading-relaxed" style={{ color: '#b8b8b8' }}>
            This is not about ideology. It&apos;s about making the Zcash network genuinely accessible:
            clear data, intuitive tools, an interface that feels fun and functional without requiring deep technical knowledge.
          </p>
        </div>

        {/* Tech stack */}
        <div className="mt-3 pt-2 border-t border-[var(--border-window)]">
          <p className="text-[var(--text-green)]">
            Built with Next.js · TypeScript · Tailwind CSS · Zustand · lots of coffee
          </p>
          <div className="mt-2" style={{ color: '#b8b8b8' }}>
            <span className="text-[var(--accent-gold)] font-bold">Zcash Stack: </span>
            <span>Zebra · Zaino · Zingo · Zallet · gRPC · custom RPC layer · more coffee</span>
          </div>
          <p className="text-[var(--accent-gold)] mt-2 font-bold">
            Powered by Zcash
            ... and coffee
          </p>
        </div>

        {/* Credits */}
        <div className="mt-3 pt-2 border-t border-[var(--border-window)]">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ color: '#b8b8b8' }}>Created by</span>
            <a href="https://orbatron.org" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline font-bold">
              Orb
            </a>
            <a href="https://x.com/artoforb" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="@artoforb on X">
              <PixelBird size={18} />
            </a>
          </div>
        </div>

        {/* Donate */}
        <DonateSection />
      </div>
    </div>
  );
}

export default About;
