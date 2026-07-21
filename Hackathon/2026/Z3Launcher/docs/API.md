# Z3 Launcher HTTP API

The launcher exposes a local control plane at `http://127.0.0.1:8088`: a JSON REST API for status
and lifecycle actions, plus Server-Sent Events (SSE) streams for live telemetry and logs. The same
server also serves the embedded dashboard SPA at `/`.

Source of truth: `internal/server/server.go` (handlers and guard) and `cmd/z3launcher/main.go`
(wiring). Related docs: [README](../README.md), [Architecture](ARCHITECTURE.md),
[Operations](OPERATIONS.md), [Known Issues](KNOWN-ISSUES.md).

## Conventions

- Base URL: `http://127.0.0.1:8088` (change with the `-addr` flag; see [Security](#security-model)).
- All API responses are JSON with `Content-Type: application/json`, except `/healthz` (plain text)
  and the SSE streams (`text/event-stream`).
- Errors use a uniform shape: `{"error": "<message>"}`.
- The API is unauthenticated by design — it binds to loopback only and is protected by a
  same-origin / DNS-rebinding guard (below). Do not expose it to a network you do not trust.

Status codes you will see:

| Code | Meaning here |
| --- | --- |
| 200 | Success; body is the result |
| 202 | Accepted; the action continues in the background — watch `/api/stream` |
| 400 | Bad request (missing/invalid field, missing typed confirmation) |
| 403 | Blocked by the same-origin / DNS-rebinding guard |
| 415 | Wrong `Content-Type` (wallet RPC only) |
| 422 | Input validated and rejected (bad snapshot path, bad seed phrase, wallet already exists) |
| 500 | The action ran and failed |
| 503 | The capability behind this route is not configured in the current run |

### 503-until-configured

Every route is registered unconditionally, but many depend on a capability that is injected at
startup depending on flags, platform, and network (`SetSeeder`, `SetWalletSetup`,
`SetRuntimeStarter`, ...). Until that dependency is set, the route returns
`503 {"error": "<capability> not configured/unavailable"}`. For example, `/api/regtest/*` is 503
unless the launcher runs a regtest overlay, and `/api/wallet/create` is 503 unless the Zallet
profile is available. Two routes degrade gracefully instead of 503ing: `GET /api/zallet/status`
returns `{"enabled": false, "available": false}` and `GET /api/wallet/status` returns
`{"reachable": false, ...}` with HTTP 200.

### Route summary

| Method | Path | Group | Success |
| --- | --- | --- | --- |
| GET | `/healthz` | Status | 200 `ok` (plain text) |
| GET | `/api/status` | Status | 200 snapshot |
| GET | `/api/stream` | Status | SSE `status` events |
| GET | `/api/logs` | Logs | SSE `log` events |
| POST | `/api/start` | Lifecycle | 202 |
| POST | `/api/stop` | Lifecycle | 202 |
| POST | `/api/restart` | Lifecycle | 202 |
| POST | `/api/reset` | Lifecycle | 202 (typed confirm required) |
| GET | `/api/preflight` | Preflight/Docker | 200 report |
| GET | `/api/install-docker` | Preflight/Docker | 200 install plan |
| POST | `/api/install-docker` | Preflight/Docker | 202 job state |
| GET | `/api/install-docker/stream` | Preflight/Docker | SSE `log` + `done` |
| POST | `/api/start-runtime` | Preflight/Docker | 202 job state |
| GET | `/api/start-runtime/stream` | Preflight/Docker | SSE `log` + `done` |
| GET | `/api/faststart/inspect` | Fast start | 200 validation result |
| POST | `/api/faststart/attach` | Fast start | 202 `attaching` |
| GET | `/api/regtest/status` | Regtest | 200 reachability |
| POST | `/api/regtest/seed` | Regtest | 200 seed result |
| GET | `/api/climax/status` | Climax | 200 readiness |
| POST | `/api/climax` | Climax | 200 result (never hard-fails) |
| GET | `/api/zallet/status` | Zallet toggle | 200 |
| POST | `/api/zallet/toggle` | Zallet toggle | 200 |
| GET | `/api/wallet/status` | Wallet | 200 (always) |
| POST | `/api/wallet/create` | Wallet | 200 seed words (once) |
| POST | `/api/wallet/restore` | Wallet | 200 |
| POST | `/api/wallet/rpc` | Wallet | 200 RPC result |
| GET | `/` | Static | 200 dashboard SPA |

## Security model

### Loopback bind

The `-addr` flag defaults to `127.0.0.1:8088`. If you bind a non-loopback address (`:8088`,
`0.0.0.0:8088`, a LAN IP), the launcher calls `SetAllowRemote(true)` and prints a loud warning:
the control plane is UNAUTHENTICATED and the origin checks below are relaxed. The 1 MiB body cap
is never relaxed. Only do this on a network you trust.

### Same-origin / DNS-rebinding guard

All mutating requests (POST/PUT/PATCH/DELETE) pass through a guard; GET requests (status, SSE,
static files, `/healthz`) are served unguarded so the dashboard and tooling work. The guard checks
three independent signals and rejects with 403 on any failure:

| Check | Rejects with |
| --- | --- |
| `Host` header must be loopback (`localhost`, `127.0.0.0/8`, `::1`) | `forbidden: non-loopback Host header` |
| `Origin` header, if present, must be loopback | `forbidden: cross-origin request` |
| `Sec-Fetch-Site` header, if present, must be `same-origin` or `none` | `forbidden: cross-site request` |

This stops a malicious web page you happen to visit from driving destructive POSTs (reset, wallet
RPC) against your local launcher, including via DNS rebinding.

Plain `curl` against `127.0.0.1:8088` passes the guard without extra headers: curl sends a loopback
`Host` and no `Origin` or `Sec-Fetch-Site`. If your HTTP client does send an `Origin`, it must be
loopback — `-H 'Origin: http://127.0.0.1:8088'` works, anything cross-origin gets a 403.

### Body size caps (layered)

| Layer | Cap | Applies to |
| --- | --- | --- |
| Guard `MaxBytesReader` | 1 MiB | every mutating request body |
| Per-handler `io.LimitReader` | 64 KiB | `/api/reset`, `/api/faststart/attach`, `/api/wallet/restore`, `/api/regtest/seed` |
| Upstream response cap | 8 MiB | Zallet JSON-RPC responses relayed by `/api/wallet/rpc` |

### Typed confirmation for destructive actions

`POST /api/reset` additionally requires the literal body `{"confirm":"RESET"}` — defense in depth
on top of the guard, so a request that somehow slips past it still cannot wipe a wallet.

### Content-Type check on the wallet relay

`POST /api/wallet/rpc` requires a `Content-Type` starting with `application/json` (else 415). A
cross-site "simple request" cannot set that header without triggering a CORS preflight, which the
guard blocks — a second, independent defense for the wallet relay.

## SSE event format

All streams use standard Server-Sent Events: `Content-Type: text/event-stream`,
`Cache-Control: no-cache`, events framed as `event: <name>\ndata: <payload>\n\n`. Every stream
sets a 10-second write deadline per event; a stalled or disconnected client breaks the loop and
releases the connection. Consume with `EventSource` in a browser or `curl -sN`.

| Stream | Event | `data` payload |
| --- | --- | --- |
| `GET /api/stream` | `status` | full status snapshot JSON (same shape as `/api/status`) |
| `GET /api/stream` | `error` | JSON-quoted error string, e.g. `"docker not running"` |
| `GET /api/logs` | `log` | `{"service": "<name or empty>", "line": "<text>"}` |
| `GET /api/install-docker/stream` | `log` | `{"line": "<text>"}` |
| `GET /api/install-docker/stream` | `done` | `{"state": "succeeded\|failed\|running\|idle", "error": "<msg or empty>"}` |
| `GET /api/start-runtime/stream` | `log` / `done` | identical to the install stream |

`/api/stream` emits one `status` event immediately, then one every 2 seconds. The install and
runtime streams replay all buffered output first, then stream live lines, then end with exactly one
terminal `done` event (remaining buffered lines are drained before `done`, so nothing is lost).

## Status and streams

### GET /healthz

Liveness probe. No guard, no JSON.

```sh
curl -s http://127.0.0.1:8088/healthz
# ok
```

### GET /api/status

One-shot status snapshot: per-service state, sync progress, and the surfaced endpoints. This is the
aggregator's `Snapshot` (schema in `internal/aggregator` + `internal/telemetry`).

```sh
curl -s http://127.0.0.1:8088/api/status | jq .
```

```json
{
  "network": "testnet",
  "ready": true,
  "services": [
    {
      "service": "zebra",
      "state": "ready",
      "syncPct": 100,
      "height": 4052100,
      "tip": 4052100,
      "diskFree": 118000000000,
      "containerUp": true,
      "containerState": "running"
    },
    {
      "service": "zaino",
      "state": "running",
      "syncPct": 0,
      "height": 0,
      "tip": 0,
      "diskFree": 118000000000,
      "containerUp": true,
      "containerState": "running"
    }
  ],
  "endpoints": {
    "ready": true,
    "endpoints": [
      { "name": "Zebra JSON-RPC", "url": "http://127.0.0.1:18232", "proto": "jsonrpc" },
      { "name": "Zaino gRPC (lightwalletd)", "url": "127.0.0.1:8137", "proto": "grpc" }
    ]
  },
  "timestamp": "2026-07-04T12:00:00Z"
}
```

Service `state` is one of `unknown`, `stopped`, `starting`, `syncing`, `ready`, `running`,
`unreachable`. Optional top-level fields appear when relevant: `lastActionError`,
`lastActionName`, `lastActionAt` (last failed lifecycle action) and `dockerError` (daemon
unreachable). On a status-provider error the endpoint returns `503 {"error": "..."}`.

### GET /api/stream

SSE version of `/api/status`: an immediate `status` event, then one every 2 seconds. Provider
failures surface as `error` events on the same stream rather than closing it.

```sh
curl -sN http://127.0.0.1:8088/api/stream
# event: status
# data: {"network":"testnet","ready":true,...}
```

### GET /api/logs

SSE stream of the launcher's activity feed: lifecycle command output (`docker compose` up/down,
image pulls, container creation, errors) merged with live container logs. Falls back to container
logs only if no activity feed is wired; returns `503 {"error":"logs unavailable"}` if neither
source exists.

| Query param | Meaning |
| --- | --- |
| `service` | optional container name filter for the container-log fallback; empty = all |

```sh
curl -sN 'http://127.0.0.1:8088/api/logs?service=zebra'
# event: log
# data: {"service":"zebra","line":"2026-07-04T12:00:01Z INFO zebrad: estimated tip ..."}
```

## Lifecycle

### POST /api/start, /api/stop, /api/restart

Run the corresponding lifecycle action. `Start` is two-phase (Zebra first, dependents once ready)
and may return before the stack is fully up — 202 means "accepted", then watch `/api/stream`.
Returns `503 {"error":"no controller"}` if no controller is wired, `500 {"error": "..."}` if the
action fails.

```sh
curl -s -X POST http://127.0.0.1:8088/api/start
# {"status":"accepted"}
```

### POST /api/reset

Destructive: runs `docker compose down -v` across all profiles, deleting the wallet volume AND all
chain state. Requires the typed confirmation body; anything else is a 400 with an explanatory
message.

| Body field | Required | Value |
| --- | --- | --- |
| `confirm` | yes | the literal string `RESET` |

```sh
curl -s -X POST http://127.0.0.1:8088/api/reset \
  -H 'Content-Type: application/json' \
  -d '{"confirm":"RESET"}'
# {"status":"accepted"}
```

Without the confirmation:

```json
{
  "error": "reset is destructive: it deletes the wallet and all chain state. Back up your seed first, then send {\"confirm\":\"RESET\"}."
}
```

## Preflight and Docker setup

### GET /api/preflight

Runs the environment checks (Docker present, daemon running, disk space, port availability) and
returns the resolved host port set — the single source of truth for what the stack will actually
bind, including any auto-corrected port remaps.

```sh
curl -s http://127.0.0.1:8088/api/preflight | jq .
```

```json
{
  "ok": true,
  "checks": [
    { "name": "docker", "status": "ok", "message": "docker 27.4.0 found" },
    { "name": "port 8137", "status": "fixed", "message": "8137 busy; remapped", "original": 8137, "actual": 8138 }
  ],
  "resolved": {
    "zebraRpc": 18232,
    "zebraHealth": 8080,
    "zainoGrpc": 8137,
    "zainoJsonrpc": 8237,
    "zalletRpc": 28232
  }
}
```

Check `status` is one of `ok`, `warn`, `fail`, `fixed` (auto-corrected by the launcher, e.g. a port
remap, with `original`/`actual`). 503 if preflight is not wired; 500 if the checks themselves error.

### GET /api/install-docker

Read-only: returns the platform-specific Docker install plan so the dashboard can show the exact
command before asking for consent. Never runs anything.

```sh
curl -s http://127.0.0.1:8088/api/install-docker | jq .
```

```json
{
  "started": false,
  "platform": "darwin",
  "method": "homebrew",
  "command": "brew install colima docker && colima start",
  "elevated": false,
  "automatic": true,
  "message": "ready to run: brew install colima docker && colima start"
}
```

Fields `command`, `manual`, and `note` are omitted when empty; `automatic: false` means no headless
installer exists for this platform and `manual` points at instructions.

### POST /api/install-docker

Starts the streaming Docker install. The POST itself is the user's consent (the dashboard button
click). Single-flight: a second POST while a run is in flight is a no-op that returns
`started: false` — just open the stream and watch the existing run. The job runs under a background
context, so closing the SSE stream (or the tab) never aborts a half-finished install.

