<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> NU7 activated on Zcash Mainnet at block 3,543,405 on November 6, 2026 (02:34 UTC; the evening of November 5 in US time zones), and has been live since.

What you'll take away: what NU7 changed (faster blocks, shielded action limits, fee recycling, the end of version 4 transactions), what it left alone, and what node operators, wallets, exchanges and miners had to do.

NU7 is a Zcash [network upgrade](../start-here/network-upgrades), deployed by [ZIP 259](https://zips.z.cash/zip-0259). It cut the time between blocks from 75 seconds to 25 seconds, capped how many shielded actions fit in one block, started removing 60% of transaction fees from circulation so they can be reissued to future miners, and made version 4 transactions invalid, which retired the old Sprout pool. It did not introduce a new transaction format. Its consensus branch ID is `0x77190ad9`.

Why this matters. Before NU7 you waited 75 seconds on average for a first confirmation, which is slow for a shop counter, an exchange deposit or a cross-chain swap. NU7 brought that down to about 25 seconds without printing more ZEC: the reward per block was cut to a third, so daily issuance stayed the same. It is also the first upgrade that adds a mechanism aimed at paying for network security after block rewards shrink.

New to Zcash? Start with [What is ZEC and Zcash](../start-here/what-is-zec-and-zcash) and [Shielded Pools](../using-zcash/shielded-pools), then come back here.

## TL;DR

- **25-second blocks** ([ZIP 218](https://zips.z.cash/zip-0218)): first confirmation in about 25 seconds instead of 75. The block subsidy dropped from 1.5625 to 0.52083333 ZEC, so about 1,800 ZEC are still issued per day.
- **Shielded action limits** (ZIP 218): at most 330 shielded actions per block across all pools, with per-pool caps, to keep worst-case block validation and wallet sync costs below what they were before.
- **Network Sustainability Mechanism** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% of every block's transaction fees leave circulation and are reissued to miners later, starting at block 8,939,664 (projected around February 2031). The 21 million supply cap is unchanged.
- **Version 4 transactions are invalid** ([ZIP 2003](https://zips.z.cash/zip-2003)): wallets must build v5 or v6 transactions. Sprout can only be spent with v4, so funds still in Sprout are now frozen.
- **Software**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) and later follow NU7. There is no `zcashd` release with NU7 support.

## Visual analogy

Think of the chain as a train line. Before NU7 a train left every 75 seconds and could carry as many passengers as fit in 2 MB. NU7 runs a train every 25 seconds, pays each driver a third of the old fare so the daily total is the same, and puts a cap on how many of the heaviest passengers (shielded actions) can board one train, so no single train can take too long to check.

## What NU7 changed

### 25-second block target spacing (ZIP 218)

- The difficulty adjustment now targets one block every **25 seconds** instead of 75, so a block arrives three times as often.
- The block subsidy was divided by three: **0.52083333 ZEC** per block in the current halving period (it was 1.5625 ZEC). Daily issuance stays about 1,800 ZEC (3,456 blocks per day instead of 1,152).
- Halvings still happen every four years. Because blocks are faster, the next halving moved to block **6,132,390**, projected around late November 2028 at 25-second spacing (ZIP 259).
- The difficulty averaging window grew from 17 to **102 blocks**, so the adjustment still looks at a similar stretch of time.
- The default transaction expiry grew from 40 to **120 blocks**, which keeps it at about 50 minutes.

### Shielded action limits (ZIP 218)

Each block now has a shared budget and per-pool caps:

| Limit | Per block |
|---|---|
| All shielded actions across pools | 330 |
| Orchard actions | 330 |
| Ironwood actions | 330 |
| Sapling inputs + outputs | 300 |
| Sprout JoinSplits | none allowed |

Before NU7, a full 2 MB block could hold about 617 Orchard or Ironwood actions or about 2,107 Sapling outputs, with no per-pool limits. ZIP 218 sets the new caps so that, even with three times as many blocks, the worst case for nodes and for syncing wallets is lower than before (for example, maximum light-client shielded sync bandwidth falls from about 271 to 169 MB per day), while Orchard-protocol throughput more than doubles (about 2.9 to 6.6 transactions per second for 2-action transactions).

### Network Sustainability Mechanism (ZIP 235 + ZIP 237)

- **Fee removal (ZIP 235):** 60% of the transaction fees in each block are taken out of circulation; the other 40% go to the miner as before. Unlike a burn, the removed ZEC is tracked so it can be issued again later.
- **Reissuance (ZIP 237):** the removed ZEC is kept in public consensus state called the NSM Value Balance. It was seeded at NU7 with value that miners left unclaimed in the past. From block **8,939,664** (projected around February 2031), each block issues a fixed portion of that balance on top of the normal halving schedule.
- The supply cap does not rise. When the balance is zero, issuance is exactly the old halving schedule.
- NU7 did **not** deploy [ZIP 233](https://zips.z.cash/zip-0233) (voluntary removal by users) or [ZIP 234](https://zips.z.cash/zip-0234) (replacing halvings with a smooth curve). Coinholder polls chose the halving-preserving design in ZIP 237.
- The numbers (the 368.58 ZEC seed, the per-block reissuance fraction, why it starts at block 8,939,664) are on the [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md) page.

### Version 4 transactions disallowed (ZIP 2003)

- From NU7 on, every version 4 transaction is invalid: not only Sprout transfers but also transparent-only and Sapling transactions built in the v4 format. Version 5 (NU5) and version 6 ([Ironwood](../zcash-tech/ironwood)) transactions are unchanged.
- Sprout transfers exist only in the v4 format, so the [Sprout](../zcash-tech/sprout) pool can no longer be spent. See [Recovering Funds](../using-zcash/recovering-funds).

### Smaller items

- Development-fund rule revisions so funding streams work with 25-second blocks ([ZIP 207](https://zips.z.cash/zip-0207) Revision 2, [ZIP 214](https://zips.z.cash/zip-0214) Revision 3), and an update to a funding-stream address list ([ZIP 2008](https://zips.z.cash/zip-2008)).
- NU7 nodes advertise network protocol version **170190** on Mainnet and disconnect older peers after activation.

## What NU7 did not do

- **No new transaction format.** NU7 deliberately avoided another wallet and parser migration right after Ironwood introduced v6 transactions.
- **No change to the supply cap or the four-year halving rhythm.**
- **No change to coinbase maturity.** Mined coins still need 100 blocks before they can be spent (now about 42 minutes instead of about 2 hours).
- **No new shielded pool.** Ironwood (NU6.3) remains the newest pool; Orchard stays spend-only, as it has been since Ironwood.

## What each group had to do

- **Node operators:** run [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) or later. Zebra 7 moves its database from format v28 to v29 on first start, and Zebra 6.x can't read v29, so back up `state/v28` before upgrading. `zcashd` has no NU7 release (its latest release is 6.20.0, from June 2026); the Zebra book's [zcashd API migration guide](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) maps each `zcashd` RPC to Zebra, [Zallet](../zcash-tech/zallet) or its replacement. See [Full Nodes](../zcash-tech/full-nodes) and the [Hardened Zebra guide](../guides/hardened-zebrad).
- **Wallets:** stop building v4 transactions, use the 120-block default expiry, keep the 3-block anchor depth (now about 1.25 minutes) and respect the per-block action limits. A transaction that by itself breaks a limit can never be mined.
- **Exchanges and payment services:** a confirmation now takes 25 seconds, so the same number of confirmations covers a third of the time. Re-check deposit confirmation counts against the time and security you actually want, rather than keeping the old number by habit.
- **Miners and pools:** mining software and templates must use the new subsidy, the fee split and the action limits; blocks built on the old rules are rejected.

## Common mistakes

- **"My old node is still running, so it's fine."** For NU7 only, ZIP 259 waived the usual rule that pre-upgrade software shuts itself down before activation. A 6.x Zebra or a `zcashd` node can stay online on the old rules and quietly fall off the real chain. Check that your node reports a height above 3,543,405 and matches a block explorer.
- **"Faster blocks mean more ZEC is printed."** No. The per-block subsidy fell to a third, so daily issuance is unchanged.
- **"60% of fees are burned forever."** No. They are removed and later reissued to miners by the NSM; the supply cap is unchanged.
- **"Only Sprout users are affected by the v4 change."** Any wallet or script still producing v4 transactions, including transparent-only and Sapling ones, stopped working. Pending v4 transactions became invalid at activation, and re-signing alone can't make them valid.
- **"Block-count settings carry over."** Anything measured in blocks (confirmations, expiry, lock times, timeouts) now passes three times faster in real time.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Block target spacing | The average time between blocks that the difficulty adjustment aims for: 25 seconds since NU7 |
| Block subsidy | The new ZEC created in each block, shared between the miner and the development-fund streams |
| Shielded action | One unit of shielded work in a transaction (an Orchard or Ironwood action, or a Sapling input or output) |
| Network Sustainability Mechanism (NSM) | The rules that take part of the fees out of circulation and reissue them to future miners |
| NSM Value Balance | The public running total of ZEC removed from circulation and waiting to be reissued |
| Version 4 transaction | The transaction format from Sapling, made invalid by NU7; v5 and v6 remain valid |
| Consensus branch ID | The number that identifies a set of consensus rules; signatures commit to it, so a transaction signed for old rules is invalid under new ones |

## FAQ

**When did NU7 activate?** At Mainnet block 3,543,405 on November 6, 2026 at 02:34 UTC. Testnet activated earlier, at block 4,465,026 on October 4, 2026.

**Did the block reward change?** Per block, yes: 0.52083333 ZEC instead of 1.5625 ZEC. Per day, no: about 1,800 ZEC either way.

**Is my Sprout ZEC gone?** It can no longer be moved, because Sprout spends need v4 transactions and those are now invalid. See [Recovering Funds](../using-zcash/recovering-funds) for what that means in practice.

**Do I need a new wallet?** You need a wallet version that supports NU7. ZecHub's [Wallets](../using-zcash/wallets) page shows which wallets are NU7 compatible.

**When does fee reissuance start?** At block 8,939,664 on Mainnet, projected around February 2031 if blocks keep a 25-second average.

**Why did NU7 skip a new transaction format?** To spare wallets and parsers a second migration right after Ironwood's v6 format, and because the fee split is calculated per block, so no new transaction field was needed.

## Test your understanding

1. Why does daily ZEC issuance stay the same after NU7?
2. What happens to the 60% of fees removed from circulation?
3. Why can't Sprout funds be spent after NU7?
4. Why is a node that was never upgraded especially risky in this upgrade?

Answers: (1) the per-block subsidy was cut to a third while blocks became three times as frequent; (2) they go into the NSM Value Balance and are reissued to miners from block 8,939,664; (3) Sprout spends exist only in the v4 format, which NU7 made invalid; (4) ZIP 259 waived the automatic shutdown, so an old node can keep running on the wrong chain.

### Resources

[ZIP 259: Deployment of the NU7 Network Upgrade](https://zips.z.cash/zip-0259)

[ZIP 218: 25-second Block Target Spacing](https://zips.z.cash/zip-0218)

[ZIP 235: Remove 60% of Transaction Fees From Circulation](https://zips.z.cash/zip-0235)

[ZIP 237: Network Sustainability Mechanism: Halving-Preserving Issuance](https://zips.z.cash/zip-0237)

[ZIP 2003: Disallow version 4 transactions](https://zips.z.cash/zip-2003)

[Zebra 7.0.0 release notes](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Community Forum: NU7 Timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Related Pages

| Page | Why it is related |
|---|---|
| [Ironwood](./Ironwood.md) | the previous upgrade in the series, which introduced v6 transactions |
| [What 25-Second Blocks Actually Change](../research/what-25-second-blocks-actually-change) | a deeper look at the faster block time |
| [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md) | how the fee removal and reissuance NU7 activated work, with the numbers |
| [Sprout](./Sprout.md) | the pool NU7 retired |
| [Recovering Funds](../using-zcash/recovering-funds) | what the Sprout freeze means for old funds |
| [Transactions](../using-zcash/transactions) | expiry and confirmations after NU7 |

---

Series: [Network Upgrades index](../start-here/network-upgrades) · Previous: [Ironwood](../zcash-tech/ironwood)
