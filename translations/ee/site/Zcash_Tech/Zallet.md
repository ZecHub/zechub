<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="AƉe Axɔ"/>
</a>

# Zallet

Zallet nye ɣaɣla dzesi ŋɔŋlɔ blibo Zcash gakotoku [wallet] si woŋlɔ kple Rust. Enye gakotoku si ɖo teƒe na esi nɔ `zcashd` me tsã. Le esime `zcashd` va ɖo eƒe Kpekpeɖeŋu Nuva Kaka le 18 July 2026 le gaɖoɖowo ƒuƒoƒe [block] ƒe kɔkɔme 3417100 la, womama gbegbɔgblɔ ɖi [consensus] kple gakotoku ƒe dɔwo: **Zebra** alo **Zakura** dea ɖoɖonu [chain] la dzi, eye **Zallet** lée safuiwo me, le didienuwo [note] ŋuti, eye wòna gakotoku JSON-RPC la.

Zallet Le **beta** me fifia. Womema kpe ɖe eŋu bliboa o. Tɔtrɔ siwo agbã nu ate ŋu abia be woatu gakotoku [wallet] la ɖa eye woawɔe azɔ. Mègawɔe abe asikplɔ-dzralá si le dɔ wɔm na ZEC geɖe o ne mèxlẽ dedienyawo tso ŋgɔ le [Zallet Ƒe Agbalẽ](https://zcash.github.io/zallet/) me o.

---

## TL;DR

- Zallet nye **ɣaɣla dzesi ŋɔŋlɔ blibo RPC gakotoku**, menye mobile nyatakaka si hiã [light client] gakotoku o, eye menye gbegbɔgblɔ ɖi ƒe ɣaɣla dzesi ŋɔŋlɔ o.
- Ewɔ ɖe teƒe na `zcashd` ƒe gakotoku akpa. Ɣaɣla dzesi ŋɔŋlɔ akpa la nye [Zebra](Zebra_Full_Node.md) alo [Zakura](Zakura_Node.md).
- Woŋlɔe kple **Rust**, eye wòle MIT / Apache-2.0 mɔgbale eve te, eye woɖea eŋu le [zcash/zallet](https://github.com/zcash/zallet) me.
- Taɖodzinu si woɖe tsoe le August 2026 ƒe nuwuwu nye: **v0.1.0-beta.3**.
- Etsɔa mɔ eve dometɔ ɖeka ƒe megbeŋu kpɔa ɖoɖonu ƒe nyatakakawo: **zebra-state** (`ReadStateService` si tso teƒe ɖeka yi teƒe bubu le `zebrad` si le afi me) alo **Zaino**.
- Ena **zcashd-sɔ JSON-RPC** ƒe akpa aɖe. Mɔ aɖewo trɔ; wometsɔ aɖewo de eme ɖe ŋutinya ta.
- Woɣaɣla safui ƒe nuwo ɣesiaɣi kple **age**. Gaɖoɖo ƒe ŋutinya, gaɖoƒe ƒe dzesiwo, kple nukpɔsafuiwo [viewing key] nɔa kɔkɔe le `wallet.db` me.
- Eɖea binary atọ le archive si wode asi ɖo dzi ɖeka me: `zallet` (dzedzenu), `zallet-zebra`, kple `zallet-zaino`.
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

Zallet mamãe le Cargo workspaces atọ dome be ɖoɖonu ƒe megbeŋu eve la nɔ dependency graphs vovovo ŋu.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Binary atọ katã ʋua **`wallet.db` ma ke**. Dzedzenu la tia megbeŋu le esime wòle dɔ wɔm; mele be nàɖo eɖokui ake be nàtrɔ o.

Ɖoɖoɖo si wowɔa zi geɖe:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet nye **ɣaɣla dzesi ŋɔŋlɔ blibo gakotoku**: exɔa ɣaɣla dzesi ŋɔŋlɔ si dea ɖoɖonu la dzi si le afi me. Menye nyatakaka si hiã o. Na gakotoku siwo le keklẽ kple compact-block serverwo la, kpɔ [Zaino](Zaino.md) kple [Lightwallet Nodes](Lightwallet_Nodes.md).

Zcash Foundation ƒe [Z3](https://github.com/ZcashFoundation/z3) compose stack la na Zebra kple Zallet wɔa dɔ kpeɖeŋu, kple Zaino si ate ŋu anɔ eɖokui ŋu na nyatakaka si hiã siwo tso afima.

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

Ne nàcopy `wallet.db` esi Zallet le dɔ wɔm la, menye back-up dedie o. SQLite ate ŋu aɖe. Tsɔ process si wotso wɔwɔ me, alo nàlala ɖe online-backup ƒe mɔ si wɔnawo anɔ.

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

Mɔ siwo tso wɔnawo gbɔ be nàtsɔ ado (Debian packages, Docker, release binaries) le [installation guide](https://zcash.github.io/zallet/guide/installation/index.html) me. Woŋlɔ release archivewo ƒe ŋkɔ be `zallet-<version>-<arch>.tar.gz`, eye binary atọ katã le wo me.

Mɔ bɔbɔe si wòatsɔ adze gakotoku yeye gɔme:

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

Ɖo `[indexer]` ɖe `zebrad` JSON-RPC endpoint si le afi me ŋu. Zebra ƒe megbeŋu hã di `[indexer.read_state_service]` kple `zebrad` si woɖo kple indexer feature be Zallet nate ŋu axlẽ ɖoɖonu ƒe nɔnɔ tso teƒe ma tẽ.

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

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Nu si wònye | Ɣaɣla dzesi ŋɔŋlɔ blibo RPC gakotoku | Ɣaɣla-first gakotoku server | Gakotokuwo na zãla | Gbegbɔgblɔ ɖi ƒe ɣaɣla dzesi ŋɔŋlɔ | Indexer / lightwalletd ƒe teƒe wɔla |
| Eɖoa teƒe na | `zcashd` gakotoku | Menye `zcashd` clone si wòate ŋu atsɔ anyi tẽ o | Mobile/desktop apps | `zcashd` ɣaɣla dzesi ŋɔŋlɔ | `lightwalletd` |
| Ehia ɣaɣla dzesi ŋɔŋlɔ si le afi me | Ẽ | Ẽ (Zebra le eɖokui ŋu) | Ao (nyatakaka si hiã) | Eya ŋutɔe nye ɣaɣla dzesi ŋɔŋlɔ la | Ẽ |
| zcashd RPC compat | Woɖoe be wòanye compat ƒe mɔ | Akpa sue si wo tia ko | N/A | Partial / Zakura compat mode | API vovovo |
| Asikplɔ ƒe mɔ | Wɔnɔla lée safuiwo me le `wallet.db` | Server si wòate ŋu agbugbɔ atsɔ seed | Zãla ƒe device safuiwo | Gakotoku meli o | Safui aɖeke meli o |

Zallet kple **zecd** katã ate ŋu anɔ Zebra ŋgɔ. Tia Zallet ne `z_*` gakotoku ƒe nɔnɔ hia wò, eye nèdi mɔ be nàva tso `wallet.dat` me. Tia zecd ne nèdi server si ɣaɣla le ŋgɔgblɔme, si meyɔ eɖokui be enye `zcashd` clone o.

Zãla ƒe product bubu le [zallet.io](https://www.zallet.io/) si zãa ŋkɔ ma. App ma menye project sia o.

---

## Axɔpage siwo kplɔe ɖo

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura, kple `zcashd` ɣaɣla dzesi ŋɔŋlɔ si wogblẽ
- [Zebra Full Node](Zebra_Full_Node.md) — ɣaɣla dzesi ŋɔŋlɔ si Zallet ƒe megbeŋu si wozãna le eɖokui ŋu xlea
- [Zakura Node](Zakura_Node.md) — ɣaɣla dzesi ŋɔŋlɔ bubu si dea ɖoɖonu
- [Zaino](Zaino.md) — indexer ƒe megbeŋu kple nyatakaka si hiã ƒe server
- [zecd](ZECD.md) — gakotoku-server ƒe mɔɖoɖo bubu le librustzcash dzi
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — ale si ɣaɣla gakotokuwo kpɔa ɖoɖonu la ŋu
- [Viewing Keys](Viewing_Keys.md)

## Agbɔsɔsɔwo

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet le GitHub](https://github.com/zcash/zallet) dzi
- [Releases](https://github.com/zcash/zallet/releases)
- [JSON-RPC ƒe gɔmesese siwo trɔ](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub ƒe migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi ƒe mɔfia (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
