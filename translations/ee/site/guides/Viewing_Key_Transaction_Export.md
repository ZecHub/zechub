<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Gaɖoɖo Ƒe Historia Ƒe Kpɔtso ɖe Eme Tso Viewing Key Me

Gakotoku [wallet] ƒe kpɔtso geɖe ko le. ZODL ƒe akɔnta ƒe kpɔtso, le kpɔɖeŋu me, naa wò ŋkekeawo, gaƒomekukuwo kple adzɔwo na kalenda ƒe ƒe si va yi, gake gaɖoɖo ƒe ID aɖeke mele o, nya kpui aɖeke mele o, eye gaɖoƒe ƒe dzesi aɖeke hã mele o. Ema mede asi na akɔnta ƒe ŋlɔɖiɖi, gakotoku ƒe trɔtrɔ ƒe kpekpeɖeŋu, alo fexexe aɖe ƒe nusi dzɔ ƒe kaɖiɖi o.

Mele be wòatsɔ wò gadzraɖoɖi nya [seed phrase] ana be nàkpɔ nusiwo katã ta o. Unified full viewing key (UFVK, si ƒe gɔmedzedze le `uview1`) ate ŋu akpɔ gaɖoɖo siawo katã siwo ge ɖe eme kple siwo do go le akɔnta aɖe me, eye dɔwɔnu eve ate ŋu atrɔ ema zu faɛl si nàdzra: Zkool GraphQL server kple zingo-cli. Mɔfiafia sia ƒo mɔ siwo tso [forum ƒe nyati sia](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) me eye wotrɔe ɖe version yeyewo nu.

Woda kpɔe le September 2026 me kple Zkool 6.30.0 kple zingo-cli tso zingolib 6.0.0 me.

## Hafi nàdze egɔme

Ele be nàkpɔ nu eve:

1. **UFVK** na akɔnta la. [Nukpɔsafuiwo](/zcash-tech/viewing-keys) gblɔ nusi wòfia kple ale si woatsɔ akpɔe.
2. **Dzigbe ƒe teƒe**, gaɖoɖowo ƒuƒoƒe si woatsɔ adze scan gɔme le. Zã teƒe aɖe si le wò gaɖoɖo gbãtɔ ŋgɔ. Ne nàɖoe ɖe dzi akpa aɖe, historia xoxo aɖewo bu tsɔe to ɣaɣla me. Ne nàɖoe ɖe anyi akpa aɖe, scan la ƒe ɣeyiɣi koe adidi. Sapling ƒe dzeɖeɖe (419200) dzɔna ɣeaɣi eye scan ate ŋu axɔ gaƒoƒo geɖe.

## Nàdze e ɣaɣla me

Nukpɔsafui aɖe mate ŋu aƒe ga o, gake eɖe wò historia blibo la fia ame si kee wòle si.

