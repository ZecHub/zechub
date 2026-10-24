# Zcash 挖矿指南：使用个人硬件加入矿池

## 简介

Zcash（ZEC）是一种注重隐私的加密货币，使用 Equihash 工作量证明算法进行挖矿。挖掘 Zcash 涉及使用计算能力解决复杂数学问题、验证交易并保护网络安全，以换取 ZEC 奖励。由于网络难度较高，不建议大多数用户进行单独挖矿。通过与他人合并算力，加入矿池是获得稳定奖励的最佳方式。

本指南重点介绍如何使用个人硬件（例如配备 GPU 的家用 PC 或入门级 ASIC）挖掘 Zcash。请注意，虽然 GPU 仍可挖掘 Zcash，但由于网络难度，ASIC 在 2026 年的效率和盈利能力要高得多。请始终使用 WhatToMine.com 等工具检查当前盈利能力，因为电费、硬件价格和 ZEC 价值等因素都会影响可行性。挖矿未必对所有人都有利润；请研究当地法规和能源费率（目标为低于 $0.08/kWh）。


## 要求

### 硬件
- **GPU 挖矿（推荐初学者采用个人设备）：**
  - 配备至少 4GB VRAM 的 NVIDIA 或 AMD GPU（例如 NVIDIA GTX 1070、RTX 3060；AMD RX 580 或更高型号）。
  - 兼容的主板、充足的 PSU（多张 GPU 至少需要 750W）以及良好的散热，以防止过热。
  - 多 GPU 矿机很常见，可获得更高的哈希率（例如，6 张 GPU 可达到 1-2 kSol/s）。
- **ASIC 挖矿（效率更高但成本也更高）：**
  - 与 Equihash 兼容的 ASIC，例如 Bitmain Antminer Z15（420 kSol/s）或 Innosilicon A9（50 kSol/s）。
  - 它们噪音更大、温度更高且耗电更多（例如 1500W 以上）；适合专用空间。从 Bitmain.com 或经销商（Blockware Mining）等可靠来源购买。
- **通用：**稳定的互联网连接，以及一台用于设置和监控的计算机。ASIC 主导着网络（2026 年总哈希率约为 13 GSol/s），使 GPU 挖矿的竞争力较低，但业余爱好者仍可参与。

### 软件
- **操作系统：**Windows 10/11、Linux（推荐 Ubuntu 以获得稳定性）。
- **挖矿软件：**
  - 用于 GPU：lolMiner（支持 AMD/NVIDIA）、GMiner 或 miniZ（侧重 NVIDIA）。从官方 GitHub 仓库下载（例如 github.com/Lolliedieb/lolMiner-releases）。
  - 用于 ASIC：使用制造商内置的固件/仪表板（例如 Bitmain 的网页界面）。
