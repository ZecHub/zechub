<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 全节点

全节点是运行任意加密货币区块链完整副本的软件，可访问该协议的各项功能。

它保存着自创世区块以来发生的每一笔交易的完整记录，因此能够验证添加到区块链中的新交易和新区块的有效性。

## Zcashd

Zcashd 目前是 Zcash 使用的主要全节点实现，由 Electric Coin Company 开发和维护。

Zcashd 通过其 RPC 接口公开了一组 API。这些 API 提供了一些功能，使外部应用程序能够与该节点交互。

[Lightwalletd](https://github.com/zcash/lightwalletd) 是一个使用全节点的应用示例，它使开发者能够构建和维护适合移动端的屏蔽轻钱包，而无需直接与 Zcashd 交互。

[支持的 RPC 命令完整列表](https://zcash.github.io/rpc/)

[Zcashd 手册](https://zcash.github.io/zcash/)


### 启动节点（Linux）

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

    启动节点请运行：

      ./src/zcashd

- 私钥存储在 ~/.zcash/wallet.dat 中

[树莓派上的 Zcashd 指南](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra 是由 Zcash Foundation 创建的 Zcash 协议独立全节点实现。

它目前正在测试中，仍属实验性产品。

Zebra 有两个主要组成部分。客户端组件负责区块链扫描和交易的试探性解密。

第二部分是 zebra 命令行工具。该工具管理支出密钥、地址，并与 zebrad 中的客户端组件通信，以提供基础钱包功能。

欢迎任何有兴趣试用 Zebra 挖矿出块的人加入 R&D Discord 服务器。同时务必阅读 Zebra 手册以获取设置说明。

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra 手册](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## 网络

运行全节点就是在通过支持去中心化来帮助增强 zcash 网络。

这有助于防止对抗性控制，并使网络能够抵御某些形式的中断。

DNS 种子节点通过内置服务器公开其他可靠节点的列表。这使交易能够在整个网络中传播。

### 网络统计

以下是一些可访问 Zcash 网络数据的平台示例：

[Zcash 区块浏览器](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

你也可以通过运行测试、提出新的改进建议并提供指标，为网络的发展作出贡献。



### 挖矿

矿工需要全节点来访问所有与挖矿相关的 rpc，例如 getblocktemplate 和 getmininginfo。

Zcashd 还支持挖矿到屏蔽 coinbase。矿工和矿池可以选择默认直接挖到 z-address，以积累屏蔽的 ZEC。

阅读[挖矿指南](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)，或加入面向 [Zcash 矿工](https://forum.zcashcommunity.com/c/mining/13)的社区论坛页面。

### 隐私

运行全节点使你能够独立验证 Zcash 网络上的所有交易和区块。

运行全节点可避免使用第三方服务代你验证交易所带来的一些隐私风险。

使用你自己的节点还可以通过 [Tor](https://zcash.github.io/zcash/user/tor.html) 连接到网络。
这样还有一个额外优势，就是允许其他用户私密连接到你节点的 .onion 地址。


**需要帮助？**

阅读[支持文档](https://zcash.readthedocs.io/en/latest/)

加入我们的 [Discord 服务器](https://discord.gg/zcash) 或通过 [twitter](https://twitter.com/ZecHub) 联系我们

---

**Protected terms (keep in English):** `Zaino` `Zallet`
