<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ṣiṣẹpọ apamọwọ Zcash

## TL;DR

* Nitoripe awọn iṣowo Zcash ti o ni aabo fi awọn alaye wọn pamọ, olupin kan ko le wo apo apamọwọ kan ni ọna ti o le ṣe fun awọn owó ti o han gbangba bi Bitcoin tabi Ethereum.
* Awọn apamọwọ ina ṣe igbasilẹ awọn bulọọki kekere lati ọdọ olupin pataki kan (lightwalletd) ati ṣatunṣe data ti o yẹ funrararẹ pẹlu awọn bọtini ikọkọ wọn.
* Ṣíṣàmúlò àwọn àlàfo wọ̀nyẹn máa ń gba àkókò, nítorí náà, àwọn pọ́ọ̀sì máa ń lo àwọn ọ̀nà ìfọwọ́sowọ́pọ̀ tó yára kánkán láti jẹ́ kí o tètè lo owó rẹ.
* Awọn ọna ti o ṣe akiyesi: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync, ati DAGSync ti a dabaa.
* Àwọn ọ̀nà wọ̀nyí sábà máa ń fi àfikún ìrántí tàbí agbára ìṣiṣẹ́ ṣe pàṣípààrọ̀ fún ìfiwéra tí ó yára kánkán.

## Àlàyé Ìjìnlẹ̀

### Bí Zcash ṣe ń ṣiṣẹ́ pa pọ̀

Zcash uses zero-knowledge proofs to shield transaction details from unauthorized parties. This privacy makes syncing harder for light wallets because they do not store the full blockchain locally and instead rely on a server for the necessary information. With Bitcoin or Ethereum, servers can index the blockchain and return account data quickly. But with Zcash, the server cannot see transaction details. So how can a light wallet sync its balance and history without downloading and decrypting the entire blockchain itself?

Zcash solves this problem by combining multiple approaches. It has a specialized server, lightwalletd, that filters data from a full node and keeps only what's needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets first download these compact blocks from the lightwalletd server and then decrypt them with their private keys.

Kódà kíkọ̀ǹpútà tí wọ́n fi ń ṣe àdàkọ àwọn ìdìpọ̀ tó díjú yìí lè gba àkókò tó pọ̀ gan-an, àgàgà nígbà tí ọ̀pọ̀lọpọ̀ ìnáwó bá wà nínú ìdìpọ̀ kan. Nítorí náà, àwọn pọ́ọ̀sì máa ń lo onírúurú ọ̀nà láti mú kí ìfọwọ́sowọ́pọ̀ yá kánkán, kí o sì lè lo owó rẹ ní kíákíá.

## Àwòrán / Àfiwé

Think of the blockchain as a huge mailroom full of locked boxes. With a transparent coin, the mailroom clerk can read the labels and instantly tell you which boxes are yours. With Zcash, the labels are hidden — so your wallet has to take its keys and quietly check the boxes itself to find the ones it can open. The syncing methods below are different strategies for checking those boxes faster.

## Wọ inú Òkun Jìn

### Ìmúṣiṣẹ́pọ̀ Warp

Warp sync jẹ ẹya YWallet ti o foju awọn igbesẹ arin ti decrypting ati sisẹ bulọọki kọmpatọ kọọkan, n fo taara si abajade ipari.

Láti ṣe èyí, ó máa ń lo ìmọ̀ ìṣirò àti ìmọ̀ ìkọ̀wé láti ṣírò ohun tó máa jẹ́ àbájáde rẹ̀ láìsí pé ó ní láti gbé ìgbésẹ̀ kọ̀ọ̀kan.

Warp sync can process thousands of blocks per second, much faster than the usual synchronization method. This means that YWallet users can enjoy fast and smooth performance, even with hundreds of thousands of transactions and received notes in their accounts.

Yàtọ̀ sí ọ̀nà tí a fi ń fo ìgbésẹ̀ yìí, YWallet lè ṣe àdàkọ ọ̀pọ̀lọpọ̀ ìdìpọ̀ lẹ́ẹ̀kan náà, tí ó ń pín ẹrù náà káàkiri àwọn ohun èlò tí o ní láti mú kí ètò náà yára sí i.

