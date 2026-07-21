<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Syncing

## TL;DR

* Because shielded Zcash transactions hide their details, a server cannot simply look up a wallet’s balance the way it can for transparent coins like Bitcoin or Ethereum.
* Light wallets download small “compact blocks” from a specialized server (lightwalletd) and decrypt the relevant data themselves with their private keys.
* Decrypting and processing those blocks takes time, so wallets use faster syncing methods to let you use your funds sooner.
* Notable approaches: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), and the proposed DAGSync.
* These methods generally trade extra memory or processing power for faster synchronization.

## Core Explanation

### How Zcash syncing works

Zcash uses zero-knowledge proofs to shield transaction details from unauthorized parties. This privacy makes syncing harder for light wallets because they do not store the full blockchain locally and instead rely on a server for the necessary information. With Bitcoin or Ethereum, servers can index the blockchain and return account data quickly. But with Zcash, the server cannot see transaction details. So how can a light wallet sync its balance and history without downloading and decrypting the entire blockchain itself?

Zcash solves this problem by combining multiple approaches. It has a specialized server, lightwalletd, that filters data from a full node and keeps only what's needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets first download these compact blocks from the lightwalletd server and then decrypt them with their private keys.

Even decrypting and processing these compact blocks can take significant time, especially when there are many transactions per block. So wallets use different methods to speed up synchronization and let you use your funds as soon as possible.

## Visual / Analogy

Think of the blockchain as a huge mailroom full of locked boxes. With a transparent coin, the mailroom clerk can read the labels and instantly tell you which boxes are yours. With Zcash, the labels are hidden — so your wallet has to take its keys and quietly check the boxes itself to find the ones it can open. The syncing methods below are different strategies for checking those boxes faster.

## Deep Dive

### Warp Sync

Warp sync is a YWallet feature that skips the intermediate steps of decrypting and processing each compact block, jumping directly to the final result.

To do so, it uses mathematics and cryptography to calculate the final result without going through each step.

Warp sync can process thousands of blocks per second, much faster than the usual synchronization method. This means that YWallet users can enjoy fast and smooth performance, even with hundreds of thousands of transactions and received notes in their accounts.

Aside from this step-skipping technique, YWallet can process multiple blocks simultaneously, distributing the load across your available hardware to make the process even faster.

Read More on [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync is a new feature in the Zcash Mobile Wallet SDK V2 that allows users to instantly spend funds upon opening their wallet, without waiting for full wallet synchronization. This feature speeds up the discovery of the wallet's spendable balance and improves the user experience.

Spend-before-sync works by using a compact-blocks synchronization algorithm that processes blocks from the lightwalletd server in a non-linear order. This means that instead of waiting for one block to be fully processed before moving on, wallets can use a bit more memory and processing power to scan different sections of the blockchain. Usually, it scans different ranges, looking for newer transactions while the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available immediately.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Developed by the Zecwallet team, Blaze sync is a synchronization algorithm for light wallets that scans the blockchain backward, starting with the highest, most recent block and working backward.

This allows the wallet to find spent notes before received ones, while making previously unspent notes available without waiting for the full synchronization process to finish.

Besides that, it uses Out-of-Order Sync by decoupling the components of the sync from each other — downloading blocks, performing trial decryptions, and updating witnesses — and processing them in parallel. This takes more memory and CPU resources but increases sync speed by X5.

### DAGSync

DAGSync is a proposed synchronization algorithm that aims to improve the user experience of Zcash shielded wallets by speeding up synchronization.

It uses a [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) to represent the dependencies among notes, witnesses, and nullifiers in a Zcash wallet.

A DAG is a data structure that consists of nodes and edges, where each edge has a direction that indicates a relationship between two nodes. A DAG has no cycles, meaning that there is no way to start from a node and follow the edges back to the same node.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Practical Implications

Interestingly, all these mechanisms aim to address the questions raised by Zcash Security in its post on [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) and its relationship with private payment systems. Some even take the extra step of downloading all memo data from servers, except for data exclusive to an address, increasing privacy at the cost of a bit of extra resources.

Also, the Zcash Foundation has been looking at other alternatives to improve the performance of light wallets. That is the case with [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), a construction the foundation has been studying “to determine whether it offers a potential solution to the recent performance problems that have affected Zcash wallet users.”

## Common Mistakes

**Assuming the lightwalletd server knows your balance.** The server only delivers compact blocks; your wallet decrypts and interprets them locally with your own keys.

**Stopping sync too early.** Some methods make recent spendable funds available before a full sync completes, but older history and notes may still be in progress.

**Comparing Zcash sync directly to transparent-chain sync.** A slower path can be the cost of preserving privacy, not a flaw — the wallet is doing work that a public-coin server would otherwise do by reading your account openly.


## Related Pages

- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — the lightwalletd infrastructure that light wallets rely on.
- [Viewing Keys](/zcash-tech/viewing-keys) — the keys wallets use to detect and decrypt their own notes.
- [Pepper Sync](/zcash-tech/pepper-sync) — another approach to Zcash wallet synchronization.
- [FROST](/zcash-tech/frost) — distributed signing authority for shielded ZEC.
