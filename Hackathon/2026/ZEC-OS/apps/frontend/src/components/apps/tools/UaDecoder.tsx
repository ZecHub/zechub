'use client';

import { useState, useEffect, useCallback } from 'react';
import { useExplorerStore } from '@/store/explorerStore';
import { useWindowStore } from '@/store/windowStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { AppLoader } from '@/components/ui/AppLoader';

// Receiver type returned by the backend
interface Receiver {
  type: 'transparent' | 'sapling' | 'orchard' | string;
  address?: string;
  diversifiedTransmissionKey?: string;
  rawBytes?: string;
  [key: string]: unknown;
}

interface DecodeResult {
  address?: string;
  network?: string;
  isValid?: boolean;
  type?: string;
  receivers?: Receiver[];
  error?: string;
  [key: string]: unknown;
}

const RECEIVER_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  transparent: { label: 'Transparent (P2PKH)', color: 'var(--text-amber)', icon: 'T' },
  sapling:     { label: 'Sapling (Shielded)',  color: 'var(--accent-purple)', icon: 'S' },
  orchard:     { label: 'Orchard (Shielded)',  color: 'var(--accent-green)',  icon: 'O' },
};

function truncate(s: string, n = 24): string {
  if (!s || s.length <= n) return s;
  return `${s.slice(0, n / 2)}…${s.slice(-n / 2)}`;
}

function copyText(s: string) {
  navigator.clipboard.writeText(s).catch(() => {});
}

function ReceiverRow({ r, onExplore }: { r: Receiver; onExplore?: (addr: string) => void }) {
  const meta = RECEIVER_LABELS[r.type] ?? { label: r.type, color: 'var(--text-green)', icon: '?' };
  const displayValue = r.address || r.diversifiedTransmissionKey || r.rawBytes || '';
  const [rowCopied, setRowCopied] = useState(false);

  const handleRowCopy = () => {
    copyText(displayValue);
    setRowCopied(true);
    setTimeout(() => setRowCopied(false), 1500);
  };

  return (
    <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-inset)]">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-5 h-5 flex items-center justify-center text-xs font-bold border"
          style={{ borderColor: meta.color, color: meta.color }}
        >
          {meta.icon}
        </span>
        <span className="text-xs font-bold" style={{ color: meta.color }}>{meta.label}</span>
        {r.address && onExplore && (
          <button
            onClick={() => onExplore(r.address!)}
            className="ml-auto text-xs text-[var(--accent-purple)] hover:text-[var(--accent-gold)] border border-[var(--border-window)] px-2 py-0.5"
          >
            Explore ↗
          </button>
        )}
      </div>
      {displayValue && (
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-green)] text-xs font-mono break-all flex-1 leading-relaxed">
            {displayValue}
          </span>
          <button
            onClick={handleRowCopy}
            className={`shrink-0 text-xs border border-[var(--border-window)] px-2 py-0.5 transition-colors ${
              rowCopied
                ? 'text-[var(--accent-green)] border-[var(--accent-green)]/50'
                : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
            }`}
          >
            {rowCopied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      {/* Extra fields for advanced display */}
      {Object.entries(r).filter(([k]) => !['type','address','diversifiedTransmissionKey','rawBytes'].includes(k)).map(([k, v]) => (
        <div key={k} className="mt-1 text-xs text-[var(--text-muted)]">
          <span className="text-[var(--text-amber)]">{k}:</span>{' '}
          <span className="font-mono">{String(v).slice(0, 80)}</span>
        </div>
      ))}
    </div>
  );
}

