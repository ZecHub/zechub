# Zcash 挖矿指南：使用个人硬件加入矿池

## 简介

Zcash (ZEC) 是一种以隐私为重点的加密货币，使用 Equihash 工作量证明算法进行挖矿。挖掘 Zcash 需要使用计算能力来解决复杂的数学问题、验证交易并保护网络安全，以换取 ZEC 奖励。由于网络难度较高，不建议大多数用户单独挖矿。加入矿池是获得稳定奖励的最佳方式，因为你可以将自己的算力与其他人结合起来。

本指南重点介绍如何使用个人硬件挖掘 Zcash（例如配备 GPU 的家用 PC 或入门级 ASIC）。请注意，尽管 GPU 仍然可以挖掘 Zcash，但由于网络难度的原因，到 2026 年 ASIC 的效率和盈利能力要高得多。请务必使用 WhatToMine.com 之类的工具检查当前盈利情况，因为电费、硬件价格和 ZEC 价值等因素都会影响可行性。挖矿不一定对所有人都有利可图；请研究当地法规和能源价格（目标是 < $0.08/kWh）。


## 要求

### 硬件
- **GPU 挖矿（推荐给初学者的个人配置）：**
  - NVIDIA 或 AMD GPU，至少具备 4GB VRAM（例如 NVIDIA GTX 1070、RTX 3060；AMD RX 580 或更高）。
  - 兼容的主板、足够的 PSU（多 GPU 配置至少 750W），以及良好的散热以防止过热。
  - 多 GPU 矿机在获得更高哈希率方面很常见（例如，6x GPU 可达到 1-2 kSol/s）。
- **ASIC 挖矿（效率更高但成本更高）：**
  - 兼容 Equihash 的 ASIC，例如 Bitmain Antminer Z15（420 kSol/s）或 Innosilicon A9（50 kSol/s）。
  - 这类设备噪音更大、发热更高、耗电更多（例如 1500W+）；适合专用空间。请从 Bitmain.com 或经销商（Blockware Mining）等可靠来源购买。
- **通用要求：** 稳定的互联网连接，以及一台用于设置/监控的电脑。ASIC 在网络中占据主导地位（2026 年总哈希率约为 13 GSol/s），使 GPU 挖矿竞争力下降，但爱好者仍然可以尝试。

### 软件
- **操作系统：** Windows 10/11、Linux（推荐 Ubuntu 以获得稳定性）。
- **挖矿软件：**
  - 对于 GPU：lolMiner（支持 AMD/NVIDIA）、GMiner 或 miniZ（偏向 NVIDIA）。请从官方 GitHub 仓库下载（例如 github.com/Lolliedieb/lolMiner-releases）。
  - 对于 ASIC：使用制造商内置的固件/控制面板（例如 Bitmain 的网页界面）。
