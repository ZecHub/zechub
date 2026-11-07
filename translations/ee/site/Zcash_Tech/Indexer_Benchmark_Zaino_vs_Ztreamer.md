# Indexer ƒe dodokpɔ: Zaino vs Ztreamer

Zaino kple Ztreamer nye indexer [indexers] eve siwo dea lightwallet gRPC protocol, API si Zcash light gakotoku [wallets] wɔa dɔe be woasynchronise. Axɔ sia ƒo nu tso ƒe siawo ƒe sɔsɔ me, si wòate ŋu awɔ ake hã: ɖe woɖoa ŋuɖoɖowo ɖeka, ɣeyiɣi si woxɔna be woatu woƒe index, kple ale si wodea gakotokuwo dɔ enumake.

## Nunya vevi

* Indexer evea woɖoa ɖoɖonu [chain] ƒe nyatakakawo nyuie. Ŋuɖoɖo siawo katã si woate ŋu akpɔ sɔ kple Zebra la sɔ, eyata gakotokuwo ate ŋu azã wo dometɔ ɖe sia ɖe.
* Vovototo siwo wokpɔ la nye wɔnɔnɔwo kple nɔnɔme siwo menye gbe sia gbe o: vodada ƒe codewo, hash ɖeka ƒe byte ƒe ɖoɖo, ale si woxlẽ gaɖoƒe ƒe dzesi [address] si wogbugbɔ, kple JSON-RPC ŋuɖoɖowo ƒe nɔnɔme ʋɛ aɖewo.
* Ztreamer tua eƒe index kple keke 6× kabakaba wu le CPU ma ke dzi. Zaino dzena ŋuɖoɖoɖe le sekɔnd 6 megbe, esi wòtsɔa biabiawo ɖe Zebra gbɔ le esime wòle eƒe index tum.
* Ztreamer dea dɔ kabakaba le nɔnɔme siawo katã si wodɔ kpɔ la me: gaɖoɖowo ƒuƒoƒewo [blocks] geɖe wu 13–17× le sekɔnd ɖeka me le gakotoku blibo ƒe download me.
* Zaino ƒe ɣeyiɣi si woxɔna ahã tso socket ƒe ɖoɖo ɖeka si melekpɔ o (`TCP_NODELAY`) me, si tsɔna ms 40 kple biabia geɖe. Woate ŋu awɔe kple fli ɖeka.

## Nu Si Wosɔ Kple Nuwɔwɔ

| Tutu | Node si le megbe | Nu ka ta |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` backend) | Zaino ƒe release si li ke dzi |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` backend) | Version si wodzidzɔ le Ztreamer ƒe sɔsɔ si wotsɔ do go ŋu |
| Ztreamer v0.1.0 | Zakura node si wode ɖe eme | Ztreamer tag si li ke dzi |
| Ztreamer master | Zakura 1.5.1 si wode ɖe eme | Nu si Ztreamer ƒe install ƒe mɔfiamewo tua |

Wo evea zã mɔ vovovowo:

* **Zaino** wɔa dɔ abe process bubu ene ɖe [Zebra](Zebra_Full_Node.md) ɣaɣla dzesi ŋɔŋlɔ blibo [full node] ƒe gbɔ, exlẽa Zebra ƒe nɔnɔme, eye wòle eya ŋutɔ ƒe index ŋu. Eyae nye indexer le [Z3 stack](Z3_Stack.md) me. Kpɔ [Zaino](Zaino.md).
* **Ztreamer** dea [Zakura](Zakura_Node.md) node (Zebra ƒe fork) ɖe process ma ke me, eye wòle compact-block index ɖe asi.

## Ale Si Wodzidzɔe

* **Nyatakaka ma ke na ame sia ame.** Tutu siawo katã dze egɔme tso Zcash Foundation testnet snapshot ma ke me, si wode te le kɔkɔƒe 4,382,897, eyata wo katã wɔ index le ɖoɖonu ma ke ŋu.
* **Ame sia ame ate ŋu awɔe ake.** Nu siawo katã wɔa dɔ le GitHub-hosted runnerwo siwo menye ga o dzi: wɔ repository la ƒe fork eye nàƒu workflow ɖeka du.
* **Wɔwɔ etɔ na tutu ɖe sia ɖe**, tso index si meɖe asi o me. Server kple load generator la wɔa dɔ le CPU core vovovo dzi.
* **Mɔdzidzɔ:** lightwallet-protocol gRPC ƒe method 20 katã (test case 274), wosɔ wo byte ɖe byte le tutuwo dome eye wokpɔ wo sɔ kple Zebra ƒe JSON-RPC. JSON-RPC method 28 si Zaino dea dɔe la hã wokpɔ.
* **Dɔwɔwɔ ƒe kabakaba:** ɣeyiɣi kple nu siwo wodzã be woatu index, biabia ɖe sia ɖe ƒe ɣeyiɣi, gaɖoɖowo ƒuƒoƒewo ƒe throughput, klient 1 va se 128, kple gakotoku blibo ƒe download tso Sapling activation yi tip.

