# Pedalshield — ZecHub Hackathon 3.0 (Games track)

**Ride private. Earn shielded.** A privacy-first bike-to-earn app on Zcash: cyclists track real rides, the phone verifies them **entirely on-device** (the GPS route never leaves the phone — enforced by a unit test, not a privacy policy), and an **autonomous backend pays real shielded ZEC on Zcash mainnet**, with no human in the loop.

- **Track:** Games
- **Team:** IntelliGrip Industries (Sam Newman)
- **Code:** https://github.com/intelligrip/Pedalshield
- **License:** MIT
- **Demo video:** `https://youtu.be/yNrw9CI24zc`
- **Live site:** https://pedalshield.app

## Verify it yourself in 30 seconds (no build required)

Don't take our word for it — these all work right now:

1. **A real autonomous payout, on mainnet.** Open this transaction in any explorer:
   `mainnet.zcashexplorer.app/transactions/c9d0864c10ed44e011e39716f0fc7cdb1fe913fe0d614129a07961b2578b37a5`
   — a verified ride, paid automatically by the deployed backend, no human in the loop.
2. **The backend is live.** `curl -s https://api.pedalshield.app/treasury/info` →
   `"notes":"Autonomous Orchard payouts are live..."`, `"lightwalletd_connected":true`.
3. **Privacy is enforced in code, not prose.** One command proves no GPS/route data can
   enter the claim payload: `cd Pedalshield/mobile && node --test src/verification/__tests__/*.test.ts`

## Try it on your own phone (iOS)

It's in open beta — **install and ride it yourself: https://pedalshield.app** (TestFlight).
Tap "Connect your Zcash wallet" → paste any Zcash Unified Address → take a short ride →
watch it verify on-device and accrue a carbon-pegged reward. (Requires the free TestFlight app.)

## Why it's a "Game"

Pedalshield is a real-world game with on-chain stakes:
- **Core loop:** ride → your phone scores it → *beat the anti-cheat* (the integrity-score reveal is the "did I pass?" beat) → earn.
- **Progression:** streak multipliers reward showing up day after day.
- **Competition:** a community leaderboard ranks riders by verified distance — compete on effort, never on your data.
- **The reward is real, private money** (shielded ZEC), not points — the twist a Zcash games track is made for.

## How it uses Zcash mainnet

Every verified ride triggers a **real shielded (Orchard) payout on Zcash mainnet** from an autonomous treasury — built on a hand-rolled, SDK-free Orchard spend pipeline (tree seeding from `GetTreeState`, scan-to-tip, note selection, v5 `TransactionBuilder`, ZIP-317 fees → prove → SIGHASH → sign → broadcast). Riders are **non-custodial**: they connect a Zcash Unified Address they already control, and the reward lands there as a shielded transaction. The stack is current with the June 2026 NU6.2 upgrade (consensus branch `0x5437f330`).

**Reproducible payouts (look any up at `mainnet.zcashexplorer.app/transactions/<txid>`):**
- `a64f2b159e92558b7070d25f0f708ca99b3401ed9ae23ac626c2ea2a2db2f1d8` — a payout from the **deployed** backend, triggered by a verified ride.
- `2a849aca…b264ab`, `f1a3bacc…c10ba6`, `ef0e2a57…060587` — earlier autonomous Orchard payouts.

Live backend health check: `curl -s https://api.pedalshield.app/healthz` → `{"ok":true,...}`

## Why this matters to Zcash

Pedalshield is a demand engine for Zcash. Every verified ride creates a real shielded transaction from an ordinary, non-crypto person — onboarding everyday people into holding and using private ZEC, which is the adoption the network needs most and can least manufacture on its own. Mining funds riding; riding funds Zcash.

## How the reward is set — carbon value

You don't earn an arbitrary handout; you earn the **value of the carbon you keep out of the air.** Biking one mile instead of driving avoids ~1 lb of CO2, and that avoided pound is priced at the EPA's social cost of carbon (~$190/tonne => ~$0.086/lb) — so each verified mile pays ~$0.09 of shielded ZEC. The rate is pegged to that carbon value and re-pegged as the ZEC price moves (`deploy/repeg_carbon_rate.sh`). It reframes the reward from "crypto for tasks" to **verified, private climate impact, paid in private money.**

## What it does (the loop)

> real ride → on-device verification → `POST /claim` → autonomous shielded Orchard spend → **real mainnet txid** → ZEC in the rider's own wallet.

- **Privacy seam:** the on-device verifier emits only an anonymous claim (distance, integrity score, recipient address) — never the route. A unit test fails if a single coordinate enters the payload.
- **Anti-cheat:** layered, transparent scoring (speed band, cadence, vibration, GPS quality) with hard fails for teleports, car-speed, and **walking-pace rides** (pedometer-independent, so a walk is rejected even with Motion data off).
- **Non-custodial wallet:** rider connects their own Unified Address; we never hold keys or funds.

## Setup / usage

```bash
# 1. Live backend answers
curl -s https://api.pedalshield.app/healthz

# 2. A real autonomous mainnet payout (open in a browser)
#    mainnet.zcashexplorer.app/transactions/a64f2b159e92558b7070d25f0f708ca99b3401ed9ae23ac626c2ea2a2db2f1d8

# 3. Privacy + anti-cheat unit tests (route never leaves the phone)
cd Pedalshield/mobile && node --test src/verification/__tests__/*.test.ts

# 4. Backend speaks current consensus
cd ../zcash-service && cargo run --bin treasury_ping
```

Full setup: `README.md` (60-second quick start), `zcash-service/README.md`, `deploy/README.md`.

## Repository contents

- `zcash-service/` — Rust workspace: the hand-rolled Orchard spend pipeline (`src/spend/`) and the `axum` autonomous-payout backend (`bin/backend.rs`).
- `mobile/` — React Native + Expo (SDK 56) app: on-device verification engine, ride state machine, non-custodial wallet, on-device ride history, Home / Ride / Privacy screens. iOS build on TestFlight.
- `deploy/` — VPS deploy kit (systemd + Caddy + auto-HTTPS) used for the live backend.
- `docs/` — architecture, demo script, roadmap.

## Rules compliance

| Rule | Status |
|---|---|
| Interact with Zcash mainnet | **Done — live & reproducible** (autonomous Orchard payouts, txids above) |
| One project per team | Yes |
| Clear setup + usage docs | `README.md`, `deploy/README.md`, `zcash-service/README.md` |
| Open-source license | MIT (`LICENSE`) |
| Respect privacy / security / community | Privacy is the product (route never leaves the phone, unit-tested); operator endpoints auth-gated; anti-cheat documented honestly |

## Honest limits

Payouts are modest and capped — pegged to the EPA social cost of carbon (~$190/tonne => ~$0.09/mile for ~1 lb of avoided CO2). Privacy is the product, not yield. ZK route proofs are roadmap. Anti-cheat is layered, not perfect. No token.
