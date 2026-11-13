<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom de dzi le Zcash mainnet dzi le gaɖoɖowo ƒuƒoƒe 653,600 (December 11, 2019 UTC).

Nu si nànyae: Ale si Blossom wɔe be Zcash gaɖoɖowo ƒuƒoƒe va le kabakaba teƒe ɖe eve, esi wòmetɔ asi le ZEC si network la wɔna le ɣeyiɣi me la dzi o.

Blossom nye Zcash [mɔ̃ ƒe sewo trɔtrɔ network upgrade](../start-here/network-upgrades). [ZIP 206](https://zips.z.cash/zip-0206) wɔe. Eye gbegbɔgblɔ ɖi [consensus] ƒe tɔtrɔ vevi aɖe si le eŋu la woɖe fia le [ZIP 208](https://zips.z.cash/zip-0208) me. Blossom nye nu ƒe dziyiyi [scaling] ƒe mɔ̃ ƒe sewo trɔtrɔ: Ewɔ be ɣeyiɣi si woɖo daɖi be gaɖoɖowo ƒuƒoƒe aɖe kple si kplɔe ɖo la nɔa me tso sekondi 150 yi sekondi 75, ale be gaɖoɖowo ƒuƒoƒewo vana le kabakaba teƒe ɖe eve. Electric Coin Company kplɔ dɔ la eye wògblɔ Blossom.

Nu ka ta esia le vevie. Ne nèdo ZEC ɖa la, nèle network la ƒe kpekpeɖeŋu lalam be wòakafu le gaɖoɖowo ƒuƒoƒe aɖe me. Ne gaɖoɖowo ƒuƒoƒewo mena va enumake o la, nàlala ɣeyiɣi didi. Tsã ɖe Blossom gɔme la, woɖo gaɖoɖowo ƒuƒoƒe yeye aɖe be wòava le sekondi 150 siaa me. Blossom tsɔ dzodzo sia va afã, yi sekondi 75, ale be kpekpeɖeŋuwo vana kaba eye ɖoɖonu [chain] la ate ŋu atsɔ gaɖoɖowo geɖe akeke le ɣeyiɣi ma ke me. Ewɔ esia esi wòmedze ZEC geɖe o alo wòmetɔ asi le fetu ƒe afãmama [halving] si woɖo ɣeyiɣi na le etsɔme la dzi o.

## TL;DR (Kpuie ko)

- Blossom nye Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ [network upgrade] etɔ̃lia, si dze dɔwɔwɔ gɔme le mainnet ƒe gaɖoɖowo ƒuƒoƒe [block] 653,600 dzi (December 11, 2019 UTC). ZIP 206 ye wotsɔ ɖo eŋu, eye eƒe tɔtrɔ vevi la le ZIP 208 me.
- Eɖe gaɖoɖowo ƒuƒoƒe ƒe dzodzo si woɖo daɖi dzi kpɔtɔ tso sekondi 150 yi sekondi 75. Gaɖoɖowo ƒuƒoƒewo vana zi eve wu tsã, eyata gaɖoɖo [transaction] ƒe kpeɖodzi gbãtɔwo vana kaba, eye gaɖoɖo ʋɛ siwo network la wɔna le ɣeyiɣi aɖe me la dzi ɖe edzi kabakaba zi eve.
- Be ZEC ƒe ɖeɖe ɖe go nayi edzi le ɖoɖo nu la, ema fetu si wotsɔna naa le gaɖoɖowo ƒuƒoƒe ɖesiaɖe ta la ƒe afã, eye wòdzi ɣeyiɣi si dzi fetu ƒe afãmama [halving] dzɔna ɖo la ɖe edzi zi eve, tso gaɖoɖowo ƒuƒoƒe 840,000 yi 1,680,000.
- ZEC si wowɔna le ɣeyiɣi ɖesiaɖe me ƒe agbɔsɔsɔ blibo kple ɣeyiɣi ŋutɔŋutɔ si dzi fetu ƒe afãmama siwo gbɔna la adzɔ la metrɔ o.
- Enye tɔtrɔ si le be ame sia ame nawɔ eye wòka akpa eveawo siaa: ele be ɣaɣla dzesi ŋɔŋlɔ [node] ɖesiaɖe natrɔ eɖokui be wòanɔ ɖoɖonu [chain] la dzi.

## Kpɔɖeŋu si wòakpɔ kple ŋku

Blossom le abe bus mɔ̃ si le eƒe dzodzowo dzim ɖe eve ene. Fifia bus vana le sekɛnd 75 ɖesiaɖe me le esi teƒe be wòava le sekɛnd 150 ɖesiaɖe me, eya ta àlala ɣeyiɣi ƒe afã ko (kpeɖodzi siwo vana kaba [faster confirmations]), eye mɔ̃ la tsɔa mɔzɔlawo ɖe eve (nu siwo wòtsɔna le ɣeyiɣi aɖe me [throughput]). Be kulawo ƒe fetu katã nanɔ ale ke, woma kula ɖesiaɖe ƒe fetu le mɔzɔzɔ ɖeka ɖesiaɖe ta ɖe afã: wozãa ga ma ke na fetu katã, gake woxea fe la le mɔzɔzɔ siwo sɔ gbɔ ɖe eve me.

## Gaɖoɖowo ƒuƒoƒewo si vana kaba

Blossom ƒe tɔtrɔ vevi la bɔe. Zcash ƒe gaɖoɖowo ƒuƒoƒe ƒe dzodzo si woɖo daɖi, si nye ɣeyiɣi si network la di be wòanɔ gaɖoɖowo ƒuƒoƒe aɖe kple si kplɔe ɖo dome la, tso sekondi 150 yi sekondi 75 ([ZIP 208](https://zips.z.cash/zip-0208)). Woɖoa gaɖoɖowo ƒuƒoƒewo to dɔwɔwɔ ƒe ɖaseɖigbalɛ [proof] me, eyata vovo le ɣeyiɣi si wònɔa wo dome ŋutɔ me, gake fifia network la di gaɖoɖowo ƒuƒoƒe aɖe le sekondi 75 siaa me le sekondi 150 ƒe teƒe.

Nu eve do tso ema me:

1. Gaɖoɖowo ƒuƒoƒewo vana le kabakaba teƒe ɖe eve, ale be ɖoɖonu la ate ŋu atsɔ gaɖoɖowo geɖe kple ɣeyiɣi ƒe akpa siaa.
2. Wò gaɖoɖo ƒe kpekpeɖeŋu gbãtɔ ava kaba, elabena màlala ɣeyiɣi didi na gaɖoɖowo ƒuƒoƒe si kplɔe ɖo la o.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Dzadzra gaƒoƒo ɖe te

Gaɖoɖowo ƒuƒoƒe si vana kaba la do biabia aɖe ɖa. Ne Zcash wɔ gaɖoɖowo ƒuƒoƒe geɖe teƒe ɖe eve eye gaɖoɖowo ƒuƒoƒe siaa nɔ fetu ma ke xɔm la, network la awɔ ZEC le kabakaba teƒe ɖe eve. Blossom ƒo nuvɔ̃ ma dzi. Ewɔ be fetu si woana le gaɖoɖowo ƒuƒoƒe siaa me la yi afã, eye wòwɔ be gaɖoɖowo ƒuƒoƒe-fetu ƒe fetu ƒe afãmama ƒe ɣeyiɣi tso gaɖoɖowo ƒuƒoƒe 840,000 yi 1,680,000 ([ZIP 208](https://zips.z.cash/zip-0208)). Gaɖoɖowo ƒuƒoƒe geɖe teƒe ɖe eve, siwo katã xɔa fetu afã, hea ZEC ƒe lolome ma ke le ɣeyiɣi ƒe akpa siaa. Gaƒoƒo blibo ƒe ɖoɖo kple fetu ƒe afãmamawo ƒe ɣeyiɣi le ɣeyiɣi ŋutɔ me metrɔ o.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Mɔ̃ ƒe sewo trɔtrɔ si wòle be woawɔ

Blossom nye gbegbɔgblɔ ɖi ƒe tɔtrɔ si me xɔlɔ aɖeke mele o, si fia be ɣaɣla dzesi ŋɔŋlɔ [node] siaa nɔa be yeawɔ mɔ̃ ƒe sewo trɔtrɔ be yeakplɔ ɖoɖonu la dzi ([ZIP 206](https://zips.z.cash/zip-0206)). Menye tiatia aɖe na ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔla si di be yeanɔ sync kple network la o. Blossom wɔ dɔ le mainnet ƒe gaɖoɖowo ƒuƒoƒe 653,600 dzi eye eƒe gbegbɔgblɔ ɖi ƒe branch id tɔxɛ le esi, si nye dzesi si na ɣaɣla dzesi ŋɔŋlɔwo kple gaɖoɖowo nya be wonɔ Blossom ƒe sewo dzi. Mɔ̃ ƒe sewo trɔtrɔ la wɔ dɔ kple Zcash ƒe network upgrade ƒe mɔ si wonana zi sia zi ([ZIP 200](https://zips.z.cash/zip-0200)).

## Teƒe si Blossom nɔ

Blossom nye Zcash ƒe network upgrade etɔ̃. Eva le Overwinter kple Sapling megbe, eye eva do ŋgɔ na Heartwood kple Canopy. To vovo na Sapling, si trɔ Zcash ƒe ɣaɣla cryptography, Blossom tsɔ ɖe nu ƒe dziyiyi kple kabakaba dzi. Eƒe dɔ vevitɔ nye gaɖoɖowo ƒuƒoƒe ƒe ɣeyiɣi, menye ɣaɣla [privacy] ƒe nuŋlɔɖi yeye o.

## Vodada Siwo Bɔ

- **Susu be gaɖoɖowo ƒuƒoƒe siwo vana kabakaba fia ZEC geɖe.** Ne woma fetu si wòxɔna ɖe gaɖoɖowo ƒuƒoƒe ɖeka ta ɖe afã eye wotsɔ gaɖoɖowo ƒuƒoƒewo ƒe vava ƒe kabakaba ɖo eve teƒe la, ga yeye siwo wodena dɔa me le ɣeyiɣi ɖeka me nɔa ŋutɔ abe alesi wònɔ ene.
- **Susu be fetu ƒe afãmamawo dzɔna kaba le ɣeyiɣi ŋutɔŋutɔ me.** Gaɖoɖowo ƒuƒoƒe siwo nɔa fetu ƒe afãmama ɖeka kple evelia dome dzi ɖe edzi tso 840,000 dzi va ɖo 1,680,000, eyata fetu ƒe afãmamawo ƒe ŋkekewo le ɣeyiɣi ŋutɔŋutɔ me metrɔ o.
- **Xlẽ "sekondi 75" abe ɖeɖefia ene.** Enye dzodzro si woɖo daɖi na dɔwɔwɔ ƒe ɖaseɖigbalɛ (proof-of-work); ɣeyiɣi si nɔa gaɖoɖowo ƒuƒoƒewo dome ŋutɔ trɔna le eŋu.
- **Bu Blossom abe ɣaɣla ƒe ŋgɔyiyi ene.** Eƒe dɔe nye gaɖoɖowo ƒuƒoƒewo ƒe ɣeyiɣi kple nu ƒe dziyiyi (scaling) — mesɔ kple Sapling o, metrɔ cryptography (nuŋɔŋlɔ ɣaɣla ƒe aɖaŋu) aɖeke o.
- **Susu be ɣaɣla dzesi ŋɔŋlɔ (node) ƒe dɔwɔlawo ate ŋu agbe eyi.** Blossom nye gbegbɔgblɔ ɖi (consensus) ƒe tɔtrɔ si ka akpa eveawo siaa; ɣaɣla dzesi ŋɔŋlɔ si womeɖɔ ɖo o la ʋu ɖe aga tso network la ŋu.

## Nyagblɔwo ƒe gɔme

| Nyagblɔ | Gɔme bɔbɔe le English me |
|---|---|
| Block target spacing | Ɣeyiɣi si network la di be wòanɔ gaɖoɖowo ƒuƒoƒe aɖe kple si kplɔe ɖo dome |
| Block reward | ZEC yeye si wowɔ eye wona le gaɖoɖowo ƒuƒoƒe siaa ƒe nukuku [mining] me |
| Halving interval | Gaɖoɖowo ƒuƒoƒe nenie woatsɔ ato fetu ƒe afãmama siaa ƒe gaɖoɖowo ƒuƒoƒe-fetu dome |
| Consensus branch id | Dzesi si fia network ƒe sewo ƒe ƒomeke si ɣaɣla dzesi ŋɔŋlɔ alo gaɖoɖo aɖe le kplɔm |
| Bilateral consensus change | Se ƒe tɔtrɔ si ɣaɣla dzesi ŋɔŋlɔ siaa nɔa be yeawɔ be yeanɔ network la dzi |
| Network upgrade (NU) | Tɔtrɔ si wowɔ ɖekawɔwɔ me le Zcash ƒe gbegbɔgblɔ ɖi ƒe sewo me, si wɔa dɔ le gaɖoɖowo ƒuƒoƒe ƒe teƒe si woɖo daɖi dzi |

## Biabia si woɖoa zi geɖe

Blossom trɔ ale si ZEC le alo ɣeyiɣi si fetu ƒe afãmamawo wɔa dɔ laa? Ao. Wotsɔ gaɖoɖowo ƒuƒoƒe siaa ƒe fetu wɔ afã eye wotsɔ fetu ƒe afãmama ƒe ɣeyiɣi wɔ eve le ɣeyiɣi ma ke me, ale be ZEC si wowɔa le ɣeyiɣi ƒe akpa siaa me kple fetu ƒe afãmamawo ƒe ɣeyiɣi nɔa ale ke.

Blossom trɔ nye ZEC alo nye ɣaɣlaa? Ao. Blossom trɔ gaɖoɖowo ƒuƒoƒe ƒe ɣeyiɣi kple fetu ƒe akɔnta. Metsɔ asi le wò balancewo alo wò gaɖoɖowo ɣaɣla o.

Sekondi 75 fia nu kae ŋutɔ? Nye dzodzro si woɖo daɖi, menye ɖeɖefia o. Woɖoa gaɖoɖowo ƒuƒoƒewo to dɔwɔwɔ ƒe ɖaseɖigbalɛ me, eyata vovo le ɣeyiɣi si wònɔa gaɖoɖowo ƒuƒoƒewo dome ŋutɔ me. Network la di be gaɖoɖowo ƒuƒoƒe aɖe nava le sekondi 75 siaa me le sekondi 150 ƒe teƒe.

Ele be mawɔ nane esi Blossom wɔ dɔa? Ne nèwɔ ɣaɣla dzesi ŋɔŋlɔ blibo [full node] la, ele be nàwɔ eƒe mɔ̃ ƒe sewo trɔtrɔ, elabena Blossom nye nu si wòle be woawɔ. Ne nèzã gakotoku [wallet] la, ele be nàzã version si de sewo yeye la.

Nu ka ta wotsɔ gaɖoɖowo ƒuƒoƒe-fetu la wɔ afãe? Elabena fifia gaɖoɖowo ƒuƒoƒewo vana le kabakaba teƒe ɖe eve. Fetu si wotsɔ wɔ afã le gaɖoɖowo ƒuƒoƒe siaa me la na network la megawɔ ZEC le kabakaba teƒe ɖe eve o.

Ɣeka Blossom wɔ dɔe? Le mainnet ƒe gaɖoɖowo ƒuƒoƒe 653,600 dzi, le December 11, 2019 UTC.

## Kpɔe be nèse gɔme

Blossom wɔ be Zcash ƒe gaɖoɖowo ƒuƒoƒewo vana le kabakaba teƒe ɖe eve. Nu ka ta esia mewɔ be wowɔ ZEC yeye le kabakaba teƒe ɖe eve o?

<details>
<summary>Ŋuɖoɖo</summary>

Elabena Blossom hã tsɔ fetu si wona le gaɖoɖowo ƒuƒoƒe siaa me wɔ afã eye wòtsɔ fetu ƒe afãmama ƒe ɣeyiɣi wɔ eve tso gaɖoɖowo ƒuƒoƒe 840,000 yi 1,680,000. Gaɖoɖowo ƒuƒoƒe geɖe teƒe ɖe eve, siwo katã xɔa fetu afã, hea ZEC ƒe lolome ma ke le ɣeyiɣi ƒe akpa siaa me, ale be emission schedule si woɖe le ɣeyiɣi ŋutɔ me metrɔ o.
</details>

### Nuŋɔɖiwo

[ZIP 208: Gaɖoɖowo ƒuƒoƒe ƒe dzodzo si woɖo daɖi kpuie](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom Network Upgrade ƒe dɔwɔwɔ](https://zips.z.cash/zip-0206)

[Blossom Network Upgrade](https://z.cash/upgrade/blossom/)

[Blossom Mɔ̃ ƒe sewo trɔtrɔ na kabakaba, nu ƒe dziyiyi, kple ŋusẽ nyrɔ̃ (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Kpɔ hã

[Zcash Network Upgrades](../start-here/network-upgrades)

[Zcash Gaƒoƒo ƒe politika](../start-here/zcash-monetary-policy)

[Nu ka nye ZEC eye nu ka ta Zcash](../start-here/what-is-zec-and-zcash)

[Ɣaɣla dzesi ŋɔŋlɔ blibowo](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## Axa Siwo Do Ƒome Kplii

- [Sapling](./Sapling.md) — mɔ̃ ƒe sewo trɔtrɔ si do ŋgɔ (gbeɖoɖo ɣaɣla ƒe aɖaŋu [cryptography], menye ɣeyiɣi o)
- [Heartwood](./Heartwood.md) — mɔ̃ ƒe sewo trɔtrɔ si kplɔe ɖo le ƒuƒoƒo sia me
- [Ɣaɣla dzesi ŋɔŋlɔ bliboawo](./Full_Nodes.md) — nusi ɣaɣla dzesi ŋɔŋlɔ wɔwɔ to mɔ̃ ƒe sewo trɔtrɔ siwo wòle be woawɔ me bia
- [Mɔ̃ ƒe sewo trɔtrɔwo ƒe nuŋlɔɖi](../start-here/network-upgrades) — mɔ̃ ƒe sewo trɔtrɔwo ƒe ɣeyiɣi ƒe ɖoɖo blibo

Series: [Network Upgrades ƒe index](../start-here/network-upgrades) · Si do ŋgɔ: [Sapling](../zcash-tech/sapling) · Si kplɔe ɖo: [Heartwood](../zcash-tech/heartwood)
