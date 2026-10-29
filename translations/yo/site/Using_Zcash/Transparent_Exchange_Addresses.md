<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kí ni àwọn àdírẹ́sì Zcash TEX?

## TL;DR

* Àdírẹ́sì TEX jẹ́ àdírẹ́sì Zcash tí a kọ ní ọ̀nà ìkọ̀wé mìíràn. Ó bẹ̀rẹ̀ pẹ̀lú `tex1` a sì túmọ̀ rẹ̀ nínú [ZIP 320](https://zips.z.cash/zip-0320).
* Ohun kan ló ń sọ fún àpò owó rẹ: san àdírẹ́sì yìí pẹ̀lú owó tí ó ṣe kedere nìkan.
* Tí owó rẹ bá wà ní ààbò, àpò ìpamọ́ tó báramu yóò ṣe ìgbésẹ̀ méjì fún ọ. Ó máa gbé owó náà lọ sí àdírẹ́sì ìgbà díẹ̀ tó ṣe kedere, lẹ́yìn náà ó máa fi ránṣẹ́ sí àdírẹ́sì TEX.
* Ní ọdún 2023, Binance béèrè lọ́wọ́ àwùjọ Zcash fún ọ̀nà láti kọ̀ àwọn owó tí a fi ààbò pamọ́ sílẹ̀ kí wọ́n sì fi wọ́n ránṣẹ́ padà. Àdírẹ́sì TEX ni ìdáhùn, Binance sì ni pàṣípààrọ̀ lórí ZecHub [Àwọn Pípàṣípààrọ̀ Ààbò](/using-zcash/custodial-exchanges) àkójọ tí ó gba àwọn ohun ìdókòwò TEX.
* Ìsanwó sí àdírẹ́sì TEX jẹ́ ti gbogbo ènìyàn lórí blockchain, gẹ́gẹ́ bí ìsanwó tí ó ṣe kedere. Ìyókù owó tí a fi ààbò pamọ́ yóò wà ní ìkọ̀kọ̀.

## Àlàyé Pàtàkì

Àdírẹ́sì Zcash TEX jẹ́ irú àdírẹ́sì pàtàkì kan tí a ń gbà. TEX dúró fún "Transparent Exchange". Ó jẹ́ àtúnṣe Bech32m ti àdírẹ́sì Transparent p2pkh kan ṣoṣo. Àwọn àdírẹ́sì TEX bẹ̀rẹ̀ pẹ̀lú `tex1` àti pé wọ́n jẹ́ irú kan tí ó yàtọ̀ sí àwọn Àdírẹ́sì Ìṣọ̀kan.

Àdírẹ́sì TEX kan sọ fún àpò ìpamọ́ tó báramu láti ṣe ìṣòwò Transparent-Only (T -> T). 

Àlàyé náà nìyí: Tí àpò ìpamọ́ bá ṣàwárí àdírẹ́sì TEX kan, ó máa ń yí i padà láti gba àpò ìpamọ́ tí ó wà nínú rẹ̀. Lẹ́yìn náà, àpò ìpamọ́ náà yóò fi owó tí a nílò fún tx náà láti inú adágún Shielded ránṣẹ́ sí àdírẹ́sì Transparent tí ó yàtọ̀, tí olùlò ń ṣàkóso, tí ó sì máa ń wà ní ìgbà díẹ̀ (Z -> T). Lẹ́yìn náà, yóò fi owó náà ránṣẹ́ sí àpò ìpamọ́ Transparent tí a yà sọ́tọ̀ fún àdírẹ́sì TEX (T -> T). 

A ṣe àgbékalẹ̀ ìmọ̀ràn ìmọ̀-ẹ̀rọ fún àwọn àdírẹ́sì TEX ní Zcash [ZIP 320](https://zips.z.cash/zip-0320), èyí tí ó túmọ̀ irú àdírẹ́sì kan fún gbígbà owó láti ọ̀dọ̀ àwọn Àdírẹ́sì Àṣírí nìkan.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

A kò tíì gba àdírẹ́sì TEX ní gbogbogbòò. Àwọn olùlò Zcash lè ní láti lò wọ́n nígbẹ̀yìn gbẹ́yín.

### Nigbawo Ni Mo Nilo Adirẹsi TEX kan

#### O nilo adiresi TEX nigbati o ba n fi owo ranṣẹ si adiresi ti o han gbangba nipa lilo apamọwọ ti ko ṣe atilẹyin fifiranṣẹ taara si adirẹsi ti o han gbangba.

Àwọn àpò owó kan kò gbà láàyè láti fi ránṣẹ́ tààrà sí àdírẹ́sì Transparent, olùgbà sì lè má pèsè TEX tó jọra. Nítorí náà, a lè nílò láti yípadà láti àdírẹ́sì Transparent sí àdírẹ́sì TEX nígbà míì. Èyí lè ṣeé ṣe pẹ̀lú ọwọ́ nípa ṣíṣe ìlò ìtọ́kasí tí a là kalẹ̀ nínú rẹ̀ [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### O nilo adirẹsi TEX nigbati o ba n fi owo ranṣẹ si paṣipaarọ ti o ni ile-iṣẹ ti o nilo ki awọn owo naa wa lati orisun Transparent kan.

[Binance](https://www.binance.com/) Ìdí nìyí tí àwọn àdírẹ́sì TEX fi wà. Ní oṣù kọkànlá ọdún 2023, wọ́n sọ fún àwùjọ Zcash pé wọ́n lè yọ ZEC kúrò nínú àkọsílẹ̀ àyàfi tí ọ̀nà bá wà láti kọ̀ àwọn owó tí a fi pamọ́ láti inú àwọn àdírẹ́sì tí a dáàbò bò kí wọ́n sì fi wọ́n ránṣẹ́ sí olùtọ́jú owó náà ([ZIP 320, Àwòrán ìsàlẹ̀](https://zips.z.cash/zip-0320#background)) ZIP 320 kò retí pé àwọn pàṣípààrọ̀ mìíràn yóò fúnni ní àdírẹ́sì TEX àyàfi tí wọ́n bá nílò láti mọ àdírẹ́sì tí ìsanwó ti wá. Binance ni pàṣípààrọ̀ lórí wa [Àwọn Pípàṣípààrọ̀ Ààbò](/using-zcash/custodial-exchanges) àkójọ tí ó ń gba owó ìdókòwò sí àdírẹ́sì TEX kan.
Àwọn àdírẹ́sì TEX ń sọ fún àpò owó tó báramu pé gbogbo owó tí a fi ránṣẹ́ sí àdírẹ́sì náà gbọ́dọ̀ jẹ́ èyí tó ṣe kedere, kí a sì yọ gbogbo ìníyelórí tí a kò ní fi ránṣẹ́ sí àdírẹ́sì náà kúrò.
Tí pàṣípààrọ̀ bíi Binance bá kọ̀ iye tí a fi ránṣẹ́, ó ní ọ̀nà tó yẹ láti dá iye náà padà sí àdírẹ́sì tí ó ti wá. Ó tún ń ran àwọn ẹgbẹ́ bíi Binance lọ́wọ́ láti tẹ̀lé àwọn òfin àti ìlànà tí ìjọba tàbí àwọn aláṣẹ mìíràn gbé kalẹ̀.

### Àwọn àpò wo ló ń ṣe àtìlẹ́yìn fún àwọn àdírẹ́sì TEX?

O le wo akojọ awọn ti o wa ni tuntun julọ lori wa [àwọn àpò owó](/using-zcash/wallets) ojú ìwé. Lo àlẹ̀mọ́ àdírẹ́sì TEX.

## Ìwòran / Àfiwé

Ronú nípa owó tó wà nínú àpótí ìpamọ́ ilé rẹ. Kò sí ẹni tó lè rí iye tó wà nínú rẹ̀.

Pàṣípààrọ̀ bíi Binance ní àmì kan lórí kàǹtì rẹ̀: a gba owó nínú àpò ìwé tí ó ṣe kedere nìkan, kí olùtọ́jú owó lè rí ibi tí owó náà ti wá kí ó sì dá a padà tí ó bá pọndandan. Àdírẹ́sì TEX ni àmì náà.

Tí àpò rẹ bá rí àmì náà, yóò yọ owó náà kúrò nínú àpótí ìpamọ́ náà, yóò sì fi sínú àpò tí ó mọ́ kedere pẹ̀lú àdírẹ́sì ìdápadà rẹ (àdírẹ́sì ìgbà díẹ̀ tí ó ṣe kedere), yóò sì gbé àpò ìpamọ́ náà lọ sí ibi ìtajà. Àpò ìpamọ́ náà yóò dúró ní títì, kò sì sí ẹni tí yóò mọ ohun mìíràn tí ó wà nínú rẹ̀.

## Jíjìn Jìnnìjìnnì

### Bawo ni a ṣe kọ adirẹsi TEX kan

Àdírẹ́sì tí ó ṣe kedere déédé tí ó bẹ̀rẹ̀ pẹ̀lú `t1` Ó ní hash key 20-byte kan, tí a kọ sí Base58Check. Àdírẹ́sì TEX kan ní 20 baiti kan náà, tí a tún fi koodu sí Bech32m pẹ̀lú ìṣáájú `tex` (`textest` lórí testnet). Ṣíṣe àyípadà ọ̀kan sí èkejì gba àwọn ìlà díẹ̀ ti kódì, èyí tí ZIP 320 fihàn nínú ìlò ìtọ́kasí rẹ̀.

Apẹrẹ ti o rọrun naa jẹ ibeere lati ọdọ Binance: iyipada naa gbọdọ ṣiṣẹ pẹlu awọn ile-ikawe Base58Check ati Bech32m nikan ninu koodu iwaju-opin paṣipaarọ naa. Akọsilẹ ZIP 320 ti tẹlẹ kọ imọran naa sinu Awọn adirẹsi Unified, ati pe ẹya yẹn ni a fi silẹ fun idi eyi.

### Sanwo adirẹsi TEX lati iwọntunwọnsi ti a daabobo

ZIP 320 nílò àpò owó tó báramu láti kọ́ àwọn ìṣòwò méjì níbí. Èkíní gbé owó náà láti inú àpò owó rẹ sí àdírẹ́sì tuntun tó ṣe kedere. Èkejì fi wọ́n ránṣẹ́ láti àdírẹ́sì yẹn sí àdírẹ́sì TEX.

Tí pàṣípààrọ̀ náà bá kọ̀ láti fi owó náà sílẹ̀, yóò dá owó náà padà sí àdírẹ́sì ìgbà díẹ̀. Àpò owó rẹ gbọ́dọ̀ lè rí wọn kí o sì ná wọn, nítorí náà, ZIP 320 ń béèrè lọ́wọ́ àwọn àpò owó láti gba àdírẹ́sì ìgbà díẹ̀ láti inú gbólóhùn èso rẹ. Ó tún ń béèrè lọ́wọ́ àwọn àpò owó láti lo àdírẹ́sì ìgbà díẹ̀ tuntun ní gbogbo ìgbà, kí a má baà so àwọn ìsanwó ọ̀tọ̀ọ̀tọ̀ pọ̀ mọ́ ara wọn.

### Ohun ti blockchain fihan

Òfin TEX ń gbé nínú àpò owó. Àwọn nódù kì í ṣàyẹ̀wò rẹ̀, nítorí náà àwọn òfin ìfohùnṣọ̀kan náà dúró gẹ́gẹ́ bí ó ti yẹ. Lórí ẹ̀wọ̀n, ìsanwó sí àdírẹ́sì TEX rí bí ìsanwó sí ìbáramu `t1` Àdírẹ́sì. Iye owó náà, àdírẹ́sì onígbà díẹ̀, àti àdírẹ́sì pàṣípààrọ̀ náà jẹ́ ti gbogbo ènìyàn, gẹ́gẹ́ bí ó ti rí pẹ̀lú ìṣòwò tí ó ṣe kedere.

## Àwọn ojú ìwé tó jọra

- [Àwọn Pípàṣípààrọ̀ Ààbò](/using-zcash/custodial-exchanges): àwọn pàṣípààrọ̀ tí wọ́n gbà irú àdírẹ́sì wo, títí kan àwọn owó ìdókòwò TEX Binance's.
- [Àwọn Àpò Ìpamọ́](/using-zcash/wallets): lo àlẹ̀mọ́ àdírẹ́sì TEX láti wá àwọn àpò owó tí ó lè san àdírẹ́sì TEX kan.
- [Àwọn Adágún Tí A Dáàbò Bo](/using-zcash/shielded-pools): nibiti iye owo ikọkọ rẹ wa ṣaaju ki isanwo TEX kan to gbe apakan rẹ jade.
- [Ta ló lè rí ìsanwó Zcash rẹ](/start-here/who-can-see-your-zcash-payment): ohun ti o han ni kete ti awọn owo ba jade kuro ni adagun aabo.
- [Ohun tí Olùṣàwárí Àkọsílẹ̀ lè rí](/zcash-tech/what-a-block-explorer-can-see): bawo ni isanwo ti o han gbangba ṣe han lori pq.
- [Ìbéèrè fún Ìsanwó Zcash URIs](/using-zcash/payment-request-uris): boṣewa apamọwọ miiran fun awọn sisanwo ti a ti kun tẹlẹ.

**Ìmúdàgba ìkẹyìn:** Oṣù Kẹwàá 2026
