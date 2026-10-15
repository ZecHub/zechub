# Ntụle ihe nrịbama: Zaino vs Ztreamer

Zaino na Ztreamer bụ ihe ndochi abụọ na-eje ozi na protocol lightwallet gRPC, API nke obere akpa Zcash na-eji emekọrịta. Peeji a na-achịkọta ntụnyere onwe ya, nke a na-emegharị emegharị nke ha abụọ: ma ha na-eweghachi otu azịza, ogologo oge ha na-ewe iji wuo ihe ndochi ha, na ọsọ ha na-eje ozi na obere akpa.

## TL;DR

* Ihe ngosi abụọ ahụ na-eweghachi data usoro ziri ezi. Azịza ọ bụla enwere ike ịlele megide Zebra dabara adaba, yabụ obere akpa nwere ike iji nke ọ bụla.
* Ihe dị iche dị na ya bụ nkwekọrịta na ikpe dị n'akụkụ: koodu njehie, usoro byte nke otu hash, otu esi agụta adreesị e megharịrị, na ụdị nzaghachi JSON-RPC ole na ole.
* Ztreamer na-ewulite ihe ndekọ ya ihe dị ka 6× ngwa ngwa na otu CPU ahụ. Zaino na-amalite ịza mgbe sekọnd isii gachara site n'inyefe arịrịọ nye Zebra ka ọ na-ewulite.
* Ztreamer na-arụ ọrụ ngwa ngwa n'ọnọdụ ọ bụla a tụrụ: 13–17× blọk karịa kwa sekọnd maka nbudata obere akpa zuru oke.
* Ọtụtụ n'ime oge Zaino's na-abịa site na otu ntọala soket na-efu (`TCP_NODELAY`), nke na-agbakwụnye ihe dị ka ms 40 na ọtụtụ arịrịọ. Ọ bụ ndozi otu ahịrị.

## Ihe E Ji Tụnyere

| Wuo | Ebe nkwado | Gịnị kpatara ya |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` azụ) | Mwepụta Zaino kachasị ọhụrụ kwụsiri ike |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` azụ) | A tụrụ ụdị ahụ na ntụnyere ebipụtara Ztreamer's |
| Ztreamer v0.1.0 | Ọnụ Zakura agbakwunyere | Mkpado Ztreamer kachasị ọhụrụ |
| Onye isi Ztreamer | Zakura agbakwunyere 1.5.1 | Ihe ntuziaka nwụnye Ztreamer's wuru |

Ha abụọ na-eji ụdị nhazi dị iche iche:

* **Zaino** na-agba ọsọ dị ka usoro dị iche n'akụkụ [Zebra](Zebra_Full_Node.md) ọ bụ ihe na-egosi ọnọdụ Zebra's, ma na-edebe ihe na-egosi nke ya. Ọ bụ ihe na-egosi ihe na-egosi ihe na-egosi ihe na-eme n'ime [Ọnụọgụ Z3](Z3_Stack.md)Lee [Zaino](Zaino.md).
* **Ztreamer** tinyere ihe [Zakura](Zakura_Node.md) node (ndụdụ Zebra) n'otu usoro ahụ ma na-edobe ndeksi obere ngọngọ.

## Otu esi tụọ ya

* **Otu data ahụ maka onye ọ bụla.** Ihe owuwu ọ bụla malitere site na otu foto Zcash Foundation testnet ahụ, kpọnwụrụ akpọnwụ na elu 4,382,897, yabụ ha niile depụtara kpọmkwem otu usoro ahụ.
* **Onye ọ bụla nwere ike imeghachi ya.** Ihe niile na-agba ọsọ na ndị na-agba ọsọ GitHub-hosted n'efu: gbanyụọ ebe nchekwa ahụ wee mee otu usoro ọrụ.
* **Ọsọ atọ n'ime otu nrụpụta**, nke ọ bụla sitere na ndeksi efu. Ihe nkesa na ihe nrụpụta ibu ahụ gbara ọsọ na isi CPU dị iche iche.
* **Ndakọrịta:** usoro gRPC lightwallet-protocol iri abụọ niile (ikpe nnwale 274), tụnyere byte maka byte n'ofe nrụpụta ma lelee ya na JSON-RPC Zebra's. E lekwara ụzọ JSON-RPC iri abụọ na asatọ Zaino na-enye.
* **Arụmọrụ:** oge na akụrụngwa iji wuo ndeksi ahụ, nkwụsị nke arịrịọ ọ bụla, mmepụta nkewa nke blọk, ndị ahịa 1 ruo 128 n'otu oge, na nbudata obere akpa zuru oke site na mmalite Sapling ruo na njedebe.

