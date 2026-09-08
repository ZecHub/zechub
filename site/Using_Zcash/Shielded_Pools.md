<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Value Pools 

## TL;DR

- Zcash currently has **5 value pools**: Sprout (legacy), Sapling, Orchard (spend-only), Ironwood, and Transparent.
- **Ironwood** is the current primary shielded pool, live since the NU6.3 upgrade on 28 July 2026.
- **Orchard** is now **spend-only**: no new value can enter it, and existing funds migrate out into Ironwood.
- **Sapling** (z-addresses starting with `zs`) remains widely supported and continues to secure a significant amount of shielded ZEC.
- **Transparent** addresses (t...) provide no transaction privacy and operate similarly to Bitcoin.
- **Sprout** is a legacy shielded pool that has been retired from active use.
- The Orchard to Ironwood migration is **in progress** and is audited in public by the turnstile.
- For the strongest privacy guarantees, users should continue to prefer **shielded-to-shielded (z → z)** transactions whenever possible.


<br/>

## Understanding Zcash Value Pools

Zcash separates funds into distinct accounting systems known as value pools. Each pool has its own cryptographic rules and privacy properties, while the protocol tracks the total value moving between them.

Today, the network contains five primary value pools:

- Transparent — Public and fully visible on-chain.
- Sapling — The first widely adopted modern shielded pool, still active.
- Orchard — The previous primary shielded pool, now spend-only.
- Ironwood — The current primary shielded pool, introduced by NU6.3.
- Sprout — The original shielded pool launched with Zcash in 2016.
  


As Zcash evolves, new shielded pools may be introduced to improve security, privacy, usability, and auditability while maintaining compatibility with existing funds.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig 1: A chart showing the current 4 pools as of October, 2025

<br/>

## The Shielded Pools 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood is the current primary shielded pool. It activated on 28 July 2026 at block 3,428,143 as part of the NU6.3 network upgrade, and is where new shielded value now lives.

It exists because a vulnerability was found in Orchard's proving system in May 2026. There is no evidence it was ever exploited, but the flaw meant the shielded supply could not be proven sound by the proofs alone. Rather than patch in place, the network created a fresh pool with a corrected circuit and moved value across a turnstile that counts every coin in public. That accounting is what restores the guarantee that the shielded supply is fully backed.

Ironwood reuses Orchard's Action model and Halo 2 proofs, so it behaves the same way day to day. Two things are new: transactions use the v6 format, and Ironwood notes are **quantum-recoverable** under [ZIP 2005](https://zips.z.cash/zip-2005), meaning a coin's on-chain record stays recoverable if a future quantum computer breaks today's cryptography. That is a recovery path, not quantum resistance, and it does not apply to older pools.

You do not need a new address. Unified addresses bundle several receivers, and wallets pick the right pool for you.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig 2: A chart showing the Orchard pool as of October, 2025

<br/>

The Orchard Shielded Pool was activated on May 31, 2022 as part of the NU5 network upgrade. Orchard introduced a new shielded protocol that eliminated the need for a trusted setup and became the primary shielded pool used by Unified Addresses (UAs).

Orchard significantly improved usability, efficiency, and privacy by reducing transaction metadata leakage and introducing a more flexible transaction model based on Actions rather than traditional shielded inputs and outputs.

Since the Ironwood upgrade activated on 28 July 2026, **Orchard is spend-only**. No new value can enter the pool. Funds already held there can still be spent, and are migrating out into Ironwood through the turnstile. Wallets handle this for you, though most give you some control over the pace.

If you hold Orchard funds, see [Ironwood](/zcash-tech/ironwood) for what the migration means in practice.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig 3: A chart showing the Sapling pool as of October, 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) was an upgrade to the Zcash protocol introduced on 28th of October, 2018. It is a major improvement over the earlier version of the known as Sprout which had some limitations in terms of privacy, efficiency and usability. 

Some of the upgrades include improved performance for shielded addresses, Improved viewing keys to enable users view incoming and outgoing transactions without exposing user private keys and Independent Zero Knowledge keys for hardware wallet during transaction signature. 

Zcash Sapling enables users to perform private transactions in just a few seconds when compared to the longer duration it took in Sprout Series. 

