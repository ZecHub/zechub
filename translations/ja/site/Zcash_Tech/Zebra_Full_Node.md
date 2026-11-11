<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra フルノード（Full Node）

## 要約

- Zebra（`zebrad`）は、Rustで記述され、Zcash Foundationによって保守されているZcashフルノードです。
- ブロックとトランザクションを検証し、チェーンの状態を保持し、ピアツーピアネットワークを介して他のノードと通信します。
- Zebraとzcashdは同じプロトコルを実装しており、相互運用できました。zcashdの廃止以降、Zebraがコンセンサスの役割を担っています。
- 実行方法は2つあります。`zfnd/zebra`のDockerイメージを使用する方法と、ソースからビルドする方法です。
- 推奨ハードウェアは、4 CPUコア、16 GB RAM、300 GBのディスクです。最小要件は、2コア、4 GB RAM、および同じく300 GBのディスクです。

## 基本説明

Zebraは、完全にRustで記述された最初のZcashノードです。Zcashピアツーピアネットワーク上で、トランザクションを検証およびブロードキャストし、ブロックチェーンの状態を維持します。独立した2つ目の実装があることで、ネットワークインフラストラクチャは単一のコードベースへの依存度を下げられます。

### Zebraとzcashd

元のZcashノードであるzcashdは、Bitcoinのコードベースを基にElectric Coin Companyによって開発されました。Zebraは、メモリセーフな言語であるRustで、セキュリティと効率性を重視してゼロから記述されました。

両方の実装は同じプロトコルに従うため、通信および相互運用が可能でした。zcashdは2026年7月18日にサポート終了による停止に達し、以降は起動しません。これにより、現在使用されているノード実装はZebraとZakuraになりました。全体像については、[フルノード](/zcash-tech/full-nodes)を参照してください。

## Zebraの実行

Dockerイメージを使用してZebraを実行することも、手動でビルドすることもできます。システム要件のセクションを参照してください。

### Dockerの使用方法

最新リリースを実行して先端まで同期するには、次のコマンドを実行します。

```

docker run zfnd/zebra:latest

```

