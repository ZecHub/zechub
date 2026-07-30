# Akashネットワーク上でZebraを実行する方法

[Akash Console](https://console.akash.network)を使用して、ZcashフルノードとしてのZebraノードを展開するためのステップバイステップガイド。

### 展開しているもの

以下の機能を持つフルノード：

-> 全てのZcashブロックチェーンを同期（メインネットでは100GB以上、テストネットでは約40GB）

-> AKTトークン価格に依存して月額で約$15かかる

-> 完全に同期するのに数時間から数日かかる

-> 4 vCPU、16GB RAM、350GBストレージ（メインネット）または2 vCPU、8GB RAM、50GB（テストネット）を使用


### 重要: Akashでのポートマッピング

Akash上でポートを公開する場合（例：Zebra P2Pのためのポート8233）、**提供者のパブリックIPにその正確なポートにバインドされません**。代わりに、提供者がランダムな高ポート（例：31234または42567）を割り当て、それをあなたのコンテナのポート8233にリバースプロキシします。

これは設計上の仕様です - 提供者は複数の展開を実行しており、すべてが直接ポート8233を使用しようとすると衝突する可能性があります。

**あなたにとっての意味:**

-> SDL（Zebraの標準P2Pポート）でポート8233を設定します

-> Akashは*provider.com:31234*のようなURIを提供します

-> 他のZcashノードは*provider.com:31234*に接続します

-> コンテナ内では、Zebraは依然としてポート8233でリスニングしています


これは自動的に処理されます。Akashが提供するURIを使用してください。

### 前提条件

1. **Keplr Wallet**ブラウザ拡張機能をインストール（Chrome/Brave/Firefox）
2. **AKTトークン** - 交易所から50-100 AKTを入手（Coinbase, Kraken, Osmosisなど）
3. **5分間**、コンソールUIをクリックする時間

#### ステップ1: ワレットの接続

-> [https://console.akash.network](https://console.akash.network)にアクセス

-> 右上の**"Connect Wallet"**をクリック

-> **Keplr**（またはお好みのCosmosウォレット）を選択

-> Keplrがポップアップしたときに接続を承認


あなたのAKT残高は右上に表示されます。ゼロの場合、まずウォレットを資金注入してください。

#### ステップ2: 展開の作成

-> **"Deploy"**ボタン（ページ中央にある大きな青いボタン）をクリック

-> **"Build your template"**（またはSDLを直接アップロードする）を選択


##### オプションA: SDLファイルのアップロード（推奨）

[![Akash上での展開](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### オプションB: SDLエディタの使用

SDLファイルを手動で貼り付けたい場合、[このSDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)を使用してください：

-> *zebra-akash.yml*の内容をコピー

-> SDLエディタに貼り付け

-> 必要に応じて編集（下記の設定セクションを参照）

-> **"Create Deployment"**をクリック


#### ステップ3: 展開およびデポジットの承認

コンソールは以下を表示します：

-> **展開デポジット**: ~5 AKT（展開を終了したときに返還されます）

-> **推定コスト**: SDL価格に基づいています

**"Approve"**をクリックし、Keplrでトランザクションに署名してください。

#### ステップ4: 提供者の選択

~30秒後、提供者からの入札が表示されます。各入札には以下が含まれます：

-> **ブロックあたりの価格**（AKTまたはUSDC）

-> **月間推定コスト**

-> **提供者情報**（稼働時間、地域など）


**最も安いだけを選ばないでください。** 次を確認してください：

-> 稼働率%（95％以上を目指す）

-> 地域（近いほど遅延が少なくなりますが、ブロックチェーンノードではあまり影響しません）

-> 審査済みのステータス（緑色のチェックマーク = より信頼性が高い）


選んだ提供者で**"Accept Bid"**をクリックし、Keplrで署名してください。

#### ステップ5: 展開の待機

コンソールは以下を行います：

-> 選んだ提供者とリースを作成

-> マニフェストを送信（提供者が実行する内容を伝えます）

-> コンテナを起動します

これは1-2分かかります。UIでステータスの更新が表示されます。

#### ステップ6: 実行状況の確認

展開後、以下が表示されます：

-> **Services**タブ：*zebra*サービスとそのステータスが表示されます

-> **Logs**タブ：コンテナのライブログ

-> **Leases**タブ：展開に関する詳細（DSEQ、提供者、コストなど）


##### ログの確認

**Logs**をクリックすると、Zebraが起動しているのが見えます：

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

同期にはネットワークに依存して**数時間から数日**かかります。以下を確認してください：

-> ブロック高さが増加している

-> ピア接続（10-30ピア程度）

-> 繰り返しのエラーがない


#### ステップ7: ノードのアドレスの取得

**Leases**タブをクリックし、**URIs**を選択します。

以下のようなものが表示されます：

```bash
zebra-8233: provider-hostname.com:31234
```

これはあなたのノードの**パブリックP2Pエンドポイント**です。他のZcashノードはこのアドレスに接続します。

**ポートマッピングの注意点:** SDLでポート8233を設定しましたが、Akashは別のパブリックポート（この例では31234）に割り当てています。これは正常です - 上記の「Akashでのポートマッピング」セクションを参照してください。ノードはAkashがここに表示するポートでアクセス可能です。必ずしも8233ではありません。

RPCを有効にした場合（SDLではデフォルトでコメントアウトされています）、この場所にもRPCエンドポイントとそのマッピングされたポートが表示されます。

### 設定オプション

#### テストネットへの切り替え

SDLのデフォルトはメインネットです。テストネットを使用するには：

-> **env**セクションでメインネット設定をコメントアウトします：

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Testnet設定をアンコメントアウトします：**

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **expose**セクションの公開ポートを更新します：

   ```yaml
   # メインネットポートをコメントアウト：
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # テストネットポートをアンコメントアウト：
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **オプション：リソースの削減**（*profiles.compute.zebra.resources*でテストネット用に設定）：

   ```yaml
   cpu:
     units: 2  # メインネットから4へと下げる
   memory:
     size: 8Gi  # メインネットから16Giへと下げる
   storage:
     - size: 50Gi  # メインネットから150Giへと下げる
   ```

-> **オプション：価格の削減**（*profiles.placement.akash.pricing*でテストネット用に設定）：

   ```yaml
   amount: 5000  # メインネットから10000へと下げる
   ```

#### RPCアクセスの有効化

セキュリティ上の理由から、RPCはデフォルトで無効です。有効にするには：

**メインネット用：**

-> *env*セクションで以下の行をアンコメントアウトします：

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose*セクションでメインネットRPCポートをアンコメントアウトします：

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # セキュリティのため内部に限定
     proto: tcp
   ```

**テストネット用：**

-> *env*セクションで以下の行をアンコメントアウトします：

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose*セクションでテストネットRPCポートをアンコメントアウトします：

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**: RPCの *global: true* を設定すると、インターネットに公開することになります。Zebraはデフォルトでクッキー認証を使用しますが、それでも、自分が何をしているのか理解していない限り行わないでください。

**ポートマッピングのリマインダー**: たとえRPCをグローバルに公開しても、Akashはランダムな高ポート（8232/18232ではない）にマッピングします。展開のURIsを確認して実際のパブリックエンドポイントを見つけてください。*global: false*（推奨）の場合、RPCエンドポイントはAkash展開ネットワーク内からしかアクセスできません。

#### メトリクス（Prometheus）の有効化

監視のためにメトリクスを取得するには：

-> *env*セクションで以下の行をアンコメントアウトします：

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> *expose*セクションでメトリクスポートをアンコメントアウトします：

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### リソース/価格の調整

展開が行われていない、またはコストを最適化したい場合：

**低スペック提供者向けに** *profiles.compute.zebra.resources*セクションでリソースを減らしてください：

-> CPU：*units: 2*（合理的な同期速度の最小値）

-> メモリ：*size: 12Gi*（安定性のための最小値）

-> ストレージ：*size: 120Gi*（メインネット用の最小値）

**より多くの入札を引きたい場合** *profiles.placement.akash.pricing*セクションで価格を上げてください：

-> メインネット：*amount: 1000000* uakt/block を試してください

-> テストネット：*amount: 1000000* uakt/block を試してください

### 展開の更新

展開後、設定を変更したい場合：

-> コンソールの**My Deployments**にアクセス

-> Zebra展開を探してクリック

-> **"Update Deployment"**をクリック

-> SDLを編集

-> **"Update"**をクリックし、Keplrで承認してください

**注意**: 更新はコンテナを再起動します。ノードは保存された状態（永続ストレージ）から再開しますが、1-2分のダウンタイムが予想されます。

### モニタリング

#### コンソール経由でのモニタリング

-> **Logs tab**: コンテナのライブログ

-> **Shell tab**: コンテナ内にシェルを取得（デバッグに便利）

-> **Events tab**: Kubernetesイベント（何かが破損している場合以外はあまり役立ちません）


#### RPC経由でのモニタリング（有効化されている場合）

RPCを有効にした場合、あなたのノードは通常のzebradフルノードとしてクエリ可能です（実際にそうだからです！）。

### 展開の終了

終了したい、または支払いを停止したい場合：

-> **My Deployments**にアクセス

-> Zebra展開を探してクリック

-> **"Close Deployment"**をクリック

-> 確認し、Keplrで署名してください

あなたの5 AKTデポジットは返還されます。**永続ストレージ**は提供者が保持するはずですが、他のクラウドプロバイダーと同じように扱ってください。

### トラブルシューティング

#### "Insufficient funds"エラー

AKTが不足しています。Keplrウォレットを資金注入してください。

#### 入札が表示されない

以下のいずれかの可能性があります：

-> SDL内の価格が低すぎる（amountを増やす）

-> 利用可能な提供者にリソース要件が高すぎる（CPU/メモリ/ストレージを減らす）

-> 待つ（場合によっては60-90秒かかる）


#### 展開が"pending"で止まっている

提供者が問題を抱えている可能性があります。展開を終了し、別の提供者を試してください。

#### Zebraログに"No peers connected"と表示される

最初の数分間は正常です。Zebraは自動的にピアを発見します。10分以上経っても続く場合、ネットワーク問題（Akashでは可能性が低い）があります。

#### ログに"Out of memory"エラーがある

RAMを節約しました。展開を終了し、少なくとも12Giのメモリ（推奨は16Gi）で再展開してください。

#### 同期が永遠に終わらない

「永遠」の定義：

-> **時間**: 正常

-> **日数**: メインネットから始めての場合は正常

-> **週間以上**: 問題があります。ログを確認してエラーがないか見てください


### コスト管理

コンソールで支出を監視してください：

-> **My Deployments** -> あなたの展開 -> 「月ごとのコスト」推定が表示されます

-> Keplrウォレット残高は時間が経つにつれて減少します


残高が低くなった場合、Akashは自動的に展開を終了します。**定期的にウォレットを補充するか、アラートを設定してください**。

#### コストの削減

-> **テストネットを使用**して非生産的なテスト（50％安い）

-> **CPU/メモリを下げて**高速同期が不要な場合

-> **より安価な提供者を選択**（必ずしも賢い選択ではない - 稼働時間は重要）


### メインネット vs テストネット

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| 目的       | 本番Zcashブロックチェーン      | テストおよび開発                  |
| ネットワーク | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2Pポート  | 8233                             | 18233                           |
| RPCポート  | 8232                             | 18232                           |
| 同期時間   | 日数                             | 時間                            |
| ストレージ | 350GB+                           | 50GB                            |
| リソース   | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| コスト     | ~$15/月                          | ~$5/月                          |
----------------------------------------------------------------------------------
```

展開プロセスのテストだけを行う場合は、**テストネットから開始してください**。上記の「メインネットへの切り替え」セクションを参照してください。

### その他のリソース

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Docs**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcashエクスプローラー**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network)（提供者問題のため）
