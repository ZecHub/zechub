<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet yɛ Zcash sika nkotoku a wɔtwerɛ no Rust mu. Ɛsan si kaapɔn bi a na wɔde hyɛ banbɔ ho so ananmu, ɛne nea ɛwɔ hɔ ma wɔn nyinaa ne ɔfã biara a ɛboa sɛ wonya akatua pa. `zcashd`Ɛno akyi . `zcashd` reached its End-of-Support halt on 18 July 2026 at block height 3417100, consensus and wallet duties were split: **Zebra** or **Zakura** validate the chain, and **Zallet** holds keys, scans notes, and exposes the wallet JSON-RPC.

Zallet yɛ **beta**. W'antumi anhwɛ no mu yie koraa. Nsakrae a wobɛyɛ wɔ saa dwumadie yi ho betumi ama wo ayi ne sika krataa no bio. Ɛnsɛ sɛ woyɛ eyi te sɛ nnwumakuo bi de hwɛ ZEC bebree so bere a wonkenkan ahobammɔ kɔkɔbɔ ahorow a ɛwɔ "Zallet" hɔ no. [Zallet Nhoma no](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet yɛ **full-node RPC wallet**, ɛnyɛ mobile light wallet na ɛnnyɛ consensus node.
- Ɛsan si ɔfã a ɛka ho no ananmu. `zcashd`. Nodoɔ no fã yɛ [Zebra](Zebra_Full_Node.md) or [Zakura](Zakura_Node.md).
- Wɔakyerɛw no wɔ **Rust**, a w'atwe ne ho afa MIT / Apache 2.0 so, na wɔde hwɛ so wɔ mu. [zcash/zallet (Ɔmanfoɔ Asetenam Nsɛm)](https://github.com/zcash/zallet).
- Nkrataa a w'atintim no akyiri yi wɔ August 2026: **v0.1.0-beta.3**.
- Ɔkasa kyerɛ data a ɛgyina nkɔnsɔnkɔnsɔn so wɔ akwan mmienu mu: **zebra-state** (direct) `ReadStateService` wɔ baabi a wo ne obi resisi no ho. `zebrad`) anaa **Zaino**.
- Ɛma no hu sɛ **zcashd-compatible JSON-RPC** subset. Wɔasesa akwan bi; wɔayi ebinom afi mu atirimpɔ so.
- Nsaano nkyerɛwee, addresses ne key no wɔ hɔ ma obiara a ɔde di dwuma biara. `wallet.db`.
- Ɔde binaries mmiɛnsa kɔma wɔ ɔfese a wɔde nsahyɛ nsɛm ahyɛ mu baako: `zallet` (Ɔto ahyɛm), `zallet-zebra`, ne ho adi no ni. `zallet-zaino`.
- Nhoma a wɔato din: [Zallet Nhoma no](https://zcash.github.io/zallet/).

---

## Nea enti a Zallet wɔ hɔ

`zcashd` Ɔde Bitcoin Core no ne sika kotoku a wɔfa so yɛ adwuma bom. Saa adwinni yi ayera.

: Dwumadie. Kyɛm dedaw no. Ɛberɛ yi so kyɛɛm.
|------|-----------|---------------|
yɛ nhyehyeɛ/P2P. `zcashd` | Zebra (`zebrad`) anaa Zakura.
tese/nsafeԑ / akontabuo. `zcashd` `wallet.dat` Zallet yɛ ɔmansin a ɛwɔ France.`wallet.db`) |
Ԑhyԑn-abodin nkyerεkyerεfoɔ. `lightwalletd` Zaino anaa `lightwalletd` |

Sɛ wo bɛ twe sika no afi node mu a, ɛkyerɛ sɛ:

- Wobɛtumi asesa node software (Zebra vs Zakura) a wonnya nkyerɛɛ no.
- Kɔmfɔnt a wɔhwehwɛ mu ne sika ho tumi no te dwumadi bi a wobetumi de ato hɔ sɛ nea ɛmmom.
- RPC nkyerɛmu no betumi akɔ so de akontae ZIP 32, Unified Addresses, ne PCZTs asi anan mu na ɛntena hɔ bere a wɔayi wɔn adi wɔ kasa foforo bi mu. `zcashd` ne su ahorow.

Zallet yɛ sika krataa a wɔhwɛ so ma wɔn a na wɔyɛ adwuma kan no. `zcashd` Sɛ hot wallet, exchange backend, faucet anaa mining payout wallet.

---

## Ɔman no gyinabea

Zallet wɔ beta mu.

