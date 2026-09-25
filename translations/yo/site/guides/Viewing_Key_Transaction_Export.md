<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporting Transaction History from a Viewing Key

Ọpọlọpọ awọn okeere apamọwọ jẹ tinrin. ZODL's tax export, fun apẹẹrẹ, nfun ọ ni ọjọ-ori, iye ati owo sisan fun ọdun kalẹnda ti tẹlẹ, ṣugbọn ko si ID idunadura, ko si memo tabi adirẹsi. Iyẹn ko to fun iṣiro iwe iroyin, lati ṣayẹwo gbigbe apoti kan, tabi lati ṣiṣẹ ohun ti o ṣẹlẹ si isanwo kan.

O ko nilo rẹ irugbin gbolohun lati gba awọn kikun aworan. A unified pipe wiwo bọtini (UFVK, bẹrẹ ni aarin ti o baamu) le ṣe iranlọwọ fun ọ lati ri gbogbo ohun elo lori ayelujara ati ki o wo bi wọn yoo ṣiṣẹ daradara pẹlu ara wọn. `uview1`) le ri gbogbo ti nwá ati jade idunadura ni kan iroyin, ki o si meji irinṣẹ le yi pada wipe sinu a faili ti o tọju: awọn Zkool GraphQL olupin ati zingo-cli. guide yii gba awọn ọna lati [ìjíròrò yìí](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) ó sì máa ń mú wọn bá àwọn àtúnṣe tó ṣẹ̀ṣẹ̀ dé mu.

A ṣe idanwo ni Oṣu Kẹsan ọdun 2026 pẹlu Zkool 6.30.0 ati zingo-cli lati zingolib 6.0.0.

## Kó o tó bẹ̀rẹ̀.

Ohun méjì lo nílò:

1. ** UFVK** fún ìkànnì náà. [Àwọn Kókó Ìwòran](/zcash-tech/viewing-keys) ó ṣàlàyé ohun tó ń fi hàn àti bó ṣe yẹ ká máa gbé e jáde.
2. **A birth height**, the block to start scanning from. Lo a ga lati ṣaaju ki o to rẹ akọkọ idunadura. Ṣeto ti o ju giga ati awọn agbalagba itan ni silently nsọnu. ṣeto ti o kere ju ati awọn ọlọjẹ nikan gba gun. Sapling ifọwọsi (419200) jẹ nigbagbogbo ailewu sugbon le ya wakati lati lọ kiri.

## Má ṣe sọ fún ẹnikẹ́ni.

Kò sí bí ẹ ṣe lè ná owó lórí kókó ìsọfúnni, àmọ́ ó máa ń fi gbogbo ìtàn ìgbésí ayé rẹ han ẹnikẹ́ni tó bá ní í.

