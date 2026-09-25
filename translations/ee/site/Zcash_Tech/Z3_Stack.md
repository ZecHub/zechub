<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Kpakpã la

The **Z3 Stack** is the Zcash Foundation’s packaged node platform: **Zebra** (full node) + **Zallet** (full-node wallet), with an optional **Zaino** indexer. It is the intended replacement for a standalone `zcashd` enye nu si wotsɔna wɔa ɖoɖo kple gaɖaka le binary ɖeka me eye wòwu enu le July 18, 2026 dzi.

Docker Compose ƒe ɖoɖo si wowɔ le Germany la nye esi ŋu wotrɔ asi le. [github.com/ZcashFoundation/z3 Eʋegbe me: ZCashFunding, GDXG](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Menye Z3 ye nye ame si dzi amewo da asi ɖo o. Alesi nèwɔa dɔe le dɔwɔƒe lae nana wòɖea vi na mí -`zcashd` kpe ɖe wo nɔewo ŋu: Zebra léa kɔsɔkɔsɔ la me nyawo ɖi, Zallet zãna safuiwo eye wòzãa gaƒoɖokuigbalẽ RPC, kple Zaino (ele eme be woaƒoe) ƒoa nu le lightwalletd gRPC ɖoɖowɔɖia dzi.
* `zcashd` nuƒleƒe kple gaɖaba ƒokpli. Z3 **ma akpa siawo** . Gadzraɖoƒewo, tomenukuwo ƒe ha gãwo, kple ame bubuwo siwo wɔa dɔ le gakpɔ me la ʋuna yia ɖoɖo sia dzi tsɔ wu Zebra ɖeɖe ko.
* Compose ƒe dɔ etɔ̃ siwo le wo ɖokui si ate ŋu anɔ dɔwɔwɔ dzi ɖe asitelefon ɖeka ko me: **mainnet**, **testnet** kple **regtest**.
* Mainnet ƒe sync gbãtɔa le abe gaƒoƒo 24 kple 72 ene eye eƒe agbɔsɔme anɔ GB 300. Regtest va ɖo sekɛnd ʋɛ aɖewo ko me, enye teƒe nyuitɔ si nàsrɔ̃ nu tso stack ŋu.
* Zallet dea Zaino ƒe indexers gbalẽdzraɖoƒewo me eye wòƒoa nu kple Zebra to JSON-RPC dzi. Ne èdi be lightwalletd ŋuti dɔwɔƒe nanɔ dzigbɔna na gaƒoɖonu siwo le gota la, ekema ɖeko woahiã Zaino si nɔa eɖokui si ko.
* Zallet le **beta** me. Ne wotrɔ asi le eŋu la, ate ŋu abia be woaɖe gaɖakavia ɖa eye woagawɔe ake. Mègabu edzi abe software si wotsɔ kpɔa gaku gãwo dzii ene o.

---

## Nu si ta Z3 li ɖo

Le Zcash ƒe agbenɔɣi akpa gãtɔ me la, eƒe susu nɔ nu siwo wòate ŋu awɔ kple ale si wòawɔ nui dzi. `zcashd` enye nu si dzi wotrɔ asi le, kple esi ŋu woƒo ƒu ɖo be yewoalé ŋkui. Nu siae na wodzra gaɖɔli siwo katã nɔ anyi la me ɖe edzi eye woawo hã nyea woƒe domenɔla ɖeka koliawo.

`zcashd` woɖe asi le eŋu. [Zebra](/zcash-tech/zebra-full-node) (Eye fifia hã) [Zakura](/zcash-tech/zakura-node)) Woɖe ga si wotsɔ de eme la yi ɖe akpa bubu aɖe. [Zallet](https://github.com/zcash/zallet)Wole ga si wotsɔna naa ame le asitsatsa me la zãm tso ƒe 2003 va se ɖe ƒe 2007 dzi. [lightwalletd](/zcash-tech/lightwallet-nodes) to [Zaino](/zcash-tech/zaino).

Nudogba etɔ̃ siawo nye nudzraɖoƒe vovovo, mɔ vovovowo kple ɖoɖo bubuwo. Z3 ye le wo dome: foto siwo wotsɔ ɖo teƒe ɖeka la ƒe nɔnɔmewo, nudogoɖenunuawo si nana be gaxɔa megale dɔ wɔm o va se ɖe esime wodze eƒe dɔwɔwɔ gɔme nyuie, kadodoawo kple nuɖoanyi ɖesiaɖe ŋuti nyatakakawo kpakple dɔwɔlawo ƒe zɔzɔme ŋu nyawo.

Eŋkɔa nye nu gbagbewo ƒe ɖoɖowɔɖi me nya kpui  Zebra, Zaino, Zallet  togbɔ be Compose file si le default la dzea egɔme kple Zebra kple Zallet ko hã. Zaino enye Compose profile ke menye akpa etɔ̃lia o.

---

## Xɔtutuwo

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

| Kpeɖeŋutɔ | Akpa si wòwɔna le Z3 | Si hiã? |
| --- | --- | --- |
| **Zebra** | Syncs eye wòɖo kpe kɔsɔkɔsɔ, nyatoƒoetoto, JSON-RPC, lãmesẽ nuwuƒe dzi | Yes |
| **Zallet** | Gakotoku si me node blibo le. Embeds Zaino agbalẽdzraɖoƒewo. Doa ka kple Zebra JSON-RPC tẽ. Me **meyɔa** Zaino nugoe si le eɖokui si o | Yes |
| **Zaino** | Indexer si le eɖokui si. lightwalletd-compatible gRPC na gota kekeli asisiwo, tsɔ kpe ɖe JSON-RPC teƒenɔla na explorers kple faucets | No — `--profile indexer` |

Z3 pin image versions le me `docker-compose.yml`. Ðɔ ɖe edzi kple `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, or `Z3_ZALLET_IMAGE` ne èhiã ŋkɔ bubu.

---

## Aleke esia to vovo na zcashd?

| | zcashd | Z3 |
| --- | --- | --- |
| Gbegbᴐgblᴐ | C++ (Bitcoin ƒe fɔkpa) | Rust subɔsubɔdɔwo, si woɖo kple Docker Compose |
| Dɔwɔwɔ ƒe kpɔɖeŋu | Binary ɖeka: node + gakotoku | Miɖe node kple gakotoku ƒe nugoewo ɖe vovo |
| Nusiwo dzi woda asi ɖo | Exɔ dzudzɔ le dɔme (EOS 18 July 2026) | Zebra (alo node bubu si sɔ) |
| Gakotoku | Wotue ɖe eme `wallet.dat` | Zallet, datadir si wotsɔ nya ɣaɣlawo ŋlɔ tso ƒexɔxɔ nu |
| Kekeli ƒe asisiwo | Zi geɖe la, lightwalletd si le vovo | Zaino nɔnɔmetata si woate ŋu atia |
| Config | `zcash.conf` | Per-network faɛlwo le `config/<network>/` kpe ɖe Compose env faɛlwo ŋu |
| Networks le host ɖeka dzi | Melidzeƒea ƒe dzrewɔwɔ siwo me vevesese le | Klass gbãtɔ: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ne ègakpɔtɔ le dɔ sia wɔm la, ke: `zcashd` wallet, use ZecHub’s [ʋuʋu ŋuti mɔfiagbalẽa me.](/guides/migration-guide-zcashd-to-zebrad-zallet) and Zallet’s `migrate-zcashd-wallet` fia mɔe tsɔ wu be wòaŋlɔ nu ɖe eme `wallet.dat` le Z3 ƒe akpa si nye agbalẽdzraɖoƒea.

---

## Mɔ̃ɖaŋunuwo

Z3 nye Compose ƒe dɔwɔna etɔ̃ siwo le wo ɖokui si. Womezãa woƒe ʋudzeƒewo alo agbalẽwo ɖekae o.

| Kadodo | Dɔa ƒe ŋkɔ | Zãe na | Gbãtɔ ƒe sync | Ga ŋutɔŋutɔwo |
| --- | --- | --- | --- | --- |
| **mainnet** ƒe | `z3-mainnet` | Nuwɔwɔ | gaƒoƒo 24–72 sɔŋ | Yes |
| **dodokpɔ ƒe nyatakakadzraɖoƒe** | `z3-testnet` | Staging le dutoƒo dodokpɔ network dzi | gaƒoƒo 2–12 sɔŋ | Ao (dodokpɔ ZEC) |
| **regtest** | `z3-regtest` | Nutoa me nuwɔna: mɔxexe enumake, hati aɖeke meli o | Sɛkɛndwo | No |

Ele be dɔwɔƒe yeyewo nadze egɔme kple "regtest", woana RPC-awo kple ga si le woƒe kotokuawo me la nanɔ eteƒe, eye emegbe woaʋu ayi testnet alo mainet dzi.

---

## Domenyinu ƒe host portwo

Wodi be kadodo etɔ̃awo katã nanɔ anyi le mɔ ɖeka dzi. Nusiwo woŋlɔ ɖi la nye esi wota; woate ŋu atrɔ asi le ɖesiaɖe ŋu to asitɔtrɔ si wowɔna ɖe eƒe nɔnɔmea ŋuti me. `Z3_*` env var. Ŋutinya ƒe nuŋlɔɖi enye: [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Dɔ | Mainnet ƒe mɔ̃ | Dodokpɔ ƒe mɔ̃ | Regtest ƒe dodokpɔ |
| --- | --- | --- | --- |
| Zebra JSON-RPC ƒe ŋkɔ | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (wometae o) |
| Zebra ƒe lãmesẽ (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (indexer ƒe nɔnɔmetata) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (indexer ƒe nɔnɔmetata) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Le Compose-ƒa dzi la, ŋkɔwoe wotsɔna ɖoa dɔwo ŋu (`zebra`, `zaino`, `zallet`).

---

## Data kple backupwo

| Ɣlidodo | Nusi wòlé ɖe asi | Ðe megbe nɛa? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra kɔsɔkɔsɔ ƒe nɔnɔme (~ 300 GB mainnet) | Tiatia — woate ŋu agbugbɔ awɔ ɖeka |
| `z3-<network>-zallet` | Gakotoku ƒe nyatakakadzraɖoƒe si wotsɔ nya ɣaɣlawo ŋlɔ **kple** ƒe si wòxɔ si ʋua enu | **Ẽ — esia koe nye volume si wòle be woawɔ backup** |
| `z3-<network>-zaino` | Indexer ƒe nɔnɔme (kple indexer ƒe nɔnɔmetata ɖeɖeko) | Optional — woate ŋu agbugbɔ atu |
| `z3-<network>-cookie` | Zebra RPC ƒe kuki | Ao — wogbugbɔ wo dzi |

Be nàtsɔ chain state aɖo disk bubu dzi hafi adze egɔme:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` enana be nu siwo le ƒuƒoƒo me la megava nɔa wo nɔewo dome o. `-v` eɖea wo ɖa eye wònana wodzea dɔwɔwɔ gɔme ake. `--profile "*"` Eyata dɔ siwo wowɔna le ɖoɖo nu (abe numekugbalẽwo, ŋkuɖoɖo dzi) la gblẽ.

---

## Alesi Míadze Egɔmee

Nu siwo hiã: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` Regtest ɖeɖe ko hiã.

### Regtest (mɔ si dzi woato akpɔ nu siwo le ƒuƒoƒo me kaba)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Kpɔe ɖa. [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) le dodokpɔ ƒe ɖoɖowo wɔwɔ me.

### Mainnet (ʋɔnudɔwɔƒe eve)

Ele be Zebra nawu eƒe dɔwɔwɔ nu hafi Zallet nazu ŋudɔwɔnu. Ne eɖo Zallet gɔme kaba la, enana wògadzea mɔ vaseɖe esime wòawu enu keŋkeŋ `/ready` enye nyateƒe.

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

Testnet nyea tsimɔ ɖeka kple esi me woadoe ɖo. `.env.testnet` kple `./scripts/check-zebra-readiness.sh 18080`.

Etrɔ asi le teƒeteƒewo ŋu: `config/<network>/` nɔ afi ma eye nànɔ agbe. `git pull`.

### Mɔnu bubu siwo ŋu womeɖe mɔ ɖo o

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Grafana ƒe port siwo li la nye 3000 (mainnet), 13000 (testnet) kple 23000 (regtest).

---

## Dɔwɔƒea ƒe nuŋlɔɖiwo

* **Wotsɔ nɔnɔmetatawo ɖo teƒea.** Z3 meʋua tsia dzi le adzame o. `:latest`. Ðɔɖɔɖotaʋi si me wotrɔ asi le alo ɖo la ƒe akpa aɖe. `Z3_<SERVICE>_IMAGE`.
* **Non-root containers.** Linux ƒe ŋutetewo nu yi. Health checks léa gaɖaka la ɖe megbe vaseɖe esime Zebra le klalo. Restart policy li tso default me.
* **Logs.** Z3 meɖoa logging driver o. Ðo size limits le Docker daemon config alo logs tsiwo naɖo 24x7 node dzi.
* **P2P.** Mainnet kple testnet ɖea Zebra ƒe P2P ʋɔtru ɖe go. NAT megbe, set `ZEBRA_NETWORK__EXTERNAL_ADDR` Regtest meɖo ame aɖeke o.
* **Zaino le ARM.** Zaino ƒe nɔnɔmetata si dze ŋgɔ la nye: `linux/amd64` Ne èwɔe tso afisi wòdzɔ le la, ke ele Apple Silicon dzi. Zebra kple Zallet nyea nuŋɔŋlɔ geɖe ƒe mɔ̃wo.
* **Shared hosts.** CPU alo memory ƒe seɖoƒe aɖeke meli le ɖoɖo nu o. Add `deploy.resources.limits` le override file me ne aɖaka la mele dedie na node o.

Numetoto si le abe esiwo wodea asi na dɔwɔƒea ene kple nya siwo amewo biana edziedzi: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md Eʋevi kple nuŋɔŋlɔwo: % s](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Amekae wòle be wòaxɔ ŋgɔ le Z3 me?

** Enyo na wò**

* Gadzraɖoƒewo, nuxlẽlawo kple tomenukuha siwo zãa ga la wɔa dɔ le wo ŋu. `zcashd` abe node-plus-wallet ene.
* Dɔwɔla siwo di be yewoakpe ɖe RPC gavi si ŋu wotrɔ asi le bliboe kple Zebra ɖekawɔwɔ dzi la ŋuti dɔwɔlawo
* Ame siwo hiãa mainnet, testnet kple regtest le wo nɔewo xa la ƒe dɔwo wɔwɔ
* Amesiame si le ameɖokui ƒe lightwalletd-sɔmlɔƒe aɖe dzi to Zaino profile la me

** Zi geɖe la, dɔwɔnu si mesɔ o ye wozãna**

* Amesiwo hiãna be woaɖo ZEC ɖe ame alo axɔe ko  zãa gaɖaka sue abe ZODL / Zashi, Zingo, alo YWallet ene.
* Amesiwo di be yewoado kadodoa me na ame bubuwo ko  le Zebra (alo Zakura) dzi ɖeɖe dzaa.
* Amesiwo dina be yewoazã nuƒleƒe suewo ko la  zãa Zebra + Zaino, alo Zebra+ lightwalletd si me Zallet mele o.

---

## Axa siwo do ƒome kplii

* [Zebra ƒe Dzogoe Blibo la](/zcash-tech/zebra-full-node)  nuwɔwɔ ɖeka ƒe akpa si nye Z3 ƒoƒowo
* [Zaino](/zcash-tech/zaino)  nuŋɔŋlɔdzesi ƒe akpa si womedi o
* [Nuwo ƒe Ŋutete Blibo](/zcash-tech/full-nodes) — Zebra, Zakura, and the retired zcashd
* [Lightwallet Nodes (Adzagba Kpoƒe)](/zcash-tech/lightwallet-nodes)  Amesiwo gbɔ ame siwo le dɔ wɔm la ƒoa nu kple
* [Zakura ƒe Nuƒoƒomevi](/zcash-tech/zakura-node)  teƒe bubu si nuwuƒe blibo le; menye nusi Z3 tsɔana egbea o.
* [Mɔfiala: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Dɔwɔƒe si Wotsɔa Mɔ̃wo Tsoa la me tɔwo](/start-here/developer-resources)

---

## Ganyawo ƒe Kpekpeɖeŋu

* [Z3 nudzraɖoƒe](https://github.com/ZcashFoundation/z3)
* [Z3 ƒe nubabla (abɔ, agbɔsɔsɔmewo, ɖoɖo ŋkɔ)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra-gbalẽa](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet-gbalẽa](https://zcash.github.io/zallet/)
* [Zcash Community Forum  Z3 ƒe nu yeyewo](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Mɔ̃ɖola](https://github.com/Jubrilabdulazeez/z3-launcher) Community control plane over the official Compose stack (ZecHub Hackathon) Nɔviwɔha ƒe mɔ̃ dzi kpɔlawo le nuŋɔŋlɔwo me

