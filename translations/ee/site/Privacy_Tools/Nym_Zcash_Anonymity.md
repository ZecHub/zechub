<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Mixnet Ŋkɔmaɖemaɖe na Zcash

> Woɖo kpe edzi zi mamlɛtɔ: October 18, 2026

Zcash shielded pools ɣlaa ga homewo, dɔdzikpɔlawo, kple amesiwo xɔe le kɔsɔkɔsɔ me. Womeɣlaa network mɔ si le gakotoku kple lightwallet server dome o. Nym's mixnet tsɔ network-layer takpɔkpɔ ma si bu kpee. Tso October 2026 me la, ɖekawɔwɔa le agbe le ewɔwɔ gakotokuwo (Zingo, Zkool).

Dzᴐtsoƒe: [Alesi Nym tsɔa ŋkɔmaɖemaɖe kpena ɖe Zcash gakotokuwo ŋu](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Dzove 2026).

## Nusi wokpɔ ta na

Nym gbãa asitsatsa ƒe agbalẽviwo (zi geɖe la, 7–15 KB ƒe gazazã ŋuti nyatakakawo kple ZK kpeɖodziwo) ɖe Sphinx ƒe agbalẽviwo me eye wòɖoa wo to mixnet la dzi. Nu sia:

- Ɣla amesi ɖoe ɖa ƒe IP tso lightwallet server la me
- Tsɔ ʋuwo tsakana kple Nym ʋu bubuwo
- Enaa entropy bits 17 lɔƒo le ɖoɖo gbãtɔwo nu, kple ŋkɔmaɖemaɖe si woyɔ si woɖo wu ezãla 100,000

Fexexe kple asixɔxɔ biabia le Zingo v7 me zɔna ɖe mɔ sia dzi le gɔmedzedzea me.

## Nusiwo womekpɔ ta na o

Kɔsɔkɔsɔ ƒe wɔwɔ ɖekae, nullifier biabia, asitsatsa ƒe xɔxlɔ̃, kple mempool ʋuɖoɖo zãa indexer kadodo si sɔ fifia. Device-level alo application-level metadata si le mixed packets godo hã le Nym's ŋutete godo.

Ne wò ŋɔdzidoname ƒe kpɔɖeŋu bia be nàɣla sync traffic la, ƒo native-mixnet gakotoku kple system-level NymVPN. Kpɔ [Nym VPN ƒe dɔwɔwɔ](/guides/nym-vpn).

## Gakotokuwo

| Gakotoku | Ɖoƒe | De dzesii |
| --- | --- | --- |
| Zingo v7 | Live, default | `makers run-cli` bablawo ƒe ƒuƒoƒo `nym-proxy`. Session dzea egɔme le internet dzi; `--online`, `--remember-online`, or `--server` na lɔlɔ̃ ɖe edzi. |
| Zkool | Nɔ agbe | Native mixnet ƒe ƒoƒo ɖekae. |
| Ame bubuwo | To NymVPN dzi | Mɔ gakotokua to system-level Mixnet mode dzi. |

Ðoɖowɔwɔ ŋuti nyatakakawo na gakotoku-dzidzenu mɔa le [Mɔ Zcash Gakotoku Ʋuʋu To Nym Mixnet](/guides/nym-mixnet-wallet-setup).

## Asitsatsa ƒe asitsatsa

Nym-routed gbeƒãɖeɖe le blewu abe 12.5× ene wu clearnet (~3.4 s). Tor zɔna kabakaba wu (~3.7×) gake ezãa FIFO tɔsisiwo tsakatsaka manɔmee, eyata xexeame katã ƒe futɔ ateŋu awɔ ɖeka kokoko. Nym zãla ƒe ƒuƒoƒo si woama ƒe dzidziɖedzi dzia ŋkɔmaɖemaɖe ɖe edzi nyuie wu heheɖemegbe bubu tsɔtsɔ kpee.

