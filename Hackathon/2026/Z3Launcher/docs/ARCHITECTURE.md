# Architecture

Z3 Launcher is two planes with a deliberately thin seam between them:

- **Control plane** — a single Go binary (`z3launcher`) that embeds the React dashboard, runs
  preflight checks, orchestrates startup, aggregates telemetry, and exposes a loopback-only
  HTTP API (REST + SSE). You interact with this.
- **Data plane** — a vendored Docker Compose project (`deploy/compose/`) that runs the actual
  Zcash services: the Zebra full node, the Zaino indexer, and the optional Zallet wallet, plus a
  regtest overlay that adds a `zcashd` miner and an nginx RPC router. Docker runs this.

The binary never links against Zcash code. Everything chain-related lives in pinned container
images; the Go side is pure orchestration, which is why the whole launcher cross-compiles to six
platforms with `CGO_ENABLED=0` and no native dependencies.

Related docs: [README](../README.md) for the pitch and quickstart, [API](API.md) for every HTTP
endpoint, [OPERATIONS](OPERATIONS.md) for runbooks (snapshot capture, funding),
[KNOWN-ISSUES](KNOWN-ISSUES.md) for honest limitations, and the
[implementation plan](../z3-node-launcher-implementation-plan.md) for the ticket-level roadmap.

## The big picture

```
                       ┌──────────────────────────────────┐
                       │  Browser dashboard (React SPA,   │
                       │  embedded in the Go binary)      │
                       └───────────────┬──────────────────┘
                             HTTP + SSE, 127.0.0.1:8088
                       ┌───────────────▼──────────────────┐
  CONTROL PLANE        │  z3launcher (single Go binary)   │
  (this repo's Go)     │   server ── aggregator ── logs   │
                       │   launcher ── compose wrapper    │
                       │   preflight ── faststart         │
                       │   wallet ── regtest ── climax    │
                       └───────────────┬──────────────────┘
                docker compose -p z3 | z3-testnet | z3-regtest
                       ┌───────────────▼──────────────────────────┐
  DATA PLANE           │  vendored compose (deploy/compose/)      │
  (pinned images)      │                                          │
                       │  zebra   zfnd/zebra:5.2.0                │
                       │   ├─ RPC 8232 → host 127.0.0.1:18232     │
                       │   ├─ /ready 8080 → host 127.0.0.1:8080   │
                       │   └─ cache: zebra-cache named volume     │
                       │      (or fast-start host bind mount)     │
                       │  zaino   zingodevops/zainod:0.4.1        │
                       │   ├─ runs inside zebra's network ns      │
                       │   ├─ gRPC 8137, JSON-RPC 8237            │
                       │   └─ reads zebra's cache read-only       │
                       │  zallet  zodlinc/zallet:alpha.4 (zaino)  │
                       │   ├─ profile "zallet", RPC 28232         │
                       │   └─ zallet-data volume + age identity   │
                       │                                          │
                       │  regtest overlay adds: zcashd miner,     │
                       │  rpc-router (nginx), mine-genesis        │
                       └──────────────────────────────────────────┘
```

## Control plane

`cmd/z3launcher/main.go` parses flags, resolves config (network, data dir, ports, images), runs
preflight, and — in `-serve` mode — wires ~15 internal packages into `internal/server` and starts
the HTTP control plane on `127.0.0.1:8088`. The React SPA is compiled to `web/dist` and embedded
with `//go:embed all:dist` (`web/embed.go`), so the released binary is fully self-contained: no
separate web server, no CDN, no assets on disk.

The server is loopback-only by default and defends mutating requests with a three-signal
same-origin / DNS-rebinding guard (loopback `Host`, `Origin`, `Sec-Fetch-Site`); binding a
non-loopback `-addr` relaxes the guard and prints an explicit UNAUTHENTICATED warning. Details in
[API.md](API.md).

## Data plane: the vendored compose project

`deploy/compose/docker-compose.yml` defines the base stack; `docker-compose.regtest.yml` is an
overlay the launcher adds automatically when you pass `-network regtest`. Key structural choices:

- **Zaino shares Zebra's network namespace** (`network_mode: service:zebra`), so it reaches Zebra
  at `127.0.0.1:8232` — which sidesteps Zaino's TLS requirement for non-localhost validators.
  Zaino's ports (8137 gRPC, 8237 JSON-RPC) are therefore published on the `zebra` service.
