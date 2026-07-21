# Akash経由でコンソールを使用してzcashdを展開する

Akash Consoleを使用して、zcashd Zcashフルノード（Electric Coin Coの実装）を展開するためのガイドです。以下にビデオチュートリアルがあります。より詳しいガイドは下記をご覧ください。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 展開しているもの

以下のようなフルノードを展開しています。

-> 全てのZcashブロックチェーン（メインネットでは350GB以上、テストネットでは約40GB）を同期します。

-> AKTトークン価格に応じて、月額で約15ドルかかります。

-> 完全な同期には数時間から数日かかることがあります。

-> 4 vCPU、16GB RAM、350GBストレージ（メインネット）または2 vCPU、8GB RAM、50GB（テストネット）を使用します。

-> 初回実行時に暗号化パラメータをダウンロード（約2GB、一回限り）

**zcashd vs Zebra:**

-> zcashdはElectric Coin Coによって開発されたオリジナルのZcashノード実装です。

-> ZebraはZcash Foundationによる代替実装です。

-> 両方ともZcashネットワークと互換性があります。

-> zcashdには多くの機能（マイニング、ウォレット、Insight Explorer API）が含まれています。

-> ウォレット機能や特定のRPC APIが必要な場合はzcashdを使用してください。


### **重要: Akashでのポートマッピング**

Akashでポートを公開する場合（例えばzcashd P2P用の8233ポート）、**その正確なポートにバインドされません**。代わりに、プロバイダーはランダムな高ポート（例：31234または42567）を割り当て、それをあなたのコンテナのポート8233にリバースプロキシします。

これは設計上の仕様です - プロバイダーは複数の展開を実行しており、すべてが直接ポート8233を使用しようとすると衝突が発生する可能性があります。

**あなたにとっての意味:**

-> SDLでポート8233を設定（zcashdの標準P2Pポート）

-> AkashからURIのような*provider.com:31234*を受け取ります

-> 他のZcashノードは*provider.com:31234*に接続します

-> コンテナ内では、zcashdは8233でリスニングしています


これは自動的に処理されます。Akashが提供するURIを使用してください。

## 前提条件

-> **Keplr Wallet**ブラウザ拡張機能をインストール（Chrome/Brave/Firefox）

-> **AKTトークン** - 交易所から50-100 AKTを入手（Coinbase, Kraken, Osmosisなど）

-> **5分間**、コンソールUIをクリックする時間


## ステップ1: ウォレットの接続

