<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìṣètò Ọ̀rọ̀-ìpamọ́ Zcash Wallet

## TL;DR

* Nítorí pé àwọn ìnáwó Zcash tí a fi ààbò bo pamọ́ fún wọn, sérà kò lè kàn wo báálì wáléètí bí ó ṣe le rí owó òwò tó ń yọjú bíi Bitcoin tàbí Ethereum.
* Awọn apamọwọ ina ṣe igbasilẹ awọn bulọọki kekere lati ọdọ olupin pataki kan (lightwalletd) ati ṣatunṣe data ti o yẹ funrararẹ pẹlu awọn bọtini ikọkọ wọn.
* Ṣíṣàmúlò àwọn àlàfo náà máa ń gba àkókò, nítorí náà, wọ́n á lo ìlànà ìfọwọ́sowọ̀pọ̀ tó yá kí o lè tètè náwó rẹ.
* Awọn ọna ti o ṣe akiyesi: Warp Sync (YWallet), Lo-ṣaaju ki o to sync (Zcash Mobile Wallet SDK V2), Blaze Sync, ati DAGSync.
* Àwọn ọ̀nà yìí sábà máa ń fi àfikún ìrántí tàbí agbára ìṣiṣẹ́ ṣe pàṣípààrọ̀ fún ìfiwéra tó yá kánkán.

## Àlàyé Ìpilẹ̀ṣẹ̀

### Bí Zcash ṣe ń ṣiṣẹ́ pa pọ̀

Zcash uses zero-knowledge proofs to shield transaction details from unauthorized parties. This privacy makes syncing harder for light wallets because they do not store the full blockchain locally and instead rely on a server for the necessary information. With Bitcoin or Ethereum, servers can index the blockchain and return account data quickly. But with Zcash, the server cannot see transaction details. So how can a light wallet sync its balance and history without downloading and decrypting the entire blockchain itself?

Zcash solves this problem by combining multiple approaches. It has a specialized server, lightwalletd, that filters data from a full node and keeps only what's needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets first download these compact blocks from the lightwalletd server and then decrypt them with their private keys.

Kódà, dídíkọ̀rọ́ àti ṣíṣe àtúnṣe àwọn ìdìpọ̀ tí ó ṣe kókó yìí lè gba àkókò tó pọ̀ gan-an pàápàá nígbàtí ọ̀pọ̀lọpọ̀ ìṣòwò bá wà nínú ẹyọ kan. Nítorí náà, owó pópó máa ń lo onírúurú ònà láti mú kí àsopọmọra tètè wáyé kí o sì le lòo lówó rẹ ní gbàrà bó ti ṣeé ṣe lọ.

## Ìran / Àfiwé

Think of the blockchain as a huge mailroom full of locked boxes. With a transparent coin, the mailroom clerk can read the labels and instantly tell you which boxes are yours. With Zcash, the labels are hidden — so your wallet has to take its keys and quietly check the boxes itself to find the ones it can open. The syncing methods below are different strategies for checking those boxes faster.

## Wọlé Lọ Jìnnà

### Ìmúṣiṣẹ́pọ̀ Warp

Warp sync jẹ ẹya YWallet ti o foju awọn igbesẹ arin-aarin ti decrypting ati ṣiṣe bulọọki kọmpatiki kọọkan, n fò taara si abajade ipari.

Láti ṣe èyí, ó máa ń lo ìmọ̀ ìṣirò àti ẹ̀rọ ìgbàkòwé láti ṣírò ohun tó bá jáde láìjẹ́ pé a ti gbé ìgbésẹ̀ kọ̀ọ̀kan yẹ̀ wò.

Warp sync can process thousands of blocks per second, much faster than the usual synchronization method. This means that YWallet users can enjoy fast and smooth performance, even with hundreds of thousands of transactions and received notes in their accounts.

Yẹra si ọna igbesẹ-igbesoke yii, YWallet le ṣe ilana awọn bulọọki pupọ ni akoko kanna, pinpin ẹrù kọja ohun elo ti o wa lati jẹ ki ilana naa yara sii.

