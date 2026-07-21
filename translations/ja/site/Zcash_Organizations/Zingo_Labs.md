#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Alt Text" width="50"/> ZingoLabs

[公式ウェブサイト](https://zingolabs.org/) - [Github](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs は、人間の体験をより良くすることに尽力する先見者たちのチームです。私たちは、テクノロジーは人類に利益をもたらすべきであり、合意に基づく相互作用を通じてこそ人は繁栄すると信じています。私たちは、それを可能にするパターンを見いだしています。

Zingo Lab Cyan は Shielded DAO として運営されています。私たちは資金をトレジャリーに保管しており、すべてのメンバーがビューキーを持っています。資金は、メンバーが提案に賛成票を投じたときにトレジャリーから支出されます。

## プロジェクト

### Zingo! Wallet ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet は、使いやすさを重視して設計されたフル機能の Zcash ウォレットでありながら、より上級のユーザー向けの高度な機能もいくつか備えています。transparent、Sapling、Orchard プールをサポートし、定期的な支払いのためのアドレス帳を備え、さまざまな言語で利用できます。Orchard を最初にサポートし、NU5 形式を最初に実装したウォレットでもあります。

Zingo! の主な特徴のひとつは、Memo フィールドを使用してトランザクションに関する有益なインサイトを提供できることです。

Zingo! はモバイル端末と PC で利用できます。すべてのダウンロードは[こちら](https://zingolabs.org/)で見つかります。

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
アプリケーションで利用するために zcash の機能を公開する API とテストアプリです。Zingolib は zingo-mobile 向けのライブラリを提供するとともに、lightwalletd 経由で zcashd とやり取りするための、Zingo-cli と呼ばれるコマンドライン lightwalletd プロキシクライアントである CLI アプリケーションも含んでいます。

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino は Zingo チームによって Rust で開発されたインデクサーで、lightwalletd を置き換え、zcashd 廃止プロジェクトを前進させることを目指しています。

Zaino は、ウォレットや完全なブロックチェーン履歴を必要としないアプリケーションのようなライトクライアントと、フルクライアントやウォレットの両方に不可欠な機能を提供します。また、ブロックエクスプローラーにも対応しており、Zebra または Zcashd のフルバリデーターによって管理される、確定済みブロックチェーンと未確定のベストチェーンおよびメモリプールの両方にアクセスできます。

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
Zcash のプロセスを起動・管理するユーティリティ群です。これは以下の開発における統合テストに使用されます。
- ライトクライアント
- インデクサー
- バリデーター

その目的は、zcash や zebra のようなコアノード（バリデーター）、lightwallet や zaino のようなインデクサー、そして最低限ではライトクライアントウォレットとしての zingo-cli に対して、高い適応性と堅牢性を備えたテスト環境を提供することです。

このリポジトリは、Zcashd 廃止プロセス中の移行を円滑にするために、さまざまなバリデーター（Zcashd や Zebrad など）とインデクサー（Lightwalletd や Zaino など）の機能を比較できるよう設計されています。

メインネット、テストネット、regtest 向けの Zcash チェーンデータを開始・キャッシュ・ロードするツールを提供することに加えて、zcash-zocal-net には、すべての Lightwallet RPC サービスにわたって Lightwalletd と Zaino の機能を比較する一連のテストも含まれています。これらのテストは、Zaino から直接実行して（[https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)])、Zaino 上でホストされる Lightwallet RPC サービスを評価できます。
