<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 为什么隐私很重要

## TL;DR

- **Tor** 会通过 3 个中继转发你的流量，并同时适用于普通网络和 onion 服务——如今它是匿名化钱包连接和浏览的实用默认选择
- **I2P** 是专为其自身内部服务设计的全加密点对点覆盖网络；**当前没有任何 Zcash 节点原生支持 I2P**
- **在移动设备上：** 使用 Orbot ("Tor Enabled Apps")，只需几次点击即可通过 Tor 路由 Zcash 钱包
- **目前无法通过 Tor 运行 Zcash 节点：** `zcashd` 已于 2026 年 7 月 18 日终止支持，且 Zebra 的 Tor 功能在上游仍处于禁用状态
- Tor 隐藏的是*你在哪里*，而不是*你在链上做什么*——透明交易仍然是公开的

在数字时代，保护你的 [隐私](https://www.privacyguides.org/en/) 变得愈发重要。虽然有些人可能认为隐私已无可挽回，但事实并非如此。你的隐私正面临风险，应当受到重视。隐私与权力相关，因此确保这种权力被负责任地运用至关重要。

## Tor 与 I2P 技术

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) 是一种代理工具，利用 Tor 网络为应用程序建立连接。Tor 通过将其流量经由 Tor 路由来实现这一点，从而增强这些应用程序的 [隐私和匿名性](https://www.torproject.org/)。

## I2P 网络

I2P 网络，也称为 [隐形互联网项目](https://geti2p.net/en/about/intro)，是一个全加密的点对点覆盖网络。它确保消息的内容、来源和目的地均对观察者隐藏。换言之，没有人能够看到流量的来源或目的地，也无法看到正在传输的消息实际内容。I2P 所使用的加密为其用户提供了高水平的隐私和匿名性。

### 安装 I2P

有两种实现方式。原始的 [Java I2P](https://geti2p.net/en/download) 可运行于 Windows、macOS、Linux 和 Android。以 C++ 编写的 [i2pd](https://i2pd.website/) 更轻量，通常是在服务器或低性能机器上的选择。

运行后，I2P 会在 `127.0.0.1:7657` 上提供本地控制台，并在 `127.0.0.1:4444`（HTTP）和 `127.0.0.1:4447`（SOCKS）上提供代理。首次启动预计需要数分钟：I2P 必须先通过网络建立隧道，之后才能正常运行，且在线时间越长，速度就越快。

### 将 I2P 与 Zcash 一起使用

请注意，**当前没有任何 Zcash 节点原生支持 I2P。** Zebra 不支持 I2P，zcashd 也不支持。如果你看到某份指南声称可通过 I2P 运行 Zcash 节点，它描述的是该软件实际上无法做到的事情。

I2P 在这里真正有用的地方是钱包周边的一切：访问网站、论坛或服务时不暴露你的地址。若要匿名化钱包连接本身，Tor 是如今的实用选择，下文将对此进行介绍。

## Tor 与 I2P 具有共同特征，但也存在显著差异。 

Tor 和 I2P 都是去中心化且匿名的点对点网络，但与 Tor 相比，I2P 提供了更高水平的安全性。不过，I2P 主要用于访问其网络内的电子邮件、聊天和 torrent 等服务，无法用于访问常规互联网。另一方面，Tor 允许用户像使用 I2P 一样访问深网，同时它也可作为普通浏览器访问表层网络上的网站。

*注意：有关 Tor 与 I2P 的相似之处和差异的更多信息，请访问 [此处](https://geti2p.net/en/comparison/tor)*

## 使用 Orbot 通过 Tor 路由移动钱包

Orbot 是一款专为智能手机设计的免费虚拟专用网络（VPN），可将设备上所有应用程序的流量经由 Tor 网络转发。

请按照以下说明，通过 Tor 路由 Zcash 钱包。请注意，本指南早期版本使用的 YWallet 已不再维护，并且在 Ironwood 之后将不会继续跟随该网络，因此请从 [钱包](/using-zcash/wallets) 页面选择仍在维护的钱包。

1.  从应用商店下载并安装 *Orbot*。

2.  安装后会显示欢迎消息。继续进入 *Orbot* 首页，然后点击 *'Tor Enabled Apps'*。              

3. 屏幕上将显示一个页面，其中列出与 Tor 兼容的应用程序。在列表中找到你的 Zcash 钱包，并确保已选中它。

4. 随后将出现设置 VPN 的连接请求，这将允许 *Orbot* 监控网络流量。权限获准后，*Orbot* 将初始化。

5. 查看任务栏或 Orbot 首页，确认 Tor 正在运行；当你看到“已连接至 Tor 网络”时，即表示已确认。

*注意：如果 Tor 被你的移动网络阻止，你可以使用桥服务器作为替代连接方式。*


## 在 PC 或桌面设备上安装 Tor

* 可从官方网站下载 Tor 浏览器，你可以通过 [此处](https://download.torproject.org/) 访问链接。

 安装 Tor 最方便的方式是使用 Tor Browser Bundle。如果你偏好无头安装，可以选择单独安装 Tor 守护进程。

*注意：默认情况下，Tor Browser bundle 会在 tcp/9150 上提供 SOCKS 监听器，而 Tor 守护进程会在 tcp/9050 上提供 SOCKS 监听器。*

* 请参阅由 Tor Project 提供、适用于你的操作系统的安装 [说明](https://support.torproject.org/little-t-tor/getting-started/installing/)。

## 通过 Tor 运行节点

这是变化最大的一部分，坦率的答案是：目前它比过去更困难。

**zcashd 已不复存在。** 它于 2026 年 7 月 18 日在区块 3,417,100 终止支持并停止运行。它不会重启，其下载页面返回 404，apt 仓库也不再提供服务。任何指导你运行 `zcashd -proxy=127.0.0.1:9050` 的说明都不再适用于任何情况。

**Zebra 目前也无法做到。** Zebra 是仍在维护的节点，其网络 crate 确实包含针对 Tor 的隔离连接代码，但该功能在 `zebra-network/Cargo.toml` 中被注释掉了：

```
# tor = ["arti-client", "tor-rtcompat"]
```

crate 文档也明确说明了同一件事：*"Tor 连接目前处于禁用状态，直到 `arti-client` 的依赖项 `x25519-dalek v1.2.0` 得到更新。"* `connect_isolated_tor` 函数也与它一同被注释掉。因此，今天没有受支持的方法可以通过 Tor 运行 Zcash 节点。

如果你现在需要节点级匿名性，可行的方法是在操作系统层面将整台机器置于 Tor 或 VPN 后方，而不是配置节点本身。这样可保护你的网络位置，而无需依赖尚未构建的节点功能。

### 今天仍然可以做什么

- **使用 Orbot 通过 Tor 路由你的钱包，** 如上文移动设备部分所述。这是大多数人的实用选择，它会向钱包连接的 lightwalletd 服务器隐藏你的 IP
- **使用 Tor Browser** 访问区块浏览器、论坛及其他你不愿因地址而被关联的内容
- **请记住 Tor 不会隐藏什么。** 它会匿名化你的网络位置，而非你的链上活动。从透明地址发送仍然是公开的，在屏蔽池之间转移价值仍会公开金额。请参阅 [屏蔽池](/using-zcash/shielded-pools)，了解哪些内容仍然可见

## 相关页面

- [VPN 和 DVPN](VPN_and_DVPN.md) — VPN 替代方案及其比较方式
- [Web 浏览器](Web_Browsers.md) — 用于日常隐私的浏览器加固
- [安全通讯工具](Secure_Messengers.md) — 私密通信工具
- [区块浏览器能看到什么](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — 你的节点级隐私能保护和不能保护什么
- [屏蔽池](/using-zcash/shielded-pools) — 即使具有网络层匿名性，链上仍然可见的内容