- **钱包：** 一个用于接收付款的 Zcash 钱包。推荐：
  - Shielded（私密）：Zodl Wallet、Zingo（Mobile/Desktop）YWallet（mobile/desktop）。
  - Transparent（更简单但隐私性较弱）：Edge Wallet、Zecwallet Lite。
  - 从 [钱包](https://zechub.wiki/wallets) 下载。如果矿池支持，生成一个 shielded 地址（以 `zs` 开头）以获得更好的隐私。

### 其他
- 电力：计算成本。GPU 每张卡耗电 150-300W；ASIC 为 1000W+。
- 杀毒软件：设置期间请禁用，因为它可能会将挖矿程序标记为威胁。

## 加入矿池的分步指南

### 第 1 步：设置你的 Zcash 钱包
1. 从官方 Zcash 网站 [钱包](https://zechub.wiki/wallets) 下载并安装一个钱包。
2. 创建一个新钱包，并安全备份你的助记词。
3. 生成一个接收地址（最好使用 shielded 以保护隐私）。记下它，例如 `zs1exampleaddress...`。
4. 如果使用 transparent 地址（以 `t` 开头），会更简单，但隐私性较弱。

### 第 2 步：准备你的硬件
- 对于 GPU：
  1. 将 GPU 安装到你的 PC 中，并更新驱动程序（NVIDIA：GeForce Experience；AMD：Radeon Software）。
  2. 如果有经验，可以进行超频（使用 MSI Afterburner 以保持稳定；目标为核心频率 +100-200，显存 -500 以提高效率）。
- 对于 ASIC：
  1. 将 ASIC 连接电源和以太网。
  2. 使用 Advanced IP Scanner 或制造商应用等工具找到它的 IP 地址。
  3. 访问网页控制面板（例如，在浏览器中输入 IP，Bitmain 的默认登录为：root/root）。

**警告：** 确保通风良好；挖矿会产生热量。先从小规模开始测试。

### 第 3 步：选择并加入矿池
矿池会分发工作，并根据你贡献的哈希率分享奖励。选择时应考虑手续费（0-2%）、最低支付额（0.01-0.1 ZEC）、位置（低延迟）和可靠性。

**推荐矿池（基于哈希率、手续费和评价）：**
- **2Miners (zec.2miners.com)**：1% 手续费，PPLNS 支付，支持 GPU/ASIC/NiceHash。哈希率高（约 1.17 GSol/s），服务器可靠。
- **F2Pool (zec.f2pool.com)**：2% 手续费，PPS+ 支付，支持多币种。大型矿池（约 2.57 GSol/s）。
- **ViaBTC (zec.viabtc.com)**：2% 手续费（PPS+），控制面板友好，全球服务器。
- **AntPool (zec.antpool.com)**：1% 手续费，由 Bitmain 提供，适合 ASIC（约 494 MSol/s）。
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**：Foundry Digital 提供的专业 Zcash 矿池。使用 PPLNS 支付，提供透明的奖励跟踪和企业级支持。最适合机构和大规模 ASIC 矿工；需要账户验证。
- **Sovright (mining.sovright.com)**：一个基于 Stratum V2 构建的 Zcash 矿池，目前作为公共测试网运行。尚无真实 ZEC 支付，因此应将其视为测试配置的方式，而不是收益来源。详情见下方专门章节。
- 其他：Kryptex Pool、Luxor（实时统计请查看 poolwatch.io/coin/zcash）。

1. 访问矿池网站并创建账户（邮箱注册，或像 2Miners 这样的一些矿池无需注册）。
2. 在设置中添加你的 Zcash 钱包地址用于收款。
3. 记下矿池的 stratum 服务器（例如 zec.2miners.com:1010）和端口。

### 第 4 步：安装并配置挖矿软件
- 对于 GPU（示例：Windows/Linux 上的 lolMiner）：
  1. 从 GitHub 下载 lolMiner（最新版本，例如 1.88）。
  2. 解压到一个文件夹。
  3. 创建一个批处理文件（start.bat）并写入配置：
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - 将 `YOUR_WALLET_ADDRESS` 替换为你的 ZEC 地址。
     - `WORKER_NAME`：你的矿机名称（例如 Rig1）。
     - 对于 EU 服务器：eu.zec.2miners.com:1010。
  4. 运行批处理文件。它将连接到矿池并开始挖矿。
- 对于 ASIC（示例：Bitmain Antminer）：
  1. 登录网页控制面板。
  2. 进入 Miner Configuration。
  3. 添加矿池详情：
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x（或留空）。
  4. 保存并重启矿机。
- 对于其他软件（例如 GMiner）：
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**测试：** 运行 10-15 分钟；检查控制台中的已接受 share 和哈希率。

### 第 5 步：开始挖矿并监控
1. 启动矿机：它将连接到矿池并开始提交 share。
2. 通过以下方式监控：
   - 矿池控制面板：输入你的钱包地址以查看哈希率、未支付余额和统计数据。
   - 软件控制台：留意错误和温度（保持 < 80 摄氏度）。
   - 工具：使用 HiveOS 或 SimpleMining OS 进行远程矿机管理。
3. 支付：大多数矿池会在你达到最低门槛时自动支付（例如 0.05 ZEC）。请查看矿池规则。

   
![Zcash 挖矿监控设置](/content-images/zcashMining-5ca0019c17.webp)


## Sovright：测试网矿池与中继网络

Sovright (sovright.com) 运行一个 Stratum V2 挖矿矿池和一个独立的区块中继网络。它们的职责不同，因此下面分开介绍。

### 挖矿矿池 (mining.sovright.com)

Sovright 的矿池运行在公开的 Zcash 测试网（NU6，Stratum V2）上，而不是主网。测试网不会支付真实的 ZEC。请将它用于测试你的矿机配置，而不是盈利。

- 开始使用无需账户。将 CPU 或 ASIC Equihash 矿机指向该矿池后，你的 share 会显示在实时控制面板上。
- Sovright 还发布了一个开源 Stratum V2 代理，适合希望自行选择区块模板、而不是仅接受矿池任务的矿工：

### 监控 Foundry Zcash Pool

对于 Foundry Zcash Pool 用户：

- 通过 Foundry 矿池控制面板监控矿机表现。
- 检查：
  - 活跃矿工
  - 上报哈希率
  - 已接受 share
  - 预估奖励
  - 支付状态

由于 Foundry 使用 PPLNS 奖励模型，挖矿奖励取决于你在矿池奖励窗口内贡献的 share，而不只是即时哈希率。

推荐的监控做法：
- 比较 ASIC 控制面板哈希率与 Foundry 上报的哈希率。
- 调查被拒绝的 share、过期 share 或连接不稳定问题。
- 保持稳定的网络连接，因为宕机会减少已提交的 share 和潜在奖励。
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  将你的矿机指向该代理，而不是直接连接矿池：
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  使用类似 `yourname.rig1` 的矿工名称。
- Sovright 的透明度页面声明对 shielded 交易采取 “include all” 策略，不同于一些会将其过滤掉的矿池。每个区块都会附带签名证明，因此该策略可以被独立验证。
- 在 mining.sovright.com 创建一个账户（Google 或邮箱登录），即可跟踪你自己的矿工，而不是查看示例控制面板数据。

### 中继网络 (relay.sovright.com)

Sovright 还在 Zcash 主网上单独运行一个公共区块中继网络。当矿池找到一个区块时，该区块传播到网络其余部分的速度决定了它变成孤块的频率，也就是它在传播竞赛中失败，导致该区块的奖励丢失。该中继通过带前向纠错的紧凑区块中继，在四个区域之间转发区块。

公开控制面板会实时展示其效果：接入中继的区域接收新区块的速度不到普通点对点 gossip 所需时间的一半，控制面板还会跟踪网络的实时孤块率。

这是面向矿池运营者的基础设施，而不是面向个人矿工。Sovright 的开源 `mining-infra` 仓库记录了一个 `submitblock` 中继网关，用于以比原生 P2P 更快的方式将已发现的区块扩散到网状网络中。如需连接，请直接联系 Sovright（support@sovright.com）获取中继对等方地址和认证密钥。


## 提示与最佳实践
- **盈利性：** 使用 whattomine.com/coins/166-zec-equihash 之类的计算器。示例：RTX 3060（约 300 Sol/s）在 $50/ZEC 时每天可赚取约 0.001 ZEC，减去约 ~$0.50 电费。
- **隐私：** 如果可用，请使用 shielded 矿池；避免重复使用地址。
- **安全：** 使用强密码；在矿池/钱包上启用 2FA。切勿分享私钥。
- **故障排查：** 如果没有 share，请检查防火墙、杀毒软件或错误配置。可加入 forum.zcashcommunity.com 或 Reddit r/zec 等论坛。
- **替代方案：** 如果无利可图，可考虑云挖矿或质押其他币种。
- **环境说明：** 挖矿会消耗能源；如果可能，请使用可再生能源。
- **更新：** Zcash 可能会发展变化（例如，可能转向 PoS）；请查看 z.cash 获取新闻。
