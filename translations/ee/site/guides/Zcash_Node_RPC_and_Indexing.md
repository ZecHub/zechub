<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mɔfiame Nyuitɔ: Zcash Node RPC kple Blockchain Indexing

Axa sia nye nuɖagbalẽ na nuƒoƒo kple Zcash full node si le dɔ wɔm to JSON-RPC dzi kple na indexer si kekeli gakotokuwo kple explorers ateŋu abia. Enye **menye** install guide evelia o.

Le alesi woatsɔ post-`zcashd` stack up (Zebra + Zallet, Zaino, melidzeƒewo, volumes, eve-phase boot), zã la [Z3 Stack ƒe ƒuƒoƒo](/zcash-tech/z3-stack) axa kple [Z3 ƒe nudzraɖoƒe](https://github.com/ZcashFoundation/z3). Ne èdi consensus-node ƒe megbenyawo la, kpɔ [Nodes Blibowo](/zcash-tech/full-nodes) kple [Zebra Node Bliboe](/zcash-tech/zebra-full-node).

`zcashd` reached end of life on 18 July 2026. Ele be dɔwɔƒe yeyewo ƒe dɔ naɖo taɖodzinu na Zebra (alo [Zakura](/zcash-tech/zakura-node)) kpe ɖe gakotoku/indexer ŋu, menye `zcashd`.

---

## TL;DR

* **JSON-RPC** nye alesi dɔwɔlawo kple gakotokuwo biaa node tso kɔsɔkɔsɔ ƒe aɖaŋuɖoɖo, hatiwo, kple (le gakotoku ƒe ɖoɖo aɖe dzi) dadasɔwo ŋu. Le Z3 dzi la, Zebra subɔa node RPC; Zallet subɔa gakotoku RPC.
* **Regtest** nye teƒe nyuitɔ si nàsrɔ̃ kaƒoƒoawo le. Z3 ƒe rpc-router le edzi `http://127.0.0.1:8181` lɔ̃ ɖe edzi `zebra` / `zebra` eye wòɖoa node mɔnuwo ɖe Zebra eye wòɖoa gakotoku mɔnuwo ɖe Zallet.
* **Mainnet kple testnet** zãa cookie auth le Zebra. Mègawɔ regtest zãla ƒe ŋkɔ/nyagbe ƒe kɔpi ɖe dutoƒo node dzi o.
* **Indexing** nye dɔ si to vovo tso kpeɖodzinana gbɔ. Zebra ɖo kpe edzi. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) subɔa gRPC lightwalletd-compatible. [Ztreamer](https://github.com/distractedm1nd/ztreamer) nye indexer Zakura-backed; menye nusi Z3 ɖona ɖe amewoe o.
* Zaino JSON-RPC kple Zebra's tiatiawɔblɔɖe indexer gRPC nye na loopback alo network si dzi woka ɖo. Mègaɖe wo ɖe go le dutoƒo internet dzi evɔ womeɖo kpe wo dzi o.

---

## Dɔwɔwɔ kae ɖoa yɔyɔ ka ŋu

| Èdi | Ƒo nu kple | Z3 mainnet ƒe amedzroxɔƒe ƒe ʋɔtru | De dzesii |
| --- | --- | --- | --- |
| Kɔsɔkɔsɔ ƒe aɖaŋuɖoɖo, hatiwo, `getblockchaininfo` | Zebra JSON-RPC ƒe ŋkɔ | 8232 | Kuki ƒe nyateƒetoto |
| Gakotoku ƒe ga si susɔ, adrɛswo, ɖo ɖa | Zallet RPC | 28232 | Dɔwɔwɔ ɖe vovo; beta kɔmpiutadziɖoɖowo |
| Block siwo le sue na gakotoku siwo me kɔ | Zaino gRPC ƒe ƒuƒoƒo | 8137 | Ðeko `--profile indexer`; nuŋɔŋlɔ si me kɔ h2c |
| Explorer / faucet JSON-RPC teƒenɔla | Zaino JSON-RPC ƒe dɔwɔwɔ | 8237 | Network si dzi woka ɖo ɖeɖeko |
| Srɔ̃ nya siwo katã míeyɔ ɖe etame la wɔwɔ ɖeka mawɔmawɔe | Z3 regtest rpc-mɔfianu | 8181 | Zãla ƒe ŋkɔ `zebra` / safuinya `zebra` |

Port matrix kple Compose dɔa ƒe ŋkɔwo: [Z3 Stack ƒe ƒuƒoƒo](/zcash-tech/z3-stack) kple [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Srɔ̃e le regtest ŋu gbã

Tso Z3 ƒe gaxɔgbalẽvi aɖe dzi, le ema megbe `./scripts/regtest-init.sh` kple `docker compose --env-file .env.regtest up -d`:

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

Ame si le lãmesẽ me `getblockchaininfo` emetsonua lɔ `"blocks"` kple an `"upgrades"` anyigbatata. Ne curl la le xɔxlɔ̃m la, router la mele dzi o; ne èxɔe `401`, èle Zebra ƒom tẽ ɖe router la teƒe (direct Zebra on regtest nye `29232` eye wògakpɔa mɔ na router ƒe ɖaseɖigbalẽwo negbe ɖe nètrɔ wo hafi).

Full regtest dɔwɔwɔ, si me tomenukuku le dɔwɔwɔ ƒe mɔxenuwo hã le: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (kuki ƒe kpeɖodzi)

Le mainnet kple testnet dzi la, Zallet kple Zaino subɔsubɔdɔ si woate ŋu atia xlẽa **kuki ƒe agbɔsɔsɔme si woama**. Wogbugbɔa cookie ma wɔna le boot dzi; menye taɖodzinu si woatsɔ adzrae ɖoe wònye o.

Mèga **mègado** Zebra JSON-RPC ɖe dutoƒo internet dzi o. Yɔe tso Compose network (`zebra:8232`) alo tso host la gbɔ ne èblae ɖe loopback me ko.

Typical operator checks le Zebra megbe nye `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` nye tomenukuƒewo ƒe RPCwo. Ta siwo gakpɔtɔ nɔ mɔ kpɔm na ɖeka `zcashd` process hiã Zebra (alo Zakura) na templates kpe ɖe gakotoku ɖesiaɖe si wozãna na coinbase ŋu. Kpɔ [Zcash Tomenukuƒewo](/using-zcash/zcash-mining-pools) kple.. [ʋuʋu yi teƒe bubuwo ŋuti mɔfiame](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Tsɔ indexer aɖe kpe ɖe eŋu

Validation kple indexing nye dɔ vovovowo.

### Zaino (nusi Z3 ɖona ɖa)

Zaino xlẽa Zebra eye wòsubɔa gRPC API lightwalletd-compatible kpe ɖe JSON-RPC teƒenɔla ŋu. Zallet **mehiã** Zaino nugoe si le eɖokui si o; etsɔa Zaino agbalẽdzraɖoƒewo dea eme eye wòƒoa nu kple Zebra to JSON-RPC dzi. Dze Zaino si le eɖokui si gɔme ne èdi gotagome kekeli gakotokuwo, anyigbayeyedila, alo pɔmpiwo:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Lala vaseɖe esime Zebra nawɔ ɖeka hafi nàfia asi asisiwo ɖe Zaino. Bulk indexer le catch-up kple fetch concurrency gã ate ŋu ana Zebra's verifier nawɔ blewu; le aɖe asi `fetch_concurrency` le xexlẽdzesi ɖeka siwo le bɔbɔe me vaseɖe esime indexer la lée.

Regtest gRPC (nuŋɔŋlɔ gbadzaa; melidzeƒe `28137`):

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

Zaino gRPC nye plaintext h2c le networkwo katã dzi. Nu TLS nu le reverse proxy ne nane si le host la godo aƒo ka. Emenuwo: [Zaino](/zcash-tech/zaino) kple [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Indexer bubuwo (menye Z3 o)

* **lightwalletd** — compact-block dɔdzikpɔla xoxoa. Wogakpɔtɔ le dɔ wɔm le gbe me; Zaino ye nye mɔ si axɔ ɖe akpa sia teƒe.
* **Ztreamer** — Zakura-backed na indexer kple `CompactTxStreamer` edziwɔwɔ. Menye Z3 subɔsubɔdɔe wònye o. Kpɔ nya si [Ztreamer nudzraɖoƒe](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — gRPC toɖola si woate ŋu atia *me* Zebra. Z3 mebiae o eye metaae na amedzroxɔla o.

---

## Vodada siwo bɔ

**Yɔyɔ gakotoku mɔnuwo le Zebra.** `getwalletinfo` eye woaɖo RPCwo ɖa la nye Zallet (alo gakotoku bubu) tɔ, ke menye nusi dzi woda asi ɖo ƒe node la tɔ o.

** Zallet gɔmedzedze hafi Zebra nazu `/ready`.** Zallet agbugbɔ adze-loop gɔme. Zã `scripts/check-zebra-readiness.sh` le mainnet/testnet dzi.

**Ele regtest ƒe kɔpi wɔm `zebra`/`zebra` onto mainnet.** Kuki ƒe nyateƒetoto nye mainnet/testnet ƒe gɔmedzedze le susu aɖe ta.

**Nuwɔwɔ ɖe Zaino ŋu abe node blibo ene.** Zebra (alo Zakura) da asi ɖe edzi. Zaino ƒe xexlẽdzesiwo.

**Zaino JSON-RPC alo Zebra indexer gRPC ɖeɖe ɖe go le dutoƒo.** Nuwuƒe mawo nye na loopback alo ame ŋutɔ ƒe network si dzi woka ɖo.

**Ne míetsɔe be gakotoku ɖesiaɖe si me kɔ la doa Zaino.** Kpɔ gakotokua ƒe dodo fifia ɖa le ɖoɖo si wòwɔna ŋutɔŋutɔ nu.

---

## Axa siwo do ƒome kplii

* [Z3 Stack ƒe ƒuƒoƒo](/zcash-tech/z3-stack) — install, melidzeƒewo, volumes, eve-fase boot
* [Zaino](/zcash-tech/zaino) — indexer ƒe akpa kple dɔwɔla ƒe nuŋlɔɖiwo
* [Nodes Blibowo](/zcash-tech/full-nodes)
* [Zebra Node Bliboe](/zcash-tech/zebra-full-node)
* [Lightwallet ƒe Nodes](/zcash-tech/lightwallet-nodes)
* [Ʋuʋu ƒe Mɔfiame: zcashd yi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib kple Zaino ƒe Nufiame](/guides/zingolib-and-zaino-tutorial)

## Nunɔamesiwo

* [Z3 ƒe nudzraɖoƒe](https://github.com/ZcashFoundation/z3)
* [Z3 regtest nuɖagbalẽ (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 Nyabiasewo](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet ƒe Agbalẽ](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Wowɔ yeyee zi mamlɛtɔ:** September 2026
