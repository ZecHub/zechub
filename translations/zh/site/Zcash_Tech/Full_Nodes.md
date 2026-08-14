<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 全节点

全节点是一种运行任意加密货币完整 blockchain 副本的软件，可访问该协议的各项功能。

它保存了自创世区块以来发生的每一笔交易的完整记录，因此能够验证新增到 blockchain 中的新交易和新区块的有效性。

## Zcashd

> **注意：** zcashd 正在被弃用。Electric Coin Company 已[正式宣布](https://z.cash/support/zcashd-deprecation/) zcashd 将退役，其全节点角色将由 [Zebra](https://github.com/ZcashFoundation/zebra)（`zebrad`）取代，钱包角色将由 [Zallet](https://github.com/zcash/zallet) 取代。对于新的部署，请使用 Zebra（见下文）。如果你已经在运行 zcashd 节点，请遵循[迁移指南：从 zcashd 到 Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet)。

zcashd 是 Zcash 最初的全节点实现，由 Electric Coin Company 开发和维护。以下构建说明保留供参考，也适用于正在从 zcashd 迁移的运营者。

Zcashd 通过其 RPC 接口公开了一组 API。这些 API 提供的功能允许外部应用程序与节点交互。

[Lightwalletd](https://github.com/zcash/lightwalletd) 是一个使用全节点的应用程序示例，它使开发者能够构建和维护适合移动端的屏蔽轻钱包，而无需直接与 Zcashd 交互。

[支持的 RPC 命令完整列表](https://zcash.github.io/rpc/)

[Zcashd 手册](https://zcash.github.io/zcash/)


### 启动节点（Linux）

- 安装依赖项

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 克隆最新版本，切换版本，进行设置并构建：

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- 同步 blockchain（可能需要数小时）

    启动节点请运行：

      ./src/zcashd

- 私钥存储在 ~/.zcash/wallet.dat 中

[在 Raspberry Pi 上运行 Zcashd 的指南](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra 是一个独立的、可用于生产环境的 Zcash 协议全节点实现，由 Zcash Foundation 创建，并使用 Rust 编写。随着 zcashd 退役，Zebra（`zebrad`）成为新部署推荐使用的全节点。

Zebra 会验证区块和交易，参与点对点网络，并为应用程序提供 RPC 接口。钱包现在是一个独立组件：[Zallet](https://github.com/zcash/zallet) 运行在 Zebra 节点之上，并负责处理密钥和余额。这取代了 zcashd 过去将节点和钱包打包在同一个进程中的方式。

为了服务屏蔽轻钱包，该节点会与索引器一起运行，可以是成熟的 [lightwalletd](https://github.com/zcash/lightwalletd)，也可以是较新的 [Zaino](https://zechub.wiki/zaino)。

请务必阅读 Zebra 手册以获取安装说明，并加入 R&D Discord 服务器寻求支持。

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra 手册](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## 网络

通过运行全节点，你正在通过支持去中心化来帮助增强 zcash 网络。

这有助于防止敌对控制，并让网络在面对某些形式的中断时保持韧性。

DNS seeders 通过内置服务器公开其他可靠节点的列表。这使交易能够在整个网络中传播。

### 网络统计

以下是一些可用于访问 Zcash 网络数据的平台示例：

[Zcash 区块浏览器](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

你还可以通过运行测试、提出新的改进建议以及提供指标，为网络的发展作出贡献。



### 挖矿

矿工需要全节点来访问所有与挖矿相关的 rpc，例如 getblocktemplate 和 getmininginfo。

Zcashd 还支持将 coinbase 挖矿奖励转入屏蔽地址。矿工和矿池可以选择直接挖矿，以便默认将屏蔽的 ZEC 累积到 z-address 中。

请阅读[挖矿指南](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)，或加入 [Zcash 矿工](https://forum.zcashcommunity.com/c/mining/13)的社区论坛页面。

### 隐私

运行全节点可以让你独立验证 Zcash 网络上的所有交易和区块。

运行全节点可以避免使用第三方服务代你验证交易所带来的一些隐私风险。

使用你自己的节点还可以通过 [Tor](https://zcash.github.io/zcash/user/tor.html) 连接到网络。
这还有一个额外优势，即允许其他用户私密地连接到你节点的 .onion 地址。


**需要帮助？**

阅读[支持文档](https://zcash.readthedocs.io/en/latest/)

加入我们的 [Discord 服务器](https://discord.gg/zcash)，或通过 [twitter](https://twitter.com/ZecHub) 联系我们
