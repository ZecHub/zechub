<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack (Ɔhyeɛ a wɔsɔ mu)

Z3 Stack no yɛ Zcash Foundation's packaged node platform: Zebra (full-node) + Zallet, a optional Zaino indexer wɔ mu. ɛyɛ ɔdan bi a ɛgyina hɔ ma wɔn ankasa de di dwuma na wɔde hyɛ ne ho so sɛ ɛno ara bɛyɛ adwuma ama amanɔnefoɔ nyinaa. `zcashd` kwan a wɔfa so de consensus ne wallet di dwuma wɔ ɔfã baako mu na ɛbɛwie adwuma no July 18, 2026.

Reference implementation yɛ Docker Compose project wɔ United States. [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Z3 nyɛ "mfasoɔ a w'ama afoforo anya" no. Ɛyɛ sɛnea woyɛ adwuma wɔ baabi-`zcashd` faako: Zebra di chain no ho dwuma, Zallet na ɛhwɛ keys so ma wallet RPC, ne Zaino (ɛwɔsɛ) kasa lightwalletd gRPC protocol.
* `zcashd` Z3 ** kyekyɛ saa dwumadie no**. Nkrataa a wɔde di dwuma, ne wɔn a wɔyɛ adwuma wɔ sika ho nneɛma mu nyinaa tu kɔ faako yi sen sɛ wɔbɛkɔ akɔfa Zebra nko ara so.
* Compose dwumadie a wɔatu no betumi adi dwuma wɔ baabi baako: **mainnet**, **testnet** ne **regtest**.
* Mainnet kan sync no yɛ nnɔnhwerew **2472** ne bɛyɛ GB 300. Regtest ba wɔ anibu kakraa bi mu na ɛyɛ beae pa a wobɛsua stack no.
* Zallet de Zaino's indexers nkrataa mu nsɛm ne Zebra kasa wɔ JSON-RPC so. Sɛ wopɛ lightwalletd a ɛne no di nsie ma abɛɛfo wallets nko ara na wohia saa adwuma yi.
* Zallet wɔ **beta** mu. Nsakrae a wobɛyɛ no betumi ama woayi ne sika krataa no afi hɔ na w'asan ayɛ foforo. Mfa ho sɛ software a wɔde sie nneɛma akɛse bi so awieeɛ.

---

## Deɛ enti a Z3 wɔ hɔ no

Wɔ Zcash nkwa nna mu no, na ɔhwɛ sɛ ne nsa bɛka sika a ɔde resesaw akatua biara. `zcashd` Saa mfoni no yɛ nea nkyereso, nnwumakuo ne wɔn a wɔhwɛ so nya ho mfaso.

`zcashd` W'ahyehyɛde no akɔ n'akyi. [Zebra](/zcash-tech/zebra-full-node) (na afei nso) [Zakura](/zcash-tech/zakura-node)Ԑwɔsԑ wohyԑ no sԑnea wobedi dwuma. [Zallet](https://github.com/zcash/zallet)Ɔdan a wɔde sika nkontaabu tiawa ma no fi hɔ. [lightwalletd](/zcash-tech/lightwallet-nodes) to [Zaino](/zcash-tech/zaino).

Saa nkrataafa yi yɛ nnwoma a wɔagye ato hɔ, nea wɔde to gua na ɛsan nso hyɛ no nsow. Z3 ne adebɔ: mfoni a wɔayɛ ho adwuma, apɔwmuden nsesaeɛ a ɛma wallet no so kosi sɛ node no bɛyɛ sync, ports biara-network ne mpɔw ahorow, ɛne ɔhwɛfoɔ akwankyerɛ krataa mu nsɛm nyinaa.

Din no yɛ nhyehyɛeɛ a ɛnnyɛ adwuma ho ntweasoɔ  Zebra, Zaino, Zallet  mpo sɛ nea wɔhyɛ ase di dwuma ne sɛ Compose fael no hyɛ aseɛ ma zebra na zallet. zaino yε compose profile bi, ɛnyɛ ade foforɔ biara.

---

## Abɔdeyɛ mu adansiɛ

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

Ԑwɔsԑ sԑ wohyԑ no nsow wɔ Z3 mu a?
| --- | --- | --- |
**Zebra**. Syncs na validates no chain, gossip, JSON-RPC, health endpoint... Yes
**Zallet**. Full-node wallet. Embeds Zaino libraries. Connects directly to Zebra JSON-RPC. Does not call the standalone Zaino container? Yes
**Zaino**. Standalone indexer. lightwalletd-compatible gRPC ma external light clients, plus a JSON-RPC proxy for explorers and faucets No  `--profile indexer` |

Z3 pin mfoni nkyerɛaseɛ wɔ mu. `docker-compose.yml`. Fa di dwuma wɔ ne nyinaa so `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, or `Z3_ZALLET_IMAGE` sɛ wohia krataa foforo a.

---

## Sεnea eyi yε soronko fi zcashd ho no

| | zcashd | Z3 |
| --- | --- | --- |
 kasa C++ (Bitcoin fork) Rust dwumadie, a wɔde Docker Compose di dwuma.
 Process model. One binary: node + wallet. Separate node and wallet containers. - (Ɔkwan a wɔfa so de di dwuma)
 Consensus. Retired (EOS 18 July 2026) Zebra (anaa node foforo a ɛne no di nsie)
Kɔntaktɔ. Wɔayɛ no mu-mu `wallet.dat` Zallet, mfe a wɔde asie ho nsɛm.
 light clients. Ɔtaa yε ɔfã bi a εwɔ hɔ ma lightwalletd no, optional Zaino profile
Nhyehyɛeɛ. `zcash.conf` Per-network files wɔ ase hɔ no so. `config/<network>/` plus kyerɛw env fael no.
 Networks on one host. Port clashes painful. First-class: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Sɛ wowɔ wo ho a, ma w'ani nnye. `zcashd` wallet, use ZecHub’s [akwantu akwankyerɛfoɔ](/guides/migration-guide-zcashd-to-zebrad-zallet) and Zallet’s `migrate-zcashd-wallet` hyɛ paneɛ no sɛ anka wobɛyɛ ne copy `wallet.dat` wɔ Z3 mu.

---

## Networks (Neteԑ)

Z3 yɛ nnwumakuw a wɔn ho nni mu, na wonni port anaa volume biara.

网络项目名 使用它进行首次同步 真钱的资金.
| --- | --- | --- | --- | --- |
wԑn Aban Ahyehyԑde no mu biako. `z3-mainnet` Ԑwɔsԑ wohyԑ no sԑnea ԑfata.
wԑn asᴐredan mu no, y'abobɔ nnwom. `z3-testnet` de bԑto dwa wɔ baguam nhwehwεmu nshyeshԑm so: 2×12 hᴐn. (Asɔre ZEC) Dabi, ԑnyԑ sԑ wobedi kan ahu nsesaeԑ a' edi mu no bi na wͻanya ne nyinaa afi saa nkransem yi ase de adi dwuma bio.
mpԑ sԑ wobɔ mmɔden yԑ no saa. `z3-regtest` mpεfo: Ɔman mu adesua, mmrԑ a w'ayi no asi hɔ ntɛmntɛm. Mprenu-Mprɛnsa - Dabi!

Ɛsɛ sɛ wɔn a wɔyɛ adwuma foforo no fi ase wɔ "regtest" so, na wogye RPC ne sika kotoku mu di ansa na wɔatumi akɔ testnet anaa mainnet.

---

## Ntentan a wɔhyɛ no ase ma wɔn ho so port ahorow

Wɔayɛ sɛ saa network mmiɛnsa yi nyinaa bɛbom atena afidie baako so. N'abodin a ɛwɔ ase ha no yɛ nea wɔatintim; obiara betumi afa deɛ ɛne wɔn bɔ abira so asiw ano `Z3_*` env var. The canonical matrix is: "Ɛyɛ sɛ wo de, na w'akyerɛ mu wɔ kasa foforo no mu". [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

服务 Mainnet Testnet Regtest
| --- | --- | --- | --- |
 Zebra JSON-RPC 8232 18232 29232
| Zebra P2P | 8233 | 18233 | (not published) |
pɔn a w'aka no (Zebra health)`/ready`) | 8080 | 18080 | 28080 |
Zaino gRPC (indexer profile) 8137 18137 28137.
Zaino JSON-RPC (indexer profile) 8237 18237 28237.
Zallet RPC 28232 40232 50232 - Abɔdin: Ɔmanpanyin.

Wͻ Compose network no mu no, yεn dwumadi ahorow a w'aka ho asεm (`zebra`, `zaino`, `zallet`).

---

## Data ne backup ahodoɔ

Ԑhe na ԑhyԑ no? (Ɔkwan a wɔfa so di nkitaho) Ɔdan bɛn mu na y'atutu fam yi?
| --- | --- | --- |
| `z3-<network>-chain`  Zebra chain state (~300 GB mainnet) Optional  re-syncable.
| `z3-<network>-zallet`  Encrypted wallet database ne mfe a obi adi de ayi no ano. Ɛwɔ mu sɛ, eyi nkutoo na ɛsɛsɛ yɛ backup wɔ ho**
| `z3-<network>-zaino`  Indexer state (ne indexer profile nkoaa)  Optional  rebuildable 
| `z3-<network>-cookie`  Zebra RPC cookie. No  regenerated.

Sɛ wode chain state bɛhyɛ disk foforɔ mu ansa na woafi ase:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` Sɛ wode ka ho a, ɛtwa toɔ na ɛma wohwɛ so. `-v` deletes wɔn na hyɛ no ma ɔsan yɛ sync. Fa ka ho `--profile "*"` Enti profile-gated services (indexer, monitoring) no ankasa na wɔsan bubu.

---

## Mfitiaseɛ a yɛreyɛ no.

Nkrataa a ɛho hia: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` wo hia regtest nkoaa.

### Regtest (Ɔkwan a ɛtwa toɔ sen biara a wobɛhwɛ no)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Hwɛ so. [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) de sɔ commands hwɛ.

### Mainnet (two-phase boot)

Ɛsɛ sɛ Zebra wie syncing ansa na Zallet betumi adi dwuma. Sɛ wode Zallet di kan a, ɛbɛma no asan akɔ so ayɛ loop kosi sɛ ɛbɛba mu bio `/ready` ɛyɛ nokware.

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

Testnet yɛ nsoroma koro no ara a ɛne: `.env.testnet` ne sɛ, `./scripts/check-zebra-readiness.sh 18080`.

N'akyi nsɛm wɔ ase ha: `config/<network>/` tena hɔ na nya nkwa `git pull`.

### Nhyehyɛeɛ a wobɛtumi de adi dwuma

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Default Grafana ports yɛ 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Ɔsomfoɔ no nkaeɛ

* **Mfonini a wɔde asisi hɔ.** Z3 no mfa komm ntutu fam wɔ so. `:latest`. Bump a pin in an reviewed change, or set no so yɛ den sɛ wobɛtumi asesa anaa woasesa. `Z3_<SERVICE>_IMAGE`.
* **Non-root containers.** Linux tumi a wɔtwe no. Akwahosan ho nhwehwɛmu hyɛ sika kotoku no mu kosi sɛ Zebra bɛyɛ krado. N'asekyerɛfo nhyɛaseɛ yɛ nea ɛwɔ hɔ bere nyinaa.
* **Logs.** Z3 mfa logging driver nto hɔ. Sete size limits wɔ Docker daemon config anaa logs nyin a wɔnfa ho nhyehye 24/7 node so.
* **P2P.** Mainnet ne testnet bɔ Zebra's P2P port no dawuro. NAT akyi, set `ZEBRA_NETWORK__EXTERNAL_ADDR` Regtest nni peers biara.
* ** Zaino wɔ ARM so.** Agyinabea a ɛwɔ Zaino anim no yɛ: `linux/amd64` Sɛ woamfa mfidie a w'atumi de adi dwuma no amfiri baabiara na anyɛ saa a, ɛbɛdi dwuma wɔ Apple Silicon so. Zebra ne Zallet yɛ multi-arch.
* **Nneɛma a w'aka abom ayɛ.** Wonnye CPU anaa nkae hyeɛ biara nto mu. Add `deploy.resources.limits` Wɔ override file mu sε box no nni hɔ a wɔayi ama node.

Adwumakuo no ho nhwehwɛmu krataa ne FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Hwan na ɛsɛ sɛ odi Z3 so?

*Ɛfata no yiye*

* Asesa, nnwumakuo a wɔde wɔn ho sie nneɛma no ne baabi a wɔhwe sika na wɔde yɛ adwuma. `zcashd` sɛ node-plus-wallet
* Operators a w'epɛ ɔfese-node nyinaa RPC wɔ Zebra synced ho no, wɔn ani gye ho.
* Developer a wohia mainnet, testnet ne regtest faako no
* Obiara a ɔde ne ho hyɛ lightwalletd-compatible awieɛ bea no mu wɔ Zaino profile so.

**Nneɛma a ɛnyɛ papa no taa yɛ saa**

* Ewieifoɔ a wɔn hia sɛ wɔde ZEC  to obi so na wɔfa saa kwan yi so yɛ adwuma no de, fa light wallet te sԑ ZODL/Zashi, Zingo anaa YWallet di dwuma.
* Nnipa a wɔpɛ sɛ wɔsɔ nnipakan no mu nko ara na wɔn de Zebra (anaa Zakura) di dwuma.
* Nnipa a wɔpɛ sɛ wɔsom nkyea akɛseɛ nko ara no  tu Zebra + Zaino, anaa Zebra+ lightwalletd, a wɔnni Zallet

---

## Nkrataafa a ɛfa ho

* [Zebra Nodoɔ a Ɛwɔ Mu Nyinaa](/zcash-tech/zebra-full-node)  consensus node Z3 wraps (mfirinhyia a w'atumi akae)
* [Zaino](/zcash-tech/zaino)  indexer profile a w'atumi ayi no adi wɔ wo mpuntuo mu
* [Nkɔmmɔ a ɛkorɔn no nyinaa](/zcash-tech/full-nodes)  Zebra, Zakura ne wɔn a wɔagyae adwuma no zcashd
* [Lightwallet Nodes (Ɔkwan a wɔfa so de sika fa nneɛma mu)](/zcash-tech/lightwallet-nodes)  nea ne nkyerεkyerεfo kasa kyerε no
* [Zakura Ntam no](/zcash-tech/zakura-node)  alternative full node; ɛnyɛ deɛ Z3 de ma nnɛ yi
* [Migration Guide: zcashd to Zebrad/Zallet (Ɔkwankyerɛ a ɛfa akwantu ho)](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Developer Resources (Nkɔanimfoɔ Asetena)](/start-here/developer-resources)

---

## Nneɛma a wɔde bɔ afɔre

* [Z3 nkuraaseԑ akoraeɛ](https://github.com/ZcashFoundation/z3)
* [Z3 contract (ports, volumes, project names)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [The Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet Nhoma no](https://zcash.github.io/zallet/)
* [Zcash Community Forum  Z3 nsɛm a aba so foforɔ](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher (Ɔsɔfo)](https://github.com/Jubrilabdulazeez/z3-launcher)  fekuw no so dwumadie a ɛhwɛ Compose stack (ZecHub Hackathon) so.

