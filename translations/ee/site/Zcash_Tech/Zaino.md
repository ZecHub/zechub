<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zaino Nyatakaka ƒe Xexlẽla

## Nyatakaka Kpuie

* **Zebra** dea Zcash ƒe ɖoɖonu dzi.
* **Zaino** xlea Zebra ƒe ɖoɖonu ƒe nyatakakawo eye wòna API siwo le client ƒe ŋgɔ.
* **Zallet** nye gakotoku ƒe akpa le Z3 ƒe ɖoɖo me. Le Z3 ƒe ɖoɖo si wowɔ do ŋgɔ la me, Zallet ƒoa nu kple Zebra tẽ, eye wòmehia be woawɔ Zaino dɔwɔƒe si le eƒe ŋutɔ.
* Zaino dɔwɔƒe si le eƒe ŋutɔ la wɔnɛ na dɔwɔlawo ne wohia gRPC ƒe teƒe si sɔ kple lightwalletd, JSON-RPC ƒe proxy, alo ɖoɖo na gakotoku siwo me, explorers, ga suewo nanaƒewo, kple dɔwɔƒe siwo sɔ kple wo.
* Zaino nye ɖoɖo si le dɔ wɔm fifia, gake dɔwɔlawo ele be woakpɔ Zaino kple Z3 ƒe nyatakaka si le zãm fifia hafi woawɔe le production me.

## Nyatakakadzro Ŋutɔ

Zaino nye Rust ɖoɖoŋlɔ si ɖo Zcash blockchain ŋu. Eƒoa ɖoɖonu ƒe nyatakakawo tso Zebra full node gbɔ. Ena nyatakakawo si gakotokuwó, ŋkuɖoɖoƒewo, ga suewo nanaƒewo kple dɔwɔƒe bubuwo hiã; emegblɔna be Zebra nàɖo clientwo ƒe ɖoɖonu ƒe ɖoɖoŋlɔ blibo ŋu o.

### Nu Ka Ŋuti Wɔna Zaino

Zaino nɔa Zebra kple client ƒe mɔ̃wo dome. Zebra nye gbegbɔgblɔ ɖi [consensus] ƒe ɣaɣla dzesi ŋɔŋlɔ [node]: ewɔ download, ekpɔ ɖoɖonu ƒe nyateƒe, eye wòzɔ ɖe Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi. Zaino zãa Zebra abe eƒe ɖoɖonu ƒe nyatakaka ƒe teƒe ene, eye wòdzra nyatakaka si woexlẽ ɖo be client ƒe applicationwo ate ŋu abiabia wo bɔbɔe.

Mama wɔnɛ be dɔwɔƒeawo ƒe dɔwo nɔ kɔ:

| Akpa | Eƒe Dɔ |
|:--|:--|
| Zebra | Ɣaɣla dzesi ŋɔŋlɔ blibo kple nyateƒe ƒe kpɔla |
| Zaino | Nyatakaka ƒe xexlẽla kple API dɔwɔƒe si le client ƒe ŋgɔ |
| Zallet | Gakotoku ƒe dɔwɔƒe |
| lightwalletd | Gakotoku si me ƒe server xoxotɔ si Zaino woɖoe be wòatsɔ teƒe na alo wòakpe ɖe eŋu |

Zaino naa dɔwɔwɔwo na light clients, full clients alo gakotokuwó kple block ŋu ŋkuɖoɖoƒewo. Ena mɔ be woakpɔ ɖoɖonu si wɔ na nu, ɖoɖonu si menɔ nu wɔ geɖe o si nye best chain, kple mempool ƒe nyatakakawo si Zebra lé.

### Ale Si Wòle le Ƒuƒoƒe Si Wozãna Fifia Zcash Stack Me

Z3 ƒe ɖoɖo si le zãm fifia tu ɖe Zebra, Zallet, kple Zaino si wòate ŋu anya la dzi.

Le Z3 ƒe ɖoɖo si wowɔ do ŋgɔ la me, Zebra kple Zallet wɔa dɔ ɖekae. Zallet va ɖe Zebra tẽ, eyata dɔwɔla si le gakotoku ƒe ɖoɖo le eƒe teƒe ko wɔm la mehia be wòadzɔ Zaino dɔwɔƒe si le eƒe ŋutɔ o.

