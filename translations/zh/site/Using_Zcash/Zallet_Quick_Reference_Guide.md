<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zallet 快速参考指南

## TL;DR

- Zallet 是一个用 Rust 编写的 Zcash 全节点钱包。它取代了过去内置在 zcashd 中的钱包。
- zcashd 已于 2026 年 7 月 18 日到达支持终止停机时间，现已无法继续运行。现在由 Zebra 负责节点端；Zallet 负责钱包端。
- 你可以通过命令行使用 `zallet rpc <command>` 来操作 Zallet，就像你之前使用 `zcash-cli` 一样。
- 命令名之后的每一个参数都必须是合法的 JSON，这意味着字符串值必须保留其双引号。
- Zallet 目前仍处于 alpha 阶段。不同版本之间命令可能会变化，而且并不是每个 zcashd RPC 都已经移植过来。

## 核心说明

Zallet 通过 JSON-RPC 暴露其功能，这与 zcashd 钱包曾使用的接口风格相同。任何你希望钱包执行的操作——检查余额、创建账户、发送 shielded 支付——都可以作为命令传给 `zallet rpc`。

与旧的 `zcash-cli` 使用习惯相比，有两点不同，而这也解释了大多数早期错误。第一，参数必须是合法的 JSON，而不能是裸文本，因此字符串参数必须在 shell 引号内部自带引号。第二，可用命令集取决于你正在运行的 alpha 版本，因此你二进制文件内置的命令列表比任何书面页面都更可靠，包括本页。

列出所有可用 RPC：

```bash
zallet rpc help
```

获取某个特定 RPC 的详细帮助：

```bash
zallet rpc help '"<command>"'
```

> **重要：** 方法名之后的每一个参数**都必须是合法的 JSON**。  
> 字符串值必须写成 `"value"`（包括双引号）。

## 常见错误

- **遗漏字符串参数内部的引号。** `zallet rpc validateaddress u1abc...` 会失败，因为该地址必须以 JSON 形式传入。正确写法应为 `'"u1abc..."'`。
- **假设每个 zcashd RPC 在这里都存在。** 移植工作仍在进行中。有些方法行为完全相同，有些需要不同的用法，还有一些根本不会被迁移过来。
- **把本页视为比你的二进制文件更权威。** Zallet 仍处于 alpha 阶段，变化很快。如果这里的某个命令无法工作，请先检查 `zallet rpc help`，再假定是哪里坏了。
- **把 Zallet 当作节点。** 它只是这对组件中的钱包一半。Zebra 运行节点，而 Zallet 与其通信。

## RPC 命令

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| 参数   | 类型   | 必需 | 说明               |
|-------------|--------|----------|--------------------------|
| hexstring   | string | 是      | 交易的十六进制字符串   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| 参数   | 类型   | 必需 | 说明     |
|-------------|--------|----------|-----------------|
| hexstring   | string | 是      | 脚本十六进制      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| 参数  | 类型   | 必需 | 默认值 | 说明                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | 是      |         | 交易 ID                       |
| verbose    | number | 否       | 0       | `0` = 十六进制，非零 = JSON 对象    |
| blockhash  | string | 否       |         | 将搜索限制在该区块内        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

无参数。

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

无参数。

---

### listaddresses

```bash
zallet rpc listaddresses
```

无参数。

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

无参数。返回 OpenRPC schema。

---

### stop

```bash
zallet rpc stop
```

无参数。（仅限 Regtest）

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| 参数 | 类型   | 必需 | 说明             |
|-----------|--------|----------|-------------------------|
| address   | string | 是      | 透明地址     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| 参数  | 类型   | 必需 | 说明             |
|------------|--------|----------|-------------------------|
| address    | string | 是      | 透明地址     |
| signature  | string | 是      | Base64 签名        |
| message    | string | 是      | 原始消息        |

---

### walletlock

```bash
zallet rpc walletlock
```

无参数。

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| 参数   | 类型   | 必需 | 说明                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | 是      | 钱包口令                    |
| timeout     | number | 是      | 钱包保持解锁状态的秒数  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| 参数             | 类型   | 必需 | 说明                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | 是      | 要转换的 P2PKH 地址   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| 参数 | 类型   | 必需 | 说明                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | 是      | 要导出其 spending key 的 Sapling 地址     |

