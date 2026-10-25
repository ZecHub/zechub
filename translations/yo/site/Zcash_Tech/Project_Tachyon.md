<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Iṣẹ́ Tachyon

## TL;DR

- Tachyon jẹ́ àtúnṣe tí a dámọ̀ràn nípa bí àwọn àpò Zcash ṣe ń rí àti ná owó tí a fi ààbò pamọ́, èyí tí a ṣe láti jẹ́ kí nẹ́tíwọ́ọ̀kì náà dàgbà sí iye àwọn olùlò tó pọ̀ gan-an
- Lónìí, àpò owó gbọ́dọ̀ gbìyànjú láti mọ iye owó tó pọ̀ nínú blockchain láti mọ èyí tí ó jẹ́ tirẹ̀, ìdí nìyẹn tí ìṣiṣẹ́pọ̀ ààbò fi ń lọ́ra díẹ̀
- Tachyon rọ́pò èyí pẹ̀lú **ìṣọ̀kan àìmọ̀**, nítorí náà àpò owó máa ń mú ohun tí ó nílò wá láìṣàyẹ̀wò ohun gbogbo àti láìsọ fún olupin kan àwọn ìpín tí ó fẹ́
- Ó tún gbé àwọn àlàyé ìsanwó kúrò nínú blockchain náà sí ìbéèrè ìsanwó fúnra rẹ̀, èyí tí ó mú kí ìlànà náà rọrùn ṣùgbọ́n ó yí ẹrù iṣẹ́ padà sí àwọn àpò owó
- Ó jẹ́ ìdámọ̀ràn, tí a kọ́kọ́ tẹ̀ jáde ní oṣù kẹrin ọdún 2025. Kò jẹ́ ara NU7 **àti pé kò jẹ́ kí a fi ránṣẹ́**, ó sì nílò ìsapá ìmọ̀ ẹ̀rọ lórí ìwọ̀n ìgbéga Sapling

<br/>

## Ta ni èyí fún

- Ẹnikẹ́ni tí ó ti wo ìṣọ̀kan àpò owó tí a dáàbò bo tí ó sì ń ṣe kàyéfì ìdí tí ó fi gba àkókò tó bẹ́ẹ̀
- Àwọn tuntun tí wọ́n ń rí Tachyon nígbà gbogbo tí a mẹ́nu kàn lẹ́yìn NU7 àti Zcash scaling
- Àwọn òǹkàwé tí wọ́n fẹ́ èrò náà ní àkọ́kọ́ àti ìkọ̀kọ̀ ọ̀rọ̀ kejì

<br/>

## Iṣoro ti Tachyon yanju

Zcash fi ẹni tí ìsanwó jẹ́ fún pamọ́. Ìyẹn ni gbogbo kókó náà, ó sì ń fa ìṣòro tí kò ṣeé ṣe: tí ẹnikẹ́ni kò bá lè mọ ẹni tí ìsanwó jẹ́, báwo ni àpò owó rẹ ṣe rí tìrẹ?

Nínú Bitcoin, èyí rọrùn. Àdírẹ́sì gbogbo ènìyàn ló wà níbẹ̀, nítorí náà, àpò owó lè béèrè lọ́wọ́ olupin kan pé “kí ni wọ́n fi ránṣẹ́ sí àdírẹ́sì yìí?” kí ó sì rí ìdáhùn gbà. Àpò owó Zcash kò lè béèrè ìbéèrè yẹn, nítorí pé bíbéèrè rẹ̀ yóò fi ohun tí a ṣe láti fi pamọ́ hàn.

