<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axɔta"/>
</a>

# zecd — Ɣaɣla-Dzidzime Gakotoku Server

zecd nye ɣaɣla-dzidzime gakotoku server na Zcash, wo tu ɖe [librustzcash](https://github.com/zcash/librustzcash) dzi eye wo ɖe fia to Bitcoin Core ƒe JSON-RPC ƒe mɔnu me. Enaa mɔ̃ ƒe ɖoɖoŋlɔlawo kple fexexe ƒe ɖeɖeamewɔlawo API si woma nyuie eye si sɔ kple Bitcoin na woatsɔ ado go kple Zcash — eye wòwɔe be Orchard (gaƒuƒoƒo ɣaɣla kekeake) nanɔ anyigba la dzi. [zec.rocks](https://zec.rocks)e wɔe, eye wo ɖo zecd be wòaxe teƒe na `zcashd` ƒe gakotoku ƒe dɔwɔwɔ le cloud-native ƒe ɖoɖowɔwɔ yeye me.

**Version si le fifia:** 0.5.0-rc3 (July 13, 2026) — kple Ironwood (NU6.3) ƒe kpekpeɖeŋu. Ɖo eƒe mɔnu to `cargo install zecd` dzi alo zã Docker ƒe image si wòɖo.

---

## Nyawo ƒe ƒometɔ

- zecd nye **gakotoku daemon (server)** — menye ɣaɣla dzesi ŋɔŋlɔ blibo o. Ewɔ dɔ kple key, scan, proof, kple RPC eye wòmegblɔ Zcash P2P protocol o.
- Egblɔ **Bitcoin Core ƒe JSON-RPC ƒe mɔnu**: method ƒe ŋkɔ ma ke, field ƒe nɔnɔme, auth, kple error code — Bitcoin RPC ƒe client geɖewo ate ŋu awɔ dɔ kple Zcash enumake.
- **Orchard (ɣaɣla) gaɖoƒe ƒe dzesiwo nye dzidzime**; nuwo ƒe ʋuʋuɖi (t-address) kple Sapling ƒe kpekpeɖeŋu hia be woaɖo e ɖe gakotoku sia gakotoku dzi.
- Eɖo eɖokui kple **wò ŋutɔ ƒe [Zebra](Zebra_Full_Node.md) ɣaɣla dzesi ŋɔŋlɔ blibo** to local JSON-RPC dzi — lightwalletd mele be wòahiã o.
- **State mele o le eƒe nɔnɔme nu**: woate ŋu agbugbɔ gakotoku blibo tso gadzraɖoɖi nya ko me, eya ta data ƒe directory ate ŋu anye nu si woate ŋu atsɔ aɖe gbe.
- **Menye zcashd ƒe teƒe-ɖeɖe tɔxɛ o**: ewɔ Zcash RPC ƒe method ƒe akpa aɖe ko, kple tɔxɛ si woɖo kple ta na ɣaɣla kple dedie.
- Adzɔwo ɖo ɖe **ZIP-317** dzi (adzɔ ƒe akɔntaɖoɖo si me tɔtrɔ mele o); wogbe adzɔ si zãla ɖo la gbɔ.
- Ekpe ɖe **ɣaɣla nya kpuiwo (ZIP-302)** ŋu to Bitcoin RPC ƒe nɔnɔme si woma nyuie dzi.

---

## Ka Nyae zecd Gbɔna?

`zcashd` nye Zcash ƒe dzesi ŋɔŋlɔ kple gakotoku si woƒo ƒu le gɔmedzedze me — woɖe eƒe mɔnu tso Bitcoin ƒe C++ codebase me le 2016. Ɣeyiɣi me la, esia he fũfũ vɛ: code la sesẽ be woanɔa eŋu, gakotoku la ɖo kple dzesi ŋɔŋlɔ la ɖe asi, eye woɖe nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo fia abe ti siwo le xɔseme ɖeka me kple ɣaɣla tɔwo ene.

zecd ma wɔ gakotoku ƒe dɔ kple gbegbɔgblɔ ɖi ƒe dɔ ɖeka o. Enye **gakotoku ƒe ɖoɖo si woɖe ɖe eɖokui** si nɔ applicationwo kple Zebra ɣaɣla dzesi ŋɔŋlɔ blibo dome, eye wòtsɔ esiawo vɛ:

- Rust ƒe dɔwɔwɔ yeye, dzadzɛ si woɖo ɖe librustzcash dzi (library ma ke nye si ɖena ŋusẽ na Zodl kple Zingo)
- Ɣaɣla-le-anyigba-dzidzime ƒe ɖoɖo (Orchard gaɖoƒe ƒe dzesiwo ne woɖo e bubu o)
- Bitcoin-sɔkpe RPC ƒe interface si ɖe Zcash-tɔxɛ dɔwɔnu srɔ̃srɔ̃ ƒe hiaɖeɖe ɖa
- State mele o, eye woate ŋu agbugbɔe tso gadzraɖoɖi nya me, si sɔ na container kple cloud ƒe ɖoɖowɔwɔwo

---

## Ɖoɖowɔwɔ

zecd wɔa dɔ le ɖoɖo ƒe akpa etɔ me:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd doa go kple Zebra **to local JSON-RPC ko dzi** — peer-to-peer network mele o, third-party indexerwo mele o, lightwalletd mele o. Woɖo Zebra ƒe kadodo la be wòawɔ dɔ le afi-a ko: zecd agbe be yeado credential ɖe host si woate ŋu akpɔ le xexeame blibo me o, negbe woɖoe ɖe tunnel si woɣla le mɔ bubu nu (abe WireGuard alo SSH ene) ta.

---

## Nɔnɔme Veviwo

### Ɣaɣla-Dzidzime, Orchard Le Dzidzime

zecd zãa Orchard Unified Addresswo abe gaɖoƒe ƒe dzesi ƒe leƒoƒo dzidzime ene. Sapling kple nuwo ƒe ʋuʋuɖi (t-address) gaƒuƒoƒowo hia be woaɖo wo ɖe gakotoku sia gakotoku dzi. Ɖoɖo sia ɖea afɔ ku ɖe nuwo ƒe ʋuʋuɖi ƒe dɔdɔ ɖe vodada me ƒe agbale ŋu — ɣaɣla ƒe afɔku si dzɔna zi geɖe le Zcash ƒe dɔwɔnu xoxoawo me.

Woate ŋu aɖo ɣaɣla ƒe se ɖe call sia call dzi alo le `[spend] privacy_policy` me le xexeame blibo:

| Se | Nɔnɔme |
|--------|----------|
| `AllowRevealedRecipients` (dzidzime) | Eɖea mɔ na dɔdɔ ɖe nuwo ƒe ʋuʋuɖi ƒe ame xɔlawo gbɔ; eɖea asɔme kple ame xɔla fia ɖoɖonu dzi |
| `AllowRevealedAmounts` | Eɖea mɔ na dɔdɔ si dzea gaƒuƒoƒo dome (Sapling↔Orchard), gake egbea nuwo ƒe ʋuʋuɖi ƒe ame xɔlawo gbɔ |
| `FullPrivacy` | Ɣaɣla blibotɔ ƒe dɔdɔ ko le gaƒuƒoƒo ɖeka me; egbea nuwo ƒe ʋuʋuɖi ƒe ame xɔlawo kple dɔdɔ si dzea gaƒuƒoƒo dome gbɔ |
| `AllowFullyTransparent` | Eɖea mɔ na t→t ƒe dɔdɔ si woƒe nu tso nuwo ƒe ʋuʋuɖi UTXOwo me hã |

### Bitcoin Core RPC Ƒe Sɔkpe

zecd wɔa Bitcoin Core ƒe JSON-RPC ƒe mɔnu, eye wòsɔ kple e le esiawo me:

- Method ƒe ŋkɔwo (abe `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany` ene)
- Field ƒe ŋkɔwo kple ƒomeviwo le ŋuɖoɖowo me
- JSON-RPC 1.0 ƒe envelope ƒe ɖoɖo
- Basic auth, `rpcauth` ƒe entrywo, kple cookie file ƒe authentication
- Error codewo kple HTTP status ƒe map (HTTP 500 kple error ƒe body, 401 ƒe nɔnɔme)

Esia fia be Bitcoin fexexe ƒe library siwo li xoxo, gatrɔƒe ƒe ɖeɖeamewɔwɔwo, kple ŋkuléle ƒe dɔwɔnuwo ate ŋu awɔ dɔ kple Zcash to zecd dzi kple code ƒe tɔtrɔ sue aɖe alo tɔtrɔ aɖeke o.

Conformance suite la (check 140+ ) wɔa dɔ le PR sia PR dzi kple regtest daemon si le agbe, eye woɖe eƒe nyateƒe kpɔ le public testnet dzi hã.

### Ɣaɣla Nya Kpuiwo (ZIP-302)

zecd ɖea Zcash ƒe ɣaɣla nya kpui ƒe nɔnɔme fia to Bitcoin RPC ƒe nɔnɔme si woma nyuie dzi — nu si mele Bitcoin ƒe dɔwɔnu dzidzimewo me o:

- `sendtoaddress` xɔa hex memo si wotia be wòanye parameter mamlɛtɔ bubu (va se ɖe byte 512; wogbee na nuwo ƒe ʋuʋuɖi ƒe ame xɔlawo)
- Gaɖoɖo ƒe ŋutinya ƒe entrywo tso `listtransactions` kple `gettransaction` me mekplɔa `memo` (hex) kple `memoStr` (nya si woɖe gɔme) ƒe fieldwo ne output aɖe tsɔ nya kpui
- Dɔdɔ si me ga mele o ɖe ɣaɣla ƒe ame xɔla gbɔ ate ŋu adzɔ na memo-ko zã nyawo ta (`z_sendmany` ƒe "memo-only-send" ƒe nɔnɔme)

Esia wɔa be zecd sɔ na application siwo hia nyaɖoɖo ɣaɣla le ɖoɖonu dzi kple fexexewo.

### State Mele O Le Eƒe Nɔnɔme Nu

zecd dzraa **state aɖeke si menye le ɖoɖonu dzi si gbugbɔ tso gadzraɖoɖi nya ko me mate ŋu atu o**. Gakotoku ƒe database (`data.sqlite`) katã dzea tso gadzraɖoɖi nya me — woagbugbɔ ɣaɣla fundwo gbɔ ɖe agbale me; woagbugbɔ nuwo ƒe ʋuʋuɖi fundwo gbɔ va se ɖe gap limit si woɖo la dzi.

Be nàgbugbɔ gakotoku tso gadzraɖoɖi nya me:

```sh
zecd init --restore --birthday <block-height>
```

Esia wɔa be data ƒe directory la **nye nu si woate ŋu aɖe gbe**: container si me persistent volume mele o, si woatu tso gadzraɖoɖi nya me le gɔmedzedze sia gɔmedzedze, magblẽ nu vevi aɖeke o. Wòwɔlawo nye ame siwo ana woanya gaɖoƒe ƒe dzesiwo wo tsɔ na amewo — zecd ɖoa ŋku gaɖoƒe ƒe dzesiwo ŋu enumake ne wo xɔ fundwo le ɖoɖonu dzi.

Labelwo mele o le ta me. Elabena labelwo mekpɔ tso le ɖoɖonu dzi o, eye womaate ŋu atu wo tso gadzraɖoɖi nya me o, zecd mekpe ɖe wo ŋu kura o. Ne woyɔ label ƒe methodwo la, woatrɔ error `method-not-found` (`-32601`).

### lightwalletd Ƒe Hiahia Mele O

zecd dzea compact blockwo, ati ƒe state, kple mempool ƒe nukpɔkpɔ tso Zebra ƒe JSON-RPC me tẽ. lightwalletd aɖeke mele be wòawɔ dɔe alo anɔ eŋu o — esia ɖea operation ƒe fũfũ ɖa na ɖoɖowɔwɔ siwo wò ŋutɔ nɔa eŋu.

### Cloud-Native Kple Container Ƒe Ɖoɖowɔwɔwo

zecd ƒe state-meli-o ƒe ɖoɖowɔwɔ woɖoe na Docker kple Kubernetes ƒe nɔnɔmewo:

- Docker Compose stack blibo (`zebra → zecd`) le repository la me
- Health endpoint le port `9233` kple readiness probe si woate ŋu aɖo (`synced` alo `connected`)
- JSON logging si woɖo ɖe ɖoɖo me na log ƒe ƒuƒoƒo ƒe pipelinewo
- ZIP-317 ƒe adzɔ si me tɔtrɔ mele o — fee oracle alo adzɔ ƒe ɖoɖo le asi me mele o
- `bootstrap_from_keys` (le dzi le dzidzime): data ƒe directory si me nusi mele o le `keys.toml` ƒe gbɔ la tua gakotoku la gbɔ le gɔmedzedze me — ɖo e ɖe dɔ me to Secret ɖeka ƒe mount kple PVC si me nusi mele o ƒe gɔmedzedze dzi

---

## Key Ƒe Dzidzedze Ƒe Mɔnuwo

zecd kpe ɖe key ƒe dzidzedze ƒe mɔnu etɔ ŋu, siwo sɔ na ɖoɖowɔwɔ kple dedie ƒe hiahiã vovovowo:

### 1. Encryption Mele O (Dzidzime — Auto-Unlock)

Woɖoa seed mnemonic si le `keys.toml` me ɖe **age identity file** (`identity.txt`) nu. Kple `auto_unlock = true` si nye dzidzime, woɖea seed la ɖe memory me le gɔmedzedze me ale be dɔdɔwo nanɔ anyi le ame ƒe kpɔɖeŋu manɔmee o, eye `walletpassphrase` ƒe call mehiã o.

Ehiã na: fexexe ƒe dɔwɔlawo siwo wɔa dɔ le eɖokuiwo ŋutɔ, gatrɔƒe ƒe hot walletwo, mɔ̃ ƒe ɖoɖoŋlɔla ƒe nɔnɔmewo.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Dzra `identity.txt` **le afi bubu tso data ƒe directory la ŋu** le mainnet dzi — ame si xlẽ file evea sia la ate ŋu atsɔ ga.

### 2. Woŋlɔ E Ɣaɣla (Passphrase-Meŋu-Kplɔ)

Woɖoa mnemonic la ɖe passphrase (age scrypt) nu ɖe identity file ŋu teƒe. Gakotoku la dzea egɔme kple lock; `walletpassphrase "<pass>" <timeout>` ɖea eƒe lock ɖa na ɣeyiɣi si woɖo, eye wòɖoa lock la gbɔ le ɣeyiɣi la ƒe nuwuwu me — abe Bitcoin Core ƒe gakotoku si woŋlɔ ɣaɣla ƒe nɔnɔme ene.

Ehiã na: hot walletwo afi si dɔdɔ ƒe ŋusẽ si me ame ƒe kpɔɖeŋu mele o mehiã o; operator ƒe dɔwɔwɔ si me wòawɔ nu kple asi.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Kpɔ-Ko (UFVK — Spend Key Mele O)

Wogɔme dzrae kple Unified Full Viewing Key (UFVK) si woɖe tso gakotoku bubu me. Ete ŋu axɔ nu, awɔ scan, eye wòagblɔ balance — gake mate ŋu asɔ asi ɖe gaɖoɖowo ŋu o. Esɔ nyuie na ŋkuléle, invoice wɔwɔ, alo audit ƒe dzesi ŋɔŋlɔwo siwo le signing gakotoku la gbɔ te.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Back Up Kple Gbugbɔxɔxɔ

Woate ŋu agbugbɔ fundwo tso **mnemonic ko** me. Nu bubuwo katã nye cache.

| Nu | Teƒe | Nu si wòle dɔm kpɔm | Nàwɔ backup? |
|----------|----------|-----------------|----------|
| **Mnemonic ƒe nya 24** | Woɖe fia zi ɖeka le `zecd init` | Fundwo — vɔvɔe nye vɔvɔ mavɔ | **Ɛ̃ — le offline (agbalẽ/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Seed si woŋlɔ ɣaɣla + birthday + network | **Ɛ̃ — abe Secret ene** |
| `identity.txt` | `[keys] age_identity` | Eɖea `keys.toml` ɣaɣla (dɔdɔ ƒe ŋusẽ) | **Ɛ̃ — ɖe eɖokui ŋu tso `keys.toml` ŋu** |
| Birthday ƒe height | Le `keys.toml` me | Ewɔa be gbugbɔxɔxɔ awɔ enumake (height ɖe sia ɖe si nɔ gaɖoɖo gbãtɔ la ŋgɔ) | Ŋlɔe ɖe mnemonic la kplii |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Gakotoku ƒe cache — woatu gbɔ tso seed me le gbugbɔxɔxɔ me | Ao — woate ŋu aɖe gbe |
| `blocks/` | `<wallet dir>/blocks/` | Compact block ƒe cache | Ao — megbe ɖo o; ate ŋu atsɔ gbɔ |
| `.cookie` | `<datadir>/.cookie` | RPC cookie ƒe nu si nɔ anyi ɣeyiɣi kpui | Ao — woagbugbɔ atu le gɔmedzedze me |

> **Data ƒe directory la ele be wòanɔ host la gbɔ ko.** zecd ƒe instance ɖeka ƒe lock (`<datadir>/.lock`) nye OS advisory lock — metsɔa hostwo katã ɖo ɖeka o. Mèma data ƒe directory ɖeka be machine geɖe nanɔa eŋu le read-write me o (NFS, Kubernetes `ReadWriteMany`) — zecd ƒe instance eve agblẽ gakotoku ƒe DB. Zã `ReadWriteOnce` ƒe volumewo le Kubernetes me.

---

## RPC Method Ƒe Safelist

Na ɖoɖowɔwɔwo afi si credential ƒe fliɖeɖe ate ŋu awɔ nu si kpɔtɔ katã, zecd kpe ɖe RPC ƒe nɔnɔme ƒe ɖeɖe ɖe method ƒe ƒuƒo si woatia ŋu:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Method aɖeke si mele list la dzi o atrɔ `-32601` (HTTP 404) — esi womaate ŋu awɔ vovototo le e kple method si mele o dome, server si woŋlɔ ɖo nyuie la magblɔ nu aɖeke tso nu si wòtsia ƒe dɔ ŋu o. Invoice wɔla si xɔa nu ko ate ŋu aɖe `sendtoaddress`, `sendmany`, kple `stop` ɖa be wòatsɔ afɔku ƒe teƒe anɔ anyi ne client si woɖe ŋu la gbã.

---

## Vovototowo Kple Bitcoin Core RPC

Mɔ̃ ƒe ɖoɖoŋlɔlawo siwo le afɔku kple Bitcoin alo zcashd ƒe dɔwɔnuwo me ele be woanya tɔtrɔ siawo si woɖo kple ta:

| Nɔnɔme | Bitcoin Core | zecd |
|----------|-------------|------|
| Gaɖoƒe ƒe dzesi ƒe nɔnɔme | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — client siwo lea string me madoe abe Bitcoin gaɖoƒe ƒe dzesi ene o |
| Labelwo | Label ƒe nudzraƒe blibo | Wometsɔ ɖe eme o — `setlabel`, `listlabels`, kple bubuwo atrɔ `-32601` |
| Adzɔwo | Zãla ɖoa; adzɔ ƒe market | ZIP-317 ko si me tɔtrɔ mele o; wogbe `settxfee`, `fee_rate`, `subtractfeefromamount` kple `-8` |
| Nya kpuiwo | Mekpe ɖe eme o | `sendtoaddress` xɔa hex memo; ŋutinya me `memo` + `memoStr` ƒe fieldwo le |
| Confirmationwo be woatsɔ | 1 | 3 (wò ŋutɔ ƒe change) / 10 (ame etɔ ƒe) — woate ŋu aɖo to `trusted_confirmations` / `untrusted_confirmations` dzi |
| `listsinceblock` le reorg dzi | Edzo yi megbe ɖe fork la gbɔ | Etrɔ `-5` (Block mele o) ne woɖe cursor la ɖa le reorg me — wɔ baseline yeyee kple call si me parameter mele o |
| Ame xɔla siwo zɔ ɖeka le `sendmany` me | Error | JSON parser la ƒua nu siwo zɔ ɖeka (mamlɛtɔ la koe xu) hafi zecd akpɔ wo — mèŋlɔ gaɖoƒe ƒe dzesi ma ke zi eve o |
| Balance le sync ƒe gɔmedzedze me | Etsi alo warm-up | Eɖea partial balance fia — ɖo automation ɖe `GET /readyz` dzi (etrɔ 503 va se ɖe esi sync blibo wu eye enhancement ƒe backlog ɖe asi) |
| `minconf 0` le `getbalance` me | 0-conf balance | Woɖea e fia abe 1 ene — ɣaɣla didienu menye nu si woate ŋu atsɔ le unmined o |

---

## Gɔmedzedze Kabakaba

**Nu siwo hia:** Zebra si wɔa dɔ le afi-a kple `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Ɖo eƒe mɔnu tso crates.io (0.4.3+) me:

```sh
cargo install zecd
```

Alo tu e tso source me:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Wɔ dɔ kplii to curl dzi:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Wɔ dɔ kplii to Python dzi (kple Bitcoin RPC library):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Gbugbɔ xɔ tso seed me:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Port Ƒe Dzidzimewo

| Network | zecd RPC | Zebra RPC (backend) | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd kple zcashd kple Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Dɔ | Ɣaɣla dzesi ŋɔŋlɔ blibo + gakotoku | Indexer (exɔ lightwalletd ƒe teƒe) | Gakotoku server ko |
| Gbegbe | C++ | Rust | Rust |
| Nɔnɔme | Woɖe e ɖi | Le dɔ wɔm | Le dɔ wɔm (v0.5.0-rc3, Jul 2026) |
| Gaƒuƒoƒo dzidzime | Nuwo ƒe ʋuʋuɖi | N/A | Orchard (ɣaɣla) |
| RPC ƒe mɔnu | zcashd-tɔxɛ | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Ɣaɣla dzesi ŋɔŋlɔ blibo ƒe hiahiã | Ɛ̃ (eɖokui) | Zebra alo zcashd | Zebra |
| State-meli-o gbugbɔxɔxɔ | Ao | N/A | Ɛ̃ (seed-ko) |
| Ɣaɣla nya kpuiwo | Ɛ̃ (`z_sendmany`) | N/A | Ɛ̃ (Bitcoin RPC ƒe nɔnɔme) |
| Kpɔ-ko (UFVK) | Ɛ̃ | Ɛ̃ | Ɛ̃ |
| Cloud-native | Ao | Akpa aɖe | Ɛ̃ |
| Ɖoɖo | Tu/binary | Tu | `cargo install zecd` |

---

## Axɔta Siwo Kplɔe Ɖo

- [Zebra Ɣaɣla Dzesi Ŋɔŋlɔ Blibo](Zebra_Full_Node.md) — ɣaɣla dzesi ŋɔŋlɔ blibo si zecd ɖoa eɖokui kplii
- [Zaino Indexer](Zaino.md) — indexer ƒe mɔnu bubu (exɔ lightwalletd ƒe teƒe)
- [Zakura Ɣaɣla Dzesi Ŋɔŋlɔ](Zakura_Node.md) — ɣaɣla dzesi ŋɔŋlɔ blibo ƒe dɔwɔwɔ bubu (fork tso Zebra me)
- [Nukpɔsafuiwo](Viewing_Keys.md) — ale si zecd wɔa scan le ɖoɖonu la dzi kple account ƒe nukpɔsafuiwo
- [Gakotokuwo](/using-zcash/wallets) — gakotoku ƒe ecosystem ƒe nukpɔkpɔ

## Nuƒoƒowo

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [zecd Operation ƒe Runbook](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — Zcash ƒe cryptography library vevitɔ](https://github.com/zcash/librustzcash)
- [ZIP-317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [ZIP-302: Ɣaɣla Nya Kpuiwo](https://zips.z.cash/zip-0302)
- [Zodl gakotoku (si sɔ kple librustzcash)](https://github.com/zodl-inc/zodl-ios)
