<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mmekọrịta obere akpa Zcash

## TL;DR

* N'ihi na azụmahịa Zcash kpuchiri ekpuchi na-ezochi nkọwa ha, ihe nkesa enweghị ike ịchọ naanị obere akpa ego dị ka ọ nwere ike maka mkpụrụ ego doro anya dịka Bitcoin ma ọ bụ Ethereum.
* Obere obere akpa ego na-ebudata obere "mkpokọta kọmpat" site na ihe nkesa pụrụ iche (lightwalletd) ma mebie data dị mkpa n'onwe ha na igodo nzuzo ha.
* Decrypting and processing those blocks takes time, so wallets use faster syncing methods to let you use your funds sooner.
* Ụzọ ndị a ma ama: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync, na DAGSync a tụrụ aro.
* Ụzọ ndị a na-ejikarị nchekwa nchekwa ma ọ bụ ike nhazi maka ngwa ngwa ngwa.

## Isi Nkọwa

### Otu Zcash syncing si arụ ọrụ

Zcash uses zero-knowledge proofs to shield transaction details from unauthorized parties. This privacy makes syncing harder for light wallets because they do not store the full blockchain locally and instead rely on a server for the necessary information. With Bitcoin or Ethereum, servers can index the blockchain and return account data quickly. But with Zcash, the server cannot see transaction details. So how can a light wallet sync its balance and history without downloading and decrypting the entire blockchain itself?

Zcash solves this problem by combining multiple approaches. It has a specialized server, lightwalletd, that filters data from a full node and keeps only what's needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets first download these compact blocks from the lightwalletd server and then decrypt them with their private keys.

Even decrypting and processing these compact blocks can take significant time, especially when there are many transactions per block. So wallets use different methods to speed up synchronization and let you use your funds as soon as possible.

## Anya / Nkọwapụta

Think of the blockchain as a huge mailroom full of locked boxes. With a transparent coin, the mailroom clerk can read the labels and instantly tell you which boxes are yours. With Zcash, the labels are hidden — so your wallet has to take its keys and quietly check the boxes itself to find the ones it can open. The syncing methods below are different strategies for checking those boxes faster.

## Ịbanye n'Okpuru Mmiri

### Mmekọrịta Warp

Warp sync is a YWallet feature that skips the intermediate steps of decrypting and processing each compact block, jumping directly to the final result.

To do so, it uses mathematics and cryptography to calculate the final result without going through each step.

Warp sync can process thousands of blocks per second, much faster than the usual synchronization method. This means that YWallet users can enjoy fast and smooth performance, even with hundreds of thousands of transactions and received notes in their accounts.

Ewezuga usoro a na-agba ọsọ, YWallet nwere ike ịhazi ọtụtụ ngọngọ n'otu oge, na-ekesa ibu ahụ n'ofe ngwaike gị dịnụ iji mee ka usoro ahụ dị ngwa.

Gụkwuo na [Warp Sync](https://ywallet.app/warp/)

### Na-emefu tupu ịmekọrịta

Spend-before-sync is a new feature in the Zcash Mobile Wallet SDK V2 that allows users to instantly spend funds upon opening their wallet, without waiting for full wallet synchronization. This feature speeds up the discovery of the wallet's spendable balance and improves the user experience.

Spend-before-sync works by using a compact-blocks synchronization algorithm that processes blocks from the lightwalletd server in a non-linear order. This means that instead of waiting for one block to be fully processed before moving on, wallets can use a bit more memory and processing power to scan different sections of the blockchain. Usually, it scans different ranges, looking for newer transactions while the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available immediately.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Ọkụ Sync

Developed by the Zecwallet team, Blaze sync is a synchronization algorithm for light wallets that scans the blockchain backward, starting with the highest, most recent block and working backward.

This allows the wallet to find spent notes before received ones, while making previously unspent notes available without waiting for the full synchronization process to finish.

Besides that, it uses Out-of-Order Sync by decoupling the components of the sync from each other — downloading blocks, performing trial decryptions, and updating witnesses — and processing them in parallel. This takes more memory and CPU resources but increases sync speed by X5.

### DAGSync

DAGSync bụ algorithm synchronization a tụrụ aro nke na-achọ imeziwanye ahụmịhe onye ọrụ nke obere akpa Zcash echedoro site n'ịgba ọsọ mmekọrịta.

Ọ na-eji [Directed Acyclic Graph (DAG) ]](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) iji gosipụta ịdabere n'etiti ihe edeturu, ndị akaebe, na ndị na-emebi ihe na obere akpa Zcash.

A DAG is a data structure that consists of nodes and edges, where each edge has a direction that indicates a relationship between two nodes. A DAG has no cycles, meaning that there is no way to start from a node and follow the edges back to the same node.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Mmetụta Ndị Bara Uru

Interestingly, all these mechanisms aim to address the questions raised by Zcash Security in its post on [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) and its relationship with private payment systems. Some even take the extra step of downloading all memo data from servers, except for data exclusive to an address, increasing privacy at the cost of a bit of extra resources.

Ọzọkwa, Zcash Foundation nọ na-achọ ihe ndị ọzọ iji melite arụmọrụ nke obere akpa ego. Nke ahụ bụ ikpe na [Oblivious Message Retrieval (OMR) ]](https://zfnd.org/oblivious-message-retrieval/), ihe owuwu nke ntọala ahụ na-amụ iji chọpụta ma ọ na-enye ihe ngwọta nwere ike iji dozie nsogbu arụmọrụ na-adịbeghị anya nke metụtara ndị ọrụ obere akpa Zcash.

## Mmehie Ndị A Na-emekarị

**Assuming the lightwalletd server knows your balance.** The server only delivers compact blocks; your wallet decrypts and interprets them locally with your own keys.

**Stopping sync too early.** Some methods make recent spendable funds available before a full sync completes, but older history and notes may still be in progress.

**Itule Zcash sync ozugbo na uzo-mgbatị sync.** Ụzọ dị nwayọ nwere ike ịbụ ọnụahịa nke ichekwa nzuzo, ọ bụghị ntụpọ  obere akpa ahụ na-arụ ọrụ nke sava ego ọha na eze ga-eme site n'ịgụ akaụntụ gị n'ihu ọha.


## Peeji ndị metụtara ya

- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)  lightwalletd akụrụngwa nke obere akpa na-adabere.
- [Ịhụ Igodo](/zcash-tech/viewing-keys)  mkpịsị ugodi wallets na-eji achọpụta ma decrypt ha onwe ha edetu.
- [Pepper Sync]](/zcash-tech/pepper-sync)  ụzọ ọzọ maka ijikọ obere akpa Zcash.
- [FROST](/zcash-tech/frost)  kesaa ikike ịbịanye aka maka ZEC echedoro.
