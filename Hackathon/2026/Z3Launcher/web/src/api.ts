import type { Snapshot } from './types'

export type Action = 'start' | 'stop' | 'restart' | 'reset'

export async function postAction(action: Action): Promise<void> {
  const res = await fetch(`/api/${action}`, { method: 'POST' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `action ${action} failed (${res.status})`)
  }
}

export async function fetchStatus(): Promise<Snapshot> {
  const res = await fetch('/api/status')
  if (!res.ok) throw new Error(`status ${res.status}`)
  return res.json()
}

// subscribeStatus opens the SSE telemetry stream and returns an unsubscribe fn.
export function subscribeStatus(
  onSnap: (s: Snapshot) => void,
  onError?: (e: Event) => void,
): () => void {
  const es = new EventSource('/api/stream')
  es.addEventListener('status', (ev) => {
    try {
      onSnap(JSON.parse((ev as MessageEvent).data))
    } catch {
      /* ignore malformed frame */
    }
  })
  if (onError) es.onerror = onError
  return () => es.close()
}

// subscribeLogs streams a service's container logs (all services if empty).
export function subscribeLogs(service: string, onLine: (line: string) => void): () => void {
  const url = service ? `/api/logs?service=${encodeURIComponent(service)}` : '/api/logs'
  const es = new EventSource(url)
  es.addEventListener('log', (ev) => {
    try {
      const d = JSON.parse((ev as MessageEvent).data)
      onLine(d.line ?? '')
    } catch {
      /* ignore */
    }
  })
  return () => es.close()
}

export interface InspectResult {
  info: {
    cacheRoot: string
    statePath: string
    majorVersion: number
    minorPatch?: string
    network: string
  }
  expectedMajor: number
  majorMatches: boolean
  usable: boolean
  message: string
}

export async function inspectSnapshot(path: string): Promise<InspectResult> {
  const res = await fetch(`/api/faststart/inspect?path=${encodeURIComponent(path)}`)
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || `inspect failed (${res.status})`)
  return body
}

// attachSnapshot remounts the live stack onto a validated pre-synced snapshot.
// The node then re-sequences (Zebra "starting" → "ready" on the new state),
// which the normal status stream reflects — so callers just refresh after.
export async function attachSnapshot(path: string): Promise<void> {
  const res = await fetch('/api/faststart/attach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `attach failed (${res.status})`)
  }
}

// Preflight types (plan §11.1, Z3-22)
export type CheckStatus = 'ok' | 'warn' | 'fail' | 'fixed'

export interface PreflightCheck {
  name: string
  status: CheckStatus
  message: string
  hint?: string
  original?: number
  actual?: number
}

export interface PreflightReport {
  ok: boolean
  checks: PreflightCheck[]
  resolved: {
    zebraRpc: number
    zebraHealth: number
    zainoGrpc: number
    zainoJsonrpc: number
    zalletRpc: number
  }
}

export async function fetchPreflight(): Promise<PreflightReport> {
  const res = await fetch('/api/preflight')
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || `preflight failed (${res.status})`)
  return body
}

// Docker installer (plan §11.2, Z3-22)
export interface InstallPlan {
  started: boolean
  platform: string
  method: string
  command?: string
  manual?: string
  elevated: boolean
  automatic: boolean
  note?: string
  message: string
}

export async function fetchInstallPlan(): Promise<InstallPlan> {
  const res = await fetch('/api/install-docker')
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || `install plan failed (${res.status})`)
  return body
}

export interface InstallStart {
  started: boolean
  state: string
}

// startInstall kicks off the streaming Docker install (the click is consent).
// It returns immediately; call subscribeInstall to watch progress.
export async function startInstall(): Promise<InstallStart> {
  const res = await fetch('/api/install-docker', { method: 'POST' })
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || `install start failed (${res.status})`)
  return body
}

export interface InstallDone {
  state: string
  error?: string
}

// subscribeInstall streams the live install output: onLog per output line,
// onDone with the terminal state. Returns an unsubscribe fn.
export function subscribeInstall(
  onLog: (line: string) => void,
  onDone: (done: InstallDone) => void,
): () => void {
  const es = new EventSource('/api/install-docker/stream')
  es.addEventListener('log', (ev) => {
    try {
      onLog(JSON.parse((ev as MessageEvent).data).line ?? '')
    } catch {
      /* ignore */
    }
  })
  es.addEventListener('done', (ev) => {
    try {
      onDone(JSON.parse((ev as MessageEvent).data))
    } catch {
      /* ignore */
    }
    es.close()
  })
  return () => es.close()
}

