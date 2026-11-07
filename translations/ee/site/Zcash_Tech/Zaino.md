# Zaino Nyatakaka ƒe Xexlẽla

Zaino nye Rust nyatakaka ƒe xexlẽla na Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain]. Etsɔ ɖoɖonu [chain] ƒe nyatakakawo xlea tso Zebra ɣaɣla dzesi ŋɔŋlɔ blibo [full node] me, eye wòtsɔ nyatakaka si gakotokuwɔ [wallet], explorers, ga suewo nanaƒewo [faucet], kple dɔwɔƒe bubuwo hia naa wo, menye be Zebra ŋutɔ nanɔ agbagba be yea wòanɔ client ƒe ŋgɔ ƒe xexlẽwo katã wɔ.

## Nyatakaka Kpuie

* **Zebra** dea Zcash ƒe ɖoɖonu dzi.
* **Zaino** xlea Zebra ƒe ɖoɖonu ƒe nyatakakawo eye wòna API siwo le client ƒe ŋgɔ.
* **Zallet** nye gakotoku ƒe akpa le Z3 ƒe ɖoɖo me. Le Z3 ƒe ɖoɖo si wowɔ do ŋgɔ la me, Zallet ƒoa nu kple Zebra tẽ, eye wòmehia be woawɔ Zaino dɔwɔƒe si le eƒe ŋutɔ.
* Zaino dɔwɔƒe si le eƒe ŋutɔ la wɔnɛ na dɔwɔlawo ne wohia gRPC ƒe teƒe si sɔ kple lightwalletd, JSON-RPC ƒe proxy, alo ɖoɖo na gakotoku siwo me, explorers, ga suewo nanaƒewo, kple dɔwɔƒe siwo sɔ kple wo.
* Zaino nye ɖoɖo si le dɔ wɔm fifia, gake dɔwɔlawo ele be woakpɔ Zaino kple Z3 ƒe nyatakaka si le zãm fifia hafi woawɔe le production me.

## Nu Si Zaino Wɔna

Zaino nɔa Zebra kple client ƒe mɔ̃wo dome. Zebra nye gbegbɔgblɔ ɖi [consensus] ƒe ɣaɣla dzesi ŋɔŋlɔ [node]: ewɔ download, ekpɔ ɖoɖonu ƒe nyateƒe, eye wòzɔ ɖe Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi. Zaino zãa Zebra abe eƒe ɖoɖonu ƒe nyatakaka ƒe teƒe ene, eye wòdzra nyatakaka si woexlẽ ɖo be client ƒe applicationwo ate ŋu abiabia wo bɔbɔe.

Mama wɔnɛ be dɔwɔƒeawo ƒe dɔwo nɔ kɔ:

| Akpa | Eƒe Dɔ |
|:--|:--|
| Zebra | Ɣaɣla dzesi ŋɔŋlɔ blibo kple nyateƒe ƒe kpɔla |
| Zaino | Nyatakaka ƒe xexlẽla kple API dɔwɔƒe si le client ƒe ŋgɔ |
| Zallet | Gakotoku ƒe dɔwɔƒe |
| lightwalletd | Gakotoku si me ƒe server xoxotɔ si Zaino woɖoe be wòatsɔ teƒe na alo wòakpe ɖe eŋu |

Zaino naa dɔwɔnu na nyatakaka si hiã ƒe mɔwo [light client], client blibowo alo gakotokuwɔ, kple gaɖoɖowo ƒuƒoƒe [block] ƒe explorers. Ena mɔ woakpɔ ɖoɖonu si wowɔ ɖo, ɖoɖonu nyuitɔ si womede ɖo haɖe o, kple mempool ƒe nyatakaka si Zebra le ɖasi.

## Ale Si Wòle Le Zcash Ƒe Ɖoɖo Si Le Zãm Fifi La Me

Z3 ƒe ɖoɖo si le zãm fifia tu ɖe Zebra, Zallet, kple Zaino si wòate ŋu anya la dzi.

Le Z3 ƒe ɖoɖo si wowɔ do ŋgɔ la me, Zebra kple Zallet wɔa dɔ ɖekae. Zallet va ɖe Zebra tẽ, eyata dɔwɔla si le gakotoku ƒe ɖoɖo le eƒe teƒe ko wɔm la mehia be wòadzɔ Zaino dɔwɔƒe si le eƒe ŋutɔ o.

Woɖea Zaino kpe ɖe eŋu ne dɔwɔla di be yeana dɔ na client siwo le afima. Le Z3 me, wɔa dɔ le `indexer` Compose profile megbe eye wòkpea ɖe eŋu be:

* GRPC ƒe teƒe si sɔ kple lightwalletd na gakotoku si me ƒe clientwo
* JSON-RPC ƒe proxy na explorers, ga suewo nanaƒewo, kple service backendwo
* Xexlẽla ƒe database si to vovo na Zebra ƒe ɖoɖonu ƒe nɔnɔme

