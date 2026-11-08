<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axɔlɔ̃"/>
</a>

# Z3 Ƒoƒo

**Z3 Ƒoƒo** nye Zcash Foundation ƒe ɣaɣla dzesi ŋɔŋlɔ ƒe platform si woɖo ɖe nu me: **Zebra** (ɣaɣla dzesi ŋɔŋlɔ blibo) + **Zallet** (ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku [wallet]), kple **Zaino** indexer si wòte ŋu atia. Eyae wole be wòaxɔ teƒe na `zcashd` ƒe dɔwɔwɔ si tɔ ɖe eɖokui ŋu, esi ƒoa gbegbɔgblɔ ɖi [consensus] kple gakotoku ƒo ƒu le binary ɖeka me eye wòva de agbe ƒe nuwuwu le 18 July 2026.

Nɔnɔmetata si wotsɔ de dɔ me nye Docker Compose ƒe dɔa le [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Z3 **menye gbegbɔgblɔ ɖi ƒe client yeye o**. Eyae nye ale si nàtsɔ adzi `zcashd` megbe ƒe ƒoƒo la katã le ɖeka me: Zebra dea ɖoɖonu la ƒe nyateƒe me eye wòkpɔa eŋu, Zallet léa krɔŋlɔwo me eye wònaa gakotoku RPC, eye Zaino (ne wòdi) doa lightwalletd gRPC ƒe mɔ nu.
* `zcashd` ƒoa ɣaɣla dzesi ŋɔŋlɔ kple gakotoku ƒo. Z3 **maa dɔmawo ƒe teƒewo**. Gatrɔƒewo, nukuku gaƒuƒoƒowo, kple ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku ƒe dɔwɔlawo trɔa yi ƒoƒo sia gbɔ ɖe teƒe na be woayi Zebra ɖe eɖokui ŋu.
* Compose ƒe dɔa atọ si me woɖe ɖe mɔ me ate ŋu adu du le host ɖeka dzi: **mainnet**, **testnet**, kple **regtest**.
* Mainnet ƒe sync gbãtɔ xɔa gaƒoƒo **24–72** eye wòhiãa **300 GB** kple eŋu. Regtest dzea agbe le sekondi aɖewo me eye nye teƒe nyuitɔ si nàsrɔ ƒoƒo la le.
* Zallet ƒoa Zaino ƒe indexer ƒe librarywo ɖe eŋu eye wòdoa nu na Zebra to JSON-RPC dzi. Zaino ƒe subɔsubɔ si tɔ ɖe eɖokui ŋu hiã ko ne èdi be endpoint si sɔ kple lightwalletd nanye na gotagakotokuwo.
* Zallet le **beta** me. Tɔtrɔ gãwo ate ŋu ahe be woatu gakotoku la eye woawɔe ake. Mègabu be enye asikplɔ-dzralá ƒe software si blibo na ga gãwo o.

---

## Nu ka tae Z3 li

Le Zcash ƒe agbe ƒe akpa gã aɖe me la, `zcashd` nye nɔnɔmetata ƒe ɣaɣla dzesi ŋɔŋlɔ blibo kple ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku si wotsɔ wɔa dɔ le production me ɖeka pɛ. Ɖoɖo siae nye nu si gatrɔƒewo, gaƒuƒowo, kple asikplɔ-dzraláwo tsɔ wɔa dɔ.

`zcashd` dze le agbe me o azɔ. Gbegbɔgblɔ ɖi va yi [Zebra](/zcash-tech/zebra-full-node) gbɔ (eye azɔ hã yi [Zakura](/zcash-tech/zakura-node) gbɔ). Gakotoku si woƒo ɖe eŋu la va yi [Zallet](https://github.com/zcash/zallet) gbɔ. Gotagakotoku ƒe subɔsubɔ le trɔm tso [lightwalletd](/zcash-tech/lightwallet-nodes) gbɔ yi [Zaino](/zcash-tech/zaino) gbɔ.

Nu atọ siawo le repository vovovowo me, release train vovovowo me, kple config vovovowo me. Z3 nye glue la: image si woɖo ƒe version ɖe afi, health check si wòna gakotoku la nɔ anyi va se ɖe esi ɣaɣla dzesi ŋɔŋlɔ la sync, portwo kple volume vovovo na network vovovowo, kple mɔ si woŋlɔ ɖe agbalẽ me na dɔwɔlawo.

Ŋkɔa nye ecosystem ƒe nuƒoƒo gbɔe — Zebra, Zaino, Zallet — togbɔ be Compose ƒe file si wotsɔ dea dɔ gɔme la dzea Zebra kple Zallet ko. Zaino nye Compose ƒe profile, menye dɔwɔwɔ etɔ si wòle be wòanye o.

---

## Ɖoɖo

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Akpa | Eƒe dɔ le Z3 me | Wòle be wòanye? |
| --- | --- | --- |
| **Zebra** | Wòsync ɖoɖonu la eye wòdea eƒe nyateƒe me, gossip, JSON-RPC, health endpoint | Ee |
| **Zallet** | Ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku. Wòƒoa Zaino ƒe librarywo ɖe eŋu. Wòdoa nu tẽ na Zebra JSON-RPC. Wò**medoa nu na** Zaino ƒe container si tɔ ɖe eɖokui ŋu o | Ee |
| **Zaino** | Indexer si tɔ ɖe eɖokui ŋu. lightwalletd-si sɔ kple gRPC na gotago clientwo, kple JSON-RPC proxy na explorerwo kple ga suewo nanaƒewo | Ao — `--profile indexer` |

Z3 ƒoa image ƒe versionwo ɖe afi le `docker-compose.yml` me. Trɔe kple `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, alo `Z3_ZALLET_IMAGE` ne tag bubu hiã wò.

---

## Ale si esɔ kple zcashd vovoe

| | zcashd | Z3 |
| --- | --- | --- |
| Gbegbɔgblɔ | C++ (Bitcoin ƒe fork) | Rust ƒe subɔsubɔwo, si woɖo le Docker Compose me |
| Dɔwɔwɔ ƒe mɔ | Binary ɖeka: ɣaɣla dzesi ŋɔŋlɔ + gakotoku | ɣaɣla dzesi ŋɔŋlɔ kple gakotoku container vovovowo |
| Gbegbɔgblɔ ɖi | Woɖe le dɔ me (EOS 18 July 2026) | Zebra (alo ɣaɣla dzesi ŋɔŋlɔ bubu si sɔ kplii) |
| Gakotoku | `wallet.dat` si wònɔ eme | Zallet, datadir si woɣa ɣa kple age |
| Gotago clientwo | Zi geɖe nye lightwalletd si le vovo | Zaino profile si wòte ŋu atia |
| Config | `zcash.conf` | File vovovowo na network le `config/<network>/` te kple Compose env ƒe filewo |
| Network geɖewo le host ɖeka dzi | Portwo ƒe dzreɖoƒe sesẽ | Woɖoe nyuie: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ne `zcashd` gakotoku le asiwò hã la, zã ZecHub ƒe [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) kple Zallet ƒe `migrate-zcashd-wallet` command ɖe teƒe na be nàtsɔ `wallet.dat` akɔpi ayi Z3 ƒe volume me.

---

## Networkwo

Z3 nye Compose ƒe dɔwɔwɔ atọ si tɔ ɖe woawo ŋu. Womema port alo volume o.

| Network | Dɔ ƒe ŋkɔ | Zãe na | Sync gbãtɔ | Ga vavã |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Production | Gaƒoƒo 24–72 | Ee |
| **testnet** | `z3-testnet` | Staging le public test network dzi | Gaƒoƒo 2–12 | Ao (test ZEC) |
| **regtest** | `z3-regtest` | Nusrɔ̃ƒe le afi: gaɖoɖowo va enumake, peer aɖeke meli o | Sekondiwo | Ao |

Dɔwɔla yeyeawo wòle be woagɔme le **regtest** dzi, woakpɔ be RPC kple gakotoku ƒe mɔwo le dɔ wɔm, eye woatrɔ ayi testnet alo mainnet.

---

## Host ƒe portwo si wode ɖo gɔme

Network atọ siawo katã wòle be woanɔ machine ɖeka dzi. Asixɔxɔwo siwo le te nye default si woɖe gbe; wòte ŋu atrɔ wo dometɔ ɖe sia ɖe to `Z3_*` env var si sɔ kplii dzi. Matrix si nye tɔgbui la nye [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Subɔsubɔ | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (womeɖe gbe o) |
| Zebra health (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (indexer profile) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (indexer profile) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Le Compose ƒe network la me la, subɔsubɔwo kpɔa wo nɔewo to ŋkɔ me (`zebra`, `zaino`, `zallet`).

---

## Data kple backupwo

| Volume | Nu si wòlé | Wòle be nàwɔ backup? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra ƒe ɖoɖonu ƒe nɔnɔme (~300 GB mainnet) | Wòte ŋu anɔ anyi — wòte ŋu async ake |
| `z3-<network>-zallet` | Gakotoku ƒe database si woɣa ɣa **kple** age ƒe identity si ʋua eŋu | **Ee — esiae nye volume ɖeka pɛ si wòle be nàwɔ backup** |
| `z3-<network>-zaino` | Indexer ƒe nɔnɔme (ne indexer profile ko le dɔ wɔm) | Wòte ŋu anɔ anyi — wòte ŋu atu ake |
| `z3-<network>-cookie` | Zebra RPC ƒe cookie | Ao — wòwɔe ake |

Be nàtsɔ ɖoɖonu ƒe nɔnɔme ayi disk bubu dzi hafi nàdɔe gɔme:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` tsena ƒoƒo la eye wòlé volumewo ɖe asi. Ne nàtsɔ `-v` kpe ɖe eŋu la, wòtu wo eye wòna be wòwɔ full re-sync. Tsɔ `--profile "*"` kpe ɖe eŋu be subɔsubɔ siwo woɖo ɖe profile ŋu (indexer, monitoring) hã natso dɔ me vavã.

---

## Dɔwɔwɔ gɔme

Nu siwo hiã: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` hiã ko na regtest.

### Regtest (mɔ kabakaba si nàkpɔ ƒoƒo la)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Kpɔ [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) na test ƒe commandwo.

### Mainnet (boot ƒe akpa eve)

Zebra le be wòawɔ sync blibo hafi Zallet nasu vi. Ne nàdɔ Zallet gɔme too ŋu la, wòawɔ restart-loop va se ɖe esi `/ready` ananye nyateƒe.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet hã nye mɔ ma ke kple `.env.testnet` kple `./scripts/check-zebra-readiness.sh 18080`.

Tɔtrɔ siwo nèwɔ le `config/<network>/` te la anɔ afi eye woato `git pull` me.

### Profile siwo wòte ŋu atia

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Grafana ƒe port siwo wode ɖo gɔme nye 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Dɔwɔla ƒe nudzodzrowo

* **Image si woɖo ɖe afi.** Z3 metsoa eɖokui yi `:latest` dzi gbɔŋ o. Ɖe pin ɖeka ɖe dzi le tɔtrɔ si woakpɔ me, alo zã `Z3_<SERVICE>_IMAGE`.
* **Container siwo menye root tɔ o.** Woɖee ɖe Linux ƒe capabilitywo ŋu. Health checkwo léa gakotoku la ɖe megbe va se ɖe esi Zebra anɔ dzadzɛ. Restart policy le dɔ wɔm tso gɔmedzedze me.
* **Logwo.** Z3 meɖoa logging driver ƒe version ɖe afi o. Ɖo size ƒe limitwo le Docker daemon ƒe config me, ne menye nenema o la logwo anɔ tsɔm ɖe edzi manɔ nuwuwu o le ɣaɣla dzesi ŋɔŋlɔ si wɔa dɔ 24/7 dzi.
* **P2P.** Mainnet kple testnet ɖea Zebra ƒe P2P port ɖe gbe. Ne nèle NAT megbe la, ɖo `ZEBRA_NETWORK__EXTERNAL_ADDR` ɖe gaɖoƒe si peerwo wòle be woado dial na. Regtest me peer aɖeke meli o.
* **Zaino le ARM dzi.** Upstream Zaino ƒe image nye `linux/amd64` ko. Le Apple Silicon dzi la, wòwɔa dɔ to emulation me ne mètu tso source me o. Zebra kple Zallet nye multi-arch.
* **Host siwo woƒoa ƒu zã.** CPU alo memory ƒe limit aɖeke mele o tso gɔmedzedze me. Tsɔ `deploy.resources.limits` kpe ɖe eŋu le override file me ne box la menye node la tɔ ko o.

Production ƒe checklist kple FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Ame kawoe wòle be woawɔ Z3

**Esɔ na ame siawo**

* Gatrɔƒewo, asikplɔ-dzraláwo, kple nukuku gaƒuƒoƒowo siwo zã `zcashd` abe ɣaɣla dzesi ŋɔŋlɔ-kple-gakotoku ene
* Dɔwɔlawo siwo di ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku RPC si woɖe kpe ɖe Zebra si sync ene ŋu
* Mɔ̃ ƒe ɖoɖoŋlɔlawo siwo hiã mainnet, testnet, kple regtest le wo nɔewo gbɔ
* Ame sia ame si le lightwalletd-si sɔ kple endpoint agbɔm to Zaino profile dzi

**Zi geɖe menye dɔwɔnu nyuitɔ o**

* Zãla siwo hiã be woaɖo kple axɔ ZEC ko — zã gotago gakotoku abe ZODL / Zashi, Zingo, alo YWallet ene
* Ame siwo di be woade ɖoɖonu la ƒe nyateƒe me ko — dɔ Zebra (alo Zakura) ɖe eɖokui ŋu
* Ame siwo di be woasubɔ compact blockwo ko — dɔ Zebra + Zaino, alo Zebra + lightwalletd, manɔ Zallet o

---

## Axɔlɔ̃ siwo sɔ kplii

* [Zebra Ɣaɣla dzesi ŋɔŋlɔ Blibo](/zcash-tech/zebra-full-node) — gbegbɔgblɔ ɖi ƒe ɣaɣla dzesi ŋɔŋlɔ si Z3 ƒoa ɖe eŋu
* [Zaino](/zcash-tech/zaino) — indexer profile si wòte ŋu atia
* [Ɣaɣla dzesi ŋɔŋlɔwo Blibo](/zcash-tech/full-nodes) — Zebra, Zakura, kple zcashd si woɖe le dɔ me
* [Gotagakotoku ƒe Ɣaɣla dzesi ŋɔŋlɔwo](/zcash-tech/lightwallet-nodes) — nu si gotago clientwo doa nu nɛ
* [Zakura Ɣaɣla dzesi ŋɔŋlɔ](/zcash-tech/zakura-node) — ɣaɣla dzesi ŋɔŋlɔ blibo bubu; menye nu si Z3 tsɔa dea dɔ egbe o
* [Trɔtrɔ ƒe Mɔfiame: zcashd yi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Mɔ̃ ƒe Ɖoɖoŋlɔla ƒe Nɔnɔme](/start-here/developer-resources)

---

## Nɔnɔmewo

* [Z3 ƒe repository](https://github.com/ZcashFoundation/z3)
* [Z3 ƒe contract (portwo, volumewo, dɔ ƒe ŋkɔwo)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [The Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [The Zallet Book](https://zcash.github.io/zallet/)
* [Zcash ƒe Community Forum — Z3 ƒe tɔtrɔwo](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — community ƒe control plane si le official Compose ƒe ƒoƒo la dzi (ZecHub Hackathon)
