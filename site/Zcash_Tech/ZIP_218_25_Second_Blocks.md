# ZIP 218: What 25-Second Blocks Actually Change

In the NU7 coinholder poll that closed on 14 September 2026, about 2,397,669 ZEC voted for ZIP 218 and 141.6 ZEC voted against it, a 99.9% result. Most coverage summed it up as "Zcash blocks get faster." That is true, but it leaves out most of what the proposal does and most of what it deliberately keeps the same.

This page explains ZIP 218 from its own text: what changes, what does not, and what it costs.

## The short version

| | Today | After ZIP 218 |
|---|---|---|
| Block target spacing | 75 seconds | 25 seconds |
| Blocks per day | 1,152 | 3,456 |
| Block subsidy (current halving era) | 1.5625 ZEC | 0.52083333 ZEC |
| New ZEC per day | unchanged | unchanged |
| Halving interval | 1,680,000 blocks | 5,040,000 blocks |
| Limits on shielded actions per block | none (only the 2 MB size limit) | 330 total, with per-pool caps |
| Orchard throughput (2-action transactions) | about 2.9 per second | about 6.6 per second |

Three times as many blocks, each paying a third as much. The supply schedule stays where it was.

## Why change the block time

The main goal is **lower waiting time**. Today a payment waits 75 seconds on average for its first confirmation, whatever the network load. At 25 seconds that falls to 25 seconds on average. The ZIP names point-of-sale payments, exchange deposits and cross-chain bridges as the uses that feel this most.

Two points from the ZIP are worth keeping in mind:

- **It does not tell anyone to use fewer confirmations.** For users who keep the same tolerance for rollback risk as today, the ZIP expects confirmation time to improve by slightly less than three times.
- **It is not a substitute for finality work.** The ZIP describes itself as complementary to finality mechanisms such as Crosslink. Faster base-layer blocks help whether or not a finality layer is added later.

The ZIP also notes that higher throughput alone could have been achieved with a larger block size. Latency is the reason for choosing shorter blocks instead.

## What changes

### Issuance: same ZEC per day

Tripling the number of blocks would triple daily issuance if nothing else changed. ZIP 218 prevents that by dividing the per-block subsidy by a further factor of three once NU7 is active.

In the current halving era, that takes the block subsidy from **1.5625 ZEC to 0.52083333 ZEC** (52,083,333 zatoshi). Because 156,250,000 zatoshi does not divide evenly by three, each block rounds down by a third of a zatoshi. Across a full 5,040,000-block halving interval that is about 0.0168 ZEC in total.

The subsidy is the total new ZEC created per block. The existing development-funding share is still taken from it, so miners receive less than the full figure, exactly as today.

> **A note on the 0.26041666 ZEC figure.** The draft ZIP's explanatory note prints the post-NU7 subsidy as floor(156250000 / 6) = 0.26041666 ZEC, and some news coverage has repeated it. That note is wrong by a factor of two: 156,250,000 zatoshi is already the post-Blossom subsidy, so dividing it by six applies the Blossom factor of two a second time on top of the NU7 factor of three. The normative formula gives floor(1,250,000,000 / (2 · 3 · 4)) = 52,083,333 zatoshi at the current halving index. Zebra's implementation issue for this change ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) records the note as double-counting the Blossom factor, tells implementers to "implement the formula, not the note," and says a correction has been filed against the ZIP. The correct figure at activation is **0.52083333 ZEC**.

### Halvings keep their timing

The halving interval triples from 1,680,000 blocks to 5,040,000 blocks. Since blocks arrive three times as often, halvings still land at roughly the same point in time as they would have without the change. The total supply cap is unaffected.

This is separate from the other issuance question in the NU7 poll, where coinholders voted to keep halvings rather than replace them with a smoothed curve. ZIP 218 works with the existing halving model and does not change it.

### New limits on shielded actions per block

ZIP 218 adds caps on how much shielded activity a single block can hold:

| Limit | Maximum per block |
|---|---|
| All shielded pools combined | 330 (each Sprout JoinSplit counts as 2) |
| Orchard actions | 330 |
| Sapling inputs plus outputs | 300 |
| Sprout JoinSplits | 25 |

Transparent parts of transactions are not affected, and the 2 MB block size limit still applies.

The limits exist because more blocks would otherwise mean more work for wallets and nodes. With the caps in place the worst case actually gets **better** than today, even with three times as many blocks:

- **Wallet sync:** the most data a light wallet could be forced to download in a day falls from about 271 MB to about 169 MB, roughly a 38% reduction. Worst-case trial decryptions fall from about 4.8 million to about 2.3 million per day.
- **Block verification:** the ZIP's benchmarks put a worst-case Orchard block at about 432 ms under the new limits, against about 770 ms for today's worst case. For Sapling the drop is larger, from about 3,175 ms to about 272 ms.

