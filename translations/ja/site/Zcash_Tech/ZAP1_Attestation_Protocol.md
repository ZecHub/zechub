# ZAP1 アテステーション・プロトコル

ZAP1は、Zcash向けのオープンソースのアテステーション・プロトコルです。構造化されたライフサイクルイベントをBLAKE2bマークルツリーに書き込み、Orchardのシールドされたメモを通じてツリーのルートをオンチェーンにアンカーします。プルーフ（proof）は公開検証可能です。イベントデータはプライベートに保たれます。

## 仕組み

オペレーターはイベントタイプ（デプロイメント、支払い、転送など）を登録し、ZAP1インスタンスに送信します。各イベントは、ドメイン分離されたBLAKE2b-256を使用してリーフハッシュを生成します。リーフはマークルツリーに蓄積されます。しきい値に達すると、ツリーのルートはZAP1:09メモとしてエンコードされ、シールドされたトランザクション内でZcashにアンカーされます。

リーフハッシュを持つ人は誰でも、オペレーターを信頼することなく、リーフからルート、オンチェーンアンカーまでの完全なパスを検証できます。

## 主な特性

- **アプリケーション非依存**: 任意のZcashオペレーターは、独自のイベントタイプとパーソナライゼーション文字列を定義できます
- **プライバシー保護**: イベントペイロードはアンカー前にハッシュ化されます。オンチェーンに記録されるのはハッシュのみです。
- **独立して検証可能**: 検証に必要なのはプルーフバンドルとチェーンへのアクセスのみです。オペレーターへの信頼は必要ありません。
- **ZIP 302互換**: ZAP1は、アテステーションペイロード用のZIP 302 partTypeに向けて収束しています

## 現在存在するもの

- リファレンス実装（Rust、MITライセンス）
- crates.io上の検証SDK（Rust + 83KB WASM）
- npm上のJavaScript SDK
- ユニバーサルメモデコーダー（ZAP1、ZIP 302 TVLV、テキスト、バイナリ、空のメモを識別）
- 29件のAPIチェックと14件のプロトコルチェックを備えた適合性キット
- マルチパーティアンカーブロードキャスト向けのFROST 2-of-3しきい値署名設計
- レビュー中のZIPドラフトPR #1243
- 2026年3月時点で、14リーフを含む4件のメインネットアンカー

## アーキテクチャ

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

各オペレーターは、自身のキー、マークルツリー、アンカーを備えた独自のZAP1インスタンスを実行します。オペレーター間で共有される状態はありません。

## 詳細情報

- ソース: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- 検証SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- メモデコーダー: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- プロトコル仕様: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIPドラフト: [PR #1243](https://github.com/zcash/zips/pull/1243)
- ライブAPI: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- オペレーターガイド: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
