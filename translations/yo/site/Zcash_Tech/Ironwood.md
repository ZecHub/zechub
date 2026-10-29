<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood ti mu ṣiṣẹ lori Zcash mainnet ni bulọọki 3,428,143 ni Oṣu Keje 28, ọdun 2026 UTC, o si ti wa laaye lati igba naa.

Ohun tí o máa mú kúrò: ohun tí Ironwood máa ń yí padà, ìdí tí kòkòrò nínú owó tí a fi pamọ́ fi ṣe pàtàkì, àti bí ìgbámú náà ṣe ń jẹ́ kí ẹnikẹ́ni mọ̀ pé kò sí ZEC tí wọ́n ṣe.

Ironwood jẹ́ Zcash [igbesoke nẹtiwọọki](../start-here/network-upgrades), ní ìfọwọ́sowọ́pọ̀ NU6.3, tí ó ṣe àgbékalẹ̀ adágún tuntun kan tí ó ní orúkọ kan náà [adágún adágún tí a dáàbò bò](../using-zcash/shielded-pools) ni àkójọ owó tí iye àti àwọn olówó rẹ̀ dúró ní ìpamọ́ [Ìkọ̀sílẹ̀ àìmọ̀ òdo](../zcash-tech/zk-snarks)Ironwood wà láti kojú àti ṣe àyẹ̀wò àṣìṣe ìlera kan tí a rí nínú adágún tí ó ní ààbò Orchard tó wà tẹ́lẹ̀, àti láti fún àwùjọ ní ọ̀nà tó lágbára láti ṣàyẹ̀wò pé àpapọ̀ iye ZEC jẹ́ òótọ́. Àwọn òfin ìfohùnṣọ̀kan rẹ̀ ni a ṣàlàyé ní [ZIP 258](https://zips.z.cash/zip-0258).

Kí ló dé tí èyí fi ṣe pàtàkì? Pẹ̀lú owó tí ó hàn gbangba bíi Bitcoin, ẹnikẹ́ni lè ṣàyẹ̀wò pé kò sí owó tí wọ́n fi ṣe àfọwọ́kọ nípa kíkà ìwé àkọsílẹ̀ gbogbogbòò. Owó tí a fi ààbò pamọ́ máa ń fi iye owó náà pamọ́, nítorí náà o kò lè wo lásán. Dípò bẹ́ẹ̀, ìwé-ìpamọ́ fúnra rẹ̀ gbọ́dọ̀ rí i dájú pé kò sí ẹni tí ó lè dá owó ní ìkọ̀kọ̀. Ironwood ṣe pàtàkì nítorí pé a rí àṣìṣe kan nínú ìdánilójú yẹn fún adágún Orchard. Ìmúdàgbàsókè náà ti àlàfo náà pa, ó sì fún ẹnikẹ́ni ní ọ̀nà láti jẹ́rìí sí i pé àpapọ̀ iye ZEC ṣì jẹ́ òótọ́.

Tuntun sí Zcash? Bẹ̀rẹ̀ pẹ̀lú [Kí ni ZEC àti Zcash](../start-here/what-is-zec-and-zcash) àti [Àwọn Adágún Tí A Dáàbò Bo](../using-zcash/shielded-pools), lẹ́yìn náà, padà wá síbí.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Idi ti a fi nilo Ironwood

Ní ìparí oṣù karùn-ún ọdún 2026, olùwádìí ààbò olómìnira Taylor Hornby, nígbà tí wọ́n ń ṣe àyẹ̀wò ìlànà fún [Shielded Labs](../zcash-organizations/shielded-labs), fi hàn ní ọ̀nà tó tọ́ pé kòkòrò kan wà nínú adágún tí wọ́n fi ààbò Orchard ṣe. Orchard ni adágún tuntun tí wọ́n fi ààbò Zcash's ṣe ní àkókò náà, àbùkù náà sì wà ní apá kan tí ó ní ìlà elliptical nínú àyíká rẹ̀ tí kò ní ìmọ̀, èyí tí ó ń lo [Halo](../zcash-tech/halo) 2 eto idanwo.

1. Àṣìṣe ìlera túmọ̀ sí wípé ìṣirò tó fi hàn pé ìṣòwò kan wúlò kò dá a lójú pátápátá.
2. Ní ti èrò, ẹni tó ń lu ọkọ̀ ayọ́kẹ́lẹ́ lè lo àbùkù náà láti fi ṣe àṣeyọrí nínú adágún Orchard kí ó sì ná owó tí kì í ṣe tiwọn ní gidi, láìsí àmì kankan tí ibi tí ó wà nílẹ̀ yóò gbà.
3. Àwòrán ìyípadà Zcash's ṣì ń dín iye owó tí ó lè fi Orchard, nítorí náà, gbogbo owó tí ó wà nínú adágún náà kò lè pọ̀ sí i, ṣùgbọ́n ìkọ̀wé adágún náà kò fi dá wa lójú mọ́ pé gbogbo owó tí a fi pamọ́ sínú rẹ̀ jẹ́ òótọ́.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Àwọn nọ́mbà tó wà lókè yìí jẹ́ àwòrán tó rọrùn. Àbùkù gidi náà wà nínú iṣẹ́ ìṣirò kan pàtó nínú ẹ̀rọ náà, kì í ṣe kíkà owó tí ń wọlé àti tí ń jáde. Ohun tó yẹ ká mú kúrò ni pé àṣìṣe tó dára lè jẹ́ kí a ṣẹ̀dá iye nínú adágún náà láìsí ìwádìí.

Ní pàtàkì, kò sí ẹ̀rí pé wọ́n ti lo kòkòrò náà rí, kò sí ẹ̀rí pé ó ní ipa lórí owó àwọn olùlò, kò sì sí ẹ̀rí pé àpapọ̀ ìpèsè ZEC ti yípadà. A rí i nípasẹ̀ ìwádìí ààbò, a sì ti ṣe àtúnṣe rẹ̀ kí ó tó di pé a mọ̀ pé ó ní ìpalára kankan.

## Ìdáhùn náà

Àwùjọ Zcash fi àwọn àtúnṣe ránṣẹ́ ní ìpele-ìpele dípò gbogbo rẹ̀ lẹ́ẹ̀kan náà.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Ní ìbẹ̀rẹ̀ oṣù kẹfà ọdún 2026, ìgbésẹ̀ ìgbà díẹ̀ kan dá adágún Orchard dúró nígbà tí wọ́n ti ṣètò àtúnṣe pípé.
2. Ìgbéga NU6.2 ṣe àtúnṣe sí ẹ̀rọ Orchard fúnra rẹ̀, ó sì ti pa àìlera ìlera tó wà lábẹ́ rẹ̀ mọ́.
3. Ìgbéga NU6.3, Ironwood, ṣe àgbékalẹ̀ adágún tuntun tí a dáàbò bò àti ibi ìṣàyẹ̀wò gbogbogbòò kí iye owó lè kúrò nínú adágún Orchard àtijọ́ lábẹ́ àyẹ̀wò pípé.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ohun tí adágún Ironwood ń ṣe

NU6.2 gba agbegbe Orchard laaye fun gbogbo awọn iṣowo tuntun, ṣugbọn iye ti a ṣẹda labẹ awọn ofin atijọ tun wa ni adagun Orchard. Ironwood fun iye yẹn ni ibi mimọ ati ọna lati ṣe ayẹwo rẹ bi o ti n lọ.

Adágún Ironwood ni adágún iye tí a dáàbò bo tí NU6.3 dá sílẹ̀ ní block 3,428,143. A kọ́ ọ lórí àyíká tí a ti ṣàtúnṣe, ó sì ń lo ìrísí àkọsílẹ̀ tí a lè gbà padà (àwòrán kan tí ó jẹ́ kí a gba owó padà tí a bá fẹ́ [Àwọn kọ̀mpútà kuantum](../zcash-tech/post-quantum-security) máa fọ́ ìkọ̀kọ̀ ayélujára òde òní), tí a túmọ̀ sí [ZIP 2005](https://zips.z.cash/zip-2005).

1. Lẹ́yìn ìṣiṣẹ́, adágún Orchard àtijọ́ náà di èyí tí a ń náwó nìkan, nítorí náà kò sí iye tuntun kankan tí ó lè wọlé sí i.
2. Iye tuntun ti a daabo bo n ṣàn sinu Ironwood dipo.
3. Nínú Ironwood, ZEC tí a fi ààbò pamọ́ ń pa ìpamọ́ mọ́ tí ó ń fi olùránṣẹ́, olùgbà, àti iye owó pamọ́. Gbígbé ZEC láti Orchard sí Ironwood fi iye tí a gbé pamọ́ hàn.

## Ìyípo náà

Èrò pàtàkì nínú Ironwood ni turnstile, ibi ìṣàyẹ̀wò ìṣirò owó tí gbogbo owó gbọ́dọ̀ gbà nígbà tí a bá ń gbéra láti adágún Orchard àtijọ́ sí Ironwood.

> Tíìlì ìyípadà máa ń ṣe fún owó tí a fi pamọ́ bí ilẹ̀kùn dígí ṣe ń ṣe fún ibi ìpamọ́ báńkì. O kò tíì lè rí inú rẹ̀, ṣùgbọ́n o lè ka iye ohun tí ó wọlé àti èyí tí ó jáde.

1. A ka owo ti o n jade kuro ni Orchard ni aaye idaniloju gbogbogbo ṣaaju ki wọn to wọ Ironwood.
2. Èyí ń jẹ́ kí ẹnikẹ́ni ṣe àyẹ̀wò iye tí ZEC ń ṣí lọ síta, èyí sì ń mú kí ìgbẹ́kẹ̀lé wa nínú iye tí ó ń lọ káàkiri gidi lágbára sí i.
3. Tí a bá ṣẹ̀dá ZEC èyíkéyìí nípasẹ̀ àṣìṣe ìṣáájú, ìṣirò ìṣíkiri yìí ni yóò fara hàn.

Àwọn ẹ̀rọ ìyípadà kìí ṣe tuntun sí Zcash. Nẹ́tíwọ́ọ̀kì náà ti lò wọ́n tẹ́lẹ̀, ní ààlà láàrín àwọn adágún Sprout, Sapling, àti Orchard, nítorí náà iye tí ń lọ láàrín àwọn adágún náà yóò máa jẹ́ èyí tí a lè ṣàyẹ̀wò, kò sì sí adágún tí ó lè tú jáde ju bí ó ti yẹ lọ tí ó fi òfin gbé e kalẹ̀.

Àwọn òfin ìfọwọ́sowọ́pọ̀ máa ń pa gbogbo iye owó mọ́, títí kan Ironwood, láàárín ààlà owó tó ga jùlọ ti nẹ́tíwọ́ọ̀kì náà, nítorí náà, ìwọ̀n owó kò lè lọ sí ibi tí kò dára rárá.

## Ohun ti awọn olumulo nilo lati ṣe

Àwọn àpò owó àti sọ́fítíwọ́ọ̀tì nódù ló ń bójú tó èyí láìfọwọ́sí, ṣùgbọ́n ìyípadà tó wúlò rọrùn: bí àkókò ti ń lọ, wọ́n máa ń gbé àwọn ohun ìní tí a dáàbò bò láti inú adágún Orchard àtijọ́ láti inú turnstile sínú adágún Ironwood. Ìgbésẹ̀ kọ̀ọ̀kan máa ń fi iye rẹ̀ hàn lórí blockchain, nítorí náà àwọn àpò owó tí ó tẹ̀lé e [ZIP 318](https://zips.z.cash/zip-0318) pín in sí iye owó tí a ṣe déédéé kí o sì fi ránṣẹ́ ní àkókò díẹ̀. Tẹ̀lé ìtọ́sọ́nà láti ọ̀dọ̀ olùpèsè àpò owó rẹ, kí o sì fi sọ́fítíwè rẹ sí ìtújáde tí a lè fọwọ́ sí.

## Ìwé Àlàyé

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| Shielded pool | Àkójọ owó tí iye àti àwọn olówó rẹ̀ wà lábẹ́ ìkọ̀kọ̀ ìmọ̀-òdodo |
| Soundness bug | Àbùkù kan tó ń jẹ́ kí ìṣòwò tí kò tọ́ kọjá àyẹ̀wò ẹ̀rí bíi pé ó wúlò |
| Turnstile | Àyẹ̀wò gbogbogbòò tí ó ń ka iye ìṣípò láàárín àwọn adágún kí ìpèsè náà lè dúró ní àyẹ̀wò |
| Spend-only | Adágún omi kan tí o lè ná láti, ṣùgbọ́n tí o kò lè fi ìní tuntun kún un |
| Network upgrade (NU) | Àyípadà tí a ṣètò sí àwọn òfin ìfohùnṣọ̀kan Zcash's, tí a mú ṣiṣẹ́ ní gíga bulọ́ọ̀kì tí a ṣètò |
| Quantum-recoverable note | A ṣe àgbékalẹ̀ àkọsílẹ̀ kan kí a lè gba owó padà tí àwọn kọ̀ǹpútà quantum bá lè ba ìkọ̀kọ̀ ayélujára òde òní jẹ́ |

## Awọn ibeere ti a maa n beere nigbagbogbo

Ṣé ZEC mi kan? Rárá. Kò sí ẹ̀rí pé wọ́n ti lo kòkòrò náà rí, kò ní ipa kankan lórí owó àwọn olùlò, bẹ́ẹ̀ ni kò sí ìyípadà sí àpapọ̀ ìpèsè náà.

Ṣé mo nílò láti ṣe ohunkóhun? Pa àpò owó àti sọ́fítíwètì rẹ mọ́ lórí ìtújáde tí a lè ṣètìlẹ́yìn. Lílo owó Orchard máa ń gbé wọn lọ sí Ironwood, iye tí ó bá sì kọjá yóò jẹ́ ti gbogbo ènìyàn. Àwọn àpò owó kan máa ń fúnni ní ìṣípò tí ó máa ń fi iye owó tí ó wà ní ìpele kan ránṣẹ́ nígbà tí àkókò bá ń lọ, nítorí náà ó ṣòro láti so ìwọ̀n owó rẹ pọ̀. Tẹ̀lé ìtọ́sọ́nà olùpèsè àpò owó rẹ.

Ṣé Zcash ṣì jẹ́ àdáni? Bẹ́ẹ̀ni. Ìsanwó nínú ìpamọ́ olùránṣẹ́, olùgbà, àti iye owó tí ó wà nínú Ironwood, gẹ́gẹ́ bí ìsanwó Orchard ti ṣe. Iye tí ó ń lọ láàárín àwọn adágún, bíi láti Orchard sí Ironwood, jẹ́ ti gbogbo ènìyàn. Ìmúdàgbàsókè yìí dá lórí ìdúróṣinṣin ìpèsè.

Ṣé kòkòrò náà ti lò ó rí? Kò sí ẹ̀rí pé ó ti lò ó rí. A rí i nípasẹ̀ ìwádìí ààbò, a fi hàn án ní ọ̀nà tó tọ́, a sì ti ṣe àtúnṣe rẹ̀ kí ó tó di pé a mọ̀ pé ó ní ewu kankan.

Kí ló máa ṣẹlẹ̀ sí adágún Orchard àtijọ́ náà? Ó di èyí tí a náwó nìkan. Kò sí iye tuntun kankan tó lè wọlé sí i, iye tó wà tẹ́lẹ̀ sì máa ń lọ sí Ironwood nípasẹ̀ ìyípo, níbi tí wọ́n ti ń ṣe àyẹ̀wò ìṣípò náà ní gbangba.

## Dán òye rẹ wò

Tí ZEC tó wà nínú àwọn adágún tí wọ́n ní ààbò bá fara pamọ́, báwo ni ẹnikẹ́ni ṣe lè jẹ́rìí sí i pé kòkòrò Orchard kò fi gbogbo ìpèsè náà kún inú rẹ̀ ní ìkọ̀kọ̀?

<details>
<summary>Answer</summary>

Láti inú ìsàlẹ̀ títì. Gbogbo owó tí ó jáde kúrò ní adágún Orchard àtijọ́ ni a kà sí ibi tí gbogbo ènìyàn ń ṣọ́ bí ó ti ń wọ inú Ironwood. Tí iye owó bá pọ̀ ju èyí tí a fi òfin gbé kalẹ̀ lọ, ìṣirò owó náà kò ní dọ́gba, nítorí náà, ohunkóhun tí kòkòrò náà bá lè ṣẹ̀dá yóò fara hàn ní ẹnu ọ̀nà náà.
</details>

### Àwọn ohun àlùmọ́nì

[ZIP 258: Ìgbékalẹ̀ Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Ìgbékalẹ̀ Ìdínkù Àìlera Ìgbà Díẹ̀ fún Orchard àti Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Ìmúpadàbọ̀sípò Ironwood Quantum](https://zips.z.cash/zip-2005)

[ZIP 229: Ẹ̀yà 6 Ìlànà Ìṣòwò](https://zips.z.cash/zip-0229)

[ZIP 318: Ìṣípòpadà Orchard sí Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Adagun Tuntun ti a fi Idaabobo Pamọ fun Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Wo tun

[Àwọn Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì Zcash](../start-here/network-upgrades)

[Àwọn Adágún Tí A Dáàbò Bo](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Ààbò Kọ́ńtíọ̀mù Lẹ́yìn](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Kí ni ZEC àti Zcash](../start-here/what-is-zec-and-zcash)

---

Ẹ̀rọ: [Àtòjọ Àwọn Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì](../start-here/network-upgrades) · Ti tẹlẹ: [NU6.2](../zcash-tech/nu6-2)
