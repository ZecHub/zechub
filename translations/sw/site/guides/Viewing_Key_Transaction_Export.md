<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuhamisha Historia ya Miamala [Transaction History] kutoka kwenye Viewing Key

Uhamishaji mwingi wa pochi [wallet] una taarifa chache. Uhamishaji wa kodi wa ZODL, kwa mfano, hukupa tarehe, kiasi na ada [fees] za mwaka wa kalenda uliopita, lakini hakuna vitambulisho vya miamala, jumbe [memos] wala anwani [addresses]. Hiyo haitoshi kwa utunzaji wa hesabu, kuthibitisha uhamisho wa pochi, au kubaini kilichotokea kwa malipo [payment].

Huhitaji maneno yako ya kurejesha pochi [seed phrase] ili kupata picha kamili. Ufunguo wa kutazama kamili uliounganishwa (UFVK, unaoanza `uview1`) unaweza kuona kila muamala unaoingia na unaotoka katika akaunti, na vifaa [tools] viwili vinaweza kugeuza hilo kuwa faili unalohifadhi: seva ya GraphQL ya Zkool na zingo-cli. Mwongozo huu unakusanya mbinu kutoka kwenye [mazungumzo haya ya jukwaa](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) na kuzisasisha kwa matoleo ya sasa.

Ilijaribiwa Septemba 2026 kwa Zkool 6.30.0 na zingo-cli kutoka zingolib 6.0.0. Matoleo yote mawili yalitangulia NU7, kwa hiyo mnamo Novemba 2026 hatua zilihamishiwa kwenye Zkool 6.37.0 na zingolib 8.0.0. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388) ndilo toleo la kwanza la Zkool lililojengwa kwa kutumia urefu wa uanzishaji wa Mainnet wa NU7, na zingolib 8.0.0 ndilo toleo linaloongeza usaidizi wa Mainnet wa NU7.

## Kabla hujaanza

Unahitaji vitu viwili:

1. **UFVK** ya akaunti. [Viewing Keys](/zcash-tech/viewing-keys) inaeleza inachofichua na jinsi ya kuihamisha.
2. **Urefu wa kuanzia**, block [block] ambayo uchanganuzi utaanza kutoka. Tumia urefu wa kabla ya muamala wako wa kwanza. Ukiuweka juu sana, historia ya zamani haitapatikana kimya kimya. Ukiuweka chini sana, uchanganuzi utachukua muda mrefu zaidi. Uanzishaji wa Sapling (419200) ni salama kila wakati lakini unaweza kuchukua saa kadhaa kuchanganua.

## Uweke faraghani

Ufunguo wa kutazama hauwezi kutumia fedha, lakini unaonyesha historia yako yote kwa yeyote anayeushikilia.

