<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Address_Types.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Address Types Explained

## Introduction

A Zcash address is more than a destination for funds. Its format tells you which part of the protocol the address belongs to, what privacy guarantees a payment to it will carry, and which wallet features are required to spend from it. Because Zcash supports both transparent and shielded value pools — and now bundles multiple receivers into a single string — newcomers often encounter three distinct address formats and are left wondering which one to use.

This article explains the three address families in current use: **transparent addresses (t-addresses)**, **shielded addresses (z-addresses)**, and **Unified Addresses (UAs)**. It describes how each is constructed, how to recognize one on sight, what privacy properties a transaction to that address provides, and how to choose the right format in practice.

---

## 1. Transparent Addresses (t-addresses)

Transparent addresses are the legacy format inherited from Bitcoin. Zcash began as a fork of the Bitcoin codebase, and its transparent layer behaves almost identically to Bitcoin's: it uses the same UTXO (unspent transaction output) model, the same scripting system, and the same Base58Check encoding.

### Structure and prefixes

A transparent address encodes a script hash, prefixed with a network-specific version byte. On mainnet:

- **`t1...`** — a P2PKH (pay-to-public-key-hash) address, used for single-signature wallets. This is the most common transparent format.
- **`t3...`** — a P2SH (pay-to-script-hash) address, used for multisig or other scripted spending conditions.

On testnet the corresponding prefixes are `tm` (P2PKH) and `t2` (P2SH).

### Privacy guarantees

Transparent addresses provide **no transaction privacy**. Every transaction involving a t-address is recorded in plaintext on the public blockchain:

- The sender's address is visible.
- The receiver's address is visible.
- The transferred amount is visible.
- The full transaction graph — who paid whom, and when — is reconstructable by anyone running a block explorer.

In privacy terms, a t-address is equivalent to a Bitcoin address. Funds held in transparent addresses are fully auditable and fully linkable.

### When transparent addresses are used

Despite their lack of privacy, t-addresses remain relevant for two reasons:

1. **Compatibility.** Many exchanges, payment processors, and legacy services support only transparent Zcash. Deposits and withdrawals on these platforms typically use t-addresses.
2. **Coinbase outputs.** Block rewards and mining payouts are created as transparent coinbase outputs. These must be shielded (moved into the shielded pool) before they can be spent in a shielded transaction, a process enforced by the protocol since the Sapling upgrade.

---

## 2. Shielded Addresses (z-addresses)

Shielded addresses belong to Zcash's private value pools. A payment between two shielded addresses hides the sender, the receiver, and the amount behind a zk-SNARK proof. Observers see only that a valid shielded transaction was included in a block.

Zcash has had two shielded protocols, each with its own address format.

### Sapling addresses

Introduced with the Sapling network upgrade in 2018, Sapling addresses were the first practical shielded format. They are encoded with Bech32 and use the human-readable prefix `zs` on mainnet:

- **`zs1...`** — a Sapling payment address on mainnet.
- **`ztestsapling1...`** — the corresponding testnet prefix.

A Sapling address encodes a diversified payment address consisting of a diversifier and a diversified transmission key. The diversifier allows a single wallet to generate many unlinkable addresses from one spending key, so that payments to different recipients cannot be linked to the same wallet by address reuse.

Sapling transactions use a trusted-setup zk-SNARK (the Sapling MPC). The proving system is efficient, but it carries the residual assumption that the setup ceremony's randomness was destroyed.

### Orchard addresses

The Orchard protocol, activated with the NU5 upgrade in 2022, is the current generation of shielded technology. It uses the Halo 2 proving system, which requires **no trusted setup** — the parameters are generated deterministically, removing the last trust assumption from Zcash's cryptography.

Orchard does not have a standalone user-facing address format. Instead, Orchard receivers are distributed inside **Unified Addresses** (see below). There is no `zo1...` string you would copy and paste on its own; an Orchard receiver only appears as a component of a UA.

### Privacy guarantees

A transaction that stays entirely within the shielded pool (z-to-z) provides the strongest privacy Zcash offers:

- Sender address: hidden.
- Receiver address: hidden.
- Amount: hidden.
- Transaction graph: hidden.

What remains public is minimal: the transaction's existence, its hash, the validity proof, and (in fully shielded transactions) the fee.

Privacy degrades when a transaction crosses pool boundaries. A **shielding** transaction (t-to-z) reveals the transparent input; a **deshielding** transaction (z-to-t) reveals the transparent output. For full privacy, both ends of a payment should be shielded.

---

## 3. Unified Addresses (UAs)

Managing separate address formats for each protocol created a poor user experience. A sender had to know whether the recipient wanted a transparent, Sapling, or Orchard payment and then select the matching string. **Unified Addresses**, specified in ZIP 316, solve this by packaging multiple receivers into a single, self-describing address.

