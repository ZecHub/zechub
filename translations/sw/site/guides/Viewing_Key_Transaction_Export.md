<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporting Transaction History kutoka Viewing Key

Wengi wa mkoba mauzo ya nje ni nyembamba. ZODL 's kodi ya kuuza nje, kwa mfano, inakupa tarehe, kiasi na ada kwa ajili ya mwaka uliopita kalenda, lakini hakuna shughuli IDs, hakuna memos wala anwani yoyote. Hiyo haitoshi kwa bookkeeping, kuangalia uhamiaji mfuko, au kufanya kazi nini kilichotokea malipo.

Huna haja ya neno la mbegu kupata picha kamili. Umoja wa kuangalia muhimu (UFVK, kuanzia `uview1`) unaweza kuona kila shughuli zinazoingia na zinazotoka katika akaunti, na zana mbili inaweza kugeuka kuwa kwenye faili wewe kuweka: Zkool GraphQL server na zingo-cli. mwongozo huu hukusanya mbinu kutoka kwa watumiaji wa kawaida hadi wateja wako binafsi (kama vile mteja) ili kupata maelezo ya kina kuhusu jinsi gani wanaweza kufanya biashara yako au kutengeneza bidhaa zao. [thread hii ya jukwaa](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) na updates yao kwa releases ya sasa.

Ilijaribiwa Septemba 2026 na Zkool 6.30.0 na zingo-cli kutoka zingolib 6.0.0.

## Kabla ya kuanza .

Unahitaji mambo mawili:

1. ** UFVK** kwa ajili ya akaunti. [Kuangalia funguo za kuvinjari](/zcash-tech/viewing-keys) inaelezea kile kinachodhihirisha na jinsi ya kuuza nje moja.
2. **A birth height**, the block to start scanning from. Use a height from before your first transaction. Kuweka juu sana na historia ya zamani ni kimya kukosa. Set it too low and the scan just takes longer. Sapling activation (419200) is always safe but can take hours to scan.

## Iweke faragha.

Ufunguo wa kutazama hauwezi kutumia, lakini huonyesha historia yako yote kwa yeyote anayeshikilia.

