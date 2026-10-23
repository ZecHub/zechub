# Zcash Devtool

[zcash-devtoolとは？](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtoolは、Zcashをハッキングするためのプラットフォームです。これは開発者が開発者のために、新しいZcash機能のテストと開発を目的として構築したものであり、本番運用に対応しているとは見なすべきではありません。このツールが提供するコマンドラインAPIは、いつでも予告なく変更される可能性があります。zcash-devtool組み込みウォレットの管理に多額の資金を預けないでください。

### Zcash Devtoolのビデオチュートリアル：
Kris Nuttycombe（@nuttycom）がZconVIでこのツールを紹介しました。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool：Kris NuttycombeによるZcash開発マルチツール - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

これらのツールの利用を始めるためのステップバイステップガイドについては、[このウォークスルー](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)をご覧ください。ここでは、zcash devtoolツールのセットアップと使用方法を一通り説明しています。セットアップ方法および独自の機能をツールに追加する方法のガイドとして利用することを意図しています。

## クイックスタート

以下のコマンドは、zcash-devtool `main`（コミット`5a26ee8`、2026年8月）に対して確認されています。ツールは予告なく変更されるため、ここにある内容と一致しなくなった場合は、任意のコマンドに対して`--help`を実行してください。

### インストール

ビルド済みバイナリはありません。[Rust](https://rustup.rs)をインストールしてから、ソースからビルドしてください。

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

以下の例では、ビルドしたバイナリである`target/release/zcash-devtool`を呼び出します。`cargo run --release -- ...`も同じように機能します。

### テストネットウォレットを作成する

まずはテストネットで始めてください。テストネットコイン（TAZ）には価値がありません。

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w`はウォレットディレクトリです。`wallet`の後、サブコマンドの前に置きます。
- `-i`は[age](https://age-encryption.org)アイデンティティファイルです。ウォレットのニーモニックフレーズはこれに暗号化され、ファイルが存在しない場合は作成されます。保持してください。`send`、`shield`、その他の支払いコマンドでは、シードを復号するためにこれが必要です。
- `-n`はネットワークです：`test`または`main`。
- `-s`はライトウォレットサーバーを選択します。デフォルトの`zecrocks`は、選択されたネットワーク用のzec.rocksサーバーに接続します。
- 既存のウォレットを復元するには、`init`の代わりに`restore-mnemonic`を使用します。フレーズの入力を求められます。

`balance`は、Ironwoodを含め、各プールを個別に一覧表示します。

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

`zcash-devtool wallet -w ./my-wallet list-addresses`を実行してウォレットの統合アドレスを確認し、[faucet](https://zechub.wiki/using-zcash/faucets)からテストネット資金を送ってください。

メインネットでは、`init`に`-n main`を渡します。失っても構わない金額だけを使用してください。

### 送金とシールド化

金額の単位はzatoshiです（1 ZEC = 100,000,000 zatoshi）。

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose`は、`send`が構築するトランザクションを送信せずに表示します。`list-tx`と`list-unspent`は、ウォレットの履歴とノートを表示します。

サーバーと通信するコマンドはすべて`--connection tor`も受け付け、接続を組み込みのTorクライアント経由でルーティングします。

### アドレス、鍵、トランザクションを調べる

`inspect`は、アドレス、鍵、rawトランザクションなどのZcashデータをオフラインでデコードします。`--lookup`を追加すると、IDによるトランザクションなど、チェーンからさらに情報を取得できます。

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Ironwoodノートは統合アドレス内の同じOrchard受信者に送られるため、アドレスはNU6.3でも変更されませんでした。

### PCZTを使って段階的にトランザクションを構築する

PCZT（部分的に作成されたZcashトランザクション）は、トランザクションの構築を作成、証明、署名、送信という別々のステップに分割します。各ステップは、たとえばKeystoneのようなハードウェア署名機器を使用して、異なるマシンで実行できます。各`pczt`コマンドは、ファイルまたは標準入力からPCZTを読み取り、ファイル（`--output`）または標準出力に書き込むため、ステップをパイプでつなげられます。

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help`には、`inspect`、`redact`、`combine`、`extract`、`shield`を含む他のステップが一覧表示されます。

### OrchardからIronwoodへ資金を移動する

NU6.3以降、Orchard資金はウォレット自身のアドレスにのみ移動できます。`migration`コマンドは、それらをIronwoodへ移動します。

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan`はノートの分割と転送スケジュールをプレビューし、何も変更しません。
- `commit`は最初の準備トランザクションを構築して事前署名します。`--external`を追加すると、Keystoneのような外部署名機器向けに未署名のまま残せます。
- `status`は移行の進行状況と次のステップを表示します。
- `advance`は、アンカーの準備ができた次のトランザクションを証明します。

移行コマンドはまだ開発中です。ツールではまだブロードキャストが実装されていないため、`advance`はブロードキャストの準備ができた最初のトランザクションで停止します。日常的な利用では、Ironwoodをサポートするウォレットで資金を移動してください。[シールドプール](https://zechub.wiki/using-zcash/shielded-pools)をご覧ください。


**セキュリティ警告：**
本番環境では絶対に使用しないでください！！！
このアプリはセキュリティを考慮して書かれていません。ただし、ニーモニックシードフレーズの暗号化など、小規模な実験を自己責任で行うには十分な仕組みが備わっています。

### 上級（librustzcashチュートリアル）


[こちらで動画を見る](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
