# Zinder Indexer

Zinder bụ indexer Zcash nke ị na-ejikwa n'onwe gị, e dere ya na Rust ma Zcash Foundation bipụtara ya. Ọ na-agụ chain otu ugboro site na Zebra ma ọ bụ full node Zakura, na-echekwa otu nlele ya kwekọrọ ekwekọ, ma na-enye ọtụtụ e-akpa ego, ngwa na ndị na-enyocha ya ozi n'otu oge. E-akpa ego dị mfe dị ugbu a nwere ike iru ya site na adapter dakọtara na lightwalletd.

> **Zinder ka nọ n'ọkwa alpha.** README nke ya na-ekwu na API nke ya, ihu dakọtara na lightwalletd, nhazi nchekwa na nhazi ntinye ga-agbanwe, nakwa na akara ụdị e wepụtara apụtaghị nkwa nkwụsi ike. Kpọchie ụdị ndị ahụ kpọmkwem, ma tụọ anya mmelite ndị nwere ike imebi ndakọrịta.

## TL;DR

* **Zebra** ma ọ bụ **Zakura** na-akwado chain. **Zinder** na-edepụta ihe node nwere ma na-ejere ndị ahịa ya ozi.
* Ụzọ abụọ e si abanye: API gRPC nke Zinder nke ya bụ `WalletQuery`, na adapter dị iche nke na-asụ protocol `CompactTxStreamer` nke lightwalletd, ka e-akpa ego e wuru maka lightwalletd nwee ike jikọọ na ya n'enweghị mgbanwe koodu.
* Ọgụgụ ọ bụla na-ejikọta na otu ọnọdụ chain (nke a na-akpọ "epoch"), ya mere otu ngwugwu mmekọrịta data anaghị agwakọta data sitere n'ọnụ chain abụọ na-asọrịta mpi. Igodo na nyocha nke data e chebere echebe na-anọ n'ime e-akpa ego.
* E wuru ya maka otu onye na-arụ ọrụ nke na-ejikwa otu node ma na-ejere ọtụtụ ndị ahịa ozi. Tinye ebe ọha n'azụ TLS, nkwenye njirimara na oke ọnụego nke gị.
* Ụdị ọhụrụ na-apụta ngwa ngwa (site na 0.7.0 ruo 0.12.0 n'etiti November 10 na 14, 2026), ọtụtụ n'ime ha mebikwara ndakọrịta. Gụọ ndekọ mgbanwe tupu mmelite ọ bụla.

## Ebe Zinder dabara

E-akpa ego dị mfe anaghị agwa full node okwu ozugbo. Ha na-arịọ indexer maka blocks kọmpat, ọnọdụ osisi na data Azụmahia (lee [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). E nwere ọtụtụ indexer n'ime usoro gburugburu ebe obibi Zcash nke nwere ike ime nke a:

| Indexer | Asụsụ | Onye na-elekọta ya | Ọ na-agwa | Ihe ndetu |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / obodo Zcash | Zebra ma ọ bụ zcashd | Sava mbụ maka e-akpa ego dị mfe |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra ma ọ bụ zcashd | Profaịlụ indexer nhọrọ n'ime stack Z3 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Node Zakura agbakwunyere | Lee nlele arụmọrụ [Zaino na Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 ma ọ bụ Zakura 1.8.6 (archive node) | Alpha. API nke ya yana adapter lightwalletd na ọgụgụ nyocha nhọrọ |

Akwụkwọ nduzi Zinder na-akọwa kpọmkwem mgbe ọ bụ nhọrọ dabara adaba: ọ kacha baa uru mgbe a chọrọ ka ohere ịbanye na chain dịrị ogologo oge karịa otu usoro e-akpa ego, jeere ọtụtụ ndị ahịa onwe ha ozi, ma ọ bụ nọrọ iche na koodu e-akpa ego ọ bụla. Maka otu e-akpa ego jikọtara nke ọma na indexer ya, indexer agbakwunyere nwere ike ịdị mfe karị; onye ahịa chọrọ naanị data node nweburu nwekwara ike iji RPC nke Zebra ozugbo.

## Otu e si wuo ya

Zinder na-ekewa ọrụ ahụ n'ime usoro dị iche iche, nke ọ bụla nwekwara otu ọrụ:

| Runtime | Ọrụ |
|:--|:--|
| `zinder-ingest` | Naanị onye na-ede ihe n'ime ebe nchekwa chain bụ isi (RocksDB). Ọ na-eso node, na-ahụ maka mgbanwe nhazi chain, ma na-edobe ọnọdụ mempool dị ndụ |
| `zinder-projector` | Naanị onye na-ede ihe n'ime ebe nchekwa e-akpa ego. Ọ na-ewu ma na-eso nlele chain e mere ka ọ dabara n'ụdị e-akpa ego |
| `zinder-query` | Na-eje ozi API gRPC `WalletQuery` nke ya |
| `zinder-compat-lightwalletd` | Na-eje ozi API `CompactTxStreamer` nke lightwalletd n'elu otu data ahụ |

Akụkụ nyocha nhọrọ (`zinder-explorer` tinyere `ExplorerQuery`) na-eje ozi nchịkọta block, nkọwa Azụmahia, nlele mempool na ọchụchọ; adapter nhọrọ na-eje ozi API REST na WebSocket nke nyocha CipherScan. Ha abụọ adịghị n'ime onyonyo ntọhapụ.

Runtime ọ bụla na-egosi `/healthz`, `/readyz` na `/metrics`. Ndị na-agụ data na-akọ naanị na ha dị njikere mgbe mbipụta ha nke ebe nchekwa chain na ebe nchekwa e-akpa ego jikọtara kpọmkwem n'otu ọnọdụ chain.

## Ụzọ e si jikọọ

* **E-akpa ego dị mfe dị ugbu a** na-edobe njikọ lightwalletd ha ma jikọọ ya na `zinder-compat-lightwalletd`. Akwụkwọ nduzi Zinder na-ekewa ndakọrịta protocol na nkwado: a na-ewere e-akpa ego a kpọrọ aha dị ka nke akwadoro naanị mgbe ụdị ya dị ugbu a gafere asambodo njedebe ruo na njedebe. Ụdị 0.10.0 doziri mpaghara ụdị protocol `GetLightdInfo` ka Zingo nwee ike imekọrịta data.
* **Ndị ahịa e ji API nke ya wuo** na-akpọ `zinder-query` maka ọgụgụ e jikọtara na ọnọdụ chain, blocks kọmpat, iyi mmemme chain na mempool, na nsonaazụ izipu Azụmahia nke nwere ihe kpatara ọjụjụ doro anya.
* **Ngwa Rust** na-eji crate `zinder-client`, SDK e mere ka o jiri njikọ dịpụrụ adịpụ nke mbụ jikọọ na `zinder-query` n'enweghị ijikọ stack nchekwa.
* **Ndị na-enyocha chain na sistemụ azụ azụ** na-ejikọta ọgụgụ e-akpa ego na akụkụ `ExplorerQuery` nhọrọ.

## Ịrụ ya

Ntuziaka mmalite ngwa ngwa nke ọrụ ahụ na-amalite node site na stack [Z3](/zcash-tech/z3-stack), ma mesịa Zinder ya site na Compose Docker site na checkout Zinder:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Faịlụ env maka Mainnet na maka node Zakura (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) dị n'akụkụ ya. Kemgbe 0.11.0, faịlụ Compose anaghịzi eche na a na-eji Z3: faịlụ env ga-akọ netwọk node, olu cookie na adreesị RPC.

Ọdụ ụgbọ mmiri ndabara nke igwe nnabata (Testnet na-agbakwunye 10000):

| Ọrụ | Mainnet | Testnet |
|:--|:--|:--|
| gRPC `WalletQuery` nke ya | 9102 | 19102 |
| gRPC dakọtara na lightwalletd | 9067 | 19067 |
| Njikere: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Ọdụ ụgbọ mmiri e-akpa ego abụọ ahụ na-ege naanị na loopback. Jiri iwu a lelee ha:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Ụzọ ntinye ndị ọzọ:

* **Onyonyo ntọhapụ** na `ghcr.io/zcashfoundation/`: runtime anọ ahụ, tinyere `zinder-wallet-serving` (ingest, projector na native query n'otu akpa maka igwe nnabata nwere ike ijikọ otu olu na otu akpa; enweghị adapter lightwalletd) na `zinder-canonical-runtime` (ingest naanị).
* **Faịlụ mmemme Linux** maka x86-64 (chọrọ CPU x86-64-v3) na AArch64, nwere glibc 2.34 ma ọ bụ nke ọhụrụ. Debian 12 bụ ntọala enwetara asambodo. Ntụhapụ ọ bụla na-ebipụta SBOM na ihe akaebe mmalite SLSA e binyere aka.

### Ihe node ga-enye

* **Archive node**. Kemgbe 0.11.0, `zinder-ingest` na-ajụ ịmalite ma ọ bụrụ na ọ jikọọ na node e bepụrụ ụfọdụ data ochie.
* Zebra **7.0.0** ma ọ bụ Zakura **1.8.6**. Ndị a bụ ụdị node abụọ e nyere asambodo n'ime usoro ntọhapụ.
* Maka onyonyo `zinder-wallet-serving`, **ebe njedebe gRPC indexer** nke node (`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra nke `indexer_listen_addr`, ọdụ ụgbọ mmiri 8155 na Mainnet). Indexer Zakura dị n'adreesị na-abụghị loopback chọrọ TLS nke akụkụ abụọ, nke Zinder na-akwado kemgbe 0.11.0.

### Nha maka Mainnet

Dị ka akwụkwọ usoro ọrụ maka inye e-akpa ego si kwuo:

* Opekata mpe **8 GB nke ebe nchekwa**. Oke e tụrụ: ingest ruru ihe dịka 2.6 GiB, projector ruru ihe dịka 2.7 GiB mgbe ọ na-ewu, query rukwa ihe dịka 1.4 GiB.
* Debe ihe dịka **130 GB n'efu** n'olu mgbe e wuchara ebe nchekwa e-akpa ego Mainnet.
* Otu owuwu Mainnet a tụrụ site na mmalite were ihe dịka **awa anọ** maka ebe nchekwa chain (ebe a na-arụ ọrụ ruru ihe dịka 310 GB) na **karịa awa abụọ** maka ebe nchekwa e-akpa ego. Oge ngwụcha owuwu e tinyere na ngwugwu dabara naanị na Testnet: welie ha ka ha dịkarịa ala awa 24 na awa 12 maka Mainnet, ma ọ bụ owuwu ahụ ga-amalitekwa ọzọ ma ghara ịkwụsị.

## Ihe dị mkpa ịmara gbasara ntọhapụ

| Ụdị | Ụbọchị | Ihe gbanwere maka ndị na-arụ ya |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Ewelitere windo mgbanwe nhazi chain ndabara ruo blocks 1000, omimi nke Zebra 7 na Zakura ji emechi blocks. Agaghị agbanwe ya azụ: ụdị ochie agaghị emeghe ebe nchekwa ndị e welitere |
| 0.9.0 | 2026-11-12 | Onyonyo `zinder-wallet-serving` na `zinder-canonical-runtime` ọhụrụ |
| 0.10.0 | 2026-11-13 | **Ntọhapụ mbụ na-agụ blocks NU7.** 0.9.0 na ụdị ndị bu ya ụzọ na-akwụsị na block NU7 mbụ. Ndozigharị protocol nke ya bụ 8: kwalite ingest na query ọnụ, tinyekwa ndị ahịa protocol nke ya |
| 0.11.1 | 2026-11-14 | E nyere Zakura 1.8.6 asambodo yana Zebra 7.0.0; TLS nke akụkụ abụọ maka node indexer; a jụrụ node e bepụrụ ụfọdụ data ochie. E wepụtara 0.11.0 naanị dịka crates, ya mere tinye 0.11.1 |
| 0.12.0 | 2026-11-14 | Ndozi maka njikere na mmechi; ịkpọghachi data nyocha na-adị ngwa karịa ma na-akwụsịtụ mgbe ohere diski belatara |

## Mmehie Ndị A Na-emekarị

**Iwere ya dịka sọftụwia njikere maka mmepụta.** Ọrụ a na-akpọ onwe ya alpha. Dị ka okwu nke ya si dị, itinye ya na Compose nke mpaghara nke gara nke ọma "abụghị n'onwe ya asambodo maka mmepụta".

**Iduzi ya na node e bepụrụ ụfọdụ data ochie.** Ingest na-apụ mgbe ọ na-amalite. Jiri Zebra ma ọ bụ Zakura archive node.

**Imeghe ọdụ ụgbọ mmiri gRPC ozugbo na ịntanetị.** Ọdụ ụgbọ mmiri e-akpa ego abụọ ahụ na-ege naanị na loopback n'ihi ihe kpatara ya. Tinye TLS, nkwenye njirimara, oke ọnụego na oke ojiji n'ime proxy ị na-achịkwa tupu i meghee ha na ịntanetị.

**Imelite otu runtime n'otu oge.** Ọtụtụ ntọhapụ na-agbanwe ndozigharị protocol nke ya ma ọ bụ usoro ebe nchekwa. Kwalite ọrụ Zinder ọnụ, ma melite ndị ahịa protocol nke ya n'otu oge mgbanwe ahụ.

**Iche na a kwadoro e-akpa ego n'ihi na protocol ya dakọtara.** Adapter lightwalletd na-asụ protocol ahụ, mana Zinder na-ekwupụta nkwado maka e-akpa ego a kpọrọ aha naanị mgbe ụdị e-akpa ego ahụ dị ugbu a nwetara asambodo site na mmalite ruo na njedebe.

## Ibe ndị metụtara ya

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — ọrụ sava e-akpa ego dị mfe na ihe ọ nwere ike ịhụ
* [Zaino](/zcash-tech/zaino) — indexer Zingo Labs Rust
* [Nlele arụmọrụ Indexer: Zaino na Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 Stack](/zcash-tech/z3-stack) — Zebra + Zallet, nhazi node nke ntuziaka mmalite ngwa ngwa Zinder ji
* [Zebra Full Node](/zcash-tech/zebra-full-node) na [Zakura Node](/zcash-tech/zakura-node) — node abụọ Zinder na-enye asambodo

## Ebee ka m ga-amụtakwu?

* Ebe nchekwa koodu [Zinder GitHub](https://github.com/ZcashFoundation/zinder)
* Ntụhapụ [Zinder](https://github.com/ZcashFoundation/zinder/releases) na [ndekọ mgbanwe](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Ihe Zinder bụ na ihe ọ na-abụghị](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Itinye ya na VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) na akwụkwọ usoro ọrụ [onyonyo na-enye e-akpa ego](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Emelitere ikpeazụ:** November 2026