Transaction shielding enhances privacy, making it impossible for third-parties to link transactions and determine the amount of ZEC being transferred. Sapling also improves usability by reducing the computational requirements for generating private transactions by making it more accessible to users.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (Zkool, Zingo Wallet, Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig 4: A chart showing the Sprout pool as of October, 2025

Sprout was the first ever open permissionless Zero Knowledge privacy protocol ever launched. It was launched on the 28th of October, 2016.

Sprout addresses are identified by their first two letters which is always "zc". It was named "Sprout" for the major purpose of emphasising that the software was young, budding blockchain with great potential to grow and  opened for development. 

Sprout was used as an early tool for [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) which brought about the distribution of ZEC and Block rewards for Miners. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig 5: A chart showing the Transparent pool as of October, 2025

<br/>

The Zcash Transparent pool is unshielded and non-private. Transparent wallet address on Zcash start with the letter "t", privacy is very low in using this address type for transactions.

Transparent transactions in Zcash are similar to Bitcoin transactions which supports multi-signature transactions and make use of standard public addresses.

The Zcash Transparent are mostly used by centralized exchanges to ensure there's high transparency and network confirmation when sending and receiving ZEC between users.

It's also important to note that while Zcash Shielded addresses provides high privacy during transactions, they also require more computational resources to process transactions. Therefore, some users may adopt Transparent addresses for transactions which doesn't require the same level of privacy.

<br/>

## Pool Transfer Recommended Practice

When it comes to considering high level of privacy during transaction on the Zcash Network, it's recommended you follow the below practices;

Transaction occurring between "z to z" wallets on the Zcash blockchain are mostly shielded and it is sometimes called Private Transaction due to the high level of Privacy generated. This is usually the best and the most recommended way of sending and receiving $ZEC when privacy is required. 

---

When you send ZEC from "Z-address" to "T-address", it simply connotes a form of Deshielding transaction. In this type of transaction, the privacy level is not always high as some information will be visible on the blockchain due to the effect of sending ZEC on a Transparent Address. Deshielding transaction is not always recommended when high privacy is required. 

---

Transferring ZEC from a Transparent Address (T-address) to a Z-address is simply known as Shielding. In this type of transaction the level of privacy is not always high when compared to that of a z-z transaction but it is also recommended when privacy is required. 

---

Sending ZEC from a Transparent Address (T-address) to another Transparent Address (T-address) on Zcash Network (T-T transaction) is very similar to that of Bitcoin transaction and this is why T-T transactions on Zcash are always called Public transactions because both the sender and the receiver transaction details becomes visible to the public which makes the level of Privacy very low in such transaction. 

Most Cryptocurrency Centralized exchanges make use of Transparent Address ("T-address) when it comes to transacting on the Zcash blockchain but this type of transaction (T-T) will not have any private properties.

<br/>

## The Orchard to Ironwood Migration

The migration is happening now. Orchard is sealed to new deposits, and the value still sitting there is moving into Ironwood a transaction at a time. You can watch the totals at [ironwood.live](https://ironwood.live/).

What this means depends on where your funds are:

1. **New shielded activity** goes into Ironwood automatically. Nothing to do.
2. **Existing Orchard funds** need to migrate. Maintained wallets do this for you, usually in stages rather than all at once.
3. **Sapling is unaffected** and still accepts funds. Only Orchard was sealed.
4. **The turnstile counts everything** crossing between pools, which is what proves no coin was invented along the way.

> **One privacy caveat worth knowing.** The turnstile publishes the *amount* that crosses between pools, along with the block height. Sender and receiver stay hidden as always, but a distinctive amount can be linked back to you. This is why wallets migrate in stages using standard denominations instead of moving your balance in one recognisable lump. Let your wallet pace itself, and consider using Tor or a VPN so your IP is not tied to the amounts you move.

See [Ironwood](/zcash-tech/ironwood) for the upgrade itself, and [The Turnstile](/zcash-tech/the-turnstile) for how the accounting works.

<br/>

## Common Mistakes to Avoid

- **Sending from t-address to t-address** — fully public, no privacy. Always shield funds first.
- **Assuming Orchard still accepts funds** — it is spend-only since 28 July 2026. Value can leave, but nothing new goes in
- **Confusing Sapling and Unified addresses** — Sapling addresses start with `zs`. Unified addresses start with `u1` and bundle several receivers, so the pool your payment lands in depends on which receivers that address carries
- **Leaving funds in the Sprout pool** — Sprout has been deprecated for years; move those funds out
- **Expecting a migration to be completely invisible** — the amount crossing the turnstile is public, even though sender and receiver are not
- **Assuming t → z (shielding) is fully private** — the act of shielding itself is visible on-chain; the contents are not

---

## Related Pages

- [Ironwood](/zcash-tech/ironwood) — The upgrade that created the current pool
- [The Turnstile](/zcash-tech/the-turnstile) — How value moving between pools is audited
- [Wallets](/using-zcash/wallets) — Which wallets are maintained and Ironwood ready
- [Transactions](/using-zcash/transactions) — How to send shielded transactions
- [Buying ZEC](/using-zcash/buying-zec) — Acquiring ZEC before using it in pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — The cryptographic foundation of shielded pools
- [What is ZEC and Zcash](/start-here/what-is-zec-and-zcash) — Background on Zcash privacy
