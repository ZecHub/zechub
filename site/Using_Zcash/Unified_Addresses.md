<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Unified Addresses

> One address for all of Zcash. Share it, and the sender's wallet finds the most private way to pay you.

## TL;DR

* A unified address (UA) is one Zcash address that holds several receivers: Ironwood, Sapling, and transparent.
* Mainnet UAs start with `u1`. ZIP 316 defined them, and they arrived with the NU5 upgrade on May 31, 2022.
* The sender's wallet picks the most private pool that both wallets support. You never choose a pool yourself.
* Your UA kept working when the Ironwood pool went live in July 2026. You did not need to share a new address.
* Your wallet can make a fresh UA for each sender, and all of them pay into the same account.

## Core Explanation

A unified address (UA) is a single Zcash address that bundles several receivers into one. Receivers are the parts of an address that accept funds in a specific value pool: Ironwood, Sapling, and transparent. A UA starts with `u1` on mainnet and was defined in [ZIP 316](https://zips.z.cash/zip-0316), introduced with the NU5 network upgrade on May 31, 2022.

Before unified addresses, receiving ZEC meant thinking about address types. A `zs` address took Sapling funds, a `t` address took transparent funds, and sending between types took extra steps. A UA ends that. You share one address, and the wallets work out the rest.

### How it works

When someone sends to your UA, their wallet reads the receivers inside it and picks the most private pool that both wallets support:

1. If both wallets support the current shielded pool, the payment arrives shielded. Nothing public touches the chain.
2. If the sender can only send from an older pool, the wallet falls back to the best receiver you both share, such as Sapling.
3. If the sender can only send transparent funds, the payment lands in your UA's transparent receiver, and your wallet can shield it from there.

You never manage this yourself. The address stays the same; the routing happens inside it.

### Why it matters now

Zcash keeps upgrading. When the Ironwood pool activated with NU6.3 on July 28, 2026, UA holders didn't need a new address: wallets simply started picking the Ironwood receiver inside the addresses they already had. Users holding older standalone addresses had to migrate. UA holders did nothing.

This is the design goal. New pools arrive with future network upgrades, and a unified address absorbs them without anyone re-sharing addresses or moving funds by hand. See [Zcash value pools](/using-zcash/shielded-pools) for the current pool lineup.

### A fresh address for every sender

Wallets can generate many diversified unified addresses for one account. Each one pays into the same funds, but no two of them can be linked on-chain. Give a different UA to each person or service that pays you, and no pair of them can compare addresses to learn they pay the same wallet.

## Visual / Analogy

Picture a front door with three mail slots. The newest slot drops letters into a locked safe (Ironwood). The second drops them into a locked drawer (Sapling). The third drops them onto an open tray that anyone can read through the window (transparent).

The mail carrier is the sender's wallet. It uses the most private slot it fits through. You give out one address for the door, and when the house gets a new safe, the address on the door stays the same.

## Deep Dive

### Related tools

- **Viewing keys.** Every account has unified viewing keys that share what a UA receives (or everything it sends) without sharing spend authority. Prefixes `uview` and `uivk`. See [viewing keys](/zcash-tech/viewing-keys).
- **TEX addresses.** Some exchanges, currently Binance, require deposits to arrive from a transparent source. A TEX address ([ZIP 320](https://zips.z.cash/zip-0320)) is a transparent-only companion to your UA for exactly that case. See [transparent exchange addresses](/using-zcash/transparent-exchange-addresses).
- **Payment requests.** A UA can be embedded in a payment request URI with an amount and memo prefilled. See [payment request URIs](/using-zcash/payment-request-uris).

### Quick facts

| | |
|---|---|
| Prefix | `u1` (mainnet) |
| Encoding | bech32m |
| Defined in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduced | NU5, May 31, 2022 |
| Contains | Ironwood, Sapling, and transparent receivers |
| Spending key | One per account, shared by all of its UAs |

Check which wallets support unified addresses on the [wallets](/wallets) page.

## Common Mistakes

- **Sharing an old `zs` or `t` address.** A standalone address only reaches one pool and does not pick up new ones. Share your UA.
- **Giving the same UA to everyone.** Two people who pay you can compare notes and see the same address. Give each sender a fresh UA from your wallet.
- **Expecting every payment to a UA to be private.** A sender who can only send transparent funds pays into your transparent receiver, and that payment is public. Shield it from your wallet afterwards.

## Related Pages

- [Shielded Pools](/using-zcash/shielded-pools): the value pools behind each receiver in a UA.
- [Unified Addresses (technical)](/zcash-tech/unified-addresses): how ZIP 316 builds and encodes a UA.
- [Viewing Keys](/zcash-tech/viewing-keys): share what a UA receives without sharing spend authority.
- [Transparent Exchange Addresses](/using-zcash/transparent-exchange-addresses): the TEX format for exchanges that need a transparent source.
- [Payment Request URIs](/using-zcash/payment-request-uris): a UA with the amount and memo filled in.
- [Wallets](/using-zcash/wallets): which wallets create and pay unified addresses.
- [Non-Custodial Exchanges](/using-zcash/non-custodial-exchanges): what to check when a swap pays ZEC into your wallet.
- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment): what stays visible when a payment uses each receiver.

**Last updated:** October 2026
