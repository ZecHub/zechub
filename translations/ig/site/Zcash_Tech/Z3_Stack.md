<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

**Z3 Stack** bụ ikpo okwu node nke Zcash Foundation chịkọtara: **Zebra** (full node) + **Zallet** (e-akpa ego full-node), yana indexer **Zaino** nhọrọ. Ọ bụ ihe e bu n'obi iji dochie usoro `zcashd` kwụụrụ onwe ya, nke jikọtara consensus na e-akpa ego n'otu binary ma kwụsị ndụ ya na 18 Julaị 2026.

Mmejuputa ntụaka bụ ọrụ Compose nke Docker dị na [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Ọnọdụ, 14 November 2026: pins ndabara dị tupu NU7.** E mere mgbanwe ikpeazụ na `docker-compose.yml` nke Z3 na 10 August 2026. Ọ ka na-etinye `zfnd/zebra:6.2.3` na `zodlinc/zallet:v0.1.0-beta.1`, nke malitere dị ka binary `zallet-zaino`. [NU7](NU7.md) malitere ịrụ ọrụ na Mainnet na block 3,543,405 na 6 November 2026, ma ọ bụ naanị Zebra 7.0.0 ma ọ bụ nke ọhụrụ na-agbaso ya: Zebra 6.x na-anọgide na iwu ochie ma dapụ n’ezi chain. Zallet v0.1.0-beta.4, mwepụta mbụ na-agbaso NU7, anaghịzi ebufe `zallet-zaino` ma ọlị. Lelee repo maka pins ọhụrụ tupu i tinye ya n’ọrụ. Ọ bụrụ na ị jiri aka gị dochie ihe oyiyi ndị ahụ, mara na backend `zebra` fọdụrụ nke Zallet na-agụ ndekọ ọnọdụ nke Zebra ozugbo, ya mere Zallet ga-agbarịrị n’otu host ahụ ma nwee ohere ịbanye na ndekọ ahụ ([Zallet](Zallet.md)).

---

## Na nkenke

* Z3 **abụghị onye ahịa consensus ọhụrụ**. Ọ bụ ụzọ e si ejikọ stack post-`zcashd` ọnụ: Zebra na-enyocha chain, Zallet na-ejide igodo ma na-enye ọrụ wallet RPC, Zaino (nhọrọ) na-asụ protocol gRPC nke lightwalletd.
* `zcashd` bụ node + wallet jikọtara ọnụ. Z3 **na-ekewa ọrụ ndị a**. Exchanges, pool ịgwụputa, na ndị ọzọ na-arụ wallet full-node na-akwaga n’usoro a kama ịkwaga naanị na Zebra.
* Enwere ike ịrụ ọrụ Compose atọ kewapụrụ iche n’otu host: **mainnet**, **testnet**, na **regtest**.
* Mmekọrịta mbụ nke Mainnet na-ewe ihe dị ka **awa 24–72** ma chọọ ihe dị ka **300 GB**. Regtest na-amalite n’ime sekọnd, ọ bụkwa ebe kwesịrị ekwesị ịmụta stack a.
* N’ime onyonyo Z3 a kpọchiri akpọchi, Zallet na-eji backend `zallet-zaino` ya (ọba akwụkwọ indexer nke Zaino) ma na-agwa Zebra okwu site na JSON-RPC. Zallet wepụrụ backend ahụ na v0.1.0-beta.4; Zallet dị ugbu a na-agụ ọnọdụ Zebra ozugbo. Ọrụ Zaino kwụụrụ onwe ya dị mkpa naanị ma ọ bụrụ na ịchọrọ endpoint dakọtara na lightwalletd maka wallet ndị ọzọ.
* Zallet ka nọ na **beta**. Mgbanwe nwere ike imebi ndakọrịta nwere ike ịchọ ka ihichapụ ma mepụta wallet ahụ ọzọ. Ejila ya dịka sọftụwia nlekọta ego emechara nke ọma maka nnukwu ego.

---

## Ihe mere Z3 ji dị

N'ọtụtụ ndụ Zcash, `zcashd` bụ ma full node ntụaka ma naanị e-akpa ego full node mmepụta. Nhazi ahụ bụ nke exchanges, pools, na ndị nlekota jikọtara megide.

`zcashd` alala ezumike nka. Consensus kwagara na [Zebra](/zcash-tech/zebra-full-node) (ma ugbu a kwa na [Zakura](/zcash-tech/zakura-node)). E-akpa ego agbakwunyere kwagara na [Zallet](https://github.com/zcash/zallet). Ijere e-akpa ego light ozi na-apụ na [lightwalletd](/zcash-tech/lightwallet-nodes) gaa na [Zaino](/zcash-tech/zaino).

Akụkụ atọ ahụ bụ repository dị iche iche, usoro ntọhapụ dị iche iche, na config dị iche iche. Z3 bụ gluu: image akpọchiri, nyocha ahụike nke na-eme ka e-akpa ego ghara ịmalite ruo mgbe node mekọrịtara, ports na volumes maka netwọkụ nke ọ bụla, yana ụzọ onye ọrụ edere n'akwụkwọ.

Aha ahụ bụ mkpirisi okwu nkịtị n'ọrụ gburugburu ebe obibi — Zebra, Zaino, Zallet — n'agbanyeghị na faịlụ Compose ndabara na-amalite naanị Zebra na Zallet. Zaino bụ profile Compose, ọ bụghị usoro nke atọ a chọrọ.

---

## Nhazi

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

| Ngwa | Ọrụ ya na Z3 | Ọ dị mkpa? |
| --- | --- | --- |
| **Zebra** | Ọ na-emekọrịta ma na-enyocha chain, gossip, JSON-RPC na njedebe ahụike | Ee |
| **Zallet** | E-akpa ego full-node. Image beta.1 a kpọchiri na-agba backend Zaino-library (`zallet-zaino`, e wepụrụ na beta.4 Zallet) ma jikọọ ozugbo na JSON-RPC Zebra. Ọ **anaghị** akpọ container Zaino kwụụrụ onwe ya | Ee |
| **Zaino** | Indexer kwụụrụ onwe ya. gRPC dakọtara na lightwalletd maka light clients ndị si n'èzí, tinyere proxy JSON-RPC maka ndị na-enyocha data na faucets | Mba — `--profile indexer` |

Z3 na-akpọchi nsụgharị image na `docker-compose.yml`. Jiri `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, ma ọ bụ `Z3_ZALLET_IMAGE` dochie ya ma ọ bụrụ na ịchọrọ tag ọzọ.

---

## Otu nke a si dị iche na zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Asụsụ | C++ (fork Bitcoin) | Ọrụ Rust, nke Docker Compose na-ahazi |
| Ụdị usoro | Otu binary: node + e-akpa ego | Containers node na e-akpa ego dị iche |
| Consensus | Alala ezumike nka (EOS 18 Julaị 2026) | Zebra (ma ọ bụ node ọzọ kwekọrọ) |
| E-akpa ego | `wallet.dat` arụnyere n'ime ya | Zallet, datadir e ji age zoo |
| Ndị ahịa light | Ọtụtụ mgbe lightwalletd dị iche | Profile Zaino nhọrọ |
| Config | `zcash.conf` | Faịlụ maka netwọkụ ọ bụla n'okpuru `config/<network>/` tinyere faịlụ env Compose |
| Netwọkụ n'otu host | Mkpọkọta port na-esiri ike | Ọkwa mbụ: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ọ bụrụ na ị ka nwere e-akpa ego `zcashd`, jiri ndu mbufe nke ZecHub [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) na iwu `migrate-zcashd-wallet` nke Zallet kama idetuo `wallet.dat` n'ime volume Z3.

---

## Netwọkụ

Z3 bụ ọrụ Compose atọ nọọrọ onwe ha. Ha anaghị ekerịta ports ma ọ bụ volumes.

| Netwọkụ | Aha ọrụ | Jiri ya maka | Mmekọrịta mbụ | Ezigbo ego |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Mmepụta | awa 24–72 | Ee |
| **testnet** | `z3-testnet` | Nhazi tupu mmepụta na netwọkụ ule ọha | awa 2–12 | Mba (ule ZEC) |
| **regtest** | `z3-regtest` | Omume mpaghara: blocks ozugbo, enweghị peers | Sekọnd | Mba |

Ndị ọrụ ọhụrụ kwesịrị ịmalite na **regtest**, gosi na RPC na usoro e-akpa ego na-arụ ọrụ, wee kwaga na testnet ma ọ bụ mainnet.

---

## Ports host ndabara

E bu n'obi ka netwọkụ atọ ahụ biri n'otu igwe. Uru ndị dị n'okpuru bụ ndabara e bipụtara; nke ọ bụla nwere ike dochie ya site na mgbanwe env `Z3_*` kwekọrọ. Matrix iwu bụ [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Ọrụ | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC nke Zebra | 8232 | 18232 | 29232 |
| P2P nke Zebra | 8233 | 18233 | (ebipụtabeghị) |
| Ahụike Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC nke Zaino (profile indexer) | 8137 | 18137 | 28137 |
| JSON-RPC nke Zaino (profile indexer) | 8237 | 18237 | 28237 |
| RPC nke Zallet | 28232 | 40232 | 50232 |

N'ime netwọkụ Compose, ọrụ na-achọta ibe ha site n'aha (`zebra`, `zaino`, `zallet`).

---

## Data na nkwado ndabere

| Volume | Ihe ọ na-edobe | Kwado ya? |
| --- | --- | --- |
| `z3-<network>-chain` | Ọnọdụ chain Zebra (~300 GB mainnet) | Nhọrọ — enwere ike imekọrịta ya ọzọ |
| `z3-<network>-zallet` | Database e-akpa ego ezoro ezo **na** njirimara age na-emeghe ya | **Ee — nke a bụ naanị volume a ga-akwado** |
| `z3-<network>-zaino` | Ọnọdụ indexer (naanị na profile indexer) | Nhọrọ — enwere ike iwughachi ya |
| `z3-<network>-cookie` | Kuki RPC nke Zebra | Mba — a na-emepụta ya ọzọ |

Iji tinye ọnọdụ chain na disk ọzọ tupu mmalite mbụ:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` na-akwụsị stack ma debe volumes. Ịgbakwunye `-v` na-ehichapụ ha ma manye mmekọrịta zuru ezu ọzọ. Tinye `--profile "*"` ka e wee kwatuo n'ezie ọrụ ndị profile na-achịkwa (indexer, nlekota).

---

## Ịmalite

Ihe a chọrọ tupu amalite: Engine Docker, Compose Docker v2.24.4+, Git. A chọrọ `openssl` naanị maka regtest.

### Regtest (ụzọ kacha ọsọ iji hụ stack ahụ)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Lee [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) maka iwu ule.

### Mainnet (mbido nkeji abụọ)

Zebra ga-emecharịrị mmekọrịta tupu Zallet aba uru. Ịmalite Zallet n'isi na-eme ka ọ banye na loop ịmalitegharịa ruo mgbe `/ready` bụ eziokwu.

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

Testnet bụ otu usoro ahụ na `.env.testnet` na `./scripts/check-zebra-readiness.sh 18080`.

Ndozi n'okpuru `config/<network>/` na-anọgide na mpaghara ma dịgide mgbe `git pull` gachara.

### Profiles nhọrọ

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Ports Grafana ndabara bụ 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Ihe ndị onye ọrụ kwesịrị ịma

* **Ihe oyiyi akpọchiri.** Z3 anaghị agbanwe nwayọ gaa na `:latest`. Mee ka pin dị ọhụrụ n’ime mgbanwe e nyochara, ma ọ bụ tọọ `Z3_<SERVICE>_IMAGE`. Pin ndị ahụ agbanwebeghị kemgbe Ọgọst 2026, ya mere ha dị tupu NU7 (lee ọkwa ọnọdụ dị n’elu).
* **Containers na-abụghị root.** A na-ewepụ ikike Linux. Nyocha ahụike na-egbochi e-akpa ego ruo mgbe Zebra dị njikere. Iwu ịmalitegharị na-arụ ọrụ na ndabara.
* **Ndekọ.** Z3 anaghị akpọchi onye na-anya ndekọ. Tọọ oke nha n’ime nhazi daemon Docker, ma ọ bụ ndekọ ga na-eto n’enweghị oke n’ime node na-arụ ọrụ awa 24 kwa ụbọchị.
* **P2P.** Mainnet na testnet na-ebipụta ọdụ ụgbọ mmiri P2P nke Zebra. N’azụ NAT, tọọ `ZEBRA_NETWORK__EXTERNAL_ADDR` ka ọ bụrụ Adreesị akpa ego ndị peers kwesịrị ịkpọ. Regtest enweghị peers.
* **Zaino na ARM.** Ihe oyiyi Zaino sitere n’aka ndị mepụtara ya bụ naanị `linux/amd64`. Na Apple Silicon ọ na-arụ ọrụ site na nṅomi ma ọ bụrụ na i wughị ya site na koodu isi mmalite. Zebra na Zallet na-akwado ọtụtụ ụdị usoro nhazi.
* **Ndị ọbịa kekọrịtara.** A naghị edobe oke CPU ma ọ bụ ebe nchekwa na ndabara. Tinye `deploy.resources.limits` n’ime faịlụ override ma ọ bụrụ na e dobeghị igwe ahụ naanị maka node.

Ndepụta nyocha na FAQ maka mmepụta: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Onye kwesịrị ịgba Z3

**Dabara nke ọma**

* Exchanges, ndị nlekota, na pools ịgwụputa jiri `zcashd` dịka node-na-e-akpa ego
* Ndị ọrụ chọrọ RPC e-akpa ego full node akwadoro megide Zebra emekọrịtara
* Ndị mmepụta chọrọ mainnet, testnet, na regtest n'akụkụ ibe ha
* Onye ọ bụla na-ebulite endpoint nkeonwe kwekọrọ na lightwalletd site na profile Zaino

**Ọtụtụ mgbe ọ bụghị ngwá ọrụ ziri ezi**

* Ndị ọrụ ikpeazụ chọrọ naanị izipu na ịnata ZEC — jiri e-akpa ego dị mfe dịka ZODL / Zashi, Zingo, ma ọ bụ Zkool (nke bụ onye nọchiri YWallet nke a ka na-elekọta)
* Ndị chọrọ naanị ịkwado chain — mee ka Zebra (ma ọ bụ Zakura) na-arụ ọrụ naanị ya
* Ndị chọrọ naanị inye compact blocks — mee ka Zebra + Zaino, ma ọ bụ Zebra + lightwalletd na-arụ ọrụ, na-enweghị Zallet

---

## Peeji metụtara ya

* [Zebra Full Node](/zcash-tech/zebra-full-node) — node consensus Z3 na-ekpuchi
* [Zaino](/zcash-tech/zaino) — profile indexer nhọrọ
* [Full Nodes](/zcash-tech/full-nodes) — Zebra, Zakura, na zcashd lara ezumike nka
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — ihe ndị ahịa light na-ekwu okwu na ya
* [Zakura Node](/zcash-tech/zakura-node) — full node ọzọ; ọ bụghị ihe Z3 na-ebunye taa
* [Ndu Mbufe: zcashd gaa Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Akụrụngwa Onye Mmepụta](/start-here/developer-resources)

---

## Akụrụngwa

* [Repository Z3](https://github.com/ZcashFoundation/z3)
* [Nkwekọrịta Z3 (ports, volumes, aha ọrụ)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Akwụkwọ Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Akwụkwọ Zallet](https://zcash.github.io/zallet/)
* [Zcash Community Forum — mmelite Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — control plane obodo n'elu stack Compose gọọmentị (ZecHub Hackathon)