完全な手順については、[Dockerのドキュメント](https://zebra.zfnd.org/user/docker.html)を参照してください。

### Zebraのビルド

Zebraのビルドには、Rust、libclang、およびC++コンパイラが必要です。

- Zebraはこれでのみテストされているため、最新の安定版Rustがインストールされていることを確認してください。
- 必要なビルド依存関係は以下のとおりです。
  - libclang（libclang-devまたはllvm-devとも呼ばれます）
  - clangまたは別のC++コンパイラ（すべてのプラットフォームではg++、macOSではXcodeなど）
  - Protocol Buffers v3.12.0（2020年5月16日リリース）で導入された、*--experimental_allow_proto3_optional*フラグ付きのprotoc（Protocol Buffersコンパイラ）

### インストールと起動

glibc 2.34以降を搭載したx86_64またはaarch64のLinux（Ubuntu 22.04+、Debian 12+、RHEL 9+、Amazon Linux 2023）では、ビルド依存関係を省略して署名済みのビルド済みバイナリをインストールできます。

```
cargo binstall zebrad
```

同じバイナリは、すべてのGitHubリリースに`zebrad-<version>-<target>.tar.gz`として添付されており、それぞれにSHA-256チェックサム、Sigstoreのビルド来歴証明、およびCosign署名が付属しています。古いプラットフォームでは、Dockerイメージを使用するか、ソースからビルドしてください。

ソースからビルドするには、コードを取得してリリースバイナリをビルドします。

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

次のコマンドでノードを起動します。

```
target/release/zebrad start
```

インストールガイド：[zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## オプション設定と機能

### 設定ファイルの初期化

  - 次のコマンドで設定ファイルを生成します。

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - 生成された*zebrad.toml*は、Linuxのデフォルト設定ディレクトリに配置されます。OSごとの代替デフォルト場所については、ドキュメントを参照してください。

### プログレスバーの設定

  - *zebrad.toml*の*tracing.progress_bar*を設定すると、プログレスバーを使用して端末に主要なメトリクスを表示できます。注記：プログレスバーの推定値が極端に大きくなる既知の問題があります。

### マイニングの設定

  - Zebraは、Dockerで*MINER_ADDRESS*とポートマッピングを指定することで、マイニング用に設定できます。詳細は、[マイニングサポートのドキュメント](https://zebra.zfnd.org/user/mining-docker.html)で確認できます。

### カスタムビルド機能

  - Prometheusメトリクス、Sentryモニタリング、実験的なElasticsearchサポートなどの追加Cargo機能により、Zebraの機能を拡張できます。

  - インストール時に`--features`フラグのパラメータとして複数の機能を列挙することで、それらを組み合わせられます。

  - パフォーマンスを最適化するため、一部のデバッグおよびモニタリング機能はリリースビルドで無効になっています。実験的機能およびデベロッパー（developer）機能の完全な一覧については、[APIドキュメント](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags)を参照してください。

## システム要件とネットワーク設定

### 推奨要件

- CPU：4 CPUコア
- RAM：16 GB
- ディスク容量：バイナリのコンパイルとキャッシュされたチェーン状態の保存に使用できる300 GBのディスク容量
- ネットワーク：月間最低300 GBのアップロードおよびダウンロードが可能な100 Mbpsのネットワーク接続

### 最小要件

- CPU：2 CPUコア
- RAM：4 GB
- ディスク容量：使用可能な300 GBのディスク容量

Zebraのテストスイートは、マシンの仕様によっては完了までに1時間以上かかる場合があります。低速なシステムでもZebraをコンパイルして実行できます。正確な性能限界はテストによって確立されていません。

### ディスク要件

- Zebraは、キャッシュされたMainnetデータに約300 GB、キャッシュされたTestnetデータに10 GBを使用します。ディスク使用量は時間とともに増加すると予想されます。
- データベースは定期的に、またシャットダウン時または再起動時にもクリーンアップされます。変更はデータベーストランザクションを使用してコミットされます。強制終了またはパニックによる未完了の変更は、次回Zebraが起動した際にロールバックされます。

### ネットワーク要件とポート

- Zebraは、受信接続および送信接続に以下のTCPポートを使用します。
  - Mainnet用の8233
  - Testnet用の18233
- 特定のlisten_addrでZebraを設定すると、このアドレスが受信接続用として告知されます。同期には送信接続が必要であり、受信接続は任意です。
- OS DNSリゾルバ（通常はポート53）を介してZcash DNSシーダーへアクセスする必要があります。
- Zebraは任意のポートで送信接続を確立できます。zcashdは、他のネットワークへのDDoS攻撃に利用されることを避けるため、デフォルトポート上のピアを優先します。

### Mainnetにおける一般的なネットワーク使用量

- 初期同期：初期同期には300 GBのダウンロードが必要であり、この量は増加すると予想されます。
- 継続的な更新：ユーザーのトランザクションサイズとピアからの要求に応じて、1日あたり10 MBから10 GBのアップロードおよびダウンロードが発生します。
- Zebraは、内部データベースのバージョンが変更されるたびに初期同期を開始します。そのため、バージョンアップグレード中にチェーン全体のダウンロードが必要になる場合があります。
- 往復レイテンシが2秒以下のピアが優先されます。レイテンシがこのしきい値を超える場合は、Zebraリポジトリでチケットを作成してください。

## よくある間違い

- 現在の使用量だけを基にディスク容量を見積もること。キャッシュされたMainnet状態はすでに300 GB近くに達しており、増加し続けています。
- `zebrad`にウォレットRPCを期待すること。鍵と残高は、別個のプログラムである[Zallet](https://github.com/zcash/zallet)にあります。
- `zebrad`だけを実行してライトウォレットが接続すると期待すること。この経路には、lightwalletdまたは[Zaino](/zcash-tech/zaino)のいずれかのインデクサーが必要です。
- 予期しない再同期を障害として扱うこと。データベースバージョンの変更は、設計上これを1回トリガーします。

## 関連ページ

- [フルノード](/zcash-tech/full-nodes) - フルノードの機能と存在する実装
- [Zakuraノード](/zcash-tech/zakura-node) - Zebraからフォークされ、より高速な同期とプルーニングを備えたノード
- [Zaino](/zcash-tech/zaino) - ライトウォレットにサービスを提供するRustインデクサー
- [ライトウォレットノード](/zcash-tech/lightwallet-nodes) - ライトウォレットが照会するサーバー
- [Zcashマイニングガイド](/using-zcash/zcash-mining-guide) - 自身のノードを対象としたマイニング

## さらに学ぶ

- [Zebraの書籍](https://zebra.zfnd.org)
- [ZebraにあるGitHubについて](https://github.com/ZcashFoundation/zebra/)
- [システム要件](https://zebra.zfnd.org/user/requirements.html)
