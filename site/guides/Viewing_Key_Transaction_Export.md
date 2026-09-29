<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporting Transaction History from a Viewing Key

Most wallet exports are thin. ZODL's tax export, for example, gives you dates, amounts and fees for the previous calendar year, but no transaction IDs, no memos and no addresses. That isn't enough for bookkeeping, for checking a wallet migration, or for working out what happened to a payment.

You don't need your seed phrase to get the full picture. A unified full viewing key (UFVK, starting `uview1`) can see every incoming and outgoing transaction in an account, and two tools can turn that into a file you keep: the Zkool GraphQL server and zingo-cli. This guide collects the approaches from [this forum thread](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) and updates them for current releases.

Tested in September 2026 with Zkool 6.30.0 and zingo-cli from zingolib 6.0.0.

## Before you start

You need two things:

1. **The UFVK** for the account. [Viewing Keys](/zcash-tech/viewing-keys) explains what it reveals and how to export one.
2. **A birth height**, the block to start scanning from. Use a height from before your first transaction. Set it too high and older history is silently missing. Set it too low and the scan just takes longer. Sapling activation (419200) is always safe but can take hours to scan.

## Keep it private

A viewing key can't spend, but it shows your whole history to whoever holds it.

- Don't paste it into a website or block explorer. Import it into software you run yourself.
- The server you sync from sees your IP address and which transactions you download in full. Both tools below fetch each of your transactions by ID to read memos and fees, and [ZIP 307](https://zips.z.cash/zip-0307) notes that this tells the server which transactions are yours. Syncing from your own Zebra node with Zaino or lightwalletd avoids that. The [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) walks through a setup.
- zingo-cli 6 sends payments over the Nym mixnet, but its sync still connects to the server directly, so the point above applies to it too.
- Give these tools a viewing key, never a seed. The Zkool GraphQL server has no login by default, and its API will hand back the seed of any account created from one, and can send funds.
- Keep the server on your own machine. The Docker command below only listens on `127.0.0.1`.
- Both tools store the key and your history unencrypted. Delete the working data when you're done and keep the export somewhere encrypted.

## Option 1: Zkool GraphQL

`zkool_graphql` is Zkool's wallet engine as a standalone server. It's a separate program from the Zkool app. The simplest way to run it is the official Docker image (amd64 and arm64). There's also a Linux x86-64 binary on the [Zkool releases page](https://github.com/hhanh00/zkool2/releases); it needs glibc 2.38 or newer, so Ubuntu 24.04 works and Debian 12 doesn't.

### 1. Start the server

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

It syncs from `https://zec.rocks` unless you add `--lwd-url` with your own server. On first start it downloads the Sapling parameters (about 50 MB). If that fails, `docker start zkool-export` tries again.

Open `http://127.0.0.1:8000/graphiql` in a browser. You can paste each of the next steps there and run it.

### 2. Import the key

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

It returns the new account's ID, which is 1 on a fresh server.

- Always set `birth`. Without it Zkool starts from the current block and finds nothing.
- `useInternal: true` makes Zkool check transparent change addresses too. Keep it on for keys from ZODL, the same setting [Recovering Funds](/using-zcash/recovering-funds) uses for ZODL seeds.

### 3. Sync

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

This runs until the sync ends. Don't add `fast: true`. It skips downloading the full transactions, which is where memos, fees and outputs come from.

The number it returns is the height it was aiming for, not proof it got there. A network error can end the sync early without reporting anything, so check:

```graphql
{ currentHeight accounts { id name height } }
```

If the account's `height` is behind `currentHeight`, run the sync again. It carries on from where it stopped.

### 4. Export

Save this as `history.graphql`:

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

Leave out the `height` argument unless you mean it. It sets a minimum, so the forum example's `height: 3000000` drops everything before that block.

Fetch it as JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Every transaction should show a fee above 0, mining rewards aside. If one shows `"fee": "0"` and no memo, its details didn't download. Zkool fetches the full transactions one at a time after the scan, and one failure quietly stops the rest. To list any affected:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

If anything shows up, sync again a few minutes later and export again.

Then flatten it to CSV, one row per transaction:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Reading the output

| Field | Meaning |
|---|---|
| `value` | Net change to the account in ZEC, fee included. Negative for sends. |
| `fee` | Fee in ZEC. On payments you received, the sender paid it and it isn't in `value`. |
| `time` | Block time in UTC, without a timezone marker |
| `notes` | What the account received in this transaction, including change. Memos sent to you are here. Transparent entries have no address. |
| `spends` | The account's own notes that this transaction used up |
| `outputs` | What the transaction sent out: every transparent output, plus shielded payments to other addresses with their memos |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 external (a payment in), 1 internal (change) |

The Zkool app also has Export Transactions, Memos and Notes in the account menu, but those are raw table dumps: amounts in zatoshis, Unix timestamps, and memos in a separate file.

## Option 2: zingo-cli

zingo-cli is Zingo's command-line wallet. There are no prebuilt downloads, so you build it with Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

You need `nym-proxy` even just to sync. zingo-cli 6 won't connect to any server without it.

The first run creates a view-only wallet, syncs it and prints the history:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` must be an absolute path.
- `--viewkey` and `--birthday` only apply when the wallet is created. Leave them out after that.
- zingo-cli starts offline by default. `--server` picks the server and also counts as your consent to go online.
- The key ends up in your shell history, so clear it afterwards.

Later runs:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` reads what's already synced without touching the network.

- `transactions` gives one entry per transaction: txid, time (UTC), height, kind (`received`, `sent`, `shield` or `send-to-self`), value, fee and the notes involved.
- `value_transfers` gives one entry per payment, so a send to two people is two entries, each with the recipient address and memos.
- `messages` lists memos as JSON.

A few things to know about the output:

- `transactions` and `value_transfers` print plain text that looks a bit like JSON but isn't.
- Amounts are in zatoshis (100,000,000 to 1 ZEC) and always positive. `kind` tells you the direction. For sends, `value` is what went to other people, without the fee.
- The fee shows as "not available" when a transaction spends transparent funds that weren't yours. Only text memos are shown.
- If the sync fails, the error goes to the terminal, not the file, and zingo-cli still exits normally. Check the terminal before trusting `transactions.txt`.

dismad's [zingoHelper](https://github.com/dismad/zingoHelper) has an `exportToJSON.sh` script that converts `transactions` to JSON. It was written before zingo-cli 6, is set up for testnet, marks some outgoing Sapling and transparent entries as placeholders, and needs GNU tools, so it won't run on stock macOS. Treat its output as a starting point and check the totals.

## What a viewing key can't tell you

- **Prices.** Neither tool records a ZEC price at the time of each transaction. Add fiat values yourself.
- **Transparent history, if the key doesn't include it.** The transparent part of a UFVK is optional under [ZIP 316](https://zips.z.cash/zip-0316). With zingo-cli, `$Z --offline parse_viewkey uview1...` shows which pools a key covers.
- **Who paid you.** Shielded payments don't carry the sender's address. Unless the sender put one in the memo, it isn't anywhere.
- **Some outgoing details.** Destination address, amount and memo for shielded sends are recovered by decrypting with the key. A wallet can build a transaction so that isn't possible, though most don't.

## Other tools

| Tool | What you get |
|---|---|
| ZODL | Tax CSV with dates, amounts, fees and a tag. Previous calendar year only, skips shielding transactions, no txid, memo or address. |
| Zkool app | Raw table exports from the account menu |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Imports a UFVK with `importvk`. `listreceived` over RPC returns received notes with txid and memo, but no sends and no fees. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` is detailed but marked experimental, and Zallet only imports Sapling viewing keys, not UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Imports a UFVK with `wallet init-fvk`, then `wallet list-tx`. Its CSV mode has no txid or address, and the project says not to use it in production. |

## Related

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Exporting transaction history to JSON/CSV from UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