```sh
curl -s -X POST http://127.0.0.1:8088/api/install-docker
# {"started":true,"state":"running"}
```

`state` is the job lifecycle: `idle`, `running`, `succeeded`, `failed`.

### GET /api/install-docker/stream

SSE feed of the install output: replays everything buffered so far, then live lines, then one
terminal `done` event.

```sh
curl -sN http://127.0.0.1:8088/api/install-docker/stream
# event: log
# data: {"line":"==> Downloading colima..."}
# ...
# event: done
# data: {"state":"succeeded","error":""}
```

### POST /api/start-runtime and GET /api/start-runtime/stream

Same contract as the install pair, for starting the Docker runtime when Docker is installed but the
daemon is not running (e.g. `colima start` on macOS). Separate single-flight job; the stream
mirrors the install stream exactly (`log` events, then `done`).

```sh
curl -s -X POST http://127.0.0.1:8088/api/start-runtime
# {"started":true,"state":"running"}
curl -sN http://127.0.0.1:8088/api/start-runtime/stream
```

## Fast start (pre-synced snapshots)

See [Operations](OPERATIONS.md) for capturing snapshots, and [Known Issues](KNOWN-ISSUES.md) for
the macOS bind-mount performance caveat that applies to attach.

### GET /api/faststart/inspect

