<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood de dɔwɔwɔ dzi le Zcash mainnet dzi le gaɖoɖowo ƒuƒoƒe 903,000 (July 16, 2020 UTC).

Nusi nànyae nye: Ale si Heartwood na nukulawo ŋu woate ŋu axɔ woƒe gaɖoɖowo ƒuƒoƒe ƒe fetuwo tẽ ade ɣaɣla [shielded] gaɖoƒe ƒe dzesiwo me, kple ale si wòwɔe wò na Zcash ƒe dɔwɔwɔ ƒe ɖaseɖigbalɛ le dɔ me nyatakaka si hiã ƒe mɔwo ŋu.

Heartwood nye Zcash [mɔ̃ ƒe sewo trɔtrɔ](../start-here/network-upgrades), gbegbɔgblɔ ɖi ƒe sewo ƒe hard fork si ƒe dɔwɔwɔ ƒe ɖoɖo le [ZIP 250](https://zips.z.cash/zip-0250) me. Ewɔ ŋutinya trɔtrɔ eve: [ZIP 213](https://zips.z.cash/zip-0213) (ɣaɣla Coinbase) kple [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood nye Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ gã ene, eye [Electric Coin Company](../zcash-organizations/electric-coin-company) kple [Zcash Foundation](../zcash-organizations/zcash-foundation) ƒo ɖeka de asi le eŋu. Abe Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ siawo katã ene la, ewɔ gbegbɔgblɔ ɖi ƒe branch id yeye, dzesi si na replay ƒe mɔxoxo ƒe dzadzɛɖeɖe le afia kple megbe, ale be gaɖoɖo si woɖo le se yeyeawo te la mate ŋu woagbugbɔawɔe le ɖoɖonu xoxo dzi o, eye wogatrɔe.

Heartwood dze egɔme le gaɖoɖowo ƒuƒoƒe ƒe teƒe si woɖo ɖi (903,000), menye gaƒoƒo ƒe gaƒoƒo si woɖo ɖi o, eyata gaƒoƒo tututu si nàkpɔ le ɖoɖowo ƒuƒopé dzi la ate ŋu ato vovo vi aɖe le teƒewo dome. Gaɖoɖowo ƒuƒoƒe la kple ɣeyiɣi la koe nye ɖeka.

Nu ka ta esia le vevie. Nukula [miners] wo xɔ ZEC si wo wɔ yeye le ɣesiaɣi si wo wɔ nukuku [mining] le gaɖoɖowo ƒuƒoƒe [block] ŋu. Hafi Heartwood, woasɔ ga ma aɖo nuwo ƒe ʋuʋuɖi [transparent] gaɖoƒe ƒe dzesi [address] dzi, si le ame sia ame ƒe ŋkume. Ame sia ame ate ŋu akpɔ ale si nukula aɖe xɔ ga kple afi si gaawo yi le emegbe. Heartwood na be woate ŋu aɖo fetu ma ɖe ɣaɣla [shielded] gaɖoƒe ƒe dzesi dzi tẽ ɖe teƒe, ale be nukula ƒe xɔse nɔ ɣaɣla. Eƒe wɔwɔ hã na gakotoku [wallets] siwo me kpekpeɖeŋu mele kple ɖoɖonu [chains] bubuwo nɔ ŋu aƞlɔ Zcash ƒe dɔwɔwɔ ƒe ɖaseɖigbalɛ [proof-of-work] me ne woaɖe ɖoɖonu blibo la ƒe download o.

## ɣaɣla coinbase

Coinbase gaɖoɖo [coinbase transaction] nye gaɖoɖo tɔxɛ aɖe si xea gaƒuƒoƒe ƒe fetu. Hafi Heartwood, eƒe nu siwo do goe la ele be woanye nuwo ƒe ʋuʋuɖi, eyata nukula ƒe ZEC yeye si wo wɔ la dzea agbe me ɣesiaɣi le gaɖoƒe ƒe dzesi si le duto ƒe ŋkume. Heartwood trɔ gbegbɔgblɔ ɖi [consensus] ƒe sewo ale be, le ZIP 213 ƒe nya me, coinbase gaɖoɖowo ate ŋu akpɔ Sapling nu siwo do goe. Le nyagɔme bɔbɔe me, nukulawo ate ŋu axɔ fetuwo tẽ ɖe ɣaɣla [shielded] gaɖoƒe ƒe dzesiwo Sapling me azɔ. Coinbase ƒe nuwo siwo do goe le nuwo ƒe ʋuʋuɖi me la gale mɔ na wo ha, eyata esia nye mɔ yeye aɖe, menye trɔtrɔ si wodo le ame ŋu o.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Nu ka ta Sapling gbã

ɣaɣla coinbase ɖo ŋku Sapling nufiawo ŋu tɔxɛ, eye nu ka ta le esia me. ZIP 213 gblɔ be Sapling mɔ̃ ƒe sewo trɔtrɔ va kple aƒe ƒe ƒomevi trɔtrɔwo kple dɔwɔwɔ ƒe nyuieɖeɖewo siwo wɔ be ga ƒe ɣaɣla tẽ le coinbase gaɖoɖo me la ate ŋu anɔ anyi. Sprout ƒe ɣaɣla gaƒuƒoƒo gbãtɔ la bia nu geɖe akpa na be woawɔ ɣaɣla le coinbase me. Sapling ƒe ɖaseɖigbalɛ wɔwɔ ƒe mɔ nyui kple didienu ƒe nɔnɔme wɔ be wòwɔa dɔ. Sapling hã ɖe se xoxo si de mɔxɔxɔ ɣaɣla coinbase nufiawo ŋu la ŋu be nanɔ Sapling nufiawo hã ŋu, eye Heartwood ɖe se ma ƒe sesẽɖeɖe le ɖeɖe be woana mɔ na wo. Esia nye kpɔɖeŋu nyui si fia ale si Zcash mɔ̃ ƒe sewo trɔtrɔwo tu ɖe wo nɔewo dzi: mɔ̃ ƒe sewo trɔtrɔ ɖeka ƒe dɔwɔƒe zu gɔmeɖoƒe na si gbɔna.

## FlyClient

Heartwood hã trɔ nusi gaɖoɖowo ƒuƒoƒe ƒe ta adzɔgbeɖeɖe wɔ la. Woɖe ta ƒe field si woyɔna be hashFinalSaplingRoot kpɔ ɣeyiɣi aɖe megbe, eye wotrɔ eƒe ŋkɔ zu hashLightClientRoot. Fifi la, ewɔ adzɔgbeɖeɖe ɖe Merkle Mountain Range (MMR) ƒe ke dzi, si nye nu si woatu yi dzi le gaɖoɖowo ƒuƒoƒe xoxoawo ƒe ta ƒe nyatakakawo kple metadata dzi, abe ɣeyiɣi ƒe dzesiwo, sesẽƒe ƒe taɖodzinuwo, Sapling ƒe keawo, dɔ si woƒo ƒu, kple gaɖoɖo ƒe xexleŋu ene. Adzɔgbeɖeɖe ma na nyatakaka si hiã ƒe mɔ, alo ɖoɖonu bubu aɖe, ŋu wòate ŋu akpɔ Zcash ƒe dɔwɔwɔ ƒe ɖaseɖigbalɛ kple ɖaseɖigbalɛ sue si ƒe lolome gãna le logarithm ƒe mɔ nu ko le ɖoɖonu ƒe didime nu. Eƒe vi nye nyatakaka si hiã ƒe mɔ ƒe gakotoku nyuitɔwo kple mɔ bɔbɔe na ame etɔwo kple ɖoɖonu geɖe dome ƒe ƒoƒo, elabena client aɖe magale be wòatsɔ gaɖoɖowo ƒuƒoƒe siawo katã adze o be wòaxɔ dɔ si le ɖoɖonu la megbe dzi ase.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Afi si Heartwood le

Heartwood nye afɔ ɖeka le Zcash ƒe mɔ̃ ƒe sewo trɔtrɔwo ƒe ƒuƒo me, siwo katã tsɔ nu aɖe vɛ si si gbɔna la ƒo dɔ kplii. Overwinter kple Sapling va le 2018 me, Blossom le 2019 me, eye Heartwood le 2020 me le gaɖoɖowo ƒuƒoƒe 903,000. Canopy va megbe le 2020 me le gaɖoɖowo ƒuƒoƒe 1,046,400. Sapling nye kɔkɔe vevitɔ le ɖoɖonu sia me na Heartwood: eƒe ɣaɣla gaɖoɖo ƒe mɔ si wɔa dɔ nyuie la nye tekniki ƒe nɔnɔme si na ɣaɣla coinbase te ŋu wòwɔ dɔ.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Nyagɔmeɖeɖe

| Nya | Eŋlisigbe bɔbɔe ƒe gɔmeɖeɖe |
|---|---|
| Network upgrade (NU) | Trɔtrɔ si woɖo ɖe eŋu ɖekae le Zcash ƒe gbegbɔgblɔ ɖi [consensus] sewo ŋu, eye wozãa eƒe dɔwɔwɔ le gaɖoɖowo ƒuƒoƒe ƒe kɔkɔme si woɖo ɖi me |
| Coinbase transaction | Gaɖoɖo tɔxɛ si le gaɖoɖowo ƒuƒoƒe siawo katã me, si xea gaɖoɖowo ƒuƒoƒe ƒe fetu |
| Shielded Sapling address | Sapling mɔ̃ ƒe sewo trɔtrɔ ƒeɖe ɣaɣla Zcash gaɖoƒe ƒe dzesi ƒe ụdị |
| Shielded coinbase | Heartwood ƒe trɔtrɔ si na woxe gaɖoɖowo ƒuƒoƒe ƒe fetu ade ɣaɣla Sapling gaɖoƒe ƒe dzesiwo me |
| FlyClient | Mɔnu si na nyatakaka si hiã ƒe mɔwo ate aɖe nukuku ƒe ɖaseɖigbalɛ kple ɖaseɖigbalɛ suewo |
| Merkle Mountain Range (MMR) | Nudzodzro si tsɔa tsã ƒe gaɖoɖowo ƒuƒoƒewo ƒe nyatakaka ƒu, si gaɖoɖowo ƒuƒoƒe ƒe ta adzɔgbeɖeɖe [commitment] le eŋu |
| Consensus branch id | Alɔdzesi si fia mɔ̃ ƒe sewo trɔtrɔ si ƒe sewo gaɖoɖo aɖe wɔa ɖe, eye wozaa e na woaxe mɔ na gaɖoɖowo ƒe gbugbɔwɔwɔ |

## Nyabiasewo siwo woŋu ŋku geɖe le

Ɖe Heartwood trɔ nye ZEC alo nye ɣaɣla? Ao. Heartwood meka asi le wòƒe ga siwo le xoxo ŋu o. Etsɔ mɔ na nukulawo be woaxɔ fetuwo ɖe ɣaɣla gaɖoƒe ƒe dzesiwo me, eye wòna kpekpeɖeŋu nyuitɔ na nyatakaka si hiã ƒe mɔwo. Wòƒe balancewo kple ɣaɣla gaɖoɖowo metɔ o.

Nu kae nye ɣaɣla coinbase? Coinbase nye gaɖoɖo si xea gaɖoɖowo ƒuƒoƒe ƒe fetu. Heartwood na fetu ma ate ŋu ayi ɖe ɣaɣla Sapling gaɖoƒe ƒe dzesi me le nuwo ƒe ʋuʋuɖi tɔ teƒe, ale be nukula ƒe fetu nanɔ ɣaɣla me.

Ɖe ele be nukulawo naxɔ fetuwo ɖe ɣaɣla me fifia? Ao. Ɣaɣla coinbase nye nu si wòate ŋu atia. Nuwo ƒe ʋuʋuɖi coinbase nufiawo gale dɔ me, eyata nukulawo ate ŋu atia ɖeka le wo dome.

Nu ka ta ɣaɣla coinbase zaa Sapling eye menye Sprout gaƒuƒoƒo xoxo la o? Elabena Sapling ƒe nɔnɔme si wɔa dɔ nyuie la wɔ be ɣaɣla tẽ le coinbase me la zu nu si wòate ŋu awɔ. Sprout gaƒuƒoƒo si va do ŋgɔ la bia nu geɖe akpa na wòwɔ.

Nu kae trɔ na nyatakaka si hiã ƒe mɔwo? Fifi la, gaɖoɖowo ƒuƒoƒe ƒe ta wɔa adzɔgbeɖeɖe ɖe Merkle Mountain Range le gaɖoɖowo ƒuƒoƒe xoxoawo ŋu to hashLightClientRoot field dzi. Esia na nyatakaka si hiã ƒe mɔwo kple ɖoɖonu bubuwo ŋu woate ŋu akpɔ Zcash ƒe dɔwɔwɔ ƒe ɖaseɖigbalɛ kple ɖaseɖigbalɛ sue siwo ƒe lolome gãna le logarithm ƒe mɔ nu, le ɖoɖonu blibo la teƒe.

## Kpɔ wòƒe gɔmesese kpɔ

Do ŋgɔ na Heartwood, nu ka ta gaɖoɖowo ƒuƒoƒe ƒe fetu si woƒe na nukula aɖe dzea fia le ame gbogbo ŋkume, eye nu kae Heartwood trɔ?

<details>
<summary>Ŋuɖoɖo</summary>

Coinbase nufiawo nɔa be woanye nuwo ƒe ʋuʋuɖi, ale be nukula ƒe fetu yeye si woɖe le ga me la dzena ɣesiaɣi le nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi si ame sia ame ate ŋu akpɔ me. Heartwood trɔ gbegbɔgblɔ ɖi ƒe sewo (ZIP 213) ale be coinbase gaɖoɖowo ate ŋu akpɔ Sapling nufiawo, eye esia na nukulawo ŋu woate ŋu axɔ woƒe fetuwo tẽ ade ɣaɣla gaɖoƒe ƒe dzesiwo me.
</details>

### Nuɖoɖowo

[ZIP 250: Heartwood Mɔ̃ ƒe sewo trɔtrɔ ƒe dɔwɔwɔ](https://zips.z.cash/zip-0250)

[ZIP 213: Ɣaɣla Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Gbegbɔgblɔ ɖi ƒe akpa ƒe tɔtrɔwo](https://zips.z.cash/zip-0221)

[Heartwood mɔ̃ ƒe sewo trɔtrɔ](https://z.cash/upgrade/heartwood/)

### Kpɔ hã

[Zcash Mɔ̃ ƒe sewo trɔtrɔwo](../start-here/network-upgrades)

[Ɣaɣla gaƒuƒoƒowo](../using-zcash/shielded-pools)

[Gakotokuwo](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Series: [Mɔ̃ ƒe sewo trɔtrɔwo ƒe index](../start-here/network-upgrades) · Si va do ŋgɔ: [Blossom](../zcash-tech/blossom) · Si gbɔna: [Canopy](../zcash-tech/canopy)
