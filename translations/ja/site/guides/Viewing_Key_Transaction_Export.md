<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key から取引履歴をエクスポートする

ほとんどのウォレットのエクスポートは情報が限定的です。たとえばZODLの税務用エクスポートでは、前年の暦年における日付、金額、手数料は得られますが、トランザクションID、メモ、アドレスは含まれません。これは帳簿管理、ウォレット移行の確認、支払いで何が起きたかの把握には不十分です。

全体像を把握するためにシードフレーズは必要ありません。統合フルビューイングキー（UFVK、`uview1`で始まる）はアカウント内のすべての受信・送信トランザクションを確認でき、2つのツールでそれを保存可能なファイルに変換できます。Zkool GraphQLサーバーとzingo-cliです。このガイドでは、[このフォーラムスレッド](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)の手法をまとめ、現在のリリース向けに更新しています。

2026年9月に、Zkool 6.30.0およびzingolib 6.0.0のzingo-cliでテストしました。

## 始める前に

必要なものは2つです。

1. **アカウントのUFVK**。[ビューイングキー](/zcash-tech/viewing-keys)では、キーで何が見えるか、およびエクスポート方法を説明しています。
2. **誕生ブロック高**。スキャンを開始するブロックです。最初のトランザクションより前のブロック高を使用してください。高すぎる値を設定すると、古い履歴が通知なく欠落します。低すぎる値を設定すると、スキャンに時間がかかるだけです。Saplingの有効化（419200）は常に安全ですが、スキャンには数時間かかる場合があります。

## プライバシーを守る

ビューイングキーでは支出できませんが、それを持つ人にはあなたの全履歴が見えます。

