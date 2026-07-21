# Operations Guide

How to run, snapshot, fast-start, reset, and troubleshoot a Z3 stack. For what the pieces are and
how they fit together, see [ARCHITECTURE.md](ARCHITECTURE.md); for the HTTP control plane, see
[API.md](API.md). Honest limitations live in [KNOWN-ISSUES.md](KNOWN-ISSUES.md).

## Networks and isolation

Each network runs as its own Docker Compose project, so volumes, containers, and lifecycle
actions never cross networks — a regtest Reset (`down -v`) cannot wipe a multi-day mainnet sync.

| Network | `-network` value | Compose project | Volumes (prefixed `<project>_`) |
|---|---|---|---|
| Mainnet | `mainnet` (default) | `z3` | `zebra-cache`, `zaino-db`, `zallet-data` |
| Testnet | `testnet` | `z3-testnet` | `zebra-cache`, `zaino-db`, `zallet-data` |
| Regtest | `regtest` | `z3-regtest` | above + `zcashd-data` |

`ParseNetwork` also accepts the aliases `main`, `test`, and `reg` (any case). Regtest
auto-selects the overlay compose file `deploy/compose/docker-compose.regtest.yml` (override with
`-regtest-compose-file`), which adds the `zcashd` miner and an nginx `rpc-router`.

### Ports

All service ports bind to `127.0.0.1` only. Zaino's ports are published on the Zebra container
because Zaino shares Zebra's network namespace (`network_mode: service:zebra`).

| Service | Host default | Container | Env var | Notes |
|---|---|---|---|---|
| Control plane (dashboard + API) | 8088 | — | `-addr` flag | `127.0.0.1:8088` |
| Zebra JSON-RPC | 18232 | 8232 | `Z3_ZEBRA_HOST_RPC_PORT` | 18232 even on mainnet |
| Zebra health (`/ready`) | 8080 | 8080 | `Z3_ZEBRA_HOST_HEALTH_PORT` | |
| Zaino gRPC (lightwalletd) | 8137 | 8137 | `ZAINO_HOST_GRPC_PORT` | point wallets here |
| Zaino JSON-RPC | 8237 | 8237 | `ZAINO_HOST_JSONRPC_PORT` | not published on regtest |
| Zallet RPC | 28232 | 28232 | `ZALLET_HOST_RPC_PORT` | `zallet` profile only |
| zcashd RPC (regtest only) | 18231 | 18231 | `ZCASHD_HOST_RPC_PORT` | miner for the Seeder |
| rpc-router (regtest only) | 18230 | 80 | `Z3_RPC_ROUTER_PORT` | `/zebra/*`, `/zcashd/*` |

