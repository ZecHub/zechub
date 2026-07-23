---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# フルノード

フルノードとは、あらゆる暗号通貨のブロックチェーンの完全なコピーを実行し、そのプロトコル機能へのアクセスを提供するソフトウェアです。

フルノードは、ジェネシス以降に発生したすべてのトランザクションの完全な記録を保持しているため、ブロックチェーンに追加される新しいトランザクションやブロックの有効性を検証できます。

## Zcashd

> **注:** zcashd は廃止予定です。Electric Coin Company は、zcashd を引退させることを[正式に発表](https://z.cash/support/zcashd-deprecation/)しており、そのフルノードとしての役割は [Zebra](https://github.com/ZcashFoundation/zebra)（`zebrad`）に、ウォレットとしての役割は [Zallet](https://github.com/zcash/zallet) に置き換えられます。新規導入では Zebra を使用してください（以下参照）。すでに zcashd ノードを運用している場合は、[Migration Guide: zcashd to Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet) に従ってください。

zcashd は、Electric Coin Company によって開発・保守されていた、Zcash 向けのオリジナルのフルノード実装でした。以下のビルド手順は、参考用および zcashd から移行する運用者向けに残されています。

Zcashd は RPC インターフェースを通じて一連の API を公開しています。これらの API は、外部アプリケーションがノードとやり取りできる機能を提供します。

[Lightwalletd](https://github.com/zcash/lightwalletd) は、開発者が Zcashd と直接やり取りしなくても、モバイル向けのシールド対応ライトウォレットを構築・保守できるようにするためにフルノードを利用するアプリケーションの一例です。

[サポートされている RPC コマンドの完全一覧](https://zcash.github.io/rpc/)

[The Zcashd book](https://zcash.github.io/zcash/)


### ノードを起動する（Linux）

- 依存関係をインストールする

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 最新リリースをクローンし、チェックアウト、セットアップ、ビルドする:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- ブロックチェーンを同期する（数時間かかる場合があります）

    ノードを起動するには、次を実行します:

      ./src/zcashd

- 秘密鍵は ~/.zcash/wallet.dat に保存されます

[Raspberry Pi 向け Zcashd ガイド](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra は、Zcash Foundation によって作成され、Rust で書かれた、Zcash プロトコルの独立した本番運用対応フルノード実装です。zcashd の引退に伴い、Zebra（`zebrad`）が新規導入向けの推奨フルノードとなっています。

Zebra はブロックとトランザクションを検証し、P2P ネットワークに参加し、アプリケーション向けに RPC インターフェースを提供します。現在、ウォレットは別コンポーネントになっています。[Zallet](https://github.com/zcash/zallet) は Zebra ノードに接続して動作し、鍵と残高を管理します。これは、ノードとウォレットを単一プロセスにまとめていた zcashd を置き換えるものです。

シールド対応ライトウォレットにサービスを提供するには、ノードはインデクサーと並行して動作します。利用できるのは、定評のある [lightwalletd](https://github.com/zcash/lightwalletd) または新しい [Zaino](https://zechub.wiki/zaino) です。

セットアップ手順については Zebra book を必ず読み、サポートについては R&D Discord サーバーに参加してください。 

[Github](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## ネットワーク

フルノードを運用することで、分散性を支えることになり、zcash ネットワークの強化に貢献できます。 

これにより、敵対的な支配を防ぎ、ある種の障害に対してネットワークの回復力を維持できます。

DNS seeder は、組み込みサーバーを通じて、他の信頼できるノードの一覧を公開しています。これにより、トランザクションがネットワーク全体に伝播できるようになります。 

### ネットワーク統計

以下は、Zcash ネットワークデータにアクセスできるプラットフォームの例です:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

また、テストを実行したり、新しい改善案を提案したり、メトリクスを提供したりすることで、ネットワークの発展に貢献することもできます。 



### マイニング

マイナーは、getblocktemplate や getmininginfo など、マイニング関連のすべての rpc にアクセスするためにフルノードを必要とします。 

Zcashd は、shielded coinbase へのマイニングも可能にします。マイナーやマイニングプールは、デフォルトで z-address にシールドされた ZEC を蓄積するため、直接マイニングすることを選択できます。 

[Mining Guide](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) を読むか、[Zcash Miners](https://forum.zcashcommunity.com/c/mining/13) のコミュニティフォーラムページに参加してください。

### プライバシー 

フルノードを運用することで、Zcash ネットワーク上のすべてのトランザクションとブロックを独立して検証できます。

フルノードを運用することで、トランザクションの検証を第三者サービスに委ねることに伴う、いくつかのプライバシーリスクを回避できます。

自分自身のノードを使うことで、[Tor](https://zcash.github.io/zcash/user/tor.html) 経由でネットワークに接続することも可能になります。
これには、他のユーザーがあなたのノードの .onion アドレスに非公開で接続できるようになるという追加の利点もあります。


**サポートが必要ですか？**

[サポートドキュメント](https://zcash.readthedocs.io/en/latest/) を読んでください

[Discord Sever](https://discord.gg/zcash) に参加するか、[twitter](https://twitter.com/ZecHub) でご連絡ください
