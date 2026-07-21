'use client';

import { useState, useRef } from 'react';
import { useWatchlistStore, PALETTE } from '@/store/watchlistStore';
import { useWindowStore } from '@/store/windowStore';
import { useExplorerStore } from '@/store/explorerStore';
import { useAuthStore } from '@/store/authStore';
import { useGuestPromptStore } from '@/store/guestPromptStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';

function truncAddr(addr: string) {
  if (addr.length <= 20) return addr;
  return `${addr.slice(0, 10)}…${addr.slice(-6)}`;
}

function copyText(s: string) {
  navigator.clipboard.writeText(s).catch(() => {});
}

function openInExplorer(address: string) {
  const { windows, openWindow } = useWindowStore.getState();
  const { queueSearch } = useExplorerStore.getState();
  const id = `explorer-addr-${address.slice(0, 8)}`;
  const size = { width: 860, height: 880 };
  const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
  if (windows.find(w => w.id === id)) { useWindowStore.getState().focusWindow(id); return; }
  const addrType = address.startsWith('zs') ? 'z-address' : address.startsWith('u1') ? 'z-address' : 't-address';
  openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size, minSize: { width: 520, height: 480 } });
  queueSearch(id, address, addrType);
}

function EditableLabel({ address, label }: { address: string; label: string }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(label);
  const { updateLabel } = useWatchlistStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const trimmed = value.trim();
    if (trimmed) updateLabel(address, trimmed);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false); }}
        autoFocus
        className="bg-transparent border-b border-[var(--accent-gold)] text-[var(--text-green)] text-xs font-mono outline-none w-full"
      />
    );
  }

  return (
    <span
      className="text-[var(--accent-gold)] text-xs font-bold cursor-text hover:underline"
      onClick={() => { setValue(label); setEditing(true); }}
      title="Click to rename"
    >
      {label}
    </span>
  );
}

export default function Watchlist({ windowId: _windowId }: { windowId?: string }) {
  const { addresses, addAddress, removeAddress, updateColor, isWatched } = useWatchlistStore();
  const { isGuest, isAuthenticated, displayName, walletAddress } = useAuthStore();
  const showGuestPrompt = useGuestPromptStore((s) => s.show);
  const [newAddr, setNewAddr] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [addError, setAddError] = useState('');

  const handleAdd = () => {
    if (isGuest) {
      showGuestPrompt('Sign in to save your watchlist across sessions.');
      return;
    }
    const addr = newAddr.trim();
    if (!addr) return;
    if (isWatched(addr)) { setAddError('Already in watchlist'); return; }
    addAddress(addr, newLabel.trim() || undefined);
    setNewAddr('');
    setNewLabel('');
    setAddError('');
  };

  const footerText = !isAuthenticated
    ? 'Stored locally · Sign in to sync'
    : isGuest
      ? 'Guest session · Data not saved'
      : `Synced to ${displayName ?? (walletAddress ? `${walletAddress.slice(0, 8)}…` : 'account')}`;

  return (
    <div className="flex flex-col h-full bg-[var(--bg-window)] font-mono text-sm overflow-hidden">
      {/* Guest banner */}
      {isGuest && (
        <div
          style={{
            background: '#1a0a00',
            borderBottom: '1px solid #f97316',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            fontSize: '11px',
          }}
        >
          <span style={{ color: '#fdba74' }}>
            ⚠ Guest mode — watchlist won&apos;t be saved.
          </span>
          <button
            onClick={() => { useAuthStore.getState().logout(); window.location.reload(); }}
            style={{
              background: 'transparent',
              border: '1px solid #f97316',
              color: '#f97316',
              fontFamily: 'monospace',
              fontSize: '10px',
              padding: '2px 8px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Sign In
          </button>
        </div>
      )}
      {/* Add row */}
      <div className="p-3 border-b border-[var(--border-window)] space-y-2 shrink-0">
        <div className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wide">Watch Address</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAddr}
            onChange={e => { setNewAddr(e.target.value); setAddError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="t1… / zs1… / u1…"
            className="flex-1 bg-[var(--bg-inset)] border border-[var(--border-window)] text-[var(--text-green)] px-2 py-1.5 text-xs focus:outline-none focus:border-[var(--accent-gold)]"
          />
          <input
            type="text"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Label (optional)"
            className="w-32 bg-[var(--bg-inset)] border border-[var(--border-window)] text-[var(--text-green)] px-2 py-1.5 text-xs focus:outline-none focus:border-[var(--accent-gold)]"
          />
          <button
            onClick={handleAdd}
            disabled={!newAddr.trim()}
            className="btn-window px-3 py-1.5 text-[var(--accent-gold)] text-xs disabled:opacity-50"
          >
            Add
          </button>
        </div>
        {addError && <div className="text-[var(--accent-orange)] text-xs">{addError}</div>}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {addresses.length === 0 ? (
          <div className="text-[var(--text-muted)] text-xs text-center py-12 leading-relaxed px-6">
            No addresses watched yet.<br />
            Add a Zcash address above to track it here.
          </div>
        ) : (
          addresses.map(entry => (
            <div
              key={entry.address}
              className="border-b border-[var(--border-window)] px-3 py-3 flex gap-3 items-start hover:bg-[var(--bg-inset)]"
              style={{ borderLeft: `3px solid ${entry.color}` }}
            >
              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <EditableLabel address={entry.address} label={entry.label} />
                <div className="flex items-center gap-2">
                  <span
                    className="text-[var(--text-green)] text-xs font-mono cursor-pointer hover:text-[var(--accent-gold)] truncate"
                    onClick={() => copyText(entry.address)}
                    title={entry.address}
                  >
                    {truncAddr(entry.address)}
                  </span>
                  <button
                    onClick={() => copyText(entry.address)}
                    className="shrink-0 text-[10px] px-1 py-px border border-[var(--border-window)] text-[var(--text-muted)] hover:text-[var(--accent-gold)]"
                  >
                    copy
                  </button>
                  <button
                    onClick={() => openInExplorer(entry.address)}
                    className="shrink-0 text-[10px] px-1.5 py-px border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)]"
                  >
                    ↗ explore
                  </button>
                </div>
              </div>

              {/* Color swatches */}
              <div className="shrink-0 flex gap-1 items-center pt-0.5">
                {PALETTE.map(c => (
                  <button
                    key={c}
                    onClick={() => updateColor(entry.address, c)}
                    className="w-4 h-4 rounded-sm transition-transform hover:scale-125"
                    style={{
                      background: c,
                      outline: entry.color === c ? `2px solid ${c}` : 'none',
                      outlineOffset: 1,
                    }}
                    title={c}
                  />
                ))}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeAddress(entry.address)}
                className="shrink-0 text-xs text-[var(--text-muted)] hover:text-[var(--accent-orange)] border border-[var(--border-window)] w-6 h-6 flex items-center justify-center"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 px-3 py-2 border-t border-[var(--border-window)] text-[var(--text-muted)] text-[10px]">
        {addresses.length} address{addresses.length !== 1 ? 'es' : ''} · {footerText}
      </div>
    </div>
  );
}