You normally never set the port env vars yourself: the launcher emits them to compose, and
preflight auto-corrects a busy port to the next free one (see
[Troubleshooting](#port-conflicts)). The resolved ports are written back into the config, so the
endpoint banner, compose, and the launcher's own clients always agree.

### Data directory layout

Default `~/.z3-launcher/data` (override with `-data-dir`). It holds a small amount of host-side
state; the heavy chain data lives in named Docker volumes.

```
~/.z3-launcher/data/
├── zebra/                              # Zebra cache dir — only bind-mounted when fast-start
│                                       #   is attached; otherwise the named volume is used
├── zallet-identity-<project>.txt       # age X25519 encryption identity (mode 0600),
│                                       #   e.g. zallet-identity-z3-testnet.txt
└── .zallet-provisioned-<project>       # marker: wallet keystore initialized AND seed imported
```

The identity file and marker are two-thirds of the **wallet state trio**; the third is the
`<project>_zallet-data` Docker volume (keystore + seed). The launcher keeps the trio consistent:
a startup reconcile clears a stale marker and orphaned identity if the volume is gone, and it
refuses to start a provisioned Zallet whose identity file is unusable.

## Environment overrides

`resolveConfig` honors these env vars; each overrides the pinned default when non-empty.

| Env var | Pinned default | Why pinned |
|---|---|---|
| `ZEBRA_IMAGE` | `zfnd/zebra:5.2.0` | reproducibility; 5.x carries NU6.2 consensus rules |
| `ZAINO_IMAGE` | `zingodevops/zainod:0.4.1` | |
| `ZALLET_IMAGE` | `zodlinc/zallet:v0.1.0-alpha.4` | NU6.2-compatible; images moved from `electriccoinco/` to `zodlinc/` at alpha.4 |
| `ZCASHD_IMAGE` | `zodlinc/zcashd:v6.12.1` | regtest miner only |

Example:

```sh
ZALLET_IMAGE=zodlinc/zallet:v0.1.0-alpha.5 ./bin/z3launcher -network testnet -serve
```

Two Zallet-specific notes when overriding the image:

- Zallet refuses wallet databases created by an older alpha (verified: alpha.4 refuses alpha.3
  wallets). After changing the image, Reset from the dashboard and re-create or restore the wallet
  from its seed phrase.
- The compose services pin `entrypoint: ["zallet-zaino"]` — alpha.4 images ship three binary names,
  and the default `zallet` is the new zebra-state backend, which expects direct access to Zebra's
  state database rather than the RPC wiring this stack provides.

## Fast start, end to end

Fast start attaches a pre-synced Zebra state so the stack is ready in minutes instead of a
1–3 day cold sync. The full cycle below was verified on testnet.

### 1. Capture a snapshot

```sh
# Sync once and wait for the tip
make serve-testnet          # open http://127.0.0.1:8088, press Start, wait for sync

# Clean stop — REQUIRED. Ctrl-C the launcher, then:
docker compose -p z3-testnet -f deploy/compose/docker-compose.yml down

# Copy the chain state out of the named volume to a host directory
docker run --rm \
  -v z3-testnet_zebra-cache:/src:ro \
  -v ~/z3-testnet-snapshot:/dst \
  alpine sh -c "cp -a /src/. /dst/"
```

**Clean-shutdown warning:** `down` (without `-v`) sends SIGTERM so RocksDB flushes its WAL. If
you `kill -9` or capture while Zebra is running, the snapshot needs WAL recovery on every open —
or is outright unusable. Always stop cleanly before capturing.

The expected snapshot layout is:

```
<cache-root>/state/v27/testnet/
├── CURRENT           # RocksDB pointer file — validation requires it
├── MANIFEST-*        # at least one — validation requires it
├── version           # minor.patch, e.g. "0.0"
└── ...sst files
```

The pinned zebra 5.2.0 writes DB format major v27. The launcher parses the major from the
`v<N>` directory name — do not hardcode it, newer Zebra images bump it.

### 2. Validate

Either in the dashboard — **Fast Start → Check Data** (read-only, safe any time) — or as a CLI
dry-run (no `-serve`, prints the verdict and exits):

```sh
./bin/z3launcher -network testnet -faststart ~/z3-testnet-snapshot -zebra-state-major 27
```

Validation checks the `state/v<N>/<network>` layout, the `CURRENT` + `MANIFEST-*` files, and the
DB-format major against `-zebra-state-major` (0 = unknown; a mismatched major means Zebra
resyncs from scratch instead of using the snapshot).

### 3. Attach

Two paths:

- **At launch (CLI):** `./bin/z3launcher -network testnet -faststart ~/z3-testnet-snapshot
  -zebra-state-major 27 -serve`. This validates the snapshot and swaps Zebra's cache mount from
  the named volume to a host bind-mount of the snapshot.
- **One-click on a live stack:** dashboard **Fast Start → Attach & Restart** (HTTP:
  `POST /api/faststart/attach`). The launcher validates, swaps `Z3_ZEBRA_CACHE_MOUNT`,
  force-recreates Zebra, waits for readiness on the new state, then force-recreates the
  dependents so Zaino re-reads the new DB.

**macOS caveat:** both attach paths use a host bind-mount, and on macOS Docker (Colima/virtiofs)
a live RocksDB on a bind-mount is too slow — Zebra's RPC times out and the node never reaches
ready. On macOS, restore the snapshot **into the named volume** instead and start normally:

```sh
# Stack must be down first (docker compose -p z3-testnet ... down)
tar cf - -C ~/z3-testnet-snapshot . | docker run -i --rm \
  -v z3-testnet_zebra-cache:/dst \
  alpine sh -c "tar xf - -C /dst && chown -R 0:0 /dst"
```

Streaming a tar through stdin takes minutes; a plain `cp` through a bind-mount is roughly 10x
slower. The `chown -R 0:0` matches the container's runtime user (the image sets no user, so the
entrypoint runs as root). The bind-mount attach path works as designed on Linux.

## Cold-open expectations

A synced testnet cache is a 9–28 GB RocksDB. Opening it at container start is CPU-bound and
takes roughly 1–5+ minutes with the pinned `zfnd/zebra:5.2.0` image (a debug-assertions build).
During the open, Zebra's RPC and `/ready` endpoints do not answer — this is normal.

- **Clean shutdowns keep opens fast.** An unclean kill forces WAL recovery and can push the open
  past 10 minutes.
- **The launcher will not give up during a slow open.** `WaitReady` tolerates probe errors
  indefinitely while the Zebra *container* is alive (running/created/restarting) and resets its
  ~2-minute error budget each time it confirms liveness. Only a dead container trips
  "zebra unreachable". So a slow open shows as a spinner on the Zebra card, not a failure.

## Resetting

Reset wipes all chain state and the wallet for the current network. It is deliberately guarded:

- **Dashboard:** the Reset dialog requires typing `RESET`.
- **HTTP:** `POST /api/reset` with body `{"confirm":"RESET"}` — anything else is rejected with a
  reminder to back up your seed first.

What Reset does:

1. `docker compose down -v` with **all profiles activated** (`--profile zallet --profile
   regtest`), so profile-gated services and their volumes are truly removed even if they were
   not running. This deletes `zebra-cache`, `zaino-db`, `zallet-data` (and `zcashd-data` on
   regtest) for the current project only.
2. Clears the other two pieces of the wallet trio so no host state can lie about a wallet that
   no longer exists: removes `.zallet-provisioned-<project>` and
   `zallet-identity-<project>.txt`. The dashboard re-offers create/restore.
3. Brings Zebra back up, which starts a fresh sync.

**The seed is gone after Reset.** The 24-word phrase shown at wallet creation is the only way to
restore the wallet afterwards.

## Troubleshooting

### Zallet shows "not connected" or crash-loops on testnet/mainnet

Resolved for the current pin: NU6.2 activated on 2026-06-03 (testnet height 4,052,000; mainnet
3,364,600), the old `electriccoinco/zallet:v0.1.0-alpha.3` could not parse it (`unknown variant
'NU6.2'` reading Zebra's `getblockchaininfo`), and the launcher now pins the fixed
`zodlinc/zallet:v0.1.0-alpha.4` — verified stable on a tip-synced testnet node. If you still see
this: you are running an older image (check `ZALLET_IMAGE` and any stale `.env`); bumping
`ZAINO_IMAGE` alone does **not** help. If Zallet instead exits complaining the wallet database
was "last used by" an earlier release, that is alpha.4's intentional refusal of alpha.3 wallets —
Reset and re-create/restore. Details in [KNOWN-ISSUES.md](KNOWN-ISSUES.md).

### Zallet sync dies with "coinbase tx's claimed height doesn't match its consensus branch ID" (regtest)

Zallet (alpha.4+) validates each coinbase's consensus branch ID against its own
`regtest_nuparams`, so that list must exactly match Zebra's `activation_heights` in
`zebra/zebrad.regtest.toml`. The shipped configs are aligned (pre-NU5 upgrades at height 1,
NU5 + NU6 at height 2 — see the comment in `zallet/zallet.regtest.toml`); if you edit one file,
mirror the change in the other, then wipe the wallet volume so the mis-scanned state is
discarded.

### Zallet crash-loops with an EISDIR error

If a file bind-mount's host source is missing, Docker silently creates a *directory* at that
path, and Zallet then fails reading its identity "file". The launcher defends against this: it
refuses to start a provisioned Zallet without a usable identity file, and Reset uses
`RemoveAll` so a stray directory is cleared too. If you hit it anyway (e.g. you deleted the
identity file by hand):

```sh
rm -rf ~/.z3-launcher/data/zallet-identity-<project>.txt
```

then Reset (the wallet is unrecoverable without its identity) and restore from your seed phrase.

### Port conflicts

Preflight checks every host port and auto-corrects: it scans up to 20 ports above the default
and reports `auto-corrected: 127.0.0.1:X -> 127.0.0.1:Y` in the CLI summary and dashboard
banner. The corrected ports flow through to compose and all clients automatically. If no port
in the scan window is free, the check is a warning — free the port or pick different defaults.
Run `./bin/z3launcher -preflight` to see the checks without starting anything.

### Docker installed but not running

Preflight distinguishes a runtime that is still starting (warn, e.g. Colima booting) from one
that is installed but stopped (fail, with a start hint). The dashboard can start a detected
runtime (Colima, OrbStack, Docker Desktop, Rancher) with one click, and
`./bin/z3launcher -install-docker` runs a consent-gated install: it prints exactly what it will
run and asks y/N; macOS/Windows are pointed at the manual guide instead of sudo-ing blind.

### "volume is in use" when capturing or restoring a snapshot

Docker refuses to remove or safely repopulate a volume while a container references it. Stop
the stack for that project first:

```sh
docker compose -p z3-testnet -f deploy/compose/docker-compose.yml down
```

Note the `-p <project>` — without it compose derives a different project name and misses the
containers. Down and Reset from the launcher already pass all `--profile` flags so profile-gated
services (Zallet, regtest extras) are included.

### Stale stack from an older launcher version

If pre-existing project containers run images that do not match the pinned set, the serve-mode
preflight adds a `stale-stack` warning and the dashboard offers Reset rather than silently
reusing the old stack.
