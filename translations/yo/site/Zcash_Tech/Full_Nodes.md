<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Nódù Pípé

Full Node jẹ sọfitiwia ti o nṣiṣẹ ẹda kikun ti eyikeyi blockchain cryptocurrency ti o funni ni iraye si awọn ẹya ilana.

It holds a complete record of every transaction that has occurred since genesis and is therefore able to verify the validity of new transactions and blocks that are added to the blockchain.

## Zcashd

> ** Àkíyèsí:** zcashd ti wa ni deprecated. The Electric Coin Company ti [ni ifowosi kede](https://z.cash/support/zcashd-deprecation/) pe zcashd ti wa ni retired, pẹlu awọn oniwe-pupọ-node ipa rọpo nipasẹ [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) àti ipa tí [Zallet] ń kó nínú owó pópó rẹ̀](https://github.com/zcash/zallet). Fun titun deployments, lo Zebra (wo ni isalẹ). Ti o ba ti tẹlẹ ṣiṣe a zcashd node, tẹle awọn [Migration Guide: zcash d to Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd was the original Full Node implementation for Zcash, developed and maintained by the Electric Coin Company. The build instructions below are retained for reference and for operators migrating away from zcashd.

Zcashd exposes a set of API's via its RPC interface. These API's provide functions that allow external applications to interact with the node.

[Ìmótótó àpòòwéd](https://github.com/zcash/lightwalletd) jẹ́ àpẹẹrẹ ohun èlò tí ó ń lo ìkànnì tó kún láti jẹ́ kí àwọn olùdàgbà lè kọ́ àti ṣetán àwọn àpamọ́ owó alágbèéká tí a fi ààbò ṣe láì ní láti bá Zcashd lò ní tààràtà.

[Àkójọ àpapọ̀ àwọn àṣẹ RPC tí a ṣe atilẹyin](https://zcash.github.io/rpc/)

[Ìwé Zcashd](https://zcash.github.io/zcash/)


### Ṣíṣe Àkójọ (Linux)

- Ṣíṣe Àtúnṣe Àwọn Ohun-èlò 

      sudo apt àtúnṣe

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Ẹ̀dà tí ó ṣẹ̀ṣẹ̀ jáde, àyẹ̀wò, ìmúrasílẹ̀ àti kíkó:

      ẹ̀dà git https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sync Blockchain (ó lè gba ọ̀pọ̀lọpọ̀ wákàtí)

    Láti bẹ̀rẹ̀ ìgbésẹ̀ ìsopọ̀:

      ./src/zcashd

- Awọn bọtini Ikọkọ ti wa ni fipamọ ni ~/.zcash/wallet.dat

[Afowoyi fun Zcashd lori Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Ẹranko Zebra

Zebra is an independent, production-ready full node implementation of the Zcash protocol, created by the Zcash Foundation and written in Rust. As zcashd is retired, Zebra (`zebrad`) ni ìkápá tí a dábàá fún ìmúṣẹ tuntun.

Zebra validates blocks and transactions, participates in the peer-to-peer network, and exposes an RPC interface for applications. The wallet is a separate component now: [Zallet](https://github.com/zcash/zallet) ó ń ṣiṣẹ́ pẹ̀lú Zebra node ó sì ń ṣe àbójútó àwọn kókó àti ìsókè. èyí rọ́pò zcashd, èyí tí ó so node àti wallet pọ̀ nínú ètò kan ṣoṣo.

Lati sin awọn apamọwọ ina ti o ni aabo, node naa n ṣiṣẹ lẹgbẹẹ itọka kan, boya ti a fi idi mulẹ [lightwalletd](https://github.com/zcash/lightwalletd) tàbí èyí tó ṣẹ̀ṣẹ̀ jáde [Zaino](https://zechub.wiki/zaino).

Rii daju lati ka iwe Zebra fun awọn itọnisọna iṣeto, ati darapọ mọ olupin R&D Discord fun atilẹyin. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Ìwé Zebra]](https://zebra.zfnd.org) 

[Àìfohùnṣọ̀kan](https://discord.gg/uvEdHsrb)



## Àwùjọ

Nípa lílo ìkànnì kan tí ó kún, ẹ̀ ń ṣèrànwọ́ láti mú kí nẹtiwọọki zcash lágbára sí i nípa gbígbárùkù ti ìyàsímímọ́ rẹ. 

Eyi ṣe iranlọwọ lati dena iṣakoso adani ati tọju nẹtiwọọki ni agbara si diẹ ninu awọn ọna idalọwọduro.

DNS seeders fi àkọsílẹ̀ àwọn ìkànnì tó ṣeé gbára lé hàn nípa lílo ohun èlò tí wọ́n ṣe sínú rẹ̀. Èyí jẹ́ kí àwọn ìnáwó lè tàn kálẹ̀ jákèjádò nẹ́ẹ̀tì. 

### Àwọn Àkọsílẹ̀ Nẹ́ẹ̀tì

Eyi ni awọn apẹẹrẹ awọn iru ẹrọ ti o fun laaye iraye si data Nẹtiwọọki Zcash:

[Ìwádìí Ìdìpọ̀ Zcash](https://zcashblockexplorer.com)

[Àwọn ìlànà ìṣirò owó](https://docs.coinmetrics.io/info/assets/zec)

[Ìjókòó alágbèéká]](https://blockchair.com/zcash)

O tun le ṣe alabapin si idagbasoke nẹtiwọọki nipa ṣiṣe awọn idanwo tabi sisọ awọn ilọsiwaju tuntun & pese awọn iṣiro. 



### Iṣẹ́ ìwakùsà

Awọn miners nilo awọn nodu kikun lati wọle si gbogbo awọn rpc ti o ni ibatan iwakusa bii getblocktemplate & getmininginfo. 

Zcashd tun jẹ ki iwakusa si aabo coinbase. Awọn oniwakiri ati awọn adagun iwakusa ni aṣayan lati ṣe iwakusa taara lati ṣajọ ZEC ti o ni aabo ni adirẹsi z nipasẹ aiyipada. 

Ka [Ìtọ́sọ́nà Ìwakùsà](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) tabi Darapọ mọ oju-iwe Forum Agbegbe fun [Awọn Miners Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Ìpamọ́ 

Ṣiṣayẹwo gbogbo node jẹ ki o ṣe idanimọ gbogbo awọn iṣowo ati awọn bulọọki lori nẹtiwọọki Zcash.

Ṣiṣayẹwo akopọ ti o ni kikun yago fun diẹ ninu awọn eewu aṣiri ti o nii ṣe pẹlu lilo awọn iṣẹ ẹnikẹta lati ṣayẹwo awọn iṣowo ni orukọ rẹ.

Lilo rẹ ara node tun gba asopọ si awọn nẹtiwọki nipasẹ [Tor](https://zcash.github.io/zcash/user/tor.html).
Eyi ni anfani afikun ti gbigba awọn olumulo miiran lati sopọ ni ikọkọ si adirẹsi node .onion rẹ.


Ìrànlọ́wọ́ wo lo nílò?

Ka [Àwọn Àkọsílẹ̀ Ìtìlẹyìn]](https://zcash.readthedocs.io/en/latest/)

Ẹ darapọ̀ mọ́ wa [Apá Ìdàrúdàpò](https://discord.gg/zcash) tàbí kó o kàn sí wa lórí [twitter]](https://twitter.com/ZecHub)



