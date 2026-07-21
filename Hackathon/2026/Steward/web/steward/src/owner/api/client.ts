import type {
  DemoVaultRequest,
  DemoVaultResponse,
  HeartbeatBody,
  HeartbeatResponse,
  PendingSession,
  SessionRequest,
  SessionResponse,
  SpendRequest,
  SpendResponse,
  VaultStatus,
  VaultSyncResponse,
} from './types'

/** An error from the coordinator, carrying the HTTP status so callers can react to
 *  the 403 dead-man's-switch refusal specifically. */
export class ApiError extends Error {
  readonly status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { 'content-type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, 'Cannot reach the coordinator. Is the server running?')
  }

  const text = await res.text()
  let data: unknown
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : typeof data === 'string' && data
          ? data
          : res.statusText || `request failed (${res.status})`
    throw new ApiError(res.status, message)
  }
  return data as T
}

export const api = {
  seedVault: (body: DemoVaultRequest) =>
    request<DemoVaultResponse>('POST', '/demo/vault', body),
  vaultStatus: (id: string) => request<VaultStatus>('GET', `/vault/${id}`),
  /** Scan the public endpoint for the vault's balance (~15s; 502 if the signer
   *  binary is not built). */
  sync: (id: string) => request<VaultSyncResponse>('POST', `/vault/${id}/sync`),
  /** Record a SIGNED proof-of-life. `body` is `{ time, sig_hex }` — the coordinator verifies
   *  the Ed25519 signature against the vault's recorded pubkey before accepting it. */
  heartbeat: (id: string, body: HeartbeatBody) =>
    request<HeartbeatResponse>('POST', `/vault/${id}/heartbeat`, body),
  session: (id: string, body: SessionRequest) =>
    request<SessionResponse>('POST', `/vault/${id}/session`, body),
  /** Open relay-mode ceremonies awaiting guardians (drives the live seal). */
  pending: (id: string) =>
    request<PendingSession[]>('GET', `/vault/${id}/pending`),
  /** Send a REAL payment: build a transaction to `body.to` for `body.amount_zat` zatoshis, have
   *  the guardians co-sign the real sighash (relay by default), broadcast, and return the txid.
   *  A LONG request (~1–2 min on mainnet) — `request()` has no client timeout, so a plain await
   *  is fine. 422 = insufficient funds / not synced; 502 = signer missing. */
  spend: (id: string, body: SpendRequest) =>
    request<SpendResponse>('POST', `/vault/${id}/spend`, body),
  /** Inheritance RELEASE: sweep the vault's entire balance to the recorded heir address, have the
   *  guardians co-sign (each re-verifying the switch has tripped), broadcast, and return the txid.
   *  Long like `spend`. 403 = still active (switch not tripped); 400 = plain multisig / no heir. */
  release: (id: string, body: { mode?: 'relay' | 'auto' }) =>
    request<SpendResponse>('POST', `/vault/${id}/release`, body),
}
