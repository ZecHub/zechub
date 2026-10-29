<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kí ni àwọn àdírẹ́sì Zcash TEX?

## TL;DR

* Àdírẹ́sì TEX jẹ́ àdírẹ́sì Zcash tí a kọ ní ọ̀nà ìkọ̀wé mìíràn. Ó bẹ̀rẹ̀ pẹ̀lú `tex1` a sì túmọ̀ rẹ̀ nínú [ZIP 320](https://zips.z.cash/zip-0320).
* Ohun kan ló ń sọ fún àpò owó rẹ: san àdírẹ́sì yìí pẹ̀lú owó tí ó ṣe kedere nìkan.
* Tí owó rẹ bá wà ní ààbò, àpò ìpamọ́ tó báramu yóò ṣe ìgbésẹ̀ méjì fún ọ. Ó máa gbé owó náà lọ sí àdírẹ́sì ìgbà díẹ̀ tó ṣe kedere, lẹ́yìn náà ó máa fi ránṣẹ́ sí àdírẹ́sì TEX.
* Ní ọdún 2023, Binance béèrè lọ́wọ́ àwùjọ Zcash fún ọ̀nà láti kọ̀ àwọn owó tí a fi ààbò pamọ́ sílẹ̀ kí wọ́n sì fi wọ́n ránṣẹ́ padà. Àdírẹ́sì TEX ni ìdáhùn, Binance sì ni pàṣípààrọ̀ lórí ZecHub [Àwọn Pípàṣípààrọ̀ Ààbò](/using-zcash/custodial-exchanges) àkójọ tí ó gba àwọn ohun ìdókòwò TEX.
* Àtìlẹ́yìn ti pọ̀ sí i ní apá ìfiránṣẹ́ náà pẹ̀lú: Coinbase jẹ́ kí àwọn olùlò rẹ̀ fi ZEC ránṣẹ́ sí àwọn àdírẹ́sì TEX, àti àwọn ohun èlò ìpamọ́ owó ti ń fi àtìlẹ́yìn ZIP 320 kún un.
* Ìsanwó sí àdírẹ́sì TEX jẹ́ ti gbogbo ènìyàn lórí blockchain, gẹ́gẹ́ bí ìsanwó tí ó ṣe kedere. Ìyókù owó tí a fi ààbò pamọ́ yóò wà ní ìkọ̀kọ̀.

## Àlàyé Pàtàkì

Àdírẹ́sì Zcash TEX jẹ́ irú àdírẹ́sì pàtàkì kan tí a ń gbà. TEX dúró fún "Transparent Exchange". Ó jẹ́ àtúnṣe Bech32m ti àdírẹ́sì Transparent p2pkh kan ṣoṣo. Àwọn àdírẹ́sì TEX bẹ̀rẹ̀ pẹ̀lú `tex1` àti pé wọ́n jẹ́ irú kan tí ó yàtọ̀ sí àwọn Àdírẹ́sì Ìṣọ̀kan.

Àdírẹ́sì TEX kan sọ fún àpò ìpamọ́ tó báramu láti ṣe ìṣòwò Transparent-Only (T -> T). 

Àlàyé náà nìyí: Tí àpò ìpamọ́ bá ṣàwárí àdírẹ́sì TEX kan, ó máa ń yí i padà láti gba àpò ìpamọ́ tí ó wà nínú rẹ̀. Lẹ́yìn náà, àpò ìpamọ́ náà yóò fi owó tí a nílò fún tx náà láti inú adágún Shielded ránṣẹ́ sí àdírẹ́sì Transparent tí ó yàtọ̀, tí olùlò ń ṣàkóso, tí ó sì máa ń wà ní ìgbà díẹ̀ (Z -> T). Lẹ́yìn náà, yóò fi owó náà ránṣẹ́ sí àpò ìpamọ́ Transparent tí a yà sọ́tọ̀ fún àdírẹ́sì TEX (T -> T). 

A ṣe àgbékalẹ̀ ìmọ̀ràn ìmọ̀-ẹ̀rọ fún àwọn àdírẹ́sì TEX ní Zcash [ZIP 320](https://zips.z.cash/zip-0320), èyí tí ó túmọ̀ irú àdírẹ́sì kan fún gbígbà owó láti ọ̀dọ̀ àwọn Àdírẹ́sì Àṣírí nìkan.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Báwo ni a ṣe ń lo àwọn àdírẹ́sì TEX tó?

Ìgbàgbà ṣì jẹ́ apá kan, ṣùgbọ́n kò mọ sí pàṣípààrọ̀ kan ṣoṣo mọ́. Oríṣiríṣi ipa méjì ló yẹ kí a yà sọ́tọ̀:

* **Pípèsè àwọn àdírẹ́sì ìdókòwò TEX.** Binance ni pàṣípààrọ̀ lórí wa [Àwọn Pípàṣípààrọ̀ Ààbò](/using-zcash/custodial-exchanges) ṣe àkọsílẹ̀ tí ó fúnni ní àdírẹ́sì TEX fún àwọn ìdókòwò, kí owó lè dé láti orísun tí ó ṣe kedere ([ZIP 320, Àwòrán ìsàlẹ̀](https://zips.z.cash/zip-0320#background)). ZIP 320 kò retí pé àwọn ilé iṣẹ́ míìrán yóò fúnni ní àdírẹ́sì TEX àyàfi tí wọ́n bá nílò láti mọ àdírẹ́sì wo ni wọ́n ti san owó.
* **Fifiranṣẹ si awọn adirẹsi TEX.** Eyi ni apa ti o ti dagba. Ni Oṣu Kẹwa ọdun 2024, Coinbase kede pe awọn olumulo Coinbase.com le fi Zcash ranṣẹ si awọn adirẹsi TEX ([Ìkéde Coinbase Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Àwọn irinṣẹ́ àpò owó ti ń fi àtìlẹ́yìn ZIP 320 kún un pẹ̀lú: KeepKey fi ìfọwọ́sowọ́pọ̀ kún fún àwọn ìṣòwò TEX lórí firmware 7.15 ([keepkey/HDweller #75](https://github.com/keepkey/hdwallet/pull/75)), àti XChainJS `zcash-js` Wọ́n tún ibi ìkàwé náà ṣe lẹ́yìn tí wọ́n kọ̀ ọ́ sílẹ̀ `tex1` awọn olugba (diẹ sii lori iyẹn ni isalẹ).

Nítorí náà, àwọn àdírẹ́sì TEX kì í ṣe ti gbogbo ènìyàn, ṣùgbọ́n ẹni tó ń kà á kò gbọ́dọ̀ rò pé Binance nìkan ni ibi tí wọ́n ti fara hàn mọ́.

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

Àwọn àdírẹ́sì TEX yá ìkọ̀wé Bech32m láti inú ìrísí Àdírẹ́sì Unified ṣùgbọ́n kò ní ìrísí kankan nínú rẹ̀. Tí o bá jẹ́ ẹni tuntun sí Bech32m àti bí a ṣe ń fi àwọn àdírẹ́sì Zcash hàn, [Àwọn Àdírẹ́sì Ìṣọ̀kan](/using-zcash/unified-addresses) ojú ìwé náà bo àwọn ìpìlẹ̀ lábẹ́ [ZIP 316](https://zips.z.cash/zip-0316)Àdírẹ́sì TEX yàtọ̀ sí Àdírẹ́sì Ìṣọ̀kan ní ọ̀nà mẹ́rin pàtó:

| | Àdírẹ́sì Ìṣọ̀kan (ZIP 316) | Àdírẹ́sì TEX (ZIP 320) |
|---|---|---|
| Ohun tí ó ń mú | ọpọlọpọ awọn olugba ti a so pọ | olugba P2PKH kan ṣoṣo |
| Àkọ́kọ́ ìṣáájú tí ènìyàn lè kà (HRP) | `u` (àkójọpọ̀) | `tex` (`textest` lórí àwọ̀n ìdánwò) |
| F4 Jumble ìbòjú | bẹẹni | no |
| Àwọn kódù ìrísí fún olùgbà kọ̀ọ̀kan | bẹẹni | no |

Ni kukuru, adirẹsi TEX kan ni ohun elo Bech32m ti o rọrun julọ: hash bọtini ti o han gbangba kan, a `tex` ìṣáájú, kò sì sí ohun mìíràn.

### Awọn ofin mimu fun awọn apamọwọ ati awọn oluṣọpọ

Èyí ni apá tí àwọn ìṣeṣe ti ń yípadà, nítorí náà ó yẹ kí a sọ ní kedere. Nígbà tí a bá rí àdírẹ́sì TEX kan, àpò owó tàbí ẹ̀rọ ìṣirò **kò gbọdọ̀ ná owó láti inú adágún ààbò náà tààrà sí ibi tí a ń lọ sí TEX.** ZIP 320 nílò gbogbo ìfikún sí ìsanwó TEX láti ṣe kedere, nítorí náà, a ṣe ìsanwó náà ní ìgbésẹ̀ méjì:

1. **Ẹ̀rọ ìbòjú.** Gbé iye owó náà láti inú adágún ààbò sí àdírẹ́sì tuntun tí olùlò ń ṣàkóso láìpẹ́ tí àpò owó náà ní (Z -> T).
2. **Fi ohun tí ó hàn gbangba sí ohun tí ó hàn gbangba.** Lo ìjáde ìgbà díẹ̀ yẹn sí olugba P2PKH tí a ti yí padà nínú àdírẹ́sì TEX (T -> T).

Àwọn òfin díẹ̀ ló mú kí èyí jẹ́ ààbò, gbogbo rẹ̀ láti inú ZIP 320:

* Àdírẹ́sì ìgbà díẹ̀ náà yẹ kí ó wá láti inú gbólóhùn èso rẹ, kí ó baà lè jẹ́ pé tí pàṣípààrọ̀ náà bá dá owó náà padà, àpò rẹ yóò ṣì lè rí wọn kí ó sì ná wọn.
* A gbọ́dọ̀ lo àdírẹ́sì tuntun fún ìgbà díẹ̀ ní gbogbo ìgbà, nítorí náà, a kò gbọdọ̀ so àwọn ìsanwó ọ̀tọ̀ọ̀tọ̀ pọ̀ mọ́ ara wọn.
* Iṣòwò kejì yẹ kí ó ná àwọn ohun tí a fi ń ṣí sílẹ̀ nìkan, kí pàṣípààrọ̀ náà lè rí owó ìdókòwò tí ó mọ́ tónítóní sí tí ó ṣe kedere.

Ìyípadà àti ìṣàn ìgbésẹ̀ méjì ni a fihàn nínú [Ìmúṣe ìtọ́kasí ZIP 320](https://zips.z.cash/zip-0320#reference-implementation). Gbèsè èyí jẹ́ ìṣòro gidi kan láìpẹ́ yìí: ní oṣù kẹwàá ọdún 2026, XChainJS `zcash-js` ìkàwé tí a kọ̀ sílẹ̀ wúlò `tex1` àwọn olùgbà tí wọ́n ní àṣìṣe "Àdírẹ́sì 'láti' tí kò tọ́", nítorí pé olùdánilójú rẹ̀ kàn gba Base58Check nìkan `t1` fọọmu, eyiti o fọ awọn idogo ZEC si awọn iṣẹ ti o tẹjade `tex1` àdírẹ́sì ([Àtẹ̀jáde #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)) A ṣe àtúnṣe rẹ̀ nípa kíkọ́ olùdámọ̀ràn láti gba ìkọ̀wé ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Ohun ti fifiranṣẹ TEX fihan

Ìsanwó TEX jẹ́ ìsanwó tí a lè ṣe kedere, nítorí náà ó jẹ́ ti gbogbo ènìyàn, ṣùgbọ́n ó yẹ kí a sọ ní pàtó nípa ohun tí olùwòran lè rí àti ohun tí kò lè rí.

Ohun tí a lè rí** lórí ẹ̀wọ̀n:

* Àdírẹ́sì tí ó ṣe kedere fún ìgbà díẹ̀, nítorí pé ó farahàn gẹ́gẹ́ bí àbájáde ìgbésẹ̀ deshield àti ìtẹ̀síwájú ìfiránṣẹ́ ìkẹyìn.
* Iye mejeeji: iye ti o fi adagun aabo silẹ ni igbesẹ Z -> T, ati iye ti a fi jiṣẹ ni igbesẹ T -> T.
* Olùgbà tí ó hàn gbangba ti pàṣípààrọ̀ náà, èyí tí í ṣe àdírẹ́sì P2PKH tí a fi àmì sí nínú àdírẹ́sì TEX.

Ohun tí ó dúró ní **farasin**:

* Ìyókù owó ìpamọ́ rẹ, àti àwọn àkọsílẹ̀ pàtó tí a fi ààbò ṣe owó ìsanwó náà. Ìgbésẹ̀ deshield fihàn pé *díẹ̀* iye owó ni ó fi adágún náà sílẹ̀ sí àdírẹ́sì ìgbàkúgbà, kìí ṣe ibi tí ó ti wá nínú adágún náà.

Nítorí náà, olùwòye kan lè so àdírẹ́sì onígbà díẹ̀ pọ̀ mọ́ ìsanwó pàṣípààrọ̀ (owó kan náà, tí ó hàn gbangba sí tí ó hàn gbangba) ó sì lè rí i pé wọ́n fi kún un láti inú ìyọkúrò tí a dáàbò bò. Wọn kò le so ó pọ̀ mọ́ owó tàbí ìgbòkègbodò mìíràn tí a dáàbò bò. Kò sí ohun kan lórí ẹ̀wọ̀n tí ó fi àmì sí ìsanwó náà gẹ́gẹ́ bí ìfiránṣẹ́ "TEX": gẹ́gẹ́ bí àkọsílẹ̀ ZIP 320, ìsanwó sí àdírẹ́sì TEX kò ṣe é yà sọ́tọ̀ kúrò nínú ìsanwó sí ìbáramu `t1` àfiyèsí, nítorí pé àwọn òfin ìfohùnṣọ̀kan kò yípadà àti pé gbogbo òfin náà wà nínú àpò owó.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Ohun ti blockchain fihan

Òfin TEX ń gbé nínú àpò owó. Àwọn nódù kì í ṣàyẹ̀wò rẹ̀, nítorí náà àwọn òfin ìfohùnṣọ̀kan náà dúró gẹ́gẹ́ bí ó ti yẹ. Lórí ẹ̀wọ̀n, ìsanwó sí àdírẹ́sì TEX rí bí ìsanwó sí ìbáramu `t1` Àdírẹ́sì. Iye owó náà, àdírẹ́sì onígbà díẹ̀, àti àdírẹ́sì pàṣípààrọ̀ náà jẹ́ ti gbogbo ènìyàn, gẹ́gẹ́ bí ó ti rí pẹ̀lú ìṣòwò tí ó ṣe kedere.

## Àwọn ojú ìwé tó jọra

- [Àwọn Àdírẹ́sì Ìṣọ̀kan](/using-zcash/unified-addresses): naa `u1` ìrísí àdírẹ́sì lábẹ́ ZIP 316, àti àwọn ìpìlẹ̀ Bech32m a tún lo àdírẹ́sì TEX.
- [Àwọn Pípàṣípààrọ̀ Ààbò](/using-zcash/custodial-exchanges): àwọn pàṣípààrọ̀ tí wọ́n gbà irú àdírẹ́sì wo, títí kan àwọn owó ìdókòwò TEX Binance's.
- [Àwọn Àpò Ìpamọ́](/using-zcash/wallets): lo àlẹ̀mọ́ àdírẹ́sì TEX láti wá àwọn àpò owó tí ó lè san àdírẹ́sì TEX kan.
- [Àwọn Adágún Tí A Dáàbò Bo](/using-zcash/shielded-pools): nibiti iye owo ikọkọ rẹ wa ṣaaju ki isanwo TEX kan to gbe apakan rẹ jade.
- [Ta ló lè rí ìsanwó Zcash rẹ](/start-here/who-can-see-your-zcash-payment): ohun ti o han ni kete ti awọn owo ba jade kuro ni adagun aabo.
- [Ohun tí Olùṣàwárí Àkọsílẹ̀ lè rí](/zcash-tech/what-a-block-explorer-can-see): bawo ni isanwo ti o han gbangba ṣe han lori pq.
- [Ìbéèrè fún Ìsanwó Zcash URIs](/using-zcash/payment-request-uris): boṣewa apamọwọ miiran fun awọn sisanwo ti a ti kun tẹlẹ.

**Ìmúdàgba ìkẹyìn:** Oṣù Kẹwàá 2026
