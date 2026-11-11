<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mbupụ Akụkọ Azụmahia site na Viewing Key

Ọtụtụ mbupụ e-akpa ego [wallet] dị ntakịrị. Dịka ọmụmaatụ, mbupụ ụtụ isi nke ZODL na-enye gị ụbọchị, ego ole, na ugwo [fees] maka afọ kalenda gara aga, ma ọ naghị enye ID Azụmahia [transaction], memo, ma ọ bụ Adreesị akpa ego [addresses]. Nke ahụ ezughị maka idebe akwụkwọ ego, ịlele mbugharị e-akpa ego, ma ọ bụ ịchọpụta ihe mere n'otu Kwụọ ụhwọ [payment].

Ị chọghị Mkpuru mgbake [seed phrase] gị iji hụ nkọwa zuru ezu. Unified full viewing key (UFVK, na-amalite na `uview1`) nwere ike ịhụ Azụmahia ọ bụla na-abata na nke na-apụ n'ime akaụntụ, ngwá ọrụ [tools] abụọ nwekwara ike ime ka nke a bụrụ faịlụ ị na-edobe: sava GraphQL nke Zkool na zingo-cli. Ntuziaka a na-achịkọta ụzọ ndị dị na [mkparịta ụka forum a](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) ma na-emelite ha maka nsụgharị dị ugbu a.

A nwalere ya na Septemba 2026 na Zkool 6.30.0 na zingo-cli sitere na zingolib 6.0.0.

## Tupu ịmalite

Ị chọrọ ihe abụọ:

1. **UFVK** maka akaụntụ ahụ. [Viewing Keys](/zcash-tech/viewing-keys) na-akọwa ihe ọ na-ekpughe na otu esi ebupụ otu.
2. **Ogologo ọmụmụ**, ya bụ block [block] a ga-amalite nyocha site na ya. Jiri ogo dị tupu Azụmahia mbụ gị. Ọ bụrụ na ịtọọ ya elu nke ukwuu, akụkọ ochie ga-efu nwayọ nwayọ. Ọ bụrụ na ịtọọ ya ala nke ukwuu, nyocha ahụ ga-ewe ogologo oge karịa. Mmegharị Sapling (419200) na-adị mma mgbe niile ma o nwere ike iwe awa iji nyochaa.

## Debe ya na nzuzo

Viewing key enweghị ike imefu ego, mana ọ na-egosi onye ọ bụla jidere ya akụkọ gị dum.

- Etinyela ya na weebụsaịtị ma ọ bụ block explorer. Bubata ya n'ime sọftụwia ị na-agba n'onwe gị.
- Sava ị na-emekọrịta na ya na-ahụ adreesị IP gị na Azụmahia ndị ị na-ebudata nke ọma. Ngwá ọrụ abụọ dị n'okpuru na-enweta Azụmahia gị nke ọ bụla site na ID iji gụọ memo na ugwo, na [ZIP 307](https://zips.z.cash/zip-0307) na-ekwu na nke a na-agwa sava ahụ Azụmahia ndị bụ nke gị. Iji node nke Zebra gị na Zaino ma ọ bụ lightwalletd emekọrịta na-ezere nke ahụ. [Zingolib na Zaino Nkuzi](/guides/zingolib-and-zaino-tutorial) na-akọwa usoro nhazi.
- zingo-cli 6 na-ezipụ Kwụọ ụhwọ site na Nym mixnet, mana mmekọrịta ya ka na-ejikọ na sava ozugbo, ya mere isi okwu dị n'elu metụtara ya kwa.
- Nye ngwá ọrụ ndị a viewing key, ọ bụghị seed. Sava GraphQL nke Zkool enweghị nbanye na ndabara, API ya ga-eweghachikwa seed nke akaụntụ ọ bụla e sitere na otu kee, ma nwee ike izipu ego.
- Debe sava ahụ n'igwe nke gị. Iwu Docker dị n'okpuru na-ege ntị naanị na `127.0.0.1`.
- Ngwá ọrụ abụọ ahụ na-echekwa key na akụkọ gị na-enweghị Nzobe ederede [encryption]. Hichapụ data ọrụ ahụ mgbe ị mechara ma debe mbupụ ahụ n'ebe e zoro ezo.

## Nhọrọ 1: GraphQL nke Zkool

