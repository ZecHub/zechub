<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 屏蔽式通讯

> 使用 Zallet 将 Markdown 说明作为 Zcash 备注发送给一组屏蔽地址。收件人列表和说明均不涉及透明地址。

屏蔽式通讯是一系列屏蔽交易。每笔输出都会向收件人的 Unified Address 支付极少金额，并在备注字段中携带说明的下一段内容。Zallet 构建并发送这些交易。Zebra 和 Zaino 仅提供链上数据。

脚本位于 [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter)。它们是为早期版本的 Zallet 编写的，不能按原样安全地用于当前版本。本页为更新后的操作流程。已于 2026 年 10 月 7 日依据 Zallet `v0.1.0-beta.3` 及 Zallet 手册核对。

## 所需条件

- Zebra 已完全同步，且 RPC 仅绑定至 localhost。
- Zaino 已针对该 Zebra 节点完成同步。
- Zallet `v0.1.0-beta.3` 或更高版本，wallet 构建，且其 RPC 仅绑定至 localhost。手册将 `z_sendmany` 列为已实现。数值费用会被拒绝：若传入 `fee`，其必须为 `null`，因为 Zallet 始终使用 ZIP 317 费用。
- 一个已注资的账户，其 Unified Address 能够花费屏蔽资金。
- 收件人的 Unified Address。向透明地址添加备注会出错。

不要将已注资的地址或 cookie 放入 wiki 或已提交的脚本中。当前的 `txBuilderFromFile.sh` 硬编码了 Unified Address。请在本地替换，且不要提交。

## 配置 Zallet

使用正在运行的 Zallet 生成配置，然后将其指向 Zebra 和 Zaino。旧教程中的示例使用 `as_of_version = "0.0.0"` 和个人主目录路径。应将该文件视为快照，而非模板。

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` 必须列出 `z_sendmany`、`z_getoperationstatus` 和 `z_getoperationresult`。RPC 只能绑定至 `127.0.0.1`。

## 收件人列表

每行一个 Unified Address，不加引号，不留空行。脚本读取 `daoAddresses.md`。旧 readme 写的是 `daoAddress.md`。该文件不在仓库中，且名称并不一致。

```text
u1...
u1...
```

## 发送一条备注

`z_sendmany` 为异步操作。它会返回一个操作 ID。轮询 `z_getoperationstatus`，直至状态为 `success` 或出现错误。脚本采用固定等待 5 秒的方式；当构建耗时更长时，这会丢失结果。`z_getoperationresult` 会消耗该操作，因此在状态终结前不要调用它。

省略费用。Zallet 会计算 ZIP 317。不要传入数值。

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

备注字段为原始十六进制，最大为 512 字节。`ascii2hex` 仅编码 ASCII。包含任何非 ASCII 字符的说明都会失败。`xxd` 或 `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` 可处理 UTF-8。

隐私策略默认值为 `FullPrivacy`。这是屏蔽收件人的正确默认设置。不要传入 `AllowFullyTransparent`。

## 脚本缺陷

截至 2026 年 10 月 8 日，这些缺陷仍存在于代码树中。在修复前，不要运行 `shieldNewsletter.sh`。

- `[[ bytesInFile -lt 512 ]]` 缺少 `$`。单条备注分支永远不会运行。
- 分块循环存储十六进制，随后 `hex2ascii` 将其解码，然后 `txBuilderFromFile.sh` 又将其重新编码。除非后续某行溢出 512，否则最后一个分块不会被刷新。长行不会被拆分，而是整体发送，可能超过 512 字节的备注上限。
- `txBuilderFromFile.sh` 调用 `./zallet rpc` 时未提供配置路径，并且预期二进制文件位于当前目录。请使用 `zallet -c <config> rpc`。
- `toCurl.sh` 通过 cookie 与端口 8232 上的 Zebra 通信，并调用 `getinfo` 和 `sendmany`。Zallet 不提供 `sendmany`。挖矿等待循环还在没有 `$` 的情况下使用 `[[ chainHeight -gt temp ]]`，因此不会等待。
- `z_gettotalbalance 0 true` 被作为额外的位置参数传入。在使用该调用前，请检查所运行二进制文件上的 `rpc help z_gettotalbalance`。
- 每个分块都会向每位收件人发送 `0.0001` ZEC。另需支付 ZIP 317 费用。向许多地址发送长说明，支出将超过这些尘埃金额。

## 修复后

修正后的运行程序应当：

1. 将说明读取为字节，并按 512 字节边界拆分，而不是按行拆分。
2. 对每个分块仅进行一次十六进制编码。
3. 使用已注资的 UA、收件人数组且不带费用参数调用 `zallet -c <config> rpc z_sendmany`。
4. 针对该操作 ID 轮询 `z_getoperationstatus`。
5. 仅在 `success` 之后记录 txid。

旧教程页面仍位于 [屏蔽式通讯脚本](/tutorials/shieldednewsletter/readme)。请使用本页的操作流程。
