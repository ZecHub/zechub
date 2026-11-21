<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> NU7 ŋdi e le Mainnet le Zcash gaƒuƒoƒo 3,543,405 le November 6, 2026 (02:34 UTC; le November 5 ŋdi le US ƒe ɣeyiɣiwo me), eye wòli tegbee tso esia megbe.

Nukunu si nànya: nu siwo NU7 trɔ (gaƒuƒowo bɔbɔ wu, ɣaɣla dɔwɔwɔ ƒe sewo, adzɔ ƒe trɔtrɔ, version 4 gaɖoɖowo ƒe nuwuwu), nu siwo wòtrɔ me, kple nu siwo ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔla, gakotokuwo, gatrɔƒewo kple nukulawo wɔ.

NU7 nye Zcash [mɔ̃ ƒe sewo trɔtrɔ](../start-here/network-upgrades), si [ZIP 259](https://zips.z.cash/zip-0259) de edzi. Etrɔ gaƒuƒowo dome ƒe ɣeyiɣi tso sekɔnd 75 yi sekɔnd 25, de ɖoɖoɖe ɖe ɣaɣla dɔwɔwɔ siwo ate ŋu akpe ɖe gaƒuƒoƒo ɖeka ŋu ŋu, eye wòdze adzɔ ƒe 60% ɖe dzodzo me, be woate ŋu agbugbɔe ana nukulawo le etsɔ. Etrɔ version 4 gaɖoɖowo hã zu nu siwo nye nu vɔ̃, eye wòtsɔ xexlẽƒe la de Sprout gaƒuƒoƒo xoxo la nu. Meɖo gaɖoɖo ƒe nɔnɔme yeye aɖeke ɖe eme o. Eƒe gbegbɔgblɔ ɖi ƒe ɖoƒe nye `0x77190ad9`.

Nu ka ta esia le vevie. Le NU7 ŋgɔ la, nèlea ɣeyiɣi sekɔnd 75 abe edziɖoɖo gbãtɔ ƒe ɣeyiɣi ene, eye esia le bɔbɔe wu na nudzraƒe, gatrɔƒe ƒe deposit alo ɖoɖonu geɖe dome ɖɔli ɖɔli. NU7 ɖeɖe sia ɖe ɣeyiɣi sekɔnd 25 gbɔ, eye wòmekpɔ ZEC bubu ɖe eme o: gaƒuƒoƒo ɖeka ƒe fetu ɖe afã etɔ̃ me, ale be dɔgbeba ƒe ɖoɖoɖe kple esime xoxo. Eya hã nye mɔ̃ ƒe sewo trɔtrɔ gbãtɔ si tsɔ mɔ̃ aɖe ɖoɖe eme, si le ŋuɖoɖo le mɔ̃ ƒe dedie ŋu esime gaƒuƒoƒo ƒe fetuwo dze ɖeɖe.

Èle Zcash me yeye? Dze egɔme kple [ZEC ka nye, eye Zcash](../start-here/what-is-zec-and-zcash) kple [gaƒuƒoƒo ɣaɣlawo](../using-zcash/shielded-pools), eye nàtrɔ ava afisia.

## TL;DR

Le nyagblɔɖi bɔbɔe me: gaƒuƒowo vaa le sekɔnd 25 siaa, ZEC yeye siwo tsɔna dɔgbeba me mele susɔ o, adzɔ ƒe akpa aɖe wotsɔna ɖoɖi na nukulawo le etsɔ, eye Sprout gaƒuƒoƒo xoxo la ku.

- **Gaƒuƒowo le sekɔnd 25** ([ZIP 218](https://zips.z.cash/zip-0218)): edziɖoɖo gbãtɔ vaa le sekɔnd 25 me, eye le sekɔnd 75 me o. Gaƒuƒoƒo ɖeka ƒe sɔŋkɔ dzɔ tso 1.5625 yi 0.52083333 ZEC, ale be ZEC abe 1,800 ene ɖe fu na wò dɔgbeba siaa.
- **Se siwo do ɖe ɣaɣla dɔwɔwɔ ŋu** (ZIP 218): gaƒuƒoƒo ɖeka me, ɣaɣla dɔwɔwɔ 330 gɔmeɖeɖe wu o le gaƒuƒoƒo katãwo me, eye gaƒuƒoƒo ɖeka-ɖeka ƒe gɔmeɖeɖe hã le, be gaƒuƒoƒo ƒe seŋkɔkɔ kple gakotokuwo ƒe sync ƒe asixɔxɔ le eme wu si wòle tsã.
- **Mɔ̃ ƒe Dedie Ŋuɖoɖo Mɔ̃** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): gaƒuƒoƒo ɖeka me la, transaction ƒe adzɔ 60% tsoa dzodzo me, eye woagbugbɔe ana nukulawo le etsɔ. Woawɔ esia tso gaƒuƒoƒo 8,939,664 (woɖo ŋu be around February 2031). Supply ƒe gɔmeɖeɖe 21 million mele trɔ o.
- **Version 4 gaɖoɖowo nye nu siwo nye nu vɔ̃** ([ZIP 2003](https://zips.z.cash/zip-2003)): gakotokuwo ele be woawɔ v5 alo v6 gaɖoɖowo. Sprout ate ŋu awɔ dɔ kple v4 ko, ale be nuwo siwo susɔ le Sprout me fifia tsi tsitsi.
- **Software:** [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) kple siwo va le megbe de NU7 ƒe sewo dzi. `zcashd` release aɖeke me li si NU7 ƒe kpekpeɖeŋu le eme o.

## Nɔnɔmetata ƒe kɔkpɔe

Bu ɖoɖonu la abe trɛn ƒe mɔ ene. Le NU7 ŋgɔ la, trɛn dzea mɔ le sekɔnd 75 siaa, eye ate ŋu atsɔ amewo siwo ate ŋu ade 2 MB me. NU7 ɖea trɛn ɖe mɔ dzi le sekɔnd 25 siaa, dea fetu na trɛn ƒe dɔwɔla siaa abe tsã ƒe fetu ƒe afã etɔ̃ me ene be dɔgbeba ƒe nu wòatsɔ esime xoxo, eye wòtsɔ se aɖe de eme ɖe ame siwo nye dzidzedze kpekpe (ɣaɣla dɔwɔwɔ) si ate ŋu akɔ trɛn ɖeka me ŋu, ale be trɛn aɖeke mate ŋu anɔ ŋuɖoɖo te sesẽ wu o.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Nu siwo NU7 trɔ

### Gaƒuƒoƒo ƒe gɔmeɖeɖe ƒe ɣeyiɣi sekɔnd 25 (ZIP 218)

- Gãmeɖeɖe ƒe trɔtrɔ fifia ɖoa gaƒuƒoƒo ɖeka ɖe sekɔnd **25** me, eye le sekɔnd 75 me o, ale be gaƒuƒoƒo vaa zɔzɔ etɔ̃.
- Gaƒuƒoƒo ɖeka ƒe sɔŋkɔ ɖe afã etɔ̃ me: **0.52083333 ZEC** gaƒuƒoƒo ɖeka le halving ƒe ɣeyiɣi si me míele fifia (esime wòle 1.5625 ZEC). Dɔgbeba ƒe ɖoɖoɖe le abe 1,800 ZEC ene (gaƒuƒowo 3,456 le dɔgbeba me, si ƒe xexlẽme tsã nye 1,152).
- Halving vaa zɔ le ƒe ene siaa. Esi gaƒuƒowo bɔbɔ wu ta la, halving si gbɔna le gaƒuƒoƒo **6,132,390** me, woɖo ŋu be late November 2028 le gaƒuƒoƒo sekɔnd 25 ƒe ɣeyiɣi me (ZIP 259).
- Gãmeɖeɖe ƒe averaging window to tso gaƒuƒowo 17 yi **102**, ale be trɔtrɔ la gɔmeɖeɖe la le abe ɣeyiɣi si sɔ tsã ene.
- Transaction ƒe expiry default to tso gaƒuƒowo 40 yi **120**, ale be wòle abe miniti 50 ene.

### Se siwo do ɖe ɣaɣla dɔwɔwɔ ŋu (ZIP 218)

Gaƒuƒoƒo ɖeka sia sia le budget si wogbɔna kple gaƒuƒoƒo ɖeka ƒe gɔmeɖeɖe:

| Se | Gaƒuƒoƒo ɖeka me |
|---|---|
| ɣaɣla dɔwɔwɔ katã le gaƒuƒoƒowo dome | 330 |
| Orchard dɔwɔwɔ | 330 |
| Ironwood dɔwɔwɔ | 330 |
| Sapling inputs + outputs | 300 |
| Sprout JoinSplits | Womeɖe mɔ na wò o |

Le NU7 ŋgɔ la, gaƒuƒoƒo 2 MB blibo ate ŋu akpe abe Orchard 617 ene alo Ironwood dɔwɔwɔwo, alo Sapling outputs abe 2,107 ene, eye se aɖeke mele gaƒuƒoƒo-ɖeka-ɖeka ŋu o. ZIP 218 de se yeye la ɖe eme be, ne gaƒuƒowo zi etɔ̃ hã la, gaƒuƒoƒo si le sesẽ wu na ɣaɣla dzesi ŋɔŋlɔwo kple gakotokuwo ƒe sync le eme wu si wòle tsã (kpɔɖeŋu, nyatakaka si hiã ƒe mɔ ƒe ɣaɣla sync bandwidth ɖeɖe tso abe 271 yi 169 MB ɖe dɔgbeba me), eye Orchard-protocol ƒe dɔwɔwɔ ƒe nyawo bɔ wu enu (tso abe gaɖoɖowo 2 ƒe transactions 2.9 yi 6.6 gaɖoɖo ɖe sekɔnd ɖeka).

### Mɔ̃ ƒe Dedie Ŋuɖoɖo Mɔ̃ (ZIP 235 + ZIP 237)

- **Adzɔ ɖeɖe (ZIP 235):** Gaɖoɖo ƒe adzɔ 60% le gaƒuƒoƒo ɖeka me tsoa dzodzo me; 40% si susɔ la yi nukula gbɔ abe tsã ene. Le burn ƒe nɔnɔme me o la, ZEC si wotsɔ ɖe dzodzo me la le xexlẽme me be woate ŋu agbugbɔe ade eme le etsɔ.
- **Gbugbɔɖeɖe (ZIP 237):** ZEC si wotsɔ ɖe dzodzo me la le mɔ̃ ƒe consensus state si nye amewo katã ƒe si woyɔna be NSM Value Balance me. Woɖe eƒe gɔmeɖeɖe ɖe NU7 me kple xɔxɔ si nukulawo ɖe ɖoɖi le tsã me. Tso gaƒuƒoƒo **8,939,664** (woɖo ŋu be February 2031 ŋu) me, gaƒuƒoƒo sia sia ɖea balance la ƒe akpa ɖoɖo aɖe kpe ɖe halving ƒe ɖoɖo dzi.
- Supply ƒe gɔmeɖeɖe meɖe ɖe dzi o. Ne balance la meɖe eme ɖo la, ɖoɖoɖe la sɔ tsã ƒe halving ƒe ɖoɖo.
- NU7 meɖe [ZIP 233](https://zips.z.cash/zip-0233) (ameawo ƒe ɖeɖe si womeɖo se ɖe eme o) alo [ZIP 234](https://zips.z.cash/zip-0234) (tsɔ halvingwo ɖeɖe ɖo, eye wòtsɔ curve si yɔna ɖe dzi ɖo). Coinholder ƒe pollwo tia halving si le edzi le ZIP 237 me.
- Xexlẽmeawo (368.58 ZEC, akpa si wotsɔna gbugbɔ ɖe gaƒuƒoƒo sia sia me, eye nu si tae wòwɔna tso gaƒuƒoƒo 8,939,664 me) le [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md) axa dzi.

### Version 4 gaɖoɖowo womeɖe mɔ na wò o (ZIP 2003)

- Tso NU7 megbe la, version 4 transaction sia sia nye nu siwo nye nu vɔ̃: menye Sprout transfers ko o, ke nuwo siwo nye transparent-only kple Sapling transactions hã, siwo wode v4 format me. Version 5 (NU5) kple version 6 ([Ironwood](../zcash-tech/ironwood)) transactions mele trɔ o.
- Sprout transfers le v4 format me ko, ale be [Sprout](../zcash-tech/sprout) gaƒuƒoƒo la womate ŋu agbugbɔe aɖo o. Kpɔ [Nuwo Xɔxɔ Gbɔ](../using-zcash/recovering-funds).

### Nu sue siwo wòtrɔ

- Development-fund ƒe sewo trɔ be funding streams nawɔ dɔ kple sekɔnd 25 gaƒuƒowo ([ZIP 207](https://zips.z.cash/zip-0207) Revision 2, [ZIP 214](https://zips.z.cash/zip-0214) Revision 3), eye funding-stream gaɖoƒe ƒe dzesiwo ƒe xexlẽme hã wòtrɔ ([ZIP 2008](https://zips.z.cash/zip-2008)).
- NU7 ɣaɣla dzesi ŋɔŋlɔwo le Mainnet ŋu mɔ̃ ƒe protocol version **170190** ɖe go, eye wòdze peer xoxo siwo wòɖe le activation megbe.

## Nu siwo NU7 mewɔ o

- **Mewɔ transaction format yeye aɖeke o.** NU7 meɖe mɔ na wallet kple parser ƒe migration bubu o, esi Ironwood de v6 transactions ɖe eme vɔ ene.
- **Metrɔ supply cap alo halving ƒe ɣeyiɣi ƒe ƒe ene o.**
- **Metrɔ coinbase maturity o.** Ga si wotsɔ nukuku me kple nukula la ele be wòanɔ gaƒuƒoƒowo 100 te hafi wòate ŋu azã (fifia abe miniti 42 ene, eye tsã la abe ɣeyiɣi ga 2 ene).
- **Meɖe ɣaɣla gaƒuƒoƒo yeye aɖeke ɖe eme o.** Ironwood (NU6.3) nye gaƒuƒoƒo si nye yeye wu; Orchard le spend-only, abe si wòle tso Ironwood ene.

## Nu si dɔwɔla ƒe akpa siawo wɔ

- **ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔlawo:** zã [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) alo esi va le megbe. Zebra 7 trɔ eƒe database tso format v28 yi v29 le eƒe gɔmedzedze gbãtɔ me, eye Zebra 6.x mate ŋu axle v29 o, ale be ɖe eŋu kopi hafi wòatrɔ `state/v28`. `zcashd` meɖe NU7 release aɖeke ɖe go o (eƒe release si nyui wu nye 6.20.0, tso June 2026); Zebra ƒe book ƒe [zcashd API migration ƒe mɔfiafia](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) ɖe `zcashd` RPC sia sia ƒe trɔtrɔ ɖe Zebra, [Zallet](../zcash-tech/zallet) alo eƒe replace ƒe mɔ. Kpɔ [ɣaɣla dzesi ŋɔŋlɔwo blibowo](../zcash-tech/full-nodes) kple [Ŋuɖoɖo Ŋu Ɖoɖo Zebra mɔfiafia](../guides/hardened-zebrad).
- **Gakotokuwo:** Ɖe nuwɔwɔ v4 transactions nu, zã 120-block expiry default, ɖo anchor depth ƒe gaƒuƒowo 3 dzi (fifia abe miniti 1.25 ene), eye wɔ gaƒuƒoƒo sia sia ƒe dɔwɔwɔ ƒe sewo dzi. Transaction si wòɖo se aɖe nu le eɖeka me mate ŋu azu nukuku me o.
- **Gatrɔƒewo kple fexexe servicewo:** edziɖoɖo sia sia vaa le sekɔnd 25 me fifia, ale be edziɖoɖo xexlẽme si sɔ la le ɣeyiɣi ƒe afã etɔ̃ me. Gbugbɔ deposit ƒe edziɖoɖo ƒe xexlẽme kpɔ, ɖeɖe ɣeyiɣi kple dedie si wòdi ŋu, eye mègalé xexlẽme xoxo la ɖe asi kple ɖeɖe ɖeɖe o.
- **Nukulawo kple gaƒuƒowo:** nukuku ƒe software kple template ele be woazã sɔŋkɔ yeye, adzɔ ƒe maɖeɖe kple dɔwɔwɔ ƒe sewo; gaƒuƒowo si wotsɔ se xoxo wɔ la wogbea.

## Nuwɔwɔ vɔ̃ siwo dzea edzi

- **"Nye ɣaɣla dzesi ŋɔŋlɔ xoxo la le dɔ wɔm, ale be nuwo le nyuie."** NU7 ko, ZIP 259 ɖe se si wònye tsã, be software si wòva hafi mɔ̃ ƒe sewo trɔtrɔ la nàna eɖokui nàdzudzɔ dɔ hafi activation, ɖa. 6.x Zebra alo `zcashd` ɣaɣla dzesi ŋɔŋlɔ ate ŋu anɔ dɔwɔm le se xoxo me, eye wòanye dzesi me o be wòɖe le ɖoɖonu ma ŋu. Kpɔ be gaƒuƒoƒo si wòɣla la le 3,543,405 ɖɔɖɔ ɖe dzi, eye wòle mɔfiaɖe aɖe ƒe gaƒuƒoƒo kple vɔ ɖeka.
- **"Gaƒuƒowo bɔbɔ wu la, ZEC yeye siwo tsɔna ɖe go."** Ao. Gaƒuƒoƒo ɖeka ƒe sɔŋkɔ ɖe afã etɔ̃ me, ale be dɔgbeba ƒe ɖoɖoɖe mele trɔ o.
- **"Adzɔ ƒe 60% wotɔa forever."** Ao. Woɖea wo ɖe dzodzo me, eye NSM gbugbɔe ana nukulawo le etsɔ; supply ƒe gɔmeɖeɖe mele trɔ o.
- **"Sprout users ko wòxɔ v4 ƒe trɔtrɔ ŋu."** Gakotoku alo script si le v4 transaction wɔm, siwo nye transparent-only kple Sapling hã, dɔ wɔwɔ vɔ. V4 transactions si nèle wòna la wòzu nu siwo nye nu vɔ̃ le activation me, eye asidede agbalẽ te yeye ko mate ŋu atrɔ wo zu nu siwo wòle o.
- **"Gaƒuƒowo ƒe xexlẽme ɖoɖowo tsɔa ɖe dzi."** Nu siwo katã wotsɔna ɖe gaƒuƒowo me (confirmation, expiry, lock times, timeouts) vaa zɔ zɔ etɔ̃ le ɣeyiɣi vavã me fifia.

## Gbegbɔgblɔ ƒe ŋɔŋlɔ

| Nu | Gɔmeɖeɖe le English bɔbɔe me |
|---|---|
| Block target spacing | Gaƒuƒoƒo dome ƒe ɣeyiɣi ƒe ɣeyiɣi si gãmeɖeɖe ƒe trɔtrɔ di be wòanye: sekɔnd 25 tso NU7 |
| Block subsidy | ZEC yeyewo si wotsɔa wɔ gaƒuƒoƒo sia sia me, si woma na nukula kple development-fund ƒe streamwo |
| Shielded action | ɣaɣla dɔwɔwɔ ɖeka si wòwɔna le transaction me (Orchard alo Ironwood dɔwɔwɔ, alo Sapling input alo output) |
| Network Sustainability Mechanism (NSM) | Se siwo tsɔa adzɔ ƒe akpa aɖe tsoa dzodzo me, eye wogbugbɔna wo ɖe nukulawo gbɔ le etsɔ |
| NSM Value Balance | Xexlẽme si wotsɔa dzra ɖo le public me, si nye ZEC siwo wotsɔ tsoa dzodzo me, eye wole gbugbɔɖeɖe la lalam |
| Version 4 transaction | Transaction ƒe format tso Sapling, si NU7 trɔ zu nu si wòle o; v5 kple v6 le nu siwo wòle |
| Consensus branch ID | Xexlẽme si tsɔa gbegbɔgblɔ ɖi ƒe se aɖe dzesi; asidede agbalẽ te wɔ ɖoɖo kple eƒe, ale be transaction si woɖo asidede kple se xoxo la nye nu si wòle o le se yeyewo me |

## Nyabiase kple ŋuɖoɖo

**Ɣekaɣi NU7 dze dɔ?** Le Mainnet gaƒuƒoƒo 3,543,405 dzi le November 6, 2026, 02:34 UTC. Testnet dze dɔ earlier, le gaƒuƒoƒo 4,465,026 dzi le October 4, 2026.

**Gaƒuƒoƒo ƒe fetu trɔ?** Gaƒuƒoƒo ɖeka la, ee: 0.52083333 ZEC, esi wòle tsã 1.5625 ZEC. Dɔgbeba la, ao: abe ZEC 1,800 ene ɖe mɔ sia mɔ.

**Nye Sprout ZEC ku?** Womate ŋu atrɔe o, elabena Sprout ƒe ɖoɖowo hia v4 transactions, eye fifia womeɖe mɔ na wo o. Kpɔ [Nuwo Xɔxɔ Gbɔ](../using-zcash/recovering-funds) be nànya nu si esia fia le nuwɔwɔ me.

**Ele be nàxɔ gakotoku yeye?** Ele be gakotoku version si dze NU7 dzi nàzã. ZecHub ƒe [Gakotokuwo](../using-zcash/wallets) ƒe axa fia gakotoku siwo le NU7 ƒe ɖoɖo dzi.

**Ɣekaɣi fee ƒe gbugbɔɖeɖe dzea egɔme?** Mainnet gaƒuƒoƒo 8,939,664 me, woɖo ŋu be around February 2031, ne gaƒuƒowo ɖo ɣeyiɣi sekɔnd 25 ƒe average dzi.

**Nu ka ta NU7 skip transaction format yeye?** Be wòatsɔ wallet kple parserwo si second migration megbe Ironwood ƒe v6 format la nàdzudzɔ dɔ, eye elabena fee split xexlẽme wòwɔna le gaƒuƒoƒo ɖeka sia sia, ale be transaction ƒe field yeye aɖeke mehiã o.

## Ɖo ŋku ɖe wò nyanya ŋu

1. Nu ka ta dɔgbeba ZEC ƒe ɖoɖoɖe mele trɔ o le NU7 megbe?
2. Nu ka dzɔna kple adzɔ ƒe 60% si wotsɔna tsoa dzodzo me?
3. Nu ka ta womate ŋu aspend Sprout nuwo o le NU7 megbe?
4. Nu ka ta ɣaɣla dzesi ŋɔŋlɔ si womeɖe mɔ na wò ƒe dɔwɔwɔ kpɔe hafi wò nyo wu le mɔ̃ ƒe sewo trɔtrɔ sia me?

Ŋuɖoɖowo: (1) gaƒuƒoƒo ɖeka ƒe sɔŋkɔ ɖe afã etɔ̃ me, eye gaƒuƒowo zi etɔ̃ wu; (2) woɖea wo ɖe NSM Value Balance me, eye wogbugbɔna wo ana nukulawo tso gaƒuƒoƒo 8,939,664; (3) Sprout ƒe spend le v4 format me ko, si NU7 trɔ zu nu si wòle o; (4) ZIP 259 ɖe automatic shutdown ƒe se la ɖa, ale be ɣaɣla dzesi ŋɔŋlɔ xoxo ate ŋu anɔ dɔwɔm le ɖoɖonu si menye dzesi o ŋu.

### Nunya Ƒe Nyawo

[ZIP 259: NU7 Mɔ̃ ƒe sewo trɔtrɔ](https://zips.z.cash/zip-0259) ƒe dedziɖeɖe

[ZIP 218: Gaƒuƒoƒo ƒe Gɔmeɖeɖe Ƒe ɣeyiɣi sekɔnd 25](https://zips.z.cash/zip-0218)

[ZIP 235: Tsɔ Transaction Ƒe Adzɔ 60% Tso Dzodzo Me](https://zips.z.cash/zip-0235)

[ZIP 237: Mɔ̃ ƒe Dedie Ŋuɖoɖo Mɔ̃: Halving Si Le Edzi Ŋu Ɖoɖo](https://zips.z.cash/zip-0237)

[ZIP 2003: Meɖe Mɔ Na Version 4 Transactions O](https://zips.z.cash/zip-2003)

[Zebra 7.0.0 ƒe release ƒe nyatakaka](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Community Forum: NU7 Ɣeyiɣi ƒe ɖoɖo](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Axa bubu siwo do ƒome

| Axa | Nu ka ta wòdo ƒome |
|---|---|
| [Ironwood](./Ironwood.md) | mɔ̃ ƒe sewo trɔtrɔ si va tsã le series la me, si de v6 gaɖoɖowo ɖe eme |
| [Gaƒuƒowo ƒe sekɔnd 25 ƒe Trɔtrɔ Vavã](../research/what-25-second-blocks-actually-change) | gãmeɖeɖe le gaƒuƒowo ƒe ɣeyiɣi bɔbɔ wu ŋu |
| [Mɔ̃ ƒe Nɔnɔme Ɖoɖo Ƒe Mɔ](./Network_Sustainability_Mechanism.md) | ale si adzɔ ƒe ɖeɖe kple agbagbaɖoɖo gbugbɔwɔwɔ NU7 siwo wòwɔ dɔ la nye, kple xexlẽdzesiwo |
| [Sprout](./Sprout.md) | gaƒuƒoƒo si NU7 ɖe xexlẽme |
| [Gaɖoɖowo ƒe Gbugbɔxɔxɔ](../using-zcash/recovering-funds) | nu si Sprout ƒe freeze fia na nu xoxo |
| [Gaɖoɖowo](../using-zcash/transactions) | expiry kple edziɖoɖo le NU7 megbe |

---

Series: [Mɔ̃ ƒe sewo trɔtrɔ ƒe xexlẽme](../start-here/network-upgrades) · Esi va tsã: [Ironwood](../zcash-tech/ironwood)
