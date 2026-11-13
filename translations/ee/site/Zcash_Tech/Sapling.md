<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling dze agbe le Zcash mainnet dzi le gaɖoɖowo ƒuƒoƒe 419,200 (October 29, 2018, 02:15 UTC).

Nu si nàkpɔe: Sapling wɔ Zcash ƒe fexexe ɣaɣla [private] la zɔ kabakaba eye wò le bɔbɔe be woate ŋu awɔe le telefon alo asikplɔwo dzra mɔ dzi.

Sapling nye Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ [network upgrade] gã evelia, eye wò dze egɔme le Zcash ƒe ƒe evelia ƒe ŋkeke dzi. Enye gbegbɔgblɔ ɖi [consensus] hard fork si wɔ ɣaɣla gaɖoɖowo ƒe wɔwɔ ɖe yeyee. Woɖe ɖoɖoa fia le ZIP 205 me, gaɖoɖo asidede agbalẽ te [signature] se yeyewo le ZIP 243 me, eye wo katã wotu wo ɖe ZIP 200, mɔ̃ ƒe sewo trɔtrɔ ƒe mɔnu la dzi. Nyatakaka bliboa le Zcash Protocol Specification me. Electric Coin Company tu trɔtrɔa eye wò ɖe version gbãtɔ si de dzɔdzɔ na e, zcashd 2.0.0, le August 2018 me. Le ɖoɖonu [chain] dzi, network la kpe ɖe Sapling ƒe sewo ŋu kple eƒe consensus branch id.

Nu si ta esia le vevie. Do ŋgɔ na Sapling, fexexe ɣaɣla bliboa wɔwɔ hia be nàlala minutiwo, esi wò computer la wɔ dɔ sesĩe kple memory gigabytewo be wòatu ɖaseɖigbalɛ [proof] la. Esia zɔ blewu eye wò kɔ sesĩe na ame geɖe, eyata zazãla geɖewo, gatrɔƒewo, kple asiwo de asi le ɣaɣla gaɖoɖowo ŋu o eye woɖe ZEC ɖe ŋkume le afi ma. Sapling tsɔ dɔa wɔ ɖe sekondi vie aɖewo kple memory megabyte 40 ko. Trɔtrɔ ɖeka siae wɔe be ɣaɣla ZEC ƒe zazã nanɔ anyi le gbe sia gbe me, le telefon mamãwo kple asikplɔwo dzra mɔwo dzi.

## TL;DR

- Sapling nye Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ gã evelia, si dze egɔme le gaɖoɖowo ƒuƒoƒe 419,200 (October 29, 2018, 02:15 UTC) — Zcash ƒe ƒe evelia ƒe ŋkeke dzi.
- Ewɔ ɣaɣla gaɖoɖowo ɖe circuit eve si wo wɔ tso ŋutinya ta (Spend kple Output) ŋu, eye wò ɖe Sprout ƒe JoinSplit circuit ɖeka si zɔ blewu la ɖa (ZIP 205, ZIP 243).
- Nuwɔna: ɖaseɖigbalɛ ƒe tutu tso minutiwo kple memory gigabytewo me va ɖe sekondi vie aɖewo kple MB 40 — bɔbɔe na telefonwo kple asikplɔwo dzra mɔwo.
- Nɔnɔme yeye: gaɖoƒe ƒe dzesi [address] vovovowo (fexexe gaɖoƒe ƒe dzesi geɖe siwo ƒe kadodo manɔ anyi tso safui ɖeka me), nukpɔsafuiwo [viewing keys] na nyatakaka kpɔkpɔ ko, kple ɖaseɖigbalɛ tutu ƒe mama tso asidede agbalẽ te wɔwɔ ŋu.
- Eƒe parameterwo tso ame geɖe ƒe ceremony si le akpa eve me (Powers of Tau + Sapling MPC); dedienya le te esi ne ame ɖeka pɛ hã wɔ nyateƒe.

## Nɔnɔmetata ƒe ƒoƒo

Sprout nye ame si tsɔ agbalẽ ɖeka sia ɖeka zɔe tso afi si woŋlɔe va yi dukɔ bliboa me kple asi — egbe wòle ɣaɣla blibo me, gake ezɔ blewu eye eƒe wɔwɔ le kɔ sesĩe. Sapling trɔ ame ma ke zu bisikleti nola si tsɔ akpa bɔbɔe ɖe eƒe nyuma: egale ɣaɣla me hã, gake ezɔ kabakaba na gbe sia gbe ƒe nudzɔdzɔwo. Eye nukpɔsafui yeyeawo le abe ne nèna auditoa kpɔƒe nyuie le ame nola la ƒe agbalẽ me, eye mèna gaƒe safuiwo nɛ o ene.


