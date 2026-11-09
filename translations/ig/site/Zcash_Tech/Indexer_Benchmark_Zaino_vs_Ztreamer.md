# Ntụle Indexer: Zaino megide Ztreamer

Zaino na Ztreamer bụ indexer abụọ na-enye ụkpụrụ lightwallet gRPC, API nke Zcash e-akpa ego dị mfe [light wallets] ji emekọrịta. Peeji a chịkọtara ntụnyere onwe ya, nke a pụrụ imegharị, nke abụọ ahụ: ma ha na-ewepụta otu azịza, oge ha na-ewe iwulite index ha, na ọsọ ha ji eje ozi maka e-akpa ego.

## Nchịkọta Nkenke

* Indexer abụọ ahụ na-eweghachi data chain ziri ezi. Azịza ọ bụla enwere ike ịlele megide Zebra kwekọrọ, ya mere e-akpa ego nwere ike iji nke ọ bụla n'ime ha.
* Ndịiche a chọpụtara bụ nkwekọrịta na ọnọdụ pụrụ iche: koodu njehie, usoro byte nke otu hash, otu esi agụta Adreesị akpa ego oyiri, na ụdị ole na ole nke nzaghachi JSON-RPC.
* Ztreamer na-ewuli index ya ihe dịka ugboro 6 ngwa ngwa n'otu CPU ahụ. Zaino na-amalite ịza azịza mgbe sekọnd 6 gasịrị site n'ibufe arịrịọ gaa na Zebra ka ọ na-ewuli ya.
* Ztreamer na-enye ọrụ ngwa ngwa n'ọnọdụ ọ bụla atụnyere: block kwa sekọnd ji ugboro 13–17 karịa maka nbudata e-akpa ego zuru ezu.
* Ọtụtụ n'ime oge igbu oge nke Zaino sitere n'otu ntọala socket na-efu efu (`TCP_NODELAY`), nke na-agbakwunye ihe dịka 40 ms n'ọtụtụ arịrịọ. Ọ bụ mmezi otu ahịrị.

## Ihe Atụnyere

| Wulite | Node ndabere | Ihe kpatara ya |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Mwepụta Zaino kwụsiri ike kachasị ọhụrụ |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | Ụdị atụnyere na ntụnyere nke Ztreamer bipụtara n'onwe ya |
| Ztreamer v0.1.0 | Node Zakura agbakwunyere | Tag Ztreamer kachasị ọhụrụ |
| Ztreamer master | Zakura 1.5.1 agbakwunyere | Ihe ntuziaka nrụnye nke Ztreamer na-ewuli |

Ha abụọ na-eji atụmatụ dị iche iche:

* **Zaino** na-agba dị ka usoro dị iche n'akụkụ full node [Zebra](Zebra_Full_Node.md), na-agụ ọnọdụ Zebra, ma na-edobe index nke ya. Ọ bụ indexer dị na [Z3 stack](Z3_Stack.md). Lee [Zaino](Zaino.md).
* **Ztreamer** na-agbakwụnye node [Zakura](Zakura_Node.md) (fork Zebra) n'otu usoro ahụ ma na-edobe index compact-block.

## Otu Esi Tụọ Ya

* **Otu data maka onye ọ bụla.** Wulite ọ bụla malitere site n'otu snapshot testnet Zcash Foundation, nke akpọchiri na elu 4,382,897, ya mere ha niile depụtara kpọmkwem otu chain.
* **Onye ọ bụla nwere ike imegharị ya.** Ihe niile na-agba na runners nke GitHub na-akwado n'efu: fork repository ahụ ma gbaa otu workflow.
* **Ọsọ atọ kwa wulite**, nke ọ bụla sitere na index efu. Sava na ngwa nrụpụta ibu rụrụ ọrụ na CPU cores dị iche iche.
* **Ndakọrịta:** usoro gRPC lightwallet-protocol 20 niile (ọnọdụ ule 274), atụnyere byte maka byte n'etiti wulite ma nyochaa megide JSON-RPC nke Zebra. A nyochakwara usoro JSON-RPC 28 nke Zaino na-enye.
* **Ịrụ ọrụ:** oge na akụrụngwa iji wulite index, oge nzaghachi kwa arịrịọ, throughput oke block, ndị ahịa 1 ruo 128 na-arụkọ ọrụ, na nbudata e-akpa ego zuru ezu site na mmalite Sapling ruo n'ọnụ chain.