`zkool_graphql` bụ engine e-akpa ego nke Zkool dịka sava nọọrọ onwe ya. Ọ bụ mmemme dị iche na ngwa Zkool. Ụzọ kachasị mfe isi gbaa ya bụ image Docker gọọmenti (amd64 na arm64). E nwekwara binary x86-64 nke Linux na ibe mwepụta [Zkool](https://github.com/hhanh00/zkool2/releases); ọ chọrọ glibc 2.38 ma ọ bụ nke ọhụrụ, yabụ Ubuntu 24.04 na-arụ ọrụ ebe Debian 12 anaghị arụ ọrụ.

### 1. Malite sava ahụ

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ọ na-emekọrịta site na `https://zec.rocks` ma ọ gwụla ma ị tinye `--lwd-url` na sava nke gị. Na mbido mbụ, ọ na-ebudata parampat Sapling (ihe dị ka 50 MB). Ọ bụrụ na nke ahụ ada, `docker start zkool-export` na-agbalị ọzọ.

Mepee `http://127.0.0.1:8000/graphiql` na ihe nchọgharị. Ị nwere ike itinye usoro nke ọ bụla na-esote ebe ahụ ma gbaa ya.

### 2. Bubata key

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

Ọ na-eweghachite ID akaụntụ ọhụrụ ahụ, nke bụ 1 n'ọrụ sava ọhụrụ.

- Tọọ `birth` mgbe niile. Enweghị ya, Zkool na-amalite site na block dị ugbu a ma ọ dịghị achọta ihe ọ bụla.
- `useInternal: true` na-eme ka Zkool lelee Adreesị akpa ego mgbanwe Oha [transparent] kwa. Debe ya maka key sitere na ZODL, otu ntọala ahụ [Iweghachite Ego](/using-zcash/recovering-funds) ji maka seed ZODL.

### 3. Mekọrịta

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Nke a na-agba ruo mgbe mmekọrịta gwụsịrị. Etinyela `fast: true`. Ọ na-awụpụ ibudata Azụmahia zuru ezu, nke bụ ebe memo, ugwo na outputs si abịa.

Nọmba ọ na-eweghachite bụ ogo ọ na-achọ iru, ọ bụghị proof [proof] na ọ ruru ebe ahụ. Njehie netwọk nwere ike ịkwụsị mmekọrịta ahụ n'oge na-enweghị ịkọ ihe ọ bụla, ya mere lelee:

```graphql
{ currentHeight accounts { id name height } }
```

Ọ bụrụ na `height` akaụntụ ahụ dị n'azụ `currentHeight`, gbaa mmekọrịta ahụ ọzọ. Ọ ga-aga n'ihu site n'ebe ọ kwụsịrị.

### 4. Mbupụ

Chekwaa nke a dịka `history.graphql`:

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

Hapụ arụmụka `height` ma ọ gwụla ma ị bu n'obi ya. Ọ na-etinye nke kacha nta, ya mere `height: 3000000` atụ forum ahụ na-ahapụ ihe niile tupu block ahụ.

Nweta ya dịka JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Azụmahia ọ bụla kwesịrị igosi ugwo karịrị 0, ewezuga ụgwọ ọrụ ịgwụputa [mining]. Ọ bụrụ na otu egosi `"fee": "0"` na enweghị memo, nkọwa ya ebudataghị. Zkool na-enweta Azụmahia zuru ezu otu otu mgbe nyocha gasịrị, otu ọdịda na-akwụsịkwa ndị fọdụrụ nwayọ. Iji depụta ndị ọ metụtara:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Ọ bụrụ na ihe ọ bụla apụta, mekọrịta ọzọ ka nkeji ole na ole gachara ma bupụkwa ọzọ.

Mgbe ahụ, mee ya CSV dị larịị, otu ahịrị maka Azụmahia ọ bụla:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Ịgụ ihe mmepụta

| Mpaghara | Ihe ọ pụtara |
|---|---|
| `value` | Mgbanwe net na akaụntụ n'ime ZEC, tinyere ugwo. Ọ dị njọ maka izipu. |
| `fee` | Ugwo n'ime ZEC. N'ahịa ị natara, onye zitere ya kwụrụ ya, ọ nọghị na `value`. |
| `time` | Oge block na UTC, na-enweghị akara mpaghara oge |
| `notes` | Ihe akaụntụ ahụ natara n'Azụmahia a, tinyere mgbanwe. Memo ezitere gị nọ ebe a. Ntinye Oha enweghị adreesị. |
| `spends` | Note [note] nke akaụntụ ahụ ji mee Azụmahia a |
| `outputs` | Ihe Azụmahia ahụ zipụrụ: output Oha ọ bụla, tinyere Kwụọ ụhwọ nke e chebere echebe [shielded] na Adreesị akpa ego ndị ọzọ na memo ha |
| `pool` | 0 Oha, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 mpụga (Kwụọ ụhwọ na-abata), 1 ime (mgbanwe) |

Ngwa Zkool nwekwara Mbupụ Azụmahia, Memo na Notes na menu akaụntụ, mana ndị ahụ bụ raw table dumps: ego n'ime zatoshis, Unix timestamps, na memo n'ime faịlụ dị iche.

## Nhọrọ 2: zingo-cli

zingo-cli bụ e-akpa ego command-line nke Zingo. Enweghị nbudata e wuru mbụ, yabụ ị ji Rust wuo ya:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Ị chọrọ `nym-proxy` ọbụna naanị iji mekọrịta. zingo-cli 6 agaghị ejikọta na sava ọ bụla na-enweghị ya.

Ọgba ọsọ mbụ na-emepụta e-akpa ego naanị maka ilele, na-emekọrịta ya ma na-ebipụta akụkọ:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` ga-abụ ụzọ zuru oke.
- `--viewkey` na `--birthday` na-emetụta naanị mgbe a na-emepụta e-akpa ego. Hapụ ha mgbe nke ahụ gasịrị.
- zingo-cli na-amalite offline na ndabara. `--server` na-ahọrọ sava ahụ ma bụrụkwa nkwenye gị ịga online.
- Key ahụ na-abanye n'akụkọ shell gị, yabụ hichapụ ya emechaa.

Ọgba ọsọ ndị ọzọ:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` na-agụ ihe emekọrịtalarị na-enweghị imetụ netwọk aka.

- `transactions` na-enye otu ntinye maka Azụmahia ọ bụla: txid, oge (UTC), ogo, ụdị (`received`, `sent`, `shield` ma ọ bụ `send-to-self`), uru, ugwo na notes ndị metụtara.
- `value_transfers` na-enye otu ntinye maka Kwụọ ụhwọ ọ bụla, yabụ izigara mmadụ abụọ bụ ntinye abụọ, nke ọ bụla nwere Adreesị akpa ego onye nnata na memo.
- `messages` na-edepụta memo dịka JSON.

Ihe ole na ole ị ga-ama gbasara ihe mmepụta:

- `transactions` na `value_transfers` na-ebipụta ederede nkịtị nke yitere JSON ntakịrị mana ọ bụghị JSON.
- Ego dị na zatoshis (100,000,000 ruo 1 ZEC) ma na-adị mma mgbe niile. `kind` na-agwa gị ntụzịaka. Maka izipu, `value` bụ ihe zigara ndị ọzọ, na-enweghị ugwo.
- Ugwo na-apụta dịka "adịghị" mgbe Azụmahia na-emefu ego Oha na-abụghị nke gị. Naanị memo ederede ka a na-egosi.
- Ọ bụrụ na mmekọrịta ada, njehie ahụ na-aga na terminal, ọ bụghị na faịlụ, ma zingo-cli ka na-apụ n'ụzọ nkịtị. Lelee terminal tupu ịtụkwasị `transactions.txt` obi.

[zingoHelper](https://github.com/dismad/zingoHelper) nke dismad nwere script `exportToJSON.sh` nke na-agbanwe `transactions` ka ọ bụrụ JSON. Edere ya tupu zingo-cli 6, ahaziri ya maka testnet, na-akanye ụfọdụ Sapling na-apụ na ntinye Oha dịka placeholders, ma chọọ GNU tools, yabụ ọ gaghị agba na macOS ọkọlọtọ. Were ihe mmepụta ya dịka ebe mmalite ma lelee nchịkọta ego.

## Ihe viewing key enweghị ike ịgwa gị

- **Ọnụahịa.** Ngwá ọrụ abụọ ahụ anaghị edekọ ọnụahịa ZEC n'oge Azụmahia ọ bụla. Tinye uru fiat n'onwe gị.
- **Akụkọ Oha, ma ọ bụrụ na key enweghị ya.** Akụkụ Oha nke UFVK bụ nhọrọ n'okpuru [ZIP 316](https://zips.z.cash/zip-0316). Site na zingo-cli, `$Z --offline parse_viewkey uview1...` na-egosi pool [pool] ndị key na-ekpuchi.
- **Onye kwụrụ gị.** Kwụọ ụhwọ nke e chebere echebe anaghị ebu Adreesị akpa ego onye zitere ya. Ma ọ bụrụ na onye zitere ya etinyeghị otu na memo, ọ nọghị ebe ọ bụla.
- **Ụfọdụ nkọwa na-apụ.** A na-enweta Adreesị akpa ego ebe a na-eziga, ego ole na memo maka izipu nke e chebere echebe site n'iji key decrypt. E-akpa ego nwere ike iwube Azụmahia nke na-agaghị ekwe omume, agbanyeghị ọtụtụ anaghị eme ya.

## Ngwá ọrụ ndị ọzọ

| Ngwá ọrụ | Ihe ị na-enweta |
|---|---|
| ZODL | CSV ụtụ isi nwere ụbọchị, ego, ugwo na tag. Naanị afọ kalenda gara aga, na-awụpụ Azụmahia shielding, enweghị txid, memo ma ọ bụ adreesị. |
| ngwa Zkool | Mbupụ raw table sitere na menu akaụntụ |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Na-ebubata UFVK na `importvk`. `listreceived` site na RPC na-eweghachite notes natara nwere txid na memo, mana enweghị izipu na ugwo. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` zuru ezu mana akara ya bụ experimental, na Zallet na-ebubata naanị viewing key Sapling, ọ bụghị UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Na-ebubata UFVK na `wallet init-fvk`, emesịa `wallet list-tx`. Ụdị CSV ya enweghị txid ma ọ bụ adreesị, ọrụ ahụ na-ekwukwa ka ị ghara iji ya na production. |

## Njikọ ndị metụtara

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Iweghachite Ego](/using-zcash/recovering-funds)
- [Zingolib na Zaino Nkuzi](/guides/zingolib-and-zaino-tutorial)
- [Forum: Mbupụ akụkọ Azụmahia na JSON/CSV site na UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
