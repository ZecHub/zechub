<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mɔ̃ Ƒe Agbeɖoɖo Ɖoɖa (NSM)

> NSM la le Zcash gbegbɔgblɔ ɖi me tso esime [NU7](./NU7.md) wòwɔ dɔ le Mainnet gaɖoɖowo ƒuƒoƒe 3,543,405 dzi le November 6, 2026. Wole adzɔwo ɖe te fifia; nukulaawo ƒe gaɖoɖo gɔme azɔ tso gaɖoɖowo ƒuƒoƒe 8,939,664 dzi (wobu le February 2031 ŋu).

Nu si nàtsɔ ayi: nu si Mɔ̃ Ƒe Agbeɖoɖo Ɖoɖa wɔna, adzɔwo ƒe alafa si wòɖea le gaɖoɖowo ƒuƒe ɖe sia ɖe me, afi si ZEC yi, ɣe ka me kple ale si wògba ava abe gaɖoɖowo ƒuƒe fetu ene, eye nu ka ta ga miliɔn 21 ƒe tsɔtsɔ meɖo asi o, eye fetu ƒe afãmama ɖoɖa meɖo asi o.

Mɔ̃ Ƒe Agbeɖoɖo Ɖoɖa (NSM) nye gbegbɔgblɔ ɖi sewo ƒe ɖoɖa si tsɔ ZEC aɖewo ɖe mɔ dzi, eye wònae nukulaawo enumake le ɣeyiɣi didi aɖe megbe, le ƒe geɖewo me. NU7 ɖo eƒe akpa evea ɖe dɔ me: [ZIP 235](https://zips.z.cash/zip-0235), si ɖea transaction adzɔwo ƒe alafa 60 le gaɖoɖowo ƒuƒe ɖe sia ɖe me le mɔ dzi, kple [ZIP 237](https://zips.z.cash/zip-0237), si gaɖoɖo ɖe ZEC si wòɖe ɖe mɔ dzi la ɖo normal gaɖoɖowo ƒuƒe subsidy la dzi le dzidzenu bɔbɔe me. Wotsɔ wo ɖe dɔ me to [ZIP 259](https://zips.z.cash/zip-0259) dzi.

Nu ka ta esia hia. Zcash tsɔ ZEC yeye na eƒe dedienɔnɔ le gaɖoɖowo ƒuƒe ɖe sia ɖe me, eye subsidy sia fɔa afã le ƒe afã ɖe sia ɖe me. Ne wòzu sue la, nukulaawo ate ŋu anɔ agbe ŋutɔ to adzɔwo me. NSM nye gɔmeɖoanyi gbãtɔ na esime mɔ sia va: etsoa adzɔwo ƒe akpa aɖe egbe, eye wòna wo nukula siwo anɔ eme le etsɔme, eye wòmeɖea supply cap ɖe dzi o, eye wòmetrɔa fetu ƒe afãmama ɖoɖa si amewo le ɖoɖi me xoxo o.

## TL;DR

- **Ɖeɖe ɖe mɔ dzi ([ZIP 235](https://zips.z.cash/zip-0235)):** gaɖoɖowo ƒuƒe ɖe sia ɖe me, transaction adzɔwo ƒe alafa 60 (wòtsɔa nu sue wu la ɖe anyi, nukula ƒe nu nyo) le mɔ dzi. Nukula la xɔa alafa 40 si susɔ.
- **NSM Ƒe Nyawo ƒuƒoƒe:** nu si wòtsɔa ɖe mɔ dzi tso ZEC me, eye womegaɖo o. Esi gbegbɔgblɔ ɖi ƒe akpae, menye gaƒuƒoƒo si ame aɖe ate ŋu atsɔ nu aɖe le o.
- **Gɔmeɖoanyi:** le NU7 me la, nyawo ƒuƒoƒe la gɔmeɖo zi **368.58445520 ZEC**, gaɖoɖowo ƒuƒe fetu kple adzɔ si nukula gbãtɔwo gblẽ si womeɖi o, hafi NU6.
- **Gaɖoɖo ([ZIP 237](https://zips.z.cash/zip-0237)):** tso gaɖoɖowo ƒuƒe 8,939,664 dzi la, gaɖoɖowo ƒuƒe ɖe sia ɖe tsɔa nyawo ƒe akpa si ɖi ɖo (0.00001375%) kpe gaɖoɖowo ƒuƒe subsidy la ŋu. Esia na nyawo ƒe afã le fetu ƒe afãmama ƒe ɣeyiɣi ɖe sia ɖe me.
- **Nu siwo le ɖiɖim:** fetu ƒe afãmama ɖoɖa, eye ga miliɔn 21 ZEC ƒe cap abe agba ƒe dziɖuɖu ene. Ne nyawo ƒuƒoƒe la zu nuléke, gaɖoɖo gɔme le ɖoɖa xoxo me pɛ.

## Nɔnɔmetata

Bua nu si tsɔa ga de dzidze si le nuɖuɖu fe ƒe nutome ŋu la ŋu. Esi wotsɔ gaɖoɖowo ƒuƒe ɖe sia ɖe wu la, fetu (adzɔ) ƒe alafa 60 yi dzidze la me, eye menye nukula ƒe akɔta me o. Ame aɖeke mate ŋu atsɔ asi ade dzidze la me aɖe ga le o. Tso 2031 me la, dzidze la me nudzɔdzɔ ƒe akpa si ɖi ɖo kpe gaɖoɖowo ƒuƒe fetu ɖe sia ɖe ŋu, ale dzidze la ƒe ga nɔa eme bɔbɔe: le ƒe afã ɖe sia ɖe me nyawo ƒe afã, ɖoɖa ɖeka kple fetu ƒe afãmama.

## Ale si ɖeɖe ɖe mɔ dzi zɔna (ZIP 235)

- Se la le gaɖoɖowo ƒuƒe ɖe sia ɖe ŋu, menye transaction ɖe sia ɖe ŋu o. Gaɖoɖowo ƒuƒe si me adzɔwo ƒe agbɔsɔsɔe nye `F` (le zatoshi me) la, nu si wòɖea ɖe mɔ dzi nye `floor(6 × F / 10)`, eye nukula la ate ŋu axɔ `F` si susɔ to nu si wòɖe ɖe mɔ dzi la ɖeɖe me.
- Wotsɔa nu si sue wu la ɖe anyi zi ɖeka na gaɖoɖowo ƒuƒe blibo, eye wòna nukula la nu nyo ɣesiaɣi. Nu si sue wu la tsɔtsɔ ɖe transaction ɖe sia ɖe ŋu awɔe be 60% blibo la ƒe akpa sue wu leɖe ɖe mɔ dzi (zatoshi 1 ƒe adzɔ eve ɖe sia ɖe ana 0).
- Mɔkpɔkpɔ: gaɖoɖowo ƒuƒe si me eƒe transactions de zatoshi 50,000 (0.0005 ZEC) adzɔ la ɖea zatoshi 30,000 ɖe mɔ dzi, eye wòna nukula la zatoshi 20,000. Gaɖoɖowo ƒuƒe si me adzɔwo nye zatoshi 15 ɖea 9 ɖe mɔ dzi, eye wònae 6 nukula la.
- Mehia transaction field aɖeke o. Ɣaɣla dzesi ŋɔŋlɔ ɖe sia ɖe bua nu sia tso adzɔ si wòle kpɔm xoxo la me, eye [ZIP 236](https://zips.z.cash/zip-0236) wɔna be coinbase transaction la xɔa nu si nukula la ƒe esi le ko pɛ, ale nukula mate ŋu aɖe sue wu o alo axɔ nu wu esi wòle o.
- Kɔkɔe: ZIP 235 ƒe didiɖo, tso NU7 ŋgɔ ƒe traffic me la, adzɔ ƒe ZEC 370 le ƒe ɖeka me, ale abe ZEC 222 ene le ƒe ɖeka me si wotsɔna ɖe mɔ dzi. Adzɔwo sɔ gbɔ sue wu gaɖoɖowo ƒuƒe subsidy fifia, esia ta nuŋlɔlawo bu be nu xoxo aɖeke mele nukulaawo ŋu o.

## Ale si gaɖoɖo zɔna (ZIP 237)

- **Nyawo ƒuƒoƒe.** `NSMValueBalance` gɔme le 368.58445520 ZEC (zatoshi 36,858,445,520) le NU7 ƒe wòwɔ dɔ gɔme. Gaɖoɖo ɖe sia ɖe kpe nu si ZIP 235 ɖe ɖe mɔ dzi la ŋu, eye wòɖea nu si wogaɖo la ɖe eme. Gaɖoɖo si ana nyawo ƒuƒoƒe la zu nu si le te la menye agbe o.
- **Afi si gɔmeɖoanyi la tso.** Hafi NU6, coinbase transaction ate ŋu axɔ gaɖoɖowo ƒuƒe fetu kple adzɔ ƒe blibo la ƒe akpa sue wu. Gaɖoɖowo ƒuƒe gbãtɔ 2,726,400 me la, nukulaawo gblẽ 368.58445520 ZEC womeɖi o: fetu si wotsɔ ɖoɖi na gaɖoɖowo ƒuƒe le gaɖoɖowo ƒuƒe ƒe dzidzime sia dzi nye 15,750,000 ZEC, eye ga si wotsɔ ɖe dɔ me nye 15,749,631.41554480 ZEC. ZIP 237 tsɔa gaɖoɖo ma ɖo NSM me, ale wònae le eme eye womegblẽe o.
- **Gaɖoɖo mele eme va se ɖe gaɖoɖowo ƒuƒe 8,939,664 o.** Le NU7 kple teƒe ma dome la, nyawo ƒuƒoƒe la kpea ɖe edzi ko.
- **Formula la.** Tso gaɖoɖowo ƒuƒe 8,939,664 dzi la, gaɖoɖowo ƒuƒe ɖe sia ɖe ƒe subsidy la xɔa `ceiling(0.0000001375 × NSMValueBalance)` kpeɖeŋu, si wòtsɔa nyawo ƒuƒoƒe le gaɖoɖo si do ŋgɔ la megbe bua. Akpa la nye `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, eye post-NU7 fetu ƒe afãmama ƒe gaɖoɖowo ƒuƒe 5,040,000.
- **Nu ka ta akpa sia.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, ale ne womeɖe nu yeye aɖeke ɖe mɔ dzi o la, nyawo ƒe afã la gaɖoa le fetu ƒe afãmama ƒe ɣeyiɣi ɖe sia ɖe me. Esia nye tsiɖoɖo ƒe ɖoɖa si wòwɔa dɔ ko le NSM nyawo ƒuƒoƒe ŋu, eye wòle fetu ƒe afãmama ƒe ɖoɖa si medzro o la dzi.
- **Mɔkpɔkpɔ si wòtsɔ wɔ.** Ne nyawo ƒuƒoƒe la le gɔmeɖoanyi 368.58 ZEC ko ŋu le gaɖoɖowo ƒuƒe 8,939,664 dzi la, gaɖoɖo gbãtɔ la gaɖoa zatoshi 5,069 (abe 0.00005 ZEC ene), abe ZEC 0.175 ene le ŋkeke ɖeka me le gaɖoɖowo ƒuƒe 3,456 ŋu. Adzɔ siwo wòɖe ɖe mɔ dzi va se ɖe ɣeyiɣi ma gbe la ana xexlẽme nyawo.
- **Nu ka ta gaɖoɖowo ƒuƒe 8,939,664.** ZIP 237 tiae to se ɖeka si meɖoa dzesi ɖe nu si wòɖe ɖe mɔ dzi gɔme o dzi: gaɖoɖo gbãtɔ si kplɔ fetu ƒe afãmama etɔ̃ (gaɖoɖowo ƒuƒe 6,132,390, wòbu le November 2028 ŋu) megbe, esi NSM akpa si wòtsɔ wò nu ƒe ZEC siwo womeɖo ɖoɖi na gaɖoɖo o ŋu ana fetu si sue wu gaɖoɖowo ƒuƒe subsidy (0.26041666 ZEC le ɣeyiɣi ma me). NU7 gaɖoɖo-nutɔ kple dukɔ ƒe pollwo mekpɔ ame ƒe majority ɖeka le ɣe si gaɖoɖo nàgɔme me o, esia ta ZIP 259 zãa crossover sia.

## Nu siwo metrɔ o

- **Fetu ƒe afãmama ɖoɖa.** ZIP 237 lé fetu ƒe afãmama ƒe ƒe afã ƒe ɖoɖa me. Mɔkpɔkpɔ si wogbe, [ZIP 234](https://zips.z.cash/zip-0234), atsrɔ̃ wo eye atsɔ gaɖoɖo ƒe ɖoɖa dzidzime bɔbɔe ɖe wo teƒe; August kple September 2026 ƒe NU7 pollwo bia be woalé fetu ƒe afãmama ŋu alo wòawɔ gaɖoɖo dzidzime bɔbɔe, eye NU7 ɖo fetu ƒe afãmama ŋu ɖeɖoɖa la ɖe dɔ me.
- **Supply cap.** Issued Supply kpe NSM Ƒe Nyawo ƒuƒoƒe ŋu la le dzi ɖe gaɖoɖowo ƒuƒe fetu si wotsɔ ɖoɖi la pɛ me, ale gaɖoɖo mate ŋu adze cap la dzi o. Le nyateƒe me cap la ɖe sue aɖe: ZIP 218 ƒe nu si sue wu tsɔtsɔ ɖe post-NU7 subsidy ŋu la ɖe gaɖoɖo ƒe blibo ɖe sue abe ZEC 0.50 ene, eye NSM megaɖoa nu sia ɖo o.
- **Nu si ameɖe tsɔ ɖe mɔ dzi le eƒe ɖoɖe nu.** [ZIP 233](https://zips.z.cash/zip-0233), si ana be ame sia ame ate ŋu aɖo ZEC ɖe NSM me to transaction field si wòŋlɔ ɖe eme ŋu, womeɖo ɖe dɔ me le NU7 o. Egbe adzɔwo ko nye nu si wotsɔna ɖe mɔ dzi. ZIP 237 ɖe ZIP bubuwo ŋu be woakpe nu bubu aɖewo ɖe te le etsɔme.
- **ɣaɣla.** Wotsɔa nyawo ƒuƒoƒe kple subsidy kpeɖeŋu la tso xexlẽme siwo le ɖe amewo katã ƒe asi me xoxo me, esia ta NSM mefia transaction yeye aɖeke o.

## Nu siwo ame geɖewo bua da

- **"Wotsɔ adzɔwo ƒe 60% tsɔ na nu."** Menye nu si wòle ɖe mɔ dzi ɣesiaɣi o. Le nu si wòle ɖe mɔ dzi (Ethereum ƒe EIP-1559 nye ɖoɖa si amewo tsɔa wɔ nɔnɔmetata la) bubu ene o, ZEC si wotsɔ ɖe mɔ dzi la ŋlɔa ɖi, eye wogaɖoe nukula siwo ava la.
- **"NSM tsɔa ZEC yeye wòwɔna."** Ao. Egaɖoa nu si wotsɔ ɖe mɔ dzi alo si womeɖi o la ɖe mɔ, ale gaɖoɖo ƒe blibo la nɔa cap si le esi me.
- **"Gaɖoɖo gɔme xoxo."** Hã o. Va se ɖe gaɖoɖowo ƒuƒe 8,939,664 la, nyawo ƒuƒoƒe la kpea ɖe edzi ko.
- **"NSM nye gaƒuƒoƒo si ame aɖe ɖua dzi."** Ao. Esi nye xexlẽme le gbegbɔgblɔ ɖi ƒe akpae, eye ga tsoa eme ko to gaɖoɖowo ƒuƒe subsidy ƒe formula dzi.
- **"Fetu ƒe afãmama megali o."** Ao. Esi nye ZIP 234 ƒe ɖoɖa, si NU7 meɖo ɖe dɔ me o.

## Gɔmeɖeɖe ƒe glɔsari

| Term | Gɔmeɖeɖe bɔbɔe |
|---|---|
| Network Sustainability Mechanism (NSM) | Gbegbeɖi se siwo ɖea ZEC ɖe mɔ dzi, eye wògaɖoa wo nukulaawo enumake le etsɔme |
| NSM Value Balance | Nyawo ƒe xexlẽme si wòle amewo katã ƒe asi me, si wotsɔ ZEC ɖe mɔ dzi (alo si womeɖi o) eye womegaɖo o |
| Removal from circulation | ZEC ɖeɖe tso ga si wotsɔ ɖe dɔ me me, eye wòtsɔe ɖo NSM Ƒe Nyawo ƒuƒoƒe me; tso NU7 la, esia nye gaɖoɖowo ƒuƒe adzɔ ƒe 60% |
| Reissuance | Ga si wòle ZEC NSM Ƒe Nyawo ƒuƒoƒe me la trɔ gɔme, eye wòtsɔe ɖe gaɖoɖowo ƒuƒe subsidy kpeɖeŋu abe gaɖoɖowo ƒuƒe 8,939,664 dzi |
| Issued Supply | ZEC katã siwo le ɖoɖonu la ƒe ga ƒuƒoƒewo me; NSM Ƒe Nyawo ƒuƒoƒe mele eme o |
| Block subsidy | ZEC yeye si wòwɔna le gaɖoɖowo ƒuƒe ɖe sia ɖe me, eye wòmae nukula kple development-fund ƒe mɔwo dome |
| Halving interval | Gaɖoɖowo ƒe xexlẽme si le fetu ƒe afãmama eve dome: 5,040,000 tso NU7 (abe ƒe 4 ene le gaɖoɖowo ƒuƒe 25-second) |

## FAQ

**Gaɖoɖo ɖeka me NSM ƒe ga xɔtɔe nye nenie?** Gɔmeɖoanyi 368.58445520 ZEC kpe gaɖoɖowo ƒuƒe 3,543,405 megbe ƒe adzɔwo katã ƒe 60% ŋu. Esi nye gbegbɔgblɔ ɖi ƒe akpa si ɣaɣla dzesi ŋɔŋlɔ blibo ɖe sia ɖe léna ɖi.

**Amekae xɔa gaɖoɖo ZEC la?** Wotsɔe kpea gaɖoɖowo ƒuƒe subsidy la ŋu, ale womae le ɖoɖa ma ke nu: development-fund ƒe mɔwo xɔa wo ƒe percentage si wotsɔ ɖo ɖi tso subsidy blibo la me (si wotsɔ ɖoɖi kpe esi wogaɖo ŋu), eye nukula la xɔa esi susɔ.

**Gaɖoɖo gɔme ɣe ka me?** Le Mainnet gaɖoɖowo ƒuƒe 8,939,664 dzi, wòbu le February 2031 ŋu ne gaɖoɖowo léa 25-second ƒe average. Le Testnet la, teƒe ƒe xexlẽme la kplɔa ɖoɖa ma tso Testnet ƒe NU7 wòwɔ dɔ ƒe teƒe ƒe xexlẽme dzi.

**Adzɔwo anɔ zi dzi le NSM ta?** Ao. Etrɔa afi si adzɔwo yi, menye ga si transaction la fua la ƒe agbɔsɔsɔ o.

**60/40 maɖemaɖe ate ŋu atrɔ?** Future ZIP kple mɔ̃ ƒe sewo trɔtrɔ ko ate ŋu atrɔe. ZIP 235 gblɔ be woate ŋu atrɔ akpa ma le etsɔme ne adzɔwo fɔ ɖe dzi, abe ne adzɔwo wu gaɖoɖowo ƒuƒe subsidy ene.

## Tsɔ wò nunya kpɔ

1. Gaɖoɖowo ƒuƒe ɖeka ƒe transactions fua zatoshi 100,000 adzɔ. Aleke nukula la léna?
2. Afi ka NSM ƒe gɔmeɖoanyi tso?
3. Ne womeɖe nu yeye aɖeke ɖe mɔ dzi o la, NSM nyawo ƒuƒoƒe ƒe akpa abe nenie wogaɖoa le fetu ƒe afãmama ƒe ɣeyiɣi ɖe sia ɖe me?
4. Nu ka ta gaɖoɖo meɖea gaɖoɖo blibo la ɖe ga miliɔn 21 ZEC dzi o?

Nyawo: (1) zatoshi 40,000; wotsɔ 60,000 ɖe mɔ dzi; (2) gaɖoɖowo ƒuƒe fetu kple adzɔ si coinbase transactions gblẽ si womeɖi o hafi NU6, 368.58445520 ZEC; (3) abe afã ene; (4) gaɖoɖo gaɖoa nu si wotsɔ ɖe mɔ dzi alo si womeɖi o la ko, ale ga si wotsɔ ɖe dɔ me kpe NSM nyawo ƒuƒoƒe ŋu la le dzi ɖe subsidy si wotsɔ ɖoɖi la pɛ me le gaɖoɖo ɖe sia ɖe me.

### Nunyaƒe

[ZIP 235: Tsɔ Transaction Adzɔwo Ƒe 60% Ɖe Mɔ Dzi](https://zips.z.cash/zip-0235)

[ZIP 237: Mɔ̃ Ƒe Agbeɖoɖo Ɖoɖa: Gaɖoɖo Ƒe Dzidzime Si Léa Fetu Ƒe Afãmama](https://zips.z.cash/zip-0237)

[ZIP 259: NU7 Mɔ̃ Ƒe Se Yeye La Ɖoɖe Dɔ Me](https://zips.z.cash/zip-0259)

[ZIP 234: Mɔ̃ Ƒe Agbeɖoɖo Ɖoɖa: Gaɖoɖo Ƒe Dzidzime Ɖoɖa (womeɖo ɖe dɔ me o)](https://zips.z.cash/zip-0234)

[ZIP 233: Mɔ̃ Ƒe Agbeɖoɖo Ɖoɖa: Ga Ɖeɖe Tso Mɔ Dzi (womeɖo ɖe dɔ me o)](https://zips.z.cash/zip-0233)

[ZIP 236: Gaɖoɖowo ƒe Xexlẽme Wòle Be Wosɔ ɖe Eŋu](https://zips.z.cash/zip-0236)

## Nyatodo Siwo Le Ɖeka Kpli Esia

| Page | Nu ka ta wòle ɖeka kpli esia |
|---|---|
| [NU7](./NU7.md) | mɔ̃ ƒe se trɔtrɔ si tsɔ NSM ɖe dɔ me |
| [Zcash Mɔ̃ ƒe Gaɖoɖo Ɖoɖa](../start-here/zcash-monetary-policy) | fetu ƒe afãmama ɖoɖa kple supply cap si NSM lé ɖi |
| [Gaɖoɖowo ƒuƒe 25-Second La Ƒe Trɔtrɔ Siwo Woate Ŋu Akpɔ](../research/what-25-second-blocks-actually-change) | nu ka ta subsidy kple fetu ƒe afãmama ƒe ɣeyiɣi trɔ le NU7 |
| [Development Ƒuƒoƒe](../start-here/development-fund) | ale si woma gaɖoɖowo ƒuƒe subsidy la |
| [Gaɖoɖowo](../using-zcash/transactions) | ale si wotsɔa transaction adzɔwo ɖo |

---
