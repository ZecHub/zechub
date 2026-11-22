<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Zallet

Zallet ni pochi [wallet] ya Zcash ya full-node iliyoandikwa kwa Rust. Ni mbadala wa pochi iliyokuwa imejumuishwa ndani ya `zcashd`. Baada ya `zcashd` kufikia kusimamishwa kwake kwa Mwisho wa Usaidizi tarehe 18 Julai 2026 kwenye urefu wa block 3417100, majukumu ya makubaliano [consensus] na pochi yaligawanywa: **Zebra** au **Zakura** huthibitisha mnyororo [chain], na **Zallet** huhifadhi funguo, huchanganua madokezo [notes], na hutoa JSON-RPC ya pochi.

Zallet kwa sasa iko katika **beta**. Haijapitiwa kikamilifu. Mabadiliko yasiyooana yanaweza kuhitaji kufuta na kuunda upya pochi. Usiichukulie kama uhifadhi wa uzalishaji kwa kiasi kikubwa cha ZEC bila kusoma maonyo ya usalama katika [Kitabu cha Zallet](https://zcash.github.io/zallet/).

---

## Kwa ufupi

- Zallet ni **pochi ya RPC ya full-node**, si pochi nyepesi ya simu wala node ya makubaliano.
- Inachukua nafasi ya nusu ya pochi ya `zcashd`. Nusu ya node ni [Zebra](Zebra_Full_Node.md) au [Zakura](Zakura_Node.md).
- Imeandikwa kwa **Rust**, ina leseni mbili MIT / Apache-2.0, na inadumishwa katika [zcash/zallet](https://github.com/zcash/zallet).
- Toleo la hivi karibuni lililochapishwa: **v0.1.0-beta.4** (2 Novemba 2026). Linafuata [NU7](NU7.md) na linahitaji `zebrad` **7.0.0 au toleo jipya zaidi**.
- Husoma data ya mnyororo kupitia backend moja, **zebra**: `ReadStateService` dhidi ya saraka ya hali ya `zebrad` kwenye mashine hiyohiyo, pamoja na JSON-RPC ya Zebra. Backend ya Zaino iliondolewa katika v0.1.0-beta.4.
- Hutoa sehemu ndogo ya JSON-RPC inayooana na **zcashd**. Baadhi ya mbinu zilibadilishwa; baadhi ziliachwa kimakusudi.
- Nyenzo za funguo husimbwa fiche kila wakati kwa **age**. Historia ya miamala, anwani, na funguo za kutazama hubaki wazi katika `wallet.db`.
- Husafirisha programu mbili katika kumbukumbu moja iliyotiwa saini: `zallet` (kianzishaji) na `zallet-zebra`. **Linux pekee** ndiyo inayoweza kusawazisha pochi: hakuna backend ya mnyororo inayotumika kwenye macOS au Windows kwa sasa.
- `zallet backup` (imeongezwa katika beta.4) hupiga picha thabiti ya pochi inayoendeshwa au iliyosimamishwa.
- Hati rasmi: [Kitabu cha Zallet](https://zcash.github.io/zallet/).

---

## Kwa nini Zallet ipo

`zcashd` iliunganisha node ya makubaliano iliyotokana na Bitcoin Core na pochi katika mchakato mmoja. Muundo huo umeondolewa.

| Jukumu | Mfumo wa zamani | Mfumo wa sasa |
|------|-----------|---------------|
| Makubaliano / P2P | `zcashd` | Zebra (`zebrad`) au Zakura |
| Pochi / funguo / salio | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Kiashiria cha light client | `lightwalletd` | Zaino au `lightwalletd` |

Kutenganisha pochi kutoka kwenye node kunamaanisha:

- Programu ya node inaweza kubadilishwa (Zebra dhidi ya Zakura) bila kuhamisha funguo.
- Uchanganuzi wa pochi na mamlaka ya kutumia pesa huishi katika mchakato unaoweza kulindwa kivyake.
- Semantiki za RPC zinaweza kubadilika kuelekea akaunti 32 za ZIP, Anwani Zilizounganishwa, na PCZT badala ya kubaki zimefungwa kwenye dosari za `zcashd`.

Zallet ni pochi inayokusudiwa waendeshaji waliokuwa wakiendesha `zcashd` kama pochi moto, backend ya soko la kubadilishana sarafu [exchange], chanzo cha sarafu za bure [faucet], au pochi ya malipo ya uchimbaji [mining].

---

## Hali

Zallet iko katika **beta**.

Hii inamaanisha nini kwa vitendo:

- Mabadiliko yasiyooana yanaweza kutokea katika beta yoyote. Huenda ukalazimika kufuta saraka ya data na kuanza tena.
- Si kila RPC ya pochi ya `zcashd` imehamishwa.
- Semantiki za baadhi ya mbinu zilizohamishwa hutofautiana na `zcashd`. Miunganisho lazima isome [ukurasa wa semantiki zilizobadilishwa](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Crates zinaendelea kutengenezwa na hazijapitiwa kikamilifu.
- Zallet **si** maktaba ya Rust. Hakuna dhamana ikiwa utaitegemea kama maktaba.

Maoni yatumwe kwa [GitHub masuala](https://github.com/zcash/zallet/issues/new) au kituo cha `#wallet-dev` kwenye [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Awamu thabiti ya baadaye imepangwa mara tu uso wa RPC unaokusudiwa utakapokuwepo. Wapigaji simu watatarajiwa kuhamia kwenye mbinu za Zallet, zikiwemo tofauti za semantiki zilizoandikwa.

---

## Usanifu

Zallet imegawanywa katika sehemu za kazi za Cargo ili kila backend ya mnyororo iweze kufuatilia grafu yake ya utegemezi. Tangu v0.1.0-beta.4, ni backend ya zebra pekee inayosafirishwa.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Binaries zote mbili hufungua `wallet.db` ileile. Hadi v0.1.0-beta.3 kulikuwa pia na backend ya `zallet-zaino`. Ikiwa `zallet.toml` yako inasema `backend = "zaino"`, ibadilishe iwe `backend = "zebra"`. Hifadhidata ya pochi haihitaji kuhamishwa, na folda ya zamani ya `zaino` katika saraka ya data inaweza kufutwa.

Backend ya zebra husoma moja kwa moja hifadhidata ya hali ya `zebrad`, kwa hivyo inahitaji `zebrad` iliyojengwa kwa kipengele cha `indexer` na saraka yake ya hali **kwenye seva pangishi ileile**. Zallet iliyo kwenye kontena moja ikiwasiliana na `zebrad` iliyo kwenye kontena jingine kupitia mtandao haina usanidi unaoungwa mkono hadi backend inayotumia mtandao pekee itakapopatikana ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Utekelezaji wa kawaida:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet ni **pochi ya full-node**: inatarajia node ya uthibitishaji ya ndani. Si light client. Kwa pochi nyepesi na seva za compact-block, tazama [Zaino](Zaino.md) na [Node za Lightwallet](Lightwallet_Nodes.md).

Rafu ya compose ya Zcash Foundation ya [Z3](https://github.com/ZcashFoundation/z3) huendesha Zebra + Zallet pamoja, huku Zaino ya pekee ikiwa hiari kwa light client za nje. Picha zake zilizobandikwa ni za kabla ya NU7 na beta.4 ya Zallet: tazama [Rafu ya Z3](Z3_Stack.md) kabla ya kuitumia.

---

## Akaunti, anwani, na funguo

Zallet imejengwa kuzunguka akaunti 32 za ZIP, si akaunti moja dhahania ya `zcashd`.

- Pochi inaweza kushikilia **mnemonics nyingi za BIP 39**. Kila mnemonic ni mzizi huru wa matumizi, unaotambuliwa kwa **alama ya kidole ya seed** (`zip32seedfp1…`).
- **Akaunti** hutolewa kutoka kwa seed kwa faharasa ya akaunti 32 ya ZIP. Ndani ya instance moja ya Zallet pia zina **UUID** ya ndani. Utambulisho unaobebeka wa akaunti ni `(seedfp, account index)`.
- Anwani ni **Anwani Zilizounganishwa 316 za ZIP**, zinazotolewa kwa `z_getaddressforaccount`. Akaunti moja inaweza kuwa na anwani nyingi mseto; vipokezi vya faragha [shielded] haviwezi kuunganishwa on-chain.
- Funguo za kutumia pesa [spending keys] zilizoingizwa (`z_importkey`) na anwani za kutazama tu (`z_importaddress`) huwa akaunti za UUID zisizofunikwa na mnemonic yoyote.
- Funguo za kutazama zinaweza kutolewa na kuingizwa (`z_exportviewingkey`, `z_importviewingkey`), zikiwemo funguo kamili za kutazama zilizounganishwa na funguo za kutazama zinazoingia.

`getnewaddress` haijatekelezwa. Tumia `z_getnewaccount` na `z_getaddressforaccount`.

Ikiwa `keystore.require_backup` imewashwa (umbo lililohamishwa la `zcashd` ya `walletrequirebackup`), Zallet hukataa kutoa mamlaka mapya ya kutumia pesa kutoka mnemonic ambayo nakala yake ya akiba haijathibitishwa.

---

## Usimbaji fiche na nakala za akiba

Nyenzo za funguo **husimbwa fiche [encryption] kila wakati**. Hakuna hali isiyosimbwa fiche wala RPC ya `encryptwallet` — mbinu hiyo ya `zcashd` haikuwahi kuungwa mkono kikamilifu.

- Usanidi huunda utambulisho wa **age**, njia chaguomsingi ikiwa `{datadir}/encryption-identity.txt`.
- Mnemonics na funguo za kutumia pesa zilizoingizwa huhifadhiwa kama maandishi fiche ya age katika `wallet.db`.
- Sehemu nyingine ya hifadhidata **haisimbwi fiche**. Historia, anwani, na funguo za kutazama zinaweza kusomeka mtu akipata faili.
- Utambulisho unaweza kufungwa kwa kaulisiri (`generate-encryption-identity -p`). Fungua kwa RPC ya `walletpassphrase`; funga kwa `walletlock`.
- Kupoteza faili ya utambulisho au kaulisiri yake hufanya funguo za kutumia pesa zisiweze kurejeshwa. Hifadhi nakala ya utambulisho, kila mnemonic, na (kando, ikiwa imesimbwa fiche) nakala yoyote ya `wallet.db` unayohifadhi.

Kunakili `wallet.db` kwa mkono huku Zallet ikiendelea kufanya kazi si njia salama ya kuhifadhi nakala: SQLite inaweza kuharibika. Tangu v0.1.0-beta.4, tumia amri ya [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md):

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Huhifadhi nakala ya papo hapo ya pochi inayoendana na miamala na iliyokaguliwa uadilifu, iwe pochi inaendelea kufanya kazi au imesimamishwa. Ukiipa saraka, hutaja faili `zallet-wallet-backup-<UTC time>.db`, na haiandiki kamwe juu ya faili iliyopo. Huacha kwa kutoa ujumbe wa hitilafu baada ya dakika kumi ikiwa uandishi wa mara kwa mara kwenye pochi (kwa mfano wakati wa usawazishaji wa awali) unaendelea kuanzisha upya unakili: jaribu tena baadaye au simamisha pochi kwanza. Nakala hii **haijumuishi** faili ya utambulisho wa age. Ihifadhi faili hiyo mara moja kando na nakala za hifadhidata, kwa sababu mtu yeyote anayemiliki faili zote mbili anaweza kusimbua funguo.

---

## JSON-RPC

Zallet hutekeleza sehemu ndogo ya RPC za pochi za `zcashd` kupitia HTTP kwa uthibitishaji wa Basic. Funga kwenye loopback. Matumizi ya mbali yanapaswa kupitia handaki lililosimbwa fiche. `rpc.allow_insecure_remote_bind` ipo na si salama.

Tofauti muhimu kutoka `zcashd`:

- Sehemu za salio kwenye `getwalletinfo` hazina kitu. Tumia `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Ada [fee] hufuata **ZIP 317**. Hakuna `settxfee`.
- Uundaji wa matumizi unahamia kwenye **PCZT** (Miamala ya Zcash Iliyoundwa Kwa Sehemu, ZIP 374). RPC za PCZT zilifika katika mfululizo wa beta.
- **Kufuli ya usawazishaji** ya kimataifa huzuia RPC za salio na matumizi wakati pochi inafuata mnyororo au inarejea kutoka reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Mbinu zilizoachwa kimakusudi zinajumuisha `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, na `encryptwallet`. Mbadala zimeorodheshwa katika [Kitabu cha Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Kuanza

Njia rasmi za usakinishaji (vifurushi vya Debian, Docker, programu za toleo) ziko kwenye [mwongozo wa usakinishaji](https://zcash.github.io/zallet/guide/installation/index.html). Kumbukumbu za matoleo hupewa majina `zallet-v<version>-linux-<amd64|arm64>.tar.gz` na huwa na `zallet` na `zallet-zebra`. Picha za Docker huchapishwa kama `zodlinc/zallet`.

Mtiririko mdogo wa pochi mpya:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Elekeza `[indexer]` kwenye endpoint ya ndani ya `zebrad` JSON-RPC kwa kutumia `validator_address`. Hili linahitajika na halitumii localhost kama thamani chaguo-msingi. Backend ya zebra pia inahitaji `[indexer.read_state_service]` na `zebrad` ya toleo la 7.0.0 au la baadaye, iliyojengwa ikiwa na kipengele cha `indexer`, ambayo saraka yake ya hali iko kwenye host ileile ili Zallet iweze kusoma hali ya mnyororo moja kwa moja. `indexer.db_path` iliseti tu backend ya Zaino iliyoondolewa: sasa hupuuzwa na onyo huonyeshwa.

Picha zinazoweza kuzalishwa upya zinaweza kujengwa kwa [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, hifadhi ya picha ya containerd, GNU Make).

---

## Kuhama kutoka zcashd

Hifadhi datadir ya zamani ya `zcashd` hadi uthibitishe salio na urejeshaji uliojaribiwa.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` ipo tu katika builds zenye kipengele cha `zcashd-import`. Kusoma `wallet.dat` kunahitaji `db_dump` kutoka **Berkeley DB 6.2**, toleo ambalo `zcashd` ilitumia.

Maelezo ya hatua kwa hatua kwa waendeshaji: [Mwongozo wa Kuhama: zcashd hadi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Jinsi Zallet inavyohusiana na programu nyingine

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Aina yake | Pochi ya RPC ya full node | Seva ya pochi inayoanza na faragha | Pochi za watumiaji wa mwisho | Node ya makubaliano | Kielezo / mbadala wa lightwalletd |
| Inachukua nafasi ya | Pochi ya `zcashd` | Si nakala ya `zcashd` inayoweza kutumika moja kwa moja | Programu za simu/kompyuta | Node ya `zcashd` | `lightwalletd` |
| Inahitaji node ya ndani | Ndiyo | Ndiyo (Zebra kwa chaguo-msingi) | Hapana (light client) | Hiyo ndiyo node yenyewe | Ndiyo |
| Ulinganifu wa RPC wa zcashd | Imeundwa kuwa njia ya ulinganifu | Sehemu ndogo iliyochaguliwa pekee | Haitumiki | Hali ya ulinganifu wa sehemu / Zakura | API tofauti |
| Muundo wa uhifadhi wa funguo | Mwendeshaji hushikilia funguo katika `wallet.db` | Seva inayoweza kurejeshwa kwa seed | Funguo kwenye kifaa cha mtumiaji | Hakuna pochi | Hakuna funguo |

Zallet na **zecd** zote zinaweza kukaa mbele ya Zebra. Chagua Zallet unapohitaji uso wa pochi wa `z_*` na njia ya kuhama kutoka `wallet.dat`. Chagua zecd unapotaka seva inayotanguliza faragha ambayo kwa uwazi *si* nakala ya `zcashd`.

Kuna bidhaa tofauti ya watumiaji katika [zallet.io](https://www.zallet.io/) inayotumia jina hilo tena. Programu hiyo si mradi huu.

---

## Kurasa zinazohusiana

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura, na node ya `zcashd` iliyostaafishwa
- [Zebra Full Node](Zebra_Full_Node.md) — usomaji chaguomsingi wa backend ya node ya Zallet
- [Zakura Node](Zakura_Node.md) — node mbadala inayothibitisha miamala
- [Zaino](Zaino.md) — seva ya kielezo na light client (si backend ya Zallet tena tangu beta.4)
- [Z3 Stack](Z3_Stack.md) — Zebra + Zallet stack ya compose
- [zecd](ZECD.md) — muundo mwingine wa seva ya pochi unaotumia librustzcash
- [Zcash Usawazishaji wa Pochi](Zcash_Wallet_Syncing.md) — jinsi pochi za faragha zinavyochanganua mnyororo
- [Viewing Keys](Viewing_Keys.md)

## Rasilimali

- [Kitabu cha Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet kwenye GitHub](https://github.com/zcash/zallet)
- [Matoleo](https://github.com/zcash/zallet/releases) · [orodha ya mabadiliko ya v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [Semantiki za JSON-RPC zilizobadilishwa](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub mwongozo wa uhamishaji](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Mwongozo wa Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet safu ya compose)](https://github.com/ZcashFoundation/z3)
- [Zcash Utafiti na Maendeleo Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