- **钱包：**用于接收付款的 Zcash 钱包。推荐：
  - 屏蔽型（私密）：ZODL Wallet、Zingo（移动端/桌面端）、Zkool（移动端/桌面端）。
  - 透明型（更容易使用但私密性较低）：Edge Wallet、Zecwallet Lite。
  - 从 [wallets](https://zechub.wiki/wallets) 下载。如果矿池支持，请生成一个屏蔽地址（以“zs”开头）以保护隐私。

### 其他
- 电力：计算成本。GPU 每张卡耗电 150-300W；ASIC 耗电 1000W 以上。
- 杀毒软件：设置期间请禁用，因为它可能会将矿工软件标记为威胁。

## 加入矿池的分步指南

### 第 1 步：设置您的 Zcash 钱包
1. 从官方 Zcash 网站 [wallets](https://zechub.wiki/wallets) 下载并安装钱包。
2. 创建新钱包，并安全备份您的助记词。
3. 生成一个收款地址（为保护隐私，最好使用屏蔽地址）。记下该地址，例如 `zs1exampleaddress...`。
4. 如果使用透明地址（以“t”开头），操作会更简单，但隐私性较低。

### 第 2 步：准备您的硬件
- 对于 GPU：
  1. 将 GPU 安装到 PC 中并更新驱动程序（NVIDIA：GeForce Experience；AMD：Radeon Software）。
  2. 如有经验可进行超频（使用 MSI Afterburner 以保持稳定；为提高效率，目标为核心频率 +100-200、显存 -500）。
- 对于 ASIC：
  1. 将 ASIC 连接至电源和以太网。
  2. 使用 Advanced IP Scanner 等工具或制造商的应用程序查找其 IP 地址。
  3. 访问网页仪表板（例如在浏览器中输入 IP，Bitmain 默认登录名：root/root）。

**警告：**确保通风良好；挖矿会产生热量。先从小规模开始测试。

### 第 3 步：选择并加入矿池
矿池会分配工作，并根据您贡献的哈希率分享奖励。根据费用（0-2%）、最低付款额（0.01-0.1 ZEC）、位置（低延迟）和可靠性进行选择。

**推荐矿池（基于哈希率、费用和评价）：**
- **2Miners (zec.2miners.com)**：1% 费用，PPLNS 付款，支持 GPU/ASIC/NiceHash。哈希率高（约 1.17 GSol/s），服务器可靠。
- **F2Pool (zec.f2pool.com)**：2% 费用，PPS+ 付款，支持多种代币。大型矿池（约 2.57 GSol/s）。
- **ViaBTC (zec.viabtc.com)**：2% 费用（PPS+），用户友好的仪表板，全球服务器。
- **AntPool (zec.antpool.com)**：1% 费用，来自 Bitmain，适合 ASIC（约 494 MSol/s）。
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**：由 Foundry Digital 提供的专业 Zcash 矿池。采用 PPLNS 付款，提供透明的奖励追踪和企业级支持。最适合机构及大规模 ASIC 矿工；需要账户验证。
- **Sovright (mining.sovright.com)**：一个基于 Stratum V2 构建的 Zcash 矿池，目前作为公共测试网运行。尚无真实的 ZEC 付款，因此应将其视为测试设备的方法，而非收入来源。详见下方专门章节。
- 其他：Kryptex Pool、Luxor（请查看 poolwatch.io/coin/zcash 获取实时统计数据）。

1. 访问矿池网站并创建账户（部分矿池如 2Miners 无需注册）。
2. 在设置中添加您的 Zcash 钱包地址以接收付款。
3. 记下矿池的 stratum 服务器（例如 zec.2miners.com:1010）和端口。

### 第 4 步：安装并配置挖矿软件
- 对于 GPU（示例：在 Windows/Linux 上使用 lolMiner）：
  1. 从 GitHub 下载 lolMiner（最新版本，例如 1.88）。
  2. 解压到一个文件夹。
  3. 创建包含以下配置的批处理文件（start.bat）：
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - 将 `YOUR_WALLET_ADDRESS` 替换为您的 ZEC 地址。
     - `WORKER_NAME`：您的矿机名称（例如 Rig1）。
     - 对于 EU 服务器：eu.zec.2miners.com:1010。
  4. 运行批处理文件。它将连接到矿池并开始挖矿。
- 对于 ASIC（示例：Bitmain Antminer）：
  1. 登录网页仪表板。
  2. 转到 Miner Configuration。
  3. 添加矿池详细信息：
     - URL：stratum+tcp://zec.2miners.com:1010
     - 用户名：YOUR_WALLET_ADDRESS.WORKER_NAME
     - 密码：x（或留空）。
  4. 保存并重启矿机。
- 对于其他软件（例如 GMiner）：
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**测试：**运行 10-15 分钟；检查控制台中是否有已接受的份额和哈希率。

### 第 5 步：开始挖矿并进行监控
1. 启动矿工软件：它将连接到矿池并开始提交份额。
2. 通过以下方式监控：
   - 矿池仪表板：输入您的钱包地址，以查看哈希率、未付余额和统计数据。
   - 软件控制台：留意错误和温度（保持低于 80 摄氏度）。
   - 工具：使用 HiveOS 或 SimpleMining OS 进行远程矿机管理。
3. 付款：大多数矿池会在您达到最低金额时自动付款（例如 0.05 ZEC）。请查看矿池规则。

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright：测试网矿池和中继网络

Sovright（sovright.com）运营一个 Stratum V2 挖矿池和一个独立的区块中继网络。两者的职责不同，因此将在下文中分别介绍。

### 挖矿池（mining.sovright.com）

Sovright 的矿池运行在公共 Zcash 测试网（NU6、Stratum V2）上，而非主网。测试网不会支付真实的 ZEC。请用它测试矿工软件配置，而非用于获利。

- 无需账户即可开始。将 CPU 或 ASIC Equihash 矿工软件指向该矿池，您的份额便会显示在实时仪表板上。
- Sovright 还发布了一个开源 Stratum V2 代理，供希望自行选择区块模板、而不只是接受矿池任务的矿工使用：

### 监控 Foundry Zcash Pool

对于 Foundry Zcash Pool 用户：

- 通过 Foundry 矿池仪表板监控矿工性能。
- 检查：
  - 活跃工作器
  - 报告的哈希率
  - 已接受的份额
  - 预计奖励
  - 付款状态

由于 Foundry 使用 PPLNS 奖励模型，挖矿奖励取决于矿池奖励窗口期间贡献的份额，而不只是即时哈希率。

推荐的监控做法：
- 将 ASIC 仪表板哈希率与 Foundry 报告的哈希率进行比较。
- 调查被拒绝的份额、过期份额或连接不稳定问题。
- 保持稳定的网络连接，因为停机会减少已提交的份额和潜在奖励。
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  将您的矿工软件指向该代理，而不是直接指向矿池：
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  使用类似 `yourname.rig1` 的工作器名称。
- Sovright 的透明度页面说明其对屏蔽交易采取“全部包含”政策，不同于某些会将其过滤掉的矿池。每个区块都获得一份签名证明，因此可独立验证该政策。
- 在 mining.sovright.com 创建账户（Google 或电子邮件登录），以追踪您自己的工作器，而非示例仪表板数据。

### 中继网络（relay.sovright.com）

Sovright 还在 Zcash 主网上运营一个公共区块中继网络。当矿池找到一个区块时，该区块到达网络其余部分的速度决定了它被孤块化的频率，也就是它在传播竞赛中落败并失去相应奖励。该中继使用带前向纠错的紧凑区块中继，在四个地区之间转发区块。

公共仪表板实时展示其效果：接入中继的地区接收新区块所需时间远低于普通点对点 gossip 所需时间的一半，仪表板还会追踪网络的实时孤块率。

这是面向矿池运营者的基础设施，而非个人矿工。Sovright 的开源 `mining-infra` 仓库记录了一个 `submitblock` 中继网关，可将已发现的区块更快地扇出至网状网络，速度快于原生 P2P。若要连接，请直接联系 Sovright（support@sovright.com）以获取中继对等节点地址和认证密钥。


## 针对您自己的 Zebra 节点挖矿

以上所有方式都是将您的矿工软件指向他人的矿池。另一种途径是自行运行一个节点，并让您的挖矿软件向其请求工作。由于 zcashd 已于 2026 年 7 月 18 日停止运行，这意味着使用 [Zebra](/zcash-tech/zebra-full-node)，即本节所介绍的节点。

Zebra 的职责很小且明确：它构建区块模板，并通过其 RPC 接口接受已解出的区块。哈希计算由挖矿软件完成，而在多个矿工之间分配奖励则是矿池软件的职责。单独挖矿是否能找到区块取决于您在网络哈希率中所占的份额，本节并不尝试估计这一点。这也是本页简介不建议大多数用户单独挖矿的原因。

这些步骤遵循两页 Zebra Book 页面，即 [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) 和 [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)，其内容截至 2026 年 10 月 8 日。键名和默认值会在不同版本之间变化，因此在依赖它们之前请先查看 Book。

### 设置接收奖励的地址

使用默认设置创建一个配置文件，然后进行编辑：

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

必须提供矿工地址（[Book：矿工地址](https://zebra.zfnd.org/user/mining.html#miner-address)）：

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra 接受透明 P2PKH 或 P2SH 地址、Sapling 地址或 Unified Address。对于拥有多个接收器的 Unified Address，Book 表示 Zebra 会向单个接收器付款，“优先选择 Orchard，其次是 Sapling，然后是透明”。

两个可选键位于同一 `[mining]` 部分：

| 键 | 功能 | 限制 |
|---|---|---|
| `extra_coinbase_data` | 在您挖出的每个区块 coinbase 输入中、Zebra 自身标记之后添加公开标签，例如矿池名称（[Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)） | 86 字节。超过该限制，“Zebra 会拒绝启动” |
| `miner_memo` | 向奖励输出附加屏蔽 memo。与 `extra_coinbase_data` 不同，它不是公开的：只有持有收款地址 viewing key 的人才能读取它（[Book](https://zebra.zfnd.org/user/mining.html#miner-memo)） | 512 字节。它仅在奖励发送到屏蔽接收器时有效。使用透明地址时，“不会报错但没有效果” |

### 打开 RPC 端口

挖矿软件通过 JSON-RPC 与 Zebra 通信；在您指定要监听的地址之前，它不会启动（[Book：RPC 部分](https://zebra.zfnd.org/user/mining.html#rpc-section)）：

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 是 Mainnet 上的标准 RPC 端口。`127.0.0.1` 使该端口仅能从同一台机器访问。

自 Zebra 2.0.0 起，一个 cookie 保护 RPC 端口，其方法与 zcashd 所使用的方法类似。Zebra 在 RPC 端点启动时写入 cookie，并在关闭时将其删除。默认情况下，该文件位于 Zebra 的缓存目录，例如 Linux 上的 `/home/user/.cache/zebra/.cookie`，并包含一行：

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` 会移动该文件。`rpc.enable_cookie_auth = false` 会关闭这项检查，同时也关闭 RPC 端口仅有的认证机制：此后，任何能访问该端口的对象都可以调用它。

### 启动 Zebra 并等待其同步

```bash
zebrad
```

Zebra 从默认位置读取配置。传递 `-c /path/to/zebrad.toml` 以使用其他文件。请等待同步完成。完成后，日志会显示 `sync_percent=100.000%`（[Book：运行 zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)）。[Zebra Full Node](/zcash-tech/zebra-full-node) 涵盖硬件和磁盘空间。

### 使用 getblocktemplate 检查

`getblocktemplate` 是挖矿软件获取工作的调用，因此也是最快的测试方法（[Book：测试设置](https://zebra.zfnd.org/user/mining.html#testing-the-setup)）。请用 cookie 文件的内容替换 `__cookie__:PASSWORD`：

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

正常运行的设置会返回一个 `result` 对象，其中包含矿工所需的字段，包括 `previousblockhash`、`coinbasetxn`、`target` 和 `height`。如果您设置了 `extra_coinbase_data`，Book 会说明如何在 `coinbasetxn.data` 中找到您的标签。

### 将挖矿软件指向它

向您的挖矿或矿池软件提供 RPC 端点 `127.0.0.1:8232`，以及 cookie 中的用户名和密码。Book 表示 Zebra“支持运行大多数挖矿池软件所需的 RPC 方法”（[Book：运行矿池](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)）。

在选择软件之前，请注意 Book 中的两点：

- **s-nomp 仅用于测试。**Book 称其 s-nomp 设置为“实验性”，并表示 s-nomp“与 NU5 不兼容，因此部分挖矿功能被禁用”。其 [Testnet 指南](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html)补充说明，s-nomp“尚未针对 NU5 或后续网络升级进行官方更新”，并建议生产矿工使用支持当前升级的矿池软件。
- **Zebra 提供现成的技术栈。**Zebra 仓库在 [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) 中提供了一个 Docker Compose 设置，可启动 Zebra 以及一个挖矿池；如果您需要，还可启动一个 CPU 矿工。其使用的矿池是 s-nomp，除非您更改设置，否则会在 Testnet 上启动，因此应将其视为了解各个组成部分的方式。

### Docker 路线

Book 最短的路径是使用 `zfnd/zebra` Docker 镜像，并将地址和 RPC 端口作为环境变量传入（[Book：在 Docker](https://zebra.zfnd.org/user/mining-docker.html) 中使用 Zebra 挖矿）。以下命令与 Book 中的命令相比只有一处改动：它仅在主机的回环地址上发布 RPC 端口，因此其他机器无法访问。

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

这会启动一个 Mainnet 节点，在 Docker 主机上发布 P2P 端口（8233），并使 RPC 端口（8232）仅能从主机本身访问。使用以下命令打印 cookie：

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **将 `0.0.0.0` 保留在 `ZEBRA_RPC__LISTEN_ADDR` 中。**这是 Zebra 在容器内监听的地址。Docker 会将已发布端口转发至容器自身的网络接口，因此在容器内侦听 `127.0.0.1` 的 Zebra 无法接收连接，即使连接来自主机也是如此。`-p` 前面的 `127.0.0.1:` 才是使端口不暴露于网络的部分。
- **Book 中的命令**使用 `-p 8232:8232` 发布 RPC 端口，这会在主机的所有网络接口上开放它。
- **要在 Testnet 上练习，**添加 `-e ZEBRA_NETWORK__NETWORK="Testnet"`，设置 `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`，发布 `-p 18233:18233` 和 `-p 127.0.0.1:18232:18232`，并提供一个 Testnet 地址。Mainnet 地址会阻止 Zebra 在 Testnet 上启动，反之亦然。

向矿工付款和处理钱包不在本节范围内。有关钱包部分，请参阅 [Zallet](/zcash-tech/zallet)。

## 提示和最佳实践
- **盈利能力：**使用 whattomine.com/coins/166-zec-equihash 等计算器。示例：一张 RTX 3060（约 300 Sol/s）在 $50/ZEC 时每天可赚取约 0.001 ZEC，减去约 $0.50 电费。
- **隐私：**如有可用，请使用屏蔽型矿池；避免重复使用地址。
- **安全：**使用强密码；在矿池/钱包上启用 2FA。绝不要分享私钥。
- **故障排除：**如果没有份额，请检查防火墙、杀毒软件或错误配置。加入 forum.zcashcommunity.com 或 Reddit r/zec 等论坛。
- **替代方案：**如果无利可图，可考虑云挖矿或质押其他代币。
- **环境说明：**挖矿消耗能源；如有可能，请使用可再生能源。
- **更新：**Zcash 可能会演变（例如可能转向 PoS）；请访问 z.cash 查看新闻。