Woɖea Zaino kpe ɖe eŋu ne dɔwɔla di be yeana dɔ na client siwo le afima. Le Z3 me, wɔa dɔ le `indexer` Compose profile megbe eye wòkpea ɖe eŋu be:

* GRPC ƒe teƒe si sɔ kple lightwalletd na gakotoku si me ƒe clientwo
* JSON-RPC ƒe proxy na explorers, ga suewo nanaƒewo, kple service backendwo
* Xexlẽla ƒe database si to vovo na Zebra ƒe ɖoɖonu ƒe nɔnɔme

Eya ta Zaino le vevie na gakotoku ƒe backendwo, dɔwɔla siwo le dukɔ blibo ƒe ɖoɖo wɔm, explorers, ga suewo nanaƒewo, kple mɔ̃ ƒe ɖoɖoŋlɔlawo [developer] siwo le dɔwɔƒe siwo hia Zcash ƒe ɖoɖonu nyatakaka si woexlẽ ɖo la dometɔwo kpɔm.

### Zaino kple lightwalletd

lightwalletd nye gakotoku si me ƒe server gãtɔ. Zaino nye mɔ si doa ɖe Rust dzi na dɔ sia. Eƒe taɖodzinu nye be wòana API siwo sɔ kple wo le afi si wòate ŋu, ale be gakotokuwɔ kple dɔwɔƒeawo nate ŋu atrɔ va eŋu mekpɔ be woagblẽ wo katã gake ɖe kɔkɔe.

Esia mefia be lightwalletd ƒe ɖoɖowo katã trɔ va Zaino dzi xoxo o. Dɔwɔlawo ele be woakpɔ Zaino abe Zebra-based ɖoɖo si le zãm fifia ƒe akpa ene, eye woakpɔ project ƒe nyatakaka yeyewo, releases, kple service ɖoɖowo ƒe ɖoɖowo ƒuƒopé [dashboard] hafi woatia nu si woawɔ.

## Nɔnɔme / Nɔnɔmetata

Bu Zcash blockchain ŋu abe ledger ƒe agbalẽ akpa geɖe le eve me ene.

Zebrae nye agbalẽdzikpɔla. Exɔa agbalẽ akpa yeye ɖesiaɖe, kpɔa eƒe nu nyateƒe, eye ɖoa eƒe teƒe nyuitɔ me.

Zainoe nye ŋkuɖoɖoƒe le agbalẽdzikpɔƒea ŋgɔ. Ekpɔa nu siwo Zebra ɖo, wɔa katalog siwo na woate ŋu adi nu bɔbɔe, eye ƒoa ɖe ame siwo va gbɔa ŋu kaba. Light gakotokuwó, ŋkuɖoɖoƒewo kple ga suewo nanaƒewo vaa ŋkuɖoɖoƒe sia me bia biabia abe "Nu kae le gaɖoɖo sia me?" alo "Gaɖoɖowo kae le mempool la me le mɔ kpɔm?" ene. Ŋkuɖoɖoƒea mebiaa agbalẽ akpa siwo nye nyateƒe o. Dɔ sia nye agbalẽdzikpɔla la tɔ.

Zallet, le Z3 ƒe ɖoɖo si wozãna zi geɖe me la, wòwɔa dɔ le xɔ ɖeka me, eye wòzɔa mɔ tsitre yi agbalẽdzikpɔla la gbɔ. Mehiã be wòayi ŋkuɖoɖoƒea o.

### Nɔnɔmetata aɖewo si fia ale si wòwɔna Zaino

#### Zaino ƒe ŋutɔŋutɔ ƒe Ƒuƒoƒe