Nítorí náà, Zcash ṣe ohun tó yàtọ̀. Olùránṣẹ́ náà fi àwọn kúlẹ̀kúlẹ̀ ìsanwó pamọ́, ó sì fi wọ́n sínú ìṣòwò náà fúnra rẹ̀. Àpò owó rẹ yóò wá ṣiṣẹ́ nípasẹ̀ àwọn ìṣòwò lórí ẹ̀wọ̀n náà, yóò sì gbìyànjú láti yọ gbogbo wọn kúrò. Ó fẹ́rẹ̀ẹ́ jẹ́ pé gbogbo ìgbìyànjú ló kùnà. Àwọn díẹ̀ tó yọrí sí rere ni ìsanwó rẹ. Èyí ni a ń pè ní **ìṣàfihàn ìdánwò**, ó sì jẹ́ àdáni, ó tọ́, ó sì lọ́ra.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Ohun tí iṣẹ́ náà dá lé lórí ni àṣeyọrí tí àpò owó rẹ ń ná ni a fi ń mọ bí ẹ̀wọ̀n náà ṣe tóbi tó, kì í ṣe iye owó tí o gbà ní gidi. Ẹni tí kò tíì gba owó kan ṣoṣo rí ń ṣiṣẹ́ bíi ti ẹni tí ó ń gbà wọ́n lójoojúmọ́. Bí Zcash ṣe ń pọ̀ sí i, ìyẹn ń burú sí i fún gbogbo ènìyàn. Gẹ́gẹ́ bí a ti sọ nínú àbá náà, “kò ní gbòòrò rárá.”

<br/>

## Ohun ti Tachyon yipada

Tachyon kolu iṣoro naa ni gbongbo rẹ: o da lilo blockchain duro gẹgẹbi ikanni ifijiṣẹ fun awọn aṣiri isanwo.

Dípò bẹ́ẹ̀, àwọn kúlẹ̀kúlẹ̀ tí o nílò máa ń lọ pẹ̀lú ìbéèrè ìsanwó fúnra rẹ̀, láti inú ẹ̀rọ ìbánisọ̀rọ̀. Ìbéèrè ìsanwó, URI, tàbí kódì QR kan máa ń gbé ìwífún tí a ti fi sínú ìṣòwò náà tẹ́lẹ̀. Sean Bowe ṣàpèjúwe èyí gẹ́gẹ́ bí gbígbà **ìsanwó tí kò sí nínú ẹ̀rọ ìbánisọ̀rọ̀** fún ìgbà àkọ́kọ́ nínú ìlànà Zcash tí a dáàbò bò.

Nígbà tí ẹ̀wọ̀n náà kò bá gbé ìwífún náà mọ́, àpò rẹ kò ní ní ìdí láti wá a mọ́, ìṣòro ìtúpalẹ̀ ìdánwò náà yóò sì pòórá.

Àpò owó rẹ ṣì nílò láti mọ ipò ẹ̀wọ̀n ìsinsìnyí kí o tó lè náwó. Ìdajì kejì àwòrán náà nìyẹn, **ìbáṣepọ̀ àìmọ̀**: ọ̀nà kan fún àpò owó láti mú àwọn nǹkan pàtó tí ó nílò wá láìfi àwọn nǹkan tí ó béèrè fún hàn fún olùpèsè.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Kí ni yóò túmọ̀ sí fún ẹnìkan tí ó ń lo àpò owó

- **Ìṣiṣẹ́pọ̀ kò ní máa dàgbà pẹ̀lú ẹ̀wọ̀n náà.** Àkókò tí àpò rẹ bá ń lò láti mú nǹkan ṣẹ yóò máa tọ́pasẹ̀ ìgbòkègbodò rẹ dípò ìwọ̀n Zcash.
- **Isanwo di ohun ti o dabi fifun ẹnikan ni iwe-owo.** Ibeere isanwo naa ni ohun ti olugba nilo, nitorinaa paṣipaarọ laarin oluranṣẹ ati olugba ṣe pataki ju ti o ṣe pataki lọ loni.
- **Àwọn àpò owó ní ẹrù iṣẹ́ púpọ̀ sí i.** Nítorí pé ẹ̀wọ̀n náà kò ní àdàkọ ìsanwó rẹ mọ́, pípadánù dátà àpò owó rẹ ṣe pàtàkì jù. Àfikún àti ìgbàpadà kúrò láti jíjẹ́ ẹ̀yà ìlànà sí ohun tí software àpò owó gbọ́dọ̀ tọ́.
- **Àwọn ohun kan tí a mọ̀ dáadáa máa ń ṣí tàbí kí wọ́n pòórá.** Tachyon máa ń mú kí ìyípadà pàtàkì, àwọn kọ́kọ́rọ́ ìwòye, àti àdírẹ́sì ìsanwó kúrò nínú ìlànà pàtàkì, ó sì máa ń fi wọ́n sílẹ̀ sí àpò owó. Èyí jẹ́ ọ̀kan lára àwọn apá pàtàkì nínú ìdámọ̀ràn náà, a sì ń ṣiṣẹ́ lórí rẹ̀ síbẹ̀.

