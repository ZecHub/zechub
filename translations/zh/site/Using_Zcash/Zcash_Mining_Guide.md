# Zcash 挖矿指南 [Mining Guide]：使用个人硬件加入挖矿池 [Mining Pool]

## 简介

Zcash（ZEC）是一种专注于隐私 [privacy] 的加密货币，使用 Equihash 工作量证明算法进行挖矿 [mining]。挖掘 Zcash 需要使用计算能力解决复杂的数学问题、验证交易 [transaction] 并保护网络，以换取 ZEC 奖励。由于网络难度较高，不建议大多数用户单独挖矿。通过与其他人合并算力加入挖矿池，是获得稳定奖励的最佳方式。

本指南重点介绍如何使用个人硬件挖掘 Zcash（例如配备 GPU 的家用 PC 或入门级 ASIC）。请注意，虽然 GPU 仍可挖掘 Zcash，但由于网络难度，ASIC 在 2026 年的效率和盈利能力要高得多。请始终使用 WhatToMine.com 等工具检查当前盈利能力，因为电力成本、硬件价格和 ZEC 价值等因素都会影响可行性。挖矿并非对每个人都有利可图；请研究当地法规和能源费率（目标为 < $0.08/kWh）。


## 要求

### 硬件
- **GPU 挖矿（推荐初学者使用个人设备）：**
  - 至少配备 4GB VRAM 的 NVIDIA 或 AMD GPU（例如 NVIDIA GTX 1070、RTX 3060；AMD RX 580 或更高型号）。
  - 兼容的主板、足够的 PSU（多张 GPU 至少需要 750W）以及良好的散热，以防止过热。
  - 多 GPU 矿机常用于获得更高的哈希率（例如，6 张 GPU 可达到 1-2 kSol/s）。
- **ASIC 挖矿（效率更高但成本也更高）：**
  - 与 Equihash 兼容的 ASIC，例如 Bitmain Antminer Z15（420 kSol/s）或 Innosilicon A9（50 kSol/s）。
  - 这些设备噪音更大、温度更高且耗电更多（例如 1500W+）；适合专用空间。请从 Bitmain.com 或经销商（Blockware Mining）等可靠来源购买。
- **通用：**稳定的互联网连接，以及一台用于设置和监控的计算机。ASIC 在网络中占主导地位（2026 年总哈希率约为 13 GSol/s），使 GPU 挖矿竞争力较低，但爱好者仍可参与。

### 软件
- **操作系统：**Windows 10/11、Linux（为获得稳定性，推荐 Ubuntu）。
- **挖矿软件：**
  - GPU：lolMiner（支持 AMD/NVIDIA）、GMiner 或 miniZ（专注于 NVIDIA）。请从官方 GitHub 仓库下载（例如 github.com/Lolliedieb/lolMiner-releases）。
  - ASIC：使用制造商内置的固件/仪表板 [dashboard]（例如 Bitmain 的网页界面）。
