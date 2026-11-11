<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# zecd — Sava e-akpa ego nke Ebu Ụzọ na Nke E Chebere Echebe

zecd bụ sava e-akpa ego nke ebu ụzọ mee maka nke e chebere echebe maka Zcash, nke e wuru n'elu [librustzcash](https://github.com/zcash/librustzcash) ma wepụta ya site n'olumba JSON-RPC nke Bitcoin Core. Ọ na-enye ndị onye mmepụta [developers] na ndị na-ejikọta Kwụọ ụhwọ [payment] API maara nke ọma, nke dakọtara na Bitcoin, maka iso Zcash emekọrịta — ebe ọ na-eme Orchard (pool [pool] nke nwere Nzuzo [privacy] kacha elu) ka ọ bụrụ nke ndabara. [zec.rocks](https://zec.rocks) mepụtara ya, a haziri zecd iji dochie ọrụ e-akpa ego nke `zcashd` n'ime nrụnye oge a nke sitere n'igwe ojii.

**Ụdị ugbu a:** 0.5.0-rc3 (Julaị 13, 2026) — nwere nkwado Ironwood (NU6.3). Wụnye site na `cargo install zecd` ma ọ bụ jiri onyonyo Docker gọọmentị.

---

## Nkọwa nkenke

- zecd bụ **daemon e-akpa ego (sava)** — ọ bụghị full node. Ọ na-ahụ maka mkpịsị ugodi, nyocha, ịnye ihe akaebe, na RPC na-enweghị ikwu usoro P2P nke Zcash.
- Ọ na-ekwu **olumba JSON-RPC nke Bitcoin Core**: otu aha usoro, ụdị ogige, nkwenye, na koodu njehie — ọtụtụ ndị ahịa Bitcoin RPC na-arụ ọrụ na Zcash ozugbo n'enweghị nhazi ọzọ.
- **Adreesị Orchard (nke e chebere echebe) bụ nke ndabara**; nkwado Oha [transparent] (t-address) na Sapling chọrọ ka e nyere ya ikike n'ụzọ doro anya maka e-akpa ego ọ bụla.
- Ọ na-ejikọ na **full node [Zebra](Zebra_Full_Node.md) nke ị kwadoro n'onwe gị** site na JSON-RPC mpaghara — ọ dịghị lightwalletd achọrọ.
- **Ọ nweghị ọnọdụ e debere n'ichepụta ya**: enwere ike iweghachi e-akpa ego dum site na Mkpuru mgbake [seed phrase] naanị, nke na-eme ka ndekọ data bụrụ ihe a pụrụ ịtụfu.
- **Ọ bụghị nnọchi ozugbo maka zcashd**: ọ na-arụ naanị obere akụkụ nke usoro RPC Zcash, nwere ọdịiche nhazi e bu n'obi maka Nzuzo na nchekwa.
- Ugwo [fee] na-agbaso **ZIP-317** (ngụkọta ugwo ekpebiela); a na-ajụ ugwo onye ọrụ kọwara.
- Ọ na-akwado memo [memo] ndị e chebere echebe (ZIP-302) site n'elu RPC Bitcoin a maara nke ọma.

---

## Kedu Nsogbu Ka zecd Na-edozi?

`zcashd` bụ node mbụ na e-akpa ego jikọtara ọnụ nke Zcash — nke e kewapụtara n'usoro koodu C++ nke Bitcoin na 2016. Ka oge na-aga, nke a kpatara ihe isi ike: koodu ahụ siri ike idobe, e-akpa ego ahụ jikọtara node ahụ nke ọma, a na-egosipụtakwa adreesị Oha dị ka nhọrọ klaasị mbụ n'akụkụ ndị e chebere echebe.

zecd na-ekewa ọrụ e-akpa ego na consensus [consensus]. Ọ bụ **ọkwa e-akpa ego pụrụ iche** nke na-anọdụ n'etiti ngwa na full node Zebra, ma na-enye:

- Mmejuputa Rust dị ọcha, nke oge a, nke e wuru n'elu librustzcash (ọbá akwụkwọ ahụ nke na-enye Zodl na Zingo ike)
- Nhazi Nzuzo-ka-ọ-bụ-nke-ndabara (adreesị Orchard ma e wezụga ma ahaziri ya n'ụzọ ọzọ)
- Ntinye RPC dakọtara na Bitcoin nke na-ewepụ mkpa ịmụ ngwá ọrụ pụrụ iche nke Zcash
- Nhazi na-enweghị ọnọdụ edobere, nke Mkpuru mgbake nwere ike iweghachi, dabara maka nrụnye container na igwe ojii

---

## Nhazi

zecd na-arụ ọrụ n'ụdị ọkwa atọ:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd na-ekwurịta okwu na Zebra **naanị site na JSON-RPC mpaghara** — enweghị netwọkụ peer-to-peer, enweghị indexer nke ndị ọzọ, enweghịkwa lightwalletd. Ejiri nlezianya mee njikọ Zebra ka ọ bụrụ naanị nke mpaghara: zecd ga-ajụ iziga nzere na host enwere ike ịga n'ụwa niile ma e wezụga ma ahaziri ya n'ụzọ doro anya maka ọwara echekwara n'èzí usoro (dịka WireGuard ma ọ bụ SSH).

---

## Njirimara Ndị Dị Mkpa

### Nke E Chebere Echebe Mbụ, Orchard Dị Ka Ndabara

zecd na-eji Adreesị Njikọrịta Orchard dị ka ụdị adreesị ndabara. Pool Sapling na Oha (t-address) chọrọ nhazi doro anya maka e-akpa ego ọ bụla. Nhazi a na-ebelata ihe ize ndụ nke izipu Oha na mberede — ọnyà Nzuzo a na-ahụkarị n'ngwá ọrụ Zcash ochie.

A pụrụ ịhazi iwu Nzuzo maka oku ọ bụla ma ọ bụ n'ụwa niile na `[spend] privacy_policy`:

| Iwu | Omume |
|--------|----------|
| `AllowRevealedRecipients` (ndabara) | Na-ekwe ka e ziga ndị nnata Oha; na-ekpughe ego na onye nnata on-chain |
| `AllowRevealedAmounts` | Na-ekwe ka e ziga n'etiti pool (Sapling↔Orchard) mana na-ajụ ndị nnata Oha |
| `FullPrivacy` | Naanị izipu e chebere echebe kpamkpam n'ime otu pool; na-ajụ ndị nnata Oha na izipu n'etiti pool |
| `AllowFullyTransparent` | Na-ekwekwa ka e ziga t→t site na UTXO Oha kwadoro |

### Ndakọrịta Bitcoin Core RPC

zecd na-emejuputa olumba JSON-RPC nke Bitcoin Core na nnabata n'ihe ndị a:

- Aha usoro (dịka `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Aha na ụdị ogige n'ime nzaghachi
- Nhazi mkpuchi JSON-RPC 1.0
- Nkwenye isi, ndenye `rpcauth`, na nkwenye faịlụ kuki
- Koodu njehie na nhazi ọkwa HTTP (HTTP 500 nwere ahụ njehie, semantics 401)

Nke a pụtara na ọtụtụ ọbá akwụkwọ Kwụọ ụhwọ Bitcoin dị, njikọta exchange, na ngwá ọrụ nlekota nwere ike iso Zcash emekọrịta site na zecd na obere mgbanwe koodu ma ọ bụ enweghị ya.

Nnwale nnabata (nlele karịrị 140) na-arụ na PR ọ bụla megide daemon regtest dị ndụ, e nyochakwara ya megide testnet ọha.

### Memo Ndị E Chebere Echebe (ZIP-302)

zecd na-ewepụta njirimara memo e chebere echebe nke Zcash site n'elu RPC Bitcoin a maara nke ọma — ihe na-adịghị na ngwá ọrụ Bitcoin ọkọlọtọ:

- `sendtoaddress` na-anabata memo hex nhọrọ dịka parampat ọzọ n'azụ (ruo bytes 512; a na-ajụ ya maka ndị nnata Oha)
- Ndenye akụkọ Azụmahia [transaction] sitere na `listtransactions` na `gettransaction` gụnyere ogige `memo` (hex) na `memoStr` (ederede a tụgharịrị) mgbe mmepụta nwere otu
- A na-akwado izipu ego efu na onye nnata e chebere echebe maka Ojiji [use case] memo naanị (ụdị `z_sendmany` “memo-only-send”)

Nke a na-eme zecd ka ọ dabara maka ngwa chọrọ iziga ozi nzuzo, on-chain, n'akụkụ Kwụọ ụhwọ.

### Enweghị Ọnọdụ E Debere n'Nhazi

zecd anaghị edebe **ọnọdụ ọ bụla na-adịghị on-chain nke mweghachi Mkpuru mgbake naanị agaghị ewughachi**. Ebe nchekwa e-akpa ego (`data.sqlite`) sitere kpamkpam na Mkpuru mgbake — a na-eweghachi ego e chebere echebe n'enweghị ọnọdụ; a na-eweghachi ego Oha ruo oke oghere a haziri.

Iji weghachi e-akpa ego site na mkpụrụ:

```sh
zecd init --restore --birthday <block-height>
```

Nke a na-eme ka ndekọ data bụrụ **ihe a pụrụ ịtụfu**: container na-enweghị olu na-adịgide adịgide, nke e wughachiri site na mkpụrụ mgbe ọ bụla ọ malitere, anaghị efunahụ ihe ọ bụla dị mkpa. Ndị na-arụ ọrụ nwere ọrụ ịdebe adreesị ha na-enye — zecd na-echeta naanị adreesị ozugbo ha natara ego on-chain.

A kpachapụrụ anya hapụ labels. Ebe labels enweghị isi mmalite on-chain, enweghị ike iwughachi ha site na mkpụrụ, zecd anaghị akwado ha ma ọlị. Ịkpọ usoro label na-ewepụta njehie `method-not-found` (`-32601`).

### Enweghị Ndabere lightwalletd

zecd na-enweta block kọmpat, ọnọdụ osisi, na ọhụhụ mempool kpọmkwem site na JSON-RPC nke Zebra. Enweghị lightwalletd a ga-arụ ma ọ bụ debe — nke na-ebelata mgbagwoju anya arụmọrụ maka nrụnye onye kwadoro n'onwe ya.

### Nrụnye Sịte n'Igwe Ojii na Container

E mepụtara nhazi na-enweghị ọnọdụ edobere nke zecd maka gburugburu Docker na Kubernetes:

- Stack Compose Docker zuru ezu (`zebra → zecd`) dị na repository
- Endpoint ahụike na port `9233` nwere probes njikere enwere ike ịhazi (`synced` ma ọ bụ `connected`)
- Nhọrọ ndekọ JSON ahaziri maka pipeline nchịkọta ndekọ
- Ugwo ekpebiela ZIP-317 — enweghị fee oracle ma ọ bụ nhazi ugwo aka
- `bootstrap_from_keys` (ndabara agbanyere): ndekọ data efu n'akụkụ `keys.toml` na-ewughachi e-akpa ego na-akpaghị aka mgbe mmalite — tinye ya site n'ịkwado otu Secret ma malite na PVC efu

---

## Ụdị Nlekọta Ego

zecd na-akwado ụdị nlekọta mkpịsị ugodi atọ, dabara maka nrụnye na mkpa nchekwa dị iche iche:

### 1. Enweghị Nzobe Ederede (Ndabara — Mepee Na-akpaghị Aka)

A na-ekpuchi mnemonic mkpụrụ dị na `keys.toml` n'ime **faịlụ njirimara age** (`identity.txt`). Site na `auto_unlock = true` ndabara, a na-emeghe mkpụrụ ahụ n'ime ebe nchekwa mgbe mmalite ka izipu nwee ike ịbụ nke anaghị elekọta anya, ọ nweghịkwa oku `walletpassphrase` achọrọ.

Kachasị mma maka: ndị nhazi Kwụọ ụhwọ akpaghị aka, e-akpa ego hot nke exchange, gburugburu onye mmepụta.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Chekwaa `identity.txt` **n'èzí** ndekọ data na mainnet — onye ọ bụla gụrụ faịlụ abụọ ahụ nwere ikike imefu ego.

### 2. Eji Passphrase Chebe (Ederede Nzuzo Chebere)

A na-ekpuchi mnemonic ahụ site na passphrase (age scrypt) kama faịlụ njirimara. E-akpa ego na-amalite ekpochiri; `walletpassphrase "<pass>" <timeout>` na-emeghe ya maka oge enyere wee kpochie ya ọzọ na-akpaghị aka mgbe oge gwụsịrị — dabara na omume e-akpa ego ezoro ezo nke Bitcoin Core.

Kachasị mma maka: e-akpa ego hot ebe a naghị achọ ikike imefu ego na-enweghị nlekọta; usoro ọrụ onye na-arụ ọrụ na-emekọrịta.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Nlele Naanị (UFVK — Enweghị Mkpịsị Ugodi Imefu Ego)

A malitere ya site na Unified Full Viewing Key (UFVK) e bugara site n'e-akpa ego ọzọ. Ọ nwere ike ịnata, nyocha, ma kọọ ego fọdụrụ — mana enweghị ike ịbanye aka na Azụmahia. Ọ dabara nke ọma maka nlekota, ịnye invoice, ma ọ bụ node nyocha dị iche na e-akpa ego na-abanye aka.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Ndabere na Mweghachi

Enwere ike iweghachi ego site na **mnemonic naanị**. Ihe ọ bụla ọzọ bụ cache.

| Ihe | Ebe | Ihe ọ na-echebe | Mee ndabere? |
|----------|----------|-----------------|----------|
| **mnemonic okwu 24** | E gosiri otu ugboro na `zecd init` | Ego — ọnwụ = ọnwụ na-adịgide adịgide | **Ee — offline (akwụkwọ/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Mkpụrụ ezoro ezo + ụbọchị ọmụmụ + netwọkụ | **Ee — dịka Secret** |
| `identity.txt` | `[keys] age_identity` | Na-emeghe `keys.toml` (ikike imefu ego) | **Ee — iche na `keys.toml`** |
| Elu ụbọchị ọmụmụ | N'ime `keys.toml` | Na-eme mweghachi ngwa ngwa (elu ọ bụla tupu tx mbụ) | Detuo ya na mnemonic |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache e-akpa ego — ewughachiri site na mkpụrụ mgbe mweghachi | Mba — ihe a pụrụ ịtụfu |
| `blocks/` | `<wallet dir>/blocks/` | Cache block kọmpat | Mba — ebula ya; ọ nwere ike ibu nnukwu |
| `.cookie` | `<datadir>/.cookie` | Kuki RPC nwa oge | Mba — e megharịrị mgbe mmalite |

> **Ndekọ data ga-abụrịrị nke host mpaghara.** Mkpọchi nke otu instance nke zecd (`<datadir>/.lock`) bụ mkpọchi ndụmọdụ OS — ọ naghị agafe hosts. Ekesala ndekọ data ka e gụọ ma dee n'ofe igwe (NFS, Kubernetes `ReadWriteMany`) — instance zecd abụọ ga-emebi DB e-akpa ego. Jiri olu `ReadWriteOnce` na Kubernetes.

---

## Ndepụta Nchekwa Usoro RPC

Maka nrụnye ebe ntapu nzere ga-abụ ọdachi, zecd na-akwado ịmachibido elu RPC na obere usoro ahọpụtara:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Usoro ọ bụla na-adịghị na ndepụta na-eweghachi `-32601` (HTTP 404) — enweghị ihe dị iche na usoro na-adịghị adị, ya mere sava ekpochiri anaghị ekpughe ihe ọ gbanyụrụ. Onye na-enye invoice maka nnata naanị nwere ike gbanyụọ `sendtoaddress`, `sendmany`, na `stop` iji belata oke mbibi sitere n'aka onye ahịa e mebiri.

---

## Isi Ọdịiche na Bitcoin Core RPC

Ndị onye mmepụta na-esi na Bitcoin ma ọ bụ ngwá ọrụ zcashd kwaga kwesịrị ịma ọdịiche ndị a e bu n'obi:

| Omume | Bitcoin Core | zecd |
|----------|-------------|------|
| Ụdị adreesị | `1...` / `bc1...` | `u1...` (Adreesị Njikọrịta Orchard) — ndị ahịa na-enyocha string enweghị ike ịkọwa ya dịka adreesị Bitcoin |
| Labels | Ebe nchekwa label zuru ezu | Emebeghị ya — `setlabel`, `listlabels`, wdg. na-eweghachi `-32601` |
| Ugwo | Onye ọrụ na-ahazi; ahịa ugwo | ZIP-317 ekpebiela naanị; `settxfee`, `fee_rate`, `subtractfeefromamount` ka a na-ajụ na `-8` |
| Memo | Akwadoghị | `sendtoaddress` na-anabata memo hex; akụkọ nwere ogige `memo` + `memoStr` |
| Nkwenye iji mefu | 1 | 3 (mgbanwe nke onwe) / 10 (onye nke atọ) — a pụrụ ịhazi ya site na `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` n'oge reorg | Na-alaghachi na fork | Na-eweghachi `-5` (Ahụghị Block) ma ọ bụrụ na ewepụrụ cursor na reorg — jiri oku na-enweghị parampat tọọ ntọala ọzọ |
| Ndị nnata abụọ n'ime `sendmany` | Njehie | JSON parser na-ejikọta ndị abụọ (nke ikpeazụ meriri) tupu zecd ahụ ha — edepụtala otu adreesị ugboro abụọ |
| Ego fọdụrụ n'oge sync mbụ | Na-egbochi ma ọ bụ na-ekpo ọkụ | Na-enye ego fọdụrụ akụkụ ụfọdụ — jiri `GET /readyz` chịkwaa automation (na-eweghachi 503 ruo mgbe sync zuru oke ma wepụ backlog nkwalite) |
| `minconf 0` n'ime `getbalance` | Ego fọdụrụ 0-conf | A na-enye ya dịka 1 — note e chebere echebe anaghị enwe ike imefu mgbe a na-egwupụtabeghị ya |

---

## Mmalite Ngwa Ngwa

**Ihe achọrọ tupu e amalite:** Zebra na-agba n'ógbè nwere `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Wụnye site na crates.io (0.4.3+):

```sh
cargo install zecd
```

Ma ọ bụ wuo site na isi mmalite:

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

**Jiri curl emekọrịta:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Jiri Python emekọrịta (iji ọbá akwụkwọ Bitcoin RPC):**

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

**Weghachi site na mkpụrụ:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Ports Ndabara

| Netwọkụ | RPC zecd | RPC Zebra (backend) | Ahụike |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd megide zcashd megide Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Ọrụ | Full node + e-akpa ego | Indexer (na-edochi lightwalletd) | Sava e-akpa ego naanị |
| Asụsụ | C++ | Rust | Rust |
| Ọnọdụ | Agwụla | Na-arụ ọrụ | Na-arụ ọrụ (v0.5.0-rc3, Julaị 2026) |
| Pool ndabara | Oha | N/A | Orchard (nke e chebere echebe) |
| Olumba RPC | Nke pụrụ iche nke zcashd | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Chọrọ full node | Ee (onwe ya) | Zebra ma ọ bụ zcashd | Zebra |
| Mweghachi na-enweghị ọnọdụ | Mba | N/A | Ee (mkpụrụ naanị) |
| Memo e chebere echebe | Ee (`z_sendmany`) | N/A | Ee (elu Bitcoin RPC) |
| Nlele naanị (UFVK) | Ee | Ee | Ee |
| Nke sitere n'igwe ojii | Mba | Akụkụ ụfọdụ | Ee |
| Wụnye | Wuo/binary | Wuo | `cargo install zecd` |

---

## Peeji Ndị Metụtara Ya

- [Zebra Full Node](Zebra_Full_Node.md) — full node nke zecd na-ejikọ na ya
- [Zaino Indexer](Zaino.md) — usoro indexer ọzọ (na-edochi lightwalletd)
- [Zakura Node](Zakura_Node.md) — mmejuputa full node ọzọ (fork nke Zebra)
- [Viewing Keys](Viewing_Keys.md) — otu zecd si eji mkpịsị ugodi nlele akaụntụ enyocha chain
- [E-akpa ego](/using-zcash/wallets) — nchịkọta gburugburu e-akpa ego

## Akụrụngwa

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [zecd Akwụkwọ ntuziaka arụmọrụ](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — ọbá akwụkwọ cryptography isi nke Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Usoro Ugwo Mbufe Ruru Ọnụ](https://zips.z.cash/zip-0317)
- [ZIP-302: Memo Ndị E Chebere Echebe](https://zips.z.cash/zip-0302)
- [Zodl e-akpa ego (dakọtara na librustzcash)](https://github.com/zodl-inc/zodl-ios)
