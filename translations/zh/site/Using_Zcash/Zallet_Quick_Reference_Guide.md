<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet 快速参考指南

## TL;DR

- Zallet 是一个用 Rust 编写的全节点 [full node] Zcash 钱包 [wallet]。它取代了过去内置于 zcashd 的钱包。
- zcashd 于 2026 年 7 月 18 日达到支持终止停止点，现已不再运行。Zebra 现在负责节点 [node] 端；Zallet 负责钱包端。
- 你可以通过命令行使用 `zallet rpc <command>` 操作 Zallet，方式与此前使用 `zcash-cli` 大致相同。
- 命令名称后的每个参数都必须是有效的 JSON，这意味着字符串值必须保留其双引号。
- Zallet 处于 beta 阶段。命令可能在不同版本之间发生变化，而且并非所有 zcashd RPC 都已移植完成。

## 核心说明

Zallet 通过 JSON-RPC 提供其功能，这与 zcashd 钱包所使用的接口风格相同。你希望钱包执行的任何操作——查询余额、创建账户、发送屏蔽 [shielded] 支付 [payment]——都是你传递给 `zallet rpc` 的命令。

与旧有的 `zcash-cli` 使用习惯相比，有两项差异造成了大多数早期错误。第一，参数必须是有效的 JSON，而非裸文本，因此字符串参数需在 shell 引号内保留自身的引号。第二，可用命令集取决于你正在运行的 beta 版本，因此内置于你的二进制文件中的列表比任何书面页面都更可靠，包括本页。

列出所有可用 RPC：

```bash
zallet rpc help
```

获取特定 RPC 的详细帮助：

```bash
zallet rpc help '"<command>"'
```

> **重要：** 方法名称后的每个参数都**必须是有效的 JSON**。  
> 字符串值必须写为 `"value"`（包括双引号）。

## 常见错误

- **遗漏字符串参数中的内部引号。** `zallet rpc validateaddress u1abc...` 会失败，因为地址 [address] 必须以 JSON 形式传入。它需要写成 `'"u1abc..."'`。
- **假设每个 RPC 都在这里存在。** 移植工作仍在进行中。有些方法的行为完全相同，有些需要不同的用法，还有一些根本不会被移植。
- **将本页视为比你的二进制文件更权威。** Zallet 处于 beta 阶段且变化迅速。当此处的命令无法运行时，请先检查 `zallet rpc help`，再假定出现了故障。
- **期望 Zallet 是一个节点。** 它是这一组合中的钱包部分。Zebra 运行节点，而 Zallet 与其通信。

## RPC 命令

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| 参数   | 类型   | 必需 | 描述              |
|-------------|--------|----------|--------------------------|
| hexstring   | 字符串 | 是      | 交易 [transaction] 十六进制字符串   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| 参数   | 类型   | 必需 | 描述     |
|-------------|--------|----------|-----------------|
| hexstring   | 字符串 | 是      | 脚本十六进制      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| 参数  | 类型   | 必需 | 默认值 | 描述                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | 字符串 | 是      |         | 交易 ID                       |
| verbose    | 数字 | 否       | 0       | `0` = 十六进制，非零 = JSON 对象    |
| blockhash  | 字符串 | 否       |         | 将搜索限制于此区块 [block]        |

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

无参数。返回 OpenRPC 架构。

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

| 参数 | 类型   | 必需 | 描述             |
|-----------|--------|----------|-------------------------|
| address   | 字符串 | 是      | 透明 [transparent] 地址     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| 参数  | 类型   | 必需 | 描述             |
|------------|--------|----------|-------------------------|
| address    | 字符串 | 是      | 透明地址     |
| signature  | 字符串 | 是      | Base64 签名 [signature]        |
| message    | 字符串 | 是      | 原始消息        |

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

| 参数   | 类型   | 必需 | 描述                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | 字符串 | 是      | 钱包密码短语                    |
| timeout     | 数字 | 是      | 保持钱包解锁的秒数  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| 参数             | 类型   | 必需 | 描述                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | 字符串 | 是      | 要转换的 P2PKH 地址   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| 参数 | 类型   | 必需 | 描述                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | 字符串 | 是      | 要导出其花费密钥 [spending key] 的 Sapling 地址     |

