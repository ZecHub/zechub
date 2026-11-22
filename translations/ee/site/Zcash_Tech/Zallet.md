<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="AƉe Axɔ"/>
</a>

# Zallet

Zallet nye ɣaɣla dzesi ŋɔŋlɔ blibo Zcash gakotoku [wallet] si woŋlɔ kple Rust. Enye gakotoku si ɖo teƒe na esi nɔ `zcashd` me tsã. Le esime `zcashd` va ɖo eƒe Kpekpeɖeŋu Nuva Kaka le 18 July 2026 le gaɖoɖowo ƒuƒoƒe [block] ƒe kɔkɔme 3417100 la, womama gbegbɔgblɔ ɖi [consensus] kple gakotoku ƒe dɔwo: **Zebra** alo **Zakura** dea ɖoɖonu [chain] la dzi, eye **Zallet** lée safuiwo me, le didienuwo [note] ŋuti, eye wòna gakotoku JSON-RPC la.

Zallet Le **beta** me fifia. Womema kpe ɖe eŋu bliboa o. Tɔtrɔ siwo agbã nu ate ŋu abia be woatu gakotoku [wallet] la ɖa eye woawɔe azɔ. Mègawɔe abe asikplɔ-dzralá si le dɔ wɔm na ZEC geɖe o ne mèxlẽ dedienyawo tso ŋgɔ le [Zallet Ƒe Agbalẽ](https://zcash.github.io/zallet/) me o.

---

## TL;DR

- Zallet nye **ɣaɣla dzesi ŋɔŋlɔ blibo RPC gakotoku**, menye mobile light client gakotoku o, eye menye gbegbɔgblɔ ɖi ƒe ɣaɣla dzesi ŋɔŋlɔ o.
- Ewɔa gakotoku akpa si le `zcashd` me teƒe. Ɣaɣla dzesi ŋɔŋlɔ akpa la nye [Zebra](Zebra_Full_Node.md) alo [Zakura](Zakura_Node.md).
- Woŋlɔe kple **Rust**, eye wòle MIT / Apache-2.0 mɔgbale eve te, eye wowɔa dɔ le [zcash/zallet](https://github.com/zcash/zallet) me.
- Taɖodzinu si woɖe tsoe: **v0.1.0-beta.4** (November 2, 2026). Emegbe va [NU7](NU7.md), eye ehiã `zebrad` **7.0.0 alo esi wu**.
- Edea ɖoɖonu nyatakakawo tso megbeŋu ɖeka si nye **zebra**: `ReadStateService` wɔa dɔ ɖe `zebrad` ƒe state directory dzi le host ma dzi, kple Zebra ƒe JSON-RPC. Woɖe Zaino megbeŋu ɖa le v0.1.0-beta.4 me.
- Ena **zcashd-sɔ JSON-RPC** ƒe akpa aɖe. Mɔ aɖewo trɔ; wometsɔ aɖewo de eme ɖe ŋutinya ta.
- Woɣaɣla safui ƒe nuwo ɣesiaɣi kple **age**. Gaɖoɖo ƒe ŋutinya, gaɖoƒe ƒe dzesiwo, kple nukpɔsafuiwo nɔa kɔkɔe le `wallet.db` me.
- Eɖea binary eve le archive si wode asi ɖo dzi ɖeka me: `zallet` (dzedzenu) kple `zallet-zebra`. **Linux ko** la woate ŋu azãe atsɔ awɔ wallet ƒe nyatakakawo ƒe sync: ɖoɖonu ƒe megbeŋu aɖeke mewɔa dɔ le macOS alo Windows haɖe.
- `zallet backup` (si va beta.4 me) tsɔa snapshot si le ɖekakpui ɖe sia ɖe me le wallet si le dɔ wɔm alo esi wotu.
- Nyagbalẽ siwo tso wɔnawo gbɔ: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Nu ka ta Zallet li

`zcashd` tsɔ Bitcoin Core-me gbegbɔgblɔ ɖi ɣaɣla dzesi ŋɔŋlɔ kple gakotoku wɔa dɔ le process ɖeka me. Mɔɖoɖo ma megali o.

| Dɔ | Tsã ƒe stack | Fifia ƒe stack |
|------|-----------|---------------|
| Gbegbɔgblɔ ɖi / P2P | `zcashd` | Zebra (`zebrad`) alo Zakura |
| Gakotoku / safuiwo / balance | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Nyatakaka si hiã ƒe indexer | `lightwalletd` | Zaino alo `lightwalletd` |

Esime woɖe gakotoku la tso ɣaɣla dzesi ŋɔŋlɔ la me la, eƒe gɔme nye:

- Wòate ŋu atrɔ ɣaɣla dzesi ŋɔŋlɔ ƒe software (Zebra kpe Zakura) ne womeɖe safuiwo o.
- Gakotoku ƒe didienuwo ŋuti lekpɔkpɔ kple gaɖeɖe ƒe ŋusẽ nɔa process si wòate ŋu aɖo dedie ɖe eɖokui ŋu me.
- RPC ƒe gɔmesese ate ŋu anɔ yiyim ɖe ZIP 32 accounts, Unified Addresses, kple PCZTs ŋu, le teƒe be wòanɔ `zcashd` ƒe nɔnɔ ɖeɖeawo me ɣeaɣi.

Zallet nye gakotoku si woɖo ɖe wɔnɔlawo ta, ame siwo tsɔa `zcashd` wɔa hot gakotoku, gatrɔƒe [exchange] ƒe megbeŋu, ga suewo nanaƒe [faucet], alo nukuku [mining] ƒe fetu nana gakotoku tsã.

---

## Nɔnɔ

Zallet le **beta** me.

Nu si esia gɔmee le wɔwɔ me lae nye:

- Tsoɖoɖo siwo ŋu woate ŋu agbã ate ŋu ava le beta ɖe sia ɖe me. Ate ŋu ahia be nàtutu nyatakaka ƒe agbadɔ la eye nàdze egɔme ake.
- Wometsɔ `zcashd` gakotoku RPC ɖe sia ɖe va o.
- Mɔ siwo woɖe va ƒe gɔmesese aɖewo to vovo na `zcashd` tɔ. Ele be integrationwo naxlẽ [altered-semantics page](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Cratewo le dzidzime eye womekpɔ wo blibo o.
- Zallet menye Rust library o. Meli be wòaxɔ ɖoɖo ɖe eŋu abe library ene o.

Nàɖo numekukuwo ɖe [GitHub issues](https://github.com/zcash/zallet/issues/new) alo `#wallet-dev` channel le [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) dzi.

Woɖoe be nɔnɔ si le tsitre ate ava emegbe ne RPC ƒe ƒome si woɖo ɖe eme la ŋutɔ li. Le ɣeyiɣi ma me la, woalé mɔ na ame siwo yɔa eŋu be woatrɔ yi Zallet ƒe mɔwo dzi, kple gɔmesese ƒe vovototo siwo woŋlɔ ɖe agbalẽ me.

---

## Ɖoɖoɖo

Zallet mamãe le Cargo workspaces dome be ɖoɖonu ƒe megbeŋu sia megbeŋu ŋutɔ nɔ dependency graph ŋu. Elabena v0.1.0-beta.4 ko la, zebra backend ko wòle mɔ̃.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Binary evea katã ʋua `wallet.db` ma ke. Va se ɖe v0.1.0-beta.3 la, `zallet-zaino` backend hã nɔ. Ne wò `zallet.toml` gblɔ be `backend = "zaino"` la, trɔe wòazu `backend = "zebra"`. Gakotoku database la mehiã be woatrɔe o, eye wòate ŋu atutu `zaino` ƒe nɔƒe xoxoa le data directory la me.

Backend si wotsɔa zɛbrae la de woa nye esi: Ɖe `zebrad` ƒe state database ŋu vevie, eye ele be `zebrad` si wowɔ kple `indexer` ƒe feature kple eƒe state directory nanɔ **host ɖeka dzi**. Zallet si le container ɖeka me, si gblɔna kple `zebrad` si le container bubu me le network dzi, menɔa setup si wotsɔa de dɔ me o vaseɖe esime network-only backend va ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Ɖoɖoɖo si wowɔa zi geɖe:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet nye **ɣaɣla dzesi ŋɔŋlɔ blibo gakotoku**: exɔa ɣaɣla dzesi ŋɔŋlɔ si dea ɖoɖonu la dzi si le afi me. Menye nyatakaka si hiã o. Na gakotoku siwo le keklẽ kple compact-block serverwo la, kpɔ [Zaino](Zaino.md) kple [Lightwallet Nodes](Lightwallet_Nodes.md).

Zcash Foundation ƒe [Z3](https://github.com/ZcashFoundation/z3) compose stack la wɔa Zebra kple Zallet ƒuƒo ɖekae, eye wòate ŋu atsɔ Zaino si le eɖokui si hã na external light clients. Eƒe images si woɖo ɖi xoxo hafi NU7 kple Zallet beta.4 va: kpɔ [Z3 Stack](Z3_Stack.md) hafi nàzãe.

---

## Accountwo, gaɖoƒe ƒe dzesiwo, kple safuiwo

Zallet tu ɖe ZIP 32 accounts ŋu, menye `zcashd` ƒe account ɖeka si woɖe tso eme le eɖokui ŋu o.

- Gakotoku ɖeka ate ŋu alé **BIP 39 mnemonics geɖe**. Mnemonic ɖe sia ɖe nye gaɖeɖe ƒe dzideƒe si le eɖokui ŋu, eye woɖea dzesi na e kple **seed fingerprint** (`zip32seedfp1…`).
- Woɖea **Accounts** tso seed me kple ZIP 32 account index. Le Zallet instance ɖeka me la, wo hã wɔnɔ UUID le afi ma. Account ƒe dzesi si wòate ŋu akplɔ ayi afi bubu nye `(seedfp, account index)`.
- Gaɖoƒe ƒe dzesiwo nye **ZIP 316 Unified Addresses**, si woɖea kple `z_getaddressforaccount`. Account ɖeka ate ŋu anɔ gaɖoƒe ƒe dzesi siwo woɖe vovo geɖe; ɣaɣla [shielded] receiverwo mele ka ɖe wo nɔewo ŋu le ɖoɖonu dzi o.
- Gazazãsafui [spending key] siwo woɖe va (`z_importkey`) kple gaɖoƒe ƒe dzesiwo siwo woate ŋu akpɔ ko (`z_importaddress`) trɔa zu UUID accountwo si mnemonic aɖeke metso o.
- Wòate ŋu aɖe nukpɔsafuiwo ɖe go eye nàtsɔ wo ava eme (`z_exportviewingkey`, `z_importviewingkey`), kple unified full viewing keys kple incoming viewing keys.

`getnewaddress` mele dɔ me o. Zã `z_getnewaccount` kple `z_getaddressforaccount`.

Ne `keystore.require_backup` le dɔ wɔm (enye `zcashd` ƒe `walletrequirebackup` ƒe nɔnɔ si woɖe va) la, Zallet gana be wòaɖe gaɖeɖe ƒe ŋusẽ yeye tso mnemonic si ƒe back-up mekpɔ ɖe edzi o me.

---

## Ɣaɣlaŋlɔŋlɔ kple back-upwo

Woɣaɣla safui ƒe nuwo **ɣesiaɣi**. Mɔ aɖeke mele si womeɣaɣla nu le o, eye `encryptwallet` RPC aɖeke meli o — `zcashd` ƒe mɔ ma mewɔ dɔ blibo kpɔ o.

- Dzedze ɖo **age** identity, ƒe mɔ si wozãna le `{datadir}/encryption-identity.txt`.
- Woɖea mnemonics kple gazazãsafui siwo woɖe va ɣaɣla kple age ciphertext le `wallet.db` me.
- Database la ƒe akpa mamlɛ la mewɔ ɣaɣlaŋlɔŋlɔ o. Ne ame aɖe kpɔ file la la, wòate ŋu axlẽ ŋutinya, gaɖoƒe ƒe dzesiwo, kple nukpɔsafuiwo.
- Wòate ŋu aklo identity la kple passphrase (`generate-encryption-identity -p`). Ʋu eƒe ɣaɣla kple `walletpassphrase` RPC; kloe kple `walletlock`.
- Ne identity file alo eƒe passphrase bu la, gazazãsafuiwo mate ŋu agbugbɔ o. Ɖo identity la, mnemonic ɖe sia ɖe, kple (le eɖokui ŋu, eye woɣaɣla) `wallet.db` ƒe copy ɖe teƒe dedie.

Esia oŋlɔ `wallet.db` asi me le esime Zallet le dɔ wɔm la nye dedie ƒe ɖoɖo si meka ɖe dzi o: SQLite ate ŋu akpe. Tso v0.1.0-beta.4, zã [`backup` dzɔdzɔ](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md):

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Eƒoa gaɖoɖo-kpɔɖeŋu, ŋutete-ɖoɖo kpɔɖeŋu snapshot tso gakotoku si le dɔ wɔm alo si woɖe dɔ le ŋu. Ne wò na directory la, eɖɔa file la `zallet-wallet-backup-<UTC time>.db`, eye medzra file si xɔ li xoxo o. Ne gakotoku ŋlɔŋlɔwo le edzi ɖeɖe (abe sync gbãtɔ wɔm ene) eye wogbe eƒe kopi wɔwɔ ta, eƒoa dɔ le ɣleti 10 megbe kple ɖeɖefia ɖeɖe: gaƒoƒo bubu me gaɖo alo ɖe gakotoku la ƒe dɔ ɖa gbã. Backup la me ɣleti identity file la le o. Wòwɔ backup ɖe eŋu zi ɖeka, eye nàdzrae ɖe database backups gbɔ, elabena ame si si wo siawo katã le la ate ŋu aɣaɣla keywo.

---

## JSON-RPC

Zallet wɔa `zcashd` gakotoku RPCwo ƒe akpa aɖe le HTTP dzi kple Basic auth. Bla le loopback. Ele be remote zazã natso encrypted tunnel me. `rpc.allow_insecure_remote_bind` li eye medzɔ o.

Vovototo siwo ƒe vevie tso `zcashd` ŋu:

- Balance ƒe fieldwo le `getwalletinfo` me hã. Zã `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Adzɔ [fee]wo ɖo ŋu kple **ZIP 317**. `settxfee` aɖeke meli o.
- Woɖele gaɖeɖe ƒe tutu yi **PCZTs** (Partially Created Zcash Transactions, ZIP 374) dzi. PCZT RPCwo va le beta ƒe ƒometɔ me.
- **Sync lock** ɖeka le xɔxɔm le balance kple gaɖeɖe RPCwo nu esi gakotoku la le ɖoɖonu la ŋu ɖom alo le eɖeɖe tso reorg me (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Mɔ siwo wometsɔ de eme ɖe ŋutinya ta lae nye `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, kple `encryptwallet`. Woɖe wɔnɔ teƒe ƒe mɔwo fia le [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) me.

---

## Ale si nàdze egɔme

Mɔ̃̃wo siwo woɖo be woatsɔ aka ɖe edzi (Debian packages, Docker, release binaries) le [ɖoɖo ƒe mɔfiame](https://zcash.github.io/zallet/guide/installation/index.html) me. Release archives ŋkɔwoe nye `zallet-v<version>-linux-<amd64|arm64>.tar.gz` eye wòme le `zallet` kple `zallet-zebra`. Docker ƒe images woɖo ɖe go abe `zodlinc/zallet` ene.

Mɔ bɔbɔe si wòatsɔ adze gakotoku yeye gɔme:

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

`[indexer]` Ɖo ɖe local `zebrad` JSON-RPC endpoint la ŋu kple `validator_address`. Ele vevie, eye wòɖoɖo me nye localhost o. Zebra backend hã hiã `[indexer.read_state_service]` kple `zebrad` si ƒe version nye 7.0.0 alo si wu, si woɖo kple `indexer` feature, eye eƒe state directory le host ma dzi, ale be Zallet ate ŋu akpɔ ɖoɖonu ƒe state la tẽ. `indexer.db_path` ɖo ɖe backend si woɖe ɖa Zaino ko ŋu; fifia womeɖoa ta o, eye wòdo warning.

Wòate ŋu atsa image siwo wòate ŋu agbugbɔ awɔ kple [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd image store, GNU Make).

---

## Tso zcashd me yiyim

Lé `zcashd` datadir tso tsã me ɖe asi va se ɖe esime nàkpɔ be balancewo le nyuie eye wòte restore la kpɔ.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` le build siwo wɔ kple `zcashd-import` feature ko me. Be nàxlẽ `wallet.dat` la, ele be nànɔ kple `db_dump` si tso **Berkeley DB 6.2**, version si `zcashd` zã.

Wɔnɔla ƒe nyatakaka si le afɔɖeɖe ɖe afɔɖeɖe: [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Ale si Zallet kplɔa ɖe software bubuwo ŋu

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Nu kae wònye | ɣaɣla dzesi ŋɔŋlɔ RPC gakotoku blibo | Server si wòɖoɖo ɣaɣla ŋgɔ | Gakotoku si dɔla la wɔna | Gbɔgblɔ ɖi ɣaɣla dzesi ŋɔŋlɔ | Nyatakakaŋɔŋlɔ / lightwalletd ƒe ɖɔɖɔ |
| Eɖɔa teƒe | `zcashd` gakotoku | Menye `zcashd` clone si wòate ŋu atsɔ ɖe teƒe | App siwo dɔla la tsɔna alo desktop | `zcashd` ɣaɣla dzesi ŋɔŋlɔ | `lightwalletd` |
| Ehiã ɣaɣla dzesi ŋɔŋlɔ le afi sia | Ee | Ee (Zebra le gɔmedzedze me) | Ao (nyatakaka si hiã ƒe mɔ) | Eya ŋutɔe nye ɣaɣla dzesi ŋɔŋlɔ | Ee |
| zcashd RPC ƒe kompatibiliti | Wɔe be woatsɔe awɔ kompatibiliti mɔ | Subset sue si woɖo ta kpɔe ko | N/A | Eɖe asi kple Zakura kompatibiliti ƒe ɖoɖo | API bubu |
| Gaɖoɖo ƒe nudzɔdzɔ mɔ | Nudziɖola la lé safuiwo le `wallet.db` me | Server si wòate ŋu atsɔ seed agbugbɔ ɖo | Dɔla la ƒe device safuiwo | Gakotoku mele esia me o | Safui aɖeke mele o |

Zallet kple **zecd** katã ate ŋu anɔ Zebra ŋgɔ. Tia Zallet ne `z_*` gakotoku ƒe nɔnɔ hia wò, eye nèdi mɔ be nàva tso `wallet.dat` me. Tia zecd ne nèdi server si ɣaɣla le ŋgɔgblɔme, si meyɔ eɖokui be enye `zcashd` clone o.

Zãla ƒe product bubu le [zallet.io](https://www.zallet.io/) si zãa ŋkɔ ma. App ma menye project sia o.

---

## Axɔpage siwo kplɔe ɖo

- [ɣaɣla dzesi ŋɔŋlɔ blibowo](Full_Nodes.md) — Zebra, Zakura kple ɣaɣla dzesi ŋɔŋlɔ si wowɔ dɔ ɖo la `zcashd`
- [Zebra ɣaɣla dzesi ŋɔŋlɔ blibo](Zebra_Full_Node.md) — ɣaɣla dzesi ŋɔŋlɔ si Zallet ƒe backend si wòɖo ɖi le afɔ̃ me la xɔa nye
- [Zakura ɣaɣla dzesi ŋɔŋlɔ](Zakura_Node.md) — ɣaɣla dzesi ŋɔŋlɔ bubu si tsɔa ŋu wɔa validating
- [Zaino](Zaino.md) — indexer kple server na nyatakaka si hiã ƒe mɔ (light-client); menye Zallet backend o tso beta.4 megbe
- [Z3 Stack](Z3_Stack.md) — Zebra + Zallet ƒe compose stack
- [zecd](ZECD.md) — wallet-server ƒe ɖoɖo bubu le librustzcash dzi
- [Zcash Gakotoku ƒe Sesiɖeɖe](Zcash_Wallet_Syncing.md) — ale si ɣaɣla gakotokuwo scan-na ɖoɖonu
- [Nukpɔsafuiwo](Viewing_Keys.md)

## Agbɔsɔsɔwo

- [Zallet Ƒe ](https://zcash.github.io/zallet/) Agbalẽ
- [zcash/zallet le GitHub](https://github.com/zcash/zallet)
- [Ƒoɖeɖewo](https://github.com/zcash/zallet/releases) · [v0.1.0-beta.4 ƒe ƒoɖeɖe ŋuti nyawo](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [JSON-RPC ƒe nɔnɔme siwo trɔ](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub ƒe tɔtrɔ mɔfiame](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi mɔfiame (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
