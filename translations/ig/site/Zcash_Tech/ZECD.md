<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD  Shielded-First Wallet Server (Onye na - ahụ maka obere akpa ego nke mbụ)

> 🇧🇷 [Versiọn na Portuguese](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD is a shielded-first wallet server for Zcash, built on [librustzcash](https://github.com/zcash/librustzcash) a na-ekpughere site n'asụsụ JSON-RPC nke Bitcoin Core. Ọ na - enye ndị mmepe na ndị ntinye ego ụgwọ ihe amaara, API dakọtara maka mmekọrịta Zcash  ma mee ka Orchard (olulu mmiri kachasị onwe ya) ndabara. Emepụtara site [zec.rocks](https://zec.rocks), ZECD ezubere iji dochie anya . `zcashd`bụ obere akpa arụ ọrụ na oge a, igwe ojii-nwa afọ deployments.

**Oge a:** 0.5.0-rc3 (July 13, 2026)  na Ironwood (NU6.3) nkwado. Wụnye site na `cargo install zecd` ma ọ bụ jiri onyinyo Docker.

---

## TL;DR

- ZECD bụ **wallet daemon (server) ** ọ bụghị ọnụ zuru oke. Ọ na-ejikwa igodo, nyocha, nkwenye, na RPC n'ekwughị usoro P2P nke Zcash .
- Ọ na-ekwu okwu ** Bitcoin Core's JSON-RPC dialect**: otu usoro aha, ụdị ubi, auth, na koodu njehie  ọtụtụ ndị ahịa RPC nke Bitcoin na Zcash arụ ọrụ n'ime igbe.
- **Orchard (shielded) adreesị bụ ndabara**; uzo doro anya (t-address) na nkwado Sapling chọrọ ntinye aka maka obere akpa.
- Ọ na-ejikọta ya na ** onye nwe onwe ya. [Zebra](Zebra_Full_Node.md) zuru ọnụ** site na mpaghara JSON-RPC  enweghị lightwalletd chọrọ.
- ** Ọdịnaya na-enweghị ihe ọ bụla site n'ịmepụta**: obere akpa ahụ dum nwere ike weghachite naanị mkpụrụ okwu, na -eme ka ndekọ data dị.
- ** Ọ bụghị ihe na-adaba maka zcashd**: emejuputa naanị usoro nke Zcash RPC, yana ọdịiche dị iche iche ebumnuche maka nzuzo na nchekwa.
- Ụgwọ na-eso **ZIP-317** (deterministic ụgwọ ngụkọta oge); onye ọrụ kpọmkwem ụgwọ a jụrụ.
- Na-akwado **shielded memos (ZIP-302)** site na ebe a maara nke ọma Bitcoin RPC.

---

## Olee Nsogbu ZECD Na-edozi?

`zcashd` bụ Zcash mbụ ọnụ na obere akpa jikọtara  forked si Bitcoin C ++ codebase ke 2016. N'ime oge, nke a kere esemokwu: koodu siri ike ịnọgide na-enwe, wallet dị nnọọ ejikọta ya node, na adreesị doro anya ka e gosipụtara dịka nhọrọ klas mbụ n'akụkụ ndị echekwara.

ZECD na-ekewapụ ọrụ akpa ego site na nkwekọrịta. Ọ bụ ** akwa nchekwa echekwara nke** n'etiti ngwa yana Zebra zuru ọnụ, na -enye:

- Ntinye aka nke Rust dị ọcha, nke oge a wuru na librustzcash (otu ọba akwụkwọ ahụ Zodl na Zingo)
- Nzuzo-site na ndabara (adreesị Orchard ma ọ bụrụ na ahaziri ya)
- Otu interface RPC dakọtara na Bitcoin nke wepụrụ mkpa ịmụ ihe akụrụngwa Zcash akọwapụtara.
- Ọdịnaya na-enweghị ala, nke nwere ike iweghachite mkpụrụ kwesịrị ekwesị maka nkwakọ ngwaahịa na igwe ojii.

---

## Ihe owuwu ụlọ

ZECD na-arụ ọrụ n'ụdị atọ:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD na-ekwurịta okwu Zebra ** naanị site na mpaghara JSON-RPC**  enweghị netwọkụ ibe, ọ nweghị ndị ọzọ indexers, enweghị lightwalletd. Njikọ zebra bụ ụma nke obodo: ZECD ga-ajụ izipu nzere nye onye ọbịa zuru ụwa ọnụ ma ọ bụrụ na ahaziri ya maka ọdụ ụgbọ mmiri echekwara (dịka WireGuard ma ọ bụ SSH).

---

## Ihe Ndị Bụ́ Isi E Ji Mara Ya

### Shielded-First, Orchard by Default

ZECD na-eji Orchard Unified Addresses dị ka ụdị adreesị ndabara. Sapling and transparent (t-address) pools require explicit configuration per wallet. Nke a imewe belata ihe ize ndụ nke mberede uzo eziga  a nkịtị nzuzo ọnyà ke okenye Zcash tooling.

Iwu nzuzo nwere ike ịhazi ya kwa oku ma ọ bụ n'ụwa niile na-akpọtụrụ gị. `[spend] privacy_policy`:

Ụkpụrụ omume. Omume.
|--------|----------|
| `AllowRevealedRecipients` (ndabara)  Na-enye ohere izipu ndị nnata na-enweghị ihe ọ bụla; gosipụtara ego na onye natara ya n'elu agbụ.
| `AllowRevealedAmounts` | Permits cross-pool sends (Sapling↔Orchard) but rejects transparent recipients |
| `FullPrivacy` ◯ Naanị ezipụ ihe n'ụzọ zuru ezu na-eziga n'ime otu ọdọ mmiri; jụrụ ndị nnata doro anya na cross-pool.
| `AllowFullyTransparent` ◯ Na-enyekwa ohere t→t na eziga ego site n'aka UTXOs ndị doro anya.

### Bitcoin Core RPC ndakọrịta

ZECD na-emejuputa asụsụ JSON-RPC nke Bitcoin Core site n'ịgbaso:

- Aha usoro (dịka. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Aha ubi na ụdị dị iche iche n'azịza ha.
- JSON-RPC 1.0 envelopu owuwu
- Onye edemede bụ isi, `rpcauth` ntinye, na kuki faịlụ nyocha
- Koodu njehie na HTTP ọnọdụ mapping (HTTP 500 nwere ahụ njehie, 401 semantics)

Nke a pụtara na ọtụtụ ọba akwụkwọ ịkwụ ụgwọ Bitcoin dị ugbu a, njikọta mgbanwe, yana ngwaọrụ nlekota nwere ike iso Zcash site na ZECD jiri obere ma ọ bụ enweghị ngbanwe koodu.

Ihe nkwekọrịta (140+ nyocha) na-agba ọsọ ọ bụla PR megide daemon regtest dị ndụ ma kwadoro ya maka netwọọdụ ule ọha.

### Memo ndị a na-echebe (ZIP-302)

ZECD na-ekpughe atụmatụ ncheta echekwara nke Zcash site n'elu Bitcoin RPC maara ihe  ihe adịghị adị na ngwa ọrụ Bitcoin ọkọlọtọ:

- `sendtoaddress` na-anabata ihe ncheta hex nhọrọ dị ka paramita ọzọ (ruo 512 bytes; jụrụ maka ndị nnata doro anya)
- Ihe ndekọ akụkọ azụmahịa sitere na: `listtransactions` na nke a: `gettransaction` gụnyere: `memo` (hex) na `memoStr` (decoded ederede) ubi mgbe ihe mmepụta na-ebu otu
- Zero-amount sends to a shielded recipient are supported for memo-only use cases (the `z_sendmany` "memo-only-send" pattern)

Nke a na-eme ka ZECD dabara adaba maka ngwa ndị chọrọ ozi nzuzo, n'elu agbụ yana ịkwụ ụgwọ.

### Ndị Na-enweghị Ala Site n'Ọmụma E Kere Ha

ZECD na-anọgide ** enweghị ọnọdụ nke mkpụrụ osisi naanị nwere ike weghachite. nchekwa data wallet (`data.sqlite`) bụ kpamkpam na-ewepụtara mkpụrụ okwu  kpuchie ego a natara n'enweghị ihe ọ bụla; uzo ego na-natara ruo haziri ọdịiche ịgba.

Iji weghachite obere akpa site na mkpụrụ:

```sh
zecd init --restore --birthday <block-height>
```

Nke a na-eme ka ndekọ data **disposable**: akpa enweghị olu na-adịgide adịgide, wughachi site mkpụrụ kwa mmalite, anaghị efunahụ ihe ọ bụla dị mkpa. Ndị ọrụ nwere ibu ọrụ maka ịdebe adreesị ha nyere  ZECD naanị echeta adres mgbe ha natara ego on-chain.

Akara aha na-anọghị n'ụma. N'ihi na akara enweghị isi iyi ma enweghi ike ịmegharị site na mkpụrụ, ZECD anaghị akwado ha. Ịkpọ oku usoro mkpado weghachite a `method-not-found` njehie (`-32601`).

### Enweghị lightwalletd Dependency

ZECD na-enweta kọmpụta dị n'ime, ọnọdụ osisi, yana visibiliti mempool ozugbo site na Zebra JSON-RPC. Enweghị lightwalletd iji rụọ ọrụ ma ọ bụ debe  belata mgbagwoju anya arụmọrụ maka nkesa nke onwe ya.

### Ntinye igwe ojii na nke a kwadoro ya

Ezubere usoro ụlọ ZECD na-enweghị steeti maka gburugburu Docker na Kubernetes:

- Full Docker Compose stack (Nke a bụ ihe dị mkpa maka usoro nhazi.`zebra → zecd`) dị na nchekwa data.
- Ihe na-egosi ahụike n'ọdụ ụgbọ mmiri. `9233` na configurable njikere-enyocha (`synced` or `connected`)
- Nhọrọ ndekọ JSON ahaziri maka pipeline nchịkọta logs.
- ZIP-317 ụgwọ ọrụ  enweghị ego oracle ma ọ bụ nhazi akwụkwọ ntuziaka.
- `bootstrap_from_keys` (default on): ndekọ data efu na-esote ya. `keys.toml` na-arụ ọrụ akpaaka mgbe ịmalitere  gbasaa site n'ịwụnye otu Nzuzo ma malite na PVC efu

---

## Ụdị Nlekọta Ndị Nne na Nna Na-elekọta Ụmụaka

ZECD na-akwado ụdị atọ nke njide igodo, dabara maka ntinye dị iche iche na ihe nchedo:

### 1. Unencrypted (Ntọala  Auto-Unlock)

Mnemonic mkpụrụ na-eme ka mmadụ nwee ike icheta ihe. `keys.toml` a na-ekpuchi ya n'ime akwụkwọ njirimara afọ (age identity file)`identity.txt`) Na ndabara. `auto_unlock = true`, mkpụrụ a na-ekpuchi n'ime ebe nchekwa mgbe mmalite ya mere eziga bụ unattended na ọ dịghị onye ọzọ. `walletpassphrase` a chọrọ oku.

Nke kachasị mma maka: ndị na-arụ ọrụ ịkwụ ụgwọ akpaaka, mgbanwe ego ọkụ, gburugburu ebe nrụpụta.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Ụlọ ahịa `identity.txt` **n'èzí** ndekọ data na mainnet  onye ọ bụla gụrụ faịlụ abụọ ahụ nwere ikike imefu.

### 2. E ji ihe nzuzo ezochi (Nwere Nchedo Passphrase)

A na-eji paswọọdụ (afọ scrypt) kechie mnemonic kama iji faịlụ njirimara. Akpa ego ahụ malitere ekpochi; `walletpassphrase "<pass>" <timeout>` na-emechi ya maka oge enyere ma mechie onwe gị mgbe ọ gwụchara  kwekọrọ n'omume obere akpa ego Bitcoin Core.

Nke kachasị mma maka: obere akpa ọkụ ebe a na-achọghị ikike iji ego emefu; usoro ọrụ onye njikwa mmekọrịta.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Nche-Naanị (UFVK  Ọ dịghị Spend Key)

Ejiri ya na Unified Full Viewing Key (UFVK) nke ebuputara site n'akpa ego ọzọ. Nwere ike ịnata, nyochaa ma kọọ nguzozi  mana enweghị ike ịbịanye aka na azụmahịa. Ezigbo maka nyocha, akwụkwọ ọnụahịa, ma ọ bụ ntinye ederede dị iche na obere akpa mbinye aka.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Ndabere na Iweghachite

Enwere ike iweghachite ego site na naanị ihe ncheta. Ihe ọ bụla ọzọ bụ ebe nchekwa.

❑ Ihe ọkpụkpụ ahụ. ● Ebe o dị. ▪ Gịnị ka ihe ahụ na-echebe. □ Idozi?
|----------|----------|-----------------|----------|
** Okwu 24 na-echeta ihe**. E gosipụtara otu oge n'oge a: `zecd init`  ego  ọnwụ = adịgide adịgide na-efu ** Ee  offline (akwụkwọ / HSM) **
| `keys.toml` | `<wallet dir>/keys.toml` ♬ Nkpuru zoro ezo + ụbọchị ọmụmụ + netwọk ** Ee dị ka ihe nzuzo**.
| `identity.txt` | `[keys] age_identity` ◯ Ịgbachi ihe e dere ede. `keys.toml` (na-emefu ikike) ** Ee  iche na nke a. `keys.toml`** |
◯ Ogologo ụbọchị ọmụmụ gị ❑ N'ime ụlọ ▸ Ọkpụkpụ aka: `keys.toml` ◯ Na-eme ka iweghachite ngwa (ogologo ọ bụla tupu mbụ tx) ❑ Dekọọ na mnemonic ○
| `data.sqlite` | `<wallet dir>/data.sqlite`  Ebe nchekwa obere akpa ego  wughachiri site na mkpụrụ n'oge mgbake. Ọ dịghị  ihe a ga-eji tufuo ya.
| `blocks/` | `<wallet dir>/blocks/`  Compact block cache. Mba  agaghị ebupụ ya; nwere ike ibu nnukwu ego.
| `.cookie` | `<datadir>/.cookie`  RPC kuki na-adịru nwa oge. Ọ dịghị ihe ọ bụla e mepụtara mgbe a malitere ya ọhụrụ.

> **Directory data ga-abụ onye ọbịa.** ZECD's single instance lock (`<datadir>/.lock`) bụ OS advisory mkpọchi  ọ dịghị span ụsụụ ndị agha. mgbe ịkọrọ a data directory agụ-dee gafee igwe (NFS, Kubernetes `ReadWriteMany`)  abụọ ZECD instances ga-emerụ akpa ego DB. Jiri `ReadWriteOnce` mpịakọta na Kubernetes.

---

## Usoro RPC Safelist

Maka nkenye ebe a ga-enwe ọdachi nke nzere, ZECD na-akwado igbochi elu RPC ka usoro nhọrọ:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Ụzọ ọ bụla na-adịghị n'ime ndepụta ahụ laghachiri `-32601` (HTTP 404)  enweghị ike ịmata ya site na usoro nke adịghị adị, n'ihi ya onye nkesa a kpọchiri akpọchi anaghị ekpughe ihe ọ bụla banyere ihe o mebiri. Onye natara akwụkwọ ọnụahịa nwere ike ịkwụsị ọrụ ahụ ma mee ka ndị ahịa ghara ịnweta ozi ha mgbe niile. `sendtoaddress`, `sendmany`, na `stop` iji belata radius mgbawa site na onye ahịa nwere nsogbu.

---

## Isi ihe dị iche na Bitcoin Core RPC

Ndị mmepe na-esi n'ọrụ Bitcoin ma ọ bụ zcashd agagharị kwesịrị ịma maka ọdịiche ndị a:

 Bitcoin Core ZECD Ụkpụrụ omume.
|----------|-------------|------|
Ụdị adreesị. `1...` / `bc1...` | `u1...` (Orchard Unified Address)  enweghị ike ịkọwa dị ka adreesị Bitcoin site na ndị ahịa nyocha-string.
 Labels. Full label store. Not implemented  `setlabel`, `listlabels`, wdg nloghachi . `-32601` |
◯ Ụgwọ ọrụ ❖ Onye na-arụ ya nwere ike ịtọ ihe ọ ga-akwụ; ahịa ego a ga- akwụ . ZIP-317 naanị deterministic; `settxfee`, `fee_rate`, `subtractfeefromamount` jụrụ na- `-8` |
Memos. Akwadoghi ya. `sendtoaddress` na-anabata hex memo; akụkọ ihe mere eme nwere `memo` + `memoStr` ubi ndị ahụ.
 Nkwenye iji mefu 1 3 (nke aka ya) / 10 (onye nke atọ)  nwere ike ịhazi site na `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` na reorg. Na-aga azụ n'ime fork. Ọ laghachiri `-5` (Block not found) ọ bụrụ na cursor bụ reorged pụọ  re-baseline with parameterless call.
◯ Ndị nnata abụọ na-abanye n'ime. `sendmany`  Njehie. JSON parser collapses duplicates (last wins) tupu ZECD ahụ ha  adịghị depụta otu adreesị ugboro abụọ  na-eme ka ndị ọrụ ibe gị ghara ịbịarute site n'ime ihe nchọgharị weebụ, ma ọ bụ jiri ya mee ihe maka ozi ịntanetị ọzọ.
 Balance n'oge mbụ mmekọrịta  blocks ma ọ bụ na-ekpo ọkụ elu  Na-eje ozi ele mmadụ anya n'ihu itule  ọnụ ụzọ ámá akpaaka on `GET /readyz` (laghachi 503 ruo mgbe synced zuru ezu na nkwalite backlog drained)
| `minconf 0` in `getbalance`  0-conf balance. Served as 1  a shielded note is never spendable unmined (Onye na - enweghị ihe ọ bụla)

---

## Mmalite ngwa-ngwa

** Ihe ndị dị mkpa:** Zebra na-agba ọsọ n'ógbè ahụ. `rpc.listen_addr = 127.0.0.1:18234` (nza ule).

Wụnye site na crates.io (0.4.3+):

```sh
cargo install zecd
```

Ma ọ bụ wuo site na isi iyi:

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

** Na-emekọrịta site na curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

** Na-emekọrịta site na Python (iji ọbá akwụkwọ Bitcoin RPC):**

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

** Na-eweghachi site na mkpụrụ:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Port ndị a na-ahọrọghị ahọpụtara

 Network  ZECD RPC  Zebra RPC (azụ)  Ahụike  Ọrịa na-efe efe.
|---------|----------|---------------------|--------|
 8232  9233  Mainnet 
Testnet 18232 18234 9233 Ihe ndị a na-ahụ anya

---

## ZECD megide zcashd megide Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
 Ọrụ  Full node + wallet  Index (na-anọchi lightwalletd)  naanị ihe nkesa Wallet ♀️
Asụsụ. C++ Rust. Rust
◯ Ọnọdụ ❖ E mechiri emechi Active. ✔️ Active (v0.5.0-rc3, July 2026)
| Default pool | Transparent | N/A | Orchard (shielded) |
 RPC dialect  zcashd-specific gRPC (lightwalletd) Bitcoin Core JSON-RPC  Zcashd na-agbanwe agbanwe.
 Chọrọ ọnụ zuru ezu  Ee (onwe)  Zebra ma ọ bụ zcashd  zebra  Ọ bụrụ na ị chọrọ ka a ga-eji ya mee ihe, biko kpọtụrụ m.
❑ Nchịkwa nke enweghị steeti. □ Mba ▸ Ọ dịghị onye na-ahụ maka ihe ndị metụtara okpukpe n'ebe ahụ ❖ Ee (naanị mkpụrụ osisi) ◯ E nweghị .
Ihe ncheta echekwara. Ee (`z_sendmany`) N/A Ee (Bitcoin RPC elu)
 Naanị-ekiri (UFVK) Ee. Ee, ee.
 Ọ bụ igwe ojii. Mba, ọ bụghị nke ọma. Ee.
 Wụnye  Mee / ọnụọgụ abụọ  Mepụta  Ọ bụrụ na ị nwere ike ime nke a, ọ ga-adị mma. `cargo install zecd` |

---

## Peeji ndị metụtara ya

- [Zebra Full Node (Nọmba zuru ezu)](Zebra_Full_Node.md)  zuru ọnụ ZECD jikọọ na-
- [Zaino Indexer (Nkọwapụta)](Zaino.md)  ọzọ indexer obibia (anọchi lightwalletd)
- [Zakura Node (Nọmba nke Zaku)](Zakura_Node.md)  ọzọ zuru ọnụ mmejuputa iwu (fork nke Zebra)
- [Igodo Nlele](Viewing_Keys.md)  otú ZECD si enyocha agbụ ahụ site na iji igodo nlele akaụntụ.
- [Akpa ego](/using-zcash/wallets)  ihe gbasara ego n'akpa uwe.

## Akụnụba

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [ZECD Operations Runbook (Akwụkwọ ndekọ ọrụ nke ụlọọrụ na-ahụ maka mmepe)](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash  isi Zcash cryptography library](https://github.com/zcash/librustzcash)
- [ZIP-317: Usoro Nkwụnye ego Ntugharị nke ruru eru.](https://zips.z.cash/zip-0317)
- [ZIP-302: Nchekwa Memos echekwara](https://zips.z.cash/zip-0302)
- [Akpa ego Zodl (librustzcash-dakọtara)](https://github.com/zodl-inc/zodl-ios)
