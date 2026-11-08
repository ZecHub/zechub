<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling de dɔwɔwɔ gɔme le Zcash mainnet dzi le gaɖoɖowo ƒuƒoƒe 419,200 (October 29, 2018, 02:15 UTC).

Nu si nànya lae nye esi: Sapling wɔ Zcash ƒe fexexe ɣaɣla [private] wòzu kaba eye wòme kɔ be woate ŋu awɔe le telefon alo asikplɔwo dzra mɔ dzi.

Sapling nye Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ [network upgrade] gã evelia, eye wodze egɔme le Zcash ƒe dzidzɔƒe ƒe ƒe evelia. Enye gbegbɔgblɔ ɖi [consensus] ƒe hard fork si wɔe yeyee ale si woƒoa gaɖoɖo ɣaɣla (private) ƒe akpaewo. Woɖe dɔwɔwɔa ƒe ɖoɖo fia le ZIP 205 me, gaɖoɖo ƒe asidede agbalẽ te [signature] se yeyewo le ZIP 243 me, eye woƒe siawo katã tso ZIP 200, mɔ̃ ƒe sewo trɔtrɔ ƒe mɔnu, me. Nu bliboa le Zcash Protocol Specification me. Electric Coin Company tu mɔ̃ ƒe sewo trɔtrɔa eye wòɖe version gbãtɔ si doa alɔe, zcashd 2.0.0, le August 2018 me. Le ɖoɖonu [chain] dzi, network la de dzesi Sapling ƒe sewo kple eƒe consensus branch id.

Nu ka ta esia le vevie. Tsã na Sapling, be nàwɔ fexexe ɣaɣla vavã la, ele be nàlala miniti geɖewo hã esi wò kɔmpiuta le memory gigabyte geɖewo ƒe dɔ wɔm be wòatu ɖaseɖigbalɛ [proof] la. Esia da megbe eye wòle kpekpeɖeŋu na ame geɖewo, eyata ezãlawo, gatrɔƒewo [exchange], kple afɔkuwo geɖe mele gaɖoɖo ɣaɣla wɔm o eye wodɔ ZEC le ɖeɖefia me. Sapling tsɔ dɔa ɖe sekondi aɖewo kple memory megabyte 40 ko me. Trɔtrɔ ɖeka siae wɔe be ZEC ɣaɣla nadze agbagba le gbe sia gbe ƒe agbenɔnɔ me, le telefon vɔ̃wo kple asikplɔwo dzra mɔ dzi.

## Nu si trɔ

Sapling ƒe dziɖuɖu nye mɔ kaba aɖe si tu zero-knowledge ɖaseɖigbalɛ la, si na gaɖoɖo ɣaɣla nanɔ ɣaɣla. Sprout ƒe ɖoɖo gbãtɔ zã proving circuit ɖeka (JoinSplit circuit), si do megbe eye wòɖia memory geɖe. Sapling trɔ esia kple circuit eve si wotu na dɔ sia tɔxɛ, Spend circuit kple Output circuit, si woɖe egɔme le Zcash Protocol Specification me. Eƒe emetsonu nye asiƒoƒo gã le asixɔxɔ me. Le Electric Coin Company nu la, woate ŋu atu gaɖoɖo ɣaɣla le sekondi aɖewo ko me kple memory megabyte 40. Sapling ŋgɔ Sprout ƒe nudzodzro la kpe ɖe eme wu; edze miniti geɖewo kple memory gigabyte geɖewo (Sprout-ƒe akɔnta siawoe nye nudzodzro ƒe nudzodzro si woƒoa nu tsoe zi geɖe).

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## Safui yeyewo

Sapling hã tsɔ gaɖoƒe ƒe dzesi [address] ɣaɣla kple safui yeyewo vɛ. Safui ɖeka ate ŋu akpɔ gaɖoƒe ƒe dzesi vovovo geɖe, siwoe nye fexexe ƒe gaɖoƒe ƒe dzesi siwo ame si le gota mate ŋu aka ɖe wo nɔewo ŋu o. Sapling tsɔ nukpɔsafui [viewing key] vɛ hã: nukpɔsafui blibo alo nukpɔsafui si kpɔ gaɖoɖowo gbɔ na wòate ŋu nàma ame aɖe nakpɔ gakotoku [wallet] ƒe gaɖoɖo ƒe nyawo, ke menye be nètsɔ ŋusẽ si woatsɔ azã eƒe ga na wò o. Esia le nyui na akɔntabubu, gaƒe ƒe akɔntabubu, alo be nàɖe fia ko be wowɔ fexexe aɖe.

