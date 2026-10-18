<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑https://github.com/ZecHub/zechub/pull/2238t页面"/>
</a>

# 通过 Nym Mixnet 路由 Zcash 钱包流量

> 最后验证时间：2026 年 9 月 29 日

Zcash 屏蔽交易可保护链上的交易数据，但钱包仍会通过互联网通信。网络观察者可能获知元数据，例如你的 IP 地址、钱包连接的时间以及它所联系的基础设施。

Nym 增加了一层独立的网络隐私保护。截至 2026 年 9 月，最佳方式取决于钱包：

1. **如钱包具备原生 Nym 集成，应优先使用它。**
2. 否则，使用**系统级 NymVPN Mixnet 模式**，让钱包网络流量经由 Nym 路由，而无需依赖钱包专用的代理支持。

有关 VPN 和 dVPN 的一般背景信息，请参阅 [VPN 与 dVPN](./VPN_and_DVPN.md)。

## Nym 提供什么——以及它不提供什么

一笔屏蔽的 Zcash 支付和网络隐私工具解决的是不同的问题：

- **Zcash 屏蔽池**保护链上的交易详情。
- **Nym mixnet 路由**旨在降低真实网络身份与接收钱包流量的服务之间的可关联性。
- 通过系统级 NymVPN 隧道联系的目标应看到 Nym 出口，而非你的家庭/移动网络 IP。

Nym 的 mixnet 使用多跳、数据包混合、随机延迟、掩护流量和洋葱加密，以减少网络元数据泄露。

Nym **不能**防范设备被入侵、恶意钱包软件、恢复短语泄露、通过交易所账户暴露的身份，或由透明 Zcash 活动导致的隐私损失。

## 原生 Nym 支持：可用时请优先使用

Nym 于 2026 年 9 月 24 日宣布，其 Zcash Community Grant 工作已完成，原生 mixnet 支持正部署至真实的 Zcash 钱包中。

### Zingo! 钱包

Zingo PC 包含原生 Nym 传输功能。Zingo Mobile 也通过应用内 Nym 代理，在 iOS 和 Android 上提供 Mixnet Mode。

Zingo 记录的当前行为：

- Nym 控制项位于**设置 → Nym Mixnet**下。
- 发送支付会经由 mixnet 路由。
- Ironwood 迁移传输遵循同一条受保护的发送路径。
- ZEC 价格请求也经由 mixnet 路由。
- 启用 Nym 时，发送采用故障关闭机制：如果 mixnet 传输不可用，支付不会悄然通过明网发送。
- 在 Zingo PC 中，**链同步目前不会经由 mixnet 路由**。紧凑区块、nullifier 查询、交易获取、内存池流量和服务器健康检查仍使用正常的服务器连接。

这一区别很重要：Zingo 的原生集成保护了关联性最高的广播路径，但尚不是完整的设备网络隧道。

如果你的威胁模型还要求向服务器隐藏同步流量，请在了解由此带来的额外延迟和复杂性后，额外使用如 NymVPN 的系统级隐私隧道。

来源：

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym 报告称，**Zkool**现已支持通过原生开关，经由 Nym mixnet 连接到 Zcash RPC 基础设施。

Zkool 是 YWallet 正在积极维护的继任者。其项目还支持用于 Zcash 服务器连接的 Tor 代理和 onion 服务。

与其试图通过未记录的代理路径强制旧版 YWallet 构建运行，不如优先使用 Zkool 的原生 Nym 选项。

来源：

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet 也具备 Nym 感知的传输路径。其当前实现支持通过 Nym mixnet 路由传出交易提交，以及使用独立的 Nym dVPN 路径进行紧凑区块同步。应将这些视为不同的保护措施，而不要假设每个钱包请求都会自动使用 mixnet。

来源：

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl 目前内置的是**Tor Protection**，并非上文为 Zingo、Zkool 和 Nozy 所述的同类原生 Nym 集成。

Zodl 的 Tor 功能可通过 Tor 路由交易提交、交易数据检索、汇率请求和第三方 API 调用。Nym 于 2026 年 9 月 24 日表示，仍在与 Zodl 团队积极讨论更广泛的 mixnet 集成。

目前对于 Zodl，请使用以下任一方式：

- Zodl 文档中说明的 Tor Protection，或
- 若你的目标是让钱包的一般设备流量经由 Nym，则使用系统级 NymVPN。

不要仅因 Tor 和 Nym 都是隐私网络，就假设它们在钱包中是可以互换的传输方式。

Zodl Tor 设置：

**更多 → 高级功能 → Beta：Tor Protection → 启用 → 保存更改**

