<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash マイニングガイド：個人用ハードウェアでマイニングプールに参加する

> GPUまたはASICをプール（pool）に接続し、ほかのマイナー（miner）と作業を分担することで、ソロでブロックを見つけるまで何年も待つ代わりに、安定したZECの支払いを受け取れます。

## TL;DR

* ZcashはEquihashのプルーフ・オブ・ワーク（Proof of Work）を採用しています。ネットワークはASICが大部分を占めているため、GPUは主に趣味やテスト向けです。
* 小規模な構成でソロマイニング（Solo mining）を行っても、ブロック（Block）を見つけられることはほとんどありません。プール（Pool）は参加者のハッシュレートをまとめ、ブロックを見つけるたびにその報酬の一部をあなたに支払います。
* 必要なものは3つです。報酬を受け取るためのZcashウォレット（Wallet）のアドレス（Address）、マイニングハードウェア、そしてマイニングソフトウェア（またはASIC内蔵のダッシュボード（Dashboard））です。
* プールごとに、手数料（Fee、約0-2%）、支払い方式（PPLNS、PPS+）、最低支払額、サーバーの所在地が異なります。
* まず収益性を確認してください。マイニングで利益が出るかどうかは、電気料金、ハードウェアの費用、そしてZECの価格で決まります。
* 上級者向けの方法：自分でZebraノード（Node）を運用し、その`getblocktemplate` RPCを使ってマイニングします。

## 基本的な説明

マイニング（Mining）は、新しいZcashブロック（Block）が作られる仕組みです。マイナー（Miner）はEquihashパズルを解く競争を行い、最初に有効な解を見つけたマイナーが次のブロックを追加して、ブロック報酬を獲得します。提供するハッシュレートが多いほど勝つ頻度は高くなりますが、現在のネットワークでは、家庭用のリグ1台だけで勝つことはほとんどありません。

マイニングプール（Mining pool）は、この問題を解決します。プールは各マイナーに、シェア（Share）と呼ばれる小さな作業単位を割り当てます。受理されたシェアの1つ1つが、あなたがハッシュレート（Hashrate）を提供したことを示しています。プール内の誰かがブロックを見つけると、報酬はシェアに応じて分配されます。残高がプールの最低支払額を超えると、自動的に支払いを受け取れます。

セットアップは5つのパートで構成されており、以下でステップごとに説明します。

1. 報酬を受け取るためのウォレットアドレス。
2. ハードウェア：PCに搭載したGPU、またはEquihash ASIC。
3. プール（Pool）アカウント（登録不要のプールの場合はアドレスのみ）。
4. プールのストラタムサーバーに接続するよう設定し、ユーザー名に`YOUR_ADDRESS.WORKER_NAME`を指定したマイニング（Mining）ソフトウェア。
5. 監視：承認されたシェア、ハッシュレート、温度、未払い残高。

## はじめに

Zcash（ZEC）は、マイニングにEquihashプルーフ・オブ・ワーク（proof-of-work）アルゴリズムを使用する、プライバシー重視の暗号資産です。Zcashのマイニングでは、計算能力を使って複雑な数学的問題を解き、トランザクションを検証し、ネットワークを保護することで、ZECの報酬を得ます。ネットワークの難易度が高いため、ほとんどのユーザーにはソロマイニングは推奨されません。ほかの参加者とハッシュパワーを組み合わせるマイニングプールへの参加は、安定した報酬を得る最良の方法です。

このガイドでは、個人用ハードウェア（例：GPU搭載の家庭用PCやエントリーレベルのASIC）を使ったZcashのマイニングに焦点を当てます。GPUでもZcashをマイニングできますが、ネットワーク難易度のため、2026年にはASICの方がはるかに効率的で収益性が高いことに注意してください。電気料金、ハードウェア価格、ZECの価値といった要因が実行可能性に影響するため、WhatToMine.comなどのツールで常に現在の収益性を確認してください。マイニングはすべての人にとって収益的とは限りません。地域の規制とエネルギー料金を調べてください（目安は$0.08/kWh未満です）。


