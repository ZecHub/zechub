<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Z3 Stack

**Z3 Stack** は、Zcash Foundationがパッケージ化したノードプラットフォームです。**Zebra**（フルノード）と **Zallet**（フルノードウォレット）に、任意の **Zaino** インデクサーを組み合わせます。これは、コンセンサスとウォレットを1つのバイナリに同梱し、2026年7月18日にサポート終了を迎えたスタンドアロンの `zcashd` プロセスを置き換えることを意図しています。

リファレンス実装は、[github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) にある Docker Compose プロジェクトです。

---

## 要約

* Z3 は**新しいコンセンサスクライアントではありません**。これは、`zcashd`後のスタックを一緒に実行する方法です。Zebra がチェーンを検証し、Zallet が鍵を保持してウォレット RPC を提供し、Zaino（任意）が lightwalletd gRPC プロトコルを扱います。
* `zcashd` はノードとウォレットを同梱していました。Z3 は**これらの役割を分離します**。取引所、マイニングプール、その他のフルノードウォレット運用者は、Zebra 単体ではなく、この組み合わせへ移行します。
* **mainnet**、**testnet**、**regtest** の3つの分離された Compose プロジェクトを、1台のホストで実行できます。
* Mainnet の初回同期には、およそ **24～72時間**、約 **300 GB** が必要です。Regtest は数秒で立ち上がり、スタックを学ぶのに適しています。
* Zallet は Zaino のインデクサーライブラリを組み込み、JSON-RPC 経由で Zebra と通信します。外部ウォレット向けに lightwalletd 互換エンドポイントが必要な場合にのみ、スタンドアロンの Zaino サービスが必要です。
* Zallet は**ベータ版**です。破壊的変更により、ウォレットを削除して再作成する必要が生じる場合があります。大額資産向けの完成したカストディソフトウェアとして扱わないでください。

---

## Z3 が存在する理由

Zcashの歴史の大半において、`zcashd` はリファレンスフルノードであると同時に、唯一の本番向けフルノードウォレットでもありました。この設計を対象に、取引所、プール、カストディアンは統合していました。

