# Àmì Àtòjọ: Zaino vs Ztreamer

Zaino àti Ztreamer jẹ́ àwọn olùtọ́ka méjì tí wọ́n ń ṣiṣẹ́ fún ìlànà lightwallet gRPC, API tí àwọn àpò owó Zcash light ń lò láti so pọ̀. Ojú ìwé yìí ṣàkópọ̀ àfiwé ara-ẹni tí ó dá dúró, tí a lè tún ṣe àtúnṣe ti àwọn méjèèjì: bóyá wọ́n dá àwọn ìdáhùn kan náà padà, bí wọ́n ṣe pẹ́ tó láti kọ́ àkójọ owó wọn, àti bí wọ́n ṣe yára ṣiṣẹ́ fún àpò owó.

## TL;DR

* Àwọn atọ́ka méjèèjì máa ń dá ìwífún ẹ̀wọ̀n tó tọ́ padà. Gbogbo ìdáhùn tí a lè ṣàyẹ̀wò sí Zebra báramu, nítorí náà àwọn àpò owó lè lo èyíkéyìí nínú wọn.
* Àwọn ìyàtọ̀ tí a rí ni àwọn àṣà àti àwọn ọ̀ràn ẹ̀gbẹ́: àwọn kódù àṣìṣe, ìtòlẹ́sẹẹsẹ byte ti hash kan, bí a ṣe ń ka àdírẹ́sì tí a ṣe àdàkọ, àti àwọn ìrísí ìdáhùn JSON-RPC díẹ̀.
* Ztreamer ń kọ́ àtọ́ka rẹ̀ ní ìwọ̀n 6× kíákíá lórí CPU kan náà. Zaino bẹ̀rẹ̀ sí í dáhùn lẹ́yìn ìṣẹ́jú-àáyá mẹ́fà nípa fífi àwọn ìbéèrè ránṣẹ́ sí Zebra nígbà tí ó ń kọ́lé.
* Ztreamer ṣiṣẹ ni iyara ni gbogbo ipo ti a wọn: awọn bulọọki 13–17× diẹ sii fun iṣẹju-aaya kan fun igbasilẹ apamọwọ kikun.
* Pupọ ninu idaduro Zaino's wa lati inu eto socket kan ti o sọnu (`TCP_NODELAY`), èyí tí ó fi nǹkan bí 40 ms kún ọ̀pọ̀lọpọ̀ ìbéèrè. Ó jẹ́ àtúnṣe ìlà kan ṣoṣo.

## Kí Ni Wọ́n Fiwé

| Kọ́ | Nódù àtìlẹ́yìn | Kílódé? |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` ẹ̀yìn) | Ìtújáde tuntun ti Zaino tí ó dúró ṣinṣin |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` ẹ̀yìn) | Ẹ̀yà tí a wọ̀n nínú àfiwé Ztreamer's ṣe àtẹ̀jáde rẹ̀ |
| Ztreamer v0.1.0 | Nọ́mbà Zakura tí a fi sínú rẹ̀ | Àmì Ztreamer tuntun |
| Olùdarí Ztreamer | Zakura tí a fi sínú 1.5.1 | Ohun ti awọn ilana fifi sori ẹrọ Ztreamer's kọ |

Àwọn méjèèjì lo àwọn àwòrán tó yàtọ̀ síra:

* **Zaino** n ṣiṣẹ gẹgẹbi ilana lọtọ lẹgbẹ kan [Zebra](Zebra_Full_Node.md) nọ́mbà pípé, ó ka ipò Zebra's, ó sì ń pa àtọ́ka tirẹ̀ mọ́. Ó jẹ́ àtọ́ka nínú [Àkójọpọ̀ Z3](Z3_Stack.md). Wo [Zaino](Zaino.md).
* **Ztreamer** fi ohun kan sinu [Zakura](Zakura_Node.md) node (a Zebra fork) ninu ilana kanna o si n tọju atọka-bulọọki kekere kan.

## Báwo ni wọ́n ṣe wọ̀n ọ́n

* **Data kan náà fún gbogbo ènìyàn.** Gbogbo ìkọ́lé bẹ̀rẹ̀ láti inú àwòrán Zcash Foundation testnet kan náà, tí ó dì ní gíga 4,382,897, nítorí náà gbogbo wọn ṣe àkójọpọ̀ ẹ̀wọ̀n kan náà.
* **Ẹnikẹ́ni le tún un ṣe.** Ohun gbogbo n ṣiṣẹ lori awọn olusare ọfẹ GitHub-hosted: fork ibi ipamọ naa ki o si ṣiṣẹ iṣiṣẹ kan.
* **Ìṣiṣẹ́ mẹ́ta fún ìkọ́lé kọ̀ọ̀kan**, ọ̀kọ̀ọ̀kan láti inú àtọ́ka òfo kan. Ẹ̀rọ ìṣiṣẹ́ àti ẹ̀rọ ìṣiṣẹ́ ẹrù ṣiṣẹ́ lórí àwọn kọ́ọ̀bù CPU ọ̀tọ̀ọ̀tọ̀.
* **Ibamu:** gbogbo awọn ọna gRPC lightwallet-protocol 20 (awọn ọran idanwo 274), ni afiwe byte fun byte kọja awọn ipilẹ ati ṣayẹwo lodi si JSON-RPC Zebra's. Awọn ọna JSON-RPC 28 Zaino sin ni a tun ṣayẹwo.
* **Iṣẹ́:** Àkókò àti àwọn ohun èlò láti kọ́ àtọ́ka, ìdádúró fún ìbéèrè kọ̀ọ̀kan, ìlọ́po méjìlá nínú block-range throughput, àwọn oníbàárà kan sí 128 ní àkókò kan náà, àti ìgbàsílẹ̀ àpò owó kíkún láti inú ìṣiṣẹ́ Sapling sí ìparí.

