<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Practical Guide: Zcash Node RPC and Blockchain Indexing

This page is a cookbook for talking to a running Zcash full node over JSON-RPC and for attaching an indexer that light wallets and explorers can query. It is **not** a second install guide.

For how to bring the post-`zcashd` stack up (Zebra + Zallet, optional Zaino, ports, volumes, two-phase boot), use the [Z3 Stack](/zcash-tech/z3-stack) page and the [Z3 repository](https://github.com/ZcashFoundation/z3). For consensus-node background, see [Full Nodes](/zcash-tech/full-nodes) and [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` reached end of life on 18 July 2026. New operator work should target Zebra (or [Zakura](/zcash-tech/zakura-node)) plus a wallet/indexer, not `zcashd`.

---

## TL;DR

* **JSON-RPC** is how operators and wallets ask a node about chain tip, peers, and (on a wallet process) balances. On Z3, Zebra serves node RPC; Zallet serves wallet RPC.
* **Regtest** is the right place to learn the calls. Z3's rpc-router on `http://127.0.0.1:8181` accepts `zebra` / `zebra` and forwards node methods to Zebra and wallet methods to Zallet.
* **Mainnet and testnet** use cookie auth on Zebra. Do not copy the regtest username/password onto a public node.
* **Indexing** is a separate job from validation. Zebra validates. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) serves lightwalletd-compatible gRPC. [Ztreamer](https://github.com/distractedm1nd/ztreamer) is a Zakura-backed indexer; it is not what Z3 ships.
* Zaino JSON-RPC and Zebra's optional indexer gRPC are for loopback or a trusted network. Do not expose them unauthenticated on the public internet.

---

## Which process answers which call

| You want | Talk to | Z3 mainnet host port | Notes |
| --- | --- | --- | --- |
| Chain tip, peers, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie auth |
| Wallet balance, addresses, send | Zallet RPC | 28232 | Separate process; beta software |
| Compact blocks for light wallets | Zaino gRPC | 8137 | Only with `--profile indexer`; plaintext h2c |
| Explorer / faucet JSON-RPC proxy | Zaino JSON-RPC | 8237 | Trusted network only |
| Practice all of the above without sync | Z3 regtest rpc-router | 8181 | Username `zebra` / password `zebra` |

Port matrix and Compose project names: [Z3 Stack](/zcash-tech/z3-stack) and [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Practice on regtest first

From a Z3 checkout, after `./scripts/regtest-init.sh` and `docker compose --env-file .env.regtest up -d`:

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

A healthy `getblockchaininfo` result includes `"blocks"` and an `"upgrades"` map. If curl hangs, the router is not up; if you get `401`, you are hitting Zebra directly instead of the router (direct Zebra on regtest is `29232` and still expects the router credentials unless you changed them).

Full regtest workflow, including mining the activation blocks: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (cookie auth)

On mainnet and testnet, Zallet and the optional Zaino service read a **shared cookie volume**. That cookie is regenerated on boot; it is not a backup target.

Do **not** publish Zebra JSON-RPC to the public internet. Call it from the Compose network (`zebra:8232`) or from the host only if you bound it to loopback.

Typical operator checks after Zebra is `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` are mining RPCs. Pools that still expected a single `zcashd` process need Zebra (or Zakura) for templates plus whatever wallet they use for coinbase. See [Zcash Mining Pools](/using-zcash/zcash-mining-pools) and the [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Attach an indexer

Validation and indexing are different jobs.

### Zaino (what Z3 ships)

Zaino reads Zebra and serves a lightwalletd-compatible gRPC API plus a JSON-RPC proxy. Zallet does **not** need the standalone Zaino container; it embeds Zaino libraries and talks to Zebra over JSON-RPC. Start standalone Zaino when you want external light wallets, explorers, or faucets:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Wait until Zebra is synced before pointing clients at Zaino. A bulk indexer in catch-up with high fetch concurrency can slow Zebra's verifier; keep `fetch_concurrency` in the low single digits until the indexer has caught up.

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

Zaino gRPC is plaintext h2c on all networks. Terminate TLS at a reverse proxy if anything outside the host will connect. Details: [Zaino](/zcash-tech/zaino) and [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Other indexers (not Z3)

* **lightwalletd** — the older compact-block server. Still deployed in the wild; Zaino is the successor path for this role.
* **Ztreamer** — a Zakura-backed indexer and `CompactTxStreamer` implementation. It is not a Z3 service. See the [Ztreamer repository](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — an optional gRPC listener *inside* Zebra. Z3 does not require it and does not publish it to the host.

---

## Common mistakes

**Calling wallet methods on Zebra.** `getwalletinfo` and send RPCs belong to Zallet (or another wallet), not to the consensus node.

**Starting Zallet before Zebra is `/ready`.** Zallet will restart-loop. Use `scripts/check-zebra-readiness.sh` on mainnet/testnet.

**Copying regtest `zebra`/`zebra` onto mainnet.** Cookie auth is the mainnet/testnet default for a reason.

**Treating Zaino as a full node.** Zebra (or Zakura) validates. Zaino indexes.

**Exposing Zaino JSON-RPC or Zebra indexer gRPC publicly.** Those endpoints are for loopback or a trusted private network.

**Assuming every light wallet already speaks Zaino.** Check the wallet's current release against the protocol it actually implements.

---

## Related pages

* [Z3 Stack](/zcash-tech/z3-stack) — install, ports, volumes, two-phase boot
* [Zaino](/zcash-tech/zaino) — indexer role and operator notes
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## Resources

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 regtest cookbook (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Last updated:** September 2026
