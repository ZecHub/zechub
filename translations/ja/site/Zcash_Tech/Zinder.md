# Zinderインデクサー

Zinderは、Zcash Foundationが公開しているRust製のセルフホスト型Zcashインデクサーです。ZebraまたはZakuraフルノードからチェーンを1度読み取り、一貫したビューを保存して、複数のウォレット、アプリケーション、エクスプローラーに同時に提供します。既存のライトウォレットは、lightwalletd互換アダプターを介して接続できます。

> **Zinderはアルファ版です。** READMEには、ネイティブAPI、lightwalletd互換インターフェース、ストレージ形式、デプロイ構成が変更される可能性があり、タグ付きリリースも安定性を保証するものではないと記載されています。バージョンを正確に固定し、破壊的変更を伴うアップグレードを想定してください。

## 要約

* **Zebra**または**Zakura**がチェーンを検証します。**Zinder**はノードが保持するデータをインデックス化し、クライアントに提供します。
* 接続方法は2つあります。Zinder独自の`WalletQuery` gRPC APIと、lightwalletdの`CompactTxStreamer`プロトコルに対応する別個のアダプターです。これにより、lightwalletd向けに作られたウォレットは、コードを変更せずに接続先を指定できます。
* すべての読み取りは1つのチェーン状態（「エポック」）に固定されるため、同期バッチで競合する2つのチェーン先端のデータが混在することはありません。鍵とシールドされたスキャンはウォレット側に保持されます。
* 1人の運用者が1つのノードを実行し、多数の利用者に提供する構成を想定しています。公開エンドポイントには、独自のTLS、認証、レート制限を設定してください。
* リリースの間隔が短く（2026年11月10日から14日の間に0.7.0から0.12.0まで）、そのうち複数は破壊的変更を伴いました。アップグレードの前に毎回変更履歴を確認してください。

## Zinderの役割

ライトウォレットがフルノードと直接通信することはありません。インデクサーにコンパクトブロック、ツリー状態、トランザクションデータを要求します（[ライトウォレットノード](/zcash-tech/lightwallet-nodes)を参照）。Zcashエコシステムには、現在これに対応するインデクサーがいくつかあります。

| インデクサー | 言語 | メンテナー | 接続先 | 備考 |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcashコミュニティ | Zebraまたはzcashd | 初期のライトウォレットサーバー |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebraまたはzcashd | Z3スタックで任意に選べるインデクサープロファイル |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | 組み込みZakuraノード | [ZainoとZtreamerのベンチマーク](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)を参照 |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0またはZakura 1.8.6（アーカイブノード） | アルファ版。ネイティブAPI、lightwalletdアダプター、任意のエクスプローラー読み取りに対応 |

Zinderのドキュメントでは、どのような場合に適しているかが明確に説明されています。チェーンへのアクセスを単一のウォレットプロセスから独立させたい場合、複数の独立した利用者に提供したい場合、または特定のウォレットのコードから切り離したい場合に特に適しています。単一のウォレットと密接に連携させるなら組み込みインデクサーのほうが簡単な場合があります。また、ノードがすでに保持しているデータだけを必要とする利用者は、ZebraのRPCを直接使用できます。

## 仕組み

Zinderは処理を複数のプロセスに分け、それぞれに1つの役割を持たせています。

| ランタイム | 役割 |
|:--|:--|
| `zinder-ingest` | 正規チェーンストア（RocksDB）への唯一の書き込み元です。ノードを追跡し、再編成を処理し、ライブのメンプール状態を保持します |
| `zinder-projector` | ウォレットストアへの唯一の書き込み元です。ウォレット向けのチェーンビューを構築し、追跡します |
| `zinder-query` | ネイティブ`WalletQuery` gRPC APIを提供します |
| `zinder-compat-lightwalletd` | 同じデータを使ってlightwalletdの`CompactTxStreamer` APIを提供します |

