# Zcash Wallet Syncing

### How Zcash syncing works

To understand how warp sync works, let me explain a bit more about Zcash and Ycash. These are privacy-oriented cryptocurrencies that use a technology called zero-knowledge proofs to shield the details of transactions from anyone who is not authorized to see them. This means that the transactions recorded on the blockchain are encrypted or hidden, and only the sender and receiver can decrypt them with their private keys.

However, this also poses a challenge for light wallets, which are applications that do not store the entire blockchain data on the device, but rely on a server to provide them with the necessary information. With non-privacy coins, such as Bitcoin or Ethereum, the server can easily index the blockchain and keep a database of every account. When a light wallet asks for its specific account data, the server can quickly return it.

But with  Zcash, the server cannot do that, because it cannot see the details of the transactions. So how can a light wallet synchronize its account balance and transaction history without downloading and decrypting the entire blockchain data itself?

Zcash solves this problem by using a mixed approach. It has a specialized server called lightwalletd that filters the data from a full zcashd node and keeps only the data needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets only have to download these compact blocks from the lightwalletd server, and then decrypt them themselves with their private keys.

However, even decrypting and processing these compact blocks can take a significant amount of time, especially if there are many transactions in each block. So every wallet has its own alternative method to speed up the syncronization process so you can use your funds as soon as possible.

### Warp Sync
Warp sync is a feature of YWallet that allows it to skip the intermediate steps of decrypting and processing each compact block, and instead jump directly to the final result.

To do so it uses some clever mathematics and cryptography to calculate the final result without having to go through each step. It’s like solving a puzzle without looking at all the pieces, but only at the final picture. It’s not magic, but it’s very smart.

Warp sync can process thousands of blocks per second, much faster than the usual synchronization method. This means that YWallet users can enjoy fast and smooth performance, even with hundreds of thousands of transactions and received notes in their accounts.

Aside from this "step skipping" technique, YWallet is also capable of processing various blocks at the same time, distributing the load on your available hardware, making the process even faster.

## Spend-before-sync
Spend-before-sync is a new feature implemented in Zcash Mobile Wallet SDK V2, that allows users to instantly spend funds upon opening their wallet, without having to wait for a full wallet synchronization. This feature speeds up discovering the wallet’s spendable balance and improves the user experience.

Spend-before-sync works by using a compact blocks synchronization algorithm that processes blocks from the lightwalletd server in non-linear order, this means that instead of waiting for a block to be processed before moving to the other, wallets can now use a bit more memory and processing power to scan different sections of the blockchain. Usually it will scan in different ranges, looking for newer transactions at the same time the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available inmediately.

![Spend Before Spend](https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca)


### Blaze Sync
Developed by Zecwallet team, Blaze sync is a syncronization algorithm for light wallets that starts scanning the blockchain "backwards", starting from the highest, most recent block, and going back from there.

This allows the wallet to find spent notes before received ones, while making available the ones already unspent, without waiting for the complete syncronization process to finish.

Besides  that, it uses Out of Order Sync, by decoupling "he components of the sync from each other - Downloading blocks, doing trial decryptions, updating witnesses", and processing them in paralell, taking some more memory and CPU resources, but increasing sync speed X5.

### DAGSync

DAGSync is a proposed syncronization algorithm that aims at improving the user experience of Zcash shielded wallets, by making the syncronization faster.

It is based on [the idea of using a Directed Acyclic Graph](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) (DAG) to represent the dependencies between notes, witnesses, and nullifiers in a Zcash wallet. 

A DAG is a data structure that consists of nodes and edges, where each edge has a direction that indicates a relationship between two nodes. A DAG has no cycles, meaning that there is no way to start from a node and follow the edges back to the same node.

![DAGSync](https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f)


---

Interestingly enough, all these mechanism try to solve the inquiries proposed by Zcash Security in its post about [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) and its relationship with private payment systems, some even taking the extra step of downloading all memo data from servers, except for those exclusive to an address, increasing privacy at the cost of a bit of extra resources.

Also, the Zcash Foundation has been looking at other alternatives to improve the performance of light wallets. That's the case with [Oblivious Message Retrieval (OMR](https://zfnd.org/oblivious-message-retrieval/)), a construction the foundation has been studying "to determine whether it offers a potential solution to the recent performance problems that have affected Zcash wallet users"
