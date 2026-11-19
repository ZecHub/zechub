# Thus Spoke Zakura（Regtest）上の Akash

Akashで **Thus Spoke Zakura v0.4.1** のスタックを実行します。Zakura Regtest、lightwalletd、ウォレットの**ダッシュボード / HTTP API**が含まれます。テスト用コインに価値はありません。ここにメインネットの ZEC を送らないでください。

テンプレート: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

上流: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) タグ **v0.4.1**

### イメージ

| サービス | イメージ |
| --- | --- |
| ダッシュボード + API（`app`） | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0`（0.4.1 ランチャーにコンパイル済みのピン） |

### セルフブートストラップ

初回起動時に `app` コンテナは永続ボリューム上で `ths-server init` を実行し、その後 `ths-server serve` を実行します。Zakura の JSON-RPC と lightwalletd が起動するまで Serve が再試行します。プロバイダー上で `ths` を実行する必要はありません。SDL がランタイムです。

### Akash によるポート公開の仕組み

SDL の `port` / `as` は**コンテナ**ポートです。アプリは **8080**（`THS_LISTEN`）で待ち受けます。lightwalletd は **9067**、Zakura の RPC は **18232**、P2P は **18233** で待ち受けます。デプロイ内のサービスはすでにこれらのポート（`http://zakura:18232`、`http://lightwalletd:9067`）を使用しています。

これらはプロバイダーのパブリック IP 上のポート**ではありません**。

**デフォルト（このテンプレート）:** 専用 IP はありません。

| サービス | コンテナの待受ポート | SDL `as` | リース上での表示 |
| --- | --- | --- | --- |
| `app`（ダッシュボード + HTTP API） | 8080 | 80（HTTP） | イングレスのホスト名。多くの場合 80/443 経由です — **この URI をブラウザーで開いてください** |
| `lightwalletd` | 9067 | 9067（TCP、グローバル） | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232（TCP、グローバル） | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233（TCP、グローバル） | `host:&lt;random-high-port&gt;` |

リースの準備ができたら、**Leases → URIs** が正しい情報の参照元です。ダッシュボード用の **`app`** URI を開いてください（ローカルで `ths` が開くのと同じ UI です）。軽量クライアントは **lightwalletd** URI（`THS_LIGHTWALLETD_TLS=false`）に接続してください。専用 IP のリースによってポートが公開されていない限り、プロバイダー IP に `:8080`、`:80`、`:9067` を入力しないでください。

**専用 IP**（`endpoints` / `kind: ip`）は有料オプションで、このテンプレートには**含まれていません**。パブリック IP を固定でき、`as` ポートも公開できる場合があります。必要でない限り、無効のままにしてください。

### どのサイトを使うか（支払い）

SDL は同じです。2つの Akash の Web UI では、**支払い方法**が異なります。

| サイト | 支払い | ウォレット |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 従来型の Web チェックアウト（Console が提供するカード / 法定通貨の決済手段） | Console アカウント |
| [air.akash.network](https://air.akash.network) | ネイティブの Akash チェーンによる支払い（AKT / ACT） | **Keplr** |

Keplr でオンチェーン支払いをしたい場合は **Air** を使ってください。従来型の Web 決済フローを使いたい場合は **Console** を使ってください。

### デプロイ

**Web 決済（Console）**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Akash によるネイティブ決済（Keplr、Air）**

[Air でこのテンプレートを開く](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

テンプレートからデプロイを作成し、入札を承認します。`app` のログで `ths-server serve` が稼働し続けていることを確認してから、ダッシュボード用の **`app` URI** を開いてください。

### 関連情報

- [Zakura — Akash](/guides/akash-network-zakura) 上のメインネット / テストネット検証ノード
- [Zebra — Akash](/guides/akash-network-zebra) 上
- 書籍: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
