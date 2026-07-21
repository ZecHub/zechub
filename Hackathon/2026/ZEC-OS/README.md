# hackathon_zec-os_v1.1.2

A customized [ZEC-OS](https://zec-os.com) distribution — a retro desktop UI for Zcash blockchain data.

Build designed for the 2026 ZECHUB Hackathon· version 1.1.2.

Created by orb · [orbatron.org](https://orbatron.org)

## Included apps

**charts** — Price Chart, Shielded Chart, Pools Chart, Supply Chart
**games** — Pong
**privacy** — Privacy Coach
**stats** — ZEC Price, Block Height, Difficulty, Transparent Pool, Shielded Pool, Pools, Total Supply, Total Shielded, Shielded %, Total Txs
**tools** — Mining, About, Settings, Themes, Calculator, Terminal, Explorer, UA Decoder, Account, Watchlist, Block Comparison, TX Graph, Mempool, Block Map, Chain Pulse
**widgets** — Network Data, Halving Countdown, Charts Dashboard

_Always included:_ login (Zcash ownership verification + guest), desktop, taskbar, Settings, Themes.

_Excluded from this build:_ Privacy Weather, Privacy Flow, Shmup (arcade), The Dark Forest BBS (RPG), Tournaments (contest engine).

## Requirements

- **Node** 20+ and **pnpm**.
- **PostgreSQL** — required. Auth / Zcash verification is server-side; the frontend cannot run standalone.
- **Zaino/lightwalletd endpoint** (`ZAINO_URL`) for chain reads and address verification.
- **Zcash node stack** — for correct live chain data, a fully synced **Zebra 5.2.x** node with functional **indexer**, **parser**, and **API** endpoints (see [Chain data API](#2-chain-data-api-required) below).
- **A funded Zcash wallet address** (`BACKEND_ZADDR` / `BACKEND_TADDR`) to receive verification payments; shielded verification also needs **zingo** (`ZINGO_EXEC`).

## Architecture

```
apps/frontend  Next.js UI (this is what users see) — proxies /api/* to the backend
apps/backend   Fastify API + Prisma (Postgres). Owns auth, verification, sessions, data.
packages/*     shared code
```

## Backend services setup

Every ZEC-OS build ships `apps/backend` (Fastify + Prisma). It needs the
services below because **login / Zcash ownership verification is server-side**.

### 1. PostgreSQL (required)
Any Postgres 14+. Set `DATABASE_URL`, then:
```bash
pnpm db:push
pnpm db:generate
```

### 2. Chain data API (required)
Chain / block / tx / pool reads go through an upstream REST API.
- `ZEC_API_URL` — base URL of that API.
- `API_SECRET_KEY` — sent as an auth header if your API requires one.
The bundled frontend routes under `apps/frontend/src/app/api/*` proxy to it.
You can point this at your own indexer or a hosted one.

> **Note:** For correct live data, self-hosting requires a fully synced and running Zcash node on **Zebra 5.2.x**, with functional **indexer**, **parser**, and **API** endpoints. Point `ZEC_API_URL` at that API (or use a hosted equivalent that meets the same requirements).

### 3. Zaino / lightwalletd gRPC (required)
Used for light-client chain access + address checks via the
`CompactTxStreamer` service (proto at `apps/backend/proto/service.proto`).
- `ZAINO_GRPC_URL` — e.g. `https://your-zaino-host:443` or `http://127.0.0.1:8137` (local).
- `ZAINO_GRPC_API_KEY` — optional; sent as `x-api-key` metadata.
Run [Zaino](https://github.com/zingolabs/zaino) (or a compatible lightwalletd)
in front of a synced **zebra**/**zcashd** full node, and point `ZAINO_GRPC_URL` at it.

### 4. Zingo wallet (required for verification + payouts)
Shielded ownership verification reads incoming memos at your address and sends
back a one-time code memo. It runs the zingo CLI **per command** (no RPC server):
- `ZINGO_EXEC` — the command prefix, e.g. `docker exec zec-zingo zw` (a zingo-cli wrapper).
- `BACKEND_ZADDR` — a shielded address you control that RECEIVES verification payments.
- `BACKEND_TADDR` — a transparent address for the transparent verification path.
Fund the address(es) minimally. Without `ZINGO_EXEC` + `BACKEND_ZADDR`, shielded
verification is disabled (the endpoint returns 501); transparent verification
still works with `BACKEND_TADDR`.

> Guest login needs none of the above. Verified login needs 1–4.


## Setup

Run these from the **project root** before `pnpm dev`.

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment files

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
```

Edit both files. **Minimum to start the dev servers:**

| File | Variable | Example |
|---|---|---|
| `apps/backend/.env` | `DATABASE_URL` | `postgresql://user:pass@127.0.0.1:5432/zec_os` |
| `apps/frontend/.env.local` | `BACKEND_URL` | `http://your-chain-api:8080` (Zebra indexer/parser/API) |

`FASTIFY_URL` in the frontend defaults to `http://localhost:4000` when unset. Chain-data widgets and Explorer need `BACKEND_URL` pointing at a live API.

For verified login, also fill in the backend vars from [Backend services setup](#backend-services-setup) (Zaino, wallet addresses, etc.). Guest login works without those.

### 3. Database (required — backend will not start without this)

PostgreSQL must be running and reachable at `DATABASE_URL`.

```bash
pnpm db:push
pnpm db:generate
```

> If you see `@prisma/client did not initialize yet`, you skipped `pnpm db:generate` (step 3).

### 4. Run

```bash
pnpm dev   # frontend (:3000) + backend (:4000)
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is busy, Next.js picks the next available port (check the terminal output).

## Environment variables

| Var | Notes |
|---|---|
| `DATABASE_URL` | Postgres connection string (required) |
| `PORT` | backend port (default 4000) |
| `FASTIFY_URL` | backend URL the frontend proxies to |
| `ZEC_API_URL` | upstream chain-data REST API base URL |
| `API_SECRET_KEY` | auth header for ZEC_API_URL, if it requires one |
| `ZAINO_GRPC_URL` | Zaino/lightwalletd gRPC endpoint (CompactTxStreamer) |
| `ZAINO_GRPC_API_KEY` | optional x-api-key for the gRPC endpoint |
| `BACKEND_ZADDR` | shielded address that receives verification payments |
| `BACKEND_TADDR` | transparent address for verification payments |
| `ZINGO_EXEC` | zingo CLI command prefix (e.g. "docker exec zec-zingo zw") |
| `ADMIN_HANDLE` | verified handle that unlocks sysop powers (default "orb", CHANGE THIS TO YOURHANDLE) |
| `SESSION_EXPIRY_HOURS` | session lifetime, hours (default 24) |

## API endpoints

Only the endpoints this build actually uses are listed. Sample outputs are representative shapes (real values vary).

### `GET` /api/config
Public runtime config (network, feature flags, BBS version).

```json
{ "network": "mainnet", "bbsSoftware": "v0.18b", "gamblingMode": "off" }
```

### `POST` /api/auth/challenge
Start Zcash ownership verification. Returns a payment challenge (amount + memo + ZIP-321).

```json
{ "nonce": "9f3c…", "toAddress": "zs1…|t1…", "valueZEC": "0.00042135",
  "zip321": "zcash:zs1…?amount=0.00042135&memo=…", "expiresAt": 1730000000000 }
```

### `GET` /api/auth/verify/:nonce
Poll a challenge. Progresses waiting → code_sent (shielded) → confirmed; issues a session on success.

```json
{ "ok": true, "verified": true, "sessionId": "…", "address": "u1…", "signedOutOthers": 0 }
```

### `POST` /api/auth/login
Password login for a verified account (handle or address + password).

```json
{ "ok": true, "verified": true, "sessionId": "…", "displayName": "YOURHANDLE", "signedOutOthers": 1 }
```

### `GET` /api/auth/session
Session liveness (used on reload + to detect signed-in-elsewhere).

```json
{ "valid": true }   // or { "valid": false, "reason": "signed_in_elsewhere" | "expired" }
```

### `POST` /api/auth/logout
Revoke the current session server-side.

```json
{ "ok": true }
```

### `GET` /api/user/me
The authenticated user (handle, address, verified, admin).

```json
{ "displayName": "YOURHANDLE", "address": "u1…", "isVerified": true, "isAdmin": true }
```

### `GET/PUT` /api/user/state
Per-user UI state (open windows, positions) — read and persist.

```json
{ "windows": [ … ], "positions": { … } }
```

### `GET/PUT` /api/user/settings
Per-user settings (theme, font size, sound, tips).

```json
{ "fontSize": "medium", "theme": "zenith", "soundEnabled": true }
```

### `GET` /api/chain
Node + chain status (health, sync, height, difficulty, supply).

```json
{ "height": 2600123, "difficulty": 1.1e8, "zebra": { "healthy": true, "syncing": false } }
```

### `GET` /api/prices
ZEC price series (OHLC) for a range (?range=1d|7d|1y…). Cached.

```json
[ { "time": 1730000000, "open": 33.1, "high": 34.0, "low": 32.8, "close": 33.6 }, … ]
```

### `GET` /api/pools
Shielded/transparent pool value over time (?range).

```json
[ { "timestamp": "2026-07-01", "sprout": 0, "sapling": 1.2e6, "orchard": 3.4e5, "transparent": 5.1e6 }, … ]
```

### `GET` /api/flows
Transparent↔shielded flow series (?range). Cached.

```json
[ { "date": "2026-07-01", "intoShielded": 4200, "outOfShielded": 3900 }, … ]
```

### `GET` /api/block/:id
Block by height or hash (header, tx list, shielded stats).

```json
{ "height": 2600123, "hash": "0000…", "time": 1730000000, "size": 21456,
  "tx": [ "…", "…" ], "confirmations": 12, "nShieldedTx": 3 }
```

### `GET` /api/tx/:txid
Transaction detail (vin/vout, shielded spends/outputs, orchard actions).

```json
{ "txid": "…", "blockheight": 2600123, "vin": [ … ], "vout": [ … ],
  "vShieldedSpend": [ … ], "orchard": { "actions": [ … ] } }
```

### `GET` /api/address/:address
Transparent address balance + transaction ids.

```json
{ "address": "t1…", "balance": 1234567, "txids": [ { "txid": "…" }, … ] }
```

### `GET` /api/miner/:blockHash
Resolved miner for a block (pool tag, reward, reward address).

```json
{ "tag": "ViaBTC", "address": "t1…", "reward": 1.5625 }
```

### `GET` /api/mempool
Pending, unconfirmed transactions.

```json
{ "txids": [ "…", "…" ], "size": 42, "bytes": 91234 }
```

### `GET` /api/decode-address
Decode a unified (u1…) address into its receivers (?address=).

```json
{ "receivers": { "transparent": "t1…", "sapling": "zs1…", "orchard": "…" } }
```

## Database (Prisma)

Postgres, via `apps/backend/prisma/schema.prisma`. This build ships **only** the models it uses (disabled apps' models are stripped out, relation-safe):

`User` · `UserSession` · `AuthChallenge` · `UserSettings` · `UserState` · `UserWatchlist`


```bash
pnpm db:push      # create the tables
pnpm db:generate  # generate the client
```

---

## Donate

ZEC-OS runs on real infrastructure and copious amounts of coffee (Zebra · Zaino · Zingo · Zallet · gRPC).

**ZEC:** `u192er4slrt3pqqqsqek5ksxvqfw9ws5qgtqvc5fjdpl9qg6kfzw9m9d8qcm80f2r37q0lxmkmtv9hqk8zrsuqlzny6pt8ut7xtgpam34q`

**ETH:** `orbgasm.eth`

---

MIT · Created by orb · [orbatron.org](https://orbatron.org)

This project is released under the MIT license — you're welcome to fork, remix, and build on it. If you do, please keep the copyright notice and attribution above intact in your copy or derivative. It helps others find the original and keeps the chain of credit clear. Thank you.
