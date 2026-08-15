---
<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>


# 为什么隐私很重要

在数字时代，保护你的[隐私](https://www.privacyguides.org/en/)变得愈发重要。虽然有些人可能认为隐私已无可挽回，但事实并非如此。你的隐私正面临风险，因此值得关注。隐私具有重要价值，因为它与权力相关，而确保这种权力被负责任地使用至关重要。

## Tor 与 I2P 技术

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) 是一种代理工具，它利用 Tor 网络为应用程序建立连接。Torbot 通过将这些应用的流量路由到 Tor 网络中来实现这一点，从而增强这些应用的[隐私与匿名性](https://www.torproject.org/)。

## I2P 网络

I2P 网络，也称为 [Invisible Internet Project](https://geti2p.net/en/about/intro)，是一个完全加密的点对点覆盖网络。它确保消息的内容、来源和目的地都不会被观察者看到。换句话说，没有人能够看到流量的来源或去向，也无法看到正在传输消息的实际内容。I2P 所使用的加密技术为其用户提供了高水平的隐私和匿名性。

### 安装 I2P

I2P 有两种实现。原版 [Java I2P](https://geti2p.net/en/download) 可运行于 Windows、macOS、Linux 和 Android。[i2pd](https://i2pd.website/) 采用 C++ 编写，更轻量，通常是在服务器或低性能机器上的常见选择。

启动后，I2P 会在 `127.0.0.1:7657` 提供一个本地控制台，并在 `127.0.0.1:4444`（HTTP）和 `127.0.0.1:4447`（SOCKS）提供代理。首次启动时预计需要几分钟：I2P 必须先通过网络建立隧道后才能正常工作，而且在线时间越长，速度通常会越快。

### 将 I2P 与 Zcash 一起使用

请注意，**当前没有任何 Zcash 节点原生支持 I2P。** Zebra 不支持 I2P，zcashd 过去也不支持。如果你看到某个指南声称可以通过 I2P 运行 Zcash 节点，那它描述的是软件实际上做不到的事情。

I2P 在这里真正有用的地方，是钱包周边的各种活动：访问网站、论坛或服务，同时不暴露你的地址。至于让钱包连接本身实现匿名，Tor 目前仍是更现实的选择，下面的章节会介绍这一点。

## Tor 和 I2P 具有一些共同特性，但也存在显著差异。 

Tor 和 I2P 都是去中心化且匿名的点对点网络，但与 Tor 相比，I2P 提供了更高等级的安全性。不过，I2P 主要是为在其自身网络内部访问电子邮件、聊天和种子下载等服务而设计的，不能用于访问常规互联网。另一方面，Tor 允许用户访问 deep web，就像 I2P 一样，但它也可以像普通浏览器那样访问 surface web 上的网站。

*注意：如需了解 Tor 与 I2P 的更多相似点和差异，请访问[这里](https://geti2p.net/en/comparison/tor)*

## 使用 Orbot 通过 Tor 路由移动端钱包

Orbot 是一款免费的智能手机虚拟专用网络（VPN），它会将你设备上所有应用程序的流量都通过 Tor 网络进行转发。

请按照以下说明将 Zcash 钱包通过 Tor 路由。请注意，本指南早期版本使用的 Ywallet 已不再维护，并且在 Ironwood 之后将不会继续跟随网络，因此请从[钱包](/using-zcash/wallets)页面选择一个仍在维护的钱包。

1.  从应用商店下载并安装 *Orbot*。

2.  安装完成后，会出现一条欢迎消息。继续进入 *Orbot* 主页并点击 *'Tor Enabled Apps'.*              

3. 这时屏幕上会显示一个页面，列出兼容 Tor 的应用程序。在列表中找到你的 Zcash 钱包，并确保已选中它。

4. 随后会出现一个用于设置 VPN 的连接请求，这将允许 *Orbot* 监控网络流量。批准该权限后，*Orbot* 将完成初始化。 

5. 检查任务栏或 Orbot 主页，以确认 Tor 正在运行；当你看到“Connected to the Tor network”时，即表示已连接成功。

*注意：如果你的移动网络屏蔽了 Tor，你可以使用 Bridge Server 作为另一种连接方式。*


## 在 PC 或桌面设备上安装 Tor

* 可以从官方网站下载 Tor 浏览器，你可以通过[这里](https://www.torproject.org/download/)访问该链接。

 安装 Tor 最方便的方式是使用 Tor Browser Bundle。如果你更偏好无界面安装，也可以选择单独安装 Tor 守护进程。 

*注意：默认情况下，Tor Browser bundle 会在 tcp/9150 暴露一个 SOCKS 监听器，而 Tor 守护进程会在 tcp/9050 暴露这个 SOCKS 监听器。*

* 请参考 Tor Project 为你的操作系统提供的安装[说明](https://support.torproject.org/apt/)。

## 通过 Tor 运行节点

这是变化最大的一部分，而坦率地说，目前它比过去更难实现。

**zcashd 已经退出。** 它已结束支持，并于 2026 年 7 月 18 日在区块 3,417,100 停止运行。它不会重新启动，它的下载页面返回 404，apt 仓库也不再提供服务。任何告诉你运行 `zcashd -proxy=127.0.0.1:9050` 的说明都已经不再适用于任何实际场景。

**Zebra 目前也还做不到。** Zebra 是当前受维护的节点，它的网络 crate 确实包含用于 Tor 的隔离连接代码，但该功能在 `zebra-network/Cargo.toml` 中被注释掉了：

```
# tor = ["arti-client", "tor-rtcompat"]
```

该 crate 的文档也明确说明了同样的情况：*"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* 与之相关的 `connect_isolated_tor` 函数也一并被注释掉了。因此，如今没有受支持的方法可以通过 Tor 运行 Zcash 节点。

如果你现在就需要节点级别的匿名性，可行的方法是让整台机器在操作系统层面通过 Tor 或 VPN 接入，而不是配置节点本身。这样可以保护你的网络位置，而无需依赖那些尚未构建完成的节点功能。

### 你今天仍然可以做什么

- **让你的钱包通过 Tor 路由**，移动端可以使用 Orbot，如上所述。这是对大多数人来说最实用的选项，它会向你的钱包所连接的 lightwalletd 服务器隐藏你的 IP
- **使用 Tor Browser** 访问区块浏览器、论坛，以及任何你不希望因地址而被关联的其他内容
- **记住 Tor 无法隐藏什么。** 它匿名化的是你的网络位置，而不是你的链上活动。从透明地址发送交易仍然是公开的，而在不同 shielded pools 之间转移价值仍会公开金额。有关哪些内容仍然可见，请参阅[Shielded Pools](/using-zcash/shielded-pools)
