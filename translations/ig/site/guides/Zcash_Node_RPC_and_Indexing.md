<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Ibe"/>
</a>

# Ntuziaka Bara Uru: Zcash Node RPC na Ndepụta Blockchain

Ibe a bụ akwụkwọ ntuziaka maka ịgwa Zcash full node na-arụ ọrụ okwu site na JSON-RPC na maka ijikọ indexer nke e-akpa ego dị mfe na ndị nchọgharị nwere ike ịjụ ajụjụ n'aka ya. Ọ **bụghị** ntuziaka nrụnye nke abụọ.

Maka otu esi amalite stack mgbe-`zcashd` (Zebra + Zallet, Zaino nhọrọ, ports, volumes, mbido nke usoro abụọ), jiri ibe [Stack Z3](/zcash-tech/z3-stack) na ebe nchekwa [Z3](https://github.com/ZcashFoundation/z3). Maka ndabere gbasara consensus node, lee [Full Nodes](/zcash-tech/full-nodes) na [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` ruru njedebe ndụ ya n'ụbọchị 18 Julaị 2026. Ọrụ onye na-arụ ọrụ ọhụrụ kwesịrị ilekwasị anya na Zebra (ma ọ bụ [Zakura](/zcash-tech/zakura-node)) yana e-akpa ego/indexer, ọ bụghị `zcashd`.

---

## Na nkenke

* **JSON-RPC** bụ ụzọ ndị na-arụ ọrụ na e-akpa ego si ajụ node gbasara chain tip, peers, na (n'ime usoro e-akpa ego) ego fọdụrụ. Na Z3, Zebra na-enye node RPC; Zallet na-enye wallet RPC.
* **Regtest** bụ ebe kwesịrị ekwesị iji mụta calls ndị a. Rpc-router Z3 dị na `http://127.0.0.1:8181` na-anabata `zebra` / `zebra` ma na-ebufe ụzọ node gaa Zebra na ụzọ wallet gaa Zallet.
* **Mainnet na testnet** na-eji cookie auth na Zebra. Edegharịla aha njirimara/password regtest n'elu node ọha.
* **Ndepụta [Indexing]** bụ ọrụ dị iche na nkwado iwu [validation]. Zebra na-akwado iwu. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) na-enye gRPC kwekọrọ na lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) bụ indexer dabere na Zakura; ọ bụghị ihe Z3 na-ebunye.
* JSON-RPC Zaino na indexer gRPC nhọrọ nke Zebra bụ maka loopback ma ọ bụ netwọk a tụkwasịrị obi. Ewepụla ha n'enweghị nkwenye na ịntanetị ọha.

---

## Usoro nke ọ bụla na-aza call nke ọ bụla

| Ihe ị chọrọ | Gwa | Port onye nnabata Z3 mainnet | Ihe edeturu |
| --- | --- | --- | --- |
| Chain tip, peers, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie auth |
| Ego fọdụrụ n'e-akpa ego, adreesị, izipu | Zallet RPC | 28232 | Usoro dị iche; sọftụwia beta |
| Compact blocks maka e-akpa ego dị mfe | Zaino gRPC | 8137 | Naanị ya na `--profile indexer`; plaintext h2c |
| Explorer / faucet JSON-RPC proxy | Zaino JSON-RPC | 8237 | Naanị netwọk a tụkwasịrị obi |
| Mee ihe niile dị n'elu n'enweghị sync | Z3 regtest rpc-router | 8181 | Aha njirimara `zebra` / password `zebra` |