> 钱包必须处于解锁状态。仅导出 Sapling 花费密钥。

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| 参数     | 类型   | 必需 | 描述     |
|---------------|--------|----------|-----------------|
| account_uuid  | 字符串 | 是      | 账户 UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| 参数          | 类型            | 必需 | 描述                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | 字符串 / 数字 | 是      | 账户 UUID 或 ZIP-32 账户索引     |
| receiver_types     | 字符串数组 | 否       | 要包含的接收器类型                |
| diversifier_index  | 数字          | 否       | 特定的多样化因子索引               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| 参数 | 类型            | 必需 | 默认值 | 描述                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | 字符串 / 数字 | 是      |         | 账户 UUID 或 ZIP-32 索引     |
| minconf   | 数字          | 否       | 1       | 最少确认数            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| 参数 | 类型   | 必需 | 默认值 | 描述               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | 数字 | 否       | 1       | 最少确认数     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| 参数     | 类型   | 必需 | 描述                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | 字符串 | 是      | 人类可读的名称                      |
| seedfp        | 字符串 | 否       | 如果钱包有多个种子则必需    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| 参数     | 类型   | 必需 | 默认值 | 描述                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | 数字 | 否       | 1       | 最少确认数                |
| as_of_height  | 数字 | 否       |         | 查询截至此高度的状态（`-1` = 链尖） |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| 参数    | 类型            | 必需 | 描述                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | 字符串数组 | 否       | 操作 ID（省略则返回所有已完成操作）    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| 参数    | 类型            | 必需 | 描述                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | 字符串数组 | 否       | 操作 ID（省略则返回全部）   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| 参数          | 类型    | 必需 | 默认值 | 描述                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | 数字  | 否       | 1       | 最少确认数           |
| include_watchonly  | 布尔值 | 否       | false   | 包括仅监视余额     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| 参数  | 类型    | 必需 | 默认值 | 描述                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | 字符串  | 是      |         | 账户 UUID                         |
| hex_data   | 字符串  | 是      |         | 十六进制公钥或赎回脚本      |
| rescan     | 布尔值 | 否       | true    | 导入后重新扫描                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| 参数     | 类型   | 必需 | 默认值        | 描述                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | 字符串 | 是      |                | Sapling 扩展花费密钥            |
| rescan        | 字符串 | 否       | `"whenkeyisnew"` | `"yes"`、`"no"` 或 `"whenkeyisnew"`   |
| start_height  | 数字 | 否       | 0              | 重新扫描起始高度                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| 参数          | 类型    | 必需 | 默认值 | 描述                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | 布尔值 | 否       | true    | 同时返回每个账户的地址   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| 参数 | 类型   | 必需 | 描述                          |
|-----------|--------|----------|--------------------------------------|
| status    | 字符串 | 否       | 按状态筛选（例如 `"success"`）  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| 参数      | 类型   | 必需 | 描述                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | 字符串 | 否       | 限制为一个账户         |
| start_height   | 数字 | 否       | 包含的下限        |
| end_height     | 数字 | 否       | 不包含的上限        |
| offset         | 数字 | 否       | 跳过这么多结果       |
| limit          | 数字 | 否       | 返回的最大结果数    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| 参数         | 类型   | 必需 | 描述                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | 字符串 | 是      | 要检查的统一地址   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| 参数          | 类型            | 必需 | 默认值 | 描述                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | 数字          | 否       | 1       | 最少确认数                |
| maxconf            | 数字          | 否       | ∞       | 最大确认数                |
| include_watchonly  | 布尔值         | 否       | false   | 包含仅监视余额                   |
| addresses          | 字符串数组 | 否       |         | 筛选至这些地址            |
| as_of_height       | 数字          | 否       |         | 查询截至此高度的状态              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| 参数 | 类型  | 必需 | 描述                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | 数组 | 是      | 对象数组：`name`、`seedfp`、`zip32_account_index`、`birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| 参数        | 类型            | 必需 | 默认值         | 描述                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | 字符串          | 是      |                 | 源地址或 `"ANY_TADDR"`                  |
| amounts          | 对象数组 | 是      |                 | 接收方（`address`、`amount`、可选的 `memo`）|
| minconf          | 数字          | 否       |                 | 最少确认数                            |
| fee              | null            | 否       |                 | 必须为 `null`（仅限 ZIP-317）                    |
| privacy_policy   | 字符串          | 否       | `"FullPrivacy"` | 隐私 [privacy] 策略字符串                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| 参数        | 类型   | 必需 | 描述                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | 字符串 | 是      | 透明地址或账户 UUID              |
| toaddress        | 字符串 | 是      | 屏蔽目标地址                             |
| fee              | null   | 否       | 必须为 `null`                                   |
| limit            | 数字 | 否       | 要屏蔽的 coinbase UTXO 最大数量           |
| memo             | 字符串 | 否       | 十六进制编码的备忘录 [memo]                                 |
| privacy_policy   | 字符串 | 否       | `AllowRevealedSenders` 或 `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| 参数 | 类型   | 必需 | 描述     |
|-----------|--------|----------|-----------------|
| txid      | 字符串 | 是      | 交易 ID  |

---

## 相关页面

- [迁移指南：从 zcashd 到 Zebrad 和 Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) —— 从现有 zcashd 设置逐步迁移
- [Zebra 全节点](/zcash-tech/zebra-full-node) —— 与 Zallet 协同工作的节点实现
- [全节点](/zcash-tech/full-nodes) —— 运行全节点涉及什么，以及你为何可能需要运行一个
- [钱包](/using-zcash/wallets) —— 如果全节点超出你的需求，可选择更轻量的钱包方案
- [交易](/using-zcash/transactions) —— 屏蔽交易与透明交易的区别
