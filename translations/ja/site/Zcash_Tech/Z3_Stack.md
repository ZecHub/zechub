<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Z3 スタック

**Z3 スタック（Z3 Stack）**は、Zcash Foundationがパッケージ化したノードプラットフォームです。**Zebra**（フルノード）と**Zallet**（フルノードウォレット）、および任意の**Zaino**インデクサーで構成されます。コンセンサスとウォレットを1つのバイナリにまとめ、2026年7月18日にサポート終了となったスタンドアロンの`zcashd`プロセスを置き換えることを目的としています。

参照実装は、[github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3)にあるDocker Composeプロジェクトです。

---

## 要約

* Z3は**新しいコンセンサスクライアントではありません**。Zebraがチェーンを検証し、Zalletがキーを保持してウォレットRPCを提供し、Zaino（任意）がlightwalletd gRPCプロトコルを使用する、`zcashd`後のスタックをまとめて実行する方法です。
* `zcashd`はノードとウォレットを1つにまとめていました。Z3は**これらの役割を分離します**。取引所、マイニングプール、その他のフルノードウォレット運用者は、Zebra単体ではなくこの組み合わせへ移行します。
* 1台のホストで、**メインネット**、**テストネット**、**regtest**という3つの分離されたComposeプロジェクトを実行できます。
* メインネットの初回同期には、およそ**24～72時間**と約**300 GB**が必要です。regtestは数秒で起動し、スタックを学ぶのに適しています。
* ZalletはZainoのインデクサーライブラリを組み込み、JSON-RPC経由でZebraと通信します。外部ウォレット向けにlightwalletd互換エンドポイントが必要な場合にのみ、スタンドアロンのZainoサービスが必要です。
* Zalletは**ベータ版**です。破壊的変更により、ウォレットの削除と再作成が必要になる場合があります。大きな金額の完成済みカストディソフトウェアとして扱わないでください。

---

## Z3が存在する理由

Zcashの歴史の大半において、`zcashd`は参照フルノードであると同時に、唯一の本番用フルノードウォレットでもありました。この設計は、取引所、プール、カストディアンが統合対象としていたものです。