Nea ɛno kyerɛ wɔ ɔkwan a yɛfa so di dwuma no mu:

- Nsesae a emu yɛ den betumi aba beta biara mu. Ebia ɛsɛ sɛ wuyi adansedie nkrataa no na wofi ase foforo.
- Ɛnyɛ obiara na ɔfata sɛ odi dwuma. `zcashd` wɔama RPC nkotoku no so.
- Semantics of some ported methods differ from: "Ɛyɛ a, wɔfa no sɛ ɛyɛ nsonsonoe". `zcashd`. Integrations must read the "About" text. [nsɛm asekyerɛ a wɔasakra kratafa](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Wɔreyɛ nnaka no ho adwuma na wɔnsan nso anhwɛ mu nwie.
- Zallet nyɛ Rust nhomakorabea. Sɛ wode wo ho to so sɛ ɛno a, worennya awerɛhyem biara wɔ hɔ.

N'asɛm a ɔde ba no kɔ ma wɔn. [GitHub nsɛmmisa](https://github.com/zcash/zallet/issues/new) anaa wɔ `#wallet-dev` kwan a wɔfa so de kɔ no mu. [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Wɔahyehyɛ ɔfã a wɔbɛtena mu wɔ akyiri yi bere a RPC no ho abae. Ɛno akyi na wɔn a wɔbɔ fon no bɛtu akɔ Zallet akwan so, ɛne nkyerɛmu nsonsonoeɛ ahorow a wɔayɛ ho kyerɛwtohɔ no aka ho.

---

## Abɔdeyɛ mu adansiɛ

Zallet yɛ adwuma wɔ Cargo adwumayɛbea ahorow mmiɛnsa mu, enti chain backend mmienu no betumi adi nsonsonoe a ɛda wɔn ntam ho dwuma.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Nkyekyem abiɛsa no nyinaa bue kwan koro mu. `wallet.db`. Launcher no paw backend wɔ runtime mu; wonhyehyɛ bio mfa nsesa.

Ntotoe a wɔtaa de di dwuma:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet yɛ **full-node wallet**: ɛhwɛ kwan sɛ baabi a wɔdi nkonta no bɛsɔ. Ɛnyɛ light client. Ɛfa light wallets ne compact block servers ho, hwɛ [Zaino](Zaino.md) ne sɛ, [Lightwallet Nodes (Ɔkwan a wɔfa so de sika fa nneɛma mu)](Lightwallet_Nodes.md).

Zcash Foundation no wɔ hɔ. [Z3](https://github.com/ZcashFoundation/z3) Sε wכbͻ Zebra + Zallet ho adwuma bom a, wobɛtumi nso de Zaino ankasa adi dwuma ama abɛɛfo kanea so.

---

## Adekyerɛ, address ne nsaano ahyɛnsodeɛ

Zallet yɛ adwuma wɔ ZIP 32 ho, ɛnyɛ sɛ wobɛyɛ no bi a. `zcashd`de ne ho aka wɔ ɔkwan a enni mu so.

- Wobetumi de nnwomtwerɛbea ahorow a ɛwɔ BIP 39 mu no adi dwuma wɔ sika kotoku biara mu. Nnwomt kyerɛwbea biara yɛ ɔfã bi a wɔde di dwuma, na wɔde "nkwa ntini" (seed fingerprint) hu wɔn.`zip32seedfp1…`).
- **Accounts** fi aba bi a ɛwɔ ZIP 32 account index mu. Wɔ Zallet baako no, wɔwɔ baabi nso de wɔn ho to hɔ ma wɔn din (UUID). Account ahwehwɛde yɛ: `(seedfp, account index)`.
- Adwumayɛbea no ne "ZIP 316 Unified Addresses" a wɔde adi dwuma wɔ kasa ahodoɔ mu. `z_getaddressforaccount`Account baako betumi anya address bebree; receivers a wɔayi wɔn ho ano ntumi mfa nkɔ on-chain.
- Dwumadie a wɔde di dwuma (imported spending keys)`z_importkey`) ne address a w'atumi ahwɛ so nkutoo (`z_importaddress`) bɛyɛ UUID nkonta a enni mnemonic cover.
- Wobetumi de anibu apon a wobedi dwuma no adi gua na wɔde aba aman foforo so (`z_exportviewingkey`, `z_importviewingkey`), a unified full viewing keys ne incoming viewing key ka ho.

`getnewaddress` Wontumi mfa nni dwuma. Fa di dwuma `z_getnewaccount` ne sɛ, `z_getaddressforaccount`.

