<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 開発者向けリソース

Zcash 上で構築するために必要なリソースを、それぞれの用途ごとにまとめています。すべてをひとまとめに列挙したものではありません。

2026年にスタックは大きく変わりました。歴史の大半でネットワークを稼働させていた zcashd は、2026年7月18日にブロック高 3417100 でサポート終了を迎え、その高さですべての未変更のノードが停止し、再起動も拒否するようになりました。zcashd 向けに書かれたガイドは、もはや出発点ではなく過去の記録です。そのため、このページはそれに代わるものを軸に構成されています。

## スタックの概要

| レイヤー | 使用するもの | まずはこちらから |
|:--|:--|:--|
| フルノード | Zebra または Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| フルノードウォレット | ベータ版の Zallet | [The Zallet Book](https://zcash.github.io/zallet/) |
| ライトウォレットサーバー | Zaino または lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| ウォレットライブラリ | librustzcash クレート群 | [librustzcash](https://github.com/zcash/librustzcash) |
| モバイル | Android および iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 仕様 | プロトコル仕様と ZIP | [zips.z.cash](https://zips.z.cash) |

## ノード

ノードはコンセンサスを検証し、チェーンを保持します。現在、積極的に開発されている実装は2つあります。

[Zebra](/zcash-tech/zebra-full-node) は Zcash Foundation のノードで、Rust で書かれており、現在では多くのガイドがこれを前提にしています。[The Zebra Book](https://zebra.zfnd.org/) ではインストール方法と実行方法が説明されており、開発は [repository](https://github.com/ZcashFoundation/zebra) で行われています。

[Zakura](/zcash-tech/zakura-node) はより新しいノードで、作者たちはこれを「スケールのために構築された、コンセンサス互換の Zcash フルノード」と説明しています。より高速な同期、ブロックのプルーニング、zcashd 互換モードを備えています。Zcash の共同創設者である Sean Bowe と Dev Ojha が主導しており、Apache 2.0 のもとで [zakura-core/zakura](https://github.com/zakura-core/zakura) にてオープンソース化されています。

ZecHub には、それぞれの違いとトレードオフを扱った [Full Nodes](/zcash-tech/full-nodes) ページがあります。

## フルノードウォレット

zcashd にはノードと一体化したウォレットが含まれていました。そのウォレットは廃止され、代替となるのが [Zallet](https://github.com/zcash/zallet) です。The Zallet Book では、これを「Rust で書かれたフルノード Zcash ウォレット」であり、「zcashd ウォレットの代替として構築中」であると説明しています。

これに依存する前に、セキュリティ警告を読んでください。Zallet はベータ版であり、「十分なレビューを受けていない」とされ、破壊的変更が「いつでも発生する可能性があり、その場合は Zallet ウォレットを削除して再作成する必要」があり、さらに zcashd の RPC メソッドのすべてがまだ移植されているわけではありません。

既存の構成を移行する場合は、ZecHub に [zcashd から Zebra と Zallet への移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) と [Zallet クイックリファレンス](/using-zcash/zallet-quick-reference-guide) があります。

## ライトウォレットサーバー

ほとんどのウォレットはノードを実行しません。代わりに、チェーンを保持し、そのコンパクトなビューを返すサーバーと通信します。

[lightwalletd](https://github.com/zcash/lightwalletd) は元祖となるサービスで、Go で書かれており、「Zcash ブロックチェーンへの帯域効率のよいインターフェースを提供するバックエンドサービス」と説明されています。[Zaino](/zcash-tech/zaino) はより新しいインデクサーで、Rust で書かれており、チェーンの独自コピーを保持するのではなく、フルバリデータから読み取ります。

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) のドキュメントでは、プロトコル自体が説明されています。[Lightwallet Nodes](/zcash-tech/lightwallet-nodes) ページでは、これらのサーバーがユーザーについて何を見られて何を見られないのかを解説しており、選ぶ前に理解しておく価値があります。

## ウォレットの構築

ウォレット開発の大半は [librustzcash](https://github.com/zcash/librustzcash) 配下の Rust クレートで行われており、モバイル SDK やいくつかのデスクトップウォレットもこれを基盤にしています。各クレートは [docs.rs](https://docs.rs) にドキュメントがあります。

| クレート | 用途 |
|:--|:--|
| zcash_client_backend | 同期やトランザクション構築を含む、「shielded な Zcash ライトクライアントを作成するための API」 |
| zcash_client_sqlite | 上記の保存層となる、「SQLite ベースの Zcash ライトクライアント」 |
| zcash_keys | 「Zcash の鍵とアドレスの管理」 |
| zcash_primitives | 「Zcash プリミティブの Rust 実装」 |
| zcash_protocol | 「Zcash プロトコルのネットワーク定数と値型」 |
| orchard | 「Orchard shielded transaction protocol」 |
| sapling-crypto | 「Zcash Sapling のための暗号ライブラリ」 |
| pczt | ハードウェア署名や複数デバイス署名に使われる、「部分的に作成された Zcash トランザクションを扱うためのツール」 |
| zip321 | ZIP 321 で規定された支払いリクエスト URI |

モバイル向けでは、[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) と [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) がそれらのライブラリをラップしています。iOS のリポジトリは以前は ZcashLightClientKit という名前だったため、古いリンクや記事ではその名称が使われています。

## 仕様と暗号技術

[プロトコル仕様](https://zips.z.cash/protocol/protocol.pdf) は、[アドレスと鍵のエンコーディング](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) を含め、Zcash がどのように動作するかについての権威ある資料です。

[ZIP](https://zips.z.cash) では変更提案と仕様策定が行われており、インデックスを見るとどれがドラフトでどれが最終版かがわかります。コンセンサス変更はネットワークアップグレードとして提供され、ZecHub ではそれらを [Network Upgrades](/start-here/network-upgrades) ページで追跡しています。

基盤となる暗号技術については、[The halo2 Book](https://zcash.github.io/halo2/index.html) と [The Orchard Book](https://zcash.github.io/orchard/) を、[halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) および [orchard](https://docs.rs/orchard/latest/orchard/) のクレートドキュメントとあわせて読んでください。[The FROST Book](https://frost.zfnd.org/) ではしきい値署名を扱っており、ZecHub にも [FROST](/zcash-tech/frost) ページがあります。

## テストネット

テストネットは TAZ と呼ばれる価値のないコインを使う別チェーンです。Zebra と Zakura はどちらもこれに接続して動作でき、[testnet guide](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) ではノード設定が説明されています。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) は動作中のテストネット用ブロックエクスプローラーで、メインネット版は [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) にあります。

TAZ を入手するのが厄介な部分です。公開フォーセットは現れたり消えたりしており、このページ執筆時点では古いドキュメントからリンクされていたものは応答していませんでした。確実な方法は Zcash R&D Discord で尋ねることで、これは Zcash の公式ドキュメント自体でも勧められている方法です。

## 一般ドキュメント

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) は今でも最も幅広い単一の情報源であり、プロトコルの概念、統合、マイニングを扱っています。ただし、読む際には少し注意が必要です。これは zcashd に対してバージョン管理されているため、一部はもはや動作しないノードについて説明している一方で、プロトコルやライトクライアントのセクションは依然として有用です。そこにある [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) は、ユーザーのプライバシーに関わるものを設計する前に読む価値があります。

ブロックチェーン全般に不慣れであれば、共通する基礎を学ぶための定番の推薦書は [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) で、全文を無料で読めます。ただし、shielded transaction は扱っていません。

## 開発者の間で言及されているその他のツール

[Arti](https://docs.rs/arti/latest/arti/) は Rust 実装の Tor で、ウォレット通信をルーティングするために zcash_client_backend で使われています。[Tailscale](https://github.com/tailscale/tailscale) は、自分で運用しているノードへ接続する手段としてよく挙がります。[warp2](https://github.com/hhanh00/warp2) は Hanh による高速同期実装ですが、2023年以降更新されていません。

## コミュニティとイベント

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) ではプロトコルやウォレット開発について議論されており、[Zcash Community Forum](https://forum.zcashcommunity.com/) にはより長文の提案やサポートスレッドがあります。

最近のハッカソン結果を見ると、人々が何を作っているかがよくわかります。[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)、そして [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985) を参照してください。

## 廃止されたリソース

古い記事からリンクされているため、また廃止されたノードがどのように動作していたかを知るための参照先として今も有用なため、ここに残しています。ここから始めないでください。

[The Zcashd Book](https://zcash.github.io/zcash/) と [zcashd RPC reference](https://zcash.github.io/rpc/) は、2026年7月に [end of life](https://zcash.github.io/zcash/user/end-of-life.html) を迎えたソフトウェアを記録したものです。[zcash/zcash](https://github.com/zcash/zcash) リポジトリはアーカイブされています。

追加すべきリソースがある場合や、ここに古くなった情報を見つけた場合は、issue または pull request を開いてください。チームには常にすべてを最新に保つ余力があるとは限らず、実際に遭遇したことを知らせることで、どのガイドを優先すべきかの判断に役立ちます。

**最終更新:** 2026年8月
