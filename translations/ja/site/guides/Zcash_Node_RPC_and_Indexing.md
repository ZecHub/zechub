<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 実践ガイド：Zcash ノード（Node）RPCとブロックチェーン（Blockchain）インデックス作成

このページは、稼働中のZcashフルノード（full node）とJSON-RPC経由で通信し、ライトウォレットやエクスプローラーが照会できるインデクサーを接続するための手引きです。これは別のインストールガイドでは**ありません**。

`zcashd`後のスタックを起動する方法（Zebra + Zallet、任意のZaino、ポート、ボリューム、2段階起動）については、[Z3スタック](/zcash-tech/z3-stack)ページおよび[Z3リポジトリ](https://github.com/ZcashFoundation/z3)を参照してください。コンセンサスノードの背景情報については、[フルノード](/zcash-tech/full-nodes)および[Zebraフルノード](/zcash-tech/zebra-full-node)を参照してください。

`zcashd`は2026年7月18日にサポート終了となりました。新規の運用作業では、Zebra（または[Zakura](/zcash-tech/zakura-node)）とウォレット（Wallet）／インデクサーを対象とし、`zcashd`を対象にしないでください。

---

## 要点

* **JSON-RPC**は、運用者やウォレットがノードに対してチェーン（chain）の先端、ピア、（ウォレットプロセス上の）残高を問い合わせる方法です。Z3では、ZebraがノードRPCを提供し、ZalletがウォレットRPCを提供します。
* **Regtest**は、呼び出しを学ぶのに適した場所です。`http://127.0.0.1:8181`上のZ3のrpc-routerは、`zebra`／`zebra`を受け付け、ノードメソッドをZebraへ、ウォレットメソッドをZalletへ転送します。
* **メインネットとテストネット**では、Zebra上でCookie認証を使用します。Regtestのユーザー名／パスワードを公開ノードにコピーしないでください。
* **インデックス作成**は検証とは別の作業です。Zebraが検証を行います。[Zaino](/zcash-tech/zaino)（Z3の`--profile indexer`）はlightwalletd互換のgRPCを提供します。[Ztreamer](https://github.com/distractedm1nd/ztreamer)はZakuraをバックエンドとするインデクサーであり、Z3が提供するものではありません。
* ZainoのJSON-RPCおよびZebraの任意のインデクサーgRPCは、ループバックまたは信頼できるネットワーク用です。認証なしで公開インターネットに公開しないでください。

---

## 各呼び出しを処理するプロセス

| 必要なもの | 接続先 | Z3メインネットのホストポート | 注記 |
| --- | --- | --- | --- |
| チェーン先端、ピア、`getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie認証 |
| ウォレット残高、アドレス（address）、送信 | Zallet RPC | 28232 | 別プロセス、ベータソフトウェア |
| ライトウォレット向けコンパクトブロック（block） | Zaino gRPC | 8137 | `--profile indexer`を使用する場合のみ。平文h2c |
| エクスプローラー／フォーセット（faucet）JSON-RPCプロキシ | Zaino JSON-RPC | 8237 | 信頼できるネットワークのみ |
| 同期なしで上記すべてを練習 | Z3 regtest rpc-router | 8181 | ユーザー名`zebra`／パスワード`zebra` |

ポート一覧とComposeプロジェクト名：[Z3スタック](/zcash-tech/z3-stack)および[`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)。

---

## まずRegtestで練習する

Z3チェックアウトで、`./scripts/regtest-init.sh`および`docker compose --env-file .env.regtest up -d`の後に実行します。

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

正常な`getblockchaininfo`の結果には、`"blocks"`と`"upgrades"`マップが含まれます。curlが停止する場合はルーターが起動していません。`401`が返る場合は、ルーターではなくZebraを直接呼び出しています（Regtest上の直接Zebraは`29232`であり、変更していない限りルーターの認証情報を引き続き要求します）。

有効化ブロックのマイニング（mining）を含む完全なRegtestワークフロー：[Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

---

## メインネット／テストネットJSON-RPC（Cookie認証）

メインネットおよびテストネットでは、Zalletと任意のZainoサービスが**共有Cookieボリューム**を読み取ります。このCookieは起動時に再生成され、バックアップ対象ではありません。

ZebraのJSON-RPCを公開インターネットに公開**しないでください**。Composeネットワーク（`zebra:8232`）から呼び出すか、ループバックにバインドした場合に限りホストから呼び出してください。

Zebraが`/ready`になった後の一般的な運用確認：

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate`／`getmininginfo`はマイニングRPCです。単一の`zcashd`プロセスを想定していたプール（pool）は、テンプレート用にZebra（またはZakura）と、コインベース用に使用するウォレットを必要とします。[Zcashマイニングプール](/using-zcash/zcash-mining-pools)および[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)を参照してください。

---

## インデクサーを接続する

検証とインデックス作成は異なる作業です。

### Zaino（Z3が提供するもの）

ZainoはZebraを読み取り、lightwalletd互換のgRPC APIとJSON-RPCプロキシを提供します。ZalletはスタンドアロンのZainoコンテナを必要とせず、Zainoライブラリを組み込み、JSON-RPC経由でZebraと通信します。外部ライトウォレット、エクスプローラー、またはフォーセット向けには、スタンドアロンのZainoを起動してください。

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

クライアントをZainoに接続する前に、Zebraが同期されるまで待ってください。高いフェッチ並行性で追いつこうとする一括インデクサーはZebraの検証器を遅くする可能性があるため、インデクサーが追いつくまで`fetch_concurrency`を低い1桁に保ってください。

Regtest gRPC（平文、ポート`28137`）：

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

ZainoのgRPCは、すべてのネットワークで平文h2cです。ホスト外部から接続するものがある場合は、リバースプロキシでTLSを終端してください。詳細：[Zaino](/zcash-tech/zaino)および[Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

### その他のインデクサー（Z3以外）

* **lightwalletd** — 旧式のコンパクトブロックサーバーです。現在も広く導入されていますが、この役割の後継経路はZainoです。
* **Ztreamer** — Zakuraをバックエンドとするインデクサーおよび`CompactTxStreamer`実装です。Z3サービスではありません。[Ztreamerリポジトリ](https://github.com/distractedm1nd/ztreamer)を参照してください。
* **Zebra `rpc.indexer_listen_addr`** — Zebra内部の任意のgRPCリスナーです。Z3はこれを必要とせず、ホストにも公開しません。

---

## よくある間違い

**Zebraでウォレットメソッドを呼び出すこと。** `getwalletinfo`および送信RPCは、コンセンサスノードではなく、Zallet（または別のウォレット）に属します。

**Zebraが`/ready`になる前にZalletを起動すること。** Zalletは再起動ループに入ります。メインネット／テストネットでは`scripts/check-zebra-readiness.sh`を使用してください。

**Regtestの`zebra`／`zebra`をメインネットへコピーすること。** Cookie認証がメインネット／テストネットのデフォルトであるのには理由があります。

**Zainoをフルノードとして扱うこと。** Zebra（またはZakura）が検証を行います。Zainoがインデックス作成を行います。

**ZainoのJSON-RPCまたはZebraのインデクサーgRPCを公開すること。** これらのエンドポイントは、ループバックまたは信頼できるプライベートネットワーク用です。

**すべてのライトウォレットがすでにZainoを使用すると想定すること。** ウォレットの現在のリリースが実際に実装しているプロトコルを確認してください。

---

## 関連ページ

* [Z3スタック](/zcash-tech/z3-stack) — インストール、ポート、ボリューム、2段階起動
* [Zaino](/zcash-tech/zaino) — インデクサーの役割と運用者向け注記
* [フルノード](/zcash-tech/full-nodes)
* [Zebraフルノード](/zcash-tech/zebra-full-node)
* [ライトウォレットノード](/zcash-tech/lightwallet-nodes)
* [移行ガイド：zcashdからZebrad／Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)へ
* [ZingolibおよびZainoチュートリアル](/guides/zingolib-and-zaino-tutorial)

## リソース

* [Z3リポジトリ](https://github.com/ZcashFoundation/z3)
* [Z3 Regtestクックブック（curl／grpcurl）](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zalletブック](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**最終更新：**2026年9月