## 要件

### ハードウェア
- **GPUマイニング（初心者に推奨される個人向けセットアップ）：**
  - 少なくとも4GBのVRAMを備えたNVIDIAまたはAMD GPU（例：NVIDIA GTX 1070、RTX 3060、AMD RX 580以上）。
  - 互換性のあるマザーボード、十分なPSU（複数GPUの場合は少なくとも750W）、過熱を防ぐ優れた冷却。
  - より高いハッシュレートのため、複数GPUのリグが一般的です（例：GPU 6枚で1-2 kSol/sを達成できます）。
- **ASICマイニング（より効率的ですが高コスト）：**
  - Bitmain Antminer Z15（420 kSol/s）やInnosilicon A9（50 kSol/s）など、Equihash対応ASIC。
  - これらは騒音と発熱が大きく、より多くの電力を消費します（例：1500W以上）。専用スペースに適しています。Bitmain.comや再販業者（Blockware Mining）など、信頼できる販売元から購入してください。
- **一般：** 安定したインターネット接続、セットアップおよび監視用のコンピューター。ASICがネットワークを支配しており（2026年の合計ハッシュレートは約13 GSol/s）、GPUマイニングの競争力は低下していますが、趣味としては依然可能です。

### ソフトウェア
- **オペレーティングシステム：** Windows 10/11、Linux（安定性のためUbuntuを推奨します）。
- **マイニングソフトウェア：**
  - GPU向け：lolMiner（AMD/NVIDIA対応）、GMiner、またはminiZ（NVIDIA向け）。公式のGitHubリポジトリからダウンロードしてください（例：github.com/Lolliedieb/lolMiner-releases）。
  - ASIC向け：メーカー内蔵のファームウェア／ダッシュボードを使用します（例：Bitmainのウェブインターフェース）。
