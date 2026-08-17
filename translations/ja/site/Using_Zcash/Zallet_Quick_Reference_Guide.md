---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet クイックリファレンスガイド

## 要点

- Zallet は Rust で書かれたフルノード対応の Zcash ウォレットです。以前 zcashd の内部にあったウォレットを置き換えるものです。
- zcashd は 2026年7月18日にサポート終了停止を迎え、現在はもう動作しません。現在は Zebra がノード側を担当し、Zallet がウォレット側を担当します。
- Zallet は `zallet rpc <command>` というコマンドラインで操作します。使い方は以前 `zcash-cli` を使っていたときとよく似ています。
- コマンド名の後に続くすべての引数は有効な JSON でなければならず、そのため文字列の値にはダブルクォートを含めたままにする必要があります。
- Zallet はまだアルファ版です。コマンドはリリースごとに変わる可能性があり、まだすべての zcashd RPC が移植されているわけではありません。

## 基本説明

Zallet は JSON-RPC を通じて機能を提供します。これは、zcashd のウォレットが使っていたものと同じ種類のインターフェースです。残高の確認、アカウントの作成、シールド送金の送信など、ウォレットに実行させたいことはすべて `zallet rpc` に渡すコマンドになります。

以前の `zcash-cli` の習慣と異なる点は 2 つあり、初期のミスの大半はここから生じます。1 つ目は、引数が生のテキストではなく有効な JSON でなければならないことです。そのため文字列引数は、シェルのクォートの内側でさらに自前の引用符を持つ必要があります。2 つ目は、利用可能なコマンドの集合が実行しているアルファ版のリリースによって異なることです。そのため、あなたのバイナリに組み込まれている一覧のほうが、このページを含むどの文章よりも信頼できます。

利用可能な RPC をすべて一覧表示するには:

```bash
zallet rpc help
```

特定の RPC の詳細なヘルプを表示するには:

```bash
zallet rpc help '"<command>"'
```

> **重要:** メソッド名の後に続くすべての引数は **有効な JSON** でなければなりません。  
> 文字列の値は `"value"` のように記述する必要があります（ダブルクォートを含む）。

## よくある間違い

- **文字列引数の内側のクォートを落としてしまうこと。** `zallet rpc validateaddress u1abc...` は失敗します。これは、そのアドレスが JSON として渡されなければならないためです。`'"u1abc..."'` のように書く必要があります。
- **すべての zcashd RPC がここに存在すると考えること。** 移植はまだ進行中です。まったく同じように動作するメソッドもあれば、使い方が異なるものもあり、まったく引き継がれないものもあります。
- **このページが自分のバイナリよりも権威があると考えること。** Zallet はアルファ版であり、変化が速いです。ここに書かれたコマンドが動かない場合は、何かが壊れていると判断する前に `zallet rpc help` を確認してください。
- **Zallet をノードだと思い込むこと。** これは組み合わせのうちウォレット側です。ノードは Zebra が動かし、Zallet はそれと通信します。

## RPC コマンド

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter   | Type   | Required | Description              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | yes      | トランザクションの16進文字列   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter   | Type   | Required | Description     |
|-------------|--------|----------|-----------------|
| hexstring   | string | yes      | スクリプトの16進文字列      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter  | Type   | Required | Default | Description                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | yes      |         | トランザクション ID                       |
| verbose    | number | no       | 0       | `0` = 16進文字列, 非ゼロ = JSON オブジェクト    |
| blockhash  | string | no       |         | 検索対象をこのブロックに限定する        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

引数はありません。

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

引数はありません。

---

### listaddresses

```bash
zallet rpc listaddresses
```

引数はありません。

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

引数はありません。OpenRPC スキーマを返します。

---

### stop

```bash
zallet rpc stop
```

引数はありません。（Regtest のみ）

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter | Type   | Required | Description             |
|-----------|--------|----------|-------------------------|
| address   | string | yes      | Transparent アドレス     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter  | Type   | Required | Description             |
|------------|--------|----------|-------------------------|
| address    | string | yes      | Transparent アドレス     |
| signature  | string | yes      | Base64 署名        |
| message    | string | yes      | 元のメッセージ        |

---

### walletlock

```bash
zallet rpc walletlock
```

引数はありません。

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter   | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | yes      | ウォレットのパスフレーズ                    |
| timeout     | number | yes      | ウォレットのロック解除を維持する秒数  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter             | Type   | Required | Description                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | yes      | 変換する P2PKH アドレス   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | yes      | 支出キーをエクスポートする Sapling アドレス     |

