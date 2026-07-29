# マイグレーションガイド: zcashd から Zebrad/Zallet へ

Zcashエコシステムは進化しています。*Electric Coin Company (ECC)* / *Zodl* が保守している伝統的な Zcashd フルノードは、徐々に Zebra と Zallet によって置き換えられています。

- Zebra は、Zcash Foundation が開発した現代的な Rust 実装の Zcashプロトコル
- Zallet は、Zodl が開発した軽量ウォレットで、Zebraノードとシームレスにインターフェースできます

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

このガイドでは、**Zcashd** から **Zebrad** および **Zallet** へのマイグレーションを、設定、ウォレットのインポート、一般的なマイグレーション問題のトラブルシューティングを通じて説明します。

---

## Zcashプロジェクトは2025年にzcashdが非推奨になることを公式に発表しました

**非推奨状況とその意味**

- Zcashプロジェクトは、2025年にzcashdが非推奨になると公式に発表しました。
- フルノードは、Rust実装のZebradへ移行され、Zalletはzcashdのウォレットコンポーネントを後継としています。
- それに応じて、Zebraプロジェクトは「Zcashd Deprecation」マイルストーンを追跡し、互換性、RPC移行、エコシステムサポートを確保しています。
- 複数のRPCメソッドについては、Zebrad/Zalletがドロップイン置き換え（動作を模倣または一致させる）を目指します。他のものは変更されるか、サポートされない可能性があります。

**マイグレーションの理由 - 非推奨以外にも**

非推奨以外でも、移行する理由はいくつかあります:
- セキュリティと堅牢性: Rustのメモリ安全性と現代的なツールにより、脆弱性のリスクが減少します。
- パフォーマンスと効率: Zebradは並列処理を設計し、リソース使用がより効率的で、同期も速くなります。
- モジュラーアーキテクチャ: ノードロジック（Zebrad）とウォレットUI（Zallet）の分離により、明確な境界とより良いアップグレードパスが提供されます。
- 未来のエコシステムとの互換性: ツールや改善点、Zcashエコシステム全体はますますZebrad/Zalletをターゲットにします。
- 心配事を減らす: 非推奨かつサポートされていないコンポーネントでストックされるのを避けることができます。

### ではマイグレーションガイドへ進みましょう

**1. 全てをバックアップする**
* zcashdノードからwallet.dat（または他のウォレットファイル/キーストア）をバックアップしてください。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* zcash.confと任意のカスタム設定を保存してください。
* 使用しているRPCスクリプトや自動化のコピーをエクスポートしてください。
* バックアップが有効であることを確認してください（例：他の環境で開いたり、インスペクトしたりして確認）。
* 現在使用しているJSON-RPCメソッドを確認してください。
* [Zcashサポートサイト](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) に掲載されている計画された互換性表と比較してください
* 変更または存在しないメソッドへの対応準備をしてください（一部はワークアラウンドや適応が必要になるかもしれません）。

**2. システム要件とディスク容量**
* 十分なディスク容量があることを確認してください（Zcashチェーンは非常に大きい）。少なくとも10GBの空きディスク容量が必要です。
* マシンが安定したネットワーク、CPU、RAMを持っていることを確認してください。
* インターネット接続
* ソースからコンパイルする予定であれば、RustとCargoをインストールしてください。

**3. Zebradのインストール/設定**
事前にビルドされたバイナリをダウンロードするか、ソースから構築します。
* Zcash FoundationはZebraのリリースおよびバイナリを公開しています。例として、インストールスクリプトを使用したり、OSに応じた適切なバイナリをダウンロードできます。

* 最近のZebraバージョンでは、[DockerでのRPCエンドポイントはデフォルトで無効になっています](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**オプションA: 事前にビルドされたバイナリを使用してインストールする**
**Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

これは最新の安定版のzebradをインストールします。

**オプションB: ソースからビルドする**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

ビルド後、バイナリをパスに移動します:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. 設定と起動**
デフォルト設定を生成します:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

**zebrad.toml** を編集して、ご希望の設定（リスンアドレス、ポート、ステートディレクトリ、キャッシュ）に変更してください。

ノードを起動します:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

ノードはジェネシスから同期を開始します。ハードウェアとネットワークに応じて、数時間（またはそれ以上）かかる場合があります。

**5. Zalletのインストール/設定（ウォレット）**

Zalletはzcashdのウォレット部分を置き換えるように設計されています。

ZalletのGitHub / リリースページでバイナリを確認してください。

**またはソースからビルドする:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* GUIまたはCLI（インストールに応じて）を起動します。
* ローカルのZebradノードにRPCまたはAPIエンドポイント経由で接続するように設定してください。

**6. zcashdウォレットをZalletへインポート**
プライベートキーのダンプを通じて

zcashd上でプライベートキーをエクスポートします:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Zalletで「Keysのインポート」または類似オプションを選択してください。
* **zcashd_keys.txt** にポイントします。 
* ZalletはZECアドレスと関連するキーをパースしてインポートします。

**シードフレーズを通じて（該当する場合）**

* ウォレットがシードバックアップをサポートしている場合は、Zalletで「シードフレーズから復元」を選択してください。
* これはzcashdウォレットがシードから導出されているか、またはシード変換を持っている場合にのみ動作します。

**ウォレットの再スキャンと同期**

* キーがインポートされた後、ZalletはZebrad経由でチェーンを再スキャンします。
* Zalletがあなたの残高と取引履歴を再構築するのに時間がかかる場合があります。

**7. 残高の確認と同期**

インポート後、ZalletはあなたのZebradノードに接続し、ブロックチェーンを再スキャンします。
同期が完了すると、残高や取引履歴は以前と同じように表示されるはずです。

ノードの同期状態を確認するには以下を実行してください:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

またはログを確認してください。

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. トラブルシューティング**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">問題</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">可能性のある原因</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">解決策</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebradが起動しない</td>
        <td className="px-6 py-4">ポートの使用中または設定が悪い</td>
        <td className="px-6 py-4">**zebrad.toml** を確認し、空いているポートを使用してください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">同期が遅い</td>
        <td className="px-6 py-4">ネットワークの混雑</td>
        <td className="px-6 py-4">安定したインターネット接続を確保し、Zebradを再起動してください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">取引が見つからない</td>
        <td className="px-6 py-4">キーアイポートが不完全</td>
        <td className="px-6 py-4">Zalletでキーを再インポートまたは再スキャンしてください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zalletがノードに接続できない</td>
        <td className="px-6 py-4">ノードが起動していないか、エンドポイントが間違っている</td>
        <td className="px-6 py-4">Zebradを起動し、正しいRPCポートを確認してください</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zalletがクラッシュする</td>
        <td className="px-6 py-4">古いバージョン</td>
        <td className="px-6 py-4">GitHubから最新リリースにアップグレードしてください</td>
      </tr>
    </tbody>
  </table>
</div>

**9. 結論**

zcashdからZebradとZalletへのマイグレーションは、より高速で安全で現代的なZcash体験を提供します。
Rustベースのセキュリティ、モジュラーデザイン、およびより良いツールにより、この設定はZcashエコシステムが進化し続ける中でもノードとウォレットが未来に備えることを保証します。

ヒント: ウォレットキーやZalletデータを定期的にバックアップし、オフラインで保管してください。
更新やコミュニティサポートについては[zebra.zfnd.org](https://zebra.zfnd.org) および [zallet.zfnd.org](https://zallet.zfnd.org) を訪問してください。
