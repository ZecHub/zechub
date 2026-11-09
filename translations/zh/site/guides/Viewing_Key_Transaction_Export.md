<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 从 Viewing Key 导出交易历史

大多数钱包 [wallet] 导出的内容很少。例如，ZODL 的税务导出会提供上一日历年的日期、金额和手续费 [fees]，但没有交易 ID、备忘录 [memos] 或地址 [addresses]。这不足以用于记账、检查钱包迁移，或弄清一笔支付 [payment] 的经过。

您不需要助记词 [seed phrase] 就能获得完整信息。统一完整 viewing key（UFVK，以 `uview1` 开头）可以查看一个账户中的每笔入账和出账交易 [transaction]，而两个工具 [tools] 可以将其转换为您保存的文件：Zkool GraphQL 服务器和 zingo-cli。本指南汇集了 [此论坛帖子](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) 中的方法，并将其更新至当前版本。

已于 2026 年 9 月使用 Zkool 6.30.0 和来自 zingolib 6.0.0 的 zingo-cli 进行测试。

## 开始前

您需要两样东西：

1. **该账户的 UFVK。** [Viewing Keys](/zcash-tech/viewing-keys) 说明了它会揭示什么以及如何导出。
2. **出生高度 [birth height]**，即开始扫描的区块 [block]。请使用早于您第一笔交易的高度。设得过高会导致较早的历史记录悄然缺失。设得过低只会使扫描耗时更长。Sapling 激活高度（419200）始终安全，但扫描可能需要数小时。

## 保持私密

viewing key 无法花费资金，但会向持有它的任何人展示您的全部历史记录。

