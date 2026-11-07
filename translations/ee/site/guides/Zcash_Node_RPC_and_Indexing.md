<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axawɔ Ɖe Eŋu"/>
</a>

# Mɔfiame Si Wɔa Dɔ Kple: Zcash Node RPC kple Blockchain Ƒe Nudzodzro

Axa sia nye nuɖuɖu ƒe agbalẽ na alesi nàdo go kple Zcash full node si le dɔ wɔm to JSON-RPC me, eye nàtsɔ indexer aɖe akpe ɖe eŋu be gakotokuwo siwo le keklẽ me kple nusiwo dzroa nuwo kpɔna ate ŋu adi biabia tso eŋu. Menye aƒoƒo ƒe mɔfiame evelia o.

Ne èdi be nànya ale si nàna post-`zcashd` stack la nadze egɔme (Zebra + Zallet, Zaino si wòate ŋu atia, portwo, volumeawo, boot ƒe akpa eve), zã [Z3 Stack](/zcash-tech/z3-stack) axa kple [Z3 repository](https://github.com/ZcashFoundation/z3). Na nyamedzesi ŋɔŋlɔ ƒe gbegbɔgblɔ ɖi [consensus] me nyawo, kpɔ [Full Nodes](/zcash-tech/full-nodes) kple [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` wɔ eƒe agbenɔnɔ nu le 18 July 2026. Operator ƒe dɔ yeye woɖo be wòatsɔ Zebra (alo [Zakura](/zcash-tech/zakura-node)) kple gakotoku alo indexer awɔ, menye `zcashd` o.

---

## Nyagbegbe

* **JSON-RPC** nye mɔ si dzi operators kple gakotokuwo bia biabia ɖe ɖoɖonu [chain] ƒe tip, xɔlɔwo, kple (le gakotoku ƒe process aɖe dzi) balancewo ŋu. Le Z3 dzi la, Zebra dea node RPC; Zallet dea gakotoku RPC.
* **Regtest** nye teƒe si nyo be nàsɔ srɔ̃a calls la. Z3 ƒe rpc-router si le `http://127.0.0.1:8181` xɔa `zebra` / `zebra` eye wòɖoa node methods yi Zebra gbɔ, eye wòɖoa gakotoku methods yi Zallet gbɔ.
* **Mainnet kple testnet** zã cookie auth le Zebra. Mègatsɔ regtest ƒe username/password ade public node aɖe ŋu o.
* **Indexing** nye dɔ bubu tso validation gbɔ. Zebra wɔa validation. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) dea lightwalletd-compatible gRPC. [Ztreamer](https://github.com/distractedm1nd/ztreamer) nye Zakura-backed indexer; menye nusi Z3 dea la o.
* Zaino JSON-RPC kple Zebra ƒe indexer gRPC si wòate ŋu atia la nye loopback alo network si wòka ɖe dzi ƒe tanya. Mègana woanɔ public internet dzi, eye authentication manɔ o.

---

## Process kae ƒoa ŋu xɔa call sia?

| Nusi nèdi | Ɖo go kple | Z3 mainnet host port | Nudzɔdzɔwo |
| --- | --- | --- | --- |
| Ɖoɖonu ƒe tip, xɔlɔwo, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie auth |
| Gakotoku ƒe balance, gaɖoƒe ƒe dzesiwo, dɔm | Zallet RPC | 28232 | Process bubu; beta software |
| Gaɖoɖowo ƒuƒoƒe [block] siwo wòkpekpe na gakotoku siwo le keklẽ me | Zaino gRPC | 8137 | Kpoe le `--profile indexer` kple; plaintext h2c |
| Explorer / ga suewo nanaƒe [faucet] JSON-RPC proxy | Zaino JSON-RPC | 8237 | Network si wòka ɖe dzi ko |
| Sɔ nunyawo katã fiafia me, sync manɔmee | Z3 regtest rpc-router | 8181 | Username `zebra` / password `zebra` |

Port ƒe matrix kple Compose project ƒe ŋkɔwo: [Z3 Stack](/zcash-tech/z3-stack) kple [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Ƒo regtest me gbã

Tso Z3 checkout aɖe me, le `./scripts/regtest-init.sh` kple `docker compose --env-file .env.regtest up -d` megbe:

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

`getblockchaininfo` ƒe emetsonu si le nyuie me la ƒoa `"blocks"` kple `"upgrades"` map aɖe. Ne curl nɔ kame la, router la menɔ dzi o; ne èxɔ `401` la, èle Zebra gbɔ kplee tẽ ɖe router la teƒe (Zebra si le regtest me kplee tẽe nye `29232`, eye wògale router credentials la dzi ƒo ka hã, ne mètrɔ wo o).

Regtest ƒe dɔwɔwɔ blibo, si me activation ƒe gaɖoɖowo ƒuƒoƒewo nukuku [mining] hã le: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (cookie auth)

Le mainnet kple testnet dzi la, Zallet kple Zaino service si wòate ŋu atia la xlẽa **cookie volume si woƒo ƒu**. Woyea cookie sia le boot me; menye backup ƒe taɖodzinu o.

Mègatsɔ Zebra JSON-RPC ade public internet dzi o. Ɖo eŋu tso Compose network me (`zebra:8232`) alo tso host la dzi ko ne ètsɔe de loopback ŋu.

Operator ƒe nudzɔdzɔ siwo wozãna zi geɖe le Zebra le `/ready` megbe:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` nye nukuku RPCs. Gaƒuƒoƒowo [pools] siwo gaxɔa `zcashd` process ɖeka ko la hia Zebra (alo Zakura) na templates, kple gakotoku sia sia si wozãna na coinbase. Kpɔ [Zcash Mining Pools](/using-zcash/zcash-mining-pools) kple [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Ɖe indexer aɖe kpee

Validation kple indexing nye dɔ vovovowo.

### Zaino (nusi Z3 dea)

Zaino xlẽa Zebra eye wòdea lightwalletd-compatible gRPC API kple JSON-RPC proxy. Zallet mehia standalone Zaino container o; wòtsɔ Zaino libraries ɖe eme eye wòɖoa go kple Zebra to JSON-RPC me. Dze standalone Zaino egɔme ne èdi be gakotoku siwo le keklẽ me le gota, explorers, alo ga suewo nanaƒewo nàzã:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Lala va se ɖe esime Zebra async hafi nàtsɔ clients afia Zaino. Bulk indexer si le catch-up me kple fetch concurrency si kɔ la ate ŋu ana Zebra ƒe verifier nɔ blewu; nàtsɔ `fetch_concurrency` nɔ number suewo dome va se ɖe esime indexer la nasɔ ɖe eme.

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

Zaino gRPC nye plaintext h2c le networkwo katã dzi. Tsɔ TLS wu le reverse proxy aɖe gbɔ ne nu aɖe si le host la ƒe gota akpɔ ɖe eŋu. Nudzɔdzɔwo: [Zaino](/zcash-tech/zaino) kple [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Indexer bubuwo (menye Z3 o)

* **lightwalletd** — compact-block server tsɔtsɔe. Wogale eƒe zazã me le afi geɖewo; Zaino nye mɔ si kplɔe ɖo na dɔ sia.
* **Ztreamer** — Zakura-backed indexer kple `CompactTxStreamer` implementation. Menye Z3 service o. Kpɔ [Ztreamer repository](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — gRPC listener si wòate ŋu atia, si le Zebra ƒe me. Z3 mehia e o, eye wòmede e ɖe host la ŋu o.

---

## Vodadawo siwo dzena zi geɖe

**Yɔ gakotoku ƒe methods le Zebra dzi.** `getwalletinfo` kple send RPCs le Zallet (alo gakotoku bubu aɖe) ƒe dɔme, menye consensus node la ƒe dɔme o.

**Dze Zallet egɔme hafi Zebra anɔ `/ready`.** Zallet awɔ restart-loop. Zã `scripts/check-zebra-readiness.sh` le mainnet/testnet dzi.

**Tsɔ regtest `zebra`/`zebra` de mainnet ŋu.** Cookie auth nye mainnet/testnet ƒe default le nɔnɔ aɖe ta.

**Bu Zaino be enye full node.** Zebra (alo Zakura) wɔa validation. Zaino wɔa indexing.

**Ɖe Zaino JSON-RPC alo Zebra indexer gRPC fia le public me.** Endpoint siawo nye loopback alo private network si wòka ɖe dzi ƒe tanya.

**Bu be light wallet sia sia gblɔa Zaino xoxo.** Kpɔ gakotoku la ƒe release yeyee ɖe protocol si wòwɔna wɔnɛ ŋu.

---

## Axawo siwo kplɔe ɖo

* [Z3 Stack](/zcash-tech/z3-stack) — aƒoƒo, ports, volumes, boot ƒe akpa eve
* [Zaino](/zcash-tech/zaino) — indexer ƒe dɔ kple operator ƒe nudzɔdzɔwo
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Migration Guide: zcashd yi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib kple Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## Nuɖoɖowo

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 regtest cookbook (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Wotrɔe egbe:** September 2026