### Structure and prefixes

A Unified Address is encoded with Bech32m and, on mainnet, begins with:

- **`u1...`** — a Unified Address on mainnet.
- **`utest1...`** — the corresponding testnet prefix.

Internally, a UA is a container of **receivers**, each tagged with a type identifier. A typical UA includes:

- An **Orchard receiver** (required in modern wallets).
- Optionally, a **Sapling receiver**, for compatibility with wallets that predate Orchard.
- Optionally, a **transparent receiver** (a P2PKH or P2SH script), for compatibility with services that support only transparent Zcash.

The receivers are derived from a single Unified Spending Key, so one seed controls all of them. The address also embeds a checksum that detects transcription errors and prevents a UA from being validly decoded on the wrong network.

### How sending works

When a wallet sends to a UA, it inspects the contained receivers and selects the best one it can support, following a preference order defined by the protocol: Orchard first, then Sapling, then transparent. The sender does not choose the pool; the wallet negotiates the strongest mutually supported privacy level automatically.

This means a single UA works for every counterparty: a modern wallet pays shielded, while an older or transparent-only service still finds a receiver it can use.

### Privacy guarantees

A UA itself does not change the privacy of a transaction — the privacy depends on which receiver the wallet selects. If both wallets support Orchard, the payment is fully shielded. If the sender's wallet falls back to the transparent receiver, the payment is public.

The practical effect of UAs is to make the **shielded path the default**, reducing the chance that a user accidentally sends a transparent payment when a private one was available.

---

## 4. Comparison Table

| Property | Transparent (t-address) | Sapling (z-address) | Unified Address (UA) |
|---|---|---|---|
| Mainnet prefix | `t1` (P2PKH), `t3` (P2SH) | `zs1` | `u1` |
| Testnet prefix | `tm`, `t2` | `ztestsapling1` | `utest1` |
| Encoding | Base58Check | Bech32 | Bech32m |
| Value pool | Transparent | Sapling shielded pool | Orchard (and/or Sapling, transparent) |
| Sender visible on-chain | Yes | No | No (if shielded receiver used) |
| Receiver visible on-chain | Yes | No | No (if shielded receiver used) |
| Amount visible on-chain | Yes | No | No (if shielded receiver used) |
| Trusted setup required | N/A | Yes (Sapling MPC) | No (Orchard uses Halo 2) |
| Recommended for new wallets | No | Legacy only | Yes |
| Exchange compatibility | High | Limited | Growing |

---

## 5. Practical Guidance: Which Address Should You Use?

**For receiving payments, share a Unified Address.** A UA is the current standard. It lets every sender reach you with the best privacy their wallet supports, and it future-proofs you against further protocol upgrades. Generate UAs from any modern wallet (Ywallet, Edge, Unstoppable, Nighthawk, Zecwallet, or the `zec-cli` / `zebrad` tooling).

**For sending, prefer the recipient's UA.** If the recipient gives you a `u1...` address, paste it directly and let your wallet select the receiver. You will get a fully shielded payment whenever both sides support it.

**If you only have a Sapling address (`zs1...`), it still works.** A payment to a Sapling address is fully shielded. It simply uses the older proving system rather than Orchard.

**Use transparent addresses only when forced to.** Exchanges and some services still require t-addresses for deposits. Treat these as compatibility endpoints, not as storage. When you receive ZEC at a t-address, shield it (move it to a UA) as soon as practical, because every transparent transaction is permanently linkable on the public ledger.

**Avoid deshielding unless necessary.** Sending from a shielded address to a t-address reveals the output amount and destination, and can link your shielded activity to a transparent identity. If you must cash out through an exchange, be aware that the transparent deposit creates a public record.

**Mind the network.** Mainnet and testnet prefixes differ precisely so that a testnet address is never accidentally used on mainnet. Always confirm the prefix matches the network you intend to use.

---

## 6. Summary

Zcash address types map directly onto its privacy architecture. Transparent addresses (`t1`, `t3`) are Bitcoin-compatible and fully public. Sapling addresses (`zs1`) are the legacy shielded format, hiding sender, receiver, and amount behind a trusted-setup proof. Unified Addresses (`u1`) are the modern standard: a single string that carries Orchard, Sapling, and transparent receivers together, letting wallets automatically negotiate the strongest available privacy.

The rule of thumb is simple: generate and share Unified Addresses, send to UAs whenever possible, and treat transparent addresses as a compatibility fallback rather than a default.

---

## Further Reading

- [ZIP 316: Unified Addresses](https://zips.z.cash/zip-0316)
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [Orchard Book: Halo 2 and the Orchard Protocol](https://zcash.github.io/orchard/)
- [Electric Coin Company: Unified Addresses Explained](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/)
- [Zcash Foundation: What Are zk-SNARKs?](https://z.cash/technology/zksnarks/)
