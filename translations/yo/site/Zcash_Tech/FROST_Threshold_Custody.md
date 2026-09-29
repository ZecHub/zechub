<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Ìkáwọ́ Àlàfo fún ZEC tí a fi ààbò bo

> Fun awọn alaye kikọkọ kikun ti ilana FROST, wo iwe-aṣẹ. [Ojúewé ìmọ̀-ẹ̀rọ FROST](FROST.md).

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

| Ipò | Kí nìdí tí ìtọ́jú ààlà ilẹ̀ fi ń ranni lọ́wọ́ |
|-----------|----------------------------|
| **DAO tabi iṣura ẹgbẹ** | Kò sí olùdarí kan ṣoṣo tó lè yọ owó kúrò ní ẹyọ kan; ó nílò ìfọwọ́sowọ́pọ̀ |
| **Paṣipaarọ tabi olutọju** | Pinpin eewu pataki kọja awọn agbegbe aabo tabi awọn oṣiṣẹ |
| **Ibi ipamọ otutu ti ara ẹni (pẹlu idile ti o gbẹkẹle)** | Méjì nínú mẹ́ta láàárín ìwọ àti àwọn ọmọ ìdílé méjì — ẹ kú tàbí kí ẹ pàdánù àǹfààní, owó kò ní pàdánù |
| **Ẹ̀kọ́ ìtọ́jú** | Olùrà, olùtajà, àti olùdájọ́ ní ìpín kan; ìtúsílẹ̀ owó nígbà tí àwọn méjì bá gbà láti ṣe bẹ́ẹ̀ |
| **Ìsanwó owó ìrànlọ́wọ́ tó níye lórí** | ZCG-style: nilo ọpọlọpọ awọn olufowosi ominira ṣaaju ki o to sanwo jade |
| **Ìṣàkóso kọ́kọ́rọ́ olùgbékalẹ̀** | Dènà ewu inu — kò sí onímọ̀ ẹ̀rọ kan ṣoṣo tó lè da owó ìfowópamọ́ ìṣètò sílẹ̀ |

O lè máà nílò ìpamọ́ tí ó kéré fún àpò-ìwé ti ara ẹni tóo ń darí nìkan, iye owó díẹ̀ tàbí àwọn ipò níbi tí ètò ìṣètò kún sí i ju kí o dín ewu kù.

---

## Báwo ló ṣe yàtọ̀ sí aláṣẹ tó ń fọwọ́ ara rẹ̀ hàn?

Zcash ti pẹ atilẹyin multisig ṣiṣan  awọn bọtini pupọ nilo lati lo lati t-adiresi. Ṣugbọn multigin ṣiṣi ni idiyele aṣiri pataki: ** ọna ṣiṣe multisig, gbogbo awọn bọteni gbangba, ati gbogbo awọn onifiranṣẹ han lori blockchain**.

FROST yanju eyi nipa ṣiṣe ni inu adagun ti a fi oju pa:

| | Àwọn àmì ìṣíkiri tí ó hàn gbangba | Ààlà FROST (tí a dáàbò bò) |
|--|---------------------|--------------------------|
| Adágún omi | Ṣíṣípayá (gbangba) | Orchard (tí a fi ààbò pamọ́) |
| Àwọn àmì tí a lè rí lórí ẹ̀wọ̀n | Bẹ́ẹ̀ni — gbogbo àwọn kọ́kọ́rọ́ gbogbogbò tí a ti tú síta | Rárá — a kò lè yà á sọ́tọ̀ kúrò lára owó tí a fi ọwọ́ kan ṣoṣo ná |
| Àwọn iye tí a lè rí | Bẹ́ẹ̀ni | No |
| Ìṣètò tó yẹ | Ìwé àfọwọ́kọ lórí ẹ̀wọ̀n | Ìbánisọ̀rọ̀ tí kò ní ẹ̀wọ̀n |
| Ìpamọ́ | Kò sí | Ìpamọ́ tí a dáàbò bo ní kíkún |

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

