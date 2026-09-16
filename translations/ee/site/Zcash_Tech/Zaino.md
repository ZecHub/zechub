# Zaino Indexɔla

Zaino nye Rust ƒe indexɔ na Zcash blockchain. Exlẽa nu tso kadodo me datawo ŋu le Zebra full node eye wònaa nyatakaka siwo gaɖaba, explorer, faucets kple dɔ bubuwo hiãna evɔ megana be Zebra ŋutɔ nanɔ te ɖe client-facing Index ɖesiaɖe dzi o.

## TL;DR

* Zebra ɖo kpe Zcash ƒe kɔsɔkɔsɔ dzi.
* **Zaino** fiaa Zebra ƒe nudzroƒe ŋuti nyatakakawo eye wòɖea client-facing API la fiana.
* Zallet nye gaɖabaƒle ƒe akpa le Z3 la me. Le default Z3 setup, Zallet ƒoa nu kple Zebra tẽe eye medina Zaino si nɔa eɖokui dzi o.
* Zaino ƒe dɔwɔwɔ si le eɖokui si la nyo ne dɔwɔlawo hiã gRPC nuƒleƒe siwo wɔ ɖeka kple lightwalletd, JSON-RPC amedɔdɔ alo mɔ̃ɖaŋunuwo na gaɖigbalẽvi suewo (light wallets), numekulawo, tsimɔwo kpakple dɔ bubuwo.
* Zaino nye mɔ̃ɖaŋunu si le dɔ wɔm, gake ele be dɔwɔlawo nakpɔ nyatakaka siwo ku ɖe eƒe dɔwɔwɔ ŋu la tso Zaino kple Z3 ƒe agbalẽwo me hafi wòate eŋu ɖoɖo.

## Nusi Zaino Wɔna

Zaino nɔa Zebra kple client software dome. Zebra nye consensus node: eɖea Zcash blockchain la, edzroa eme eye wònɔa eyome. Zaino zãa Zebra abe eƒe chain data ƒe tsotso ene, emegbe eɖea indexed views siwo dzi client applications ate ŋu abia nyawo le nyuie.

Woƒe akpa vovovoawo me mama alea nana dɔdeasiwo nɔa bɔbɔe:

Nu si me wòle la ƒe akpa aɖe. Eƒe dɔdeasiwo.
|:--|:--|
Zebra. Nuŋlɔɖi kple nu si dzi woada asi ɖo bliboe le eƒe agbalẽ me.
Zaino: Index kple client-facing API service.
Zallet. Akplo ƒe dɔwɔwɔ.
lightwalletd. Light wallet server xoxo si Zaino ɖo be wòatsɔ aɖo eteƒe alo akpe ɖe eŋu la le eme

Zaino naa dɔwɔwɔ na light clients, full clients alo wallets kple block explorers. Ena mɔɖeɖe be woaɖo kpe edzi le kɔsɔkɔsɔ si ŋu wowɔ ɖoɖo ɖo la dzi, kɔsɔkpo nyuitɔ siwo womewɔe haɖe o kpakple mempool data siwo Zebra lé ɖe asi me.

## Alesi Wòsɔ Ðe Zcash-Gazã Si Li Egbea Nue

Z3 ƒe nuɖoanyi si li fifia la ku ɖe Zebra, Zallet kple Zaino ŋu.

Le Z3 ƒe ɖoɖowɔɖi me la, Zebra kple Zallet wɔa dɔ ɖekae. Zallet yia Zebra tẽe, eyata ne ame aɖe le gaɖabawo dzi ko la mahiã be wòadze Zaino si nɔa eɖokui si ɖeɖe gɔme o.

Woɖoa Zaino ɖe edzi ne dɔwɔlaa di be yeasubɔ ame bubuwo. Le Z3 me la, enɔa megbe na dɔdzikpɔlawo ƒe asitelefonwo le Internet dzi. `indexer` Ŋlɔ wò nyatakakawo ɖi eye nàgblɔ be:

* lightwalletd-sɔna kple gRPC nuƒleƒe na gaƒoɖokuisi siwo me nya aɖeke mele o, eye wo ŋu dɔ le bɔbɔe.
* JSON-RPC ƒe amedɔdɔ na explorerwo, faucets kple service backends
* indexer database si le vovo tso Zebra ƒe chain state gbɔ.