- **Zebra's RPC cookie auth is disabled** (`ZEBRA_RPC__ENABLE_COOKIE_AUTH=false`) so the
  launcher's cookieless readiness probe works.
- **All host ports bind to 127.0.0.1 only.**
- **Zallet is profile-gated** (`profiles: ["zallet"]`) across all four of its services: the
  long-running `zallet` plus three one-shots (`zallet-init`, `zallet-mnemonic`, `zallet-import`).
  The one-shots are not idempotent (`init-wallet-encryption` errors on re-run;
  `generate-mnemonic` silently stores a fresh seed each time), so the launcher drives them with
  `docker compose run` instead of a `depends_on` chain.
- **The regtest overlay** adds a `zcashd` miner (profile `regtest`), an nginx `rpc-router`
  proxying `/zebra/*` and `/zcashd/*`, and a `mine-genesis` one-shot that mines 10 blocks past
  genesis — Zaino fails with "could not determine best chain" on a genesis-only chain. Zebra's
  regtest config activates NU5/NU6 at height 2 via a mounted `zebrad.regtest.toml` (activation
  heights cannot be set through env vars).

## The compose wrapper

`internal/compose` is the only code that shells out to Docker. It builds and runs
`docker compose` commands (`Up`, `Down`, `Stop`, `Restart`, `Recreate`, `Run`,
`RunWithStdinTTY`, `Logs`), tracks `ContainerStates`/`ProjectContainers` via `compose ps`, tees
lifecycle output into the dashboard's Activity feed, and resolves `DOCKER_HOST` once per process
(memoized, shared with the install code's socket list, so Colima/OrbStack/Docker
Desktop/Rancher all resolve to the same daemon for the process lifetime).

**Project names are per-network** so destructive actions cannot cross networks — a regtest
`Reset` (`down -v`) can never wipe a multi-day mainnet sync:

| Network | Compose project | Chain-state volume       |
|---------|-----------------|--------------------------|
| mainnet | `z3`            | `z3_zebra-cache`         |
| testnet | `z3-testnet`    | `z3-testnet_zebra-cache` |
| regtest | `z3-regtest`    | `z3-regtest_zebra-cache` |

**Profiles**: `ComposeProfiles()` in `internal/config` is the single source of truth — it joins
`zallet` (when `-with-zallet`) and `regtest` (when the zcashd miner is enabled). Down/Reset
always activate *all* profiles (`--profile zallet --profile regtest`) so profile-gated services
and their volumes are truly removed.

**The env map** (`config.EnvMap`) is the entire contract between the Go side and the compose
files — every `${VAR:-default}` in the YAML is fed from here:

| Variable | Purpose |
|----------|---------|
| `NETWORK_NAME` | Zebra's network (`Mainnet`/`Testnet`/`Regtest`) |
| `Z3_ZEBRA_HOST_RPC_PORT` | Host port for Zebra RPC (default 18232) |
| `Z3_ZEBRA_HOST_HEALTH_PORT` | Host port for Zebra `/ready` (default 8080) |
| `ZAINO_HOST_GRPC_PORT` / `ZAINO_HOST_JSONRPC_PORT` | Zaino host ports (8137 / 8237) |
| `ZALLET_HOST_RPC_PORT` | Zallet host RPC port (28232) |
| `ZEBRA_IMAGE` / `ZAINO_IMAGE` / `ZALLET_IMAGE` / `ZCASHD_IMAGE` | Pinned images, env-overridable |
| `Z3_DATA_DIR` | Host data dir (default `~/.z3-launcher/data`) |
| `Z3_ZEBRA_CACHE_DIR` | Host path for the Zebra cache when fast-start is attached |
| `Z3_ZEBRA_CACHE_MOUNT` | Mount source for Zebra's cache: named volume OR host bind (see fast-start) |
| `ZAINO_CONFIG_FILE` / `ZALLET_CONFIG_FILE` | Per-network TOML selection |
| `ZALLET_IDENTITY_FILE` | Per-network age identity path on the host |
| `COMPOSE_PROFILES` | Active profiles (always emitted, even when empty) |