- Usiubandike kwenye tovuti au kichunguzi cha block. Uuingize kwenye programu unayoendesha mwenyewe.
- Seva unayosawazisha nayo huona anwani yako ya IP na miamala unayopakua kikamilifu. Vifaa vyote viwili hapa chini hupata kila muamala wako kwa kitambulisho ili kusoma jumbe na ada, na [ZIP 307](https://zips.z.cash/zip-0307) inabainisha kuwa hii huambia seva miamala ipi ni yako. Kusawazisha kutoka kwenye node yako mwenyewe ya Zebra kwa kutumia Zaino au lightwalletd huepusha hilo. [Zingolib na Mafunzo ya Zaino](/guides/zingolib-and-zaino-tutorial) yanaelekeza hatua kwa hatua jinsi ya kusanidi.
- zingo-cli hutuma malipo kupitia mixnet ya Nym, lakini usawazishaji wake bado huunganisha kwenye seva moja kwa moja, kwa hiyo hoja iliyo hapo juu inaihusu pia.
- Vipe vifaa hivi funguo za kutazama, kamwe msivipe maneno ya kurejesha pochi. Amri ya Docker iliyo hapa chini huwasha seva ya Zkool GraphQL kwa kutumia `--allow-unauthenticated`, kwa hiyo haina mfumo wa kuingia, na API yake inaweza kurejesha maneno ya kurejesha pochi ya akaunti yoyote iliyoundwa kutoka kwa moja, na kutuma fedha.
- Weka seva kwenye mashine yako mwenyewe. Amri ya Docker iliyo hapa chini husikiliza tu kwenye `127.0.0.1` ya kompyuta yako. Ndani ya kontena, seva lazima isikilize kwenye violesura vyote (`--bind-address 0.0.0.0`), la sivyo Docker haiwezi kuifikia; upangaji wa `-p 127.0.0.1:8000:8000` ndio unaoiweka ndani ya mashine yako pekee.
- Vifaa vyote viwili huhifadhi ufunguo na historia yako bila usimbaji fiche. Zkool inaweza kusimba hifadhidata yake kwa njia fiche (`--db-password-file`), lakini amri iliyo hapa chini hurahisisha mambo kwa kutumia `--allow-unencrypted-database`. Futa data ya kazi ukimaliza na uhifadhi nakala iliyohamishwa mahali paliposimbwa fiche.

## Chaguo la 1: GraphQL ya Zkool

`zkool_graphql` ni injini ya pochi ya Zkool kama seva huru. Ni programu tofauti na programu ya Zkool. Njia rahisi zaidi ya kuiendesha ni taswira rasmi ya Docker (amd64 na arm64). Pia kuna binari ya x86-64 ya Linux kwenye [ukurasa wa matoleo wa Zkool](https://github.com/hhanh00/zkool2/releases); inahitaji glibc 2.38 au toleo jipya zaidi, kwa hivyo Ubuntu 24.04 hufanya kazi na Debian 12 haifanyi.

### 1. Anzisha seva

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

Tangu 6.32.0 seva haitaanza hadi uweke wazi mambo mawili: jinsi wateja wanavyoingia (ufunguo wa JWT, au `--allow-unauthenticated`) na iwapo hifadhidata imesimbwa fiche (nenosiri, au `--allow-unencrypted-database`). Sasa pia husikiliza kwenye `127.0.0.1` pekee kwa chaguomsingi, jambo ambalo ndani ya kontena linamaanisha kuwa hakuna kitu nje kinachoweza kuifikia, kwa hiyo `--bind-address 0.0.0.0`. Kontena likisimama mara moja, `docker logs zkool-export` huonyesha chaguo lipi halipo.

Inasawazisha kutoka `https://zec.rocks` isipokuwa uongeze `--lwd-url` na seva yako mwenyewe. Picha ina vigezo vya Sapling vilivyojengewa ndani, kwa hivyo hakuna kitu kingine cha kupakua.

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

zingo-cli ni pochi ya Zingo ya mstari wa amri. Hakuna vipakuliwa vilivyotayarishwa awali, kwa hivyo ijenge kwa kutumia Rust. Tumia zingolib 8.0.0 au toleo jipya zaidi: hilo ndilo toleo la kwanza linalojua urefu wa block wa uanzishaji wa Mainnet wa NU7 (3,543,405), kulingana na [maelezo ya toleo](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0). Miundo iliyojengwa kutoka kwenye tagi za zamani kama vile 6.0.0 haijui urefu huo.

Ujenzi unatumia [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`). Kwenye Ubuntu unahitaji pia `sudo apt install build-essential gcc libsqlite3-dev`.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Hii huunda `./target/release/zingo-cli` na kuiweka kando yake `nym-proxy`. Unahitaji `nym-proxy` hata kwa ajili ya kusawazisha tu: zingo-cli haitaunganishwa bila hiyo. Tangu toleo la 8.0.0, `zingo-netutils` ni sehemu ya nafasi kuu ya kazi, kwa hiyo mwongozo wa zamani wa kunakili `nym-proxy` kutoka `zingo-netutils/target/release/` haufanyi kazi tena.

Ukipeleka `zingo-cli` mahali pengine, peleka `nym-proxy` pamoja nayo, au iambie zingo-cli ilipo kwa kutumia `--nym-proxy /path/to/nym-proxy` au kigezo cha mazingira cha `ZINGO_NYM_PROXY`. Bila hivyo, huitafuta kando ya faili yake ya binary, kisha kwenye `PATH` yako. Ikiwa haiwezi kuwasha proksi, haitaunganishwa kabisa.

Ni malipo pekee (pamoja na ukaguzi wa bei wa ZEC) yanayopita kupitia Nym. Sync huunganisha moja kwa moja kwenye seva.

Uendeshaji wa kwanza huunda pochi ya kutazama pekee, huisawazisha na kuchapisha historia:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` lazima iwe njia kamili.
- `--viewkey` na `--birthday` hutumika tu pochi inapoundwa. Baada ya hapo, ziondoe.
- zingo-cli mpya huwa nje ya mtandao kwa chaguo-msingi na inahitaji ridhaa yako ili iunganishwe. `--server` huchagua seva na pia huhesabiwa kuwa ridhaa hiyo. Njia nyingine ni `--online` (kwa kipindi hiki pekee) na `--remember-online`, ambayo pia huhifadhi chaguo hilo karibu na pochi ili matumizi ya baadaye yaunganishwe bila bendera (`--forget-online` hutengua chaguo hilo).
- Ufunguo huingia kwenye historia ya shell yako, kwa hivyo ifute baadaye.

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

- `transactions` na `value_transfers` huchapisha maandishi ya kawaida yanayofanana kidogo na JSON, lakini si JSON.
- Kiasi huonyeshwa kwa zatoshis (100,000,000 hadi 1 ZEC) na huwa chanya kila wakati. `kind` hukuonyesha mwelekeo. Kwa miamala ya kutuma, `value` ni kiasi kilichotumwa kwa watu wengine, bila ada.
- Ada huonyeshwa kama “haipatikani” wakati muamala unatumia fedha za uwazi ambazo hazikuwa zako. Madokezo ya maandishi pekee ndiyo huonyeshwa.
- Usawazishaji ukishindwa, hitilafu huonyeshwa kwenye terminal, si kwenye faili. Tangu zingolib 8.0.0 (zingo-cli 0.5.0), amri ikishindwa pia hutoka na msimbo usio sifuri, lakini kagua terminal kabla ya kuamini `transactions.txt`.

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

- [Funguo za kutazama](/zcash-tech/viewing-keys)
- [Kurejesha fedha](/using-zcash/recovering-funds)
- [Zingolib na Zaino Mafunzo](/guides/zingolib-and-zaino-tutorial)
- [Jukwaa: Kuhamisha historia ya miamala kwenda JSON/CSV kutoka UFVK/maneno ya kurejesha pochi](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Jukwaa: Zkool na GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