Read-only validation of a snapshot directory: checks the Zebra RocksDB layout
(`state/v<N>/<network>/` with `CURRENT` + `MANIFEST-*`) and the DB format major version. Never
mutates anything — safe to call against a running stack.

| Query param | Required | Meaning |
| --- | --- | --- |
| `path` | yes | host path of the snapshot cache root |

```sh
curl -s 'http://127.0.0.1:8088/api/faststart/inspect?path=/Users/you/z3-testnet-snapshot' | jq .
```

```json
{
  "info": {
    "source": "/Users/you/z3-testnet-snapshot",
    "cacheRoot": "/Users/you/z3-testnet-snapshot",
    "statePath": "/Users/you/z3-testnet-snapshot/state/v27/testnet",
    "majorVersion": 27,
    "network": "testnet"
  },
  "expectedMajor": 27,
  "majorChecked": true,
  "majorMatches": true,
  "usable": true,
  "message": "state looks usable"
}
```

Missing `path` is a 400; an unusable directory is a 422 with the reason. `minorPatch` appears in
`info` when the snapshot's `version` file records it.

### POST /api/faststart/attach

One-click "Attach & Restart": validates the path exactly like inspect and, only if usable, swaps
Zebra's cache mount onto it, force-recreates Zebra, waits for readiness, then force-recreates the
dependents. Validation failures are 422 and leave the running stack untouched. Success is 202 —
the re-sequence is asynchronous; watch Zebra go `starting` then `ready` on `/api/stream`.

