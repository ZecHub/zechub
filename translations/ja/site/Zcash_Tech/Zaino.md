<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zainoインデクサー

## 要約

* **Zebra**はZcashチェーンを検証します。
* **Zaino**はZebraのチェーンデータをインデックス化し、クライアント向けAPIを提供します。
* **Zallet**はZ3スタックのウォレットコンポーネントです。デフォルトのZ3構成では、ZalletはZebraに直接接続するため、スタンドアロンのZainoサービスは必要ありません。
* スタンドアロンのZainoサービスは、運用者がlightwalletd互換のgRPCエンドポイント、JSON-RPCプロキシ、またはライトウォレット、エクスプローラー、フォーセットなどのサービス向けインフラを必要とする場合に役立ちます。
* Zainoは稼働中のインフラですが、本番環境で実行する前に、運用者は現在のデプロイ手順について公式のZainoとZ3のドキュメントを確認してください。

## 基本説明

ZainoはZcashブロックチェーン向けのRustインデクサーです。Zebraフルノードからチェーンデータを読み取ります。Zebraがすべてのクライアント向けインデックスを担うことなく、ウォレット、エクスプローラー、フォーセット、その他のサービスに必要なデータを提供します。

### Zainoの役割

ZainoはZebraとクライアントソフトウェアの間に位置します。Zebraはコンセンサスノードで、Zcashブロックチェーンをダウンロード、検証し、その状態を追跡します。ZainoはチェーンデータのソースとしてZebraを利用し、クライアントアプリケーションが効率よく照会できるよう、インデックス化されたビューを準備します。

この分離によって、各コンポーネントの役割が明確になります。

| コンポーネント | 役割 |
|:--|:--|
| Zebra | フルノードおよび検証者 |
| Zaino | インデクサーおよびクライアント向けAPIサービス |
| Zallet | ウォレットサービス |
| lightwalletd | Zainoが置き換える、または補完するよう設計された旧式のライトウォレットサーバー |

Zainoはライトクライアント、フルクライアントやウォレット、ブロックエクスプローラー向けの機能を提供します。確定済みチェーン、未確定の最良チェーン、およびZebraが保持するメンプールデータにアクセスできます。

### 現行のZcash Stackにおける位置づけ

現行のZ3スタックは、Zebra、Zallet、およびオプションのZainoを中心に構成されています。

デフォルトのZ3デプロイでは、ZebraとZalletが一緒に動作します。ZalletはZebraに直接接続するため、ローカルウォレットスタックのみを実行する運用者は、スタンドアロンのZainoサービスを起動する必要はありません。

外部クライアントにサービスを提供する場合、Zainoを追加します。Z3では、`indexer`Composeプロファイルの背後で動作し、以下を追加します。

* ライトウォレットクライアント向けのlightwalletd互換gRPCエンドポイント
* エクスプローラー、フォーセット、サービスバックエンド向けのJSON-RPCプロキシ
* Zebraのチェーン状態とは別のインデクサーデータベース

このため、Zainoはウォレットバックエンド、公開インフラの運用者、エクスプローラー、フォーセット、およびインデックス化されたZcashチェーンデータを必要とするサービスをテストする開発者にとって、特に重要です。

### Zainoとlightwalletd

lightwalletdは従来のライトウォレットサーバーです。Zainoは、この役割を担うRustベースの後継経路です。ウォレットやサービスが一度に全面的な書き換えをせずに移行できるよう、可能な範囲で互換性のあるAPIを提供することを目指しています。

ただし、これはすべてのlightwalletdデプロイがすでにZainoに移行したことを意味しません。運用者はZainoを現行のZebraベースのスタックの一部として扱い、実行するものを選ぶ前に、最新のプロジェクトドキュメント、リリース、サービスダッシュボードを確認してください。

## 視覚的な説明 / たとえ

Zcashブロックチェーンを、台帳のページが詰まった巨大なアーカイブだと考えてください。

Zebraはアーキビストです。新しいページをすべて受け取り、そのページがルールに従っているかを確認し、適切な場所に保管します。

