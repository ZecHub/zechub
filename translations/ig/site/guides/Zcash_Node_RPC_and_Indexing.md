<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nduzi Bara Uru: Zcash Node RPC na Blockchain Indexing

Ibe a bụ akwụkwọ nri maka ịgwa Zcash zuru oke okwu site na JSON-RPC yana maka itinye ihe ndeksi nke obere akpa na ndị na-eme nchọpụta nwere ike ịjụ. Ọ bụghị **ọ bụ ntuziaka nrụnye nke abụọ.

Maka otu esi eweta ozi-`zcashd` tinye ihe ndị a (Zebra + Zallet, Zaino, ọdụ ụgbọ mmiri, olu, buut nke nwere usoro abụọ), jiri ya [Z3 Stack](/zcash-tech/z3-stack) peeji na [Ebe nchekwa Z3](https://github.com/ZcashFoundation/z3)Maka ndabere nke nkwekọrịta, lee [Ọnụ zuru ezu](/zcash-tech/full-nodes) na [Zebra zuru oke](/zcash-tech/zebra-full-node).

`zcashd` ruo ọgwụgwụ ndụ na 18 Julaị 2026. Ọrụ ọhụrụ nke ndị ọrụ kwesịrị ilekwasị anya na Zebra (ma ọ bụ [Zakura](/zcash-tech/zakura-node)) tinyere obere akpa/indexer, ọ bụghị `zcashd`.

---

## TL;DR

* **JSON-RPC** bụ otu ndị ọrụ na obere akpa si ajụ otu n'ime ha gbasara ntụnye aka nke yinye, ndị ọgbọ, na nhazi (na usoro obere akpa). Na Z3, Zebra na-enye node RPC; Zallet na-enye obere akpa RPC.
* **Regtest** bụ ebe kwesịrị ekwesị ịmụta oku. Z3's rpc-rauter dị na ya `http://127.0.0.1:8181` na-anabata `zebra` / `zebra` ma ziga ụzọ n'ime oghere gaa na Zebra na ụzọ obere akpa gaa na Zallet.
* **Mainnet na testnet** jiri kuki auth na Zebra. Edetuola aha njirimara/paswọọdụ regtest na node ọha.
* **Ịdepụta ihe dị iche** bụ ọrụ dị iche na nkwenye. Zebra na-akwado. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) na-enye gRPC lightwalletd-compatible. [Ztreamer](https://github.com/distractedm1nd/ztreamer) bụ ihe ngosi Zakura-backed; ọ bụghị ihe Z3 na-ebuga.
* A na-eji gRPC nke Zaino JSON-RPC na Zebra's maka loopback ma ọ bụ netwọk a pụrụ ịtụkwasị obi. Ekpughela ha na ịntanetị ọha na eze na-enweghị nkwenye.

---

## Kedu usoro na-aza oku nke na-aza oku

| Ị chọrọ | Gwa ya okwu | Ọdụ ụgbọ mmiri nnabata Z3 bụ isi | Ihe ndetu |
| --- | --- | --- | --- |
| Ndụmọdụ maka ndị ọgbọ, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Onye dere kuki |
| Ọnụ ego akpa ego, adreesị, izipu | Zallet RPC | 28232 | Usoro dị iche; ngwanrọ beta |
| Blọk dị obere maka obere akpa | Zaino gRPC | 8137 | Naanị na `--profile indexer`; ederede doro anya h2c |
| Ihe nnọchiteanya JSON-RPC nke Explorer / faucet | Zaino JSON-RPC | 8237 | Naanị netwọk a tụkwasịrị obi |
| Mee ihe niile dị n'elu na-enweghị mmekọrịta | Z3 regtest rpc-rawụta | 8181 | Aha njirimara `zebra` / paswọọdụ `zebra` |

Matrix Port na Dee aha ọrụ: [Z3 Stack](/zcash-tech/z3-stack) na [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Mee ihe omume na regtest mbụ

Site na ndenye ego Z3, mgbe emechara `./scripts/regtest-init.sh` na `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Ahụ́ dị mma `getblockchaininfo` ihe si na ya pụta gụnyere `"blocks"` na `"upgrades"` maapụ. Ọ bụrụ na mkpọchi ahụ kwụgidere, rawụta ahụ agaghị agba; ọ bụrụ na ị nweta ya `401`, ị na-akụ Zebra ozugbo kama ịpịa rawụta (Zebra ozugbo na regtest bụ `29232` ma ka na-atụ anya nzere rawụta ahụ ọ gwụla ma ị gbanwere ha).

Usoro ọrụ nyocha zuru oke, gụnyere igwupụta ihe mgbochi mmalite: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet/ testnet JSON-RPC (kuki auth)

Na mainnet na testnet, Zallet na ọrụ Zaino nhọrọ gụrụ olu kuki nke a na-ekerịta**. A na-emegharị kuki ahụ mgbe ebidochara ya; ọ bụghị ihe mgbaru ọsọ ndabere.

E bipụtala Zebra JSON-RPC na ịntanetị ọha. Kpọọ ya site na netwọk Compose (`zebra:8232`) ma ọ bụ site na onye nnabata naanị ma ọ bụrụ na ị kegidere ya na loopback.

Ndị ọrụ nkịtị na-enyocha Zebra mgbe emechara `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` na-egwupụta RPC. Ọdọ mmiri ndị ka na-atụ anya otu `zcashd` Usoro chọrọ Zebra (ma ọ bụ Zakura) maka ndebiri tinyere obere akpa ọ bụla ha ji eme coinbase [Ọdọ Mmiri Ngwuputa Zcash](/using-zcash/zcash-mining-pools) na [ntuziaka mbugharị](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Tinye ihe ndeksi

Nkwenye na nhazi ọkwa bụ ọrụ dị iche iche.

### Zaino (ihe Z3 na-ebuga)

Zaino na-agụ Zebra ma na-enye API gRPC lightwalletd-compatible yana proxy JSON-RPC. Zallet achọghị akpa Zaino nke nọọrọ onwe ya; ọ na-etinye ọbá akwụkwọ Zaino ma na-agwa Zebra okwu site na JSON-RPC. Malite Zaino nke nọọrọ onwe ya mgbe ịchọrọ obere akpa ọkụ mpụga, ndị nchọpụta, ma ọ bụ faucets:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Chere ruo mgbe Zebra ga-arụkọ ọrụ tupu ị tụọ ndị ahịa aka na Zaino. Ihe na-egosi ọnụọgụgụ mmadụ na-ejide ya na oge a na-enweta ya nwere ike ime ka ihe nyocha Zebra's ghara ịdị ngwa ngwa; debe ya `fetch_concurrency` na obere ọnụọgụgụ otu ruo mgbe indexer ahụ gwụchara.

Nnwale Reg GRPC (ederede doro anya; ọdụ ụgbọ mmiri `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Zaino gRPC bụ ederede nkịtị h2c na netwọk niile. Kwụsị TLS na proxy azụ ma ọ bụrụ na ihe ọ bụla dị n'èzí onye nnabata ahụ ga-ejikọ. Nkọwa: [Zaino](/zcash-tech/zaino) na [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Ndepụta ndị ọzọ (ọ bụghị Z3)

* **lightwalletd** — sava obere ngọngọ ochie. Ka dị n'ọhịa; Zaino bụ onye ga-anọchi ọrụ a.
* **Ztreamer** — ihe ngosi Zakura-backed na `CompactTxStreamer` Mmejuputa. Ọ bụghị ọrụ Z3. Lee [Ebe nchekwa Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — onye na-ege ntị gRPC nhọrọ *n'ime* Zebra. Z3 achọghị ya ma ọ naghị ebipụta ya nye onye na-akwado ya.

---

## Mmejọ ndị a na-emekarị

**Ịkpọ ụzọ obere akpa na Zebra.** `getwalletinfo` ma zipu RPCs bụ nke Zallet (ma ọ bụ obere akpa ego ọzọ), ọ bụghị na nkwekọ nkwekọrịta.

**Malite Zallet tupu Zebra amalite `/ready`.** Zallet ga-amalitegharị ọzọ. Jiri `scripts/check-zebra-readiness.sh` na mainnet/testnet.

**Nyocha regtest na-edegharị `zebra`/`zebra` na mainnet.** Kuki auth bụ ntọala mainnet/testnet maka ihe kpatara ya.

**Ịnagide Zaino dị ka ebe zuru oke.** Zebra (ma ọ bụ Zakura) na-akwado. Ndepụta Zaino.

**Ikpughe Zaino JSON-RPC ma ọ bụ Zebra indexer gRPC n'ihu ọha.** Isi njedebe ndị ahụ bụ maka loopback ma ọ bụ netwọk nkeonwe a pụrụ ịtụkwasị obi.

**Echere na obere akpa ọ bụla na-asụ Zaino.** Lelee mwepụta nke obere akpa ahụ site na usoro ọ na-eji eme ihe n'ezie.

---

## Ibe ndị metụtara ya

* [Z3 Stack](/zcash-tech/z3-stack) - ntinye, ọdụ ụgbọ mmiri, olu, buut nke usoro abụọ
* [Zaino](/zcash-tech/zaino) - ọrụ indexer na ndetu onye ọrụ
* [Ọnụ zuru ezu](/zcash-tech/full-nodes)
* [Zebra zuru oke](/zcash-tech/zebra-full-node)
* [Ọnụọgụ obere akpa](/zcash-tech/lightwallet-nodes)
* [Nduzi Mbugharị: zcashd gaa Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib na Zaino](/guides/zingolib-and-zaino-tutorial)

## akụrụngwa

* [Ebe nchekwa Z3](https://github.com/ZcashFoundation/z3)
* [Akwụkwọ nri Z3 regtest (gbagọọ agbagọ / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Ajụjụ Ndị A Na-ajụkarị Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Akwụkwọ Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Emelitere ikpeazụ:** Septemba 2026