| Body field | Required | Meaning |
| --- | --- | --- |
| `path` | yes | host path of the validated snapshot |

```sh
curl -s -X POST http://127.0.0.1:8088/api/faststart/attach \
  -H 'Content-Type: application/json' \
  -d '{"path":"/Users/you/z3-testnet-snapshot"}'
# {"status":"attaching"}
```

On macOS, a live RocksDB on a bind-mount is too slow under Colima/virtiofs and Zebra may never
reach ready — prefer restoring the snapshot into the named volume instead
([Known Issues](KNOWN-ISSUES.md)).

## Regtest seeding

Only available when the launcher runs the regtest overlay; on mainnet/testnet both routes return
`503 {"error":"regtest seeder not configured"}`.

### GET /api/regtest/status

Pings the regtest node's JSON-RPC. Always 200 once the seeder is configured.

```sh
curl -s http://127.0.0.1:8088/api/regtest/status
# {"reachable":true}
# or: {"reachable":false,"error":"connection refused"}
```

### POST /api/regtest/seed

Mines blocks on regtest via the node's generate RPC. The body is optional; omitting it (or sending
`{"blocks":0}`) mines the default 110 blocks (enough to pass coinbase maturity). The mine runs on a
detached context with a 3-minute timeout, so closing the client cannot kill it mid-run.

