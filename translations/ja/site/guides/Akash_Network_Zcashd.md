# Akash Console を介して zcashd をデプロイする

> **非推奨です。使用する予定のノードをデプロイするために、このガイドには従わないでください。**
>
> zcashd は2026年7月18日に自動サポート終了停止に達しました。現在デプロイした zcashd ノードはチェーンの先端に同期できないため、デプロイには毎月費用がかかる一方で何も生み出しません。
>
> 代わりに **Zebra** をデプロイしてください: 同じ Akash Console のワークフローを扱い、ディスク容量がおよそ3分の1で済む [Akash Network で Zebra を実行する方法](/guides/akash-network-zebra)。既存のセットアップを移行する場合は、[zcashd から Zebra および Zallet への移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)を参照してください。
>
> このページは、zcashd デプロイの歴史的記録として保存されています。

zcashd Zcash フルノード（Electric Coin Co 実装）を [Akash Console](https://console.akash.network) を使用してデプロイするためのガイドです。以下に動画チュートリアルがあります。より詳細なガイドはその下にあります。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash フルノードの Akash Network におけるセットアップ"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## デプロイするもの

以下を行うフル zcashd ノードです。

-> Zcash ブロックチェーン（Blockchain）全体を同期します（メインネットでは350GB以上、テストネットでは約40GB）

-> AKT トークン価格に応じて月額約$15かかります

-> 完全に同期するまで数時間から数日かかります

-> 4 vCPU、16GB RAM、350GBストレージ（メインネット）、または2 vCPU、8GB RAM、50GB（テストネット）を使用します

-> 初回実行時に暗号学的パラメーターをダウンロードします（約2GB、1回のみ）

**zcashd と Zebra:**

-> zcashd は Electric Coin Co によるオリジナルの Zcash ノード実装であり、2026年7月18日以降停止しています

-> Zcash Foundation による Zebra は、現在使用されているフルノードです

-> 現在のチェーンに追随するのは Zebra のみであり、zcashd ノードは先端に到達できません

-> zcashd のウォレット（Wallet）は [Zallet](/using-zcash/zallet-quick-reference-guide) に置き換えられています

-> ウォレット機能または特定の RPC API が必要な場合は、zcashd を使用してください


### **重要: Akash におけるポートマッピング**

Akash でポートを公開する場合（例: zcashd P2P のポート8233）、プロバイダーのパブリック IP 上のその正確なポートには**バインドされません**。代わりに、プロバイダーがランダムな高位ポート（31234や42567など）を割り当て、コンテナのポート8233へリバースプロキシします。

これは仕様です。プロバイダーは複数のデプロイを実行しており、全員が直接ポート8233を使用しようとすると競合が発生します。

**これが意味すること:**

-> SDL でポート8233を設定します（zcashd の標準 P2P ポート）

-> Akash は *provider.com:31234* のような URI を提供します

-> 他の Zcash ノードは *provider.com:31234* であなたに接続します

-> コンテナ内部では、zcashd は引き続き8233で待ち受けます


これは自動的に処理されます。Akash が提供する URI を使用してください。

## 前提条件

-> **Keplr Wallet** ブラウザー拡張機能がインストールされていること（Chrome/Brave/Firefox）

-> **AKT トークン** - 取引所（Coinbase、Kraken、Osmosis）から50～100 AKTを入手してください

-> Console UI を操作するための**5分**


## ステップ1: ウォレットを接続する

-> [https://console.akash.network](https://console.akash.network) にアクセスしてください

-> 右上の **「Connect Wallet」** をクリックしてください

-> **Keplr**（または任意の Cosmos ウォレット）を選択してください

-> Keplr が表示されたら接続を承認してください


右上に AKT 残高が表示されます。ゼロの場合は、先にウォレットへ資金を入れてください。

## ステップ2: デプロイを作成する

-> **「Deploy」** ボタン（ページ中央の大きな青いボタン）をクリックしてください

-> **「Build your template」** を選択してください（または SDL のアップロードへ直接進んでください）

### オプションA: SDL ファイルをアップロードする（推奨）

> **このボタンは停止済みのノードをデプロイします。** 同期できないノードに対して AKT 残高から請求されます。代わりに [Zebra ガイド](/guides/akash-network-zebra)を使用してください。

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### オプションB: SDL エディターを使用する

SDL を手動で貼り付けたい場合:

-> *zcashd-akash.yml* の内容をコピーしてください

-> SDL エディターに貼り付けてください

-> 必要に応じて変更してください（以下の設定セクションを参照してください）

-> **「Create Deployment」** をクリックしてください


## ステップ3: デポジットを確認して承認する

Console には次の内容が表示されます:

-> **デプロイデポジット**: 約5 AKT（デプロイを閉じると返却されます）

-> **推定コスト**: SDL の価格設定に基づきます


**「Approve」** をクリックし、Keplr でトランザクション（Transaction）に署名してください。

## ステップ4: プロバイダーを選択する

約30秒後、プロバイダーからの入札が表示されます。各入札には次が表示されます:

-> **ブロックあたりの価格**（AKT または USDC）

-> **月額推定コスト**

-> **プロバイダーの詳細**（稼働率、リージョンなど）


**最安値だけで選ばないでください。** 次を確認してください:

-> 稼働率 %（95%超を目安にしてください）

-> リージョン（近いほどレイテンシーは良くなりますが、ブロックチェーンノードでは大きな問題にはなりません）

-> 監査済みステータス（緑色のチェックマーク = より信頼できます）


選択したプロバイダーの **「Accept Bid」** をクリックし、Keplr で署名してください。

## ステップ5: デプロイを待つ

Console は次を行います:

-> 選択したプロバイダーとのリースを作成します

-> マニフェストを送信します（プロバイダーに実行内容を伝えます）

-> コンテナを開始します


これには1～2分かかります。UI にステータス更新が表示されます。

## ステップ6: 稼働していることを確認する

デプロイされると、次の内容が表示されます:

-> **Services** タブ: ステータス付きの *zcashd* サービスを表示します

-> **Logs** タブ: zcashd ノードからのライブログです

-> **Leases** タブ: デプロイの詳細（DSEQ、プロバイダー、コスト）です


### ログを確認する

**Logs** をクリックすると、zcashd が起動する様子を確認できます:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**初回実行では zcash-params（約2GB）がダウンロードされます。** これは1回限りの操作で、プロバイダーの帯域幅に応じて5～10分かかります。以後の再起動ではスキップされます。

同期にはネットワークに応じて**数時間から数日**かかります。次を確認してください:

-> ブロック高が増加していること

-> ピア接続（10～30ピアになるはずです）

-> 同じエラーが繰り返されないこと


## ステップ7: ノードのアドレスを取得する

**Leases** タブをクリックし、次に **URIs** をクリックしてください。

次のような表示になります:

```
zcashd-8233: provider-hostname.com:31234
```

これはノードの**パブリック P2P エンドポイント**です。他の Zcash ノードはこのアドレスであなたに接続します。

**ポートマッピングに注意してください:** SDL ではポート8233を設定しましたが、Akash は別のパブリックポート（この例では31234）を割り当てました。これは正常です。混乱する場合は、上部の「Akash におけるポートマッピング」セクションを参照してください。ノードには、必ずしも8233ではなく、ここで Akash が表示するポートでアクセスできます。

RPC を有効にした場合（SDL ではデフォルトでコメントアウトされています）、独自のマッピング済みポートを持つ RPC エンドポイントもここに表示されます。

## 設定オプション

### テストネットへの切り替え

SDL はデフォルトでメインネットです。代わりにテストネットを使用するには:

-> *env* セクションの**ネットワークを変更します:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> *expose* セクションの**公開ポートを更新します:**

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> *profiles.compute.zcashd.resources* でテストネット用の**リソースを減らすこともできます:**

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> *profiles.placement.akash.pricing* で**価格を下げることもできます:**

   ```yaml
   amount: 5000  # Down from 10000
   ```

> 価格を下げると、プロバイダーが入札対象から除外される場合があります。この値を試すか、プロバイダーエンドポイントを使用して入札するかどうかを確認してください。（プロバイダー API のドキュメントを確認してください）

### RPC アクセスを有効にする

RPC はセキュリティ上の理由からデフォルトで無効です。有効にするには:

**重要: 強力な認証情報を設定してください。** zcashd RPC はユーザー名とパスワードを HTTP（HTTPS ではありません）経由で送信します。セキュリティ上の影響を理解している場合にのみ RPC を公開してください。

-> *env* セクションでコメントアウトを解除してください:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> *expose* で RPC ポートのコメントアウトを解除してください:

   **メインネットの場合:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **テストネットの場合:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**: RPC に *global: true* を設定すると、ベーシック認証でインターネットへ公開されます。これはよい考えではありません。*global: false* を使用して Akash の内部ネットワーク経由で RPC にアクセスするか、安全なトンネルを設定してください。

**ポートマッピングに関する注意**: RPC をグローバルに公開しても、Akash はランダムな高位ポート（8232/18232ではありません）にマッピングします。実際のパブリックエンドポイントを確認するには、デプロイの URI を確認してください。*global: false*（推奨）の場合、RPC エンドポイントは Akash デプロイネットワーク内でのみアクセス可能であり、パブリックインターネットからはアクセスできません。

### トランザクションインデックスを有効にする

トランザクションインデックスにより、RPC を介して ID で任意のトランザクションを照会できます。より多くのストレージを使用します（約20%増加）。

*env* でコメントアウトを解除してください:

```yaml
- "ZCASHD_TXINDEX=1"
```

**警告**: 既に同期済みのノードで txindex を有効にするには、ブロックチェーン全体の再インデックスが必要であり、数時間かかります。

### Insight Explorer を有効にする

Insight Explorer は、ブロックチェーンデータ用の追加 REST API エンドポイントを提供します（ブロックエクスプローラーに便利です）。

*env* でコメントアウトを解除してください:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

これにより txindex が自動的に有効になり、追加の RPC メソッドが加わります。

### Prometheus メトリクスを有効にする

監視用にメトリクスをスクレイプするには:

-> *env* でコメントアウトを解除してください:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> *expose* でメトリクスポートのコメントアウトを解除してください:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
メトリクスは http://yourendpoint:9969/metrics で Prometheus 形式として利用できます。

### リソース／価格を調整する

入札を獲得できない場合やコストを最適化したい場合:

**低スペックのプロバイダー向け**には、*profiles.compute.zcashd.resources* セクションで次を減らしてください:

-> CPU: *units: 2*（適切な同期速度の最小値）

-> メモリー: *size: 12Gi*（安定性の最小値）

-> ストレージ: *size: 120Gi*（メインネットの最小値）


**より多くの入札を集める**には、*profiles.placement.akash.pricing* で増やしてください:

-> メインネット: *amount: 15000* uakt/ブロックを試してください

-> テストネット: *amount: 7500* uakt/ブロックを試してください


SDL の値は控えめに高く設定されています。ほとんどのプロバイダーはより低い価格で入札します。

## デプロイを更新する

デプロイ後に設定を変更する必要がありますか?

-> Console の **My Deployments** に移動してください

-> zcashd デプロイを見つけてください

-> **「Update Deployment」** をクリックしてください

-> SDL を編集してください

-> **「Update」** をクリックし、Keplr で承認してください


**注意**: 更新するとコンテナが再起動します。ノードは保存済みの状態（永続ストレージ）から再開しますが、1～2分のダウンタイムを見込んでください。

## 監視

### Console 経由

-> **Logs タブ**: ライブコンテナログ

-> **Shell タブ**: コンテナ内でシェルを取得できます（デバッグに便利です）

-> **Events タブ**: Kubernetes イベントです（何か壊れている場合を除き、ほとんど役に立ちません）


### RPC 経由（有効な場合）

RPC を有効にしている場合、通常の zcashd フルノードとしてノードを照会できます（実際にそうだからです!）

### zcash-cli の代替手段

Console 経由でシェルアクセスがある場合は、*zcash-cli* を直接使用できます:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## デプロイを閉じる

完了した場合、または支払いを停止したい場合:

-> **My Deployments** に移動してください

-> zcashd デプロイを見つけてください

-> **「Close Deployment」** をクリックしてください

-> Keplr で確認して署名してください


5 AKT のデポジットは返金されます。**永続ストレージ**はプロバイダーによって保持されるはずですが、頼りすぎないでください。ほかのクラウドプロバイダーと同様に扱ってください。

## トラブルシューティング

### 「Insufficient funds」エラー

AKT がさらに必要です。Keplr ウォレットに資金を入れてください。

### 入札が表示されない

考えられる原因:

-> 価格が低すぎます（SDL の *amount* を増やしてください）

-> リソース要件が利用可能なプロバイダーに対して高すぎます（CPU／メモリー／ストレージを減らしてください）

-> さらに待ってください（入札の表示に60～90秒かかることがあります）


### デプロイが「pending」で停止する

プロバイダーで問題が発生している可能性があります。デプロイを閉じ、別のプロバイダーを試してください。

### zcashd のログに「No peers connected」と表示される

2026年7月18日のサポート終了停止以降、これは起動遅延ではなく予期される恒久的な状態であり、どれだけ待っても再デプロイしても解決しません。代わりに [Zebra](/guides/akash-network-zebra) をデプロイしてください。

### ログに「Out of memory」エラーが表示される

RAM を節約しすぎています。デプロイを閉じ、少なくとも12Giのメモリー（16Gi推奨）で再デプロイしてください。

### 同期がいつまでも終わらない

「いつまでも」とは何を指しますか:

-> **数時間**: 正常です

-> **数日**: メインネットをゼロから同期する場合も正常です

-> **数週間**: 問題があります。ログでエラーを確認してください


### 「Error fetching zcash-params」

プロバイダーにネットワークの問題があるか、帯域幅が遅い可能性があります。通常は自然に解決します。30分以上続く場合は、別のプロバイダーへ再デプロイしてみてください。

### RPC 認証の失敗

-> `ZCASHD_RPCUSER` と `ZCASHD_RPCPASSWORD` が正しく設定されていることを確認してください

-> 正しいポートを使用していることを確認してください（メインネットは8232、テストネットは18232）

-> ポートは Akash によってマッピングされることを忘れないでください。8232へ直接接続するのではなく、デプロイの URI を使用してください


## コスト管理

Console で支出を監視してください:

-> **My Deployments** -> デプロイ -> 「Cost per month」の見積もりを表示します

-> Keplr ウォレットの残高は時間とともに減少します


残高が少なくなると、Akash はデプロイを自動的に閉じます。**ウォレットを定期的にチャージ**するか、アラートを設定してください。

### コストを削減する

-> 本番環境以外のテストには**テストネット**を使用してください（50%安価です）

-> 高速な同期が不要な場合は**CPU／メモリーを減らしてください**

-> **より安いプロバイダーを選択してください**（常に賢明とは限りません。稼働率が重要です）

-> AKT の価格が不安定な場合は、AKT の代わりに **USDC** を使用してください（SDL の価格設定変更が必要です）

-> 不要な場合は**txindex を無効にしてください**（ストレージを約20%節約します）


### 追加リソース

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash ドキュメント**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash エクスプローラー**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network)（プロバイダーの問題について）

## 最終的な注意事項

- **永続ストレージは重要です。** *persistent: true* を省略したり、*beta2* クラスを使用したりしないでください。*beta3* を使用してください。
- **初回同期は遅いです。** 辛抱強く待ってください。ブロックチェーンノードではこれは正常です。
- **ウォレットに資金を維持してください。** AKT がなくなるとデプロイは自動的に閉じられます。
- **バックアップは自動ではありません。** データを大切にする場合は、消失する可能性があると考えて計画してください。
- **RPC のセキュリティは重要です。** 適切なセキュリティ対策なしに RPC をインターネットへ公開しないでください。
- **zcash-params はキャッシュされます。** 初回実行では約2GBの暗号学的パラメーターがダウンロードされます。これは正常であり、1回だけ発生します。