> 钱包必须处于解锁状态。仅导出 Sapling spending key。

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| 参数     | 类型   | 必需 | 说明     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | 是      | 账户 UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| 参数          | 类型            | 必需 | 说明                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | 是      | 账户 UUID 或 ZIP-32 账户索引     |
| receiver_types     | array of string | 否       | 要包含的接收器类型                |
| diversifier_index  | number          | 否       | 指定的 diversifier 索引               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| 参数 | 类型            | 必需 | 默认值 | 说明                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | 是      |         | 账户 UUID 或 ZIP-32 索引     |
| minconf   | number          | 否       | 1       | 最少确认数            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| 参数 | 类型   | 必需 | 默认值 | 说明               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | 否       | 1       | 最少确认数     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| 参数     | 类型   | 必需 | 说明                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | 是      | 人类可读名称                      |
| seedfp        | string | 否       | 如果钱包有多个 seed，则必需    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| 参数     | 类型   | 必需 | 默认值 | 说明                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | 否       | 1       | 最少确认数                |
| as_of_height  | number | 否       |         | 查询该高度时的状态（`-1` = tip） |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| 参数    | 类型            | 必需 | 说明                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | 否       | 操作 ID（省略则返回所有已完成操作）    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| 参数    | 类型            | 必需 | 说明                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | 否       | 操作 ID（省略则返回全部）   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| 参数          | 类型    | 必需 | 默认值 | 说明                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | 否       | 1       | 最少确认数           |
| include_watchonly  | boolean | 否       | false   | 包含仅观察余额     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| 参数  | 类型    | 必需 | 默认值 | 说明                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | 是      |         | 账户 UUID                         |
| hex_data   | string  | 是      |         | 十六进制公钥或 redeem script      |
| rescan     | boolean | 否       | true    | 导入后重新扫描                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| 参数     | 类型   | 必需 | 默认值        | 说明                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | 是      |                | Sapling 扩展 spending key            |
| rescan        | string | 否       | `"whenkeyisnew"` | `"yes"`、`"no"` 或 `"whenkeyisnew"`   |
| start_height  | number | 否       | 0              | 重新扫描起始高度                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| 参数          | 类型    | 必需 | 默认值 | 说明                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | 否       | true    | 同时返回每个账户的地址   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| 参数 | 类型   | 必需 | 说明                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | 否       | 按状态筛选（例如 `"success"`）  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| 参数      | 类型   | 必需 | 说明                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | 否       | 限定为单个账户         |
| start_height   | number | 否       | 包含的下界        |
| end_height     | number | 否       | 不包含的上界        |
| offset         | number | 否       | 跳过这么多结果       |
| limit          | number | 否       | 返回结果的最大数量    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| 参数         | 类型   | 必需 | 说明                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | 是      | 要检查的 Unified Address   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| 参数          | 类型            | 必需 | 默认值 | 说明                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | 否       | 1       | 最少确认数                |
| maxconf            | number          | 否       | ∞       | 最大确认数                |
| include_watchonly  | boolean         | 否       | false   | 包含仅观察                   |
| addresses          | array of string | 否       |         | 筛选为这些地址            |
| as_of_height       | number          | 否       |         | 查询该高度时的状态              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| 参数 | 类型  | 必需 | 说明                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | 是      | 对象数组：`name`、`seedfp`、`zip32_account_index`、`birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| 参数        | 类型            | 必需 | 默认值         | 说明                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | 是      |                 | 来源地址或 `"ANY_TADDR"`                  |
| amounts          | array of object | 是      |                 | 收款人（`address`、`amount`、可选 `memo`）|
| minconf          | number          | 否       |                 | 最少确认数                            |
| fee              | null            | 否       |                 | 必须为 `null`（仅支持 ZIP-317）                    |
| privacy_policy   | string          | 否       | `"FullPrivacy"` | 隐私策略字符串                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| 参数        | 类型   | 必需 | 说明                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | 是      | 透明地址或账户 UUID              |
| toaddress        | string | 是      | shielded 目标地址                             |
| fee              | null   | 否       | 必须为 `null`                                   |
| limit            | number | 否       | 要 shield 的 coinbase UTXO 最大数量           |
| memo             | string | 否       | 十六进制编码 memo                                 |
| privacy_policy   | string | 否       | `AllowRevealedSenders` 或 `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| 参数 | 类型   | 必需 | 说明     |
|-----------|--------|----------|-----------------|
| txid      | string | 是      | 交易 ID  |

---

## 相关页面

- [迁移指南：从 Zcashd 到 Zebrad 和 Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — 从现有 zcashd 配置逐步迁移
- [Zebra 全节点](/zcash-tech/zebra-full-node) — 与 Zallet 配合工作的节点实现
- [全节点](/zcash-tech/full-nodes) — 运行全节点需要做什么，以及你为什么可能会想运行一个
- [钱包](/using-zcash/wallets) — 如果全节点超出你的需求，这里有更轻量的钱包选项
- [交易](/using-zcash/transactions) — shielded 交易与透明交易有何不同