- 不要将它粘贴到网站或区块浏览器中。请将其导入您自己运行的软件。
- 您同步所用的服务器可以看到您的 IP 地址以及您完整下载的交易。下方两个工具都会按 ID 获取您的每笔交易，以读取备忘录和手续费，而 [ZIP 307](https://zips.z.cash/zip-0307) 指出，这会让服务器知道哪些交易属于您。使用带有 Zaino 或 lightwalletd 的您自己的 Zebra 节点 [node] 进行同步可以避免这一点。[Zingolib 和 Zaino 教程](/guides/zingolib-and-zaino-tutorial) 介绍了设置方法。
- zingo-cli 6 通过 Nym mixnet 发送支付，但其同步仍直接连接到服务器，因此上述说明同样适用。
- 向这些工具提供 viewing key，绝不要提供助记词。Zkool GraphQL 服务器默认没有登录机制，其 API 会返回由助记词创建的任何账户的助记词，并且可以发送资金。
- 将服务器保留在您自己的机器上。下面的 Docker 命令仅监听 `127.0.0.1`。
- 两个工具都会以未加密 [encryption] 形式存储密钥和您的历史记录。完成后删除工作数据，并将导出文件保存在经过加密的位置。

## 选项 1：Zkool GraphQL

`zkool_graphql` 是 Zkool 的钱包引擎，以独立服务器形式运行。它与 Zkool 应用是不同的程序。运行它最简单的方法是使用官方 Docker 镜像（amd64 和 arm64）。[Zkool 发布页面](https://github.com/hhanh00/zkool2/releases)上还有一个 Linux x86-64 二进制文件；它需要 glibc 2.38 或更新版本，因此 Ubuntu 24.04 可用，而 Debian 12 不可用。

### 1. 启动服务器

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

除非您添加带有自己服务器的 `--lwd-url`，否则它会从 `https://zec.rocks` 同步。首次启动时，它会下载 Sapling 参数（约 50 MB）。如果失败，`docker start zkool-export` 会再次尝试。

在浏览器中打开 `http://127.0.0.1:8000/graphiql`。您可以将以下每个步骤粘贴到那里并运行。

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

它会返回新账户的 ID；在全新服务器上该 ID 为 1。

- 始终设置 `birth`。没有它，Zkool 会从当前区块开始，因此找不到任何内容。
- `useInternal: true` 会让 Zkool 也检查透明 [transparent] 找零地址。对于来自 ZODL 的密钥，请保持开启；[Recovering Funds](/using-zcash/recovering-funds) 对 ZODL 助记词使用的也是相同设置。

### 3. 同步

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

这会持续运行直到同步结束。不要添加 `fast: true`。它会跳过下载完整交易，而备忘录、手续费和输出都来自完整交易。

它返回的数字是目标高度，而不是已达到该高度的证明。网络错误可能会提前结束同步而不报告任何内容，因此请检查：

```graphql
{ currentHeight accounts { id name height } }
```

如果账户的 `height` 落后于 `currentHeight`，请再次运行同步。它会从停止的位置继续。

### 4. 导出

将此内容保存为 `history.graphql`：

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

除非您确实需要，否则请省略 `height` 参数。它会设置最小值，因此论坛示例中的 `height: 3000000` 会丢弃该区块之前的所有内容。

将其获取为 JSON：

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

除挖矿 [mining] 奖励外，每笔交易都应显示大于 0 的手续费。如果某笔交易显示 `"fee": "0"` 且没有备忘录，则其详细信息未被下载。Zkool 会在扫描后逐笔获取完整交易，而一次失败会悄然停止其余交易。要列出所有受影响的交易：

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

如果显示任何内容，请在几分钟后再次同步并再次导出。

然后将其展平为 CSV，每笔交易一行：

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
| `value` | 账户在 ZEC 中的净变化，包含手续费。发送时为负数。 |
| `fee` | 以 ZEC 计的手续费。对于您收到的支付，手续费由发送方支付，且不包含在 `value` 中。 |
| `time` | UTC 区块时间，不带时区标记 |
| `notes` | 账户在此交易中收到的内容，包括找零。发送给您的备忘录位于此处。透明条目没有地址。 |
| `spends` | 此交易使用掉的账户自身 note [notes] |
| `outputs` | 交易发送出去的内容：每个透明输出，以及发送到其他地址的屏蔽 [shielded] 支付及其备忘录 |
| `pool` | 0 透明，1 Sapling，2 Orchard，3 Ironwood |
| `scope` | 0 外部（收到一笔支付），1 内部（找零） |

Zkool 应用的账户菜单中也有“导出交易”、“备忘录”和“Notes”，但这些是原始表格转储：金额以 zatoshi 为单位、Unix 时间戳，以及单独文件中的备忘录。

## 选项 2：zingo-cli

zingo-cli 是 Zingo 的命令行钱包。没有预构建下载文件，因此您需要使用 Rust 构建它：

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

即使只是同步，您也需要 `nym-proxy`。zingo-cli 6 没有它就无法连接到任何服务器。

首次运行会创建一个仅查看钱包、进行同步并打印历史记录：

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` 必须是绝对路径。
- `--viewkey` 和 `--birthday` 仅在创建钱包时适用。之后请省略它们。
- zingo-cli 默认以离线方式启动。`--server` 选择服务器，也作为您同意联网的凭据。
- 密钥会留在您的 shell 历史记录中，因此之后请清除它。

后续运行：

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` 会读取已同步的内容，而不接触网络。

- `transactions` 每笔交易提供一个条目：txid、时间（UTC）、高度、类型（`received`、`sent`、`shield` 或 `send-to-self`）、数值、手续费和涉及的 note。
- `value_transfers` 每笔支付提供一个条目，因此向两人发送资金会产生两个条目，每个条目都包含收款人地址和备忘录。
- `messages` 会将备忘录列为 JSON。

关于输出，有几件事需要了解：

- `transactions` 和 `value_transfers` 会打印看起来有点像 JSON、但并不是 JSON 的纯文本。
- 金额以 zatoshi 为单位（100,000,000 对应 1 ZEC），且始终为正数。`kind` 会告诉您方向。对于发送，`value` 是发送给其他人的金额，不含手续费。
- 当一笔交易花费并非属于您的透明资金时，手续费会显示为“not available”。仅显示文本备忘录。
- 如果同步失败，错误会输出到终端，而不会写入文件，并且 zingo-cli 仍会正常退出。在信任 `transactions.txt` 前，请检查终端。

dismad 的 [zingoHelper](https://github.com/dismad/zingoHelper) 有一个 `exportToJSON.sh` 脚本，可将 `transactions` 转换为 JSON。它编写于 zingo-cli 6 之前，针对 testnet 设置，会将一些出站 Sapling 和透明条目标记为占位符，并且需要 GNU 工具，因此无法在原生 macOS 上运行。请将其输出视为起点，并检查总额。

## viewing key 无法告诉您的内容

- **价格。** 两个工具都不会记录每笔交易发生时的 ZEC 价格。请自行添加法币价值。
- **透明历史记录，如果密钥不包含它。** 根据 [ZIP 316](https://zips.z.cash/zip-0316)，UFVK 的透明部分是可选的。使用 zingo-cli 时，`$Z --offline parse_viewkey uview1...` 会显示一个密钥覆盖哪些屏蔽池 [shielded pools]。
- **谁向您付款。** 屏蔽支付不携带发送方地址。除非发送方将地址写入备忘录，否则无处可查。
- **部分出站详细信息。** 屏蔽发送的目标地址、金额和备忘录通过密钥解密恢复。然而，钱包可以构建无法恢复这些信息的交易，尽管大多数钱包不会如此。

## 其他工具

| 工具 | 您获得的内容 |
|---|---|
| ZODL | 包含日期、金额、手续费和标签的税务 CSV。仅限上一日历年，会跳过屏蔽交易，没有 txid、备忘录或地址。 |
| Zkool 应用 | 来自账户菜单的原始表格导出 |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | 使用 `importvk` 导入 UFVK。通过 RPC 的 `listreceived` 会返回带 txid 和备忘录的已接收 note，但没有发送记录和手续费。 |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` 很详细但标记为实验性，且 Zallet 仅导入 Sapling viewing key，不导入 UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | 使用 `wallet init-fvk` 导入 UFVK，然后使用 `wallet list-tx`。其 CSV 模式没有 txid 或地址，且项目表示不应在生产环境中使用。 |

## 相关内容

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Zingolib 和 Zaino 教程](/guides/zingolib-and-zaino-tutorial)
- [论坛：从 UFVK/助记词导出交易历史到 JSON/CSV](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [论坛：Zkool 与 GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