Ka siwaju lori [Warp Sync](https://ywallet.app/warp/)

### Lo-ṣaaju ki o to ṣepọ

Spend-before-sync is a new feature in the Zcash Mobile Wallet SDK V2 that allows users to instantly spend funds upon opening their wallet, without waiting for full wallet synchronization. This feature speeds up the discovery of the wallet's spendable balance and improves the user experience.

Spend-before-sync works by using a compact-blocks synchronization algorithm that processes blocks from the lightwalletd server in a non-linear order. This means that instead of waiting for one block to be fully processed before moving on, wallets can use a bit more memory and processing power to scan different sections of the blockchain. Usually, it scans different ranges, looking for newer transactions while the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available immediately.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync ì í ë ¤

Ti a ṣe agbekalẹ nipasẹ ẹgbẹ Zecwallet, Blaze sync jẹ alugoridimu isọdọkan fun awọn apamọwọ ina ti o ṣawari blockchain pada, bẹrẹ pẹlu giga julọ, bulọọki to ṣẹṣẹ julọ ati ṣiṣẹ sẹhin.

This allows the wallet to find spent notes before received ones, while making previously unspent notes available without waiting for the full synchronization process to finish.

Besides that, it uses Out-of-Order Sync by decoupling the components of the sync from each other — downloading blocks, performing trial decryptions, and updating witnesses — and processing them in parallel. This takes more memory and CPU resources but increases sync speed by X5.

### DAGSync

DAGSync is a proposed synchronization algorithm that aims to improve the user experience of Zcash shielded wallets by speeding up synchronization.

Ó ń lo [Directed Acyclic Graph (DAG) ]](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) to represent the dependencies among notes, witnesses, and nullifiers in a Zcash wallet.

A DAG is a data structure that consists of nodes and edges, where each edge has a direction that indicates a relationship between two nodes. A DAG has no cycles, meaning that there is no way to start from a node and follow the edges back to the same node.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Àwọn Ohun Tó Yẹ Ká Ṣe

O yanilenu, gbogbo awọn ọna ṣiṣe wọnyi ni ifọkansi lati koju awọn ibeere ti o dide nipasẹ Aabo Zcash ni ifiweranṣẹ rẹ lori [Awọn ifiranṣẹ Ikọkọ ti a le ṣe iwọn](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) and its relationship with private payment systems. Some even take the extra step of downloading all memo data from servers, except for data exclusive to an address, increasing privacy at the cost of a bit of extra resources.

Also, the Zcash Foundation has been looking at other alternatives to improve the performance of light wallets. That is the case with [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), ìpilẹ̀ṣẹ̀ kan tí àjọ náà ti ń kẹ́kọ̀ọ́  láti mọ̀ bóyá ó pèsè ojútùú tó ṣeé ṣe fún àwọn ìṣòro iṣẹ́ tí ó wáyé láìpẹ́ yìí tí ó kan àwọn oníṣe àpò Zcash.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀

**Atipe olupin lightwalletd mọ iwontunwonsi rẹ.** Olupese naa nfunni awọn bulọọki ti o nipọn nikan; apamọwọ rẹ ṣii ati tumọ wọn ni agbegbe pẹlu awọn bọtini tirẹ.

**Stopping sync too early.** Some methods make recent spendable funds available before a full sync completes, but older history and notes may still be in progress.

**Gbígbé àfiwé ìfọwọ́sowọ́pọ̀ Zcash ní tààràtà sí ìfẹnusọ̀rọ̀ aláwọ̀ rírántí.** Ọ̀nà díẹ̀díẹ̀ lè jẹ́ iye tí ó ná láti pa àṣírí mọ́, kì í ṣe àbùkù  àpòòwé náà ń ṣe iṣẹ́ tí olùpèsè owó ti gbogbo ènìyàn yóò ṣe nípa kíka àkọọ́lẹ̀ rẹ ní gbangba.


## Àwọn ojúewé tó tan mọ́ ọn

- [Awọn Nọ́ọ̀dù Lightwallet](/zcash-tech/lightwallet-nodes)  awọn lightwalletd amayederun ti imọlẹ wallets gbekele lori.
- [Àwọn Kọ́kọ́rọ́ Ìwòye](/zcash-tech/viewing-keys)  àwọn kókó tí àwọn àpamọ́wọ́ ń lò láti fi mọ àwọn owó ìdókòwò wọn kí wọ́n sì tú wọn.
- [Pepper Sync](/zcash-tech/pepper-sync)  ọ̀nà mìíràn láti ṣe àpapọ̀ àpò Zcash.
- [Àmì ojúewé FROST](/zcash-tech/frost)  àṣẹ ìforúkọsílẹ̀ tí a pín fún ZEC tí ó ní ààbò.
