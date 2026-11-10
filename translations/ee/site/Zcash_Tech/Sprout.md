<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axawo Ŋu"/>
</a>

# Sprout

> Zcash dze egɔme le October 28, 2016, kple Sprout ɣaɣla [shielded] gaƒuƒoƒo [pool].

> **Nuxlɔ̃ame:** Ne NU7 dze egɔme la, eana be ZEC siwo gale Sprout gaƒuƒoƒo me la mate ŋu wɔ fexexe o (mainnet ƒe dzeɖeɖe ƒe teƒe le 3,543,405, woɖo ŋgɔ be anɔ le 5 November 2026; kpɔ [ZIP 259](https://zips.z.cash/zip-0259)). Ne èle Sprout ga siwo ŋu la, xlẽ [Gaxɔ ga siwo](../using-zcash/recovering-funds) eye nàtrɔ wo gbã.

Nu si nàkpɔe: Sprout nye afi si Zcash dze egɔme le, esi wòwɔ ga si le ɣaɣla me eye wòate ŋu aɖe eɖokui fia le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu si le agbe dzi me zi gbã.

Sprout nye Zcash network ƒe gɔmedzedze, menye [mɔ̃ ƒe sewo trɔtrɔ network upgrade](../start-here/network-upgrades) si va megbe o. Ede dɔ le genesis block dzi le October 28, 2016. ZIP si wode xexlẽ mele o la mee ɖe Sprout gɔme o: ZIP ƒe ɖoɖo la dze egɔme emegbe kple Overwinter, eyata Sprout ƒe numetoto tso Zcash Protocol Specification gbãtɔ kple Zerocash ƒe tutu si dzi wotu e la dzi. [Electric Coin Company](../zcash-organizations/electric-coin-company) (le esime ma me la, Zerocoin Electric Coin Company), si Zooko Wilcox nɔ kplɔm, wɔe eye wodo e ɖe asi. Sprout ɖe zk-SNARK ɣaɣla [shielded] gaɖoɖowo [transactions] siwo wɔnɔ dɔ me gbãtɔ kple ɣaɣla gaƒuƒoƒo [pool] gbãtɔ fia, ale be amewo ate ŋu adɔ ZEC kple amesi dɔe, amesi xɔe, kple gaƒe si woɣla, ke network la hã kpɔ be gaƒeawo ƒe akonta sɔ. Ŋkɔ la fia ɖoɖonu [chain] ɖevi si mele tsitsi me, si timu la katã xɔe se be wòatsi.

Nu ka ta esia le vevie. Gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu siawo katã siwo nɔ anyi hafi Sprout la ɖea wò fexexewo fia: ame sia ame ate ŋu akpɔ ame si xe ga na ame kae kple gaƒe si wòxe. Sprout nye network gbãtɔ si le agbe me eye zãzã faa [permissionless], si te ŋu fia nudzɔdzɔ siawo le ɣaɣla me eye wòagaɖe ɖase be ame aɖeke mele aʋaʋã wɔm o. Esia le vevie na ga ƒe ɣaɣla si le amewo ƒe gbe sia gbe agbeme, si nèle mɔ kpɔm na le cash alo bank ƒe nyagbalẽ si ame bubu mate ŋu axlẽ o me. Egblɔ hã be ɣaɣla sesẽ si le ɖoɖonu dzi [on-chain] ate ŋu awɔ dɔ le nuwɔna me, ke menye agbalẽ ƒe aɖaŋu ko o. Mɔ̃ ƒe ɖoɖo xexlẽnuwo [trusted setup] ƒe Ceremony si na esia dzɔ la zu kpɔɖeŋu na cryptography ƒe dɔwo si va megbe, eye ɖaseɖigbalɛ [proof] ƒe mɔɖoɖo si blea ɣeyiɣi eye wòhia memory geɖe, si Sprout va kple la, eyae wɔ be timu la tu Sapling le ƒe eve megbe.

## Ɣaɣla gaƒuƒoƒo gbãtɔ

Sprout wɔ gaɖoƒe ƒe dzesi [address] ƒomevi eve. Nuwo ƒe ʋuʋuɖi [transparent] gaɖoƒe ƒe dzesiwo (t-addresses) wɔ dɔ abe Bitcoin ene, eye nudzɔdzɔwo katã le agbalẽ si le dukɔ bliboa ƒe asi me dzi. Ɣaɣla gaɖoƒe ƒe dzesiwo (z-addresses) ɖoa ga ɖe Sprout [ɣaɣla gaƒuƒoƒo](../using-zcash/shielded-pools) me, afi si ame si do ga, ame si xɔ ga, kple gaƒe la katã nɔa ɣaɣla me. Nunya si le eme nye [zk-SNARKs](../zcash-tech/zk-snarks), zero-knowledge ɖaseɖigbalɛwo siwo na gaɖoɖo aɖe ate ŋu afia be enyo, ne ga meɖo zi eve o eye asitsɔwo ƒe xexlẽ sɔ, ke mefia nudzɔdzɔ aɖeke o. Sprout nye zi gbãtɔ si esia wɔ dɔ le production me le cryptocurrency si le agbe me dzi.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Ceremony

zk-SNARKs si le Sprout me hia public parameters aɖe, eye be woawɔ wo dedie la, ehia mɔ̃ ƒe ɖoɖo zi ɖeka si woyɔna be Ceremony. Ame ade siwo nɔ teƒe vovovo kple didi me la, ame sia ame wɔ dɔ kple ɣ secret aɖe, si woyɔna be toxic waste. Ne ame aɖeke ate ŋu afɔ nu siwo katã ƒo ƒu ake la, ate ŋu awɔ ZEC tso naneke me. Aɖaŋua trɔ afɔku sia zu se bɔbɔe aɖe: Ne ame ɖeka ko hã tsrɔ eƒe akpa la, woagate ŋu afɔ secret bliboa ƒo ƒu ake o, eyata ga ƒe aʋaʋã wɔwɔ megate ŋu adzɔ o. Ame siwo ƒe ŋkɔwo woɖe fia le dukɔ bliboa me la domee nye Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, kple Derek Hinch tso NCC Group. Ame ɖeka tia be yeanɔ ŋkɔmanya me.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Gɔmedzeƒe

Sprout nye gɔmeɖoƒe si tɔtrɔ sia tɔtrɔ si va megbe tu eɖe dzi. Esi mɔ̃ ƒe sewo trɔtrɔ ƒe mɔɖoɖo va kple Overwinter la, eɖe ŋkɔ na se gbãtɔwo be consensus branch id 0, si fia ko be mɔ̃ ƒe sewo trɔtrɔ aɖeke meva do o haɖe. Nu siwo katã va tso emegbe (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, kple nu siwo va yi edzi) le ɖoɖonu Sprout dze egɔme la dzi. Wogblɔ dzeɖoɖoa le August 2016 be genesis aɖe egɔme le October 28, Ceremony la wɔ dɔ le kwasiɖawo siwo nɔ eŋgɔ me, eye genesis gaɖoɖowo ƒuƒoƒe ƒe timestamp si woŋlɔ ɖe eme ɖaa fia be October 28, 2016, le 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Nyawo ƒe Gɔmeɖeɖe

| Nyagblɔɖi | Gɔme si le English bɔbɔe me |
|---|---|
| zk-SNARK | Zero-knowledge ɖaseɖigbalɛ si fia be gaɖoɖo aɖe nyo, ke mefia ame si do ga, ame si xɔ ga, alo gaƒe o |
| Shielded pool | Zcash ƒe akpa si le ɣaɣla me, afi si gaƒewo kple amewo ƒe nyawo le ɣaɣla me. Sprout gaƒuƒoƒo nye gbãtɔ |
| z-address and t-address | z-address nye ɣaɣla eye wòna nudzɔdzɔwo nɔ ɣaɣla me. t-address nye nuwo ƒe ʋuʋuɖi eye wòfia nudzɔdzɔwo le agbalẽ si le dukɔ bliboa ƒe asi me dzi |
| The Ceremony | Ƒe 2016 ame geɖe ƒe mɔ̃ ƒe ɖoɖo si wɔ Sprout ƒe public parameters eye wotsrɔ toxic waste la |
| Toxic waste | Secret key ƒe akpawo tso Ceremony me siwo wòhia be woatsrɔ, be woagate ŋu awɔ ZEC aʋaʋã o |
| Consensus branch id 0 | Ŋkɔ si wotsɔ na Sprout ƒe sewo, si fia be nye gɔmeɖoƒe hafi mɔ̃ ƒe sewo trɔtrɔ aɖeke ava do |

## Biabia Siwo Wobia Zi Geɖe

Ðe Sprout trɔm wò ZEC alo wò ɣaɣla egbea? Ao. Sprout nye xexlẽme, dzeɖoɖo si dze ɖoɖonu si wò ZEC le dzi egɔme. Wò coins kple wò ɣaɣla egbe dze gakotoku [wallet] kple ɣaɣla gaƒuƒoƒo si nèzã fifia ŋu, menye nu aɖeke si wòhia be nàwɔ tso Sprout ta o.

Nu ka ta ZIP ƒe xexlẽmɔ̃ aɖeke mele na Sprout o? ZIP ƒe mɔɖoɖo dze egɔme megbe, kple Overwinter ƒe mɔ̃ ƒe sewo trɔtrɔ. Sprout nye dzeɖoɖo gbãtɔ, si Zcash Protocol Specification kple Zerocash ƒe tutu si wotu eɖe dzi ɖe egɔme. ZIP 200 gblɔ Sprout ƒe nya ko le megbe kpɔkpɔ me, abe consensus branch id 0 ene, gɔmeɖoƒe hafi mɔ̃ ƒe sewo trɔtrɔ aɖeke ava do.

Ðe wòhia be maxɔ dzitsinya na ame ade siwo nɔ Ceremony me? Ao. Wotu mɔ̃ ƒe ɖoɖoa ale be wòhia be ame ɖeka ko nanɔ dzitsinya me. Ame sia ame nɔ secret ƒe akpa aɖe ŋu, eye ne ame ɖeka ko tsrɔ eƒetɔ la, woagate ŋu afɔ secret bliboa ƒo ƒu ake o eye ame aɖeke mate ŋu awɔ ZEC aʋaʋã o. Woɖe ame atɔ ƒe ŋkɔwo fia le dukɔ bliboa me, eye ame ɖeka nɔ ŋkɔmanya me.

Ðe Sprout gaƒuƒoƒo nye esi wò gakotoku zãna fifiaa? Ðewohĩ ao. Sprout nye ɣaɣla gaƒuƒoƒo gbãtɔ, ke mɔ̃ ƒe sewo trɔtrɔ siwo va megbe abe Sapling ene va kple ɣaɣla ƒe aɖaŋu si le kabakaba wu, eye gakotoku geɖewo zãna gaƒuƒoƒowo siwo yeyee egbe. Sprout gale vevie hã abe dɔ si ɖe ɖase be gaɖoɖowo si le ɣaɣla me eye woate ŋu aɖe eɖokui fia ate ŋu awɔ dɔ le network si le agbe me dzi ene.

Nu kae wɔ be Sprout to vovo na Bitcoin? Bitcoin ɖoa fexexe sia fexexe ɖe agbalẽ si le dukɔ bliboa ƒe asi me dzi, afi si gaƒewo kple gaɖoƒe ƒe dzesiwo le ʋuʋuɖi me. Sprout tsɔ ɣaɣla gaɖoɖowo kpe ɖe eŋu, siwo ɣlaa ame si do ga, ame si xɔ ga, kple gaƒe la, ke wòna network la ate ŋu aka ɖe edzi be gaɖoɖoa nyo. Ewɔ nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo hã ɖe eŋu, ale be mɔ eve siawo katã le ɖoɖonu ma ke dzi.

## Do wò gɔmesese kpɔ

Sprout woyɔna zi geɖe be mɔ̃ ƒe sewo trɔtrɔ kple dzeɖoɖo ƒe teƒe. Nu ka ta esia menye nyateƒe bliboa o?

<details>
<summary>Ŋuɖoɖo</summary>

Sprout nye Zcash ƒe dzeɖoɖo gbãtɔ, menye mɔ̃ ƒe sewo trɔtrɔ si va megbe o. Esi wòdze egɔme tso genesis gaɖoɖowo ƒuƒoƒe (gaɖoɖowo ƒuƒoƒe 0) dzi le October 28, 2016 la, dzeɖoɖo ƒe teƒe aɖeke mele si wòate ŋu atɔ asi afia o. Mɔ̃ ƒe sewo trɔtrɔ ƒe mɔɖoɖo va megbe eye eɖe ŋkɔ na Sprout ƒe sewo be consensus branch id 0, gɔmeɖoƒe hafi mɔ̃ ƒe sewo trɔtrɔ aɖeke ava do.
</details>

### Nu Siwo Wòate Ŋu Azã

[ZIP 200: Network Upgrade Mechanism](https://zips.z.cash/zip-0200)

[Zcash mɔ̃ ƒe sewo trɔtrɔwo](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout ƒe dzeɖoɖo](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Ceremony ƒe Ŋuɖoɖo](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Kpɔ Hã

[Ɣaɣla Gaƒuƒoƒowo](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash Mɔ̃ ƒe Sewo Trɔtrɔwo](../start-here/network-upgrades)

[Nu kae nye ZEC eye Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Series: [Mɔ̃ ƒe sewo trɔtrɔwo ƒe index](../start-here/network-upgrades) · Esi kplɔe ɖo: [Overwinter](../zcash-tech/overwinter)
