<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keyからトランザクション履歴をエクスポートする

ほとんどのウォレットのエクスポート機能は情報が限られています。たとえば、ZODLの税務用エクスポートでは前年の暦年について日付、金額、手数料が得られますが、トランザクションID、メモ、アドレスは含まれません。これは帳簿管理、ウォレット移行の確認、あるいは支払いで何が起きたかを把握するには不十分です。

全体像を得るためにシードフレーズは必要ありません。統合フルビューイングキー（UFVK、`uview1`で始まります）は、アカウント内のすべての入出金トランザクションを確認できます。また、Zkool GraphQLサーバーとzingo-cliという2つのツールにより、その情報を保存できるファイルに変換できます。このガイドでは、[このフォーラムスレッド](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)の手法をまとめ、現行リリース向けに更新しています。

2026年9月に、Zkool 6.30.0およびzingolib 6.0.0のzingo-cliでテストしました。

## 始める前に

必要なものは2つです。

1. アカウントの**UFVK**です。[ビューイングキー](/zcash-tech/viewing-keys)では、UFVKで何が分かるか、またエクスポート方法を説明しています。
2. **開始高**、すなわちスキャンを開始するブロックです。最初のトランザクションより前の高さを使用してください。高すぎる値を設定すると、古い履歴が通知なく欠落します。低すぎる値を設定すると、スキャンに時間がかかるだけです。Saplingの有効化（419200）は常に安全ですが、スキャンには数時間かかる場合があります。

## 秘密を保つ

ビューイングキーでは支払いはできませんが、それを持つ人にはあなたの履歴全体が見えてしまいます。

