<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 bẹ̀rẹ̀ sí í lo Zcash mainnet ní block 1,687,104 (May 31, 2022 UTC).

Ohun tí o máa mú kúrò: bí NU5 ṣe fún Zcash ní adágún tuntun tí kò nílò ètò ìgbẹ́kẹ̀lé, pẹ̀lú irú àdírẹ́sì kan ṣoṣo tí ó ń ṣiṣẹ́ káàkiri adágún.

NU5 (Ìgbéga Nẹ́tíwọ́ọ̀kì 5) ni Zcash kẹfà [igbesoke nẹtiwọọki](../start-here/network-upgrades), ti a fi ranṣẹ́ láti ọwọ́ [ZIP 252](https://zips.z.cash/zip-0252)Ó jẹ́ àtúnṣe pàtàkì nínú ìkọ̀kọ̀. Ó ṣe àgbékalẹ̀ ìlànà ìsanwó Orchard tí a dáàbò bo, tí a kọ́ sórí ètò ìṣàfihàn Halo 2, pẹ̀lú àwọn àdírẹ́sì tí a ti ṣọ̀kan àti ìṣètò ìṣòwò tuntun ti ẹ̀yà 5. NU5 ti fi ránṣẹ́ sí ìtẹ̀jáde zcashd v5.0.0 Electric Coin Company's.

Ìdí tí èyí fi ṣe pàtàkì. Adágún adágún tó ní ààbò jẹ́ ohun tó ṣeé gbẹ́kẹ̀lé bíi ti ètò tó ṣẹ̀dá rẹ̀. Àwọn adágún adágún méjì àkọ́kọ́ Zcash's ní ààbò, Sprout àti Sapling, ọ̀kọ̀ọ̀kan wọn nílò ayẹyẹ ìṣètò tó ṣeé gbẹ́kẹ̀lé lẹ́ẹ̀kan láti mú àwọn pàrámítà ìkọ̀kọ̀ wọn jáde. Tí a bá pa àwọn pàrámítà wọ̀nyẹn mọ́ dípò kí a pa wọ́n run, ẹnìkan ìbá ti tẹ̀ ZEC èké jáde láìsí ẹnikẹ́ni tó rí i. Adágún Orchard NU5's ti parí ọ̀ràn yẹn nípa lílo ètò ìṣàfihàn Halo 2, èyí tí kò nílò irú ayẹyẹ bẹ́ẹ̀.

## Eto ti o gbẹkẹle

Orchard ni ilana aabo ti a ṣe agbekalẹ nipasẹ NU5, ti a ṣalaye ni [ZIP 224](https://zips.z.cash/zip-0224). A kọ́ ọ lórí ètò ìṣàfihàn Halo 2, èyí tí ó ń lo ọ̀nà kan tí a ń pè ní PLONKish arithmetization lórí Pallas àti Vesta curve cycle. Èrè tó wúlò rọrùn: Halo 2 kò nílò ètò tí a gbẹ́kẹ̀lé àti kò sí okùn ìtọ́kasí tí a ṣètò, nítorí náà kò sí pàrámítà ìkọ̀kọ̀ tí a lè lò lọ́nà tí kò tọ́.

Sprout àti Sapling gbára lé ètò ìgbẹ́kẹ̀lé kan. Àwùjọ àwọn ènìyàn kan ṣe ayẹyẹ kan láti kọ́ àwọn pàrámítà adágún kọ̀ọ̀kan, gbogbo ènìyàn sì ní láti gbẹ́kẹ̀ lé pé ó kéré tán ọ̀kan nínú wọn ba apá àṣírí wọn jẹ́. Orchard mú èrò yẹn kúrò. Àwọn adágún àtijọ́ ṣì wà lẹ́yìn NU5, nítorí náà ìdánilójú àìsí ìṣètò kan owó tí o ní nínú adágún Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Ohun ti NU5 yipada

NU5 kó àwọn àyípadà ìfohùnṣọ̀kan jọ, gbogbo wọn sì ṣiṣẹ́ papọ̀ ní block 1,687,104.

1. Ó fi adágún tí wọ́n dáàbò bo Orchard (ZIP 224) kún un, ìlànà Halo 2 tí a ṣàlàyé lókè yìí.
2. Ó fi ìṣètò ìṣòwò ẹ̀yà 5 (ZIP 225) kún un, ìṣètò àtúntò pẹ̀lú àwọn agbègbè ọ̀tọ̀ọ̀tọ̀ fún ìfihàn, Sapling, àti ìwífún Orchard tuntun. A yọ àwọn pápá Sprout kúrò, ìṣètò àtijọ́ ẹ̀yà 4 sì dúró ṣinṣin lẹ́yìn ìṣiṣẹ́.
3. Ó ṣe àgbékalẹ̀ àwọn Àdírẹ́sì Ìṣọ̀kan àti àwọn kọ́kọ́rọ́ ìwòye ìṣọ̀kan (ZIP 316), tí a ṣàgbékalẹ̀ ní abala tí ó tẹ̀lé.
4. Ó gba àmì ìdámọ̀ ìṣòwò tí kò ṣeé yípadà (ZIP 244), ọ̀nà tuntun láti ṣe ìṣirò ìdámọ̀ ìṣòwò kan tí ó ya ohun tí ìṣòwò kan ń ṣe sọ́tọ̀ kúrò lára àwọn ẹ̀rí àti ìfọwọ́sowọ́pọ̀ tí ó fún un láṣẹ.
5. Ó lo àwọn ìlànà ìkọ̀wé Jubjub (ZIP 216) láti mú àwọn ìlànà ìkọ̀wé tí kò bá ìlànà mu kúrò àti láti mú àwọn òfin lórí ohun tí a kà sí ìṣòwò tó wúlò.
6. Ó mú kí àtúnṣe àwọn ìṣòwò ẹ̀yà 5 kọjá nẹ́tíwọ́ọ̀kì ẹgbẹ́-sí-ẹgbẹ́ (ZIP 239).

NU5 tún ṣe àtúnṣe sí ọ̀pọ̀lọpọ̀ àwọn ZIP tó wà tẹ́lẹ̀ (32, 203, 209, 212, 213, 221, àti 401) nítorí náà wọ́n dúró fún adágún Orchard tuntun náà.

## Àwọn Àdírẹ́sì Ìṣọ̀kan

Kí NU5, adágún kọ̀ọ̀kan ní irú àdírẹ́sì tirẹ̀, olùránṣẹ́ sì gbọ́dọ̀ mọ irú àdírẹ́sì tí o fẹ́ [ZIP 316](https://zips.z.cash/zip-0316), yí èyí padà. Àdírẹ́sì ìṣọ̀kan kan ṣoṣo lè kó àwọn olugba jọ fún ju adágún kan lọ, nítorí náà àpò owó olùránṣẹ́ náà yóò yan èyí tó dára jùlọ tí ó ń gbà.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Àwọn kọ́kọ́rọ́ ìwòye tí a sopọ̀ mọ́ra ń ṣiṣẹ́ lọ́nà kan náà fún wíwo. Wọ́n fúnni ní ìrísí kíkà nìkan lórí àwọn adágún náà ní àwọn ìbòjú àdírẹ́sì. Fún ẹ̀kúnrẹ́rẹ́ lórí èyí, wo ẹ̀kúnrẹ́rẹ́ lórí èyí [Àwọn Kọ́kọ́rọ́ Wíwo](../zcash-tech/viewing-keys) ojú ìwé.

## Ibi ti NU5 joko

NU5 tẹ̀lé àwọn àtúnṣe Zcash's tẹ́lẹ̀: Overwinter, Sapling, Blossom, Heartwood, àti Canopy. Ó ṣiṣẹ́ lórí mainnet ní ọjọ́ kọkànlélọ́gbọ̀n oṣù karùn-ún ọdún 2022. A yan ìyípo ìlà ìyípadà Orchard's nítorí pé ó ń ṣe àtìlẹ́yìn fún recursion, èyí tí ó jẹ́ ìpìlẹ̀ fún iṣẹ́ ìyípadà lẹ́yìn náà. NU5 ni ó ṣáájú ìlà àtúnṣe NU6 àti NU6.x, èyí tí a kọ́ sórí adágún Orchard tí ó sì tún un ṣe lẹ́yìn náà.

## Ìwé Àlàyé

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| Network upgrade (NU) | Àyípadà tí a ṣètò sí àwọn òfin ìfohùnṣọ̀kan Zcash's, tí a mú ṣiṣẹ́ ní gíga bulọ́ọ̀kì tí a ṣètò |
| Orchard | Adágún adágún NU5 tí a fi ààbò ṣe, tí a kọ́ sórí ètò ìṣàfihàn Halo 2 |
| Halo 2 | Ètò ìṣàfihàn lẹ́yìn Orchard tí kò nílò ètò ìgbẹ́kẹ̀lé |
| Trusted setup | Ayẹyẹ ìgbà kan ṣoṣo tí ó ṣe àwọn àṣírí ìkọ̀kọ̀ adágún kan tí a sì gbọ́dọ̀ gbẹ́kẹ̀lé láti pa wọ́n run |
| Unified Address | Àdírẹ́sì kan ṣoṣo tó lè kó àwọn olùgbà jọ fún ju adágún kan lọ (ZIP 316) |
| Consensus branch id | Àmì ìdámọ̀ tí ó ń fi àmì sí àwọn òfin tí ìṣòwò kan jẹ́ ti |

## Awọn ibeere ti a maa n beere nigbagbogbo

Ṣé NU5 yí ZEC mi tàbí ìpamọ́ mi padà? Rárá. NU5 fi adágún tuntun tí a dáàbò bo àti ìrísí àdírẹ́sì tuntun kún un. ZEC rẹ tí ó wà tẹ́lẹ̀ kò ní ipa kankan lórí rẹ̀, ìpamọ́ rẹ kò sì dínkù. Gbígbé owó sínú Orchard fún ọ ní adágún kan tí kò nílò ìṣètò tí a gbẹ́kẹ̀lé.

Kí ni Orchard? Orchard jẹ́ ìlànà ààbò Zcash's tí NU5. Ó ń ṣiṣẹ́ lórí ètò ìṣàfihàn Halo 2, nítorí náà kò nílò ayẹyẹ ìṣètò tí a gbẹ́kẹ̀lé.

Ṣé mo ní láti ṣe ohunkóhun? Rárá. Àpò ìpamọ́ tí a lè lò máa ń mú NU5 fún ọ. O lè máa lo àwọn àdírẹ́sì àtijọ́, o sì lè bẹ̀rẹ̀ sí í lo àwọn àdírẹ́sì tí a ti ṣọ̀kan nígbà tí àpò ìpamọ́ rẹ bá fún ọ ní wọn.

Kí ni Àdírẹ́sì kan ṣoṣo? Àdírẹ́sì kan ṣoṣo tó lè gba àwọn olùgbà fún ju adágún kan lọ. Àpò owó olùránṣẹ́ ló máa ń yan adágún tó ń gbé, nítorí náà o kò ní láti pín àdírẹ́sì mìíràn fún irú kọ̀ọ̀kan.

Ṣé NU5 yóò yọ ètò ìgbẹ́kẹ̀lé kúrò nínú owó àtijọ́ mi? Kì í ṣe nípa àtúnṣe. Orchard kò nílò ètò ìgbẹ́kẹ̀lé, ṣùgbọ́n àwọn ìlànà ìṣáájú ti Sapling pool ṣì wà lẹ́yìn NU5. Ìdánilójú àìsí ètò kan àwọn owó tí a tọ́jú nínú pool Orchard.

Ṣé ìṣètò ìṣòwò àtijọ́ náà dáwọ́ dúró? Rárá. NU5 fi ìṣètò ìṣètò ìṣètò 5 kún un, ìṣètò ìṣètò ìṣètò ìṣètò àtijọ́ náà sì dúró ṣinṣin lẹ́yìn ìṣiṣẹ́.

## Dán òye rẹ wò

Àwọn méjèèjì nílò ayẹyẹ ìṣètò tí a lè fọkàn Sapling. Kí ni adágún Orchard NU5's Sprout padà nípa èyí, kí sì nìdí tí ó fi ṣe pàtàkì?

<details>
<summary>Answer</summary>

A kọ́ Orchard sórí ètò ìṣàfihàn Halo 2, èyí tí kò nílò ìṣètò tí a gbẹ́kẹ̀lé àti kò sí okùn ìtọ́kasí tí a ṣètò. Èyí mú ewu kúrò pé a lè lo àwọn pàrámítà ìkọ̀kọ̀ tí ó kù láti ṣe àdàkọ ZEC. Ìdánilójú náà kan owó tí a tọ́jú ní adágún Orchard. Àwọn pàrámítà Sapling àtijọ́ ṣì wà lẹ́yìn NU5.
</details>

### Àwọn ohun àlùmọ́nì

[ZIP 252: Ìgbékalẹ̀ Ìgbéga Nẹ́tíwọ́ọ̀kì NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Ilana Idaabobo Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Ẹ̀yà 5 Ìlànà Ìṣòwò](https://zips.z.cash/zip-0225)

[ZIP 316: Àwọn Àdírẹ́sì Ìṣọ̀kan àti Àwọn Kọ́kọ́rọ́ Ìwòye Ìṣọ̀kan](https://zips.z.cash/zip-0316)

[Igbesoke Nẹtiwọọki 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: ìtújáde zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Wo tun

[Àwọn Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì Zcash](../start-here/network-upgrades)

[Àwọn Adágún Tí A Dáàbò Bo](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Àwọn Kọ́kọ́rọ́ Wíwo](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Ẹ̀rọ: [Àtòjọ Àwọn Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì](../start-here/network-upgrades) · Ti tẹlẹ: [Canopy](../zcash-tech/canopy) · Itele: [NU6](../zcash-tech/nu6)
