<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìgbà òtútù

> Overwinter lọ laaye lori Zcash mainnet ni bulọọki 347,500 (June 26, 2018 UTC).

Ohun tí ẹ óo mú lọ: bí Zcash ṣe kọ́ láti yí àwọn òfin rẹ̀ padà láìséwu, àti ìdí tí iṣẹ́ ìpilẹ̀ṣẹ̀ náà fi jẹ kí gbogbo àtúnṣe tó bá wáyé lẹ́yìn ìgbà yẹn ṣeé ṣe. Bẹrẹ pẹ̀lú Sapling.

Overwinter jẹ Zcash kan. [àtúnṣe síra ẹ̀rọ](../start-here/network-upgrades), akọkọ lẹyin ti nẹtiwọọki naa bẹrẹ. O wa ni itumọ nipasẹ ọpọlọpọ awọn imọran Imudarasi Zcash: [ZIP 200 - Àwọn èèyàn tó ń gbé nílùú.](https://zips.z.cash/zip-0200), [ZIP 201 (ìyẹn àwọn tó ń gbé ibẹ̀)](https://zips.z.cash/zip-0201), [ZIP 202 (ìyẹn àwọn tó ń gbé ibẹ̀)](https://zips.z.cash/zip-0202), [ZIP 203 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0203), àti [ZIP 143](https://zips.z.cash/zip-0143)Overwinter ko fi eyikeyi titun shielded ẹya ara ẹrọ. dipo o hardened awọn ilana ki ojo iwaju igbesoke le ọkọ ailewu. ti igbesode ni a ṣe akọsilẹ nipa awọn [Electric Coin Company](../zcash-organizations/electric-coin-company) lórí ojú-ìwé ìmúbòjúsípò Zcash.

ìdí tí èyí fi ṣe pàtàkì. yípadà àwọn ìlànà ti ẹ̀rọ alágbèéká jẹ́ ewu. bí ó bá ṣàṣìṣe, àdàkọ méjì nínú nẹtiwọọki lè máà gbà pé òótọ́ ni tàbí kí ìsòwò kan tó wà fún ẹ̀ka-ìpínlẹ̀ mìíràn di ohun èlò míì. ṣáájú Overwinter, Zcash kò ní ọ̀nà pàtó kankan láti ṣètò ètò ìṣúnná owó náà lọ́nà tí yóò sì ṣeé tún lò padà. overwinter yanjú ìṣòro yìí. ó pèsè ìgbésẹ̀ òfin fún títúbòo sípò àti dídáàbòbo ìtúsíwájú méjèèjì, nítorí náà àdéhùn tí ó tọ lábẹ́ oríṣi ìlànà kan kò le wáyé lábẹ́ òmíràn. iṣẹ́ ìpìlè yẹn ló mú kó ṣeé ṣe fún Sapling àti gbogbo ìdásílọ́po lẹ́yìn rẹ̀ láti ṣiṣẹ́ láìléwu.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Ọna ìmúbọ̀sípò náà

Overwinter ṣafihan Ilana Igbesoke Nẹtiwọọki, ti a ṣe apejuwe ninu awọn ofin. [ZIP 200 - Àwọn èèyàn tó ń gbé nílùú.](https://zips.z.cash/zip-0200)Gbogbo igbesoke bayi n ṣalaye awọn nkan meji: id iyasọtọ ti o gbagbọ pe orukọ ṣeto ofin lọwọlọwọ, ati giga ifilọlẹ kan, bulọọki ni eyiti awọn ilana tuntun bẹrẹ. Eyi fun gbogbo eniyan ṣiṣe sọfitiwia Zcash window ṣiṣi lati ṣe imudojuiwọn ṣaaju iyipada naa.

Overwinter fúnra rẹ̀ ti ṣiṣẹ́ lórí ìkànnì orí rédíò ní ẹyọ 347,500.

[ZIP 201](https://zips.z.cash/zip-0201) handles how nodes treat each other around an upgrade. Before activation, nodes prefer to connect to peers running the same version. At activation, a node disconnects from peers that are on a different consensus branch, so the network splits cleanly along the new rules instead of getting confused.

## Ààbò láti fi àtúnṣe ṣe é

Àtúnṣe jẹ́ ìgbà tí ẹnìkan bá gba ìsòwò kan tó ṣe pàtàkì ní ẹ̀ka ọ̀nà kan, ó sì tún gbé e jáde lórí òmíràn. Overwinter ti ẹnu-ọna náà pa pẹlú ètò àtẹléwọle tuntun, èyí tí a ṣalaye nínú [ZIP 143](https://zips.z.cash/zip-0143). Nigbati apamọwọ kan ba buwọlu idunadura, ibuwọlu bayi ṣe adehun si idanimọ ẹka ifọkanbalẹ ti pq lọwọlọwọ. Idunadura ti a fi ọwọ buwolu wọle fun ẹka kan ko wulo lori eyikeyi ẹka miiran, ni itọsọna mejeeji. Iyẹn ni ohun ti aabo atunṣe ọna meji tumọ si.

Eleyi ṣiṣẹ ọwọ ni apa pẹlu awọn titun version 3 idunadura kika lati [ZIP 202 (ìyẹn àwọn tó ń gbé ibẹ̀)](https://zips.z.cash/zip-0202), nigbakan ti a npe ni ọna kika Overwintered. O ṣafikun asia fOverwintered ati id ẹgbẹ ẹya kan eyiti o ṣe kedere eyi ti ṣeto awọn ofin ifọkanbalẹ iṣowo jẹ tirẹ. Gẹgẹbi anfani apa, eto ibuwọlu tuntun tun mu ilọsiwaju bi yarayara awọn iṣiro ṣiṣanṣe le di mimọ.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Ìmúṣẹ ìsòwò náà

[ZIP 203 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0203) a fi kún ìmúṣẹ ìṣòwò. Ìmúlùmálà kan le ṣe àtúnṣe sí gíga òpó tí ó pé tán ní báyìí. Bí wọn kò bá ti rí i kó tó dé ibi náà, àwọn nóódì yóò yọ ọ́ kúrò nínú mempool, yàrá ìdánilójú fún àwọn àdéhùn tí kò tíì fìdí múlẹ̀. Ṣáájú èyí, ìbádọ́rẹ̀ lè wà láìfìdí rẹ múlẹ̣ fún àkókò gígún. Àkókò parí túmọ̀ sí wípé ìgbésẹ̀ dídákéjìgbépègbè máa ń kásí-kòkó fúnra rè é, èyí sì dín àìríná mọ́ni kù àti kí o má jẹ́ kí mempool kún pẹ̀lú àwọn ìpèsè ìgbàgbọ́n tí kò ṣẹ̀yìn.

## Ibi tó bá yẹ kó wà.

Overwinter was the first Zcash network upgrade after the October 2016 mainnet launch, and it shipped deliberately ahead of Sapling. Its job was infrastructure, not features. By installing the upgrade mechanism and the replay-protection machinery first, it gave every later upgrade (Sapling, Blossom, Heartwood, Canopy, NU5, and the ones after) a safe path to activate.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
 Network upgrade (NU)  Aṣayan iyipada ti a ṣepọ si awọn ofin ifọkanbalẹ Zcash, ti o ṣiṣẹ ni giga bulọọki ṣeto.
☐ Idì ẹ̀ka ìfohùnṣòwò. Aṣàmúlò ṣókí tí ó ńpè àwọn ìlànà ìfọwọ́sowọpọ tó wà nísinsìnyí ni orúkọ rẹ̀.
ìgùn ìmúṣẹ. Ìdìpọ̀ tí àwọn ìlànà tuntun ti àtúnṣe nẹ́tàkì fi ń bẹ̀rẹ̀ sí ṣiṣẹ́.
Ààbò láti tún ṣe. Òfin tí ó dáwó ìsòwò tó bá wúlò lórí ẹ̀ka kan dúró kí a má lòó ní òmíràn.
Mempool: Àkójọ àwọn ìsòwò tí a ti gbé jáde ṣùgbọ́n kò tíì di ohun èlò ìdánilẹ́kọ̀ọ́.
íṣe ìsúná. Ìsọ̀rí tí ó péjú, lẹ́yìn èyí ni a máa ń yọ àdàkọ tí kò bá ti ṣe é jáde kúrò nínú rẹ̀.

## Àwọn ìbéèrè tí a sábà máa ń béèrè

ṣé overwinter yí ZEC mi padà tàbí ìpamọ́ra mi? rárá. overwinters kò fi àwọn àfikún tuntun kún un, bẹ́ẹ̀ ni wọn ò fọwọ́ kan ìṣàdálẹ̀ tí a ṣe lábẹ́ ìdènà o. ó ń ṣètò fún gbígbéga ọjọ́ ọ̀la tó nípọn rẹ owó àti àṣírí ara ẹni yín kì í nípa lórí ẹ. nígbà náà, kí ló dé táá mú kó ṣeé ṣe láti máa lo ohun èlò yìí láìfi ohunkóhun pa mọ́ nínú ilé iṣẹ́ wa?

Did Overwinter add Sapling or shielded addresses? No. Overwinter added no shielded features. It prepared the ground so that Sapling could activate safely later.

Kini id ẹka ifọkanbalẹ? O jẹ aami kukuru ti o pe awọn ofin lọwọlọwọ. Awọn iṣowo ṣe adehun si rẹ nigbati wọn ba fowo si, eyiti o fun Zcash ni aabo atunṣe rẹ.

Kí nìdí tí àwọn kan fi sọ June 25 àti 26? Overwinter activated at 01:37 UTC on June 26, 2018. That is just after midnight UTC, so in many Western time zones the local clock still read June 25. It's the same block and the same moment. Ìtàn náà ni pé ìgbà òtútù ti bẹ̀rẹ̀ ní aago méjìlá ààbọ́jú ọjọ́ kẹfà oṣù karùn-ún ọdún 2018 (ìyẹn October).

Kini idasilẹ iṣowo ti o dara fun? O tumọ si pe iṣiro kan ti ko ni mined kii yoo duro lailai. Lẹhin giga ipari rẹ, awọn nodu fi silẹ, nitorinaa a ko fi ọ silẹ lati ṣe akiyesi nipa isanwo didan.

Do I need to do anything? No. Overwinter activated in 2018. Any current Zcash wallet or node already follows these rules.

## Wádìí òye rẹ wò

Overwinter kò fi àfikún àwọn ohun èlò tuntun sí. Nítorí náà kí ló dé tí a ó máa kà á si ọ̀kan lára ìmúbọ̀síwájú tó ṣe pàtàkì jùlọ nínú ìtàn Zcash?

<details>
<summary>Answer</summary>

Nitoripe o kọ awọn ẹrọ ti gbogbo igbesoke nigbamii da lori. Overwinter ṣe agbekalẹ Ilana Imudarasi Nẹtiwọọki ati aabo atunṣe ọna meji, fifun Zcash ni bošewa kan, ọna ailewu lati yi ofin igbọkanle rẹ pada. Laisi ipilẹṣẹ yẹn, Sapling ati awọn imudara lẹhin ko le ṣiṣẹ daradara.
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 200: Ètò Àtúnṣe Ìpínlẹ̀-Ìlú](https://zips.z.cash/zip-0200)

[ZIP 201: Ìdarí Ẹgbẹ́-Ẹgbẹ́ fún Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Ẹ̀dà 3 Àtòjọ Ìṣowo fún Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Ìmúṣẹ Àdéhùn Iṣẹ́-òwò náà.](https://zips.z.cash/zip-0203)

[ZIP 143: Ìmúṣẹ ìforúkọsílẹ̀ Àdéhùn fún Overwinter](https://zips.z.cash/zip-0143)

[Àtúnṣe sípínlẹ̀-ìmọ́lé fún ìgbà òtútù](https://z.cash/upgrade/overwinter/)

### Ẹ tún wo:

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools)

[Àwọn Ìkànnì Pípéye](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Kí ni ZEC àti Zcash?](../start-here/what-is-zec-and-zcash)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [Èso ẹ̀ka igi](../zcash-tech/sprout) · Àtúnṣe: [Sapling](../zcash-tech/sapling)
