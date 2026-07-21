'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { useWindowStore } from '@/store/windowStore';
import { useExplorerStore } from '@/store/explorerStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { ZCASH_HISTORY, nearestEvent, estimateHeightFromDate, type ZcashEvent } from '@/data/zcashHistory';
import { AppLoader } from '@/components/ui/AppLoader';
import { ExplorerManual } from '@/components/apps/ExplorerManual';

type SearchType = 'auto' | 't-address' | 'z-address' | 'transaction' | 'block';

// ============================================
// Privacy Alert Types and Analysis
// ============================================

type AlertSeverity = 'info' | 'low' | 'medium' | 'high';

interface PrivacyAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
}

function getSeverityColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'high': return '#ff4444';
    case 'medium': return '#ff8800';
    case 'low': return '#ffcc00';
    case 'info': return 'var(--accent-purple)';
  }
}

function getSeverityBg(severity: AlertSeverity): string {
  switch (severity) {
    case 'high': return 'rgba(255, 68, 68, 0.15)';
    case 'medium': return 'rgba(255, 136, 0, 0.12)';
    case 'low': return 'rgba(255, 204, 0, 0.1)';
    case 'info': return 'rgba(153, 102, 255, 0.1)';
  }
}

// Check if a number is "round" (likely fingerprint)
function isRoundNumber(value: number): boolean {
  if (value === 0) return false;
  // Check for whole numbers or common fractions
  const rounded = Math.round(value * 100) / 100;
  if (rounded !== value) return false;
  // Check if it's a "nice" number like 1, 5, 10, 25, 50, 100, etc.
  const str = value.toString();
  if (str.match(/^[125]0*$/)) return true;
  if (str.match(/^\d+\.0+$/)) return true;
  if (value === Math.floor(value) && value >= 1) return true;
  return false;
}

// Analyze transaction for privacy concerns
function analyzeTransactionPrivacy(
  vin: Array<{ value?: number; valueSat?: number; address?: string; coinbase?: string }>,
  vout: Array<{ value?: number; valueSat?: number; scriptPubKey?: { addresses?: string[] } }>,
  saplingSpends: number,
  saplingOutputs: number,
  orchardActions: number,
  valueBalance: number,
  isCoinbase: boolean
): PrivacyAlert[] {
  const alerts: PrivacyAlert[] = [];

  if (isCoinbase) {
    // Coinbase transactions have no privacy concerns for sender
    return alerts;
  }

  // Get all values
  const inputValues: number[] = vin
    .filter(i => !i.coinbase)
    .map(i => i.value ?? (i.valueSat ? i.valueSat / 100000000 : 0))
    .filter(v => v > 0);

  const outputValues: number[] = vout
    .map(o => o.value ?? (o.valueSat ? o.valueSat / 100000000 : 0))
    .filter(v => v > 0);

  // Get all addresses
  const inputAddresses = vin
    .map(i => i.address)
    .filter((a): a is string => !!a);

  const outputAddresses = vout
    .flatMap(o => o.scriptPubKey?.addresses || [])
    .filter((a): a is string => !!a);

  // 1. Check for round numbers (fingerprinting risk)
  const roundOutputs = outputValues.filter(isRoundNumber);
  if (roundOutputs.length > 0) {
    alerts.push({
      id: 'round-amounts',
      severity: 'low',
      title: 'Round Amount Pattern',
      description: `Output${roundOutputs.length > 1 ? 's' : ''} with round values (${roundOutputs.slice(0, 3).map(v => v + ' ZEC').join(', ')}${roundOutputs.length > 3 ? '...' : ''}) may be easier to track across transactions.`,
    });
  }

  // 2. Check for exact amount matching (potential linking)
  const totalInput = inputValues.reduce((sum, v) => sum + v, 0);
  const totalOutput = outputValues.reduce((sum, v) => sum + v, 0);
  const estimatedFee = totalInput - totalOutput;

  if (totalInput > 0 && outputValues.length > 0) {
    // Check if any output equals a single input (minus typical fee)
    for (const outVal of outputValues) {
      for (const inVal of inputValues) {
        const diff = Math.abs(inVal - outVal);
        if (diff > 0 && diff < 0.001 && inVal > 0.01) {
          alerts.push({
            id: 'exact-match',
            severity: 'medium',
            title: 'Exact Amount Match',
            description: `An output (~${outVal.toFixed(4)} ZEC) closely matches an input, making this transaction easier to analyze.`,
          });
          break;
        }
      }
    }
  }

  // 3. Check for address reuse in transaction
  const uniqueInputAddrs = new Set(inputAddresses);
  const uniqueOutputAddrs = new Set(outputAddresses);

  // Check if same address appears in both inputs and outputs (change detection)
  const commonAddresses = [...uniqueInputAddrs].filter(a => uniqueOutputAddrs.has(a));
  if (commonAddresses.length > 0) {
    alerts.push({
      id: 'address-reuse-inout',
      severity: 'medium',
      title: 'Address Reuse Detected',
      description: `Address${commonAddresses.length > 1 ? 'es' : ''} used for both input and output, making change output identifiable.`,
    });
  }

  // 4. Check for multiple inputs (address clustering)
  if (uniqueInputAddrs.size > 1) {
    alerts.push({
      id: 'multiple-inputs',
      severity: 'low',
      title: 'Multiple Input Addresses',
      description: `${uniqueInputAddrs.size} different addresses combined as inputs. These addresses can now be linked to the same entity.`,
    });
  }

  // 5. Check for pool downgrade (Orchard to Sapling, or shielded to transparent)
  const hasOrchard = orchardActions > 0;
  const hasSapling = saplingSpends > 0 || saplingOutputs > 0;
  const hasTransparentOutput = outputAddresses.length > 0;
  const hasShieldedInput = saplingSpends > 0 || (hasOrchard && valueBalance > 0);

  if (hasShieldedInput && hasTransparentOutput && !hasOrchard) {
    alerts.push({
      id: 'deshielding',
      severity: 'info',
      title: 'Deshielding Transaction',
      description: 'Funds are moving from shielded to transparent. The output amount and recipient are now publicly visible.',
    });
  }

  // 6. Check for Sapling when Orchard is available (implied if we have any Orchard activity in the tx)
  if (hasSapling && !hasOrchard && saplingOutputs > 0) {
    alerts.push({
      id: 'sapling-not-orchard',
      severity: 'low',
      title: 'Using Sapling Pool',
      description: 'This transaction uses Sapling instead of Orchard. Orchard provides stronger privacy guarantees.',
    });
  }

  return alerts;
}

// Analyze address history for privacy concerns
function analyzeAddressPrivacy(
  address: string,
  txCount: number,
  balance: number,
  received: number
): PrivacyAlert[] {
  const alerts: PrivacyAlert[] = [];

  // 1. Check for high address reuse
  if (txCount >= 10) {
    alerts.push({
      id: 'high-reuse',
      severity: 'high',
      title: 'High Address Reuse',
      description: `This address has been used ${txCount} times. Heavy reuse makes transaction patterns highly traceable.`,
    });
  } else if (txCount >= 5) {
    alerts.push({
      id: 'moderate-reuse',
      severity: 'medium',
      title: 'Moderate Address Reuse',
      description: `This address has been used ${txCount} times. Consider using fresh addresses for better privacy.`,
    });
  } else if (txCount > 1) {
    alerts.push({
      id: 'some-reuse',
      severity: 'low',
      title: 'Address Reused',
      description: `This address has been used ${txCount} times. For best privacy, use a new address for each transaction.`,
    });
  }

  // 2. Check for large balance (higher target value)
  if (balance > 100 * 100000000) { // >100 ZEC in zatoshis
    alerts.push({
      id: 'large-balance',
      severity: 'info',
      title: 'Large Balance',
      description: 'Addresses with large balances may attract unwanted attention. Consider using shielded addresses for storage.',
    });
  }

  // 3. Transparent address warning
  if (address.startsWith('t')) {
    alerts.push({
      id: 'transparent-addr',
      severity: 'info',
      title: 'Transparent Address',
      description: 'All transactions to/from this address are publicly visible. Use shielded addresses (z-addr) for privacy.',
    });
  }

  return alerts;
}