- ウェブサイトやブロックエクスプローラーに貼り付けないでください。自分で実行するソフトウェアにインポートしてください。
- 同期元のサーバーは、あなたのIPアドレスと、完全にダウンロードするトランザクションを確認できます。以下の両ツールは、メモと手数料を読み取るために各トランザクションをIDで取得します。[ZIP 307](https://zips.z.cash/zip-0307)では、このことによりサーバーにどのトランザクションがあなたのものか分かると指摘されています。ZebraノードをZainoまたはlightwalletdとともに自分で運用して同期すれば、これを回避できます。[ZingolibおよびZainoチュートリアル](/guides/zingolib-and-zaino-tutorial)では、そのセットアップ手順を説明しています。
- zingo-cli 6はNymミックスネット経由で支払いを送信しますが、同期時は依然としてサーバーへ直接接続するため、上記の点はこれにも当てはまります。
- これらのツールにはビューイングキーを渡し、シードは絶対に渡さないでください。Zkool GraphQLサーバーにはデフォルトでログイン機能がなく、APIはシードから作成されたアカウントのシードを返すことができ、資金を送信することもできます。
- サーバーは自分のマシン上で運用してください。以下のDockerコマンドは、`127.0.0.1`でのみ待ち受けます。
- 両ツールはキーと履歴を暗号化せずに保存します。完了後は作業データを削除し、エクスポートは暗号化された場所に保管してください。

## 選択肢1: Zkool GraphQL

`zkool_graphql`は、Zkoolのウォレットエンジンをスタンドアロンサーバーとして提供するものです。Zkoolアプリとは別のプログラムです。実行する最も簡単な方法は、公式のDockerイメージ（amd64およびarm64）を使うことです。Linuxには、[Zkoolリリースページ](https://github.com/hhanh00/zkool2/releases)でx86-64バイナリもあります。これにはglibc 2.38以降が必要なため、Ubuntu 24.04では動作しますがDebian 12では動作しません。

### 1. サーバーを開始する

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

`--lwd-url`に自分のサーバーを指定しない限り、`https://zec.rocks`から同期します。初回起動時には、Saplingパラメータ（約50 MB）をダウンロードします。失敗した場合は、`docker start zkool-export`が再試行します。

ブラウザーで`http://127.0.0.1:8000/graphiql`を開いてください。以降の各ステップをそこへ貼り付けて実行できます。

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

新しいアカウントのIDが返されます。新規サーバーでは1です。

- 必ず`birth`を設定してください。設定しない場合、Zkoolは現在のブロックから開始し、何も見つけられません。
- `useInternal: true`により、Zkoolは公開型のおつりアドレスも確認します。ZODLのキーでは有効のままにしてください。これは、[資金の復元](/using-zcash/recovering-funds)がZODLシードに使用するのと同じ設定です。

### 3. 同期する

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

これは同期が終了するまで実行されます。`fast: true`は追加しないでください。これを追加すると、メモ、手数料、出力の取得元となる完全なトランザクションのダウンロードを省略します。

返される数値は到達を目指していた高さであり、実際に到達したproofではありません。ネットワークエラーにより、何も報告されず同期が早期終了する場合があるため、次のように確認してください。

```graphql
{ currentHeight accounts { id name height } }
```

アカウントの`height`が`currentHeight`より遅れている場合は、再度同期を実行してください。停止した場所から続行されます。

### 4. エクスポートする

これを`history.graphql`として保存してください。

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

意図している場合を除き、`height`引数は省略してください。これは最小値を設定するため、フォーラムの例にある`height: 3000000`では、そのブロックより前のすべてが除外されます。

JSONとして取得します。

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

マイニング報酬を除き、すべてのトランザクションには0より大きい手数料が表示されるはずです。`"fee": "0"`と表示され、メモもない場合は、詳細がダウンロードされていません。Zkoolはスキャン後に完全なトランザクションを1件ずつ取得しますが、1件の失敗によって残りの取得が静かに停止します。影響を受けたものを一覧表示するには、次を実行します。

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

何か表示された場合は、数分後にもう一度同期し、再度エクスポートしてください。

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
| `value` | 手数料を含む、ZECにおけるアカウントの純増減です。送信では負の値です。 |
| `fee` | ZECにおける手数料です。受け取った支払いでは送信者がこれを支払っており、`value`には含まれません。 |
| `time` | タイムゾーン表記なしのUTCブロック時刻です。 |
| `notes` | おつりを含め、このトランザクションでアカウントが受け取ったものです。あなた宛てのメモはここにあります。公開型のエントリーにはアドレスがありません。 |
| `spends` | このトランザクションで使用された、アカウント自身のノートです。 |
| `outputs` | トランザクションが送信したものです。すべての公開型出力に加え、他のアドレスへのシールドされた支払いとそのメモが含まれます。 |
| `pool` | 0は公開型、1はSapling、2はOrchard、3はIronwoodです。 |
| `scope` | 0は外部（支払いの受け取り）、1は内部（おつり）です。 |

Zkoolアプリのアカウントメニューにもトランザクション、メモ、ノートのエクスポートがありますが、これらは生のテーブルダンプです。金額はzatoshi、時刻はUnixタイムスタンプで、メモは別ファイルに格納されます。

## 選択肢2: zingo-cli

zingo-cliはZingoのコマンドラインウォレットです。ビルド済みダウンロードはないため、Rustでビルドします。

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

同期だけの場合でも`nym-proxy`が必要です。zingo-cli 6は、これなしではどのサーバーにも接続しません。

初回実行では、閲覧専用ウォレットを作成し、同期して履歴を出力します。

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir`は絶対パスでなければなりません。
- `--viewkey`と`--birthday`は、ウォレット作成時にのみ適用されます。その後は省略してください。
- zingo-cliはデフォルトでオフラインで開始します。`--server`はサーバーを選択し、オンラインに接続することへの同意も兼ねます。
- キーはシェル履歴に残るため、後で消去してください。

以後の実行では、次を使用します。

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`は、ネットワークに接続せず、すでに同期済みの内容を読み取ります。

- `transactions`では、トランザクションごとに1エントリーが得られます。txid、時刻（UTC）、高さ、種類（`received`、`sent`、`shield`または`send-to-self`）、金額、手数料、関連するノートが含まれます。
- `value_transfers`では、支払いごとに1エントリーが得られます。そのため2人への送信では2エントリーになり、それぞれに受取人アドレスとメモが含まれます。
- `messages`はメモをJSONとして一覧表示します。

出力について、いくつか知っておくべき点があります。

- `transactions`と`value_transfers`は、JSONに少し似ていますがJSONではないプレーンテキストを出力します。
- 金額はzatoshi（1 ZECあたり100,000,000）で、常に正の値です。`kind`が方向を示します。送信の場合、`value`は手数料を除いた、他者に送られた金額です。
- トランザクションで自分のものではない公開型資金を使用する場合、手数料は「not available」と表示されます。テキストメモのみが表示されます。
- 同期に失敗した場合、エラーはファイルではなくターミナルに出力され、zingo-cliは通常どおり終了します。`transactions.txt`を信用する前に、ターミナルを確認してください。

dismadの[zingoHelper](https://github.com/dismad/zingoHelper)には、`transactions`をJSONに変換する`exportToJSON.sh`スクリプトがあります。これはzingo-cli 6より前に書かれたもので、テストネット向けに設定されており、一部の送信Saplingおよび公開型エントリーをプレースホルダーとして扱います。またGNUツールが必要なため、標準のmacOSでは実行できません。出力は出発点として扱い、合計を確認してください。

## ビューイングキーで分からないこと

- **価格。** どちらのツールも、各トランザクション時点のZEC価格を記録しません。法定通貨の価値は自分で追加してください。
- **キーに含まれない場合の公開型履歴。** UFVKの公開型部分は、[ZIP 316](https://zips.z.cash/zip-0316)ではオプションです。zingo-cliでは、`$Z --offline parse_viewkey uview1...`によりキーが対象とするプールを確認できます。
- **誰があなたに支払ったか。** シールドされた支払いには送信者のアドレスが含まれません。送信者がメモに記載していない限り、どこにもありません。
- **一部の送信詳細。** シールドされた送信の宛先アドレス、金額、メモは、キーで復号して取得されます。ただしウォレットは、それが不可能なトランザクションを作成できます。もっとも、ほとんどのウォレットはそうしません。

## その他のツール

| ツール | 得られるもの |
|---|---|
| ZODL | 日付、金額、手数料、タグを含む税務CSVです。前年の暦年のみが対象で、シールド化トランザクションは除外され、txid、メモ、アドレスは含まれません。 |
| Zkoolアプリ | アカウントメニューからの生のテーブルエクスポートです。 |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk`でUFVKをインポートします。RPC経由の`listreceived`では、txidとメモを含む受信ノートが返されますが、送信と手数料は含まれません。 |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions`は詳細ですが実験的とされています。またZalletはUFVKではなく、Saplingビューイングキーのみをインポートします。 |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk`でUFVKをインポートし、その後`wallet list-tx`を実行します。CSVモードにはtxidもアドレスもなく、プロジェクトは本番環境で使用しないよう案内しています。 |

## 関連情報

- [ビューイングキー](/zcash-tech/viewing-keys)
- [資金の復元](/using-zcash/recovering-funds)
- [ZingolibおよびZainoチュートリアル](/guides/zingolib-and-zaino-tutorial)
- [フォーラム: UFVK/シードからトランザクション履歴をJSON/CSVへエクスポートする](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [フォーラム: ZkoolとGraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
