# Indexer ƒe Dzeside: Zaino kple Ztreamer

Zaino kple Ztreamer nye indexer eve siwo subɔa lightwallet gRPC protocol, API si Zcash kekeli gakotokuwo zãna tsɔ wɔa ɖeka. Axa sia ƒo nu tso wo ame evea tsɔtsɔ sɔ kple wo nɔewo le wo ɖokui si, si woate ŋu agbugbɔ awɔ ŋu kpuie: nenye be wotrɔ ŋuɖoɖo ɖeka mawo ke, ɣeyiɣi didi si woxɔna hafi wotua woƒe index, kple alesi wowɔa gakotokuwo kabakabae.

## TL;DR

* Indexer eveawo siaa trɔa kɔsɔkɔsɔ ŋuti nyatakaka siwo sɔ. Ŋuɖoɖo ɖesiaɖe si woate ŋu alé ŋku ɖe Zebra ŋu la sɔ, eyata gakotokuwo ate ŋu azã wo dometɔ ɖesiaɖe.
* Vovototo siwo wokpɔe nye kɔnyinyiwo kple nugbɔ ƒe nɔnɔmewo: vodada ƒe dzesiwo, hash ɖeka ƒe byte ƒe ɖoɖo, alesi woxlẽa adrɛs si wogbugbɔ ŋlɔ, kple JSON-RPC ƒe ŋuɖoɖo ƒe nɔnɔme ʋee aɖewo.
* Ztreamer tu eƒe index abe 6× kabakaba wu le CPU ma ke dzi. Zaino dzea ŋuɖoɖo gɔme le sɛkɛnd 6 megbe to biabiawo tsɔtsɔ yi na Zebra esime wòle xɔ tum.
* Ztreamer subɔna kabakaba wu le nɔnɔme ɖesiaɖe si wodzidze me: 13–17× blocks geɖe le sɛkɛnd ɖeka me hena gakotoku ƒe kɔpi blibo.
* Zaino's latency ƒe akpa gãtɔ tsoa socket setting ɖeka si bu gbɔ (`TCP_NODELAY`), si tsɔa abe 40 ms ene kpena ɖe biabia geɖewo ŋu. Enye fli ɖeka dzi ɖɔɖɔɖo.

## Nusiwo Wotsɔ Sɔ Kple Wo Nɔewo

