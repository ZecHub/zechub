<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# フルノード（Full Nodes）

## 要約（TL;DR）

- フルノードは、Zcashのブロックチェーン（blockchain）の完全なコピーを保持し、すべての新しいブロック（block）とトランザクション（transaction）をコンセンサス（consensus）ルールに照らして検証します。
- Zebra（`zebrad`）は、現在インストールすべきノード（node）です。Zakuraは、Zebraからフォークされた2番目の実装です。
- zcashdは廃止されました。サポート終了時の停止は2026年7月18日、ブロック高3417100で実行され、これらのノードはもう起動しません。
- ノードとウォレット（wallet）は現在別個のプログラムです。[Zallet](https://github.com/zcash/zallet)はノードに対して動作し、鍵を保持します。
- 自身のノードを実行すると、独立して検証でき、他者のサーバーを信頼する必要がなくなります。

## 基本的な説明

フルノードは、暗号資産のブロックチェーンの完全なコピーを実行するソフトウェアであり、プロトコルの機能にアクセスできます。

ジェネシス以降に発生したすべてのトランザクションの完全な記録を保持しているため、ブロックチェーンに追加される新しいトランザクションとブロックの有効性を検証できます。

## ノード実装

### Zebra

Zebraは、Zcashプロトコルの独立した本番対応フルノード実装であり、Zcash Foundationによって作成され、Rustで記述されています。zcashdは廃止されているため、Zebra（`zebrad`）が新規デプロイメントに推奨されるフルノードです。

Zebraはブロックとトランザクションを検証し、ピアツーピアネットワークに参加し、アプリケーション向けのRPCインターフェースを公開します。ウォレットは現在別個のコンポーネントです。[Zallet](https://github.com/zcash/zallet)はZebraノードに対して動作し、鍵と残高を処理します。これは、ノードとウォレットを単一のプロセスにまとめていたzcashdに代わるものです。

シールドされた（shielded）ライトウォレットにサービスを提供するため、ノードは、既存の[lightwalletd](https://github.com/zcash/lightwalletd)または新しい[Zaino](https://zechub.wiki/zcash-tech/zaino)のいずれかのインデクサーとともに実行されます。

セットアップ手順については必ずZebraのブックを読み、サポートについてはR&D Discordサーバーに参加してください。

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Zebraのブック](https://zebra.zfnd.org)

インストール手順、設定、ハードウェア要件については、[Zebra フルノード](/zcash-tech/zebra-full-node)を参照してください。

### Zakura

Zakuraは、Zebraからフォークされ、Valar GroupとProject Tachyonによって開発された、コンセンサス互換の2番目のフルノードです。同じプロトコルルールに従い、より高速な同期、ブロックプルーニング、zcashd RPC互換レイヤーを追加しています。[Zakura ノード](/zcash-tech/zakura-node)を参照してください。

### zcashd（廃止）

> **注記：** zcashdは廃止されました。Electric Coin Company [は](https://z.cash/support/zcashd-deprecation/)廃止を発表し、サポート終了時の自動停止は2026年7月18日、ブロック高3417100で実行されました。変更されていないすべてのzcashd 6.20.0ノードはその高で停止し、再起動を拒否します。また、このソフトウェアはNU6.3をサポートしていません。Zebraを使用してください。zcashd `wallet.dat`を保有している場合は、[移行ガイド：zcashdからzebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet)に従ってください。

zcashdは、Zcash向けの元のフルノード実装であり、Electric Coin Companyによって開発・保守されていました。以下のビルド手順は、参照用およびzcashdから移行する運用者向けに残されています。

zcashdは、RPCインターフェースを通じて一連のAPIを公開します。これらのAPIは、外部アプリケーションがノードと対話できる機能を提供します。

[lightwalletd](https://github.com/zcash/lightwalletd)は、Corrected from 開発者 per reviewer request.がzcashdと直接やり取りすることなく、モバイル向けのシールドされたライトウォレットを構築・保守できるよう、フルノードを使用するアプリケーションの例です。

[サポートされているRPCコマンドの完全なリスト](https://zcash.github.io/rpc/)

[zcashdのブック](https://zcash.github.io/zcash/)

#### ノードを起動する（Linux）

- 依存関係をインストールする

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

[Raspberry Pi上のzcashdガイド](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## 実用上の意味

### ネットワーク

フルノードを実行することで、分散型（decentralized）を支援し、zcashネットワークの強化に貢献します。

これは敵対的な支配を防ぎ、ある種の障害に対するネットワークの耐障害性を維持するのに役立ちます。

DNSシーダーは、組み込みサーバーを通じて他の信頼できるノードのリストを公開します。これにより、トランザクションはネットワーク全体に伝播できます。

### ネットワーク統計

以下は、Zcashネットワークデータへのアクセスを提供するプラットフォームの例です。

[Zcash ブロックエクスプローラー](https://mainnet.zcashexplorer.app)

[Coin Metrics ネットワークデータ](https://docs.coinmetrics.io/network-data/network-data-overview) — メトリクスのドキュメントと、現在のアセットカバレッジへのリンクです。

テストの実行、新しい改善案の提案、メトリクスの提供によっても、ネットワークの開発に貢献できます。

### マイニング（Mining）

マイナー（miner）は、getblocktemplateやgetmininginfoなど、マイニングに関連するすべてのRPCにアクセスするためにフルノードを必要とします。

zcashdは、シールドされたコインベースへのマイニングも可能にします。マイナーとマイニングプールは、デフォルトでzアドレスにシールドされたZECを蓄積するため、直接マイニングする選択肢があります。

[マイニングガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)を読むか、[Zcash マイナー](https://forum.zcashcommunity.com/c/mining/13)のコミュニティフォーラムページに参加してください。

### プライバシー（Privacy）

フルノードを実行すると、Zcashネットワーク上のすべてのトランザクションとブロックを独立して検証できます。

フルノードを実行することで、トランザクションを代わりに検証するために第三者サービスを利用することに伴うプライバシーリスクの一部を回避できます。

自身のノードを使用すると、[Tor](https://zcash.github.io/zcash/user/tor.html)経由でネットワークに接続することもできます。
これには、他のユーザーがあなたのノードの.onionアドレスへプライベートに接続できるという追加の利点があります。

## よくある間違い

- 上記の手順でzcashdをビルドし、動作するノードを期待すること。これらのバイナリは廃止高で停止します。
- ノードを実行しているため、モバイルウォレットが現在それを使用していると考えること。ライトウォレットは、自身のサーバーを指定するまで、設定されているサーバーと通信を続けます。[ライトウォレットノード](/zcash-tech/lightwallet-nodes)を参照してください。
- `zebrad`のみを実行し、ライトウォレットが接続することを期待すること。ノードには、lightwalletdまたは[Zaino](/zcash-tech/zaino)のいずれかのインデクサーが隣接して必要です。
- ノード上でウォレットRPCを探すこと。鍵と残高はZalletに移動しました。

## 関連ページ

- [Zebra フルノード](/zcash-tech/zebra-full-node) - 推奨ノードのインストール、設定、実行
- [Zakura ノード](/zcash-tech/zakura-node) - Zebraからフォークされた2番目のノード実装
- [ライトウォレットノード](/zcash-tech/lightwallet-nodes) - ライトウォレットが照会するサーバー
- [Zaino](/zcash-tech/zaino) - ライトウォレットにサービスを提供するRustインデクサー
- [Zcash ウォレット同期](/zcash-tech/zcash-wallet-syncing) - 同期がこのように機能する理由

## さらに学ぶ

[サポートドキュメント](https://zcash.readthedocs.io/en/latest/)をお読みください。

[Discord サーバー](https://discord.gg/zcash)に参加するか、[X](https://X.com/ZecHub)でお問い合わせください。