- **ウォレット（Wallet）：** 支払いを受け取るためのZcashウォレット。推奨：
  - シールドされた（shielded）（プライベート）：ZODL Wallet、Zingo（モバイル／デスクトップ）、Zkool（モバイル／デスクトップ）。
  - 公開型（transparent）（簡単ですがプライバシーは低い）：Edge Wallet、Zecwallet Lite。
  - [wallets](https://zechub.wiki/wallets)からダウンロードしてください。プールが対応している場合、プライバシーのためにシールドされたアドレス（「zs」で始まります）を生成してください。

### その他
- 電気料金：コストを計算してください。GPUはカード1枚あたり150-300W、ASICは1000W以上を使用します。
- アンチウイルス：マイナーを脅威として検出する場合があるため、セットアップ中は無効にしてください。

## マイニングプールに参加するためのステップバイステップガイド

### ステップ1：Zcashウォレットをセットアップする
1. 公式Zcashウェブサイト[wallets](https://zechub.wiki/wallets)からウォレットをダウンロードしてインストールします。
2. 新しいウォレットを作成し、シードフレーズ（seed phrase）を安全にバックアップします。
3. 受取アドレス（プライバシーのため、できればシールドされたもの）を生成します。例：`zs1exampleaddress...`。記録しておいてください。
4. 公開型アドレス（「t」で始まります）を使用する場合は簡単ですが、プライバシーは低くなります。

### ステップ2：ハードウェアを準備する
- GPUの場合：
  1. PCにGPUを取り付け、ドライバーを更新します（NVIDIA：GeForce Experience、AMD：Radeon Software）。
  2. 経験があればオーバークロックします（安定性のためMSI Afterburnerを使用し、効率の目安としてコアクロック+100-200、メモリ-500を設定します）。
- ASICの場合：
  1. ASICを電源とEthernetに接続します。
  2. Advanced IP Scannerなどのツール、またはメーカーのアプリでIPアドレスを見つけます。
  3. ウェブダッシュボードにアクセスします（例：ブラウザーにIPを入力します。Bitmainのデフォルトログインはroot/rootです）。

**警告：** 適切な換気を確保してください。マイニングは熱を発生させます。まずは小規模に始めてテストしてください。

### ステップ3：マイニングプールを選択して参加する
マイニングプールは作業を分配し、貢献したハッシュレートに基づいて報酬を共有します。手数料（0-2%）、最低支払額（0.01-0.1 ZEC）、所在地（低ping）、信頼性に基づいて選択してください。

**推奨プール（ハッシュレート、手数料、レビューに基づく）：**
- **2Miners (zec.2miners.com)**：手数料1%、PPLNS支払い、GPU/ASIC/NiceHashに対応。高いハッシュレート（約1.17 GSol/s）と信頼性の高いサーバー。
- **F2Pool (zec.f2pool.com)**：手数料2%、PPS+支払い、複数コインに対応。大規模なプール（約2.57 GSol/s）。
- **ViaBTC (zec.viabtc.com)**：手数料2%（PPS+）、使いやすいダッシュボード、グローバルサーバー。
- **AntPool (zec.antpool.com)**：Bitmainによる手数料1%のプールで、ASICに適しています（約494 MSol/s）。
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**：Foundry DigitalによるプロフェッショナルなZcashマイニングプールです。PPLNS支払いを使用し、公開型の報酬追跡とエンタープライズグレードのサポートを提供します。機関投資家および大規模ASICマイナーに最適で、アカウント認証が必要です。
- **Sovright (mining.sovright.com)**：Stratum V2上に構築されたZcashプールで、現在はパブリックテストネットとして稼働しています。まだ実際のZEC支払いはないため、収益源ではなくセットアップのテスト手段として扱ってください。詳細は以下の専用セクションを参照してください。
- その他：Kryptex Pool、Luxor（リアルタイム統計はpoolwatch.io/coin/zcashで確認してください）。

1. プールのウェブサイトにアクセスし、アカウントを作成します（一部の2Minersのように登録不要のプールもあります）。
2. 支払い用に設定でZcashウォレットアドレスを追加します。
3. プールのStratumサーバー（例：zec.2miners.com:1010）とポートを記録します。

### ステップ4：マイニングソフトウェアをインストールして設定する
- GPUの場合（例：Windows/Linux上のlolMiner）：
  1. GitHubからlolMinerをダウンロードします（最新版、例：1.88）。
  2. フォルダーに展開します。
  3. 次の設定でバッチファイル（start.bat）を作成します：
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS`をあなたのZECアドレスに置き換えます。
     - `WORKER_NAME`：リグの名前です（例：Rig1）。
     - EUサーバーの場合：eu.zec.2miners.com:1010。
  4. バッチファイルを実行します。プールに接続してマイニングを開始します。
- ASICの場合（例：Bitmain Antminer）：
  1. ウェブダッシュボードにログインします。
  2. Miner Configurationに進みます。
  3. プールの詳細を追加します：
     - URL：stratum+tcp://zec.2miners.com:1010
     - ユーザー名：YOUR_WALLET_ADDRESS.WORKER_NAME
     - パスワード：x（または空欄）。
  4. 保存してマイナーを再起動します。
- その他のソフトウェアの場合（例：GMiner）：
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**テスト：** 10-15分間実行し、コンソールで承認済みシェアとハッシュレートを確認してください。

### ステップ5：マイニングを開始して監視する
1. マイナーを起動します。プールに接続してシェアの送信を開始します。
2. 次の方法で監視します：
   - プールダッシュボード：ウォレットアドレスを入力し、ハッシュレート、未払い残高、統計を確認します。
   - ソフトウェアコンソール：エラーと温度を監視します（80度C未満に保ってください）。
   - ツール（tools）：リモートリグ管理にはHiveOSまたはSimpleMining OSを使用します。
3. 支払い：ほとんどのプールは最低額（例：0.05 ZEC）に達すると自動的に支払います。プールのルールを確認してください。

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


### Foundry Zcash プールの監視

Foundry Zcash プール（Pool）のユーザー向け：

- Foundryプールのダッシュボードでマイナーのパフォーマンスを監視します。
- 以下を確認します：
  - アクティブなワーカー
  - 報告されたハッシュレート
  - 承認されたシェア
  - 推定報酬
  - 支払いステータス

FoundryはPPLNS報酬モデルを採用しているため、マイニング（Mining）報酬は瞬間的なハッシュレートだけではなく、プール（Pool）の報酬ウィンドウ期間中に提出したシェアによって決まります。

推奨される監視方法：
- ASICのダッシュボード（Dashboard）に表示されるハッシュレートと、Foundryが報告するハッシュレートを比較してください。
- リジェクトされたシェア、ステイルシェア、または接続の不安定さについて調査してください。
- ダウンタイムが発生すると提出されるシェアと得られる可能性のある報酬が減るため、安定したネットワーク接続を維持してください。

## Sovright：テストネットプールとリレーネットワーク

Sovright（sovright.com）は、Stratum V2マイニングプールと、別個のブロックリレーネットワークを運用しています。これらは異なる役割を担うため、以下で個別に扱います。

### マイニングプール（mining.sovright.com）

Sovrightのプールは、メインネットではなく、パブリックZcashテストネット（NU6、Stratum V2）上で稼働しています。テストネットでは実際のZECは支払われません。収益を得るためではなく、マイナー設定のテストに使用してください。

- 開始にアカウントは必要ありません。CPUまたはASICのEquihashマイナーをプールに接続すると、ライブダッシュボードにシェアが表示されます。
- Sovrightは、単にプールのジョブを受け取るのではなく独自のブロックテンプレートを選びたいマイナー向けに、オープンソースのStratum V2プロキシも公開しています：

  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  マイナー（Miner）をプール（Pool）に直接接続するのではなく、プロキシに向けて設定します：
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  ワーカー名には `yourname.rig1` のような名前を使用します。
- Sovright の透明性ページでは、シールドされた（Shielded）トランザクション（Transaction）について「すべて含める」ポリシーが明記されています。これは、シールドされたトランザクションを除外する一部のプールとは異なる点です。各ブロック（Block）には署名付きの証明書が付与されるため、このポリシーを独自に検証できます。
- サンプルのダッシュボード（Dashboard）データではなく自分のワーカーを追跡するには、mining.sovright.com でアカウントを作成してください（Google またはメールアドレスでサインインできます）。

### リレーネットワーク（relay.sovright.com）

Sovrightは、Zcashメインネット上でパブリックブロックリレーネットワークを別途運用しています。プールがブロックを見つけた場合、そのブロックがネットワークの残りに到達する速さによって、孤立する頻度、つまり伝播競争に敗れて報酬を失う頻度が決まります。このリレーは、前方誤り訂正を伴うコンパクトブロックリレーを使用して、4地域にブロックを転送します。

パブリックダッシュボードではその効果をライブで確認できます。リレー接続済みの地域では、通常のピアツーピア・ゴシップにかかる時間の半分未満で新しいブロックを確認でき、ダッシュボードではネットワークのライブ孤立率も追跡されます。

これは個人マイナー向けではなく、プール運営者向けのインフラです。Sovrightのオープンソース`mining-infra`リポジトリには、ネイティブP2Pよりも速く発見済みブロックをメッシュへ広げるための`submitblock`リレーゲートウェイが記載されています。接続するには、リレーピアアドレスと認証キーについてSovright（support@sovright.com）に直接お問い合わせください。


## 自分のZebraノードに対するマイニング

上記ではすべて、ほかの誰かのプールにマイナーを接続しています。別の方法は、自分でノードを実行し、マイニングソフトウェアから作業を要求させることです。zcashdは2026年7月18日に停止したため、これは[Zebra](/zcash-tech/zebra-full-node)、つまりこのセクションで扱うノードを意味します。

Zebraの役割は小さく具体的です。ブロックテンプレートを構築し、RPCインターフェース経由で解決済みブロックを受け入れます。ハッシュ計算はマイニングソフトウェアが行い、複数マイナー間で報酬を共有するのはプールソフトウェアの役目です。ソロマイニングでブロックを見つけられるかどうかは、ネットワーク全体のハッシュレートに占めるあなたの割合に依存しますが、このセクションではそれを推定しません。そのため、このページの導入ではほとんどのユーザーにソロマイニングを推奨していません。

手順は、2026年10月8日時点の2つのZebra Bookページ、[Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html)および[Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)に従います。キー名とデフォルト値はリリース間で変更されるため、使用する前にBookを確認してください。

### 報酬を受け取るアドレスを設定する

デフォルト設定で設定ファイルを作成し、編集します：

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

マイナーアドレスが必要です（[Book：Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)）：

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebraは、公開型P2PKHまたはP2SHアドレス、Saplingアドレス、または統合アドレスを受け入れます。複数の受信者を持つ統合アドレスについて、Bookでは、Zebraは「Orchard、次にSapling、次に公開型を優先して」単一の受信者に支払うと説明されています。

2つのオプションキーは、同じ`[mining]`セクションに記述します：

| キー | 機能 | 制限 |
|---|---|---|
| `extra_coinbase_data` | マイニングする各ブロックのコインベース入力に、Zebra独自のマーカーの後で、プール名などの公開タグを追加します（[Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)） | 86バイト。これを超えると「Zebraは起動を拒否します」 |
| `miner_memo` | 報酬出力にシールドされたメモ（memo）を添付します。`extra_coinbase_data`と異なり公開されず、受取アドレスのビューイングキー（viewing key）を持つ人だけが読めます（[Book](https://zebra.zfnd.org/user/mining.html#miner-memo)） | 512バイト。報酬がシールドされた受信者に送られる場合にのみ機能します。公開型アドレスでは「何も起こらずに効果がありません」 |

### RPCポートを開く

マイニングソフトウェアはJSON-RPC経由でZebraと通信します。リッスンするアドレスを指定するまで、JSON-RPCは無効のままです（[Book：RPC section](https://zebra.zfnd.org/user/mining.html#rpc-section)）：

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232はMainnetの標準RPCポートです。`127.0.0.1`は、このポートに同じマシンからのみ到達できるようにします。

Zebra 2.0.0以降、zcashdが使用していた方法に似たクッキーでRPCポートを保護します。ZebraはRPCエンドポイントの開始時にクッキーを書き込み、シャットダウン時に削除します。デフォルトでは、ファイルはZebraのキャッシュディレクトリにあり、たとえばLinuxでは`/home/user/.cache/zebra/.cookie`です。内容は1行です：

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir`はファイルを移動します。`rpc.enable_cookie_auth = false`はこの確認を無効にし、それによりRPCポートにある唯一の認証も無効にします。すると、ポートに到達できるものはすべて呼び出せるようになります。

### Zebraを起動して同期させる

```bash
zebrad
```

Zebraはデフォルトの場所から設定を読み取ります。別のファイルを使用するには`-c /path/to/zebrad.toml`を渡します。同期が終了するまで待機してください。完了するとログに`sync_percent=100.000%`が表示されます（[Book：Running zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)）。ハードウェアとディスク容量については、[Zebra Full Node](/zcash-tech/zebra-full-node)を参照してください。

### getblocktemplateで確認する

`getblocktemplate`は、マイニングソフトウェアが作業を取得するために行う呼び出しであり、最も迅速なテストでもあります（[Book：Testing the setup](https://zebra.zfnd.org/user/mining.html#testing-the-setup)）。クッキーファイルの内容を`__cookie__:PASSWORD`の位置に入れてください：

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

正常に動作するセットアップでは、マイナーに必要なフィールド（`previousblockhash`、`coinbasetxn`、`target`、`height`など）を含む`result`オブジェクトが返されます。`extra_coinbase_data`を設定した場合、Bookでは`coinbasetxn.data`内でタグを見つける方法が説明されています。

### マイニングソフトウェアを接続する

マイニングまたはプールソフトウェアに、RPCエンドポイント`127.0.0.1:8232`と、クッキーのユーザー名およびパスワードを指定します。Bookには、Zebraは「ほとんどのマイニングプールソフトウェアを実行するために必要なRPCメソッドをサポートする」と記載されています（[Book：Run a mining pool](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)）。

ソフトウェアを選ぶ前に、Bookの次の2点に注意してください：

- **s-nompはテスト専用です。** Bookではs-nompのセットアップを「実験的」と呼び、s-nompは「NU5と互換性がないため、一部のマイニング機能は無効になっています」としています。[Testnet guide](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html)には、s-nompは「NU5またはそれ以降のネットワークアップグレード向けに公式更新されていない」とあり、本番マイナーには現在のアップグレードに対応したプールソフトウェアを推奨しています。
- **Zebraにはすぐに使えるスタックがあります。** Zebraリポジトリには、[`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining)にDocker Composeセットアップがあり、Zebraをマイニングプールとともに、必要に応じてCPUマイナーも起動します。含まれるプールはs-nompで、変更しない限りTestnetで起動するため、構成要素を学ぶための手段として扱ってください。

### Dockerルート

Bookの最短経路は、アドレスとRPCポートを環境変数として渡す`zfnd/zebra` Dockerイメージです（[Book：Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)）。以下のコマンドはBookのものに1つ変更を加えています。RPCポートをホストのループバックアドレス上にのみ公開するため、ほかのマシンは到達できません。

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

これによりMainnetノードが起動し、P2Pポート（8233）がDockerホスト上で公開され、RPCポート（8232）はホスト自体からのみ到達可能になります。クッキーを出力するには次を実行します：

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **`0.0.0.0`は`ZEBRA_RPC__LISTEN_ADDR`のままにしてください。** これは、Zebraがコンテナ内でリッスンするアドレスです。Dockerは公開ポートをコンテナ自身のネットワークインターフェースへ転送するため、コンテナ内で`127.0.0.1`をリッスンするZebraは、ホストからでも接続を受け取りません。`-p`の前にある`127.0.0.1:`が、ポートをネットワークから遮断します。
- **Bookのコマンド**は`-p 8232:8232`でRPCポートを公開するため、ホストのすべてのネットワークインターフェースで開かれます。
- **Testnetで練習するには、** `-e ZEBRA_NETWORK__NETWORK="Testnet"`を追加し、`ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`を設定し、`-p 18233:18233`と`-p 127.0.0.1:18232:18232`を公開して、Testnetアドレスを指定します。MainnetアドレスではZebraはTestnetで起動できず、その逆も同様です。

マイナーへの支払いとウォレットの処理は、このセクションの対象外です。ウォレット側については、[Zallet](/zcash-tech/zallet)を参照してください。

## ヒントとベストプラクティス
- **収益性：** whattomine.com/coins/166-zec-equihashなどの計算ツールを使用してください。例：RTX 3060（約300 Sol/s）は、$50/ZECの場合、電気料金約$0.50を差し引く前で1日あたり約0.001 ZECを稼ぎます。
- **プライバシー：** 利用可能であればシールドされたプールを使用し、アドレスの再利用は避けてください。
- **セキュリティ：** 強力なパスワードを使用し、プール／ウォレットで2FAを有効にしてください。秘密鍵は絶対に共有しないでください。
- **トラブルシューティング：** シェアがない場合は、ファイアウォール、アンチウイルス、設定ミスを確認してください。forum.zcashcommunity.comやReddit r/zecなどのフォーラムに参加してください。
- **代替手段：** 収益性がない場合は、クラウドマイニングや他コインのステーキングを検討してください。
- **環境に関する注意：** マイニングはエネルギーを消費します。可能であれば再生可能エネルギー源を使用してください。
- **アップデート：** Zcashは進化する可能性があります（例：PoSへの移行の可能性）。ニュースはz.cashで確認してください。
