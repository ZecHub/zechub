

## Introduction

"Cryptocurrency exposes all your spending activities to the public since it's just like a twitter to your Bank account and this is a great issue that must be solved by adopting on chain privacy." - Ian Miers at [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certain crypto projects have gained recognition for their privacy-centric approaches. Zcash is renowned for employing Zero Knowledge Proofs (ZK) to protect transaction amounts and addresses. Monero stands out for its utilization of a Decoy-based sender obfuscation in combination with other encryption schemes to attain user privacy on the blockchain.

![](https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png)
## Understanding ZK Proofs and Decoy Based Systems

Zero Knowledge Proofs are cryptographic systems that allow one party (the prover) to demonstrate to another party (the verifier) the validity of a statement without revealing *any underlying information about the statement itself*. In the context of Zcash, ZK proofs are employed to verify the validity of a transaction without disclosing transaction details such as the SENDER, RECEIVER or transaction AMOUNT. 

**This ensures that user privacy is preserved as the transaction remains confidential while still being validated. This technology is designed to ensure the confidentiality of financial transactions on the Zcash network.**

In the Decoy-based systems such as [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), multiple transactions are combined making it challenging or difficult to trace the actual source and destination of funds. The algorithm introduces decoy inputs and outputs in transactions also employing encryption of the addresses used as inputs & using Range proofs to validate the amount transferred is spendable. 

This approach obfuscates the transaction trail. The use of decoy inputs makes it challenging for anyone analyzing the blockchain to identify the real sender, receiver, or transaction amount. 

**Important Note**: This method of on-chain privacy preserving transaction still explicity reveals (encrypted) inputs to all user transactions. Metadata such as the *FLOW OF TRANSACTIONS* between different users on the network can still be gathered. If an adversary actively participates in generating transactions on the network, it effectively deanonymises the decoy inputs of other users. 


## Advantages of ZK Over Decoy Based Systems

Both Zcash and Monero are privacy-focused cryptocurrencies, but they achieve privacy in different ways. 

Here are some advantages of Zcash's zero-knowledge proofs (ZK) over Monero's decoy system:

1) **Selective Disclosure**: With Zcash ZK feature set, users have the option to reveal transaction details to specific parties [Read ECC Blog on Selective Disclosure](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). In Zcash, shielded transactions' encrypted contents allow individuals to selectively reveal data from a particular transfer. Additionally, a viewing key can be provided to disclose all transactions associated with a specific shielded address. This feature allows for regulatory compliance and auditability without compromising the overall privacy of the network. 

While Monero's decoy algorithm (ring signature) helps in providing privacy, it does not offer *selective* disclosure in the same way.
![](https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png)

2) **Optional Visibility**: Zcash allows users to choose between transparent (non-private) and shielded (private) transactions. This connotes that Zcash offers users the flexibility to either keep their financial information private (shielded) or make it transparent and publicly available similar to most other blockchains as explained on [Zcash official website](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). This opt-in privacy allows for greater flexibility and business/organisational relevant use cases, as some transactions may require less privacy for public scrutiny, while others benefit from enhanced privacy.


3) **Anonymity Set**: The [anonymity set](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) of zero knowledge shielded pools comprises all transactions that have *ever* occurred. This is significantly larger than most other on-chain techniques for achieving transaction unlinkability. Note: this only applies to transactions within the same shielded pool.

The use of decoys does increase the anonymity set. However this approach is dependent entirely on the number of *real* users on the network. 

4) **No Trusted Setup**: Zcash's Sprout & Sapling setup utilized a multi-party computation known as the "trusted setup ceremony". The recent NU5 upgrade did not require any Trust in the integrity of the zero knowledge circuit's setup. [Read ECC Blog on NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Data Privacy**: The [zk-SNARK technology](https://wiki.zechub.xyz/zcash-technology) used in Zcash's shielded pools allows for significantly enhanced security for users. The reduction of metadata leakage on-chain means that users are safe from adversaries such as potential hackers or oppresive state bodies. 

There are a number of instances in which bugs have been identified in Monero's decoy selection algorithm. These bugs had potential lead to reveal user spends according to a report from [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


In summary what really matters the most is to reduce or eliminate the leak of user information and data as explained by Zooko at the [Orchid (priv8) AMA live session](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 

![](https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png)

____

***Reference Links***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



