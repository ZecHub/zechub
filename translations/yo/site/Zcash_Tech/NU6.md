<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 lọ si igbesi aye lori Zcash mainnet ni bulọọki 2,726,400 (November 23, 2024 UTC).

Ohun tí ẹ óo mú lọ: bí Zcash ṣe ń bá ìdàgbàsókè rẹ̀ nìṣó lẹ́yìn ìdádúró, ìdí tó fi ya àpamọ́ kan sílẹ̀ èyí tí kò tíì mọ bóun yóò ti ná an àti bí o ṣe sọ iye owó ZEC di ohun téèyàn lè fojú díwọ̀n.

NU6 jẹ Zcash kan. [àtúnṣe síra ẹ̀rọ](../start-here/network-upgrades), tí a gbé kalẹ̀ nípasẹ̀: [ZIP 253](https://zips.z.cash/zip-0253), ti o ṣiṣẹ lori mainnet ni Oṣu kọkanla ọdun 2024 ni bulọọki 2,726,400. O jẹ owo ati awọn ohun elo iṣowo. [ìfún-ni owó fún àdàgbàsókè](../start-here/development-fund) upgrade: it kept a share of the block subsidy going to development past the November 2024 halving, set up an in-protocol reserve for future community-decided use, and tightened how new ZEC is counted. NU6 was endorsed by both the Electric Coin Company and the Zcash Foundation.

Why this matters. Zcash's [Ìpèsè fún Àjọṣe](../zcash-tech/canopy) a ti ṣeto lati pari ni ayika Oṣu kọkanla ọdun 2024, idaji keji ninu itan rẹ. NU6 tọju owo yẹn, ṣugbọn dipo fifun gbogbo owó si awọn olugba to wa titilai, o ṣe ipamọ ipin kan laarin ilana naa ki agbegbe le pinnu nigbamii kini lati ṣe pẹlu rẹ. O tun pa iho iṣiro idakẹjẹ didan, nitorinaa iye apapọ ZEC ti yoo lailai waye bayi le ṣee sọ asọtẹlẹ gangan.

## Àwọn ohun tí NU6 yí padà

NU6 tẹsiwaju lati fi 20% ti owo-ifunni apapọ ranṣẹ si eto idagbasoke lẹhin idaji oṣu kọkanla ọdun 2024, ofin kan ti a ṣalaye ninu [ZIP 1015 Àwọn ojúewé wọ̀nyí jápọ̀:](https://zips.z.cash/zip-1015)Ó pín ìdá ogún nínú ọgọ́rùn-ún náà sí méjì.

1. 8% ti owó ìtìlẹyìn àpapọ̀ lọ sí Zcash Community Grants (ZCG), èyí tí ó ń fi owó ṣe iṣẹ́ fún àti láti ọwọ́ àwùjọ.
2. 12% lọ sínú àpótí tuntun tí wọ́n fi ṣe ààbò, èyí táwọn aráàlú máa lò lọ́jọ́ iwájú.

Awọn iyokù ti awọn block iranlowo, pẹlu owo-owo idunadura, lọ si miners ti o ni aabo nẹtiwọki. NU6 tun imudojuiwọn awọn tẹlẹ igbeowosile-akoko ati dev-igbeyin ofin (ZIP 207 ati ZIP 214) lati baamu yi titun be.

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## Àpótí tí a fi ààyè dì ni ilé ìfowópamọ́ náà.

12% ipin ni titun ero ninu NU6. dipo ti a n san si kan olugba adirẹsi, wipe iye ti wa ni idogo taara sinu ohun in-protocol pool pe awọn Deferred Dev Fund Lockbox, ṣalaye ni [ZIP 2001](https://zips.z.cash/zip-2001).

1. Àpótí ìsọ́nà jẹ́ irú ìṣúná owó tuntun (DEFERRED_POOL), níbi tí iye èrè-ìdìpò lọ sínú ìlànà náà, kì í ṣe sí ènìyàn tàbí àjọ.
2. Nẹtiwọọki naa tọpinpin rẹ bi idaduro apapọ iye ti ẹwọn tirẹ, ni ọna kanna o ṣe atẹle awọn iwontunwonsi ti awọn adagun-odo.
3. NU6 dá ààtò ìdìbò náà ní àmọ̀dunjú ṣùgbọ́n ó fi ìbéèrè tó le sílẹ̀: ta ló ń darí owó wọ̀nyìí, báwo ni wọn ṣe tú u jáde?

A dáhùn ìbéèrè yẹn nígbà tó yá nípa fífi àwọn ìsọfúnni yìí ránṣẹ́ sí wa. [NU6.1](../zcash-tech/nu6-1), ti o ṣeto iṣakoso: o tẹsiwaju ṣiṣan-ipinlẹ 8% si Awọn ẹbun Agbegbe Zcash ati itọsọna 12% ni iyipo owo-owo ti oludari oniwun nipasẹ awọn irugbin.

## Bá A Ṣe Lè Máa Ṣètò Ìṣirò Wa Lọ́nà Tó Bójú Mu

NU6 tun pari a iṣiro aafo ni bi titun ZEC ti wa ni da, mọ ninu awọn ofin. [ZIP 236](https://zips.z.cash/zip-0236). Awọn iṣowo Coinbase jẹ awọn iṣiro pataki ti o san owo ZEC tuntun ati idiyele fun bulọọki kọọkan.

1. Ṣaaju ki o to NU6, iṣowo ti owo-owo kan ko ni lati beere diẹ sii ju eyiti o jẹ. Oluwakiri le sọ kere si ifunni kikun, eyi ti o sun ZEC yẹn lailewu.
2. Lẹhin NU6, iṣowo owo-owo gbọdọ ṣe iwontunwonsi deede: iye iṣelọpọ lapapọ yẹ ki o dọgba si ifunni iwakusa pẹlu awọn idiyele, ko ju tabi kere.
3. Nítorí pé àwọn tó ń wa kùsà kò lè máa sọ pé iye tí wọ́n gbà ti dín kù, kí wọ́n sì wá fi iná sun ZEC láìmọ̀ọ́mọ̀, a tún lè mọ bí gbogbo owó náà ṣe pọ̀ tó.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Bí ìtìlẹyìn ṣe ń wáyé

NU6 jẹ orí kan nínú ìtàn tó gùn nípa bí Zcash ṣe ń sanwó fún ara rẹ̀.

1. Canopy (2020) pari ẹbun awọn oludasile atilẹba ati ṣẹda Ẹgbẹ ti Awọn Oluṣowo. [ìsopọ̀ fún àdàgbàsílẹ̀](../start-here/development-fund).
2. NU6 (November 2024) ṣe atunṣe owo-owo naa lẹhin idaji keji ati ṣeto apoti idaduro Deferred Dev, fifi ipin kan ti iṣedede silẹ fun awọn ẹbun ipinnu agbegbe ni ọjọ iwaju.
3. NU6.1 (2025) answered the question NU6 left open, who controls the reserved funds, by continuing 8% of the block subsidy to Zcash Community Grants and directing 12% into a coin-holder-controlled fund seeded by the lockbox.

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
ìtìlẹyìn ìdìpọ̀. ZEC tuntun tí a dá pẹ̀lú gbogbo àlàfo ti a bá ṣe ni ó ń jẹ́:
 Coinbase transaction. Ìṣirò àkànṣe tí ó ń san owó ìrànwọ́ àti àwọn ìnáwó fún ẹ̀ka kan.
| Deferred Dev Fund Lockbox | An in-protocol reserve that holds a share of issuance for future community-decided use |
Zcash Community Grants (ZCG) Ìgbìmọ̀ tó ń ṣètọrẹ owó fún iṣẹ́ tí àwọn aráàlú Zcash ṣe àti èyí tí wọ́n fi ranṣẹ sí wọn.
☐ Idì ẹ̀ka ìfọwọ́sowọ́pọ̀ (consensus branch id) Àwọn nóòù ìdánimọ̀ máa ń lo láti sọ àwọn ìlànà àtúnṣe tí agbóǹgbò kan tẹ̀lé.
 Network upgrade (NU)  Aṣayan iyipada ti a ṣepọ si awọn ofin ifọkanbalẹ Zcash, ti o ṣiṣẹ ni giga bulọọki ṣeto.

## Àwọn ìbéèrè tí a sábà máa ń béèrè

Ṣé NU6 yí ZEC mi padà tàbí ìpamọ́ra mi? Àìní, NÚ 6 jẹ nípa bí a ṣe ń fi owó ṣètọrẹ fún àtúnṣe àti bó o ti n ka àwọn ìwé tí ó jáde, kìí se nípasẹ̀ ìṣòwò rẹ tabi àṣírí. Owó-iní rẹ ati awọn iṣẹ́ ìdánilójú kò ni ipa kankan lórí wọn.

Nibo ni owo naa ti wa? Lati inu ẹbun bulọọki, ZEC tuntun ti a funni bi awọn bulọọgi ṣe n ṣa jade. 20% ipin kan ni o tọka si idagbasoke dipo gbogbo rẹ lọ si awọn oniwakiri.

Kini idi ti apoti-iṣilọ? O ṣe ipamọ ipin kan ninu awọn idasilẹ laarin ilana naa ki agbegbe le pinnu nigbamii bi o ṣe le lo. NU6 fi ẹtọ silẹ, ati pe NU6.1 ṣeto awọn ofin fun ẹniti o ṣakoso rẹ.

ṣé òfin ìsókè pàtó yí owó mi padà? rárá. ó kàn ń béèrè fún ìdásílẹ̀ àpò-ìṣirò ti ẹyọ kọ̀ọ̀kan láti san ohun tí wọ́n jẹ ní gbèsè gangan ni o kan ètò ìṣírò àwọn ìtẹ̀jáde tuntun, kì í ṣe iye tó wà tẹ́lẹ̀. kò sí ìdí kankan fún kíkópa nínú àdéhùn náà bí ẹni pé a fi òǹkà sílẹ̀ tàbí ká sọ wípé wọn bára mu pẹ̀lú ìlànà yìí.

Kini imọ-ẹrọ ṣe apejuwe NU6? A ti gbejade NU6 nipasẹ ZIP 253, eyiti o ṣeto ifilọlẹ mainnet rẹ ni bulọọki 2,726,400 ati id ẹka igbọkanle rẹ. Awọn ayipada igbẹkẹle funrararẹ wa lati ZIP 236, ZIP 1015, ati ZIP 2001, pẹlu ZIP 207 ati Zip 214 imudojuiwọn lati baamu.

Bawo ni NU6 ṣe yatọ si NU6.1?NU6 ṣatunṣe owo ati ṣẹda apoti titiipa.NU6.1 pinnu ẹniti o nṣakoso awọn owo ti apo-iwọle naa ati bi ipin ipamọ yoo ṣe pinpin.

## Wádìí òye rẹ wò

NU6 dá Lockbox Àkànlò Ìdánilójú sílẹ̀ ṣùgbọ́n kò sọ ẹni tó ń darí rẹ. Kí ló dé tí àtúnṣe yóò fi ṣe ìpamọ́ kan, kí ó sì fọwọ́ rọra mú ìṣàkóso rẹ̀ fún ọjọ́ iwájú?

<details>
<summary>Answer</summary>

Creating the reserve locked in that a share of issuance would be set aside inside the protocol instead of paid to fixed recipients. Deciding who controls those funds and how they are released is a harder governance question. NU6 deliberately left that open, and NU6.1 answered it: 8% of the block subsidy continues to Zcash Community Grants, and 12% goes to a coin-holder-controlled fund seeded by the lockbox.
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 253: Ṣíṣiṣẹ́ Àtúnṣe sí Nẹtiwọọki NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Àwọn ìdìpò̀ náà gbọ́dọ̀ wà ní ìwọ̀ntúnwọ̀nsì.](https://zips.z.cash/zip-0236)

[ZIP 1015: Ìpín owó-ìtìlẹyìn ìdìpọ̀ fún ètò tí kò ṣe tààrà sí àtúntò.](https://zips.z.cash/zip-1015)

[ZIP 2001: Àwọn Ìṣàn Owó-ìpamọ́ tí a fi ààbò ṣe](https://zips.z.cash/zip-2001)

[Àtúnṣe sípín 6 (NU6) ti Nẹtiwọọki:](https://z.cash/upgrade/nu6/)

### Ẹ tún wo:

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Ìpèsè fún Àjọṣe](../start-here/development-fund)

[Ìṣèlú owó Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Kí ni ZEC àti Zcash?](../start-here/what-is-zec-and-zcash)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [NU5](../zcash-tech/nu5) · Àtúnṣe: [NU6.1](../zcash-tech/nu6-1)
