# Bluff Arena + Zcash Staking — Full Project Context

This document is a complete handoff spec: the game as it exists today, the
Zcash staking feature being added, and everything needed to implement it.
Written for the ZecHub Hackathon 3.0 (Games / FROST tracks), deadline
July 15, 2026.

---

## 1. What this project is

**Bluff Arena** is a real-time multiplayer implementation of Bluff (also
known as Cheat / I Doubt It) — a card game where players discard cards
face-down while *claiming* a rank, and other players can call their bluff.

**The addition**: players stake real ZEC to join a game. Winner takes the
pool minus a platform fee. All settlement happens on the Zcash chain.

Repo: `github.com/AnirudhSingh07/bluff-card-game--3-`

---

## 2. Existing tech stack (already built, don't rebuild)

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui components (`components/ui/*`) |
| Realtime | Socket.IO 4.8 (client + server) |
| Server | Custom Node HTTP server (`server.ts`) wrapping Next's request handler, single process |
| State | **In-memory only** — `Map<string, ServerGame>` in `server.ts`. No database. Resets on restart. |
| Deploy | Railway (`railway.json` present) |
| Dev command | `pnpm dev` → `tsx server.ts` |
| Build | `next build && tsc -p tsconfig.server.json` → `dist/server.js` |

**File structure that matters:**
```
server.ts                    # all game logic + socket handlers live here
types/game.ts                 # shared Game/Player/LastClaim types
app/
  page.tsx                    # landing page: create/join game form
  socket.ts                   # socket.io-client singleton (getSocket())
  game/[gameId]/page.tsx       # in-game page, renders Lobby or GameBoard
components/
  lobby.tsx                    # pre-game waiting room UI
  game-board.tsx                # main game UI
  action-panel.tsx              # play/check/pass controls
  end-screen.tsx                 # winner screen
  player-hand.tsx, play-dialog.tsx, turn-timer.tsx, emote-bar.tsx, reconnecting-overlay.tsx
lib/socket.ts                 # duplicate of app/socket.ts (getSocket())
```

There is **no backend framework beyond raw Socket.IO event handlers** —
everything is `socket.on("event-name", (payload) => { ... })` inside
`io.on("connection", (socket) => { ... })` in `server.ts`.

---

## 3. Core game rules (Bluff / Cheat)

- 2–6 players, standard 52-card deck, dealt evenly (`dealCards`).
- Turn order is fixed, rotates left (`game.turn` index into `players[]`).
- On your turn you play 1–4 cards face-down from your hand and **claim**
  a rank (e.g. "two Kings") — the claim need not be true.
