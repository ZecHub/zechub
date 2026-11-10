# BTCPay Server と Zcash サポート：完全なインストールおよび統合ガイド

BTCPay Server を使用すると、オンラインビジネスは仲介者やカストディアンを介さずに、暗号資産による支払いを直接受け取れます。このガイドでは、Zcash のシールドされた支払いをネイティブにサポートする BTCPay Server の完全なセットアップ手順を説明します。

> このドキュメントでは、BTCPay Server インスタンスへの Zcash の統合に焦点を当てます。  
> **フルノード（Zebra）** と **lightwalletd ベースのセットアップ** の両方をサポートします。

---

## 目次

- [BTCPay Server と Zcash を使用する理由](#Why-Use-BTCPay-Server-with-Zcash)
- [BTCPay Server の仕組み](#How-BTCPay-Server-Works)
- [資金はどこに保管されますか？秘密鍵は誰が管理しますか？](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Zcash を受け取るための BTCPay Server のセットアップ方法](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Zcash サポートを備えた BTCPay Server のデプロイ](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [独自の Zcash フルノード（Zebra + lightwalletd）の実行](#Running-Your-Own-Zcash-Full-Node)
  - [外部 lightwalletd ノードへの接続（カスタム設定）](#Connecting-to-an-External-Lightwalletd-Node)
  - [Cloudflare Tunnel を使用した自宅での BTCPay Server のホスティング](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [BTCPay Server ウェブインターフェースでの Zcash プラグインの設定](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [ウェブサイトへの BTCPay Server の統合](#Integrating-BTCPay-Server-with-Your-Website)
  - [API 統合](#API-Integration)
    - [API キーの生成](#Generating-an-API-Key)
    - [例：API 経由での請求書作成](#Example-Creating-an-Invoice-via-API)
    - [Webhook のセットアップ](#Setting-Up-a-Webhook-Optional)
  - [CMS 統合](#CMS-Integration)
  - [支払いボタンまたは Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [結論](#Conclusion)
- [リソース](#Resources)


---

## BTCPay Server と Zcash を使用する理由

オンラインコマースで暗号資産を受け入れるケースは増えています。高速で、グローバルに利用でき、銀行なしで機能します。これは販売者と顧客の双方にとって有益です。しかし、多くの人が見落としている重要な点があります。

注文時、顧客は通常、氏名、配送先住所、電話番号などの個人情報を提供します。Bitcoin、Ethereum、または Ethereum や Tron 上のステーブルコインなど、パブリックなブロックチェーンを使用して支払いを行う場合、トランザクションは恒久的に分析可能な状態で公開されます。

注文内容を知らなくても、誰でも次のことができます。

- いつ、いくら支払われたかを確認できます。  
- 資金の送信元と送金先を追跡できます。  
- 相関点が少しでもあれば（たとえば、漏洩したメールアドレスや配送先名）、暗号資産アドレスを実在の人物に結び付けられます。  

これは、1回の購入によって顧客の金融履歴全体が明らかになる可能性があることを意味します。

逆方向にも同じことが当てはまります。販売者のアドレスが一度でもオンチェーンに現れた場合、その販売者は情報公開のリスクにさらされます。競合他社や第三者の観測者は、支払い量、サプライヤーの活動、事業フローの構造を追跡できます。

### BTCPay Server と Zcash の組み合わせで、この問題を解決できます。


BTCPay Server は、暗号資産による支払いを受け取るための無料かつ分散型システムです。  
支払い仲介業者ではなく、資金を保有しません。すべての支払いは販売者のウォレット（Wallet）に直接送られます。  
これは個人用ウォレットでも、組織内のマルチシグ設定でも構いません。

サーバーは次のような調整作業を処理します。

- 各注文に固有のアドレスを生成します。  
- 支払いを受信した時点を追跡し、注文に関連付けます。  
- 領収書と通知を発行します。  
- 顧客向けの支払いインターフェースを提供します。  

すべてはストア所有者の管理下で実行され、第三者サービスに依存しません。

Zcash は、ゼロ知識proof に基づいて構築された暗号資産です。完全にプライベートなトランザクションモデルをサポートします。  
シールドされたアドレス（以下、単に「アドレス」と呼びます）を使用する場合、送信者、受信者、トランザクション金額はブロックチェーン上に公開されません。

オンラインストアにとって、これは次のことを意味します。

- 購入者は金融履歴を公開せずに支払いを完了できます。  
- 販売者は、アドレス、販売量、またはトランザクション構造を公開せずに支払いを受け取れます。  
- 外部の観測者は、支払いを注文や顧客データに関連付けることができません。  

### 実例

ユーザーが注文を行い、支払い方法として Bitcoin または USDT を選択します。  
ウェブサイトは支払いアドレスを生成し、金額を表示します。  
支払いが行われると、このアドレスはブロックチェーンに記録され、公開されます。  
攻撃者は、1件の注文をアドレスに結び付けるだけで、そのトランザクション履歴全体を長期的に把握できます。

では、Zcash で同じ状況を考えてみましょう。  
BTCPay Server はシールドされたアドレスを生成します。購入者は支払いを送信します。  
ブロックチェーンの観点では、何も起こりません。分析できる公開データは存在しません。  
サーバーは確認を受け取り、それを注文に関連付け、プロセスを完了します。

外部の人には、何も起きていないように見えます。  
すべてのロジックはストアと顧客の間にとどまります。そうあるべきです。

このソリューションは、自動化や使いやすさを損ないません。  
他の暗号資産の場合と同様に機能しますが、データ漏洩のリスクはありません。



## BTCPay Server の仕組み

BTCPay Server は、eコマースプラットフォームとブロックチェーンの間で支払い処理を行うブリッジとして機能します。フローは次のとおりです。

1. 顧客がウェブサイトで注文します（例：WooCommerce、Magento、または BTCPay 統合を備えた任意のプラットフォーム）。

2. ストアが BTCPay Server に支払い請求書を要求します。サーバーは、以下を含む固有の請求書を生成します。
   - 注文金額
   - カウントダウンタイマー
   - デフォルトで Orchard（シールドされた）レシーバーを含む Zcash Unified Address（UA）（例：`u1...`）

3. 顧客が支払いページを確認し、提供されたアドレスに ZEC を送信します。

4. BTCPay Server はブロックチェーンを監視し、支払いについて次の項目を確認します。
   - 期待される金額
   - 受信アドレス
   - 請求書のタイムスタンプ

5. トランザクションが検出および確認されると、BTCPay がストアに通知します。

6. 顧客は支払い確認を受け取ります。必要に応じて、サーバーはメールで領収書を送信できます。

このプロセス全体は、仲介者やカストディアンなしで**自動的に**行われます。  
BTCPay Server は**資金を保有しません**。注文システムを安全かつプライベートにブロックチェーンへ接続するだけです。
## 資金はどこに保管されますか？秘密鍵は誰が管理しますか？

BTCPay Server はウォレットでは**なく**、秘密鍵を**必要としません**。  
すべての資金は販売者のウォレットに**直接**送られます。セキュリティは、**ビューイングキー（viewing key）ベースのアーキテクチャ**を使用することで確保されます。

### 仕組み

- **ウォレット（Wallet）は事前に作成されます。**  
  商人は、ビューイングキー（viewing key）に対応したZcashウォレットを使用します。たとえば、[Zkool](https://github.com/hhanh00/zkool2/)または[Zingo!ウォレット](https://zingolabs.org/)です。  
  完全なリストは[ZecHub.wiki](https://zechub.wiki/wallets)で確認できます。

- **BTCPay Server はビューイングキーを介して接続します。**  
  ビューイングキーは**読み取り専用キー**です。受信した支払いを検出し、新しい受信アドレスを生成できますが、  
  資金を使用することはできません。サーバーはシードフレーズ（seed phrase）や秘密鍵を保管しません。

- **ブロックチェーンデータには `lightwalletd` サーバーを通じてアクセスします。**  
  `https://zec.rocks` のようなパブリックノードを使用することも、完全な自己主権のために独自の `Zebra + lightwalletd` スタックを実行することもできます。

- **各注文には固有のアドレスが割り当てられます。**  
  ビューイングキーにより、サーバーは請求書ごとに新しい Zcash シールドされたアドレスを導出でき、  
  安全な支払い追跡を可能にし、アドレスの再利用を防止します。

- **資金に対する完全な管理権は保持されます。**  
  サーバーが侵害されても、誰もあなたの資金を盗めません。公開される可能性があるのは支払いメタデータだけです。

この設計では、**インフラストラクチャ**と**資産管理**が分離されています。  
資金を危険にさらすことなく、BTCPay Server を更新、移行、または再インストールできます。

## Zcash を受け取るための BTCPay Server のセットアップ方法

前のセクションでは、BTCPay Server が Zcash と連携する仕組みと、プライバシーを保護する支払いにとってそれが重要である理由を説明しました。ここからは実際の作業に移ります。

正確なセットアップは、いくつかの要因によって異なります。

- すでに BTCPay Server インスタンスをお持ちですか？
- パブリック lightwalletd を使用しますか、それとも独自のフルノードを実行しますか？
- サーバーは VPS 上で実行しますか、それとも自宅で実行しますか？

この章では、最小限のセットアップから完全に自己主権的なデプロイまで、現在利用可能なすべての構成シナリオを扱います。

以下について説明します。

- フルノード（Zebra）を含め、VPS 上でゼロからすべてをデプロイする方法
- **Cloudflare Tunnel** を使用して IP アドレスを隠したまま、自宅で BTCPay Server を実行する方法
- BTCPay Server ウェブインターフェース内で Zcash サポートを有効化および設定する方法
- ウェブサイトまたはオンラインストアに BTCPay を統合する方法


## Zcash サポートを備えた BTCPay Server のデプロイ

実際のセットアップに進みましょう。このセクションでは、新しい VPS 上に、または既存のインスタンスへ ZEC サポートを追加して、Zcash サポート付きの BTCPay Server をインストールします。

すでに BTCPay Server を実行している場合（たとえば BTC や Lightning 用）、すべてを再インストールする必要はありません。ZEC プラグインを有効化するだけです。

パブリック `lightwalletd` ノードを使用する最小限のセットアップから、独自のフルノードを使用する完全に自己主権的なインストールまで、さまざまな構成を説明します。  
最適な選択肢は、サーバーの場所と、外部インフラストラクチャからどの程度独立したいかによって異なります。

> 公式プラグインドキュメント：  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **警告：インスタンスごとに 1 つのウォレット：**  
> Zcash プラグインは、BTCPay インスタンス内の**すべてのストア**で**1 つの共有ウォレット**を使用します。  
> 1 つのインスタンスで複数の独立したストアをホストする場合、それらは同じ Zcash ウォレットを共有します。  
> 厳格なウォレット分離が必要な場合は、別々のインスタンスを使用してください。

---

### 推奨 VPS 構成

インストール前に、以下を用意してください。

- **Ubuntu 22.04+** を搭載した VPS
- DNS 経由でサーバーの IP アドレスを指すドメイン名
- `git`、`docker`、および `docker-compose` がインストールされていること
- サーバーへの SSH アクセス

---

## サーバーの準備（非表示部分）

<details>
  <summary>クリックして展開</summary>

Zcash サポート付きで BTCPay Server をデプロイするには、以下が必要です。

### 1. Ubuntu 22.04 以降を搭載した VPS

**Ubuntu Server 22.04 LTS** の最小インストールを使用することを推奨します。  
専用 IP アドレスを提供する任意の VPS プロバイダーを使用できます。  

**最小要件**：  
- CPU コア 2 個  
- RAM 4 GB  
- ディスク容量 40 GB  

このセットアップは、Zcash に lightwalletd を使用する場合に十分です。  
**フル Zcash ノード**を実行する場合は、**少なくとも 300 GB** の空きディスク容量が必要です。

---

### 2. サーバーを指すドメイン名

DNS プロバイダーのダッシュボードで、VPS の IP アドレスを指すサブドメイン用の `A` レコード  
（例：`btcpay.example.com`）を作成します。  

このドメインは、ブラウザから BTCPay Server にアクセスするため、  
および Let's Encrypt を通じて**無料の SSL 証明書**を自動生成するために使用されます。

---

### 3. サーバーへの SSH アクセス

BTCPay Server をインストールするには、SSH 経由で VPS に接続する必要があります。  
ターミナルから以下を実行します。

`ssh root@YOUR_SERVER_IP`

macOS、Linux、または Windows 上の WSL を使用している場合、SSH はすでにターミナルで利用できます。
通常の Windows では、**PuTTY** のような SSH クライアントを使用してください。

---

### 4. Git、Docker、および Docker Compose のインストール

SSH 経由で接続したら、システムパッケージを更新し、必要なコンポーネントをインストールします。

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Ubuntu 22.04 以降では、APT の `docker-compose` は非推奨です。
> 推奨パッケージは `docker-compose-plugin` で、`docker compose` コマンドを提供します（ダッシュではなくスペースである点に注意してください）。

これで、サーバー環境は BTCPay Server をインストールする準備が整いました。

</details>

---

### ステップ 1：リポジトリをクローンする

作業ディレクトリを作成し、BTCPay Server Docker デプロイをダウンロードします。

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### ステップ 2：環境変数をエクスポートする

`btcpay.example.com` を実際のドメインに置き換えます。

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> 後で Monero または Litecoin を追加する予定がある場合は、今ここで含めることができます。

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

適切な変数をエクスポートしてセットアップスクリプトを再実行すれば、いつでも新しいコインを追加できます。

`. ./btcpay-setup.sh -i`

このガイドでは、**Zcash のみ**に焦点を当てます。

---

### ステップ 3：インストーラーを実行する

セットアップスクリプトを実行して、サーバーをビルドおよび起動します。

`. ./btcpay-setup.sh -i`

スクリプトは依存関係をインストールし、`docker-compose.yml` を生成し、サービスを起動して、`systemd` を設定します。
所要時間は約 5 分です。

完了すると、BTCPay Server インスタンスは次の場所で利用できます。

`https://btcpay.example.com`

> 既存のインストールを変更する場合（たとえば ZEC を追加する場合）は、新しい設定でサーバーを停止して再起動してください。

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

次に、BTCPay Server ウェブインターフェースで Zcash を設定するため、次のセクションに進んでください。

## 自身の Zcash フルノードを実行する

公開 `lightwalletd` ノードに依存したくない場合は、同じサーバーに lightwalletd とともに独自のフル Zcash ノードをデプロイできます。  
これにより、**完全な自律性**が得られます。外部依存も信頼も必要ありません。

---

### ステップ1: 十分なディスク容量を確保する

フル Zcash ノード（Zebra + lightwalletd）は、現在 **300 GB以上** のディスク容量を必要とし、その容量は増え続けています。

内訳:

- Zebra ブロックチェーン（Blockchain）データベース: 約260〜270 GB
- lightwalletd インデックス作成: 約15〜20 GB

#### 推奨ストレージ:

- サーバーを Zcash 支払いのみに使用する場合は **400 GB以上**
- サーバーで BTCPay Server、PostgreSQL、Nginx なども実行する場合は **800 GB以上**

> 特にデータを定期的にプルーニングする予定がない場合は、容量 **1 TB** のSSD/NVMeディスクを使用するのが理想的です。

---

### ステップ2: 環境変数を設定する

フルノード構成を有効にするには、以下を環境設定に追加します。

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

これにより `zcash-fullnode` フラグメントが含まれ、BTCPay Server 内で `zebrad` と `lightwalletd` の両方が起動されます。

---

### ステップ3: インストーラーを再実行する

`. ./btcpay-setup.sh -i`

スクリプトは以下を実行します。

* Zebra および lightwalletd 用の Docker イメージをダウンロードします
* BTCPayスタック内にサービスをセットアップします
* Zcash プラグインを**ローカルの** `lightwalletd` インスタンスにリンクします

> **ブロックチェーン全体の同期には数日かかる場合があります**。特に低リソースのVPSサーバーではそうなります。
> 同期が完了するまで、シールドされた（Shielded）支払いは利用できません。


## 外部 lightwalletd ノードへの接続

ほとんどの場合、完全な自律性は必要ありません。また、加盟店はフル Zcash ノードの実行に時間やディスク容量を費やしたくない場合があります。  
デフォルトでは、BTCPay Server は公開 `lightwalletd` ノードに接続し、ブロックチェーン全体をダウンロードせずにシールドされた支払いを処理します。

デフォルトのエンドポイントは次のとおりです。

`https://zec.rocks:443`

ただし、BTCPay Server を設定して、次のような**任意の外部 `lightwalletd` ノード**に接続できます。

`https://lightwalletd.example:443`

このセクションでは、**カスタム Docker フラグメント**を使用する方法を説明します。

> すべての環境変数を含む完全な構成例は、[plugin repository](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml) で確認できます。  
> 以下の手順では、最小限の動作するセットアップを示します。

---

### ステップ1: カスタム Docker フラグメントを作成する

BTCPayServerプロジェクトディレクトリで、カスタムフラグメントファイルを作成します。

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

以下の内容を追加します。

```
exclusive:
- zcash
```

`exclusive` ディレクティブにより、同じラベル（この場合は `zcash`）を持つフラグメントは一度に1つだけ有効にできます。
これにより構成の競合を防ぎます。たとえば、`zcash-fullnode` フラグメントと、このカスタム外部 `lightwalletd` フラグメントを同時に実行することはできません。
これを `exclusive: zcash` としてマークすると、BTCPay Server はデフォルトの `zcash-fullnode` コンテナと内部 `lightwalletd` コンテナを自動的に無効化し、独自の外部ノードに接続できるようにします。

---

### ステップ2: 環境変数を設定する

ターミナルで次を実行します。

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### ステップ3: 外部ノードのアドレスを定義する

`.env` ファイルを開きます。

`nano .env`

以下の行を追加し、URLを選択したエンドポイントに置き換えます。

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

次のいずれかを使用できます。

* `https://zec.rocks:443` のような**公開ノード**
* BTCPay Server とは別にデプロイした、自身でホストするノード

> 外部 `lightwalletd` が利用不能または過負荷になった場合、シールドされた支払いは失敗します。
> 重要なサービスには、**安定して実績のあるエンドポイント**（デフォルトの `zec.rocks` など）を選択してください。

> `lightwalletd` をセルフホストしたいですか？
> [Zebra リポジトリ](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml) の `docker-compose.lwd.yml` を使用できます。
> **警告:** このセットアップは公式に文書化されておらず、手動でのTLS設定、ポートフォワーディング、ファイアウォール設定が必要です。上級ユーザーにのみ推奨します。

---

### ステップ4: インストーラーを再実行する

`. ./btcpay-setup.sh -i`

BTCPay Server はカスタム構成を適用し、指定した `lightwalletd` ノードに接続します。

以後、Zcash プラグインは、シールドされたトランザクション（Transaction）の処理にその外部エンドポイントを使用します。


## Cloudflare Tunnelを使用して自宅で BTCPay Server をホストする

静的IPアドレスがないRaspberry Pi 5などのホームデバイスやローカルサーバーで BTCPay Server をホストしながら、Zcash 支払いを受け付けたいですか？  
**Cloudflare Tunnel** を使用すれば、インスタンスを安全にインターネットへ公開できます。

この方法ではポートフォワーディングを回避し、実際のIPアドレスを公開から隠しつつ、HTTPS経由でサーバーにアクセス可能な状態を維持できます。

また、暗号資産による支払いがビジネスの中核ではなく任意の機能である場合に理想的な、**VPSをレンタルするコストの回避**にも役立ちます。

---

### ステップ1: Cloudflare Tunnelをインストールする

1. [cloudflare.com](https://www.cloudflare.com) でアカウントを作成し、ドメインを追加します。
2. **ホームサーバー**で、Cloudflareの公式パッケージリポジトリを使用してCloudflare Tunnelをインストールします。

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

`apt install cloudflared` が失敗する場合は、代わりに該当する `.deb` をインストールします。

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Cloudflareで認証します。

`cloudflared tunnel login`

このコマンドによりブラウザーウィンドウが開きます。ログインして、ドメインへのアクセスを承認してください。
Cloudflareは、トークンを含む `credentials` ファイルをサーバー上に自動作成します。

4. 新しいトンネルを作成します（名前は `btcpay` など任意です）。

`cloudflared tunnel create btcpay`

これにより、トンネルIDと認証情報を含む `btcpay.json` ファイルが生成されます。次のステップで必要になります。

---

### ステップ2: トンネル構成ファイルを作成する

構成ディレクトリが存在しない場合は作成し、構成ファイルを開きます。

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

以下の構成を貼り付けます。

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### 説明:

* `tunnel` - 先ほど作成したトンネルの名前
* `credentials-file` - `cloudflared tunnel login` 中に生成されたトークンファイルへのパス
* `hostname` - Cloudflareに登録したドメイン（例: `btcpay.example.com`）
* `service` - BTCPay Server のローカルアドレス（通常、Nginxでは `http://127.0.0.1:80`）

> CloudflareはホームIPを公開することなく、トラフィックを安全にローカルサーバーへプロキシします。


### ステップ3: トンネル用のDNSレコードを追加する

トンネルの作成後、Cloudflareは通常、ドメイン用の **CNAME DNSレコードを自動的に追加**します。次のようになります。

`btcpay.example.com -> <UUID>.cfargotunnel.com`

自動的に表示されない場合は、手動で追加します。

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) に移動します
2. **DNS** セクションに移動します
3. 新しいCNAMEレコードを追加します:
   - **名前**: `btcpay`
   - **ターゲット**: `<UUID>.cfargotunnel.com`  
     正確な値は、`btcpay.json` ファイル内、または次のコマンドを実行して確認できます。
     
     `cloudflared tunnel list`
     
   - **プロキシステータス**: 有効（オレンジ色の雲）

> このレコードにより、`btcpay.example.com` へのすべてのリクエストはCloudflare Tunnelを経由してルーティングされ、実際のIPアドレスが公開から隠されます。

---

### ステップ4: システム起動時にトンネルを有効にする

起動時にトンネルを自動実行するには、システムサービスとしてインストールします。

`sudo cloudflared service install`

次に、サービスを有効化して起動します。

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

ステータスを確認します。

`sudo systemctl status cloudflared`

`Active: active (running)` のようなメッセージと、`btcpay.example.com` がオンラインであることの確認が表示されるはずです。

> 以後、トンネルは再起動のたびに自動的に開始され、BTCPay Server はポートフォワーディングも実際のIPの公開もなしに公開アクセス可能になります。

---

### ステップ5: BTCPay Server のセットアップを完了する

初めて BTCPay Server をインストールする場合は、セットアップスクリプトを実行する前にドメインを設定します。

`export BTCPAY_HOST="btcpay.example.com"`

これにより、**Nginx構成**および**SSL証明書**の生成時に正しいドメインが使用されます。

BTCPay Server がすでにインストール済みで、トンネルを追加するだけの場合は次を実行します。

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

セットアップによって構成が再生成され、新しいドメインが適用されます。
これで、次の場所からサーバーにアクセスできるようになります。

`https://btcpay.example.com`

> 公開 `lightwalletd` を使用しているか、独自のフルノードを使用しているかは、トンネルに影響しません。
> 重要なのは、BTCPay Server がローカルで `127.0.0.1:80` をリッスンしていることだけです。


## BTCPay Server Webインターフェースで Zcash プラグインを構成する

> **複数ストア構成に関する重要事項:**  
> ここで構成する Zcash ウォレット（Wallet）は、インスタンス全体で**グローバル**です。個別のBTCPayインスタンスを実行しない限り、すべてのストアでこのウォレットが使用されます。

BTCPay Server インスタンスを正常にデプロイした後、管理者Webインターフェースから基本構成をいくつか実行する必要があります。  
公式ドキュメントには英語で完全な手順が記載されていますが、ここでは必須の手順を説明し、Zcash プラグインの構成に特に焦点を当てます。

---

### ステップ1: Webインターフェースにログインする

次のアドレスでインスタンスにアクセスします。

`[https://btcpay.example.com](https://btcpay.example.com)`

- 管理者ログイン名とパスワードを入力します。
- 初めてログインする場合は、アカウントの作成を求められます。
- 最初に登録したアカウントには、自動的に管理者権限が割り当てられます。

---

### ステップ2: Zcash プラグインをインストールする

1. メインメニューで次に移動します。

`Plugins -> Browse Plugins`

2. **Zcash（ZEC）**プラグインを見つけます。必要に応じて検索バーを使用してください。
3. **Install** をクリックして確認します。

> サーバー構成時に有効にした他のアルトコインについても、この手順を繰り返してください。

インストール後、**Restart Server** をクリックして、有効なプラグインを含むインターフェースを再読み込みします。


### ステップ3: Viewing Key を介してウォレットを接続する

プラグインをインストールすると、設定メニューに新しい **Zcash** セクションが表示されます。

1. 次に移動します。

`Zcash -> Settings`

2. **Unified Full Viewing Key（UFVK）**を貼り付けます。BTCPayは請求書ごとにUnified Addressを導出し、受信したシールドされた支払いを検出します。

> **注:** レガシー Sapling ビューイングキー（Viewing Key）もサポートされていますが、Orchard/Unified Addressを使用するには **UFVK** を指定する必要があります。


   形式例:

`uview184syv9wftwngkay8d...`

3. Block heightフィールドに値を入力します

* **新しいウォレット（新しいシードフレーズ（Seed Phrase））で初めてセットアップする場合:** 現在の Zcash ブロック（Block）高を入力します（3xpl.com/zcashで確認できます）。これにより初回スキャンが高速化されます。
* **同じサーバーで、レガシー Sapling 専用セットアップからUnified Address / Orchard に移行する場合:** このフィールドは空白のままにします。
* **同じウォレット/UFVKでストアを新しいサーバーへ移行する場合:** 任意で誕生高を入力します。これはストアで最初に支払い済みとなった注文のおおよその高です（3xplで注文日と照合してスキャン範囲を絞り込みます）。不明な場合は空白のままにします。

> まだすべてのウォレットが **Unified Full Viewing Key（UFVK）** のエクスポートに対応しているわけではありません。  
> 推奨オプション:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet（PC版）**](https://zingolabs.org/)  
> どちらのアプリでも、バックアップ/エクスポートセクションにあるUFVKエクスポートを探してください。

これらのキーは**自動アドレスローテーション**をサポートしており、次を意味します。
- 各顧客には**固有の**支払いアドレスが割り当てられます
- **単一の統合された**残高を確認できます

より幅広い互換性リストは、[ZecHub -> ウォレット](https://zechub.wiki/wallets) で確認できます。

すべてのフィールドを入力したら、**Save** をクリックします。

---

### ZEC 支払いフローをテストする

おめでとうございます。Zcash ウォレットが BTCPay Server に接続されました。

テストを実行しましょう。

1. 次に移動します。

`Invoices -> Create New`

2. ZEC で少額のテスト請求書を生成します。
3. **別のウォレット**（BTCPayに接続したウォレットではないもの）から資金を送信します。
4. トランザクションが検出されると、請求書ページに視覚的なお祝いの表示が出ます。
5. 請求書ステータスが **Paid** に変わることを確認します。

すべて正常に動作すれば、APIまたはCMSプラグインを使って、ウェブサイトに ZEC 支払いを統合する準備は完了です。



## BTCPay Server をウェブサイトに統合する

Zcash ウォレットを BTCPay Server に接続すると、支払いシステムをウェブサイトに統合できます。  
直接APIにアクセスする方法から、人気のCMSプラットフォーム向けのすぐに使えるプラグインまで、いくつかの方法があります。

---

### 統合オプション

- **API統合**  
  カスタム構築のウェブサイト、またはCMSを使用しないシステムに最適です。  
  請求書の作成、支払いの追跡、通知を、独自のインターフェースとロジック内で完全に制御できます。  
  基本的なプログラミング知識が必要なため、この作業はdeveloperに任せるのが最適です。

- **CMSプラグイン**  
  **WooCommerce**、**PrestaShop** などのプラットフォームで利用できます。  
  これらのプラグインを使用すれば、コーディングなしで数分以内に支払いを受け付けられます。

- **支払いボタンまたはIframe**  
  最も簡単な方法です。  
  寄付リンクまたはチェックアウトウィジェットを埋め込みたいだけのランディングページ、個人ウェブサイト、あらゆるサイトに最適です。

---

### API統合

カスタムプラットフォームを使用している場合、またはCMSをまったく使用していない場合は、APIが最適な選択肢です。  
請求書の作成、ステータスの追跡、通知の受信を行え、ユーザー体験を完全に制御できます。

> 注: 一部のCMSプラグインも内部でAPIを使用しているため、統合方法にかかわらず、APIキーの作成が多くの場合**最初に必要な手順**です。

次のステップ: ストア用のAPIキーを生成し、[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) を使用して統合を構築します。


### APIキーを生成する

BTCPay Server をウェブサイトまたはアプリに統合するには、APIキーを生成する必要があります。

1. BTCPay Server にログインし、**ユーザーメニュー**（右上隅）を開きます
2. **API Keys** に移動します
3. **Create a new API key** をクリックします
4. キーの名前を入力します
5. **Permissions** セクションで、次を有効にします:
   - `Can create invoice`
   - `Can view invoice`
   - *(任意)* `Can modify store settings` - ストアレベルの管理が必要な場合のみ

6. **Generate** をクリックします。個人用APIキーが表示されるので、コピーして安全に保管してください。

> このキーにより、ストアの請求書へアクセスできます。  
> 公開したり、クライアント側のコードに公開したり**しないでください**。

---

### 例: API経由で請求書を作成する

**エンドポイント:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**リクエスト本文:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**レスポンス:**

次を含むJSONオブジェクトを受け取ります。

* `invoiceId`
* ウェブサイトに埋め込む、または顧客に送信できる支払いURL

完全なドキュメント:
[Greenfield API – Create Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Webhookを設定する（任意）

請求書のステータスが変更されたとき（例: 支払いを受け取ったとき）にリアルタイム通知を受け取るには、次の手順を実行します。

1. ストア設定 -> **Webhooks** に移動します
2. BTCPay Server からの `POST` リクエストを処理するバックエンドエンドポイントのURLを追加します
3. 請求書が支払い済みまたは期限切れになると、BTCPayが自動的に通知を送信します

Webhookペイロードと再試行ロジックについては、[official webhook documentation](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-) で説明されています。

> さまざまなプログラミング言語向けの統合例は、BTCPayドキュメントおよび GitHub リポジトリで利用できます。



### CMS統合

BTCPay Server は、人気のコンテンツ管理システム（CMS）向けのプラグインをサポートしています。  
最も成熟して広く使用されている統合は **WordPress + WooCommerce** であり、コードを書かずに ZEC 支払いを簡単に受け付けられます。

---

#### WooCommerce（WordPress）

BTCPay Server は WooCommerce 用のプラグインを公式にサポートしています。

統合手順:

1. WordPressプラグインディレクトリまたは GitHub から、**BTCPay for WooCommerce** プラグインをインストールします。
2. WordPress管理パネルで次に移動します。

`WooCommerce -> Settings -> Payments`

3. リストから **BTCPay** を見つけ、**Set up** をクリックします
4. BTCPay Server URLを入力し、認可手順に従います  
   （APIキーの自動生成を推奨します）
5. 支払い方法を有効にして、設定を保存します

> 詳細な手順、ビデオチュートリアル、トラブルシューティングガイドは、プラグインのドキュメントで確認できます。

BTCPayドキュメントの同じセクションには、他のCMS統合オプションも記載されています。

---

### 支払いボタンまたはIframe（CMSもAPIも不要）

CMSを使用せず、APIも使いたくない場合、ZEC 支払いを受け付ける最も簡単な方法は、**支払いリンクまたはウィジェットをウェブサイトに直接埋め込むこと**です。

この方法は次の場合に最適です。

- ランディングページ
- ポートフォリオサイト
- ブログまたは静的ページ
- バックエンドサーバーを持たないプロジェクト

---

#### オプション1: 支払いボタン（リンク）

1. BTCPay Server で、**Invoices** セクションから手動で請求書を作成します
2. 次のような支払いリンクをコピーします。

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. リンクをHTMLに追加します。

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### オプション2: 埋め込み請求書（Iframe）

請求書をサイト上に直接表示するには、iframeを使用します。

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> ボタンまたはiframeコンテナは、サイトのデザインに合わせてスタイル設定できます。BTCPay Server では請求書ページの柔軟なテーマ設定が可能です。

## 結論

このガイドは長かったですが、ZcashによるBTCPay Server支払い（payments）の統合に関する基礎的な側面のみを扱っています。

BTCPay Serverのインターフェース（interface）は、ここで紹介したものよりはるかに多くの機能を提供しています。幸い、UIはロシア語を含む複数の言語で利用できるため、さらに探索し試してみることが容易です。

BTCPayは非常に柔軟なツール（tool）です。次のことができます。

* 単一のインスタンス上で複数の独立したストアをホストする
* 注文の閲覧のみから完全な管理者権限まで、チームメンバー向けにカスタムの役割と権限を定義する
* 独自のドメインとブランディングを使用する
* ウェブフック、フォールバックウォレット、さらにはTorアクセスを設定する
* 税金ルール、割引コード、チェックアウトページのカスタマイズ、支払い方法の制限などの高度な設定を構成する

BTCPayは、中央集権型の支払いプロバイダーに代わるオープンソースの選択肢として構築されました。仲介者なしでプライベートなZEC支払いを受け入れたい場合、このプラットフォームは間違いなく注目に値します。

BTCPayエコシステムを探索し、支払いを真に自分自身のものにするうえでの成功をお祈りします。

## リソース

* [BTCPay Server 公式ウェブサイト](https://btcpayserver.org/)
* [BTCPayよくある質問](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHubリポジトリ](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server メインネットデモ](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash BTCPay用プラグイン（GitHub）](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash プラグインインストールガイド](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [カスタムzcash-lightwalletd.custom.ymlの例](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Docker Composeファイル（Zebra）](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay APIキーのドキュメント（Greenfield API）](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Cloudflareトンネルを作成する](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash ウォレット互換性リスト（ZecHub）](https://zechub.wiki/wallets)
* [Zebra + lightwalletdをRaspberry Pi 5で使用する（ZecHub）](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
