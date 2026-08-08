<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Ìkáwọ́ Àlàfo fún ZEC tí a fi ààbò bo

> Fun awọn alaye kikọkọ kikun ti ilana FROST, wo [Oju-iwe imọ ẹrọ Frost](FROST.md).

Àjọ FROST ń bá a lọ láti máa wá nínú ìjíròrò Zcash  ó jẹ́ orin tó ga jùlọ ní ZecHub Hackathon 2026  ṣùgbọ́n èrò náà kò sí nígbà gbogbo tí wọ́n ṣàlàyé rẹ̀ lóòrèkóórè. Ojúewé yìí bo ohun ti o túmọ̀, ìgbà tí ìwọ nílò rẹ gan-an ni, àwọn àdéhùn àdàkàdekẹ àti irú irinṣẹ́ wo lo ṣe atilẹyin fún un lónìí.

---

## TL;DR

- **FROST** jẹ ki ẹgbẹ awọn oniwun bọtini jọ ṣakoso adirẹsi Zcash ti o ni aabo laisi ẹnikan nikan nini gbogbo bọtini ikọkọ.
- A **t-ti n** ìlà tumo si: t eniyan gbọdọ co-forukọsilẹ lati na; eyikeyi t-1 tabi kere le ko gbe awọn owo nikan.
- Awọn iṣowo wo bi eyikeyi miiran ti a fi aabo pamọ  ko si atẹle on-chain n ṣafihan pe ibuwọlu alabọde ni o lo.
- Eyi yatọ si ti multigin transparant (eyi to jẹ gbangba lori-agbelebu ati Zcash ti ṣe atilẹyin fun igba pipẹ)  FROST ṣiṣẹ laarin adagun ipamọ.
- Ó wúlò fún àwọn DAO, ilé-ìtajà, iṣẹ́ ìtọjú owó, àpapọ̀ ìṣúnná àti ẹgbẹ́ òṣìṣẹ́ - níbikíbi tí a kò ti lè gba ibi kan ṣoṣo tó bá jẹ́ pé kókó pàtó ni ó kùnà.

---

## What is FROST in plain language?

ro pe awọn alabaṣiṣẹpọ iṣowo mẹta kọọkan ni apakan kan ti bọtini. lati lo lati inu apamọwọ pinpin wọn, eyikeyi meji ninu awọn mẹtẹẹta gbọdọ gba ati fọwọsi-aṣẹ. idunadura to wa bi o ṣe jẹ deede si firanṣẹ ẹni lasan  ko si oluwoye le sọ lati blockchain pe ọpọlọpọ eniyan kopa.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures **) ni ìlànà ìkọ̀wé tí ó jẹ́ kí èyí ṣeé ṣe fún Zcash. O ti dá sílẹ̀ láti ọwọ́ Chelsea Komlo (Yunifásítì Waterloo/Zcash Foundation) àti Ian Goldberg.

Àwọn ohun-ìní pàtàkì:

- **Iwọn-oorun**: awọn t - ti n oludasiwe nikan nilo lati kopa (fun apẹẹrẹ 2-ti-3, 3-ti-5)
- **Shielded**: ṣiṣẹ laarin Orchard ìpamọ pool  iye, oluṣowo, ati olugba duro ikọkọ
- **Awọn ti ko ni iyatọ**: ìforúkọsílẹ̀ tí ó kẹ́yìn dàbí gbogbo àwọn àdàkọ Zcash mìíràn tó ní ìdènà-ìṣàmúlò.
- **Kì í ṣe ìpamọ́**: kò sí ẹnìkan tó ní kókó náà  kódà olùṣètò ò lè rí i gbà.

---

## Ìgbà wo ló yẹ kó o lo àṣẹ tí wọ́n fún ẹ láti máa bá ọmọ rẹ lò?

Ìpamọ́ ìkókó lóhun tó bọ́gbó̀n mu nígbà tí **ìṣubú kókó kan tàbí ẹnìkan kò níí túmọ̀ sí pípàdánù owó náà**.

