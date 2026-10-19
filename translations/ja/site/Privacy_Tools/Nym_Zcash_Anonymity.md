<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Nym Mixnet による Zcash の匿名性

> 最終確認日: 2026年10月18日

Zcash のシールドプールは、オンチェーン上の金額、送信者、受信者を隠します。ウォレットと lightwallet サーバー間のネットワーク経路は隠しません。Nym の Mixnet は、その欠けているネットワーク層の保護を追加します。2026年10月時点で、この統合は本番ウォレット（Zingo、Zkool）で稼働しています。

出典: [Nym が Zcash ウォレットに匿名性を追加する仕組み](https://nym.com/blog/zcash-mixnet-anonymity)（Nym、2026年10月13日）。

## 保護されるもの

Nym は、トランザクションパケット（通常は支払いデータと ZK 証明で 7～15 KB）を Sphinx パケットに分割し、Mixnet 経由でルーティングします。これにより、以下が実現されます。

- lightwallet サーバーから送信者の IP を隠す
- トラフィックを他の Nym トラフィックに混ぜる
- デフォルト設定でおよそ 17 ビットのエントロピーを提供し、匿名集合は 100,000 ユーザー超とされています

Zingo v7 では、支払いと価格リクエストはデフォルトでこの経路をたどります。

## 保護されないもの

チェーン同期、nullifier クエリ、トランザクション取得、mempool トラフィックは、現在は通常の indexer 接続を使用します。混合パケット外のデバイスレベルまたはアプリケーションレベルのメタデータも、Nym の対象外です。

脅威モデルで同期トラフィックを隠す必要がある場合は、ネイティブ Mixnet 対応ウォレットとシステムレベルの NymVPN を組み合わせてください。[Nym VPN](/guides/nym-vpn) を参照してください。

## ウォレット

| ウォレット | ステータス | 注記 |
| --- | --- | --- |
| Zingo v7 | 稼働中、デフォルト | `makers run-cli` は `nym-proxy` をバンドルしています。セッションはオフラインで開始され、`--online`、`--remember-online`、または `--server` により同意が与えられます。 |
| Zkool | 稼働中 | ネイティブ Mixnet 統合。 |
| その他 | NymVPN 経由 | システムレベルの Mixnet モードを通じてウォレットをルーティングします。 |

ウォレットレベルの経路に関するセットアップ詳細は、[Zcash のウォレットトラフィックを Nym Mixnet 経由でルーティングする](/guides/nym-mixnet-wallet-setup) にあります。

## トレードオフ

Nym 経由のブロードキャストは、通常のインターネット経由（約 3.4 秒）よりおよそ 12.5 倍遅くなります。Tor はより高速（約 3.7 倍）ですが、混合なしの FIFO ストリームを使用するため、グローバルな敵対者は依然として相関付けできます。追加の遅延を加えるよりも、共有される Nym のユーザーベースを増やす方が、匿名性をより効果的に高めます。

## アプリケーション層の衛生対策: nym-swizzle-zcash

ネットワーク層の保護だけでは不十分です。完全な Mixnet や VPN を使用していても、lightwallet サーバーはアプリケーション層のパターンを観察することで、セッションを関連付けられる可能性があります。

- 再開ポイントの連鎖: クライアントは正確に `previous end + 1` から同期を再開するため、サーバーはブロック高だけでセッションを連鎖させられます。
- 同期してから送信: ウォレットはブロードキャストの直前に同期するため、サーバーはトランザクションを前回の同期セッションに帰属させられます。

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate は、両方に対処する Zcash 固有の衛生ポリシーを実装しています。これは、一般的な `nym-swizzle` プリミティブを、light client 向けのチェーン認識ポリシーにパッケージ化したものです。

**量子化された同期範囲。** リクエストは、1日単位のセルを持つネットワーク全体のグリッドへと拡張されます。開始地点は切り捨てられ、終了地点は切り上げられます。範囲は決定的で、昇順かつ互いに重複しません。reorg チェックは拡張された範囲内にとどまるため、正確な再開ポイントは明らかになりません。匿名性はノイズではなく衝突（多数のウォレットが同じ境界を送信すること）から生じます。

**分離されたブロードキャスト。** トランザクション送信は、ZIP 318 の転送スケジューリングに合わせた指数分布（平均 144 ブロック ≈ 3 時間、上限 576 ブロック ≈ 12 時間）により遅延されます。遅延は一般的なプロセス寿命を超えるため、スケジュールは永続化されます。トランザクションは、発火時にのみ最新の tip を基準として構築されます。同期とブロードキャストでは異なるサーバーを使用するべきです。

この crate は `BlockSource` および `TxBroadcaster` trait を公開し、`wasm32-unknown-unknown` 向けにコンパイルでき、独自のネットワークスタックは持ちません。完全な API と例については、[Nym のドキュメント](https://nym.com/docs/developers/swizzle/zcash) を参照してください。

## 出典

- [Nym が Zcash ウォレットに匿名性を追加する仕組み](https://nym.com/blog/zcash-mixnet-anonymity) — Nym、2026年10月13日
- [nym-swizzle-zcash: Zcash Light Clients 向け衛生ポリシー](https://nym.com/docs/developers/swizzle/zcash) — Nym Docs
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Zcash のウォレットトラフィックを Nym Mixnet 経由でルーティングする](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
