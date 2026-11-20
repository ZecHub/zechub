<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie ibe a"/>
</a>

# Ntuziaka bara uru: Zcash RPC nke Node na Ndepụta Blockchain

Ibe a bụ akwụkwọ ntụziaka maka isoro Zcash full node na-agba ọsọ kparịta ụka site na JSON-RPC, yana ijikọ indexer nke e-akpa ego dị fechaa na ndị na-enyocha blockchain nwere ike ịjụ ajụjụ. Ọ **abụghị** ntuziaka nwụnye nke abụọ.

Maka otu e si ebuli usoro post-`zcashd` (Zebra + Zallet, Zaino nhọrọ, ọdụ ụgbọ mmiri, mpịakọta data, mbido ụzọ abụọ), jiri ibe [Z3 Stack](/zcash-tech/z3-stack) na [ebe nchekwa koodu Z3](https://github.com/ZcashFoundation/z3). Maka nkọwa ndabere gbasara consensus-node, lee [Full Nodes](/zcash-tech/full-nodes) na [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` akwụsịla ọrụ ya na 18 Julaị 2026. Ọrụ ọhụrụ nke ndị na-arụ ọrụ kwesịrị ilekwasị anya na Zebra (ma ọ bụ [Zakura](/zcash-tech/zakura-node)) tinyere e-akpa ego/indexer, ọ bụghị `zcashd`.

---

## Nchịkọta dị mkpirikpi

* **JSON-RPC** bụ ụzọ ndị na-arụ ọrụ na e-akpa ego si ajụ node gbasara chain tip, ndị ọgbọ ya, na (n'usoro wallet) ego dị na ya. Na Z3, Zebra na-enye node RPC; Zallet na-enye wallet RPC.
* **Regtest** bụ ebe kwesịrị ekwesị ịmụ oku ndị a. rpc-router nke Z3 na `http://127.0.0.1:8181` na-anabata `zebra` / `zebra` ma na-ebuga ụzọ node na Zebra, ụzọ walletkwa na Zallet.
* **Mainnet na testnet** na-eji cookie auth na Zebra. Eṅomila aha njirimara/okwu nzuzo regtest n'elu node ọha.
* **Ndepụta** bụ ọrụ dị iche na nkwado izi ezi. Zebra na-akwado izi ezi. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) na-enye gRPC dakọtara na lightwalletd. [Ztreamer](https://github.com/zcashlabs/ztreamer) bụ indexer nke Zakura na-akwado; ọ bụghị ihe Z3 na-ebunye.
* Zaino JSON-RPC na gRPC indexer nhọrọ nke Zebra bụ maka loopback ma ọ bụ netwọk a tụkwasịrị obi. Ekpughela ha n'ịntanetị ọha n'enweghị nyocha njirimara.

---

## Kedu usoro na-aza oku ọ bụla

| Ihe ị chọrọ | Gwa | Ọdụ ụgbọ mmiri host Z3 mainnet | Ihe edeturu |
| --- | --- | --- | --- |
| Chain tip, ndị ọgbọ, `getblockchaininfo` | JSON-RPC nke Zebra | 8232 | Cookie auth |
| Ego dị na wallet, adreesị, izipu | RPC nke Zallet | 28232 | Usoro dị iche; sọftụwia beta |
| Compact blocks maka e-akpa ego dị fechaa | gRPC nke Zaino | 8137 | Naanị na `--profile indexer`; h2c na-enweghị nzuzo |
| Proxy JSON-RPC maka explorer / faucet | JSON-RPC nke Zaino | 8237 | Netwọk a tụkwasịrị obi naanị |
| Mee ihe niile dị n'elu n'enweghị sync | Z3 regtest rpc-router | 8181 | Aha njirimara `zebra` / okwu nzuzo `zebra` |

Tebụl ọdụ ụgbọ mmiri na aha ọrụ Compose: [Z3 Stack](/zcash-tech/z3-stack) na [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Buru ụzọ mụọ na regtest

Site na nnomi Z3, mgbe `./scripts/regtest-init.sh` na `docker compose --env-file .env.regtest up -d` gasịrị:

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

Nsonaazụ `getblockchaininfo` dị mma nwere `"blocks"` na map `"upgrades"`. Ọ bụrụ na curl kwụsịrị n'ebe ahụ, router amalitebeghị; ọ bụrụ na ị nwetara `401`, ị na-akpọ Zebra ozugbo kama router (Zebra ozugbo na regtest bụ `29232` ma ka na-atụ anya nzere router ma ọ bụrụ na ị gbanwebeghị ha).

Usoro regtest zuru ezu, tinyere ịgwụputa activation blocks: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC mainnet / testnet (cookie auth)

Na mainnet na testnet, Zallet na ọrụ Zaino nhọrọ na-agụ **shared cookie volume**. A na-emegharị cookie ahụ mgbe a na-ebido sistemụ; ọ bụghị ihe a ga-edobe dị ka ndabere.

E **ebipụtala** Zebra JSON-RPC n'ịntanetị ọha. Kpọọ ya site na netwọk Compose (`zebra:8232`) ma ọ bụ site na host naanị ma ọ bụrụ na i jikọtara ya na loopback.

Nlele ndị ọrụ na-emekarị mgbe Zebra bụ `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` bụ mining RPCs. Pool ndị ka na-atụ anya otu usoro `zcashd` chọrọ Zebra (ma ọ bụ Zakura) maka templates tinyere wallet ọ bụla ha ji eme coinbase. Lee [Zcash Mining Pools](/using-zcash/zcash-mining-pools) na [ntuziaka mbugharị](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Jikọọ indexer

Nkwado izi ezi na ndepụta bụ ọrụ dị iche iche.

### Zaino (ihe Z3 na-ebunye)

Zaino na-agụ Zebra ma na-enye gRPC API dakọtara na lightwalletd tinyere proxy JSON-RPC. Zallet achọghị container Zaino kwụụrụ onwe ya; o tinyere ọba akwụkwọ Zaino ma na-agwa Zebra okwu site na JSON-RPC. Malite Zaino kwụụrụ onwe ya mgbe ịchọrọ ka e-akpa ego dị fechaa, explorers, ma ọ bụ faucets dị n'èzí jiri ya:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Chere ruo mgbe Zebra mekọrịtara tupu i duzie ndị ahịa na Zaino. Indexer buru ibu nke ka na-ejide n'azụ mgbe ọ na-eme catch-up, ma nwee fetch concurrency dị elu, nwere ike ime ka verifier nke Zebra dị nwayọọ; debe `fetch_concurrency` n'ọkwa ọnụọgụ nta ruo mgbe indexer mechara catch-up.

Regtest gRPC (plaintext; ọdụ ụgbọ mmiri `28137`):

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

Zaino gRPC bụ plaintext h2c na netwọk niile. Mechie TLS na reverse proxy ma ọ bụrụ na ihe ọ bụla na-abụghị host ga-ejikọ. Nkọwa: [Zaino](/zcash-tech/zaino) na [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Indexer ndị ọzọ (abụghị Z3)

* **lightwalletd** — sava compact-block ochie. A ka na-eji ya n'ebe dị iche iche; Zaino bụ ụzọ nọchiri ya maka ọrụ a.
* **Ztreamer** — indexer nke Zakura na-akwado na mmejuputa `CompactTxStreamer`. Ọ bụghị ọrụ Z3. Lee [Ztreamerebe nchekwa koodu](https://github.com/zcashlabs/ztreamer).
* **Zinder** — indexer nke Zcash Foundation (alpha). Ọ na-agụ site na archive Zebra ma ọ bụ node Zakura, ma na-enye gRPC API `WalletQuery` nke ya tinyere adapter `CompactTxStreamer` dakọtara na lightwalletd. Ntuziaka mmalite ngwa ngwa ya na-amalite n'akụkụ node Z3, mana ọ bụghị ọrụ Z3. Lee [Zinder](/zcash-tech/zinder).
* **Zebra `rpc.indexer_listen_addr`** — onye na-ege ntị gRPC nhọrọ *n'ime* Zebra. Z3 achọghị ya, ọ naghị ebipụtakwa ya n'host.

---

## Mmejọ ndị a na-emekarị

**Ịkpọ ụzọ wallet na Zebra.** `getwalletinfo` na oku RPC izipu bụ nke Zallet (ma ọ bụ wallet ọzọ), ọ bụghị nke consensus node.

**Ịmalite Zallet tupu Zebra aghọọ `/ready`.** Zallet ga na-amalitegharị ugboro ugboro. Jiri `scripts/check-zebra-readiness.sh` na mainnet/testnet.

**Iṅomi `zebra`/`zebra` regtest gaa na mainnet.** Enwere ihe mere cookie auth ji bụrụ ndabara na mainnet/testnet.

**Iwere Zaino dị ka full node.** Zebra (ma ọ bụ Zakura) na-akwado izi ezi. Zaino na-edepụta.

**Ikpughe JSON-RPC nke Zaino ma ọ bụ gRPC indexer nke Zebra n'ihu ọha.** Ọdụ ndị a bụ maka loopback ma ọ bụ netwọk nzuzo a tụkwasịrị obi.

**Iche na e-akpa ego dị fechaa niile na-eji Zaino ugbu a.** Lelee ntọhapụ wallet ugbu a ma tụnyere ya na protocol ọ na-emejuputa n'ezie.

---

## Ibe ndị metụtara ya

* [Z3 Stack](/zcash-tech/z3-stack) — nwụnye, ọdụ ụgbọ mmiri, mpịakọta data, mbido ụzọ abụọ
* [Zaino](/zcash-tech/zaino) — ọrụ indexer na ndetu ndị ọrụ
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Zcash Stack](/guides/zcash-stack) — Zebra + lightwalletd (ma ọ bụ Zaino) na Kubernetes ma ọ bụ Compose nke Docker
* [Ntuziaka Mbugharị: zcashd gaa na Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib na Ntuziaka Zaino](/guides/zingolib-and-zaino-tutorial)

## Ihe enyemaka

* [ebe nchekwa koodu Z3](https://github.com/ZcashFoundation/z3)
* [Akwụkwọ ntụziaka Z3 regtest (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Ajụjụ ndị a na-ajụkarị gbasara Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Akwụkwọ](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/zcashlabs/ztreamer)

**Emelitere ikpeazụ:** Septemba 2026