Trɔtrɔ si le eŋu nye be Sapling ma dɔ si tu ɖaseɖigbalɛ la kple dɔ si dea asidede agbalẽ te na gaɖoɖo la tɔ. Mɔ si tua zero-knowledge ɖaseɖigbalɛ la megale be wòanye mɔ si le gazazãsafui [spending key] la ɖe asi o. Mama siae na asikplɔwo dzra mɔ nate ŋu ana wò gazazãsafui nanɔ ɖe eɖokui me esi mɔ bubu wɔ proving dɔ si le kpekpeɖeŋu.

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Mɔ̃ ƒe ɖoɖo xexlẽnuwo

Sapling ƒe circuitwo ɖo ŋu le public parameter siwo wòle be woawɔ wo nyuie. Ne ame ɖeka ko wɔ wo eye wòtsɔ nyagblɔɖi si wɔ ɖe megbe (the "toxic waste") ɖe asi, ame ma ate ŋu awɔ ɖaseɖigbalɛ mawo. Be woavo esia ŋu la, parameterwo tso ceremony me si wɔ le akpa eve kple ame geɖewo. Akpa 1, si woyɔna be Powers of Tau, menye circuit aɖe tɔxɛ o, esia fia be wometsɔe ɖe Sapling ƒe circuit tɔxɛwo ŋu o. Akpa 2, Sapling MPC, nye circuit tɔxɛ. Akpa sia akpe ɖeŋu nenye be ame ɖeka pɛ hã nɔ anyi nyuie eye wògbã eƒe toxic waste, eyata ceremony la ƒe kɔkɔe ava dzudzɔ ko ne ame sia ame si kpɔa eme la katã wɔ ɖeka.

## Ale si wodze egɔme

Sapling ɖo Overwinter yome, June 2018 mɔ̃ ƒe sewo trɔtrɔ si na network la ƒe mɔ̃ ƒe sewo trɔtrɔ ƒe mɔnu dzadzɛ. Electric Coin Company de mainnet ƒe dzeɖeɖegɔme ƒe teƒe le zcashd 2.0.0 me, si woɖe le August 2018 me, eye network la trɔ ɖe Sapling ƒe sewo dzi esi wonuku gaɖoɖowo ƒuƒoƒe 419,200. Le ɖoɖonu dzi la, Sapling consensus branch id dea dzesi ɣeyiɣi ma.

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## Nyawo ƒe gɔme

| Nya | Gɔme bɔbɔe le English me |
|---|---|
| Shielded transaction | Zcash ƒe gaɖoɖo ɣaɣla si fia mɔ na ame si dɔ ga la, ame si xɔe la, kple gaƒe. |
| Sprout | Protocol ɣaɣla gbãtɔ si Zcash dze egɔme kplee, si do megbe eye wòle kpekpeɖeŋu wu Sapling. |
| Spend and Output circuits | Sapling ƒe proving circuit yeye eve si trɔ Sprout ƒe JoinSplit circuit ɖeka. |
| Diversified address | Fexexe ƒe gaɖoƒe ƒe dzesi kadodo manɔ anyi [unlinkable] siwo katã nàte ŋu akpɔ tso safui ɖeka me. |
| Viewing Key | Safui si na ame aɖe nakpɔ gakotoku ƒe gaɖoɖowo, ke mate ŋu azã ga tsoe o. |
| Consensus branch id | Code kpui aɖe si fia network la be mɔ̃ ƒe sewo trɔtrɔ kae ƒe sewo gaɖoɖo aɖe le dze yome. |

## Biabia si woƒoa zi geɖe

Ɖe Sapling trɔ ZEC ƒe gaƒe si nye tɔwò oa? Ao. Sapling trɔ ale si woƒoa gaɖoɖo ɣaɣla, menye ZEC ƒe gaƒe si ame aɖeke le asi alo ga bliboa ƒe xexlẽme o. Wò balance metsrɔ o.

Ɖe nye ZEC gale ɣaɣla le Sapling megbe ha? Ɛ̃, eye wòle bɔbɔe wu be wòazãe. Sapling wɔ gaɖoɖo ɣaɣla ƒe ɣaɣla sesẽ la ɖe asi eye wòwɔ wo kaba kple asi mekɔ o be woate ŋu azã wo vavã. Ga ɣaɣlaawo gale ɣla ale ma ke.

