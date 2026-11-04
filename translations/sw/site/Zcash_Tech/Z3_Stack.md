<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Stack ya Z3

**Stack ya Z3** ni jukwaa la node lililopakiwa la Zcash Foundation: **Zebra** (full node) + **Zallet** (pochi ya full node), lenye kiorodheshi cha hiari **Zaino**. Ndilo mbadala uliokusudiwa wa mchakato huru wa `zcashd`, ambao uliunganisha makubaliano [consensus] na pochi katika binary moja na ulifikia mwisho wa matumizi tarehe 18 Julai 2026.

Utekelezaji wa marejeleo ni mradi wa Compose wa Docker katika [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Kwa Ufupi

* Z3 **si mteja mpya wa makubaliano**. Ni namna ya kuendesha stack baada ya `zcashd` pamoja: Zebra huthibitisha mnyororo [chain], Zallet huhifadhi funguo na kutoa RPC ya pochi, na Zaino (ya hiari) hutumia itifaki ya gRPC ya lightwalletd.
* `zcashd` iliunganisha node + pochi. Z3 **hutenganisha majukumu hayo**. Masoko ya kubadilishana sarafu [exchanges], mabwawa ya uchimbaji [mining pools], na waendeshaji wengine wa pochi za full node huhamia kwenye mchanganyiko huu badala ya Zebra pekee.
* Miradi mitatu iliyotengwa ya Compose inaweza kuendeshwa kwenye seva pangishi moja: **mainnet**, **testnet**, na **regtest**.
* Usawazishaji wa kwanza wa mainnet huchukua takribani **saa 24–72** na karibu **GB 300**. Regtest huanza ndani ya sekunde chache na ndiyo mahali sahihi pa kujifunza stack hii.
* Zallet hujumuisha maktaba za kiorodheshi za Zaino na huwasiliana na Zebra kupitia JSON-RPC. Huduma huru ya Zaino inahitajika tu iwapo unataka endpoint inayooana na lightwalletd kwa pochi za nje.
* Zallet iko katika **beta**. Mabadiliko yanayovunja uoanifu yanaweza kuhitaji kufuta na kuunda upya pochi. Usiichukulie kama programu kamili ya uhifadhi wa fedha kwa kiasi kikubwa.

---

## Kwa nini Z3 ipo

Kwa sehemu kubwa ya maisha ya Zcash, `zcashd` ilikuwa full node ya marejeleo na pochi pekee ya full node ya uzalishaji. Muundo huo ndio ambao masoko ya kubadilishana sarafu, mabwawa, na wahifadhi wa mali waliunganisha mifumo yao nao.

`zcashd` imestaafishwa. Makubaliano yalihamia kwenye [Zebra](/zcash-tech/zebra-full-node) (na sasa pia kwenye [Zakura](/zcash-tech/zakura-node)). Pochi iliyojengeka ndani ilihamia kwenye [Zallet](https://github.com/zcash/zallet). Huduma kwa pochi nyepesi inahama kutoka [lightwalletd](/zcash-tech/lightwallet-nodes) kwenda [Zaino](/zcash-tech/zaino).

Vipande hivyo vitatu ni hazina tofauti, ratiba tofauti za matoleo, na usanidi tofauti. Z3 ndiyo kiunganishi: picha zilizofungwa toleo, ukaguzi wa hali unaoifanya pochi isianze hadi node isawazishwe, bandari na volyumu kwa kila mtandao, na njia iliyoandikwa kwa waendeshaji.

Jina hili ni ufupisho usio rasmi wa mfumo ikolojia — Zebra, Zaino, Zallet — ingawa faili chaguomsingi ya Compose huanzisha tu Zebra na Zallet. Zaino ni wasifu wa Compose, si mchakato wa tatu wa lazima.

---

## Usanifu

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

| Kipengele | Jukumu katika Z3 | Kinahitajika? |
| --- | --- | --- |
| **Zebra** | Husawazisha na kuthibitisha mnyororo, gossip, JSON-RPC, endpoint ya hali | Ndiyo |
| **Zallet** | Pochi ya full node. Hujumuisha maktaba za Zaino. Huunganishwa moja kwa moja na JSON-RPC ya Zebra. **Haitumii** kontena huru la Zaino | Ndiyo |
| **Zaino** | Kiorodheshi huru. gRPC inayooana na lightwalletd kwa light clients za nje, pamoja na proksi ya JSON-RPC kwa vichunguzi na vyanzo vya sarafu za bure [faucets] | Hapana — `--profile indexer` |

Z3 hufunga matoleo ya picha katika `docker-compose.yml`. Badilisha kwa `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, au `Z3_ZALLET_IMAGE` ikiwa unahitaji lebo tofauti.

---

## Jinsi hii inavyotofautiana na zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Lugha | C++ (fork ya Bitcoin) | Huduma za Rust, zinazoandaliwa kwa Compose ya Docker |
| Muundo wa michakato | Binary moja: node + pochi | Kontena tofauti za node na pochi |
| Makubaliano | Imestaafishwa (EOS 18 Julai 2026) | Zebra (au node nyingine inayoana) |
| Pochi | `wallet.dat` iliyojengeka ndani | Zallet, datadir iliyosimbwa fiche kwa age |
| Light clients | Kwa kawaida lightwalletd tofauti | Wasifu wa hiari wa Zaino |
| Usanidi | `zcash.conf` | Faili za kila mtandao chini ya `config/<network>/` pamoja na faili za mazingira za Compose |
| Mitandao kwenye seva pangishi moja | Migongano ya bandari yenye usumbufu | Kipaumbele cha moja kwa moja: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ikiwa bado una pochi ya `zcashd`, tumia mwongozo wa uhamishaji wa ZecHub katika [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) na amri ya Zallet ya `migrate-zcashd-wallet` badala ya kunakili `wallet.dat` kwenye volyumu ya Z3.

---

## Mitandao

Z3 ni miradi mitatu huru ya Compose. Haishiriki bandari wala volyumu.

| Mtandao | Jina la mradi | Itumie kwa | Usawazishaji wa kwanza | Fedha halisi |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Uzalishaji | Saa 24–72 | Ndiyo |
| **testnet** | `z3-testnet` | Maandalizi katika mtandao wa majaribio wa umma | Saa 2–12 | Hapana (ZEC za majaribio) |
| **regtest** | `z3-regtest` | Mazoezi ya ndani: block za papo hapo, hakuna rika | Sekunde | Hapana |

Waendeshaji wapya wanapaswa kuanza kwenye **regtest**, kuthibitisha mitiririko ya RPC na pochi, kisha kuhamia testnet au mainnet.

---

## Bandari chaguomsingi za seva pangishi

Mitandao yote mitatu imekusudiwa kuwepo pamoja kwenye mashine moja. Thamani zilizo hapa chini ndizo chaguomsingi zilizochapishwa; kila moja inaweza kubadilishwa kupitia kigezo kinacholingana cha mazingira cha `Z3_*`. Jedwali rasmi ni [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Huduma | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC ya Zebra | 8232 | 18232 | 29232 |
| P2P ya Zebra | 8233 | 18233 | (haijachapishwa) |
| Hali ya Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC ya Zaino (wasifu wa kiorodheshi) | 8137 | 18137 | 28137 |
| JSON-RPC ya Zaino (wasifu wa kiorodheshi) | 8237 | 18237 | 28237 |
| RPC ya Zallet | 28232 | 40232 | 50232 |

Ndani ya mtandao wa Compose, huduma hutatuliwa kwa jina (`zebra`, `zaino`, `zallet`).

---

## Data na nakala rudufu

| Volyumu | Kile inachohifadhi | Kufanya nakala rudufu? |
| --- | --- | --- |
| `z3-<network>-chain` | Hali ya mnyororo ya Zebra (~GB 300 kwenye mainnet) | Ya hiari — inaweza kusawazishwa tena |
| `z3-<network>-zallet` | Hifadhidata ya pochi iliyosimbwa fiche **na** utambulisho wa age unaoifungua | **Ndiyo — hii ndiyo volyumu pekee inayopaswa kufanyiwa nakala rudufu** |
| `z3-<network>-zaino` | Hali ya kiorodheshi (ikiwa na wasifu wa kiorodheshi pekee) | Ya hiari — inaweza kujengwa upya |
| `z3-<network>-cookie` | Kuki ya RPC ya Zebra | Hapana — hutengenezwa upya |

Ili kuweka hali ya mnyororo kwenye diski nyingine kabla ya kuanza kwa mara ya kwanza:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` husimamisha stack na huhifadhi volyumu. Kuongeza `-v` huzifuta na kulazimisha usawazishaji kamili upya. Jumuisha `--profile "*"` ili huduma zinazodhibitiwa na wasifu (kiorodheshi, ufuatiliaji) ziondolewe pia.

---

## Kuanza

Masharti ya awali: Engine ya Docker, Compose ya Docker v2.24.4+, Git. `openssl` inahitajika kwa regtest pekee.

### Regtest (njia ya haraka zaidi ya kuona stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Tazama [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) kwa amri za majaribio.

### Mainnet (uanzishaji wa awamu mbili)

Zebra lazima imalize kusawazisha kabla ya Zallet kuwa na manufaa. Kuanzisha Zallet mapema huifanya irudie kuanzishwa hadi `/ready` iwe kweli.

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

Testnet hutumia mtiririko huohuo kwa `.env.testnet` na `./scripts/check-zebra-readiness.sh 18080`.

Marekebisho chini ya `config/<network>/` hubaki ya ndani na hudumu baada ya `git pull`.

### Wasifu wa hiari

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Bandari chaguomsingi za Grafana ni 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Maelezo kwa waendeshaji

* **Picha zilizofungwa toleo.** Z3 haielei kimyakimya hadi kwenye `:latest`. Ongeza toleo lililofungwa katika mabadiliko yaliyopitiwa, au weka `Z3_<SERVICE>_IMAGE`.
* **Kontena zisizo za root.** Uwezo wa Linux huondolewa. Ukaguzi wa hali huizuia pochi kuanza hadi Zebra iwe tayari. Sera ya kuanzisha upya imewashwa kwa chaguomsingi.
* **Kumbukumbu.** Z3 haifungi dereva wa kumbukumbu. Weka mipaka ya ukubwa katika usanidi wa daemon wa Docker la sivyo kumbukumbu zitakua bila kikomo kwenye node ya saa 24/7.
* **P2P.** Mainnet na testnet huchapisha bandari ya P2P ya Zebra. Ukiwa nyuma ya NAT, weka `ZEBRA_NETWORK__EXTERNAL_ADDR` kwenye anwani ambayo rika zinapaswa kupiga. Regtest haina rika.
* **Zaino kwenye ARM.** Picha ya upstream ya Zaino ni ya `linux/amd64` pekee. Kwenye Apple Silicon huendeshwa kwa emulation isipokuwa ujenge kutoka chanzo. Zebra na Zallet zina usanifu mwingi.
* **Seva pangishi zinazoshirikiwa.** Hakuna mipaka ya CPU au kumbukumbu iliyowekwa kwa chaguomsingi. Ongeza `deploy.resources.limits` katika faili ya kubatilisha ikiwa mashine haijatengwa kwa node.

Orodha ya ukaguzi ya uzalishaji na Maswali Yanayoulizwa Mara kwa Mara: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Nani anapaswa kuendesha Z3

**Inafaa**

* Masoko ya kubadilishana sarafu, wahifadhi wa mali, na mabwawa ya uchimbaji yaliyotumia `zcashd` kama node-pamoja-na-pochi
* Waendeshaji wanaotaka RPC ya pochi ya full node inayoungwa mkono dhidi ya Zebra iliyosawazishwa
* Wasanidi programu wanaohitaji mainnet, testnet, na regtest sambamba
* Mtu yeyote anayeanzisha endpoint binafsi inayooana na lightwalletd kupitia wasifu wa Zaino

**Kwa kawaida si kifaa sahihi**

* Watumiaji wa mwisho wanaohitaji tu kutuma na kupokea ZEC — tumia pochi nyepesi kama ZODL / Zashi, Zingo, au YWallet
* Watu wanaotaka tu kuthibitisha mnyororo — endesha Zebra (au Zakura) pekee
* Watu wanaotaka tu kuhudumia block fupi — endesha Zebra + Zaino, au Zebra + lightwalletd, bila Zallet

---

## Kurasa zinazohusiana

* [Zebra Full Node](/zcash-tech/zebra-full-node) — node ya makubaliano ambayo Z3 hufunika
* [Zaino](/zcash-tech/zaino) — wasifu wa hiari wa kiorodheshi
* [Full Nodes](/zcash-tech/full-nodes) — Zebra, Zakura, na zcashd iliyostaafishwa
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — kile ambacho light clients huwasiliana nacho
* [Zakura Node](/zcash-tech/zakura-node) — full node mbadala; si ile ambayo Z3 husafirisha leo
* [Mwongozo wa Uhamishaji: zcashd hadi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Rasilimali za Wasanidi Programu](/start-here/developer-resources)

---

## Rasilimali

* [Hazina ya Z3](https://github.com/ZcashFoundation/z3)
* [Mkataba wa Z3 (bandari, volyumu, majina ya miradi)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Kitabu cha Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Kitabu cha Zallet](https://zcash.github.io/zallet/)
* [Jukwaa la Jamii la Zcash — masasisho ya Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Kizindua cha Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — safu ya udhibiti ya jamii juu ya stack rasmi ya Compose (ZecHub Hackathon)
