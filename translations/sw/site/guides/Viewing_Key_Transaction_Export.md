<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuhamisha Historia ya Miamala [Transaction History] kutoka kwenye Viewing Key

Uhamishaji mwingi wa pochi [wallet] una taarifa chache. Uhamishaji wa kodi wa ZODL, kwa mfano, hukupa tarehe, kiasi na ada [fees] za mwaka wa kalenda uliopita, lakini hakuna vitambulisho vya miamala, jumbe [memos] wala anwani [addresses]. Hiyo haitoshi kwa utunzaji wa hesabu, kuthibitisha uhamisho wa pochi, au kubaini kilichotokea kwa malipo [payment].

Huhitaji maneno yako ya kurejesha pochi [seed phrase] ili kupata picha kamili. Ufunguo wa kutazama kamili uliounganishwa (UFVK, unaoanza `uview1`) unaweza kuona kila muamala unaoingia na unaotoka katika akaunti, na vifaa [tools] viwili vinaweza kugeuza hilo kuwa faili unalohifadhi: seva ya GraphQL ya Zkool na zingo-cli. Mwongozo huu unakusanya mbinu kutoka kwenye [mazungumzo haya ya jukwaa](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) na kuzisasisha kwa matoleo ya sasa.

Ilijaribiwa Septemba 2026 kwa Zkool 6.30.0 na zingo-cli kutoka zingolib 6.0.0.

## Kabla hujaanza

Unahitaji vitu viwili:

1. **UFVK** ya akaunti. [Viewing Keys](/zcash-tech/viewing-keys) inaeleza inachofichua na jinsi ya kuihamisha.
2. **Urefu wa kuanzia**, block [block] ambayo uchanganuzi utaanza kutoka. Tumia urefu wa kabla ya muamala wako wa kwanza. Ukiuweka juu sana, historia ya zamani haitapatikana kimya kimya. Ukiuweka chini sana, uchanganuzi utachukua muda mrefu zaidi. Uanzishaji wa Sapling (419200) ni salama kila wakati lakini unaweza kuchukua saa kadhaa kuchanganua.

## Uweke faraghani

Ufunguo wa kutazama hauwezi kutumia fedha, lakini unaonyesha historia yako yote kwa yeyote anayeushikilia.