-> [https://console.akash.network](https://console.akash.network)にアクセスしてください。

-> 右上の**"Connect Wallet"**をクリックします。

-> **Keplr**（またはお好みのCosmosウォレット）を選択します。

-> Keplrがポップアップしたときに接続を承認してください。


AKT残高が右上に表示されるはずです。ゼロの場合、まずウォレットを資金注入してください。

## ステップ2: 展開の作成

-> **"Deploy"**ボタン（ページ中央にある大きな青いボタン）をクリックします。

-> **"Build your template"**（またはSDLの直接アップロードにスキップ）を選択します。


### オプションA：SDLファイルのアップロード（推奨）

[![Deploy on Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### オプションB：SDLエディタの使用

手動でSDLを貼り付けたい場合は：

-> *zcashd-akash.yml*の内容をコピーします。

-> SDLエディタに貼り付けます。

-> 必要に応じて編集してください（下記の設定セクションをご覧ください）。

-> **"Create Deployment"**をクリックします。


## ステップ3: 展開および預金の承認

コンソールは以下を表示します：

-> **展開預金**: ~5 AKT（展開を終了したときに返還されます）

-> **推定費用**: SDL価格に基づいています


**"Approve"**をクリックし、Keplrでトランザクションに署名してください。

## ステップ4: プロバイダーの選択

約30秒後、プロバイダーからの入札が表示されます。各入札には以下が表示されます：

-> **ブロックあたりの価格**（AKTまたはUSDCで）

-> **月額推定費用**

-> **プロバイダの詳細**（稼働時間、地域など）


**最も安いだけを選ばないでください。** 次を確認してください：

-> 稼働率%（95％以上を目指す）

-> 地域（近くにいるほど遅延が少なくなりますが、ブロックチェーンノードではあまり重要ではありません）

-> 审査済みのステータス（緑色のチェックマーク＝より信頼性が高い）


選んだプロバイダーで**"Accept Bid"**をクリックし、Keplrで署名してください。

## ステップ5: 展開の待機

コンソールは以下を行います：

-> 選んだプロバイダーとのリースを作成します

-> マニフェスト（プロバイダーに何を実行するかを伝えます）を送信します

-> コンテナを起動します


これは1〜2分かかります。UIでステータスの更新が表示されます。

## ステップ6: 実行中の確認

展開後、以下が表示されます：

-> **Services**タブ：zcashdサービスの状態が表示されます

-> **Logs**タブ：zcashdノードからのライブログ

-> **Leases**タブ：展開に関する詳細（DSEQ、プロバイダー、費用など）


### ログの確認

**Logs**をクリックすると、zcashdが起動しているのが見えます：

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**最初の実行ではzcash-params（約2GB）をダウンロードします。** これは一回限りの操作で、プロバイダーの帯域によって5〜10分かかります。再起動後はこの手順がスキップされます。

同期には**数時間から数日**かかります。以下を確認してください：

-> 増加するブロック高さ

-> ピア接続（10〜30ピア）

-> 繰り返されるエラーがないこと


## ステップ7: ノードのアドレスの取得

**Leases**タブをクリックし、**URIs**を選択します。

以下のようなものが表示されます：

```
zcashd-8233: provider-hostname.com:31234
```

これはあなたのノードの**パブリックP2Pエンドポイント**です。他のZcashノードはこのアドレスに接続します。

**ポートマッピングを確認してください:** SDLでポート8233を設定しましたが、Akashでは別のパブリックポート（この例では31234）が割り当てられています。これは正常です - 上記の「Akashでのポートマッピング」セクションをご覧ください。ノードはAkashが表示するポートでアクセス可能です。必ずしも8233ではありません。

RPCを有効にした場合（SDLではデフォルトでコメントアウトされています）、ここにもRPCエンドポイントとそのマッピングされたポートが表示されます。

## 設定オプション

### テストネットへの切り替え

SDLのデフォルトはメインネットです。テストネットを使用するには：

-> **envセクションのネットワークを変更します:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **exposeセクションの公開ポートを更新します:**

   ```yaml
   # メインネットのポートをコメントアウト:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # テストネットのポートをアンコメント:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **オプション：リソースを減らす**（テストネット用にprofiles.compute.zcashd.resourcesで）:

   ```yaml
   cpu:
     units: 2  # デフォルトの4から下げる
   memory:
     size: 8Gi  # デフォルトの16Giから下げる
   storage:
     - size: 50Gi  # デフォルトの150Giから下げる
   ```

-> **オプション：価格を下げて**（profiles.placement.akash.pricingで）:

   ```yaml
   amount: 5000  # デフォルトの10000から下げる
   ```

> 注：価格を下げるとプロバイダーが入札しない可能性があります。この値を試行錯誤するか、プロバイダーAPIドキュメントで確認してください。

### RPCアクセスの有効化

セキュリティ上の理由からRPCはデフォルトで無効です。有効にするには：

**重要な点：強力な資格情報を設定してください。** zcashd RPCはHTTP（HTTPSではない）経由でユーザー名/パスワードを送信します。RPCを公開する前にセキュリティ上の影響を理解している必要があります。

-> envセクションでアンコメント:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # 実際のパスワードを使用してください
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # メインネット
   # - "ZCASHD_RPCPORT=18232"  # テストネット
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # どこからでも許可（注意が必要）
   ```

-> exposeセクションでRPCポートをアンコメント:

   **メインネット用:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # セキュリティのため内部に限定
     proto: tcp
   ```

   **テストネット用:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**: RPCで*global: true*を設定すると、インターネット経由で基本認証付きで公開することになります。これは推奨されません。*global: false*を使用し、Akashの内部ネットワークまたはセキュアなトンネルを通じてRPCにアクセスしてください。

**ポートマッピングの思い出**: RPCをグローバルに公開しても、Akashはランダムな高ポート（8232/18232ではない）にマッピングします。展開のURIsを確認して実際のパブリックエンドポイントを見つけてください。*global: false*（推奨）の場合、RPCエンドポイントはAkashの展開ネットワーク内からしかアクセスできません。

### トランザクションインデックスの有効化

トランザクションインデックスを使用すると、ID経由で任意のトランザクションをRPCでクエリできます。ストレージ使用量が増加します（約20％増）。

envセクションでアンコメント:

```yaml
- "ZCASHD_TXINDEX=1"
```

**警告**: 既に同期したノードでtxindexを有効にするには、全体のブロックチェーンを再インデックスする必要があります。これは数時間かかります。

### Insight Explorerの有効化

Insight Explorerはブロックチェーンデータ用の追加REST APIエンドポイントを提供します（ブロックエクスプローラーに有用です）。

envセクションでアンコメント:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

これは自動的にtxindexを有効化し、追加のRPCメソッドを提供します。

### Prometheusメトリクスの有効化

監視用にメトリクスをスクレイプするには:

-> envセクションでアンコメント:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> exposeセクションでメトリクスポートをアンコメント:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
メトリクスはhttp://yourendpoint:9969/metricsでPrometheus形式で利用可能です。

### リソース/価格の調整

展開が行われていない場合やコストを最適化したい場合は:

**低スペックプロバイダー向けに**: *profiles.compute.zcashd.resources*セクションで以下を減らしてください：

-> CPU: *units: 2*（合理的な同期速度の最小値）

-> メモリ: *size: 12Gi*（安定性のための最小値）

-> ストレージ: *size: 120Gi*（メインネット用の最小値）


**より多くの入札を引きたい場合**: *profiles.placement.akash.pricing*セクションで以下を増やしてください：

-> メインネット: *amount: 15000* uakt/block を試してみてください

-> テストネット: *amount: 7500* uakt/block を試してみてください


SDL値は保守的に高めに設定されています。多くのプロバイダーがより低い価格で入札します。

## 展開の更新

展開後、設定を変更したい場合は？

-> コンソール内の**My Deployments**にアクセスしてください。

-> あなたのzcashd展開を探して、

-> **"Update Deployment"**をクリックし、

-> SDLを編集し、

-> **"Update"**をクリックし、Keplrで承認してください。


**注意**: 更新はコンテナを再起動します。ノードは保存された状態（永続ストレージ）から再開しますが、1〜2分のダウンタイムがあることを予期してください。

## モニタリング

### コンソール経由

-> **Logs tab**: 実時間コンテナログ

-> **Shell tab**: コンテナ内にシェルを取得（デバッグに役立ちます）

-> **Events tab**: Kubernetesイベント（何かが破損している場合以外はほとんど無意味）


### RPC経由（有効化されている場合）

RPCを有効にした場合は、通常のzcashdフルノードとしてあなたのノードをクエリできます（実際にはそうなります！）

### zcash-cliの代替

コンソールでシェルアクセスがある場合、*zcash-cli*を使用できます：

```bash
# コンソールのShellタブから
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## 展開の終了

終わるか、支払いを停止したい場合は：

-> **My Deployments**にアクセスしてください。

-> あなたのzcashd展開を探して、

-> **"Close Deployment"**をクリックし、

-> Keplrで承認してください。


5 AKTのデポジットは返還されます。**永続ストレージ**はプロバイダーによって保持されるはずですが、それには依存しないでください - 他のクラウドプロバイダーと同じように扱ってください。

## トラブルシューティング

### "資金不足"エラー

より多くのAKTが必要です。Keplrウォレットを補充してください。

### 入札が表示されない

以下のいずれかの可能性があります：

-> SDL内の*amount*が低すぎる（増やす）

-> 可用プロバイダーにリソース要件が高すぎる（CPU/メモリ/ストレージを減らす）

-> 待つ（場合によっては60〜90秒かかります）


### 展開が"pending"で止まっている

プロバイダーに問題がある可能性があります。展開を終了し、別のプロバイダーを使用してください。

### zcashdログに"No peers connected"と表示されている

最初の数分間は正常です。zcashdは自動的にピアを発見します。10分以上経っても続く場合は、ネットワーク問題（Akashでは可能性が低い）があるかもしれません。

### ログに"メモリ不足"エラーがある

RAMを節約してしまいました。展開を終了し、少なくとも12Giのメモリで再展開してください（16Giが推奨されます）。

### 同期が永遠にかかる

「永遠」の定義：

-> **時間**: 正常

-> **日数**: メインネットから始めての場合は正常

-> **週間**: 問題があります。ログを確認してエラーがないか見てください


### "zcash-paramsの取得に失敗"エラー

プロバイダーにネットワーク問題や遅い帯域幅がある可能性があります。これは通常解決します。30分以上続く場合は、別のプロバイダーへの再展開を試してください。

### RPC認証失敗

-> *ZCASHD_RPCUSER* と *ZCASHD_RPCPASSWORD* が正しく設定されているか確認してください

-> 正しいポートを使用しているか確認してください（メインネットは8232、テストネットは18232）

-> ポートはAkashによってマッピングされるので、展開のURIを使用し、直接8232ではなく使用してください


## コスト管理

コンソールで支出を監視してください：

-> **My Deployments** -> あなたの展開 -> "月間費用"の推定値が表示されます

-> Keplrウォレット残高は時間が経つにつれて減少します


残高が低くなった場合、Akashは自動的に展開を終了します。**定期的にウォレットを補充するかアラートを設定してください**。

### コストの削減

-> **テストネットを使用**して非生産的なテストを行う（50％安くなる）

-> **CPU/メモリを下げて**速い同期が必要でない場合

-> **安いプロバイダーを選択**（常に賢明とは限らない - アップタイムが重要）

-> **AKT価格が変動する場合はUSDCを使用**（SDL価格設定の変更が必要）

-> **txindexを無効に**してストレージを節約（約20％節約）


### その他のリソース

**Akash コンソール**: [https://console.akash.network](https://console.akash.network)

**Akash ドキュメント**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash エクスプローラー**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network)（プロバイダーの問題について）


## 最後の注意点

- **永続ストレージは重要です。** *persistent: true* をスキップしないでください、または *beta2* クラスを使用しないでください。*beta3* を使用してください。
- **初期同期は遅いです。** 耐える必要があります。これはブロックチェーンノードの正常な動作です。
- **ウォレットを常に資金で満たしておいてください。** AKTが尽きたら展開が自動的に終了します。
- **バックアップは自動的ではありません。** データに興味がある場合は、それが消える可能性があることを前提にし、それに応じて計画してください。
- **RPCセキュリティは重要です。** インターネット経由でRPCを公開する前に適切なセキュリティ対策を講じてください。
- **zcash-paramsはキャッシュされます。** 最初の実行時に約2GBの暗号化パラメータがダウンロードされます。これは正常であり、一度だけ発生します。