// Docker runtime starter (e.g. Colima on macOS)
export async function startRuntime(): Promise<InstallStart> {
  const res = await fetch('/api/start-runtime', { method: 'POST' })
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || `runtime start failed (${res.status})`)
  return body
}

export function subscribeRuntime(
  onLog: (line: string) => void,
  onDone: (done: InstallDone) => void,
): () => void {
  const es = new EventSource('/api/start-runtime/stream')
  es.addEventListener('log', (ev) => {
    try {
      onLog(JSON.parse((ev as MessageEvent).data).line ?? '')
    } catch {
      /* ignore */
    }
  })
  es.addEventListener('done', (ev) => {
    try {
      onDone(JSON.parse((ev as MessageEvent).data))
    } catch {
      /* ignore */
    }
    es.close()
  })
  return () => es.close()
}

// Regtest seeder (Z3-33)
export interface FundedAccount {
  address: string
  balance: number
  txid: string
  index: number
}

export interface SeedResult {
  minedBlocks: number
  tipHeight: number
  accounts: FundedAccount[]
  message: string
}

export async function fetchRegtestStatus(): Promise<{ reachable: boolean; error?: string }> {
  const res = await fetch('/api/regtest/status')
  if (res.status === 503) return { reachable: false, error: 'seeder not configured' }
  return res.json()
}

export async function runRegtestSeed(blocks?: number): Promise<SeedResult> {
  const res = await fetch('/api/regtest/seed', {
    method: 'POST',
    headers: blocks ? { 'Content-Type': 'application/json' } : {},
    body: blocks ? JSON.stringify({ blocks }) : undefined,
  })
  const body = await res.json()
  if (!res.ok) {
    throw new Error(body.error || body.message || `seed failed (${res.status})`)
  }
  return body
}

// Climax (Z3-34)
export interface ClimaxStatus {
  walletFound: boolean
  wallet?: string
  zainoReachable: boolean
  ready: boolean
  message: string
}

export interface ClimaxResult {
  mode: 'shielded-action' | 'fallback' | 'no-wallet'
  wallet?: string
  message: string
  output?: string
  started: string
  ended: string
}

export async function fetchClimaxStatus(): Promise<ClimaxStatus> {
  const res = await fetch('/api/climax/status')
  if (res.status === 503) return { walletFound: false, zainoReachable: false, ready: false, message: 'climax unavailable' }
  return res.json()
}

export async function runClimax(): Promise<ClimaxResult> {
  const res = await fetch('/api/climax', { method: 'POST' })
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || `climax failed (${res.status})`)
  return body
}

// Zallet toggle (runtime enable/disable)
export interface ZalletStatus { enabled: boolean; available: boolean }

export async function fetchZalletStatus(): Promise<ZalletStatus> {
  const res = await fetch('/api/zallet/status')
  return res.json()
}

export async function toggleZallet(enabled: boolean): Promise<void> {
  const res = await fetch('/api/zallet/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `zallet toggle failed (${res.status})`)
  }
}

// Wallet proxy (Zallet JSON-RPC)
export interface WalletStatus { reachable: boolean; provisioned: boolean; message?: string }

export async function fetchWalletStatus(): Promise<WalletStatus> {
  const res = await fetch('/api/wallet/status')
  return res.json()
}

// ===== Wallet setup: create / restore / reset =====

// The 24 recovery words, returned ONCE after creating a wallet, plus the age
// recipient (public key) of the wallet's encryption identity.
export interface WalletSeed { words: string[]; recipient: string }

// createWallet provisions a brand-new wallet and returns its seed words once.
export async function createWallet(): Promise<WalletSeed> {
  const res = await fetch('/api/wallet/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || `create failed (${res.status})`)
  return body
}

// restoreWallet imports a user-supplied recovery phrase into a fresh wallet.
export async function restoreWallet(phrase: string): Promise<void> {
  const res = await fetch('/api/wallet/restore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phrase }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `restore failed (${res.status})`)
  }
}

// resetStack performs the destructive reset (wipes the wallet + chain state). It
// carries the typed confirmation token the backend now requires.
// clearStale removes leftover containers (compose down) while KEEPING every
// volume — the safe fix for the stale-container preflight warning. Unlike
// resetStack (down -v), it never touches chain state or the wallet.
export async function clearStale(): Promise<void> {
  const res = await fetch('/api/clear', { method: 'POST' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `clear failed (${res.status})`)
  }
}

export async function resetStack(): Promise<void> {
  const res = await fetch('/api/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confirm: 'RESET' }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `reset failed (${res.status})`)
  }
}

export interface WalletRPCResponse {
  result?: any
  error?: { message: string }
}

export async function walletRPC(method: string, params?: any[] | Record<string, any>): Promise<WalletRPCResponse> {
  const res = await fetch('/api/wallet/rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method, params: params ?? [] }),
  })
  return res.json()
}