> ウォレットのロックが解除されている必要があります。エクスポートされるのは Sapling の支出キーのみです。

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter     | Type   | Required | Description     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | yes      | アカウント UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter          | Type            | Required | Description                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | yes      | アカウント UUID または ZIP-32 アカウント index     |
| receiver_types     | array of string | no       | 含める受信者タイプ                |
| diversifier_index  | number          | no       | 特定の diversifier index               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Type            | Required | Default | Description                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | yes      |         | アカウント UUID または ZIP-32 index     |
| minconf   | number          | no       | 1       | 最小承認数            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Type   | Required | Default | Description               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | no       | 1       | 最小承認数     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter     | Type   | Required | Description                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | yes      | 人が読める名前                      |
| seedfp        | string | no       | ウォレットに複数のシードがある場合は必須    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter     | Type   | Required | Default | Description                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | no       | 1       | 最小承認数                |
| as_of_height  | number | no       |         | この高さ時点で照会する（`-1` = tip） |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter    | Type            | Required | Description                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | no       | オペレーション ID（省略時は完了済みすべて）    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter    | Type            | Required | Description                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | no       | オペレーション ID（省略時はすべて）   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter          | Type    | Required | Default | Description                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | no       | 1       | 最小承認数           |
| include_watchonly  | boolean | no       | false   | watch-only の残高を含める     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter  | Type    | Required | Default | Description                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | yes      |         | アカウント UUID                         |
| hex_data   | string  | yes      |         | 16進公開鍵または redeem script      |
| rescan     | boolean | no       | true    | インポート後に再スキャン                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter     | Type   | Required | Default        | Description                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | yes      |                | Sapling 拡張支出キー            |
| rescan        | string | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, または `"whenkeyisnew"`   |
| start_height  | number | no       | 0              | 再スキャン開始高さ                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter          | Type    | Required | Default | Description                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | no       | true    | 各アカウントのアドレスも返す   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | no       | ステータスで絞り込む（例: `"success"`）  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter      | Type   | Required | Description                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | no       | 1 つのアカウントに限定する         |
| start_height   | number | no       | 下限を含む        |
| end_height     | number | no       | 上限を含まない        |
| offset         | number | no       | この件数だけ結果をスキップ       |
| limit          | number | no       | 返す最大件数    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter         | Type   | Required | Description                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | 調べる Unified Address   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter          | Type            | Required | Default | Description                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | no       | 1       | 最小承認数                |
| maxconf            | number          | no       | ∞       | 最大承認数                |
| include_watchonly  | boolean         | no       | false   | watch-only を含める                   |
| addresses          | array of string | no       |         | これらのアドレスに絞り込む            |
| as_of_height       | number          | no       |         | この高さ時点で照会する              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Type  | Required | Description                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | yes      | オブジェクト配列: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter        | Type            | Required | Default         | Description                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | yes      |                 | 送信元アドレスまたは `"ANY_TADDR"`                  |
| amounts          | array of object | yes      |                 | 受取人（`address`, `amount`, 任意で `memo`）|
| minconf          | number          | no       |                 | 最小承認数                            |
| fee              | null            | no       |                 | `null` でなければならない（ZIP-317 のみ）                    |
| privacy_policy   | string          | no       | `"FullPrivacy"` | プライバシーポリシー文字列                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter        | Type   | Required | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | yes      | Transparent アドレスまたはアカウント UUID              |
| toaddress        | string | yes      | シールドされた送信先                             |
| fee              | null   | no       | `null` でなければならない                                   |
| limit            | number | no       | シールドする coinbase UTXO の最大数           |
| memo             | string | no       | 16進エンコードされた memo                                 |
| privacy_policy   | string | no       | `AllowRevealedSenders` または `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| txid      | string | yes      | トランザクション ID  |

---

## 関連ページ

- [移行ガイド: Zcashd から Zebrad と Zallet へ](/guides/migration-guide-zcashd-to-zebrad-zallet) — 既存の zcashd セットアップから段階的に移行する方法
- [Zebra フルノード](/zcash-tech/zebra-full-node) — Zallet と連携して動作するノード実装
- [フルノード](/zcash-tech/full-nodes) — フルノードを運用する際に必要なことと、なぜ運用したいと思うか
- [ウォレット](/using-zcash/wallets) — フルノードが必要以上に重い場合の、より軽量なウォレットの選択肢
- [トランザクション](/using-zcash/transactions) — シールドトランザクションと Transparent トランザクションの違い