// Privacy Alert Display Component
function PrivacyAlertSection({ alerts }: { alerts: PrivacyAlert[] }) {
  const [expanded, setExpanded] = useState(true);

  if (alerts.length === 0) return null;

  // Sort by severity
  const severityOrder: Record<AlertSeverity, number> = { high: 0, medium: 1, low: 2, info: 3 };
  const sortedAlerts = [...alerts].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  const highCount = alerts.filter(a => a.severity === 'high').length;
  const mediumCount = alerts.filter(a => a.severity === 'medium').length;

  // Determine header color based on worst severity
  const worstSeverity = sortedAlerts[0]?.severity || 'info';

  return (
    <div
      className="rounded mb-4"
      style={{
        border: `2px solid ${getSeverityColor(worstSeverity)}`,
        background: getSeverityBg(worstSeverity),
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 'var(--font-size-label)' }}>
            {worstSeverity === 'high' ? '⚠️' : worstSeverity === 'medium' ? '⚡' : '🔍'}
          </span>
          <span
            className="font-bold"
            style={{ color: getSeverityColor(worstSeverity), fontSize: 'var(--font-size-muted)' }}
          >
            Privacy Analysis
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-muted)' }}>
            ({alerts.length} finding{alerts.length !== 1 ? 's' : ''}
            {highCount > 0 && `, ${highCount} high`}
            {mediumCount > 0 && `, ${mediumCount} medium`})
          </span>
        </div>
        <span style={{ color: 'var(--text-muted)' }}>{expanded ? '▼' : '▶'}</span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          {sortedAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-2 rounded"
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderLeft: `3px solid ${getSeverityColor(alert.severity)}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-1.5 py-0.5 rounded text-xs font-bold uppercase"
                  style={{
                    background: getSeverityColor(alert.severity),
                    color: alert.severity === 'low' ? '#000' : '#fff',
                  }}
                >
                  {alert.severity}
                </span>
                <span
                  className="font-bold"
                  style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-muted)' }}
                >
                  {alert.title}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-muted)' }}>
                {alert.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Explorer Types and Interfaces
// ============================================

type ResultType = 'block' | 'transaction' | 't-address' | 'z-address' | 'error' | null;

interface BlockResult {
  hash: string;
  height: number;
  confirmations: number;
  time: number;
  difficulty: number;
  nonce: string;
  size: number;
  txCount: number;
  transactions: string[];
  merkleroot: string;
  previousblockhash?: string;
  nextblockhash?: string;
  chainSupply?: {
    monitored: number;
    chainValue: number;
    chainValueZat: number;
  };
}

interface TransactionResult {
  txid: string;
  hash: string;
  size: number;
  vsize: number;
  version: number;
  locktime: number;
  expiryheight: number;
  blockhash?: string;
  blockheight?: number;
  confirmations?: number;
  time?: number;
  // Transparent
  vinCount: number;
  voutCount: number;
  transparentValue: number;
  // Shielded metadata (publicly visible)
  hasSprout: boolean;
  hasSapling: boolean;
  hasOrchard: boolean;
  saplingSpends: number;
  saplingOutputs: number;
  orchardActions: number;
  // Classification
  isFullyShielded: boolean;
  isPartiallyShielded: boolean;
  isCoinbase: boolean;
}

interface TAddressResult {
  address: string;
  balance: number;
  received: number;
  txCount: number;
  transactions: Array<{
    txid: string;
    height: number;
    timestamp: number;
    delta: number; // positive = received, negative = sent
  }>;
}

interface ZAddressResult {
  address: string;
  type: 'sapling' | 'orchard' | 'unified';
  // Only public metadata - no balance/history possible
  valid: boolean;
  message: string;
}

interface SearchResult {
  type: ResultType;
  data: BlockResult | TransactionResult | TAddressResult | ZAddressResult | { error: string };
}

// Detection helpers
function detectSearchType(query: string): SearchType {
  const q = query.trim();

  // Block height (numeric)
  if (/^\d+$/.test(q) && parseInt(q) < 100000000) {
    return 'block';
  }

  // Block hash (64 hex chars)
  if (/^[0-9a-fA-F]{64}$/.test(q)) {
    // Could be block hash or txid - default to transaction
    return 'transaction';
  }

  // T-address (starts with t1 or t3)
  if (/^t[13][a-zA-Z0-9]{33}$/.test(q)) {
    return 't-address';
  }

  // Z-address Sapling (starts with zs)
  if (/^zs[a-zA-Z0-9]{76}$/.test(q)) {
    return 'z-address';
  }

  // Unified address (starts with u1)
  if (/^u1[a-zA-Z0-9]+$/.test(q)) {
    return 'z-address'; // Treat as shielded for now
  }

  return 'auto';
}

function formatZec(zatoshis: number): string {
  const zec = zatoshis / 100000000;
  return zec.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 }) + ' ZEC';
}

function formatTimestamp(unix: number): string {
  return new Date(unix * 1000).toLocaleString();
}

function formatRelativeTime(unix: number): string {
  const now = Date.now();
  const diff = now - unix * 1000;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function truncateHash(hash: string | undefined | null, chars: number = 8): string {
  if (!hash) return '—';
  if (hash.length <= chars * 2) return hash;
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
}

// Inline copy button — shows ✓ briefly after click
function CopyBtn({ value, className = '' }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        navigator.clipboard.writeText(value).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className={`shrink-0 text-[10px] px-1.5 py-0.5 border border-[var(--border-window)] transition-colors ${
        copied
          ? 'text-[var(--accent-green)] border-[var(--accent-green)]/50'
          : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)]/50'
      } ${className}`}
      title="Copy to clipboard"
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
}

// Derive a short type label and colour from an address prefix
function addrMeta(address: string): { label: string; color: string } {
  if (address.startsWith('t1') || address.startsWith('t3')) return { label: 't-addr', color: 'var(--text-amber)' };
  if (address.startsWith('zs1')) return { label: 'sapling', color: 'var(--accent-purple)' };
  if (address.startsWith('u1'))  return { label: 'unified', color: 'var(--accent-green)' };
  if (address.startsWith('zo'))  return { label: 'orchard', color: 'var(--accent-green)' };
  return { label: 'addr', color: 'var(--text-muted)' };
}

// Address chip: type badge + watchlist label + truncated address + copy + optional explore link
function AddrChip({
  address,
  onExplore,
  full = false,
}: {
  address: string;
  onExplore?: (addr: string) => void;
  full?: boolean;
}) {
  const display = full ? address : truncateHash(address, 10);
  const { label, color } = addrMeta(address);
  // Inline watchlist check (store read, not a hook — avoids re-render cost on unmounted chips)
  const watchEntry = (() => {
    try {
      const raw = localStorage.getItem('zec-watchlist');
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { state?: { addresses?: Array<{ address: string; label: string; color: string }> } };
      return parsed?.state?.addresses?.find(a => a.address === address) ?? null;
    } catch { return null; }
  })();
  return (
    <span className="inline-flex items-center gap-1.5 min-w-0 flex-wrap">
      <span
        className="shrink-0 text-[9px] px-1 py-px font-bold uppercase tracking-wide border"
        style={{ borderColor: color, color }}
      >
        {label}
      </span>
      {watchEntry && (
        <span
          className="shrink-0 text-[9px] px-1 py-px font-bold rounded"
          style={{ background: watchEntry.color + '33', color: watchEntry.color, border: `1px solid ${watchEntry.color}66` }}
        >
          {watchEntry.label}
        </span>
      )}
      <span
        className={`text-[var(--text-green)] font-mono text-xs ${onExplore ? 'cursor-pointer hover:text-[var(--accent-gold)]' : ''} ${full ? 'break-all leading-relaxed' : 'truncate'}`}
        onClick={onExplore ? () => onExplore(address) : undefined}
        title={address}
      >
        {display}
      </span>
      {onExplore && (
        <button
          onClick={e => { e.stopPropagation(); onExplore(address); }}
          className="shrink-0 text-[10px] px-1.5 py-0.5 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)]/50"
          title="Explore address"
        >
          ↗
        </button>
      )}
      <CopyBtn value={address} />
    </span>
  );
}

interface ExplorerProps {
  windowId?: string;
}

// Block TX viewer mode state
interface BlockTxViewerState {
  blockHeight: number;
  blockHash: string;
  transactions: string[];
  currentIndex: number;
}

export function Explorer({ windowId }: ExplorerProps) {
  const { playClick } = useSound();
  const { windows, openWindow, updateWindow } = useWindowStore();
  const { consumeAction, queueBlockTxViewer, queueBlockMap, queueChainPulse } = useExplorerStore();

  // Mode: 'search' (default) or 'block-tx-viewer'
  const [viewerMode, setViewerMode] = useState<'search' | 'block-tx-viewer'>('search');
  const [blockTxState, setBlockTxState] = useState<BlockTxViewerState | null>(null);
  const [txChartView, setTxChartView] = useState<'rail' | 'grid'>('rail');

  // Search mode state
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('auto');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  // Track the current block context for regular explorer
  const [blockContext, setBlockContext] = useState<{ height: number; hash: string } | null>(null);

  // Date jump panel
  const [showDateJump, setShowDateJump] = useState(false);
  const [showManual, setShowManual] = useState(false);

  // Fetch a transaction by txid
  const fetchTransaction = useCallback(async (txid: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/tx/${txid}`);
      if (!res.ok) throw new Error(`Transaction not found: ${txid}`);
      const rawResponse = await res.json();

      // Unwrap nested structures - handle various API formats
      let data = rawResponse;
      if (rawResponse.result && typeof rawResponse.result === 'object') {
        data = rawResponse.result;
      } else if (rawResponse.data && typeof rawResponse.data === 'object' && !Array.isArray(rawResponse.data)) {
        data = rawResponse.data;
      } else if (rawResponse.transaction && typeof rawResponse.transaction === 'object') {
        data = rawResponse.transaction;
      }

      // Debug logging disabled - uncomment to troubleshoot API responses
      // console.log('[fetchTransaction] Raw response:', rawResponse);
      // console.log('[fetchTransaction] Unwrapped data:', data);

      setResult({ type: 'transaction', data });
    } catch (err) {
      setResult({
        type: 'error',
        data: { error: err instanceof Error ? err.message : 'Unknown error' },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Check for pending action on mount — auto-triggers search when opened from BlockMap etc.
  useEffect(() => {
    if (windowId) {
      const pending = consumeAction(windowId);
      if (pending) {
        if (pending.mode === 'block-tx-viewer') {
          setViewerMode('block-tx-viewer');
          setBlockTxState({
            blockHeight: pending.blockHeight,
            blockHash: pending.blockHash,
            transactions: pending.transactions,
            currentIndex: pending.currentIndex,
          });
          fetchTransaction(pending.transactions[pending.currentIndex]);
        } else if (pending.mode === 'search') {
          setQuery(pending.query);
          setSearchType(pending.type);
          doSearch(pending.query, pending.type); // auto-execute immediately
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowId]); // run once on mount only

  // Navigate to prev/next transaction in block TX viewer mode
  const navigateTransaction = useCallback((direction: 'prev' | 'next') => {
    if (!blockTxState) return;
    playClick();

    const newIndex = direction === 'prev'
      ? blockTxState.currentIndex - 1
      : blockTxState.currentIndex + 1;

    if (newIndex < 0 || newIndex >= blockTxState.transactions.length) return;

    setBlockTxState({ ...blockTxState, currentIndex: newIndex });
    fetchTransaction(blockTxState.transactions[newIndex]);
  }, [blockTxState, playClick, fetchTransaction]);

  // Open a new explorer window for a transaction (from block view)
  const openTransactionInNewWindow = useCallback((txid: string, blockHeight: number, blockHash: string, transactions: string[], txIndex: number) => {
    playClick();
    const newWindowId = `explorer-tx-${Date.now()}`;

    // Queue the block TX viewer for the new window
    queueBlockTxViewer(newWindowId, {
      blockHeight,
      blockHash,
      transactions,
      currentIndex: txIndex,
    });

    // Calculate position
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const position = calculateWindowPosition(windows, { width: 860, height: 880 }, screenWidth, screenHeight);

    // Open new window
    openWindow({
      id: newWindowId,
      type: 'explorer',
      title: `Exploring TXs for Block #${blockHeight.toLocaleString()}`,
      position,
      size: { width: 860, height: 880 },
      minSize: { width: 520, height: 480 },
    });
  }, [playClick, queueBlockTxViewer, windows, openWindow]);

  // Open Block Map visualization — deterministic ID so re-clicking focuses existing window
  const openBlockMap = useCallback((blockHeight: number, blockHash: string, transactions: string[], time: number, size: number) => {
    playClick();
    const id = `block-map-${blockHeight}`;
    queueBlockMap(id, { blockHeight, blockHash, transactions, time, size });
    const pos = calculateWindowPosition(windows, { width: 780, height: 680 }, window.innerWidth, window.innerHeight);
    openWindow({ id, type: 'block-map', title: `Block Map #${blockHeight.toLocaleString()}`, position: pos, size: { width: 780, height: 680 }, minSize: { width: 520, height: 440 } });
  }, [playClick, queueBlockMap, windows, openWindow]);

  // Open Chain Pulse visualization — deterministic ID so re-clicking focuses existing window
  const openChainPulse = useCallback((blockHeight: number, blockHash: string, transactions: string[], time: number) => {
    playClick();
    const id = `chain-pulse-${blockHeight}`;
    queueChainPulse(id, { blockHeight, blockHash, transactions, time });
    const pos = calculateWindowPosition(windows, { width: 780, height: 720 }, window.innerWidth, window.innerHeight);
    openWindow({ id, type: 'chain-pulse', title: `Chain Pulse #${blockHeight.toLocaleString()}`, position: pos, size: { width: 780, height: 720 }, minSize: { width: 520, height: 520 } });
  }, [playClick, queueChainPulse, windows, openWindow]);

  // Update window title when viewing a block
  const updateWindowTitle = useCallback((title: string) => {
    if (windowId) {
      updateWindow(windowId, { title });
    }
  }, [windowId, updateWindow]);

  // Core search logic — accepts explicit query+type so it can be called from effects too
  const doSearch = useCallback(async (q: string, type: SearchType) => {
    if (!q.trim()) return;
    q = q.trim();

    playClick();
    setLoading(true);
    setResult(null);

    try {
      let resolvedType = type;
      if (resolvedType === 'auto') resolvedType = detectSearchType(q);

      let endpoint = '';
      switch (resolvedType) {
        case 'block':       endpoint = `/api/block/${q}`; break;
        case 'transaction': endpoint = `/api/tx/${q}`;    break;
        case 't-address':   endpoint = `/api/address/${q}`; break;
        case 'z-address': {
          const zType = q.startsWith('zs') ? 'sapling' : q.startsWith('u1') ? 'unified' : 'orchard';
          const zLabel = q.startsWith('u1') ? 'u-addr' : q.startsWith('zs') ? 'z-sapling' : 'z-orchard';
          updateWindowTitle(`${zLabel}: ${q.slice(0, 10)}…${q.slice(-6)}`);
          setResult({
            type: 'z-address',
            data: {
              address: q,
              type: zType,
              valid: true,
              message: 'Shielded addresses preserve privacy by design. Balance and transaction history are not publicly queryable.',
            } as ZAddressResult,
          });
          setLoading(false);
          return;
        }
        default:
          endpoint = `/api/tx/${q}`;
      }

      const res = await fetch(endpoint);

      if (!res.ok) {
        // Only fall back to block lookup when the user didn't explicitly request a transaction.
        // Prevents a txid that also happens to be a block hash from silently becoming a block.
        if (type === 'auto' && resolvedType === 'transaction' && /^[0-9a-fA-F]{64}$/.test(q)) {
          const blockRes = await fetch(`/api/block/${q}`);
          if (blockRes.ok) {
            const blockData = await blockRes.json();
            const bd = blockData?.result ?? blockData?.data ?? blockData;
            const bh = bd?.height ?? 0;
            updateWindowTitle(`Block #${bh.toLocaleString()}`);
            setResult({ type: 'block', data: blockData });
            setLoading(false);
            return;
          }
        }
        throw new Error(`Not found: ${q}`);
      }

      const rawResponse = await res.json();
      let data = rawResponse;
      if (rawResponse.result && typeof rawResponse.result === 'object') {
        data = rawResponse.result;
      } else if (rawResponse.data && typeof rawResponse.data === 'object' && !Array.isArray(rawResponse.data)) {
        data = rawResponse.data;
      } else if (rawResponse.block && typeof rawResponse.block === 'object') {
        data = rawResponse.block;
      }

      // When the caller provided an explicit type (not 'auto'), trust it — don't reclassify
      // based on content heuristics. This prevents a txid that also matches a block hash from
      // being misclassified when the API returns unexpected data shapes.
      let resultType: ResultType = 'error';
      if (type !== 'auto') {
        // Explicit caller type — map directly
        if (resolvedType === 'block')       resultType = 'block';
        else if (resolvedType === 'transaction') resultType = 'transaction';
        else if (resolvedType === 't-address')   resultType = 't-address';
      } else {
        // Auto mode — sniff from response content
        if (resolvedType === 'block' || data.height !== undefined || data.merkleroot || data.tx) {
          resultType = 'block';
        } else if (data.txid || data.vin || data.vout) {
          resultType = 'transaction';
        } else if (data.address && (data.balance !== undefined || data.txCount !== undefined)) {
          resultType = 't-address';
        }
      }

      if (resultType === 'block') {
        const bh = data.height ?? data.blockheight ?? 0;
        const bHash = data.hash || data.blockhash || '';
        setBlockContext({ height: bh, hash: bHash });
        updateWindowTitle(`Block #${bh.toLocaleString()}`);
      } else if (resultType === 'transaction') {
        const txid = data.txid || data.hash || q;
        updateWindowTitle(`TX ${truncateHash(txid, 8)}`);
      } else if (resultType === 't-address') {
        const addr: string = data.address || q;
        updateWindowTitle(`t-addr: ${addr.slice(0, 10)}…${addr.slice(-6)}`);
      }

      setResult({ type: resultType, data });
    } catch (err) {
      setResult({
        type: 'error',
        data: { error: err instanceof Error ? err.message : 'Unknown error' },
      });
    } finally {
      setLoading(false);
    }
  }, [playClick, updateWindowTitle]);

  const handleSearch = useCallback(async () => {
    doSearch(query, searchType);
  }, [query, searchType, doSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    playClick();
  };

  const searchFor = useCallback((newQuery: string, type: SearchType = 'auto') => {
    setQuery(newQuery);
    setSearchType(type);
    doSearch(newQuery, type);
  }, [doSearch]);

  // Opens a brand-new Explorer window and queues the search in it.
  // Used by TransactionDisplay so that clicking input/output addresses/txids
  // never corrupts the current window's state or title.
  const openInNewExplorer = useCallback((q: string, type: SearchType = 'auto') => {
    playClick();
    const id = `explorer-${Date.now()}`;
    const size = { width: 860, height: 880 };
    const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
    openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size, minSize: { width: 520, height: 480 } });
    useExplorerStore.getState().queueSearch(id, q, type);
  }, [playClick, windows, openWindow]);

  // ===== BLOCK TX VIEWER MODE =====
  if (viewerMode === 'block-tx-viewer' && blockTxState) {
    const { blockHeight, transactions, currentIndex } = blockTxState;
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < transactions.length - 1;

    return (
      <div className="flex flex-col h-full bg-[var(--bg-window)] p-3 gap-3 overflow-hidden">
        {/* Header - Transaction indicator instead of search bar */}
        <div className="border border-[var(--accent-orange)] bg-[var(--accent-orange)]/10 p-3">
          <div className="text-[var(--accent-orange)] font-bold text-lg">
            Transaction {currentIndex + 1} of {transactions.length}
          </div>
          <div className="text-[var(--text-amber)] text-sm">
            from Block #{blockHeight.toLocaleString()}
          </div>
        </div>

        {/* TX position chart — toggles between Rail and Grid views */}
        <div className="flex-shrink-0 border border-[var(--border-window)] bg-[var(--bg-inset)]">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-window)]">
            <span className="text-[var(--text-amber)] text-xs uppercase tracking-wide">
              Block #{blockHeight.toLocaleString()} · TX {currentIndex + 1} / {transactions.length}
            </span>
            <div className="flex gap-1">
              <button onClick={() => setTxChartView('rail')}
                className={`text-xs px-2 py-0.5 border ${txChartView === 'rail' ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]' : 'border-[var(--border-window)] text-[var(--text-muted)]'}`}>
                Rail
              </button>
              <button onClick={() => setTxChartView('grid')}
                className={`text-xs px-2 py-0.5 border ${txChartView === 'grid' ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]' : 'border-[var(--border-window)] text-[var(--text-muted)]'}`}>
                Grid
              </button>
            </div>
          </div>

          {txChartView === 'grid' && (
            <div className="flex items-center gap-3 px-2 pt-1.5 pb-0.5 flex-wrap text-xs text-[var(--text-muted)] border-b border-[var(--border-window)]">
              <span className="flex items-center gap-1">
                <span style={{ width: 12, height: 12, background: '#FFD700', display: 'inline-block', borderRadius: 2 }} />
                Coinbase
              </span>
              <span className="flex items-center gap-1">
                <span style={{ width: 28, height: 12, borderRadius: 2, display: 'inline-block', background: 'linear-gradient(90deg,hsl(180,65%,45%),hsl(230,70%,45%),hsl(280,70%,45%),hsl(340,65%,45%))' }} />
                Transactions (color = txid)
              </span>
              <span className="flex items-center gap-1">
                <span style={{ width: 12, height: 12, display: 'inline-block', borderRadius: 2, border: '1.5px dashed rgba(255,255,255,0.45)', background: 'hsl(230,50%,35%)' }} />
                May be shielded
              </span>
              <span className="ml-auto flex items-center gap-1">
                <span style={{ width: 12, height: 12, display: 'inline-block', borderRadius: 2, border: '2px solid #FFD700', background: 'hsl(230,65%,55%)' }} />
                Current tx
              </span>
            </div>
          )}

          {txChartView === 'rail' ? (
            /* Horizontal color rail */
            <div className="flex gap-px px-2 py-2" style={{ scrollbarWidth: 'none', overflowX: 'auto' }}>
              {transactions.slice(0, 300).map((txid, i) => {
                const isCurrent = i === currentIndex;
                const hue = i === 0 ? 55 : 180 + (parseInt((txid || '00000000').slice(0, 4), 16) % 160);
                const sat = i === 0 ? '100%' : '65%';
                const lit = isCurrent ? '78%' : '45%';
                return (
                  <div key={i}
                    onClick={() => { if (!loading) { setBlockTxState({ ...blockTxState!, currentIndex: i }); fetchTransaction(transactions[i]); } }}
                    title={`TX ${i + 1}${txid ? `: ${txid.slice(0, 16)}…` : ''}`}
                    style={{
                      flex: transactions.length > 80 ? '0 0 6px' : '1',
                      minWidth: transactions.length > 80 ? 6 : 10,
                      height: 24,
                      background: `hsl(${hue}, ${sat}, ${lit})`,
                      opacity: isCurrent ? 1 : 0.5,
                      outline: isCurrent ? '2px solid #FFD700' : 'none',
                      outlineOffset: '-2px',
                      cursor: 'pointer',
                      borderRadius: 2,
                      transition: 'opacity 0.1s',
                    }}
                  />
                );
              })}
              {transactions.length > 300 && (
                <span className="flex-shrink-0 self-center px-2 text-[var(--text-muted)] text-xs">+{transactions.length - 300}</span>
              )}
            </div>
          ) : (
            /* Mini-grid — like Block Map, cells clickable */
            <div className="p-2 overflow-auto" style={{ maxHeight: 180 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(20, Math.ceil(Math.sqrt(transactions.length * 1.2)))}, 28px)`,
                gap: 2,
              }}>
                {transactions.map((txid, i) => {
                  const isCurrent = i === currentIndex;
                  const hue = i === 0 ? 55 : 180 + (parseInt((txid || '00000000').slice(0, 4), 16) % 160);
                  const sat = i === 0 ? 100 : 65;
                  const lit = isCurrent ? 75 : 45;
                  return (
                    <div key={i}
                      onClick={() => { if (!loading) { setBlockTxState({ ...blockTxState!, currentIndex: i }); fetchTransaction(transactions[i]); } }}
                      title={`TX ${i + 1}`}
                      style={{
                        width: 28, height: 28,
                        background: `hsl(${hue}, ${sat}%, ${lit}%)`,
                        borderRadius: 4,
                        cursor: 'pointer',
                        outline: isCurrent ? '2px solid #FFD700' : 'none',
                        outlineOffset: isCurrent ? '-2px' : '0',
                        border: i === 0 ? 'none' : '1px dashed rgba(255,255,255,0.15)',
                        opacity: isCurrent ? 1 : 0.72,
                        transition: 'opacity 0.1s',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Prev/Next Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateTransaction('prev')}
            disabled={!hasPrev || loading}
            className={`px-4 py-2 border text-sm font-bold ${
              hasPrev && !loading
                ? 'border-[var(--accent-orange)] text-[var(--accent-orange)] hover:bg-[var(--accent-orange)]/20'
                : 'border-[var(--border-window)] text-[var(--text-green)]/50 cursor-not-allowed'
            }`}
          >
            ← Prev TX
          </button>
          <div className="text-[var(--text-muted)] text-xs">click segment above to jump</div>
          <button
            onClick={() => navigateTransaction('next')}
            disabled={!hasNext || loading}
            className={`px-4 py-2 border text-sm font-bold ${
              hasNext && !loading
                ? 'border-[var(--accent-orange)] text-[var(--accent-orange)] hover:bg-[var(--accent-orange)]/20'
                : 'border-[var(--border-window)] text-[var(--text-green)]/50 cursor-not-allowed'
            }`}
          >
            Next TX →
          </button>
        </div>

        {/* Transaction Display Area */}
        <div className="flex-1 overflow-y-auto border border-[var(--border-window)] bg-[var(--bg-inset)] p-3">
          {loading && (
            <div className="py-8">
              <AppLoader />
            </div>
          )}

          {result?.type === 'error' && (
            <div className="text-[var(--accent-orange)] text-center py-8">
              {(result.data as { error: string }).error}
            </div>
          )}

          {result?.type === 'transaction' && (
            <TransactionDisplay
              data={result.data as TransactionResult}
              onCopy={copyToClipboard}
              onSearch={openInNewExplorer}
            />
          )}
        </div>
      </div>
    );
  }

  // ===== SEARCH MODE (Default) =====
  return (
    <div className="relative flex flex-col h-full bg-[var(--bg-window)] p-3 gap-3 overflow-hidden">
      {/* Search Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter address, txid, or block height..."
            className="flex-1 bg-[var(--bg-inset)] border border-[var(--border-window)] text-[var(--text-green)] px-3 py-2 font-mono text-sm focus:outline-none focus:border-[var(--accent-gold)]"
          />
          <button
            onClick={() => { playClick(); setShowDateJump(v => !v); }}
            className={`px-3 py-2 text-xs border ${showDateJump ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]' : 'border-[var(--border-window)] text-[var(--text-amber)] hover:text-[var(--accent-gold)]'}`}
            title="Jump to a historical event or date"
          >
            ⌚ Jump
          </button>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="btn-window px-4 py-2 text-[var(--accent-gold)] disabled:opacity-50"
          >
            {loading ? '...' : 'Search'}
          </button>
          <button
            onClick={() => {
              const { windows, openWindow } = useWindowStore.getState();
              const size = { width: 980, height: 820 };
              const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
              const id = 'mempool';
              if (!windows.find(w => w.id === id)) {
                openWindow({ id, type: 'mempool', title: 'Mempool', position: pos, size, minSize: { width: 640, height: 520 } });
              }
              useWindowStore.getState().focusWindow(id);
            }}
            className="px-3 py-2 text-xs border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)]/50 transition-colors whitespace-nowrap"
            title="Open Mempool viewer"
          >
            ⏳ Mempool
          </button>
        </div>

        {/* Historical event presets */}
        {showDateJump && (
          <div className="border border-[var(--accent-gold)]/30 bg-[#0a0c14] p-2">
            <div className="text-[var(--text-amber)] text-xs mb-2 uppercase tracking-wide">Jump to event</div>
            <div className="flex flex-col gap-1">
              {ZCASH_HISTORY.map(ev => (
                <button
                  key={ev.height}
                  onClick={() => {
                    playClick();
                    setQuery(String(ev.height));
                    setSearchType('block');
                    setShowDateJump(false);
                    doSearch(String(ev.height), 'block');
                  }}
                  className="text-left px-2 py-1.5 text-xs hover:bg-[var(--accent-gold)]/10 flex items-center gap-2"
                >
                  <span className="text-[var(--text-amber)] w-16 shrink-0">#{ev.height.toLocaleString()}</span>
                  <span className="text-[var(--accent-gold)]">{ev.title}</span>
                  <span className="text-[var(--text-amber)] ml-auto shrink-0">{ev.date}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Type Selector + UA Decode shortcut */}
        <div className="flex gap-2 flex-wrap items-center">
          {(['auto', 't-address', 'z-address', 'transaction', 'block'] as SearchType[]).map((type) => (
            <button
              key={type}
              onClick={() => { playClick(); setSearchType(type); }}
              className={`px-2 py-1 text-xs border ${
                searchType === type
                  ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]'
                  : 'border-[var(--border-window)] text-[var(--text-green)]'
              }`}
            >
              {type === 'auto' ? 'Auto-detect' : type}
            </button>
          ))}
          {query.trim().toLowerCase().startsWith('u1') && (
            <button
              onClick={() => {
                playClick();
                const { windows, openWindow } = useWindowStore.getState();
                const { queueSearch } = useExplorerStore.getState();
                const size = { width: 620, height: 520 };
                const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
                const id = 'ua-decoder';
                const existing = windows.find(w => w.id === id);
                if (existing) {
                  useWindowStore.getState().focusWindow(id);
                } else {
                  openWindow({ id, type: 'ua-decoder', title: 'Address Decoder', position: pos, size, minSize: { width: 480, height: 380 } });
                }
                queueSearch(id, query.trim(), 'z-address');
              }}
              className="ml-auto text-xs border border-[var(--accent-purple)]/60 text-[var(--accent-purple)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] px-2 py-1 transition-colors"
            >
              DECODE ↗
            </button>
          )}
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto border border-[var(--border-window)] bg-[var(--bg-inset)] p-3">
        {!result && !loading && (
          <div className="py-6">
            <div className="text-[var(--text-amber)] text-center mb-1">Enter a search query above</div>
            <div className="text-xs text-[var(--text-green)] text-center mb-6">
              Supports: block height, block hash, txid, t-address, z-address
            </div>
            {(() => {
              const cards: { icon: string; title: string; body: string; tag?: string; onClick?: () => void }[] = [
                { icon: '🔍', title: 'Search anything', body: 'Blocks, transactions, and addresses. Auto-detect finds the type — just use the search bar.' },
                { icon: '⌚', title: 'Jump to history', body: "Leap to Zcash's landmark blocks — launch, halvings, upgrades — with the Jump button." },
                { icon: '🗺', title: 'Visualize', body: 'Open Block Map & Chain Pulse from any block; click tiles to open transactions.' },
                { icon: '🔐', title: 'Decode unified addresses', body: 'Split a u1… address into its transparent, Sapling & Orchard receivers. Most explorers can\'t read one at all.', tag: 'ONLY HERE' },
                { icon: '✉️', title: 'On-chain memos', body: 'We surface the encrypted memo text on shielded transactions when it\'s yours to see — data others hide.', tag: 'ONLY HERE' },
                { icon: '📖', title: 'User manual', body: 'New here? Open the guide — getting started, what sets us apart, then every feature.', onClick: () => setShowManual(true) },
              ];
              return (
                <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {cards.map((c) => {
                    const clickable = !!c.onClick;
                    return (
                      <button
                        key={c.title}
                        onClick={c.onClick}
                        disabled={!clickable}
                        className={`text-left p-3 border border-[var(--border-window)] bg-[var(--bg-window)] transition-colors ${clickable ? 'hover:border-[var(--accent-gold)] cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontSize: '18px' }}>{c.icon}</span>
                          <span className="text-[var(--accent-gold)] font-bold text-sm">{c.title}</span>
                          {c.tag && <span className="ml-auto text-[10px] px-1.5 py-0.5 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] whitespace-nowrap">{c.tag}</span>}
                          {clickable && <span className="ml-auto text-[var(--accent-purple)] text-xs">open ↗</span>}
                        </div>
                        <div className="text-[var(--text-primary)] text-xs leading-relaxed">{c.body}</div>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {loading && (
          <div className="py-8">
            <AppLoader />
          </div>
        )}

        {/* Error Result */}
        {result?.type === 'error' && (
          <div className="text-[var(--accent-orange)] text-center py-8">
            {(result.data as { error: string }).error}
          </div>
        )}

        {/* Block Result */}
        {result?.type === 'block' && (
          <BlockDisplay
            data={result.data as BlockResult}
            onCopy={copyToClipboard}
            onSearch={searchFor}
            onExplore={openInNewExplorer}
            onOpenTxInNewWindow={openTransactionInNewWindow}
            onOpenBlockMap={openBlockMap}
            onOpenChainPulse={openChainPulse}
          />
        )}

        {/* Transaction Result */}
        {result?.type === 'transaction' && (
          <TransactionDisplay
            data={result.data as TransactionResult}
            onCopy={copyToClipboard}
            onSearch={openInNewExplorer}
          />
        )}

        {/* T-Address Result */}
        {result?.type === 't-address' && (
          <TAddressDisplay
            data={result.data as TAddressResult}
            onCopy={copyToClipboard}
            onSearch={searchFor}
          />
        )}

        {/* Z-Address Result */}
        {result?.type === 'z-address' && (
          <ZAddressDisplay
            data={result.data as ZAddressResult}
            onCopy={copyToClipboard}
          />
        )}
      </div>

      {showManual && <ExplorerManual onClose={() => setShowManual(false)} />}
    </div>
  );
}

// Sub-components for each result type

// SVG donut arc path helper
function donutArc(cx: number, cy: number, r: number, thickness: number, startDeg: number, endDeg: number): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const ri = r - thickness;
  const s1 = { x: cx + r * Math.cos(toRad(startDeg)), y: cy + r * Math.sin(toRad(startDeg)) };
  const e1 = { x: cx + r * Math.cos(toRad(endDeg)), y: cy + r * Math.sin(toRad(endDeg)) };
  const s2 = { x: cx + ri * Math.cos(toRad(endDeg)), y: cy + ri * Math.sin(toRad(endDeg)) };
  const e2 = { x: cx + ri * Math.cos(toRad(startDeg)), y: cy + ri * Math.sin(toRad(startDeg)) };
  const large = (endDeg - startDeg) > 180 ? 1 : 0;
  return `M${s1.x} ${s1.y} A${r} ${r} 0 ${large} 1 ${e1.x} ${e1.y} L${s2.x} ${s2.y} A${ri} ${ri} 0 ${large} 0 ${e2.x} ${e2.y}Z`;
}

function BlockMiniChart({ txCount, size }: { txCount: number; size: number }) {
  const [view, setView] = useState<'bars' | 'donut'>('bars');
  const MAX_SIZE = 2_000_000;
  const sizeRatio = Math.min(1, size > 0 ? size / MAX_SIZE : 0);
  const coinbaseFrac = txCount > 0 ? 1 / txCount : 1;
  const regularFrac = 1 - coinbaseFrac;

  return (
    <div className="border border-[var(--border-window)] bg-[var(--bg-inset)]">
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <span className="text-[var(--text-amber)] text-xs font-bold uppercase tracking-wide">Block Composition</span>
        <div className="flex gap-1">
          <button
            onClick={() => setView('bars')}
            className={`text-xs px-2 py-0.5 border ${view === 'bars' ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]' : 'border-[var(--border-window)] text-[var(--text-muted)]'}`}
          >Bars</button>
          <button
            onClick={() => setView('donut')}
            className={`text-xs px-2 py-0.5 border ${view === 'donut' ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]' : 'border-[var(--border-window)] text-[var(--text-muted)]'}`}
          >Donut</button>
        </div>
      </div>

      {view === 'bars' ? (
        <div className="px-3 pb-3 space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-secondary)]">Transactions</span>
              <span className="text-[var(--accent-gold)]">{txCount}</span>
            </div>
            <div className="h-4 bg-[#1a1a2e] rounded overflow-hidden flex">
              <div style={{ width: `${coinbaseFrac * 100}%`, minWidth: 4, background: '#FFD700' }} title="1 coinbase" />
              <div style={{ flex: 1, background: 'linear-gradient(90deg, hsl(220,70%,52%), hsl(280,70%,52%))', opacity: 0.85 }} />
            </div>
            <div className="flex text-xs mt-1 gap-4">
              <span style={{ color: '#FFD700' }}>■ 1 coinbase</span>
              <span style={{ color: 'hsl(250,70%,68%)' }}>■ {Math.max(0, txCount - 1)} regular</span>
            </div>
          </div>
          {size > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--text-secondary)]">Block Size</span>
                <span className="text-[var(--accent-gold)]">{(size / 1024).toFixed(1)} KB</span>
              </div>
              <div className="h-4 bg-[#1a1a2e] rounded overflow-hidden">
                <div style={{ width: `${sizeRatio * 100}%`, height: '100%', background: sizeRatio > 0.8 ? 'var(--accent-orange)' : 'var(--accent-green)', transition: 'width 0.4s' }} />
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{(sizeRatio * 100).toFixed(1)}% of 2 MB block capacity</div>
            </div>
          )}
        </div>
      ) : (
        /* Donut view */
        <div className="flex items-center gap-6 px-4 py-3">
          <svg width={130} height={130} viewBox="0 0 130 130">
            {/* TX donut ring (outer) */}
            {txCount === 1 ? (
              <circle cx={65} cy={65} r={52} fill="none" stroke="#FFD700" strokeWidth={18} />
            ) : (
              <>
                <path d={donutArc(65, 65, 52, 18, 0, coinbaseFrac * 360)} fill="#FFD700" />
                <path d={donutArc(65, 65, 52, 18, coinbaseFrac * 360, 360)} fill="url(#bmc-grad)" />
              </>
            )}
            {/* Size utilization ring (inner) */}
            {size > 0 && (
              <>
                <circle cx={65} cy={65} r={29} fill="none" stroke="#1a1a2e" strokeWidth={12} />
                {sizeRatio > 0 && (
                  <path d={donutArc(65, 65, 29, 12, 0, sizeRatio * 360)} fill={sizeRatio > 0.8 ? 'var(--accent-orange)' : 'var(--accent-green)'} opacity={0.85} />
                )}
              </>
            )}
            {/* Center label */}
            <text x={65} y={61} textAnchor="middle" fill="var(--accent-gold)" fontSize={14} fontWeight="bold" fontFamily="monospace">{txCount}</text>
            <text x={65} y={73} textAnchor="middle" fill="var(--text-muted)" fontSize={8} fontFamily="monospace">TX</text>
            <defs>
              <linearGradient id="bmc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(220,70%,55%)" />
                <stop offset="100%" stopColor="hsl(280,70%,55%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span style={{ width: 12, height: 12, background: '#FFD700', display: 'inline-block', borderRadius: 2 }} />
              <span className="text-[var(--text-secondary)]">Coinbase: 1 tx ({(coinbaseFrac * 100).toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ width: 12, height: 12, background: 'hsl(250,70%,55%)', display: 'inline-block', borderRadius: 2 }} />
              <span className="text-[var(--text-secondary)]">Regular: {Math.max(0, txCount - 1)} txs ({(regularFrac * 100).toFixed(1)}%)</span>
            </div>
            {size > 0 && (
              <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-window)]">
                <span style={{ width: 12, height: 12, background: sizeRatio > 0.8 ? 'var(--accent-orange)' : 'var(--accent-green)', display: 'inline-block', borderRadius: 2 }} />
                <span className="text-[var(--text-secondary)]">Size: {(size / 1024).toFixed(1)} KB ({(sizeRatio * 100).toFixed(0)}% full)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function BlockDisplay({
  data,
  onCopy,
  onSearch,
  onExplore,
  onOpenTxInNewWindow,
  onOpenBlockMap,
  onOpenChainPulse,
}: {
  data: BlockResult;
  onCopy: (s: string) => void;
  onSearch: (q: string, t: SearchType) => void;
  onExplore?: (q: string, t: SearchType) => void; // opens a NEW explorer window
  onOpenTxInNewWindow?: (txid: string, blockHeight: number, blockHash: string, transactions: string[], txIndex: number) => void;
  onOpenBlockMap?: (blockHeight: number, blockHash: string, transactions: string[], time: number, size: number) => void;
  onOpenChainPulse?: (blockHeight: number, blockHash: string, transactions: string[], time: number) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showTxList, setShowTxList] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const [prevBlockInterval, setPrevBlockInterval] = useState<number | null>(null);
  const [minerInfo, setMinerInfo] = useState<{ tag: string; address: string; reward: number } | null>(null);
  const [minerLoading, setMinerLoading] = useState(false);

  // Fetch miner info via Zebra RPC getblock verbosity=2 (single call, reliable coinbase data)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawDataForEffect = data as any;
  const blockHashForMiner: string = rawDataForEffect?.hash || rawDataForEffect?.blockhash || '';
  useEffect(() => {
    if (!blockHashForMiner) {
      setMinerInfo({ tag: 'Unknown Miner', address: '', reward: 0 });
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    setMinerLoading(true);
    setMinerInfo(null);
    fetch(`/api/miner/${blockHashForMiner}`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (cancelled) return;
        setMinerInfo(d
          ? { tag: d.tag || 'Unknown Miner', address: d.address || '', reward: d.reward || 0 }
          : { tag: 'Anonymous / Unresolved', address: '', reward: 0 }
        );
      })
      .catch(() => { if (!cancelled) setMinerInfo({ tag: 'Unknown Miner', address: '', reward: 0 }); })
      .finally(() => { clearTimeout(timeout); if (!cancelled) setMinerLoading(false); });
    return () => { cancelled = true; controller.abort(); };
  }, [blockHashForMiner]);

  // Fetch prev block time to compute block interval
  const rawDataForInterval = data as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  const prevHash: string = rawDataForInterval?.previousblockhash || rawDataForInterval?.result?.previousblockhash || '';
  const thisTime: number = rawDataForInterval?.time ?? rawDataForInterval?.result?.time ?? 0;
  useEffect(() => {
    if (!prevHash || !thisTime) {
      setPrevBlockInterval(-1); // genesis block or missing timestamp — not fetchable
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    fetch(`/api/block/${prevHash}`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (cancelled) return;
        const pd = d?.result ?? d?.data ?? d;
        const pt: number = pd?.time ?? pd?.blocktime ?? 0;
        setPrevBlockInterval(pt > 0 && thisTime > 0 ? thisTime - pt : -1);
      })
      .catch(() => { if (!cancelled) setPrevBlockInterval(-1); })
      .finally(() => clearTimeout(timeout));
    return () => { cancelled = true; controller.abort(); };
  }, [prevHash, thisTime]);

  // Handle both zcashd format and custom API format
  // Also handle nested structures like { result: {...} }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawData = data as any;

  // Unwrap if data is nested
  if (rawData?.result && typeof rawData.result === 'object') {
    rawData = rawData.result;
  } else if (rawData?.data && typeof rawData.data === 'object' && !Array.isArray(rawData.data)) {
    rawData = rawData.data;
  } else if (rawData?.block && typeof rawData.block === 'object') {
    rawData = rawData.block;
  }

  const hash = rawData?.hash || rawData?.blockhash || '';
  const height = rawData?.height ?? rawData?.blockheight ?? 0;
  const time = rawData?.time ?? rawData?.blocktime ?? 0;
  const confirmations = rawData?.confirmations ?? 0;
  const difficulty = rawData?.difficulty ?? 0;
  const size = rawData?.size ?? 0;
  const version = rawData?.version ?? 0;
  const bits = rawData?.bits || '';
  const nonce = rawData?.nonce || '';
  const merkleroot = rawData?.merkleroot || '';
  const finalsaplingroot = rawData?.finalsaplingroot || '';
  const previousblockhash = rawData?.previousblockhash || '';
  const nextblockhash = rawData?.nextblockhash || '';
  const txList: string[] = rawData?.transactions || rawData?.tx || [];
  const txCount = rawData?.txCount ?? rawData?.nTx ?? txList.length ?? 0;

  // If no meaningful data was extracted, show a message
  if (!rawData || (!hash && height === 0 && txCount === 0)) {
    return (
      <div className="space-y-4 text-sm font-mono">
        <div className="text-[var(--accent-orange)]">
          Unable to parse block data.
        </div>
        <div className="text-[var(--text-green)] text-xs">
          The block data format may not be supported yet.
        </div>
      </div>
    );
  }

  // Shielded aggregate fields (available when API returns them)
  const nShieldedTx: number = rawData?.nShieldedTx ?? rawData?.shieldedTxCount ?? -1;
  const nSaplingOutputs: number = rawData?.nShieldedOutputs ?? -1;
  const nSaplingSpends: number = rawData?.nShieldedSpends ?? -1;
  const nOrchardActions: number = rawData?.nOrchardActions ?? rawData?.orchardActionCount ?? -1;
  const hasShieldedStats = nShieldedTx >= 0 || nSaplingOutputs >= 0 || nOrchardActions >= 0;

  const historyEvent: ZcashEvent | null = height > 0 ? nearestEvent(height) : null;

  if (showRawJson) {
    return (
      <div className="space-y-3 text-sm font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[var(--accent-gold)] font-bold">Block #{height.toLocaleString()} — Raw JSON</span>
          <div className="flex gap-2">
            <CopyBtn value={JSON.stringify(rawData, null, 2)} className="px-2 py-0.5 text-xs" />
            <button onClick={() => setShowRawJson(false)}
              className="text-xs px-2 py-0.5 border border-[var(--border-window)] text-[var(--text-amber)] hover:text-[var(--accent-gold)]">
              ✕ Close
            </button>
          </div>
        </div>
        <pre className="text-[var(--text-green)] text-xs overflow-auto bg-[var(--bg-inset)] p-3 border border-[var(--border-window)] max-h-[60vh] leading-relaxed">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm font-mono">
      {/* History event banner */}
      {historyEvent && (
        <div className="border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/5 px-3 py-2">
          <div className="text-[var(--accent-gold)] text-xs font-bold">
            {historyEvent.tag === 'halving' ? '⚡' : historyEvent.tag === 'milestone' ? '🏁' : '✦'} {historyEvent.title}
          </div>
          <div className="text-[var(--text-muted)] text-xs mt-0.5 leading-relaxed">{historyEvent.description}</div>
        </div>
      )}

      {/* Alternating section bands — flush, theme-aware (see .exp-band-* in globals.css) */}
      <div className="border border-[var(--border-window)] overflow-hidden">
      <div className="exp-band-a p-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-[var(--accent-gold)] text-2xl font-bold tracking-tight">
          Block #{height.toLocaleString()}
        </div>
        <div className="flex gap-2">
          {previousblockhash && (
            <button onClick={() => onSearch(previousblockhash, 'block')}
              className="text-[var(--accent-purple)] hover:text-[var(--accent-gold)] px-3 py-1.5 border border-[var(--border-window)] text-xs">
              ← Prev
            </button>
          )}
          {nextblockhash && (
            <button onClick={() => onSearch(nextblockhash, 'block')}
              className="text-[var(--accent-purple)] hover:text-[var(--accent-gold)] px-3 py-1.5 border border-[var(--border-window)] text-xs">
              Next →
            </button>
          )}
          <button onClick={() => setShowRawJson(true)}
            className="text-[var(--text-amber)] hover:text-[var(--accent-gold)] px-2 py-1 border border-[var(--border-window)] text-xs"
            title="View raw JSON">
            {'{ }'}
          </button>
        </div>
      </div>

      {/* Visual tools row */}
      {txList.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={() => onOpenBlockMap?.(height, hash, txList, time, size)}
            className="px-4 py-2 border border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 text-xs font-bold tracking-wide transition-colors"
          >
            🗺 Block Map
          </button>
          <button
            onClick={() => onOpenChainPulse?.(height, hash, txList, time)}
            className="px-4 py-2 border border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10 text-xs font-bold tracking-wide transition-colors"
          >
            ✦ Chain Pulse
          </button>
        </div>
      )}

      </div>
      <div className="exp-band-b p-3 space-y-3">
      {/* Primary Info Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Timestamp</div>
          <div className="text-[var(--text-green)] text-sm">{time > 0 ? formatRelativeTime(time) : '—'}</div>
          {time > 0 && <div className="text-[var(--text-amber)] text-xs mt-0.5">{formatTimestamp(time)}</div>}
        </div>

        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Transactions</div>
          <div className="text-[var(--text-green)] text-sm">{txCount.toLocaleString()}</div>
          <div className="text-[var(--text-amber)] text-xs mt-0.5">1 coinbase + {Math.max(0, txCount - 1)} regular</div>
        </div>

        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Confirmations</div>
          <div className="text-[var(--accent-green)] text-sm font-bold">{confirmations.toLocaleString()}</div>
        </div>

        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Block Size</div>
          <div className="text-[var(--text-green)] text-sm">{size > 0 ? formatBytes(size) : '—'}</div>
        </div>

        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)] col-span-2">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Block Interval</div>
          {prevBlockInterval === null ? (
            <div className="text-[var(--text-muted)] text-xs animate-pulse">Fetching…</div>
          ) : prevBlockInterval < 0 ? (
            <div className="text-[var(--text-muted)] text-xs">—</div>
          ) : (
            <div className="flex items-baseline gap-3">
              <span className="text-[var(--text-green)] text-sm">
                {prevBlockInterval}s
              </span>
              <span className="text-[var(--text-muted)] text-xs">
                {prevBlockInterval < 60
                  ? `${prevBlockInterval}s from previous block`
                  : `${Math.floor(prevBlockInterval / 60)}m ${prevBlockInterval % 60}s from previous block`}
              </span>
              {prevBlockInterval < 30 && <span className="text-[var(--accent-gold)] text-xs">fast block</span>}
              {prevBlockInterval > 300 && <span className="text-[var(--accent-purple)] text-xs">slow block</span>}
            </div>
          )}
        </div>
      </div>

      {/* Tx composition pills — shown when API returns shielded aggregate data */}
      {hasShieldedStats && (
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          {nShieldedTx >= 0 && txCount > 1 && (
            <span className="px-2 py-0.5 border border-[var(--text-amber)]/40 text-[var(--text-amber)]">
              {Math.max(0, txCount - 1 - nShieldedTx)} transparent
            </span>
          )}
          {nShieldedTx >= 0 && (
            <span className="px-2 py-0.5 border" style={{ borderColor: 'rgb(140,70,230)', color: 'rgb(180,120,255)' }}>
              {nShieldedTx} shielded
            </span>
          )}
          {(nSaplingOutputs >= 0 || nSaplingSpends >= 0) && (
            <span className="px-2 py-0.5 border" style={{ borderColor: 'rgb(120,60,200)', color: 'rgb(160,100,240)' }}>
              ◆ sapling{nSaplingOutputs >= 0 ? ` ${nSaplingOutputs}↓` : ''}{nSaplingSpends >= 0 ? ` ${nSaplingSpends}↑` : ''}
            </span>
          )}
          {nOrchardActions >= 0 && (
            <span className="px-2 py-0.5 border" style={{ borderColor: 'rgb(60,160,80)', color: 'rgb(85,210,100)' }}>
              ⬡ {nOrchardActions} orchard
            </span>
          )}
        </div>
      )}

      </div>
      <div className="exp-band-a p-3">
      {/* Miner identity — always visible, shows loading then resolves */}
      <div className="border-2 border-[var(--accent-gold)]/40">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--accent-gold)]/20">
          <span className="text-base">⛏</span>
          <span className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wide">Block Miner</span>
          <button
            className="ml-auto text-xs border border-[var(--accent-gold)]/50 text-[var(--accent-gold)] px-2 py-0.5 hover:bg-[var(--accent-gold)]/10 transition-colors"
            onClick={() => {
              const { windows, openWindow } = useWindowStore.getState();
              const pos = calculateWindowPosition(windows, { width: 820, height: 580 }, window.innerWidth, window.innerHeight);
              openWindow({ id: 'mining', type: 'mining', title: 'Mining', position: pos, size: { width: 820, height: 580 }, minSize: { width: 600, height: 420 } });
            }}
          >
            Mining Stats ↗
          </button>
        </div>
        <div className="px-3 py-3">
          {minerLoading ? (
            <div className="text-[var(--text-muted)] text-xs animate-pulse">Resolving miner identity…</div>
          ) : !minerInfo ? (
            <div className="text-[var(--text-muted)] text-xs">Miner data unavailable</div>
          ) : (
            <div className="space-y-2">
              <div>
                <div className="text-[var(--text-muted)] text-xs mb-0.5">Pool / Tag</div>
                <div className="text-[var(--accent-gold)] text-base font-bold">{minerInfo.tag}</div>
              </div>
              {minerInfo.reward > 0 && (
                <div>
                  <div className="text-[var(--text-muted)] text-xs mb-0.5">Block Reward</div>
                  <div className="text-[var(--accent-green)] text-sm font-bold">{minerInfo.reward.toFixed(8)} ZEC</div>
                </div>
              )}
              {minerInfo.address ? (
                <div>
                  <div className="text-[var(--text-muted)] text-xs mb-0.5">Reward Address</div>
                  <div className="flex items-start gap-2">
                    <span
                      className="text-[var(--text-green)] text-xs font-mono break-all cursor-pointer hover:text-[var(--accent-gold)] transition-colors flex-1 leading-relaxed"
                      onClick={() => (onExplore ?? onSearch)(minerInfo.address, 't-address')}
                      title="Explore address in a new window"
                    >
                      {minerInfo.address}
                    </span>
                    <button
                      onClick={() => (onExplore ?? onSearch)(minerInfo.address, 't-address')}
                      className="shrink-0 text-[10px] px-1.5 py-0.5 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)]"
                    >↗</button>
                    <CopyBtn value={minerInfo.address} />
                  </div>
                </div>
              ) : (
                <div className="text-[var(--text-muted)] text-xs">Reward address not available (shielded or unparseable)</div>
              )}
            </div>
          )}
        </div>
      </div>

      </div>
      <div className="exp-band-b p-3 space-y-3">
      {/* Shielded Activity */}
      {(hasShieldedStats || txList.some(tx => {
        const rd = tx as any;
        return (rd?.vShieldedSpend?.length > 0) || (rd?.vShieldedOutput?.length > 0) || (rd?.orchard?.actions?.length > 0);
      })) && (
        <div className="border border-[var(--accent-purple)]/30 bg-[var(--accent-purple)]/5 p-3">
          <div className="text-[var(--accent-purple)] text-xs font-bold uppercase tracking-wide mb-2">⬡ Shielded Activity</div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <div className="text-[var(--text-muted)] mb-0.5">Shielded Txs</div>
              <div className="text-[var(--text-green)] font-bold">
                {nShieldedTx >= 0 ? nShieldedTx : txList.filter(tx => {
                  const rd = tx as any;
                  return (rd?.vShieldedSpend?.length > 0) || (rd?.vShieldedOutput?.length > 0) || (rd?.orchard?.actions?.length > 0);
                }).length}
              </div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] mb-0.5">Sapling I/O</div>
              <div className="text-[var(--text-green)] font-bold">
                {nSaplingSpends >= 0 || nSaplingOutputs >= 0
                  ? `${nSaplingSpends >= 0 ? nSaplingSpends : '?'}↓ / ${nSaplingOutputs >= 0 ? nSaplingOutputs : '?'}↑`
                  : '—'}
              </div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] mb-0.5">Orchard Actions</div>
              <div className="text-[var(--text-green)] font-bold">
                {nOrchardActions >= 0 ? nOrchardActions : '—'}
              </div>
            </div>
          </div>
          <div className="text-[var(--text-muted)] text-xs mt-2">Values are encrypted — amounts not publicly visible</div>
        </div>
      )}

      {/* Mini chart */}
      <BlockMiniChart txCount={txCount} size={size} />

      </div>
      </div>
      {/* Block Hash */}
      <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
        <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Block Hash</div>
        <div className="flex items-start gap-2">
          <span className="text-[var(--text-green)] text-xs break-all leading-relaxed flex-1 font-mono">{hash || '—'}</span>
          {hash && <CopyBtn value={hash} />}
        </div>
      </div>

      {/* Collapsible Sections - Vertically stacked, orange text */}
      <div className="flex flex-col gap-2 mt-2">
        {/* Show Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-[var(--accent-orange)] hover:text-[var(--accent-gold)] text-sm text-left font-bold"
        >
          {showDetails ? '▼ Hide Details' : '▶ Show Details'}
        </button>

        {showDetails && (
          <div className="space-y-2 pl-3 border-l-2 border-[var(--accent-orange)] ml-1">
            <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
              {difficulty > 0 && (
                <>
                  <span className="text-[var(--text-amber)]">Difficulty:</span>
                  <span className="text-[var(--text-green)]">{difficulty.toLocaleString(undefined, { maximumFractionDigits: 8 })}</span>
                </>
              )}
              {version > 0 && (
                <>
                  <span className="text-[var(--text-amber)]">Version:</span>
                  <span className="text-[var(--text-green)]">{version}</span>
                </>
              )}
              {bits && (
                <>
                  <span className="text-[var(--text-amber)]">Bits:</span>
                  <span className="text-[var(--text-green)]">{bits}</span>
                </>
              )}
              {nonce && (
                <>
                  <span className="text-[var(--text-amber)]">Nonce:</span>
                  <span className="text-[var(--text-green)] break-all text-xs">{nonce}</span>
                </>
              )}
              {merkleroot && (
                <>
                  <span className="text-[var(--text-amber)]">Merkle Root:</span>
                  <span
                    className="text-[var(--text-green)] break-all text-xs cursor-pointer hover:text-[var(--accent-gold)]"
                    onClick={() => onCopy(merkleroot)}
                  >
                    {merkleroot}
                  </span>
                </>
              )}
              {finalsaplingroot && (
                <>
                  <span className="text-[var(--text-amber)]">Final Sapling Root:</span>
                  <span
                    className="text-[var(--text-green)] break-all text-xs cursor-pointer hover:text-[var(--accent-gold)]"
                    onClick={() => onCopy(finalsaplingroot)}
                  >
                    {finalsaplingroot}
                  </span>
                </>
              )}
              {rawData.chainSupply?.chainValueZat && (
                <>
                  <span className="text-[var(--text-amber)]">Chain Supply:</span>
                  <span className="text-[var(--text-green)]">{formatZec(rawData.chainSupply.chainValueZat)}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Show Transactions Toggle */}
        {txList.length > 0 && (
          <>
            <button
              onClick={() => setShowTxList(!showTxList)}
              className="text-[var(--accent-orange)] hover:text-[var(--accent-gold)] text-sm text-left font-bold"
            >
              {showTxList ? '▼ Hide Transactions' : `▶ View all ${txList.length} transactions in this block`}
            </button>

            {showTxList && (
              <div className="pl-3 border-l-2 border-[var(--accent-orange)] ml-1">
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {txList.slice(0, 100).map((txid, i) => (
                    <div
                      key={txid || i}
                      className="flex items-center gap-1.5 text-xs py-1 px-1 hover:bg-[var(--bg-window)] group"
                    >
                      <span className="text-[var(--text-muted)] w-6 shrink-0 text-right">{i + 1}.</span>
                      <span
                        className="text-[var(--text-green)] hover:text-[var(--accent-gold)] cursor-pointer font-mono flex-1 truncate"
                        onClick={() => {
                          if (txid && onOpenTxInNewWindow) {
                            onOpenTxInNewWindow(txid, height, hash, txList, i);
                          } else if (txid) {
                            onSearch(txid, 'transaction');
                          }
                        }}
                        title={txid}
                      >
                        {truncateHash(txid, 16)}
                      </span>
                      <CopyBtn value={txid} className="opacity-0 group-hover:opacity-100" />
                    </div>
                  ))}
                  {txList.length > 100 && (
                    <div className="text-[var(--text-amber)] text-xs py-1">... and {txList.length - 100} more</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function scrollSection(el: HTMLElement | null, opening: boolean) {
  if (!el) return;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: 'smooth', block: opening ? 'start' : 'nearest' });
  }));
}

function TransactionDisplay({
  data,
  onCopy,
  onSearch
}: {
  data: TransactionResult;
  onCopy: (s: string) => void;
  onSearch: (q: string, t: SearchType) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [showOutputs, setShowOutputs] = useState(false);
  const [showRawJsonTx, setShowRawJsonTx] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const inputsRef  = useRef<HTMLDivElement>(null);
  const outputsRef = useRef<HTMLDivElement>(null);

  // Handle both zcashd format and custom API format
  // Also unwrap nested structures
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawData = data as any;

  // Unwrap if data is nested
  if (rawData?.result && typeof rawData.result === 'object') {
    rawData = rawData.result;
  } else if (rawData?.data && typeof rawData.data === 'object' && !Array.isArray(rawData.data)) {
    rawData = rawData.data;
  } else if (rawData?.transaction && typeof rawData.transaction === 'object') {
    rawData = rawData.transaction;
  }

  // Debug logging disabled - uncomment to troubleshoot API responses
  // console.log('[TransactionDisplay] rawData:', rawData);
  // console.log('[TransactionDisplay] keys:', rawData ? Object.keys(rawData) : 'null');

  // Safely extract values with defaults
  const txid = rawData?.txid || rawData?.hash || '';
  const size = rawData?.size ?? rawData?.vsize ?? 0;
  const version = rawData?.version ?? 0;
  const locktime = rawData?.locktime ?? 0;
  const blockhash = rawData?.blockhash || '';
  const blockheight = rawData?.blockheight ?? rawData?.height ?? null;
  const confirmations = rawData?.confirmations ?? 0;
  const time = rawData?.time ?? rawData?.blocktime ?? 0;

  // zcashd returns vin[] and vout[] arrays
  const vin: Array<{txid?: string; vout?: number; coinbase?: string; scriptSig?: {hex?: string}; value?: number; valueSat?: number; address?: string; addresses?: string[]}> = rawData?.vin || [];
  const vout: Array<{value?: number; valueSat?: number; n?: number; scriptPubKey?: {addresses?: string[]; type?: string; hex?: string}}> = rawData?.vout || [];
  const vinCount = vin.length;
  const voutCount = vout.length;

  // Shielded data
  const vShieldedSpend = rawData?.vShieldedSpend || [];
  const vShieldedOutput = rawData?.vShieldedOutput || [];
  const orchardBundle = rawData?.orchard || null;
  const vjoinsplit = rawData?.vjoinsplit || [];

  const saplingSpends = vShieldedSpend.length;
  const saplingOutputs = vShieldedOutput.length;
  const orchardActions = orchardBundle?.actions?.length ?? 0;
  const sproutJoinsplits = vjoinsplit.length;

  // Value balance (negative means ZEC going into shielded pool)
  const valueBalance = rawData?.valueBalance ?? rawData?.valueBalanceZat ?? 0;
  const valueBalanceZec = typeof valueBalance === 'number' ? valueBalance : 0;

  // Determine transaction type
  const isCoinbase = vin.length === 1 && vin[0]?.coinbase !== undefined;
  const hasSapling = saplingSpends > 0 || saplingOutputs > 0;
  const hasOrchard = orchardActions > 0;
  const hasSprout = sproutJoinsplits > 0;
  const hasShielded = hasSapling || hasOrchard || hasSprout;

  // Calculate transparent values
  let totalInputValue = 0;
  let totalOutputValue = 0;

  // Sum input values (if available)
  vin.forEach(input => {
    if (input.value !== undefined) {
      totalInputValue += input.value;
    } else if (input.valueSat !== undefined) {
      totalInputValue += input.valueSat / 100000000;
    }
  });

  // Sum output values
  vout.forEach(output => {
    if (output.value !== undefined) {
      totalOutputValue += output.value;
    } else if (output.valueSat !== undefined) {
      totalOutputValue += output.valueSat / 100000000;
    }
  });

  // Fee: only meaningful for non-coinbase txs where we have both sides
  const feeZec: number | null = (!isCoinbase && totalInputValue > 0 && totalOutputValue > 0)
    ? Math.max(0, totalInputValue - totalOutputValue)
    : null;
  const feeZat: number | null = feeZec !== null ? Math.round(feeZec * 1e8) : null;

  // Determine transaction classification
  let txType = 'Transparent';
  let txTypeColor = 'var(--text-amber)';

  if (isCoinbase) {
    txType = 'Coinbase';
    txTypeColor = 'var(--accent-gold)';
  } else if (vinCount === 0 && voutCount === 0 && hasShielded) {
    txType = 'Fully Shielded';
    txTypeColor = 'var(--accent-green)';
  } else if (vinCount > 0 && voutCount === 0 && saplingOutputs > 0) {
    txType = 'Shielding';
    txTypeColor = 'var(--accent-purple)';
  } else if (vinCount === 0 && voutCount > 0 && saplingSpends > 0) {
    txType = 'Deshielding';
    txTypeColor = 'var(--accent-orange)';
  } else if (hasShielded && (vinCount > 0 || voutCount > 0)) {
    txType = 'Mixed';
    txTypeColor = 'var(--accent-purple)';
  }

  // Analyze privacy concerns
  const privacyAlerts = useMemo(() => {
    if (!rawData || !txid) return [];
    return analyzeTransactionPrivacy(
      vin,
      vout,
      saplingSpends,
      saplingOutputs,
      orchardActions,
      valueBalanceZec,
      isCoinbase
    );
  }, [vin, vout, saplingSpends, saplingOutputs, orchardActions, valueBalanceZec, isCoinbase, rawData, txid]);

  // If no data at all, show error
  if (!rawData || !txid) {
    return (
      <div className="space-y-4 text-sm font-mono">
        <div className="text-[var(--accent-orange)]">
          Unable to parse transaction data.
        </div>
        <div className="text-[var(--text-green)] text-xs">
          Data preview: {JSON.stringify(data)?.slice(0, 300)}...
        </div>
      </div>
    );
  }

  if (showRawJsonTx) {
    return (
      <div className="space-y-3 text-sm font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[var(--accent-gold)] font-bold">TX {truncateHash(txid, 8)} — Raw JSON</span>
          <div className="flex gap-2">
            <CopyBtn value={JSON.stringify(rawData, null, 2)} className="px-2 py-0.5 text-xs" />
            <button onClick={() => setShowRawJsonTx(false)}
              className="text-xs px-2 py-0.5 border border-[var(--border-window)] text-[var(--text-amber)] hover:text-[var(--accent-gold)]">
              ✕ Close
            </button>
          </div>
        </div>
        <pre className="text-[var(--text-green)] text-xs overflow-auto bg-[var(--bg-inset)] p-3 border border-[var(--border-window)] max-h-[60vh] leading-relaxed">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm font-mono">
      {isCoinbase && (
        <div className="px-4 py-2 bg-[var(--accent-gold)] text-black text-xs font-bold flex items-center gap-2">
          ⛏ Coinbase Transaction — Block Miner Reward
        </div>
      )}
      {/* Privacy Analysis */}
      <PrivacyAlertSection alerts={privacyAlerts} />

      {/* Header with type badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[var(--accent-gold)] text-lg font-bold">Transaction</span>
        <span className="px-2 py-0.5 text-xs border font-bold" style={{ borderColor: txTypeColor, color: txTypeColor }}>
          {txType}
        </span>
        {isCoinbase && (
          <span className="text-[var(--text-amber)] text-xs">Block Reward</span>
        )}
        <div className="ml-auto flex gap-1.5">
          <button
            onClick={() => {
              const { windows, openWindow } = useWindowStore.getState();
              const { queueTxGraph } = useExplorerStore.getState();
              const id = `tx-graph-${txid.slice(0, 8)}`;
              const size = { width: 1060, height: 800 };
              const pos = calculateWindowPosition(windows, size, window.innerWidth, window.innerHeight);
              if (windows.find(w => w.id === id)) { useWindowStore.getState().focusWindow(id); return; }
              openWindow({ id, type: 'tx-graph', title: `TX Graph`, position: pos, size, minSize: { width: 640, height: 400 } });
              queueTxGraph(id, txid);
            }}
            className="text-[var(--accent-purple)]/70 hover:text-[var(--accent-purple)] px-2 py-0.5 border border-[var(--accent-purple)]/30 hover:border-[var(--accent-purple)]/60 text-xs"
            title="Visualise transaction graph"
          >
            Graph ↗
          </button>
          <button
            onClick={() => setShowRawJsonTx(true)}
            className="text-[var(--text-amber)] hover:text-[var(--accent-gold)] px-2 py-0.5 border border-[var(--border-window)] text-xs"
            title="View raw JSON"
          >
            {'{ }'}
          </button>
        </div>
      </div>

      {/* Transaction summary */}
      <div className="text-[var(--text-green)] text-xs">
        Transaction with {vinCount} input{vinCount !== 1 ? 's' : ''} and {voutCount} output{voutCount !== 1 ? 's' : ''}
        {hasShielded && ` + shielded activity`}
      </div>

      {/* Primary info grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Status</div>
          <div className="text-[var(--accent-green)] font-bold text-sm">Confirmed</div>
        </div>

        {(blockhash || blockheight) && (
          <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
            <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Block</div>
            <div
              className="text-[var(--text-green)] text-sm cursor-pointer hover:text-[var(--accent-gold)]"
              onClick={() => onSearch(String(blockheight || blockhash), 'block')}
            >
              {blockheight ? `#${blockheight.toLocaleString()}` : truncateHash(blockhash, 8)}
            </div>
            <div className="text-[var(--text-amber)] text-xs mt-0.5">
              {confirmations.toLocaleString()} confirmations
            </div>
          </div>
        )}

        {time > 0 && (
          <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
            <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Timestamp</div>
            <div className="text-[var(--text-green)] text-sm">{formatRelativeTime(time)}</div>
            <div className="text-[var(--text-amber)] text-xs mt-0.5">{formatTimestamp(time)}</div>
          </div>
        )}

        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Value</div>
          {totalOutputValue > 0 ? (
            <div className="text-[var(--accent-green)] font-bold text-sm">{totalOutputValue.toFixed(8)} ZEC</div>
          ) : hasShielded ? (
            <div className="text-[var(--accent-purple)] text-sm italic">(shielded)</div>
          ) : (
            <div className="text-[var(--text-green)] text-sm">0 ZEC</div>
          )}
        </div>

        {feeZec !== null && feeZec > 0 && (
          <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
            <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Fee</div>
            <div className="text-[var(--text-green)] font-bold text-sm">{feeZec.toFixed(8)} ZEC</div>
            <div className="text-[var(--text-amber)] text-xs mt-0.5">{feeZat?.toLocaleString()} zat</div>
          </div>
        )}
      </div>

      {/* Transaction Hash */}
      <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
        <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Transaction ID</div>
        <div className="flex items-start gap-2">
          <span className="text-[var(--text-green)] text-xs break-all leading-relaxed flex-1 font-mono">{txid}</span>
          <CopyBtn value={txid} />
        </div>
      </div>

      {/* Collapsible sections — each on its own row with a divider */}
      <div className="flex flex-col gap-1">
        {/* Details */}
        <div className="border border-[var(--border-window)]" ref={detailsRef}>
          <button
            onClick={() => { const next = !showDetails; setShowDetails(next); scrollSection(detailsRef.current, next); }}
            className="w-full flex items-center justify-between px-3 py-2 text-[var(--accent-orange)] hover:text-[var(--accent-gold)] text-sm font-bold text-left"
          >
            <span>{showDetails ? '▼' : '▶'} Details</span>
            <span className="text-[var(--text-muted)] text-xs font-normal">
              v{version} · {size > 0 ? formatBytes(size) : '—'}
            </span>
          </button>
          {showDetails && (
            <div className="px-3 pb-3 border-t border-[var(--border-window)]">
              <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-xs pt-2">
                {size > 0 && (<><span className="text-[var(--text-amber)]">Size:</span><span className="text-[var(--text-green)]">{size.toLocaleString()} bytes ({(size / 1024).toFixed(2)} KB)</span></>)}
                {version > 0 && (<><span className="text-[var(--text-amber)]">Version:</span><span className="text-[var(--text-green)]">{version}</span></>)}
                <span className="text-[var(--text-amber)]">Lock Time:</span>
                <span className="text-[var(--text-green)]">{locktime}</span>
                {hasSapling && (<>
                  <span className="text-[var(--text-amber)]">Sapling Spends:</span><span className="text-[var(--text-green)]">{saplingSpends}</span>
                  <span className="text-[var(--text-amber)]">Sapling Outputs:</span><span className="text-[var(--text-green)]">{saplingOutputs}</span>
                  {valueBalanceZec !== 0 && (<>
                    <span className="text-[var(--text-amber)]">Sapling Balance:</span>
                    <span className={valueBalanceZec < 0 ? 'text-[var(--accent-purple)]' : 'text-[var(--accent-orange)]'}>
                      {valueBalanceZec < 0 ? '' : '+'}{valueBalanceZec.toFixed(8)} ZEC
                    </span>
                  </>)}
                </>)}
                {hasOrchard && (<><span className="text-[var(--text-amber)]">Orchard Actions:</span><span className="text-[var(--text-green)]">{orchardActions}</span></>)}
                {blockhash && (<>
                  <span className="text-[var(--text-amber)]">Block Hash:</span>
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="text-[var(--text-green)] break-all cursor-pointer hover:text-[var(--accent-gold)] flex-1 font-mono leading-relaxed"
                      onClick={() => onSearch(String(blockheight || blockhash), 'block')}
                      title="Open block"
                    >{truncateHash(blockhash, 12)}</span>
                    <button
                      onClick={() => onSearch(String(blockheight || blockhash), 'block')}
                      className="shrink-0 text-[10px] px-1.5 py-0.5 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)]"
                    >↗</button>
                    <CopyBtn value={blockhash} />
                  </span>
                </>)}
              </div>
            </div>
          )}
        </div>

        {/* Inputs */}
        {vinCount > 0 && (
          <div className="border border-[var(--border-window)]" ref={inputsRef}>
            <button
              onClick={() => { const next = !showInputs; setShowInputs(next); scrollSection(inputsRef.current, next); }}
              className="w-full flex items-center justify-between px-3 py-2 text-[var(--accent-orange)] hover:text-[var(--accent-gold)] text-sm font-bold text-left"
            >
              <span>{showInputs ? '▼' : '▶'} Inputs ({vinCount})</span>
              {totalInputValue > 0 && <span className="text-[var(--text-green)] text-xs font-normal">{totalInputValue.toFixed(8)} ZEC</span>}
            </button>
            {showInputs && (
              <div className="border-t border-[var(--border-window)] max-h-64 overflow-y-auto">
                {vin.map((input, i) => {
                  const inputAddr = input.address || input.addresses?.[0] || null;
                  const inputVal = input.value !== undefined
                    ? input.value
                    : input.valueSat !== undefined ? input.valueSat / 1e8 : null;
                  return (
                    <div key={i} className="text-xs px-3 py-2.5 border-b border-[var(--border-window)] last:border-0 space-y-1.5">
                      {input.coinbase ? (
                        <span className="text-[var(--accent-gold)] font-bold">⛏ Coinbase — newly minted ZEC</span>
                      ) : (
                        <>
                          {/* Source tx */}
                          {input.txid && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[var(--text-muted)] w-8 shrink-0">src</span>
                              <span
                                className="text-[var(--text-green)] font-mono cursor-pointer hover:text-[var(--accent-gold)] truncate flex-1"
                                onClick={() => onSearch(input.txid!, 'transaction')}
                                title={input.txid}
                              >
                                {truncateHash(input.txid, 10)}:{input.vout ?? '?'}
                              </span>
                              <button
                                onClick={() => onSearch(input.txid!, 'transaction')}
                                className="shrink-0 text-[10px] px-1.5 py-0.5 border border-[var(--accent-purple)]/50 text-[var(--accent-purple)] hover:text-[var(--accent-gold)]"
                                title="Open source transaction"
                              >↗</button>
                              <CopyBtn value={input.txid} />
                            </div>
                          )}
                          {/* Address */}
                          {inputAddr && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[var(--text-muted)] w-8 shrink-0">from</span>
                              <AddrChip address={inputAddr} onExplore={addr => onSearch(addr, 't-address')} />
                            </div>
                          )}
                          {/* Value */}
                          {inputVal !== null && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[var(--text-muted)] w-8 shrink-0">val</span>
                              <span className="text-[var(--accent-orange)] font-bold">{inputVal.toFixed(8)} ZEC</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Outputs */}
        {voutCount > 0 && (
          <div className="border border-[var(--border-window)]" ref={outputsRef}>
            <button
              onClick={() => { const next = !showOutputs; setShowOutputs(next); scrollSection(outputsRef.current, next); }}
              className="w-full flex items-center justify-between px-3 py-2 text-[var(--accent-orange)] hover:text-[var(--accent-gold)] text-sm font-bold text-left"
            >
              <span>{showOutputs ? '▼' : '▶'} Outputs ({voutCount})</span>
              {totalOutputValue > 0 && <span className="text-[var(--accent-green)] text-xs font-normal">{totalOutputValue.toFixed(8)} ZEC</span>}
            </button>
            {showOutputs && (
              <div className="border-t border-[var(--border-window)] max-h-64 overflow-y-auto">
                {vout.map((output, i) => {
                  const outputAddr = output.scriptPubKey?.addresses?.[0] ?? null;
                  const outputVal = output.value !== undefined
                    ? output.value
                    : output.valueSat !== undefined ? output.valueSat / 1e8 : null;
                  return (
                    <div key={i} className="text-xs px-3 py-2.5 border-b border-[var(--border-window)] last:border-0 flex items-center gap-3">
                      <span className="text-[var(--text-muted)] text-[10px] w-4 shrink-0">{output.n ?? i}</span>
                      <div className="flex-1 min-w-0">
                        {outputAddr ? (
                          <AddrChip address={outputAddr} onExplore={addr => onSearch(addr, 't-address')} />
                        ) : (
                          <span className="text-[var(--text-muted)] italic">
                            {output.scriptPubKey?.type || 'Script'}
                          </span>
                        )}
                      </div>
                      {outputVal !== null && (
                        <span className="text-[var(--accent-green)] font-bold shrink-0">{outputVal.toFixed(8)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Shielded Activity */}
      {hasShielded && (
        <div className="border border-[var(--accent-purple)] p-3 bg-[var(--accent-purple)]/10">
          <div className="text-[var(--accent-purple)] font-bold mb-2">Shielded Activity</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {hasSprout && (
              <div>
                <span className="text-[var(--text-amber)]">Sprout Joinsplits:</span>
                <span className="text-[var(--text-green)] ml-2">{sproutJoinsplits}</span>
              </div>
            )}
            {hasSapling && (
              <>
                <div>
                  <span className="text-[var(--text-amber)]">Sapling:</span>
                  <span className="text-[var(--text-green)] ml-2">{saplingSpends} → {saplingOutputs}</span>
                </div>
              </>
            )}
            {hasOrchard && (
              <div>
                <span className="text-[var(--text-amber)]">Orchard:</span>
                <span className="text-[var(--text-green)] ml-2">{orchardActions} actions</span>
              </div>
            )}
          </div>
          <div className="text-[var(--text-amber)] text-xs mt-2 italic">
            Shielded values are encrypted and not publicly visible
          </div>
        </div>
      )}
    </div>
  );
}

// Opens a txid in a brand-new Explorer window rather than navigating the current one
function openTxInNewExplorer(txid: string) {
  const { windows, openWindow } = useWindowStore.getState();
  const { queueSearch } = useExplorerStore.getState();
  const id = `explorer-tx-${txid.slice(0, 8)}`;
  const size = { width: 860, height: 880 };
  const pos = calculateWindowPosition(
    windows, size,
    typeof window !== 'undefined' ? window.innerWidth : 1200,
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  if (!windows.find(w => w.id === id)) {
    openWindow({ id, type: 'explorer', title: 'Explorer', position: pos, size, minSize: { width: 520, height: 480 } });
  }
  queueSearch(id, txid, 'transaction');
  useWindowStore.getState().focusWindow(id);
}

function AddressTxBlock({
  txList,
  txCount,
}: {
  txList: { txid: string; delta?: number }[];
  txCount: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const count = txCount || txList.length;

  return (
    <div className="border border-[var(--border-window)]">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-[var(--bg-titlebar)] hover:bg-[var(--accent-gold)]/5 transition-colors"
      >
        <span className="text-[var(--text-amber)] text-xs uppercase tracking-wide font-bold">
          Transaction History
          {count > 0 && (
            <span className="ml-2 text-[var(--text-muted)] normal-case font-normal tracking-normal">
              ({count.toLocaleString()} total)
            </span>
          )}
        </span>
        <span className="text-[var(--text-muted)] font-mono text-xs">{expanded ? '▲ collapse' : '▼ expand'}</span>
      </button>

      {expanded && (
        <div className="overflow-y-auto border-t border-[var(--border-window)]" style={{ maxHeight: 340 }}>
          {txList.length === 0 ? (
            <div className="px-3 py-5 text-xs text-[var(--text-muted)] font-mono text-center space-y-1">
              <div>No transaction list in API response.</div>
              {txCount > 0 && (
                <div className="text-[10px] opacity-70">
                  Backend reports {txCount.toLocaleString()} txs — API may paginate or use a different field name.
                </div>
              )}
            </div>
          ) : (
            <>
              {txList.map((tx, i) => (
                <div
                  key={tx.txid || i}
                  className="flex items-center text-xs px-3 py-2 border-b border-[var(--border-window)]/40 last:border-0 hover:bg-[var(--accent-gold)]/5 gap-2 cursor-pointer group"
                  onClick={() => tx.txid && openTxInNewExplorer(tx.txid)}
                  title={tx.txid}
                >
                  <span className="text-[var(--text-green)] font-mono flex-1 truncate group-hover:text-[var(--accent-gold)] transition-colors">
                    {truncateHash(tx.txid, 16)}
                  </span>
                  {tx.delta !== undefined && (
                    <span className={`shrink-0 font-mono font-bold text-[11px] ${tx.delta >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-orange)]'}`}>
                      {tx.delta >= 0 ? '+' : ''}{formatZec(tx.delta)}
                    </span>
                  )}
                  <span
                    className="shrink-0 opacity-0 group-hover:opacity-100 text-[10px] px-1.5 py-0.5 border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] transition-opacity"
                    title="Open in new window"
                  >↗</span>
                </div>
              ))}
              {txCount > txList.length && (
                <div className="px-3 py-2 text-[10px] text-[var(--text-muted)] font-mono border-t border-[var(--border-window)] italic">
                  Showing {txList.length.toLocaleString()} of {txCount.toLocaleString()} — API returned partial history
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function TAddressDisplay({
  data,
  onCopy,
  onSearch
}: {
  data: TAddressResult;
  onCopy: (s: string) => void;
  onSearch: (q: string, t: SearchType) => void;
}) {
  const address = data.address || '';
  const balance = data.balance ?? 0;
  const received = data.received ?? 0;
  const anyData = data as unknown as Record<string, unknown>;
  const rawList: unknown[] =
    anyData.transactions as unknown[] ||
    anyData.txids as unknown[] ||
    anyData.history as unknown[] ||
    anyData.txHistory as unknown[] ||
    anyData.tx_list as unknown[] ||
    [];
  const txList = rawList.map((t) =>
    typeof t === 'string' ? { txid: t } : (t as { txid: string; delta?: number })
  );
  const txCount = data.txCount ?? txList.length;

  // Analyze privacy concerns for this address
  const privacyAlerts = useMemo(() => {
    if (!address) return [];
    return analyzeAddressPrivacy(address, txCount, balance, received);
  }, [address, txCount, balance, received]);

  return (
    <div className="space-y-4 text-sm font-mono">
      <PrivacyAlertSection alerts={privacyAlerts} />

      <div className="flex items-center gap-2">
        <span className="text-[var(--accent-gold)] text-2xl font-bold tracking-tight">Transparent Address</span>
        <span className="text-[10px] px-1.5 py-px border border-[var(--text-amber)] text-[var(--text-amber)] font-bold uppercase tracking-wide">t-addr</span>
      </div>

      {/* Address full */}
      <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
        <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Address</div>
        <div className="flex items-start gap-2">
          <span className="text-[var(--text-green)] text-xs break-all leading-relaxed flex-1 font-mono">{address || '—'}</span>
          {address && <CopyBtn value={address} />}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Balance</div>
          <div className="text-[var(--accent-green)] font-bold text-sm">{formatZec(balance)}</div>
        </div>
        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Received</div>
          <div className="text-[var(--text-green)] text-sm">{formatZec(received)}</div>
        </div>
        <div className="border border-[var(--border-window)] p-3 bg-[var(--bg-window)]">
          <div className="text-[var(--text-amber)] text-xs mb-1.5 uppercase tracking-wide">Txs</div>
          <div className="text-[var(--text-green)] text-sm font-bold">{txCount.toLocaleString()}</div>
        </div>
      </div>

      <AddressTxBlock txList={txList} txCount={txCount} />
    </div>
  );
}

function ZAddressDisplay({
  data,
  onCopy
}: {
  data: ZAddressResult;
  onCopy: (s: string) => void;
}) {
  const typeLabel = data.type === 'sapling' ? 'Sapling' :
                    data.type === 'orchard' ? 'Orchard' :
                    'Unified';

  return (
    <div className="space-y-3 text-sm font-mono">
      <div className="flex items-center gap-3">
        <span className="text-[var(--accent-gold)] text-lg">Shielded Address</span>
        <span className="px-2 py-0.5 text-xs border border-[var(--accent-purple)] text-[var(--accent-purple)]">
          {typeLabel}
        </span>
      </div>

      <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1">
        <span className="text-[var(--text-amber)]">Address:</span>
        <span className="flex items-start gap-2 min-w-0">
          <span className="text-[var(--text-green)] break-all text-xs font-mono leading-relaxed flex-1">{data.address}</span>
          <CopyBtn value={data.address} />
        </span>

        <span className="text-[var(--text-amber)]">Valid:</span>
        <span className={data.valid ? 'text-[var(--accent-green)]' : 'text-[var(--accent-orange)]'}>
          {data.valid ? 'Yes' : 'No'}
        </span>
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 p-3 border border-[var(--accent-purple)] bg-[var(--accent-purple)]/10">
        <div className="text-[var(--accent-purple)] font-bold mb-2">Privacy Protected</div>
        <div className="text-[var(--text-green)] text-xs leading-relaxed">
          {data.message}
        </div>
        <div className="text-[var(--text-amber)] text-xs mt-3">
          This is a feature, not a limitation. Zcash shielded addresses provide
          financial privacy equivalent to cash transactions.
        </div>
      </div>

      {/* What IS visible */}
      <div className="mt-4 pt-2 border-t border-[var(--border-window)]">
        <div className="text-[var(--text-amber)] mb-2">Publicly Visible Shielded Metrics:</div>
        <ul className="text-[var(--text-green)] text-xs space-y-1 list-disc list-inside">
          <li>Total shielded pool sizes (Sprout, Sapling, Orchard)</li>
          <li>Number of shielded actions per transaction</li>
          <li>Whether a transaction is fully or partially shielded</li>
          <li>Aggregate network privacy statistics</li>
        </ul>
      </div>

      {/* Shielded tx history block */}
      <div className="mt-4 border border-[var(--accent-purple)]/40">
        <div className="flex items-center justify-between px-3 py-2.5 bg-[var(--bg-titlebar)]">
          <span className="text-[var(--text-amber)] text-xs uppercase tracking-wide font-bold">Transaction History</span>
          <span className="text-[var(--accent-purple)] text-xs font-mono">shielded</span>
        </div>
        <div className="px-3 py-4 text-xs font-mono text-[var(--text-muted)] leading-relaxed">
          Transaction history for shielded addresses is encrypted and not publicly visible on-chain.
          Only the owner of the spending key can view inbound and outbound activity.
        </div>
      </div>
    </div>
  );
}

export default Explorer;
