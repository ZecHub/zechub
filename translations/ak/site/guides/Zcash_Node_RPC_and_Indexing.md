<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Akwankyerɛ a Ɛyɛ Mfaso: Zcash Node RPC ne Blockchain Indexing

Saa krataafa yi yɛ aduannoa nwoma a wɔde kasa kyerɛ Zcash full node a ɛretu mmirika wɔ JSON-RPC so na wɔde indexer a kanea sika kotokuo ne explorers bɛtumi abisa ho asɛm abata ho. Ɛyɛ **ɛnyɛ** instɔl akwankyerɛ a ɛto so abien.

Sɛnea ɛbɛyɛ a wɔde post-`zcashd` stack up (Zebra + Zallet, Zaino, hyɛn gyinabea, volumes, abien-fase boot), fa di dwuma [Z3 Stack na ɛyɛ](/zcash-tech/z3-stack) kratafa ne nea [Z3 adekorabea](https://github.com/ZcashFoundation/z3). Sɛ wopɛ consensus-node background a, hwɛ [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes) ne [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node).

`zcashd` reached end of life on 18 July 2026. Ɛsɛ sɛ adwumayɛfoɔ adwuma foforɔ de wɔn ani si Zebra (anaasɛ [Zakura](/zcash-tech/zakura-node)) ne sika kotoku/indexer, ɛnyɛ `zcashd`.

---

## TL;DR

* **JSON-RPC** yɛ sɛnea adwumayɛfo ne sika kotoku bisa node bi fa nkɔnsɔnkɔnsɔn tip, atipɛnfo, ne (wɔ sika kotoku nhyehyɛe bi so) kari pɛ ho. Wɔ Z3 so no, Zebra som node RPC; Zallet som sika kotoku RPC.
* **Regtest** yɛ beaeɛ a ɛfata a wobɛsua frɛ no. Z3 no rpc-router no yɛ adwuma `http://127.0.0.1:8181` gye tom `zebra` / `zebra` na ɔde node akwan kɔ Zebra ne wallet akwan kɔ Zallet.
* **Mainnet ne testnet** de cookie auth di dwuma wɔ Zebra. Mfa regtest dwumadie din/asɛmfua no nkɔ ɔmanfoɔ node so.
* **Indexing** yɛ adwuma a ɛyɛ soronko wɔ validation ho. Zebra gye tom sɛ ɛyɛ nokware. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) som gRPC lightwalletd-compatible. [Ztreamer](https://github.com/distractedm1nd/ztreamer) yɛ indexer Zakura-backed; ɛnyɛ nea Z3 de mena.
* Zaino JSON-RPC ne Zebra's indexer gRPC a wɔpaw no yɛ loopback anaa ntwamutam a wogye di. Mma nnyi wɔn ho ntama a wonni ho adanse wɔ ɔmanfo intanɛt so.

---

## Adeyɛ bɛn na ɛbua ɔfrɛ bɛn

| Wopɛ | Kasa kyerɛ | Z3 mainnet host hyɛn gyinabea | Nsɛm a Wɔahyɛ no Nsow |
| --- | --- | --- | --- |
| Nkɔnsɔnkɔnsɔn tip, atipɛnfo, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Kuki a ɛyɛ nokware |
| Wallet balance, address ahorow, soma | Zallet RPC na ɔkyerɛwee | 28232 | Adeyɛ a ɛtetew mu; beta softwea a wɔde yɛ adwuma |
| Compact blocks a wɔde yɛ sika kotoku a emu yɛ hare | Zaino gRPC na ɔkyerɛwee | 8137 | Nkutoo ne `--profile indexer`; nsɛm a wɔakyerɛw no pefee h2c |
| Explorer / faucet JSON-RPC ananmusifoɔ | Zaino JSON-RPC na ɔkyerɛwee | 8237 | Network a wogye di nkutoo |
| Fa nea yɛaka ho asɛm wɔ atifi hɔ no nyinaa di dwuma a ɛnyɛ sync | Z3 regtest rpc-router na ɛyɛ adwuma | 8181 | Edin a ɔde di dwuma `zebra` / paswɛde `zebra` |

Port matrix ne Compose adwuma no din: [Z3 Stack na ɛyɛ](/zcash-tech/z3-stack) ne [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Di kan yɛ regtest ho adesua

Efi Z3 checkout bi so, akyi `./scripts/regtest-init.sh` ne `docker compose --env-file .env.regtest up -d`:

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

A apɔwmuden `getblockchaininfo` nea efi mu ba no bi ne `"blocks"` ne an `"upgrades"` map. Sɛ curl sɛn a, router no nkɔ soro; sɛ wunya a `401`, worebɔ Zebra tẽẽ sen sɛ wobɛbɔ router no (direct Zebra on regtest yɛ `29232` na ɔda so ara hwɛ kwan sɛ router credentials no gye sɛ woasesa).

Regtest adwumayɛ nhyehyɛe a edi mũ, a mining activation blocks no ka ho: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (kuki ho nimdeɛ)

Wɔ mainnet ne testnet so no, Zallet ne Zaino dwumadie a wopɛ no kenkan **kuki dodoɔ a wɔakyɛ**. Saa kuki no, wɔsan yɛ no foforo wɔ boot so; ɛnyɛ backup target.

Mma **nnyɛ** Zebra JSON-RPC tintim wɔ ɔmanfoɔ intanɛt so. Frɛ no fi Compose network (`zebra:8232`) anaasɛ efi host no so sɛ wokyekyere no kɔ loopback nkutoo a.

Typical operator checks akyi Zebra yɛ `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` yɛ RPC ahorow a wotu fagude. Pools a na wɔda so ara hwɛ kwan sɛ wobenya biako `zcashd` process hia Zebra (anaa Zakura) ma templates plus sika kotoku biara a wɔde di dwuma ma coinbase. Hwɛ [Zcash Mining Atare a Wɔde Tu Fam](/using-zcash/zcash-mining-pools) ne nea [atutra ho akwankyerɛ](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Fa indexer bi bata ho

Validation ne indexing yɛ nnwuma ahorow.

### Zaino (nea Z3 de hyɛn mu)

Zaino kenkan Zebra na ɛsom gRPC API a lightwalletd-compatible a JSON-RPC proxy ka ho. Zallet **nhia** Zaino ahina a egyina hɔ ma no; ɛde Zaino nhomakorabea ahorow hyɛ mu na ɛne Zebra kasa wɔ JSON-RPC so. Fi ase standalone Zaino bere a wopɛ abɔnten hann sika kotoku, explorers, anaa faucets:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Twɛn kosi sɛ Zebra bɛyɛ sync ansa na woatwe adwene asi clients so wɔ Zaino. Bulk indexer a ɛwɔ catch-up a ɛwɔ fetch concurrency a ɛkorɔn betumi ama Zebra's verifier no ayɛ brɛoo; kora `fetch_concurrency` wɔ digit biako a ɛba fam no mu kosi sɛ indexer no bɛkyere.

Regtest gRPC (nsɛm a wɔakyerɛw no pefee; hyɛn gyinabea `28137`):

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

Zaino gRPC yɛ plaintext h2c wɔ ntwamutam nyinaa so. Twa TLS wɔ reverse proxy so sɛ biribiara a ɛwɔ host no akyi bɛka a. Nkyerɛmu: [Zaino](/zcash-tech/zaino) ne [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Indexer afoforo (ɛnyɛ Z3)

* **lightwalletd** — compact-block server dedaw no. Wɔda so ara de wɔn kɔ wuram; Zaino ne ɔkwan a ɔbɛfa so adi saa dwumadie yi akyi.
* **Ztreamer** — indexer a Zakura-backed ne `CompactTxStreamer` dwumadie a wɔde bedi dwuma. Ɛnyɛ Z3 som adwuma. Hwɛ sɛnea [Ztreamer akoraeɛ](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — gRPC atiefoɔ a wɔpaw *mu* Zebra. Z3 nhwehwɛ na ɛntintim mma host no.

---

## Mfomso ahorow a wɔtaa di

**Frɛ sika kotoku akwan wɔ Zebra.** `getwalletinfo` na send RPCs yɛ Zallet (anaasɛ sika kotoku foforo) dea, ɛnyɛ consensus node no dea.

**Yɛbɛhyɛ Zallet ase ansa na Zebra ayɛ `/ready`.** Zallet bɛsan ahyɛ aseɛ-loop. Fa di dwuma `scripts/check-zebra-readiness.sh` wɔ mainnet/testnet so.

**Wɔrekyerɛw regtest `zebra`/`zebra` onto mainnet.** Kuki auth yɛ mainnet/testnet default esiane biribi nti.

**Zaino a wɔde di dwuma sɛ node a edi mũ.** Zebra (anaa Zakura) di ho adanse. Zaino index ahorow a ɛwɔ hɔ.

**Zaino JSON-RPC anaa Zebra indexer gRPC a wɔreda no adi wɔ baguam.** Saa endpoints no yɛ loopback anaa kokoam ntwamutam a wogye di.

**Sɛ yɛfa no sɛ sika kotoku biara a ɛyɛ hann kasa Zaino.** Hwɛ sika kotoku no mprempren a wɔayi no adi no toto protocol a ɛde di dwuma ankasa no ho.

---

## Nkratafa a ɛfa ho

* [Z3 Stack na ɛyɛ](/zcash-tech/z3-stack) — instɔl, hyɛn gyinabea, volumes, abien-fase boot
* [Zaino](/zcash-tech/zaino) — indexer dwumadie ne operator nsɛm a wɔakyerɛw
* [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes)
* [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes a Wɔde Di Dwuma](/zcash-tech/lightwallet-nodes)
* [Akwankyerɛ a ɛfa atutra ho: zcashd kɔ Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib ne Zaino Nkyerɛkyerɛmu](/guides/zingolib-and-zaino-tutorial)

## Akadeɛ

* [Z3 adekorabea](https://github.com/ZcashFoundation/z3)
* [Z3 regtest aduannoa nhoma (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 Nsɛm a Wɔtaa bisa](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Nhoma no](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Wɔyɛɛ no foforo nea etwa to:** September 2026
