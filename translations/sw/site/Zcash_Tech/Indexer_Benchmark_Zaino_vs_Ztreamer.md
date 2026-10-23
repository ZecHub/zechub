# Kiwango cha Kiwango cha Watumiaji: Zaino dhidi ya Ztreamer

Zaino na Ztreamer ni viashiria viwili vinavyohudumia itifaki ya gRPC ya lightwallet, API ambayo pochi za mwanga Zcash hutumia kusawazisha. Ukurasa huu unatoa muhtasari wa ulinganisho huru na unaoweza kurudiwa wa hizo mbili: kama zinarudisha majibu yaleyale, muda gani zinachukua kujenga faharasa yao, na jinsi zinavyohudumia pochi kwa kasi.

## TL;DR

* Viashiria vyote viwili hurejesha data sahihi ya mnyororo. Kila jibu ambalo lingeweza kukaguliwa dhidi ya Zebra lililingana, kwa hivyo pochi zinaweza kutumia mojawapo.
* Tofauti zilizopatikana ni kanuni na visa vya ukingo: misimbo ya hitilafu, mpangilio wa baiti wa hashi moja, jinsi anwani iliyorudiwa inavyohesabiwa, na maumbo machache ya majibu ya JSON-RPC.
* Ztreamer huunda faharasa yake ya takriban 6× haraka zaidi kwenye CPU ile ile. Zaino huanza kujibu baada ya sekunde 6 kwa kupitisha maombi kwa Zebra huku ikiunda.
* Ztreamer hutumika haraka zaidi katika kila hali iliyopimwa: vitalu 13–17× zaidi kwa sekunde kwa upakuaji kamili wa pochi.
* Sehemu kubwa ya ucheleweshaji Zaino's hutokana na mpangilio mmoja wa soketi unaokosekana (`TCP_NODELAY`), ambayo huongeza takriban milisekunde 40 kwa maombi mengi. Ni suluhisho la mstari mmoja.

## Kilicholinganishwa

| Jenga | Nodi ya kuunga mkono | Kwa nini |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` sehemu ya nyuma) | Toleo jipya la Zaino thabiti |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` sehemu ya nyuma) | Toleo lililopimwa katika ulinganisho uliochapishwa Ztreamer's mwenyewe |
| Ztreamer v0.1.0 | Nodi Zakura iliyopachikwa | Lebo ya hivi karibuni Ztreamer |
| Ztreamer master | Zakura Iliyopachikwa 1.5.1 | Maagizo ya usakinishaji Ztreamer's yanaunda nini |

Wawili hutumia miundo tofauti:

* **Zaino** inaendeshwa kama mchakato tofauti kando ya [Zebra](Zebra_Full_Node.md) nodi kamili, husoma hali Zebra's, na huhifadhi faharasa yake. Ni kiashiria katika [Mrundiko wa Z3](Z3_Stack.md). Tazama [Zaino](Zaino.md).
* **Ztreamer** hupachika [Zakura](Zakura_Node.md) nodi (uma ya Zebra) katika mchakato huo huo na huweka faharasa ya vitalu vidogo.

## Jinsi Ilivyopimwa

* **Data sawa kwa kila mtu.** Kila ujenzi ulianza kutoka kwa picha moja ya majaribio Zcash Foundation, iliyogandishwa kwa urefu wa 4,382,897, kwa hivyo zote ziliorodheshwa sawa kabisa kwenye mnyororo.
* **Mtu yeyote anaweza kuirudia.** Kila kitu kinaendeshwa kwenye viendeshaji vya bure GitHub-hosted: unganisha hifadhi na uendesha mtiririko mmoja wa kazi.
* **Mizunguko mitatu kwa kila ujenzi**, kila moja kutoka kwa faharasa tupu. Seva na jenereta ya mzigo ziliendeshwa kwenye viini tofauti vya CPU.
* **Utangamano:** mbinu zote 20 za itifaki ya gRPC ya mkoba mdogo (kesi 274 za majaribio), zililinganisha baiti kwa baiti katika miundo yote na kukaguliwa dhidi ya JSON-RPC Zebra's. Mbinu 28 za JSON-RPC ambazo Zaino huhudumia pia zilikaguliwa.
* **Utendaji:** muda na rasilimali za kujenga faharasa, ucheleweshaji wa kila ombi, upitishaji wa masafa ya kuzuia, wateja 1 hadi 128 wanaofanya kazi kwa wakati mmoja, na upakuaji kamili wa pochi kutoka kwa uanzishaji wa Sapling hadi ncha.

