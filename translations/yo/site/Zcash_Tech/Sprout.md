<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash bẹ̀rẹ̀ ní ọjọ́ kejìdínlọ́gbọ̀n oṣù kẹwàá ọdún 2016, pẹ̀lú adágún tí a dáàbò bo Sprout.

> **Ìkìlọ̀:** NU7 mú kí ZEC ṣì wà nínú adágún Sprout láìsí owó tí ó bá ti ṣiṣẹ́ (mainnet tí a fojú sí fún 5 Oṣù Kọkànlá 2026, ìpinnu ìkẹyìn 20 Oṣù Kẹwàá 2026; wo [ZIP 259](https://zips.z.cash/zip-0259)) Tí o bá ní owó Sprout, ka [Gbigba awọn owo pada](../using-zcash/recovering-funds) kí o sì kọ́kọ́ ṣí wọn lọ.

Ohun tí o máa mú kúrò: Sprout ni ibi tí Zcash ti bẹ̀rẹ̀, ìgbà àkọ́kọ́ tí owó ìkọ̀kọ̀, tí a lè fìdí rẹ̀ múlẹ̀, ń ṣiṣẹ́ lórí blockchain aláàyè.

Sprout ni ifilọlẹ atilẹba ti nẹtiwọọki Zcash, kii ṣe nigbamii [igbesoke nẹtiwọọki](../start-here/network-upgrades)Ó bẹ̀rẹ̀ sí í ṣiṣẹ́ ní ibi ìṣẹ̀dá genesis ní ọjọ́ kejìdínlọ́gbọ̀n oṣù kẹwàá ọdún 2016. Kò sí ZIP tí ó ní nọ́mbà tó túmọ̀ Sprout: ìlànà ZIP náà bẹ̀rẹ̀ pẹ̀lú Overwinter, nítorí náà, a ṣe àpèjúwe Sprout nípasẹ̀ Zcash Protocol Specification àtilẹ̀wá àti ìkọ́lé Zerocash tí a kọ́ ọ [Electric Coin Company](../zcash-organizations/electric-coin-company) (nígbà náà ni Zerocoin Electric Coin Company), tí Zooko Wilcox ṣe olórí, ló kọ́ ọ, tí wọ́n sì fi ránṣẹ́ sí i. Sprout ṣe àgbékalẹ̀ àwọn ìṣòwò àkọ́kọ́ tí a fi ààbò zk-SNARK ṣe àti adágún ààbò àkọ́kọ́, kí àwọn ènìyàn lè fi ZEC ránṣẹ́ pẹ̀lú olùránṣẹ́, olùgbà, àti iye tí a fi pamọ́ nígbà tí nẹ́tíwọ́ọ̀kì náà ṣì ń ṣàyẹ̀wò pé ìwọ̀n náà pọ̀ sí i. Orúkọ náà fi hàn pé ẹ̀wọ̀n kékeré kan tí ẹgbẹ́ náà retí pé yóò pọ̀ sí i.

Kí ló dé tí èyí fi ṣe pàtàkì? Gbogbo blockchain gbogbogbòò kí Sprout tó fi àwọn ìsanwó rẹ hàn: ẹnikẹ́ni lè rí ẹni tó sanwó fún àti iye tí ó san. Sprout ni nẹ́tíwọ́ọ̀kì àkọ́kọ́ tí kò ní àṣẹ láti fi àwọn kúlẹ̀kúlẹ̀ wọ̀nyẹn pamọ́ tí ó sì tún fi hàn pé kò sí ẹni tó ń ṣe àrékérekè. Èyí ṣe pàtàkì fún ìpamọ́ owó lásán, irú èyí tí o ń retí láti owó tàbí àkọsílẹ̀ báńkì tí ẹnikẹ́ni kò lè kà. Ó tún fi hàn pé ìpamọ́ tó lágbára lórí ẹ̀rọ lè ṣiṣẹ́ ní ìṣe, ju àwòrán ìwé lọ. Ayẹyẹ ìṣètò tí a gbẹ́kẹ̀lé tí ó mú kí ó ṣeé ṣe di ibi ìtọ́kasí fún iṣẹ́ ìkọ̀kọ̀ nígbà tó yá, àti ètò ìfìdí múlẹ̀ tí ó lọ́ra, tí ó sì ní ìrántí tí Sprout fi ránṣẹ́ ni ohun tó tì ẹgbẹ́ náà láti kọ́ Sapling ní ọdún méjì lẹ́yìn náà.

## Adágún adágún àkọ́kọ́ tí a dáàbò bò

Sprout ṣẹ̀dá irú àdírẹ́sì méjì. Àwọn àdírẹ́sì tí ó hàn gbangba (àwọn àdírẹ́sì t) ń ṣiṣẹ́ bíi Bitcoin, pẹ̀lú àwọn kúlẹ̀kúlẹ̀ tí a lè rí lórí ìwé àkọsílẹ̀ gbogbogbòò. Àwọn àdírẹ́sì tí a dáàbò bò (àwọn àdírẹ́sì z) ń fi owó ránṣẹ́ sí Sprout [adágún adágún tí a dáàbò bò](../using-zcash/shielded-pools), níbi tí olùránṣẹ́, olùgbà, àti iye owó náà ti fara pamọ́. Ọgbọ́n náà ni [zk-SNARKs](../zcash-tech/zk-snarks), àwọn ẹ̀rí àìmọ̀ tí ó jẹ́ kí ìṣòwò kan fihàn pé ó wúlò, láìsí ìnáwó méjì àti ìwọ̀n tí ó pọ̀ sí i, láìsí ṣíṣí àwọn kúlẹ̀kúlẹ̀ kankan payá. Sprout ni ìgbà àkọ́kọ́ tí èyí wáyé nínú ìṣelọ́pọ́ lórí owó aláfẹ́fẹ́ aláfẹ́.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Ayẹyẹ naa

Àwọn zk-SNARKs ní Sprout nílò àkójọ àwọn pàrámítà gbogbogbòò, àti pé ṣíṣe wọ́n láìléwu nílò ìṣètò kan ṣoṣo tí a pè ní Ìṣẹ̀lẹ̀. Àwọn olùkópa mẹ́fà ní àwọn ibi jíjìnnà ọ̀tọ̀ọ̀tọ̀ ló ṣe àkójọ ohun ìkọ̀kọ̀ kan, tí a ń pè ní egbin olóró. Tí ẹnikẹ́ni bá tún kó gbogbo àwọn ohun náà jọ, wọ́n lè ṣe ZEC láti inú ohunkóhun. Apẹẹrẹ náà yí ewu náà padà sí òfin tí ó rọrùn: níwọ̀n ìgbà tí ó kéré tán olùkópa kan bá pa ohun wọn run, a kò lè tún àṣírí náà kọ́, nítorí náà ṣíṣe àdàkọ kò ṣeé ṣe. Àwọn olùkópa tí a ti dárúkọ ní gbangba ní Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, àti Derek Hinch ti NCC Group. Olùkópa kan yàn láti má ṣe orúkọ ẹni.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Ìpilẹ̀ṣẹ̀ náà

Sprout ni ipilẹ̀ tí gbogbo ìyípadà tí ó tẹ̀lé e máa ń gbé kalẹ̀. Nígbà tí ẹ̀rọ ìdàgbàsókè nẹ́tíwọ́ọ̀kì dé pẹ̀lú Overwinter, ó pe àwọn òfin àtilẹ̀wá ní ẹ̀ka ìfohùnṣọ̀kan id 0, èyí tí ó túmọ̀ sí pé kò sí ìdàgbàsókè tí a ti lò. Gbogbo nǹkan láti ìgbà náà (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, àti síwájú) wà lórí ẹ̀wọ̀n Sprout tí a bẹ̀rẹ̀. Wọ́n kéde ìfilọ́lẹ̀ náà ní oṣù kẹjọ ọdún 2016 fún ìṣẹ̀dá ọjọ́ kẹrìndínlọ́gbọ̀n oṣù kẹwàá, ayẹyẹ náà wáyé ní ọ̀sẹ̀ díẹ̀ ṣáájú, àti àmì àkókò tí a fi kọ àkọlé genesis block kọ ní ọjọ́ kẹrìndínlọ́gbọ̀n oṣù kẹwàá ọdún 2016, ní agogo méje àti ìṣẹ́jú mẹ́rìndínlọ́gbọ̀n oṣù kẹwàá ọdún 2016.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Ìwé Àlàyé

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| zk-SNARK | Ẹ̀rí àìmọ̀ tí ó fi hàn pé ìṣòwò kan wúlò láìsí fífi olùránṣẹ́, olùgbà, tàbí iye tí ó fi hàn |
| Shielded pool | Apá ìkọ̀kọ̀ ti Zcash níbi tí a ti fi owó àti àwọn ayẹyẹ pamọ́ sí. Adágún Sprout ni àkọ́kọ́ |
| z-address and t-address | Àdírẹ́sì z ni a fi ààbò bo, àwọn àkọsílẹ̀ náà sì jẹ́ àṣírí. Àdírẹ́sì t náà ṣe kedere, ó sì fi àwọn àlàyé hàn lórí ìwé àkọsílẹ̀ gbogbogbòò |
| The Ceremony | Ètò ẹgbẹ́ olópọ̀ ti ọdún 2016 tí ó ṣe àgbékalẹ̀ àwọn ìlànà gbogbogbòò Sprout's, lẹ́yìn náà ó yọ àwọn ìdọ̀tí olóró náà kúrò |
| Toxic waste | Àwọn kókó pàtàkì láti inú ayẹyẹ náà tí a ní láti parun kí a má baà lè ṣe àgbélébùú ZEC |
| Consensus branch id 0 | Àmì fún àwọn òfin Sprout's, tí ó túmọ̀ sí ìpìlẹ̀ ṣáájú àtúnṣe nẹ́tíwọ́ọ̀kì èyíkéyìí |

## Awọn ibeere ti a maa n beere nigbagbogbo

Ṣé Sprout yí ZEC mi tàbí ìpamọ́ mi padà lónìí? Rárá o. Sprout ni ìtàn, ìfilọ́lẹ̀ tí ó bẹ̀rẹ̀ ẹ̀wọ̀n tí ZEC rẹ ń gbé. Àwọn owó rẹ àti ìpamọ́ rẹ lónìí sinmi lórí àpò owó àti adágún ààbò tí o ń lò nísinsìnyí, kì í ṣe lórí ohunkóhun tí o nílò láti ṣe nípa Sprout.

Kí ló dé tí kò sí nọ́mbà ZIP fún Sprout? Ìlànà ZIP náà bẹ̀rẹ̀ lẹ́yìn náà, pẹ̀lú àtúnṣe Overwinter. Sprout ni ìgbékalẹ̀ àkọ́kọ́, tí a ṣàlàyé nípasẹ̀ Zcash Protocol Specification àti ìkọ́lé Zerocash tí ó da lórí. ZIP 200 kàn mẹ́nu ba Sprout ní ìrísí ẹ̀yìn, gẹ́gẹ́ bí ẹ̀ka consensus id 0, ìpìlẹ̀ ṣáájú àtúnṣe èyíkéyìí.

Ṣé mo nílò láti gbẹ́kẹ̀lé àwọn ènìyàn mẹ́fà tó wà nínú ayẹyẹ náà? Wọ́n kọ́ ètò náà kí o lè jẹ́ ọ̀kan lára wọn kí o tó lè sọ òótọ́. Olúkúlùkù wọn ní ohun ìkọ̀kọ̀ kan, àti níwọ̀n ìgbà tí olùkópa kan bá pa tiwọn run, a kò lè tún àṣírí náà kọ́, kò sì sí ẹni tó lè ṣe ZEC. Wọ́n ti dárúkọ àwọn olùkópa márùn-ún ní gbangba, ọ̀kan sì wà láìlórúkọ.

Ṣé adágún Sprout ni àpò owó mi ń lò báyìí? Ó ṣeé ṣe kí ó máà rí bẹ́ẹ̀. Sprout ni adágún owó àkọ́kọ́ tí a fi ààbò pamọ́, ṣùgbọ́n àwọn àtúnṣe tó tẹ̀lé e bíi Sapling ṣe àgbékalẹ̀ àwòrán tí ó yára kánkán, àti pé ọ̀pọ̀lọpọ̀ àwọn adágún owó ló ń lo àwọn adágún tuntun lónìí. Sprout ṣì ṣe pàtàkì nítorí iṣẹ́ tí ó fi hàn pé àwọn ìṣòwò àdáni, tí a lè fìdí rẹ̀ múlẹ̀ lè ṣiṣẹ́ lórí nẹ́tíwọ́ọ̀kì aláàyè.

Kí ló mú kí Sprout yàtọ̀ sí Bitcoin? Bitcoin fi gbogbo ìsanwó sí orí ìwé àkọsílẹ̀ gbogbogbòò níbi tí iye àti àdírẹ́sì ti hàn. Sprout fi àwọn ìṣòwò tí a dáàbò bò kún un tí ó fi olùránṣẹ́, olùgbà, àti iye náà pamọ́ nígbà tí ó ṣì jẹ́ kí nẹ́tíwọ́ọ̀kì náà jẹ́rìí sí pé ìṣòwò náà wúlò. Ó pa àwọn àdírẹ́sì tí ó ṣe kedere mọ́, nítorí náà àwọn àṣà méjèèjì ń gbé lórí ẹ̀wọ̀n kan náà.

## Dán òye rẹ wò

A sábà máa ń pe Sprout ní ìdàgbàsókè nẹ́tíwọ́ọ̀kì pẹ̀lú gíga ìṣiṣẹ́. Kí ló dé tí èyí kò fi tọ́?

<details>
<summary>Answer</summary>

Sprout ni ìfilọ́lẹ̀ àkọ́kọ́ ti Zcash, kìí ṣe ìfilọ́lẹ̀ lẹ́yìn náà. Ó ti ń ṣiṣẹ́ láti ìgbà tí block genesis (block 0) ti bẹ̀rẹ̀ ní October 28, 2016, nítorí náà kò sí gíga ìṣiṣẹ́ láti tọ́ka sí. Ọ̀nà ìfilọ́lẹ̀ nẹ́tíwọ́ọ̀kì náà wá lẹ́yìn náà ó sì pe àwọn òfin Sprout's ní ẹ̀ka ìfọwọ́sowọ́pọ̀ id 0, ìpìlẹ̀ ṣáájú ìfilọ́lẹ̀ èyíkéyìí.
</details>

### Àwọn ohun àlùmọ́nì

[ZIP 200: Ọ̀nà Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì](https://zips.z.cash/zip-0200)

[Awọn imudojuiwọn nẹtiwọọki Zcash](https://z.cash/upgrade/)

[Electric Coin Company: Ìfilọ́lẹ̀ Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Àwòrán Àyẹyẹ Àyẹyẹ náà](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Wo tun

[Àwọn Adágún Tí A Dáàbò Bo](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Àwọn Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì Zcash](../start-here/network-upgrades)

[Kí ni ZEC àti Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Ẹ̀rọ: [Àtòjọ Àwọn Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì](../start-here/network-upgrades) · Itele: [Overwinter](../zcash-tech/overwinter)
