---
# Zcash 挖矿指南：使用个人硬件加入矿池

## 简介

Zcash（ZEC）是一种注重隐私的加密货币，采用 Equihash 工作量证明算法进行挖矿。挖掘 Zcash 需要使用计算能力来解决复杂的数学问题，以验证交易并保障网络安全，作为回报可获得 ZEC 奖励。由于网络难度较高，不建议大多数用户进行单独挖矿。加入矿池是获得稳定收益的最佳方式，因为你可以将自己的算力与其他人结合起来。

本指南重点介绍如何使用个人硬件挖掘 Zcash（例如配备 GPU 的家用 PC 或入门级 ASIC）。请注意，尽管 GPU 仍然可以挖 Zcash，但由于网络难度的原因，到 2026 年 ASIC 的效率和盈利能力要高得多。请始终使用 WhatToMine.com 之类的工具检查当前盈利能力，因为电费、硬件价格和 ZEC 价值等因素都会影响可行性。挖矿未必适合所有人盈利；请研究当地法规和能源价格（目标是 < $0.08/kWh）。


## 要求

### 硬件
- **GPU 挖矿（推荐新手采用个人配置）：**
  - NVIDIA 或 AMD GPU，至少具备 4GB VRAM（例如 NVIDIA GTX 1070、RTX 3060；AMD RX 580 或更高）。
  - 兼容的主板、足够的 PSU（多 GPU 时至少 750W），以及良好的散热以防止过热。
  - 多 GPU 矿机很常见，可获得更高哈希率（例如 6 张 GPU 可达到 1-2 kSol/s）。
- **ASIC 挖矿（效率更高但成本更高）：**
  - 兼容 Equihash 的 ASIC，例如 Bitmain Antminer Z15（420 kSol/s）或 Innosilicon A9（50 kSol/s）。
  - 这类设备噪音更大、更热且耗电更多（例如 1500W+）；适合专用空间。请从 Bitmain.com 或经销商（Blockware Mining）等可靠来源购买。
- **通用要求：** 稳定的网络连接，以及一台用于设置/监控的电脑。ASIC 在网络中占主导地位（2026 年总哈希率约为 13 GSol/s），这使得 GPU 挖矿竞争力下降，但爱好者仍可尝试。

### 软件
- **操作系统：** Windows 10/11、Linux（推荐 Ubuntu，稳定性更好）。
- **挖矿软件：**
  - 对于 GPU：lolMiner（支持 AMD/NVIDIA）、GMiner 或 miniZ（更偏向 NVIDIA）。请从官方 GitHub 仓库下载（例如 github.com/Lolliedieb/lolMiner-releases）。
  - 对于 ASIC：使用制造商内置的固件/控制面板（例如 Bitmain 的网页界面）。
