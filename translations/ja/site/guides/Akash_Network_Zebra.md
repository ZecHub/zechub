# Akash NetworkでZebraを実行する方法

Akash上にZebra Zcashのフルノード（full node）をデプロイするためのステップバイステップガイドです。

### デプロイするもの

以下を行う完全なZebraノード（node）です。

-> Zcashブロックチェーン（blockchain）全体を同期します（メインネットは100GB以上、テストネットは約40GB）

-> AKTトークン（token）の価格に応じて、月額およそ$15かかります

-> 完全な同期には数時間から数日かかります

-> 4 vCPU、16GB RAM、350GBストレージ（メインネット）、または2 vCPU、8GB RAM、50GB（テストネット）を使用します


awesome-akashテンプレートでは、**Zebra 7.0.0**を固定するようになりました（`:latest`は使用しません）。Prometheus（`9999`）とhealth（`8080`）を内部で有効にし、同じ環境に配置された**lightwalletd**向けにJSON-RPCをgRPC **9067**で内部公開し、機能フラグ`ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`を有効にします。

高速なプルーニング済みメインネットノードを実行する方法については、[ZakuraをAkash](/guides/akash-network-zakura)で実行する方法をご覧ください。一時的なレグテスト用ダッシュボードについては、[ZakuraをAkash](/guides/thus-spoke-zakura-akash)でご覧ください。

### Akashがポートを公開する方法

SDL（`port` / `as`）の数値は**コンテナポート**です。Zebraは引き続き**8233**、lightwalletdは**9067**でリッスンし、ヘルスチェックは**8080**でリッスンします。これらの数値はプロセスと、同じデプロイメント内の他のサービス（`zebra:8232`）で使用されます。

それらは、プロバイダーのパブリックIP上のポート**ではありません**。

**デフォルト（このテンプレート）:** 専用IPアドレスはありません。`global: true` のTCP公開ごとに、プロバイダーは共有ホスト上の**ランダムな高位ポート**をコンテナのポートに割り当てます。リースの開始後、Console/Air の **Leases → URIs** に実際のエンドポイントが表示されます。たとえば、

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

ピアとウォレットは**それらの**ホスト:ポート値を使います。必要な公開先（P2Pとlightwalletd）のURIをコピーしてください。`ZEBRA_NETWORK__EXTERNAL_ADDR`を設定する場合は、`…:8233`ではなく、マッピングされたP2PのURI（`provider.example:31482`）を設定してください。

**HTTP**（`as: 80`と`http_options`を使用し、Thus Spokeダッシュボードで使います）：多くのプロバイダーは、ランダムなTCPポートではなく、**Ingressホスト名**（多くの場合80/443）を公開しています。そのサービスのURIをブラウザーで開いてください。

**内部**（`global: false`または`to: service: lightwalletd`）：クラスタDNSのみ（`zebra:8232`）。パブリックURIはありません。

**専用IP**（SDLでは`endpoints` / `kind: ip`）は**有料の追加オプション**です。パブリックIPを固定でき、そのIPの`as`ポートも固定できる場合があります。これらのテンプレートでは専用IPをリクエストしません。安定した`host:8233`が必要であれば、後からご自身で追加してください。追加費用がかかり、入札するプロバイダーの数も少なくなることが予想されます。

### どのサイトを使うか（支払い）

SDLは同じです。2つのAkashウェブUIでは、**支払い方法**が異なります。

