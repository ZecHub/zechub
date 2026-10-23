# Indexer Nsusuwii: Zaino ne Ztreamer

Zaino ne Ztreamer yɛ indexers mmienu a ɛsom lightwallet gRPC protocol, API a Zcash kanea sika kotokuo de di dwuma de yɛ sync. Kratafa yi bɔ ntotoho a ɛde ne ho, a wotumi san yɛ bio a ɛfa abien no ho no mua: sɛ ebia wɔsan de mmuae koro no ara ba, bere tenten a egye na wɔde ayɛ wɔn index, ne sɛnea wɔde sika kotoku di dwuma ntɛmntɛm.

## TL;DR

* Indexer abien no nyinaa san de nkɔnsɔnkɔnsɔn data a ɛteɛ ba. Mmuae biara a wobetumi ahwɛ wɔ Zebra ho no hyiae, enti sika kotoku betumi de emu biara adi dwuma.
* Nsonsonoeɛ a wɔhunu ne nhyiamu ne edge cases: mfomsoɔ koodu, byte nhyehyɛeɛ a ɛwɔ hash baako mu, sɛdeɛ wɔkan address a wɔayɛ no mmienu, ne JSON-RPC mmuaeɛ nsusuiɛ kakraa bi.
* Ztreamer kyekye ne index bɛyɛ 6× ntɛmntɛm wɔ CPU koro no ara so. Zaino fi ase bua wɔ sikani 6 akyi denam abisade ahorow a ɔde kɔma Zebra bere a ɛresi no so.
* Ztreamer som ntɛmntɛm wɔ tebea biara a wɔsusuw mu: 13–17× blocks pii wɔ sekan biara mu ma wallet download a edi mũ.
* Zaino's latency no fã kɛse no ara fi socket nhyehyɛe biako a ɛyera mu (`TCP_NODELAY`), a ɛde bɛyɛ 40 ms ka abisade pii ho. Ɛyɛ ade a wɔde siesie fie wɔ ɔkwan biako so.

## Nea Wɔde Totoo Ho

| Si | Backing node no | Adɛn |
|:--|:--|:--|
| Zaino 0.10.1 na ɛwɔ hɔ | Zebra 6.4.2 (`direct` akyi asɛm) | Zaino a ɛyɛ den a wɔayi no adi nnansa yi |
| Zaino 0.9.0 na ɛwɔ hɔ | Zebra 6.4.2 (`direct` akyi asɛm) | Nkyerɛase a wɔsusuu wɔ Ztreamer's ankasa ntotoho a wɔatintim mu |
| Ztreamer v0.1.0 na ɛwɔ hɔ | Zakura node a wɔde ahyɛ mu | Ztreamer tag a aba foforo |
| Ztreamer wura | Zakura a wɔde ahyɛ mu 1.5.1 | Nea Ztreamer's install akwankyerɛ no si |

Wɔn baanu no de adwini ahorow di dwuma:

* **Zaino** tu mmirika sɛ adeyɛ a ɛyɛ soronko wɔ a nkyɛn [Zebra](Zebra_Full_Node.md) full node, kenkan Zebra's tebea, na ɛkora n’ankasa index so. Ɛyɛ indexer a ɛwɔ.. [Z3 stack na ɛyɛ](Z3_Stack.md). Hwɛ [Zaino](Zaino.md).
* **Ztreamer** a wɔde ahyɛ mu a [Zakura](Zakura_Node.md) node (A Zebra fork) wɔ adeyɛ koro no ara mu na ɛkora compact-block index so.

## Sɛnea Wɔsusuu No

* **Data koro no ara ma obiara.** Ɔdan biara fii ase fii Zcash Foundation testnet snapshot koro no ara mu, a wɔahyɛ no nwini wɔ sorokɔ 4,382,897, enti wɔn nyinaa yɛɛ indexed nkɔnsɔnkɔnsɔn koro no ara pɛpɛɛpɛ.
* **Obiara betumi ayɛ bio.** Biribiara tu mmirika wɔ free GitHub-hosted runners so: fork akorae no na tu adwumayɛ kwan biako.
* **Runs abiɛsa wɔ build biara mu**, emu biara fi index a hwee nni mu. Server no ne load generator no tuu mmirika wɔ CPU cores ahorow so.
* **Nhyiamu:** lightwallet-protocol gRPC akwan 20 no nyinaa (sɔhwɛ nsɛm 274), de totoo byte ma byte wɔ adansi nyinaa mu na wɔhwɛɛ no wɔ Zebra's JSON-RPC ho. Wɔhwɛɛ JSON-RPC akwan 28 a Zaino som no nso.
* **Adwumayɛ:** bere ne nneɛma a wɔde bɛkyekye index no, per-request latency, block-range throughput, 1 kosi 128 concurrent clients, ne wallet download a edi mũ fi Sapling activation kɔ tip no so.

## Nsunsuansoɔ

### Index a wɔde si dan

Medians a wɔde tu mmirika abiɛsa:

