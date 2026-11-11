# Akash NetworkでZebraを実行する方法

[Akash Console](https://console.akash.network)を使用して、Zebra Zcashのフルノード（full node）をデプロイするためのステップバイステップガイドです。

### デプロイするもの

以下を行う完全なZebraノード（node）です。

-> Zcashブロックチェーン（blockchain）全体を同期します（メインネットは100GB以上、テストネットは約40GB）

-> AKTトークン（token）の価格に応じて、月額およそ$15かかります

-> 完全な同期には数時間から数日かかります

-> 4 vCPU、16GB RAM、350GBストレージ（メインネット）、または2 vCPU、8GB RAM、50GB（テストネット）を使用します


### 重要：Akashでのポートマッピング

Akashでポートを公開する場合（例：Zebra P2P用のポート8233）、プロバイダーのパブリックIP上で**そのポート番号に直接バインドされるわけではありません**。代わりに、プロバイダーがランダムな高位ポート（31234や42567など）を割り当て、コンテナのポート8233へリバースプロキシします。

これは設計上の仕様です。プロバイダーは複数のデプロイメントを実行しており、全員がポート8233を直接使用しようとすると競合が発生するためです。

**これが意味すること：**

-> SDLでポート8233を設定します（Zebraの標準P2Pポート）

-> Akashから*provider.com:31234*のようなURIが提供されます

-> 他のZcashノードが*provider.com:31234*であなたに接続します

-> コンテナ内では、Zebraは引き続き8233で待ち受けます


これは自動的に処理されます。Akashから提供されたURIを使用してください。

### 前提条件

1. **Keplr Wallet**ブラウザー拡張機能がインストールされていること（Chrome/Brave/Firefox）
2. **AKTトークン** - 取引所（exchange）（Coinbase、Kraken、Osmosis）から50-100 AKTを取得します
3. Console UIで操作するための**5分**

#### ステップ1：ウォレットを接続する

-> [https://console.akash.network](https://console.akash.network)にアクセスします

-> 右上の**「Connect Wallet」**をクリックします

-> **Keplr**（またはお好みのCosmosウォレット（wallet））を選択します

-> Keplrが表示されたら接続を承認します


右上にAKT残高が表示されます。残高が0の場合は、先にウォレットへ資金を入れてください。

#### ステップ2：デプロイメントを作成する

-> **「Deploy」**ボタン（ページ中央の大きな青いボタン）をクリックします

-> **「Build your template」**を選択します（またはSDLのアップロードへ直接進みます）


##### オプションA：SDLファイルをアップロードする（推奨）

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### オプションB：SDLエディターを使用する

[the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)を手動で貼り付ける場合：

-> *zebra-akash.yml*の内容をコピーします

-> SDLエディターに貼り付けます

-> 必要に応じて変更します（以下の設定セクションを参照してください）

-> **「Create Deployment」**をクリックします


#### ステップ3：デポジットを確認して承認する

Consoleには以下が表示されます。

-> **デプロイメントデポジット**：約5 AKT（デプロイメントを閉じると返金されます）

-> **見積もりコスト**：SDLの価格設定に基づきます

**「Approve」**をクリックし、Keplrでトランザクション（transaction）に署名します。

#### ステップ4：プロバイダーを選択する

約30秒後、プロバイダーからの入札が表示されます。各入札には以下が表示されます。

-> **ブロック（block）あたりの価格**（AKTまたはUSDC）

-> **月額見積もりコスト**

-> **プロバイダーの詳細**（稼働率、リージョンなど）


**最安値だけで選ばないでください。**以下を確認してください。

-> 稼働率 %（95%超を目安にします）

-> リージョン（近いほどレイテンシーは低くなりますが、ブロックチェーンノードではあまり重要ではありません）

-> 監査済みステータス（緑色のチェックマークは信頼性がより高いことを示します）


選択したプロバイダーの**「Accept Bid」**をクリックし、Keplrで署名します。

#### ステップ5：デプロイメントを待つ

Consoleは以下を行います。

-> 選択したプロバイダーとリースを作成します

-> マニフェストを送信します（プロバイダーに実行内容を伝えます）

-> コンテナを起動します

これには1-2分かかります。UIにステータス更新が表示されます。

#### ステップ6：実行中であることを確認する

デプロイ後、以下が表示されます。

-> **Services**タブ：ステータス付きで*zebra*サービスを表示します

-> **Logs**タブ：ライブコンテナログ

-> **Leases**タブ：デプロイメントの詳細（DSEQ、プロバイダー、コスト）


##### ログを確認する

**Logs**をクリックすると、Zebraが起動する様子が表示されます。

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

ネットワークの状況によっては、同期に**数時間から数日**かかります。以下を確認してください。

-> ブロック高が増加していること

-> ピア接続（10-30ピア程度になるはずです）

-> 繰り返されるエラーがないこと


#### ステップ7：ノードのアドレスを取得する

**Leases**タブをクリックし、次に**URIs**をクリックします。

以下のような表示が見られます。

```bash
zebra-8233: provider-hostname.com:31234
```

これはあなたのノードの**パブリックP2Pエンドポイント**です。他のZcashノードはこのアドレスであなたに接続します。

**ポートマッピングについての注意：**SDLではポート8233を設定しましたが、Akashは別のパブリックポート（この例では31234）を割り当てています。これは正常です。混乱する場合は、上部の「Akashでのポートマッピング」セクションを参照してください。ノードには、必ずしも8233ではなく、ここでAkashが表示するポートからアクセスできます。

RPCを有効にした場合（SDLではデフォルトでコメントアウトされています）、独自のマッピング済みポートを持つRPCエンドポイントもここに表示されます。

### 設定オプション

#### テストネットに切り替える

SDLはデフォルトでメインネットを使用します。代わりにテストネットを使用するには：

-> *env*セクションで**メインネット設定をコメントアウト**します。

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **テストネット設定のコメントアウトを解除**します。

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> *expose*セクションで**公開ポートを更新**します。

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

-> *profiles.compute.zebra.resources*で、テストネット用に**リソースを削減**できます。

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> *profiles.placement.akash.pricing*で、**価格を下げる**ことができます。

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### RPCアクセスを有効にする

セキュリティ上の理由から、RPCはデフォルトで無効になっています。有効にするには：

**メインネットの場合：**

-> *env*セクションで以下のコメントアウトを解除します。

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose*でメインネットRPCポートのコメントアウトを解除します。

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**テストネットの場合：**

-> *env*セクションで以下のコメントアウトを解除します。

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose*でテストネットRPCポートのコメントアウトを解除します。

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**：RPCに*global: true*を設定すると、インターネットに公開されます。ZebraはデフォルトでCookie認証を使用しますが、何をしているのか理解していない限り、設定しないでください。

**ポートマッピングに関する注意**：RPCをグローバルに公開しても、Akashはランダムな高位ポート（8232/18232ではありません）にマッピングします。実際のパブリックエンドポイントは、デプロイメントのURIで確認してください。*global: false*（推奨）の場合、RPCエンドポイントにはAkashデプロイメントネットワーク内からのみアクセスでき、パブリックインターネットからはアクセスできません。

#### メトリクス（Prometheus）を有効にする

モニタリング用にメトリクスをスクレイプするには：

-> *env*のコメントアウトを解除します。

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> *expose*でメトリクスポートのコメントアウトを解除します。

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### リソース／価格を調整する

入札が来ない場合、またはコストを最適化したい場合：

**低スペックのプロバイダー向け**には、*profiles.compute.zebra.resources*セクションで以下を減らします。

-> CPU：*units: 2*（妥当な同期速度の最低値）

-> メモリ：*size: 12Gi*（安定性の最低値）

-> ストレージ：*size: 120Gi*（メインネットの最低値）

**より多くの入札を集める**には、*profiles.placement.akash.pricing*で以下を増やします。

-> メインネット：*amount: 1000000* uakt/blockを試してください

-> テストネット：*amount: 1000000* uakt/blockを試してください

### デプロイメントを更新する

デプロイ後に設定を変更する必要がありますか？

-> Consoleで**My Deployments**に移動します

-> Zebraデプロイメントを見つけます

-> **「Update Deployment」**をクリックします

-> SDLを編集します

-> **「Update」**をクリックし、Keplrで承認します

**注意**：更新するとコンテナが再起動します。ノードは保存済みの状態（永続ストレージ）から再開しますが、1-2分のダウンタイムを想定してください。

### モニタリング

#### Console経由

-> **Logsタブ**：ライブコンテナログ

-> **Shellタブ**：コンテナ内でシェルを取得します（デバッグに便利です）

-> **Eventsタブ**：Kubernetesイベント（何かが壊れていない限り、ほとんど役に立ちません）


#### RPC経由（有効な場合）

RPCを有効にした場合、通常のzebradフルノードとしてノードをクエリできます（実際にそうであるためです！）

### デプロイメントを閉じる

完了した場合、または支払いを停止したい場合：

-> **My Deployments**に移動します

-> Zebraデプロイメントを見つけます

-> **「Close Deployment」**をクリックします

-> Keplrで確認して署名します

5 AKTのデポジットは返金されます。**永続ストレージ**はプロバイダーによって保持されるはずですが、依存しないでください。他のクラウドプロバイダーと同様に扱ってください。

### トラブルシューティング

#### 「Insufficient funds」エラー

AKTがさらに必要です。Keplrウォレットに資金を入れてください。

#### 入札が表示されない

以下のいずれかです。

-> 価格設定が低すぎます（SDLの*amount*を増やします）

-> リソース要件が利用可能なプロバイダーには高すぎます（CPU／メモリ／ストレージを減らします）

-> さらに待ちます（入札が表示されるまで60-90秒かかることがあります）


#### デプロイメントが「pending」のまま進まない

プロバイダーに問題がある可能性があります。デプロイメントを閉じて、別のプロバイダーを試してください。

#### Zebraログに「No peers connected」と表示される

最初の数分間は正常です。Zebraは自動的にピアを発見します。10分以上経っても続く場合は、ネットワークの問題がある可能性があります（Akashでは起こりにくいです）。

#### ログに「Out of memory」エラーが表示される

RAMを節約しすぎています。デプロイメントを閉じ、少なくとも12Giのメモリ（16Gi推奨）で再デプロイしてください。

#### 同期にいつまでも時間がかかる

「いつまでも」の定義を確認してください。

-> **数時間**：正常です

-> **数日**：メインネットを最初から同期する場合も正常です

-> **数週間**：何か問題があります。ログでエラーを確認してください


### コスト管理

Consoleで支出を監視します。

-> **My Deployments** -> デプロイメント -> 「Cost per month」の見積もりが表示されます

-> Keplrウォレットの残高は時間とともに減少します


残高が少なくなると、Akashはデプロイメントを自動的に閉じます。**定期的にウォレットをチャージ（top up）する**か、アラートを設定してください。

#### コストを削減する

-> 本番以外のテストには**テストネットを使用**します（50%安価です）

-> 高速な同期が必要ない場合は**CPU／メモリを下げます**

-> **より安価なプロバイダーを選択**します（必ずしも賢明ではありません。稼働率が重要です）


### メインネットとテストネット

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

デプロイメントプロセスを試すだけなら、テストネットから始めてください。設定については、上記の「テストネットに切り替える」セクションを参照してください。

### 追加リソース

**Akash Console**：[https://console.akash.network](https://console.akash.network)

**Akashドキュメント**：[https://akash.network/docs/](https://akash.network/docs/)

**Zebraドキュメント**：[https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcashエクスプローラー**：[https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**：[https://discord.akash.network](https://discord.akash.network)（プロバイダーの問題について）
