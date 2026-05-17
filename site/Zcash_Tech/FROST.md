<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST and Multi-Signature Privacy in Zcash

Imagine a company treasury that requires three executives to approve any large transfer. Or a nonprofit DAO that needs five of its eight board members to move funds. Or a family securing an inheritance so no single person can act alone.

These are exactly the problems FROST was built to solve — with a key difference from traditional multisig: the final result looks indistinguishable from a single-person signature.

---

## What is FROST?

**FROST** stands for **Flexible Round-Optimized Schnorr Threshold Signatures**. It was created by Chelsea Komlo (Zcash Foundation / University of Waterloo) and Ian Goldberg, and is now standardized as [RFC 9591](https://www.rfc-editor.org/rfc/rfc9591).

At its core, FROST is a way for a *group* of people to share control over a cryptographic key — without any single person ever holding the complete key.

### The problem with a single private key

A standard crypto wallet has one private key. Whoever holds that key controls the funds. This creates two risks:
- **Loss**: If the key is lost or destroyed, the funds are gone forever.
- **Theft**: If the key is stolen, the funds can be taken immediately.

### How FROST changes the model

With FROST, the private key is mathematically split into **shares** distributed among multiple participants. Here's what makes it powerful:

- A **threshold** (e.g., 2-of-3, or 3-of-5) must cooperate to produce a valid signature.
- No individual share by itself is useful — an attacker who steals one share cannot spend the funds.
- The final signature produced by the group is a **single Schnorr signature** — it looks exactly like one person signed, not many.

This last point is crucial for privacy.

---

## Security Properties of FROST

FROST offers formal security guarantees that make it suitable for high-value custody:

**Unforgeability**: An adversary who corrupts fewer than t participants cannot forge a valid signature. This holds even if the adversary controls the network and can observe all protocol messages.

**No single point of failure**: The complete private key never exists in one place. This is true both during key generation (if DKG is used) and during signing (no participant ever reconstructs the full key — aggregation is done mathematically on partial signatures).

**Participant accountability**: If a signer submits an invalid share, FROST identifies them. The group can remove the misbehaving participant and reconstitute with a new threshold signing session. Honest participants are never penalized.

**Concurrency-safe**: FROST can run multiple signing sessions in parallel without security degradation. Other threshold protocols require sessions to be strictly sequential, creating operational bottlenecks.

**Secure against chosen-message attacks**: FROST security is proven under standard cryptographic assumptions — specifically the hardness of the discrete logarithm problem.

---

## Why FROST is Different from Traditional Multisig

Most people are familiar with multisig from Bitcoin — where a transaction can require M-of-N signatures. This works, but it has a significant drawback: **it's visible on-chain**.

When a 2-of-3 Bitcoin multisig transaction is broadcast, anyone looking at the blockchain can see that it was a multisig transaction, how many signatures were required, and the public keys of all potential signers. This leaks information about who controls the funds.

| Feature | Traditional Multisig | FROST |
|---|---|---|
| On-chain signature count | M separate signatures | 1 combined signature |
| Reveals spending policy? | Yes (e.g., "2-of-3") | No |
| Key size overhead | Linear in M | Constant |
| Compatible with privacy? | Limited | Yes |
| Can abort bad participant? | No | Yes — with accountability |
| Concurrent sessions safe? | Yes (separate signing) | Yes |
| Requires all rounds live? | Usually | No — can abort misbehaving participants |

FROST produces a **single Schnorr signature** from the group. An observer cannot tell whether the transaction was signed by one person or ten. The internal structure — how many participants, what the threshold is — stays private.

### Choosing Your Threshold

The right t-of-n configuration depends on your security model:

| Setup | Trade-off | Good for |
|---|---|---|
| 2-of-3 | Any two of three can sign; one loss is recoverable | Personal wallets, small teams |
| 3-of-5 | Majority required; two losses are survivable | Medium organizations |
| 5-of-9 | Strong majority; resilient to multiple simultaneous failures | Large DAOs, institutional custody |
| 7-of-12 | Near-supermajority for high-value decisions | Protocol-level governance |

A higher threshold improves security against collusion but increases coordination cost. For Zcash use cases where privacy is the goal, any t-of-n configuration is equally private on-chain — the threshold is never revealed.

---

## How FROST Works (Simply Explained)

You don't need to understand the cryptography to understand the concept.

**Step 1: Key Setup — Two Approaches**

There are two ways to set up a FROST wallet:

*Trusted dealer setup*: One trusted process generates the full secret and splits it into shares, one per participant. Simpler to implement, but the dealer must be trusted to delete the master secret after splitting.

*Distributed key generation (DKG)*: Participants jointly create the group key without the full private key ever existing in one place. This is the stronger approach — no single participant or coordinator can learn the complete key. FROST builds its DKG on Pedersen's scheme, using Shamir secret sharing and verifiable secret sharing as subroutines.

At the end of setup, each participant holds:
- A *private key share* (unique to them — never shared)
- The *group public key* (shared publicly — verifies signatures)
- Verification key shares for each other participant (allows them to check each other's partial signatures)
- A participant identifier and backup data

**Step 2: Signing (Threshold Signing)**

When the group wants to sign something, t-of-n participants join a signing session:

1. Each selected participant publishes a **one-time signing commitment** — a pair of EC points generated from fresh private nonces. These commitments are collected by a coordinator.
2. The transaction or message to be signed is agreed upon.
3. Each participant generates a **signature share** using their key share, their nonce, and the commitments from all other signers.
4. The coordinator collects signature shares, verifies each one against the corresponding verification key share, and **aggregates them into one final Schnorr signature**.
5. The final signature is broadcast — it verifies against the group public key exactly like a normal single-party signature.

FROST is *round-optimized*: it can operate in two communication rounds, or even one if nonces are pre-committed in a preprocessing stage. This minimizes the chance a signing ceremony fails because a participant goes offline mid-session.

If a participant sends an invalid commitment or share, FROST identifies the misbehaving party and aborts. A new session with a fresh set of t participants can then proceed.

---

## Real-World Use Cases

### DAO Treasury Management

A DAO with 12 voting members could require 7-of-12 approval before any funds move. With FROST:
- No single admin or multisig contract controls the keys.
- Governance decisions are enforced cryptographically, not just by policy.
- On-chain, the spend looks like a normal transaction — no metadata about the DAO's internal structure.

### Institutional Custody

A custody provider holding client funds typically faces a dilemma: keep keys in a single HSM (centralized risk) or use multisig (reveals custody structure). FROST offers a third path — threshold control with a single clean signature. Regulators and auditors see normal transactions; the internal custody structure stays private.

### Shared Wallets for Families or Organizations

A family can set up a 2-of-3 wallet among parents and a trusted relative. Funds are secure even if one device is lost. When the parents want to spend, they cooperate — but their transaction looks normal on the blockchain.

### Advanced Governance Systems

Projects that want on-chain enforcement of governance decisions — "this upgrade can only happen if 5 core developers agree" — can use FROST to make those decisions binding at the cryptographic level, not just the social level.

---

## Why FROST Matters for Zcash Specifically

Zcash is built around privacy. Shielded transactions hide sender, receiver, and amount. But traditional approaches to shared key control have always threatened to leak metadata about *how* funds are controlled.

FROST closes that gap.

### Privacy-Preserving Multi-Party Control

With FROST, a shielded Zcash wallet can be controlled by multiple parties — a board, a DAO, a custody provider — while the transaction on the blockchain looks identical to any single-person shielded transaction. The spending policy is never revealed.

### Stronger Security for Institutional ZEC

Exchanges, foundations, and development organizations holding large amounts of ZEC face significant key management risk. FROST allows them to distribute that risk across multiple signers and geographies without compromising the privacy that makes Zcash valuable.

### Zcash Shielded Assets (ZSA)

As ZSAs bring new asset types to the Zcash network, managing issuance authority securely becomes critical. FROST gives issuers a way to require multi-party approval for minting or administrative operations — with full privacy intact.

### The Zcash Foundation's Work

The Zcash Foundation has been a leader in FROST research and implementation:
- Chelsea Komlo co-created FROST while at the Zcash Foundation.
- The Foundation has developed and maintained a [FROST library for Zcash](https://frost.zfnd.org/) with real test implementations.
- **`frost-client`** — a command-line reference client for signing Zcash transactions with FROST.
- **`frostd`** — a communication server that helps FROST participants coordinate signing messages securely.
- [Ywallet](https://ywallet.app/) has shipped a working FROST demo for shielded multisig on mainnet — the first of its kind.

This isn't theoretical. FROST is already running on Zcash.

---

## Current State and What's Coming

| Milestone | Status |
|---|---|
| FROST paper published | ✅ 2020 |
| FROST standardized as RFC 9591 | ✅ 2024 |
| Zcash Foundation FROST library | ✅ Active |
| Ywallet FROST demo (mainnet) | ✅ Live |
| Full wallet UX integration | 🔄 In progress |
| DAO tooling built on FROST | 🔄 Emerging |

---

## Getting Deeper

- **[FROST RFC 9591](https://www.rfc-editor.org/rfc/rfc9591)** — The official IETF standard
- **[Zcash Foundation FROST Docs](https://frost.zfnd.org/)** — Implementation guide and Zcash-specific context
- **[Ywallet FROST Demo](https://ywallet.app/)** — Try threshold signing on Zcash mainnet
- **[FROST Paper (original)](https://eprint.iacr.org/2020/852.pdf)** — The research behind the protocol
- **[Chelsea Komlo at Zcon3](https://youtu.be/cAfTTfblzoU?t=110)** — Video explainer from FROST's co-creator

---

*FROST is one of the most significant cryptographic advances for practical privacy-preserving multi-party control. As Zcash continues to grow as a platform for private finance, FROST is the foundation that makes shared custody trustworthy without sacrificing the privacy that makes Zcash unique.*
