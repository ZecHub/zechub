# Zcash マイニングガイド：個人所有ハードウェアでマイニングプールに参加する

## はじめに

Zcash（ZEC）は、マイニングにEquihashプルーフ・オブ・ワークアルゴリズムを使用するプライバシー重視の暗号資産です。Zcashのマイニングでは、計算能力を用いて複雑な数学的問題を解き、トランザクションを検証し、ZEC報酬と引き換えにネットワークを保護します。ネットワークの難易度が高いため、ほとんどのユーザーにはソロマイニングは推奨されません。マイニングプールに参加することは、他の参加者とハッシュパワーを組み合わせて安定した報酬を得る最良の方法です。

このガイドでは、個人所有のハードウェア（例：GPU搭載の家庭用PCやエントリーレベルのASIC）を使ったZcashのマイニングに焦点を当てます。GPUでもZcashをマイニングできますが、ネットワーク難易度のため、2026年時点ではASICのほうがはるかに効率的で収益性が高いことに注意してください。電力コスト、ハードウェア価格、ZECの価値といった要因が採算性に影響するため、必ずWhatToMine.comなどのツールで最新の収益性を確認してください。マイニングがすべての人にとって収益性があるとは限りません。地域の規制と電力料金を調査してください（目標は$0.08/kWh未満）。


## 要件

### ハードウェア
- **GPUマイニング（初心者に推奨する個人セットアップ）：**
  - 少なくとも4GBのVRAMを搭載したNVIDIAまたはAMD GPU（例：NVIDIA GTX 1070、RTX 3060、AMD RX 580以上）。
  - 対応するマザーボード、十分なPSU（複数GPUには少なくとも750W）、過熱を防ぐための良好な冷却。
  - より高いハッシュレートを得るためにマルチGPUリグが一般的です（例：GPU 6枚で1～2 kSol/sを達成可能）。
- **ASICマイニング（より効率的だが高コスト）：**
  - Bitmain Antminer Z15（420 kSol/s）やInnosilicon A9（50 kSol/s）などのEquihash対応ASIC。
  - これらは騒音と発熱が大きく、より多くの電力を消費します（例：1500W以上）。専用スペースに適しています。Bitmain.comや再販業者（Blockware Mining）など、信頼できる供給元から購入してください。
- **一般：** 安定したインターネット接続、セットアップおよび監視用コンピューター。ASICがネットワークを支配しており（2026年の総ハッシュレートは約13 GSol/s）、GPUマイニングの競争力は低いものの、愛好家には依然として可能です。

### ソフトウェア
- **オペレーティングシステム：** Windows 10/11、Linux（安定性のためUbuntuを推奨）。
- **マイニングソフトウェア：**
  - GPU向け：lolMiner（AMD/NVIDIA対応）、GMiner、またはminiZ（NVIDIA向け）。公式GitHubリポジトリ（例：github.com/Lolliedieb/lolMiner-releases）からダウンロードします。
  - ASIC向け：メーカー内蔵のファームウェア／ダッシュボードを使用します（例：BitmainのWebインターフェース）。
