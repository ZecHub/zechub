#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[公式ウェブサイト](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabsは、人間の体験をより良くすることに尽力する先見性のある人々のチームです。私たちは、テクノロジーは人類に利益をもたらすべきであり、合意に基づく交流を通じて繁栄すると考えています。私たちは、これを可能にするパターンを特定しています。

Zingo Lab Cyanは、シールドされた（Shielded）DAOとして運営されています。私たちは資金をトレジャリー（treasury）に保管しており、すべてのメンバーがビューイングキー（viewing key）を保有しています。メンバーが提案に賛成票を投じると、資金はトレジャリーから支出されます。

## プロジェクト

### Zingo! ウォレット（Wallet）（[GitHub](https://github.com/zingolabs/zingo-mobile)）
Zingo ウォレットは、ユーザーフレンドリーに設計されたフル機能のZcashウォレットであり、より上級のユーザー向けの高度な機能もいくつか備えています。公開型（transparent）、Sapling、Ironwoodのプール（pool）をサポートし、繰り返し行う支払い（payment）のためのアドレス帳を備え、さまざまな言語で利用できます。Orchardをサポートし、NU5形式を実装した最初のウォレットでした。

Zingo!の主な機能の1つは、メモ（Memo）フィールドを使用して、トランザクション（transactions）に関する有益な情報を提供できることです。

Zingo!はモバイルデバイスおよびPCで利用できます。すべてのダウンロードは[こちら](https://zingolabs.org/)でご確認いただけます。

### Zingolib（[GitHub](https://github.com/zingolabs/zingolib)）
アプリによる利用に向けてzcash機能を公開するAPIおよびテストアプリです。Zingolibは、zingo-mobile向けのライブラリと、zingo-cliと呼ばれる同梱のcliアプリケーションの両方を提供します。これは、[Zaino](/zcash-tech/zaino)のようなチェーン（chain）インデクサーと通信するコマンドラインのライトクライアント（light client）ウォレットです。

### Zaino インデクサー（[GitHub](https://github.com/zingolabs/zaino)）
Zainoは、Zingoチームによって開発された、Zcashブロックチェーン（blockchain）向けのRustインデクサーです。[Z3スタック](/zcash-tech/z3-stack)におけるインデクサーであり、[Zebra](/zcash-tech/zebra-full-node)バリデーターからチェーンデータをインデックス化し、ウォレット、エクスプローラー、その他のクライアントに提供します。lightwalletdの後継となる道筋です。

Zainoは、ウォレットのように完全なブロックチェーン履歴を必要としないライトクライアントやアプリケーションと、フルクライアントまたはウォレットの両方に不可欠な機能を提供します。また、ブロックエクスプローラーもサポートしており、Zebraフルバリデーターによって管理される、確定済みブロックチェーンと未確定のベストチェーンおよびメモリプールの両方へのアクセスを可能にします。

`zcashd`は、2026年7月18日にブロック3,417,100でサポート終了停止に達し、Ironwood（NU6.3）をサポートしていません。ZainoはZebraバリデーターを読み取ります。

###  ZLN（zcash-local-net）（[GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net)）

Zcashプロセスを起動・管理するユーティリティ群です。これは、以下の開発における統合テストに使用されます。
- ライトクライアント
- インデクサー
- バリデーター

その目的は、Zebraのようなコアノード（バリデーター）、Zainoのようなインデクサー、zingo-cliのようなライトクライアントウォレットに向けて、高度に適応可能で堅牢なテスト環境を提供することです。

デフォルトで起動されるスタックは、Zebrad、zainod、zcash-devtoolです。レガシーの`zcashd`およびlightwalletdプロセスは、サポートされていない`legacy-stack`機能の背後にあり、削除が予定されています。

Zcashチェーンデータ（メインネット、テストネット、regtest向け）を開始、キャッシュ、ロードするツール（tools）を提供することに加え、zcash-local-netは、Zainoのテストスイートから使用され、ZainoでホストされるLightwallet RPCサービスを評価します（[Zainoテストドキュメント](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)を参照してください）。
