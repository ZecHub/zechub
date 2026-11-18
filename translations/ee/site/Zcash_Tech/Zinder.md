# Zinder Indexer

Zinder nye self-hosted Zcash indexer si wowɔ le Rust me eye Zcash Foundatione wò do go. Etsɔ ɖoɖonu la xle zi ɖeka tso Zebra alo Zakura full node, etsɔe ɖoɖo ɖeka me, eye wòna ɖoɖo ma na gakotokuwo, applicationwo kple explorerwo geɖe ɖe ɣeyiɣi ɖeka me. Light wallet siwo li la ate ŋu akpɔe to lightwalletd-compatible adapter dzi.

> **Zinder nye alpha.** Eƒe README ŋlɔ be native API, lightwalletd ƒe compatibility surface, storage layoutwo kple deployment topology atrɔ, eye tagged release menye stability promise o. Ɖo version siwo le wo ŋu kplikplikpli, eye bu be breaking upgradewo ava.

## TL;DR

* **Zebra** alo **Zakura** ɖo ɖoɖonu la ƒe nyawo. **Zinder** ɖo nu si node la le si eye wònae na clientwo.
* Mɔ eve siwo wòato: Zinder ƒe ŋutɔ ƒe `WalletQuery` gRPC API, kple adapter bubu si ƒoa nu be lightwalletd ƒe `CompactTxStreamer` protocol, ale be gakotoku siwo woɖo ɖe lightwalletd ŋu ate ŋu akpɔe, esi wòatrɔ kɔda aɖeke o.
* Xleɖoɖo ɖesiaɖe dze ɖoɖonu ƒe nɔnɔme ɖeka ŋu ("epoch"), ale be sync batch ɖeka meɖoa data tso ɖoɖonu ƒe ta siwo wɔa dɔ to vovo o. Kɔda kple ɣaɣla scanning le gakotoku la me.
* Wotsɔe wɔ na operator ɖeka si wɔa node ɖeka eye wòna data na amewo geɖe. Public endpointwo nayi TLS, authentication kple rate limit si wò ɖo la megbe.
* Releasewo va kabakaba (0.7.0 tso 0.12.0 me le November 10 kple 14, 2026 dome), eye wo dometɔ geɖe trɔ nu siwo gbɔna. Xle changelog hafi wòate ŋu atrɔ version.

## Zinder ƒe nɔƒe

