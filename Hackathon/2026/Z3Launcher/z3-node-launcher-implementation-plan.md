# One-Click Z3 Node Launcher — Implementation Plan

**Track:** Infrastructure
**Primary user:** Zcash app / wallet developers (secondary: privacy-conscious self-hosters)
**Timeline:** 1 week (7 days, build + docs + buffer)
**Hackathon rules covered:** mainnet (Rule 1), single project (Rule 2), setup/usage docs (Rule 3), open-source license (Rule 4), privacy/security (Rule 5)

---

## 1. Goal

**Zero to a working, wallet-usable Zcash backend in one command — in minutes, not days.** For developers. One command brings up Zebra (full node) + Zaino (indexer) — optionally supervising Zallet — and, via **fast-start**, attaches a pre-synced chain state so the stack is **usable in minutes instead of a 1–3-day cold sync**. The success state is concrete: a real lightwalletd-compatible wallet (or app) pointed at *your* node, doing a **live shielded action**. A local browser dashboard keeps you oriented along the way (sync progress, per-service health, disk, logs) and hands you the **endpoints to point that wallet/app at** — observability is how you *watch* it, not the point of it.

It is a **supervisor / control plane**, not new node software. It orchestrates the existing `ZcashFoundation/z3` containers and watches them over their own RPCs. It never touches consensus or indexing logic.

**What lifts it above "compose with a logo" (the differentiators):**