Ìṣòro: Ìdí tí ìsókè-ìtójú fi ń ṣèrànwọ́.
|-----------|----------------------------|
** DAO tabi iṣura ẹgbẹ** Kò sí olùdarí kan ṣoṣo tó lè gba owó lọ́wọ́ ẹni; ó nílò ìfọwọ̀sí.
** Exchange tabi custodian**. pín ewu pàtàkì káàkiri àwọn àgbègbè ìpamọ́ tàbí òṣìṣẹ́.
** Ibi ìpamọ́ dídì ti ara ẹni (pẹ̀lú ẹbí tí o fọkàn tán)** 2 nínú 3 láàárín ìwọ + àwọn mẹ́ńbà ìdílé méjì  kú tàbí pàdánù ààyè, owó kò sọnù.
**Escrow** Olura, olutaja ati oniduro kọọkan ni ipin; owo ti o tu silẹ nigbati awọn meji ba gba.
** Ìpínwó owó ìrànwọ́ tí ó níye lórí** ZCG-style: ń béèrè fún ọ̀pọ̀ àwọn aláṣẹ aládàáni kí wọ́n tó san án.
 ** Ìtọ́jú kókó olùdásílẹ̀** Dènà ìbèèré inú ilé  Kò sí onímọ-ẹrọ kan ṣoṣo tó lè fi owó àgbékalẹ̀ ṣe é.

O lè máà nílò ìpamọ́ tí ó kéré fún àpò-ìwé ti ara ẹni tóo ń darí nìkan, iye owó díẹ̀ tàbí àwọn ipò níbi tí ètò ìṣètò kún sí i ju kí o dín ewu kù.

---

## Báwo ló ṣe yàtọ̀ sí aláṣẹ tó ń fọwọ́ ara rẹ̀ hàn?

Zcash ti pẹ atilẹyin multisig ṣiṣan  awọn bọtini pupọ nilo lati lo lati t-adiresi. Ṣugbọn multigin ṣiṣi ni idiyele aṣiri pataki: ** ọna ṣiṣe multisig, gbogbo awọn bọteni gbangba, ati gbogbo awọn onifiranṣẹ han lori blockchain**.

FROST yanju eyi nipa ṣiṣe ni inu adagun ti a fi oju pa:

| | Transparent multisig | FROST threshold (shielded) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
 Àwọn aláṣẹ tí ó hàn nínú ẹ̀ka. Bẹẹni  gbogbo àwọn kókó gbangba ní àfihàn. Kò sí  kò ṣeé yàtọ̀ láti ìnáwó onílàǹmá kan ṣoṣo
 Ìpín tó hàn síta. Bẹẹni, rárá.
ìṣètò nílò. On-chain script, ìsọ̀rí àgbáyé tí kò ní ẹ̀rọ ìbánisọ̀rọ̀ nínú ọjà náà.
Àkọsílẹ̀. Kò sí èyí tó wà nínú rẹ̀. Ìpamọ́ pátápátá ni ààbò rẹ̀.

---

## Àwọn àdéhùn àti àwọn ààlà tó wà nínú rẹ̀

FROST is powerful, but it comes with real trade-offs you should understand before using it:

### Àwọn ìnáwó tó ń lọ láwùjọ
Àwọn aláṣẹ gbọdọ̀ wà lórí-ayé lẹ́ẹ̀kan náà (tàbí ní nǹkan bí bẹ́ẹ̣) láti parí ìdìbò tí ó ń fọwọ́ sí ìwé. Bí àwọn t tó bá fi ọwọ́ siwé rẹ bá pín káàkiri àgbègbè àkókò tàbí àjọṣepọ̀ tí kò ṣeé gbára lé, owó náání nílò ètò ìṣètò ti pópó alákòókò kan ṣoṣo ò lè ṣe é.

### Kò sí ìforúkọsílẹ̀ tí kò bá tó láti ṣe é.
Ti awọn oludari bọtini ko ba to (ti o ni aisan, rin irin-ajo, ti ko dahun), owo jẹ igba diẹ. Yan opin rẹ ati pin nọmba iṣọra  2-of-3 jẹ ifarada ju 2-of-2.

### Àjọṣe ìbílẹ̀-ìkọ́lé
Ṣiṣeto FROST nilo ayẹyẹ ipilẹṣẹ bọtini pinpin (DKG) nibiti gbogbo awọn olukopa n wa lori ayelujara papọ. Eyi jẹ iṣẹlẹ ẹẹkan, ṣugbọn o gbọdọ ṣe ni iṣọra  ti awọn alabaṣepọ ba farapa lakoko DKG, aabo ko lagbara.

