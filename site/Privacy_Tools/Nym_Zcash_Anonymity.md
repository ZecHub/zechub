<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Mixnet Anonymity for Zcash

> Last verified: October 18, 2026

Zcash shielded pools hide amounts, senders, and receivers on-chain. They do not hide the network path between a wallet and the lightwallet server. Nym's mixnet adds that missing network-layer protection. As of October 2026 the integration is live in production wallets (Zingo, Zkool).

Source: [How Nym adds anonymity to Zcash wallets](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 October 2026).

## What is protected

Nym breaks transaction packets (typically 7–15 KB of spending data and ZK proofs) into Sphinx packets and routes them through the mixnet. This:

- Hides the sender's IP from the lightwallet server
- Blends the traffic with other Nym traffic
- Provides roughly 17 bits of entropy at default settings, with a cited anonymity set above 100,000 users

Payments and price requests in Zingo v7 follow this path by default.

## What is not protected

Chain synchronization, nullifier queries, transaction fetches, and mempool traffic currently use the normal indexer connection. Device-level or application-level metadata outside the mixed packets is also outside Nym's scope.

If your threat model requires hiding sync traffic, combine a native-mixnet wallet with system-level NymVPN. See [Nym VPN](/guides/nym-vpn).

## Wallets

| Wallet | Status | Notes |
| --- | --- | --- |
| Zingo v7 | Live, default | `makers run-cli` bundles `nym-proxy`. Session starts offline; `--online`, `--remember-online`, or `--server` grants consent. |
| Zkool | Live | Native mixnet integration. |
| Others | Via NymVPN | Route the wallet through system-level Mixnet mode. |

Setup details for the wallet-level path are in [Route Zcash Wallet Traffic Over the Nym Mixnet](/guides/nym-mixnet-wallet-setup).

## Tradeoffs

A Nym-routed broadcast is roughly 12.5× slower than clearnet (~3.4 s). Tor is faster (~3.7×) but uses FIFO streams without mixing, so a global adversary can still correlate. Growing the shared Nym user base increases anonymity more effectively than adding extra delay.

## Application-layer hygiene: nym-swizzle-zcash

Network-layer protection is not enough. Even with a perfect mixnet or VPN, a lightwallet server can still link sessions by observing application-layer patterns:

- Resume-point chaining: clients resume sync from exactly `previous end + 1`, so the server can chain sessions by block height alone.
- Sync-then-send: wallets sync immediately before broadcasting, letting the server attribute a transaction to the prior sync session.

The [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate implements a Zcash-specific hygiene policy that addresses both. It packages the general `nym-swizzle` primitives into a chain-aware policy for light clients.

**Quantised sync ranges.** Requests are widened to a network-wide grid with day-sized cells. The start is rounded down and the end rounded up. Ranges are deterministic, ascending, and disjoint. Reorg checks stay inside the widened range so the exact resume point is not revealed. Anonymity comes from collision (many wallets emitting the same boundaries) rather than noise.

**Decoupled broadcasts.** Transaction sends are delayed by an exponential distribution (mean 144 blocks ≈ 3 hours, cap 576 blocks ≈ 12 hours) matching ZIP 318 transfer scheduling. Delays exceed typical process lifetimes, so schedules are persisted. The transaction is built only at fire time against a fresh tip. Sync and broadcast should use different servers.

The crate exposes `BlockSource` and `TxBroadcaster` traits, compiles for `wasm32-unknown-unknown`, and has no network stack of its own. See the [Nym docs](https://nym.com/docs/developers/swizzle/zcash) for the full API and examples.

## Sources

- [How Nym adds anonymity to Zcash wallets](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 October 2026
- [nym-swizzle-zcash: Hygiene Policy for Zcash Light Clients](https://nym.com/docs/developers/swizzle/zcash) — Nym Docs
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Route Zcash Wallet Traffic Over the Nym Mixnet](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
