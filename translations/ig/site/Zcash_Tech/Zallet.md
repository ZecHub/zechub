<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet bụ obere akpa ego Zcash zuru oke nke edere na Rust. Ọ bụ ihe nnọchi maka obere akpa eji etinye ya n'ime `zcashd`Mgbe . `zcashd` ruru njedebe nke nkwado ya na 18 July 2026 na ngọngọ dị elu 3417100, nkwekọrịta na ọrụ obere akpa kewara: ** Zebra** ma ọ bụ ** Zakura** kwadoro agbụ ahụ, yana ** Zallet ** nwere igodo, nyocha ederede, wee kpughee obere akpa JSON-RPC.

Zallet dị ugbu a na ** beta**. A nyochabeghị ya nke ọma. Mgbanwe ndị mebiri emebi nwere ike ịchọ ihichapụ ma weghachite obere akpa ahụ. Ejila ya dịka nchekwa mmepụta maka nnukwu ego ZEC n'agụghị ịdọ aka ná ntị nchebe na-esote: [Akwụkwọ Zallet ahụ .](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet bụ **wallet RPC zuru oke**, ọ bụghị obere akpa ọkụ na-agagharị agagharị ma ọ bụghị nkwekọrịta.
- Ọ na-anọchi akpa ego ọkara nke `zcashd`Ọkara ọnụ bụ . [Zebra](Zebra_Full_Node.md) or [Zakura](Zakura_Node.md).
- Edere na **Rust**, MIT / Apache-2.0 nwere ikikere abụọ. A na-echekwa ya n'ime [zcash/zallet](https://github.com/zcash/zallet).
- Mbipụta ikpeazụ e bipụtara na ngwụcha Ọgọstụ 2026: **v0.1.0-beta.3**.
- Na-ekwu okwu na data agbụ site n'otu abụọ backends: ** zebra -state** (direct `ReadStateService` megide obodo. `zebrad`) ma ọ bụ ** Zaino**.
- Na-ekpughe ** zcashd - dakọtara JSON-RPC subset. Ụfọdụ usoro gbanwere; ụfọdụ ehichapụla na nzube.
- A na-eji ihe nchọgharị ahụ eme ka ọ bụrụ mgbe niile site n'iji ** afọ**. Akụkọ azụmahịa, adreesị, na igodo elele nọchiri anya ya `wallet.db`.
- Na-ebufe atọ ọnụọgụ abụọ n'otu ebe nchekwa edepụtara: `zallet` (onye na-agbapụ), `zallet-zebra`, na `zallet-zaino`.
- Akwụkwọ ndị gọọmentị: [Akwụkwọ Zallet ahụ .](https://zcash.github.io/zallet/).

---

## Ihe mere Zallet ji dịrị ndụ.

`zcashd` a na-ejikọta Bitcoin Core nke sitere na nkwekọrịta nkwenye na obere akpa n'otu usoro. E meela atụmatụ ahụ.

 Ọrụ: Old stack, ugbu a na-arụ ọrụ.
|------|-----------|---------------|
◯ Nkwekọrịta / P2P. `zcashd` Zebra (Ụmụ anụmanụ)`zebrad`) ma ọ bụ Zakura.
 Akpa ego / igodo / nguzozi. `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
◯ Onye na-edepụta ihe nke onye ahịa dị mfe. `lightwalletd` ◯ Zaino ma ọ bụ `lightwalletd` |

Ịkewa obere akpa ahụ site na ọnụ pụtara:

- Enwere ike ịgbanwere ngwanrọ Node (Zebra vs Zakura) na-enweghị igodo mbugharị.
- Nnyocha obere akpa ego na ikike imefu ihe bi n'ime usoro enwere ike igbachi iche.
- RPC semantics nwere ike ịbawanye na akaụntụ ZIP 32, Unified Addresses, na PCZTs kama ịnọ jụụ na `zcashd` ihe ndị na-adịghị mma.

Zallet bụ obere akpa ezubere maka ndị ọrụ na-agba ọsọ n'oge gara aga. `zcashd` dị ka obere akpa ego, azụmaahịa mgbanwe, ọkpọkọ mmiri, ma ọ bụ obere akpa ụgwọ ọrụ.

---

## Ọnọdụ ya

Zallet nọ na beta.

Ihe nke ahụ pụtara n'omume:

- Mgbanwe mgbanwe nwere ike ịdaba na beta ọ bụla. Ị nwere ike ihichapụ ndekọ data ma malite ọzọ.
- Ọ bụghị ha niile . `zcashd` e meela ka akpa ego RPC dị.
- Semantics nke ụfọdụ ụzọ ndị a na-eme ka ha dị iche site n'aka: `zcashd`. Integrations ga-agụ ndị na-esote. [peeji nke gbanwere-semantics](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- A na-arụpụta igbe ndị ahụ ma e nyochabeghị ha nke ọma.
- Zallet abụghị ọbá akwụkwọ Rust. Enweghị nkwa ma ị dabere na ya dịka otu.

Nzaghachi na-aga n'ihu. [Okwu GitHub](https://github.com/zcash/zallet/issues/new) ma ọ bụ na- `#wallet-dev` ọwa na-aga n'ihu. [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

