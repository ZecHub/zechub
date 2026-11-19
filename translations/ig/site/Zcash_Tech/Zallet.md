<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet bụ e-akpa ego [wallet] Zcash nke full node, e dere ya na Rust. Ọ bụ nke dochiri e-akpa ego nke a na-etinyebu n'ime `zcashd`. Mgbe `zcashd` ruru nkwụsị Nkwụsị-Nkwado ya na 18 Julaị 2026, na ogo block 3417100, e kewara ọrụ consensus [consensus] na ọrụ e-akpa ego: **Zebra** ma ọ bụ **Zakura** na-enyocha chain, ebe **Zallet** na-edobe igodo, na-enyocha notes, ma na-enye wallet JSON-RPC.

Zallet nọ ugbu a na **beta**. A nyochabeghị ya nke ọma. Mgbanwe na-emebi ndakọrịta nwere ike ịchọ ka ihichapụ ma mepụta e-akpa ego ọzọ. Ewerela ya dịka nchekwa ego nke mmepụta maka nnukwu ọnụọgụ ZEC ma ọ bụrụ na ị gụbeghị ịdọ aka ná ntị nchekwa dị na [Akwụkwọ Zallet](https://zcash.github.io/zallet/).

---

## Nchịkọta ngwa ngwa

- Zallet bụ **e-akpa ego RPC nke full node**, ọ bụghị e-akpa ego light nke ekwentị ma ọ bụ node consensus.
- Ọ na-anọchi ọkara e-akpa ego nke `zcashd`. Ọkara node bụ [Zebra](Zebra_Full_Node.md) ma ọ bụ [Zakura](Zakura_Node.md).
- E dere ya na **Rust**, o nwere ikikere abụọ MIT / Apache-2.0, a na-elekọta ya na [zcash/zallet](https://github.com/zcash/zallet).
- Mwepụta kacha ọhụrụ e bipụtara: **v0.1.0-beta.4** (2 Novemba 2026). Ọ na-eso [NU7](NU7.md) ma chọọ `zebrad` **7.0.0 ma ọ bụ karịa**.
- Ọ na-agụ data chain site n'otu backend, **zebra**: `ReadStateService` megide ndekọ ọnọdụ nke `zebrad` dị n'otu igwe, tinyere JSON-RPC nke Zebra. E wepụrụ backend Zaino na v0.1.0-beta.4.
- Ọ na-enye akụkụ nke **zcashd-dakọtara JSON-RPC**. Ụfọdụ ụzọ gbanwere; a hapụrụ ụfọdụ n'ebumnobi.
- A na-ezo ihe igodo niile mgbe niile site na **age**. Akụkọ Azụmahia, adreesị, na viewing key dị n'enweghị nzobe na `wallet.db`.
- Ọ na-ebunye binary abụọ n'otu archive e binyere aka: `zallet` (onye mbido) na `zallet-zebra`. **Linux naanị** maka imekọrịta wallet: ọ dịghị chain backend na-arụ ọrụ na macOS ma ọ bụ Windows.
- `zallet backup` (ọhụrụ na beta.4) na-ewere foto ọnọdụ na-agbanwebeghị nke wallet na-arụ ọrụ ma ọ bụ nke kwụsịrị.
- Akwụkwọ gọọmenti: [Akwụkwọ Zallet](https://zcash.github.io/zallet/).

---

## Ihe kpatara Zallet ji dị

`zcashd` jikọtara node consensus sitere na Bitcoin Core na e-akpa ego n'otu usoro. Nhazi ahụ adịkwaghị.

| Ọrụ | Stack ochie | Stack ugbu a |
|------|-----------|---------------|
| Consensus / P2P | `zcashd` | Zebra (`zebrad`) ma ọ bụ Zakura |
| E-akpa ego / igodo / nha ego | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Ndekọ light-client | `lightwalletd` | Zaino ma ọ bụ `lightwalletd` |

Ikewapụ e-akpa ego n'aka node pụtara:

- Enwere ike ịgbanwe software node (Zebra megide Zakura) n'ebughị igodo.
- Nyocha e-akpa ego na ikike imefu na-adị n'ime usoro nwere ike ichekwa iche.
- Nghọta RPC nwere ike ịga n'ihu n'ebe ZIP akaụntụ 32, Adreesị Njikọtara ọnụ, na PCZT dị, kama ịnọgide kpọchiri na agwa pụrụ iche `zcashd`.

Zallet bụ e-akpa ego e bu n'obi maka ndị na-arụ ọrụ bụbu ndị ji `zcashd` eme e-akpa ego na-ekpo ọkụ, backend exchange, faucet, ma ọ bụ e-akpa ego ịkwụ ụgwọ ịgwụputa [mining].

---

## Ọnọdụ

Zallet nọ na **beta**.

Nke a pụtara n'omume:

- Mgbanwe na-emebi ndakọrịta nwere ike ịpụta na beta ọ bụla. Ị nwere ike ihichapụ ndekọ data ma malite ọzọ.
- Ọ bụghị RPC e-akpa ego `zcashd` niile ka e bugoro.
- Nghọta nke ụfọdụ ụzọ e bugoro dị iche na `zcashd`. Ngwakọta ga-agụrịrị ibe [nke nghọta gbanwere](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- A ka na-emepụta crates ndị a, a nyochabeghịkwa ha nke ọma.
- Zallet **abụghị** ọbá akwụkwọ Rust. Enweghị nkwa ọ bụla ma ọ bụrụ na ị dabere na ya dị ka otu.

Nzaghachi na-aga na nsogbu [GitHub](https://github.com/zcash/zallet/issues/new) ma ọ bụ ọwa `#wallet-dev` na [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

A na-eme atụmatụ ọkwa kwụsiri ike n'ọdịnihu mgbe elu RPC e bu n'obi dị. A ga-atụ anya ka ndị na-akpọ ya kwaga n'ụzọ Zallet, tinyere ọdịiche nghọta e depụtara.

---

## Nhazi

Zallet kewara n'ime Cargo workspaces ka backend chain nke ọ bụla nwee ike iso dependency graph nke ya. Kemgbe v0.1.0-beta.4, ọ bụ naanị backend zebra ka a na-ebunye.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Binary abụọ ahụ na-emeghe otu `wallet.db`. Ruo v0.1.0-beta.3, e nwekwara backend `zallet-zaino`. Ọ bụrụ na `zallet.toml` gị kwuru `backend = "zaino"`, gbanwee ya ka ọ bụrụ `backend = "zebra"`. E nweghị mkpa ịkwaga nchekwa data e-akpa ego, a pụkwara ihichapụ folda `zaino` ochie dị na ndekọ data.

Zebra backend na-agụ nchekwa data ọnọdụ nke `zebrad` ozugbo, ya mere ọ chọrọ `zebrad` e wuru site na njirimara `indexer`, yana ndekọ ọnọdụ ya **n’otu host**. Zallet dị n’ime container kanị na-ekwurịta okwu na `zebrad` dị n’ime container ọzọ site na netwọk enweghị nhazi a kwadoro ruo mgbe backend na-eji naanị netwọk ga-apụta ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Ntinye a na-ahụkarị:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet bụ **e-akpa ego full node**: ọ chọrọ node nyocha dị n'ógbè. Ọ bụghị light client. Maka e-akpa ego light na sava compact-block, lee [Zaino](Zaino.md) na [Nodes Lightwallet](Lightwallet_Nodes.md).

Igwe nhazi Zcash Foundation nke [Z3](https://github.com/ZcashFoundation/z3) na-arụ Zebra na Zallet ọnụ, tinyere Zaino nọọrọ onwe ya ma ọ bụrụ na achọrọ ya maka light clients ndị dị na mpụga. Ihe oyiyi ndị e tinyere akara ụdị ha bụ nke dị tupu NU7 na beta.4 nke Zallet: lee [Z3 Stack](Z3_Stack.md) tupu i jiri ya.

---

## Akaụntụ, adreesị, na igodo

Zallet wuru gburugburu akaụntụ ZIP 32, ọ bụghị otu akaụntụ zoro ezo nke `zcashd`.

- E-akpa ego nwere ike ijide **mnemonic BIP 39 ọtụtụ**. Mnemonic ọ bụla bụ mgbọrọgwụ imefu nọọrọ onwe ya, nke a na-amata site na **seed fingerprint** (`zip32seedfp1…`).
- A na-esite na seed mepụta **akaụntụ** site na ndepụta akaụntụ ZIP 32. N'ime otu instance Zallet, ha nwekwara **UUID** mpaghara. Njirimara akaụntụ a pụrụ ibufe bụ `(seedfp, account index)`.
- Adreesị bụ **Adreesị Njikọtara ọnụ ZIP 316**, nke e ji `z_getaddressforaccount` emepụta. Otu akaụntụ nwere ike inwe ọtụtụ adreesị dịgasị iche; ndị nata nke e chebere echebe [shielded] enweghị ike ijikọ ha on-chain.
- Igodo ego [spending key] e bubatara (`z_importkey`) na adreesị naanị-ile (`z_importaddress`) na-aghọ akaụntụ UUID nke mnemonic ọ bụla anaghị ekpuchi.
- Enwere ike ibupụ ma bubata viewing key (`z_exportviewingkey`, `z_importviewingkey`), gụnyere unified full viewing key na incoming viewing key.

`getnewaddress` etinyebeghị ya n'ọrụ. Jiri `z_getnewaccount` na `z_getaddressforaccount`.

Ọ bụrụ na `keystore.require_backup` agbanyere (ụdị e bugoro nke `zcashd` `walletrequirebackup`), Zallet na-ajụ ịmepụta ikike imefu ọhụrụ site na mnemonic nke akwadobeghị backup ya.

---

## Nzobe ederede na backups

A na-enwe **Nzobe ederede [encryption]** maka ihe igodo mgbe niile. Enweghị ọnọdụ enweghị nzobe yana enweghị RPC `encryptwallet` — a kwadobeghị ụzọ `zcashd` ahụ nke ọma.

- Nhazi na-emepụta **age** identity, ụzọ ndabara bụ `{datadir}/encryption-identity.txt`.
- A na-echekwa mnemonics na igodo ego e bubatara dịka age ciphertext na `wallet.db`.
- A naghị ezo akụkụ ndị ọzọ nke database. Akụkọ, adreesị, na viewing key nwere ike ịgụ ma ọ bụrụ na mmadụ enweta faịlụ ahụ.
- Enwere ike iji passphrase kechie identity ahụ (`generate-encryption-identity -p`). Mepee ya site na RPC `walletpassphrase`; kpọchie ya site na `walletlock`.
- Ịtụfu faịlụ identity ma ọ bụ passphrase ya na-eme ka igodo ego ghara inwetaghachi. Kwado identity, mnemonic ọ bụla, na (nke e zoro iche) mbipụta `wallet.db` ọ bụla ị debere.

Iji aka detuo `wallet.db` mgbe Zallet na-arụ ọrụ abụghị ụzọ nchekwa ndabere dị nchebe: SQLite nwere ike imebi. Kemgbe v0.1.0-beta.4, jiri iwu [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md):

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Ọ na-ede snapshot nke e-akpa ego na-arụ ọrụ ma ọ bụ kwụsịrị, nke kwekọrọ na Azụmahia ma nyochaa iguzosi ike n'ezi ihe ya. Ọ bụrụ na e nyere ya ndekọ, ọ na-akpọ faịlụ ahụ `zallet-wallet-backup-<UTC time>.db`, ọ dịghịkwa mgbe ọ na-edechi faịlụ dị adị. Ọ na-ada ụda nke ọma mgbe nkeji iri gachara ma ọ bụrụ na ide ihe mgbe niile na e-akpa ego (dịka n'oge mmekọrịta mbụ) na-eme ka usoro iṅomi malitegharịa ugboro ugboro: nwaa ọzọ ma emechaa ma ọ bụ buru ụzọ kwụsị e-akpa ego. Ndabere ahụ anaghị etinye faịlụ njirimara age. Kwado faịlụ ahụ otu ugboro ma debe ya iche na ndabere nchekwa data, n'ihi na onye ọ bụla nwere ha abụọ nwere ike izochapụ igodo ndị ahụ.

---

## JSON-RPC

Zallet na-etinye akụkụ nke RPC e-akpa ego `zcashd` n'ọrụ n'elu HTTP na Basic auth. Kechie ya na loopback. Ojiji n'ebe dị anya kwesịrị ịga site na tunnel e zoro ezo. `rpc.allow_insecure_remote_bind` dị ma ọ dịghị nchebe.

Ọdịiche pụtara ìhè na `zcashd`:

- Mpaghara nha ego na `getwalletinfo` tọgbọ chakoo. Jiri `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Ugwo [fee] na-agbaso **ZIP 317**. Enweghị `settxfee`.
- Iwu imefu na-agakwuru **PCZT** (Azụmahia Zcash e mepụtara akụkụ ụfọdụ, ZIP 374). RPC PCZT rutere na usoro beta.
- **Sync lock** zuru ụwa ọnụ na-egbochi RPC nha ego na imefu mgbe e-akpa ego na-agbakọ ma ọ bụ na-agbake n'aka reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Ụzọ a hapụrụ n'ebumnobi gụnyere `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, na `encryptwallet`. E depụtara ndị dochiri ha na [Akwụkwọ Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Ịmalite

Ụzọ nrụnye gọọmentị (ngwugwu Debian, Docker, faịlụ mmemme ewepụtara) dị na [ntuziaka nrụnye](https://zcash.github.io/zallet/guide/installation/index.html). A na-akpọ ebe nchekwa faịlụ ewepụtara `zallet-v<version>-linux-<amd64|arm64>.tar.gz`, ha nwekwara `zallet` na `zallet-zebra`. A na-ebipụta onyonyo Docker dịka `zodlinc/zallet`.

Usoro kacha nta maka e-akpa ego ọhụrụ:

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

Tụọ `[indexer]` aka na njedebe JSON-RPC `zebrad` dị n’ime kọmputa a site na `validator_address`. Ọ dị mkpa, ọ naghịkwa eji localhost dịka ndabara. Backend zebra chọkwara `[indexer.read_state_service]` na `indexer` 7.0.0 ma ọ bụ nke ọhụrụ, nke e ji feature `zebrad` wuo, nke ndekọ ọnọdụ ya dị n’otu host, ka Zallet nwee ike ịgụ ọnọdụ chain ozugbo. `indexer.db_path` na-ahazi naanị backend Zaino e wepụrụ; a na-eleghara ya anya ugbu a, tinyere ịdọ aka ná ntị.

Enwere ike iwulite image ndị enwere ike imegharị site na [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd image store, GNU Make).

---

## Ịkwaga site na zcashd

Debe datadir `zcashd` ochie ruo mgbe ị kwadoro nha ego ma nwalee iweghachi ya.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` dị naanị na builds nwere njirimara `zcashd-import`. Ịgụ `wallet.dat` chọrọ `db_dump` sitere na **Berkeley DB 6.2**, ụdị `zcashd` ji mee ihe.

Ndetu ndị ọrụ nzọụkwụ-nzọụkwụ: [Ntuziaka Ịkwaga: zcashd gaa Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Otu Zallet si emetụta software ndị ọzọ

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Ihe ọ bụ | e-akpa ego RPC nke full-node | Sava e-akpa ego nke na-ebute nke e chebere echebe ụzọ | e-akpa ego ndị ọrụ ikpeazụ | node consensus | Ndochie onye na-edepụta ndeksi / lightwalletd |
| Ihe ọ na-anọchi | e-akpa ego `zcashd` | Ọ bụghị oyiri `zcashd` nke a pụrụ iji dochie ozugbo | Ngwa ekwentị/ngwa kọmputa | node `zcashd` | `lightwalletd` |
| Ọ chọrọ node dị na mpaghara | Ee | Ee (Zebra na ndabara) | Mba (light client) | Ọ bụ node ahụ n'onwe ya | Ee |
| Ndakọrịta RPC nke zcashd | E haziri ya ka ọ bụrụ ụzọ ndakọrịta | Ọ bụ naanị obere akụkụ a họọrọ | Ọ dịghị mkpa | Ụfọdụ / ọnọdụ ndakọrịta Zakura | API dị iche |
| Ụdị njide | Onye na-arụ ọrụ na-ejide igodo na `wallet.db` | Sava a pụrụ iweghachi site na seed | Igodo dị na ngwaọrụ onye ọrụ | Enweghị e-akpa ego | Enweghị igodo

Zallet na **zecd** nwere ike ịdị n'ihu Zebra. Họrọ Zallet mgbe ịchọrọ elu e-akpa ego `z_*` na ụzọ isi na `wallet.dat` kwaga. Họrọ zecd mgbe ịchọrọ sava nke e chebere echebe na-ebute ụzọ nke *na-abụghị* clone `zcashd` n'ụzọ doro anya.

Enwere ngwaahịa ndị ahịa dị iche na [zallet.io](https://www.zallet.io/) nke na-eji aha ahụ ọzọ. Ngwa ahụ abụghị ọrụ a.

---

## Ibe ndị metụtara ya

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura, na node `zcashd` a kwụsịrị iji
- [Zebra Full Node](Zebra_Full_Node.md) — ihe ndabere node nke Zallet na-agụ
- [Zakura Node](Zakura_Node.md) — node ọzọ na-enyocha
- [Zaino](Zaino.md) — ihe na-edepụta ndekọ na sava light-client (ọ bụghịzi ihe ndabere Zallet kemgbe beta.4)
- [Z3 Stack](Z3_Stack.md) — nchikọta Zebra + Zallet
- [zecd](ZECD.md) — ụdị sava e-akpa ego ọzọ dabere na librustzcash
- [Zcash Mmekọrịta e-akpa ego](Zcash_Wallet_Syncing.md) — otu e-akpa ego nke e chebere echebe si enyocha chain
- [Igodo Nlele](Viewing_Keys.md)

## Akụrụngwa

- [Akwụkwọ Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet na GitHub](https://github.com/zcash/zallet)
- [Mwepụta](https://github.com/zcash/zallet/releases) · [ndepụta mgbanwe v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [ihe gbanwere n’usoro JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub ntuziaka mbufe](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub ntuziaka Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet nchịkọta compose)](https://github.com/ZcashFoundation/z3)
- [Zcash Nnyocha na Mmepe Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