Ka Àlàyé Síwájú lórí: [Ìmúṣiṣẹ́pọ̀ Warp](https://ywallet.app/warp/)

> A ṣe apejuwe warp sync nibi bi ọna isọdọkan. Ywallet funrararẹ ko tun ṣetọju ati pe a kii yoo ni imudojuiwọn fun Ironwood, nitorinaa kii ṣe apamọwọ lati fi sori ẹrọ loni.

### Lo-ṣaaju ki o to ṣepọ

Spend-before-sync jẹ ẹya tuntun ninu Zcash Mobile Wallet SDK V2 ti o fun laaye awọn olumulo lati lo owo lẹsẹkẹsẹ lori ṣiṣi apamọwọ wọn, laisi nduro fun isọdọkan apamọwọ kikun. Ẹya yii nyara awari iwontunwonsi iṣuna apamọ ati mu iriri olumulo dara si.

Spend-before-sync works by using a compact-blocks synchronization algorithm that processes blocks from the lightwalletd server in a non-linear order. This means that instead of waiting for one block to be fully processed before moving on, wallets can use a bit more memory and processing power to scan different sections of the blockchain. Usually, it scans different ranges, looking for newer transactions while the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available immediately.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Àtúnṣe ìmúṣiṣẹ́pọ̀ Blaze

Ti a ṣe agbekalẹ nipasẹ ẹgbẹ Zecwallet, Blaze sync jẹ alugoridimu isọdọkan fun awọn apamọwọ ina ti o ṣawari blockchain pada sẹhin, bẹrẹ pẹlu giga julọ, bulọọki to ṣẹṣẹ ati ṣiṣẹ ni ẹhin.

Èyí jẹ́ kí àpò náà rí àwọn owó tí wọ́n ti ná ṣáájú èyí tó gbà, nígbàtí ó ń mú àwọn owó ìnáwó tí wọn kò tíì lò tẹ̀lẹ̀ wà fún ìlò láìdúró de ètò ìṣàmúlò láti parí.

Yato si pe, o nlo Oju-iṣẹpọ ti ita nipasẹ sisọ awọn paati isopọmọ lati ara wọn  gbigba sori ẹrọ bulọọki, ṣiṣe idanwo decryptions, ati imudojuiwọn ẹlẹri  ati ṣiṣatunkọ wọn ni pẹkipẹki. Eyi gba iranti diẹ sii ati awọn orisun CPU ṣugbọn mu iyara iṣọpọ pọ si X5.

### DAGSync (ì í ì ë°©)

DAGSync jẹ àbá kan ti a ṣe iṣeduro algorithm isọdọkan eyiti o ni ifọkansi lati mu iriri olumulo awọn apamọwọ aabo Zcash nipa iyara iṣọpọ.

Ó ń lo àdàkọ kan tí a mọ̀ sí: [Àkọlé àwòrán Igbesẹ ti a ṣe lati fi han awọn ohun elo to wa ni ayika.](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) láti ṣe aṣojú àwọn ìfipamọ́ láàárín ìwé, ẹlẹ́rìí àti ohun tí ó ń sọ ọ di aláìníláárí nínú àpò Zcash.

DAG jẹ́ àdàkọ ìsọfúnni tí ó ní àwọn òpó àti èèpo, níbi ti gbogbo ẹ̀gbẹ́ ni o ní itọsọna tó fi ìbáṣepọ̀ hàn láàrin méjì. ADAG kò ní ìgboro kankan, èyí túmọ̀ sí pé kò si ọ̀nà láti bẹ̀rẹ̀ látorí kókó kan kí a sì tẹlé àwọn èépo padà lọ sí kókó náà.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Àwọn Ohun Tó Lè Yọrí sí Lóòótọ́

Interestingly, all these mechanisms aim to address the questions raised by Zcash Security in its post on [Ìsọfúnni Àkọlé tí ó ṣeé ṣe láti yípò síbi tó kù](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) àwọn kan tiẹ̀ máa ń ṣe àfikún ìgbésẹ̀ láti gba gbogbo ìsọfúnni tó wà nínú ìwé ìránnilétí náà sílẹ̀ látorí sẹẹ́fù, yàtọ̀ sí èyí tí kò ní í jẹ́ ti àdírésì pàtó kan. ìyẹn á mú kí àṣírí ẹni túbọ̀ dá lójú nípa fífi ohun àmúṣọrọ̀ díẹ̀ kún un.

Also, the Zcash Foundation has been looking at other alternatives to improve the performance of light wallets. That is the case with [Gbigba ifiranṣẹ ti o gbagbe (OMR)](https://zfnd.org/oblivious-message-retrieval/), ìmúdàgba tí àjọ náà ti ń kẹ́kọ̀ọ́  láti mọ bí ó ṣe lè pèsè ojútùú sí àwọn ìṣòro iṣẹ́ tó wáyé láìpẹ́ yìí èyí tó kan àwọn oníṣe àpò Zcash.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

**Atipe olupin lightwalletd mọ iwontunwonsi rẹ.** Olupese naa nfunni awọn bulọọki ti o nipọn nikan; apamọwọ rẹ ṣe alaye ati itumọ wọn ni agbegbe pẹlu awọn bọtini tirẹ.

**Dídín ìfọwọ́sowọ̀pọ̀ náà dúró ní kíákíá.** Àwọn ọ̀nà kan ń mú owó tó ṣeé ná láìpẹ́ yìí wà lárọ̀ọ́wọ́tó kó tó di pé àtúnṣe tí ó kún réé parí, ṣùgbọ́n ìtàn àti àkọsílẹ̀ ìgbàanì ṣì lè máa bá a lọ.

**Gbífi àdàkọ Zcash ṣe tààrà sí ìsopọ̀-àlàfo.** Ọnà tó lọ́ra jù lè jẹ owó tí ó ń pa àṣírí mọ́, kì í ṣe àìpé  apamọwọ náà n ṣiṣẹ́ ti àwọn olùpèsè owó gbogbo ènìyàn yóò máa ṣe nípa kíka àkọọlẹ rẹ ní gbangba.


## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn Ìkànnì Lightwallet Nodes](/zcash-tech/lightwallet-nodes)  awọn lightwalletd amayederun ti imọlẹ wallets gbekele lori.
- [Àwọn Kókó Ìwòran](/zcash-tech/viewing-keys)  àwọn kókó tí àpò owó máa ń lò láti fi mọ àti tú àkọsílẹ̀ ìsọfúnni wọn.
- [Àwọn Àdàkọ:Pepper Sync](/zcash-tech/pepper-sync)  ọ̀nà mìíràn láti ṣe àpapọ́ owó Zcash.
- [FROST](/zcash-tech/frost)  àṣẹ ìforúkọsílẹ̀ tí a pín fún ZEC tó ní ààbò.