## Dzadzɛnyenye le dɔwɔwɔ-layer: nym-swizzle-zcash

Network-layer takpɔkpɔ mesɔ gbɔ o. Ne mixnet alo VPN deblibo le esi gɔ̃ hã la, lightwallet server ate ŋu atsɔ ɣeyiɣiwo aɖo kadodo me kokoko to ŋkuléle ɖe application-layer ƒe nɔnɔmewo ŋu me:

- Resume-point chaining: asisiwo gbugbɔ dzea sync gɔme tso tututu `previous end + 1`, ale be server la ate ŋu atsɔ kɔsɔkɔsɔ aƒo ɣeyiɣiwo nu ƒu to block ƒe kɔkɔme ɖeɖeko dzi.
- Sync-then-send: gakotokuwo wɔa ɖeka enumake hafi woɖea gbeƒã, si wɔnɛ be dɔwɔƒea nagblɔ be asitsatsa aɖe tso ɖekawɔwɔ ƒe ɣeyiɣi si do ŋgɔ gbɔ.

The [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate wɔa dzadzɛnyenye ŋuti ɖoɖo si Zcash-specific si kpɔa evea siaa gbɔ. Eblaa aʋafiagã la ɖe agba me `nym-swizzle` primitives va zu kɔsɔkɔsɔ-sidzedze ɖoɖo na kekeli ƒe asisiwo.

**Quantised sync ranges.** Wokeke biabiawo ɖe enu ɖe network-wide grid si me ŋkeke ƒe lolome ƒe lãmenugbagbeviwo le. Woƒoa gɔmedzedzea nu ƒu ɖe anyi eye woƒoa nuwuwu la godoo. Towo ƒe didime nye nusiwo woɖo ɖi, esiwo le dzi yim, eye womewɔ ɖeka o. Reorg ƒe ɖaseɖigbalẽwo nɔa teƒe si wokeke ɖe enu la me ale be womeɖea teƒe si tututu woagbugbɔ adze egɔme tsoe la fiana o. Ŋkɔmaɖemaɖe tsoa gododo (gakotoku geɖe siwo doa liƒo ɖeka mawo ke) gbɔ tsɔ wu toɣliɖeɖe.

**Decoupled broadcasts.** Wohea asitsatsa dɔdɔwo ɖe megbe to exponential distribution (mamã dedie 144 blocks ≈ gaƒoƒo 3, cap 576 blocks ≈ gaƒoƒo 12) si sɔ kple ZIP 318 transfer scheduling. Heheɖemegbe wu dɔwɔwɔ ƒe agbenɔƒe si wozãna ɖaa, eyata ɖoɖowɔɖiwo nɔa anyi. Dzodoɣi koe wotua asitsatsa la ɖe gaxɔgbalẽvi yeye aɖe ŋu. Ele be sync kple broadcast nazã server vovovowo.

Aɖaka la ɖea nu fiana `BlockSource` kple `TxBroadcaster` nɔnɔmewo, ƒo ƒu na `wasm32-unknown-unknown`, eye network stack aɖeke mele esi le eɖokui si o. Kpɔ nya si [Nym nuŋlɔɖiwo](https://nym.com/docs/developers/swizzle/zcash) na API bliboa kple kpɔɖeŋuwo.

## Dzɔtsoƒewo

- [Alesi Nym tsɔa ŋkɔmaɖemaɖe kpena ɖe Zcash gakotokuwo ŋu](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 October 2026. Eƒe dukɔ nye United States of America
- [nym-swizzle-zcash: Dzadzɛnyenye Ŋuti Ðoɖo na Zcash Light ƒe Asitsalawo](https://nym.com/docs/developers/swizzle/zcash) — Nym Nuŋlɔɖiwo
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Mɔ Zcash Gakotoku Ʋuʋu To Nym Mixnet](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN ƒe dɔwɔwɔ](/guides/nym-vpn) — ZecHub