### Àwọn irinṣẹ́ náà ṣì ń dàgbà sí i ni.
FROST fun Zcash ti a fi bo jẹ tuntun. Igbesẹ IETF (draf-irtf-cfrg-frost) ni ogbo, ṣugbọn awọn iṣọpọ apamọwọ wa ni opin. Ṣe ireti diẹ ninu awọn eti alarawọn akawe si apoti apamọ bọtini kan ṣoṣo deede .

### Ìdàgbàsókè ìmúbọ̀sípò
Ṣíṣáyọ̀ kan kìí ṣe òpin ayé (èyí ni àlàfo), ṣùgbọ́n ètò ìmúpadàbọ̀ gbọdọ̀ wà ní àkọsílẹ̀ ṣáájú. Ta ló ń tọjú àwọn ẹ̀dà afẹsẹ̀yìn? Kí ló máa ṣẹlẹ̀ bí a bá pàdánù méjì lẹ́ẹ̀kan náà?

---

## Ta ni ó ń kọ́ ilé pẹ̀lú FROST lórí Zcash?

### Zcash Foundation — frost.zfnd.org
The Zcash Foundation has shipped a working FROST implementation and a demo site. This is the reference implementation used for testing and development.

### Àwòṣe YWallet FROST
YWallet (a ga-ṣiṣe Zcash apamọwọ) ni o ni a tete Frost demo iṣọpọ. Wo awọn [YWallet FROST Demo guide](/guides/Ywallet_FROST_Demo) fún àwọn ìtọ́ni tó ṣe tààràtà.

### ZecHub Hackathon 2026  Awọn iṣẹ orin FROST

Àkọlé àwòrán, Ẹ̀ka eré ìdárayá FROST ni ó jẹ́ èyí tí wọ́n fi ìdíje mú jùlọ ní ZecHub Hackathon 2026. Àwọn iṣẹ́ àkànṣe:

- **ZecVault**  2 ninu 3 escrow ti o ni aabo lori mainnet (aaye FROST)
- **Iṣọ́**  ìpamọ̀ díẹ̀ fún Zcash tí a fi ààbò ṣe pẹlú UX tó dá lórí igbasilẹ-àtúnṣe.

### Coinbase (ìmọ̀ràn)
Coinbase kọ iṣelọpọ FROST fun awọn ọna ṣiṣe ibuwọlu ti o ni opin (fun Bitcoin), pẹlu awọn atunṣe ti o yọ ipele preprocessing ati pin ipa apapọ laarin gbogbo awọn olukopa. Iriri wọn jẹrisi awoṣe aabo FROST lori iwọn iṣelopọ.

---

## Bí ìjíròrò nípa fífi èdè adití sọ̀rọ̀ ṣe ń ṣiṣẹ́ (tí a mú rọrùn)

1. **Seto (nígbàkan):** Gbogbo àwọn olùkópa n ṣe ayẹyẹ ìpilẹ̀ṣẹ̀ kókó tí a pín káàkiri. Olúkúlùkù gba àlàfo ìdánimò; wọ́n ń mú kí ó jẹ́ kọkọ-kọọkan ni gbogbo ènìyàn mọ ọ̀nà náà. Kò sí ẹni tó mọ òpópónà àṣírí rẹ̀ ní odidi.

2. **Coordinate signatories:** Nígbà tí ó bá pọn dandan láti náwó, olùṣètò (tí yóò jẹ́ ọ̀kan lára àwọn tó fọwọ́ sí ìwé náà) máa ń gba ìmúṣẹ àgbékalẹ̀ owó látọ̀dọ̀ gbogbo àwọn akópa tí wọ́n múra tán láti ṣe bẹ.

