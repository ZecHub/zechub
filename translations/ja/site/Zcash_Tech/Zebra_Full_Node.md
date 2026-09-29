<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra フルノード

## 要約

- Zebra（`zebrad`）は、Zcash Foundationが保守するRustで記述されたZcashフルノードです。
- ブロックとトランザクションを検証し、チェーンの状態を保持し、ピアツーピアネットワークを介して他のノードと通信します。
- Zebraとzcashdは同じプロトコルを実装しており、相互運用できました。zcashdの廃止以降、Zebraがコンセンサスの役割を担っています。
- 実行方法は2つあります。`zfnd/zebra` Dockerイメージを使うか、ソースからビルドします。
- 推奨ハードウェアは、CPUコア4基、RAM 16 GB、ディスク300 GBです。最小要件は、同じくディスク300 GBに加え、CPUコア2基とRAM 4 GBです。

## 基本解説

Zebraは、完全にRustで記述された最初のZcashノードです。Zcashのピアツーピアネットワーク上で動作し、トランザクションを検証・ブロードキャストし、ブロックチェーンの状態を保持します。独立した第2の実装があることで、ネットワークインフラは単一のコードベースへの依存を減らせます。

### Zebraとzcashd

元のZcashノードであるzcashdは、Electric Coin CompanyがBitcoinのコードベースを基に開発しました。Zebraは、メモリ安全な言語であるRustで、セキュリティと効率性を重視してゼロから書かれました。

両方の実装は同じプロトコルに従っているため、通信および相互運用が可能でした。zcashdは2026年7月18日にサポート終了による停止に達し、現在は起動しません。そのため、使用されているノード実装はZebraとZakuraです。全体像については、[フルノード](/zcash-tech/full-nodes)を参照してください。

## Zebraの実行

Dockerイメージを使用してZebraを実行するか、手動でビルドできます。システム要件のセクションを参照してください。

### Dockerの使用

最新リリースを実行してチェーン先端まで同期するには、次のコマンドを実行します。

```

docker run zfnd/zebra:latest

```

