<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axɔse Ɖe Axa Dzi"/>
</a>

# Nym Mixnet Ƒomevi Manya Ƒe Ɣaɣla na Zcash

> Wokpɔe mlɔeba le: October 18, 2026

Zcash ɣaɣla [shielded] gaƒuƒoƒowo [pools] fia gaƒuƒowo, ametɔwo, kple xɔlawo le ɖoɖonu dzi [on-chain]. Woɖe asi le network ƒe mɔ si le gakotoku [wallet] kple lightwallet server dome ŋu o. Nym ƒe mixnet kplɔ network ƒe ɣaɣla si gbɔna la ɖe eŋu. Le October 2026 me la, wɔwɔa le dɔ wɔm le production gakotokuwɔwo me (Zingo, Zkool).

Tsoƒe: [Alekee Nym kplɔ ƒomevi manya ɖe Zcash gakotokuwɔ ŋu](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 October 2026).

## Nu si woɣe ɣa

Nym mae transaction packets (zi geɖe la, 7–15 KB ƒe fexexe nyatakakawo kple ZK ɖaseɖigbalɛwo [proofs]) me le Sphinx packets me eye woto wo ɖe mixnet la me. Esia:

- Ƒia dɔlila ƒe IP tso lightwallet server la gbɔ
- Ƒoa asitsotso la kple Nym ƒe asitsotsowo
- Na entropy ƒe bits 17 kple default ƒe ɖoɖowɔwɔwo, eye woƒo ɖase be ƒomevi manya ƒe ameha la wu amewo 100,000

Fexexewo kple asixɔxɔ ƒe biabiawo le Zingo v7 me to mɔ sia dzi le woƒe gɔmedzedze nu.

## Nu si wometsɔ ɣe ɣa o

Ɖoɖonu ƒe sync, nullifier [gaɣaɣla ɖeɖe dzesi] ƒe biabiabiawo, transaction [gaɖoɖo] xɔxɔwo, kple mempool ƒe asitsotso wɔa indexer ƒe kadodo ɖe sia ɖe me. Device-level alo application-level metadata si le packets si woƒo la ŋu wu la hã mele Nym ƒe dɔwɔƒe me o.

Ne wò threat model hia be woɣe sync ƒe asitsotso ɣa la, ƒo native-mixnet gakotoku kple system-level NymVPN. Kpɔ [Nym VPN](/guides/nym-vpn).

## Gakotokuwɔ

| Gakotoku | Nɔnɔme | Nyatakakawo |
| --- | --- | --- |
| Zingo v7 | Le dɔ wɔm, le gɔmedzedze nu | `makers run-cli` tsɔ `nym-proxy` dea eŋu. Session ƒe gɔmedzedze mele internet dzi o; `--online`, `--remember-online`, alo `--server` na mɔɖeɖe. |
| Zkool | Le dɔ wɔm | Native mixnet ƒe wɔwɔ. |
| Bubuwo | Tso NymVPN | To gakotoku la ɖe system-level Mixnet mode me. |

Ɖoɖowɔwɔ ƒe nyatakakawo na gakotoku ƒe mɔ la le [To Zcash Wallet ƒe Asitsotso Dze Nym Mixnet Ŋu](/guides/nym-mixnet-wallet-setup) me.

## Nu si nàtsɔ asɔ

Broadcast si woto Nym me la ble ɣeyiɣi wu clearnet teƒe 12.5 (~3.4 s). Tor le kabakaba wu (~3.7×), gake ewɔ FIFO streams si me amesiamɛxɛxɛ mele o, eyata adversary si kpɔ xexlẽ blibo la ate ŋu akɔrelate wo hã. Ne Nym ƒe amewo geɖe la ƒe xexeame tɔxɛ geɖe la, ekplɔ ƒomevi manya ɖe eŋu nyuie wu ɣeyiɣi bubu tsɔtsɔ kpe ɖe eŋu.

## Application-layer ƒe dɔwɔ nyuie: nym-swizzle-zcash

Network-layer ƒe ɣaɣla [privacy] ɖe eɖokui me mede o. Ke hã ne mixnet alo VPN de bliboa, lightwallet server ate ŋu akɔrelate sessions to application-layer ƒe nɔnɔmewo kpɔkpɔ:

- Resume-point ƒe tsatsam: Clients gatrɔ sync tso `previous end + 1` tututu, eyata server la ate ŋu akɔ sessions kple block [gaɖoɖowo ƒuƒoƒe] ƒe teƒe ko.
- Sync-nenye-send: Gakotokuwɔ wɔa sync enumake hafi woado broadcast, eye esia na server la nàde transaction la ɖe sync session si va do ŋgɔ la ŋu.

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate la wɔa hygiene policy si tutɔ na Zcash eye wòɖo nya siawo me. Ewɔa `nym-swizzle` ƒe primitives gbogblɔ la ƒe package le policy si nya ɖoɖonu la me na light clients [nyatakaka si hiã ƒe mɔ].

**Quantised sync ƒe ranges.** Wofafa biabiawo ɖe network blibo ƒe grid si ƒe cells le gbe ƒe lolome. Wotsɔa gɔmedzedze la ɖea anyi eye wotsɔa nuwuwu la doa dzi. Ranges la le ɖoɖo me, wotsɔa dzi yina, eye womema kplii o. Reorg ƒe checks le range si wofafa la me, ale be womafia resume point tututu o. Ƒomevi manya tso collision me (gakotokuwɔ geɖe do boundaries ma ke) eye menye tso noise me o.

**Broadcasts si woɖe teƒe vovovo.** Wotsɔa exponential distribution (mean blocks 144 ≈ gaƒoƒo 3, cap blocks 576 ≈ gaƒoƒo 12) dea transaction ƒe dodo megbe, si sɔ kple ZIP 318 transfer scheduling. Ɣeyiɣi si woɖe le megbe la wu process ƒe agbe ƒe ɣeyiɣi si wɔa zi geɖe, eyata wole schedules la ɖom ɖe teƒe me. Wotu transaction la le fire time ko, eye wotsɔa tip yeye. Sync kple broadcast ele be woazã servers vovovo.

Crate la fia `BlockSource` kple `TxBroadcaster` traits, ewɔ compilation na `wasm32-unknown-unknown`, eye network stack aɖeke mele eɖokui si o. Kpɔ [Nym docs](https://nym.com/docs/developers/swizzle/zcash) na API blibo kple kpɔɖeŋuwo.

## Tsoƒewo

- [Alekee Nym kplɔ ƒomevi manya ɖe Zcash gakotokuwɔ ŋu](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 October 2026
- [nym-swizzle-zcash: Hygiene Policy na Zcash Light Clients](https://nym.com/docs/developers/swizzle/zcash) — Nym Docs
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [To Zcash Wallet ƒe Asitsotso Dze Nym Mixnet Ŋu](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
