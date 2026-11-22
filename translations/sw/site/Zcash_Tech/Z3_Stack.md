<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Z3 Stack

**Z3 Stack** ni jukwaa la node lililopakiwa la Zcash Foundation: **Zebra** (full node) + **Zallet** (pochi ya full node), pamoja na indexer ya hiari ya **Zaino**. Limekusudiwa kuchukua nafasi ya mchakato huru wa `zcashd`, ambao uliunganisha makubaliano na pochi katika binary moja na kufikia mwisho wa matumizi tarehe 18 Julai 2026.

Utekelezaji wa rejea ni mradi wa Compose wa Docker katika [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Hali, 14 Novemba 2026: matoleo chaguomsingi yaliyofungwa ni ya kabla ya NU7.** `docker-compose.yml` ya Z3 ilibadilishwa mara ya mwisho tarehe 10 Agosti 2026. Bado inafunga `zfnd/zebra:6.2.3` na `zodlinc/zallet:v0.1.0-beta.1`, zilizoanzishwa kama binary ya `zallet-zaino`. [NU7](NU7.md) ziliwashwa kwenye Mainnet katika block 3,543,405 tarehe 6 Novemba 2026, na ni Zebra 7.0.0 au matoleo ya baadaye pekee yanayozifuata: Zebra ya 6.x hubaki kwenye sheria za zamani na hujitenga na mnyororo halisi. Zallet v0.1.0-beta.4, toleo la kwanza linalofuata NU7, halisafirishi tena `zallet-zaino` kabisa. Angalia hazina ili kupata matoleo yaliyofungwa mapya kabla ya kusambaza. Ukibadilisha picha wewe mwenyewe, kumbuka kuwa backend iliyobaki ya `zebra` ya Zallet husoma saraka ya hali ya Zebra moja kwa moja, kwa hivyo Zallet lazima iendeshe kwenye mashine hiyo hiyo na iweze kufikia saraka hiyo ([Zallet](Zallet.md)).

---

## Kwa ufupi

* Z3 **si mteja mpya wa makubaliano**. Ni namna ya kuendesha pamoja stack ya baada ya `zcashd`: Zebra huthibitisha mnyororo, Zallet huhifadhi funguo na kutoa huduma ya wallet RPC, na Zaino (hiari) hutumia itifaki ya gRPC ya lightwalletd.
* `zcashd` iliunganisha node na pochi. Z3 **hutenganisha majukumu hayo**. Masoko ya kubadilishana sarafu, mabwawa ya uchimbaji, na waendeshaji wengine wa pochi za full node huhamia kwenye mchanganyiko huu badala ya kutumia Zebra pekee.
* Miradi mitatu tofauti ya Compose inaweza kuendeshwa kwenye mashine moja: **mainnet**, **testnet**, na **regtest**.
* Usawazishaji wa kwanza wa Mainnet huchukua takribani **saa 24–72** na takriban **GB 300**. Regtest huanza baada ya sekunde chache na ndiyo mahali panapofaa kujifunza stack.
* Katika picha ya Z3 iliyofungwa, Zallet huendesha backend yake ya `zallet-zaino` (maktaba za indexer za Zaino) na huwasiliana na Zebra kupitia JSON-RPC. Zallet iliondoa backend hiyo katika v0.1.0-beta.4; Zallet ya sasa husoma hali ya Zebra moja kwa moja. Huduma huru ya Zaino inahitajika tu ikiwa unataka kituo kinachooana na lightwalletd kwa ajili ya pochi za nje.
* Zallet iko katika **beta**. Mabadiliko yanayovunja uoanifu yanaweza kuhitaji kufuta na kuunda pochi upya. Usiichukulie kuwa programu iliyokamilika ya kuhifadhi fedha kwa kiasi kikubwa.

---

## Kwa nini Z3 ipo

Kwa muda mwingi wa historia ya Zcash, `zcashd` ilikuwa full node ya rejea na pochi pekee ya full node ya matumizi ya uzalishaji. Huo ndio muundo ambao masoko ya kubadilishana sarafu, mabwawa, na wahifadhi fedha waliunganisha mifumo yao nao.

`zcashd` imestaafishwa. Makubaliano yamehamia kwenye [Zebra](/zcash-tech/zebra-full-node) (na sasa pia [Zakura](/zcash-tech/zakura-node)). Pochi iliyojengewa ndani imehamia kwenye [Zallet](https://github.com/zcash/zallet). Utoaji wa huduma kwa pochi nyepesi unahama kutoka [lightwalletd](/zcash-tech/lightwallet-nodes) kwenda [Zaino](/zcash-tech/zaino).

Vipengele hivyo vitatu viko katika hazina tofauti, ratiba tofauti za matoleo, na mipangilio tofauti. Z3 huviunganisha: picha zilizofungwa kwa matoleo maalum, ukaguzi wa afya unaoizuia pochi kuwashwa hadi node iwasawazishwe, milango na ujazo tofauti kwa kila mtandao, na mwongozo wa waendeshaji.

Jina hili ni kifupi kisicho rasmi kinachotumiwa katika mfumo ikolojia — Zebra, Zaino, Zallet — ingawa faili chaguomsingi ya Compose huwasha tu Zebra na Zallet. Zaino ni wasifu wa Compose, si mchakato wa tatu unaohitajika.

---

## Muundo

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

| Kipengele | Jukumu lake katika Z3 | Kinahitajika? |
| --- | --- | --- |
| **Zebra** | Husawazisha na kuthibitisha mnyororo, hushiriki taarifa za mtandao, JSON-RPC, kituo cha afya | Ndiyo |
| **Zallet** | Pochi ya full node. Picha iliyofungwa ya beta.1 huendesha backend ya maktaba ya Zaino (`zallet-zaino`, iliyoondolewa katika Zallet beta.4) na huunganisha moja kwa moja kwenye JSON-RPC ya Zebra. **Haiwasiliani** na kontena huru la Zaino | Ndiyo |
| **Zaino** | Indexer huru. gRPC inayooana na lightwalletd kwa wateja wepesi wa nje, pamoja na proksi ya JSON-RPC kwa wachunguzi na vyanzo vya sarafu za bure | Hapana — `--profile indexer` |

Z3 hufunga matoleo ya picha katika `docker-compose.yml`. Badilisha kwa kutumia `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, au `Z3_ZALLET_IMAGE` ikiwa unahitaji lebo nyingine ya toleo.

---

## Tofauti zake na zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Lugha | C++ (fork ya Bitcoin) | Huduma za Rust, zinazoratiwa kwa Compose ya Docker |
| Muundo wa mchakato | Binary moja: node + pochi | Kontena tofauti za node na pochi |
| Makubaliano | Imestaafishwa (EOS 18 Julai 2026) | Zebra (au node nyingine inayooana) |
| Pochi | `wallet.dat` iliyojengewa ndani | Zallet, saraka ya data iliyosimbwa kwa age |
| Wateja wepesi | Kwa kawaida lightwalletd tofauti | Wasifu wa hiari wa Zaino |
| Mipangilio | `zcash.conf` | Faili za kila mtandao chini ya `config/<network>/` pamoja na faili za mazingira za Compose |
| Mitandao kwenye mashine moja | Migongano ya milango ni shida | Imejengwa mahsusi: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ikiwa bado una pochi ya `zcashd`, tumia mwongozo wa uhamishaji wa ZecHub wa [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) na amri ya `migrate-zcashd-wallet` ya Zallet badala ya kunakili `wallet.dat` kwenye ujazo wa Z3.

---

## Mitandao

Z3 ina miradi mitatu huru ya Compose. Haishiriki milango wala ujazo.

| Mtandao | Jina la mradi | Itumie kwa | Usawazishaji wa kwanza | Fedha halisi |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Matumizi ya uzalishaji | Saa 24–72 | Ndiyo |
| **testnet** | `z3-testnet` | Majaribio ya hatua ya maandalizi kwenye mtandao wa majaribio wa umma | Saa 2–12 | Hapana (ZEC za majaribio) |
| **regtest** | `z3-regtest` | Mazoezi ya ndani: block za papo hapo, hakuna rika | Sekunde | Hapana |

Waendeshaji wapya wanapaswa kuanza kwenye **regtest**, kuthibitisha mtiririko wa RPC na pochi, kisha kuhamia testnet au mainnet.

---

## Milango chaguomsingi ya mashine mwenyeji

Mitandao yote mitatu imekusudiwa kuishi pamoja kwenye mashine moja. Thamani zilizo hapa chini ndizo chaguomsingi zilizochapishwa; kila moja inaweza kubadilishwa kupitia kigezo cha mazingira kinacholingana cha `Z3_*`. Jedwali rasmi la ulinganisho ni [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Huduma | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC ya Zebra | 8232 | 18232 | 29232 |
| P2P ya Zebra | 8233 | 18233 | (haijachapishwa) |
| afya ya Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC ya Zaino (wasifu wa indexer) | 8137 | 18137 | 28137 |
| JSON-RPC ya Zaino (wasifu wa indexer) | 8237 | 18237 | 28237 |
| RPC ya Zallet | 28232 | 40232 | 50232 |

Ndani ya mtandao wa Compose, huduma hupatikana kwa majina yake (`zebra`, `zaino`, `zallet`).

---

## Data na nakala rudufu

| Ujazo | Kinachohifadhiwa | Kiwekwe kwenye nakala rudufu? |
| --- | --- | --- |
| `z3-<network>-chain` | Hali ya mnyororo ya Zebra (takriban GB 300 kwa mainnet) | Hiari — kinaweza kusawazishwa tena |
| `z3-<network>-zallet` | Hifadhidata ya pochi iliyosimbwa fiche **na** utambulisho wa age unaoifungua | **Ndiyo — huu ndio ujazo pekee unaopaswa kuwekwa kwenye nakala rudufu** |
| `z3-<network>-zaino` | Hali ya indexer (ikiwa tu wasifu wa indexer umetumika) | Hiari — kinaweza kujengwa upya |
| `z3-<network>-cookie` | Kuki ya RPC ya Zebra | Hapana — huzalishwa upya |

Kuweka hali ya mnyororo kwenye diski nyingine kabla ya kuanza kwa mara ya kwanza:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` husimamisha stack na kuhifadhi ujazo. Kuongeza `-v` huifuta na kulazimisha usawazishaji kamili upya. Jumuisha `--profile "*"` ili huduma zinazodhibitiwa na wasifu (indexer, ufuatiliaji) zisitishwe ipasavyo.

---

## Kuanza

Mahitaji ya awali: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` inahitajika kwa regtest pekee.

### Regtest (njia ya haraka zaidi ya kuona stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Tazama [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) kwa amri za majaribio.

### Mainnet (kuwasha kwa awamu mbili)

Zebra lazima ikamilishe kusawazisha kabla ya Zallet kuwa na manufaa. Kuanzisha Zallet mapema kutasababisha iendelee kuwasha upya hadi `/ready` iwe kweli.

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

Testnet hutumia mtiririko huohuo pamoja na `.env.testnet` na `./scripts/check-zebra-readiness.sh 18080`.

Mabadiliko yaliyo chini ya `config/<network>/` hubaki kwenye mashine yako na hudumu baada ya `git pull`.

### Wasifu wa hiari

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Milango chaguomsingi ya Grafana ni 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Maelezo kwa waendeshaji

* **Picha zilizofungwa.** Z3 haihamii kimyakimya kwenye `:latest`. Sasisha toleo lililofungwa kupitia mabadiliko yaliyokaguliwa, au weka `Z3_<SERVICE>_IMAGE`. Matoleo yaliyofungwa hayajabadilika tangu Agosti 2026, kwa hivyo ni ya kabla ya NU7 (tazama dokezo la hali hapo juu).
* **Kontena zisizoendeshwa kama root.** Uwezo wa Linux huondolewa. Ukaguzi wa afya huizuia pochi kuanza hadi Zebra iwe tayari. Sera ya kuwasha upya huwashwa chaguomsingi.
* **Kumbukumbu za uendeshaji.** Z3 haifungi kiendeshi cha kumbukumbu. Weka vikomo vya ukubwa katika usanidi wa daemon wa Docker, la sivyo kumbukumbu zitakua bila kikomo kwenye node inayoendeshwa saa 24 kila siku.
* **P2P.** Mainnet na testnet huchapisha mlango wa P2P wa Zebra. Ukiwa nyuma ya NAT, weka `ZEBRA_NETWORK__EXTERNAL_ADDR` kuwa anwani ambayo rika zinapaswa kupiga. Regtest haina rika.
* **Zaino kwenye ARM.** Picha ya upstream ya Zaino ni ya `linux/amd64` pekee. Kwenye Apple Silicon, huendeshwa kwa uigaji isipokuwa ujenge kutoka chanzo. Zebra na Zallet zinaunga mkono usanifu mbalimbali.
* **Mashine zinazoshirikiwa.** Vikomo vya CPU au kumbukumbu havijawekwa chaguomsingi. Ongeza `deploy.resources.limits` kwenye faili ya ubatilishaji ikiwa mashine haitumiki kwa node pekee.

Orodha hakiki ya usanidi unaofanana na wa uzalishaji na maswali yanayoulizwa mara nyingi: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Nani anapaswa kuendesha Z3

**Inafaa kwa**

* Masoko ya kubadilishana sarafu, wahifadhi fedha, na mabwawa ya uchimbaji yaliyotumia `zcashd` kama node pamoja na pochi
* Waendeshaji wanaotaka huduma inayoungwa mkono ya pochi ya full node RPC dhidi ya Zebra iliyosawazishwa
* Wasanidi programu wanaohitaji mainnet, testnet, na regtest sambamba
* Yeyote anayeanzisha kituo binafsi kinachooana na lightwalletd kupitia wasifu wa Zaino

**Kwa kawaida si chaguo sahihi kwa**

* Watumiaji wa mwisho wanaohitaji tu kutuma na kupokea ZEC — tumia pochi nyepesi kama ZODL / Zashi, Zingo, au Zkool (mrithi anayedumishwa wa YWallet)
* Watu wanaotaka tu kuthibitisha mnyororo — endesha Zebra (au Zakura) peke yake
* Watu wanaotaka tu kutoa huduma ya block fupi — endesha Zebra + Zaino, au Zebra + lightwalletd, bila Zallet

---

## Kurasa zinazohusiana

* [Zebra Full Node](/zcash-tech/zebra-full-node) — node ya makubaliano ambayo Z3 hufunga pamoja
* [Zaino](/zcash-tech/zaino) — wasifu wa hiari wa indexer
* [Full Nodes](/zcash-tech/full-nodes) — Zebra, Zakura, na zcashd iliyostaafishwa
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — wateja wepesi huwasiliana na nini
* [Zakura Node](/zcash-tech/zakura-node) — full node mbadala; si inayosafirishwa na Z3 leo
* [Mwongozo wa Uhamishaji: zcashd kwenda Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Rasilimali za Wasanidi Programu](/start-here/developer-resources)

---

## Rasilimali

* [Hazina ya Z3](https://github.com/ZcashFoundation/z3)
* [Mkataba wa Z3 (milango, ujazo, majina ya miradi)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Kitabu cha Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Kitabu cha Zallet](https://zcash.github.io/zallet/)
* [Zcash Jukwaa la Jamii — taarifa za Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Kianzilishi cha Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — jukwaa la udhibiti la jamii juu ya stack rasmi ya Compose (ZecHub Hackathon)
