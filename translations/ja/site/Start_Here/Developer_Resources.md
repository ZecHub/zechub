<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 開発者向けリソース

Zcash上で開発するために必要なリソースを、ひとまとめに列挙するのではなく、それぞれの用途ごとに整理しました。

スタックは2026年に大きく変わりました。歴史の大半でネットワークを運用してきたzcashdは、ブロック高3417100において2026年7月18日にサポート終了を迎え、改変されていないすべてのノードはそのブロック高で停止し、再起動を拒否します。zcashd向けに書かれたガイドは、もはや出発点ではなく歴史的資料です。そのため、このページは後継となったものを中心に構成されています。

## スタックの概要

| レイヤー | 使用するもの | まずはここから |
|:--|:--|:--|
| フルノード | Zebra または Zakura | [The Zebra Book](https://zebra.zfnd.org/)、[zakura.com](https://zakura.com/) |
| フルノードウォレット | ベータ版のZallet | [The Zallet Book](https://zcash.github.io/zallet/) |
| ライトウォレットサーバー | Zaino または lightwalletd | [Zaino](https://github.com/zingolabs/zaino)、[lightwalletd](https://github.com/zcash/lightwalletd) |
| ウォレットライブラリ | librustzcashのクレート | [librustzcash](https://github.com/zcash/librustzcash) |
| モバイル | AndroidおよびiOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk)、[iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 仕様 | プロトコル仕様およびZIP | [zips.z.cash](https://zips.z.cash) |

## ノード

ノードはコンセンサスを検証し、チェーンを保持します。現在積極的に開発されている実装は2つあります。

[Zebra](/zcash-tech/zebra-full-node)はZcash FoundationのRust製ノードで、現在ほとんどのガイドが前提としているものです。[The Zebra Book](https://zebra.zfnd.org/)ではインストールと実行方法を説明しており、開発は[リポジトリ](https://github.com/ZcashFoundation/zebra)で行われています。

[Zakura](/zcash-tech/zakura-node)は新しいノードで、作者らは「スケールのために構築された、コンセンサス互換のZcashフルノード」と説明しています。より高速な同期、ブロックプルーニング、zcashd互換モードを備えています。Zcash共同創設者のSean BoweとDev Ojhaが主導しており、[zakura-core/zakura](https://github.com/zakura-core/zakura)でApache 2.0ライセンスのオープンソースとして公開されています。

ZecHubには、それぞれのトレードオフを説明する[フルノード](/zcash-tech/full-nodes)ページがあります。

## フルノードウォレット

zcashdにはノードとともにウォレットが組み込まれていました。そのウォレットは廃止され、後継となるのが[Zallet](https://github.com/zcash/zallet)です。The Zallet Bookでは、Zalletを「Rustで書かれたフルノードZcashウォレット」であり、「zcashdウォレットの後継として構築されている」と説明しています。

依存する前にセキュリティ警告を読んでください。Zalletはベータ版であり、「完全なレビューを受けておらず」、破壊的変更が「いつでも発生する可能性があり、その場合はZalletウォレットを削除して再作成する必要があります」。また、すべてのzcashd RPCメソッドがまだ移植されているわけではありません。

既存の構成を移行する場合、ZecHubには[zcashdからZebraおよびZalletへの移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)と[Zalletクイックリファレンス](/using-zcash/zallet-quick-reference-guide)があります。

## ライトウォレットサーバー

ほとんどのウォレットはノードを実行しません。チェーンを保持し、そのコンパクトなビューを返すサーバーと通信します。

[lightwalletd](https://github.com/zcash/lightwalletd)はGoで書かれた元祖のサービスで、「Zcashブロックチェーンへの帯域幅効率の高いインターフェースを提供するバックエンドサービス」と説明されています。[Zaino](/zcash-tech/zaino)はRustで書かれた新しいインデクサーで、独自のチェーンコピーを保持するのではなく、フルバリデータから読み取ります。

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html)のドキュメントではプロトコル自体を扱っています。[ライトウォレットノード](/zcash-tech/lightwallet-nodes)ページでは、これらのサーバーがユーザーについて確認できる情報と確認できない情報を説明しており、選択前に理解しておく価値があります。

## ウォレットの構築

ほとんどのウォレット開発は[librustzcash](https://github.com/zcash/librustzcash)配下のRustクレートで行われ、モバイルSDKや複数のデスクトップウォレットがこれを基盤としています。各クレートは[docs.rs](https://docs.rs)で文書化されています。

| クレート | 用途 |
|:--|:--|
| zcash_client_backend | 同期とトランザクション構築を含む「シールドされたZcashライトクライアントを作成するためのAPI」 |
| zcash_client_sqlite | 「SQLiteベースのZcashライトクライアント」であり、上記のストレージレイヤー |
| zcash_keys | 「Zcashの鍵およびアドレス管理」 |
| zcash_primitives | 「ZcashプリミティブのRust実装」 |
| zcash_protocol | 「Zcashプロトコルのネットワーク定数および値型」 |
| orchard | 「Orchardシールドトランザクションプロトコル」 |
| sapling-crypto | 「Zcash Sapling向け暗号ライブラリ」 |
| pczt | ハードウェアおよび複数デバイスでの署名に使われる、「部分作成済みZcashトランザクションを扱うためのツール」 |
| zip321 | ZIP 321で定義された支払いリクエストURI |

モバイル向けには、[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk)と[iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk)がこれらのライブラリをラップしています。iOSリポジトリは以前ZcashLightClientKitという名前だったため、古いリンクや記事ではこの名称が使われています。

## 仕様と暗号技術

[プロトコル仕様](https://zips.z.cash/protocol/protocol.pdf)は、[アドレスおよび鍵のエンコーディング](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)を含む、Zcashの動作に関する権威ある資料です。

[ZIP](https://zips.z.cash)は変更の提案と仕様化が行われる場であり、インデックスではドラフトと最終版を確認できます。コンセンサス変更はネットワークアップグレードで導入され、ZecHubは[ネットワークアップグレード](/start-here/network-upgrades)ページでこれらを追跡しています。

基盤となる暗号技術については、[The halo2 Book](https://zcash.github.io/halo2/index.html)と[The Orchard Book](https://zcash.github.io/orchard/)を読み、併せて[halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/)および[orchard](https://docs.rs/orchard/latest/orchard/)のクレートドキュメントも参照してください。[The FROST Book](https://frost.zfnd.org/)ではしきい値署名を扱っており、ZecHubには[FROST](/zcash-tech/frost)ページがあります。

## テストネット

テストネットはTAZと呼ばれる価値のないコインを持つ別チェーンです。ZebraとZakuraはどちらもこれに接続して実行でき、[テストネットガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)ではノード設定を説明しています。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/)は稼働中のテストネットブロックエクスプローラーで、メインネット版は[mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)にあります。

TAZの入手が難しい部分です。公開フォーセットは現れたり消えたりしており、このページの執筆時点では古いドキュメントからリンクされているものは応答していませんでした。確実な方法はZcash R&D Discordで尋ねることであり、Zcashのドキュメント自体もそう提案しています。

## 一般ドキュメント

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/)は、プロトコルの概念、統合、マイニングを扱う、今なお最も包括的な単一の情報源です。ただし注意して読んでください。zcashdに対してバージョン管理されているため、一部はすでに実行されなくなったノードについて説明しています。一方で、プロトコルとライトクライアントのセクションは引き続き有用です。そこにある[Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)は、ユーザーのプライバシーに関わるものを設計する前に読む価値があります。

ブロックチェーン全般が初めての場合、共通する基礎知識については[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)が通常推奨され、全文を無料で読むことができます。シールドトランザクションは扱っていません。

## 開発者が言及したその他のツール

[Arti](https://docs.rs/arti/latest/arti/)はTorのRust実装で、zcash_client_backendがウォレットトラフィックのルーティングに使用します。[Tailscale](https://github.com/tailscale/tailscale)は、自分で実行するノードへの接続に利用されています。[warp2](https://github.com/hhanh00/warp2)はHanhによる高速同期実装ですが、2023年以降更新されていません。

## コミュニティとイベント

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK)ではプロトコルとウォレット開発について議論され、[Zcash Community Forum](https://forum.zcashcommunity.com/)にはより長い提案やサポートスレッドが投稿されています。

最近のハッカソン結果は、人々が何を構築しているかをよく示しています：[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)、[Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)。

## 廃止されたリソース

古い記事からリンクされており、廃止されたノードの動作に関する参照資料でもあるため残しています。ここから始めないでください。

[The Zcashd Book](https://zcash.github.io/zcash/)および[zcashd RPCリファレンス](https://zcash.github.io/rpc/)は、2026年7月に[サポート終了](https://zcash.github.io/zcash/user/end-of-life.html)となったソフトウェアを文書化しています。[zcash/zcash](https://github.com/zcash/zcash)リポジトリはアーカイブされています。

追加したいリソースがある場合、またはここで古くなっている情報を見つけた場合は、issueまたはプルリクエストを作成してください。チームには常にすべてを最新に保つ余力があるとは限らず、遭遇した問題を知らせることがガイドの改善に役立ちます。

**最終更新：** 2026年8月
