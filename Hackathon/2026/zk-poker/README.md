# zk.poker — trustless heads-up hold'em on Zcash

**Live:** https://zkbtc.org · **Demo video:** https://www.youtube.com/watch?v=xwmEUOXYE24 · **Code:** https://github.com/rotkonetworks/zeratul/tree/master/crates · **Tracks:** FROST · Gaming

Heads-up No-Limit Hold'em where **the operator never sees a card and never holds the pot.**
Cards are dealt by a mental-poker ceremony between the two players; the server is a
blind relay that only ever forwards ciphertext. Money is held in a FROST 2-of-3
shielded escrow whose payouts require the players' own signatures.

## What works today (verified live on zkbtc.org)

- **Mental-poker dealing (zk-shuffle).** The two clients run a commutative-encryption
  shuffle: each shuffles + re-masks the deck, shuffle proofs are verified, and hole/board
  cards are opened with per-card zero-knowledge reveals. Neither player nor the server can
  see another player's cards or rig the deck. *(Verified: full multi-hand games — deal →
  betting → flop/turn/river → showdown → payout — with `shuffle: host proof VERIFIED ✓`,
  `hole cards revealed (zk)` in the client logs.)*
- **Encrypted blind relay.** Players connect through the server over an authenticated
  x25519 → AES-256-GCM channel; the relay sees only opaque envelopes. Players never open a
  socket to each other, so there's **no peer IP leak** either.
- **FROST 2-of-3 shielded escrow (deployed).** Real Zcash Orchard shielded addresses,
  nested-FROST (Pallas) key management, a real PCZT payout builder + FROST signing path.
- **Co-signed payouts (operator can't forge).** Settlement is gated: escrow refuses to pay
  out unless **both seats sign the exact outcome** with an Ed25519 identity **pinned
  on-chain in the deposit memo** — so a compromised operator cannot redirect a pot.
  *(Verified: escrow rejects an unsigned settle — "seat identities not pinned on-chain".)*

## How it fits together

```
player A  ┐                          ┌ player A
zk-shuffle │  ── encrypted relay ──   │ zk-shuffle     server: blind relay only
player B  ┘   (server sees ciphertext)└ player B       (no cards, no pot, no IPs)
                        │
                        ▼
        FROST 2-of-3 Orchard escrow  ── deposit memo pins each seat's key
        payout = both players' signatures over final state → FROST co-sign → broadcast
```

## Status / roadmap (honest)

- Trustless poker + encrypted relay: **live and verified.**
- FROST escrow + co-sign gate: **deployed** (Zcash testnet), enforcing fail-closed.
- Mainnet real-money settlement: escrow DKG-mode deposit-scan + client DKG/co-sign
  wiring + key persistence — **in progress**; testnet demonstrates the full mechanism
  end-to-end without risking funds.

## Stack

Rust (axum relay + `poker-escrow` FROST/PCZT), SolidJS + UnoCSS client, `zk-shuffle`
(ristretto255 ElGamal, Chaum–Pedersen DLEQ, batched remask proofs) compiled to WASM,
nested-FROST on Pallas (Zcash Orchard-compatible), zidecar Orchard scanner.

**Team:** Rotko Networks · **Demo:** open https://zkbtc.org, create a free-play table,
share the link to a second browser, play a hand — cards stay private, server sees nothing.