Mgbakọ port na aha ọrụ Compose: [Stack Z3](/zcash-tech/z3-stack) na [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Buru ụzọ mụọ na regtest

Site na checkout Z3, mgbe `./scripts/regtest-init.sh` na `docker compose --env-file .env.regtest up -d` gachara:

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

Nsonaazụ `getblockchaininfo` dị mma gụnyere `"blocks"` na map `"upgrades"`. Ọ bụrụ na curl kwụgidere, router amalitebeghị; ọ bụrụ na ị nweta `401`, ị na-akpọ Zebra ozugbo kama router (Zebra kpọmkwem na regtest bụ `29232` ma ka na-atụ anya nzere router ma ọ bụrụ na ị gbanweghị ha).

Usoro regtest zuru ezu, gụnyere ịgwụputa blocks mmalite: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (cookie auth)

Na mainnet na testnet, Zallet na ọrụ Zaino nhọrọ na-agụ **shared cookie volume**. A na-emepụta cookie ahụ ọzọ mgbe a malitere usoro; ọ bụghị ebe nchekwa ndabere.

**Ewepụla** Zebra JSON-RPC na ịntanetị ọha. Kpọọ ya site na netwọk Compose (`zebra:8232`) ma ọ bụ site n'aka onye nnabata naanị ma ọ bụrụ na ị kegidere ya na loopback.

Nlele ndị onye na-arụ ọrụ na-emekarị mgbe Zebra bụ `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` bụ mining RPCs. Pools ka na-atụ anya otu usoro `zcashd` chọrọ Zebra (ma ọ bụ Zakura) maka templates yana e-akpa ego ọ bụla ha ji maka coinbase. Lee [Zcash Mining Pools](/using-zcash/zcash-mining-pools) na [ntụziaka mbugharị](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Jikọọ indexer

Nkwado iwu na ndepụta bụ ọrụ dị iche.

### Zaino (ihe Z3 na-ebunye)

Zaino na-agụ Zebra ma na-enye API gRPC kwekọrọ na lightwalletd yana JSON-RPC proxy. Zallet **achọghị** container Zaino kwụụrụ onwe ya; ọ na-etinye libraries Zaino n'ime ya ma na-agwa Zebra okwu site na JSON-RPC. Malite Zaino kwụụrụ onwe ya mgbe ịchọrọ e-akpa ego dị mfe nke mpụga, explorers, ma ọ bụ faucets:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Chere ruo mgbe Zebra mechara sync tupu i duzie clients gaa Zaino. Indexer nnukwu nke na-agbalị iru ọnọdụ ugbu a ma nwee fetch concurrency dị elu nwere ike ime ka verifier nke Zebra jiri nwayọọ; debe `fetch_concurrency` n'ime obere ọnụọgụ otu-digit ruo mgbe indexer ruru ọnọdụ ugbu a.

Regtest gRPC (plaintext; port `28137`):

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

gRPC Zaino bụ plaintext h2c na netwọk niile. Kwụsị TLS na reverse proxy ma ọ bụrụ na ihe ọ bụla na-abụghị onye nnabata ga-ejikọ. Nkọwa: [Zaino](/zcash-tech/zaino) na [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Indexers ndị ọzọ (ọ bụghị Z3)

* **lightwalletd** — sava compact-block ochie. A ka na-ebuga ya n'ebe ụfọdụ; Zaino bụ ụzọ nnọchi maka ọrụ a.
* **Ztreamer** — indexer dabere na Zakura na mmejuputa `CompactTxStreamer`. Ọ bụghị ọrụ Z3. Lee ebe nchekwa [Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — gRPC listener nhọrọ *n'ime* Zebra. Z3 anaghị achọ ya, ọ dịghịkwa ebipụta ya nye onye nnabata.

---

## Mmejọ ndị a na-ahụkarị

**Ịkpọ wallet methods na Zebra.** `getwalletinfo` na send RPCs bụ nke Zallet (ma ọ bụ e-akpa ego ọzọ), ọ bụghị nke consensus node.

**Ịmalite Zallet tupu Zebra abụrụ `/ready`.** Zallet ga-amalitegharịa ugboro ugboro. Jiri `scripts/check-zebra-readiness.sh` na mainnet/testnet.

**Idetuo `zebra`/`zebra` regtest na mainnet.** Cookie auth bụ ndabara mainnet/testnet n'ihi ezi ihe kpatara ya.

**Iwere Zaino dịka full node.** Zebra (ma ọ bụ Zakura) na-akwado iwu. Zaino na-edepụta.

**Iwepụta Zaino JSON-RPC ma ọ bụ Zebra indexer gRPC n'ihu ọha.** Endpoints ndị ahụ bụ maka loopback ma ọ bụ netwọk nkeonwe a tụkwasịrị obi.

**Iche na e-akpa ego dị mfe niile ekwuola Zaino.** Lelee release e-akpa ego ugbu a megide protocol ọ na-emejuputa n'ezie.

---

## Ibe ndị metụtara ya

* [Stack Z3](/zcash-tech/z3-stack) — nrụnye, ports, volumes, mbido nke usoro abụọ
* [Zaino](/zcash-tech/zaino) — ọrụ indexer na ndetu onye na-arụ ọrụ
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Ntuziaka Mbugharị: zcashd gaa Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib na Zaino Nkuzi](/guides/zingolib-and-zaino-tutorial)

## Akụrụngwa

* [Ebe nchekwa Z3](https://github.com/ZcashFoundation/z3)
* [Akwụkwọ nri regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Ajụjụ a na-ajụkarị banyere Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Akwụkwọ](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Emelitere ikpeazụ:** Septemba 2026
