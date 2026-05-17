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

## Why FROST is Different from Traditional Multisig

Most people are familiar with multisig from Bitcoin — where a transaction can require M-of-N signatures. This works, but it has a significant drawback: **it's visible on-chain**.

When a 2-of-3 Bitcoin multisig transaction is broadcast, anyone looking at the blockchain can see that it was a multisig transaction, how many signatures were required, and the public keys of all potential signers. This leaks information about who controls the funds.

| Feature | Traditional Multisig | FROST |
|---|---|---|
| On-chain signature count | M separate signatures | 1 combined signature |
| Reveals spending policy? | Yes (e.g., "2-of-3") | No |
| Key size overhead | Linear in M | Constant |
| Compatible with privacy? | Limited | Yes |
| Requires all rounds live? | Usually | No — can abort misbehaving participants |

FROST produces a **single Schnorr signature** from the group. An observer cannot tell whether the transaction was signed by one person or ten. The internal structure — how many participants, what the threshold is — stays private.

---

## How FROST Works (Simply Explained)

You don't need to understand the cryptography to understand the concept.

**Step 1: Key Setup (Distributed Key Generation)**

The group runs a setup protocol. At the end:
- Each participant holds a *private key share* (only they see it).
- Everyone knows the *group public key* (this is what verifies signatures).
- The complete private key never exists in one place — it's split before it's ever assembled.

**Step 2: Signing (Threshold Signing)**

When the group wants to sign something:
1. The required threshold of participants each compute a *partial signature* using their private share.
2. These partial signatures are combined into one final Schnorr signature.
3. This single signature is broadcast — it verifies against the group public key exactly like a normal signature.

If a participant misbehaves or goes offline, FROST can identify them and abort, then retry with different participants (as long as the threshold can still be met).

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
