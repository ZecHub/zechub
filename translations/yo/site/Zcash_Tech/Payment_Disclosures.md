<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ẹ̀rí ààbò ti ìsanwó àti àwọn ìṣípayá ìsanwó

## TL;DR

- Nọ́mbà ìdánimọ̀ ìṣòwò kan ń fi ìṣòwò hàn, ṣùgbọ́n kò fi olùgbà tí a dáàbò bò, iye owó, tàbí àkọsílẹ̀ hàn.
- A ṣe àgbékalẹ̀ ìṣípayá ìsanwó láti jẹ́ kí olùránṣẹ́ náà fi àwọn kúlẹ̀kúlẹ̀ tí a yàn nípa ìsanwó kan hàn láìsí fífi ìyókù ìtàn àpò owó wọn hàn.
- Kókó ìwoye kan fúnni ní àǹfààní láti lo àdírẹ́sì tàbí àkọọ́lẹ̀ láti kà á. Lò ó fún àyẹ̀wò tó ń tẹ̀síwájú, kìí ṣe fún àríyànjiyàn ìsanwó kan.
- Ìfihàn ìsanwó kò le fi hàn pé a ti fi ọjà náà dé, a kò le dá ẹnìkan mọ̀ fúnra rẹ̀, a kò le yí ìsanwó padà, tàbí a kò le fi àwọn àyẹ̀wò ìjẹ́rìí rọ́pò.
- [ZIP 311](https://zips.z.cash/zip-0311) Ó ṣì jẹ́ **Àkọsílẹ̀**. Ọ̀rọ̀ rẹ̀ lọ́wọ́lọ́wọ́ fi àtìlẹ́yìn Orchard, àtìlẹ́yìn ìtẹ̀síwájú, ìṣàfilọ́lẹ̀, àtúnṣe, àti àwọn òfin ìfọwọ́sowọ́pọ̀ olùlò sílẹ̀ láìpé.

## Idi ti ID iṣowo kan ko to

Ẹnikẹ́ni lè ṣàyẹ̀wò àwọn àlàyé gbogbogbò nípa ìsanwó Zcash tí ó ṣe kedere. Olùṣàwárí bulọọki kan lè fi àwọn àdírẹ́sì rẹ̀, iye rẹ̀, àti ipò ìjẹ́rìí rẹ̀ hàn.

Ìsanwó tí a fi ààbò pamọ́ ń ṣiṣẹ́ lọ́nà ọ̀tọ̀ọ̀tọ̀. Ẹ̀wọ̀n náà fihàn pé ìṣòwò náà tẹ̀lé àwọn òfin Zcash, ṣùgbọ́n kò tẹ olùránṣẹ́ tí a fi ààbò pamọ́, olùgbà, iye owó, tàbí àkọsílẹ̀ jáde. Pípín ìdánimọ̀ ìṣòwò náà lè fihàn pé ìṣòwò kan ti jáde, ṣùgbọ́n kò lè fihàn fún oníṣòwò tàbí ẹni-kẹta pé ìsanwó àdáni wà nínú rẹ̀.

Èyí máa ń dá ìṣòro tó wúlò sílẹ̀. Oníbàárà lè nílò láti yanjú àríyànjiyàn oníṣòwò, pàṣípààrọ̀ lè nílò láti fihàn pé ó ti ṣe àtúnṣe ìyọkúrò, tàbí olùfúnni lè fẹ́ láti fi ẹ̀rí hàn. Pípín kọ́kọ́rọ́ ìwòran gbogbo yóò fi ohun tó pọ̀ ju èyíkéyí nínú àwọn ọ̀ràn wọ̀nyí lọ.

[ZIP 311: Àwọn Ìṣípayá Ìsanwó Zcash](https://zips.z.cash/zip-0311) dábàá ìdáhùn tó gùn jù: ṣípayá àti jẹ́rìí sí àwọn ìwífún tí a yàn láti inú ìṣòwò kan.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Bawo ni ifihan isanwo ṣe n ṣiṣẹ

Ìṣàn ipilẹ ni:

1. Olùdánilójú náà fún olùránṣẹ́ ní ìpèníjà tàbí ìtọ́kasí àrà ọ̀tọ̀, nígbà tí ẹ̀rí ìbáṣepọ̀ bá yẹ.
2. Olùránṣẹ́ náà yan ìṣòwò náà àti àbájáde tàbí àbájáde tí a dáàbò bò láti fi hàn.
3. Sọ́fítíwètì àpò ìpamọ́ tó báramu ṣẹ̀dá ìṣípayá ìsanwó tó so mọ́ ìṣòwò náà àti, bóyá, ìpèníjà náà.
4. Olùránṣẹ́ náà yóò fi ìṣípayá náà fún olùdánilójú.
5. Olùdánilójú náà gba ìṣòwò gidi láti ọ̀dọ̀ Zcash node kan tí a gbẹ́kẹ̀lé, ó ṣàyẹ̀wò pé wọ́n ti wa ọn, ó sì fìdí ìṣípayá náà múlẹ̀ lòdì sí i.
6. Àbájáde tó wúlò kan jẹ́rìí sí àwọn ẹ̀sùn tó wà nínú ìṣípayá yẹn nìkan.

Apẹẹrẹ Sapling ti ZIP naa lo bọtini sifisi ti njade lati gba gbogbo abajade ti a yan pada. Eyi le ṣafihan olugba ti o jade, iye, ati akọsilẹ. O tun nilo ẹri ti agbara inawo fun o kere ju titẹsi iṣowo kan, nitorinaa eniyan ti o kan rii iṣowo naa ko le ṣẹda ifihan ti o wulo bi ẹni pe o fi ranṣẹ.

Ìfihàn ìsanwó Sapling kò gbọ́dọ̀ fi àdírẹ́sì olùránṣẹ́ hàn. Aláṣẹ ìnáwó lè ṣàkóso ọ̀pọ̀lọpọ̀ àdírẹ́sì onírúurú, nítorí náà, fífi hàn pé àkóso ìnáwó náà kò ní fi àdírẹ́sì kan hàn láìfọwọ́sí. ZIP 311 ní ẹ̀rí àdírẹ́sì àṣàyàn fún àwọn ọ̀ràn tí ó bá pọndandan láti so ẹ̀rí náà pọ̀ mọ́ àdírẹ́sì olùránṣẹ́ kan tí a mọ̀.

## Ìṣípayá ìsanwó tàbí kọ́kọ́rọ́ wíwo?

| Ọ̀nà | Lilo ti o dara julọ | Kini o ṣafihan | Iwọle ti nlọ lọwọ? | Ti a so mọ isanwo naa pẹlu cryptographic? |
| --- | --- | --- | --- | --- |
| ID Iṣowo | Ṣiṣayẹwo pe a ti wakọ iṣowo kan | Awọn data iṣowo gbogbogbo ati awọn ijẹrisi | Bẹẹkọ | Bẹẹni, ṣugbọn awọn alaye isanwo ti a daabobo wa ni pamọ |
| Àwòrán ìfàmọ́ra tàbí ìwé ẹ̀rí ìsanwó | Ìtọ́jú àkọsílẹ̀ àìṣedéédé | Ohunkóhun tí olùránṣẹ́ bá yàn láti fi hàn | Rárá | Rárá; a lè ṣàtúnṣe àwòrán náà |
| Ìfihàn ìsanwó | Ṣíṣe àfihàn àwọn kúlẹ̀kúlẹ̀ tí a yàn nípa ìsanwó kan | Àwọn àbájáde ìṣòwò tí a yàn àti èyíkéyìí olùránṣẹ́ tàbí ẹ̀rí ìpèníjà tí ó wà nínú rẹ̀ | Rárá, ṣùgbọ́n a lè da ẹ̀rí tí a pín kọ | Bẹ́ẹ̀ni |
| Incoming Viewing Key | Abojuto awọn sisanwo ti a gba nipasẹ akọọlẹ kan | Iṣẹ́ tí ń wọlé tí kọ́kọ́rọ́ náà bo | Bẹ́ẹ̀ni | Ó ń ṣe àtúnṣe àwọn ìsanwó tí ó báramu |
| Full Viewing Key | Iṣiro tabi iṣatunwo akọọlẹ kan | Iṣẹ́ tí ń wọlé àti èyí tí ń jáde, iye owó, àkọsílẹ̀, àti ìwọ̀n tí kọ́kọ́rọ́ náà bo | Bẹ́ẹ̀ni | Ó ń dín ìṣiṣẹ́ àkọọ́lẹ̀ tí ó báramu kù |

Lo ìṣípayá tó kéré jùlọ tó dáhùn ìbéèrè náà. Àríyànjiyàn oníṣòwò nípa ìsanwó kan kìí sábà jẹ́ kí ó ṣeé ṣe láti wọlé sí gbogbo ìsanwó nínú àkọọ́lẹ̀ kan. Akọ́ọ́lù tí ó gbọ́dọ̀ ṣe àtúnyẹ̀wò àkókò ìròyìn kíkún lè nílò kọ́kọ́rọ́ wíwo dípò.

Kò sí ọ̀kan lára àwọn ọ̀nà méjèèjì tó fúnni láyè láti náwó. Má ṣe pín gbólóhùn ìforúkọsílẹ̀, kọ́kọ́rọ́ ìnáwó, kọ́kọ́rọ́ àdáni, tàbí àpò ìpamọ́ gẹ́gẹ́ bí ẹ̀rí ìsanwó.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Kí ni mo lè lò lónìí?

A kò rí àpò owó lọ́wọ́lọ́wọ́ kankan níbí tí a ti dámọ̀ pé ó ń ṣe ìṣẹ̀dá tàbí ìfìdíkalẹ̀ ìsanwó ZIP 311. ZIP náà ṣì jẹ́ àkọsílẹ̀, ó sì kọ ìfìdíkalẹ̀ ìtọ́kasí rẹ̀ sí "TBD." Àwọn irinṣẹ́ tí a ń tọ́jú wọ̀nyí ṣì lè ran olùránṣẹ́, olùgbà, tàbí olùṣàyẹ̀wò tí a fún ní àṣẹ lọ́wọ́ láti ṣàyẹ̀wò àwọn àkọsílẹ̀ tí ó wà lónìí:

| Àpù | Wúlò lónìí fún | Ààlà pàtàkì |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Wiwo alaye metadata iṣowo, iye owo, awọn titẹ sii ati awọn abajade akojọpọ, ati awọn akọsilẹ; gbigbe awọn bọtini wiwo Unified tabi Sapling sinu awọn akọọlẹ wiwo nikan | Ko ṣe ipolowo ṣiṣẹda tabi ijẹrisi ifihan ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Ṣíṣe àtúnyẹ̀wò ìtàn ìṣòwò àti àwọn àkọsílẹ̀ tí a dáàbò bò; gbígbé Full Viewing Key Pípé kan wọlé ní ipò kíkà-nìkan | Àkọsílẹ̀ àpò owó tàbí àkọọ́lẹ̀ kíkà-nìkan kìí ṣe ìfihàn ìsanwó tí a yan ní pàtó |
| [Zallet](https://zcash.github.io/zallet/) | Awọn iṣiṣẹ iṣẹ oniṣẹ nipa lilo `z_viewtransaction`, `z_exportviewingkey`, àti `z_importviewingkey` | Sọ́fítíwètì Beta; àwọn RPC tí ó ń wo àti ìṣòwò rẹ̀ jẹ́ àkọsílẹ̀ gbígbòòrò tàbí ti agbègbè, kìí ṣe àwọn ẹ̀rí ZIP 311 |

Lo àpò owó tí ó fi ránṣẹ́ tàbí tí ó gba owó náà ní àkọ́kọ́. Ṣàyẹ̀wò àwọn kúlẹ̀kúlẹ̀ ìṣòwò rẹ̀, àkọsílẹ̀, ìdánimọ̀ ìṣòwò, àti àwọn ìjẹ́rìí, lẹ́yìn náà béèrè lọ́wọ́ ẹgbẹ́ kejì láti fi àwọn kúlẹ̀kúlẹ̀ wọ̀nyẹn wé àwọn àkọsílẹ̀ tirẹ̀. Má ṣe fi àpò owó tuntun sínú rẹ̀ kí o sì fi gbólóhùn ìrúwé kún un láti fi ẹ̀rí hàn nìkan. Tí olùṣàyẹ̀wò bá nílò ìrísí tí ń bá a lọ, ronú nípa àkọọ́lẹ̀ ìwòran nìkan tí ó báramu kí o sì lóye ìwọ̀n kọ́kọ́rọ́ ìwòran náà kí o tó pín in.

Àwọn àpù wọ̀nyí jẹ́ àwọn ọ̀nà míràn láti ṣàyẹ̀wò àkọsílẹ̀, kìí ṣe ẹ̀rí pé ìfihàn ìsanwó tí a ṣètò wà. Àwòrán ìṣàfihàn lè ran àwọn ènìyàn lọ́wọ́ láti fi àwọn àkọsílẹ̀ wéra, ṣùgbọ́n ó ṣeé ṣe àtúnṣe àti pé kìí ṣe ẹ̀rí ìkọ̀kọ̀.

## Nibiti awọn ifihan isanwo ba waye

### Awọn ariyanjiyan oniṣowo

Oníbàárà kan lè fẹ̀rí hàn pé wọ́n fi iye pàtó kan ránṣẹ́ sí àdírẹ́sì oníṣòwò náà tí wọ́n fi ààbò pamọ́ sí. Ẹ̀rí náà kò fi hàn pé wọ́n fi ọjà náà ránṣẹ́, pé wọ́n jẹ ẹ́ ní gbèsè, tàbí pé ẹni tí wọ́n gbé e kalẹ̀ ní orúkọ òfin kan pàtó. Àwọn ìbéèrè wọ̀nyẹn ṣì sinmi lórí àkọsílẹ̀ àṣẹ àti àdéhùn àwọn ẹgbẹ́ náà.

### Awọn yiyọkuro ti a daabobo

ZIP 311 ṣe àkójọ àwọn ìyọkúrò tí a dáàbò bo gẹ́gẹ́ bí ọ̀ràn lílo àfojúsùn kan: pàṣípààrọ̀ kan yóò fi hàn pé olùgbà àti iye owó náà kò ní tẹ àwọn kúlẹ̀kúlẹ̀ wọ̀nyẹn jáde lórí ẹ̀wọ̀n. Ẹ̀rí ìfọwọ́sí rẹ̀ tí ó ṣe kedere kò tí ì parí, nítorí náà èyí kò tí ì jẹ́ iṣẹ́ tí ó péye pátápátá. Oníbàárà náà gbọ́dọ̀ ṣàyẹ̀wò ipò ìjẹ́rìí ìṣòwò náà fúnra rẹ̀.

### Àwọn ẹ̀bùn

Olùfúnni tàbí ìpolówó lè fi ìdánilójú kan hàn nígbà tí ó bá ń fi àwọn ìsanwó tí kò ní ìbáṣepọ̀ sílẹ̀ ní ìkọ̀kọ̀. Títẹ̀ ìfihàn náà jáde máa ń jẹ́ kí àwọn àkọsílẹ̀ tí a yàn hàn ní gbangba fún gbogbo ẹni tí ó bá gba ẹ̀dà kan, nítorí náà ọ̀nà ìfìdíkalẹ̀ ìkọ̀kọ̀ máa ń dáàbò bò nígbà tí ẹ̀rí gbogbogbòò kò bá pọndandan.

### Iṣiro-owo

Lo ìṣípayá ìsanwó nígbà tí akọ̀wé bá nílò ẹ̀rí fún ìṣòwò kan. Lo kọ́kọ́rọ́ ìwòye tó kéré jùlọ nígbà tí akọ̀wé bá nílò wíwọlé sí ọ̀pọ̀lọpọ̀ ìṣòwò tàbí àkókò ìròyìn pípé.

## Iṣẹ́ ìpamọ́ tó ní ààbò

ZIP 311 kò tí ì jẹ́ ìlànà àpò owó tí a ti parí, tí a lè lò fún gbogbo ènìyàn. Nígbà tí àwọn irinṣẹ́ olùránṣẹ́ àti olùfìdíkalẹ̀ bá báramu bá wà, lo àkójọ àyẹ̀wò yìí:

1. **Jẹ́rìí ìbáramu ní àkọ́kọ́.** Àwọn irinṣẹ́ méjèèjì gbọ́dọ̀ ṣe àtìlẹ́yìn fún ìfihàn kan náà àti adágún ààbò tí ìsanwó náà ń lò.
2. **Yanjú àwọn ìṣòro tó wọ́pọ̀ ní àkọ́kọ́.** Ṣàyẹ̀wò ìṣọ̀kan àpò owó, ìdánimọ̀ ìṣòwò náà, iye ìjẹ́rìísí, ipò ìparí, àti àkọsílẹ̀ olùgbà náà kí o tó fi àwọn àlàyé ìkọ̀kọ̀ hàn.
3. **Béèrè fún ìpèníjà kan.** Fún àríyànjiyàn kan, olùdánilójú gbọ́dọ̀ pèsè nọ́mbà àṣẹ tuntun tàbí ìpèníjà àìròtẹ́lẹ̀ kí ìfihàn náà lè bá ìbéèrè náà mu.
4. **Yan àbájáde tí a nílò nìkan.** Má ṣe fi àwọn àbájáde tí kò ní ìbáṣepọ̀ pẹ̀lú ìṣòwò kan náà kún un.
5. **Ṣe àgbéyẹ̀wò gbogbo pápá tí a ṣí payá.** Ṣàyẹ̀wò olùgbà, iye owó, àkọsílẹ̀, ẹ̀rí àdírẹ́sì olùránṣẹ́, àti ìpèníjà kí o tó fi ránṣẹ́ síta.
6. **Pín nípasẹ̀ ọ̀nà ìkọ̀kọ̀ kan.** Ìṣípayá kì í ṣe kọ́kọ́rọ́ ìnáwó ìkọ̀kọ̀, ṣùgbọ́n ẹnikẹ́ni tí ó bá gbà á lè pa ìwífún tí ó ṣípayá mọ́ tàbí kí ó tún pín in.
7. **Jẹ́rìí sí ẹ̀wọ̀n náà.** Olùfìdí múlẹ̀ gbọ́dọ̀ gba ìṣòwò náà gan-an láti inú nọ́ńbà tí a gbẹ́kẹ̀lé, kí ó jẹ́rìí sí i pé ó wà nínú nẹ́tíwọ́ọ̀kì tí a fẹ́ kí ó sì dí i, lẹ́yìn náà kí ó jẹ́rìí sí ìṣípayá náà.
8. **Ṣe àkọsílẹ̀ àbájáde náà, kìí ṣe àṣírí afikún.** Pa ohun tí àríyànjiyàn, ìyọkúrò, ìtọrẹ, tàbí ìlànà ìṣirò owó nílò mọ́.

Tí àpò owó náà kò bá lè ṣe ìfihàn, má ṣe fi kọ́kọ́rọ́ ìwòran rọ́pò rẹ̀ láìlóye ìwọ̀n rẹ̀ tó gbòòrò tí ó sì wà títí láé. Béèrè bóyá ẹni tó gbà á lè jẹ́rìí sí ìsanwó náà láti inú àkọsílẹ̀ àpò owó tirẹ̀ tàbí kí ó gba àkọsílẹ̀ tí kò fi bẹ́ẹ̀ ṣe pàtàkì.

## Ohun tí ìṣípayá tó wúlò kò fi hàn

Ìdánilójú àṣeyọrí kò fi hàn pé:

- Pe iṣowo naa ni awọn ijẹrisi to fun eto imulo eewu ti oluyẹwo
- Pe atunṣe pq kan ko le yọ iṣowo tuntun kan kuro
- Pe awọn ọja tabi awọn iṣẹ ni a fi jiṣẹ
- Pe a nilo agbapada tabi gbigba owo pada
- Pé olùránṣẹ́ náà ń ṣàkóso àdírẹ́sì pàtó kan, àyàfi tí a bá fi ẹ̀rí àdírẹ́sì tó yẹ kún un
- Pé ẹni tí ó ń fi ìfihàn náà hàn ní ẹni tí ó sọ pé òun ni ẹni gidi
- Pe awọn iṣẹjade ti a ko sọ, awọn iṣowo miiran, tabi iwọntunwọnsi apo apamọwọ ni eyikeyi iye pataki kan
- Pé ìfihàn náà wà ní ìkọ̀kọ̀ lẹ́yìn tí a bá ti pín in

Olùdánilójú gbọ́dọ̀ ṣàyẹ̀wò ipò ìfipamọ́ ẹ̀wọ̀n àti ìjẹ́rìísí lọ́tọ̀ọ̀tọ̀. Ìlànà ìjẹ́rìísí ZIP 311 gbà pé ẹni tí ó pè é ti gba ìṣòwò tí a ti mú jáde àti gíga rẹ̀ nínú bulọ́ọ̀kì.

## Awọn idiwọn lọwọlọwọ

Wo ZIP 311 gẹ́gẹ́ bí ìlànà tí a dábàá, kìí ṣe gẹ́gẹ́ bí ìlérí pé àpò owó lọ́wọ́lọ́wọ́ ní bọ́tìnì **Ṣàfihàn ìsanwó** tí ń ṣiṣẹ́.

Àkọsílẹ̀ náà ń ṣàlàyé iye owó tí Sapling ná àti iye tí ó jáde lọ́wọ́lọ́wọ́, ṣùgbọ́n ó tún ní àwọn ohun tí a kò tíì parí fún Orchard, àwọn ohun tí a fi hàn gbangba, ìṣàfihàn, àtúnṣe, àti bí àwọn àpò owó ṣe yẹ kí ó fi àwọn ìpele ìwúlò tó yàtọ̀ hàn. A tún kọ ìtọ́kasí rẹ̀ sí "TBD." Gẹ́gẹ́ bí a ti kọ ọ́, kò ṣàlàyé iye owó tí a ó san fún Orchard tàbí Ironwood.

Olùránṣẹ́ náà lè má lè sọ ohun tó jáde tí a bá mọ̀ọ́mọ̀ ṣẹ̀dá ìṣòwò náà láìsí kọ́kọ́rọ́ ìwòran tó ń jáde fún ìjáde náà. ZIP 311 máa ń pa àṣàyàn ìpamọ́ yẹn mọ́ dípò kí ó ṣẹ̀dá ọ̀nà ìgbàpadà tuntun.

Àwọn ìwé àtijọ́ ṣàlàyé ìwádìí náà `z_getpaymentdisclosure` àti `z_validatepaymentdisclosure` àwọn àṣẹ nínú `zcashd`Àwọn àṣẹ wọ̀nyẹn ṣe àtìlẹ́yìn fún **Sprout JoinSplit outputs nìkan**, kìí ṣe àwòrán Sapling nínú ZIP 311, wọ́n sì ti dẹ́kun lílò rẹ̀. `zcashd` dé òpin ìdúró ìkẹyìn rẹ̀ ní oṣù Keje ọdún 2026. Má ṣe lo àgbéyẹ̀wò àtijọ́ yẹn gẹ́gẹ́ bí ìtọ́ni fún owó ìnáwó lọ́wọ́lọ́wọ́.

Àwọn àlàfo wọ̀nyí kò sọ èrò náà di ohun tí kò wúlò. Wọ́n ṣàlàyé ìdí tí ìtọ́sọ́nà tó fìṣọ́ra gbọ́dọ̀ ya àwòrán ìpamọ́ sọ́tọ̀ kí ó sì lo àwọn ọ̀ràn láti inú sọ́fítíwè tí ó ti ṣetán fún àwọn olùlò lásán.

## Awọn ibeere ti a maa n beere nigbagbogbo

### Ṣe mo le fi idi isanwo ti a daabobo han pẹlu ID iṣowo nikan?

Rárá. ID náà lè dá ìṣòwò náà mọ̀ àti ipò ìjẹ́rìí rẹ̀, ṣùgbọ́n ẹni tí a gbà ní ààbò, iye owó, àti àkọsílẹ̀ kò sí ní gbangba.

### Ṣé ìṣípayá ìsanwó kan náà ni kọ́kọ́rọ́ ìwòran?

Rárá. A lè ṣe àfihàn sí àwọn kúlẹ̀kúlẹ̀ tí a yàn nípa ìṣòwò kan. Kọ́kọ́rọ́ wíwo lè fi ìgbòkègbodò tí ó bá àdírẹ́sì tàbí àkọọ́lẹ̀ mu hàn ní àkókò kan.

### Ǹjẹ́ olùgbà lè ṣẹ̀dá ẹ̀rí olùránṣẹ́?

Kì í ṣe lábẹ́ àwòrán ZIP 311. Ìfihàn tó wúlò gbọ́dọ̀ fi hàn pé ó ní àṣẹ láti náwó fún o kere ju ìforúkọsílẹ̀ kan lọ. Olùgbà lè fi ẹ̀rí ìsanwó hàn nípa lílo àkọsílẹ̀ àpò owó tirẹ̀, ṣùgbọ́n ìyẹn yàtọ̀ sí èyí.

### Ṣe mo le fagilé ìṣípayá kan lẹ́yìn tí mo bá ti pín in?

Rárá. Kò fúnni ní àǹfààní láti wọlé sí àkọọ́lẹ̀ ọjọ́ iwájú bí kọ́kọ́rọ́ wíwo, ṣùgbọ́n a lè da àwọn ìwífún àti ẹ̀rí tí a ṣí payá. Pín in pẹ̀lú ìṣọ́ra gẹ́gẹ́ bí àkọsílẹ̀ ìnáwó àdáni èyíkéyìí.

### Ṣé ìjẹ́rìísí ń gbé tàbí ń ti ZEC kankan?

Rárá. Ṣíṣẹ̀dá tàbí fífún ìfihàn ní ìfìdí múlẹ̀ kò ná owó, dá owó padà, dí i, tàbí yí owó padà.

### Kí ni mo lè lò lónìí tí àpò mi kò bá ní àmì ìṣípayá kankan?

Bẹ̀rẹ̀ pẹ̀lú àkọsílẹ̀ àpò owó tí olùgbà náà gbà, ìdánimọ̀ ìṣòwò àti ipò ìjẹ́rìí, ìtọ́kasí ìwé-ẹ̀rí nínú àkọsílẹ̀ ìkọ̀kọ̀, tàbí ìwé ẹ̀rí mìíràn tí gbogbo ènìyàn gbà. Lo kọ́kọ́rọ́ ìwòran nìkan nígbà tí a bá nílò rẹ̀ ní gidi tí a sì lóye rẹ̀.

## Àwọn ohun àlùmọ́nì

- [ZIP 311: Àwọn Ìṣípayá Ìsanwó Zcash](https://zips.z.cash/zip-0311) - apẹrẹ iwe-aṣẹ, awọn ibeere, ilana ijẹrisi, ati awọn akiyesi ikọkọ
- [ZIP 310: Àwọn ohun ìní ààbò ti àwọn kọ́kọ́rọ́ wíwo Sapling](https://zips.z.cash/zip-0310) - kini awọn bọtini wiwo ṣe afihan ati awọn iṣeduro ti wọn pese
- [ZIP 304: Sapling Address Signatures](https://zips.z.cash/zip-0304) - ẹ̀rọ ìdánilójú àdírẹ́sì tí ZIP 311 tọ́ka sí
- [Ìlànà ìlànà Zcash](https://zips.z.cash/protocol/protocol.pdf) - Ìfipamọ́ àkọsílẹ̀ Sapling, àwọn bọtini ìwòran tí ń jáde, àti àṣẹ ìnáwó
- [Ìwé ìṣípayá ìsanwó zcashd tí a ti pamọ́](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - imuse itan-akọọlẹ nikan-Sprout, kii ṣe itọsọna lọwọlọwọ
- [Àwọn ẹ̀yà ara tí a ti kọ̀ sílẹ̀ fún zcashd](https://zcash.github.io/zcash/user/deprecation.html) - ipo ti awọn aṣẹ ifihan idanwo atijọ

## Àwọn ojú ìwé tó jọra

- [Awọn iṣowo](/using-zcash/transactions) - awọn isanwo ti a daabobo, awọn iṣeduro, ati laasigbotitusita iṣowo
- [Wiwo awọn bọtini](/zcash-tech/viewing-keys) - iwọle kika-nikan ti nlọ lọwọ ati awọn aṣayan okeere lọwọlọwọ
- [Ohun tí olùwádìí bulọọki lè rí](/zcash-tech/what-a-block-explorer-can-see) - awọn aaye iṣowo gbogbogbo ati ikọkọ
- [Ntọju awọn igbasilẹ pẹlu ZEC ti a daabobo](/zcash-use-cases/keeping-records-with-shielded-zec) - iṣiro laisi titẹjade itan apamọwọ
