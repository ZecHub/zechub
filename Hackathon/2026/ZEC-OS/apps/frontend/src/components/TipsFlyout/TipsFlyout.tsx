'use client';

import { useEffect, useRef, useState } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

// A friendly tip slides out from the top-right every few minutes: how to use
// ZEC-OS, what makes it different from other explorers, Dark Forest secrets, and
// the occasional nudge about why shielding matters on Zcash.

interface Tip { tag: string; text: string; }

const TIPS: Tip[] = [
  // ── Getting around ZEC-OS ──
  { tag: 'SETTINGS', text: 'Prefer bigger text? Tools → Settings → Font Size now has an XL setting that scales the whole OS.' },
  { tag: 'SETTINGS', text: 'Tools → Settings lets you flip every icon to retro ASCII, tune the master volume, and pick your date/time format.' },
  { tag: 'DESKTOP', text: 'Drag any desktop icon or folder wherever you like — ZEC-OS remembers where you put it.' },
  { tag: 'THEMES', text: 'Open Themes to reskin the entire OS — CRT green, golden-gate, millennium, and more. Each restyles borders, buttons, and the taskbar.' },
  { tag: 'WINDOWS', text: 'Windows are fully draggable and resizable. If one ever drifts off-screen, reopening it snaps it back into view.' },
  { tag: 'SOUND', text: 'Every click, toggle, and BBS bleep is a real 8-bit sound. Slide the taskbar volume to 0 for silence.' },

  // ── The Explorer / data tools (what other explorers DON'T do) ──
  { tag: 'EXPLORER', text: 'Our Explorer decodes Zcash UNIFIED addresses — it splits them into their transparent, Sapling, and Orchard receivers. Most explorers can\'t read a u-address at all.' },
  { tag: 'EXPLORER', text: 'Paste a long unified address into the decoder on the login screen to shorten and inspect it — handy before you send.' },
  { tag: 'EXPLORER', text: 'ZEC-OS reads on-chain MEMOS. Other blockchain explorers show you amounts; we show you the encrypted note text when it\'s yours to see.' },
  { tag: 'PRIVACY', text: 'The Privacy Weather app reports the shielded/transparent "climate" of the chain — a live read on network privacy you won\'t find elsewhere.' },
  { tag: 'CHARTS', text: 'The Charts folder tracks the shielded pool over time. Watching it grow is watching Zcash privacy adoption in real time.' },
  { tag: 'WIDGETS', text: 'The Widgets folder has a floating block ticker you can leave running on the desktop while you do other things.' },

  // ── Why privacy / shielding matters ──
  { tag: 'SHIELD', text: 'Transparent ZEC is as public as Bitcoin. Shielding your funds (z-address / unified) is what makes Zcash actually private. Shield early, shield often.' },
  { tag: 'SHIELD', text: 'Every shielded transaction strengthens the anonymity set for everyone. Using privacy is how you protect it — for yourself and others.' },
  { tag: 'SHIELD', text: 'A memo on a shielded transaction is encrypted end-to-end — only sender and receiver can read it. That\'s a private note attached to money.' },
  { tag: 'SHIELD', text: 'Reusing transparent addresses links your whole history. Shielded addresses don\'t leak a running balance or a payment graph.' },

  // ── Accounts, verification, tournaments ──
  { tag: 'ACCOUNT', text: 'Verify wallet ownership once, set a password, and log in fast next time. Click your handle in the top bar to manage your account.' },
  { tag: 'SECURITY', text: 'Only one session per account: logging in somewhere new signs the old session out. If you get kicked, someone (maybe you) just logged in elsewhere.' },
  { tag: 'TOURNEY', text: 'Dark Forest and Shmup have real paid tournaments — enter with a tiny ZEC memo payment, and winners are paid out on-chain by rank.' },
  { tag: 'TOURNEY', text: 'Tournament leaderboards are committed on-chain with a hash when they close — the rankings can\'t be quietly rewritten after the fact.' },
  { tag: 'BBS', text: 'The BBS (Dark Forest door) has message boards, private mail, and a live chat lounge — a whole 90s bulletin board hiding in your explorer.' },

  // ── Dark Forest RPG clues ──
  { tag: 'RPG', text: 'Dark Forest clue: the West is never barred by level — only by consequences. Something out there outranks you until you\'re strong enough.' },
  { tag: 'RPG', text: 'Dark Forest clue: dungeons start soft on the upper floors and sharpen as you descend. Dive deep only when your gear can take it.' },
  { tag: 'RPG', text: 'Dark Forest clue: some staircases are dead-end SIDE stairs — a sealed bonus room. Grab the loot, climb back, and take a real stair down.' },
  { tag: 'RPG', text: 'Dark Forest clue: watch the floor. Trap doors drop you several levels at once — usually into an up-only pocket. Find the rope and climb out.' },
  { tag: 'RPG', text: 'Dark Forest clue: the four Towers are permanent once conquered. Hold two or more and you can TELEPORT between them for free.' },
  { tag: 'RPG', text: 'Dark Forest clue: drink at a tavern for XP and a combat buff — but the hangover is real. Sleep it off at an inn before a hard fight.' },
  { tag: 'RPG', text: 'Dark Forest clue: hidden Ruins hold the oldest, richest loot on the map. No compass admits they exist — you have to stumble in.' },
  { tag: 'RPG', text: 'Dark Forest clue: press U almost anywhere to quick-use a healing item from a numbered menu. Keep a ZK potion handy for casters.' },
  { tag: 'RPG', text: 'Dark Forest oddity: there is a 2% chance a Quantum Squirrel bonks you to a random spot on the map. Coordinates are a social construct.' },
  { tag: 'RPG', text: 'Dark Forest clue: beat a dungeon boss once and it stays cleared — you can still re-dive for XP, just no fresh hoard.' },
  { tag: 'RPG', text: 'Dark Forest clue: villages offer less than towns, but there are many of them. Great for a quick top-up between fights.' },

  // ── Little delights ──
  { tag: 'TIP', text: 'The Terminal is a real retro shell — try poking around, it answers.' },
  { tag: 'TIP', text: 'Sysops (verified admins) get extra desktop tools. If you\'re not seeing them, you\'re not orb. 😉' },
  { tag: 'ZCASH', text: 'Zcash gives you the CHOICE: transparent when you want auditability, shielded when you want privacy. Same coin, your call.' },
  { tag: 'ZCASH', text: 'Financial privacy isn\'t about hiding — it\'s about not broadcasting your salary, savings, and every purchase to the entire world.' },
];

