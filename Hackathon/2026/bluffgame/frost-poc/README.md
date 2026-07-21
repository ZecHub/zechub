# FROST 2-of-2 Orchard Payout — Standalone Proof of Concept

This is the trust-minimized architecture for Bluff Arena's ZEC payouts,
demonstrated **standalone with real testnet ZEC and a real broadcast
transaction** — it is deliberately **not** wired into `server.ts` / the
Socket.IO game. See `PROJECT-CONTEXT.md` section 13 for why the live game
ships with the custodial pool (`lib/zcash-pool.ts`) instead, and read the
"Why standalone" section below before assuming this can be dropped straight
into the app.

## The idea

Instead of one custodial `zcashd` wallet controlling the whole pool, the
pool address is controlled by a **2-of-2 FROST threshold key**: one share
held by the server operator, one share held by the winner. Paying out
requires *both* shares to co-sign — the server alone can never move the
funds, and neither can the winner alone. That's the actual trust-minimization
property this PoC exists to prove.

## Why standalone (not wired into the live game)

The reference tooling for Zcash + FROST
(`ZcashFoundation/frost-tools` → `frost-client` + `frostd` + `zcash-sign`) is
a set of **human-operated Rust CLIs**, paired with **YWallet**, a GUI wallet
app. The real, documented workflow (ZF's own
[ywallet-demo](https://frost.zfnd.org/zcash/ywallet-demo.html)) requires:

- exporting a transaction plan from YWallet's GUI (click a button, save a
  file),
- running a live, multi-terminal signing ceremony between a coordinator and
  each key-share holder,
- pasting the resulting signature back into YWallet,
- and clicking "Broadcast" in the GUI.

There is no JS/WASM SDK for any of this. Making it "seamless" inside a web
app would mean either the winner running a local Rust process on their own
machine at payout time (a real terminal step, breaking the web UX), or us
reimplementing large parts of YWallet's transaction-plan/broadcast internals
headlessly — a much bigger, multi-day build. This PoC demonstrates the real
mechanism honestly, on real testnet funds, without overclaiming a polish
level the tooling doesn't support yet.

## Prerequisites

- Rust + Cargo
- The [YWallet](https://ywallet.app/) app (desktop or mobile)
- Testnet ZEC (get some from a Zcash testnet faucet)

Install the FROST CLI tools:

```bash
cargo install --git https://github.com/ZcashFoundation/frost-zcash-demo.git --locked frost-client
cargo install --git https://github.com/ZcashFoundation/frost-zcash-demo.git --locked zcash-sign
```

(`frostd` — the coordination server — is part of the same repo; see
`scripts/run-frostd.sh`.)

## Walkthrough

Two participants: `server` and `winner`. Everything below targets the
**Orchard** pool (RedPallas Schnorr) and **testnet**.

### 1. Start the coordination server

```bash
./scripts/run-frostd.sh
```

### 2. Each participant initializes their config

```bash
frost-client init -c server.toml
frost-client init -c winner.toml
```

### 3. Generate the 2-of-2 key (trusted-dealer, for demo speed)

```bash
./scripts/keygen-trusted-dealer.sh
# wraps:
# frost-client trusted-dealer -d "Bluff Arena payout pool" \
#   --names server,winner -c server.toml -c winner.toml -C redpallas -t 2
```

> Production note: a trusted dealer is a simplification for this PoC. The
> production-intended path is DKG (`frost-client dkg`), where neither party
> ever sees the full key — see ZF's demo doc for the DKG flow.

### 4. Derive the Orchard address + viewing key

```bash
./scripts/generate-address.sh
# wraps: zcash-sign generate --ak <group_pubkey> --danger-dummy-sapling
```

This prints an **Orchard address** and a **Unified Full Viewing Key (UFVK)**.

### 5. Fund it

In YWallet: "New account" → "Restore an account" → paste the UFVK →
Import. Send **testnet** ZEC to the Orchard address from a faucet
(not the Sapling address shown alongside it — funds sent there would be
unspendable by this key).

### 6. Build a transaction plan (simulating a game payout)

In YWallet: paste the winner's real payout address, enter the payout
amount, click the "offline signing" (snowflake) button, save the QR/JSON as
`tx-plan.json`.

### 7. Run the real signing ceremony (2 of 2)

Four terminals:

```bash
# Terminal 1 — signer
zcash-sign sign --tx-plan tx-plan.json --ufvk <ufvk> -o tx-signed.raw

# Terminal 2 — coordinator
frost-client coordinator -c server.toml --server-url localhost:2744 \
  --group <group-id> -S <server-pubkey>,<winner-pubkey> -m - -r -

# Terminal 3 — server's share
frost-client participant -c server.toml --server-url localhost:2744 --group <group-id>

# Terminal 4 — winner's share
frost-client participant -c winner.toml --server-url localhost:2744 --group <group-id>
```

Paste the SIGHASH/randomizer from Terminal 1 into Terminal 2 when prompted.
The ceremony produces a FROST signature; the signer finalizes the raw,
broadcastable transaction.

### 8. Broadcast

In YWallet: Menu → More → Broadcast → select `tx-signed.raw`. Confirm the
txid on a testnet explorer.

### 9. Safety demo — the actual point of this PoC

Repeat step 7 with **only one** of the two `participant` processes running
(comment out Terminal 3 *or* 4). The coordinator will be unable to produce a
valid signature — proving neither the server nor the winner can move pool
funds unilaterally. Record this alongside the successful 2-of-2 run.

## Files here

- `scripts/run-frostd.sh` — starts the local coordination server
- `scripts/keygen-trusted-dealer.sh` — wraps the 2-of-2 trusted-dealer keygen
- `scripts/generate-address.sh` — wraps Orchard address / UFVK generation

The YWallet steps (5, 6, 8) have no CLI/API and stay manual by necessity.
