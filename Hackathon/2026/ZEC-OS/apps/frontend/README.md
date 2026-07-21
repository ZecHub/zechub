# ZEC-OS v1.1.2+zechub-hackathon2026

Desktop OS interface for the Zcash network. Built for exploring, transacting, and understanding ZEC — UX over ideology.

Created by orb · [orbatron.org](https://orbatron.org)

## Quick Start

See the [root README](../../README.md#setup) for full setup (env files, Postgres, Prisma).

```bash
pnpm install
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
# edit .env files — see root README
pnpm db:push
pnpm db:generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Apps

### Stats
| App | Description |
|-----|-------------|
| **ZEC Price** | Live ZEC/USD price |
| **Block Height** | Current chain tip |
| **Difficulty** | Network mining difficulty |
| **Transparent Pool** | ZEC in t-addresses (click to toggle ZEC/USD) |
| **Shielded Pool** | Combined shielded pools (click to toggle) |
| **Pools** | Per-pool breakdown (Sapling / Orchard / Sprout) |
| **Total Supply** | Total ZEC issued with USD value |
| **Total Shielded** | Shielded ZEC with pool breakdown |
| **Shielded %** | Percentage of supply in shielded pools |
| **Total TXs** | Cumulative transaction count |

### Charts
| App | Description |
|-----|-------------|
| **Price Chart** | Historical prices — pixel/clean toggle, 1D–ALL ranges |
| **Shielded Chart** | Shielded pool evolution over time |
| **Pools Chart** | Stacked pool history with ZEC/USD toggle |
| **Supply Chart** | Total supply value history |

### Widgets
| App | Description |
|-----|-------------|
| **Network Data** | All-in-one dashboard: privacy score, pools, height, difficulty, supply |
| **Charts Dashboard** | 2×2 grid of all 4 charts |
| **Halving Countdown** | Blocks to next halving, current subsidy, % of supply issued |
| **Block Ticker** | Scrolling strip of live block arrivals — click any to explore |

### Tools
| App | Description |
|-----|-------------|
| **Explorer** | Search by block height/hash, txid, t-address, or z-address |
| **Mempool** | Live unconfirmed txs — heatmap by fee rate or tx type, table view |
| **Mining** | Pool breakdown, block timeline, miner universe visualization |
| **Block Comparison** | Side-by-side diff of any two blocks |
| **TX Graph** | Directed input/output graph for any transaction |
| **Address Decoder** | Decode Unified Addresses into Sapling / Orchard / transparent receivers |
| **Watchlist** | Saved addresses with labels — synced to account when signed in |
| **Terminal** | Shell emulator with virtual filesystem |
| **Calculator** | Basic arithmetic |
| **Themes** | Switch visual themes |
| **Settings** | Font size, date/time format, sound + volume, icon style, backgrounds |
| **About ZEC-OS** | Version info, donate address, stack credits |

### Privacy
| App | Description |
|-----|-------------|
| **Privacy Weather** | Real-time shield window score, inflow/outflow gauges, crowd activity |
| **Privacy Coach** | Offline tx/address privacy analyzer — letter grade A–F, recommendations |
| **Flow History** | Historical shielding/deshielding flows — Flows / Net / Ops modes |

### Games
| App | Description |
|-----|-------------|
| **Shmup** | Space shooter arcade game |
| **Pong** | Classic Pong |
| **The Dark Forest BBS** | BBS-style text adventure |

---

## Explorer — What It Can Do

- **Block** — stats, tx composition pills (transparent / shielded / sapling / orchard), miner identity, Block Map, Chain Pulse
- **Transaction** — classification (coinbase / transparent / shielding / deshielding / mixed / fully shielded), inputs/outputs, TX Graph
- **T-Address** — balance, received, tx count, transaction history, privacy alerts
- **Z-Address / UA** — privacy notice; use Address Decoder for UA breakdown

---

## Accounts & Persistence

Sign in with your Zcash address — no password, no email. Your address is your identity.

| What | Guests | Signed in |
|------|--------|-----------|
| All apps | ✓ | ✓ |
| Watchlist | Local only | Synced to account |
| Settings | Local only | Synced to account |
| Window layout | Lost on reload | Restored on next login |
| Verified ownership | — | Optional payment challenge via Zaino |

- **Sign in with address** — soft identity, immediately usable
- **Verify ownership** — send a unique zatoshi amount to prove control of the address
- **Taskbar** — shows `logged in as [name]` with a `↩` logout button
- Guest sessions prompt to sign in when attempting to save persistent data

---

## System Features

- **SplashGate** — unified login + boot screen; 30-min session cache
- **CoffeeCup** — floating donation widget with ZEC + ETH addresses
- **Taskbar** — live ZEC price, shielded %, block height, logged-in user
- **Themes** — Zenith (default), CRT Green, Golden Gate, Millennium, Aqua ZEC
- **Sound** — 8-bit Web Audio API sounds with master volume slider
- **Window management** — drag, resize, minimize, maximize, cascade
- **Icon style** — emoji or retro ASCII toggle
- **Custom backgrounds** — color, built-in presets, file upload, URL

---

## Configuration

```bash
# apps/frontend/.env.local (and Vercel env vars)
BACKEND_URL=[YOUR API URL]    # ZEC node data API — chain, price, pools, etc.
FASTIFY_URL=[YOUR BACKEND URL]   # Fastify backend — auth, user, leaderboards
API_SECRET_KEY=[YOUR API KEY]
NEXT_PUBLIC_VERSION=1.1.2+zechub-hackathon2026 # ZEC-OS version
# No DATABASE_URL needed — frontend never touches the DB directly

# apps/backend/.env  (on the ZEC stack machine)
DATABASE_URL=postgresql://127.0.0.1:5432/zec_os
ZAINO_GRPC_URL=http://127.0.0.1:8137          # direct local access — same machine as Zaino
BACKEND_TADDR=t1...
SESSION_EXPIRY_HOURS=72
PORT=4000
GAMBLING_MODE=off
```

---

## API Endpoints (proxied via Next.js)

| Route | Description |
|-------|-------------|
| `/api/chain` | Height, difficulty, pool values |
| `/api/price` | Current ZEC/USD |
| `/api/prices` | Historical prices |
| `/api/pools` | Historical pool data |
| `/api/flows` | Shielding/deshielding flow data |
| `/api/block/[id]` | Block by height or hash |
| `/api/tx/[txid]` | Transaction detail |
| `/api/address/[addr]` | T-address balance + history |
| `/api/mempool` | Live mempool with enriched tx fields |
| `/api/miner/[hash]` | Miner identity for a block hash |
| `/api/miners` | Pool stats and top miners |
| `/api/decode-address` | UA → receiver component breakdown |
| `/api/auth/address` | Sign in with Zcash address |
| `/api/auth/challenge` | Create payment ownership challenge |
| `/api/auth/verify/[nonce]` | Poll payment confirmation |
| `/api/user/profile` | Get / update display name |
| `/api/user/settings` | Get / sync OS settings |
| `/api/user/watchlist` | Get / sync watchlist |
| `/api/user/state` | Get / sync window layout |

---

## Tech Stack

- **Framework:** Next.js 16 + TypeScript
- **Styling:** Tailwind CSS + CSS variables
- **State:** Zustand (localStorage + server sync when signed in)
- **Database:** PostgreSQL via Prisma
- **Backend:** Fastify (`apps/backend`) — auth, user persistence, game leaderboards
- **ZEC node:** Zebra · Zaino (gRPC) · Zingo · Zallet
- **Windows:** react-rnd
- **Charts:** uPlot
- **Audio:** Web Audio API (oscillator-based, no files)
- **Fonts:** VT323, Press Start 2P

---

## Deployment

- **Frontend** → Vercel. Build command: `next build` (no DB access needed at build time)
- **`apps/backend`** → runs on the ZEC stack machine, exposed via Cloudflare tunnel at `zec-fast.zcashtools.com`
- **ZEC node API** → `zec-api.zcashtools.com`
- **Zaino gRPC** → local on the ZEC stack machine (`127.0.0.1:8137`), not publicly exposed
- **Database** → PostgreSQL local to the ZEC stack machine (`127.0.0.1:5432`), managed by the backend

---

## Adding New Apps

1. Create `src/components/apps/YourApp.tsx`
2. Register in `APP_REGISTRY` in `src/components/Desktop/Desktop.tsx`

Window chrome, drag/resize, and minimize/maximize are handled automatically.

---

## Donate

ZEC-OS runs on real infrastructure and copious amounts of coffee (Zebra · Zaino · Zingo · Zallet · gRPC).

**ZEC:** `u192er4slrt3pqqqsqek5ksxvqfw9ws5qgtqvc5fjdpl9qg6kfzw9m9d8qcm80f2r37q0lxmkmtv9hqk8zrsuqlzny6pt8ut7xtgpam34q`

**ETH:** `orbgasm.eth`

---

MIT · Created by orb · [orbatron.org](https://orbatron.org)

This project is released under the MIT license — you're welcome to fork, remix, and build on it. If you do, please keep the copyright notice and attribution above intact in your copy or derivative. It helps others find the original and keeps the chain of credit clear. Thank you.
