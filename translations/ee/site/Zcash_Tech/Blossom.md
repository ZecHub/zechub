<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Seƒoƒo ƒe ʋuʋu

> Blossom yi agbe le Zcash mainnet dzi le block 653,600 (December 11, 2019 UTC).

Nusi nàtsɔ adzoe: alesi Blossom wɔ Zcash blocks va ɖo kabakaba abe zi gbɔ zi eve ene evɔ metrɔ ZEC agbɔsɔsɔme si network la wɔna le ɣeyiɣi aɖe megbe o.

Blossom nye Zcash ƒe ame aɖe [network ƒe ŋgɔyiyi](../start-here/network-upgrades). Wotsɔe de dɔwɔwɔ me to... [ZIP 206 ƒe xexlẽdzesi](https://zips.z.cash/zip-0206), eye woɖe eƒe tɔtrɔ vevitɔ si dzi woda asi ɖo la gɔme le [ZIP 208 ƒe xexlẽdzesi](https://zips.z.cash/zip-0208). Blossom nye scalability upgrade: eɖe ɣeyiɣi si woɖo taɖodzinu na le blockwo dome dzi kpɔtɔ tso sɛkɛnd 150 va ɖo sɛkɛnd 75, eyata blocks va ɖona abe zi gbɔ zi eve ene. Electric Coin Company xɔ ŋgɔ eye wòɖe gbeƒã Blossom.

Nusitae esia le vevie ɖo. Ne èɖo ZEC ɖa la, èlala be network la naɖo kpe edzi le block me. Ne blockwo le blewu la, ke èlalana ɣeyiɣi didi wu. Do ŋgɔ na Blossom la, wokpɔ mɔ be woaxe mɔ yeye aɖe abe sɛkɛnd 150 ɖesiaɖe ene. Blossom tso taɖodzinu ma ɖe afã me, va ɖo sɛkɛnd 75, eyata kpeɖodzinyawo va kaba eye kɔsɔkɔsɔa ate ŋu atsɔ asitsatsa geɖe le ɣeyiɣi ma ke me. Ewɔ esia evɔ mewɔ ZEC geɖe wu alo ʋuʋu ɣeyiɣi si woatsɔ atso afã kple afã le etsɔme o.

## Block siwo le kabakaba wu

Blossom ƒe tɔtrɔ vevitɔ le bɔbɔe. Zcash ƒe taɖodzinu ƒe mɔxenu ƒe dometsotso, si nye ɣeyiɣi si network la ɖoe be yeatsɔ anɔ block ɖeka kple esi kplɔe ɖo dome, ɖiɖi tso sɛkɛnd 150 va ɖo sɛkɛnd 75 ([ZIP 208 ƒe xexlẽdzesi](https://zips.z.cash/zip-0208)). Wokpɔa mɔxenuwo to kpeɖodzi si ɖee fia be wowɔ dɔ dzi, eyata dometsotso ŋutɔŋutɔ si le wo dome la toa vovo, gake fifia kɔmpiutadziɖoɖoa ɖoe be yeaxe mɔxenu ɖeka abe sɛkɛnd 75 ɖesiaɖe ene ɖe 150 ɖesiaɖe teƒe.

Nu eve kplɔe ɖo:

1. Blockwo va ɖona zi gbɔ zi eve abe zi gbɔ zi eve ene, eyata kɔsɔkɔsɔa ate ŋu atsɔ asitsatsa siwo ade zi gbɔ zi eve le ɣeyiɣi ɖeka me.
2. Wò asitsatsa xɔa eƒe kpeɖodzi gbãtɔ kaba, elabena mèlalana ɣeyiɣi didi aɖeke na block si kplɔe ɖo o.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Be woana gadodo nanɔ anyi ɖaa

Block siwo le kabakaba wu fɔa nyabiase aɖe ɖe te. Ne Zcash wɔ block siwo sɔ gbɔ wu zi gbɔ zi eve eye block ɖesiaɖe gakpɔtɔ xe fetu ma ke la, network la awɔ ZEC kabakaba zi gbɔ zi eve. Blossom ƒoa asa na ema. Eɖe teƒeɖoɖo si woxena ɖe block ɖeka ta dzi kpɔtɔ afã, eye wòdzi block-reward ƒe afã ƒe dometsotso ɖe edzi zi gbɔ zi eve tso block 840,000 va ɖo 1,680,000 ([ZIP 208 ƒe xexlẽdzesi](https://zips.z.cash/zip-0208)). Block siwo sɔ gbɔ wu zi gbɔ zi eve, siwo dometɔ ɖesiaɖe xea afã kple afã, wɔa dɔ va ɖoa ZEC ƒe agbɔsɔsɔ si wowɔ le ɣeyiɣi ƒe akpa ɖeka me. Nusiwo woatsɔ ana ƒe ɖoɖowɔɖi bliboa kple ɣeyiɣi si woatsɔ aɖe afãwo dzi akpɔtɔ le etsɔme, si wodzidze le ɣeyiɣi ŋutɔŋutɔ me la metrɔ o.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Dɔwɔwɔ ɖe edzi si wòle be woawɔ

Blossom nye tɔtrɔ si dzi woda asi ɖo le dukɔ eveawo dome, si fia be ele be node ɖesiaɖe nawɔ ŋgɔyiyi be wòayi edzi anɔ kɔsɔkɔsɔa yome ([ZIP 206 ƒe xexlẽdzesi](https://zips.z.cash/zip-0206)). Menye tiatiae wònye na node dɔwɔla si di be yeanɔ ɖekawɔwɔ me o. Blossom wɔ dɔ le mainnet block 653,600 eye wòtsɔa eya ŋutɔ ƒe consensus branch id, tag si na nodes kple transactions ɖo kpe edzi be yewole Blossom ƒe sewo dzi. Wozã Zcash ƒe network upgrade mechanism si wozãna ɖaa ([ZIP 200 ƒe xexlẽme](https://zips.z.cash/zip-0200)).

## Afisi Blossom sɔ le

Blossom nye Zcash ƒe network ƒe tɔtrɔ etɔ̃lia. Ekplɔ Overwinter kple Sapling ɖo, eye wòva do ŋgɔ na Heartwood kple Canopy. To vovo na Sapling, si gbugbɔ trɔ asi le Zcash ƒe nya ɣaɣla siwo wotsɔ akpoxɔnu wɔe ŋu la, Blossom ƒe susu nɔ eƒe lolome kple duƒuƒu ŋu. Eƒe dɔ vevitɔe nye block timing, ke menye ameŋunyatakaka yeyewo zazã o.

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| Block taɖodzinu ƒe dometsotso | Ɣeyiɣi si network la ɖoe be yeawɔ le block ɖeka kple esi kplɔe ɖo dome |
| Block teƒeɖoɖo | ZEC yeyea wɔ eye woxee esime wole block ɖesiaɖe kum |
| Halving dometsotso | Block nenie toa block ƒe fetu ƒe afã ɖesiaɖe dome |
| Nubabla ƒe alɔdze id | Tag si dea dzesi network sewo ƒe hatsotso si node alo asitsatsa le |
| Dukɔ eve ƒe nukpɔsusu ɖeka ƒe tɔtrɔ | Se ƒe tɔtrɔ si wòle be node ɖesiaɖe naxɔ hafi anɔ network |
| Netwɔƒe ƒe ŋgɔyiyi (NU) | Tɔtrɔ si wowɔ ɖekae ɖe Zcash ƒe se siwo dzi woda asi ɖo ŋu, si wowɔ dɔ le block ƒe kɔkɔme si woɖo ɖi |

## Nyabiasewo ƒe Nyabiasewo

Ðe Blossom trɔa alesi gbegbe ZEC li alo ne woɖe afã kple afãa? Ao, woɖe fetu si woxɔna le blɔka ɖesiaɖe me dzi kpɔtɔ afã eye wodzi afã ƒe dometsotso ɖe edzi zi gbɔ zi eve le ɣeyiɣi ɖeka me, eyata ZEC ƒe agbɔsɔsɔ si wowɔ le ɣeyiɣi ƒe akpa ɖeka me, kple ɣeyiɣi si woatsɔ atso afã me le etsɔme, nɔ nenema ke.

Ðe Blossom trɔa nye ZEC alo nye adzamenyawo? Ao, Blossom trɔ block ƒe ɣeyiɣi kple teƒeɖoɖo ƒe akɔntabubu. Meka asi wò ga si susɔ alo wò asitsatsa siwo ŋu wokpɔ ta na ŋu o.

Nuka tututue sɛkɛnd 75 fia? Enye taɖodzinu, ke menye kakaɖedzi o. Wokpɔa blɔkawo to dɔwɔwɔ ƒe kpeɖodzi dzi, eyata dometsotso ŋutɔŋutɔ si le blɔwo dome la toa vovo. Netwɔƒea ɖoe be yeaxɔ ɖeka le sɛkɛnd 75 ɖesiaɖe me tsɔ wu be yeaxɔ ɖeka le sɛkɛnd 150 ɖesiaɖe me.

Ðe wòhiã be mawɔ nane esime Blossom wɔ dɔa? Ne èƒu du node blibo la, ehiã be nàdoe ɖe ŋgɔ, elabena Blossom nye sedziwɔwɔ. Ne èzã gakotoku la, ke èhiã na eƒe tɔtrɔ si akpe ɖe se yeyeawo ŋu.

Nukatae woaɖe block ƒe fetu dzi akpɔtɔ afã kura? Elabena fifia blockwo va kabakaba zi gbɔ zi eve. Ne woɖe fetu si woxɔna le block ɖesiaɖe me ƒe afã dzi kpɔtɔ la, enaa network la mewɔa ZEC kabakaba zi gbɔ zi eve o.

Ɣekaɣie Blossom wɔ dɔ? Le mainnet block 653,600, le December 11, 2019 UTC dzi.

## Do wò nugɔmesese kpɔ

Blossom na Zcash blockwo va ɖo zi gbɔ zi eve abe zi gbɔ zi eve ene. Nukatae ema medzi alesi wowɔa ZEC yeyee zi gbɔ zi eve o?

<details>
<summary>Answer</summary>

Elabena Blossom hã ɖe fetu si woxena ɖe block ɖeka ta dzi kpɔtɔ afã eye wòdzi afã ƒe dometsotso ɖe edzi zi gbɔ zi eve tso block 840,000 va ɖo 1,680,000. Block siwo sɔ gbɔ wu zi gbɔ zi eve, siwo dometɔ ɖesiaɖe xea afã kple afã, ne wotsɔe kpe ɖe ZEC ƒe agbɔsɔsɔ ma ke ŋu le ɣeyiɣi ɖeka me, eyata ya si dona le yame ƒe ɖoɖowɔɖi si wodzidze le ɣeyiɣi ŋutɔŋutɔ me metrɔ o.
</details>

### Nunɔamesiwo

[ZIP 208: Block Taɖodzinu ƒe Dometsotso Kpuie wu](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom Network ƒe Dodoɖeŋgɔ ƒe Dɔwɔwɔ](https://zips.z.cash/zip-0206)

[Blossom Network ƒe Ŋgɔyiyi](https://z.cash/upgrade/blossom/)

[Blossom Upgrade Improves Speed, Scalability, Capacity (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Kpɔe hã

[Zcash Network ƒe Ðɔɖɔɖowo](../start-here/network-upgrades)

[Zcash Ganyawo Ŋuti Ðoɖo](../start-here/zcash-monetary-policy)

[Nukae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash)

[Nodes Blibowo](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Siwo kplɔ wo nɔewo ɖo: [Network Upgrades ƒe dzesi](../start-here/network-upgrades) · Si do ŋgᴐ: [Sapling](../zcash-tech/sapling) · Esi kplᴐe ɖo: [Dzimeƒu ƒe ati](../zcash-tech/heartwood)
