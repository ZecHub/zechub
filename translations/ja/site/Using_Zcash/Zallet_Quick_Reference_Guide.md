<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet クイックリファレンスガイド

## 要約

- Zallet は、Rust で記述されたフルノード（full node）Zcash ウォレット（wallet）です。これは以前 zcashd 内に存在していたウォレットを置き換えるものです。
- zcashd は2026年7月18日にサポート終了に伴い停止し、現在は稼働していません。現在は Zebra がノード（node）側を、Zallet がウォレット側を担当します。
- Zallet は、以前 `zcash-cli` を使用していたのと同様に、`zallet rpc <command>` を使ってコマンドラインから操作します。
- コマンド名の後に続くすべての引数は有効なJSONである必要があるため、文字列値には二重引用符を付けたままにします。
- Zallet はベータ版です。リリース間でコマンドが変更される場合があり、すべての zcashd RPCがまだ移植されているわけではありません。

## 基本説明

Zallet は、zcashd ウォレットで使用されていたものと同じインターフェース形式であるJSON-RPCを通じて機能を提供します。残高確認、アカウント作成、シールドされた（shielded）支払い（payment）の送信など、ウォレットに実行させたい操作はすべて `zallet rpc` に渡すコマンドです。

以前の `zcash-cli` の使用方法とは2つの違いがあり、初期段階でのミスの大半はこれらに起因します。まず、引数は素のテキストではなく有効なJSONでなければならないため、文字列引数ではシェルの引用符の内側に独自の引用符を含めます。次に、利用可能なコマンドのセットは実行中のベータリリースによって異なるため、このページを含むどの文書よりも、バイナリに組み込まれた一覧の方が信頼できます。

利用可能なすべてのRPCを一覧表示するには:

```bash
zallet rpc help
```

特定のRPCの詳細なヘルプを取得するには:

```bash
zallet rpc help '"<command>"'
```

> **重要:** メソッド名の後に続くすべての引数は、**有効なJSONでなければなりません**。  
> 文字列値は `"value"` のように記述する必要があります（二重引用符を含みます）。

## よくある間違い

- **文字列引数の内側の引用符を省略すること。** `zallet rpc validateaddress u1abc...` は、アドレス（address）がJSONとして渡される必要があるため失敗します。`'"u1abc..."'` のように記述する必要があります。
- **すべてのRPCがここに存在すると想定すること。** 移植はまだ進行中です。一部のメソッドは同一の動作をしますが、別の使用方法が必要なものもあり、まったく引き継がれないものもあります。
- **このページをバイナリよりも権威あるものとして扱うこと。** Zallet はベータ版であり、急速に変化しています。ここにあるコマンドが動作しない場合は、何かが壊れていると判断する前に `zallet rpc help` を確認してください。
- **Zallet がノードであると期待すること。** これはこのペアのウォレット側です。Zebra がノードを実行し、Zallet がそれと通信します。

## RPCコマンド

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| パラメータ   | 型   | 必須 | 説明              |
|-------------|--------|----------|--------------------------|
| hexstring   | 文字列 | はい      | トランザクション（transaction）の16進文字列   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| パラメータ   | 型   | 必須 | 説明     |
|-------------|--------|----------|-----------------|
| hexstring   | 文字列 | はい      | スクリプトの16進数      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| パラメータ  | 型   | 必須 | 既定値 | 説明                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | 文字列 | はい      |         | トランザクションID                       |
| verbose    | 数値 | いいえ       | 0       | `0` = 16進数、0以外 = JSONオブジェクト    |
| blockhash  | 文字列 | いいえ       |         | このブロック（block）に検索を限定する        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

パラメータはありません。

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

パラメータはありません。

---

### listaddresses

```bash
zallet rpc listaddresses
```

パラメータはありません。

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

パラメータはありません。OpenRPCスキーマを返します。

---

### stop

```bash
zallet rpc stop
```

パラメータはありません。（Regtestのみ）

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| パラメータ | 型   | 必須 | 説明             |
|-----------|--------|----------|-------------------------|
| address   | 文字列 | はい      | 公開型（transparent）アドレス     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| パラメータ  | 型   | 必須 | 説明             |
|------------|--------|----------|-------------------------|
| address    | 文字列 | はい      | 公開型アドレス     |
| signature  | 文字列 | はい      | Base64署名（signature）        |
| message    | 文字列 | はい      | 元のメッセージ        |

---

### walletlock

```bash
zallet rpc walletlock
```

パラメータはありません。

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| パラメータ   | 型   | 必須 | 説明                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | 文字列 | はい      | ウォレットのパスフレーズ                    |
| timeout     | 数値 | はい      | ウォレットをロック解除状態に保つ秒数  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| パラメータ             | 型   | 必須 | 説明                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | 文字列 | はい      | 変換するP2PKHアドレス   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| パラメータ | 型   | 必須 | 説明                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | 文字列 | はい      | 支出鍵（spending key）をエクスポートするSaplingアドレス     |

