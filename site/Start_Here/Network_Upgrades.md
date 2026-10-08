# Zcash Network Upgrades

Zcash improves through network upgrades: coordinated changes to the rules every node agrees on, each activated at a set block height. Every upgrade below has its own page that explains, in plain language, what it changed and why. New to Zcash? Read them in order, from Sprout to Ironwood.

For the visual story of how Zcash's privacy has evolved across these upgrades, see [The Evolution of Privacy](https://zechub.wiki/zcash-evolution). This page is the index. That one is the timeline.

| Upgrade | Activation (UTC) | Block | Branch id | What it changed |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | October 28, 2016 | genesis | 00000000 | The launch: the first shielded pool and zk-SNARK private transactions |
| [Overwinter](../zcash-tech/overwinter) | June 26, 2018 | 347,500 | 5ba81b19 | Replay protection, transaction versioning, and expiry, so safe upgrades became possible |
| [Sapling](../zcash-tech/sapling) | October 29, 2018 | 419,200 | 76b809bb | Efficient shielded transactions, fast enough for phones and hardware wallets |
| [Blossom](../zcash-tech/blossom) | December 11, 2019 | 653,600 | 2bb40e60 | Faster blocks, about 75 seconds, and higher throughput |
| [Heartwood](../zcash-tech/heartwood) | July 16, 2020 | 903,000 | f5b9230b | Shielded mining rewards and lighter clients (FlyClient) |
| [Canopy](../zcash-tech/canopy) | November 18, 2020 | 1,046,400 | e9ff75a6 | The Development Fund, the first halving, and winding down the Sprout pool |
| [NU5](../zcash-tech/nu5) | May 31, 2022 | 1,687,104 | c2d6d0b4 | The Orchard pool on Halo 2 (no trusted setup), unified addresses, and v5 transactions |
| [NU6](../zcash-tech/nu6) | November 23, 2024 | 2,726,400 | c8e71055 | The Deferred Dev Fund Lockbox and a new development funding split |
| [NU6.1](../zcash-tech/nu6-1) | November 24, 2025 | 3,146,400 | 4dec4df0 | Community and coin-holder governance of that funding |
| [NU6.2](../zcash-tech/nu6-2) | June 3, 2026 | 3,364,600 | 5437f330 | An emergency fix that corrected the Orchard circuit |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | July 28, 2026 | 3,428,143 | 37a5165b | The Ironwood pool and a public turnstile that lets anyone audit the supply |

Dates are shown in UTC. Some dashboards show them in local time, which is the same block and the same moment. The fixed trigger for every upgrade is its activation block height, not the calendar date: Ironwood activated at block 3,428,143. The next upgrade, NU7, is not the same as Ironwood and is described below.

## Next upgrade: NU7

NU7 is the next planned network upgrade. From August 25 to September 14, 2026, holders of shielded ZEC voted on its main choices in a coinholder survey. About 2.4 million ZEC took part, above the 1,000,000 ZEC threshold needed for the result to count as representative.

![NU7 coinholder survey results: about 2.4M ZEC took part and the 1,000,000 ZEC threshold was reached. Coinholders backed 25-second blocks, kept the halving schedule, disabled Sprout v4 transactions at NU7 and set NSM reissuance to begin in February 2031. Mainnet activation is targeted for November 5, 2026.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-coinholder-survey.png)

What coinholders backed:

- **Faster blocks.** The target time between blocks drops from 75 to 25 seconds ([ZIP 218](https://zips.z.cash/zip-0218)). Daily issuance stays the same. [What 25-second blocks actually change](../research/what-25-second-blocks-actually-change)
- **Halvings stay.** The halving schedule is kept as it is.
- **Sprout v4 transactions end.** Version 4 transactions are disabled at NU7. If you hold funds in the old Sprout pool, move them before activation: see [Recovering Funds](../using-zcash/recovering-funds).
- **Fees return as rewards.** Under the Network Sustainability Mechanism (NSM), part of each transaction fee is taken out of circulation and paid out again later as block rewards, starting in February 2031.

The survey is non-binding. It shows what coinholders want, and the rules themselves change through ZIPs. Mainnet activation is targeted for about November 5, 2026. The exact block height is set on October 20, and that height is the real trigger, as with every upgrade in the table above.
