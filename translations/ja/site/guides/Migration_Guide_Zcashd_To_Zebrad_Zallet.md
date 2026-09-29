# 移行ガイド：zcashd から Zebrad/Zallet へ

*Electric Coin Company (ECC)* / *Zodl* が保守していた従来の zcashd フルノードは、Zebra と Zallet に置き換えられました。zcashd は 2026年7月18日にサポート終了による停止に達し、現在は動作しません。

- Zebra は、Zcash Foundation が開発した Zcash プロトコルのモダンな Rust 実装です
- Zallet は、Zodl が開発した Zebra ノードとシームレスに連携するための軽量ウォレットです

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ノードの役割を担う zebrad とウォレットの役割を担う Zallet に zcashd が分割される図](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

このガイドでは、セットアップ、ウォレットのインポート、よくある移行上の問題のトラブルシューティングを含め、**Zcashd** から **Zebrad** および **Zallet** への移行を説明します。

---

## zcashd は 2026年7月18日に動作を停止しました

**これが意味すること**

- zcashd は 2026年7月18日にサポート終了による停止に達しました。今後チェーン先端に同期することはなく、資金の送受信もできません。これは予定ではなく、すでに完了しています。
- zcashd の2つの役割は現在分割されています。**zebrad** がフルノード、**Zallet** がウォレットです。
- Zallet は **ベータ版** です。リリース間で互換性を損なう変更が起こる可能性があり、一部の zcashd JSON-RPC メソッドはまだ実装されていません。特定の呼び出しに依存する前に、[メソッド対応状況マトリクス](https://zcash.github.io/zallet/)を確認してください。
- **Sprout** の資金をまだ保有している場合は、先にステップ6の警告を読んでください。Zallet は Sprout プールをサポートしておらず、通常これらの資金を移動するには、動作中の zcashd が必要でした。

**移行する理由 — 非推奨化以外にも**

非推奨化を抜きにしても、移行には説得力のある理由があります。
- セキュリティと堅牢性：Rust のメモリ安全性とモダンなツール群により、脆弱性のリスクが低減されます。
- パフォーマンスと効率性：Zebrad は並列処理、より効率的なリソース利用、高速な同期を目的に設計されています。
- モジュラーアーキテクチャ：ノードロジック（Zebrad）とウォレット UI（Zallet）を分離することで、境界が明確になり、アップグレードパスも改善されます。
- 将来のエコシステム互換性：ツール、機能強化、そして Zcash エコシステムの他の部分は、今後ますます Zebrad/Zallet を対象とするようになります。
- 安心感：非推奨でサポートされないコンポーネントを実行し続ける状況を避けられます。

### それでは、移行ガイドを見ていきましょう

**1. すべてをバックアップする**
* zcashd ノードから wallet.dat（またはその他のウォレットファイル／キーストア）をバックアップしてください。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* zcash.conf とカスタム設定を保存してください。
* 使用している RPC スクリプトや自動化処理のコピーをエクスポートしてください。
* バックアップが有効であることを確認してください（例：別の環境で開く、または検査する）。
* 現在依存している JSON-RPC メソッドを確認してください。
* [Zcash サポートサイト](https://z.cash/support/zcashd-deprecation/)で管理されている、予定されている互換性表と比較してください。 
* 変更または不足しているメソッドに備えてください（回避策や適応が必要なものもあります）。

**2. システム要件とディスク容量**
* ディスク容量は過小評価されがちな要件です。Zcash チェーンは 2026年8月に **270 GB** を超えたため、可能であれば SSD 上に少なくとも **300 GB** の空き容量を確保してください。
* マシンに安定したネットワーク、CPU、RAM があることを確認してください。
* インターネット接続 
* ソースからコンパイルする予定なら、Rust と Cargo をインストールしてください。

**3. Zebrad のインストール／セットアップ**
ビルド済みバイナリをダウンロードするか、ソースからビルドできます。
* Zcash Foundation は Zebra のリリースとバイナリを公開しています。たとえば、インストールスクリプトを使うか、OS に適したバイナリをダウンロードできます。

* 最近の Zebra バージョンでは、[Docker で RPC エンドポイントがデフォルトでは有効にならなくなったことに注意してください。](https://zfnd.org/zebra-2-3-0-release/)

**オプション A：ビルド済みバイナリでインストール**  
**Linux**/**macOS** の場合：

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

これにより、最新の安定版 zebrad がインストールされます。

**オプション B：ソースからビルド**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

ビルド後、バイナリをパスに移動します。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. 設定と起動**  
デフォルト設定を生成します。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

**zebrad.toml** を好みに合わせて編集してください（リッスンアドレス、ポート、状態ディレクトリ、キャッシュ）。

**ノードを起動する：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

ノードはジェネシスから同期を開始します。ハードウェアとネットワークによっては、数時間以上かかることを想定してください。

**5. Zallet（ウォレット）のインストール／セットアップ**

Zallet は zcashd のウォレット部分を置き換えるよう設計されています。

バイナリについては、Zallet の GitHub ／リリースページを確認してください。

**またはソースからビルド：**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* インストール環境に応じて GUI または CLI を起動してください。
* RPC または API エンドポイントを通じて、ローカルの Zebrad ノードに接続するよう設定してください。

**6. zcashd ウォレットを Zallet にインポートする**

この作業に動作中の zcashd は必要ありません。zcashd はすでに起動できないため、Zallet が `wallet.dat` ファイルを直接読み取ることは重要です。

> **`wallet.dat` を保管してください。** 移行では、Zallet ウォレットで表現できない項目をインポートせずに報告します。そのキー情報は `wallet.dat` にしか存在しなくなります。移行後も削除しないでください。

まず `zallet init-wallet-encryption` を実行してください。Zallet は age アイデンティティにキー情報を暗号化するため、キーをインポートする前にそのアイデンティティが存在している必要があります。

次に、設定とウォレットを変換します。

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` は `zcashd-import` 機能を含むビルドにのみ存在し、`wallet.dat` の読み取りには zcashd が使用したバージョンである Berkeley DB 6.2 の `db_dump` ユーティリティが必要です。ウォレットファイルが複数ある場合は、ファイルごとにコマンドを1回実行し、2回目以降は `--allow-multiple-wallet-imports` を追加してください。それぞれが独自のアカウントセットになります。Zallet の JSON-RPC はデフォルトで Cookie 認証を使用するため、`rpcuser` と `rpcpassword` は引き継がれません。必要な場合は `zallet add-rpc-user` で認証情報を追加してください。

**移行されるもの**

* ニーモニックシードおよびそこから導出されるキー。アカウントは zcashd ウォレットと一致するよう再構築されます
* 単独でインポートされた Sapling 支出キーおよびトランスペアレントキー
* 公開鍵または redeem script を含むトランスペアレントの監視専用エントリ
* アカウントの誕生ブロック高。これによりチェーンスキャンは正しいブロック高から開始されます

**移行されないもの。** これらはインポートされず、件数として報告されます。

* **Sprout の支出キーおよび資金。** Zallet は Sprout プールをサポートしていません。文書化されていた方法は、zcashd を廃止する前に Sprout 資金を zcashd で移動することでしたが、現在は不可能です。該当する場合は、他の操作を行う前に [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) または[コミュニティフォーラム](https://forum.zcashcommunity.com/)で質問してください。
* アドレス帳のエントリ
* 公開鍵または redeem script なしで保存された監視専用エントリ、および非圧縮公開鍵を持つエントリ
* Regtest ウォレット

**その後のバックアップ。** ニーモニックだけでは完全なバックアップにはなりません。インポートされたキーはウォレットデータベースにしか存在しないためです。`wallet.db`、`keystore.encryption_identity` オプションで指定される age 暗号化アイデンティティファイル、ニーモニックフレーズの安全なコピーを保管し、元の `wallet.dat` も保持してください。`wallet.db` 自体は暗号化されていない点に注意してください。トランザクション履歴と Viewing Key が平文で保存されるため、バックアップは安全な場所に保管してください。

**ウォレットの再スキャンと同期**

* キーがインポートされると、Zallet は Zebrad 経由でチェーンの再スキャンを開始します。
* Zallet が残高とトランザクション履歴を再構築するまで、しばらく時間を置いてください。

**7. 残高と同期を確認する**

インポート後、Zallet は Zebrad ノードに接続し、ブロックチェーンを再スキャンします。
同期が完了すると、残高とトランザクションは以前とまったく同じように表示されるはずです。

次を実行してノードの同期ステータスを確認できます。

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
        <td className="px-6 py-4">ポートが使用中、または設定が不正</td>
        <td className="px-6 py-4">**zebrad.toml** を確認し、空いているポートを使用する</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">同期が遅い</td>
        <td className="px-6 py-4">ネットワークの混雑</td>
        <td className="px-6 py-4">安定したインターネット接続を確認し、Zebrad を再起動する</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">ウォレットにトランザクションがない</td>
        <td className="px-6 py-4">キーのインポートが不完全</td>
        <td className="px-6 py-4">キーを再インポートするか、Zallet で再スキャンする</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet がノードに接続できない</td>
        <td className="px-6 py-4">ノードが動作していない、またはエンドポイントが誤っている</td>
        <td className="px-6 py-4">Zebrad を起動し、正しい RPC ポートを確認する</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet がクラッシュする</td>
        <td className="px-6 py-4">ビルドが古い</td>
        <td className="px-6 py-4">GitHub から最新リリースへ更新する</td>
      </tr>
    </tbody>
  </table>
</div>

**9. まとめ**

zcashd から Zebrad と Zallet へ移行することで、より高速で安全かつモダンな Zcash 体験を得られます。
Rust ベースのセキュリティ、モジュラー設計、改善されたツール群により、このセットアップは、Zcash エコシステムが進化し続けてもノードとウォレットを将来に備えた状態に保ちます。

ヒント：ウォレットキーはオフラインで保管し、Zallet データを定期的にバックアップしてください。
Zebra については [zebra.zfnd.org](https://zebra.zfnd.org)、Zallet については [The Zallet Book](https://zcash.github.io/zallet/) または [Zallet リポジトリ](https://github.com/zcash/zallet)を参照してください。The Zallet Book の[zcashd からの移行](https://zcash.github.io/zallet/)の章が、ステップ6の正式なリファレンスです。
