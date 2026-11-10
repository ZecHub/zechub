# Zcash 開発ツール（Devtool）

[zcash-devtoolとは何ですか？](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash 開発ツールは、Zcashをハッキングするためのプラットフォームです。これはdeveloperによってdeveloperのために構築されており、新しいZcash機能のテストと開発を目的としています。本番環境対応と見なすべきではありません。このツールが公開するコマンドラインAPIは、いつでも予告なく変更される可能性があります。zcash-devtool内蔵ウォレット（Wallet）の管理に多額の資金を預けないでください。

### Zcash 開発ツールのビデオチュートリアル：
Kris Nuttycombe（@nuttycom）は、ZconVIでこのツールを紹介しました。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

これらのツールの使い始め方についてのステップバイステップガイドは、[こちらのウォークスルー](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)をご覧ください。zcash devtool ツール群のセットアップと使用方法を一通り説明しています。セットアップ方法と、ツールに独自の機能を追加する方法のガイドとして役立つことを目的としています。

## クイックスタート

以下のコマンドは、zcash-devtool `main`（コミット`5a26ee8`、2026年8月）で確認しました。ツールは予告なく変更されるため、ここに記載された内容と一致しなくなった場合は、任意のコマンドで`--help`を実行してください。

### インストール

ビルド済みバイナリはありません。[Rust](https://rustup.rs)をインストールしてから、ソースからビルドしてください。

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

以下の例では、ビルドしたバイナリである`target/release/zcash-devtool`を呼び出します。`cargo run --release -- ...`も同じように動作します。

### テストネットウォレットを作成する

テストネット（testnet）から始めてください。テストネットコイン（TAZ）には価値がありません。

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w`はウォレットディレクトリです。`wallet`の後、サブコマンドの前に指定します。
- `-i`は[age](https://age-encryption.org)アイデンティティファイルです。ウォレットのニーモニックフレーズはこれに暗号化され、ファイルが存在しない場合は作成されます。保管してください。`send`、`shield`、およびその他の支出コマンドでは、シードを復号するためにこれが必要です。
- `-n`はネットワークです。`test`または`main`です。
- `-s`はライトウォレットサーバーを選択します。デフォルトの`zecrocks`は、選択したネットワークのzec.rocksサーバーに接続します。
- 既存のウォレットを復元するには、`init`の代わりに`restore-mnemonic`を使用してください。フレーズの入力を求められます。

`balance`は、Ironwoodを含む各プール（pool）を個別に一覧表示します。

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

`zcash-devtool wallet -w ./my-wallet list-addresses`を実行してウォレットの統合アドレス（address）を確認し、[フォーセット](https://zechub.wiki/using-zcash/faucets)からテストネット資金を送ってください。

メインネットでは、`init`に`-n main`を渡してください。失っても許容できる金額だけを使用してください。

### 送金とシールド

金額はzatoshiで表されます（1 ZEC = 100,000,000 zatoshi）。

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose`は、送信せずに`send`が構築するトランザクション（transaction）を表示します。`list-tx`と`list-unspent`は、ウォレットの履歴とノート（note）を表示します。

サーバーと通信するコマンドはすべて`--connection tor`も受け付けます。これにより、接続は内蔵のTorクライアントを経由します。

### アドレス、キー、トランザクションを調べる

`inspect`は、アドレス、キー（key）、生のトランザクションを含むZcashデータをオフラインでデコードします。`--lookup`を追加すると、IDによるトランザクションなど、チェーン（chain）からさらに情報を取得できます。

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

Ironwoodノートは、統合アドレス内の同じOrchard受信者に送信されるため、アドレスはNU6.3で変更されませんでした。

### PCZTを使って段階的にトランザクションを構築する

PCZT（部分的に作成されたZcashトランザクション）は、トランザクションの構築を作成、証明、署名、送信という個別のステップに分割します。各ステップは、たとえばKeystoneのようなハードウェア署名者を使用して、異なるマシンで実行できます。各`pczt`コマンドは、ファイルまたは標準入力からPCZTを読み取り、ファイル（`--output`）または標準出力に書き出すため、ステップをパイプで接続できます。

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help`は、`inspect`、`redact`、`combine`、`extract`、`shield`を含むその他のステップを一覧表示します。

### OrchardからIronwoodへ資金を移動する

NU6.3以降、Orchard資金はウォレット自身のアドレスにのみ移動できます。`migration`コマンドは、これらをIronwoodへ移動します。

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan`はノートの分割と送金スケジュールをプレビューし、何も変更しません。
- `commit`は最初の準備トランザクションを構築して事前署名します。`--external`を追加すると、Keystoneのような外部署名者用に未署名のままにできます。
- `status`は移行の進行状況と次のステップを表示します。
- `advance`は、アンカーの準備ができた次のトランザクションを証明します。

移行コマンドは現在も構築中です。`advance`は、ブロードキャストがツールにまだ実装されていないため、ブロードキャストの準備ができた最初のトランザクションで停止します。日常的な使用では、Ironwoodをサポートするウォレットで資金を移動してください。[シールドされたプール](https://zechub.wiki/using-zcash/shielded-pools)をご覧ください。


**セキュリティに関する警告：**
本番環境では使用しないでください！！！
このアプリはセキュリティを考慮して作成されたものではありません。ただし、ニーモニックシードフレーズの暗号化（encryption）などの配慮があり、自己責任での小規模な実験には利用できるはずです。

### 高度な内容（librustzcashチュートリアル）


[こちらでビデオをご覧ください](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
