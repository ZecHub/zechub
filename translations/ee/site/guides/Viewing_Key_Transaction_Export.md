<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporting Transaction History from a Viewing Key (Dɔwɔƒe ƒe Ŋutinya Tso Kpɔmɖonuvi aɖe Me)

Most wallet exports are thin. ZODL's tax export, for example, gives you dates, amounts and fees for the previous calendar year, but no transaction IDs, no memos and no addresses. That isn't enough for bookkeeping, for checking a wallet migration, or for working out what happened to a payment.

Mehiã be nàzã nyagbe si nye "seed phrase" hafi akpɔ nu bliboa o. Nu ɖeka aɖe li, eyae nye UFVK (Unified Full Viewing Key), eye wòdze egɔme tso afi sia le Eʋegbe me: `uview1`) ate ŋu akpɔ nu sia nu si le va kple esi do tso asitelefon dzi la, eye dɔwɔnu eve te ŋu trɔa esia wòzua nuŋlɔɖi aɖe: Zkool GraphQL server kple zingo-cli. Mɔfiame sia ƒo alesi woazã nyatakakadzraɖoƒeae me nyawo katã ta ƒu ɖe agbalẽvi siwo gbɔna ƒe kɔpiwo me. [forum me nya sia](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) eye wòɖea wo ɖe go le ɣeyiɣi siwo me wole asi trɔm.

Wotsɔe Zkool 6.30.0 kple zingo-cli tso zingolib 6.0.0 do dodokpɔe le September 2026 me.

## Hafi nàdze egɔme la,

Nu eve hiã:

1. ** UFVK** na akɔntabubu. [Kpɔkplɔtiwo](/zcash-tech/viewing-keys) aɖe nusi wòɖena fiana kple alesi woadzrae ɖae la me.
2. **A birth height**, the block to start scanning from. Zã kɔkɔme tso do ŋgɔ na wò nuxexlẽ gbãtɔa me. Set it too high and older history is silently missing. Set It too low and the scan just takes longer. Sapling activation (419200) nye dedie ɣesiaɣi gake ate ŋu axɔ gaƒoƒo geɖe hafi woadzidzee.

## Mègagblɔe na ame bubuwo o.

Ame aɖeke mate ŋu azã nu siwo le eme la o, gake eɖea wò ŋutinya bliboa fiaa ame sia ame si lée ɖe asi.