- ウェブサイトやブロックエクスプローラーに貼り付けないでください。自分で実行するソフトウェアへインポートしてください。
- 同期先のサーバーには、あなたのIPアドレスと、完全にダウンロードするトランザクションが見えます。以下の両ツールは、メモと手数料を読むために各トランザクションをIDで取得します。[ZIP 307](https://zips.z.cash/zip-0307)では、これによりサーバーはどのトランザクションがあなたのものか把握できると指摘しています。ZebraノードをZainoまたはlightwalletdとともに自分で運用して同期すれば、これを回避できます。[Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)では、その設定方法を説明しています。
- zingo-cli 6はNym mixnet経由で支払いを送信しますが、同期では依然としてサーバーに直接接続するため、上記の点はこれにも当てはまります。
- これらのツールにはビューイングキーだけを渡し、シードは絶対に渡さないでください。Zkool GraphQLサーバーにはデフォルトでログイン機能がなく、そのAPIはシードから作成されたアカウントのシードを返すことができ、資金も送信できます。
- サーバーは自分のマシン上に置いてください。以下のDockerコマンドは`127.0.0.1`でのみ待ち受けます。
- 両ツールはキーと履歴を暗号化せずに保存します。完了後は作業データを削除し、エクスポートは暗号化された場所に保管してください。

## オプション1: Zkool GraphQL

`zkool_graphql`は、Zkoolのウォレットエンジンをスタンドアロンサーバーとして提供するものです。Zkoolアプリとは別のプログラムです。実行する最も簡単な方法は、公式Dockerイメージ（amd64およびarm64）です。[Zkoolリリースページ](https://github.com/hhanh00/zkool2/releases)にはLinux x86-64バイナリーもあります。ただしglibc 2.38以降が必要なので、Ubuntu 24.04では動作しますがDebian 12では動作しません。

### 1. サーバーを起動する

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

`--lwd-url`で自分のサーバーを追加しない限り、`https://zec.rocks`から同期します。初回起動時には、Saplingパラメータ（約50 MB）をダウンロードします。失敗した場合、`docker start zkool-export`が再試行します。

ブラウザーで`http://127.0.0.1:8000/graphiql`を開いてください。そこで次の各ステップを貼り付けて実行できます。

### 2. キーをインポートする

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

新しいアカウントのIDが返されます。新しいサーバーでは1です。

- 必ず`birth`を設定してください。これがないと、Zkoolは現在のブロックから開始し、何も見つけられません。
- `useInternal: true`により、Zkoolは透明な変更アドレスも確認します。ZODL由来のキーでは有効のままにしてください。これは[資金の復旧](/using-zcash/recovering-funds)がZODLシードに使用するのと同じ設定です。

### 3. 同期する

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

これは同期が終了するまで実行されます。`fast: true`は追加しないでください。これを追加すると完全なトランザクションのダウンロードを省略しますが、メモ、手数料、出力はそこから得られます。

返される数値は目標としていたブロック高であり、そこまで到達した証拠ではありません。ネットワークエラーにより、何も報告されずに同期が早期終了することがあるため、次で確認してください。

```graphql
{ currentHeight accounts { id name height } }
```

アカウントの`height`が`currentHeight`より遅れている場合は、再度同期を実行してください。停止した場所から続行されます。

### 4. エクスポートする

これを`history.graphql`として保存します。

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

意図している場合を除き、`height`引数は省いてください。これは最小値を設定するため、フォーラムの例にある`height: 3000000`では、そのブロック以前のすべてが除外されます。

JSONとして取得します。

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

採掘報酬を除き、すべてのトランザクションには0より大きい手数料が表示されるはずです。いずれかが`"fee": "0"`でメモもない場合、その詳細はダウンロードされていません。Zkoolはスキャン後に完全なトランザクションを1件ずつ取得しますが、1件の失敗で残りは通知なく停止します。影響を受けたものを一覧表示するには、次を実行します。

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

何か表示された場合は、数分後に再度同期し、再度エクスポートしてください。

次に、トランザクションごとに1行となるCSVへフラット化します。

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### 出力の読み方

| フィールド | 意味 |
|---|---|
| `value` | 手数料を含む、ZECにおけるアカウントの純増減です。送信時は負の値です。 |
| `fee` | ZECでの手数料です。受け取った支払いでは送信者がこれを支払っており、`value`には含まれません。 |
| `time` | タイムゾーン表示のないUTCのブロック時刻 |
| `notes` | 変更分を含め、このトランザクションでアカウントが受け取ったものです。自分宛てのメモはここにあります。透明なエントリーにはアドレスがありません。 |
| `spends` | このトランザクションで使い切られた、アカウント自身のノート |
| `outputs` | トランザクションが送信したものです。すべての透明な出力に加え、メモ付きの他アドレスへのシールド支払いです。 |
| `pool` | 0は透明、1はSapling、2はOrchard、3はIronwood |
| `scope` | 0は外部（受け取り）、1は内部（変更分） |

Zkoolアプリにもアカウントメニューに「取引」「メモ」「ノート」のエクスポートがありますが、これらは生のテーブルダンプです。金額はzatoshi、時刻はUnixタイムスタンプで、メモは別ファイルになります。

## オプション2: zingo-cli

zingo-cliはZingoのコマンドラインウォレットです。ビルド済みダウンロードはないため、Rustでビルドします。

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

同期だけを行う場合でも`nym-proxy`が必要です。zingo-cli 6は、これなしではどのサーバーにも接続しません。

最初の実行では、閲覧専用ウォレットを作成し、同期して履歴を出力します。

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir`は絶対パスでなければなりません。
- `--viewkey`と`--birthday`は、ウォレット作成時にのみ適用されます。その後は省いてください。
- zingo-cliはデフォルトでオフライン起動します。`--server`はサーバーを選択し、オンライン接続への同意としても扱われます。
- キーはシェル履歴に残るため、後で消去してください。

以降の実行:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`は、ネットワークに接続せず、すでに同期済みの内容を読み取ります。

- `transactions`はトランザクションごとに1エントリーを提供します。txid、時刻（UTC）、ブロック高、種類（`received`、`sent`、`shield`、または`send-to-self`）、値、手数料、および関係するノートです。
- `value_transfers`は支払いごとに1エントリーを提供します。そのため、2人への送信は受取人アドレスとメモを含む2エントリーになります。
- `messages`はメモをJSONとして一覧表示します。

出力について知っておくべき点がいくつかあります。

- `transactions`と`value_transfers`は、JSONに少し似ているもののJSONではないプレーンテキストを出力します。
- 金額はzatoshi（1 ZECあたり100,000,000）で、常に正の値です。`kind`が方向を示します。送信の場合、`value`は手数料を除き、他の人へ送られた額です。
- 自分のものではない透明資金をトランザクションが使用すると、手数料は「not available」と表示されます。表示されるのはテキストメモのみです。
- 同期に失敗した場合、エラーはファイルではなくターミナルに出力され、それでもzingo-cliは正常終了します。`transactions.txt`を信頼する前にターミナルを確認してください。

dismadの[zingoHelper](https://github.com/dismad/zingoHelper)には、`transactions`をJSONに変換する`exportToJSON.sh`スクリプトがあります。これはzingo-cli 6より前に書かれたもので、testnet向けに設定されており、一部の送信Saplingおよび透明なエントリーをプレースホルダーとして扱います。またGNUツールが必要なため、標準のmacOSでは実行できません。出力は出発点として扱い、合計を確認してください。

## ビューイングキーでわからないこと

- **価格。**どちらのツールも、各トランザクション時点のZEC価格を記録しません。法定通貨の値は自分で追加してください。
- **キーに含まれていない場合の透明な履歴。**UFVKの透明部分は[ZIP 316](https://zips.z.cash/zip-0316)では任意です。zingo-cliでは、`$Z --offline parse_viewkey uview1...`によりキーが対象とするプールを表示できます。
- **誰が支払ったか。**シールド支払いには送信者のアドレスは含まれません。送信者がメモに記載していない限り、どこにもありません。
- **一部の送信詳細。**シールド送信の宛先アドレス、金額、メモは、キーで復号して復元されます。ただし、ウォレットはそれが不可能なトランザクションを作成でき、ほとんどはそうしません。

## その他のツール

| ツール | 得られるもの |
|---|---|
| ZODL | 日付、金額、手数料、タグを含む税務用CSV。前年の暦年のみで、シールディングトランザクションは除外され、txid、メモ、アドレスはありません。 |
| Zkoolアプリ | アカウントメニューからの生テーブルエクスポート |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk`でUFVKをインポートします。RPC経由の`listreceived`は、txidとメモを含む受信ノートを返しますが、送信と手数料は返しません。 |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions`は詳細ですが実験的と記されており、ZalletはUFVKではなくSaplingビューイングキーのみをインポートします |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk`でUFVKをインポートしてから、`wallet list-tx`を実行します。CSVモードにはtxidやアドレスがなく、プロジェクトは本番環境で使用しないよう述べています。 |

## 関連情報

- [ビューイングキー](/zcash-tech/viewing-keys)
- [資金の復旧](/using-zcash/recovering-funds)
- [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [フォーラム: UFVK/シードから取引履歴をJSON/CSVへエクスポート](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [フォーラム: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