| Body field | Required | Constraint |
| --- | --- | --- |
| `blocks` | no | 0–10000; 0 or omitted means the default 110 |

```sh
curl -s -X POST http://127.0.0.1:8088/api/regtest/seed \
  -H 'Content-Type: application/json' \
  -d '{"blocks":110}' | jq .
```

```json
{
  "minedBlocks": 110,
  "tipHeight": 110,
  "accounts": [],
  "message": "mined 110 blocks"
}
```

Out-of-range `blocks` is a 400. Failures return `500 {"result": <partial>, "error": "..."}` — the
partial result tells you how far the seed got. Note the honest limitation: mined regtest coinbase
is transparent and Zallet (shielded-first) does not surface it as spendable, so seeding advances
the chain but cannot practically fund the wallet ([Known Issues](KNOWN-ISSUES.md)).

## Climax (live wallet test)

Drives the launcher's end-to-end "shielded action" demo against Zaino. Both routes return
`503 {"error":"climax runner not configured"}` if the runner is not wired.

### GET /api/climax/status

Readiness: is a wallet binary available and is Zaino reachable? The dashboard uses this to
enable/disable the demo button.

```sh
curl -s http://127.0.0.1:8088/api/climax/status | jq .
```

```json
{
  "walletFound": true,
  "wallet": "zingo-cli",
  "zainoReachable": true,
  "ready": true,
  "message": "ready"
}
```

### POST /api/climax

Runs the demo. Always returns 200 with a `Result` whose `mode` explains what happened — the demo
never hard-fails:

| `mode` | Meaning |
| --- | --- |
| `shielded-action` | the live shielded action ran against Zaino |
| `fallback` | wallet present but the action could not complete; fallback path shown |
| `no-wallet` | no wallet binary found; explanation returned |

```sh
curl -s -X POST http://127.0.0.1:8088/api/climax | jq .
```

```json
{
  "mode": "shielded-action",
  "wallet": "zingo-cli",
  "message": "shielded action completed",
  "output": "...tail of wallet stdout (capped)...",
  "started": "2026-07-04T12:00:00Z",
  "ended": "2026-07-04T12:00:41Z"
}
```

## Zallet service toggle

Zallet is profile-gated: it is held back until a wallet exists (an unprovisioned Zallet
crash-loops), so "stopped" in the dashboard before wallet creation is intentional.

### GET /api/zallet/status

Always 200. `available: false` means the toggle is not wired in this run.

```sh
curl -s http://127.0.0.1:8088/api/zallet/status
# {"enabled":true,"available":true}
```

### POST /api/zallet/toggle

Enables or disables the Zallet service at runtime (starts/stops the profile-gated container).

| Body field | Required | Meaning |
| --- | --- | --- |
| `enabled` | yes | `true` to start Zallet, `false` to stop it |

```sh
curl -s -X POST http://127.0.0.1:8088/api/zallet/toggle \
  -H 'Content-Type: application/json' \
  -d '{"enabled":true}'
# {"enabled":true}
```

Malformed body is a 400 (`invalid request body`); a failed enable/disable is a 500; 503 if the
toggle is not available.

## Wallet