| サイト | 支払い | ウォレット |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 従来型のウェブ決済（カード／Consoleが提供する法定通貨決済手段） | Consoleアカウント |
| [air.akash.network](https://air.akash.network) | ネイティブなAkashチェーン決済（AKT / ACT） | **Keplr** |

オンチェーンでKeplrを使って支払う場合は**Air**を使用します。一般的なウェブ決済フローを利用する場合は**Console**を使用します。ConsoleではKeplrのネイティブ決済に対応しているとは限りません。

### 前提条件

**Consoleで支払う場合（Webチェックアウト）**

1. [console.akash.network](https://console.akash.network) のConsoleアカウント
2. Console UIで利用できる支払い方法
3. UIでの数分間の操作

**Airで支払う場合（ネイティブAkash / Keplr）**

1. **Keplr**のブラウザー拡張機能（Chrome/Brave/Firefox）
2. デポジットとリースのためのKeplr内の**AKT / ACT**（取引所またはIBCから）
3. [air.akash.network](https://air.akash.network)を開きます

#### ステップ1：接続する

**コンソール（ウェブ決済）**

-> [https://console.akash.network](https://console.akash.network)にアクセスします

-> サインインして、Consoleアカウントの手続きを完了します

-> UIに表示されるチェックアウトを使用します（オンチェーンのKeplrではありません）

**Air（ネイティブのAkash支払い）**

→ [https://air.akash.network](https://air.akash.network) に移動してください

-> **「ウォレットに接続」**をクリックします

-> **Keplr**を選択し、接続を承認します

-> 入金額とリース料を合わせた金額を支払えるだけのAKT/ACT残高があることを確認します

#### ステップ2：デプロイメントを作成する

-> **「Deploy」をクリックします**

-> **「Build your template」**を選択します（またはSDLのアップロードへ直接進みます）


##### オプションA：SDLファイルをアップロードする（推奨）

**ウェブ決済（コンソール）**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Akashによるネイティブな支払いとKeplr（Air）**

[Airでこのテンプレートを開く](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### オプションB：SDLエディターを使用する

[the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)を手動で貼り付ける場合：

-> *zebra-akash.yml*の内容をコピーします

-> SDLエディターに貼り付けます

-> 必要に応じて変更します（以下の設定セクションを参照してください）

-> **「Create Deployment」**をクリックします


#### ステップ3：デポジットを確認して承認する

UIに次の情報が表示されます:

-> **デプロイメントデポジット**：約5 AKT（デプロイメントを閉じると返金されます）

-> **見積もりコスト**：SDLの価格設定に基づきます

**Air**で**「承認」**をクリックし、**Keplr**にサインインします。**Console**では、UIに表示されるウェブチェックアウトを完了します。

#### ステップ4：プロバイダーを選択する

約30秒後、プロバイダーからの入札が表示されます。各入札には以下が表示されます。

-> **ブロック（block）あたりの価格**（AKTまたはUSDC）

-> **月額見積もりコスト**

-> **プロバイダーの詳細**（稼働率、リージョンなど）


**最安値だけで選ばないでください。**以下を確認してください。

-> 稼働率 %（95%超を目安にします）

-> リージョン（近いほどレイテンシーは低くなりますが、ブロックチェーンノードではあまり重要ではありません）

-> 監査済みステータス（緑色のチェックマークは信頼性がより高いことを示します）


選択したプロバイダーで「入札を承諾」をクリックします。On AirではKeplrにサインインします。On Consoleではウェブ決済フローで確認します。

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

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

各行は1つの`global: true`公開です。名前にはSDLの`as`ポート（8233、9067）が含まれます。ホスト名の後の数字は、リース時に割り当てられる**プロバイダー側のマッピング済みポート**です。他のZcashノードは`provider-hostname.com:31482`に接続します。コンパクトウォレットではlightwalletdURIを使用します（自分でTLSを終端しない限り、TLSは無効です）。

コンテナは引き続き8233 / 9067で待ち受けています。専用IPを後から追加しない限り（このテンプレートでは追加されません）、公開アドレスは常にURIです。

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

RPCを`global: true`で公開する場合も、公開アドレスは引き続き**リースURI**（`host:&lt;random-high-port&gt;`）であり、`host:8232`ではありません。`global: false`（このテンプレート）を使うと、RPCはデプロイメントネットワーク上に維持されます（lightwalletd向けの`zebra:8232`）。専用IPリースは別途有料のオプションであり、SDLには含まれていません。

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

-> **「Update」**をクリックします（Air: Keplrにサインインします。Console: ウェブ決済フローを確認します）

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

-> 確認（Air：Keplrにサインイン；Console：Console UIで確認）

5 AKTのデポジットは返金されます。**永続ストレージ**はプロバイダーによって保持されるはずですが、依存しないでください。他のクラウドプロバイダーと同様に扱ってください。

### トラブルシューティング

#### 「Insufficient funds」エラー

On Airでは、AKT/ACTでKeplrに資金を入金します。Consoleでは、Consoleの支払い方法にチャージします。

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

ConsoleまたはAirで支出を確認します。

-> **My Deployments** -> デプロイメント -> 「Cost per month」の見積もりが表示されます

-> Air: KeplrのAKT/ACT残高は時間の経過とともに減少します。Console: Consoleの支払い残高は減少します。

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

**Akash コンソール**（ウェブ決済）: [https://console.akash.network](https://console.akash.network)

**Akash Air**（ネイティブAKT/ACT + Keplr）：[https://air.akash.network](https://air.akash.network)

**Akashドキュメント**：[https://akash.network/docs/](https://akash.network/docs/)

**Zebraドキュメント**：[https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcashエクスプローラー**：[https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**：[https://discord.akash.network](https://discord.akash.network)（プロバイダーの問題について）
