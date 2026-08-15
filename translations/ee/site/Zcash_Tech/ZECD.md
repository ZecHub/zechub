<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Gakotoku ƒe Dɔwɔla si Wokpɔ Akpoxɔnu Gbãtɔ

> 🇧🇷 [Versão em Portugaltɔwo ƒe agbalẽwo](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD nye shielded-first wallet server na Zcash, si wotu ɖe edzi [librustzcash ƒe ŋkɔ](https://github.com/zcash/librustzcash) eye woɖee ɖe go to Bitcoin Core ƒe JSON-RPC gbetagbe dzi. Enaa dɔwɔlawo kple fexexe ƒe ƒuƒoƒowɔlawo API nyanyɛ, si sɔ kple Bitcoin hena nuwɔwɔ kple Zcash — esime wòle Orchard (si nye ame ŋutɔ tɔ wu) wɔm wònye nusi woɖo ɖi. Woto esia vɛ to [zec.rocks](https://zec.rocks), wowɔ ZECD be wòaxɔ ɖe eteƒe `zcashd`’s gakotoku ƒe dɔwɔwɔ le egbegbe, alilikpo me tɔwo ƒe dɔwɔwɔwo me.

**Fifia ƒe tɔtrɔ:** 0.5.0-rc3 (July 13, 2026) — kple Ironwood (NU6.3) ƒe kpekpeɖeŋu. Install via `cargo install zecd` alo nàzã Docker ƒe nɔnɔmetata si dziɖuɖua da asi ɖo.

---

## TL;DR

- ZECD nye **wallet daemon (server)** — menye node blibo o. Ekpɔa safuiwo, scanning, proving, kple RPC gbɔ evɔ meƒoa nu tso Zcash P2P protocol ŋu o.
- Eƒoa nu **Bitcoin Core ƒe JSON-RPC gbetagbe**: mɔnu ƒe ŋkɔwo, agble ƒe nɔnɔmewo, auth, kple vodada ƒe dzesiwo — Bitcoin RPC asisi geɖewo wɔa dɔ kple Zcash tso aɖaka me.
- **Orchard (shielded) adrɛswo nye esiwo woɖo ɖi**; transparent (t-address) kple Sapling ƒe kpekpeɖeŋu bia be woatiae tẽ le gakotoku ɖesiaɖe me.
- Edoa ka kple **self-hosted [Zebra](Zebra_Full_Node.md) node blibo** to teƒea ƒe JSON-RPC dzi — lightwalletd aɖeke mehiã o.
- **Stateless by design**: woate ŋu agbugbɔ gakotoku bliboa axɔ tso nuku ƒe nyagbe ɖeɖeko me, si wɔe be woate ŋu atsɔ nyatakakawo ƒe agbalẽdzraɖoƒea aƒu gbe.
- **Menye drop-in na zcashd o**: Zcash RPC mɔnuwo ƒe hatsotso sue aɖe koe wòwɔa dɔ, kple ɖoɖowɔwɔ ƒe vovototo siwo woɖo koŋ hena adzamenyawo kple dedienɔnɔ.
- Fewo kplɔa **ZIP-317** (fexexe ƒe akɔntabubu si woɖo ɖi); wogbea fe siwo zãla gblɔ.
- Doa alɔ **xelded memos (ZIP-302)** to Bitcoin RPC ƒe anyigba si wonya nyuie la dzi.

---

## Kuxi Kae ZECD Kpɔa Gbɔ?

`zcashd` nye Zcash ƒe node gbãtɔ kple gakotoku ƒo ƒu — forked tso Bitcoin ƒe C ++ codebase le ƒe 2016. Le ɣeyiɣi aɖe megbe la, esia he masɔmasɔ vɛ: code la dzi kpɔkpɔ sesẽ, gakotokua do ƒome kplikplikpli kple node la, eye wotsɔ adrɛs siwo me kɔ la ɖo ŋkume abe tiatia gbãtɔwo ene kpe ɖe esiwo wotsɔ akpoxɔnu wɔe ŋu.

ZECD ɖea gakotoku ƒe agbanɔamedzi ɖa tso nusiwo dzi woda asi ɖo gbɔ. Enye **gakotoku ƒe ƒuƒoƒo si woɖo ɖi** si nɔa dɔwɔwɔwo kple Zebra full node dome, si naa:

- Rust ƒe dɔwɔwɔ dzadzɛ, si sɔ ɖe egbegbe nu si wotu ɖe librustzcash (agbalẽdzraɖoƒe ma ke si naa ŋusẽ Zodl kple Zingo) dzi
- Ameŋunyatakakawo ƒe ɖoɖowɔwɔ le ɖoɖo nu (Orchard adrɛswo negbe ɖe woɖoe bubui hafi)
- RPC ƒe ŋgɔdonya si sɔ kple Bitcoin si ɖea alesi wòhiã be woasrɔ̃ Zcash-koŋ ƒe dɔwɔnuwo ɖa
- Dukɔmevinyenye, nuku-gbugbɔgaxɔ xɔtuɖaŋu si sɔ na nugoewo me kple alilikpo me dɔwɔwɔ

---

## Xɔtata

ZECD wɔa dɔ le ɖoɖo etɔ̃ me:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD ɖoa dze kple Zebra **to nutoa me JSON-RPC** dzi ɖeɖeko — hatiwo ƒe kadodo aɖeke meli o, ame etɔ̃lia ƒe indexer aɖeke meli o, lightwalletd aɖeke meli o. Zebra ƒe kadodoa ɖoe koŋ nye nutoa me tɔ ɖeɖeko: ZECD agbe be yemaɖo ɖaseɖigbalẽwo ɖe amedzroxɔƒe si woate ŋu aɖo le xexeame katã o negbe ɖe woɖoe tẽ na mɔ̃ si le dedie si mele haƒoha godo o (e.g. WireGuard alo SSH).

---

## Nu Vevi Siwo Le Eme

### Shielded-First, Orchard by Default

ZECD zãa Orchard Unified Addresses abe adrɛs ƒomevi si woɖo ɖi ene. Sapling kple transparent (t-address) pools hiã ɖoɖowɔwɔ tẽ le gakotoku ɖesiaɖe me. Aɖaŋu sia ɖea afɔku si le dɔdɔ siwo me kɔ le vo me dzi kpɔtɔna — si nye adzamenyawo ƒe mɔ̃ si bɔ le Zcash dɔwɔnu xoxowo me.

Woate ŋu atrɔ asi le ameŋunyatakakawo ŋu le kaƒoƒo ɖesiaɖe me alo le xexeame katã le `[spend] privacy_policy`:

| Ðoɖo | Nuwɔna |
|--------|----------|
| `AllowRevealedRecipients` (si woɖo ɖi) | Mɔɖegbalẽwo ɖona ɖe amesiwo xɔe le gaglãgbe; ɖea ga home kple amesi xɔe le kɔsɔkɔsɔ dzi |
| `AllowRevealedAmounts` | Eɖe mɔ ɖe cross-pool dɔdɔwo ŋu (Sapling↔Orchard) gake gbea nuxɔla siwo me kɔ |
| `FullPrivacy` | Nusiwo woɖona ɖe ta ɖeka me siwo ŋu wokpɔ ta na bliboe koe; gbea amesiwo xɔa nu le gaglãgbe kple cross-pool |
| `AllowFullyTransparent` | Azɔ hã ɖe mɔ t→t ɖoa ga tso UTXO siwo me kɔ |

### Bitcoin Core RPC ƒe Ðekawɔwɔ

ZECD wɔa Bitcoin Core ƒe JSON-RPC gbegbɔgblɔ ŋudɔ kple ɖekawɔwɔ le:

- Mɔnu ƒe ŋkɔwo (e.g. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Agble ƒe ŋkɔwo kple ƒomevi siwo le ŋuɖoɖowo me
- JSON-RPC 1.0 ƒe agbalẽkotoku ƒe wɔwɔme
- Gɔmeɖose veviwo, . `rpcauth` nyawo, kple cookie file ƒe kpeɖodzinana
- Vodada ƒe dzesiwo kple HTTP nɔnɔme ƒe nɔnɔmetata (HTTP 500 kple vodada ƒe ŋutilã, 401 gɔmesese)

Esia fia be Bitcoin fexexe ƒe agbalẽdzraɖoƒe geɖe siwo li fifia, asitɔtrɔ ƒe ƒoƒo ɖekae, kple ŋkuléleɖenuŋu dɔwɔnuwo ateŋu awɔ nu kple Zcash to ZECD dzi kple kɔda ƒe tɔtrɔ sue aɖe alo kura o.

Conformance suite (140+ checks) zɔna le PR ɖesiaɖe dzi ɖe live regtest daemon ŋu eye woɖo kpe edzi hã ɖe dutoƒo testnet ŋu.

### Nuŋlɔɖi Siwo Wotsɔ Ta Kpɔ (ZIP-302) .

ZECD ɖea Zcash ƒe akpoxɔnu memo ƒe nɔnɔme ɖe go to Bitcoin RPC ƒe anyigba si wonya nyuie dzi — nane si mele Bitcoin dɔwɔnu deŋgɔwo me o:

- `sendtoaddress` xɔa hex memo si woate ŋu atia abe megbenya bubu ene (vaseɖe byte 512; wogbe na amesiwo xɔa nu le gaglãgbe)
- Asitsatsa ŋutinya me nyawo tso `listtransactions` kple `gettransaction` dometᴐ nye `memo` (hex) kple `memoStr` (decoded text) fields ne emetsonu aɖe tsɔ ɖeka
- Wodoa alɔ zero-amount ɖoɖo ɖe amesi xɔ akpoxɔnu na memo-ko zazã ƒe nɔnɔmewo (the `z_sendmany` "memo-ko-dɔ" ƒe kpɔɖeŋu)

Esia na ZECD sɔ na dɔwɔɖoɖo siwo hiã na ame ŋutɔ ƒe gbedasi siwo le kɔsɔkɔsɔ me kpe ɖe fexexe ŋu.

### Dukɔmanɔsitɔ le Aɖaŋuwɔwɔ nu

ZECD gakpɔtɔ li **nɔnɔme aɖeke meli si mele kɔsɔkɔsɔ o si nuku ɖeɖeko ƒe gbugbɔgaɖoanyi mete ŋu gbugbɔ tu o**. Gakotokua ƒe nyatakakadzraɖoƒe (`data.sqlite`) nye nusi woate ŋu akpɔ tso nuku ƒe nyagbɔgblɔ me keŋkeŋ — woxɔa ga siwo wokpɔ ta na la nɔnɔme aɖeke manɔmee; wogaxɔa ga siwo me kɔ nyuie vaseɖe dometsotso ƒe seɖoƒe si woɖo.

Be nàgbugbɔ gakotoku aɖe aɖo anyi tso nuku me:

```sh
zecd init --restore --birthday <block-height>
```

Esia na be data directory la **disposable**: nugoe si me volume si nɔa anyi ɖaa mele o, si wogbugbɔ tu tso nukua me le gɔmedzedze ɖesiaɖe me la, mebu naneke vevi aɖeke o. Dɔwɔlawo ƒe agbanɔamedzie wònye be woalé ŋku ɖe adrɛs siwo wonana ŋu — ne wonya xɔ ga le kɔsɔkɔsɔ me ko hafi ZECD ɖoa ŋku adrɛswo dzi.

Woɖoe koŋ be wometsɔa ŋkɔwo dea eme o. Esi wònye be kɔsɔkɔsɔ me dzɔtsoƒe aɖeke mele dzesideŋkɔwo ŋu o eye womate ŋu agbugbɔ wo awɔ tso nuku me o ta la, ɖeko ZECD medoa alɔ wo o. Yɔyɔ label mɔnuwo trɔna a `method-not-found` vodada (`-32601`).

### No lightwalletd Nusi dzi woanɔ te ɖo

ZECD derives compact blocks, tree state, and mempool visibility directly from Zebra's JSON-RPC. There is no lightwalletd to operate or maintain — reducing operational complexity for self-hosted deployments.

### Cloud-Native kple Containerized Dɔwɔwɔwo

Wowɔ ZECD ƒe nɔnɔmemanɔsitɔ ƒe xɔtuɖaŋu na Docker kple Kubernetes nɔnɔmewo:

- Docker Blibo Kpa ƒuƒoƒo (`zebra → zecd`) si le nudzraɖoƒea
- Lãmesẽ ƒe nuwuƒe le melidzeƒea `9233` kple dzadzraɖo ŋuti numekuku siwo woate ŋu atrɔ asi le (`synced` or `connected`)
- JSON logging tiatia si woɖo na log aggregation pipelines
- ZIP-317 deterministic fees — fe oracle alo asife ƒe ɖoɖowɔwɔ aɖeke meli o
- `bootstrap_from_keys` (default on): nyatakakadzraɖoƒe ƒuƒlu aɖe si le axadzi `keys.toml` auto-rebuilds the wallet at startup — deploy to mounting ɖeka Secret eye nàdze egɔme kple PVC ƒuƒlu

---

## Vidzikpɔkpɔ ƒe Kpɔɖeŋuwo

ZECD doa alɔ safui-dzikpɔkpɔ ƒe kpɔɖeŋu etɔ̃, siwo sɔ na dɔwɔwɔ kple dedienɔnɔ ƒe nudidi vovovowo:

### 1. Wometsɔ nya ɣaɣlawo ɣla o (Default — Auto-Unlock) .

Nuku la ƒe ŋkuɖodzinu le `keys.toml` woxatsae ɖe **ƒexɔxɔ ƒe dzesidegbalẽvi** (`identity.txt`). Le gɔmedzedzea me `auto_unlock = true`, woɖea nukua ɖe ŋkuɖodzinu me le gɔmedzedzea me eyata womekpɔa nusiwo woɖo ɖa o eye ao `walletpassphrase` yɔyɔ hiã.

Enyo wu na: fexexe ƒe dɔwɔnu siwo wowɔna le wo ɖokui si, gakotoku dzodzoewo ɖɔliɖɔli, dɔwɔlawo ƒe nɔnɔmewo.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Fiase `identity.txt` **godo** data directory le mainnet — amesiame si xlẽ faɛl eveawo siaa la, gazazã ƒe ŋusẽ le esi.

### 2. Encrypted (Wotsɔ Nyagbewo Takpɔkpɔ) .

Wotsɔa nyagbe (ƒe scrypt) xatsaa ŋkuɖodzinu la ɖe dzesidenu ƒe faɛl teƒe. Gakotokua dzea egɔme nɔa ƒoƒo me; `walletpassphrase "<pass>" <timeout>` ʋunɛ hena ɣeyiɣi didi si wona eye wògbugbɔa ʋua le eɖokui si le ɣeyiɣi ƒe nuwuwu — si sɔ kple Bitcoin Core ƒe gakotoku si wotsɔ nya ɣaɣlawo ŋlɔ ƒe nuwɔna.

Nu nyuitɔ kekeake na: gakotoku dzodzoe siwo me womehiã gazazã ƒe ŋusẽ si dzi womekpɔ o le o; interactive operator ƒe dɔwɔwɔ ƒe ɖoɖowo.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Dzɔdzɔmenuwo Ko (UFVK — No Spend Key) .

Wodze egɔme kple Unified Full Viewing Key (UFVK) si woɖo ɖa tso gakotoku bubu me. Ate ŋu axɔ, awɔ scan, eye wòagblɔ ga si susɔ — gake mate ŋu ade asi asitsatsa te o. Enyo ŋutɔ na ŋkuléle ɖe nu ŋu, adzɔxexe, alo agbalẽdzikpɔkpɔ ƒe node siwo to vovo tso asidede gakotokua gbɔ.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup kple Gbugbɔgaxɔ

Woate ŋu axɔ ga tso **mnemonic ɖeɖeko** me. Nu bubu ɖesiaɖe nye cache.

| Nusiwo wowɔ le blema | Teƒe si wòle | Nusi wòkpɔna ta | Back up? |
|----------|----------|-----------------|----------|
| **Nya 24 ƒe ŋkuɖodzinyawo** | Woɖee fia zi ɖeka le `zecd init` | Gaawo — nusiwo bu = nusiwo bu tegbee | **Ẽ — le internet dzi (pepa/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Nuku si wotsɔ nya ɣaɣlawo ŋlɔ + dzigbezã + network | **Ẽ — abe Nya Ɣaɣla ene** |
| `identity.txt` | `[keys] age_identity` | Decrypts ƒe nyawo me `keys.toml` (zã ŋusẽ) | **Ẽ — ɖe vovo tso `keys.toml`** |
| Dzigbezã ƒe kɔkɔme | Eme `keys.toml` | Enaa gbugbɔgaɖoanyi kabakaba (kɔkɔme ɖesiaɖe do ŋgɔ na tx gbãtɔ) | Nuŋlɔɖi kple ŋkuɖodzinu |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Wallet cache — wogbugbɔ tu tso nuku me le gbugbɔgaɖoanyi | Ao — nusi wotsɔna ƒua gbe |
| `blocks/` | `<wallet dir>/blocks/` | Compact block cache | Ao — meɖoa meli gbeɖe o; ate ŋu atsi gã |
| `.cookie` | `<datadir>/.cookie` | Ɣeyiɣi kpui aɖe ƒe RPC kuki | Ao — wogbugbɔe wɔ le gɔmedzedzea me |

> **Ele be nyatakakawo ƒe agbalẽdzraɖoƒea nanye host-local.** ZECD ƒe single-instance lock (`<datadir>/.lock`) nye OS ƒe aɖaŋuɖoɖo ƒe gaƒoɖokui — mexɔa amedzrowo o. Mègama nyatakakadzraɖoƒe ƒe nuxexlẽ-ŋɔŋlɔ ɖe mɔ̃wo (NFS, Kubernetes) dzi gbeɖe o `ReadWriteMany`) — ZECD ƒe kpɔɖeŋu eve agblẽ gakotoku ƒe DB la me. Zã `ReadWriteOnce` babla siwo le Kubernetes me.

---

## RPC Mɔnu Dedienɔnɔ Ŋuti Nuŋlɔɖi

Le dɔwɔwɔ siwo me ɖaseɖigbalẽ ƒe sisi anye afɔku le la, ZECD doa alɔ seɖoƒe na RPC ƒe anyigba ɖe mɔnu sue aɖe si wotia dzi:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Mɔnu ɖesiaɖe si mele xexlẽdzesiawo me o la trɔna `-32601` (HTTP 404) — womate ŋu ade vovototoe tso mɔnu si meli o gbɔ o, eyata dɔdzikpɔla si wotu la meɖea naneke fiana tso nusi wòwɔ nuwɔametɔe ŋu o. Adzɔxegbalẽvi si woxɔna ko ate ŋu awɔ dɔ `sendtoaddress`, `sendmany`, kple `stop` be woaɖe blast radius si tso asisi si ŋu wogblẽ nu le gbɔ dzi akpɔtɔ.

---

## Vovototo Veviwo tso Bitcoin Core RPC gbɔ

Ele be dɔwɔla siwo le ʋuʋum tso Bitcoin alo zcashd dɔwɔnuwo me nanya nu tso vovototo siawo siwo woɖo koŋ wɔ ŋu:

| Nuwɔna | Bitcoin ƒe Nu vevi | ZECD |
|----------|-------------|------|
| Adrɛs ƒe nɔnɔme | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — womateŋu atso eme abe Bitcoin adrɛs ene to ka-ɖeka-ɖeka-ɖeka-ɖeka-ɖekaɖeka ƒe asisiwo dzi o |
| Ŋkɔwo ƒe ŋkɔwo | Full label fiase | Womewɔe o — . `setlabel`, `listlabels`, kple bubuawo trɔ gbɔ `-32601` |
| Fewo ƒe fewo | Zãla ƒe ɖoɖo; fetu ƒe asi | ZIP-317 ƒe nyametsotso ɖeɖeko; `settxfee`, `fee_rate`, `subtractfeefromamount` wogbe kple `-8` |
| Nuŋlɔɖiwo | Womedo alɔe o | `sendtoaddress` xɔa hex memo; ŋutinya wɔe be `memo` + `memoStr` agblewo |
| Kpeɖodzinyawo be woazã | 1 | 3 (ame ŋutɔ ƒe tɔtrɔ) / 10 (ame etɔ̃lia) — woate ŋu aɖoe to `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` le reorg | Azɔli trɔ yi fork | Trɔ yi `-5` (Block not found) ne cursor nye reorged adzɔge — gbugbɔ baseline kple parameterless yɔyɔ |
| Duplicate amesiwo xɔe le `sendmany` | Vodada | JSON parser gbãa duplicates (dziɖuɖu mamlɛawo) hafi ZECD kpɔa wo — mègaŋlɔ adrɛs ɖeka zi eve o |
| Dadasɔ le gbãtɔ ƒe wɔwɔ ɖekae me | Blocks alo dzoxɔxɔ-up | Subɔa akpa aɖe dadasɔ — agbo automation le `GET /readyz` (trɔa 503 vaseɖe esime wòwɔ ɖeka bliboe eye woɖe ŋgɔyiyi ƒe megbedede ɖa) |
| `minconf 0` in `getbalance` | 0-conf ƒe dadasɔ | Subɔ abe 1 — a shielded note menye nusi womate ŋu azã gbeɖe unmined |

---

## Dze egɔme Kaba

**Nudidi gbãtɔ:** Zebra si le du dzi le nutoa me kple `rpc.listen_addr = 127.0.0.1:18234` (dodokpɔ ƒe mɔ̃).

Dee tso crates.io (0.4.3+) me:

```sh
cargo install zecd
```

Alo tu tso dzɔtsoƒe:

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

**Nuwɔwɔ aduadu to curl dzi:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Nuwɔwɔ aduadu to Python dzi (zã Bitcoin RPC agbalẽdzraɖoƒe):**

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

**Gbugbɔ tso nuku me:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Melidzeƒe siwo woɖo ɖi

| Netwɔƒe | ZECD RPC | Zebra RPC (megbenyawo) | Lãmesẽ |
|---------|----------|---------------------|--------|
| Mainnet | 8232 ƒe xexlẽme | 8234 ƒe xexlẽme | 9233 ƒe xexlẽme |
| Dodokpɔ ƒe nyatakakadzraɖoƒe | Ƒe 18232 | Ƒe 18234 | 9233 ƒe xexlẽme |

---

## ZECD kple zcashd kple Zaino dome

| | zcashd ƒe nyawo | Zaino | ZECD |
|--|--------|-------|------|
| Akpa si wòwɔna | Node blibo + gakotoku | Indexer (exɔ ɖe lightwalletd teƒe) | Gakotoku ƒe dɔwɔƒe koe |
| Gbegbɔgblɔ | C++ | Gbeɖuɖɔ | Gbeɖuɖɔ |
| Nɔnɔme | Woɖe asi le eŋu | Dɔwɔwɔ | Dɔwɔwɔ (v0.5.0-rc3, Dzome 2026) |
| Default pool | Transparent | N/A | Orchard (shielded) |
| RPC dialect | zcashd-specific | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Ebia be node blibo | Ẽ (ame ŋutɔ) | Zebra alo zcashd | Zebra |
| Dukɔmanɔsitɔwo ƒe hayahaya | Ao | N/A | Ẽ (nuku ɖeɖeko) |
| Nuŋlɔɖi siwo wotsɔ akpoxɔnu wɔe | Ɛ̃ (`z_sendmany`) | N/A | Ẽ (Bitcoin RPC ƒe anyigba) |
| Kpɔkpɔ-ɖeko (UFVK) | Ẽ | Ẽ | Ẽ |
| Alilikpo-dzigbe me tɔ | Ao | Akpa aɖe | Ẽ |
| De | Tu/binary | Tu | `cargo install zecd` |

---

## Axa Siwo Do Ƒome Kplii

- [Zebra ƒe Node Bliboe](Zebra_Full_Node.md) — node blibo si ZECD do ƒome kplii
- [Zaino ƒe Indexer](Zaino.md) — indexer mɔnu bubu (exɔ ɖe lightwalletd teƒe)
- [Zakura Node ƒe ŋkɔ](Zakura_Node.md) — node blibo bubu ƒe dɔwɔwɔ (fork of Zebra) .
- [Safuiwo Kpɔkpɔ](Viewing_Keys.md) — alesi ZECD zãa akɔntabubu ƒe safuiwo tsɔ léa ŋku ɖe kɔsɔkɔsɔa ŋui
- [Gakotokuwo](/using-zcash/wallets) — gakotoku ƒe lãwo ƒe agbenɔnɔ ŋuti nyatakaka

## Nunɔamesiwo

- [ZECD GitHub (zecrocks/zecd) ƒe xexlẽdzesiwo.](https://github.com/zecrocks/zecd)
- [ZECD ƒe Dɔwɔnawo ƒe Dɔwɔgbalẽ](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — core Zcash nya ɣaɣlawo ƒe agbalẽdzraɖoƒe](https://github.com/zcash/librustzcash)
- [ZIP-317: Mɔnu si Woxena Ðe Amewo ƒe Fetu Siwo Woatsɔ Atsɔ Ayi Amewo Ŋu ƒe Mɔnu](https://zips.z.cash/zip-0317)
- [ZIP-302: Nuŋlɔɖi Siwo Wotsɔ Akpoxɔnu Wɔe](https://zips.z.cash/zip-0302)
- [Zodl gakotoku (si sɔ kple librustzcash) .](https://github.com/zodl-inc/zodl-ios)