- **钱包：** 一个用于接收付款的 Zcash 钱包。推荐：
  - Shielded（私密）：Zashi Wallet、Zingo（Mobile/Desktop）YWallet（mobile/desktop）。
  - Transparent（更简单但隐私性较低）：Edge Wallet、Zecwallet Lite。
  - 从[钱包](https://zechub.wiki/wallets)下载。如果矿池支持，为了隐私请生成一个 shielded 地址（以“zs”开头）。

### 其他
- 电力：计算成本。GPU 每张卡耗电 150-300W；ASIC 为 1000W+。
- 杀毒软件：设置期间请禁用，因为它可能会将矿工软件标记为威胁。

## 加入矿池的分步指南

### 第 1 步：设置你的 Zcash 钱包
1. 从 Zcash 官方网站[钱包](https://zechub.wiki/wallets)下载并安装钱包。
2. 创建一个新钱包，并安全备份你的助记词。
3. 生成一个接收地址（出于隐私考虑，最好使用 shielded 地址）。记下它，例如 `zs1exampleaddress...`。
4. 如果使用 transparent 地址（以“t”开头），会更简单，但隐私性较低。

### 第 2 步：准备你的硬件
- 对于 GPU：
  1. 将 GPU 安装到你的 PC 中，并更新驱动程序（NVIDIA：GeForce Experience；AMD：Radeon Software）。
  2. 如果你有经验，可以进行超频（使用 MSI Afterburner 以保持稳定；为了效率可将核心频率提高 +100-200，显存降低 -500）。
- 对于 ASIC：
  1. 将 ASIC 连接到电源和以太网。
  2. 使用 Advanced IP Scanner 或制造商应用等工具查找其 IP 地址。
  3. 访问网页控制面板（例如在浏览器中输入 IP，Bitmain 默认登录为：root/root）。

**警告：** 确保通风良好；挖矿会产生热量。先从小规模开始测试。

### 第 3 步：选择并加入矿池
矿池会分配工作，并根据你贡献的哈希率共享奖励。请选择手续费（0-2%）、最低支付额（0.01-0.1 ZEC）、地理位置（低 ping）和可靠性都合适的矿池。

**推荐矿池（基于哈希率、手续费和评价）：**
- **2Miners (zec.2miners.com)**：1% 手续费，PPLNS 支付，支持 GPU/ASIC/NiceHash。高哈希率（约 1.17 GSol/s），服务器可靠。
- **F2Pool (zec.f2pool.com)**：2% 手续费，PPS+ 支付，支持多币种。大型矿池（约 2.57 GSol/s）。
- **ViaBTC (zec.viabtc.com)**：2% 手续费（PPS+），控制面板友好，全球服务器。
- **AntPool (zec.antpool.com)**：1% 手续费，由 Bitmain 提供，适合 ASIC（约 494 MSol/s）。
- **Sovright (mining.sovright.com)**：一个构建于 Stratum V2 之上的 Zcash 矿池，目前作为公共测试网运行。尚未提供真实的 ZEC 支付，因此应将其视为测试配置的方式，而非收益来源。详见下方专门章节。
- 其他：Kryptex Pool、Luxor（查看 poolwatch.io/coin/zcash 获取实时统计）。

1. 访问矿池网站并创建账户（使用邮箱，或某些矿池如 2Miners 可免注册）。
2. 在设置中添加你的 Zcash 钱包地址用于收款。
3. 记下矿池的 stratum 服务器（例如 zec.2miners.com:1010）和端口。

### 第 4 步：安装并配置挖矿软件
- 对于 GPU（示例：Windows/Linux 上的 lolMiner）：
  1. 从 GitHub 下载 lolMiner（最新版本，例如 1.88）。
  2. 解压到一个文件夹中。
  3. 创建一个批处理文件（start.bat）并写入配置：
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - 将 `YOUR_WALLET_ADDRESS` 替换为你的 ZEC 地址。
     - `WORKER_NAME`：你的矿机名称（例如 Rig1）。
     - 欧盟服务器：eu.zec.2miners.com:1010。
  4. 运行该批处理文件。它将连接到矿池并开始挖矿。
- 对于 ASIC（示例：Bitmain Antminer）：
  1. 登录网页控制面板。
  2. 进入 Miner Configuration。
  3. 添加矿池信息：
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x（或留空）。
  4. 保存并重启矿机。
- 对于其他软件（例如 GMiner）：
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**测试：** 运行 10-15 分钟；检查控制台中的已接受 shares 和哈希率。

### 第 5 步：开始挖矿并监控
1. 启动矿工程序：它将连接到矿池并开始提交 shares。
2. 通过以下方式监控：
   - 矿池控制面板：输入你的钱包地址即可查看哈希率、未支付余额和统计信息。
   - 软件控制台：留意错误和温度（保持 < 80 摄氏度）。
   - 工具：使用 HiveOS 或 SimpleMining OS 进行远程矿机管理。
3. 支付：大多数矿池在你达到最低门槛时会自动支付（例如 0.05 ZEC）。请查看矿池规则。

   
![Zcash 挖矿监控设置](/content-images/zcashMining-5ca0019c17.webp)


## Sovright：测试网矿池与中继网络

Sovright（sovright.com）运行一个 Stratum V2 挖矿矿池，以及一个独立的区块中继网络。它们承担不同的工作，因此下文将分别介绍。

### 挖矿矿池（mining.sovright.com）

Sovright 的矿池运行在公共 Zcash 测试网（NU6、Stratum V2）上，而不是主网。测试网不会支付真实的 ZEC。请将其用于测试你的矿工配置，而不是用于获利。

- 无需账户即可开始。将 CPU 或 ASIC Equihash 矿工指向该矿池，你的 shares 就会显示在实时控制面板上。
- Sovright 还发布了一个开源的 Stratum V2 代理，供希望自行选择区块模板、而不是仅接受矿池任务的矿工使用：
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  将你的矿工指向该代理，而不是直接连接矿池：
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  并使用类似 `yourname.rig1` 这样的 worker 名称。
- Sovright 的透明度页面声明对 shielded 交易采取“全部纳入”政策，这与某些会将其过滤掉的矿池不同。每个区块都会附带一份已签名的证明，因此可以独立验证该政策。
- 在 mining.sovright.com 创建一个账户（使用 Google 或邮箱登录），这样你就可以跟踪自己的 worker，而不是只看示例控制面板数据。

### 中继网络（relay.sovright.com）

Sovright 还在 Zcash 主网上运行一个公共区块中继网络。当矿池找到一个区块时，该区块传播到网络其余部分的速度决定了它有多大概率变成孤块，这意味着它在传播竞赛中失败，相应奖励也会丢失。该中继网络使用带前向纠错的紧凑区块中继，在四个区域之间转发区块。

公共控制面板会实时展示效果：连接到中继的区域接收新区块的时间远低于普通点对点 gossip 所需时间的一半，控制面板还会跟踪网络的实时孤块率。

这是面向矿池运营者的基础设施，而不是面向个人矿工。Sovright 的开源 `mining-infra` 仓库记录了一个 `submitblock` 中继网关，可将已发现区块更快地注入该网状网络，速度超过原生 P2P。要连接，请直接联系 Sovright（support@sovright.com）以获取中继对等节点地址和认证密钥。


## 提示与最佳实践
- **盈利能力：** 使用 whattomine.com/coins/166-zec-equihash 等计算器。示例：一张 RTX 3060（约 300 Sol/s）在 $50/ZEC 时每天可赚约 0.001 ZEC，扣除约 ~$0.50 电费。
- **隐私：** 如果可用，请使用支持 shielded 的矿池；避免重复使用地址。
- **安全：** 使用强密码；在矿池/钱包上启用 2FA。切勿分享私钥。
- **故障排查：** 如果没有 shares，请检查防火墙、杀毒软件或错误配置。加入 forum.zcashcommunity.com 或 Reddit r/zec 等论坛。
- **替代方案：** 如果不盈利，可以考虑云挖矿或质押其他币种。
- **环境说明：** 挖矿会消耗能源；如有可能，请使用可再生能源。
- **更新：** Zcash 可能会持续演进（例如潜在转向 PoS）；请查看 z.cash 获取新闻。