The Sapling and Sprout caps are tight on purpose. As of May 2026, Orchard held 87.9% of shielded ZEC, Sapling 11.6% and Sprout 0.5%, so the smaller pools get enough room for their real usage while giving an attacker less to abuse. Because ZIP 317 fees charge the same per logical action in every pool, an attacker gains nothing by spamming one pool instead of another.

### Throughput

With 330 Orchard actions per block, a standard 2-action Orchard transaction fits ⌊330 / 2⌋ = 165 times per block. At one block every 25 seconds that is about **6.6 transactions per second**, up from about 2.9 today — the ZIP calls it a 2.3× increase in normal Orchard throughput. Sapling comes out at about 3.0 per second, still above what Orchard manages today.

### Difficulty adjustment

The difficulty algorithm averages over a window of recent blocks. ZIP 218 raises that window from 17 blocks to 102, so it still covers about 2,550 seconds of real time, the same span it covered when Zcash launched with 150-second blocks. The ZIP gives two reasons: to avoid making difficulty-manipulation attacks easier (it cites Litecoin's April 2026 MWEB incident), and to smooth out short-term variation in block times.

Right after activation, block times will take a while to settle at the new target. That is expected and mirrors what happened at Blossom, when Zcash went from 150 to 75 seconds.

### Defaults for nodes and wallets

These are recommendations for implementations rather than consensus rules:

- **Transaction expiry:** the default expiry rises from 40 to 120 blocks, keeping roughly the same 50 minutes.
- **Maximum reorg depth:** Zebra's limit rises from 99 to 600 blocks, about 4.2 hours at 25 seconds, the same window it covered at launch.
- **Anchor depth for shielded transactions:** stays at 3 blocks, so the delay shrinks from 3.75 minutes to 1.25 minutes. The ZIP follows the Blossom precedent here.
- **Several networking constants** measured in blocks are scaled up by three so they cover the same amount of time.

## What stays the same

- ZEC issued per day, the halving schedule and the supply cap
- The 2 MB block size limit
- Transparent transactions, which the new action limits do not touch
- Coinbase maturity at 100 blocks. Note that this now means about 42 minutes rather than about 125, because the count is in blocks, not time.

## The trade-off: more stale blocks

Faster blocks are not free. A stale block is a valid block that loses the race to be included in the chain because another block reached the network first. The shorter the gap between blocks, the more often this happens, and the ZIP ties the stale rate to block propagation, verification time and mining centralisation risk.

- **Today:** about 0.4%, which the ZIP notes may understate the underlying rate because hashpower is concentrated in pools.
- **Theoretical at 25 seconds:** about 3.26%, based on measured Zcash propagation delays.
- **Devnet test:** 99 geographically distributed Zebra nodes producing full 2 MB blocks at 25-second spacing measured a 4.86% stale rate and a 0.37% fork rate. The only tuning needed was TCP configuration. Because that devnet was more decentralised than today's mainnet, the ZIP treats these as close to worst-case figures.
- **Reference point:** the ZIP uses Ethereum's historical proof-of-work stale rate of 5.4% as its safety threshold. Both devnet figures sit below it.

There are two smaller costs as well. Light wallets download about 200 KB more per day of compact block headers. And because there are three times as many blocks, a full node that has been offline has more blocks to process when it catches up, even though each block is cheaper to verify. The ZIP accepts both.

## Status and timeline

- **ZIP status:** Draft. Owners Dev Ojha and Evan Forbes; created 13 March 2026.
- **Coinholder poll:** closed 14 September 2026, with 99.9% support. The poll signals preference; it does not change consensus rules by itself.
- **Timeline:** in a Zcash Community Forum announcement on 17 September, the development organisations agreed a schedule of code complete by 30 September, NU7 on testnet on 6 October, a final decision and mainnet activation height on 20 October, and mainnet activation targeted for about 5 November 2026. November 5 is a target, not a fixed date, until the height is set.
- **Implementation:** tracked in Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) and in Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## What this means for you

- **Holding ZEC:** nothing to do. Your balance and the supply schedule are unaffected.
- **Using a wallet:** update when your wallet ships NU7 support. First confirmations will arrive about three times sooner.
- **Running a node, exchange or service:** plan to upgrade before activation, and review any settings measured in blocks, since a fixed block count now covers a third of the time it used to.

## Sources

- [ZIP 218: 25-second Block Target Spacing](https://zips.z.cash/zip-0218)
- [ZIP 208: Shorter Block Target Spacing](https://zips.z.cash/zip-0208), the Blossom precedent
- [Forum: Proposal — Lower Zcash Block Target Spacing to 25s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Zcash Block Time Reduction Appears Safe for NU7 w/ Zebra-only Devnet](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra issue #11463](https://github.com/ZcashFoundation/zebra/issues/11463), post-NU7 halving interval and subsidy
- [Zebra issue #11440](https://github.com/ZcashFoundation/zebra/issues/11440), ZIP 218 implementation tracking
- NU7 poll results and timeline, as reported by Bitcoin.com News, crypto.news and KuCoin (16–19 September 2026)