<br/>

## Wiwa ti o jinlẹ fun awọn onkawe imọ-ẹrọ

A ṣe àpèjúwe Tachyon gẹ́gẹ́ bí àyípadà tí ó bá ìlànà Orchard mu. A lè lò ó gẹ́gẹ́ bí àtúnṣe sí adágún Orchard tí ó wà tẹ́lẹ̀ tàbí gẹ́gẹ́ bí adágún tí a dáàbò bò tí a dé nípasẹ̀ [ìyípo](https://zechub.wiki/zcash-tech/the-turnstile), ilana kanna ti Zcash ti a lo fun Ironwood. Yiyan naa ni ipa lori imuṣiṣẹ, kii ṣe apẹrẹ naa.

Ó pa ọ̀pọ̀lọpọ̀ nǹkan mọ́ kúrò lọ́dọ̀ Orchard: àtúnṣe bọtini RedPallas, àwọn ìlérí iye homomorphic àti àwọn ìfọwọ́sowọ́pọ̀ ìdè, àti ètò bọtini tí a pín tí ó jẹ́ kí ẹ̀rọ kan fi hàn láìfi àṣẹ ìnáwó lé e lọ́wọ́.

Iṣẹ́ ìṣàyẹ̀wò náà sinmi lórí **ìwé ìwádìí-ẹ̀rí**, ọ̀nà kan tí ìwé ìwádìí náà ń rìn lọ pẹ̀lú ẹ̀rí ìwádìí tirẹ̀, débi pé pípapọ̀ mọ́ àwọn ìwé ìwádìí mìíràn ń mú kí ohun kan tí ó jogún àti fẹ̀ sí i jáde. Èyí ni ohun tí ó ń jẹ́ kí ọ̀pọ̀lọpọ̀ iṣẹ́ tí a ti fìdí rẹ̀ múlẹ̀ di ohun kékeré àti kíákíá láti ṣàyẹ̀wò. Halo, tí àwọn ẹgbẹ́ tí ó wà lẹ́yìn Zcash, ni ohun tí ó mú kí ìwádìí-ẹ̀rí ...

Okùn kẹta ni **àpapọ̀ ìṣòwò tí a dáàbò bo**, èyí tí ó yí bí a ṣe ń sọ àwọn àyípadà ipò ààbò padà, tí ó sì ní ipa lórí bí ìfọwọ́sowọ́pọ̀ ṣe ń ṣiṣẹ́.

<br/>

## Ibi ti iṣẹ naa duro

Tachyon jẹ́ **ìdámọ̀ràn, kìí ṣe iṣẹ́ tí a fi ránṣẹ́**. A tẹ̀ ẹ́ jáde ní oṣù kẹrin ọdún 2025, ìwé tí a tẹ̀lé e ní oṣù karùn-ún ọdún 2025 sì ṣiṣẹ́ lórí àwọn ìtumọ̀ ìfohùnṣọ̀kan náà. Wọ́n yàn án gẹ́gẹ́ bí olùdíje fún NU7, àtúnṣe tí ó tẹ̀lé lẹ́yìn Ironwood, ṣùgbọ́n NU7 tí a gbà ní ọjọ́ kẹtàdínlógún oṣù kẹsàn-án ọdún 2026 kò ní nínú rẹ̀: [ZIP 259](https://zips.z.cash/zip-0259) ṣe àkójọ ohun tí NU7 ń gbé jáde, àti [ìkéde àpérò](https://forum.zcashcommunity.com/t/nu7-timeline/57655) sọ pé kò sí ìṣètò ìṣòwò tuntun tó farahàn nínú rẹ̀. Kò sí ọjọ́ ìṣiṣẹ́ kankan tí a ti ṣètò fún Tachyon.

Ìlànà tí òǹkọ̀wé náà ṣe ni pé ètò tí a lè gbé kalẹ̀ nìyí dípò ìwádìí àròjinlẹ̀, ṣùgbọ́n èyí tí ó nílò ìsapá ìmọ̀ ẹ̀rọ tí ó jọ ti Sapling, pẹ̀lú àwọn ìbéèrè líle koko díẹ̀ tí a mọ̀ọ́mọ̀ fi sílẹ̀ fún ìgbà tí ó ń bọ̀.

Iṣẹ́ tó jọra ti hàn gbangba. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), node kikun ti a tu silẹ ni Oṣu Keje ọdun 2026, jẹ iṣẹ apapọ laarin Project Tachyon ati Valar Group ati ṣe awotẹlẹ diẹ ninu awọn iyipada ipele nẹtiwọọki wọnyi. [Gbigba alaye ikọkọ](https://zechub.wiki/zcash-tech/private-information-retrieval) ìwádìí náà ń fojúsùn sí ìpele ìwòran kan náà láti igun mìíràn.

<br/>

## Àwọn àṣìṣe tí ó wọ́pọ̀

- **Tachyon kò sí lórí ayélujára.** Kò sí àpò owó kankan tó ń lò ó lónìí, bẹ́ẹ̀ ni kò sí àtúnṣe tó ti mú un ṣiṣẹ́.
- **Tachyon kì í ṣe irú Ironwood.** Ironwood ni wọ́n gbé kalẹ̀ ní oṣù Keje ọdún 2026, wọ́n sì ṣe iṣẹ́ lórí adágún Orchard àti turnstile. Tachyon jẹ́ àbá tó yàtọ̀ síra nígbà tó yá nípa bí wọ́n ṣe ń wọ̀n nǹkan.
- **Tachyon kìí ṣe ìdínkù ìpamọ́.** Ète rẹ̀ ni láti má ṣe dá àwọn ìwé àkọsílẹ̀ mọ̀ yàtọ̀ nígbà tí a bá ń yọ iye owó tí a fi ń wọ̀n kù, kìí ṣe láti pààrọ̀ ìpamọ́ fún iyára.
- **zk-SNARK kò jẹ́ ìṣòro rárá.** Ìdámọ̀ràn náà ṣe kedere pé apá tó lọ́ra ni bí àwọn àpò owó ṣe ń ṣàwárí àti ṣe àkójọpọ̀ ipò wọn, kì í ṣe iye owó tí a fi ń ṣàyẹ̀wò àwọn ẹ̀rí.
- **Tachyon kò sí ní NU7.** Wọ́n ti yàn án tẹ́lẹ̀ gẹ́gẹ́ bí olùdíje, ṣùgbọ́n àdéhùn tí a gbà ní oṣù kẹsàn-án ọdún 2026 bo àwọn búlọ́ọ̀kù ìṣẹ́jú-àáyá 25, àtúnlo owó àti òpin àwọn ìṣòwò ẹ̀yà 4, láìsí ìrísí ìṣòwò tuntun ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Ìwé Àlàyé

| Àkókò ìgba | Ìtumọ̀ |
|---|---|
| Trial decryption | Gbìyànjú láti kọ àwọn ìṣòwò náà sílẹ̀ ní ọ̀kọ̀ọ̀kan láti wá àwọn tí a kọ sí ọ |
| In-band secret distribution | Fifi ikọkọ isanwo sinu iṣowo naa lori blockchain, bi Zcash ṣe loni |
| Out-of-band payment | Ṣíṣe àwọn àlàyé ìsanwó taara láàrín olùránṣẹ́ àti olùgbà dípò nípasẹ̀ ẹ̀wọ̀n náà |
| Oblivious synchronization | Gbigba data pq ti apamọwọ nilo laisi fifi alaye ti a beere fun han |
| Proof-carrying data (PCD) | Dátà tí ó ń rìn pẹ̀lú ẹ̀rí pé ó péye, kí a lè so àwọn ẹ̀rí pọ̀ kí a sì fún wọn ní ìfúnpọ̀ |
| Shielded transaction aggregate | Ọ̀nà Tachyon's gbà ń kó àwọn ìyípadà ìpínlẹ̀ tí a dáàbò bò jọ, ó ń yí bí wọ́n ṣe ń bá wọn sọ̀rọ̀ àti bí wọ́n ṣe ń fọwọ́ sí i padà |
| ledger indistinguishability | A kò le sọ ohun ìní tí ó dáàbò bo àwọn ìṣòwò yàtọ̀ sí ara wọn |

<br/>

## Awọn ibeere ti a maa n beere nigbagbogbo

**Ṣé èyí yóò mú kí àpò owó mi ṣọ̀kan kíákíá?** Ète náà nìyẹn. Àkókò ìṣọ̀kan yóò tẹ̀lé ìgbòkègbodò tìrẹ dípò ìwọ̀n ẹ̀wọ̀n náà. Kò sí ohun tí a ti fi ránṣẹ́, nítorí náà kò sí nọ́mbà tí a lè wọ̀n láti fa ọ̀rọ̀ yọ.

**Ṣé mo nílò láti ṣe ohunkóhun nísinsìnyí?** Rárá. Tachyon jẹ́ ìdámọ̀ràn. Tí a bá gbà á, yóò dé nípasẹ̀ àtúnṣe nẹ́tíwọ́ọ̀kì pẹ̀lú ìkìlọ̀ déédéé.

**Ṣé yíyọ àwọn kọ́kọ́rọ́ ìwòran túmọ̀ sí pípadánù agbára láti pín wíwọlé ìwé?** Ìdámọ̀ràn náà gbé agbára yẹn kúrò nínú ìlànà pàtàkì náà sí ìpele àpò owó. Bí èyí ṣe rí ní ìṣe jẹ́ ọ̀kan lára àwọn ìbéèrè tí ó ṣí sílẹ̀.

**Ṣé owó mi wà nínú ewu tí Tachyon bá gbé e lọ?** Ìgbékalẹ̀ náà yóò lo àtúnṣe Orchard tàbí turnstile, àwọn méjèèjì ni a ṣe láti mú kí iye owó náà lọ lábẹ́ àwọn òfin ìṣirò owó gbogbogbòò. Ojú ìwé Ironwood ṣàlàyé bí turnstile ṣe ń ṣiṣẹ́.

<br/>

## Àwọn ojú ìwé tó jọra

- [Ìgbàpadà Ìwífún Àdáni](https://zechub.wiki/zcash-tech/private-information-retrieval) - ọ̀nà mìíràn sí ìṣẹ́jú àyẹ̀wò àpò kan náà
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - ojú kan tí a kọ́ láti inú iṣẹ́ ìmọ̀ ẹ̀rọ Tachyon's
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - àtúnṣe tí ó ṣiṣẹ́ ní oṣù Keje ọdún 2026, tí a sábà máa ń dapọ̀ mọ́ Tachyon
- [Ìyípadà náà](https://zechub.wiki/zcash-tech/the-turnstile) - ilana ti Tachyon le lo ti a ba gbe kalẹ gẹgẹbi adagun tirẹ
- [Ààbò Lẹ́yìn-Owó-ìwọ̀n](https://zechub.wiki/zcash-tech/post-quantum-security) - nibiti Tachyon joko lẹgbẹẹ iṣẹ ilana igba pipẹ
- [Báwo ni a ṣe ṣètò Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - ta ló ń ṣe iṣẹ́ yìí àti bí ètò àyíká ṣe bá ara wọn mu

<br/>

## Àwọn ohun àlùmọ́nì

- [Tachyon: Ṣíṣe iwọn Zcash pẹ̀lú Ìmúṣiṣẹ́pọ̀ Oblivious](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Oṣù Kẹrin 2025, àbá àtilẹ̀wá
- [Tachyaction ni ijinna kan](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 May 2025, ìfohùnṣọ̀kan àti àwọn ìtumọ̀ ìlànà, tí a kọ fún àwọn olùgbékalẹ̀ ìlànà
- [Bulọọgi Sean Bowe's](https://seanbowe.com/blog/) - níbi tí wọ́n ti ń tẹ̀jáde jara Tachyon
- [tachyon.z.cash](https://tachyon.z.cash/) - aaye iṣẹ akanṣe
