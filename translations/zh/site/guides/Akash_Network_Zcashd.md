# 通过 Console 将 zcashd 部署到 Akash

> **已弃用。不要按照本指南部署你打算使用的节点。**
>
> zcashd 已于 2026 年 7 月 18 日达到其自动停止支持（End-of-Support）状态。今天部署的 zcashd 节点将无法同步到链的最新区块，因此这类部署每个月都会花钱，但不会产出任何结果。
>
> 请改为部署 **Zebra**：[如何在 Akash Network 上运行 Zebra](/guides/akash-network-zebra)，其中涵盖了相同的 Akash Console 工作流程，并且所需磁盘空间大约只有三分之一。如果你正在迁移现有配置，请参阅 [从 zcashd 迁移到 Zebra 和 Zallet 指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
>
> 本页面作为 zcashd 部署的历史记录予以保留。

本指南介绍如何使用 [Akash Console](https://console.akash.network) 部署一个 zcashd Zcash 全节点（Electric Coin Co 实现）。下面有视频教程。更深入的指南也可见下文。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 你将部署的内容

一个完整的 zcashd 节点，将会：

-> 同步整个 Zcash blockchain（主网 350GB+，测试网约 40GB）

-> 每月成本大约为 15 美元，具体取决于 AKT 代币价格

-> 完整同步需要数小时到数天

-> 使用 4 个 vCPU、16GB RAM、350GB 存储（主网），或 2 个 vCPU、8GB RAM、50GB（测试网）

-> 首次运行时下载加密参数（约 2GB，一次性）

**zcashd 与 Zebra：**

-> zcashd 是 Electric Coin Co 最初推出的 Zcash 节点实现，已于 2026 年 7 月 18 日停止

-> Zebra 由 Zcash Foundation 开发，是当今正在使用的全节点

-> 只有 Zebra 会跟随当前链；zcashd 节点无法追上最新区块

-> zcashd 的钱包已被 [Zallet](/using-zcash/zallet-quick-reference-guide) 取代

-> 如果你需要钱包功能或特定 RPC API，可以使用 zcashd


### **重要：Akash 上的端口映射**

当你在 Akash 上暴露一个端口时（例如 zcashd 的 P2P 端口 8233），它**不会绑定到提供商公网 IP 上的同一个端口**。相反，提供商会分配一个随机高位端口（例如 31234 或 42567），并将其反向代理到你容器中的 8233 端口。

这是设计使然，因为提供商会运行多个部署，如果每个人都直接使用 8233 端口，就会发生冲突。

**这对你意味着：**

-> 你在 SDL 中配置端口 8233（zcashd 的标准 P2P 端口）

-> Akash 会给你一个类似 *provider.com:31234* 的 URI

-> 其他 Zcash 节点会通过 *provider.com:31234* 连接到你

-> 在你的容器内部，zcashd 仍然监听 8233


这些都会被自动处理。你只需使用 Akash 提供给你的 URI。

## 前置条件

-> 已安装 **Keplr Wallet** 浏览器扩展（Chrome/Brave/Firefox）

-> **AKT 代币** - 从交易所获取 50-100 AKT（Coinbase、Kraken、Osmosis）

-> **5 分钟** 用来点完 Console UI 中的流程


## 第 1 步：连接你的钱包

-> 前往 [https://console.akash.network](https://console.akash.network)

-> 点击右上角的 **"Connect Wallet"**

-> 选择 **Keplr**（或你偏好的 Cosmos 钱包）

-> 当 Keplr 弹出时批准连接


你的 AKT 余额应该会显示在右上角。如果为零，请先给钱包充值。

## 第 2 步：创建部署

-> 点击 **"Deploy"** 按钮（页面中央的大蓝色按钮）

-> 选择 **"Build your template"**（或直接跳到上传 SDL）

### 选项 A：上传 SDL 文件（推荐）

> **此按钮会部署一个已停止的节点。** 它会从你的 AKT 余额中扣费，用于一个无法同步的节点。请改用 [Zebra 指南](/guides/akash-network-zebra)。

[![在 Akash 上部署](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### 选项 B：使用 SDL 编辑器

如果你想手动粘贴 SDL：

-> 复制 *zcashd-akash.yml* 的内容

-> 粘贴到 SDL 编辑器中

-> 按需修改（见下方配置部分）

-> 点击 **"Create Deployment"**


## 第 3 步：查看并批准押金

Console 会向你显示：

-> **部署押金**：约 5 AKT（关闭部署时会退还）

-> **预估成本**：基于你的 SDL 定价


点击 **"Approve"**，然后在 Keplr 中签署交易。

## 第 4 步：选择提供商

大约 30 秒后，你会看到来自提供商的出价。每个出价会显示：

-> **每个区块的价格**（以 AKT 或 USDC 计）

-> **每月预估成本**

-> **提供商详情**（在线率、地区等）


**不要只选最便宜的。** 请检查：

-> 在线率 %（目标 > 95%）

-> 地区（离你越近延迟越低，但对 blockchain 节点影响不算大）

-> 审计状态（绿色勾号 = 更值得信赖）


在你选中的提供商上点击 **"Accept Bid"**，并在 Keplr 中签名。

## 第 5 步：等待部署

Console 将会：

-> 与你选择的提供商创建租约

-> 发送 manifest（告诉提供商要运行什么）

-> 启动你的容器


这需要 1-2 分钟。你会在 UI 中看到状态更新。

## 第 6 步：验证其正在运行

部署完成后，你会看到：

-> **Services** 标签页：显示你的 *zcashd* 服务及其状态

-> **Logs** 标签页：来自你的 zcashd 节点的实时日志

-> **Leases** 标签页：你的部署详情（DSEQ、提供商、成本）


### 检查日志

点击 **Logs**，你应该会看到 zcashd 正在启动：

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**首次运行会下载 zcash-params（约 2GB）。** 这是一次性操作，取决于提供商带宽，通常需要 5-10 分钟。之后重启会跳过这一步。

同步将需要**数小时到数天**，具体取决于网络情况。请关注：

-> 区块高度持续增加

-> 对等连接（应该有 10-30 个 peer）

-> 没有重复错误


## 第 7 步：获取你的节点地址

点击 **Leases** 标签页，然后点击 **URIs**。

你会看到类似：

```
zcashd-8233: provider-hostname.com:31234
```

这是你节点的**公开 P2P 端点**。其他 Zcash 节点会通过这个地址连接到你。

**注意端口映射：** 你在 SDL 中配置的是 8233 端口，但 Akash 把它分配到了另一个公网端口（本例中是 31234）。这是正常现象。如果你对此感到困惑，请参见顶部的“Akash 上的端口映射”部分。你的节点可通过 Akash 在此处显示的端口访问，不一定是 8233。

如果你启用了 RPC（SDL 中默认是注释掉的），你还会在这里看到 RPC 端点及其对应的映射端口。

## 配置选项

### 切换到测试网

SDL 默认使用主网。若要改用测试网：

-> **在 *env* 部分更改网络：**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> 在 *expose* 部分**更新暴露的端口**：

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **可选：** 在 *profiles.compute.zcashd.resources* 中为测试网减少资源：

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **可选：** 在 *profiles.placement.akash.pricing* 中降低定价：

   ```yaml
   amount: 5000  # Down from 10000
   ```

> 注意，降低价格可能会让我们的提供商不参与竞价。请尝试这个值，或使用 provider endpoint 检查他们是否会出价。（查看 provider api 文档）

### 启用 RPC 访问

出于安全考虑，RPC 默认关闭。若要启用：

**关键：设置强凭据。** zcashd RPC 通过 HTTP（而不是 HTTPS）传输用户名/密码。只有在你了解其安全影响的情况下才应暴露 RPC。

-> 取消 *env* 部分中的注释：

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> 在 *expose* 中取消 RPC 端口的注释：

   **主网：**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **测试网：**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**：如果你为 RPC 设置 *global: true*，那就是通过基础认证将其暴露到互联网。这是个坏主意。请使用 *global: false*，通过 Akash 的内部网络访问 RPC，或建立安全隧道。

**端口映射提醒**：即使你将 RPC 全局暴露，Akash 也会把它映射到一个随机高位端口（而不是 8232/18232）。请检查部署中的 URIs 以查看实际公网端点。对于 *global: false*（推荐），RPC 端点仅能在 Akash 部署网络内部访问，无法从公共互联网访问。

### 启用交易索引

交易索引允许你通过 RPC 使用交易 ID 查询任意交易。会占用更多存储（约增加 20%）。

在 *env* 中取消注释：

```yaml
- "ZCASHD_TXINDEX=1"
```

**警告**：在一个已同步的现有节点上启用 txindex，需要重新索引整条 blockchain，这会耗费数小时。

### 启用 Insight Explorer

Insight Explorer 提供额外的 REST API 端点用于访问 blockchain 数据（对区块浏览器很有用）。

在 *env* 中取消注释：

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

这会自动启用 txindex，并添加额外的 RPC 方法。

### 启用 Prometheus 指标

若要抓取用于监控的指标：

-> 在 *env* 中取消注释：

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> 在 *expose* 中取消指标端口的注释：

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
指标将以 Prometheus 格式在 http://yourendpoint:9969/metrics 提供。

### 调整资源/定价

如果你收不到出价，或者想优化成本：

**对于较低规格的提供商**，可在 *profiles.compute.zcashd.resources* 部分降低：

-> CPU：*units: 2*（保证合理同步速度的最低值）

-> 内存：*size: 12Gi*（稳定运行的最低值）

-> 存储：*size: 120Gi*（主网最低值）


**若想吸引更多出价**，可在 *profiles.placement.akash.pricing* 中提高：

-> 主网：尝试 *amount: 15000* uakt/block

-> 测试网：尝试 *amount: 7500* uakt/block


SDL 中的这些值设置得相对保守偏高。大多数提供商的实际出价会更低。

## 更新你的部署

部署后需要更改配置？

-> 在 Console 中前往 **My Deployments**

-> 找到你的 zcashd 部署

-> 点击 **"Update Deployment"**

-> 编辑 SDL

-> 点击 **"Update"** 并在 Keplr 中批准


**注意**：更新会重启你的容器。节点会从已保存状态（持久化存储）继续运行，但预计会有 1-2 分钟停机时间。

## 监控

### 通过 Console

-> **Logs 标签页**：实时容器日志

-> **Shell 标签页**：进入容器内部 shell（便于调试）

-> **Events 标签页**：Kubernetes 事件（除非有故障，否则大多没什么用）


### 通过 RPC（如果已启用）

如果你启用了 RPC，你可以像使用普通 zcashd 全节点一样查询你的节点（因为它本来就是！）

### zcash-cli 替代方式

如果你能通过 Console 访问 shell，可以直接使用 *zcash-cli*：

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## 关闭你的部署

当你用完了，或者想停止付费：

-> 前往 **My Deployments**

-> 找到你的 zcashd 部署

-> 点击 **"Close Deployment"**

-> 在 Keplr 中确认并签名


你的 5 AKT 押金会被退还。**持久化存储**理论上应由提供商保留，但不要依赖这一点，应像对待任何其他云服务提供商一样看待它。

## 故障排查

### “Insufficient funds” 错误

你需要更多 AKT。给你的 Keplr 钱包充值。

### 没有显示出价

可能是以下原因之一：

-> 你的定价太低（提高 SDL 中的 *amount*）

-> 你的资源需求对当前可用提供商来说太高（降低 CPU/内存/存储）

-> 再多等一会儿（有时出价需要 60-90 秒才会出现）


### 部署卡在 “pending”

提供商可能出现了问题。关闭该部署并尝试其他提供商。

### zcashd 日志显示 “No peers connected”

由于 2026 年 7 月 18 日的停止支持，这已经是预期中的永久状态，而不是启动延迟，等待或重新部署都无法修复。请改为部署 [Zebra](/guides/akash-network-zebra)。

### 日志中出现 “Out of memory” 错误

你在 RAM 上省过头了。关闭部署并至少使用 12Gi 内存重新部署（推荐 16Gi）。

### 同步耗时太久

先定义一下“太久”：

-> **几小时**：正常

-> **几天**：对于从零开始同步主网也正常

-> **几周**：那就有问题了，请检查日志中是否有错误


### “Error fetching zcash-params”

提供商可能存在网络问题或带宽较慢。通常会自行恢复。如果持续超过 30 分钟，请尝试重新部署到其他提供商。

### RPC 认证失败

-> 检查 *ZCASHD_RPCUSER* 和 *ZCASHD_RPCPASSWORD* 是否设置正确

-> 确认你使用的是正确端口（主网 8232，测试网 18232）

-> 记住端口会被 Akash 映射 - 请使用部署中显示的 URI，而不是直接用 8232


## 成本管理

在 Console 中监控你的支出：

-> **My Deployments** -> 你的部署 -> 会显示“Cost per month”预估

-> 你的 Keplr 钱包余额会随着时间推移而减少


当你的余额过低时，Akash 会自动关闭你的部署。**请定期给钱包充值**，或设置提醒。

### 降低成本

-> **使用测试网** 进行非生产测试（便宜 50%）

-> 如果你不需要快速同步，**降低 CPU/内存**

-> **选择更便宜的提供商**（不一定明智 - 在线率也很重要）

-> 如果 AKT 价格波动较大，**使用 USDC 而不是 AKT**（需要修改 SDL 定价）

-> 如果你不需要，**禁用 txindex**（可节省约 20% 存储）


### 附加资源

**Akash Console**：[https://console.akash.network](https://console.akash.network)

**Akash 文档**：[https://akash.network/docs/](https://akash.network/docs/)

**Zcash 浏览器**：[https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**：[https://discord.akash.network](https://discord.akash.network)（用于提供商相关问题）

## 最后说明

- **持久化存储很重要。** 不要跳过 *persistent: true*，也不要使用 *beta2* 类别。请使用 *beta3*。
- **初始同步很慢。** 请耐心等待。对 blockchain 节点来说这是正常现象。
- **保持钱包有余额。** 当你的 AKT 用完时，部署会自动关闭。
- **备份不是自动的。** 如果你在意这些数据，就应假设它可能会消失，并据此做好规划。
- **RPC 安全性至关重要。** 在没有适当安全措施的情况下，不要将 RPC 暴露到互联网。
- **zcash-params 会被缓存。** 首次运行会下载约 2GB 的加密参数。这是正常现象，而且只会发生一次。
