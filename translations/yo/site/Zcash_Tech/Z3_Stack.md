<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìdìpò Z3

Awọn ** Z3 Stack** ni awọn Zcash Foundation ká ti a fi sori ẹrọ node Syeed: ** Zebra ** (pupọ-node) + ** Zallet ** (pipa owo kikun), pẹlu kan aṣayan ** Zaino ** indexer. O jẹ yiyan rọpo fun iduroṣinṣin ọkan `zcashd` ilana, eyi ti o ṣe idapọ ifọkanbalẹ ati apamọwọ ni alakomeji kan ki o de opin igbesi aye lori 18 Keje 2026.

Awọn itọkasi imuse ni awọn Docker Kọ ise agbese ni [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Z3 kì í ṣe àlejò tuntun tí a gbà pé ó wà. Ó jẹ́ bí o ti ń darí ìkànnì náà-`zcashd` ṣajọ pọ: Zebra ṣe idanimọ ẹwọn naa, Zallet ni awọn bọtini ati ṣiṣẹ apamọwọ RPC, ati Zaino (oṣiṣẹ) sọ ilana lightwalletd gRPC.
* `zcashd` ìsopọ̀ node + wallet. Z3 ** pín àwọn ipa wọnyìí**. Àwọn ilé-ìtajà, àwùjọ tí ó ń ṣe èlò ìdáná àti gbogbo oníṣẹ́ àpò owó ti o ní ojúlówó nóòdí máa n ṣí lọ sí àjọpọ yìí dípò Zebra nìkan.
* Awọn iṣẹ akanṣe ti o ya sọtọ mẹta le ṣiṣẹ lori alejo kan: ** mainnet**, ** testnet** ati ** regtest**.
* Mainnet akọkọ isọdọkan ni lori awọn aṣẹ ti ** 24  72 wakati** ati nipa ** 300 GB. Regtest de soke ninu aaya ki o si jẹ ọtun ibi lati ko eko awọn akopọ.
* Zallet ń fi àwọn ìwé ìkówèésí àdàkọ Zaino's sínú àti kí ó bá Zebra sọ̀rọ̀ lórí JSON-RPC. Iṣẹ́ tí a dá dúró ti Zaino nìkan ni o nílò bí ẹ bá fẹ́ ní òpin tó jẹ́ alágbàwí lightwalletd fún owó ìdókòwò láti òkèèrè.
* Zallet wà ní **beta**. Àtúnṣe ìdìbò lè béèrè kí o pa àpòòwé náà àti láti tún un dá sílẹ̀. Má ṣe kà á sí sọfitiwia ìṣójútó tí ó ti parí fún owó ńláńlá.

---

## Ìdí tí Z3 fi wà

Ní gbogbo ìgbà tí Zcash fi wà láàyè, `zcashd` ni mejeeji awọn itọkasi kikun node ati nikan gbóògì pipe-node apamọwọ. ti apẹrẹ jẹ ohun paṣipaarọ, adagun, ki o si custodians integrated lodi si.

`zcashd` ti fi sípò. ìfohùnṣọ̀kan yí padà sí [Zebra](/zcash-tech/zebra-full-node) (àti nísinsìnyí pẹ̀lú) [Zakura](/zcash-tech/zakura-node)A gbe apamọwọ ti a fi sinu rẹ si: [Zallet](https://github.com/zcash/zallet)Ìránṣẹ́ owó-ìmọ̀ràn ń ṣí lọ láti ibùdó ìsọfúnni. [lightwalletd](/zcash-tech/lightwallet-nodes) to [Zaino](/zcash-tech/zaino).

Those three pieces are separate repositories, separate release trains, and separate configs. Z3 is the glue: pinned images, health checks that keep the wallet down until the node is synced, per-network ports and volumes, and a documented operator path.

Orukọ naa jẹ ọna-ọna ti o ni imọran  Zebra, Zaino, Zallet  biotilejepe faili Ṣeto aiyipada nikan bẹrẹ Zebra ati Zallet. Zaino jẹ profaili Kọwe kan, kii ṣe ilana kẹta to nilo.

---

## Ìṣẹ̀dá ilé-ìkọ́lé

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

| Ẹ̀yà ara | Ipa ninu Z3 | A nilo? |
| --- | --- | --- |
| **Zebra** | Ṣe àmúṣiṣẹ́pọ̀ àti ìfọwọ́sowọ́pọ̀ pq, ọ̀rọ̀ àfojúsùn, JSON-RPC, àti ìparí ìlera | Bẹ́ẹ̀ni |
| **Zallet** | Full-node wallet. Embeds Zaino libraries. Connects straight to Zebra JSON-RPC. Does **not** call the standalone Zaino container | Yes |
| **Zaino** | Atọka ti o da duro nikan. gRPC lightwalletd-compatible fun awọn alabara ina ita, pẹlu aṣoju JSON-RPC fun awọn oluwakiri ati awọn faucets | No — `--profile indexer` |

Awọn ẹya aworan Z3 pin ni: `docker-compose.yml`. Ṣàtúnṣe pẹlú `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, or `Z3_ZALLET_IMAGE` tó o bá nílò àmì mìíràn.

---

## Bawo ni yi yatọ lati zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Èdè | C++ (Fọ́kì Bitcoin) | Àwọn iṣẹ́ ipata, tí a ṣètò pẹ̀lú Docker Compose |
| Àwòṣe ilana | Oníná méjì kan: nódù + àpò owó | Awọn apoti ati awọn apoti apamọwọ lọtọ |
| Ìfohùnṣọ̀kan | Fẹ̀yìntì (EOS 18 Keje 2026) | Zebra (tàbí nódù mìíràn tó báramu) |
| Àpò owó | Inu-inu `wallet.dat` | Zallet, datadir ti a fi ọjọ-ori pamọ |
| Awọn alabara ina | Nigbagbogbo a lightwalletd lọtọ | Ìfilọ́lẹ̀ Zaino tí a lè yàn |
| Ṣètò | `zcash.conf` | Àwọn fáìlì fún nẹ́tíwọ́ọ̀kì kọ̀ọ̀kan lábẹ́ `config/<network>/` pẹlu Ṣakojọ awọn faili env |
| Awọn nẹtiwọọki lori olupin kan | Àwọn ìjàkadì ojú omi tó ń roni lára | Kilasi akọkọ: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Tó o bá ṣì ní àpò kan tó ń gba omi ara rẹ, `zcashd` wallet, use ZecHub’s [ìwé tó ń darí ìrìn àjò-àjò.](/guides/migration-guide-zcashd-to-zebrad-zallet) and Zallet’s `migrate-zcashd-wallet` pàṣẹ dípò kó o ṣe àdàkọ rẹ̀ `wallet.dat` sinu iwọn didun Z3.

---

## Àwọn ẹ̀rọ-ìpèsè

Z3 jẹ́ iṣẹ́ kọ̀ǹpútà tí ó dá dúró. Wọn kò pín àwọn èbúté tàbí ìmúlò wọn.

| Nẹ́ẹ̀tìwọ́ọ̀kì | Orúkọ iṣẹ́ náà | Lò ó fún | Ìmúṣiṣẹ́pọ̀ àkọ́kọ́ | Awọn owo gidi |
| --- | --- | --- | --- | --- |
| **àkójọpọ̀** | `z3-mainnet` | Ìṣẹ̀dá | Wákàtí 24–72 | Bẹ́ẹ̀ni |
| **nẹ́ẹ̀tì ìdánwò** | `z3-testnet` | Ṣíṣe àgbékalẹ̀ lórí nẹ́tíwọ́ọ̀kì ìdánwò gbogbogbò | Wákàtí 2–12 | Rárá (dánwò ZEC) |
| **ìforúkọsílẹ̀** | `z3-regtest` | Iṣẹ́ àdúgbò: àwọn ìdènà lẹ́sẹ̀kẹsẹ̀, kò sí àwọn ẹlẹgbẹ́ | Awọn iṣẹ́jú-àáyá | No |

Àwọn oníṣẹ́ tuntun ní láti bẹ̀rẹ̀ sí í ṣe àyẹwò padà, kí wọ́n fìdí ìtòlẹ́sẹẹsẹ RPC àti ìṣàn owó alágbèéká múlẹ̀, lẹ́yìn náà ni kí wọn lọ sórí ẹ̀rọ ìdánrawò tàbí orí ère.

---

## Àwọn èbúté onílé tí ó wà ní àlàfo

Gbogbo awọn mẹta nẹtiwọki ti wa ni o kan lati coexist lori ọkan ẹrọ. iye isalẹ jẹ awọn atejade aiyipada; kọọkan ọkan ni overridable nipasẹ awọn baramu `Z3_*` Àwòrán ìlà àwọn àdàkọ ni: [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Iṣẹ́ | Mainnet | Nẹ́ẹ̀tìwọ́ọ̀kì ìdánwò | Ìforúkọsílẹ̀ |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (kò ṣe àtẹ̀jáde) |
| Ìlera Zebra (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (profaili atọka) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (profaili atọka) | 8237 | 18237 | 28237 |
| RPC Zallet | 28232 | 40232 | 50232 |

Láàárín ẹ̀rọ Compose, àwọn iṣẹ́ máa ń yanjú nípasẹ̀ orúkọ (`zebra`, `zaino`, `zallet`).

---

## Àwọn ìsọfúnni àti ààbò wọn

| Iwọn didun | Ohun tí ó ń mú | Ṣe àtìlẹ́yìn rẹ̀? |
| --- | --- | --- |
| `z3-<network>-chain` | Ipò ẹ̀wọ̀n Zebra (~300 GB mainnet) | Àṣàyàn — a lè tún ṣe àtúnṣe |
| `z3-<network>-zallet` | Ibi ipamọ data apamọwọ ti a fi pamọ **ati** idanimọ ọjọ-ori ti o ṣii rẹ | **Bẹ́ẹ̀ni — èyí nìkan ni ohùn tí a gbọ́dọ̀ fi ṣe àtìlẹ́yìn** |
| `z3-<network>-zaino` | Ipò olùtọ́ka (pẹ̀lú ìṣàfihàn olùtọ́ka nìkan) | Àṣàyàn — a lè tún un kọ́ |
| `z3-<network>-cookie` | Kúkì RPC Zebra | Rárá — àtúnṣe |

Lati fi ipo ẹ̀rọ-ìmọ́lẹ̀ sórí àwo mìíràn kí o tó bẹ̀rẹ̀:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` ó dá ìdìpọ̀ náà dúró, tó sì ń pa àwọn àdàkọ rẹ̀ mọ́. `-v` ó pa wọ́n mọ́, tó sì mú kí a tún àtúnṣe ìsopọ̀ náà ṣe. `--profile "*"` nítorí náà, àwọn iṣẹ́ tó ní í ṣe pẹ̀lú ìsọfúnni (ìwé-àkójọpọ̀, àbójútó) ni a máa ń tú ká.

---

## Bí a ṣe bẹ̀rẹ̀ sí í ṣiṣẹ́.

Àwọn ohun tí ó pọn dandan: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` kìkì fún ìwádìí àyẹ̀wò ìṣègùn ni wọ́n nílò.

### Regtest (ọ̀nà tó yá jùlọ láti rí àpò)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Wo àwọn ojúewé yìí: [àwọn ìwé/àtúnṣe-ìdánwò.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) fún àwọn àṣẹ ìdánwò.

### Mainnet (ìdáná ìpele-meji)

Zebra gbọdọ pari isọdọkan ki Zallet to wulo. Ṣíṣe Zallet ni kutukutu jẹ ki o tun bẹrẹ-akopọ titi di igba ti a fi le lohun naa lati ṣe atunṣe rẹ fun awọn ohun elo miiran, ṣugbọn kii yoo ṣiṣẹ bi ẹnipe wọn ko mọ ọ daradara. `/ready` òótọ́ ni.

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

Testnet ni kanna sisan pẹlu awọn ti o ba wa ni a ṣe akiyesi. `.env.testnet` àti pé, `./scripts/check-zebra-readiness.sh 18080`.

Àwọn àtúnṣe lábẹ́: `config/<network>/` dúró sí àdúgbò kí o sì yè é. `git pull`.

### Àwọn àwòkọ tí a kò lè yàn

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Awọn ibudo Grafana aiyipada jẹ 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Àwọn àlàyé fún oníṣe-òwò náà

* ** Awọn aworan ti a fi sii.** Z3 ko ni rọra ṣan lori `:latest`. Bump kan pin ni a ti ṣe atunyẹwo ayipada, tabi ṣeto `Z3_<SERVICE>_IMAGE`.
* **Àwọn àpòòwò tí kì í ṣe orísun.** Àwọn agbára Linux ti di ìparí. Ìwádìí ìlera mú kí pọ́ńbélé náà dúró títí Zebra fi máa ṣetán. Àṣèlú ṣíṣíṣẹ́ padà wà nílẹ̀ láìsọ tẹ́lẹ̀ rí.
* **Logs.** Z3 kò fi pin oníṣe ìkọsílẹ̀. Ṣeto àlàfo iwọn nínú ìṣètò daemon Docker tàbí àwọn àkọọ́lé máa ń dàgbà láìní ìdákẹ́ ní orí-ìpín 24/7 kan.
* **P2P.** Mainnet ati testnet ṣe atẹjade ibudo P2P Zebra. Lẹyin NAT, ṣeto `ZEBRA_NETWORK__EXTERNAL_ADDR` Regtest kò ní àwọn ẹlẹgbẹ́.
* ** Zaino on ARM.** Àwòrán tí ó wà ní ìsàlẹ̀ odò ni: `linux/amd64` O ti wa ni o kan fun Apple Silicon, eyi nṣiṣẹ labẹ emulation ayafi ti o ba kọ lati orisun. Zebra ati Zallet jẹ ọpọ-apakan.
* ** Àwọn onílé tí a pín.** Kò sí ààlà CPU tàbí ìrántí ti ó wà ní ìpilẹ̀ṣẹ̀. Add `deploy.resources.limits` nínú fáìlì àtúnṣe tí kò bá sí àpótí tó wà fún nóòdù náà.

Àtòjọ àyẹ̀wò tí ó ní ìrísí ìṣẹ́ àti FAQ: [àwọn ìwé/ìwé-ẹ̀rí.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Ta ló yẹ kó máa darí Z3?

Ó bá mi mu dáadáa.

* Awọn paṣipaarọ, awọn alabojuto ati awọn adagun iwakusa ti o lo `zcashd` gẹ́gẹ́ bí node-plus-wallet
* Awọn oniṣẹ ti o fẹ atilẹyin apamọwọ kikun-node RPC lodi si Zebra alailẹgbẹ kan
* Àwọn olùdásílẹ̀ tó nílò mainnet, testnet àti regtest lẹ́gbẹ̀ẹ́ ara wọn
* Ẹnikẹni ti o n duro soke a ikọkọ lightwalletd-agbekalẹ opin nipasẹ awọn Zaino profaili

**Gbogbo ìgbà ni irinṣẹ́ tí kò tọ̀nà**

* Awọn olumulo ipari ti o nilo nikan lati firanṣẹ ati gba ZEC  lo apamọwọ ina bi ZODL / Zashi, Zingo, tabi YWallet
* Àwọn ènìyàn tí wọ́n fẹ́ láti ṣètẹríba fún ẹ̀ka-ìpínlẹ̀ nìkan  máa ń ṣe Zebra (tàbí Zakura) ní àdáni.
* Awọn eniyan ti o fẹ lati sin awọn bulọọki iwapọ nikan  ṣiṣe Zebra + Zaino, tabi Zebra+ lightwalletd, laisi Zallet

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

* [Zebra Ìkànnì Pípéye](/zcash-tech/zebra-full-node)  ìsopọ̀ àjùmọ̀tọ́ Z3 wrapps
* [Zaino](/zcash-tech/zaino)  Àkọsílẹ̀ àdàkọ tí kò bá pọn dandan
* [Àwọn Ìkànnì Pípéye](/zcash-tech/full-nodes)  Zebra, Zakura àti àwọn tí wọ́n ti fẹ̀yìn tì lẹ́nu iṣẹ́ zcashd
* [Àwọn Ìkànnì Lightwallet Nodes](/zcash-tech/lightwallet-nodes)  àwọn tí ọ̀ràn kàn tó ń báni sọ̀rọ̀.
* [Ìkànnì Zakura](/zcash-tech/zakura-node)  ìyípadà ojú-ìpín; kìí ṣe ohun tí Z3 ń gbé kiri lónìí.
* [Itọsọna Iṣilọ: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Àwọn Ìpèsè fún Oníṣètò](/start-here/developer-resources)

---

## Àwọn Owó-ìṣúnná owó

* [Ibi ìpamọ́ Z3](https://github.com/ZcashFoundation/z3)
* [Àdéhùn Z3 (àwọn èbúté, àwọn ìdìpọ̀ omi, orúkọ iṣẹ́)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Ìwé Zebra náà](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Ìwé Zallet](https://zcash.github.io/zallet/)
* [Àjọ Ìgbìmọ̀ Zcash  Àwọn àtúnṣe sí Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Olùgbéejáde Z3](https://github.com/Jubrilabdulazeez/z3-launcher)  Àwòrán àkóso àwùjọ lórí ìdìpọ̀ Compose (ZecHub Hackathon)

