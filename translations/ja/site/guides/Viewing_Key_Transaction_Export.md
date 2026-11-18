<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Viewing Keyからトランザクション履歴をエクスポートする

多くのウォレットのエクスポート機能は情報が限られています。たとえばZODLの税務用エクスポートには、前暦年の日付、金額、手数料は含まれますが、トランザクションID、メモ、アドレスは含まれません。これでは帳簿管理やウォレット移行の確認、支払いに何が起きたかを調べるには不十分です。

全体像を把握するのにシードフレーズは必要ありません。統合フルビューイングキー（Unified Full Viewing Key、UFVK。`uview1`で始まります）があれば、アカウントのすべての入出金トランザクションを確認できます。また、2つのツールを使えば、その履歴を手元に保存できるファイルにできます。Zkool GraphQLサーバーとzingo-cliです。このガイドでは、[このフォーラムスレッド](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)で紹介された方法をまとめ、現在のリリースに合わせて更新しています。

Zkool 6.30.0と、zingolibのzingo-cli 6.0.0を使って2026年9月にテストしました。どちらもNU7より前のバージョンのため、2026年11月に手順をZkool 6.37.0とzingolib 8.0.0向けに更新しました。[Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388)は、NU7メインネットの有効化時点に対応してビルドされた最初のZkoolリリースです。また、zingolib 8.0.0はNU7メインネットに対応したリリースです。

## 始める前に

必要なものは2つです。

1. **アカウントのUFVK**。[ビューイングキー](/zcash-tech/viewing-keys)では、キーで確認できる情報とエクスポート方法を説明しています。
2. **誕生ブロック高**。スキャンを開始するブロックです。最初のトランザクションより前のブロック高を指定してください。高すぎる値を指定すると、古い履歴が気付かないうちに欠落します。低すぎる場合はスキャンに時間がかかるだけです。Saplingの有効化ブロック（419200）を指定すれば必ず安全ですが、スキャンに数時間かかることがあります。

## プライバシーを守る

ビューイングキーでは支払いはできませんが、キーを持つ人は誰でも履歴全体を見ることができます。

