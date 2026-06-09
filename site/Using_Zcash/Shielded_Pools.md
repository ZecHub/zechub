<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Value Pools 

## TL;DR

- Zcash currently has **4 value pools**: Sprout (legacy), Sapling, Orchard, and Transparent.
- **Orchard** is the current primary shielded pool used by Unified Addresses (u1...).
- **Sapling** (z-addresses starting with `zs`) remains widely supported and continues to secure a significant amount of shielded ZEC.
- **Transparent** addresses (t...) provide no transaction privacy and operate similarly to Bitcoin.
- **Sprout** is a legacy shielded pool that has been retired from active use.
- A future shielded pool known as **Ironwood** has been proposed to strengthen confidence in the integrity of the shielded ZEC supply while preserving privacy.
- For the strongest privacy guarantees, users should continue to prefer **shielded-to-shielded (z → z)** transactions whenever possible.


<br/>

## Understanding Zcash Value Pools

Zcash separates funds into distinct accounting systems known as value pools. Each pool has its own cryptographic rules and privacy properties, while the protocol tracks the total value moving between them.

Today, the network contains four primary value pools:

- Transparent — Public and fully visible on-chain.
- Sapling — The first widely adopted modern shielded pool.
- Orchard — The current primary shielded pool introduced with Unified Addresses.
- Sprout — The original shielded pool launched with Zcash in 2016.
  


As Zcash evolves, new shielded pools may be introduced to improve security, privacy, usability, and auditability while maintaining compatibility with existing funds.

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)


<br/>

## The Shielded Pools 


<h3 id="orchard" class="text-3xl font-bold my-4">Orchard</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)


The Orchard Shielded Pool was activated on May 31, 2022 as part of the NU5 network upgrade. Orchard introduced a new shielded protocol that eliminated the need for a trusted setup and became the primary shielded pool used by Unified Addresses (UAs).

Orchard significantly improved usability, efficiency, and privacy by reducing transaction metadata leakage and introducing a more flexible transaction model based on Actions rather than traditional shielded inputs and outputs.

Today, Orchard remains the primary shielded pool for Zcash. However, the community is evaluating a future migration to a new shielded pool called Ironwood, which would provide additional assurance regarding the integrity of the shielded ZEC supply while preserving Zcash's privacy guarantees.

[Zcash Shielded wallets](/site/Using_Zcash/Wallets) now support Orchard. 

____

<h3 id="sapling" class="text-3xl font-bold my-4">Sapling</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)


[Zcash Sapling](https://z.cash/upgrade/sapling) was an upgrade to the Zcash protocol introduced on 28th of October, 2018. It is a major improvement over the earlier version of the known as Sprout which had some limitations in terms of privacy, efficiency and usability. 

Some of the upgrades include improved performance for shielded addresses, Improved viewing keys to enable users view incoming and outgoing transactions without exposing user private keys and Independent Zero Knowledge keys for hardware wallet during transaction signature. 

Zcash Sapling enables users to perform private transactions in just a few seconds when compared to the longer duration it took in Sprout Series. 

Transaction shielding enhances privacy, making it impossible for third-parties to link transactions and determine the amount of ZEC being transferred. Sapling also improves usability by reducing the computational requirements for generating private transactions by making it more accessible to users.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

<h3 id="sprout" class="text-3xl font-bold my-4">Sprout</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)


Sprout was the first ever open permissionless Zero Knowledge privacy protocol ever launched. It was launched on the 28th of October, 2016.

Sprout addresses are identified by their first two letters which is always "zc". It was named "Sprout" for the major purpose of emphasising that the software was young, budding blockchain with great potential to grow and  opened for development. 

Sprout was used as an early tool for [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) which brought about the distribution of ZEC and Block rewards for Miners. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 


<h3 id="transparent" class="text-3xl font-bold my-4">Transparent</h3>


![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)


The Zcash Transparent pool is unshielded and non-private. Transparent wallet address on Zcash start with the letter "t", privacy is very low in using this address type for transactions.

Transparent transactions in Zcash are similar to Bitcoin transactions which supports multi-signature transactions and make use of standard public addresses.

The Zcash Transparent are mostly used by centralized exchanges to ensure there's high transparency and network confirmation when sending and receiving ZEC between users.

It's also important to note that while Zcash Shielded addresses provides high privacy during transactions, they also require more computational resources to process transactions. Therefore, some users may adopt Transparent addresses for transactions which doesn't require the same level of privacy.
____


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

---

## The Future: Ironwood

The Zcash community is currently evaluating a proposed shielded pool called Ironwood.

Ironwood is designed to address a recently discovered and patched vulnerability in Orchard's proving system. Although there is no evidence that the vulnerability was ever exploited, Ironwood would provide an additional layer of assurance by enabling a controlled migration from Orchard into a newly created shielded pool.

The goal is not to replace Zcash privacy, but to strengthen confidence in the integrity of the shielded ZEC supply.

## Under the proposal:

New shielded activity would gradually move into Ironwood.
Existing Orchard funds could be migrated privately.
Public turnstile accounting would provide stronger evidence that all shielded funds remain fully backed.
Users would retain the same privacy protections they expect from Zcash.

If activated through future network upgrades, Ironwood would become the next generation of Zcash's shielded ecosystem while preserving compatibility with existing shielded funds.


## Common Mistakes to Avoid

- **Sending from t-address to t-address** — fully public, no privacy. Always shield funds first.
- **Confusing Sapling and Orchard addresses** — Sapling addresses start with `zs`, Orchard/Unified addresses start with `u1`
- **Leaving funds in the Sprout pool** — Sprout is deprecated; migrate funds to Orchard
- **Assuming t → z (shielding) is fully private** — the act of shielding itself is visible on-chain; the contents are not

---

## Related Pages

- [Wallets](/using-zcash/wallets) — Which wallets support Orchard and Sapling pools
- [Transactions](/using-zcash/transactions) — How to send shielded transactions
- [Buying ZEC](/using-zcash/buying-zec) — Acquiring ZEC before using it in pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — The cryptographic foundation of shielded pools
- [What is ZEC and Zcash](/start-here/what-is-zec-and-zcash) — Background on Zcash privacy
