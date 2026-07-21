'use client';

import { useState } from 'react';

// Slick, GitBook-style manual for the Explorer. Sidebar of topics + content pane.
// Concise by design — no wordiness. Themed via CSS variables so it tracks the OS.

interface Topic { id: string; title: string; body: React.ReactNode; }

const H = ({ children }: { children: React.ReactNode }) => (
  <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: 'var(--font-size-menu)', marginBottom: 10 }}>{children}</div>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 10 }}>{children}</p>
);
const K = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{children}</span>
);
const List = ({ items }: { items: React.ReactNode[] }) => (
  <ul style={{ margin: '0 0 10px', paddingLeft: 18, color: 'var(--text-primary)', lineHeight: 1.7 }}>
    {items.map((it, i) => <li key={i} style={{ marginBottom: 4 }}>{it}</li>)}
  </ul>
);

const TOPICS: Topic[] = [
  {
    id: 'start', title: 'Getting started',
    body: <>
      <H>Getting started</H>
      <P>This is a live Zcash explorer. Type anything into the search bar and press <K>Search</K> (or Enter).</P>
      <List items={[
        <><K>Auto-detect</K> figures out whether it&apos;s a block, transaction, or address.</>,
        <>Every result you click opens in a <K>new window</K> — you never lose your place.</>,
        <>Copy buttons sit next to every hash and address.</>,
      ]} />
      <P>New here? Try searching a block height like <K>2000000</K>.</P>
    </>,
  },
  {
    id: 'apart', title: 'What sets us apart',
    body: <>
      <H>What sets us apart</H>
      <P>Most explorers stop at transparent data. This one is built for a privacy chain:</P>
      <List items={[
        <><K>Reads unified (u1…) addresses</K> — decodes them into transparent, Sapling &amp; Orchard receivers. Most explorers can&apos;t parse a u-address at all.</>,
        <><K>Shows on-chain memos</K> — the encrypted note text on shielded transactions, when it&apos;s yours to see.</>,
        <><K>Miner identity</K> — resolves the pool/tag behind a block, not just the coinbase.</>,
        <><K>Visual by default</K> — Block Map and Chain Pulse turn a block into something you can read at a glance.</>,
        <><K>Jump to history</K> — one click to Zcash&apos;s landmark blocks.</>,
        <><K>It&apos;s an OS</K> — every result is a draggable window, themeable, at any font size. Explore many things at once.</>,
      ]} />
    </>,
  },
  {
    id: 'search', title: 'Search',
    body: <>
      <H>Search</H>
      <P>One bar, many inputs. It accepts:</P>
      <List items={[
        <>Block <K>height</K> or block <K>hash</K></>,
        <>Transaction <K>id (txid)</K></>,
        <>Transparent <K>t-address</K></>,
        <>Shielded <K>z-address</K> and unified <K>u-address</K></>,
      ]} />
      <P>Leave the type on <K>Auto-detect</K>, or tap a type chip to force it.</P>
    </>,
  },
  {
    id: 'jump', title: 'Jump to history',
    body: <>
      <H>Jump to history</H>
      <P>The <K>⌚ Jump</K> button opens a list of landmark Zcash blocks — launch, halvings, network upgrades.</P>
      <P>Pick one to leap straight to that block. Great for exploring the chain&apos;s big moments without hunting for heights.</P>
    </>,
  },
  {
    id: 'block', title: 'Reading a block',
    body: <>
      <H>Reading a block</H>
      <P>A block view is grouped into clear sections:</P>
      <List items={[
        <>Timestamp, transactions, confirmations, size, interval.</>,
        <><K>Miner</K> — pool tag, reward, and address (click it to explore).</>,
        <><K>Shielded activity</K> and transaction composition.</>,
      ]} />
      <P>Walk the chain with <K>← Prev / Next →</K>, or open the raw <K>{'{ }'}</K> JSON.</P>
    </>,
  },
  {
    id: 'visualize', title: 'Visualize',
    body: <>
      <H>Visualize</H>
      <P>From any block with transactions:</P>
      <List items={[
        <><K>🗺 Block Map</K> — every transaction as a tile; click one to open it.</>,
        <><K>✦ Chain Pulse</K> — the block&apos;s rhythm and shape at a glance.</>,
      ]} />
      <P>Both open in their own windows so you can compare side by side.</P>
    </>,
  },
  {
    id: 'addresses', title: 'Addresses & memos',
    body: <>
      <H>Addresses & memos</H>
      <P>Paste a unified <K>u1…</K> address and hit <K>Decode</K> to split it into its transparent, Sapling, and Orchard receivers — copy the one you need.</P>
      <P>Where a memo is yours to see, we surface the on-chain <K>memo text</K> — something most explorers never show you.</P>
    </>,
  },
  {
    id: 'mempool', title: 'Mempool',
    body: <>
      <H>Mempool</H>
      <P>The <K>⏳ Mempool</K> button opens a live view of pending, unconfirmed transactions — the chain&apos;s waiting room, updating in real time.</P>
    </>,
  },
  {
    id: 'tips', title: 'Tips',
    body: <>
      <H>Tips</H>
      <List items={[
        <>Clicks open <K>new windows</K> — drag them around, keep several open.</>,
        <>Any hash or address has a one-tap <K>copy</K> button.</>,
        <>The block ticker at the bottom of the desktop is clickable too.</>,
        <>Everything respects your theme and font size (Tools → Settings).</>,
      ]} />
    </>,
  },
];

export function ExplorerManual({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(0);

  return (
    <div
      onClick={onClose}
      style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(760px, 100%)', height: 'min(560px, 100%)', display: 'flex', flexDirection: 'column',
          background: 'var(--bg-window)', border: '1px solid var(--border-window)', borderRadius: 10,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden', fontSize: 'var(--font-size-icon)',
        }}
      >
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-window)', background: 'var(--bg-inset)' }}>
          <span style={{ color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: 0.3 }}>📖 Explorer Manual</span>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--text-amber)', cursor: 'pointer', fontSize: 'var(--font-size-menu)', lineHeight: 1 }}>✕</button>
        </div>

        {/* body: sidebar + content */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <nav style={{ width: 170, flexShrink: 0, borderRight: '1px solid var(--border-window)', background: 'var(--bg-inset)', overflowY: 'auto', padding: '8px 0' }}>
            {TOPICS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 14px', cursor: 'pointer',
                  background: i === active ? 'color-mix(in srgb, var(--accent-gold), transparent 85%)' : 'transparent',
                  borderLeft: `3px solid ${i === active ? 'var(--accent-gold)' : 'transparent'}`,
                  color: i === active ? 'var(--accent-gold)' : 'var(--text-primary)',
                  border: 'none', borderLeftWidth: 3, borderLeftStyle: 'solid',
                  fontWeight: i === active ? 700 : 400,
                }}
              >
                {t.title}
              </button>
            ))}
          </nav>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
            {TOPICS[active].body}
          </div>
        </div>
      </div>
    </div>
  );
}
