<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Syncing (Usawazishaji wa Pochi za Kifedha)

## TL;DR

* Kwa sababu shughuli za Zcash zilizohifadhiwa huficha maelezo yao, seva haiwezi tu kuangalia salio la mkoba kama inavyoweza kwa sarafu wazi kama Bitcoin au Ethereum.
* Pochi nyepesi hupakua ndogo  vitalu vyenye nguvu ?? kutoka kwa seva maalum (lightwalletd) na kufuta data husika wenyewe na funguo zao za kibinafsi.
* Kufuta na kuchakata vitalu hivyo huchukua muda, kwa hiyo pochi hutumia mbinu za upatanisho wa haraka zaidi ili kukuwezesha kutumia fedha zako mapema.
* Njia mashuhuri: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync, na DAGSync iliyopendekezwa.
* Mbinu hizi kwa ujumla biashara ya kumbukumbu ziada au nguvu za usindikaji wa upatanisho haraka.

## Maelezo ya msingi

### Jinsi Zcash syncing kazi

Zcash uses zero-knowledge proofs to shield transaction details from unauthorized parties. This privacy makes syncing harder for light wallets because they do not store the full blockchain locally and instead rely on a server for the necessary information. With Bitcoin or Ethereum, servers can index the blockchain and return account data quickly. But with Zcash, the server cannot see transaction details. So how can a light wallet sync its balance and history without downloading and decrypting the entire blockchain itself?

Zcash solves this problem by combining multiple approaches. It has a specialized server, lightwalletd, that filters data from a full node and keeps only what's needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets first download these compact blocks from the lightwalletd server and then decrypt them with their private keys.

Hata decrypting na usindikaji hizi vitalu compact inaweza kuchukua muda mkubwa, hasa wakati kuna shughuli nyingi kwa block. Hivyo pochi kutumia mbinu tofauti ili kuharakisha usawazishaji na basi wewe matumizi ya fedha yako haraka iwezekanavyo.

## Visual / Ulinganisho

Fikiria blockchain kama mailroom kubwa kamili ya masanduku imefungwa. Kwa sarafu uwazi, ofisi wa chumba cha barua wanaweza kusoma maandiko na mara moja kukuambia ambayo sanduku ni yako. Pamoja Zcash, lebo zimefichwa  hivyo mkoba wako ina kuchukua funguo zake na kimya kuangalia masanduko yenyewe kupata wale inaweza kufungua. mbinu za kusawazisha chini ni mikakati tofauti kwa ajili ya kuangalia masandaoni hizo haraka zaidi.

## Kuzama kwa Kina Chini ya Maji

### Utaratibu wa Warp

Warp sync ni kipengele YWallet kwamba skips hatua za kati ya decrypting na usindikaji kila block compact, kuruka moja kwa moja matokeo ya mwisho.

Ili kufanya hivyo, hutumia hesabu na maandishi ya siri ili kukadiria matokeo bila kupitia kila hatua.

Warp sync inaweza mchakato maelfu ya vitalu kwa sekunde, kasi zaidi kuliko kawaida njia ushirikiano. Hii ina maana kwamba watumiaji YWallet wanaweza kufurahia utendaji wa haraka na laini, hata pamoja mamia ya maelfu za shughuli na noti kupokea katika akaunti zao.

Mbali na mbinu hii ya kuruka hatua, YWallet inaweza mchakato vitalu mbalimbali kwa wakati mmoja, kusambaza mzigo katika vifaa yako inapatikana kufanya mchakati hata kasi.