- Má ṣe fi sínú ìkànnì tàbí àyèwò àwọn ẹ̀yà. Gbé wọlé sí inú ètò tí ìwọ fúnra rẹ ń lò.
- Olùgbéejáde tí o bá ń ṣe àdàkọ láti rí adirẹsi IP rẹ àti àwọn ìnáwó tóo fi sílẹ̀ ní kíkún. Àwọn irinṣẹ́ méjèèjì yìí ni ó máa n gba gbogbo ìṣàdálẹ̀ rẹ nípa ID lati ka ìwé ìrántí ati owó, àti [ZIP 307](https://zips.z.cash/zip-0307) notes that this tells the server which transactions are yours. Syncing from your own Zebra node with Zaino or lightwalletd avoids that. The [Ìtọ́ni nípa Zingolib àti Zaino](/guides/zingolib-and-zaino-tutorial) ó ń rìn gba inú àgọ́ kan.
- zingo-cli 6 n fi owo ranṣẹ lori Nym mixnet, ṣugbọn isopọpọ rẹ tun sopọ si olupin taara, nitorinaa aaye ti o wa loke kan fun u pẹlu.
- Fi kókó ìwòye fún àwọn irinṣẹ́ yìí, má ṣe fi àgbìn sí wọn lọ́rùn. Olùgbàlà Zkool GraphQL kò ní àkọsílẹ̀ kankan nípa bí wọ́n ti ń forúkọ sílẹ̀ àti API rẹ yóò dá a padà láti inú àgbín tí ó bá jẹ́ èyí tó ṣẹ̀dá látorí ẹyọ kan, kí o sì lè rán owó jáde.
- Pa olupin naa lori ẹrọ tirẹ. Iṣẹ Docker ti o wa ni isalẹ nikan gbọ lori awọn ohun elo rẹ: `127.0.0.1`.
- Àwọn irinṣẹ́ méjèèjì ńpamọ̀ kókó àti ìtàn rẹ láì ṣe àdàkọ. Pa àwọn ìsọfúnni tí o n ṣiṣẹ nígbàtí ó bá parí, kí o sì fi èsì náà pamọ ní ibìkan tó wà lábẹ́ àdàkàdekè.

## Aṣayan 1: Zkool GraphQL

`zkool_graphql` ni Zkool ká apamọwọ engine bi a standalone olupin. o jẹ ẹya lọtọ eto lati awọn Zkoul app. awọn simplest ona to ṣiṣe ti o wa ni osise Docker image (amd64 ati arm64). nibẹ ni tun kan Linux x86-64 oniru lori awọn ohun elo, sugbon ko si ọkan ninu wọn funrararẹ. [Zkool ṣe àtúnṣe sí ojúewé rẹ̀.](https://github.com/hhanh00/zkool2/releases); o nilo glibc 2.38 tabi tuntun, nitorina Ubuntu 24.04 ṣiṣẹ ati Debian 12 ko ṣe.

### 1. Ṣiṣẹ́ ààrò náà.

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ó ń bára rẹ̀ ṣiṣẹ́ láti inú `https://zec.rocks` àyàfi tó o bá fi kún un pé: `--lwd-url` pẹlu rẹ ara olupin. lori akọkọ bẹrẹ o gba lati ayelujara awọn Sapling parameters (nipa 50 MB). ti o ba ti kuna, `docker start zkool-export` tún gbìyànjú lẹ́ẹ̀kan sí i.

Ṣíṣí sílẹ̀. `http://127.0.0.1:8000/graphiql` O le lẹẹmọ kọọkan ti awọn igbesẹ to wa nibẹ ki o si ṣiṣe rẹ.

### 2. Gbé kọ́kọ́rọ́ náà wọlé.

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

Ó dá ID àkọọ́lẹ̀ tuntun padà, èyí tí ó jẹ 1 lórí séràfẹẹsì titun.

- A ti ṣètò rẹ̀ nígbà gbogbo. `birth`Láìsí i, Zkool á bẹ̀rẹ̀ láti ìsọ̀rí tó wà nísinsìnyí kò sì rí nǹkan kan.
- `useInternal: true` jẹ ki Zkool ṣayẹwo adirẹsi iyipada ṣiṣan pẹlu. Pa o lori fun awọn bọtini lati ZODL, iṣeto kanna [Gbígba Owó Túnra Wá](/using-zcash/recovering-funds) àwọn ohun tí wọ́n ń lò fún irúgbìn ZODL.

### 3. Àtúnṣe síi.

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Èyí yóò máa ṣiṣẹ títí tí àfiwé náà fi parí. Ẹ má ṣe ṣafikun `fast: true`. O skip downloading awọn kikun idunadura, eyi ti o jẹ ibi ti memos, owo ati esi wá lati.

Nọmba ti o pada ni giga ti o n wa, kii ṣe ẹri pe o de ibẹ. Aṣiṣe nẹtiwọki le pari isopọmọ ṣaaju laisi ijabọ ohunkohun, nitorinaa ṣayẹwo:

```graphql
{ currentHeight accounts { id name height } }
```

Bí àkáǹtì náà bá ti di èyí tí a kò lè rí. `height` ti wà ní ẹ̀yìn. `currentHeight`, tún ṣe àtúnṣe síi. Ó ń bá a lọ láti ibi tí ó ti dúró.

### 4. Àtúnlò àkànṣe

Fi èyí pamọ́ gẹ́gẹ́ bíi: `history.graphql`:

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

Fi àwọn tó wà nínú ìwé náà sílẹ̀. `height` O fi idiwọn kan mulẹ, nitorinaa apẹẹrẹ apejọ naa jẹ `height: 3000000` ó máa ń fi gbogbo nǹkan tó wà ṣáájú kókó náà sílẹ̀.

Gba o bi JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Gbogbo idunadura yẹ ki o han a owo loke 0, iwakusa èrè sile. ti ọkan ba fihan `"fee": "0"` Zkool gba gbogbo ìsòwò náà ní ẹ̀kan lẹ́yìn àyẹ̀wò, àti pé àìṣeyọrí kan máa ń dá àwọn tó kù dúró. láti ṣe àkójọ àwọn tí ó kàn:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Bí ohunkóhun bá yọjú, tún ṣe àtúnṣe ní ìṣẹ́jú díẹ̀ lẹ́yìn náà kí o sì ṣàmúlò rẹ.

Lẹhinna ṣii rẹ si CSV, ila kan fun iṣowo:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Kíkà ìjáde náà

| Pápá | Ìtumọ̀ |
|---|---|
| `value` | Àyípadà gbogbo sí àkọọ́lẹ̀ náà ní ZEC, owó náà sì wà nínú rẹ̀. Òdì fún ìfiránṣẹ́. |
| `fee` | Owo ni ZEC. Lori awọn sisanwo ti o gba, olufiranṣẹ naa sanwo rẹ ati pe ko si ninu `value`. |
| `time` | Àkókò dídínà ní UTC, láìsí àmì agbègbè àkókò |
| `notes` | Ohun tí a gbà nínú ìṣòwò yìí, títí kan ìyípadà. Àwọn àkọsílẹ̀ tí a fi ránṣẹ́ sí ọ wà níbí. Àwọn ìkọ̀wé tí ó hàn gbangba kò ní àdírẹ́sì. |
| `spends` | Àkọọ́lẹ̀ náà sọ pé ìṣòwò yìí ti lò tán |
| `outputs` | Ohun tí ìṣòwò náà fi ránṣẹ́: gbogbo ìjáde tí ó ṣe kedere, pẹ̀lú àwọn ìsanwó tí a dáàbò bo sí àwọn àdírẹ́sì mìíràn pẹ̀lú àwọn àkọsílẹ̀ wọn |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 external (a payment in), 1 internal (change) |

Ohun elo Zkool tun ni Awọn Iṣowo Ọja, Memos ati awọn akọsilẹ ninu akojọ aṣayan iroyin naa, ṣugbọn wọn jẹ idalẹnu tabili aise: iye owo ti o wa ni zatoshis, timestamps Unix, ati awọn memo ni faili lọtọ.

## Àṣàyàn 2: zingo-cli

zingo-cli ni àpò owó ìlà àṣẹ Zingo. Kò sí àwọn ohun èlò tí a ti ṣe àkọsílẹ̀, nítorí náà o kọ́ ọ pẹlú Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

O nílò `nym-proxy` kódà láti ṣe àdàkọ. zingo-cli 6 kò ní so sí àwọn sàrẹ̀fù kankan láìsí rẹ̀.

Ìṣiṣẹ́ àkọkọ̀ dá àpò-ìpamọ́ tí a lè rí nìkan, ó ṣe ìfọwọ́sowọ́pọ̀ rẹ̀ àti títẹ ìtàn:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` ó ní láti jẹ́ òpópónà tí kò lábùlà.
- `--viewkey` àti pé, `--birthday` Nìkan lo wọn nígbà tí wọ́n bá dá àpò-owó náà sílẹ̀ lẹ́yìn èyí.
- zingo-cli á bẹ̀rẹ̀ ní ìkọjá láìsí àfojúsùn. `--server` yan olupin ati tun ka bi igbanilaaye rẹ lati lọ si ori ayelujara.
- Ọ̀nà tí kókó náà gbà dé inú ìtàn ìparun rẹ nìyẹn, nítorí náà ṣe é ní àtúnṣe lẹ́yìn ìgbà yẹn.

Àwọn ìsọfúnni tó tẹ̀ lé e:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` ó máa ń ka ohun tí a ti ṣe àdàkọ rẹ̀ láìfi ọwọ́ kan ẹ̀rọ náà.

- `transactions` ó ń fúnni ní àkọsílẹ̀ kan lórí ìnáwó: txid, àkókò (UTC), gíga, irú-ọmọ (`received`, `sent`, `shield` or `send-to-self`), iye, owó àti àwọn ìwé tó jẹ mọ́ ọn.
- `value_transfers` fi ohun kan s'ori owo, nitorina fifiranṣẹ si eniyan meji jẹ awọn nkan meji, kọọkan pẹlu adirẹsi olugba ati memo.
- `messages` ó ṣe àkójọ àwọn àlàyé bí JSON.

Awọn nkan diẹ lati mọ nipa iṣelọpọ:

- `transactions` àti pé, `value_transfers` tẹ ọrọ ti o dabi JSON ṣugbọn kii ṣe.
- Àwọn iye náà jẹ́ ní zatoshis (nǹkan bí 100,000,000 sí 1 ZEC) wọ́n sì máa ń dára nígbà gbogbo. `kind` ó sọ ọ́ ní ibi tó o máa lọ. `value` ohun tó lọ sí ọwọ́ àwọn ẹlòmíràn ni, láìgba owó náà.
- Owó náà máa ń hàn bí "kò sí" nígbà tí ìnájà bá ná owó tó jẹ́ pé kì í ṣe tìrẹ. Àwọn àlàyé nìkan ni a fi han.
- Ti isopọmọ ba kuna, aṣiṣe naa lọ si ebute, kii ṣe faili naa, ati zingo-cli tun jade ni deede. Ṣayẹwo ebute ṣaaju ki o to gbẹkẹle `transactions.txt`.

àwọn tí kò ní ọ̀wọ́ nínú. [olùrànlọ́wọ́ onígbàgbọ́](https://github.com/dismad/zingoHelper) ní àyè kan. `exportToJSON.sh` Àkọlé tí ó yí padà `transactions` to JSON. A kọ o ṣaaju ki zingo-cli 6, ti ṣeto fun testnet, awọn ami diẹ ninu jade Sapling ati ṣiṣan titẹsi bi placeholders, ati nilo GNU irinṣẹ, nitorina ko yoo ṣiṣe lori iṣura macOS. Ṣe itọju abajade rẹ gẹgẹbi ibẹrẹ kan ki o ṣayẹwo lapapọ naa.

## Ohun tí kókó ìwòran kò lè sọ fún ọ ni

- **Iye owo.** Kò sí ọ̀nà kankan tí ó ń ṣe àkọsílẹ̀ iye owó ZEC ní àkókò ìsòwò kọ̀ọ̀kan. Fi àwọn àpapọ̀ iye tìrẹ kún un.
- **Awọn ti o ni imọlẹ itan, ti ko ba awọn bọtini pẹlu rẹ.** Awọn ìmọlẹ apa kan UFVK jẹ aṣayan labẹ [ZIP 316 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0316). pẹ̀lú zingo-cli, `$Z --offline parse_viewkey uview1...` ó fi hàn pé àwọn ìsọ̀rí tí kókó kan ń bo.
- **Tó bá jẹ́ pé ẹni tó sanwó fún ọ.** Àwọn ìnájà tí wọ́n fi ààbò bo owó kò ní àdírésì onítọ̀hún. Àyàfi bí onílé náà bá kọ ọ́ sínú ìwé ìrántí, a ò lè rí i níbi kankan.
- ** Diẹ ninu awọn alaye ti n jade.** Adirẹsi ibi-afẹde, iye ati memo fun fifiranṣẹ ipamọ ni a gba pada nipasẹ ṣiṣatunkọ pẹlu bọtini. Iwe apamọwọ kan le kọ iṣowo ki o ma ṣee ṣe, botilẹjẹpe ọpọlọpọ ko ṣe bẹ.

## Àwọn irinṣẹ́ mìíràn

| Irinṣẹ́ | Ohun tí o gbà |
|---|---|
| ZODL | CSV owó-orí pẹ̀lú ọjọ́, iye owó, owó àti àmì kan. Ọdún kàlẹ́ńdà tó kọjá nìkan, ó ń fo àwọn ìṣòwò ààbò, kò sí txid, àkọsílẹ̀ tàbí àdírẹ́sì. |
| Ohun elo Zkool | Àwọn àkójọpọ̀ tábìlì tí a kò rí láti inú àkóónú àkọọ́lẹ̀ |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Gbé UFVK wọlé pẹ̀lú `importvk`. `listreceived` lórí RPC padà gba àwọn àkọsílẹ̀ pẹ̀lú txid àti memo, ṣùgbọ́n kò sí ìfiránṣẹ́ àti kò sí owó. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` Ó ní àlàyé díẹ̀ ṣùgbọ́n a fi àmì sí i láti ṣe àyẹ̀wò, Zallet sì kó àwọn kọ́kọ́rọ́ ìwòran Sapling wọlé nìkan, kì í ṣe UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Gbé UFVK wọlé pẹ̀lú `wallet init-fvk`, lẹ́yìn náà `wallet list-tx`. Ipo CSV rẹ̀ kò ní txid tàbí àdírẹ́sì, iṣẹ́ náà sì sọ pé a kò gbọdọ̀ lò ó nínú iṣẹ́ ṣíṣe. |

## Àwọn tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn Kókó Ìwòran](/zcash-tech/viewing-keys)
- [Gbígba Owó Túnra Wá](/using-zcash/recovering-funds)
- [Ìtọ́ni nípa Zingolib àti Zaino](/guides/zingolib-and-zaino-tutorial)
- [Forum: Ṣíṣàn ìtàn ìsòwò sí JSON/CSV láti UFVK/irúgbìn](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Àjọ: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [ì ¤ì í ë¦¬ë¥1⁄4 ê° ì 'í ¬](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
