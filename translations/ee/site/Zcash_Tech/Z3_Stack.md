<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

**Z3 Stack** enye nye Zcash Foundation ƒe ɣaɣla dzesi ŋɔŋlɔ platform si wotsɔ wɔ ɖoɖo me: **Zebra** (ɣaɣla dzesi ŋɔŋlɔ blibo) + **Zallet** (ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku), eye **Zaino** indexer hã ate ŋu anɔ eme. Esi wotsɔ ɖoɖo be wòaxɔ `zcashd` si le eɖokui me teƒe, si ƒo gbegbɔgblɔ ɖi kple gakotoku ƒu ƒe binary ɖeka me, eye wòƒe agbe wu le 18 July 2026.

Nuŋɔŋlɔ si wotsɔ wɔa abe ɖoɖo ƒe kpɔɖeŋu ene nye Docker Compose project si le [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Nɔnɔme, 14 November 2026: pin siwo wowɔ wò na ŋgɔ wu NU7.** Z3 ƒe `docker-compose.yml` megatrɔ zi mamlɛ 10 August 2026. Egale ŋu pin `zfnd/zebra:6.2.3` kple `zodlinc/zallet:v0.1.0-beta.1`, siwo dze agbagba abe `zallet-zaino` binary ene. [NU7](NU7.md) dze agbagba le Mainnet le gaɖoɖowo ƒuƒoƒe 3,543,405 dzi le 6 November 2026, eye Zebra 7.0.0 alo si wu ko nye esi kplɔe. 6.x Zebra liana ɖoɖo xoxowo eye wòatsɔe adzo le ɖoɖonu nyateƒe la me. Zallet v0.1.0-beta.4, release gbãtɔ si kplɔ NU7, megatsɔa `zallet-zaino` o. Kpɔ repo la be nàkpɔ pin yeyeawo hafi nàtsɔ eƒe dɔ wɔ. Ne ètrɔa images la le wò ŋutɔ si, de dzesii be Zallet ƒe `zebra` backend si susɔ la xɔa Zebra ƒe nɔnɔme directory la tẽ, eya ta Zallet ele be wòawɔ dɔ le host ɖeka dzi kple mɔɖeɖe ɖe directory ma ŋu ([Zallet](Zallet.md)).

---

## TL;DR

* Z3 **menye gbegbɔgblɔ ɖi client yeye o**. Esi wotsɔ wɔa be nàzã post-`zcashd` stack la ƒu: Zebra kpɔa ɖoɖonu la, Zallet dzra kpewo ɖe eme eye wòna gakotoku RPC, eye Zaino (ne wòle) tsɔa lightwalletd gRPC protocol la zã.
* `zcashd` ƒo ɣaɣla dzesi ŋɔŋlɔ kple gakotoku ƒu. Z3 **ma wɔƒe dɔwo ɖe akpa eve**. Gatrɔƒewo, nukuku gaƒuƒoƒowo, kple ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku dɔwɔla bubuwo trɔna ɖe ɖoɖo sia dzi, eye menye Zebra ko o.
* Compose project siwo le wo ɖokui me etɔ̃ ate ŋu awɔ dɔ le host ɖeka dzi: **mainnet**, **testnet**, kple **regtest**.
* Mainnet ƒe sync gbãtɔ ɖea ɣeyiɣi **24–72 hours** kple **300 GB** ƒe nɔnɔme. Regtest dzea agbagba le ɣeƒoƒo sue me, eye eyae nye teƒe nyui be nàsrɔ̃ stack la.
* Z3 image si wopin la me, Zallet zãa eƒe `zallet-zaino` backend (Zaino ƒe indexer libraries) eye wòƒoa nu kple Zebra le JSON-RPC dzi. Zallet ɖe backend ma ɖa le v0.1.0-beta.4; Zallet si le egbe la xɔa Zebra ƒe nɔnɔme tẽ. Zaino dɔwɔnu si le eɖokui me la hiã ɖe ko ne èdi be external gakotokuwo nakpɔ lightwalletd-compatible endpoint.
* Zallet le **beta**. Trɔtrɔ siwo wɔa nu vɔ̃ ate ŋu axɔ be nàɖe gakotoku la ɖa eye nàwɔe yeye. Mègakpɔe abe asikplɔ software si wu nɔ anyi na ga si sɔ ŋutɔ ene o.

---

## Nu ka ta Z3 li

Le Zcash ƒe agbe ƒe akpa geɖe me, `zcashd` nye ɣaɣla dzesi ŋɔŋlɔ blibo ƒe kpɔɖeŋu eye nye gakotoku ɣaɣla dzesi ŋɔŋlɔ blibo ɖeka si wowɔa dɔ le production me. Esi nye nu si gatrɔƒewo, gaƒuƒoƒowo, kple asikplɔlaewo tsɔ wɔ ɖoɖo ɖe.

`zcashd` ɖo dɔwɔwɔ nu. Gbegbɔgblɔ ɖi trɔ yi [Zebra](/zcash-tech/zebra-full-node) (eye fifia hã [Zakura](/zcash-tech/zakura-node)). Gakotoku si wowɔ ɖe eme la trɔ yi [Zallet](https://github.com/zcash/zallet). Light-wallet dɔwɔwɔ le trɔ ge le [lightwalletd](/zcash-tech/lightwallet-nodes) me ayi [Zaino](/zcash-tech/zaino).

Nu etɔ̃ siawo le repository vovovo me, release train vovovo me, eye config vovovo. Z3 nye nu si ƒoa wo ɖo: images si wopin, health check siwo tsia gakotoku la anyi va se ɖe esi ɣaɣla dzesi ŋɔŋlɔ la synce, network sia network ƒe port kple volume, kple mɔ si woŋlɔ na operator.

Ŋkɔ la nye ecosystem ƒe nya si zãa le dɔwɔwɔ me — Zebra, Zaino, Zallet — gɔme ne default Compose file la ɖoa Zebra kple Zallet ko. Zaino nye Compose profile, menye dɔwɔnu etɔ̃ si wòle be wòawɔ dɔ o.

---

## Architecture

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

| Nudzɔdzɔ | Wɔƒe dɔ le Z3 | Hiãa? |
| --- | --- | --- |
| **Zebra** | Syna eye ɖoa ɖoɖonu la, ƒoa nya, JSON-RPC, health endpoint | Ee |
| **Zallet** | ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku. Beta.1 image si wopin la zãa Zaino-library backend (`zallet-zaino`, si woɖe ɖa le Zallet beta.4) eye wòtsɔ ɖe Zebra JSON-RPC ŋu tẽ. Meŋua nu kple standalone Zaino container o | Ee |
| **Zaino** | Indexer si le eɖokui me. lightwalletd-compatible gRPC na external light clients, kple JSON-RPC proxy na explorers kple ga suewo nanaƒewo | Ao — `--profile indexer` |

Z3 pinna image ƒe versionwo le `docker-compose.yml`. Zã `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, alo `Z3_ZALLET_IMAGE` nèhiã tag bubu.

---

## Ale si wòvɔ̃ le zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Gbɔgblɔ | C++ (Bitcoin ƒe fork) | Rust dɔwɔnuwo, si Compose Docker ƒoa wo ɖo |
| Dɔwɔwɔ ƒe mɔ | Binary ɖeka: ɣaɣla dzesi ŋɔŋlɔ + gakotoku | Container vovovo na ɣaɣla dzesi ŋɔŋlɔ kple gakotoku |
| Gbegbɔgblɔ ɖi | Ɖo dɔwɔwɔ nu (EOS 18 July 2026) | Zebra (alo ɣaɣla dzesi ŋɔŋlɔ bubu si sɔ kplii) |
| Gakotoku | `wallet.dat` si wowɔ ɖe eme | Zallet, age-encrypted datadir |
| Light clients | Zi geɖe nye lightwalletd si le eɖokui me | Zaino profile si wòate ŋu azã |
| Config | `zcash.conf` | Network sia network ƒe filewo le `config/<network>/` kple Compose env filewo |
| Network siwo le host ɖeka dzi | Port clash siwo zua nu | Wòle ɖoɖo me: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ne wòle `zcashd` gakotoku zã ge, zã ZecHub ƒe [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) kple Zallet ƒe dɔwɔnu `migrate-zcashd-wallet`, eye mèŋlɔ `wallet.dat` ɖe Z3 volume la me o.

---

## Networkwo

Z3 nye Compose project etɔ̃ siwo le wo ɖokui me. Wometsɔa port alo volume ƒuƒu o.

| Network | Project ƒe ŋkɔ | Zãe na | Sync gbãtɔ | Ga nyateƒe |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Production | 24–72 hours | Ee |
| **testnet** | `z3-testnet` | Dɔwɔwɔ ɖe public test network dzi | 2–12 hours | Ao (test ZEC) |
| **regtest** | `z3-regtest` | Srɔ̃srɔ̃ le afima: gaɖoɖowo ƒoa, peer mele o | Ɣeyiɣi sue | Ao |

Operator yeyeewo ele be woadoa egɔme le **regtest**, wɔ RPC kple gakotoku ƒe mɔwo dzesi, eye emegbe woaɖo testnet alo mainnet.

---

## Host ƒe portwo siwo wòle

Network etɔ̃ siawo katã wɔe be woate ŋu anɔ kple wo nɔewo le machine ɖeka dzi. Nɔnɔme siwo le afisia nye default siwo wotsɔ ɖe dɔwɔwɔ me; wo katã ate ŋu atrɔ le `Z3_*` env var si sɔ kplii dzi. Matrix canonical la nye [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Dɔwɔnu | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (womeɖe eŋu le public o) |
| Zebra health (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (indexer profile) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (indexer profile) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Le Compose network la me, dɔwɔnuwo nya woƒe ŋkɔwo dzi (`zebra`, `zaino`, `zallet`).

---

## Data kple backup

| Volume | Nu ka wòle eme | Ɖo backup? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra ɖoɖonu ƒe nɔnɔme (~300 GB mainnet) | Mèhiã o — ate ŋu asynce ake |
| `z3-<network>-zallet` | Gakotoku ƒe database si wotsɔ encryption wɔ **kple** age identity si ʋuae | **Ee — volume sia ɖeka koe wòle be wòada backup** |
| `z3-<network>-zaino` | Indexer ƒe nɔnɔme (indexer profile ko me) | Mèhiã o — ate ŋu awɔe ake |
| `z3-<network>-cookie` | Zebra RPC cookie | Ao — wòawɔe yeye |

Be nàtsɔ ɖoɖonu ƒe nɔnɔme ɖe disk bubu dzi hafi wòado egɔme:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` tsia stack la eye wòɖea volumewo ɖe te. Ne ètsɔ `-v` kpe eŋu la, wòɖea wo ɖa eye wòna be wòasynce afresh. Tsɔ `--profile "*"` kpe eŋu be dɔwɔnu siwo le profile-gated me (indexer, monitoring) navo dɔwɔwɔ.

---

## Dze egɔme

Nu siwo wòhiã: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` hiã ɖe regtest ko.

### Regtest (mɔ si bɔbɔe wu be nàkpɔ stack la)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Kpɔ [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) be nàkpɔ test dɔwɔwɔwo.

### Mainnet (boot ƒe akpa eve)

Zebra ele be wòatsɔ sync la wu hafi Zallet aku dɔ. Ne èɖo Zallet egɔme kaba la, wòaga trɔ dɔwɔwɔ ɖe vo va se ɖe esime `/ready` nye nyateƒe.

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

Testnet zãa mɔ ɖeka, kple `.env.testnet` kple `./scripts/check-zebra-readiness.sh 18080`.

Trɔtrɔ siwo le `config/<network>/` dome la le afima ko, eye wotsia wo ɖe te to `git pull` me.

### Profile siwo wòate ŋu azã

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Grafana ƒe port siwo wotsɔ ɖoɖo me nye 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Operator ƒe dzesii

* **Image si wopin.** Z3 meɖea eɖokui le `:latest` dzi o. Trɔ pin le trɔtrɔ siwo wotsɔ kpɔ ɖe eme, alo zã `Z3_<SERVICE>_IMAGE`. Pinwo megatrɔ tso August 2026 o, eya ta wonye ŋgɔwu NU7 (kpɔ status note le taƒoƒo la dzi).
* **Container si mewɔa dɔ abe root ene o.** Wotsɔ Linux ƒe mɔɖeɖe ɖa. Health checkwo tsia gakotoku la anyi va se ɖe esime Zebra wòle dɔ wɔ ge. Restart policy le dɔ me le dɔwɔwɔ ƒe gɔmedzedze.
* **Logwo.** Z3 mepinna logging driver aɖeke o. Ɖo size limitwo le Docker daemon config me, alo logwo awu le node si wɔa dɔ 24/7 dzi.
* **P2P.** Mainnet kple testnet ɖea Zebra ƒe P2P port ɖe public. Ne èle NAT megbe, ɖo `ZEBRA_NETWORK__EXTERNAL_ADDR` be wòana address si peers nakplɔ ɖe. Regtest me peers aɖeke le o.
* **Zaino le ARM dzi.** Zaino image si tso upstream la nye `linux/amd64` ko. Le Apple Silicon dzi, wòawɔ dɔ le emulation te, ne èwɔe tso source o. Zebra kple Zallet nye multi-arch.
* **Host siwo me dɔwɔnu geɖe le.** Womeɖo CPU alo memory limit aɖeke ɖi le gɔmedzedze me o. Tsɔ `deploy.resources.limits` kpe ɖe override file me, ne box la menye node la koe ƒe nu o.

Checklist kple FAQ si wotsɔ wɔ le production ƒe nɔnɔme: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Ame kawo wòle be woazã Z3

**Eʋu nyuie**

* Gatrɔƒewo, asikplɔlaewo, kple nukuku gaƒuƒoƒowo siwo zã `zcashd` abe ɣaɣla dzesi ŋɔŋlɔ kple gakotoku ene
* Operator siwo di gakotoku RPC si wotsɔ dɔ wɔ na ɣaɣla dzesi ŋɔŋlɔ blibo Zebra si wosync
* Mɔ̃ ƒe ɖoɖoŋlɔla siwo hiã mainnet, testnet, kple regtest le teƒe ɖeka
* Ame sia ame si dzea lightwalletd-compatible endpoint si le eya ŋutɔ si to Zaino profile me

**Zi geɖe menye nu si wòhiã o**

* Ame siwo zãa gakotoku ko be woada eye woaxɔ ZEC — zã gakotoku si xɔa light wallet abe ZODL / Zashi, Zingo, alo Zkool ene (esi wotsɔ ɖo dɔ le eye wòxɔ YWallet teƒe)
* Ame siwo di be yewoakpɔ ɖoɖonu la ɖe ko — zã Zebra (alo Zakura) ɖeka
* Ame siwo di be yewoana compact blocks ko — zã Zebra + Zaino, alo Zebra + lightwalletd, si Zallet mele o

---

## Nyatakaka siwo sɔ kple esia

* [Zebra ɣaɣla dzesi ŋɔŋlɔ blibo](/zcash-tech/zebra-full-node) — gbegbɔgblɔ ɖi node si Z3 tsɔ wòƒo
* [Zaino](/zcash-tech/zaino) — indexer profile si wòate ŋu azã
* [ɣaɣla dzesi ŋɔŋlɔ blibowo](/zcash-tech/full-nodes) — Zebra, Zakura, kple zcashd si wotsɔ ɖo dɔwɔwɔ nu
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — nu si light clients ƒoa nu kplii
* [Zakura Node](/zcash-tech/zakura-node) — ɣaɣla dzesi ŋɔŋlɔ blibo bubu; menye esi Z3 tsɔna fifia o
* [Mɔ si kplɔ wò le trɔtrɔ me: zcashd ayi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Mɔ̃ ƒe ɖoɖoŋlɔla ƒe nuwo](/start-here/developer-resources)

---

## Nuwo siwo sɔ na wò

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 contract (portwo, volume, project ƒe ŋkɔwo)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet Book](https://zcash.github.io/zallet/)
* [Zcash Gaƒuƒoƒo ƒe Forum — Z3 ƒe nyatakaka yeye](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — community control plane si le official Compose stack dzi (ZecHub Hackathon)
