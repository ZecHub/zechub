<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zcash Stack：KubernetesまたはDockerでライトウォレットサーバーを実行する

[Zcash Stack](https://github.com/zecrocks/zcash-stack)は、zec.rocksを手がけるチームが提供するオープンソースのデプロイキットです。Zcashフルノード、ライトウォレットサーバー、およびオプションの追加機能（Zaino、ブロックエクスプローラー、Tor隠しサービス、DNSシーダー、zecd、ブラウザーウォレット用のgRPC-webプロキシ）を、Kubernetes向けのHelmチャートとDocker Composeファイルにまとめています。zec.rockslightwalletdサーバーはすべて、このチャートから実行されます。このプロジェクトは[Zcash Community Grants](https://zcashcommunitygrants.org/)の資金提供を受けています。

このページでは、キットがデプロイするもの、インストール前に必要なもの、特に重要な設定をまとめます。チャートのバージョン**0.4.9**（2026年11月13日リリース）に基づいています。実運用で実行する前に、プロジェクト公式の[チャートのREADME](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)と[ワークショップの資料](https://github.com/zecrocks/zcash-stack/tree/main/docs)を参照してください。

## 要約

- **導入方法は2通りです。** Kubernetes向けのHelmチャート（主な対象は自前のNVMeハードウェア上のk3sですが、GKE StandardとAutopilotにも対応）と、単一マシン向けのDocker Composeファイルです。サーバー運用が初めてならDockerを、すでに複数台を運用しているならKubernetesを使うよう、ワークショップでは推奨しています。
- **チェーンノード1つとライトウォレットサーバーを実行します。** 推奨構成はZebra + lightwalletdです。バックエンドにはZakuraを使ってZebraを置き換えられ、Zainoでlightwalletdを置き換えるか、併用できます。
- **ディスク容量は約600 GiBを見込んでください。** Zebraのチェーン状態は2026年6月時点で約260 GiBあり、増加しています。ライトウォレットのキャッシュには約17 GiBが追加で必要です。フル同期には数日かかるため、チャートでは公開済みスナップショットから復元できます。
- **チャートではイメージのバージョンが固定されています。** 0.4.9では、NU7に追従するZebra 7.0.0、lightwalletd v0.6.1、Zakura 1.8.6、Zaino 0.8.0が指定されています。ネットワークアップグレードの前、およびZakuraのサポート終了ブロックに達する前に、チャートを更新してください。
- **サーバーを登録してください。** 公開サーバーの運用者は、サーバーの稼働状況をウォレットやユーザーが確認できるよう、サーバーを[hosh.zec.rocks](https://hosh.zec.rocks/zec)モニターに追加できます。

## デプロイされるもの

各コンポーネントは、チャートの[`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml)で切り替えます。デフォルトで有効なのはlightwalletdだけですが、チェーンノードが必要なため、サンプルファイルではZebraも有効にしています。

| コンポーネント | チャート0.4.9のイメージ | デフォルト | 役割 |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | オフ（サンプルではオン） | フルノードです。チェーンを検証し、ほかのすべてのコンポーネントにRPCを提供します |
| Zakura | `zakuracore/zakura:1.8.6` | オフ | Zebraフォークです。Zebraの代わりに、lightwalletdまたはZainoのドロップインバックエンドとして使えます |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | オン | モバイルおよびデスクトップのウォレット向けライトウォレットサーバー（gRPC）です |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | オフ | ライトウォレットにもサービスを提供するRustインデクサーです |
| ブロックエクスプローラー | `emersonian/zcash-explorer:v0.0.6` | オフ | ノードのJSON-RPCを読み取るウェブエクスプローラーです（ZainoはgRPCのみを提供するため、バックエンドにできません） |
| Tor | `osminogin/tor-simple:0.4.9.16` | オフ | lightwalletdまたはZainoを`.onion`サービスとして公開します |
| DNSシーダー | `zfnd/dnsseeder:v1.8.0` | オフ | 新しいノードがピアを見つけるのを支援します |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | オフ | シールドを優先するウォレットサーバーです（[zecd](/zcash-tech/zecd)を参照） |
| gRPC-webプロキシ | `envoyproxy/envoy:v1.40.2` | オフ | 生のgRPCではブラウザーから接続できないlightwalletdに、ブラウザーウォレットが接続できるようにします |
| WebZjsウォレット | `ghcr.io/zecrocks/webzjs-wallet` | オフ | ブラウザーウォレットです。同じホストでgRPC-webプロキシを有効にする必要があります |

バージョンについて、2点補足します。Zainoの上流版は[0.10.1](https://github.com/zingolabs/zaino/releases)ですが、チャートに含まれるイメージはまだ0.8.0です。新しいZainoの動作を前提にする前に、`values.yaml`を確認してください。また、Zakuraノードはリリースごとに定められたサポート終了ブロックでMainnetの同期を停止します。1.8.6の場合、そのブロックは3,643,309で、2026年12月5日ごろに到達する見込みです。さらに、1.8.0以降のx86-64ビルドはBMI2とADXに対応していないCPUでは起動しません。[Zakuraノード](/zcash-tech/zakura-node)のページで、どちらについても説明しています。

## Kubernetes：インストール前の準備

このチャートをデプロイする前に、クラスターごとに1度、次の3つを設定します。

1. **Ingressコントローラー。** チャートは標準のKubernetes`Ingress`を作成し、デフォルトでは`nginx`クラスを使います。ingress-nginxは、k3sとGKEの両方で同じ方法でgRPCを処理するため、推奨されます。k3sでは、`--disable traefik`を使ってk3sをインストールするか、Traefikを有効のままにして`ingress.className: traefik`と`ingress.backendProtocol: GRPC`を設定してください（その場合、通常のIngressをTraefik経由で使うとgRPCでHTTP 500が返されるため、チャートはTraefik`IngressRoute`を出力します）。GKEでは、組み込みの`gce`IngressクラスはgRPCをlightwalletdまたはZainoにルーティングできません。
2. **cert-managerとClusterIssuer。** Let's Encrypt証明書を自動取得するために必要です（`examples/cluster-issuer.yaml`。最初にステージング発行者でテストしてください）。GKE Autopilotでは、`--set global.leaderElection.namespace=cert-manager`を使ってcert-managerをインストールしてください。そうしないと、発行者の作成時にx509の「unknown authority」エラーが発生します。cert-managerを使わず、代わりに`<service>.ingress.tls.secretName`で独自の証明書を指定することもできます。
3. **StorageClass。** NVMeを使うk3sでは`local-path`で問題ありません。GKEではZebraにプロビジョニング済みのIOPSクラスを割り当て（リポジトリにはHyperdiskの例があります）、先にリージョンのディスククォータを引き上げてください。新しいGKEプロジェクトでは、リージョンあたりSSDが500 GB、Hyperdiskが500 GBまでしか許可されていません。チェーンノードには300～500 GBが必要なため、クォータを増やさないとボリュームは`Pending`のまま`QUOTA_EXCEEDED`になります。既存のStatefulSetでは、ボリュームを再作成しない限り`storageClassName`を変更できません。

各ホスト名のDNSレコードを、Ingressコントローラーの外部IPに向けてください。まだDNSがない場合は、実際のホスト名の隣に[sslip.io](https://sslip.io)の`203-0-113-7.sslip.io`のような名前を記載してください。埋め込まれたIPに解決されるため、証明書をすぐに発行できます。長期運用するサーバーでは、独自のホスト名をプライマリとして使ってください。

## Kubernetes：インストール

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml)のサンプルでは、Zebraを有効にし、lightwalletdを接続して、lightwalletdに40 GiBのキャッシュとTLS Ingressを設定し、ノードのRPCをクラスター内にとどめています。インストール前に、RPCのユーザー名とパスワードのプレースホルダーを変更してください。ほかのサンプルでは、testnet、GKE、可用性の高いGKE Autopilot、Tor隠しサービス、sslip.ioによる初期設定を扱っています。

アップグレードするには、`helm repo update`を実行し、helm-diffプラグイン（`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`）で変更内容を確認してから、同じ引数で`helm upgrade`を実行します。0.0.xのチャートから移行する場合は、先に[MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md)を読んでください。0.1.0では、以前のTraefik構成が標準のIngressとcert-managerに置き換えられ、valuesの構成も変更されています。

## リソースの目安

| | 通常時 | 初回同期 | ディスク |
|:--|:--|:--|:--|
| Zebra | 約0.1 vCPU、1.6 GiB | CPU、IOPS、メモリーを多く使用 | 約260 GiB（2026年6月時点）で増加中。チャートのデフォルトは500 GiB |
| lightwalletd | 約0.15 vCPU、165 MiB | キャッシュをブロックごとに構築 | 約17 GiB。チャートのデフォルトは40 GiB |

スタック全体で、約1.5 vCPUと4.5 GiBのメモリーを要求します。1台で運用する場合、チャートでは8 vCPU、32 GiBのRAM、約1 TBのNVMeを推奨しています（GKEでは、500 GiBのHyperdiskまたはpd-ssdボリュームを備えた`n2-standard-8`を使用します）。デフォルトの要求量はGKE Autopilotの最小要件を満たしており、同期中にCPUを一時的に多く使えるよう、CPU制限は設定されていません。

## 知っておきたい設定

**スナップショットからの復元。** `initSnapshot.url`、`gs://`、または`https://`を指定して`<chain>.initSnapshot.enabled: true`を設定すると、ジェネシスから同期せずに公開済みスナップショットから開始できます。復元処理は進行状況を記録し、中断されたダウンロードを適切にやり直し、以前のインストールで正常なボリュームがある場合は消去しません。スナップショットを使うと、信頼に関する確認を一部省略できます。スナップショット以降のブロックは引き続き検証され、不正なスナップショットは検証に失敗するブロックとして検出されます。ワークショップによると、最初から同期する場合は約10日、スナップショットから開始する場合は約10時間です。

**スケーリングとダウンタイムのない更新。** lightwalletdとZainoはノードの前段にある軽量なキャッシュなので、ダウンタイムなしでローリング更新できるよう`replicas: 2`を実行してください（レプリカが1を超えるとPodDisruptionBudgetが自動的に追加されます）。チェーンノードは負荷分散のために増やすものではありません。レプリカごとに専用ボリュームを持つフルノードが追加され、個別に同期が必要になるため、1つだけ、または冗長化のために2つ実行してください。

**受信ピア。** デフォルトでは、Zebraは外向きの接続のみを行います。`zebra.p2pPublic.enabled: true`はポート8233（testnetでは18233）で受信ピアを受け入れ、自分のアドレスを通知します。ベアメタルとk3sでは`externalAddrFrom: hostIP`、ノード自身のIPがプライベートなクラウドでは`nodeExternalIP`、GKE Autopilotで予約済みの静的IPを使う場合は`loadBalancer`を選んでください。

**TLSとgRPC。** TLSはIngressで終端し、クラスター内では通常のHTTP/2を使うため、複数のホスト名を1つのlightwalletdに向けられます。gRPCのメソッドパスには`pathType: Prefix`が必要なため、`path: /`と組み合わせてください。HTTPSへのリダイレクトが原因で最初の証明書発行に失敗する場合は、ステージング発行者で発行するか、一時的に`ingress.tls.sslRedirect: "false"`を設定してください。

**Tor隠しサービス。** クラスターにパブリックIPやドメインがない場合に便利です。

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

`kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname`でアドレスを確認し、ローカルのTorクライアントから[zecping](https://github.com/zecrocks/zecping)を使って接続をテストしてください：`./zecping -socks localhost:9150 -addr <address>.onion:443`。

**ネットワークアップグレード前後。** Zebraは古いバージョンのピアを禁止する場合があり、その結果同期が停止し、チェーンの更新が停止したというログが出ることがあります。禁止リストはメモリー上にあるため、`kubectl delete pod zebra-0`で消去できます。ポッドは再同期せず、同じチェーンデータを使って再起動します。

## Docker Compose

単一マシンで実行する場合は、リポジトリをクローンし、`docker/`フォルダーからデフォルトのファイルを起動します。

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml`は、x86上でZebra、lightwalletd、[Watchtower](https://containrrr.dev/watchtower/)を実行します。`compose.arm.yaml`はARMホストで同じ構成を実行します。Watchtowerは新しいイメージを自動取得します。デフォルトのファイルでは`zfnd/zebra:latest`タグを使うため、手動でアップグレードしなくてもノードは新しいZebraリリースに追従します。`compose.zaino.yaml`ではlightwalletdがZainoに置き換わりますが、古いコミュニティイメージ（`emersonian/zcash-zaino:0.1.2-zr4`）が固定されているため、使用前に確認してください。ほかのファイルでは、CaddyのTLSフロントエンド、VPSプロキシ、自宅のノード向けautosshトンネルを追加できます。

サーバーの寄付用アドレスとして公開する独自の統合アドレスを、`.env`ファイルの`LIGHTWALLETD_DONATION_ADDRESS`に設定してください。最初の`docker compose up`の前に`docker/`フォルダーから`./download-snapshot.sh`を実行すると、最初から同期する代わりにチェーンのスナップショットをダウンロードします。

## 接続と監視

ワークショップの第2回では、サーバーを公開する方法を扱います。パブリック静的IPを使う方法、自宅のIPをSSHトンネルでVPSやTailscale Funnelの背後に隠す方法、Tor専用サーバーを使う方法です。ウォレットから接続先を指定して結果をテストしてください（ZODLの「詳細設定」を開きます。[ウォレットでサーバーを変更する](/zcash-tech/lightwallet-nodes)を参照）。または、gRPCクライアントで`GetLightdInfo`を呼び出してテストできます。

監視について、ワークショップの第3回では手動のDockerコマンドを紹介し、公開サーバーを[hosh](https://hosh.zec.rocks/zec)のzec.rocks稼働状況モニターに登録するよう提案しています。登録するには、ホスト名とポートをhoshのサーバーリストに追加するプルリクエストを作成します。各手順については、[zec.rocksワークショップフォーラム](https://workshops.zec.rocks)で質問できます。

## よくある間違い

**チェーンノードなしでlightwalletdをインストールする。** lightwalletdはZebra（またはZakura）から読み取ります。どちらかを有効にするか、有効化済みのサンプルファイルから始めてください。

**サンプルのRPC認証情報をそのまま使う。** サンプルにはプレースホルダーが含まれています。RPCはクラスター内にとどまりますが、それでも認証情報を変更してください。

**GKEのデフォルトのディスククォータでチェーンノードを実行する。** ボリュームがバインドされません。インストール前にリージョンのクォータを引き上げてください。

**負荷のためにZebraをスケーリングする。** Zebraのレプリカを増やすたびに、フル同期が1つ追加されます。代わりにlightwalletdまたはZainoをスケーリングしてください。

**ネットワークアップグレード中も古いチャートを使い続ける。** アップグレード前のノードは、アップグレード後にMainnetへの追従を停止します（ZebraはNU7以降、7.0.0が必要です）。`helm repo update`を実行し、アクティベーションブロックの高さとZakuraのサポート終了ブロックに達する前にチャートをアップグレードしてください。

## 関連ページ

- [Zcashライトウォレットノード](/zcash-tech/lightwallet-nodes)：ライトウォレットサーバーから見える情報と見えない情報、および公開サーバーについて説明しています。
- [Zebraフルノード](/zcash-tech/zebra-full-node)：このスタックで実行するバリデーターです。
- [Zakuraノード](/zcash-tech/zakura-node)：チャートで代わりに実行できるZebraフォークです。
- [Zaino](/zcash-tech/zaino)：Rustインデクサーです。
- [zecd](/zcash-tech/zecd)：チャートに追加できるウォレットサーバーです。
- [ZcashノードRPCとインデックス作成](/guides/zcash-node-rpc-and-indexing)：ZebraのRPC、Zallet、インデクサーについて説明しています。
- [ZebraをAkashネットワーク](/guides/akash-network-zebra)で実行する方法：ノードをホストする別の方法です。

## リソース

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack)（リポジトリ、リリース、サンプル）
- [Zcash StackHelmチャートのREADME](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [ワークショップ資料：同期、接続、監視](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [DockerREADME](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hubの掲載ページ](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec)（公開サーバーモニター）

**最終更新日：** 2026年11月（チャート0.4.9）