- **钱包 [wallet]：**用于接收付款的 Zcash 钱包。推荐：
  - 屏蔽 [shielded]（私密）：ZODL Wallet、Zingo（移动端/桌面端）、Zkool（移动端/桌面端）。
  - 透明 [transparent]（更简单但隐私性较低）：Edge Wallet、Zecwallet Lite。
  - 请从 [wallets](https://zechub.wiki/wallets) 下载。如果矿池支持，请生成一个屏蔽地址（以“zs”开头）以保护隐私。

### 其他
- 电力：计算成本。GPU 每张耗电 150-300W；ASIC 耗电 1000W+。
- 防病毒软件：在设置期间禁用，因为它可能会将矿工程序标记为威胁。

## 加入挖矿池的分步指南

### 第 1 步：设置您的 Zcash 钱包
1. 从官方 Zcash 网站 [wallets](https://zechub.wiki/wallets) 下载并安装钱包。
2. 创建一个新钱包，并安全备份您的助记词 [seed phrase]。
3. 生成一个接收地址（最好使用屏蔽地址以保护隐私）。请记下它，例如 `zs1exampleaddress...`。
4. 如果使用透明地址（以“t”开头），操作更简单，但隐私性较低。

### 第 2 步：准备您的硬件
- 对于 GPU：
  1. 在 PC 中安装 GPU 并更新驱动程序（NVIDIA：GeForce Experience；AMD：Radeon Software）。
  2. 如有经验可进行超频（使用 MSI Afterburner 保持稳定；为提高效率，目标为核心频率 +100-200、显存 -500）。
- 对于 ASIC：
  1. 将 ASIC 连接至电源和以太网。
  2. 使用 Advanced IP Scanner 或制造商应用等工具查找其 IP 地址。
  3. 访问网页仪表板（例如在浏览器中输入 IP，Bitmain 的默认登录信息为 root/root）。

**警告：**确保通风良好；挖矿会产生热量。请从小规模开始测试。

### 第 3 步：选择并加入挖矿池
挖矿池会分配工作，并根据您贡献的哈希率共享奖励。请根据手续费（0-2%）、最低付款额（0.01-0.1 ZEC）、位置（低延迟）和可靠性进行选择。

**推荐矿池（基于哈希率、手续费和评价）：**
- **2Miners (zec.2miners.com)**：1% 手续费，PPLNS 付款，支持 GPU/ASIC/NiceHash。高哈希率（约 1.17 GSol/s），服务器可靠。
- **F2Pool (zec.f2pool.com)**：2% 手续费，PPS+ 付款，支持多种币种。大型 pool（约 2.57 GSol/s）。
- **ViaBTC (zec.viabtc.com)**：2% 手续费（PPS+），用户友好的仪表板，全球服务器。
- **AntPool (zec.antpool.com)**：1% 手续费，来自 Bitmain，适合 ASIC（约 494 MSol/s）。
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**：Foundry Digital 提供的专业 Zcash 挖矿池。采用 PPLNS 付款，提供透明的奖励追踪和企业级支持。最适合机构和大规模 ASIC 矿工；需要账户验证。
- **Sovright (mining.sovright.com)**：基于 Stratum V2 构建的 Zcash pool，目前作为公开测试网运行。尚未提供真实的 ZEC 付款，因此应将其作为测试设置的方式，而非收益来源。详情请参阅下方专门章节。
- 其他：Kryptex Pool、Luxor（请查看 poolwatch.io/coin/zcash 获取实时统计数据）。

1. 访问矿池网站并创建账户（通过电子邮件；某些矿池如 2Miners 无需注册）。
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
     - 对于欧盟服务器：eu.zec.2miners.com:1010。
  4. 运行批处理文件。它将连接至矿池并开始挖矿。
- 对于 ASIC（示例：Bitmain Antminer）：
  1. 登录网页仪表板。
  2. 前往 Miner Configuration。
  3. 添加矿池详情：
     - URL：stratum+tcp://zec.2miners.com:1010
     - 用户名：YOUR_WALLET_ADDRESS.WORKER_NAME
     - 密码：x（或留空）。
  4. 保存并重启矿工。
- 对于其他软件（例如 GMiner）：
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**测试：**运行 10-15 分钟；检查控制台中的已接受份额和哈希率。

### 第 5 步：开始挖矿并监控
1. 启动矿工：它将连接至矿池并开始提交份额。
2. 通过以下方式监控：
   - 矿池仪表板：输入您的钱包地址以查看哈希率、未付余额和统计数据。
   - 软件控制台：留意错误和温度（保持 < 80 摄氏度）。
   - 工具 [tools]：使用 HiveOS 或 SimpleMining OS 远程管理矿机。
3. 付款：大多数矿池会在您达到最低额度时自动付款（例如 0.05 ZEC）。请查看矿池规则。

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright：测试网 pool 和中继网络

Sovright（sovright.com）运行一个 Stratum V2 挖矿 pool 和一个独立的区块 [block] 中继网络。它们承担不同的工作，因此以下将分别介绍。

### 挖矿 Pool（mining.sovright.com）

Sovright 的 pool 运行在公开的 Zcash 测试网（NU6、Stratum V2）上，而非主网。测试网不会支付真实的 ZEC。请使用它测试矿工配置，而不是赚取收益。

- 无需账户即可开始。将 CPU 或 ASIC Equihash 矿工指向该 pool，您的份额便会显示在实时仪表板上。
- Sovright 还发布了一个开源 Stratum V2 代理，供希望自行选择区块模板、而非仅接受 pool 工作任务的矿工使用：

### 监控 Foundry Zcash Pool

对于 Foundry Zcash Pool 用户：

- 通过 Foundry pool 仪表板监控矿工性能。
- 检查：
  - 活跃工作者
  - 报告的哈希率
  - 已接受的份额
  - 预计奖励
  - 付款状态

由于 Foundry 使用 PPLNS 奖励模式，挖矿奖励取决于在 pool 奖励窗口期间贡献的份额，而不只是即时哈希率。

推荐的监控做法：
- 将 ASIC 仪表板哈希率与 Foundry 报告的哈希率进行比较。
- 调查被拒绝的份额、过期份额或连接不稳定问题。
- 保持稳定的网络连接，因为停机会减少提交的份额和潜在奖励。
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  将您的矿工指向代理，而不是直接指向 pool：
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  使用类似 `yourname.rig1` 的工作者名称。
- Sovright 的透明度页面说明其对屏蔽交易采取“全部包含”政策，这与某些会过滤屏蔽交易的矿池不同。每个区块都会获得签名证明，以便独立核查该政策。
- 在 mining.sovright.com 创建账户（使用 Google 或电子邮件登录），即可追踪您自己的工作者，而非查看示例仪表板数据。

### 中继网络（relay.sovright.com）

Sovright 还在 Zcash 主网上运行一个公开区块中继网络。当矿池找到一个区块时，该区块到达网络其余部分的速度决定了它被孤立的频率，也就是说，它在传播竞赛中落败，其奖励也会丢失。该中继使用带前向纠错的紧凑区块中继，跨四个区域转发区块。

公开仪表板实时展示了其效果：连接中继的区域接收新区块的速度远快于普通点对点传播所需时间的一半，仪表板还追踪网络的实时孤块率。

这是面向矿池运营商的基础设施，而非个人矿工。Sovright 的开源 `mining-infra` 仓库记录了一个 `submitblock` 中继网关，可将找到的区块扇出至网格网络，其速度快于原生 P2P。若要连接，请直接联系 Sovright（support@sovright.com）以获取中继对等方地址和认证密钥。


## 针对您自己的 Zebra 节点 [node] 挖矿

以上内容均是将您的矿工指向他人的矿池。另一种方式是自行运行节点，并让挖矿软件向它请求工作。由于 zcashd 于 2026 年 7 月 18 日停止运行，这意味着使用 [Zebra](/zcash-tech/zebra-full-node)，即本节介绍的节点。

Zebra 的作用很小且明确：它构建区块模板，并通过其 RPC 接口接受已解出的区块。哈希计算由挖矿软件完成，而在多名矿工之间分配奖励则是矿池软件的工作。单独挖矿是否能找到区块取决于您在网络哈希率中所占的份额，本节并不尝试估算这一点。这就是为什么本页简介不建议大多数用户单独挖矿。

这些步骤遵循截至 2026 年 10 月 8 日的两个 Zebra Book 页面，[使用 Zebra](https://zebra.zfnd.org/user/mining.html) 挖矿 Zcash以及 [在 Docker](https://zebra.zfnd.org/user/mining-docker.html) 中使用 Zebra 挖矿。键名和默认值会在不同版本之间变化，因此在依赖其中任何一项之前请查阅 Book。

### 设置接收奖励的地址

使用默认设置创建配置文件，然后编辑它：

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

需要一个矿工地址（[Book：矿工地址](https://zebra.zfnd.org/user/mining.html#miner-address)）：

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra 接受透明 P2PKH 或 P2SH 地址、Sapling 地址或统一地址。对于具有多个接收方的统一地址，Book 表示 Zebra 会向单一接收方付款，“优先选择 Orchard，然后是 Sapling，最后是透明”。

两个可选键位于同一 `[mining]` 部分：

| 键 | 作用 | 限制 |
|---|---|---|
| `extra_coinbase_data` | 在您挖掘的每个区块的 coinbase 输入中、Zebra 自身标记之后添加公开标签，例如矿池名称（[Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)） | 86 字节。超过此值，“Zebra 拒绝启动” |
| `miner_memo` | 将屏蔽备忘录 [memo] 附加到奖励输出。与 `extra_coinbase_data` 不同，它并不公开：只有持有接收地址 viewing key 的人才能读取它（[Book](https://zebra.zfnd.org/user/mining.html#miner-memo)） | 512 字节。仅当奖励发送至屏蔽接收方时才有效。对于透明地址，它“会悄无声息地无效” |

### 打开 RPC 端口

挖矿软件通过 JSON-RPC 与 Zebra 通信，除非您为它提供要监听的地址，否则它不会启用（[Book：RPC 部分](https://zebra.zfnd.org/user/mining.html#rpc-section)）：

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 是主网上的标准 RPC 端口。`127.0.0.1` 使该端口仅能从同一台机器访问。

自 Zebra 2.0.0 起，cookie 会保护 RPC 端口，这种方法与 zcashd 使用的方法类似。Zebra 在 RPC 端点启动时写入 cookie，并在关闭时删除它。默认情况下，该文件位于 Zebra 的缓存目录中，例如 Linux 上的 `/home/user/.cache/zebra/.cookie`，并包含一行内容：

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` 会移动该文件。`rpc.enable_cookie_auth = false` 会关闭检查，同时也关闭 RPC 端口唯一的认证机制：届时任何能够访问该端口的对象都可以调用它。

### 启动 Zebra 并等待同步

```bash
zebrad
```

Zebra 会从默认位置读取配置。传递 `-c /path/to/zebrad.toml` 以使用其他文件。请等待同步完成。完成后，日志会显示 `sync_percent=100.000%`（[Book：运行 zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)）。[Zebra 全节点 full node](/zcash-tech/zebra-full-node) 介绍了硬件和磁盘空间要求。

### 使用 getblocktemplate 进行检查

`getblocktemplate` 是挖矿软件获取工作的调用，因此也是最快的测试方法（[Book：测试设置](https://zebra.zfnd.org/user/mining.html#testing-the-setup)）。将 cookie 文件的内容替换到 `__cookie__:PASSWORD` 的位置：

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

正常运行的设置会返回一个 `result` 对象，其中包含矿工所需的字段，包括 `previousblockhash`、`coinbasetxn`、`target` 和 `height`。如果您设置了 `extra_coinbase_data`，Book 会说明如何在 `coinbasetxn.data` 中找到您的标签。

### 将您的挖矿软件指向它

向您的挖矿或矿池软件提供 RPC 端点 `127.0.0.1:8232` 以及 cookie 中的用户名和密码。Book 表示 Zebra“支持运行大多数挖矿池软件所需的 RPC 方法”（[Book：运行挖矿池](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)）。

在选择软件前，请注意 Book 中的两点：

- **s-nomp 仅用于测试。**Book 将其 s-nomp 设置称为“实验性”，并表示 s-nomp“与 NU5 不兼容，因此某些挖矿功能被禁用”。其 [测试网指南](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) 补充称，s-nomp“尚未针对 NU5 或更高版本网络升级 [network upgrade] 进行官方更新”，并建议生产环境矿工使用支持当前升级的矿池软件。
- **Zebra 提供现成的技术栈。**Zebra 仓库在 [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) 中提供了 Docker Compose 设置，可启动 Zebra 及一个挖矿池；如果您需要，还会启动一个 CPU 矿工。其中的矿池是 s-nomp，并且除非您更改它，否则会在测试网上启动，因此应将其视为学习各个组成部分的方式。

### Docker 路线

Book 最简短的路径是使用 `zfnd/zebra` Docker 镜像，并通过环境变量传递地址和 RPC 端口（[Book：在 Docker](https://zebra.zfnd.org/user/mining-docker.html) 中使用 Zebra 挖矿）。以下命令与 Book 的命令相比仅有一处变更：它仅在主机的回环地址上发布 RPC 端口，因此其他机器无法访问。

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

这将启动一个主网节点，在 Docker 主机上发布 P2P 端口（8233），并使 RPC 端口（8232）仅能从主机本身访问。使用以下命令输出 cookie：

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **将 `0.0.0.0` 保留在 `ZEBRA_RPC__LISTEN_ADDR` 中。**这是 Zebra 在容器内部监听的地址。Docker 会将已发布端口转发至容器自身的网络接口，因此在容器内监听 `127.0.0.1` 的 Zebra 即使从主机接收连接也不会收到它。`-p` 前面的 `127.0.0.1:` 才是使端口不暴露在网络上的部分。
- **Book 的命令**使用 `-p 8232:8232` 发布 RPC 端口，这会在主机的所有网络接口上开放它。
- **要在测试网上练习，**添加 `-e ZEBRA_NETWORK__NETWORK="Testnet"`，设置 `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`，发布 `-p 18233:18233` 和 `-p 127.0.0.1:18232:18232`，并提供测试网地址。主网地址会阻止 Zebra 在测试网上启动，反之亦然。

向矿工付款和处理钱包不在本节范围内。有关钱包部分，请参阅 [Zallet](/zcash-tech/zallet)。

## 提示和最佳实践
- **盈利能力：**使用 whattomine.com/coins/166-zec-equihash 等计算器。例如，一张 RTX 3060（约 300 Sol/s）在 $50/ZEC 的价格下，每天可赚取约 0.001 ZEC，减去约 $0.50 电费。
- **隐私：**如可用，请使用屏蔽池；避免重复使用地址。
- **安全：**使用强密码；在矿池/钱包上启用 2FA。切勿分享私钥。
- **故障排除：**如果没有份额，请检查防火墙、防病毒软件或错误的配置。加入 forum.zcashcommunity.com 或 Reddit r/zec 等论坛。
- **替代方案：**如果无利可图，请考虑云挖矿或质押 [staking] 其他币种。
- **环境说明：**挖矿会消耗能源；如有可能，请使用可再生能源。
- **更新：**Zcash 可能会演变（例如，可能转向 PoS）；请查看 z.cash 获取新闻。
