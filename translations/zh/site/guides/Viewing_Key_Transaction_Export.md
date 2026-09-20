<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 从 Viewing Key 导出交易历史

大多数钱包导出的内容都很有限。例如，ZODL 的税务导出文件会提供上一日历年度的日期、金额和手续费，但没有交易 ID、备注或地址。这不足以用于记账、核查钱包迁移，或弄清一笔付款发生了什么。

你无需使用助记词即可了解完整情况。统一完整查看密钥（UFVK，以 `uview1` 开头）可以查看账户中的每笔收款和付款交易，而两种工具可以将其转换为你留存的文件：Zkool GraphQL 服务器和 zingo-cli。本指南汇集了 [此论坛帖子](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) 中的方法，并将其更新至当前版本。

于 2026 年 9 月使用 Zkool 6.30.0 和来自 zingolib 6.0.0 的 zingo-cli 测试。

## 开始前

你需要两样东西：

1. **该账户的 UFVK**。[查看密钥](/zcash-tech/viewing-keys) 说明了它会揭示哪些信息，以及如何导出。
2. **出生高度**，即开始扫描的区块。请使用早于你的首笔交易的高度。设置得过高，较早的历史记录会悄然缺失；设置得过低，扫描只是需要更长时间。Sapling 激活高度（419200）始终安全，但扫描可能需要数小时。

## 保持私密

查看密钥无法花费资金，但它会向持有者展示你的全部历史记录。

