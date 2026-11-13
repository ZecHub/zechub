<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 全节点 [Full Nodes]

## TL;DR

- 全节点保存Zcash blockchain 的完整副本，并根据共识 [consensus] 规则检查每个新区块 [block] 和交易 [transaction]。
- Zebra (`zebrad`) 是目前应安装的节点 [node]。Zakura 是第二种实现，从Zebra分叉而来。
- zcashd 已退役。其支持终止停机时间已于 2026 年 7 月 18 日在区块高度 3417100 到达，这些节点已无法再启动。
- 节点和钱包 [wallet] 现在是独立程序。[Zallet](https://github.com/zcash/zallet) 针对节点运行并持有密钥。
- 运行自己的节点可让你独立验证，并免于信任他人的服务器。

## 核心说明

全节点是运行某种加密货币 blockchain 完整副本的软件，使你能够使用该协议的功能。

它保存自创世以来发生的每笔交易的完整记录，因此能够验证添加到 blockchain 的新交易和区块的有效性。

## 节点实现

### Zebra

Zebra 是Zcash协议的独立、可用于生产环境的全节点实现，由Zcash Foundation创建并以Rust编写。由于zcashd已退役，Zebra (`zebrad`) 是新部署推荐使用的全节点。

Zebra验证区块和交易，参与点对点网络，并为应用程序提供 RPC 接口。钱包现在是独立组件：[Zallet](https://github.com/zcash/zallet) 针对Zebra节点运行，并处理密钥和余额。这取代了zcashd，后者将节点和钱包捆绑在单一进程中。

为了服务屏蔽 [shielded] 轻钱包，节点会与索引器一同运行，可以是成熟的[lightwalletd](https://github.com/zcash/lightwalletd)，也可以是较新的[Zaino](https://zechub.wiki/zcash-tech/zaino)。

请务必阅读Zebra手册以获取设置说明，并加入研发Discord服务器寻求支持。

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Zebra手册](https://zebra.zfnd.org)

请参阅[Zebra 全节点](/zcash-tech/zebra-full-node)，了解安装步骤、配置和硬件要求。

### Zakura

Zakura 是第二种兼容共识的全节点，从Zebra分叉而来，由Valar Group与 Project Tachyon共同开发。它遵循相同的协议规则，并增加了更快的同步、区块裁剪以及zcashd RPC 兼容层。请参阅[Zakura 节点](/zcash-tech/zakura-node)。

### zcashd（已退役）

> **注意：** zcashd已退役。Electric Coin Company [宣布弃用](https://z.cash/support/zcashd-deprecation/)，自动支持终止停机时间已于 2026 年 7 月 18 日在区块高度 3417100 到达。每个未修改的zcashd 6.20.0 节点都在该高度关闭并拒绝重新启动，且该软件不支持NU6.3。请使用Zebra。如果你持有zcashd `wallet.dat`，请遵循[迁移指南：从zcashd迁移至zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet)。

zcashd 曾是Zcash的原始全节点实现，由Electric Coin Company开发和维护。以下构建说明保留供参考，也适用于正从zcashd迁移的运营者。

zcashd通过其 RPC 接口公开了一组 API。这些 API 提供了让外部应用程序与节点交互的功能。

[lightwalletd](https://github.com/zcash/lightwalletd) 是一个应用程序示例，它使用全节点，使开发者能够构建和维护适合移动设备的屏蔽轻钱包，而无需直接与zcashd交互。

[完整受支持 RPC 命令列表](https://zcash.github.io/rpc/)

[zcashd手册](https://zcash.github.io/zcash/)

#### 启动节点（Linux）

- 安装依赖项

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 克隆最新版本、检出、设置并构建：

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- 同步 Blockchain（可能需要数小时）

    要启动节点，请运行：

      ./src/zcashd

- 私钥存储在 ~/.zcash/wallet.dat 中

[在 Raspberry Pi 上运行zcashd的指南](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## 实际影响

### 网络

运行全节点可以通过支持其去中心化 [decentralization] 来帮助增强 zcash 网络。

这有助于防止对手控制，并使网络能够抵御某些形式的中断。

DNS 种子节点通过内置服务器公开其他可靠节点的列表。这使交易能够在整个网络中传播。

### 网络统计数据

以下是可访问Zcash网络数据的平台示例：

[Zcash 区块浏览器](https://mainnet.zcashexplorer.app)

[Coin Metrics 网络数据](https://docs.coinmetrics.io/network-data/network-data-overview) — 指标文档以及当前资产覆盖范围的链接。

你也可以通过运行测试或提出新的改进建议并提供指标，为网络的发展做出贡献。

### 挖矿 [Mining]

矿工 [Miners] 需要全节点来访问所有与挖矿相关的 RPC，例如 getblocktemplate 和 getmininginfo。

zcashd 还支持挖矿至屏蔽 coinbase。矿工和挖矿 pool 可以选择默认直接挖矿，以便在 z-address 中累积屏蔽ZEC。

阅读[挖矿指南](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)，或加入社区论坛中面向[Zcash 矿工](https://forum.zcashcommunity.com/c/mining/13)的页面。

### 隐私 [Privacy]

运行全节点使你能够独立验证Zcash网络上的所有交易和区块。

运行全节点可避免使用第三方服务代表你验证交易所带来的某些隐私风险。

使用自己的节点还允许通过[Tor](https://zcash.github.io/zcash/user/tor.html)连接到网络。
这还有一项额外优势，即允许其他用户私密连接到你的节点 .onion 地址。

## 常见错误

- 根据上述说明构建zcashd，并期待获得可用节点。这些二进制文件会在弃用高度停止运行。
- 运行一个节点，并假定你的移动钱包现在使用它。轻钱包会继续与其配置的服务器通信，直到你将它指向自己的服务器。请参阅[轻钱包节点](/zcash-tech/lightwallet-nodes)。
- 仅运行`zebrad`，并期待轻钱包连接。节点旁边需要有索引器，可以是lightwalletd，也可以是[Zaino](/zcash-tech/zaino)。
- 在节点上查找钱包 RPC。密钥和余额已移至Zallet。

## 相关页面

- [Zebra 全节点](/zcash-tech/zebra-full-node) - 安装、配置并运行推荐的节点
- [Zakura 节点](/zcash-tech/zakura-node) - 第二种节点实现，从Zebra分叉而来
- [轻钱包节点](/zcash-tech/lightwallet-nodes) - 轻钱包查询的服务器
- [Zaino](/zcash-tech/zaino) - 为轻钱包提供服务的Rust索引器
- [Zcash 钱包同步](/zcash-tech/zcash-wallet-syncing) - 同步为何以这种方式运作

## 延伸学习

阅读[支持文档](https://zcash.readthedocs.io/en/latest/)

加入我们的[Discord服务器](https://discord.gg/zcash)，或通过[X](https://X.com/ZecHub)联系我们
