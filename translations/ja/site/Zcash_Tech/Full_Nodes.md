<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# フルノード

## 要約

- フルノードはZcashブロックチェーンの完全なコピーを保持し、すべての新しいブロックとトランザクションをコンセンサスルールに照らして検証します。
- Zebra（`zebrad`）は、現在インストールすべきノードです。ZakuraはZebraからフォークされた、2つ目の実装です。
- zcashdは廃止されました。サポート終了による停止は、ブロック高3417100で2026年7月18日に到達しており、これらのノードはもはや起動しません。
- ノードとウォレットは現在、別々のプログラムです。[Zallet](https://github.com/zcash/zallet)はノードに対して動作し、鍵を保持します。
- 自身でノードを運用すると、独立して検証でき、他者のサーバーを信頼する必要がなくなります。

## 基本解説

フルノードは、暗号資産のブロックチェーンの完全なコピーを実行するソフトウェアであり、プロトコルの機能にアクセスできます。

ジェネシス以降に発生したすべてのトランザクションの完全な記録を保持しているため、ブロックチェーンに追加される新しいトランザクションとブロックの有効性を検証できます。

## ノード実装

### Zebra

Zebraは、Zcash Foundationによって作成され、Rustで記述された、Zcashプロトコルの独立した本番対応フルノード実装です。zcashdは廃止されたため、新しいデプロイメントにはZebra（`zebrad`）が推奨されるフルノードです。

Zebraはブロックとトランザクションを検証し、ピアツーピアネットワークに参加し、アプリケーション向けにRPCインターフェースを公開します。ウォレットは現在では別コンポーネントです。[Zallet](https://github.com/zcash/zallet)はZebraノードに対して動作し、鍵と残高を処理します。これは、ノードとウォレットを単一プロセスにまとめていたzcashdに置き換わるものです。

シールドされたライトウォレットにサービスを提供するため、ノードは、既存の[lightwalletd](https://github.com/zcash/lightwalletd)または新しい[Zaino](https://zechub.wiki/zaino)のいずれかのインデクサーとともに実行されます。

セットアップ手順については必ずZebraのブックを読み、サポートについてはR&D Discordサーバーに参加してください。

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebraブック](https://zebra.zfnd.org)

インストール手順、設定、ハードウェア要件については、[Zebra フルノード](/zcash-tech/zebra-full-node)を参照してください。

### Zakura

Zakuraは、Zebraからフォークされ、Valar GroupとProject Tachyonが共同開発した、2つ目のコンセンサス互換フルノードです。同じプロトコルルールに従い、より高速な同期、ブロックプルーニング、zcashd RPC互換レイヤーを追加しています。[Zakura ノード](/zcash-tech/zakura-node)を参照してください。

### zcashd（廃止）

> **注記：** zcashdは廃止されました。Electric Coin Company [は](https://z.cash/support/zcashd-deprecation/)廃止を発表し、サポート終了による自動停止はブロック高3417100で2026年7月18日に到達しました。変更されていないすべてのzcashd 6.20.0ノードはそのブロック高で停止し、再起動を拒否します。また、このソフトウェアはNU6.3をサポートしていません。Zebraを使用してください。zcashd `wallet.dat`を保有している場合は、[移行ガイド：zcashdからZebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet)に従ってください。

zcashdは、Electric Coin Companyによって開発・保守された、Zcash向けの元々のフルノード実装でした。以下のビルド手順は、参照用およびzcashdから移行する運用者向けに残されています。

ZcashdはRPCインターフェースを通じて一連のAPIを公開しています。これらのAPIは、外部アプリケーションがノードとやり取りできる機能を提供します。

[Lightwalletd](https://github.com/zcash/lightwalletd)は、開発者がZcashdと直接やり取りすることなく、モバイル向けのシールドされたライトウォレットを構築・保守できるよう、フルノードを使用するアプリケーションの一例です。

[サポートされているRPCコマンドの完全な一覧](https://zcash.github.io/rpc/)

[Zcashdのブック](https://zcash.github.io/zcash/)

#### ノードを起動する（Linux）

- 依存関係をインストール

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 最新リリースをクローンし、チェックアウト、セットアップ、ビルドします。

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- ブロックチェーンを同期する（数時間かかる場合があります）

    ノードを起動するには、次を実行します。

      ./src/zcashd

- 秘密鍵は~/.zcash/wallet.datに保存されます

[Raspberry PiでのZcashdガイド](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## 実践的な影響

### ネットワーク

フルノードを運用することで、分散化を支え、Zcashネットワークの強化に貢献できます。

これは敵対的な支配を防ぎ、ある種の障害に対するネットワークの耐性を維持する助けとなります。

DNSシーダーは、組み込みサーバーを通じて、信頼できる他のノードの一覧を公開します。これにより、トランザクションがネットワーク全体に伝播できます。

### ネットワーク統計

以下は、Zcashネットワークデータへのアクセスを提供するプラットフォームの例です。

[Zcash ブロックエクスプローラー](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

テストの実行、新しい改善提案、メトリクスの提供を通じて、ネットワークの開発に貢献することもできます。

### マイニング

マイナーは、getblocktemplateやgetmininginfoなど、マイニング関連のすべてのRPCにアクセスするためにフルノードを必要とします。

Zcashdではシールドされたcoinbaseへのマイニングも可能です。マイナーおよびマイニングプールは、デフォルトでz-addressにシールドされたZECを蓄積するために直接マイニングする選択肢があります。

[マイニングガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)を読むか、[Zcash マイナー](https://forum.zcashcommunity.com/c/mining/13)のコミュニティフォーラムページに参加してください。

### プライバシー

フルノードを運用すると、Zcashネットワーク上のすべてのトランザクションとブロックを独立して検証できます。

フルノードを運用することで、トランザクションを代理で検証するために第三者サービスを利用することに伴う、いくつかのプライバシーリスクを回避できます。

自身のノードを使うことで、[Tor](https://zcash.github.io/zcash/user/tor.html)を介してネットワークへ接続することもできます。
これには、他のユーザーがあなたのノードの.onionアドレスへ非公開で接続できるという追加の利点があります。

## よくある間違い

- 上記の手順でzcashdをビルドし、動作するノードを期待すること。これらのバイナリは廃止ブロック高で停止します。
- ノードを運用し、モバイルウォレットがそれを使用するようになったと考えること。ライトウォレットは、自身のサーバーを指定するまで、設定されているサーバーと通信し続けます。[ライトウォレットノード](/zcash-tech/lightwallet-nodes)を参照してください。
- `zebrad`のみを実行し、ライトウォレットが接続すると期待すること。ノードの隣には、lightwalletdまたは[Zaino](/zcash-tech/zaino)のいずれかのインデクサーが必要です。
- ノード上でウォレットRPCを探すこと。鍵と残高はZalletに移されました。

## 関連ページ

- [Zebra フルノード](/zcash-tech/zebra-full-node) - 推奨ノードのインストール、設定、実行
- [Zakura ノード](/zcash-tech/zakura-node) - Zebraからフォークされた2つ目のノード実装
- [ライトウォレットノード](/zcash-tech/lightwallet-nodes) - ライトウォレットが問い合わせるサーバー
- [Zaino](/zcash-tech/zaino) - ライトウォレットにサービスを提供するRustインデクサー
- [Zcash ウォレット同期](/zcash-tech/zcash-wallet-syncing) - 同期がこのように動作する理由

## さらに学ぶ

[サポートドキュメント](https://zcash.readthedocs.io/en/latest/)をお読みください

[Discord サーバー](https://discord.gg/zcash)に参加するか、[X](https://X.com/ZecHub)でお問い合わせください
