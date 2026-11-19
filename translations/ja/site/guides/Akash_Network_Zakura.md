# AkashネットワークでZakuraを実行する方法

[awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura)テンプレートを使って、**Zakura** Zcashフルノードを構築する手順です。

Zakuraは、コンセンサス互換のZcashノード（Zebraからフォーク）で、高速同期、ネイティブのプルーニング、スナップショットによるブートストラップに対応しています。このテンプレートでは**`zakuracore/zakura:1.8.1`**を固定しています（ダイジェストで固定済みです。`:latest`や`1.1.1`は使用しないでください）。

### 利用できる機能

- メインネットのP2P：コンテナポート **8233**。グローバルに公開されます（下記のポートマッピングを参照）
- 永続化されるプルーニング済み状態（デフォルト64 GiB）。初回起動時にValarスナップショットからブートストラップします
- Prometheus **9999**とヘルスチェック **8080**（内部用、公開URIなし）
- JSON-RPC **8232**は同じ場所に配置された**lightwalletd**向けの内部用です。LWDはコンテナポート **9067**で待ち受け、グローバルに公開されます

SDLの機能フラグ（true/false）：`ENABLE_METRICS`、`ENABLE_HEALTH`、`ENABLE_RPC`、`ENABLE_LIGHTWALLETD`。lightwalletdが有効な場合、Cookie認証は無効になります。lightwalletdはCookieファイルを読み取れないためです。

### 支払いに使うサイト

SDLは同じです。2つのAkashウェブUIは、**支払い方法**が異なります。

| サイト | 支払い方法 | ウォレット |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 従来型のウェブ決済（カード／Consoleが提供する法定通貨決済手段） | Consoleアカウント |
| [air.akash.network](https://air.akash.network) | ネイティブなAkashチェーンでの支払い（AKT / ACT） | **Keplr** |

Keplrでオンチェーン支払いをしたい場合は**Air**を使ってください。従来型のウェブ決済を利用する場合は**Console**を使ってください。ConsoleではKeplrのネイティブ決済はできません。

### デプロイ

**ウェブ決済（Console）**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Akashによるネイティブな支払いとKeplr（Air）**

[このテンプレートをAirで開く](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. 上記の該当するリンク（ConsoleまたはAir）を開きます。
2. Airでは**Keplr**を接続し、デポジットとリースに必要なAKT/ACTがあることを確認します。Consoleでは、画面に表示されるウェブ決済を完了します。
3. まだ入力されていない場合は`zcash-zakura/deploy.yaml`を読み込みます。
4. デポジットを行い、入札を承認して、リースが開始するまで待ちます。
5. ログに、初回起動時のスナップショットのダウンロードに続いて`zakurad start`が表示されます。
6. **Leases → URIs**を開きます。8233や9067をパブリックIPに付けたものではなく、プロバイダーが割り当てたホストとポートを使ってください。

### Akashによるポートの公開方法

SDLの`port` / `as`（8233、9067、8232）は**コンテナ**ポートです。Zakuraは引き続き8233で待ち受け、lightwalletdは9067で待ち受けます。RPCはLWDサイドカー（`zakura:8232`）向けに8232で待ち受けます。

これらはプロバイダーのパブリックIP上のポートでは**ありません**。

**デフォルト（このテンプレート）：** 専用IPはありません。各`global: true`TCP公開ポートは、共有プロバイダーホスト上の**ランダムな高位ポート**に割り当てられます。Console/Airでは、リースURIとして次のように表示されます。

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

ピアには**8233**のURIを案内してください（`provider.example:31482`）。コンパクトウォレットには**9067**のURIを使います（自分でTLSを終端しない限り、TLSは無効です）。`ZAKURA_NETWORK__EXTERNAL_ADDR`には、`:8233`ではなく、割り当てられたP2PのURIを設定してください。

**内部用**の公開ポート（`8232`RPC、`9999`メトリクス、`8080`ヘルスチェック）はデプロイメントネットワーク内にとどまります。公開URIはありません。

**専用IP**（`endpoints` / `kind: ip`）は有料の追加機能で、このテンプレートには含まれていません。パブリックIPを固定でき、場合によっては`as`ポートも固定できます。安定した`host:8233`が必要な場合にのみ追加してください。

### アーカイブとプルーニング

デフォルトは**プルーニングあり**（スナップショット約11 GiB、ディスク64 GiB）です。履歴全体が必要な場合は`SNAPSHOT_KIND=archive`を設定し、ディスクを350 GiB以上に増やして、`ZAKURA_STATE__STORAGE_MODE=archive`を設定してください。

### 関連リンク

- [Zebra（Akash](/guides/akash-network-zebra)上）— Zcash Foundation `zebrad`（履歴全体、スナップショットなし）
- [Thus Spoke Zakura（Akash](/guides/thus-spoke-zakura-akash)上）— Regtestダッシュボード＋アプリ（v0.4.1）
- Zakuraソースコード：[github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- スナップショット：[zakura.com/snapshots/](https://zakura.com/snapshots/)