- 不要将其粘贴到网站或区块浏览器中。请将它导入你自己运行的软件。
- 你同步所使用的服务器会看到你的 IP 地址，以及你完整下载了哪些交易。下方两种工具都会按 ID 获取你的每笔交易，以读取备注和手续费，而 [ZIP 307](https://zips.z.cash/zip-0307) 指出，这会告诉服务器哪些交易属于你。使用自己的 Zebra 节点并配合 Zaino 或 lightwalletd 同步，可以避免这种情况。[Zingolib 和 Zaino 教程](/guides/zingolib-and-zaino-tutorial) 介绍了如何进行设置。
- zingo-cli 6 通过 Nym mixnet 发送付款，但其同步仍会直接连接到服务器，因此上述情况同样适用于它。
- 向这些工具提供查看密钥，绝不要提供助记词。Zkool GraphQL 服务器默认没有登录验证，其 API 会返回任何由助记词创建账户的助记词，也可以发送资金。
- 将服务器保留在你自己的设备上。下方的 Docker 命令仅监听 `127.0.0.1`。
- 两种工具都会以未加密形式存储密钥和你的历史记录。完成后删除工作数据，并将导出文件保存在加密位置。

## 选项 1：Zkool GraphQL

`zkool_graphql` 是 Zkool 的钱包引擎，作为独立服务器运行。它与 Zkool 应用是不同的程序。最简单的运行方式是使用官方 Docker 镜像（amd64 和 arm64）。[Zkool 发布页面](https://github.com/hhanh00/zkool2/releases)上还有 Linux x86-64 二进制文件；它需要 glibc 2.38 或更高版本，因此 Ubuntu 24.04 可以使用，而 Debian 12 不行。

### 1. 启动服务器

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

它会从 `https://zec.rocks` 同步，除非你通过 `--lwd-url` 添加自己的服务器。首次启动时，它会下载 Sapling 参数（约 50 MB）。如果失败，`docker start zkool-export` 会再次尝试。

在浏览器中打开 `http://127.0.0.1:8000/graphiql`。你可以在那里粘贴并运行以下各步骤。

### 2. 导入密钥

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

它会返回新账户的 ID；在全新的服务器上，该 ID 为 1。

- 始终设置 `birth`。若不设置，Zkool 会从当前区块开始，因此找不到任何内容。
- `useInternal: true` 会让 Zkool 也检查透明找零地址。对于来自 ZODL 的密钥请保持开启，这与 [恢复资金](/using-zcash/recovering-funds) 对 ZODL 助记词所用的设置相同。

### 3. 同步

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

该命令会持续运行直至同步结束。不要添加 `fast: true`。它会跳过下载完整交易，而备注、手续费和输出正是从完整交易中取得的。

它返回的数字是目标高度，并不能证明它已经到达该高度。网络错误可能会让同步提前结束而不报告任何信息，因此请检查：

```graphql
{ currentHeight accounts { id name height } }
```

如果账户的 `height` 落后于 `currentHeight`，请再次运行同步。它会从停止的位置继续。

### 4. 导出

将以下内容保存为 `history.graphql`：

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

除非你确实有此意，否则不要包含 `height` 参数。它会设置最小值，因此论坛示例中的 `height: 3000000` 会丢弃该区块之前的所有内容。

将其获取为 JSON：

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

除挖矿奖励外，每笔交易都应显示大于 0 的手续费。如果某笔交易显示 `"fee": "0"` 且没有备注，说明其详情未下载。Zkool 会在扫描后逐笔获取完整交易，而一次失败会悄然停止其余下载。要列出所有受影响的交易：

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

如果有任何结果出现，请在几分钟后再次同步并重新导出。

然后将其扁平化为 CSV，每笔交易一行：

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### 解读输出

| 字段 | 含义 |
|---|---|
| `value` | 账户以 ZEC 计的净变化，包含手续费。付款时为负数。 |
| `fee` | 以 ZEC 计的手续费。对于你收到的付款，手续费由发送方支付，不包含在 `value` 中。 |
| `time` | UTC 区块时间，不带时区标记 |
| `notes` | 账户在此交易中收到的内容，包括找零。发送给你的备注在这里。透明条目没有地址。 |
| `spends` | 该账户在此交易中花费掉的自身 notes |
| `outputs` | 交易发送出去的内容：每个透明输出，以及发送至其他地址的带备注屏蔽付款 |
| `pool` | 0 透明，1 Sapling，2 Orchard，3 Ironwood |
| `scope` | 0 外部（收到一笔付款），1 内部（找零） |

Zkool 应用也在账户菜单中提供“导出交易、备注和 Notes”，但这些是原始表格转储：金额以 zatoshis 表示、时间戳为 Unix 时间戳，且备注位于单独文件中。

## 选项 2：zingo-cli

zingo-cli 是 Zingo 的命令行钱包。没有预构建下载文件，因此需要使用 Rust 构建：

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

即使只进行同步，你也需要 `nym-proxy`。zingo-cli 6 没有它就无法连接任何服务器。

首次运行会创建一个仅查看钱包、同步它并打印历史记录：

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` 必须是绝对路径。
- `--viewkey` 和 `--birthday` 仅在创建钱包时适用。之后请省略它们。
- zingo-cli 默认以离线方式启动。`--server` 会选择服务器，同时也表示你同意上线。
- 该密钥会留在你的 shell 历史记录中，因此之后请清除它。

后续运行：

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` 会读取已经同步的内容，而不会访问网络。

- `transactions` 每笔交易给出一条记录：txid、时间（UTC）、高度、类型（`received`、`sent`、`shield` 或 `send-to-self`）、数额、手续费及所涉及的 notes。
- `value_transfers` 每笔付款给出一条记录，因此向两人付款会有两条记录，每条包含收款人地址和备注。
- `messages` 将备注列为 JSON。

关于输出，有几点需要知道：

- `transactions` 和 `value_transfers` 会输出看起来有点像 JSON 的纯文本，但实际上不是。
- 金额以 zatoshis 表示（100,000,000 zatoshis = 1 ZEC），且始终为正数。`kind` 会告诉你方向。对于付款，`value` 是发送给他人的金额，不含手续费。
- 当交易花费了不属于你的透明资金时，手续费会显示为“not available”。只会显示文本备注。
- 如果同步失败，错误会输出到终端而不是文件中，且 zingo-cli 仍会正常退出。在信任 `transactions.txt` 前，请先检查终端。

dismad 的 [zingoHelper](https://github.com/dismad/zingoHelper) 有一个 `exportToJSON.sh` 脚本，可将 `transactions` 转换为 JSON。它编写于 zingo-cli 6 之前，为 testnet 设置，会将一些传出的 Sapling 和透明条目标记为占位符，并且需要 GNU 工具，因此无法在原生 macOS 上运行。将其输出视为起点，并核对总额。

## 查看密钥无法告诉你的内容

- **价格。**两种工具都不会记录每笔交易发生时的 ZEC 价格。请自行添加法币价值。
- **透明历史记录，如果密钥不包含它。**根据 [ZIP 316](https://zips.z.cash/zip-0316)，UFVK 的透明部分是可选的。使用 zingo-cli 时，`$Z --offline parse_viewkey uview1...` 会显示一个密钥覆盖哪些池。
- **谁向你付款。**屏蔽付款不包含发送方地址。除非发送方将其写入备注，否则无处可查。
- **某些付款详情。**屏蔽付款的目标地址、金额和备注通过密钥解密恢复。不过，钱包可以构建一种无法实现这一点的交易，尽管大多数钱包不会这样做。

## 其他工具

| 工具 | 你能获得什么 |
|---|---|
| ZODL | 包含日期、金额、手续费和标签的税务 CSV。仅限上一日历年度；跳过屏蔽交易；不含 txid、备注或地址。 |
| Zkool 应用 | 从账户菜单导出的原始表格 |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | 使用 `importvk` 导入 UFVK。通过 RPC 的 `listreceived` 会返回带 txid 和备注的收到 notes，但没有付款记录和手续费。 |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` 内容详细但标记为实验性，而 Zallet 仅导入 Sapling 查看密钥，不导入 UFVK。 |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | 使用 `wallet init-fvk` 导入 UFVK，然后使用 `wallet list-tx`。其 CSV 模式没有 txid 或地址，且项目方表示不要在生产环境中使用它。 |

## 相关内容

- [查看密钥](/zcash-tech/viewing-keys)
- [恢复资金](/using-zcash/recovering-funds)
- [Zingolib 和 Zaino 教程](/guides/zingolib-and-zaino-tutorial)
- [论坛：从 UFVK/助记词将交易历史导出为 JSON/CSV](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [论坛：Zkool 与 GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