- ウェブサイトやブロックエクスプローラーに貼り付けないでください。自分で実行するソフトウェアにインポートしてください。
- 同期元のサーバーには、あなたのIPアドレスと、ダウンロードしたトランザクションの全データが知られます。以下の2つのツールは、メモや手数料を読むために各トランザクションをIDで個別に取得します。[ZIP 307](https://zips.z.cash/zip-0307)によると、この方法ではサーバーにどのトランザクションがあなたのものかも伝わります。自分のZebraノードからZainoまたはlightwalletdを使って同期すれば、それを避けられます。[ZingolibとZainoチュートリアル](/guides/zingolib-and-zaino-tutorial)でセットアップ方法を説明しています。
- zingo-cliはNymミックスネット経由で支払いを送信しますが、同期時はサーバーに直接接続するため、上記の点は同様に当てはまります。
- これらのツールにはビューイングキーだけを渡し、シードは絶対に渡さないでください。以下のDockerコマンドは、ログイン機能のないZkool GraphQLサーバーを`--allow-unauthenticated`で起動します。そのAPIは、そこから作成されたアカウントのシードを返すことができ、資金を送ることもできます。
- サーバーは自分のマシンで実行してください。以下のDockerコマンドは、コンピューターの`127.0.0.1`だけで待ち受けます。コンテナ内のサーバーはすべてのインターフェース（`--bind-address 0.0.0.0`）で待ち受ける必要があります。そうしないとDockerから接続できません。ローカルに限定するのは`-p 127.0.0.1:8000:8000`のマッピングです。
- どちらのツールも、キーと履歴を暗号化せずに保存します。Zkoolではデータベースを暗号化できます（`--db-password-file`）。ただし、以下のコマンドでは簡単にするため`--allow-unencrypted-database`を使います。作業が終わったら作業データを削除し、エクスポートは暗号化された場所に保管してください。

## オプション1：Zkool GraphQL

`zkool_graphql`はZkoolのウォレットエンジンを単独のサーバーとして実行するものです。Zkoolアプリとは別のプログラムです。最も簡単な実行方法は、公式のDockerイメージ（amd64およびarm64）を使うことです。[のZkoolリリースページ](https://github.com/hhanh00/zkool2/releases)にはLinux x86-64バイナリもあります。glibc 2.38以降が必要なため、Ubuntu 24.04では動きますが、Debian 12では動きません。

### 1. サーバーを起動する

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

6.32.0以降、サーバーを起動するには2つの選択を明示する必要があります。クライアントのログイン方法（JWTキーまたは`--allow-unauthenticated`）と、データベースを暗号化するかどうか（パスワードまたは`--allow-unencrypted-database`）です。また現在、デフォルトでは`127.0.0.1`のみで待ち受けます。コンテナ内では外部から接続できないため、`--bind-address 0.0.0.0`を指定しています。コンテナがすぐに停止する場合は、`docker logs zkool-export`で不足しているオプションを確認してください。

`--lwd-url`で自分のサーバーを指定しない限り、`https://zec.rocks`から同期します。イメージにはSaplingのパラメーターが組み込まれているため、ほかにダウンロードするものはありません。

ブラウザーで`http://127.0.0.1:8000/graphiql`を開いてください。以降の手順のコマンドを貼り付けて実行できます。

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

- 必ず`birth`を設定してください。設定しないと、Zkoolは現在のブロックからスキャンを始めるため、何も見つかりません。
- `useInternal: true`を指定すると、Zkoolは公開型のチェンジアドレスも確認します。ZODLのキーにはこの設定を有効にしてください。[資金の復元](/using-zcash/recovering-funds)でもZODLのシードに同じ設定を使っています。

### 3. 同期する

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

同期が終わるまで実行されます。`fast: true`は追加しないでください。これを指定すると、メモ、手数料、出力の取得元であるトランザクション全体のダウンロードが省略されます。

返される数値は同期の目標ブロック高であり、そこまで到達したという証明ではありません。ネットワークエラーが起きると、何も報告されずに同期が早く終了することがあります。次のように確認してください。

```graphql
{ currentHeight accounts { id name height } }
```

アカウントの`height`が`currentHeight`より低い場合は、再度同期してください。停止したところから続行されます。

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

意図している場合を除き、`height`引数は省略してください。これは最小値を設定するため、フォーラムの例にある`height: 3000000`を使うと、そのブロックより前のすべてが除外されます。

JSONとして取得します。

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

各トランザクションには、マイニング報酬を除き、0より大きい手数料が表示されるはずです。`"fee": "0"`と表示されてメモがない場合、その詳細はダウンロードされていません。Zkoolはスキャン後にトランザクション全体を1件ずつ取得しますが、1件でも失敗すると残りの取得が通知なく停止します。該当するものを一覧表示するには、次を実行してください。

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

何か表示された場合は、数分後にもう一度同期してエクスポートしてください。

その後、トランザクションごとに1行のCSVに変換します。

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### 出力の読み方

| 項目 | 意味 |
|---|---|
| `value` | ZEC単位のアカウントの純増減額。手数料を含みます。送金では負の値です。 |
| `fee` | ZEC単位の手数料です。受け取った支払いでは送信者が負担しており、`value`には含まれません。 |
| `time` | タイムゾーン表示のないUTCのブロック時刻 |
| `notes` | このトランザクションでアカウントが受け取ったもの。チェンジを含みます。あなた宛てのメモはここにあります。公開型の項目にはアドレスがありません。 |
| `spends` | このトランザクションで使用された、アカウント自身のノート |
| `outputs` | トランザクションが送信したもの。すべての公開型出力に加えて、メモ付きでほかのアドレスに送られたシールドされた支払いです。 |
| `pool` | 0は公開型、1はSapling、2はOrchard、3はIronwoodです。 |
| `scope` | 0は外部（支払い）、1は内部（チェンジ）です。 |

Zkoolアプリにも、アカウントメニューに「トランザクションをエクスポート」「メモ」「ノート」がありますが、これは生のテーブルデータです。金額はzatoshi単位、時刻はUnixタイムスタンプで、メモは別ファイルに保存されます。

## オプション2：zingo-cli

zingo-cliはZingoのコマンドラインウォレットです。ビルド済みのダウンロードファイルはないため、Rustでビルドします。NU7のメインネット有効化ブロック高（3,543,405）に対応した最初のリリースであるzingolib 8.0.0以降を使ってください。これは[リリースノート](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0)に記載されています。6.0.0など古いタグからのビルドは対応していません。

ビルドには[cargo-make](https://github.com/sagiegurari/cargo-make)（`cargo install cargo-make`）を使います。Ubuntuでは`sudo apt install build-essential gcc libsqlite3-dev`も必要です。

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

これにより`./target/release/zingo-cli`がビルドされ、その隣に`nym-proxy`が配置されます。同期だけの場合も`nym-proxy`が必要です。これがないとzingo-cliはオンラインになりません。8.0.0以降、`zingo-netutils`はメインのワークスペースに含まれているため、`zingo-netutils/target/release/`から`nym-proxy`をコピーする以前の手順はもう使えません。

`zingo-cli`を別の場所に移動する場合は、`nym-proxy`も一緒に移動するか、`--nym-proxy /path/to/nym-proxy`または`ZINGO_NYM_PROXY`環境変数で場所をzingo-cliに知らせてください。どちらも指定しない場合、`PATH`上を確認した後、バイナリと同じ場所を探します。プロキシを起動できない場合、オンラインにはなりません。

支払い（およびZECの価格照会）だけがNym経由です。同期時はサーバーに直接接続します。

初回実行時に閲覧専用ウォレットが作成され、同期後に履歴が表示されます。

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir`は絶対パスで指定する必要があります。
- `--viewkey`と`--birthday`はウォレット作成時のみ適用されます。作成後は省略してください。
- 新しいzingo-cliはデフォルトでオフラインになっており、オンラインにするには同意が必要です。`--server`はサーバーを選択し、オンラインにする同意としても扱われます。そのほかの方法は`--online`（このセッションのみ）と`--remember-online`です。後者は選択内容もウォレットの隣に保存するため、次回以降はフラグなしでオンラインになります（`--forget-online`で取り消せます）。
- キーはシェルの履歴に残るため、後で消去してください。

次回以降の実行：

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`は同期済みのデータを読み込みます。ネットワークには接続しません。

- `transactions`はトランザクションごとに1件の項目を出力します。内容はtxid、時刻（UTC）、ブロック高、種類（`received`、`sent`、`shield`、`send-to-self`）、金額、手数料、および関連するノートです。
- `value_transfers`は支払いごとに1件の項目を出力します。2人に送金した場合は2件になり、それぞれに受取人のアドレスとメモが含まれます。
- `messages`はメモをJSON形式で一覧表示します。

出力について知っておくべき点がいくつかあります。

- `transactions`と`value_transfers`は、JSONに少し似ていますがJSONではないプレーンテキストを出力します。
- 金額はzatoshi単位（1 ZECあたり100,000,000）で、常に正の値です。方向は`kind`で確認できます。送金では`value`が、手数料を除いた他者への送金額です。
- 自分のものではない公開型資金を使うトランザクションでは、手数料が「利用不可」と表示されます。テキスト形式のメモのみ表示されます。
- 同期に失敗した場合、エラーはファイルではなくターミナルに表示されます。zingolib 8.0.0（zingo-cli 0.5.0）以降、コマンドが失敗すると終了コードも0以外になりますが、`transactions.txt`を信用する前にターミナルを確認してください。

dismadの[zingoHelper](https://github.com/dismad/zingoHelper)には、`transactions`をJSONに変換する`exportToJSON.sh`スクリプトがあります。zingo-cli 6より前に書かれたもので、テストネット用に設定されています。一部の送信Saplingと公開型項目をプレースホルダーとして扱い、GNUツールも必要なため、標準状態のmacOSでは実行できません。出力は出発点として利用し、合計値を確認してください。

## ビューイングキーでは分からないこと

- **価格。** どちらのツールも、各トランザクション時点のZEC価格を記録しません。法定通貨での価値は自分で追加してください。
- **キーに含まれていない公開型の履歴。** [ZIP 316](https://zips.z.cash/zip-0316)では、UFVKに含める公開型部分は任意です。zingo-cliを使えば、`$Z --offline parse_viewkey uview1...`でキーがどのプールを対象にしているか確認できます。
- **誰が支払ったか。** シールドされた支払いには送信者のアドレスが含まれません。送信者がメモに記載していない限り、どこにも記録されません。
- **一部の送金詳細。** シールドされた送金の宛先アドレス、金額、メモは、キーを使って復号することで復元できます。ただし、復元できないようにトランザクションを作成するウォレットもあります。ほとんどのウォレットはそのようにはしません。

## その他のツール

| ツール | 得られる情報 |
|---|---|
| ZODL | 日付、金額、手数料、タグを含む税務用CSVです。前暦年のみが対象で、シールド化トランザクションは除外されます。txid、メモ、アドレスはありません。 |
| Zkoolアプリ | アカウントメニューからの生のテーブルデータのエクスポート |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk`でUFVKをインポートします。RPC経由の`listreceived`では、txidとメモを含む受信ノートを取得できますが、送金と手数料は取得できません。 |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions`は詳細な情報を出力しますが、実験的機能とされています。ZalletがインポートできるのはSaplingビューイングキーのみで、UFVKはインポートできません。 |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk`でUFVKをインポートしてから`wallet list-tx`します。CSVモードにはtxidもアドレスも含まれず、プロジェクト側も本番環境で使わないよう案内しています。 |

## 関連項目

- [ビューイングキー](/zcash-tech/viewing-keys)
- [資金の復元](/using-zcash/recovering-funds)
- [ZingolibとZainoチュートリアル](/guides/zingolib-and-zaino-tutorial)
- [フォーラム：UFVK/シードからトランザクション履歴をJSON/CSVにエクスポート](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [フォーラム：ZkoolとGraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