3. **Igbesẹ 1:** Olukuluku ti o kopa ninu ifọwọsi naa n ṣe agbekalẹ nonce kan ati ki o tan kaakiri adehun (ti gbogbo eniyan, kii ṣe alara.

4. **Igbesẹ 2:** Olukuluku ti o kopa ninu ifọwọsi ṣe iṣiro iforukọsilẹ apakan wọn nipa lilo shard ikọkọ ati igbohunsafefe rẹ.

5. **Aggregation:** Olùṣètò náà pa àwọn ìdìmọ̀ díẹ̀ pọ̀ sínú àmì Schnorr kan tí ó kẹ́yìn  kò lè yàtọ̀ nínú ẹ̀ka láti inú ìwé-ìdílé.

6. **Ifihan:** Iṣowo naa ni a ṣe igbohunsafefe si nẹtiwọọki Zcash bi o ti jẹ deede.

Ti eyikeyi onisowo ba firanṣẹ ibuwọlu idapọ, ilana naa ṣe idanimọ wọn ati awọn aborti (wọn ti yọ kuro ninu awọn akoko iwaju). Iṣọkan ṣẹlẹ ni ita-pupọ  blockchain nikan ri iṣowo ikẹhin.

---

## Yíyan àwọn ìlànà ìlà rẹ

Ìdásílẹ̀. Àìlèjàgbara. Ewu.
|-------|-----------|------|
☐ 1-of-1 ● Kò sí ìmúrasílẹ̀ • Ibi kan ṣoṣo tí àṣìṣe ti wáyé. ▪ Ìṣòro kókó = àìrílò rèé o!
 2 nínú 2. Ó ní láti jẹ́ pé àwọn méjèèjì ló fọwọ́ sí ìwé náà. Kò gba àṣìṣe kankan láyè. Ẹnìkan kò wà lárọ̀ọ́wọ́tó = owó tí wọ́n ti dá dúró.
2 nínú 3 ìdìpọ̀ kan lè sọnù tàbí kó máà sí láàyè. Ìdáàbòbò rẹ̀ kéré ju ti àwọn mẹ́ta lọ lára márùn-ún.
 3 nínú 5  O lè pàdánù ìka méjì; ààbò tó lágbára. Àjọṣepọ̀ púpọ̀ sí i lókè òfuurufú.
3 nínú 7 - ilé-iṣẹ́; ó lè ṣe àṣìṣe méjì. Iye owó ìfọ̀rọ̀wérọ̀ tó ga.

Ìbẹ̀rẹ̀ tó wúlò fún ọ̀pọ̀lọpọ̀ àwọn ẹgbẹ́: **2-of-3** (ìmúrasílẹ̀, ìfọwọ́sowọ́pọ̀ tí ó kéré jù) tàbí **3-of-5** (àjọṣe ilé-iṣẹ́, ààbò gíga).

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [FROST — Technical Deep Dive](FROST.md)  àwọn ìsọfúnni nípa ìlànà sísọ nǹkan níkòó (DKG, yíyẹwọ̀n àtẹ́lẹwọ́, ẹrí ìdánilójú)
- [YWallet FROST Àkọsílẹ̀ Ìdánwò](/guides/Ywallet_FROST_Demo)  ìtòlẹ́sẹẹsẹ ìdánrawò tó ń gbéni ró lẹ́ẹ̀kan-lóṣù kan
- [Àwòfihan FROST (àwòrán àfihàn frost) ](/guides/frostdemo)  Ìtòlẹ́sẹẹsẹ ìfihàn ti àjọ Zcash Foundation
- [Àwọn Kọ́kọ́rọ́ Ìwòye](Viewing_Keys.md)  wíwọlé kíkà nìkan sí àwọn àdírésì tí a fi ààbò bo (tí ó ṣe afikun si ìpamọ́ òpin)
- [Àwọn Nǹkan tí a fi ààbò ṣe ní Zcash](Zcash_Shielded_Assets.md)  FROST tun jẹ ipilẹ pataki fun iṣedede ZSA

## Àwọn Owó-ìṣúnná owó

- [Iwé ìwádìí FROST (Komlo & Goldberg, 2020) ](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST àtòjọ ìlànà (àtòjọ-irtf-cfrg-frost) ](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST implementation](https://frost.zfnd.org)
- [Chelsea Komlo  Kí ni Àwọn Àmì Ìlàjú? (Zcon3) ](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase  Awọn Ibuwọlu Digital Iwọn-ọna](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST  Robust Async Schnorr Ìlà ìforúkọsílẹ (Blockstream) ](https://eprint.iacr.org/2022/550.pdf)
