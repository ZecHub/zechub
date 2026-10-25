#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[公式ウェブサイト](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabsは、人間の体験を向上させることに専念するビジョナリーのチームです。私たちは、テクノロジーは人類に恩恵をもたらすべきであり、合意に基づく相互作用を通じて繁栄すると信じています。私たちは、それを可能にするパターンを見出しています。

Zingo Lab CyanはShielded DAOとして運営されています。私たちは、すべてのメンバーがview keyを持つトレジャリーに資金を保管しています。メンバーが提案に賛成票を投じると、トレジャリーから資金が支出されます。

## プロジェクト

### Zingo! ウォレット ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo ウォレットは、ユーザーフレンドリーに設計されたフル機能のZcashウォレットですが、上級ユーザー向けの高度な機能も一部含まれています。transparent、Sapling、Ironwoodプールをサポートし、定期的な支払いのためのアドレス帳を備え、さまざまな言語で利用できます。Orchardをサポートし、NU5形式を実装した最初のウォレットでした。

Zingo!の主な機能の一つは、Memoフィールドを使用してトランザクションに関する有益な情報を提供できることです。

Zingo!はモバイルデバイスとPCで利用できます。すべてのダウンロードは[こちら](https://zingolabs.org/)で見つかります

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
アプリケーションで利用できるようZcash機能を公開するAPIおよびテストアプリです。Zingolibは、zingo-mobile用ライブラリに加え、zingo-cliという同梱のcliアプリケーションも提供しています。これは、[Zaino](/zcash-tech/zaino)のようなチェーンインデクサーと通信するコマンドラインのライトウォレットです。

### Zaino インデクサー ([GitHub](https://github.com/zingolabs/zaino))
Zainoは、Zingoチームが開発したZcashブロックチェーン向けのRustインデクサーです。[Z3スタック](/zcash-tech/z3-stack)におけるインデクサーであり、[Zebra](/zcash-tech/zebra-full-node)バリデータからチェーンデータをインデックス化し、ウォレット、エクスプローラー、その他のクライアントに提供します。lightwalletdの後継となる道筋です。

Zainoは、ウォレットなど完全なブロックチェーン履歴を必要としないアプリケーションやライトクライアント、およびフルクライアントやウォレットの両方に不可欠な機能を提供します。また、ブロックエクスプローラーもサポートし、Zebraフルバリデータが管理する確定済みブロックチェーンと、未確定のベストチェーンおよびメモリプールの両方へのアクセスを提供します。

`zcashd`は2026年7月18日、ブロック3,417,100でサポート終了による停止に達し、Ironwood（NU6.3）をサポートしていません。ZainoはZebraバリデータを読み取ります。

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Zcashプロセスを起動・管理するユーティリティ群です。これは、以下の開発における統合テストに使用されます。
- ライトクライアント
- インデクサー
- バリデータ

その目的は、Zebraのようなコアノード（バリデータ）、Zainoのようなインデクサー、zingo-cliのようなライトクライアントウォレット向けに、高度に適応可能で堅牢なテスト環境を提供することです。

起動されるデフォルトのスタックは、Zebrad、zainod、zcash-devtoolです。レガシーの`zcashd`およびlightwalletdプロセスは、サポートされていない`legacy-stack`機能の背後にあり、削除が予定されています。

Zcashチェーンデータ（mainnet、testnet、regtest用）の起動、キャッシュ、読み込みのためのツールを提供することに加え、zcash-local-netは、Zainoのテストスイートから、ZainoでホストされるLightwallet RPCサービスを評価するために使用されます（[Zainoテストドキュメント](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)を参照）。
