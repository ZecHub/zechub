<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet ni full-node Zcash mkoba imeandikwa katika kutu. Ni badala ya mfuko wa fedha kwamba kutumika kuwa iliyoingia katika `zcashd`Baada ya . `zcashd` Imefikia mwisho wa msaada wake kusimamishwa tarehe 18 Julai 2026 katika block urefu 3417100, makubaliano na wajibu mkoba walikuwa kugawanywa: ** Zebra** au ** Zakura** kuthibitisha mlolongo, na ** Zallet ** ana funguo, scans maelezo, na inaonyesha mfuko JSON-RPC.

Zallet ni sasa katika ** beta**. Ni haijawahi kikamilifu upya. Breaking mabadiliko inaweza kuhitaji kufuta na recreate mkoba. Je, si kutibu kama uhifadhi uzalishaji kwa ajili ya kiasi kikubwa cha ZEC bila kusoma maonyo usalama katika [Kitabu cha Zallet](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet ni ** full-node RPC mkoba**, si simu mwanga mfuko wa fedha na si makubaliano node.
- Inachukua nafasi ya mkoba nusu ya `zcashd`. Nusu node ni [Zebra](Zebra_Full_Node.md) or [Zakura](Zakura_Node.md).
- Imeandikwa katika **Rust**, dual-lizensi MIT / Apache-2.0, kudumishwa katika [zcash/zallet](https://github.com/zcash/zallet).
- Toleo la mwisho lililochapishwa mwishoni mwa Agosti 2026: **v0.1.0-beta.3**.
- Mazungumzo kwa data mnyororo kupitia moja ya backends mbili: ** zebra-hali** (moja kwa moja) `ReadStateService` dhidi ya eneo la `zebrad`) au ** Zaino**.
- Inaonyesha ** zcashd-sambatana JSON RPC** subset. Baadhi ya mbinu iliyopita; baadhi walikuwa omitted kwa makusudi.
- Key vifaa ni daima encrypted na ** umri**. historia ya shughuli, anwani, na kuangalia funguo kukaa wazi katika `wallet.db`.
- Meli tatu binaries katika moja saini archive: `zallet` (mtoaji), `zallet-zebra`, na `zallet-zaino`.
- Hati rasmi: [Kitabu cha Zallet](https://zcash.github.io/zallet/).

---

## Kwa nini Zallet ipo?

`zcashd` bundled Bitcoin Core inayotokana makubaliano node na mkoba katika mchakato mmoja. kubuni kwamba ni gone.

 Jukumu. Kijiko cha zamani. Kijibo cha sasa.
|------|-----------|---------------|
Makubaliano / P2P. `zcashd` Zebra (Kikundi cha wanyama)`zebrad`) au Zakura.
 Wallet / funguo / mizani. `zcashd` `wallet.dat` Zallet. (Mwanamke)`wallet.db`) |
Mwangaza-mteja indexer. `lightwalletd` Zaino au `lightwalletd` |

Kugawanya mkoba nje ya node ina maana:

- Node programu inaweza swapped (Zebra vs Zakura) bila kusonga funguo.
- Mkoba skanning na kutumia mamlaka kuishi katika mchakato ambayo inaweza kuwa imefungwa chini tofauti.
- RPC semantics inaweza kuendeleza kuelekea ZIP 32 akaunti, Unified Anwani na PCZTs badala ya kukaa waliohifadhiwa juu ya `zcashd` tabia fulani.

Zallet ni mkoba lengo kwa ajili ya waendeshaji ambao hapo awali mbio `zcashd` kama mkoba moto, kubadilishana backend, bomba, au madini malipo mfuko wa fedha.

---

## Hali ya hali

Zallet yuko katika beta.

Hilo linamaanisha nini katika maisha ya kawaida:

