<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 実践ガイド：Zcash ノード RPC とブロックチェーンのインデックス作成

このページは、稼働中のZcashフルノードと JSON-RPC 経由でやり取りし、ライトウォレットやエクスプローラーから照会できるインデクサーを接続するためのレシピ集です。2つ目のインストールガイドでは**ありません**。

`zcashd`以降のスタック（Zebra + Zallet、任意のZaino、ポート、ボリューム、2段階起動）の立ち上げ方については、[Z3 Stack](/zcash-tech/z3-stack)ページおよび[Z3 repository](https://github.com/ZcashFoundation/z3)を参照してください。コンセンサスノードの背景情報については、[Full Nodes](/zcash-tech/full-nodes)および[Zebra Full Node](/zcash-tech/zebra-full-node)を参照してください。

`zcashd`は2026年7月18日にサポート終了となりました。新たな運用作業では、`zcashd`ではなく、Zebra（または[Zakura](/zcash-tech/zakura-node)）とウォレット／インデクサーを対象にしてください。

---

## 要約

* **JSON-RPC** は、運用者やウォレットがノードにチェーン先端、ピア、そして（ウォレットプロセス上では）残高を問い合わせる方法です。Z3 では、Zebraがノード RPC を提供し、Zalletがウォレット RPC を提供します。
* **Regtest** は呼び出しを学ぶのに適した場所です。`http://127.0.0.1:8181`上の Z3 の rpc-router は`zebra` / `zebra`を受け付け、ノードメソッドをZebraへ、ウォレットメソッドをZalletへ転送します。
* **Mainnet と testnet** では、Zebra上で Cookie 認証を使用します。regtest のユーザー名／パスワードをパブリックノードへコピーしないでください。
* **インデックス作成**は検証とは別の仕事です。Zebraが検証します。[Zaino](/zcash-tech/zaino)（Z3 `--profile indexer`）はlightwalletd互換の gRPC を提供します。[Ztreamer](https://github.com/distractedm1nd/ztreamer)はZakuraをバックエンドとするインデクサーであり、Z3 に同梱されるものではありません。
* Zaino JSON-RPC およびZebraの任意のインデクサー gRPC は、ループバックまたは信頼できるネットワーク向けです。認証なしでパブリックインターネットに公開しないでください。

---

## どのプロセスがどの呼び出しに応答するか

| 必要なもの | 接続先 | Z3 mainnet ホストポート | 注記 |
| --- | --- | --- | --- |
| チェーン先端、ピア、`getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie 認証 |
| ウォレット残高、アドレス、送信 | Zallet RPC | 28232 | 別プロセス、ベータソフトウェア |
| ライトウォレット向けコンパクトブロック | Zaino gRPC | 8137 | `--profile indexer`使用時のみ、プレーンテキスト h2c |
| エクスプローラー／フォーセットの JSON-RPC プロキシ | Zaino JSON-RPC | 8237 | 信頼できるネットワークのみ |
| 同期なしで上記すべてを練習 | Z3 regtest rpc-router | 8181 | ユーザー名 `zebra` / パスワード `zebra` |

ポート一覧と Compose プロジェクト名：[Z3 Stack](/zcash-tech/z3-stack)および[`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)。

---

## まず regtest で練習する

Z3 のチェックアウト環境で、`./scripts/regtest-init.sh`と`docker compose --env-file .env.regtest up -d`の後に実行します。

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

正常な`getblockchaininfo`の結果には、`"blocks"`と`"upgrades"`マップが含まれます。curl が停止する場合はルーターが起動していません。`401`が表示される場合は、ルーターではなくZebraに直接接続しています（regtest 上の直接Zebraは`29232`であり、変更していない限りルーターの認証情報を引き続き要求します）。

アクティベーションブロックの採掘を含む完全な regtest ワークフロー：[Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

---

## Mainnet / testnet JSON-RPC（Cookie 認証）

mainnet および testnet では、Zalletと任意のZainoサービスが**共有 Cookie ボリューム**を読み取ります。この Cookie は起動時に再生成されるため、バックアップ対象ではありません。

Zebra JSON-RPC をパブリックインターネットに公開**しないでください**。Compose ネットワーク（`zebra:8232`）から呼び出すか、ループバックにバインドした場合に限りホストから呼び出してください。

Zebraが`/ready`になった後の一般的な運用確認：

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo`は採掘 RPC です。単一の`zcashd`プロセスを想定していたプールには、テンプレート用としてZebra（またはZakura）に加え、coinbase 用に使用するウォレットが必要です。[Zcash Mining Pools](/using-zcash/zcash-mining-pools)および[migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)を参照してください。

---

## インデクサーを接続する

検証とインデックス作成は異なる仕事です。

### Zaino（Z3 に同梱）

ZainoはZebraを読み取り、lightwalletd互換の gRPC API と JSON-RPC プロキシを提供します。ZalletにはスタンドアロンのZainoコンテナは不要です。Zainoライブラリを組み込み、JSON-RPC 経由でZebraと通信します。外部ライトウォレット、エクスプローラー、またはフォーセットを利用したい場合は、スタンドアロンのZainoを起動してください。

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

クライアントをZainoへ接続する前に、Zebraが同期されるまで待ってください。高いフェッチ並行数で追いつこうとする一括インデクサーは、Zebraの検証器を遅くする可能性があります。インデクサーが追いつくまで、`fetch_concurrency`は一桁台前半に保ってください。

Regtest gRPC（プレーンテキスト、ポート`28137`）：

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

Zaino gRPC は、すべてのネットワークでプレーンテキスト h2c です。ホスト外から接続する場合は、リバースプロキシで TLS を終端してください。詳細：[Zaino](/zcash-tech/zaino)および[Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

### その他のインデクサー（Z3 以外）

* **lightwalletd** — 旧式のコンパクトブロックサーバー。現在も広く導入されていますが、この役割の後継経路はZainoです。
* **Ztreamer** — Zakuraをバックエンドとするインデクサーおよび`CompactTxStreamer`実装です。Z3 のサービスではありません。[Ztreamer repository](https://github.com/distractedm1nd/ztreamer)を参照してください。
* **Zebra `rpc.indexer_listen_addr`** — Zebra内部の任意の gRPC リスナーです。Z3 はこれを必要とせず、ホストにも公開しません。

---

## よくある間違い

**Zebraでウォレットメソッドを呼び出す。** `getwalletinfo`および送信 RPC は、コンセンサスノードではなくZallet（または別のウォレット）に属します。

**Zebraが`/ready`になる前にZalletを起動する。** Zalletは再起動ループに入ります。mainnet/testnet では`scripts/check-zebra-readiness.sh`を使用してください。

**regtest の`zebra`/`zebra`を mainnet にコピーする。** Cookie 認証が mainnet/testnet のデフォルトであるのには理由があります。

**Zainoをフルノードとして扱う。** Zebra（またはZakura）が検証します。Zainoがインデックスを作成します。

**Zaino JSON-RPC またはZebraインデクサー gRPC を公開する。** これらのエンドポイントは、ループバックまたは信頼できるプライベートネットワーク向けです。

**すべてのライトウォレットがすでにZainoを利用できると想定する。** ウォレットの現在のリリースと、実際に実装しているプロトコルを照合してください。

---

## 関連ページ

* [Z3 Stack](/zcash-tech/z3-stack) — インストール、ポート、ボリューム、2段階起動
* [Zaino](/zcash-tech/zaino) — インデクサーの役割と運用者向け注記
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Migration Guide: zcashd から Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [ZingolibおよびZaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## リソース

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 regtest cookbook（curl / grpcurl）](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**最終更新：** 2026年9月