Preflight-resolved ports are written back into the shared `*config.Config` before the env map is
emitted, so the endpoint banner, the compose processes, and the Go RPC clients can never disagree
about which port is live.

## Two-phase startup

Starting everything at once does not work: Zaino needs a *reachable* Zebra and Zallet needs a
reachable Zebra *and* a provisioned wallet, so a flat `compose up` crash-loops both dependents
while Zebra syncs or opens its database. Ordering is therefore enforced twice — `depends_on:
condition: service_healthy` in the compose files, and explicitly in Go, because compose health
alone cannot express "wait indefinitely while syncing":

```
Sequence:  StartZebra ──▶ WaitReady ──▶ StartDependents
           (up zebra)     (poll /ready    (up zaino [+ zallet if enabled
                           via RPC)         AND wallet provisioned])
```

`WaitReady` (`internal/launcher/stack.go`) polls Zebra's `getblockchaininfo` every 5 s (first
check immediate) and distinguishes three cases:

1. **Reachable but syncing** → `(false, nil)` → waited on **indefinitely**. A cold mainnet sync
   takes days; that is not an error.
2. **Probe errors** (connection refused, timeout) → tolerated up to 24 consecutive failures
   (~2 minutes). On budget exhaustion the launcher checks the *container's* Docker state: if the
   `zebra` container is still `running`/`created`/`restarting`, the budget **resets** and the
   wait continues. This is the container-liveness tolerance: a synced testnet cache is a 9–28 GB
   RocksDB that can take 1–5+ minutes to open (10+ after an unclean shutdown forces WAL
   recovery), during which Zebra accepts no connections at all. Without this rule the launcher
   used to declare a perfectly healthy node unreachable mid-open and never start Zaino.
3. **Container dead or unreportable** → `zebra unreachable after N consecutive probes`. A wrong
   port or crashed daemon still fails fast instead of parking the dashboard at "starting".

Lifecycle actions themselves are serialized by a controller with cancel-and-replace semantics: a
new action cancels any in-flight one and waits for it to unwind, so `up` and `down -v` can never
run concurrently, yet Stop can still interrupt a multi-day sync.

## Wallet state model

Zallet wallet state is a **trio** that must stay consistent, kept per compose project (so per
network):

| Piece | Location | Holds |
|-------|----------|-------|
| Docker volume | `<project>_zallet-data` | Encrypted keystore + imported seed |
| Age identity | `<dataDir>/zallet-identity-<project>.txt` | X25519 key (mode 0600) that encrypts the keystore |
| Marker | `<dataDir>/.zallet-provisioned-<project>` | "A wallet exists" flag gating container start |

Four mechanisms keep the trio from drifting:

- **Reconcile at startup**: `-serve` runs a best-effort check — if the `zallet-data` volume is
  gone (e.g. a manual `docker volume rm`), the stale marker and orphaned identity are cleared, so
  the launcher can never try to start a seedless Zallet that would just crash-loop.
- **Provisioning gate**: `zallet` only joins the dependent set when `-with-zallet` is on *and*
  the marker exists. Until you create or restore a wallet from the dashboard, the Zallet card
  showing "stopped" is intentional.
- **Identity guard**: before bringing up a provisioned `zallet`, the launcher verifies the
  identity file is present and usable. Without this, Docker would helpfully create a *directory*
  at the missing bind-mount source and Zallet would crash-loop with `EISDIR`.
- **PTY seed import**: create/restore generate (go-bip39, 256-bit → 24 words) or accept a
  BIP-39 phrase launcher-side and import it through the `zallet-import` one-shot over a real
  pseudo-terminal (`creack/pty` via `compose.RunWithStdinTTY`) — Zallet's `rpassword` prompt
  reads `/dev/tty`, so plain stdin piping does not work. The phrase never appears in argv, logs,
  error strings, or on disk; on create it is returned to the browser exactly once for backup.

The `zallet-init` one-shot is made idempotent at the wrapper level: an "already initialized"
failure is recognized and tolerated, anything else is a real error. On first wallet open the
dashboard auto-creates account 0 (`z_getnewaccount`, named "Main") because a freshly imported
Zallet wallet has a seed but zero accounts.

## Fast-start internals

Fast-start attaches a pre-synced Zebra state directory so the stack is usable in minutes instead
of a 1–3 day cold sync. It has three parts:

**Inspect/validate** (`internal/faststart`): a snapshot must look like
`<cache-root>/state/v<N>/<network>/` containing a RocksDB `CURRENT` pointer plus at least one
`MANIFEST-NNNNNN` (requiring both stops an empty scaffold from passing), and usually a `version`
file with the minor/patch. The DB-format major `N` is parsed from the directory name — never
hardcoded — and compared against `-zebra-state-major` when given (0 skips the check; zebra 5.2.0
writes v27). `Inspect` is read-only and powers both the CLI dry-run and the dashboard's "Check
Data" button; `Validate` gates any attach.

**Mount swap**: Zebra's cache mount source in compose is `${Z3_ZEBRA_CACHE_MOUNT:-zebra-cache}`.
Normally that resolves to the named volume `zebra-cache` — the default exists because the
non-root `zebra` user chowns the cache on first start, and a chown on a host bind mount fails
with permission denied. When fast-start is attached, config flips `FastStartAttached` and
`EnvMap` emits `Z3_ZEBRA_CACHE_MOUNT=<host snapshot path>` instead, turning the same mount into
a bind mount. Zaino reads the identical `${Z3_ZEBRA_CACHE_MOUNT}` source read-only, so the
snapshot is automatically shared with the indexer.

**Two attach paths**:

- *At launch*: `-faststart <dir> [-zebra-state-major N]` validates before anything starts and
  configures the mount for the whole run.
- *Live, from the dashboard*: `POST /api/faststart/attach` validates first — a validation
  failure returns 422 and leaves the running stack untouched — then swaps the env var,
  force-recreates Zebra (`RecreateZebra`, so the container is rebuilt with the new mount),
  re-runs `WaitReady`, and force-recreates the dependents so Zaino picks up the new read-only
  mount. The re-sequence is asynchronous; the UI watches it over the status stream.

Caveat: on macOS Docker (Colima/virtiofs), a live RocksDB on a bind mount is too slow for
Zebra's RPC to come up — prefer restoring the snapshot *into* the named volume there. See
[KNOWN-ISSUES](KNOWN-ISSUES.md) and the snapshot runbook in [OPERATIONS](OPERATIONS.md).

## Internal package map

**`internal/aggregator`** combines the Zebra RPC probe, the Zaino health probe, disk usage, and
Docker container states into one telemetry `Snapshot`, served over REST and pushed over SSE. It
maps raw probe results onto the frozen per-service schema and surfaces `DockerError` and the
last lifecycle-action error so the UI can show exactly one coherent picture.

**`internal/climax`** drives the demo climax — a live shielded action against Zaino end-to-end.
On regtest it uses direct RPC with no external binary; on mainnet/testnet it shells out to a
Zingo wallet against Zaino's lightwalletd-compatible gRPC endpoint, degrading to a
connect+sync+read-balance fallback when no funds are available. It always reports a mode rather
than hard-failing.

**`internal/compose`** is the docker compose wrapper described above — command construction,
container-state tracking, activity teeing, PTY one-shots, and consistent `DOCKER_HOST`
resolution.

**`internal/config`** owns network parsing (mainnet/testnet/regtest plus aliases), per-network
compose project names, default ports and pinned images, the data-dir default, validation, and
the `EnvMap`/`ComposeProfiles` contract with the compose files.

**`internal/disk`** reports filesystem usage for the chain-state data dir (platform-specific
implementations), feeding the dashboard's disk-free gauge and low-disk warnings.

**`internal/dockerinstall`** turns "Docker missing" into a guided, consent-gated install:
platform and runtime detection, streaming install/start, daemon verification,
`CanElevateNonInteractive` (so a browser-context install never hangs on a sudo prompt), and the
shared socket-path list for Colima/OrbStack/Docker Desktop/Rancher.

**`internal/endpoints`** surfaces the connection URLs a developer points a wallet or app at; the
URLs are always returned, with a `Ready` flag telling the UI when they are actually usable.

**`internal/faststart`** implements snapshot `Inspect` and `Validate` (layout, RocksDB markers,
DB-format major) and applies the result to config, as described in the fast-start section.

**`internal/installjob`** runs a single long-lived streaming task (the Docker install, the
runtime start) with single-flight semantics and atomic replay+subscribe, so a second click is a
no-op and a late-joining SSE subscriber sees every output line exactly once.

