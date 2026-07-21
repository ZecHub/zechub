<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Syncing

## TL;DR

* Kwa sababu ulinzi Zcash shughuli kuficha maelezo yao, server haiwezi tu kuangalia juu ya mkoba usawa njia inaweza kwa sarafu uwazi kama Bitcoin au Ethereum.
* Pochi nyepesi download ndogo "compact blocks" kutoka server maalumu (lightwalletd) na decrypt data husika wenyewe na funguo zao binafsi.
* Kufafanua na kusindika vitalu hivyo huchukua muda, kwa hiyo pochi hutumia mbinu za upatanisho wa haraka zaidi ili kukuwezesha kutumia fedha zako mapema.
* Njia mashuhuri: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync, na DAGSync iliyopendekezwa.
* Mbinu hizi kwa ujumla biashara ya kumbukumbu ya ziada au nguvu ya usindikaji kwa upatanisho wa haraka.

## Maelezo ya msingi

### Jinsi Zcash kusawazisha kazi

Zcash uses zero-knowledge proofs to shield transaction details from unauthorized parties. This privacy makes syncing harder for light wallets because they do not store the full blockchain locally and instead rely on a server for the necessary information. With Bitcoin or Ethereum, servers can index the blockchain and return account data quickly. But with Zcash, the server cannot see transaction details. So how can a light wallet sync its balance and history without downloading and decrypting the entire blockchain itself?

Zcash solves this problem by combining multiple approaches. It has a specialized server, lightwalletd, that filters data from a full node and keeps only what's needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets first download these compact blocks from the lightwalletd server and then decrypt them with their private keys.

Hata decrypting na usindikaji hizi vitalu compact inaweza kuchukua muda mkubwa, hasa wakati kuna shughuli nyingi kwa kila block. Hivyo pochi kutumia mbinu tofauti ili kuharakisha usawazishaji na kuruhusu kutumia fedha yako haraka iwezekanavyo.

## Visual / Ulinganisho

Think of the blockchain as a huge mailroom full of locked boxes. With a transparent coin, the mailroom clerk can read the labels and instantly tell you which boxes are yours. With Zcash, the labels are hidden — so your wallet has to take its keys and quietly check the boxes itself to find the ones it can open. The syncing methods below are different strategies for checking those boxes faster.

## Kuzama kwa Kina

### Utaratibu wa Warp

Warp usawazishaji ni kipengele YWallet kwamba skips hatua za kati ya decrypting na usindikaji kila block compact, kuruka moja kwa moja kwa matokeo ya mwisho.

Ili kufanya hivyo, hutumia hesabu na maandishi ya siri kuhesabu matokeo ya mwisho bila kupitia kila hatua.

Warp sync can process thousands of blocks per second, much faster than the usual synchronization method. This means that YWallet users can enjoy fast and smooth performance, even with hundreds of thousands of transactions and received notes in their accounts.

Mbali na mbinu hii ya kuruka hatua, YWallet inaweza kuchakata vitalu vingi kwa wakati mmoja, kusambaza mzigo kwenye vifaa vyako vinavyopatikana ili kufanya mchakato uwe wa haraka zaidi.

Soma Zaidi juu ya [Warp Sync](https://ywallet.app/warp/)

### Matumizi-kabla-ya-usawazishaji

Spend-before-sync is a new feature in the Zcash Mobile Wallet SDK V2 that allows users to instantly spend funds upon opening their wallet, without waiting for full wallet synchronization. This feature speeds up the discovery of the wallet's spendable balance and improves the user experience.

Spend-before-sync works by using a compact-blocks synchronization algorithm that processes blocks from the lightwalletd server in a non-linear order. This means that instead of waiting for one block to be fully processed before moving on, wallets can use a bit more memory and processing power to scan different sections of the blockchain. Usually, it scans different ranges, looking for newer transactions while the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available immediately.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Mshikamano wa Blaze

Zilizotengenezwa na Zecwallet timu, Blaze sync ni ushirikiano algorithm kwa ajili ya mkoba mwanga kwamba scans blockchain nyuma, kuanzia na juu, karibuni kuzuia na kufanya kazi nyuma.

Hii inaruhusu mkoba kupata noti zilizotumika kabla ya zile zilizopokelewa, wakati wa kufanya noti ambazo hazikutumiwa hapo awali bila kusubiri mchakato kamili wa usawazishaji kumaliza.

Besides that, it uses Out-of-Order Sync by decoupling the components of the sync from each other — downloading blocks, performing trial decryptions, and updating witnesses — and processing them in parallel. This takes more memory and CPU resources but increases sync speed by X5.

### DAGSync

DAGSync ni mapendekezo ya usawazishaji algorithm ambayo inalenga kuboresha uzoefu wa mtumiaji wa Zcash wallets kulindwa kwa kuongeza kasi ya usawa.

Inatumia [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) kuwakilisha utegemezi kati ya noti, mashahidi, na nullifiers katika mkoba Zcash.

DAG ni muundo wa data ambayo inajumuisha nodes na kingo, ambapo kila kingo ina mwelekeo kwamba inaonyesha uhusiano kati ya nodes mbili. DAG haina mizunguko, maana yake ni kwamba hakuna njia ya kuanza kutoka node na kufuata kingo nyuma kwa node sawa.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Matokeo ya Kihalisi

Kwa kushangaza, taratibu hizi zote zina lengo la kushughulikia maswali yaliyotolewa na Zcash Usalama katika post yake juu ya [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) and its relationship with private payment systems. Some even take the extra step of downloading all memo data from servers, except for data exclusive to an address, increasing privacy at the cost of a bit of extra resources.

Pia, Zcash Foundation imekuwa kuangalia mbadala nyingine ya kuboresha utendaji wa mikoba mwanga. Hiyo ni kesi na [Oblivious Ujumbe Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), ujenzi taasisi imekuwa kusoma kuamua kama inatoa ufumbuzi uwezo wa matatizo ya utendaji ya hivi karibuni ambayo yameathiri watumiaji wa mkoba Zcash.

## Makosa ya Kawaida

** Kudhani lightwalletd server anajua mizani yako.** Server tu hutoa vitalu compact; mkoba wako decrypts na tafsiri yao ndani ya nchi na funguo yako mwenyewe.

**Kukomesha usawazishaji mapema sana.** Mbinu fulani hufanya fedha za hivi karibuni zinazotumika zipatikane kabla ya usawazisho kamili kukamilika, lakini historia ya zamani na maelezo bado yanaweza kuwa yanaendelea.

**Kulinganisha Zcash usawazishaji moja kwa moja na uwazi-mnyororo usawazisho.** Njia polepole inaweza kuwa gharama ya kuhifadhi faragha, si kasoro  mkoba ni kufanya kazi ambayo umma-sarafu server ingekuwa vinginevyo kufanya kwa kusoma akaunti yako wazi.


## Kurasa Zinazohusiana

- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)  lightwalletd miundombinu kwamba mwanga pochi kutegemea.
- [Kuona funguo](/zcash-tech/viewing-keys)  funguo pochi kutumia kugundua na decrypt noti zao wenyewe.
- [Pepper Sync](/zcash-tech/pepper-sync)  mbinu nyingine ya Zcash mkoba usawazishaji.
- [FROST](/zcash-tech/frost)  kusambazwa kusaini mamlaka kwa ZEC shielded.
