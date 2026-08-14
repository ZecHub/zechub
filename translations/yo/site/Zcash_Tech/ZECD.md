<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD  Olùpèsè Wọ́léètì Ààbò-Kàkọ̀

> 🇧🇷 [Ìtumọ̀ èdè Potogí](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD jẹ olupin apamọwọ akọkọ-alabo fun Zcash, ti a kọ lori [ìwé ìléwọ́](https://github.com/zcash/librustzcash) ati ki o farahan nipasẹ Bitcoin Core ká JSON-RPC ede. O fun awọn Difelopa ati owo integrators a mọ, Bitcoin-ibamu API fun ibaraẹnisọrọ pẹlu Zcash  nigba ti ṣiṣe Orchard (awọn julọ ikọkọ adagun) aiyipada. Ṣiṣẹda nipa [àwọn òkúta tí ó wà nínú àpáta](https://zec.rocks), A ṣe ZECD lati rọpo awọn ohun elo ti o ni agbara. `zcashd`'s wallet functionality ni igbalode, awọsanma-abinibi deployments.

** Ẹya lọwọlọwọ:** 0.5.0-rc3 (Oṣù Keje 13, 2026)  pẹlu atilẹyin Ironwood (NU6.3). Fi sori ẹrọ nipasẹ `cargo install zecd` tàbí lo àwòrán Docker tí wọ́n ṣe lábẹ́ òfin.

---

## TL;DR

- ZECD jẹ́ àwo n èèbó (server) ** kì í ṣe ìkànnì tó kún. Ó ń bójú tó kókó, wíwò, ìdánilójú àti RPC láì sọ̀rọ̀ ìlànà P2P ti Zcash.
- O n sọ ** Bitcoin Core's JSON-RPC dialect**: awọn orukọ ọna kanna, apẹrẹ aaye, aṣẹ, ati koodu aṣiṣe  ọpọlọpọ awọn alabara RPC ti Bitcoin ṣiṣẹ pẹlu Zcash lati inu apoti naa.
- ** Orchard (ààbò) adirẹsi ni awọn aiyipada**; ìmọtoto (t-adiresi) ati Sapling support beere kedere yàn ninu fun apamọwọ.
- Ó so sí àwo n ìkànnì tí ó ń gbé ara rè . [Zebra](Zebra_Full_Node.md) ì ë í ¤ë¥1⁄4 êμ¬ì§¤í ̧ê° ì ¬-JSON RPC  no lightwalletd needed.
- **Awọn ti ko ni ipo nipasẹ apẹrẹ**: gbogbo apamọwọ naa le gba pada lati inu gbolohun ọrọ irugbin nikan, ṣiṣe itọsọna data idasilẹ.
- **Kì í ṣe ìmúṣẹ fún zcashd**: ó ń lo àwọn ìlànà RPC Zcash díẹ̀, pẹlú ìyàtọ̀ nínú àkànṣe ètò láti dáàbò bo àṣírí àti ààbò.
- Awọn owo sisan tẹle **ZIP-317** (iṣiro idiyele ipinnu); awọn owo ti a ṣalaye nipasẹ olumulo ni o kọ.
- O ṣe atilẹyin ** awọn akọsilẹ ti a fi pamọ (ZIP-302)** nipasẹ oju-ilẹ RPC Bitcoin olokiki.

---

## Ìṣòro Wo Ni ZECD Ń Yanjú?

`zcashd` jẹ́ ìsopọ̀ àpòòwé àti kóòtù àkọkọ ti Zcash  tí a pín láti inú ibi-ìpamọ́ kòódà C++ Bitcoin ní 2016. Bí àkókò ṣe ń lọ, èyí dá ìjà sílẹ̀: ó ṣòro fún kọódì náà láti ṣètẹlẹyìn, owó pópó ni wọ́n so pọ̀ pẹ̀lú kóótù náà dáadáa, àwọn àdírésì tó mọ́rán sì wà gẹ́gẹ́ bí àwọn yíyàn kíláàsì àkọ́kó̀ lẹ́gbẹ̀ẹ́ àwọn tí wọn ò ríran.

ZECD ya ẹrù àpò-ìpamọ́ kúrò nínú ìfohùnṣòótọ́. Ó jẹ **òpópónà ti a yàtọ̀** tí ó wà láàrin àwọn ohun èlò àti Zebra full node, tó pèsè:

- Àtúnṣe Rust tó mótó, tí ó sì jẹ́ òde òní ti a kọ sórí librustzcash (ìwé-ìmọ̀ kan náà tí ń lo Zashi àti Zodl)
- Àwòrán ìpamọ́-nípasẹ̀ àlẹmọ (Àwọn àdírésì Orchard bí kò bá ṣe pàtó)
- A Bitcoin-agbekalẹ RPC ni wiwo ti o yọ awọn nilo lati ko eko Zcash pato irinṣẹ
- Aṣayan-ara ti ko ni ipinle, irugbin-ti o le gba pada dara fun awọn gbigbe apo ati awọsanma.

---

## Ìṣẹ̀dá ilé-ìkọ́lé

ZECD n ṣiṣẹ ni awoṣe ipele mẹta:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD n ba Zebra sọrọ **nipasẹ agbegbe JSON-RPC**  ko si awọn nẹtiwọọki ẹlẹgbẹ, ko si itọsọna ti ẹnikẹta, ko ṣe lightwalletd. Asopọ Zebra jẹ gangan ni agbegbe nikan: ZECD yoo kọ lati firanṣẹ iwe eri si oluṣakoso agbaye kan ayafi ti o ba tunto kedere fun eefin aabo ita gbangba (fun apẹẹrẹ WireGuard tabi SSH).

---

## Àwọn Ànímọ́ Pàtàkì Rẹ̀

### Shielded-First, Orchard by Default

ZECD nlo Orchard Unified Addresses bi iru adirẹsi aiyipada. Sapling ati awọn adagun ti o ni imọlẹ (t-address) nilo iṣeto alaye fun apamọwọ kan. Apẹrẹ yii dinku eewu ti ṣiṣan gangan firanṣẹ  a aṣiri asiri wọpọ ninu irinṣẹ Zcash agbalagba.

Ìlànà ìpamọ́ jẹ àdáṣe fún ìpè kan tàbí lágbàáyé nínú `[spend] privacy_policy`:

Ìlànà. Àṣà ìṣesí.
|--------|----------|
| `AllowRevealedRecipients` (àkójọ)  A máa ń fi àṣẹ ránṣẹ́ sí àwọn olùgba tí kò ní àlàfo; ó ń sọ iye àti ẹni tó gbà á lórí ẹ̀rọ-ìpèsè.
| `AllowRevealedAmounts` | Permits cross-pool sends (Sapling↔Orchard) but rejects transparent recipients |
| `FullPrivacy` | Only fully-shielded sends within one pool; rejects transparent recipients and cross-pool |
| `AllowFullyTransparent` Ó tún fàyè gba ìfúnpáwó láti inú àwọn UTXO tí ó ṣe kedere.

### Bitcoin Core RPC Ìmúṣẹ Àjọṣe

ZECD ṣe àtúnṣe sí èdè JSON-RPC ti Bitcoin Core pẹlu ibamu kọja:

- Awọn orukọ ọna (fun apẹẹrẹ: `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Orúkọ àti irú àwọn pápá nínú ìdáhùn.
- JSON-RPC 1.0 ìtòlẹ́sẹẹsẹ àpòòwé
- Àwọn oníṣe pàtàkì, `rpcauth` àwọn àkọsílẹ̀, àti ìfipamọ́ fáìlì kuki
- Awọn koodu aṣiṣe ati awọn aworan ipo HTTP (HTTP 500 pẹlu ara aṣiṣe, 401 semantics)

Eyi tumọ si ọpọlọpọ awọn ile-ikawe isanwo Bitcoin ti o wa tẹlẹ, isopọmọ paṣipaarọ, ati awọn irinṣẹ ibojuwo le ṣe ibaraenisepo pẹlu Zcash nipasẹ ZECD pẹlu diẹ tabi ko si iyipada koodu.

Aṣayan ibamu (140+ awọn ayẹwo) n ṣiṣẹ lori gbogbo PR lodi si daemon regtest laaye ati pe o tun jẹ idaniloju pẹlu testnet gbangba.

### Àwọn Ìpínlẹ̀ Ààbò (ZIP-302)

ZECD fi àfihàn ohun tí ó jẹ́ ìpamọ̀ ìrántí ti Zcash hàn nípasẹ̀ ojú-ìwòye Bitcoin RPC tó mọ  nkankan tí kò sí nínú àwọn irinṣẹ Bitcoin:

- `sendtoaddress` gba akọsilẹ hex ti o jẹ aṣayan bi paramita atẹle afikun (to awọn bytes 512; kọ fun awọn olugba ṣiṣan)
- Àwọn àkọsílẹ̀ ìtàn ìsòwò láti inú: `listtransactions` àti pé, `gettransaction` tó ní nínú: `memo` (ìkó) àti `memoStr` (decoded text) awọn aaye nigbati ohun ti o jade gbe ọkan
- Awọn ifiranṣẹ iye-ero si olugba ti o ni aabo jẹ atilẹyin fun awọn ọran lilo memo nikan (awọn ohun elo ipamọ data). `z_sendmany` "ìránṣẹ-kìlọ-fi" àwòṣe)

Eyi jẹ ki ZECD dara fun awọn ohun elo ti o nilo ikọkọ, ifiranṣẹ on-chain lẹgbẹẹ owo sisan.

### Àwọn Tí Kò Ní Orílẹ̀-Èdè Kan Náà

ZECD kò sí ìmúlẹ̀sílè tí ó wà ní òde-ìpíntípé èyí tí àtúnṣe tó jẹ́ ti irugbin nìkan kò lè tún ṣe. Ìpamọ́ owó apamọwọ (`data.sqlite`) jẹ́ èyí tí a lè mú jáde pátápátá láti inú gbólóhùn ìkékúrú  owó tó wà ní ààbò ni wọ́n máa ń gba padà láìṣe ìdánilójú; iye ti àwọn owó tó ṣe kedere náà ló máa ń gbà padà títí dé ibi tí wọn ò fi ní rí nǹkan kan.

Lati mu apo-owo pada lati inu irugbin:

```sh
zecd init --restore --birthday <block-height>
```

Eyi mu ki awọn data directory **disposable**: a apoti pẹlu ko si duro iwọn didun, tun kọ lati irugbin ni kọọkan bere, npadanu ohunkohun pataki. Awọn oniṣẹ jẹ lodidi fun titele adirẹsi ti won fi jade  ZECD nikan ranti adiresi nigba ti nwọn ba gba owo on-chain.

Awọn aami jẹ aimọ ti o wa. Nitori awọn ami ko ni orisun on-chain ati pe a ko le tun ṣe lati irugbin, ZECD nìkan ko ṣe atilẹyin wọn. Ipe ọna label pada kan `method-not-found` ì í ë ¤ì (`-32601`).

### Kò sí lightwalletd Ìgbára lé

ZECD gba awọn bulọọki ti o nipọn, ipo igi, ati iwoye mempool taara lati Zebra's JSON-RPC. Ko si lightwalletd lati ṣiṣẹ tabi ṣetọju  idinku idiju iṣiṣẹ fun gbigbe ara ẹni.

### Awọn ifisilẹ ti o jẹ orisun awọsanma ati awọn apoti-ipamọ

A ṣe apẹrẹ ayaworan ti ko ni ipinlẹ ZECD fun awọn agbegbe Docker ati Kubernetes:

- Full Docker Compose stack (ì ì í ë ¤ë¥1⁄4 ê° ì 'í ¬)`zebra → zecd`) tó wà nínú ibi ìpamọ́ náà.
- Ìparí ìlera ní èbúté `9233` pẹlu iṣeto awọn awotẹlẹ igbaradi (`synced` or `connected`)
- Aṣayan iforukọsilẹ JSON ti a ṣe ilana fun awọn paipu isopọpọ log
- ZIP-317 awọn owo ti o pinnu  ko si idiyele oriṣa tabi iṣeto iye owo ọwọ
- `bootstrap_from_keys` (ìpilẹ̀ mọ́): àkájọpọ̀ ìsọfúnni òfo lẹ́gbẹ̀ẹ́: `keys.toml` ó máa ń tún àpò ṣe nígbà tí a bá bẹ̀rẹ̀  fi sídìí nípa gbígbé Àṣírí kan àti bíbẹ̀rẹ̣ pẹlú PVC tó ṣofo

---

## Àwọn Àpẹẹrẹ Ìtọ́jú Ọmọdé

ZECD ṣe atilẹyin awọn awoṣe atọwọdọwọ bọtini mẹta, ti o yẹ fun igbasilẹ oriṣiriṣi ati ibeere aabo:

### 1. Unencrypted (Default  Auto-Unlock) Àkọsílẹ̀ tí kò ní àdàkọ.

Àwọn ohun tí wọ́n fi ń rántí irúgbìn nínú Bíbélì. `keys.toml` ó wà nínú ìwé ìsọfúnni nípa ẹni tó ń sọ ọjọ́ orí rẹ̀. (**age identity file) ** (`identity.txt`) Nípa àìṣeé ṣe é nídìí. `auto_unlock = true`, awọn irugbin ti wa ni decrypted sinu iranti lori ibẹrẹ ki rán jẹ unattended ati ko si `walletpassphrase` a nílò ìpè.

Ti o dara julọ fun: awọn ẹrọ ṣiṣe isanwo adaṣe, paṣipaarọ apo-owo ti n gbona, agbegbe oludasile.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Ìgbọ́kọ̀sí `identity.txt` **outside** ìtòsí data lórí mainnet  ẹnikẹni tí ó bá ka àwọn fáìlì méjèèjì ní àṣẹ láti ná owó.

### 2. A ṣe é ní ìkọ̀wé (A fi ọ̀rọ̀-ìfiwọlé dáàbò bò ó)

A fi ọrọìwòye (age scrypt) bo ohun èlò ìpamọ́ náà dípò fáìlì ìdánimọ̀. Àpótí owó bẹ̀rẹ̀ ní títẹ̀lé; `walletpassphrase "<pass>" <timeout>` ó máa ń ṣí i fún àkókò tí a fi síkàáwọ́ rẹ̀, yóò sì tún ṣe é nídìí ìgbà-ìparí  èyí tó bá ìwà Bitcoin Core's encrypted wallet mu.

Ti o dara julọ fun: awọn apamọwọ gbona nibiti a ko nilo aṣẹ inawo ti ko ni abojuto; iṣan iṣẹ oniṣẹ ibaraenisepo.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Ìwò-Nìkan (UFVK  Kò sí kókó ìnáwó)

Initialized with a Unified Full Viewing Key (UFVK) exported from another wallet. Can receive, scan, and report balances — but cannot sign transactions. Ideal for monitoring, invoicing, or audit nodes separate from the signing wallet.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Àtúnṣe àti Ìmúbọ̀sípò

Owó náà lè padà wá látinú ohun èlò tí a fi ń rántí nǹkan nìkan. Gbogbo àwọn ìsọfúnni yòókù kò ṣeé gbàgbé rárá.

 Àmì ọ̀pá àṣẹ: Oríṣiríṣi. Kí ló ń dáàbò bò? Ṣàtúnṣe?
|----------|----------|-----------------|----------|
** 24-ọ̀rọ̀ mnemonic**. Ó hàn ní ẹ́ẹ̀kan ni: `zecd init` | The funds — loss = permanent loss | **Yes — offline (paper/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml`  Ìkínní tí a fi àdàkọ kọ + ọjọ́ ìbí + ẹ̀rọ-ìpèsè. ** Bẹẹni, bí àṣírí**
| `identity.txt` | `[keys] age_identity` Ó ń túmọ̀ àwọn àdàkọ yìí. `keys.toml` (ìtóótun láti náwó) **Béèrè  yàtọ̀ sí `keys.toml`** |
▪ Bí ọmọ náà ṣe ga tó nígbà tí wọ́n bí i. `keys.toml`  Ṣe atunṣe iyara (eyikeyi giga ṣaaju akọkọ tx)  Gbigba pẹlu mnemonic 
| `data.sqlite` | `<wallet dir>/data.sqlite`  Àpamọ́ àpò-ìwé  A tún un ṣe láti ìpilẹ̀ṣẹ̀ nígbà tí a bá ń mú ọ padà bò ó mọ́. Kò sí  Ohun tó ṣeé fi ṣòfò ni o
| `blocks/` | `<wallet dir>/blocks/` | Compact block cache | No — never ship; can grow large |
| `.cookie` | `<datadir>/.cookie`  Efemeral RPC cookie. Kò sí ìmúpadàbọ̀sípò nígbà tí a bá ń ṣíṣẹ́ padà

> **Awọn data directory gbọdọ jẹ ogun-ibilẹ.** ZECD ká ọkan-apẹrẹ titiipa (`<datadir>/.lock`) jẹ́ ìsínmọ̀ràn OS  kò ní àyè àwọn onílé. Má ṣe pín ìwé atọ́ka data kà-kọ lórí ẹ̀rọ (NFS, Kubernetes) `ReadWriteMany`)  méjì ZECD ìṣẹlẹ yoo bajẹ awọn apamọwọ DB. Lo `ReadWriteOnce` awọn iwe-ipamọ ni Kubernetes.

---

## Ọ̀nà RPC Safelist

Fun awọn ifilole nibiti idasilẹ ti igbimọ yoo jẹ ajalu, ZECD ṣe atilẹyin ihamọ oju-aye RPC si ipin kan ti a yan:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Gbogbo ọ̀nà tí kò sí nínú àkọsílẹ̀ náà ló ń padà wá. `-32601` (HTTP 404)  kò lè yàtọ̀ sí ọ̀nà tí ò wà, nítorí náà àwọn àǹfàní tó ti dí ni kì í sọ nǹkankan nípa ohun tí ó dá dúró. Ẹnìkínní-tó ń gba owó nìkan le ṣe é dádúró `sendtoaddress`, `sendmany`, àti `stop` láti dín ìbúgbàù kù látọ̀dọ̀ oníbàárà tí wọ́n ti fi hàn.

---

## Àwọn ìyàtọ̀ pàtàkì láti Bitcoin Core RPC

Awọn oludasile ti o nlọ lati Bitcoin tabi awọn irinṣẹ zcashd yẹ ki o mọ nipa awọn iyatọ aiṣedede wọnyi:

 Ìwà Bitcoin Core ZECD
|----------|-------------|------|
Àdàkọ adirẹsi. `1...` / `bc1...` | `u1...` (Orchard Unified Address)  kò lè ṣe àgbéyẹ̀wò gẹ́gẹ́ bí àdírésì Bitcoin nípa àwọn oníṣe-àdàkọ ìsọfúnni tí ó ń ṣàyẹ̀wò òpópónà.
Àwọn àmì  Àpamọ́ àwọn àmì tí ó kún fún. Kò sí nídìí rẹ̀  `setlabel`, `listlabels`, àti bẹ́ẹ̀ lọ. padà wá `-32601` |
ígba owó. Orísun-olùṣàmúlò; ọjà ìsanwó ZIP-317 deterministic nìkan; `settxfee`, `fee_rate`, `subtractfeefromamount` tí a kọ̀ tìtì `-8` |
Àwọn àlàyé. Kò ní ìtìlẹyìn kankan. `sendtoaddress` gba ìpamọ́ hex; ìtàn ti ní `memo` + `memoStr` àwọn pápá.
 Ìmúdájú láti ná 1 3 (ìyípadà ti ara rẹ) / 10 (ọ̀gá-ẹlẹ́gbẹ́ kẹta)  ó ṣeé ṣe nípasẹ̀ ìtọ́jú àtúnṣe. `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` on reorg. Wọ́n padà sí ìkápá-ìpín. Ó dá wọn pada `-5` (Block not found) bí a bá tún ọ̀pá ìlà ṣe  re-baseline with parameterless call.
Ṣẹda awọn olugba ni: `sendmany`  Àṣìṣe. JSON parser ń pa àwọn àdàkọ (tí ó kẹ́yìn ló borí) kí ZECD tó rí wọn  má ṣe to àdírẹ̀sì kan náà lẹ́ẹ̀mejì
 Balance nigba akọkọ Sync. Blocks tabi igbona soke. Sin apakan iwontunwonsi  ẹnu-ọna adaṣiṣẹ lori awọn ti o ba wa ni aarin ati ki o si tunto fun pipadanu ninu rẹ, ṣugbọn ko le ṣe ohunkohun nipa fifi sori ẹrọ lati gba awá" n olumulo pada. `GET /readyz` (ó dá 503 padà títí tí a ó fi ṣe àtúnṣe sí gbogbo àwọn ìmúṣiṣẹ́pọ̀ àti àfikún tó wà ní sẹ́yìn)
| `minconf 0` in `getbalance` | 0-conf balance | Served as 1 — a shielded note is never spendable unmined |

---

## Ìbẹ̀rẹ̀ Rírìndìn

** Àwọn ohun tó pọn dandan:** Zebra tí ó ń ṣiṣẹ ní àdúgbò pẹ̀lú `rpc.listen_addr = 127.0.0.1:18234` (ìdánwò àwọ̀n).

Fi sori ẹrọ lati crates.io (0.4.3+):

```sh
cargo install zecd
```

Àbí kó o kọ̀ láti orísun:

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

**Ṣiṣẹpọ nipasẹ curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Ṣiṣẹpọ nipasẹ Python (lo ile-ikawe Bitcoin RPC):**

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

**Tún fi sípò láti inú irúgbìn:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Àwọn Èbúté Àkọ́ṣe (Default Ports)

Àjọṣepọ̀: ZECD RPC Zebra RPC (ìdásílẹ̀) Ìlera.
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
Àwòdì ìsọfúnni 18232 18234 9233

---

## ZECD lòdì sí zcashd lòdì si Zaino.

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
 ipa: ìsọ̀rí + àpò-ìpamọ́. olùtọjú (yí lightwalletd padà) Olùpèsè àpókì nìkan;
Èdè: C++ Rust. Ìdàrúdàpọ̀ ìsọfúnni:
| Status | Deprecated | Active | Active (v0.5.0-rc3, Jul 2026) |
| Default pool | Transparent | N/A | Orchard (shielded) |
| RPC dialect | zcashd-specific | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
 Wá gbogbo ìsopọ̀. (self) ZEBRA tàbí zcashd, Zebra.
 Àtúnṣe tí kò ní ìpínlẹ̀. Rárá o N/A Bẹẹni (ohun tó wà fún ìkórè nìkan)
Àwọn ìwé ìránnilétí tí a fi ààbò bo. Bẹ́ẹ̀ ni (`z_sendmany`) N/A: Bẹẹni (Ojú-ìwòye Bitcoin RPC)
Àwòrán tí a máa ń wò lásán (UFVK) Bẹẹni. Bẹ́ẹ̀ ni. Bẹ̀ẹ̀ ní.
Àwọsánmà-àbínibí Kò sí Díẹ̀ Sí Ẹsẹ kan ni o wà nínú rẹ, ẹyọ méjì.
 Install. Build/binary. Built. Ṣẹda ìmúṣẹ rẹ̀ ní pẹrẹu, kí o sì ṣe àtúnṣe síi. `cargo install zecd` |

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Zebra Ìkànnì Pípéye](Zebra_Full_Node.md)  gbogbo ìkànnì ZECD so pọ̀ mọ́:
- [Àkọsílẹ̀ Zaino Indexer](Zaino.md)  àtúnṣe sí ìlànà ìfiwéra (yípò lightwalletd)
- [Ìkànnì Zakura](Zakura_Node.md)  ìmúṣẹ àkànṣe mìíràn (fork of Zebra)
- [Àwọn Kókó Ìwòran](Viewing_Keys.md)  bí ZECD ṣe ń ṣàyẹ̀wò ẹ̀ka-ìpínlẹ̀ nípa lílo àwọn kókó ìwojú àkọọ́lé.
- [Àwọn àpamọ́ owó](/using-zcash/wallets)  Àkópọ̀ ètò ìṣètò owó pópó

## Àwọn Owó-ìṣúnná owó

- [ZECD GitHub (zecrocks/zecd) Àwọn ojúewé wọ̀nyí jápọ̀ mọ́:](https://github.com/zecrocks/zecd)
- [Ìwé Ìṣiṣẹ́ ZECD Runbook](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [àwọn òkúta tí ó wà nínú àpáta](https://zec.rocks)
- [librustzcash  core Zcash ìkójọ ìwé àdàkọ-ìmọ̀ọ́rọ̀ (cryptography library)](https://github.com/zcash/librustzcash)
- [ZIP-317: Ètò Owó-ìṣírò Ìpínlẹ̀ Tó Wà Níwọ̀ntúnwọ̀nsí.](https://zips.z.cash/zip-0317)
- [ZIP-302: Àwọn Ìpínlẹ̀ Ààbò](https://zips.z.cash/zip-0302)
- [Zodl wallet (tí ó bá líbrustzcash mu)](https://github.com/zodl-inc/zodl-ios)
