<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Zallet

Zallet ni pochi [wallet] ya Zcash ya full-node iliyoandikwa kwa Rust. Ni mbadala wa pochi iliyokuwa imejumuishwa ndani ya `zcashd`. Baada ya `zcashd` kufikia kusimamishwa kwake kwa Mwisho wa Usaidizi tarehe 18 Julai 2026 kwenye urefu wa block 3417100, majukumu ya makubaliano [consensus] na pochi yaligawanywa: **Zebra** au **Zakura** huthibitisha mnyororo [chain], na **Zallet** huhifadhi funguo, huchanganua madokezo [notes], na hutoa JSON-RPC ya pochi.

Zallet kwa sasa iko katika **beta**. Haijapitiwa kikamilifu. Mabadiliko yasiyooana yanaweza kuhitaji kufuta na kuunda upya pochi. Usiichukulie kama uhifadhi wa uzalishaji kwa kiasi kikubwa cha ZEC bila kusoma maonyo ya usalama katika [Kitabu cha Zallet](https://zcash.github.io/zallet/).

---

## Kwa ufupi

- Zallet ni **pochi ya RPC ya full-node**, si pochi nyepesi ya simu na si node ya makubaliano.
- Inachukua nafasi ya nusu ya pochi ya `zcashd`. Nusu ya node ni [Zebra](Zebra_Full_Node.md) au [Zakura](Zakura_Node.md).
- Imeandikwa kwa **Rust**, ina leseni mbili MIT / Apache-2.0, na inadumishwa katika [zcash/zallet](https://github.com/zcash/zallet).
- Toleo la hivi karibuni lililochapishwa kufikia mwishoni mwa Agosti 2026: **v0.1.0-beta.3**.
- Huwasiliana na data ya mnyororo kupitia mojawapo ya backends mbili: **zebra-state** (`ReadStateService` ya moja kwa moja dhidi ya `zebrad` ya ndani) au **Zaino**.
- Hutoa sehemu ndogo ya JSON-RPC inayooana na **zcashd**. Baadhi ya mbinu zilibadilishwa; baadhi ziliachwa kimakusudi.
- Nyenzo za funguo husimbwa fiche [encrypted] kila wakati kwa **age**. Historia ya miamala [transaction], anwani, na funguo za kutazama [viewing keys] hubaki wazi katika `wallet.db`.
- Husafirisha binaries tatu katika kumbukumbu moja iliyotiwa saini: `zallet` (kianzishaji), `zallet-zebra`, na `zallet-zaino`.
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

Zallet imegawanywa katika sehemu tatu za kazi za Cargo ili backends mbili za mnyororo ziweze kufuatilia grafu tofauti za utegemezi.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Binaries zote tatu hufungua **`wallet.db` sawa**. Kianzishaji huchagua backend wakati wa utekelezaji; huhitaji kukusanya upya ili kubadilisha.

Utekelezaji wa kawaida:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet ni **pochi ya full-node**: inatarajia node ya uthibitishaji ya ndani. Si light client. Kwa pochi nyepesi na seva za compact-block, tazama [Zaino](Zaino.md) na [Node za Lightwallet](Lightwallet_Nodes.md).

Stack ya compose ya Zcash Foundation ya [Z3](https://github.com/ZcashFoundation/z3) huendesha Zebra + Zallet pamoja, ikiwa na Zaino huru ya hiari kwa light clients za nje.

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

Kunakili `wallet.db` wakati Zallet inaendelea kufanya kazi si nakala salama ya akiba. SQLite inaweza kuharibika. Pendelea mchakato uliosimamishwa, au subiri amri rasmi ya nakala ya akiba ya mtandaoni.

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

Njia rasmi za usakinishaji (vifurushi vya Debian, Docker, binaries za toleo) ziko katika [mwongozo wa usakinishaji](https://zcash.github.io/zallet/guide/installation/index.html). Kumbukumbu za toleo huitwa `zallet-<version>-<arch>.tar.gz` na zina binaries zote tatu.

Mtiririko mdogo wa pochi mpya:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Elekeza `[indexer]` kwenye endpoint ya JSON-RPC ya ndani ya `zebrad`. Backend ya zebra pia inahitaji `[indexer.read_state_service]` na `zebrad` iliyojengwa kwa kipengele cha kiashiria ili Zallet iweze kusoma hali ya mnyororo moja kwa moja.

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

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Ni nini | Pochi ya RPC ya full-node | Seva ya pochi inayotanguliza faragha | Pochi za watumiaji wa mwisho | Node ya makubaliano | Kiashiria / mbadala wa lightwalletd |
| Huchukua nafasi ya | Pochi ya `zcashd` | Si nakala ya moja kwa moja ya `zcashd` | Programu za simu/kompyuta ya mezani | Node ya `zcashd` | `lightwalletd` |
| Inahitaji node ya ndani | Ndiyo | Ndiyo (Zebra kwa chaguomsingi) | Hapana (light client) | Ndiyo node yenyewe | Ndiyo |
| Uoanifu wa RPC wa zcashd | Imeundwa kama njia ya uoanifu | Sehemu ndogo iliyochaguliwa tu | Haitumiki | Hali ya uoanifu ya sehemu / Zakura | API tofauti |
| Muundo wa uhifadhi | Mwendelezaji hushikilia funguo katika `wallet.db` | Seva inayorejesheka kwa seed | Funguo za kifaa cha mtumiaji | Hakuna pochi | Hakuna funguo |

Zallet na **zecd** zote zinaweza kukaa mbele ya Zebra. Chagua Zallet unapohitaji uso wa pochi wa `z_*` na njia ya kuhama kutoka `wallet.dat`. Chagua zecd unapotaka seva inayotanguliza faragha ambayo kwa uwazi *si* nakala ya `zcashd`.

Kuna bidhaa tofauti ya watumiaji katika [zallet.io](https://www.zallet.io/) inayotumia jina hilo tena. Programu hiyo si mradi huu.

---

## Kurasa zinazohusiana

- [Node Kamili](Full_Nodes.md) — Zebra, Zakura, na node ya `zcashd` iliyostaafishwa
- [Full Node ya Zebra](Zebra_Full_Node.md) — node ambayo backend chaguomsingi ya Zallet husoma
- [Node ya Zakura](Zakura_Node.md) — node mbadala ya uthibitishaji
- [Zaino](Zaino.md) — backend ya kiashiria na seva ya light client
- [zecd](ZECD.md) — muundo mwingine wa seva ya pochi kwenye librustzcash
- [Usawazishaji wa Pochi ya Zcash](Zcash_Wallet_Syncing.md) — jinsi pochi za faragha huchanganua mnyororo
- [Funguo za kutazama](Viewing_Keys.md)

## Rasilimali

- [Kitabu cha Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet kwenye GitHub](https://github.com/zcash/zallet)
- [Matoleo](https://github.com/zcash/zallet/releases)
- [Semantiki za JSON-RPC zilizobadilishwa](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Mwongozo wa kuhama wa ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Mwongozo wa Raspberry Pi wa ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (stack ya compose ya Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
