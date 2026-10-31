<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# zecd — Seva ya Pochi Inayoanza na Faragha

zecd ni seva ya pochi inayoanza na faragha kwa ajili ya Zcash, iliyojengwa juu ya [librustzcash](https://github.com/zcash/librustzcash) na kufichuliwa kupitia lahaja ya JSON-RPC ya Bitcoin Core. Huwapa wasanidi programu [developers] na waunganishaji wa malipo API iliyozoeleka, inayooana na Bitcoin, kwa ajili ya kuingiliana na Zcash — huku ikifanya Orchard (bwawa la faragha zaidi) kuwa chaguo-msingi. Ikiendelezwa na [zec.rocks](https://zec.rocks), zecd imeundwa kuchukua nafasi ya utendaji wa pochi wa `zcashd` katika utekelezaji wa kisasa wa asili ya wingu.

**Toleo la sasa:** 0.5.0-rc3 (Julai 13, 2026) — lenye usaidizi wa Ironwood (NU6.3). Sakinisha kupitia `cargo install zecd` au tumia picha rasmi ya Docker.

---

## Kwa Ufupi

- zecd ni **daemon ya pochi (seva)** — si full node. Hushughulikia funguo, uchanganuzi, uthibitishaji, na RPC bila kuwasiliana kwa itifaki ya P2P ya Zcash.
- Huzungumza **lahaja ya JSON-RPC ya Bitcoin Core**: majina sawa ya mbinu, miundo ya sehemu, uthibitishaji, na misimbo ya hitilafu — wateja wengi wa Bitcoin RPC hufanya kazi na Zcash moja kwa moja.
- **Anwani za Orchard (za faragha) ni chaguo-msingi**; usaidizi wa uwazi (t-address) na Sapling huhitaji kuchaguliwa wazi kwa kila pochi.
- Huunganishwa na **full node ya [Zebra](Zebra_Full_Node.md) inayojihudumia** kupitia JSON-RPC ya ndani — hakuna lightwalletd inayohitajika.
- **Isiyo na hali kwa muundo**: pochi nzima inaweza kurejeshwa kwa kutumia maneno ya kurejesha pochi [seed phrase] pekee, hivyo kufanya saraka ya data iweze kutupwa.
- **Si mbadala wa moja kwa moja wa zcashd**: hutekeleza sehemu ndogo tu ya mbinu za RPC za Zcash, zikiwa na tofauti za kimakusudi za muundo kwa faragha na usalama.
- Ada [fees] hufuata **ZIP-317** (ukokotoaji bainifu wa ada); ada zilizobainishwa na mtumiaji hukataliwa.
- Husaidia **jumbe za faragha [shielded memos] (ZIP-302)** kupitia uso wa RPC wa Bitcoin uliozoeleka.

---

## zecd Hutatua Tatizo Gani?

`zcashd` ilikuwa node na pochi asili ya Zcash iliyounganishwa — iligawanywa kutoka kwenye msingi wa msimbo wa C++ wa Bitcoin mwaka 2016. Baada ya muda, hili liliunda changamoto: msimbo ni mgumu kutunza, pochi imefungamana kwa karibu na node, na anwani za uwazi huwasilishwa kama chaguo za daraja la kwanza pamoja na zile za faragha.

zecd hutenganisha wajibu wa pochi na makubaliano [consensus]. Ni **safu mahsusi ya pochi** inayokaa kati ya programu na full node ya Zebra, ikitoa:

- Utekelezaji safi na wa kisasa wa Rust uliojengwa juu ya librustzcash (maktaba hiyo hiyo inayotumia Zodl na Zingo)
- Muundo wa faragha-kwa-chaguo-msingi (anwani za Orchard isipokuwa zisanidiwe vinginevyo)
- Kiolesura cha RPC kinachooana na Bitcoin ambacho huondoa hitaji la kujifunza vifaa maalum vya Zcash
- Usanifu usio na hali, unaoweza kurejeshwa kwa maneno ya kurejesha pochi, unaofaa kwa utekelezaji wa kontena na wingu

---

## Usanifu

zecd hufanya kazi katika muundo wa ngazi tatu:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd huwasiliana na Zebra **kupitia JSON-RPC ya ndani pekee** — hakuna mtandao wa peer-to-peer, hakuna waorodheshaji wa wahusika wengine, wala lightwalletd. Muunganisho wa Zebra umewekewa kikomo cha ndani kimakusudi: zecd itakataa kutuma stakabadhi kwa mwenyeji anayeweza kufikiwa kimataifa isipokuwa isanidiwe wazi kwa handaki salama nje ya mtandao (k.m. WireGuard au SSH).

---

## Vipengele Vikuu

### Faragha Kwanza, Orchard kwa Chaguo-Msingi

zecd hutumia Anwani Zilizounganishwa za Orchard kama aina ya anwani chaguo-msingi. Mabwawa ya Sapling na ya uwazi (t-address) huhitaji usanidi wa wazi kwa kila pochi. Muundo huu hupunguza hatari ya kutuma kwa uwazi kimakosa — tatizo la kawaida la faragha katika vifaa vya zamani vya Zcash.

Sera ya faragha inaweza kusanidiwa kwa kila mwito au kimataifa katika `[spend] privacy_policy`:

| Sera | Tabia |
|--------|----------|
| `AllowRevealedRecipients` (chaguo-msingi) | Huruhusu kutuma kwa wapokeaji wa uwazi; hufichua kiasi na mpokeaji on-chain |
| `AllowRevealedAmounts` | Huruhusu utumaji kati ya mabwawa (Sapling↔Orchard) lakini hukataa wapokeaji wa uwazi |
| `FullPrivacy` | Utumaji wa faragha kamili pekee ndani ya bwawa moja; hukataa wapokeaji wa uwazi na utumaji kati ya mabwawa |
| `AllowFullyTransparent` | Pia huruhusu utumaji wa t→t unaofadhiliwa kutoka UTXO za uwazi |

### Uoanifu wa RPC wa Bitcoin Core

zecd hutekeleza lahaja ya JSON-RPC ya Bitcoin Core kwa ulinganifu katika:

- Majina ya mbinu (k.m. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Majina na aina za sehemu katika majibu
- Muundo wa bahasha wa JSON-RPC 1.0
- Uthibitishaji wa msingi, maingizo ya `rpcauth`, na uthibitishaji wa faili ya cookie
- Msimbo wa hitilafu na ulinganishaji wa hali ya HTTP (HTTP 500 yenye mwili wa hitilafu, semantiki za 401)

Hii inamaanisha maktaba nyingi zilizopo za malipo ya Bitcoin, miunganisho ya masoko ya kubadilishana sarafu [exchange], na vifaa vya ufuatiliaji vinaweza kuingiliana na Zcash kupitia zecd bila mabadiliko mengi ya msimbo au bila mabadiliko yoyote.

Kifurushi cha majaribio ya ulinganifu (ukaguzi 140+) huendeshwa kwenye kila PR dhidi ya daemon hai ya regtest na pia kilithibitishwa dhidi ya testnet ya umma.

### Jumbe za Faragha (ZIP-302)

zecd hufichua kipengele cha ujumbe wa faragha cha Zcash kupitia uso wa RPC wa Bitcoin uliozoeleka — jambo lisilopatikana katika vifaa vya kawaida vya Bitcoin:

- `sendtoaddress` hukubali ujumbe wa hiari wa hex kama kigezo cha ziada mwishoni (hadi baiti 512; hukataliwa kwa wapokeaji wa uwazi)
- Maingizo ya historia ya miamala [transactions] kutoka `listtransactions` na `gettransaction` yanajumuisha sehemu za `memo` (hex) na `memoStr` (maandishi yaliyosimbuliwa) wakati towe linabeba moja
- Utumaji wa kiasi sifuri kwa mpokeaji wa faragha unasaidiwa kwa matumizi ya ujumbe pekee (muundo wa “memo-only-send” wa `z_sendmany`)

Hii hufanya zecd ifae kwa programu zinazohitaji utumaji ujumbe wa faragha, on-chain pamoja na malipo [payments].

### Isiyo na Hali kwa Muundo

zecd haihifadhi **hali yoyote ya nje ya mnyororo ambayo urejeshaji wa maneno ya kurejesha pochi pekee haungeweza kuijenga upya**. Hifadhidata ya pochi (`data.sqlite`) hutokana kabisa na maneno ya kurejesha pochi — fedha za faragha hurejeshwa bila masharti; fedha za uwazi hurejeshwa hadi kikomo cha pengo kilichosanidiwa.

Ili kurejesha pochi kutoka kwa maneno ya kurejesha pochi:

```sh
zecd init --restore --birthday <block-height>
```

Hii hufanya saraka ya data iwe **ya kutupwa**: kontena lisilo na juzuu endelevu, likijengwa upya kutoka kwa maneno ya kurejesha pochi kila linapoanzishwa, halipotezi kitu chochote muhimu. Waendeshaji wana wajibu wa kufuatilia anwani wanazotoa — zecd hukumbuka anwani tu baada ya kupokea fedha on-chain.

Lebo hazipo kimakusudi. Kwa kuwa lebo hazina chanzo cha on-chain na haziwezi kujengwa upya kutoka kwa maneno ya kurejesha pochi, zecd haizisaidii kabisa. Kuita mbinu za lebo hurudisha hitilafu ya `method-not-found` (`-32601`).

### Hakuna Utegemezi wa lightwalletd

zecd hutokana block zilizobanwa, hali ya mti, na mwonekano wa mempool moja kwa moja kutoka JSON-RPC ya Zebra. Hakuna lightwalletd ya kuendesha au kutunza — hivyo kupunguza utata wa uendeshaji kwa utekelezaji unaojihudumia.

### Utekelezaji wa Asili ya Wingu na Kontena

Usanifu usio na hali wa zecd umeundwa kwa mazingira ya Docker na Kubernetes:

- Rundo kamili la Compose la Docker (`zebra → zecd`) linapatikana kwenye hazina
- Endpoint ya hali kwenye port `9233` yenye probes za utayari zinazoweza kusanidiwa (`synced` au `connected`)
- Chaguo la uwekaji kumbukumbu wa JSON uliopangiliwa kwa mifumo ya ujumuishaji wa kumbukumbu
- Ada bainifu za ZIP-317 — hakuna oracle ya ada wala usanidi wa ada wa mkono
- `bootstrap_from_keys` (huwashwa kwa chaguo-msingi): saraka tupu ya data kando ya `keys.toml` hujenga pochi upya kiotomatiki inapowashwa — tekeleza kwa kuunganisha Secret moja na kuanza kwa PVC tupu

---

## Miundo ya Uhifadhi

zecd huunga mkono miundo mitatu ya uhifadhi wa funguo, inayofaa kwa mahitaji tofauti ya utekelezaji na usalama:

### 1. Isiyosimbwa (Chaguo-Msingi — Kufungua Kiotomatiki)

Mnemoniki ya maneno ya kurejesha pochi katika `keys.toml` hufungwa kwa **faili ya utambulisho wa age** (`identity.txt`). Kwa `auto_unlock = true` chaguo-msingi, maneno ya kurejesha pochi husimbuliwa katika kumbukumbu wakati wa kuanza ili utumaji usihitaji uangalizi na hakuna mwito wa `walletpassphrase` unaohitajika.

Inafaa zaidi kwa: vichakataji vya malipo vya kiotomatiki, pochi moto za masoko ya kubadilishana sarafu, mazingira ya wasanidi programu.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Hifadhi `identity.txt` **nje** ya saraka ya data kwenye mainnet — mtu yeyote anayesoma faili zote mbili ana mamlaka ya kutumia fedha.

### 2. Iliyosimbwa (Inayolindwa kwa Kishazi cha Siri)

Mnemoniki hufungwa kwa kishazi cha siri (age scrypt) badala ya faili ya utambulisho. Pochi huanza ikiwa imefungwa; `walletpassphrase "<pass>" <timeout>` huifungua kwa muda uliotolewa na hujifunga tena kiotomatiki muda unapoisha — ikilingana na tabia ya pochi iliyosimbwa ya Bitcoin Core.

Inafaa zaidi kwa: pochi moto ambapo mamlaka ya matumizi yasiyo na uangalizi haihitajiki; mtiririko wa kazi wa waendeshaji unaoingiliana.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Kutazama Pekee (UFVK — Hakuna Ufunguo wa Matumizi)

Huanzishwa kwa kutumia Full Viewing Key Iliyounganishwa (UFVK) iliyohamishwa kutoka pochi nyingine. Inaweza kupokea, kuchanganua, na kuripoti salio — lakini haiwezi kutia sahihi miamala. Ni bora kwa ufuatiliaji, utoaji wa ankara, au node za ukaguzi zilizo tofauti na pochi ya kutia sahihi.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Hifadhi Nakala na Urejeshaji

Fedha zinaweza kurejeshwa kutoka **kwa mnemoniki pekee**. Kila kitu kingine ni kache.

| Kifaa | Mahali | Kinacholindwa | Kuhifadhi nakala? |
|----------|----------|-----------------|----------|
| **Mnemoniki ya maneno 24** | Huonyeshwa mara moja katika `zecd init` | Fedha — upotevu = upotevu wa kudumu | **Ndiyo — nje ya mtandao (karatasi/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Maneno ya kurejesha pochi yaliyosimbwa + birthday + mtandao | **Ndiyo — kama Secret** |
| `identity.txt` | `[keys] age_identity` | Husimbua `keys.toml` (mamlaka ya matumizi) | **Ndiyo — tofauti na `keys.toml`** |
| Urefu wa birthday | Ndani ya `keys.toml` | Hufanya urejeshaji uwe wa haraka (urefu wowote kabla ya muamala wa kwanza) | Rekodi pamoja na mnemoniki |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Kache ya pochi — hujengwa upya kutoka kwa maneno ya kurejesha pochi wakati wa kurejesha | Hapana — ya kutupwa |
| `blocks/` | `<wallet dir>/blocks/` | Kache ya block zilizobanwa | Hapana — usiwahi kusafirisha; inaweza kukua sana |
| `.cookie` | `<datadir>/.cookie` | Cookie ya RPC ya muda mfupi | Hapana — hutengenezwa upya wakati wa kuanza |

> **Saraka ya data lazima iwe ya ndani ya mwenyeji.** Kufuli ya mfano-mmoja ya zecd (`<datadir>/.lock`) ni kufuli ya ushauri ya OS — haihusishi wenyeji wengi. Kamwe usishiriki saraka ya data kwa usomaji-uandishi kati ya mashine (NFS, Kubernetes `ReadWriteMany`) — mifano miwili ya zecd ingeiharibu DB ya pochi. Tumia juzuu za `ReadWriteOnce` katika Kubernetes.

---

## Orodha Salama ya Mbinu za RPC

Kwa utekelezaji ambapo kuvuja kwa stakabadhi kungekuwa janga, zecd huunga mkono kuweka kikomo cha uso wa RPC kwa seti teule ya mbinu:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Mbinu yoyote isiyo kwenye orodha hurudisha `-32601` (HTTP 404) — isiyotofautishwa na mbinu isiyokuwepo, hivyo seva iliyofungwa haitoi chochote kuhusu ilichozima. Mfumo wa utoaji ankara wa kupokea pekee unaweza kuzima `sendtoaddress`, `sendmany`, na `stop` ili kupunguza athari ya mteja aliyevamiwa.

---

## Tofauti Kuu na RPC ya Bitcoin Core

Wasanidi programu wanaohama kutoka Bitcoin au vifaa vya zcashd wanapaswa kufahamu tofauti hizi za kimakusudi:

| Tabia | Bitcoin Core | zecd |
|----------|-------------|------|
| Muundo wa anwani | `1...` / `bc1...` | `u1...` (Anwani Iliyounganishwa ya Orchard) — haiwezi kuchanganuliwa kama anwani ya Bitcoin na wateja wanaochanganua mifuatano |
| Lebo | Hifadhi kamili ya lebo | Haijatekelezwa — `setlabel`, `listlabels`, n.k. hurudisha `-32601` |
| Ada | Huamuliwa na mtumiaji; soko la ada | ZIP-317 bainifu pekee; `settxfee`, `fee_rate`, `subtractfeefromamount` hukataliwa kwa `-8` |
| Jumbe | Hazisaidiwi | `sendtoaddress` hukubali ujumbe wa hex; historia ina sehemu za `memo` + `memoStr` |
| Thibitisho za kutumia | 1 | 3 (chenji yako) / 10 (wahusika wengine) — zinaweza kusanidiwa kupitia `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` wakati wa reorg | Hurudi kwenye fork | Hurudisha `-5` (Block haikupatikana) ikiwa kishale kimeondolewa na reorg — anzisha upya kwa mwito usio na vigezo |
| Wapokeaji wanaojirudia katika `sendmany` | Hitilafu | Kichanganuzi cha JSON huunganisha wanaojirudia (wa mwisho hushinda) kabla zecd haijawaona — usiorodheshe anwani sawa mara mbili |
| Salio wakati wa usawazishaji wa awali | Huzuia au hupasha joto | Hutoa salio la sehemu — funga otomatiki kwenye `GET /readyz` (hurudisha 503 hadi isawazishwe kikamilifu na foleni ya maboresho imalizike) |
| `minconf 0` katika `getbalance` | Salio la 0-conf | Hutolewa kama 1 — dokezo la faragha halitumiki kamwe bila kuchimbwa |

---

## Mwanzo wa Haraka

**Masharti ya awali:** Zebra inaendeshwa ndani ya nchi pamoja na `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Sakinisha kutoka crates.io (0.4.3+):

```sh
cargo install zecd
```

Au jenga kutoka chanzo:

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

**Wasiliana kupitia curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Wasiliana kupitia Python (kwa kutumia maktaba ya Bitcoin RPC):**

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

**Rejesha kutoka kwa maneno ya kurejesha pochi:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Port za Chaguo-Msingi

| Mtandao | RPC ya zecd | RPC ya Zebra (backend) | Hali |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd dhidi ya zcashd dhidi ya Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Jukumu | Full node + pochi | Kiorodheshaji (huchukua nafasi ya lightwalletd) | Seva ya pochi pekee |
| Lugha | C++ | Rust | Rust |
| Hali | Imepitwa na wakati | Inatumika | Inatumika (v0.5.0-rc3, Jul 2026) |
| Bwawa chaguo-msingi | Uwazi | Haitumiki | Orchard (ya faragha) |
| Lahaja ya RPC | Maalum ya zcashd | gRPC (lightwalletd) | JSON-RPC ya Bitcoin Core |
| Huhitaji full node | Ndiyo (yenyewe) | Zebra au zcashd | Zebra |
| Urejeshaji usio na hali | Hapana | Haitumiki | Ndiyo (maneno ya kurejesha pochi pekee) |
| Jumbe za faragha | Ndiyo (`z_sendmany`) | Haitumiki | Ndiyo (uso wa Bitcoin RPC) |
| Kutazama pekee (UFVK) | Ndiyo | Ndiyo | Ndiyo |
| Asili ya wingu | Hapana | Kwa sehemu | Ndiyo |
| Usakinishaji | Jenga/binary | Jenga | `cargo install zecd` |

---

## Kurasa Husika

- [Zebra Full Node](Zebra_Full_Node.md) — full node ambayo zecd huunganishwa nayo
- [Zaino Kiorodheshaji](Zaino.md) — mbinu mbadala ya kiorodheshaji (huchukua nafasi ya lightwalletd)
- [Zakura Node](Zakura_Node.md) — utekelezaji mwingine wa full node (fork ya Zebra)
- [Funguo za kutazama](Viewing_Keys.md) — jinsi zecd huchanganua mnyororo kwa kutumia funguo za kutazama za akaunti
- [Pochi](/using-zcash/wallets) — muhtasari wa mfumo wa pochi

## Rasilimali

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [zecd Kitabu cha Uendeshaji](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — maktaba kuu ya kriptografia ya Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Utaratibu wa Ada ya Uhamisho wa Uwiano](https://zips.z.cash/zip-0317)
- [ZIP-302: Jumbe za Faragha](https://zips.z.cash/zip-0302)
- [Zodl pochi (inayooana na librustzcash)](https://github.com/zodl-inc/zodl-ios)