任意のエクスプローラープレーン（`zinder-explorer`と`ExplorerQuery`）では、ブロックの要約、トランザクションの詳細、メンプールのビュー、検索機能を提供します。任意のアダプターでは、CipherScanエクスプローラーのREST APIとWebSocket APIを提供します。どちらもリリースイメージには含まれません。

各ランタイムは`/healthz`、`/readyz`、`/metrics`を公開します。リーダーは、チェーンストアとウォレットストアのコピーがまったく同じチェーン状態を指すようになってから、準備完了を報告します。

## 接続方法

* **既存のライトウォレット**は、既存のlightwalletd連携を維持したまま、接続先を`zinder-compat-lightwalletd`に指定します。Zinderのドキュメントでは、プロトコル互換性とサポートを区別しています。特定のウォレットがサポート対象となるのは、その最新リリースがエンドツーエンド認証に合格した後だけです。リリース0.10.0では`GetLightdInfo`プロトコルのバージョンフィールドが修正され、Zingoが同期できるようになりました。
* **ネイティブクライアント**は`zinder-query`を呼び出して、状態に固定された読み取り、コンパクトブロック、チェーンとメンプールのイベントストリーム、型付きの拒否理由を含むブロードキャスト結果を取得します。
* **Rustアプリケーション**は`zinder-client`クレートを使用します。これはストレージスタックをリンクせずに`zinder-query`へ接続する、リモート接続を優先するSDKです。
* **エクスプローラーとバックエンド**は、ウォレットの読み取り機能と任意の`ExplorerQuery`プレーンを組み合わせます。

## 実行方法

上流のクイックスタートでは、[Z3スタック](/zcash-tech/z3-stack)を使ってノードを起動し、ZinderチェックアウトからDocker Composeを使ってZinderします。

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Mainnet用とZakuraノード用（`deploy/.env.zakura-mainnet`、`deploy/.env.zakura-testnet`）の環境ファイルは、その隣にあります。0.11.0以降、ComposeファイルはZ3を前提としなくなりました。環境ファイルには、ノードのネットワーク、Cookieボリューム、RPCアドレスを指定する必要があります。

デフォルトのホストポート（Testnetでは10000を加算します）:

| サービス | Mainnet | Testnet |
|:--|:--|:--|
| ネイティブ`WalletQuery` gRPC | 9102 | 19102 |
| lightwalletd互換 gRPC | 9067 | 19067 |
| 準備状態: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

ウォレット用の2つのポートは、どちらもループバックにバインドされます。次のコマンドで確認できます。

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

その他のデプロイ方法:

* **`ghcr.io/zcashfoundation/`上のリリースイメージ**: 4つのランタイムに加え、`zinder-wallet-serving`（1つのボリュームを1つのコンテナに接続できるホスト向けに、ingest、projector、ネイティブqueryを1つのコンテナにまとめたもの。lightwalletdアダプターは含まれません）と`zinder-canonical-runtime`（ingestのみ）があります。
* **Linuxバイナリ**: x86-64（x86-64-v3 CPUが必要）およびAArch64向けで、glibc 2.34以降が必要です。認定済みの基準環境はDebian 12です。各リリースにはSBOMと署名済みのSLSA来歴情報が含まれます。

### ノードに必要な要件

* **アーカイブノード**であること。0.11.0以降、`zinder-ingest`はプルーニングされたノードに接続すると起動を拒否します。
* Zebra **7.0.0**またはZakura **1.8.6**を使用すること。リリース系列で認定されているノードのバージョンはこの2つです。
* `zinder-wallet-serving`イメージでは、ノードの**インデクサー用gRPCエンドポイント**が必要です（`ZINDER_NODE__INDEXER_GRPC_ADDR`、Zebraの`indexer_listen_addr`、Mainnetではポート8155）。ループバック以外のアドレスでZakuraインデクサーを使う場合は相互TLSが必要です。Zinderは0.11.0以降これに対応しています。

### Mainnetのサイジング

ウォレット提供用の運用手順書によると、次のとおりです。

