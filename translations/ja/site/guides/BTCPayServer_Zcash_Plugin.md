# Zcash 対応の BTCPay Server: 完全インストールと統合ガイド

BTCPay Server を使うと、オンライン事業者は仲介業者やカストディアンを介さずに、暗号資産による支払いを直接受け取れます。このガイドでは、Zcash のシールド決済をネイティブにサポートする BTCPay Server をセットアップする全手順を説明します。

> このドキュメントは、BTCPay Server インスタンスに Zcash を統合することに焦点を当てています。  
> **full node (Zebra)** 構成と **lightwalletd ベース**構成の両方をサポートします。

---

## 目次

- [Zcash と BTCPay Server を使う理由](#Why-Use-BTCPay-Server-with-Zcash)
- [BTCPay Server の仕組み](#How-BTCPay-Server-Works)
- [資金はどこに保管されるのか？ 秘密鍵を管理するのは誰か？](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Zcash を受け取るための BTCPay Server セットアップ方法](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Zcash 対応で BTCPay Server をデプロイする](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [自分で Zcash Full Node を動かす (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [外部の lightwalletd ノードに接続する（カスタム設定）](#Connecting-to-an-External-Lightwalletd-Node)
  - [Cloudflare Tunnel を使って自宅で BTCPay Server をホスティングする](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [BTCPay Server の Web インターフェースで Zcash プラグインを設定する](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [BTCPay Server を自分の Web サイトに統合する](#Integrating-BTCPay-Server-with-Your-Website)
  - [API 統合](#API-Integration)
    - [API キーを生成する](#Generating-an-API-Key)
    - [例: API 経由で請求書を作成する](#Example-Creating-an-Invoice-via-API)
    - [Webhook を設定する](#Setting-Up-a-Webhook-Optional)
  - [CMS 統合](#CMS-Integration)
  - [支払いボタンまたは Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [結論](#Conclusion)
- [参考資料](#Resources)


---

## Zcash と BTCPay Server を使う理由

オンラインコマースでは、暗号資産による支払いの受け入れが増えています。高速で、グローバルに使え、銀行なしで機能します。これは事業者にも顧客にも利益があります。しかし、多くの人が見落としがちな重要な点があります。

注文時、顧客は通常、氏名、配送先住所、電話番号などの個人情報を提供します。もし支払いが公開型ブロックチェーン、たとえば Bitcoin、Ethereum、または Ethereum や Tron 上のステーブルコインで行われる場合、その取引は永久に分析可能な形で可視化されます。

何が注文されたかを知らなくても、誰でも次のことができます。

- いつ、いくら支払われたかを見る  
- 資金がどこから来て、どこへ行ったかを追跡する  
- 何らかの相関点（たとえば漏えいしたメールアドレスや配送名）があれば、暗号資産アドレスを実在の人物に結びつける

これは、たった一度の購入で顧客の金融履歴全体が明らかになる可能性があることを意味します。

そして、これは逆方向にも当てはまります。事業者のアドレスが一度でもオンチェーンに現れれば、その事業者は露出します。競合他社や第三者の観察者は、支払い量、仕入先の活動、事業フローの構造を追跡できます。

### BTCPay Server と Zcash の組み合わせは、これを解決できます。


BTCPay Server は、暗号資産による支払いを受け取るための無料で分散型のシステムです。  
決済仲介業者ではなく、資金を保有することもありません。すべての支払いは事業者のウォレットに直接送られます。  
それは個人用ウォレットでも、組織内のマルチシグ構成でも構いません。

サーバーは調整タスクを処理します。

- 注文ごとに一意のアドレスを生成する  
- 支払いの受信を追跡して注文に紐づける  
- 領収書や通知を発行する  
- 顧客向けの支払いインターフェースを提供する  

すべては、第三者サービスに依存せず、ストアオーナーの管理下で動作します。

Zcash はゼロ知識証明に基づく暗号資産です。完全にプライベートな取引モデルをサポートしています。  
シールドアドレス（以下、単に「アドレス」と呼びます）を使う場合、送信者、受信者、取引金額はブロックチェーン上に公開されません。

オンラインストアにとって、これは次のことを意味します。

- 購入者は自分の金融履歴を明かすことなく支払いを完了できる  
- 販売者は自分のアドレス、売上高、取引構造を公開することなく支払いを受け取れる  
- 外部の観察者は、その支払いを注文や顧客データに結びつけられない

### 実例

ユーザーが注文を行い、支払い方法として Bitcoin または USDT を選びます。  
Web サイトは支払いアドレスを生成し、金額を表示します。  
支払いが行われると、このアドレスはブロックチェーンに保存され、公開されます。  
攻撃者は、たった 1 件の注文をそのアドレスに結びつけるだけで、そのアドレスの取引履歴全体を長期的に可視化できます。

では、同じ状況を Zcash で想像してみてください。  
BTCPay Server はシールドアドレスを生成し、購入者は支払いを送ります。  
ブロックチェーンの観点からは、何も起こっていないように見えます。分析可能な公開データは存在しません。  
サーバーは確認を受け取り、それを注文に紐づけて、処理を完了します。

外部の人間には、何も起こらなかったように見えます。  
すべてのロジックは、ストアと顧客の間にだけとどまります。そうあるべきです。

このソリューションは、自動化や使いやすさを損ないません。  
他の暗号資産と同じように機能し、違いはデータ漏えいのリスクがないことだけです。



## BTCPay Server の仕組み

BTCPay Server は、あなたの EC プラットフォームとブロックチェーンの間に入る決済処理ブリッジとして機能します。流れは次のとおりです。

1. **顧客があなたの Web サイトで注文を行う**（例: WooCommerce、Magento、または BTCPay 統合のある任意のプラットフォーム）。

2. **ストアが BTCPay Server に支払い請求書を要求する**。サーバーは次を含む一意の請求書を生成します。
   - 注文金額
   - カウントダウンタイマー
   - Zcash Unified Address (UA) - 例: `u1...` - で、デフォルトで Orchard（シールド）受信先を含みます。

3. **顧客が支払いページを見て**、表示されたアドレスに ZEC を送ります。

4. **BTCPay Server がブロックチェーンを監視し**、次の項目に照らして支払いを確認します。
   - 期待される金額
   - 受取アドレス
   - 請求書のタイムスタンプ

5. **取引が検出され、確認されると**、BTCPay がストアに通知します。

6. **顧客は支払い確認を受け取ります。** 必要に応じて、サーバーはメールで領収書を送信できます。

この一連の流れは、**仲介業者やカストディアンなしで**、**自動的に**行われます。  
BTCPay Server は**資金を一切保有せず**、注文システムをブロックチェーンに安全かつプライベートに接続するだけです。
## 資金はどこに保管されるのか？ 秘密鍵を管理するのは誰か？

BTCPay Server は**ウォレットではなく**、**秘密鍵も必要としません**。  
すべての資金は**直接**事業者のウォレットに送られます。セキュリティは **viewing key ベースのアーキテクチャ**によって確保されます。

### 仕組み

- **ウォレットは事前に作成されます。**  
  事業者は Viewing Key をサポートする Zcash ウォレットを使用します。たとえば [YWallet](https://ywallet.app/installation) や [Zingo! Wallet](https://zingolabs.org/) です。  
  完全な一覧は [ZecHub.wiki](https://zechub.wiki/wallets) で確認できます。

- **BTCPay Server は Viewing Key を使って接続します。**  
  Viewing Key は**読み取り専用キー**です。入金の検出と新しい受取アドレスの生成はできますが、  
  資金を使うことはできません。サーバーはシードフレーズや秘密鍵を保存しません。

- **ブロックチェーンデータには `lightwalletd` サーバー経由でアクセスします。**  
  `https://zec.rocks` のような公開ノードを使うことも、完全な主権性のために自分で `Zebra + lightwalletd` 構成を運用することもできます。

- **各注文には一意のアドレスが割り当てられます。**  
  Viewing Key により、サーバーは請求書ごとに新しい Zcash のシールドアドレスを導出でき、  
  安全な支払い追跡とアドレス再利用の防止が可能になります。

- **資金の完全なコントロールはあなたにあります。**  
  たとえサーバーが侵害されても、誰かがあなたのお金を盗むことはできません。露出し得るのは支払いメタデータだけです。

この設計は、**インフラ**と**資産管理**を分離します。  
資金を危険にさらすことなく、BTCPay Server を更新、移行、再インストールできます。

## Zcash を受け取るための BTCPay Server セットアップ方法

前のセクションでは、BTCPay Server が Zcash とどのように連携するか、そしてプライバシー保護決済においてそれがなぜ重要なのかを説明しました。ここからは実際に手を動かしていきます。

具体的な構成は、いくつかの要因によって変わります。

- すでに BTCPay Server インスタンスを持っているか？
- 公開 lightwalletd を使いたいか、それとも自分で full node を動かしたいか？
- サーバーは VPS 上で動かすのか、それとも自宅で動かすのか？

この章では、最小構成から完全な主権型デプロイまで、現在のすべての構成シナリオを扱います。

以下の内容を順に見ていきます。

- VPS 上で、full node (Zebra) を含めてすべてをゼロからデプロイする方法
- **Cloudflare Tunnel** を使って IP を隠しながら自宅で BTCPay Server を動かす方法
- BTCPay Server の Web インターフェース内で Zcash サポートを有効化・設定する方法
- BTCPay をあなたの Web サイトやオンラインストアに統合する方法


## Zcash 対応で BTCPay Server をデプロイする

それでは実際のセットアップに進みましょう。このセクションでは、新規 VPS への導入、または既存インスタンスへの ZEC サポート追加という形で、Zcash 対応の BTCPay Server をインストールします。

すでに BTCPay Server が動作中（たとえば BTC や Lightning 用）であれば、すべてを再インストールする必要はありません。ZEC プラグインを有効化するだけです。

公開 `lightwalletd` ノードを使う最小構成から、自前の full node を使う完全主権型インストールまで、さまざまな構成を見ていきます。  
最適な選択肢は、サーバーの設置場所と、外部インフラからどれだけ独立したいかによって決まります。

> 公式プラグインドキュメント:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **警告 - 1 インスタンスにつき 1 ウォレット:**  
> Zcash プラグインは、BTCPay インスタンス内の**すべてのストア**で**1 つの共有ウォレット**を使用します。  
> 1 つのインスタンスで複数の独立したストアをホストする場合、それらは同じ Zcash ウォレットを共有します。  
> 厳密なウォレット分離が必要な場合は、別々のインスタンスを使用してください。

---

### 推奨 VPS 構成

インストール前に、以下を確認してください。

- **Ubuntu 22.04+** の VPS
- サーバーの IP アドレスを指すドメイン名（DNS 経由）
- `git`、`docker`、`docker-compose` がインストール済みであること
- サーバーへの SSH アクセス

---

## サーバーの準備（折りたたみ部分）

<details>
  <summary>クリックして展開</summary>

Zcash 対応の BTCPay Server をデプロイするには、以下が必要です。

### 1. Ubuntu 22.04 以降の VPS

**Ubuntu Server 22.04 LTS** の最小構成インストールを推奨します。  
専用 IP アドレスを提供する VPS 事業者であれば、どこでも利用できます。  

**最小要件**:  
- CPU 2 コア  
- RAM 4 GB  
- ディスク容量 40 GB  

この構成は、Zcash に `lightwalletd` を使う場合に十分です。  
**full Zcash node** を動かす予定なら、**少なくとも 300 GB** の空きディスク容量が必要です。

---

### 2. サーバーを指すドメイン名

DNS プロバイダのダッシュボードで、サブドメイン用の `A` レコードを作成し、  
（例: `btcpay.example.com`）それを VPS の IP アドレスに向けてください。  

このドメインは、ブラウザから BTCPay Server にアクセスするため、  
また Let's Encrypt による**無料 SSL 証明書**を自動生成するために使用されます。

---

### 3. サーバーへの SSH アクセス

BTCPay Server をインストールするには、SSH 経由で VPS に接続する必要があります。  
ターミナルから次を実行してください。

`ssh root@YOUR_SERVER_IP`

macOS、Linux、Windows の WSL を使っている場合、SSH はすでにターミナルで利用できます。
通常の Windows のみを使っている場合は、**PuTTY** のような SSH クライアントを使用してください。

---

### 4. Git、Docker、Docker Compose をインストールする

SSH で接続したら、システムパッケージを更新し、必要なコンポーネントをインストールします。

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Ubuntu 22.04 以降では、APT の `docker-compose` は非推奨です。
> 推奨パッケージは `docker-compose-plugin` で、`docker compose` コマンド（ダッシュではなくスペース）を提供します。

これで、サーバー環境は BTCPay Server のインストール準備が整いました。

</details>

---

### ステップ 1: リポジトリをクローンする

作業ディレクトリを作成し、BTCPay Server の Docker デプロイ環境をダウンロードします。

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### ステップ 2: 環境変数をエクスポートする

`btcpay.example.com` を実際のドメインに置き換えてください。

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> 後で Monero や Litecoin を追加する予定がある場合は、今ここで含めることもできます。

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

適切な変数をエクスポートしてセットアップスクリプトを再実行すれば、いつでも新しいコインを追加できます。

`. ./btcpay-setup.sh -i`

このガイドでは、**Zcash のみ**に焦点を当てます。

---

### ステップ 3: インストーラーを実行する

セットアップスクリプトを実行して、サーバーをビルドし起動します。

`. ./btcpay-setup.sh -i`

このスクリプトは、依存関係のインストール、`docker-compose.yml` の生成、サービス起動、`systemd` の設定を行います。
所要時間は約 5 分です。

完了すると、BTCPay Server インスタンスは以下で利用可能になります。

`https://btcpay.example.com`

> 既存インストールを変更している場合（たとえば ZEC を追加する場合）は、新しい設定でサーバーを停止・再起動してください。

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

その後、次のセクションに進んで BTCPay Server の Web インターフェースで Zcash を設定してください。



## 自分で Zcash Full Node を動かす

公開 `lightwalletd` ノードに**依存したくない**場合は、自分自身の full Zcash node と Lightwalletd を同じサーバー上にデプロイできます。  
これにより、**完全な自律性**が得られます。外部依存も、信頼前提も不要です。

---

### ステップ 1: 十分なディスク容量を確保する

full Zcash node（Zebra + Lightwalletd）には、現在 **300 GB 以上**のディスク容量が必要で、今後も増え続けます。

内訳:

- Zebra のブロックチェーンデータベース: 約 260〜270 GB
- Lightwalletd のインデックス: 約 15〜20 GB

#### 推奨ストレージ:

- サーバーを **Zcash 決済専用**で使うなら **400 GB 以上**
- BTCPay Server、PostgreSQL、Nginx なども同時に動かすなら **800 GB 以上**

> 理想的には、**1 TB 容量**の SSD/NVMe ディスクを使ってください。特にデータを定期的に prune する予定がない場合は重要です。

---

### ステップ 2: 環境変数を設定する

full node 構成を有効にするために、以下を環境設定へ追加してください。

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

これにより `zcash-fullnode` フラグメントが組み込まれ、BTCPay Server 内で `zebrad` と `lightwalletd` の両方が起動します。

---

### ステップ 3: インストーラーを再実行する

`. ./btcpay-setup.sh -i`

このスクリプトは次を行います。

* Zebra と Lightwalletd の Docker イメージをダウンロードする
* BTCPay スタック内にサービスをセットアップする
* Zcash プラグインを**ローカルの** `lightwalletd` インスタンスに接続する

> **ブロックチェーン全体の同期には数日かかることがあります**。特に低リソースの VPS では顕著です。
> 同期が完了するまでは、シールド決済は利用できません。


## 外部の Lightwalletd ノードに接続する

多くの場合、完全な自律性は必須ではなく、事業者は full Zcash node の運用に時間やディスク容量を割きたくないかもしれません。  
デフォルトでは、BTCPay Server は公開 `lightwalletd` ノードに接続し、ブロックチェーン全体をダウンロードせずにシールド決済を処理します。

デフォルトのエンドポイントは次です。

`https://zec.rocks:443`

ただし、BTCPay Server を**任意の外部 `lightwalletd` ノード**に接続するよう設定することもできます。たとえば:

`https://lightwalletd.example:443`

このセクションでは、**カスタム Docker フラグメント**を使ってそれを行う方法を示します。

> すべての環境変数を含む完全な設定例は、[プラグインリポジトリ](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)にあります。  
> 以下の手順では、最小限で動作する構成を示します。

---

### ステップ 1: カスタム Docker フラグメントを作成する

BTCPayServer のプロジェクトディレクトリで、カスタムフラグメントファイルを作成します。

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

以下の内容を追加してください。

```
exclusive:
- zcash
```

`exclusive` ディレクティブにより、同じラベル（この場合は `zcash`）を持つフラグメントは一度に 1 つしか有効にできません。
これにより設定の競合を防げます。たとえば `zcash-fullnode` フラグメントと、このカスタム外部 `lightwalletd` フラグメントを同時に動かすことはできません。
`exclusive: zcash` と指定することで、BTCPay Server はデフォルトの `zcash-fullnode` および内部 `lightwalletd` コンテナを自動的に無効化し、代わりに自分の外部ノードへ接続できるようになります。

---

### ステップ 2: 環境変数を設定する

ターミナルで次を実行します。

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### ステップ 3: 外部ノードのアドレスを定義する

`.env` ファイルを開きます。

`nano .env`

以下の行を追加し、URL を選択したエンドポイントに置き換えてください。

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

使用できるもの:

* `https://lightwalletd.zcash-infra.com` のような**公開ノード**
* BTCPay Server とは別にデプロイした、自分自身のセルフホストノード

> 外部 `lightwalletd` が停止したり過負荷になったりすると、シールド決済は失敗します。
> 重要なサービスでは、**安定して実績のあるエンドポイント**（デフォルトの `zec.rocks` など）を選んでください。

> `lightwalletd` をセルフホストしたいですか？
> [Zebra リポジトリ](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)の `docker-compose.lwd.yml` を使えます。
> **警告:** この構成は公式には文書化されておらず、TLS 設定、ポートフォワーディング、ファイアウォール設定を手動で行う必要があります。上級ユーザーのみに推奨されます。

---

### ステップ 4: インストーラーを再実行する

`. ./btcpay-setup.sh -i`

BTCPay Server はカスタム設定を適用し、指定した `lightwalletd` ノードに接続します。

以後、Zcash プラグインはその外部エンドポイントを使ってシールド取引を処理します。


## Cloudflare Tunnel を使って自宅で BTCPay Server をホスティングする

Raspberry Pi 5 やその他のローカルサーバーなど、**固定 IP を持たない**自宅のデバイスで BTCPay Server をホストしながら Zcash 決済を受けたいですか？  
**Cloudflare Tunnel** を使えば、インスタンスを安全にインターネットへ公開できます。

この方法ではポートフォワーディングが不要で、実際の IP アドレスを公開から隠したまま、HTTPS 経由でサーバーにアクセス可能にできます。

また、VPS を借りるコストも**回避できる**ため、暗号資産決済が事業の中核ではなくオプション機能である場合に理想的です。

---

### ステップ 1: Cloudflare Tunnel をインストールする

1. [cloudflare.com](https://www.cloudflare.com) でアカウントを作成し、ドメインを追加します。
2. **自宅サーバー**に Cloudflare Tunnel をインストールします。

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Cloudflare で認証します。

`cloudflared tunnel login`

このコマンドを実行するとブラウザウィンドウが開きます。ログインして、あなたのドメインへのアクセスを承認してください。
Cloudflare はサーバー上にトークン付きの `credentials` ファイルを自動作成します。

4. 新しいトンネルを作成します（名前は `btcpay` でも、それ以外でも構いません）。

`cloudflared tunnel create btcpay`

これにより、トンネル ID と認証情報を含む `btcpay.json` ファイルが生成されます。次のステップで必要になります。

---

### ステップ 2: トンネル設定ファイルを作成する

設定ディレクトリ（存在しない場合）を作成し、設定ファイルを開きます。

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

以下の設定を貼り付けてください。

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### 説明:

* `tunnel` - 先ほど作成したトンネル名
* `credentials-file` - `cloudflared tunnel login` 実行時に生成されたトークンファイルへのパス
* `hostname` - Cloudflare に登録したあなたのドメイン（例: `btcpay.example.com`）
* `service` - BTCPay Server のローカルアドレス（通常は Nginx 用の `http://127.0.0.1:80`）

> Cloudflare は、自宅の IP を公開することなく、安全にトラフィックをローカルサーバーへプロキシします。


### ステップ 3: トンネル用の DNS レコードを追加する

トンネル作成後、通常 Cloudflare はあなたのドメインに対して**CNAME DNS レコードを自動追加**します。次のような形になります。

`btcpay.example.com -> <UUID>.cfargotunnel.com`

自動で表示されない場合は、手動で追加してください。

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にアクセスする
2. **DNS** セクションへ移動する
3. 新しい CNAME レコードを追加する:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     正確な値は `btcpay.json` ファイル内、または次を実行して確認できます。
     
     `cloudflared tunnel list`
     
   - **Proxy status**: 有効（オレンジ色の雲）

> このレコードにより、`btcpay.example.com` へのすべてのリクエストは Cloudflare Tunnel 経由でルーティングされ、実際の IP アドレスは公開から隠されます。

---

### ステップ 4: システム起動時にトンネルを有効化する

起動時にトンネルを自動実行するには、システムサービスとしてインストールします。

`sudo cloudflared service install`

次に、サービスを有効化して起動します。

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

状態を確認します。

`sudo systemctl status cloudflared`

`Active: active (running)` のようなメッセージと、`btcpay.example.com` がオンラインである確認が表示されるはずです。

> 以後、再起動のたびにトンネルは自動的に開始され、あなたの BTCPay Server は公開アクセス可能になります。ポートフォワーディングも、実 IP の公開も不要です。

---

### ステップ 5: BTCPay Server のセットアップを仕上げる

これから初めて BTCPay Server をインストールする場合は、セットアップスクリプトを実行する前にドメインを設定してください。

`export BTCPAY_HOST="btcpay.example.com"`

これにより、**Nginx 設定**と**SSL 証明書**の生成時に正しいドメインが使われます。

すでに BTCPay Server がインストール済みで、トンネルを追加するだけの場合は次を実行します。

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

セットアップにより設定が再生成され、新しいドメインが適用されます。
これで以下からサーバーにアクセスできるようになるはずです。

`https://btcpay.example.com`

> 公開 `lightwalletd` を使う場合でも、自分の full node を使う場合でも、これはトンネルには影響しません。
> 重要なのは、BTCPay Server がローカルで `127.0.0.1:80` を listen していることだけです。


## BTCPay Server の Web インターフェースで Zcash プラグインを設定する

> **複数ストア構成で重要:**  
> ここで設定する Zcash ウォレットは、インスタンス全体で**グローバル**です。別々の BTCPay インスタンスを動かさない限り、すべてのストアがこのウォレットを使用します。

BTCPay Server インスタンスのデプロイに成功したら、管理用 Web インターフェースからいくつか基本設定を行う必要があります。  
公式ドキュメントには英語で完全な手順がありますが、ここでは主要なステップに絞って、特に Zcash プラグインの設定に焦点を当てます。

---

### ステップ 1: Web インターフェースにログインする

次の URL でインスタンスにアクセスします。

`[https://btcpay.example.com](https://btcpay.example.com)`

- 管理者ログインとパスワードを入力します。
- 初回ログイン時は、アカウント作成を求められます。
- 最初に登録したアカウントには、自動的に管理者権限が付与されます。

---

### ステップ 2: Zcash プラグインをインストールする

1. メインメニューで次へ進みます。

`Plugins -> Browse Plugins`

2. **Zcash (ZEC)** プラグインを探します。必要に応じて検索バーを使ってください。
3. **Install** をクリックして確認します。

> サーバー設定時に有効化した他の altcoin についても、この手順を繰り返してください。

インストール後、**Restart Server** をクリックして、プラグインを有効化した状態でインターフェースを再読み込みします。


### ステップ 3: Viewing Key でウォレットを接続する

プラグインをインストールすると、設定メニューに新しく **Zcash** セクションが表示されます。

1. 次へ進みます。

`Zcash -> Settings`

2. **Unified Full Viewing Key (UFVK)** を貼り付けます。BTCPay は各請求書用に Unified Address を導出し、入ってくるシールド決済を検出します。

> **注:** 従来の Sapling Viewing Key もサポートされていますが、Orchard/Unified Address を使うには **UFVK** を指定してください。


   形式の例:

`uview184syv9wftwngkay8d...`

3. Block height フィールドに値を入力します

* **新しいウォレット（新しいシードフレーズ）での初回セットアップ:** 現在の Zcash ブロック高を入力します（3xpl.com/zcash で確認できます）。これにより初期スキャンが高速化されます。
* **同じサーバー上で、従来の Sapling 専用構成から Unified Addresses / Orchard へ移行する場合:** このフィールドは空のままにしてください。
* **同じウォレット/UFVK を使ってストアを新しいサーバーへ移動する場合:** 必要に応じて birth height（ストアの最初の有料注文のおおよそのブロック高）を入力します。3xpl 上で注文日と照合してスキャン範囲を絞れます。わからない場合は空のままで構いません。

> まだすべてのウォレットが **Unified Full Viewing Key (UFVK)** のエクスポートをサポートしているわけではありません。  
> 推奨オプション:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> どちらのアプリでも、バックアップ/エクスポートのセクションで UFVK エクスポートを探してください。

これらのキーは**自動アドレスローテーション**をサポートしており、つまり:
- すべての顧客が**一意の**支払いアドレスを受け取る
- あなたは**単一で統合された**残高を確認できる

より広い互換性リストは [ZecHub -> Wallets](https://zechub.wiki/wallets) で確認できます。

すべての項目を入力したら、**Save** をクリックしてください。

---

### ZEC 支払いフローをテストする

おめでとうございます。これで Zcash ウォレットが BTCPay Server に接続されました。

テストしてみましょう。

1. 次へ進みます。

`Invoices -> Create New`

2. 少額の ZEC でテスト用請求書を生成します。
3. **別のウォレット**（BTCPay に接続したものではないウォレット）から資金を送ります。
4. 取引が検出されると、請求書ページに視覚的な祝福エフェクトが表示されます。
5. 請求書ステータスが **Paid** に変わることを確認します。

すべて動作すれば、API または CMS プラグインを使って、あなたの Web サイトに ZEC 決済を統合する準備は完了です。



## BTCPay Server を自分の Web サイトに統合する

Zcash ウォレットを BTCPay Server に接続したら、決済システムをあなたの Web サイトに統合できます。  
方法はいくつかあり、直接 API を使う方法から、人気 CMS 向けのすぐ使えるプラグインまであります。

---

### 統合オプション

- **API 統合**  
  独自開発の Web サイトや CMS を使わないシステムに最適です。  
  請求書作成、支払い追跡、通知を、自分自身のインターフェースとロジックの中で完全にコントロールできます。  
  基本的なプログラミング知識が必要なため、この作業は開発者に任せるのが最適です。

- **CMS プラグイン**  
  **WooCommerce**、**PrestaShop** などのプラットフォーム向けに提供されています。  
  これらのプラグインを使えば、コードを書かずに数分で支払いを受け付けられます。

- **支払いボタンまたは Iframe**  
  最もシンプルな方法です。  
  ランディングページ、個人サイト、または寄付リンクやチェックアウトウィジェットを埋め込みたいだけのサイトに最適です。

---

### API 統合

カスタムプラットフォームを使っている場合（または CMS をまったく使っていない場合）、最適なのは API です。  
完全な柔軟性が得られます。請求書を作成し、その状態を追跡し、通知を受け取り、ユーザー体験を完全にコントロールできます。

> 注: CMS プラグインの中にも内部的には API を使っているものがあるため、統合方法に関係なく、API キーの作成が**最初に必要なステップ**であることがよくあります。

次のステップは、ストア用の API キーを生成し、[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) を使って統合を構築し始めることです。


### API キーを生成する

BTCPay Server をあなたの Web サイトやアプリに統合するには、API キーを生成する必要があります。

1. BTCPay Server にログインし、**ユーザーメニュー**（右上）を開きます
2. **API Keys** へ進みます
3. **Create a new API key** をクリックします
4. キーに名前を付けます
5. **Permissions** セクションで、以下を有効にします:
   - `Can create invoice`
   - `Can view invoice`
   - *(任意)* `Can modify store settings` - ストアレベルの管理が必要な場合のみ

6. **Generate** をクリックします。個人用 API キーが表示されるので、コピーして安全に保管してください。

> このキーにより、あなたのストアの請求書へアクセスできます。  
> 公開したり、クライアントサイドのコードに埋め込んだりしないでください。

---

### 例: API 経由で請求書を作成する

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Request body:**

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

**Response:**

以下を含む JSON オブジェクトが返されます。

* `invoiceId`
* あなたの Web サイトに埋め込んだり、顧客に送ったりできる支払い URL

完全なドキュメントはこちら:
[Greenfield API – 請求書の作成](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Webhook を設定する（任意）

請求書ステータスが変化したとき（たとえば支払いを受け取ったとき）にリアルタイム通知を受け取るには:

1. ストア設定 -> **Webhooks** へ進みます
2. BTCPay Server からの `POST` リクエストを処理するバックエンドエンドポイントの URL を追加します
3. 請求書が支払われたとき、または期限切れになったときに、BTCPay が自動的に通知を送信します

Webhook の payload と再試行ロジックは、[公式 webhook ドキュメント](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-)に説明されています。

> 各種プログラミング言語向けの統合例は、BTCPay のドキュメントおよび GitHub リポジトリで利用できます。



### CMS 統合

BTCPay Server は、人気のあるコンテンツ管理システム（CMS）向けのプラグインをサポートしています。  
最も成熟して広く使われているのは **WordPress + WooCommerce** との統合で、**コードを書かずに** ZEC 決済を受け入れやすくなっています。

---

#### WooCommerce (WordPress)

BTCPay Server は WooCommerce 用のプラグインを公式サポートしています。

統合手順:

1. WordPress のプラグインディレクトリまたは GitHub から **BTCPay for WooCommerce** プラグインをインストールします。
2. WordPress 管理画面で次へ進みます。

`WooCommerce -> Settings -> Payments`

3. 一覧から **BTCPay** を見つけて **Set up** をクリックします
4. BTCPay Server の URL を入力し、認証手順に従います  
   （API キーの自動生成を推奨します）
5. 支払い方法を有効化し、設定を保存します

> 詳細な手順、動画チュートリアル、トラブルシューティングガイドは、プラグインのドキュメントで確認できます。

BTCPay ドキュメントの同じセクションには、他の CMS 統合オプションも掲載されています。

---

### 支払いボタンまたは Iframe (CMS や API は不要)

CMS を使っておらず、API も扱いたくない場合、ZEC 決済を受け付ける最も簡単な方法は、**支払いリンクまたはウィジェットを直接 Web サイトに埋め込むこと**です。

この方法は、以下に最適です。

- ランディングページ
- ポートフォリオサイト
- ブログや静的ページ
- バックエンドサーバーのないプロジェクト

---

#### オプション 1: 支払いボタン（リンク）

1. BTCPay Server の **Invoices** セクションで請求書を手動作成します
2. 支払いリンクをコピーします。例:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. そのリンクを HTML に追加します。

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### オプション 2: 埋め込み請求書（Iframe）

サイト上に請求書を直接表示するには、iframe を使います。

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> ボタンや iframe コンテナは、サイトのデザインに合わせてスタイリングできます。BTCPay Server では請求書ページの柔軟なテーマ設定が可能です。

## 結論

このガイドは長くなりましたが、BTCPay Server に Zcash 決済を統合するうえでの基礎的な部分だけを扱っています。

BTCPay Server のインターフェースは、ここで紹介したよりもはるかに多くの機能を提供します。幸い、UI は複数言語（ロシア語を含む）に対応しているため、さらに探索して試していくのは簡単です。

BTCPay は非常に柔軟なツールです。たとえば次のことができます。

* 単一インスタンス上で複数の独立ストアをホストする
* 注文閲覧のみからフル管理者まで、チームメンバー向けにカスタムの役割と権限を定義する
* 独自ドメインやブランディングを使用する
* Webhook、フォールバックウォレット、さらには Tor アクセスまで設定する
* 税ルール、割引コード、チェックアウトページのカスタマイズ、支払い方法制限などの高度な設定を行う

BTCPay は、中央集権型の決済プロバイダに代わるオープンソースの選択肢として作られました。仲介者なしでプライベートな ZEC 決済を受け入れたいなら、このプラットフォームは間違いなく注目に値します。

BTCPay エコシステムを探求し、支払いを本当にあなた自身のものにしていく成功を願っています。

## 参考資料

* [BTCPay Server 公式サイト](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub リポジトリ](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet デモ](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [BTCPay 向け Zcash プラグイン (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash プラグイン インストールガイド](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [カスタム zcash-lightwalletd.custom.yml の例](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Compose ファイル (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API キー ドキュメント (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Cloudflare Tunnel を作成する](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash ウォレット互換性一覧 (ZecHub)](https://zechub.wiki/wallets)
* [Raspberry Pi 5 上の Zebra + Lightwalletd (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