The browser cannot reach Zallet directly (it lives on the Docker network), so the launcher proxies
JSON-RPC to `http://127.0.0.1:<zalletRpc>` (default 28232). Create/restore run on detached
contexts with a 2-minute timeout — closing the tab cannot abort a seed import halfway through.

### GET /api/wallet/status

Always HTTP 200. Tells the dashboard whether to show the create/restore setup flow
(`provisioned: false`) or the live wallet.

```sh
curl -s http://127.0.0.1:8088/api/wallet/status
# {"reachable":true,"provisioned":true}
# or: {"reachable":false,"provisioned":false,"message":"wallet proxy not configured"}
```

### POST /api/wallet/create

Provisions a new wallet: generates an age encryption identity and a 24-word BIP-39 mnemonic
(256-bit, launcher-side), initializes the Zallet keystore, imports the seed over a PTY (never
logged), marks the wallet provisioned, and starts the container. Refuses (422) if a wallet already
exists or Zebra is not running.

No request body. The response is the one-time backup payload — the 24 recovery words are returned
ONCE and never persisted or shown again:

```sh
curl -s -X POST http://127.0.0.1:8088/api/wallet/create | jq .
```

```json
{
  "words": ["abandon", "ability", "...22 more..."],
  "recipient": "age1..."
}
```

`recipient` is the public half of the wallet's age encryption identity. 503 if wallet setup is not
configured (e.g. Zallet profile unavailable in this run).

### POST /api/wallet/restore

Imports a user-supplied recovery phrase. The phrase is validated as a BIP-39 mnemonic, normalized,
imported over a PTY, and never logged or written to disk. Refuses (422) if a wallet already exists
or Zebra is not running.

| Body field | Required | Meaning |
| --- | --- | --- |
| `phrase` | yes | the 24-word recovery phrase, space-separated |

```sh
curl -s -X POST http://127.0.0.1:8088/api/wallet/restore \
  -H 'Content-Type: application/json' \
  -d '{"phrase":"abandon ability able ... zoo"}'
# {"status":"restored"}
```

### POST /api/wallet/rpc

Generic JSON-RPC relay to Zallet. There is deliberately no server-side method allowlist — any
Zallet method is relayed; the endpoint is defended by the same-origin guard plus the mandatory
`application/json` Content-Type (415 otherwise). `params` may be a positional array or a named
object — Zallet uses named params for some methods (e.g. `z_getnewaccount`).

| Body field | Required | Meaning |
| --- | --- | --- |
| `method` | yes | Zallet JSON-RPC method name |
| `params` | no | positional array or named object, passed through verbatim |

RPC-level failures return HTTP 200 with an `error` object (JSON-RPC style), not an HTTP error:

```json
{"result": null, "error": {"message": "wallet is still syncing"}}
```

Examples (all verified working shapes; the dashboard's wallet console uses these):

```sh
# list accounts
curl -s -X POST http://127.0.0.1:8088/api/wallet/rpc \
  -H 'Content-Type: application/json' \
  -d '{"method":"z_listaccounts","params":[]}'

# create an account (named params)
curl -s -X POST http://127.0.0.1:8088/api/wallet/rpc \
  -H 'Content-Type: application/json' \
  -d '{"method":"z_getnewaccount","params":{"account_name":"default"}}'

# balances (positional params: minconf 0, include watch-only)
curl -s -X POST http://127.0.0.1:8088/api/wallet/rpc \
  -H 'Content-Type: application/json' \
  -d '{"method":"z_gettotalbalance","params":[0,true]}'

# discover what Zallet supports
curl -s -X POST http://127.0.0.1:8088/api/wallet/rpc \
  -H 'Content-Type: application/json' \
  -d '{"method":"help"}'
```

Other methods the dashboard exercises: `listaddresses`, `getwalletinfo`, `z_getnotescount`,
`z_listtransactions`, `z_listunspent`, `getinfo`. Upstream responses are capped at 8 MiB.

## Static SPA

### GET /

Catch-all that serves the embedded dashboard. More specific `/api/*` and `/healthz` patterns win
under Go 1.22 ServeMux precedence. If the launcher was built without the web UI, it returns
`200 {"message": "Z3 Launcher API is running; build the web UI (make web) to serve the dashboard."}`.
