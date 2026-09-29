<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack (Kifungu cha Msaada)

**Z3 Stack** ni Zcash Foundation's pakiti node jukwaa: * Zebra (full Node) + * Zallet* (kamili-node mkoba), na hiari ya indexer Zaino. Ni intended badala kwa kusimama peke yake `zcashd` mchakato, ambayo bundled makubaliano na mfuko wa fedha katika binary moja na kufikiwa mwisho wa maisha juu ya 18 Julai 2026.

Utekelezaji wa kumbukumbu ni mradi Docker Compose katika [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Z3 ni **si mpya makubaliano mteja. Ni jinsi gani wewe kuendesha baada ya-`zcashd` stack pamoja: Zebra inathibitisha mlolongo, Zallet ana funguo na hutumikia mkoba RPC, na Zaino (hiari) huzungumza lightwalletd gRPC itifaki.
* `zcashd` bundled node + mkoba. Z3 **splits wale majukumu**. kubadilishana, madini ya mifereji na wengine full-node mfuko wa fedha watendaji kuhamia kwa hii mchanganyiko badala ya Zebra peke yake.
* Miradi mitatu ya kutenganisha inaweza kuendesha kwenye jeshi moja: ** mainnet**, ** testnet** na ** regtest.
* Mainnet kwanza sync ni juu ya utaratibu wa ** 24 72 masaa** na kuhusu ** 300 GB. Regtest huja katika sekunde na mahali sahihi kujifunza stack.
* Zallet embeds Zaino ya indexer maktaba na mazungumzo kwa Zebra juu JSON-RPC. kujitegemea za huduma ni zinahitajika tu kama unataka lightwalletd sambamba mwisho hatua kwa ajili ya mikoba nje.
* Zallet ni katika ** beta. kuvunja mabadiliko inaweza kuhitaji kufuta na recreate mkoba. Je, si kutibu kama kukamilika ulinzi programu kwa ajili ya kiasi kikubwa cha fedha.

---

## Kwa nini Z3 ipo?

Kwa wengi wa maisha Zcash ya, `zcashd` ilikuwa wote kumbukumbu full node na tu uzalishaji kamili-node mkoba. kubuni kwamba ni nini kubadilishana, mabwawa, na watunzaji jumuishi dhidi ya.

`zcashd` ni kustaafu. makubaliano wakiongozwa na [Zebra](/zcash-tech/zebra-full-node) (na sasa pia [Zakura](/zcash-tech/zakura-node)) mkoba iliyoingia wakiongozwa na [Zallet](https://github.com/zcash/zallet)Mwangaza-mkoba kuwahudumia ni kusonga kutoka [lightwalletd](/zcash-tech/lightwallet-nodes) to [Zaino](/zcash-tech/zaino).

Vipande hivyo vitatu ni hazina tofauti, treni za kutolewa kwa mbali na config. Z3 ndio gundi: picha zilizowekwa alama, ukaguzi wa afya ambao unadumisha mkoba chini hadi node itakaposawazishwa, bandari ya mtandao na kiasi cha habari, na njia iliyoandikwa ya mwendeshaji.

Jina ni informal mazingira ya mfumo wa shorthand  Zebra, Zaino, Zallet hata kama default Kuunda faili tu huanza Zebra na Zallet. zaino ni profile kuandaa, si required tatu mchakato.

---

## Usanifu wa majengo

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

| Kipengele | Jukumu katika Z3 | Inahitajika? |
| --- | --- | --- |
| **Zebra** | Husawazisha na kuthibitisha mnyororo, umbea, JSON-RPC, na sehemu ya mwisho ya afya | Ndiyo |
| **Zallet** | Pochi yenye nodi kamili. Hupachika maktaba za Zaino. Huunganisha moja kwa moja kwenye Zebra JSON-RPC. Je, **hai** huita chombo cha Zaino kinachojitegemea | Ndiyo |
| **Zaino** | Kiashiria cha kujitegemea. gRPC lightwalletd-compatible kwa wateja wa taa za nje, pamoja na proksi ya JSON-RPC kwa wachunguzi na mabomba | No — `--profile indexer` |

Z3 pini picha matoleo katika `docker-compose.yml`. Override na `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, or `Z3_ZALLET_IMAGE` kama unahitaji lebo tofauti.

---

## Jinsi hii tofauti na zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Lugha | C++ (uma ya Bitcoin) | Huduma za kutu, zilizopangwa na Docker Compose |
| Mfano wa mchakato | Panari moja: nodi + pochi | Vyombo tofauti vya nodi na pochi |
| Makubaliano | Alistaafu (EOS 18 Julai 2026) | Zebra (au nodi nyingine inayolingana) |
| Pochi | Imejengewa ndani `wallet.dat` | Zallet, data iliyosimbwa kwa njia fiche ya umri |
| Wateja wa mwanga | Kawaida mkoba tofauti lightwalletd | Wasifu wa hiari Zaino |
| Usanidi | `zcash.conf` | Faili za kila mtandao chini ya `config/<network>/` pamoja na Tunga faili za env |
| Mitandao kwenye seva mwenyeji mmoja | Mgongano mkali wa bandari | Daraja la kwanza: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ikiwa bado una tatizo la damu, tafadhali usisite kuuliza. `zcashd` wallet, use ZecHub’s [mwongozo wa uhamiaji](/guides/migration-guide-zcashd-to-zebrad-zallet) and Zallet’s `migrate-zcashd-wallet` amri badala ya kunakili `wallet.dat` katika kiasi Z3.

---

## Mitandao

Z3 ni tatu kujitegemea kuandika miradi. Wao si kushiriki bandari au kiasi cha habari.

| Mtandao | Jina la mradi | Itumie kwa | Usawazishaji wa kwanza | Fedha halisi |
| --- | --- | --- | --- | --- |
| **mtandao mkuu** | `z3-mainnet` | Uzalishaji | Saa 24–72 | Ndiyo |
| **testnet** | `z3-testnet` | Kuigiza kwenye mtandao wa majaribio wa umma | Saa 2–12 | Hapana (jaribu ZEC) |
| **jaribio la kawaida** | `z3-regtest` | Mazoezi ya ndani: vizuizi vya papo hapo, hakuna wenzao | Sekunde | No |

Waendeshaji mpya wanapaswa kuanza kwa ** regtest **, kuthibitisha RPC na mtiririko wa pochi, kisha kuhamia testnet au mainnet.

---

## Bandari default mwenyeji

Mtandao wote watatu ni maana ya kuishi pamoja kwenye mashine moja. maadili chini ni defaults kuchapishwa; kila mmoja ni overridable kupitia vinavyolingana `Z3_*` env var. Matrix ya canonical ni [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Huduma | Mtandao Mkuu | Mtandao wa Majaribio | Jaribio la Usajili |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (haijachapishwa) |
| Afya Zebra (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (wasifu wa kiashiria) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (wasifu wa kiashiria) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Ndani ya mtandao wa Compose, huduma kutatua kwa jina (`zebra`, `zaino`, `zallet`).

---

## Data na backups

| Kiasi | Ina nini | Je, unahifadhi nakala rudufu? |
| --- | --- | --- |
| `z3-<network>-chain` | Hali ya mnyororo wa Zebra (~300 GB mtandao mkuu) | Hiari — inaweza kusawazishwa tena |
| `z3-<network>-zallet` | Hifadhidata ya pochi iliyosimbwa kwa njia fiche **na** utambulisho wa umri unaoifungua | **Ndiyo — huu ndio ujazo pekee unaopaswa kuhifadhiwa nakala rudufu** |
| `z3-<network>-zaino` | Hali ya kiashiria (ikiwa na wasifu wa kiashiria pekee) | Hiari — inaweza kujengwa upya |
| `z3-<network>-cookie` | Biskuti ya Zebra RPC | Hapana — imezaliwa upya |

Kuweka hali ya mnyororo kwenye diski nyingine kabla ya kuanza kwanza:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` ataacha stack na anaendelea kiasi. Kuongeza `-v` hufuta yao na vikosi re-sync kamili. Kujumuisha `--profile "*"` hivyo huduma profile-gated (indexer, ufuatiliaji) ni kweli kuvunjwa chini.

---

## Kuanza kuanza

Mahitaji: Docker Engine, Docker kutunga v2.24.4+, Git. `openssl` inahitajika tu kwa regtest.

### Regtest (njia ya haraka kuona stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Ona habari hii. [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) kwa amri ya mtihani.

### Mainnet (mbili awamu boot)

Zebra lazima kumaliza kusawazisha kabla Zallet ni muhimu. Kuanza Zallet mapema inafanya upya-mzunguko mpaka `/ready` ni kweli.

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

Testnet ni mtiririko huo na `.env.testnet` na `./scripts/check-zebra-readiness.sh 18080`.

Edits chini ya `config/<network>/` kaa karibu na kuishi. `git pull`.

### Profaili hiari

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

default Grafana bandari ni 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Maelezo ya mwendeshaji

* ** Picha za siri. * Z3 haina kimya-kimya kuelea juu ya `:latest`. Bump pini katika mabadiliko ya upya, au kuweka `Z3_<SERVICE>_IMAGE`.
* **Non-mzizi vyombo.** Linux uwezo ni imeshuka. Checks afya kushikilia mkoba nyuma mpaka Zebra tayari. Kuanzisha upya sera ya juu kwa default.
* ** Logs.** Z3 haina pini dereva wa kumbukumbu. Kuweka mipaka ya ukubwa katika Daemon config Docker au magogo kukua bila bound juu 24/7 node.
* ** P2P.** Mainnet na testnet kuchapisha Zebra ya bandari P2p. Nyuma NAT, kuweka `ZEBRA_NETWORK__EXTERNAL_ADDR` kwa anwani wenzao wanapaswa kupiga. Regtest haina wenzake.
* ** Zaino juu ya ARM. * Upstream picha za Zaino ni `linux/amd64` Katika Apple Silicon ni anaendesha chini ya emulation isipokuwa kujenga kutoka chanzo. Zebra na Zallet ni mbalimbali arch.
* ** Shiriki majeshi.** Hakuna CPU au kumbukumbu mipaka ni kuweka kwa default. Kuongeza `deploy.resources.limits` katika faili override kama sanduku si wakfu kwa node.

Uzalishaji-umbo orodha ya kuangalia na FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Nani anapaswa kuendesha Z3

** Inafaa vizuri**

* Kubadilishana, watunzaji na madini ya kuchimba ambayo ilitumia `zcashd` kama node-plus-mkoba
* Waendeshaji ambao wanataka mkono full-node mkoba RPC dhidi ya Zebra synced
* Watengenezaji ambao wanahitaji mainnet, testnet na regtest kando kwa upande
* Mtu yeyote kusimama juu ya binafsi lightwalletd-ambayo sambamba mwisho kupitia profile Zaino

**Kwa kawaida chombo kibaya**

* Watumiaji wa mwisho ambao wanahitaji tu kutuma na kupokea ZEC  kutumia mkoba mwanga kama vile ZODL / Zashi, Zingo, au YWallet
* Watu ambao wanataka tu kuthibitisha mlolongo  kukimbia Zebra (au Zakura) peke yake
* Watu ambao wanataka tu kutumika vitalu compact  kukimbia Zebra + Zaino, au Zebra plus lightwalletd, bila Zallet

---

## Kurasa zinazohusiana na makala hii

* [Zebra Full Node (Njia ya Kuunganisha)](/zcash-tech/zebra-full-node)  makubaliano node Z3 wraps
* [Zaino](/zcash-tech/zaino)  hiari indexer profile
* [Nodes kamili](/zcash-tech/full-nodes)  Zebra, Zakura na zcashd waliostaafu
* [Nodes Lightwallet](/zcash-tech/lightwallet-nodes)  wateja wa nuru wanazungumza na nini?
* [Zakura Node (Kituo cha Zakura)](/zcash-tech/zakura-node)  mbadala full node; si nini Z3 meli leo
* [Kiongozi wa Uhamiaji: zcashd kwa Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Vifaa vya Watengenezaji wa Programu](/start-here/developer-resources)

---

## Rasilimali

* [Z3 kuhifadhi](https://github.com/ZcashFoundation/z3)
* [Z3 mkataba (bandari, kiasi cha maji, majina ya mradi)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Kitabu cha Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Kitabu cha Zallet](https://zcash.github.io/zallet/)
* [Zcash Jamii Forum  updates za Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher)  ndege ya udhibiti wa jamii juu ya safu rasmi ya kutunga (ZecHub Hackathon)