- The next player may either:
  - **Play** their own cards on top, claiming a rank (this codebase
    doesn't enforce claim continuity — check the `play-cards` handler), or
  - **Check** (call the bluff): the last claim's actual cards are revealed.
    If the claimer lied, they take the whole pile. If honest, the checker
    takes the pile.
  - **Pass**: if everyone passes since the last claim, the pile is discarded.
- Turn timer: 30s (`TURN_TIMEOUT_MS`), auto-passes on timeout.
- **Win condition**: first player to empty their hand wins — but win is only
  confirmed if they survive one more full turn without being successfully
  checked (`potentialWinner` → `winner` logic in `checkWinner`).
- Reconnect grace: 90s in-game, 30s in lobby, before a player is dropped.
- Games auto-cleanup after 1h of inactivity if not `"playing"`.

**Existing socket events** (client → server): `create-game`, `join-game`,
`reconnect-player`, `get-game-state`, `start-game`, `play-cards`, `check`, `pass`.
**Server → client**: `game-created`, `joined-game`, `game-updated`, `error`.

---

## 4. Why Zcash needs a different architecture than "smart contract escrow"

Zcash has **no general-purpose smart contract layer** (it's a UTXO chain,
forked from Bitcoin, with limited scripting). So there is no Solidity-style
escrow contract that trustlessly holds a pot and auto-releases it. Two
consequences that shape everything below:

1. **The pool is custodial by necessity.** A backend-controlled wallet
   (a zcashd node) holds all deposits and signs the payout. This is the
   pragmatic MVP approach.
2. **The trust-minimized alternative is FROST** (threshold Schnorr
   signatures) — a genuinely Zcash-native primitive, and one of this
   hackathon's own tracks. Full design in section 13 — treat as stretch
   goal / "future work," not baseline scope for the 5-day window.

---

## 5. Staking flow (end to end)

```
Host creates game with stakeUsd (e.g. $10)
  -> server converts to ZEC via CoinGecko price feed, locks in stakeZec
  -> server generates a unique zcashd deposit address per player
     (getnewaddress, one per player per game)
  -> each player sends exactly stakeZec ZEC from their own wallet
     (Zashi, YWallet, etc.) to their assigned address
  -> client polls "check-deposits"; server checks confirmations via
     zcashd RPC (listunspent) and flips player.depositConfirmed
  -> once every player is confirmed AND every player has set a
     zecPayoutAddress (where THEY want winnings sent), game.poolReady = true
  -> host can now start-game (blocked otherwise)
  -> normal Bluff gameplay proceeds unchanged
  -> when checkWinner() sets game.winner, triggerPayout() fires:
     sendmany() in one tx: 95% of pot -> winner's zecPayoutAddress,
                            5% -> PLATFORM_FEE_ADDRESS
  -> txid stored on game.payoutTxid, broadcast to all clients
```

Example from the original spec: 4 players x $10 stake = $40 pool -> winner
gets $38 (95%), platform gets $2 (5%). Fee % is configurable via
`PLATFORM_FEE_BPS` env var (500 = 5.00%).

---

## 6. Data model additions

Add to `types/game.ts`:

```ts
// Player additions
zecPayoutAddress?: string;   // where THEY get paid if they win
depositAddress?: string;     // unique address they must send the stake to
depositConfirmed: boolean;   // server-confirmed on-chain

// Game additions
stakeUsd: number;            // e.g. 10 ($10 per player); 0 = free/no-stake game
stakeZec?: number;           // locked in once the pool is created (USD->ZEC at creation time)
poolReady: boolean;          // true once every player's deposit is confirmed
payoutTxid?: string;         // set once the winner has been paid
```

---

## 7. New/changed socket events

| Event | Direction | Payload | Notes |
|---|---|---|---|
| `create-game` | client->server | `{ name, maxPlayers, stakeUsd }` | `stakeUsd` new; 0 = no staking |
| `deposit-address` | server->client | `{ address, stakeZec, stakeUsd }` | sent to a player right after they create/join a staked game |
| `set-payout-address` | client->server | `{ gameId, address }` | player declares where to send their winnings |
| `check-deposits` | client->server | `{ gameId }` | client polls this; triggers an RPC check against zcashd |
| `game-updated` | server->client | full `Game` object | now also carries `poolReady`, `payoutTxid`, per-player `depositConfirmed`/`zecPayoutAddress` |
| `start-game` | client->server | *(unchanged payload)* | now blocked with an `error` if `stakeUsd > 0` and pool isn't ready or a payout address is missing |

---

## 8. New backend modules

**`lib/zcash-rpc.ts`** — thin JSON-RPC client for zcashd (same interface
style as Bitcoin Core, since Zcash is a fork): `getNewAddress()`,
`getAddressBalance()`, `getAddressConfirmations()`, `sendMany()`,
`getTransaction()`. Auth via `ZCASHD_RPC_URL` / `ZCASHD_RPC_USER` /
`ZCASHD_RPC_PASS` env vars, basic auth over HTTP.

**`lib/zcash-pool.ts`** — business logic layer:
- `getZecUsdPrice()` / `usdToZec()` — CoinGecko price feed, 60s cache.
- `createPool(gameId, stakeUsd)` — locks in `stakeZec`, creates a `StakePool`.
- `addDepositSlot(gameId, playerId)` — generates a fresh deposit address per player.
- `setPayoutAddress(gameId, playerId, address)`.
- `pollDeposits(gameId)` — checks balance + confirmations for every slot,
  flips `confirmed`, returns `true` if the whole pool is funded.
- `payoutWinner(gameId, winnerPlayerId)` — computes `(total - fee)` to
  winner + fee to platform, sends both in **one atomic `sendmany` tx**.
  Idempotent: returns the existing `payoutTxid` if already paid, so a
  crash-and-retry never double-pays.

---

## 9. Environment variables

```
ZCASHD_RPC_URL=http://127.0.0.1:8232
ZCASHD_RPC_USER=...
ZCASHD_RPC_PASS=...
PLATFORM_FEE_ADDRESS=t1...              # platform's fee-collection address
PLATFORM_FEE_BPS=500                    # 500 = 5.00%
DEPOSIT_CONFIRMATIONS_REQUIRED=1        # 1 for testnet/demo, 6+ for real mainnet money
```

---

## 10. zcashd node setup

**Update (verified live 2026-07-14/15):** `zcashd` is being deprecated —
automatic end-of-support halt around 2026-07-18 at block height ~3417100
(Zebra/Zallet are the replacements, but Zallet's wallet RPC isn't a drop-in
yet). It still works fine today. Also: current zcashd (v6.x) **disables
`getnewaddress` by default** — you must pass
`-allowdeprecated=getnewaddress` or `lib/zcash-pool.ts`'s `addDepositSlot()`
will fail. `listunspent`/`sendmany` are unaffected (verified).

**Fastest path (verified working): Docker, not building from source.**
No official zcashd binary exists for macOS/arm64 (Apple Silicon) — building
from source is slow. `electriccoinco/zcashd` on Docker Hub works via Docker
Desktop's x86_64 emulation on Apple Silicon:

```bash
docker run -d --name bluff-zcashd \
  -p 18232:18232 \
  -e ZCASHD_RPCUSER=bluff -e ZCASHD_RPCPASSWORD=<pick one> \
  -e ZCASHD_RPCBIND=0.0.0.0 -e ZCASHD_ALLOWIP=0.0.0.0/0 -e ZCASHD_TXINDEX=1 \
  -v "$(pwd)/.regtest-data/zcash-data:/srv/zcashd/.zcash" \
  -v "$(pwd)/.regtest-data/zcash-params:/srv/zcashd/.zcash-params" \
  electriccoinco/zcashd \
  -regtest=1 -rpcport=18232 -allowdeprecated=getnewaddress \
  -i-am-aware-zcashd-will-be-replaced-by-zebrad-and-zallet-in-2025=1
```

Note `ZCASHD_NETWORK=regtest` as an env var does **not** work on this image —
network mode must be passed as a `-regtest=1` (or `-testnet=1`) CLI arg after
the image name. For **testnet**, swap `-regtest=1` for `-testnet=1`
(`-rpcport=18232` is testnet's real default anyway) and get funds from
[Fauzec](https://fauzec.com/). For **mainnet**, drop the network flag
entirely — but budget real time for initial block download (full mainnet
history, no shortcuts found), so start the sync early and treat it as a
stretch goal against the deadline, not the guaranteed demo.

Regtest needs no faucet — mine your own funds instantly:
```bash
docker exec bluff-zcashd zcash-cli -regtest -rpcuser=bluff -rpcpassword=<pw> \
  generate 150   # 150 to mature coinbase rewards into spendable balance
```
This was used to verify `lib/zcash-rpc.ts`/`lib/zcash-pool.ts` end-to-end
against a real, live node (real signed + broadcast + mined transactions,
including payout idempotency) — not just mocks.

**Testnet notes (verified 2026-07-14):**
- `getnewaddress` requires the wallet's emergency-recovery-phrase backup to
  be acknowledged first (`zcashd-wallet-tool`, an interactive ceremony —
  answers a couple of random word-index challenges from the seed phrase)
  once `-exportdir=<path>` is set. One-time, per wallet.
- The [Fauzec](https://fauzec.com/) testnet faucet **rejects transparent
  (`t...`) addresses** (`unsupported_address_kind`) — it only pays out to
  shielded/Unified addresses. Generate one with the non-deprecated
  account API: `z_getnewaccount` then `z_getaddressforaccount 0` (gives a
  `utest1...` UA with p2pkh+sapling+orchard receivers). Faucet has a real
  API: `POST /api/v1/claim {"network":"testnet","address":"<UA>"}` →
  `{request_id, txid}`, poll `GET /api/v1/status/testnet/{request_id}`.
  1 TAZ/address/24h.
- A real claim was executed this way — txid
  `defb52070f5db9fb3c42c006dcfa6a05bcaad56623a578ee5703a0e9915f65f9`,
  verifiable on any testnet explorer — proving the faucet path works.
- **Same bottleneck as mainnet applies**: our own node's wallet can't see/
  confirm/spend those funds (and therefore can't feed `lib/zcash-pool.ts`'s
  deposit-confirmation flow) until it finishes syncing the testnet chain
  from genesis — testnet height is comparable to mainnet's (~3.5M blocks),
  so this is not meaningfully faster, just lighter per-block. No shortcut
  found; budget real sync time either way.

---

## 11. Frontend work needed (not yet built)

- **`app/page.tsx`**: add a stake amount input (`stakeUsd`) alongside the
  existing name/maxPlayers form; pass it in the `create-game` emit.
- **`components/lobby.tsx`**:
  - On receiving `deposit-address`, render a QR code (e.g. `qrcode.react`)
    + the raw address + "send exactly `stakeZec` ZEC" instructions.
  - A payout-address input/paste field -> emits `set-payout-address`.
  - Poll `check-deposits` every ~10s while any player is unconfirmed;
    show live per-player deposit status (confirmed/pending) next to each
    name in the existing players list.
  - Disable/enable the existing "Start game" button based on `poolReady`
    and every player having `zecPayoutAddress` set.
- **`components/end-screen.tsx`**: once `game.payoutTxid` is present, show
  it with a block explorer link (mainnet:
  `https://mainnet.zcashexplorer.app/transactions/<txid>` — verify the
  current canonical explorer, these change).

---

## 12. Security / integrity notes to carry into implementation

- `payoutWinner` must stay idempotent (already designed that way — checks
  `pool.payoutTxid` before sending again). Preserve this if refactoring.
- The in-memory `games` Map is a single point of failure — a server
  restart mid-game loses which deposits were confirmed. For anything
  beyond a demo, persist `StakePool` state to a real datastore.
- No refund path exists yet if a game is created and never fills — worth
  adding a "cancel game -> refund" flow, even minimal, before real use.
- This whole design is **custodial**: the zcashd wallet alone can move
  funds. Be upfront about that in any hackathon writeup rather than
  implying trustlessness.
- Operating real-money wagering generally carries money-transmission /
  gambling licensing considerations depending on jurisdiction — separate
  from the technical build, worth being aware of.

---

## 13. Future work: FROST threshold escrow (stretch goal, not MVP)

The trust-minimized alternative to a single custodial wallet: a **t-of-n
threshold key** controls the pool address instead of one key. E.g. for a
2-player game, a 2-of-2 threshold between the server's key share and the
winner's client-held key share — releasing funds requires both to co-sign,
so the server alone can never move the pot.

Why this is stretch-goal, not baseline: FROST tooling for Zcash is still
low-level (reference implementations in Rust — `frost-zcash` / ZF's
`frost` crate family — no polished JS SDK), and threshold signing needs a
live signing round between both parties' devices, which is its own UX
problem. A strong hackathon artifact here is a **standalone proof-of-concept**
— generate a FROST 2-of-2 keypair via the Rust reference crate (called from
Node via a CLI wrapper or WASM build), fund the resulting address on
testnet, and demonstrate a payout transaction succeeding with both shares
and failing with only one — documented as the intended production design,
separate from the working custodial MVP.

**Implemented as:** `frost-poc/` — a standalone, scripted walkthrough (not
wired into `server.ts`) of a real 2-of-2 Orchard payout using
`frost-client` + `frostd` + `zcash-sign` + YWallet on testnet, including the
1-of-2 failure demo. See `frost-poc/README.md`.

---

## 14. Suggested build order (given a short deadline)

1. Merge type additions into `types/game.ts`.
2. Drop in `lib/zcash-rpc.ts` and `lib/zcash-pool.ts`.
3. Patch `server.ts`: new imports, staking fields in `create-game`/
   `join-game`, `set-payout-address` + `check-deposits` handlers,
   a payout trigger call wherever `checkWinner` returns true, stake
   gate in `start-game`.
4. Get zcashd running on testnet, confirm RPC calls work from a scratch
   script before touching the UI.
5. Build the lobby UI additions (stake input -> QR deposit -> payout
   address -> live confirmation status -> gated start button).
6. End-to-end test one full game on testnet with faucet funds.
7. Switch to mainnet, retest with small real amounts.
8. Write up the FROST design as future work in the hackathon submission.
