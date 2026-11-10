# 移行ガイド：zcashd から Zebrad/Zallet へ

*Electric Coin Company（ECC）* / *Zodl* が保守していた従来の zcashd フルノード（full node）は、Zebra および Zallet に置き換えられました。zcashd は 2026 年 7 月 18 日にサポート終了に伴い停止し、現在は稼働しません。

- Zebra は、Zcash Foundation が開発した Zcash プロトコルのモダンな Rust 実装です
- Zallet は、Zodl が開発した Zebra ノード（node）とシームレスに連携するよう構築された軽量ウォレット（wallet）です

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

このガイドでは、セットアップ、ウォレットのインポート、一般的な移行上の問題のトラブルシューティングを含め、**zcashd** から **Zebrad** および **Zallet** への移行について説明します。

---

## zcashd は 2026 年 7 月 18 日に停止しました

**これが意味すること**

- zcashd は 2026 年 7 月 18 日にサポート終了に伴い停止しました。再びチェーン（chain）の先端に同期することはなく、資金の送受信もできません。これは予定ではなく、すでに完了しています。
- zcashd の 2 つの役割は現在分離されています。**zebrad** がフルノードであり、**Zallet** がウォレットです。
- Zallet は**ベータ版**です。リリース間で破壊的変更が発生する可能性があり、一部の zcashd JSON-RPC メソッドはまだ実装されていません。特定の呼び出しに依存する前に、[メソッドのステータスマトリクス](https://zcash.github.io/zallet/)を確認してください。
- まだ **Sprout** の資金を保有している場合は、まずステップ 6 の警告をお読みください。Zallet は Sprout プール（pool）をサポートしておらず、通常これらの資金を移動するには稼働中の zcashd が必要でした。

**移行する理由 — 非推奨化以外の理由**

非推奨化を別にしても、移行する強い理由があります。

- セキュリティと堅牢性：Rust のメモリ安全性とモダンなツール（tools）により、脆弱性のリスクが低減されます。
- パフォーマンスと効率性：Zebrad は並列処理、より効率的なリソース使用、より高速な同期のために設計されています。
- モジュラーアーキテクチャ：ノードロジック（Zebrad）とウォレット UI（Zallet）を分離することで、境界が明確になり、アップグレード経路も向上します。
- 将来のエコシステム互換性：ツール、機能強化、および Zcash エコシステムの他の部分は、今後ますます Zebrad/Zallet を対象とするようになります。
- 安心感：非推奨でサポートされないコンポーネントを実行し続ける状況を避けられます。

### それでは移行ガイドに進みましょう

**1. すべてをバックアップする**
* zcashd ノードから wallet.dat（またはその他のウォレットファイル / 鍵ストア）をバックアップしてください。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* zcash.conf とすべてのカスタム設定を保存してください。
* 使用している RPC スクリプトまたは自動化のコピーをエクスポートしてください。
* バックアップが有効であることを確認してください（例：別の環境で開くか調べてみてください）。
* 現在依存している JSON-RPC メソッドを確認してください。
* [Zcash サポートサイト](https://z.cash/support/zcashd-deprecation/)で管理されている、予定されている互換性表と比較してください。
* 変更または不足しているメソッドに備えてください（一部では回避策または適応が必要になる場合があります）。

**2. システム要件とディスク容量**
* ディスク容量は見落とされがちな要件です。Zcash チェーンは 2026 年 8 月に **270 GB** を超えたため、可能であれば SSD で少なくとも **300 GB** の空き容量を確保してください。
* マシンに安定したネットワーク、CPU、RAM があることを確認してください。
* インターネット接続
* ソースからコンパイルする予定の場合は、Rust と Cargo をインストールしてください。

**3. Zebrad のインストール / セットアップ**
事前ビルド済みバイナリをダウンロードするか、ソースからビルドできます。
* Zcash Foundation は Zebra 向けのリリースとバイナリを公開しています。たとえば、インストールスクリプトを使用するか、ご利用の OS に対応するバイナリをダウンロードできます。

* 最近の Zebra バージョンでは、[RPC エンドポイントはデフォルトで Docker において有効ではなくなったことに注意してください。](https://zfnd.org/zebra-2-3-0-release/)

**オプション A：事前ビルド済みバイナリでインストールする**  
**Linux**/**macOS** の場合：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

これにより、zebrad の最新安定版がインストールされます。

**オプション B：ソースからビルドする**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

ビルド後、バイナリをパスに移動してください。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. 設定と起動**  
デフォルト設定を生成してください。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

**zebrad.toml** をお好みに合わせて編集してください（リッスンアドレス（address）、ポート、状態ディレクトリ、キャッシュ）。

**ノードを起動する：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

ノードはジェネシスから同期を開始します。ハードウェアとネットワークによっては数時間以上かかることがあります。

**5. Zallet（ウォレット）のインストール / セットアップ**

Zallet は、zcashd のウォレット部分を置き換えるために設計されています。

バイナリについては、Zallet の GitHub / リリースページを確認してください。

**または、ソースからビルドします：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* GUI または CLI を起動してください（インストール環境に応じます）。
* RPC または API エンドポイントを介して、ローカルの Zebrad ノードに接続するよう設定してください。

**6. zcashd ウォレットを Zallet にインポートする**

この操作に稼働中の zcashd は必要ありません。Zallet は `wallet.dat` ファイルを直接読み込みます。これは、zcashd を起動できなくなったため重要です。

> **`wallet.dat` を保持してください。** 移行では、Zallet ウォレットで表現できないものをインポートせずに報告します。その鍵マテリアルはその後 `wallet.dat` にのみ存在します。移行後に削除しないでください。

最初に `zallet init-wallet-encryption` を実行してください。Zallet は鍵マテリアルを age アイデンティティに暗号化（encryption）するため、鍵をインポートする前にそのアイデンティティが存在している必要があります。

次に、設定とウォレットを変換してください。

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` は `zcashd-import` 機能を含むビルドにのみ存在し、`wallet.dat` の読み込みには、zcashd が使用していたバージョンである Berkeley DB 6.2 の `db_dump` ユーティリティが必要です。複数のウォレットファイルがある場合は、ファイルごとに 1 回コマンドを実行し、後続の実行では `--allow-multiple-wallet-imports` を追加してください。それぞれが独自のアカウントセットになります。`rpcuser` と `rpcpassword` は引き継がれません。これは Zallet の JSON-RPC がデフォルトで Cookie 認証を使用するためです。必要な場合は `zallet add-rpc-user` で認証情報を追加してください。

**引き継がれるもの**

* ニーモニックシードとそこから派生した鍵。アカウントは zcashd ウォレットに合わせて再構築されます
* スタンドアロンでインポートされた Sapling 支出鍵（spending key）と公開型鍵
* 公開鍵またはリディームスクリプトを含む、公開型の閲覧専用エントリ
* アカウントの誕生時点。これによりチェーンのスキャンは正しいブロック高から開始されます

**引き継がれないもの。** これらはインポートされず、件数とともに報告されます。

* **Sprout 支出鍵と資金。** Zallet は Sprout プールをサポートしていません。文書化されていた手順は、廃止前に zcashd を使用して Sprout の資金を移動することでしたが、現在は不可能です。影響を受ける場合は、他の操作を行う前に [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) または [コミュニティフォーラム](https://forum.zcashcommunity.com/)で相談してください。
* アドレス帳のエントリ
* 公開鍵またはリディームスクリプトなしで保存された閲覧専用エントリ、および非圧縮公開鍵を持つエントリ
* Regtest ウォレット

**その後のバックアップ。** インポートされた鍵はウォレットデータベースにのみ存在するため、ニーモニックだけでは完全なバックアップになりません。`wallet.db`、`keystore.encryption_identity` オプションで指定された age 暗号化アイデンティティファイル、ニーモニックフレーズの安全なコピーを保持し、元の `wallet.dat` も保持してください。`wallet.db` 自体は暗号化されていない点に注意してください。トランザクション履歴とビューイングキー（viewing key）が平文で保持されるため、バックアップは安全な場所に保管してください。

**ウォレットの再スキャンと同期**

* 鍵をインポートすると、Zallet は Zebrad を介してチェーンの再スキャンを開始します。
* Zallet が残高とトランザクション履歴を再構築するまで、しばらく時間を置いてください。

**7. 残高と同期を確認する**

インポート後、Zallet は Zebrad ノードに接続し、ブロックチェーン（blockchain）を再スキャンします。
同期が完了すると、残高とトランザクションは以前とまったく同じように表示されるはずです。

次を実行すると、ノードの同期状態を確認できます。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

または、ログを確認してください。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. トラブルシューティング**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">問題</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">考えられる原因</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">解決策</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad が起動しない</td>
        <td className="px-6 py-4">ポートが使用中、または設定が不正です</td>
        <td className="px-6 py-4">**zebrad.toml** を確認し、空いているポートを使用してください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">同期が遅い</td>
        <td className="px-6 py-4">ネットワークの混雑</td>
        <td className="px-6 py-4">安定したインターネット接続を確認し、Zebrad を再起動してください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">ウォレットにトランザクションがない</td>
        <td className="px-6 py-4">鍵のインポートが不完全です</td>
        <td className="px-6 py-4">鍵を再インポートするか、Zallet で再スキャンしてください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet がノードに接続できない</td>
        <td className="px-6 py-4">ノードが稼働していないか、エンドポイントが誤っています</td>
        <td className="px-6 py-4">Zebrad を起動し、正しい RPC ポートを確認してください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet がクラッシュする</td>
        <td className="px-6 py-4">ビルドが古いです</td>
        <td className="px-6 py-4">GitHub から最新リリースに更新してください</td>
      </tr>
    </tbody>
  </table>
</div>

**9. 結論**

zcashd から Zebrad および Zallet に移行することで、より高速で安全かつモダンな Zcash の利用体験が得られます。
Rust ベースのセキュリティ、モジュラー設計、より優れたツールにより、このセットアップは Zcash エコシステムが進化し続けても、ノードとウォレットが将来に備えた状態であり続けることを保証します。

ヒント：ウォレットの鍵はオフラインで保管し、Zallet のデータを定期的にバックアップしてください。
Zebra については [zebra.zfnd.org](https://zebra.zfnd.org) を、Zallet については [The Zallet Book](https://zcash.github.io/zallet/) または [Zallet リポジトリ](https://github.com/zcash/zallet)を参照してください。The Zallet Book の [zcashd からの移行](https://zcash.github.io/zallet/)の章が、ステップ 6 の権威ある参照資料です。