- Usiubandike kwenye tovuti au kichunguzi cha block. Uuingize kwenye programu unayoendesha mwenyewe.
- Seva unayosawazisha nayo huona anwani yako ya IP na miamala unayopakua kikamilifu. Vifaa vyote viwili hapa chini hupata kila muamala wako kwa kitambulisho ili kusoma jumbe na ada, na [ZIP 307](https://zips.z.cash/zip-0307) inabainisha kuwa hii huambia seva miamala ipi ni yako. Kusawazisha kutoka kwenye node yako mwenyewe ya Zebra kwa kutumia Zaino au lightwalletd huepusha hilo. [Zingolib na Mafunzo ya Zaino](/guides/zingolib-and-zaino-tutorial) yanaelekeza hatua kwa hatua jinsi ya kusanidi.
- zingo-cli 6 hutuma malipo kupitia mixnet ya Nym, lakini usawazishaji wake bado huunganisha kwenye seva moja kwa moja, kwa hiyo hoja iliyo hapo juu inaihusu pia.
- Vipe vifaa hivi ufunguo wa kutazama, kamwe si seed. Seva ya GraphQL ya Zkool haina kuingia kwa chaguomsingi, na API yake itarudisha seed ya akaunti yoyote iliyoundwa kutoka kwa moja, na inaweza kutuma fedha.
- Weka seva kwenye mashine yako mwenyewe. Amri ya Docker hapa chini husikiliza tu kwenye `127.0.0.1`.
- Vifaa vyote viwili huhifadhi ufunguo na historia yako bila usimbaji fiche [encryption]. Futa data ya kazi ukimaliza na uhifadhi uhamishaji mahali paliposimbwa fiche.

## Chaguo la 1: GraphQL ya Zkool

`zkool_graphql` ni injini ya pochi ya Zkool kama seva huru. Ni programu tofauti na programu ya Zkool. Njia rahisi zaidi ya kuiendesha ni taswira rasmi ya Docker (amd64 na arm64). Pia kuna binari ya x86-64 ya Linux kwenye [ukurasa wa matoleo wa Zkool](https://github.com/hhanh00/zkool2/releases); inahitaji glibc 2.38 au toleo jipya zaidi, kwa hivyo Ubuntu 24.04 hufanya kazi na Debian 12 haifanyi.

### 1. Anzisha seva

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Husawazisha kutoka `https://zec.rocks` isipokuwa uongeze `--lwd-url` na seva yako mwenyewe. Inapoanzishwa kwa mara ya kwanza inapakua vigezo vya Sapling (takriban MB 50). Hilo likishindikana, `docker start zkool-export` hujaribu tena.

Fungua `http://127.0.0.1:8000/graphiql` katika kivinjari. Unaweza kubandika kila hatua inayofuata humo na kuiendesha.

### 2. Ingiza ufunguo

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

Hurejesha kitambulisho cha akaunti mpya, ambacho ni 1 kwenye seva mpya.

- Weka `birth` kila wakati. Bila hiyo Zkool huanza kutoka block ya sasa na haipati chochote.
- `useInternal: true` hufanya Zkool ichunguze pia anwani za mabadiliko ya uwazi [transparent]. Iwashe kwa funguo kutoka ZODL, mpangilio uleule unaotumiwa na [Kurejesha Fedha](/using-zcash/recovering-funds) kwa seed za ZODL.

### 3. Sawazisha

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Hii huendelea hadi usawazishaji umalizike. Usiongeze `fast: true`. Huruka kupakua miamala kamili, ambako jumbe, ada na matokeo hutoka.

Nambari inayorejesha ni urefu uliokuwa inalenga, si uthibitisho kwamba iliufikia. Hitilafu ya mtandao inaweza kumaliza usawazishaji mapema bila kuripoti chochote, kwa hivyo angalia:

```graphql
{ currentHeight accounts { id name height } }
```

Ikiwa `height` ya akaunti iko nyuma ya `currentHeight`, endesha usawazishaji tena. Huendelea kutoka ilipokomea.

### 4. Hamisha

Hifadhi hii kama `history.graphql`:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

Acha hoja ya `height` isipokuwa unaimaanisha. Inaweka kiwango cha chini, kwa hivyo `height: 3000000` ya mfano wa jukwaa huondoa kila kitu kabla ya block hiyo.

Ipate kama JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Kila muamala unapaswa kuonyesha ada zaidi ya 0, isipokuwa zawadi za uchimbaji [mining]. Ikiwa mmoja unaonyesha `"fee": "0"` na hakuna ujumbe, maelezo yake hayakupakuliwa. Zkool hupata miamala kamili mmoja baada ya mwingine baada ya uchanganuzi, na hitilafu moja husimamisha iliyosalia kimya kimya. Kuorodhesha yoyote iliyoathirika:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Ikiwa chochote kinaonekana, sawazisha tena dakika chache baadaye na uhamishe tena.

Kisha ilainishe kuwa CSV, mstari mmoja kwa kila muamala:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Kusoma matokeo

| Sehemu | Maana |
|---|---|
| `value` | Mabadiliko halisi katika akaunti kwa ZEC, ada ikijumuishwa. Hasi kwa utumaji. |
| `fee` | Ada katika ZEC. Kwa malipo uliyopokea, mtumaji aliilipa na haiko katika `value`. |
| `time` | Muda wa block katika UTC, bila alama ya eneo la saa |
| `notes` | Kile ambacho akaunti ilipokea katika muamala huu, ikijumuisha mabadiliko. Jumbe zilizotumwa kwako ziko hapa. Maingizo ya uwazi hayana anwani. |
| `spends` | Madokezo [notes] ya akaunti yenyewe ambayo muamala huu ulitumia |
| `outputs` | Kile ambacho muamala ulituma nje: kila tokeo la uwazi, pamoja na malipo ya faragha [shielded] kwa anwani nyingine pamoja na jumbe zake |
| `pool` | 0 uwazi, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 nje (malipo yanayoingia), 1 ndani (mabadiliko) |

Programu ya Zkool pia ina Hamisha Miamala, Jumbe na Madokezo katika menyu ya akaunti, lakini hizo ni uhamishaji wa jedwali ghafi: kiasi katika zatoshi, mihuri ya muda ya Unix, na jumbe katika faili tofauti.

## Chaguo la 2: zingo-cli

zingo-cli ni pochi ya mstari wa amri ya Zingo. Hakuna vipakuliwa vilivyojengwa tayari, kwa hivyo unaijenga kwa Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Unahitaji `nym-proxy` hata kwa kusawazisha pekee. zingo-cli 6 haitaunganishwa na seva yoyote bila hiyo.

Uendeshaji wa kwanza huunda pochi ya kutazama pekee, huisawazisha na kuchapisha historia:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` lazima iwe njia kamili.
- `--viewkey` na `--birthday` hutumika tu pochi inapoundwa. Viachie baada ya hapo.
- zingo-cli huanza nje ya mtandao kwa chaguomsingi. `--server` huchagua seva na pia huhesabika kama idhini yako ya kwenda mtandaoni.
- Ufunguo huishia katika historia ya shell yako, kwa hivyo ifute baadaye.

Uendeshaji wa baadaye:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` husoma kilichosawazishwa tayari bila kugusa mtandao.

- `transactions` hutoa ingizo moja kwa kila muamala: txid, muda (UTC), urefu, aina (`received`, `sent`, `shield` au `send-to-self`), thamani, ada na madokezo yanayohusika.
- `value_transfers` hutoa ingizo moja kwa kila malipo, kwa hivyo utumaji kwa watu wawili ni maingizo mawili, kila moja likiwa na anwani ya mpokeaji na jumbe.
- `messages` huorodhesha jumbe kama JSON.

Mambo machache ya kujua kuhusu matokeo:

- `transactions` na `value_transfers` huchapisha maandishi wazi yanayofanana kidogo na JSON lakini si JSON.
- Kiasi kiko katika zatoshi (100,000,000 kwa 1 ZEC) na huwa chanya kila wakati. `kind` hukuambia mwelekeo. Kwa utumaji, `value` ni kilichoenda kwa watu wengine, bila ada.
- Ada huonekana kama “haipatikani” wakati muamala unatumia fedha za uwazi ambazo hazikuwa zako. Jumbe za maandishi pekee huonyeshwa.
- Usawazishaji ukishindikana, hitilafu huenda kwenye terminal, si faili, na zingo-cli bado hutoka kawaida. Angalia terminal kabla ya kuamini `transactions.txt`.

[zingoHelper](https://github.com/dismad/zingoHelper) ya dismad ina hati ya `exportToJSON.sh` inayobadilisha `transactions` kuwa JSON. Iliandikwa kabla ya zingo-cli 6, imesanidiwa kwa testnet, huweka baadhi ya maingizo yanayotoka ya Sapling na ya uwazi kama vijaza nafasi, na inahitaji vifaa vya GNU, kwa hivyo haitaendeshwa kwenye macOS ya kawaida. Chukulia matokeo yake kama mwanzo na uangalie jumla.

## Kile ambacho ufunguo wa kutazama hauwezi kukuambia

- **Bei.** Hakuna kifaa kinachorekodi bei ya ZEC wakati wa kila muamala. Ongeza thamani za fiat mwenyewe.
- **Historia ya uwazi, ikiwa ufunguo hauijumuishi.** Sehemu ya uwazi ya UFVK ni ya hiari chini ya [ZIP 316](https://zips.z.cash/zip-0316). Kwa zingo-cli, `$Z --offline parse_viewkey uview1...` huonyesha mabwawa [pools] ambayo ufunguo unashughulikia.
- **Nani alikulipa.** Malipo ya faragha hayabebi anwani ya mtumaji. Isipokuwa mtumaji aliweka moja katika ujumbe, haipo popote.
- **Baadhi ya maelezo ya utumaji.** Anwani lengwa, kiasi na ujumbe kwa utumaji wa faragha hurejeshwa kwa kufumbua kwa kutumia ufunguo. Pochi inaweza kujenga muamala ili hilo lisiwezekane, ingawa nyingi hazifanyi hivyo.

## Vifaa vingine

| Kifaa | Unachopata |
|---|---|
| ZODL | CSV ya kodi yenye tarehe, kiasi, ada na lebo. Mwaka wa kalenda uliopita pekee, huruka miamala ya kuweka faraghani, hakuna txid, ujumbe wala anwani. |
| Programu ya Zkool | Uhamishaji wa jedwali ghafi kutoka kwenye menyu ya akaunti |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Huleta UFVK kwa `importvk`. `listreceived` kupitia RPC hurejesha madokezo yaliyopokelewa yenye txid na ujumbe, lakini hakuna utumaji wala ada. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` ina maelezo mengi lakini imewekwa alama ya majaribio, na Zallet huingiza tu funguo za kutazama za Sapling, si UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Huleta UFVK kwa `wallet init-fvk`, kisha `wallet list-tx`. Hali yake ya CSV haina txid wala anwani, na mradi unasema usiitumie katika uzalishaji. |

## Zinazohusiana

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Kurejesha Fedha](/using-zcash/recovering-funds)
- [Zingolib na Mafunzo ya Zaino](/guides/zingolib-and-zaino-tutorial)
- [Jukwaa: Kuhamisha historia ya miamala kwenda JSON/CSV kutoka UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Jukwaa: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