## Nu si trɔ

Sapling ƒe dzi vevi nye mɔ kabakaba aɖe si wotsɔ tu zero-knowledge ɖaseɖigbalɛ si na ɣaɣla gaɖoɖo nanɔ ɣaɣla me. Sprout ƒe ɖoɖo gbãtɔ la zã proving circuit ɖeka (JoinSplit circuit) si zɔ blewu eye wòɖu memory geɖe. Sapling trɔe kple circuit eve si wo wɔ tso ŋutinya ta, Spend circuit kple Output circuit, si woɖe fia le Zcash Protocol Specification me. Nuwɔna la nye asixɔxɔ gã aɖe le asixɔxɔ me. Le Electric Coin Company nu, woate ŋu atu ɣaɣla gaɖoɖo le sekondi vie aɖewo me kple memory megabyte 40. Do-Sapling Sprout ƒe asigbe la kɔ sesĩe wu, le minutiwo kple memory gigabyte geɖewo ƒe akpa me (Sprout-ƒe nɔŋɔme siawoe nye asigbe ƒe akaka si ame geɖe tsoa dzi).

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## Safui yeyeawo

Sapling hã ɖe ɣaɣla gaɖoƒe ƒe dzesiwo kple safuiwo ƒe ƒome yeye aɖe gɔme. Safui ɖeka ate ŋu aɖe gaɖoƒe ƒe dzesi vovovowo geɖe, siwo nye fexexe gaɖoƒe ƒe dzesi vovovo siwo ŋkume-kpɔla aɖeke mate ŋu akɔ ɖe wo nɔewo ŋu o. Sapling hã kpe ɖe nukpɔsafuiwo ŋu: nukpɔsafui blibo alo incoming viewing key na wò nàma ŋutega be ame aɖe nakpɔ gakotoku ƒe gaɖoɖowo ƒe nyatakakawo, gake mèna mɔ nɛ be wòazã eƒe ga o. Esia nyo na audit, akonta wɔwɔ, alo be nàɖo kpe edzi ko be wo wɔ fexexe aɖe.

Trɔtrɔ si kplɔe ɖo nye be Sapling ma dɔ si nye ɖaseɖigbalɛ tutu la tso dɔ si nye gaɖoɖo asidede agbalẽ te wɔwɔ la ŋu. Mɔ̃ si tu zero-knowledge ɖaseɖigbalɛ la mele be wòanye mɔ̃ si le gazazãsafui [spending key] la ɖo o. Mama siae na asikplɔwo dzra mɔ ŋutɔe mate ŋu aɖe wò gazazãsafui ɖe eŋu, esi mɔ̃ bubu wɔ ɖaseɖigbalɛ tutu ƒe dɔ sesĩe la.

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Mɔ̃ ƒe ɖoɖo xexlẽnuwo

Sapling ƒe circuitwo le ɖoɖo xexlẽnu si woɖe fia na ame katã ŋu, si wòle be woawɔe kple dzidzɔ. Ne ame ɖeka koe wɔe eye wòtsɔ nyatakaka ɣaɣla si susɔ la ("toxic waste") ɖo, ame ma ate ŋu atu ɖaseɖigbalɛ mawo. Be woavo esia, parameterwo tso ceremony ame geɖe ƒe akpa eve. Akpa 1, si woyɔna be Powers of Tau, menye circuit ɖeka ƒe tɔ o, esia fia be wometsɔe ɖe Sapling ƒe circuit tutɔwo ŋu o. Akpa 2, Sapling MPC, nye circuit tutɔ ƒe tɔ. Akpa ɖeka sia ɖeka le dedie esi ne ame ɖeka ko wɔ nyateƒe eye wòtsrɔ̃ eƒe toxic waste, eyata ceremony la gbã ko ne ame sia ame siwo nɔ eme la katã wɔ ɖeka.

## Ale si wòdze egɔme