`zcashd` は廃止されました。コンセンサスは [Zebra](/zcash-tech/zebra-full-node)（現在は [Zakura](/zcash-tech/zakura-node) も）へ移行しました。組み込みウォレットは [Zallet](https://github.com/zcash/zallet) へ移行しました。ライトウォレットの提供は、[lightwalletd](/zcash-tech/lightwallet-nodes) から [Zaino](/zcash-tech/zaino) へ移行中です。

これら3つは別々のリポジトリ、別々のリリースサイクル、別々の設定を持ちます。Z3 はそれらをつなぐものです。固定されたイメージ、ノード同期完了までウォレットを停止したままにするヘルスチェック、ネットワークごとのポートとボリューム、そして文書化された運用手順を提供します。

デフォルトの Compose ファイルが起動するのは Zebra と Zallet だけですが、この名前は非公式なエコシステム内の略称です。つまり、Zebra、Zaino、Zallet を指します。Zaino は必須の3番目のプロセスではなく、Compose プロファイルです。

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

| コンポーネント | Z3 における役割 | 必須？ |
| --- | --- | --- |
| **Zebra** | チェーンの同期・検証、ゴシップ、JSON-RPC、ヘルスエンドポイント | はい |
| **Zallet** | フルノードウォレット。Zaino ライブラリを組み込みます。Zebra JSON-RPC に直接接続します。スタンドアロンの Zaino コンテナは呼び出しません | はい |
| **Zaino** | スタンドアロンのインデクサー。外部ライトクライアント向けの lightwalletd 互換 gRPC と、エクスプローラーおよびフォーセット向け JSON-RPC プロキシを提供 | いいえ — `--profile indexer` |

Z3 は `docker-compose.yml` でイメージバージョンを固定します。別のタグが必要な場合は、`Z3_ZEBRA_IMAGE`、`Z3_ZAINO_IMAGE`、または `Z3_ZALLET_IMAGE` で上書きしてください。

---

## zcashd との違い

| | zcashd | Z3 |
| --- | --- | --- |
| 言語 | C++（Bitcoin フォーク） | Docker Compose でオーケストレーションされる Rust サービス |
| プロセスモデル | 1つのバイナリ：ノード + ウォレット | 分離されたノードおよびウォレットコンテナ |
| コンセンサス | 廃止済み（EOS：2026年7月18日） | Zebra（または別の互換ノード） |
| ウォレット | 組み込みの `wallet.dat` | Zallet、age で暗号化されたデータディレクトリ |
| ライトクライアント | 通常は別個の lightwalletd | 任意の Zaino プロファイル |
| 設定 | `zcash.conf` | `config/<network>/` 以下のネットワークごとのファイルと Compose 環境ファイル |
| 1台のホスト上のネットワーク | 面倒なポート競合 | `z3-mainnet`、`z3-testnet`、`z3-regtest` を第一級でサポート |

`zcashd` ウォレットをまだ使用している場合は、`wallet.dat` を Z3 ボリュームへコピーするのではなく、ZecHub の [移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) と Zallet の `migrate-zcashd-wallet` コマンドを使用してください。

---

## ネットワーク

Z3 は3つの独立した Compose プロジェクトです。ポートもボリュームも共有しません。

| ネットワーク | プロジェクト名 | 用途 | 初回同期 | 実資金 |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | 本番環境 | 24～72時間 | はい |
| **testnet** | `z3-testnet` | 公開テストネットワーク上のステージング | 2～12時間 | いいえ（テスト用 ZEC） |
| **regtest** | `z3-regtest` | ローカルでの練習：即時ブロック、ピアなし | 数秒 | いいえ |

新しい運用者はまず **regtest** から始め、RPC とウォレットのフローを確認してから、testnet または mainnet に移行してください。

---

## デフォルトのホストポート

3つのネットワークはすべて、1台のマシンで共存することを想定しています。以下の値は公開されたデフォルト値であり、すべて対応する `Z3_*` 環境変数で上書きできます。正式な一覧は [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml) です。

| サービス | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | （公開なし） |
| Zebra ヘルス（`/ready`） | 8080 | 18080 | 28080 |
| Zaino gRPC（インデクサープロファイル） | 8137 | 18137 | 28137 |
| Zaino JSON-RPC（インデクサープロファイル） | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Compose ネットワーク内では、サービスは名前で解決されます（`zebra`、`zaino`、`zallet`）。

---

## データとバックアップ

| ボリューム | 内容 | バックアップする？ |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra のチェーン状態（mainnet では約300 GB） | 任意 — 再同期可能 |
| `z3-<network>-zallet` | 暗号化されたウォレットデータベース**および**それを復号する age identity | **はい — バックアップが必須なのはこのボリュームだけです** |
| `z3-<network>-zaino` | インデクサー状態（インデクサープロファイル使用時のみ） | 任意 — 再構築可能 |
| `z3-<network>-cookie` | Zebra RPC cookie | いいえ — 再生成されます |

初回起動前にチェーン状態を別のディスクへ配置するには：

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` はスタックを停止し、ボリュームを保持します。`-v` を追加するとボリュームが削除され、完全な再同期が必要になります。プロファイルで制御されるサービス（インデクサー、モニタリング）も実際に停止されるよう、`--profile "*"` を含めてください。

---

## はじめに

前提条件：Docker Engine、Docker Compose v2.24.4以降、Git。`openssl` が必要なのは regtest のみです。

### Regtest（スタックを確認する最速の方法）

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

テストコマンドについては、[docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) を参照してください。

### Mainnet（2段階起動）

Zebra の同期が完了するまで、Zallet は使用できません。Zallet を早期に起動すると、`/ready` が真になるまで再起動ループします。

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

Testnet でも同じ手順で、`.env.testnet` と `./scripts/check-zebra-readiness.sh 18080` を使用します。

`config/<network>/` 以下の編集内容はローカルに残り、`git pull` 後も維持されます。

### 任意プロファイル

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Grafana のデフォルトポートは、3000（mainnet）、13000（testnet）、23000（regtest）です。

---

## 運用上の注意

* **固定されたイメージ。** Z3 は暗黙的に `:latest` へ追随しません。レビュー済みの変更でピンを更新するか、`Z3_<SERVICE>_IMAGE` を設定してください。
* **非 root コンテナ。** Linux capabilities は削除されています。ヘルスチェックにより、Zebra の準備が整うまでウォレットは起動しません。再起動ポリシーはデフォルトで有効です。
* **ログ。** Z3 はロギングドライバーを固定しません。Docker デーモン設定でサイズ上限を設けないと、24時間365日稼働するノードではログが無制限に増大します。
* **P2P。** Mainnet と testnet は Zebra の P2P ポートを公開します。NAT 配下では、ピアが接続すべきアドレスに `ZEBRA_NETWORK__EXTERNAL_ADDR` を設定してください。Regtest にはピアがありません。
* **ARM 上の Zaino。** 上流の Zaino イメージは `linux/amd64` 専用です。Apple Silicon では、ソースからビルドしない限りエミュレーションで動作します。Zebra と Zallet はマルチアーキテクチャ対応です。
* **共有ホスト。** デフォルトでは CPU やメモリの制限が設定されていません。マシンをノード専用にしない場合は、オーバーライドファイルで `deploy.resources.limits` を追加してください。

本番環境を想定したチェックリストと FAQ：[docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)、[docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)。

---

## Z3 を実行すべき人

**適しているケース**

* `zcashd` をノード兼ウォレットとして使用していた取引所、カストディアン、マイニングプール
* 同期済みの Zebra に対して、サポート対象のフルノードウォレット RPC を利用したい運用者
* Mainnet、testnet、regtest を並行して必要とする開発者
* Zaino プロファイルを通じて、プライベートな lightwalletd 互換エンドポイントを立ち上げる人

**通常は不適切な用途**

* ZEC の送受信だけが必要なエンドユーザー — ZODL / Zashi、Zingo、または YWallet などのライトウォレットを使用してください
* チェーンの検証だけが目的の人 — Zebra（または Zakura）を単体で実行してください
* compact block の提供だけが目的の人 — Zallet なしで、Zebra + Zaino、または Zebra + lightwalletd を実行してください

---

## 関連ページ

* [Zebra フルノード](/zcash-tech/zebra-full-node) — Z3 がラップするコンセンサスノード
* [Zaino](/zcash-tech/zaino) — 任意のインデクサープロファイル
* [フルノード](/zcash-tech/full-nodes) — Zebra、Zakura、および廃止済みの zcashd
* [ライトウォレットノード](/zcash-tech/lightwallet-nodes) — ライトクライアントの接続先
* [Zakura ノード](/zcash-tech/zakura-node) — 代替フルノード。現在の Z3 には含まれません
* [移行ガイド：zcashd から Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [開発者向けリソース](/start-here/developer-resources)

---

## リソース

* [Z3 リポジトリ](https://github.com/ZcashFoundation/z3)
* [Z3 契約（ポート、ボリューム、プロジェクト名）](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [The Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [The Zallet Book](https://zcash.github.io/zallet/)
* [Zcash コミュニティフォーラム — Z3 の更新情報](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — 公式 Compose スタック上のコミュニティ製コントロールプレーン（ZecHub Hackathon）
