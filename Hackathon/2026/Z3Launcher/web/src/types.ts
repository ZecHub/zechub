// Mirror of the backend's frozen telemetry schema (internal/telemetry,
// internal/aggregator, internal/endpoints). Keep field names in sync.

export type ServiceState =
  | 'unknown'
  | 'stopped'
  | 'starting'
  | 'syncing'
  | 'ready'
  | 'running'
  | 'unreachable'

export interface Service {
  service: string
  state: ServiceState
  syncPct: number
  height: number
  tip: number
  diskFree: number

  // containerUp: the Docker container exists and is running, regardless of
  // whether its RPC/health endpoint answers yet. Source of truth for "is the
  // stack up". containerState is the raw Docker state ("running", "exited",
  // "absent", ...) for display/diagnostics. Both are optional for resilience
  // against older backends.
  containerUp?: boolean
  containerState?: string
}

export interface Endpoint {
  name: string
  url: string
  proto: string
  hint?: string
}

export interface Endpoints {
  ready: boolean
  endpoints: Endpoint[]
}

export interface Snapshot {
  network: string
  ready: boolean
  services: Service[]
  endpoints: Endpoints
  timestamp: string

  // Optional: populated when the last background action (Start/Reset, or
  // a synchronous Stop/Restart failure) reported an error. The dashboard
  // renders a red banner when present and clears it on the next success.
  lastActionError?: string
  lastActionName?: string
  lastActionAt?: string
}