Ɖe ele be mawɔ naneke oa? Mègale be nàwɔ naneke o nenye gaƒe ƒe tɔasi. Sapling nye mɔ̃ ƒe sewo trɔtrɔ si gakotoku kple ɣaɣla dzesi ŋɔŋlɔ [node] ƒe softwarewo xɔ. Gakotokuwɔla yeyewo doa alɔ Sapling ƒe gaɖoƒe ƒe dzesi xoxo.

Nu kae nye vovototo le Sprout kple Sapling dome? Sprout nye protocol ɣaɣla gbãtɔ eye wòzã proving circuit ɖeka si do megbe eye wòɖia memory geɖe. Sapling trɔe kple Spend kple Output circuitwo siwo le kaba, wotsɔ nukpɔsafuiwo kple gaɖoƒe ƒe dzesi vovovowo vɛ, eye wòwɔ gaɖoɖo ɣaɣla me kɔ be woate ŋu awɔ wo le telefonwo kple asikplɔwo dzra mɔ dzi.

Nu ka ta nyaƒoɖewo aɖe gblɔna October 28 eye bubuwo gblɔna October 29? Woɖo dzeɖeɖegɔme ƒe teƒea ɖe ŋgɔ be wòaɖo October 28, 2018 ŋu. Gaɖoɖowo ƒuƒoƒe si wɔ trɔtrɔa vavã, gaɖoɖowo ƒuƒoƒe 419,200, woku e le October 29 UTC ƒe ŋdiŋdi. Le ɣeyiɣi ƒe teƒewo geɖe me la, October 28 koe wòga nye. Enye gaɖoɖowo ƒuƒoƒe ma ke kple ɣeyiɣi ma ke le mɔ sia alo mɔ kemɛa me.

Nukpɔsafui nye nu kae? Nukpɔsafui na wòate ŋu nàma nukpɔmɔ ƒe mɔ na gakotoku ɣaɣla. Ame si le nukpɔsafui blibo alo nukpɔsafui si kpɔa gaɖoɖowo gbɔ la ate ŋu akpɔ gakotoku ƒe gaɖoɖo ƒe nyawo, ke mate ŋu azã eƒe ga o. Kpɔ [Nukpɔsafuiwo](../zcash-tech/viewing-keys) ne nànya nu geɖe.

## Ɖo wò nusɔsrɔ̃ kpɔ

Le Sprout te la, nu ka ta ame geɖe mewɔ gaɖoɖo ɣaɣla o, eye aleke Sapling ɖɔe?

<details>
<summary>Ŋuɖoɖo</summary>
Le Sprout te la, gaɖoɖo ɣaɣla ƒe tutu xɔ miniti geɖewo eye wòzã memory gigabyte geɖewo, eyata wòda megbe eye wòle kpekpeɖeŋu na ezãla geɖewo, gatrɔƒewo, kple afɔkuwo. Sapling tsɔ Spend kple Output circuitwo siwo le kaba vɛ, siwo tsɔ dɔa ɖe sekondi aɖewo kple megabyte 40 te, eye wòwɔ gaɖoɖo ɣaɣla dze agbagba le gbe sia gbe ƒe telefonwo kple asikplɔwo dzra mɔ dzi.
</details>

### Nuɖoɖowo

- [ZIP 205: Sapling Network Upgrade ƒe dɔwɔwɔ](https://zips.z.cash/zip-0205)
- [ZIP 243: Gaɖoɖo ƒe asidede agbalẽ te ƒe kpekpeɖeŋu na Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling ƒe mɔ̃ ƒe sewo trɔtrɔ ƒe axa](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling ƒe gbeɖãɖa](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC ƒe gbeɖãɖa](https://electriccoin.co/blog/sapling-mpc/)

### Kpɔ hã

- [Gaƒuƒoƒo ɣaɣlaawo](../using-zcash/shielded-pools)
- [Nukpɔsafuiwo](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Zcash Mɔ̃ ƒe sewo trɔtrɔwo](../start-here/network-upgrades)
- [Gakotokuwo](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Xexlẽme: [Mɔ̃ ƒe sewo trɔtrɔ ƒe index](../start-here/network-upgrades) · Si va yi: [Overwinter](../zcash-tech/overwinter) · Si kplɔe ɖo: [Blossom](../zcash-tech/blossom)
