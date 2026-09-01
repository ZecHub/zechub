<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Àwọn Ìpèsè fún Oníṣètò

Àwọn ohun àmúṣọrọ̀ tí o nílò láti kóra jọ lórí Zcash, ti a pín sí àwùjọ nípa ìdí tí ẹnìkọ̀ọ̀kan fi wà dípò kí ó máa ṣe àkọsílẹ̀ wọn ní ìdìpọ̀ kan.

The stack changed a great deal in 2026. zcashd, which ran the network for most of its history, reached its end of life on 18 July 2026 at block height 3417100, and every unmodified node shut down at that height and will refuse to restart. Guides written for zcashd are history now rather than a starting point, so this page is organised around what replaced it.

## Àwòrán ìdìpọ̀ náà ní ṣókí kan ṣoṣo

 Layer. Kí ni kí n lò? Bẹrẹ pẹ̀lú:
|:--|:--|:--|
nódù tó kún. Zebra tàbí Zakura. [Ìwé Zebra náà](https://zebra.zfnd.org/), [zakura.com (ìkànnì)](https://zakura.com/) |
ípò owó gbogbo-nódì. Zallet, ní ìmúṣẹ ìdánwò (beta) [Ìwé Zallet](https://zcash.github.io/zallet/) |
| Light wallet server | Zaino or lightwalletd | [Zaino (ìyẹn)](https://github.com/zingolabs/zaino), [lightwalletd ì í ë ¤ì 'ë¦¬í ¬](https://github.com/zcash/lightwalletd) |
| Wallet libraries | The librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
Mobile: Android àti iOS SDKs. [Androidì í ì ë ¤ë¥1⁄4](https://github.com/zcash/zcash-android-wallet-sdk), [iOS (ìkànnì)](https://github.com/zcash/zcash-swift-wallet-sdk) |
Àkọsílẹ̀ Ìlànà àti àwọn ìdìpọ̀-ìpamọ́. [ìdìpọ̀ owó. z. cash](https://zips.z.cash) |

## Àwọn ìsọ̀rí

A node validates ìfohùnṣòwò ati ki o mu awọn pq. Nibẹ ni o wa meji actively idagbasoke imuse.

[Zebra](/zcash-tech/zebra-full-node) is the Zcash Foundation's node, written in Rust, and is the one most guides now assume. [Ìwé Zebra náà](https://zebra.zfnd.org/) ó kan gbígbé e kalẹ̀ àti lílò é, àti àwọn ohun èèlò tó ń mú kí ọpọlọ ṣiṣẹ́. [ibi ìpamọ́](https://github.com/ZcashFoundation/zebra) ibẹ̀ ni ìdàgbàsókè ti ń wáyé.

[Zakura](/zcash-tech/zakura-node) jẹ́ àpò tuntun, tí àwọn òǹkọ̀wé rẹ̀ ṣàpèjúwe gẹ́gẹ́ bí "àpójú Zcash tó kún fún ìfọwọ́sowọpọ, ti a ṣe fun iwọn", pẹlú ìṣọpo iyara, gige blọọki àti ipo ibaramu zcashd. O wa ni olori nipasẹ Sean Bowe, olùpilẹ-iṣẹlẹ Zcash kan ati Dev Ojha . Ó jé orísun ìmọ labẹ Apache 2.0 ní [zakura-core/zakura (ìyẹn ohun tí wọ́n fi ń ṣe ìrì)](https://github.com/zakura-core/zakura).

ZecHub ní àwo n ìkànnì kan tí ó ń jé [Àwọn Ìkànnì Pípéye](/zcash-tech/full-nodes) ojú ìwé tó ń sọ nípa àwọn ohun tí wọ́n fi ṣe pàṣípààrọ̀.

## Àpò-ìpamọ́ tó kún fún nóòdù náà.

zcashd ṣe àpò-ìpamọ́ kan pẹ̀lú ìsopọ. Àpó náà ti lọ, àti pé [Zallet](https://github.com/zcash/zallet) The Zallet Book ṣe apejuwe rẹ bi "aṣayan owo Zcash ti o ni kikun-node kọ ninu Rust" a nṣe "bi iyipada fun apamọwọ zcashd".

Ka ìkìlọ̀ ààbò kí o tó gbára lé e. Zallet wà ní beta, "kò tíì ṣe àtúnyẹwò rẹ pátápátá", àwọn ayipada tí ó ń ba nǹkan jẹ́ "lè wáyé nígbàkigbà, èyí lè mú kóo pa àti tún ẹrù-ìpamọ́ Zallet yín dá" , kì í sìí ṣe gbogbo ọ̀nà zcashd RPC ni a ti gbé kiri títí di báyìí.

Ti o ba ti wa ni gbigbe ohun tẹlẹ iṣeto kọja, ZecHub ní a [itọsọna gbigbe lati zcashd si Zebra ati Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) àti a. [Àlàyé kíákíá nípa Zallet.](/using-zcash/zallet-quick-reference-guide).

## Àwọn àkáǹtì owó kékeré (light wallet servers)

Ọpọlọpọ awọn apamọwọ ko ṣiṣe kan node. Wọn sọrọ si a olupin ti o tọju ni pq ati ọwọ pada kan iwapọ wiwo ti o.

[lightwalletd ì í ë ¤ì 'ë¦¬í ¬](https://github.com/zcash/lightwalletd) jẹ iṣẹ atilẹba, ti a kọ ni Go, apejuwe bi "iṣẹ afẹyinti kan ti o pese wiwo bandwidth-doko si blockchain Zcash". [Zaino (ìyẹn)](/zcash-tech/zaino) jẹ́ àtòjọ tuntun, tí a kọ ní Rust, ó sì ń ka láti inú olùṣe ìdánilójú tó kún dípò kí o máa gbé ẹ̀dà tirẹ̀ ti ìsín.

Àwọn ohun tó ń ṣẹlẹ̀: [Ìlànà Òǹdó-ìmọ̀lẹ́rọ̀ Rerun](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) ìwé náà ni àkọsílẹ̀ àbájáde. [Àwọn Ìkànnì Lightwallet Nodes](/zcash-tech/lightwallet-nodes) ojúewé yìí ń bo ohun tí àwọn séràfítò lè rí àti èyí tí kò le rí nípa oníṣe, tó yẹ kí o lóye kóo to yan ọ̀kan.

## Ṣíṣe àpamọ́ owó kan

Pupọ ninu iṣẹ apamọwọ naa waye ni awọn apoti Rust labẹ [librustzcash](https://github.com/zcash/librustzcash), ti awọn SDK alagbeka ati ọpọlọpọ awọn apamọwọ tabili kọ lori. Kọọkan apoti ni a ṣe akọsilẹ lori [àwọn ìwé ìwádìí.rs](https://docs.rs).

Àpótí. Kí ni ó wà fún?
|:--|:--|
zcash_client_backend "API fún ṣiṣẹ́da àwọn oníṣe Zcash tí ó ní ìpamọ̀", pẹlu ìṣàdákẹgbẹ àti ètò ìdánwò.
zcash_client_sqlite "A SQLite-orisun Zcash ina onibara", awọn ibi ipamọ Layer fun loke.
 zcash_keys "Ìdarí kókó àti àdírésì Zcash"
 zcash_primitives "Ìmúṣẹ Rust ti àwọn àkójọ Zcash"
| zcash_protocol | "Zcash protocol network constants and value types" |
 orchard. "ìlànà ìsòwò tí a fi ààbò pa" Orchard".
sapling-crypto "Ìwé ìkówèésí fún Zcash Sapling"
☐ PCZT: "Àwọn irinṣẹ́ fún ṣiṣẹ́ pẹ̀lú àwọn ìnáwó Zcash tí a dá ní apá kan", èyí ti wọ́n ń lò láti ṣe ìdásílẹ̀ ohun èlò àti oríṣiríṣi ẹrọ.
 zip321  Awọn URI ibeere isanwo, bi a ti ṣalaye ninu ZIP 321 

Fun alagbeka, awọn ti o ni agbara. [Android SDK (ìpèsè ìmúṣẹ)](https://github.com/zcash/zcash-android-wallet-sdk) àti àwọn [iOS SDK (ì í ì ë°)](https://github.com/zcash/zcash-swift-wallet-sdk) wọ́n máa ń pe ibi ìpamọ̀ iOS ní ZcashLightClientKit, nítorí náà àwọn ojúewé àti àpilẹ̀kọ tí ó ti pẹ́ lo orúkọ yẹn.

## Àkọsílẹ̀ àti ìdìwé-àṣáwọlé

Àwọn ohun tó ń ṣẹlẹ̀: [Àkọsílẹ̀ àbáwọlé](https://zips.z.cash/protocol/protocol.pdf) ni aláṣẹ lórí bí Zcash ṣe ń ṣiṣẹ́, títí kan: [adirẹsi ati awọn koodu bọtini](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[Àwọn ZIPs](https://zips.z.cash) are where changes are proposed and specified, and the index shows which are drafts and which are final. Consensus changes ship in network upgrades, and ZecHub tracks those on the [Àwọn Àtúnṣe sí Ìpínlẹ̀ Nẹ́tàkì](/start-here/network-upgrades) ojú ìwé.

Fun awọn cryptography labẹ, ka [Ìwé halo2 Book](https://zcash.github.io/halo2/index.html) àti pé, [The Orchard Book](https://zcash.github.io/orchard/), pẹlu awọn [halo2 (ìmọ̀lára)](https://docs.rs/halo2_proofs/latest/halo2_proofs/) àti pé, [ọgbà èso](https://docs.rs/orchard/latest/orchard/) Àwọn dókítà tó wà ní ẹ̀gbẹ́. [Ìwé FROST](https://frost.zfnd.org/) bo awọn ami-ami, ati ZecHub ni o ni a [FROST](/zcash-tech/frost) ojú ìwé.

## Àwòdì ìdánwò

Testnet jẹ ẹwọn ti o yatọ pẹlu awọn owó-owo ti ko ni iye, ti a npe ni TAZ. Awọn mejeeji Zebra ati Zakura le ṣiṣe lodi si rẹ, ati pe [ìwé tó ń darí àwọ̀n ìdánwò.](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) ó kan ìtòlẹ́sẹẹsẹ àwọn àpò.

[testnet.zcashexplorer.app ì í ë ¤ì ' ê° ì ¬ë¦¬í °ê ̧°](https://testnet.zcashexplorer.app/) jẹ iṣẹ-ṣiṣe testnet block explorer, pẹlu a mainnet counterpart ni awọn ti o wa ninu rẹ. [ì ë¦¬ì ¤í ¬ë¥1⁄4 í êμ°ê ̧°.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Gbígba TAZ ni apá tí ó nira. àwọn ìlépa gbangba ń yọjú, wọ́n sì ti parẹ̀, àti èyí tó so mọ́ láti inú ìwé àlàyé ọjọ́ ogbó kò dáhùn nígbàtí a kọ ojúewé yìí. ọ̀nà tí o ṣeé gbára lé jùlọ ni kí á béèrè nínú Zcash R&D Discord, ìyẹn ohun tí àkọsílẹ̀ Zcash fúnra rẹ̀ dábàá.

## Àwọn ìwé tó wà fún gbogbo èèyàn

[Àkọsílẹ̀ Zcash](https://zcash.readthedocs.io/en/latest/) jẹ́ orísun kan ṣoṣo tó gbòòrò jùlọ, tí ó bo àwọn èròjà ìlànà ìṣàkóso, ìsowọ̀pọ̀ àti ìdásílẹ̀. ka rẹ pẹlú àfiyèsí díẹ̀. o ni ẹ̀dà lòdì sí zcashd, nítorí náà apá ibìkan nínú rèé ṣàpèjúwe kókó ti kò ṣiṣẹ mọ́, nígbàtí ètò ìṣàpẹẹrẹ ati abala oníṣe alágbára ṣì wúlò. [Àpẹẹrẹ Ìṣòro App Wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) tó ń gbé ibẹ̀ yẹ ká kà á kí a tó ṣe ohunkóhun tí yóò kan ìpamọ́ àwọn olùṣe.

Ti o ba jẹ tuntun si awọn blockchains ni gbogbogbo, [Mímọ Bitcoin Lọ́nà Tó Dáa](https://github.com/bitcoinbook/bitcoinbook) ni awọn ti o wọpọ iṣeduro fun pín fundamentals, ati ki o jẹ free lati ka ninu kikun. O ko ba bo shielded owo-owo.

## Àwọn irinṣẹ́ mìíràn tí àwọn olùdàgbà ti mẹnuba

[Àwọn ẹ̀ka:](https://docs.rs/arti/latest/arti/) jẹ́ ìmúṣẹ Rust ti Tor, tí zcash_client_backend ń lò láti darí àpò owó. [Àlàfo ìrù](https://github.com/tailscale/tailscale) ó máa ń yọ láti so mọ́ ìkànnì kan tí ìwọ fúnra rẹ ti ṣètò. [ì2 í 'ì ¬í °ë¦¬](https://github.com/hhanh00/warp2) jẹ́ ìmúṣẹ àpapọ̀ yíyára kánkán tí Hanh ṣe, bí ó tilẹ̀ jẹ pé a kò tíì mú un ṣẹ láti ọdún 2023.

## Ìjọ àti àwọn ìṣẹ̀lẹ̀

Àwọn ohun tó ń ṣẹlẹ̀: [Zcash R&D Discord ì í ë ¤ì 'ë¦¬í ¬ê° êμ¬ì§ .](https://discord.gg/6AK7keWFaK) ni ibi ti a sọrọ nipa ilana ati idagbasoke apamọwọ, ati awọn [Àjọ Ìgbìmọ̀ Zcash Forum](https://forum.zcashcommunity.com/) ó ní àwọn àbá àti ìsọfúnni tó gùn ju èyí lọ.

Àwọn àbájáde hackathon tó wáyé láìpẹ́ yìí jẹ àwòrán rere nípa ohun tí àwọn ènìyàn ń kọ: [ZecHub 2024 (ìmọ̀ràn)](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025 - Àwọn ohun tó ń ṣẹlẹ̀ lákòókò yìí.](https://x.com/ZecHub/status/1975565960661635283) àti àwọn [Ìjàpá-ìbínú Zypherpunk 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Àwọn ohun èlò tí a ti yọ kúrò nínú iṣẹ́

A pa wọn mọ́ nítorí pé àwọn àpilẹ̀kọ tí ó ti pẹ́ ní ìjápọ̀ sí i, àti wípé wọ́n ṣì jẹ́ àtúnyèwò fún bí nóò tó bá fẹsẹ̀ ara rẹ̀ sílẹ̀ ṣe hùwà. Ẹ má bẹ̀rẹ̀ láti ibí yìí o.

[Ìwé Zcashd náà](https://zcash.github.io/zcash/) àti àwọn [zcashd RPC reference](https://zcash.github.io/rpc/) software àkọsílẹ̀ tí ó dé ọdọ [ìparí ayé.](https://zcash.github.io/zcash/user/end-of-life.html) ní July 2026. Àwọn ìsọfúnni tó wà nínú ìwé ìròyìn náà ni: [zcash/zcash ì í ë ¤ì 'ë¦¬í ¬ê°](https://github.com/zcash/zcash) ibi ìpamọ́ náà ti wà ní àkọsílẹ̀.

If you have a resource to add, or you spot something here that has gone stale, open an issue or a pull request. Teams do not always have capacity to keep everything current, and flagging what you ran into helps direct the guides.

** Àtúnṣe ìkẹyìn:** August 2026