| Si | Index awie | Mmuae a edi kan | Index kɛse wɔ disk so |
|:--|--:|--:|--:|
| Zaino 0.10.1 na ɛwɔ hɔ | 1,395 s | 6 s | 22.06 GiB na ɛwɔ hɔ |
| Zaino 0.9.0 na ɛwɔ hɔ | 1,211 s | 6 s | 22.06 GiB na ɛwɔ hɔ |
| Ztreamer v0.1.0 na ɛwɔ hɔ | 216 s | 210 s | 1.44 GiB na ɛwɔ hɔ |
| Ztreamer wura | 159 s | 158 s | 1.44 GiB na ɛwɔ hɔ |

Ɛkame ayɛ sɛ Zaino yɛ nea wotumi de di dwuma prɛko pɛ efisɛ ɛde abisade kɔma Zebra bere a ɛresi no. Ztreamer som hwee kosi sɛ ne index no bɛwie. Wɔ CPU mfonini koro no ara so no, Zaino 0.10.1 gyee 6–6.5× tenten te sɛ Ztreamer v0.1.0 na ɛde 7.5–8× CPU bere (Zebra ka ho) dii dwuma.

### Ɔsom

Medians a ɛyɛ mmirikatu abiɛsa, wɔ blocks mu wɔ sekan biara mu gye sɛ wɔahyɛ no nsow:

| Nsɛm a ɛfa ho | Zaino 0.10.1 na ɛwɔ hɔ | Ztreamer v0.1.0 na ɛwɔ hɔ |
|:--|--:|--:|
| Block range a ɛyɛ 1,000 blocks | 11,414 | 179,486 |
| Sika kotoku a wɔtwe nyinaa (280,000 → afotu) | 11,124 | 189,041 |
| Block range a ɛyɛ 1,000 blocks, 128 a wɔkra nneɛma | 110,093 | 229,527 |
| Single block, 128 afɛfo (abisade/abisade ahorow) | 6,843 | 11,044 |

Na 128 clients no gap no tew bɛyɛ 2×, efisɛ na server abien no nyinaa anohyeto wɔ CPU cores abien.

### Na 40 ms fam no

Wɔ Zaino, RPC dumienu mu asia wɔ median latency bɛyɛ 40 ms, na RPC biara wɔ 99th percentile bɛyɛ 41 ms. Nea ɛde ba ne ɔkwan a Zaino fa so hyehyɛ ne gRPC atiefo: the `TCP_NODELAY` socket option no ntumi nsɔ da, enti operating system no sie mmuae nketewa kɔsi 40 ms.

Sɛ wodan option no fi abɔnten, a woansakra Zaino binary no a, woyii fam no fii hɔ. Nhwɛsoɔ, `GetTreeState` no so tewee fii 40.3 ms kɔɔ 0.75 ms (Ztreamer: 0.63 ms). Bulk block streaming ansakra, enti throughput gap a ɛwɔ atifi hɔ no yɛ nokware.

### Nsonsonoe a ɛwɔ nea ɛne ne ho hyia mu

* **Zaino 0.9.0** de data a ɛda adi pefee ka ho wɔ `GetBlock` default so, baabi a protocol no ka sɛ default no yɛ shielded data nkutoo. Wɔasiesie eyi wɔ 0.10.1 mu.
* **`GetSubtreeRoots`:** no `completingBlockHash` field de baiti nhyehyɛe a ɛne ne ho bɔ abira di dwuma wɔ indexers abien no so. Mprempren sika kotoku a ɛwɔ hɔ no nkenkan saa afuw yi.
* **Mfomso koodu:** Zaino san ba `INTERNAL` wɔ nsɛm a wɔde hyɛ mu bɔne ho; Ztreamer ba bio `INVALID_ARGUMENT` or `NOT_FOUND`.
* **Address ahorow a wɔayɛ no abien** wɔ `GetTaddressBalanceStream` wɔkan no mprenu, gye sɛ Ztreamer master so.
* **JSON-RPC:** Zaino's `getrawtransaction` ne verbosity 0 san de adeɛ bi ba mmom sen hex string, ɛnte sɛ Zebra ne zcashd.

## Anohyeto ahorow

* **Testnet nko ara.** Testnet blocks sua sene mainnet deɛ, enti mmerɛ ne akɛseɛ a ɛyɛ pɛpɛɛpɛ nyɛ mainnet akontabuo. Ntotoho no yɛ nea ɛfa ho, wɔ nneɛma a wɔde hyɛ mu a ɛyɛ pɛ so.
* **Shared CI mfiri** a ɛwɔ CPU mfonini ahorow pii. Amanneɛbɔ a edi mũ no de CPU koro ntotoho ma ma asɛmti nɔma ahorow no.
* **Wɔnsusuw:** reorgs, di live chain tip, mempool adesoa, ne TLS akyi.

## Baabi a Wubetumi Asua Pii

* Amanneɛbɔ a edi mũ: [zcash-indexer-bench/amanneɛbɔ/amanneɛbɔ.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Benchmark akoraeɛ: [github.com/pearl-max468/zcash-indexer-benkyi a wɔde kyerɛw nsɛm](https://github.com/pearl-max468/zcash-indexer-bench)
* Raw data: [aba-2026-10-10 a wɔayi no adi](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino na ɛkyerɛkyerɛ mu](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
