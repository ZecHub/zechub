# Detecting shielded payments: what scanning costs

A business that accepts shielded ZEC has to find its incoming payments. On the transparent pool that is an index lookup. On the shielded pools nobody can index payments by address, so the wallet or backend has to test every shielded output on the chain with its own keys. This page explains how that works, what it costs, and how to choose an account design that keeps the cost under control.

## TL;DR

* Shielded detection cost grows with the number of **viewing keys** you watch, not the number of addresses you hand out
* One account can issue a fresh, unlinkable **diversified address** for every customer or invoice at no extra scanning cost
* A viewing key shows its **whole account**. If an auditor must see one customer only, that customer needs their own account, and every account adds scanning work on every block
* Size a scanner for **full blocks**, not the average. Mainnet already produces runs of near-full blocks
* Measure the cost per trial on your own hardware before you size anything

## Why shielded payments can't be indexed

With transparent addresses, a node can read the address on every output and build an index from address to outputs. Zebra exposes this through `getaddressutxos` and `getaddresstxids`.

A shielded action has no readable address. It carries a note commitment, an ephemeral public key and an encrypted note. Nothing in those bytes says who the payment is for, so neither the node nor an [indexer](Lightwallet_Nodes.md) can build an address index.

Discovery therefore works the other way round. The wallet takes each shielded output and asks "is this mine?" by trying to decrypt it. This is called **trial decryption**. [Viewing keys](Viewing_Keys.md) explains what the keys reveal, and [Zcash wallet syncing](Zcash_Wallet_Syncing.md) covers how wallets schedule the work.

## How one trial works

For the Orchard-protocol action format, which both the Orchard and Ironwood pools use:

1. **Key agreement:** multiply the action's ephemeral public key by your incoming viewing key. This is a scalar multiplication on the Pallas curve, and it is most of the cost
2. **Key derivation:** hash the shared secret into a symmetric key
3. **Decrypt the first 52 bytes** of the note: the diversifier, the value and `rseed`
4. **Rebuild the note commitment** from what you decrypted
5. **Compare** it with the action's `cmx`. A match means the note is yours

You only learn whether the note is yours at step 5, so **a miss costs about the same as a hit**. Almost every action on the chain belongs to someone else, so nearly all of the work is misses.

## The cost formula

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

There is no term for addresses. Wallets try both the external key (addresses you give out) and the internal key (change), which is why `I = 2`. You can see this in the `for scope in [Scope::External, Scope::Internal]` loops in librustzcash's `zcash_client_backend/src/scanning.rs`.

[ZIP 218](https://zips.z.cash/zip-0218) caps shielded actions at **330 per block**, so `A` is at most 330.

## Diversified addresses: many addresses, one key

An Orchard-protocol address is a diversifier `d` (11 bytes) plus a transmission key derived from the same incoming viewing key. [ZIP 32](https://zips.z.cash/zip-0032) derives each diversifier from an 88-bit index with FF1 encryption, so one account has **2^88 addresses**, and every one is valid for the Orchard protocol.

This gives a payments backend two useful properties:

* **The addresses are unlinkable.** Without the viewing key, two diversified addresses from one account look like they belong to two different wallets
* **Payments map back to invoices with no lookup table.** When a trial decryption succeeds, the decrypted note contains `d`. The account's diversifier key decrypts `d` back to its index, so if the index is your invoice number, you know which invoice was paid

Wrap each address in a [unified address](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) before showing it to a customer.

## The catch: a viewing key shows the whole account

You cannot cut a viewing key down to one diversified address, because every address in the account uses the same key. So the account is also the unit of disclosure. Anyone who gets an account's viewing key sees every payment to every address in it.

That makes three things one decision:

| Design | Scanning cost | What an auditor can be shown |
|:--|:--|:--|
| One account, a diversified address per customer | One key, whatever the number of customers | Everything or nothing |
| One account per customer | One key per customer, on every block | One customer at a time |
| One account per customer and period | One key per customer and period | One customer for one period |

Choose the account design up front. Splitting an account later means moving its funds into new accounts, which costs fees and creates a visible pattern.

## What it costs in practice

These figures are from one laptop core (Apple M3 Pro, release build), using `try_compact_note_decryption` from `zcash_note_encryption` 0.5.1 on real Ironwood actions from testnet:

| Measurement | Value |
|:--|:--|
| One trial, one key at a time | about 82 µs |
| One trial, batched across 10 or 100 keys | about 42 µs |

Batching roughly halves the cost, and librustzcash's scanner batches for the same reason.

With `t = 42 µs` and full blocks of 330 actions:

| Accounts watched | Core time per full block | Cores needed to keep up with full blocks |
|:--|:--|:--|
| 1 | 28 ms | 0.001 |
| 1,000,000 (one per customer) | 7.7 hours | about 1,109 |

The same million customers as diversified addresses on one account cost 28 ms per full block. The only difference is where the account boundary sits.

## Size for bursts, not averages

Across the 5,000 mainnet blocks up to height 3,582,677 (sampled on 17 November 2026):

* 62% of blocks had no shielded outputs, and the median was zero
* The average was 12.3 shielded outputs per block
* 153 blocks between heights 3,579,935 and 3,580,346, about three hours of chain, each had more than 250 outputs, often back to back. They held 75% of all the outputs in the sample

A scanner sized for the average falls behind during a run like that. Leave headroom (for example, plan to use half of each block's 25-second interval) and size for the cap.

## Compact blocks help with bandwidth, not with trial count

Light wallets scan compact blocks from a lightwallet server. A compact action is 148 bytes against 820 for the full action. It keeps only what a trial needs: the ephemeral key, the first 52 bytes of the ciphertext, the nullifier and `cmx`. Transparent data is only sent if the client asks for it.

Compact blocks cut download size. They don't reduce the number of trials, because every action still has to be tried with every key.

## Checklist for a payments backend

* Decide who will ever need to see what before you create accounts
* Issue a diversified address per invoice from one account wherever disclosure allows
* Measure `t` on your own hardware with batching on
* Size tip scanning for 330 actions per block, with headroom
* Split rescans by height range across workers. History is fixed, so this parallelizes cleanly
* Remember every new account also has to be scanned back to its birthday height

## Learn more

* [ZIP 218: 25-second block target spacing](https://zips.z.cash/zip-0218), including the per-block action limits
* [ZIP 32: shielded hierarchical deterministic wallets](https://zips.z.cash/zip-0032)
* [ZIP 316: unified addresses and unified viewing keys](https://zips.z.cash/zip-0316)
* [Lightwallet protocol: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): `zcash_client_backend` scanning and `zcash_note_encryption`
* [One viewing key, a million customers](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): the full measurements, with lab code to reproduce them