A later stable phase is planned once the intended RPC surface exists. Callers will then be expected to migrate onto Zallet’s methods, including the documented semantic differences.

---

## Ihe owuwu ụlọ

Zallet kewara n'ime ebe ọrụ Cargo atọ ka ndị na-azụ azụ abụọ nwere ike soro eserese dị iche iche.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Ihe atọ ahụ na-emepe otu ụzọ. `wallet.db`. Onye na-ebute ihe ahụ ga - ahọrọ ebe a ga - eme ya n'oge ọ na - agba ọsọ; ị gaghị emegharị ọzọ iji gbanwee.

Ntinye aka na-adịkarị:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet bụ **wallet zuru oke**: ọ na-atụ anya ka a kwadoro mpaghara. Ọ bụghị onye ahịa dị mfe. Maka obere akpa ego na kọmpat-ngọngọ sava, lee [Zaino](Zaino.md) na nke a: [Lightwallet Nodes (Nọmba nke obere akpa ego)](Lightwallet_Nodes.md).

Ụlọ ọrụ Zcash Foundation s [Z3](https://github.com/ZcashFoundation/z3) mepụta nchịkọta na-agba ọsọ Zebra + Zallet ọnụ, yana nhọrọ Zaino kwụ ọtọ maka ndị ahịa ọkụ mpụga.

---

## Akaụntụ, adreesị na igodo.

Zallet wuru gburugburu ZIP 32 akaụntụ, ọ bụghị `zcashd` bụ otu akaụntụ doro anya.

- Otu obere akpa nwere ike ijide ọtụtụ BIP 39 mnemonics. Mnemonic ọ bụla bụ mgbọrọgwụ na-akwụ ụgwọ, nke a maara site na mkpịsị aka mkpụrụ osisi (seed fingerprint)`zip32seedfp1…`).
- ** Akaụntụ** sitere na mkpụrụ nwere ndepụta akaụntụ ZIP 32. N'ime otu Zallet ha nwekwara mpaghara ** UUID. Njirimara nke a ga-ebugharị maka akaụntụ bụ: `(seedfp, account index)`.
- Adreesị bụ **ZIP 316 Unified Addresses**, nke e dere na `z_getaddressforaccount`Otu akaụntụ nwere ike inwe ọtụtụ adreesị dịgasị iche; ndị na-anata ihe nchebe enweghị njikọ n'elu.
- Ihe ndị e ji eme ihe n'ime obodo (`z_importkey`) na adreesị ndị e ji elekere anya (`z_importaddress`) na-aghọ akaụntụ UUID nke enweghị mkpuchi mnemonic.
- Igodo nlele nwere ike ibupụ ma bubata (`z_exportviewingkey`, `z_importviewingkey`), gụnyere n'otu zuru ezu na-ele igodo na esịtidem ele igodo.

`getnewaddress` E tinyeghị ya n'ọrụ. Jiri `z_getnewaccount` na nke a: `z_getaddressforaccount`.

If `keystore.require_backup` bụ na (migrated ụdị nke `zcashd`’s `walletrequirebackup`), Zallet jụrụ inweta ikike mmefu ọhụrụ site na onye ncheta nke nkwado ndabere ya adịghị.

