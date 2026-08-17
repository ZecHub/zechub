<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dzomeŋɔli

> Dzomeŋɔli yi agbe le Zcash mainnet dzi le block 347,500 (June 26, 2018 UTC).

Nusi nàtsɔ adzoe: alesi Zcash srɔ̃ alesi wòatrɔ eya ŋutɔ ƒe sewo dedie, kple nusita gɔmeɖoanyi ma na be ŋgɔyiyi ɖesiaɖe si woawɔ emegbe, si adze egɔme tso Sapling dzi, te ŋu dzɔ.

Dzomeŋɔli nye Zcash [network ƒe ŋgɔyiyi](../start-here/network-upgrades), si nye gbãtɔ le network la ƒe gɔmedzedze megbe. Woɖe egɔme le Zcash ƒe Ŋgɔyiyi ƒe Aɖaŋuɖoɖo geɖewo me: [ZIP 200 ƒe xexlẽme](https://zips.z.cash/zip-0200), [ZIP 201 ƒe xexlẽdzesi](https://zips.z.cash/zip-0201), [ZIP 202 ƒe xexlẽdzesi](https://zips.z.cash/zip-0202), [ZIP 203 ƒe xexlẽdzesi](https://zips.z.cash/zip-0203), kple [ZIP 143 ƒe xexlẽdzesi](https://zips.z.cash/zip-0143). Overwinter metsɔ akpoxɔnu yeye aɖeke kpee o. Ke boŋ ena ɖoɖoa sesẽ ale be etsɔme tɔtrɔwo nate ŋu aɖo ɖe amewo dedie. Woŋlɔ asitɔtrɔa ɖe agbalẽ me to... [Electric Coin Company](../zcash-organizations/electric-coin-company) le Zcash ƒe dodoɖeŋgɔ ƒe axa si dziɖuɖua da asi ɖo dzi.

Nusitae esia le vevie ɖo. Blockchain si le agbe ƒe sewo tɔtrɔ nye afɔku. Get it wrong eye network la ƒe tɔtrɔ eve ate ŋu malɔ̃ ɖe edzi o, alo woate ŋu awɔ asitsatsa si woɖo na kɔsɔkɔsɔ ɖeka ƒe kɔpi ɖe bubu dzi. Do ŋgɔ na Overwinter la, mɔnu aɖeke menɔ Zcash si si sɔ, si me woate ŋu agbugbɔ aƒoe le si dzi woato awɔ ɖoɖo ɖe se ƒe tɔtrɔ ŋu o. Dzomeŋɔli ɖɔ ema ɖo. Ena Zcash wɔ ɖoɖo si wowɔ le se nu hena asitɔtrɔwo eye, nenema ke wòle vevie nenema ke, mɔ eve dzi gbugbɔgaƒoƒo takpɔkpɔ, eyata womate ŋu agbugbɔ adzɔnuwɔna si sɔ le sewo ƒe hatsotso aɖe te le bubu te o. Gɔmeɖoanyi mae na be Sapling, kple ŋgɔyiyi ɖesiaɖe si wowɔ le esia megbe, te ŋu wɔa dɔ dzadzɛ.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Mɔnu si wozãna tsɔ doa nuwo ɖe ŋgɔe

Overwinter to Network Upgrade Mechanism vɛ, si gɔme woɖe le [ZIP 200 ƒe xexlẽme](https://zips.z.cash/zip-0200). Fifia ŋgɔyiyi ɖesiaɖe ɖea nu eve gɔme: alɔdze id si dzi woda asi ɖo si yɔa se siwo li fifia ƒe ŋkɔ, kple dɔwɔwɔ ƒe kɔkɔme, si nye mɔxenu si dzi se yeyeawo awɔ dɔ le. Esia naa fesre si me kɔ na amesiame si le Zcash kɔmpiuta dɔwɔɖoɖo zãm be wòawɔ yeye hafi atrɔ.

Dzomeŋɔli ŋutɔ wɔ dɔ le mainnet dzi le block 347,500.

[ZIP 201 ƒe xexlẽdzesi](https://zips.z.cash/zip-0201) kpɔa alesi nodes wɔa nu ɖe ​​wo nɔewo ŋu ƒo xlã ŋgɔyiyi aɖe gbɔ. Hafi woawɔ dɔ la, nodes lɔ̃a kadodo kple hati siwo zãa version ɖeka. Le dɔwɔwɔ me la, node aɖe tsoa kadodo me kple hati siwo le alɔdze si dzi woda asi ɖo bubu dzi, eyata network la ma dzadzɛ le se yeyeawo nu le esi teƒe be wòatɔtɔ.

## Gbugbɔ ƒo ametakpɔkpɔ

Gbugbɔgaƒoƒo nye ne ame aɖe xɔ asitsatsa si nɔ dɔ wɔm le kɔsɔkɔsɔ ɖeka dzi eye wògbugbɔe kaka ɖe kɔsɔkɔsɔ bubu dzi. Overwinter tsɔa asidede agbalẽ te ƒe ɖoɖo yeye aɖe si woɖe fia le... [ZIP 143 ƒe xexlẽdzesi](https://zips.z.cash/zip-0143). Ne gakotoku aɖe de asi asitsatsa aɖe te la, asidede agbalẽa te tsɔ eɖokui na kɔsɔkɔsɔ si li fifia ƒe alɔdzedɔwɔƒe ƒe id si dzi woda asi ɖo azɔ. Ðeko asitsatsa si wode asi na alɔdzedɔwɔƒe ɖeka mewɔa dɔ le alɔdze bubu aɖeke dzi o, le mɔ eveawo siaa nu. Emae nye nusi mɔ eve dzi gbugbɔgaƒoƒo takpɔkpɔ fia.

Esia wɔa dɔ asi le asi me kple version 3 ƒe asitsatsa ƒe ɖoɖo yeyea tso [ZIP 202 ƒe xexlẽdzesi](https://zips.z.cash/zip-0202), si woyɔna ɣeaɖewoɣi be Overwintered ƒe nɔnɔme. Etsɔa fOverwintered aflaga kple version group id kpena ɖe eŋu si naa eme kɔ be se siwo me nukpɔsusu ɖeka le ƒe hatsotso si me asitsatsa le. Abe viɖe si le akpa aɖe dzi ene la, asidede agbalẽ te ƒe ɖoɖo yeyea na alesi woɖoa kpe asitsatsa siwo me kɔ kabakaba dzi hã nyo ɖe edzi.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Asitsatsa ƒe ɣeyiɣia wu enu

[ZIP 203 ƒe xexlẽdzesi](https://zips.z.cash/zip-0203) wotsɔ asitsatsa ƒe ɣeyiɣi si wu enu kpee. Fifia adzɔnuwɔna ateŋu aɖo ɣeyiɣi ƒe nuwuwu ƒe mɔxexe ƒe kɔkɔme. Ne womekue vaseɖe kɔkɔƒe ma o la, nodes tsɔe ƒua gbe tso mempool, si nye asitsatsa siwo ŋu womeɖo kpee o ƒe lalaƒe. Do ŋgɔ na esia la, asitsatsa aɖe ate ŋu anɔ anyi ɣeyiɣi didi aɖe si ŋu womeɖo kpee o. Nuwuwu fia be asitsatsa si tsi anyi la kɔna le eɖokui si mlɔeba, si ɖea kakaɖedzimanɔamesi dzi kpɔtɔna na wò eye wònana mempool la meyɔna fũ kple asitsatsa xoxo siwo womeɖe tome o.

## Afisi wòsɔ le

Overwinter nye Zcash network ƒe tɔtrɔ gbãtɔ le October 2016 mainnet ƒe dodo megbe, eye woɖoe koŋ ɖoe ɖa do ŋgɔ na Sapling. Eƒe dɔe nye xɔtuɖaŋuwo, ke menye features o. Esi wòde mɔ̃ si wotsɔ trɔa asi le nu ŋu kple mɔ̃ si kpɔa eta gbugbɔgaƒoƒo gbã me la, ena mɔ si le dedie si dzi woato awɔ dɔ le tɔtrɔ ɖesiaɖe si woawɔ emegbe (Sapling, Blossom, Heartwood, Canopy, NU5, kple esiwo kplɔe ɖo) ŋu.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| Netwɔƒe ƒe ŋgɔyiyi (NU) | Tɔtrɔ si wowɔ ɖekae ɖe Zcash ƒe se siwo dzi woda asi ɖo ŋu, si wowɔ dɔ le block ƒe kɔkɔme si woɖo ɖi |
| Nubabla ƒe alɔdze id | Dzesidenu kpui aɖe si yɔa se siwo dzi woda asi ɖo ƒe hatsotso si li fifia |
| Dɔwɔwɔ ƒe kɔkɔme | Block si dzi network upgrade ƒe se yeyewo dze dɔwɔwɔ gɔme le |
| Gbugbɔ ƒoƒo takpɔkpɔ | Se si xea mɔ na asitsatsa si sɔ le kɔsɔkɔsɔ ɖeka dzi be woagazãe le bubu dzi o |
| Mempool ƒe ƒuƒoƒo | Asitsatsa siwo woɖe ɖe go gake womeɖe tome haɖe o ɖe block |
| Asitsatsa ƒe nuwuwu | Exiration block height si megbe woɖe asi le asitsatsa si womeɖe o ŋu |

## Nyabiasewo ƒe Nyabiasewo

Ðe Overwinter trɔ nye ZEC alo nye adzamenyawo? Ao, Overwinter metsɔ nu yeye aɖeke kpee o eye meka asi asitsatsa siwo ŋu wokpɔ ta na o. Enye pɔmpiwo hena asitɔtrɔ le etsɔme dedie. Womekpɔ ŋusẽ ɖe wò ga kple wò nyatakakawo dzi o.

Ðe Overwinter tsɔ Sapling alo adrɛs siwo wotsɔ akpoxɔnu ɖo kpeea? Ao, Overwinter metsɔ nu aɖeke si wotsɔ akpoxɔnu kpe ɖe eŋu o. Edzra anyigba ɖo ale be Sapling nate ŋu awɔ dɔ dedie emegbe.

Nukae nye alɔdze id si dzi woda asi ɖo? Enye ŋkɔ kpui aɖe si yɔa se siwo li fifia ƒe ŋkɔ. Adzɔnuwo tsɔa wo ɖokui nana ne wode asi ete, si nye nusi naa Zcash kpɔa eƒe gbugbɔgaƒoƒo ta.

Nukatae nyatakakatsoƒe aɖewo gblɔ be June 25 eye bubuwo gblɔ be June 26? Overwinter activated at 01:37 UTC on June 26, 2018. Ema nye zãtitina UTC megbe teti, eyata le Ɣetoɖoƒetɔwo ƒe ɣeyiɣi ƒe didime geɖewo me la, nutoa me gaƒoɖokui gakpɔtɔ xlẽa June 25. Enye block ma ke kple ɣeyiɣi ma ke.

Nukae asitsatsa ƒe nuwuwu nyo na? Efia be asitsatsa si meku gbeɖe o la manɔ anyi tegbee o. Le eƒe nuwuwu ƒe kɔkɔme megbe la, nodes tsɔe ƒua gbe, eyata màgblẽe ɖi anɔ akɔnta bum le fetu si tsi anyi ŋu o.

Ðe wòhiã be mawɔ nanea? No. Overwinter activated in 2018. Zcash gakotoku alo node ɖesiaɖe si li fifia la zɔna ɖe se siawo dzi xoxo.

## Do wò nugɔmesese kpɔ

Overwinter metsɔ nu yeye aɖeke si wotsɔ akpoxɔnu kpee kpee o. Eyata nukatae wobunɛ be enye ŋgɔyiyi vevitɔwo dometɔ ɖeka le Zcash ƒe ŋutinya me?

<details>
<summary>Answer</summary>

Elabena eyae tu mɔ̃ siwo dzi wotrɔ asi le emegbe ɖesiaɖe. Overwinter to Network Upgrade Mechanism kple mɔ eve dzi gbugbɔgaƒoƒo takpɔkpɔ vɛ, si na Zcash kpɔ mɔnu si sɔ, si le dedie be wòatrɔ eƒe se siwo dzi woda asi ɖo. Gɔmeɖoanyi ma manɔmee la, Sapling kple ŋgɔyiyi siwo wowɔ le emegbe mate ŋu awɔ dɔ dzadzɛ o.
</details>

### Nunɔamesiwo

[ZIP 200: Netwɔƒe ƒe Ðɔɖɔɖo ƒe Mɔnu](https://zips.z.cash/zip-0200)

[ZIP 201: Network Hatiwo Dzikpɔkpɔ na Dzomeŋɔli](https://zips.z.cash/zip-0201)

[ZIP 202: Version 3 Asitsatsa ƒe Nɔnɔme na Dzomeŋɔli](https://zips.z.cash/zip-0202)

[ZIP 203: Asitsatsa ƒe Nuwuwu](https://zips.z.cash/zip-0203)

[ZIP 143: Asitsatsa ƒe Asidede Asi ƒe Dzesidede na Dzomeŋɔli](https://zips.z.cash/zip-0143)

[Le Dzomeŋɔli me Network Upgrade](https://z.cash/upgrade/overwinter/)

### Kpɔe hã

[Zcash Network ƒe Ðɔɖɔɖowo](../start-here/network-upgrades)

[Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools)

[Nodes Blibowo](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Nukae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash)

---

Siwo kplɔ wo nɔewo ɖo: [Network Upgrades ƒe dzesi](../start-here/network-upgrades) · Si do ŋgᴐ: [Sprout](../zcash-tech/sprout) · Esi kplᴐe ɖo: [Sapling](../zcash-tech/sapling)
