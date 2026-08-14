<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD  Shielded-Kwanza Wallet Server

> 🇧🇷 [Versión en Português Tafsiri ya Kihispania](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD ni wallet server-kinga ya kwanza kwa ajili ya Zcash, kujengwa juu ya [kitabu cha fedha za ziada](https://github.com/zcash/librustzcash) Ni inatoa watengenezaji na malipo integrators ya kawaida, Bitcoin-ambayo inaendana API kwa kuingiliana na Zcash  wakati kufanya Orchard (majivu zaidi binafsi) default. Iliyotengenezwa na [zec.miamba](https://zec.rocks), ZECD imeundwa kuchukua nafasi ya `zcashd`'s mfuko wa fedha utendaji katika kisasa, wingu-asili deployments.

** Toleo la sasa:** 0.5.0-rc3 (Julai 13, 2026)  na msaada wa Ironwood (NU6.3). Weka kupitia `cargo install zecd` au kutumia picha rasmi Docker.

---

## TL;DR

- ZECD ni ** mkoba daemon (server) ** si full node. Ni hushughulikia funguo, skanning, kuthibitisha na RPC bila kuzungumza ya itifaki P2P Zcash.
- Inazungumza ** Bitcoin Core JSON-RPC lahaja **: sawa njia majina, maumbo uwanja, auth, na makosa codes  wengi wateja Bitcoin RPC kazi kwa Zcash nje ya sanduku.
- **Orchard (kuhifadhiwa) anwani ni default**; uwazi (t-anwani) na Sapling msaada zinahitaji wazi kuchagua katika kwa mkoba.
- Ni unajumuisha na ** binafsi mwenyeji [Zebra](Zebra_Full_Node.md) full node** kupitia ndani JSON-RPC  hakuna lightwalletd zinahitajika.
- ** stateless kwa kubuni**: mkoba nzima ni recoverable kutoka phrase mbegu peke yake, na kufanya data directory disposable.
- ** Si kuanguka-katika kwa zcashd**: inatekeleza tu ndogo ya Zcash RPC mbinu, na tofauti za makusudi kubuni kwa faragha na usalama.
- Ada kufuata **ZIP-317** (deterministic ada ya hesabu); user-umebainisha ada ni kukataliwa.
- Inasaidia ** Shielded memos (ZIP-302)** kupitia uso wa Bitcoin RPC inayojulikana.

---

## ZECD Hutatua Tatizo Gani?

`zcashd` Zcash awali node na mkoba pamoja  forked kutoka Bitcoin C ++ codebase katika 2016. Baada ya muda, hii umba msuguano: code ni vigumu kudumisha, mfuko wa fedha kwa nguvu wanashirikiana na Node, na anwani uwazi zinawasilishwa kama chaguzi darasa la kwanza kando wale ulinzi.

ZECD hutenganisha jukumu la mkoba kutoka makubaliano. Ni ** safu ya mfuko wa fedha maalum** ambayo inakaa kati ya maombi na node kamili ya Zebra, ikitoa:

- safi, kisasa Rust utekelezaji kujengwa juu ya librustzcash (Biblioteca hiyo nguvu Zashi na Zodl)
- Faragha-kwa default kubuni (Orchard anwani isipokuwa vinginevyo umeboreshwa)
- Bitcoin-ambayo inaendana RPC interface kwamba kuondoa haja ya kujifunza Zcash maalum zana za kazi
- Stateless, mbegu-kupatikana usanifu mzuri kwa ajili ya containerized na wingu deployments

---

## Usanifu wa majengo

ZECD inafanya kazi katika mtindo wa ngazi tatu:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD kuwasiliana na Zebra ** peke kupitia ndani JSON-RPC**  hakuna peer kwa mtandao wa rika, hakuna indexers ya tatu chama cha, hakuna lightwalletd. uhusiano zebra ni makusudi tu za mitaa: ZECD kukataa kutuma sifa kwa kimataifa routable mwenyeji isipokuwa wazi umeboreshwa nje ya bendi salama handaki (kwa mfano WireGuard au SSH).

---

## Sifa Muhimu za Mfano wa Yesu

### Kuhifadhiwa-Kwanza, Orchard kwa Default

ZECD inatumia Orchard Unified Anwani kama default aina ya anwani. Sapling na uwazi (t-anwani) mabwawa zinahitaji wazi Configuration kwa mkoba. Design hii inapunguza hatari ya ajali transparent inatuma  kawaida faragha pitfall katika umri wa zana za Zcash.

Sera ya faragha ni configurable kwa wito au kimataifa katika `[spend] privacy_policy`:

Sera. Tabia.
|--------|----------|
| `AllowRevealedRecipients` (default) ▸ Inaruhusu hutuma kwa wapokeaji wa uwazi; inaonyesha kiasi na mpokeaji kwenye mnyororo.
| `AllowRevealedAmounts` | Permits cross-pool sends (Sapling↔Orchard) but rejects transparent recipients |
| `FullPrivacy` ❖ Tu kikamilifu-kuhifadhiwa hutuma ndani ya kundi moja; inakataza wapokeaji uwazi na msalaba wa makundi.
| `AllowFullyTransparent` Pia inaruhusu t→t hutuma fedha kutoka UTXOs uwazi.

### Bitcoin Core RPC Upatano

ZECD inatekeleza Bitcoin Core JSON-RPC lahaja na kufuata katika:

- Majina ya njia (kwa mfano. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Majina ya uwanja na aina katika majibu
- JSON-RPC 1.0 envelope muundo wa
- Msingi auth, `rpcauth` viingilio, na faili ya kuki uthibitisho
- Makodi ya makosa na HTTP hali ramani (HTTP 500 kwa mwili kosa, 401 semantics)

Hii ina maana maktaba nyingi zilizopo Bitcoin malipo, kubadilishana integrations, na ufuatiliaji zana inaweza kuingiliana na Zcash kupitia ZECD kwa mabadiliko kidogo au hakuna code.

Suite ya kufuata (140 + hundi) anaendesha juu kila PR dhidi ya kuishi regtest daemon na pia kuthibitishwa dhidi testnet umma.

### Memo Shielded (ZIP-302)

ZECD inaonyesha kipengele cha kumbukumbu ya walinzi wa Zcash kupitia uso unaojulikana wa Bitcoin RPC  kitu ambacho hakipatikani katika zana za kawaida za Bitcoin:

- `sendtoaddress` kukubali hiari hex memo kama ziada trailing parameter (hadi 512 baiti; kukataliwa kwa wapokeaji uwazi)
- Mawasiliano ya historia entries kutoka `listtransactions` na `gettransaction` ni pamoja na: `memo` (hex) na `memoStr` (Texts decoded) mashamba wakati pato hubeba moja
- Zero kiasi hutuma kwa mpokeaji shielded ni mkono kwa ajili ya kumbukumbu tu matumizi kesi (ya `z_sendmany` "kumbusho-tu-tuma" muundo)

Hii inafanya ZECD inafaa kwa ajili ya maombi ambayo yanahitaji faragha, on-chain ujumbe pamoja na malipo.

### Watu Wasio na Uraia kwa Kuzaliwa

ZECD bado ** hakuna nje ya mlolongo hali ambayo mbegu tu kurejesha hakuweza kujenga upya**. database mkoba (`data.sqlite`) ni derivable kabisa kutoka kwa neno mbegu  ulinzi fedha zinapatikana bila masharti; uwazi fedha zinalipwa hadi umeboreshwa pengo kikomo.

Ili kurejesha mkoba kutoka mbegu:

```sh
zecd init --restore --birthday <block-height>
```

Hii inafanya data directory **disposable**: chombo na hakuna kiasi kudumu, kujengwa upya kutoka mbegu juu ya kila kuanza, haina kupoteza kitu muhimu. waendeshaji ni wajibu kwa ajili ya kufuatilia anwani wao kutoa  ZECD tu anakumbuka anwani mara moja wamepokea fedha on-chain.

Labels ni makusudi kukosekana. Kwa sababu labels hawana on-mnyororo chanzo na haiwezi kuwa upya kutoka mbegu, ZECD tu haina msaada wao. Wito wa njia ya lebo anarudi a `method-not-found` kosa (`-32601`).

### Hakuna lightwalletd Utegemezi

ZECD derives compact blocks, tree state, na mempool visibility moja kwa moja kutoka Zebra's JSON-RPC. Hakuna lightwalletd kuendesha au kudumisha  kupunguza kazi ya utata wa utoaji binafsi mwenyeji.

### Cloud-asili na Containerized kupelekwa

usanifu stateless ya ZECD ni iliyoundwa kwa ajili Docker na Kubernetes mazingira:

- Full Docker Kuandika stack (`zebra → zecd`) inapatikana katika kumbukumbu.
- Hatua ya mwisho afya katika bandari `9233` na configurable tayari probes (`synced` or `connected`)
- Imeundwa JSON kumbukumbu chaguo kwa ajili ya magogo mkusanyiko wa kumbukumbu
- ZIP-317 deterministic ada  hakuna ada oracle au mwongozo wa muundo wa malipo
- `bootstrap_from_keys` (default on): tupu data directory karibu na `keys.toml` auto-kujenga upya mkoba wakati wa kuanza  kupelekwa kwa kufunga moja siri na kuanzia PVC tupu

---

## Mifano ya Usimamizi wa Watoto

ZECD inasaidia mifano mitatu ya uhifadhi wa ufunguo, inayofaa kwa mahitaji tofauti ya kupelekwa na usalama:

### 1. Unencrypted (Default  Auto-Kufungua)

mbegu mnemonic katika `keys.toml` ni amefungwa kwa ** umri faili utambulisho** (`identity.txt`Na default ya . `auto_unlock = true`, mbegu ni decrypted katika kumbukumbu wakati wa kuanza hivyo hutuma si kusimamiwa na hakuna `walletpassphrase` wito inahitajika.

Bora kwa ajili ya: automatiska malipo processors, kubadilishana moto pochi, mazingira developer.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Hifadhi `identity.txt` ** nje ya** data directory juu mainnet  mtu yeyote ambaye anasoma faili zote mbili ina kutumia mamlaka.

### 2. Imefichwa (Imelindwa na Passphrase)

mnemonic ni amefungwa na password (umri scrypt) badala ya faili utambulisho. mfuko wa fedha kuanza imefungwa; `walletpassphrase "<pass>" <timeout>` unlocks ni kwa muda uliopangwa na auto-relock wakati wa kumaliza  vinavyolingana Bitcoin Core ya encrypted mkoba tabia.

Bora kwa ajili ya: moto pochi ambapo bila usimamizi kutumia mamlaka si required; mwingiliano operator workflows.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-Tu (UFVK  Hakuna Spend Key)

Initialized with a Unified Full Viewing Key (UFVK) exported from another wallet. Can receive, scan, and report balances — but cannot sign transactions. Ideal for monitoring, invoicing, or audit nodes separate from the signing wallet.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup na Recovery

Fedha zinaweza kupatikana kutoka kwa mnemonic pekee. Kila kitu kingine ni cache.

 Artefact. Location. What it protects? Back up? (Kipengee)
|----------|----------|-----------------|----------|
** Maneno 24 ya kumbukumbu**. Imeonyeshwa mara moja katika `zecd init` Fedha  hasara = kupoteza kudumu. ** Ndiyo  offline (karatasi / HSM) **
| `keys.toml` | `<wallet dir>/keys.toml`  Mbegu iliyofichwa + siku ya kuzaliwa + mtandao. ** Ndiyo  kama siri**
| `identity.txt` | `[keys] age_identity` Kufafanua. `keys.toml` (kutumia mamlaka) ** Ndiyo  tofauti na `keys.toml`** |
◯ Urefu wa siku ya kuzaliwa. `keys.toml` ◯ hufanya kurejesha haraka (kiasi chochote kabla ya kwanza tx) ▸ Rekodi na mnemonic ❖
| `data.sqlite` | `<wallet dir>/data.sqlite`  Kifurushi cha mkoba  kujengwa upya kutoka mbegu juu ya kurejesha. No  disposable.
| `blocks/` | `<wallet dir>/blocks/`  Compact block cache. No  kamwe meli; inaweza kukua kubwa.
| `.cookie` | `<datadir>/.cookie`  RPC cookie ya muda mfupi. Hakuna  kuzaliwa upya wakati wa kuanza

> ** orodha ya data lazima kuwa mwenyeji-kwenye.** ZECD's single-instance lock (`<datadir>/.lock` ni OS ushauri lock haina span majeshi. Kamwe kushiriki data directory kusoma-kuandika katika mashine (NFS, Kubernetes `ReadWriteMany` mbili ZECD matukio ingekuwa uharibifu mkoba DB. Matumizi ya `ReadWriteOnce` kiasi katika Kubernetes.

---

## RPC Njia Safelist

Kwa ajili ya kupelekwa ambapo uvujaji wa sifa itakuwa janga, ZECD inasaidia kuzuia uso RPC kwa subset waliochaguliwa wa mbinu:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Njia yoyote si katika orodha anarudi `-32601` (HTTP 404)  indistinguishable kutoka njia ambayo haipo, hivyo server imefungwa chini haina yatangaza chochote kuhusu nini ni walemavu. kupokea tu invoicer unaweza kuzima `sendtoaddress`, `sendmany`, na `stop` ili kupunguza radius mlipuko kutoka kwa wateja walioathirika.

---

## Tofauti kuu kutoka Bitcoin Core RPC

Watengenezaji kuhamia kutoka Bitcoin au zcashd zana lazima kuwa na ufahamu wa hizi divergences makusudi:

Mazoea Bitcoin Core ZECD
|----------|-------------|------|
Fomati ya anwani. `1...` / `bc1...` | `u1...` (Orchard Unified Address)  si parseable kama anwani Bitcoin na mteja string-parsing.
 Labels. Full kuhifadhi lebo. Si kutekelezwa  `setlabel`, `listlabels`, nk kurudi `-32601` |
 ada. user-settable; soko la ada ZIP-317 deterministic tu; `settxfee`, `fee_rate`, `subtractfeefromamount` kukataliwa na `-8` |
Memo. Haikubaliwi. `sendtoaddress` anakubali hex memo; historia ina `memo` + `memoStr` mashamba.
☐ Uthibitisho wa kutumia 1 ▸ 3 (badiliko mwenyewe) / 10 (mtu mwingine) ❑ Configurable kupitia `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` kwenye reorg. Hurudi kwa uma. Inarudi `-5` (Block haipatikani) kama mshale ni reorganized mbali  tena msingi line na parameterless wito.
◯ Kuwasilisha barua pepe kwa mpokeaji katika: `sendmany`  kosa. JSON parser collapses duplicates (last wins) kabla ZECD anaona yao  don't list the same address twice
 Usawa wakati wa awali ya kulandanisha. Blocks au joto-up. Hutumika usawa sehemu  gate automatisering juu ya `GET /readyz` (inarudi 503 mpaka kabisa kulandanishwa na kuboresha backlog ni drained)
| `minconf 0` in `getbalance`  0-conf usawa. kutumika kama 1  ulinzi noti ni kamwe spendable unmined.

---

## Kuanza Haraka

** Mahitaji ya awali:** Zebra mbio ndani na `rpc.listen_addr = 127.0.0.1:18234` (Mtandao wa majaribio).

Kufunga kutoka crates.io (0.4.3+):

```sh
cargo install zecd
```

Au kujenga kutoka chanzo:

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

** Kuingiliana kupitia curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

** Kuingiliana kupitia Python (kwa kutumia maktaba Bitcoin RPC):**

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

** Kurudisha kutoka mbegu:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Bandari za chaguo-msingi

Mtandao: ZECD RPC Zebra RPC (Backend) Afya.
|---------|----------|---------------------|--------|
Mainnet 8232 8234 9233 Msaada wa simu za mkononi.
Testnet 18232 18234 9233 - Mchoro wa mtihani.

---

## ZECD dhidi ya zcashd dhidi Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
 Jukumu: Full node + wallet. Indexer (huchukua nafasi ya lightwalletd)  Wallet server tu
Lugha. C++. Rust. Rust
Hali. Deprecated Active. Active (v0.5.0-rc3, Julai 2026)
| Default pool | Transparent | N/A | Orchard (shielded) |
 RPC lugha zcashd-hususa gRPC (lightwalletd) Bitcoin Core JSON-RPC
inahitaji node kamili. self Ndiyo Zebra au zcashd. zebra.
 Ufufuzi wa hali ya juu. No N/A Yes (mbegu tu)
Memo za kulindwa. Ndiyo (`z_sendmany`(N/A) Ndiyo.
 Kutazama tu (UFVK) Ndiyo. Ndio, ndiyo.
Wingu-asili. Hapana. Sehemu ya kweli, ndiyo.
 Install  Kujenga/binary  Jenga. `cargo install zecd` |

---

## Kurasa Zinazohusiana

- [Zebra Full Node (Njia ya Kuunganisha)](Zebra_Full_Node.md)  full node ZECD inaunganisha kwa
- [Zaino Indexing Kifaa cha Kuonyesha Maonyesho ya Picha](Zaino.md)  mbadala indexer njia (huchukua nafasi ya lightwalletd)
- [Zakura Node (Kituo cha Zakura)](Zakura_Node.md)  nyingine full node utekelezaji (furka ya Zebra)
- [Kuangalia funguo za kuvinjari](Viewing_Keys.md)  jinsi ZECD scans mlolongo kutumia akaunti viewing funguo
- [Mkoba](/using-zcash/wallets)  maelezo ya jumla mzunguko wa pochi

## Rasilimali

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [ZECD Operations Runbook (Kitabu cha Uendeshaji wa Shughuli)](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.miamba](https://zec.rocks)
- [librustzcash  msingi Zcash maktaba ya cryptography](https://github.com/zcash/librustzcash)
- [ZIP-317: Utaratibu wa Ada ya Kuhamisha Kiasi.](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded Memos](https://zips.z.cash/zip-0302)
- [Zodl mkoba (librustzcash-ambatana)](https://github.com/zodl-inc/zodl-ios)
