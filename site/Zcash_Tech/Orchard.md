<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Orchard.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Orchard

> Orchard is the shielded payment protocol that NU5 introduced on May 31, 2022. It was Zcash's primary shielded pool until Ironwood replaced it in July 2026.

What you'll take away: how Orchard works, why it mattered for Zcash, and what happened to it after Ironwood.

Orchard is a [shielded pool](../using-zcash/shielded-pools) defined in [ZIP 224](https://zips.z.cash/zip-0224). It was the first Zcash pool built on the [Halo 2](../zcash-tech/halo) proving system, which needs no trusted setup ceremony. Orchard hid the sender, receiver, and amount of every transaction, just like [Sapling](../zcash-tech/sapling) before it, but with stronger foundations and room for future scaling.

Why this matters. Zcash's earlier pools, [Sprout](../zcash-tech/sprout) and Sapling, each required a one-time trusted setup ceremony. If even one participant in that ceremony kept their secret share, they could have forged ZEC without anyone knowing. Orchard removed that assumption entirely. It also introduced action-based transactions, a new note structure, and support for [unified addresses](../start-here/what-is-zec-and-zcash), making it the foundation for Zcash's modern transaction format.

New to Zcash? Start with [What is ZEC and Zcash](../start-here/what-is-zec-and-zcash) and [Shielded Pools](../using-zcash/shielded-pools), then come back here.

## How Orchard works

Orchard transactions use a structure called **action descriptions**. Each action describes one step in a transaction: spending an old note and creating a new one. A single Orchard transaction can bundle many actions, and each action carries its own proof.

This is different from Sapling, which split transactions into separate spends and outputs. Orchard's action structure is more flexible and more efficient for multi-party or multi-step transactions.

An Orchard action contains:

| Field | What it does |
|---|---|
| Nullifier | Marks the old note as spent, without revealing which note it was |
| Spend authority | A proof that the spender controls the note |
| New note | The encrypted output that the receiver gets |
| Note commitment | A binding commitment to the new note's contents |
| Merkle path | Proof that the spent note existed in the commitment tree |

Every action produces a zero-knowledge proof that the transaction is valid without revealing any of the private data. The proofs are verified against Orchard's verifying key, which is fixed in the consensus rules.

## The Halo 2 proving system

Orchard runs on [Halo 2](../zcash-tech/halo), a proving system that uses **PLONKish arithmetization** on the **Pallas and Vesta curve cycle**. This is a technical way of saying that the math behind Orchard's proofs is built on a pair of elliptic curves that work together efficiently.

What this means in practice:

- **No trusted setup.** Halo 2 generates its parameters from public randomness, so there is no secret ceremony to trust.
- **Recursive proofs.** The Pallas/Vesta curve cycle supports proof recursion, where one proof can verify another. This is groundwork for scaling Zcash's transaction throughput in the future.
- **Smaller proving keys.** Halo 2's proving keys are structured differently from Sapling's, which affects how wallets generate and verify proofs.

The trusted setup requirement was the main criticism of Zcash's earlier pools. Orchard addressed it directly. Anyone holding ZEC in the Orchard pool never had to trust that a ceremony was conducted honestly.

## Orchard notes

Each Orchard note records:

- **Diversified transmission key.** A public key derived from the receiver's address that lets the sender encrypt the note to the right recipient.
- **Value.** The amount of ZEC in the note, encrypted so only the receiver can read it.
- **Asset type.** A field reserved for future use with [Zcash Shielded Assets](../zcash-tech/zcash-shielded-assets).
- **Rseed.** A random seed used to derive the note's nullifier and other cryptographic material.
- **Memo.** An encrypted 512-byte field that the sender can use for any purpose, such as a payment reference or a short message.

Notes are committed to a Merkle tree called the **Orchard commitment tree**. When you spend a note, you prove that your note exists in this tree without revealing which note is yours. This is how Orchard hides the link between sender and receiver.

## Orchard and unified addresses

Orchard was the first pool to use [unified addresses](../start-here/what-is-zec-and-zcash) (ZIP 316). A unified address can bundle receivers for multiple pools — transparent, Sapling, and Orchard — so the sender's wallet picks the best one it supports.

Before Orchard, each pool had its own address type. You had to hand out the right kind of address for each situation. Unified addresses simplified this. A single address works for any sender, and the receiver's wallet automatically detects which pool the funds arrived in.

## Orchard vs Sapling

| Feature | Sapling | Orchard |
|---|---|---|
| Proving system | Groth16 | Halo 2 |
| Trusted setup | Yes (Powers of Tau) | No |
| Curve | BLS12-381 / Jubjub | Pallas / Vesta |
| Transaction structure | Separate spends and outputs | Action descriptions |
| Address format | Sapling addresses | Unified addresses |
| Recursive proofs | No | Yes (curve cycle supports it) |
| Nullifier key | Derived from spending key | Derived from spending key |
| Note encryption | Sapling note encryption | Orchard note encryption |

Orchard improved on Sapling in several ways, but the most important change was removing the trusted setup. Sapling's setup was well-conducted and has not been shown to be compromised, but the requirement itself was a trust assumption. Orchard eliminated it.

## Orchard after Ironwood

On July 28, 2026, the [Ironwood](../zcash-tech/ironwood) network upgrade (NU6.3) activated at block 3,428,143. Ironwood introduced a new shielded pool and made the Orchard pool **spend-only**.

This means:

- You can still spend ZEC held in the Orchard pool.
- You cannot shield new ZEC into the Orchard pool.
- All newly shielded value goes to the Ironwood pool instead.
- Over time, funds migrate from Orchard to Ironwood through a [turnstile](../zcash-tech/the-turnstile) checkpoint.

The reason for this change was a soundness bug found in Orchard's circuit in May 2026. The bug was in an elliptic-curve component of the Halo 2 circuit, not in the proving system itself. NU6.2 fixed the circuit, and Ironwood created a clean pool built on the corrected code. There is no evidence the bug was ever exploited.

If you hold ZEC in the Orchard pool, your funds are safe. Your wallet will handle the migration automatically over time. The Orchard pool will continue to exist as long as it holds value, but it is no longer the active shielded pool.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Shielded pool | The set of funds whose amounts and owners are hidden by zero-knowledge cryptography |
| Action description | The structure Orchard uses to bundle spending an old note and creating a new one in one step |
| Halo 2 | The proving system behind Orchard that needs no trusted setup |
| PLONKish arithmetization | A way of encoding computation for zero-knowledge proofs that Halo 2 uses |
| Pallas / Vesta | The pair of elliptic curves that Halo 2 is built on |
| Nullifier | A value that marks a note as spent without revealing which note it was |
| Merkle tree | A data structure that lets you prove membership without revealing which member you are |
| Spend-only | A pool you can spend from, but cannot add new value to |
| Turnstile | A public checkpoint that counts value moving between pools so the supply stays auditable |

## FAQ

Is Orchard still active? Orchard is spend-only. You can move funds out of it, but new ZEC cannot be shielded into it. The Ironwood pool replaced Orchard as the active shielded pool in July 2026.

Do I need to move my funds? Your wallet handles this automatically. Over time, your ZEC will migrate from Orchard to Ironwood through the turnstile. You do not need to take manual action, but keeping your wallet updated ensures the migration happens smoothly.

Is my privacy affected? No. Moving from Orchard to Ironwood does not reveal anything about your transaction history. The migration uses small, uniform transactions that do not link to your identity.

What happened to the trusted setup? Orchard was the first Zcash pool that did not need one. Halo 2 generates its parameters from public randomness, so there is no ceremony to trust. Ironwood inherits this property.

Can I still receive ZEC in an Orchard address? Wallets that support unified addresses will automatically direct incoming funds to the Ironwood pool. If someone sends to an older Orchard-only address, the funds will still arrive, but they will sit in the Orchard pool until migrated.

## Test your understanding

Orchard was the first Zcash pool with no trusted setup. What proving system made that possible, and why does it matter?

<details>
<summary>Answer</summary>

Orchard uses the Halo 2 proving system, which generates its parameters from public randomness instead of a ceremony. This removes the trust assumption that at least one ceremony participant honestly destroyed their secret share. Without that assumption, there is no risk that leftover parameters could be used to forge ZEC.

</details>

What is the difference between an Orchard action and a Sapling spend + output pair?

<details>
<summary>Answer</summary>

Sapling transactions have separate spend descriptions and output descriptions. Each spend proves you own a note and each output creates a new note, but they are distinct fields. Orchard combines both into a single action description. One action spends an old note and creates a new one at the same time. This is more flexible for transactions with many steps and is more efficient to verify.

</details>