const FIRST_DELAY_MS = 20_000;   // first tip ~20s after load
const VISIBLE_MS = 16_000;       // auto-dismiss after 16s

export function TipsFlyout() {
  const tipsEnabled = useSettingsStore((s) => s.tipsEnabled);
  const tipsIntervalMin = useSettingsStore((s) => s.tipsIntervalMin);
  const setTipsEnabled = useSettingsStore((s) => s.setTipsEnabled);
  const setTipsIntervalMin = useSettingsStore((s) => s.setTipsIntervalMin);

  const [tip, setTip] = useState<Tip | null>(null);
  const [shown, setShown] = useState(false);   // controls slide-in
  const [offNote, setOffNote] = useState(false); // showing the "turned off" note
  const lastIdx = useRef(-1);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pick = (): Tip => {
    let i = Math.floor(Math.random() * TIPS.length);
    if (TIPS.length > 1) while (i === lastIdx.current) i = Math.floor(Math.random() * TIPS.length);
    lastIdx.current = i;
    return TIPS[i];
  };

  const show = () => {
    setOffNote(false);
    setTip(pick());
    setShown(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShown(false), VISIBLE_MS);
  };

  // Schedule tips; re-schedules whenever enabled/interval changes.
  useEffect(() => {
    if (!tipsEnabled) { setShown(false); return; }
    const intervalMs = Math.max(1, tipsIntervalMin) * 60_000;
    const first = setTimeout(show, FIRST_DELAY_MS);
    const iv = setInterval(show, intervalMs);
    return () => { clearTimeout(first); clearInterval(iv); if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [tipsEnabled, tipsIntervalMin]);

  const turnOff = () => {
    // Show the confirmation note in-place, then slide away and disable.
    setOffNote(true);
    setShown(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => { setShown(false); setTipsEnabled(false); }, 6_000);
  };

  const showLessOften = () => {
    setTipsIntervalMin(6);
    setShown(false);
  };

  if (!tip && !offNote) return null;

  // All colors + sizes come from theme CSS variables, so the flyout matches the
  // active theme (including light themes with dark text) and the OS font-size.
  const btnStyle: React.CSSProperties = {
    flex: 1, background: 'transparent', border: '1px solid var(--border-window)',
    color: 'var(--text-secondary)', borderRadius: 5, padding: '6px 8px', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: 'var(--font-size-trinket)',
  };

  return (
    <div
      style={{
        position: 'fixed', top: 56, right: shown ? 16 : -420, zIndex: 99998,
        width: 340, maxWidth: '80vw',
        transition: 'right 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms',
        opacity: shown ? 1 : 0,
        fontFamily: 'var(--font-body)',
      }}
      role="status"
      aria-live="polite"
    >
      <div style={{ background: 'var(--bg-window)', border: '2px solid var(--accent-gold)', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.45)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-window)', padding: '6px 10px', fontWeight: 'bold', letterSpacing: '0.5px', color: 'var(--accent-gold)', fontSize: 'var(--font-size-trinket)' }}>
          <span>💡 ZEC-OS TIP{!offNote && tip ? <> · <span style={{ opacity: 0.7 }}>{tip.tag}</span></> : null}</span>
          <button onClick={() => setShown(false)} aria-label="Dismiss tip" style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', fontSize: 'var(--font-size-trinket)', lineHeight: 1, fontWeight: 'bold', padding: 0 }}>✕</button>
        </div>
        {offNote ? (
          <div style={{ color: 'var(--text-primary)', padding: '14px', fontSize: 'var(--font-size-trinket)', lineHeight: 1.5 }}>
            Tips are off. You can turn them back on from <span style={{ color: 'var(--accent-gold)' }}>Tools → Settings</span>.
          </div>
        ) : (
          <>
            <div style={{ color: 'var(--text-primary)', padding: '12px 14px 10px', fontSize: 'var(--font-size-trinket)', lineHeight: 1.5 }}>
              {tip?.text}
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 14px 12px' }}>
              <button onClick={turnOff} style={btnStyle}>Turn off</button>
              <button onClick={showLessOften} title="A tip every 6 minutes" style={btnStyle}>Show less often</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
