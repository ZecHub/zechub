'use client';

// Sysop private line — a floating window above everything in ZEC-OS.
// The sysop opens a line from the BBS Sysop Console; the target user gets a
// request they can accept or decline. The sysop can force a declined line
// open (god powers). Mounted globally so it appears no matter which app the
// user is in.

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';

interface DmMsg { id: string; handle: string; kind: string; body: string; at: string }
interface Dm { id: string; status: string; peer: string; iAmAdmin: boolean; messages: DmMsg[] }

const C = { bg: '#000010', border: '#00AAAA', title: '#0000AA', gold: '#FFFF55', cyan: '#55FFFF', green: '#55FF55', gray: '#AAAAAA', dim: '#555555', red: '#FF5555', white: '#FFFFFF' };

export function SysopChat() {
  const { sessionToken, isVerified, isGuest } = useAuthStore();
  const authed = Boolean(sessionToken && isVerified && !isGuest);

  const [dm, setDm] = useState<Dm | null>(null);
  const [msgs, setMsgs] = useState<DmMsg[]>([]);
  const [input, setInput] = useState('');
  const [hidden, setHidden] = useState(false); // user minimized an open line
  const since = useRef<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const activeId = useRef<string | null>(null);

  const poll = useCallback(async () => {
    if (!authed) return;
    try {
      const qs = since.current ? `?since=${encodeURIComponent(since.current)}` : '';
      const r = await fetch(`/api/bbs/chat/dm${qs}`, { headers: { Authorization: `Bearer ${sessionToken}` } });
      if (!r.ok) return;
      const d = await r.json();
      if (!d.dm) { setDm(null); setMsgs([]); since.current = null; activeId.current = null; return; }
      if (activeId.current !== d.dm.id) { setMsgs([]); since.current = null; activeId.current = d.dm.id; setHidden(false); }
      setDm(d.dm);
      if (d.dm.messages?.length) {
        setMsgs((prev) => [...prev, ...d.dm.messages].slice(-100));
        since.current = d.dm.messages[d.dm.messages.length - 1].at;
        setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } catch { /* next poll */ }
  }, [authed, sessionToken]);

  // Slow poll to notice new requests; fast poll while a line is open
  useEffect(() => {
    if (!authed) return;
    poll();
    const open = dm && ['accepted', 'forced'].includes(dm.status);
    const iv = setInterval(poll, open ? 3000 : dm ? 5000 : 15000);
    return () => clearInterval(iv);
  }, [authed, poll, dm]);

  const respond = async (accept: boolean) => {
    if (!dm) return;
    await fetch('/api/bbs/chat/dm/respond', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` }, body: JSON.stringify({ id: dm.id, accept }) }).catch(() => {});
    if (!accept) { setDm(null); activeId.current = null; }
    poll();
  };
  const force = async () => {
    if (!dm) return;
    await fetch('/api/bbs/chat/dm/force', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` }, body: JSON.stringify({ id: dm.id }) }).catch(() => {});
    poll();
  };
  const close = async () => {
    if (!dm) return;
    await fetch('/api/bbs/chat/dm/close', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` }, body: JSON.stringify({ id: dm.id }) }).catch(() => {});
    setDm(null); setMsgs([]); since.current = null; activeId.current = null;
  };
  const send = async () => {
    const body = input.trim();
    if (!body || !dm) return;
    setInput('');
    await fetch('/api/bbs/chat/dm/send', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` }, body: JSON.stringify({ id: dm.id, body }) }).catch(() => {});
    poll();
  };

  if (!authed || !dm) return null;

  const mono = { fontFamily: 'monospace', fontSize: '12px' } as const;

  // Incoming request (target user)
  if (dm.status === 'pending' && !dm.iAmAdmin) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...mono, width: 380, border: `2px solid ${C.border}`, background: C.bg, boxShadow: `4px 4px 0 ${C.title}` }}>
          <div style={{ background: C.title, color: C.gold, padding: '6px 12px' }}>⚡ SYSOP LINE — incoming</div>
          <div style={{ padding: '14px 16px' }}>
            <div style={{ color: C.white, marginBottom: 12 }}>The sysop requests a private line with you.</div>
            <div style={{ color: C.dim, fontSize: '11px', marginBottom: 14 }}>Accept to talk. Decline politely. (The sysop has override powers. This is a formality. A polite one.)</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => respond(true)} style={{ ...mono, background: 'transparent', border: `1px solid ${C.green}`, color: C.green, padding: '5px 14px', cursor: 'pointer' }}>ACCEPT</button>
              <button onClick={() => respond(false)} style={{ ...mono, background: 'transparent', border: `1px solid ${C.red}`, color: C.red, padding: '5px 14px', cursor: 'pointer' }}>DECLINE</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin waiting / declined
  if (['pending', 'declined'].includes(dm.status) && dm.iAmAdmin) {
    return (
      <div style={{ position: 'fixed', bottom: 60, right: 16, zIndex: 100000, ...mono, width: 300, border: `2px solid ${C.border}`, background: C.bg, boxShadow: `4px 4px 0 ${C.title}` }}>
        <div style={{ background: C.title, color: C.gold, padding: '4px 10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>⚡ SYSOP LINE → {dm.peer}</span>
          <button onClick={close} style={{ ...mono, background: 'transparent', border: 'none', color: C.cyan, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ color: dm.status === 'declined' ? C.red : C.gray, fontSize: '11px', marginBottom: 10 }}>
            {dm.status === 'declined' ? `${dm.peer} declined the line.` : `Awaiting ${dm.peer}…`}
          </div>
          <button onClick={force} style={{ ...mono, background: 'transparent', border: `1px solid ${C.red}`, color: C.red, padding: '4px 12px', cursor: 'pointer' }}>
            FORCE OPEN (god powers)
          </button>
        </div>
      </div>
    );
  }

  if (!['accepted', 'forced'].includes(dm.status)) return null;

  if (hidden) {
    return (
      <button onClick={() => setHidden(false)}
        style={{ ...mono, position: 'fixed', bottom: 60, right: 16, zIndex: 100000, background: C.bg, border: `2px solid ${C.border}`, color: C.gold, padding: '6px 12px', cursor: 'pointer' }}>
        ⚡ SYSOP LINE ({dm.peer})
      </button>
    );
  }

  // Open line — floats above everything
  return (
    <div style={{ position: 'fixed', bottom: 60, right: 16, zIndex: 100000, ...mono, width: 360, height: 320, border: `2px solid ${C.border}`, background: C.bg, boxShadow: `4px 4px 0 ${C.title}`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: C.title, color: C.gold, padding: '4px 10px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
        <span>⚡ SYSOP LINE — {dm.peer}{dm.status === 'forced' ? ' (forced)' : ''}</span>
        <span>
          <button onClick={() => setHidden(true)} title="minimize" style={{ ...mono, background: 'transparent', border: 'none', color: C.cyan, cursor: 'pointer', marginRight: 6 }}>▁</button>
          <button onClick={close} title="close line" style={{ ...mono, background: 'transparent', border: 'none', color: C.cyan, cursor: 'pointer' }}>✕</button>
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
        {msgs.length === 0 && <div style={{ color: C.dim, fontSize: '11px' }}>The line is open. Someone should say something.</div>}
        {msgs.map((m) => {
          const t = new Date(m.at).toTimeString().slice(0, 5);
          if (m.kind === 'system') return <div key={m.id} style={{ color: C.dim, fontSize: '11px' }}>[{t}] *** {m.body}</div>;
          return <div key={m.id}><span style={{ color: C.dim }}>[{t}]</span> <span style={{ color: C.gold }}>&lt;{m.handle}&gt;</span> <span style={{ color: C.white }}>{m.body}</span></div>;
        })}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 4, padding: 6, flexShrink: 0 }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="private line…"
          maxLength={300}
          style={{ ...mono, flex: 1, background: '#111', border: '1px solid #2a3a2a', color: C.green, padding: '4px 8px', outline: 'none' }}
        />
        <button onClick={send} style={{ ...mono, background: 'transparent', border: `1px solid ${C.gold}`, color: C.gold, padding: '4px 10px', cursor: 'pointer' }}>SEND</button>
      </div>
    </div>
  );
}
