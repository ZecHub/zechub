<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet bụ e-akpa ego [wallet] Zcash nke full node, e dere ya na Rust. Ọ bụ nke dochiri e-akpa ego nke a na-etinyebu n'ime `zcashd`. Mgbe `zcashd` ruru nkwụsị Nkwụsị-Nkwado ya na 18 Julaị 2026, na ogo block 3417100, e kewara ọrụ consensus [consensus] na ọrụ e-akpa ego: **Zebra** ma ọ bụ **Zakura** na-enyocha chain, ebe **Zallet** na-edobe igodo, na-enyocha notes, ma na-enye wallet JSON-RPC.

Zallet nọ ugbu a na **beta**. A nyochabeghị ya nke ọma. Mgbanwe na-emebi ndakọrịta nwere ike ịchọ ka ihichapụ ma mepụta e-akpa ego ọzọ. Ewerela ya dịka nchekwa ego nke mmepụta maka nnukwu ọnụọgụ ZEC ma ọ bụrụ na ị gụbeghị ịdọ aka ná ntị nchekwa dị na [Akwụkwọ Zallet](https://zcash.github.io/zallet/).

---

## Nchịkọta ngwa ngwa

- Zallet bụ **e-akpa ego RPC nke full node**, ọ bụghị e-akpa ego light nke ekwentị ma ọ bụghị node consensus.
- Ọ na-anọchi ọkara e-akpa ego nke `zcashd`. Ọkara node bụ [Zebra](Zebra_Full_Node.md) ma ọ bụ [Zakura](Zakura_Node.md).
- E dere ya na **Rust**, o nwere ikikere abụọ MIT / Apache-2.0, a na-elekọta ya na [zcash/zallet](https://github.com/zcash/zallet).
- Mwepụta kacha ọhụrụ e bipụtara ruo ngwụcha Ọgọst 2026: **v0.1.0-beta.3**.
- Ọ na-enweta data chain site n'otu n'ime backend abụọ: **zebra-state** (RPC kpọmkwem [direct `ReadStateService`] megide `zebrad` dị n'ógbè) ma ọ bụ **Zaino**.
- Ọ na-enye akụkụ nke **zcashd-dakọtara JSON-RPC**. Ụfọdụ ụzọ gbanwere; a hapụrụ ụfọdụ n'ebumnobi.
- A na-ezo ihe igodo niile mgbe niile site na **age**. Akụkọ Azụmahia [transaction], adreesị, na viewing key dị n'enweghị nzobe na `wallet.db`.
- Ọ na-ebunye binary atọ n'otu archive e binyere aka: `zallet` (onye mbido), `zallet-zebra`, na `zallet-zaino`.
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

Zallet kewara n'ime Cargo workspaces atọ ka backend chain abụọ ahụ nwee ike iso dependency graph dị iche iche.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Binary atọ ahụ niile na-emeghe **otu** `wallet.db`. Onye mbido na-ahọrọ backend n'oge ọ na-arụ ọrụ; ị gaghị achọ ịchịkọta ya ọzọ iji gbanwee.

Ntinye a na-ahụkarị:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet bụ **e-akpa ego full node**: ọ chọrọ node nyocha dị n'ógbè. Ọ bụghị light client. Maka e-akpa ego light na sava compact-block, lee [Zaino](Zaino.md) na [Nodes Lightwallet](Lightwallet_Nodes.md).

Stack compose Zcash Foundation nke [Z3](https://github.com/ZcashFoundation/z3) na-agba Zebra + Zallet ọnụ, yana nhọrọ Zaino kwụụrụ onwe ya maka light client ndị dị n'èzí.

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

Iṅomi `wallet.db` mgbe Zallet na-agba abụghị backup dị nchebe. SQLite nwere ike mebie akụkụ. Họrọ usoro akwụsịrị, ma ọ bụ chere iwu online-backup gọọmenti.

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

Ụzọ nrụnye gọọmenti (ngwugwu Debian, Docker, binary mwepụta) dị na [ntuziaka nrụnye](https://zcash.github.io/zallet/guide/installation/index.html). A na-akpọ archive mwepụta `zallet-<version>-<arch>.tar.gz`, ha nwekwara binary atọ ahụ niile.

Usoro kacha nta maka e-akpa ego ọhụrụ:

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

Tụọ `[indexer]` gaa na JSON-RPC endpoint `zebrad` dị n'ógbè. Backend zebra chọkwara `[indexer.read_state_service]` na `zebrad` e ji njirimara indexer wuo ka Zallet nwee ike ịgụ ọnọdụ chain kpọmkwem.

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

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Ihe ọ bụ | E-akpa ego RPC full node | Sava e-akpa ego nke e chebere echebe na-ebute ụzọ | E-akpa ego ndị ọrụ njedebe | Node consensus | Indexer / onye dochiri lightwalletd |
| Ihe ọ na-anọchi | E-akpa ego `zcashd` | Ọ bụghị clone `zcashd` nke dochiri ozugbo | Ngwa ekwentị/desktop | Node `zcashd` | `lightwalletd` |
| Ọ chọrọ node mpaghara | Ee | Ee (Zebra site na ndabara) | Mba (light client) | Ọ *bụ* node ahụ | Ee |
| Ndakọrịta RPC zcashd | E mere ya dịka ụzọ ndakọrịta | Naanị obere akụkụ ahọpụtara | N/A | Ọnọdụ ndakọrịta akụkụ / Zakura | API dị iche |
| Ụdị nchekwa | Onye na-arụ ọrụ na-edobe igodo na `wallet.db` | Sava enwere ike iweghachi site na seed | Igodo ngwaọrụ onye ọrụ | Enweghị e-akpa ego | Enweghị igodo |

Zallet na **zecd** nwere ike ịdị n'ihu Zebra. Họrọ Zallet mgbe ịchọrọ elu e-akpa ego `z_*` na ụzọ isi na `wallet.dat` kwaga. Họrọ zecd mgbe ịchọrọ sava nke e chebere echebe na-ebute ụzọ nke *na-abụghị* clone `zcashd` n'ụzọ doro anya.

Enwere ngwaahịa ndị ahịa dị iche na [zallet.io](https://www.zallet.io/) nke na-eji aha ahụ ọzọ. Ngwa ahụ abụghị ọrụ a.

---

## Ibe ndị metụtara ya

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura, na node `zcashd` e lara ezumike
- [Zebra Full Node](Zebra_Full_Node.md) — node backend ndabara Zallet na-agụ
- [Zakura Node](Zakura_Node.md) — node nyocha ọzọ
- [Zaino](Zaino.md) — backend indexer na sava light-client
- [zecd](ZECD.md) — nhazi sava e-akpa ego ọzọ na librustzcash
- [Mmekọrịta E-akpa ego Zcash](Zcash_Wallet_Syncing.md) — otu e-akpa ego nke e chebere echebe si enyocha chain
- [Viewing Keys](Viewing_Keys.md)

## Akụrụngwa

- [Akwụkwọ Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet na GitHub](https://github.com/zcash/zallet)
- [Mwepụta](https://github.com/zcash/zallet/releases)
- [Nghọta JSON-RPC gbanwere](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ntuziaka ịkwaga ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Ntuziaka Raspberry Pi ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (stack compose Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
