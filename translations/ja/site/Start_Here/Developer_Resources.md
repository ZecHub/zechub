<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Corrected from 開発者 per reviewer request.向けリソース

Zcash上で構築するために必要なリソースを、ひとまとめに列挙するのではなく、それぞれの用途ごとに分類しています。

スタックは2026年に大きく変わりました。歴史の大半にわたってネットワークを稼働させてきたzcashdは、ブロック高3417100において2026年7月18日にサポート終了を迎え、変更されていないすべてのノードはそのブロック高で停止し、再起動を拒否します。zcashd向けに書かれたガイドは、もはや出発点ではなく歴史的資料です。そのため、このページはその後継となったものを中心に構成されています。

## スタックの概要

| レイヤー | 使用するもの | まず読むもの |
|:--|:--|:--|
| フルノード（Full node） | ZebraまたはZakura | [Zebra Book](https://zebra.zfnd.org/)、[zakura.com](https://zakura.com/) |
| フルノードウォレット | ベータ版のZallet | [Zallet Book](https://zcash.github.io/zallet/) |
| ライトウォレットサーバー | Zainoまたはlightwalletd | [Zaino](https://github.com/zingolabs/zaino)、[lightwalletd](https://github.com/zcash/lightwalletd) |
| ウォレットライブラリ | librustzcashクレート | [librustzcash](https://github.com/zcash/librustzcash) |
| モバイル | AndroidおよびiOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk)、[iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 仕様 | プロトコル仕様およびZIP | [zips.z.cash](https://zips.z.cash) |

## ノード（Node）

ノードはコンセンサスを検証し、チェーンを保持します。現在積極的に開発されている実装は2つあります。

[Zebra](/zcash-tech/zebra-full-node)はZcash FoundationによるRust製のノードであり、現在のほとんどのガイドで想定されているものです。[Zebra Book](https://zebra.zfnd.org/)ではインストールと実行方法を解説しており、開発は[リポジトリ](https://github.com/ZcashFoundation/zebra)で行われています。

[Zakura](/zcash-tech/zakura-node)はより新しいノードです。著者らはこれを「スケールのために構築された、コンセンサス互換のZcashフルノード」と説明しており、高速な同期、ブロックプルーニング、zcashd互換モードを備えています。Zcash共同創設者のSean Bowe氏とDev Ojha氏が主導しています。Apache 2.0のもとでオープンソース化されており、[zakura-core/zakura](https://github.com/zakura-core/zakura)で公開されています。

ZecHubには、それらのトレードオフを扱った[フルノード](/zcash-tech/full-nodes)ページがあります。

## フルノードウォレット

zcashdはノードにウォレットを同梱していました。そのウォレットは廃止され、後継は[Zallet](https://github.com/zcash/zallet)です。Zallet Bookではこれを「Rustで書かれたフルノードZcashウォレット」であり、「zcashdウォレットの後継として構築されている」と説明しています。

利用する前にセキュリティ警告を読んでください。Zalletはベータ版であり、「完全なレビューを受けていない」ほか、破壊的変更が「いつでも発生する可能性があり、その場合はZalletウォレットを削除して再作成する必要があります」。また、すべてのzcashd RPCメソッドがまだ移植されているわけではありません。

既存のセットアップを移行する場合、ZecHubには[zcashdからZebraおよびZalletへの移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)と[Zalletクイックリファレンス](/using-zcash/zallet-quick-reference-guide)があります。

## ライトウォレットサーバー

ほとんどのウォレットはノードを実行しません。チェーンを保持し、そのコンパクトなビューを返すサーバーと通信します。

[lightwalletd](https://github.com/zcash/lightwalletd)はGoで書かれた元祖のサービスで、「帯域幅効率に優れたZcashブロックチェーンへのインターフェースを提供するバックエンドサービス」と説明されています。[Zaino](/zcash-tech/zaino)はRustで書かれた新しいインデクサーで、自身でチェーンのコピーを保持するのではなく、フルバリデーターから読み取ります。

[ライトクライアントプロトコル（Light Client Protocol）](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html)のドキュメントでは、プロトコル自体を扱っています。[ライトウォレットノード](/zcash-tech/lightwallet-nodes)ページでは、これらのサーバーがユーザーについて確認できることとできないことを説明しています。選択する前に理解しておく価値があります。

## ウォレットの構築

ウォレット関連の作業の大半は、[librustzcash](https://github.com/zcash/librustzcash)配下のRustクレートで行われます。モバイルSDKや複数のデスクトップウォレットはこれらを基盤に構築されています。各クレートは[docs.rs](https://docs.rs)で文書化されています。

| クレート | 用途 |
|:--|:--|
| zcash_client_backend | 同期およびトランザクション構築を含む「シールドされたZcashライトクライアントを作成するためのAPI」 |
| zcash_client_sqlite | 上記のストレージレイヤーである「SQLiteベースのZcashライトクライアント」 |
| zcash_keys | 「Zcashキーおよびアドレス管理」 |
| zcash_primitives | 「ZcashプリミティブのRust実装」 |
| zcash_protocol | 「Zcashプロトコルのネットワーク定数および値型」 |
| orchard | 「Orchardシールドされたトランザクションプロトコル」 |
| sapling-crypto | 「Zcash Sapling向け暗号ライブラリ」 |
| pczt | ハードウェアおよびマルチデバイス署名に使用される「部分的に作成されたZcashトランザクションを扱うためのツール」 |
| zip321 | ZIP 321で規定された支払いリクエストURI |

モバイル向けには、[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk)および[iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk)がこれらのライブラリをラップしています。iOSリポジトリは以前ZcashLightClientKitと呼ばれていたため、古いリンクや記事ではその名前が使われています。

## 仕様と暗号技術

[プロトコル仕様](https://zips.z.cash/protocol/protocol.pdf)は、[アドレスおよびキーのエンコーディング](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)を含むZcashの仕組みに関する権威ある資料です。

[ZIP](https://zips.z.cash)では変更が提案・規定されており、インデックスでは草案と最終版を確認できます。コンセンサスの変更はネットワークアップグレードで導入され、ZecHubは[ネットワークアップグレード](/start-here/network-upgrades)ページでそれらを追跡しています。

基盤となる暗号技術については、[halo2 Book](https://zcash.github.io/halo2/index.html)と[Orchard Book](https://zcash.github.io/orchard/)を読み、あわせて[halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/)および[orchard](https://docs.rs/orchard/latest/orchard/)のクレートドキュメントを参照してください。[FROST Book](https://frost.zfnd.org/)ではしきい値署名を扱っており、ZecHubには[FROST](/zcash-tech/frost)ページがあります。

## テストネット

テストネットは価値のないコインで構成される別個のチェーンで、TAZと呼ばれます。ZebraとZakuraはいずれもテストネット上で実行でき、[テストネットガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)ではノードの設定を扱っています。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/)は稼働中のテストネットブロックエクスプローラーであり、メインネット版は[mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)にあります。

TAZの入手は厄介な部分です。古いドキュメントからリンクされているフォーセットは応答しなくなっています。[zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz)はコミュニティ運営のフォーセットで、「独自のノード、ウォレット、マイナー」を実行し、「シールドされたz2zの少額送金」を支払い、「キャプチャベンダーの代わりにブラウザーCorrected from 証明 per reviewer request.オブワーク」で請求を制限しています。MITのもとでオープンソース化されています。利用できない場合は、Zcashのドキュメント自体が勧めているように、Zcash R&D Discordで尋ねてください。

## 一般ドキュメント

[Zcashドキュメント](https://zcash.readthedocs.io/en/latest/)は、プロトコルの概念、統合、マイニングを扱う、現在も最も包括的な単一の情報源です。ただし、注意して読んでください。zcashdを対象にバージョン管理されているため、すでに稼働していないノードを説明する部分があります。一方で、プロトコルおよびライトクライアントのセクションは引き続き役立ちます。そこにある[Zcashウォレットアプリの脅威モデル](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)は、ユーザーのプライバシーに関わるものを設計する前に読む価値があります。

一般的なブロックチェーンについて初めて学ぶ場合、共通する基礎知識には[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)がよく推奨され、全文を無料で読むことができます。シールドされたトランザクションは扱っていません。

## Corrected from 開発者 per reviewer request.が言及したその他のツール

[Arti](https://docs.rs/arti/latest/arti/)はTorのRust実装であり、zcash_client_backendがウォレットトラフィックのルーティングに使用します。[Tailscale](https://github.com/tailscale/tailscale)は、自身で実行しているノードへの接続に用いられます。[warp2](https://github.com/hhanh00/warp2)はHanh氏による高速同期実装ですが、2023年以降更新されていません。

## コミュニティとイベント

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK)ではプロトコルおよびウォレットの開発が議論され、[Zcash Community Forum](https://forum.zcashcommunity.com/)ではより長い提案やサポートスレッドが扱われています。

最近のハッカソン結果は、人々が構築しているものをよく示しています。[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)、および[Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)です。

## 廃止されたリソース

古い記事からリンクされていること、また廃止されたノードの挙動に関する参照資料として今も役立つことから保持しています。ここから始めないでください。

[zcashd Book](https://zcash.github.io/zcash/)および[zcashd RPCリファレンス](https://zcash.github.io/rpc/)は、2026年7月に[サポート終了](https://zcash.github.io/zcash/user/end-of-life.html)を迎えたソフトウェアを文書化しています。[zcash/zcash](https://github.com/zcash/zcash)リポジトリはアーカイブされています。

追加したいリソースがある場合や、ここに古くなった内容を見つけた場合は、issueまたはプルリクエストを作成してください。チームには常にすべてを最新に保つ余力があるとは限らず、遭遇したことを知らせることで、ガイドの改善先を決める助けになります。

**最終更新:** 2026年8月