- Usiweke kwenye tovuti au block explorer. Ingiza katika programu unayoendesha mwenyewe.
- Server wewe kulandanisha kutoka anaona anwani yako ya IP na ambayo shughuli download katika full. zana zote mbili chini kupata kila moja ya shughuli zako kwa ID kusoma memos na ada, na [ZIP 307 - Ujumbe wa posta.](https://zips.z.cash/zip-0307) inabainisha kwamba hii anaelezea server ambayo shughuli ni yako. Syncing kutoka node yako mwenyewe Zebra na Zaino au lightwalletd kuepuka kuwa. [Zingolib na Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) anatembea kupitia kuanzisha.
- zingo-cli 6 hutuma malipo juu ya Nym mixnet, lakini usawazishaji wake bado unaunganisha kwa seva moja kwa moja, hivyo hatua hapo juu inatumika pia.
- Kutoa zana hizi kuangalia muhimu, kamwe mbegu. Zkool GraphQL server hana login default, na API yake itakuwa mkono nyuma ya mbegu ya akaunti yoyote kuundwa kutoka moja, na unaweza kutuma fedha.
- Weka server kwenye mashine yako mwenyewe. amri Docker chini tu anasikiliza juu ya `127.0.0.1`.
- Zana zote kuhifadhi ufunguo na historia yako unencrypted. Futa data ya kazi wakati wewe ni kufanyika na kuweka kuuza nje mahali fulani encrypting.

## Chaguo 1: Zkool GraphQL

`zkool_graphql` ni injini mkoba Zkool ya kama seva kujitegemea. Ni mpango tofauti kutoka programu Zkoul. Njia rahisi kuendesha ni rasmi Docker picha (amd64 na arm64). Pia kuna Linux x86-64 binary juu ya [Zkool releases ukurasa](https://github.com/hhanh00/zkool2/releases); inahitaji glibc 2.38 au mpya, hivyo Ubuntu 24.04 kazi na Debian 12 haina.

### 1. Kuanza server

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ni syncs kutoka `https://zec.rocks` isipokuwa wewe kuongeza `--lwd-url` Wakati wa kuanza kwanza ni downloads Sapling vigezo (kuhusu 50 MB). Kama kwamba inashindwa, `docker start zkool-export` jaribu tena.

Kufungua `http://127.0.0.1:8000/graphiql` Unaweza kuweka kila moja ya hatua zifuatazo huko na kukimbia.

### 2. Kuingiza ufunguo huo

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

Ni anarudi ID mpya akaunti ya, ambayo ni 1 kwenye seva safi.

- Daima kuweka `birth`. Bila hiyo Zkool huanza kutoka block ya sasa na hupata chochote.
- `useInternal: true` hufanya Zkool kuangalia uwazi mabadiliko ya anwani pia. Kuweka juu kwa funguo kutoka ZODL, kuweka sawa [Kufufua Fedha](/using-zcash/recovering-funds) matumizi kwa mbegu ZODL.

### 3. Sawazisha

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Hii anaendesha mpaka mwisho wa usawazishaji. Usiongeze `fast: true`Ni skips downloading shughuli kamili, ambayo ni ambapo memos, ada na matokeo kutoka.

Idadi ni kurudi urefu ilikuwa inalenga kwa, si ushahidi got huko. kosa la mtandao unaweza kumaliza usawazishaji mapema bila taarifa chochote, hivyo kuangalia:

```graphql
{ currentHeight accounts { id name height } }
```

Kama akaunti ya `height` ni nyuma ya `currentHeight`, kuendesha sync tena. Inaendelea kutoka ambapo ni kusimamishwa.

### 4 Usafirishaji nje ya nchi

Hifadhi hii kama: `history.graphql`:

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

Acha nje ya `height` hoja isipokuwa wewe maana yake. Inaweka kiwango cha chini, hivyo mfano jukwaa ya `height: 3000000` kuacha kila kitu kabla ya kuzuia kwamba.

Kuileta kama JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Kila shughuli lazima kuonyesha ada juu ya 0, madini tuzo kando. Kama mtu inaonyesha `"fee": "0"` Zkool fetches shughuli kamili moja kwa wakati baada ya skanning, na kushindwa mmoja kimya anaacha wengine. orodha yoyote walioathirika:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Kama kitu inaonekana, kulandanisha tena dakika chache baadaye na kuuza nje tena.

Kisha flatten ni kwa CSV, safu moja kwa kila shughuli:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Kusoma pato

| Uwanja | Maana |
|---|---|
| `value` | Mabadiliko halisi kwenye akaunti katika ZEC, ada imejumuishwa. Hasi kwa utumaji. |
| `fee` | Ada katika ZEC. Kwa malipo uliyopokea, mtumaji alilipa na hayapo `value`. |
| `time` | Muda wa kuzuia katika UTC, bila alama ya eneo la saa |
| `notes` | Akaunti ilipokea kiasi gani katika muamala huu, ikijumuisha chenji. Memo zilizotumwa kwako ziko hapa. Maingizo ya uwazi hayana anwani. |
| `spends` | Akaunti yenyewe inabainisha kuwa muamala huu ulitumia |
| `outputs` | Muamala ulituma nini: kila matokeo ya uwazi, pamoja na malipo yaliyolindwa kwa anwani zingine zenye memo zao |
| `pool` | 0 inayong'aa, Miche 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 ya nje (malipo ya ndani), 1 ya ndani (chenji) |

Zkool programu pia ina Export Transactions, Memos na Notes katika orodha ya akaunti, lakini wale ni mbichi meza Dumps: kiasi katika zatoshis, Unix timestamps, na memos katika faili tofauti.

## Chaguo 2: zingo-cli

zingo-cli ni mkoba wa amri ya Zingo. Hakuna downloads prebuilt, hivyo kujenga na kutu:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Unahitaji `nym-proxy` hata tu kwa kulandanisha. zingo-cli 6 si kuungana na seva yoyote bila hiyo.

Run ya kwanza inajenga mtazamo tu mkoba, syncs yake na prints historia:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` lazima iwe njia kamili.
- `--viewkey` na `--birthday` tu kuomba wakati mkoba ni kuundwa. Waache nje baada ya hapo.
- zingo-cli huanza nje ya mtandao kwa default. `--server` huchagua server na pia kuhesabiwa kama idhini yako ya kwenda online.
- Funguo huishia katika historia yako ya shell, hivyo wazi baadae.

Baadaye anaendesha:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` anasoma kile tayari synced bila kugusa mtandao.

- `transactions` inatoa kiingilio moja kwa kila shughuli: txid, wakati (UTC), urefu, aina (`received`, `sent`, `shield` or `send-to-self`), thamani, ada na noti zinazohusika.
- `value_transfers` anatoa kuingia moja kwa malipo, hivyo kutuma watu wawili ni entries mbili, kila mmoja na anwani ya mpokeaji na memos.
- `messages` orodha memos kama JSON.

Mambo machache ya kujua kuhusu pato:

- `transactions` na `value_transfers` kuchapisha maandishi wazi kwamba inaonekana kidogo kama JSON lakini si.
- Kiasi cha pesa hizo ni za zatoshi (ZEC 100,000,000 hadi 1 ZEC) na sikuzote zina thamani ya kuridhisha. `kind` inakuambia mwelekeo. Kwa sends, `value` ni kile alienda kwa watu wengine, bila ada.
- Ada inaonyesha kama "haipatikani" wakati shughuli hutumia fedha uwazi ambayo haikuwa yako. Nakala tu za maandishi zinaonyeshwa.
- Kama usawazishaji inashindwa, kosa huenda terminal, si faili na zingo-cli bado exits kawaida. Angalia terminal kabla ya kuamini `transactions.txt`.

ya dismad's [msaidizi wa tangazo la habari](https://github.com/dismad/zingoHelper) ina a `exportToJSON.sh` script kwamba hubadilisha `transactions` Ni iliandikwa kabla ya zingo-cli 6, ni kuanzisha kwa testnet, alama baadhi outgoing Sapling na viingizo uwazi kama placeholders, na mahitaji zana GNU, hivyo si kukimbia juu ya hisa macOS. Kutibu pato lake kama hatua ya kuanzia na kuangalia jumla.

## Nini ufunguo viewing hawezi kukuambia

- ** Bei.** Wala chombo kumbukumbu ZEC bei wakati wa kila shughuli. Ongeza fiat maadili mwenyewe.
- ** historia ya uwazi, kama muhimu haina ni pamoja na hayo.** sehemu wazi wa UFVK ni hiari chini [ZIP 316 - Ujumbe wa posta.](https://zips.z.cash/zip-0316). Kwa zingo-cli, `$Z --offline parse_viewkey uview1...` inaonyesha ambayo hifadhi muhimu inashughulikia.
- ** Nani aliyekulipa.** Malipo ya kulindwa hayana anwani ya mtumaji. Isipokuwa mtoaji aweke moja katika kumbukumbu, haiko popote.
- ** Baadhi ya maelezo kwenda.** Anwani ya marudio, kiasi na memo kwa ajili ya shielded kutuma ni kufufuliwa kwa decrypting na ufunguo. mkoba unaweza kujenga shughuli ili kwamba haiwezekani, ingawa wengi hawana.

## Vifaa vingine

| Zana | Unachopata |
|---|---|
| ZODL | CSV ya Ushuru yenye tarehe, kiasi, ada na lebo. Mwaka uliopita wa kalenda pekee, huacha miamala ya ulinzi, hakuna txid, memo au anwani. |
| Programu Zkool | Usafirishaji wa jedwali ghafi kutoka kwenye menyu ya akaunti |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Huingiza UFVK na `importvk`. `listreceived` Marejesho ya noti zilizopokelewa zenye txid na memo, lakini hakuna utumaji na ada. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` imefafanuliwa kwa undani lakini imetiwa alama ya majaribio, na Zallet huingiza funguo za kutazama Sapling pekee, si UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Huingiza UFVK na `wallet init-fvk`, kisha `wallet list-tx`Hali yake ya CSV haina txid au anwani, na mradi unasema isitumike katika uzalishaji. |

## Kuhusiana na hilo

- [Kuangalia funguo za kuvinjari](/zcash-tech/viewing-keys)
- [Kufufua Fedha](/using-zcash/recovering-funds)
- [Zingolib na Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Exporting shughuli historia ya JSON / CSV kutoka UFVK/mbegu](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL (Kifungu cha habari)](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [tangazo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
