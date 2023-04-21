# ZCash Shielded Pools 

We will be looking at four shielded Pools on ZCash which include Sprout, Sampling Pool, Orchard Pool and Transparent Pool. This wiki page will also cover the improvements in technology and some pool transfer best practices.


**Sprout**

![zcash-sprout-launch.png](https://user-images.githubusercontent.com/38798812/233546497-dff8d9c2-f61f-4213-9bba-ad6b48e40d9b.png)



The Sprout Series was the first ever open permissionless Zero Knowledge privacy protocol launched on ZCash and it is sometimes called ZCash 1.0 or "Ordinary ZCash". It was launched on the 28th of October, [2016](tel:2016) and it was the first version of ZCash which uses zero-knowledge proof technology which is an important feature of ZCash Cryptography. 


Sprout addresses are identified by their first two letters which is always "zc" and It was named "Sprout" for the major purpose of emphasising that the software was young, budding blockchain with great potential to grow and  opened for development. The Sprout series was used as an early tool for [ZCash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) which brought about the distribution of ZEC and Block rewards for Miners. 

As the ZCash ecosystem continue  to expand with increasing number of shielded transactions, it was observed that the ZCash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 


**ZCash Sapling** 

![zcash-sapling-vertical-fullcolor-2x.png](https://user-images.githubusercontent.com/38798812/233546558-1d701c90-cd74-466f-9e23-85cca30ca371.png)



[ZCash Sapling](https://z.cash/upgrade/sapling) is an upgrade to the Zcash cryptocurrency protocol which was introduced on 28th of October, [2018](tel:2018). It is a major improvement over the earlier version of the ZCash protocol known as Sprout Series which had some limitations in terms of privacy, efficiency and usability. 

Some of the upgrades include improved Performance for shielded addresses, Improved viewing keys to enable users view incoming and outgoing transactions without exposing user private keys and Independent Zero Knowledge keys for hardware wallet during transaction signature. 

ZSapling uses a new zero-knowledge proof system called zk-SNARKs (zero-knowledge succinct non-interactive arguments of knowledge), which allows for much faster and more efficient private transactions on the ZCash blockchain. ZCash Sapling also enable users to perform private transactions in just a few seconds when compared to the longer duration it took in Sprout Series. 

ZCash Sapling also make use of transaction shielding features to enhance privacy, making it difficult for third-parties to link ZCash transactions and determine the amount of ZEC being transferred by users. Also, ZSapling improves usability by reducing the computational requirements for generating private transactions by making it more accessible to users.

ZSapling wallet address always begin with "zs" and this can be observed in all supported ZCash Shielded Wallet (Y-Wallet, Zingo Wallet etc..) which has built-in ZSapling addresses in them. Zcash Sapling represents a significant development in ZCash technology when it comes to privacy and efficiency of Zcash transactions which makes it a more practical and effective cryptocurrency for users who value privacy and security.

**Orchard Pool**
Orchard is a new high privacy-preserving technology that is being developed for the Zcash Cryptocurrency Network. The Orchard Shielded Pool was launched on the 31st of May, [2022](tel:2022). Orchard address is sometimes called Unified Address (UA) and the Orchard Shielded Pool serves as a significant enhancement to the existing shielded Pools and it forms a separate anonymity set from the Sprout and Sapling Shielded Pools which helps to increase user privacy and anonymity by allowing users to send and receive ZEC anonymously on the ZCash Network. 

Transactions within Orchard will increase the size of the anonymity set more rapidly than transactions done with Sapling, due to the arity-hiding nature of Orchard actions. The Orchard upgrade will help to bring more improvements to the Zcash network including faster and more efficient transactions, increased privacy and anonymity, improved security and greater flexibility for developers to build decentralized Applications on the ZCash Blockchain. 



![IMG_20230419_221707.jpg](https://user-images.githubusercontent.com/38798812/233546629-feede2d6-791b-4762-a4c2-f6e63e350d91.jpg)


ZCash Shielded wallets are now integrating Orchard Pools on their Fund Pool option. A good example can be found on the Zingo Wallet App. 


**ZCash Transparent** 
The ZCash Transparent are unshielded and non private transaction on the ZCash Blockchain. Transparent wallet address on ZCash mostly start with the letter "t" and privacy is very low in this type of transaction. Transparent transactions in Zcash are similar to Bitcoin transaction which supports multi-signature transactions and they make use of  standard public addresses that can be sent and received by anyone on the network.

![IMG_20230420_100149.jpg](https://user-images.githubusercontent.com/38798812/233546681-81a86f22-76e5-4034-a0df-b2cb22d16def.jpg)



The ZCash Transparent are mostly used by centralized exchanges to ensure there's high transparency and network confirmation when sending and receiving ZEC between users. It's also important to note that while ZCash Shielded addresses provides high privacy during transactions, they also require more computational resources to process transactions. Therefore, some users may adopt Transparent addresses for transactions which doesn't require the same level of privacy.

---
### 

# Pool Transfer Recommended Practice
When it comes to considering high level of privacy during transaction on the ZCash Network, it's recommended you follow the below practices;

![20230420_051415_0000.png](https://user-images.githubusercontent.com/38798812/233546739-e9076b2d-bcb5-40a1-96a8-25284dff0786.png)

Transaction occurring between "z to z" wallets on the ZCash blockchain are mostly shielded and it is sometimes called Private Transaction due to the high level of Privacy generated. This is usually the best and the most recommended way of sending and receiving $ZEC when privacy is required. 

---
![20230421_070131_0000.png](https://user-images.githubusercontent.com/38798812/233552931-d69f4ef3-b065-4d61-8e6b-adbc2edc4d70.png)

When you send ZEC from "z-address" to "t-address", it simply connotes a form of Deshielding transaction. In this type of transaction, the privacy level is not always high as some information will be visible on the blockchain due to the effect of sending ZEC on a Transparent Address. Deshielding transaction is not always recommended when high privacy is required. 

---

![20230421_071247_0000.png](https://user-images.githubusercontent.com/38798812/233555082-455fbcbd-c685-4c1d-91f2-2d911e6a6273.png)

Transferring ZEC from a Transparent Address (t-address) to a z-address is simply known as Shielding. In this type of transaction the level of privacy is not always high when compared to that of a z-z transaction but it is also recommended when privacy is required. 



---

![20230420_091346_0000.png](https://user-images.githubusercontent.com/38798812/233546890-5580a7b9-e8c5-4e2c-a248-3f6338bbe0d1.png)

Sending ZEC from a Transparent Address (t-address) to another Transparent Address (t-address) on ZCash Network (T-T transaction) is very similar to that of Bitcoin transaction and this is why T-T transactions on ZCash are always called Public transactions because both the sender and the receiver transaction details becomes visible to the public which makes the level of Privacy very low in such transaction. Most Cryptocurrency Centralized exchanges make use of Transparent Address ("t-address) when it comes to transacting on the ZCash blockchain but this type of transaction (T-T) is not always recommended for high privacy. 


