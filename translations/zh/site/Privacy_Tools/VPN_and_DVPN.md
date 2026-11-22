<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/VPN_and_DVPN.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# VPN 与 dVPN

在数字时代，维护在线隐私 [privacy] 和安全至关重要。虚拟专用网络（VPN）和去中心化 [decentralized] VPN（dVPN）在保护您的在线活动和数据方面发挥着关键作用。本 wiki 页面将探讨传统 VPN 与新兴 dVPN 之间的主要区别、选择 VPN 时的安全考量，以及接受以隐私为核心的加密货币 Zcash 的 VPN 服务列表。

# 有什么区别？

__虚拟专用网络（VPN）__：传统 VPN 会在您的设备与由 VPN 提供商控制的远程服务器之间创建一条安全的加密 [encryption] 隧道。这条隧道可将您的在线活动隐藏起来，避免黑客、ISP 或政府机构等窥探。VPN 被广泛用于匿名浏览、访问受地理限制的内容，以及防范网络威胁等用途。

![image223](/content-images/image-223-399e3015e7.webp)


__去中心化 VPN（dVPN）__：相比之下，dVPN 利用 blockchain 和点对点技术创建由节点 [node] 构成的去中心化网络。用户流量会通过这些节点进行路由，使任何单一实体都难以监控或控制整个网络。dVPN 通常更能抵抗审查，因为没有中央机构监管该网络。它们非常适合寻求更强隐私和安全性的用户。

![dvpn](/content-images/dvpn-89698d4cb9.webp)


# 选择 VPN 时的安全考量

选择 VPN 服务时，务必考虑以下安全因素：

1. __加密__：确保 VPN 使用 OpenVPN 或 WireGuard 等强加密协议，以保护您的数据免遭拦截。

2. __无日志政策__：寻找实行严格无日志政策的提供商，即它们不会保留您的在线活动记录。

3. __服务器位置__：考虑服务器位置的地理分布，以访问不同地区的内容并尽量降低延迟。

4. __终止开关__：如果 VPN 连接中断，终止开关会断开您的互联网连接，防止您的数据暴露。

5. __隐私与司法管辖区__：研究 VPN 提供商的隐私做法及其司法管辖区，因为不同国家的数据保留法律各不相同。

6. __泄漏防护__：确保 VPN 能防止 DNS 和 WebRTC 泄漏，以维持您的匿名性。

7. __价格与功能__：评估不同提供商提供的成本和功能，找到符合您需求和预算的服务。

# VPN 服务和 Zcash 支付

Zcash 的支付 [payment] 支持情况必须逐一向各提供商核实。接受加密货币 [cryptocurrency] 并不一定包括 ZEC，而向第三方交易所 [exchange] 或经销商付款与直接向 VPN 提供商支付不同。以下服务的支付政策各不相同；请在汇款前核实当前接受的货币。

1. [__Mullvad VPN__](https://mullvad.net/en)
   
Mullvad VPN 是一项专注于隐私 [privacy] 的 VPN 服务。其 [当前支付常见问题](https://mullvad.net/en/pricing)列出了接受的支付 [payment] 方式。
加密货币支持并不意味着直接支持每一种币种。Mullvad 的核心功能包括：

   __无日志政策__：Mullvad 遵循严格的无日志政策，这意味着它不会存储任何与您在线活动相关的数据。

   __强加密__：该服务采用强大的加密协议，包括 WireGuard，以保护您的数据。

   __多跳 VPN__：Mullvad 提供多跳连接选项，可让您的流量通过多台服务器路由，以增强隐私和安全性。

   __桥模式__：它具有桥模式，可帮助绕过某些审查措施。

   __匿名账户创建__：系统会为用户分配随机生成的账户号码，无需在注册时提供个人信息。

__加密货币支付 [Cryptocurrency payments]__：已发布的列表列出了 Bitcoin、Bitcoin Cash 和 Monero，而非 Zcash。第三方交易所或经销商属于独立服务；请勿将其描述为 Mullvad 直接接受 ZEC。

3. [__Nym VPN（dVPN）__](https://nym.com/)
   
   Nym VPN 是一种去中心化 VPN（dVPN），通过以隐私为核心的网络专注于增强用户隐私和安全性。Nym VPN 的运作方式不同于传统 VPN，
   它利用 mixnet，用户流量会通过一个节点网络进行路由。Nym VPN 的主要功能包括：

   __去中心化__：Nym VPN 是去中心化且开源的，可降低中央控制和审查的风险。

   __隐私 Mixnet__：该服务通过 mixnet 路由用户流量，使任何单一实体都难以监控或分析网络流量。

   __节点运行__：用户可以运行节点来为网络作出贡献并获得奖励，从而进一步实现基础设施去中心化。

   __强隐私__：Nym VPN 的设计以隐私为核心，且不要求用户在创建账户时提供个人信息。

有关 Zcash 钱包专用路由，请参阅 [通过 Nym Mixnet 路由 Zcash 钱包流量](../guides/Nym_Mixnet_Wallet_Setup.md)。

## 值得查看的其他 VPN 提供商

 3. [__ExpressVPN__](https://www.expressvpn.com/)
 4. [__NordVPN__](https://nordvpn.com/)
 5. [__CyberGhost__](https://www.cyberghostvpn.com/)
 6. [__Private Internet Access（PIA）__](https://www.privateinternetaccess.com/)

请记住，加密货币支付选项的可用性可能会发生变化，因此建议查看 VPN 提供商的网站或联系其客户支持，以获取包括 Zcash 在内的最新可接受支付方式信息。