If `keystore.require_backup` no so (migraed form of) ne ho a, na w'atumi aka sɛ woahunu. `zcashd`’s `walletrequirebackup`), Zallet ampene so sɛ ɔbɛfa sika foforo afi obi a ɔhwɛ ne nkae mu na wɔn nsa aka no bi.

---

## Encryption ne backup ahorow no

Key material is **always** encrypted. no unencrypt mode and no *o* o'c* c#t+e, so we can use a new key to get the code of our home phone; na yԑn nso yetumi de ashensoɔ yi adi dwuma daa nyinaa! `encryptwallet` RPC  sɛ deɛ `zcashd` na wɔampene so koraa.

- Ntotoe ma obi yɛ ne ho sɛ, bere a w'adi kan adi dwuma no. `{datadir}/encryption-identity.txt`.
- Wɔkora nkae nkyerɛwee ne ɛka a wɔde ba no ho nsɛm te sɛ mfe pii mu ahyɛnsode wɔ "Mnemonic" so. `wallet.db`.
- Nea aka wɔ database no mu nyinaa yɛ nea wompɛ sɛ wode di dwuma. Abakɔsɛm, addresses ne viewing keys betumi akenkan bere a obi nya file no bi no.
- Wobetumi de ahyɛnsode afrafrae (passphrase) aka onipa no ho.`generate-encryption-identity -p`) Fa wo nsa no bue. `walletpassphrase` RPC; kyere no a, na w'atumi asi mu. `walletlock`.
- Sɛ wo ahwehwɛ akwankyerԑ anaa ne password no a, worentumi nhye sika biara. Fa ahobanbɔ krataa yi bi fa w'ahwehwεmu nyinaa so na (wɔde krataa foforo nso) de asie biribiara a wobɛtumi adi ho dwuma wɔ aberɛ aa wonnya nkrataa foforɔ biara bio. `wallet.db` Fa wo ho sie.

Atwerɛsɛm a wɔtwerɛɛ no mu `wallet.db` Saa Zallet yɛ adwuma a, ɛnyɛ backup. SQLite bɛtumi asesa. Ma no kwan ma ɔfeseɛ no nsi anaa twɛn kɔma online-backup akwankyerɛ bi.

---

## JSON-RPC (Ɛwɔ hɔ wɔ kasa ahodoɔ mu)

Zallet de ne ho hyɛ mu wɔ ɔkwan a ɔfa so yɛ adwuma no bi. `zcashd` wallet RPCs wɔ HTTP so a Basic auth. Bind to loopback. Remote use ɛsɛ sɛ ɛfa encrypted tunnel mu kɔ hɔ. `rpc.allow_insecure_remote_bind` na enni mu, nso wonni ho ban.

Nsonsonoe a ɛda adi firi deɛ ɛwɔ hɔ no mu. `zcashd`:

- Nkɔsoɔ nkekaho a ɛwɔ so `getwalletinfo` no ho nni mfaso. fa di dwuma `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Fee no di so **ZIP 317**. Nnye sika biara a wobegye wɔ saa afa yi mu, na w'atumi de ato hɔ bere nyinaa. `settxfee`.
- Ɔsɛe a wɔretoto no rekɔ so wͻ PCZT (Partially Created Zcash Transactions, ZIP 374).PCZT RPCs baa beta mu.
- Global **sync lock** no kora RPCs a wɔtɔ ne nea wɔde tɔ so bere a wallet no refa anaa ɛsan fi reset (reorganization) mu.`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Akwan a wɔayi no adi nkontan bi ne: `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, ne ho adi no ni. `encryptwallet`Wɔahyehyɛ wɔn a wɔbɛsesa no wɔ ɔfã yi mu. [Zallet Nhoma no](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Mfitiaseɛ a yɛreyɛ no.

Wͻde akwan a w'atwe so no (Debian afidie, Docker, binaries) adi dwuma wɔ kasahodoɔ mu. [siesie akwankyerεmu](https://zcash.github.io/zallet/guide/installation/index.html)Wɔfrɛ nneɛma a wɔde asie no din sɛ: `zallet-<version>-<arch>.tar.gz` na emu biara wɔ ne mpeneso mmiɛnsa.

Flow no a' yԑde bεto dwa:

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

Beaɛ a ɛwɔ hɔ `[indexer]` wɔ beaeɛ bi a ɛwɔ hɔ. `zebrad` JSON-RPC endpoint. The zebra backend also wants `[indexer.read_state_service]` ne a ɔ-ɔ `zebrad` a wɔde indexer dwumadie no asi hɔ ama Zallet atumi akenkan chain state tẽẽ.

Wobetumi de mfonini a wotumi yi no adi asi hɔ. [Adesuadeɛ a ɛtɔ so du:](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd mfoni korabea, GNU Make).

---

## Sesa firi zcashd so

Fa nea ɛwɔ hɔ dedaw no sie. `zcashd` datadir kosi sɛ wubenya nkaeemu a w'ahyɛ no den na woasɔ ahwɛ.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` na ɛwɔ nea wɔhyehyɛ no mu nkutoo. `zcashd-import` akenkan. `wallet.dat` ahiade ahorow `db_dump` From **Berkeley DB 6.2**, the version `zcashd` a wɔde di dwuma.