## Emetsotso

### Index tutu

Woxɔ etiti le wɔwɔ etɔ me:

| Tutu | Index wowu | Ŋuɖoɖo gbãtɔ | Index ƒe lolome le disk dzi |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino mate ŋu azã zi gbãtɔe, elabena wòtsɔa biabiawo ɖo Zebra gbɔ le esime wòle index la tum. Ztreamer mede dɔ aɖeke o vaseɖe esi eƒe index la wo wu. Le CPU model ma ke dzi, Zaino 0.10.1 xɔ ɣeyiɣi 6–6.5× wu Ztreamer v0.1.0, eye wòzã CPU ƒe ɣeyiɣi 7.5–8× (Zebra hã le eme).

### Dɔde asi

Woxɔ etiti le wɔwɔ etɔ me, le gaɖoɖowo ƒuƒoƒewo le sekɔnd ɖeka me, negbe woɖo eƒe bubu:

| Nɔnɔme | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Gaɖoɖowo ƒuƒoƒe 1,000 | 11,414 | 179,486 |
| Gakotoku blibo ƒe download (280,000 → tip) | 11,124 | 189,041 |
| Gaɖoɖowo ƒuƒoƒe 1,000, klient 128 | 110,093 | 229,527 |
| Gaɖoɖowo ƒuƒoƒe ɖeka, klient 128 (biabiawo/s) | 6,843 | 11,044 |

Kple klient 128 la, vovototo la gbɔna ɖe 2× ŋu, elabena server evea wokaka wo ɖe CPU core eve ko ŋu.

### Ms 40 ƒe teƒe

Le Zaino dzi la, RPC 12 dometɔ 6 ƒe median latency le ms 40 ƒe akpa, eye RPC sia sia ƒe percentile 99 le ms 41 ƒe akpa. Eƒe tae nye ale si Zaino ɖoa eƒe gRPC listener: `TCP_NODELAY` socket option la mede dzi o, eyata operating system la naa ŋuɖoɖo suewo nɔa anyi va se ms 40.

Esi womina option la dze egɔme tso gota, eye wometrɔ Zaino binary o la, teƒe la bu. Kpɔe be, `GetTreeState` tso ms 40.3 yi ms 0.75 (Ztreamer: ms 0.63). Gaɖoɖowo ƒuƒoƒewo ƒe streaming gã metrɔ o, eyata throughput ƒe vovototo si le etame la nye nyateƒe.

### Mɔdzidzɔ ƒe vovototowo

* **Zaino 0.9.0** tsɔa nuwo ƒe ʋuʋuɖi [transparent] ƒe nyatakaka ɖea `GetBlock` me le gɔmedzedze nu, afi si protocol la gblɔ be gɔmedzedze la nye ɣaɣla [shielded] ƒe nyatakaka ko. Woɖo nu sia ɖe 0.10.1 me.
* **`GetSubtreeRoots`:** `completingBlockHash` field la zã byte ƒe ɖoɖo vovovo le indexer evea dome. Gakotoku siwo li fifia mexlẽa field sia o.
* **Vodada ƒe codewo:** Zaino naa `INTERNAL` na input vɔ̃; Ztreamer naa `INVALID_ARGUMENT` alo `NOT_FOUND`.
* **Gaɖoƒe ƒe dzesi siwo wogbugbɔ** le `GetTaddressBalanceStream` me la woxlẽ wo zi eve, negbe le Ztreamer master dzi ko.
* **JSON-RPC:** Zaino ƒe `getrawtransaction` kple verbosity 0 naa object ɖe hex string teƒe, to vovo na Zebra kple zcashd.

## Nu Si Womete Ŋu Wodɔ Kpɔ O

* **Testnet ko.** Testnet ƒe gaɖoɖowo ƒuƒoƒewo sue wu mainnet tɔ, eyata ɣeyiɣi kple lolome ƒe namba siwo li fɔ̃ me menye mainnet ƒe namba o. Sɔsɔ la nye relative, le input siwo sɔ pɛpɛ me.
* **CI machine siwo wozã ɖekae** kple CPU model geɖewo. Report blibo la tsɔ sɔsɔ siwo wɔ le CPU ma ke dzi na headline ƒe nambawo.
* **Womedzidzɔ o:** reorgs, ɖoɖonu si le agbe ƒe tip yometoto, mempool ƒe load, kple TLS.

## Afisi Nàsrɔ Nu Geɖe Le

* Report blibo: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Benchmark repository: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Nyatakaka raw: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
