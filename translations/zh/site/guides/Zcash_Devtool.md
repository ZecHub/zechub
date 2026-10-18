# Zcash 开发工具

[什么是 zcash-devtool？](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash 开发工具是一个用于开发 Zcash 的平台。它由开发者为开发者构建，用于测试和开发新的 Zcash 功能；不应被视为已可用于生产环境。此工具提供的命令行 API 可能会在任何时候未经警告地变更。请勿将大量资金存入由 zcash-devtool 内嵌钱包管理的资产中。

### Zcash 开发工具视频教程：
Kris Nuttycombe (@nuttycom) 在 ZconVI 期间介绍了这款工具。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool：Kris Nuttycombe 介绍的 Zcash 开发多功能工具 - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

如需了解如何开始使用这些工具的分步指南，请参阅 [这份演练](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)。其中完整讲解了如何设置和使用 zcash devtool 工具。它旨在作为设置工具及为其添加自有功能的指南。

## 快速开始

以下命令已根据 zcash-devtool `main`（提交 `5a26ee8`，2026 年 8 月）检查。该工具可能会随时变更，因此若此处内容不再匹配，请对任何命令运行 `--help`。

### 安装

没有预构建的二进制文件。安装 [Rust](https://rustup.rs)，然后从源码构建：

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

以下示例调用构建后的二进制文件 `target/release/zcash-devtool`。`cargo run --release -- ...` 的使用方式相同。

### 创建 testnet 钱包

先从 testnet 开始。Testnet 代币（TAZ）没有价值。

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` 是钱包目录。它位于 `wallet` 之后、子命令之前。
- `-i` 是一个 [age](https://age-encryption.org) 身份文件。钱包的助记词会加密至该文件，若文件不存在则会创建它。请妥善保存：`send`、`shield` 及其他支出命令需要它来解密种子。
- `-n` 是网络：`test` 或 `main`。
- `-s` 用于选择轻钱包服务器。默认值 `zecrocks` 会连接到所选网络的 zec.rocks 服务器。
- 要恢复现有钱包，请使用 `restore-mnemonic` 替代 `init`。系统会提示你输入助记词。

`balance` 会分别列出每个资金池，包括 Ironwood：

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

运行 `zcash-devtool wallet -w ./my-wallet list-addresses` 以查看钱包的 Unified Address，并从 [水龙头](https://zechub.wiki/using-zcash/faucets) 向其发送 testnet 资金。

对于 mainnet，请将 `-n main` 传递给 `init`。仅使用你可以承受损失的金额。

### 发送和屏蔽

金额以 zatoshi 为单位（1 ZEC = 100,000,000 zatoshi）。

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` 会显示 `send` 将构建的交易，但不会发送它。`list-tx` 和 `list-unspent` 会显示钱包的历史记录和 notes。

任何与服务器通信的命令也接受 `--connection tor`，它会通过内置的 Tor 客户端路由连接。

### 检查地址、密钥和交易

`inspect` 可离线解码 Zcash 数据：地址、密钥和原始交易。添加 `--lookup` 可从链上获取更多信息，例如通过 ID 获取交易。

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Ironwood notes 会发送至 Unified Address 中相同的 Orchard 接收器，因此地址不会随 NU6.3 而改变。

### 使用 PCZT 分步骤构建交易

PCZT（部分创建的 Zcash 交易）将交易构建拆分为独立步骤：创建、生成证明、签名和发送。每个步骤都可以在不同机器上运行，例如使用 Keystone 等硬件签名器。每个 `pczt` 命令都会从文件或标准输入读取 PCZT，并将其写入文件（`--output`）或标准输出，因此这些步骤可以通过管道连接：

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` 列出了其他步骤，包括 `inspect`、`redact`、`combine`、`extract` 和 `shield`。

### 将资金从 Orchard 转移至 Ironwood

自 NU6.3 起，Orchard 资金只能转移至钱包自身的地址。`migration` 命令会将其转入 Ironwood：

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` 会预览 note 拆分和转移计划，不会做出任何更改。
- `commit` 会构建并预签名首批准备交易。添加 `--external` 可使其保持未签名状态，以供 Keystone 等外部签名器使用。
- `status` 显示迁移进度和下一步。
- `advance` 会为锚点已准备好的下一笔交易生成证明。

迁移命令仍在开发中。`advance` 会在第一笔准备好广播的交易处停止，因为该工具尚未实现广播功能。对于日常使用，请使用支持 Ironwood 的钱包转移资金。参阅 [屏蔽资金池](https://zechub.wiki/using-zcash/shielded-pools)。


**安全警告：**
请勿在生产环境中使用此工具！！！
该应用在编写时并未将安全性作为重点。不过，它具备助记词种子加密等功能，应可用于小规模实验，但风险自负。

### 高级教程（librustzcash ）


[在此观看视频](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