## Nsonaazụ

### Nrụpụta ndeksi

Ihe dị n'etiti agba atọ:

| Wuo | Ndepụta zuru ezu | Azịza mbụ | Nha ndeksi na diski |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Onye isi Ztreamer | 159 s | 158 s | 1.44 GiB |

A na-eji Zaino eme ihe n'otu oge n'ihi na ọ na-eziga arịrịọ na Zebra ka ọ na-ewuli ya. Ztreamer anaghị arụ ọrụ ọ bụla ruo mgbe ndeksi ya zuru oke. N'otu ụdị CPU ahụ, Zaino 0.10.1 were 6–6.5× ogologo oge Ztreamer v0.1.0 wee jiri 7.5–8× oge CPU (Zebra).

### Na-eje ozi

Ọkara nke ọsọ atọ, na blọk kwa sekọnd ọ gwụla ma akọwapụtara ya:

| Ihe atụ | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Oke ngọngọ nke blọk 1,000 | 11,414 | 179,486 |
| Nbudata obere akpa zuru oke (280,000 → ndụmọdụ) | 11,124 | 189,041 |
| Ngụkọta ngọngọ nke 1,000 blocks, ndị ahịa 128 | 110,093 | 229,527 |
| Otu ngọngọ, ndị ahịa 128 (arịrịọ/arịrịọ) | 6,843 | 11,044 |

Site na ndị ahịa 128, oghere ahụ na-ebelata ruo ihe dị ka 2×, n'ihi na sava abụọ ahụ nwere oke na isi CPU abụọ.

### Ala nke 40 ms

Na Zaino, isii n'ime RPC iri na abụọ nwere etiti latency nke ihe dị ka 40 ms, RPC ọ bụla nwekwara pasentị 99 nke ihe dị ka 41 ms. Ihe kpatara ya bụ ụzọ Zaino si hazie onye na-ege ntị gRPC ya: `TCP_NODELAY` A naghị agbanye nhọrọ soket, yabụ sistemụ arụmọrụ na-egbochi obere nzaghachi ruo 40 ms.

Mgbe mgbanyere nhọrọ ahụ site n'èzí, n'agbanweghị ihe dịka ọnụọgụ abụọ Zaino, wepụrụ ala ahụ. Dịka ọmụmaatụ, `GetTreeState` dara site na 40.3 ms ruo 0.75 ms (Ztreamer: 0.63 ms). Ngụkọta blọk dị ukwuu agbanweghị, yabụ oghere throughput dị n'elu bụ eziokwu.

### Ọdịiche ndakọrịta

* **Zaino 0.9.0** gụnyere data transperent na `GetBlock` site na ndabara, ebe usoro ahụ kwuru na ndabara bụ naanị data echekwara. A na-edozi nke a na 0.10.1.
* **`GetSubtreeRoots`:** the `completingBlockHash` ubi na-eji iwu byte dị iche na ihe ngosi abụọ ahụ. Obere akpa ego dị ugbu a anaghị agụ ubi a.
* **Koodu njehie:** Zaino na-alaghachi `INTERNAL` maka ntinye ọjọọ; Ztreamer na-alaghachi `INVALID_ARGUMENT` or `NOT_FOUND`.
* **Adreesị e megharịrị** na `GetTaddressBalanceStream` a na-agụta ha ugboro abụọ, ma e wezụga na Ztreamer master.
* **JSON-RPC:** Zaino's `getrawtransaction` site na iji okwu 0 na-eweghachi ihe kama eriri hex, n'adịghị ka Zebra na zcashd.

## Mmachi

* **Naanị Testnet.** Blọk Testnet pere mpe karịa nke mainnet, yabụ oge na nha zuru oke abụghị ọnụọgụgụ mainnet. Ntụnyere ahụ bụ nke a na-ahụkarị, na ntinye ndị yiri ya.
* **Igwe CI ekekọrịtara** yana ọtụtụ ụdị CPU. Akụkọ zuru oke na-enye ntụnyere otu-CPU maka nọmba isi okwu.
* **Atụghị ya:** nhazi ndị ọzọ, na-agbaso ndụmọdụ usoro ndụ, ibu mempool, na TLS.

## Ebe Ị Ga-amụtakwu Ihe

* Akụkọ zuru ezu: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Ebe nchekwa ihe atụ: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Data ndị a na-anaghị arụpụta ihe: [nsonaazụ-mwepụta 2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
