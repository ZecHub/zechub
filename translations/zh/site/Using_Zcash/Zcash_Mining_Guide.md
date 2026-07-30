# Zcash 挖矿指南：使用个人硬件加入矿池

## 简介

Zcash (ZEC) 是一种以隐私为重点的加密货币，使用 Equihash 工作量证明算法进行挖矿。挖掘 Zcash 需要使用算力来解决复杂的数学问题、验证交易并保护网络，以换取 ZEC 奖励。由于网络难度较高，不建议大多数用户进行单独挖矿。加入矿池是获得稳定收益的最佳方式，因为你可以将自己的哈希算力与其他人结合起来。

本指南重点介绍如何使用个人硬件挖掘 Zcash（例如带有 GPU 的家用 PC 或入门级 ASIC）。请注意，虽然 GPU 仍然可以挖掘 Zcash，但由于网络难度的原因，到 2026 年 ASIC 的效率和盈利能力要高得多。请始终使用 WhatToMine.com 等工具检查当前盈利情况，因为电费、硬件价格和 ZEC 价值等因素都会影响可行性。挖矿未必对所有人都有利可图；请研究当地法规和能源价格（目标是低于 $0.08/kWh）。


## 要求

### 硬件
- **GPU 挖矿（推荐新手使用个人搭建环境）：**
  - NVIDIA 或 AMD GPU，至少具备 4GB VRAM（例如 NVIDIA GTX 1070、RTX 3060；AMD RX 580 或更高型号）。
  - 兼容的主板、足够的 PSU（多 GPU 至少 750W），以及良好的散热，以防过热。
  - 多 GPU 矿机较为常见，可获得更好的哈希率（例如 6x GPUs 可达到 1-2 kSol/s）。
- **ASIC 挖矿（效率更高但成本也更高）：**
  - 兼容 Equihash 的 ASIC，例如 Bitmain Antminer Z15（420 kSol/s）或 Innosilicon A9（50 kSol/s）。
  - 这类设备噪音更大、发热更高、耗电更多（例如 1500W+）；适合专门的放置空间。请从 Bitmain.com 或经销商（Blockware Mining）等可靠来源购买。
- **通用要求：** 稳定的网络连接，以及一台用于设置和监控的电脑。ASIC 主导着整个网络（2026 年总算力约为 ~13 GSol/s），这使 GPU 挖矿竞争力下降，但对于爱好者来说仍然可行。

### 软件
- **操作系统：** Windows 10/11、Linux（推荐 Ubuntu，稳定性更好）。
- **挖矿软件：**
  - 对于 GPU：lolMiner（支持 AMD/NVIDIA）、GMiner 或 miniZ（更偏向 NVIDIA）。请从官方 GitHub 仓库下载（例如 github.com/Lolliedieb/lolMiner-releases）。
  - 对于 ASIC：使用制造商内置的固件/控制面板（例如 Bitmain 的网页界面）。