---

## Nkọwapụta na nkwado ndabere

Key material is **always** encrypted. There is no unencrypted mode and no `encryptwallet` RPC  na-ekwu na ọ bụ ihe dị mkpa. `zcashd` usoro a enwetaghị nkwado zuru oke.

- Ntọala na-emepụta njirimara ** afọ, ụzọ ndabara `{datadir}/encryption-identity.txt`.
- A na-echekwa ihe ncheta na igodo mmefu ego dị ka afọ ciphertexts n'ime nchekwa data. `wallet.db`.
- Ihe ndị ọzọ nke nchekwa data ahụ abụghị ** ezoro ezo. Akụkọ ihe mere eme, adreesị na igodo nlele nwere ike ịgụ ma ọ bụrụ na mmadụ enweta faịlụ ahụ.
- Enwere ike itinye paswọọdụ na njirimara ahụ (`generate-encryption-identity -p`) Ị kpọghee ekwt na-eji ihe ahụ . `walletpassphrase` RPC; mkpọchi na-eji: `walletlock`.
- Ịhapụ faịlụ njirimara ma ọ bụ paswọọdụ ya na-eme ka igodo mmefu ghara ịghachite. Zọpụta ihe ncheta, onye ọbụla mnemonic, yana (nkewapụ iche, ezoro ezo) ọ bụla `wallet.db` edetu na-edebe.

Iṅomi Ihe Ndị E Dere na Ya `wallet.db` mgbe Zallet na-agba ọsọ abụghị nchekwa ndabere. SQLite nwere ike ịdọpụ ya. Họrọ usoro kwụsịrị, ma ọ bụ chere maka iwu ntanetị nke ọrụ nkwado.

---

## JSON-RPC

Zallet na-emejuputa otu akụkụ nke usoro ahụ. `zcashd` obere akpa RPCs n'elu HTTP na Basic auth. Jikọta ya na loopback. Iji dịpụrụ adịpụ kwesịrị ịgafe ọwara ezoro ezo. `rpc.allow_insecure_remote_bind` dị adị ma bụrụkwa ihe na-adịghị nchebe.

Ọdịiche ndị dị ịrịba ama site na nke mbụ. `zcashd`:

- Uzo ogugu na onodu nke ozo. `getwalletinfo` E nweghị ihe dị na ha. `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Ụgwọ ndị a na-eso **ZIP 317**. Ọ dịghị ụgwọ ọ bụla dịnụ maka ọrụ ahụ ma e wezụga nke mbụ, bụ́ ego ole ha ga-akwụ gị n'ọnwa ọzọ. `settxfee`.
- Mmefu mmepụta na-agagharị n'ime ** PCZTs** (Nkebi nke Zcash Transactions, ZIP 374). PCZT RPCs rutere na usoro beta.
- Global ** sync lock** na-egbochi nguzozi ma jiri RPC mgbe obere akpa ahụ na - achọta ma ọ bụ gbakee site na nhazi (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Usoro ndị a na-eleghara anya gụnyere: `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, na `encryptwallet`A na-edepụta ndị nnọchi anya ha n'akwụkwọ ahụ . [Akwụkwọ Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Ịmalite amalite .