## Matokeo

### Muundo wa faharasa

Wastani wa mizunguko mitatu:

| Jenga | Kielezo kimekamilika | Jibu la kwanza | Ukubwa wa faharasa kwenye diski |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino inaweza kutumika karibu mara moja kwa sababu hutuma maombi kwa Zebra wakati inapojengwa. Ztreamer haitumiki chochote hadi faharasa yake imekamilika. Kwenye modeli hiyo hiyo ya CPU, Zaino 0.10.1 ilichukua urefu wa 6–6.5× kama Ztreamer v0.1.0 na ilitumia 7.5–8× muda wa CPU (Zebra).

### Kuhudumia

Wastani wa mizunguko mitatu, katika vitalu kwa sekunde isipokuwa kama imebainishwa:

| Hali | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Umbali wa vitalu vya vitalu 1,000 | 11,414 | 179,486 |
| Pakua pochi kamili (280,000 → bakshishi) | 11,124 | 189,041 |
| Aina ya vitalu vya vitalu 1,000, wateja 128 | 110,093 | 229,527 |
| Kitalu kimoja, wateja 128 (maombi/maombi) | 6,843 | 11,044 |

Kwa wateja 128, pengo hupungua hadi takriban 2×, kwa sababu seva zote mbili zilikuwa na kikomo cha viini viwili vya CPU.

### Sakafu ya 40 ms

Kwenye Zaino, RPC sita kati ya kumi na mbili zina muda wa wastani wa kuchelewa wa takriban milisekunde 40, na kila RPC ina asilimia 99 karibu milisekunde 41. Sababu ni jinsi Zaino inavyoweka kisikilizaji chake cha gRPC: `TCP_NODELAY` Chaguo la soketi haliwashwi kamwe, kwa hivyo mfumo endeshi huzuia majibu madogo kwa hadi milisekunde 40.

Kuiwasha chaguo kutoka nje, bila kubadilisha jozi ya Zaino, kuliondoa sakafu. Kwa mfano, `GetTreeState` Imeshuka kutoka ms 40.3 hadi ms 0.75 (Ztreamer: ms 0.63). Utiririshaji wa vizuizi vingi haukubadilika, kwa hivyo pengo la upitishaji hapo juu ni halisi.

### Tofauti za utangamano

* **Zaino 0.9.0** inajumuisha data iliyo wazi ndani `GetBlock` kwa chaguo-msingi, ambapo itifaki inasema chaguo-msingi ni data iliyolindwa pekee. Hii imewekwa katika 0.10.1.
* **`GetSubtreeRoots`:** the `completingBlockHash` Sehemu hutumia maagizo ya baiti kinyume kwenye viorodheshaji viwili. Pochi za sasa hazisomi sehemu hii.
* **Misimbo ya hitilafu:** Zaino inarudisha `INTERNAL` kwa ingizo baya; Ztreamer inarudisha `INVALID_ARGUMENT` or `NOT_FOUND`.
* **Anwani zilizorudiwa** ndani `GetTaddressBalanceStream` huhesabiwa mara mbili, isipokuwa kwenye Ztreamer master.
* **JSON-RPC:** Zaino's `getrawtransaction` kwa kutumia kitenzi 0 hurejesha kitu badala ya kamba ya heksaidi, tofauti na Zebra na zcashd.

## Mapungufu

* **Testnet pekee.** Vitalu vya Testnet ni vidogo kuliko vya mtandao mkuu, kwa hivyo nyakati na ukubwa kamili si takwimu za mtandao mkuu. Ulinganisho ni sawa, kwenye ingizo zinazofanana.
* **Mashine za CI zilizoshirikiwa** zenye mifumo kadhaa ya CPU. Ripoti kamili inatoa ulinganisho wa CPU sawa kwa nambari za vichwa vya habari.
* **Haijapimwa:** marekebisho, kufuatia ncha ya mnyororo wa moja kwa moja, mzigo wa mempool, na TLS.

## Wapi pa Kujifunza Zaidi

* Ripoti kamili: [benchi la kiashiria cha zcash/ripoti/ripoti.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Hifadhi ya alama za ulinganifu: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Data ghafi: [matokeo-2026-10-10 kutolewa](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
