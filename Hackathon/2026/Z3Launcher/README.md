# Z3 Launcher

**Zero to a wallet-usable Zcash backend in one command — minutes, not days.**

> **ZecHub Hackathon 3.0 submission (Infrastructure track).**
> Demo video: [youtu.be/ttgSmMy-mPg](https://youtu.be/ttgSmMy-mPg).
> Jump to the [60-second tour for judges](#for-judges--60-second-tour).

Z3 Launcher is a single Go binary that supervises the official
[`ZcashFoundation/z3`](https://github.com/ZcashFoundation/z3) stack — the Zebra full node, the
Zaino indexer, and (optionally) the Zallet wallet — through Docker Compose, and puts a local
browser dashboard in front of it. It never touches consensus or indexing logic: it is a control
plane over pinned upstream containers. Bound to `127.0.0.1` only. No remote surface, no
telemetry, no key custody.

```sh
make serve-regtest    # build + control plane + dashboard at http://127.0.0.1:8088
```

---

## For judges — 60-second tour

The fastest full demo runs on regtest (instant blocks, no real funds, and the one network where
the alpha Zallet wallet is fully functional today — see [Known limitations](#known-limitations)):

1. **`make serve-regtest`** and open <http://127.0.0.1:8088>. The preflight banner checks
   Docker, host ports (auto-correcting conflicts), and disk before you touch anything.
2. **Click Start.** Watch the two-phase startup live: the Zebra card shows a spinner while the
   container comes up, flips to a green dot at ready, genesis blocks are mined, then Zaino
   follows. The endpoint panel unlocks with copyable wallet-facing URLs.
3. **Toggle Zallet on** in the control bar, open the **Wallet** tab, and click *Create a new
   wallet*: a 24-word recovery phrase is revealed exactly once, you confirm you saved it via a
   word quiz, and the wallet opens with a first account auto-created.
4. **Setup tab → Test Environment**: mine a few blocks on your local chain and watch the tip
   climb on Overview.
5. **Setup tab → Test Your Wallet → Run Test Now**: an end-to-end test against the live stack —
   on regtest a real action over direct RPC, green "Test Successful!" card with the raw output.

Where the impressive parts live: the two-phase startup and cold-cache-tolerant readiness wait in
`internal/launcher/stack.go`; seed-safety (PTY import, never logged or persisted) in
`cmd/z3launcher/main.go` and `internal/wallet`; port auto-correction and the consent-gated Docker
installer in `internal/preflight`; the CSRF/DNS-rebinding guard and typed-RESET reset in
`internal/server/server.go`; fast-start snapshot validation in `internal/faststart`.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) + Docker Compose v2 — the launcher supervises
  the vendored z3 compose files. If Docker is missing or stopped, the dashboard offers a
  consent-gated install / runtime start instead of failing.
- Go 1.23+ to build the launcher (`go.mod` declares `go 1.26`; modern toolchains fetch the
  required version automatically).
- Node.js 20+ — only if you want to rebuild the embedded React dashboard. Prebuilt assets ship
  in `web/dist` and are compiled into the binary via `go:embed`.

## Quickstart

```sh
git clone <this repo> && cd z3-node-laucher

make serve            # mainnet  (default; ~300 GB full sync — use fast-start)
make serve-testnet    # testnet  (~10 GB; production-equivalent consensus)
make serve-regtest    # regtest  (instant, local, no real funds)
```

Each target builds `bin/z3launcher` and serves the dashboard at <http://127.0.0.1:8088>. The
network is chosen at launch time with `-network`; each network gets an isolated compose project
(`z3`, `z3-testnet`, `z3-regtest`) so a regtest reset can never wipe a multi-day mainnet sync.

| Network | Disk / speed | Use it for |
|---------|--------------|------------|
| regtest | ~2 GB, instant | Integration tests, the wallet demo, mining blocks on demand |
| testnet | ~10 GB, hours | Production-equivalent staging with valueless faucet ZEC |
| mainnet | ~300 GB, 1–3 days cold | Real production; attach a snapshot with fast-start instead |

Other targets:

```sh
make run        # dry run: print resolved config + endpoints (no Docker needed)
make up         # start Zebra only (phase one) and exit
make web        # rebuild the React dashboard into web/dist
make test       # go test ./...
make web-test   # frontend unit tests (Vitest)
```

---

## Feature tour

The dashboard has five views — Overview, Wallet, Setup, Activity, Privacy — served same-origin
from the embedded SPA.

### Preflight with port auto-correction and consent-gated Docker

Before anything starts, the launcher checks Docker (the only hard failure), host ports, free
disk (recommendation scales per network), and Docker credential helpers. A busy port is
auto-corrected to the next free one (scanning up to 20 above the default), and the resolved
ports are written back into the config so the dashboard, the compose process, and the RPC
clients never disagree about which port is live. If Docker is missing, the banner shows the
exact command it wants to run and only executes after you confirm; if a runtime like Colima is
installed but stopped, one click starts it with streamed output. Nothing ever silently escalates
to sudo.

### Two-phase startup you can watch

Starting everything at once crash-loops the dependents, so the launcher enforces the ordering:
start Zebra → wait for `/ready` → start Zaino (and Zallet if a wallet exists). Service cards
show a live spinner while each container comes up and flip to a green dot when running. The sync
ring shows verified height, chain tip, and a computed ETA. The readiness wait tolerates a slow
cold RocksDB open indefinitely as long as the Zebra container is alive — only a dead container
trips "unreachable".

### Endpoints panel

Once the stack is ready, the panel lists every connection URL with one-click copy. Zaino's gRPC
endpoint is lightwalletd-compatible — point any light wallet at it.

| Service | Endpoint | Notes |
|---------|----------|-------|
| Zebra JSON-RPC | `http://127.0.0.1:18232` | host 18232 → container 8232, all networks |
| Zebra health | `http://127.0.0.1:8080/ready` | 200 once synced |
| Zaino gRPC | `127.0.0.1:8137` | lightwalletd-compatible — point a wallet here |
| Zaino JSON-RPC | `http://127.0.0.1:8237` | |
| Zallet RPC | `http://127.0.0.1:28232` | optional, alpha, profile-gated |
| Control plane | `http://127.0.0.1:8088` | dashboard + REST + SSE ([docs/API.md](docs/API.md)) |

### Self-custody wallet (Zallet, alpha)

Toggle Zallet on and the Wallet tab walks you through create or restore. Create generates a
256-bit BIP-39 mnemonic launcher-side, reveals the 24 words exactly once in a numbered grid,
requires a "I've written it down" checkbox, then quizzes you on sampled words before opening the
wallet. The seed is imported into Zallet over a PTY and is never logged or persisted by the
launcher; keys live in Zallet's own age-encrypted keystore. On first open the launcher
auto-creates account 0 so receive and send work immediately. The wallet view gives you balances,
accounts, a QR receive sheet, a send sheet with ZIP-317 automatic fees and privacy-policy
selection, and a developer console for raw Zallet RPC.

### Regtest: mine blocks and test your wallet

On regtest the Setup tab adds a Test Environment card (mine 1–1000 blocks on demand against your
local chain) and every network gets Test Your Wallet: an end-to-end check that the stack
actually works. On regtest it performs a real action over direct RPC; on mainnet/testnet it
drives a Zingo wallet against the Zaino gRPC endpoint if one is installed, with a graceful
connect-and-sync fallback when there are no funds — the test reports a mode, it never hard-fails.

### Fast-start, including one-click attach

A cold mainnet sync takes 1–3 days. Fast-start attaches a pre-synced Zebra state directory
instead: the Setup tab's Fast Start panel inspects a snapshot (DB format version, network,
usability) before anything is touched, and "Attach & Restart" swaps the mount and re-sequences
the stack. The same path is available at launch with `-faststart <dir>`. Snapshot capture and
restore recipes are in [docs/OPERATIONS.md](docs/OPERATIONS.md); note the macOS bind-mount
caveat in [docs/KNOWN-ISSUES.md](docs/KNOWN-ISSUES.md).

### Activity and privacy

The Activity view streams a merged live feed of compose lifecycle output and container logs over
SSE. The Privacy view states the posture plainly: bound to `127.0.0.1` only, no telemetry, no
key custody — and the code backs it: mutating API requests are defended by a loopback
same-origin guard (Host, Origin, and Sec-Fetch-Site checks).

### Guarded reset

"Erase data" runs `docker compose down -v` — chain state and wallet gone. The dialog makes you
type `RESET` to arm the button, and the backend independently requires `{"confirm":"RESET"}` in
the request body, so a request that slipped past the browser guard still could not wipe a wallet.

---

## Pinned images

Defaults are pinned for reproducibility (upstream z3 defaults Zebra to `:latest`). Override any
of them per-run with the matching environment variable.

| Service | Image | Override | Notes |
|---------|-------|----------|-------|
| Zebra | `zfnd/zebra:5.2.0` | `ZEBRA_IMAGE` | pinned; NU6.2-aware, NU7-prep line |
| Zaino | `zingodevops/zainod:0.4.1` | `ZAINO_IMAGE` | indexer; lightwalletd-compatible gRPC |
| Zallet | `zodlinc/zallet:v0.1.0-alpha.4` | `ZALLET_IMAGE` | alpha; profile-gated; runs the `zallet-zaino` binary |
| zcashd | `zodlinc/zcashd:v6.12.1` | `ZCASHD_IMAGE` | regtest overlay only |

## CLI flags

| Flag | Default | What it does |
|------|---------|--------------|
| `-network` | `mainnet` | `mainnet`, `testnet`, or `regtest` |
| `-data-dir` | `~/.z3-launcher/data` | host directory for chain state |
| `-compose-file` | `deploy/compose/docker-compose.yml` | vendored z3 compose file |
| `-regtest-compose-file` | `deploy/compose/docker-compose.regtest.yml` | regtest overlay (zcashd + rpc-router) |
| `-addr` | `127.0.0.1:8088` | control-plane listen address (non-loopback relaxes the origin guard and warns) |
| `-serve` | off | run the control-plane HTTP server + dashboard |
| `-up` | off | start Zebra (phase one) and exit |
| `-faststart` | — | attach a pre-synced Zebra state dir |
| `-zebra-state-major` | `0` | expected DB-format major for fast-start validation (0 = unknown) |
| `-with-zallet` | off | enable the optional Zallet service at launch (the dashboard can also toggle it) |
| `-install-docker` | off | consent-gated Docker install for this platform, then exit |
| `-preflight` | off | run the preflight checks and exit |
| `-no-preflight` | off | skip preflight at startup |

With no `-serve`/`-up`, the binary prints the resolved config and endpoints and exits (dry run).

## Project structure

```
.
├── cmd/z3launcher/        # CLI entrypoint, flags, server wiring
├── internal/
│   ├── launcher/          # stack lifecycle: two-phase startup, WaitReady, reset/attach
│   ├── server/            # HTTP control plane: REST + SSE, same-origin guard
│   ├── preflight/         # env checks, port auto-correction, consent-gated installer
│   ├── config/            # networks, ports, pinned images, compose env map
│   ├── compose/           # docker compose wrapper (up/down/run/logs/states)
│   ├── faststart/         # snapshot inspect/validate/attach
│   ├── wallet/            # BIP-39 mnemonic + age identity generation
│   ├── regtest/           # block mining / seeding
│   ├── climax/            # end-to-end wallet test
│   ├── aggregator/        # telemetry snapshot (status for REST + SSE)
│   ├── telemetry/         # frozen backend↔frontend status schema
│   ├── dockerinstall/     # platform detection, guided install, runtime start
│   ├── installjob/        # single-flight streaming job (install/runtime output)
│   ├── endpoints/ logs/ disk/          # endpoint URLs, log streaming, disk gauge
│   └── zebra/ zaino/ zallet/           # per-service RPC/health clients
├── deploy/compose/        # vendored z3 compose + regtest overlay + service configs
├── web/                   # React 19 + Vite + Tailwind dashboard, embedded via go:embed
└── docs/                  # architecture, API, operations, known issues
```

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — how the control plane, compose stack, and
  dashboard fit together
- [docs/API.md](docs/API.md) — REST + SSE control-plane reference
- [docs/OPERATIONS.md](docs/OPERATIONS.md) — snapshot capture, fast-start, day-2 operations
- [docs/KNOWN-ISSUES.md](docs/KNOWN-ISSUES.md) — current limitations, verified and explained
- [z3-node-launcher-implementation-plan.md](z3-node-launcher-implementation-plan.md) — roadmap
  and ticket history

## Testing

```sh
make test       # go test ./...  — 19 test packages across the CLI and internal/*
make web-test   # Vitest unit tests for the dashboard
make vet        # go vet ./...
```

CI runs the full suite on every push and, on tags, cross-compiles static release binaries
(`CGO_ENABLED=0`) for linux, macOS, and Windows on both amd64 and arm64.

## Known limitations

We would rather you hear these from us. Full detail with evidence in
[docs/KNOWN-ISSUES.md](docs/KNOWN-ISSUES.md):

- **Upgrading Zallet across alphas wipes the wallet.** The pinned `zodlinc/zallet:v0.1.0-alpha.4`
  (which fixed the NU6.2 crash-loop that broke alpha.3 on testnet/mainnet — verified live here)
  refuses wallet databases created by earlier alphas. Reset, then re-create or restore from the
  seed phrase after an image upgrade.
- **The regtest wallet cannot be funded.** Regtest coins only come from transparent coinbase,
  which Zallet does not credit to the wallet even on alpha.4 (`z_shieldcoinbase` exists now but
  reports zero balance to shield — re-verified 2026-07-04). Mining, wallet lifecycle, and the
  wallet test all work; funded-send demos use testnet plus a faucet.
- **Fast-start bind-mount attach is slow on macOS Docker** (Colima/virtiofs). On macOS, restore
  a snapshot into the named volume instead; the bind-mount attach path is appropriate on Linux.
- **A large synced cache takes minutes to open cold.** The launcher's readiness wait rides this
  out as long as the Zebra container is alive, but expect a quiet first minute or five.

## License

[MIT](LICENSE).
