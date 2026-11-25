<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zaino Ɖoɖoɖoŋlɔ Ƒuƒoƒe

## Nyatakakavi

* **Zebra** ƒoa nu le Zcash ɖoɖonu la me.
* **Zaino** ɖoɖoa Zebra ƒe ɖoɖonu ƒe nyatakakawo eye wòna API si clientwo zãna.
* **Zallet** nye gakotoku si le Z3 stack me. Le Z3 ƒe ɖoɖo si wozãna zi geɖe la, Zallet ƒoa nu kple Zebra tẽe eye mehiã be wòazã standalone Zaino dɔwɔƒe o.
* Standalone Zaino dɔwɔƒea nyo ne dɔwɔlawo di lightwalletd-compatible gRPC mɔ, JSON-RPC proxy alo dɔwɔƒe si light gakotokuwó, ŋkuɖoɖoƒewo, ga suewo nanaƒewo kple dɔwɔƒe bubuwo zãna.
* Zaino nye dɔwɔƒe si wozãna, gake dɔwɔlawo ele be woakpɔ official Zaino kple Z3 ŋɔŋlɔwo hã le deployment ƒe nyatakakawo ta hafi woazãe le production me.

## Nyatakakadzro Ŋutɔ

Zaino nye Rust ɖoɖoŋlɔ si ɖo Zcash blockchain ŋu. Eƒoa ɖoɖonu ƒe nyatakakawo tso Zebra full node gbɔ. Ena nyatakakawo si gakotokuwó, ŋkuɖoɖoƒewo, ga suewo nanaƒewo kple dɔwɔƒe bubuwo hiã; emegblɔna be Zebra nàɖo clientwo ƒe ɖoɖonu ƒe ɖoɖoŋlɔ blibo ŋu o.

### Nu Ka Ŋuti Wɔna Zaino

Zaino le ɖo anyi titina le Zebra kple client software dome. Zebra nye gbegbɔgblɔ ɖi ƒe ɣaɣla dzesi ŋɔŋlɔ: Etsɔa nyatakakawo ɖoa, ƒoa wo kple wo ƒe ŋutete, eye wòzɔa ɖoɖonu si le Zcash blockchain la nu. Zaino zãa Zebra wònye ɖoɖonu ƒe nyatakakawo ƒe xexlẽƒe, eye emegbe wòɖoa nyatakakawo ɖe dzesiwo nu, ale be client applications ate ŋu abia wo bɔbɔe.

Esia ɖoa dɔa ƒe ƒomeviwo ɖe afɔ:

| Ƒuƒoƒe | Dɔa ƒe ƒomevi |
|:--|:--|
| Zebra | Full node kple nyateƒe kpɔla |
| Zaino | ɖoɖoŋlɔ kple API si clientwo zãna ƒe dɔwɔƒe |
| Zallet | gakotoku dɔwɔƒe |
| lightwalletd | xoxowo ƒe light gakotoku server si Zaino woɖo be wòaxɔ te alo awɔ dɔ kple e |

Zaino naa dɔwɔwɔwo na light clients, full clients alo gakotokuwó kple block ŋu ŋkuɖoɖoƒewo. Ena mɔ be woakpɔ ɖoɖonu si wɔ na nu, ɖoɖonu si menɔ nu wɔ geɖe o si nye best chain, kple mempool ƒe nyatakakawo si Zebra lé.

### Ale Si Wòle le Ƒuƒoƒe Si Wozãna Fifia Zcash Stack Me

Z3 stack si wozãna fifia ɖo Zebra, Zallet kple optional Zaino ŋu.

Le Z3 deployment si wozãna zi geɖe la, Zebra kple Zallet zãa ɣeyiɣi ɖeka. Zallet ƒoa nu kple Zebra tẽe, eye esia ta dɔwɔla si le gakotoku stack si wòɖo ɖe eƒe dɔwɔƒe ŋu ko zãm la mehiã be wòaɖe standalone Zaino dɔwɔƒe la ƒe dɔ o.

Zaino wotsɔna kpe eŋu ne dɔwɔla la di be wòasubɔ client siwo le bɔbɔe o. Le Z3 me, wòzãa `indexer` Compose profile, eye etsɔa esiawo kpe eŋu:

* lightwalletd-compatible gRPC mɔ si light gakotoku clients zãna
* JSON-RPC proxy si ŋkuɖoɖoƒewo, ga suewo nanaƒewo kple service backends zãna
* ɖoɖoŋlɔ database si le Zebra ƒe ɖoɖonu ƒe ŋusẽwo gbɔ

Esia wɔna be Zaino ku ɖe gakotoku backends, dɔwɔƒe siwo zãna le gbɔgbɔa me, ŋkuɖoɖoƒewo, ga suewo nanaƒewo kple mɔ̃ ƒe ɖoɖoŋlɔlawo siwo le dɔwɔƒewo kpɔm be yewoanye Zcash ɖoɖonu ƒe nyatakakawo si wotsɔ ɖoɖoŋu la ŋu la.

