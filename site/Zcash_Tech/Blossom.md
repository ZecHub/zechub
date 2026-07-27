<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom went live on Zcash mainnet at block 653,600 (December 11, 2019 UTC).

What you'll take away: how Blossom made Zcash blocks arrive about twice as fast without changing how much ZEC the network creates over time.

Blossom is a Zcash [network upgrade](../start-here/network-upgrades). It was deployed by [ZIP 206](https://zips.z.cash/zip-0206), and its main consensus change is defined in [ZIP 208](https://zips.z.cash/zip-0208). Blossom was a scalability upgrade: it shortened the target time between blocks from 150 seconds to 75 seconds, so blocks arrive about twice as often. The Electric Coin Company led and announced Blossom.

Why this matters. When you send ZEC, you wait for the network to confirm it in a block. If blocks are slow, you wait longer. Before Blossom, a new block was expected about every 150 seconds. Blossom cut that target in half, to 75 seconds, so confirmations come sooner and the chain can carry more transactions in the same amount of time. It did this without creating more ZEC or moving the timing of future halvings.

## Faster blocks

Blossom's core change is simple. The Zcash target block spacing, the time the network aims for between one block and the next, dropped from 150 seconds to 75 seconds ([ZIP 208](https://zips.z.cash/zip-0208)). Blocks are found by proof of work, so the real gap between them varies, but the network now aims for a block about every 75 seconds instead of every 150.

Two things follow:

1. Blocks arrive about twice as often, so the chain can carry roughly double the transactions per unit of time.
2. Your transaction gets its first confirmation sooner, because you do not wait as long for the next block.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Keeping issuance steady

Faster blocks raise a question. If Zcash made twice as many blocks and each block still paid the same reward, the network would create ZEC twice as fast. Blossom avoids that. It halved the reward paid per block, and it doubled the block-reward halving interval from 840,000 to 1,680,000 blocks ([ZIP 208](https://zips.z.cash/zip-0208)). Twice as many blocks, each paying half as much, works out to the same amount of ZEC created per unit of time. The total supply schedule and the timing of future halvings, measured in real time, did not change.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## A mandatory upgrade

Blossom was a bilateral consensus change, which means every node had to upgrade to keep following the chain ([ZIP 206](https://zips.z.cash/zip-0206)). It was not optional for a node operator who wanted to stay in sync. Blossom activated at mainnet block 653,600 and carries its own consensus branch id, a tag that lets nodes and transactions confirm they are on the Blossom rules. The upgrade used Zcash's standard network upgrade mechanism ([ZIP 200](https://zips.z.cash/zip-0200)).

## Where Blossom fits

Blossom was Zcash's third network upgrade. It followed Overwinter and Sapling, and it came before Heartwood and Canopy. Unlike Sapling, which reworked Zcash's shielded cryptography, Blossom was focused on scale and speed. Its main job was block timing, not new privacy features.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Block target spacing | The time the network aims for between one block and the next |
| Block reward | The new ZEC created and paid out as each block is mined |
| Halving interval | How many blocks pass between each halving of the block reward |
| Consensus branch id | A tag that marks which set of network rules a node or transaction is following |
| Bilateral consensus change | A rule change that every node must adopt to stay on the network |
| Network upgrade (NU) | A coordinated change to Zcash's consensus rules, activated at a set block height |

## FAQ

Does Blossom change how much ZEC exists or when halvings happen? No. The per-block reward was halved and the halving interval was doubled at the same time, so the amount of ZEC created per unit of time, and the timing of future halvings, stayed the same.

Does Blossom change my ZEC or my privacy? No. Blossom changed block timing and reward math. It did not touch your balances or your shielded transactions.

What does 75 seconds actually mean? It is a target, not a guarantee. Blocks are found by proof of work, so the real gap between blocks varies. The network aims for one about every 75 seconds instead of every 150.

Did I have to do anything when Blossom activated? If you ran a full node, you needed to upgrade it, because Blossom was mandatory. If you used a wallet, you needed a version that supported the new rules.

Why halve the block reward at all? Because blocks now come twice as fast. Halving the per-block reward keeps the network from creating ZEC twice as quickly.

When did Blossom activate? At mainnet block 653,600, on December 11, 2019 UTC.

## Test your understanding

Blossom made Zcash blocks arrive about twice as often. Why did that not double the rate at which new ZEC is created?

<details>
<summary>Answer</summary>

Because Blossom also halved the reward paid per block and doubled the halving interval from 840,000 to 1,680,000 blocks. Twice as many blocks, each paying half as much, adds up to the same amount of ZEC per unit of time, so the emission schedule measured in real time did not change.
</details>

### Resources

[ZIP 208: Shorter Block Target Spacing](https://zips.z.cash/zip-0208)

[ZIP 206: Deployment of the Blossom Network Upgrade](https://zips.z.cash/zip-0206)

[Blossom Network Upgrade](https://z.cash/upgrade/blossom/)

[Blossom Upgrade Improves Speed, Scalability, Capacity (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### See also

[Zcash Network Upgrades](../start-here/network-upgrades)

[Zcash Monetary Policy](../start-here/zcash-monetary-policy)

[What is ZEC and Zcash](../start-here/what-is-zec-and-zcash)

[Full Nodes](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Series: [Network Upgrades index](../start-here/network-upgrades) · Previous: [Sapling](../zcash-tech/sapling) · Next: [Heartwood](../zcash-tech/heartwood)