Official wụnye ụzọ (Debian ngwugwu, Docker, ntọhapụ ọnụọgụ abụọ) na-na nchekwa data. [ntuziaka nwụnye.](https://zcash.github.io/zallet/guide/installation/index.html)A na-akpọ aha nchekwa data ntọhapụ . `zallet-<version>-<arch>.tar.gz` ma nwee ihe atọ ahụ.

Obere ego ọhụrụ-wallet:

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

Isiokwu `[indexer]` n'ụlọ ọrụ dị na mpaghara ahụ. `zebrad` JSON-RPC njedebe. The zebra backend na-achọkwa `[indexer.read_state_service]` na a `zebrad` wuru na njirimara indexer ka Zallet nwee ike ịgụ ọnọdụ agbụ ozugbo.

Enwere ike ịmepụta ihe oyiyi ndị nwere ike ịmegharị na ya. [Ọkwa X](https://codeberg.org/stagex/stagex/) (Docker 25+, ụlọ ahịa ihe oyiyi containerd, GNU Mee).

---

## Ịkwaga site na zcashd

Debe ihe ochie ahụ . `zcashd` dataadir ruo mgbe ị nwere enen balances na a nwalere weghachi.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` bụ naanị na-ewu ya n'ime ihe ndị a. `zcashd-import` Ịgụ ihe. `wallet.dat` mkpa ndị mmadụ nwere. `db_dump` site na ** Berkeley DB 6.2**, ụdị ahụ `zcashd` eji.

Nzọụkwụ site nzọụkwụ onye ọrụ na-ekwu: [Ntuziaka Mbugharị: zcashd na Zebrad/Zallet.](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Olee otú Zallet si emekọrịta na ngwanrọ ndị ọzọ

Zallet  zecd Zashi / ZODL / YWallet Zebra / Zakura Zaino Nke a bụ ihe dị na peeji nke 2
|--|--------|------|------------------------|----------------|-------|
◯ Ihe ọ bụ: Full-node RPC wallet ▸ Shielded-first wallet server ❖ End user wallets 📅 Consensus node  Indexer / lightwalletd replacement‬ ￼ Ọ bụrụ na ị nwere ike ịchọta ihe ndị ọzọ, biko kpọtụrụ anyị.
Ọ na-anọchi anya. `zcashd` Akpa ego. Ọ bụghị ihe a na-eji agagharị agagharị n'ụlọ ọrụ ahụ `zcashd` clone  Ngwaọrụ mkpanaka/desktọpụ  Gosi ihe ngosi nke ngwa ahụ. `zcashd` ọnụ. `lightwalletd` |
❑ Chọrọ otu mpaghara ebe. ● Ee (Zebra site na ndabara) ▪ Mba (onye ahịa dị mfe). * Ọ bụ* ọnụ ụlọ ahụ. □ Ee
 zcashd RPC compat  Ezubere dị ka ụzọ kọmpụta  Obere subset ahọpụtara naanị N/A  Partial / Zakura Compat mode  API dị iche
◯ Ụdị nlekọta. Onye na-arụ ọrụ ji mkpịsị ugodi n'ime ya `wallet.db` Ihe nkesa nwere ike weghachite mkpụrụ. Igodo ngwaọrụ onye ọrụ enweghị obere akpa ego, igodo adịghị.

Zallet and **zecd** can both sit in front of Zebra. Pick Zallet when you need the `z_*` obere akpa elu na a Mbugharị ụzọ si `wallet.dat`. Họrọ zecd mgbe ịchọrọ ihe nkesa nke mbụ na-echebe bụ nke doro anya * abụghị* a `zcashd` onye na-eme ka mmadụ.

E nwere ngwaahịa ndị ọzọ dị iche na nke a. [zallet.io](https://www.zallet.io/) nke na-eji aha ahụ eme ihe. Ngwa a abụghị ọrụ a.

---

## Peeji ndị metụtara ya

- [Nọmba zuru ezu](Full_Nodes.md)  Zebra, Zakura na ndị lara ezumike nká `zcashd` ọnụ ụzọ
- [Zebra Full Node (Nọmba zuru ezu)](Zebra_Full_Node.md)  ọnụ Zallet's ndabara backend na-agụ
- [Zakura Node (Nọmba nke Zaku)](Zakura_Node.md)  ọzọ na-akwado ọnụ
- [Zaino](Zaino.md)  backend indexer na ihe nkesa-onye ahịa dị mfe.
- [ZECD (Zụlite ihe ọmụma)](ZECD.md)  ihe ọzọ wallet-server imewe na librustzcash
- [Nkwekọrịta obere akpa Zcash](Zcash_Wallet_Syncing.md)  otú wallets na-eche nche si enyocha agbụ ahụ.
- [Igodo Nlele](Viewing_Keys.md)

## Akụnụba

- [Akwụkwọ Zallet ahụ .](https://zcash.github.io/zallet/)
- [zcash/zallet na GitHub](https://github.com/zcash/zallet)
- [Mgbasa ozi](https://github.com/zcash/zallet/releases)
- [JSON-RPC gbanwere semantics](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Ntuziaka Mbugharị ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Ntuziaka ZecHub Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet mejupụtara stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