**`internal/launcher`** orchestrates the stack lifecycle on top of the compose wrapper: the
mandatory two-phase startup, `WaitReady` with the container-liveness tolerance, the wallet
provisioning marker and identity guard, and Stop/Restart/Reset/Attach re-sequencing.

**`internal/logs`** streams container log output line by line (the testable scanning loop behind
the dashboard log viewer) and hosts the Activity broadcaster that merges compose lifecycle
output with container logs into one feed.

**`internal/preflight`** runs the environment checks — Docker installed/running (the only hard
fail), host-port availability with automatic port correction, disk space (network-scaled
recommendations), docker credential-helper sanity, an optional Zebra probe, and a server-only
stale-stack check — turning runtime failures into actionable guidance for both the CLI and the
dashboard banner. It also houses the consent-gated installer plumbing.

**`internal/regtest`** seeds a fully local test environment: it drives block mining to a
configured miner address over JSON-RPC and exposes the results as JSON, powering the regtest
seeder panel and the no-real-funds climax.

**`internal/server`** is the HTTP control plane: REST + SSE routes, the same-origin/
DNS-rebinding guard, layered body-size caps, and a pluggable provider pattern — routes are
registered unconditionally and return 503 until their capability is injected via `Set*` methods.

**`internal/telemetry`** defines the frozen backend↔frontend per-service status schema. The JSON
field names are the dashboard contract; renaming one is a breaking change by design.

**`internal/wallet`** holds the launcher-owned pieces of Zallet provisioning that Zallet's CLI
cannot surface: BIP-39 mnemonic generation and validation, and per-user age identity generation
and verification.

**`internal/zaino`** probes Zaino health dependency-free: JSON-RPC `getinfo` with a TCP-dial
fallback on the gRPC port.

**`internal/zallet`** is a small JSON-RPC client for the Zallet wallet service (default
credentials `z3launcher`/`z3launcher`), with a `Ping` that fails gracefully while Zallet is off.

**`internal/zebra`** is a small JSON-RPC client for Zebra covering `getblockchaininfo` and
`getinfo`; it computes the sync percentage and the readiness signal `WaitReady` polls.

## Frontend architecture

The dashboard is a React 19 + TypeScript SPA (`web/`, built with Vite, tested with vitest) that
compiles to `web/dist` and is embedded into the Go binary. It talks only to the loopback API.

**One SSE connection drives everything.** `subscribeStatus` (`web/src/api.ts`) opens an
`EventSource` on `GET /api/stream`; the server pushes a full `status` snapshot immediately and
then every 2 seconds. `App.tsx` stores the latest snapshot, derives the connected/disconnected
state, and computes a sync ETA from consecutive Zebra height samples. There is no polling loop
in the steady state — REST calls are only made for actions (start/stop/wallet RPC/attach), after
which the UI simply waits for the stream to reflect the result. Log viewing (`/api/logs`) and
the install/runtime-start streams are separate `EventSource`s opened on demand.

**Five hash-routed views** (`#dashboard`, `#wallet`, `#tools`, `#logs`, `#settings`):

| View | Components |
|------|------------|
| Overview | `ActionErrorBanner`, `PreflightBanner`, `SyncProgress` (with ETA), `Controls`, a `ServiceCard` grid (spinner while starting, green dot when running), `EndpointPanel` |
| Wallet | `WalletDashboard` — `WalletSetup` (create with one-time seed reveal + confirm quiz, or restore), `WalletConsole`, `SendSheet`, `ReceiveSheet`; auto-creates account "Main" on first open |
| Setup | `FastStartPanel` (Check Data / Attach & Restart), `RegtestSeeder` (regtest only), `ClimaxPanel` |
| Activity | `LogViewer` over the merged activity/log SSE stream |
| Privacy & security | `PrivacyPanel` (local-only posture) |

`web/src/types.ts` mirrors the frozen `internal/telemetry` schema — the two must move together.

## Testing

The Go side has 23 `*_test.go` files across 19 packages (`make test` → `go test ./...`); the
frontend has vitest suites for formatting and install-flow logic (`make web-test`). CI runs both
and cross-compiles release binaries for linux/darwin/windows on amd64 and arm64.
