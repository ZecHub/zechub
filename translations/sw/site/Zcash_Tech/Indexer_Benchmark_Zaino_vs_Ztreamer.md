# Kipimo cha Waorodheshaji [Indexer]: Zaino dhidi ya Ztreamer

Zaino na Ztreamer ni waorodheshaji wawili wanaotoa itifaki ya lightwallet gRPC, API ambayo pochi nyepesi [light wallets] za Zcash hutumia kusawazisha. Ukurasa huu unatoa muhtasari wa ulinganisho huru unaoweza kurudiwa wa hawa wawili: iwapo wanatoa majibu yaleyale, muda wanaochukua kujenga faharasa yao, na kasi wanayotoa huduma kwa pochi.

## Kwa Ufupi Sana

* Waorodheshaji wote wawili hurejesha data sahihi ya mnyororo [chain]. Kila jibu ambalo lingeweza kukaguliwa dhidi ya Zebra lililingana, hivyo pochi zinaweza kutumia yeyote kati yao.
* Tofauti zilizopatikana ni kanuni za utekelezaji na hali maalumu: misimbo ya hitilafu, mpangilio wa baiti wa hash moja, jinsi anwani iliyorudiwa inavyohesabiwa, na maumbo machache ya majibu ya JSON-RPC.
* Ztreamer hujenga faharasa yake kwa kasi ya takriban 6× zaidi kwenye CPU ileile. Zaino huanza kujibu baada ya sekunde 6 kwa kupitisha maombi kwa Zebra inapojenga.
* Ztreamer hutoa huduma kwa kasi zaidi katika kila hali iliyopimwa: block 13–17× zaidi kwa sekunde kwa upakuaji kamili wa pochi.
* Sehemu kubwa ya muda wa kusubiri wa Zaino hutokana na mpangilio mmoja wa socket unaokosekana (`TCP_NODELAY`), unaoongeza takriban ms 40 kwa maombi mengi. Hili ni marekebisho ya mstari mmoja.

## Kilicholinganishwa

| Ujenzi | Node inayounga mkono | Sababu |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend ya `direct`) | Toleo thabiti la hivi karibuni la Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend ya `direct`) | Toleo lililopimwa katika ulinganisho uliochapishwa na Ztreamer |
| Ztreamer v0.1.0 | Node ya Zakura iliyopachikwa | Tagi ya hivi karibuni ya Ztreamer |
| Ztreamer master | Zakura 1.5.1 iliyopachikwa | Kile ambacho maagizo ya usakinishaji ya Ztreamer hujenga |

Hawa wawili hutumia miundo tofauti:

* **Zaino** huendesha kama mchakato tofauti kando ya full node ya [Zebra](Zebra_Full_Node.md), husoma hali ya Zebra, na huweka faharasa yake yenyewe. Ni waorodheshaji katika rundo la Z3 la [Z3 stack](Z3_Stack.md). Tazama [Zaino](Zaino.md).
* **Ztreamer** hupachika node ya [Zakura](Zakura_Node.md) (fork ya Zebra) katika mchakato uleule na huweka faharasa ya compact-block.

## Jinsi Ilivyopimwa

* **Data sawa kwa kila mtu.** Kila ujenzi ulianza kutoka nakala sawa ya testnet ya Zcash Foundation, iliyogandishwa kwenye kimo 4,382,897, hivyo yote yaliweka faharasa ya mnyororo uleule hasa.
* **Mtu yeyote anaweza kurudia.** Kila kitu huendeshwa kwenye runners bila malipo wanaopangishwa na GitHub: fanya fork ya hazina na uendeshe workflow moja.
* **Majaribio matatu kwa kila ujenzi**, kila moja kutoka faharasa tupu. Seva na jenereta ya mzigo ziliendeshwa kwenye viini tofauti vya CPU.
* **Ulinganifu:** mbinu zote 20 za gRPC za itifaki ya lightwallet (visa 274 vya majaribio), zililinganishwa baiti kwa baiti kati ya ujenzi na kukaguliwa dhidi ya JSON-RPC ya Zebra. Mbinu 28 za JSON-RPC zinazotolewa na Zaino zilikaguliwa pia.
* **Utendaji:** muda na rasilimali za kujenga faharasa, muda wa kusubiri kwa kila ombi, kasi ya block mbalimbali, wateja 1 hadi 128 wa wakati mmoja, na upakuaji kamili wa pochi kutoka uanzishaji wa Sapling hadi ncha.

