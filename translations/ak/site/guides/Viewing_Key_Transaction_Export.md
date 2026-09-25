<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporting Transaction History from a Viewing Key

Sɛ wohwɛ a, sɛ wode ato hɔ ama obi foforo anaa w'adwumam no na ɛboa ma wotew nea wobɛtumi de adi dwuma wɔ ne bere mu. Ɛho nhwɛsoɔ nie: ZODL tow ho nneɛma a wɔde di gua no kyerɛ nnafua, sika dodow ne akatua ahorow a wotua maa afe a atwam no nanso ɛnkyerɛ akwantuo IDs biara, nkaeɛ krataa biara, anaasɛ address biara. Eyi ntumi mma wommu nkrataa pii mfa nni dwuma, nsesaeɛ bi nkɔ so ntena baabiara, anaa biribi yɛ adwuma fa deɛ ɛkɔba ɔfã baako akyi.

Wonnhia w'asɛmfua a wode di dwuma no na ama woanya mfoni mu nyinaa. Unified Full Viewing Key (UFVK, efi ase wɔ afe 2000). `uview1`) tumi hu dwumadie biara a ɛreba ne nea ɛkɔ so wɔ account no mu, na nnwinnade mmienu betumi asesa saa akɔ file bi a wo kura: Zkool GraphQL server ne zingo-cli. Saa akwankyerԑ yi fa kwan ahorow fi "Zkool" kɔma "zcool". [saa nhyiamu no mu nsɛmti yi](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) na ɔde wɔn di dwuma ma wɔde nsɛm a ɛresisi seesei no mu aba.

Wɔsɔree no wɔ September 2026 mu de Zkool 6.30.0 ne zingo-cli firi zingolib 6.0.0 dii dwuma.

## Ansa na wobɛfi ase no,

Wohia nneɛma abien:

1. *Nneɛma a ɛwɔ UFVK* no din mu. [Ɔhwɛfoɔ Nsaano Hwehwɛbea](/zcash-tech/viewing-keys) Kyerɛkyerɛ nea ɛda adi ne sɛnea wobɛfa bi akɔ.
2. **A birth height**, the block to start scanning from. Use a height from before your first transaction. Set it too high and older history is silently missing. Set it too low and the scan just takes longer. Sapling activation (419200) is always safe but can take hours to scan.

## Ma ɛnyɛ kokoam asɛm.

Wontumi mfa ade a wode hwehwɛ mu no nto gua, nanso ɛma obiara hu wo ho nsɛm nyinaa.

- Mma no mfa nkɔ wɛbsaet anaa block explorer mu. Fa kɔ software a wo ankasa yɛ so.
- Serwer a wo ne no di sync no hu w'adrɛs IP na transaction ahorow a wode kɔ so wɔ mu nyinaa. Nnwinnade mmienu yi ase hɔ de, fa ID biara to ho kenkan memo ne akatua, na afei twe bi fi saa data aa wobedi kan ayɛ adwuma no so ma ɛkɔ baabiara a wopɛ sɛ wokɔ. [ZIP 307](https://zips.z.cash/zip-0307) Hunu sɛ wei kyerɛ servers no nea ɛyɛ wo transaction. Sɛ wode Zaino anaa lightwalletd yɛ syncing firi w'ankasa Zebra node so a, ɛremma saa. [Zingolib ne Zaino Nkyerɛkyerɛmu](/guides/zingolib-and-zaino-tutorial) nam afiri bi mu.
- zingo-cli 6 soma sika wɔ Nym mixnet so, nanso ne sync no da so ara ka server no ho tẽẽ, enti asɛm a ɛwɔ atifi hɔ no fa ɔno nso ho.
- Ma saa nnwinnade yi nhwehwɛbea, na ɛnyɛ aba. Zkool GraphQL serwer no nni login wɔ default mu, ne API de bɛsan ama asete biara a woayi afi emu bi so aba abrɛ ase, na etumi to sika.
- Ma servers no ntena w'ankasa afidie so. Docker akwankyerɛ a ɛwɔ ase ha yi tie wɔ wo ankasa afidie mu nkutoo `127.0.0.1`.
- Nnwinnade mmienu no nyinaa kora wo safe ne w'atwerԑtohɔ a enni koden. Twerɛ adwuma ho nsɛm aa wode adi dwuma bere a woawie na fa de kɔ baabi wɔ ɔkwan foforo so, di kan twerԑ din foforɔ biara.