- Mègblɔe le website alo gaɖoɖowo ƒe mɔkpɔla aɖe dzi o. Ɖoe ɖe software si wò ŋutɔ nàwɔ la me.
- Server si wòle sync wɔm tso la kpɔ wò IP gaɖoƒe kple gaɖoɖo siwo nètsɔe vɛ blibo. Dɔwɔnu eve siwo le anyi la katã wɔ wò gaɖoɖo ɖe ID me be woaxle nya kpuiwo kple adzɔwo, eye [ZIP 307](https://zips.z.cash/zip-0307) de ŋku edzi be esia gblɔ na server la be gaɖoɖo siwo nye tɔwòe. Sync si tso wò ŋutɔ Zebra ɣaɣla dzesi ŋɔŋlɔ [node] kple Zaino alo lightwalletd magblɔ esia o. [Zingolib kple Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) fia ale si woawɔ ɖoɖo aɖe.
- zingo-cli 6 ɖoa fexexewo ɖe Nym mixnet dzi, gake eƒe sync lia server la kple mɔ dzĩ, eya ta nyati si le dzi la ku ɖe eŋu hã.
- Na dɔwɔnu siawo nukpɔsafui, megaɖe gadzraɖoɖi nya na wo o. Zkool GraphQL server ƒe gegeɖeɖe manɔ anyi le gɔmedzedze me o, eye eƒe API agbugbɔ gadzraɖoɖi nya na akɔnta siawo katã si wo wɔ tsoe me, eye wòate ŋu aɖo ga.
- Dzra server la le wò ŋutɔ ƒe mɔkeke dzi. Docker sedede si le anyi la se to ɖe `127.0.0.1` koe.
- Dɔwɔnu eve siawo dzra safui la kple wò historia ɣe ɣaɣlaŋlɔŋlɔ [encryption] me o. Tutui dɔ ƒe data la ne wowu, eye nàdzra kpɔtso la le teƒe si woŋlɔ ɣaɣlaŋlɔŋlɔ le.

## Tia 1: Zkool GraphQL

`zkool_graphql` nye Zkool ƒe gakotoku ƒe mɔdɔwɔla le server si tsi tre ɖeka me. Eya nye program bubu tso Zkool app la. Mɔ bɔbɔe si woatsɔ awɔe nye Docker image (amd64 kple arm64). Linux x86-64 binary hã le [Zkool ƒe releases axa dzi](https://github.com/hhanh00/zkool2/releases); ele be glibc 2.38 alo si wu ema nanɔ asinye, eya ta Ubuntu 24.04 wɔ dɔ, gake Debian 12 mewɔ o.

### 1. Dze server la gɔme

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ewɔ sync tso `https://zec.rocks` me ne mètsɔ `--lwd-url` kpe ɖe eŋu kple wò ŋutɔ server o. Le egɔmedzedze gbãtɔ me la, eɖea Sapling parameters (le 50 MB ƒe ta) vɛ. Ne esia megbe o la, `docker start zkool-export` ate ƒe wɔ geɖe.

Ʋu `http://127.0.0.1:8000/graphiql` le browser me. Àte ŋu aɖo afɔ siwo va yi ɖe eƒe eme eye nàwɔ wo.

### 2. Ɖo safui la ɖe eme

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

Egbɔna kple akɔnta yeye la ƒe ID, si nye 1 le server yeye aɖe dzi.

- Ɖo `birth` ɣesiaɣi. Ne mèɖoe o la, Zkool adze egɔme tso gaɖoɖowo ƒuƒoƒe si le fifia eye makpɔ naneke o.
- `useInternal: true` na Zkool nakpɔ nuwo ƒe ʋuʋuɖi [transparent] ƒe trɔtrɔ ƒe gaɖoƒe ƒe dzesiwo hã. Dzrae ɖe eme na safui siwo tso ZODL me, si nye ɖoɖo ma ke [Ga Ƒe Gbugbɔxɔxɔ](/using-zcash/recovering-funds) zãna na ZODL gadzraɖoɖi nyawo.

### 3. Wɔ sync

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Esia dzi yi va se ɖe esi sync la awu. Mègatsɔ `fast: true` kpe ɖe eŋu o. Ewɔ be womaɖea gaɖoɖowo blibo vɛ o, si nye afi si nya kpuiwo, adzɔwo kple outputs tso.

Xexlẽme si wogbugbɔna nye teƒe si wòɖo ta be yia, menye ɖaseɖigbalɛ be wòva ɖo afi ma o. Network ƒe vodada aɖe ate ŋu awu sync la doŋgɔ be magblɔ naneke o, eya ta kpɔ:

```graphql
{ currentHeight accounts { id name height } }
```

Ne akɔnta la ƒe `height` le `currentHeight` megbe la, wɔ sync la ake. Egaɖo edzi tso afi si wòtsɔ.

### 4. Kpɔe tso ɖe eme

Dzrae ɖe `history.graphql` ƒe ŋkɔ te:

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

Mètsɔ `height` argument la o negbe nèdi be nàwɔe. Ewɔ minimum aɖe, eya ta forum ƒe kpɔɖeŋu si ƒe `height: 3000000` doa nu siawo katã siwo le gaɖoɖowo ƒuƒoƒe ma ŋgɔ ɖa.

Xlee abe JSON ene:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Gaɖoɖo ɖeka ɖeka ele be fia adzɔ si le 0 wu, nukuku ƒe fetuwo koe nye tɔe. Ne aɖe fia `"fee": "0"` eye nya kpui aɖeke mele o la, womeɖe eƒe nyawo vɛ o. Zkool xle gaɖoɖowo blibo ɖeka ɖeka le scan la megbe, eye vodada ɖeka ku ɖe wo katã ƒe susuwo te ɣaɣla me. Be nàkpɔ siwo katã woku eŋu la:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Ne nu aɖe do go la, wɔ sync ake le minuti aɖewo megbe eye nàkpɔe tso ɖe eme ake.

Emegbe, trɔe zu CSV, row ɖeka na gaɖoɖo ɖeka:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Ale si woaxle output la

| Field | Gɔgɔme |
|---|---|
| `value` | Akɔnta la ƒe tɔtrɔ net le ZEC me, adzɔ hã le eme. Eɖea va anyi na dodowo. |
| `fee` | Adzɔ le ZEC me. Le fexexe si wòxɔ la dzi, ame si ɖoee la ƒe eƒe adzɔ, eye mele `value` me o. |
| `time` | Gaɖoɖowo ƒuƒoƒe ƒe ɣeyiɣi le UTC me, time zone ƒe dzesi manɔe o |
| `notes` | Nusi akɔnta la xɔ le gaɖoɖo sia me, trɔtrɔ hã le eme. Nya kpui siwo woɖo ɖe wò ŋu le afisia. Nuwo ƒe ʋuʋuɖi ƒe entries me gaɖoƒe ƒe dzesi mele o. |
| `spends` | Akɔnta la ƒe didienuwo si gaɖoɖo sia zã ɖe nu |
| `outputs` | Nusi gaɖoɖo la ɖo do go: nuwo ƒe ʋuʋuɖi ƒe output ɖeka ɖeka, kple ɣaɣla [shielded] ƒe fexexewo na gaɖoƒe ƒe dzesi bubuwo kple woƒe nya kpuiwo |
| `pool` | 0 nuwo ƒe ʋuʋuɖi, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 tso ame bubu gbɔ (fexexe ge ɖe eme), 1 le eme ŋutɔ (trɔtrɔ) |

Zkool app la hã ƒe Export Transactions, Memos kple Notes le akɔnta ƒe menu me, gake wo nye table ƒe data xɔtɔwɔwo: gaƒomekukuwo le zatoshis me, Unix ƒe ɣeyiɣi dzesiwo, eye nya kpuiwo le faɛl bubu me.

## Tia 2: zingo-cli

zingo-cli nye Zingo ƒe command-line gakotoku. Wo mewɔ download si woɖo ɖe ŋgɔ o, eya ta ele be nàtu wo kple Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Ele be nàkpɔ `nym-proxy` hã be nàwɔ sync ko. zingo-cli 6 malia server aɖeke o ne esia mele o.

Dɔwɔɣeyiɣi gbãtɔ la wɔ gakotoku si kpɔa nu ko, wɔ sync eye eŋlɔ historia la ɖe aga:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` ele be wòanye mɔ ƒe blibotɔ.
- `--viewkey` kple `--birthday` wɔ dɔ le esime wo wɔ gakotoku la ko. Megatsɔ wo o le ema megbe.
- zingo-cli dzena gɔme le offline me le gɔmedzedze. `--server` tia server la eye hã fia be nèna mɔ be wòayi online.
- Safui la adze le wò shell ƒe historia me, eya ta tutui eya megbe.

Dɔwɔɣeyiɣi siwo va yi:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` xle nusi wo wɔ sync ɖe eme xoxo, metsi network la ŋu o.

- `transactions` naa entry ɖeka na gaɖoɖo ɖeka: txid, ɣeyiɣi (UTC), teƒe, ƒomevi (`received`, `sent`, `shield` alo `send-to-self`), gaƒomekuku, adzɔ kple didienu siwo le eme.
- `value_transfers` naa entry ɖeka na fexexe ɖeka, eya ta dodoo na amewo eve nye entries eve, eye ame si xɔe ƒe gaɖoƒe ƒe dzesi kple nya kpuiwo le ɖeka ɖeka me.
- `messages` ƒoa nya kpuiwo ɖe JSON me.

Nu aɖewo si woanya tso output la ŋu:

- `transactions` kple `value_transfers` ŋlɔ text dzadzɛ si le abe JSON ene vie, gake menye JSON o.
- Gaƒomekukuwo le zatoshis me (100,000,000 na 1 ZEC) eye woƒe dzesi le dzi ɣesiaɣi. `kind` fia afisi ga la yina. Na dodowo, `value` nye nusi yi ame bubuwo gbɔ, adzɔ mele eme o.
- Adzɔ la fia abe "not available" ene ne gaɖoɖo aɖe zã nuwo ƒe ʋuʋuɖi ƒe ga si menye tɔwò o. Nya kpui siwo nye text koe wofia.
- Ne sync la megbe o la, vodada la yina terminal la me, menye faɛl la me o, eye zingo-cli gaƒoƒo hã ewɔ exit dzadzɛ. Kpɔ terminal la hafi nàka ɖe `transactions.txt` ŋu.

dismad ƒe [zingoHelper](https://github.com/dismad/zingoHelper) ƒe `exportToJSON.sh` script trɔa `transactions` zu JSON. Woŋlɔe hafi zingo-cli 6 va, woɖoe ɖe testnet ta, ewɔa outgoing Sapling kple nuwo ƒe ʋuʋuɖi ƒe entries aɖewo abe teƒeƒuƒuwo ene, eye GNU dɔwɔnuwo wòhia, eya ta mawɔ dɔ le macOS si mewotrɔ naneke o dzi. Wɔ eƒe output la abe gɔmedze teƒe ene eye nàkpɔ gaƒomekukuwo.

## Nusi nukpɔsafui mate ŋu agblɔ na wò o

- **Asi ƒomekukuwo.** Dɔwɔnu aɖeke maŋlɔ ZEC ƒe asi ƒomekuku le gaɖoɖo ɖeka ɖeka ƒe ɣeyiɣi me o. Ɖo fiat ƒe gaƒomekukuwo ɖe eme wò ŋutɔ.
- **Nuwo ƒe ʋuʋuɖi ƒe historia, ne safui la mekpɔe o.** UFVK ƒe nuwo ƒe ʋuʋuɖi ƒe akpa mate ŋu anɔ eme o le [ZIP 316](https://zips.z.cash/zip-0316) nu. Kple zingo-cli, `$Z --offline parse_viewkey uview1...` fia gaƒuƒoƒowo si safui aɖe kpɔ.
- **Ame si ɖo ga na wò.** Ɣaɣla ƒe fexexewo metsɔa ame si ɖoe la ƒe gaɖoƒe ƒe dzesi o. Ne ame si ɖoe la metsɔe ɖe nya kpui la me o la, mele afi aɖeke o.
- **Nya aɖewo tso dodowo ŋu.** Woagbugbɔxɔ gaɖoƒe ƒe dzesi, gaƒomekuku kple nya kpui na ɣaɣla ƒe dodowo to ɣaɣlaŋlɔŋlɔ kple safui la dzi. Gakotoku aɖe ate ŋu awɔ gaɖoɖo aɖe ale be esia mate ŋu adzɔ o, ke geɖe hã mewɔ nenema o.

## Dɔwɔnu bubuwo

| Dɔwɔnu | Nusi nàkpɔ |
|---|---|
| ZODL | Akɔnta ƒe CSV kple ŋkekeawo, gaƒomekukuwo, adzɔwo kple tag aɖe. Kalenda ƒe ƒe si va yi koe, ewɔa ɣaɣla ƒe gaɖoɖowo to, txid, nya kpui alo gaɖoƒe ƒe dzesi mele o. |
| Zkool app | Table ƒe kpɔtso xɔtɔwɔwo tso akɔnta ƒe menu me |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Eɖoa UFVK ɖe eme kple `importvk`. `listreceived` to RPC me gbugbɔna didienu siwo wo xɔ kple txid kple nya kpui, gake dodowo kple adzɔwo mele o. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` le nyawo geɖe gake wowɔ dzesi be experimental, eye Zallet ɖoa Sapling nukpɔsafuiwo ko ɖe eme, menye UFVKwo o |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Eɖoa UFVK ɖe eme kple `wallet init-fvk`, emegbe `wallet list-tx`. Eƒe CSV ƒe mɔ me txid alo gaɖoƒe ƒe dzesi mele o, eye project la gblɔ be woagazãe le production me o. |

## Siwo kplɔe ɖo

- [Nukpɔsafuiwo](/zcash-tech/viewing-keys)
- [Ga Ƒe Gbugbɔxɔxɔ](/using-zcash/recovering-funds)
- [Zingolib kple Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Gaɖoɖo ƒe historia ƒe kpɔtso zu JSON/CSV tso UFVK/seed me](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool kple GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