> ウォレットはロック解除されている必要があります。Sapling の支出鍵のみをエクスポートします。

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| パラメータ     | 型   | 必須 | 説明     |
|---------------|--------|----------|-----------------|
| account_uuid  | 文字列 | はい      | アカウントUUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| パラメータ          | 型            | 必須 | 説明                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | 文字列 / 数値 | はい      | アカウントUUIDまたはZIP-32アカウントインデックス     |
| receiver_types     | 文字列の配列 | いいえ       | 含めるレシーバーの種類                |
| diversifier_index  | 数値 | いいえ       | 特定のダイバーシファイアインデックス               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| パラメータ | 型            | 必須 | 既定値 | 説明                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | 文字列 / 数値 | はい      |         | アカウントUUIDまたはZIP-32インデックス     |
| minconf   | 数値 | いいえ       | 1       | 最小確認数            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| パラメータ | 型   | 必須 | 既定値 | 説明               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | 数値 | いいえ       | 1       | 最小確認数     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| パラメータ     | 型   | 必須 | 説明                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | 文字列 | はい      | 人が読める名前                      |
| seedfp        | 文字列 | いいえ       | ウォレットに複数のシードがある場合は必須    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| パラメータ     | 型   | 必須 | 既定値 | 説明                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | 数値 | いいえ       | 1       | 最小確認数                |
| as_of_height  | 数値 | いいえ       |         | この高さ時点で照会します（`-1` = 先端） |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| パラメータ    | 型            | 必須 | 説明                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | 文字列の配列 | いいえ       | 操作ID（完了済みすべての場合は省略）    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| パラメータ    | 型            | 必須 | 説明                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | 文字列の配列 | いいえ       | 操作ID（すべての場合は省略）   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| パラメータ          | 型    | 必須 | 既定値 | 説明                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | 数値  | いいえ       | 1       | 最小確認数           |
| include_watchonly  | 真偽値 | いいえ       | false   | 監視専用の残高を含める     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| パラメータ  | 型    | 必須 | 既定値 | 説明                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | 文字列  | はい      |         | アカウントUUID                         |
| hex_data   | 文字列  | はい      |         | 16進公開鍵またはリディームスクリプト      |
| rescan     | 真偽値 | いいえ       | true    | インポート後に再スキャンする                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| パラメータ     | 型   | 必須 | 既定値        | 説明                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | 文字列 | はい      |                | Sapling 拡張支出鍵            |
| rescan        | 文字列 | いいえ       | `"whenkeyisnew"` | `"yes"`、`"no"`、または`"whenkeyisnew"`   |
| start_height  | 数値 | いいえ       | 0              | 再スキャン開始の高さ                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| パラメータ          | 型    | 必須 | 既定値 | 説明                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | 真偽値 | いいえ       | true    | 各アカウントのアドレスも返す   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| パラメータ | 型   | 必須 | 説明                          |
|-----------|--------|----------|--------------------------------------|
| status    | 文字列 | いいえ       | ステータスでフィルタリング（例: `"success"`）  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| パラメータ      | 型   | 必須 | 説明                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | 文字列 | いいえ       | 1つのアカウントに限定する         |
| start_height   | 数値 | いいえ       | 含まれる下限        |
| end_height     | 数値 | いいえ       | 含まれない上限        |
| offset         | 数値 | いいえ       | この件数の結果をスキップする       |
| limit          | 数値 | いいえ       | 返す結果の最大数    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| パラメータ         | 型   | 必須 | 説明                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | 文字列 | はい      | 確認する統合アドレス   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| パラメータ          | 型            | 必須 | 既定値 | 説明                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | 数値          | いいえ       | 1       | 最小確認数                |
| maxconf            | 数値          | いいえ       | ∞       | 最大確認数                |
| include_watchonly  | 真偽値         | いいえ       | false   | 監視専用を含める                   |
| addresses          | 文字列の配列 | いいえ       |         | これらのアドレスにフィルタリングする            |
| as_of_height       | 数値          | いいえ       |         | この高さ時点で照会する              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| パラメータ | 型  | 必須 | 説明                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | 配列 | はい      | オブジェクトの配列: `name`、`seedfp`、`zip32_account_index`、`birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| パラメータ        | 型            | 必須 | 既定値         | 説明                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | 文字列          | はい      |                 | 送信元アドレスまたは`"ANY_TADDR"`                  |
| amounts          | オブジェクトの配列 | はい      |                 | 受取人（`address`、`amount`、任意の`memo`）|
| minconf          | 数値          | いいえ       |                 | 最小確認数                            |
| fee              | null            | いいえ       |                 | `null` でなければなりません（ZIP-317のみ）                    |
| privacy_policy   | 文字列          | いいえ       | `"FullPrivacy"` | プライバシー（privacy）ポリシー文字列                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| パラメータ        | 型   | 必須 | 説明                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | 文字列 | はい      | 公開型アドレスまたはアカウントUUID              |
| toaddress        | 文字列 | はい      | シールドされた送信先                             |
| fee              | null   | いいえ       | `null` でなければなりません                                   |
| limit            | 数値 | いいえ       | シールドするコインベースUTXOの最大数           |
| memo             | 文字列 | いいえ       | 16進エンコードされたメモ（memo）                                 |
| privacy_policy   | 文字列 | いいえ       | `AllowRevealedSenders` または `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| パラメータ | 型   | 必須 | 説明     |
|-----------|--------|----------|-----------------|
| txid      | 文字列 | はい      | トランザクションID  |

---

## 関連ページ

- [移行ガイド: zcashd から Zebrad および Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — 既存の zcashd セットアップから段階的に移行する方法
- [Zebra フルノード](/zcash-tech/zebra-full-node) — Zallet と連携して動作するノード実装
- [フルノード](/zcash-tech/full-nodes) — フルノードの実行に必要なことと、実行する理由
- [ウォレット](/using-zcash/wallets) — フルノードが必要以上の場合に使える軽量なウォレットの選択肢
- [トランザクション](/using-zcash/transactions) — シールドされたトランザクションと公開型トランザクションの違い
