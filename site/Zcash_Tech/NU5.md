<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 went live on Zcash mainnet at block 1,687,104 (May 31, 2022 UTC).

What you'll take away: how NU5 gave Zcash a new shielded pool that needs no trusted setup, plus a single address type that works across pools.

NU5 (Network Upgrade 5) is the sixth Zcash [network upgrade](../start-here/network-upgrades), deployed by [ZIP 252](https://zips.z.cash/zip-0252). It is a major cryptographic upgrade. It introduced the Orchard shielded payment protocol, built on the Halo 2 proving system, along with unified addresses and a new version 5 transaction format. NU5 shipped in the Electric Coin Company's zcashd v5.0.0 release.

Why this matters. A shielded pool is only as trustworthy as the setup that created it. Zcash's first two shielded pools, Sprout and Sapling, each needed a one-time trusted setup ceremony to generate their secret parameters. If those parameters were ever kept instead of destroyed, someone could have printed counterfeit ZEC without anyone seeing it. NU5's Orchard pool closes that concern by using the Halo 2 proving system, which needs no such ceremony.

## The trusted setup

Orchard is Zcash's newest shielded protocol, defined in [ZIP 224](https://zips.z.cash/zip-0224). It is built on the Halo 2 proving system, which uses a technique called PLONKish arithmetization on the Pallas and Vesta curve cycle. The practical payoff is simple: Halo 2 needs no trusted setup and no structured reference string, so there is no secret parameter that could ever be misused.

Sprout and Sapling both depended on a trusted setup. A group of people ran a ceremony to build each pool's parameters, and everyone had to trust that at least one of them destroyed their piece of the secret. Orchard removes that assumption. The older pools still exist after NU5, so the no-setup guarantee applies to funds you hold in the Orchard pool.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## What NU5 changed

NU5 bundles several consensus changes, all activated together at block 1,687,104.

1. It added the Orchard shielded pool (ZIP 224), the Halo 2 based protocol described above.
2. It added the version 5 transaction format (ZIP 225), a restructured layout with separate regions for transparent, Sapling, and new Orchard data. Sprout fields were removed, and the older version 4 format stayed valid after activation.
3. It introduced unified addresses and unified viewing keys (ZIP 316), covered in the next section.
4. It adopted transaction identifier non-malleability (ZIP 244), a new way of computing a transaction's id that separates what a transaction does from the proofs and signatures that authorize it.
5. It adopted canonical Jubjub point encodings (ZIP 216) to remove non-standard encodings and tighten the rules on what counts as a valid transaction.
6. It enabled relay of version 5 transactions across the peer-to-peer network (ZIP 239).

NU5 also updated a number of existing ZIPs (32, 203, 209, 212, 213, 221, and 401) so they account for the new Orchard pool.

## Unified addresses

Before NU5, each pool had its own address type, and a sender had to know which kind you wanted. Unified addresses, defined in [ZIP 316](https://zips.z.cash/zip-0316), change that. A single unified address can bundle receivers for more than one pool, so the sender's wallet just picks the best one it supports.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Unified viewing keys work the same way for viewing. They give read-only visibility across the pools an address covers. For more on that, see the [Viewing Keys](../zcash-tech/viewing-keys) page.

## Where NU5 sits

NU5 followed Zcash's earlier upgrades: Overwinter, Sapling, Blossom, Heartwood, and Canopy. It activated on mainnet on May 31, 2022. Orchard's curve cycle was chosen because it supports recursion, which is groundwork for later scaling work. NU5 is the direct predecessor to the NU6 and NU6.x line of upgrades, which built on the Orchard pool and later patched it.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Network upgrade (NU) | A coordinated change to Zcash's consensus rules, activated at a set block height |
| Orchard | The shielded pool NU5 introduced, built on the Halo 2 proving system |
| Halo 2 | The proving system behind Orchard that needs no trusted setup |
| Trusted setup | A one-time ceremony that makes a pool's secret parameters and must be trusted to destroy them |
| Unified address | A single address that can bundle receivers for more than one pool (ZIP 316) |
| Consensus branch id | An identifier marking which set of rules a transaction belongs to |

## FAQ

Does NU5 change my ZEC or my privacy? No. NU5 added a new shielded pool and a new address format. Your existing ZEC is unaffected, and your privacy is not reduced. Moving funds into Orchard gives you a pool that needs no trusted setup.

What is Orchard? Orchard is Zcash's shielded protocol introduced by NU5. It runs on the Halo 2 proving system, so it needs no trusted setup ceremony.

Do I have to do anything? No. A supported wallet handles NU5 for you. You can keep using older addresses, and you can start using unified addresses when your wallet offers them.

What is a unified address? A single address that can hold receivers for more than one pool. The sender's wallet picks the pool it supports, so you do not have to hand out a different address for each type.

Does NU5 remove the trusted setup from my older funds? Not retroactively. Orchard needs no trusted setup, but the Sapling pool's earlier parameters still exist after NU5. The no-setup guarantee applies to funds held in the Orchard pool.

Did the old transaction format stop working? No. NU5 added the version 5 format, and the older version 4 format stayed valid after activation.

## Test your understanding

Sprout and Sapling both needed a trusted setup ceremony. What did NU5's Orchard pool change about that, and why does it matter?

<details>
<summary>Answer</summary>

Orchard is built on the Halo 2 proving system, which needs no trusted setup and no structured reference string. That removes the risk that leftover secret parameters could ever be used to counterfeit ZEC. The guarantee applies to funds held in the Orchard pool. The older Sapling parameters still exist after NU5.
</details>

### Resources

[ZIP 252: Deployment of the NU5 Network Upgrade](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: Version 5 Transaction Format](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 release](https://web.archive.org/web/20260825/https://zodl.com//blog/new-release-5-0-0/)

### See also

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Series: [Network Upgrades index](../start-here/network-upgrades) · Previous: [Canopy](../zcash-tech/canopy) · Next: [NU6](../zcash-tech/nu6)