Esia na Zaino wɔa dɔ nyuie le gaɖakawo, dugã me mɔ̃ɖaŋudɔwɔlawo, tsaɖilawo kple nuƒlela siwo doa Zcash ƒe nyatakakadzraɖoƒewo kpɔna la dome.

## Zaino kple lightwalletd

lightwalletd nye Light Wallet Server gbãtɔ. Zaino enye Rust-based successor path na dɔ sia wɔwɔ. Eƒe taɖodzinu enye be wòana API siwo sɔ le afisiwo woate ŋui alebe gaɖigbalẽ kple dɔwɔƒewo ate ŋu atrɔ ayi teƒe bubu evɔ womagate ŋu aŋlɔ wo katã ɖe ɖekaɖeka o.

ema mefia be lightwalletd ƒe dɔwɔnawo katã va le Zaino. Ele na dɔwɔlawo be woabu Zaino abe woƒe Zebra-dɔwɔƒe si li fifia la tɔ ene eye woalé ŋku ɖe ɖoɖo yeyeawo, agbalẽ siwo woɖe asi le eŋu kple nuɖoɖonuƒo ŋu hafi atso nya me le nusi woawɔ ŋu.

## Dɔwɔla Ƒe Ŋkuɖodzinyawo

Mɔ bɔbɔe si dzi woato awɔ dɔe nye Z3 ƒe nudzraɖoƒe. Z3 lɔ Zaino ɖe eme abe tiatiawɔƒe ene:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Zã Z3 ƒe ɖoɖowɔɖi si sɔ gbã eye nàlala Zebra nawɔ ɖeka hafi adze dɔwɔƒe siwo ŋu wòle te ɖo la gɔme le mainnet alo testnet dzi.

Zaino ɖe network service eve fia. gRPC nye lightwallet-facing API la. JSON-RPC ƒe ɖoɖo le loopback alo trusted private networks dzi negbe ne external layer na protection o ko. Don't expose an unauthenticated or unencrypted JSON RPC endpoint to the public internet.

## Nɔnɔmetata aɖewo siwo fia alesi Zaino wɔa dɔe

### Zaino Gɔmeɖeɖewo ƒe Atikewɔwɔ

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Live Service Architecture (Zainɔ Agbe Kpekpeɖeŋunaƒe ƒe Aɖaŋuɖoɖoa)

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino System Architecture (Zainɔ Ðoɖo ƒe Aɖaŋuɖoɖo)

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Vodada Siwo Dzɔna Zi Geɖe La

**Etsɔ Zaino wɔ nu abe nudɔ blibo ene.** Menye Zaino ye nye validator o. Zebra dea dzesi kɔsɔkɔsɔa; Zaino hea nyatakakawo tso Zebra gbɔ.

**Ne míebuna be Z3 ƒe dɔwɔna ɖesiaɖe hiã Zaino si le eɖokui si.** Zallet ate ŋu aɖo Zebra gbɔ tẽe tso default Z3 stack me. Dze Zaino gɔme ne èhiã indexer-dɔwɔƒe siwo li wo ɖokui ɖeɖeko na ame bubuwo la.

**Etsɔ nuŋɔŋlɔ siwo woɖo ɖi la le alesi wowɔe xoxo me.** Zaino li eye wole etum, eyata kpɔ nyatakakawo kple agbalẽvi si wota fifia ƒe nyawo ɖa hafi nàgblɔ be nane li.

** JSON-RPC ɖeɖe fia le ŋuɖɔɖotɔe me.** Zaino ƒe JSON RPC interface nye loopback alo trusted private networks negbe ɖe wole dedem kple layer bubu.

## Afi kae magate ŋu asrɔ̃ nu geɖe le?

* [Zaino GitHub ƒe nudzraɖoƒe](https://github.com/zingolabs/zaino)
* [Zaino ƒe nuƒowo](https://github.com/zingolabs/zaino/releases)
* [Zaino ƒe agbalẽwo](https://zingolabs.github.io/zaino/)
* [Z3 ƒe dɔwɔƒe si woazã na ame bubuwo.](https://github.com/ZcashFoundation/z3)
* [Zebra ƒe agbalẽwo](https://zebra.zfnd.org/)
* [Zaino ƒe gakpekpeɖeŋu kple ɖoɖowo me dzodzro](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

** Wowɔ tɔtrɔ mamlɛtɔ le:** August 2026