Soma Zaidi juu ya [Utaratibu wa Warp](https://ywallet.app/warp/)

> Warp sync ni ilivyoelezwa hapa kama mbinu ya kusawazisha. Ywallet yenyewe tena kudumishwa na si itakuwa updated kwa Ironwood, hivyo siyo mkoba wa kufunga leo.

### Matumizi-kabla ya usawazishaji

Kutumia-kabla ya usawazishaji ni kipengele mpya katika Zcash Simu Wallet SDK V2 ambayo inaruhusu watumiaji kutumia fedha mara moja juu ya kufungua mkoba wao, bila kusubiri kwa ajili ya mfuko wa fedha kamili kusawazisha. Kipengele hiki huongeza kasi ugunduzi wa wallet za spendable salio na kuboresha uzoefu user.

Spend-before-sync works by using a compact-blocks synchronization algorithm that processes blocks from the lightwalletd server in a non-linear order. This means that instead of waiting for one block to be fully processed before moving on, wallets can use a bit more memory and processing power to scan different sections of the blockchain. Usually, it scans different ranges, looking for newer transactions while the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available immediately.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Ulinganisho wa Blaze

Zilizotengenezwa na timu Zecwallet, Blaze sync ni ushirikiano algorithm kwa ajili ya mkoba mwanga kwamba scans blockchain nyuma, kuanzia juu zaidi, karibuni kuzuia na kufanya kazi kurudi.

Hii inaruhusu mkoba kupata noti zilizotumika kabla ya zile zilizopokelewa, wakati wa kufanya maelezo ambayo hayajatumiwa hapo awali yapatikane bila kusubiri mchakato kamili wa usawazishaji kumaliza.

Besides that, it uses Out-of-Order Sync by decoupling the components of the sync from each other — downloading blocks, performing trial decryptions, and updating witnesses — and processing them in parallel. This takes more memory and CPU resources but increases sync speed by X5.

### DAGSync

DAGSync ni mapendekezo ya ushirikiano algorithm ambayo inalenga kuboresha uzoefu wa mtumiaji wa Zcash wallets kulindwa kwa kuongeza kasi upatanisho.

Inatumia a [Directed Acyclic Graph (DAG) - Mchoro wa Kiwango cha Uzunguko Unaoelekezwa](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) kuwakilisha utegemezi kati ya noti, mashahidi na nullifiers katika mkoba Zcash.

DAG ni muundo wa data ambayo inajumuisha nodes na kingo, ambapo kila makali ina mwelekeo unaoonyesha uhusiano kati ya nodes mbili. A DAG haina mizunguko, maana yake kwamba hakuna njia ya kuanza kutoka node na kufuata pembe nyuma kwa Node sawa.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Matokeo ya Kimatendo

Kwa kushangaza, taratibu hizi zote lengo la kushughulikia maswali yaliyozushwa na Zcash Usalama katika post yake juu ya tarehe 12 Mei. [Scalable Private Ujumbe](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) and its relationship with private payment systems. Some even take the extra step of downloading all memo data from servers, except for data exclusive to an address, increasing privacy at the cost of a bit of extra resources.

Pia, Zcash Foundation imekuwa kuangalia njia nyingine za kuboresha utendaji wa mikoba nyepesi. Hiyo ni kesi na [Ujumbe Oblivious Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), ujenzi wa msingi imekuwa kusoma kuamua kama inatoa suluhisho uwezo kwa matatizo ya utendaji hivi karibuni kwamba kuwa na walioathirika Zcash wallet watumiaji.

## Makosa ya Kawaida

** Kufikiria lightwalletd server anajua usawa wako.** Server tu hutoa vitalu compact; mkoba yako decrypts na tafsiri yao ndani ya nchi kwa funguo zako mwenyewe.

**Kukomesha usawazishaji mapema sana.** Mbinu fulani hufanya fedha za hivi karibuni zinazotumika zipatikane kabla ya kusawazisha kamili kukamilika, lakini historia na maelezo ya zamani yanaweza kuwa bado yanaendelea.

**Kulinganisha Zcash usawazishaji moja kwa moja na uwazi-mnyororo wa kusawazisha.** Njia polepole inaweza kuwa gharama ya kuhifadhi faragha, si kasoro  mkoba ni kufanya kazi ambayo umma sarafu server ingekuwa vinginevyo kufanya kusoma akaunti yako wazi.


## Kurasa Zinazohusiana

- [Nodes Lightwallet](/zcash-tech/lightwallet-nodes)  lightwalletd miundombinu ambayo mwanga pochi kutegemea.
- [Kuangalia funguo za kuvinjari](/zcash-tech/viewing-keys)  funguo pochi kutumia kugundua na decrypt noti zao wenyewe.
- [Pepper Sync Kiungo cha Uzalishaji wa Maudhui ya Kimwili](/zcash-tech/pepper-sync)  mbinu nyingine ya Zcash mkoba usawazishaji.
- [FROST](/zcash-tech/frost)  kusambazwa kusaini mamlaka kwa ZEC shielded.
