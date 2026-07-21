<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# フルノード

フルノードとは、任意の暗号通貨のブロックチェーンの完全なコピーを実行するソフトウェアであり、プロトコルの機能にアクセスできるようになります。

これは、創世以来行われたすべての取引の完全な記録を持ち、したがってブロックチェーンに追加される新しい取引およびブロックの有効性を検証できます。


## Zcashd

Zcashdは現在、Electric Coin Companyによって開発および保守されており、Zcashで使用されている主なフルノード実装です。

ZcashdはRPCインターフェースを通じて一連のAPIを公開しています。これらのAPIは、外部アプリケーションがノードとやり取りできるようにする機能を提供します。

[Lightwalletd](https://github.com/zcash/lightwalletd) は、フルノードを使用して開発者にモバイル対応のシールド付きライトウォレットを構築および維持できるようにするアプリケーションの例です。


[ZcashdでサポートされているRPCコマンド一覧](https://zcash.github.io/rpc/)

[Zcashdに関する書籍](https://zcash.github.io/zcash/)


### ノードの起動 (Linux)

- 依存関係をインストール

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 最新リリースをクローン、チェックアウト、設定およびビルド:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- ブロックチェーンを同期 (数時間かかる場合があります)

    ノードを起動するには以下を実行します:

      ./src/zcashd

- 秘密鍵は ~/.zcash/wallet.dat に保存されます。

[Raspberry PiでのZcashdガイド](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebraは、Zcash Foundationによって作成されたZcashプロトコル用の独立したフルノード実装です。

現在テスト中であり、まだ実験的な段階にあります。

Zebraには主に2つのコンポーネントがあります。クライアントコンポーネントはブロックチェーンスキャンおよびトランザクションの試行暗号化を担当します。

2つ目の部分はzebraコマンドラインツールです。このツールは、支出鍵やアドレスを管理し、zebradと通信して基本的なウォレット機能を提供します。

Zebraを使ってブロックマイニングに興味がある人は、R&DのDiscordサーバーに参加することをお勧めします。また、セットアップ手順については[Zebra書籍](https://zebra.zfnd.org)も確認してください。

[Github](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## ネットワーク

フルノードを実行することで、分散化を支援し、Zcashネットワークの強化に貢献しています。

これは、敵対的なコントロールを防ぎ、いくつかの形態の障害に対するネットワークの耐性を高めます。

DNSシーダーは、組み込みサーバーを通じて他の信頼できるノードの一覧を公開します。これにより、トランザクションがネットワーク全体に伝播できます。

### ネットワーク統計

これらは、Zcashネットワークデータへのアクセスを可能にする例のプラットフォームです：

[Zcashブロックエクスプローラー](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

ネットワークの開発に貢献するには、テストを実行したり、新しい改善案を提案したり、メトリクスを提供することもできます。


### マイニング

マイナーは、getblocktemplateやgetmininginfoなどのすべてのマイニング関連RPCにアクセスするためにフルノードが必要です。

Zcashdは、シールド付きコインベースへのマイニングも可能にします。マイナーおよびマイニングプールは、デフォルトでzアドレスにシールドされたZECを蓄積するように直接マイニングできます。

[Mining Guide](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) を読んだり、[Zcash Miners](https://forum.zcashcommunity.com/c/mining/13) のコミュニティフォーラムページに参加したりしてください。


### プライバシー

フルノードを実行することで、Zcashネットワーク上のすべてのトランザクションおよびブロックを独立して検証できます。

フルノードを実行することで、第三者サービスを使用してトランザクションの検証を行わせる際に生じる一部のプライバリリスクを回避できます。

自分のノードを使用する場合、[Tor](https://zcash.github.io/zcash/user/tor.html) を介してネットワークに接続することも可能です。これは、他のユーザーがあなたのノードの.onionアドレスを通じてプライベートに接続できるという追加の利点があります。


**助けが必要ですか？**

[サポートドキュメント](https://zcash.readthedocs.io/en/latest/) を読んでください。

[Discordサーバー](https://discord.gg/zcash) に参加するか、[Twitter](https://twitter.com/ZecHub) で私たちに連絡してください。

---

**Protected terms (keep in English):** `Zaino` `Zallet`