## Àwọn Àbájáde

### Ìkọ́lé àtọ́ka

Àwọn ààlà ìṣẹ́ mẹ́ta:

| Kọ́ | Àtòjọ ti parí | Ìdáhùn àkọ́kọ́ | Iwọn atọka lori disiki |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Olùdarí Ztreamer | 159 s | 158 s | 1.44 GiB |

Zaino ṣeé lò lẹ́ẹ̀kan náà nítorí pé ó máa ń béèrè fún Zebra nígbà tí ó bá ń kọ́lé. Ztreamer kò ṣiṣẹ́ rárá títí tí àtọ́ka rẹ̀ yóò fi parí. Lórí àwòṣe CPU kan náà, Zaino 0.10.1 gba 6–6.5× ní ìwọ̀n Ztreamer v0.1.0 ó sì lo 7.5–8× àkókò CPU (Zebra).

### Sísìn

Àárín àwọn ìsáré mẹ́ta, ní àwọn búlọ́ọ̀kì fún ìṣẹ́jú-àáyá àyàfi tí a bá kíyèsí:

| Àpẹẹrẹ | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Ibiti awọn bulọọki 1,000 | 11,414 | 179,486 |
| Igbasilẹ apamọwọ ni kikun (280,000 → imọran) | 11,124 | 189,041 |
| Ibiti awọn bulọọki 1,000, awọn alabara 128 | 110,093 | 229,527 |
| Àkọsílẹ̀ kan ṣoṣo, àwọn oníbàárà 128 (àwọn ìbéèrè/àwọn ìbéèrè) | 6,843 | 11,044 |

Pẹ̀lú àwọn oníbàárà 128, àlàfo náà dín sí nǹkan bí 2×, nítorí pé àwọn olupin méjèèjì ní ààlà sí àwọn ohun èlò CPU méjì.

### Ilẹ̀ 40 ms

Lórí Zaino, mẹ́fà nínú àwọn RPC méjìlá ní ìdádúró àárín tó tó 40 ms, gbogbo RPC sì ní ìpín 99th ní nǹkan bí 41 ms. Ìdí rẹ̀ ni bí Zaino ṣe ṣètò olùgbọ́ gRPC rẹ̀: `TCP_NODELAY` a kò tan àṣàyàn ihò-ìpamọ́ náà rárá, nítorí náà ètò ìṣiṣẹ́ náà máa ń dá àwọn ìdáhùn kékeré dúró fún tó 40 ms.

Tí a bá ti yí àṣàyàn náà láti òde, láì yí ìyípadà Zaino binary, a ti yọ ilẹ̀ náà kúrò. Fún àpẹẹrẹ, `GetTreeState` Ó ti lọ sílẹ̀ láti 40.3 ms sí 0.75 ms (Ztreamer: 0.63 ms). Ìṣàn omi bulọ́ọ̀kì púpọ̀ kò yípadà, nítorí náà àlà ìṣàn omi lókè yìí jẹ́ òótọ́.

### Awọn iyatọ ibamu

* **Zaino 0.9.0** pẹlu sihin data ninu `GetBlock` nípa àìyípadà, níbi tí ìlànà náà ti sọ pé àìyípadà náà jẹ́ dátà tí a dáàbò bò nìkan. Èyí ni a ti ṣàtúnṣe ní 0.10.1.
* **`GetSubtreeRoots`:** the `completingBlockHash` pápá ń lo àwọn àṣẹ byte tí ó yàtọ̀ síra lórí àwọn atọ́ka méjì náà. Àwọn àpò ìpamọ́ lọ́wọ́lọ́wọ́ kò ka pápá yìí.
* **Àwọn kódù àṣìṣe:** Zaino padà `INTERNAL` fún ìfàsẹ́yìn búburú; Ztreamer padà wá `INVALID_ARGUMENT` or `NOT_FOUND`.
* **Àwọn àdírẹ́sì méjì** nínú `GetTaddressBalanceStream` a kà wọ́n ní ìlọ́po méjì, àyàfi lórí ọ̀gá Ztreamer.
* **JSON-RPC:** Zaino's `getrawtransaction` pẹ̀lú ọ̀rọ̀ verbosity 0 máa ń dá ohun kan padà dípò okùn hex, láìdàbí Zebra àti zcashd.

## Àwọn ìdíwọ́

* **Testnet nìkan.** Àwọn bulọọki Testnet kéré ju ti mainnet lọ, nítorí náà àkókò àti ìwọ̀n pípé kì í ṣe àwọn nọ́mbà mainnet. Ìfiwéra náà jẹ́ ìbáramu, lórí àwọn ìtẹ̀wọlé kan náà.
* **Àwọn ẹ̀rọ CI tí a pín** pẹ̀lú ọ̀pọ̀lọpọ̀ àwọn àwòṣe CPU. Ìròyìn náà ní àfiwé CPU kan náà fún àwọn nọ́mbà àkọlé.
* **A kò wọ́n:** Àwọn àtúntò tuntun, títẹ̀lé àfikún ẹ̀wọ̀n láàyè, ẹrù mempool, àti TLS.

## Ibi ti o ti le kọ ẹkọ diẹ sii

* Iroyin ni kikun: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Ibi ipamọ ami-ami: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Dátà àìṣeéṣe: [àwọn èsì-ìtújáde 2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
