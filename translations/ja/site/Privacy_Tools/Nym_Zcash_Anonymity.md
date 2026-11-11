<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym MixnetによるZcashの匿名性

> 最終確認日: 2026年10月18日

Zcashのシールドされた（shielded）プール（pool）は、オンチェーン（on-chain）上の金額、送信者、受信者を隠します。ただし、ウォレット（wallet）とlightwalletサーバー間のネットワーク経路は隠しません。NymのMixnetは、この不足していたネットワーク層の保護を追加します。2026年10月時点で、この統合は本番ウォレット（Zingo、Zkool）で稼働しています。

出典: [NymがZcashウォレットに匿名性を追加する方法](https://nym.com/blog/zcash-mixnet-anonymity)（Nym、2026年10月13日）。

## 保護されるもの

Nymは、トランザクション（transaction）パケット（通常は支出データとZK proofの7〜15 KB）をSphinxパケットに分割し、Mixnet経由でルーティングします。これにより、以下が実現します。

- ライトクライアント（light client）サーバーから送信者のIPを隠します
- トラフィックを他のNymトラフィックと混在させます
- デフォルト設定で約17ビットのエントロピーを提供し、引用された匿名性集合は100,000ユーザーを超えます

Zingo v7の支払い（payment）および価格リクエストは、デフォルトでこの経路をたどります。

## 保護されないもの

チェーン（chain）の同期、ヌリファイア（nullifier）クエリ、トランザクション取得、メモリプールのトラフィックは、現在のところ通常のインデクサー接続を使用します。混在パケットの外部にあるデバイスレベルまたはアプリケーションレベルのメタデータも、Nymの対象外です。

脅威モデルで同期トラフィックを隠す必要がある場合は、ネイティブMixnetウォレットとシステムレベルのNymVPNを組み合わせてください。[Nym VPN](/guides/nym-vpn)を参照してください。

## ウォレット

| ウォレット | ステータス | 注記 |
| --- | --- | --- |
| Zingo v7 | 稼働中、デフォルト | `makers run-cli`には`nym-proxy`がバンドルされています。セッションはオフラインで開始され、`--online`、`--remember-online`、または`--server`が同意を許可します。 |
| Zkool | 稼働中 | ネイティブMixnet統合。 |
| その他 | NymVPN経由 | ウォレットをシステムレベルのMixnetモード経由でルーティングします。 |

ウォレットレベル経路の設定詳細は、[ZcashウォレットのトラフィックをNym Mixnet経由でルーティングする](/guides/nym-mixnet-wallet-setup)にあります。

## トレードオフ

Nym経由でルーティングされたブロードキャストは、クリアネット（約3.4秒）より約12.5倍遅くなります。Torはより高速（約3.7倍）ですが、混在なしのFIFOストリームを使用するため、グローバルな敵対者は依然として相関付けできます。共有Nymユーザーベースを拡大することは、追加の遅延を加えるよりも効果的に匿名性を高めます。

## アプリケーション層の衛生管理: nym-swizzle-zcash

ネットワーク層の保護だけでは十分ではありません。完璧なMixnetまたはVPNであっても、ライトクライアントサーバーはアプリケーション層のパターンを観測することで、依然としてセッションを関連付けることができます。

- 再開ポイントの連鎖: クライアントは正確に`previous end + 1`から同期を再開するため、サーバーはブロック（block）高だけでセッションを連鎖させられます。
- 同期後送信: ウォレットはブロードキャスト直前に同期するため、サーバーはトランザクションを直前の同期セッションに帰属させることができます。

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash)クレートは、この両方に対処するZcash固有の衛生管理ポリシーを実装しています。一般的な`nym-swizzle`プリミティブを、ライトクライアント向けのチェーン認識ポリシーにパッケージ化しています。

**量子化された同期範囲。** リクエストは、日単位のセルを持つネットワーク全体のグリッドへ拡張されます。開始位置は切り下げられ、終了位置は切り上げられます。範囲は決定論的で昇順かつ非重複です。再編成チェックは拡張された範囲内に留まるため、正確な再開ポイントは明らかになりません。匿名性はノイズではなく衝突、すなわち多数のウォレットが同じ境界を送出することから得られます。

**分離されたブロードキャスト。** トランザクション送信は、ZIP 318の転送スケジューリングに合わせた指数分布（平均144ブロック ≈ 3時間、上限576ブロック ≈ 12時間）によって遅延されます。遅延は一般的なプロセス寿命を超えるため、スケジュールは永続化されます。トランザクションは、送信時に新しいティップに対してのみ構築されます。同期とブロードキャストでは異なるサーバーを使用するべきです。

このクレートは`BlockSource`および`TxBroadcaster`トレイトを公開し、`wasm32-unknown-unknown`向けにコンパイルされ、独自のネットワークスタックを持ちません。完全なAPIと例については、[Nymドキュメント](https://nym.com/docs/developers/swizzle/zcash)を参照してください。

## 出典

- [NymがZcashウォレットに匿名性を追加する方法](https://nym.com/blog/zcash-mixnet-anonymity) — Nym、2026年10月13日
- [nym-swizzle-zcash: Zcashライトクライアントの衛生管理ポリシー](https://nym.com/docs/developers/swizzle/zcash) — Nymドキュメント
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [ZcashウォレットのトラフィックをNym Mixnet経由でルーティングする](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
