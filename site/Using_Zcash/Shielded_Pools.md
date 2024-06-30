<a href="https://github.com/henryquincy/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Value Pools 

There are currently 4 [value pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html) in Zcash. Sprout, Sapling, Orchard and Transparent. 


## Shielded Pools

![Zcash Orchard](https://i.ibb.co/tZ9zVVx/image-2024-02-03-172700611.png)

The Orchard Shielded Pool was launched on the 31st of May, 2022. Orchard addresses are also known as Unified Addresses (UA). 

Orchard did not require any trusted setup and is therefore among the most advanced, safest & verfiable zero knowledge payment systems thanks to the technological breakthrough by Sean Bowe and engineers at the Electric Coin Company. 

Because Unified addresses combine receivers for Orchard, Sapling & Transparent addresses the amount of funds stored within shielded is expected to rise significantly. There is no way to distinguish between funds being sent to Transparent/Shielded pools. 

The Orchard Shielded Pool serves as a significant enhancement to the existing pools. It forms a separate anonymity set from the Sprout and Sapling Shielded Pools.

Transactions within Orchard will improve the reduction of transaction metadata & anonymity with Orchard 'Actions' versus UTXO inputs & outputs. 

[Zcash Shielded wallets](/site/Using_Zcash/Wallets) now support Orchard. 

____

![Sapling](https://i.ibb.co/5c5Wp1G/image-2024-02-03-172752332.png)

[Zcash Sapling](https://z.cash/upgrade/sapling) was an upgrade to the Zcash protocol introduced on 28th of October, 2018. It is a major improvement over the earlier version of the known as Sprout which had some limitations in terms of privacy, efficiency and usability. 

Some of the upgrades include improved performance for shielded addresses, Improved viewing keys to enable users view incoming and outgoing transactions without exposing user private keys and Independent Zero Knowledge keys for hardware wallet during transaction signature. 

Zcash Sapling enables users to perform private transactions in just a few seconds when compared to the longer duration it took in Sprout Series. 

Transaction shielding enhances privacy, making it impossible for third-parties to link transactions and determine the amount of ZEC being transferred. Sapling also improves usability by reducing the computational requirements for generating private transactions by making it more accessible to users.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

## Transparent 

The Zcash Transparent pool is unshielded and non-private. Transparent wallet address on Zcash start with the letter "t", privacy is very low in using this address type for transactions.

Transparent transactions in Zcash are similar to Bitcoin transactions which supports multi-signature transactions and make use of standard public addresses.

The Zcash Transparent are mostly used by centralized exchanges to ensure there's high transparency and network confirmation when sending and receiving ZEC between users.

It's also important to note that while Zcash Shielded addresses provides high privacy during transactions, they also require more computational resources to process transactions. Therefore, some users may adopt Transparent addresses for transactions which doesn't require the same level of privacy.
____



![Sprout](https://i.ibb.co/7StKLRT/image-2024-02-03-172822692.png)

Sprout was the first ever open permissionless Zero Knowledge privacy protocol ever launched. It was launched on the 28th of October, 2016.

Sprout addresses are identified by their first two letters which is always "zc". It was named "Sprout" for the major purpose of emphasising that the software was young, budding blockchain with great potential to grow and  opened for development. 

Sprout was used as an early tool for [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) which brought about the distribution of ZEC and Block rewards for Miners. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 


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


