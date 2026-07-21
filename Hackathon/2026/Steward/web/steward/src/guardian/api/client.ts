import type {
  HeartbeatBulletin,
  PendingSession,
  RecvResponse,
  SendBody,
  VaultStatus,
} from './types'

/** The relay header that binds a request to a guardian's identity (its vault relay
 *  id, e.g. `amara`). Mirrors `ID_HEADER` in the coordinator. */
const ID_HEADER = 'x-steward-id'

/** An error from the coordinator, carrying the HTTP status so callers can react to
 *  a 404 (unknown vault) or transport failure specifically. */
export class ApiError extends Error {
  readonly status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** The coordinator API a guardian speaks. `baseUrl` is the coordinator origin from
 *  enrollment; `''` means same-origin (the dev server proxies /vault, /session). */
export function makeClient(baseUrl: string) {
  const base = baseUrl.replace(/\/+$/, '')

  async function request<T>(
    method: string,
    path: string,
    init?: { body?: unknown; guardianId?: string },
  ): Promise<T> {
    const headers: Record<string, string> = {}
    if (init?.guardianId) headers[ID_HEADER] = init.guardianId
    if (init?.body !== undefined) headers['content-type'] = 'application/json'

    let res: Response
    try {
      res = await fetch(`${base}${path}`, {
        method,
        headers,
        body: init?.body === undefined ? undefined : JSON.stringify(init.body),
      })
    } catch {
      throw new ApiError(0, 'Cannot reach the coordinator. Is it running and reachable?')
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

  return {
    /** Vault status at the server's `now` — for the seal's `t of n` + ambient state. */
    vaultStatus: (vaultId: string) => request<VaultStatus>('GET', `/vault/${vaultId}`),
    /** The open relay-mode ceremonies this guardian could approve. */
    pending: (vaultId: string) =>
      request<PendingSession[]>('GET', `/vault/${vaultId}/pending`),
    /** The latest signed proof-of-life bulletin — fetched so the guardian can INDEPENDENTLY
     *  verify the owner's heartbeat and compute `is_lapsed` before arming a release. */
    heartbeatBulletin: (vaultId: string) =>
      request<HeartbeatBulletin>('GET', `/vault/${vaultId}/heartbeat`),
    /** Drain this guardian's relay mailbox for `sessionId` (non-blocking FIFO). */
    recv: (sessionId: string, guardianId: string) =>
      request<RecvResponse>('POST', `/session/${sessionId}/recv`, { guardianId }),
    /** Route a relay payload (a round reply) for `sessionId`. */
    send: (sessionId: string, guardianId: string, body: SendBody) =>
      request<unknown>('POST', `/session/${sessionId}/send`, { body, guardianId }),
  }
}

export type Client = ReturnType<typeof makeClient>