- Mègatsɔe de nyatakakadzraɖoƒe alo mɔ̃ siwo dzi amewo tona la me o. Tsɔe yi dɔwɔƒe si nèzãna ŋutɔ gbɔ.
- Server si dzi nèdzena le la kpɔa wò IP address kple nu siwo katã nèwɔ ƒe kɔpi. Dɔwɔnu eve siawo yɔa wo dometɔ ɖesiaɖe ɖe eƒe ID ŋu be woaxlẽ memoswo kple fewo, eye ne èdi be yeaɖe asi le eŋu ko la àte ŋu akpɔe ɖa to Internet alo kɔmpiuta aɖe dzi. [ZIP 307 ƒe adrɛswo](https://zips.z.cash/zip-0307) de dzesii be esia fiaa nuƒlelawo wo nye tɔwò. Eʋe le wò ŋutɔ Zebra node kple Zaino alo lightwalletd me tsɔa nusia ƒoa asa na ema. [Zingolib kple Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) enɔa zɔzɔm le mɔ aɖe si woɖo ɖi la dzi.
- zingo-cli 6 ɖoa ga to Nym mixnet dzi, gake eƒe sync la gakpɔtɔ nɔa kadodo me kple server tẽe, eyata nya siwo le etame hã sɔ nɛ.
- Na nu siawo ƒe dzesiwo, ke menye nuku o. Zkool GraphQL server la meʋua go aɖeke le ɖoɖo nu o eye eƒe API ana ŋkɔ ɖesiaɖe si wowɔ tso ɖeka gbɔ kple woƒe nukuawo woagaɖo ɖe ame bubuwo hã be woaxɔ ga na yewo.
- Na server la nanɔ wò ŋutɔ ƒe kɔmpiuta dzi. Docker-ʋɔnudɔwɔƒe si le ete se ko na wo be woaɖo to nu siwo nèdi tso esi me: `127.0.0.1`.
- dɔwɔnu eveawo siaa dzraa safui kple wò ŋutinya ɖo le numekugbalẽ me. Miɖe dɔwɔwɔ ŋuti nyatakakawo ɖa ne miewu wo zazã nu eye miwɔ ɖoɖo ɖe afisi woaɖo wo ŋu la be wòanɔ ɣaɣlaƒe aɖe.

## Mɔnu 1: Zkool GraphQL

`zkool_graphql` enye Zkool ƒe gaɖakawo mɔ̃ si nye nuƒlela ɖeka. Enye ɖoɖo bubu tso Zkoul app la gbɔ. Mɔ bɔbɔe wu be woaɖo edzie nye Docker nɔnɔmetata (amd64 kple arm64). Linux x86-64 binary hã le dziƒoxɔ sia me, eye ele abe ame siwo zãa Xcode ene. [Zkool ɖe axa aɖe ɖa.](https://github.com/hhanh00/zkool2/releases); ehiã glibc 2.38 alo esi va yi wu, eyata Ubuntu 24.04 wɔa dɔ eye Debian 12 ya mewɔa dɔ o.

### 1. Dze dɔdzikpɔlaa gɔme.

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ewɔa ɖeka kple wo nɔewo tso: `https://zec.rocks` negbe ɖe nègblɔ be: `--lwd-url` le wò ŋutɔ ƒe server dzi. Ne èdze egɔme la, ekɔa Sapling parameters (si ade 50 MB) ɖe eme. ne ema do kpo nu la, ke efia be ele mɔ̃a me eye woana ame si dze edzi na eƒe dɔwo katã hã nakpɔe ɖa. `docker start zkool-export` ake.

Ʋu wo. `http://127.0.0.1:8000/graphiql` Àte ŋu aŋlɔ afɔɖeɖe siwo gbɔna la dometɔ ɖe sia ɖe ade afi ma eye nàzãe.

### 2. Ʋu nu vevi la le eme.

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

Eɖoa account yeyea ƒe ID, si nye 1 le server yeye dzi.

- Woɖo wo ɖi ɣesiaɣi. `birth`Ne mele eme o la, Zkool adze egɔme tso xɔ si me wòle fifia eye makpɔ naneke le afima o.
- `useInternal: true` naa Zkool hã kpɔa adrɛswo ƒe tɔtrɔ le wo me. Na wòanɔ edzi na safui siwo tso ZODL, ɖoɖo ɖeka ma ke [Gawo Gbɔ Kpɔkpɔ](/using-zcash/recovering-funds) ZODL nukuwo zazã.

### 3. Wɔ ɖeka kple wo nɔewo.

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Esia anɔ edzi vaseɖe esime nuŋɔŋlɔa awu enu. Mègaƒo wo ta o `fast: true`Eɖea nu siwo katã wowɔna la ɖa, si nye afisi nyatakakawo kple fe bubuwo tsona.

Xexea ƒe vodada ate ŋu ana be woadzudzɔ dɔwɔwɔ le ɣeyiɣi si mede o me, eye womate ŋu agblɔ naneke tso eŋu hã o. Eya ta kpɔ:

```graphql
{ currentHeight accounts { id name height } }
```

Ne ga si le ame aɖe ƒe nudzraɖoƒe la sɔ gbɔ ko. `height` le megbe. `currentHeight`Egale afisi wòdzudzɔ le la dzi.

### 4. Adzɔnu siwo woɖona ɖe duta

Dzra esia ɖo abe: `history.graphql`:

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

Mègaƒo nu tso eŋu o. `height` Eɖoa nusi le sue wu, eyata forum ƒe kpɔɖeŋu la nyea "nu si mehiã o" eye wòfia be ame aɖeke mate ŋu awɔ nu ma hafi woatsɔe ade eme. `height: 3000000` Egblẽa nu sia nu si le mɔ ma dzi la ɖi.

Kplɔe vɛ abe JSON ene:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Ele be fe si le dɔ ɖesiaɖe me la nade 0 kple edzivɔ, negbe viɖe siwo wokpɔna tso tomenuku mee ko. Ne ame aɖe ɖe ga home si wòxɔ ƒe akpa ɖeka fia la, ke ele nɛ be wòaxe adzɔga bubu na eya ŋutɔ hã. `"fee": "0"` Zkool hea nu siwo katã wowɔ la vɛ ɖekaɖeka le numekukua megbe, eye ne nane gblẽ ko la eɖea wo ɖa. Ne míade dzesi esiwo ŋu nya ku ɖo:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Ne nane do la, trɔ asi le eŋu emegbe eye nàtrɔ ayi edzi.

Emegbe tsɔe ɖo CSV me, fli ɖeka ɖe nuwɔwɔ ɖesiaɖe ŋu:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Nu siwo me woŋlɔ wo ɖo la xexlẽ

| Gbadzaƒe | Gɔmeɖeɖe |
|---|---|
| `value` | Net change to the account in ZEC, fee included. Negative for sends. |
| `fee` | Fee in ZEC. On payments you received, the sender paid it and it isn't in `value`. |
| `time` | Xlẽ ɣeyiɣi le UTC me, ɣeyiɣi ƒe didime ƒe dzesi manɔmee |
| `notes` | Nusi akɔntabubua xɔ le asitsatsa sia me, si me tɔtrɔ hã le. Memo siwo woɖo ɖe wò la le afisia. Adrɛs aɖeke mele nya siwo woŋlɔna le gaglãgbe la ŋu o. |
| `spends` | Akɔntabubua ŋutɔ de dzesii be asitsatsa sia wu enu |
| `outputs` | Nusi asitsatsa la ɖo ɖa: nusianu si woɖe ɖe go le gaglãgbe, tsɔ kpe ɖe fexexe si wokpɔ ta na adrɛs bubuwo kple woƒe nuŋlɔɖiwo ŋu |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 gotagome (fexexe aɖe le), 1 ememe (trɔtrɔ) |

Export Transactions, Memos and Notes le account menu hã li na Zkool app la gake esiwo nye table dumps: zatoshis me ga homewo, Unix time stamp kple memos siwo le file bubu aɖe me.

## Mɔnu 2: zingo-cli

zingo-cli nye Zingo ƒe command line wallet. Womedi downloads tso ŋgɔ o, eyata ètsɔ Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Èhiã na: `nym-proxy` be woawɔ ɖeka ko gɔ̃ hã. zingo-cli 6 ma do ka kple server aɖeke ema manɔmee o.

Ne wowɔe zi gbãtɔ la, woana ga si me woakpɔa nu le ko. Woadzidze eŋu eye woaŋlɔ eƒe ŋutinya:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` ele be wòanye mɔ si dzi woato akpɔ dzidzedze.
- `--viewkey` kple `--birthday` ne èwɔ gaɖaba la ko hafi nàzã wo. Mègaŋlɔe ɖi o le ema megbe.
- zingo-cli adze dɔwɔwɔ gɔme le mɔ̃ dzi. `--server` tia nuƒomɔ̃a eye wò hã ewɔa dɔ abe mɔɖeɖe si nèna be yeanɔ Internet dzi ene.
- Aʋatɔa va ge ɖe wò nyatakakawo me, eyata dzudzɔe ne ènya tsɔ.

Etsɔme ƒe dɔdeasiwo:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` exlẽa nusi woƒo ƒu xoxo la evɔ meƒoa nu tso kadodo si le edzi kple amewo ŋu o.

- `transactions` na nu ɖeka le dɔwɔna ɖesiaɖe me: txid, game (UTC), kɔkɔme, ƒome (`received`, `sent`, `shield` or `send-to-self`), woƒe home, ga si woxe ɖe eta kple agbalẽ siwo dzi woŋlɔe ɖo.
- `value_transfers` na nyatakaka ɖeka ɖe fexexlẽ ɖesiaɖe ta, eyata nusi woɖo ɖa ame eve la nye nuŋlɔɖi eve siwo dometɔ ɖesiaɖe me amesi le edzi xɔm ƒe adrɛs kple memoawo le.
- `messages` Eŋlɔa memoawo abe JSON ene.

Nu ʋɛ aɖewo siwo wòle be nànya tso nu si wòado goe ŋu:

- `transactions` kple `value_transfers` Eŋlɔa nu siwo le abe JSON ene gake menye nenemae wonye o.
- Wozãa ga home sia le zatoshis me (si nye 100,000,000 kple 1 ZEC dome) eye enyea dzidzedzetɔe ɣesiaɣi. `kind` Efiaa mɔ si dzi nàto. `value` enye nusi amewo xɔna, evɔ womexɔa ga aɖeke ɖe eta o.
- Ne ga si menye tɔwò o la zãm nèle le nuxexlẽ me ko hafi fe sia dzena abe "ele asime" ene. Numeɖeɖewo koe woɖena fiana.
- Ne emenuwɔwɔa do kpo nu la, vodada yia terminalo dzi ke menye file o eye zingo-cli yina egblẽna abe alesi wòle tsã ene. Kpɔ terminale me ɖa hafi nàɖo ŋu ɖe edzi `transactions.txt`.

dzigbɔɖi ƒe nuwɔnaa me. [nye kpeɖeŋutɔ](https://github.com/dismad/zingoHelper) le asi ɖe edzi. `exportToJSON.sh` ŋɔŋlɔ si trɔa nu me la `transactions` JSON. Eŋlɔe do ŋgɔ na zingo-cli 6, woɖo wo ɖi be testnet, eɖɔa Sapling kple nu siwo le eme la dometɔ aɖewo abe teƒeɖolawo ene eye wòhiã GNU dɔwɔnuwo, eyata mate ŋu anɔ dɔ wɔm ɖe macOS dzi o. Wɔ eƒe gbeɖiɖi ƒe dzesi wònye afisi nàdze egɔme tso ahakpɔ akɔntabubuawo ɖa.

## Nusi ŋkuɖonusi mate ŋu agblɔ na wò o la,

- **Fetuwo.** Dɔwɔƒeawo dometɔ aɖeke meŋlɔa ZEC ƒe asi ɖe wo nɔewo dzi le nuxexlẽ ɖesiaɖe wɔwɔɣi o. Wò ŋutɔ tsɔ fiat-fewo kpee.
- ** Ŋutinya si me kɔ, ne nya vevi la mekpe ɖe eŋu o.** UFVK ƒe akpa si le gaglãe menye tiatia aɖeke le se sia te o. [ZIP 316 ƒe ŋkɔwo le afi sia.](https://zips.z.cash/zip-0316). kple zingo-cli, `$Z --offline parse_viewkey uview1...` Efia nu siwo me nudzraɖoƒe aɖe le.
- Ame si xe fe na wò.** Ga siwo wotsɔ ɣla meŋlɔa ame si ɖo wo ɖa ƒe adrɛs ɖe agbalẽvia dzi o. Ne amea mede ɖeka asii le nyatakaka la, ke mele afi aɖeke o.
- **Nusiwo le dodom.** Woɖea afisi woɖo la, ga homea kple nyatakaka si wotsɔ ɖo agbalẽvi siwo ŋu wotrɔ asi le nyuie ƒe dzesiwoe ne woɖe nyaawo gɔme to woƒe safui dzi. Gaɖivɔsa ate ŋu awɔ nu sia ale be esia manya wɔ o, gake ame akpa gãtɔ mewɔe nenema o.

## Dɔwɔgbalẽvi bubuwo

| Dɔwɔnu | Nusi nèkpɔna |
|---|---|
| ZODL | Adzɔxexe ƒe CSV kple ŋkekewo, ga homewo, fewo kple tag. Ɣletigbalẽ ƒe si va yi ɖeɖeko, skips shielding transactions, txid, memo alo adrɛs aɖeke meli o. |
| Zkool dɔwɔnu | Raw table exports tso akɔntabubu ƒe nyawo me |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Imports a UFVK kple `importvk`. `listreceived` over RPC returns xɔ nuŋlɔɖi siwo me txid kple memo le, gake womeɖoe ɖa o eye womexe fe aɖeke o. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` nye nyatakaka tsitotsito gake wode dzesii be dodokpɔ, eye Sapling ƒe nukpɔkpɔ safuiwo koe Zallet tsɔna tsoa duta, ke menye UFVKwo o |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Imports a UFVK kple `wallet init-fvk`, ɣe ma ɣi `wallet list-tx`. Eƒe CSV mode la mekpɔ txid alo adrɛs o, eye dɔa gblɔ be yemazãe le ewɔwɔ me o. |

## Nu Siwo Do Ka Kple Wo Nɔewo

- [Kpɔkplɔtiwo](/zcash-tech/viewing-keys)
- [Gawo Gbɔ Kpɔkpɔ](/using-zcash/recovering-funds)
- [Zingolib kple Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Exporting transaction history to JSON/CSV from UFVK/seed Mɔwɔmɔnu ƒe Ŋutinya le Xexlẽme](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