Ɔhwɛfoɔ no nkaeɛ a ɔde kɔdi dwuma: [Migration Guide: zcashd to Zebrad/Zallet (Ɔkwankyerɛ a ɛfa akwantu ho)](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Sɛnea Zallet fa dwumadie afoforo ho no

Zallet. zecd Zashi / ZODL / YWallet Zebra / Zakura Zaino
|--|--------|------|------------------------|----------------|-------|
什么是全节点RPC钱包? shielded-first wallet服务器.终端用户的钱包 Consensus node Indexer/lightwalletd替换
Ɔyɛ ɔfoforo. `zcashd` ne sika nkontaabu. Ɛnyɛ ɔfã a wɔde ba no mu na wɔsan kɔfa `zcashd` clone Ԑmfasoɔ a ɛwɔ fon so/desktop so. `zcashd` nkɔnsɔnkɔnsɔn. `lightwalletd` |
| Needs a local node | Yes | Yes (Zebra by default) | No (light client) | It *is* the node | Yes |
zcashd RPC compat. Designed as the compat path. Small selected subset only. N/A. Partial / Zakura compat mode. Different API. Zcashd: Compact, not yet available.
 custody model. Operator holds keys in (Ɔhwɛfoɔ no kura nsaano) `wallet.db` -recoverable server. User device keys. no wallet, no keys:

Zallet and **zecd** can both sit in front of Zebra. Pick Zallet when you need the `z_*` na akwantuo kwan firi wallet no so ne baabi a wɔfiri kɔ. `wallet.dat`. Yi zecd bere a wopɛ sɛ w'ɔde server a wɔabɔ ho ban na ɛnnyɛ *a* no di dwuma pefee. `zcashd` sɛso.

Ade a edi kan wɔ hɔ ma ɔmanfo no ankasa. [zallet.io](https://www.zallet.io/) Saa app no nyɛ adwuma yi.

---

## Nkrataafa a ɛfa ho

- [Nkɔmmɔ a ɛkorɔn no nyinaa](Full_Nodes.md)  Zebra, Zakura ne wɔn a wɔagyae adwuma no `zcashd` nkɔnsɔnkɔnsɔn
- [Zebra Nodoɔ a Ɛwɔ Mu Nyinaa](Zebra_Full_Node.md)  node Zallet's default backend reads: "Ɛyɛ sɛ wo bɛ twe no a, na w'atwe no".
- [Zakura Ntam no](Zakura_Node.md)  alternative validating node (Ɔkwan foforɔ a wɔfa so sɔ no hwɛ)
- [Zaino](Zaino.md)  indexers backend ne light-client server no ho nsɛm pii wɔ hɔ a, wobɛtumi de adi dwuma.
- [ZECD (Ɔman a wɔtɔ so mmienu)](ZECD.md)  ɔfã fofor bi a wɔdze yɛ edwumayɛbea nkorbata-server no do wɔ librustzcash so.
- [Zcash Kɔntaktɔ Nkrataafa a Ɛwɔhɔ no Ntotoho](Zcash_Wallet_Syncing.md)  kwan a wallets a wɔabɔ ho ban no fa so hwehwɛ chain mu
- [Ɔhwɛfoɔ Nsaano Hwehwɛbea](Viewing_Keys.md)

## Nneɛma a wɔde bɔ afɔre

- [Zallet Nhoma no](https://zcash.github.io/zallet/)
- [zcash/zallet wɔ GitHub so](https://github.com/zcash/zallet)
- [Nsɛm a wɔayi no adi](https://github.com/zcash/zallet/releases)
- [JSON-RPC nsɛm asekyerɛ a wɔasakra no](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub akwantu akwankyerɛfoɔ](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi akwankyerԑ (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
