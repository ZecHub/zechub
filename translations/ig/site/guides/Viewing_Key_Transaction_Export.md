<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporting Transaction History from a Viewing Key

Most wallet exports are thin. ZODL's tax export, for example, gives you dates, amounts and fees for the previous calendar year, but no transaction IDs, no memos and no addresses. That isn't enough for bookkeeping, for checking a wallet migration, or for working out what happened to a payment.

Ị adịghị mkpa mkpụrụ okwu gị iji nweta foto zuru ezu. a n'otu full ikiri igodo (UFVK, malite na `uview1`) can see every incoming and outgoing transaction in an account, and two tools can turn that into a file you keep: the Zkool GraphQL server and zingo-cli. This guide collects the approaches from [isiokwu a na-ekwu okwu ya bụ:](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) na emelite ha maka ntọhapụ ndị dị ugbu a.

A nwalere ya na Septemba 2026 site n'iji Zkool 6.30.0 na zingo-cli si zingolib 6.0.0.

## Tupu ị malite .

Ihe abụọ dị gị mkpa:

1. ** UFVK** maka akaụntụ ahụ. [Igodo Nlele](/zcash-tech/viewing-keys) na-akọwa ihe ọ ga-ekpughe nakwa etu esi ebupụ otu.
2. **A birth height**, the block to start scanning from. Jiri a elu si tupu gị mbụ azụmahịa. Tọọ ya kwa elu na okenye akụkọ ihe mere eme bụ silently efu. Tọgharịa ya ala ma iṅomi dị nnọọ ewe ogologo oge. Sapling ebighị (419200) mgbe niile mma ma nwere ike iri awa ka iṅomie.

## Mee ka ọ bụrụ ihe nzuzo .

Igodo nlele enweghị ike imefu ego, mana ọ na-egosi akụkọ ihe mere eme gị dum nye onye ọbụla ji ya.