- **钱包：** 用于接收付款的 Zcash 钱包。推荐：
  - Shielded（私密）：Zashi Wallet、Zingo（Mobile/Desktop）YWallet（mobile/desktop）。
  - Transparent（更简单但隐私性较弱）：Edge Wallet、Zecwallet Lite。
  - 从[wallets](https://zechub.wiki/wallets)下载。如果矿池支持，为了隐私请生成一个 shielded 地址（以 `zs` 开头）。

### 其他
- 电费：请计算成本。GPU 每张卡耗电 150-300W；ASIC 为 1000W+。
- 杀毒软件：设置过程中请先禁用，因为它可能会将矿工程序识别为威胁。

## 加入矿池的分步指南

### 第 1 步：设置你的 Zcash 钱包
1. 从官方 Zcash 网站 [wallets](https://zechub.wiki/wallets) 下载并安装钱包。
2. 创建一个新钱包，并安全备份你的助记词。
3. 生成一个收款地址（为了隐私，优先使用 shielded 地址）。记下来，例如 `zs1exampleaddress...`。
4. 如果使用 transparent 地址（以 `t` 开头），设置会更简单，但隐私性更弱。

### 第 2 步：准备你的硬件
- 对于 GPU：
  1. 将 GPU 安装到你的 PC 中，并更新驱动程序（NVIDIA：GeForce Experience；AMD：Radeon Software）。
  2. 如果你有经验，可以进行超频（使用 MSI Afterburner 保持稳定；建议核心频率 +100-200，显存 -500 以提高效率）。
- 对于 ASIC：
  1. 将 ASIC 连接电源和以太网。
  2. 使用 Advanced IP Scanner 或制造商应用等工具查找其 IP 地址。
  3. 访问网页控制面板（例如在浏览器中输入 IP，Bitmain 的默认登录为：root/root）。

**警告：** 确保通风良好；挖矿会产生热量。先从小规模开始测试。

### 第 3 步：选择并加入矿池
矿池会分发工作，并根据你贡献的哈希率共享奖励。选择时应考虑手续费（0-2%）、最低支付门槛（0.01-0.1 ZEC）、地理位置（低延迟）和可靠性。

**推荐矿池（基于算力、手续费和评价）：**
- **2Miners (zec.2miners.com)**：1% 手续费，PPLNS 支付，支持 GPU/ASIC/NiceHash。高算力（~1.17 GSol/s），服务器可靠。
- **F2Pool (zec.f2pool.com)**：2% 手续费，PPS+ 支付，支持多币种。大型矿池（~2.57 GSol/s）。
- **ViaBTC (zec.viabtc.com)**：2% 手续费（PPS+），控制面板友好，全球服务器。
- **AntPool (zec.antpool.com)**：1% 手续费，来自 Bitmain，适合 ASIC（~494 MSol/s）。
- 其他：Kryptex Pool、Luxor（可查看 poolwatch.io/coin/zcash 获取实时统计）。

1. 访问矿池网站并创建账户（邮箱注册，或像 2Miners 这样的部分矿池无需注册）。
2. 在设置中添加你的 Zcash 钱包地址用于收款。
3. 记下矿池的 stratum 服务器（例如 zec.2miners.com:1010）和端口。

### 第 4 步：安装并配置挖矿软件
- 对于 GPU（示例：Windows/Linux 上的 lolMiner）：
  1. 从 GitHub 下载 lolMiner（最新版本，例如 1.88）。
  2. 解压到一个文件夹中。
  3. 创建一个批处理文件（start.bat），配置如下：
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - 将 `YOUR_WALLET_ADDRESS` 替换为你的 ZEC 地址。
     - `WORKER_NAME`：你的矿机名称（例如 Rig1）。
     - 欧盟服务器：eu.zec.2miners.com:1010。
  4. 运行该批处理文件。它会连接到矿池并开始挖矿。
- 对于 ASIC（示例：Bitmain Antminer）：
  1. 登录网页控制面板。
  2. 前往 Miner Configuration。
  3. 添加矿池信息：
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x（或留空）。
  4. 保存并重启矿机。
- 对于其他软件（例如 GMiner）：
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**测试：** 运行 10-15 分钟；检查控制台中是否有 accepted shares 和哈希率。

### 第 5 步：开始挖矿并进行监控
1. 启动矿工程序：它将连接到矿池并开始提交 shares。
2. 通过以下方式监控：
   - 矿池控制面板：输入你的钱包地址以查看哈希率、未支付余额和统计数据。
   - 软件控制台：留意错误和温度（保持低于 80 摄氏度）。
   - 工具：使用 HiveOS 或 SimpleMining OS 进行远程矿机管理。
3. 支付：大多数矿池在你达到最低门槛后会自动支付（例如 0.05 ZEC）。请查看矿池规则。

   
![Zcash 挖矿监控设置](https://raw.githubusercontent.com/ZecHub/zechub/aac601cf85076960d334f4c841867a646a5a2f29/assets/images/zcashMining.jpg)


## 提示与最佳实践
- **盈利能力：** 使用 whattomine.com/coins/166-zec-equihash 等计算器。示例：RTX 3060（~300 Sol/s）在 $50/ZEC 时每天可赚取约 ~0.001 ZEC，扣除约 ~$0.50 电费后再计算实际收益。
- **隐私：** 如果可用，请使用 shielded 矿池；避免重复使用地址。
- **安全：** 使用强密码；在矿池/钱包上启用 2FA。绝不要分享私钥。
- **故障排查：** 如果没有 shares，请检查防火墙、杀毒软件或配置是否错误。可加入 forum.zcashcommunity.com 或 Reddit r/zec 等论坛。
- **替代方案：** 如果无利可图，可以考虑云挖矿或质押其他币种。
- **环境说明：** 挖矿会消耗能源；如有可能，请使用可再生能源。
- **更新：** Zcash 未来可能演进（例如可能转向 PoS）；请查看 z.cash 获取最新消息。