![Zaino ƒe ɖoɖo me](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Zaino ƒe Dɔwɔƒe Si Le Dɔ Wɔm Architecture

![Zebra ƒe dɔwɔwɔ le esime](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Zaino ƒe System Ƒe Architecture

![Zaino ƒe ɖoɖo](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Nyatakakadzro Blibo

### Dɔwɔla Ƒe Nyatakakawo

Mɔ bɔbɔe si wɔa dɔ le authority me na deployment nye Z3 ƒe repository. Z3 tsɔa Zaino dea eme abe service si wòate ŋu anya ene:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Wɔ Z3 ƒe ɖoɖo si wozãa ɣea gbã do ŋgɔ, eye nɔ anyi ne Zebra ade sync hafi nàdzɔ dɔwɔƒe siwo ɖe eŋu le mainnet alo testnet dzi.

Zaino ɖea network ƒe dɔwɔwɔ ƒomevi eve. gRPC dɔwɔwɔa nye API si lightwallet zãna. JSON-RPC dɔwɔwɔa ɖo loopback alo network si me kpɔa nu le le amesiwo ŋu wòɖo ŋu me, negbe ɖoɖo si le bɔbɔe la na kɔkɔe o. Mègana JSON-RPC endpoint si mewɔ authenticate alo encrypt o nàɖe go ɖe public internet ŋu o.

## Vodada Siwo Dzɔna Zi Geɖe

**Be woatrɔ Zaino abe ɣaɣla dzesi ŋɔŋlɔ blibo ene.** Zaino menye nyateƒe ƒe kpɔla o. Zebra kpɔa ɖoɖonu ƒe nyateƒe; Zaino xlea nyatakaka tso Zebra me.

**Be woabu be Z3 ƒe ɖoɖo sia sia hia Zaino si le eƒe ŋutɔ.** Zallet ate ŋu ava ɖe Zebra tẽ le Z3 ƒe ɖoɖo si wowɔ do ŋgɔ la me. Dzɔ Zaino ne wòhia xexlẽla ƒe dɔwɔƒe si le eƒe ŋutɔ na client siwo le afima.

**Be woagblɔ nu si woɖoe be woawɔ la abe nu si wode dɔm xoxo ene.** Zaino le mɔ̃ ƒe ɖoɖo me sesĩe, eyata kplɔ release ƒe nyatakakawo kple docs si le zãm fifia ɖo hafi nàgblɔ be feature aɖe li.

**Be woaɖe JSON-RPC fia keŋkeŋ.** Zaino ƒe JSON-RPC ƒe interface nye loopback alo private network siwo wobɔ ŋu ko, negbe be akpa bubu aɖe le eŋu dom.

## Page Siwo Kpɔ ɖe Eŋu

- [Nodowo Na Lightwallet](/zcash-tech/lightwallet-nodes): server siwo light gakotokuwó ƒoa nu kple wo, lightwalletd kple Zaino, kple ale si nàatrɔ tso wo dome.
- [Zinder](/zcash-tech/zinder), Zcash Foundation (alpha) ƒe Rust ɖoɖoŋlɔ bubu
- [Zebra Full Node](/zcash-tech/zebra-full-node): node si Zaino xɔa eƒe ɖoɖonu ƒe nyatakakawo tso.
- [Zallet](/zcash-tech/zallet): full-node gakotoku le Z3 stack me.
- [Z3 Stack](/zcash-tech/z3-stack): Zebra, Zallet kple indexer Zaino si wotsɔ ƒo ƒu.
- [Indexer ƒe KPI: Zaino kple Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): ŋkuɖoɖo si me woate ŋu awɔ ɖoɖo dzi le lightwallet indexer eve ŋu.
- [Full Nodes](/zcash-tech/full-nodes): nyatakakadzro tso Zcash ƒe full node software ŋu.
- [Zcash Gakotoku Ƒe Nu Ɖoɖo](/zcash-tech/zcash-wallet-syncing): taɖodzinu si ta gakotoku ɣaɣla hiã ƒe nu ɖoɖo gɔmeŋu.

### Resources

* [Zaino GitHub repository](https://github.com/zingolabs/zaino)
* [Zaino releases](https://github.com/zingolabs/zaino/releases)
* [Zaino ŋɔŋlɔ si wotu](https://zingolabs.github.io/zaino/)
* [Z3 deployment repository](https://github.com/ZcashFoundation/z3)
* [Zebra ŋɔŋlɔ](https://zebra.zfnd.org/)
* [Zaino ga ƒe kpekpeɖeŋu kple project ƒe nyati wɔwɔ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Ɣeyiɣi si wogbugbɔ ɖo ŋu:** November 2026
