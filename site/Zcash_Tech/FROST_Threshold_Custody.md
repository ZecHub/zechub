<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Threshold Custody for Shielded ZEC

> For the full cryptographic details of the FROST protocol, see the [FROST technical page](FROST.md).

FROST threshold custody keeps coming up in Zcash conversations — it was the top track at the ZecHub Hackathon 2026 — but the concept isn't always explained in plain language. This page covers what it means, when you actually need it, the trade-offs, and which tools support it today.

---

## TL;DR

- **FROST** lets a group of keyholders collectively control a shielded Zcash address without any single person holding the full private key.
- A **t-of-n** threshold means: t people must co-sign to spend; any t-1 or fewer cannot move the funds alone.
- Transactions look like any other shielded transaction — no on-chain footprint revealing that threshold signing was used.
- This is fundamentally different from transparent multisig (which is public on-chain and Zcash has long supported) — FROST works inside the shielded pool.
- It's useful for DAOs, exchanges, custody services, joint savings, and team treasuries — anywhere a single point of key failure is unacceptable.

---

## What is FROST in plain language?

Imagine three business partners each hold a piece of a key. To spend from their shared wallet, any two of the three must agree and co-sign. The resulting transaction looks identical to a regular individual send — no observer can tell from the blockchain that multiple people were involved.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) is the cryptographic protocol that makes this possible for shielded Zcash. It was created by Chelsea Komlo (University of Waterloo / Zcash Foundation) and Ian Goldberg.

The key properties:

- **Threshold**: only t-of-n signers need to participate (e.g. 2-of-3, 3-of-5)
- **Shielded**: works inside the Orchard privacy pool — amounts, sender, and receiver stay private
- **Indistinguishable**: the final signature looks like any other Zcash shielded transaction
- **Non-custodial**: no single party ever holds the full key — not even the coordinator

---

## When should you use threshold custody?

Threshold custody makes sense when **losing one key or one person should not mean losing the funds**.

| Situation | Why threshold custody helps |
|-----------|----------------------------|
| **DAO or team treasury** | No single admin can drain funds unilaterally; requires consensus |
| **Exchange or custodian** | Distributes key risk across security zones or employees |
| **Personal cold storage (with trusted family)** | 2-of-3 between you + two family members — die or lose access, funds aren't lost |
| **Escrow** | Buyer, seller, and arbitrator each hold a share; funds release when two agree |
| **High-value grant disbursement** | ZCG-style: requires multiple independent signers before paying out |
| **Developer key management** | Prevent insider threat — no single engineer can drain a protocol fund |

You probably **don't** need threshold custody for a personal wallet you control alone, small amounts, or situations where the added coordination overhead outweighs the risk reduction.

---

## How does it differ from transparent multisig?

Zcash has long supported transparent multisig — multiple keys required to spend from a t-address. But transparent multisig has a significant privacy cost: **the multisig structure, all public keys, and all signers are visible on the blockchain**.

FROST solves this by operating inside the shielded pool:

| | Transparent multisig | FROST threshold (shielded) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
| Signers visible on-chain | Yes — all public keys exposed | No — indistinguishable from a single-signer spend |
| Amounts visible | Yes | No |
| Coordination required | On-chain script | Off-chain round of communication |
| Privacy | None | Full shielded privacy |

---

## Trade-offs and limitations

FROST is powerful, but it comes with real trade-offs you should understand before using it:

### Coordination overhead
Signers must be online simultaneously (or nearly so) to complete a signing round. If your t signers are spread across time zones or unreliable connections, spending requires coordination that a solo wallet doesn't.

### No signing if quorum is unavailable
If enough keyholders are unavailable (sick, traveling, unresponsive), funds are temporarily unspendable. Choose your threshold and share count carefully — 2-of-3 is more resilient than 2-of-2.

### Key generation ceremony
Setting up FROST requires a distributed key generation (DKG) ceremony where all n participants are online together. This is a one-time event, but it must be done carefully — if participants are compromised during DKG, security is undermined.

### Tooling is still maturing
FROST for shielded Zcash is relatively new. The IETF standard (draft-irtf-cfrg-frost) is mature, but wallet integrations are limited. Expect some rough edges compared to a standard single-key wallet.

### Recovery complexity
Losing a shard is not the end of the world (that's the point of the threshold), but recovery plans must be documented in advance. Who holds backups? What happens if two shards are lost simultaneously?

---

## Who is building with FROST on Zcash?

### Zcash Foundation — frost.zfnd.org
The Zcash Foundation has shipped a working FROST implementation and a demo site. This is the reference implementation used for testing and development.

### YWallet FROST Demo
YWallet (a high-performance Zcash wallet) has an early FROST demo integration. See the [YWallet FROST Demo guide](/guides/Ywallet_FROST_Demo) for step-by-step instructions.

### ZecHub Hackathon 2026 — FROST Track Projects

The FROST track was the most competitive at ZecHub Hackathon 2026. Notable projects:

- **ZecVault** — 2-of-3 shielded escrow settled on mainnet (FROST threshold)
- **Steward** — threshold custody for shielded Zcash with a recovery-focused UX

### Coinbase
Coinbase built a production FROST implementation for their threshold signing systems (for Bitcoin), with modifications that remove the preprocessing stage and distribute the aggregator role among all participants. Their experience validates FROST's security model at production scale.

---

## How a signing session works (simplified)

1. **Setup (once):** All n participants run a distributed key generation (DKG) ceremony. Each gets a private shard; a shared public key is derived. No party knows the full private key.

2. **Coordinate signers:** When a spend is needed, a coordinator (who can be one of the signers) collects commitments from t participants who are willing to sign.

3. **Round 1:** Each participating signer generates a nonce and broadcasts a commitment (public, non-sensitive).

4. **Round 2:** Each participating signer computes their partial signature using their private shard and broadcasts it.

5. **Aggregation:** The coordinator combines the t partial signatures into one final Schnorr signature — indistinguishable on-chain from a single-party signature.

6. **Broadcast:** The transaction is broadcast to the Zcash network as normal.

If any signer sends a bad partial signature, the protocol identifies them and aborts (they are excluded from future sessions). Coordination happens off-chain — the blockchain only sees the final transaction.

---

## Choosing your threshold parameters

| Setup | Resilience | Risk |
|-------|-----------|------|
| 1-of-1 | No resilience — single point of failure | Key loss = permanent loss |
| 2-of-2 | Must have both signers — no fault tolerance | One unavailable = frozen funds |
| 2-of-3 | One shard can be lost or unavailable | Lower security margin than 3-of-5 |
| 3-of-5 | Two shards can be lost; strong security | More coordination overhead |
| 3-of-7 | Institutional-grade; tolerates two failures | High coordination cost |

A practical starting point for most teams: **2-of-3** (resilient, minimal coordination) or **3-of-5** (institutional, higher security).

---

## Related Pages

- [FROST — Technical Deep Dive](FROST.md) — cryptographic details of the protocol (DKG, signing rounds, security proofs)
- [YWallet FROST Demo Guide](/guides/Ywallet_FROST_Demo) — step-by-step hands-on demo
- [FROST Demo (frostdemo)](/guides/frostdemo) — Zcash Foundation demo walkthrough
- [Viewing Keys](Viewing_Keys.md) — read-only access to shielded addresses (complementary to threshold custody)
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md) — FROST is also key infrastructure for ZSA issuance

## Resources

- [FROST research paper (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST draft standard (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST implementation](https://frost.zfnd.org)
- [Chelsea Komlo — What are Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