1. **Minutes-to-ready, not days.** A first-run **fast-start** path: attach/import an existing pre-synced Zebra state directory (or a teammate's snapshot), validate it against the pinned Zebra image, and report **ready in minutes** instead of the 1–3-day cold sync. This attacks the single worst part of the Zcash dev experience and is the feature judges will feel.
2. **Proven by a real wallet, not just URLs.** The payoff isn't an endpoint panel — it's a real lightwalletd-compatible wallet (e.g. Zingo) pointed at your Zaino gRPC and performing a **live shielded action**, end to end. That reframes the project from plumbing to *"zero to a working private-app backend in one command."*
3. **Visible privacy posture.** 127.0.0.1-only, no telemetry, no key custody — surfaced **in the UI** as a deliberate stance, not buried in a README (Rule 5).

## 2. Form factor decision (why no desktop app)

A native/Electron desktop app would require per-platform builds **plus** code signing, Apple notarization, Windows certs, installers, and auto-update — most of a one-week budget spent on packaging. It's also the wrong shape for developers, who want to run a command and get endpoints, not install an app.

**Instead: a Go control-plane binary that serves a local web dashboard.** Cross-platform falls out of three layers we already rely on:

- **Docker** — cross-platform layer for the node stack (Zebra/Zaino run identically anywhere Docker runs).
- **The browser** — cross-platform layer for the UI (one SPA, every OS, no native rendering).
- **Go** — the control plane cross-compiles to Windows/macOS/Linux from one machine in a single CI step; static binary, no runtime.

The SPA is embedded into the Go binary (`embed`), so the entire tool is **one repo + one command**, or optionally one static binary per platform. No installers, no signing.

## 3. What already exists (don't rebuild it)

- **`ZcashFoundation/z3`** repo: a Docker Compose setup wiring Zebra + Zaino + Zallet (plus an optional `zcashd` image used by the regtest overlay), images overridable via env (`ZEBRA_IMAGE`, `ZAINO_IMAGE`, `ZALLET_IMAGE`, `ZCASHD_IMAGE`) + `.env.example`. **Prebuilt images for all three services are pulled automatically — no submodule init or local build needed by default.** **Fork/vendor and wrap it.**
- **Topology & host ports (as actually exposed by the z3 compose):**
  - **Zebra** validates the chain and exposes **JSON-RPC** on host port **`18232`** (`Z3_ZEBRA_HOST_RPC_PORT`). ⚠️ Zebra's *internal* mainnet RPC default is `8232`, but the z3 stack maps it to host **`18232` even on mainnet** — that host port is what a wallet/app connects to. Zebra also runs a **health server on `8080`** (`Z3_ZEBRA_HOST_HEALTH_PORT`): `GET /ready` returns `ok` once synced, `GET /healthy` for liveness.
  - **Zaino** reads Zebra's JSON-RPC and serves a **lightwalletd-compatible gRPC** interface on **`8137`** (`ZAINO_HOST_GRPC_PORT`) **and a JSON-RPC interface on `8237`** (`ZAINO_HOST_JSONRPC_PORT`). Surface both.
  - **Zallet** (RPC on host **`28232`**, `ZALLET_HOST_RPC_PORT`) embeds Zaino's libs and talks to **Zebra's JSON-RPC directly** (`validator_address = zebra:18232`) — it does **not** use the standalone Zaino service.
- **Startup ordering is mandatory, not cosmetic:** **Zebra must finish its initial sync before Zaino and Zallet will start.** A plain `docker compose up -d` on a fresh install makes Zaino/Zallet crash-loop. The supervisor must sequence startup: bring up Zebra alone → poll `/ready` (or `getblockchaininfo`) → then start Zaino (+ optional Zallet). z3 ships `./scripts/check-zebra-readiness.sh` for exactly this — mirror its logic.
- Pin exact image tags for reproducibility. z3's current defaults: `zfnd/zebra:latest` (⚠️ **un-pinned — override `ZEBRA_IMAGE` with a fixed version/digest**), `ghcr.io/zcashfoundation/zaino:sha-83e41d7`, `electriccoinco/zallet:v0.1.0-alpha.3`, `zodlinc/zcashd:v6.12.1`.

> Network toggle mechanics differ per network (verify against the repo): **mainnet** is zero-config; **testnet** needs `NETWORK_NAME=Testnet` in `.env` **and** `network = "test"` in `config/zallet.toml`; **regtest** uses a separate overlay — `docker compose --env-file .env.regtest up -d` — which adds an `rpc-router` service and adjusts healthchecks. The "network toggle" is therefore **not a single flag**. Re-verify service names, ports, env vars, and image tags against the `z3` repo before Day 1, since tags move.

## 4. Architecture

```
┌──────────────────────────────┐
│  Web dashboard (React SPA)   │  service cards, sync bar, logs, endpoint panel
│  embedded in the Go binary   │
└───────────────┬──────────────┘
                │ REST + WebSocket (127.0.0.1 only)
┌───────────────┴──────────────┐
│  Control plane (Go binary)   │  controls Docker, polls health, streams logs,
│  runs on the host            │  surfaces endpoints
└───────────────┬──────────────┘
                │ Docker SDK (or `docker compose` shell-out) + RPC probes
┌───────────────┴──────────────┐
│  Vendored z3 compose          │
│   Zebra :18232 (JSON-RPC) ────┼──► Zaino :8137 (gRPC) ──► dev's wallet / app
│   Zebra :8080  (/ready,/healthy)        Zaino :8237 (JSON-RPC)
│   Zallet :28232 (optional) ───────► talks to Zebra :18232 directly
└───────────────────────────────┘
```

- **Bind the control plane to `127.0.0.1` only.** No remote surface, no telemetry leaving the machine, no key custody — Zallet handles keys via its age plugins (Rule 5).
- Default to **mainnet** (Rule 1), with a network toggle for testnet/regtest (developer convenience).

## 5. Tech stack

- **Orchestration:** Docker + the vendored `z3` compose.
- **Control plane:** Go + the Docker SDK (`github.com/docker/docker/client`) or `docker compose` shell-out; `gorilla/websocket` (or `coder/websocket`) for live updates; plain HTTP for Zebra JSON-RPC; static SPA served via `embed`.
- **Frontend:** React + Tailwind + Vite, built to static assets embedded in the binary.
- **Distribution:** `git clone` + one command (e.g. `make run`); optional cross-compiled release binaries via CI.
- **Demo client (for the climax):** a lightwalletd-compatible wallet — e.g. Zingo CLI / `zingolib` — pointed at the Zaino gRPC `:8137`. Not shipped in the tool; used to prove the backend end to end.
- **License:** MIT or Apache-2.0 (Rule 4).

## 6. Implementation order

Backend leads — the SPA consumes its API. Get the control plane curl-testable before any UI.

### Backend phase — Go control plane (Days 1–3)

| ID | Task | Output |
|----|------|--------|
| B1 | Vendor `z3` compose; parameterize **network** (mainnet default; testnet via `.env`+`zallet.toml`, regtest via `.env.regtest` overlay); **bring Zebra up first, wait for `/ready`, then start Zaino** and confirm healthy | A compose you control |
| B2 | Control plane: `start` / `stop` / `restart` / `reset` the stack via Docker SDK; REST + WebSocket API; `embed` scaffold for the SPA | Headless launcher, curl-testable |
| B3 | Health + sync telemetry: poll Zebra JSON-RPC `getblockchaininfo` (`blocks` vs `estimatedheight` → sync %; `verificationprogress` / `initial_block_download_complete` → ready) and `getinfo`; use Zebra's `/ready` health endpoint (`:8080`); probe Zaino health; read host disk; push over WebSocket | Live `{service, state, syncPct, height, tip, diskFree}` stream |
| B4 | Log streaming (container logs → WS) + **endpoint surfacing API** (returns Zebra JSON-RPC `:18232` + Zaino gRPC `:8137` + Zaino JSON-RPC `:8237` URLs once ready) | Logs + "point your app here" data |
| B5 | **Fast-start / attach-existing-state** (differentiator #1): detect an existing Zebra cache dir or import one; validate its DB format **major** version against the pinned Zebra image; mount + resume; report `ready` in minutes | Minutes-to-ready, not days |

### Frontend phase — React SPA (Days 3–5)

| ID | Task | Output |
|----|------|--------|
| F1 | Vite + React shell; connect to the control-plane WS/REST; wire the embedded build | UI talking to backend |
| F2 | Service dashboard: cards for Zebra / Zaino (+ optional Zallet) with status pills + start/stop/restart/reset | Operable control panel |
| F3 | Sync progress UI: progress bar, height vs tip, ETA, disk-free gauge | Headline screen |
| F4 | First-run wizard (network select, data dir, disk pre-check, **fast-start: attach pre-synced state**) + log viewer + **endpoint panel** with copy buttons (the developer payoff) | Onboarding + the thing devs actually want |
| F5 | **Privacy & security panel** (differentiator #3): 127.0.0.1-only · no telemetry · no key custody, shown as a stance + **"connect a wallet" guide** (copy the Zaino gRPC into a lightwallet, e.g. Zingo) | Visible privacy posture + the wallet payoff |

### Hardening + ship (Days 6–7)

| Day | Focus |
|-----|-------|
| 6 | Error states: Docker not installed, port conflicts, low disk, Zebra unreachable; network toggle end-to-end; **fast teardown/reset** for the dev loop; optional Zallet supervision (health + endpoint only, no wallet UI); **build the demo climax (differentiator #2)** — regtest scenario seeder (funded accounts) + a real lightwallet doing a live shielded action against Zaino, with a no-funds fallback |
| 7 | `README` (clone + one-command run + usage, Rule 3); LICENSE (Rule 4); pin image tags; optional CI cross-compile; record demo; buffer |

## 7. Demo / acceptance criteria

1. One command → Zebra + Zaino start → dashboard opens at `localhost`.
2. Live sync %, health pills, and disk usage update in real time.
3. **Endpoint panel** shows the URLs to point a wallet/app at (Zebra `:18232`, Zaino gRPC `:8137`, Zaino JSON-RPC `:8237`), with copy buttons.
4. Network toggle (testnet/regtest) works; `reset` wipes and restarts cleanly for a fast dev loop.
5. Killing Docker shows a clean error, not a crash.
6. **Fast-start (differentiator):** attaching a pre-synced state directory reaches **"ready" in minutes**, not a cold sync.
7. **The climax (differentiator):** a lightwalletd-compatible wallet (e.g. Zingo) points at the Zaino gRPC and performs/shows a **live shielded action**; the **privacy posture is visible in the UI** (127.0.0.1-only, no telemetry, no key custody).

## 8. Risks & honest gotchas

- **Full mainnet Zebra sync will NOT finish in the demo window** (**~1–3 days on typical hardware** — Zebra's own optimized CI sync is ~15–16h on fast machines, while the z3 docs cite 24–72h — plus tens of GB of disk). **Always demo against a pre-synced data directory**; the **fast-start / attach-state path is both your insurance and a headline feature.** Design the sync UX for "close and come back."
- **Fast-start / snapshot has a hard constraint:** the imported state's **DB format *major* version must match the pinned Zebra image** — a major-version mismatch forces a full re-sync. Validate on import and warn clearly; pin Zebra so a snapshot stays valid. (Note: I could not confirm an official public end-user snapshot *download* mirror — treat "attach a state dir you/a teammate already synced" as the supported path; *producing/hosting* portable snapshots via `copy-state` is stretch.)
- **The live-shielded-tx climax needs spendable funds — don't improvise on stage.** Pre-fund a small mainnet wallet, *or* use testnet (faucet), *or* the regtest seeder (instant, no real funds). Keep a **no-funds fallback** (wallet connects + syncs + shows balance) so the demo never hard-fails.
- **Zallet is alpha and flaky.** Keep it optional and supervised (status + endpoint), never a dependency of the core demo. No wallet UI in this tool.
- **"Compose with a logo" failure mode.** The sync/health/disk/error UX and the endpoint panel *are* the project — spend polish there.
- **Docker dependency.** Detect on first run; guide install instead of failing silently.
- **Containerized control plane (if you go that route instead of a host binary)** needs the Docker socket mounted (`/var/run/docker.sock`), which is root-equivalent on the host — acceptable for a local dev tool but document it. The host Go binary avoids this.

## 9. Stretch (only if ahead of schedule)

- ~~Snapshot import to skip first sync~~ → **promoted to core** (B5 fast-start / attach-existing-state). Remaining stretch: *producing/hosting* a portable snapshot (Zebra `copy-state` to trim a cache; a hosted snapshot mirror) — feasible but format-version-locked.
- ~~`regtest` scenario seeder (funded accounts)~~ → **promoted into the Day-6 demo climax** (funded accounts for a live, instant, fully-local shielded tx). Remaining stretch: a richer "regtest-in-a-box" scenario library for integration testing.
- Prometheus/Grafana export of the telemetry you already collect (bridge to larger operators).
- zcashd → Z3 migration detector.

---

## 10. Day-by-day standup checklist

Ticket IDs are board-ready. Tags: **[BE]** Go control plane · **[FE]** React SPA · **[Ops]** Docker/compose · **[Docs]** · **[Demo]**.
**Critical handoff:** the telemetry message schema is frozen on Day 3 (ticket Z3-10) — that's the BE↔FE contract.
**Demo rule:** always demo against a **pre-synced** Zebra data directory; never sync from scratch live. The **fast-start / attach-state** path (Z3-31) is what makes this honest *and* impressive — it's both the safety net and a headline feature.
**Win condition:** the three differentiators (fast-start `Z3-31`, live-wallet climax `Z3-34`, visible privacy `Z3-32`) are what move this from a solid infra entry to a winner — protect their time, but each has a fallback so the core demo is never at risk.

### Day 1 — Stack up + skeleton
- [ ] **Z3-0** [Ops] **Hour 1: kick off a background mainnet Zebra sync** on a spare disk so a **pre-synced data dir exists by demo day** (it takes ~1–3 days — this is the long pole). Everything below proceeds in parallel.
- [ ] **Z3-1** [Ops] Fork/vendor `ZcashFoundation/z3` compose into the repo; **pin** Zebra/Zaino/Zallet image tags (z3 defaults `ZEBRA_IMAGE` to `zfnd/zebra:latest` — pin it to a fixed version/digest).
- [ ] **Z3-2** [Ops] Parameterize network (mainnet default; testnet via `NETWORK_NAME=Testnet` + `zallet.toml` `network="test"`, regtest via `.env.regtest` overlay/`rpc-router`); document host ports (Zebra RPC `18232`, Zebra health `8080`, Zaino gRPC `8137`, Zaino JSON-RPC `8237`, Zallet RPC `28232`).
- [ ] **Z3-3** [Ops] Manually bring up **Zebra first**; wait for `curl localhost:8080/ready` → `ok`; **then** start Zaino. *Accept:* Zebra `/ready` ok + `getinfo` responds, Zaino gRPC reachable. (A single `up -d` on fresh state crash-loops Zaino/Zallet — order matters.)
- [ ] **Z3-4** [BE] Scaffold Go module; Docker SDK client connects and lists the compose project's containers.
- [ ] **Z3-5** [Ops] Repo skeleton + `Makefile` (`make run`) + README stub + LICENSE (MIT/Apache-2.0).

### Day 2 — Control plane core
- [ ] **Z3-6** [BE] Implement `start` / `stop` / `restart` / `reset` via Docker SDK (or compose shell-out).
- [ ] **Z3-7** [BE] REST endpoints for the above + `GET /status`; WebSocket channel scaffold.
- [ ] **Z3-8** [BE] Zebra JSON-RPC client: `getblockchaininfo`, `getinfo`; compute `syncPct = blocks / estimatedheight`; derive **ready** from `initial_block_download_complete` (or Zebra `/ready`), not just `blocks == tip`.
- [ ] **Z3-9** [BE] Disk-usage probe for the data dir.
- [ ] *Accept EOD:* `curl` start → containers up; `GET /status` returns live syncPct, height, tip, diskFree.

### Day 3 — Telemetry + logs + UI shell (handoff)
- [ ] **Z3-10** [BE] Push telemetry over WS on an interval; **freeze schema** `{service,state,syncPct,height,tip,diskFree}`.
- [ ] **Z3-11** [BE] Zaino health probe (gRPC `GetLightdInfo`, JSON-RPC `:8237`, or container health) — only reachable once Zebra is synced.
- [ ] **Z3-12** [BE] Container log tailing → WS stream.
- [ ] **Z3-13** [BE] Endpoint-surfacing API: return Zebra JSON-RPC (`:18232`) + Zaino gRPC (`:8137`) + Zaino JSON-RPC (`:8237`) URLs + `ready` flag when synced.
- [ ] **Z3-14** [FE] Vite + React shell; connect to WS/REST; render raw telemetry to prove the pipe. *Accept:* UI shows live numbers.
- [ ] *Milestone:* backend feature-complete; FE contract frozen.

### Day 4 — Dashboard UI
- [ ] **Z3-15** [FE] Service cards (Zebra / Zaino / optional Zallet) with status pills.
- [ ] **Z3-16** [FE] Start/stop/restart/reset buttons wired to REST.
- [ ] **Z3-17** [FE] Sync progress component: bar, height vs tip, ETA, disk gauge.
- [ ] *Accept EOD:* operable control panel; buttons control the stack; sync bar moves.

### Day 5 — Wizard + endpoint panel + embed
- [ ] **Z3-18** [FE] First-run wizard: network select, data dir, disk pre-check.
- [ ] **Z3-19** [FE] Log viewer panel (consumes log WS).
- [ ] **Z3-20** [FE] **Endpoint panel** with copy buttons (the dev payoff); URLs shown only when `ready`.
- [ ] **Z3-21** [BE/FE] Embed built SPA into the Go binary (`embed`); `make run` serves UI at localhost.
- [ ] **Z3-31** [BE/FE] **Fast-start / attach-existing-state** (differentiator #1): wizard option to point at / import a pre-synced Zebra cache dir; validate DB format **major** version vs the pinned image; mount + resume; show `ready` in minutes. *Accept:* attaching a synced dir reaches `ready` without a cold sync.
- [ ] **Z3-32** [FE] **Privacy & security panel** (differentiator #3): 127.0.0.1-only · no telemetry · no key custody, shown as a deliberate stance + a **"connect a wallet" guide** (copy the Zaino gRPC into a lightwallet, e.g. Zingo).
- [ ] *Accept EOD:* single command → full dashboard at localhost, end to end.

### Day 6 — Hardening
- [ ] **Z3-22** [BE] Error states: Docker not installed, port conflicts, low disk, Zebra unreachable. See **§11 Error-state policy** below for the exact behavior of each.
- [ ] **Z3-23** [BE] Network toggle verified end-to-end (regtest spins fast — good for the dev-loop demo).
- [ ] **Z3-24** [BE] `reset` wipes data dir + restarts cleanly.
- [ ] **Z3-25** [BE] Optional Zallet supervision (status + endpoint only; gated so failure never breaks core).
- [ ] **Z3-33** [BE] *(differentiator)* **Regtest scenario seeder**: spin regtest, mine, and fund accounts for an instant, fully-local test environment (also powers the climax with no real funds).
- [ ] **Z3-34** [Demo/BE] *(differentiator)* **Live shielded-action climax**: point a lightwalletd-compatible wallet (e.g. Zingo) at Zaino `:8137` and perform/show a shielded action. Primary: pre-synced mainnet/testnet + a small funded wallet. **Fallback:** wallet connects + syncs + shows balance (never hard-fails).
- [ ] **Z3-26** [FE] Graceful UI for each error state; loading/empty states.
- [ ] *Accept EOD:* kill Docker / occupy a port / fill disk → clean messages, no crash.

### Day 7 — Ship
- [ ] **Z3-27** [Docs] README: prerequisites (Docker), clone + one-command run, usage, **fast-start / attach-state instructions**, pinned tags, socket note if containerized (Rule 3).
- [ ] **Z3-28** [Docs] Confirm LICENSE (Rule 4); privacy/security note: 127.0.0.1-only, no telemetry, no key custody (Rule 5).
- [ ] **Z3-29** [Ops] *(Optional)* CI cross-compile release binaries with SPA embedded.
- [ ] **Z3-30** [Demo] Point demo at a **pre-synced** data dir; rehearse the 5-min script: one command → **fast-start attaches pre-synced state → "ready" in minutes** → dashboard (sync/health/disk) → endpoint panel → **point Zingo at Zaino → live shielded action** → privacy panel → network toggle / reset. Keep the **no-funds fallback** staged.
- [ ] *Buffer.*

---

## 11. Error-state policy (Z3-22)

Each Phase-6 error class has a specific, non-surprising behavior. Two are **actioned automatically** by the launcher; the rest are surfaced in the UI with actionable hints.

### 11.1 Port conflicts → **auto-correct** (no prompt, no crash)

Host ports in the vendored z3 compose are just env-configured mappings (`Z3_ZEBRA_HOST_RPC_PORT`, `Z3_ZEBRA_HOST_HEALTH_PORT`, `ZAINO_HOST_GRPC_PORT`, `ZAINO_HOST_JSONRPC_PORT`, `ZALLET_HOST_RPC_PORT`). They are not load-bearing for consensus or wallet connectivity — only the **wallet/app pointing at the dashboard's surfaced endpoints** cares, and that wallet points at the address we tell it, not the literal default.

- **Behavior:** when preflight detects a port already in use, the launcher **picks the next free port** in a small reserved range above the default (e.g. `18232 → 18233 → 18234 …`, same for the others), rewrites the compose env for this run, and continues. The change is **scoped to this launcher process** — no global config is mutated.
- **Surfaced to the user:** the dashboard's endpoint panel shows the **actual** bound host ports (e.g. `127.0.0.1:18233`), with copy buttons that already point at the live port. The "expected vs actual" port mapping is also visible in the preflight banner / startup log so the user can see what changed.
- **Why this is safe:** ports are an output of the launcher, not an input; nothing else on the host depends on a specific number. Auto-correct is strictly less surprising than failing with `bind: address already in use` and leaving the user to edit a YAML.
- **Implementation note:** the resolved port set is what `endpoints.Build` and the spawned compose process use — single source of truth, no string drift between the banner and the endpoints.

### 11.2 Docker missing → **consent-gated auto-install** (not silent)

Installing Docker needs root/admin, is platform-specific, and **Docker Desktop on macOS/Windows genuinely cannot be reliably installed-and-started headlessly** (the user must accept the EULA, grant privileged-helper permissions, and on macOS the daemon is started by the desktop app, not a launchd unit we can flip). The launcher must not silently run `sudo` on the user's machine.

- **Detect:** preflight's Docker probe (already in `internal/preflight`) reports `fail` with a platform-tagged message and a hint.
- **Surface (default path):** the preflight banner shows **the exact official install command for the detected platform** (Docker Desktop URL on macOS/Windows, the distro's package manager + `docker compose` plugin on Linux). One-click copy. This is the "guide" mode and is always available.
- **Opt-in auto-install** (when the user says yes): a `-install-docker` CLI flag, or an explicit **"Install Docker for me"** button in the preflight banner, triggers a consent-gated installer that:
  1. **Re-checks the platform** and refuses to run if it cannot complete headlessly (e.g. macOS / Windows → refuses and re-shows the guide with the Docker Desktop URL; only continues if the user is on a supported Linux distro).
  2. **Prints the exact command it is about to run** and waits for an explicit `y/N` confirmation in the CLI (the dashboard button pops the same confirmation).
  3. **Runs the command with `sudo` only on Linux, only when needed**, captures output, then **re-runs preflight** to confirm the install succeeded before proceeding.
- **Why not silent auto-install on macOS/Windows:** Docker Desktop cannot be installed-and-started headlessly; pretending otherwise would leave the user with a half-installed state and a worse story than just handing them the URL.
- **Why consent-gated even on Linux:** installing Docker on Linux still requires root and modifies the system (group changes, service enablement, iptables rules). A "zero to ready in one command" tool that silently escalates to root is the wrong default; opt-in is still "installs it for you — just with a yes."
