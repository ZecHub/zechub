<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Unified Addresses

> One address for all of Zcash. Share it, and the sender's wallet finds the most private way to pay you.

A unified address (UA) is a single Zcash address that bundles several receivers into one. Receivers are the parts of an address that accept funds in a specific value pool: Ironwood, Sapling, and transparent. A UA starts with `u1` on mainnet and was defined in [ZIP 316](https://zips.z.cash/zip-0316), introduced with the NU5 network upgrade on May 31, 2022.

Before unified addresses, receiving ZEC meant thinking about address types. A `zs` address took Sapling funds, a `t` address took transparent funds, and sending between types took extra steps. A UA ends that. You share one address, and the wallets work out the rest.

## How it works

When someone sends to your UA, their wallet reads the receivers inside it and picks the most private pool that both wallets support:

1. If both wallets support the current shielded pool, the payment arrives shielded. Nothing public touches the chain.
2. If the sender can only send from an older pool, the wallet falls back to the best receiver you both share, such as Sapling.
3. If the sender can only send transparent funds, the payment lands in your UA's transparent receiver, and your wallet can shield it from there.

You never manage this yourself. The address stays the same; the routing happens inside it.

## Why it matters now

Zcash keeps upgrading. When the Ironwood pool activated with NU6.3 on July 28, 2026, UA holders did not need a new address: wallets simply started picking the Ironwood receiver inside the addresses people already had. Users holding older standalone addresses had to migrate. UA holders did nothing.

This is the design goal. New pools arrive with future network upgrades, and a unified address absorbs them without anyone re-sharing addresses or moving funds by hand. See [Zcash value pools](/using-zcash/shielded-pools) for the current pool lineup.

## A fresh address for every sender

Wallets can generate many diversified unified addresses for one account. Each one pays into the same funds, but no two of them can be linked on-chain. Give a different UA to each person or service that pays you, and no pair of them can compare addresses to learn they pay the same wallet.

## Related tools

- **Viewing keys.** Every account has unified viewing keys that share what a UA receives (or everything it sends) without sharing spend authority. Prefixes `uview` and `uivk`. See [viewing keys](/zcash-tech/viewing-keys).
- **TEX addresses.** Some exchanges, currently Binance, require deposits to arrive from a transparent source. A TEX address ([ZIP 320](https://zips.z.cash/zip-0320)) is a transparent-only companion to your UA for exactly that case. See [transparent exchange addresses](/using-zcash/transparent-exchange-addresses).
- **Payment requests.** A UA can be embedded in a payment request URI with an amount and memo prefilled. See [payment request URIs](/using-zcash/payment-request-uris).

## Quick facts

| | |
|---|---|
| Prefix | `u1` (mainnet) |
| Encoding | bech32m |
| Defined in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduced | NU5, May 31, 2022 |
| Contains | Ironwood, Sapling, and transparent receivers |
| Spending key | One per account, shared by all of its UAs |

Check which wallets support unified addresses on the [wallets](/wallets) page.