Sapling kplɔ Overwinter ɖo, June 2018 ƒe trɔtrɔ si dzra network la ƒe mɔ̃ ƒe sewo trɔtrɔ ƒe mɔnu ɖo. Electric Coin Company ɖo mainnet ƒe dede egɔme ƒe teƒe le zcashd 2.0.0 me, si woɖe gɔme le August 2018 me, eye network la va trɔ yi Sapling ƒe sewo dzi esi woɖu gaɖoɖowo ƒuƒoƒe 419,200. Le ɖoɖonu dzi, wode dzesi ɣeyiɣi ma kple Sapling consensus branch id.

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## Vodada siwo dzɔna zi geɖe

- **Miebu be ɣaɣla fexexewo ŋu zãna ɣesiaɣi.** Do ŋgɔ na Sapling, ɖaseɖigbalɛ tutu xɔ minutiwo kple memory gigabytewo, eyata zazãla geɖewo, gatrɔƒewo, kple asiwo de asi le ɣaɣla gaɖoɖowo ŋu bliboe.
- **Miyɔ Sapling ƒe gaɖoƒe ƒe dzesiwo be wonye Sprout tɔwo.** Sapling ɖe eya ŋutɔ ƒe gaɖoƒe ƒe dzesi kple safui ƒomewo gɔme (kple gaɖoƒe ƒe dzesi vovovowo kple nukpɔsafuiwo); Sprout ƒe safuiwo mewɔ dɔ kple Sapling ƒe gaɖoƒe ƒe dzesiwo o.
- **Miese be mɔ̃ ƒe ɖoɖo xexlẽnuwo nye "company ɖeka ƒe nya ɣaɣla".** Enye ceremony ame geɖe ƒe tɔ: ne ame sia ame siwo nɔ eme la katã wɔ ɖeka ko la, woate ŋu atu ɖaseɖigbalɛwo.
- **Miebu be Sapling trɔ gaƒe siwo woɖe alo balancewo.** Etrɔ ale si wotu ɣaɣla gaɖoɖowo — ZEC ƒe gaƒe aɖeke mekpɔ trɔtrɔ o.
- **Miebu be ɖaseɖigbalɛ tutu kple asidede agbalẽ te wɔwɔ le be woadzɔ le mɔ̃ ɖeka dzi.** Sapling ƒe mamae na asikplɔwo dzra mɔwo mate ŋu aɖe gazazãsafuiwo ɖe woŋu, esi mɔ̃ bubu tu ɖaseɖigbalɛwo.

## Nyagbalẽ me nyaawo

| Nya | Gãmesese bɔbɔe |
|---|---|
| Ɣaɣla gaɖoɖo | Zcash ƒe gaɖoɖo ɣaɣla si ɣla ame si dɔe, ame si xɔe, kple gaƒea. |
| Sprout | Ɣaɣla protocol gbãtɔ si Zcash dze egɔme kple, si zɔ blewu eye wòkɔ sesĩe wu Sapling. |
| Spend kple Output circuitwo | Sapling ƒe proving circuit yeye eve si wɔ Sprout ƒe JoinSplit circuit ɖeka teƒe. |
| Gaɖoƒe ƒe dzesi vovovo | Gaɖoƒe ƒe dzesi si kadodo manɔ anyi, si nàte ŋu aɖe tso safui ɖeka me. |
| Viewing Key | Safui si na ame aɖe nakpɔ gakotoku ƒe gaɖoɖowo, gake wòmate ŋu azã ga tso eme o. |
| Consensus branch id | Code kpuie aɖe si fia network la be trɔtrɔ ka ƒe sewo gaɖoɖo aɖe kplɔ. |

## FAQ

Sapling trɔ ZEC si le asinye ƒe gaƒe? Ao. Sapling trɔ ale si wotu ɣaɣla gaɖoɖowo, menye ZEC si ame aɖeke le alo gaƒe bliboa o. Wò balance mekɔ trɔ o.

Nye ZEC gale ɣaɣla me le Sapling megbe oa? Ɛ̃, eye woate ŋu azãe nyuie wu. Sapling tsɔ ɣaɣla sesĩe si le ɣaɣla gaɖoɖowo me la kpɔ eye wòwɔe be woazɔ kabakaba kple asi bɔbɔe be woate ŋu azãe ŋutɔ. Ga siwo le ɣaɣla me la gale ɣaɣla me ale ke.

Ele be mawɔ nu aɖe oa? Wò si nye holder la, mele be nàwɔ nu aɖeke o. Sapling nye mɔ̃ ƒe sewo trɔtrɔ si gakotoku kple ɣaɣla dzesi ŋɔŋlɔ softwarewo xɔ. Gakotoku yeyeawo katã de dzɔdzɔ na Sapling ƒe gaɖoƒe ƒe dzesiwo xoxo.