- Kuvunja mabadiliko inaweza kutua katika beta yoyote. Unaweza kuwa na kufuta directory data na kuanza tena.
- Si kila mtu. `zcashd` mkoba RPC imekuwa ported.
- Semantics ya baadhi ported mbinu tofauti na `zcashd`. Integrations lazima kusoma [ukurasa wa semantics-iliyobadilishwa](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Masanduku hayo yanaendelea kutengenezwa na hayajachunguzwa kikamili.
- Zallet ni **not** Rust maktaba. Hakuna dhamana kama wewe kutegemea juu yake kama moja.

Maoni ni kwenda kwa [Masuala ya GitHub](https://github.com/zcash/zallet/issues/new) au ya `#wallet-dev` kituo juu ya [Zcash R & D Discord](https://discord.gg/xpzPR53xtU).

Hatua ya baadaye imara ni iliyopangwa mara moja lengo RPC uso ipo. wito itakuwa kisha wanatarajiwa kuhamia njia Zallet, ikiwa ni pamoja na documented semantic tofauti.

---

## Usanifu wa majengo

Zallet ni kugawanywa katika maeneo ya kazi tatu Cargo hivyo backends mbili mnyororo unaweza kufuatilia tofauti grafu utegemezi.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Binary zote tatu kufungua ** sawa** `wallet.db`. launcher huchagua backend wakati wa kukimbia; huna recompile kubadili.

Utoaji wa kawaida:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet ni **full-node mkoba**: inatarajia ndani ya kuthibitisha node. Si mwanga mteja. Kwa milango nyepesi na kompyuta ndogo block, angalia [Zaino](Zaino.md) na [Nodes Lightwallet](Lightwallet_Nodes.md).

The Zcash Foundation’s [Z3](https://github.com/ZcashFoundation/z3) kuandika stack anaendesha Zebra + Zallet pamoja, na hiari standalone Zaino kwa wateja nje mwanga.

---

## Akaunti, anwani na funguo za nyumba ya mtu mwingine

Zallet ni kujengwa kuzunguka akaunti ZIP 32, si `zcashd`s akaunti moja ya siri.

- Mkoba unaweza kushikilia mnemonics nyingi za BIP 39. Kila mnemonic ni mizizi ya matumizi huru, inayojulikana na alama ya kidole cha mbegu. (`zip32seedfp1…`).
- ** Akaunti** zinatokana na mbegu yenye faharisi ya akaunti ZIP 32. Ndani ya mfano mmoja wa Zallet pia wana local **UUID. Kitambulisho cha kubebeka cha akaunti ni: `(seedfp, account index)`.
- Anwani ni **ZIP 316 Unified anwani**, zinazozalishwa na `z_getaddressforaccount`Akaunti moja inaweza kuwa na anwani nyingi mbalimbali; wapokeaji walinzi hawawezi kuunganishwa kwenye mnyororo.
- Kiolezo cha matumizi ya kuingizwa (`z_importkey`) na kuangalia tu anwani (`z_importaddress`) kuwa UUID akaunti kwamba hakuna mnemonic inashughulikia.
- Viewing funguo inaweza kuhamishwa na nje (`z_exportviewingkey`, `z_importviewingkey`), ikiwa ni pamoja na umoja wa kuangalia funguo kamili na kuingia kuona funguo.

`getnewaddress` si kutekelezwa. Matumizi ya `z_getnewaccount` na `z_getaddressforaccount`.

If `keystore.require_backup` ni juu ya (mfano migrated wa `zcashd`’s `walletrequirebackup`), Zallet anakataa kupata mamlaka mpya ya matumizi kutoka mnemonic ambayo chelezo haijathibitishwa.

---

## Encryption na backups

Key vifaa ni ** daima** encrypted. Hakuna unencrypting mode na hakuna `encryptwallet` RPC  kwamba `zcashd` njia kamwe alikuwa mkono kikamilifu.

- Setup inajenga ** umri** utambulisho, default njia `{datadir}/encryption-identity.txt`.
- Mnemonics na kuingizwa matumizi funguo ni kuhifadhiwa kama umri ciphertexts katika `wallet.db`.
- Mapumziko ya database ni **not** encrypted. Historia, anwani na viewing funguo ni kusoma kama mtu anapata faili.
- Kitambulisho inaweza kuwa password-masharti (`generate-encryption-identity -p`Kufungua na . `walletpassphrase` RPC; lock na `walletlock`.
- Kupoteza faili utambulisho au passphrase yake hufanya matumizi ya funguo irrecoverable. Backup kitambulishe, kila mnemonic, na (kwa kujitenga, encrypted) yoyote `wallet.db` nakala wewe kuweka.

Kunakili `wallet.db` wakati Zallet ni mbio si salama chelezo. SQLite unaweza kupasuka. Upendeleo wa mchakato kusimamishwa, au kusubiri kwa rasmi online-backup amri.

---

## JSON-RPC

Zallet inatekeleza subset ya mfumo wa uendeshaji. `zcashd` mkoba RPCs juu ya HTTP na Basic auth. Kufunga kwa loopback. matumizi Remote lazima kwenda kupitia handaki encrypted. `rpc.allow_insecure_remote_bind` ipo na ni salama.

Tofauti kubwa kutoka kwa `zcashd`:

- Mashamba ya usawa juu ya `getwalletinfo` ni tupu. Matumizi `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Ada kufuata **ZIP 317**. Hakuna ada ya ziada kwa ajili ya huduma za usafiri wa umma na hakuna malipo yoyote. `settxfee`.
- Spend construction is moving onto **PCZTs** (Partially Created Zcash Transactions, ZIP 374). PCZT RPCs landed in the beta series.
- kimataifa ** sync lock** vitalu usawa na kutumia RPCs wakati mkoba ni kukamata juu au kupona kutoka reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Mbinu makusudi omitted ni pamoja na: `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, na `encryptwallet`. Replacements ni waliotajwa katika orodha ya [Kitabu cha Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Kuanza kuanza

rasmi kufunga njia (Debian vifurushi, Docker, kutolewa binaries) ni katika [mwongozo wa ufungaji](https://zcash.github.io/zallet/guide/installation/index.html). Ardhi ya kutolewa ni jina la `zallet-<version>-<arch>.tar.gz` na vyenye wote binaries tatu.

Kiwango cha chini ya mfuko mpya-mzunguko:

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

Hatua ya `[indexer]` katika eneo la ndani ya mji wa `zebrad` JSON-RPC mwisho. backend zebra pia anataka `[indexer.read_state_service]` na a `zebrad` kujengwa na kipengele indexer hivyo Zallet unaweza kusoma hali ya mnyororo moja kwa moja.

Reproducible picha inaweza kujengwa na [HatuaX](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd kuhifadhi picha, GNU Make).

---

## Kuhama kutoka zcashd

Weka ya zamani `zcashd` dataadir mpaka una kuthibitishwa mizani na upya majaribio.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` ni tu katika hujenga na `zcashd-import` kusoma. `wallet.dat` mahitaji ya watu wengine `db_dump` kutoka ** Berkeley DB 6.2**, toleo la `zcashd` kutumika.

Hatua kwa hatua operator maelezo: [Kiongozi wa Uhamiaji: zcashd kwa Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Jinsi Zallet inahusiana na programu nyingine

 Zallet zecd Zashi / ZODL YWallet Zebra Zakura Zaino
|--|--------|------|------------------------|----------------|-------|
 Ni nini? Full-node RPC mkoba Shielded kwanza mfuko wa fedha server End user mifuko ya fedha makubaliano node Indexer / lightwalletd badala.
Inachukua nafasi ya. `zcashd` mkoba. Si kuanguka-katika `zcashd` clone  Programu za simu/desktop  `zcashd` kiungo. `lightwalletd` |
 Inahitaji node ya ndani Ndiyo. Yes (Zebra default) No (mteja mwanga). It * is* the node. Yes.
 zcashd RPC compat. Imeundwa kama njia ya Compat. ndogo iliyochaguliwa subset tu N/A sehemu / Zakura hali ya Compact API tofauti
◯ Mtindo wa utunzaji. ▪ Opereta anaweka funguo ndani ya nyumba yake `wallet.db` Seed-kupata server. Kifaa cha mtumiaji funguo hakuna mkoba, hakuna funguo.

Zallet na **zecd** wanaweza wote kukaa mbele ya Zebra. Pick Zallet wakati unahitaji `z_*` mkoba uso na uhamiaji njia kutoka `wallet.dat`. Chagua zecd wakati unataka server ulinzi-kwanza kwamba ni wazi * si* a `zcashd` kiungo.

Kuna tofauti ya bidhaa za watumiaji katika [zallet.io](https://www.zallet.io/) kwamba reuses jina. Programu hiyo si mradi huu.

---

## Kurasa zinazohusiana na makala hii

- [Nodes kamili](Full_Nodes.md)  Zebra, Zakura na watu waliostaafu `zcashd` kifundo
- [Zebra Full Node (Njia ya Kuunganisha)](Zebra_Full_Node.md)  node Zallet's default backend reads: "Kama ni hivyo, basi unaweza kusoma"
- [Zakura Node (Kituo cha Zakura)](Zakura_Node.md)  mbadala kuthibitisha node
- [Zaino](Zaino.md)  indexer backend na mwanga-mteja server
- [ZECD](ZECD.md)  mwingine mkoba-server kubuni juu ya librustzcash
- [Zcash Wallet Syncing (Usawazishaji wa Pochi za Kifedha)](Zcash_Wallet_Syncing.md)  jinsi wallets kulindwa scan mlolongo
- [Kuangalia funguo za kuvinjari](Viewing_Keys.md)

## Rasilimali

- [Kitabu cha Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet kwenye GitHub](https://github.com/zcash/zallet)
- [Matangazo ya kutolewa](https://github.com/zcash/zallet/releases)
- [JSON-RPC semantics iliyopita](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub uhamiaji mwongozo](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi mwongozo (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet kuunda stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R & D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