来源：

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## 备选方案：系统级 NymVPN

这是兼容性最广的 Nym 选项，因为它不要求钱包理解 Nym 专用代理设置。

### 1. 安装 NymVPN

仅从 Nym 官方网站或官方平台商店下载 NymVPN：

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN 支持 Android、iOS、Linux、Windows 和 macOS。

### 2. 选择 Mixnet 模式

NymVPN 提供**Fast mode**（针对较低延迟优化的 2 跳 dVPN 路径）和**Mixnet mode**（针对更强网络元数据保护优化的 5 跳 mixnet 路径）。对于敏感的钱包活动，请选择 Mixnet 模式，并在打开或刷新钱包前等待客户端报告连接已建立。

### 3. 保持钱包使用正常网络设置

当操作系统已通过 NymVPN 隧道路由流量时，大多数钱包无需自定义代理设置。

正常打开钱包并让它同步。

如果 NymVPN 在你的平台上提供分流功能，请确认钱包**已包含在受保护隧道中**，而非被放入绕过或排除列表。

### 4. 使用钱包前验证隧道

一个简单的系统级检查：

1. 断开 NymVPN。
2. 访问公共 IP 检查服务，或在桌面端运行：

   ```bash
   curl https://api.ipify.org
   ```

3. 记录可见的 IP。
4. 以 Mixnet 模式连接 NymVPN。
5. 重复检查。

可见的公共 IP 应发生变化。

这确认的是系统隧道。若应用或操作系统具有特殊路由规则，它**并不能**证明特定钱包发出的每个请求都遵循相同路径。

如需在桌面端获得更高保证：

- 使用操作系统的网络监视器检查钱包进程，
- 验证不存在分流排除规则，
- 确认断开 NymVPN 时钱包行为会按预期变化。

排障时，不要发布含有钱包地址、余额、交易 ID、IP 地址或恢复材料的截图。

## NymVPN dApp / 钱包代理模式

NymVPN 还提供通过 mixnet 进行 SOCKS5 / RPC 路由的应用和钱包代理模式。

Nym 的公开设置文档主要以 Ethereum 风格的 RPC 配置演示此功能。它适用于明确支持兼容通用代理/RPC 路径的软件，但不应假设它适用于每个 Zcash 钱包。

仅当钱包自身文档确认支持兼容的代理或 RPC 时，才使用此路径。

否则，请优先选择：

- 钱包的原生 Nym 集成，或
- 系统级 NymVPN。

## 性能和超时方面的权衡

Mixnet 有意以速度换取更强的元数据保护。

可能受到影响的方面包括：

- 初始钱包同步，
- 大规模追赶同步，
- 交易历史查询，
- RPC 超时，
- 第三方 API 调用。

实用建议：

- 从默认 Nym 设置开始。
- 预计首次同步或长时间追赶同步会耗时更久。
- 在降低隐私设置前，先重试一次超时请求。
- 避免在敏感交易前立即反复切换隐私模式。
- 如果你为批量同步使用更快的路径，请理解在该期间，所联系的基础设施可能会观察到你的真实网络身份。
- 对于 Zingo PC，尤其要记住：其原生 Nym 传输目前保护发送和价格查询，而同步仍是直接进行的。

## 移动端注意事项

在 Android 和 iOS 上，操作系统 VPN 插槽通常是让一般钱包流量经由 NymVPN 路由的最简单方式：先连接 NymVPN，再打开钱包。

如果其他 VPN、防火墙或基于本地 VPN 的广告拦截器已占用系统 VPN 接口，这两个产品可能无法同时运行。在假设钱包受到保护前，请确认操作系统的 VPN 状态。

## 威胁模型检查清单

在依赖此设置前，请问自己：

- 我是否在适当情况下使用屏蔽 Zcash 地址？
- 我的钱包是否具备原生 Nym 支持？
- 如果具备，该原生集成究竟保护哪些流量？
- 如果我需要更广的覆盖范围，钱包开始网络活动前 NymVPN 是否已连接？
- 钱包是否被分流规则排除？
- 我是否依赖钱包实际有文档说明的代理模式？
- 我是否通过交易所、浏览器会话、第三方 API 或透明地址泄露身份？
- 我是否已准备好面对较慢的同步和偶发超时？

## 来源

- Nym：Nym mixnet 现已在 Zcash 钱包中上线，2026 年 9 月 24 日：https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym 行为：https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym 传输：https://github.com/zingolabs/zingo-mobile
- Zkool 仓库：https://github.com/hhanh00/zkool2
- NozyWallet Nym 传输工作：https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12：https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection：https://support.zodl.com/article/17-enabling-tor-protection