* **メモリは最低8 GB**必要です。計測されたピークは、ingestが約2.6 GiB、構築中のprojectorが約2.7 GiB、queryが最大約1.4 GiBです。
* Mainnet用ウォレットストアの構築時には、ボリュームに**約130 GBの空き容量**を確保してください。
* genesisからMainnetを構築した計測では、チェーンストア（ステージング領域が約310 GB）に**約4時間**、ウォレットストアに**2時間以上**かかりました。提供されている構築期限はTestnetにしか適していません。Mainnetでは少なくとも24時間と12時間に延長してください。そうしないと構築が再開され、完了しません。

## 知っておきたいリリース情報

| バージョン | 日付 | 運用上の変更点 |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | デフォルトの再編成ウィンドウを1000ブロックに拡大しました。これはZebra 7とZakuraがブロックを確定する深さです。元に戻せません。以前のリリースでは、拡大後のストアを開けません |
| 0.9.0 | 2026-11-12 | 新しい`zinder-wallet-serving`イメージと`zinder-canonical-runtime`イメージを追加しました |
| 0.10.0 | 2026-11-13 | **NU7ブロックをデコードできる初めてのリリースです。** 0.9.0以前のバージョンでは、最初のNU7ブロックで停止します。ネイティブプロトコルをリビジョン8に更新しました。ingestとqueryを同時にアップグレードし、それに合わせてネイティブクライアントも更新してください |
| 0.11.1 | 2026-11-14 | Zebra 7.0.0に加え、Zakura 1.8.6を認定しました。ノードのインデクサーとの相互TLSに対応し、プルーニングされたノードを拒否します。0.11.0はクレートとしてのみ公開されたため、0.11.1をデプロイしてください |
| 0.12.0 | 2026-11-14 | 準備状態とシャットダウンを修正しました。エクスプローラーの再生が高速化し、ディスクの空き容量が少なくなると一時停止します |

## よくある間違い

**本番用ソフトウェアとして扱う。** プロジェクト自身がアルファ版としています。プロジェクトの説明によれば、ローカルのComposeデプロイが成功しても、それだけでは「本番環境での認定にはなりません」。

**プルーニングされたノードに接続する。** ingestは起動時に終了します。アーカイブZebraまたはZakuraノードを使用してください。

**gRPCポートを直接公開する。** ウォレット用の2つのポートがループバックにバインドされるのには理由があります。インターネットに公開する前に、管理下のプロキシでTLS、認証、レート制限、クォータを設定してください。

**ランタイムを1つずつアップグレードする。** 複数のリリースでネイティブプロトコルのリビジョンやストア形式が変更されています。Zinderサービスをまとめてアップグレードし、同じ切り替え時にネイティブクライアントも更新してください。

**プロトコルに対応していればウォレットもサポート対象だと思い込む。** lightwalletdアダプターはプロトコルに対応していますが、Zinderは特定のウォレットの最新リリースがエンドツーエンド認証に合格した後に限り、そのウォレットをサポート対象としています。

## 関連ページ

* [ライトウォレットノード](/zcash-tech/lightwallet-nodes) — ライトウォレットサーバーの役割と、参照できるデータ
* [Zaino](/zcash-tech/zaino) — Zingo LabsのRustインデクサー
* [インデクサーのベンチマーク: ZainoとZtreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3スタック](/zcash-tech/z3-stack) — Zinderのクイックスタートで使われているノード構成、Zebra + Zallet
* [Zebraフルノード](/zcash-tech/zebra-full-node)と[Zakuraノード](/zcash-tech/zakura-node) — Zinderが認定している2種類のノード

## 詳しく知るには

* [Zinder GitHubリポジトリ](https://github.com/ZcashFoundation/zinder)
* [Zinderリリース](https://github.com/ZcashFoundation/zinder/releases)と[変更履歴](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Zinderとは何か、何ではないか](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [VMへのデプロイ](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md)と[ウォレット提供用イメージ](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)の運用手順書

**最終更新:** 2026年11月
