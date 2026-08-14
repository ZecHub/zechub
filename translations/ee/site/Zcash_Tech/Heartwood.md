<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dzimeƒu ƒe ati

> Heartwood yi agbe le Zcash mainnet dzi le block 903,000 (July 16, 2020 UTC).

Nusi nàtsɔ adzoe: alesi Heartwood na tomenukulawo xɔa woƒe block teƒeɖoɖowo tẽe ɖe adrɛs siwo wotsɔ akpoxɔnu wɔe me, kple alesi wòna Zcash ƒe dɔwɔwɔ ƒe kpeɖodzinyawo te ŋu lé ŋku ɖe asisi siwo ƒe kpekpeme le bɔbɔe ŋu.

Dzimeƒu nye Zcash [network ƒe ŋgɔyiyi](../start-here/network-upgrades), si nye consensus-rule hard fork si ƒe dɔwɔwɔ gɔme woɖe le [ZIP 250 ƒe xexlẽme](https://zips.z.cash/zip-0250). Eƒo tɔtrɔ eve siwo wowɔ ɖe nɔnɔmewo ŋu nu ƒu: [ZIP 213 ƒe xexlẽdzesi](https://zips.z.cash/zip-0213) (Sshielded Coinbase) kple [ZIP 221 ƒe xexlẽdzesi](https://zips.z.cash/zip-0221) (FlyClient) ƒe nyatakakadzraɖoƒea. Heartwood nye Zcash ƒe network ƒe tɔtrɔ gã enelia, eye wowɔ ɖeka do alɔe tso... [Electric Coin Company](../zcash-organizations/electric-coin-company) kple... [Zcash Foundation](../zcash-organizations/zcash-foundation). Abe Zcash ƒe dodoɖeŋgɔ ɖesiaɖe ene la, eɖo alɔdze id yeye si dzi woda asi ɖo, tag si naa mɔ eve dzi gbugbɔgaƒoƒo takpɔkpɔ ale be womate ŋu agbugbɔ asitsatsa si wotu le se yeyeawo te agbugbɔ aƒo le kɔsɔkɔsɔ xoxoa dzi o, kple eƒe megbetɔ.

Heartwood wɔa dɔ le block ƒe kɔkɔme si woɖo ɖi (903,000), ke menye le gaƒoɖokui ƒe ɣeyiɣi si woɖo ɖi me o, eyata miniti si tututu nàkpɔ le dashboard dzi ate ŋu ato vovo vie tso teƒe ɖeka yi bubu. Block la, kple ɣeyiɣia, nye nu ɖeka.

Nusitae esia le vevie ɖo. Tomenukulawo kpɔa ZEC si woɖe yeyee ɣesiaɣi si woɖe tomenukuƒe aɖe. Do ŋgɔ na Heartwood la, ele be ga ma nadze ɖe adrɛs si me kɔ, si nye dutoƒonuƒo. Ame sia ame ate ŋu akpɔ ga home si tomenukulawo kpɔna kple afisi gakuawo yina kplɔe ɖo. Heartwood na teƒeɖoɖo ma yi adrɛs si ŋu wokpɔ akpoxɔnu ɖo dzi tẽ boŋ, ale be tomenukulawo ƒe fetu ate ŋu anɔ ame ŋutɔ si. Ena hã be gakotoku siwo ƒe kpekpeme le bɔbɔe kple kɔsɔkɔsɔ bubuwo nate ŋu alé ŋku ɖe Zcash ƒe dɔwɔwɔ ƒe kpeɖodzi ŋu evɔ womaɖe kɔsɔkɔsɔ bliboa ƒe kɔpi o.

## Gaku si wotsɔ akpoxɔnu wɔe

Coinbase ƒe asitsatsa nye asitsatsa tɔxɛ si xea block ƒe fetu. Do ŋgɔ na Heartwood la, ele be eƒe nusiwo dona tso eme nadze ƒã, eyata tomenukulawo ƒe ZEC si wowɔ yeyee la dzea agbe gɔme ɣesiaɣi le dutoƒonuƒo me. Heartwood trɔ se siwo dzi woda asi ɖo ale be, le ZIP 213 ƒe nya nu la, coinbase ƒe asitsatsa ateŋu anye Sapling ƒe emetsonuwo. Ne míagblɔe kɔte la, tomenukulawo ate ŋu axɔ teƒeɖoɖowo tẽ azɔ ɖe Sapling adrɛs siwo ŋu wokpɔ ta na la dzi. Wogakpɔtɔ doa alɔ coinbase ƒe emetsonu siwo me kɔ, eyata esia nye tiatia yeye, ke menye tɔtrɔ si wozi ɖe ame dzi o.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Nukatae Sapling gbã

Shielded coinbase tɔa ŋku Sapling ƒe emetsonuwo koŋ, eye susu aɖe li si tae. ZIP 213 ɖe eme be Sapling ƒe ɖɔɖɔɖoa he xɔtuɖaŋu ƒe tɔtrɔwo kple dɔwɔwɔ ƒe ŋgɔyiyi siwo na be ga si woatsɔ akpɔ ga ta tẽ le coinbase ƒe asitsatsa me la te ŋu dzɔ. Sprout ƒe ta gbãtɔ si wotsɔ akpoxɔnu wɔe la xɔ nunɔamesi geɖe akpa be wòate ŋu akpɔ eta le gakuawo ƒe gɔmeɖoanyia me tututu. Sapling ƒe kpeɖodzinana ƒe ɖoɖo si wɔa dɔ nyuie wu kple nuŋlɔɖi ƒe ɖoɖo na wòɖea vi. Sapling ŋutɔ keke se xoxo si xe mɔ ɖe gaku siwo wotsɔa gaku wɔe siwo wotsɔ akpoxɔnu wɔe nu ale be sea ku ɖe Sapling ƒe nusiwo dona hã ŋu, eye Heartwood ɖea se ma dzi kpɔtɔna be wòaɖe mɔ ɖe wo ŋu. Enye alesi Zcash ƒe ŋgɔyiyiwo tua wo nɔewoe ƒe kpɔɖeŋu nyui aɖe: tɔtrɔ ɖeka ƒe pɔmpiwo va zua gɔmeɖoanyi na esi kplɔe ɖo.

## FlyClient ƒe dɔwɔƒe

Heartwood hã trɔ nusi block header tsɔ eɖokui na. Wogbugbɔ ɖo tanya ƒe akpa si ŋkɔe nye hashFinalSaplingRoot tsã eye wotrɔ ŋkɔ nɛ be hashLightClientRoot. Fifia etsɔ eɖokui na Merkle Towo (MMR) ƒe ke, si nye xɔtuɖoɖo si le du dzi si wotu ɖe tanya nyatakakawo kple metadata siwo le block siwo do ŋgɔ dzi, abe ɣeyiɣi ƒe dzesiwo, kuxi sesẽwo ƒe taɖodzinuwo, Sapling kewo, dɔ siwo woƒo ƒu, kple asitsatsa ƒe xexlẽmewo ene. Ðokuitsɔtsɔna ma na be asisi si me kɔ, alo kɔsɔkɔsɔ si le egodo, tsɔa kpeɖodzi sue aɖe si ƒe lolome tsina le logarithmically ko kple kɔsɔkɔsɔa ƒe didime tsɔ ɖoa ​​kpe Zcash ƒe dɔwɔwɔ ƒe kpeɖodzi dzi. Fetu si dona tso emee nye gakotoku siwo me kɔ nyuie wu kple ame etɔ̃lia kple kɔsɔkɔsɔ vovovowo ƒe ƒoƒo ɖekae bɔbɔe wu, elabena megahiã be asisi naɖe block ɖesiaɖe be wòaka ɖe dɔ si le kɔsɔkɔsɔa megbe dzi o.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Afisi Heartwood sɔ le

Heartwood nye afɔɖeɖe ɖeka le Zcash ƒe ŋgɔyiyiwo ƒe duƒuƒu me, wo dometɔ ɖesiaɖe tsɔa akpa aɖe kpena ɖe eŋu si dzi esi kplɔe ɖo ɖoa ŋu ɖo. Overwinter kple Sapling va ɖo le ƒe 2018 me, Blossom va ɖo le ƒe 2019 me, eye Heartwood va ɖo le ƒe 2020 me le block 903,000. Canopy kplɔe ɖo emegbe le ƒe 2020 me le block 1,046,400. Sapling nye kadodo vevitɔ le kɔsɔkɔsɔ sia me na Heartwood: eƒe shielded-transaction mɔ̃ siwo wɔa dɔ nyuie lae nye mɔ̃ɖaŋununya ƒe nɔnɔme si wowɔ do ŋgɔ si na shielded coinbase te ŋu dzɔ.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| Netwɔƒe ƒe ŋgɔyiyi (NU) | Tɔtrɔ si wowɔ ɖekae ɖe Zcash ƒe se siwo dzi woda asi ɖo ŋu, si wowɔ dɔ le block ƒe kɔkɔme si woɖo ɖi |
| Coinbase ƒe asitsatsa | Asitsatsa tɔxɛ si le block ɖesiaɖe me si xea block ƒe fetu |
| Shielded Sapling ƒe adrɛs | Zcash adrɛs ƒomevi aɖe si nye ame ŋutɔ tɔ si Sapling ƒe ŋgɔyiyi |
| Gaku si wotsɔ akpoxɔnu wɔe | Heartwood ƒe tɔtrɔ si na be woaxe block ƒe teƒeɖoɖowo ɖe Sapling adrɛs siwo wokpɔ ta na me |
| FlyAsitsala | Mɔnu si na kekeli ƒe asisiwo tsɔ kpeɖodzi suewo ɖo kpe dɔwɔwɔ ƒe kpeɖodzi dzi |
| Merkle Towo ƒe Towo (MMR) | Block siwo va yi ƒe kpukpui si le du dzi si block tanya tsɔ eɖokui na |
| Nubabla ƒe alɔdze id | Tag si dea dzesi ŋgɔyiyi ƒe se siwo dzi asitsatsa zɔna ɖo, si wozãna hena gbugbɔgaƒoƒo takpɔkpɔ |

## Nyabiasewo ƒe Nyabiasewo

Ðe Heartwood trɔa nye ZEC alo nye adzamenyawo? Ao, Heartwood meka asi wò ga si li fifia ŋu o. Etsɔ tiatia si le tomenukulawo si be woaxɔ teƒeɖoɖowo ɖe adrɛs siwo ŋu wokpɔ ta na me kpe ɖe eŋu eye wòna kpekpeɖeŋu si ana kekeli ƒe asisiwo nyo wu. Wò ŋutɔ wò ga si susɔ kple asitsatsa siwo ŋu wokpɔ ta na la mekpɔa ŋusẽ ɖe edzi o.

Nukae nye gaku si wotsɔ akpoxɔnu wɔe? Coinbase nye asitsatsa si xea block ƒe fetu. Heartwood ɖea mɔ na teƒeɖoɖo ma yia Sapling ƒe adrɛs si ŋu wokpɔ akpoxɔnu ɖo me tsɔ wu be wòanɔ esi me kɔ, ale be tomenukulawo ƒe gakpɔkpɔ ate ŋu anɔ ame ŋutɔ si.

Ðe wòle be tomenukulawo naxɔ teƒeɖoɖo siwo wokpɔ ta na fifiaa? Ao. Shielded coinbase nye nusi woate ŋu awɔ. Wokpɔtɔ doa alɔ coinbase ƒe emetsonu siwo me kɔ, eyata tomenukulawo ate ŋu atia wo dometɔ ɖesiaɖe.

Nukatae shielded coinbase zãa Sapling ke menye Sprout pool xoxoa o? Elabena Sapling ƒe aɖaŋu si wɔa dɔ nyuie wu na be akpoxɔnuwɔwɔ tẽ le gakudzraɖoƒea ɖe vi. Sprout-ta si nɔ anyi do ŋgɔ la xɔ nunɔamesi geɖe akpa be wòate ŋu awɔe.

Nukae trɔ na kekeli ƒe asisiwo? Fifia block ƒe ta la tsɔ eɖokui na Merkle Towo ƒe Togbɛ aɖe dzi le block siwo va yi dzi to hashLightClientRoot ƒe akpaa dzi. Ema na be asisi siwo me kɔ kple kɔsɔkɔsɔ bubuwo tsɔa kpeɖodzi sue siwo ƒe lolome le logarithmic la ɖoa kpe Zcash ƒe dɔwɔwɔ ƒe kpeɖodzi dzi ɖe kɔsɔkɔsɔ bliboa teƒe.

## Do wò nugɔmesese kpɔ

Do ŋgɔ na Heartwood la, nukatae block ƒe fetu si woxe na tomenukulawo dze le dutoƒo, eye nukae Heartwood trɔ?

<details>
<summary>Answer</summary>

Ele be Coinbase ƒe nusiwo dona tso eme nadze le gaglãgbe, eyata tomenukulawo ƒe fetu yeye si woɖo la dzena ɖe dutoƒo adrɛs si me kɔ si me amesiame ate ŋu alé ŋku ɖo la me ɣesiaɣi. Heartwood trɔ se siwo dzi woda asi ɖo (ZIP 213) ale be Coinbase ƒe asitsatsa ateŋu anye Sapling ƒe emetsonuwo, si ana tomenukulawo naxɔ woƒe fetuwo tẽ ɖe adrɛs siwo wokpɔ ta na me.
</details>

### Nunɔamesiwo

[ZIP 250: Heartwood Network ƒe Dodoɖeŋgɔ ƒe Dɔwɔwɔ](https://zips.z.cash/zip-0250)

[ZIP 213: Gaku si Wotsɔ Akpoxɔnu Wɔe](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Nubabla-Akpa ƒe Tɔtrɔwo](https://zips.z.cash/zip-0221)

[Heartwood network ƒe ŋgɔyiyi](https://z.cash/upgrade/heartwood/)

### Kpɔe hã

[Zcash Network ƒe Ðɔɖɔɖowo](../start-here/network-upgrades)

[Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools)

[Gakotokuwo](../using-zcash/wallets)

[zk-SNARKS ƑE NUÐEÐEŊUTI](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Siwo kplɔ wo nɔewo ɖo: [Network Upgrades ƒe dzesi](../start-here/network-upgrades) · Si do ŋgᴐ: [Seƒoƒo ƒe ʋuʋu](../zcash-tech/blossom) · Esi kplᴐe ɖo: [Canopy ƒe xɔmenuwo](../zcash-tech/canopy)
