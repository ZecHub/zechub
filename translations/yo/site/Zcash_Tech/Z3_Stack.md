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

 Ẹ̀yà ara. Ipa nínú Z3  Ṣé ó pọn dandan?
| --- | --- | --- |
**Zebra**. Ó ń ṣe àdàkọ àti ìmúṣẹ ẹ̀ka, ọ̀rò́-ìbínúni, JSON-RPC, ìlera àwọn ohun tí ó wà nídìí rẹ síta bẹ́ẹ̀ ni
| **Zallet** | Full-node wallet. Embeds Zaino libraries. Connects straight to Zebra JSON-RPC. Does **not** call the standalone Zaino container | Yes |
 Zaino. ìdìbò tí ó dá dúró . lightwalletd-ìmúṣe gRPC fún àwọn oníṣẹ́mọ̀nà ìmọ̀lára ti òkè, pẹlúpùpọ̀ àgbékalẹ̀ JSON-RPC fun àwárí àti faucets No  `--profile indexer` |

Awọn ẹya aworan Z3 pin ni: `docker-compose.yml`. Ṣàtúnṣe pẹlú `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, or `Z3_ZALLET_IMAGE` tó o bá nílò àmì mìíràn.

---

## Bawo ni yi yatọ lati zcashd

| | zcashd | Z3 |
| --- | --- | --- |
Èdè C++ (ìpín Bitcoin) Àwọn iṣẹ Rust, tí a ṣètò pẹ̀lú Docker Compose.
 Àpẹẹrẹ ìgbésẹ̀. Ẹyọ méjì: ìsọ̀rí + àpò-ìpamọ́. Ìsọmọ̀ àti àwọn ohun èlò tí ó wà nínú àpò owó yàtọ̀ síra wọn.
ìfohùnṣòótọ́ (Consensus) Retired (EOS 18 July 2026) Zebra (tàbí kókó mìíràn tó bá ṣepọ̀) ♀️
Àpò. Ó ní àwo-ìwé inú rẹ̀ `wallet.dat` Zallet, ìsọfúnni tí a fi ìgbà orí kọ dídì.
 Light clients. Ìdájọ́ àkànṣe lightwalletd: Àkọsílẹ̀ Zaino tí ó wà ní àṣàyàn
Àtòjọ. `zcash.conf` Àwọn fáìlì fún gbogbo ẹ̀ka-ẹ̀rọ lábẹ́: `config/<network>/` plus Kọ awọn faili env.
 Awọn nẹtiwọọki lori ile-iṣẹ kan. Ìjàpá ibudo ti o dun - Ẹ̀ka àkọ́kọ́: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Tó o bá ṣì ní àpò kan tó ń gba omi ara rẹ, `zcashd` wallet, use ZecHub’s [ìwé tó ń darí ìrìn àjò-àjò.](/guides/migration-guide-zcashd-to-zebrad-zallet) and Zallet’s `migrate-zcashd-wallet` pàṣẹ dípò kó o ṣe àdàkọ rẹ̀ `wallet.dat` sinu iwọn didun Z3.

---

## Àwọn ẹ̀rọ-ìpèsè

Z3 jẹ́ iṣẹ́ kọ̀ǹpútà tí ó dá dúró. Wọn kò pín àwọn èbúté tàbí ìmúlò wọn.

Àjọṣepọ̀ Orúkọ iṣẹ́-ìmọ̀ Lò ó fún ìmúṣiṣẹ́pọ̀ àkọ́kọ́ Owó gidi.
| --- | --- | --- | --- | --- |
Ìkànnì pàtàkì. `z3-mainnet` Ìpèsè: 24 sí 72 wákàtí. Bẹ́ẹ̀ ni.
Àwòkọ́ṣe ìwádìí. `z3-testnet`  Ìdánwò lórí ẹ̀rọ ìfọwọ́sọ̀nà gbogbo ènìyàn 2 sí 12 wákàtí Kò (ìdánwo ZEC)
Àdánwò àdììtú. `z3-regtest`  Ìdánwò àdúgbò: ìdìbò ojú ẹsẹ̀, kò sí àwọn ẹlẹgbẹ́.

Àwọn oníṣẹ́ tuntun ní láti bẹ̀rẹ̀ sí í ṣe àyẹwò padà, kí wọ́n fìdí ìtòlẹ́sẹẹsẹ RPC àti ìṣàn owó alágbèéká múlẹ̀, lẹ́yìn náà ni kí wọn lọ sórí ẹ̀rọ ìdánrawò tàbí orí ère.

---

## Àwọn èbúté onílé tí ó wà ní àlàfo

Gbogbo awọn mẹta nẹtiwọki ti wa ni o kan lati coexist lori ọkan ẹrọ. iye isalẹ jẹ awọn atejade aiyipada; kọọkan ọkan ni overridable nipasẹ awọn baramu `Z3_*` Àwòrán ìlà àwọn àdàkọ ni: [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

Ìránṣẹ́. Mainnet. Testnet. Regtest.
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
 Zebra P2P 8233 18233 (kò tíì jáde)
Ìlera Zebra (ìyẹn àwọn ẹranko)`/ready`) | 8080 | 18080 | 28080 |
Zaino gRPC (ìdánwò ìsọfúnni) 8137 18137 28137.
Zaino JSON-RPC (ìdánwò ìdìpọ̀) 8237 18237 28237
Zallet RPC 28232 40232 50232 Àkọlé àwòrán, Ẹ̀rọ ìdìbò ti ń lọ lókè.

Láàárín ẹ̀rọ Compose, àwọn iṣẹ́ máa ń yanjú nípasẹ̀ orúkọ (`zebra`, `zaino`, `zallet`).

---

## Àwọn ìsọfúnni àti ààbò wọn

 Ìmúdàgba. Kí ló ń mú un dúró? Ṣó ti di ẹ̀yìn ọ̀tún báyìí?
| --- | --- | --- |
| `z3-<network>-chain`  Ìpínlẹ̀ ẹ̀ka Zebra (~300 GB mainnet)  Àtúnṣe-ìṣètò àfọwọ́kọ.
| `z3-<network>-zallet`  Àkọsílẹ̀ àpamọ́ owó tí a fi kọǹpútà pamọ́ ** àti** orúkọ ọjọ-ori tó ń ṣí i sílẹ̀. ** Bẹẹni, èyí nìkan ni ìdìpòdí ti ó yẹ kí á ṣe afẹyinti rẹ.*
| `z3-<network>-zaino`  Ìṣirò ìdìpò (kì í ṣe pẹ̀lú àwòkọ́ṣe olùdípò)  Àfọwọ́sọ  A tún un kọ.
| `z3-<network>-cookie`  Zebra RPC cookie. Kò sí àtúnṣe kankan.

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

