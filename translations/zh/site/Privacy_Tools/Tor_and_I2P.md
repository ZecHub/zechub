<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>


# 为什么隐私很重要

在数字时代，保护你的[隐私](https://www.privacyguides.org/en/)变得越来越重要。虽然有些人可能认为隐私已无可挽回，但事实并非如此。你的隐私正面临风险，因此值得关注。隐私具有重要价值，因为它与权力相关，而确保这种权力被负责任地使用至关重要。

## Tor 与 I2P 技术

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) 是一种代理工具，它利用 Tor 网络为应用程序建立连接。Torbot 通过将这些应用的流量经由 Tor 路由来实现这一点，从而增强这些应用的[隐私和匿名性](https://www.torproject.org/)。

## I2P 网络

I2P 网络，也称为 [Invisible Internet Project](https://geti2p.net/en/about/intro)，是一个完全加密的点对点覆盖网络。它确保消息的内容、来源和目的地对观察者都是隐藏的。换句话说，没有人能够看到流量的来源或去向，也看不到正在传输的消息实际内容。I2P 所采用的加密机制为其用户提供了高水平的隐私和匿名性。

## Tor 和 I2P 具有一些共同特性，但也存在显著差异。 

Tor 和 I2P 都是去中心化且匿名的点对点网络，但与 Tor 相比，I2P 提供了更高水平的安全性。不过，I2P 主要用于访问其网络内部的服务，例如电子邮件、聊天和种子下载，不能用于访问常规互联网。另一方面，Tor 与 I2P 一样允许用户访问深网，但它也可以作为普通浏览器，用于访问表层网络中的网站。

*注意：如需了解 Tor 与 I2P 的相同点和不同点的更多信息，请访问[这里](https://geti2p.net/en/comparison/tor)*

## 在智能手机上将 Tor 与 Ywallet 集成

Orbot 是一款面向智能手机的免费虚拟专用网络（VPN），可将你设备上所有应用程序的流量通过 Tor 网络进行转发。

请按照以下说明将 Tor 连接到 Zcash 钱包 *(Ywallet)*：

1.  从应用商店下载并安装 *Orbot*。

2.  安装完成后，会显示一条欢迎信息。继续进入 *Orbot* 主页，然后点击 *'Tor Enabled Apps'.*              

3. 这将在屏幕上打开一个页面，显示兼容 Tor 的应用程序。找到 *Ywallet* 应用，并确保已选中它。

4. 屏幕上会出现一个用于设置 VPN 的连接请求，这将允许 *Orbot* 监控网络流量。在此权限获得批准后，*Orbot* 将完成初始化。 

5. 检查任务栏或 Orbot 主页以确认 Tor 正在运行；当你看到“Connected to the Tor network”时，即表示已确认连接成功。

* 视频教程请观看[这里](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*注意：如果你的移动网络屏蔽了 Tor，你可以使用 Bridge Server 作为替代连接方式。*


## 如何在 PC/桌面设备上使用 Torbot 设置 Zcash 钱包

## Zcash 是否支持 Tor？

* 可从官方网站下载 Tor 浏览器，你可以通过[这里](https://www.torproject.org/download/)访问链接。

 安装 Tor 最方便的方式是使用 Tor Browser Bundle。如果你更偏好无界面安装，也可以选择单独安装 Tor 守护进程。 

*注意：默认情况下，Tor Browser bundle 会在 tcp/9150 上暴露一个 SOCKS 监听器，而 Tor 守护进程会在 tcp/9050 上暴露 SOCKS 监听器。*

* 请参考 Tor Project 提供的、适用于你的操作系统的安装[说明](https://support.torproject.org/apt/)。

## 安装 Zcashd 钱包

Zcashd 是官方的基于 Linux 的全节点钱包，由 Electric Coin Company 的核心开发者更新和维护。它面向希望挖矿、验证 zcash 交易，以及发送和接收 Zcash 的用户。

* 下载 Zcashd Wallet 的官方网站可在[这里](https://electriccoin.co/zcashd/)找到 

* 安装钱包：由 Zcash 钱包开发者提供的教程视频链接见[这里](https://www.youtube.com/watch?v=hTKL0jPu7X0)。

##  通过 Tor 运行 Zcashd 

* 要将 Zcashd 配置为使用 Tor SOCKS 代理，你可以在守护进程命令中附加 `-proxy` 命令行参数。

 例如：

  $ zcashd -proxy=127.0.0.1:9050
      
或者，将以下一行添加到 zcash.conf 文件中：

  proxy=127.0.0.1:9050

为了使配置更改生效，建议重新启动 zcashd。

请注意，这里假设使用的是 Tor 守护进程。如果使用的是 Tor Browser Bundle，请将 9050 替换为 9150。

此外，你还可以附加命令行参数 `-listenonion`，使守护进程生成一个 .onion 地址，以便其他人可以通过该地址访问你的节点。
