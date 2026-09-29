<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 全节点

## 摘要

- 全节点保存 Zcash 区块链的完整副本，并根据共识规则检查每个新区块和交易。
- Zebra（`zebrad`）是目前应安装的节点。Zakura 是第二种实现，从 Zebra 分叉而来。
- zcashd 已退役。其支持终止自动停机于 2026 年 7 月 18 日在区块高度 3417100 时生效，这些节点已无法再启动。
- 节点和钱包现已成为独立程序。[Zallet](https://github.com/zcash/zallet) 与节点配合运行并保管密钥。
- 运行自己的节点可让你独立验证，无需信任他人的服务器。

## 核心说明

全节点是运行加密货币区块链完整副本的软件，让你能够使用该协议的功能。

它保存自创世区块以来发生的每笔交易的完整记录，因此能够验证添加到区块链中的新交易和区块的有效性。

## 节点实现

### Zebra

Zebra 是由 Zcash Foundation 创建、使用 Rust 编写的 Zcash 协议独立且可用于生产环境的全节点实现。由于 zcashd 已退役，建议新的部署使用 Zebra（`zebrad`）全节点。

Zebra 验证区块和交易、参与点对点网络，并为应用程序提供 RPC 接口。钱包现在是一个独立组件：[Zallet](https://github.com/zcash/zallet) 与 Zebra 节点配合运行，负责处理密钥和余额。这取代了将节点和钱包捆绑在单一进程中的 zcashd。

要为屏蔽轻钱包提供服务，节点需与索引器一同运行，可以使用已成熟的 [lightwalletd](https://github.com/zcash/lightwalletd)，或较新的 [Zaino](https://zechub.wiki/zaino)。

请务必阅读 Zebra 手册以获取设置说明，并加入 R&D Discord 服务器寻求支持。

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra 手册](https://zebra.zfnd.org)

请参阅 [Zebra 全节点](/zcash-tech/zebra-full-node)，了解安装步骤、配置和硬件要求。

### Zakura

Zakura 是第二种兼容共识的全节点，从 Zebra 分叉而来，由 Valar Group 与 Project Tachyon 共同开发。它遵循相同的协议规则，并新增更快的同步、区块修剪以及 zcashd RPC 兼容层。请参阅 [Zakura 节点](/zcash-tech/zakura-node)。

### zcashd（已退役）

> **注意：**zcashd 已退役。Electric Coin Company [宣布弃用](https://z.cash/support/zcashd-deprecation/)，支持终止自动停机于 2026 年 7 月 18 日在区块高度 3417100 时生效。所有未经修改的 zcashd 6.20.0 节点均在该高度关闭并拒绝重新启动，该软件也不支持 NU6.3。请使用 Zebra。如果你持有 zcashd `wallet.dat`，请遵循 [迁移指南：从 zcashd 迁移至 Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet)。

zcashd 是 Zcash 的原始全节点实现，由 Electric Coin Company 开发和维护。下方保留构建说明，供参考以及供从 zcashd 迁出的运营者使用。

Zcashd 通过其 RPC 接口提供一组 API。这些 API 提供的功能允许外部应用程序与节点交互。

[Lightwalletd](https://github.com/zcash/lightwalletd) 是使用全节点的应用程序示例，它让开发者无需直接与 Zcashd 交互即可构建和维护适合移动设备的屏蔽轻钱包。

[支持的 RPC 命令完整列表](https://zcash.github.io/rpc/)

[Zcashd 手册](https://zcash.github.io/zcash/)

#### 启动节点（Linux）

- 安装依赖项

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 克隆最新版本，检出、设置并构建：

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- 同步区块链（可能需要数小时）

    要启动节点，请运行：

      ./src/zcashd

- 私钥存储在 ~/.zcash/wallet.dat 中

[树莓派上的 Zcashd 指南](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## 实际影响

### 网络

通过运行全节点，你正在通过支持去中心化来帮助增强 zcash 网络。

这有助于防止对手控制，并使网络能够抵御某些形式的中断。

DNS 种子节点通过内置服务器公开其他可靠节点的列表。这让交易能够在整个网络中传播。

### 网络统计数据

以下是可访问 Zcash 网络数据的示例平台：

[Zcash 区块浏览器](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

你还可以通过运行测试、提出新的改进建议并提供指标，为网络的发展作出贡献。

### 挖矿

矿工需要全节点来访问所有与挖矿相关的 RPC，例如 getblocktemplate 和 getmininginfo。

Zcashd 还支持挖矿至屏蔽 coinbase。矿工和矿池可以选择默认直接挖矿，将屏蔽的 ZEC 累积到 z-address 中。

阅读 [挖矿指南](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)，或加入社区论坛中面向 [Zcash 矿工](https://forum.zcashcommunity.com/c/mining/13)的页面。

### 隐私

运行全节点可让你独立验证 Zcash 网络上的所有交易和区块。

运行全节点可避免使用第三方服务代你验证交易时带来的一些隐私风险。

使用自己的节点还可以通过 [Tor](https://zcash.github.io/zcash/user/tor.html) 连接到网络。
这还有一个额外优势：允许其他用户私密地连接到你的节点 .onion 地址。

## 常见错误

- 根据上述说明构建 zcashd，并期待得到可用的节点。这些二进制文件会在弃用高度停止运行。
- 运行节点后，便以为移动钱包现在会使用它。轻钱包会继续与其配置的服务器通信，直到你将其指向自己的服务器。请参阅 [轻钱包节点](/zcash-tech/lightwallet-nodes)。
- 仅运行 `zebrad`，并期待轻钱包连接。节点旁边还需要一个索引器，即 lightwalletd 或 [Zaino](/zcash-tech/zaino)。
- 在节点中寻找钱包 RPC。密钥和余额已移至 Zallet。

## 相关页面

- [Zebra 全节点](/zcash-tech/zebra-full-node) - 安装、配置并运行推荐的节点
- [Zakura 节点](/zcash-tech/zakura-node) - 第二种节点实现，从 Zebra 分叉而来
- [轻钱包节点](/zcash-tech/lightwallet-nodes) - 轻钱包查询的服务器
- [Zaino](/zcash-tech/zaino) - 为轻钱包提供服务的 Rust 索引器
- [Zcash 钱包同步](/zcash-tech/zcash-wallet-syncing) - 同步为何以这种方式运作

## 延伸学习

阅读 [支持文档](https://zcash.readthedocs.io/en/latest/)

加入我们的 [Discord 服务器](https://discord.gg/zcash)，或通过 [X](https://X.com/ZecHub) 联系我们