Zainoはアーカイブの前にある案内デスクです。Zebraが保管した内容を読み取り、素早く検索できる目録を作成して、来訪者の質問にすばやく答えます。ライトウォレット、エクスプローラー、フォーセットは、「このブロックには何が含まれていますか？」や「メンプールで待機しているトランザクションはどれですか？」といった質問をしに、この案内デスクを訪れます。案内デスクがページの正当性を判断することはありません。その役割はアーキビストが担います。

デフォルトのZ3構成では、Zalletは同じ建物内で動作し、アーキビストのところへ直接向かいます。案内デスクを必要としません。

### Zainoの動作を示す図

#### Zainoの内部アーキテクチャ

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Zainoのライブサービスアーキテクチャ

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Zainoのシステムアーキテクチャ

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## 詳細

### 運用者向けの注意事項

最も簡単で信頼できるデプロイ手順は、Z3リポジトリにあります。Z3にはオプションのサービスとしてZainoが含まれています。

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

通常のZ3セットアップを先に実行し、メインネットまたはテストネットで依存するサービスを起動する前に、Zebraの同期が完了するまで待ってください。

Zainoは2種類のネットワークサービスを提供します。gRPCサービスはライトウォレット向けAPIです。JSON-RPCサービスは、別の保護レイヤーがない限り、ループバックまたは信頼できるプライベートネットワークでの利用を想定しています。認証や暗号化のないJSON-RPCエンドポイントを公開インターネットに公開しないでください。

## よくある誤解

**Zainoをフルノードとして扱う。** Zainoは検証者ではありません。チェーンを検証するのはZebraで、ZainoはZebraからデータをインデックス化します。

**すべてのZ3デプロイでスタンドアロンのZainoが必要だと思い込む。** デフォルトのZ3スタックでは、ZalletはZebraに直接接続できます。外部クライアント向けのスタンドアロンインデクサーサービスが必要な場合に、Zainoを起動してください。

**計画中の機能をすでに提供されているものとして紹介する。** Zainoは活発に開発されているため、機能が利用可能だと説明する前に、最新のリリースノートとドキュメントを確認してください。

**JSON-RPCを不用意に公開する。** ZainoのJSON-RPCインターフェースは、別のレイヤーで保護されていない限り、ループバックまたは信頼できるプライベートネットワーク向けです。

## 関連ページ

- [ライトウォレットノード](/zcash-tech/lightwallet-nodes)：ライトウォレットが接続するサーバーであるlightwalletdとZaino、およびそれらを切り替える方法です。
- [Zinder](/zcash-tech/zinder)：Zcash Foundationの別のRustインデクサー（アルファ版）です。
- [Zebraフルノード](/zcash-tech/zebra-full-node)：ノードがチェーンデータを読み取る元ですZaino。
- [Zallet](/zcash-tech/zallet)：Z3スタックのフルノードウォレットです。
- [Z3スタック](/zcash-tech/z3-stack)：Zebra、Zallet、およびオプションのZainoインデクサーをまとめてパッケージ化したものです。
- [インデクサーのベンチマーク：ZainoとZtreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)：2つのライトウォレットインデクサーを再現可能な方法で比較します。
- [フルノード](/zcash-tech/full-nodes)：Zcashのフルノードソフトウェアの概要です。
- [Zcashウォレットの同期](/zcash-tech/zcash-wallet-syncing)：シールドされたウォレットにそもそも同期プロセスが必要な理由です。

### リソース

* [Zaino GitHubリポジトリ](https://github.com/zingolabs/zaino)
* [Zainoリリース](https://github.com/zingolabs/zaino/releases)
* [Zaino生成されたドキュメント](https://zingolabs.github.io/zaino/)
* [Z3デプロイリポジトリ](https://github.com/ZcashFoundation/z3)
* [Zebraドキュメント](https://zebra.zfnd.org/)
* [Zaino助成金とプロジェクトに関する議論](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**最終更新日:** 2026年11月
