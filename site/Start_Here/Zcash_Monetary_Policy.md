<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Monetary Policy

## TL;DR

* Zcash has a fixed supply of 21 million ZEC, the same cap as Bitcoin.
* Since NU7 activated on 6 November 2026, a new block arrives about every 25 seconds and creates 0.52083333 ZEC.
* That adds up to about 1,800 new ZEC per day, the same daily amount as before NU7.
* Each block reward is split 80% to the miner, 8% to Zcash Community Grants, and 12% to the lockbox.
* The block reward halves about every four years. The next halving is expected around late November 2028.

## Core Explanation

### What are the economics of Zcash?

Zcash's monetary base is the same as Bitcoin's fixed supply of 21 million ZEC currency units. Every 25 seconds on average (75 seconds before NU7 activated on 6 November 2026), a new [block](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) is mined to the Zcash blockchain and a block reward of 0.52083333 ZEC comes into circulation. Before NU7, the reward was 1.5625 ZEC per block; [ZIP 218](https://zips.z.cash/zip-0218) divided it by three along with the block time, so the amount of new ZEC per day did not change. Since NU7, the 0.52083333 ZEC is split 80% to the miner (0.41666668 ZEC, plus transaction fees), 8% to Zcash Community Grants (0.04166666 ZEC), and 12% to the lockbox (0.06249999 ZEC), following [ZIP 1015](https://zips.z.cash/zip-1015).

The amount of the block reward is cut in half about every four years until all 21 million ZEC are in circulation. Zcash inflation almost precisely mimics that of Bitcoin. It is important to note that as new coins are created, inflation goes down, and at each halving, the rate drops significantly.

## Visual / Analogy

Picture a coin dispenser in front of a sealed vault. The vault holds 21 million ZEC in total, and nobody can add a single coin to it.

Every 25 seconds, the dispenser drops one small handful of new coins, 0.52083333 ZEC. The miner who found the block takes 80% of the handful. Zcash Community Grants gets 8%. The last 12% goes into the lockbox.

About every four years, the handful shrinks to half its size. That is the halving.

NU7 made the handfuls come three times as often and made each one three times smaller. The number of new coins per day stayed the same.

## Deep Dive

### New ZEC per day, era by era

Halvings cut the reward per block. Faster blocks (Blossom in 2019, NU7 in 2026) also cut the reward per block, together with the block time, so they leave the daily amount where it was.

| Period | Block time | Reward per block | New ZEC per day |
|:--|:--|:--|:--|
| Launch era, 2016 to 2019 | 150 seconds | 12.5 ZEC | 7,200 |
| [Blossom](/zcash-tech/blossom), Dec 2019 to Nov 2020 | 75 seconds | 6.25 ZEC | 7,200 |
| First halving ([Canopy](/zcash-tech/canopy)), Nov 2020 to Nov 2024 | 75 seconds | 3.125 ZEC | 3,600 |
| Second halving ([NU6](/zcash-tech/nu6)), Nov 2024 to Nov 2026 | 75 seconds | 1.5625 ZEC | 1,800 |
| [NU7](/zcash-tech/nu7), Nov 2026 to late 2028 | 25 seconds | 0.52083333 ZEC | 1,800 |
| Third halving, expected late Nov 2028 | 25 seconds | half of the current reward | about 900 |

Each daily figure is the reward per block multiplied by the number of blocks in a day (86,400 seconds divided by the block time). Real block times vary a little, so actual daily issuance moves slightly around these numbers.

### When the next halving happens

NU7 made blocks three times more frequent, so the block number of the next halving moved. The next halving is set for block 6,132,390, projected around late November 2028 ([ZIP 259](https://zips.z.cash/zip-0259)). Older articles give block 4,406,400. That number was correct before NU7.

### Fees and the Network Sustainability Mechanism

Since NU7, 60% of the transaction fees in every block are removed from circulation and kept in a public reserve. From block 8,939,664, projected around February 2031, each block pays out a fixed portion of that reserve to miners on top of the normal block reward. The 21 million cap does not change. The [Network Sustainability Mechanism](/zcash-tech/network-sustainability-mechanism) page explains how it works.

## Related Pages

- [NU7](/zcash-tech/nu7): the upgrade that brought 25-second blocks and the current block reward.
- [Network Sustainability Mechanism](/zcash-tech/network-sustainability-mechanism): where 60% of each block's fees go and when they come back.
- [Development Fund](/start-here/development-fund): the history of the development share of the block reward.
- [Network Upgrades](/start-here/network-upgrades): every Zcash upgrade, with dates and block heights.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants): the organization that receives the 8% share.
- [Zcash Mining Pools](/using-zcash/zcash-mining-pools): where most miners earn their share of the block reward.

### Resources

[What are the economics of Zcash?](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218: 25-second Block Target Spacing](https://zips.z.cash/zip-0218)

[ZIP 259: Deployment of the NU7 Network Upgrade](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Last updated:** November 2026
