# ZAP1 認証プロトコル

ZAP1 は、Zcash 用のオープンソース認証プロトコルです。構造化されたライフサイクルイベントを BLAKE2b メルクリー木に記録し、Orchard シールドメモを通じてチェーン上に木のルートをアンカーします。証明は公開で検証可能です。イベントデータはプライベートに保たれます。

## 仕組み

運用者はイベントタイプ（展開、支払い、転送など）を登録し、ZAP1 インスタンスに提出します。各イベントはドメイン分離された BLAKE2b-256 を使用して葉ハッシュを作成します。葉はメルクリー木に蓄積されます。しきい値に達すると、木のルートは ZAP1:09 メモとしてエンコードされ、シールドトランザクションを通じて Zcash にアンカーされます。

葉ハッシュを持つ誰でも、葉からルート、チェーン上のアンカーまでのフルパスを検証できます。運用者への信頼は不要です。

## 主な特性

- **アプリケーション非依存**: 任意の Zcash 運用者は独自のイベントタイプとパーソナライゼーション文字列を定義できます
- **プライバシー保護**: イベントペイロードはアンカー前にハッシュされます。チェーン上にはハッシュのみが記録されます。
- **独立検証可能**: 検証には証明バンドルとチェーンへのアクセスが必要です。運用者への信頼は不要です。
- **ZIP 302 互換性あり**: ZAP1 は認証ペイロード用の ZIP 302 partType に収束しています

## 現在存在するもの

- 参考実装（Rust、MIT ライセンス）
- 検証 SDK（crates.io 上、Rust + 83KB WASM）
- JavaScript SDK（npm 上）
- 一般的なメモデコーダー（ZAP1、ZIP 302 TVLV、テキスト、バイナリ、空のメモを識別）
- 29 の API チェックと 14 のプロトコルチェックが含まれる適合キット
- 多数参加アンカー放送用 FROST 2-of-3 閾値署名設計
- ZIP 草案 PR #1243（レビュー中）
- 2026年3月現在、メインネットに4つのアンカーがあり、それぞれ14の葉があります

## アーキテクチャ

```
あなたのアプリ --> ZAP1 API --> メルクリー木 --> Zcash アンカー
                  |                                    |
             イベントタイプ                         シールドメモ
          (DEPLOYMENT, など)                    (ZAP1:09:{root})
```

各運用者は独自の鍵、メルクリー木、アンカーを持つ独自の ZAP1 インスタンスを実行します。運用者間で共有された状態はありません。

## 詳しく知るには

- ソースコード: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- 検証 SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- メモデコーダー: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- プロトコル仕様: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP 草案: [PR #1243](https://github.com/zcash/zips/pull/1243)
- ライブ API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- 運用者ガイド: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