// ===== Typed Zallet wallet helpers =====
// These wrap the generic RPC proxy with the real shapes returned by
// zallet v0.1.0-alpha.3 (confirmed against the live node). Errors from the
// JSON-RPC layer are thrown so callers can try/catch.

async function rpc<T = any>(method: string, params?: any[] | Record<string, any>): Promise<T> {
  const res = await walletRPC(method, params)
  if (res.error) throw new Error(res.error.message || 'wallet RPC error')
  return res.result as T
}

export interface WalletAccount {
  account_uuid: string
  name: string
  account: number
  seedfp: string
  addresses: { ua: string; diversifier_index: number }[]
}

// A note/UTXO from z_listunspent. zallet returns both transparent UTXOs and
// shielded notes here, each tagged with its owning account and pool.
export interface UnspentNote {
  txid: string
  pool: 'transparent' | 'sapling' | 'orchard'
  account_uuid: string
  value: number
  confirmations: number
  address?: string
  walletInternal?: boolean
}

// Per-account balance derived by aggregating z_listunspent — zallet alpha has
// no z_getbalanceforaccount, so we compute it client-side.
export interface AccountBalance {
  total: number
  spendable: number // confirmations >= 1
  pending: number // confirmations == 0
  pools: { transparent: number; sapling: number; orchard: number }
}

export interface TotalBalance {
  transparent: string
  private: string
  total: string
}

export interface WalletTx {
  account_uuid: string
  txid: string
  mined_height: number | null
  account_balance_delta: number // zatoshis, signed (+received / -sent)
  fee_paid: number | null
  block_datetime: string | null
  expired_unmined: boolean
}

export type OperationState = 'queued' | 'executing' | 'success' | 'failed' | 'cancelled'
export interface OperationStatus {
  id: string
  status: OperationState
  result?: { txid: string }
  error?: { message?: string; code?: number }
}

export interface SendRecipient { address: string; amount: number; memo?: string }

export const ZATS_PER_ZEC = 1e8

export const walletTotalBalance = () => rpc<TotalBalance>('z_gettotalbalance', [0, true])
export const walletListAccounts = () => rpc<WalletAccount[]>('z_listaccounts', [])
export const walletListUnspent = (minconf = 0) => rpc<UnspentNote[]>('z_listunspent', [minconf])
export const walletNewAccount = (name: string) => rpc<{ account_uuid: string }>('z_getnewaccount', { account_name: name })
export const walletAddressForAccount = (account: number) =>
  rpc<{ address: string; account: number; diversifier_index: number; receiver_types: string[] }>('z_getaddressforaccount', [account])
export const walletUnifiedReceivers = (ua: string) => rpc<Record<string, string>>('z_listunifiedreceivers', [ua])
export const walletListTransactions = (accountUuid?: string) =>
  rpc<WalletTx[]>('z_listtransactions', accountUuid ? [accountUuid] : [])
export const walletOperationStatus = (opids: string[]) => rpc<OperationStatus[]>('z_getoperationstatus', [opids])

// z_sendmany is async: it returns an operation id to poll. fee is always null
// (zallet computes the ZIP-317 fee itself).
export const walletSend = (from: string, recipients: SendRecipient[], privacyPolicy = 'FullPrivacy') =>
  rpc<string>('z_sendmany', [from, recipients, 1, null, privacyPolicy])

// Aggregate z_listunspent into per-account balances keyed by account_uuid.
export function aggregateBalances(notes: UnspentNote[]): Map<string, AccountBalance> {
  const m = new Map<string, AccountBalance>()
  for (const n of notes) {
    const b = m.get(n.account_uuid) ?? { total: 0, spendable: 0, pending: 0, pools: { transparent: 0, sapling: 0, orchard: 0 } }
    b.total += n.value
    if (n.confirmations >= 1) b.spendable += n.value
    else b.pending += n.value
    if (n.pool in b.pools) b.pools[n.pool] += n.value
    m.set(n.account_uuid, b)
  }
  return m
}

// Poll an operation id until it resolves (success/failed/cancelled) or times out.
export async function pollOperation(opid: string, onTick?: (s: OperationStatus) => void, timeoutMs = 90_000): Promise<OperationStatus> {
  const deadline = Date.now() + timeoutMs
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [s] = await walletOperationStatus([opid])
    if (s) {
      onTick?.(s)
      if (s.status === 'success' || s.status === 'failed' || s.status === 'cancelled') return s
    }
    if (Date.now() > deadline) return s ?? { id: opid, status: 'failed', error: { message: 'timed out waiting for operation' } }
    await new Promise((r) => setTimeout(r, 1500))
  }
}
