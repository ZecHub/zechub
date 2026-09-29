<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 開発者向けリソース

Zcash上で構築するために必要なリソースを、用途別にまとめました。

スタックは2026年に大きく変わりました。歴史の大半でネットワークを稼働させていたzcashdは、ブロック高3417100で2026年7月18日にサポート終了を迎え、変更されていないすべてのノードはそのブロック高で停止し、再起動も拒否します。zcashd向けに書かれたガイドは、もはや出発点ではなく歴史的資料です。そのため、このページは後継となるものを中心に構成されています。

## スタックの概要

| レイヤー | 使用するもの | まずはこちらから |
|:--|:--|:--|
| フルノード | Zebra または Zakura | [The Zebra Book](https://zebra.zfnd.org/)、[zakura.com](https://zakura.com/) |
| フルノードウォレット | ベータ版のZallet | [The Zallet Book](https://zcash.github.io/zallet/) |
| ライトウォレットサーバー | Zaino または lightwalletd | [Zaino](https://github.com/zingolabs/zaino)、[lightwalletd](https://github.com/zcash/lightwalletd) |
| ウォレットライブラリ | librustzcashのクレート群 | [librustzcash](https://github.com/zcash/librustzcash) |
| モバイル | AndroidおよびiOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk)、[iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 仕様 | プロトコル仕様とZIP | [zips.z.cash](https://zips.z.cash) |

## ノード

ノードはコンセンサスを検証し、チェーンを保持します。現在活発に開発されている実装は2つあります。

[Zebra](/zcash-tech/zebra-full-node)はZcash FoundationによるRust製のノードで、現在の大半のガイドが前提としているものです。[The Zebra Book](https://zebra.zfnd.org/)ではインストールと実行方法を説明しており、開発は[リポジトリ](https://github.com/ZcashFoundation/zebra)で行われています。

[Zakura](/zcash-tech/zakura-node)はより新しいノードで、作者らは「スケールのために構築された、コンセンサス互換のZcashフルノード」と説明しています。より高速な同期、ブロックプルーニング、zcashd互換モードを備えています。Zcash共同創設者のSean BoweとDev Ojhaが主導しており、Apache 2.0ライセンスのオープンソースとして[zakura-core/zakura](https://github.com/zakura-core/zakura)で公開されています。

ZecHubには、両者のトレードオフを扱う[フルノード](/zcash-tech/full-nodes)ページがあります。

## フルノードウォレット

zcashdにはノードとともにウォレットが組み込まれていました。そのウォレットは廃止され、後継は[Zallet](https://github.com/zcash/zallet)です。The Zallet Bookでは、Zalletを「Rustで書かれたフルノードZcashウォレット」であり、「zcashdウォレットの後継として構築されている」と説明しています。

利用する前にセキュリティに関する警告を読んでください。Zalletはベータ版であり、「完全なレビューを受けておらず」、破壊的変更が「いつでも発生する可能性があり、その場合はZalletウォレットを削除して再作成する必要があります」。また、すべてのzcashd RPCメソッドがまだ移植されているわけではありません。

既存のセットアップを移行する場合、ZecHubには[zcashdからZebraおよびZalletへの移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)と、[Zalletクイックリファレンス](/using-zcash/zallet-quick-reference-guide)があります。

## ライトウォレットサーバー

ほとんどのウォレットはノードを実行しません。チェーンを保持し、そのコンパクトなビューを返すサーバーと通信します。

[lightwalletd](https://github.com/zcash/lightwalletd)はGoで書かれた元祖のサービスで、「Zcashブロックチェーンへの帯域幅効率のよいインターフェースを提供するバックエンドサービス」と説明されています。[Zaino](/zcash-tech/zaino)はRustで書かれた新しいインデクサーで、独自にチェーンのコピーを保持するのではなく、フルバリデータからデータを読み取ります。

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html)のドキュメントでは、プロトコルそのものを扱っています。[ライトウォレットノード](/zcash-tech/lightwallet-nodes)ページでは、これらのサーバーがユーザーについて確認できる情報と確認できない情報を説明しています。選ぶ前に理解しておく価値があります。

## ウォレットの構築

ウォレット開発の大部分は、モバイルSDKや複数のデスクトップウォレットが基盤としている[librustzcash](https://github.com/zcash/librustzcash)配下のRustクレートで行われます。各クレートは[docs.rs](https://docs.rs)で文書化されています。

| クレート | 用途 |
|:--|:--|
| zcash_client_backend | 同期およびトランザクション構築を含む、「シールドされたZcashライトクライアントを作成するためのAPI」 |
| zcash_client_sqlite | 「SQLiteベースのZcashライトクライアント」。上記のストレージレイヤー |
| zcash_keys | 「Zcashの鍵およびアドレス管理」 |
| zcash_primitives | 「ZcashプリミティブのRust実装」 |
| zcash_protocol | 「Zcashプロトコルのネットワーク定数と値型」 |
| orchard | 「Orchardシールドトランザクションプロトコル」 |
| sapling-crypto | 「Zcash Sapling向け暗号ライブラリ」 |
| pczt | ハードウェアおよび複数デバイスでの署名に使われる、「部分的に作成されたZcashトランザクションを扱うためのツール」 |
| zip321 | ZIP 321で規定される支払いリクエストURI |

モバイル向けには、[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk)と[iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk)がこれらのライブラリをラップしています。iOSリポジトリは以前ZcashLightClientKitと呼ばれていたため、古いリンクや記事ではその名前が使われています。

## 仕様と暗号技術

[プロトコル仕様](https://zips.z.cash/protocol/protocol.pdf)は、[アドレスおよび鍵のエンコーディング](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)を含む、Zcashの仕組みに関する権威ある資料です。

[ZIP](https://zips.z.cash)では変更が提案・規定され、インデックスでは草案と確定済みのものを確認できます。コンセンサスの変更はネットワークアップグレードで導入され、ZecHubは[ネットワークアップグレード](/start-here/network-upgrades)ページでそれらを追跡しています。

基盤となる暗号技術については、[The halo2 Book](https://zcash.github.io/halo2/index.html)と[The Orchard Book](https://zcash.github.io/orchard/)を読み、併せて[halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/)および[orchard](https://docs.rs/orchard/latest/orchard/)のクレートドキュメントを参照してください。[The FROST Book](https://frost.zfnd.org/)ではしきい値署名を扱っており、ZecHubには[FROST](/zcash-tech/frost)ページがあります。

## テストネット

テストネットは、価値のないTAZというコインを使用する独立したチェーンです。ZebraとZakuraはいずれもテストネットに接続して実行でき、[テストネットガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)ではノードの設定を説明しています。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/)は稼働中のテストネットブロックエクスプローラーで、メインネット版は[mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)にあります。

TAZを入手することが難しい部分です。これは、古いドキュメントからリンクされているファウセットが応答しなくなったためです。[zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz)はコミュニティ運営のファウセットで、「独自のノード、ウォレット、マイナー」を運用し、「シールドされたz2zの少額送金」を支払い、「captchaベンダーの代わりにブラウザ上のプルーフ・オブ・ワーク」で請求を制限します。MITライセンスのオープンソースです。利用できない場合は、Zcash R&D Discordで尋ねてください。Zcashのドキュメント自体もそう勧めています。

## 一般ドキュメント

[Zcashドキュメント](https://zcash.readthedocs.io/en/latest/)は、プロトコルの概念、統合、マイニングを扱う、今なお最も幅広い単一の情報源です。ただし、注意して読んでください。これはzcashdを対象にバージョニングされているため、一部はもはや稼働しないノードを説明しています。一方で、プロトコルおよびライトクライアントのセクションは引き続き有用です。そこにある[Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)は、ユーザーのプライバシーに関わるものを設計する前に読む価値があります。

ブロックチェーン全般に不慣れな場合、共通する基礎について通常推奨されるのは[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)であり、全文を無料で読めます。シールドトランザクションは扱っていません。

## 開発者が言及しているその他のツール

[Arti](https://docs.rs/arti/latest/arti/)はTorのRust実装で、zcash_client_backendがウォレットのトラフィックをルーティングするために使用します。[Tailscale](https://github.com/tailscale/tailscale)は、自分で運用するノードに接続する用途でよく挙げられます。[warp2](https://github.com/hhanh00/warp2)はHanhによる高速同期実装ですが、2023年以降更新されていません。

## コミュニティとイベント

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK)ではプロトコルおよびウォレット開発が議論されており、[Zcash Community Forum](https://forum.zcashcommunity.com/)にはより長い提案やサポートスレッドが掲載されています。

最近のハッカソンの結果は、人々が何を構築しているかを知るよい手がかりになります：[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)、[Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)。

## 廃止されたリソース

古い記事からリンクされていること、そして廃止されたノードの動作に関する参照資料であり続けることから残しています。ここから始めないでください。

[The Zcashd Book](https://zcash.github.io/zcash/)と[zcashd RPCリファレンス](https://zcash.github.io/rpc/)は、2026年7月に[サポート終了](https://zcash.github.io/zcash/user/end-of-life.html)となったソフトウェアを文書化しています。[zcash/zcash](https://github.com/zcash/zcash)リポジトリはアーカイブされています。

追加したいリソースがある場合、またはここに古くなった情報を見つけた場合は、issueまたはプルリクエストを作成してください。チームには常にすべてを最新に保つ余力があるとは限らず、遭遇した問題を知らせることがガイドの改善につながります。

**最終更新:** 2026年8月