完全な手順については、[Dockerドキュメント](https://zebra.zfnd.org/user/docker.html)を参照してください。

### Zebraのビルド

Zebraのビルドには、Rust、libclang、C++コンパイラが必要です。

- Zebraはこれでのみテストされているため、最新の安定版Rustがインストールされていることを確認してください。
- 必要なビルド依存関係は次のとおりです。
  - libclang（libclang-devまたはllvm-devとも呼ばれます）
  - clangまたは別のC++コンパイラ（全プラットフォーム向けのg++、またはmacOS向けのXcodeなど）
  - Protocol Buffers v3.12.0（2020年5月16日リリース）で導入された、*--experimental_allow_proto3_optional* フラグ付きのprotoc（Protocol Buffersコンパイラ）

### インストールと起動

glibc 2.34以降を搭載したx86_64またはaarch64 Linux（Ubuntu 22.04+、Debian 12+、RHEL 9+、Amazon Linux 2023）では、ビルド依存関係を省略し、署名済みの事前ビルドバイナリをインストールできます。

```
cargo binstall zebrad
```

同じバイナリは、すべてのGitHubリリースに`zebrad-<version>-<target>.tar.gz`として添付され、それぞれにSHA-256チェックサム、Sigstoreビルド来歴証明、Cosign署名が付与されています。古いプラットフォームでは、Dockerイメージを使用するか、ソースからビルドしてください。

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

  - 生成された*zebrad.toml*は、Linuxのデフォルト設定ディレクトリに配置されます。他のOSでのデフォルトの保存場所については、ドキュメントを参照してください。

### プログレスバーの設定

  - *zebrad.toml*内の*tracing.progress_bar*を設定すると、プログレスバーを使用して主要な指標をターミナルに表示できます。注：プログレスバーの推定値が非常に大きくなる既知の問題があります。

### マイニングの設定

  - Dockerで*MINER_ADDRESS*とポートマッピングを指定することで、Zebraをマイニング用に設定できます。詳細は、[マイニングサポートのドキュメント](https://zebra.zfnd.org/user/mining-docker.html)で確認できます。

### カスタムビルド機能

  - Prometheusメトリクス、Sentryモニタリング、実験的なElasticsearchサポートなどの追加Cargo機能により、Zebraの機能を拡張できます。

  - インストール時に`--features`フラグのパラメータとして複数の機能を列挙することで、複数の機能を組み合わせられます。

  - パフォーマンス最適化のため、一部のデバッグおよび監視機能はリリースビルドでは無効化されています。実験的機能および開発者向け機能の完全な一覧については、[APIドキュメント](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags)を参照してください。

## システム要件とネットワーク設定

### 推奨要件

- CPU：CPUコア4基
- RAM：16 GB
- ディスク容量：バイナリのコンパイルとキャッシュされたチェーン状態の保存に使用できるディスク容量300 GB
- ネットワーク：月間最低300 GBのアップロードおよびダウンロードが可能な、100 Mbpsのネットワーク接続

### 最小要件

- CPU：CPUコア2基
- RAM：4 GB
- ディスク容量：使用可能なディスク容量300 GB

Zebraのテストスイートは、マシンの仕様によっては完了まで1時間以上かかる場合があります。低速なシステムでもZebraをコンパイルして実行できます。正確な性能の境界はテストによって確立されていません。

### ディスク要件

- Zebraは、キャッシュされたMainnetデータに約300 GB、キャッシュされたTestnetデータに10 GBを使用します。ディスク使用量は時間とともに増加すると見込まれます。
- データベースは定期的に、またシャットダウンまたは再起動時にもクリーンアップされます。変更はデータベーストランザクションを使用してコミットされます。強制終了またはpanicによる未完了の変更は、次回Zebraが起動したときにロールバックされます。

### ネットワーク要件とポート

- Zebraは、受信および送信接続に次のTCPポートを使用します。
  - Mainnet：8233
  - Testnet：18233
- 特定のlisten_addrを指定してZebraを設定すると、このアドレスが受信接続用に通知されます。同期には送信接続が必要であり、受信接続は任意です。
- OSのDNSリゾルバ（通常はポート53）を介してZcashのDNSシーダーにアクセスできる必要があります。
- Zebraは任意のポートで送信接続を確立できます。zcashdは、他ネットワークへのDDoS攻撃に利用されないよう、デフォルトポート上のピアを優先します。

### Mainnetにおける一般的なネットワーク使用量

- 初期同期：初期同期には300 GBのダウンロードが必要であり、この量は増加すると見込まれます。
- 継続的な更新：ユーザーのトランザクションサイズおよびピアからの要求に応じて、日々10 MBから10 GBのアップロードおよびダウンロードが発生します。
- Zebraは、内部データベースのバージョン変更ごとに初期同期を開始します。そのため、バージョンアップ時にチェーン全体のダウンロードが必要になる場合があります。
- 往復遅延が2秒以下のピアが優先されます。遅延がこのしきい値を超える場合は、Zebraリポジトリでチケットを作成してください。

## よくある間違い

- 現在の必要量だけでディスクを見積もること。キャッシュされたMainnetの状態はすでに300 GB近くに達しており、増え続けています。
- `zebrad`にウォレットRPCを期待すること。鍵と残高は、別プログラムである[Zallet](https://github.com/zcash/zallet)にあります。
- `zebrad`だけを実行し、ライトウォレットが接続すると期待すること。この経路には、lightwalletdまたは[Zaino](/zcash-tech/zaino)のいずれかのインデクサーが必要です。
- 予期しない再同期を障害として扱うこと。データベースのバージョン変更により、設計上1回発生します。

## 関連ページ

- [フルノード](/zcash-tech/full-nodes) - フルノードの機能と、存在する実装
- [Zakuraノード](/zcash-tech/zakura-node) - より高速な同期とプルーニングを備えた、Zebraからフォークされたノード
- [Zaino](/zcash-tech/zaino) - ライトウォレットにサービスを提供するRustインデクサー
- [ライトウォレットノード](/zcash-tech/lightwallet-nodes) - ライトウォレットが問い合わせるサーバー
- [Zcashマイニングガイド](/using-zcash/zcash-mining-guide) - 自身のノードを対象にしたマイニング

## さらに学ぶ

- [Zebraブック](https://zebra.zfnd.org)
- [ZebraにあるGitHub](https://github.com/ZcashFoundation/zebra/)
- [システム要件](https://zebra.zfnd.org/user/requirements.html)
