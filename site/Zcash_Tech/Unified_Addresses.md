<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Unified Addresses

> Unified addresses (ZIP 316) bundle multiple payment receivers into a single, shareable address. They are the standard way to send and receive Zcash since NU5.

What you'll take away: how unified addresses work, why they exist, and how to use them safely.

Unified addresses replaced the old model where each shielded pool had its own address format. Instead of juggling a transparent address, a Sapling address, and an Orchard address separately, a unified address packs the receivers you need into one string. Your wallet picks the best receiver for the transaction and ignores the rest. This means you can share one address everywhere, and it still works whether the sender uses transparent, Sapling, or Orchard transactions.

Why this matters. Before unified addresses, a user who wanted both transparent and shielded payments needed to publish two different addresses. Merchants had to decide which address to give customers. Exchanges only supported transparent addresses. The result was a fragmented ecosystem where most ZEC moved in the open. Unified addresses solved this by making privacy the default: one address, all receivers, automatic selection.

New to Zcash? Start with [What is ZEC and Zcash](../start-here/what-is-zec-and-zcash), then come back here.

## How a unified address is built

A unified address is a [F4Jumble](https://zips.z.cash/zip-0316#jumbling)-encoded string that bundles together one or more **receivers**. Each receiver is a typed chunk that tells a wallet how to pay to that specific pool.

| Receiver type | Type code | What it does |
|---|---|---|
| P2PKH (transparent) | 0x00 | Pays to a transparent t-address |
| P2SH (transparent) | 0x01 | Pays to a shielded script hash |
| Sapling | 0x02 | Pays to a Sapling z-address |
| Orchard | 0x03 | Pays to an Orchard address |

The human-readable prefix is `u1` on mainnet and `utest` on testnet. A full unified address looks like this:

```
u1cdttgm25ad8uzw553rlm0sjkmch4xsqvj3z0d25c28s2z04dk7t5un77zg650r4l46c7l84z780jjcl
```

That long string is not random. It encodes the receivers you chose, scrambled by F4Jumble to prevent anyone from modifying the address without breaking it.

## Why F4Jumble matters

Standard Bech32m encoding (used by Bitcoin and older Zcash addresses) does not protect against address manipulation. An attacker who intercepts a Bech32m address could rearrange or truncate the receivers without the sender noticing. F4Jumble fixes this by scrambling the receiver list in a way that produces an invalid encoding if any byte changes. The result is a tamper-evident address: if someone modifies it, the wallet rejects it.

F4Jumble is described in [ZIP 316](https://zips.z.cash/zip-0316#jumbling) and implemented in the zcash_client_backend library. You do not need to understand the math to use unified addresses, but knowing it exists helps when troubleshooting parsing errors in your own code.

## Receiver selection

When you send ZEC to a unified address, your wallet picks the best receiver for the transaction type:

| If the wallet supports... | It pays to... |
|---|---|
| Orchard | The Orchard receiver (preferred) |
| Sapling | The Sapling receiver |
| Transparent | The transparent receiver |

Orchard is the recommended default. If the sender's wallet supports Orchard, it uses that receiver. If not, it falls back to Sapling, then transparent. This automatic fallback is what makes unified addresses work across the ecosystem without requiring every wallet to support every pool.

## Unified viewing keys

ZIP 316 also defines **unified viewing keys** (UVKs). A unified viewing key bundles a Sapling viewing key and an Orchard viewing key into one string, just like a unified address bundles receivers. This lets a light wallet scan the blockchain for incoming transactions across both pools without maintaining separate key material for each.

A unified viewing key starts with `uvk` on mainnet. Light wallets like [Zashi](https://electriccoin.co/zashi) and [Ywallet](https://ywallet.app/) use unified viewing keys to scan for transactions without holding the spending key.

## What changed in Ironwood

Ironwood (July 2026) made Orchard the only active shielded pool. Sapling notes can still be spent, but no new Sapling notes are created. This simplified unified addresses in practice:

- New addresses include Orchard and optionally transparent receivers.
- Sapling receivers are still valid but increasingly uncommon in new addresses.
- Wallets that only support Orchard can ignore the Sapling and transparent receivers.

The unified address format itself did not change. Old addresses with Sapling receivers still work. The difference is that Orchard is now the default and only new shielded pool.

## Common gotchas

**Address reuse.** Unified addresses are designed to be reusable. Each address contains a diversifier that lets the wallet generate unique shielded note commitments even when the same address appears in multiple transactions. This is a privacy improvement over older designs where reuse leaked information.

**Transparent receivers.** Including a transparent receiver in a unified address does not reduce privacy. The wallet pays to the best available shielded receiver. The transparent receiver is there as a fallback for senders who only support transparent transactions.

**Parsing errors.** If your code rejects a unified address, check that you are using F4Jumble decoding, not raw Bech32m. The `zcash_client_backend` Rust crate and the `@aarcansolutions/ua-parser` npm package both implement ZIP 316 parsing correctly.

**Testnet addresses.** Testnet unified addresses use the `utest` prefix instead of `u1`. Make sure your code handles both prefixes.

## FAQ

**Can I still use my old z-address?** Yes. Existing Sapling z-addresses are valid receivers inside a unified address. Your wallet can still send to them directly, and they work with unified addresses that include a Sapling receiver.

**Do merchants need to change anything?** If a merchant currently uses a transparent address, they can switch to a unified address with an Orchard receiver. Most modern wallets will automatically pay to the Orchard receiver. The merchant's wallet handles the rest.

**What if the sender only supports transparent transactions?** The sender's wallet uses the transparent receiver in the unified address. The payment goes through as a transparent transaction. Privacy depends on what the receiver does with the funds afterward.

**Are unified addresses backward compatible?** Yes. Old transparent and Sapling addresses still work. Unified addresses are an addition, not a replacement. Wallets that do not understand unified addresses simply cannot send to them, but wallets that do can send to old addresses.

## Test your understanding

1. What does F4Jumble protect against?
2. What is the human-readable prefix for a mainnet unified address?
3. If a wallet supports Orchard but not Sapling, which receiver does it use in a unified address with both?
4. What is a unified viewing key, and why does a light wallet need one?

<details>
<summary>Answers</summary>

1. F4Jumble prevents address tampering. If anyone modifies the encoded bytes, the address becomes invalid and the wallet rejects it.
2. `u1`
3. The Orchard receiver. The wallet uses the best receiver it supports, skipping any receivers it does not understand.
4. A unified viewing key bundles a Sapling viewing key and an Orchard viewing key into one string. A light wallet uses it to scan for incoming transactions across both shielded pools without holding the spending key.

</details>

## Further reading

- [ZIP 316: Unified Addresses, Unified Viewing Keys, and Unified Payment Requests](https://zips.z.cash/zip-0316)
- [Visualizing Zcash Addresses](../guides/visualizing-zcash-addresses) for visual examples
- [Shielded Pools](../using-zcash/shielded-pools) to understand the pools inside a unified address
- [Viewing Keys](../zcash-tech/viewing-keys) for more on key types