### Zaino kple lightwalletd

lightwalletd nye light gakotoku server si wova do ŋgɔ. Zaino nye Rust-based ɖoɖo si dze eƒe teƒe le dɔa sia me. Eƒe taɖodzinu nye be wòana API siwo le compatible, ne woate ŋui, ale be gakotokuwó kple dɔwɔƒewo ate ŋu atrɔ zãm, eye mele be woagbugbɔ wo katasia ŋlɔ o.

Esia mefia be lightwalletd deployment siaa trɔ yi Zaino fifia. Dɔwɔlawo ele be woakpɔ Zaino abe eƒe teƒe le Zebra-based stack si wozãna fifia me ene, eye woakpɔ project ƒe ŋɔŋlɔwo, releases kple service dashboards siwo le fifia hafi woatia nu si wozã.

## Nɔnɔme / Nɔnɔmetata

Bu Zcash blockchain ŋu abe ledger ƒe agbalẽ akpa geɖe le eve me ene.

Zebrae nye agbalẽdzikpɔla. Exɔa agbalẽ akpa yeye ɖesiaɖe, kpɔa eƒe nu nyateƒe, eye ɖoa eƒe teƒe nyuitɔ me.

Zainoe nye ŋkuɖoɖoƒe le agbalẽdzikpɔƒea ŋgɔ. Ekpɔa nu siwo Zebra ɖo, wɔa katalog siwo na woate ŋu adi nu bɔbɔe, eye ƒoa ɖe ame siwo va gbɔa ŋu kaba. Light gakotokuwó, ŋkuɖoɖoƒewo kple ga suewo nanaƒewo vaa ŋkuɖoɖoƒe sia me bia biabia abe "Nu kae le gaɖoɖo sia me?" alo "Gaɖoɖowo kae le mempool la me le mɔ kpɔm?" ene. Ŋkuɖoɖoƒea mebiaa agbalẽ akpa siwo nye nyateƒe o. Dɔ sia nye agbalẽdzikpɔla la tɔ.

Zallet, le Z3 ƒe ɖoɖo si wozãna zi geɖe me la, wòwɔa dɔ le xɔ ɖeka me, eye wòzɔa mɔ tsitre yi agbalẽdzikpɔla la gbɔ. Mehiã be wòayi ŋkuɖoɖoƒea o.

### Nɔnɔmetata aɖewo si fia ale si wòwɔna Zaino

#### Zaino ƒe ŋutɔŋutɔ ƒe Ƒuƒoƒe

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Zaino ƒe Dɔwɔƒe Si Le Dɔ Wɔm Architecture

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Zaino ƒe System Ƒe Architecture

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Nyatakakadzro Blibo

### Dɔwɔla Ƒe Nyatakakawo

Mɔ bɔbɔtɔ si dɔwɔla ate ŋu akpɔ nyateƒe na le deployment me nye Z3 repository. Z3 tsɔa Zaino abe dɔwɔƒe si wozãna ne wodi ene:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Wɔ Z3 ƒe ɖoɖo si wozãna le ɖoɖo nyuitɔ nu gbã, eye lɔ̃ be Zebra nàɖoɖo eƒe nu hafi nàdze dɔwɔƒe siwo ɖo eŋu ƒe dɔ wɔwɔ gɔme le mainnet alo testnet.

Zaino ɖea network ƒe dɔwɔwɔ ƒomevi eve. gRPC dɔwɔwɔa nye API si lightwallet zãna. JSON-RPC dɔwɔwɔa ɖo loopback alo network si me kpɔa nu le le amesiwo ŋu wòɖo ŋu me, negbe ɖoɖo si le bɔbɔe la na kɔkɔe o. Mègana JSON-RPC endpoint si mewɔ authenticate alo encrypt o nàɖe go ɖe public internet ŋu o.

## Vodada Siwo Wona Zi Geɖe

**Bubu be Zaino nye full node.** Zaino menye nyateƒe kpɔla la o. Zebra ƒoa ɖoɖonu la; Zaino ɖoa nyatakakawo tso Zebra dzi.

**Bubu be Z3 deployment siaa hiã standalone Zaino.** Zallet ate ŋu afia mɔ na Zebra tẽe le Z3 stack si wozãna zi geɖe la me. Ɖe Zaino ƒe dɔ ne èhiã standalone indexer dɔwɔƒe la na client siwo le bɔbɔe o.

**Fia planned features abe nu si wodo ɖe dɔ me xoxo ene.** Wole Zaino ƒe ɖoɖo ŋu dɔ wɔm, ale be kpɔ release notes kple ŋɔŋlɔ siwo le fifia hafi nàgblɔ be feature aɖe le zã ge.

**Ɖe JSON-RPC go le mɔ si mekpɔ o.** Zaino ƒe JSON-RPC interface ɖo loopback alo network si me kpɔa nu le le amesiwo ŋu wòɖo ŋu me, negbe ɖoɖo bubu si le eƒe akpa me kpɔa eŋu o.

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
