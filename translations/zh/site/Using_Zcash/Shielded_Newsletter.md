<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 屏蔽新闻简报 [Shielded Newsletter]

> 使用 Zallet 将 Markdown note 作为 Zcash 备忘录 [memos] 发送至一组屏蔽 [shielded] 地址。收件人列表和 note 不会出现在透明 [transparent] 地址上。

屏蔽新闻简报是一系列屏蔽交易 [transactions]。每个输出都会向一个收件人的统一地址支付少量金额，并在备忘录字段中携带 note 的下一段内容。Zallet 会构建并发送这些交易。Zebra 和 Zaino 仅提供链 [chain] 数据。

脚本位于 [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter)。它们是为早期的 Zallet 编写的，不能按原样针对当前版本安全运行。本页是更新后的操作流程。截至 2026 年 10 月 7 日，已根据 Zallet `v0.1.0-beta.3` 和 Zallet 手册完成核对。

## 你需要准备的内容

- 已完全同步的 Zebra，其 RPC 绑定至 localhost。
- 已针对该 Zebra 节点 [node] 同步的 Zaino。
- Zallet `v0.1.0-beta.3` 或更高版本，钱包 [wallet] 构建版本，且其 RPC 绑定至 localhost。手册将 `z_sendmany` 列为已实现。数值形式的手续费 [fee] 会被拒绝：如果传入 `fee`，它必须是 `null`，因为 Zallet 始终使用 ZIP 的 317 手续费。
- 一个已注资的账户，其统一地址能够花费屏蔽资金。
- 收件人的统一地址。在透明地址上附加备忘录会导致错误。

不要将已注资地址或 cookie 放入 wiki 或已提交的脚本中。当前的 `txBuilderFromFile.sh` 将统一地址硬编码。请在本地替换它，且不要提交。

## 配置 Zallet

使用正在运行的 Zallet 生成配置，然后将其指向 Zebra 和 Zaino。旧教程中的示例使用 `as_of_version = "0.0.0"` 和个人主目录路径。将该文件视为快照，而非模板。

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` 必须列出 `z_sendmany`、`z_getoperationstatus` 和 `z_getoperationresult`。仅将 RPC 绑定至 `127.0.0.1`。

## 收件人列表

每行一个统一地址，不使用引号，不留空行。脚本读取 `daoAddresses.md`。旧 readme 写的是 `daoAddress.md`。该文件不在仓库中，且名称不匹配。

```text
u1...
u1...
```

## 发送一条备忘录

`z_sendmany` 是异步的。它会返回一个操作 id。轮询 `z_getoperationstatus`，直至状态为 `success` 或出现错误。脚本使用固定的 5 秒等待；当构建耗时更长时，这会丢失结果。`z_getoperationresult` 会消耗该操作，因此在状态结束之前不要调用它。

省略手续费。Zallet 会计算 ZIP 的 317。不要传入数值。

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

备忘录字段为原始十六进制，最大为 512 字节。`ascii2hex` 仅编码 ASCII。包含任何非 ASCII 字符的 note 都会失败。`xxd` 或 `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` 可处理 UTF-8。

隐私 [privacy] 策略默认值为 `FullPrivacy`。这对于屏蔽收件人是正确的默认设置。不要传入 `AllowFullyTransparent`。

## 脚本缺陷

截至 2026 年 10 月 8 日，树中存在以下问题。在修复前不要运行 `shieldNewsletter.sh`。

- `[[ bytesInFile -lt 512 ]]` 缺少 `$`。单条备忘录分支永远不会运行。
- 分块循环存储十六进制，然后 `hex2ascii` 将其解码，接着 `txBuilderFromFile.sh` 再次编码。除非后续某一行溢出 512，否则最后一个分块不会被刷新。长行不会被拆分。它会被整体发送，并可能超过 512 字节的备忘录限制。
- `txBuilderFromFile.sh` 调用 `./zallet rpc` 时未提供配置路径，并且期望二进制文件位于当前目录。请使用 `zallet -c <config> rpc`。
- `toCurl.sh` 使用 cookie 连接端口 8232 上的 Zebra，并调用 `getinfo` 和 `sendmany`。Zallet 不提供 `sendmany`。挖矿 [mining] 等待循环也在未使用 `$` 的情况下调用 `[[ chainHeight -gt temp ]]`，因此它不会等待。
- `z_gettotalbalance 0 true` 被作为额外的位置参数传入。在使用该调用前，请检查所运行二进制文件上的 `rpc help z_gettotalbalance`。
- 每个分块都会向每位收件人发送 `0.0001` ZEC。ZIP 的 317 手续费需额外支付。向多个地址发送长 note 的支出会超过尘埃金额。

## 修复后

修正后的运行程序应当：

1. 将 note 作为字节读取，并按 512 字节边界拆分，而非按行拆分。
2. 对每个分块只进行一次十六进制编码。
3. 使用已注资的 UA、收件人数组且不传入手续费参数来调用 `zallet -c <config> rpc z_sendmany`。
4. 为该操作 id 轮询 `z_getoperationstatus`。
5. 仅在 `success` 后记录 txid。

旧教程页面仍位于 [屏蔽新闻简报脚本 Shielded Newsletter scripts](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md)。请使用本页作为操作流程。