`zcashd`は廃止されました。コンセンサスは[Zebra](/zcash-tech/zebra-full-node)へ移行し、現在は[Zakura](/zcash-tech/zakura-node)にも対応しています。組み込みウォレットは[Zallet](https://github.com/zcash/zallet)へ移行しました。ライトウォレットの提供は、[lightwalletd](/zcash-tech/lightwallet-nodes)から[Zaino](/zcash-tech/zaino)へ移行中です。

この3つは別々のリポジトリ、別々のリリースサイクル、別々の設定を持ちます。Z3はそれらをつなぐ役割を果たします。固定されたイメージ、ノードの同期が完了するまでウォレットを停止状態に保つヘルスチェック、ネットワークごとのポートとボリューム、そして文書化された運用手順を提供します。

この名称は、Zebra、Zaino、Zalletを指す非公式なエコシステム上の略称です。ただし、標準のComposeファイルが起動するのはZebraとZalletのみです。Zainoは必須の第3プロセスではなく、Composeプロファイルです。

---

## アーキテクチャ

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| コンポーネント | Z3での役割 | 必須ですか？ |
| --- | --- | --- |
| **Zebra** | チェーンの同期・検証、ゴシップ、JSON-RPC、ヘルスエンドポイント | はい |
| **Zallet** | フルノードウォレットです。Zainoライブラリを組み込みます。Zebra JSON-RPCへ直接接続します。スタンドアロンのZainoコンテナは**呼び出しません**。 | はい |
| **Zaino** | スタンドアロンインデクサーです。外部ライトクライアント向けのlightwalletd互換gRPCに加え、エクスプローラーとフォーセット向けのJSON-RPCプロキシを提供します。 | いいえ — `--profile indexer` |

Z3は`docker-compose.yml`でイメージバージョンを固定します。異なるタグが必要な場合は、`Z3_ZEBRA_IMAGE`、`Z3_ZAINO_IMAGE`、または`Z3_ZALLET_IMAGE`で上書きしてください。

---

## zcashdとの違い

| | zcashd | Z3 |
| --- | --- | --- |
| 言語 | C++（Bitcoinフォーク） | Rustサービス、Docker Composeによるオーケストレーション |
| プロセスモデル | 1つのバイナリ：ノード + ウォレット | 分離されたノードおよびウォレットコンテナ |
| コンセンサス | 廃止済み（2026年7月18日にサポート終了） | Zebra（または別の互換ノード） |
| ウォレット | 組み込みの`wallet.dat` | Zallet、age暗号化済みデータディレクトリ |
| ライトクライアント | 通常は別のlightwalletd | 任意のZainoプロファイル |
| 設定 | `zcash.conf` | `config/<network>/`配下のネットワーク別ファイルとCompose環境ファイル |
| 1ホスト上のネットワーク | 厄介なポート競合 | 第1級対応：`z3-mainnet`、`z3-testnet`、`z3-regtest` |

`zcashd`ウォレットをまだ使用している場合は、`wallet.dat`をZ3ボリュームへコピーするのではなく、ZecHubの[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)とZalletの`migrate-zcashd-wallet`コマンドを使用してください。

---

## ネットワーク

Z3は3つの独立したComposeプロジェクトです。ポートやボリュームを共有しません。

| ネットワーク | プロジェクト名 | 用途 | 初回同期 | 実資金 |
| --- | --- | --- | --- | --- |
| **メインネット** | `z3-mainnet` | 本番運用 | 24～72時間 | はい |
| **テストネット** | `z3-testnet` | 公開テストネット上でのステージング | 2～12時間 | いいえ（テストZEC） |
| **regtest** | `z3-regtest` | ローカル練習：即時ブロック、ピアなし | 数秒 | いいえ |

新しい運用者は、まず**regtest**で開始し、RPCとウォレットのフローを確認してから、テストネットまたはメインネットへ移行してください。

---

## 標準ホストポート

3つのネットワークはすべて、1台のマシン上で共存することを想定しています。以下の値は公開されている標準値であり、対応する`Z3_*`環境変数で上書きできます。正規の一覧は[`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)です。

| サービス | メインネット | テストネット | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | （未公開） |
| Zebraヘルス（`/ready`） | 8080 | 18080 | 28080 |
| Zaino gRPC（インデクサープロファイル） | 8137 | 18137 | 28137 |
| Zaino JSON-RPC（インデクサープロファイル） | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Composeネットワーク内では、サービスは名前で解決されます（`zebra`、`zaino`、`zallet`）。

---

## データとバックアップ

| ボリューム | 保存内容 | バックアップしますか？ |
| --- | --- | --- |
| `z3-<network>-chain` | Zebraチェーン状態（メインネットでは約300 GB） | 任意 — 再同期可能です |
| `z3-<network>-zallet` | 暗号化済みウォレットデータベース**および**ロック解除に使用するageアイデンティティ | **はい — バックアップが必須なのはこのボリュームのみです** |
| `z3-<network>-zaino` | インデクサー状態（インデクサープロファイル使用時のみ） | 任意 — 再構築可能です |
| `z3-<network>-cookie` | Zebra RPCクッキー | いいえ — 再生成されます |

初回起動前にチェーン状態を別のディスクへ置くには、次のようにします。

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down`はスタックを停止し、ボリュームを保持します。`-v`を追加するとボリュームが削除され、完全な再同期が必要になります。プロファイルで制御されるサービス（インデクサー、モニタリング）も確実に停止するよう、`--profile "*"`を含めてください。

---

## 開始方法

前提条件：Docker Engine、Docker Compose v2.24.4以降、Git。`openssl`はregtestでのみ必要です。

### Regtest（スタックを確認する最速の方法）

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

テストコマンドについては、[docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)を参照してください。

### メインネット（2段階起動）

Zebraの同期が完了するまで、Zalletは有用ではありません。Zalletを早期に起動すると、`/ready`が真になるまで再起動ループに入ります。

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

テストネットでも、`.env.testnet`と`./scripts/check-zebra-readiness.sh 18080`を使って同じ手順を行います。

`config/<network>/`配下の編集はローカルに保持され、`git pull`後も残ります。

### 任意のプロファイル

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

標準のGrafanaポートは、3000（メインネット）、13000（テストネット）、23000（regtest）です。

---

## 運用上の注意

* **固定イメージ。** Z3は暗黙的に`:latest`へ追従しません。レビュー済みの変更で固定値を更新するか、`Z3_<SERVICE>_IMAGE`を設定してください。
* **非rootコンテナ。** Linuxのケイパビリティは削除されています。ヘルスチェックにより、Zebraの準備が整うまでウォレットの起動を抑制します。再起動ポリシーは標準で有効です。
* **ログ。** Z3はログドライバーを固定しません。Dockerデーモン設定でサイズ制限を設定しないと、24時間365日稼働するノードではログが無制限に増加します。
* **P2P。** メインネットとテストネットは、ZebraのP2Pポートを公開します。NAT配下では、ピアが接続すべきアドレスに`ZEBRA_NETWORK__EXTERNAL_ADDR`を設定してください。regtestにはピアがありません。
* **ARM上のZaino。** 上流のZainoイメージは`linux/amd64`専用です。Apple Siliconでは、ソースからビルドしない限りエミュレーションで実行されます。ZebraとZalletはマルチアーキテクチャです。
* **共有ホスト。** 標準ではCPUまたはメモリ制限が設定されていません。マシンがノード専用ではない場合は、オーバーライドファイルに`deploy.resources.limits`を追加してください。

本番環境を想定したチェックリストとFAQについては、[docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)、[docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)を参照してください。

---

## Z3を実行すべき人

**適しているケース**

* `zcashd`をノード兼ウォレットとして使用していた取引所、カストディアン、マイニングプール
* 同期済みのZebraに対し、サポート対象のフルノードウォレットRPCを利用したい運用者
* メインネット、テストネット、regtestを並行して必要とするdeveloper
* Zainoプロファイル経由で、プライベートなlightwalletd互換エンドポイントを構築する人

**通常は適していないケース**

* ZECの送受信だけが必要なエンドユーザー — ZODL / Zashi、Zingo、またはYWalletなどのライトウォレットを使用してください
* チェーンの検証だけを行いたい人 — Zebra（またはZakura）を単体で実行してください
* コンパクトブロックの提供だけを行いたい人 — Zalletを使用せず、Zebra + Zaino、またはZebra + lightwalletdを実行してください

---

## 関連ページ

* [Zebra フルノード](/zcash-tech/zebra-full-node) — Z3がラップするコンセンサスノード
* [Zaino](/zcash-tech/zaino) — 任意のインデクサープロファイル
* [フルノード](/zcash-tech/full-nodes) — Zebra、Zakura、および廃止されたzcashd
* [ライトウォレットノード](/zcash-tech/lightwallet-nodes) — ライトクライアントの接続先
* [Zakura ノード](/zcash-tech/zakura-node) — 代替フルノード。現在のZ3には含まれません
* [移行ガイド：zcashdからZebrad/Zalletへ](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [developer向けリソース](/start-here/developer-resources)

---

## リソース

* [Z3リポジトリ](https://github.com/ZcashFoundation/z3)
* [Z3契約（ポート、ボリューム、プロジェクト名）](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebraブック](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zalletブック](https://zcash.github.io/zallet/)
* [Zcashコミュニティフォーラム — Z3の更新情報](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3ランチャー](https://github.com/Jubrilabdulazeez/z3-launcher) — 公式Composeスタック上のコミュニティ制御プレーン（ZecHub Hackathon）