Light walletwo meƒoa nu kple full node ɖe edzi o. Wobiae indexer be wòana compact blockwo, tree statewo kple gaɖoɖo data (kpɔ [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). Zcash ecosystem la le indexer geɖe siwo ate ŋu awɔ esia:

| Indexer | Gbe | Maintainer | Eƒoa nu kple | Nɔnɔmetata |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcash community | Zebra alo zcashd | Light wallet server gbãtɔ |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra alo zcashd | Indexer profile si wòate ŋu atsɔ le Z3 stack me |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Embedded Zakura node | Kpɔ [Zaino vs Ztreamer benchmark](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 alo Zakura 1.8.6 (archive node) | Alpha. Native API kple lightwalletd adapter, eye explorer xleɖoɖo si wòate ŋu atsɔ |

Zinder ƒe nufiafia ɖe eme kplikplikpli be ɣeyiɣi kae nye esi wòanye nyuie: esi ɖoɖonu la ŋu kpɔkpɔ naɖe wallet process ɖeka ŋu o, esi wòana data na independent consumer geɖe, alo esi wòate ŋu asubɔ le wallet aɖeke ƒe kɔda ŋu o. Ne wallet ɖeka kple indexer la kpe ɖe ŋu vevie la, embedded indexer ate ŋu awɔe bɔbɔe wu; eye consumer si dia nu si node la le si xoxo ko la ate ŋu atsɔ Zebra ƒe RPC tɔxɛ.

## Ale si wowɔe

Zinder ma dɔ la ɖe process vovowo me, ɖe dɔ ɖeka na wo ɖe sia ɖe:

| Runtime | Dɔ |
|:--|:--|
| `zinder-ingest` | Eya ɖeka koe ŋlɔa canonical chain store (RocksDB) me. Eɖoa node la yome, eɖoa reorgwo, eye wòɖoa mempool state si le fifia |
| `zinder-projector` | Eya ɖeka koe ŋlɔa wallet store me. Ewɔa ɖoɖonu ƒe nɔnɔme si wallet kpɔa eye eɖoa yome |
| `zinder-query` | Ena native `WalletQuery` gRPC API |
| `zinder-compat-lightwalletd` | Ena lightwalletd ƒe `CompactTxStreamer` API le data ma dzi |

Explorer plane si wòate ŋu atsɔ (`zinder-explorer` kple `ExplorerQuery`) na block ƒe nɔnɔmetata, gaɖoɖo ƒe nɔnɔmetata, mempool nɔnɔmetata kple search; eye adapter si wòate ŋu atsɔ na CipherScan explorer ƒe REST kple WebSocket API. Wo eve siawo mele release imagewo me o.

Runtime ɖesiaɖe ɖea `/healthz`, `/readyz` kple `/metrics`. Xleɖoɖo runtimewo gblɔ be wo ready vie esi woƒe ɖoɖonu store kple wallet store ƒe kopiwo ɖo ɖoɖonu ƒe nɔnɔme ma ŋu pɛpɛpɛ.

## Mɔ siwo wòate ŋu akpɔe

* **Light wallet siwo xoxo li** ɖoa woƒe lightwalletd integration, eye wotsɔe ɖo `zinder-compat-lightwalletd` ŋu. Zinder ƒe nufiafia ma protocol compatibility ɖe support gbɔ, eye gakoroku si wòɖo ŋkɔ le eŋu la bu abe esi wotsɔ eƒe release si li fifia do end-to-end certification me ko hafi woaxɔe be wòaxɔ support. Release 0.10.0 ɖo `GetLightdInfo` protocol version field la, ale be Zingo ate ŋu async.
* **Native clientwo** bia `zinder-query` be woaxle data si dze chain nɔnɔme ɖeka ŋu, compact blockwo, ɖoɖonu kple mempool event streamwo, eye woaɖo gaɖoɖo ƒe megbeɖoɖowo kple rejection reason siwo dze typed.
* **Rust applicationwo** zãa `zinder-client` crate, remote-first SDK si ƒoa nu kple `zinder-query` eye meɖoa storage stack la ɖe eŋu o.
* **Explorerwo kple backendwo** tsɔa wallet xleɖoɖowo kpe ɖe `ExplorerQuery` plane si wòate ŋu atsɔ ŋu.

## Ale si wòatsɔ awɔe dɔ

Upstream ƒe quickstart ɖoa node ɖe dɔ me kple [Z3 stack](/zcash-tech/z3-stack), eye emegbe Zinder kple Docker Compose tso Zinder checkout la me:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Env file siwo nye Mainnet tɔ kple siwo nye Zakura node (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) tɔ le egbɔ. Tso 0.11.0 va yi la, Compose file la mekpɔ be Z3 koe wòatsɔ o: env file la dze be network, cookie volume kple RPC address si nye node la tɔ.

Host port siwo wòɖo na (Testnet kɔna 10000):

| Service | Mainnet | Testnet |
|:--|:--|:--|
| Native `WalletQuery` gRPC | 9102 | 19102 |
| lightwalletd-compatible gRPC | 9067 | 19067 |
| Readiness: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Wallet port eveawo kpe ɖe loopback ŋu. Wòate ŋu akpɔ wo kple:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Mɔ bubu siwo wòate ŋu atsɔ ade dɔ me:

* **Release imagewo** le `ghcr.io/zcashfoundation/` dzi: runtime eneawo, kple `zinder-wallet-serving` (ingest, projector kple native query le container ɖeka me na host siwo ate ŋu atsɔ volume ɖeka ade container ɖeka me; lightwalletd adapter mele eme o) kple `zinder-canonical-runtime` (ingest koe).
* **Linux binaries** na x86-64 (dia x86-64-v3 CPU) kple AArch64, kple glibc 2.34 alo esi wòdo ŋgɔ. Debian 12 nye baseline si wotsɔ do certification me. Release ɖesiaɖe na SBOM kple SLSA provenance si woɖe signed.

### Nu si node la dze be wòana

* **Archive node.** Tso 0.11.0 va yi la, `zinder-ingest` meɖoa dɔgbedodo be wòatsi le pruned node dzi o.
* Zebra **7.0.0** alo Zakura **1.8.6**. Esiwo nye node version eve si release lanewo ɖo be woaxɔ certification.
* Na `zinder-wallet-serving` image la, node la ƒe **indexer gRPC endpoint** (`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra ƒe `indexer_listen_addr`, port 8155 le Mainnet). Zakura indexer si le non-loopback address dzi dia mutual TLS, si Zinder xɔ tso 0.11.0 va yi.

### Mainnet ƒe kɔkɔ

Tso runbook si zãa wallet serving me:

* Ɖo **8 GB memory** alo esi wòdo ŋgɔ. Esi wowɔ sukuu: ingest kɔ 2.6 GiB; projector kɔ 2.7 GiB esi wòle dɔ wɔm; query kɔ 1.4 GiB va se ɖe.
* Ɖe **130 GB** sue le volume la dzi ne Mainnet wallet store la wɔ vɔ.
* Mainnet build ɖeka si wotsɔ tso genesis me wɔe ɖe woƒe sukuu me la xɔ **ƒeɣi ene** na chain store (staging kɔ 310 GB va se ɖe) eye **ƒeɣi eve wu** na wallet store. Construction deadline siwo wotsɔ do release me dze Testnet ko: tsɔ wo ɖo 24 h kple 12 h alo esi wòdo ŋgɔ na Mainnet, alo build la aga start gɔme eye wòmagava vɔ o.

## Release notes siwo nyo be wònya

| Version | Date | Nu si trɔ na operatorwo |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Default reorg window kɔ 1000 block, esi nye depth si Zebra 7 kple Zakura ŋlɔa blockwo. Esia meɖea le eme o: release xoxoawo mate ŋu axɔ store siwo kɔ la o |
| 0.9.0 | 2026-11-12 | Image yeye `zinder-wallet-serving` kple `zinder-canonical-runtime` |
| 0.10.0 | 2026-11-13 | **Release gbãtɔ si dzea NU7 blockwo me.** 0.9.0 kple siwo va do ŋgɔ wotsina le NU7 block gbãtɔ ŋu. Native protocol revision 8: update ingest kple query ɖeka, eye native clientwo kple wo |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 ɖo certification kple Zebra 7.0.0; mutual TLS na node la ƒe indexer; pruned nodewo meɖoa dɔ o. Wodo 0.11.0 go abe crate ko ene, elabena tsɔ 0.11.1 ade dɔ me |
| 0.12.0 | 2026-11-14 | Readiness kple shutdown ƒe nɔnɔme ɖo; explorer replay ɖea dɔ kabakaba eye wòɖea asi le dɔ wɔwɔ ŋu ne disk la ƒe nɔnɔme gbegbe |

## Nu siwo woɖoa nu siwo vɔ̃

**Bubu be nye software si wotsɔ ade production me.** Project la gblɔ be enye alpha. Compose deployment si woɖo nyuie le woƒe dɔme la, woƒe nya me, "menye production certification si woɖo kpli lae o".

**Tsɔe ɖo pruned node ŋu.** Ingest trɔ le startup. Zã archive Zebra alo Zakura node.

**Ɖe gRPC portwo le net dzi tẽ.** Wallet port eveawo kpe ɖe loopback ŋu le nu ta. Ɖo TLS, authentication, rate limits kple quotas le proxy si wò kpɔa la me hafi wòɖe wo le internet dzi.

**Trɔ runtime ɖeka ɖe ɖeka.** Release geɖe trɔa native protocol revision alo store ƒe nɔnɔme. Trɔ Zinder services la ɖekae, eye trɔ native clientwo le ɣeyiɣi ma me.

**Bubu be wallet kple protocol la ƒe support le.** lightwalletd adapter ƒoa nu kple protocol la, gake Zinder gblɔ be wòana wallet si wotsɔ na ŋkɔ support ko ne wotsɔ wallet la ƒe release si li fifia de certification me tso ta yi ta.

## Nyatakakawo siwo kpe ɖe eŋu

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — nu si light wallet server wɔa kple nu si wòate ŋu akpɔ
* [Zaino](/zcash-tech/zaino) — Zingo Labs ƒe Rust indexer
* [Indexer Benchmark: Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 Stack](/zcash-tech/z3-stack) — Zebra + Zallet, node ɖoɖo si Zinder ƒe quickstart zãa
* [Zebra Full Node](/zcash-tech/zebra-full-node) kple [Zakura Node](/zcash-tech/zakura-node) — node eve siwo Zinder ɖoa certification na

## Afikae nyeate ŋu anya nu bubuwo?

* [Zinder GitHub repository](https://github.com/ZcashFoundation/zinder)
* [Zinder releases](https://github.com/ZcashFoundation/zinder/releases) kple [changelog](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [What Zinder is and is not](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Deploying on a VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) kple [wallet-serving image](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md) runbooks

**Wotsɔe trɔ mlɔetɔ:** November 2026