## Nsonaazụ

### Iwulite index

Etiti ọnụ ọgụgụ nke ọsọ atọ:

| Wulite | Index zuru oke | Azịza mbụ | Ogo index na diski |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino bara uru ihe fọrọ nke nta ka ọ bụrụ ozugbo n'ihi na ọ na-ebufe arịrịọ na Zebra ka ọ na-ewuli. Ztreamer anaghị enye ihe ọ bụla ruo mgbe index ya zuru oke. N'otu ụdị CPU ahụ, Zaino 0.10.1 were oge ji ugboro 6–6.5 karịa Ztreamer v0.1.0 ma jiri oge CPU ji ugboro 7.5–8 karịa (gụnyere Zebra).

### Inye ọrụ

Etiti ọnụ ọgụgụ nke ọsọ atọ, na block kwa sekọnd ma e wezụga ebe ekwuru:

| Ọnọdụ | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Oke block nke block 1,000 | 11,414 | 179,486 |
| Nbudata e-akpa ego zuru ezu (280,000 → n'ọnụ) | 11,124 | 189,041 |
| Oke block nke block 1,000, ndị ahịa 128 | 110,093 | 229,527 |
| Otu block, ndị ahịa 128 (arịrịọ/s) | 6,843 | 11,044 |

Site na ndị ahịa 128, ọdịiche ahụ na-adị ihe dịka ugboro 2, n'ihi na sava abụọ ahụ nwere oke CPU cores abụọ.

### Ala 40 ms

Na Zaino, RPC isii n'ime iri na abụọ nwere etiti oge igbu oge ihe dịka 40 ms, RPC ọ bụla nwekwara percentile nke 99 gburugburu 41 ms. Ihe kpatara ya bụ otu Zaino si ahazi onye na-ege gRPC ya: a naghị agbanye nhọrọ socket `TCP_NODELAY`, ya mere sistemụ arụmọrụ na-egbochi obere nzaghachi ruo ihe dịka 40 ms.

Ịgbanye nhọrọ ahụ site n'èzí, na-agbanweghị binary Zaino, wepụrụ ala ahụ. Dịka ọmụmaatụ, `GetTreeState` si na 40.3 ms daa ruo 0.75 ms (Ztreamer: 0.63 ms). Streaming block buru ibu agbanweghị, ya mere ọdịiche throughput dị n'elu bụ nke eziokwu.

### Ndịiche ndakọrịta

* **Zaino 0.9.0** na-etinye data Oha [transparent] na `GetBlock` na ndabara, ebe ụkpụrụ ahụ kwuru na ndabara bụ naanị data nke e chebere echebe [shielded]. Emezila nke a na 0.10.1.
* **`GetSubtreeRoots`:** ubi `completingBlockHash` na-eji usoro byte na-emegide onwe ha na indexer abụọ ahụ. E-akpa ego dị ugbu a anaghị agụ ubi a.
* **Koodu njehie:** Zaino na-eweghachi `INTERNAL` maka ntinye ezighi ezi; Ztreamer na-eweghachi `INVALID_ARGUMENT` ma ọ bụ `NOT_FOUND`.
* **Adreesị akpa ego oyiri** dị na `GetTaddressBalanceStream` ka a na-agụta ugboro abụọ, ma e wezụga na Ztreamer master.
* **JSON-RPC:** `getrawtransaction` nke Zaino nwere verbosity 0 na-eweghachi ihe kama eriri hex, n'adịghị ka Zebra na zcashd.

## Mgbochi

* **Naanị testnet.** Block testnet dị nta karịa nke mainnet, ya mere oge na nha zuru oke abụghị ọnụ ọgụgụ mainnet. Ntụnyere ahụ bụ nke ikwu n'etiti ibe ha, na ntinye ndị yiri onwe ha.
* **Igwe CI nkekọrịta** nwere ọtụtụ ụdị CPU. Akụkọ zuru ezu na-enye ntụnyere otu-CPU maka ọnụ ọgụgụ isi.
* **A tụghị:** reorgs, isoro ọnụ chain dị ndụ, ibu mempool, na TLS.

## Ebe Ị Ga-amụtakwu

* Akụkọ zuru ezu: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repository benchmark: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Data raw: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