## Nhyehyεe 1: Zkool GraphQL

`zkool_graphql` Zkool ne wallet engine no yɛ standalone server. ɛyɛ program a ɛwozono firi zkool app hɔ. ɔkwan tiawa paa na wode bɛ di dwuma ne official Docker image (amd64 and arm64). nso wɔ Linux x86-64 binary wɔ ɔfese yi so, nanso w'atumi de ayɛ adwuma sɛ "Zkool" portfolios dwumadie bi anaa woahwɛ paneɛ foforɔ biara a ɛwɔ baabiara - wobɛtumi ahwehwɛ akwan ahodoɔ pii afa ho ansa na woahu nea ɛsɛsɛ woyɛ ma saa dwumadifoɔ no. [Zkool de n'ani to fam wɔ kratafa no so.](https://github.com/hhanh00/zkool2/releases); ɛhia glibc 2.38 anaa nea ɛyɛ foforɔ, enti Ubuntu 24.04 yɛ adwuma na Debian 12 deɛ ɛnnyɛ.

### 1. Bue dwumadifoɔ no

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ɛfiri hɔ na ɛhwɛ nsɛm so. `https://zec.rocks` gye sɛ wode ka ho a, na woaka no bi. `--lwd-url` with your own server. On first start it downloads the Sapling parameters (about 50 MB). If that fails, `docker start zkool-export` bɔ mmɔden bio.

buebuebuee `http://127.0.0.1:8000/graphiql` Wobɛtumi de nkrataa a edi hɔ no biara aka ho na woahyɛ ase.

### 2. Fa safoa no ba.

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

Ɛsan de account foforɔ no ID, a ɛyɛ 1 wɔ server foforo so.

- Daa wɔhyehyɛ no `birth`Sɛ onni bi a, Zkool fi ase wɔ saa ɔfese yi mu na ɔnhu hwee.
- `useInternal: true` ma Zkool hwehwɛ nsɛm a ɛsakra nso. Ma no so wɔ nsafoa firi ZODL, saa nhyehyeɛ koro yi ara mu [Sika a wɔsan de ba no ho ka](/using-zcash/recovering-funds) fa yɛ ZODL aba no.

### 3. Nkrataa a wɔakyere agu so

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Eyi bɛtoa so kosi sɛ nea wɔasa no bewie. Mma nka ho `fast: true`Ɛsan nso twe adwene si dwuma a wɔfa so di, ne nea wɔde yɛ adwuma no nyinaa ho.

Nkyerεso a εsan de ba no yε sorɔnsorɔmmerɛ, na ɛnyɛ adanse sε w'atumi aba hɔ. Nhyehyɛeɛ mfomso betumi ama sintɔ ase ntɛm bere a wonnya hwee ho amanneɛbɔ biara nti hwɛ:

```graphql
{ currentHeight accounts { id name height } }
```

Sɛ ɛka no yɛ nea wɔaka ho asɛm akyerɛ me dedaw a, ɛnde: `height` wɔ akyi. `currentHeight`Sɛ yɛsan hwɛ bio a, na ɛkyerɛ sɛ efi nea ɛbaa awiei no.

### 4.Nkɔtɔn kɔ abɔnten

Fa eyi sie sɛ: `history.graphql`:

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

Gyae nea ɛwɔ hɔ no ma. `height` Sɛ w'ani nnye ho a, yɛ saa. Ɛkyerɛ sɛ nea ɛkyɛn so biara wɔ hɔ enti forum no nhwɛsoɔ yi bɛtumi ayɛ biribi de akyerɛ wo kwan mu yie paa. `height: 3000000` Ɔma biribiara a ɛwɔ saa ɔfasu no anim gu hɔ.

Fa no sɛ JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Ɛsɛ sɛ adwuma biara kyerɛ ka a ɛboro 0, gye sika ho akatua to nkyɛn. Sɛ obi da no adi sε ɔrennya ne nyinaa mu mfasoɔ, na ɔde n'ani si so dua sԑ ɔwɔ biribi wɔ hɔ a obetumi de ayɛ adwuma ama afoforo anaa? `"fee": "0"` Zkool twe dwumadie no nyinaa baako biara akyi, na sɛ biribi sa a, etumi ma akae. Sɛ yɛkyerɛ nea ɛka ho:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Sɛ biribi ba a, san yɛ sync bio wɔ simma kakra akyi na yi firi hɔ.

Afei fa yɛ CSV, ɔfã biara:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Akenkan a efi mu ba no

| Prama | Kyerɛ |
|---|---|
| `value` | Net nsakraeɛ wɔ akontaabuo a ɛwɔ ZEC, fee ka ho. Negative ma wɔde mena. |
| `fee` | Fee wɔ ZEC. Wɔ payments a wo nsa kaa so no, nea ɔde kɔmaa no no tuaa na ɛnyɛ mu `value`. |
| `time` | Siw bere ano wɔ UTC mu, a bere nhyehyɛe agyiraehyɛde biara nni mu |
| `notes` | Nea akontaabu no nyae wɔ saa asɛm yi mu, a nsakrae ka ho. Memos a wɔde kɔmaa wo no wɔ ha. Nsɛm a wɔde hyɛ mu a ɛda adi pefee no nni address biara. |
| `spends` | Akontaabu no ankasa hyɛ no nsow sɛ saa asɛm yi awie |
| `outputs` | Nea asɛm no de kɔmaa: biribiara a ɛda adi pefee, ne sikatua a wɔabɔ ho ban a wɔde kɔ address afoforo a wɔn memos ka ho |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 abɔnten (atua a wotua wɔ), 1 mu (nsesa) |

Zkool app no nso wɔ Export Transactions, Memos ne Notes a ɛwɔ account menu mu, nanso saa nneɛma yi yɛ nkrataa ho ntotosoɔ dudu: sika dodow a w'akyerɛw ato zatoshis so, Unix timestamps, ɛne memo ahorow a ɛda ɔfã foforo bi.

## Nhyehyεe 2: zingo-cli

zingo-cli yɛ Zingo ahyɛdeɛ a ɔde di dwuma wɔ akontabuo so. Wonnye download biara nni, enti wode Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Wohia wo ho mmoa. `nym-proxy` mpo sɛ ɛbɛyɛ sync. zingo-cli 6 ntumi mfa ne ho nka nkrabɔfo biara a onni bi no ho.

Mfiase no, yɛ ma wo wallet a w'atumi ahwɛ so nkutoo na ɛne emu nsɛm nyinaa di nsɛ. Na afei twe ne ho fi mu:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` Ɛbɛyɛ ɔkwan pɔtee bi.
- `--viewkey` ne sɛ, `--birthday` Fa di dwuma bere a w'abɔ wo wallet no. Ma wɔn ho kwan wɔ ɛno akyi.
- zingo-cli fi ase offline wɔ default so. `--server` paw server no na ɛsan nso yɛ wo kwan sɛ wobɛkɔ online.
- Afei, wo nsa bɛka ahyɛnsode no wɔ w'adwumam abakɔsɛm mu. Enti sɛ wuwie a, yi fi hɔ.

Akyiri yi a:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` kenkan nea wɔadi kan ayɛ no bere a wɔnka nkitahodifo no ho.

- `transactions` ma entry baako wɔ transaction biara mu: txid, time (UTC), height, kind (`received`, `sent`, `shield` or `send-to-self`), boɔ, akatua ne nkrataa a ɛfa ho.
- `value_transfers` ma obiako din wɔ ɔfã biara mu, enti sɛ wo de kɔma nnipa baanu a ɛyɛ nsɛm abien na ɛwɔ hɔ. Obiara ne nea ɔde rekɔ no address ne memos.
- `messages` Ɛkyerɛ nkae nsɛm no sɛ JSON.

Nneɛma kakra bi a ɛsɛ sɛ wuhu fa nea ɛfi mu ba ho:

- `transactions` ne sɛ, `value_transfers` print plain text a ɛhwɛ sɛ JSON kakra nanso ɛnyɛ.
- Wɔkyerɛ sika no mu sɛ zatoshis (ZEC 100,000,000 to 1) na emu biara yɛ nea ɛfata. `kind` Ma wo kwan. Sɛ wode ma a, `value` ne nea ɛkɔ maa nnipa foforo, a wɔmmɔ ho ka biara.
- Wɔkyerɛ sɛ "ntumi nyɛ adwuma" wɔ bere a woahyehyɛ sika bi na ɛnyɛ w'ade. Nkrataa nkrataa nko ara na wɔde kyerɛ.
- If the sync fails, the error goes to the terminal, not the file, and zingo-cli still exits normally. Check the terminal before trusting `transactions.txt`.

ɛyawdifo no [saafo boafoɔ](https://github.com/dismad/zingoHelper) a wɔwɔ no bi. `exportToJSON.sh` nkyerɛwee a ɛsakra no `transactions` Wɔkyerɛwee ansa na wɔreyɛ zingo-cli 6, wɔasiesie no ama testnet, wɔde Sapling ne nsɛm a ɛrekɔ so hyɛ baabi sɛ placeholders, na ehia GNU nnwinnade, enti ɛnnyɛ adwuma wɔ macOS. Fa nea ɛde ba yɛ adebɔ ho gyinabea hwɛ mpɛ dodow no ara mu.

## Nea aniwa ntumi nka nkyerɛ wo no

- **Price.** Nnwinnade no mu biara nni ZEC bo wɔ bere a wodi dwuma. Fa fiat values ka ho ankasa.
- *Transparent history, if the key does not include it.** Ɔfã a emu da hɔ wɔ UFVK mu no yɛ nea wohia. [ZIP 316](https://zips.z.cash/zip-0316). ne zingo-cli, `$Z --offline parse_viewkey uview1...` kyerԑ sԑ nkyerԑkyerԑ a ԑkyekyere key pools.
- Sɛ ɛnyɛ sɛ nea ɔde ne ka no de bi hyɛ krataa a wɔde ma mu, ɛnkɔ baabiara.
- **Nsɛm a ɛkɔ akyiri bi.** Adansedie, sika ne nkae no ma wɔde nneɛma a wɔabɔ ho ban na ɛsan nya denam anoa so. Akwanhosan betumi ayɛ adwuma ama ɛnyɛ yiye nanso pii ntumi nyɛ saa.

## Nnwinnade afoforo a ɛwɔ hɔ

| Akadeɛ | Nea wunya |
|---|---|
| ZODL | Tow CSV a ɛwɔ nna, sika dodow, sika a wɔbɔ ne tag. Kalenda afe a atwam nkutoo, skips shielding transactions, txid, memo anaa address biara nni hɔ. |
| Zkool app a wɔde di dwuma | Raw table exports fi akontaabu menu no mu |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Imports a UFVK ne `importvk`. `listreceived` wɔ RPC sanba so nsa kaa nsɛm a wɔakyerɛw a txid ne memo wom, nanso wɔmfa nkɔma na wontua hwee. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` yɛ nsɛm a ɛkɔ akyiri nanso wɔahyɛ no agyirae sɛ ɛyɛ sɔhwɛ, na Zallet de Sapling viewing keys nkutoo na ɛba, ɛnyɛ UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Imports a UFVK ne `wallet init-fvk`, enneɛ `wallet list-tx`. Ne CSV mode no nni txid anaa address biara, na adwuma no ka sɛ ɛnsɛ sɛ wɔde di dwuma wɔ production mu. |

## Nsɛm a ɛfa ho

- [Ɔhwɛfoɔ Nsaano Hwehwɛbea](/zcash-tech/viewing-keys)
- [Sika a wɔsan de ba no ho ka](/using-zcash/recovering-funds)
- [Zingolib ne Zaino Nkyerɛkyerɛmu](/guides/zingolib-and-zaino-tutorial)
- [Nhyiamu: Dodow a wɔde trɛw dwumadie no mu kɔ JSON/CSV firi UFVK/seed so.](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Dwumadibea: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [Frɛ no sɛ Readme.](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