## Matokeo

### Ujenzi wa faharasa

Thamani za kati za majaribio matatu:

| Ujenzi | Faharasa imekamilika | Jibu la kwanza | Ukubwa wa faharasa kwenye diski |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino inaweza kutumika karibu mara moja kwa sababu hupitisha maombi kwa Zebra inapojenga. Ztreamer haitoi chochote hadi faharasa yake ikamilike. Kwenye modeli ileile ya CPU, Zaino 0.10.1 ilichukua muda wa 6–6.5× wa Ztreamer v0.1.0 na ilitumia muda wa CPU wa 7.5–8× (Zebra imejumuishwa).

### Utoaji wa huduma

Thamani za kati za majaribio matatu, katika block kwa sekunde isipokuwa ilipoelezwa vinginevyo:

| Hali | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Masafa ya block 1,000 | 11,414 | 179,486 |
| Upakuaji kamili wa pochi (280,000 → ncha) | 11,124 | 189,041 |
| Masafa ya block 1,000, wateja 128 | 110,093 | 229,527 |
| Block moja, wateja 128 (maombi/s) | 6,843 | 11,044 |

Kwa wateja 128, pengo hupungua hadi takriban 2×, kwa sababu seva zote mbili ziliwekewa kikomo cha viini viwili vya CPU.

### Kiwango cha chini cha ms 40

Kwenye Zaino, RPC sita kati ya kumi na mbili zina muda wa kati wa kusubiri wa takriban ms 40, na kila RPC ina asilimia ya 99 karibu ms 41. Sababu ni jinsi Zaino inavyoweka msikilizaji wake wa gRPC: chaguo la socket la `TCP_NODELAY` haliwashwi kamwe, hivyo mfumo wa uendeshaji hushikilia majibu madogo kwa hadi ms 40.

Kuwasha chaguo hilo kutoka nje, bila kubadilisha faili ya utekelezaji ya Zaino, kuliondoa kiwango hicho cha chini. Kwa mfano, `GetTreeState` ilishuka kutoka ms 40.3 hadi ms 0.75 (Ztreamer: ms 0.63). Utiririshaji wa block nyingi haukubadilika, hivyo pengo la kasi lililo hapo juu ni halisi.

### Tofauti za ulinganifu

* **Zaino 0.9.0** hujumuisha data ya uwazi [transparent] katika `GetBlock` kwa chaguo-msingi, ilhali itifaki inasema chaguo-msingi ni data ya faragha [shielded] pekee. Hili limerekebishwa katika 0.10.1.
* **`GetSubtreeRoots`:** sehemu ya `completingBlockHash` hutumia mipangilio ya baiti inayokinzana kwenye waorodheshaji hawa wawili. Pochi za sasa hazisomi sehemu hii.
* **Misimbo ya hitilafu:** Zaino hurejesha `INTERNAL` kwa ingizo baya; Ztreamer hurejesha `INVALID_ARGUMENT` au `NOT_FOUND`.
* **Anwani zilizorudiwa** katika `GetTaddressBalanceStream` huhesabiwa mara mbili, isipokuwa kwenye master ya Ztreamer.
* **JSON-RPC:** `getrawtransaction` ya Zaino yenye verbosity 0 hurejesha kitu badala ya mfuatano wa hex, tofauti na Zebra na zcashd.

## Vikwazo

* **Testnet pekee.** Block za testnet ni ndogo kuliko za mainnet, hivyo muda na ukubwa kamili si takwimu za mainnet. Ulinganisho ni wa kiasi, kwenye ingizo zinazofanana.
* **Mashine za CI zinazoshirikiwa** zenye modeli kadhaa za CPU. Ripoti kamili hutoa ulinganisho wa CPU sawa kwa nambari kuu.
* **Haikupimwa:** reorgs, kufuatilia ncha ya mnyororo hai, mzigo wa mempool, na TLS.

## Mahali pa Kujifunza Zaidi

* Ripoti kamili: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Hazina ya kipimo: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Data ghafi: [toleo la results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
