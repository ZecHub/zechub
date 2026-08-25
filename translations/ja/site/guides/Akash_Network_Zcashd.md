# Akash Console 経由で zcashd をデプロイする

> **非推奨です。使用するつもりのノードをこのガイドに従ってデプロイしないでください。**
>
> zcashd は 2026年7月18日に自動的なサポート終了停止に達しました。今日デプロイした zcashd ノードはチェーンの先端まで同期できないため、デプロイには毎月費用がかかるだけで、何も生み出しません。
>
> 代わりに **Zebra** をデプロイしてください: [Akash Network で Zebra を実行する方法](/guides/akash-network-zebra)。同じ Akash Console のワークフローを扱っており、必要なディスク容量はおよそ 3 分の 1 です。既存のセットアップを移行する場合は、[zcashd から Zebra と Zallet への移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) を参照してください。
>
> このページは zcashd デプロイの歴史的記録として残されています。

[Akash Console](https://console.akash.network) を使って zcashd Zcash フルノード（Electric Coin Co 実装）をデプロイするためのガイドです。以下に動画チュートリアルがあります。より詳しいガイドはその下にあります。

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


## デプロイするもの

以下のような zcashd フルノードです:

-> Zcash ブロックチェーン全体を同期します（mainnet では 350GB 以上、testnet では約 40GB）

-> AKT トークン価格によりますが、おおよそ月額 15 ドルかかります

-> 完全同期には数時間から数日かかります

-> 4 vCPU、16GB RAM、350GB ストレージ（mainnet）または 2 vCPU、8GB RAM、50GB（testnet）を使用します

-> 初回実行時に暗号パラメータをダウンロードします（約 2GB、1 回のみ）

**zcashd と Zebra の比較:**

-> zcashd は Electric Coin Co による元々の Zcash ノード実装で、2026年7月18日以降停止しています

-> Zebra は Zcash Foundation による、現在使われているフルノードです

-> 現在のチェーンに追従するのは Zebra だけであり、zcashd ノードは先端に到達できません

-> zcashd のウォレットは [Zallet](/using-zcash/zallet-quick-reference-guide) に置き換えられました

-> ウォレット機能や特定の RPC API が必要な場合は zcashd を使用してください


### **重要: Akash におけるポートマッピング**

Akash でポートを公開するとき（例: zcashd P2P 用のポート 8233）、それはプロバイダの公開 IP 上のまったく同じポートには **バインドされません**。代わりに、プロバイダがランダムな高位ポート（31234 や 42567 など）を割り当て、それをコンテナのポート 8233 にリバースプロキシします。

これは仕様です。プロバイダは複数のデプロイを実行しているため、全員が直接ポート 8233 を使おうとすると競合が発生します。

**これが意味すること:**

-> SDL ではポート 8233 を設定します（zcashd の標準 P2P ポート）

-> Akash は *provider.com:31234* のような URI を割り当てます

-> 他の Zcash ノードは *provider.com:31234* であなたに接続します

-> コンテナ内では、zcashd は引き続き 8233 で待ち受けます


これは自動的に処理されます。Akash が与える URI をそのまま使ってください。

## 前提条件

-> **Keplr Wallet** ブラウザ拡張機能がインストール済みであること（Chrome/Brave/Firefox）

-> **AKT トークン** - 取引所（Coinbase、Kraken、Osmosis）で 50〜100 AKT を入手してください

-> Console UI をクリックして進めるための **5 分**


## ステップ 1: ウォレットを接続する

-> [https://console.akash.network](https://console.akash.network) にアクセスします

-> 右上の **"Connect Wallet"** をクリックします

-> **Keplr**（または好みの Cosmos ウォレット）を選びます

-> Keplr がポップアップしたら接続を承認します


右上に AKT 残高が表示されるはずです。ゼロの場合は、先にウォレットへ資金を入れてください。

## ステップ 2: デプロイを作成する

-> **"Deploy"** ボタン（ページ中央の大きな青いボタン）をクリックします

-> **"Build your template"** を選びます（または SDL のアップロードへ直接進みます）

### オプション A: SDL ファイルをアップロードする（推奨）

> **このボタンは停止済みノードをデプロイします。** 同期できないノードに対して AKT 残高から課金されます。代わりに [Zebra ガイド](/guides/akash-network-zebra) を使ってください。

[![Akash でデプロイ](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### オプション B: SDL エディタを使う

手動で SDL を貼り付けたい場合:

-> *zcashd-akash.yml* の内容をコピーします

-> SDL エディタに貼り付けます

-> 必要に応じて修正します（下の設定セクションを参照）

-> **"Create Deployment"** をクリックします


## ステップ 3: デポジットを確認して承認する

Console には以下が表示されます:

-> **デプロイのデポジット**: 約 5 AKT（デプロイを閉じると返金されます）

-> **推定コスト**: SDL の価格設定に基づきます


**"Approve"** をクリックし、Keplr でトランザクションに署名します。

## ステップ 4: プロバイダを選ぶ

約 30 秒後、プロバイダからの入札が表示されます。各入札には以下が含まれます:

-> **ブロックごとの価格**（AKT または USDC）

-> **月額推定コスト**

-> **プロバイダ詳細**（稼働率、リージョンなど）


**一番安いものを選ぶだけにしないでください。** 確認すべき点:

-> 稼働率 %（95% 超を目安に）

-> リージョン（近いほどレイテンシは低くなりますが、ブロックチェーンノードではそれほど重要ではありません）

-> 監査済みステータス（緑のチェックマーク = より信頼できる）


選んだプロバイダの **"Accept Bid"** をクリックし、Keplr で署名します。

## ステップ 5: デプロイ完了を待つ

Console は以下を行います:

-> 選択したプロバイダとのリースを作成する

-> マニフェストを送信する（プロバイダに何を実行するか伝える）

-> コンテナを起動する


これには 1〜2 分かかります。UI にステータス更新が表示されます。

## ステップ 6: 稼働していることを確認する

デプロイが完了すると、以下が表示されます:

-> **Services** タブ: *zcashd* サービスとそのステータスを表示

-> **Logs** タブ: zcashd ノードのライブログ

-> **Leases** タブ: デプロイの詳細（DSEQ、プロバイダ、コスト）


### ログを確認する

**Logs** をクリックすると、zcashd の起動が表示されるはずです:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**初回実行時は zcash-params（約 2GB）をダウンロードします。** これは 1 回限りの処理で、プロバイダの帯域幅によって 5〜10 分かかります。以後の再起動ではスキップされます。

同期には、ネットワーク状況によって **数時間から数日** かかります。以下を確認してください:

-> ブロック高が増えている

-> ピア接続がある（10〜30 ピア程度が目安）

-> 同じエラーが繰り返されていない


## ステップ 7: ノードのアドレスを取得する

**Leases** タブをクリックし、次に **URIs** をクリックします。

次のような表示になります:

```
zcashd-8233: provider-hostname.com:31234
```

これはあなたのノードの **公開 P2P エンドポイント** です。他の Zcash ノードはこのアドレスであなたに接続します。

**ポートマッピングに注意してください:** SDL ではポート 8233 を設定しましたが、Akash はそれを別の公開ポート（この例では 31234）に割り当てています。これは正常です。混乱する場合は、上部の「Akash におけるポートマッピング」セクションを参照してください。ノードにアクセスできるのは、必ずしも 8233 ではなく、ここで Akash が表示しているポートです。

RPC を有効にしている場合（SDL ではデフォルトでコメントアウトされています）、ここに RPC エンドポイントも独自のマップ済みポート付きで表示されます。

## 設定オプション

### Testnet に切り替える

SDL のデフォルトは Mainnet です。代わりに Testnet を使うには:

-> *env* セクションで **ネットワークを変更** します:

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> *expose* セクションで **公開ポートを更新** します:

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

-> **任意: Testnet 用にリソースを削減** します（*profiles.compute.zcashd.resources* 内）:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **任意: 価格を下げる**（*profiles.placement.akash.pricing* 内）:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> 価格を下げると、入札するプロバイダが絞られる可能性があります。この値は試行して調整するか、プロバイダのエンドポイントを使って入札されるか確認してください。（プロバイダ API ドキュメントを確認）

### RPC アクセスを有効にする

RPC はセキュリティ上の理由からデフォルトで無効です。有効にするには:

**重要: 強力な認証情報を設定してください。** zcashd の RPC は HTTP（HTTPS ではありません）でユーザー名/パスワードを送信します。セキュリティ上の影響を理解している場合にのみ RPC を公開してください。

-> *env* セクション内のコメントを外します:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> *expose* の RPC ポートのコメントを外します:

   **Mainnet の場合:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Testnet の場合:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**: RPC に対して *global: true* を設定すると、Basic 認証付きでインターネットに公開することになります。これは悪い考えです。*global: false* を使って、Akash の内部ネットワーク経由で RPC にアクセスするか、安全なトンネルをセットアップしてください。

**ポートマッピングの再確認**: RPC をグローバルに公開した場合でも、Akash はそれをランダムな高位ポートにマッピングします（8232/18232 ではありません）。実際の公開エンドポイントはデプロイ内の URI を確認してください。*global: false*（推奨）の場合、RPC エンドポイントには Akash デプロイネットワーク内からのみアクセスでき、公開インターネットからはアクセスできません。

### トランザクションインデックスを有効にする

トランザクションインデックスを使うと、RPC 経由で任意のトランザクションを ID で問い合わせられます。より多くのストレージを使います（約 20% 増加）。

*env* 内のコメントを外します:

```yaml
- "ZCASHD_TXINDEX=1"
```

**警告**: 既に同期済みのノードで txindex を有効にすると、ブロックチェーン全体の再インデックスが必要になり、数時間かかります。

### Insight Explorer を有効にする

Insight Explorer は、ブロックチェーンデータ用の追加 REST API エンドポイントを提供します（ブロックエクスプローラに便利です）。

*env* 内のコメントを外します:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

これにより自動的に txindex が有効になり、追加の RPC メソッドが追加されます。

### Prometheus メトリクスを有効にする

監視のためにメトリクスをスクレイプするには:

-> *env* 内のコメントを外します:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> *expose* のメトリクスポートのコメントを外します:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
メトリクスは Prometheus 形式で http://yourendpoint:9969/metrics から利用できます。

### リソース/価格を調整する

入札が付かない場合やコストを最適化したい場合:

**低スペックなプロバイダ向け** に、*profiles.compute.zcashd.resources* セクションで以下を減らします:

-> CPU: *units: 2*（妥当な同期速度の最低ライン）

-> メモリ: *size: 12Gi*（安定動作の最低ライン）

-> ストレージ: *size: 120Gi*（mainnet の最低ライン）


**より多くの入札を集める** には、*profiles.placement.akash.pricing* で以下を増やします:

-> Mainnet: *amount: 15000* uakt/block を試してください

-> Testnet: *amount: 7500* uakt/block を試してください


SDL の値は保守的に高めに設定されています。ほとんどのプロバイダはより低い価格で入札します。

## デプロイを更新する

デプロイ後に設定を変更する必要がありますか?

-> Console の **My Deployments** に移動します

-> zcashd デプロイを見つけます

-> **"Update Deployment"** をクリックします

-> SDL を編集します

-> **"Update"** をクリックし、Keplr で承認します


**注:** 更新するとコンテナは再起動されます。ノードは保存された状態（永続ストレージ）から再開しますが、1〜2 分のダウンタイムは見込んでください。

## 監視

### Console 経由

-> **Logs タブ**: ライブのコンテナログ

-> **Shell タブ**: コンテナ内でシェルを取得できます（デバッグに便利）

-> **Events タブ**: Kubernetes イベント（何か壊れているとき以外はほぼ役に立ちません）


### RPC 経由（有効にしている場合）

RPC を有効にしていれば、通常の zcashd フルノードとしてノードに問い合わせできます（実際にそうだからです！）

### zcash-cli の代替

Console 経由でシェルアクセスがあるなら、*zcash-cli* を直接使えます:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## デプロイを閉じる

使い終わったとき、または支払いを止めたいとき:

-> **My Deployments** に移動します

-> zcashd デプロイを見つけます

-> **"Close Deployment"** をクリックします

-> 確認して Keplr で署名します


5 AKT のデポジットは返金されます。**永続ストレージ** はプロバイダによって保持されるはずですが、それを当てにしないでください。一般的なクラウドプロバイダと同じように扱ってください。

## トラブルシューティング

### "Insufficient funds" エラー

AKT がもっと必要です。Keplr ウォレットに資金を入れてください。

### 入札が表示されない

次のいずれかです:

-> 価格設定が低すぎる（SDL の *amount* を増やす）

-> リソース要件が、利用可能なプロバイダに対して高すぎる（CPU/メモリ/ストレージを減らす）

-> もう少し待つ（入札が表示されるまで 60〜90 秒かかることがあります）


### デプロイが "pending" のまま進まない

プロバイダ側に問題がある可能性があります。デプロイを閉じて別のプロバイダを試してください。

### zcashd のログに "No peers connected" と表示される

2026年7月18日のサポート終了停止以降、これは起動遅延ではなく想定される恒久的な状態であり、待機や再デプロイで解決することはありません。代わりに [Zebra](/guides/akash-network-zebra) をデプロイしてください。

### ログに "Out of memory" エラーが出る

RAM をケチりすぎています。デプロイを閉じ、少なくとも 12Gi のメモリ（推奨は 16Gi）で再デプロイしてください。

### 同期に永遠に時間がかかる

「永遠」を定義すると:

-> **数時間**: 正常です

-> **数日**: mainnet をゼロから同期するならこれも正常です

-> **数週間**: 何か問題があります。ログでエラーを確認してください


### "Error fetching zcash-params"

プロバイダにネットワーク問題や低速な帯域幅があるかもしれません。通常は自然に解消します。30 分以上続く場合は、別のプロバイダに再デプロイしてみてください。

### RPC 認証エラー

-> *ZCASHD_RPCUSER* と *ZCASHD_RPCPASSWORD* が正しく設定されているか確認してください

-> 正しいポートを使っているか確認してください（mainnet は 8232、testnet は 18232）

-> ポートは Akash によってマッピングされることを忘れないでください。8232 を直接使うのではなく、デプロイの URI を使ってください


## コスト管理

Console で支出を監視してください:

-> **My Deployments** -> 対象デプロイ -> "Cost per month" の推定値が表示されます

-> Keplr ウォレット残高は時間とともに減少します


残高が少なくなると、Akash は自動的にデプロイを閉じます。**定期的にウォレットに追加入金する** か、アラートを設定してください。

### コストを削減する

-> **本番以外のテストには Testnet を使う**（50% 安い）

-> **高速同期が不要なら CPU/メモリを下げる**

-> **より安いプロバイダを選ぶ**（常に賢いとは限りません。稼働率は重要です）

-> **AKT 価格が不安定なら AKT の代わりに USDC を使う**（SDL の価格設定変更が必要）

-> **txindex が不要なら無効にする**（約 20% のストレージ節約）


### 追加リソース

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash エクスプローラ**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network)（プロバイダの問題向け）

## 最後の注意

- **永続ストレージは重要です。** *persistent: true* を省略したり、*beta2* クラスを使ったりしないでください。*beta3* を使ってください。
- **初回同期は遅いです。** 焦らず待ってください。これはブロックチェーンノードでは正常です。
- **ウォレットに十分な残高を維持してください。** AKT が尽きるとデプロイは自動的に閉じられます。
- **バックアップは自動ではありません。** データが重要なら、消える可能性を前提に計画してください。
- **RPC のセキュリティは極めて重要です。** 適切なセキュリティ対策なしに RPC をインターネットへ公開しないでください。
- **zcash-params はキャッシュされます。** 初回実行時に約 2GB の暗号パラメータをダウンロードします。これは正常で、1 回しか発生しません。