- **ウォレット：** 報酬の受取用Zcashウォレット。推奨：
  - シールド（プライベート）：ZODL Wallet、Zingo（モバイル／デスクトップ）、Zkool（モバイル／デスクトップ）。
  - 透明（簡単だがプライバシーは低い）：Edge Wallet、Zecwallet Lite。
  - [wallets](https://zechub.wiki/wallets)からダウンロードします。プールが対応している場合、プライバシーのためにシールドアドレス（`zs`で始まる）を生成してください。

### その他
- 電力：コストを計算してください。GPUはカード1枚あたり150～300W、ASICは1000W以上を使用します。
- アンチウイルス：マイナーを脅威として検出する可能性があるため、セットアップ中は無効にしてください。

## マイニングプールに参加するためのステップバイステップガイド

### ステップ1：Zcashウォレットをセットアップする
1. 公式Zcashウェブサイト[wallets](https://zechub.wiki/wallets)からウォレットをダウンロードしてインストールします。
2. 新しいウォレットを作成し、シードフレーズを安全にバックアップします。
3. 受取アドレスを生成します（プライバシーのため、できればシールド）。例：`zs1exampleaddress...`。記録しておいてください。
4. 透明アドレス（`t`で始まる）を使用する場合はより簡単ですが、プライバシーは低くなります。

### ステップ2：ハードウェアを準備する
- GPUの場合：
  1. GPUをPCに取り付け、ドライバーを更新します（NVIDIA：GeForce Experience、AMD：Radeon Software）。
  2. 経験があればオーバークロックします（安定性のためMSI Afterburnerを使用。効率化にはコアクロックを+100～200、メモリーを-500にすることを目標にします）。
- ASICの場合：
  1. ASICを電源とEthernetに接続します。
  2. Advanced IP Scannerやメーカーのアプリなどのツールを使用してIPアドレスを見つけます。
  3. Webダッシュボードにアクセスします（例：ブラウザーにIPを入力。Bitmainのデフォルトログインはroot/root）。

**警告：** 適切な換気を確保してください。マイニングは熱を発生させます。まずは小規模に始めてテストしてください。

### ステップ3：マイニングプールを選んで参加する
マイニングプールは作業を分配し、貢献したハッシュレートに応じて報酬を共有します。手数料（0～2%）、最低支払額（0.01～0.1 ZEC）、所在地（低Ping）、信頼性に基づいて選択してください。

**推奨プール（ハッシュレート、手数料、レビューに基づく）：**
- **2Miners (zec.2miners.com)**：手数料1%、PPLNS支払い、GPU/ASIC/NiceHashに対応。高ハッシュレート（約1.17 GSol/s）で、信頼性の高いサーバー。
- **F2Pool (zec.f2pool.com)**：手数料2%、PPS+支払い、マルチコイン対応。大規模プール（約2.57 GSol/s）。
- **ViaBTC (zec.viabtc.com)**：手数料2%（PPS+）、使いやすいダッシュボード、グローバルサーバー。
- **AntPool (zec.antpool.com)**：手数料1%、Bitmain提供、ASICに適しています（約494 MSol/s）。
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**：Foundry DigitalによるプロフェッショナルなZcashマイニングプールです。PPLNS支払いを使用し、透明な報酬追跡とエンタープライズグレードのサポートを提供します。機関投資家および大規模ASICマイナーに最適で、アカウント確認が必要です。
- **Sovright (mining.sovright.com)**：Stratum V2上に構築されたZcashプールで、現在はパブリックテストネットとして稼働しています。まだ実際のZEC報酬は支払われないため、収益源ではなくセットアップをテストする手段として扱ってください。詳細は以下の専用セクションを参照してください。
- その他：Kryptex Pool、Luxor（リアルタイム統計はpoolwatch.io/coin/zcashで確認）。

1. プールのウェブサイトにアクセスし、アカウントを作成します（一部の2Minersのように登録不要なものもあります）。
2. 支払い用に設定画面でZcashウォレットアドレスを追加します。
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
     - `WORKER_NAME`：リグの名前（例：Rig1）。
     - EUサーバーの場合：eu.zec.2miners.com:1010。
  4. バッチファイルを実行します。プールに接続し、マイニングを開始します。
- ASICの場合（例：Bitmain Antminer）：
  1. Webダッシュボードにログインします。
  2. Miner Configurationに移動します。
  3. プールの詳細を追加します：
     - URL：stratum+tcp://zec.2miners.com:1010
     - ユーザー名：YOUR_WALLET_ADDRESS.WORKER_NAME
     - パスワード：x（または空欄）。
  4. 保存してマイナーを再起動します。
- その他のソフトウェアの場合（例：GMiner）：
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**テスト：** 10～15分間実行し、コンソールで承認済みシェアとハッシュレートを確認してください。

### ステップ5：マイニングを開始して監視する
1. マイナーを起動します。プールに接続し、シェアの送信を開始します。
2. 次の方法で監視します：
   - プールダッシュボード：ウォレットアドレスを入力し、ハッシュレート、未払い残高、統計を確認します。
   - ソフトウェアコンソール：エラーと温度を監視します（80℃未満を維持）。
   - ツール：リモートリグ管理にはHiveOSまたはSimpleMining OSを使用します。
3. 支払い：ほとんどのプールでは最低額（例：0.05 ZEC）に達すると自動で支払われます。プールのルールを確認してください。

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright：テストネットプールとリレーネットワーク

Sovright（sovright.com）は、Stratum V2マイニングプールと独立したブロックリレーネットワークを運営しています。役割が異なるため、以下で別々に説明します。

### マイニングプール（mining.sovright.com）

Sovrightのプールは、メインネットではなくパブリックZcashテストネット（NU6、Stratum V2）上で稼働しています。テストネットでは実際のZECは支払われません。収益を得るためではなく、マイナー設定のテストに使用してください。

- 開始にアカウントは不要です。CPUまたはASIC Equihashマイナーをプールに向けると、ライブダッシュボードにシェアが表示されます。
- Sovrightは、プールのジョブをそのまま受け取るのではなく、自らブロックテンプレートを選びたいマイナー向けに、オープンソースのStratum V2プロキシも公開しています：

### Foundry Zcash Poolの監視

Foundry Zcash Poolユーザー向け：

- Foundryプールダッシュボードでマイナーのパフォーマンスを監視します。
- 次を確認します：
  - アクティブなワーカー
  - 報告されたハッシュレート
  - 承認済みシェア
  - 推定報酬
  - 支払い状況

FoundryはPPLNS報酬モデルを使用しているため、マイニング報酬は即時のハッシュレートだけでなく、プールの報酬ウィンドウ中に貢献したシェアに依存します。

推奨する監視方法：
- ASICダッシュボードのハッシュレートとFoundryが報告するハッシュレートを比較します。
- 拒否されたシェア、古いシェア、接続の不安定さを調査します。
- ダウンタイムは送信シェアと潜在的な報酬を減らすため、安定したネットワーク接続を維持します。
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  プールに直接接続する代わりに、マイナーをプロキシへ向けます：
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  `yourname.rig1`のようなワーカー名を使用します。
- Sovrightの透明性ページは、シールドトランザクションを除外する一部のプールとは異なり、「すべて含める」ポリシーを掲げています。各ブロックには署名付き証明が付与されるため、このポリシーを独自に確認できます。
- サンプルダッシュボードのデータではなく自分のワーカーを追跡するには、mining.sovright.comでアカウントを作成します（Googleまたはメールでサインイン）。

### リレーネットワーク（relay.sovright.com）

Sovrightは、Zcashメインネット上でパブリックブロックリレーネットワークを別途運営しています。プールがブロックを見つけた場合、そのブロックがネットワークの他の部分へ到達する速度によって、ブロックが孤立する頻度、すなわち伝播競争に敗れて報酬を失う頻度が決まります。このリレーは、前方誤り訂正を伴うコンパクトブロックリレーを使用し、4つのリージョン間でブロックを転送します。

パブリックダッシュボードにはその効果がライブ表示されます。リレー接続済みリージョンは、通常のピアツーピアゴシップにかかる時間の半分未満で新しいブロックを確認でき、ダッシュボードはネットワークのライブ孤立率を追跡します。

これは個々のマイナーではなく、プール運営者向けのインフラです。Sovrightのオープンソース`mining-infra`リポジトリには、見つかったブロックをネイティブP2Pより速くメッシュへ拡散するための`submitblock`リレーゲートウェイが記載されています。接続するには、リレーピアアドレスと認証キーについてSovright（support@sovright.com）へ直接連絡してください。


## 自分のZebraノードに対するマイニング

上記はすべて、他者のプールにマイナーを向ける方法です。もう一つの方法は、自分でノードを実行し、マイニングソフトウェアからそのノードに作業を要求することです。zcashdが2026年7月18日に停止したため、これは[Zebra](/zcash-tech/zebra-full-node)、つまりこのセクションで扱うノードを意味します。

Zebraの役割は小さく明確です。ブロックテンプレートを構築し、RPCインターフェース経由で解決済みブロックを受け入れます。ハッシュ計算はマイニングソフトウェアが行い、複数マイナー間で報酬を分配するのはプールソフトウェアの役割です。ソロでのマイニングでブロックを発見できるかどうかは、ネットワーク全体のハッシュレートに占めるあなたの割合に依存しますが、このセクションではそれを見積もりません。そのため、このページの導入部ではほとんどのユーザーにソロマイニングを推奨していません。

手順は、2026年10月8日時点の2つのZebra Bookページ、[Zcashを使ったマイニングZebra](https://zebra.zfnd.org/user/mining.html)および[ZebraでのマイニングDocker](https://zebra.zfnd.org/user/mining-docker.html)に従います。キー名とデフォルト値はリリースごとに変わるため、利用する前にBookを確認してください。

### 報酬を受け取るアドレスを設定する

デフォルト設定の設定ファイルを作成してから編集します：

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

マイナーアドレスが必要です（[Book：マイナーアドレス](https://zebra.zfnd.org/user/mining.html#miner-address)）：

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebraは、透明なP2PKHまたはP2SHアドレス、Saplingアドレス、またはUnified Addressを受け入れます。複数の受信者を持つUnified Addressについて、BookはZebraが単一の受信者に支払い、「Orchard、次にSapling、その後に透明を優先する」と説明しています。

2つのオプションキーは同じ`[mining]`セクションに入ります：

| キー | 機能 | 制限 |
|---|---|---|
| `extra_coinbase_data` | Zebra独自のマーカーの後に、プール名などの公開タグを、マイニングしたすべてのブロックのcoinbase入力へ追加します（[Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)） | 86バイト。これを超えると「Zebraは起動を拒否する」 |
| `miner_memo` | 報酬出力にシールドメモを添付します。`extra_coinbase_data`とは異なり公開されず、受取アドレスのビューイングキーを持つ人だけが読めます（[Book](https://zebra.zfnd.org/user/mining.html#miner-memo)） | 512バイト。報酬がシールド受信者に送られる場合にのみ機能します。透明アドレスでは「何の効果もなく無視される」 |

### RPCポートを開く

マイニングソフトウェアはJSON-RPC経由でZebraと通信します。リッスンするアドレスを指定するまでRPCは無効のままです（[Book：RPCセクション](https://zebra.zfnd.org/user/mining.html#rpc-section)）：

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232はMainnetの標準RPCポートです。`127.0.0.1`は同じマシンからのみポートに到達できるようにします。

Zebra 2.0.0以降、zcashdが使用していたものに似た方法で、CookieがRPCポートを保護します。ZebraはRPCエンドポイントの起動時にCookieを書き込み、シャットダウン時に削除します。デフォルトではファイルはZebraのキャッシュディレクトリにあり、たとえばLinuxでは`/home/user/.cache/zebra/.cookie`で、次の1行を保持します：

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir`はファイルを移動します。`rpc.enable_cookie_auth = false`はチェックを無効にし、それとともにRPCポートにある唯一の認証も無効にします。そうすると、そのポートに到達できるものは何でも呼び出せるようになります。

### Zebraを起動して同期を完了させる

```bash
zebrad
```

Zebraはデフォルトの場所から設定を読み取ります。別のファイルを使用するには`-c /path/to/zebrad.toml`を渡します。同期が終わるまで待ってください。完了するとログに`sync_percent=100.000%`が表示されます（[Book：zebraの実行](https://zebra.zfnd.org/user/mining.html#running-zebra)）。ハードウェアとディスク容量については、[Zebra Full Node](/zcash-tech/zebra-full-node)を参照してください。

### getblocktemplateで確認する

`getblocktemplate`はマイニングソフトウェアが作業を取得するために行う呼び出しであり、最も速いテストでもあります（[Book：セットアップのテスト](https://zebra.zfnd.org/user/mining.html#testing-the-setup)）。Cookieファイルの内容を`__cookie__:PASSWORD`の位置に入れてください：

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

正常なセットアップでは、マイナーが必要とするフィールドを持つ`result`オブジェクトが返されます。たとえば`previousblockhash`、`coinbasetxn`、`target`、`height`です。`extra_coinbase_data`を設定した場合、Bookは`coinbasetxn.data`内でタグを見つける方法を説明しています。

### マイニングソフトウェアを接続する

マイニングまたはプールソフトウェアに、RPCエンドポイント`127.0.0.1:8232`と、Cookieのユーザー名およびパスワードを指定します。Bookによると、Zebraは「ほとんどのマイニングプールソフトウェアを実行するために必要なRPCメソッドをサポート」しています（[Book：マイニングプールを実行する](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)）。

ソフトウェアを選ぶ前に、Bookから2つの注意点があります：

- **s-nompはテスト専用です。** Bookはs-nompのセットアップを「実験的」と呼び、s-nompは「NU5と互換性がないため、一部のマイニング機能は無効になっている」と述べています。[Testnetガイド](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html)では、s-nompは「NU5またはそれ以降のネットワークアップグレード向けに公式更新されていない」と付け加え、プロダクションマイナーには現在のアップグレードをサポートするプールソフトウェアを推奨しています。
- **Zebraには既製のスタックがあります。** Zebraリポジトリには、[`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining)のDocker Composeセットアップがあり、Zebraをマイニングプールとともに起動し、必要に応じてCPUマイナーも起動します。含まれるプールはs-nompであり、変更しない限りTestnetで起動するため、構成要素を学ぶ方法として扱ってください。

### Dockerルート

Bookの最短経路は、アドレスとRPCポートを環境変数として渡す`zfnd/zebra` Dockerイメージです（[Book：DockerでZebraを使うマイニング](https://zebra.zfnd.org/user/mining-docker.html)）。以下のコマンドはBookのものに1つ変更を加えています。RPCポートをホストのループバックアドレス上でのみ公開するため、他のマシンは到達できません。

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

これによりMainnetノードが起動し、P2Pポート（8233）がDockerホストで公開され、RPCポート（8232）はホスト自身からのみ到達可能になります。Cookieを表示するには次を実行します：

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **`ZEBRA_RPC__LISTEN_ADDR`内では`0.0.0.0`を維持してください。** これはZebraがコンテナー内でリッスンするアドレスです。Dockerは公開ポートをコンテナー自身のネットワークインターフェースへ転送するため、コンテナー内で`127.0.0.1`上でリッスンするZebraは、ホストからであっても接続を受信しません。`-p`の前にある`127.0.0.1:`が、ポートをネットワークから隔離します。
- **Bookのコマンド**は、`-p 8232:8232`でRPCポートを公開するため、ホストのすべてのネットワークインターフェースで開かれます。
- **Testnetで練習するには、** `-e ZEBRA_NETWORK__NETWORK="Testnet"`を追加し、`ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`を設定し、`-p 18233:18233`および`-p 127.0.0.1:18232:18232`を公開して、Testnetアドレスを指定します。MainnetアドレスではZebraはTestnet上で起動できず、その逆も同様です。

マイナーへの支払いとウォレットの扱いは、このセクションの対象外です。ウォレット側については、[Zallet](/zcash-tech/zallet)を参照してください。

## ヒントとベストプラクティス
- **収益性：** whattomine.com/coins/166-zec-equihashのような計算ツールを使用してください。例：RTX 3060（約300 Sol/s）は、$50/ZECの場合、電気代約$0.50を差し引く前で1日あたり約0.001 ZECを稼ぎます。
- **プライバシー：** 利用可能な場合はシールドプールを使用し、アドレスの再利用を避けてください。
- **セキュリティ：** 強力なパスワードを使用し、プール／ウォレットで2FAを有効にしてください。秘密鍵は決して共有しないでください。
- **トラブルシューティング：** シェアがない場合は、ファイアウォール、アンチウイルス、設定ミスを確認してください。forum.zcashcommunity.comやRedditのr/zecなどのフォーラムに参加してください。
- **代替手段：** 収益性がない場合は、クラウドマイニングまたは他のコインのステーキングを検討してください。
- **環境に関する注意：** マイニングはエネルギーを消費します。可能であれば再生可能エネルギーを使用してください。
- **更新：** Zcashは進化する可能性があります（例：PoSへの移行の可能性）。ニュースはz.cashで確認してください。
