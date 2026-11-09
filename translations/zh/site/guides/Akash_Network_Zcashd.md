# 通过 Console 将 zcashd 部署到 Akash

> **已弃用。请勿按照本指南部署您打算使用的节点。**
>
> zcashd 于 2026 年 7 月 18 日达到自动停止支持状态。如今部署的 zcashd 节点将无法同步至链尖端，因此该部署每月都会花费资金，却不会产生任何作用。
>
> 请改为部署 **Zebra**：[如何在 Akash Network 上运行 Zebra](/guides/akash-network-zebra)，其涵盖相同的 Akash Console 工作流程，所需磁盘空间约为三分之一。如果您要迁移现有设置，请参阅 [zcashd 到 Zebra 和 Zallet 的迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
>
> 本页面作为 zcashd 部署的历史记录予以保留。

使用 [Akash Console](https://console.akash.network) 部署 zcashd Zcash 全节点[full node]（Electric Coin Co 实现）的指南。下方提供视频教程。更深入的指南也可在下方找到。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash 全节点设置指南：Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 您将部署的内容

一个完整的 zcashd 节点，它将：

-> 同步整个 Zcash blockchain（主网超过 350GB，测试网约 40GB）

-> 费用约为每月 $15，具体取决于 AKT 代币[token]价格

-> 完全同步需要数小时至数天

-> 使用 4 个 vCPU、16GB RAM、350GB 存储空间（主网），或 2 个 vCPU、8GB RAM、50GB 存储空间（测试网）

-> 首次运行时下载加密[encryption]参数（约 2GB，一次性）

**zcashd 与 Zebra：**

-> zcashd 是由 Electric Coin Co 开发的原始 Zcash 节点实现，自 2026 年 7 月 18 日起已停止

-> 来自 Zcash Foundation 的 Zebra 是当前正在使用的全节点

-> 仅 Zebra 会跟随当前链[chain]；zcashd 节点无法到达链尖端

-> zcashd 的钱包[wallet]已由 [Zallet](/using-zcash/zallet-quick-reference-guide) 取代

-> 如果您需要钱包功能或特定 RPC API，请使用 zcashd


### **重要提示：Akash 上的端口映射**

当您在 Akash 上公开一个端口时（例如用于 zcashd P2P 的端口 8233），它**不会绑定到**提供商公共 IP 上的该确切端口。相反，提供商会分配一个随机高位端口（如 31234 或 42567），并将其反向代理到您容器的 8233 端口。

这是设计使然——提供商运行多个部署，如果每个人都试图直接使用端口 8233，就会发生冲突。

**这对您意味着：**

-> 您在 SDL 中配置端口 8233（zcashd 的标准 P2P 端口）

-> Akash 会给您一个类似 *provider.com:31234* 的 URI

-> 其他 Zcash 节点会通过 *provider.com:31234* 连接您

-> 在容器内部，zcashd 仍监听端口 8233


这会自动处理。只需使用 Akash 提供给您的 URI。

## 前提条件

-> 已安装 **Keplr Wallet** 浏览器扩展（Chrome/Brave/Firefox）

-> **AKT 代币** - 从交易所[exchange]（Coinbase、Kraken、Osmosis）获取 50-100 AKT

-> **5 分钟**时间来完成 Console UI 操作


## 步骤 1：连接您的钱包

-> 前往 [https://console.akash.network](https://console.akash.network)

-> 点击右上角的 **"Connect Wallet"**

-> 选择 **Keplr**（或您偏好的 Cosmos 钱包）

-> 当 Keplr 弹出时批准连接


您的 AKT 余额应显示在右上角。如果余额为零，请先为您的钱包充值[top up]。

## 步骤 2：创建部署

-> 点击 **"Deploy"** 按钮（页面中央的大型蓝色按钮）

-> 选择 **"Build your template"**（或直接跳至上传 SDL）

### 选项 A：上传 SDL 文件（推荐）

> **此按钮会部署一个已停止的节点。** 它会从您的 AKT 余额中扣费，用于无法同步的节点。请改用 [Zebra 指南](/guides/akash-network-zebra)。

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### 选项 B：使用 SDL 编辑器

如果您想手动粘贴 SDL：

-> 复制 *zcashd-akash.yml* 的内容

-> 粘贴到 SDL 编辑器中

-> 根据需要进行修改（请参阅下方配置部分）

-> 点击 **"Create Deployment"**


## 步骤 3：审核并批准押金

Console 将向您显示：

-> **部署押金**：约 5 AKT（关闭部署时会退还给您）

-> **预估费用**：基于您的 SDL 定价


点击 **"Approve"**，然后在 Keplr 中签署交易[transaction]。

## 步骤 4：选择提供商

约 30 秒后，您将看到提供商的出价。每个出价会显示：

-> **每个区块[block]的价格**（以 AKT 或 USDC 计价）

-> **每月预估费用**

-> **提供商详情**（正常运行时间、区域等）


**不要只选最便宜的。** 请检查：

-> 正常运行时间百分比（目标应大于 95%）

-> 区域（距离您更近意味着更低的延迟，但对于 blockchain 节点影响不大）

-> 审核状态（绿色对勾表示更值得信赖）


在您选定的提供商上点击 **"Accept Bid"**，然后在 Keplr 中签名。

## 步骤 5：等待部署

Console 将会：

-> 与您选定的提供商创建租约

-> 发送清单文件（告知提供商要运行什么）

-> 启动您的容器


这需要 1-2 分钟。您将在 UI 中看到状态更新。

## 步骤 6：验证其正在运行

部署完成后，您将看到：

-> **Services** 选项卡：显示状态为您的 *zcashd* 服务

-> **Logs** 选项卡：来自您 zcashd 节点的实时日志

-> **Leases** 选项卡：有关您部署的详细信息（DSEQ、提供商、费用）


### 查看日志

点击 **Logs**，您应该会看到 zcashd 正在启动：

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**首次运行将下载 zcash-params（约 2GB）。** 这是一次性操作，取决于提供商带宽，需要 5-10 分钟。后续重启将跳过此步骤。

同步将需要**数小时至数天**，具体取决于网络。请留意：

-> 不断增加的区块高度

-> 对等节点连接（应有 10-30 个对等节点）

-> 没有重复出现的错误


## 步骤 7：获取您的节点地址

点击 **Leases** 选项卡，然后点击 **URIs**。

您将看到类似以下内容：

```
zcashd-8233: provider-hostname.com:31234
```

这是您节点的**公共 P2P 端点**。其他 Zcash 节点将通过此地址连接您。

**请注意端口映射：** 您在 SDL 中配置了端口 8233，但 Akash 将其分配到不同的公共端口（本示例中为 31234）。这是正常现象——如果这让您感到困惑，请参阅顶部的 "Akash 上的端口映射" 部分。您的节点可通过 Akash 在此处显示的任何端口访问，并不一定是 8233。

如果您启用了 RPC（在 SDL 中默认被注释掉），您还会在此处看到具有其自身映射端口的 RPC 端点。

## 配置选项

### 切换到测试网

SDL 默认使用主网。要改用测试网：

-> **在 *env* 部分更改网络：**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> 在 *expose* 部分**更新公开的端口**：

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

-> **可选：在 *profiles.compute.zcashd.resources* 中减少测试网资源：**

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **可选：在 *profiles.placement.akash.pricing* 中降低定价：**

   ```yaml
   amount: 5000  # Down from 10000
   ```

> note，降低价格可能会使我们的提供商无法出价。请尝试此值，或使用提供商端点检查他们是否会出价。（请查阅提供商 API 文档）

### 启用 RPC 访问

出于安全考虑，RPC 默认处于禁用状态。要启用它：

**关键提示：请设置强凭据。** zcashd RPC 会通过 HTTP（而非 HTTPS）传输用户名/密码。只有在您了解安全影响的情况下才公开 RPC。

-> 在 *env* 部分取消注释：

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> 在 *expose* 中取消注释 RPC 端口：

   **对于主网：**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **对于测试网：**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**警告**：如果您为 RPC 设置 *global: true*，您将通过基本身份验证把它公开到互联网。这是个坏主意。请使用 *global: false*，并通过 Akash 的内部网络访问 RPC，或者设置安全隧道。

**端口映射提醒**：即使您全局公开 RPC，Akash 也会将其映射到随机高位端口（而非 8232/18232）。请查看部署中的 URI 以了解实际公共端点。对于 *global: false*（推荐），RPC 端点只能在 Akash 部署网络内访问，无法从公共互联网访问。

### 启用交易索引

交易索引允许您通过 RPC 按其 ID 查询任何交易。它会使用更多存储空间（约增加 20%）。

在 *env* 中取消注释：

```yaml
- "ZCASHD_TXINDEX=1"
```

**警告**：在现有已同步节点上启用 txindex，需要重新索引整个 blockchain，这将花费数小时。

### 启用 Insight Explorer

Insight Explorer 为 blockchain 数据提供额外 REST API 端点（对区块链浏览器很有用）。

在 *env* 中取消注释：

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

这将自动启用 txindex 并添加额外的 RPC 方法。

### 启用 Prometheus 指标

要抓取用于监控的指标：

-> 在 *env* 中取消注释：

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> 在 *expose* 中取消注释指标端口：

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
指标将以 Prometheus 格式在 http://yourendpoint:9969/metrics 提供。

### 调整资源/定价

如果您没有收到出价，或者想优化成本：

**对于低规格提供商**，请在 *profiles.compute.zcashd.resources* 部分中降低：

-> CPU：*units: 2*（合理同步速度的最低要求）

-> 内存：*size: 12Gi*（稳定性的最低要求）

-> 存储空间：*size: 120Gi*（主网的最低要求）


**为吸引更多出价**，请在 *profiles.placement.akash.pricing* 中提高：

-> 主网：尝试 *amount: 15000* uakt/区块

-> 测试网：尝试 *amount: 7500* uakt/区块


SDL 值被设定得保守偏高。大多数提供商会以更低价格出价。

## 更新您的部署

部署后需要更改配置？

-> 前往 Console 中的 **My Deployments**

-> 找到您的 zcashd 部署

-> 点击 **"Update Deployment"**

-> 编辑 SDL

-> 点击 **"Update"** 并在 Keplr 中批准


**注意**：更新将重启您的容器。节点将从其保存状态（持久存储）继续运行，但预计会有 1-2 分钟的停机时间。

## 监控

### 通过 Console

-> **Logs 选项卡**：实时容器日志

-> **Shell 选项卡**：在容器内获取 shell（便于调试）

-> **Events 选项卡**：Kubernetes 事件（除非出现故障，否则大多无用）


### 通过 RPC（如已启用）

如果您启用了 RPC，您可以像查询普通 zcashd 全节点一样查询您的节点（因为它就是！）

### zcash-cli 替代方案

如果您通过 Console 获得 shell 访问权限，可以直接使用 *zcash-cli*：

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## 关闭您的部署

当您完成使用或想停止付费时：

-> 前往 **My Deployments**

-> 找到您的 zcashd 部署

-> 点击 **"Close Deployment"**

-> 在 Keplr 中确认并签名


您的 5 AKT 押金将被退还。**持久存储**应由提供商保留，但不要依赖它——请像对待任何其他云提供商一样对待它。

## 故障排除

### "Insufficient funds" 错误

您需要更多 AKT。请为您的 Keplr 钱包充值。

### 未显示任何出价

可能是：

-> 您的定价过低（提高 SDL 中的 *amount*）

-> 您的资源要求对于可用提供商而言过高（降低 CPU/内存/存储空间）

-> 再等待一会儿（出价有时需要 60-90 秒才会出现）


### 部署卡在 "pending"

提供商可能遇到了问题。关闭该部署并尝试其他提供商。

### zcashd 日志显示 "No peers connected"

自 2026 年 7 月 18 日停止支持以来，这是预期的永久状态，而非启动延迟；无论等待多久或重新部署多少次都无法解决。请改为部署 [Zebra](/guides/akash-network-zebra)。

### 日志中出现 "Out of memory" 错误

您在 RAM 上省得太过头了。请关闭部署，并使用至少 12Gi 内存（建议 16Gi）重新部署。

### 同步耗时过长

请先定义 "过长"：

-> **数小时**：正常

-> **数天**：从头同步主网时也属正常

-> **数周**：出现问题，请检查日志中的错误


### "Error fetching zcash-params"

提供商可能存在网络问题或带宽缓慢。这通常会自行解决。如果持续超过 30 分钟，请尝试重新部署到其他提供商。

### RPC 身份验证失败

-> 检查 `ZCASHD_RPCUSER` 和 `ZCASHD_RPCPASSWORD` 是否正确设置

-> 确认您使用了正确端口（主网为 8232，测试网为 18232）

-> 请记住，端口由 Akash 映射——请使用部署中的 URI，而不是直接使用 8232


## 成本管理

在 Console 中监控您的支出：

-> **My Deployments** -> 您的部署 -> 显示每月费用预估

-> 您的 Keplr 钱包余额将随时间减少


当您的余额不足时，Akash 会自动关闭您的部署。请**定期为您的钱包充值**或设置提醒。

### 降低成本

-> 将**测试网**用于非生产测试（便宜 50%）

-> 如果您不需要快速同步，请**降低 CPU/内存**

-> **选择更便宜的提供商**（不一定明智——正常运行时间很重要）

-> 如果 AKT 价格波动较大，请使用 USDC 替代 AKT（需要修改 SDL 定价）

-> 如果不需要，请**禁用 txindex**（可节省约 20% 存储空间）


### 其他资源

**Akash Console**：[https://console.akash.network](https://console.akash.network)

**Akash 文档**：[https://akash.network/docs/](https://akash.network/docs/)

**Zcash 浏览器**：[https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**：[https://discord.akash.network](https://discord.akash.network)（用于提供商问题）

## 最后说明

- **持久存储很重要。** 不要跳过 *persistent: true*，也不要使用 *beta2* 类。请使用 *beta3*。
- **初始同步很慢。** 请耐心等待。这对于 blockchain 节点是正常现象。
- **保持钱包有充足资金。** 当您的 AKT 用尽时，部署会自动关闭。
- **备份不会自动进行。** 如果您关心数据，请假定它可能消失并相应规划。
- **RPC 安全至关重要。** 未采取适当安全措施时，请勿将 RPC 公开到互联网。
- **zcash-params 会被缓存。** 首次运行会下载约 2GB 的加密参数。这是正常现象，并且只会发生一次。