- Etinyela ya na webụsaịtị maọbụ ihe nchọpụta ngọngọ. Bubata ya n'ime sọftụwia ị ji aka gị rụọ ọrụ.
- The server you sync from sees your IP address and which transactions you download in full. Both tools below fetch each of your transactions by ID to read memos and fees, and [ZIP 307 Ụlọ Ọrụ Na-ezipụ Akwụkwọ](https://zips.z.cash/zip-0307) notes that this tells the server which transactions are yours. Syncing from your own Zebra node with Zaino or lightwalletd avoids that. The [Zingolib na Zaino Nkuzi](/guides/zingolib-and-zaino-tutorial) na-agagharị site n'otu ihe e mere.
- zingo-cli 6 na eziga ịkwụ ụgwọ site n'aka Nym mixnet, mana mmekọrịta ya ka jikọtara ya na sava ahụ ozugbo, yabụ isi ihe dị n'elu metụtara ya.
- Nye ngwaọrụ ndị a igodo nlele, ọ bụghị mkpụrụ. Ihe nkesa Zkool GraphQL enweghị ntinye aka na ndabara, API ya ga-enyeghachi mkpụrụ nke akaụntụ ọ bụla e kere site na otu, ma nwee ike izipu ego.
- Debe ihe nkesa na igwe nke gị. Iwu Docker n'okpuru naanị ege ntị na `127.0.0.1`.
- Ngwaọrụ abụọ ahụ na-echekwa igodo gị na akụkọ ihe mere eme nke ọma. Hichapụ data ọrụ mgbe ị mechara ma debe mbupụ ebe ezoro ezo.

## Nhọrọ 1: Zkool GraphQL

`zkool_graphql` is Zkool's wallet engine as a standalone server. It's a separate program from the Zkool app. The simplest way to run it is the official Docker image (amd64 and arm64). There's also a Linux x86-64 binary on the [Zkool wepụtara peeji ya.](https://github.com/hhanh00/zkool2/releases); ọ chọrọ glibc 2.38 maọbụ nke ọhụrụ, ya mere Ubuntu 24.04 na-arụ ọrụ Debian 12 adịghị arụ.

### 1. Bido ihe nkesa ahụ.

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ọ na-agbakọ site n'aka: `https://zec.rocks` ọ gwụla ma ị gbakwunye `--lwd-url` with your own server. On first start it downloads the Sapling parameters (about 50 MB). If that fails, `docker start zkool-export` nwaa ọzọ.

Mepee ya . `http://127.0.0.1:8000/graphiql` Ị nwere ike ịtinye nke ọ bụla n'ime nzọụkwụ ndị ọzọ ebe ahụ ma gbaa ya.

### 2. Ịkpọbata igodo ahụ n'ime ụlọ gị

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

Ọ na-eweghachi ID nke akaụntụ ọhụrụ, bụ 1 n'elu ihe nkesa dị ọhụrụ.

- Na-edozi mgbe niile. `birth`. Ọ bụrụ na o nweghị ya Zkool ga-amalite n'ụlọ ahụ ọ nọ ugbu a ma hụ ihe niile.
- `useInternal: true` na-eme ka Zkool nyochaa mgbanwe adreesị doro anya. Debe ya maka igodo sitere na ZODL, otu ntọala ahụ [Nkwụghachi Ego Ndị E Nwere n'Ụlọ Ọrụ Ahụ](/using-zcash/recovering-funds) eji maka mkpụrụ ZODL.

### 3. Nkọwapụta

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Nke a na-agba ruo mgbe sync gafere. Ejikwala ya tinye ihe ọ bụla ọzọ n'ime usoro ahụ ma ọ bụ nke gị. `fast: true`Ọ na-agbada nbudata azụmahịa zuru ezu, nke bụ ebe memos, ụgwọ na mmepụta si abịa.

The number it returns is the height it was aiming for, not proof it got there. A network error can end the sync early without reporting anything, so check:

```graphql
{ currentHeight accounts { id name height } }
```

Ọ bụrụ na akaụntụ ahụ bụ `height` dị n'azụ. `currentHeight`, na-agba ọsọ sync ọzọ. Ọ gara n'ihu site ebe ọ kwụsịrị.

### 4. Mbupụ ahịa

Chekwaa nke a dị ka: `history.graphql`:

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

Hapụ ihe ndị ahụ. `height` arụmụka ma ọ bụrụ na ị pụtara ya. Ọ setịpụrụ a kacha nta, otú ahụ forum atụ si `height: 3000000` na-atụfu ihe niile tupu a kụọ ya.

Chọta ya dị ka JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

N'ihe ọ bụla azụmahịa kwesịrị igosi a ụgwọ n'elu 0, Ngwuputa ụgwọ ọrụ iche. Ọ bụrụ na otu onye gosiri `"fee": "0"` na enweghị akwụkwọ, nkọwa ya ebughi. Zkool na-ewepụta azụmahịa niile n'otu oge mgbe nyocha ahụ gasịrị, otu ọdịda kwụsịrị ndị ọzọ nwayọ. Iji depụta ihe ọ bụla metụtara:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Ọ bụrụ na ihe ọ bụla apụta, mekọrịta ọzọ mgbe nkeji ole na ole gasịrị ma bupụ ya.

Mgbe ahụ, dozie ya na CSV, otu ahịrị kwa azụmahịa:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Ịgụpụta ihe ọ na-ewepụ.

Ubi. Ihe ọ pụtara bụ...
|---|---|
| `value` ◯ Net mgbanwe na akaụntụ ahụ n'ime ZEC, gụnyere ụgwọ. Negative maka eziga. ❑ Nweta ego site na ịkwụghachi m ụgwọ ndị a kwụrụ gị (ọ bụghị nke e ji akwụ ụgwọ).
| `fee` ◯ Ụgwọ na ZEC. N'ụtụ ị natara, onye zitere ya kwụrụ ụgwọ ma ọ bụghị n'ime ego gị ka e ji akwụ ụtụ isi ahụ. `value`. |
| `time` ◯ Oge mgbochi na UTC, n'enweghị akara mpaghara oge.
| `notes` | What the account received in this transaction, including change. Memos sent to you are here. Transparent entries have no address. |
| `spends` ◯ Ihe ndekọ nke aka gị na azụmahịa a jirila.
| `outputs` ❑ Ihe azụmahịa ahụ zipụrụ: mmepụta ọ bụla na-egosi ihe, tinyere ịkwụ ụgwọ ndị e chebere nye adreesị ọzọ site n'ihe ncheta ha.
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` ◯ 0 mpụga (ịkwụ ụgwọ n'ime), 1 ime ụlọ (mgbanwe) ❑

Ngwa Zkool nwekwara Export Transactions, Memos and Notes na menu akaụntụ ahụ, mana ndị a bụ ihe mkpofu tebụl: ego dị na zatoshis, akara oge Unix, yana memos n'ime faịlụ ọzọ.

## Nhọrọ 2: zingo-cli

zingo-cli bụ obere akpa iwu nke Zingo. Enweghị nbudata ebudatara, yabụ ị na -eji Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

I kwesịrị . `nym-proxy` ọbụna iji mekọrịta. zingo-cli 6 agaghị ejikọta na ihe nkesa ọ bụla n'enweghị ya.

Ntugharị mbụ na-emepụta obere akpa ego, syncs ya ma bipụta akụkọ ihe mere eme:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` ga-abụrịrị ụzọ zuru oke.
- `--viewkey` na nke a: `--birthday` naanị tinye mgbe e kere obere akpa ahụ. Hapụ ha ka emechara ya.
- zingo-cli na amalite offline site n'echiche. `--server` na-ahọrọ ihe nkesa ahụ ma gụnye ya dịka ikike gị ịbanye n'ịntanetị.
- Igodo ahụ na-agwụ n'akụkọ ihe mere eme gị, yabụ kpochapụ ya mgbe emesịrị.

Ọ na-agba ọsọ n'oge ọzọ:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` na-agụ ihe a jikọtarala n'emeghị ka netwọk ahụ metụ.

- `transactions` na-enye otu ntinye kwa azụmahịa: txid, oge (UTC), elu, ụdị (`received`, `sent`, `shield` or `send-to-self`), uru, ụgwọ na akwụkwọ ndị metụtara.
- `value_transfers` na-enye otu ntinye kwa ịkwụ ụgwọ, yabụ iziga mmadụ abụọ bụ ihe ndekọ abụọ, nke ọ bụla nwere adreesị onye nnata yana memos.
- `messages` na-edepụta memos dị ka JSON.

Ihe ole na ole ị ga-ama gbasara mmepụta:

- `transactions` na nke a: `value_transfers` bipụta ederede nkịtị nke yiri ntakịrị JSON mana ọ bụghị.
- Ọnụ ego ndị ahụ dị na zatoshis (100,000,000 ruo 1 ZEC) ma bụrụkwa nke ziri ezi mgbe nile. `kind` Ọ na-agwa gị ebe ị ga. Maka izipu, `value` bụ ihe ndị ọzọ nwetara, na-enweghị ego.
- A na-egosi ụgwọ ahụ dị ka "adịghị adị" mgbe azụmahịa jiri ego doro anya nke abụghị gị. Naanị ederede edetu gosipụtara.
- Ọ bụrụ na sync ada, njehie ahụ ga-aga n'ọnụ ụzọ ọ bụghị faịlụ ahụ ma zingo-cli ka na-apụ apụ. Lelee ọnụ tupu ịtụkwasị obi `transactions.txt`.

nke dismad's [Onye enyemaka ZongoHelper](https://github.com/dismad/zingoHelper) nwere a `exportToJSON.sh` edemede nke na-agbanwe agbanwe `transactions` edere ya tupu zingo-cli 6, a haziri maka testnet, akara ụfọdụ Sapling na ntinye uzo dị ka ebe nchekwa, ma chọọ ngwaọrụ GNU, n'ihi ya ọ gaghị agba ọsọ na ngwaahịa macOS. Na -emeso mmepụta ya dịka mmalite wee lelee mkpokọta ahụ.

## Ihe igodo nlele apụghị ịgwa gị.

- ** Ọnụahịa.** Ọ dịghị ngwá ọrụ ọ bụla na-edekọ ọnụ ahịa ZEC n'oge azụmahịa nke ọ bụla. Tinye fiat ụkpụrụ onwe gị.
- ** Transparent akụkọ ihe mere eme, ma ọ bụrụ na igodo adịghị agụnye ya.** The uzo akụkụ nke a UFVK bụ nhọrọ n'okpuru [ZIP 316  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0316). na zingo-cli, `$Z --offline parse_viewkey uview1...` na-egosi nke ọdọ mmiri a isi ekpuchi.
- **Onye kwụrụ gị ụgwọ.** Ịkwụ ụgwọ ndị e chebere adịghị ebu adres onye zitere ya. Ọ gwụla ma onye ahụ ziteworo tinye otu na memo, ọ dịghị ebe ọ bụla.
- ** Ụfọdụ nkọwapụta na-apụ apụ.** Adreesị ebe, ego na memo maka izipu ezoro ezo ka a ga - eweghachite site n'iji igodo ahụ mepee. Akpaego nwere ike iwulite azụmahịa nke mere na ọ gaghị ekwe omume, ma ọtụtụ anaghị eme ya.

## Ngwá ọrụ ndị ọzọ

Ngwá ọrụ. Ihe ị nwetara.
|---|---|
ZODL CSV ụtụ isi na ụbọchị, ego, ụgwọ na mkpado. Afọ kalenda gara aga naanị, gafere azụmahịa mkpuchi, enweghị txid, memo ma ọ bụ adreesị.
Ngwa Zkool. Ihe nchekwa data na-ebupụ site na menu akaụntụ ahụ.
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) Na-ebubata UFVK na ihe nchọgharị weebụ. `importvk`. `listreceived` over RPC returns received notes with txid and memo, but no sends and no fees. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` bụ nkọwa ma akara ule, na Zallet naanị mbubata Sapling ele igodo, ọ bụghị UFVKs.
| [zcash-devtool](https://github.com/zcash/zcash-devtool) Na-ebubata UFVK na ihe nchọgharị weebụ. `wallet init-fvk`, mgbe ahụ . `wallet list-tx`. Ọnọdụ CSV ya enweghị txid ma ọ bụ adreesị, na oru ngo ahụ kwuru ka ị ghara iji ya mee ihe. 

## Ihe ndị metụtara ya

- [Igodo Nlele](/zcash-tech/viewing-keys)
- [Nkwụghachi Ego Ndị E Nwere n'Ụlọ Ọrụ Ahụ](/using-zcash/recovering-funds)
- [Zingolib na Zaino Nkuzi](/guides/zingolib-and-zaino-tutorial)
- [Forum: Ịbupụ akụkọ azụmahịa na JSON/CSV site UFVK/mkpụrụ.](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Ebe a na-ekwu okwu: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