export default function UaDecoder({ windowId }: { windowId?: string }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecodeResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);

  // Consume queued address from Explorer "DECODE ↗" button
  const { consumeAction } = useExplorerStore();

  useEffect(() => {
    if (!windowId) return;
    const action = consumeAction(windowId);
    if (action?.mode === 'search' && action.query) {
      setInput(action.query);
      decode(action.query);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowId]);

  const decode = useCallback(async (addr: string) => {
    const q = addr.trim();
    if (!q) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/decode-address?address=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (!res.ok) {
        setResult({ error: json.error || `HTTP ${res.status}` });
      } else {
        setResult(json);
      }
    } catch {
      setResult({ error: 'Network error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = () => decode(input);

  const openInExplorer = (addr: string) => {
    const { windows, openWindow } = useWindowStore.getState();
    const { queueSearch } = useExplorerStore.getState();
    const pos = calculateWindowPosition(windows, { width: 700, height: 600 }, window.innerWidth, window.innerHeight);
    const id = `explorer-${Date.now()}`;
    openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size: { width: 700, height: 600 }, minSize: { width: 500, height: 400 } });
    queueSearch(id, addr, 't-address');
  };

  const copyAllJson = () => {
    if (!result) return;
    copyText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const receivers: Receiver[] = result?.receivers ?? [];

  return (
    <div className="flex flex-col h-full bg-[var(--bg-window)] p-3 gap-3 font-mono text-sm overflow-hidden">
      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Paste a Zcash address (u1…, t1…, zs1…)"
          className="flex-1 bg-[var(--bg-inset)] border border-[var(--border-window)] text-[var(--text-green)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-gold)]"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="btn-window px-4 py-2 text-[var(--accent-gold)] disabled:opacity-50"
        >
          {loading ? '…' : 'Decode'}
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {!result && !loading && (
          <div className="text-[var(--text-muted)] text-xs text-center py-8">
            Enter any Zcash address to inspect its receiver components.<br />
            <span className="text-[var(--accent-gold)]">Unified Addresses</span> (u1…) may contain transparent, Sapling, and Orchard receivers.
          </div>
        )}

        {loading && (
          <div className="py-8"><AppLoader /></div>
        )}

        {result?.error && (
          <div className="text-[var(--accent-orange)] border border-[var(--accent-orange)]/30 p-3">
            {result.error}
          </div>
        )}

        {result && !result.error && (
          <>
            {/* Address summary */}
            <div className="border border-[var(--accent-gold)]/30 bg-[#0a0c14] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wide">
                  {result.type ?? (result.receivers?.length ? 'Unified Address' : 'Address')}
                </span>
                {result.network && (
                  <span className="text-xs text-[var(--text-muted)] border border-[var(--border-window)] px-2 py-0.5">
                    {result.network}
                  </span>
                )}
              </div>
              <div className="text-[var(--text-green)] text-xs break-all leading-relaxed">
                {result.address ?? input.trim()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    copyText(result.address ?? input.trim());
                    setCopiedAddr(true);
                    setTimeout(() => setCopiedAddr(false), 1500);
                  }}
                  className={`text-xs border border-[var(--border-window)] px-2 py-0.5 transition-colors ${
                    copiedAddr
                      ? 'text-[var(--accent-green)] border-[var(--accent-green)]/50'
                      : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)]'
                  }`}
                >
                  {copiedAddr ? '✓ Copied' : 'Copy address'}
                </button>
                <button
                  onClick={copyAllJson}
                  className="text-xs border border-[var(--border-window)] text-[var(--text-muted)] hover:text-[var(--accent-gold)] px-2 py-0.5"
                >
                  {copied ? '✓ Copied' : 'Copy JSON'}
                </button>
              </div>
            </div>

            {/* Receivers */}
            {receivers.length > 0 ? (
              <div className="space-y-2">
                <div className="text-[var(--text-muted)] text-xs uppercase tracking-wide">
                  {receivers.length} receiver{receivers.length !== 1 ? 's' : ''} found
                </div>
                {receivers.map((r, i) => (
                  <ReceiverRow
                    key={i}
                    r={r}
                    onExplore={r.address ? openInExplorer : undefined}
                  />
                ))}
              </div>
            ) : (
              // Non-UA address — show key fields
              <div className="space-y-2">
                {Object.entries(result)
                  .filter(([k]) => !['address','type','network','error','receivers'].includes(k))
                  .map(([k, v]) => (
                    <div key={k} className="border border-[var(--border-window)] p-2 text-xs flex gap-3">
                      <span className="text-[var(--text-amber)] w-32 shrink-0">{k}</span>
                      <span className="text-[var(--text-green)] font-mono break-all">{String(v).slice(0, 200)}</span>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