Nu kae nye vovototo si le Sprout kple Sapling dome? Sprout nye ɣaɣla protocol gbãtɔ eye wòzã proving circuit ɖeka si zɔ blewu eye wòɖu memory geɖe. Sapling trɔe kple Spend kple Output circuitwo siwo zɔ kabakaba, wòkpe ɖe nukpɔsafuiwo kple gaɖoƒe ƒe dzesi vovovowo ŋu, eye wòwɔ ɣaɣla gaɖoɖowo bɔbɔe na telefonwo kple asikplɔwo dzra mɔwo.

Nu ka ta sources aɖewo gblɔna October 28 eye bubuwo gblɔna October 29? Woɖo dede egɔme ƒe teƒe la ɖo ɖi be wòanɔ October 28, 2018 dzi. Gaɖoɖowo ƒuƒoƒe si wɔ trɔtrɔa ŋutɔ, gaɖoɖowo ƒuƒoƒe 419,200, wòwoe le October 29 ƒe ŋdiŋdi le UTC me. Le ɣeyiɣi teƒe geɖe me la, enɔ October 28 ha. Enye gaɖoɖowo ƒuƒoƒe ma ke kple ɣeyiɣi ma ke le mɔ sia mɔ.

Nukpɔsafui nye nu kae? Nukpɔsafui na wò nàmama be ame aɖe nakpɔ ɣaɣla gakotoku ƒe nyatakakawo. Ame si le nukpɔsafui blibo alo incoming viewing key la ate ŋu akpɔ gakotoku ƒe gaɖoɖowo ƒe nyatakakawo, gake wòmate ŋu azã eƒe ga o. Kpɔ [Nukpɔsafuiwo](../zcash-tech/viewing-keys) na nyatakaka bubu.

## Kpɔ be nèse egɔme

Le Sprout te, nu ka ta ame geɖe de asi le ɣaɣla gaɖoɖowo ŋu, eye aleke Sapling ɖo eŋu?

<details>
<summary>Ŋuɖoɖo</summary>
Le Sprout te, ɣaɣla gaɖoɖo tutu xɔ minutiwo eye wòzã memory gigabytewo, eyata ezɔ blewu eye wòkɔ sesĩe na zazãla geɖewo, gatrɔƒewo, kple asiwo. Sapling ɖe Spend kple Output circuitwo siwo zɔ kabakaba gɔme; esia tsɔ dɔa va ɖe sekondi vie aɖewo kple megabyte 40, eye wòwɔ ɣaɣla gaɖoɖowo be woate ŋu azãe le gbe sia gbe ƒe telefonwo kple asikplɔwo dzra mɔwo dzi.
</details>

### Nuwo siwo wòate ŋu azã

- [ZIP 205: Sapling ƒe Mɔ̃ ƒe Sewo Trɔtrɔ ƒe ɖoɖo](https://zips.z.cash/zip-0205)
- [ZIP 243: Gaɖoɖo Asidede Agbalẽ Te ƒe Kpɔɖeŋu na Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling ƒe trɔtrɔ ƒe axa](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling ƒe nyagblɔɖi](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC ƒe nyagblɔɖi](https://electriccoin.co/blog/sapling-mpc/)

### Kpɔ hã

- [Ɣaɣla Gaƒuƒoƒowo](../using-zcash/shielded-pools)
- [Nukpɔsafuiwo](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Zcash Mɔ̃ ƒe Sewo Trɔtrɔwo](../start-here/network-upgrades)
- [Gakotokuwo](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## Axa siwo Kplɔe ɖo

- [Nukpɔsafuiwo](./Viewing_Keys.md) — audit mama ƒe nɔnɔme si Sapling ɖe gɔme
- [Sprout](./Sprout.md) — ɣaɣla protocol gbãtɔ si Sapling trɔ
- [Blossom](./Blossom.md) — trɔtrɔ si kplɔe ɖo le ƒometɔa me (gaɖoɖowo ƒuƒoƒe ƒe ɣeyiɣi, menye cryptography o)
- [zk_SNARKS](./zk_SNARKS.md) — zero-knowledge teknolojia si le circuitwo ƒe megbe


Ƒometɔ: [Mɔ̃ ƒe Sewo Trɔtrɔwo ƒe index](../start-here/network-upgrades) · Do ŋgɔ: [Overwinter](../zcash-tech/overwinter) · Si kplɔe ɖo: [Blossom](../zcash-tech/blossom)