| Tu | Backing node si le megbe | Nu ka ta |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` megbenyawo) | Zaino si li ke yeyetɔ si woɖe ɖe go |
| Zaino 0.9.0 ƒe xexlẽme | Zebra 6.4.2 (`direct` megbenyawo) | Gɔmeɖeɖe si wodzidze le Ztreamer's ŋutɔ ƒe tsɔtsɔ sɔ kple wo nɔewo si wota me |
| Ztreamer v0.1.0 ƒe ƒuƒoƒo | Zakura node si wotsɔ de eme | Ztreamer dzesi yeyetɔ kekeake |
| Ztreamer ƒe aƒetɔ | Zakura 1.5.1 si wotsɔ de eme | Nusi Ztreamer's install mɔfiamewo tu |

Wo ame evea zãa aɖaŋu vovovowo:

* **Zaino** zɔna abe dɔwɔwɔ si le vovo ene le a xa [Zebra](Zebra_Full_Node.md) full node, xlẽa Zebra's nɔnɔme, eye wòdzraa eya ŋutɔ ƒe index ɖo. Enye indexer si le.. [Z3 ƒe ƒuƒoƒo](Z3_Stack.md). Kpɔ [Zaino](Zaino.md).
* **Ztreamer** tsɔa a [Zakura](Zakura_Node.md) node (Zebra fork) le ɖoɖo ma ke me eye wòléa compact-block index ɖe asi.

## Ale Si Wodzidzee

* **Nyatakaka ɖeka na amesiame.** Xɔtutu ɖesiaɖe dze egɔme tso Zcash Foundation testnet snapshot ɖeka ma ke dzi, si wofa tsikpe me le kɔkɔme 4,382,897, eyata wo katã wowɔ index ɖe kɔsɔkɔsɔ ɖeka pɛpɛpɛ.
* **Amesiame ateŋu agbugbɔe awɔ.** Nusianu zɔna le duƒula GitHub-hosted femaxee dzi: fork nudzraɖoƒea eye nàwɔ dɔwɔwɔ ƒe ɖoɖo ɖeka.
* **Duƒuƒu etɔ̃ le xɔtutu ɖesiaɖe me**, ɖesiaɖe tso index ƒuƒlu me. Server kple load generator la zɔna le CPU cores vovovowo dzi.
* **Nu ɖekawɔwɔ:** lightwallet-protocol gRPC mɔnu 20 katã (dodokpɔ ƒe nɔnɔme 274), tsɔ byte ɖe byte sɔ kple byte le xɔtutuwo katã me eye wolé ŋku ɖe Zebra's JSON-RPC ŋu. Wolé ŋku ɖe JSON-RPC mɔnu 28 siwo Zaino subɔna hã ŋu.
* **Dɔwɔwɔ:** ɣeyiɣi kple nunɔamesiwo be woatu index la, biabia ɖesiaɖe ƒe ɣeyiɣi didi, block-range throughput, 1 va ɖo 128 concurrent clients, kple gakotoku bliboa ƒe kɔpi tso Sapling ƒe dɔwɔwɔ me yi tip la gbɔ.

## Metsonu

### Index tutu

Duƒuƒu etɔ̃ ƒe titina:

| Tu | Index la wu enu | Ŋuɖoɖo gbãtɔ | Index ƒe lolome le disk dzi |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB ƒe xexlẽme |
| Zaino 0.9.0 ƒe xexlẽme | 1,211 s | 6 s | 22.06 GiB ƒe xexlẽme |
| Ztreamer v0.1.0 ƒe ƒuƒoƒo | 216 s | 210 s | 1.44 GiB ƒe xexlẽme |
| Ztreamer ƒe aƒetɔ | 159 s | 158 s | 1.44 GiB ƒe xexlẽme |

Zaino nye esi woateŋu azã zi ɖeka kloe elabena eɖoa biabiawo ɖe Zebra esime wòle xɔ tum. Ztreamer mesubɔa naneke o vaseɖe esime eƒe index wu enu. Le CPU ƒe kpɔɖeŋu ma ke dzi la, Zaino 0.10.1 xɔ 6–6.5× ƒe didime abe Ztreamer v0.1.0 ene eye wòzã 7.5–8× CPU ƒe ɣeyiɣi (Zebra hã le eme).

### Subɔsubɔdɔ

Duƒuƒu etɔ̃ ƒe titina, le blɔka me le sɛkɛnd ɖeka me negbe ɖe wode dzesii be:

| Nɔnɔme si me wòle | Zaino 0.10.1 | Ztreamer v0.1.0 ƒe ƒuƒoƒo |
|:--|--:|--:|
| Block ƒe didime si nye 1,000 blocks | 11,414 | 179,486 |
| Gakotoku bliboa ƒe kɔpi (280,000 → aɖaŋuɖoɖo) | 11,124 | 189,041 |
| Block ƒe didime nye 1,000 blocks, 128 asisiwo | 110,093 | 229,527 |
| Block ɖeka, asisi 128 (biabia/wo) | 6,843 | 11,044 |

Le asisi 128 me la, dometsotsoa dzi ɖena kpɔtɔna va ɖoa abe 2× ene, elabena seɖoƒe na server eveawo siaa ɖe CPU nu vevi eve ko dzi.

### 40 ms ƒe anyigba

Le Zaino, RPC wuieve dometɔ ade ƒe titinaɣeyiɣi anɔ abe 40 ms ene, eye RPC ɖesiaɖe ƒe alafa memamã 99 lia anɔ abe 41 ms ene. Nusi gbɔ wòtsoe nye alesi Zaino ɖoa eƒe gRPC toɖola: the `TCP_NODELAY` socket option meʋuna gbeɖe o, eyata dɔwɔɖoɖoa léa ŋuɖoɖo suewo ɖe te vaseɖe 40 ms.

Ne èʋu tiatia la tso egodo, evɔ mètrɔ Zaino binary la o la, eɖe anyigba ɖa. Le kpɔɖeŋu me, `GetTreeState` eɖiɖi tso 40.3 ms va ɖo 0.75 ms (Ztreamer: 0.63 ms). Bulk block streaming metrɔ o, eyata throughput gap si le etame la nye nyateƒe.

### Vovototo siwo le nusiwo sɔ kple wo nɔewo me

* **Zaino 0.9.0** tsɔ nyatakaka siwo me kɔ le `GetBlock` le gɔmedzedzea me, afisi ɖoɖowɔɖia gblɔ be gɔmedzedzea nye shielded data ɖeɖeko. Woɖɔ esia ɖo le 0.10.1 me.
* **`GetSubtreeRoots`:** the `completingBlockHash` field zãa byte ƒe ɖoɖo siwo tsi tre ɖe wo nɔewo ŋu le indexer eveawo dzi. Gakotoku siwo li fifia mexlẽa akpa sia o.
* **Vodada ƒe dzesiwo:** Zaino trɔ gbɔ `INTERNAL` le nya gbegblẽ siwo wotsɔ de eme ta; Ztreamer trɔ gbɔ `INVALID_ARGUMENT` or `NOT_FOUND`.
* **Adrɛs siwo wogbugbɔ ŋlɔ** le `GetTaddressBalanceStream` woxlẽa wo zi eve, negbe le Ztreamer master dzi ko.
* **JSON-RPC:** Zaino's `getrawtransaction` kple verbosity 0 trɔa nu ɖe hex ka teƒe, to vovo na Zebra kple zcashd.

## Seɖoƒewo

* **Testnet ɖeɖeko.** Testnet blocks le sue wu mainnet tɔ, eyata ɣeyiɣi blibowo kple lolomewo menye mainnet ƒe xexlẽdzesiwo o. Nusɔsrɔ̃a nye nusi sɔ, le nusiwo wotsɔ de eme siwo sɔ dzi.
* **CI mɔ̃ siwo woama** kple CPU ƒe kpɔɖeŋu geɖewo. Nyatakaka bliboa na CPU ɖeka ƒe tsɔtsɔ sɔ kple wo nɔewo na tanya ƒe xexlẽdzesiwo.
* **Womedzidzee o:** reorgs, kplɔ kɔsɔkɔsɔ gbagbe ƒe nugbɔ, mempool agba, kple TLS yome.

## Afisi Nàsrɔ̃ Nu Geɖe Le

* Nyatakaka bliboa: [zcash-indexer-bench/nyatakaka/nyatakaka.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Benchmark ƒe nudzraɖoƒe: [github.com/pearl-max468/zcash-nufiamɔ̃-zikpui dzi](https://github.com/pearl-max468/zcash-indexer-bench)
* Nyatakaka xoxowo: [emetsonuwo-2026-10-10 ƒe dodo](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino ƒe agbalẽwo](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh ƒe agbalẽ](https://ztreamer.sh)