Eya ta Zaino le vevie na gakotoku ƒe backendwo, dɔwɔla siwo le dukɔ blibo ƒe ɖoɖo wɔm, explorers, ga suewo nanaƒewo, kple mɔ̃ ƒe ɖoɖoŋlɔlawo [developer] siwo le dɔwɔƒe siwo hia Zcash ƒe ɖoɖonu nyatakaka si woexlẽ ɖo la dometɔwo kpɔm.

## Zaino Kple lightwalletd

lightwalletd nye gakotoku si me ƒe server gãtɔ. Zaino nye mɔ si doa ɖe Rust dzi na dɔ sia. Eƒe taɖodzinu nye be wòana API siwo sɔ kple wo le afi si wòate ŋu, ale be gakotokuwɔ kple dɔwɔƒeawo nate ŋu atrɔ va eŋu mekpɔ be woagblẽ wo katã gake ɖe kɔkɔe.

Esia mefia be lightwalletd ƒe ɖoɖowo katã trɔ va Zaino dzi xoxo o. Dɔwɔlawo ele be woakpɔ Zaino abe Zebra-based ɖoɖo si le zãm fifia ƒe akpa ene, eye woakpɔ project ƒe nyatakaka yeyewo, releases, kple service ɖoɖowo ƒe ɖoɖowo ƒuƒopé [dashboard] hafi woatia nu si woawɔ.

## Dɔwɔla Ƒe Nɔteƒe Nyatakakawo

Mɔ bɔbɔe si wɔa dɔ le authority me na deployment nye Z3 ƒe repository. Z3 tsɔa Zaino dea eme abe service si wòate ŋu anya ene:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Wɔ Z3 ƒe ɖoɖo si wozãa ɣea gbã do ŋgɔ, eye nɔ anyi ne Zebra ade sync hafi nàdzɔ dɔwɔƒe siwo ɖe eŋu le mainnet alo testnet dzi.

Zaino ɖea network dɔwɔƒe ƒomevi eve fia. GRPC ƒe dɔwɔƒe nye API si le lightwallet ƒe ŋgɔ. JSON-RPC ƒe dɔwɔƒe la wotu eɖe loopback alo private network siwo wobɔ ŋu ko, negbe be akpa bubu nana dzɔdzɔe. Mègana JSON-RPC ƒe teƒe si me authentication alo encryption mele o nado go ɖe public internet dzi o.

## Nɔnɔmetata Aɖewo Siwo Fia Ale Si Zaino Wɔa Dɔ

### Zaino Ƒe Nɔnɔme Le Eme

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Ƒe Dɔwɔƒe Nɔnɔme Si Le Agbe

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino Ƒe System Nɔnɔme

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Vodada Siwo Dzɔna Zi Geɖe

**Be woatrɔ Zaino abe ɣaɣla dzesi ŋɔŋlɔ blibo ene.** Zaino menye nyateƒe ƒe kpɔla o. Zebra kpɔa ɖoɖonu ƒe nyateƒe; Zaino xlea nyatakaka tso Zebra me.

**Be woabu be Z3 ƒe ɖoɖo sia sia hia Zaino si le eƒe ŋutɔ.** Zallet ate ŋu ava ɖe Zebra tẽ le Z3 ƒe ɖoɖo si wowɔ do ŋgɔ la me. Dzɔ Zaino ne wòhia xexlẽla ƒe dɔwɔƒe si le eƒe ŋutɔ na client siwo le afima.

**Be woagblɔ nu si woɖoe be woawɔ la abe nu si wode dɔm xoxo ene.** Zaino le mɔ̃ ƒe ɖoɖo me sesĩe, eyata kplɔ release ƒe nyatakakawo kple docs si le zãm fifia ɖo hafi nàgblɔ be feature aɖe li.

**Be woaɖe JSON-RPC fia keŋkeŋ.** Zaino ƒe JSON-RPC ƒe interface nye loopback alo private network siwo wobɔ ŋu ko, negbe be akpa bubu aɖe le eŋu dom.

## Afika Nɔate Ŋu Asrɔ̃ Nu Geɖe?

* [Zaino GitHub ƒe repository](https://github.com/zingolabs/zaino)
* [Zaino ƒe releases](https://github.com/zingolabs/zaino/releases)
* [Zaino ƒe nyatakaka si wowɔ](https://zingolabs.github.io/zaino/)
* [Z3 ƒe deployment repository](https://github.com/ZcashFoundation/z3)
* [Zebra ƒe nyatakaka](https://zebra.zfnd.org/)
* [Zaino ƒe ga ƒe kpekpeɖeŋu [grant] kple project ƒe ƒoƒo](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Wotrɔe zi mamlɛtɔ:** August 2026
