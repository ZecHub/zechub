<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ṣé Zcash Post-Quantum ni?

## Idahun kukuru

Rárá, kò tíì dé.

Láti ìgbà tí wọ́n ti ṣe àtúnṣe sí Ironwood, Zcash ti di **quantum-recovery** fún owó tí wọ́n tọ́jú ní adágún Ironwood. Ìgbésẹ̀ gidi ni èyí, ṣùgbọ́n kì í ṣe ohun kan náà gẹ́gẹ́ bí wíwà ní ààbò lẹ́yìn quantum. ZIP 2005, àpèjúwe tí ó wà lẹ́yìn rẹ̀, sọ tààràtà: ìyípadà náà "kò fún ara rẹ̀ mú kí ìlànà náà wà ní ààbò lòdì sí àwọn ọ̀tá quantum". Ó ń pèsè owó Ironwood kí wọ́n lè gbé e lọ nípasẹ̀ Ìlànà Ìgbàpadà ọjọ́ iwájú nígbà tí a bá ti pa ìkọ̀kọ̀ ìpamọ́ lọ́wọ́lọ́wọ́.

Ojú ìwé yìí ya àwọn ohun tí Zcash ń dáàbò bò lónìí, ohun tí Ironwood yípadà, ohun tí ó ṣì hàn gbangba, àti ohun tí ó jẹ́ àbá lásán [tábìlì ipò](#status-table) ní ìparí rẹ̀ fi ibi tí gbogbo nǹkan dúró sí àti ìgbà tí wọ́n ṣe àyẹ̀wò ìkẹyìn hàn.

<br/>

## Ta ni èyí fún

- Ẹnikẹ́ni tí ó bá ti rí “a lè mú kí quantum padà” tí ó sì kà á gẹ́gẹ́ bí “agbára ìfàmọ́ra quantum”
- Àwọn tó ni ilé iṣẹ́ náà pinnu bóyá kí wọ́n gbé owó náà lọ sí Ironwood
- Àwọn òǹkọ̀wé àti àwọn olùdarí tí wọ́n nílò ìdáhùn láti ọ̀dọ̀ àwọn ènìyàn láti tọ́ka sí

Fun alaye lori iširo kuatomu funrararẹ, bẹrẹ pẹlu [Ààbò Lẹ́yìn-Ìwọ̀n-Owó ní Zcash](/zcash-tech/post-quantum-security).

<br/>

## Kí ló dé tí ìbéèrè náà fi dàrú

Wọ́n ń lo "Post-quantum" bí ẹni pé ohun ìní kan ṣoṣo ni. Fún Zcash, ó kéré tán ìbéèrè mẹ́rin ọ̀tọ̀ọ̀tọ̀ ni, wọ́n sì ní ìdáhùn ọ̀tọ̀ọ̀tọ̀:

1. **Ìpamọ́.** Ṣé apànìyàn kan lè mọ ẹni tí ó san owó náà àti iye tí ó san?
2. **Ìnáwó.** Ǹjẹ́ apànìyàn kan lè ná owó tí kì í ṣe tirẹ̀?
3. **Ìfàsẹ́yìn.** Ṣé agbábọ́ọ̀lù kuantum kan lè ṣẹ̀dá ZEC láti inú ohun tí kò sí?
4. **Ìgbàpadà.** Tí a bá ní láti pa ìkọ̀kọ̀ ìpamọ́ lọ́wọ́lọ́wọ́, ṣé àwọn olùlò olóòótọ́ lè máa gba owó wọn?

Ironwood nìkan ló máa ń yí ìdáhùn sí ìbéèrè kẹrin padà, ó sì máa ń yí ìdáhùn padà fún àwọn àkọsílẹ̀ tó wà nínú adágún Ironwood nìkan.

Ewu tó wà lẹ́yìn gbogbo èyí ni ẹni tó lè ṣírò àwọn logarithms tó yàtọ̀ síra lórí àwọn ìlà elliptic Zcash ń lò. Kọ̀ǹpútà quantum tó tóbi tó ń lo algoridimu Shor yóò jẹ́ ọ̀nà kan láti ṣe èyí. ZIP 2005 tọ́ka sí i pé wíwá logarithm **síkan** tó yàtọ̀ tó tó láti fa ìfàsẹ́yìn tàbí jíjí owó.

<br/>

## Ohun tí Zcash ń dáàbò bò lónìí

Táblì yìí ṣàlàyé ìlànà náà bí ó ṣe ń ṣiṣẹ́ nísinsìnyí, lòdì sí olùkọlù kan tí ó lè fọ́ àwọn logarithms ọ̀tọ̀ọ̀tọ̀. Ó kan gbogbo adágún tí a dáàbò bò, pẹ̀lú Ironwood, nítorí pé Ironwood ń lo ìyíká Orchard kan náà, àwọn ẹ̀rí Halo 2 àti àwọn ìfọwọ́sowọ́pọ̀ RedPallas gẹ́gẹ́ bí Orchard.

| Ohun ìní | Lodi si agbébọn kuatomu kan loni | Ohun ti Ironwood yipada |
|---|---|---|
| Ìpamọ́ | Ó máa ń dúró tí ẹni tó ń lu ọ́ kò bá mọ àdírẹ́sì ààbò rẹ. Àwọn ẹ̀rí àti àwọn ìfọwọ́sowọ́pọ̀ tí a tún ṣe àtúnṣe kò ní jẹ́ kí ohunkóhun pọ̀ sí i. Tí ẹni tó ń lu ọ́ bá mọ àdírẹ́sì náà, wọ́n lè kọ àwọn àkọsílẹ̀ tí a fi ránṣẹ́ sí i, títí kan àwọn àtijọ́ tí a ti fi pamọ́ láti inú ẹ̀wọ̀n náà. | Kò sí ohunkóhun. ZIP 2005: "Ipò tí ó wà ní ìbámu pẹ̀lú Ìpamọ́ kò yí padà fún adágún èyíkéyìí." |
| Ìnáwó | Kò ní ààbò. Ẹni tó ń lu èèyàn lè ṣe àgbékalẹ̀ ẹ̀rí tàbí kí ó ná owó ìfọwọ́sowọ́pọ̀, kí ó sì jí nǹkan kan nínú àpò ààbò, kódà fún àwọn àdírẹ́sì tí wọn kò tíì rí rí. | Kò sí ohun tó ń ṣẹlẹ̀. Ààbò náà yóò dé lẹ́yìn ìyípadà sí Ìlànà Ìgbàpadà lọ́jọ́ iwájú. |
| Ìfàsẹ́yìn | Kò ní ààbò. Olùkọlù kan lè ṣe ẹ̀rí tó wúlò, kí ó sì ṣẹ̀dá ZEC nínú adágún ààbò èyíkéyìí, bóyá láìsí ẹnikẹ́ni tó kíyèsí i. Ààlà kan ṣoṣo ni èyí tó yẹ kó wà [ìyípo](/zcash-tech/the-turnstile): kò sí adágún omi tó lè san ju ìwọ̀n tí a ti gbà sílẹ̀ lọ. | Kò sí ohun tó ń ṣẹlẹ̀ sí i. Àwọn ìwé Ironwood ti pinnu láti fi gbogbo ohun tó wà nínú wọn sílò lọ́nà tí a kò gbọdọ̀ fi ṣe àdàkọ, èyí tí ìlànà Ìgbàpadà ọjọ́ iwájú nílò láti mú kí ìpèsè náà máa lọ dáadáa. |
| Ìmúpadàbọ̀sípò | Àwọn àkọsílẹ̀ Sprout, Sapling àti Orchard kò ní ipa ọ̀nà àtúnṣe kankan. Nígbà tí a bá ti pa àwọn ìlànà wọn, ohunkóhun tí ó bá kù nínú wọn kò ní ṣeé rí. | Gbogbo àkọsílẹ̀ Ironwood ni a lè rí padà ní ìlànà. Kò sí àkọsílẹ̀ Sapling tàbí Orchard. |

Àlàyé ZEC jẹ́ ọ̀ràn ọ̀tọ̀. Àwọn ìfọwọ́sowọ́pọ̀ ECDSA rẹ̀ lè jẹ́ àfọwọ́kọ nígbà tí a bá mọ kọ́kọ́rọ́ gbogbogbòò. Fún àdírẹ́sì tí ó ṣe kedere tí ó máa ń ṣẹlẹ̀ ní ìgbà àkọ́kọ́ tí a bá ná owó láti inú rẹ̀, àti pé fèrèsé kúkúrú kan tún wà nígbà tí ìṣòwò kan kò tíì jẹ́rìí sí nínú mempool. ZIP 2005 kò yí èyíkéyìí nínú ìyẹn padà.

<br/>

## Ohun ti Ironwood yipada

Ironwood ni àtúnṣe nẹ́tíwọ́ọ̀kì NU6.3. Ó ṣiṣẹ́ lórí Mainnet ní block 3,428,143 ní ọjọ́ kejìdínlọ́gbọ̀n oṣù keje ọdún 2026. Ète pàtàkì rẹ̀ ni ìdúróṣinṣin ìpèsè lẹ́yìn ìṣòro ìlera Orchard (wo [Ironwood](/zcash-tech/ironwood) ojú ìwé), àti agbára ìtúnpadà kuatomu láti ZIP 2005 tí a fi ránṣẹ́ gẹ́gẹ́ bí apá kan rẹ̀.

- **Ìrísí àkọsílẹ̀ tuntun kan.** Gbogbo àkọsílẹ̀ ìjáde Ironwood lo ìrísí tí a lè gbà padà (ṣàkíyèsí byte ìtọ́kasí lásán `0x03`). Àìròtẹ́lẹ̀ tí àkọsílẹ̀ náà ní ni a ti mú wá láti inú gbogbo àwọn pápá rẹ̀ báyìí, nítorí náà, a so àkọsílẹ̀ náà mọ́ àwọn ohun tó wà nínú rẹ̀ pẹ̀lú hash dípò mathimatiki elliptic-curve nìkan.
- **Ọ̀nà ìgbàpadà fún àwọn àkọsílẹ̀ Ironwood nìkan.** ZIP 326 hàn gbangba pé gbogbo àkọsílẹ̀ Ironwood ni a lè gbà padà àti pé kò sí àkọsílẹ̀ Orchard kankan. Ètò àpò owó kò yí ìyẹn padà.
- **Orchard dẹ́kun gbígbà iye tuntun.** Àwọn èrè Coinbase kò le lọ sí Orchard, Orchard kò sì le fi ránṣẹ́ sí àdírẹ́sì Orchard mìíràn mọ́, nítorí náà iye tuntun tí a dáàbò bò yóò dé sí Ironwood.
- **A sọ fún àwọn àpò owó láti gbé gbogbo nǹkan.** ZIP 2005 sọ pé àwọn àpò owó gbọ́dọ̀ gbé gbogbo owó tí wọ́n ń ṣàkóso, títí kan owó Sprout àti Sapling, sínú ìwé owó Ironwood ní kété tí ó bá ti ṣeé ṣe, kí wọ́n sì máa ṣe bẹ́ẹ̀ bí owó tuntun bá dé.

Ohun tí Ironwood kò yí padà: ìkọ̀kọ̀ tí a lò fún ìnáwó àti ìfìdí múlẹ̀ lónìí, àkíyèsí ìkọ̀kọ̀, àti ohunkóhun nípa ZEC.

<br/>

## Àwọn ààlà tó kù

**Fèrèsé ìfarahàn kan wà.** Láti ìgbà Ironwood's ti ń ṣiṣẹ́ títí di ìgbà tí a bá pa àwọn ìlànà àtijọ́, apànìyàn quantum ṣì lè jí, gbé owó sókè tàbí dí owó ní gbogbo adágún tí a dáàbò bò. ZIP 2005 pe èyí ní "àkókò ìfarahàn pàtàkì" ó sì kìlọ̀ pé ìkọlù nígbà tí ó bá ṣẹlẹ̀ lè ba agbára ẹni tí ó ni ín jẹ́ láti padà bọ̀ sípò nígbà tí ó bá yá. Ìdí nìyí tí ó fi sọ pé Zcash gbọ́dọ̀ pa Orchard, Sapling àti Sprout **kí ó tó di pé àwọn ìkọlù quantum di ohun tí ó ṣeé ṣe.

**Ìyípadà kò ní ọjọ́.** Kò sí ìtòlẹ́sẹẹsẹ ZIP láti pa Orchard tàbí Sapling. ZIP 2003, Draft àti olùdíje NU7, yóò dá ìnáwó Sprout dúró nípa lílo àwọn ìṣòwò ẹ̀yà 4. Ìjíròrò yíyọ owó Sapling nìkan bẹ̀rẹ̀ ní orí ìtàkùn náà ní oṣù kẹrin ọdún 2026.

**Ìlànà Ìgbàpadà kò parí.** ZIP 2005 kàn ṣàlàyé rẹ̀ nìkan, ó sì sọ pé àwọn kúlẹ̀kúlẹ̀ náà “lè yípadà”. Kò sí ohunkóhun nípa rẹ̀.

**Gbé ìkórè nísinsìnyí, ṣe àtúnṣe nígbà tó bá yá.** Ṣàkíyèsí pé gbogbo àwọn ìkọ̀wé ìpamọ́ fún Ironwood, Orchard, Sapling àti Sprout wà lórí ẹ̀wọ̀n náà. Ẹnìkan lè fi wọ́n pamọ́ lónìí kí ó sì ṣe àtúnṣe nígbà tó bá yá, tí wọ́n bá tún mọ àdírẹ́sì tí wọ́n gbà. Gbogbo àdírẹ́sì tí o bá tẹ̀ jáde tàbí tí o fi ránṣẹ́ jẹ́ ara ewu yẹn. ZIP 2005 sọ pé "àwọn àyípadà ìlànà mìíràn wà lábẹ́ àgbéyẹ̀wò" fún àwọn ìgbeyàwó ọjọ́ iwájú.

**A ko bo owo ti o han gbangba.** Awọn adirẹsi ti a ti lo lati, tabi ti a tun lo, ti awọn bọtini gbangba ti han gbangba. Agbara lati gba awọn adirẹsi ti o han gbangba pada jẹ imọran kan titi di isisiyi (ZIP 2007, wo isalẹ).

**FROST ní ìkìlọ̀ afikún.** Pẹ̀lú FROST, olúkúlùkù olùkópa ní kọ́kọ́rọ́ ìnáwó dúdú (`qsk`), àti agbébọn quantum tó ń gbá a mú lè jí. ZIP 2005 dámọ̀ràn gbígbé owó FROST sí ìlànà post-quantum pátápátá pẹ̀lú àtìlẹ́yìn ààlà nígbà tí ó bá wà.

<br/>

## Àwọn ìdámọ̀ràn àti ìwádìí

Kò sí ọ̀kan lára àwọn wọ̀nyí tí ó wà láàyè.

- **Ìlànà Ìgbàpadà.** Ọ̀nà tí yóò jẹ́ kí a ná owó Ironwood lẹ́yìn ìyípadà náà. A ṣe àkọsílẹ̀ rẹ̀ nínú ZIP 2005, a kò sọ ọ́ ní pàtó.
- **ZIP 2007, a lè gbà á padà fún àwọn àdírẹ́sì tó ṣe kedere.** Nọ́mbà ZIP tí a fipamọ́ nìkan pẹ̀lú ìjíròrò nínú [àwọn ìfìwéránṣẹ́ #1302](https://github.com/zcash/zips/issues/1302)Èrò náà ni pé àwọn ìjáde P2PKH àti P2SH tí a kò tíì fi àwọn kọ́kọ́rọ́ gbogbogbò hàn rí lè ṣeé gbà padà, pẹ̀lú àwọn ìdánilójú tí kò lágbára ju Ironwood.
- **Ìpamọ́ lẹ́yìn-ìwọ̀n fún àwọn àdírẹ́sì tí a mọ̀.** Ṣí sílẹ̀ láti ọdún 2022 ní [àwọn ìfìwéránṣẹ́ #1133](https://github.com/zcash/zips/issues/1133), èyí tí ó sọ pé Zcash ti “ṣe àṣírí lẹ́yìn ìsanwó” nígbà tí a bá pa àwọn àdírẹ́sì mọ́ ní ìkọ̀kọ̀, tí ó sì béèrè bí a ṣe lè fa èyí sí àwọn àdírẹ́sì tí a mọ̀, fún àpẹẹrẹ pẹ̀lú ètò ìdènà bọtini post-quantum bíi Kyber (tí ó jẹ́ ML-KEM báyìí). Ní oṣù kẹfà ọdún 2026 [àwọn ìfìwéránṣẹ́ #1307](https://github.com/zcash/zips/issues/1307) dábàá ZIP kan láti ṣàkọsílẹ̀ àwọn ohun ìní ìpamọ́ lọ́wọ́lọ́wọ́ àti àwọn àtúnṣe tó ṣeé ṣe.
- **Iṣẹ́ Tachyon.** Ìgbéga ìwọ̀n tí a dámọ̀ràn. Ojú òpó wẹ́ẹ̀bù rẹ̀ sọ pé yóò gba "ìpamọ́ post-quantum kíkún" gẹ́gẹ́ bí àbájáde ẹ̀gbẹ́, nípa gbígbé ìsanwó kúrò ní ẹ̀wọ̀n àti lílo post-quantum key pàṣípààrọ̀. A ṣe àpèjúwe ìkàwé dátà tí ó ń gbé ẹ̀rí rẹ̀, Ragu, gẹ́gẹ́ bí "ó ṣì wà lábẹ́ ìkọ́lé". Wo [Iṣẹ́ Tachyon](/zcash-tech/project-tachyon).
- **A fully post-quantum Zcash.** Post-quantum proofs, signatures and commitments together. Tracked in [àwọn ìfìwéránṣẹ́ #1134](https://github.com/zcash/zips/issues/1134), ti a ti ṣii lati ọdun 2016. Ko si alaye tabi akoko kan pato.

<br/>

## Tábìlì ipò

Àyẹ̀wò ìkẹyìn ni ọjọ́ kẹtàlá oṣù kẹsàn-án ọdún 2026. Ipò àkọlé ZIP's àti ipò nẹ́tíwọ́ọ̀kì rẹ̀ yàtọ̀ síra: ZIP 2005 ṣì sọ pé "A ti gbé kalẹ̀" nínú àkọlé rẹ̀ bó tilẹ̀ jẹ́ pé a ti ń lo àwọn òfin rẹ̀ lórí Mainnet láti oṣù keje ọdún 2026.

| Ohun kan | ZIP status | Ipò nẹ́tíwọ́ọ̀kì | Déètì | Orísun |
|---|---|---|---|---|
| Adágún Ironwood pẹ̀lú àwọn àkọsílẹ̀ tí a lè gbà padà (NU6.3) | Àgbékalẹ̀ ZIP 2005, ZIP 229 àti ZIP 258 | **Ṣiṣẹ́** lórí Mainnet | Ọjọ́ Kejìdínlọ́gbọ̀n oṣù Keje ọdún 2026, ìdìpọ̀ 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard ti pari si iye tuntun | ZIP 2006 Ti wa ni ipamọ, awọn ofin ni ZIP 258 | **Ṣiṣẹ́** lórí Mainnet | Ọjọ́ Kejìdínlọ́gbọ̀n oṣù Keje ọdún 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Àwọn àpò owó tí ń gbé owó lọ sí Ironwood | Ìtọ́sọ́nà nínú ZIP 2005, ZIP 318 àti ZIP 326 (Àkọsílẹ̀) | Ṣeduro, da lori apamọwọ rẹ | Láti ọjọ́ kejìdínlọ́gbọ̀n oṣù Keje ọdún 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Ìlànà Ìgbàpadà | A ṣe àkọsílẹ̀ rẹ̀ nínú ZIP 2005 nìkan | **A ko ṣe imuse** | Ko si ọjọ | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Pa Orchard ati Sapling | Ko si ZIP | **A ko ti ṣeto eto naa** | Ìjíròrò nípa Sapling láti oṣù kẹrin ọdún 2026 | [Àpérò](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Dídínà ìnáwó Sprout (ZIP 2003) | Olùdíje fún ìwé-àṣẹ, olùdíje NU7 | **A ko mu ṣiṣẹ** | Ko si ọjọ | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Àtúnṣe tó ṣe kedere (ZIP 2007) | Ti wa ni ipamọ | **Ìdámọ̀ràn** | Àkójọ ìfìwéránṣẹ́ ZIP ti pamọ́ ní ọjọ́ karùn-ún oṣù Keje ọdún 2025, ìjíròrò náà sì bẹ̀rẹ̀ ní ọjọ́ kẹtàdínlógún oṣù kẹfà ọdún 2026 | [àwọn ìfìwéránṣẹ́ #1302](https://github.com/zcash/zips/issues/1302) |
| Ìpamọ́ lẹ́yìn-ìwọ̀n fún àwọn àdírẹ́sì tí a mọ̀ | Àwọn ìṣòro ṣíṣí sílẹ̀, kò sí ZIP | **Ìwádìí** | #1133 ṣí ní ọjọ́ kejìdínlógún oṣù kẹjọ ọdún 2022, #1307 ṣí ní ọjọ́ kẹtàlélógún oṣù kẹfà ọdún 2026 | [àwọn ìfìwéránṣẹ́ #1133](https://github.com/zcash/zips/issues/1133), [àwọn ìfìwéránṣẹ́ #1307](https://github.com/zcash/zips/issues/1307) |
| Iṣẹ́ Tachyon | Ko si ZIP | **Ìdámọ̀ràn**, lábẹ́ ìdàgbàsókè | Àkọ́kọ́ tí a tẹ̀ jáde ní oṣù kẹrin ọdún 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Ilana lẹhin-kuatomu ni kikun | Ìṣòro ṣíṣí, kò sí ZIP | **Iṣẹ́ ọjọ́ iwájú** | #1134 ṣí ní ọjọ́ kejìdínlọ́gbọ̀n oṣù kẹta ọdún 2016 | [àwọn ìfìwéránṣẹ́ #1134](https://github.com/zcash/zips/issues/1134) |

Nínú ìwádìí ìròhìn ìròhìn ìròhìn NU7 Zcash Foundation's (February 2026), ìròhìn ìròhìn ìròhìn ìròhìn ní 90.5% láti ọ̀dọ̀ ZCAP àti 94.6% láti ọ̀dọ̀ àwọn oní-ìròhìn, Tachyon sì ní ìtìlẹ́yìn tó fẹ́rẹ̀ẹ́ jẹ́ ti gbogbo àgbáyé. Àwọn ìwádìí ìròhìn NU7.

<br/>

## Ohun ti o le se ni bayi

- **Gbé owó rẹ lọ sí Ironwood.** A kò ní lè gba owó Sapling àti Orchard padà láé. Ìwọ̀n ìṣípò láàárín àwọn adágún fi iye tí ó wà lórí ẹ̀wọ̀n hàn, nítorí náà ZIP 318 ní àwọn àpò owó tí a pín sí iye tí a ti pinnu tẹ́lẹ̀, tí a sì fi ránṣẹ́ sí wọn nígbà tí àkókò bá ń lọ. Jẹ́ kí àpò owó rẹ ṣe é dípò kí o máa gbé gbogbo nǹkan lọ ní ọ̀nà kan.
- **Má ṣe tẹ àwọn àdírẹ́sì ààbò tí o kò nílò láti tẹ̀ jáde.** Ìpamọ́ lòdì sí olùkọlù quantum lọ́jọ́ iwájú sinmi lórí wọn tí wọn kò mọ àdírẹ́sì rẹ. Àwọn àdírẹ́sì àpapọ̀ kò rọrùn láti ṣe, nítorí náà fún olúkúlùkù olùsanwó ní èyí tuntun. ZIP 229 dámọ̀ràn yíyí àdírẹ́sì padà fún ìdí yìí.
- **Má ṣe tún lo àdírẹ́sì tó ṣe kedere.** Nígbà tí o bá ná owó láti inú ọ̀kan, kọ́kọ́rọ́ gbogbogbòò rẹ̀ wà lórí ẹ̀wọ̀n náà títí láé.
- **Pa gbólóhùn èso rẹ mọ́ ní ààbò.** Nínú Ìlànà Ìgbàpadà gẹ́gẹ́ bí a ti ṣàlàyé rẹ̀, owó ìgbàpadà gbọ́dọ̀ fihàn pé o mọ kọ́kọ́rọ́ ìnáwó rẹ, àti pé àwọn àpò owó déédéé ń gba kọ́kọ́rọ́ náà láti inú èso náà.
- **Fojú fo àwọn ẹ̀tọ́ "Zcash kò ní àléébù" rárá.** Kò tíì rí bẹ́ẹ̀, àwọn ènìyàn tó ń kọ àwọn ẹ̀kúnrẹ́rẹ́ náà sì sọ bẹ́ẹ̀.

<br/>

## Àwọn àìlóye tó wọ́pọ̀

- **"Ironwood jẹ́ lẹ́yìn-quantum."** Rárá. Ó ń lo ìkọ̀sílẹ̀ Orchard kan náà, àti ZIP 2005 sọ pé ẹ̀yà ara náà "kò mú kí ìlànà Orchard ní ààbò lòdì sí àwọn ìkọlù quantum".
- **"Ohun tí a lè gbà padà sí Quantum túmọ̀ sí ààbò láti ọwọ́ àwọn kọ̀ǹpútà quantum lónìí."** Rárá. Ó túmọ̀ sí pé a lè gba owó Ironwood padà lẹ́yìn ìyípadà ọjọ́ iwájú, níwọ̀n ìgbà tí ìyípadà náà bá ṣẹlẹ̀ ní àkókò.
- **" Zcash tí a fi ààbò bo ti jẹ́ àṣírí lẹ́yìn ìsanwó."** Nígbà tí olùkọlù náà kò bá mọ àdírẹ́sì rẹ nìkan ni a máa ń fi àwọn àdírẹ́sì tí a mọ̀ hàn ní gbogbo adágún.
- **"Tachyon ti fi ìpamọ́ post-quantum kún un tẹ́lẹ̀."** Tachyon jẹ́ àbá kan. Kò sí ohunkóhun láti inú rẹ̀ tí ó wà lárọ̀ọ́wọ́tó.
- **"Àwọn kọ̀ǹpútà Quantum máa ń fọ́ gbogbo apá Zcash."** Àwọn iṣẹ́ Hash ni a kò sọ di aláìlera, kì í ṣe pé a ti bàjẹ́, nítorí àwọn ìkọlù quantum tí a mọ̀. Ìmúpadà Quantum sinmi lórí ìyàtọ̀ yẹn gan-an.

<br/>

## Àwọn ojú ìwé tó jọra

- [Ààbò Lẹ́yìn-Ìwọ̀n-Owó ní Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Ìyípadà náà](/zcash-tech/the-turnstile)
- [Iṣẹ́ Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Àwọn Adágún Tí A Dáàbò Bo](/using-zcash/shielded-pools)

<br/>

## Àwọn Orísun

- [ZIP 2005: Ìmúpadàbọ̀sípò Ironwood Quantum](https://zips.z.cash/zip-2005)
- [ZIP 229: Ẹ̀yà 6 Ìlànà Ìṣòwò](https://zips.z.cash/zip-0229)
- [ZIP 258: Ìgbékalẹ̀ Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Ìṣípòpadà Orchard sí Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Àbájáde NU6.3 fún àwọn àpò owó](https://zips.z.cash/zip-0326)
- [ZIP 2003: Má ṣe jẹ́ kí àwọn ìṣòwò ẹ̀yà 4 jẹ́ ààyè fún ọ](https://zips.z.cash/zip-2003)
- [ZIP 209: Dènà Ìwọ̀n Ìwọ̀n Póólù Ìwọ̀n Póólù Ààbò Odi](https://zips.z.cash/zip-0209)
- [awọn ifipamo #1302: Imupadabọ kuatomu ti apakan ti ilana ti o han gbangba](https://github.com/zcash/zips/issues/1302)
- [Àwọn ìfìwéránṣẹ́ #1133: Ìpamọ́ lẹ́yìn-ìwọ̀n fún Zcash](https://github.com/zcash/zips/issues/1133)
- [awọn ifipamo #1307: Ìpamọ́ Zcash lòdì sí àwọn ọ̀tá quantum àti discrete-log-breaking](https://github.com/zcash/zips/issues/1307)
- [awọn ifibọ #1134: Ni kikun lẹhin-quantum Zcash](https://github.com/zcash/zips/issues/1134)
- [Ilana Tachyon ti Iṣẹ akanṣe](https://tachyon.z.cash/roadmap/)
- [Àwọn èsì ìdìbò NU7: Ohun tí a gbọ́ àti ibi tí a ti ń lọ láti ibi](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Àkọsílẹ̀ 3,428,143 lórí Blockchair](https://blockchair.com/zcash/block/3428143)
- [Ìbéèrè fún ìgbìmọ̀: Ṣé Zcash jẹ́ lẹ́yìn-ìwọ̀n?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