### Àwòkẹ́kò́ó Ywallet FROST
Ywallet had an early FROST demo integration, walked through in the [Itọsọna ifihan ti Ywallet FROST](/guides/Ywallet_FROST_Demo). Ywallet ti wa ni ko si siwaju sii ntọju ati ki o yoo ko ba updated fun Ironwood, ki ka awọn itọnisọna bi abẹlẹ dipo ju nkankan lati ṣiṣe loni. Zkool, lati kanna Olùgbéejáde, jẹ awọn n ṣetọju arọpo ati akojọ FROST multisig laarin awọn oniwe-ara ẹya ara ẹrọ.

### ZecHub Hackathon 2026  Awọn iṣẹ orin FROST

Àkọlé àwòrán, Ẹ̀ka eré ìdárayá FROST ni ó jẹ́ èyí tí wọ́n fi ìdíje mú jùlọ ní ZecHub Hackathon 2026. Àwọn iṣẹ́ àkànṣe:

- **ZecVault**  2 ninu 3 escrow ti o ni aabo lori mainnet (aaye FROST)
- **Iṣọ́**  ìpamọ̀ díẹ̀ fún Zcash tí a fi ààbò ṣe pẹlú UX tó dá lórí igbasilẹ-àtúnṣe.

### Coinbase
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

| Ṣeto | Ìfaradà | Ewu |
|-------|-----------|------|
| 1-of-1 | Kò sí ìfaradà — ojú kan ṣoṣo ti ìkùnà | Pípàdánù pàtàkì = pípadánù títí láé |
| 2-of-2 | Àwọn méjèèjì gbọ́dọ̀ ní àwọn olùfọwọ́sowọ́pọ̀ — láìsí ìfaradà àṣìṣe | Ọkan ti ko si = owo ti a ti dina |
| 2-of-3 | Àkójọpọ̀ kan lè sọnù tàbí kí ó wà láìsí | Ààlà ààbò tó kéré sí i ju 3 nínú 5 lọ |
| 3-of-5 | A le sọ awọn ege meji nù; aabo to lagbara | Awọn iṣẹ iṣedopọ diẹ sii |
| 3-of-7 | Ipele ile-iṣẹ; gba awọn ikuna meji | Iye owo iṣiṣẹpọ giga |

Ìbẹ̀rẹ̀ tó wúlò fún ọ̀pọ̀lọpọ̀ àwọn ẹgbẹ́: **2-of-3** (ìmúrasílẹ̀, ìfọwọ́sowọ́pọ̀ tí ó kéré jù) tàbí **3-of-5** (àjọṣe ilé-iṣẹ́, ààbò gíga).

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [FROST  Ìdánwò ìbúgbàù tó jinlẹ̀](FROST.md)  àwọn ìsọfúnni nípa ìlànà sísọ nǹkan níkòó (DKG, yíyẹwọ̀n àtẹ́lẹwọ́, ẹrí ìdánilójú)
- [Ywallet FROST Àtẹ̀wò Ìtọ́sọ́nà](/guides/Ywallet_FROST_Demo)  ìsàlẹ̀, Ywallet kò tún níí ṣe àbójútó mọ́.
- [Àwọn Kókó Ìwòran](Viewing_Keys.md)  wíwọlé kíkà nìkan sí àwọn àdírésì tí a fi ààbò bo (tí ó ṣe afikun si ìpamọ́ òpin)
- [Awọn ohun-ini ti a fi aabo Zcash pamọ](Zcash_Shielded_Assets.md)  FROST tun jẹ ipilẹ pataki fun iṣedede ZSA

## Àwọn Owó-ìṣúnná owó

- [Ìwé ìwádìí FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Àkọlé ìlànà IETF FROST (àkójọ-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Ìmúṣẹ FROST ti àjọ Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo  Kí ni àwọn Àmì Ìdìbò? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase  Àwọn Àmì-ìdìwọ̀ Oníṣàmúlò tí ó pọ́n sí i](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST  Awọn Ibuwọlu Iwọn-ipele Async Schnorr ti o lagbara (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
